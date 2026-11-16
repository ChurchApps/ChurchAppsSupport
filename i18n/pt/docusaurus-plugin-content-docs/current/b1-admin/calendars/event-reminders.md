---
title: "Lembretes de Eventos"
description: "Configure lembretes de eventos no B1 Admin por notificação push, e-mail e SMS, escolhendo o momento, os destinatários e uma mensagem personalizada para que as pessoas sejam avisadas a tempo."
---

# Lembretes de Eventos {#event-reminders}

<div class="article-intro">

Os lembretes de eventos avisam automaticamente as pessoas certas antes de um evento -- por exemplo, "Não perca! A oficina de saúde começa amanhã às 9:00." Você configura o lembrete uma única vez no evento, e o B1 o envia no horário programado por notificações push, e-mail e, se a sua igreja tiver o serviço de mensagens de texto configurado, mensagens SMS. Os membros podem controlar quais lembretes recebem nas suas próprias [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie o evento sobre o qual você quer lembrar as pessoas (veja [Criando Calendários](./creating-calendars.md))
- Para alcançar os inscritos, [habilite as inscrições](./creating-calendars.md) no evento
- Para alcançar um grupo inteiro, certifique-se de que o evento pertence a um [grupo](../groups/creating-groups.md) com membros

</div>

## Configurando um Lembrete {#setting-up-a-reminder}

Você configura os lembretes na seção **Lembretes** do evento. Expanda-a para ver as configurações.

- Ao **criar um novo evento**, expanda a seção **Lembretes** na parte inferior do editor **Novo Evento**; o lembrete é salvo quando você salva o evento.
- Para um **evento já existente**, use a seção **Lembretes** em qualquer um destes lugares e clique no botão **Salvar** dentro da seção: a caixa que se abre ao clicar no evento em um calendário, o editor **Editar Evento** ou a página de inscrições do evento (**Calendários > Inscrições** e, em seguida, o evento).

1. Ative **Habilitar lembretes**.
2. Escolha **Quando (até 3)** para enviar: **7 dias antes**, **3 dias antes**, **1 dia antes** e **No dia**. Depois que três forem escolhidos, os demais ficam desabilitados até que você desmarque um deles.
3. Defina o **Horário** em que o lembrete deve ser enviado (o padrão é **9:00**, no [fuso horário](../settings/church-settings.md#time-zone) da sua igreja).
4. Escolha **Quem** deve ser lembrado (veja [Quem Recebe o Lembrete](#who-gets-reminded) abaixo).
5. Opcionalmente, adicione uma **Mensagem (opcional)**. Deixe em branco para usar o texto padrão ou escreva a sua própria -- você pode incluir `{{eventTitle}}`, que será substituído pelo nome do evento.
6. Escolha os **Canais**: **Push** (notificação) e **E-mail** (ambos ativados por padrão) e, se a sua igreja tiver um [provedor de mensagens de texto](../settings/church-settings.md#texting) conectado, **SMS**.
7. Clique em **Salvar** (ou salve o novo evento).

Para interromper os lembretes de um evento, desative **Habilitar lembretes** e salve.

### Enviando um Lembrete Agora {#sending-a-reminder-now}

Em um evento já salvo, clique em **Enviar agora** ao lado de **Salvar** para enviar o lembrete imediatamente -- por exemplo, após uma mudança de última hora. Ele usa as configurações salvas e vai para as mesmas pessoas, considerando a próxima data do evento. Em seguida, o B1 mostra quantas pessoas foram alcançadas, como **Enviado para 12 pessoas**. Seus lembretes programados continuam sendo enviados conforme o planejado.

**Enviar agora** só está disponível depois que os lembretes são ativados e salvos, então salve primeiro quaisquer alterações. Se o lembrete incluir **SMS**, você também precisa de permissão para enviar mensagens de texto.

Em um evento já salvo, uma **prévia ao vivo** mostra aproximadamente quantas pessoas serão lembradas, quantos participantes não podem ser alcançados e os próximos horários de envio programados, conforme você faz alterações -- assim você pode confirmar que o lembrete está correto antes de salvar. Um evento recém-criado não tem prévia até ser salvo.

## Quem Recebe o Lembrete {#who-gets-reminded}

A configuração **Quem** define para quem o lembrete é enviado:

- **Somente inscritos** -- Todas as pessoas inscritas no evento que estão vinculadas a um registro de pessoa. Esse é o padrão quando o evento tem inscrições habilitadas, para que o lembrete de um pequeno evento com inscrições nunca vá por engano para um grupo inteiro.
- **Responsáveis / somente inscritos** -- Um lembrete por inscrição (a pessoa que se inscreveu), em vez de um para cada integrante da família na inscrição.
- **Membros do grupo** -- Todas as pessoas do grupo do evento. Esse é o padrão quando o evento não usa inscrições.
- **Automático** -- Usa os inscritos quando as inscrições estão habilitadas; caso contrário, usa o grupo.

:::info
Convidados informados apenas pelo nome (sem um registro de pessoa vinculado) não podem receber lembretes, porque não há conta, dispositivo ou e-mail para onde enviar. A prévia informa quantos participantes se enquadram nesse caso, para que não haja surpresas. Membros que optaram por não receber comunicações também são ignorados.
:::

## Quando os Lembretes São Enviados {#when-reminders-are-sent}

- Os lembretes são disparados no **horário que você escolher**, no fuso horário local da sua igreja, em cada um dos intervalos selecionados.
- Se você **alterar a data ou o horário do evento**, os lembretes pendentes são reagendados automaticamente -- você não precisa editar o lembrete.
- Se você **excluir o evento** (ou cancelar uma única ocorrência de um evento recorrente), os lembretes pendentes são cancelados automaticamente.
- Eventos recorrentes são tratados automaticamente: cada próxima ocorrência recebe o seu próprio lembrete.

:::tip
Os lembretes são enviados **primeiro por push, com o e-mail como alternativa**. Se um membro tiver as notificações push ativadas, receberá um push; caso contrário, receberá um e-mail. Os membros escolhem quais canais querem para cada tipo de notificação nas suas [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md).
:::

## Lembretes por SMS {#text-reminders}

O canal **SMS** só aparece quando a sua igreja tem um provedor de mensagens de texto conectado. As mensagens são enviadas pelo provedor de mensagens de texto da sua igreja, e cada mensagem pode gerar custo para a igreja. Elas são enviadas além de qualquer lembrete por push ou e-mail, e somente para as pessoas que:

- Ativaram **Mensagens de texto** nas suas [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md), e
- Têm um número de celular no perfil.

Cada mensagem começa com o nome da sua igreja, é mantida em uma única mensagem de texto e termina com "Responda STOP para cancelar." Quem responder STOP deixa de receber mensagens de texto da sua igreja. Para que as respostas STOP cheguem ao B1, cole a **URL do webhook de STOP (entrada)** das suas [configurações de mensagens de texto](../settings/church-settings.md#texting) no webhook de mensagens recebidas do seu provedor.

## O Que os Membros Podem Controlar {#what-members-can-control}

Os lembretes sempre respeitam as [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md) de cada membro. Um membro pode:

- Desativar os **Lembretes de Eventos** para push, e-mail ou SMS, mantendo as outras notificações ativas.
- Ativar ou desativar os lembretes por SMS com **Mensagens de texto**.
- Definir **horas de silêncio**, para que as notificações não urgentes esperem até um horário razoável.

Você não pode sobrepor a escolha de um membro de não receber lembretes de eventos -- isso mantém o B1 em conformidade com as regras contra spam e mantém os membros no controle da própria caixa de entrada.

## Lembretes de Voluntários {#serving-reminders}

Voluntários escalados em uma escala recebem um **lembrete de atuação** separado, com os detalhes da escala e, quando ainda não responderam, os botões **Aceitar / Recusar** diretamente no e-mail. Esses lembretes são configurados no tipo de escala, e não em um evento do calendário, e também podem ser enviados por SMS -- veja [Lembretes para Voluntários](../serving/plans.md#volunteer-reminders) e [Voluntários do Domingo](../guides/sunday-volunteers.md) para saber como funcionam a escala de voluntários e os lembretes.

## Próximos Passos {#next-steps}

- [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md) -- o que os membros podem controlar
- [Guia de Inscrição em Eventos](../guides/event-registration.md) -- configure as inscrições para que os lembretes cheguem aos participantes
- [Criando Calendários](./creating-calendars.md) -- volte à configuração de calendários
