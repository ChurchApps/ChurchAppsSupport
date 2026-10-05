---
title: "Gerenciando Páginas"
---

# Gerenciando Páginas

<div class="article-intro">

A visualização Website Pages é seu hub central para criar, editar e organizar todas as páginas do site da sua igreja. Você pode gerenciar o conteúdo de suas páginas e a navegação do seu site a partir de uma única tela.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete a [Configuração Inicial](initial-setup) para configurar seu domínio e configurações básicas do site
- Tenha seu conteúdo e imagens prontos. Use o gerenciador [Files](files) para enviar ativos de mídia primeiro.

</div>

:::info
Se sua igreja tem mais de um site (por exemplo, sites separados por campus), use o alternador de site no topo da visualização Website Pages para pular entre eles. Cada site tem suas próprias páginas, navegação e configurações de [appearance](appearance).
:::

## Compreendendo Tipos de Página

A tabela **Pages** lista todas as páginas do seu site junto com seu status:

- **Generated** -- Páginas que foram criadas automaticamente pelo sistema com base nos dados da sua igreja (por exemplo, uma página Groups, uma página Sermons ou uma página individual para cada sermão em sua biblioteca). Essas páginas se atualizam enquanto seus dados mudam.
- **Custom** -- Páginas que você criou com seu próprio conteúdo e layout.

Você pode converter qualquer página gerada automaticamente em uma página personalizada se quiser controle total sobre seu conteúdo e design.

## Adicionando e Editando Páginas

1. Clique no botão **Add Page** no canto superior direito da tabela Pages.
2. Escolha um tipo de página (em branco ou um modelo) e nomeie.
3. Clique em **Edit Content** ao lado de qualquer página para abrir o [editor de página](page-editor), onde você pode adicionar seções, texto, imagens e outros elementos.
4. Clique em **Page Settings** (o ícone de engrenagem) para atualizar o título da página, caminho de URL e outros metadados.
5. Use o botão **View live page** para abrir sua página em uma nova janela e ver exatamente como se parecerá para os visitantes.

:::tip
Para sua página inicial, defina o caminho da URL como apenas `/`. Para todas as outras páginas, use um caminho descritivo como `/about` ou `/contact`.
:::

### Configurações de Página

Abra **Page Settings** em qualquer página para configurar:

- **Title and URL Path** -- O nome da página e seu endereço no seu site.
- **Visibility** -- Escolha quem pode ver a página: todos, apenas membros, apenas equipe ou membros de grupos específicos. Esta é uma maneira rápida de bloquear uma página privada (como uma página de recurso da equipe) sem uma senha separada.
- **Meta Description** -- Um resumo curto mostrado em resultados de mecanismo de pesquisa e visualizações de links de mídia social.
- **Redirects** -- Aponte um caminho de URL antigo para esta página, para que links e favoritos para uma página aposentada continuem funcionando.

## Gerenciando Navegação

A visualização Website Pages exibe seus links de navegação. Esses links controlam o menu que os visitantes veem no seu site.

1. Clique em **Add** para criar um novo link de navegação. Você pode apontá-lo para qualquer página do seu site ou para uma URL externa.
2. Para reordenar links, arraste e solte-os na ordem desejada. Você também pode aninhar links sob um item pai para criar menus suspensos.
3. Clique no ícone **Edit** ao lado de qualquer link para alterar seu rótulo, URL ou posição.
4. Para remover um link da navegação, clique no ícone **Delete**.

:::info
Remover um link de navegação não deleta a página em si. A página ainda existe e pode ser acessada diretamente por sua URL -- ela simplesmente não aparecerá no menu.
:::

## Opções do Site

Acima de **Main Navigation** no lado esquerdo da visualização Website Pages estão dois switches que se aplicam a todo seu site de igreja:

- **Show Login** -- Mostra um botão **Login** na barra de navegação do seu site.
- **Disable Public Website** -- Desativa seu site público. Use se sua igreja usar B1 apenas para seu portal de membros, doação e registros, e manter seu site principal em outro lugar.

### O que Desativar o Site Público Faz

Quando **Disable Public Website** está ativado:

- Toda página pública, incluindo a página inicial e suas páginas personalizadas, envia visitantes que não estão conectados para a tela de login. Após fazerem login, eles voltam para a página que pediram.
- Membros conectados veem o site completo como de costume, incluindo sua navegação e páginas **Generated** integradas (como Groups e Sermons). Páginas geradas não aparecem mais na tabela Pages.
- Mecanismos de pesquisa são informados para não indexar o site. O mapa do site está vazio e `robots.txt` bloqueia toda a rastreamento.

Esses links continuam funcionando, para que membros e convidados ainda possam alcançá-los:

- Login e logout
- O portal de membros (tudo sob `/mobile`)
- Links de [event registration](../guides/event-registration.md) e registro de convidados

Um aviso aparece sob o switch enquanto o site público está desativado. Ative o switch novamente para trazer suas páginas de volta. Nada é deletado enquanto o site está desativado.

:::info
Esta configuração se aplica a toda sua igreja. Se você tiver mais de um site, desativa todos eles, não apenas o selecionado no alternador de site.
:::

## Dicas para Organizar Seu Site

- Mantenha sua navegação de nível superior em cinco ou seis itens para que visitantes encontrem coisas rapidamente.
- Use links aninhados para sub-páginas relacionadas (por exemplo, um dropdown "About" com "Our Team", "Beliefs" e "History").
- Revise sua navegação em mobile clicando em **Mobile Preview** para certificar-se de que funciona bem em telas menores.
- Dê às páginas nomes claros e descritivos que ajudem visitantes a entender o que encontrarão.

:::tip
Você pode adicionar [formulários](../forms/creating-forms.md) a suas páginas para coletar registros, pedidos de oração ou outras informações de visitantes.
:::

## Começando a partir de um Modelo de Site

Se você está construindo seu site do zero, você pode iniciá-lo usando um **Site Template** em vez de criar páginas uma por uma. Um modelo de site cria um conjunto de páginas pré-construídas -- home, about, connect, give e outras -- com conteúdo de espaço reservado e links de navegação já ligados.

1. Na tela Pages, clique no botão **Site Templates** (ao lado do botão **Add Page**).
2. Navegue pelos templates disponíveis e clique em um para visualizar sua estrutura de página.
3. Quando encontrar um que gosta, clique em **Apply Template**.
4. Páginas que não existem já são criadas e adicionadas à sua navegação. Páginas existentes são deixadas como estão.

Após aplicar um modelo, abra cada página no [editor de página](page-editor) para substituir o texto e imagens de espaço reservado com o conteúdo real da sua igreja.

:::info
Modelos de site criam estrutura de página e navegação. Eles não substituem seu esquema de cores ou fontes do site -- esses são controlados por [Appearance](appearance).
:::

## Caixa de Luz de Imagem

Quando visitantes clicam em uma imagem no seu site, ela abre em uma sobreposição de caixa de luz em tela inteira. Isso permite que as pessoas visualizem fotos em um tamanho maior sem sair da página. Nenhuma configuração é necessária -- a caixa de luz é ativada automaticamente para imagens em seu conteúdo de página.

## Próximas Etapas

- [Initial Setup](initial-setup) -- Instruções de configuração pela primeira vez
- [Using the Page Editor](page-editor) -- Aprenda como construir e estilizar conteúdo de página
- [Appearance](appearance) -- Personalize o tema visual do seu site
- [Files](files) -- Envie e gerencie ativos de mídia para suas páginas
