---
title: "Roteamento de Site e Multi-Site"
---

# Roteamento de Site e Multi-Site

<div class="article-intro">

Uma única igreja pode agora servir mais de um site distinto, e cada um pode estar em um subdomínio `*.b1.church` ou em um domínio totalmente personalizado, pertencente à igreja. Esta página mapeia a camada de roteamento que fica *sob* o construtor: como uma requisição recebida se resolve para uma igreja **e** para um site específico, o modelo de dados multi-site (o sentinela `siteId` que mantém cada site pré-existente renderizando inalterado), e a borda de domínio personalizado — um proxy Caddy auto-gerenciado em EC2 que termina TLS e reescreve cada domínio da igreja em seu `*.b1.church` upstream. Para o que realmente renderiza uma vez que uma requisição foi resolvida — a árvore de página/seção/elemento — veja [Website Builder](./website-builder).

</div>

## Visão geral

```
   grace.b1.church              www.gracechurch.org  (domínio personalizado)
   (subdomínio b1.church)               │
          │                             ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Borda Caddy — EC2 3.23.251.61             │
          │             │             (proxy.b1.church)             │
          │             │  • termina TLS (cert LE por domínio)      │
          │             │  • reescreve Host → {sub}.b1.church       │
          │             │  • proxy reverso para B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • sempre: deleta qualquer x-site fornecido pelo cliente    │
   │  • Host *.b1.church interno ⇒ lookup de domínios permanece  │
   │  • Host personalizado bruto (ignorando Caddy) ⇒ lookup →    │
   │    define x-site                                             │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → primeiro rótulo do host → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= em cada chamada de conteúdo:  │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  salvar/deletar domínio (B1Admin Settings→Domains → POST /membership/domains)
        └─ melhor esforço CaddyHelper.updateCaddy()  (envolvido, não fatal, timeout 10s)
  Caddy lê a tabela de domínios por dois endpoints anônimos:
        GET /membership/domains/authorize  — `ask` TLS on-demand (200 conhecido / 404 desconhecido)
        GET /membership/domains/hostmap    — mapa host→{sub}.b1.church (atualização 5 min)
```

Três regras valem nesta camada:

1. **Um sentinela mantém tudo compatível com versões anteriores.** `siteId = ''` é o site primário. Cada página, bloco, link, estilo global e linha de domínio que existia antes deste recurso carrega `''` e renderiza exatamente como fazia. Um *segundo* site é simplesmente um conjunto de linhas com um `siteId` não vazio, e qualquer endpoint de conteúdo chamado sem `?siteId=` retorna o site primário — byte a byte a requisição antiga.
2. **A resolução é baseada em rótulo de host e converge.** Um subdomínio `*.b1.church` roteia pelo seu rótulo de host diretamente; um domínio personalizado é reescrito para seu rótulo `{sub}.b1.church` na borda Caddy antes de B1App vê-lo (com um lookup de BD de middleware que carimba um header `x-site` como fallback para qualquer `Host` personalizado bruto). Ambas as pernas chegam na mesma rota `[sdSlug]` e na mesma chamada `churches/lookup`, então a renderização downstream é idêntica.
3. **A borda Caddy é sem estado sobre uma fonte de verdade.** Domínios personalizados terminam em um proxy Caddy auto-gerenciado em EC2 que reescreve cada domínio em seu `{sub}.b1.church` upstream. Um salvamento de domínio dispara um único `CaddyHelper.updateCaddy()` de melhor esforço, e Caddy também lê a tabela `domains` diretamente (os endpoints `authorize` e `hostmap` abaixo). A tabela é autoritária — um Caddy inacessível nunca pode falhar um salvamento.

## Resolução de site

### Subdomínios `*.b1.church`

