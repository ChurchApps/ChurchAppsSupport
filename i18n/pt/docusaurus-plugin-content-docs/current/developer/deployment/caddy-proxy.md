---
title: "Proxy de Domínio Personalizado Caddy"
---

# Proxy de Domínio Personalizado Caddy

<div class="article-intro">

Domínios personalizados de igreja (`mychurch.org` → o site B1 da igreja) terminam em uma única caixa Windows EC2 rodando Caddy. A caixa é dona dos certificados TLS, resolve cada domínio para seu site `{sub}.b1.church`, e faz proxy reverso com um cabeçalho Host reescrito. Toda a sua configuração fica em dois arquivos — um `Caddyfile` estático e um `hosts.map` atualizado a partir da API de Associação — então ela sobrevive a reinicializações com estado zero em tempo de execução. Esta página cobre como a caixa é construída do zero, como opera, e as armadilhas testadas em campo que vão pegar quem quer que a reconstrua.

</div>

Para saber como uma solicitação se resolve para uma igreja/site depois que chega ao B1App, veja [Roteamento de Website e Multi-Site](../architecture/websites).

## Componentes

| Peça | O que é |
|---|---|
| Instância EC2 | Windows Server; Elastic IP **`3.23.251.61`** (embutido no DNS de igrejas ao redor do mundo — o IP é permanente, as instâncias são descartáveis) |
| `C:\caddy\caddy.exe` | Build **personalizado** do Caddy com o módulo de armazenamento `techknowlogick/certmagic-s3` — o Caddy padrão não consegue ler o repositório de certificados |
| `C:\caddy\Caddyfile` | Toda a configuração do proxy: TLS sob demanda, `map` host→upstream, redirecionamentos www→ápice, `:80`→https |
| `C:\caddy\hosts.map` | Uma linha `{domain} {sub}.b1.church` por domínio roteável, importada no bloco `map` do Caddyfile |
| `sync-hostmap.ps1` + tarefa `CaddyHostmapSync` | Tarefa agendada (a cada 5 min + na inicialização, como SYSTEM) atualiza `hosts.map` a partir da API e recarrega o Caddy graciosamente, apenas quando há mudança |
| Serviço Windows `caddy` (wrapper WinSW) | Roda `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; reinício automático em caso de falha. O Caddy não é ciente do SCM, então um wrapper é necessário |
| Bucket S3 `churchapps-caddy-certs` | Armazenamento de certificado compartilhado (`region us-east-2`, prefixo `certs`) — os certificados sobrevivem a reconstruções de instância |
| Papel IAM `CaddyRole` | Concede acesso S3 à instância; o Caddy usa a cadeia de credenciais padrão da AWS (sem chaves na configuração) |

## Os dois pontos de extremidade de API dos quais a caixa depende

Ambos são anônimos, na API de Associação:

| Ponto de Extremidade | Papel |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | O **portão `ask` de TLS sob demanda** do Caddy: `200 {"authorized":true}` quando o host (ou, para um host `www.`, seu ápice) é uma linha em `domains`; `404` caso contrário. Este é o controle de abuso — o Caddy não emitirá um certificado para um host que este ponto de extremidade rejeita |
| `GET /membership/domains/hostmap` | `text/plain`, ordenado, linhas deduplicadas `{domain} {sub}.b1.church` (ciente de site: um domínio atribuído a um site secundário disca o subdomínio daquele site). Fonte do `map` |

## Fluxo de solicitação

1. O navegador resolve `mychurch.org` → `3.23.251.61` (registro `A` de ápice, ou `CNAME proxy.b1.church`).
2. O Caddy termina o TLS. Certificado disponível em S3 → serve; SNI desconhecido → `authorize` é consultado; 200 → emite sob demanda via Let's Encrypt; 404 → **o handshake é recusado** (nenhum certificado, nenhuma resposta — um host desconhecido é recusado no nível TLS, não com um erro HTTP).
3. O `map` resolve o Host para `{sub}.b1.church`; `www.{apex}` recebe um 302 para o ápice; um host autorizado mas ainda não mapeado (um domínio recém-criado dentro da janela de sincronização de ≤5 minutos) recebe um 404 limpo.
4. `reverse_proxy` disca `{sub}.b1.church:443` com SNI e Host reescritos para o upstream, então a borda da Vercel serve o site do B1App.
5. A porta 80 deixa passar os desafios ACME HTTP-01 e redireciona com 308 todo o resto para https.

Propagação de novo domínio: um domínio salvo no B1Admin se torna roteável dentro de ~5 minutos (a tarefa de sincronização); seu certificado é emitido no primeiro acesso HTTPS.

## Construindo a caixa do zero

Condensado a partir do procedimento testado em campo (o passo a passo completo, com comandos para copiar e colar, vive no espaço de trabalho de operações, não neste repositório). Pré-requisitos primeiro — a construção não funciona sem eles:

1. **IAM**: anexe `CaddyRole` (acesso S3 ao bucket de certificados) à instância. Verifique via IMDSv2 a partir da caixa — note que um GET de IMDS puro retornando 401 significa apenas que o IMDSv2 está sendo aplicado, não "sem papel".
2. **Saúde da API**: `authorize` deve retornar 404 para um domínio falso e `hostmap` deve retornar 200 antes de qualquer outra coisa.

Depois:

3. **Binário**: baixe um build personalizado a partir do serviço de build do Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB contra ~45 MB do padrão; v2.11.4 no momento em que isto foi escrito). A escolha do módulo importa: `techknowlogick/certmagic-s3` usa as chaves `bucket`/`region`/`prefix`, que correspondem ao layout de certificados existente; o fork `ss098` usa `host`/`endpoint` e **não** encontrará os certificados existentes.
4. **Arquivos**: `Caddyfile` + `sync-hostmap.ps1` em `C:\caddy\`; semeie o mapa uma vez com `sync-hostmap.ps1 -NoReload`.
5. **Verificações antes da primeira inicialização**: `caddy list-modules` deve mostrar o módulo de armazenamento s3; `caddy adapt` deve emitir `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` em seu bloco de armazenamento; `caddy validate` deve passar.
6. **Serviço**: instale via WinSW (id de serviço `caddy`, reinício automático em falha, logs rotativos). Roda como LocalSystem, que alcança o IMDS para as credenciais do papel.
7. **Tarefa de sincronização**: registre `CaddyHostmapSync` (SYSTEM, a cada 5 min + na inicialização, limite de execução de 4 minutos).
8. **Verifique antes do corte** forçando a resolução de domínios para `127.0.0.1` com `curl --resolve` (a caixa não tem tráfego real até que o EIP seja movido): um domínio existente deve servir com um certificado válido herdado; `www.` deve retornar 302; um host desconhecido deve ser recusado no nível TLS; e `Restart-Service caddy` deve voltar servindo **sem nenhuma repriorização manual** — esse teste de reinício é o ponto inteiro do design estático.
9. **Entrada em produção**: reassocie o Elastic IP `3.23.251.61` para a nova instância. O DNS das igrejas nunca muda.

## Armadilhas testadas em campo (aprendidas da forma difícil — não regredir)

| Armadilha | Sintoma | Correção |
|---|---|---|
| `tls_server_name {vars.upstream}` no transporte reverse_proxy | Todo domínio com proxy dá 502: os espaços reservados do mapa se resolvem **vazios no momento da discagem TLS** ("either ServerName or InsecureSkipVerify must be specified") | Use o espaço reservado nativo do transporte: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chaves duplicadas ou linhas inválidas em `hosts.map` | O manipulador `map` do Caddy **dá erro fatal em uma chave de entrada duplicada** — uma linha ruim pode derrubar toda a configuração | O script de sincronização normaliza espaços em branco, descarta linhas malformadas (rejeitando tudo apenas se mais de 20% estiverem ruins), deduplica com prioridade para a primeira ocorrência, e escreve UTF-8 **sem BOM** (um BOM corrompe a primeira chave do mapa). A API também filtra linhas de domínio vazias ou com espaços na origem |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | O registro da tarefa **falha silenciosamente** (XML fora do intervalo, erro não terminante) | Construa a repetição como uma instância CIM `MSFT_TaskRepetitionPattern` com `Interval = "PT5M"` e sem duração; adicione um `ExecutionTimeLimit` de 4 minutos (a primeira execução como SYSTEM pode travar em uma busca fria de TLS/CRL) |

:::warning
A admin API se vincula apenas a `localhost:2019`. O modo legado em tempo de execução a expunha remotamente para que a API de Associação pudesse enviar configurações de rota; o design estático não precisa de envios remotos, e a superfície menor é deliberada. `caddy reload` (executado localmente pelo script de sincronização) é o único consumidor da admin-API.
:::

:::info Envio legado em tempo de execução
`CaddyHelper` na API (e os pontos de extremidade `/membership/domains/caddy` + `/caddy/init`) ainda existem como o caminho de rollback para o antigo modo configurado em tempo de execução. Estão programados para exclusão assim que a caixa estática tiver se mostrado estável por algumas semanas — depois disso, `authorize` + `hostmap` serão os únicos pontos de integração.
:::

## Operações

- **Logs**: logs rotativos do WinSW em `C:\caddy\` (stdout/err do serviço — erros de proxy reverso vão parar em `caddy-service.err.log`); histórico de sincronização em `C:\caddy\sync-hostmap.log`.
- **Forçar uma atualização do mapa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Mudança de configuração**: edite `C:\caddy\Caddyfile`, depois `caddy validate` + `caddy reload` (ou `Restart-Service caddy` — reinícios são seguros por design).
- **Exclusão em massa de domínios** dispara a proteção contra encolhimento do script de sincronização por design; mova o `hosts.map` antigo para o lado e execute a tarefa novamente para aceitar um encolhimento grande e intencional.
- **As instruções de DNS para igrejas são inalteradas para sempre**: ápice `A 3.23.251.61` ou `CNAME proxy.b1.church`.

## Páginas Relacionadas

- [Roteamento de Website e Multi-Site](../architecture/websites) — como a solicitação em proxy se resolve para uma igreja/site no B1App
- [Implantação de API](./apis) — implantando a API de Associação que serve `authorize`/`hostmap`
