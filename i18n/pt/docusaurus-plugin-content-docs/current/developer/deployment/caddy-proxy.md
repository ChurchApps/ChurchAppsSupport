---
title: "Proxy de Domínio Personalizado Caddy"
---

# Proxy de Domínio Personalizado Caddy

<div class="article-intro">

Domínios de chiesa personalizados (`mychurch.org` → o site B1 da chiesa) terminam em uma única caixa Windows EC2 executando Caddy. A caixa possui os certificados TLS, resolve cada domínio para seu site `{sub}.b1.church` e faz proxy reverso com um cabeçalho Host reescrito. Sua configuração inteira são dois arquivos — um `Caddyfile` estático e um `hosts.map` atualizado pela API de Associação — portanto sobrevive reinicializações com estado de tempo de execução zero. Esta página cobre como a caixa é construída do zero, como opera e os gotchas de campo-testado que morderão qualquer um reconstruindo-a.

</div>

Para como uma solicitação se resolve para uma chiesa/site uma vez que atinge B1App, veja [Roteamento de Website e Multi-Site](../architecture/websites).

## Componentes

| Peça | O que é |
|---|---|
| Instância EC2 | Windows Server; Elastic IP **`3.23.251.61`** (embutido em DNS de chiesa em todo o mundo — o IP é permanente, as instâncias são descartáveis) |
| `C:\caddy\caddy.exe` | **Personalizado** build Caddy com o módulo de armazenamento `techknowlogick/certmagic-s3` — Caddy em estoque não pode ler a loja de cert |
| `C:\caddy\Caddyfile` | Toda a config do proxy: on-demand TLS, `map` host→upstream, redirecionamentos www→ápice, `:80`→https |
| `C:\caddy\hosts.map` | Uma linha `{domain} {sub}.b1.church` por domínio roteável, importado no bloco `map` do Caddyfile |
| `sync-hostmap.ps1` + tarefa `CaddyHostmapSync` | Tarefa agendada (a cada 5 min + na inicialização, como SYSTEM) atualiza `hosts.map` da API e recarrega Caddy graciosamente apenas na mudança |
| Serviço Windows `caddy` (wrapper WinSW) | Executa `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; auto-reinício em falha. Caddy não é consciente de SCM, portanto um wrapper é necessário |
| Balde S3 `churchapps-caddy-certs` | Armazenamento de certificado compartilhado (`region us-east-2`, prefixo `certs`) — certs sobrevivem reconstruções de instância |
| Papel IAM `CaddyRole` | Concede ao acesso S3 da instância; Caddy usa a cadeia de credencial padrão de AWS (sem chaves na config) |

## Os dois pontos de extremidade de API que a caixa depende

Ambos são anônimos, na API de Associação:

| Ponto de Extremidade | Papel |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | **on-demand TLS `ask` gate** de Caddy: `200 {"authorized":true}` quando o host (ou, para um host `www.`, seu ápice) é uma linha em `domains`; `404` caso contrário. Este é o controle de abuso — Caddy não emitirá um certificado para um host que este ponto de extremidade rejeita |
| `GET /membership/domains/hostmap` | `text/plain`, classificado, linhas deduplicated `{domain} {sub}.b1.church` (consciente do site: um domínio atribuído a um site secundário disca o subdomínio daquele site). Fonte do `map` |

## Fluxo de Solicitação

1. Navegador resolve `mychurch.org` → `3.23.251.61` (registro ápice `A`, ou `CNAME proxy.b1.church`).
2. Caddy termina TLS. Certificado em mão em S3 → serve; SNI desconhecido → `authorize` é perguntado; 200 → emita sob demanda via Let's Encrypt; 404 → **o handshake é recusado** (nenhum certificado, nenhuma resposta — um host desconhecido fica TLS-recusado, não um erro HTTP).
3. O `map` resolve o Host para `{sub}.b1.church`; `www.{apex}` recebe um 302 para o ápice; um host autorizado mas não mapeado (um domínio novo dentro da janela de sincronização ≤5 minutos) recebe um 404 limpo.
4. `reverse_proxy` disca `{sub}.b1.church:443` com SNI e Host reescrito para o upstream, portanto a borda de Vercel serve o site B1App.
5. Porta 80 passa desafios ACME HTTP-01 e 308-redirecionamentos todo o resto para https.

Propagação de novo domínio: um domínio salvo no B1Admin se torna roteável dentro de ~5 minutos (a tarefa de sincronização); seu certificado é cunhado no primeiro acerto HTTPS.

## Construindo a caixa do zero

Condensado do procedimento de campo-testado (o passo a passo completo com comandos copy-paste vive no espaço de trabalho de ops, não este repo). Pré-requisitos primeiro — a construção está morta sem eles:

1. **IAM**: anexe `CaddyRole` (S3 acesso ao balde cert) à instância. Verifique via IMDSv2 da caixa — note um GET de IMDS nu retornando 401 apenas significa que IMDSv2 é aplicado, não "nenhum papel".
2. **Saúde de API**: `authorize` deve retornar 404 para um domínio falso e `hostmap` deve retornar 200 antes de qualquer outra coisa.

Depois:

3. **Binário**: baixar um build personalizado do serviço de build do Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB estoque; v2.11.4 no momento da escrita). A escolha do módulo importa: `techknowlogick/certmagic-s3` usa chaves `bucket`/`region`/`prefix` correspondendo ao layout de cert existente; o fork `ss098` usa `host`/`endpoint` e **não** encontrará os certificados existentes.
4. **Arquivos**: `Caddyfile` + `sync-hostmap.ps1` em `C:\caddy\`; semeie o mapa uma vez com `sync-hostmap.ps1 -NoReload`.
5. **Gates antes do primeiro início**: `caddy list-modules` deve mostrar o módulo de armazenamento s3; `caddy adapt` deve emitir `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` em seu bloco de armazenamento; `caddy validate` deve passar.
6. **Serviço**: instalar via WinSW (id de serviço `caddy`, auto-reinício em falha, logs rolantes). Executa como LocalSystem, que alcança IMDS para as credenciais de papel.
7. **Tarefa de sincronização**: registrar `CaddyHostmapSync` (SYSTEM, a cada 5 min + na inicialização, limite de execução de 4 minutos).
8. **Verificar pré-cutover** resolvendo força domínios para `127.0.0.1` com `curl --resolve` (a caixa não tem tráfego real até o EIP se mover): um domínio existente deve servir com um cert carregado válido; `www.` deve 302; um host desconhecido deve ser TLS-recusado; e `Restart-Service caddy` deve voltar servindo **com nenhuma re-preparação manual** — esse teste de reinício é o ponto inteiro do design estático.
9. **Go-live**: reassocie o Elastic IP `3.23.251.61` para a nova instância. DNS de chiesa nunca muda.

## Gotchas de campo-testado (aprendido da maneira difícil — não regridança)

| Gotcha | Sintoma | Correção |
|---|---|---|
| `tls_server_name {vars.upstream}` no transporte reverse_proxy | Cada domínio proxied 502s: espaços reservados de mapa se resolvem **vazio no tempo de discagem TLS** ("either ServerName ou InsecureSkipVerify must be specified") | Use o espaço reservado nativo de transporte: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chaves duplicadas ou linhas de lixo em `hosts.map` | O manipulador `map` de Caddy **hard-erro em uma chave de entrada duplicada** — uma linha ruim pode derrubar toda a config | O script de sincronização normaliza espaço em branco, cai linhas malformadas (rejeitando por atacado apenas se >20% são más), dedupes primeira-vence e escreve **sem BOM** UTF-8 (um BOM corrompe a primeira chave de mapa). A API também filtra linhas de domínio vazias/espaço-contendo na origem |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Registro de tarefa **falha silenciosamente** (XML fora de intervalo, erro não terminante) | Construa a repetição como uma instância CIM `MSFT_TaskRepetitionPattern` com `Interval = "PT5M"` e nenhuma duração; adicione um `ExecutionTimeLimit` de 4 minutos (a primeira execução SYSTEM pode ficar pendurada em uma procura TLS/CRL fria) |

:::warning
A admin API se vincula a `localhost:2019` apenas. O modo de tempo de execução legado o expôs remotamente para que a API de Associação pudesse empurrar configs de rota; o design estático não precisa de pushes remotos e a superfície menor é deliberada. `caddy reload` (executado localmente pelo script de sincronização) é o único consumidor de admin-API.
:::

:::info Push em tempo de execução legado
`CaddyHelper` na API (e os pontos de extremidade `/membership/domains/caddy` + `/caddy/init`) ainda existem como o caminho de rollback para o modo antigo configurado em tempo de execução. Eles são agendados para exclusão uma vez que a caixa estática tenha sido estável por algumas semanas — depois disso, `authorize` + `hostmap` são os únicos pontos de integração.
:::

## Operações

- **Logs**: Logs rolantes WinSW em `C:\caddy\` (serviço stdout/err — erros de proxy reverso pousam em `caddy-service.err.log`); histórico de sincronização em `C:\caddy\sync-hostmap.log`.
- **Forçar uma atualização de mapa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Mudança de config**: editar `C:\caddy\Caddyfile`, depois `caddy validate` + `caddy reload` (ou `Restart-Service caddy` — reinícios são seguros por design).
- **Exclusão de domínio em massa** dispara a guarda de encolhimento do script de sincronização por design; mova o `hosts.map` antigo para o lado e re-execute a tarefa para aceitar uma encolhimento grande intencional.
- **Instruções de DNS para igrejas são inalteradas para sempre**: ápice `A 3.23.251.61` ou `CNAME proxy.b1.church`.

## Páginas Relacionadas

- [Roteamento de Website e Multi-Site](../architecture/websites) — como a solicitação proxied se resolve para uma chiesa/site em B1App
- [Implantação de API](./apis) — implantação da API de Associação que serve `authorize`/`hostmap`
