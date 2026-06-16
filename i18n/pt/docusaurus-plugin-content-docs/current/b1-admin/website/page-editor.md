---
title: "Usando o Editor de Página"
---

# Usando o Editor de Página

<div class="article-intro">

O editor de página B1 é um construtor visual de arrastar e soltar que permite projetar páginas do seu site da igreja sem escrever nenhum código. Você pode adicionar seções e blocos de conteúdo, personalizar estilos, visualizar seu trabalho e desfazer alterações — tudo de dentro do seu navegador.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete [Configuração Inicial](initial-setup) para obter seu site configurado
- Crie pelo menos uma página em [Gerenciando Páginas](managing-pages)
- Você precisa da permissão **content.edit** para acessar o editor

</div>

## Abrindo o Editor

1. Em B1 Admin, clique em **Site** no menu esquerdo.
2. Encontre a página que você deseja editar na tabela de Páginas e clique em **Editar**.

O editor abre em modo de tela inteira. O painel esquerdo mostra a estrutura da página e os elementos de conteúdo disponíveis; a área central mostra uma visualização ao vivo da página.

:::info
O editor sempre é exibido em modo claro, independentemente da configuração de tema do B1 Admin. Isso garante que a visualização corresponda com precisão a como sua página será vista pelos visitantes do site.
:::

## Estrutura da Página: Seções e Elementos

Cada página é construída a partir de dois níveis:

- **Seções** — Os contêineres de nível superior que dividem sua página em bandas horizontais (por exemplo, uma seção de herói, um bloco de conteúdo ou uma tira de rodapé). Cada página deve ter pelo menos uma seção antes de poder adicionar conteúdo.
- **Elementos** — As peças de conteúdo individual colocadas dentro de uma seção, como texto, imagens, botões, cartões, formulários e calendários.

### Adicionando uma Seção

1. Clique em **Adicionar Seção** (ou o botão **+** no topo do painel esquerdo).
2. Escolha como começar:
   - **De um modelo** — navegue pela galeria de modelos de seção organizada por categoria (Herói, Sobre, Serviços, Doações, etc.) e clique em um para inseri-lo como uma seção totalmente estilizada e pré-preenchida. Você pode personalizar tudo depois que for adicionada.
   - **Seção em branco** — escolha um layout de coluna (única, duas colunas, três colunas, etc.) e construa do zero.
3. A nova seção aparece na visualização. Clique nela para selecioná-la e configurar sua cor de fundo, preenchimento e outras opções de estilo.

### Adicionando Elementos a uma Seção

1. Clique dentro de uma seção na visualização para selecioná-la.
2. Clique em **Adicionar Conteúdo** e escolha um tipo de elemento da lista:
   - **Texto** — Títulos, parágrafos e texto rico
   - **Imagem** — Carregue ou vincule a uma foto
   - **Botão** — Um link de chamada para ação clicável
   - **Cartão** — Uma imagem com um título e descrição
   - **Formulário** — Incorpore um [formulário](../forms/creating-forms) diretamente na página
   - **Calendário** — Exiba um calendário de eventos
   - **Perguntas Frequentes** — Blocos de perguntas e respostas no estilo acordeão
   - **Vídeo** — Incorpore um vídeo por URL
   - **Navegador de Grupos** — Um diretório filtrável de todos os grupos da igreja com pesquisa opcional, filtro de categoria e filtro de rótulo
3. Configure o elemento usando o painel de configurações que aparece.

### Reordenando Conteúdo

Arraste seções ou elementos usando o ícone de alça (seis pontos) no lado esquerdo de cada item para reordenar. Você pode arrastar elementos dentro de uma seção ou movê-los entre seções.

## Estilizando Sua Página

### Estilos de Seção

Clique em qualquer seção para abrir seu painel de estilo. Você pode definir:

- **Fundo** — Cor sólida, gradiente ou imagem
- **Preenchimento** — Espaçamento superior e inferior dentro da seção
- **Largura** — Largura total ou centrado/contido

