---
title: "Arquitetura do Construtor de Sites"
---

# Arquitetura do Construtor de Sites

<div class="article-intro">

Cada site de igreja servido pelo B1App é renderizado a partir de uma árvore de conteúdo -- páginas, seções e elementos -- armazenada no ContentApi e editada visualmente no B1Admin. Uma biblioteca compartilhada de componentes renderiza tanto a prévia do editor quanto o site ao vivo, um catálogo de tipos de elementos define o que pode aparecer em uma página, e um serviço de IA separado pode gerar ou reescrever essa árvore. Esta página mapeia a stack inteira: o contrato de elementos em `@churchapps/helpers`, o pipeline de renderização, os elementos com dados da igreja, os widgets de todo o site, a camada de blog, as páginas com controle de acesso, SEO, geração por IA e formulários conversacionais.

</div>

## Visão geral

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

Três regras valem para toda a stack:

1. **Uma árvore, dois renderizadores.** Uma página é uma árvore `pages → sections → elements` em que cada nó carrega suas configurações em um blob JSON `answers`. Os mesmos componentes do apphelper renderizam o editor de arrastar e soltar no B1Admin e o site público renderizado no servidor pelo B1App -- não existe um "formato de publicação" separado.
2. **O contrato fica em `@churchapps/helpers`.** `ElementTypes.ts` é o catálogo único dos tipos de elementos; os renderizadores são resolvidos por um registro no apphelper; os formulários de edição ficam no B1Admin. Adicionar um tipo de elemento exige mexer nos três, nessa ordem.
3. **O site público lê endpoints anônimos.** Tudo que o B1App precisa -- a árvore de páginas, as configurações, as postagens do blog, os redirecionamentos e os endpoints com dados da igreja de outros módulos -- é público. A autenticação é opcional: um JWT no endpoint anônimo da árvore libera páginas exclusivas para membros, e nada mais muda.

## A árvore de conteúdo

O módulo de conteúdo (`Api/src/modules/content`) é o dono dos dados do construtor:

