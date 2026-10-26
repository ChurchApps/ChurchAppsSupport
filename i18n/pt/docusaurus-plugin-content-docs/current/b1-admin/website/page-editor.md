---
title: "Usando o editor de páginas"
---

# Usando o editor de páginas

<div class="article-intro">

O editor de páginas do B1 é um criador visual de arrastar e soltar que permite desenhar as páginas do site da sua igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer alterações, tudo a partir do seu navegador.

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

O editor abre em modo de tela cheia. O painel esquerdo mostra a estrutura da página e os elementos de conteúdo disponíveis; a área central mostra uma prévia ao vivo da sua página.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração de tema do B1 Admin, e usa as fontes de título e de corpo que você escolheu em [Aparência](appearance). Isso garante que a prévia corresponda exatamente à forma como a página aparecerá para os visitantes do site.
:::

## Estrutura da página: seções e elementos

Cada página é construída em dois níveis:

- **Seções**: os contêineres de nível superior que dividem a página em faixas horizontais (por exemplo, uma seção de destaque, um bloco de conteúdo ou uma faixa de rodapé). Toda página precisa ter pelo menos uma seção antes que você possa adicionar conteúdo.
- **Elementos**: as peças de conteúdo individuais colocadas dentro de uma seção, como textos, imagens, botões, cartões, formulários e calendários.

### Adicionando uma seção

1. Clique em **Adicionar seção** (ou no botão **+** no topo do painel esquerdo).
2. Escolha como começar:
   - **A partir de um modelo**: navegue pela galeria de modelos de seção, organizada por categoria (Destaque, Sobre, Cultos, Ofertas etc.), e clique em um para inseri-lo como uma seção totalmente estilizada e pré-preenchida. Você pode personalizar tudo depois que ela for adicionada.
   - **Seção em branco**: escolha um layout de colunas (única, duas colunas, três colunas etc.) e monte a seção do zero.
3. A nova seção aparece na prévia. Clique nela para selecioná-la e configurar a cor de fundo, o espaçamento interno e outras opções de estilo.

### Trocando o layout de uma seção

Já montou uma seção, mas quer uma estrutura diferente? Use o alternador de layout dessa seção para trocar a disposição das colunas por outra da galeria, mantendo no lugar o conteúdo e os elementos existentes.

### Adicionando elementos a uma seção