`B1App/next.config.mjs` reescreve requisições recebidas por host. Uma regra de host com padrão `(?<subdomain>.*?)\..*` captura o **primeiro rótulo** do host e reescreve `/` e `/:path*` em `/{subdomain}` — o segmento `[sdSlug]` do App-Router. Então `grace.b1.church/about` torna-se `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chama `GET /membership/churches/lookup/?subDomain={sdSlug}`. A resposta `ChurchController.getBySubDomain` agora tem dois ramos:

| Slug corresponde | Resposta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site primário daquela igreja |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Um **site secundário** — o controlador recua para `sites`, resolve a igreja proprietária e ecoar o slug consultado mais o `siteId` extra |

Esse `siteId` extra é a única coisa que distingue uma requisição de site secundário de uma primária; tudo mais no pipeline é compartilhado.

### Domínios personalizados

Um domínio pertencente à igreja termina na **borda Caddy** (detalhado abaixo), que reescreve o header `Host` para o `{sub}.b1.church` do site antes de fazer proxy para B1App. Então no caminho normal B1App recebe um host `*.b1.church` *interno* e o resolve pelo rótulo de host exatamente como um subdomínio nativo — o lookup de BD do middleware nunca dispara. `src/middleware.ts` ainda executa em cada requisição, mas com um trabalho sempre ativo e um fallback:

1. **Sempre** — ele **deleta qualquer header `x-site` fornecido pelo cliente**. Esse header é entrada de reescrita falsificável e é apenas confiável quando o próprio middleware o define; removê-lo é o trabalho real do middleware atrás do Caddy.
2. **Fallback, apenas Host não-interno** — para um `Host` de domínio personalizado bruto que chega a B1App *sem* a reescrita de Caddy, ele chama `GET /membership/domains/public/lookup/{host}` e, se retorna um `subDomain`, define `x-site: {subDomain}.b1.church`. Atrás do Caddy este ramo é inerte porque o `Host` já é `*.b1.church`.

Hosts internos — `localhost`, `b1.church` e os sufixos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — pulam o lookup inteiramente (já estão resolvidos pela reescrita de rótulo de host, ou são hosts de preview/implantação).

O lookup em si (`DomainRepo.loadByName`) faz left-join `domains → churches` e `domains → sites` e retorna `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — o subdomínio do site secundário atribuído se o domínio aponta para um, caso contrário o da igreja. Ele corresponde ao host exato primeiro; se esse host começava com `www.` e errou, ele tenta novamente **uma vez** contra o apex nu.

De volta em `next.config.mjs`, as regras de reescrita `x-site` são colocadas **antes das** regras de host genéricas, então vencem. `x-site: grace.b1.church` → primeiro rótulo `grace` → `[sdSlug] = grace`, e daí a resolução é idêntica ao caminho de subdomínio (mesmo `churches/lookup`, mesmo `siteId`).

:::info
O header `x-site` não é confiável de fora. O middleware incondicionalmente remove qualquer `x-site` recebido antes de opcionalmente definir o seu próprio, e as regras de reescrita apenas veem o valor definido pelo middleware — um cliente não pode forçar a si mesmo ao conteúdo de outra igreja enviando um header.
:::

Dois detalhes operacionais do middleware:

- **Cache.** Resultado de cada host (um acerto *ou* uma falta confirmada — nunca um erro de rede) é armazenado em cache por **10 minutos** em um `Map` em memória, por isolado sem servidor.
- **Matcher.** O matcher deliberadamente re-inclui `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Seu primeiro padrão exclui caminhos com ponto, que de outra forma descartaria esses arquivos; eles são adicionados novamente para que os arquivos de SEO/PWA por-igreja de um domínio personalizado também recebam o header `x-site`.
- **Header canônico.** Para páginas de igreja, o middleware acrescenta um header de resposta `Link: <{proto}://{host}{path}>; rel="canonical"` nomeando o host do qual a página foi realmente servida — subdomínio ou domínio personalizado (`helpers/canonicalLink.ts`). É ignorado em hosts não-Igreja (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e em `/mobile`, `/login`, `/logout` e os arquivos robots/sitemap/manifest gerados.

### Site público desabilitado

Uma igreja pode ativar **Disable Public Website** em B1Admin (configuração de conteúdo no nível de igreja `hidePublicSite = "true"`). O site então serve apenas suas rotas voltadas para membros:

- **Middleware B1App** procura o subdomínio (`/membership/churches/lookup` depois `/content/settings/public/:churchId`) e redireciona requisições anônimas de qualquer caminho fora da lista de permissões para `/login?returnUrl={path}{query}`. A lista de permissões (`helpers/publicSite.ts`) é `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e os arquivos manifest/robots/sitemap. Apenas respostas confirmadas são armazenadas em cache (60 segundos em produção, pois a chamada revalidate do admin não pode limpar este mapa por instância; não armazenado em dev/test). Um erro de API serve o site em vez de bloquear todos.
- **Membros conectados veem o site completo.** Uma requisição carregando um cookie `jwt` não expirado (o `hasSession()` do middleware decodifica o `exp` da carga sem verificar a assinatura -- este é um portão leve, não controle de acesso) pula o redirecionamento, então após fazer login um membro retorna à página que pediu e vê as páginas normais, páginas construídas (Grupos, Sermões, etc.) e navegação de cabeçalho. Os componentes de página e `Header` não verificam mais `hidePublicSite` em si.
- **`robots.txt`** desaprova tudo, como em hosts noindex.
- **API.** `GET /content/pages/public/:churchId` (a lista de páginas do sitemap) retorna `[]`, então chamadores anônimos não podem listar as páginas.

### Threading de `siteId`

`ConfigHelper` armazena o `siteId` resolvido em sua `ConfigurationInterface` por-requisição (memoizada com React `cache()`) e acrescenta `?siteId=` às chamadas de conteúdo que ela e os componentes de página fazem — **condicionalmente**: um `siteId` vazio (um subdomínio de chiesa primária) omite o parâmetro inteiramente. Os endpoints com threading são a árvore de página (`/content/pages/:id/tree`), a lista de página pública usada pelo sitemap (`/content/pages/public/:id`), estilos globais (`/content/globalStyles/church/:id`), links de navegação (`/content/links/church/:id`) e o bloco de rodapé autônomo (`/content/blocks/public/footer/:id`). No caminho de renderização normal, o rodapé chega dentro da árvore de página (seções marcadas `zone: "siteFooter"`), já buscado com `siteId`, então não há uma lacuna de rodapé sem escopo.

O portal de membros (B1App `mobile`) intencionalmente fica fora disto: `loadChurchAppearance.ts` resolve a igreja via `churches/lookup`, mas lê a `/settings/public/{id}` no nível de igreja e nunca faz threading `siteId` — o portal é no nível de igreja na v1 (veja abaixo).

## Vários sites por igreja

### Modelo de dados

A nova tabela `membership.sites` é deliberadamente minúscula:

| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Igreja proprietária |
| `name` | `varchar(255)` | Nome de exibição (p.ex. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Índice único** — namespace global (abaixo) |

O escopo do site é então uma única coluna não-anulável adicionada às tabelas de conteúdo e domínio:

| Tabela (módulo) | Coluna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domínio serve o site primário |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site primário — e em **`blocks`**, `''` adicionalmente significa *compartilhado entre todos os sites* |

Duas migrações adicionam tudo isto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como a coluna padrão para `''`, cada linha existente mantém o comportamento de hoje sem preenchimento.

**Namespace de subdomínio global.** `sites.subDomain` compartilha *um* namespace com `churches.subDomain` — um subdomínio de site nunca pode colidir com um subdomínio de chiesa ou outro de site. Isto é imposto em **ambos** os caminhos de salvamento: `SiteController.save` rejeita um slug que acerta `churches` ou `sites`, e `ChurchController.validateSave` faz o inverso. Um índice único em `sites.subDomain` o respalda no nível do banco de dados.

**Exclusividade de páginas** ampliada de `(churchId, url)` para `(churchId, siteId, url)`, então dois sites de uma chiesa podem cada um possuir seu próprio `/about`.

### Conteúdo por site, com fallbacks

Cada endpoint de **list/tree** de conteúdo com escopo de site aceita um opcional `?siteId=` (ausente ⇒ `''` = primário): árvore/lista/pública de páginas, lista/por-tipo/rodapé de blocos, links (anon / filtrado / tudo) e estilos globais. Seções e elementos são *não* com escopo direto — eles herdam através de sua página ou bloco pai.

Duas cadeias de resolução fazem o trabalho interessante:

- **Estilos globais — `site → primário → padrão`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retorna a linha do site; se um site secundário não tem nenhum, retorna a linha **primária (`''`) como está** (mantendo o `id`/`siteId` do primário, que o cliente usa para copy-on-write); se não há primária também, `GlobalStyleController` retorna uma paleta/fontes padrão embutida.
- **Bloco de rodapé — específico do site vence, compartilhado recua.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retorna as linhas compartilhadas (`''`) *e* específicas do site; o resolvedor pega o rodapé do site se presente, senão o compartilhado. A mesma lógica executa tanto em `TreeHelper.insertBlocks` (árvore de página) quanto no endpoint `/content/blocks/public/footer/:churchId` autônomo.

### Cascata de deleção de site

`SiteController.delete` (controlado pela permissão membership Settings→Edit) destrói um site secundário em três etapas:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascata todo o conteúdo que o site possui: suas **páginas** → suas seções, elementos, `pageHistory` e `posts`; seus próprios **blocos** → suas seções, elementos e `pageHistory`; seus **links** e **globalStyles**. Uma proteção recusa-se a executar para `''` — o sentinela primário/compartilhado nunca é cascata.
2. `DomainRepo.clearSiteId` **reatribui** os domínios do site de volta ao primário (`siteId → ''`) em vez de deletá-los, então um domínio personalizado sobrevive a uma deleção de site.
3. A linha `sites` é deletada e as rotas Caddy são re-sincronizadas (melhor esforço).

### Superfície B1Admin

| Capacidade | Onde | Mecanismo |
|-----------|-------|-----------|
| Comutador de site | `useSiteSelection` + `SiteSwitcher` (vazio = "Main Website") | Lê um parâmetro `?site=` de URL e o encadeia como `?siteId=` em chamadas ContentApi. Presente nas três áreas de **list** de Site — **Pages**, **Blocks**, **Appearance** — mas *não* nos editores de página/bloco, que carregam `siteId` no registro |
| Sites criar/deletar | `SitesDialog`, aberto da entrada "Manage websites…" do comutador | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Controlado pela permissão membership Settings→Edit (`Permissions.settings.edit` lado do servidor; `Permissions.membershipApi.settings.edit` em B1Admin). **Apenas criar/deletar — não há UI de renomeação na v1** |
| Atribuição de site por domínio | `DomainSettingsEdit` sob Settings→Domains | Um dropdown de site por-linha publica `siteId` por domínio para `/membership/domains`. A coluna se esconde se a API não retorna sites (backend antigo) |
| Estilos copy-on-write | `StylesManager.prepareForSave` | Quando a linha de estilo global carregada `siteId` não corresponde ao site selecionado (i.e. a API retornou o primário herdado como fallback), descarta o `id` do primário e carimba o `siteId` atual, forçando um **insert** de uma nova linha específica do site em vez de sobrescrever a primária. O mesmo fork-on-mismatch aplica ao bloco rodapé do site |

:::info
**O que permanece no nível de chiesa em v1 (uma escolha de escopo deliberada, não um limite de modelo de dados):** o **blog** (`BlogPage` não tem comutador e carrega `/posts` sem `siteId`), os **widgets de site** (banner de anúncio + inicializador), **redirecionamentos**, o **logo / GA4 / configurações de chiesa**, e o **portal de membros** (B1App mobile). Note que isto é *não* "tudo de Appearance" — os estilos globais de um site secundário (paleta, fontes, tipografia, espaçamento, navegação, CSS personalizado) **são** por-site via o caminho copy-on-write acima; apenas os sub-painéis de banner/inicializador/redirecionamentos/logo da página Appearance permanecem no nível de chiesa.
:::

## Domínios personalizados: Caddy edge (plano de configuração estática)

:::info
**Direção revisada 2026-07-02.** Um plano anterior para mover hospedagem de domínio personalizado para domínios gerenciados por Vercel foi **cancelado**, e todo o código de registro de domínio Vercel (`VercelHelper`, seus env vars `vercelToken`/`vercelProjectId`/`vercelTeamId`, parâmetros SSM e entradas de saúde) foi removido da Api. O proxy Caddy auto-gerenciado **em EC2 permanece** como a borda de domínio personalizado permanente. O único trabalho restante é interno: trocar a configuração de *runtime* de Caddy por uma *estática* que sobrevive a reinicializações.
:::

### A borda

Cada domínio de chiesa personalizado aponta DNS em uma caixa EC2 — `3.23.251.61`, também alcançável como `proxy.b1.church`. A tela Settings→Domains do B1Admin instrui igrejas a adicionar um apex `A → 3.23.251.61` ou um `CNAME → proxy.b1.church`. Caddy termina TLS com um cert Let's Encrypt por-domínio, reescreve o header `Host` para o `{sub}.b1.church` do domínio upstream e faz proxy reverso para B1App — que depois o roteia pelo rótulo de host como qualquer subdomínio nativo (veja [Domínios personalizados](#domínios-personalizados) acima).

O mapeamento upstream vem de `DomainRepo.loadPairs`, cujo dial **COALESCEs o subdomínio do site atribuído** então um domínio faz proxy para o site *secundário* correto, recuando para o primário da chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Linhas `www.*` são excluídas do mapa; Caddy serve `www.{host}` via um redirecionamento `302` para o apex em vez disto.

### Dois endpoints anônimos alimentam a borda

`DomainController` expõe dois endpoints não autenticados, apenas leitura, que a caixa consome diretamente — anônimos por necessidade, pois a borda os consulta antes de qualquer contexto de chiesa existir:

| Endpoint | Retorna | Papel |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` se o domínio — ou, para uma falta `www.`, seu apex nu — existe em `domains`; `404` caso contrário (incluindo um `domain` vazio) | **`ask` TLS on-demand** do Caddy: o controle de abuso decidindo se emitirai um cert para um SNI recebido |
| `GET /membership/domains/hostmap` | `text/plain`, uma linha `{domain} {sub}.b1.church` ordenada por domínio rotável | O arquivo de mapa host→upstream que a caixa atualiza em um timer |

