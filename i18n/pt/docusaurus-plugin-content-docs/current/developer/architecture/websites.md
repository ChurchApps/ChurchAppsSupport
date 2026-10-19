---
title: "Roteamento de Sites e Multi-Site"
---

# Roteamento de Sites e Multi-Site

<div class="article-intro">

Uma única igreja agora pode manter mais de um site distinto, e cada um pode estar em um subdomínio `*.b1.church` ou em um domínio personalizado, de propriedade da própria igreja. Esta página descreve a camada de roteamento que fica *por baixo* do construtor: como uma requisição de entrada é resolvida para uma igreja **e** para um site específico, o modelo de dados multi-site (o valor sentinela `siteId` que mantém todos os sites já existentes renderizando da mesma forma) e a borda de domínios personalizados — um proxy Caddy autogerenciado em EC2 que encerra o TLS e reescreve cada domínio da igreja para o seu upstream `*.b1.church`. Para o que de fato é renderizado depois que a requisição foi resolvida — a árvore de páginas/seções/elementos — veja [Construtor de Sites](./website-builder).

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

Três regras valem para toda esta camada:

1. **Um sentinela mantém tudo compatível com versões anteriores.** `siteId = ''` é o site principal. Toda página, bloco, link, estilo global e linha de domínio que existia antes deste recurso carrega `''` e é renderizada exatamente como antes. Um *segundo* site é simplesmente um conjunto de linhas com um `siteId` não vazio, e qualquer endpoint de conteúdo chamado sem `?siteId=` retorna o site principal — exatamente a mesma requisição de antes.
2. **A resolução é baseada no rótulo do host e converge.** Um subdomínio `*.b1.church` é roteado diretamente pelo seu rótulo de host; um domínio personalizado é reescrito para o seu rótulo `{sub}.b1.church` na borda Caddy, antes de o B1App vê-lo (com uma consulta de middleware ao banco que define um cabeçalho `x-site` como alternativa para qualquer `Host` personalizado que chegue diretamente). Os dois caminhos chegam à mesma rota `[sdSlug]` e à mesma chamada `churches/lookup`, então a renderização a jusante é idêntica.
3. **A borda Caddy não guarda estado, sobre uma única fonte de verdade.** Os domínios personalizados terminam em um proxy Caddy autogerenciado em EC2, que reescreve cada domínio para o seu upstream `{sub}.b1.church`. Ao salvar um domínio, dispara-se uma única chamada `CaddyHelper.updateCaddy()` em modo de melhor esforço, e o Caddy também lê a tabela `domains` diretamente (os endpoints `authorize` e `hostmap` abaixo). A tabela é a fonte autoritativa — um Caddy inacessível nunca pode fazer um salvamento falhar.

## Resolução de sites

### Subdomínios `*.b1.church`

`B1App/next.config.mjs` reescreve as requisições de entrada pelo host. Uma regra de host com o padrão `(?<subdomain>.*?)\..*` captura o **primeiro rótulo** do host e reescreve `/` e `/:path*` para `/{subdomain}` — o segmento de App Router `[sdSlug]`. Assim, `grace.b1.church/about` se torna `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chama `GET /membership/churches/lookup/?subDomain={sdSlug}`. A resposta de `ChurchController.getBySubDomain` agora tem dois ramos:

| Slug encontrado em | Resposta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal dessa igreja |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Um **site secundário** — o controlador recorre a `sites`, resolve a igreja proprietária e devolve o slug consultado mais o `siteId` extra |

Esse `siteId` extra é a única coisa que diferencia uma requisição de site secundário de uma de site principal; todo o restante do pipeline é compartilhado.

Um slug que não está em nenhuma das duas tabelas retorna `{}` com `200`. `ConfigHelper.load` trata uma resposta sem `id` como um site desconhecido e chama `notFound()` do Next, de modo que um subdomínio desconhecido recebe um 404 real, em vez de cada chamada seguinte pedir `/…/undefined`. A rota de página do construtor também monta o caminho da árvore com `pageTreePath()` (`src/helpers/pageTreePath.ts`), que codifica o slug em URL; assim, um slug malformado (barras invertidas, espaços) resulta em 404 em vez de propagar o `400` da API como um 500.

### Domínios personalizados {#custom-domains}

Um domínio pertencente à igreja termina na **borda Caddy** (detalhada abaixo), que reescreve o cabeçalho `Host` para o `{sub}.b1.church` do site antes de encaminhar para o B1App. Assim, no caminho normal, o B1App recebe um host *interno* `*.b1.church` e o resolve pelo rótulo do host exatamente como um subdomínio nativo — a consulta ao banco do middleware nunca é disparada. `src/middleware.ts` ainda roda em todas as requisições, mas com uma tarefa sempre ativa e um fallback:

1. **Sempre** — ele **apaga qualquer cabeçalho `x-site` enviado pelo cliente**. Esse cabeçalho é uma entrada de reescrita falsificável e só é considerado quando o próprio middleware o define; removê-lo é a verdadeira função do middleware atrás do Caddy.
2. **Fallback, apenas para `Host` não interno** — para um `Host` de domínio personalizado que chega ao B1App *sem* a reescrita do Caddy, ele chama `GET /membership/domains/public/lookup/{host}` e, se isso retornar um `subDomain`, define `x-site: {subDomain}.b1.church`. Atrás do Caddy, este ramo fica inativo porque o `Host` já é `*.b1.church`.

Hosts internos — `localhost`, `b1.church` e os sufixos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — ignoram a consulta completamente (já são resolvidos pela reescrita do rótulo do host ou são hosts de pré-visualização/deploy).

A consulta em si (`DomainRepo.loadByName`) faz `left join` de `domains → churches` e `domains → sites` e retorna `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — o subdomínio do site secundário atribuído, se o domínio apontar para um, ou o da igreja, caso contrário. Ela procura primeiro o host exato; se esse host começava com `www.` e não encontrou nada, tenta **uma única vez** o domínio raiz sem `www.`.

