---
title: "Roteamento de Sites e Multi-Site"
---

# Roteamento de Sites e Multi-Site

<div class="article-intro">

Uma única igreja agora pode atender mais de um site distinto, e cada um pode estar em um subdomínio `*.b1.church` ou em um domínio personalizado totalmente próprio da igreja. Esta página mapeia a camada de roteamento que fica *por baixo* do construtor: como uma requisição de entrada é resolvida para uma igreja **e** para um site específico, o modelo de dados multi-site (a sentinela `siteId` que mantém todos os sites pré-existentes renderizando igual) e a borda de domínios personalizados -- um proxy Caddy gerenciado pela própria equipe em uma EC2, que encerra o TLS e reescreve cada domínio da igreja para o seu upstream `*.b1.church`. Para o que é de fato renderizado depois que uma requisição foi resolvida -- a árvore de páginas, seções e elementos -- veja [Arquitetura do Construtor de Sites](./website-builder).

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

Três regras valem para essa camada:

1. **Uma sentinela mantém tudo compatível com versões anteriores.** `siteId = ''` é o site principal. Toda página, bloco, link, estilo global e linha de domínio que existia antes desta funcionalidade carrega `''` e renderiza exatamente como antes. Um *segundo* site é simplesmente um conjunto de linhas com um `siteId` não vazio, e qualquer endpoint de conteúdo chamado sem `?siteId=` retorna o site principal -- exatamente a mesma requisição antiga, byte a byte.
2. **A resolução é baseada no rótulo do host e converge.** Um subdomínio `*.b1.church` é roteado diretamente pelo seu rótulo de host; um domínio personalizado é reescrito para o rótulo `{sub}.b1.church` na borda do Caddy, antes de o B1App vê-lo (com uma consulta ao banco no middleware que carimba um cabeçalho `x-site` como alternativa para qualquer `Host` personalizado cru). As duas pernas chegam à mesma rota `[sdSlug]` e à mesma chamada `churches/lookup`, então a renderização a jusante é idêntica.
3. **A borda do Caddy não tem estado sobre uma única fonte da verdade.** Os domínios personalizados terminam em um proxy Caddy gerenciado pela própria equipe, numa EC2, que reescreve cada domínio para o seu upstream `{sub}.b1.church`. Ao salvar um domínio, dispara-se uma única chamada `CaddyHelper.updateCaddy()` de melhor esforço, e o Caddy também lê a tabela `domains` diretamente (os endpoints `authorize` e `hostmap` abaixo). A tabela é a autoridade -- um Caddy inacessível nunca faz um salvamento falhar.

## Resolução de sites

### Subdomínios `*.b1.church`

`B1App/next.config.mjs` reescreve as requisições de entrada pelo host. Uma regra de host com o padrão `(?<subdomain>.*?)\..*` captura o **primeiro rótulo** do host e reescreve `/` e `/:path*` para `/{subdomain}` -- o segmento de App Router `[sdSlug]`. Assim, `grace.b1.church/about` vira `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chama `GET /membership/churches/lookup/?subDomain={sdSlug}`. A resposta de `ChurchController.getBySubDomain` agora tem duas ramificações:

| O slug corresponde a | Resposta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal dessa igreja |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Um **site secundário** -- o controlador recorre a `sites`, resolve a igreja proprietária e devolve o slug consultado mais o `siteId` extra |

Esse `siteId` extra é a única coisa que distingue uma requisição de site secundário de uma de site principal; todo o restante do pipeline é compartilhado.

Um slug que não corresponde a nenhuma das duas tabelas volta como `{}` com `200`. `ConfigHelper.load` trata uma resposta sem `id` como um site desconhecido e chama o `notFound()` do Next, então um subdomínio desconhecido recebe um 404 de verdade, em vez de todas as chamadas seguintes pedirem `/…/undefined`. A rota de página do construtor também monta o caminho da árvore com `pageTreePath()` (`src/helpers/pageTreePath.ts`), que codifica o slug em URL, de modo que um slug malformado (barras invertidas, espaços) recebe 404 em vez de propagar o `400` da API como um 500.

### Domínios personalizados {#custom-domains}

Um domínio pertencente à igreja termina na **borda do Caddy** (detalhada abaixo), que reescreve o cabeçalho `Host` para o `{sub}.b1.church` do site antes de encaminhar ao B1App. Assim, no caminho normal o B1App recebe um host *interno* `*.b1.church` e o resolve pelo rótulo do host exatamente como um subdomínio nativo -- a consulta ao banco do middleware nunca dispara. O `src/middleware.ts` ainda roda em toda requisição, mas com um trabalho sempre ativo e uma alternativa:

1. **Sempre** -- ele **exclui qualquer cabeçalho `x-site` enviado pelo cliente**. Esse cabeçalho é uma entrada de reescrita falsificável e só é confiável quando o próprio middleware o define; removê-lo é o trabalho real do middleware atrás do Caddy.
2. **Alternativa, somente para `Host` não interno** -- para um `Host` de domínio personalizado cru que chega ao B1App *sem* a reescrita do Caddy, ele chama `GET /membership/domains/public/lookup/{host}` e, se isso retornar um `subDomain`, define `x-site: {subDomain}.b1.church`. Atrás do Caddy esse ramo fica inerte, porque o `Host` já é `*.b1.church`.

Hosts internos -- `localhost`, `b1.church` e os sufixos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` -- ignoram a consulta por completo (já são resolvidos pela reescrita do rótulo do host, ou são hosts de pré-visualização/implantação).

