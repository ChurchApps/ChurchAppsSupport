---
title: "Gerenciando páginas"
description: "Crie, edite e organize páginas e navegação na visualização Páginas do site no B1 Admin, incluindo configurações de página, redirecionamentos e modelos de site."
---

# Gerenciando páginas

<div class="article-intro">

A visualização Páginas do site é o seu centro de controle para criar, editar e organizar todas as páginas do site da sua igreja. Você pode gerenciar tanto o conteúdo das páginas quanto a navegação do site a partir desta única tela.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração inicial](./initial-setup.md) para configurar seu domínio e as configurações básicas do site
- Tenha o seu conteúdo e as suas imagens prontos. Use primeiro o gerenciador de [Arquivos](./files.md) para enviar os recursos de mídia.
- Use um computador ou tablet. A visualização Páginas do site e o editor de páginas precisam de uma tela com pelo menos cerca de 880 pixels de largura; em um celular, você verá uma mensagem pedindo que use uma tela maior.

</div>

:::info
Se a sua igreja tiver mais de um site (por exemplo, sites separados por campus), use o seletor de sites no topo da visualização Páginas do site para alternar entre eles. Cada site tem suas próprias páginas, navegação e configurações de [aparência](./appearance.md). Veja [Vários sites](#multiple-websites) abaixo.
:::

## Entendendo os tipos de página {#understanding-page-types}

A tabela **Páginas** lista todas as páginas do seu site por **Caminho** e **Título**. Há dois tipos de página:

- **Gerada** -- Páginas criadas automaticamente pelo sistema com base nos dados da sua igreja (por exemplo, uma página de Grupos, uma página de Sermões ou uma página individual para cada sermão da sua biblioteca). Essas páginas exibem um selo **Gerada** e se atualizam sozinhas conforme os seus dados mudam.
- **Personalizada** -- Páginas que você criou com o seu próprio conteúdo e layout.

Você pode converter qualquer página gerada automaticamente em uma página personalizada, se quiser controle total sobre o conteúdo e o design dela. Clique em **Converter** ao lado da página gerada e clique em **Confirmar**. Abre-se a caixa de diálogo **Nova página**; dê um título à página e clique em **Salvar**. Sua nova página personalizada assume o caminho da página gerada, e você pode montá-la no [editor de páginas](./page-editor.md).

## Adicionando e editando páginas {#adding-and-editing-pages}

1. Clique no botão **Adicionar página** no canto superior direito da visualização Páginas do site.
2. Escolha um tipo de página e digite um **Título da página**, depois clique em **Salvar**. **Em branco** inicia uma página vazia; **Sermões**, **Sobre nós**, **Doar** e **Localização** preenchem um título sugerido para esse tipo de página; **IA** cria um primeiro rascunho da página a partir de uma breve descrição que você digita. O caminho da página é formado a partir do título (por exemplo, "Nossa equipe" vira `/our-team`), e você pode alterá-lo depois em **Configurações da página**.
3. Clique em **Editar conteúdo** ao lado de qualquer página para abrir o [editor de páginas](./page-editor.md), onde você pode adicionar seções, textos, imagens e outros elementos.
4. Clique em **Configurações da página** ao lado de uma página para atualizar o título, o caminho da URL e outros metadados.
5. Clique no caminho de uma página na coluna **Caminho** para abrir a página no ar em uma nova aba e ver exatamente como ela aparecerá para os visitantes.

:::tip
Para a sua página inicial, defina o caminho da URL apenas como `/`. Para todas as outras páginas, use um caminho descritivo, como `/about` ou `/contact`.
:::

### Configurações da página {#page-settings}

Abra **Configurações da página** em qualquer página para configurar:

- **Título da página** -- O nome da página.
- **Layout** -- **Cabeçalho e rodapé** (a barra de navegação e o rodapé do seu site ao redor da página, o padrão) ou **Conteúdo centralizado limpo** (somente o conteúdo da página, em um cartão centralizado sobre um fundo cinza claro, sem barra de navegação nem rodapé -- útil para uma página simples de inscrição ou de destino).
- **Caminho da URL** -- O endereço da página no seu site. Clique no lápis para alterá-lo e depois clique em **Verificar** para ter certeza de que o caminho é válido e ainda não está em uso.
- **Visibilidade** -- Escolha quem pode ver a página: **Todos**, **Usuários conectados**, **Membros e equipe**, **Somente equipe**, **Membros da equipe** ou **Grupos específicos** (depois marque os grupos). É uma forma rápida de restringir uma página privada (como uma página de recursos da equipe) sem uma senha separada. Os visitantes que não estão conectados veem "Esta página é para membros da igreja" com um botão **Entrar**; pessoas conectadas com quem a página não foi compartilhada veem "Você não tem acesso a esta página." As páginas restritas ficam de fora do seu mapa do site.
- **Descrição para buscadores** -- Um breve resumo exibido nos resultados de mecanismos de busca e nas prévias de links em redes sociais. Procure cerca de 155 caracteres, ou clique em **Gerar com IA** para criar um rascunho a partir do conteúdo da página.

A caixa de diálogo também tem um botão **Duplicar**, que cria uma cópia da página com todo o seu conteúdo, e um botão **Excluir**, que remove a página permanentemente.

:::tip
Para direcionar um endereço antigo para uma página (por exemplo, depois de renomear `/about-us` para `/about`), adicione um redirecionamento em **Redirecionamentos e análises**, em [Aparência](./appearance.md#redirects--analytics).
:::

## Gerenciando a navegação {#managing-navigation}

O painel **Navegação principal**, no lado direito da visualização Páginas do site, exibe os seus links de navegação. Esses links controlam o menu que os visitantes veem no seu site.

1. Clique em **Adicionar** para criar um novo link de navegação. Você pode apontá-lo para qualquer página do seu site ou para uma URL externa.
2. Para reordenar os links, arraste e solte-os na ordem desejada. Você também pode aninhar links sob um item principal para criar menus suspensos.
3. Clique em qualquer link para abrir as suas **Configurações do link**, onde você pode alterar o texto, a URL ou a página principal.
4. Para remover um link da navegação, abra as suas **Configurações do link** e clique em **Excluir**.

:::info
Remover um link de navegação não exclui a página em si. A página continua existindo e pode ser acessada diretamente pela sua URL -- ela simplesmente não aparecerá no menu.
:::

## Chaves gerais do site {#site-wide-switches}

Abaixo dos links no painel **Navegação principal** há duas chaves que se aplicam a todo o site da sua igreja:

- **Mostrar login** -- Exibe um botão **Entrar** na barra de navegação do seu site.
- **Desativar site público** -- Desliga o seu site público. Use-a se a sua igreja usa o B1 apenas para o portal de membros, doações e inscrições, e mantém o site principal em outro lugar.

### O que desativar o site público faz {#what-disabling-the-public-website-does}

Quando **Desativar site público** está ativado:

- Cada página pública, inclusive a página inicial e as suas páginas personalizadas, envia os visitantes que não estão conectados para a tela de login. Depois que entram, eles voltam à página que pediram.
- Os membros conectados veem o site completo normalmente, inclusive a sua navegação e as páginas **Geradas** integradas (como Grupos e Sermões). As páginas geradas deixam de aparecer na tabela de Páginas.
- Os mecanismos de busca são instruídos a não indexar o site. O mapa do site fica vazio e o `robots.txt` bloqueia todo o rastreamento.

Estes links continuam funcionando, para que membros e convidados ainda possam acessá-los:

- Login e logout
- O portal de membros (tudo em `/mobile`)
- Links de [inscrição em eventos](../guides/event-registration.md) e cadastro de convidados

Um aviso aparece abaixo da chave enquanto o site público estiver desligado. Desligue a chave novamente para restaurar as suas páginas. Nada é excluído enquanto o site estiver desativado.

:::info
Esta configuração se aplica a toda a sua igreja. Se você tiver mais de um site, ela desliga todos eles, e não apenas o selecionado no seletor de sites.
:::

## Dicas para organizar o seu site {#tips-for-organizing-your-site}

- Mantenha a sua navegação principal com cinco ou seis itens, para que os visitantes encontrem as coisas rapidamente.
- Use links aninhados para subpáginas relacionadas (por exemplo, um menu suspenso "Sobre" com "Nossa equipe", "Crenças" e "História").
- Revise a sua navegação em um celular, para garantir que ela funciona bem em telas menores.
- Dê às páginas nomes claros e descritivos que ajudem os visitantes a entender o que vão encontrar.

:::tip
Você pode adicionar [formulários](../forms/creating-forms.md) às suas páginas para coletar inscrições, pedidos de oração ou outras informações dos visitantes.
:::

## Começando a partir de um modelo de site {#starting-from-a-site-template}

Se você estiver criando o seu site do zero, pode começar usando um **Modelo de site**, em vez de criar as páginas uma a uma. Um modelo de site cria um conjunto de páginas prontas -- início, sobre, conecte-se, doe e outras -- com conteúdo de exemplo e links de navegação já configurados.

1. Na tela Páginas, clique no botão **Começar a partir de um modelo** (ao lado do botão **Adicionar página**).
2. Navegue pelos modelos disponíveis (como **Clássico**, **Moderno**, **Comunidade** e **Focado em visitantes**) e clique em um para visualizar as páginas e os links de navegação que ele adiciona.
3. Quando encontrar um de que gostar, clique em **Criar site**.
4. As páginas que ainda não existem são criadas e adicionadas à sua navegação. As páginas que você já tem são marcadas como **Já existe** e mantidas como estão. A primeira página nova é então aberta para que você a revise.

Depois de aplicar um modelo, abra cada página no [editor de páginas](./page-editor.md) para substituir o texto e as imagens de exemplo pelo conteúdo real da sua igreja.

:::info
Um modelo só define cores e fontes em um site que nunca teve uma paleta de cores salva. Depois que você escolhe a sua própria paleta, aplicar um modelo deixa as suas cores e fontes intactas -- elas continuam em [Aparência](./appearance.md).
:::

## Vários sites {#multiple-websites}

Uma igreja pode manter mais de um site na mesma conta -- por exemplo, um por campus ou um site separado para uma escola.

1. Na tela Páginas, abra o seletor de sites (que mostra **Site principal** no início) e escolha **Gerenciar sites…**.
2. Na caixa de diálogo **Sites**, digite um **Nome** e um **Subdomínio** (apenas letras minúsculas e números -- ele se torna `{subdomain}.b1.church`) e clique em **Adicionar site**.
3. Selecione o novo site no seletor de sites para montar as suas páginas, navegação, blocos e aparência.

Para remover um site, abra **Gerenciar sites…** e clique em **Excluir** ao lado dele. Suas páginas, navegação e aparência são excluídas permanentemente, e os domínios personalizados que ele tinha passam para o site principal.

## Visualizador de imagens (lightbox) {#image-lightbox}

Quando os visitantes clicam em uma imagem do seu site, ela abre em um visualizador de tela cheia sobreposto. Isso permite que as pessoas vejam fotos em tamanho maior sem sair da página. Não é necessária nenhuma configuração -- o visualizador é ativado automaticamente para as imagens do conteúdo das suas páginas.

## Próximos passos {#next-steps}

- [Configuração inicial](./initial-setup.md) -- Instruções de configuração para a primeira vez
- [Usando o editor de páginas](./page-editor.md) -- Aprenda a montar e estilizar o conteúdo das páginas
- [Aparência](./appearance.md) -- Personalize o tema visual do seu site
- [Arquivos](./files.md) -- Envie e gerencie os recursos de mídia das suas páginas
