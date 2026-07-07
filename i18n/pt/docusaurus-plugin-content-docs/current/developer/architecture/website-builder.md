---
title: "Arquitetura do Website Builder"
---

# Arquitetura do Website Builder

<div class="article-intro">

Todo site de chiesa servido por B1App é renderizado de uma árvore de conteúdo — páginas, seções, elementos — armazenada no ContentApi e editada visualmente no B1Admin. Uma biblioteca de componentes compartilhada renderiza tanto a visualização do editor quanto o site ao vivo, um catálogo de tipo de elemento define o que pode aparecer em uma página e um serviço de IA separado pode gerar ou reescrever aquela árvore. Esta página mapeia toda a pilha: o contrato de elemento em `@churchapps/helpers`, o pipeline de renderização, elementos de dados de chiesa, widgets em todo o site, a camada de blog, páginas com acesso controlado, SEO, geração de IA e formulários conversacionais.

</div>

## Visão Geral

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Três regras mantêm em toda a pilha:

1. **Uma árvore, dois renderizadores.** Uma página é uma árvore `pages → sections → elements` onde cada nó carrega suas configurações como um blob JSON `answers`. Os mesmos componentes apphelper renderizam o editor de arrastar e soltar no B1Admin e o site público renderizado no servidor em B1App — não há um "formato de publicação" separado.
2. **O contrato vive em `@churchapps/helpers`.** `ElementTypes.ts` é o catálogo único de tipos de elemento; renderizadores se resolvem através de um registro em apphelper; formulários do editor vivem no B1Admin. Adicionar um tipo de elemento significa tocar todos os três, nessa ordem.
3. **O site público lê pontos de extremidade anônimos.** Tudo que B1App precisa — a árvore de página, configurações, postagens de blog, redirecionamentos e os pontos de extremidade de dados de chiesa em outros módulos — é público. Auth é opcional: um JWT no ponto de extremidade de árvore anônima desbloqueia páginas apenas para membros, nada mais muda.

## A árvore de conteúdo

O módulo de conteúdo (`Api/src/modules/content`) possui dados do construtor:

