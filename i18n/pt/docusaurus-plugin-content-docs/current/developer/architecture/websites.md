---
title: "Roteamento de sites e multi-site"
---

# Roteamento de sites e multi-site

<div class="article-intro">

Uma única igreja agora pode servir mais de um site distinto, e cada um pode estar em um subdomínio `*.b1.church` ou em um domínio personalizado totalmente próprio da igreja. Esta página mapeia a camada de roteamento que fica *por baixo* do criador: como uma requisição recebida se resolve para uma igreja **e** para um site específico, o modelo de dados multi-site (a sentinela `siteId` que mantém todos os sites já existentes renderizando como antes) e a borda de domínios personalizados — um proxy Caddy gerenciado por nós mesmos, em uma EC2, que encerra o TLS e reescreve cada domínio da igreja para o seu upstream `*.b1.church`. Para o que de fato é renderizado depois que a requisição foi resolvida — a árvore de página/seção/elemento —, veja [Criador de sites](./website-builder).

</div>

## Visão geral

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Três regras valem para esta camada:

1. **Uma sentinela mantém tudo compatível com versões anteriores.** `siteId = ''` é o site principal. Toda página, bloco, link, estilo global e linha de domínio que existia antes desta funcionalidade carrega `''` e renderiza exatamente como antes. Um *segundo* site é simplesmente um conjunto de linhas com um `siteId` não vazio, e qualquer endpoint de conteúdo chamado sem `?siteId=` retorna o site principal — byte a byte a requisição antiga.
2. **A resolução é baseada no rótulo do host e converge.** Um subdomínio `*.b1.church` é roteado diretamente pelo seu rótulo de host; um domínio personalizado é reescrito para o rótulo `{sub}.b1.church` na borda do Caddy, antes que o B1App o veja (com uma busca no banco pelo middleware que define um cabeçalho `x-site` como alternativa para qualquer `Host` personalizado cru). Ambos os caminhos caem na mesma rota `[sdSlug]` e na mesma chamada a `churches/lookup`, de modo que a renderização posterior é idêntica.
3. **A borda do Caddy não tem estado sobre uma única fonte da verdade.** Os domínios personalizados terminam em um proxy Caddy gerenciado por nós mesmos, numa EC2, que reescreve cada domínio para o seu upstream `{sub}.b1.church`. Um salvamento de domínio dispara um único `CaddyHelper.updateCaddy()` de melhor esforço, e o Caddy também lê diretamente a tabela `domains` (os endpoints `authorize` e `hostmap` abaixo). A tabela é a autoridade — um Caddy inacessível nunca pode fazer um salvamento falhar.

## Resolução de sites

### Subdomínios `*.b1.church`

`B1App/next.config.mjs` reescreve as requisições recebidas pelo host. Uma regra de host com o padrão `(?<subdomain>.*?)\..*` captura o **primeiro rótulo** do host e reescreve `/` e `/:path*` para `/{subdomain}` — o segmento de App Router `[sdSlug]`. Assim, `grace.b1.church/about` vira `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chama `GET /membership/churches/lookup/?subDomain={sdSlug}`. A resposta do `ChurchController.getBySubDomain` agora tem dois ramos:

| O slug corresponde a | Resposta | Significado |
|----------------------|----------|-------------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal daquela igreja |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Um **site secundário** — o controller recorre a `sites`, resolve a igreja dona e devolve o slug consultado mais o `siteId` extra |

Esse `siteId` extra é a única coisa que distingue uma requisição de site secundário de uma de site principal; todo o resto do pipeline é compartilhado.

Um slug que não corresponde a nenhuma das duas tabelas volta como `{}` com `200`. `ConfigHelper.load` trata uma resposta sem `id` como site desconhecido e chama o `notFound()` do Next, de modo que um subdomínio desconhecido recebe um 404 de verdade, em vez de todas as chamadas seguintes pedirem `/…/undefined`. A rota de página do criador também monta o caminho da árvore com `pageTreePath()` (`src/helpers/pageTreePath.ts`), que codifica o slug em URL, de modo que um slug malformado (barras invertidas, espaços) gera 404 em vez de propagar o `400` da API como um 500.

### Domínios personalizados {#custom-domains}

Um domínio pertencente à igreja termina na **borda do Caddy** (detalhada abaixo), que reescreve o cabeçalho `Host` para o `{sub}.b1.church` do site antes de repassar ao B1App. Assim, no caminho normal o B1App recebe um host *interno* `*.b1.church` e o resolve pelo rótulo do host exatamente como um subdomínio nativo — a busca no banco do middleware nunca dispara. O `src/middleware.ts` ainda roda em toda requisição, mas com uma tarefa sempre ativa e uma alternativa:

1. **Sempre** — ele **apaga qualquer cabeçalho `x-site` enviado pelo cliente**. Esse cabeçalho é uma entrada de reescrita falsificável e só é confiável quando o próprio middleware o define; removê-lo é o trabalho real do middleware atrás do Caddy.
2. **Alternativa, somente para `Host` não interno** — para um `Host` de domínio personalizado cru que chega ao B1App *sem* a reescrita do Caddy, ele chama `GET /membership/domains/public/lookup/{host}` e, se isso retornar um `subDomain`, define `x-site: {subDomain}.b1.church`. Atrás do Caddy este ramo fica inerte, porque o `Host` já é `*.b1.church`.

Os hosts internos — `localhost`, `b1.church` e os sufixos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — pulam a busca por completo (já são resolvidos pela reescrita de rótulo do host, ou são hosts de prévia/deploy).

A busca em si (`DomainRepo.loadByName`) faz um left join de `domains → churches` e `domains → sites` e retorna `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — o subdomínio do site secundário atribuído, se o domínio aponta para um, ou o da igreja, caso contrário. Ela primeiro procura o host exato; se esse host começou com `www.` e não encontrou, tenta **uma vez** o apex sem o `www.`.