`authorize` reusa `DomainRepo.loadByName` (host exato, depois uma única retentativa `www.`→apex); `hostmap` reusa `loadPairs` — então é site-consciente e `www.*`-excluído, idêntico às rotas proxy — e apenas remove o sufixo `:443`.

### Salvar/deletar domínio — um push de melhor esforço único

`DomainController.save` escreve as linhas `domains` e então faz um **único** call `CaddyHelper.updateCaddy()` de **melhor esforço**, envolvido em um `try/catch` que registra (`console.error`) e enclausura; `delete` faz o mesmo (que também corrigiu um bug anterior de rota obsoleta ao deletar), assim como deleção de site secundário (`SiteController.delete`). `updateCaddy` em si é limitado por um timeout **10s** Axios, então um Caddy inacessível ou parado nunca pode `500` um salvamento de domínio — a tabela `domains` é a fonte de verdade.

### Estado atual — configuração estática, sem estado de runtime

A caixa (Windows EC2 atrás do Elastic IP permanente) executa Caddy de um **Caddyfile estático**: TLS on-demand cujo `ask` aponta para `/membership/domains/authorize`, mais um arquivo de mapa host→upstream atualizado a cada 5 minutos de `/membership/domains/hostmap` por uma tarefa agendada que termina em um `caddy reload` graciós. Config sobrevive a reinicializações com estado de runtime zero — nenhuma dança de re-priming — e um SNI desconhecido é **TLS-recusado** (nenhum cert é cunhado para um host que `authorize` rejeita), enquanto um host autorizado mas não-ainda-mapeado (um domínio novo-brandindo dentro da janela de sincronização) obtém um clean 404. Novos domínios tornam-se rotáveis dentro de ~5 minutos de um salvamento; seus certificados são cunhados no primeiro acerto. Build/setup, operações e gotchas testados em campo: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legado push de runtime — caminho de rollback, pendente exclusão