1. Clique dentro de uma seção na prévia para selecioná-la.
2. Clique em **Adicionar conteúdo** e escolha um tipo de elemento na lista:
   - **Texto**: títulos, parágrafos e texto formatado
   - **Imagem**: envie uma foto ou crie um link para ela
   - **Botão**: um link clicável de chamada para ação
   - **Cartão**: uma imagem com título e descrição
   - **Formulário**: incorpore um [formulário](../forms/creating-forms) diretamente na página. Se o formulário tiver uma [foto de cabeçalho](../forms/creating-forms.md#adding-a-header-photo), ela aparece acima das perguntas
   - **Calendário**: exibe um calendário de eventos
   - **FAQ**: blocos de perguntas e respostas em formato de acordeão
   - **Vídeo**: incorpore um vídeo a partir de uma URL
   - **Explorador de grupos**: um diretório filtrável de todos os grupos da igreja, com pesquisa opcional, filtro por categoria e filtro por marcador
   - **Destaque com ícone**: um ícone com título e breve descrição, para destacar recursos ou ministérios
   - **Galeria**: uma grade de várias fotos ou um layout em mosaico
   - **Depoimento**: uma ou mais citações com nome do autor, função e foto
   - **Ícones de redes sociais**: ícones com links para os perfis de mídia social da sua igreja: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Preencha um link para cada um que quiser exibir; para o **WhatsApp**, use um link `https://wa.me/` com o seu número ou um link de convite de grupo
   - **Contagem regressiva**: um cronômetro contando até uma data ou um horário de culto semanal
   - **Estatísticas**: uma linha de números grandes com rótulos (membros, anos, unidades)
   - **Progresso da campanha**: uma barra de progresso ao vivo de uma campanha de ofertas, mostrando o total arrecadado em direção à meta de um fundo
   - **Grade de equipe**: cartões com fotos dos membros de um grupo; o grupo precisa ter a opção de **lista pública** ativada
   - **Horários de culto**: a programação de cultos das suas unidades, puxada automaticamente da configuração de presença
   - **Sermões**: a sua biblioteca de sermões, como um navegador completo ou em layout de grade, lista ou destaque do mais recente
   - **Mapa**: um mapa incorporado centralizado no endereço da sua igreja
   - **Tabela**: uma grade simples de linhas e colunas para conteúdo tabular
   - **Texto com foto**: texto e uma imagem lado a lado
   - **Logotipo**: o logotipo da sua igreja, obtido em [Aparência](appearance)
   - **Transmissão ao vivo**: o player da sua transmissão ao vivo, incorporado diretamente na página
   - **Podcast**: uma lista de episódios obtida de uma URL de feed RSS de podcast externo que você informa, com configurações para definir quantos episódios exibir e se devem mostrar datas e descrições. Cada episódio no site publicado tem um player de áudio e um link **Baixar** que salva o arquivo de áudio do episódio com o título do episódio. Isso serve para destacar qualquer feed de podcast no seu site; para publicar os seus próprios sermões como podcast, consulte [Gerenciando sermões](../sermons/managing-sermons.md#your-podcast-feed).
   - **Doação**: um botão de ofertas ou um formulário de doação incorporado
   - **HTML**: seu próprio HTML bruto, para casos de uso avançados, como incorporar um widget de terceiros (consulte [Usando o elemento HTML](#using-the-html-element))
   - **iFrame**: incorpore conteúdo externo a partir de uma URL
3. Configure o elemento usando o painel de configurações que aparece.

### Usando o elemento HTML

O elemento **HTML** tem duas caixas:

- **Conteúdo HTML**: a marcação a ser exibida na página. Quaisquer tags `<script>` incluídas aqui são executadas no seu site publicado.
- **JavaScript (exclua a tag script)**: código de script executado quando a página carrega. Você também pode colar aqui o trecho de incorporação de um fornecedor com as tags `<script>` incluídas, e ele será executado no site publicado.

Se você colar apenas um endereço da web (como um link de imagem) na caixa de JavaScript, a caixa ficará vermelha com o aviso *"Este é um endereço da web, não JavaScript."* Um endereço sozinho nessa caixa não faz nada. Para mostrar uma imagem, use um elemento **Imagem** ou coloque `<img src="...">` em **Conteúdo HTML**.

### Usando o elemento Calendário {#using-the-calendar-element}

O elemento **Calendário** mostra eventos de um dos seus calendários:

1. Em **Selecionar**, escolha **Calendário do grupo** (os eventos de um grupo; a lista mostra os grupos dos quais você participa) ou **Calendário curado** (um calendário que você criou em **Calendários**; consulte [Calendário curado](../calendars/curated-calendar)).
2. Em **Selecionar calendário**, escolha o grupo ou o calendário.
3. Em **Exibição**, escolha como mostrá-lo:
   - **Calendário mensal**: uma grade mensal que os visitantes podem percorrer página por página.
   - **Próximos eventos**: uma grade de blocos com os próximos 12 eventos, com um evento recorrente mostrado uma única vez em sua próxima data. Cada bloco mostra a foto do evento (ou o título sobre a cor escura do tema, quando não há foto), um selo de data, o dia e o horário, e a primeira linha da descrição. Um botão **Assinar**, acima dos blocos, permite que os visitantes copiem o link ICS do calendário ou o baixem.
4. Para mostrar apenas alguns eventos, digite uma tag em **Somente eventos com a tag** (por exemplo, `jovens`). Somente os eventos cujas **Tags** incluam essa palavra aparecem. Deixe vazio para mostrar todos os eventos. As tags são definidas em cada evento; consulte [Adicionando e editando eventos](../calendars/creating-calendars.md#adding-and-editing-events).

Em qualquer uma das exibições, clicar em um evento abre a página própria dele no seu site. A página do evento mostra a foto, o título, a data e o horário e a descrição, além de uma caixa com **Quando** (incluindo o padrão de repetição, no caso de um evento recorrente) e **Onde** (as salas reservadas para ele). Ela também tem um botão **Inscrever-se para este evento**, quando as inscrições estão ativas, e um link **Adicionar ao meu calendário**, que baixa o evento como arquivo de calendário. A página foi configurada para que os buscadores possam exibir a data e os detalhes do evento nos resultados. As páginas de eventos de calendários curados exibidos nas suas páginas (para eventos dos próximos seis meses) também são listadas no mapa do site, para que os buscadores possam encontrá-las.

### Reordenando o conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando sua página

### Estilos de seção

Clique em qualquer seção para abrir o painel de estilo dela. Você pode definir:

- **Fundo**: cor sólida, gradiente ou imagem. Ao usar uma imagem de fundo, um seletor de **Ponto focal** permite clicar para definir qual parte da imagem permanece centralizada conforme a seção é redimensionada, e a opção de cor de **Sobreposição** permite adicionar um tom semitransparente sobre a imagem para melhorar a legibilidade do texto.
- **Espaçamento interno**: espaço no topo e na base dentro da seção
- **Largura**: largura total ou centralizada/contida
- **Divisores**: divisores decorativos em forma de onda, diagonal, curva, triângulo e outros, na borda superior ou inferior da seção, com opções de cor, altura e inversão

### Estilos de elemento

Clique em qualquer elemento para abrir o painel de estilo dele. As opções comuns incluem tamanho da fonte, cor, alinhamento, margem e espaçamento interno. Para imagens, você pode definir o texto alternativo e o destino do link.

### CSS personalizado

Para estilização avançada, cada seção e cada elemento têm um campo **CSS personalizado**, onde você pode escrever suas próprias regras de CSS. Elas são restritas àquele elemento, então não afetam acidentalmente o restante da página.

:::tip
Se você precisar aplicar estilos em todo o seu site, como uma fonte personalizada ou uma cor global, use as configurações de [Aparência](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando sua página

Use os controles de prévia na barra de ferramentas para verificar como a sua página fica em diferentes tamanhos de tela:

- **Desktop**: visualização em largura total do navegador
- **Celular**: visualização estreita, no tamanho de um telefone

Para ver a página ao vivo exatamente como os visitantes a verão, volte à lista de Páginas e clique no caminho da página. Ela abre em uma nova aba do navegador.

## Verificando a acessibilidade

Clique no ícone **Acessibilidade** na barra de ferramentas para executar uma verificação rápida de problemas comuns, como imagens sem texto alternativo, contraste de cores baixo ou títulos fora de ordem. Cada problema leva diretamente ao elemento que precisa de atenção, para que você possa corrigi-lo no próprio local.

## Desfazendo alterações

O editor registra automaticamente o seu histórico de edições. Use os botões da barra de ferramentas ou os atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z): reverte sua última ação
- **Refazer** (Ctrl+Shift+Z ou Ctrl+Y / Cmd+Shift+Z): reaplica uma ação desfeita

Você também pode restaurar a página para um instantâneo anterior. Clique em **Ver histórico** na barra de ferramentas para ver uma lista de instantâneos salvos, com descrições, e clique em qualquer entrada para restaurar aquele ponto.

:::warning
Restaurar um instantâneo substitui o conteúdo atual da página pela versão do instantâneo. Isso não pode ser desfeito com o botão de desfazer padrão. Salve um instantâneo do estado atual antes de restaurar um antigo, se quiser manter a opção de voltar.
:::

## Salvando e publicando

As alterações são salvas automaticamente conforme você trabalha. Um indicador de status na barra de ferramentas mostra se as suas alterações foram salvas.

### Estado de rascunho e publicação

As páginas podem ter um estado de **publicação**, que controla quando os visitantes veem as suas alterações. A barra de ferramentas exibe uma etiqueta de status com o estado atual:

- **Ativo ao salvar**: a página não usa um fluxo de publicação. Cada alteração salva vai ao ar imediatamente. Este é o padrão para páginas novas.
- **Alterações não publicadas**: a página já foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicada**: a página está no ar e o conteúdo salvo corresponde ao que os visitantes veem.

Para publicar suas alterações, clique no botão **Publicar** na barra de ferramentas. A página entra no ar imediatamente.

Para reverter à última versão publicada sem afetar o que os visitantes veem, abra o menu de opções (⋮) e clique em **Descartar alterações não publicadas**.

Para deixar de usar o fluxo de publicação, abra o menu de opções e clique em **Desativar publicação**. As edições passam a ir ao ar imediatamente novamente.

:::tip
Use o fluxo de rascunho/publicação quando quiser preparar uma página, por exemplo para um evento próximo, e torná-la pública apenas no momento certo. Crie e visualize a página e depois clique em Publicar quando estiver pronto.
:::

## Artigos relacionados

- [Gerenciando páginas](managing-pages): crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](appearance): defina cores, fontes e identidade visual de todo o site
- [Arquivos](files): envie imagens e documentos para usar no editor
- [Criando formulários](../forms/creating-forms): crie formulários que podem ser incorporados às páginas
