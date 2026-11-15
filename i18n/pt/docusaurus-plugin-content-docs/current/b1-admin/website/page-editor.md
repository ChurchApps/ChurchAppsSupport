---
title: "Usando o editor de páginas"
description: "Crie páginas do site no editor de páginas do B1 Admin: adicione seções e elementos, estilize-os, visualize no celular, publique rascunhos e use desfazer e o histórico de edições."
---

# Usando o editor de páginas

<div class="article-intro">

O editor de páginas do B1 é um criador visual de arrastar e soltar que permite desenhar as páginas do site da sua igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar o seu trabalho e desfazer alterações -- tudo a partir do seu navegador.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="m2B_JxmfFm4" title="Editando páginas e navegação no B1" next="Conectando um domínio personalizado no B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração inicial](./initial-setup.md) para configurar o seu site
- Crie pelo menos uma página em [Gerenciando páginas](./managing-pages.md)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o editor {#opening-the-editor}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Site** e clique em **Páginas**.
2. Encontre a página que deseja editar na tabela Páginas e clique em **Editar conteúdo**.

O editor abre em tela cheia, com uma prévia ao vivo da sua página. A barra de ferramentas no topo tem **Sair**, o status de publicação da página, **Desfazer** e **Refazer**, o status de salvamento, **Publicar**, os botões de prévia para desktop e celular, **Adicionar conteúdo**, a verificação de acessibilidade e um menu **Mais** (⋮). Clique em **Adicionar conteúdo** para abrir o painel **Adicionar elementos** à esquerda; clique em uma seção ou elemento para abrir as configurações dele à direita.

O editor precisa de uma tela com pelo menos cerca de 880 pixels de largura. Em um celular, você verá uma mensagem pedindo que abra a página em um tablet ou computador.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração de tema do seu B1 Admin, e usa as fontes de títulos e do corpo que você escolheu em [Aparência](./appearance.md). Isso garante que a prévia corresponda exatamente a como a sua página aparecerá para os visitantes do site.
:::

## Estrutura da página: seções e elementos {#page-structure-sections-and-elements}

Cada página é montada em dois níveis:

- **Seções** -- Os contêineres de nível superior que dividem a sua página em faixas horizontais (por exemplo, uma seção de destaque, um bloco de conteúdo ou uma faixa de rodapé). Toda página precisa ter pelo menos uma seção antes que você possa adicionar conteúdo.
- **Elementos** -- As peças individuais de conteúdo colocadas dentro de uma seção, como textos, imagens, botões, cards, formulários e calendários.

### Adicionando uma seção {#adding-a-section}

1. Clique em **Adicionar conteúdo** e arraste **Seção** para a página. Você também pode passar o mouse entre duas seções e clicar no botão **+** (**Adicionar seção**) que aparece.
2. Na caixa de diálogo **Escolha um layout de seção**, escolha como começar:
   - **A partir de um modelo** — navegue pelos modelos de seção por categoria (Destaque, Sobre, Cultos, Pessoas, Mídia, Doações e Chamada para ação) e clique em um para inseri-lo como uma seção totalmente estilizada e preenchida. Você pode personalizar tudo depois que ela for adicionada.
   - **Seção em branco** — uma seção vazia para montar do zero. Para dividi-la em colunas, adicione um elemento **Linha** dentro dela.
3. A nova seção aparece na prévia. Clique nela para selecioná-la e configurar o fundo, as cores e as demais opções de estilo.

Ao passar o mouse sobre uma seção, aparece a barra de ferramentas dela: alça de arrastar, **Configurações da seção**, **Mover seção para cima**, **Mover seção para baixo**, **Duplicar seção**, **Testar outro layout** e **Excluir seção**.

### Trocando o layout de uma seção {#switching-a-sections-layout}

Já montou uma seção, mas quer uma estrutura diferente? Clique em **Testar outro layout** na barra de ferramentas da seção para trocar a disposição por outra da galeria, mantendo no lugar o conteúdo e os elementos existentes.

### Adicionando elementos a uma seção {#adding-elements-to-a-section}

1. Clique em **Adicionar conteúdo** para abrir o painel **Adicionar elementos**. Use **Pesquisar elementos** ou as abas (**Todos**, **Comuns**, **Mídia**, **Igreja**, **Avançado** e **Blocos**, depois que você tiver [blocos reutilizáveis](./blocks.md)) para encontrar um elemento.
2. Arraste o elemento para uma seção na prévia, ou selecione um elemento na página e depois clique em um card para adicionar o novo elemento logo após ele. Os elementos são:
   - **Linha** -- Divide uma seção em colunas lado a lado
   - **Caixa** -- Agrupa elementos dentro de um contêiner estilizado
   - **Carrossel** -- Alterna entre um conjunto de slides de largura total
   - **Espaço em branco** -- Adiciona espaço vertical vazio
   - **Texto** -- Títulos, parágrafos e texto formatado
   - **Imagem** -- Envie ou vincule uma foto
   - **Botão de link** -- Um botão clicável de chamada para ação
   - **Card** -- Uma imagem com título e descrição
   - **Formulário** -- Incorpore um [formulário](../forms/creating-forms.md) diretamente na página. Se o formulário tiver uma [foto de cabeçalho](../forms/creating-forms.md#adding-a-header-photo), ela aparece acima das perguntas
   - **Calendário** -- Exibe um calendário de eventos
   - **Expansível** -- Blocos de perguntas e respostas no estilo sanfona
   - **Vídeo** -- Incorpora um vídeo pela URL
   - **Navegador de grupos** -- Um diretório filtrável de todos os grupos da igreja, com pesquisa opcional, filtro por categoria e filtro por marcador. Seu **Layout** pode ser **Grade** (o padrão) ou **Rolagem (automática)** -- veja [Layouts com rolagem](#scrolling-layouts)
   - **Lista de grupos** -- Blocos para os seus grupos públicos, opcionalmente apenas os grupos com um determinado marcador. Seu **Layout** pode ser **Grade** (o padrão; até três blocos por linha) ou **Rolagem (automática)** -- veja [Layouts com rolagem](#scrolling-layouts)
   - **Destaque com ícone** -- Um ícone com título e uma breve descrição, para destacar recursos ou ministérios
   - **Galeria** -- Uma grade de várias fotos ou um layout em masonry
   - **Depoimento** -- Uma ou mais citações com nome do autor, função e foto
   - **Ícones de redes sociais** -- Ícones com links para os perfis de redes sociais da sua igreja: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Preencha um link para cada um que quiser exibir; para o **WhatsApp**, use um link `https://wa.me/` com o seu número ou um link de convite de grupo
   - **Contagem regressiva** -- Um cronômetro até uma data ou um horário semanal de culto
   - **Estatísticas** -- Uma linha de números grandes com rótulos (membros, anos, campus)
   - **Progresso de campanha** -- Uma barra de progresso ao vivo para uma campanha de doações, mostrando o total arrecadado em direção a uma meta de fundo
   - **Grade de equipe** -- Cards com fotos dos membros de um grupo; o grupo precisa ter a opção de **lista pública** ativada
   - **Horários de culto** -- A programação de cultos dos seus campus, obtida automaticamente da configuração de presença
   - **Sermões** -- A sua biblioteca de sermões, como um navegador completo ou em layout de grade, lista ou destaque com o mais recente
   - **Localização** -- Um mapa incorporado centralizado no endereço da sua igreja
   - **Tabela** -- Uma grade simples de linhas e colunas para conteúdo tabular
   - **Texto com foto** -- Texto e uma imagem lado a lado
   - **Logo** -- O logo da sua igreja, obtido em [Aparência](./appearance.md)
   - **Transmissão** -- O player da sua transmissão ao vivo, incorporado diretamente na página
   - **Podcast** -- Uma lista de episódios obtida de uma URL de feed RSS de podcast externo que você informa, com configurações para definir quantos episódios mostrar e se devem ser exibidas datas e descrições. Cada episódio no site ao vivo tem um player de áudio e um link **Baixar** que salva o arquivo de áudio do episódio com o título do episódio. Isso serve para destacar qualquer feed de podcast no seu site; para publicar os seus próprios sermões como podcast, veja [Gerenciando sermões](../sermons/managing-sermons.md#your-podcast-feed)
   - **Doação** -- Um formulário completo de doações incorporado na página
   - **Link de doação** -- Um botão que abre a sua página de doações
   - **HTML** -- Seu próprio HTML puro, para casos de uso avançados, como incorporar um widget de terceiros (veja [Usando o elemento HTML](#using-the-html-element))
   - **Página incorporada** -- Incorpora outra página da web, por URL, em um quadro
3. Configure o elemento usando o painel de configurações que aparece.

### Usando o elemento HTML {#using-the-html-element}

O elemento **HTML** tem duas caixas:

- **Conteúdo HTML** -- A marcação a ser exibida na página. Quaisquer tags `<script>` que você incluir aqui são executadas no seu site ao vivo.
- **JavaScript (sem a tag script)** -- Código de script executado quando a página carrega. Você também pode colar aqui o trecho de incorporação de um fornecedor com as tags `<script>` incluídas, e ele será executado no site ao vivo.

Se você colar apenas um endereço web (como um link de imagem) na caixa de JavaScript, a caixa fica vermelha com o aviso *"Isto é um endereço web, não JavaScript."* Um endereço solto nessa caixa não faz nada. Para mostrar uma imagem, use um elemento **Imagem** ou coloque `<img src="...">` em **Conteúdo HTML**.

### Usando o elemento Calendário {#using-the-calendar-element}

O elemento **Calendário** mostra os eventos de um dos seus calendários:

1. Em **Selecionar**, escolha **Calendário de grupo** (os eventos de um único grupo -- a lista mostra os grupos dos quais você participa) ou **Calendário selecionado** (um calendário que você montou em **Calendários**; veja [Calendário selecionado](../calendars/curated-calendar.md)).
2. Em **Selecionar calendário**, escolha o grupo ou o calendário.
3. Em **Exibição**, escolha como mostrá-lo:
   - **Calendário mensal** -- Uma grade mensal que os visitantes podem percorrer. Cada evento é colorido de acordo com o grupo ao qual pertence, então os eventos de um grupo têm a mesma cor em todos os calendários. O B1 escolhe as cores automaticamente; não há nada para configurar.
   - **Próximos eventos** -- Uma grade de blocos para os próximos 12 eventos, com um evento recorrente exibido uma vez, na sua próxima data. Cada bloco mostra a foto do evento (ou o título sobre a cor escura do seu tema, quando não há foto), um selo de data, o dia e a hora e a primeira linha da descrição. Um botão **Assinar** acima dos blocos permite que os visitantes copiem o link ICS do calendário ou o baixem. Uma configuração de **Layout** aparece para essa exibição: **Grade** (o padrão) ou **Rolagem (automática)**, que coloca os blocos em uma única linha que rola sozinha (veja [Layouts com rolagem](#scrolling-layouts)). Para um **Calendário selecionado**, ative a configuração **Selo do grupo** para mostrar o nome do grupo de cada evento no canto superior direito do bloco, na cor do calendário daquele grupo. Eventos de grupos arquivados ou confidenciais não recebem selo.
4. Para mostrar apenas alguns eventos, digite uma tag em **Somente eventos com a tag** -- por exemplo, `youth`. Somente os eventos cujas **Tags** incluem essa palavra aparecem. Deixe em branco para mostrar todos os eventos. As tags são definidas em cada evento; veja [Adicionando e editando eventos](../calendars/creating-calendars.md#adding-and-editing-events).

Em qualquer uma das exibições, clicar em um evento abre a sua própria página no seu site. A página do evento mostra a foto, o título, a data e a hora, e a descrição do evento, além de uma caixa com **Quando** (incluindo o padrão de repetição de um evento recorrente) e **Onde** (as salas reservadas para ele). Também tem um botão **Inscreva-se neste evento** quando a inscrição está ativada, e um link **Adicionar ao meu calendário** que baixa o evento como um arquivo de calendário. A página é preparada para que os mecanismos de busca mostrem a data e os detalhes do evento nos resultados. As páginas de eventos de calendários selecionados exibidos nas suas páginas (para eventos nos próximos seis meses) também são listadas no mapa do site, para que os mecanismos de busca as encontrem.

### Layouts com rolagem {#scrolling-layouts}

O layout **Rolagem (automática)** no **Navegador de grupos**, na **Lista de grupos** e na exibição **Próximos eventos** do elemento Calendário coloca os blocos em uma única linha, em vez de uma grade. No celular, cada bloco ocupa a linha inteira; no computador, dois blocos cabem lado a lado. Quando há mais blocos do que cabem, a linha:

- Avança um bloco a cada cerca de quatro segundos, voltando ao primeiro bloco depois do último.
- Pausa enquanto o visitante passa o mouse sobre ela, toca nela ou navega com a tecla Tab até ela, e retoma alguns segundos depois.
- Mostra uma fileira de pontos embaixo, um para cada bloco, com o ponto do bloco atual preenchido. Os visitantes podem clicar em um ponto para ir até aquele bloco.

Em dispositivos com a opção de reduzir movimento ativada, a linha fica parada e os visitantes a deslizam ou rolam por conta própria. Se todos os blocos couberem, a linha não se move e nenhum ponto aparece.

### Reordenando o conteúdo {#reordering-content}

Arraste seções ou elementos usando o ícone de alça (seis pontos) do lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando a sua página {#styling-your-page}

### Estilos de seção {#section-styles}

Clique em qualquer seção para abrir o painel de estilo dela. Você pode definir:

- **Cores** -- Na aba **Sugeridas**, clique em uma das combinações de cores da sua paleta. Na aba **Personalizada**, defina o **Tipo de fundo** (**Cor**, **Imagem** ou **Vídeo do YouTube**) e as cores do título, do texto e dos links. Com um fundo de imagem, clique na imagem para definir o ponto de foco (a parte mantida visível quando a imagem é recortada), e use **Cor de sobreposição** e **Opacidade do fundo** para tingir a imagem, de modo que o texto continue legível.
- **Visibilidade** -- **Ocultar no desktop** ou **Ocultar no celular**
- **Estilos** -- Adicione configurações de estilo individuais, como preenchimento superior e inferior, para todos os dispositivos, somente desktop ou somente celular
- **Animações** -- Um efeito e uma velocidade para quando a seção entra na tela ao rolar
- **Separadores de forma** -- Formas decorativas (onda, ondas, inclinada, curva, picos e triângulo) na borda superior ou inferior da seção, com opções de cor, altura e inversão

As configurações da seção também têm **Duplicar** e **Converter em bloco**, que copia a seção para um novo [bloco reutilizável](./blocks.md).

### Estilos de elemento {#element-styles}

Clique em qualquer elemento para abrir o painel de estilo dele. As opções comuns incluem tamanho da fonte, cor, alinhamento, margem e preenchimento. Para imagens, você pode definir o texto alternativo e os destinos dos links.

### Estilos para uma única seção ou elemento {#styles-for-one-section-or-element}

Para um controle mais detalhado, abra o painel **Estilos** nas configurações de uma seção ou elemento e clique em **Adicionar um estilo** em **Todos**, **Somente desktop** ou **Somente celular**. Cada estilo se aplica somente àquela seção ou elemento, então não afeta o restante da página.

:::tip
Se você precisar aplicar estilos em todo o seu site -- como uma fonte personalizada ou uma cor global -- use as configurações de [Aparência](./appearance.md), em vez de CSS personalizado em páginas individuais.
:::

## Visualizando a sua página {#previewing-your-page}

Use os controles de prévia na barra de ferramentas para verificar como a sua página fica em diferentes tamanhos de tela:

- **Desktop** -- Visualização do navegador em largura total
- **Celular** -- Visualização estreita, no tamanho de um telefone

No celular, as colunas de uma linha se empilham umas sobre as outras, em largura total, a menos que você defina uma **Largura no celular** para elas nas configurações da linha. Listas de sermões e de podcasts também empilham o texto de cada episódio abaixo da miniatura, no celular.

Para ver a página no ar exatamente como os visitantes a verão, volte à lista de Páginas e clique no caminho da página. Ela abre em uma nova aba do navegador.

## Verificando a acessibilidade {#checking-accessibility}

Clique no ícone **Verificar acessibilidade** na barra de ferramentas (ele mostra uma contagem quando são encontrados problemas) para fazer uma verificação rápida de problemas comuns -- imagens sem texto alternativo, contraste de cores baixo ou títulos fora de ordem. Cada problema leva diretamente ao elemento que precisa de atenção, para que você possa corrigi-lo no próprio lugar.

## Desfazendo alterações {#undoing-changes}

O editor registra o seu histórico de edições automaticamente. Use os botões da barra de ferramentas ou os atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) -- Reverte a sua última ação
- **Refazer** (Ctrl+Shift+Z ou Ctrl+Y / Cmd+Shift+Z) -- Reaplica uma ação desfeita

Você também pode voltar a um ponto anterior. Abra o menu **Mais** (⋮) na barra de ferramentas e clique em **Ver histórico**. A caixa de diálogo **Histórico de edições** lista cada alteração com a hora, marcando onde você está agora como **(atual)**. Clique em uma entrada (ou no botão **Restaurar para este ponto**) para devolver a página ao estado que tinha naquele momento.

:::info
As alterações feitas após o ponto restaurado continuam no histórico, então você pode usar **Refazer** ou escolher uma entrada posterior para avançar novamente. Quando você fizer uma nova edição, essas entradas posteriores são substituídas por ela.
:::

## Salvando e publicando {#saving-and-publishing}

As alterações são salvas automaticamente conforme você trabalha. Um indicador de status na barra de ferramentas mostra se as suas alterações foram salvas.

### Estado de rascunho e de publicação {#draft-and-published-state}

As páginas podem ter um estado de **publicação**, que controla quando os visitantes veem as suas alterações. A barra de ferramentas exibe um selo de status mostrando o estado atual:

- **Ao vivo ao salvar** -- A página não usa um fluxo de publicação. Cada alteração salva vai ao ar imediatamente. Este é o padrão para novas páginas.
- **Alterações não publicadas** -- A página já foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicada** -- A página está no ar e o conteúdo salvo corresponde ao que os visitantes veem.

Para publicar as suas alterações, clique no botão **Publicar** na barra de ferramentas. A página entra no ar imediatamente.

Para voltar à última versão publicada sem afetar o que os visitantes veem, abra o menu de overflow (⋮) e clique em **Descartar alterações não publicadas**.

Para deixar de usar o fluxo de publicação, abra o menu de overflow e clique em **Desativar publicação**. As edições passam então a ir ao ar imediatamente, novamente.

:::tip
Use o fluxo de rascunho/publicação quando quiser preparar uma página -- por exemplo, para um evento que está por vir -- e só colocá-la no ar no momento certo. Monte e visualize a página e depois clique em Publicar quando estiver pronto.
:::

## Artigos relacionados {#related-articles}

- [Gerenciando páginas](./managing-pages.md) -- Crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](./appearance.md) -- Defina cores, fontes e identidade visual de todo o site
- [Arquivos](./files.md) -- Envie imagens e documentos para usar no editor
- [Criando formulários](../forms/creating-forms.md) -- Crie formulários que você pode incorporar nas páginas
