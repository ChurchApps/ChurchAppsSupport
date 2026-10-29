---
title: "Blog"
---

# Blog

<div class="article-intro">

A página Blog permite publicar notícias, atualizações e devocionais no site da sua igreja. As postagens aparecem em uma lista de cartões em `/blog`, na sua própria URL e em um feed RSS que outras ferramentas (como o Zapier) podem acompanhar para detectar novas postagens.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conclua a [Configuração inicial](initial-setup) do seu site
- Adicione um link de navegação para `/blog` em [Gerenciando páginas](managing-pages) se quiser que os visitantes encontrem o seu blog pelo menu

</div>

## Acessando o Blog

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Site**.
2. Clique em **Blog**.
3. A página Blog lista todas as postagens, com o estado e a data de publicação de cada uma.

## Adicionando uma Postagem

1. Clique em **Adicionar postagem** no canto superior direito.
2. Digite um **Título**. Um **Endereço web** amigável para URL (slug) é gerado automaticamente conforme você digita -- você pode editá-lo diretamente se quiser outro endereço.
3. Adicione um **Resumo** -- um breve texto mostrado na lista de postagens, nas meta descrições e no feed RSS. Se você deixá-lo em branco, um é gerado automaticamente a partir do início do conteúdo da postagem.
4. Escreva o corpo da postagem no editor de **Conteúdo** usando Markdown. Clique em **Pré-visualizar** para ver como a postagem formatada vai ficar.
5. Escolha uma **Categoria** (selecione uma existente ou digite uma nova) e, opcionalmente, **Tags** separadas por vírgula.
6. Clique em **Selecionar imagem** para escolher uma foto da sua galeria de [Arquivos](files), ou envie uma nova. As fotos enviadas abrem em uma ferramenta de recorte integrada, travada na proporção 16:9, para que você enquadre qualquer foto para caber no cabeçalho da postagem e nos cartões da lista.
7. Defina o **Autor** -- por padrão é você, mas você pode pesquisar e selecionar qualquer pessoa do seu banco de dados.
8. Ative **Publicado** e defina uma **Data de publicação** quando estiver pronto para tornar a postagem pública. Deixe desativado para salvar a postagem como rascunho.

:::tip
Defina uma **Data de publicação** no futuro para agendar uma postagem. Ela fica oculta dos visitantes e mostra um marcador **Agendado** na lista do Blog até que essa data chegue.
:::

## Estados das Postagens

Cada postagem da lista mostra um destes três estados:

- **Rascunho** -- Não publicada. Visível somente no painel administrativo.
- **Agendada** -- Publicado está ativado, mas a data de publicação está no futuro.
- **Publicada** -- No ar no seu site e incluída no feed RSS.

## Editando, Pré-visualizando e Excluindo Postagens

- Clique em **Editar** ao lado de uma postagem para fazer alterações.
- Clique em **Ver no site** (exibido em postagens publicadas) para abrir a postagem ao vivo no seu site, em uma nova aba.
- Clique em **Excluir** para remover permanentemente uma postagem.

## Como os Visitantes Veem o Seu Blog

As postagens publicadas aparecem em `{seusite}/blog`, 10 por página, com links **Anteriores**/**Próximas** para navegar pelo arquivo, junto com um filtro por categoria e a assinatura e a foto de cada postagem. As tags também aparecem como chips clicáveis, permitindo que os visitantes filtrem a lista por tag da mesma forma. Cada postagem individual fica em `{seusite}/blog/{slug}` e inclui postagens relacionadas da mesma categoria. A página do blog também publica um feed RSS, detectável automaticamente por leitores de feed e por ferramentas de automação como o Zapier.

:::info
As postagens do blog são um tipo de conteúdo separado das páginas comuns do site -- elas não são criadas no [editor de páginas](page-editor) e não aparecem na lista de Páginas. Isso mantém a escrita de blog rápida e focada no texto.
:::

## Adicionando Comentários Abaixo das Postagens

O B1 não hospeda comentários de blog, mas você pode adicionar um serviço de comentários. Você também pode colocar qualquer outra coisa abaixo de todas as postagens, como um cadastro para newsletter ou um botão de contribuição.

1. Cadastre-se em um serviço de comentários, como [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) ou [Disqus](https://disqus.com), e copie o código de incorporação dele.
2. Na página Blog, role até **Abaixo de Cada Postagem**.
3. Cole o código de incorporação e clique em **Salvar**.

O código aparece abaixo do conteúdo de cada postagem publicada. O seu serviço de comentários cuida da moderação e do filtro de spam, então verifique o painel dele regularmente.

:::tip
Limpe a caixa e clique em **Salvar** para remover o código de todas as postagens. Somente quem pode editar as configurações da igreja vê essa caixa.
:::

## Próximos Passos

- [Gerenciando páginas](managing-pages) -- Adicione um link de navegação para o seu blog
- [Arquivos](files) -- Envie fotos para usar nas suas postagens
- [Integração com Zapier](../integrations/zapier.md) -- Dispare automações quando novas postagens forem publicadas
