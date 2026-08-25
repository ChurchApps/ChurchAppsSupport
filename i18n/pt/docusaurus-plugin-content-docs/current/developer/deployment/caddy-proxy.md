---
title: "Proxy de Domínio Personalizado Caddy"
---

# Proxy de Domínio Personalizado Caddy

<div class="article-intro">

Domínios personalizados de igrejas (`mychurch.org` → o site B1 da igreja) terminam em uma única instância Windows EC2 executando o Caddy. A instância possui os certificados TLS, resolve cada domínio para seu site `{sub}.b1.church` e faz proxy reverso com um cabeçalho Host reescrito. Sua configuração inteira consiste em dois arquivos — um `Caddyfile` estático e um `hosts.map` atualizado a partir da Membership API — então ela sobrevive a reinicializações com zero estado em tempo de execução. Esta página cobre como a instância é construída do zero, como opera e as armadilhas testadas em campo que vão pegar qualquer um que a reconstrua.

</div>

Para saber como uma requisição se resolve para uma igreja/site depois que chega ao B1App, veja [Roteamento de Website e Multi-Site](../architecture/websites).

## Componentes

| Peça | O que é |
|---|---|
| Instância EC2 | Windows Server; IP Elástico **`3.23.251.61`** (fixado no DNS das igrejas em todo o mundo — o IP é permanente, as instâncias são descartáveis) |
| `C:\caddy\caddy.exe` | Build **personalizado** do Caddy com o módulo de armazenamento `techknowlogick/certmagic-s3` — o Caddy padrão não consegue ler o repositório de certificados |
| `C:\caddy\Caddyfile` | A configuração completa do proxy: TLS sob demanda, `map` host→upstream, redirecionamentos www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Uma linha `{domain} {sub}.b1.church` por domínio roteável, importada no bloco `map` do Caddyfile |
| `sync-hostmap.ps1` + tarefa `CaddyHostmapSync` | Tarefa agendada (a cada 5 min + na inicialização, como SYSTEM) atualiza o `hosts.map` a partir da API e recarrega o Caddy de forma graciosa apenas quando há mudança |
| Serviço Windows `caddy` (wrapper WinSW) | Executa `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; reinício automático em caso de falha. O Caddy não é compatível com SCM, então um wrapper é necessário |
| Bucket S3 `churchapps-caddy-certs` | Armazenamento de certificados compartilhado (`region us-east-2`, prefixo `certs`) — os certificados sobrevivem a reconstruções de instância |
| Papel IAM `CaddyRole` | Concede à instância acesso ao S3; o Caddy usa a cadeia de credenciais padrão da AWS (sem chaves na configuração) |

## Os dois endpoints da API dos quais a instância depende

Ambos na Membership API. `authorize` é anônimo; `hostmap` exige o cabeçalho `x-internal-key: <INTERNAL_API_KEY>` desde a PR #67 da Api (2026-08-16) — `sync-hostmap.ps1` o lê a partir de `C:\caddy\internal-key.txt`:

| Endpoint | Função |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | O **portão `ask` de TLS sob demanda** do Caddy: `200 {"authorized":true}` quando o host (ou, para um host `www.`, seu apex) é uma linha em `domains`; `404` caso contrário. Este é o controle de abuso — o Caddy não emitirá um certificado para um host que este endpoint rejeitar |
| `GET /membership/domains/hostmap` | Exige `x-internal-key` (ou um JWT de server-admin). `text/plain`, ordenado, linhas `{domain} {sub}.b1.church` deduplicadas (sensível ao site: um domínio atribuído a um site secundário direciona para o subdomínio desse site). Fonte do `map` |

## Fluxo da requisição

1. O navegador resolve `mychurch.org` → `3.23.251.61` (registro `A` de apex, ou `CNAME proxy.b1.church`).
2. O Caddy termina o TLS. Certificado disponível no S3 → serve; SNI desconhecido → `authorize` é consultado; 200 → emite sob demanda via Let's Encrypt; 404 → **o handshake é recusado** (sem certificado, sem resposta — um host desconhecido tem o TLS recusado, não um erro HTTP).
3. O `map` resolve o Host para `{sub}.b1.church`; `www.{apex}` recebe um 302 para o apex; um host autorizado mas não mapeado (um domínio recém-criado dentro da janela de sincronização de ≤5 minutos) recebe um 404 limpo.
4. `reverse_proxy` conecta-se a `{sub}.b1.church:443` com SNI e Host reescritos para o upstream, então a edge da Vercel serve o site B1App.
5. A porta 80 permite desafios ACME HTTP-01 e redireciona com 308 tudo o mais para https.

Propagação de novo domínio: um domínio salvo no B1Admin se torna roteável em ~5 minutos (a tarefa de sincronização); seu certificado é emitido no primeiro acesso HTTPS.

## Construindo a instância do zero

Condensado do procedimento testado em campo (o passo a passo completo com comandos prontos para copiar e colar vive no workspace de operações, não neste repositório). Pré-requisitos primeiro — a construção não funciona sem eles:

1. **IAM**: anexe o `CaddyRole` (acesso S3 ao bucket de certificados) à instância. Verifique via IMDSv2 a partir da instância — note que um GET simples ao IMDS retornando 401 significa apenas que o IMDSv2 está sendo aplicado, não "sem papel".
2. **Saúde da API**: `authorize` deve retornar 404 para um domínio falso e `hostmap` (com o cabeçalho `x-internal-key`) deve retornar 200 antes de qualquer outra coisa.

Depois:

3. **Binário**: baixe um build personalizado do serviço de build do Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB do padrão; v2.11.4 no momento da escrita). A escolha do módulo importa: `techknowlogick/certmagic-s3` usa chaves `bucket`/`region`/`prefix` correspondentes ao layout de certificados existente; o fork `ss098` usa `host`/`endpoint` e **não** encontrará os certificados existentes.
4. **Arquivos**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (o `INTERNAL_API_KEY` de produção, uma linha) em `C:\caddy\`; semeie o map uma vez com `sync-hostmap.ps1 -NoReload`.
5. **Verificações antes do primeiro início**: `caddy list-modules` deve mostrar o módulo de armazenamento s3; `caddy adapt` deve emitir `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` em seu bloco de armazenamento; `caddy validate` deve passar.
6. **Serviço**: instale via WinSW (id do serviço `caddy`, reinício automático em caso de falha, logs rotativos). Executa como LocalSystem, que alcança o IMDS para as credenciais do papel.
7. **Tarefa de sincronização**: registre `CaddyHostmapSync` (SYSTEM, a cada 5 min + na inicialização, limite de execução de 4 minutos).
8. **Verifique antes da virada** forçando a resolução de domínios para `127.0.0.1` com `curl --resolve` (a instância não tem tráfego real até que o EIP seja movido): um domínio existente deve servir com um certificado válido carregado; `www.` deve dar 302; um host desconhecido deve ter o TLS recusado; e `Restart-Service caddy` deve voltar a servir **sem re-priming manual** — esse teste de reinício é todo o ponto do design estático.
9. **Ativação**: reassocie o IP Elástico `3.23.251.61` à nova instância. O DNS das igrejas nunca muda.

## Armadilhas testadas em campo (aprendidas da forma difícil — não regredir)

| Armadilha | Sintoma | Correção |
|---|---|---|
| `tls_server_name {vars.upstream}` no transporte do reverse_proxy | Todo domínio com proxy retorna 502: os placeholders do map resolvem **vazios no momento da conexão TLS** ("either ServerName or InsecureSkipVerify must be specified") | Use o placeholder nativo do transporte: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chaves duplicadas ou linhas inválidas em `hosts.map` | O manipulador `map` do Caddy **falha rigidamente em uma chave de entrada duplicada** — uma linha ruim pode derrubar toda a configuração | O script de sincronização normaliza espaços, descarta linhas malformadas (rejeitando tudo apenas se >20% estiverem ruins), deduplica com prioridade para a primeira ocorrência, e escreve UTF-8 **sem BOM** (um BOM corrompe a primeira chave do map). A API também filtra linhas de domínio vazias ou com espaços na origem |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | O registro da tarefa **falha silenciosamente** (XML fora do intervalo, erro não terminante) | Construa a repetição como uma instância CIM `MSFT_TaskRepetitionPattern` com `Interval = "PT5M"` e sem duração; adicione um `ExecutionTimeLimit` de 4 minutos (a primeira execução do SYSTEM pode travar em uma busca CRL/TLS a frio) |

:::warning
A API de administração se vincula apenas a `localhost:2019`. O modo de runtime legado a expunha remotamente para que a Membership API pudesse enviar configurações de rota; o design estático não precisa de envios remotos, e a superfície menor é deliberada. `caddy reload` (executado localmente pelo script de sincronização) é o único consumidor da API de administração.
:::

:::info Envio de runtime legado
`CaddyHelper` na API (e os endpoints `/membership/domains/caddy` + `/caddy/init`) ainda existem como o caminho de rollback para o antigo modo configurado por runtime. Estão programados para exclusão assim que a instância estática tiver ficado estável por algumas semanas — depois disso, `authorize` + `hostmap` serão os únicos pontos de integração.
:::

## Operações

- **Logs**: logs rotativos do WinSW em `C:\caddy\` (stdout/err do serviço — erros de proxy reverso vão para `caddy-service.err.log`); histórico de sincronização em `C:\caddy\sync-hostmap.log`.
- **Forçar uma atualização do map**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Alteração de configuração**: edite `C:\caddy\Caddyfile`, depois `caddy validate` + `caddy reload` (ou `Restart-Service caddy` — reinícios são seguros por design).
- **Exclusão em massa de domínios** aciona a proteção contra encolhimento do script de sincronização por design; mova o `hosts.map` antigo para o lado e execute a tarefa novamente para aceitar um encolhimento grande intencional.
- **As instruções de DNS para as igrejas são sempre as mesmas**: apex `A 3.23.251.61` ou `CNAME proxy.b1.church`.

## Páginas Relacionadas

- [Roteamento de Website e Multi-Site](../architecture/websites) — como a requisição com proxy se resolve para uma igreja/site no B1App
- [Implantação da API](./apis) — implantando a Membership API que serve `authorize`/`hostmap`
