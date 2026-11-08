---
title: "Usando o Editor de Páginas"
description: "Configure um editor de páginas no B1 Admin adicionando seções e elementos, estilizando-os, visualizando no celular e publicando rascunhos. Também aborda desfazer alterações e o histórico de versões."
---

# Usando o Editor de Páginas

<div class="article-intro">

O editor de páginas do B1 é um construtor visual de arrastar e soltar que permite criar as páginas do site da sua igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer alterações, tudo a partir do seu navegador.

</div>

## Vídeo de Treinamento

<YouTube id="m2B_JxmfFm4" title="Editando páginas e navegação no B1" next="Conectando um domínio personalizado no B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conclua a [Configuração Inicial](./initial-setup.md) para deixar seu site configurado
- Crie pelo menos uma página em [Gerenciando Páginas](./managing-pages.md)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o Editor

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Site** e clique em **Páginas**.
2. Localize a página que deseja editar na tabela de Páginas e clique em **Editar conteúdo**.

O editor abre em tela cheia. O painel esquerdo mostra a estrutura da sua página e os elementos de conteúdo disponíveis; a área central exibe uma prévia ao vivo da sua página.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração de tema do B1 Admin, e usa as fontes de título e de texto que você escolheu em [Aparência](./appearance.md). Isso garante que a prévia corresponda fielmente à forma como a página aparecerá para os visitantes do site.
:::

## Estrutura da Página: Seções e Elementos

Cada página é construída em dois níveis:

- **Seções** -- Os contêineres de nível superior que dividem sua página em faixas horizontais (por exemplo, uma seção de destaque, um bloco de conteúdo ou uma faixa de rodapé). Toda página precisa ter pelo menos uma seção antes que você possa adicionar conteúdo.
- **Elementos** -- As peças individuais de conteúdo colocadas dentro de uma seção, como texto, imagens, botões, cartões, formulários e calendários.

### Adicionando uma Seção

1. Clique em **Adicionar seção** (ou no botão **+** no topo do painel esquerdo).
2. Escolha como começar:
   - **A partir de um modelo** — navegue pela galeria de modelos de seção, organizada por categoria (Destaque, Sobre, Serviços, Contribuições etc.), e clique em um para inseri-lo como uma seção totalmente estilizada e pré-preenchida. Você pode personalizar tudo depois de adicioná-la.
   - **Seção em branco** — escolha um layout de colunas (uma coluna, duas colunas, três colunas etc.) e construa do zero.
3. A nova seção aparece na prévia. Clique nela para selecioná-la e configurar a cor de fundo, o espaçamento interno e outras opções de estilo.

### Trocando o Layout de uma Seção

Já montou uma seção, mas quer uma estrutura diferente? Use o seletor de layout nessa seção para trocar a disposição das colunas por outra da galeria, mantendo o conteúdo e os elementos existentes no lugar.

### Adicionando Elementos a uma Seção