De volta ao `next.config.mjs`, as regras de reescrita de `x-site` são colocadas **antes** das regras genéricas de host, para que tenham precedência. `x-site: grace.b1.church` → primeiro rótulo `grace` → `[sdSlug] = grace`, e a partir daí a resolução é idêntica ao caminho do subdomínio (mesma `churches/lookup`, mesmo `siteId`).

:::info
O cabeçalho `x-site` não é confiável vindo de fora. O middleware remove incondicionalmente qualquer `x-site` recebido antes de, opcionalmente, definir o seu próprio, e as regras de reescrita só veem o valor definido pelo middleware — um cliente não consegue se colocar no conteúdo de outra igreja enviando um cabeçalho.
:::

Dois detalhes operacionais do middleware:

- **Cache.** O resultado de cada host (um acerto *ou* uma ausência confirmada — nunca um erro de rede) fica em cache por **10 minutos** em um `Map` na memória, por isolate serverless.
- **Matcher.** O matcher reinclui de propósito `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Seu primeiro padrão exclui caminhos com ponto, o que de outro modo descartaria esses arquivos; eles são incluídos de volta para que os arquivos de SEO/PWA por igreja de um domínio personalizado também recebam o cabeçalho `x-site`.
- **Cabeçalho canônico.** Nas páginas da igreja, o middleware acrescenta um cabeçalho de resposta `Link: <{proto}://{host}{path}>; rel="canonical"` que nomeia o host de onde a página foi realmente servida — subdomínio ou domínio personalizado (`helpers/canonicalLink.ts`). Ele é ignorado em hosts que não são de igreja (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e em `/mobile`, `/login`, `/logout` e nos arquivos gerados de robots/sitemap/manifest.

### Site público desativado

Uma igreja pode ativar **Desativar Site Público** no B1Admin (configuração de conteúdo em nível de igreja `hidePublicSite = "true"`). O site então serve apenas as rotas voltadas aos membros:

