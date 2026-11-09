---
title: "Aprovações de calendário"
description: "Analise as solicitações pendentes de reserva de salas e recursos no B1 Admin, verifique conflitos, aprove ou rejeite e consulte decisões anteriores em Histórico."
---

# Aprovações de calendário

<div class="article-intro">

A página de Aprovações é onde os administradores analisam e tomam providências sobre as solicitações pendentes de reserva de salas e recursos, bem como sobre os eventos do calendário que precisam de aprovação antes de serem publicados.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure salas ou recursos com um **Grupo de aprovação** em [Salas e recursos](./rooms-resources.md)
- Você precisa da permissão **Administrador de calendários** ou da permissão **content.edit**

</div>

## Abrindo as aprovações

No B1 Admin, abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Calendários** e clique em **Aprovações**. As solicitações de reserva pendentes e os eventos aguardando análise aparecem aqui. Use os botões **Pendentes** e **Histórico** no topo para alternar entre as solicitações que ainda precisam de uma decisão e as que já foram decididas.

## Solicitações de reserva

Quando um grupo cria um evento e solicita uma sala ou um recurso, a solicitação aparece na seção **Solicitações de salas e recursos**. Cada linha mostra:

- O nome do evento e a data/hora
- A sala ou o recurso solicitado (com a quantidade, no caso de recursos com várias unidades)
- **Solicitado por**, a pessoa que fez o pedido, com link para o registro dela
- Um selo de status indicando se a solicitação tem conflitos

### Indicadores de conflito

Se uma solicitação se sobrepõe a outra reserva ou bloqueio para a mesma sala ou recurso, o status mostra um selo **Conflitos**; passe o mouse sobre ele para ver os detalhes. Solicitações sem sobreposição mostram **Sem conflitos**. Analise com cuidado as solicitações conflitantes antes de aprovar qualquer uma delas.

### Aprovando ou rejeitando

Clique em **Aprovar** ou **Rejeitar** em qualquer solicitação de reserva (ao rejeitar, o sistema pede confirmação antes). O solicitante é notificado da decisão. As reservas aprovadas ficam bloqueadas para aquela sala ou recurso durante o evento; as reservas rejeitadas liberam o horário para outras pessoas.

Ao clicar em **Aprovar**, abre-se a caixa de diálogo **Aprovar reserva**, para que você possa publicar o evento na mesma etapa:

1. Marque **Publicar no calendário público** para tornar o evento público no calendário do grupo. Deixe desmarcado para aprovar a reserva sem alterar a visibilidade do evento.
2. Depois que **Publicar no calendário público** estiver marcado, você pode, opcionalmente, escolher um calendário personalizado em **Adicionar também ao calendário** para incluir o evento em um dos seus [calendários personalizados](./curated-calendar.md). Deixe em **Nenhum** para pular essa etapa. (Esta opção só aparece se você tiver a permissão **content.edit**.)
3. Clique em **Aprovar**.

## Eventos pendentes

Se o fluxo de calendário da sua igreja exige aprovação de eventos antes que eles fiquem visíveis ao público, os eventos pendentes aparecem na seção **Solicitações de eventos**. Clique em **Aprovar** para publicar um evento no calendário, ou em **Rejeitar** para avisar quem enviou que são necessárias alterações.

:::tip
Configure um Grupo de aprovação em uma sala, em [Salas e recursos](./rooms-resources.md), para exigir aprovação para essa sala. Os grupos com acesso poderão então solicitar a sala ao criar eventos, e essas solicitações chegarão a esta página.
:::

## Histórico

As solicitações aprovadas e rejeitadas permanecem na página. Clique em **Histórico** no topo de Aprovações para vê-las; clique em **Pendentes** para voltar às solicitações abertas.

- **Solicitações de salas e recursos** lista cada reserva decidida, com o evento, a sala ou o recurso, **Solicitado por**, um selo **Aprovado** ou **Rejeitado** e **Decidido**, que mostra quem tomou a decisão e em que data. As solicitações decididas mais recentemente aparecem primeiro.
- **Solicitações de eventos** lista cada evento decidido com sua descrição, **Solicitado por** e um selo **Aprovado** ou **Rejeitado**. Quem decidiu sobre uma solicitação de evento, e quando, não é registrado, por isso essa coluna não é exibida para eventos.

Clique em um nome em **Solicitado por** para abrir o registro dessa pessoa.

## Artigos relacionados

- [Salas, recursos e agendamento](./rooms-resources.md) — configure salas e recursos reserváveis
- [Criando calendários](./creating-calendars.md) — gerencie calendários e eventos
