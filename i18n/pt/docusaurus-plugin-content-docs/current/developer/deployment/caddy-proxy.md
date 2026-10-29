---
title: "Proxy Caddy para Domínios Personalizados"
---

# Proxy Caddy para Domínios Personalizados

<div class="article-intro">

Os domínios personalizados das igrejas (`minhaigreja.org` → o site B1 da igreja) terminam em uma única máquina EC2 com Windows executando o Caddy. A máquina é dona dos certificados TLS, resolve cada domínio para o seu site `{sub}.b1.church` e faz o proxy reverso com um cabeçalho Host reescrito. Toda a sua configuração são dois arquivos -- um `Caddyfile` estático e um `hosts.map` atualizado a partir da API de Membership -- então ela sobrevive a reinicializações sem nenhum estado em tempo de execução. Esta página cobre como a máquina é montada do zero, como ela opera e as armadilhas testadas em campo que vão afetar quem a reconstruir.

</div>

Para saber como uma requisição é resolvida para uma igreja/site depois que chega ao B1App, veja [Roteamento de Sites e Multi-Site](../architecture/websites).

## Componentes

| Peça | O que é |
|---|---|
| Instância EC2 | Windows Server; IP elástico **`3.23.251.61`** (incorporado no DNS das igrejas no mundo todo -- o IP é permanente, as instâncias são descartáveis) |
| `C:\caddy\caddy.exe` | Build **personalizado** do Caddy com o módulo de armazenamento `techknowlogick/certmagic-s3` -- o Caddy padrão não consegue ler o repositório de certificados |
| `C:\caddy\Caddyfile` | A configuração inteira do proxy: TLS sob demanda, `map` de host→upstream, redirecionamentos de www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Uma linha `{domain} {sub}.b1.church` por domínio roteável, importada para o bloco `map` do Caddyfile |
| `sync-hostmap.ps1` + tarefa `CaddyHostmapSync` | Tarefa agendada (a cada 5 min e na inicialização, como SYSTEM) que atualiza o `hosts.map` a partir da API e recarrega o Caddy de forma graciosa somente quando há mudança |
| Serviço Windows `caddy` (empacotador WinSW) | Executa `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; reinicia automaticamente em caso de falha. O Caddy não é compatível com o SCM, então um empacotador é obrigatório |
| Bucket S3 `churchapps-caddy-certs` | Armazenamento compartilhado de certificados (`region us-east-2`, prefixo `certs`) -- os certificados sobrevivem à reconstrução das instâncias |
| Função IAM `CaddyRole` | Concede à instância acesso ao S3; o Caddy usa a cadeia padrão de credenciais da AWS (sem chaves na configuração) |

## Os dois endpoints da API dos quais a máquina depende

Ambos na API de Membership. `authorize` é anônimo; `hostmap` exige o cabeçalho `x-internal-key: <INTERNAL_API_KEY>` desde o PR #67 da Api (2026-08-16) -- o `sync-hostmap.ps1` o lê de `C:\caddy\internal-key.txt`:

| Endpoint | Função |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | O **gate `ask` de TLS sob demanda** do Caddy: `200 {"authorized":true}` quando o host (ou, para um host `www.`, o seu apex) é uma linha em `domains`; `404` caso contrário. Este é o controle de abuso -- o Caddy não emite certificado para um host que este endpoint rejeita |
| `GET /membership/domains/hostmap` | Exige `x-internal-key` (ou um JWT de administrador do servidor). `text/plain`, linhas `{domain} {sub}.b1.church` ordenadas e sem duplicatas (consciente do site: um domínio atribuído a um site secundário aponta para o subdomínio desse site). Fonte do `map` |

## Fluxo da requisição

1. O navegador resolve `minhaigreja.org` → `3.23.251.61` (registro `A` no apex, ou `CNAME proxy.b1.church`).
2. O Caddy encerra o TLS. Certificado disponível no S3 → serve; SNI desconhecido → pergunta-se ao `authorize`; 200 → emite sob demanda pelo Let's Encrypt; 404 → **o handshake é recusado** (sem certificado, sem resposta -- um host desconhecido recebe recusa de TLS, não um erro HTTP).
3. O `map` resolve o Host para `{sub}.b1.church`; `www.{apex}` recebe um 302 para o apex; um host autorizado mas ainda não mapeado (um domínio recém-criado dentro da janela de sincronização de até 5 minutos) recebe um 404 limpo.
4. O `reverse_proxy` se conecta a `{sub}.b1.church:443` com SNI e Host reescritos para o upstream, de modo que a borda da Vercel sirva o site do B1App.
   O Caddy também envia o domínio original do visitante como `X-Church-Host` (a Vercel sobrescreve o `X-Forwarded-Host` com o Host reescrito). O middleware do B1App só o aceita quando `/domains/public/lookup/{host}` o mapeia para o mesmo `{sub}` do host da requisição, e então o expõe como `x-public-host` para o cabeçalho canônico `Link`, o `robots.txt` e o `sitemap.xml`; um `x-public-host` enviado pelo cliente é sempre removido. O `ChurchJsonLd` do schema.org ainda usa a URL `b1.church` (ler cabeçalhos ali tornaria as páginas dinâmicas).
5. A porta 80 passa os desafios ACME HTTP-01 e redireciona com 308 todo o resto para https.

Propagação de novos domínios: um domínio salvo no B1Admin fica roteável em até ~5 minutos (a tarefa de sincronização); seu certificado é emitido no primeiro acesso HTTPS.

## Montando a máquina do zero

Condensado a partir do procedimento testado em campo (o passo a passo completo com comandos prontos para copiar fica no workspace de operações, e não neste repositório). Primeiro os pré-requisitos -- a montagem não funciona sem eles:

1. **IAM**: anexe `CaddyRole` (acesso ao S3 do bucket de certificados) à instância. Verifique via IMDSv2 a partir da máquina -- observe que um GET simples no IMDS retornando 401 significa apenas que o IMDSv2 é obrigatório, e não "sem função".
2. **Saúde da API**: `authorize` deve retornar 404 para um domínio falso, e `hostmap` (com o cabeçalho `x-internal-key`) deve retornar 200 antes de qualquer outra coisa.

Depois:

3. **Binário**: baixe um build personalizado do serviço de build do Caddy -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB contra ~45 MB do padrão; v2.11.4 na data desta escrita). A escolha do módulo importa: `techknowlogick/certmagic-s3` usa as chaves `bucket`/`region`/`prefix`, que correspondem ao layout de certificados existente; o fork `ss098` usa `host`/`endpoint` e **não** encontrará os certificados existentes.
4. **Arquivos**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` de produção, uma linha) em `C:\caddy\`; alimente o mapa uma vez com `sync-hostmap.ps1 -NoReload`.
5. **Portões antes da primeira inicialização**: `caddy list-modules` precisa mostrar o módulo de armazenamento s3; `caddy adapt` precisa emitir `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` no bloco de armazenamento; `caddy validate` precisa passar.
6. **Serviço**: instale com o WinSW (id do serviço `caddy`, reinício automático em falha, logs rotativos). Executa como LocalSystem, que alcança o IMDS para as credenciais da função.
7. **Tarefa de sincronização**: registre `CaddyHostmapSync` (SYSTEM, a cada 5 minutos + na inicialização, limite de execução de 4 minutos).
8. **Verifique antes da virada** forçando a resolução dos domínios para `127.0.0.1` com `curl --resolve` (a máquina não recebe tráfego real até o EIP ser movido): um domínio existente precisa servir com um certificado válido herdado; `www.` precisa retornar 302; um host desconhecido precisa receber recusa de TLS; e `Restart-Service caddy` precisa voltar servindo **sem nenhuma reconfiguração manual** -- esse teste de reinicialização é o objetivo inteiro do projeto estático.
9. **Virada**: reassocie o Elastic IP `3.23.251.61` à nova instância. O DNS das igrejas nunca muda.

## Armadilhas testadas em campo (aprendidas da forma difícil -- não regredir)

| Armadilha | Sintoma | Correção |
|---|---|---|
| `tls_server_name {vars.upstream}` no transporte do reverse_proxy | Todo domínio com proxy retorna 502: os placeholders do mapa resolvem **vazios no momento da conexão TLS** ("either ServerName or InsecureSkipVerify must be specified") | Use o placeholder nativo do transporte: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chaves duplicadas ou linhas inválidas em `hosts.map` | O handler `map` do Caddy **dá erro fatal com uma chave de entrada duplicada** -- uma linha ruim pode derrubar a configuração inteira | O script de sincronização normaliza os espaços, descarta linhas malformadas (rejeitando tudo somente se mais de 20% forem inválidas), remove duplicatas mantendo a primeira ocorrência e grava em UTF-8 **sem BOM** (um BOM corrompe a primeira chave do mapa). A API também filtra linhas de domínio vazias ou com espaços na origem |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | O registro da tarefa **falha em silêncio** (XML fora do intervalo, erro não terminal) | Monte a repetição como uma instância CIM `MSFT_TaskRepetitionPattern` com `Interval = "PT5M"` e sem duração; adicione um `ExecutionTimeLimit` de 4 minutos (a primeira execução como SYSTEM pode travar em uma consulta de TLS/CRL a frio) |

:::warning
A API administrativa fica ligada somente a `localhost:2019`. O modo legado de execução expunha-a remotamente para que a API de Membership enviasse configurações de rotas; o projeto estático não precisa de envios remotos, e a superfície menor é deliberada. `caddy reload` (executado localmente pelo script de sincronização) é o único consumidor da API administrativa.
:::

:::info Envio em tempo de execução legado
O `CaddyHelper` na API (e os endpoints `/membership/domains/caddy` + `/caddy/init`) ainda existem como caminho de reversão para o antigo modo configurado em tempo de execução. Estão agendados para exclusão quando a máquina estática estiver estável por algumas semanas -- depois disso, `authorize` + `hostmap` são os únicos pontos de integração.
:::

## Operação

- **Logs**: logs rotativos do WinSW em `C:\caddy\` (stdout/stderr do serviço -- erros do proxy reverso aparecem em `caddy-service.err.log`); histórico de sincronização em `C:\caddy\sync-hostmap.log`.
- **Forçar atualização do mapa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Alteração de configuração**: edite `C:\caddy\Caddyfile`, depois `caddy validate` + `caddy reload` (ou `Restart-Service caddy` -- reinicializações são seguras por design).
- **Exclusão em massa de domínios** aciona a trava de redução do script de sincronização por design; mova o `hosts.map` antigo para outro lugar e execute a tarefa novamente para aceitar uma redução grande e intencional.
- **As instruções de DNS para as igrejas não mudam nunca**: `A` no apex para `3.23.251.61` ou `CNAME proxy.b1.church`.

## Páginas Relacionadas

- [Roteamento de Sites e Multi-Site](../architecture/websites) — como a requisição com proxy é resolvida para uma igreja/site no B1App
- [Implantação da API](./apis) — implantação da API de Membership que serve `authorize`/`hostmap`
