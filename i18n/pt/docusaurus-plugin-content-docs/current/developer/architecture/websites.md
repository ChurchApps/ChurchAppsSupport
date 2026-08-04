---
title: "Roteamento de Website e Multi-Site"
---

# Roteamento de Website e Multi-Site

<div class="article-intro">

Uma única igreja agora pode servir mais de um site distinto, e cada um pode viver em um subdomínio `*.b1.church` ou em um domínio totalmente personalizado, de propriedade da igreja. Esta página mapeia a camada de roteamento que fica *abaixo* do construtor: como uma solicitação recebida se resolve para uma igreja **e** para um site específico, o modelo de dados multi-site (o sentinela `siteId` que mantém todo site pré-existente renderizando sem mudanças), e a borda de domínio personalizado — um proxy Caddy autogerenciado em EC2 que termina TLS e reescreve cada domínio de igreja para seu upstream `*.b1.church`. Para saber o que de fato é renderizado depois que uma solicitação é resolvida — a árvore de página/seção/elemento — veja [Website Builder](./website-builder).

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

Três regras se mantêm ao longo desta camada:

1. **Um sentinela mantém tudo retrocompatível.** `siteId = ''` é o site principal. Toda página, bloco, link, estilo global e linha de domínio que já existia antes deste recurso carrega `''` e renderiza exatamente como antes. Um *segundo* site é simplesmente um conjunto de linhas com um `siteId` não vazio, e qualquer ponto de extremidade de conteúdo chamado sem `?siteId=` retorna o site principal — byte a byte, a mesma solicitação antiga.
2. **A resolução é baseada no rótulo do host e converge.** Um subdomínio `*.b1.church` roteia diretamente pelo seu rótulo de host; um domínio personalizado é reescrito para seu rótulo `{sub}.b1.church` na borda do Caddy antes que o B1App o veja (com uma busca no banco de dados feita pelo middleware que carimba um cabeçalho `x-site` como reserva para qualquer `Host` personalizado bruto). Ambos os caminhos chegam à mesma rota `[sdSlug]` e à mesma chamada `churches/lookup`, então a renderização a jusante é idêntica.
3. **A borda do Caddy é sem estado, sobre uma única fonte de verdade.** Domínios personalizados terminam em um proxy Caddy autogerenciado em EC2 que reescreve cada domínio para seu upstream `{sub}.b1.church`. Salvar um domínio dispara um único `CaddyHelper.updateCaddy()` de melhor esforço, e o Caddy também lê a tabela `domains` diretamente (os pontos de extremidade `authorize` e `hostmap` abaixo). A tabela é a autoridade — um Caddy inacessível nunca pode fazer uma gravação falhar.

## Resolução de Site

### Subdomínios `*.b1.church`

