---
title: "Usando o editor de páginas"
---

# Usando o editor de páginas

<div class="article-intro">

O editor de páginas do B1 é um construtor visual de arrastar e soltar que permite criar as páginas do site da sua igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer alterações -- tudo a partir do seu navegador.

</div>

## Vídeo de treinamento

<YouTube id="m2B_JxmfFm4" title="Editing Pages and Navigation in B1" next="Connecting a Custom Domain in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração inicial](initial-setup) para configurar o seu site
- Crie pelo menos uma página em [Gerenciando páginas](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o editor

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Site** e clique em **Páginas**.
2. Encontre a página que deseja editar na tabela de Páginas e clique em **Editar conteúdo**.

O editor abre em tela cheia. O painel da esquerda mostra a estrutura da página e os elementos de conteúdo disponíveis; a área central mostra uma pré-visualização ao vivo da sua página.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração de tema do B1 Admin, e usa as fontes de títulos e de texto que você escolheu em [Aparência](appearance). Isso garante que a pré-visualização reflita com precisão a aparência da página para os visitantes do site.
:::

## Estrutura da página: seções e elementos

Cada página é construída em dois níveis:

- **Seções** -- Os contêineres de nível superior que dividem a página em faixas horizontais (por exemplo, uma seção de destaque, um bloco de conteúdo ou uma faixa de rodapé). Toda página precisa ter pelo menos uma seção antes que você possa adicionar conteúdo.
- **Elementos** -- As peças individuais de conteúdo colocadas dentro de uma seção, como textos, imagens, botões, cartões, formulários e calendários.

### Adicionando uma seção

1. Clique em **Adicionar seção** (ou no botão **+** no topo do painel da esquerda).
2. Escolha como começar:
   - **A partir de um modelo** — navegue pela galeria de modelos de seção, organizada por categoria (Destaque, Sobre, Cultos, Doações etc.), e clique em um deles para inseri-lo como uma seção totalmente estilizada e pré-preenchida. Você pode personalizar tudo depois de adicioná-la.
   - **Seção em branco** — escolha um layout de colunas (coluna única, duas colunas, três colunas etc.) e monte a partir do zero.
3. A nova seção aparece na pré-visualização. Clique nela para selecioná-la e configurar a cor de fundo, o espaçamento interno e outras opções de estilo.

### Trocando o layout de uma seção

Já montou uma seção, mas quer outra estrutura? Use o seletor de layout dessa seção para trocar a disposição das colunas por outra da galeria, mantendo no lugar o conteúdo e os elementos existentes.

### Adicionando elementos a uma seção

1. Clique dentro de uma seção na pré-visualização para selecioná-la.
2. Clique em **Adicionar conteúdo** e escolha um tipo de elemento na lista:
   - **Texto** -- Títulos, parágrafos e texto formatado
   - **Imagem** -- Envie ou adicione um link para uma foto
   - **Botão** -- Um link de chamada para ação clicável
   - **Cartão** -- Uma imagem com um título e uma descrição
   - **Formulário** -- Incorpore um [formulário](../forms/creating-forms) diretamente na página. Se o formulário tiver uma [foto de cabeçalho](../forms/creating-forms.md#adding-a-header-photo), ela aparece acima das perguntas
   - **Calendário** -- Exibe um calendário de eventos
   - **FAQ** -- Blocos de perguntas e respostas no formato de acordeão
   - **Vídeo** -- Incorpora um vídeo pelo link
   - **Navegador de grupos** -- Um diretório filtrável de todos os grupos da igreja, com busca, filtro por categoria e filtro por rótulo opcionais
   - **Destaque com ícone** -- Um ícone com um título e uma breve descrição, para destacar recursos ou ministérios
   - **Galeria** -- Uma grade ou layout em mosaico com várias fotos
   - **Depoimento** -- Uma ou mais citações com nome do autor, função e foto
   - **Ícones de redes sociais** -- Ícones com link para os perfis de redes sociais da sua igreja: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Preencha um link para cada um que quiser exibir; para o **WhatsApp**, use um link `https://wa.me/` com o seu número ou um link de convite para grupo
   - **Contagem regressiva** -- Um cronômetro até uma data ou um horário semanal de culto
   - **Estatísticas** -- Uma linha de números grandes com rótulos (membros, anos, campi)
   - **Progresso da campanha** -- Uma barra de progresso ao vivo para uma campanha de doações, mostrando o total arrecadado para a meta de um fundo
   - **Grade da equipe** -- Cartões com foto dos membros de um grupo; o grupo precisa ter a opção de **lista pública** ativada
   - **Horários dos cultos** -- A programação de cultos dos seus campi, puxada automaticamente da configuração de presença
   - **Sermões** -- A sua biblioteca de sermões, como um navegador completo ou em layout de grade, lista ou destaque do mais recente
   - **Mapa** -- Um mapa incorporado centralizado no endereço da sua igreja
   - **Tabela** -- Uma grade simples de linhas e colunas para conteúdo tabular
   - **Texto com foto** -- Texto e uma imagem lado a lado
   - **Logotipo** -- O logotipo da sua igreja, puxado de [Aparência](appearance)
   - **Transmissão ao vivo** -- O player da sua transmissão ao vivo, incorporado diretamente na página
   - **Podcast** -- Uma lista de episódios puxada de uma URL de feed RSS de podcast externo que você informa, com configurações para definir quantos episódios mostrar e se devem ser exibidas datas e descrições. Cada episódio no site publicado tem um player de áudio e um link **Baixar** que salva o arquivo de áudio do episódio com o título do episódio. Isso serve para destacar qualquer feed de podcast no seu site; para publicar os seus próprios sermões como podcast, consulte [Gerenciando sermões](../sermons/managing-sermons.md#your-podcast-feed).
   - **Doação** -- Um botão de doação ou um formulário de doação incorporado
   - **HTML** -- Seu próprio HTML bruto, para usos avançados, como incorporar um widget de terceiros (consulte [Usando o elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora conteúdo externo pelo link
3. Configure o elemento usando o painel de configurações que aparece.

### Usando o elemento HTML {#using-the-html-element}

O elemento **HTML** tem duas caixas:

- **Conteúdo HTML** -- O código a ser exibido na página. Quaisquer tags `<script>` incluídas aqui são executadas no seu site publicado.
- **JavaScript (sem a tag script)** -- Código de script executado quando a página carrega. Você também pode colar aqui o trecho de incorporação de um fornecedor com as tags `<script>` incluídas, e ele será executado no seu site publicado.

Se você colar apenas um endereço web (como um link de imagem) na caixa de JavaScript, a caixa fica vermelha com o aviso *"Este é um endereço web, não JavaScript."* Um endereço sozinho nessa caixa não faz nada. Para exibir uma imagem, use um elemento **Imagem** ou coloque `<img src="...">` em **Conteúdo HTML**.

### Usando o elemento Calendário {#using-the-calendar-element}

O elemento **Calendário** mostra eventos de um dos seus calendários:

1. Em **Selecionar**, escolha **Calendário do grupo** (os eventos de um grupo -- a lista mostra os grupos dos quais você participa) ou **Calendário curado** (um calendário que você montou em **Calendários**; consulte [Calendário curado](../calendars/curated-calendar)).
2. Em **Selecionar calendário**, escolha o grupo ou o calendário.
3. Em **Exibição**, escolha como mostrá-lo:
   - **Calendário mensal** -- Uma grade mensal que os visitantes podem percorrer.
   - **Próximos eventos** -- Uma grade de blocos com os próximos 12 eventos, sendo que um evento que se repete aparece uma vez, na sua próxima data. Cada bloco mostra a foto do evento (ou seu título sobre a cor escura do tema, quando não há foto), um selo de data, o dia e a hora e a primeira linha da descrição. Um botão **Assinar** acima dos blocos permite que os visitantes copiem o link ICS do calendário ou o baixem. Uma configuração de **Layout** aparece para esta exibição: **Grade** (o padrão) ou **Rolagem (automática)**, que coloca os blocos em uma única linha que rola sozinha.
4. Para mostrar apenas alguns eventos, digite uma tag em **Somente eventos com a tag** -- por exemplo, `youth`. Somente aparecem eventos cujas **Tags** incluam essa palavra. Deixe em branco para mostrar todos os eventos. As tags são definidas em cada evento; consulte [Adicionando e editando eventos](../calendars/creating-calendars.md#adding-and-editing-events).

Nas duas exibições, clicar em um evento abre a página própria dele no seu site. A página do evento mostra a foto, o título, a data e a hora e a descrição, além de uma caixa com **Quando** (incluindo o padrão de repetição, no caso de um evento recorrente) e **Onde** (as salas reservadas para ele). Ela também tem um botão **Inscreva-se neste evento** quando a inscrição está ativada, e um link **Adicionar ao meu calendário** que baixa o evento como arquivo de calendário. A página foi preparada para que os mecanismos de busca possam mostrar a data e os detalhes do evento nos resultados. As páginas de eventos de calendários curados exibidos nas suas páginas (para eventos dos próximos seis meses) também aparecem no mapa do site (sitemap), para que os buscadores possam encontrá-las.

### Reordenando conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando sua página

### Estilos de seção

Clique em qualquer seção para abrir o painel de estilo. Você pode definir:

- **Fundo** -- Cor sólida, gradiente ou imagem. Ao usar uma imagem de fundo, um seletor de **Ponto focal** permite clicar para definir qual parte da imagem permanece centralizada quando a seção é redimensionada, e a opção de cor de **Sobreposição** permite aplicar um tom semitransparente sobre a imagem para melhorar a legibilidade do texto.
- **Espaçamento interno** -- Espaço acima e abaixo do conteúdo dentro da seção
- **Largura** -- Largura total ou centralizada/contida
- **Divisores** -- Divisores decorativos em forma (onda, inclinado, curva, triângulo e outros) na borda superior ou inferior da seção, com opções de cor, altura e inversão

### Estilos de elemento

Clique em qualquer elemento para abrir o painel de estilo. As opções comuns incluem tamanho da fonte, cor, alinhamento, margem e espaçamento interno. Para imagens, você pode definir o texto alternativo e o destino dos links.

### CSS personalizado

Para estilização avançada, cada seção e elemento tem um campo **CSS personalizado**, onde você pode escrever suas próprias regras de CSS. Elas são limitadas àquele elemento, então não afetam involuntariamente o restante da página.

:::tip
Se precisar aplicar estilos em todo o site -- como uma fonte personalizada ou uma cor global --, use as configurações de [Aparência](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando sua página

Use os controles de pré-visualização na barra de ferramentas para verificar como a página fica em diferentes tamanhos de tela:

- **Desktop** -- Visualização em largura total do navegador
- **Celular** -- Visualização estreita, no tamanho de um celular

No celular, as colunas de uma linha se empilham umas sobre as outras em largura total, a menos que você defina uma **Largura no celular** para elas nas configurações da linha. Listas de sermões e de podcast também empilham o texto de cada episódio abaixo da miniatura nos celulares.

Para ver a página publicada exatamente como os visitantes a veem, volte à lista de Páginas e clique no caminho da página. Ela abre em uma nova aba do navegador.

## Verificando a acessibilidade

Clique no ícone de **Acessibilidade** na barra de ferramentas para executar uma verificação rápida de problemas comuns -- imagens sem texto alternativo, contraste de cor baixo ou títulos fora de ordem. Cada problema leva diretamente ao elemento que precisa de atenção, para que você possa corrigi-lo no próprio lugar.

## Desfazendo alterações

O editor registra o seu histórico de edições automaticamente. Use os botões da barra de ferramentas ou os atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) -- Reverte sua última ação
- **Refazer** (Ctrl+Shift+Z ou Ctrl+Y / Cmd+Shift+Z) -- Reaplica uma ação desfeita

Você também pode restaurar a página para um instantâneo anterior. Clique em **Ver histórico** na barra de ferramentas para ver uma lista de instantâneos salvos com descrições, e clique em qualquer entrada para restaurar aquele ponto.

:::warning
Restaurar um instantâneo substitui o conteúdo atual da página pela versão do instantâneo. Isso não pode ser desfeito com o botão Desfazer padrão. Salve um instantâneo do estado atual antes de restaurar um antigo, se quiser manter a opção de voltar.
:::

## Salvando e publicando

As alterações são salvas automaticamente conforme você trabalha. Um indicador de status na barra de ferramentas mostra se as suas alterações foram salvas.

### Estado de rascunho e publicado

As páginas podem ter um estado **publicado**, que controla quando os visitantes veem as suas alterações. A barra de ferramentas exibe um selo de status mostrando o estado atual:

- **Publicada ao salvar** -- A página não usa um fluxo de publicação. Toda alteração salva vai ao ar imediatamente. Este é o padrão para páginas novas.
- **Alterações não publicadas** -- A página já foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicada** -- A página está no ar e o conteúdo salvo corresponde ao que os visitantes veem.

Para publicar as suas alterações, clique no botão **Publicar** na barra de ferramentas. A página entra no ar imediatamente.

Para voltar à última versão publicada sem afetar o que os visitantes veem, abra o menu de opções (⋮) e clique em **Descartar alterações não publicadas**.

Para deixar de usar o fluxo de publicação, abra o menu de opções e clique em **Desativar publicação**. As edições passam então a ir ao ar imediatamente de novo.

:::tip
Use o fluxo de rascunho/publicação quando quiser preparar uma página -- por exemplo, para um evento que se aproxima -- e só colocá-la no ar no momento certo. Monte e visualize a página e depois clique em Publicar quando estiver pronto.
:::

## Artigos relacionados

- [Gerenciando páginas](managing-pages) -- Crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](appearance) -- Defina cores, fontes e identidade visual do site
- [Arquivos](files) -- Envie imagens e documentos para usar no editor
- [Criando formulários](../forms/creating-forms) -- Crie formulários para incorporar nas páginas
