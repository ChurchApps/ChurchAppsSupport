---
title: "Gerenciando Sermões"
---

# Gerenciando Sermões

<div class="article-intro">

A página Sermões exibe sua biblioteca de sermões inteira. A partir daqui você pode adicionar novos sermões, editar entradas existentes e organizar seu conteúdo por playlist. Cada sermão pode vincular a vídeo ou áudio hospedados no YouTube, Vimeo, Facebook ou uma URL personalizada.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **contentApi.streamingServices.edit**. Consulte [Funções e Permissões](../settings/roles-permissions.md) se você não tiver acesso.
- Crie pelo menos uma [playlist](playlists) para organizar seus sermões
- Tenha seus IDs de vídeo ou URLs prontos do YouTube, Vimeo ou Facebook

</div>

## Visualizando Sua Biblioteca de Sermões

1. No B1 Admin, abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Sermões**.
2. A página Sermões mostra todas as suas entradas de sermão, organizadas por playlist. Cada sermão exibe sua miniatura, título e data.
3. Clique em qualquer sermão para visualizar ou editar seus detalhes.

## Adicionando um Sermão

1. Clique no botão **Adicionar Sermão** no canto superior direito e selecione **Adicionar Sermão** no menu suspenso.
2. Selecione uma **Playlist** para atribuir o sermão.
3. Escolha seu **Provedor de Vídeo** -- YouTube, Vimeo, Facebook ou URL Personalizada. Recomendamos YouTube já que funciona melhor com o sistema B1.
4. Insira o ID do vídeo ou URL e clique em **Fetch**. Para YouTube, o ID do vídeo é a sequência de caracteres após `v=` na URL do YouTube.
5. Quando você clica em **Fetch**, os detalhes do sermão são importados automaticamente, incluindo a data de publicação, duração, título, descrição e miniatura.
6. Faça qualquer mudança que você queira e clique em **Salvar**.

:::tip
Você também pode adicionar uma URL de transmissão ao vivo permanente selecionando **Adicionar URL ao Vivo Permanente** no menu suspenso **Adicionar Sermão**. Isso cria uma conexão persistente com a transmissão ao vivo do canal YouTube usando seu ID de Canal. Consulte [Transmissão ao Vivo](live-streaming) para mais detalhes.
:::

## Editando um Sermão

1. Clique em qualquer sermão em sua biblioteca para abrir seus detalhes.
2. Atualize o título, orador, data, descrição, miniatura ou links de mídia conforme necessário.
3. Clique em **Salvar** para aplicar suas mudanças.

## Detalhes do Sermão

Cada entrada de sermão pode incluir:

- **Título** -- O nome do sermão exibido aos visitantes
- **Orador** -- Quem entregou o sermão
- **Data** -- A data de publicação ou entrega
- **Descrição** -- Um resumo do conteúdo do sermão
- **Miniatura** -- Uma imagem de visualização mostrada em sua biblioteca de sermões
- **Links de Vídeo/Áudio** -- URLs para a mídia de sermão no YouTube, Vimeo, Facebook ou um host personalizado

## Agendando um Sermão para Transmissão ao Vivo

Depois de adicionar um sermão, você pode agendá-lo para transmissão em sua página de transmissão ao vivo:

1. Vá para a aba **Horários de Transmissão ao Vivo**.
2. Edite um serviço e em **Configurações de Vídeo**, selecione seu sermão no menu suspenso.
3. O sermão será reproduzido no horário de serviço agendado.

:::info
Para importar múltiplos sermões de uma vez em vez de adicioná-los um por um, use a ferramenta [Importação em Massa](bulk-import) para puxar vídeos diretamente de sua conta YouTube ou Vimeo.
:::

## Próximos Passos

- [Playlists](playlists) -- Organize sermões em séries
- [Transmissão ao Vivo](live-streaming) -- Configure seu agendamento de transmissão
- [Importação em Massa](bulk-import) -- Importe múltiplos sermões de uma vez
