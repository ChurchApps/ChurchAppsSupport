---
title: "Arquitetura do criador de sites"
---

# Arquitetura do criador de sites

<div class="article-intro">

Cada site de igreja servido pelo B1App é renderizado a partir de uma árvore de conteúdo — páginas, seções, elementos — armazenada no ContentApi e editada visualmente no B1Admin. Uma biblioteca de componentes compartilhada renderiza tanto a prévia do editor quanto o site ao vivo, um catálogo de tipos de elemento define o que pode aparecer em uma página, e um serviço de IA separado pode gerar ou reescrever essa árvore. Esta página mapeia a pilha inteira: o contrato de elementos em `@churchapps/helpers`, o pipeline de renderização, os elementos com dados da igreja, os widgets de todo o site, a camada de blog, as páginas com controle de acesso, SEO, geração por IA e formulários conversacionais.

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

Três regras valem para toda a pilha:

1. **Uma árvore, dois renderizadores.** Uma página é uma árvore `pages → sections → elements` em que cada nó carrega suas configurações como um JSON `answers`. Os mesmos componentes do apphelper renderizam o editor de arrastar e soltar no B1Admin e o site público renderizado no servidor, no B1App — não existe um "formato de publicação" separado.
2. **O contrato fica em `@churchapps/helpers`.** `ElementTypes.ts` é o catálogo único de tipos de elemento; os renderizadores são resolvidos por um registro no apphelper; os formulários de edição ficam no B1Admin. Adicionar um tipo de elemento exige mexer nos três, nessa ordem.
3. **O site público lê endpoints anônimos.** Tudo o que o B1App precisa — a árvore da página, as configurações, as postagens do blog, os redirecionamentos e os endpoints de dados da igreja em outros módulos — é público. A autenticação é opcional: um JWT no endpoint anônimo da árvore libera páginas exclusivas para membros, e nada mais muda.

## A árvore de conteúdo

O módulo de conteúdo (`Api/src/modules/content`) é dono dos dados do criador:

