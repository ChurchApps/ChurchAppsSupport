---
title: "Gerenciando Sermões"
---

# Gerenciando Sermões

<div class="article-intro">

A página de Sermões exibe toda a sua biblioteca de sermões. A partir daqui você pode adicionar novos sermões, editar entradas existentes e organizar seu conteúdo por playlist. Cada sermão pode estar vinculado a vídeos ou áudio hospedados no YouTube, Vimeo, Facebook ou uma URL personalizada.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **contentApi.streamingServices.edit**. Veja [Funções e Permissões](../settings/roles-permissions.md) se você não tiver acesso.
- Crie pelo menos uma [playlist](playlists) para organizar seus sermões
- Tenha seus IDs de vídeo ou URLs prontos no YouTube, Vimeo ou Facebook

</div>

## Visualizando sua biblioteca de sermões

1. Em B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Sermões** e clique em **Sermões**.
2. A página de Sermões mostra todas as suas entradas de sermões, organizadas por playlist. Cada sermão exibe sua miniatura, título e data.
3. Clique em qualquer sermão para visualizar ou editar seus detalhes.

## Adicionando um Sermão

1. Clique no botão **Adicionar Sermão** no canto superior direito e selecione **Adicionar Sermão** no menu suspenso.
2. Selecione uma **Playlist** para atribuir o sermão.
3. Escolha seu **Provedor de Vídeo** -- YouTube, Vimeo, Facebook ou URL Personalizada. Recomendamos YouTube pois funciona melhor com o sistema B1.
4. Digite o ID do vídeo ou URL e clique em **Buscar**. Para YouTube, o ID do vídeo é a sequência de caracteres após `v=` na URL do YouTube.
5. Quando você clica em **Buscar**, os detalhes do sermão são importados automaticamente, incluindo a data de publicação, duração, título, descrição e miniatura.
6. Faça qualquer alteração que desejar e clique em **Salvar**.

:::tip
Você também pode adicionar uma URL de transmissão ao vivo permanente selecionando **Adicionar URL de Transmissão Ao Vivo Permanente** no menu suspenso **Adicionar Sermão**. Isso cria uma conexão persistente com o fluxo ao vivo do seu canal do YouTube usando seu ID de Canal. Veja [Transmissão ao Vivo](live-streaming) para mais detalhes.
:::

## Editando um Sermão

1. Clique em qualquer sermão em sua biblioteca para abrir seus detalhes.
2. Atualize o título, palestrante, data, descrição, miniatura ou links de mídia conforme necessário.
3. Clique em **Salvar** para aplicar suas alterações.

## Detalhes do Sermão

Cada entrada de sermão pode incluir:

- **Título** -- O nome do sermão exibido aos visitantes
- **Palestrante** -- Quem entregou o sermão
- **Data** -- A data de publicação ou entrega
- **Descrição** -- Um resumo do conteúdo do sermão
- **Miniatura** -- Uma imagem de visualização mostrada em sua biblioteca de sermões
- **Links de Vídeo/Áudio** -- URLs para a mídia do sermão no YouTube, Vimeo, Facebook ou um host personalizado
- **URL do Arquivo de Áudio (para podcast)** -- Um link direto para um arquivo MP3/M4A para este sermão. Cole uma URL ou clique em **Carregar Áudio** para carregar um arquivo e preenchê-lo automaticamente. Apenas sermões com este campo (ou um link de arquivo de vídeo direto) definido são incluídos no seu feed de podcast.

## Seu Feed de Podcast

Depois que pelo menos um sermão tem um arquivo de áudio ou vídeo anexado, B1 Admin gera um feed RSS de podcast para sua igreja automaticamente -- não há nada para ativar. Encontre-o no painel **Feed de Podcast** abaixo da lista de sermões: clique no ícone de cópia para copiar a URL do feed, depois envie essa URL para Apple Podcasts, Spotify ou qualquer outro diretório de podcast.

:::info
Sermões que apenas vinculam a um reprodutor incorporado (como um ID de vídeo do YouTube ou Vimeo) não aparecerão no feed de podcast -- aplicativos de podcast precisam de um arquivo de mídia direto e baixável. Adicione uma **URL de Arquivo de Áudio** para incluir um sermão.
:::

## Agendando um Sermão para Transmissão ao Vivo

Depois de adicionar um sermão, você pode agendá-lo para transmissão em sua página de transmissão ao vivo:

1. No menu Jump, escolha **Sermões > Tempos de Transmissão ao Vivo**.
2. Edite um serviço e em **Configurações de Vídeo**, selecione seu sermão no menu suspenso.
3. O sermão será exibido no horário do serviço agendado.

:::info
Para importar vários sermões de uma vez em vez de adicioná-los um por um, use a ferramenta [Importação em Lote](bulk-import) para puxar vídeos diretamente de sua conta do YouTube ou Vimeo.
:::

## Próximas Etapas

- [Playlists](playlists) -- Organize sermões em séries
- [Transmissão ao Vivo](live-streaming) -- Configure seu cronograma de transmissão
- [Importação em Lote](bulk-import) -- Importe vários sermões de uma vez