`CaddyHelper` (módulo membership) ainda pode orientar Caddy através de seu **admin API** em `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; noop quando não definido; superfície sob grupo Integrations do `ServerHealthController`): `updateCaddy()` PATCHes um array completo de rotas, e `initializeCaddy()` + os endpoints `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruem um servidor configurado em tempo de execução do zero. O config daquele modo viveu apenas na memória de Caddy — a amnesia de reinicialização que esta arquitetura substituiu. A maquinaria permanece somente como o caminho de rollback e está agendada para exclusão assim que a caixa estática for estável; o push `updateCaddy()` de melhor esforço em salvar/deletar domínio é um noop inofensivo contra a caixa estática (seu admin API é apenas localhost).

## Páginas Relacionadas

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — a caixa de borda em si: setup de caixa fresca, serviço WinSW, tarefa de sincronização de mapa e gotchas operacionais
- [Website Builder](./website-builder) — a árvore página/seção/elemento, renderizadores, blog, SEO e geração de IA (o que renderiza uma vez que uma requisição foi resolvida para uma chiesa/site)
- [Content Endpoints](../api/endpoints/content) — a superfície REST para páginas, blocos, links e estilos globais, tudo agora `?siteId=`-consciente
- [B1App](../web-apps/b1-app) — a app Next.js que hospeda o middleware e roteamento `[sdSlug]`
- [Web App Deployment](../deployment/web-apps) — como B1App é implantado para Vercel
