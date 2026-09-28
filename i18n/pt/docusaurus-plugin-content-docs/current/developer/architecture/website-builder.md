---
title: "Arquitetura do Construtor de Sites"
---

# Arquitetura do Construtor de Sites

<div class="article-intro">

Todo site de igreja servido por B1App é renderizado a partir de uma árvore de conteúdo — páginas, seções, elementos — armazenada no ContentApi e editada visualmente no B1Admin. Uma biblioteca de componentes compartilhada renderiza tanto a visualização do editor quanto o site ativo, um catálogo de tipo de elemento único define o que pode aparecer em uma página, e um serviço de IA separado pode gerar ou reescrever essa árvore. Esta página mapeia toda a pilha: o contrato de elemento em `@churchapps/helpers`, o pipeline de renderização, elementos de dados da igreja, widgets de todo o site, a camada de blog, páginas com acesso restrito, SEO, geração de IA e formulários conversacionais.

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

Três regras mantêm-se em toda a pilha:

1. **Uma árvore, dois renderizadores.** Uma página é uma árvore `pages → sections → elements` onde cada nó carrega suas configurações como um blob JSON `answers`. Os mesmos componentes do apphelper renderizam o editor de arrastar e soltar no B1Admin e o site público renderizado no servidor no B1App — não há um "formato de publicação" separado.
2. **O contrato reside em `@churchapps/helpers`.** `ElementTypes.ts` é o catálogo único de tipos de elemento; os renderizadores se resolvem através de um registro no apphelper; os formulários do editor residem no B1Admin. Adicionar um tipo de elemento significa tocar nos três, nessa ordem.
3. **O site público lê endpoints anônimos.** Tudo que B1App precisa — a árvore de página, configurações, posts de blog, redirecionamentos e os endpoints de dados da igreja em outros módulos — é público. Autenticação é opcional: um JWT no endpoint de árvore anônimo desbloqueia páginas apenas de membros, nada mais muda.

## A árvore de conteúdo

O módulo de conteúdo (`Api/src/modules/content`) possui os dados do construtor:

| Tabela | Função |
|-------|------|
| `pages` | Uma página por URL: `url`, `title`, `layout`, mais `visibility`/`groupIds` (acesso controlado) e `metaDescription` (SEO) |
| `sections` | Bandas horizontais em uma página (ou em um bloco): cor de fundo, cor de texto e um `answersJSON` que carrega estilos mais as configurações de divisor de forma `dividerTop`/`dividerBottom` |
| `elements` | Peças de conteúdo dentro de uma seção: `elementType` + `answersJSON`, aninhável para tipos de layout (linha/coluna, carrossel) |
| `blocks` | Grupos de seção/elemento reutilizáveis (blocos de rodapé, blocos de elemento) compartilhados entre páginas |
| `posts` | Posts de blog independentes (veja [Blog](#blog)) |
| `redirects` | Pares `fromPath → toPath` por igreja, limitados a 200 (veja [SEO](#seo-and-discoverability)) |
| `settings` | Configurações de igreja de chave-valor; linhas sinalizadas como `public` são servidas anonimamente e carregam a configuração de widget/análise |

A árvore inteira para uma URL volta de uma única chamada anônima — `GET /content/pages/:churchId/tree?url=/about` — que é o que B1App renderiza no servidor. As solicitações do editor buscam por id e mantêm ids internos.

## O contrato de elemento

### O catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como um `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e um `answersSchema` estilo JSON-schema para suas respostas. `validateElementAnswers()` é deliberadamente indulgente — tipos desconhecidos e chaves extras passam, então conteúdo antigo nunca quebra em uma atualização de catálogo. **35 tipos são enviados hoje:**

| Categoria | Tipos de elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

O elemento `sermons` é o mais configurável dos tipos de igreja: uma resposta `layout` seleciona `browse` (o navegador completo legado), `grid`, `list` ou `featuredLatest`, com `playlistId`, `itemCount`, `showTitles` e `showDates` refinando os layouts não-navegadores.

### Renderizadores (`@churchapps/apphelper`)

Os renderizadores residem em `Packages/apphelper/src/website/components/elementTypes/`, um componente por tipo, resolvido através de `ElementRegistry.ts` — um mapa de duas camadas onde `Element.tsx` registra o renderizador padrão para todos os 35 tipos (`registerDefaultElementRenderer`) e um aplicativo hospedeiro pode substituir qualquer um deles em tempo de execução (`registerElementRenderer`) sem fazer fork do pacote.

### Formulários de editor (B1Admin)

Os formulários de configurações por tipo do editor residem em `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` distribui para um componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou um construtor de campo inline por tipo. O espelho voltado para IA deste catálogo é a ferramenta MCP `describe_page_builder` da API (veja [MCP Server](../api/mcp)).

### Divisores de forma de seção

As seções podem carregar divisores de forma decorativos em qualquer uma das bordas. A configuração reside no `answersJSON` da seção como objetos `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` com `shape` sendo um de `wave, waves, slant, curve, triangle, peaks`. O Apphelper envia o componente `SectionDivider` e o auxiliar `parseDividerConfig()`; os renderizadores Section de ambos os aplicativos (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analisam as respostas e montam o divisor, e `SectionEdit.tsx` no B1Admin fornece a UI do seletor. Os pacotes enviam apenas o bloco de construção — a fiação no nível da seção é responsabilidade dos aplicativos que o consomem.

## Elementos de dados de Igreja

Três tipos de elemento renderizam dados de igreja ativa em vez de conteúdo criado. O isolamento de módulo ainda se aplica — cada um chama o endpoint público do seu próprio módulo a partir do navegador:

| Elemento | Endpoint | Notas |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retorna `{ fundId, totalAmount, donationCount }`, janela `?startDate=&endDate=` opcional; o elemento compara isso contra sua resposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Apenas opt-in**: o grupo deve ter `publicRoster` definido (padrão desligado). A projeção é deliberadamente mínima — `personId`, `displayName`, `leader`, foto — sem campos de contato ou demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retorna a árvore campus → serviço → tempo; o renderizador do apphelper emite JSON-LD schema.org `Event` com o melhor esforço a partir dele (a API retorna dados simples) |

:::warning
`publicRoster` é o portão de privacidade para `staffGrid`. Nunca amplie a projeção de membro de grupo público ou contorne o sinalizador — o endpoint do roster é anônimo por design e a lista de campo mínimo é a propriedade de segurança.
:::

## Widgets de todo o site

Dois widgets são renderizados em cada página pública em vez de dentro da árvore: **AnnouncementBanner** (barra de topo dispensável) e **Launcher** (hub de ação flutuante para links de estilo dar/visitar/assistir). Ambos os componentes e seus auxiliares `parse*Config()` são enviados no apphelper. A configuração são duas linhas de configuração pública — chaves `announcementBanner` e `launcher` — escritas por `SiteWidgetsEdit` do B1Admin (na página Aparência) e lidas pelo layout público do B1App via `GET /content/settings/public/:churchId`. A API trata esses como pares chave-valor opacos; os nomes das chaves são uma convenção entre os dois aplicativos.

## Blog

O blog é um tipo de conteúdo independente, não uma camada sobre páginas do construtor. Uma linha `posts` contém o post inteiro: `title`, `slug`, `excerpt`, `content` (corpo markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Superfície pública (todos anônimos, `PostController`):

| Rota | Propósito |
|-------|---------|
| `GET /content/posts/public/:churchId` | Posts publicados, filtráveis por `?category=&tag=`, paginados |
| `GET /content/posts/public/:churchId/categories` | Categorias distintas entre posts publicados |
| `GET /content/posts/public/:churchId/slug/:slug` | Um post publicado |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, intitulado com o nome da igreja, com categoria por item e descrição de excerpt ou conteúdo |

Um post é "publicado" uma vez que `publishDate` está definido e passou; um `publishDate` futuro é um post agendado (ocultado publicamente, mostrado com um chip Agendado no admin). Os endpoints de leitura enriquecem cada post com `authorName`, resolvido de `authorId` através do gateway do módulo de associação. Os excerpts ausentes voltam para conteúdo markdown despojado (~160 caracteres) em cartões de listagem, meta descrições e RSS. B1App serve `/{sdSlug}/blog` — uma listagem editorial (cabeçalho centralizado que se torna o nome de categoria/tag ativa quando filtrado, linha de filtro de chip de categoria, linhas de post com miniaturas à esquerda com assinaturas e excerpts) com o feed RSS anunciado como um link alternativo — e `/{sdSlug}/blog/[postSlug]`, uma rota dedicada (não o pipeline Zone/Section) com um cabeçalho centralizado (kicker de categoria, título, assinatura, regra de acento de cor primária), um herói 16:9 na largura do contêiner, o corpo markdown em uma coluna de leitura de ~720px, chips de tag no rodapé do artigo, uma faixa `"More in {category}"` de posts relacionados e JSON-LD `BlogPosting` incluindo o autor. Ambas as páginas estilizam inteiramente de tokens de tema, então herdam a paleta de cada igreja. As URLs do blog são incluídas no sitemap por igreja. A UI de autoria do B1Admin (**Site → Blog**) edita posts em um diálogo: editor markdown com alternância de visualização, seletor de imagem de galeria cortada 16:9, seletor de pessoa de autor (padrão para o usuário de edição), autocompletar de categoria propagado a partir de categorias existentes, validação de slug duplicado e um alternador de publicação; linhas publicadas se vinculam ao post ao vivo, e a página incentiva admins a adicionar um link de navegação `/blog`.

## Páginas apenas para membros

`pages.visibility` reutiliza a enumeração de links de navegação — `everyone` (padrão), `visitors`, `members`, `staff`, `team`, `groups` (com `groupIds`) — mas como um **portão de acesso rígido**, não um filtro de navegação (`PageVisibilityHelper.canViewPage`). O fluxo:

1. O endpoint de árvore anônimo verifica visibilidade em buscar baseadas em URL. Os chamadores anônimos de uma página controlada obtêm `{ restricted: true, visibility }` em vez de conteúdo — a árvore nunca vaza.
2. O endpoint ainda honra um JWT: `CustomAuthProvider` verifica o cabeçalho `Authorization` em *todas* as solicitações, incluindo rotas anônimas, então a busca de um membro autenticado da mesma URL se resolve normalmente.
3. B1App renderiza `RestrictedPage` em uma resposta `restricted`: ele hidrata a sessão das credenciais armazenadas, busca novamente a árvore com o JWT e a renderiza — ou mostra um portão de login com um `returnUrl` quando não há sessão.

:::info
A granularidade do portão varia por nível: `groups` verifica os `groupIds` do token contra a lista da página e `staff` verifica `membershipStatus`, mas `members` e `team` atualmente passam qualquer usuário autenticado da igreja. Trate `groups` como a opção rigorosa.
:::

## SEO e descoberta

Tudo isso é renderização no lado B1App sobre dados do ContentApi — a API armazena, o aplicativo emite:

| Preocupação | Como funciona |
|---------|--------------|
| Meta descrições | `pages.metaDescription` (≤300 chars) flui através de `MetaHelper.getMetaData()` nos metadados Next.js `Metadata` (descrição + Open Graph) em cada rota renderizada pelo construtor. As configurações de página do B1Admin incluem um botão "Gerar" de IA (veja abaixo) |
| Redirecionamentos | Linhas `redirects` por igreja gerenciadas em `/content/redirects` (`content.edit`, limite de 200 linhas, caminhos normalizados). Em um possível 404, a rota de página do B1App resolve o caminho contra `GET /content/redirects/public/:churchId` e emite um HTTP 308 através do `permanentRedirect` do Next; os caminhos não correspondidos caem através de `notFound()` |
| 404 marcado | `not-found.tsx` renderiza `BrandedNotFound` com o logo, nome e tema da igreja em vez de um erro genérico |
| Dados estruturados | JSON-LD `BlogPosting` em posts de blog; `VideoObject` nas páginas por sermão (`/{sdSlug}/sermons/[sermonId]`) e em páginas contendo um elemento `sermons`; `Event` de elementos de calendário/evento em páginas do construtor; `Event` schema.org a partir do elemento `serviceTimes` |
| Páginas de sermão | Todo sermão público obtém uma página rastreável em `/sermons/[sermonId]` com metadados completos — os sermões não estão mais bloqueados dentro do elemento de navegador do lado do cliente |
| Análise | A chave de configuração pública `ga4MeasurementId` (gerenciada ao lado de redirecionamentos no B1Admin) injeta um gtag GA4 por igreja via `next/script` |
| Sitemap & feeds | A rota `sitemap.xml` por igreja inclui páginas do construtor e URLs de blog; a listagem de blog anuncia o feed RSS |
| Acessibilidade | O chrome público renderiza um link de salto direcionado para o marco `<main id="main-content">` em cada wrapper de layout |

## Geração de IA (AskApi)

A geração de página e site funciona em **AskApi**, um serviço separado, sob o controlador `/website`. Ele autentica com o mesmo JWT `CustomAuthProvider` como tudo mais e é **sem estado com respeito ao conteúdo**: cada endpoint retorna JSON e o chamador (B1Admin) persiste o resultado através do ContentApi (`POST /content/pages/importTree` cria uma página com sua árvore completa de seção/elemento aninhada em uma chamada; sempre insere sob a igreja do chamador e ignora ids no corpo).

### Geração de página (`planPage` → `writePage`)

O modelo "AI" de página em B1Admin's `AddPageModal` usa um pipeline de baixo custo (`AskApi/src/helpers/SiteGenHelper.ts`) construído em uma regra: **nenhum modelo jamais emite JSON do construtor**. Dois modelos dividem o trabalho através do Gateway de IA Vercel (HTTP simples, chave SSM `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — um modelo de decisão tipado que retorna escolhas, pontuações e booleanos com probabilidades, mas não pode escrever texto. Ele escolhe cada seção por sua vez a partir de uma biblioteca de modelo fixo, pontuações de layouts, verifica fatos de cópia e escolhe fotos de estoque e ícones. Os custos de entrada custam cerca de $0,04 por milhão de tokens e a saída é gratuita, então ~90 chamadas por página custam uma fração de um centavo.
- **Um pequeno modelo de chat (GPT-4.1 mini por padrão)** — preenche os slots de texto nomeados e limitados em comprimento dos modelos escolhidos. O escritor é uma constante, substituível com a variável de ambiente `SITEGEN_COPY_MODEL` (qualquer id de modelo de chat no gateway, por ex. `anthropic/claude-haiku-4.5`). Em um lado a lado cego em três igrejas Claude Haiku 4.5 leu um pouco mais caloroso, mas GPT-4.1 mini foi perto, aproximadamente 4x mais barato e mais rápido, então é o padrão. Uma página completa com todos os três layouts custa cerca de 1,3 centavos, cerca de 80% disso o escritor.

| Fase | Endpoint | O que acontece |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classifica o tipo de página (casa, visita, sobre…), então mostra 10 layouts candidatos das probabilidades por rodada do JEV (herói + contagem de seção → cada seção → mais perto), remove duplicatas, tem JEV pontuação cada para caber/fluxo/lacunas e retorna os 3 melhores mais uma voz de escrita e um `suggestedStyle` (paleta + fontes). Os candidatos que compartilham as mesmas seções até agora fazem ao JEV uma pergunta idêntica, então as rodadas são memoizadas por prefixo. Uma melhor pontuação abaixo de 6 é registrada como `lowLayoutScore` — esse log é o backlog de modelos que valem a pena adicionar. ~2s |
| 2 | `POST /website/writePage` (uma chamada por candidato) | O escritor preenche a cópia do slot de duas seções por chamada, em paralelo, e retorna cinco manchetes de herói que o JEV escolhe entre; JEV verifica fatos de cada seção; seções que falham, usam uma frase de estoque ou re-contam uma seção anterior (executar 4 palavras compartilhadas, verificadas no código) são reescritas em paralelo com a razão específica; uma limpeza de código cai sentenças com frases de site de igreja de estoque (a menos que a descrição da própria igreja as use); JEV escolhe assuntos de foto, ícones e o divisor de forma do herói, e pontuações o resultado. Retorna uma árvore de seção pronta para salvar e uma pontuação. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin escreve apenas o layout com melhor classificação (o vice é um fallback se essa escrita falhar), salva e abre a visualização (~10s após Save) |

Cada fase é sua própria solicitação, então cada chamada fica dentro do limite de 29 segundos do API Gateway. Os modelos em `SiteGenHelper.buildTree` são árvores de seção + elemento fixas a partir do catálogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e referenciam tokens de tema (`var(--accent)`, `var(--lightAccent)`…), então páginas geradas herdam as configurações de aparência existentes da igreja. Adicionar um modelo de seção significa adicionar sua lista de slot a `SECTIONS` e sua árvore a `buildTree`; o teste de unidade percorre cada modelo e valida a árvore.

**Entradas.** A cópia pode apenas indicar fatos de duas fontes: o que o usuário digitou e `churchContext.facts` — registros que B1Admin reúne antes do planejamento (horários de serviço públicos e nomes de grupo públicos, mais o nome e endereço da igreja). Os mesmos sinalizadores portão modelos apoiados por dados: `times` renderiza o elemento `serviceTimes` ao vivo quando a igreja mantém horários de serviço no B1 (uma tabela digitada de outra forma), `groups` e `countdown` são oferecidos apenas quando há dados por trás deles. As chamadas do JEV são protegidas — um duplicado dispara após 1,5s e a primeira resposta vence — porque o gateway ocasionalmente trava e as chamadas são quase gratuitas.

**Mantendo-se no assunto.** O prompt do usuário é o *assunto da página*, não antecedentes sobre a igreja. `planPage` classifica a solicitação (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e para páginas `event` e `topic` os modelos gerais da igreja (nota do pastor, sermões, ministérios, grupos, impacto comunitário, tempos semanais e contagem regressiva, herói de vídeo) não são sequer oferecidos, enquanto `details` (quando / onde / o que trazer) e um `eventCountdown` de data são. Ambos os juízes pontuam sobre relevância de tópico. B1Admin passa `pageType` do plano em cada chamada `writePage`.

**Páginas completas de pedidos curtos.** As páginas têm três a seis seções do meio, comprimentos de slot generosos, uma linha de intro em seções de cartão e uma FAQ de cinco perguntas, e o passe de reparo expande qualquer seção que volta fina. A geração é um clique: não há perguntas de acompanhamento. Onde a solicitação deixa de fora um detalhe comum que uma página completa precisa (uma hora de início, uma sala, o que trazer, como se inscrever), o escritor a preenche com uma escolha modesta e plausível para a igreja editar. Como as seções são escritas em paralelo, essas lacunas são decididas **uma vez**, em `planPage` (`assumedDetails`, uma pequena chamada de escritor que funciona junto com a amostragem de layout), e passa de volta em cada chamada `writePage` através de `churchContext.assumedDetails`, então uma seção não pode dizer 5:00 enquanto outra diz 5:30. O JEV repara qualquer seção que contradiz a solicitação, os registros da igreja ou esses detalhes decididos. Os detalhes decididos não são superficiais na UI; a igreja revisa e edita a página como qualquer outra. Algumas coisas nunca são inventadas: nomes de pessoas, números de telefone, email e endereços web, preços, estatísticas, a história da igreja, citações atribuídas a pessoas, e um dia da semana para uma data que a solicitação não deu um para.

**Visuais.** Os modelos nunca nomeiam suas fotos ou ícones. Deixam slots abertos e um passe genérico (`visualSlots` → `pickVisuals` → `applyVisuals` em `SiteGenHelper`) percorre a árvore acabada e preenche cada um: um fundo de seção ou entrada de galeria marcada `auto:photo`, um `auto:icon`, `auto:divider` do herói e, sem marcador nenhum, qualquer elemento `textWithPhoto`, `card` ou `image` cuja `photo` está vazia. O JEV escolhe cada um do texto ao lado dele (uma foto de cartão a partir do título e texto desse cartão; um fundo da cópia da seção), sem assunto repetido em uma página. Um modelo novo portanto obtém fotos gratuitamente. As fotos são assuntos de pesquisa Pexels emitidos como placeholders `pexels:<term>` que B1Admin resolve através de `POST /content/stock/search`; um cliente que não envia `resolvesPhotos` obtém uma imagem herói incorporada, bandas de cor plano e cartões sem foto em vez disso. Não há intencionalmente assuntos de retrato e o modelo de pastor não carrega foto: um estranho de estoque nunca deve ficar no lugar de uma pessoa real. Para uma igreja sem páginas ainda, B1Admin aplica `suggestedStyle` aos estilos globais; sites existentes mantêm sua aparência.

### Outros endpoints

:::info
O botão de reescrita `SectionToolbar` e o botão "Gerar Site" da lista de páginas no B1Admin permanecem comentados no lado do cliente. Os endpoints da AskApi abaixo ainda respondem; apenas essa UI fica oculta.
:::

| Endpoint | Propósito |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | O fluxo de página de duas etapas original (contorno, então uma chamada LLM por seção emitindo JSON de elemento). Supersedido no B1Admin por `planPage`/`writePage` por razões de custo; mantido para consumidores de API |
| `POST /website/generateSite` | Geração de site inteiro. **Duas fases por design**: uma chamada `planOnly: true` retorna apenas o plano multi-página (uma chamada de modelo rápido), então o cliente solicita conteúdo completo — mantendo cada solicitação dentro do timeout Lambda/API-Gateway |
| `POST /website/rewriteSection` | Reescrita preservadora de estrutura: o modelo pode apenas alterar respostas que carregam texto. Uma assinatura de estrutura recursiva (ids + tipos + ordem) é comparada antes e depois; qualquer incompatibilidade retorna a seção original com `fallback: true` em vez de estrutura corrompida |
| `POST /website/generateAltText` | Chamada de visão sobre até 20 URLs de imagem; retorna texto alt conciso (≤125 chars, prefixos "foto de" removidos) |
| `POST /website/generateMetaDescription` | Uma meta descrição SEO (≤155 chars) a partir do conteúdo de texto da página — conectada ao botão Gerar nas configurações de página do B1Admin |

Os prompts para esses endpoints são arquivos markdown em `AskApi/config/instructions/`, incluindo o catálogo de elemento a partir do qual o modelo gera. Dois pontos de design mantêm o catálogo honesto: o cliente passa `availableElementTypes` em cada solicitação (o prompt pode usar apenas tipos dessa lista — o servidor nunca codifica o conjunto completo) e a ferramenta MCP `describe_page_builder` da API carrega o mesmo guia para agentes de IA trabalhando através de [MCP](../api/mcp). Os modelos são Claude Anthropic através de OpenRouter — 3.5 Haiku para conteúdo de seção (latência), 3.5 Sonnet para contornos, planos de site e visão — com um fallback OpenAI quando nenhuma chave OpenRouter é configurada.

## Formulários conversacionais

Os formulários (módulo de associação) ganharam um modo conversacional direcionado a páginas de estilo cartão de conexão. Quatro colunas em `forms` levam isso: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderização** — o `FormSubmissionEdit` do apphelper muda para o componente `ConversationalForm` (uma pergunta de cada vez) quando `displayMode` é `conversational`; a página de formulário do B1App passa o modo através. Mesmo payload de envio de qualquer forma.
- **Criar pessoa automaticamente** — no envio com `autoCreatePerson` definido, `ConversationalFormHelper.findOrCreatePerson` deduplica por email (case-insensitive) e caso contrário cria um agregado + pessoa com `membershipStatus: "Guest"`, então vincula o envio a essa pessoa.
- **Email de acompanhamento** — quando um assunto e corpo estão definidos, o submissor obtém um email em modelo (com tokens `{firstName}` / `{churchName}`) através do caminho transacional existente (`TransactionalEmailHelper`), nunca a porta de digestão de notificação. Ambas as side-effects são não-fatais: uma falha nunca perde o envio.

Os quatro campos são definidos através da API hoje; o editor de formulário do B1Admin ainda não os expõe.

## Cache do site público

O caminho de renderização público do B1App armazena buscas marcadas com igreja (`next: { revalidate: 300, tags: [sdSlug] }` em produção; `0` em dev) para que uma página ativa permaneça obsoleta por até cinco minutos após uma escrita do ContentApi. `POST /api/revalidate/{sdSlug}` no B1App chama `revalidateTag(sdSlug)` e é a única maneira de descartar esse cache mais cedo.

Dois escritores o atingem:

1. **B1Admin** — `clearSiteCache()` em `B1Admin/src/site/siteCache.ts` POSTs após salva do editor. Ele prefere o subdomínio do site ativo (um site secundário deve derrotar *aquele* tag, não o padrão da igreja).
2. **Api** — Mutações de conteúdo que nunca passam por B1Admin (chaves API, MCP, IA) disparam `SiteCacheHelper.bump(churchId)` a partir dos controladores de conteúdo. O auxiliar resolve o subdomínio da igreja via `SubDomainHelper` e POSTs `{b1AppRoot}/api/revalidate/{sd}`. As falhas são engolidas para que um B1App inacessível não possa fazer uma falha de salvamento.

Controladores que atingem: páginas (salvar, deletar, duplicar, publicar, descartar, despublicar, IA temporária), seções, elementos, blocos, links, estilos globais, posts e redirecionamentos. Dev `b1AppRoot` é `http://{subdomain}.localtest.me:3301`; demo/staging/prod usam `https://{subdomain}.b1.church`.

## Páginas Relacionadas

- [Website Routing & Multi-Site](./websites) — como uma solicitação resolve para uma igreja/site e como domínios personalizados roteam
- [Content Endpoints](../api/endpoints/content) — superfície REST completa para páginas, seções, elementos, blocos, posts, redirecionamentos e configurações
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que envia os renderizadores, registro, divisores e widgets
- [MCP Server](../api/mcp) — incluindo a ferramenta de guia `describe_page_builder`
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — a documentação do editor voltada para a equipe