| Tabela | Papel |
|-------|------|
| `pages` | Uma página por URL: `url`, `title`, `layout`, mais `visibility`/`groupIds` (gating de acesso) e `metaDescription` (SEO) |
| `sections` | Bandas horizontais em uma página (ou em um bloco): fundo, cor de texto e um `answersJSON` que carrega estilo mais as configurações de divisor de forma `dividerTop`/`dividerBottom` |
| `elements` | Peças de conteúdo dentro de uma seção: `elementType` + `answersJSON`, aninhável para tipos de layout (linha/coluna, carrossel) |
| `blocks` | Grupos de seção/elemento reutilizáveis (blocos de rodapé, blocos de elemento) compartilhados entre páginas |
| `posts` | Metadados de blog sobre uma página de construtor normal (veja [Blog](#blog-posts-over-pages)) |
| `redirects` | Pares por chiesa `fromPath → toPath`, limitados a 200 (veja [SEO](#seo-and-discoverability)) |
| `settings` | Configurações de chiesa de chave-valor; linhas sinalizadas `public` são servidas anonimamente e carregam o widget/config de análise |

A árvore inteira para uma URL volta de uma única chamada anônima — `GET /content/pages/:churchId/tree?url=/about` — que é o que B1App renderiza do servidor. As solicitações do editor buscam por id em vez disso e mantêm ids internos.

## O contrato de elemento

### O catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como um `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e um estilo de esquema JSON `answersSchema` para suas respostas. `validateElementAnswers()` é deliberadamente indulgente — tipos desconhecidos e chaves extras passam, portanto conteúdo antigo nunca quebra em uma atualização de catálogo. **35 tipos navegam hoje:**

| Categoria | Tipos de Elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

O elemento `sermons` é o mais configurável dos tipos de chiesa: uma resposta `layout` seleciona `browse` (o navegador completo legado), `grid`, `list` ou `featuredLatest`, com `playlistId`, `itemCount`, `showTitles` e `showDates` refinando os layouts não navegador.

### Renderizadores (`@churchapps/apphelper`)

Renderizadores vivem em `Packages/apphelper/src/website/components/elementTypes/`, um componente por tipo, resolvido através de `ElementRegistry.ts` — um mapa de duas camadas onde `Element.tsx` registra o renderizador padrão para todos os 35 tipos (`registerDefaultElementRenderer`) e um aplicativo hospedeiro pode substituir qualquer um deles em tempo de execução (`registerElementRenderer`) sem fazer fork do pacote.

### Formulários do editor (B1Admin)

Os formulários de configurações do editor por tipo vivem em `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` se despacha para um componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou um construtor de campo inline por tipo. O espelho voltado para IA deste catálogo é a ferramenta MCP `describe_page_builder` da API (veja [MCP Server](../api/mcp)).

### Divisores de forma de seção

As seções podem carregar divisores de forma decorativos em qualquer borda. A config vive em `answersJSON` da seção como objetos `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` com `shape` sendo um de `wave, waves, slant, curve, triangle, peaks`. Apphelper envia o componente `SectionDivider` e o auxiliar `parseDividerConfig()`; os renderizadores de Seção de ambos os aplicativos (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analisam as respostas e montam o divisor, e `SectionEdit.tsx` no B1Admin fornece o UI do seletor. Os pacotes apenas enviam o bloco de construção — a fiação no nível de seção é trabalho dos aplicativos consumidores.

## Elementos de Dados de Chiesa

Três tipos de elemento renderizam dados de chiesa ao vivo em vez de conteúdo de autor. O isolamento de módulo ainda se aplica — cada um chama o ponto de extremidade público de seu próprio módulo do navegador:

| Elemento | Ponto de Extremidade | Notas |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retorna `{ fundId, totalAmount, donationCount }`, janela `?startDate=&endDate=` opcional; o elemento compara contra sua resposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Apenas opt-in**: o grupo deve ter `publicRoster` definido (padrão desativado). A projeção é deliberadamente mínima — `personId`, `displayName`, `leader`, foto — nenhum contato ou campo demográfico |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retorna a árvore campus → serviço → tempo; o renderizador apphelper emite schema.org `Event` JSON-LD de melhor esforço dele (a API retorna dados simples) |

:::warning
`publicRoster` é o portão de privacidade para `staffGrid`. Nunca amplie a projeção de membro do grupo público ou ignore a flag — o ponto de extremidade da lista é anônimo por design e a lista de campo mínimo é a propriedade de segurança.
:::

## Widgets em Todo o Site

Dois widgets renderizam em cada página pública em vez de dentro da árvore: **AnnouncementBanner** (barra de topo descartável) e **Launcher** (hub de ação flutuante para links de estilo dar/visitar/assistir). Ambos componentes e seus auxiliares `parse*Config()` navegam em apphelper. A configuração é duas linhas de configurações públicas — chaves `announcementBanner` e `launcher` — escritas por `SiteWidgetsEdit` de B1Admin (na página Aparência) e lidas pelo layout público de B1App via `GET /content/settings/public/:churchId`. A API trata estes como pares chave-valor opacos; os nomes de chave são uma convenção entre os dois aplicativos.

## Blog: Postagens Sobre Páginas

O blog é uma camada de metadados fina, não um sistema de conteúdo segundo. Uma linha `posts` (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) aponta para uma página de construtor normal via `pageId`; a página mantém o corpo e é editada no editor de página normal. Superfície pública (tudo anônimo, `PostController`):

| Rota | Propósito |
|-------|---------|
| `GET /content/posts/public/:churchId` | Postagens publicadas, filtráveis por `?category=&tag=`, paginadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Metadados de uma postagem |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0 |

Uma postagem é "publicada" uma vez que `publishDate` está definido e passou. B1App serve `/{sdSlug}/blog` (listagem, com o feed RSS anunciado como um link alternativo) e `/{sdSlug}/blog/[postSlug]`, que busca a árvore de página de backup em `/blog/{slug}` e a renderiza através do mesmo pipeline Zone/Section que qualquer outra página, adicionando JSON-LD `BlogPosting`. URLs de blog são incluídas no sitemap por igreja. UI de autoria do B1Admin (**Site → Blog**) cria a página de backup em `/blog/{slug}` e a linha `posts` juntos.

## Páginas Apenas para Membros

`pages.visibility` reutiliza o enum de links de navegação — `everyone` (padrão), `visitors`, `members`, `staff`, `team`, `groups` (com `groupIds`) — mas como uma **porta de acesso difícil**, não um filtro nav (`PageVisibilityHelper.canViewPage`). O fluxo:

1. O ponto de extremidade de árvore anônima verifica visibilidade em buscas baseadas em URL. Os chamadores anônimos de uma página controlada obtêm `{ restricted: true, visibility }` em vez de conteúdo — a árvore nunca vaza.
2. O ponto de extremidade ainda honra um JWT: `CustomAuthProvider` verifica o cabeçalho `Authorization` em *cada* solicitação, incluindo rotas anônimas, para que a busca de um membro autenticado da mesma URL se resolva normalmente.
3. B1App renderiza `RestrictedPage` em uma resposta `restricted`: hidrata a sessão de credenciais armazenadas, re-busca a árvore com o JWT e a renderiza — ou mostra um portão de login com um `returnUrl` quando não há sessão.

:::info
A granularidade da porta varia por nível: `groups` verifica o `groupIds` do token contra a lista da página e `staff` verifica `membershipStatus`, mas `members` e `team` atualmente passam qualquer usuário autenticado da chiesa. Trate `groups` como a opção rigorosa.
:::

## SEO e Descoberta

Tudo isto é renderização no lado B1App sobre dados ContentApi — a API armazena, o aplicativo emite:

| Preocupação | Como funciona |
|---------|--------------|
| Descrições Meta | `pages.metaDescription` (≤300 caracteres) flui através de `MetaHelper.getMetaData()` para os `Metadata` de Next.js (descrição + Open Graph) em cada rota renderizada do construtor. As configurações de página de B1Admin incluem um botão "Gerar" de IA (veja abaixo) |
| Redirecionamentos | Linhas `redirects` por chiesa gerenciadas em `/content/redirects` (`content.edit`, limite de linha 200, caminhos normalizados). Em um 404 que seria, a rota de página B1App resolve o caminho contra `GET /content/redirects/public/:churchId` e emite um HTTP 308 via `permanentRedirect` de Next; caminhos não correspondidos caem em `notFound()` |
| 404 Marcado | `not-found.tsx` renderiza `BrandedNotFound` com logo, nome e tema da chiesa em vez de um erro genérico |
| Dados estruturados | JSON-LD `BlogPosting` em postagens de blog; `VideoObject` nas páginas por sermão (`/{sdSlug}/sermons/[sermonId]`) e em páginas contendo um elemento `sermons`; `Event` de elementos calendário/evento em páginas do construtor; schema.org `Event` do elemento `serviceTimes` |
| Páginas de Sermão | Cada sermão público recebe uma página rastreável em `/sermons/[sermonId]` com metadados completos — sermões não estão mais trancados dentro do elemento de navegador do lado do cliente |
| Análise | A chave de configurações públicas `ga4MeasurementId` (gerenciada ao lado de redirecionamentos no B1Admin) injeta um GA4 gtag por chiesa via `next/script` |
| Sitemap e Feeds | A rota `sitemap.xml` por chiesa inclui páginas do construtor e URLs de blog; a listagem de blog anuncia o feed RSS |
| Acessibilidade | O chrome público renderiza um link de pulo direcionando para o marco `<main id="main-content">` em cada invólucro de layout |

## Geração de IA (AskApi)

Geração de página e site executa em **AskApi**, um serviço separado, sob o controlador `/website`. Autentica com o mesmo JWT `CustomAuthProvider` que tudo mais e é **sem estado no que diz respeito ao conteúdo**: cada ponto de extremidade retorna JSON e o chamador (B1Admin) persiste o resultado através de ContentApi (`POST /content/pages/temp/ai` salva um pacote gerado de página-seções-elementos em uma chamada).

:::info
Em 2026-07-03, os pontos de entrada de B1Admin neste pipeline — o modelo "IA" do site em `AddPageModal`, o botão de reescrita de `SectionToolbar` e o botão "Gerar Site" da lista de páginas — estão comentados no lado do cliente enquanto o recurso é reworkado. Os pontos de extremidade abaixo do AskApi não são afetados e ainda respondem; apenas o UI do B1Admin está oculto.
:::

| Ponto de Extremidade | Propósito |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | O fluxo de página original de duas etapas: esboço primeiro, depois uma chamada por seção. O modelo de página "IA" de B1Admin em `AddPageModal` conduz isto — esboço, depois geração de seção paralela, depois visualização |
| `POST /website/generateSite` | Geração de site inteiro. **Duas fases por design**: uma chamada `planOnly: true` retorna apenas o plano de multi-página (uma chamada de modelo rápida), depois o cliente solicita conteúdo completo — mantendo cada solicitação dentro do timeout Lambda/API-Gateway |
| `POST /website/rewriteSection` | Reescrita que preserva estrutura: o modelo pode apenas mudar respostas que carregam texto. Uma assinatura de estrutura recursiva (ids + tipos + ordem) é comparada antes e depois; qualquer incompatibilidade retorna a seção original com `fallback: true` em vez de estrutura corrupta |
| `POST /website/generateAltText` | Chamada de visão sobre até 20 URLs de imagem; retorna texto alt conciso (≤125 caracteres, prefixos "photo of" removidos) |
| `POST /website/generateMetaDescription` | Uma descrição meta de SEO (≤155 caracteres) do conteúdo de texto da página — fiado para o botão Gerar nas configurações de página de B1Admin |

Prompts são arquivos markdown sob `AskApi/config/instructions/`, incluindo o catálogo de elemento que o modelo gera a partir. Dois pontos de design mantêm o catálogo honesto: o cliente passa `availableElementTypes` em cada solicitação (o prompt pode apenas usar tipos daquela lista — o servidor nunca codifica o conjunto completo) e a ferramenta MCP `describe_page_builder` da API carrega o mesmo guia para agentes de IA funcionando através de [MCP](../api/mcp). Modelos são Anthropic Claude via OpenRouter — 3.5 Haiku para conteúdo de seção (latência), 3.5 Sonnet para esboços, planos de site e visão — com fallback OpenAI quando nenhuma chave OpenRouter está configurada.

## Formulários Conversacionais

Formulários (módulo de associação) ganharam um modo conversacional direcionado a páginas de estilo de cartão de conexão. Quatro colunas em `forms` acionam isto: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderização** — `FormSubmissionEdit` do apphelper muda para o componente `ConversationalForm` (uma pergunta por vez) quando `displayMode` é `conversational`; a página de formulário de B1App passa o modo através. Mesmo payload de envio de qualquer forma.
- **Auto-criar pessoa** — no envio com `autoCreatePerson` definido, `ConversationalFormHelper.findOrCreatePerson` dedup por email (case-insensitive) e caso contrário cria um agregado doméstico + pessoa com `membershipStatus: "Guest"`, depois vincula o envio àquela pessoa.
- **Email de acompanhamento** — quando um assunto e corpo são definidos, o remetente recebe um email de modelo (com tokens `{firstName}` / `{churchName}`) através do caminho transacional existente (`TransactionalEmailHelper`), nunca a porta de resumo de notificação. Ambos os efeitos colaterais são não fatais: uma falha nunca perde o envio.

Os quatro campos são definidos via API hoje; o editor de formulário B1Admin ainda não os expõe.

## Páginas Relacionadas

- [Roteamento de Website e Multi-Site](./websites) — como uma solicitação se resolve para uma chiesa/site e como domínios personalizados rota
- [Pontos de Extremidade de Conteúdo](../api/endpoints/content) — superfície REST completa para páginas, seções, elementos, blocos, postagens, redirecionamentos e configurações
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que envia os renderizadores, registro, divisores e widgets
- [Servidor MCP](../api/mcp) — incluindo a ferramenta guia `describe_page_builder`
- [Editor de Página (usuário final)](/docs/b1-admin/website/page-editor) — documentação do editor voltada para equipe
