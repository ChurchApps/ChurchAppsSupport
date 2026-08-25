---
title: "Aparência"
---

# Aparência

<div class="article-intro">

A página Aparência permite você customizar a aparência geral e sensação do site de sua igreja. De cores e fontes a espaçamento e CSS personalizado você pode controlar cada aspecto visual de seu site de um lugar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete a [Configuração Inicial](initial-setup) para seu website
- Tenha seu logo de igreja pronto em formato PNG com fundo transparente e proporção 4:1
- Saiba as cores de marca de sua igreja (valores hex) se você tem um guia de estilo existente

</div>

## Acessando Configurações de Aparência

1. Em B1 Admin, clique em **Website** no menu esquerdo.
2. Clique na guia **Aparência** no topo da visualização Website Pages.
3. A página Site Styles carrega com uma visualização ao vivo de seu website no esquerdo e opções de **Configurações de Estilo** na direita.

## Paleta de Cores

1. Clique em **Color Palette** no painel Configurações de Estilo.
2. Você verá **Base Colors** (tons claros, de ênfase e escuros) e **Semantic Colors** (Primary, Secondary, Success, Warning e Error).
3. Clique em qualquer amostra de cor para abrir o seletor de cor. Arraste o seletor ou digite um valor hex para escolher sua cor.
4. O **Color Combinations Preview** mostra como suas cores selecionadas trabalham juntas.
5. Use **Suggested Palettes** para aplicar rapidamente um esquema de cores pré-projetado.
6. Clique em **Save** quando estiver satisfeito.

## Tipografia

1. Clique em **Typography Settings** no painel Configurações de Estilo.
2. Clique em **Select a Font** para abrir o navegador de fonte. Você pode buscar por nome ou procurar categorias como Serif, Sans Serif, Display, Handwriting e Monospace.
3. Defina fontes tanto para cabeçalhos quanto para texto de corpo.
4. Clique em **Typography Scale** para ajustar a hierarquia de tamanho para Heading 1 a Heading 4. Use a escala multiplicadora e campos de tamanho base para ajustar bem.
5. Clique em **Save** para aplicar suas escolhas de fonte.

## Espaçamento

1. Clique em **Spacing Scale** no painel Configurações de Estilo.
2. Ajuste valores de espaçamento para Extra Small até Extra Large. Exemplos práticos mostram como cada valor afeta layout.
3. Clique em **Save Spacing** para aplicar os valores através de todo seu site.

## Logo e Marca

1. Clique em **Logo** no painel Configurações de Estilo.
2. Faça upload de seu **Light Background Logo** e **Dark Background Logo**. Use imagens com fundo transparente e proporção 4:1 para melhores resultados.
3. Faça upload de uma **Social Media Image** para visualizações de link e um **Favicon** para o ícone da guia do navegador.

:::tip
Para melhores resultados, use um logo com fundo transparente em formato PNG. Isto garante que pareça ótimo tanto em fundos claros quanto escuros em seu website e [aplicativo móvel](../settings/mobile-app.md).
:::

## Estilos de Navegação

Customize cores da barra de navegação de seu website para modos sólido e transparente:

1. Role até a seção **Navigation Styles**
2. Clique em **Edit Navigation Styles**
3. Configure cores para navegação sólida (com fundo) e navegação transparente (modo overlay)
4. Clique em **Save** para aplicar suas cores de navegação

Para instruções detalhadas, consulte [Navigation Styles](./navigation-styles.md).

## Widgets de Site

Widgets de site aparecem em cada página de seu site, flutuando acima do conteúdo da página:

- **Announcement Banner** -- Uma barra demissível no topo de seu site para mensagens sensíveis ao tempo, como um evento próximo ou uma mudança de serviço.
- **Launcher** -- Um botão flutuante que abre um menu de acesso rápido, por exemplo links para dar, fazer check-in ou visualizar o boletim.

1. Clique em **Site Widgets** no painel Configurações de Estilo.
2. Ligue os widgets que você quer e configure seu texto, links e cores.
3. Clique em **Save**.

## Análise

Adicione seu **Google Analytics 4 Measurement ID** no painel Configurações de Estilo para rastrear tráfego de visitante em seu website.

## CSS e JavaScript Personalizado

1. Clique em **CSS and Javascript** no painel Configurações de Estilo.
2. Adicione **Custom CSS** para substituir estilos padrão para customização avançada.
3. Adicione **Custom HTML** para códigos de rastreamento ou outros scripts.
4. Use a seção **Common Javascript Examples** para snippets como integração do Google Analytics.

:::warning
CSS personalizado é poderoso mas pode quebrar seu layout do site se usado incorretamente. A maioria das igrejas pode alcançar a aparência que desejam usando os controles de cor, fonte e espaçamento construídos. Apenas use CSS personalizado se você estiver confortável com desenvolvimento web.
:::

:::info
Seu site impõe uma Content Security Policy que bloqueia scripts inline de qualquer outra fonte. O campo **Custom JavaScript** é a única exceção confiável — código que você salva lá executa como-é, para que você apenas cole scripts de fontes que você confia (tags de análise, widgets de chat e embeds similares).
:::

## Temas de Estilo

Se você quer um ponto de partida rápido, o **Suggested Palettes** na seção Color Palette oferece temas pré-construídos que definem cores coordenadas em um clique. Você sempre pode ajustar bem configurações individuais depois de aplicar um tema.

## Próximas Etapas

- [Gerenciando Páginas](managing-pages) -- Construa e organize suas páginas de website
- [Arquivos](files) -- Faça upload de ativos de mídia para seu site