De volta ao `next.config.mjs`, as regras de reescrita de `x-site` são colocadas **antes** das regras genéricas de host, de modo que vencem. `x-site: grace.b1.church` → primeiro rótulo `grace` → `[sdSlug] = grace`, e a partir daí a resolução é idêntica ao caminho do subdomínio (mesmo `churches/lookup`, mesmo `siteId`).

:::info
O cabeçalho `x-site` não é confiável vindo de fora. O middleware remove incondicionalmente qualquer `x-site` recebido antes de opcionalmente definir o seu próprio, e as regras de reescrita só veem o valor definido pelo middleware — um cliente não consegue se forçar sobre o conteúdo de outra igreja enviando um cabeçalho.
:::

Dois detalhes operacionais do middleware:

- **Cache.** O resultado de cada host (um acerto *ou* uma falha confirmada — nunca um erro de rede) fica em cache por **10 minutos** em um `Map` em memória, por isolate serverless.
- **Matcher.** O matcher reinclui deliberadamente `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Seu primeiro padrão exclui caminhos com ponto, o que de outro modo derrubaria esses arquivos; eles são incluídos de volta para que os arquivos de SEO/PWA por igreja de um domínio personalizado também recebam o cabeçalho `x-site`.
- **Cabeçalho canônico.** Nas páginas da igreja, o middleware acrescenta um cabeçalho de resposta `Link: <{proto}://{host}{path}>; rel="canonical"` nomeando o host pelo qual a página foi de fato servida — subdomínio ou domínio personalizado (`helpers/canonicalLink.ts`). Quando um domínio personalizado chega ao B1App pelo [proxy Caddy](../deployment/caddy-proxy), o host da requisição é o subdomínio `{sub}.b1.church`, então o middleware usa o domínio do visitante a partir de `X-Church-Host` — mas somente depois que `/domains/public/lookup/{host}` confirma que aquele domínio aponta para o mesmo subdomínio (`ownsSubdomain()`). O link canônico, o `robots.txt` e o `sitemap.xml` então nomeiam o domínio personalizado, em vez do subdomínio `b1.church`. Ele é ignorado em hosts que não são de igreja (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e em `/mobile`, `/login`, `/logout` e nos arquivos gerados de robots/sitemap/manifest.

### Site público desativado

Uma igreja pode ativar **Desativar site público** no B1Admin (configuração de conteúdo no nível da igreja `hidePublicSite = "true"`). O site então serve apenas suas rotas voltadas para os membros:

