---
title: "Roteamento de Website e Multi-Site"
---

# Roteamento de Website e Multi-Site

<div class="article-intro">

Uma única chiesa agora pode servir mais de um site distinto, e cada um pode viver em um subdomínio `*.b1.church` ou em um domínio totalmente personalizado de propriedade da chiesa. Esta página mapeia a camada de roteamento que fica *debaixo* do construtor: como uma solicitação de entrada se resolve para uma chiesa **e** para um site específico, o modelo de dados multi-site (o sentinel `siteId` que mantém cada site pré-existente renderizando inalterado) e a borda de domínio personalizado — um proxy Caddy auto-gerenciado em EC2 que termina TLS e reescreve cada domínio de chiesa em seu upstream `*.b1.church`. Para o que realmente renderiza uma vez que uma solicitação foi resolvida — a árvore página/seção/elemento — veja [Website Builder](./website-builder).

</div>

## Visão Geral

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

Três regras mantêm através desta camada:

1. **Um sentinel mantém tudo compatível com versões anteriores.** `siteId = ''` é o site principal. Cada página, bloco, link, estilo global e linha de domínio que existia antes deste recurso carrega `''` e renderiza exatamente como fazia. Um *segundo* site é simplesmente um conjunto de linhas com um `siteId` não vazio, e qualquer ponto de extremidade de conteúdo chamado sem `?siteId=` retorna o site principal — byte-por-byte a solicitação antiga.
2. **A resolução é baseada em rótulo de host e converge.** Um subdomínio `*.b1.church` roteia por seu rótulo de host diretamente; um domínio personalizado é reescrito para seu rótulo `{sub}.b1.church` na borda Caddy antes de B1App vê-lo (com uma pesquisa de banco de dados de middleware que carimba um cabeçalho `x-site` como fallback para qualquer `Host` personalizado bruto). Ambas as pernas aterrissam na mesma rota `[sdSlug]` e a mesma chamada `churches/lookup`, para que a renderização downstream seja idêntica.
3. **A borda Caddy é sem estado sobre uma única fonte de verdade.** Domínios personalizados terminam em um proxy Caddy auto-gerenciado em EC2 que reescreve cada domínio em seu upstream `{sub}.b1.church`. Uma economia de domínio dispara uma única `CaddyHelper.updateCaddy()` de melhor esforço, e Caddy também lê a tabela `domains` diretamente (os pontos de extremidade `authorize` e `hostmap` abaixo). A tabela é autoritativa — um Caddy inacessível nunca pode falhar uma economia.

## Resolução de Site

### Subdomínios `*.b1.church`

`B1App/next.config.mjs` reescreve solicitações de entrada por host. Uma regra de host com o padrão `(?<subdomain>.*?)\..*` captura o **primeiro rótulo** do host e reescreve `/` e `/:path*` em `/{subdomain}` — o segmento App-Router `[sdSlug]`. Então `grace.b1.church/about` se torna `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chama `GET /membership/churches/lookup/?subDomain={sdSlug}`. A resposta `ChurchController.getBySubDomain` agora tem duas ramificações:

| Slug corresponde a | Resposta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal dessa igreja |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Um **site secundário** — o controlador recua para `sites`, resolve a chiesa proprietária e ecoa o slug consultado mais o extra `siteId` |

Esse `siteId` extra é a única coisa que distingue uma solicitação de site secundário de uma primária; tudo o mais no pipeline é compartilhado.

### Domínios personalizados

Um domínio de propriedade de chiesa termina na **borda Caddy** (descrito abaixo), que reescreve o cabeçalho `Host` para o `{sub}.b1.church` do site antes de fazer proxy para B1App. Então no caminho normal B1App recebe um host *interno* `*.b1.church` e o resolve por rótulo de host exatamente como um subdomínio nativo — a pesquisa de banco de dados do middleware nunca dispara. `src/middleware.ts` ainda funciona em cada solicitação, mas com um trabalho sempre ativado e um fallback:

1. **Sempre** — ele **exclui qualquer cabeçalho `x-site` fornecido pelo cliente**. Esse cabeçalho é entrada de reescrita spoofable e é apenas confiável quando o middleware em si o define; despojá-lo é o trabalho real do middleware atrás do Caddy.
2. **Fallback, apenas `Host` não interno** — para um `Host` de domínio personalizado bruto que alcança B1App *sem* a reescrita de Caddy, ele chama `GET /membership/domains/public/lookup/{host}` e, se isso retornar um `subDomain`, define `x-site: {subDomain}.b1.church`. Atrás do Caddy este ramo é inerte porque o `Host` já é `*.b1.church`.

Hosts internos — `localhost`, `b1.church` e os sufixos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — pulam a pesquisa inteiramente (eles já são resolvidos pela reescrita de rótulo de host ou são hosts de visualização/implantação).

A pesquisa em si (`DomainRepo.loadByName`) deixa-une `domains → churches` e `domains → sites` e retorna `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — o subdomínio do site secundário atribuído se o domínio aponta para um, caso contrário o da chiesa. Corresponde ao host exato primeiro; se aquele host começou com `www.` e errou, tenta novamente **uma vez** contra o ápice nu.

