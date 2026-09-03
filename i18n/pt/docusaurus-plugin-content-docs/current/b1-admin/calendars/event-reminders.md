---
title: "Lembretes de evento"
---

# Lembretes de evento

<div class="article-intro">

Lembretes de evento notificam automaticamente as pessoas certas antes de um evento acontecer -- por exemplo, "Não perca! O workshop de saúde começa amanhã às 9h". Você configura um lembrete uma vez no evento e B1 o envia conforme agendado através de notificações push e email. Os membros podem controlar quais lembretes recebem de suas próprias [Preferências de Notificação](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie o evento que você deseja lembrar as pessoas (veja [Criando Calendários](creating-calendars))
- Para alcançar inscritos, [ative o registro](creating-calendars) no evento
- Para alcançar um grupo inteiro, certifique-se de que o evento pertence a um [grupo](../groups/creating-groups) com membros

</div>

## Configurando um lembrete

Você configura lembretes na seção **Lembretes** do evento.

- Quando você **cria um novo evento**, expanda a seção **Lembretes** no editor de eventos antes de salvar.
- Para um **evento existente**, abra a página **Detalhes do Registro** do evento (na seção **Registros**) para adicionar ou alterar seu lembrete.

1. Ative **Ativar lembretes**.
2. Escolha **Quando** enviar. Escolha até três tempos: **7 dias antes**, **3 dias antes**, **1 dia antes**, e **Dia do evento**.
3. Defina a **Hora do dia** que o lembrete deve sair (o padrão é **9:00 AM**, no fuso horário local da sua igreja).
4. Escolha **Quem** deve ser lembrado (veja [Quem recebe lembretes](#quem-recebe-lembretes) abaixo).
5. Opcionalmente adicione uma **Mensagem**. Deixe em branco para usar a redação padrão ou escreva a sua própria -- você pode incluir `{{eventTitle}}` e será substituído pelo nome do evento.
6. Escolha os **Canais**: notificação **Push**, **Email** ou ambos.
7. Salve o evento.

Conforme você faz alterações, uma **visualização ao vivo** mostra aproximadamente quantas pessoas serão lembradas, quantos inscritos não podem ser alcançados e as próximas vezes de envio programadas -- para que você possa confirmar que o lembrete ficará correto antes de salvar.

## Quem recebe lembretes

A configuração **Quem** controla para quem o lembrete vai:

- **Apenas inscritos** -- Todos registrados para o evento vinculados a um registro de pessoa. Este é o padrão quando o evento tem registro ativado, então um lembrete para um evento pequeno registrado nunca acidentalmente vai para um grupo inteiro.
- **Apenas chefes / inscritos** -- Um lembrete por inscrição (a pessoa que se inscreveu), em vez de cada membro da família na inscrição.
- **Membros do grupo** -- Todos no grupo do evento. Este é o padrão quando o evento não usa registro.
- **Automático** -- Usa inscritos quando o registro está ativado, caso contrário, o grupo.

:::info
Convidados adicionados apenas por nome (sem um registro de pessoa vinculado) não podem receber um lembrete, porque não há conta, dispositivo ou email para enviar. A visualização mostra quantos inscritos se encaixam neste grupo para não haver surpresas. Os membros que optaram por não se comunicar também são ignorados.
:::

## Quando lembretes são enviados

- Os lembretes disparam na **hora do dia que você escolher**, no fuso horário local da sua igreja, em cada um dos deslocamentos que você selecionou.
- Se você **alterar a data ou hora do evento**, os lembretes pendentes são automaticamente reagendados -- você não precisa editar o lembrete.
- Se você **excluir o evento** (ou cancelar uma única ocorrência de um evento recorrente), seus lembretes pendentes são automaticamente cancelados.
- Os eventos recorrentes são tratados automaticamente: cada ocorrência futura recebe seu próprio lembrete.

:::tip
Os lembretes são enviados **push primeiro, com email como fallback**. Se um membro tiver notificações push ativadas, receberá um push; caso contrário, receberá um email. Os membros escolhem quais canais desejam por tipo de notificação em suas [Preferências de Notificação](../../b1-church/getting-started/notification-preferences).
:::

## O que os membros podem controlar

Os lembretes sempre respeitam as [Preferências de Notificação](../../b1-church/getting-started/notification-preferences) de cada membro. Um membro pode:

- Desativar **Lembretes de Evento** para push ou email enquanto mantém outras notificações ativadas.
- Definir **horários silenciosos** para que notificações não urgentes esperem até um horário razoável.

Você não pode substituir a escolha de um membro de optar por não receber lembretes de eventos -- isso mantém B1 em conformidade com regras anti-spam e mantém os membros no controle de sua caixa de entrada.

## Lembretes de serviço

Os voluntários agendados em um plano recebem um **lembrete de serviço** separado com os detalhes do plano e, quando ainda não responderam, botões **Aceitar / Recusar** direto no email. Esses lembretes são configurados no tipo de plano em vez de em um evento de calendário -- veja [Voluntários no Domingo](../guides/sunday-volunteers) para como funcionam a programação e os lembretes de voluntários.

## Próximas etapas

- [Preferências de Notificação](../../b1-church/getting-started/notification-preferences) -- O que os membros podem controlar
- [Guia de Registro de Evento](../guides/event-registration) -- Configure o registro para que os lembretes possam alcançar os inscritos
- [Criando Calendários](creating-calendars) -- Retorne à configuração de calendário
