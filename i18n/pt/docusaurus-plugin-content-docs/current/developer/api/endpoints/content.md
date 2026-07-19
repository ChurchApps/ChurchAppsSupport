---
title: "Endpoints de Conteúdo"
---

# Endpoints de Conteúdo

<div class="article-intro">

O módulo de Conteúdo gerencia páginas do site, seções, elementos, blocos, posts de blog, redirecionamentos, sermões, listas de reprodução, serviços de streaming, eventos, calendários curados, arquivos, galerias, traduções da Bíblia e buscas de versículos, músicas, arranjos, estilos globais, fotos de estoque e configurações. É o maior módulo na API e alimenta o CMS, recursos de mídia/streaming, planejamento de adoração e recursos da Bíblia em todos os aplicativos ChurchApps.

</div>

**Caminho base:** `/content`

## Páginas

Caminho base: `/content/pages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Carregar árvore de página completa (seções, elementos, blocos) por URL ou ID. Remove IDs internos quando buscados por URL. Buscas baseadas em URL aplicam `pages.visibility` -- uma página com porta retorna `{ restricted: true, visibility }` a menos que o JWT (opcional) satisfaça a porta |
| GET | `/public/:churchId` | Public | — | Listar páginas públicas (`url`, `title`, `metaDescription`); apenas `visibility = everyone` |
| GET | `/:id` | JWT | — | Obter uma página por ID |
| GET | `/` | JWT | — | Listar todas as páginas da igreja |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar uma página com todas as seções e elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Salvar uma página gerada por IA (página, seções e elementos em uma chamada) |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar páginas (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar uma página |

### Exemplo: Carregar Árvore de Página

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Seções

Caminho base: `/content/sections`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma seção por ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicar uma seção ou convertê-la em um bloco reutilizável |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar seções (lote). Atualiza automaticamente a ordem de classificação |
| DELETE | `/:id` | JWT | Content.Edit | Deletar uma seção (atualiza automaticamente a ordem de classificação) |

## Elementos

Caminho base: `/content/elements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar um elemento com todos os filhos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar elementos (lote). Gerencia automaticamente colunas de linha e slides de carrossel |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um elemento |

## Blocos

Caminho base: `/content/blocks`