A consulta em si (`DomainRepo.loadByName`) faz um left join de `domains → churches` e `domains → sites` e retorna `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` -- o subdomínio do site secundário atribuído, se o domínio aponta para um, ou o da igreja, caso contrário. Ela corresponde primeiro ao host exato; se esse host começava com `www.` e não encontrou nada, tenta **uma vez** novamente com o apex sem `www`.

De volta ao `next.config.mjs`, as regras de reescrita de `x-site` ficam **antes** das regras genéricas de host, então vencem. `x-site: grace.b1.church` → primeiro rótulo `grace` → `[sdSlug] = grace`, e a partir daí a resolução é idêntica à do caminho de subdomínio (mesmo `churches/lookup`, mesmo `siteId`).

:::info
O cabeçalho `x-site` não é confiável vindo de fora. O middleware remove incondicionalmente qualquer `x-site` recebido antes de, opcionalmente, definir o seu próprio, e as regras de reescrita só veem o valor definido pelo middleware -- um cliente não consegue se forçar sobre o conteúdo de outra igreja enviando um cabeçalho.
:::

Dois detalhes operacionais do middleware:

- **Cache.** O resultado de cada host (um acerto *ou* uma falha confirmada -- nunca um erro de rede) fica em cache por **10 minutos** em um `Map` em memória, por isolado serverless.
- **Matcher.** O matcher reinclui deliberadamente `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. O primeiro padrão exclui caminhos com ponto, que de outra forma descartaria esses arquivos; eles são adicionados de volta para que os arquivos de SEO/PWA por igreja de um domínio personalizado também recebam o cabeçalho `x-site`.
- **Cabeçalho canônico.** Para as páginas da igreja, o middleware acrescenta à resposta um cabeçalho `Link: <{proto}://{host}{path}>; rel="canonical"`, que nomeia o host a partir do qual a página foi de fato servida -- subdomínio ou domínio personalizado (`helpers/canonicalLink.ts`). Ele é ignorado em hosts que não são da igreja (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e em `/mobile`, `/login`, `/logout` e nos arquivos gerados de robots/sitemap/manifest.

### Site público desativado

Uma igreja pode ativar **Desativar site público** no B1Admin (configuração de conteúdo no nível da igreja, `hidePublicSite = "true"`). O site passa então a servir somente as rotas voltadas aos membros:

