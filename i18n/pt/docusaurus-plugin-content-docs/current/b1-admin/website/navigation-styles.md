---
title: "Estilos de Navegação"
---

# Estilos de Navegação

<div class="article-intro">

Personalize as cores da barra de navegação de seu site de igreja para combinar com sua marca. Você pode configurar cores para fundos sólidos e sobreposições transparentes, dando-lhe controle total sobre como sua navegação aparece em diferentes páginas.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar seu site de igreja. Consulte [Papéis e Permissões](../people/roles-permissions.md) para detalhes.
- Tenha suas cores de marca prontas, incluindo códigos de cores hexadecimais (por exemplo, #03A9F4).
- Compreenda a diferença entre estilos de navegação sólido e transparente em seu site.

</div>

## Compreendendo Modos de Navegação

Sua navegação de site pode aparecer em dois estilos diferentes dependendo da página:

- **Navegação sólida** -- Barra de navegação com cor de fundo, normalmente usada em páginas de conteúdo
- **Navegação transparente** -- Navegação que sobrepõe o conteúdo da página, normalmente usada em páginas com imagens herói ou fundos de tela inteira

Você pode personalizar cores para ambos os modos independentemente.

## Acessando Estilos de Navegação

1. Navegue até **Website** na B1 Admin
2. Clique em **Aparência** na barra lateral
3. Role até a seção **Estilos de Navegação**
4. Clique em **Editar Estilos de Navegação**

## Configurando Navegação Sólida

A navegação sólida aparece com uma cor de fundo atrás da barra de navegação. Você pode personalizar:

### Cor de Fundo

1. Alterne o interruptor **Override** para **Cor de Fundo**
2. Clique no seletor de cor
3. Escolha sua cor de fundo desejada
4. O padrão é branco (#FFFFFF)

### Cor do Link

1. Alterne o interruptor **Override** para **Cor do Link**
2. Escolha a cor do texto do link de navegação
3. Isso afeta links em seu estado padrão
4. O padrão é cinza escuro (#555555)

### Cor de Hover do Link

1. Alterne o interruptor **Override** para **Cor de Hover do Link**
2. Escolha a cor para a qual os links mudam quando os usuários passam o mouse sobre eles
3. Isso fornece feedback visual para links clicáveis
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Alterne o interruptor **Override** para **Cor Ativa**
2. Escolha a cor para o link da página atualmente ativa
3. Isso ajuda os usuários a saber em qual página estão
4. O padrão é azul claro (#03A9F4)

## Configurando Navegação Transparente

A navegação transparente sobrepõe o conteúdo da página sem fundo. Você pode personalizar:

### Cor do Link

1. Alterne o interruptor **Override** para **Cor do Link**
2. Escolha uma cor que contraste bem com o fundo da página
3. Frequentemente cores brancas ou claras funcionam bem em fundos escuros
4. O padrão é cinza escuro (#555555)

### Cor de Hover do Link

1. Alterne o interruptor **Override** para **Cor de Hover do Link**
2. Escolha a cor do estado de hover
3. Certifique-se de que é visível em relação ao fundo da página
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Alterne o interruptor **Override** para **Cor Ativa**
2. Escolha a cor do indicador de página ativa
3. Deve se destacar enquanto ainda se encaixa em seu design
4. O padrão é azul claro (#03A9F4)

:::info
A navegação transparente não tem uma configuração de cor de fundo, pois sobrepõe o conteúdo da página diretamente.
:::

## Salvando Suas Alterações

1. Depois de configurar suas cores, clique em **Salvar Estilos de Navegação**
2. Suas alterações se aplicam imediatamente ao seu site ao vivo
3. Visite seu site para ver a navegação em ambos os modos

## Redefinindo para Padrões

Se você deseja voltar às cores padrão:

1. Alterne os interruptores **Override** para qualquer cor personalizada
2. Clique em **Salvar Estilos de Navegação**
3. A navegação volta ao esquema de cores padrão

Ou clique em **Cancelar** para descartar todas as alterações sem salvar.

## Melhores Práticas

### Contraste de Cor

- **Legibilidade** -- Certifique-se de que as cores do link têm contraste suficiente com o fundo
- **Conformidade WCAG** -- Busque uma taxa de contraste de pelo menos 4.5:1 para acessibilidade
- **Teste ambos os modos** -- Visualize seu site com navegação sólida e transparente

### Consistência de Marca

- **Use suas cores de marca** -- Combine seu logotipo e tema do site
- **Limite sua paleta** -- Fique com 2-3 cores para uma aparência coerente
- **Considere suas imagens** -- Se usar navegação transparente, teste-a contra fundos de página típicos

### Hover e Estados Ativos

- **Feedback claro** -- Faça estados de hover obviamente diferentes dos links padrão
- **Distinguir páginas ativas** -- Use uma cor distinta para que os usuários saibam onde estão
- **Transições suaves** -- O sistema anima automaticamente as mudanças de cor

## Solução de Problemas

### Cores Não Parecem Corretas

- **Limpe seu cache** -- O cache do navegador pode mostrar cores antigas
- **Verifique códigos hexadecimais** -- Certifique-se de que inseriu códigos de cor hexadecimais válidos
- **Teste em diferentes fundos** -- As cores podem parecer diferentes dependendo da página

### Navegação Não Visível

- **Modo transparente** -- Se usar navegação transparente em imagens claras, texto escuro pode ser difícil de ver
- **Solução** -- Ajuste suas cores de link ou use fundos de página mais escuros
- **Alternativa** -- Adicione uma sombra sutil ou sobreposição de fundo à área de navegação

## Detalhes Técnicos

Os estilos de navegação são armazenados como JSON e aplicados usando variáveis CSS:

- As alterações entram em vigor imediatamente sem reconstruir o site
- As cores cascateiam para todos os elementos de navegação
- Os overrides são opcionais; cores não definidas usam padrões de tema

## Artigos Relacionados

- [Aparência](./appearance.md) -- Personalize a aparência geral do seu site
- [Gerenciando Páginas](./managing-pages.md) -- Crie e organize suas páginas de site
- [Editor de Página](./page-editor.md) -- Projete layouts de página e conteúdo
