---
title: "Aprovações de Calendário"
---

# Aprovações de Calendário

<div class="article-intro">

A página Aprovações é onde administradores revisam e agem sobre solicitações de reserva de sala e recurso pendentes, bem como eventos de calendário que requerem aprovação antes de serem publicados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure salas ou recursos com um **Grupo de Aprovação** em [Salas & Recursos](rooms-resources)
- Você precisa da permissão **Calendars Admin** ou da permissão **content.edit**

</div>

## Abrindo Aprovações

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Calendários**, e clique em **Aprovações**. Solicitações de reserva pendentes e eventos aguardando revisão são listados aqui.

## Solicitações de Reserva

Quando um grupo cria um evento e solicita uma sala ou recurso, a solicitação aparece na seção **Solicitações de Sala & Recurso**. Cada linha mostra:

- O nome do evento e data/hora
- A sala ou recurso solicitado (com a quantidade, para recursos de múltiplas unidades)
- Um distintivo de status mostrando se a solicitação tem conflitos

### Indicadores de Conflito

Se uma solicitação se sobrepõe a outra reserva ou bloqueio para a mesma sala ou recurso, seu status mostra um distintivo **Conflitos**; passe o mouse sobre ele para ver os detalhes. Solicitações sem sobreposições mostram **Sem conflitos**. Revise solicitações conflitantes cuidadosamente antes de aprovar qualquer uma.

### Aprovando ou Rejeitando

Clique em **Aprovar** ou **Rejeitar** em qualquer solicitação de reserva (rejeitar pede que você confirme primeiro). O grupo solicitante é notificado da decisão. Reservas aprovadas são bloqueadas naquela sala ou recurso para o evento; reservas rejeitadas liberam o slot para outros.

Quando você clica em **Aprovar**, um diálogo **Aprovar reserva** abre para que você possa também publicar o evento no mesmo passo:

1. Marque **Publicar no calendário público** para tornar o evento público no calendário do seu grupo. Deixe desmarcado para aprovar a reserva sem mudar a visibilidade do evento.
2. Uma vez que **Publicar no calendário público** está marcado, você pode opcionalmente escolher um calendário selecionado de **Também adicionar ao calendário** para adicionar o evento a um dos seus [calendários selecionados](curated-calendar) também. Deixe definido para **Nenhum** para pular isso. (Esta opção apenas aparece se você tem a permissão **content.edit**.)
3. Clique em **Aprovar**.

## Eventos Pendentes

Se seu fluxo de trabalho de calendário requer aprovação de evento antes de eventos ficarem visíveis ao público, eventos pendentes aparecem na seção **Solicitações de Evento**. Clique em **Aprovar** para publicar um evento no calendário, ou em **Rejeitar** para notificar o solicitante de que mudanças são necessárias.

:::tip
Configure um Grupo de Aprovação em uma sala em [Salas & Recursos](rooms-resources) para requerer aprovação para aquela sala. Grupos com acesso podem então solicitar a sala ao criar eventos, e essas solicitações fluem para esta página.
:::

## Artigos Relacionados

- [Salas, Recursos & Agendamento](rooms-resources) — configure salas e recursos reserváveis
- [Criando Calendários](creating-calendars) — gerencie calendários e eventos