### Estilos de Elemento

Clique em qualquer elemento para abrir seu painel de estilo. As opções comuns incluem tamanho de fonte, cor, alinhamento, margem e preenchimento. Para imagens, você pode definir texto alternativo e destinos de link.

### CSS Personalizado

Para estilo avançado, cada seção e elemento tem um campo **CSS Personalizado** onde você pode escrever suas próprias regras CSS. Esses são limitados a esse elemento, portanto não afetarão inadvertidamente o resto da página.

:::tip
Se você precisar aplicar estilos em todo o seu site — como uma fonte personalizada ou cor global — use as configurações de [Aparência](appearance) em vez de CSS personalizado em páginas individuais.
:::

## Visualizando Sua Página

Use os controles de visualização na barra de ferramentas para verificar como sua página fica em diferentes tamanhos de tela:

- **Desktop** — Visualização do navegador de largura total
- **Mobile** — Visualização de tamanho de telefone estreito

Clique em **Visualizar** para abrir uma versão ao vivo da página em uma nova aba do navegador, exatamente como os visitantes verão.

## Desfazendo Alterações

O editor rastreia seu histórico de edição automaticamente. Use os botões da barra de ferramentas ou atalhos de teclado para navegar:

- **Desfazer** (Ctrl+Z / Cmd+Z) — Reverter sua última ação
- **Refazer** (Ctrl+Y / Cmd+Y) — Reaplicar uma ação desfeita

Você também pode restaurar a página para um snapshot anterior. Clique em **Histórico** na barra de ferramentas para ver uma lista de snapshots salvos com descrições e clique em qualquer entrada para restaurar até esse ponto.

:::warning
Restaurar um snapshot substitui o conteúdo da página atual pela versão do snapshot. Isso não pode ser desfeito com o botão desfazer padrão. Salve um snapshot do seu estado atual antes de restaurar um antigo se quiser manter a opção de retornar.
:::

## Salvando e Publicando

As alterações são salvas automaticamente enquanto você trabalha. Um indicador de status na barra de ferramentas mostra se suas alterações foram salvas.

### Estado de rascunho e publicado

As páginas podem ter um estado **publicado**, que controla quando os visitantes veem suas alterações. A barra de ferramentas exibe um chip de status mostrando o estado atual:

- **Ao Vivo no Salvamento** — A página não usa um fluxo de trabalho de publicação. Cada mudança salva entra em funcionamento imediatamente. Este é o padrão para novas páginas.
- **Alterações Não Publicadas** — A página foi publicada antes, mas você fez alterações desde a última publicação. Os visitantes ainda veem a versão publicada anteriormente.
- **Publicada** — A página está em funcionamento e seu conteúdo salvo corresponde ao que os visitantes veem.

Para publicar suas alterações, clique no botão **Publicar** na barra de ferramentas. A página fica em funcionamento imediatamente.

Para reverter para a última versão publicada sem afetar o que os visitantes veem, abra o menu de estouro (⋮) e clique em **Descartar Alterações**.

Para tirar uma página offline completamente, abra o menu de estouro e clique em **Cancelar Publicação**. Os visitantes não verão mais essa página até você publicá-la novamente.

:::tip
Use o fluxo de trabalho de rascunho/publicação quando quiser preparar uma página — por exemplo, para um evento próximo — e apenas colocá-la em funcionamento no momento certo. Construa e visualize a página e depois clique em Publicar quando estiver pronto.
:::

## Artigos Relacionados

- [Gerenciando Páginas](managing-pages) — Crie páginas, defina URLs e gerencie a navegação do site
- [Aparência](appearance) — Defina cores, fontes e marca do site em todo o site
- [Arquivos](files) — Carregue imagens e documentos para usar no editor
- [Criando Formulários](../forms/creating-forms) — Construa formulários que você pode incorporar nas páginas
