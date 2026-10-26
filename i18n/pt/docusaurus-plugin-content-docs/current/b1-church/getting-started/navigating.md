---
title: "Navegando pelo B1App"
---

# Navegando pelo B1App

<div class="article-intro">

O portal de membros do B1.church é um aplicativo web pensado para celular que funciona em `/mobile`. Ele funciona em qualquer navegador e pode ser instalado na tela inicial do seu aparelho. Esta página explica o painel Início, a barra de abas inferior, a página Mais e a página Eu.

</div>

## Vídeo de apresentação

<YouTube id="8XKRZvvAbXg" title="A Tour of the B1.church Member App" next="A Tour of B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa estar [conectado](./logging-in.md) para ver suas informações pessoais. Visitantes não conectados ainda podem navegar pelo conteúdo público e recebem um botão **Entrar** sempre que um recurso exigir uma conta.

</div>

## Início {#home}

Ao abrir `https://yourchurchname.b1.church/mobile`, você vai para o painel **Início** em `/mobile/dashboard`. Início é a página inicial do portal de membros. Ela começa com uma saudação ("Bom dia", "Boa tarde" ou "Boa noite", com seu primeiro nome) e a data de hoje, seguidas de seções que só aparecem quando se aplicam:

- **Blocos com foto** -- abas às quais sua igreja atribuiu uma foto (incluindo o Versículo do Dia) aparecem como blocos com foto abaixo do nome da sua igreja. Dependendo da escolha da sua igreja, eles são organizados em uma grade de duas colunas, em uma fileira que você desliza para os lados (que também pode se mover sozinha) ou em uma lista com uma pequena miniatura ao lado de cada nome -- veja [Blocos da tela inicial](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Toda aba com foto aparece aqui, mesmo que também tenha um espaço na barra de abas.
- **Último sermão** -- o sermão mais recente da sua igreja, com um link **Todos os sermões**
- **Versículo do Dia** -- o versículo de hoje; toque nele para abrir a página completa [Versículo do Dia](../content/verse-of-the-day.md)
- **Você está servindo** -- seus próximos compromissos de voluntariado, com um link **Todos os planos**. Se algum compromisso ainda aguardar sua resposta, ele aparece primeiro com um selo **Aguardando resposta** e os botões **Aceitar** / **Recusar**, para que você responda diretamente pela tela Início (**Recusar** pede uma confirmação antes); caso contrário, seus próximos compromissos mostram um selo **Aceito** ou **Confirmado**. Toque em um compromisso para abrir o plano.
- **Seus grupos** -- até três dos seus grupos, com horário e local de reunião, e um link **Todos os grupos**
- **Próximos eventos** -- quando você está conectado, os próximos três eventos dos grupos aos quais pertence, cada um com data e horário (e uma miniatura, se o evento tiver foto). Toque em um evento para abrir os eventos do grupo. Toque em **Todos os próximos eventos** para abrir a lista completa na sua [página Eu](./me-page.md#upcoming), que também inclui seus compromissos de voluntariado e inscrições.
- **Meu histórico de presença** e **Meus formulários** -- se sua igreja os ativar, quantas vezes você compareceu nos últimos 90 dias com suas duas visitas mais recentes, e seus dois envios de formulário mais recentes, com links para as listas completas. Eles sempre aparecem na sua [página Eu](./me-page.md), independentemente disso -- veja [Seções da tela inicial](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Doações** -- quanto você doou neste ano ("Doado em" o ano atual), um botão **Doar** (exibido somente quando sua igreja oferece doações online) e um link **Histórico** para o seu [histórico de doações](../giving/donation-history.md). Oculta se sua igreja tiver limitado o histórico de doações dos membros a um ano anterior ou o tiver ocultado; nesse caso, a ferramenta de doações da igreja aparece como um botão em **Mais de** na seção Mais de
- **Mais de** *sua igreja* -- botões para as demais ferramentas que sua igreja ativou e que ainda não estão na barra de abas nem exibidas acima. As que você mais usa passam para o início.

As seções de voluntariado, grupos, presença, formulários e doações só aparecem quando você está conectado, sua igreja ativou essa ferramenta e você tem algo para mostrar -- por exemplo, um compromisso futuro ou pelo menos um grupo. No computador, a tela Início é organizada em duas colunas.

Se você estiver desconectado, a tela Início mostra um título **Bem-vindo** no lugar da saudação, com uma breve mensagem ("Entre para ver seus grupos, doações e muito mais.") e um botão **Entrar**. A mensagem aparece mesmo que sua igreja ainda não tenha configurado nada para a tela Início. Sua igreja pode reescrever essa mensagem ou ocultá-la -- veja [Configurações do aplicativo móvel](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando ela estiver oculta, você ainda pode entrar pela página **Mais** ou pela página **Eu**.

## A barra de abas inferior

No celular, uma barra de abas fica fixada na parte inferior da tela:

- **Início** -- sempre a primeira aba
- Até três das abas que sua igreja configurou
- **Mais** -- abre a página Mais

As telas integradas (como Grupos, Doações ou Planos) recebem primeiro os espaços da barra de abas; os espaços que sobrarem vão para as páginas personalizadas da sua igreja. Somente links para sites externos e o Versículo do Dia nunca recebem uma aba. Se sua igreja tiver configurado mais abas do que cabem, as demais não são perdidas: elas aparecem na página **Mais** e na seção **Mais de** da tela Início. Os administradores da igreja definem a ordem das abas no B1 Admin, em **Mobile → Navegação**.

## No computador

Em telas maiores, como computadores ou tablets grandes, a barra de abas inferior é substituída por um cabeçalho no topo da tela, na cor da sua igreja. Ele mostra o logotipo da sua igreja, ou seu nome se nenhum logotipo tiver sido definido (clique nele para voltar ao Início), **Início**, até cinco das abas que sua igreja configurou, e **Mais**, com o sino e a foto do seu perfil à direita. Ao abrir uma tela de detalhes, um link **Voltar** aparece acima do conteúdo da página.

## A página Mais {#the-more-page}

Ao tocar em **Mais**, a página Mais é aberta em `/mobile/more`. Ela contém:

- Seu nome e sua foto, com um link **Editar perfil** -- veja [Editando seu perfil](./editing-your-profile.md)
- Todas as abas que sua igreja configurou, na ordem, sob o nome da sua igreja. Links para sites externos abrem em uma nova aba do navegador.
- Uma seção **Conta** com:
  - **Eu** -- sua página pessoal (somente quando conectado)
  - **Aparência** -- alterne entre **Modo claro** e **Modo escuro**
  - **Portal do administrador** -- só aparece se você tiver permissões de administrador na sua igreja; abre o B1 Admin em uma nova aba
  - **Instalar aplicativo** -- abre as [instruções de instalação](./installing-pwa.md) em `/mobile/install` (oculto depois que o aplicativo estiver instalado)
- **Sair**, ou um botão **Entrar** se você estiver desconectado
- O nome da sua igreja e um link para a política de privacidade

## A barra do aplicativo

No celular, a barra no topo de cada tela mostra:

- O logotipo da sua igreja (ou seu nome, se a igreja não tiver enviado um logotipo) na tela Início e nas demais telas principais, ou uma seta de voltar quando você estiver em uma tela de detalhes. O título da tela aparece no topo da própria página.
- Um ícone de **sino** para notificações e mensagens, com um selo para itens não lidos -- veja [Notificações e mensagens](#notifications-and-messages) abaixo
- Sua **foto de perfil**, que abre seu perfil em `/mobile/profileEdit` -- veja [Editando seu perfil](./editing-your-profile.md)

O sino e a foto de perfil só aparecem quando você está conectado.

## Notificações e mensagens {#notifications-and-messages}

Ao tocar no sino, abre-se um painel com duas seções:

- **Mensagens** -- suas conversas privadas mais recentes, com um link **Nova mensagem** para iniciar uma
- **Notificações** -- suas notificações mais recentes, com um selo **Novo** nas não lidas. Toque em uma notificação para ir ao grupo, plano ou conversa de onde ela veio.

Cada seção mostra quantos itens não lidos ela tem. Toque em **Ver todas** na parte inferior para abrir sua caixa de entrada completa em `/mobile/notifications`.

## Páginas com seções

As páginas de detalhes -- um grupo, um plano, sua página Eu, as telas Planos e Doações -- são organizadas como uma única página de seções, em vez de abas. Cada seção mostra uma prévia curta, e um link no cabeçalho da seção (como **Todos os membros**, **Todos os eventos** ou **Ordem completa do culto**) abre a lista completa. Um link **Voltar para** no topo dessa visualização retorna você à página de onde veio.

## A página Eu

**Eu** (`/mobile/me`) é o seu centro pessoal. Ela mostra seu nome e sua foto, com os botões **Editar perfil** e **Configurações** ([preferências de notificação](./notification-preferences.md)), e depois o que está previsto para você -- compromissos de voluntariado, inscrições em eventos e eventos de grupos --, seguido da sua família, dos seus grupos, das suas [doações](../giving/) neste ano, dos formulários que você enviou, do seu histórico de presença, das suas [inscrições](../events/my-registrations.md) e das suas notificações e mensagens recentes. Veja [A página Eu](./me-page) para mais detalhes.

Se você estiver desconectado, a página Eu mostra um botão **Entrar** no lugar.

## Instalando na tela inicial

O portal de membros é um Progressive Web App. Acesse `/mobile/install` (ou escolha **Instalar aplicativo** na página Mais) para ver as instruções passo a passo para o seu dispositivo. Depois de instalado, ele abre em tela cheia a partir da tela inicial, sem a interface do navegador. Veja [Instalando como aplicativo (PWA)](./installing-pwa.md).

## Site público da sua igreja

Fora do portal de membros, o site público da sua igreja tem sua própria navegação de cabeçalho, com links configurados pelos administradores -- páginas como [sermões](../content/sermons.md), a [Bíblia](../content/bible.md), [transmissões ao vivo](../content/live-streaming.md) e uma lista pública de grupos. No celular, esses links ficam atrás do ícone de menu (três linhas) no canto superior direito do cabeçalho.

:::info
As abas e ferramentas que você vê variam de acordo com a igreja. Os administradores controlam quais seções ficam visíveis para os membros pelo B1 Admin; portanto, se você não vir um recurso descrito aqui, sua igreja pode não tê-lo ativado.
:::
