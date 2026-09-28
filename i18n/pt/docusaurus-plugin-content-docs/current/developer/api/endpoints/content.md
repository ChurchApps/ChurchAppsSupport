---
title: "Endpoints de Conteúdo"
---

# Endpoints de Conteúdo

<div class="article-intro">

O módulo de Conteúdo gerencia páginas do site, seções, elementos, blocos, posts de blog, redirecionamentos, sermões, playlists, serviços de streaming, eventos, calendários curados, arquivos, galerias, traduções da Bíblia e pesquisas de versículos, canções, arranjos, estilos globais, fotos de banco de imagens e configurações. É o maior módulo na API e alimenta o CMS, recursos de mídia/streaming, planejamento de adoração e recursos de Bíblia em todos os aplicativos ChurchApps.

</div>

**Caminho base:** `/content`

## Páginas

Caminho base: `/content/pages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Carrega a árvore de páginas completa (seções, elementos, blocos) por URL ou ID. Remove IDs internos quando buscados por URL. Buscas baseadas em URL implementam `pages.visibility` — uma página bloqueada retorna `{ restricted: true, visibility }` a menos que o JWT (opcional) satisfaça o bloqueio |
| GET | `/public/:churchId` | Public | — | Lista páginas públicas (`url`, `title`, `metaDescription`); apenas `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtém uma página por ID |
| GET | `/` | JWT | — | Lista todas as páginas da igreja |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica uma página com todas as seções e elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Salva uma página gerada por IA (página, seções e elementos em uma chamada) |
| POST | `/importTree` | JWT | Content.Edit | Cria uma página a partir de uma árvore aninhada (`title`, `url`, `sections[].elements[]…`). Sempre insere sob a igreja do chamador; ids no corpo são ignorados. Linhas devem incluir seus filhos `column`. Máximo 30 seções / 500 elementos |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza páginas (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma página |

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
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma seção por ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica uma seção ou a converte em um bloco reutilizável |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza seções (lote). Atualiza automaticamente a ordem de classificação |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma seção (atualiza automaticamente a ordem de classificação) |

## Elementos

Caminho base: `/content/elements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica um elemento com todos os filhos |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza elementos (lote). Gerencia automaticamente colunas de linha e slides de carrossel |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um elemento |

## Blocos

Caminho base: `/content/blocks`

Estende CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um bloco por ID |
| GET | `/` | JWT | — | Lista todos os blocos |
| GET | `/:churchId/tree/:id` | Public | — | Carrega árvore de bloco completa com seções e elementos |
| GET | `/blockType/:blockType` | JWT | — | Carrega blocos por tipo (ex.: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Carrega árvore de bloco de rodapé para uma igreja |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza blocos |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um bloco |

## Links

Caminho base: `/content/links`

Estende CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um link por ID |
| GET | `/` | JWT | — | Lista todos os links. Filtro `?category=` opcional. Classifica automaticamente após salvar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carrega links filtrados por visibilidade (todos, visitantes, membros, pessoal, grupos) |
| GET | `/church/:churchId?category=` | Public | — | Carrega links para uma igreja por categoria (público) |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza links (lote). Classifica automaticamente por categoria |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um link |

## Estilos Globais

Caminho base: `/content/globalStyles`

Estende CRUD padrão (POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Carrega estilos globais para uma igreja (retorna padrões se nenhum definido) |
| GET | `/` | JWT | — | Carrega estilos globais para a igreja autenticada |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza estilos globais |
| DELETE | `/:id` | JWT | Content.Edit | Exclui estilos globais |

## Histórico de Páginas

Caminho base: `/content/pageHistory`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lista entradas de histórico para uma página |
| GET | `/block/:blockId` | JWT | Content.Edit | Lista entradas de histórico para um bloco |
| GET | `/:id` | JWT | Content.Edit | Obtém uma entrada de histórico por ID |
| POST | `/` | JWT | Content.Edit | Salva um instantâneo de página/bloco. Limpa periodicamente entradas com mais de 30 dias |
| POST | `/restore/:id` | JWT | Content.Edit | Restaura uma página/bloco a partir de um instantâneo de histórico (exclui conteúdo atual e recria do instantâneo) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaura de um objeto instantâneo em linha. Corpo: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Caminho base: `/content/posts`

Posts de blog são linhas independentes: `title`, `slug` (único por igreja), `excerpt`, `content` (corpo markdown), `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Um post é publicado uma vez que `publishDate` é definido e está no passado. Os endpoints de leitura enriquecem cada post com `authorName` resolvido a partir de `authorId`. Veja [Arquitetura do Website Builder](../../architecture/website-builder#blog).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Lista posts publicados, paginados (máximo 50 por página) |
| GET | `/public/:churchId/categories` | Public | — | Categorias distintas em posts publicados |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtém um post publicado por slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Feed RSS 2.0 de posts publicados (links construídos como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtém um post por ID |
| GET | `/` | JWT | — | Lista todos os posts para a igreja |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza posts (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um post |

## Redirecionamentos

Caminho base: `/content/redirects`

Redirecionamentos de URL por igreja (`fromPath` → `toPath`), limitados a 200 por igreja. Os caminhos são normalizados (minúsculos, barra inicial, sem barra final) e `fromPath` é único por igreja. B1App resolve estes em 404s que de outra forma aconteceriam e emite um HTTP 308.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Resolve um caminho (ou lista todos os redirecionamentos quando `path` é omitido) |
| GET | `/:id` | JWT | — | Obtém um redirecionamento por ID |
| GET | `/` | JWT | — | Lista todos os redirecionamentos para a igreja |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza redirecionamentos. Rejeita `fromPath = toPath` e implementa o limite de 200 linhas |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um redirecionamento |

## Sermões

Caminho base: `/content/sermons`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtém uma estrutura de playlist FreeShow de exemplo |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtém envoltório de app de TV com fontes de sermão, lição e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obtém um único sermão como uma playlist de feed de TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Obtém todas as playlists/sermões públicos como um feed de TV |
| GET | `/public/:churchId` | Public | — | Lista todos os sermões públicos para uma igreja |
| GET | `/timeline?sermonIds=` | JWT | — | Carrega dados de linha do tempo para sermões |
| GET | `/lookup?videoType=&videoData=` | Public | — | Pesquisa metadados de sermão no YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Gera sugestões de post de mídia social com IA a partir de legendas de sermão |
| GET | `/outline?url=&title=&author=` | JWT | — | Gera esboço de lição com IA a partir de uma URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa vídeos de um canal YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa vídeos de um canal Vimeo |
| GET | `/:id` | JWT | — | Obtém um sermão por ID |
| GET | `/` | JWT | — | Lista todos os sermões |
| POST | `/` | JWT | StreamingServices.Edit | Cria ou atualiza sermões (lote, suporta upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Exclui um sermão |

### Exemplo: Pesquisar um Sermão do YouTube

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

Estende CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base com permissão StreamingServices.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma playlist por ID |
| GET | `/` | JWT | — | Lista todas as playlists |
| GET | `/public/:churchId` | Public | — | Lista todas as playlists públicas para uma igreja |
| POST | `/` | JWT | StreamingServices.Edit | Cria ou atualiza playlists (lote, suporta upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Exclui uma playlist |

## Serviços de Streaming

Caminho base: `/content/streamingServices`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtém ID de sala de chat de host criptografado para um serviço |
| GET | `/` | JWT | — | Lista todos os serviços de streaming. Limpa automaticamente serviços expirados não recorrentes e avança os recorrentes |
| POST | `/` | JWT | StreamingServices.Edit | Cria ou atualiza serviços de streaming (lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Exclui um serviço de streaming (também limpa IPs bloqueados) |

## Eventos

Caminho base: `/content/events`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carrega eventos de linha do tempo para um grupo |
| GET | `/timeline?eventIds=` | JWT | — | Carrega eventos de linha do tempo para os grupos do usuário atual |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Inscreve-se em eventos como feed de calendário ICS |
| GET | `/group/:groupId` | JWT | — | Obtém eventos para um grupo (inclui datas de exceção) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obtém eventos públicos para um grupo |
| GET | `/:id` | JWT | — | Obtém um evento por ID |
| POST | `/` | JWT | — | Cria ou atualiza eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um evento |

## Exceções de Eventos

Caminho base: `/content/eventExceptions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma exceção de evento por ID |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza exceções de eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma exceção de evento |

## Calendários Curados

Caminho base: `/content/curatedCalendars`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um calendário curado por ID |
| GET | `/` | JWT | — | Lista todos os calendários curados |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza calendários curados (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um calendário curado |

## Eventos Curados

Caminho base: `/content/curatedEvents`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtém eventos curados para um calendário (inclui detalhes de eventos e datas de exceção, a menos que `?withoutEvents` seja definido) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obtém eventos curados públicos para um calendário |
| GET | `/:id` | JWT | — | Obtém um evento curado por ID |
| GET | `/` | JWT | — | Lista todos os eventos curados |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza eventos curados. Suporta array `eventIds` para adicionar eventos de grupo específicos |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Remove um evento específico de um calendário curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Remove todos os eventos de um grupo de um calendário curado |

## Arquivos

Caminho base: `/content/files`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtém arquivos por tipo de conteúdo e ID de conteúdo |
| GET | `/` | JWT | — | Lista todos os arquivos para o site da igreja |
| GET | `/:id` | JWT | — | Obtém um arquivo por ID |
| POST | `/` | JWT | Content.Edit* | Carrega arquivos (base64). *Também permitido se o usuário for membro do grupo correspondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtém URL de upload S3 pré-assinada. *Também permitido para membros do grupo. Máximo 100MB por item de conteúdo |
| DELETE | `/:id` | JWT | Content.Edit* | Exclui um arquivo e remove do armazenamento. *Também permitido para membros do grupo |

## Galeria

Caminho base: `/content/gallery`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Lista fotos de banco de imagens em uma pasta |
| GET | `/:folder` | JWT | Content.Edit | Lista imagens de galeria em uma pasta |
| POST | `/requestUpload` | JWT | Content.Edit | Obtém URL de upload S3 pré-assinada para uma imagem de galeria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Exclui uma imagem de galeria |

## Bíblias

Caminho base: `/content/bibles`

Todos os endpoints da Bíblia são públicos (nenhuma autenticação necessária). Os dados são buscados de fontes externas e armazenados em cache localmente.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Lista todas as traduções da Bíblia (busca da fonte se o cache estiver vazio) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obtém estatísticas de pesquisa de Bíblia para um intervalo de datas |
| GET | `/availableTranslations/:source` | Public | — | Lista traduções disponíveis de uma fonte (ex.: api.bible) |
| GET | `/updateTranslations` | Public | — | Sincroniza todas as traduções de todas as fontes |
| GET | `/updateTranslations/:source` | Public | — | Sincroniza traduções de uma fonte específica |
| GET | `/updateCopyrights` | Public | — | Atualiza informações de copyright para traduções que não as possuem |
| GET | `/:translationKey/updateCopyright` | Public | — | Atualiza copyright para uma tradução específica |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Pesquisa versículos em uma tradução |
| GET | `/:translationKey/books` | Public | — | Obtém livros para uma tradução (armazena em cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obtém capítulos para um livro (armazena em cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obtém versículos para um capítulo (armazena em cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obtém texto de versículo para um intervalo. Registra pesquisas. Algumas traduções ignoram o cache para licenciamento |

### Exemplo: Obter Texto de Versículo

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

## Canções

Caminho base: `/content/songs`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Pesquisa canções por consulta |
| GET | `/:id` | JWT | — | Obtém uma canção por ID |
| GET | `/` | JWT | Content.Edit | Lista todas as canções |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza canções (lote) |
| POST | `/import` | JWT | — | Importa canções do FreeShow (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma canção |

## Detalhes da Canção

Caminho base: `/content/songDetails`

Detalhes da canção são globais (não limitados a uma igreja). Estes representam metadados de canção canônica compartilhados entre igrejas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um detalhe de canção por ID (global) |
| GET | `/` | JWT | — | Lista detalhes de canção para a igreja |
| POST | `/create` | JWT | — | Cria um detalhe de canção do ID do PraiseCharts (retorna existente se já criado). Auto-busca metadados do PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Cria ou atualiza detalhes de canção (lote) |

## Links de Detalhes de Canção

Caminho base: `/content/songDetailLinks`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um link de detalhe de canção por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtém todos os links para um detalhe de canção |
| POST | `/` | JWT | — | Cria ou atualiza links de detalhes de canção (lote). Auto-busca dados do MusicBrainz se vinculado |
| DELETE | `/:id` | JWT | — | Exclui um link de detalhe de canção |

## Arranjos

Caminho base: `/content/arrangements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um arranjo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtém arranjos para uma canção |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtém arranjos para um detalhe de canção |
| GET | `/` | JWT | Content.Edit | Lista todos os arranjos |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza arranjos (lote) |
| POST | `/freeShow/missing` | JWT | — | Encontra IDs do FreeShow que não existem na igreja. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um arranjo (também exclui chaves; exclui a canção se nenhum arranjo permanecer) |

## Chaves de Arranjo

Caminho base: `/content/arrangementKeys`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Obtém chave de arranjo com dados completos de canção para visualização do apresentador |
| GET | `/:id` | JWT | — | Obtém uma chave de arranjo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtém chaves para um arranjo |
| GET | `/` | JWT | Content.Edit | Lista todas as chaves de arranjo |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza chaves de arranjo (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma chave de arranjo |

## Configurações

Caminho base: `/content/settings`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtém configurações do usuário atual |
| GET | `/` | JWT | Settings.Edit | Obtém todas as configurações da igreja |
| GET | `/public/:churchId` | Public | — | Obtém configurações públicas para uma igreja (retornadas como pares chave-valor) |
| POST | `/my` | JWT | — | Salva configurações no nível do usuário (suporta upload de imagem em base64) |
| POST | `/` | JWT | Settings.Edit | Salva configurações no nível da igreja (suporta upload de imagem em base64) |
| DELETE | `/my/:id` | JWT | — | Exclui uma configuração de usuário |

## Visualização

Caminho base: `/content/preview`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Carrega dados de visualização de streaming para uma igreja por chave de subdomínio (abas, links, serviços, sermões) |

## Galeria (Fotos de Banco de Imagens)

Caminho base: `/content/stock`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pesquisa fotos de banco de imagens do Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Caminho base: `/content/praiseCharts`

Integração com PraiseCharts para descoberta de canções de adoração e downloads de partituras.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obtém dados brutos do PraiseCharts para uma canção |
| GET | `/hasAccount` | JWT | — | Verifica se o usuário tem uma conta do PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Pesquisa o catálogo do PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtém produtos para uma canção (da biblioteca se autenticado, caso contrário do catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtém dados de arranjo bruto da biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Baixa um arquivo do PraiseCharts (PDF ou ZIP). Retorna `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obtém URL de autorização OAuth para PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Troca verificador OAuth por token de acesso e salva nas configurações do usuário |
| GET | `/library` | JWT | — | Navega pela biblioteca do PraiseCharts do usuário |

## Suporte

Caminho base: `/content/support`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Converte SSML para áudio MP3 usando AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Arquitetura do Website Builder](../../architecture/website-builder) -- Como páginas, seções, elementos, posts e redirecionamentos se encaixam nos aplicativos
- [Endpoints de Associação](./membership) -- Pessoas, igrejas, grupos, papéis, permissões
- [Endpoints de Attendance](./attendance) -- Rastreamento de serviço e visita
- [Autenticação & Permissões](./authentication) -- Fluxo de login, JWT, modelo de permissão
- [Estrutura do Módulo](../module-structure) -- Padrões de organização de código
