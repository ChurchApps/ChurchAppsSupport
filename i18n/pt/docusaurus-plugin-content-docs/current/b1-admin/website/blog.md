---
title: "Blog"
---

# Blog

<div class="article-intro">

A página Blog permite que você publique notícias, atualizações e devocionais no site da sua igreja. As postagens aparecem em uma listagem em cartões em `/blog`, em sua própria URL, e em um feed RSS que outras ferramentas (como o Zapier) podem monitorar para novas postagens.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conclua a [Configuração Inicial](initial-setup) do seu site
- Adicione um link de navegação para `/blog` em [Gerenciando Páginas](managing-pages) se você quiser que os visitantes encontrem seu blog pelo menu

</div>

## Acessando o Blog

1. No B1 Admin, clique em **Website** no menu à esquerda.
2. Clique na aba **Blog** na parte superior da visão Website Pages.
3. A página Blog lista todas as postagens junto com seu estado e data de publicação.

## Adicionando uma Postagem

1. Clique em **Add Post** no canto superior direito.
2. Digite um **Title**. Um slug amigável para URL é gerado automaticamente enquanto você digita -- você pode editá-lo diretamente se quiser um endereço diferente.
3. Adicione um **Excerpt** -- um breve resumo mostrado na listagem de postagens, nas meta descrições e no feed RSS. Se você deixar em branco, um resumo é gerado automaticamente a partir do início do conteúdo da sua postagem.
4. Escreva o corpo da postagem no editor **Content** usando Markdown. Clique em **Preview** para ver como a postagem formatada vai ficar.
5. Escolha uma **Category** (selecione uma existente ou digite uma nova) e **Tags** opcionais separadas por vírgula.
6. Clique em **Select Image** para escolher uma foto na sua galeria de [Files](files), ou envie uma nova. As fotos enviadas abrem em uma ferramenta de corte integrada travada em uma proporção de 16:9, para que você possa enquadrar qualquer foto para caber no cabeçalho da postagem e nos cartões de listagem.
7. Defina o **Author** -- por padrão é você, mas você pode pesquisar e selecionar qualquer pessoa no seu banco de dados.
8. Ative **Published** e defina uma **Publish Date** quando estiver pronto para tornar a postagem pública. Deixe desativado para salvar a postagem como rascunho.

:::tip
Defina uma **Publish Date** no futuro para agendar uma postagem. Ela permanece oculta dos visitantes e mostra um chip **Scheduled** na lista do Blog até que a data chegue.
:::

## Estados da Postagem

Cada postagem na lista mostra um de três estados:

- **Draft** -- Não publicada. Visível apenas no admin.
- **Scheduled** -- Published está ativado, mas a data de publicação está no futuro.
- **Published** -- Ativa no seu site e incluída no feed RSS.

## Editando, Pré-visualizando e Excluindo Postagens

- Clique no ícone **Edit** ao lado de uma postagem para fazer alterações.
- Clique no ícone **View** (visível em postagens publicadas) para abrir a postagem ativa no seu site em uma nova aba.
- Clique no ícone **Delete** para remover uma postagem permanentemente.

## Como os Visitantes Veem Seu Blog

As postagens publicadas aparecem em `{yoursite}/blog`, 10 por página, com links **Older**/**Newer** para navegar pelo seu arquivo, além de um filtro de categoria e a assinatura e a foto de cada postagem. As tags também são exibidas como chips clicáveis, permitindo que os visitantes filtrem a lista por tag da mesma forma. Postagens individuais ficam em `{yoursite}/blog/{slug}` e incluem postagens relacionadas da mesma categoria. A página do blog também publica um feed RSS, detectável automaticamente por leitores de feed e ferramentas de automação como o Zapier.

:::info
As postagens do blog são um tipo de conteúdo separado das páginas comuns do site -- elas não são criadas no [editor de páginas](page-editor) e não aparecem na lista Pages. Isso mantém a criação de conteúdo do blog rápida e focada na escrita.
:::

## Próximos Passos

- [Gerenciando Páginas](managing-pages) -- Adicione um link de navegação para o seu blog
- [Files](files) -- Envie fotos para usar em suas postagens
- [Integração com Zapier](../integrations/zapier.md) -- Dispare automações quando novas postagens forem publicadas
