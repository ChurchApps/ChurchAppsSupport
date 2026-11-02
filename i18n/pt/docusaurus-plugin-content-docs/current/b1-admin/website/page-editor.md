---
title: "Usando o editor de páginas"
---

# Usando o editor de páginas

<div class="article-intro">

O editor de páginas do B1 é um criador visual de arrastar e soltar que permite desenhar as páginas do site da sua igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar o seu trabalho e desfazer alterações — tudo dentro do seu navegador.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração inicial](initial-setup) para configurar o seu site
- Crie pelo menos uma página em [Gerenciando páginas](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o editor

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Site** e clique em **Páginas**.
2. Localize a página que deseja editar na tabela de Páginas e clique em **Editar conteúdo**.

O editor abre em tela cheia. O painel da esquerda mostra a estrutura da página e os elementos de conteúdo disponíveis; a área central mostra uma prévia ao vivo da sua página.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração de tema do B1 Admin, e usa as fontes de títulos e de texto que você escolheu em [Aparência](appearance). Isso garante que a prévia corresponda exatamente à forma como a página vai aparecer para os visitantes do site.
:::

## Estrutura da página: seções e elementos

Cada página é construída em dois níveis:

- **Seções** -- Os contêineres de nível superior que dividem a página em faixas horizontais (por exemplo, uma seção de destaque, um bloco de conteúdo ou uma faixa de rodapé). Toda página precisa ter pelo menos uma seção antes que você possa adicionar conteúdo.
- **Elementos** -- As peças de conteúdo individuais colocadas dentro de uma seção, como textos, imagens, botões, cartões, formulários e calendários.

### Adicionando uma seção

1. Clique em **Adicionar seção** (ou no botão **+** no topo do painel da esquerda).
2. Escolha como começar:
   - **A partir de um modelo** — navegue pela galeria de modelos de seção organizada por categoria (Destaque, Sobre, Cultos, Ofertas etc.) e clique em um para inseri-lo como uma seção com estilo completo e conteúdo pré-preenchido. Você pode personalizar tudo depois que ela for adicionada.
   - **Seção em branco** — escolha um layout de colunas (uma coluna, duas colunas, três colunas etc.) e monte do zero.
3. A nova seção aparece na prévia. Clique nela para selecioná-la e configurar a cor de fundo, o espaçamento interno e outras opções de estilo.

### Trocando o layout de uma seção

Já montou uma seção, mas quer uma estrutura diferente? Use o seletor de layout dessa seção para trocar a disposição das colunas por outra da galeria, mantendo no lugar o seu conteúdo e os elementos existentes.

### Adicionando elementos a uma seção

1. Clique dentro de uma seção na prévia para selecioná-la.
2. Clique em **Adicionar conteúdo** e escolha um tipo de elemento da lista:
   - **Texto** -- Títulos, parágrafos e texto formatado
   - **Imagem** -- Envie ou aponte para uma foto
   - **Botão** -- Um link clicável de chamada para ação
   - **Cartão** -- Uma imagem com título e descrição
   - **Formulário** -- Incorpore um [formulário](../forms/creating-forms) diretamente na página. Se o formulário tiver uma [foto de cabeçalho](../forms/creating-forms.md#adding-a-header-photo), ela aparece acima das perguntas
   - **Calendário** -- Exibe um calendário de eventos
   - **FAQ** -- Blocos de perguntas e respostas no estilo sanfona
   - **Vídeo** -- Incorpora um vídeo pelo endereço
   - **Navegador de grupos** -- Um diretório filtrável de todos os grupos da igreja, com busca, filtro por categoria e filtro por etiqueta opcionais
   - **Destaque com ícone** -- Um ícone com título e breve descrição, para destacar recursos ou ministérios
   - **Galeria** -- Uma grade de várias fotos ou um layout em mosaico
   - **Depoimento** -- Uma ou mais citações com nome do autor, função e foto
   - **Ícones de redes sociais** -- Ícones com links para os perfis de mídia social da igreja: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Preencha um link para cada um que quiser exibir; para o **WhatsApp**, use um link `https://wa.me/` com o seu número ou um link de convite de grupo
   - **Contagem regressiva** -- Um cronômetro contando até uma data ou um horário de culto semanal
   - **Números** -- Uma linha de números grandes com rótulos (membros, anos, campi)
   - **Progresso de campanha** -- Uma barra de progresso ao vivo de uma campanha de ofertas, mostrando o total arrecadado para a meta de um fundo
   - **Grade da equipe** -- Cartões com fotos dos membros de um grupo; o grupo precisa ter a opção de **lista pública** ativada
   - **Horários de culto** -- A programação de cultos dos seus campi, puxada automaticamente da configuração de presença
   - **Sermões** -- A sua biblioteca de sermões, como um navegador completo ou em grade, lista ou layout de destaque do último
   - **Mapa** -- Um mapa incorporado centralizado no endereço da sua igreja
   - **Tabela** -- Uma grade simples de linhas e colunas para conteúdo tabular
   - **Texto com foto** -- Texto e imagem lado a lado
   - **Logotipo** -- O logotipo da sua igreja, puxado de [Aparência](appearance)
   - **Transmissão ao vivo** -- O player da sua transmissão ao vivo, incorporado diretamente na página
   - **Podcast** -- Uma lista de episódios puxada de um endereço RSS de podcast externo que você informa, com opções de quantos episódios mostrar e se devem exibir datas e descrições. Cada episódio no site publicado tem um player de áudio e um link **Baixar** que salva o arquivo de áudio do episódio com o título do episódio. Serve para destacar qualquer feed de podcast no seu site; para publicar os seus próprios sermões como podcast, veja [Gerenciando sermões](../sermons/managing-sermons.md#your-podcast-feed)
   - **Doação** -- Um botão de ofertas ou um formulário de doação incorporado
   - **HTML** -- Seu próprio HTML puro, para uso avançado, como incorporar um widget de terceiros (veja [Usando o elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora conteúdo externo pelo endereço
3. Configure o elemento usando o painel de configurações que aparece.

### Usando o elemento HTML {#using-the-html-element}

O elemento **HTML** tem duas caixas:

- **Conteúdo HTML** -- A marcação a exibir na página. Quaisquer tags `<script>` incluídas aqui são executadas no seu site publicado.
- **JavaScript (sem a tag script)** -- Código de script executado quando a página carrega. Você também pode colar aqui o trecho de incorporação de um fornecedor com as tags `<script>` incluídas, e ele será executado no site publicado.

Se você colar somente um endereço web (como um link de imagem) na caixa de JavaScript, a caixa fica vermelha com o aviso *"Isto é um endereço web, não JavaScript."* Um endereço solto nessa caixa não faz nada. Para mostrar uma imagem, use um elemento **Imagem** ou coloque `<img src="...">` em **Conteúdo HTML**.

### Usando o elemento Calendário {#using-the-calendar-element}

O elemento **Calendário** mostra eventos de um dos seus calendários:

1. Em **Selecionar**, escolha **Calendário de grupo** (os eventos de um grupo — a lista mostra os grupos de que você participa) ou **Calendário selecionado** (um calendário que você criou em **Calendários**; veja [Calendário selecionado](../calendars/curated-calendar)).
2. Em **Selecionar calendário**, escolha o grupo ou o calendário.
3. Em **Exibição**, escolha como mostrá-lo:
   - **Calendário mensal** -- Uma grade do mês que os visitantes podem percorrer.
   - **Próximos eventos** -- Uma grade de blocos com os próximos 12 eventos, sendo que um evento que se repete aparece uma vez, na sua próxima data. Cada bloco mostra a foto do evento (ou o título sobre a cor escura do tema, quando não há foto), um selo de data, o dia e a hora e a primeira linha da descrição. Um botão **Assinar** acima dos blocos permite que os visitantes copiem o link ICS do calendário ou o baixem. Uma configuração de **Layout** aparece para esta exibição: **Grade** (o padrão) ou **Rolagem (automática)**, que coloca os blocos em uma única linha que rola sozinha.
4. Para mostrar apenas alguns eventos, digite uma tag em **Somente eventos com a tag** — por exemplo, `jovens`. Só aparecem eventos cujas **Tags** incluam essa palavra. Deixe em branco para mostrar todos os eventos. As tags são definidas em cada evento; veja [Adicionando e editando eventos](../calendars/creating-calendars.md#adding-and-editing-events).

Em qualquer das exibições, clicar em um evento abre a página própria dele no seu site. A página do evento mostra a foto, o título, a data e a hora e a descrição, além de uma caixa com **Quando** (incluindo o padrão de repetição de um evento recorrente) e **Onde** (as salas reservadas para ele). Também tem um botão **Inscrever-se neste evento** quando as inscrições estão ativadas, e um link **Adicionar ao meu calendário** que baixa o evento como arquivo de calendário. A página é preparada para que os mecanismos de busca mostrem a data e os detalhes do evento nos resultados. As páginas de eventos de calendários selecionados exibidas nas suas páginas (para eventos dos próximos seis meses) também são listadas no mapa do site, para que os mecanismos de busca possam encontrá-las.

### Reordenando o conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) do lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando a sua página

### Estilos de seção

Clique em qualquer seção para abrir o painel de estilos dela. Você pode definir:

- **Fundo** -- Cor sólida, gradiente ou imagem. Ao usar uma imagem de fundo, um seletor de **Ponto focal** permite clicar para definir qual parte da imagem permanece centralizada quando a seção é redimensionada, e a opção de cor de **Sobreposição** permite adicionar um tom semitransparente sobre a imagem para melhorar a legibilidade do texto.
- **Espaçamento interno** -- Espaço superior e inferior dentro da seção
- **Largura** -- Largura total ou centralizada/contida
- **Divisores** -- Divisores decorativos em forma (onda, inclinado, curva, triângulo e outros) na borda superior ou inferior da seção, com opções de cor, altura e inversão

### Estilos de elemento

Clique em qualquer elemento para abrir o painel de estilos dele. As opções comuns incluem tamanho da fonte, cor, alinhamento, margem e espaçamento interno. Para imagens, você pode definir o texto alternativo e os destinos dos links.

### CSS personalizado

Para estilização avançada, cada seção e elemento tem um campo **CSS personalizado** onde você pode escrever suas próprias regras de CSS. Elas são limitadas a esse elemento, então não afetam involuntariamente o restante da página.

:::tip
Se você precisar aplicar estilos em todo o site — como uma fonte personalizada ou uma cor global —, use as configurações de [Aparência](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando a sua página

Use os controles de prévia na barra de ferramentas para verificar como a página fica em diferentes tamanhos de tela:

- **Desktop** -- Visualização em largura total do navegador
- **Celular** -- Visualização estreita, no tamanho de um celular

Nos celulares, as colunas de uma linha são empilhadas umas sobre as outras, em largura total, a menos que você defina uma **Largura no celular** para elas nas configurações da linha. Listas de sermões e de podcasts também empilham o texto de cada episódio abaixo da miniatura nos celulares.

Para ver a página publicada exatamente como os visitantes a veem, volte à lista de Páginas e clique no caminho da página. Ela abre em uma nova aba do navegador.

## Verificando a acessibilidade

Clique no ícone de **Acessibilidade** na barra de ferramentas para executar uma verificação rápida de problemas comuns — imagens sem texto alternativo, contraste de cor baixo ou títulos fora de ordem. Cada problema leva diretamente ao elemento que precisa de atenção, para que você possa corrigi-lo no próprio lugar.

## Desfazendo alterações

O editor registra automaticamente o seu histórico de edição. Use os botões da barra de ferramentas ou os atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) -- Reverte a sua última ação
- **Refazer** (Ctrl+Shift+Z ou Ctrl+Y / Cmd+Shift+Z) -- Reaplica uma ação desfeita

Você também pode restaurar a página para um instantâneo anterior. Clique em **Ver histórico** na barra de ferramentas para ver uma lista de instantâneos salvos com descrições, e clique em qualquer entrada para voltar àquele ponto.

:::warning
Restaurar um instantâneo substitui o conteúdo atual da página pela versão do instantâneo. Isso não pode ser desfeito com o botão padrão de desfazer. Salve um instantâneo do estado atual antes de restaurar um antigo, se quiser manter a opção de voltar.
:::

## Salvando e publicando

As alterações são salvas automaticamente conforme você trabalha. Um indicador de situação na barra de ferramentas mostra se as suas alterações foram salvas.

### Estado de rascunho e publicado

As páginas podem ter um estado **publicado**, que controla quando os visitantes veem as suas alterações. A barra de ferramentas exibe um selo de situação mostrando o estado atual:

- **No ar ao salvar** -- A página não usa um fluxo de publicação. Cada alteração salva vai ao ar imediatamente. Este é o padrão para novas páginas.
- **Alterações não publicadas** -- A página já foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicada** -- A página está no ar e o conteúdo salvo corresponde ao que os visitantes veem.

Para publicar as suas alterações, clique no botão **Publicar** na barra de ferramentas. A página entra no ar imediatamente.

Para voltar à última versão publicada sem afetar o que os visitantes veem, abra o menu de opções (⋮) e clique em **Descartar alterações não publicadas**.

Para deixar de usar o fluxo de publicação, abra o menu de opções e clique em **Desativar publicação**. As edições passam então a ir ao ar imediatamente novamente.

:::tip
Use o fluxo de rascunho/publicação quando quiser preparar uma página — por exemplo, para um evento que está chegando — e só deixá-la no ar no momento certo. Monte e visualize a página e clique em Publicar quando estiver pronto.
:::

## Artigos relacionados

- [Gerenciando páginas](managing-pages) -- Crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](appearance) -- Defina cores, fontes e identidade visual de todo o site
- [Arquivos](files) -- Envie imagens e documentos para usar no editor
- [Criando formulários](../forms/creating-forms) -- Crie formulários que você pode incorporar nas páginas
