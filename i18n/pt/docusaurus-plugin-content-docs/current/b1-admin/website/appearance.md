---
title: "Aparência"
---

# Aparência

<div class="article-intro">

A página Aparência permite personalizar a aparência geral do site da sua igreja. Desde cores e fontes até espaçamento e CSS personalizado, você pode controlar todos os aspectos visuais do seu site em um só lugar.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração inicial](initial-setup) do seu site
- Tenha o logotipo da sua igreja em formato PNG, com fundo transparente e proporção de 4:1
- Saiba as cores da marca da sua igreja (valores hexadecimais), caso tenha um guia de estilo existente

</div>

## Acessando as configurações de aparência

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Site**.
2. Clique em **Aparência**.
3. A página **Estilos do site** é carregada. O cartão **Tema, fontes e rodapé** mostra a lista **Configurações de estilo** à esquerda e uma prévia de um site de exemplo à direita. Abaixo dele estão os cartões **Anúncios e widgets** e **Redirecionamentos e análises**.

## Paleta de cores {#color-palette}

1. Clique em **Paleta de cores** no painel Configurações de estilo.
2. Você verá **Cores base** (tons claro, de destaque e escuro) e **Cores semânticas** (Primária, Secundária, Sucesso, Aviso e Erro).
3. Clique em qualquer amostra de cor para abrir o seletor de cores. Arraste o seletor ou insira um valor hexadecimal para escolher a sua cor.
4. A **Prévia de combinações de cores** mostra como as cores selecionadas funcionam juntas.
5. Use **Paletas sugeridas** para aplicar rapidamente um esquema de cores pré-definido.
6. Clique em **Salvar paleta** quando estiver satisfeito.

## Tipografia

1. Clique em **Fontes** no painel Configurações de estilo.
2. Clique no botão **Fonte de título** ou **Fonte do corpo** para abrir o navegador de fontes. Você pode pesquisar pelo nome ou navegar pelas categorias, como Serifada, Sem serifa, Display, Manuscrita e Monoespaçada. Você também pode escolher uma das **Combinações de fontes populares**.
3. Clique em **Salvar fontes** para aplicar as fontes escolhidas.
4. Para ajustar a hierarquia de tamanhos dos Títulos 1 a 4, clique em **Escala tipográfica** no painel Configurações de estilo. Use os campos **Multiplicador de tipo**, **Tamanho base** e **Altura da linha** para ajustar, e depois clique em **Salvar tipografia**.

## Espaçamento

1. Clique em **Escala de espaçamento** no painel Configurações de estilo.
2. Ajuste os valores de espaçamento de Extra pequeno a Extra grande. Exemplos práticos mostram como cada valor afeta o layout.
3. Clique em **Salvar espaçamento** para aplicar os valores em todo o seu site.

## Logotipo e identidade visual {#logo-and-branding}

1. Clique em **Logotipo** no painel Configurações de estilo.
2. Envie seu **Logotipo para fundo claro** e seu **Logotipo para fundo escuro**. Para melhores resultados, use imagens com fundo transparente e proporção de 4:1.
3. Envie uma **Imagem para redes sociais** para as prévias de links e um **Favicon** para o ícone da aba do navegador.
4. Clique em **Salvar alterações**. As imagens enviadas não são armazenadas até que você salve, então, se tentar fechar ou recarregar a aba do navegador antes disso, o navegador avisará que há alterações não salvas.

:::tip
Para melhores resultados, use um logotipo com fundo transparente em formato PNG. Isso garante que ele fique bom em fundos claros e escuros, tanto no seu site quanto no [aplicativo móvel](../settings/mobile-app.md).
:::

## Estilos de navegação

Personalize as cores da barra de navegação do seu site, tanto no modo sólido quanto no transparente:

1. Clique em **Navegação** no painel Configurações de estilo.
2. Configure as cores de **Cabeçalho (sólido)** e **Cabeçalho sobre o destaque (transparente)**.
3. Clique em **Salvar navegação** para aplicar as cores de navegação.

Para instruções detalhadas, consulte [Estilos de navegação](./navigation-styles.md).

## Anúncios e widgets

Os widgets do site aparecem em todas as páginas, flutuando acima do conteúdo da página:

- **Faixa de anúncio**: uma barra que pode ser dispensada, no topo do site, para mensagens urgentes, como um evento próximo ou uma mudança de horário de culto.
- **Lançador**: um botão flutuante que abre um menu de acesso rápido, por exemplo com links para ofertar, fazer check-in ou ver o boletim.

1. Localize o cartão **Anúncios e widgets** abaixo das Configurações de estilo.
2. Ative os widgets desejados e configure os textos, links e cores.
3. Clique em **Salvar**.

## Redirecionamentos e análises

O cartão **Redirecionamentos e análises** (abaixo das Configurações de estilo) reúne duas configurações diferentes, mas igualmente comuns:

- **Análises**: adicione seu **ID de medição do GA4** (formato `G-XXXXXXXXXX`) para acompanhar o tráfego de visitantes do seu site. O mesmo ID também registra as visualizações de página no aplicativo B1 da sua igreja (o portal do membro em `/mobile`, inclusive o aplicativo instalado), marcadas com um `display_mode` de `installed` ou `browser`, para que você consiga diferenciar as visitas pelo aplicativo instalado das visitas pelo navegador no Google Analytics.
- **Redirecionamentos**: mapeie um caminho de URL antigo para um novo, para que os links de uma página que você moveu ou renomeou continuem funcionando, em vez de exibir erro 404. Informe o caminho **De** antigo e o caminho **Para** novo e clique em **Salvar**. Um redirecionamento também tem prioridade sobre as páginas integradas do B1 (`/sermons`, `/stream`, `/donate`, `/bible` e `/votd`), então você pode enviar esse endereço para outro lugar (por exemplo, para a sua própria página de sermões ou um canal do YouTube). Ele não substitui uma página que você criou no mesmo endereço. Exclua essa página primeiro se quiser que o redirecionamento seja aplicado.

## CSS personalizado e JavaScript

1. Clique em **CSS e JavaScript** no painel Configurações de estilo.
2. Adicione **CSS personalizado** para substituir os estilos padrão em personalizações avançadas.
3. Adicione **HTML personalizado** para códigos de rastreamento ou outros scripts.
4. Use a seção **Exemplos comuns de JavaScript** para trechos como a integração com o Google Analytics.

:::warning
O CSS personalizado é poderoso, mas pode quebrar o layout do seu site se usado incorretamente. A maioria das igrejas consegue o visual desejado com os controles integrados de cor, fonte e espaçamento. Use CSS personalizado apenas se você tiver conforto com desenvolvimento web.
:::

:::info
Seu site aplica uma Política de Segurança de Conteúdo que bloqueia scripts embutidos de qualquer outra origem. O campo **HTML personalizado** aqui, e o [elemento HTML](page-editor#using-the-html-element) em páginas individuais, são as exceções confiáveis: o código salvo ali é executado exatamente como está, então cole apenas scripts de fontes confiáveis (tags de análise, widgets de chat e incorporações semelhantes).
:::

## Temas de estilo

Se você quer um ponto de partida rápido, as **Paletas sugeridas** na seção Paleta de cores oferecem temas prontos que definem cores coordenadas com um único clique. Você sempre pode ajustar as configurações individuais depois de aplicar um tema.

## Próximos passos

- [Gerenciando páginas](managing-pages): crie e organize as páginas do seu site
- [Arquivos](files): envie recursos de mídia para o seu site
