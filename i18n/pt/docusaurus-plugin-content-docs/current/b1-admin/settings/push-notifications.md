---
title: "Notificações push"
---

# Notificações push

<div class="article-intro">

A página **Notificações push** permite enviar uma notificação push para todos que usam o aplicativo B1.church da sua igreja, ou para um grupo, imediatamente ou em um horário que você programar. Ela também lista as notificações aguardando envio, para que você possa editar, enviar ou cancelar, e mostra como as recentes foram entregues.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Para enviar para **Todos com o aplicativo**, você precisa da permissão **Editar conteúdo**. Para enviar a um grupo, você precisa de **Editar membros do grupo**. Com qualquer uma das duas, a página **Notificações push** aparece em **Mobile**. Consulte [Funções e permissões](./roles-permissions.md).
- As notificações só chegam a membros que instalaram o [aplicativo B1.church](/docs/b1-church/getting-started/installing-pwa) e permitiram notificações.

</div>

## Abrindo a página

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **Notificações push** (`/mobile/notifications`).

Todos os horários da página são mostrados no fuso horário da sua igreja (ou no do seu navegador, se a igreja não tiver um definido). A página informa qual está usando, por exemplo, *"Os horários estão em America/Chicago."*

## Enviando ou programando uma notificação

1. Clique em **Enviar notificação** no topo da página.
2. Em **Público**, escolha **Todos com o aplicativo** ou um dos seus grupos.
3. Preencha a notificação:
   - **Título** *(obrigatório)* -- Um resumo curto, de até 80 caracteres.
   - **Mensagem** *(obrigatória)* -- O texto da notificação, de até 240 caracteres.
   - **Link para abrir ou URL do folheto** *(opcional)* -- Um caminho relativo do aplicativo (por exemplo, `/mobile/groups`) ou uma URL `https://` completa que abre quando a notificação é tocada. Sem link, uma notificação para a igreja toda abre a lista de notificações do membro, e uma notificação de grupo abre esse grupo.
   - **URL da imagem** *(opcional)* -- Uma imagem `https://` exibida junto com a notificação em dispositivos compatíveis.
4. Em **Quando**, escolha **Enviar agora**, ou **Programar para depois** e selecione uma data e hora em **Enviar em**. O horário precisa estar no futuro.
5. Clique em **Enviar notificação** (ou em **Programar notificação**, para uma notificação agendada).

Uma prévia na janela mostra como a notificação ficará e quantas pessoas podem recebê-la. Uma notificação enviada agora precisa de pelo menos uma pessoa alcançável. Uma notificação programada pode ser salva mesmo quando ninguém está alcançável ainda, porque os destinatários são verificados novamente no momento do envio.

Depois de programar, a janela confirma o horário de envio e lembra que você pode ver, editar ou cancelar a notificação em **Mobile > Notificações push**.

:::tip
Você também pode enviar ou programar uma notificação para um grupo a partir da página desse grupo, com o botão **Notificar**. Consulte [Enviando notificações push para membros do grupo](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Gerenciando notificações programadas

O cartão **Programadas** lista as notificações que aguardam envio, com o horário de **Enviar em**, o **Público** e o texto da **Notificação**. Cada uma tem três ações:

- **Editar** -- Altere o título, a mensagem, o link, a imagem ou o horário de envio. O público não pode ser alterado; cancele a notificação e crie uma nova.
- **Enviar agora** -- Envie imediatamente em vez de esperar. Confirme com **Enviar agora**.
- **Cancelar** -- Impede o envio. Confirme com **Cancelar notificação**.

Quando não há nada aguardando, o cartão diz *"Nada está programado."*

## Revisando notificações recentes

O cartão **Recentes** lista as notificações que foram enviadas ou interrompidas, com o horário de **Enviada em**, o **Público**, o texto da **Notificação** e a **Situação**:

- **Enviada: X de Y** -- Quantas das pessoas do público ela alcançou.
- **Falhou** -- O envio falhou, com o erro. O B1 tenta um envio com falha até três vezes antes de marcá-lo como falho.
- **Cancelada** -- Alguém a cancelou antes do envio.
- **Perdida (o horário de envio passou)** -- Não pôde ser enviada em até 30 minutos do horário programado, então foi ignorada em vez de enviada com atraso.

## Quem recebe uma notificação

- **Todos com o aplicativo** alcança cada pessoa da sua igreja que instalou o aplicativo B1.church com notificações permitidas, exceto quem a enviou.
- Uma notificação de grupo alcança os membros do grupo que têm o aplicativo com notificações permitidas.
- Membros que desativaram o push para **Avisos da igreja** em suas [Preferências de notificação](/docs/b1-church/getting-started/notification-preferences) não recebem notificações para a igreja toda.

## Artigos relacionados

- [Enviando notificações push para membros do grupo](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Configurações do aplicativo móvel](./mobile-app.md)
- [Lembretes de eventos](../calendars/event-reminders.md)
- [Preferências de notificação](/docs/b1-church/getting-started/notification-preferences)