- **O middleware do B1App** consulta o subdomínio (`/membership/churches/lookup` e depois `/content/settings/public/:churchId`) e redireciona requisições anônimas para qualquer caminho fora da lista de permitidos para `/login?returnUrl={path}{query}`. A lista de permitidos (`helpers/publicSite.ts`) é `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e os arquivos manifest/robots/sitemap. Somente respostas confirmadas são armazenadas em cache (60 segundos em produção, já que a chamada de revalidação do administrador não consegue limpar esse mapa por instância; sem cache em desenvolvimento/testes). Um erro da API serve o site em vez de trancar todo mundo para fora.
- **Membros logados veem o site completo.** Uma requisição com um cookie `jwt` não expirado (o `hasSession()` do middleware decodifica o `exp` do payload sem verificar a assinatura -- é um controle leve, não controle de acesso) pula o redirecionamento, então depois do login um membro volta à página que pediu e vê as páginas normais, as páginas embutidas (Grupos, Sermões etc.) e a navegação do cabeçalho. Os componentes de página e o `Header` não verificam mais `hidePublicSite` por conta própria.
- **`robots.txt`** bloqueia tudo, como nos hosts com noindex.
- **API.** `GET /content/pages/public/:churchId` (a lista de páginas do sitemap) retorna `[]`, então quem não está logado não consegue listar as páginas.

### Propagação do `siteId`

`ConfigHelper` guarda o `siteId` resolvido na sua `ConfigurationInterface` por requisição (memorizada com o `cache()` do React) e acrescenta `?siteId=` às chamadas de conteúdo que ele faz e às que os componentes de página fazem -- **condicionalmente**: um `siteId` vazio (um subdomínio de igreja principal) omite o parâmetro por completo. Os endpoints propagados são a árvore de páginas (`/content/pages/:id/tree`), a lista pública de páginas usada pelo sitemap (`/content/pages/public/:id`), os estilos globais (`/content/globalStyles/church/:id`), os links de navegação (`/content/links/church/:id`) e o bloco de rodapé avulso (`/content/blocks/public/footer/:id`). No caminho normal de renderização, o rodapé chega dentro da árvore de páginas (seções marcadas com `zone: "siteFooter"`), já buscado com `siteId`, então não há lacuna de rodapé sem escopo.

O portal de membros (B1App `mobile`) fica intencionalmente fora disso: `loadChurchAppearance.ts` resolve a igreja via `churches/lookup`, mas lê `/settings/public/{id}` no nível da igreja e nunca propaga `siteId` -- o portal é de toda a igreja na v1 (veja abaixo).

## Múltiplos sites por igreja

### Modelo de dados

A nova tabela `membership.sites` é deliberadamente pequena:

| Coluna | Tipo | Observações |
|--------|------|-------------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Igreja proprietária |
| `name` | `varchar(255)` | Nome de exibição (por exemplo, "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Índice único** -- namespace global (abaixo) |

O escopo por site é então uma única coluna não nula adicionada às tabelas de conteúdo e de domínios:

| Tabela (módulo) | Coluna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | O domínio serve o site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal -- e, em **`blocks`**, `''` significa adicionalmente *compartilhado entre todos os sites* |

Duas migrações adicionam tudo isso (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como a coluna tem padrão `''`, toda linha existente mantém o comportamento atual, sem preenchimento retroativo.

**Namespace global de subdomínios.** `sites.subDomain` compartilha *um* namespace com `churches.subDomain` -- um subdomínio de site nunca pode colidir com um subdomínio de igreja nem com o de outro site. Isso é imposto nos **dois** caminhos de salvamento: `SiteController.save` rejeita um slug que bata em `churches` ou em `sites`, e `ChurchController.validateSave` faz o mesmo ao contrário. Um índice único em `sites.subDomain` garante isso também no banco de dados.

**Unicidade de páginas** ampliada de `(churchId, url)` para `(churchId, siteId, url)`, para que dois sites de uma mesma igreja possam ter, cada um, o seu próprio `/about`.

### Conteúdo por site, com alternativas

Todo endpoint de **listagem/árvore** de conteúdo com escopo por site aceita um `?siteId=` opcional (ausente ⇒ `''` = principal): listagem/árvore/pública de páginas, listagem/por tipo/rodapé de blocos, links (anônimos / filtrados / todos) e estilos globais. Seções e elementos *não* têm escopo direto -- herdam pela página ou bloco pai.

Duas cadeias de resolução fazem o trabalho interessante:

- **Estilos globais -- `site → principal → padrão`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retorna a linha própria do site; se um site secundário não tiver nenhuma, retorna a **linha principal (`''`) como está** (mantendo o `id`/`siteId` do principal, que o cliente usa para a cópia na escrita), e se também não houver principal, o `GlobalStyleController` retorna uma paleta/fontes padrão fixas no código.
- **Bloco de rodapé -- o do site específico vence, o compartilhado serve de alternativa.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retorna as linhas compartilhadas (`''`) *e* as específicas do site; o resolvedor escolhe o rodapé próprio do site, se existir, senão o compartilhado. A mesma lógica roda tanto em `TreeHelper.insertBlocks` (árvore de página) quanto no endpoint avulso `/content/blocks/public/footer/:churchId`.

### Exclusão de site em cascata

`SiteController.delete` (protegido pela permissão Configurações→Editar do membership) remove um site secundário em três etapas:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` faz a cascata de todo o conteúdo que o site possui: suas **páginas** → suas seções, elementos, `pageHistory` e `posts`; seus próprios **blocos** → suas seções, elementos e `pageHistory`; seus **links** e **globalStyles**. Uma guarda se recusa a rodar para `''` -- a sentinela principal/compartilhada nunca entra em cascata.
2. `DomainRepo.clearSiteId` **reatribui** os domínios do site de volta ao principal (`siteId → ''`) em vez de excluí-los, para que um domínio personalizado sobreviva à exclusão do site.
3. A linha de `sites` é excluída e as rotas do Caddy são ressincronizadas (de melhor esforço).