- **O middleware do B1App** consulta o subdomínio (`/membership/churches/lookup` e depois `/content/settings/public/:churchId`) e redireciona requisições anônimas para qualquer caminho fora da lista de permissões para `/login?returnUrl={path}{query}`. A lista de permissões (`helpers/publicSite.ts`) é `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e os arquivos manifest/robots/sitemap. Somente respostas confirmadas são armazenadas em cache (60 segundos em produção, pois a chamada de revalidação do administrador não consegue limpar esse mapa por instância; sem cache em dev/test). Um erro da API serve o site em vez de trancar todo mundo para fora.
- **Membros conectados veem o site completo.** Uma requisição que carrega um cookie `jwt` não expirado (o `hasSession()` do middleware decodifica o `exp` do payload sem verificar a assinatura — é um controle leve, não um controle de acesso) ignora o redirecionamento; assim, depois de fazer login, o membro volta à página que pediu e vê as páginas normais, as páginas integradas (Grupos, Sermões etc.) e a navegação do cabeçalho. Os componentes de página e o `Header` não verificam mais `hidePublicSite` por conta própria.
- **`robots.txt`** bloqueia tudo, como nos hosts com noindex.
- **API.** `GET /content/pages/public/:churchId` (a lista de páginas do sitemap) retorna `[]`, para que chamadores anônimos não consigam listar as páginas.

### Propagação do `siteId`

`ConfigHelper` armazena o `siteId` resolvido no seu `ConfigurationInterface` por requisição (memorizado com `cache()` do React) e acrescenta `?siteId=` às chamadas de conteúdo que ele e os componentes de página fazem — **condicionalmente**: um `siteId` vazio (um subdomínio de igreja principal) omite o parâmetro por completo. Os endpoints que recebem o parâmetro são a árvore de páginas (`/content/pages/:id/tree`), a lista pública de páginas usada pelo sitemap (`/content/pages/public/:id`), os estilos globais (`/content/globalStyles/church/:id`), os links de navegação (`/content/links/church/:id`) e o bloco de rodapé independente (`/content/blocks/public/footer/:id`). No caminho normal de renderização, o rodapé vem dentro da árvore de páginas (seções marcadas com `zone: "siteFooter"`), já buscada com `siteId`, então não há lacuna de rodapé sem escopo.

O portal de membros (`mobile` do B1App) fica intencionalmente fora disso: `loadChurchAppearance.ts` resolve a igreja via `churches/lookup`, mas lê as configurações públicas em nível de igreja `/settings/public/{id}` e nunca propaga o `siteId` — o portal é para a igreja inteira na v1 (veja abaixo).

## Vários sites por igreja

### Modelo de dados

A nova tabela `membership.sites` é deliberadamente simples:

| Coluna | Tipo | Observações |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Igreja proprietária |
| `name` | `varchar(255)` | Nome de exibição (ex.: "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Índice único** — namespace global (abaixo) |

O escopo por site é então uma única coluna, sem nulos, adicionada às tabelas de conteúdo e de domínios:

| Tabela (módulo) | Coluna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | O domínio serve o site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal — e, em **`blocks`**, `''` significa adicionalmente *compartilhado entre todos os sites* |

Duas migrações adicionam tudo isso (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como a coluna tem `''` como padrão, toda linha existente mantém o comportamento atual sem necessidade de preenchimento retroativo.

**Namespace global de subdomínios.** `sites.subDomain` compartilha *um único* namespace com `churches.subDomain` — um subdomínio de site nunca pode colidir com o de uma igreja ou com o de outro site. Isso é aplicado nos **dois** caminhos de salvamento: `SiteController.save` rejeita um slug que existe em `churches` ou em `sites`, e `ChurchController.validateSave` faz o mesmo no sentido inverso. Um índice único em `sites.subDomain` garante isso no nível do banco de dados.

**Unicidade de páginas** foi ampliada de `(churchId, url)` para `(churchId, siteId, url)`, para que dois sites de uma mesma igreja possam ter cada um o seu próprio `/about`.

### Conteúdo por site, com fallbacks

Todo endpoint de **lista/árvore** com escopo de site aceita um `?siteId=` opcional (ausente ⇒ `''` = principal): árvore / lista / pública de páginas, lista / por tipo / rodapé de blocos, links (anônimos / filtrados / todos) e estilos globais. Seções e elementos *não* têm escopo direto — eles herdam pela página ou bloco pai.

Duas cadeias de resolução fazem o trabalho mais interessante:

- **Estilos globais — `site → principal → padrão`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retorna a linha própria do site; se um site secundário não tiver nenhuma, retorna a **linha principal (`''`) tal como está** (mantendo o `id`/`siteId` da principal, que o cliente usa para copiar ao escrever), e se também não houver principal, `GlobalStyleController` retorna uma paleta/fontes padrão fixas no código. 
- **Bloco de rodapé — o do site específico tem prioridade, o compartilhado serve de fallback.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retorna as linhas compartilhadas (`''`) *e* as específicas do site; o resolvedor escolhe o rodapé próprio do site, se existir, senão o compartilhado. A mesma lógica roda tanto em `TreeHelper.insertBlocks` (árvore de páginas) quanto no endpoint independente `/content/blocks/public/footer/:churchId`.

### Exclusão de site em cascata

`SiteController.delete` (protegido pela permissão Configurações→Editar de Membership) remove um site secundário em três etapas:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` apaga em cascata todo o conteúdo que o site possui: suas **páginas** → suas seções, elementos, `pageHistory` e `posts`; seus próprios **blocos** → suas seções, elementos e `pageHistory`; seus **links** e **globalStyles**. Uma proteção impede a execução para `''` — o sentinela principal/compartilhado nunca entra na cascata.
2. `DomainRepo.clearSiteId` **reatribui** os domínios do site de volta ao principal (`siteId → ''`) em vez de apagá-los, de modo que um domínio personalizado sobrevive à exclusão do site.
3. A linha de `sites` é apagada e as rotas do Caddy são sincronizadas novamente (em modo de melhor esforço).

