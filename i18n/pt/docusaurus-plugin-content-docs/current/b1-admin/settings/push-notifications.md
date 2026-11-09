---
title: "Notificações push"
description: "Envie ou agende notificações push para todos com o aplicativo da sua igreja ou para um grupo pelo B1 Admin, e depois edite, envie, cancele ou limpe as notificações."
---

# Notificações push

<div class="article-intro">

A página **Notificações push**, em **Mobile**, permite enviar uma notificação push a todos que usam o aplicativo da sua igreja, ou aos membros de um grupo, imediatamente ou em um horário escolhido. Ela lista o que está agendado, para que você possa editar, enviar ou cancelar uma notificação antes do envio, e mostra um histórico das notificações recentes que você pode limpar.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Para enviar para **Todos com o aplicativo**, você precisa de permissão para editar conteúdo. Para enviar a um grupo, você precisa de permissão para editar membros de grupos. Veja [Funções e permissões](./roles-permissions.md).
- Os membros só recebem pushes depois de [instalar o aplicativo da sua igreja](../../b1-church/getting-started/installing-pwa.md) e permitir notificações.

</div>

## Abrindo a página

No B1 Admin, vá em **Mobile** e clique em **Notificações push**. A página tem um cartão **Agendadas** e um cartão **Recentes**. Os horários da página são mostrados no fuso horário da igreja (ou no do seu computador, se a igreja não tiver um definido), que é indicado acima da lista de agendadas.

## Enviando ou agendando uma notificação

1. Clique em **Enviar notificação**.
2. Escolha o **Público**: **Todos com o aplicativo** ou um dos seus grupos. Você só vê as opções que as suas permissões permitem.
3. O B1 mostra quantas pessoas o push vai alcançar -- por exemplo, *42 de 60 pessoas que usam o aplicativo têm push ativado* -- e quantas o têm desativado. Você fica de fora do seu próprio push.
4. Em **Quando**, escolha **Enviar agora**, ou **Agendar para depois** e escolha uma data e hora futuras em **Enviar em**.
5. Digite um **Título** (até 80 caracteres) e uma **Mensagem** (até 240 caracteres).
6. Opcionalmente, adicione um **Link para abrir ou URL do panfleto** (um endereço `https` ou um caminho do aplicativo, como `/mobile/groups`) para o push abrir, e uma **URL da imagem** (um endereço `https`) para mostrar junto com ele.
7. Clique em **Enviar notificação** (ou **Agendar notificação**).

Para um push agendado, as pessoas que ele alcança são verificadas de novo na hora do envio, de modo que quem entrar no grupo ou ativar as notificações nesse meio-tempo também será incluído.

Você também pode enviar a um grupo pela página do próprio grupo, com **Notificar**. Veja [Enviando notificações push aos membros do grupo](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
Quando um push não tem link, tocar nele abre a lista de notificações do aplicativo, no caso de um push para toda a igreja, ou a página do grupo, no caso de um push de grupo.
:::

## Gerenciando as notificações agendadas

O cartão **Agendadas** lista cada notificação que aguarda envio, com o horário de **Enviar em**, o **Público**, o título e a mensagem. Para cada uma, você pode:

- **Editar** -- alterar o público, o horário ou o texto, e depois clicar em **Salvar alterações**.
- **Enviar agora** -- enviar imediatamente, em vez de esperar.
- **Cancelar** -- impedir o envio. Uma notificação cancelada passa para o cartão Recentes.

Uma notificação que está sendo enviada neste momento mostra **Enviando** e não pode ser alterada.

## Notificações recentes

O cartão **Recentes** lista as notificações que já foram enviadas ou que pararam, com um **Status** para cada uma:

| Status | Significado |
|--------|-------------|
| **Enviada: X de Y** | O push foi enviado. *Y* pessoas poderiam recebê-lo, e *X* o recebeu como notificação push. |
| **Perdida (o horário de envio passou)** | A notificação estava mais de 30 minutos atrasada quando o B1 tentou enviá-la, por isso não foi enviada. |
| **Falhou** | O envio falhou três vezes. O erro aparece abaixo do status. |
| **Cancelada** | Alguém a cancelou antes do envio. |

Para remover uma notificação da lista, clique em **Remover** na linha dela. Para esvaziar a lista, clique em **Limpar tudo** no topo do cartão; isso remove todas as notificações enviadas, com falha e canceladas que você tem permissão para gerenciar. Ambas as ações pedem confirmação e não podem ser desfeitas. Remover uma notificação não a retira de quem já a recebeu.

:::info
Os membros que desativaram **Anúncios da igreja** nas suas [preferências de notificação](../../b1-church/getting-started/notification-preferences.md) não recebem esses pushes, sejam eles enviados a todos ou a um grupo.
:::

## Artigos relacionados

- [Configurações do aplicativo móvel](./mobile-app.md)
- [Membros do grupo](../groups/group-members.md)
- [Funções e permissões](./roles-permissions.md)
- [Preferências de notificação](../../b1-church/getting-started/notification-preferences.md)
