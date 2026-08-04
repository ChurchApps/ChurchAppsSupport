---
title: "Endpoints de Conteúdo"
---

# Endpoints de Conteúdo

<div class="article-intro">

O módulo de Conteúdo gerencia páginas de site, seções, elementos, blocos, posts de blog, redirecionamentos, sermões, playlists, serviços de streaming, eventos, calendários selecionados, arquivos, galerias, traduções da Bíblia e buscas de versículos, músicas, arranjos, estilos globais, fotos de banco de imagens e configurações. É o maior módulo da API e alimenta o CMS, os recursos de mídia/streaming, o planejamento de louvor e os recursos da Bíblia em todos os aplicativos ChurchApps.

</div>

**Caminho base:** `/content`

## Páginas

Caminho base: `/content/pages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Carregar a árvore completa da página (seções, elementos, blocos) por URL ou ID. Remove IDs internos quando obtida por URL. Buscas baseadas em URL aplicam `pages.visibility` — uma página restrita retorna `{ restricted: true, visibility }` a menos que o JWT (opcional) satisfaça a restrição |
| GET | `/public/:churchId` | Public | — | Listar páginas públicas (`url`, `title`, `metaDescription`); apenas `visibility = everyone` |
| GET | `/:id` | JWT | — | Obter uma página por ID |
| GET | `/` | JWT | — | Listar todas as páginas da igreja |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar uma página com todas as seções e elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Salvar uma página gerada por IA (página, seções e elementos em uma única chamada) |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar páginas (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma página |

### Exemplo: Carregar a Árvore de uma Página

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
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter uma seção por ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicar uma seção ou convertê-la em um bloco reutilizável |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar seções (em lote). Atualiza automaticamente a ordem de classificação |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma seção (atualiza automaticamente a ordem de classificação) |

## Elementos

Caminho base: `/content/elements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter um elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar um elemento com todos os filhos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar elementos (em lote). Gerencia automaticamente colunas de linha e slides de carrossel |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um elemento |

## Blocos

Caminho base: `/content/blocks`

