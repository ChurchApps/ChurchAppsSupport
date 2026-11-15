---
title: "Calendário de Disponibilidade"
description: "Configure salas e equipamentos reserváveis no B1 Admin e, em seguida, reserve-os no calendário, adicione intervalos de preparação e desmontagem e trate reservas recorrentes ou que exigem aprovação."
---

# Calendário de Disponibilidade

<div class="article-intro">

O Calendário de Disponibilidade oferece uma visão geral de todas as reservas de salas e recursos da sua igreja. A partir daqui, você pode ver o que está agendado, identificar conflitos antes que aconteçam e reservar uma sala ou recurso diretamente para qualquer evento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure pelo menos uma [sala ou recurso](./rooms-resources.md) na seção Salas, Recursos e Agendamento
- Você precisa da permissão **Editar Conteúdo**

</div>

## Abrindo o Calendário de Disponibilidade {#opening-the-availability-calendar}

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Calendários** e clique em **Disponibilidade**.

## Lendo o Calendário {#reading-the-calendar}

O calendário exibe o mês atual por padrão. Use **Hoje**, **Voltar** e **Avançar** no topo para navegar, e **Mês**, **Semana**, **Dia** ou **Agenda** para mudar a visualização.

Cada reserva é colorida de acordo com a situação:

| Cor | Significado |
|-----|-------------|
| Verde | Aprovada |
| Laranja | Aguardando aprovação |
| Cinza | Bloqueada (indisponível), exibida como *Bloqueado: motivo* |

Cada reserva mostra o título do evento seguido das salas e recursos que utiliza. Passe o cursor sobre uma reserva para ver o texto completo. Clique em uma reserva para abrir o evento e editá-lo.

## Filtrando por Sala ou Recurso {#filtering-by-room-or-resource}

Use o menu suspenso **Sala / Recurso** no canto superior esquerdo para restringir o calendário a uma única sala ou recurso. Selecione **Todas as salas e recursos** para voltar à visão completa.

## Reservando uma Sala ou Recurso {#booking-a-room-or-resource}

1. Clique no botão **Reservar** no topo da página.
2. Abre-se a caixa **Novo Evento** -- o mesmo editor usado em um calendário (veja [Adicionando e Editando Eventos](./creating-calendars.md#adding-and-editing-events)). Preencha os detalhes do evento:
   - **Grupo** *(obrigatório)* — o grupo ao qual o evento pertence. Se você tiver [modelos](./rooms-resources.md#event-templates), também pode escolher um **Modelo** para preencher o restante.
   - **Título** *(obrigatório)*
   - **Início** e **Término**, com data e hora *(obrigatórios; o Término deve ser posterior ao Início)*
   - **Visibilidade** — Pública ou Privada
   - **Salas** — selecione uma ou mais salas para reservar
   - **Recursos** — selecione um ou mais recursos para reservar
3. Assim que uma sala ou recurso estiver selecionado, você pode definir **Preparação (min antes)** e **Desmontagem (min depois)**. Eles estendem a reserva nas duas extremidades, para que o espaço fique reservado para a preparação e a limpeza, mesmo que os horários de início e término do evento permaneçam os mesmos.
4. Para repetir a reserva, defina primeiro o **Início** e, em seguida, marque **Repete** e configure a recorrência:
   - **Intervalo** -- com que frequência ela se repete (por exemplo, 2 com Semana para a cada 2 semanas).
   - **Frequência** -- Dia, Semana ou Mês. A opção semanal permite escolher dia(s) específico(s) da semana; a mensal permite escolher um dia fixo do mês ou um padrão relativo, como "a segunda terça-feira".
   - **Termina** -- **Nunca**, **Em** uma **Data final** específica ou **Após** um número definido de ocorrências.
5. Para especificar uma janela de reserva personalizada (diferente do início e término do evento), ative **Janela de reserva personalizada** e informe **Reservar a partir de** e **Reservar até**. Isso substitui os minutos de preparação e desmontagem. Use essa opção quando uma sala precisar estar acessível fora do horário listado do evento.
6. Clique em **Salvar** para enviar a reserva.

:::info
Se a sala ou recurso tiver um **Grupo de Aprovação** configurado, a reserva aparecerá como **Pendente** até ser aprovada na página de Aprovações -- a menos que você seja membro desse grupo, caso em que ela é aprovada imediatamente. Veja [Aprovações de Calendário](./approvals.md) para o fluxo de aprovação.
:::

:::tip
O editor exibe um aviso antes de você salvar se a sala ou recurso já estiver reservada ou bloqueada naquele horário. Se aparecer um aviso de conflito, ajuste os horários ou escolha outra sala.
:::

## Artigos Relacionados {#related-articles}

- [Salas, Recursos e Agendamento](./rooms-resources.md) — configure espaços e equipamentos reserváveis
- [Aprovações de Calendário](./approvals.md) — aprove ou negue solicitações de reserva
- [Criando Calendários](./creating-calendars.md) — gerencie os calendários de eventos
