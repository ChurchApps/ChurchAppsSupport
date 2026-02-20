---
title: "Endpoints de Conteúdo"
---

# Endpoints de Conteúdo

<div class="article-intro">

O módulo de Conteúdo gerencia páginas de site, seções, elementos, blocos, sermões, playlists, serviços de streaming, eventos, calendários curados, arquivos, galerias, traduções da Bíblia e consultas de versículos, músicas, arranjos, estilos globais, fotos de banco de imagens e configurações. É o maior módulo da API e alimenta o CMS, mídia/streaming, planejamento de louvor e recursos bíblicos em todas as aplicações do ChurchApps.

</div>

**Caminho base:** `/content`

## Páginas

Caminho base: `/content/pages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:churchId/tree?url=&id=` | Público | — | Carregar árvore completa da página (seções, elementos, blocos) por URL ou ID. Remove IDs internos quando buscado por URL |
| GET | `/:id` | JWT | — | Obter uma página por ID |
| GET | `/` | JWT | — | Listar todas as páginas da igreja |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar uma página com todas as seções e elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Salvar uma página gerada por IA (página, seções e elementos em uma chamada) |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar páginas (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma página |

### Exemplo: Carregar Árvore da Página

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
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma seção (atualiza automaticamente a ordem de classificação) |

## Elementos

Caminho base: `/content/elements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar um elemento com todos os filhos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar elementos (lote). Gerencia automaticamente colunas de linhas e slides de carrossel |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um elemento |

## Blocos

Caminho base: `/content/blocks`

Estende CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escrita).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um bloco por ID |
| GET | `/` | JWT | — | Listar todos os blocos |
| GET | `/:churchId/tree/:id` | Público | — | Carregar árvore completa do bloco com seções e elementos |
| GET | `/blockType/:blockType` | JWT | — | Carregar blocos por tipo (ex: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Público | — | Carregar árvore do bloco de rodapé de uma igreja |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar blocos |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um bloco |

## Links

Caminho base: `/content/links`

Estende CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escrita).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um link por ID |
| GET | `/` | JWT | — | Listar todos os links. Filtro opcional `?category=`. Auto-ordena após salvar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carregar links filtrados por visibilidade (todos, visitantes, membros, equipe, grupos) |
| GET | `/church/:churchId?category=` | Público | — | Carregar links de uma igreja por categoria (público) |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar links (lote). Auto-ordena por categoria |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um link |

## Estilos Globais

Caminho base: `/content/globalStyles`

Estende CRUD padrão (POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escrita).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/church/:churchId` | Público | — | Carregar estilos globais de uma igreja (retorna padrões se nenhum definido) |
| GET | `/` | JWT | — | Carregar estilos globais da igreja autenticada |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar estilos globais |
| DELETE | `/:id` | JWT | Content.Edit | Excluir estilos globais |

## Histórico de Páginas

Caminho base: `/content/pageHistory`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listar entradas de histórico de uma página |
| GET | `/block/:blockId` | JWT | Content.Edit | Listar entradas de histórico de um bloco |
| GET | `/:id` | JWT | Content.Edit | Obter uma entrada de histórico por ID |
| POST | `/` | JWT | Content.Edit | Salvar um snapshot de página/bloco. Limpa periodicamente entradas com mais de 30 dias |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurar uma página/bloco de um snapshot de histórico (exclui conteúdo atual e recria a partir do snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurar de um objeto de snapshot inline. Body: `{ pageId, blockId, snapshot }` |

## Sermões

Caminho base: `/content/sermons`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/public/freeshowSample` | JWT | — | Obter uma estrutura de playlist de exemplo do FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obter wrapper do app de TV com fontes de sermões, lições e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Público | — | Obter um único sermão como playlist de feed de TV |
| GET | `/public/tvFeed/:churchId` | Público | — | Obter todas as playlists/sermões públicos como feed de TV |
| GET | `/public/:churchId` | Público | — | Listar todos os sermões públicos de uma igreja |
| GET | `/timeline?sermonIds=` | JWT | — | Carregar dados de linha do tempo para sermões |
| GET | `/lookup?videoType=&videoData=` | Público | — | Consultar metadados de sermão do YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Gerar sugestões de posts para redes sociais com IA a partir de legendas de sermões |
| GET | `/outline?url=&title=&author=` | JWT | — | Gerar esboço de lição com IA a partir de uma URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importar vídeos de um canal do YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importar vídeos de um canal do Vimeo |
| GET | `/:id` | JWT | — | Obter um sermão por ID |
| GET | `/` | JWT | — | Listar todos os sermões |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar sermões (lote, suporta upload de thumbnail em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir um sermão |

### Exemplo: Consultar um Sermão do YouTube

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

Estende CRUD padrão (GET `/:id`, GET `/`, DELETE `/:id` da classe base com permissão StreamingServices.Edit para escrita).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma playlist por ID |
| GET | `/` | JWT | — | Listar todas as playlists |
| GET | `/public/:churchId` | Público | — | Listar todas as playlists públicas de uma igreja |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar playlists (lote, suporta upload de thumbnail em base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir uma playlist |

## Serviços de Streaming

Caminho base: `/content/streamingServices`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obter ID criptografado da sala de chat do host para um serviço |
| GET | `/` | JWT | — | Listar todos os serviços de streaming. Limpa automaticamente serviços não recorrentes expirados e avança os recorrentes |
| POST | `/` | JWT | StreamingServices.Edit | Criar ou atualizar serviços de streaming (lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Excluir um serviço de streaming (também limpa IPs bloqueados) |

## Eventos

Caminho base: `/content/events`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carregar eventos de linha do tempo para um grupo |
| GET | `/timeline?eventIds=` | JWT | — | Carregar eventos de linha do tempo para os grupos do usuário atual |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Público | — | Assinar eventos como feed de calendário ICS |
| GET | `/group/:groupId` | JWT | — | Obter eventos de um grupo (inclui datas de exceção) |
| GET | `/public/group/:churchId/:groupId` | Público | — | Obter eventos públicos de um grupo |
| GET | `/:id` | JWT | — | Obter um evento por ID |
| POST | `/` | JWT | — | Criar ou atualizar eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um evento |

## Exceções de Eventos

Caminho base: `/content/eventExceptions`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter uma exceção de evento por ID |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar exceções de eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma exceção de evento |

## Calendários Curados

Caminho base: `/content/curatedCalendars`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um calendário curado por ID |
| GET | `/` | JWT | — | Listar todos os calendários curados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar calendários curados (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um calendário curado |

## Eventos Curados

Caminho base: `/content/curatedEvents`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obter eventos curados de um calendário (inclui detalhes do evento e datas de exceção, a menos que `?withoutEvents` esteja definido) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Público | — | Obter eventos curados públicos de um calendário |
| GET | `/:id` | JWT | — | Obter um evento curado por ID |
| GET | `/` | JWT | — | Listar todos os eventos curados |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar eventos curados. Suporta array `eventIds` para adicionar eventos de grupo específicos |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Remover um evento específico de um calendário curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Remover todos os eventos de um grupo de um calendário curado |

## Arquivos

Caminho base: `/content/files`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:contentType/:contentId` | JWT | — | Obter arquivos por tipo de conteúdo e ID de conteúdo |
| GET | `/` | JWT | — | Listar todos os arquivos do site da igreja |
| GET | `/:id` | JWT | — | Obter um arquivo por ID |
| POST | `/` | JWT | Content.Edit* | Upload de arquivos (base64). *Também permitido se o usuário for membro do grupo correspondente ao `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obter uma URL de upload pré-assinada do S3. *Também permitido para membros de grupo. Máximo de 100MB por item de conteúdo |
| DELETE | `/:id` | JWT | Content.Edit* | Excluir um arquivo e remover do armazenamento. *Também permitido para membros de grupo |

## Galeria

Caminho base: `/content/gallery`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/stock/:folder` | Público | — | Listar fotos de banco de imagens em uma pasta |
| GET | `/:folder` | JWT | Content.Edit | Listar imagens da galeria em uma pasta |
| POST | `/requestUpload` | JWT | Content.Edit | Obter uma URL de upload pré-assinada do S3 para uma imagem da galeria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Excluir uma imagem da galeria |

## Bíblias

Caminho base: `/content/bibles`

Todos os endpoints de Bíblia são públicos (sem autenticação necessária). Os dados são buscados de fontes externas e armazenados em cache localmente.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | Público | — | Listar todas as traduções da Bíblia (busca da fonte se o cache estiver vazio) |
| GET | `/stats?startDate=&endDate=` | Público | — | Obter estatísticas de consulta da Bíblia para um intervalo de datas |
| GET | `/availableTranslations/:source` | Público | — | Listar traduções disponíveis de uma fonte (ex: api.bible) |
| GET | `/updateTranslations` | Público | — | Sincronizar todas as traduções de todas as fontes |
| GET | `/updateTranslations/:source` | Público | — | Sincronizar traduções de uma fonte específica |
| GET | `/updateCopyrights` | Público | — | Atualizar informações de copyright para traduções sem elas |
| GET | `/:translationKey/updateCopyright` | Público | — | Atualizar copyright de uma tradução específica |
| GET | `/:translationKey/search?query=&limit=` | Público | — | Buscar versículos em uma tradução |
| GET | `/:translationKey/books` | Público | — | Obter livros de uma tradução (armazena em cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Público | — | Obter capítulos de um livro (armazena em cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Público | — | Obter versículos de um capítulo (armazena em cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Público | — | Obter texto de versículos para um intervalo. Registra consultas. Algumas traduções ignoram o cache por licenciamento |

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

## Músicas

Caminho base: `/content/songs`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/search?q=` | JWT | — | Buscar músicas por consulta |
| GET | `/:id` | JWT | — | Obter uma música por ID |
| GET | `/` | JWT | Content.Edit | Listar todas as músicas |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar músicas (lote) |
| POST | `/import` | JWT | — | Importar músicas do FreeShow (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma música |

## Detalhes de Músicas

Caminho base: `/content/songDetails`

Os detalhes de músicas são globais (sem escopo de igreja). Representam metadados canônicos de músicas compartilhados entre igrejas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um detalhe de música por ID (global) |
| GET | `/` | JWT | — | Listar detalhes de músicas da igreja |
| POST | `/create` | JWT | — | Criar um detalhe de música a partir do ID do PraiseCharts (retorna existente se já criado). Busca automaticamente metadados do PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Criar ou atualizar detalhes de músicas (lote) |

## Links de Detalhes de Músicas

Caminho base: `/content/songDetailLinks`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um link de detalhe de música por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obter todos os links de um detalhe de música |
| POST | `/` | JWT | — | Criar ou atualizar links de detalhes de músicas (lote). Busca automaticamente dados do MusicBrainz se vinculado |
| DELETE | `/:id` | JWT | — | Excluir um link de detalhe de música |

## Arranjos

Caminho base: `/content/arrangements`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obter um arranjo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obter arranjos de uma música |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obter arranjos de um detalhe de música |
| GET | `/` | JWT | Content.Edit | Listar todos os arranjos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar arranjos (lote) |
| POST | `/freeShow/missing` | JWT | — | Encontrar IDs do FreeShow que não existem na igreja. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Excluir um arranjo (também exclui tonalidades; exclui a música se não restarem arranjos) |

## Tonalidades de Arranjos

Caminho base: `/content/arrangementKeys`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/presenter/:churchId/:id` | Público | — | Obter tonalidade do arranjo com dados completos da música para visualização do apresentador |
| GET | `/:id` | JWT | — | Obter uma tonalidade de arranjo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obter tonalidades de um arranjo |
| GET | `/` | JWT | Content.Edit | Listar todas as tonalidades de arranjos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar tonalidades de arranjos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Excluir uma tonalidade de arranjo |

## Configurações

Caminho base: `/content/settings`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/my` | JWT | — | Obter configurações do usuário atual |
| GET | `/` | JWT | Settings.Edit | Obter todas as configurações da igreja |
| GET | `/public/:churchId` | Público | — | Obter configurações públicas de uma igreja (retornadas como pares chave-valor) |
| GET | `/imports?playlistId=&channelId=&type=` | JWT | Settings.Edit | Obter configurações de importação automática (IDs de canais YouTube/Vimeo) |
| POST | `/my` | JWT | — | Salvar configurações do nível de usuário (suporta upload de imagem em base64) |
| POST | `/` | JWT | Settings.Edit | Salvar configurações do nível da igreja (suporta upload de imagem em base64) |
| DELETE | `/my/:id` | JWT | — | Excluir uma configuração de usuário |

## Pré-visualização

Caminho base: `/content/preview`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/data/:key` | Público | — | Carregar dados de pré-visualização de streaming de uma igreja por chave de subdomínio (abas, links, serviços, sermões) |

## Galeria (Fotos de Banco de Imagens)

Caminho base: `/content/stock`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/search` | Público | — | Buscar fotos de banco de imagens do Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Caminho base: `/content/praiseCharts`

Integração com o PraiseCharts para descoberta de músicas de louvor e download de partituras.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/raw/:id` | JWT | — | Obter dados brutos do PraiseCharts para uma música |
| GET | `/hasAccount` | JWT | — | Verificar se o usuário tem uma conta PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Buscar no catálogo do PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obter produtos de uma música (da biblioteca se autenticado, caso contrário do catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obter dados brutos de arranjo da biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Baixar um arquivo do PraiseCharts (PDF ou ZIP). Retorna `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Público | — | Obter URL de autorização OAuth para o PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Trocar verificador OAuth por token de acesso e salvar nas configurações do usuário |
| GET | `/library` | JWT | — | Navegar pela biblioteca do PraiseCharts do usuário |

## Suporte

Caminho base: `/content/support`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/createAudio` | Público | — | Converter SSML em áudio MP3 usando AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Endpoints de Membros](./membership) -- Pessoas, igrejas, grupos, papéis, permissões
- [Endpoints de Presença](./attendance) -- Rastreamento de cultos e visitas
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, modelo de permissões
- [Estrutura do Módulo](../module-structure) -- Padrões de organização de código