Estende CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um bloco por ID |
| GET | `/` | JWT | — | Listar todos os blocos |
| GET | `/:churchId/tree/:id` | Public | — | Carregar árvore de bloco completa com seções e elementos |
| GET | `/blockType/:blockType` | JWT | — | Carregar blocos por tipo (por ex. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Carregar árvore de bloco de rodapé para uma igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar blocos |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um bloco |

## Links

Caminho base: `/content/links`

Estende CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um link por ID |
| GET | `/` | JWT | — | Listar todos os links. Filtro opcional `?category=`. Classifica automaticamente após salvar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carregar links filtrados por visibilidade (todos, visitantes, membros, equipe, grupos) |
| GET | `/church/:churchId?category=` | Public | — | Carregar links para uma igreja por categoria (pública) |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar links (lote). Classifica automaticamente por categoria |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um link |

## Estilos Globais

Caminho base: `/content/globalStyles`

Estende CRUD padrão (POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/church/:churchId` | Public | — | Carregar estilos globais para uma igreja (retorna padrões se nenhum definido) |
| GET | `/` | JWT | — | Carregar estilos globais para a igreja autenticada |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar estilos globais |
| DELETE | `/:id` | JWT | Content.Edit | Deletar estilos globais |

## Histórico de Página

Caminho base: `/content/pageHistory`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listar entradas de histórico para uma página |
| GET | `/block/:blockId` | JWT | Content.Edit | Listar entradas de histórico para um bloco |
| GET | `/:id` | JWT | Content.Edit | Obter uma entrada de histórico por ID |
| POST | `/` | JWT | Content.Edit | Salvar um snapshot de página/bloco. Limpa periodicamente entradas com mais de 30 dias |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurar uma página/bloco de um snapshot de histórico (deleta conteúdo atual e recria do snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurar de um objeto de snapshot inline. Corpo: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Caminho base: `/content/posts`

Posts de blog são metadados sobre páginas regulares: o `pageId` de cada post referencia a página que contém o corpo, e a linha de post adiciona `title`, `slug` (único por igreja), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Um post é publicado uma vez que `publishDate` é definido e está no passado. Veja [Arquitetura do Construtor de Sites](../../architecture/website-builder#blog-posts-over-pages).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Listar posts publicados, paginados (máx. 50 por página) |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obter metadados do post publicado por slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Feed RSS 2.0 de posts publicados (links construídos como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obter um post por ID |
| GET | `/` | JWT | — | Listar todos os posts da igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar posts (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um post |

## Redirecionamentos

Caminho base: `/content/redirects`

Redirecionamentos de URL por igreja (`fromPath` → `toPath`), limitados a 200 por igreja. Caminhos são normalizados (minúsculas, barra inicial, sem barra final) e `fromPath` é único por igreja. B1App resolve estes em 404s que de outra forma ocorreriam e emite um HTTP 308.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/public/:churchId?path=` | Public | — | Resolver um caminho (ou listar todos os redirecionamentos quando `path` é omitido) |
| GET | `/:id` | JWT | — | Obter um redirecionamento por ID |
| GET | `/` | JWT | — | Listar todos os redirecionamentos da igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar redirecionamentos. Rejeita `fromPath = toPath` e aplica o limite de 200 linhas |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um redirecionamento |

## Sermões

Caminho base: `/content/sermons`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/public/freeshowSample` | JWT | — | Obter uma estrutura de lista de reprodução FreeShow de exemplo |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obter envoltório de app de TV com fontes de sermão, lição e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obter um único sermão como um feed de TV de lista de reprodução |
| GET | `/public/tvFeed/:churchId` | Public | — | Obter todas as listas de reprodução/sermões públicas como um feed de TV |
| GET | `/public/:churchId` | Public | — | Listar todos os sermões públicos de uma igreja |
| GET | `/timeline?sermonIds=` | JWT | — | Carregar dados de linha do tempo para sermões |
| GET | `/lookup?videoType=&videoData=` | Public | — | Procurar metadados de sermão de YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Gerar sugestões de posts de mídia social com IA de legendas de sermão |
| GET | `/outline?url=&title=&author=` | JWT | — | Gerar esboço de lição com IA de uma URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importar vídeos de um canal do YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importar vídeos de um canal do Vimeo |
| GET | `/:id` | JWT | — | Obter um sermão por ID |
| GET | `/` | JWT | — | Listar todos os sermões |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar sermões (lote, suporta upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Deletar um sermão |

### Exemplo: Procurar um Sermão do YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Listas de Reprodução

Caminho base: `/content/playlists`

Estende CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base com permissão StreamingServices.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma lista de reprodução por ID |
| GET | `/` | JWT | — | Listar todas as listas de reprodução |
| GET | `/public/:churchId` | Public | — | Listar todas as listas de reprodução públicas para uma igreja |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar listas de reprodução (lote, suporta upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Deletar uma lista de reprodução |

## Serviços de Streaming

Caminho base: `/content/streamingServices`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obter ID de sala de chat do host criptografado para um serviço |
| GET | `/` | JWT | — | Listar todos os serviços de streaming. Limpa automaticamente serviços não recorrentes expirados e avança os recorrentes |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar serviços de streaming (lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Deletar um serviço de streaming (também limpa IPs bloqueados) |

## Eventos

Caminho base: `/content/events`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carregar eventos de linha do tempo para um grupo |
| GET | `/timeline?eventIds=` | JWT | — | Carregar eventos de linha do tempo para os grupos do usuário atual |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Se inscrever em eventos como feed de calendário ICS |
| GET | `/group/:groupId` | JWT | — | Obter eventos para um grupo (inclui datas de exceção) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obter eventos públicos para um grupo |
| GET | `/:id` | JWT | — | Obter um evento por ID |
| POST | `/` | JWT | — | Criar ou atualizar eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um evento |

## Exceções de Eventos

Caminho base: `/content/eventExceptions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma exceção de evento por ID |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar exceções de evento (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar uma exceção de evento |

## Calendários Curados

Caminho base: `/content/curatedCalendars`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um calendário curado por ID |
| GET | `/` | JWT | — | Listar todos os calendários curados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar calendários curados (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um calendário curado |

## Eventos Curados

Caminho base: `/content/curatedEvents`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obter eventos curados para um calendário (inclui detalhes de evento e datas de exceção a menos que `?withoutEvents` esteja definido) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obter eventos curados públicos para um calendário |
| GET | `/:id` | JWT | — | Obter um evento curado por ID |
| GET | `/` | JWT | — | Listar todos os eventos curados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar eventos curados. Suporta array `eventIds` para adicionar eventos de grupo específicos |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Remover um evento específico de um calendário curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Remover todos os eventos de um grupo de um calendário curado |

## Arquivos

Caminho base: `/content/files`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:contentType/:contentId` | JWT | — | Obter arquivos por tipo de conteúdo e ID de conteúdo |
| GET | `/` | JWT | — | Listar todos os arquivos do site da igreja |
| GET | `/:id` | JWT | — | Obter um arquivo por ID |
| POST | `/` | JWT | Content.Edit* | Carregar arquivos (base64). *Também permitido se o usuário for membro do grupo que corresponde a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obter URL de upload S3 pré-assinada. *Também permitido para membros do grupo. Máximo 100MB por item de conteúdo |
| DELETE | `/:id` | JWT | Content.Edit* | Deletar um arquivo e remover do armazenamento. *Também permitido para membros do grupo |

## Galeria

Caminho base: `/content/gallery`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/stock/:folder` | Public | — | Listar fotos de estoque em uma pasta |
| GET | `/:folder` | JWT | Content.Edit | Listar imagens de galeria em uma pasta |
| POST | `/requestUpload` | JWT | Content.Edit | Obter URL de upload S3 pré-assinada para uma imagem de galeria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Deletar uma imagem de galeria |

## Bíblias

Caminho base: `/content/bibles`

Todos os endpoints da Bíblia são públicos (nenhuma autenticação necessária). Os dados são buscados de fontes externas e armazenados em cache localmente.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | Public | — | Listar todas as traduções da Bíblia (busca da fonte se o cache estiver vazio) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obter estatísticas de busca de Bíblia para um intervalo de datas |
| GET | `/availableTranslations/:source` | Public | — | Listar traduções disponíveis de uma fonte (por ex. api.bible) |
| GET | `/updateTranslations` | Public | — | Sincronizar todas as traduções de todas as fontes |
| GET | `/updateTranslations/:source` | Public | — | Sincronizar traduções de uma fonte específica |
| GET | `/updateCopyrights` | Public | — | Atualizar informações de direitos autorais para traduções faltando |
| GET | `/:translationKey/updateCopyright` | Public | — | Atualizar direitos autorais para uma tradução específica |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Procurar versículos em uma tradução |
| GET | `/:translationKey/books` | Public | — | Obter livros para uma tradução (armazena em cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obter capítulos para um livro (armazena em cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obter versículos para um capítulo (armazena em cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obter texto versícular para um intervalo. Registra buscas. Algumas traduções ignoram o cache para licenciamento |

### Exemplo: Obter Texto Versícular

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Músicas

Caminho base: `/content/songs`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/search?q=` | JWT | — | Procurar músicas por consulta |
| GET | `/:id` | JWT | — | Obter uma música por ID |
| GET | `/` | JWT | Content.Edit | Listar todas as músicas |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar músicas (lote) |
| POST | `/import` | JWT | — | Importar músicas do FreeShow (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar uma música |

## Detalhes da Música

Caminho base: `/content/songDetails`

Detalhes da música são globais (não no escopo da igreja). Estes representam metadados canônicos de música compartilhados entre igrejas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter detalhes da música por ID (global) |
| GET | `/` | JWT | — | Listar detalhes da música da igreja |
| POST | `/create` | JWT | — | Criar detalhes da música do ID PraiseCharts (retorna existente se já criado). Busca automaticamente metadados de PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Criar ou atualizar detalhes da música (lote) |

## Links de Detalhes da Música

Caminho base: `/content/songDetailLinks`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um link de detalhe da música por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obter todos os links para um detalhe de música |
| POST | `/` | JWT | — | Criar ou atualizar links de detalhe da música (lote). Busca automaticamente dados de MusicBrainz se vinculado |
| DELETE | `/:id` | JWT | — | Deletar um link de detalhe da música |

## Arranjos

Caminho base: `/content/arrangements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um arranjo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obter arranjos para uma música |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obter arranjos para um detalhe de música |
| GET | `/` | JWT | Content.Edit | Listar todos os arranjos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar arranjos (lote) |
| POST | `/freeShow/missing` | JWT | — | Encontrar IDs do FreeShow que não existem na igreja. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um arranjo (também deleta chaves; deleta a música se nenhum arranjo permanecer) |

## Chaves de Arranjo

Caminho base: `/content/arrangementKeys`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/presenter/:churchId/:id` | Public | — | Obter chave de arranjo com dados completos de música para visualização de apresentador |
| GET | `/:id` | JWT | — | Obter uma chave de arranjo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obter chaves para um arranjo |
| GET | `/` | JWT | Content.Edit | Listar todas as chaves de arranjo |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar chaves de arranjo (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar uma chave de arranjo |

## Configurações

Caminho base: `/content/settings`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/my` | JWT | — | Obter configurações do usuário atual |
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Public | — | Obter configurações públicas para uma igreja (retornadas como pares chave-valor) |
| POST | `/my` | JWT | — | Salvar configurações de nível de usuário (suporta upload de imagem em base64) |
| POST | `/` | JWT | Settings.Edit | Salvar configurações de nível de igreja (suporta upload de imagem em base64) |
| DELETE | `/my/:id` | JWT | — | Deletar uma configuração de usuário |

## Visualizar

Caminho base: `/content/preview`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/data/:key` | Public | — | Carregar dados de visualização de streaming para uma igreja por chave de subdomínio (abas, links, serviços, sermões) |

## Galeria (Fotos de Estoque)

Caminho base: `/content/stock`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/search` | Public | — | Procurar fotos de estoque do Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Caminho base: `/content/praiseCharts`

Integração com PraiseCharts para descoberta de música de adoração e downloads de partituras.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/raw/:id` | JWT | — | Obter dados brutos de PraiseCharts para uma música |
| GET | `/hasAccount` | JWT | — | Verificar se o usuário tem uma conta PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Procurar no catálogo do PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obter produtos para uma música (da biblioteca se autenticado, caso contrário catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obter dados de arranjo brutos da biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Baixar um arquivo do PraiseCharts (PDF ou ZIP). Retorna `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obter URL de autorização OAuth para PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Trocar verificador OAuth por token de acesso e salvar em configurações de usuário |
| GET | `/library` | JWT | — | Procurar a biblioteca do PraiseCharts do usuário |

## Suporte

Caminho base: `/content/support`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/createAudio` | Public | — | Converter SSML para áudio MP3 usando AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Arquitetura do Construtor de Sites](../../architecture/website-builder) -- Como páginas, seções, elementos, posts e redirecionamentos se encaixam nos aplicativos
- [Endpoints de Membros](./membership) -- Pessoas, igrejas, grupos, funções, permissões
- [Endpoints de Presença](./attendance) -- Rastreamento de serviço e visita
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, modelo de permissões
- [Estrutura de Módulo](../module-structure) -- Padrões de organização de código
