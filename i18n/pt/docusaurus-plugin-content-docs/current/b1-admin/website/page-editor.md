---
title: "Usando o Editor de Página"
---

# Usando o Editor de Página

<div class="article-intro">

O editor de página B1 é um construtor visual de arrastar e soltar que permite projetar as páginas do seu site da igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer alterações -- tudo do seu navegador.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conclua [Configuração Inicial](initial-setup) para configurar seu site
- Crie pelo menos uma página em [Gerenciando Páginas](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o Editor

1. No B1 Admin, clique em **Website** no menu à esquerda.
2. Encontre a página que deseja editar na tabela de Páginas e clique em **Editar**.

O editor abre em modo de tela inteira. O painel esquerdo mostra a estrutura de sua página e os elementos de conteúdo disponíveis; a área central mostra uma visualização ao vivo de sua página.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração de tema do B1 Admin. Isso garante que a visualização corresponda precisamente a como sua página aparecerá para os visitantes do site.
:::

## Estrutura da Página: Seções e Elementos

Cada página é construída a partir de dois níveis:

- **Seções** -- Os contêineres de nível superior que dividem sua página em faixas horizontais (por exemplo, uma seção hero, um bloco de conteúdo ou uma faixa de rodapé). Cada página deve ter pelo menos uma seção antes de poder adicionar conteúdo.
- **Elementos** -- As peças de conteúdo individuais colocadas dentro de uma seção, como texto, imagens, botões, cards, formulários e calendários.

### Adicionando uma Seção

1. Clique em **Adicionar Seção** (ou no botão **+** no topo do painel esquerdo).
2. Escolha como começar:
   - **A partir de um modelo** — procure na galeria de modelos de seção organizada por categoria (Hero, Sobre, Serviços, Doações, etc.) e clique em uma para inseri-la como uma seção totalmente estilizada e pré-preenchida. Você pode personalizar tudo depois de adicionada.
   - **Seção em branco** — escolha um layout de coluna (coluna única, duas colunas, três colunas, etc.) e construa do zero.
3. A nova seção aparece na visualização. Clique nela para selecioná-la e configure sua cor de fundo, preenchimento e outras opções de estilo.

### Adicionando Elementos a uma Seção

1. Clique dentro de uma seção na visualização para selecioná-la.
2. Clique em **Adicionar Conteúdo** e escolha um tipo de elemento da lista:
   - **Texto** -- Títulos, parágrafos e texto rico
   - **Imagem** -- Carregar ou vincular a uma foto
   - **Botão** -- Um link de chamada à ação clicável
   - **Card** -- Uma imagem com um título e descrição
   - **Formulário** -- Incorpore um [formulário](../forms/creating-forms) diretamente na página
   - **Calendário** -- Exiba um calendário de eventos
   - **FAQ** -- Blocos de perguntas e respostas no estilo acordeão
   - **Vídeo** -- Incorpore um vídeo por URL
   - **Navegador de Grupos** -- Um diretório filtrável de todos os grupos da igreja com busca opcional, filtro de categoria e filtro de rótulo
   - **Recurso de Ícone** -- Um ícone com um título e descrição breve, para destaque de recurso ou ministério
   - **Galeria** -- Um grid de fotos múltiplas ou layout de alvenaria
   - **Depoimento** -- Uma ou mais citações com nome do autor, cargo e foto
   - **Ícones Sociais** -- Ícones vinculados para os perfis de mídia social da sua igreja
   - **Contagem Regressiva** -- Um temporizador contando para uma data ou horário de serviço semanal
   - **Estatísticas** -- Uma linha de números grandes com rótulos (membros, anos, campi)
   - **Progresso da Campanha** -- Uma barra de progresso ao vivo para uma campanha de doação, mostrando o total arrecadado em relação a uma meta de fundo
   - **Grade de Funcionários** -- Cards de foto para os membros de um grupo; o grupo deve ter sua opção de **lista pública** ativada
   - **Horários de Serviço** -- O cronograma de serviços de seus campi, extraído automaticamente da configuração de frequência
   - **Sermões** -- Sua biblioteca de sermões, como um navegador completo ou um layout em grid, lista ou destaque mais recente
3. Configure o elemento usando o painel de configurações que aparece.

### Reordenando Conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando Sua Página

### Estilos de Seção

Clique em qualquer seção para abrir seu painel de estilos. Você pode definir:

- **Fundo** -- Cor sólida, gradiente ou imagem. Ao usar um fundo de imagem, um seletor de **Ponto Focal** permite clicar para definir qual parte da imagem fica centralizada conforme a seção é dimensionada, e uma opção de cor de **Sobreposição** permite adicionar uma tinta semi-transparente sobre a imagem para melhorar a legibilidade do texto.
- **Preenchimento** -- Espaçamento superior e inferior dentro da seção
- **Largura** -- Largura total ou centralizado/contido
- **Divisores** -- Divisores de forma decorativa (onda, inclinação, curva, triângulo, etc.) na borda superior ou inferior da seção, com opções de cor, altura e inversão

### Estilos de Elemento

Clique em qualquer elemento para abrir seu painel de estilos. As opções comuns incluem tamanho da fonte, cor, alinhamento, margem e preenchimento. Para imagens, você pode definir texto alternativo e destinos de link.

### CSS Personalizado

Para estilo avançado, cada seção e elemento tem um campo de **CSS Personalizado** onde você pode escrever suas próprias regras CSS. Elas têm escopo para esse elemento, portanto não afetarão involuntariamente o resto da página.

:::tip
Se você precisa aplicar estilos em todo o seu site -- como uma fonte personalizada ou cor global -- use as configurações de [Aparência](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando Sua Página

Use os controles de visualização na barra de ferramentas para verificar como sua página fica em diferentes tamanhos de tela:

- **Desktop** -- Visualização de navegador em largura total
- **Celular** -- Visualização estreita do tamanho do telefone

Clique em **Visualizar** para abrir uma versão ao vivo da página em uma nova aba do navegador, exatamente como os visitantes a verão.

## Desfazendo Alterações

O editor rastreia seu histórico de edição automaticamente. Use os botões da barra de ferramentas ou atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) -- Revertê sua última ação
- **Refazer** (Ctrl+Y / Cmd+Y) -- Reaplicar uma ação desfeita

Você também pode restaurar a página para um snapshot anterior. Clique em **Histórico** na barra de ferramentas para ver uma lista de snapshots salvos com descrições, e clique em qualquer entrada para restaurar para esse ponto.

:::warning
Restaurar um snapshot substitui o conteúdo atual de sua página pela versão do snapshot. Isso não pode ser desfeito com o botão desfazer padrão. Salve um snapshot de seu estado atual antes de restaurar um antigo se quiser manter a opção de retornar.
:::

## Salvando e Publicando

As alterações são salvas automaticamente conforme você trabalha. Um indicador de status na barra de ferramentas mostra se suas alterações foram salvas.

### Estado de rascunho e publicado

As páginas podem ter um estado **publicado**, que controla quando os visitantes veem suas alterações. A barra de ferramentas exibe um chip de status mostrando o estado atual:

- **Ativo ao Salvar** -- A página não usa um fluxo de trabalho de publicação. Toda alteração salva entra em vigor imediatamente. Este é o padrão para novas páginas.
- **Alterações Não Publicadas** -- A página foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicado** -- A página está ao vivo e seu conteúdo salvo corresponde ao que os visitantes veem.

Para publicar suas alterações, clique no botão **Publicar** na barra de ferramentas. A página fica ao vivo imediatamente.

Para reverter para a última versão publicada sem afetar o que os visitantes veem, abra o menu de estouro (⋮) e clique em **Descartar Alterações**.

Para tirar uma página totalmente do ar, abra o menu de estouro e clique em **Cancelar Publicação**. Os visitantes não verão mais essa página até que você a publique novamente.

:::tip
Use o fluxo de trabalho de rascunho/publicação quando quiser preparar uma página -- por exemplo, para um evento próximo -- e apenas colocá-la ao vivo no momento certo. Construa e visualize a página, então clique em Publicar quando estiver pronto.
:::

## Artigos Relacionados

- [Gerenciando Páginas](managing-pages) -- Crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](appearance) -- Defina cores, fontes e marca em todo o site
- [Arquivos](files) -- Carregue imagens e documentos para usar no editor
- [Criando Formulários](../forms/creating-forms) -- Crie formulários que você pode incorporar nas páginas
