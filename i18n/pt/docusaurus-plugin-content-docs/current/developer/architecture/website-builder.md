---
title: "Arquitetura do Website Builder"
---

# Arquitetura do Website Builder

<div class="article-intro">

Todo site de igreja servido pelo B1App é renderizado a partir de uma árvore de conteúdo — páginas, seções, elementos — armazenada na ContentApi e editada visualmente no B1Admin. Uma biblioteca de componentes compartilhada renderiza tanto a pré-visualização do editor quanto o site ao vivo, um catálogo de tipos de elemento define o que pode aparecer em uma página, e um serviço de IA separado pode gerar ou reescrever essa árvore. Esta página mapeia toda a pilha: o contrato de elemento em `@churchapps/helpers`, o pipeline de renderização, elementos de dados da igreja, widgets em todo o site, a camada de blog, páginas com acesso controlado, SEO, geração por IA e formulários conversacionais.

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

Três regras se mantêm em toda a pilha:

1. **Uma árvore, dois renderizadores.** Uma página é uma árvore `pages → sections → elements` em que cada nó carrega suas configurações como um blob JSON `answers`. Os mesmos componentes do apphelper renderizam o editor de arrastar e soltar no B1Admin e o site público renderizado no servidor no B1App — não existe um "formato de publicação" separado.
2. **O contrato vive em `@churchapps/helpers`.** `ElementTypes.ts` é o catálogo único de tipos de elemento; os renderizadores se resolvem por meio de um registro no apphelper; os formulários do editor vivem no B1Admin. Adicionar um tipo de elemento significa mexer nos três, nessa ordem.
3. **O site público lê pontos de extremidade anônimos.** Tudo que o B1App precisa — a árvore de páginas, configurações, postagens de blog, redirecionamentos e os pontos de extremidade de dados da igreja em outros módulos — é público. A autenticação é opcional: um JWT no ponto de extremidade anônimo da árvore desbloqueia páginas apenas para membros, e nada mais muda.

## A árvore de conteúdo

O módulo de conteúdo (`Api/src/modules/content`) é dono dos dados do construtor:

