---
title: "Gerenciando sermões"
description: "Gerencie sua biblioteca de sermões no B1 Admin: adicione sermões do YouTube, do Vimeo ou do Facebook, edite os detalhes e obtenha um feed de podcast para a sua igreja."
---

# Gerenciando sermões

<div class="article-intro">

A página Sermões exibe toda a sua biblioteca de sermões. A partir dela, você pode adicionar novos sermões, editar os registros existentes e organizar seu conteúdo por playlist. Cada sermão pode apontar para um vídeo ou áudio hospedado no YouTube, no Vimeo, no Facebook ou em uma URL personalizada.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar cultos** na seção **Conteúdo** da sua função. Veja [Funções e permissões](../settings/roles-permissions.md) se você não tiver acesso.
- Crie pelo menos uma [playlist](./playlists.md) para organizar seus sermões
- Tenha em mãos os IDs ou URLs dos seus vídeos no YouTube, no Vimeo ou no Facebook

</div>

## Visualizando sua biblioteca de sermões {#viewing-your-sermon-library}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Sermões** e clique em **Sermões**.
2. A página Sermões mostra seus sermões em uma tabela, com a **Playlist**, o título (**Sermão**) e a **Data de publicação** de cada um, do mais recente para o mais antigo, com uma contagem como "11 de 11 sermões". Digite na caixa **Pesquisar sermões por título ou playlist...** para filtrar a lista. Suas playlists aparecem em um painel **Playlists** ao lado da tabela, com o painel **Feed de podcast** abaixo dele.
3. Passe o mouse sobre a linha de um sermão e clique em **Editar** para visualizar ou editar os detalhes.

## Adicionando um sermão {#adding-a-sermon}

1. Clique no botão **Adicionar sermão** no canto superior direito e selecione **Adicionar sermão** na lista suspensa. Um formulário **Editar sermão** é aberto acima da lista.
2. Selecione uma **Playlist** para atribuir o sermão (ou deixe em **Nenhuma**).
3. Escolha o seu **Provedor de vídeo** -- **YouTube**, **Vimeo**, **Facebook** ou **URL de incorporação personalizada**. Recomendamos o YouTube, pois funciona melhor com o sistema B1.
4. Digite o **ID do YouTube**, o **ID do Vimeo**, o **ID do sermão** (Facebook) ou a **URL de incorporação do sermão**. Você pode colar o link completo do vídeo; o B1 mantém apenas o ID. No caso do YouTube, o ID do vídeo é a sequência de caracteres após `v=` na URL do YouTube.
5. Para YouTube e Vimeo, clique em **Buscar** para importar automaticamente os detalhes do sermão, incluindo a data de publicação, a duração, o título, a descrição e a miniatura. Se os detalhes não puderem ser carregados, uma mensagem informará isso e você poderá preenchê-los manualmente.
6. Faça as alterações que quiser e clique em **Salvar**.

:::tip
Você também pode adicionar uma URL de transmissão ao vivo permanente selecionando **Adicionar URL de transmissão permanente** na lista suspensa **Adicionar sermão**. Isso cria uma conexão permanente com a transmissão ao vivo do seu canal do YouTube, usando o ID do seu canal. Veja [Transmissão ao vivo](./live-streaming.md) para mais detalhes.
:::

## Editando um sermão {#editing-a-sermon}

1. Clique em **Editar** em qualquer linha de sermão da sua biblioteca para abrir os detalhes.
2. Atualize o título, a data, a descrição, a miniatura, a duração ou os links de mídia conforme necessário.
3. Clique em **Salvar** para aplicar as alterações, ou em **Cancelar** para fechar o formulário.

Para remover um sermão, abra-o, clique em **Excluir** e confirme.

### Adicionando um sermão a outra playlist {#adding-a-sermon-to-another-playlist}

Para listar o mesmo sermão em uma segunda playlist (por exemplo, um sermão que pertence a uma série e também a uma coleção "Melhores momentos"), abra o sermão, clique em **Adicionar a outra playlist**, escolha a playlist e clique em **Adicionar**. Isso salva uma cópia do sermão naquela playlist.

## Detalhes do sermão {#sermon-details}

Cada registro de sermão pode incluir:

- **Playlist** -- A série à qual o sermão pertence
- **Provedor de vídeo** e ID do vídeo -- Onde o vídeo do sermão está hospedado: YouTube, Vimeo, Facebook ou uma URL de incorporação personalizada
- **Data de publicação** -- A data em que o sermão é publicado; sermões sem data mostram **Não agendado** na lista
- **Duração total do sermão** -- A duração do sermão em minutos e segundos
- **Miniatura** -- Uma imagem de visualização exibida na sua biblioteca de sermões. Clique na imagem para recortá-la ou substituí-la (16:9).
- **Título** -- O nome do sermão exibido aos visitantes
- **Descrição** -- Um resumo do conteúdo do sermão
- **URL do arquivo de áudio (para podcast)** -- Um link direto para um arquivo MP3/M4A deste sermão. Cole uma URL ou, depois que o sermão for salvo, clique em **Enviar áudio** para enviar um arquivo, que preencherá o campo automaticamente. Somente sermões com este campo (ou com um link direto para um arquivo de vídeo) preenchido são incluídos no seu feed de podcast.

## Seu feed de podcast {#your-podcast-feed}

Assim que pelo menos um sermão tiver um arquivo de áudio ou vídeo anexado, o B1 Admin gera automaticamente um feed RSS de podcast para a sua igreja -- não há nada para ativar. Encontre-o no painel **Feed de podcast** ao lado da lista de sermões (abaixo do painel **Playlists**): clique no ícone de cópia para copiar a URL do feed e depois envie essa URL ao Apple Podcasts, ao Spotify ou a qualquer outro diretório de podcasts.

:::info
Sermões que apenas apontam para um player incorporado (como um ID de vídeo do YouTube ou do Vimeo) não aparecem no feed de podcast -- os aplicativos de podcast precisam de um arquivo de mídia direto e baixável. Adicione uma **URL do arquivo de áudio** para incluir um sermão.
:::

## Agendando um sermão para a transmissão ao vivo {#scheduling-a-sermon-for-live-stream}

Depois de adicionar um sermão, você pode agendá-lo para ser transmitido na sua página de transmissão ao vivo:

1. No Menu de atalhos, escolha **Sermões > Horários de transmissão ao vivo**.
2. Edite um culto e, em **Configurações de vídeo**, selecione seu sermão na lista suspensa **Sermão**.
3. O sermão será exibido no horário agendado do culto.

:::info
Para importar vários sermões de uma vez, em vez de adicioná-los um por um, use a ferramenta [Importação em massa](./bulk-import.md) para trazer vídeos diretamente da sua conta do YouTube ou do Vimeo.
:::

## Próximos passos {#next-steps}

- [Playlists](./playlists.md) -- Organize os sermões em séries
- [Transmissão ao vivo](./live-streaming.md) -- Configure sua agenda de transmissão
- [Importação em massa](./bulk-import.md) -- Importe vários sermões de uma vez