De volta em `next.config.mjs`, as regras de reescrita `x-site` são colocadas **à frente de** as regras de host genéricas, para que vençam. `x-site: grace.b1.church` → primeiro rótulo `grace` → `[sdSlug] = grace`, e a partir daí a resolução é idêntica ao caminho de subdomínio (mesmo `churches/lookup`, mesmo `siteId`).

:::info
O cabeçalho `x-site` é não confiável de fora. O middleware incondicionalmente retira qualquer `x-site` recebido antes de opcionalmente definir seu próprio, e as regras de reescrita apenas veem o valor definido pelo middleware — um cliente não pode se forçar no conteúdo de outra chiesa enviando um cabeçalho.
:::

Dois detalhes operacionais sobre o middleware:

- **Cache.** O resultado de cada host (uma acerto *ou* um erro confirmado — nunca um erro de rede) é armazenado em cache por **10 minutos** em um `Map` em memória, por isolate sem servidor.
- **Matcher.** O matcher deliberadamente re-inclui `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Seu primeiro padrão exclui caminhos pontilhados, que de outra forma descartaria esses arquivos; eles são adicionados novamente para que os arquivos SEO/PWA por chiesa de um domínio personalizado também recebam o cabeçalho `x-site`.

### Threading `siteId`

`ConfigHelper` armazena o `siteId` resolvido em sua `ConfigurationInterface` por solicitação (memorizado com React `cache()`) e anexa `?siteId=` ao conteúdo que ele e os componentes de página fazem — **condicionalmente**: um `siteId` vazio (um subdomínio de chiesa primária) omite o parâmetro completamente. Os pontos de extremidade encadeados são a árvore de página (`/content/pages/:id/tree`), a lista de página pública usada pelo sitemap (`/content/pages/public/:id`), estilos globais (`/content/globalStyles/church/:id`), links de nav (`/content/links/church/:id`) e o bloco de rodapé autossuficiente (`/content/blocks/public/footer/:id`). No caminho de renderização normal o rodapé chega dentro da árvore de página (seções marcadas `zone: "siteFooter"`), já buscado com `siteId`, portanto não há lacuna de rodapé sem escopo.

O portal de membros (B1App `mobile`) intencionalmente fica fora disto: `loadChurchAppearance.ts` resolve a chiesa via `churches/lookup` mas lê a igreja-level `/settings/public/{id}` e nunca encadeia `siteId` — o portal é em toda a igreja em v1 (veja abaixo).

## Múltiplos websites por chiesa

### Modelo de dados

A nova tabela `membership.sites` é deliberadamente minúscula:

| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Chiesa proprietária |
| `name` | `varchar(255)` | Nome de exibição (ex: "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — namespace global (abaixo) |

O escopo do site é então uma única coluna anulável adicionada aos conteúdo e tabelas de domínio:

| Tabela (módulo) | Coluna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domínio serve o site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal — e em **`blocks`**, `''` adicionalmente significa *compartilhado em todos os sites* |

Duas migrações adicionam tudo isto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como a coluna padrão para `''`, cada linha existente mantém o comportamento de hoje sem retorno.

**Namespace de subdomínio global.** `sites.subDomain` compartilha *um* namespace com `churches.subDomain` — um subdomínio de site nunca pode colidir com um subdomínio de chiesa ou outro do site. Isto é aplicado em **ambos** caminhos de economia: `SiteController.save` rejeita um slug que acerta `churches` ou `sites`, e `ChurchController.validateSave` faz o mesmo no reverso. Um índice único em `sites.subDomain` o respalda ao nível de banco de dados.

**Unicidade de Pages** ampliada de `(churchId, url)` para `(churchId, siteId, url)`, então dois sites de uma chiesa podem cada possuir seu próprio `/about`.

### Conteúdo por site, com Fallbacks

Cada lista/árvore de conteúdo com escopo de site toma um `?siteId=` opcional (ausente ⇒ `''` = primária): árvore de páginas / lista / público, lista de blocos / por tipo / rodapé, links (anon / filtrado / todos) e estilos globais. Seções e elementos são *não* com escopo direto — eles herdam através de sua página pai ou bloco.

Duas cadeias de resolução fazem o trabalho interessante:

- **Estilos globais — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retorna a linha do site; se um site secundário não tem nenhum, ele retorna a **linha principal (`''`) como está** (mantendo os `id`/`siteId` primários, que o cliente usa para cópia-na-escrita); se não há nenhum primário também, `GlobalStyleController` retorna uma paleta/fontes padrão codificadas.
- **Bloco de rodapé — específico do site vence, compartilhado retorna.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retorna as linhas compartilhadas (`''`) *e* específicas do site; o resolvedor escolhe o rodapé do site se presente, senão aquele compartilhado. A mesma lógica executa tanto em `TreeHelper.insertBlocks` (árvore de página) quanto no ponto de extremidade autossuficiente `/content/blocks/public/footer/:churchId`.

### Cascata de exclusão de site

`SiteController.delete` (controlado na permissão membership Settings→Edit) rasga um site secundário em três etapas:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascatas todo conteúdo que o site possui: suas **páginas** → suas seções, elementos, `pageHistory` e `posts`; seus próprios **blocos** → suas seções, elementos e `pageHistory`; seus **links** e **globalStyles**. Uma guarda recusa correr para `''` — o sentinel principal/compartilhado é nunca cascata.
2. `DomainRepo.clearSiteId` **reatribui** os domínios do site de volta ao primário (`siteId → ''`) em vez de deletar, portanto um domínio personalizado sobrevive a uma exclusão de site.
3. A linha `sites` é deletada e as rotas Caddy são re-sincronizadas (melhor esforço).

### Superfície B1Admin

| Capacidade | Onde | Mecanismo |
|-----------|-------|-----------|
| Alternador de site | `useSiteSelection` + `SiteSwitcher` (vazio = "Main Website") | Lê um parâmetro URL `?site=` e o encadeia como `?siteId=` em chamadas ContentApi. Presente nas três áreas de **lista** Site — **Páginas**, **Blocos**, **Aparência** — mas *não* os editores de página/bloco, que carregam `siteId` no registro |
| Criar/excluir sites | `SitesDialog`, aberto da entrada "Manage websites…" do alternador | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Controlado na permissão membership Settings→Edit (`Permissions.settings.edit` no lado do servidor; `Permissions.membershipApi.settings.edit` em B1Admin). **Apenas criar/excluir — não há UI de renomear em v1** |
| Atribuição de site por domínio | `DomainSettingsEdit` sob Settings→Domains | Uma lista suspensa de site por linha publica `siteId` por domínio para `/membership/domains`. A coluna se oculta se a API não retorna sites (backend mais antigo) |
| Estilos de cópia-na-escrita | `StylesManager.prepareForSave` | Quando a linha de estilo global carregada `siteId` não corresponde ao site selecionado (isto é, a API retornou o primário herdado como fallback), ele cai o `id` primário e carimba o `siteId` atual, forçando uma **inserção** de uma nova linha específica do site em vez de sobrescrever a primária. A mesma bifurcação em incompatibilidade se aplica ao bloco de rodapé do site |

:::info
**O que permanece em toda a chiesa em v1 (uma escolha de escopo deliberada, não uma limitação de modelo de dados):** o **blog** (`BlogPage` não tem alternador e carrega `/posts` sem `siteId`), os **widgets do site** (banner de anúncio + lançador), **redirecionamentos**, o **logo / GA4 / configurações da chiesa** e o **portal de membros** (B1App móvel). Observe que isto é *não* "tudo de Aparência" — os estilos globais de um site secundário (paleta, fontes, tipografia, espaçamento, nav, CSS personalizado) **são** por site via o caminho de cópia-na-escrita acima; apenas os painéis de sub-banner/lançador/redirecionamentos/logo da página Aparência permanecem em toda a igreja.
:::

## Domínios personalizados: Borda Caddy (plano de config estática)

:::info
**Direção revista 2026-07-02.** Um plano anterior para mover hospedagem de domínio personalizado em domínios gerenciados por Vercel foi **cancelado**, e todo código de registro de domínio Vercel (`VercelHelper`, suas variáveis `vercelToken`/`vercelProjectId`/`vercelTeamId` env, parâmetros SSM e entradas de saúde) foi removido da API. O **proxy Caddy auto-gerenciado em EC2 permanece** como a borda de domínio personalizado permanente. O único trabalho restante é interno: trocar a configuração *em tempo de execução* admin-API de Caddy por um config *estático* que sobreviva reinicializações.
:::

### A borda

Cada domínio de igreja personalizado aponta DNS em uma caixa EC2 — `3.23.251.61`, também acessível como `proxy.b1.church`. A tela Settings→Domains de B1Admin instrui igrejas a adicionar um ápice `A → 3.23.251.61` ou um `CNAME → proxy.b1.church`. Caddy termina TLS com um cert Let's Encrypt por domínio, reescreve o cabeçalho `Host` para o upstream `{sub}.b1.church` do domínio e faz proxy reverso para B1App — que então o roteia por rótulo de host como qualquer subdomínio nativo (veja [Domínios personalizados](#custom-domains) acima).

O mapeamento upstream vem de `DomainRepo.loadPairs`, cujo dial **COALESCE o subdomínio atribuído do site** para que um domínio faça proxy para o site *secundário* correto, retornando para o primário da chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Linhas `www.*` são excluídas do mapa; Caddy serve `www.{host}` via um redirecionamento `302` para o ápice em vez disso.

### Dois pontos de extremidade anônimos alimentam a borda

`DomainController` expõe dois pontos de extremidade não autenticados, apenas leitura que a caixa consome diretamente — anônimos por necessidade, já que a borda os consulta antes que qualquer contexto de chiesa exista:

| Ponto de Extremidade | Retorna | Papel |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` se o domínio — ou, para um erro `www.`, seu ápice nu — existe em `domains`; `404` caso contrário (incluindo um `domain` vazio) | **on-demand-TLS `ask`** de Caddy: o controle de abuso decidindo se emitirem cert para um SNI recebido |
| `GET /membership/domains/hostmap` | `text/plain`, uma linha `{domain} {sub}.b1.church` classificada por domínio roteável | O arquivo de mapa host→upstream que a caixa atualiza em um timer |