1. Clique dentro de uma seção na prévia para selecioná-la.
2. Clique em **Adicionar conteúdo** e escolha um tipo de elemento na lista:
   - **Texto** -- Títulos, parágrafos e texto formatado
   - **Imagem** -- Envie uma foto ou vincule a uma
   - **Botão** -- Um link clicável de chamada para ação
   - **Cartão** -- Uma imagem com título e descrição
   - **Formulário** -- Incorpore um [formulário](../forms/creating-forms.md) diretamente na página. Se o formulário tiver uma [foto de cabeçalho](../forms/creating-forms.md#adding-a-header-photo), ela aparece acima das perguntas
   - **Calendário** -- Exibe um calendário de eventos
   - **FAQ** -- Blocos de perguntas e respostas em formato de acordeão
   - **Vídeo** -- Incorpora um vídeo por URL
   - **Navegador de Grupos** -- Um diretório filtrável de todos os grupos da igreja, com pesquisa opcional, filtro por categoria e filtro por etiqueta. Seu **Layout** pode ser **Grade** (o padrão) ou **Rolagem (automática)** -- veja [Layouts com rolagem](#scrolling-layouts)
   - **Lista de Grupos** -- Blocos para seus grupos públicos, opcionalmente apenas os grupos com determinada etiqueta. Seu **Layout** pode ser **Grade** (o padrão; até três blocos por linha) ou **Rolagem (automática)** -- veja [Layouts com rolagem](#scrolling-layouts)
   - **Ícone de Destaque** -- Um ícone com título e breve descrição, para destacar recursos ou ministérios
   - **Galeria** -- Um layout em grade ou em mosaico com várias fotos
   - **Depoimento** -- Uma ou mais citações com nome do autor, função e foto
   - **Ícones de Redes Sociais** -- Ícones com link para os perfis de mídia social da igreja: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Preencha um link para cada um que deseja mostrar; para o **WhatsApp**, use um link `https://wa.me/` com seu número ou um link de convite de grupo
   - **Contagem Regressiva** -- Um cronômetro até uma data ou um horário semanal de culto
   - **Estatísticas** -- Uma linha de números grandes com rótulos (membros, anos, unidades)
   - **Progresso de Campanha** -- Uma barra de progresso ao vivo para uma campanha de contribuições, mostrando o total arrecadado em direção à meta de um fundo
   - **Grade de Equipe** -- Cartões com fotos dos membros de um grupo; o grupo precisa ter a opção de **lista pública** ativada
   - **Horários de Culto** -- A programação de cultos das suas unidades, puxada automaticamente da configuração de presença
   - **Sermões** -- Sua biblioteca de sermões, como um navegador completo ou em layout de grade, lista ou destaque com o mais recente
   - **Mapa** -- Um mapa incorporado centralizado no endereço da igreja
   - **Tabela** -- Uma grade simples de linhas e colunas para conteúdo tabular
   - **Texto com Foto** -- Texto e imagem lado a lado
   - **Logotipo** -- O logotipo da sua igreja, puxado de [Aparência](./appearance.md)
   - **Transmissão ao Vivo** -- Seu player de transmissão ao vivo, incorporado diretamente na página
   - **Podcast** -- Uma lista de episódios puxada de uma URL de feed RSS de podcast externo que você informa, com configurações de quantos episódios mostrar e se devem ser exibidas datas e descrições. Cada episódio no site publicado tem um player de áudio e um link **Baixar** que salva o arquivo de áudio do episódio com o título do episódio. Isso serve para destacar qualquer feed de podcast no seu site; para publicar seus próprios sermões como podcast, veja [Gerenciando Sermões](../sermons/managing-sermons.md#your-podcast-feed)
   - **Doação** -- Um botão de contribuição ou um formulário de doação incorporado
   - **HTML** -- Seu próprio HTML bruto, para usos avançados, como incorporar um widget de terceiros (veja [Usando o elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora conteúdo externo por URL
3. Configure o elemento usando o painel de configurações que aparece.

### Usando o elemento HTML

O elemento **HTML** tem duas caixas:

- **Conteúdo HTML** -- A marcação a ser exibida na página. Quaisquer tags `<script>` incluídas aqui são executadas no seu site publicado.
- **JavaScript (sem a tag script)** -- Código de script executado quando a página é carregada. Você também pode colar aqui um trecho de incorporação de um fornecedor com as tags `<script>` incluídas, e ele será executado no site publicado.

Se você colar apenas um endereço da web (como um link de imagem) na caixa de JavaScript, a caixa ficará vermelha com o aviso *"Este é um endereço da web, não JavaScript."* Um endereço sem nada além disso nessa caixa não faz nada. Para mostrar uma imagem, use um elemento **Imagem** ou coloque `<img src="...">` em **Conteúdo HTML**.

### Usando o elemento Calendário {#using-the-calendar-element}

O elemento **Calendário** mostra eventos de um dos seus calendários:

1. Em **Selecionar**, escolha **Calendário de Grupo** (os eventos de um grupo -- a lista mostra os grupos dos quais você faz parte) ou **Calendário Personalizado** (um calendário que você criou em **Calendários**; veja [Calendário Personalizado](../calendars/curated-calendar.md)).
2. Em **Selecionar calendário**, escolha o grupo ou calendário.
3. Em **Exibição**, escolha como mostrá-lo:
   - **Calendário mensal** -- Uma grade mensal que os visitantes podem percorrer. Cada evento recebe a cor do grupo ao qual pertence, então os eventos de um grupo têm a mesma cor em todos os calendários. O B1 escolhe as cores automaticamente; não há nada para configurar.
   - **Próximos eventos** -- Uma grade de blocos com os próximos 12 eventos, com um evento recorrente exibido uma vez, na sua próxima data. Cada bloco mostra a foto do evento (ou o título sobre a cor escura do seu tema, quando não há foto), um selo de data, o dia e o horário, e a primeira linha da descrição. Um botão **Assinar** acima dos blocos permite que os visitantes copiem o link ICS do calendário ou o baixem. Uma configuração de **Layout** aparece para essa exibição: **Grade** (o padrão) ou **Rolagem (automática)**, que dispõe os blocos em uma única linha que rola sozinha (veja [Layouts com rolagem](#scrolling-layouts)). Para um **Calendário Personalizado**, ative a configuração **Selo do grupo** para mostrar o nome do grupo de cada evento no canto superior direito do seu bloco, na cor do calendário daquele grupo. Eventos de grupos arquivados ou confidenciais não recebem selo.
4. Para mostrar apenas alguns eventos, digite uma etiqueta em **Somente eventos com a etiqueta** -- por exemplo, `jovens`. Apenas os eventos cujas **Etiquetas** incluam essa palavra aparecem. Deixe vazio para mostrar todos os eventos. As etiquetas são definidas em cada evento; veja [Adicionando e Editando Eventos](../calendars/creating-calendars.md#adding-and-editing-events).

Em qualquer uma das exibições, ao clicar em um evento, abre-se a página própria dele no seu site. A página do evento mostra a foto, o título, a data, o horário e a descrição do evento, além de uma caixa com **Quando** (incluindo o padrão de repetição, no caso de um evento recorrente) e **Onde** (as salas reservadas para ele). Também há um botão **Inscrever-se neste evento**, quando as inscrições estão ativadas, e um link **Adicionar ao meu calendário**, que baixa o evento como um arquivo de calendário. A página foi preparada para que os mecanismos de busca possam exibir a data e os detalhes do evento nos resultados. As páginas de eventos de calendários personalizados exibidos nas suas páginas (para eventos dos próximos seis meses) também são listadas no mapa do site, para que os mecanismos de busca possam encontrá-las.

### Layouts com rolagem {#scrolling-layouts}

O layout **Rolagem (automática)** no **Navegador de Grupos**, na **Lista de Grupos** e na exibição **Próximos eventos** do elemento Calendário dispõe os blocos em uma linha, em vez de uma grade. No celular, cada bloco ocupa a linha inteira; no computador, dois blocos cabem lado a lado. Quando há mais blocos do que cabem, a linha:

- Avança um bloco a cada quatro segundos aproximadamente, voltando ao primeiro bloco depois do último.
- Pausa enquanto um visitante passa o cursor, toca ou navega com a tecla Tab sobre ela, e retoma alguns segundos depois.
- Mostra uma fileira de pontos embaixo, um para cada bloco, com o ponto do bloco atual preenchido. Os visitantes podem clicar em um ponto para ir direto a esse bloco.

Em dispositivos configurados para reduzir o movimento, a linha fica parada, e os visitantes deslizam ou rolam a linha por conta própria. Se todos os blocos couberem, a linha não se move e nenhum ponto aparece.

### Reordenando Conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) do lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando Sua Página

### Estilos de Seção

Clique em qualquer seção para abrir o painel de estilos dela. Você pode definir:

- **Fundo** -- Cor sólida, gradiente ou imagem. Ao usar uma imagem de fundo, um seletor de **Ponto focal** permite clicar para definir qual parte da imagem permanece centralizada quando a seção é redimensionada, e uma opção de cor de **Sobreposição** permite adicionar um tom semitransparente sobre a imagem para melhorar a legibilidade do texto.
- **Espaçamento interno** -- Espaçamento superior e inferior dentro da seção
- **Largura** -- Largura total ou centralizada/contida
- **Divisores** -- Formas decorativas de divisão (onda, inclinação, curva, triângulo e outras) na borda superior ou inferior da seção, com opções de cor, altura e inversão

### Estilos de Elemento

Clique em qualquer elemento para abrir o painel de estilos dele. As opções comuns incluem tamanho da fonte, cor, alinhamento, margem e espaçamento interno. Para imagens, você pode definir o texto alternativo e os destinos dos links.

### CSS Personalizado

Para estilização avançada, cada seção e elemento tem um campo **CSS personalizado** onde você pode escrever suas próprias regras de CSS. Essas regras se aplicam apenas àquele elemento, então não afetam acidentalmente o restante da página.

:::tip
Se precisar aplicar estilos em todo o site -- como uma fonte personalizada ou uma cor global --, use as configurações de [Aparência](./appearance.md) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando Sua Página

Use os controles de visualização na barra de ferramentas para verificar como sua página fica em diferentes tamanhos de tela:

- **Computador** -- Visualização em largura total do navegador
- **Celular** -- Visualização estreita, no tamanho de um telefone

No celular, as colunas de uma linha se empilham umas sobre as outras em largura total, a menos que você defina uma **Largura no celular** para elas nas configurações da linha. Listas de sermões e podcasts também empilham o texto de cada episódio abaixo da miniatura, no celular.

Para ver a página publicada exatamente como os visitantes a verão, volte à lista de Páginas e clique no caminho da página. Ela abre em uma nova aba do navegador.

## Verificando a Acessibilidade

Clique no ícone de **Acessibilidade** na barra de ferramentas para executar uma verificação rápida de problemas comuns -- imagens sem texto alternativo, contraste de cor baixo ou títulos fora de ordem. Cada problema leva diretamente ao elemento que precisa de atenção, para que você possa corrigi-lo ali mesmo.

## Desfazendo Alterações

O editor registra seu histórico de edição automaticamente. Use os botões da barra de ferramentas ou os atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) -- Reverte sua última ação
- **Refazer** (Ctrl+Shift+Z ou Ctrl+Y / Cmd+Shift+Z) -- Reaplica uma ação desfeita

Você também pode restaurar a página para um instantâneo anterior. Clique em **Ver histórico** na barra de ferramentas para ver uma lista de instantâneos salvos com descrições, e clique em qualquer entrada para restaurar a página a esse ponto.

:::warning
Restaurar um instantâneo substitui o conteúdo atual da página pela versão do instantâneo. Isso não pode ser desfeito com o botão de desfazer padrão. Salve um instantâneo do estado atual antes de restaurar um antigo, caso queira poder voltar.
:::

## Salvando e Publicando

As alterações são salvas automaticamente à medida que você trabalha. Um indicador de status na barra de ferramentas mostra se suas alterações foram salvas.

### Estado de rascunho e publicado

As páginas podem ter um estado **publicado**, que controla quando os visitantes veem suas alterações. A barra de ferramentas exibe um selo de status mostrando o estado atual:

- **Ativo ao salvar** -- A página não usa um fluxo de publicação. Cada alteração salva vai ao ar imediatamente. Este é o padrão para páginas novas.
- **Alterações não publicadas** -- A página já foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicada** -- A página está no ar e o conteúdo salvo corresponde ao que os visitantes veem.

Para publicar suas alterações, clique no botão **Publicar** na barra de ferramentas. A página fica no ar imediatamente.

Para voltar à última versão publicada sem afetar o que os visitantes veem, abra o menu de opções (⋮) e clique em **Descartar alterações não publicadas**.

Para deixar de usar o fluxo de publicação, abra o menu de opções e clique em **Desativar publicação**. As edições passam a ir ao ar imediatamente novamente.

:::tip
Use o fluxo de rascunho/publicação quando quiser preparar uma página -- por exemplo, para um evento que se aproxima -- e só colocá-la no ar no momento certo. Construa e visualize a página e, quando estiver pronto, clique em Publicar.
:::

## Artigos Relacionados

- [Gerenciando Páginas](./managing-pages.md) -- Crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](./appearance.md) -- Defina cores, fontes e identidade visual de todo o site
- [Arquivos](./files.md) -- Envie imagens e documentos para usar no editor
- [Criando Formulários](../forms/creating-forms.md) -- Crie formulários que você pode incorporar nas páginas