| Tabela | Função |
|-------|-------|
| `pages` | Uma página por URL: `url`, `title`, `layout`, mais `visibility`/`groupIds` (controle de acesso) e `metaDescription` (SEO) |
| `sections` | Faixas horizontais em uma página (ou em um bloco): plano de fundo, cor do texto e um `answersJSON` que carrega o estilo mais as configurações de divisor de forma `dividerTop`/`dividerBottom` |
| `elements` | Peças de conteúdo dentro de uma seção: `elementType` + `answersJSON`, aninháveis para tipos de layout (linha/coluna, carrossel) |
| `blocks` | Grupos reutilizáveis de seções/elementos (blocos de rodapé, blocos de elementos) compartilhados entre páginas |
| `posts` | Postagens de blog independentes (veja [Blog](#blog)) |
| `redirects` | Pares `fromPath → toPath` por igreja, limitados a 200 (veja [SEO](#seo-and-discoverability)) |
| `settings` | Configurações da igreja no formato chave-valor; linhas marcadas como `public` são servidas anonimamente e trazem a configuração de widgets/analytics |

A árvore inteira de uma URL volta em uma única chamada anônima -- `GET /content/pages/:churchId/tree?url=/about` -- que é a partir de onde o B1App renderiza no servidor. As requisições do editor buscam por ID e mantêm os IDs internos.

## O contrato de elementos

### O catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como um `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e um `answersSchema` no estilo JSON Schema para suas respostas. `validateElementAnswers()` é deliberadamente tolerante -- tipos desconhecidos e chaves extras passam, então o conteúdo antigo nunca quebra com uma atualização do catálogo. **São 35 tipos distribuídos hoje:**

| Categoria | Tipos de elementos |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

O elemento `sermons` é o mais configurável entre os tipos de igreja: uma resposta `layout` seleciona `browse` (o navegador completo legado), `grid`, `list` ou `featuredLatest`, com `playlistId`, `itemCount`, `showTitles` e `showDates` refinando os layouts que não são `browse`.

O elemento `rawHTML` tem duas respostas: `rawHTML` (marcação) e `javascript`. Scripts inseridos por `innerHTML` nunca são executados, então o `RawHTMLElement` recria cada nó `<script>` da marcação como um elemento novo. Esses nós não inseridos pelo parser são confiáveis sob o `strict-dynamic` da CSP. Uma resposta `javascript` que começa com `<` (um trecho de fornecedor colado com as tags `<script>`) é interpretada como marcação e recebe o mesmo tratamento. Caso contrário, roda como um script inline simples. O B1Admin sinaliza uma URL solta na caixa de JavaScript, já que uma URL isolada roda como um script sem efeito. O elemento `map` não renderiza nada e não carrega o script do Google Maps quando nenhuma chave da API de Maps está configurada.

### Renderizadores (`@churchapps/apphelper`)

Os renderizadores ficam em `Packages/apphelper/src/website/components/elementTypes/`, um componente por tipo, resolvidos pelo `ElementRegistry.ts` -- um mapa de duas camadas em que `Element.tsx` registra o renderizador padrão dos 35 tipos (`registerDefaultElementRenderer`) e um aplicativo hospedeiro pode substituir qualquer um deles em tempo de execução (`registerElementRenderer`) sem fazer um fork do pacote.

### Formulários de edição (B1Admin)

Os formulários de configuração por tipo do editor ficam em `B1Admin/src/site/admin/elements/` -- o `ElementEdit.tsx` despacha para um componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou para um construtor de campos inline, por tipo. O espelho voltado para IA deste catálogo é a ferramenta MCP `describe_page_builder` da API (veja [Servidor MCP](../api/mcp)).

A prévia do editor monta o mesmo `Theme` do site ao vivo, que define as variáveis CSS `--headingFont` / `--bodyFont` a partir dos estilos globais da igreja. O B1App aplica essas variáveis pelo `pages.css`, que o B1Admin não consegue importar, então o `ContentEditor.tsx` injeta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) para aplicá-las ao texto do corpo de `.page` e aos `h1`–`h6`. Sem isso, a prévia mostrava os títulos com a fonte da administração.

### Divisores de forma nas seções

As seções podem ter divisores decorativos de forma em qualquer uma das bordas. A configuração fica no `answersJSON` da seção como os objetos `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }`, com `shape` sendo um de `wave, waves, slant, curve, triangle, peaks`. O apphelper traz o componente `SectionDivider` e o auxiliar `parseDividerConfig()`; os renderizadores de Seção dos dois aplicativos (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) leem as respostas e montam o divisor, e o `SectionEdit.tsx` do B1Admin oferece o seletor. Os pacotes trazem apenas o bloco de construção -- a integração no nível da seção é trabalho dos aplicativos que os consomem.

## Elementos com dados da igreja

Três tipos de elementos renderizam dados reais da igreja, em vez de conteúdo escrito. O isolamento entre módulos continua valendo -- cada um chama o endpoint público do próprio módulo, a partir do navegador:

| Elemento | Endpoint | Observações |
|---------|----------|-------------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retorna `{ fundId, totalAmount, donationCount }`, com uma janela opcional `?startDate=&endDate=`; o elemento compara o valor com sua resposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Somente por adesão**: o grupo precisa ter `publicRoster` ativado (padrão desativado). A projeção é deliberadamente mínima -- `personId`, `displayName`, `leader`, foto -- sem campos de contato ou demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retorna a árvore campus → culto → horário; o renderizador do apphelper emite JSON-LD `Event` do schema.org, de forma best-effort, a partir dela (a API retorna dados simples) |

:::warning
`publicRoster` é o controle de privacidade do `staffGrid`. Nunca amplie a projeção pública de membros do grupo nem contorne a flag -- o endpoint da lista é anônimo por design, e a lista mínima de campos é a propriedade de segurança.
:::

### Elemento de calendário e páginas de eventos

As respostas do elemento `calendar` são `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, o padrão, ou `upcoming`) e `tag`. O B1App substitui o renderizador do apphelper em `src/components/Element.tsx` com `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderiza o `UpcomingEventsElement` do B1App: ele carrega `GET /content/events/public/group/:churchId/:groupId` ou `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, expande as recorrências com `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, uma ocorrência por evento dentro de um ano) e mostra os 12 primeiros como blocos com foto (`events.photoUrl`, com o título como alternativa sobre a cor escura do tema), com link para `/events/{id}`, além de um menu Assinar para o feed ICS do calendário.
- **`display: "month"`** renderiza o `CalendarElement` do apphelper com um callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` então navegam para essa URL ao clicar, em vez de abrir a janela de detalhes (o B1Admin não passa `eventUrl`, então o calendário administrativo mantém a janela).
- **`tag`** filtra as duas exibições com `EventHelper.hasTag()` (`@churchapps/helpers`): uma correspondência sem diferenciar maiúsculas de minúsculas com `events.tags`, separado por vírgulas; vazio mostra tudo. A junção do calendário curado seleciona `e.tags`, para que os eventos curados carreguem as tags.

Eventos curados são vinculados por `realEventId` (`eventPageId()`), então a URL sempre aponta para o evento subjacente. `/{sdSlug}/events/[eventId]` é uma rota dedicada (fora do pipeline do construtor): carrega `GET /content/events/public/:churchId/:id` -- que retorna `null` para eventos pendentes/rejeitados e para eventos privados sem inscrição -- e acrescenta `roomNames` das reservas de salas não rejeitadas; renderiza o `EventPageContent` (cabeçalho com foto, descrição em markdown, painel lateral Quando/Onde, **Inscrever-se neste evento** quando `registrationEnabled`, e um link **Adicionar ao meu calendário** para `GET /content/events/public/:churchId/:id/ical`); usa a foto como imagem do Open Graph e emite JSON-LD `Event` para a próxima ocorrência por meio do `EventPageJsonLd`. Um evento desconhecido ou oculto retorna um 404 de verdade.

## Widgets de todo o site

Dois widgets são renderizados em cada página pública, fora da árvore: **AnnouncementBanner** (barra dispensável no topo da página) e **Launcher** (central de ações flutuante para links do tipo doar/visitar/assistir). Ambos os componentes e seus auxiliares `parse*Config()` vêm do apphelper. A configuração são duas linhas públicas de configurações, com as chaves `announcementBanner` e `launcher`, escritas pelo `SiteWidgetsEdit` do B1Admin (na página Aparência) e lidas pelo layout público do B1App por meio de `GET /content/settings/public/:churchId`. A API trata esses valores como pares chave-valor opacos; os nomes das chaves são uma convenção entre os dois aplicativos.

## Blog

O blog é um tipo de conteúdo independente, e não uma camada sobre as páginas do construtor. Uma linha de `posts` guarda a postagem inteira: `title`, `slug`, `excerpt`, `content` (corpo em markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. A superfície pública (toda anônima, `PostController`):

| Rota | Finalidade |
|-------|-------|
| `GET /content/posts/public/:churchId` | Postagens publicadas, filtráveis por `?category=&tag=`, com paginação |
| `GET /content/posts/public/:churchId/categories` | Categorias distintas das postagens publicadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Uma postagem publicada |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, com o título do nome da igreja e, em cada item, a categoria e a descrição (resumo ou conteúdo) |

Uma postagem está "publicada" depois que `publishDate` é definida e já passou; uma `publishDate` futura é uma postagem agendada (oculta publicamente, exibida com um marcador Agendada no admin). Os endpoints de leitura enriquecem cada postagem com `authorName`, resolvido a partir de `authorId` pelo gateway do módulo de membership. Resumos ausentes recorrem ao conteúdo sem markdown (~160 caracteres) nos cartões da lista, nas meta descrições e no RSS. O B1App serve `/{sdSlug}/blog` -- uma listagem editorial (cabeçalho centralizado que vira o nome da categoria/tag ativa quando filtrado, linha de chips de categoria, linhas de postagem com miniatura à esquerda, assinaturas e resumos) com o feed RSS anunciado como link alternativo -- e `/{sdSlug}/blog/[postSlug]`, uma rota dedicada (fora do pipeline Zone/Section), com cabeçalho centralizado (rótulo da categoria, título, assinatura, filete na cor primária), um hero 16:9 na largura do contêiner, o corpo em markdown em uma coluna de leitura de cerca de 720px, chips de tags no rodapé do artigo, uma faixa de postagens relacionadas `"Mais em {category}"` e JSON-LD `BlogPosting` que inclui o autor. As duas páginas se estilizam inteiramente a partir dos tokens do tema, então herdam a paleta de cada igreja. As URLs do blog entram no sitemap de cada igreja. A interface de autoria do B1Admin (**Site → Blog**) edita as postagens em uma janela: editor de markdown com alternância de prévia, seletor de imagem da galeria recortada em 16:9, seletor de autor (por padrão, o usuário que edita), autocompletar de categorias alimentado pelas categorias existentes, validação de slug duplicado e um botão de publicação; as linhas publicadas linkam para a postagem ao vivo, e a página sugere ao administrador adicionar um link de navegação para `/blog`. Os comentários ficam a cargo de serviços de terceiros: uma configuração pública de conteúdo da igreja, `blogFooterHtml` (editada em **Abaixo de Cada Postagem** na página Blog e exibida somente com Configurações→Editar), é renderizada sob cada postagem pelo `BlogFooterEmbed` do B1App, que recria as tags `<script>` para que executem sob o `'strict-dynamic'` e as roda em ordem (um `src` externo termina de carregar antes que o próximo script inline execute), já que os trechos de fornecedores carregam uma biblioteca e depois a chamam.

## Páginas exclusivas para membros

`pages.visibility` reaproveita o enum dos links de navegação -- `everyone` (padrão), `visitors`, `members`, `staff`, `team`, `groups` (com `groupIds`) -- mas como um **controle de acesso rígido**, e não um filtro de navegação (`PageVisibilityHelper.canViewPage`). O fluxo:

1. O endpoint anônimo da árvore verifica a visibilidade nas buscas por URL. Quem não está logado e pede uma página restrita recebe `{ restricted: true, visibility }` no lugar do conteúdo -- a árvore nunca vaza.
2. O endpoint ainda respeita um JWT: o `CustomAuthProvider` verifica o cabeçalho `Authorization` em *toda* requisição, inclusive nas rotas anônimas, então a busca de um membro autenticado pela mesma URL é resolvida normalmente.
3. O B1App renderiza o `RestrictedPage` diante de uma resposta `restricted`: ele hidrata a sessão a partir das credenciais salvas, busca a árvore de novo com o JWT e a renderiza -- ou mostra uma tela de login com um `returnUrl` quando não há sessão.

:::info
A granularidade do controle varia por nível: `groups` confere os `groupIds` do token com a lista da página, e `staff` confere o `membershipStatus`, mas `members` e `team` atualmente aceitam qualquer usuário autenticado da igreja. Trate `groups` como a opção estrita.
:::

## SEO e descoberta {#seo-and-discoverability}

Tudo isso é renderização do lado do B1App sobre os dados do ContentApi -- a API armazena, o aplicativo emite:

| Assunto | Como funciona |
|---------|--------------|
| Meta descrições | `pages.metaDescription` (≤300 caracteres) passa por `MetaHelper.getMetaData()` até o `Metadata` do Next.js (description + Open Graph) em cada rota renderizada pelo construtor. As configurações de página do B1Admin incluem um botão "Gerar" com IA (veja abaixo) |
| Redirecionamentos | Linhas `redirects` por igreja, gerenciadas em `/content/redirects` (`content.edit`, limite de 200 linhas, caminhos normalizados). Diante de um possível 404, a rota de página do B1App resolve o caminho em `GET /content/redirects/public/:churchId` e emite um HTTP 308 pelo `permanentRedirect` do Next; caminhos sem correspondência seguem para `notFound()` |
| 404 personalizado | `not-found.tsx` renderiza o `BrandedNotFound` com o logotipo, o nome e o tema da igreja, em vez de um erro genérico. Caminhos desconhecidos `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` e `/volunteer/[planId]` retornam um 404 de verdade, assim como subdomínios desconhecidos e slugs de página malformados (veja [Roteamento de Sites e Multi-Site](./websites)) |
| Dados estruturados | JSON-LD `BlogPosting` nas postagens do blog; `VideoObject` nas páginas de cada sermão (`/{sdSlug}/sermons/[sermonId]`) e em páginas que contenham um elemento `sermons`; `Event` a partir dos elementos de calendário/evento nas páginas do construtor e em cada página `/{sdSlug}/events/[eventId]` (próxima ocorrência, com a foto do evento como `image`); `Event` do schema.org a partir do elemento `serviceTimes` |
| Páginas de sermões | Cada sermão público recebe uma página rastreável em `/sermons/[sermonId]`, com metadados completos -- os sermões não ficam mais presos dentro do elemento de navegação do lado do cliente |
| Analytics | A configuração pública `ga4MeasurementId` (gerenciada junto aos redirecionamentos no B1Admin) injeta um gtag GA4 por igreja via `next/script`. O aplicativo B1 (`/{sdSlug}/mobile`) também envia suas visualizações de página para esse ID, junto com a tag própria do ChurchApps, quando é um ID `G-` válido (IDs de contêiner do GTM ficam somente no site). Cada `gtag('config')` leva um `display_mode` de `installed` ou `browser`, com base em `navigator.standalone` ou na media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap e feeds | A rota `sitemap.xml` por igreja inclui as páginas do construtor, as URLs do blog e as 50 páginas de sermões mais recentes (com `<lastmod>` a partir da data de publicação de cada sermão). Também lista as páginas embutidas `/sermons`, `/groups` e `/volunteer` quando têm conteúdo (grupos públicos, planos de inscrição), a menos que um redirecionamento salvo substitua esse caminho. `/` fica de fora quando a igreja não tem página inicial, já que `/` então redireciona para `/mobile`, que é proibido. A listagem do blog anuncia o feed RSS |
| Acessibilidade | A estrutura pública renderiza um link de pular para o marco `<main id="main-content">` em todos os wrappers de layout |

## Geração por IA (AskApi)

A geração de páginas e sites roda no **AskApi**, um serviço separado, sob o controlador `/website`. Ele se autentica com o mesmo JWT `CustomAuthProvider` de todo o resto e é **sem estado em relação ao conteúdo**: todo endpoint retorna JSON, e quem chama (o B1Admin) persiste o resultado pelo ContentApi (`POST /content/pages/importTree` cria uma página com toda a sua árvore aninhada de seções e elementos em uma só chamada; ele sempre insere sob a igreja de quem chama e ignora os IDs do corpo).

### Geração de página (`planPage` → `writePage`)

O template "IA" do `AddPageModal` do B1Admin usa um pipeline de baixo custo (`AskApi/src/helpers/SiteGenHelper.ts`) construído sobre uma regra: **nenhum modelo emite JSON do construtor**. Dois modelos dividem o trabalho pelo Vercel AI Gateway (HTTP simples, chave no SSM `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — um modelo de decisão tipado que retorna escolhas, pontuações e booleanos com probabilidades, mas não consegue escrever texto. Ele escolhe cada seção por vez a partir de uma biblioteca fixa de templates, pontua layouts, verifica fatos do texto e escolhe fotos de banco de imagens e ícones. O custo de entrada é de cerca de US$ 0,04 por milhão de tokens e a saída é gratuita, então ~90 chamadas por página custam uma fração de centavo.
- **Um modelo de chat pequeno (GPT-4.1 mini por padrão)** — preenche os espaços de texto nomeados e com limite de tamanho dos templates escolhidos. O redator é uma constante, sobrescrevível pela variável de ambiente `SITEGEN_COPY_MODEL` (qualquer ID de modelo de chat no gateway, por exemplo `anthropic/claude-haiku-4.5`). Em uma comparação cega lado a lado com três igrejas, o Claude Haiku 4.5 soou um pouco mais caloroso, mas o GPT-4.1 mini ficou próximo, cerca de 4 vezes mais barato e mais rápido, então é o padrão. Uma página completa com os três layouts custa cerca de 1,3 centavo, sendo cerca de 80% dele o redator.

| Fase | Endpoint | O que acontece |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classifica o tipo de página (início, visita, sobre…), depois amostra 10 layouts candidatos pelas probabilidades por rodada do JEV (herói + número de seções → cada seção → encerramento), remove duplicatas, faz o JEV pontuar cada um quanto a adequação/fluxo/lacunas e retorna os 3 melhores, além de uma voz de escrita e um `suggestedStyle` (paleta + fontes). Candidatos que compartilham as mesmas seções até aqui fazem ao JEV uma pergunta idêntica, então as rodadas são memorizadas por prefixo. Uma melhor pontuação abaixo de 6 é registrada como `lowLayoutScore` -- esse registro é o backlog de templates que valem ser adicionados. ~2s |
| 2 | `POST /website/writePage` (uma chamada por candidato) | O redator preenche o texto dos espaços duas seções por chamada, em paralelo, e retorna cinco títulos de herói entre os quais o JEV escolhe; o JEV verifica os fatos de cada seção; seções que falham, usam uma frase feita ou repetem uma seção anterior (sequências compartilhadas de 4 palavras, verificadas no código) são reescritas em paralelo com o motivo específico; uma limpeza no código remove frases com jargão genérico de sites de igreja (a menos que a descrição da própria igreja use esses termos); o JEV escolhe os temas das fotos, os ícones e o divisor de forma do herói, e pontua o resultado. Retorna uma árvore de seções pronta para salvar e uma pontuação. ~6–9s |
| 3 | `POST /content/pages/importTree` | O B1Admin grava apenas o layout melhor classificado (o segundo colocado é um plano B caso essa gravação falhe), salva e abre a prévia (~10s após Salvar) |

Cada fase é uma requisição própria, para que cada chamada fique dentro do limite de 29 segundos do API Gateway. Os templates em `SiteGenHelper.buildTree` são árvores fixas de seções e elementos do catálogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e referenciam tokens de tema (`var(--accent)`, `var(--lightAccent)`…), então as páginas geradas herdam as configurações de aparência já existentes da igreja. Adicionar um template de seção significa adicionar sua lista de espaços em `SECTIONS` e sua árvore em `buildTree`; o teste unitário percorre todos os templates e valida a árvore.

**Entradas.** O texto só pode afirmar fatos de duas fontes: o que o usuário digitou e `churchContext.facts` -- registros que o B1Admin reúne antes do planejamento (horários públicos de culto e nomes públicos de grupos, além do nome e do endereço da igreja). As mesmas flags controlam os templates com dados: `times` renderiza o elemento `serviceTimes` ao vivo quando a igreja mantém os horários de culto no B1 (ou uma tabela digitada, caso contrário), e `groups` e `countdown` só são oferecidos quando há dados por trás deles. As chamadas ao JEV são protegidas -- uma duplicata dispara após 1,5s e a primeira resposta vence --, porque o gateway ocasionalmente trava e as chamadas são quase gratuitas.

**Manter-se no assunto.** O pedido do usuário é o *assunto da página*, e não um contexto sobre a igreja. O `planPage` classifica o pedido (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e para páginas `event` e `topic` os templates gerais de igreja (nota do pastor, sermões, ministérios, grupos, impacto comunitário, horários semanais e contagem regressiva, herói com vídeo) nem chegam a ser oferecidos, enquanto `details` (quando / onde / o que levar) e um `eventCountdown` de data são. Ambos os juízes pontuam se o conteúdo está no assunto. O B1Admin passa o `pageType` do plano em cada chamada de `writePage`.

**Páginas completas a partir de pedidos curtos.** As páginas têm de três a seis seções intermediárias, comprimentos generosos de espaço, uma linha de introdução nas seções de cartões e um FAQ de cinco perguntas, e a passada de reparo expande qualquer seção que volte pobre. A geração é um clique: não há perguntas de acompanhamento. Quando o pedido deixa de fora um detalhe comum que uma página completa precisa (um horário de início, uma sala, o que levar, como se inscrever), o redator preenche com uma escolha plausível e modesta para a igreja editar. Como as seções são escritas em paralelo, essas lacunas são decididas **uma única vez**, no `planPage` (`assumedDetails`, uma pequena chamada de redator que roda junto com a amostragem de layouts), e repassadas a cada chamada de `writePage` por `churchContext.assumedDetails`, para que uma seção não diga 17h00 enquanto outra diz 17h30. O JEV repara qualquer seção que contradiga o pedido, os registros da igreja ou esses detalhes decididos. Os detalhes decididos não aparecem na interface; a igreja revisa e edita a página como qualquer outra. Algumas coisas nunca são inventadas: nomes de pessoas, telefones, e-mails e endereços web, preços, estatísticas, a história da igreja, citações atribuídas a pessoas e um dia da semana para uma data que o pedido não informou.

**Recursos visuais.** Os templates nunca nomeiam suas fotos ou ícones. Eles deixam espaços abertos, e uma passada genérica (`visualSlots` → `pickVisuals` → `applyVisuals` em `SiteGenHelper`) percorre a árvore pronta e preenche todos: um fundo de seção ou uma entrada de galeria marcada com `auto:photo`, um `auto:icon`, o `auto:divider` do herói e, sem nenhuma marcação, qualquer elemento `textWithPhoto`, `card` ou `image` cuja `photo` esteja vazia. O JEV escolhe cada um a partir do texto ao lado (a foto de um cartão a partir do título e do texto daquele cartão; um fundo a partir do texto da seção), sem repetir nenhum assunto em uma página. Assim, um template novo ganha fotos de graça. As fotos são termos de busca do Pexels emitidos como placeholders `pexels:<term>` que o B1Admin resolve por `POST /content/stock/search`; um cliente que não envia `resolvesPhotos` recebe uma imagem de herói embutida, faixas de cor sólida e cartões sem foto. Propositalmente não há temas de retratos, e o template do pastor não tem foto: um estranho de banco de imagens nunca deve ocupar o lugar de uma pessoa real. Para uma igreja sem páginas ainda, o B1Admin aplica o `suggestedStyle` aos estilos globais; sites existentes mantêm a aparência.

### Outros endpoints

:::info
O botão de reescrita do `SectionToolbar` e o botão "Gerar site" da lista de páginas no B1Admin continuam comentados no lado do cliente. Os endpoints do AskApi abaixo continuam respondendo; só a interface está oculta.
:::

| Endpoint | Finalidade |
|----------|----------|
| `POST /website/generatePageOutline` → `generateSection` | O fluxo original de página em duas etapas (esboço e, depois, uma chamada de LLM por seção emitindo JSON de elemento). Substituído no B1Admin por `planPage`/`writePage` por causa do custo; mantido para consumidores da API |
| `POST /website/generateSite` | Geração do site inteiro. **Em duas fases por design**: uma chamada com `planOnly: true` retorna só o plano de múltiplas páginas (uma chamada rápida ao modelo), depois o cliente pede o conteúdo completo -- mantendo cada requisição dentro do timeout do Lambda/API Gateway |
| `POST /website/rewriteSection` | Reescrita que preserva a estrutura: o modelo só pode alterar respostas com texto. Uma assinatura recursiva da estrutura (IDs + tipos + ordem) é comparada antes e depois; qualquer divergência retorna a seção original com `fallback: true`, em vez de uma estrutura corrompida |
| `POST /website/generateAltText` | Chamada de visão sobre até 20 URLs de imagem; retorna um texto alternativo conciso (≤125 caracteres, sem prefixos "foto de") |
| `POST /website/generateMetaDescription` | Uma meta descrição de SEO (≤155 caracteres) a partir do texto da página -- ligada ao botão Gerar das configurações de página do B1Admin |

Os prompts desses endpoints são arquivos markdown em `AskApi/config/instructions/`, incluindo o catálogo de elementos a partir do qual o modelo gera. Dois pontos de projeto mantêm o catálogo honesto: o cliente passa `availableElementTypes` em toda requisição (o prompt só pode usar tipos dessa lista -- o servidor nunca escreve o conjunto completo no código), e a ferramenta MCP `describe_page_builder` da API carrega o mesmo guia para agentes de IA que trabalham pelo [MCP](../api/mcp). Os modelos são Anthropic Claude via OpenRouter -- 3.5 Haiku para o conteúdo das seções (latência), 3.5 Sonnet para esboços, planos de site e visão -- com um fallback para OpenAI quando nenhuma chave do OpenRouter está configurada.

## Formulários conversacionais

Os formulários (módulo de membership) ganharam um modo conversacional, voltado para páginas no estilo de cartão de conexão. Quatro colunas em `forms` o controlam: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderização** — o `FormSubmissionEdit` do apphelper troca para o componente `ConversationalForm` (uma pergunta por vez) quando `displayMode` é `conversational`; a página de formulário do B1App repassa o modo. O payload de envio é o mesmo nos dois casos.
- **Criação automática de pessoa** — no envio com `autoCreatePerson` definido, `ConversationalFormHelper.findOrCreatePerson` deduplica pelo e-mail (sem diferenciar maiúsculas de minúsculas) e, caso contrário, cria uma família e uma pessoa com `membershipStatus: "Guest"`, depois vincula o envio a essa pessoa.
- **E-mail de acompanhamento** — quando um assunto e um corpo estão definidos, quem enviou recebe um e-mail com modelo (com os tokens `{firstName}` / `{churchName}`) pelo caminho transacional existente (`TransactionalEmailHelper`), nunca pela porta do resumo de notificações. Ambos os efeitos colaterais não são fatais: uma falha nunca perde o envio.

Os quatro campos são definidos hoje pela API; o editor de formulários do B1Admin ainda não os expõe.

## Cache do site público

O caminho de renderização pública do B1App armazena em cache as buscas marcadas com a igreja (`next: { revalidate: 300, tags: [sdSlug] }` em produção; `0` em desenvolvimento), então uma página ao vivo pode ficar desatualizada por até cinco minutos depois de uma escrita no ContentApi. `POST /api/revalidate/{sdSlug}` no B1App chama `revalidateTag(sdSlug)` e é a única forma de descartar esse cache antes do prazo.

Dois autores acionam esse cache:

1. **B1Admin** — `clearSiteCache()` em `B1Admin/src/site/siteCache.ts` faz um POST após as gravações do editor. Ele prefere o subdomínio do site ativo (um site secundário precisa invalidar *aquela* tag, e não a da igreja padrão).
2. **Api** — mutações de conteúdo que nunca passam pelo B1Admin (chaves de API, MCP, IA) disparam `SiteCacheHelper.bump(churchId)` a partir dos controladores de conteúdo. O auxiliar resolve o subdomínio da igreja via `SubDomainHelper` e faz um POST em `{b1AppRoot}/api/revalidate/{sd}`. Falhas são silenciosamente ignoradas, para que um B1App inacessível nunca faça uma gravação falhar.

Controladores que disparam o bump: páginas (salvar, excluir, duplicar, publicar, descartar, despublicar, IA temporária), seções, elementos, blocos, links, estilos globais, postagens e redirecionamentos. O `b1AppRoot` de desenvolvimento é `http://{subdomain}.localtest.me:3301`; demo e produção usam `https://{subdomain}.b1.church`.

## Páginas Relacionadas

- [Roteamento de Sites e Multi-Site](./websites) — como uma requisição é resolvida para uma igreja/site e como os domínios personalizados são roteados
- [Endpoints de Content](../api/endpoints/content) — superfície REST completa para páginas, seções, elementos, blocos, postagens, redirecionamentos e configurações
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que traz os renderizadores, o registro, os divisores e os widgets
- [Servidor MCP](../api/mcp) — incluindo a ferramenta de guia `describe_page_builder`
- [Editor de páginas (usuário final)](/docs/b1-admin/website/page-editor) — a documentação do editor para a equipe