- **O middleware do B1App** busca o subdomínio (`/membership/churches/lookup` e depois `/content/settings/public/:churchId`) e redireciona requisições anônimas para qualquer caminho fora da lista de permissões para `/login?returnUrl={path}{query}`. A lista de permissões (`helpers/publicSite.ts`) é `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e os arquivos manifest/robots/sitemap. Somente respostas confirmadas são armazenadas em cache (60 segundos em produção, já que a chamada de revalidação do administrador não consegue limpar esse mapa por instância; sem cache em dev/teste). Um erro da API serve o site em vez de trancar todo mundo para fora.
- **Membros conectados veem o site completo.** Uma requisição com um cookie `jwt` não expirado (o `hasSession()` do middleware decodifica o `exp` do payload sem verificar a assinatura — é um portão leve, não controle de acesso) pula o redirecionamento; assim, depois de entrar, um membro volta à página que pediu e vê as páginas normais, as páginas embutidas (Grupos, Sermões etc.) e a navegação do cabeçalho. Os componentes de página e o `Header` não verificam mais o `hidePublicSite` por conta própria.
- **`robots.txt`** bloqueia tudo, como nos hosts com noindex.
- **API.** `GET /content/pages/public/:churchId` (a lista de páginas do sitemap) retorna `[]`, então chamadores anônimos não conseguem listar as páginas.

### Propagação do `siteId`

O `ConfigHelper` guarda o `siteId` resolvido na sua `ConfigurationInterface` por requisição (memorizada com `cache()` do React) e acrescenta `?siteId=` às chamadas de conteúdo que ele e os componentes de página fazem — **condicionalmente**: um `siteId` vazio (subdomínio de igreja principal) omite o parâmetro por completo. Os endpoints que recebem a propagação são a árvore de páginas (`/content/pages/:id/tree`), a lista pública de páginas usada pelo sitemap (`/content/pages/public/:id`), os estilos globais (`/content/globalStyles/church/:id`), os links de navegação (`/content/links/church/:id`) e o bloco de rodapé autônomo (`/content/blocks/public/footer/:id`). No caminho normal de renderização o rodapé chega dentro da árvore de páginas (seções marcadas com `zone: "siteFooter"`), já buscado com `siteId`, então não existe uma lacuna de rodapé sem escopo.

O portal de membros (B1App `mobile`) fica intencionalmente fora disto: `loadChurchAppearance.ts` resolve a igreja por `churches/lookup`, mas lê o `/settings/public/{id}` no nível da igreja e nunca propaga o `siteId` — o portal é de toda a igreja na v1 (veja abaixo).

## Múltiplos sites por igreja

### Modelo de dados

A nova tabela `membership.sites` é propositalmente pequena:

| Coluna | Tipo | Observações |
|--------|------|-------------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Igreja dona |
| `name` | `varchar(255)` | Nome de exibição (por exemplo, "Español", "Jovens") |
| `subDomain` | `varchar(45)` | **Índice único** — namespace global (abaixo) |

O escopo por site é então uma única coluna, sem nulos, acrescentada às tabelas de conteúdo e de domínios:

| Tabela (módulo) | Coluna | `''` significa |
|-----------------|--------|----------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | O domínio serve o site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal — e, em **`blocks`**, `''` significa também *compartilhado entre todos os sites* |

Duas migrações acrescentam tudo isso (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como a coluna tem padrão `''`, cada linha existente mantém o comportamento de hoje, sem preenchimento retroativo.

**Namespace global de subdomínios.** `sites.subDomain` compartilha *um* namespace com `churches.subDomain` — um subdomínio de site nunca pode colidir com um subdomínio de igreja ou com o de outro site. Isso é aplicado nos **dois** caminhos de salvamento: `SiteController.save` rejeita um slug que bata em `churches` ou em `sites`, e `ChurchController.validateSave` faz o mesmo no sentido inverso. Um índice único em `sites.subDomain` sustenta isso no nível do banco de dados.

**A unicidade de páginas** foi ampliada de `(churchId, url)` para `(churchId, siteId, url)`, para que dois sites de uma mesma igreja possam ter cada um o seu próprio `/about`.

### Conteúdo por site, com alternativas

Todo endpoint de **lista/árvore** de conteúdo com escopo de site recebe um `?siteId=` opcional (ausente ⇒ `''` = principal): listagem/árvore/pública de páginas, listagem/por tipo/rodapé de blocos, links (anônimos / filtrados / todos) e estilos globais. Seções e elementos *não* têm escopo direto — herdam por meio da sua página ou bloco pai.

Duas cadeias de resolução fazem o trabalho interessante:

- **Estilos globais — `site → principal → padrão`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retorna a linha própria do site; se um site secundário não tiver nenhuma, retorna a **linha principal (`''`) como está** (mantendo o `id`/`siteId` da principal, que o cliente usa para copiar ao escrever); se também não houver principal, o `GlobalStyleController` retorna uma paleta/fontes padrão fixas.
- **Bloco de rodapé — o do site vence, o compartilhado é a alternativa.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retorna as linhas compartilhadas (`''`) *e* as específicas do site; o resolvedor escolhe o rodapé próprio do site, se existir, senão o compartilhado. A mesma lógica roda tanto em `TreeHelper.insertBlocks` (árvore de página) quanto no endpoint autônomo `/content/blocks/public/footer/:churchId`.

### Exclusão de site em cascata

`SiteController.delete` (protegido pela permissão Configurações→Editar do membership) desfaz um site secundário em três etapas:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` remove em cascata todo o conteúdo que o site possui: suas **páginas** → suas seções, elementos, `pageHistory` e `posts`; seus próprios **blocos** → suas seções, elementos e `pageHistory`; seus **links** e **globalStyles**. Uma guarda se recusa a rodar para `''` — a sentinela principal/compartilhada nunca entra em cascata.
2. `DomainRepo.clearSiteId` **reatribui** os domínios do site de volta ao principal (`siteId → ''`) em vez de excluí-los, de modo que um domínio personalizado sobrevive à exclusão de um site.
3. A linha de `sites` é excluída e as rotas do Caddy são ressincronizadas (com melhor esforço).

