---
title: "Endpoints de Conteúdo"
---

# Endpoints de Conteúdo

<div class="article-intro">

O módulo de Conteúdo gerencia páginas do site, seções, elementos, blocos, posts de blog, redirecionamentos, sermões, playlists, serviços de streaming, eventos, calendários curados, arquivos, galerias, traduções da Bíblia e consultas de versículos, músicas, arranjos, estilos globais, fotos de banco de imagens e configurações. É o maior módulo da API e alimenta o CMS, os recursos de mídia e streaming, o planejamento de louvor e os recursos da Bíblia em todos os aplicativos da ChurchApps.

</div>

**Caminho base:** `/content`

## Páginas

Caminho base: `/content/pages`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Público | — | Carrega a árvore completa da página (seções, elementos, blocos) por URL ou ID. Remove os IDs internos quando buscada por URL. Buscas por URL respeitam `pages.visibility` — uma página restrita retorna `{ restricted: true, visibility }`, a menos que o JWT (opcional) atenda à restrição |
| GET | `/public/:churchId` | Público | — | Lista as páginas públicas (`url`, `title`, `metaDescription`); apenas com `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtém uma página pelo ID |
| GET | `/` | JWT | — | Lista todas as páginas da igreja |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica uma página com todas as seções e elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Salva uma página gerada por IA (página, seções e elementos em uma única chamada) |
| POST | `/importTree` | JWT | Content.Edit | Cria uma página a partir de uma árvore aninhada (`title`, `url`, `sections[].elements[]…`). Sempre insere na igreja de quem chama; os IDs no corpo são ignorados. As linhas devem incluir seus filhos `column`. Máximo de 30 seções / 500 elementos |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza páginas (em lote) |
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

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma seção pelo ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica uma seção ou a converte em um bloco reutilizável |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza seções (em lote). Atualiza a ordem de classificação automaticamente |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma seção (atualiza a ordem de classificação automaticamente) |

## Elementos

Caminho base: `/content/elements`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um elemento pelo ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica um elemento com todos os seus filhos |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza elementos (em lote). Gerencia automaticamente as colunas de linhas e os slides de carrossel |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um elemento |

## Blocos

Caminho base: `/content/blocks`

Estende o CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base, com a permissão Content.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um bloco pelo ID |
| GET | `/` | JWT | — | Lista todos os blocos |
| GET | `/:churchId/tree/:id` | Público | — | Carrega a árvore completa do bloco com seções e elementos |
| GET | `/blockType/:blockType` | JWT | — | Carrega blocos por tipo (ex.: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Público | — | Carrega a árvore do bloco de rodapé de uma igreja |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza blocos |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um bloco |

## Links

Caminho base: `/content/links`

Estende o CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base, com a permissão Content.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um link pelo ID |
| GET | `/` | JWT | — | Lista todos os links. Filtro opcional `?category=`. Ordena automaticamente após salvar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carrega os links filtrados por visibilidade (todos, visitantes, membros, equipe, grupos) |
| GET | `/church/:churchId?category=` | Público | — | Carrega os links de uma igreja por categoria (público) |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza links (em lote). Ordena automaticamente por categoria |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um link |

## Estilos Globais

Caminho base: `/content/globalStyles`

Estende o CRUD padrão (POST `/`, DELETE `/:id` da classe base, com a permissão Content.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Público | — | Carrega os estilos globais de uma igreja (retorna os padrões se nenhum estiver definido) |
| GET | `/` | JWT | — | Carrega os estilos globais da igreja autenticada |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza os estilos globais |
| DELETE | `/:id` | JWT | Content.Edit | Exclui os estilos globais |

## Histórico de Páginas

Caminho base: `/content/pageHistory`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lista as entradas de histórico de uma página |
| GET | `/block/:blockId` | JWT | Content.Edit | Lista as entradas de histórico de um bloco |
| GET | `/:id` | JWT | Content.Edit | Obtém uma entrada de histórico pelo ID |
| POST | `/` | JWT | Content.Edit | Salva um snapshot de página/bloco. Limpa periodicamente as entradas com mais de 30 dias |
| POST | `/restore/:id` | JWT | Content.Edit | Restaura uma página/bloco a partir de um snapshot do histórico (exclui o conteúdo atual e o recria a partir do snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaura a partir de um objeto de snapshot embutido. Corpo: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Caminho base: `/content/posts`

Os posts do blog são registros independentes: `title`, `slug` (único por igreja), `excerpt`, `content` (corpo em markdown), `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Um post é publicado assim que `publishDate` estiver definida e no passado. Os endpoints de leitura enriquecem cada post com `authorName`, obtido a partir de `authorId`. Veja [Arquitetura do Construtor de Sites](../../architecture/website-builder#blog).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Público | — | Lista os posts publicados, com paginação (máximo de 50 por página) |
| GET | `/public/:churchId/categories` | Público | — | Categorias distintas entre os posts publicados |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obtém um post publicado pelo slug |
| GET | `/rss/:churchId?siteUrl=` | Público | — | Feed RSS 2.0 dos posts publicados (links montados como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtém um post pelo ID |
| GET | `/` | JWT | — | Lista todos os posts da igreja |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza posts (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um post |

## Redirecionamentos

Caminho base: `/content/redirects`

Redirecionamentos de URL por igreja (`fromPath` → `toPath`), limitados a 200 por igreja. Os caminhos são normalizados (em minúsculas, com barra inicial e sem barra final) e `fromPath` é único por igreja. O B1App resolve esses redirecionamentos em casos que seriam 404 e emite um HTTP 308.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Público | — | Resolve um caminho (ou lista todos os redirecionamentos quando `path` é omitido) |
| GET | `/:id` | JWT | — | Obtém um redirecionamento pelo ID |
| GET | `/` | JWT | — | Lista todos os redirecionamentos da igreja |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza redirecionamentos. Rejeita `fromPath = toPath` e aplica o limite de 200 registros |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um redirecionamento |

## Sermões

Caminho base: `/content/sermons`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtém uma estrutura de exemplo de playlist do FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtém o wrapper do app de TV com as fontes de sermão, lição e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Público | — | Obtém um único sermão como playlist de feed de TV |
| GET | `/public/tvFeed/:churchId` | Público | — | Obtém todas as playlists/sermões públicos como feed de TV |
| GET | `/public/:churchId` | Público | — | Lista todos os sermões públicos de uma igreja |
| GET | `/timeline?sermonIds=` | JWT | — | Carrega os dados da linha do tempo dos sermões |
| GET | `/lookup?videoType=&videoData=` | Público | — | Busca os metadados do sermão no YouTube ou no Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Gera sugestões de posts para redes sociais com IA a partir das legendas do sermão |
| GET | `/outline?url=&title=&author=` | JWT | — | Gera um esboço de lição com IA a partir de uma URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa vídeos de um canal do YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa vídeos de um canal do Vimeo |
| GET | `/:id` | JWT | — | Obtém um sermão pelo ID |
| GET | `/` | JWT | — | Lista todos os sermões |
| POST | `/` | JWT | StreamingServices.Edit | Cria ou atualiza sermões (em lote; aceita upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Exclui um sermão |

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

Estende o CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base, com a permissão StreamingServices.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma playlist pelo ID |
| GET | `/` | JWT | — | Lista todas as playlists |
| GET | `/public/:churchId` | Público | — | Lista todas as playlists públicas de uma igreja |
| POST | `/` | JWT | StreamingServices.Edit | Cria ou atualiza playlists (em lote; aceita upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Exclui uma playlist |

## Serviços de Streaming

Caminho base: `/content/streamingServices`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtém o ID criptografado da sala de chat do anfitrião para um serviço |
| GET | `/` | JWT | — | Lista todos os serviços de streaming. Remove automaticamente os serviços expirados não recorrentes e avança os recorrentes |
| POST | `/` | JWT | StreamingServices.Edit | Cria ou atualiza serviços de streaming (em lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Exclui um serviço de streaming (também limpa os IPs bloqueados) |

## Eventos

Caminho base: `/content/events`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carrega os eventos da linha do tempo de um grupo |
| GET | `/timeline?eventIds=` | JWT | — | Carrega os eventos da linha do tempo dos grupos do usuário atual |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Público | — | Assina os eventos como feed de calendário ICS |
| GET | `/group/:groupId` | JWT | — | Obtém os eventos de um grupo (inclui as datas de exceção) |
| GET | `/public/group/:churchId/:groupId` | Público | — | Obtém os eventos públicos de um grupo |
| GET | `/public/:churchId/:id` | Público | — | Obtém um evento para sua página pública, com `roomNames` (salas das reservas que não foram rejeitadas). Retorna `null` para eventos pendentes ou rejeitados e para eventos privados que não aceitam inscrições |
| GET | `/public/:churchId/:id/ical` | Público | — | Baixa esse evento como arquivo `.ics` (`text/calendar`, com as datas de exceção aplicadas). Retorna `404` quando o evento está oculto pelas mesmas regras |
| GET | `/:id` | JWT | — | Obtém um evento pelo ID |
| POST | `/` | JWT | — | Cria ou atualiza eventos (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um evento |

Os registros de evento incluem `photoUrl` (a foto do evento no formato 16:9 exibida na página pública do evento e nos blocos de próximos eventos), `tags` (separadas por vírgula, usadas pelo filtro de tags do elemento Calendário do site) e `notesViewRole` / `notesPostRole` (`staff` quando `null`, `leaders` ou `members`), que controlam a conversa `eventNote` do evento — veja [Controle de acesso às notas de grupo e evento](./messaging.md#group-and-event-notes-access-control). As respostas públicas de eventos curados também trazem o `photoUrl` e as `tags` de cada evento.

## Exceções de Eventos

Caminho base: `/content/eventExceptions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém uma exceção de evento pelo ID |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza exceções de eventos (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma exceção de evento |

## Calendários Curados

Caminho base: `/content/curatedCalendars`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um calendário curado pelo ID |
| GET | `/` | JWT | — | Lista todos os calendários curados |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza calendários curados (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um calendário curado |

## Eventos Curados

Caminho base: `/content/curatedEvents`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtém os eventos curados de um calendário (inclui os detalhes dos eventos e as datas de exceção, a menos que `?withoutEvents` seja definido) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Público | — | Obtém os eventos curados públicos de um calendário |
| GET | `/:id` | JWT | — | Obtém um evento curado pelo ID |
| GET | `/` | JWT | — | Lista todos os eventos curados |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza eventos curados. Aceita um array `eventIds` para adicionar eventos específicos de grupos |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Remove um evento específico de um calendário curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Remove todos os eventos de um grupo de um calendário curado |

## Arquivos

Caminho base: `/content/files`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtém os arquivos por tipo de conteúdo e ID do conteúdo |
| GET | `/` | JWT | — | Lista todos os arquivos do site da igreja |
| GET | `/:id` | JWT | — | Obtém um arquivo pelo ID |
| POST | `/` | JWT | Content.Edit* | Envia arquivos (base64). *Também permitido se o usuário for membro do grupo correspondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtém uma URL pré-assinada do S3 para upload. *Também permitido para membros do grupo. Máximo de 100 MB por item de conteúdo |
| DELETE | `/:id` | JWT | Content.Edit* | Exclui um arquivo e o remove do armazenamento. *Também permitido para membros do grupo |

## Galeria

Caminho base: `/content/gallery`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Público | — | Lista as fotos de banco de imagens de uma pasta |
| GET | `/:folder` | JWT | Content.Edit | Lista as imagens da galeria de uma pasta |
| POST | `/requestUpload` | JWT | Content.Edit | Obtém uma URL pré-assinada do S3 para upload de uma imagem da galeria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Exclui uma imagem da galeria |

## Bíblias

Caminho base: `/content/bibles`

Todos os endpoints da Bíblia são públicos (não exigem autenticação). Os dados são obtidos de fontes externas e armazenados em cache localmente.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | Público | — | Lista todas as traduções da Bíblia (busca na fonte se o cache estiver vazio) |
| GET | `/stats?startDate=&endDate=` | Público | — | Obtém as estatísticas de consultas da Bíblia para um intervalo de datas |
| GET | `/availableTranslations/:source` | Público | — | Lista as traduções disponíveis de uma fonte (ex.: api.bible) |
| GET | `/updateTranslations` | Público | — | Sincroniza todas as traduções de todas as fontes |
| GET | `/updateTranslations/:source` | Público | — | Sincroniza as traduções de uma fonte específica |
| GET | `/updateCopyrights` | Público | — | Atualiza as informações de direitos autorais das traduções que não as possuem |
| GET | `/:translationKey/updateCopyright` | Público | — | Atualiza os direitos autorais de uma tradução específica |
| GET | `/:translationKey/search?query=&limit=` | Público | — | Pesquisa versículos em uma tradução |
| GET | `/:translationKey/books` | Público | — | Obtém os livros de uma tradução (armazena em cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Público | — | Obtém os capítulos de um livro (armazena em cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Público | — | Obtém os versículos de um capítulo (armazena em cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Público | — | Obtém o texto de um intervalo de versículos. Registra as consultas. Algumas traduções ignoram o cache por questões de licenciamento |

### Exemplo: Obter Texto de Versículos

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

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Pesquisa músicas por termo |
| GET | `/:id` | JWT | — | Obtém uma música pelo ID |
| GET | `/` | JWT | Content.Edit | Lista todas as músicas |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza músicas (em lote) |
| POST | `/import` | JWT | — | Importa músicas do FreeShow (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma música |

## Detalhes de Músicas

Caminho base: `/content/songDetails`

Os detalhes de músicas são globais (não limitados a uma igreja). Eles representam os metadados canônicos das músicas, compartilhados entre igrejas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um detalhe de música pelo ID (global) |
| GET | `/` | JWT | — | Lista os detalhes de músicas da igreja |
| POST | `/create` | JWT | — | Cria um detalhe de música a partir do ID do PraiseCharts (retorna o existente, se já tiver sido criado). Busca automaticamente os metadados no PraiseCharts e no MusicBrainz |
| POST | `/` | JWT | — | Cria ou atualiza detalhes de músicas (em lote) |

## Links de Detalhes de Músicas

Caminho base: `/content/songDetailLinks`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um link de detalhe de música pelo ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtém todos os links de um detalhe de música |
| POST | `/` | JWT | — | Cria ou atualiza links de detalhes de músicas (em lote). Busca automaticamente os dados do MusicBrainz se houver vínculo |
| DELETE | `/:id` | JWT | — | Exclui um link de detalhe de música |

## Arranjos

Caminho base: `/content/arrangements`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtém um arranjo pelo ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtém os arranjos de uma música |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtém os arranjos de um detalhe de música |
| GET | `/` | JWT | Content.Edit | Lista todos os arranjos |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza arranjos (em lote) |
| POST | `/freeShow/missing` | JWT | — | Localiza IDs do FreeShow que não existem na igreja. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Exclui um arranjo (também exclui as tonalidades; exclui a música se não restar nenhum arranjo) |

## Tonalidades de Arranjos

Caminho base: `/content/arrangementKeys`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Público | — | Obtém a tonalidade do arranjo com os dados completos da música para a visualização do apresentador |
| GET | `/:id` | JWT | — | Obtém uma tonalidade de arranjo pelo ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtém as tonalidades de um arranjo |
| GET | `/` | JWT | Content.Edit | Lista todas as tonalidades de arranjos |
| POST | `/` | JWT | Content.Edit | Cria ou atualiza tonalidades de arranjos (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Exclui uma tonalidade de arranjo |

## Configurações

Caminho base: `/content/settings`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtém as configurações do usuário atual |
| GET | `/` | JWT | Settings.Edit | Obtém todas as configurações da igreja |
| GET | `/public/:churchId` | Público | — | Obtém as configurações públicas de uma igreja (retornadas como pares chave-valor) |
| POST | `/my` | JWT | — | Salva as configurações no nível do usuário (aceita upload de imagem em base64) |
| POST | `/` | JWT | Settings.Edit | Salva as configurações no nível da igreja (aceita upload de imagem em base64) |
| DELETE | `/my/:id` | JWT | — | Exclui uma configuração do usuário |

## Pré-visualização

Caminho base: `/content/preview`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Público | — | Carrega os dados de pré-visualização do streaming de uma igreja pela chave de subdomínio (abas, links, serviços, sermões) |

## Galeria (Fotos de Banco de Imagens)

Caminho base: `/content/stock`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/search` | Público | — | Pesquisa fotos de banco de imagens na Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Caminho base: `/content/praiseCharts`

Integração com o PraiseCharts para descoberta de músicas de louvor e download de partituras.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obtém os dados brutos do PraiseCharts de uma música |
| GET | `/hasAccount` | JWT | — | Verifica se o usuário tem uma conta do PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Pesquisa no catálogo do PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtém os produtos de uma música (da biblioteca, se autenticado; caso contrário, do catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtém os dados brutos do arranjo a partir da biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Baixa um arquivo do PraiseCharts (PDF ou ZIP). Retorna `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Público | — | Obtém a URL de autorização OAuth do PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Troca o verificador OAuth por um token de acesso e o salva nas configurações do usuário |
| GET | `/library` | JWT | — | Navega pela biblioteca do PraiseCharts do usuário |

## Suporte

Caminho base: `/content/support`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Público | — | Converte SSML em áudio MP3 usando o AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Arquitetura do Construtor de Sites](../../architecture/website-builder) -- Como páginas, seções, elementos, posts e redirecionamentos se integram entre os aplicativos
- [Endpoints de Membros](./membership) -- Pessoas, igrejas, grupos, funções, permissões
- [Endpoints de Frequência](./attendance) -- Rastreamento de cultos e visitas
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, modelo de permissões
- [Estrutura dos Módulos](../module-structure) -- Padrões de organização do código
