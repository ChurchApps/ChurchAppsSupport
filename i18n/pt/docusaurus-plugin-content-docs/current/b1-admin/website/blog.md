---
title: "Blog"
---

# Blog

<div class="article-intro">

A página Blog permite que você publique notícias, atualizações e devocionais no site da sua igreja. Os posts aparecem em uma listagem de cartões em `/blog`, em sua própria URL e em um feed RSS que outras ferramentas (como Zapier) podem monitorar para novos posts.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete a [Configuração Inicial](initial-setup) do seu site
- Adicione um link de navegação para `/blog` a partir de [Managing Pages](managing-pages) se deseja que visitantes encontrem seu blog no menu

</div>

## Acessando o Blog

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Website**.
2. Clique em **Blog**.
3. A página Blog lista cada post junto com seu estado e data de publicação.

## Adicionando um Post

1. Clique em **Add Post** no canto superior direito.
2. Digite um **Title**. Um slug amigável para URL é gerado automaticamente conforme você digita -- você pode editá-lo diretamente se quiser um endereço diferente.
3. Adicione um **Excerpt** -- um resumo curto mostrado na listagem de posts, descrições de meta e feed RSS. Se deixar em branco, um é gerado automaticamente a partir do início do conteúdo do seu post.
4. Escreva o corpo do post no editor **Content** usando Markdown. Clique em **Preview** para ver como o post formatado será exibido.
5. Escolha uma **Category** (escolha uma existente ou digite uma nova) e **Tags** opcionais separadas por vírgula.
6. Clique em **Select Image** para escolher uma foto de sua galeria [Files](files), ou envie uma nova. Fotos enviadas abrem em uma ferramenta de corte integrada travada em uma proporção 16:9, para que você possa enquadrar qualquer foto de modo a se ajustar ao cabeçalho do post e aos cartões da listagem.
7. Defina o **Author** -- padrão é você, mas você pode pesquisar e selecionar qualquer pessoa em seu banco de dados.
8. Ative **Published** e defina uma **Publish Date** quando estiver pronto para tornar o post público. Deixe desativado para salvar o post como rascunho.

:::tip
Defina uma **Publish Date** no futuro para agendar um post. Ele permanece oculto dos visitantes e mostra um chip **Scheduled** na lista Blog até essa data chegar.
:::

## Estados de Posts

Cada post na lista mostra um de três estados:

- **Draft** -- Não publicado. Visível apenas no admin.
- **Scheduled** -- Published está ativado, mas a data de publicação é no futuro.
- **Published** -- Ao vivo no seu site e incluído no feed RSS.

## Editando, Visualizando e Deletando Posts

- Clique no ícone **Edit** ao lado de um post para fazer alterações.
- Clique no ícone **View** (visível em posts publicados) para abrir o post ao vivo no seu site em uma nova aba.
- Clique no ícone **Delete** para remover permanentemente um post.

## Como Visitantes Veem Seu Blog

Posts publicados aparecem em `{yoursite}/blog`, 10 por página com links **Older**/**Newer** para navegar pelo seu arquivo, junto com um filtro de categoria e a linha de rodapé e foto de cada post. Tags são renderizadas como chips clicáveis também, permitindo que visitantes filtrem a listagem por tag da mesma forma. Posts individuais estão em `{yoursite}/blog/{slug}` e incluem posts relacionados da mesma categoria. A página de blog também publica um feed RSS, descoberto automaticamente por leitores de feed e ferramentas de automação como Zapier.

:::info
Posts de blog são um tipo de conteúdo separado de páginas normais de site -- eles não são construídos no [editor de página](page-editor) e não aparecem na lista de Páginas. Isso mantém a autoria de blog rápida e focada na escrita.
:::

## Próximas Etapas

- [Managing Pages](managing-pages) -- Adicione um link de navegação para seu blog
- [Files](files) -- Envie fotos para usar em seus posts
- [Zapier Integration](../integrations/zapier.md) -- Dispare automações quando novos posts são publicados