### Superfície no B1Admin

| Capacidade | Onde | Mecanismo |
|-----------|------|-----------|
| Seletor de site | `useSiteSelection` + `SiteSwitcher` (vazio = "Site principal") | Lê um parâmetro de URL `?site=` e o repassa como `?siteId=` nas chamadas do ContentApi. Presente nas três **listagens** de Site — **Páginas**, **Blocos**, **Aparência** — mas *não* nos editores de página/bloco, que carregam o `siteId` no próprio registro |
| Criar/excluir sites | `SitesDialog`, aberto pela opção "Gerenciar sites…" do seletor | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Protegido pela permissão Configurações→Editar do membership (`Permissions.settings.edit` no servidor; `Permissions.membershipApi.settings.edit` no B1Admin). **Somente criar/excluir — não há interface de renomear na v1** |
| Atribuição de site por domínio | `DomainSettingsEdit` em Configurações→Domínios | Um seletor de site por linha envia o `siteId` de cada domínio para `/membership/domains`. A coluna fica oculta se a API não retornar sites (backend antigo) |
| Estilos copy-on-write | `StylesManager.prepareForSave` | Quando a linha de estilo global carregada tem um `siteId` diferente do site selecionado (ou seja, a API devolveu a principal herdada como alternativa), ele descarta o `id` da principal e grava o `siteId` atual, forçando um **insert** de uma nova linha específica do site, em vez de sobrescrever a principal. A mesma bifurcação por divergência vale para o bloco de rodapé do site |

:::info
**O que continua em toda a igreja na v1 (uma escolha de escopo deliberada, não um limite do modelo de dados):** o **blog** (a `BlogPage` não tem seletor e carrega `/posts` sem `siteId`), os **widgets do site** (banner de anúncios + launcher), os **redirecionamentos**, o **logotipo / GA4 / configurações da igreja** e o **portal de membros** (B1App mobile). Observe que isso *não* é "toda a Aparência" — os estilos globais de um site secundário (paleta, fontes, tipografia, espaçamento, navegação, CSS personalizado) **são** específicos do site pelo caminho copy-on-write acima; apenas os subpainéis de banner/launcher/redirecionamentos/logotipo da página Aparência permanecem em toda a igreja.
:::

## Domínios personalizados: borda do Caddy (plano de configuração estática)

:::info
**Direção revisada em 02/07/2026.** Um plano anterior de mover a hospedagem de domínios personalizados para domínios gerenciados pela Vercel foi **cancelado**, e todo o código de registro de domínios da Vercel (`VercelHelper`, suas variáveis de ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, os parâmetros SSM e as verificações de integridade) foi removido da Api. O **proxy Caddy gerenciado por nós mesmos, na EC2, permanece** como a borda permanente de domínios personalizados. O único trabalho restante é interno: trocar a configuração *em tempo de execução* via API administrativa do Caddy por uma configuração *estática* que sobreviva a reinicializações.
:::

### A borda

Cada domínio personalizado de igreja aponta o DNS para uma única máquina EC2 — `3.23.251.61`, também acessível como `proxy.b1.church`. A tela Configurações→Domínios do B1Admin orienta as igrejas a adicionar um `A` no apex → `3.23.251.61` ou um `CNAME` → `proxy.b1.church`. O Caddy encerra o TLS com um certificado Let's Encrypt por domínio, reescreve o cabeçalho `Host` para o upstream `{sub}.b1.church` do domínio e repassa ao B1App — que então o roteia pelo rótulo do host como qualquer subdomínio nativo (veja [Domínios personalizados](#custom-domains) acima).

O mapeamento de upstream vem de `DomainRepo.loadPairs`, cujo destino faz COALESCE do subdomínio do site atribuído, de modo que um domínio é repassado ao site *secundário* correto, com alternativa para o principal da igreja:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

As linhas `www.*` ficam fora do mapa; o Caddy atende `www.{host}` por um redirecionamento `302` para o apex.

