---
title: "Escrevendo postagens de blog para o seu site no B1 Admin"
sidebar_label: "Blog"
description: "Crie, agende e publique postagens de blog no site da sua igreja pelo B1 Admin, incluindo resumos, categorias, tags, fotos de cabeçalho e incorporações de comentários."
---

# Blog

<div class="article-intro">

A página Blog permite publicar notícias, atualizações e devocionais no site da sua igreja. As postagens aparecem em uma listagem de cards em `/blog`, em seu próprio endereço e em um feed RSS que outras ferramentas (como o Zapier) podem acompanhar para detectar novas postagens.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração inicial](./initial-setup.md) do seu site
- Adicione um link de navegação para `/blog` em [Gerenciando páginas](./managing-pages.md), se quiser que os visitantes encontrem o seu blog pelo menu

</div>

## Acessando o blog {#accessing-the-blog}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Site**.
2. Clique em **Blog**.
3. A página Blog lista todas as postagens, com o estado e a data de publicação de cada uma.

## Adicionando uma postagem {#adding-a-post}

1. Clique em **Adicionar postagem** no canto superior direito.
2. Digite um **Título**. Um **Endereço web** amigável (slug) é gerado automaticamente conforme você digita -- você pode editá-lo diretamente se quiser um endereço diferente.
3. Adicione um **Resumo** -- um breve resumo exibido na listagem de postagens, nas meta descrições e no feed RSS. Se deixá-lo em branco, um resumo é gerado automaticamente a partir do início do conteúdo da postagem.
4. Escreva o corpo da postagem no editor de **Conteúdo**, usando Markdown. Clique em **Visualizar** para ver como a postagem formatada ficará.
5. Escolha uma **Categoria** (selecione uma existente ou digite uma nova) e, opcionalmente, **Tags** separadas por vírgula.
6. Clique em **Selecionar imagem** para escolher uma foto da galeria de [Arquivos](./files.md), ou envie uma nova. As fotos enviadas abrem em uma ferramenta de recorte integrada, travada na proporção 16:9, para que você enquadre qualquer foto no cabeçalho da postagem e nos cards da listagem.
7. Defina o **Autor** -- o padrão é você, mas você pode pesquisar e selecionar qualquer pessoa do seu banco de dados.
8. Ative **Publicada** quando estiver pronto para tornar a postagem pública. Um campo **Data de publicação** aparece, definido como hoje; altere-o se quiser outra data. Deixe o botão em **Rascunho** para salvar a postagem como rascunho.
9. Clique em **Salvar**. Uma postagem precisa de um título e de um endereço web que nenhuma outra postagem use.

:::tip
Defina uma **Data de publicação** no futuro para agendar uma postagem. Ela fica oculta dos visitantes e exibe um selo **Agendada** na lista do Blog até que essa data chegue.
:::

## Estados das postagens {#post-states}

Cada postagem na lista mostra um destes três estados:

- **Rascunho** -- Não publicada. Visível somente no painel administrativo.
- **Agendada** -- A opção Publicada está ativada, mas a data de publicação está no futuro.
- **Publicada** -- No ar no seu site e incluída no feed RSS.

## Editando, visualizando e excluindo postagens {#editing-previewing-and-deleting-posts}

- Clique em **Editar** ao lado de uma postagem para fazer alterações.
- Clique em **Ver no site** (exibido nas postagens publicadas) para abrir a postagem no ar, no seu site, em uma nova aba.
- Clique em **Excluir** para remover uma postagem permanentemente.

## Como os visitantes veem o seu blog {#how-visitors-see-your-blog}

As postagens publicadas aparecem em `{yoursite}/blog`, 10 por página, com links **Postagens anteriores**/**Postagens mais recentes** para navegar pelo arquivo, além de selos de categoria que filtram a listagem e a assinatura e a foto de cada postagem. As tags aparecem como selos clicáveis no final de cada postagem, permitindo que os visitantes filtrem a listagem por tag da mesma forma. As postagens individuais ficam em `{yoursite}/blog/{slug}` e terminam com uma seção **Mais em** *categoria*, listando até três outras postagens da mesma categoria. Veja [Blog](../../b1-church/content/blog.md) no guia do B1.church para saber o que os visitantes veem. A página do blog também publica um feed RSS, detectado automaticamente por leitores de feed e por ferramentas de automação como o Zapier.

As postagens publicadas também podem aparecer em uma seção **Notícias** na tela inicial do aplicativo da sua igreja, se você ativar essa opção -- veja [Seções da tela inicial](../settings/mobile-app.md#home-screen-sections).

:::info
As postagens de blog são um tipo de conteúdo separado das páginas comuns do site -- elas não são criadas no [editor de páginas](./page-editor.md) e não aparecem na lista de Páginas. Isso mantém a criação de postagens rápida e focada na escrita.
:::

## Adicionando comentários abaixo das postagens {#adding-comments-below-posts}

O B1 não hospeda comentários de blog por conta própria, mas você pode adicionar um serviço de comentários. Você também pode colocar qualquer outro conteúdo abaixo de todas as postagens, como um formulário de inscrição em newsletter ou um botão de doação.

1. Cadastre-se em um serviço de comentários, como [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) ou [Disqus](https://disqus.com), e copie o código de incorporação dele.
2. Na página Blog, role até **Abaixo de cada postagem**.
3. Cole o código de incorporação e clique em **Salvar**.

O código aparece abaixo do conteúdo de todas as postagens publicadas. O seu serviço de comentários cuida da moderação e do filtro de spam, então verifique o painel dele regularmente.

:::tip
Limpe a caixa e clique em **Salvar** para remover o código de todas as postagens. Somente quem pode editar as configurações da igreja vê esta caixa.
:::

## Próximos passos {#next-steps}

- [Gerenciando páginas](./managing-pages.md) -- Adicione um link de navegação para o seu blog
- [Arquivos](./files.md) -- Envie fotos para usar nas suas postagens
- [Integração com Zapier](../integrations/zapier.md) -- Dispare automações quando novas postagens forem publicadas
