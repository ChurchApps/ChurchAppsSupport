---
title: "Aparência"
---

# Aparência

<div class="article-intro">

A página Aparência permite que você personalize a aparência geral do site da sua igreja. De cores e fontes a espaçamento e CSS personalizado, você pode controlar cada aspecto visual do seu site em um só lugar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Complete a [Configuração Inicial](initial-setup) do seu site
- Tenha sua logo da igreja pronta em formato PNG com fundo transparente e proporção 4:1
- Conheça as cores da marca da sua igreja (valores em hexadecimal) se você tiver um guia de estilo existente

</div>

## Acessando Configurações de Aparência

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Website**.
2. Clique em **Appearance**.
3. A página Site Styles carrega com uma visualização ao vivo do seu site à esquerda e opções de **Configurações de Estilo** à direita.

## Paleta de Cores

1. Clique em **Color Palette** no painel Configurações de Estilo.
2. Você verá **Base Colors** (tons claro, destaque e escuro) e **Semantic Colors** (Primária, Secundária, Sucesso, Aviso e Erro).
3. Clique em qualquer amostra de cor para abrir o seletor de cores. Arraste o seletor ou digite um valor hexadecimal para escolher sua cor.
4. A **Color Combinations Preview** mostra como suas cores selecionadas funcionam juntas.
5. Use **Suggested Palettes** para aplicar rapidamente um esquema de cores pré-projetado.
6. Clique em **Save** quando estiver satisfeito.

## Tipografia

1. Clique em **Typography Settings** no painel Configurações de Estilo.
2. Clique em **Select a Font** para abrir o navegador de fontes. Você pode pesquisar por nome ou navegar por categorias como Serif, Sans Serif, Display, Handwriting e Monospace.
3. Defina fontes para títulos e texto de corpo.
4. Clique em **Typography Scale** para ajustar a hierarquia de tamanhos para Título 1 até Título 4. Use o multiplicador de escala e os campos de tamanho base para afinar.
5. Clique em **Save** para aplicar suas escolhas de fonte.

## Espaçamento

1. Clique em **Spacing Scale** no painel Configurações de Estilo.
2. Ajuste valores de espaçamento de Extremamente Pequeno até Extremamente Grande. Exemplos práticos mostram como cada valor afeta o layout.
3. Clique em **Save Spacing** para aplicar os valores em todo o seu site.

## Logo e Marca

1. Clique em **Logo** no painel Configurações de Estilo.
2. Envie seu **Light Background Logo** e **Dark Background Logo**. Use imagens com fundo transparente e proporção 4:1 para obter os melhores resultados.
3. Envie uma **Social Media Image** para visualizações de links e um **Favicon** para o ícone da guia do navegador.

:::tip
Para obter os melhores resultados, use uma logo com fundo transparente em formato PNG. Isso garante que pareça ótima em fundos claros e escuros em seu site e [aplicativo móvel](../settings/mobile-app.md).
:::

## Estilos de Navegação

Personalize as cores da barra de navegação do seu site para modos sólido e transparente:

1. Role para a seção **Navigation Styles**
2. Clique em **Edit Navigation Styles**
3. Configure cores para navegação sólida (com fundo) e navegação transparente (modo de sobreposição)
4. Clique em **Save** para aplicar suas cores de navegação

Para instruções detalhadas, consulte [Navigation Styles](./navigation-styles.md).

## Anúncio e Widgets

Os widgets do site aparecem em todas as páginas do seu site, flutuando acima do conteúdo da página:

- **Announcement Banner** -- Uma barra removível no topo do seu site para mensagens sensíveis ao tempo, como um evento próximo ou uma mudança de serviço.
- **Launcher** -- Um botão flutuante que abre um menu de acesso rápido, por exemplo, links para doação, check-in ou visualização do boletim.

1. Clique em **Announcement & Widgets** no painel Configurações de Estilo.
2. Ative os widgets que deseja e configure seu texto, links e cores.
3. Clique em **Save**.

## Redirecionamentos e Analíticas

O painel **Redirects & Analytics** nas Configurações de Estilo contém duas configurações não relacionadas mas frequentemente necessárias:

- **Analytics** -- Adicione seu **Google Analytics 4 Measurement ID** para rastrear o tráfego de visitantes no seu site.
- **Redirects** -- Mapeie um caminho de URL antigo para um novo, para que links para uma página que você moveu ou renomeou continuem funcionando em vez de resultarem em 404. Digite o caminho **From** antigo e o caminho **To** novo, depois clique em **Save**.

## CSS e JavaScript Personalizados

1. Clique em **CSS and Javascript** no painel Configurações de Estilo.
2. Adicione **Custom CSS** para substituir os estilos padrão para personalização avançada.
3. Adicione **Custom HTML** para códigos de rastreamento ou outros scripts.
4. Use a seção **Common Javascript Examples** para trechos como integração do Google Analytics.

:::warning
CSS personalizado é poderoso, mas pode quebrar o layout do seu site se usado incorretamente. A maioria das igrejas pode obter a aparência desejada usando os controles integrados de cor, fonte e espaçamento. Use CSS personalizado apenas se estiver confortável com desenvolvimento web.
:::

:::info
Seu site aplica uma Política de Segurança de Conteúdo que bloqueia scripts inline de qualquer outra fonte. O campo **Custom JavaScript** é a única exceção confiável -- código que você salva lá é executado como está, então cole apenas scripts de fontes confiáveis (tags de análise, widgets de chat e incorporações semelhantes).
:::

## Temas de Estilo

Se quiser um ponto de partida rápido, as **Suggested Palettes** na seção Paleta de Cores oferecem temas pré-construídos que definem cores coordenadas em um clique. Você sempre pode afinar configurações individuais após aplicar um tema.

## Próximas Etapas

- [Managing Pages](managing-pages) -- Crie e organize as páginas do seu site
- [Files](files) -- Envie ativos de mídia para seu site
