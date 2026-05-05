---
title: "Usando o Editor de Páginas"
---

# Usando o Editor de Páginas

<div class="article-intro">

O editor de páginas B1 é um construtor visual de arrastar e soltar que permite projetar as páginas do site da sua igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer alterações -- tudo dentro do seu navegador.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete [Initial Setup](initial-setup) para configurar seu site
- Crie pelo menos uma página em [Managing Pages](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o Editor

1. No B1 Admin, clique em **Website** no menu esquerdo.
2. Encontre a página que deseja editar na tabela Pages e clique em **Edit**.

O editor abre em modo tela cheia. O painel esquerdo mostra a estrutura da sua página e os elementos de conteúdo disponíveis; a área central mostra uma visualização ao vivo da sua página.

:::info
O editor sempre é exibido no modo claro, independentemente da configuração do tema do B1 Admin. Isso garante que a visualização corresponda com precisão à aparência da sua página para os visitantes do site.
:::

## Estrutura da Página: Seções e Elementos

Toda página é construída a partir de dois níveis:

- **Sections** -- Os contêineres de nível superior que dividem sua página em bandas horizontais (por exemplo, uma seção hero, um bloco de conteúdo ou uma faixa de rodapé). Toda página deve ter pelo menos uma seção antes de você poder adicionar conteúdo.
- **Elements** -- As peças de conteúdo individuais colocadas dentro de uma seção, como texto, imagens, botões, cartões, formulários e calendários.

### Adicionando uma Seção

1. Clique em **Add Section** (ou o botão **+** no topo do painel esquerdo).
2. Escolha um layout para sua seção -- as opções incluem coluna única, duas colunas, três colunas e muito mais.
3. A nova seção aparece na visualização. Clique nela para selecioná-la e configurar sua cor de fundo, preenchimento e outras opções de estilo.

### Adicionando Elementos a uma Seção

1. Clique dentro de uma seção na visualização para selecioná-la.
2. Clique em **Add Content** e escolha um tipo de elemento da lista:
   - **Text** -- Títulos, parágrafos e texto rico
   - **Image** -- Faça upload ou vincule a uma foto
   - **Button** -- Um link clicável de call-to-action
   - **Card** -- Uma imagem com título e descrição
   - **Form** -- Incorpore um [formulário](../forms/creating-forms) diretamente na página
   - **Calendar** -- Exiba um calendário de eventos
   - **FAQ** -- Blocos de perguntas e respostas em estilo acordeão
   - **Video** -- Incorpore um vídeo por URL
3. Configure o elemento usando o painel de configurações que aparece.

### Reordenando Conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reordená-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando Sua Página

### Estilos de Seção

Clique em qualquer seção para abrir seu painel de estilo. Você pode definir:

- **Background** -- Cor sólida, gradiente ou imagem
- **Padding** -- Espaçamento superior e inferior dentro da seção
- **Width** -- Largura total ou centralizada/contida

### Estilos de Elemento

Clique em qualquer elemento para abrir seu painel de estilo. As opções comuns incluem tamanho da fonte, cor, alinhamento, margem e preenchimento. Para imagens, você pode definir texto alternativo e alvos de link.

### CSS Personalizado

Para estilização avançada, cada seção e elemento tem um campo **Custom CSS** onde você pode escrever suas próprias regras CSS. Estas são delimitadas a esse elemento, portanto não afetarão acidentalmente o resto da página.

:::tip
Se você precisar aplicar estilos em todo o seu site -- como uma fonte personalizada ou cor global -- use as configurações de [Appearance](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando Sua Página

Use os controles de visualização na barra de ferramentas para verificar como sua página fica em diferentes tamanhos de tela:

- **Desktop** -- Visualização completa do navegador
- **Mobile** -- Visualização estreita do tamanho do telefone

Clique em **Preview** para abrir uma versão ao vivo da página em uma nova aba do navegador, exatamente como os visitantes verão.

## Desfazendo Alterações

O editor rastreia seu histórico de edição automaticamente. Use os botões da barra de ferramentas ou atalhos de teclado para navegar:

- **Undo** (Ctrl+Z / Cmd+Z) -- Reverter sua última ação
- **Redo** (Ctrl+Y / Cmd+Y) -- Reaplicar uma ação desfeita

Você também pode restaurar a página para um instantâneo anterior. Clique em **History** na barra de ferramentas para ver uma lista de instantâneos salvos com descrições e clique em qualquer entrada para restaurar para esse ponto.

:::warning
Restaurar um instantâneo substitui o conteúdo atual da sua página pela versão do instantâneo. Isso não pode ser desfeito com o botão de desfazer padrão. Salve um instantâneo do seu estado atual antes de restaurar um antigo se quiser manter a opção de retornar.
:::

## Salvando Seu Trabalho

As alterações são salvas automaticamente conforme você trabalha. Um indicador de status na barra de ferramentas mostra se suas alterações foram salvas. Você também pode clicar em **Save** a qualquer momento para forçar um salvamento.

## Artigos Relacionados

- [Managing Pages](managing-pages) -- Crie páginas, defina URLs e gerencie a navegação do site
- [Appearance](appearance) -- Defina cores, fontes e marca em todo o site
- [Files](files) -- Faça upload de imagens e documentos para usar no editor
- [Creating Forms](../forms/creating-forms) -- Construa formulários que você pode incorporar em páginas
