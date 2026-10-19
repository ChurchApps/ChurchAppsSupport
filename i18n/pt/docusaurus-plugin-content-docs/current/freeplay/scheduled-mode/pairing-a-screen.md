---
title: "Parear uma Tela"
---

# Parear uma Tela

<div class="article-intro">

Para colocar uma TV em um calendário, pareie-a com o **FreePlay Admin**. A TV mostra um código de quatro letras. Você digita esse código em [admin.freeplay.church](https://admin.freeplay.church) e escolhe o grupo de telas que deve seguir o calendário dela. Você só precisa fazer isso uma vez por TV.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale e abra o FreePlay na TV. Consulte [Primeiros Passos](../getting-started/)
- Tenha um login ChurchApps para a sua igreja, para que possa entrar no FreePlay Admin
- Opcionalmente, [monte uma playlist](./building-playlists) e [agende-a](./scheduling-the-calendar) antes, para que a TV já tenha algo para reproduzir

</div>

## Mostrando o Código na TV

1. Na TV, abra **Settings** na parte inferior da barra lateral.
2. Selecione **Pair to a calendar**. A linha mostra **Not paired** quando a TV ainda não está pareada.
3. A tela **Pair this screen** mostra um QR code e um código de pareamento de quatro letras, com a mensagem **Scan with your phone, or go to freeplay.church/pair and enter this code**.
4. Abaixo do código, **Waiting for confirmation** pulsa enquanto o FreePlay aguarda que você conclua o pareamento.

O código vale por 15 minutos, e uma contagem regressiva abaixo dele mostra quanto tempo resta. Quando o tempo acabar, o FreePlay mostra um novo código automaticamente. Você também pode selecionar **Generate New Code** para obter um novo, ou **Cancel** para voltar às Configurações.

## Pareando no FreePlay Admin

1. Escaneie o QR code com o seu celular, ou acesse **freeplay.church/pair** em qualquer computador ou celular. Faça login se for solicitado. O FreePlay Admin abre o formulário **Pair screen** com o código já preenchido.
   - Você também pode abrir o formulário por conta própria. Acesse **Screens** no FreePlay Admin e clique em **Pair screen**.
2. Confira o **Pairing code**. São as quatro letras que aparecem na TV.
3. Digite um **Label** para diferenciar esta TV das outras, por exemplo "Lobby left". Isso é opcional.
4. Em **Group**, escolha o grupo de telas cujo calendário esta TV deve seguir. Para criar um novo, escolha **＋ New group…** e digite um **New group name**.
5. Em **Mode**, deixe **Scheduled** selecionado. A TV reproduzirá de acordo com o calendário do grupo, sem intervenção.
6. Clique em **Pair**.

A TV mostra **Connected!** e depois **Loading your schedule...**. Ela baixa o que está agendado e começa a reproduzir. Consulte [Reprodução Agendada na TV](./scheduled-playback).

:::info
Se o FreePlay Admin disser **That code didn't match a TV**, confira o código na tela da TV. Se ele tiver expirado, use o novo código que a TV está mostrando agora.
:::

### Agendado vs. Manual

A configuração **Mode** tem duas opções:

- **Scheduled** — Reproduz de acordo com o calendário do grupo, sem que ninguém precise pressionar Start.
- **Manual** — Alguém escolhe o conteúdo com o controle remoto. Uma tela manual ainda aparece na sua lista de **Screens**, mas não segue um calendário, então o campo **Group** fica desativado.

Você pode trocar o modo de uma tela depois, em **Edit** na [página de Telas](./managing-screens).

## Pareando com um Plano de Culto

O código da tela **Pair this screen** também funciona no B1 Admin. Se você digitá-lo ali e escolher um tipo de plano em **Show Plans For**, a TV seguirá esse tipo de plano no [Modo Plano](../plan-mode/) em vez de um calendário. Consulte [Pareando o Seu Dispositivo](../plan-mode/device-pairing).

## Alterando ou Desparear pela TV {#changing-or-unpairing-from-the-tv}

Depois que a TV estiver pareada, a linha **Pair to a calendar** em **Settings** mostra o nome do grupo de telas que ela segue. Selecione a linha para abrir o diálogo **Paired to**, que tem três opções:

- **Keep** — Fecha o diálogo. Nada muda.
- **Unpair** — Deixa de seguir um agendamento. O FreePlay abre a tela **Content Providers**.
- **Pair to a different calendar** — Desparear e depois mostrar um novo código de pareamento para parear a TV novamente.

:::warning
Desparear remove os arquivos que o FreePlay baixou para aquele calendário.
:::

## Desparear pelo FreePlay Admin

1. Acesse **Screens** e clique no nome (label) da tela.
2. Clique em **More** e depois em **Unpair**.
3. Clique em **Unpair** novamente para confirmar.

A TV volta a mostrar um código de pareamento. Pareie-a novamente quando quiser.

## Artigos Relacionados

- **[Gerenciando Telas e Grupos](./managing-screens)** — Renomeie uma tela, mova-a para outro grupo ou verifique seus downloads
- **[Agendando o Calendário](./scheduling-the-calendar)** — Decida o que as telas do grupo reproduzem
- **[Escolhendo um Modo de Pareamento](../getting-started/pairing-modes)** — Compare o Scheduled Mode com o Plan Mode e a navegação em provedores por conta própria