| Tabela | Papel |
|-------|------|
| `pages` | Uma página por URL: `url`, `title`, `layout`, além de `visibility`/`groupIds` (controle de acesso) e `metaDescription` (SEO) |
| `sections` | Faixas horizontais em uma página (ou em um bloco): fundo, cor do texto, e um `answersJSON` que carrega o estilo mais as configurações de divisor de forma `dividerTop`/`dividerBottom` |
| `elements` | Peças de conteúdo dentro de uma seção: `elementType` + `answersJSON`, aninhável para tipos de layout (linha/coluna, carrossel) |
| `blocks` | Grupos reutilizáveis de seção/elemento (blocos de rodapé, blocos de elemento) compartilhados entre páginas |
| `posts` | Postagens de blog independentes (veja [Blog](#blog)) |
| `redirects` | Pares `fromPath → toPath` por igreja, limitados a 200 (veja [SEO](#seo-e-descoberta)) |
| `settings` | Configurações chave-valor da igreja; linhas marcadas como `public` são servidas anonimamente e carregam a configuração de widgets/análises |

A árvore inteira de uma URL vem de uma única chamada anônima — `GET /content/pages/:churchId/tree?url=/about` — que é o que o B1App renderiza no servidor. As solicitações do editor buscam por id em vez disso, e mantêm ids internos.

## O contrato de elemento

### O catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como uma `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, e um `answersSchema` no estilo JSON-schema para suas respostas. `validateElementAnswers()` é deliberadamente tolerante — tipos desconhecidos e chaves extras passam, então conteúdo antigo nunca quebra em uma atualização de catálogo. **35 tipos disponíveis hoje:**

| Categoria | Tipos de elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

O elemento `sermons` é o mais configurável dos tipos de igreja: uma resposta `layout` seleciona `browse` (o navegador completo legado), `grid`, `list`, ou `featuredLatest`, com `playlistId`, `itemCount`, `showTitles` e `showDates` refinando os layouts que não são o navegador.

### Renderizadores (`@churchapps/apphelper`)

Os renderizadores vivem em `Packages/apphelper/src/website/components/elementTypes/`, um componente por tipo, resolvidos por meio de `ElementRegistry.ts` — um mapa de duas camadas em que `Element.tsx` registra o renderizador padrão para todos os 35 tipos (`registerDefaultElementRenderer`) e um aplicativo hospedeiro pode substituir qualquer um deles em tempo de execução (`registerElementRenderer`) sem fazer fork do pacote.

### Formulários do editor (B1Admin)

Os formulários de configurações por tipo do editor vivem em `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` despacha para um componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou um construtor de campos em linha por tipo. O espelho voltado para IA desse catálogo é a ferramenta MCP `describe_page_builder` da API (veja [Servidor MCP](../api/mcp)).

### Divisores de forma de seção

As seções podem carregar divisores de forma decorativos em qualquer borda. A configuração vive no `answersJSON` da seção como objetos `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` com `shape` sendo um de `wave, waves, slant, curve, triangle, peaks`. O apphelper fornece o componente `SectionDivider` e o auxiliar `parseDividerConfig()`; os renderizadores de Seção de ambos os aplicativos (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analisam as respostas e montam o divisor, e `SectionEdit.tsx` no B1Admin fornece a interface do seletor. Os pacotes só fornecem o bloco de construção — a conexão no nível de seção é trabalho dos aplicativos que os consomem.

## Elementos de dados da igreja

Três tipos de elemento renderizam dados ao vivo da igreja em vez de conteúdo autoral. O isolamento de módulo ainda se aplica — cada um chama o ponto de extremidade público do seu próprio módulo a partir do navegador:

| Elemento | Ponto de Extremidade | Notas |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retorna `{ fundId, totalAmount, donationCount }`, com janela opcional `?startDate=&endDate=`; o elemento compara isso contra sua resposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Somente opt-in**: o grupo precisa ter `publicRoster` definido (padrão desativado). A projeção é deliberadamente mínima — `personId`, `displayName`, `leader`, foto — sem contato ou campos demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retorna a árvore campus → serviço → horário; o renderizador do apphelper emite JSON-LD `Event` do schema.org de melhor esforço a partir disso (a API retorna dados simples) |

:::warning
`publicRoster` é o portão de privacidade do `staffGrid`. Nunca amplie a projeção pública de membros de grupo nem contorne o sinalizador — o ponto de extremidade de lista é anônimo por design, e a lista mínima de campos é a propriedade de segurança.
:::

## Widgets em todo o site

Dois widgets são renderizados em toda página pública em vez de dentro da árvore: **AnnouncementBanner** (barra dispensável no topo da página) e **Launcher** (hub de ação flutuante para links de estilo doar/visitar/assistir). Ambos os componentes e seus auxiliares `parse*Config()` são fornecidos pelo apphelper. A configuração são duas linhas de configurações públicas — chaves `announcementBanner` e `launcher` — escritas pelo `SiteWidgetsEdit` do B1Admin (na página de Aparência) e lidas pelo layout público do B1App via `GET /content/settings/public/:churchId`. A API trata essas linhas como pares chave-valor opacos; os nomes das chaves são uma convenção entre os dois aplicativos.

## Blog

O blog é um tipo de conteúdo independente, não uma camada sobre as páginas do construtor. Uma linha `posts` guarda a postagem inteira: `title`, `slug`, `excerpt`, `content` (corpo em markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Superfície pública (tudo anônimo, `PostController`):

| Rota | Propósito |
|-------|---------|
| `GET /content/posts/public/:churchId` | Postagens publicadas, filtráveis por `?category=&tag=`, paginadas |
| `GET /content/posts/public/:churchId/categories` | Categorias distintas entre as postagens publicadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Uma postagem publicada |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, com título com o nome da igreja, e descrição por item com categoria e resumo-ou-conteúdo |

Uma postagem está "publicada" assim que `publishDate` é definido e já passou; um `publishDate` futuro é uma postagem agendada (oculta publicamente, mostrada com um chip Agendado no admin). Os pontos de extremidade de leitura enriquecem cada postagem com `authorName`, resolvido a partir de `authorId` através da porta do módulo de associação. Resumos ausentes recorrem ao conteúdo em markdown sem formatação (~160 caracteres) nos cartões de listagem, nas descrições meta e no RSS. O B1App serve `/{sdSlug}/blog` — uma listagem editorial (cabeçalho centralizado que vira o nome da categoria/tag ativa quando filtrado, linha de filtro por chip de categoria, linhas de postagem com miniatura à esquerda com autoria e resumos) com o feed RSS anunciado como um link alternativo — e `/{sdSlug}/blog/[postSlug]`, uma rota dedicada (não o pipeline Zone/Section) com um cabeçalho centralizado (categoria em destaque, título, autoria, régua de destaque na cor primária), um herói 16:9 na largura do contêiner, o corpo em markdown em uma coluna de leitura de ~720px, chips de tags no rodapé do artigo, uma tira de postagens relacionadas `"Mais em {category}"`, e JSON-LD `BlogPosting` incluindo o autor. Ambas as páginas usam estilo inteiramente a partir de tokens de tema, então herdam a paleta de cada igreja. URLs de blog estão incluídas no sitemap por igreja. A interface de autoria do B1Admin (**Site → Blog**) edita postagens em uma caixa de diálogo: editor markdown com alternância de pré-visualização, seletor de imagem de galeria recortada em 16:9, seletor de pessoa autora (padrão é o usuário que está editando), autocompletar de categoria alimentado pelas categorias existentes, validação de slug duplicado, e um interruptor de publicação; linhas publicadas têm link para a postagem ao vivo, e a página incentiva os administradores a adicionarem um link de navegação para `/blog`.

## Páginas apenas para membros

`pages.visibility` reutiliza o enum de links de navegação — `everyone` (padrão), `visitors`, `members`, `staff`, `team`, `groups` (com `groupIds`) — mas como um **controle de acesso rígido**, não um filtro de navegação (`PageVisibilityHelper.canViewPage`). O fluxo:

1. O ponto de extremidade anônimo da árvore verifica a visibilidade em buscas baseadas em URL. Chamadores anônimos de uma página controlada recebem `{ restricted: true, visibility }` em vez de conteúdo — a árvore nunca vaza.
2. O ponto de extremidade ainda honra um JWT: `CustomAuthProvider` verifica o cabeçalho `Authorization` em *toda* solicitação, incluindo rotas anônimas, então a busca de um membro autenticado na mesma URL se resolve normalmente.
3. O B1App renderiza `RestrictedPage` em uma resposta `restricted`: ele hidrata a sessão a partir de credenciais armazenadas, rebusca a árvore com o JWT e a renderiza — ou mostra um portão de login com um `returnUrl` quando não há sessão.

:::info
A granularidade do controle varia por nível: `groups` verifica o `groupIds` do token contra a lista da página, e `staff` verifica `membershipStatus`, mas `members` e `team` atualmente aceitam qualquer usuário autenticado da igreja. Trate `groups` como a opção rígida.
:::

## SEO e descoberta

Tudo isso é renderização do lado do B1App sobre dados da ContentApi — a API armazena, o aplicativo emite:

| Preocupação | Como funciona |
|---------|--------------|
| Descrições meta | `pages.metaDescription` (≤300 caracteres) flui através de `MetaHelper.getMetaData()` para o `Metadata` do Next.js (descrição + Open Graph) em toda rota renderizada pelo construtor. As configurações de página do B1Admin incluem um botão de IA "Gerar" (veja abaixo) |
| Redirecionamentos | Linhas `redirects` por igreja gerenciadas em `/content/redirects` (`content.edit`, limite de 200 linhas, caminhos normalizados). Em um possível 404, a rota de página do B1App resolve o caminho contra `GET /content/redirects/public/:churchId` e emite um HTTP 308 via `permanentRedirect` do Next; caminhos sem correspondência caem em `notFound()` |
| 404 personalizado | `not-found.tsx` renderiza `BrandedNotFound` com o logo, o nome e o tema da igreja em vez de um erro genérico |
| Dados estruturados | JSON-LD `BlogPosting` nas postagens de blog; `VideoObject` nas páginas de cada sermão (`/{sdSlug}/sermons/[sermonId]`) e em páginas que contêm um elemento `sermons`; `Event` a partir de elementos de calendário/evento em páginas do construtor; `Event` do schema.org a partir do elemento `serviceTimes` |
| Páginas de sermão | Todo sermão público recebe uma página rastreável em `/sermons/[sermonId]` com metadados completos — sermões não estão mais trancados dentro do elemento navegador do lado do cliente |
| Análises | A chave de configurações públicas `ga4MeasurementId` (gerenciada ao lado dos redirecionamentos no B1Admin) injeta uma gtag do GA4 por igreja via `next/script` |
| Sitemap e feeds | A rota `sitemap.xml` por igreja inclui páginas do construtor e URLs de blog; a listagem do blog anuncia o feed RSS |
| Acessibilidade | O chrome público renderiza um link de pular que aponta para o marco `<main id="main-content">` em todo invólucro de layout |

## Geração por IA (AskApi)

A geração de página e site roda na **AskApi**, um serviço separado, sob o controlador `/website`. Ela se autentica com o mesmo JWT do `CustomAuthProvider` que tudo mais, e é **sem estado em relação ao conteúdo**: todo ponto de extremidade retorna JSON, e quem chama (o B1Admin) persiste o resultado através da ContentApi (`POST /content/pages/temp/ai` salva em uma única chamada um pacote gerado de página-seções-elementos).

:::info
Em 2026-07-03, os pontos de entrada do B1Admin para esse pipeline — o modelo de site "IA" no `AddPageModal`, o botão de reescrita do `SectionToolbar`, e o botão "Gerar Site" da lista de páginas — estão comentados no lado do cliente enquanto o recurso é reformulado. Os pontos de extremidade da AskApi abaixo não são afetados e continuam respondendo; apenas a interface do B1Admin está oculta.
:::

| Ponto de Extremidade | Propósito |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | O fluxo original de página em duas etapas: primeiro o esboço, depois uma chamada por seção. O modelo de página "IA" do B1Admin em `AddPageModal` conduz isso — esboço, depois geração de seção em paralelo, depois pré-visualização |
| `POST /website/generateSite` | Geração de site inteiro. **Duas fases por design**: uma chamada `planOnly: true` retorna apenas o plano multi-página (uma chamada rápida ao modelo), e então o cliente solicita o conteúdo completo — mantendo cada solicitação dentro do tempo limite do Lambda/API-Gateway |
| `POST /website/rewriteSection` | Reescrita que preserva a estrutura: o modelo só pode alterar respostas que carregam texto. Uma assinatura de estrutura recursiva (ids + tipos + ordem) é comparada antes e depois; qualquer divergência retorna a seção original com `fallback: true` em vez de estrutura corrompida |
| `POST /website/generateAltText` | Chamada de visão sobre até 20 URLs de imagem; retorna texto alternativo conciso (≤125 caracteres, prefixos "photo of" removidos) |
| `POST /website/generateMetaDescription` | Uma descrição meta de SEO (≤155 caracteres) a partir do conteúdo textual da página — conectada ao botão Gerar nas configurações de página do B1Admin |

Os prompts são arquivos markdown sob `AskApi/config/instructions/`, incluindo o catálogo de elementos a partir do qual o modelo gera. Dois pontos de design mantêm o catálogo honesto: o cliente passa `availableElementTypes` em toda solicitação (o prompt só pode usar tipos dessa lista — o servidor nunca fixa o conjunto completo no código), e a ferramenta MCP `describe_page_builder` da API carrega o mesmo guia para agentes de IA trabalhando através do [MCP](../api/mcp). Os modelos são Anthropic Claude via OpenRouter — 3.5 Haiku para conteúdo de seção (latência), 3.5 Sonnet para esboços, planos de site e visão — com um fallback para OpenAI quando nenhuma chave OpenRouter está configurada.

## Formulários conversacionais

Os formulários (módulo de associação) ganharam um modo conversacional voltado para páginas no estilo cartão de conexão. Quatro colunas em `forms` controlam isso: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderização** — o `FormSubmissionEdit` do apphelper muda para o componente `ConversationalForm` (uma pergunta por vez) quando `displayMode` é `conversational`; a página de formulário do B1App repassa o modo adiante. O mesmo payload de envio de qualquer forma.
- **Criação automática de pessoa** — no envio com `autoCreatePerson` definido, `ConversationalFormHelper.findOrCreatePerson` deduplica por e-mail (sem diferenciar maiúsculas/minúsculas) e, caso contrário, cria uma família + pessoa com `membershipStatus: "Guest"`, depois vincula o envio a essa pessoa.
- **E-mail de acompanhamento** — quando um assunto e um corpo são definidos, quem enviou recebe um e-mail de modelo (com tokens `{firstName}` / `{churchName}`) através do caminho transacional existente (`TransactionalEmailHelper`), nunca a porta de resumo de notificações. Ambos os efeitos colaterais não são fatais: uma falha nunca perde o envio.

Os quatro campos são definidos via API hoje; o editor de formulário do B1Admin ainda não os expõe.

## Páginas Relacionadas

- [Roteamento de Website e Multi-Site](./websites) — como uma solicitação se resolve para uma igreja/site e como domínios personalizados são roteados
- [Pontos de Extremidade de Conteúdo](../api/endpoints/content) — superfície REST completa para páginas, seções, elementos, blocos, postagens, redirecionamentos e configurações
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que fornece os renderizadores, o registro, os divisores e os widgets
- [Servidor MCP](../api/mcp) — incluindo a ferramenta de guia `describe_page_builder`
- [Editor de Página (usuário final)](/docs/b1-admin/website/page-editor) — a documentação do editor voltada para a equipe