`B1App/next.config.mjs` reescreve solicitações recebidas por host. Uma regra de host com o padrão `(?<subdomain>.*?)\..*` captura o **primeiro rótulo** do host e reescreve `/` e `/:path*` para `/{subdomain}` — o segmento App-Router `[sdSlug]`. Então `grace.b1.church/about` se torna `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chama `GET /membership/churches/lookup/?subDomain={sdSlug}`. A resposta de `ChurchController.getBySubDomain` agora tem duas ramificações:

| O slug corresponde a | Resposta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal daquela igreja |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Um **site secundário** — o controlador recorre a `sites`, resolve a igreja proprietária, e ecoa o slug consultado mais o `siteId` extra |

Esse `siteId` extra é a única coisa que distingue uma solicitação de site secundário de uma primária; tudo o mais no pipeline é compartilhado.

### Domínios personalizados

Um domínio de propriedade da igreja termina na **borda do Caddy** (detalhada abaixo), que reescreve o cabeçalho `Host` para o `{sub}.b1.church` do site antes de fazer o proxy para o B1App. Assim, no caminho normal, o B1App recebe um host *interno* `*.b1.church` e o resolve pelo rótulo de host exatamente como faria com um subdomínio nativo — a busca no banco de dados do middleware nunca dispara. `src/middleware.ts` ainda roda em toda solicitação, mas com uma tarefa sempre ativa e uma reserva:

1. **Sempre** — ele **exclui qualquer cabeçalho `x-site` fornecido pelo cliente**. Esse cabeçalho é uma entrada de reescrita falsificável, e só é confiável quando o próprio middleware o define; removê-lo é o verdadeiro trabalho do middleware por trás do Caddy.
2. **Reserva, apenas para `Host` não interno** — para um `Host` de domínio personalizado bruto que chega ao B1App *sem* a reescrita do Caddy, ele chama `GET /membership/domains/public/lookup/{host}` e, se isso retornar um `subDomain`, define `x-site: {subDomain}.b1.church`. Por trás do Caddy, esse ramo fica inerte porque o `Host` já é `*.b1.church`.

Hosts internos — `localhost`, `b1.church`, e os sufixos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — pulam a busca por completo (já são resolvidos pela reescrita de rótulo de host, ou são hosts de pré-visualização/implantação).

A própria busca (`DomainRepo.loadByName`) faz um left-join de `domains → churches` e `domains → sites` e retorna `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — o subdomínio do site secundário atribuído, se o domínio apontar para um, caso contrário o da igreja. Ela corresponde primeiro ao host exato; se esse host começava com `www.` e não encontrou, tenta novamente **uma vez** contra o ápice puro.

De volta em `next.config.mjs`, as regras de reescrita `x-site` são colocadas **antes** das regras genéricas de host, para que prevaleçam. `x-site: grace.b1.church` → primeiro rótulo `grace` → `[sdSlug] = grace`, e a partir daí a resolução é idêntica ao caminho de subdomínio (mesmo `churches/lookup`, mesmo `siteId`).

:::info
O cabeçalho `x-site` não é confiável quando vem de fora. O middleware incondicionalmente remove qualquer `x-site` recebido antes de opcionalmente definir o seu próprio, e as regras de reescrita só veem o valor definido pelo middleware — um cliente não consegue se forçar sobre o conteúdo de outra igreja enviando um cabeçalho.
:::

Dois detalhes operacionais sobre o middleware:

- **Cache.** O resultado de cada host (um acerto *ou* uma ausência confirmada — nunca um erro de rede) é armazenado em cache por **10 minutos** em um `Map` em memória, por isolado sem servidor.
- **Correspondência de rotas.** O matcher deliberadamente reinclui `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Seu primeiro padrão exclui caminhos com ponto, o que de outra forma descartaria esses arquivos; eles são adicionados de volta para que os arquivos de SEO/PWA por igreja de um domínio personalizado também recebam o cabeçalho `x-site`.

### Encadeamento de `siteId`

`ConfigHelper` armazena o `siteId` resolvido em sua `ConfigurationInterface` por solicitação (memorizada com o `cache()` do React) e acrescenta `?siteId=` às chamadas de conteúdo que ele e os componentes de página fazem — **condicionalmente**: um `siteId` vazio (um subdomínio de igreja principal) omite o parâmetro por completo. Os pontos de extremidade encadeados são a árvore de página (`/content/pages/:id/tree`), a lista pública de páginas usada pelo sitemap (`/content/pages/public/:id`), os estilos globais (`/content/globalStyles/church/:id`), os links de navegação (`/content/links/church/:id`), e o bloco de rodapé independente (`/content/blocks/public/footer/:id`). No caminho normal de renderização, o rodapé chega dentro da árvore de página (seções marcadas `zone: "siteFooter"`), já buscadas com `siteId`, então não há lacuna de rodapé sem escopo.

O portal de membros (`mobile` do B1App) intencionalmente fica fora disso: `loadChurchAppearance.ts` resolve a igreja via `churches/lookup`, mas lê `/settings/public/{id}` no nível da igreja e nunca encadeia `siteId` — o portal é da igreja inteira na v1 (veja abaixo).

## Múltiplos websites por igreja

### Modelo de dados

A nova tabela `membership.sites` é deliberadamente minúscula:

| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Igreja proprietária |
| `name` | `varchar(255)` | Nome de exibição (ex.: "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Índice único** — namespace global (abaixo) |

O escopo do site é então uma única coluna, sem nulos, adicionada às tabelas de conteúdo e de domínio:

| Tabela (módulo) | Coluna | O que `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | O domínio serve o site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal — e em **`blocks`**, `''` significa adicionalmente *compartilhado entre todos os sites* |

