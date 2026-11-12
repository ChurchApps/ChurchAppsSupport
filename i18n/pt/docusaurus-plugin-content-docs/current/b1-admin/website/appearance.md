---
title: "Aparência"
description: "Defina cores, fontes, espaçamento, logo e navegação do site da sua igreja no B1 Admin, além de widgets, análises GA4, redirecionamentos e CSS personalizado."
---

# Aparência

<div class="article-intro">

A página Aparência permite personalizar o visual geral do site da sua igreja. De cores e fontes a espaçamento e CSS personalizado, você controla todos os aspectos visuais do seu site em um só lugar.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração inicial](./initial-setup.md) do seu site
- Tenha o logo da sua igreja em formato PNG, com fundo transparente e proporção de 4:1
- Conheça as cores da marca da sua igreja (valores hexadecimais), caso já tenha um guia de estilo

</div>

## Acessando as configurações de aparência {#accessing-appearance-settings}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Site**.
2. Clique em **Aparência**.
3. A página **Estilos do site** é carregada. O cartão **Tema, fontes e rodapé** mostra a lista **Configurações de estilo** à esquerda e uma prévia de um site de exemplo à direita. Abaixo dele estão os cartões **Anúncio e widgets** e **Redirecionamentos e análises**.

## Paleta de cores {#color-palette}

1. Clique em **Paleta de cores** no painel Configurações de estilo.
2. Você verá as **Cores base** (tons claros, de destaque e escuros) e as **Cores semânticas** (Primária, Secundária, Sucesso, Alerta e Erro).
3. Clique em qualquer amostra de cor para abrir o seletor de cores. Arraste o seletor ou digite um valor hexadecimal para escolher a sua cor.
4. A **Prévia de combinações de cores** mostra como as cores escolhidas funcionam juntas.
5. Use as **Paletas sugeridas** para começar com um esquema de cores já pronto. Clicar em uma paleta apenas carrega as cores dela no editor.
6. Clique em **Salvar paleta** para aplicar as cores ao site, ou em **Cancelar** para descartá-las.

## Tipografia {#typography}

1. Clique em **Fontes** no painel Configurações de estilo.
2. Clique no botão **Fonte de títulos** ou **Fonte do corpo** para abrir o seletor **Escolha uma fonte**, que lista as Google Fonts por popularidade, dez por página. Digite em **Pesquisar** para encontrar uma fonte pelo nome, ou use o **Filtro de categoria** (Serifada, Sem serifa, Display, Manuscrita ou Monoespaçada). Clique em uma fonte para escolhê-la. Você também pode clicar em uma das **Combinações de fontes populares** para definir as duas fontes de uma vez.
3. Clique em **Salvar fontes** para aplicar as suas escolhas de fonte.
4. Para ajustar a hierarquia de tamanhos dos Títulos 1 a 4, clique em **Escala tipográfica** no painel Configurações de estilo. Use os campos **Multiplicador da escala**, **Tamanho base** e **Altura da linha** para ajustar, depois clique em **Salvar tipografia**.

## Espaçamento {#spacing}

1. Clique em **Escala de espaçamento** no painel Configurações de estilo.
2. Ajuste os valores de espaçamento de Extra pequeno a Extra grande. Exemplos práticos mostram como cada valor afeta o layout.
3. Clique em **Salvar espaçamento** para aplicar os valores em todo o seu site.

## Logo e identidade visual {#logo-and-branding}

1. Clique em **Logo** no painel Configurações de estilo.
2. Envie o seu **Logo para fundo claro** e o **Logo para fundo escuro**. Para melhores resultados, use imagens com fundo transparente e proporção de 4:1.
3. Envie uma **Imagem para redes sociais** para as prévias de links e um **Favicon** para o ícone da aba do navegador.
4. Opcionalmente, digite um **Nome curto do PWA** (até 12 caracteres) -- o nome exibido embaixo do ícone do aplicativo da sua igreja quando alguém o adiciona à tela inicial do celular.
5. Clique em **Salvar alterações**. As imagens enviadas só são armazenadas depois que você salva; por isso, se tentar fechar ou recarregar a aba do navegador antes, ele avisará que há alterações não salvas.

Os logos são compartilhados por todos os sites da sua igreja, pelo seu aplicativo e por materiais impressos, como as folhas de chamada.

:::tip
Para melhores resultados, use um logo com fundo transparente em formato PNG. Isso garante que ele fique ótimo tanto em fundos claros quanto escuros, no seu site e no [aplicativo móvel](../settings/mobile-app.md).
:::

## Estilos de navegação {#navigation-styles}

Personalize as cores da barra de navegação do seu site, tanto para o modo sólido quanto para o transparente:

1. Clique em **Navegação** no painel Configurações de estilo
2. Configure as cores de **Cabeçalho (sólido)** e de **Cabeçalho sobre o destaque (transparente)**
3. Clique em **Salvar navegação** para aplicar as cores da navegação

Para instruções detalhadas, veja [Estilos de navegação](./navigation-styles.md).

## Rodapé do site {#site-footer}