### Superfície do B1Admin

| Recurso | Onde | Mecanismo |
|-----------|-------|-----------|
| Seletor de site | `useSiteSelection` + `SiteSwitcher` (vazio = "Site Principal") | Lê um parâmetro de URL `?site=` e o propaga como `?siteId=` nas chamadas à ContentApi. Presente nas três áreas de **lista** de Sites — **Páginas**, **Blocos** e **Aparência** — mas *não* nos editores de página/bloco, que carregam o `siteId` no próprio registro |
| Criar/excluir sites | `SitesDialog`, aberto pela entrada "Gerenciar sites…" do seletor | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Protegido pela permissão Configurações→Editar de Membership (`Permissions.settings.edit` no servidor; `Permissions.membershipApi.settings.edit` no B1Admin). **Somente criar/excluir — não há interface de renomear na v1** |
| Atribuição de site por domínio | `DomainSettingsEdit` em Configurações→Domínios | Um seletor de site por linha envia o `siteId` de cada domínio para `/membership/domains`. A coluna fica oculta se a API não retornar sites (backend antigo) |
| Estilos com copiar ao escrever | `StylesManager.prepareForSave` | Quando a linha de estilo global carregada tem um `siteId` diferente do site selecionado (ou seja, a API devolveu a principal como fallback herdado), ele descarta o `id` da principal e grava o `siteId` atual, forçando uma **inserção** de uma nova linha específica do site em vez de sobrescrever a principal. A mesma bifurcação por divergência se aplica ao bloco de rodapé do site |

:::info
**O que continua em toda a igreja na v1 (uma escolha de escopo deliberada, não um limite do modelo de dados):** o **blog** (`BlogPage` não tem seletor e carrega `/posts` sem `siteId`), os **widgets do site** (faixa de anúncios + lançador), os **redirecionamentos**, o **logotipo / GA4 / configurações da igreja** e o **portal de membros** (mobile do B1App). Observe que isso *não* significa "toda a Aparência" — os estilos globais de um site secundário (paleta, fontes, tipografia, espaçamento, navegação, CSS personalizado) **são** específicos por site pelo caminho de copiar ao escrever descrito acima; apenas os subpainéis de faixa/lançador/redirecionamentos/logotipo da página Aparência permanecem em toda a igreja.
:::

## Domínios personalizados: borda Caddy (plano de configuração estática)

:::info
**Direção revisada em 2026-07-02.** Um plano anterior de mover a hospedagem de domínios personalizados para domínios gerenciados pela Vercel foi **cancelado**, e todo o código de registro de domínios da Vercel (`VercelHelper`, suas variáveis de ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, parâmetros do SSM e verificações de saúde) foi removido da Api. O proxy Caddy autogerenciado em EC2 **permanece** como a borda permanente de domínios personalizados. O único trabalho restante é interno: trocar a configuração *de execução* via API administrativa do Caddy por uma configuração *estática* que sobreviva a reinicializações.
:::

### A borda

Todo domínio personalizado de igreja aponta o DNS para uma única máquina EC2 — `3.23.251.61`, também acessível como `proxy.b1.church`. A tela Configurações→Domínios do B1Admin orienta as igrejas a adicionar um registro `A` apex → `3.23.251.61` ou um `CNAME` → `proxy.b1.church`. O Caddy encerra o TLS com um certificado Let's Encrypt por domínio, reescreve o cabeçalho `Host` para o upstream `{sub}.b1.church` do domínio e encaminha para o B1App — que então o roteia pelo rótulo do host como qualquer subdomínio nativo (veja [Domínios personalizados](#custom-domains) acima).

O mapeamento de upstream vem de `DomainRepo.loadPairs`, cujo destino usa `COALESCE` no subdomínio do site atribuído, de modo que um domínio é encaminhado para o site *secundário* correto, recorrendo ao principal da igreja como fallback:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

As linhas `www.*` são excluídas do mapa; o Caddy atende `www.{host}` por meio de um redirecionamento `302` para o domínio raiz.

### Dois endpoints anônimos alimentam a borda