`authorize` reutiliza `DomainRepo.loadByName` (host exato, depois uma única tentativa `www.`→ápice); `hostmap` reutiliza `loadPairs` — portanto é consciente do site e `www.*`-excluído, idêntico às rotas do proxy — e apenas retira o sufixo `:443`.

### Economia/exclusão de domínio — um push de melhor esforço

`DomainController.save` escreve as linhas `domains` e depois faz uma chamada **única melhor esforço** `CaddyHelper.updateCaddy()`, envolvida em um `try/catch` que registra (`console.error`) e silencia; `delete` faz o mesmo (que também corrigiu um bug de rota antiga em exclusão anterior), assim como exclusão de site secundário (`SiteController.delete`). `updateCaddy` é em si limitado por um timeout de **10s** Axios, portanto um Caddy inacessível ou parado nunca pode `500` uma economia de domínio — a tabela `domains` é a fonte de verdade.

### Estado atual — config estática, sem estado em tempo de execução

A caixa (Windows EC2 atrás do Elastic IP permanente) executa Caddy de um **Caddyfile estático**: on-demand TLS cujo `ask` aponta para `/membership/domains/authorize`, mais um arquivo de mapa host→upstream atualizado a cada 5 minutos de `/membership/domains/hostmap` por uma tarefa agendada que termina em um `caddy reload` graciosa. Config sobrevive reinicializações com zero estado em tempo de execução — nenhuma dança de re-preparação — e um SNI desconhecido é **TLS-recusado** (nenhum cert é cunhado para um host que `authorize` rejeita), enquanto um host autorizado mas não-ainda-mapeado (um domínio novo dentro da janela de sincronização) recebe um 404 limpo. Novos domínios se tornam roteavéis dentro de ~5 minutos de uma economia; seus certificados são cunhados no primeiro acerto. Build/setup, operações e gotchas de campo-testado: [Proxy de Domínio Personalizado Caddy](../deployment/caddy-proxy).

