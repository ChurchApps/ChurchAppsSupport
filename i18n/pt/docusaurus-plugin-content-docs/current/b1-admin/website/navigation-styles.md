---
title: "Estilos de Navegação"
---

# Estilos de Navegação

<div class="article-intro">

Personalize as cores da barra de navegação do seu site da igreja para corresponder à sua marca. Você pode configurar cores para fundos sólidos e sobreposições transparentes, dando-lhe controle completo sobre como sua navegação se parece em diferentes páginas.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar seu site de igreja. Consulte [Roles & Permissions](../people/roles-permissions.md) para detalhes.
- Tenha suas cores de marca prontas, incluindo códigos de cor hexadecimais (por exemplo, #03A9F4).
- Entenda a diferença entre estilos de navegação sólida e transparente no seu site.

</div>

## Compreendendo Modos de Navegação

A navegação do seu site pode aparecer em dois estilos diferentes dependendo da página:

- **Solid navigation** -- Barra de navegação com cor de fundo, normalmente usada em páginas de conteúdo
- **Transparent navigation** -- Navegação que sobrepõe o conteúdo da página, normalmente usada em páginas com imagens de herói ou fundos em tela inteira

Você pode personalizar cores para ambos os modos independentemente.

## Acessando Estilos de Navegação

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Website**
2. Clique em **Appearance**
3. Role para a seção **Navigation Styles**
4. Clique em **Edit Navigation Styles**

## Configurando Navegação Sólida

A navegação sólida aparece com uma cor de fundo atrás da barra de navegação. Você pode personalizar:

### Cor de Fundo

1. Ative o switch **Override** para **Background Color**
2. Clique no seletor de cores
3. Escolha sua cor de fundo desejada
4. O padrão é branco (#FFFFFF)

### Cor de Link

1. Ative o switch **Override** para **Link Color**
2. Escolha a cor para o texto do link de navegação
3. Isso afeta links em seu estado padrão
4. O padrão é cinza escuro (#555555)

### Cor de Hover de Link

1. Ative o switch **Override** para **Link Hover Color**
2. Escolha a cor para a qual links mudam quando usuários passam o mouse sobre eles
3. Isso fornece feedback visual para links clicáveis
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Ative o switch **Override** para **Active Color**
2. Escolha a cor para o link da página ativa atual
3. Isso ajuda usuários a saber em qual página estão
4. O padrão é azul claro (#03A9F4)

## Configurando Navegação Transparente

A navegação transparente sobrepõe seu conteúdo de página sem fundo. Você pode personalizar:

### Cor de Link

1. Ative o switch **Override** para **Link Color**
2. Escolha uma cor que contraste bem com seu fundo de página
3. Muitas vezes cores brancas ou claras funcionam bem sobre fundos escuros
4. O padrão é cinza escuro (#555555)

### Cor de Hover de Link

1. Ative o switch **Override** para **Link Hover Color**
2. Escolha a cor do estado hover
3. Certifique-se de que é visível contra seu fundo de página
4. O padrão é azul claro (#03A9F4)

### Cor Ativa

1. Ative o switch **Override** para **Active Color**
2. Escolha a cor do indicador de página ativa
3. Deve se destacar enquanto ainda se encaixa seu design
4. O padrão é azul claro (#03A9F4)

:::info
A navegação transparente não tem uma configuração de cor de fundo já que sobrepõe o conteúdo da página diretamente.
:::

## Salvando Suas Mudanças

1. Após configurar suas cores, clique em **Save Navigation Styles**
2. Suas mudanças se aplicam imediatamente ao seu site ao vivo
3. Visite seu site para ver a navegação em ambos os modos

## Redefinindo para Padrões

Se quiser voltar às cores padrão:

1. Desative os switches **Override** para quaisquer cores personalizadas
2. Clique em **Save Navigation Styles**
3. A navegação retorna ao esquema de cor padrão

Ou clique em **Cancel** para descartar todas as mudanças sem salvar.

## Melhores Práticas

### Contraste de Cores

- **Legibilidade** -- Certifique-se de que cores de link tenham contraste suficiente com o fundo
- **Conformidade WCAG** -- Aponte para pelo menos uma proporção de contraste 4.5:1 para acessibilidade
- **Teste ambos os modos** -- Visualize seu site com navegação sólida e transparente

### Consistência de Marca

- **Use suas cores de marca** -- Combine sua logo e tema de site
- **Limite sua paleta** -- Mantenha-se com 2-3 cores para um visual coeso
- **Considere suas imagens** -- Se usar navegação transparente, teste contra fundos de página típicos

### Estados de Hover e Ativo

- **Feedback claro** -- Faça estados hover obviamente diferentes de links padrão
- **Distinga páginas ativas** -- Use uma cor distinta para que usuários saibam onde estão
- **Transições suaves** -- O sistema anima automaticamente mudanças de cor

## Resolução de Problemas

### As Cores Não Parecem Corretas

- **Limpe seu cache** -- Cache do navegador pode mostrar cores antigas
- **Verifique códigos hexadecimais** -- Certifique-se de que digitou códigos de cor hexadecimais válidos
- **Teste em fundos diferentes** -- Cores podem parecer diferentes dependendo da página

### Navegação Não Visível

- **Modo transparente** -- Se usar navegação transparente sobre imagens claras, texto escuro pode ser difícil de ver
- **Solução** -- Ajuste suas cores de link ou use fundos de página mais escuros
- **Alternativa** -- Adicione uma sombra sutil ou sobreposição de fundo à área de navegação

## Detalhes Técnicos

Estilos de navegação são armazenados como JSON e aplicados usando variáveis CSS:

- As mudanças entram em efeito imediatamente sem reconstruir o site
- As cores cascateiam para todos os elementos de navegação
- Os overrides são opcionais; cores não definidas usam padrões de tema

## Artigos Relacionados

- [Appearance](./appearance.md) -- Personalize a aparência geral do seu site
- [Managing Pages](./managing-pages.md) -- Crie e organize as páginas do seu site
- [Page Editor](./page-editor.md) -- Projete layouts e conteúdo de página