### Superfície no B1Admin

| Recurso | Onde | Mecanismo |
|-----------|-------------|-----------|
| Seletor de site | `useSiteSelection` + `SiteSwitcher` (vazio = "Site Principal") | Lê um parâmetro de URL `?site=` e o repassa como `?siteId=` nas chamadas ao ContentApi. Presente nas três **listagens** do Site -- **Páginas**, **Blocos** e **Aparência** -- mas *não* nos editores de página/bloco, que carregam o `siteId` no próprio registro |
| Criar/excluir sites | `SitesDialog`, aberto pela entrada "Gerenciar sites…" do seletor | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Protegido pela permissão Configurações→Editar do membership (`Permissions.settings.edit` no servidor; `Permissions.membershipApi.settings.edit` no B1Admin). **Somente criar/excluir -- não há interface de renomear na v1** |
| Atribuição de site por domínio | `DomainSettingsEdit` em Configurações→Domínios | Uma lista suspensa de site em cada linha envia o `siteId` por domínio para `/membership/domains`. A coluna fica oculta se a API não retornar sites (backend antigo) |
| Estilos com cópia na escrita | `StylesManager.prepareForSave` | Quando a linha de estilo global carregada tem um `siteId` que não corresponde ao site selecionado (ou seja, a API devolveu o principal herdado como alternativa), ele descarta o `id` do principal e carimba o `siteId` atual, forçando uma **inserção** de uma nova linha específica do site, em vez de sobrescrever o principal. A mesma bifurcação em divergência se aplica ao bloco de rodapé do site |

:::info
**O que continua em toda a igreja na v1 (uma escolha deliberada de escopo, não um limite do modelo de dados):** o **blog** (`BlogPage` não tem seletor e carrega `/posts` sem `siteId`), os **widgets do site** (faixa de anúncios + launcher), os **redirecionamentos**, o **logotipo / GA4 / configurações da igreja** e o **portal de membros** (B1App mobile). Observe que isto *não* é "toda a Aparência" -- os estilos globais de um site secundário (paleta, fontes, tipografia, espaçamento, navegação, CSS personalizado) **são** por site, pelo caminho de cópia na escrita acima; apenas os subpainéis de faixa/launcher/redirecionamentos/logotipo da página Aparência continuam em toda a igreja.
:::

## Domínios personalizados: borda Caddy (plano de configuração estática)

:::info
**Direção revisada em 2026-07-02.** Um plano anterior, de mover a hospedagem de domínios personalizados para domínios gerenciados pela Vercel, foi **cancelado**, e todo o código de registro de domínios da Vercel (`VercelHelper`, suas variáveis de ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, os parâmetros do SSM e as verificações de integridade) foi removido da API. O **proxy Caddy gerenciado pela própria equipe, em uma EC2, continua** como a borda permanente para domínios personalizados. O único trabalho restante é interno: trocar a configuração *em tempo de execução* da API administrativa do Caddy por uma configuração *estática* que sobreviva a reinicializações.
:::

### A borda

Todo domínio personalizado de igreja aponta o DNS para uma única máquina EC2 -- `3.23.251.61`, também acessível como `proxy.b1.church`. A tela Configurações→Domínios do B1Admin orienta as igrejas a adicionar um `A` no apex para `3.23.251.61` ou um `CNAME` para `proxy.b1.church`. O Caddy encerra o TLS com um certificado Let's Encrypt por domínio, reescreve o cabeçalho `Host` para o upstream `{sub}.b1.church` do domínio e encaminha ao B1App -- que então o roteia pelo rótulo do host como qualquer subdomínio nativo (veja [Domínios personalizados](#custom-domains) acima).

O mapeamento do upstream vem de `DomainRepo.loadPairs`, cujo destino faz COALESCE no subdomínio do site atribuído, para que um domínio seja encaminhado ao site *secundário* correto, com a igreja principal como alternativa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

As linhas `www.*` ficam fora do mapa; o Caddy serve `www.{host}` com um redirecionamento `302` para o apex.

### Dois endpoints anônimos alimentam a borda