Estende o CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base, com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter um bloco por ID |
| GET | `/` | JWT | — | Listar todos os blocos |
| GET | `/:churchId/tree/:id` | Public | — | Carregar a árvore completa de um bloco com seções e elementos |
| GET | `/blockType/:blockType` | JWT | — | Carregar blocos por tipo (por exemplo, footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Carregar a árvore do bloco de rodapé de uma igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar blocos |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um bloco |

## Links

Caminho base: `/content/links`

Estende o CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base, com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter um link por ID |
| GET | `/` | JWT | — | Listar todos os links. Filtro opcional `?category=`. Classifica automaticamente após salvar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carregar links filtrados por visibilidade (todos, visitantes, membros, equipe, grupos) |
| GET | `/church/:churchId?category=` | Public | — | Carregar links de uma igreja por categoria (público) |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar links (em lote). Classifica automaticamente por categoria |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um link |

## Estilos Globais

Caminho base: `/content/globalStyles`

Estende o CRUD padrão (POST `/`, DELETE `/:id` da classe base, com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Carregar os estilos globais de uma igreja (retorna padrões se nenhum estiver definido) |
| GET | `/` | JWT | — | Carregar os estilos globais da igreja autenticada |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar estilos globais |
| DELETE | `/:id` | JWT | Content.Edit | Excluir estilos globais |

## Histórico de Páginas

Caminho base: `/content/pageHistory`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listar entradas de histórico de uma página |
| GET | `/block/:blockId` | JWT | Content.Edit | Listar entradas de histórico de um bloco |
| GET | `/:id` | JWT | Content.Edit | Obter uma entrada de histórico por ID |
| POST | `/` | JWT | Content.Edit | Salvar um snapshot de página/bloco. Limpa periodicamente entradas com mais de 30 dias |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurar uma página/bloco a partir de um snapshot do histórico (exclui o conteúdo atual e recria a partir do snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurar a partir de um objeto de snapshot inline. Corpo: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Caminho base: `/content/posts`

Os posts de blog são registros independentes: `title`, `slug` (único por igreja), `excerpt`, `content` (corpo em markdown), `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Um post é publicado assim que `publishDate` é definido e está no passado. Os endpoints de leitura enriquecem cada post com `authorName`, resolvido a partir de `authorId`. Veja [Arquitetura do Construtor de Sites](../../architecture/website-builder#blog).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Listar posts publicados, paginados (máx. 50 por página) |
| GET | `/public/:churchId/categories` | Public | — | Categorias distintas entre os posts publicados |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obter um post publicado por slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Feed RSS 2.0 dos posts publicados (links construídos como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obter um post por ID |
| GET | `/` | JWT | — | Listar todos os posts da igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar posts (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um post |

## Redirecionamentos

Caminho base: `/content/redirects`

Redirecionamentos de URL por igreja (`fromPath` → `toPath`), limitados a 200 por igreja. Os caminhos são normalizados (minúsculas, barra inicial, sem barra final) e `fromPath` é único por igreja. O B1App resolve esses redirecionamentos em possíveis 404s e emite um HTTP 308.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Resolver um caminho (ou listar todos os redirecionamentos quando `path` for omitido) |
| GET | `/:id` | JWT | — | Obter um redirecionamento por ID |
| GET | `/` | JWT | — | Listar todos os redirecionamentos da igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar redirecionamentos. Rejeita `fromPath = toPath` e aplica o limite de 200 linhas |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um redirecionamento |

## Sermões

Caminho base: `/content/sermons`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obter uma estrutura de playlist de exemplo do FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obter o wrapper do app de TV com fontes de sermões, lições e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obter um único sermão como playlist de feed de TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Obter todas as playlists/sermões públicos como feed de TV |
| GET | `/public/:churchId` | Public | — | Listar todos os sermões públicos de uma igreja |
| GET | `/timeline?sermonIds=` | JWT | — | Carregar dados de linha do tempo para sermões |
| GET | `/lookup?videoType=&videoData=` | Public | — | Buscar metadados de sermão no YouTube ou no Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Gerar sugestões de posts para redes sociais com IA a partir das legendas do sermão |
| GET | `/outline?url=&title=&author=` | JWT | — | Gerar esboço de lição com IA a partir de uma URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importar vídeos de um canal do YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importar vídeos de um canal do Vimeo |
| GET | `/:id` | JWT | — | Obter um sermão por ID |
| GET | `/` | JWT | — | Listar todos os sermões |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar sermões (em lote, com suporte a upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir um sermão |

### Exemplo: Buscar um Sermão do YouTube

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

## Playlists

Caminho base: `/content/playlists`

Estende o CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base, com permissão StreamingServices.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter uma playlist por ID |
| GET | `/` | JWT | — | Listar todas as playlists |
| GET | `/public/:churchId` | Public | — | Listar todas as playlists públicas de uma igreja |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar playlists (em lote, com suporte a upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir uma playlist |

## Serviços de Streaming

Caminho base: `/content/streamingServices`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obter o ID de sala de chat do apresentador criptografado para um serviço |
| GET | `/` | JWT | — | Listar todos os serviços de streaming. Limpa automaticamente serviços não recorrentes expirados e avança os recorrentes |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar serviços de streaming (em lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir um serviço de streaming (também limpa IPs bloqueados) |

## Eventos

Caminho base: `/content/events`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carregar eventos da linha do tempo de um grupo |
| GET | `/timeline?eventIds=` | JWT | — | Carregar eventos da linha do tempo dos grupos do usuário atual |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Inscrever-se em eventos como feed de calendário ICS |
| GET | `/group/:groupId` | JWT | — | Obter eventos de um grupo (inclui datas de exceção) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obter eventos públicos de um grupo |
| GET | `/:id` | JWT | — | Obter um evento por ID |
| POST | `/` | JWT | — | Criar ou atualizar eventos (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um evento |

## Exceções de Eventos

Caminho base: `/content/eventExceptions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter uma exceção de evento por ID |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar exceções de evento (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma exceção de evento |

## Calendários Selecionados

Caminho base: `/content/curatedCalendars`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter um calendário selecionado por ID |
| GET | `/` | JWT | — | Listar todos os calendários selecionados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar calendários selecionados (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um calendário selecionado |

## Eventos Selecionados

Caminho base: `/content/curatedEvents`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obter eventos selecionados de um calendário (inclui detalhes do evento e datas de exceção, a menos que `?withoutEvents` esteja definido) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obter eventos selecionados públicos de um calendário |
| GET | `/:id` | JWT | — | Obter um evento selecionado por ID |
| GET | `/` | JWT | — | Listar todos os eventos selecionados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar eventos selecionados. Suporta um array `eventIds` para adicionar eventos de grupo específicos |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um evento selecionado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Remover um evento específico de um calendário selecionado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Remover todos os eventos de um grupo de um calendário selecionado |

## Arquivos

Caminho base: `/content/files`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obter arquivos por tipo de conteúdo e ID de conteúdo |
| GET | `/` | JWT | — | Listar todos os arquivos do site da igreja |
| GET | `/:id` | JWT | — | Obter um arquivo por ID |
| POST | `/` | JWT | Content.Edit* | Enviar arquivos (base64). *Também permitido se o usuário for membro do grupo correspondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obter uma URL de upload pré-assinada do S3. *Também permitido para membros do grupo. Máximo de 100MB por item de conteúdo |
| DELETE | `/:id` | JWT | Content.Edit* | Excluir um arquivo e removê-lo do armazenamento. *Também permitido para membros do grupo |

## Galeria

Caminho base: `/content/gallery`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Listar fotos de banco de imagens em uma pasta |
| GET | `/:folder` | JWT | Content.Edit | Listar imagens da galeria em uma pasta |
| POST | `/requestUpload` | JWT | Content.Edit | Obter uma URL de upload pré-assinada do S3 para uma imagem da galeria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Excluir uma imagem da galeria |

## Bíblias

Caminho base: `/content/bibles`

Todos os endpoints da Bíblia são públicos (nenhuma autenticação necessária). Os dados são obtidos de fontes externas e armazenados em cache localmente.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Listar todas as traduções da Bíblia (busca na fonte se o cache estiver vazio) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obter estatísticas de busca da Bíblia para um intervalo de datas |
| GET | `/availableTranslations/:source` | Public | — | Listar traduções disponíveis de uma fonte (por exemplo, api.bible) |
| GET | `/updateTranslations` | Public | — | Sincronizar todas as traduções de todas as fontes |
| GET | `/updateTranslations/:source` | Public | — | Sincronizar traduções de uma fonte específica |
| GET | `/updateCopyrights` | Public | — | Atualizar informações de direitos autorais para traduções que não os têm |
| GET | `/:translationKey/updateCopyright` | Public | — | Atualizar os direitos autorais de uma tradução específica |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Buscar versículos em uma tradução |
| GET | `/:translationKey/books` | Public | — | Obter os livros de uma tradução (armazena em cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obter os capítulos de um livro (armazena em cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obter os versículos de um capítulo (armazena em cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obter o texto dos versículos de um intervalo. Registra as buscas. Algumas traduções ignoram o cache por questões de licenciamento |

### Exemplo: Obter o Texto de um Versículo

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
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Buscar músicas por consulta |
| GET | `/:id` | JWT | — | Obter uma música por ID |
| GET | `/` | JWT | Content.Edit | Listar todas as músicas |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar músicas (em lote) |
| POST | `/import` | JWT | — | Importar músicas do FreeShow (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma música |

## Detalhes de Música

Caminho base: `/content/songDetails`

Os detalhes de música são globais (não vinculados a uma igreja específica). Representam metadados canônicos de músicas compartilhados entre igrejas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter um detalhe de música por ID (global) |
| GET | `/` | JWT | — | Listar os detalhes de música da igreja |
| POST | `/create` | JWT | — | Criar um detalhe de música a partir de um ID do PraiseCharts (retorna o existente se já tiver sido criado). Busca automaticamente metadados no PraiseCharts e no MusicBrainz |
| POST | `/` | JWT | — | Criar ou atualizar detalhes de música (em lote) |

## Links de Detalhes de Música

Caminho base: `/content/songDetailLinks`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter um link de detalhe de música por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obter todos os links de um detalhe de música |
| POST | `/` | JWT | — | Criar ou atualizar links de detalhes de música (em lote). Busca automaticamente dados do MusicBrainz se estiver vinculado |
| DELETE | `/:id` | JWT | — | Excluir um link de detalhe de música |

## Arranjos

Caminho base: `/content/arrangements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obter um arranjo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obter os arranjos de uma música |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obter os arranjos de um detalhe de música |
| GET | `/` | JWT | Content.Edit | Listar todos os arranjos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar arranjos (em lote) |
| POST | `/freeShow/missing` | JWT | — | Encontrar IDs do FreeShow que não existem na igreja. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um arranjo (também exclui as tonalidades; exclui a música se não restar nenhum arranjo) |

## Tonalidades de Arranjo

Caminho base: `/content/arrangementKeys`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Obter uma tonalidade de arranjo com os dados completos da música para a visualização de apresentador |
| GET | `/:id` | JWT | — | Obter uma tonalidade de arranjo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obter as tonalidades de um arranjo |
| GET | `/` | JWT | Content.Edit | Listar todas as tonalidades de arranjo |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar tonalidades de arranjo (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma tonalidade de arranjo |

## Configurações

Caminho base: `/content/settings`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obter as configurações do usuário atual |
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Public | — | Obter as configurações públicas de uma igreja (retornadas como pares chave-valor) |
| POST | `/my` | JWT | — | Salvar configurações no nível do usuário (com suporte a upload de imagem em base64) |
| POST | `/` | JWT | Settings.Edit | Salvar configurações no nível da igreja (com suporte a upload de imagem em base64) |
| DELETE | `/my/:id` | JWT | — | Excluir uma configuração do usuário |

## Prévia

Caminho base: `/content/preview`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Carregar dados de prévia de streaming de uma igreja pela chave de subdomínio (abas, links, serviços, sermões) |

## Galeria (Fotos de Banco de Imagens)

Caminho base: `/content/stock`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Buscar fotos de banco de imagens no Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Caminho base: `/content/praiseCharts`

Integração com o PraiseCharts para descoberta de músicas de louvor e download de partituras.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obter dados brutos do PraiseCharts de uma música |
| GET | `/hasAccount` | JWT | — | Verificar se o usuário tem uma conta do PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Buscar no catálogo do PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obter produtos de uma música (da biblioteca, se autenticado; caso contrário, do catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obter dados brutos de arranjo da biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Baixar um arquivo do PraiseCharts (PDF ou ZIP). Retorna `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obter a URL de autorização OAuth do PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Trocar o verificador OAuth por um token de acesso e salvá-lo nas configurações do usuário |
| GET | `/library` | JWT | — | Navegar na biblioteca do PraiseCharts do usuário |

## Suporte

Caminho base: `/content/support`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Converter SSML em áudio MP3 usando o AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Arquitetura do Construtor de Sites](../../architecture/website-builder) -- Como páginas, seções, elementos, posts e redirecionamentos se encaixam nos aplicativos
- [Endpoints de Membros](./membership) -- Pessoas, igrejas, grupos, funções, permissões
- [Endpoints de Frequência](./attendance) -- Rastreamento de serviços e visitas
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, modelo de permissões
- [Estrutura do Módulo](../module-structure) -- Padrões de organização de código
