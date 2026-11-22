---
title: "Importação em massa"
description: "Importe vídeos de sermões em massa de um canal do YouTube ou de uma conta do Vimeo, ou episódios de podcast de um feed RSS, para o B1 Admin e depois organize-os em uma playlist."
---

# Importação em massa

<div class="article-intro">

A página de Importação em massa permite preencher rapidamente sua biblioteca de sermões importando vídeos do YouTube ou do Vimeo, ou episódios de um feed RSS de podcast. É a forma mais rápida de trazer o conteúdo de sermões que você já tem, em vez de adicionar cada sermão um por um.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar cultos** na seção **Conteúdo** da sua função. Veja [Funções e permissões](../settings/roles-permissions.md) se você não tiver acesso.
- Crie pelo menos uma [playlist](./playlists.md) para importar seus sermões
- Tenha em mãos o ID do seu canal do YouTube, as informações da sua conta do Vimeo ou o endereço do feed do seu podcast

</div>

## Escolhendo a origem {#choosing-your-source}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Sermões** e clique em **Sermões**. Clique em **Adicionar sermão** e escolha **Importação em massa** no menu.
2. Em **Escolha a origem da importação**, você verá três opções:
   - **YouTube** -- Importe vídeos de um canal do YouTube
   - **Vimeo** -- Importe vídeos de uma conta do Vimeo
   - **Feed RSS de podcast** -- Importe episódios de um feed de podcast como sermões em áudio
3. Clique na opção da plataforma onde seus sermões estão hospedados (ou clique em **Importar do YouTube**, **Importar do Vimeo** ou **Importar do feed de podcast** abaixo da descrição). Clique em **Voltar** no topo da página para retornar à escolha da origem.

:::tip
Você pode voltar e trocar de origem a qualquer momento, caso tenha vídeos em ambas as plataformas.
:::

## Antes de importar {#before-you-import}

Antes de importar os vídeos, você precisa de pelo menos uma playlist para organizá-los. Se ainda não criou nenhuma playlist:

1. Volte para a página **Sermões** e encontre o painel **Playlists**.
2. Clique em **Criar primeira playlist** e preencha o nome, a descrição, a data de publicação e a miniatura.
3. Clique em **Salvar** e depois volte à Importação em massa clicando em **Adicionar sermão** e escolhendo **Importação em massa**.

Veja [Playlists](./playlists.md) para instruções detalhadas sobre como criar e gerenciar playlists.

## Importando os vídeos {#importing-videos}

1. Depois de selecionar YouTube ou Vimeo, digite o seu **ID do canal do YouTube** ou o **ID do canal do Vimeo** no campo indicado.
2. Clique no botão **Buscar** para recuperar os vídeos do seu canal. Se os vídeos não puderem ser carregados ou se o canal não tiver nenhum, uma mensagem informará isso; verifique o ID e tente novamente.
3. Após a busca, você verá uma lista dos seus vídeos, cada um com uma caixa de seleção em **Importar**.
4. Marque a caixa ao lado de cada vídeo que você quer importar.
5. Clique na lista suspensa **Importar para a playlist** para escolher a qual playlist esses vídeos devem ser adicionados.
6. Clique no botão **Importar** para concluir a importação em massa. Você volta à escolha da origem quando ela terminar.

Se você clicar em **Importar** sem escolher uma playlist ou marcar algum vídeo, o B1 pedirá que você faça isso primeiro. Clique em **Cancelar** para sair sem importar.

Seus vídeos serão importados com todos os seus detalhes, incluindo títulos, descrições, datas e miniaturas. Caracteres especiais nos títulos e descrições do YouTube, como `&`, apóstrofos e aspas, são importados como foram escritos, e não como códigos como `&amp;`.

:::info
A importação em massa é ideal para começar quando você está migrando de outra plataforma. Para adicionar sermões individuais daqui em diante, use a página [Gerenciando sermões](./managing-sermons.md).
:::

## Importando episódios de podcast {#importing-podcast-episodes}

Se os seus sermões são publicados como podcast (Spotify for Podcasters / Anchor, Buzzsprout, Podbean e outros), você pode trazer os episódios como sermões em áudio.

1. Escolha **Feed RSS de podcast** e cole o endereço do seu feed no campo **URL do feed do podcast**. Onde encontrá-lo:
   - **Spotify for Podcasters (Anchor)** -- **Configurações** > **Disponibilidade** > **Distribuição RSS**. O endereço tem a forma `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- o link **Feed RSS** no painel do seu podcast.
   - A maioria das outras hospedagens mostra o endereço do feed RSS nas configurações do podcast ou na página de distribuição.
2. Clique em **Buscar**. O nome do podcast aparece acima de uma lista dos seus episódios, com as datas de publicação. Se o feed não puder ser carregado ou não tiver episódios em áudio, uma mensagem informará isso; verifique o endereço e tente novamente.
3. Os episódios novos já vêm marcados para você. Os episódios que já estão na sua biblioteca de sermões são marcados como **Já importado** e não podem ser marcados, para que nada seja adicionado duas vezes.
4. Desmarque os episódios que não quer, escolha uma playlist em **Importar para a playlist** e clique em **Importar**.

Cada episódio se torna um sermão em áudio com título, descrição, data, imagem e duração. Os membros veem **Ouvir** e **Baixar áudio** nesses sermões no aplicativo B1.

A importação é uma cópia única, e não um link ativo para o feed. Quando você publicar novos episódios, volte e execute a importação de novo com o mesmo endereço de feed; apenas os episódios novos são marcados.

:::note
Somente o áudio é importado. Episódios de podcast em vídeo não são trazidos; adicione-os pelo YouTube, pelo Vimeo ou pela página [Gerenciando sermões](./managing-sermons.md).
:::

:::tip
Quer uma lista no seu site ou aplicativo que sempre espelhe o seu podcast, sem importar de novo? Adicione o elemento **Podcast** a uma página no construtor do site e, depois, adicione essa página como uma aba **Página** no seu aplicativo móvel.
:::

## Próximos passos {#next-steps}

- [Gerenciando sermões](./managing-sermons.md) -- Edite os detalhes dos sermões importados
- [Playlists](./playlists.md) -- Crie e gerencie séries de sermões
- [Transmissão ao vivo](./live-streaming.md) -- Configure a transmissão ao vivo dos seus cultos