### Dois endpoints anônimos alimentam a borda

`DomainController` expõe dois endpoints somente leitura, sem autenticação, que a máquina consome diretamente — anônimos por necessidade, já que a borda consulta antes de existir qualquer contexto de igreja:

| Endpoint | Retorna | Papel |
|----------|---------|-------|
| `GET /membership/domains/authorize?domain=` | `200` se o domínio — ou, para um miss de `www.`, seu apex — existir em `domains`; `404` caso contrário (incluindo um `domain` vazio) | O **`ask` de TLS sob demanda** do Caddy: o controle contra abuso que decide se emite um certificado para um SNI recebido |
| `GET /membership/domains/hostmap` | `text/plain`, uma linha `{domain} {sub}.b1.church` ordenada por domínio roteável | O arquivo de mapa host→upstream que a máquina atualiza em um timer |

`authorize` reutiliza `DomainRepo.loadByName` (host exato, depois uma nova tentativa `www.`→apex); `hostmap` reutiliza `loadPairs` — portanto é sensível ao site e exclui `www.*`, idêntico às rotas de proxy — e apenas remove o sufixo `:443`.

### Salvar/excluir domínio — um único envio de melhor esforço

`DomainController.save` grava as linhas de `domains` e então faz uma **única chamada de melhor esforço** a `CaddyHelper.updateCaddy()`, envolvida em um `try/catch` que registra (`console.error`) e engole o erro; `delete` faz o mesmo (o que também corrigiu um bug anterior de rota obsoleta na exclusão), assim como a exclusão de site secundário (`SiteController.delete`). O próprio `updateCaddy` tem um limite de **10 s** no timeout do Axios, de modo que um Caddy inacessível ou parado nunca consegue gerar um `500` em um salvamento de domínio — a tabela `domains` é a fonte da verdade.

### Estado atual — configuração estática, sem estado em tempo de execução

A máquina (uma EC2 Windows atrás de um Elastic IP permanente) roda o Caddy a partir de um **Caddyfile estático**: TLS sob demanda cujo `ask` aponta para `/membership/domains/authorize`, mais um arquivo de mapa host→upstream atualizado a cada 5 minutos a partir de `/membership/domains/hostmap` por uma tarefa agendada que termina em um `caddy reload` gracioso. A configuração sobrevive a reinicializações sem nenhum estado em tempo de execução — sem o ritual de reconfiguração — e um SNI desconhecido é **recusado no TLS** (nenhum certificado é emitido para um host que o `authorize` rejeita), enquanto um host autorizado ainda não mapeado (um domínio recém-criado dentro da janela de sincronização) recebe um 404 limpo. Novos domínios se tornam roteáveis em até ~5 minutos após um salvamento; seus certificados são emitidos no primeiro acesso. Montagem/configuração, operação e armadilhas testadas em campo: [Proxy de domínio personalizado com Caddy](../deployment/caddy-proxy).

### Envio legado em tempo de execução — caminho de rollback, exclusão pendente

O `CaddyHelper` (módulo de membership) ainda consegue dirigir o Caddy pela sua **API administrativa** em `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; sem efeito quando não definido; aparece no grupo Integrações do `ServerHealthController`): `updateCaddy()` faz PATCH de um array completo de rotas, e `initializeCaddy()` + os endpoints `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstroem do zero um servidor configurado em tempo de execução. Esse modo mantinha a configuração apenas na memória do Caddy — a amnésia a cada reinício que esta arquitetura substituiu. A maquinaria permanece somente como caminho de rollback e está agendada para exclusão quando a máquina estática estiver estável; o envio `updateCaddy()` de melhor esforço ao salvar/excluir um domínio é um no-op inofensivo contra a máquina estática (a API administrativa dela só aceita localhost).

## Páginas relacionadas

- [Proxy de domínio personalizado com Caddy](../deployment/caddy-proxy) — a própria máquina de borda: configuração de uma máquina nova, serviço WinSW, tarefa de sincronização do mapa e armadilhas operacionais
- [Criador de sites](./website-builder) — a árvore de página/seção/elemento, os renderizadores, o blog, SEO e a geração por IA (o que é renderizado depois que uma requisição se resolve para uma igreja/site)
- [Endpoints de Content](../api/endpoints/content) — a superfície REST para páginas, blocos, links e estilos globais, todos agora sensíveis a `?siteId=`
- [B1App](../web-apps/b1-app) — o app Next.js que hospeda o middleware e o roteamento `[sdSlug]`
- [Implantação de apps web](../deployment/web-apps) — como o B1App é implantado na Vercel
