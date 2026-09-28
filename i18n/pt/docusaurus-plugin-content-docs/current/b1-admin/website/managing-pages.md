---
title: "Gerenciando Páginas"
---

# Gerenciando Páginas

<div class="article-intro">

A visualização de Páginas do Site é seu centro central para criar, editar e organizar todas as páginas no site da sua igreja. Você pode gerenciar o conteúdo de sua página e a navegação de seu site a partir desta tela única.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete a [Configuração Inicial](initial-setup) para configurar seu domínio e configurações básicas do site
- Tenha seu conteúdo e imagens prontos. Use o gerenciador [Arquivos](files) para fazer o upload de ativos de mídia primeiro.

</div>

:::info
Se sua igreja tem mais de um site (por exemplo, sites separados por campus), use o alternador de site no topo da visualização de Páginas do Site para pular entre eles. Cada site tem suas próprias páginas, navegação e configurações de [aparência](appearance).
:::

## Compreendendo Tipos de Página

A tabela **Páginas** lista todas as páginas no seu site junto com seu status:

- **Geradas** -- Páginas que foram criadas automaticamente pelo sistema com base nos dados de sua igreja (por exemplo, uma página Grupos, uma página Sermões ou uma página individual para cada sermão em sua biblioteca). Essas páginas se atualizam conforme seus dados mudam.
- **Personalizada** -- Páginas que você criou com seu próprio conteúdo e layout.

Você pode converter qualquer página gerada automaticamente em uma página personalizada se quiser controle total sobre seu conteúdo e design.

## Adicionando e Editando Páginas

1. Clique no botão **Adicionar Página** no canto superior direito da tabela Páginas.
2. Escolha um tipo de página (em branco ou um modelo) e dê a ele um nome.
3. Clique em **Editar Conteúdo** ao lado de qualquer página para abrir o [editor de página](page-editor), onde você pode adicionar seções, texto, imagens e outros elementos.
4. Clique em **Configurações da Página** (o ícone de engrenagem) para atualizar o título da página, caminho de URL e outros metadados.
5. Use o botão **Visualizar página ao vivo** para abrir sua página em uma nova janela e ver exatamente como se parecerá para os visitantes.

:::tip
Para sua página inicial, defina o caminho de URL para apenas `/`. Para todas as outras páginas, use um caminho descritivo como `/sobre` ou `/contato`.
:::

### Configurações da Página

Abra **Configurações da Página** em qualquer página para configurar:

- **Título e Caminho de URL** -- O nome da página e seu endereço no seu site.
- **Visibilidade** -- Escolha quem pode ver a página: todos, apenas membros, apenas equipe ou membros de grupos específicos. Esta é uma maneira rápida de fechar uma página privada (como uma página de recurso da equipe) sem uma senha separada.
- **Meta Descrição** -- Um resumo curto mostrado nos resultados do mecanismo de busca e visualizações de link de mídia social.
- **Redirecionamentos** -- Aponte um caminho de URL antigo para esta página, para que links e marcadores em uma página aposentada continuem funcionando.

## Gerenciando Navegação

A visualização de Páginas do Site exibe seus links de navegação. Esses links controlam o menu que os visitantes veem no seu site.

1. Clique em **Adicionar** para criar um novo link de navegação. Você pode apontá-lo para qualquer página no seu site ou para uma URL externa.
2. Para reordenar links, arraste e solte-os na ordem que deseja. Você também pode aninhar links sob um item pai para criar menus suspensos.
3. Clique no ícone **Editar** ao lado de qualquer link para alterar seu rótulo, URL ou posição.
4. Para remover um link da navegação, clique no ícone **Deletar**.

:::info
Remover um link de navegação não exclui a página em si. A página ainda existe e pode ser acessada diretamente por seu URL -- ela simplesmente não aparecerá no menu.
:::

## Chaves ao Nível do Site

Acima de **Navegação Principal** no lado esquerdo da visualização de Páginas do Site estão dois comutadores que se aplicam a todo o seu site de igreja:

