---
title: "Navegando pelo B1App"
description: "Encontre o seu caminho pelo portal de membros do B1.church em um celular ou computador: o painel Início, a barra de abas inferior, a página Mais e a página Eu."
---

# Navegando pelo B1App

<div class="article-intro">

O portal de membros do B1.church é um aplicativo web voltado para celulares que fica em `/mobile`. Ele funciona em qualquer navegador e pode ser instalado na tela inicial. Esta página explica o painel Início, a barra de abas inferior, a página Mais e a página Eu.

</div>

## Vídeo de apresentação

<YouTube id="8XKRZvvAbXg" title="Um tour pelo aplicativo de membros do B1.church" next="Um tour pelo B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa [estar conectado](./logging-in.md) para ver suas informações pessoais. Visitantes não conectados ainda podem navegar pelo conteúdo público e recebem um botão **Entrar** sempre que um recurso exigir uma conta.

</div>

## Início {#home}

Ao abrir `https://yourchurchname.b1.church/mobile`, você é levado ao painel **Início** em `/mobile/dashboard`. Início é a página inicial do portal de membros. Ela começa com uma saudação ("Bom dia", "Boa tarde" ou "Boa noite", seguida do seu primeiro nome) e a data de hoje, e depois traz seções que só aparecem quando se aplicam:

- **Blocos com foto** -- abas às quais sua igreja atribuiu uma foto (incluindo o Versículo do Dia) aparecem como blocos com foto abaixo do nome da igreja. Dependendo da escolha da sua igreja, eles são organizados em uma grade de duas colunas, em uma fileira que você desliza para o lado (que também pode avançar sozinha) ou em uma lista com uma pequena miniatura ao lado de cada nome. Veja [Blocos da Tela Inicial](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Quando a fileira lateral tem mais blocos do que cabem na tela, uma linha de pontos abaixo dela indica onde você está; toque em um ponto para ir até aquele bloco. A fileira continua avançando, recomeçando do primeiro bloco depois do último. Todas as abas com foto aparecem aqui, mesmo aquela que também tem um espaço na barra de abas.
- **Último sermão** -- o sermão mais recente da sua igreja, com um link **Todos os sermões**
- **Versículo do Dia** -- o versículo de hoje; toque nele para abrir a página completa do [Versículo do Dia](../content/verse-of-the-day.md)
- **Você está servindo** -- suas próximas escalas de serviço, com um link **Todos os planos**. Se alguma escala ainda precisar da sua resposta, ela aparece primeiro com um selo **Aguardando resposta** e os botões **Aceitar** / **Recusar**, para que você possa responder diretamente em Início (**Recusar** pede que você confirme antes). Caso contrário, suas próximas escalas mostram um selo **Aceita** ou **Confirmada**. Toque em uma escala para abrir o plano.
- **Seus grupos** -- até três dos seus grupos, com horário e local de reunião, e um link **Todos os grupos**
- **Próximos eventos** -- quando você está conectado, seus próximos três eventos de grupo e inscrições em eventos aparecem juntos, em ordem de data, cada um com data e hora (e uma miniatura, se o evento tiver foto). Cada linha é marcada como **Evento** (um evento de um grupo ao qual você pertence) ou **Inscrição** (um evento em que você está [inscrito](../events/registering.md)). Um evento em que você está inscrito aparece uma única vez, como inscrição. Toque em um evento para abrir os eventos do grupo, ou em uma inscrição para abrir suas [inscrições](../events/my-registrations.md). Toque em **Todos os próximos eventos** para abrir a lista completa na sua [página Eu](./me-page.md#upcoming), que também inclui suas escalas de serviço e inscrições.
- **Minha presença** e **Meus formulários** -- se sua igreja ativar essas seções, aparecem quantas vezes você compareceu nos últimos 90 dias, com suas duas visitas mais recentes, e suas duas submissões de formulário mais recentes, com links para as listas completas. Elas sempre aparecem na sua [página Eu](./me-page.md), independentemente disso. Veja [Seções da Tela Inicial](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Ofertas** -- quanto você deu neste ano ("Doado em" com o ano atual), um botão **Ofertar** (exibido somente se sua igreja oferecer ofertas online) e um link **Histórico** para seu [histórico de doações](../giving/donation-history.md). Esta seção fica oculta se sua igreja tiver limitado o histórico de ofertas dos membros a um ano anterior ou se tiver ocultado a seção. Nesse caso, a ferramenta de ofertas da igreja aparece como um botão em **Mais de** em vez disso.
- **Mais de** *sua igreja* -- botões para as demais ferramentas que sua igreja ativou e que ainda não estão na barra de abas nem mostradas acima. As que você mais usa vão para o início.

As seções de serviço, grupos, presença, formulários e ofertas só aparecem quando você está conectado, sua igreja tem essa ferramenta ativada e há algo a mostrar, por exemplo, uma escala futura ou pelo menos um grupo. Em um computador, Início é organizado em duas colunas.

Se você não estiver conectado, Início mostra um título **Bem-vindo** no lugar da saudação, com uma breve mensagem ("Entre para ver seus grupos, ofertas e muito mais.") e um botão **Entrar**. A mensagem aparece mesmo quando sua igreja ainda não configurou nada para Início. Sua igreja pode reescrever essa mensagem ou ocultá-la. Veja [Configurações do Aplicativo Móvel](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando ela está oculta, você ainda pode entrar pela página **Mais** ou pela página **Eu**.

## A Barra de Abas Inferior

No celular, uma barra de abas fica fixa na parte inferior da tela:

- **Início** -- sempre a primeira aba
- Até três das abas que sua igreja configurou
- **Mais** -- abre a página Mais

As telas integradas (como Grupos, Ofertas ou Planos) recebem os espaços das abas primeiro; quaisquer espaços restantes vão para as páginas personalizadas da sua igreja. Apenas links para sites externos e o Versículo do Dia nunca recebem uma aba. Se sua igreja tiver configurado mais abas do que cabem, as demais não se perdem: elas aparecem na página **Mais** e na seção **Mais de** em Início. Os administradores da igreja definem a ordem das abas no B1 Admin, em **Mobile → Navegação**.

### Abas de Pasta {#folder-tabs}

Sua igreja pode agrupar várias abas em uma **pasta**. Uma pasta aparece como qualquer outra aba, seja na barra de abas, na página **Mais** ou como um bloco com foto em Início. Ao tocar nela, abre-se uma tela com o nome da pasta que lista as abas contidas. Se todas as abas da pasta tiverem foto, elas são exibidas como blocos com foto; caso contrário, são exibidas como lista. Links para sites externos dentro de uma pasta abrem em uma nova aba do navegador. As abas dentro de uma pasta aparecem apenas na tela da pasta, não na barra de abas nem na página **Mais**. Uma pasta sem nada visível para você fica oculta.

## No Computador

Em telas maiores, como computadores ou tablets grandes, a barra de abas inferior é substituída por um cabeçalho no topo da tela, na cor da sua igreja. Ele mostra o logotipo da igreja, ou o nome dela se nenhum logotipo estiver definido (clique nele para voltar a Início), além de **Início**, até cinco das abas configuradas pela sua igreja, e **Mais**. À direita ficam o sino e sua foto de perfil. Ao abrir uma tela de detalhes, um link **Voltar** aparece acima do conteúdo da página.

## A Página Mais

Ao tocar em **Mais**, abre-se a página Mais em `/mobile/more`. Ela contém:

- Seu nome e foto, com um link **Editar Perfil**. Veja [Editando Seu Perfil](./editing-your-profile.md).
- Todas as abas configuradas pela sua igreja, na ordem, sob o nome da igreja. Links para sites externos abrem em uma nova aba do navegador.
- Uma seção **Conta** com:
  - **Eu** -- sua página pessoal (somente quando conectado)
  - **Aparência** -- alterna entre **Modo Claro** e **Modo Escuro**
  - **Portal Administrativo** -- exibido somente se você tiver permissões de administrador na sua igreja; abre o B1 Admin em uma nova aba
  - **Instalar Aplicativo** -- abre as [instruções de instalação](./installing-pwa.md) em `/mobile/install` (oculto depois que o aplicativo está instalado)
- **Sair**, ou um botão **Entrar** se você não estiver conectado
- O nome da sua igreja e um link para a política de privacidade

## A Barra Superior

No celular, a barra no topo de cada tela mostra:

- O logotipo da sua igreja (ou seu nome, se a igreja não tiver enviado um logotipo) em Início e nas outras telas principais, ou uma seta de voltar quando você entrou em uma tela de detalhes. O título da tela aparece no topo da própria página.
- Um ícone de **sino** para notificações e mensagens, com um selo para itens não lidos. Veja [Notificações e Mensagens](#notifications-and-messages) abaixo.
- Sua **foto de perfil**, que abre seu perfil em `/mobile/profileEdit`. Veja [Editando Seu Perfil](./editing-your-profile.md).

O sino e a foto de perfil só aparecem quando você está conectado.

## Notificações e Mensagens

Ao tocar no sino, abre-se um painel com duas seções:

- **Mensagens** -- suas conversas privadas mais recentes, com um link **Nova mensagem** para iniciar uma
- **Notificações** -- suas notificações mais recentes, com um selo **Novo** nas não lidas. Toque em uma notificação para ir ao grupo, plano ou conversa de onde ela veio.

Cada seção mostra quantos itens não lidos ela tem. Toque em **Ver todas** na parte inferior para abrir sua caixa de entrada completa em `/mobile/notifications`.

## Páginas com Seções

As páginas de detalhes, como a de um grupo, a de um plano, sua página Eu e as telas de Planos e Ofertas, são organizadas como uma página de seções em vez de abas. Cada seção mostra uma breve prévia, e um link no cabeçalho da seção (como **Todos os membros**, **Todos os eventos** ou **Ordem completa do culto**) abre a lista completa. Um link **Voltar para** no topo dessa visualização retorna à página de onde você veio.

## A Página Eu

**Eu** (`/mobile/me`) é o seu centro pessoal. Ela mostra seu nome e foto, com os botões **Editar Perfil** e **Configurações** ([preferências de notificação](./notification-preferences.md)). Em seguida, mostra o que está por vir para você, como escalas de serviço, inscrições em eventos e eventos de grupo, seguido da sua família, dos seus grupos, das suas [ofertas](../giving/index.md) deste ano, dos formulários que você enviou, do seu histórico de presença, das suas [inscrições](../events/my-registrations.md) e das suas notificações e mensagens recentes. Veja [A Página Eu](./me-page.md) para mais detalhes.

Se você não estiver conectado, a página Eu mostra um botão **Entrar**.

## Instalando na Tela Inicial

O portal de membros é um Aplicativo Web Progressivo (PWA). Acesse `/mobile/install` (ou escolha **Instalar Aplicativo** na página Mais) para obter instruções passo a passo para o seu dispositivo. Depois de instalado, ele abre em tela cheia a partir da tela inicial, sem a interface do navegador. Veja [Instalando como Aplicativo (PWA)](./installing-pwa.md).

## O Site Público da Sua Igreja

Fora do portal de membros, o site público da sua igreja tem seu próprio menu de navegação no cabeçalho, com links configurados pelos administradores. São páginas como [sermões](../content/sermons.md), a [Bíblia](../content/bible.md), [transmissão ao vivo](../content/live-streaming.md) e uma lista pública de grupos. No celular, esses links ficam atrás do ícone de hambúrguer no canto superior direito do cabeçalho.

:::info
As abas e ferramentas que você vê variam de acordo com a igreja. Os administradores controlam quais seções são visíveis para os membros pelo B1 Admin. Portanto, se você não vir um recurso descrito aqui, sua igreja pode não tê-lo ativado.
:::
