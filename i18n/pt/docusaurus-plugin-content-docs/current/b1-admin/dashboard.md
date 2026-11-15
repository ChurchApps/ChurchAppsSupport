---
title: "Painel"
description: "Veja o que o Painel do B1 Admin mostra: a ordem do culto da semana, quem está servindo e fez check-in, os itens que precisam de atenção e as suas tarefas e grupos."
---

# Painel

<div class="article-intro">

O Painel é a página inicial do B1 Admin. Ele abre quando você entra no sistema e é organizado em torno do culto semanal da sua igreja: a ordem do culto da próxima escala, quem está servindo, quem está no salão no domingo, o que está aguardando a sua decisão e as suas próprias tarefas e grupos.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Entre no [B1 Admin](https://admin.b1.church). Todo usuário conectado tem um Painel, mas o que ele mostra depende da sua [função e permissões](./settings/roles-permissions.md).
- As seções de culto são preenchidas quando você usa [Escalas](./serving/plans.md) e [Presença](./attendance/index.md) ou [Check-In](./attendance/check-in.md).

</div>

## Abrindo o Painel {#opening-the-dashboard}

- Entre no sistema -- o B1 Admin começa no Painel.
- Clique no pequeno logotipo da igreja no canto superior esquerdo de qualquer página.
- Abra o [menu Jump](./introduction.md#getting-around-with-the-jump-menu) (clique na barra de busca ou pressione **Ctrl+K** / **Cmd+K**) e escolha **Painel**.

## Culto da Semana {#this-weeks-service}

O cartão grande no topo mostra uma escala de culto: a próxima escala entre o último domingo e o próximo domingo, ou a escala do último domingo caso não haja nenhuma próxima. Se várias escalas caírem no mesmo dia, a que usa uma ordem do culto vem primeiro, seguida pela que tiver o horário de culto mais cedo.

- **Linha de data** -- o dia da escala, a data e o primeiro horário de culto (por exemplo, *Domingo · 15 de novembro · 9:00*).
- **Título** -- o nome da escala. Se você puder abrir a escala (você pode editar escalas, pertence ao ministério da escala ou está servindo nela), o título leva à [escala](./serving/plans.md).
- **Ordem do culto** -- cada item da [ordem do culto](./serving/service-order.md) da escala, com o horário em que ele começa, calculado a partir do primeiro horário de culto e da duração de cada item. Enquanto o culto está acontecendo, o item atual fica destacado.

Se não houver escala nesta semana, o cartão mostra **Nenhum culto planejado nesta semana.**, e se a escala não tiver ordem do culto, mostra **Nenhuma ordem do culto nesta escala.** Quem pode editar escalas vê um link **Escalas** ao lado de qualquer uma dessas mensagens.

### Quem está servindo e quem está no salão {#who-is-serving-and-who-is-in-the-room}

Ao lado da ordem do culto, o Painel acrescenta o que acontece em torno do culto, assim que houver dados para isso:

| Seção | O que mostra |
|---|---|
| **no salão** | Quantas pessoas fizeram check-in ou foram marcadas como presentes. No domingo, é a contagem de hoje, com um marcador **Ao vivo**; durante a semana, mostra a contagem do **Último domingo**. Se ninguém foi registrado pelo nome, usa as [contagens totais](./attendance/headcount-entry.md) daquele dia. |
| **Servindo no domingo** / **Servindo nesta hora** | Todas as pessoas escaladas na escala, com a função de cada uma, vinculadas ao registro da pessoa. As escalas recusadas não aparecem. |
| **Primeira vez** / **Primeira vez no último domingo** | Visitantes que vêm pela primeira vez (pessoas com situação de membro *Visitante* ou *Convidado*, ou que fizeram check-in como convidado), agrupados por família. |
| **Salas** | Check-ins por turma ou sala naquela semana, com uma barra de capacidade quando o grupo tem uma **Capacidade** definida. |

Antes que esses dados existam, o cartão mostra uma breve orientação com links para **Pessoas**, **Presença** e **Escalas** (somente os que você pode abrir).

:::info
As contagens e os nomes vêm dos seus dados de presença e de escalas, por isso só aparecem para pessoas com permissão para vê-los. Por exemplo, os nomes de visitantes e a lista de quem está servindo exigem permissão para visualizar pessoas, e as contagens de salas exigem permissão para visualizar presença.
:::

## Precisa de Atenção {#needs-attention}

Quando algo estiver aguardando a sua decisão, um cartão **Precisa de atenção** lista o item com um link:

- **aprovações de calendário pendentes** -- eventos e reservas de salas ou recursos que precisam de aprovação. Abre [Aprovações](./calendars/approvals.md). Exibido para quem pode editar conteúdo.
- **solicitações de entrada em grupo pendentes** -- pessoas que pedem para entrar em um grupo. Abre a lista de [solicitações pendentes](./groups/group-join-requests.md). Exibido para quem pode editar membros de grupos.

O cartão fica oculto quando não há nada a fazer.

## Minhas Tarefas e Meus Grupos {#my-tasks-and-my-groups}

Na parte inferior da página:

- **Minhas tarefas** lista até quatro [tarefas](./serving/tasks.md) abertas atribuídas a você; clique em uma para abri-la. Clique em **Adicionar Tarefa** para criar uma tarefa aqui mesmo (escolha a quem ela se refere e para quem é atribuída e, em seguida, informe um título, a data de vencimento e as observações), ou em **Todas as tarefas** para abrir **Servir > Meu Trabalho**.
- **Meus Grupos** lista os grupos dos quais você participa; clique em um para abri-lo. Se você puder gerenciar grupos ou visualizar pessoas, **Todos os grupos** abre a lista completa de [Grupos](./groups/index.md).

## Ações Rápidas {#quick-actions}

Os atalhos de configuração que antes ficavam no Painel (como **Adicionar o Logotipo da Sua Igreja**, **Configurar Doações Online** e **Criar Seu Primeiro Grupo**) agora estão no menu Jump, em **Ações Rápidas**. Veja [Ações Rápidas](./introduction.md#quick-actions).

## Artigos Relacionados {#related-articles}

- [Introdução](./introduction.md) -- entrar no sistema e se orientar com o menu Jump
- [Notificações e Mensagens](./notifications.md) -- os alertas e as mensagens privadas no menu do usuário
- [Escalas](./serving/plans.md) e [Ordem do Culto](./serving/service-order.md) -- o que alimenta o cartão do culto
- [Check-In](./attendance/check-in.md) -- como as pessoas são contadas no salão
