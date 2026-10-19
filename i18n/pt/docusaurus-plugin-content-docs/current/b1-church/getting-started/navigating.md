---
title: "Navegando no B1App"
---

# Navegando no B1App

<div class="article-intro">

O portal do membro no B1.church é um aplicativo web feito para celular que fica em `/mobile`. Ele funciona em qualquer navegador e pode ser instalado na tela inicial do seu aparelho. Esta página explica o painel Início, a barra de abas inferior, a página Mais e a página Eu.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa estar [conectado](./logging-in.md) para ver suas informações pessoais. Visitantes não conectados ainda podem navegar pelo conteúdo público e recebem um botão **Entrar** onde um recurso exige uma conta.

</div>

## Início {#home}

Ao abrir `https://yourchurchname.b1.church/mobile`, você é levado ao painel **Início** em `/mobile/dashboard`. O Início é a página de entrada do portal do membro. Ele começa com uma saudação ("Bom dia", "Boa tarde" ou "Boa noite", seguido do seu primeiro nome) e a data de hoje, seguidos de seções que só aparecem quando se aplicam:

- **Último sermão** -- o sermão mais recente da sua igreja, com um link **Todos os sermões**
- **Versículo do Dia** -- o versículo de hoje; toque nele para abrir a página completa do [Versículo do Dia](../content/verse-of-the-day.md)
- **Você está servindo** -- suas próximas escalas de serviço, com um link **Todos os planos**. Se alguma escala ainda aguarda sua resposta, ela aparece primeiro com um selo **Aguardando resposta** e os botões **Aceitar** / **Recusar**, para que você responda diretamente pelo Início (**Recusar** pede que você confirme antes); caso contrário, suas próximas escalas mostram um selo **Aceita** ou **Confirmada**. Toque em uma escala para abrir o plano dela.
- **Seus grupos** -- até três dos seus grupos, com horário e local de encontro, e um link **Todos os grupos**
- **Contribuições** -- quanto você contribuiu neste ano ("Contribuído em" o ano atual), um botão **Contribuir** e um link **Histórico** para o seu [histórico de doações](../giving/donation-history.md)
- **Mais de** *sua igreja* -- botões para as demais ferramentas que sua igreja ativou e que não estão na barra de abas nem exibidas acima. As que você mais usa aparecem primeiro.

As seções de serviço, grupos e contribuições só aparecem quando você está conectado, sua igreja ativou aquela ferramenta e há algo para mostrar -- por exemplo, uma escala futura ou pelo menos um grupo. Em um computador, o Início é organizado em duas colunas.