| Tabela | Papel |
|--------|-------|
| `pages` | Uma página por URL: `url`, `title`, `layout`, além de `visibility`/`groupIds` (controle de acesso) e `metaDescription` (SEO) |
| `sections` | Faixas horizontais em uma página (ou em um bloco): fundo, cor do texto e um `answersJSON` que carrega o estilo mais as configurações de divisor de forma `dividerTop`/`dividerBottom` |
| `elements` | Peças de conteúdo dentro de uma seção: `elementType` + `answersJSON`, aninháveis para tipos de layout (linha/coluna, carrossel) |
| `blocks` | Grupos reutilizáveis de seções/elementos (blocos de rodapé, blocos de elementos) compartilhados entre páginas |
| `posts` | Postagens de blog independentes (veja [Blog](#blog)) |
| `redirects` | Pares `fromPath → toPath` por igreja, limitados a 200 (veja [SEO](#seo-and-discoverability)) |
| `settings` | Configurações da igreja em chave-valor; as linhas marcadas como `public` são servidas anonimamente e carregam a configuração dos widgets/analytics |

A árvore inteira de uma URL volta em uma única chamada anônima — `GET /content/pages/:churchId/tree?url=/about` — e é a partir dela que o B1App renderiza no servidor. As requisições do editor buscam por id, e mantêm os ids internos.

## O contrato de elementos

### O catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como um `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e um `answersSchema` no estilo JSON Schema para as respostas. `validateElementAnswers()` é propositalmente tolerante — tipos desconhecidos e chaves extras passam, de modo que conteúdo antigo nunca quebra com uma atualização do catálogo. **Hoje são distribuídos 35 tipos:**

| Categoria | Tipos de elemento |
|-----------|-------------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

O elemento `sermons` é o mais configurável dos tipos de igreja: uma resposta `layout` escolhe `browse` (o navegador completo legado), `grid`, `list` ou `featuredLatest`, com `playlistId`, `itemCount`, `showTitles` e `showDates` refinando os layouts que não são o navegador.

O elemento `rawHTML` tem duas respostas: `rawHTML` (marcação) e `javascript`. Scripts inseridos por `innerHTML` nunca são executados, então `RawHTMLElement` recria cada nó `<script>` da marcação como um elemento novo. Esses nós não inseridos pelo parser são confiáveis sob o `strict-dynamic` da CSP. Uma resposta `javascript` que começa com `<` (um trecho de fornecedor colado com as tags `<script>`) é interpretada como marcação e recebe o mesmo tratamento. Caso contrário, roda como um script inline simples. O B1Admin sinaliza uma URL solta na caixa de JavaScript, já que uma URL isolada roda como um script sem efeito. O elemento `map` não renderiza nada e não carrega nenhum script do Google Maps quando não há uma chave de API do Maps configurada.

### Renderizadores (`@churchapps/apphelper`)

Os renderizadores ficam em `Packages/apphelper/src/website/components/elementTypes/`, um componente por tipo, resolvidos por `ElementRegistry.ts` — um mapa de duas camadas em que `Element.tsx` registra o renderizador padrão dos 35 tipos (`registerDefaultElementRenderer`), e um app hospedeiro pode substituir qualquer um deles em tempo de execução (`registerElementRenderer`) sem fazer um fork do pacote.

### Formulários de edição (B1Admin)

Os formulários de configuração por tipo do editor ficam em `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` despacha para um componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou para um construtor de campos embutido por tipo. O espelho voltado para IA deste catálogo é a ferramenta MCP `describe_page_builder` da API (veja [Servidor MCP](../api/mcp)).

A prévia do editor monta o mesmo `Theme` do site ao vivo, que define as variáveis CSS `--headingFont` / `--bodyFont` a partir dos estilos globais da igreja. O B1App aplica essas variáveis pelo `pages.css`, que o B1Admin não consegue importar; por isso `ContentEditor.tsx` injeta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) para aplicá-las ao texto do corpo `.page` e aos `h1`–`h6`. Sem isso, a prévia mostrava os títulos na fonte do admin.

### Divisores de forma das seções

As seções podem ter divisores decorativos de forma em qualquer uma das bordas. A configuração fica no `answersJSON` da seção, como os objetos `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }`, com `shape` sendo um de `wave, waves, slant, curve, triangle, peaks`. O apphelper traz o componente `SectionDivider` e o auxiliar `parseDividerConfig()`; os renderizadores de seção dos dois apps (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) leem as respostas e montam o divisor, e o `SectionEdit.tsx` do B1Admin fornece o seletor. Os pacotes trazem apenas o bloco de construção — a ligação no nível da seção é trabalho dos apps que os consomem.

## Elementos com dados da igreja

Três tipos de elemento renderizam dados reais da igreja em vez de conteúdo escrito. O isolamento entre módulos continua valendo — cada um chama o endpoint público do próprio módulo dono a partir do navegador:

| Elemento | Endpoint | Observações |
|----------|----------|-------------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retorna `{ fundId, totalAmount, donationCount }`, com janela opcional `?startDate=&endDate=`; o elemento compara o valor com sua resposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Somente por adesão**: o grupo precisa ter `publicRoster` ativado (padrão desligado). A projeção é propositalmente mínima — `personId`, `displayName`, `leader`, foto — sem campos de contato ou demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retorna a árvore campus → culto → horário; o renderizador do apphelper gera, com o melhor esforço possível, JSON-LD `Event` do schema.org a partir dela (a API retorna apenas dados) |

:::warning
`publicRoster` é o portão de privacidade do `staffGrid`. Nunca amplie a projeção pública dos membros do grupo nem contorne a flag — o endpoint da lista é anônimo por desenho, e a lista mínima de campos é a propriedade de segurança.
:::

### Elemento de calendário e páginas de evento

As respostas do elemento `calendar` são `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, o padrão, ou `upcoming`) e `tag`. O B1App sobrescreve o renderizador do apphelper em `src/components/Element.tsx` com `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderiza o `UpcomingEventsElement` do B1App: ele carrega `GET /content/events/public/group/:churchId/:groupId` ou `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, expande as recorrências com `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, uma ocorrência por evento dentro de um ano) e mostra os primeiros 12 como blocos com foto (`events.photoUrl`, com o título sobre a cor escura do tema como alternativa), com link para `/events/{id}`, além de um menu Assinar para o feed ICS do calendário.
- **`display: "month"`** renderiza o `CalendarElement` do apphelper com um callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` então navegam para essa URL ao clicar, em vez de abrir a janela de detalhes (o B1Admin não passa `eventUrl`, então o calendário administrativo mantém a janela).
- **`tag`** filtra as duas exibições com `EventHelper.hasTag()` (`@churchapps/helpers`): uma comparação sem diferenciar maiúsculas com `events.tags` separado por vírgulas; vazio mostra tudo. A junção do calendário selecionado seleciona `e.tags` para que os eventos selecionados as carreguem.

Eventos selecionados são linkados por `realEventId` (`eventPageId()`), de modo que a URL sempre aponta para o evento real subjacente. `/{sdSlug}/events/[eventId]` é uma rota dedicada (não o pipeline do criador): ela carrega `GET /content/events/public/:churchId/:id` — que retorna `null` para eventos pendentes/rejeitados e para eventos privados sem inscrição, e acrescenta `roomNames` das reservas de salas não rejeitadas — renderiza o `EventPageContent` (destaque com foto, descrição em markdown, lateral Quando/Onde, **Inscrever-se neste evento** quando `registrationEnabled`, e um link **Adicionar ao meu calendário** para `GET /content/events/public/:churchId/:id/ical`), usa a foto como imagem do Open Graph e emite JSON-LD `Event` da próxima ocorrência pelo `EventPageJsonLd`. Um evento desconhecido ou oculto retorna um 404 de verdade.

## Widgets de todo o site

Dois widgets são renderizados em todas as páginas públicas, fora da árvore: **AnnouncementBanner** (barra fixa no topo, que pode ser dispensada) e **Launcher** (central flutuante de ações para links no estilo doar/visitar/assistir). Ambos os componentes e seus auxiliares `parse*Config()` ficam no apphelper. A configuração são duas linhas públicas de configuração — as chaves `announcementBanner` e `launcher` — gravadas pelo `SiteWidgetsEdit` do B1Admin (na página Aparência) e lidas pelo layout público do B1App por `GET /content/settings/public/:churchId`. A API trata esses valores como pares chave-valor opacos; os nomes das chaves são uma convenção entre os dois apps.

## Blog {#blog}

O blog é um tipo de conteúdo independente, e não uma camada sobre as páginas do criador. Uma linha de `posts` guarda a postagem inteira: `title`, `slug`, `excerpt`, `content` (corpo em markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. A superfície pública (toda anônima, `PostController`):

| Rota | Finalidade |
|------|------------|
| `GET /content/posts/public/:churchId` | Postagens publicadas, filtráveis por `?category=&tag=`, com paginação |
| `GET /content/posts/public/:churchId/categories` | Categorias distintas entre as postagens publicadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Uma postagem publicada |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, com o nome da igreja no título, e para cada item a categoria e a descrição (resumo ou conteúdo) |

Uma postagem fica "publicada" quando `publishDate` está definida e já passou; uma `publishDate` futura é uma postagem agendada (oculta do público, exibida com um selo Agendada no admin). Os endpoints de leitura enriquecem cada postagem com `authorName`, resolvido a partir de `authorId` pelo gateway do módulo de membership. Resumos ausentes recorrem ao conteúdo em markdown sem formatação (~160 caracteres) nos cartões de listagem, nas meta descrições e no RSS. O B1App serve `/{sdSlug}/blog` — uma listagem editorial (cabeçalho centralizado que vira o nome da categoria/tag ativa quando filtrado, linha de chips de categoria, linhas de postagem com miniatura à esquerda, assinatura e resumo), com o feed RSS anunciado como link alternativo — e `/{sdSlug}/blog/[postSlug]`, uma rota dedicada (não o pipeline Zona/Seção), com cabeçalho centralizado (rótulo da categoria, título, assinatura, régua de destaque na cor primária), um destaque 16:9 na largura do contêiner, o corpo em markdown em uma coluna de leitura de cerca de 720 px, chips de tags no rodapé do artigo, uma faixa `"More in {category}"` com postagens relacionadas e JSON-LD `BlogPosting` incluindo o autor. Ambas as páginas usam apenas os tokens do tema, então herdam a paleta de cada igreja. As URLs do blog entram no sitemap de cada igreja. A área de autoria do B1Admin (**Site → Blog**) edita as postagens em uma janela: editor de markdown com alternância de prévia, seletor de imagem da galeria recortada em 16:9, seletor de pessoa como autor (padrão: o usuário que está editando), preenchimento automático de categoria a partir das categorias existentes, validação de slug duplicado e um interruptor de publicação; as linhas publicadas linkam para a postagem ao vivo, e a página sugere aos administradores que adicionem um link de navegação para `/blog`. Os comentários ficam com serviços de terceiros: uma configuração pública de conteúdo da igreja, `blogFooterHtml` (editada em **Abaixo de cada postagem** na página do Blog, visível somente com Configurações → Editar), é renderizada abaixo de cada postagem pelo `BlogFooterEmbed` do B1App, que recria as tags `<script>` para que sejam executadas sob `'strict-dynamic'` e as roda em ordem (um `src` externo termina de carregar antes que o próximo script inline rode), já que trechos de fornecedores carregam uma biblioteca e depois a chamam.

## Páginas exclusivas para membros

`pages.visibility` reaproveita o enum dos links de navegação — `everyone` (padrão), `visitors`, `members`, `staff`, `team`, `groups` (com `groupIds`) — mas como um **portão de acesso rígido**, e não como um filtro de navegação (`PageVisibilityHelper.canViewPage`). O fluxo:

1. O endpoint anônimo da árvore verifica a visibilidade nas buscas por URL. Chamadores anônimos de uma página com controle recebem `{ restricted: true, visibility }` em vez do conteúdo — a árvore nunca vaza.
2. O endpoint ainda respeita um JWT: o `CustomAuthProvider` verifica o cabeçalho `Authorization` em *toda* requisição, inclusive nas rotas anônimas, então a busca de um membro autenticado pela mesma URL é resolvida normalmente.
3. O B1App renderiza o `RestrictedPage` em uma resposta `restricted`: ele hidrata a sessão a partir das credenciais salvas, busca novamente a árvore com o JWT e a renderiza — ou mostra uma tela de login com um `returnUrl` quando não há sessão.

:::info
A granularidade do portão varia conforme o nível: `groups` confere os `groupIds` do token com a lista da página, e `staff` confere o `membershipStatus`, mas `members` e `team` hoje aceitam qualquer usuário autenticado da igreja. Trate `groups` como a opção estrita.
:::

## SEO e descoberta {#seo-and-discoverability}

Tudo isso é renderização no lado do B1App sobre os dados do ContentApi — a API armazena, o app emite:

| Tema | Como funciona |
|------|---------------|
| Meta descrições | `pages.metaDescription` (≤300 caracteres) passa por `MetaHelper.getMetaData()` para o `Metadata` do Next.js (descrição + Open Graph) em toda rota renderizada pelo criador. As configurações de página do B1Admin incluem um botão "Gerar" de IA (veja abaixo) |
| Redirecionamentos | Linhas `redirects` por igreja, gerenciadas em `/content/redirects` (`content.edit`, limite de 200 linhas, caminhos normalizados). Diante de um possível 404, a rota de página do B1App resolve o caminho em `GET /content/redirects/public/:churchId` e emite um HTTP 308 pelo `permanentRedirect` do Next; caminhos sem correspondência seguem para `notFound()` |
| 404 com identidade visual | `not-found.tsx` renderiza o `BrandedNotFound` com o logotipo, o nome e o tema da igreja, em vez de um erro genérico. Caminhos desconhecidos em `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` e `/volunteer/[planId]` retornam um 404 de verdade, assim como subdomínios desconhecidos e slugs de página malformados (veja [Roteamento de sites e multi-site](./websites)) |
| Dados estruturados | JSON-LD `BlogPosting` nas postagens do blog; `VideoObject` nas páginas de cada sermão (`/{sdSlug}/sermons/[sermonId]`) e nas páginas que contêm um elemento `sermons`; `Event` a partir dos elementos de calendário/evento nas páginas do criador e em cada página `/{sdSlug}/events/[eventId]` (próxima ocorrência, com a foto do evento como `image`); `Event` do schema.org a partir do elemento `serviceTimes` |
| Páginas de sermão | Cada sermão público recebe uma página rastreável em `/sermons/[sermonId]` com metadados completos — os sermões não ficam mais presos dentro do navegador do lado do cliente |
| Analytics | A configuração pública `ga4MeasurementId` (gerenciada junto aos redirecionamentos no B1Admin) injeta um gtag GA4 por igreja via `next/script`. O app do B1 (`/{sdSlug}/mobile`) também envia suas visualizações de página para esse ID, junto com a tag própria do ChurchApps, quando é um ID `G-` válido (IDs de contêiner do GTM ficam somente no site). Cada `gtag('config')` leva um `display_mode` de `installed` ou `browser`, com base em `navigator.standalone` ou na media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap e feeds | A rota `sitemap.xml` de cada igreja inclui as páginas do criador, as URLs do blog e as 50 páginas de sermão mais recentes (com `<lastmod>` a partir da data de publicação de cada sermão). Também lista as páginas embutidas `/sermons`, `/groups` e `/volunteer` quando têm conteúdo (grupos públicos, planos de inscrição), a menos que um redirecionamento salvo substitua esse caminho. `/` fica de fora quando a igreja não tem página inicial, pois `/` então redireciona para o `/mobile`, que não é permitido. A listagem do blog anuncia o feed RSS |
| Acessibilidade | A estrutura pública renderiza um link de pular para o marco `<main id="main-content">` em todo wrapper de layout |

## Geração por IA (AskApi)

A geração de páginas e de sites roda no **AskApi**, um serviço separado, sob o controller `/website`. Ele se autentica com o mesmo JWT do `CustomAuthProvider` de tudo o mais e é **sem estado em relação ao conteúdo**: todo endpoint retorna JSON e quem chama (o B1Admin) grava o resultado pelo ContentApi (`POST /content/pages/importTree` cria uma página com toda a sua árvore aninhada de seções/elementos em uma única chamada; ela sempre insere na igreja de quem chama e ignora os ids do corpo).

### Geração de página (`planPage` → `writePage`)

O modelo "IA" de página do `AddPageModal` do B1Admin usa um pipeline de baixo custo (`AskApi/src/helpers/SiteGenHelper.ts`) construído sobre uma regra: **nenhum modelo emite JSON do criador**. Dois modelos dividem o trabalho pelo Vercel AI Gateway (HTTP simples, chave no SSM `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — um modelo de decisão tipada que retorna escolhas, pontuações e booleanos com probabilidades, mas não consegue escrever texto. Ele escolhe cada seção em sequência a partir de uma biblioteca fixa de modelos, pontua layouts, verifica os fatos do texto e escolhe fotos e ícones de banco de imagens. O custo de entrada é cerca de US$ 0,04 por milhão de tokens e a saída é gratuita, então cerca de 90 chamadas por página custam uma fração de centavo.
- **Um modelo de chat pequeno (GPT-4.1 mini por padrão)** — preenche os espaços de texto nomeados e com limite de tamanho dos modelos escolhidos. O redator é uma constante, substituível pela variável de ambiente `SITEGEN_COPY_MODEL` (qualquer id de modelo de chat no gateway, por exemplo `anthropic/claude-haiku-4.5`). Em um teste cego lado a lado com três igrejas, o Claude Haiku 4.5 soou um pouco mais caloroso, mas o GPT-4.1 mini ficou próximo, cerca de 4 vezes mais barato e mais rápido, por isso é o padrão. Uma página completa com os três layouts custa cerca de 1,3 centavo, sendo cerca de 80% do custo o redator.

| Fase | Endpoint | O que acontece |
|------|----------|----------------|
| 1 | `POST /website/planPage` | Classifica o tipo da página (início, visita, sobre…), depois amostra 10 layouts candidatos a partir das probabilidades por rodada do JEV (destaque + número de seções → cada seção → encerramento), remove duplicatas, faz o JEV pontuar cada um quanto a adequação/fluxo/lacunas, e retorna os 3 melhores, além de uma voz de escrita e um `suggestedStyle` (paleta + fontes). Candidatos que compartilham as mesmas seções até agora fazem ao JEV uma pergunta idêntica, então as rodadas são memorizadas por prefixo. Uma melhor pontuação abaixo de 6 é registrada como `lowLayoutScore` — esse registro é o backlog de modelos que valem a pena acrescentar. ~2 s |
| 2 | `POST /website/writePage` (uma chamada por candidato) | O redator preenche o texto dos espaços duas seções por chamada, em paralelo, e retorna cinco títulos de destaque entre os quais o JEV escolhe; o JEV verifica os fatos de cada seção; seções que falham, usam uma frase genérica ou repetem uma seção anterior (sequências de 4 palavras compartilhadas, verificadas no código) são reescritas em paralelo com o motivo específico; uma limpeza no código remove frases com jargão genérico de sites de igreja (a menos que a própria descrição da igreja use essas frases); o JEV escolhe os temas das fotos, os ícones e o divisor de forma do destaque, e pontua o resultado. Retorna uma árvore de seções pronta para salvar e uma pontuação. ~6–9 s |
| 3 | `POST /content/pages/importTree` | O B1Admin grava somente o layout mais bem classificado (o segundo colocado é um reserva caso essa gravação falhe), salva e abre a prévia (~10 s após Salvar) |

Cada fase é uma requisição própria para que cada chamada fique dentro do limite de 29 segundos do API Gateway. Os modelos de `SiteGenHelper.buildTree` são árvores fixas de seções + elementos do catálogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e referenciam tokens do tema (`var(--accent)`, `var(--lightAccent)`…), de modo que as páginas geradas herdam as configurações de aparência já existentes da igreja. Adicionar um modelo de seção significa acrescentar sua lista de espaços em `SECTIONS` e sua árvore em `buildTree`; o teste unitário percorre cada modelo e valida a árvore.

**Entradas.** O texto só pode afirmar fatos de duas fontes: o que o usuário digitou e `churchContext.facts` — registros que o B1Admin reúne antes do planejamento (horários de culto públicos e nomes de grupos públicos, além do nome e do endereço da igreja). As mesmas flags controlam os modelos baseados em dados: `times` renderiza o elemento `serviceTimes` ao vivo quando a igreja mantém os horários de culto no B1 (caso contrário, uma tabela digitada), e `groups` e `countdown` só são oferecidos quando há dados por trás deles. As chamadas ao JEV são protegidas: uma duplicata dispara após 1,5 s e a primeira resposta vence, porque o gateway ocasionalmente trava e as chamadas são quase gratuitas.

**Mantendo o assunto.** O pedido do usuário é o *assunto da página*, e não um pano de fundo sobre a igreja. `planPage` classifica o pedido (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e para páginas `event` e `topic` os modelos gerais de igreja (nota do pastor, sermões, ministérios, grupos, impacto comunitário, horários semanais e contagem regressiva, destaque com vídeo) nem são oferecidos, enquanto `details` (quando / onde / o que trazer) e uma `eventCountdown` com data são. Ambos os juízes pontuam a aderência ao assunto. O B1Admin passa o `pageType` do plano em cada chamada de `writePage`.

**Páginas completas a partir de pedidos curtos.** As páginas têm de três a seis seções intermediárias, espaços generosos para o texto, uma linha de introdução nas seções de cartões e um FAQ de cinco perguntas, e a passagem de correção expande qualquer seção que volte rasa. A geração é um clique: não há perguntas de acompanhamento. Quando o pedido deixa de fora um detalhe comum que uma página completa precisa (um horário de início, uma sala, o que trazer, como se inscrever), o redator preenche com uma escolha plausível e modesta, para a igreja editar. Como as seções são escritas em paralelo, essas lacunas são decididas **uma única vez**, em `planPage` (`assumedDetails`, uma pequena chamada de redator que roda junto com a amostragem de layouts), e devolvidas a cada chamada de `writePage` por `churchContext.assumedDetails`, de modo que uma seção não possa dizer 17h enquanto outra diz 17h30. O JEV corrige qualquer seção que contradiga o pedido, os registros da igreja ou esses detalhes decididos. Os detalhes decididos não aparecem na interface; a igreja revisa e edita a página como qualquer outra. Algumas coisas nunca são inventadas: nomes de pessoas, telefones, e-mails e endereços web, preços, estatísticas, a história da igreja, citações atribuídas a pessoas e o dia da semana de uma data para a qual o pedido não informou um.

**Visuais.** Os modelos nunca nomeiam suas fotos ou ícones. Eles deixam espaços abertos, e uma passagem genérica (`visualSlots` → `pickVisuals` → `applyVisuals` em `SiteGenHelper`) percorre a árvore pronta e preenche cada um: um fundo de seção ou uma entrada de galeria marcada com `auto:photo`, um `auto:icon`, o `auto:divider` do destaque e, sem marcador algum, qualquer elemento `textWithPhoto`, `card` ou `image` cuja `photo` esteja vazia. O JEV escolhe cada um a partir do texto ao lado (a foto de um cartão a partir do título e do texto daquele cartão; um fundo a partir do texto da seção), sem repetir nenhum assunto em uma página. Um novo modelo, portanto, recebe fotos de graça. As fotos são termos de busca do Pexels emitidos como marcadores `pexels:<term>` que o B1Admin resolve pelo `POST /content/stock/search`; um cliente que não envia `resolvesPhotos` recebe no lugar uma imagem de destaque embutida, faixas de cor chapada e cartões sem foto. Propositalmente não há temas de retratos, e o modelo de pastor não tem foto: um desconhecido de banco de imagens nunca deve ocupar o lugar de uma pessoa real. Para uma igreja que ainda não tem páginas, o B1Admin aplica o `suggestedStyle` aos estilos globais; sites existentes mantêm a aparência.

### Outros endpoints

:::info
O botão de reescrita do `SectionToolbar` e o botão "Gerar site" da lista de páginas do B1Admin continuam comentados no lado do cliente. Os endpoints do AskApi abaixo ainda respondem; somente essa interface está oculta.
:::

| Endpoint | Finalidade |
|----------|------------|
| `POST /website/generatePageOutline` → `generateSection` | O fluxo original de página em duas etapas (esboço e, depois, uma chamada de LLM por seção emitindo JSON de elemento). Substituído no B1Admin por `planPage`/`writePage` por causa do custo; mantido para consumidores da API |
| `POST /website/generateSite` | Geração do site inteiro. **Em duas fases por desenho**: uma chamada com `planOnly: true` retorna só o plano de várias páginas (uma chamada rápida ao modelo), e depois o cliente pede o conteúdo completo — mantendo cada requisição dentro do tempo limite do Lambda/API Gateway |
| `POST /website/rewriteSection` | Reescrita que preserva a estrutura: o modelo só pode alterar respostas com texto. Uma assinatura recursiva de estrutura (ids + tipos + ordem) é comparada antes e depois; qualquer divergência retorna a seção original com `fallback: true`, em vez de uma estrutura corrompida |
| `POST /website/generateAltText` | Chamada de visão a até 20 URLs de imagem; retorna um texto alternativo conciso (≤125 caracteres, prefixos "foto de" removidos) |
| `POST /website/generateMetaDescription` | Uma meta descrição de SEO (≤155 caracteres) a partir do texto da página — ligada ao botão Gerar nas configurações de página do B1Admin |

Os prompts desses endpoints são arquivos markdown em `AskApi/config/instructions/`, incluindo o catálogo de elementos a partir do qual o modelo gera. Dois pontos de projeto mantêm o catálogo honesto: o cliente envia `availableElementTypes` em toda requisição (o prompt só pode usar tipos dessa lista — o servidor nunca fixa o conjunto completo), e a ferramenta MCP `describe_page_builder` da API traz o mesmo guia para agentes de IA que trabalham pelo [MCP](../api/mcp). Os modelos são o Claude da Anthropic via OpenRouter — o 3.5 Haiku para o conteúdo das seções (latência), o 3.5 Sonnet para esboços, planos de site e visão — com um fallback para a OpenAI quando não há chave do OpenRouter configurada.

## Formulários conversacionais

Os formulários (módulo de membership) ganharam um modo conversacional, voltado para páginas no estilo de cartão de conexão. Quatro colunas em `forms` controlam esse modo: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderização** — o `FormSubmissionEdit` do apphelper passa a usar o componente `ConversationalForm` (uma pergunta por vez) quando `displayMode` é `conversational`; a página de formulário do B1App repassa o modo. O payload do envio é o mesmo nos dois casos.
- **Criação automática de pessoa** — no envio com `autoCreatePerson` definido, `ConversationalFormHelper.findOrCreatePerson` deduplica por e-mail (sem diferenciar maiúsculas) e, caso contrário, cria um domicílio + pessoa com `membershipStatus: "Guest"`, e então vincula o envio a essa pessoa.
- **E-mail de acompanhamento** — quando um assunto e um texto estão definidos, quem enviou recebe um e-mail com modelo (com os marcadores `{firstName}` / `{churchName}`) pelo caminho transacional existente (`TransactionalEmailHelper`), nunca pela porta do resumo de notificações. Ambos os efeitos colaterais não são fatais: uma falha nunca perde o envio.

Os quatro campos são definidos hoje pela API; o editor de formulários do B1Admin ainda não os expõe.

## Cache do site público

O caminho de renderização pública do B1App armazena em cache as buscas marcadas com a igreja (`next: { revalidate: 300, tags: [sdSlug] }` em produção; `0` em desenvolvimento), de modo que uma página ao vivo pode ficar desatualizada por até cinco minutos depois de uma gravação no ContentApi. `POST /api/revalidate/{sdSlug}` no B1App chama `revalidateTag(sdSlug)` e é a única forma de descartar esse cache antes do tempo.

Dois pontos gravam nesse cache:

1. **B1Admin** — `clearSiteCache()` em `B1Admin/src/site/siteCache.ts` faz um POST depois dos salvamentos do editor. Ele prefere o subdomínio do site ativo (um site secundário precisa invalidar *aquela* tag, e não a da igreja padrão).
2. **Api** — mutações de conteúdo que nunca passam pelo B1Admin (chaves de API, MCP, IA) disparam `SiteCacheHelper.bump(churchId)` a partir dos controllers de conteúdo. O auxiliar resolve o subdomínio da igreja por `SubDomainHelper` e faz um POST para `{b1AppRoot}/api/revalidate/{sd}`. As falhas são engolidas, para que um B1App inacessível nunca faça falhar um salvamento.

Os controllers que disparam o bump: páginas (salvar, excluir, duplicar, publicar, descartar, despublicar, IA temporária), seções, elementos, blocos, links, estilos globais, postagens e redirecionamentos. O `b1AppRoot` de desenvolvimento é `http://{subdomain}.localtest.me:3301`; demo/produção usam `https://{subdomain}.b1.church`.

## Páginas relacionadas

- [Roteamento de sites e multi-site](./websites) — como uma requisição se resolve para uma igreja/site e como os domínios personalizados são roteados
- [Endpoints de Content](../api/endpoints/content) — superfície REST completa para páginas, seções, elementos, blocos, postagens, redirecionamentos e configurações
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que traz os renderizadores, o registro, os divisores e os widgets
- [Servidor MCP](../api/mcp) — incluindo a ferramenta de guia `describe_page_builder`
- [Editor de páginas (usuário final)](/docs/b1-admin/website/page-editor) — a documentação do editor para a equipe
