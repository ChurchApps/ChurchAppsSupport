---
title: "Aprovações de Calendário"
description: "Analise solicitações pendentes de reserva de salas e recursos no B1 Admin, verifique conflitos, aprove ou recuse e consulte decisões anteriores em Histórico."
---

# Aprovações de Calendário {#calendar-approvals}

<div class="article-intro">

A página de Aprovações é onde os administradores analisam e tomam providências sobre as solicitações pendentes de reserva de salas e recursos, bem como sobre os eventos do calendário que precisam de aprovação antes de serem publicados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure salas ou recursos com um **Grupo de Aprovação** em [Salas, Recursos e Agendamento](./rooms-resources.md)
- Você precisa da permissão **Editar Conteúdo**, ou de **Resolver Conflitos e Aprovações de Calendário** (ambas na seção **Conteúdo** de [Funções e Permissões](../settings/roles-permissions.md)). Sem **Editar Conteúdo**, o menu **Calendários** não é exibido -- nesse caso, abra as Aprovações pelo link de aprovações pendentes no **Painel** ou pelo e-mail de aprovação.

</div>

## Abrindo as Aprovações {#opening-approvals}

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Calendários** e clique em **Aprovações**. As solicitações de reserva pendentes e os eventos que aguardam análise são listados aqui. Use os botões **Pendentes** e **Histórico** no topo para alternar entre as solicitações que ainda precisam de uma decisão e as que já foram decididas.

## Solicitações de Reserva {#booking-requests}

Quando alguém reserva uma sala ou recurso que tem um **Grupo de Aprovação**, e essa pessoa não é membro desse grupo, a solicitação aparece na seção **Solicitações de Salas e Recursos**. (Reservas feitas por membros do Grupo de Aprovação são aprovadas automaticamente.) Os membros do Grupo de Aprovação também recebem um e-mail com a lista de novas solicitações pendentes e um link para esta página. Cada linha mostra:

- O nome e a data/hora do evento
- A sala ou recurso solicitado (com a quantidade, no caso de recursos com várias unidades)
- **Solicitado por**, a pessoa que pediu a reserva, com link para o registro dela
- Um selo de situação indicando se a solicitação tem conflitos

### Indicadores de Conflito {#conflict-indicators}

Se uma solicitação se sobrepõe a outra reserva ou bloqueio da mesma sala ou recurso, a situação exibe um selo **Conflitos**; passe o cursor sobre ele para ver os detalhes. Solicitações sem sobreposição mostram **Sem conflitos**. Analise com atenção as solicitações conflitantes antes de aprovar qualquer uma delas.

### Aprovando ou Recusando {#approving-or-rejecting}

Passe o cursor sobre uma solicitação de reserva e clique em **Aprovar** ou **Recusar**. O solicitante é notificado da decisão. As reservas aprovadas ficam bloqueadas para aquela sala ou recurso durante o evento; as reservas recusadas liberam o horário para outras pessoas.

Ao clicar em **Aprovar**, abre-se a caixa **Aprovar reserva**, na qual você também pode publicar o evento na mesma etapa:

1. Marque **Publicar no calendário público** para tornar o evento público no calendário do grupo. Deixe desmarcado para aprovar a reserva sem alterar a visibilidade do evento.
2. Quando **Publicar no calendário público** estiver marcado, você pode, opcionalmente, escolher um calendário curado em **Também adicionar ao calendário** para incluir o evento em um dos seus [calendários curados](./curated-calendar.md). Deixe em **Nenhum** para pular essa etapa. (Esta opção só aparece se você tiver a permissão **content.edit**.)
3. Clique em **Aprovar**.

Ao clicar em **Recusar**, abre-se a caixa **Recusar solicitação**:

1. Opcionalmente, digite um motivo em **Motivo (opcional)** (até 500 caracteres) -- por exemplo, *"O ginásio está reservado naquele fim de semana."*
2. Clique em **Recusar** para confirmar ou em **Cancelar** para manter a solicitação pendente.

O motivo é adicionado ao final da notificação que o solicitante recebe (por exemplo, *Sua solicitação de evento "Youth Lock-In" foi recusada: O ginásio está reservado naquele fim de semana.*), e os membros também o veem na página **Minhas Solicitações** no aplicativo B1. Deixe em branco para enviar apenas o aviso padrão.

## Eventos Pendentes {#pending-events}

Os eventos que os membros solicitam (por exemplo, em **Minhas Solicitações** no aplicativo B1) aparecem na seção **Solicitações de Eventos**, com a data, a **Descrição** e **Solicitado por**. Clique em **Aprovar** para publicar um evento no calendário ou em **Recusar** para avisar quem enviou que são necessárias alterações (você pode adicionar um motivo, como descrito acima). Clique em **Editar** para corrigir os detalhes da solicitação antes de decidir, ou em **Excluir** para removê-la. As solicitações de eventos enviadas pelo aplicativo não têm grupo; por isso, a lista **Grupo** da caixa de edição mostra **(sem grupo)** para elas, e você pode salvar as alterações sem escolher um.

:::tip
Configure um Grupo de Aprovação em uma sala em [Salas, Recursos e Agendamento](./rooms-resources.md) para exigir aprovação para essa sala. Os grupos com acesso podem então solicitar a sala ao criar eventos, e essas solicitações chegam a esta página.
:::

## Histórico {#history}

As solicitações aprovadas e recusadas permanecem na página. Clique em **Histórico** no topo de Aprovações para vê-las; clique em **Pendentes** para voltar às solicitações abertas.

- **Solicitações de Salas e Recursos** lista cada reserva decidida, com o evento, a sala ou recurso, **Solicitado por**, um selo **Aprovada** ou **Recusada** e **Decidido**, que mostra quem tomou a decisão e em que data. As solicitações decididas mais recentemente aparecem primeiro.
- **Solicitações de Eventos** lista cada evento decidido, com a descrição, **Solicitado por**, um selo **Aprovada** ou **Recusada** e **Decidido**, que mostra quem tomou a decisão e em que data. Solicitações de eventos mais antigas, decididas antes de o B1 começar a registrar essa informação, exibem um traço no lugar.

Você pode mudar de ideia pelo Histórico: uma solicitação aprovada tem a ação **Recusar** e uma solicitação recusada tem a ação **Aprovar**. Recusar uma solicitação de evento que você havia aprovado a remove do calendário público. As solicitações de eventos também podem ser editadas ou excluídas aqui.

Clique em um nome em **Solicitado por** para abrir o registro dessa pessoa.

## Artigos Relacionados {#related-articles}

- [Salas, Recursos e Agendamento](./rooms-resources.md) — configure salas e recursos reserváveis
- [Criando Calendários](./creating-calendars.md) — gerencie calendários e eventos
