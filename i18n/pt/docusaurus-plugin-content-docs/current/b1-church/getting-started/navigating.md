---
title: "Navegando em B1App"
---

# Navegando em B1App

<div class="article-intro">

O portal de membros em B1.church é um aplicativo web otimizado para telefone que fica em `/mobile`. Funciona em qualquer navegador e pode ser instalado na sua tela inicial. Esta página explica o painel Home, a barra de abas inferior, o menu Mais e a página Meu Perfil.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa estar [conectado](./logging-in.md) para ver suas informações pessoais. Visitantes não conectados ainda podem navegar conteúdo público e são oferecidos um botão **Conectar** onde um recurso requer uma conta.

</div>

## Home

Abrir `https://yourchurchname.b1.church/mobile` leva você ao painel **Home** em `/mobile/dashboard`. Home é a página de destino do portal de membros e mostra:

- Uma saudação com seu nome
- O versículo do dia
- Um cartão em destaque para tudo o que sua igreja destacou
- Uma grade **Explorar** das ferramentas que sua igreja ativou -- grupos, doações, registro, sermões, planos, e mais

Tocar em um cartão em Explorar abre essa ferramenta. Se sua igreja tem mais ferramentas do que cabem no painel, o último cartão é **Mais**, que abre a lista completa em `/mobile/more`.

## A Barra de Abas Inferior

Em um telefone, uma barra de abas fica fixa na parte inferior da tela:

- **Home** -- sempre a primeira aba
- Até três das abas que sua igreja configurou
- **Mais** -- abre o menu de navegação

Se sua igreja configurou mais de três abas, o resto não é perdido: elas aparecem no menu **Mais** e na grade Explorar do painel. Os administradores da igreja definem a ordem das abas em B1 Admin sob **Mobile → Navegação**.

## O Menu

Tocar em **Mais** abre o menu de navegação. Em um tablet ou desktop o mesmo menu é sempre visível ao longo do lado esquerdo da tela. Contém:

- Seu nome e foto, com um atalho **Editar Perfil** — veja [Editando Seu Perfil](./editing-your-profile.md)
- **Home** e **Meu Perfil**
- **Portal do Admin** -- apenas mostrado se você tem permissões de administrador em sua igreja; abre B1 Admin
- Cada aba que sua igreja configurou, em ordem
- **Instalar App** -- abre as [instruções de instalação](./installing-pwa.md) em `/mobile/install`
- Um alternador de modo claro/escuro
- **Conectar** ou **Desconectar**
- O nome de sua igreja e um link para a política de privacidade

## A Barra de Apps

A barra na parte superior de cada tela mostra:

- O título da tela, ou o nome de sua igreja em Home
- Uma seta para trás quando você explorou para uma tela de detalhes
- Um ícone de **sino** para notificações e mensagens, com um badge para itens não lidos
- Sua **foto de perfil**, que abre seu perfil em `/mobile/profileEdit` — veja [Editando Seu Perfil](./editing-your-profile.md)

## A Página Meu Perfil

**Meu Perfil** (`/mobile/me`) é seu hub pessoal. Lista atalhos para seu perfil, [preferências de notificação](./notification-preferences.md), mensagens, [doações](../giving/), e [registros](../events/my-registrations.md), seguidos pelo que está vindo para você -- atribuições de serviço, registros de eventos e eventos de grupos -- e suas notificações mais recentes. Veja [A Página Meu Perfil](./me-page) para detalhes.

Se você está desconectado, a página Meu Perfil mostra um botão **Conectar** em vez disso.

## Instalando na Sua Tela Inicial

O portal de membros é um Aplicativo Web Progressivo. Visite `/mobile/install` (ou escolha **Instalar App** no menu) para instruções passo a passo para seu dispositivo. Depois de instalado, ele abre em tela inteira de sua tela inicial sem chrome do navegador. Veja [Instalando como um App (PWA)](./installing-pwa.md).

## O Site Público de Sua Igreja

Fora do portal de membros, o site público de sua igreja tem sua própria navegação de cabeçalho com links que seus administradores configuraram -- páginas como [sermões](../content/sermons.md), a [Bíblia](../content/bible.md), [transmissão ao vivo](../content/live-streaming.md), e uma lista de grupos públicos. Em um telefone esses links vivem atrás do ícone de menu no topo direito do cabeçalho.

:::info
As abas e ferramentas que você vê variam por igreja. Os administradores controlam quais seções são visíveis para membros através de B1 Admin, então se você não vir um recurso descrito aqui, sua igreja pode não tê-lo ativado.
:::
