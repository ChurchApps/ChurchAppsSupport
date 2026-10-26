---
title: "Endpoints de Conteúdo"
---

# Endpoints de Conteúdo

<div class="article-intro">

O módulo de Conteúdo gerencia páginas do site, seções, elementos, blocos, posts do blog, redirecionamentos, sermões, playlists, serviços de transmissão, eventos, calendários curados, arquivos, galerias, traduções da Bíblia e consultas de versículos, músicas, arranjos, estilos globais, fotos de banco de imagens e configurações. É o maior módulo da API e alimenta o CMS, a mídia/transmissão, o planejamento de louvor e os recursos bíblicos em todos os aplicativos do ChurchApps.

</div>

**Caminho base:** `/content`

## Páginas

Caminho base: `/content/pages`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:churchId/tree?url=&id=` | Pública | — | Carregar a árvore completa da página (seções, elementos, blocos) pela URL ou pelo ID. Remove os IDs internos quando buscada pela URL. Buscas por URL aplicam `pages.visibility` — uma página restrita retorna `{ restricted: true, visibility }`, a menos que o JWT (opcional) atenda à restrição |
| GET | `/public/:churchId` | Pública | — | Listar páginas públicas (`url`, `title`, `metaDescription`); somente `visibility = everyone` |
| GET | `/:id` | JWT | — | Obter uma página pelo ID |
| GET | `/` | JWT | — | Listar todas as páginas da igreja |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar uma página com todas as seções e elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Salvar uma página gerada por IA (página, seções e elementos em uma única chamada) |
| POST | `/importTree` | JWT | Content.Edit | Criar uma página a partir de uma árvore aninhada (`title`, `url`, `sections[].elements[]…`). Sempre insere sob a igreja do chamador; os IDs enviados no corpo são ignorados. As linhas devem incluir seus filhos `column`. Máximo de 30 seções / 500 elementos |
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

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma seção pelo ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicar uma seção ou convertê-la em um bloco reutilizável |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar seções (em lote). Atualiza a ordem de classificação automaticamente |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma seção (atualiza a ordem de classificação automaticamente) |

## Elementos

Caminho base: `/content/elements`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um elemento pelo ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar um elemento com todos os seus filhos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar elementos (em lote). Gerencia automaticamente as colunas de linha e os slides de carrossel |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um elemento |

## Blocos

Caminho base: `/content/blocks`

Estende o CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com a permissão Content.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um bloco pelo ID |
| GET | `/` | JWT | — | Listar todos os blocos |
| GET | `/:churchId/tree/:id` | Pública | — | Carregar a árvore completa do bloco com seções e elementos |
| GET | `/blockType/:blockType` | JWT | — | Carregar blocos por tipo (ex.: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pública | — | Carregar a árvore do bloco de rodapé de uma igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar blocos |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um bloco |

## Links

Caminho base: `/content/links`

Estende o CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com a permissão Content.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um link pelo ID |
| GET | `/` | JWT | — | Listar todos os links. Filtro opcional `?category=`. Ordena automaticamente após salvar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carregar links filtrados por visibilidade (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Pública | — | Carregar os links de uma igreja por categoria (público) |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar links (em lote). Ordena automaticamente por categoria |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um link |

## Estilos Globais

Caminho base: `/content/globalStyles`

Estende o CRUD padrão (POST `/`, DELETE `/:id` da classe base com a permissão Content.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/church/:churchId` | Pública | — | Carregar os estilos globais de uma igreja (retorna os padrões se nenhum tiver sido definido) |
| GET | `/` | JWT | — | Carregar os estilos globais da igreja autenticada |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar estilos globais |
| DELETE | `/:id` | JWT | Content.Edit | Excluir estilos globais |

## Histórico de Páginas

