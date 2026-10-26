---
title: "Lembretes de eventos"
---

# Lembretes de eventos

<div class="article-intro">

Os lembretes de eventos notificam automaticamente as pessoas certas antes de um evento acontecer -- por exemplo, "Não perca! A oficina de saúde começa amanhã às 9h00." Você configura um lembrete uma única vez no evento, e o B1 o envia no horário programado por notificações push, e-mail e, se a sua igreja tiver mensagens de texto configuradas, SMS. Os membros podem controlar quais lembretes recebem nas suas próprias [Preferências de notificação](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie o evento sobre o qual você quer lembrar as pessoas (consulte [Criando calendários](creating-calendars))
- Para alcançar os inscritos, [ative a inscrição](creating-calendars) no evento
- Para alcançar um grupo inteiro, certifique-se de que o evento pertence a um [grupo](../groups/creating-groups) com membros

</div>

## Configurando um lembrete

Você configura os lembretes na seção **Lembretes** do evento.

- Ao **criar um novo evento**, expanda a seção **Lembretes** no editor de eventos antes de salvar.
- Para um **evento existente**, abra a página de **Detalhes da inscrição** do evento (a partir da seção **Inscrições**) para adicionar ou alterar o lembrete.

1. Ative **Ativar lembretes**.
2. Escolha **Quando** enviar. Selecione até três momentos: **7 dias antes**, **3 dias antes**, **1 dia antes** e **No dia**.
3. Defina a **Hora do dia** em que o lembrete deve ser enviado (o padrão é **9h00**, no [fuso horário](../settings/church-settings.md#time-zone) da sua igreja).
4. Escolha **Quem** deve ser lembrado (veja [Quem recebe o lembrete](#who-gets-reminded) abaixo).
5. Opcionalmente, adicione uma **Mensagem**. Deixe em branco para usar o texto padrão, ou escreva a sua -- você pode incluir `{{eventTitle}}` e ele será substituído pelo nome do evento.
6. Escolha os **Canais**: notificação **Push**, **E-mail** e, se a sua igreja tiver um [provedor de mensagens de texto](../settings/church-settings.md#texting) conectado, **SMS**.
7. Salve o evento.

Conforme você faz alterações, uma **prévia ao vivo** mostra aproximadamente quantas pessoas serão lembradas, quantos participantes não podem ser alcançados e os próximos horários de envio programados -- para que você possa confirmar que o lembrete está correto antes de salvar.

## Quem recebe o lembrete

A configuração **Quem** define para quem o lembrete é enviado:

- **Somente inscritos** -- Todas as pessoas inscritas no evento que estejam vinculadas a um registro de pessoa. Este é o padrão quando o evento tem inscrições ativadas, para que o lembrete de um pequeno evento com inscrições nunca seja enviado acidentalmente para um grupo inteiro.
- **Responsáveis / somente inscritos** -- Um lembrete por inscrição (a pessoa que se inscreveu), em vez de cada membro da família incluído na inscrição.
- **Membros do grupo** -- Todas as pessoas no grupo do evento. Este é o padrão quando o evento não usa inscrições.
- **Automático** -- Usa os inscritos quando as inscrições estão ativadas; caso contrário, usa o grupo.

:::info
Convidados adicionados apenas pelo nome (sem um registro de pessoa vinculado) não podem receber lembretes, porque não há conta, dispositivo ou e-mail para onde enviar. A prévia informa quantos participantes se enquadram nessa situação, para que não haja surpresas. Membros que optaram por não receber comunicações também são ignorados.
:::

## Quando os lembretes são enviados

- Os lembretes são disparados no **horário do dia que você escolher**, no fuso horário local da sua igreja, em cada um dos intervalos selecionados.
- Se você **alterar a data ou o horário do evento**, os lembretes pendentes são reagendados automaticamente -- você não precisa editar o lembrete.
- Se você **excluir o evento** (ou cancelar uma única ocorrência de um evento recorrente), os lembretes pendentes são cancelados automaticamente.
- Eventos recorrentes são tratados automaticamente: cada ocorrência futura recebe o seu próprio lembrete.

:::tip
Os lembretes são enviados **primeiro por push, com e-mail como alternativa**. Se um membro tiver as notificações push ativadas, ele receberá um push; se não, receberá um e-mail. Os membros escolhem quais canais querem para cada tipo de notificação em suas [Preferências de notificação](../../b1-church/getting-started/notification-preferences).
:::

## Lembretes por SMS

O canal **SMS** só aparece quando a sua igreja tem um provedor de mensagens de texto conectado. Os SMS são enviados pelo provedor de mensagens de texto da sua igreja, e cada mensagem pode custar algo para a igreja. Eles são enviados além de qualquer lembrete push ou por e-mail, e somente para pessoas que:

- Ativaram **Mensagens de texto** nas suas [Preferências de notificação](../../b1-church/getting-started/notification-preferences), e
- Têm um número de celular no seu perfil.

Cada SMS começa com o nome da sua igreja, é mantido em uma única mensagem de texto e termina com "Responda STOP para cancelar." Quem responder STOP deixa de receber mensagens de texto da sua igreja. Para que as respostas STOP cheguem ao B1, cole a **URL do webhook de STOP (entrada)** das suas [configurações de mensagens de texto](../settings/church-settings.md#texting) no webhook de mensagens recebidas do seu provedor.

## O que os membros podem controlar

Os lembretes sempre respeitam as [Preferências de notificação](../../b1-church/getting-started/notification-preferences) de cada membro. Um membro pode:

- Desativar os **Lembretes de eventos** para push, e-mail ou SMS, mantendo as demais notificações ativas.
- Ativar ou desativar os lembretes por SMS com **Mensagens de texto**.
- Definir **horas de silêncio** para que notificações não urgentes aguardem até um horário razoável.

Você não pode sobrepor a escolha de um membro de não receber lembretes de eventos -- isso mantém o B1 em conformidade com as regras antispam e mantém os membros no controle da própria caixa de entrada.

## Lembretes de voluntariado

Voluntários escalados em um plano recebem um **lembrete de escala** separado, com os detalhes do plano e, quando ainda não responderam, os botões **Aceitar / Recusar** diretamente no e-mail. Esses lembretes são configurados no tipo de plano, e não em um evento do calendário, e também podem ser enviados por SMS -- consulte [Lembretes para voluntários](../serving/plans#volunteer-reminders) e [Voluntários de domingo](../guides/sunday-volunteers) para saber como funcionam a escala de voluntários e os lembretes.

## Próximos passos

- [Preferências de notificação](../../b1-church/getting-started/notification-preferences) -- O que os membros podem controlar
- [Guia de inscrição em eventos](../guides/event-registration) -- Configure as inscrições para que os lembretes possam alcançar os inscritos
- [Criando calendários](creating-calendars) -- Voltar à configuração de calendários