### Push em tempo de execução legado — caminho de rollback, pendente de exclusão

`CaddyHelper` (módulo de associação) ainda pode conduzir Caddy através de sua **admin API** em `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op quando não definido; superfícié em grupo Integrações de `ServerHealthController`): `updateCaddy()` PATCH um array de rotas completo, e `initializeCaddy()` + os pontos de extremidade `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstrõem um servidor configurado em tempo de execução do zero. O config daquele modo vivia apenas na memória de Caddy — a amnesia de reinicialização que esta arquitetura substituiu. A maquinaria permanece solely como o caminho de rollback e é agendada para exclusão uma vez que a caixa estática tenha sido estável; o push de melhor esforço `updateCaddy()` em economia/exclusão de domínio é um no-op inofensivo contra a caixa estática (sua admin API é apenas localhost).

## Páginas Relacionadas

- [Proxy de Domínio Personalizado Caddy](../deployment/caddy-proxy) — a caixa de borda em si: setup de caixa fresca, serviço WinSW, tarefa de sincronização de mapa e gotchas operacionais
- [Website Builder](./website-builder) — a árvore página/seção/elemento, renderizadores, blog, SEO e geração de IA (o que renderiza uma vez resolvida uma solicitação para uma chiesa/site)
- [Pontos de Extremidade de Conteúdo](../api/endpoints/content) — a superfície REST para páginas, blocos, links e estilos globais, agora todas `?siteId=`-aware
- [B1App](../web-apps/b1-app) — o aplicativo Next.js que hospeda o middleware e roteamento `[sdSlug]`
- [Implantação de Aplicativo Web](../deployment/web-apps) — como B1App é implantado em Vercel
