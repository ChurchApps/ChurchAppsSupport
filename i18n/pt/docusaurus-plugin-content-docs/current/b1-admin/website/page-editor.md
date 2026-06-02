---
title: "Usando o Editor de Página"
---

# Usando o Editor de Página

<div class="article-intro">

O editor de página B1 é um construtor visual com arrasta-e-solta que permite que você projete suas páginas de site de igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer alterações -- tudo a partir do seu navegador.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete [Configuração Inicial](initial-setup) para configurar seu site
- Crie pelo menos uma página em [Gerenciando Páginas](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o Editor

1. Na B1 Admin, clique em **Website** no menu esquerdo.
2. Encontre a página que deseja editar na tabela Páginas e clique em **Editar**.

O editor abre em modo tela inteira. O painel esquerdo mostra sua estrutura de página e elementos de conteúdo disponíveis; a área central mostra uma visualização ao vivo de sua página.

:::info
O editor sempre é exibido em modo claro, independentemente da configuração de tema da B1 Admin. Isso garante que a visualização corresponda com precisão à aparência de sua página para visitantes do site.
:::

## Estrutura de Página: Seções e Elementos

Toda página é construída em dois níveis:

- **Seções** -- Os contêineres de nível superior que dividem sua página em faixas horizontais (por exemplo, uma seção herói, um bloco de conteúdo ou uma faixa de rodapé). Toda página deve ter pelo menos uma seção antes de poder adicionar conteúdo.
- **Elementos** -- Os pedaços de conteúdo individuais colocados dentro de uma seção, como texto, imagens, botões, cartões, formulários e calendários.

### Adicionando uma Seção

1. Clique em **Adicionar Seção** (ou o botão **+** no topo do painel esquerdo).
2. Escolha um layout para sua seção -- opções incluem coluna única, duas colunas, três colunas e mais.
3. A nova seção aparece na visualização. Clique nela para selecioná-la e configure sua cor de fundo, preenchimento e outras opções de estilo.

### Adicionando Elementos a uma Seção

1. Clique dentro de uma seção na visualização para selecioná-la.
2. Clique em **Adicionar Conteúdo** e escolha um tipo de elemento na lista:
   - **Texto** -- Cabeçalhos, parágrafos e texto rico
   - **Imagem** -- Carregue ou link para uma foto
   - **Botão** -- Um link de chamada para ação clicável
   - **Cartão** -- Uma imagem com um título e descrição
   - **Formulário** -- Incorpore um [formulário](../forms/creating-forms) diretamente na página
   - **Calendário** -- Exiba um calendário de eventos
   - **FAQ** -- Blocos de perguntas e respostas em estilo acordeão
   - **Vídeo** -- Incorpore um vídeo por URL
   - **Navegador de Grupos** -- Um diretório filtrável de todos os grupos da igreja com pesquisa opcional, filtro de categoria e filtro de rótulo
3. Configure o elemento usando o painel de configurações que aparece.

### Reorganizando Conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reorganizá-los. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando Sua Página

### Estilos de Seção

Clique em qualquer seção para abrir seu painel de estilo. Você pode definir:

- **Fundo** -- Cor sólida, gradiente ou imagem
- **Preenchimento** -- Espaçamento superior e inferior dentro da seção
- **Largura** -- Largura completa ou centrada/contida

### Estilos de Elemento

Clique em qualquer elemento para abrir seu painel de estilo. As opções comuns incluem tamanho de fonte, cor, alinhamento, margem e preenchimento. Para imagens, você pode definir texto alternativo e destinos de link.

### CSS Personalizado

Para estilização avançada, cada seção e elemento tem um campo **CSS Personalizado** onde você pode escrever suas próprias regras CSS. Eles são escopo para esse elemento, então não afetarão acidentalmente o resto da página.

:::tip
Se você precisa aplicar estilos em todo o seu site -- como uma fonte personalizada ou cor global -- use as configurações [Aparência](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando Sua Página

Use os controles de visualização na barra de ferramentas para verificar como sua página fica em diferentes tamanhos de tela:

- **Desktop** -- Visualização de navegador em largura total
- **Móvel** -- Visualização de tamanho de telefone

Clique em **Visualizar** para abrir uma versão ao vivo da página em uma nova aba do navegador, exatamente como os visitantes verão.

## Desfazendo Alterações

O editor rastreia seu histórico de edição automaticamente. Use os botões da barra de ferramentas ou atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) -- Revert sua última ação
- **Refazer** (Ctrl+Y / Cmd+Y) -- Re-aplicar uma ação desfeita

Você também pode restaurar a página para um snapshot anterior. Clique em **Histórico** na barra de ferramentas para ver uma lista de snapshots salvos com descrições e clique em qualquer entrada para restaurar para esse ponto.

:::warning
Restaurar um snapshot substitui o conteúdo de sua página atual pela versão do snapshot. Isso não pode ser desfeito com o botão de desfazer padrão. Salve um snapshot do seu estado atual antes de restaurar um antigo se quiser manter a opção de retornar.
:::

## Salvando Seu Trabalho

As alterações são salvas automaticamente enquanto você trabalha. Um indicador de status na barra de ferramentas mostra se suas alterações foram salvas. Você também pode clicar em **Salvar** a qualquer momento para forçar um salvamento.

## Artigos Relacionados

- [Gerenciando Páginas](managing-pages) -- Crie páginas, defina URLs e gerencie navegação do site
- [Aparência](appearance) -- Defina cores, fontes e marca em todo o site
- [Arquivos](files) -- Carregue imagens e documentos para usar no editor
- [Criando Formulários](../forms/creating-forms) -- Crie formulários que você pode incorporar em páginas