`DomainController` expõe dois endpoints somente leitura e sem autenticação que a máquina consome diretamente — anônimos por necessidade, já que a borda faz as consultas antes de existir qualquer contexto de igreja:

| Endpoint | Retorna | Função |
|----------|---------|----------|
| `GET /membership/domains/authorize?domain=` | `200` se o domínio — ou, para uma ausência de `www.`, o seu domínio raiz — existir em `domains`; `404` caso contrário (incluindo um `domain` vazio) | O **`ask` de TLS sob demanda** do Caddy: o controle de abuso que decide se um certificado deve ser emitido para um SNI recebido |
| `GET /membership/domains/hostmap` | `text/plain`, uma linha `{domain} {sub}.b1.church` ordenada por domínio roteável | O arquivo de mapa host→upstream que a máquina atualiza periodicamente |

`authorize` reutiliza `DomainRepo.loadByName` (host exato, depois uma nova tentativa `www.`→raiz); `hostmap` reutiliza `loadPairs` — por isso é sensível ao site e exclui `www.*`, idêntico às rotas de proxy — e apenas remove o sufixo `:443`.

### Salvar/excluir domínio — um envio de melhor esforço

`DomainController.save` grava as linhas de `domains` e, em seguida, faz **uma única** chamada `CaddyHelper.updateCaddy()` em modo de melhor esforço, envolvida em um `try/catch` que registra (`console.error`) e engole o erro; `delete` faz o mesmo (o que também corrigiu um bug anterior de rota obsoleta após a exclusão), assim como a exclusão de site secundário (`SiteController.delete`). `updateCaddy` é limitado por um timeout de **10s** do Axios, de modo que um Caddy inacessível ou parado nunca pode gerar um `500` em um salvamento de domínio — a tabela `domains` é a fonte de verdade.

### Estado atual — configuração estática, sem estado de execução

A máquina (EC2 Windows atrás do Elastic IP permanente) executa o Caddy a partir de um **Caddyfile estático**: TLS sob demanda cujo `ask` aponta para `/membership/domains/authorize`, mais um arquivo de mapa host→upstream atualizado a cada 5 minutos a partir de `/membership/domains/hostmap` por uma tarefa agendada que termina com um `caddy reload` gracioso. A configuração sobrevive a reinicializações sem nenhum estado de execução — sem o processo de reconfiguração — e um SNI desconhecido é **recusado no TLS** (nenhum certificado é emitido para um host que o `authorize` rejeita), enquanto um host autorizado mas ainda não mapeado (um domínio novo dentro da janela de sincronização) recebe um 404 limpo. Novos domínios se tornam roteáveis em cerca de 5 minutos após um salvamento; seus certificados são emitidos no primeiro acesso. Montagem/configuração, operação e armadilhas comprovadas em campo: [Proxy de Domínio Personalizado Caddy](../deployment/caddy-proxy).

### Envio legado em tempo de execução — caminho de rollback, exclusão pendente

O `CaddyHelper` (módulo membership) ainda pode controlar o Caddy pela sua **API administrativa** em `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; sem efeito quando não definido; exibido no grupo Integrações do `ServerHealthController`): `updateCaddy()` faz PATCH de um array completo de rotas, e `initializeCaddy()` mais os endpoints `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstroem do zero um servidor configurado em tempo de execução. Nesse modo, a configuração existia apenas na memória do Caddy — a amnésia a cada reinício que esta arquitetura substituiu. O mecanismo permanece somente como caminho de rollback e está programado para exclusão assim que a máquina estática estiver estável; o envio `updateCaddy()` de melhor esforço ao salvar/excluir domínio é um no-op inofensivo contra a máquina estática (a API administrativa dela só aceita conexões locais).

## Páginas relacionadas

- [Proxy de Domínio Personalizado Caddy](../deployment/caddy-proxy) — a própria máquina de borda: instalação em uma máquina nova, serviço WinSW, tarefa de sincronização do mapa e armadilhas operacionais
- [Construtor de Sites](./website-builder) — a árvore de páginas/seções/elementos, renderizadores, blog, SEO e geração por IA (o que é renderizado depois que a requisição foi resolvida para uma igreja/site)
- [Endpoints de Conteúdo](../api/endpoints/content) — a superfície REST para páginas, blocos, links e estilos globais, todos agora sensíveis a `?siteId=`
- [B1App](../web-apps/b1-app) — o aplicativo Next.js que hospeda o middleware e o roteamento `[sdSlug]`
- [Implantação de Aplicativos Web](../deployment/web-apps) — como o B1App é implantado na Vercel
