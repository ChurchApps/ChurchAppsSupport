---
title: "Usando o Editor de Páginas"
---

# Usando o Editor de Páginas

<div class="article-intro">

O editor de páginas do B1 é um construtor visual de arrastar e soltar que permite criar as páginas do site da sua igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar o resultado e desfazer alterações -- tudo a partir do seu navegador.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conclua a [Configuração Inicial](initial-setup) para configurar seu site
- Crie pelo menos uma página em [Gerenciando Páginas](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o editor

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Site** e clique em **Páginas**.
2. Localize a página que deseja editar na tabela de Páginas e clique em **Editar Conteúdo**.

O editor abre em modo de tela cheia. O painel esquerdo mostra a estrutura da página e os elementos de conteúdo disponíveis; a área central mostra uma prévia ao vivo da sua página.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração de tema do B1 Admin, e usa as fontes de título e de texto que você escolheu em [Aparência](appearance). Isso garante que a prévia corresponda exatamente à forma como sua página aparecerá para os visitantes do site.
:::

## Estrutura da página: seções e elementos

Cada página é construída em dois níveis:

- **Seções** -- Os contêineres de nível superior que dividem sua página em faixas horizontais (por exemplo, uma seção de destaque, um bloco de conteúdo ou uma faixa de rodapé). Toda página precisa ter pelo menos uma seção antes que você possa adicionar conteúdo.
- **Elementos** -- As peças individuais de conteúdo colocadas dentro de uma seção, como texto, imagens, botões, cartões, formulários e calendários.

### Adicionando uma seção

1. Clique em **Adicionar Seção** (ou no botão **+** no topo do painel esquerdo).
2. Escolha como começar:
   - **A partir de um modelo** -- navegue pela galeria de modelos de seção, organizada por categoria (Destaque, Sobre, Cultos, Ofertas etc.), e clique em um para inseri-lo como uma seção totalmente estilizada e pré-preenchida. Você pode personalizar tudo depois de adicioná-la.
   - **Seção em branco** -- escolha um layout de colunas (uma coluna, duas colunas, três colunas etc.) e monte do zero.
3. A nova seção aparece na prévia. Clique nela para selecioná-la e configurar a cor de fundo, o espaçamento interno e outras opções de estilo.

### Trocando o layout de uma seção

Já montou uma seção, mas quer uma estrutura diferente? Use o seletor de layout dessa seção para trocar a disposição das colunas por outra da galeria, mantendo o conteúdo e os elementos existentes no lugar.

### Adicionando elementos a uma seção

1. Clique dentro de uma seção na prévia para selecioná-la.
2. Clique em **Adicionar Conteúdo** e escolha um tipo de elemento na lista:
   - **Texto** -- Títulos, parágrafos e texto formatado
   - **Imagem** -- Envie ou vincule uma foto
   - **Botão** -- Um link clicável de chamada para ação
   - **Cartão** -- Uma imagem com título e descrição
   - **Formulário** -- Incorpore um [formulário](../forms/creating-forms) diretamente na página
   - **Calendário** -- Exibe um calendário de eventos
   - **FAQ** -- Blocos de perguntas e respostas no estilo sanfona
   - **Vídeo** -- Incorpora um vídeo pela URL
   - **Navegador de Grupos** -- Um diretório filtrável de todos os grupos da igreja, com pesquisa, filtro por categoria e filtro por etiqueta opcionais
   - **Destaque com Ícone** -- Um ícone com título e descrição curta, para destacar recursos ou ministérios
   - **Galeria** -- Uma grade de várias fotos ou layout em mosaico
   - **Depoimento** -- Uma ou mais citações com nome do autor, função e foto
   - **Ícones de Redes Sociais** -- Ícones com links para os perfis de redes sociais da sua igreja
   - **Contagem Regressiva** -- Um cronômetro até uma data ou um horário semanal de culto
   - **Estatísticas** -- Uma linha de números grandes com rótulos (membros, anos, campi)
   - **Progresso de Campanha** -- Uma barra de progresso ao vivo para uma campanha de ofertas, mostrando o total arrecadado para a meta de um fundo
   - **Grade de Equipe** -- Cartões com fotos dos membros de um grupo; o grupo precisa ter a opção **lista pública** ativada
   - **Horários de Culto** -- A programação de cultos dos seus campi, obtida automaticamente da configuração de presença
   - **Sermões** -- Sua biblioteca de sermões, como um navegador completo ou em layout de grade, lista ou destaque do mais recente
   - **Mapa** -- Um mapa incorporado centralizado no endereço da sua igreja
   - **Tabela** -- Uma grade simples de linhas e colunas para conteúdo tabular
   - **Texto com Foto** -- Texto e uma imagem lado a lado
   - **Logotipo** -- O logotipo da sua igreja, obtido de [Aparência](appearance)
   - **Transmissão ao Vivo** -- O player da sua transmissão ao vivo, incorporado diretamente na página
   - **Podcast** -- Uma lista de episódios obtida de uma URL de feed RSS de podcast externo que você informa, com configurações de quantos episódios mostrar e se devem ser exibidas datas e descrições. Serve para destacar qualquer feed de podcast no seu site; para publicar seus próprios sermões como podcast, consulte [Gerenciando Sermões](../sermons/managing-sermons.md#your-podcast-feed).
   - **Doação** -- Um botão de ofertas ou um formulário de doação incorporado
   - **HTML** -- Seu próprio HTML bruto, para usos avançados, como incorporar um widget de terceiros (consulte [Usando o elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora conteúdo externo pela URL
3. Configure o elemento usando o painel de configurações que aparece.

### Usando o elemento HTML {#using-the-html-element}

O elemento **HTML** tem duas caixas:

- **Conteúdo HTML** -- A marcação a ser exibida na página. Quaisquer tags `<script>` incluídas aqui são executadas no seu site ao vivo.
- **JavaScript (sem a tag script)** -- Código de script executado quando a página é carregada. Você também pode colar aqui o trecho de incorporação de um fornecedor, com as tags `<script>` incluídas, e ele será executado no site ao vivo.

Se você colar apenas um endereço web (como um link de imagem) na caixa de JavaScript, a caixa fica vermelha com o aviso *"Isto é um endereço web, não JavaScript."* Um endereço sozinho nessa caixa não faz nada. Para mostrar uma imagem, use um elemento **Imagem** ou coloque `<img src="...">` em **Conteúdo HTML**.

### Usando o elemento Calendário {#using-the-calendar-element}

O elemento **Calendário** mostra eventos de um dos seus calendários:

1. Em **Selecionar**, escolha **Calendário de Grupo** (eventos de um grupo; a lista mostra os grupos dos quais você participa) ou **Calendário Personalizado** (um calendário que você montou em **Calendários**; consulte [Calendário Personalizado](../calendars/curated-calendar)).
2. Em **Selecionar Calendário**, escolha o grupo ou calendário.
3. Em **Exibição**, escolha como mostrá-lo:
   - **Calendário mensal** -- Uma grade mensal que os visitantes podem percorrer.
   - **Próximos eventos** -- Uma grade de blocos com os próximos 12 eventos, com um evento recorrente exibido uma única vez na sua próxima data. Cada bloco mostra a foto do evento (ou o título sobre a cor escura do seu tema, quando não há foto), um selo de data, o dia e a hora, e a primeira linha da descrição. Um botão **Assinar** acima dos blocos permite que os visitantes copiem o link ICS do calendário ou o baixem.
4. Para mostrar apenas alguns eventos, digite uma etiqueta em **Somente eventos com a etiqueta** -- por exemplo, `jovens`. Somente eventos cujas **Etiquetas** incluam essa palavra aparecem. Deixe vazio para mostrar todos os eventos. As etiquetas são definidas em cada evento; consulte [Adicionando e Editando Eventos](../calendars/creating-calendars.md#adding-and-editing-events).

Em qualquer exibição, clicar em um evento abre a sua própria página no seu site. A página do evento mostra a foto, o título, a data e a hora e a descrição do evento, além de uma caixa com **Quando** (incluindo o padrão de repetição, no caso de um evento recorrente) e **Onde** (as salas reservadas para ele). Também tem um botão **Inscrever-se neste Evento**, quando as inscrições estão ativadas, e um link **Adicionar ao meu calendário**, que baixa o evento como um arquivo de calendário. A página está configurada para que os mecanismos de busca possam mostrar a data e os detalhes do evento nos resultados.

### Reordenando o conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando sua página

### Estilos de seção

Clique em qualquer seção para abrir o painel de estilo dela. Você pode definir:

- **Fundo** -- Cor sólida, gradiente ou imagem. Ao usar uma imagem de fundo, um seletor de **Ponto focal** permite clicar para definir qual parte da imagem permanece centralizada quando a seção é redimensionada, e a opção de cor de **Sobreposição** permite adicionar um véu semitransparente sobre a imagem para melhorar a legibilidade do texto.
- **Espaçamento interno** -- Espaçamento superior e inferior dentro da seção
- **Largura** -- Largura total ou centralizada/contida
- **Divisores** -- Divisores decorativos em forma (onda, diagonal, curva, triângulo e outros) na borda superior ou inferior da seção, com opções de cor, altura e inversão

### Estilos de elemento

Clique em qualquer elemento para abrir o painel de estilo dele. Opções comuns incluem tamanho da fonte, cor, alinhamento, margem e espaçamento interno. Para imagens, você pode definir o texto alternativo e os destinos de link.

### CSS personalizado

Para estilização avançada, cada seção e cada elemento tem um campo **CSS personalizado**, onde você pode escrever suas próprias regras de CSS. Elas têm escopo limitado a esse elemento, então não afetam o restante da página sem querer.

:::tip
Se você precisar aplicar estilos em todo o site -- como uma fonte personalizada ou uma cor global --, use as configurações de [Aparência](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando sua página

Use os controles de visualização na barra de ferramentas para verificar como sua página fica em diferentes tamanhos de tela:

- **Desktop** -- Visualização em largura total do navegador
- **Celular** -- Visualização estreita, no tamanho de um telefone

Para ver a página ao vivo exatamente como os visitantes a verão, volte à lista de Páginas e clique no caminho da página. Ela abre em uma nova aba do navegador.

## Verificando a acessibilidade

Clique no ícone **Acessibilidade** na barra de ferramentas para executar uma verificação rápida de problemas comuns -- imagens sem texto alternativo, contraste de cores baixo ou títulos fora de ordem. Cada problema leva diretamente ao elemento que precisa de atenção, para que você possa corrigi-lo no próprio local.

## Desfazendo alterações

O editor registra automaticamente o seu histórico de edição. Use os botões da barra de ferramentas ou os atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) -- Reverte sua última ação
- **Refazer** (Ctrl+Shift+Z ou Ctrl+Y / Cmd+Shift+Z) -- Reaplica uma ação desfeita

Você também pode restaurar a página para um instantâneo anterior. Clique em **Ver histórico** na barra de ferramentas para ver uma lista de instantâneos salvos com descrições, e clique em qualquer entrada para voltar àquele ponto.

:::warning
Restaurar um instantâneo substitui o conteúdo atual da página pela versão do instantâneo. Isso não pode ser desfeito com o botão de desfazer padrão. Salve um instantâneo do estado atual antes de restaurar um antigo, se quiser manter a opção de voltar.
:::

## Salvando e publicando

As alterações são salvas automaticamente enquanto você trabalha. Um indicador de status na barra de ferramentas mostra se suas alterações foram salvas.

### Estado de rascunho e publicado

As páginas podem ter um estado **publicado**, que controla quando os visitantes veem suas alterações. A barra de ferramentas exibe um selo de status mostrando o estado atual:

- **Ativo ao salvar** -- A página não usa um fluxo de publicação. Cada alteração salva vai ao ar imediatamente. Este é o padrão para páginas novas.
- **Alterações não publicadas** -- A página já foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicado** -- A página está no ar e o conteúdo salvo corresponde ao que os visitantes veem.

Para publicar suas alterações, clique no botão **Publicar** na barra de ferramentas. A página entra no ar imediatamente.

Para voltar à última versão publicada sem afetar o que os visitantes veem, abra o menu de mais opções (⋮) e clique em **Descartar alterações não publicadas**.

Para deixar de usar o fluxo de publicação, abra o menu de mais opções e clique em **Desativar publicação**. As edições então voltam a ir ao ar imediatamente.

:::tip
Use o fluxo de rascunho/publicação quando quiser preparar uma página -- por exemplo, para um evento que se aproxima -- e só colocá-la no ar no momento certo. Monte e visualize a página e depois clique em Publicar quando estiver pronto.
:::

## Artigos relacionados

- [Gerenciando Páginas](managing-pages) -- Crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](appearance) -- Defina cores, fontes e identidade visual de todo o site
- [Arquivos](files) -- Envie imagens e documentos para usar no editor
- [Criando Formulários](../forms/creating-forms) -- Crie formulários que você pode incorporar em páginas