`DomainController` expõe dois endpoints somente leitura e sem autenticação que a máquina consome diretamente -- anônimos por necessidade, já que a borda consulta antes que exista qualquer contexto de igreja:

| Endpoint | Retorna | Função |
|----------|---------|--------|
| `GET /membership/domains/authorize?domain=` | `200` se o domínio -- ou, para um miss de `www.`, o seu apex -- existir em `domains`; `404` caso contrário (inclusive para um `domain` vazio) | O **`ask` de TLS sob demanda** do Caddy: o controle de abuso que decide se um certificado deve ser emitido para um SNI recebido |
| `GET /membership/domains/hostmap` | `text/plain`, uma linha `{domain} {sub}.b1.church` ordenada por roteável | O arquivo de mapa host→upstream que a máquina atualiza por temporizador |

`authorize` reaproveita `DomainRepo.loadByName` (host exato, depois uma nova tentativa `www.`→apex); `hostmap` reaproveita `loadPairs` -- portanto é consciente do site e exclui `www.*`, idêntico às rotas do proxy -- e só remove o sufixo `:443`.

### Salvar/excluir domínio -- um único envio de melhor esforço

`DomainController.save` grava as linhas de `domains` e depois faz uma **única chamada de melhor esforço** a `CaddyHelper.updateCaddy()`, envolvida em um `try/catch` que registra (`console.error`) e ignora o erro; `delete` faz o mesmo (o que também corrigiu um antigo bug de rota obsoleta após a exclusão), assim como a exclusão de site secundário (`SiteController.delete`). O próprio `updateCaddy` é limitado por um timeout de **10s** no Axios, então um Caddy inacessível ou parado nunca faz um salvamento de domínio retornar `500` -- a tabela `domains` é a fonte da verdade.

### Estado atual -- configuração estática, sem estado em tempo de execução

A máquina (EC2 Windows atrás do Elastic IP permanente) executa o Caddy a partir de um **Caddyfile estático**: TLS sob demanda cujo `ask` aponta para `/membership/domains/authorize`, mais um arquivo de mapa host→upstream atualizado a cada 5 minutos a partir de `/membership/domains/hostmap` por uma tarefa agendada que termina com um `caddy reload` gracioso. A configuração sobrevive a reinicializações sem nenhum estado em tempo de execução -- sem a dança de reconfiguração -- e um SNI desconhecido recebe **recusa de TLS** (nenhum certificado é emitido para um host que o `authorize` rejeita), enquanto um host autorizado mas ainda não mapeado (um domínio novo dentro da janela de sincronização) recebe um 404 limpo. Novos domínios ficam roteáveis em até ~5 minutos após um salvamento; seus certificados são emitidos no primeiro acesso. Montagem/configuração, operação e armadilhas testadas em campo: [Proxy Caddy para Domínios Personalizados](../deployment/caddy-proxy).

### Envio em tempo de execução legado -- caminho de reversão, exclusão pendente

O `CaddyHelper` (módulo de membership) ainda pode controlar o Caddy pela sua **API administrativa** em `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; sem efeito quando não definido; exibido no grupo Integrações do `ServerHealthController`): `updateCaddy()` faz PATCH em um array completo de rotas, e `initializeCaddy()` + os endpoints `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstroem do zero um servidor configurado em tempo de execução. Esse modo mantinha a configuração apenas na memória do Caddy -- a amnésia a cada reinício que esta arquitetura substituiu. A maquinaria permanece somente como caminho de reversão e está agendada para exclusão quando a máquina estática estiver estável; o envio `updateCaddy()` de melhor esforço no salvamento/exclusão de domínio é um no-op inofensivo contra a máquina estática (a API administrativa dela só aceita conexões locais).

## Páginas Relacionadas

- [Proxy Caddy para Domínios Personalizados](../deployment/caddy-proxy) — a própria máquina de borda: montagem do zero, serviço WinSW, tarefa de sincronização do mapa e armadilhas operacionais
- [Arquitetura do Construtor de Sites](./website-builder) — a árvore de páginas/seções/elementos, os renderizadores, o blog, o SEO e a geração por IA (o que é renderizado depois que uma requisição foi resolvida para uma igreja/site)
- [Endpoints de Content](../api/endpoints/content) — a API REST para páginas, blocos, links e estilos globais, todos com suporte a `?siteId=`
- [B1App](../web-apps/b1-app) — o aplicativo Next.js que hospeda o middleware e o roteamento `[sdSlug]`
- [Implantação de Aplicativos Web](../deployment/web-apps) — como o B1App é implantado na Vercel
