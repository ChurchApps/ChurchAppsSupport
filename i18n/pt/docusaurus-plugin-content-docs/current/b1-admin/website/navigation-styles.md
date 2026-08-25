---
title: "Estilos de Navegação"
---

# Estilos de Navegação

<div class="article-intro">

Customize cores da barra de navegação de seu site de igreja para corresponder sua marca. Você pode configurar cores tanto para fundos sólidos quanto para overlays transparentes dando-lhe controle completo sobre como sua navegação aparece em páginas diferentes.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar seu website de igreja. Consulte [Funções e Permissões](../people/roles-permissions.md) para detalhes.
- Tenha suas cores de marca prontas, incluindo códigos de cor hex (por exemplo, #03A9F4).
- Entenda a diferença entre estilos de navegação sólida e transparente em seu website.

</div>

## Entendendo Modos de Navegação

A navegação de seu website pode aparecer em dois estilos diferentes dependendo da página:

- **Solid navigation** -- Barra de navegação com cor de fundo, tipicamente usada em páginas de conteúdo
- **Transparent navigation** -- Navegação que sobrepõe o conteúdo da página, tipicamente usada em páginas com imagens hero ou fundos de tela cheia

Você pode customizar cores para ambos modos independentemente.

## Acessando Estilos de Navegação

1. Navegue para **Website** em B1 Admin
2. Clique na guia **Aparência** no topo da visualização Website Pages
3. Role até a seção **Navigation Styles**
4. Clique em **Edit Navigation Styles**

## Configurando Navegação Sólida

Navegação sólida aparece com uma cor de fundo atrás da barra de navegação. Você pode customizar:

### Cor de Fundo

1. Alterne o switch **Override** para **Background Color**
2. Clique no seletor de cor
3. Escolha sua cor de fundo desejada
4. O padrão é branco (#FFFFFF)

### Cor de Link

1. Alterne o switch **Override** para **Link Color**
2. Escolha a cor para texto de link de navegação
3. Isto afeta links em seu estado padrão
4. O padrão é cinza escuro (#555555)

### Cor de Hover de Link

1. Alterne o switch **Override** para **Link Hover Color**
2. Escolha a cor que links mudam para quando usuários passam o mouse sobre eles
3. Isto fornece feedback visual para links clicáveis
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Alterne o switch **Override** para **Active Color**
2. Escolha a cor para o link de página atualmente ativa
3. Isto ajuda usuários a saber qual página estão em
4. O padrão é azul claro (#03A9F4)

## Configurando Navegação Transparente

Navegação transparente sobrepõe o conteúdo da página com nenhum fundo. Você pode customizar:

### Cor de Link

1. Alterne o switch **Override** para **Link Color**
2. Escolha uma cor que contrasta bem com o fundo de sua página
3. Frequentemente cores brancas ou claras funcionam melhor sobre fundos escuros
4. O padrão é cinza escuro (#555555)

### Cor de Hover de Link

1. Alterne o switch **Override** para **Link Hover Color**
2. Escolha a cor de estado de hover
3. Garanta que está visível contra o fundo de sua página
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Alterne o switch **Override** para **Active Color**
2. Escolha a cor indicadora de página ativa
3. Deve se destacar enquanto ainda se adapta ao seu design
4. O padrão é azul claro (#03A9F4)

:::info
Navegação transparente não tem uma configuração de cor de fundo já que sobrepõe o conteúdo da página diretamente.
:::

## Salvando Suas Alterações

1. Depois de configurar suas cores, clique em **Save Navigation Styles**
2. Suas alterações se aplicam imediatamente ao seu website ao vivo
3. Visite seu website para ver a navegação em ambos modos

## Resetando para Padrões

Se você quer voltar para as cores padrão:

1. Alterne os switches **Override** para quaisquer cores personalizadas
2. Clique em **Save Navigation Styles**
3. A navegação retorna ao esquema de cor padrão

Ou clique em **Cancel** para descartar todas alterações sem salvar.

## Melhores Práticas

### Contraste de Cor

- **Readability** -- Garanta que cores de link tenham contraste suficiente com o fundo
- **WCAG compliance** -- Apunte por pelo menos proporção de contraste 4.5:1 para acessibilidade
- **Test both modes** -- Visualize seu site com ambas navegação sólida e transparente

### Consistência de Marca

- **Use suas cores de marca** -- Combine seu logo e tema de website
- **Limite sua paleta** -- Fique em 2-3 cores para uma aparência coesa
- **Considere suas imagens** -- Se usar navegação transparente, teste contra fundos de página típicos

### Estados de Hover e Ativo

- **Clear feedback** -- Faça estados de hover obviamente diferentes de links padrão
- **Distinguish active pages** -- Use uma cor distinta para que usuários saibam onde estão
- **Smooth transitions** -- O sistema automaticamente anima mudanças de cor

## Solução de Problemas

### Cores Não Parecem Certas

- **Clear your cache** -- Cache do navegador pode mostrar cores antigas
- **Check hex codes** -- Certifique-se de que digitou códigos hex de cor válidos
- **Test on different backgrounds** -- Cores podem parecer diferentes dependendo da página

### Navegação Não Visível

- **Transparent mode** -- Se usar navegação transparente sobre imagens claras, texto escuro pode ser difícil de ver
- **Solution** -- Ajuste suas cores de link ou use fundos de página mais escuros
- **Alternative** -- Adicione uma sombra sutil ou overlay de fundo à área de navegação

## Detalhes Técnicos

Estilos de navegação são armazenados como JSON e aplicados usando variáveis CSS:

- Alterações têm efeito imediatamente sem reconstruir o site
- Cores cascata para todos elementos de navegação
- Overrides são opcionais; cores não definidas usam padrões de tema

## Artigos Relacionados

- [Aparência](./appearance.md) -- Customize a aparência geral e sensação do seu website
- [Gerenciando Páginas](./managing-pages.md) -- Crie e organize suas páginas de website
- [Page Editor](./page-editor.md) -- Projete layouts de página e conteúdo