Se você não estiver conectado, o Início mostra um título **Bem-vindo** no lugar da saudação, com um breve convite ("Entre para ver seus grupos, contribuições e muito mais.") e um botão **Entrar**. O convite aparece mesmo que sua igreja ainda não tenha configurado mais nada para o Início. Sua igreja pode reformular esse convite ou ocultá-lo -- veja [Configurações do Aplicativo Móvel](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando ele estiver oculto, você ainda pode entrar pela página **Mais** ou pela página **Eu**.

## A Barra de Abas Inferior

No celular, uma barra de abas fica fixa na parte inferior da tela:

- **Início** -- sempre a primeira aba
- Até três das abas que sua igreja configurou
- **Mais** -- abre a página Mais

Links para sites externos, páginas personalizadas e o Versículo do Dia nunca recebem uma aba. Se sua igreja tiver configurado mais abas do que cabem, as restantes não se perdem: elas aparecem na página **Mais** e na seção **Mais de** do Início. Os administradores da igreja definem a ordem das abas no B1 Admin, em **Mobile → Navegação**.

## No Computador

Em telas maiores, como computadores ou tablets grandes, a barra de abas inferior é substituída por um cabeçalho no topo da tela, na cor da sua igreja. Ele mostra o nome da igreja (clique nele para voltar ao Início), **Início**, até cinco das abas que sua igreja configurou e **Mais**, com o sino e a foto do seu perfil à direita. Ao abrir uma tela de detalhes, um link **Voltar** aparece acima do conteúdo da página.

## A Página Mais {#the-more-page}

Ao tocar em **Mais**, abre-se a página Mais em `/mobile/more`. Ela contém:

- Seu nome e foto, com um link **Editar Perfil** -- veja [Editando Seu Perfil](./editing-your-profile.md)
- Todas as abas que sua igreja configurou, na ordem, sob o nome da sua igreja. Links para sites externos abrem em uma nova aba do navegador.
- Uma seção **Conta** com:
  - **Eu** -- sua página pessoal (somente para quem está conectado)
  - **Aparência** -- alterna entre **Modo Claro** e **Modo Escuro**
  - **Portal Administrativo** -- aparece somente se você tiver permissões de administrador na sua igreja; abre o B1 Admin em uma nova aba
  - **Instalar Aplicativo** -- abre as [instruções de instalação](./installing-pwa.md) em `/mobile/install` (oculto depois que o aplicativo estiver instalado)
- **Sair**, ou um botão **Entrar** se você não estiver conectado
- O nome da sua igreja e um link para a política de privacidade

## A Barra do Aplicativo

No celular, a barra no topo de cada tela mostra:

- O nome da sua igreja no Início e nas demais telas principais, ou uma seta de voltar quando você estiver em uma tela de detalhes. O título da tela aparece no topo da própria página.
- Um ícone de **sino** para notificações e mensagens, com um indicador para itens não lidos -- veja [Notificações e Mensagens](#notifications-and-messages) abaixo
- Sua **foto de perfil**, que abre seu perfil em `/mobile/profileEdit` -- veja [Editando Seu Perfil](./editing-your-profile.md)

O sino e a foto de perfil só aparecem quando você está conectado.

## Notificações e Mensagens {#notifications-and-messages}

Ao tocar no sino, abre-se um painel com duas seções:

- **Mensagens** -- suas conversas privadas mais recentes, com um link **Nova mensagem** para iniciar uma
- **Notificações** -- suas notificações mais recentes, com um selo **Novo** nas não lidas. Toque em uma notificação para ir ao grupo, plano ou conversa de onde ela veio.

Cada seção mostra quantos itens não lidos ela tem. Toque em **Ver todas** na parte inferior para abrir sua caixa de entrada completa em `/mobile/notifications`.

## Páginas com Seções

As páginas de detalhes -- um grupo, um plano, sua página Eu, as telas de Planos e Contribuições -- são organizadas como uma única página de seções, em vez de abas. Cada seção mostra uma breve prévia, e um link no cabeçalho da seção (como **Todos os membros**, **Todos os eventos** ou **Ordem completa do culto**) abre a lista completa. Um link **Voltar para** no topo dessa visualização retorna você à página de onde veio.

## A Página Eu

**Eu** (`/mobile/me`) é o seu centro pessoal. Ela mostra seu nome e foto, com os botões **Editar Perfil** e **Configurações** ([preferências de notificação](./notification-preferences.md)), e depois o que está previsto para você -- escalas de serviço, inscrições em eventos e eventos de grupos -- seguido da sua família, dos seus grupos, das suas [contribuições](../giving/) neste ano, das suas [inscrições](../events/my-registrations.md) e das suas notificações e mensagens recentes. Veja [A Página Eu](./me-page) para mais detalhes.

Se você não estiver conectado, a página Eu mostra um botão **Entrar**.

## Instalando na Tela Inicial

O portal do membro é um Progressive Web App. Acesse `/mobile/install` (ou escolha **Instalar Aplicativo** na página Mais) para ver instruções passo a passo para o seu dispositivo. Depois de instalado, ele abre em tela cheia a partir da tela inicial, sem a interface do navegador. Veja [Instalando como Aplicativo (PWA)](./installing-pwa.md).

## O Site Público da Sua Igreja

Fora do portal do membro, o site público da sua igreja tem seu próprio menu de navegação no cabeçalho, com links configurados pelos seus administradores -- páginas como [sermões](../content/sermons.md), a [Bíblia](../content/bible.md), [transmissões ao vivo](../content/live-streaming.md) e uma lista pública de grupos. No celular, esses links ficam atrás do ícone de menu hambúrguer no canto superior direito do cabeçalho.

:::info
As abas e ferramentas que você vê variam de igreja para igreja. Os administradores controlam quais seções ficam visíveis para os membros pelo B1 Admin; por isso, se você não encontrar um recurso descrito aqui, sua igreja pode não tê-lo ativado.
:::
