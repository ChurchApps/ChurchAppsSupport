---
title: "Salas, Recursos e Agendamento"
description: "Configure salas, equipamentos, bloqueios e modelos de evento no B1 Admin para que os grupos possam solicitar reservas e você possa aprová-las, evitando agendamentos duplicados."
---

# Salas, Recursos e Agendamento

<div class="article-intro">

Salas e Recursos permitem controlar os espaços e equipamentos reserváveis da sua igreja. Quando um grupo ou equipe quer usar uma sala ou pegar emprestado um recurso para um evento, pode solicitá-lo pelo B1 -- e você pode aprovar ou recusar essas solicitações para evitar agendamentos duplicados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **Editar Conteúdo**
- Configure os [grupos](../groups/creating-groups.md) cujos membros vão enviar solicitações de reserva

</div>

## Abrindo Salas e Recursos {#opening-rooms--resources}

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Calendários** e clique em **Salas e Recursos**. A página tem quatro abas: **Salas**, **Recursos**, **Bloqueios** e **Modelos**. O botão de adicionar no topo da página muda conforme a aba selecionada, e uma caixa **Localizar** permite filtrar a lista atual.

## Salas {#rooms}

Salas são espaços físicos que podem ser reservados junto com eventos do calendário -- um santuário, um salão de confraternização, uma sala de aula etc.

### Adicionando uma Sala {#adding-a-room}

1. Na aba **Salas**, clique em **Adicionar Sala** no topo da página.
2. Informe um **Nome da Sala**.
3. Opcionalmente, defina uma **Capacidade** (número máximo de pessoas) e uma **Descrição**. Ambas aparecem ao lado da sala quando as pessoas escolhem salas para um evento.
4. Defina um **Grupo de Aprovação** se as reservas precisarem de autorização. As reservas feitas por membros desse grupo são aprovadas automaticamente; as de qualquer outra pessoa ficam **Pendentes** até serem aprovadas na página de [Aprovações](./approvals.md), e os membros do grupo recebem um e-mail sobre as novas solicitações. Deixe em **Não precisa de aprovação** para aprovar todas as reservas automaticamente.
5. Clique em **Salvar**.

A lista de Salas mostra o **Nome da Sala**, a **Capacidade** e o **Grupo de Aprovação** de cada sala.

### Editando ou Excluindo uma Sala {#editing-or-deleting-a-room}

Passe o cursor sobre uma sala e clique em **Editar**, faça as alterações e clique em **Salvar**. Use **Excluir** para remover uma sala permanentemente.

## Recursos {#resources}

Recursos são itens que podem ser reservados junto com um evento -- equipamentos de áudio e vídeo, projetores, cadeiras, uma van etc.

### Adicionando um Recurso {#adding-a-resource}

1. Clique na aba **Recursos** e depois em **Adicionar Recurso**.
2. Informe um **Nome do Recurso** e, opcionalmente, uma **Descrição**.
3. Defina a **Quantidade** que você possui (por exemplo, 3 projetores). Cada evento reserva uma unidade, e o B1 avisa quando mais eventos no mesmo horário reservam o recurso do que você tem disponível.
4. Defina um **Grupo de Aprovação** se alguém precisar autorizar o empréstimo de recursos. Funciona da mesma forma que para as salas.
5. Clique em **Salvar**.

Edite ou exclua um recurso da mesma forma que uma sala.

## Bloqueios {#blockouts}

Os bloqueios impedem que salas ou recursos sejam reservados em determinados horários -- para reformas, períodos reservados ou manutenção.

### Adicionando um Bloqueio {#adding-a-blockout}

1. Clique na aba **Bloqueios** e depois em **Adicionar Bloqueio**.
2. Em **Aplica-se a**, escolha uma sala, um recurso ou **Todas as salas e recursos**.
3. Defina a data/hora de **Início** e de **Término** do bloqueio.
4. Opcionalmente, adicione um **Motivo**. Ele aparece no calendário de [Disponibilidade](./availability.md) como *Bloqueado: motivo*.
5. Clique em **Salvar**.

Eventos que reservem uma sala ou recurso bloqueado exibem um aviso de conflito no editor de eventos.

## Modelos de Evento {#event-templates}

Os modelos permitem salvar uma configuração de evento reutilizável -- título, descrição, duração, salas e recursos -- para que os eventos que você cria com frequência sejam configurados sempre da mesma forma.

### Adicionando um Modelo {#adding-a-template}

1. Clique na aba **Modelos** e depois em **Adicionar Modelo**.
2. Informe um **Nome do Modelo** (exibido ao escolher um modelo).
3. Preencha o **Título do Evento**, a **Descrição do Evento** e a **Duração (minutos)** a serem usados nos novos eventos.
4. Opcionalmente, escolha as **Salas** e os **Recursos** a reservar.
5. Clique em **Salvar**.

Ao criar um novo evento, escolha o modelo na caixa **Modelo** do editor de eventos para preencher o título, a descrição, as salas e os recursos, e para definir o horário de término com base na duração do modelo (defina primeiro o **Início**). Você ainda escolhe o **Grupo** do evento. A caixa **Modelo** só aparece quando existe pelo menos um modelo.

## Artigos Relacionados {#related-articles}

- [Calendário de Disponibilidade](./availability.md) — veja todas as reservas de uma vez e reserve salas ou recursos diretamente
- [Aprovações de Calendário](./approvals.md) — aprove ou recuse solicitações de reserva de salas e recursos
- [Criando Calendários](./creating-calendars.md) — configure os calendários de eventos
- [Criando Grupos](../groups/creating-groups.md) — configure os grupos que podem reservar salas e recursos