Caminho base: `/content/pageHistory`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listar as entradas de histórico de uma página |
| GET | `/block/:blockId` | JWT | Content.Edit | Listar as entradas de histórico de um bloco |
| GET | `/:id` | JWT | Content.Edit | Obter uma entrada de histórico pelo ID |
| POST | `/` | JWT | Content.Edit | Salvar um snapshot de página/bloco. Limpa periodicamente as entradas com mais de 30 dias |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurar uma página/bloco a partir de um snapshot do histórico (exclui o conteúdo atual e o recria a partir do snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurar a partir de um objeto de snapshot embutido. Corpo: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Caminho base: `/content/posts`

Os posts do blog são registros independentes: `title`, `slug` (único por igreja), `excerpt`, `content` (corpo em markdown), `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Um post é publicado assim que `publishDate` estiver definida e no passado. Os endpoints de leitura enriquecem cada post com `authorName`, resolvido a partir de `authorId`. Veja [Arquitetura do Construtor de Sites](../../architecture/website-builder#blog).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Pública | — | Listar posts publicados, paginados (máximo de 50 por página) |
| GET | `/public/:churchId/categories` | Pública | — | Categorias distintas entre os posts publicados |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obter um post publicado pelo slug |
| GET | `/rss/:churchId?siteUrl=` | Pública | — | Feed RSS 2.0 dos posts publicados (os links são montados como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obter um post pelo ID |
| GET | `/` | JWT | — | Listar todos os posts da igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar posts (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um post |

## Redirecionamentos

Caminho base: `/content/redirects`

Redirecionamentos de URL por igreja (`fromPath` → `toPath`), limitados a 200 por igreja. Os caminhos são normalizados (em minúsculas, com barra inicial e sem barra final), e `fromPath` é único por igreja. O B1App resolve esses redirecionamentos quando ocorreria um 404 e emite um HTTP 308.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/public/:churchId?path=` | Pública | — | Resolver um caminho (ou listar todos os redirecionamentos quando `path` é omitido) |
| GET | `/:id` | JWT | — | Obter um redirecionamento pelo ID |
| GET | `/` | JWT | — | Listar todos os redirecionamentos da igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar redirecionamentos. Rejeita `fromPath = toPath` e aplica o limite de 200 registros |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um redirecionamento |

## Sermões

Caminho base: `/content/sermons`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/public/freeshowSample` | JWT | — | Obter uma estrutura de playlist de exemplo do FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obter o wrapper do app de TV com as fontes de sermão, lição e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pública | — | Obter um único sermão como playlist de feed para TV |
| GET | `/public/tvFeed/:churchId` | Pública | — | Obter todas as playlists/sermões públicos como feed para TV |
| GET | `/public/:churchId` | Pública | — | Listar todos os sermões públicos de uma igreja |
| GET | `/timeline?sermonIds=` | JWT | — | Carregar os dados de linha do tempo dos sermões |
| GET | `/lookup?videoType=&videoData=` | Pública | — | Buscar os metadados de um sermão no YouTube ou no Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Gerar sugestões de posts para redes sociais com IA a partir das legendas do sermão |
| GET | `/outline?url=&title=&author=` | JWT | — | Gerar um esboço de lição com IA a partir de uma URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importar vídeos de um canal do YouTube. As entidades HTML que a API de busca do YouTube coloca em títulos e descrições (como `&amp;` e `&#39;`) são decodificadas |
| GET | `/vimeoImport/:channelId` | JWT | — | Importar vídeos de um canal do Vimeo |
| GET | `/:id` | JWT | — | Obter um sermão pelo ID |
| GET | `/` | JWT | — | Listar todos os sermões |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar sermões. Aceita um array ou um único objeto de sermão (sempre retorna um array); um corpo vazio retorna 400. Oferece suporte a upload de miniatura em base64 |
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

Estende o CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base com a permissão StreamingServices.Edit para gravações).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma playlist pelo ID |
| GET | `/` | JWT | — | Listar todas as playlists |
| GET | `/public/:churchId` | Pública | — | Listar todas as playlists públicas de uma igreja |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar playlists (em lote, com suporte a upload de miniatura em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir uma playlist |

## Serviços de Transmissão

Caminho base: `/content/streamingServices`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obter o ID criptografado da sala de chat do anfitrião para um serviço |
| GET | `/` | JWT | — | Listar todos os serviços de transmissão. Remove automaticamente os serviços expirados não recorrentes e avança os recorrentes |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar serviços de transmissão (em lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir um serviço de transmissão (também limpa os IPs bloqueados) |

## Eventos

Caminho base: `/content/events`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carregar os eventos da linha do tempo de um grupo (inclui datas de exceção, para que ocorrências excluídas possam ser ignoradas) |
| GET | `/timeline?eventIds=` | JWT | — | Carregar os eventos da linha do tempo dos grupos do usuário atual (inclui datas de exceção) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pública | — | Assinar os eventos como feed de calendário ICS |
| GET | `/group/:groupId` | JWT | — | Obter os eventos de um grupo (inclui datas de exceção) |
| GET | `/public/group/:churchId/:groupId` | Pública | — | Obter os eventos públicos de um grupo |
| GET | `/public/:churchId/:id` | Pública | — | Obter um evento para sua página pública, com `roomNames` (salas de reservas que não foram rejeitadas). Retorna `null` para eventos pendentes ou rejeitados e para eventos privados que não aceitam inscrições |
| GET | `/public/:churchId/:id/ical` | Pública | — | Baixar esse evento específico como arquivo `.ics` (`text/calendar`, com as datas de exceção aplicadas). Retorna `404` quando o evento está oculto pelas mesmas regras |
| GET | `/:id` | JWT | — | Obter um evento pelo ID |
| POST | `/` | JWT | — | Criar ou atualizar eventos (em lote) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin ou líder de grupo | Excluir um evento e suas reservas. Líderes do grupo do evento podem excluí-lo, e quem fez a solicitação pode cancelar a própria solicitação pendente |

Os registros de evento incluem `photoUrl` (a foto do evento no formato 16:9 exibida na página pública do evento e nos cards de próximos eventos), `tags` (separadas por vírgula, usadas pelo filtro de tags do elemento Calendar do site) e `notesViewRole` / `notesPostRole` (`staff` quando `null`, `leaders` ou `members`), que controlam a conversa `eventNote` do evento — veja [Controle de acesso às notas de grupos e eventos](./messaging.md#group-and-event-notes-access-control). As respostas públicas de eventos curados também incluem `photoUrl` e `tags` de cada evento.

## Exceções de Eventos

Caminho base: `/content/eventExceptions`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma exceção de evento pelo ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin ou líder de grupo | Criar ou atualizar exceções de eventos (em lote). Líderes só podem adicionar exceções para eventos de grupos que lideram |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin ou líder de grupo | Excluir uma exceção de evento |

## Calendários Curados

Caminho base: `/content/curatedCalendars`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um calendário curado pelo ID |
| GET | `/` | JWT | — | Listar todos os calendários curados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar calendários curados (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um calendário curado |

## Eventos Curados

Caminho base: `/content/curatedEvents`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obter os eventos curados de um calendário (inclui os detalhes dos eventos e as datas de exceção, a menos que `?withoutEvents` seja informado) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pública | — | Obter os eventos curados públicos de um calendário |
| GET | `/:id` | JWT | — | Obter um evento curado pelo ID |
| GET | `/` | JWT | — | Listar todos os eventos curados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar eventos curados. Aceita o array `eventIds` para adicionar eventos específicos de grupos |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Remover um evento específico de um calendário curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Remover de um calendário curado todos os eventos de um grupo |

## Arquivos

Caminho base: `/content/files`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:contentType/:contentId` | JWT | — | Obter arquivos pelo tipo e ID do conteúdo |
| GET | `/` | JWT | — | Listar todos os arquivos do site da igreja |
| GET | `/:id` | JWT | — | Obter um arquivo pelo ID |
| POST | `/` | JWT | Content.Edit* | Enviar arquivos (base64). *Também permitido se o usuário for membro do grupo correspondente ao `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obter uma URL pré-assinada de upload para o S3. *Também permitido para membros do grupo. Máximo de 100 MB por item de conteúdo |
| DELETE | `/:id` | JWT | Content.Edit* | Excluir um arquivo e removê-lo do armazenamento. *Também permitido para membros do grupo |

## Galeria

Caminho base: `/content/gallery`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/stock/:folder` | Pública | — | Listar as fotos de banco de imagens de uma pasta |
| GET | `/:folder` | JWT | Content.Edit | Listar as imagens da galeria de uma pasta |
| POST | `/requestUpload` | JWT | Content.Edit | Obter uma URL pré-assinada de upload para o S3 de uma imagem da galeria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Excluir uma imagem da galeria |

## Bíblias

Caminho base: `/content/bibles`

Todos os endpoints da Bíblia são públicos (não exigem autenticação). Os dados são obtidos de fontes externas e armazenados em cache local. As requisições ao api.bible expiram após 15 segundos; um timeout retorna **504**.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | Pública | — | Listar todas as traduções da Bíblia (busca na fonte se o cache estiver vazio) |
| GET | `/stats?startDate=&endDate=` | Pública | — | Obter as estatísticas de consultas bíblicas de um intervalo de datas |
| GET | `/availableTranslations/:source` | Pública | — | Listar as traduções disponíveis de uma fonte (ex.: api.bible) |
| GET | `/updateTranslations` | Pública | — | Sincronizar todas as traduções de todas as fontes |
| GET | `/updateTranslations/:source` | Pública | — | Sincronizar as traduções de uma fonte específica |
| GET | `/updateCopyrights` | Pública | — | Atualizar as informações de direitos autorais das traduções que não as têm |
| GET | `/:translationKey/updateCopyright` | Pública | — | Atualizar os direitos autorais de uma tradução específica |
| GET | `/:translationKey/search?query=&limit=` | Pública | — | Pesquisar versículos em uma tradução |
| GET | `/:translationKey/books` | Pública | — | Obter os livros de uma tradução (armazena em cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Pública | — | Obter os capítulos de um livro (armazena em cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pública | — | Obter os versículos de um capítulo (armazena em cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pública | — | Obter o texto de um intervalo de versículos. Registra as consultas. Algumas traduções ignoram o cache por questões de licenciamento |

### Exemplo: Obter o Texto de Versículos

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
|--------|---------|--------------|-----------|-----------|
| GET | `/search?q=` | JWT | — | Pesquisar músicas por termo |
| GET | `/:id` | JWT | — | Obter uma música pelo ID |
| GET | `/` | JWT | Content.Edit | Listar todas as músicas |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar músicas (em lote) |
| POST | `/import` | JWT | — | Importar músicas do FreeShow (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma música |

## Detalhes de Músicas

Caminho base: `/content/songDetails`

Os detalhes de músicas são globais (não limitados a uma igreja). Eles representam os metadados canônicos das músicas, compartilhados entre igrejas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter os detalhes de uma música pelo ID (global) |
| GET | `/` | JWT | — | Listar os detalhes de músicas da igreja |
| POST | `/create` | JWT | — | Criar detalhes de música a partir do ID do PraiseCharts (retorna o existente se já tiver sido criado). Busca automaticamente os metadados no PraiseCharts e no MusicBrainz |
| POST | `/` | JWT | — | Criar ou atualizar detalhes de músicas (em lote) |

## Links de Detalhes de Músicas

Caminho base: `/content/songDetailLinks`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um link de detalhes de música pelo ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obter todos os links de um detalhe de música |
| POST | `/` | JWT | — | Criar ou atualizar links de detalhes de músicas (em lote). Busca automaticamente os dados do MusicBrainz se houver vínculo |
| DELETE | `/:id` | JWT | — | Excluir um link de detalhes de música |

## Arranjos

Caminho base: `/content/arrangements`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um arranjo pelo ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obter os arranjos de uma música |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obter os arranjos de um detalhe de música |
| GET | `/` | JWT | Content.Edit | Listar todos os arranjos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar arranjos (em lote) |
| POST | `/freeShow/missing` | JWT | — | Encontrar IDs do FreeShow que não existem na igreja. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um arranjo (também exclui as tonalidades; exclui a música se não restarem arranjos) |

## Tonalidades de Arranjos

Caminho base: `/content/arrangementKeys`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/presenter/:churchId/:id` | Pública | — | Obter a tonalidade do arranjo com os dados completos da música para a visualização do apresentador |
| GET | `/:id` | JWT | — | Obter uma tonalidade de arranjo pelo ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obter as tonalidades de um arranjo |
| GET | `/` | JWT | Content.Edit | Listar todas as tonalidades de arranjos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar tonalidades de arranjos (em lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma tonalidade de arranjo |

## Configurações

Caminho base: `/content/settings`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/my` | JWT | — | Obter as configurações do usuário atual |
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Pública | — | Obter as configurações públicas de uma igreja (retornadas como pares chave-valor) |
| POST | `/my` | JWT | — | Salvar configurações no nível do usuário (com suporte a upload de imagem em base64) |
| POST | `/` | JWT | Settings.Edit | Salvar configurações no nível da igreja (com suporte a upload de imagem em base64) |
| DELETE | `/my/:id` | JWT | — | Excluir uma configuração do usuário |

## Pré-visualização

Caminho base: `/content/preview`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/data/:key` | Pública | — | Carregar os dados de pré-visualização da transmissão de uma igreja pela chave de subdomínio (abas, links, serviços, sermões) |

## Galeria (Fotos de Banco de Imagens)

Caminho base: `/content/stock`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/search` | Pública | — | Pesquisar fotos do banco de imagens Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Caminho base: `/content/praiseCharts`

Integração com o PraiseCharts para descoberta de músicas de louvor e download de partituras.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/raw/:id` | JWT | — | Obter os dados brutos do PraiseCharts de uma música |
| GET | `/hasAccount` | JWT | — | Verificar se o usuário tem uma conta do PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Pesquisar no catálogo do PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obter os produtos de uma música (da biblioteca, se autenticado; caso contrário, do catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obter os dados brutos de um arranjo da biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Baixar um arquivo do PraiseCharts (PDF ou ZIP). Retorna `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pública | — | Obter a URL de autorização OAuth do PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Trocar o verificador OAuth por um token de acesso e salvá-lo nas configurações do usuário |
| GET | `/library` | JWT | — | Navegar pela biblioteca do PraiseCharts do usuário |

## Suporte

Caminho base: `/content/support`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/createAudio` | Pública | — | Converter SSML em áudio MP3 usando o AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Arquitetura do Construtor de Sites](../../architecture/website-builder) -- Como páginas, seções, elementos, posts e redirecionamentos se conectam entre os aplicativos
- [Endpoints de Membresia](./membership) -- Pessoas, igrejas, grupos, funções, permissões
- [Endpoints de Frequência](./attendance) -- Registro de serviços e visitas
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, modelo de permissões
- [Estrutura de Módulos](../module-structure) -- Padrões de organização do código