- **Mostrar Login** -- Mostra um botão **Login** na barra de navegação do seu site.
- **Desabilitar Site Público** -- Desativa seu site público. Use-o se sua igreja usa B1 apenas para seu portal de membros, doações e registros, e mantém seu site principal em outro lugar.

### O Que Desabilitar o Site Público Faz

Quando **Desabilitar Site Público** está ativado:

- Cada página pública, incluindo a página inicial e suas páginas personalizadas, envia visitantes para a tela de login.
- As páginas **Geradas** integradas (como Grupos e Sermões) não são mais servidas e não aparecem mais na tabela Páginas.
- O cabeçalho do site mostra apenas o botão **Login**, sem links de navegação.
- Os mecanismos de busca são informados para não indexar o site. O mapa do site está vazio e `robots.txt` bloqueia toda a rastreamento.

Esses links continuam funcionando, para que membros e convidados ainda possam alcançá-los:

- Login e logout
- O portal de membros (tudo em `/mobile`)
- Links de [registro de eventos](../guides/event-registration.md) e registro de convidados

Um aviso aparece sob o comutador enquanto o site público está desativado. Ative o comutador novamente para trazer suas páginas de volta. Nada é excluído enquanto o site está desativado.

:::info
Esta configuração se aplica a toda a sua igreja. Se você tem mais de um site, ela desativa todos eles, não apenas o selecionado no alternador de site.
:::

## Dicas para Organizar Seu Site

- Mantenha sua navegação de nível superior para cinco ou seis itens para que os visitantes possam encontrar as coisas rapidamente.
- Use links aninhados para sub-páginas relacionadas (por exemplo, um dropdown "Sobre" com "Nossa Equipe", "Crenças" e "História").
- Revise sua navegação em dispositivo móvel clicando em **Visualização Móvel** para ter certeza de que funciona bem em telas menores.
- Dê às páginas nomes claros e descritivos que ajudem os visitantes a entender o que encontrarão.

:::tip
Você pode adicionar [formulários](../forms/creating-forms.md) às suas páginas para coletar registros, pedidos de oração ou outras informações de visitantes.
:::

## Começando a Partir de um Modelo de Site

Se você estiver construindo seu site do zero, você pode iniciá-lo usando um **Modelo de Site** em vez de criar páginas uma por uma. Um modelo de site cria um conjunto de páginas pré-construídas -- página inicial, sobre, conectar, dar e outras -- com conteúdo de espaço reservado e links de navegação já conectados.

1. Na tela Páginas, clique no botão **Modelos de Site** (ao lado do botão **Adicionar Página**).
2. Procure os modelos disponíveis e clique em um para visualizar sua estrutura de página.
3. Quando encontrar um que gosta, clique em **Aplicar Modelo**.
4. Páginas que ainda não existem são criadas e adicionadas à sua navegação. As páginas existentes são deixadas como estão.

Depois de aplicar um modelo, abra cada página no [editor de página](page-editor) para substituir o texto de espaço reservado e imagens pelo conteúdo real de sua igreja.

:::info
Os modelos de site criam estrutura de página e navegação. Eles não substituem o esquema de cores ou fontes do seu site -- esses são controlados pela [Aparência](appearance).
:::

## Lightbox de Imagem

Quando os visitantes clicam em uma imagem no seu site, ela se abre em uma sobreposição de lightbox em tela cheia. Isso permite que as pessoas visualizem fotos em um tamanho maior sem sair da página. Nenhuma configuração é necessária -- o lightbox é ativado automaticamente para imagens no conteúdo de sua página.

## Próximas Etapas

- [Configuração Inicial](initial-setup) -- Instruções de configuração pela primeira vez
- [Usando o Editor de Página](page-editor) -- Aprenda como construir e estilizar conteúdo de página
- [Aparência](appearance) -- Personalize o tema visual do seu site
- [Arquivos](files) -- Faça o upload e gerencie ativos de mídia para suas páginas
