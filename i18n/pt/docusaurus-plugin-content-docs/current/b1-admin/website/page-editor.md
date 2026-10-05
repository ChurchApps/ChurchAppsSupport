---
title: "Usando o Editor de Página"
---

# Usando o Editor de Página

<div class="article-intro">

O editor de página B1 é um construtor visual de arrastar-soltar que permite que você projete as páginas do site da sua igreja sem escrever código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer mudanças -- tudo de dentro de seu navegador.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete [Configuração Inicial](initial-setup) para ter seu site configurado
- Crie pelo menos uma página em [Gerenciando Páginas](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o Editor

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Website**, e clique em **Pages**.
2. Encontre a página que deseja editar na tabela Pages e clique em **Edit**.

O editor abre em modo de tela inteira. O painel esquerdo mostra sua estrutura de página e elementos de conteúdo disponíveis; a área central mostra uma visualização ao vivo de sua página.

:::info
O editor sempre é exibido em modo claro, independentemente de sua configuração de tema B1 Admin. Isso garante que a visualização corresponda com precisão a como sua página se parecerá para visitantes do site.
:::

## Estrutura de Página: Seções e Elementos

Toda página é construída a partir de dois níveis:

- **Sections** -- Os contêineres de nível superior que dividem sua página em faixas horizontais (por exemplo, uma seção herói, um bloco de conteúdo ou uma faixa de rodapé). Toda página deve ter pelo menos uma seção antes que você possa adicionar conteúdo.
- **Elements** -- Os pedaços de conteúdo individuais colocados dentro de uma seção, como texto, imagens, botões, cartões, formulários e calendários.

### Adicionando uma Seção

1. Clique em **Add Section** (ou o botão **+** no topo do painel esquerdo).
2. Escolha como começar:
   - **From a template** — navegue pela galeria de modelos de seção organizada por categoria (Hero, About, Services, Giving, etc.) e clique em um para inseri-lo como uma seção totalmente estilizada e pré-preenchida. Você pode personalizar tudo após ser adicionado.
   - **Blank section** — escolha um layout de coluna (única, duas colunas, três colunas, etc.) e construa do zero.
3. A nova seção aparece na visualização. Clique nela para selecioná-la e configurar cor de fundo, preenchimento e outras opções de estilo.

### Alternando o Layout de uma Seção

Já construiu uma seção mas quer uma estrutura diferente? Use o alternador de layout naquela seção para trocar seu arranjo de colunas por um diferente da galeria mantendo seu conteúdo e elementos existentes no lugar.

### Adicionando Elementos a uma Seção

1. Clique dentro de uma seção na visualização para selecioná-la.
2. Clique em **Add Content** e escolha um tipo de elemento da lista:
   - **Text** -- Títulos, parágrafos e texto rico
   - **Image** -- Envie ou ligue para uma foto
   - **Button** -- Um link de apelo à ação clicável
   - **Card** -- Uma imagem com título e descrição
   - **Form** -- Incorpore um [form](../forms/creating-forms) diretamente na página
   - **Calendar** -- Exiba um calendário de evento
   - **FAQ** -- Blocos de perguntas e respostas no estilo acordeão
   - **Video** -- Incorpore um vídeo por URL
   - **Groups Browser** -- Um diretório filtrável de todos os grupos de igreja com busca opcional, filtro de categoria e filtro de rótulo
   - **Icon Feature** -- Um ícone com título e descrição curta, para destaques de funcionalidades ou ministério
   - **Gallery** -- Uma grade de múltiplas fotos ou layout de alvenaria
   - **Testimonial** -- Uma ou mais aspas com nome do autor, papel e foto
   - **Social Icons** -- Ícones vinculados para os perfis de mídia social da sua igreja
   - **Countdown** -- Um temporizador contando para uma data ou um tempo de serviço semanal
   - **Stats** -- Uma linha de números grandes com rótulos (membros, anos, campi)
   - **Campaign Progress** -- Uma barra de progresso ao vivo para uma campanha de doação, mostrando o total arrecadado em relação a uma meta de fundo
   - **Staff Grid** -- Cartões de foto para membros de um grupo; o grupo deve ter sua opção de **public roster** ativada
   - **Service Times** -- Cronograma de serviço dos seus campi, puxado automaticamente da configuração de comparecimento
   - **Sermons** -- Sua biblioteca de sermão, como um navegador completo ou um layout de grade, lista ou destaque-mais recente
   - **Map** -- Um mapa incorporado centralizado no endereço da sua igreja
   - **Table** -- Uma grade simples de linhas e colunas para conteúdo tabular
   - **Text with Photo** -- Texto e uma imagem lado a lado
   - **Logo** -- Sua logo de igreja, puxada de [Appearance](appearance)
   - **Live Stream** -- Seu player de transmissão ao vivo, incorporado diretamente na página
   - **Podcast** -- Uma lista de episódios puxados de uma URL de feed RSS de podcast externo que você fornece, com configurações para quantos episódios mostrar e se exibir datas e descrições. Isto é para apresentar qualquer feed de podcast no seu site; para publicar seus próprios sermões como um podcast, consulte [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed) em seu lugar.
   - **Donation** -- Um botão de doação ou formulário de doação incorporado
   - **Raw HTML** -- Marcação HTML personalizada para casos de uso avançados
   - **iFrame** -- Incorpore conteúdo externo por URL
3. Configure o elemento usando o painel de configurações que aparece.

### Reordenando Conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando Sua Página

### Estilos de Seção

Clique em qualquer seção para abrir seu painel de estilo. Você pode definir:

- **Background** -- Cor sólida, gradiente ou imagem. Ao usar um fundo de imagem, um seletor de **Focal Point** permite clicar para definir qual parte da imagem permanece centralizada conforme a seção escala, e uma opção de cor **Overlay** permite adicionar um tint semi-transparente sobre a imagem para melhorar a legibilidade do texto.
- **Padding** -- Espaçamento superior e inferior dentro da seção
- **Width** -- Largura completa ou centralizada/contida
- **Dividers** -- Divisores de forma decorativa (onda, inclinação, curva, triângulo e mais) na borda superior ou inferior da seção, com opções de cor, altura e flip

### Estilos de Elemento

Clique em qualquer elemento para abrir seu painel de estilo. Opções comuns incluem tamanho de fonte, cor, alinhamento, margem e preenchimento. Para imagens, você pode definir texto alt e destinos de link.

### CSS Personalizado

Para estilos avançados, cada seção e elemento tem um campo **Custom CSS** onde você pode escrever suas próprias regras CSS. Estes são limitados ao elemento, então não afetarão inadvertidamente o resto da página.

:::tip
Se você precisa aplicar estilos em todo seu site -- como uma fonte personalizada ou cor global -- use as configurações [Appearance](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando Sua Página

Use os controles de visualização na barra de ferramentas para verificar como sua página se parece em diferentes tamanhos de tela:

- **Desktop** -- Visualização de navegador em largura completa
- **Mobile** -- Visualização de tamanho de telefone estreito

Clique em **Preview** para abrir uma versão ao vivo da página em uma nova aba de navegador, exatamente como visitantes a verão.

## Verificando Acessibilidade

Clique no ícone **Accessibility** na barra de ferramentas para executar uma verificação rápida de problemas comuns -- imagens sem texto alt, contraste de cor baixo ou títulos fora de ordem. Cada problema vincula diretamente ao elemento que precisa de atenção para que você possa corrigi-lo no lugar.

## Desfazendo Mudanças

O editor rastreia seu histórico de edição automaticamente. Use os botões da barra de ferramentas ou atalhos de teclado para navegar:

- **Undo** (Ctrl+Z / Cmd+Z) -- Reverta sua última ação
- **Redo** (Ctrl+Y / Cmd+Y) -- Reaplicar uma ação desfeita

Você também pode restaurar a página para um snapshot anterior. Clique em **History** na barra de ferramentas para ver uma lista de snapshots salvos com descrições, e clique em qualquer entrada para restaurar para aquele ponto.

:::warning
Restaurar um snapshot substitui seu conteúdo de página atual pela versão de snapshot. Isso não pode ser desfeito com o botão desfazer padrão. Salve um snapshot de seu estado atual antes de restaurar um antigo se quiser manter a opção de retornar.
:::

## Salvando e Publicando

As mudanças são salvas automaticamente conforme você trabalha. Um indicador de status na barra de ferramentas mostra se suas mudanças foram salvas.

### Estado de rascunho e publicado

Páginas podem ter um estado **published**, que controla quando visitantes veem suas mudanças. A barra de ferramentas exibe um chip de status mostrando o estado atual:

- **Live on Save** -- A página não usa um fluxo de trabalho de publicação. Cada mudança salva entra ao vivo imediatamente. Este é o padrão para novas páginas.
- **Unpublished Changes** -- A página foi publicada antes, mas você fez mudanças desde a última publicação. Visitantes ainda veem a versão anteriormente publicada.
- **Published** -- A página está ao vivo e seu conteúdo salvo corresponde ao que visitantes veem.

Para publicar suas mudanças, clique no botão **Publish** na barra de ferramentas. A página fica ao vivo imediatamente.

Para reverter para a última versão publicada sem afetar o que visitantes veem, abra o menu de overflow (⋮) e clique em **Discard Changes**.

Para tirar uma página do ar completamente, abra o menu de overflow e clique em **Unpublish**. Visitantes não verão mais aquela página até que você a publique novamente.

:::tip
Use o fluxo de trabalho de rascunho/publicação quando quiser preparar uma página -- por exemplo, para um evento futuro -- e fazer ao vivo apenas no momento certo. Construa e visualize a página, depois clique em Publish quando estiver pronto.
:::

## Artigos Relacionados

- [Managing Pages](managing-pages) -- Crie páginas, defina URLs e gerencie navegação do site
- [Appearance](appearance) -- Defina cores, fontes e marca do site
- [Files](files) -- Envie imagens e documentos para usar no editor
- [Creating Forms](../forms/creating-forms) -- Construa formulários que você pode incorporar em páginas