Duas migrações adicionam tudo isso (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como a coluna assume `''` por padrão, toda linha existente mantém o comportamento de hoje sem qualquer preenchimento retroativo.

**Namespace global de subdomínio.** `sites.subDomain` compartilha *um único* namespace com `churches.subDomain` — um subdomínio de site nunca pode colidir com um subdomínio de igreja ou com o de outro site. Isso é aplicado em **ambos** os caminhos de gravação: `SiteController.save` rejeita um slug que colida com `churches` ou com `sites`, e `ChurchController.validateSave` faz o mesmo na direção inversa. Um índice único em `sites.subDomain` reforça isso no nível do banco de dados.

**A unicidade de Pages** foi ampliada de `(churchId, url)` para `(churchId, siteId, url)`, então dois sites de uma mesma igreja podem, cada um, ter seu próprio `/about`.

### Conteúdo por site, com reservas

Todo ponto de extremidade de **lista/árvore** de conteúdo com escopo de site aceita um `?siteId=` opcional (ausente ⇒ `''` = principal): árvore/lista/público de páginas, lista de blocos / por tipo / rodapé, links (anônimo / filtrado / todos), e estilos globais. Seções e elementos *não* têm escopo direto — eles herdam através de sua página ou bloco pai.

Duas cadeias de resolução fazem o trabalho interessante:

- **Estilos globais — `site → primário → padrão`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retorna a própria linha do site; se um site secundário não tiver nenhuma, ele retorna a **linha principal (`''`) como está** (mantendo o `id`/`siteId` do principal, que o cliente usa para copiar-ao-escrever); se não houver nem uma principal, `GlobalStyleController` retorna uma paleta/fontes padrão fixas no código.
- **Bloco de rodapé — o específico do site vence, o compartilhado serve de reserva.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retorna as linhas compartilhadas (`''`) *e* as específicas do site; o resolvedor escolhe o rodapé do próprio site se presente, senão o compartilhado. A mesma lógica roda tanto em `TreeHelper.insertBlocks` (árvore de página) quanto no ponto de extremidade independente `/content/blocks/public/footer/:churchId`.

### Cascata de exclusão de site

`SiteController.delete` (controlado pela permissão de Configurações→Editar da associação) desmonta um site secundário em três etapas:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` faz cascata de todo o conteúdo que o site possui: suas **páginas** → suas seções, elementos, `pageHistory` e `posts`; seus próprios **blocos** → suas seções, elementos e `pageHistory`; seus **links** e **globalStyles**. Uma proteção recusa executar para `''` — o sentinela principal/compartilhado nunca sofre cascata.
2. `DomainRepo.clearSiteId` **reatribui** os domínios do site de volta para o principal (`siteId → ''`) em vez de excluí-los, então um domínio personalizado sobrevive à exclusão de um site.
3. A linha de `sites` é excluída e as rotas do Caddy são ressincronizadas (melhor esforço).

### Superfície do B1Admin

| Capacidade | Onde | Mecanismo |
|-----------|-------|-----------|
| Alternador de site | `useSiteSelection` + `SiteSwitcher` (vazio = "Main Website") | Lê um parâmetro de URL `?site=` e o encadeia como `?siteId=` nas chamadas da ContentApi. Presente nas três áreas de **lista** do Site — **Páginas**, **Blocos**, **Aparência** — mas *não* nos editores de página/bloco, que carregam `siteId` no próprio registro |
| Criar/excluir sites | `SitesDialog`, aberto a partir da entrada "Manage websites…" do alternador | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Controlado pela permissão de Configurações→Editar da associação (`Permissions.settings.edit` no servidor; `Permissions.membershipApi.settings.edit` no B1Admin). **Apenas criar/excluir — não há interface de renomear na v1** |
| Atribuição de site por domínio | `DomainSettingsEdit` sob Configurações→Domínios | Uma lista suspensa de site por linha publica `siteId` por domínio para `/membership/domains`. A coluna se oculta se a API não retornar sites (backend mais antigo) |
| Estilos de copiar-ao-escrever | `StylesManager.prepareForSave` | Quando o `siteId` da linha de estilo global carregada não corresponde ao site selecionado (ou seja, a API retornou o principal herdado como reserva), ele descarta o `id` do principal e carimba o `siteId` atual, forçando uma **inserção** de uma nova linha específica do site em vez de sobrescrever a principal. A mesma bifurcação em caso de divergência se aplica ao bloco de rodapé do site |

:::info
**O que permanece em toda a igreja na v1 (uma escolha deliberada de escopo, não uma limitação do modelo de dados):** o **blog** (`BlogPage` não tem alternador e carrega `/posts` sem `siteId`), os **widgets do site** (banner de anúncio + launcher), **redirecionamentos**, o **logo / GA4 / configurações da igreja**, e o **portal de membros** (B1App mobile). Note que isso *não* é "toda a Aparência" — os estilos globais de um site secundário (paleta, fontes, tipografia, espaçamento, navegação, CSS personalizado) **são** por site através do caminho de copiar-ao-escrever acima; apenas os subpainéis de banner/launcher/redirecionamentos/logo da página de Aparência permanecem em toda a igreja.
:::

## Domínios personalizados: borda do Caddy (plano de configuração estática)

:::info
**Direção revisada em 2026-07-02.** Um plano anterior de mover a hospedagem de domínio personalizado para domínios gerenciados pela Vercel foi **cancelado**, e todo o código de registro de domínio da Vercel (`VercelHelper`, suas variáveis de ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, parâmetros SSM, e entradas de saúde) foi removido da Api. O **proxy Caddy autogerenciado em EC2 permanece** como a borda permanente de domínio personalizado. O único trabalho que resta é interno: trocar a configuração *em tempo de execução* via admin-API do Caddy por uma configuração *estática* que sobreviva a reinicializações.
:::

### A borda

Todo domínio personalizado de igreja aponta o DNS para uma única caixa EC2 — `3.23.251.61`, também acessível como `proxy.b1.church`. A tela de Configurações→Domínios do B1Admin instrui as igrejas a adicionar um ápice `A → 3.23.251.61` ou um `CNAME → proxy.b1.church`. O Caddy termina o TLS com um certificado Let's Encrypt por domínio, reescreve o cabeçalho `Host` para o upstream `{sub}.b1.church` do domínio, e faz proxy reverso para o B1App — que então o roteia pelo rótulo de host como qualquer subdomínio nativo (veja [Domínios personalizados](#domínios-personalizados) acima).

O mapeamento de upstream vem de `DomainRepo.loadPairs`, cuja discagem faz **COALESCE do subdomínio atribuído do site** para que um domínio faça proxy para o site *secundário* correto, recorrendo ao principal da igreja:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Linhas `www.*` são excluídas do mapa; o Caddy serve `www.{host}` via um redirecionamento `302` para o ápice em vez disso.

### Dois pontos de extremidade anônimos alimentam a borda

`DomainController` expõe dois pontos de extremidade não autenticados, somente leitura, que a caixa consome diretamente — anônimos por necessidade, já que a borda os consulta antes que qualquer contexto de igreja exista:

| Ponto de Extremidade | Retorna | Papel |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` se o domínio — ou, no caso de uma falha em `www.`, seu ápice puro — existir em `domains`; `404` caso contrário (inclusive um `domain` vazio) | O **`ask` de TLS sob demanda** do Caddy: o controle de abuso decidindo se emite um certificado para um SNI recebido |
| `GET /membership/domains/hostmap` | `text/plain`, uma linha ordenada `{domain} {sub}.b1.church` por domínio roteável | O arquivo de mapa host→upstream que a caixa atualiza em um temporizador |

`authorize` reutiliza `DomainRepo.loadByName` (host exato, depois uma única tentativa `www.`→ápice); `hostmap` reutiliza `loadPairs` — então é ciente de site e exclui `www.*`, idêntico às rotas de proxy — e apenas remove o sufixo `:443`.

### Salvar/excluir domínio — um único envio de melhor esforço

`DomainController.save` grava as linhas de `domains` e depois faz uma única chamada de **melhor esforço** `CaddyHelper.updateCaddy()`, envolvida em um `try/catch` que registra (`console.error`) e engole o erro; `delete` faz o mesmo (o que também corrigiu um bug anterior de rota obsoleta na exclusão), assim como a exclusão de site secundário (`SiteController.delete`). O próprio `updateCaddy` é limitado por um tempo limite de **10s** do Axios, então um Caddy inacessível ou parado nunca pode fazer um `500` em uma gravação de domínio — a tabela `domains` é a fonte de verdade.

### Estado atual — configuração estática, sem estado em tempo de execução

A caixa (Windows EC2 atrás do Elastic IP permanente) roda o Caddy a partir de um **Caddyfile estático**: TLS sob demanda cujo `ask` aponta para `/membership/domains/authorize`, mais um arquivo de mapa host→upstream atualizado a cada 5 minutos a partir de `/membership/domains/hostmap` por uma tarefa agendada que termina em um `caddy reload` gracioso. A configuração sobrevive a reinicializações com estado zero em tempo de execução — sem dança de repriorização — e um SNI desconhecido é **recusado no nível TLS** (nenhum certificado é emitido para um host que `authorize` rejeita), enquanto um host autorizado mas ainda não mapeado (um domínio recém-criado dentro da janela de sincronização) recebe um 404 limpo. Novos domínios se tornam roteáveis dentro de ~5 minutos após uma gravação; seus certificados são emitidos no primeiro acesso. Construção/configuração, operações, e armadilhas testadas em campo: [Proxy de Domínio Personalizado Caddy](../deployment/caddy-proxy).

### Envio legado em tempo de execução — caminho de rollback, pendente de exclusão

`CaddyHelper` (módulo de associação) ainda pode controlar o Caddy através de sua **admin API** em `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; sem operação quando não definido; exibido no grupo Integrações do `ServerHealthController`): `updateCaddy()` faz PATCH de um array completo de rotas, e `initializeCaddy()` + os pontos de extremidade `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstroem do zero um servidor configurado em tempo de execução. A configuração desse modo vivia apenas na memória do Caddy — a amnésia de reinicialização que esta arquitetura substituiu. A maquinaria permanece apenas como o caminho de rollback e está programada para exclusão assim que a caixa estática tiver se mostrado estável; o envio de melhor esforço `updateCaddy()` ao salvar/excluir um domínio é uma operação nula e inofensiva contra a caixa estática (sua admin API é apenas local).

## Páginas Relacionadas

- [Proxy de Domínio Personalizado Caddy](../deployment/caddy-proxy) — a própria caixa de borda: configuração de uma caixa nova, serviço WinSW, tarefa de sincronização de mapa, e armadilhas operacionais
- [Website Builder](./website-builder) — a árvore de página/seção/elemento, renderizadores, blog, SEO, e geração por IA (o que é renderizado depois que uma solicitação é resolvida para uma igreja/site)
- [Pontos de Extremidade de Conteúdo](../api/endpoints/content) — a superfície REST para páginas, blocos, links, e estilos globais, todos agora cientes de `?siteId=`
- [B1App](../web-apps/b1-app) — o aplicativo Next.js que hospeda o middleware e o roteamento `[sdSlug]`
- [Implantação de Aplicativos Web](../deployment/web-apps) — como o B1App é implantado na Vercel
