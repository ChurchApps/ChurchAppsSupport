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
3. A página **Site Styles** (Estilos do Site) carrega. O cartão **Theme, fonts & footer** (Tema, fontes e rodapé) mostra a lista **Style Settings** (Configurações de Estilo) à esquerda e uma prévia de um site de exemplo à direita. Abaixo dele estão os cartões **Announcement & widgets** (Anúncio e widgets) e **Redirects & analytics** (Redirecionamentos e analytics).

## Paleta de Cores {#color-palette}

1. Clique em **Color Palette** no painel Configurações de Estilo.
2. Você verá **Base Colors** (tons claro, destaque e escuro) e **Semantic Colors** (Primária, Secundária, Sucesso, Aviso e Erro).
3. Clique em qualquer amostra de cor para abrir o seletor de cores. Arraste o seletor ou digite um valor hexadecimal para escolher sua cor.
4. A **Color Combinations Preview** mostra como suas cores selecionadas funcionam juntas.
5. Use **Suggested Palettes** para aplicar rapidamente um esquema de cores pré-projetado.
6. Clique em **Save Palette** (Salvar Paleta) quando estiver satisfeito.

## Tipografia

1. Clique em **Fonts** (Fontes) no painel Configurações de Estilo.
2. Clique no botão **Heading Font** (Fonte de Títulos) ou **Body Font** (Fonte do Corpo) para abrir o navegador de fontes. Você pode pesquisar por nome ou navegar por categorias como Serif, Sans Serif, Display, Handwriting e Monospace. Também pode escolher uma das **Popular Font Combinations** (Combinações Populares de Fontes).
3. Clique em **Save Fonts** (Salvar Fontes) para aplicar suas escolhas de fonte.
4. Para ajustar a hierarquia de tamanhos para Título 1 até Título 4, clique em **Typography Scale** (Escala Tipográfica) no painel Configurações de Estilo. Use os campos **Type Scale** (Escala de Tipo), **Base Size** (Tamanho Base) e **Line Height** (Altura da Linha) para afinar e depois clique em **Save Typography** (Salvar Tipografia).

## Espaçamento

1. Clique em **Spacing Scale** no painel Configurações de Estilo.
2. Ajuste valores de espaçamento de Extremamente Pequeno até Extremamente Grande. Exemplos práticos mostram como cada valor afeta o layout.
3. Clique em **Save Spacing** para aplicar os valores em todo o seu site.

## Logo e Marca {#logo-and-branding}

1. Clique em **Logo** no painel Configurações de Estilo.
2. Envie seu **Light Background Logo** e **Dark Background Logo**. Use imagens com fundo transparente e proporção 4:1 para obter os melhores resultados.
3. Envie uma **Social Media Image** para visualizações de links e um **Favicon** para o ícone da guia do navegador.

:::tip
Para obter os melhores resultados, use uma logo com fundo transparente em formato PNG. Isso garante que pareça ótima em fundos claros e escuros em seu site e [aplicativo móvel](../settings/mobile-app.md).
:::

## Estilos de Navegação

Personalize as cores da barra de navegação do seu site para modos sólido e transparente:

1. Clique em **Navigation** (Navegação) no painel Configurações de Estilo
2. Configure cores para **Header (solid)** (Cabeçalho sólido) e **Header over hero (transparent)** (Cabeçalho sobre o destaque, transparente)
3. Clique em **Save Navigation** (Salvar Navegação) para aplicar suas cores de navegação

Para instruções detalhadas, consulte [Navigation Styles](./navigation-styles.md).

## Anúncio e Widgets

Os widgets do site aparecem em todas as páginas do seu site, flutuando acima do conteúdo da página:

- **Announcement Banner** -- Uma barra removível no topo do seu site para mensagens sensíveis ao tempo, como um evento próximo ou uma mudança de serviço.
- **Launcher** -- Um botão flutuante que abre um menu de acesso rápido, por exemplo, links para doação, check-in ou visualização do boletim.

1. Encontre o cartão **Announcement & widgets** (Anúncio e widgets) abaixo das Configurações de Estilo.
2. Ative os widgets que deseja e configure seu texto, links e cores.
3. Clique em **Save**.

## Redirecionamentos e Analíticas

O cartão **Redirects & analytics** (Redirecionamentos e analytics) abaixo das Configurações de Estilo contém duas configurações não relacionadas mas frequentemente necessárias:

- **Analytics** -- Adicione seu **GA4 Measurement ID** (formato `G-XXXXXXXXXX`) para rastrear o tráfego de visitantes no seu site. O mesmo ID também rastreia visualizações de página no aplicativo B1 da sua igreja (o portal de membros em `/mobile`, incluindo o aplicativo instalado), marcadas com um `display_mode` de `installed` ou `browser`, para que você consiga distinguir, no Google Analytics, as visitas pelo aplicativo instalado das visitas pelo navegador.
- **Redirects** -- Mapeie um caminho de URL antigo para um novo, para que links para uma página que você moveu ou renomeou continuem funcionando em vez de resultarem em 404. Digite o caminho **From** antigo e o caminho **To** novo, depois clique em **Save**. Um redirecionamento também tem prioridade sobre as páginas integradas do B1 (`/sermons`, `/stream`, `/donate`, `/bible` e `/votd`), então você pode enviar esse endereço para outro lugar (por exemplo, para sua própria página de sermões ou um canal do YouTube). Ele não substitui uma página que você mesmo criou no mesmo endereço. Exclua essa página primeiro se quiser que o redirecionamento seja aplicado.

## CSS e JavaScript Personalizados

1. Clique em **CSS & Javascript** (CSS e Javascript) no painel Configurações de Estilo.
2. Adicione **Custom CSS** para substituir os estilos padrão para personalização avançada.
3. Adicione **Custom HTML** para códigos de rastreamento ou outros scripts.
4. Use a seção **Common JavaScript Examples** para trechos como integração do Google Analytics.

:::warning
CSS personalizado é poderoso, mas pode quebrar o layout do seu site se usado incorretamente. A maioria das igrejas pode obter a aparência desejada usando os controles integrados de cor, fonte e espaçamento. Use CSS personalizado apenas se estiver confortável com desenvolvimento web.
:::

:::info
Seu site aplica uma Política de Segurança de Conteúdo que bloqueia scripts inline de qualquer outra fonte. O campo **Custom HTML** (HTML personalizado) aqui, e o [elemento HTML](page-editor#using-the-html-element) em páginas individuais, são as exceções confiáveis -- código que você salva ali é executado como está, então cole apenas scripts de fontes confiáveis (tags de análise, widgets de chat e incorporações semelhantes).
:::

## Temas de Estilo

Se quiser um ponto de partida rápido, as **Suggested Palettes** na seção Paleta de Cores oferecem temas pré-construídos que definem cores coordenadas em um clique. Você sempre pode afinar configurações individuais após aplicar um tema.

## Próximas Etapas

- [Managing Pages](managing-pages) -- Crie e organize as páginas do seu site
- [Files](files) -- Envie ativos de mídia para seu site