Clique em **Rodapé do site** no painel Configurações de estilo para abrir o seu rodapé no editor de blocos. Monte-o como qualquer seção de página -- por exemplo, com o seu endereço, os horários dos cultos e as redes sociais -- e clique em **Sair** quando terminar. O rodapé aparece na parte inferior de todas as páginas que usam o layout **Cabeçalho e rodapé**. Cada um dos seus sites tem o próprio rodapé.

## Anúncio e widgets {#announcement--widgets}

Os widgets do site aparecem em todas as páginas, flutuando acima do conteúdo da página:

- **Faixa de anúncio** -- Uma barra que pode ser fechada, no topo do site, para mensagens com prazo, como um evento que está por vir ou uma mudança de culto.
- **Lançador** -- Um botão flutuante que abre um menu de acesso rápido, por exemplo com links para contribuir, fazer check-in ou ver o boletim.

1. Localize o cartão **Anúncio e widgets** abaixo das Configurações de estilo.
2. Para a **Faixa de anúncio**, marque **Ativada** e preencha o **Texto**, um **URL do link** e o **Texto do link** (opcionais), além da **Cor de fundo** e da **Cor do texto**. Defina uma **Data inicial** e uma **Data final** para exibir a faixa somente durante esse período.
3. Para o **Lançador**, marque **Ativado**, depois clique em **Adicionar ação** para cada link (até cinco) e informe um **Rótulo**, um **URL** e um **Ícone**. Escolha a sua **Posição** (inferior direita ou inferior esquerda) e a sua **Cor**.
4. Clique em **Salvar**.

Desmarque **Ativada** e clique em **Salvar** para desligar um widget. Esses widgets se aplicam a todos os sites da sua igreja.

## Redirecionamentos e análises {#redirects--analytics}

O cartão **Redirecionamentos e análises** (abaixo das Configurações de estilo) reúne duas configurações diferentes, mas comumente necessárias:

- **Análises** -- Adicione o seu **ID de medição GA4** (formato `G-XXXXXXXXXX`) e clique em **Salvar** para acompanhar o tráfego de visitantes no seu site. O mesmo ID também registra as visualizações de página no aplicativo B1 da sua igreja (o portal de membros em `/mobile`, incluindo o aplicativo instalado), marcadas com um `display_mode` de `installed` ou `browser`, para que você consiga diferenciar as visitas pelo aplicativo instalado das visitas pelo navegador no Google Analytics.
- **Redirecionamentos** -- Associe um caminho de URL antigo a um novo, para que links de uma página que você moveu ou renomeou continuem funcionando, em vez de exibir erro 404. Digite o **Caminho de origem** antigo e o **Caminho de destino** novo, depois clique em **Adicionar**. O redirecionamento é salvo imediatamente e listado acima dos campos; clique no seu ícone de excluir para removê-lo. Os caminhos são salvos em minúsculas, com barra inicial e sem barra final. Um redirecionamento também tem prioridade sobre as páginas integradas do B1 (`/sermons`, `/stream`, `/donate`, `/bible` e `/votd`), então você pode enviar esse endereço para outro lugar (por exemplo, para a sua página de sermões ou para um canal do YouTube). Ele não substitui uma página que você mesmo criou no mesmo endereço. Exclua essa página primeiro se quiser que o redirecionamento seja aplicado.

## CSS e JavaScript personalizados {#custom-css-and-javascript}

1. Clique em **CSS e JavaScript** no painel Configurações de estilo.
2. Adicione **CSS personalizado** para sobrescrever os estilos padrão em personalizações avançadas.
3. Adicione **HTML personalizado** para códigos de rastreamento ou outros scripts.
4. Use as seções **Exemplos comuns de CSS** e **Exemplos comuns de JavaScript** para trechos prontos, depois clique em **Salvar alterações**.

:::warning
O CSS personalizado é poderoso, mas pode quebrar o layout do seu site se usado incorretamente. A maioria das igrejas consegue o visual desejado com os controles integrados de cores, fontes e espaçamento. Use CSS personalizado somente se você se sentir à vontade com desenvolvimento web.
:::

:::info
Seu site aplica uma Política de Segurança de Conteúdo que bloqueia scripts embutidos vindos de qualquer outra origem. O campo **HTML personalizado** aqui, e o [elemento HTML](./page-editor.md#using-the-html-element) em páginas individuais, são as exceções confiáveis -- o código salvo ali é executado como está, então cole somente scripts de fontes em que você confia (tags de análise, widgets de chat e incorporações semelhantes).
:::

## Temas de estilo {#style-themes}

Se quiser um ponto de partida rápido, as **Paletas sugeridas** na seção Paleta de cores oferecem temas prontos, com cores coordenadas. Clique em um deles para carregá-lo, ajuste qualquer cor que quiser e depois clique em **Salvar paleta**.

## Próximos passos {#next-steps}

- [Gerenciando páginas](./managing-pages.md) -- Crie e organize as páginas do seu site
- [Arquivos](./files.md) -- Envie recursos de mídia para o seu site
