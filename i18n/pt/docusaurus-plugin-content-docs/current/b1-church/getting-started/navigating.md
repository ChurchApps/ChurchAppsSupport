---
title: "Navegando no B1App"
---

# Navegando no B1App

<div class="article-intro">

O portal de membros em B1.church é um aplicativo web primeiro para telefone que fica sob `/mobile`. Funciona em qualquer navegador e pode ser instalado na sua tela inicial. Esta página explica o painel inicial, a barra de guias inferior, o menu Mais e a página Me.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa estar [conectado](./logging-in.md) para ver suas informações pessoais. Visitantes desconectados ainda podem navegar conteúdo público e são oferecidos um botão **Entrar** onde um recurso requer uma conta.

</div>

## Home

Abrir `https://yourchurchname.b1.church/mobile` leva você ao painel **Home** em `/mobile/dashboard`. Home é a página de desembarque do portal de membros e mostra:

- Uma saudação com seu nome
- O versículo do dia
- Um cartão em destaque para o que sua igreja destacou
- Uma grade **Explorar** das ferramentas que sua igreja ativou -- grupos, doações, check-in, sermões, planos, e muito mais

Tocar em um cartão no Explorar abre essa ferramenta. Se sua igreja tem mais ferramentas do que cabem no painel, o último cartão é **Mais**, que abre a lista completa em `/mobile/more`.

Se você está desconectado, Home mostra um título **Bem-vindo** no lugar da saudação, com um aviso curto ("Faça login para ver seus grupos, doações e muito mais.") e um botão **Entrar**. Sua igreja pode reescrever este aviso ou ocultá-lo -- veja [Configurações de App Móvel](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando está oculto, você ainda pode entrar no menu ou na guia Me.

## A Barra de Guias Inferior

Em um telefone, uma barra de guias é fixada na parte inferior da tela:

- **Home** -- sempre a primeira guia
- Até três das guias que sua igreja configurou
- **Mais** -- abre o menu de navegação

Se sua chiesa configurou mais de três guias, o resto não é perdido: eles aparecem no menu **Mais** e na grade Explorar do painel. Os administradores da iglesia definem a ordem das guias no B1 Admin em **Mobile → Navigation**.

## O Menu

Tocar em **Mais** abre o menu de navegação. Em um tablet ou desktop o mesmo menu está sempre visível ao longo do lado esquerdo da tela. Ele contém:

- Seu nome e foto, com um atalho **Editar Perfil** -- veja [Editando Seu Perfil](./editing-your-profile.md)
- **Home** e **Me**
- **Portal de Administrador** -- apenas mostrado se você tem permissões de administrador em sua igreja; ele abre B1 Admin
- Cada guia que sua chiesa configurou, em ordem
- **Instalar App** -- abre as [instruções de instalação](./installing-pwa.md) em `/mobile/install`
- Um botão de alternância de modo claro/escuro
- **Entrar** ou **Logout**
- O nome da sua iglesia e um link para a política de privacidade

## A Barra de Aplicativo

A barra no topo de cada tela mostra:

- O título da tela, ou o nome da sua iglesia em Home
- Uma seta voltar quando você detalhou uma tela de detalhes
- Um ícone de **sino** para notificações e mensagens, com um distintivo para itens não lidos
- Sua **foto de perfil**, que abre seu perfil em `/mobile/profileEdit` -- veja [Editando Seu Perfil](./editing-your-profile.md)

## A Página Me

**Me** (`/mobile/me`) é seu centro pessoal. Lista atalhos para seu perfil, [preferências de notificação](./notification-preferences.md), mensagens, [doações](../giving/), e [registros](../events/my-registrations.md), seguido pelo que vem por aí para você -- atribuições de serviço, registros de evento e eventos de grupo -- e suas notificações mais recentes. Veja [A Página Me](./me-page) para detalhes.

Se você está desconectado, a página Me mostra um botão **Entrar** em vez disso.

## Instalando na Sua Tela Inicial

O portal de membros é um Progressive Web App. Visite `/mobile/install` (ou escolha **Instalar App** no menu) para instruções passo a passo para seu dispositivo. Após instalado, ele abre em tela cheia a partir da sua tela inicial sem interface do navegador. Veja [Instalando como um App (PWA)](./installing-pwa.md).

## Site Público da Sua Igreja

Fora do portal de membros, o site público da sua iglesia tem seu próprio cabeçalho de navegação com links que seus administradores configuraram -- páginas como [sermões](../content/sermons.md), a [Bíblia](../content/bible.md), [transmissão ao vivo](../content/live-streaming.md), e uma lista de grupo público. Em um telefone esses links ficam atrás do ícone de hambúrguer no topo direito do cabeçalho.

:::info
As guias e ferramentas que você vê variam por iglesia. Os administradores controlam quais seções são visíveis aos membros através do B1 Admin, portanto, se você não vir um recurso descrito aqui, sua iglesia pode não tê-lo ativado.
:::
