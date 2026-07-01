---
title: "Lembretes de Eventos"
---

# Lembretes de Eventos

<div class="article-intro">

Os lembretes de eventos notificam automaticamente as pessoas certas antes de um evento acontecer - por exemplo, "Não perca! O workshop de saúde começa amanhã às 9:00 AM." Você configura um lembrete uma vez no evento, e B1 o envia de acordo com a agenda através de notificações push e email. Os membros podem controlar quais lembretes recebem de suas próprias [Notification Preferences](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie o evento sobre o qual você quer lembrar as pessoas (veja [Creating Calendars](creating-calendars))
- Para atingir os participantes registrados, [ative o registro](creating-calendars) no evento
- Para atingir um grupo inteiro, certifique-se de que o evento pertence a um [group](../groups/creating-groups) com membros

</div>

## Configurando um Lembrete

Você configura lembretes na seção **Reminders** do evento.

- Quando você **criar um novo evento**, expanda a seção **Reminders** no editor de evento antes de salvar.
- Para um **evento existente**, abra a página **Registration Details** do evento (da seção **Registrations**) para adicionar ou alterar seu lembrete.

1. Ative **Enable reminders**.
2. Escolha **When** enviar. Escolha até três horários: **7 days before**, **3 days before**, **1 day before** e **Day of**.
3. Defina a **Time of day** em que o lembrete deve sair (o padrão é **9:00 AM**, no fuso horário local da sua igreja).
4. Escolha **Who** deve ser lembrado (veja [Who Gets Reminded](#who-gets-reminded) abaixo).
5. Opcionalmente adicione uma **Message**. Deixe em branco para usar a redação padrão, ou escreva a sua - você pode incluir `{{eventTitle}}` e será substituído pelo nome do evento.
6. Escolha os **Channels**: notificação **Push**, **Email** ou ambos.
7. Salve o evento.

À medida que você faz alterações, uma **visualização ao vivo** mostra aproximadamente quantas pessoas serão lembradas, quantos participantes não podem ser alcançados e os próximos horários de envio programados - para que você possa confirmar que o lembrete se parece correto antes de salvar.

## Quem Recebe Lembretes

A configuração **Who** controla para quem o lembrete vai:

- **Registrants only** — Todos registrados para o evento que estão vinculados a um registro de pessoa. Este é o padrão quando o evento tem registro habilitado, então um lembrete para um evento pequeno registrado nunca vai acidentalmente para um grupo inteiro.
- **Heads / registrants only** — Um lembrete por registro (a pessoa que se registrou), em vez de cada membro da família no registro.
- **Group members** — Todos no grupo do evento. Este é o padrão quando o evento não usa registro.
- **Auto** — Usa registrantes quando o registro está habilitado, caso contrário o grupo.

:::info
Convidados adicionados apenas por nome (sem um registro de pessoa vinculado) não podem receber um lembrete, porque não há conta, dispositivo ou email para enviar. A visualização informa quantos participantes se enquadram neste grupo para que não haja surpresas. Membros que optaram por não se comunicarem também são ignorados.
:::

## Quando os Lembretes São Enviados

- Os lembretes disparam no **horário que você escolher**, no fuso horário local da sua igreja, em cada um dos offsets que você selecionou.
- Se você **alterar a data ou hora do evento**, os lembretes pendentes são automaticamente reagendados — você não precisa editar o lembrete.
- Se você **deletar o evento** (ou cancelar uma única ocorrência de um evento recorrente), seus lembretes pendentes são automaticamente cancelados.
- Eventos recorrentes são tratados automaticamente: cada ocorrência futura obtém seu próprio lembrete.

:::tip
Os lembretes são enviados **push primeiro, com email como fallback**. Se um membro tiver notificações push habilitadas, receberá um push; se não, receberá um email. Os membros escolhem quais canais desejam por tipo de notificação em suas [Notification Preferences](../../b1-church/getting-started/notification-preferences).
:::

## O Que os Membros Podem Controlar

Os lembretes sempre respeitam as [Notification Preferences](../../b1-church/getting-started/notification-preferences) de cada membro. Um membro pode:

- Desativar **Event Reminders** para push ou email enquanto mantém outras notificações ativas.
- Definir **quiet hours** para que notificações não urgentes aguardem um horário razoável.

Você não pode anular a escolha de um membro de optar por não receber lembretes de eventos - isso mantém B1 em conformidade com as regras anti-spam e mantém os membros no controle de sua caixa de entrada.

## Lembretes de Serviço

Voluntários agendados em um plano recebem um **serving reminder** separado com os detalhes do plano e, quando ainda não responderam, botões **Accept / Decline** direto no email. Esses lembretes são configurados no tipo de plano em vez de em um evento de calendário - veja [Sunday Volunteers](../guides/sunday-volunteers) para saber como funcionam o agendamento e lembretes de voluntários.

## Próximos Passos

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) — O que os membros podem controlar
- [Event Registration Guide](../guides/event-registration) — Configure o registro para que os lembretes possam atingir os participantes
- [Creating Calendars](creating-calendars) — Voltar à configuração do calendário
