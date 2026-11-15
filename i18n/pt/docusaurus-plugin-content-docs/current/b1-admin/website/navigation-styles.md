---
title: "Estilos de navegação"
description: "Personalize as cores das barras de navegação sólidas e transparentes do site no B1 Admin, incluindo os estados de link, hover e ativo do site da sua igreja."
---

# Estilos de navegação

<div class="article-intro">

Personalize as cores da barra de navegação do site da sua igreja para combinar com a sua identidade visual. Você pode configurar cores tanto para fundos sólidos quanto para sobreposições transparentes, tendo controle total sobre a aparência da navegação nas diferentes páginas.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de permissão para editar o conteúdo do site. Veja [Funções e permissões](../settings/roles-permissions.md) para detalhes.
- Tenha as cores da sua marca prontas, incluindo os códigos hexadecimais (por exemplo, #03A9F4).
- Entenda a diferença entre os estilos de navegação sólido e transparente do seu site.

</div>

## Entendendo os modos de navegação {#understanding-navigation-modes}

A navegação do seu site pode aparecer em dois estilos diferentes, dependendo da página:

- **Navegação sólida** -- Barra de navegação com cor de fundo, normalmente usada em páginas de conteúdo
- **Navegação transparente** -- Navegação sobreposta ao conteúdo da página, normalmente usada em páginas com imagens de destaque ou fundos de tela cheia

Você pode personalizar as cores dos dois modos de forma independente.

## Acessando os estilos de navegação {#accessing-navigation-styles}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Site**
2. Clique em **Aparência**
3. Na lista **Configurações de estilo**, clique em **Navegação**

O editor **Estilos da navegação** tem dois cartões: **Cabeçalho (sólido)** e **Cabeçalho sobre o destaque (transparente)**.

## Configurando a navegação sólida {#configuring-solid-navigation}

A navegação sólida aparece com uma cor de fundo atrás da barra de navegação. Essas configurações ficam no cartão **Cabeçalho (sólido)**. Cada cor é opcional: enquanto o seu botão **Substituir** estiver desligado, a navegação mantém as cores normais do seu site. Você pode personalizar:

### Cor de fundo {#background-color}

1. Ative a chave **Substituir** de **Cor de fundo**
2. Clique no seletor de cores
3. Escolha a cor de fundo desejada (o seletor começa em branco, #FFFFFF)

### Cor dos links {#link-color}

1. Ative a chave **Substituir** de **Cor dos links**
2. Escolha a cor do texto dos links da navegação
3. Isso afeta os links no estado padrão (o seletor começa em cinza escuro, #555555)

### Cor dos links ao passar o mouse {#link-hover-color}

1. Ative a chave **Substituir** de **Cor dos links ao passar o mouse**
2. Escolha a cor para a qual os links mudam quando o usuário passa o mouse sobre eles
3. Isso oferece um retorno visual para os links clicáveis (o seletor começa em azul claro, #03A9F4)

### Cor ativa {#active-color}

1. Ative a chave **Substituir** de **Cor do link ativo**
2. Escolha a cor do link da página atual
3. Isso ajuda o usuário a saber em qual página está (o seletor começa em azul claro, #03A9F4)

## Configurando a navegação transparente {#configuring-transparent-navigation}

A navegação transparente fica sobreposta ao conteúdo da página, sem fundo. Essas configurações ficam no cartão **Cabeçalho sobre o destaque (transparente)**. Enquanto uma chave **Substituir** estiver desligada, aquela cor acompanha automaticamente a cor do texto da seção de destaque. Você pode personalizar:

### Cor dos links {#link-color-1}

1. Ative a chave **Substituir** de **Cor dos links**
2. Escolha uma cor que contraste bem com o fundo da página
3. Cores brancas ou claras costumam funcionar melhor sobre fundos escuros

### Cor dos links ao passar o mouse {#link-hover-color-1}

1. Ative a chave **Substituir** de **Cor dos links ao passar o mouse**
2. Escolha a cor do estado de hover
3. Certifique-se de que ela esteja visível sobre o fundo da página

### Cor ativa {#active-color-1}

1. Ative a chave **Substituir** de **Cor do link ativo**
2. Escolha a cor do indicador da página ativa
3. Deve se destacar, mas ainda se encaixar no seu design

:::info
A navegação transparente não tem configuração de cor de fundo, pois fica sobreposta diretamente ao conteúdo da página.
:::

## Salvando as alterações {#saving-your-changes}

1. Depois de configurar as cores, clique em **Salvar navegação**
2. As alterações se aplicam imediatamente ao seu site no ar
3. Visite o seu site para ver a navegação nos dois modos

## Restaurando os padrões {#resetting-to-defaults}

Se quiser voltar às cores padrão:

1. Desligue as chaves **Substituir** de qualquer cor personalizada
2. Clique em **Salvar navegação**
3. A navegação volta às cores normais do seu site (e, sobre a seção de destaque, à cor do texto dessa seção)

Ou clique em **Cancelar** para descartar todas as alterações sem salvar.

## Boas práticas {#best-practices}

### Contraste de cores {#color-contrast}

- **Legibilidade** -- Garanta que as cores dos links tenham contraste suficiente com o fundo
- **Conformidade com WCAG** -- Procure uma proporção de contraste de pelo menos 4,5:1 para acessibilidade
- **Teste os dois modos** -- Visualize o seu site com a navegação sólida e a transparente

### Consistência da marca {#brand-consistency}

- **Use as cores da sua marca** -- Combine com o seu logo e o tema do site
- **Limite a sua paleta** -- Use de 2 a 3 cores para um visual coeso
- **Considere as suas imagens** -- Se usar navegação transparente, teste-a sobre fundos de página típicos

### Estados de hover e ativo {#hover-and-active-states}

- **Retorno claro** -- Faça os estados de hover claramente diferentes dos links padrão
- **Destaque as páginas ativas** -- Use uma cor distinta para que o usuário saiba onde está
- **Transições suaves** -- O sistema anima automaticamente as mudanças de cor

## Solução de problemas {#troubleshooting}

### As cores não parecem corretas {#colors-dont-look-right}

- **Limpe o cache** -- O cache do navegador pode mostrar cores antigas
- **Confira os códigos hexadecimais** -- Certifique-se de ter digitado códigos de cor hexadecimais válidos
- **Teste em fundos diferentes** -- As cores podem parecer diferentes dependendo da página

### A navegação não está visível {#navigation-not-visible}

- **Modo transparente** -- Se a navegação transparente estiver sobre imagens claras, texto escuro pode ser difícil de ver
- **Solução** -- Ajuste as cores dos links ou use fundos de página mais escuros
- **Alternativa** -- Adicione uma sombra sutil ou uma sobreposição de fundo na área de navegação

## Detalhes técnicos {#technical-details}

Os estilos de navegação são armazenados como JSON e aplicados por meio de variáveis CSS:

- As alterações têm efeito imediato, sem necessidade de recompilar o site
- As cores se propagam para todos os elementos da navegação
- As substituições são opcionais; cores não definidas usam os padrões do tema

## Artigos relacionados {#related-articles}

- [Aparência](./appearance.md) -- Personalize o visual geral do seu site
- [Gerenciando páginas](./managing-pages.md) -- Crie e organize as páginas do seu site
- [Editor de páginas](./page-editor.md) -- Desenhe os layouts e o conteúdo das páginas
