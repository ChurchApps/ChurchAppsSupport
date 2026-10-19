---
title: "Arquitetura do Construtor de Sites"
---

# Arquitetura do Construtor de Sites

<div class="article-intro">

Todo site de igreja servido pelo B1App é renderizado a partir de uma árvore de conteúdo -- páginas, seções, elementos -- armazenada na ContentApi e editada visualmente no B1Admin. Uma biblioteca de componentes compartilhada renderiza tanto a prévia do editor quanto o site ao vivo, um catálogo de tipos de elementos define o que pode aparecer em uma página, e um serviço de IA separado pode gerar ou reescrever essa árvore. Esta página mapeia toda a pilha: o contrato de elementos em `@churchapps/helpers`, o pipeline de renderização, elementos de dados da igreja, widgets para o site inteiro, a camada de blog, páginas com acesso controlado, SEO, geração com IA e formulários conversacionais.

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

Três regras valem para toda a pilha:

1. **Uma árvore, dois renderizadores.** Uma página é uma árvore `pages → sections → elements` em que cada nó carrega suas configurações como um blob JSON `answers`. Os mesmos componentes do apphelper renderizam o editor de arrastar e soltar no B1Admin e o site público renderizado no servidor no B1App -- não existe um "formato de publicação" separado.
2. **O contrato vive em `@churchapps/helpers`.** `ElementTypes.ts` é o catálogo único de tipos de elementos; os renderizadores são resolvidos por um registro no apphelper; os formulários do editor ficam no B1Admin. Adicionar um tipo de elemento significa mexer nos três, nessa ordem.
3. **O site público lê endpoints anônimos.** Tudo que o B1App precisa -- a árvore de páginas, as configurações, as postagens do blog, os redirecionamentos e os endpoints de dados da igreja em outros módulos -- é público. A autenticação é opcional: um JWT no endpoint anônimo da árvore libera páginas exclusivas para membros, mas nada mais muda.

## A árvore de conteúdo

O módulo de conteúdo (`Api/src/modules/content`) é dono dos dados do construtor:

| Tabela | Função |
|-------|------|
| `pages` | Uma página por URL: `url`, `title`, `layout`, além de `visibility`/`groupIds` (controle de acesso) e `metaDescription` (SEO) |
| `sections` | Faixas horizontais em uma página (ou em um bloco): fundo, cor do texto e um `answersJSON` que guarda o estilo e as configurações dos divisores de forma `dividerTop`/`dividerBottom` |
| `elements` | Peças de conteúdo dentro de uma seção: `elementType` + `answersJSON`, aninháveis em tipos de layout (linha/coluna, carrossel) |
| `blocks` | Grupos reutilizáveis de seções/elementos (blocos de rodapé, blocos de elementos) compartilhados entre páginas |
| `posts` | Postagens independentes de blog (veja [Blog](#blog)) |
| `redirects` | Pares `fromPath → toPath` por igreja, limitados a 200 (veja [SEO](#seo-and-discoverability)) |
| `settings` | Configurações da igreja em chave-valor; as linhas marcadas como `public` são servidas anonimamente e carregam a configuração dos widgets/analytics |

A árvore inteira de uma URL volta em uma única chamada anônima -- `GET /content/pages/:churchId/tree?url=/about` -- que é o que o B1App usa para renderizar no servidor. As requisições do editor buscam por id e mantêm os ids internos.

## O contrato de elementos

### O catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como um `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e um `answersSchema` no estilo JSON-schema para suas respostas. `validateElementAnswers()` é deliberadamente tolerante -- tipos desconhecidos e chaves extras passam, de modo que o conteúdo antigo nunca quebra com uma atualização do catálogo. **Hoje são fornecidos 35 tipos:**

| Categoria | Tipos de elementos |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| conteúdo (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| mídia (4) | image, gallery, video, map |
| igreja (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avançado (2) | rawHTML, iframe |

O elemento `sermons` é o mais configurável entre os tipos da igreja: uma resposta `layout` seleciona `browse` (o navegador completo legado), `grid`, `list` ou `featuredLatest`, com `playlistId`, `itemCount`, `showTitles` e `showDates` refinando os layouts que não são `browse`.

O elemento `rawHTML` tem duas respostas: `rawHTML` (marcação) e `javascript`. Scripts inseridos via `innerHTML` nunca são executados, por isso o `RawHTMLElement` recria cada nó `<script>` da marcação como um elemento novo. Esses nós não inseridos pelo parser são confiáveis sob o `strict-dynamic` da CSP. Uma resposta `javascript` que começa com `<` (um trecho de fornecedor colado com as tags `<script>`) é interpretada como marcação e recebe o mesmo tratamento. Caso contrário, ela é executada como um script inline simples. O B1Admin sinaliza uma URL pura na caixa de JavaScript, já que uma URL isolada roda como um script sem efeito. O elemento `map` não renderiza nada e não carrega o script do Google Maps quando nenhuma chave da API do Maps está configurada.

### Renderizadores (`@churchapps/apphelper`)

Os renderizadores ficam em `Packages/apphelper/src/website/components/elementTypes/`, um componente por tipo, resolvidos por meio de `ElementRegistry.ts` -- um mapa de duas camadas em que `Element.tsx` registra o renderizador padrão para os 35 tipos (`registerDefaultElementRenderer`) e um app hospedeiro pode substituir qualquer um deles em tempo de execução (`registerElementRenderer`) sem bifurcar o pacote.

### Formulários do editor (B1Admin)

Os formulários de configuração por tipo do editor ficam em `B1Admin/src/site/admin/elements/` -- `ElementEdit.tsx` direciona para um componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou para um construtor de campos inline para cada tipo. O espelho voltado à IA deste catálogo é a ferramenta MCP `describe_page_builder` da API (veja [Servidor MCP](../api/mcp)).

A prévia do editor monta o mesmo `Theme` do site ao vivo, que define as variáveis CSS `--headingFont` / `--bodyFont` a partir dos estilos globais da igreja. O B1App aplica essas variáveis por meio de `pages.css`, que o B1Admin não pode importar; por isso, `ContentEditor.tsx` injeta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) para aplicá-las ao texto do `.page` e aos `h1`–`h6`. Sem isso, a prévia exibia os títulos com a fonte do admin.

### Divisores de forma das seções

As seções podem ter divisores decorativos de forma em qualquer uma das bordas. A configuração fica no `answersJSON` da seção como os objetos `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }`, com `shape` sendo um de `wave, waves, slant, curve, triangle, peaks`. O apphelper fornece o componente `SectionDivider` e o helper `parseDividerConfig()`; os renderizadores de Section dos dois apps (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) leem as respostas e montam o divisor, e o `SectionEdit.tsx` do B1Admin oferece o seletor. Os pacotes trazem apenas o bloco de construção -- a integração no nível da seção é responsabilidade dos apps que os consomem.

## Elementos de dados da igreja

Três tipos de elemento renderizam dados ao vivo da igreja em vez de conteúdo escrito. O isolamento de módulos continua valendo -- cada um chama o endpoint público do próprio módulo dono, a partir do navegador:

| Elemento | Endpoint | Observações |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retorna `{ fundId, totalAmount, donationCount }`, com janela opcional `?startDate=&endDate=`; o elemento compara o valor com sua resposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Somente por adesão**: o grupo precisa ter `publicRoster` definido (padrão desligado). A projeção é deliberadamente mínima -- `personId`, `displayName`, `leader`, foto -- sem campos de contato ou demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retorna a árvore campus → culto → horário; o renderizador do apphelper emite JSON-LD `Event` do schema.org, feito com o melhor esforço a partir desses dados (a API retorna dados simples) |

:::warning
`publicRoster` é a barreira de privacidade do `staffGrid`. Nunca amplie a projeção pública de membros de grupo nem contorne o flag -- o endpoint de escalação é anônimo por design, e a lista mínima de campos é a propriedade de segurança.
:::

### Elemento de calendário e páginas de eventos

As respostas do elemento `calendar` são `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, o padrão, ou `upcoming`) e `tag`. O B1App sobrescreve o renderizador do apphelper em `src/components/Element.tsx` com `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderiza o `UpcomingEventsElement` do B1App: ele carrega `GET /content/events/public/group/:churchId/:groupId` ou `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, expande as recorrências com `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, uma ocorrência por evento dentro de um ano) e mostra os primeiros 12 como blocos com foto (`events.photoUrl`, com o título na cor escura do tema como alternativa) que levam a `/events/{id}`, com um menu Assinar para o feed ICS do calendário.
- **`display: "month"`** renderiza o `CalendarElement` do apphelper com um callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` então navegam para essa URL ao clicar, em vez de abrir a caixa de detalhes (o B1Admin não passa `eventUrl`, então o calendário administrativo mantém a caixa de diálogo).
- **`tag`** filtra as duas exibições com `EventHelper.hasTag()` (`@churchapps/helpers`): uma correspondência sem diferenciar maiúsculas de minúsculas com `events.tags`, separado por vírgulas; vazio mostra tudo. A junção do calendário curado seleciona `e.tags` para que os eventos curados carreguem as tags.

Eventos curados são vinculados por `realEventId` (`eventPageId()`), então a URL sempre aponta para o evento real subjacente. `/{sdSlug}/events/[eventId]` é uma rota dedicada (não o pipeline do construtor): ela carrega `GET /content/events/public/:churchId/:id` -- que retorna `null` para eventos pendentes/rejeitados e para eventos privados sem inscrição, e acrescenta `roomNames` das reservas de sala não rejeitadas -- renderiza o `EventPageContent` (imagem de destaque, descrição em markdown, painel lateral Quando/Onde, **Inscreva-se para este Evento** quando `registrationEnabled`, e um link **Adicionar ao meu calendário** para `GET /content/events/public/:churchId/:id/ical`), usa a foto como imagem do Open Graph e emite JSON-LD `Event` para a próxima ocorrência por meio de `EventPageJsonLd`. Um evento desconhecido ou oculto retorna um 404 real.

## Widgets do site inteiro

Dois widgets são renderizados em todas as páginas públicas, fora da árvore: **AnnouncementBanner** (barra de aviso no topo da página que pode ser dispensada) e **Launcher** (central de ações flutuante para links do tipo doar/visitar/assistir). Ambos os componentes e seus helpers `parse*Config()` vêm no apphelper. A configuração são duas linhas públicas de settings, com as chaves `announcementBanner` e `launcher`, gravadas pelo `SiteWidgetsEdit` do B1Admin (na página Aparência) e lidas pelo layout público do B1App por meio de `GET /content/settings/public/:churchId`. A API trata esses valores como pares chave-valor opacos; os nomes das chaves são uma convenção entre os dois apps.

## Blog

O blog é um tipo de conteúdo independente, não uma camada sobre as páginas do construtor. Uma linha de `posts` guarda a postagem inteira: `title`, `slug`, `excerpt`, `content` (corpo em markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. A superfície pública (toda anônima, `PostController`):

| Rota | Finalidade |
|-------|---------|
| `GET /content/posts/public/:churchId` | Postagens publicadas, filtráveis por `?category=&tag=`, paginadas |
| `GET /content/posts/public/:churchId/categories` | Categorias distintas entre as postagens publicadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Uma postagem publicada |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, com o nome da igreja no título e, em cada item, a categoria e a descrição (resumo ou conteúdo) |

Uma postagem está "publicada" quando `publishDate` está definida e já passou; uma `publishDate` futura indica uma postagem agendada (oculta publicamente e exibida com um chip Agendada no admin). Os endpoints de leitura enriquecem cada postagem com `authorName`, resolvido a partir de `authorId` pelo gateway do módulo de membership. Resumos ausentes recorrem ao conteúdo em markdown sem formatação (~160 caracteres) nos cartões de listagem, nas meta descrições e no RSS. O B1App serve `/{sdSlug}/blog` -- uma listagem editorial (cabeçalho centralizado que vira o nome da categoria/tag ativa quando filtrado, linha de chips de categoria para filtrar, linhas de postagem com miniatura à esquerda, autoria e resumos), com o feed RSS anunciado como link alternativo -- e `/{sdSlug}/blog/[postSlug]`, uma rota dedicada (não o pipeline Zone/Section), com cabeçalho centralizado (indicador da categoria, título, autoria, filete de destaque na cor primária), imagem de destaque 16:9 na largura do contêiner, o corpo em markdown em uma coluna de leitura de ~720px, chips de tags no rodapé do artigo, uma faixa de postagens relacionadas `"Mais em {category}"` e JSON-LD `BlogPosting` incluindo o autor. Ambas as páginas usam apenas os tokens do tema, herdando a paleta de cada igreja. As URLs do blog são incluídas no sitemap por igreja. A área de criação do B1Admin (**Site → Blog**) edita as postagens em uma caixa de diálogo: editor de markdown com alternância de prévia, seletor de imagens da galeria com recorte 16:9, seletor de autor de pessoas (padrão: o usuário que está editando), autocompletar de categorias a partir das categorias existentes, validação de slug duplicado e uma chave de publicação; as linhas publicadas têm link para a postagem ao vivo, e a página lembra os administradores de adicionar um link de navegação para `/blog`.

## Páginas exclusivas para membros

`pages.visibility` reaproveita o enum dos links de navegação -- `everyone` (padrão), `visitors`, `members`, `staff`, `team`, `groups` (com `groupIds`) -- mas como uma **barreira de acesso rígida**, não um filtro de navegação (`PageVisibilityHelper.canViewPage`). O fluxo:

1. O endpoint anônimo da árvore verifica a visibilidade nas buscas por URL. Visitantes anônimos de uma página restrita recebem `{ restricted: true, visibility }` em vez do conteúdo -- a árvore nunca vaza.
2. O endpoint ainda respeita um JWT: o `CustomAuthProvider` verifica o cabeçalho `Authorization` em *toda* requisição, inclusive nas rotas anônimas, então a busca de um membro autenticado pela mesma URL é resolvida normalmente.
3. O B1App renderiza o `RestrictedPage` diante de uma resposta `restricted`: ele hidrata a sessão a partir das credenciais armazenadas, busca a árvore novamente com o JWT e a renderiza -- ou mostra uma tela de login com um `returnUrl` quando não há sessão.

:::info
A granularidade da barreira varia por nível: `groups` verifica os `groupIds` do token contra a lista da página, e `staff` verifica o `membershipStatus`, mas `members` e `team` atualmente aceitam qualquer usuário autenticado da igreja. Trate `groups` como a opção estrita.
:::

## SEO e descoberta {#seo-and-discoverability}

Tudo isso é renderização no lado do B1App sobre os dados da ContentApi -- a API armazena, o app emite:

| Assunto | Como funciona |
|---------|--------------|
| Meta descrições | `pages.metaDescription` (≤300 caracteres) flui por `MetaHelper.getMetaData()` até o `Metadata` do Next.js (description + Open Graph) em toda rota renderizada pelo construtor. As configurações de página do B1Admin incluem um botão "Gerar" com IA (veja abaixo) |
| Redirecionamentos | Linhas `redirects` por igreja gerenciadas em `/content/redirects` (`content.edit`, limite de 200 linhas, caminhos normalizados). Diante de um possível 404, a rota de página do B1App resolve o caminho contra `GET /content/redirects/public/:churchId` e emite um HTTP 308 pelo `permanentRedirect` do Next; caminhos sem correspondência seguem para `notFound()` |
| 404 personalizado | `not-found.tsx` renderiza o `BrandedNotFound` com o logo, o nome e o tema da igreja em vez de um erro genérico. Caminhos desconhecidos `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` e `/volunteer/[planId]` retornam um 404 real, assim como subdomínios desconhecidos e slugs de página malformados (veja [Roteamento de Sites e Multi-Site](./websites)) |
| Dados estruturados | JSON-LD `BlogPosting` nas postagens do blog; `VideoObject` nas páginas de cada sermão (`/{sdSlug}/sermons/[sermonId]`) e nas páginas que contêm um elemento `sermons`; `Event` a partir de elementos de calendário/evento nas páginas do construtor e em cada página `/{sdSlug}/events/[eventId]` (próxima ocorrência, com a foto do evento como `image`); `Event` do schema.org a partir do elemento `serviceTimes` |
| Páginas de sermão | Todo sermão público ganha uma página rastreável em `/sermons/[sermonId]` com metadados completos -- os sermões não ficam mais presos dentro do navegador do elemento do lado do cliente |
| Analytics | A configuração pública `ga4MeasurementId` (gerenciada junto aos redirecionamentos no B1Admin) injeta um gtag GA4 por igreja via `next/script`. O app B1 (`/{sdSlug}/mobile`) também envia suas visualizações de página para esse ID, junto com a tag própria da ChurchApps, quando se trata de um ID `G-` válido (IDs de contêiner GTM ficam apenas no site). Cada `gtag('config')` carrega um `display_mode` de `installed` ou `browser`, com base em `navigator.standalone` ou na media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap e feeds | A rota `sitemap.xml` por igreja inclui as páginas do construtor, as URLs do blog e as 50 páginas de sermão mais recentes (com `<lastmod>` a partir da data de publicação de cada sermão). Também lista as páginas embutidas `/sermons`, `/groups` e `/volunteer` quando têm conteúdo (grupos públicos, planos de inscrição), a menos que um redirecionamento salvo substitua esse caminho. `/` fica de fora quando a igreja não tem página inicial, pois `/` então redireciona para `/mobile`, que é não permitido. A listagem do blog anuncia o feed RSS |
| Acessibilidade | A estrutura pública renderiza um link de pular conteúdo apontando para o marco `<main id="main-content">` em todo wrapper de layout |

## Geração com IA (AskApi)

A geração de páginas e de sites roda no **AskApi**, um serviço separado, sob o controlador `/website`. Ele se autentica com o mesmo JWT do `CustomAuthProvider` usado em todo o resto e é **sem estado em relação ao conteúdo**: todo endpoint retorna JSON e quem chama (o B1Admin) persiste o resultado pela ContentApi (`POST /content/pages/importTree` cria uma página com toda a sua árvore aninhada de seções/elementos em uma única chamada; ele sempre insere sob a igreja de quem chama e ignora os ids do corpo).

### Geração de página (`planPage` → `writePage`)

O template "IA" do `AddPageModal` do B1Admin usa um pipeline de baixo custo (`AskApi/src/helpers/SiteGenHelper.ts`) baseado em uma regra: **nenhum modelo emite JSON do construtor**. Dois modelos dividem o trabalho pelo Vercel AI Gateway (HTTP simples, chave SSM em `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) -- um modelo de decisão tipada que retorna escolhas, pontuações e booleanos com probabilidades, mas não consegue escrever texto. Ele escolhe cada seção em sequência a partir de uma biblioteca fixa de templates, pontua layouts, verifica os fatos do texto e escolhe fotos de banco de imagens e ícones. O custo de entrada é de cerca de US$ 0,04 por milhão de tokens e a saída é gratuita, então ~90 chamadas por página custam uma fração de centavo.
- **Um pequeno modelo de chat (GPT-4.1 mini por padrão)** -- preenche os slots de texto nomeados e com limite de tamanho dos templates escolhidos. O redator é uma constante única, substituível pela variável de ambiente `SITEGEN_COPY_MODEL` (qualquer ID de modelo de chat do gateway, por exemplo `anthropic/claude-haiku-4.5`). Em um teste cego lado a lado com três igrejas, o Claude Haiku 4.5 soou um pouco mais caloroso, mas o GPT-4.1 mini ficou próximo, cerca de 4x mais barato e mais rápido, então ele é o padrão. Uma página completa com os três layouts custa cerca de 1,3 centavo, sendo cerca de 80% disso o redator.

| Fase | Endpoint | O que acontece |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classifica o tipo de página (início, visita, sobre…), depois amostra 10 layouts candidatos a partir das probabilidades por rodada do JEV (hero + número de seções → cada seção → encerramento), remove duplicatas, faz o JEV pontuar cada um quanto a adequação/fluxo/lacunas, e retorna os 3 melhores mais um tom de escrita e um `suggestedStyle` (paleta + fontes). Candidatos que compartilham as mesmas seções até o momento fazem ao JEV uma pergunta idêntica, então as rodadas são memorizadas por prefixo. Uma melhor pontuação abaixo de 6 é registrada como `lowLayoutScore` -- esse registro é a lista de templates que valem a pena adicionar. ~2s |
| 2 | `POST /website/writePage` (uma chamada por candidato) | O redator preenche o texto dos slots duas seções por chamada, em paralelo, e retorna cinco títulos de destaque entre os quais o JEV escolhe; o JEV verifica os fatos de cada seção; seções que falham, usam uma frase genérica ou repetem uma seção anterior (sequências de 4 palavras compartilhadas, verificadas no código) são reescritas em paralelo com o motivo específico; uma limpeza no código remove frases com jargão genérico de sites de igreja (a menos que a descrição própria da igreja use esses termos); o JEV escolhe os temas das fotos, os ícones e o divisor de forma do destaque, e pontua o resultado. Retorna uma árvore de seções pronta para salvar e uma pontuação. ~6–9s |
| 3 | `POST /content/pages/importTree` | O B1Admin grava apenas o layout melhor classificado (o segundo colocado é um plano B caso essa gravação falhe), salva e abre a prévia (~10s após Salvar) |

Cada fase é uma requisição própria para que cada chamada fique dentro do limite de 29 segundos do API Gateway. Os templates em `SiteGenHelper.buildTree` são árvores fixas de seções + elementos do catálogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e referenciam tokens do tema (`var(--accent)`, `var(--lightAccent)`…), então as páginas geradas herdam as configurações de aparência já existentes na igreja. Adicionar um template de seção significa adicionar sua lista de slots em `SECTIONS` e sua árvore em `buildTree`; o teste unitário percorre todos os templates e valida cada árvore.

**Entradas.** O texto só pode afirmar fatos de duas fontes: o que o usuário digitou e `churchContext.facts` -- registros que o B1Admin reúne antes do planejamento (horários públicos de culto e nomes públicos de grupos, além do nome e endereço da igreja). As mesmas flags controlam os templates dependentes de dados: `times` renderiza o elemento ao vivo `serviceTimes` quando a igreja mantém os horários de culto no B1 (ou uma tabela digitada, caso contrário), e `groups` e `countdown` só são oferecidos quando há dados por trás deles. As chamadas ao JEV são protegidas -- uma duplicata dispara após 1,5s e a primeira resposta vence -- porque o gateway ocasionalmente trava e as chamadas são quase gratuitas.

**Manter-se no assunto.** O pedido do usuário é o *assunto da página*, não um pano de fundo sobre a igreja. O `planPage` classifica a requisição (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e para páginas `event` e `topic` os templates gerais de igreja (nota do pastor, sermões, ministérios, grupos, impacto comunitário, horários semanais e contagem regressiva, herói com vídeo) nem chegam a ser oferecidos, enquanto `details` (quando / onde / o que levar) e uma `eventCountdown` com data são. Ambos os juízes pontuam se o texto se mantém no assunto. O B1Admin passa o `pageType` do plano em cada chamada de `writePage`.

**Páginas completas a partir de pedidos curtos.** As páginas têm de três a seis seções intermediárias, tamanhos generosos de slots, uma linha introdutória nas seções de cartões e um FAQ de cinco perguntas, e a passada de reparo expande qualquer seção que volte fraca. A geração é um clique: não há perguntas de acompanhamento. Quando o pedido deixa de fora um detalhe comum que uma página completa precisa (um horário de início, uma sala, o que levar, como se inscrever), o redator preenche com uma escolha plausível e modesta para a igreja editar. Como as seções são escritas em paralelo, essas lacunas são decididas **uma única vez**, no `planPage` (`assumedDetails`, uma pequena chamada ao redator que roda junto com a amostragem de layouts), e repassadas a cada chamada de `writePage` por meio de `churchContext.assumedDetails`, para que uma seção não diga 17h enquanto outra diz 17h30. O JEV repara qualquer seção que contradiga o pedido, os registros da igreja ou esses detalhes decididos. Os detalhes decididos não aparecem na interface; a igreja revisa e edita a página como qualquer outra. Algumas coisas nunca são inventadas: nomes de pessoas, números de telefone, endereços de e-mail e de sites, preços, estatísticas, a história da igreja, citações atribuídas a pessoas e o dia da semana de uma data que o pedido não informou.

**Visuais.** Os templates nunca nomeiam suas fotos ou ícones. Eles deixam slots em aberto, e uma passada genérica (`visualSlots` → `pickVisuals` → `applyVisuals` em `SiteGenHelper`) percorre a árvore pronta e preenche cada um: um fundo de seção ou entrada de galeria marcado como `auto:photo`, um `auto:icon`, o `auto:divider` do destaque e, sem nenhum marcador, qualquer elemento `textWithPhoto`, `card` ou `image` cuja `photo` esteja vazia. O JEV escolhe cada um a partir do texto ao lado (a foto de um cartão a partir do título e texto desse cartão; um fundo a partir do texto da seção), sem repetir nenhum assunto em uma página. Um template novo, portanto, recebe fotos automaticamente. As fotos são termos de busca do Pexels emitidos como marcadores `pexels:<term>` que o B1Admin resolve por meio de `POST /content/stock/search`; um cliente que não envie `resolvesPhotos` recebe uma imagem de destaque embutida, faixas de cor sólida e cartões sem foto. Não há de propósito temas de retratos, e o template do pastor não tem foto: uma pessoa de banco de imagens nunca pode ficar no lugar de uma pessoa real. Para uma igreja que ainda não tem páginas, o B1Admin aplica o `suggestedStyle` aos estilos globais; os sites existentes mantêm a aparência atual.

### Outros endpoints

:::info
O botão de reescrita da `SectionToolbar` e o botão "Gerar Site" da lista de páginas no B1Admin continuam comentados no lado do cliente. Os endpoints do AskApi abaixo ainda respondem; apenas essa interface está oculta.
:::

| Endpoint | Finalidade |
|----------|----------|
| `POST /website/generatePageOutline` → `generateSection` | O fluxo original de página em duas etapas (esboço e, depois, uma chamada LLM por seção emitindo JSON de elementos). Substituído no B1Admin pelo `planPage`/`writePage` por causa do custo; mantido para consumidores da API |
| `POST /website/generateSite` | Geração de site inteiro. **Em duas fases por design**: uma chamada com `planOnly: true` retorna apenas o plano de várias páginas (uma chamada rápida ao modelo), depois o cliente pede o conteúdo completo -- mantendo cada requisição dentro do tempo limite da Lambda/API Gateway |
| `POST /website/rewriteSection` | Reescrita que preserva a estrutura: o modelo só pode alterar respostas com texto. Uma assinatura recursiva da estrutura (ids + tipos + ordem) é comparada antes e depois; qualquer divergência retorna a seção original com `fallback: true` em vez de uma estrutura corrompida |
| `POST /website/generateAltText` | Chamada de visão sobre até 20 URLs de imagem; retorna um texto alternativo conciso (≤125 caracteres, sem os prefixos "foto de") |
| `POST /website/generateMetaDescription` | Uma meta descrição de SEO (≤155 caracteres) a partir do texto da página -- ligada ao botão Gerar nas configurações de página do B1Admin |

Os prompts desses endpoints são arquivos markdown em `AskApi/config/instructions/`, incluindo o catálogo de elementos a partir do qual o modelo gera. Dois pontos de projeto mantêm o catálogo coerente: o cliente envia `availableElementTypes` em toda requisição (o prompt só pode usar tipos dessa lista -- o servidor nunca fixa o conjunto completo), e a ferramenta MCP `describe_page_builder` da API carrega o mesmo guia para agentes de IA que trabalham pelo [MCP](../api/mcp). Os modelos são o Claude da Anthropic via OpenRouter -- 3.5 Haiku para o conteúdo das seções (latência), 3.5 Sonnet para esboços, planos de site e visão -- com um fallback para a OpenAI quando nenhuma chave do OpenRouter está configurada.

## Formulários conversacionais

Os formulários (módulo de membership) ganharam um modo conversacional, voltado a páginas no estilo de cartão de conexão. Quatro colunas em `forms` controlam esse modo: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderização** -- o `FormSubmissionEdit` do apphelper troca para o componente `ConversationalForm` (uma pergunta por vez) quando `displayMode` é `conversational`; a página de formulário do B1App repassa o modo. O payload do envio é o mesmo nos dois casos.
- **Criação automática de pessoa** -- no envio, com `autoCreatePerson` definido, `ConversationalFormHelper.findOrCreatePerson` elimina duplicatas por e-mail (sem diferenciar maiúsculas de minúsculas) e, caso contrário, cria uma família + pessoa com `membershipStatus: "Guest"`, e então vincula o envio a essa pessoa.
- **E-mail de acompanhamento** -- quando um assunto e um corpo estão definidos, quem enviou recebe um e-mail com modelo (com os tokens `{firstName}` / `{churchName}`) pelo caminho transacional existente (`TransactionalEmailHelper`), nunca pela porta do resumo de notificações. Ambos os efeitos colaterais não são fatais: uma falha nunca perde o envio.

Os quatro campos são definidos hoje pela API; o editor de formulários do B1Admin ainda não os expõe.

## Cache do site público

O caminho de renderização pública do B1App armazena em cache as buscas marcadas com a igreja (`next: { revalidate: 300, tags: [sdSlug] }` em produção; `0` em desenvolvimento), de modo que uma página ao vivo pode ficar desatualizada por até cinco minutos após uma escrita na ContentApi. `POST /api/revalidate/{sdSlug}` no B1App chama `revalidateTag(sdSlug)` e é a única forma de descartar esse cache antes do prazo.

Dois pontos de escrita acionam isso:

1. **B1Admin** -- `clearSiteCache()` em `B1Admin/src/site/siteCache.ts` faz um POST após as gravações do editor. Ele prefere o subdomínio do site ativo (um site secundário precisa invalidar *aquela* tag, não a padrão da igreja).
2. **Api** -- as mutações de conteúdo que nunca passam pelo B1Admin (chaves de API, MCP, IA) disparam `SiteCacheHelper.bump(churchId)` a partir dos controladores de conteúdo. O helper resolve o subdomínio da igreja via `SubDomainHelper` e faz um POST para `{b1AppRoot}/api/revalidate/{sd}`. Falhas são silenciadas, para que um B1App inacessível nunca faça uma gravação falhar.

Controladores que acionam o bump: páginas (salvar, excluir, duplicar, publicar, descartar, despublicar, temp de IA), seções, elementos, blocos, links, estilos globais, postagens e redirecionamentos. O `b1AppRoot` de desenvolvimento é `http://{subdomain}.localtest.me:3301`; demo e produção usam `https://{subdomain}.b1.church`.

## Páginas Relacionadas

- [Roteamento de Sites e Multi-Site](./websites) — como uma requisição se resolve para uma igreja/site e como os domínios personalizados são roteados
- [Endpoints de Conteúdo](../api/endpoints/content) — superfície REST completa para páginas, seções, elementos, blocos, postagens, redirecionamentos e configurações
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que fornece os renderizadores, o registro, os divisores e os widgets
- [Servidor MCP](../api/mcp) — incluindo a ferramenta de guia `describe_page_builder`
- [Editor de Páginas (usuário final)](/docs/b1-admin/website/page-editor) — a documentação do editor para a equipe
