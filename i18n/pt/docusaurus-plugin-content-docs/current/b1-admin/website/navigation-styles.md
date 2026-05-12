---
title: "Estilos de Navegação"
---

# Estilos de Navegação

<div class="article-intro">

Personalize as cores da barra de navegação do site da sua igreja para combinar com sua marca. Você pode configurar cores tanto para fundos sólidos quanto para sobreposições transparentes, dando-lhe controle completo sobre como sua navegação aparece em diferentes páginas.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar o site da sua igreja. Consulte [Funções e Permissões](../people/roles-permissions.md) para detalhes.
- Tenha suas cores de marca prontas, incluindo códigos de cores hexadecimais (por exemplo, #03A9F4).
- Compreenda a diferença entre estilos de navegação sólidos e transparentes no seu site.

</div>

## Entendendo os Modos de Navegação

A navegação do seu site pode aparecer em dois estilos diferentes dependendo da página:

- **Navegação sólida** -- Barra de navegação com uma cor de fundo, normalmente usada em páginas de conteúdo
- **Navegação transparente** -- Navegação que se sobrepõe ao conteúdo da página, normalmente usada em páginas com imagens hero ou fundos de tela cheia

Você pode personalizar as cores para ambos os modos independentemente.

## Acessando os Estilos de Navegação

1. Navegue até **Site** no B1 Admin
2. Clique em **Aparência** na barra lateral
3. Role até a seção **Estilos de Navegação**
4. Clique em **Editar Estilos de Navegação**

## Configurando a Navegação Sólida

A navegação sólida aparece com uma cor de fundo atrás da barra de navegação. Você pode personalizar:

### Cor de Fundo

1. Alterne o botão **Substituir** para **Cor de Fundo**
2. Clique no seletor de cores
3. Escolha sua cor de fundo desejada
4. O padrão é branco (#FFFFFF)

### Cor do Link

1. Alterne o botão **Substituir** para **Cor do Link**
2. Escolha a cor para o texto do link de navegação
3. Isso afeta os links em seu estado padrão
4. O padrão é cinza escuro (#555555)

### Cor do Link ao Passar o Mouse

1. Alterne o botão **Substituir** para **Cor do Link ao Passar o Mouse**
2. Escolha a cor para a qual os links mudam quando os usuários passam o mouse sobre eles
3. Isso fornece feedback visual para links clicáveis
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Alterne o botão **Substituir** para **Cor Ativa**
2. Escolha a cor para o link da página atualmente ativa
3. Isso ajuda os usuários a saberem em qual página estão
4. O padrão é azul claro (#03A9F4)

## Configurando a Navegação Transparente

A navegação transparente se sobrepõe ao conteúdo da sua página sem fundo. Você pode personalizar:

### Cor do Link

1. Alterne o botão **Substituir** para **Cor do Link**
2. Escolha uma cor que contraste bem com o fundo da sua página
3. Frequentemente, cores brancas ou claras funcionam melhor sobre fundos escuros
4. O padrão é cinza escuro (#555555)

### Cor do Link ao Passar o Mouse

1. Alterne o botão **Substituir** para **Cor do Link ao Passar o Mouse**
2. Escolha a cor do estado de passar o mouse
3. Certifique-se de que seja visível contra o fundo da sua página
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Alterne o botão **Substituir** para **Cor Ativa**
2. Escolha a cor do indicador de página ativa
3. Deve se destacar enquanto ainda se encaixa no seu design
4. O padrão é azul claro (#03A9F4)

:::info
A navegação transparente não tem uma configuração de cor de fundo, pois se sobrepõe diretamente ao conteúdo da página.
:::

## Salvando Suas Alterações

1. Depois de configurar suas cores, clique em **Salvar Estilos de Navegação**
2. Suas alterações se aplicam imediatamente ao seu site ao vivo
3. Visite seu site para ver a navegação em ambos os modos

## Redefinindo para os Padrões

Se você quiser voltar às cores padrão:

1. Desligue os botões **Substituir** para quaisquer cores personalizadas
2. Clique em **Salvar Estilos de Navegação**
3. A navegação retorna ao esquema de cores padrão

Ou clique em **Cancelar** para descartar todas as alterações sem salvar.

## Melhores Práticas

### Contraste de Cores

- **Legibilidade** -- Certifique-se de que as cores dos links tenham contraste suficiente com o fundo
- **Conformidade com WCAG** -- Busque pelo menos uma relação de contraste de 4,5:1 para acessibilidade
- **Teste ambos os modos** -- Visualize seu site com navegação sólida e transparente

### Consistência da Marca

- **Use suas cores de marca** -- Combine com seu logotipo e tema do site
- **Limite sua paleta** -- Mantenha-se em 2-3 cores para uma aparência coesa
- **Considere suas imagens** -- Se usar navegação transparente, teste contra fundos de página típicos

### Estados de Passar o Mouse e Ativo

- **Feedback claro** -- Faça os estados de passar o mouse obviamente diferentes dos links padrão
- **Distinga páginas ativas** -- Use uma cor distinta para que os usuários saibam onde estão
- **Transições suaves** -- O sistema anima automaticamente as mudanças de cor

## Solução de Problemas

### As Cores Não Parecem Certas

- **Limpe seu cache** -- O cache do navegador pode mostrar cores antigas
- **Verifique os códigos hexadecimais** -- Certifique-se de ter inserido códigos de cores hexadecimais válidos
- **Teste em diferentes fundos** -- As cores podem parecer diferentes dependendo da página

### Navegação Não Visível

- **Modo transparente** -- Se usar navegação transparente sobre imagens claras, o texto escuro pode ser difícil de ver
- **Solução** -- Ajuste suas cores de link ou use fundos de página mais escuros
- **Alternativa** -- Adicione uma sombra sutil ou sobreposição de fundo à área de navegação

## Detalhes Técnicos

Os estilos de navegação são armazenados como JSON e aplicados usando variáveis CSS:

- As alterações têm efeito imediato sem reconstruir o site
- As cores cascateiam para todos os elementos de navegação
- As substituições são opcionais; cores não definidas usam os padrões do tema

## Artigos Relacionados

- [Aparência](./appearance.md) -- Personalize a aparência geral do seu site
- [Gerenciando Páginas](./managing-pages.md) -- Crie e organize as páginas do seu site
- [Editor de Páginas](./page-editor.md) -- Projete layouts e conteúdo de páginas
