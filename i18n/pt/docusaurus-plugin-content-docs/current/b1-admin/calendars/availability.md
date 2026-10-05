---
title: "Calendário de Disponibilidade"
---

# Calendário de Disponibilidade

<div class="article-intro">

O Calendário de Disponibilidade oferece uma visão de pássaro de todas as reservas de sala e recurso em sua igreja. A partir daqui você pode ver o que está agendado, perceber conflitos antes que eles aconteçam, e reservar uma sala ou recurso para qualquer evento diretamente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure pelo menos uma [sala ou recurso](rooms-resources) na seção Salas & Recursos
- Você precisa de acesso de edição à seção Calendários no B1 Admin

</div>

## Abrindo o Calendário de Disponibilidade

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Calendários**, e clique em **Disponibilidade**.

## Lendo o Calendário

O calendário exibe o mês atual por padrão. Você pode navegar para frente e para trás com as setas no topo, ou alternar entre visualizações de mês, semana e dia.

Cada evento é codificado por cor pelo status de reserva:

| Cor | Significado |
|-------|---------|
| Verde | Aprovado |
| Laranja | Aprovação pendente |
| Cinza | Bloqueado (não disponível) |

Passar o mouse sobre um evento mostra o título do evento e a sala ou recurso ao qual ele está anexado.

## Filtrando por Sala ou Recurso

Use o menu suspenso **Filtro** no canto superior esquerdo para estreitar o calendário para uma sala ou recurso único. Selecione **Todas as Salas & Recursos** para retornar à visualização completa.

## Reservando uma Sala ou Recurso

1. Clique no botão **Reservar** no canto superior direito da página.
2. No diálogo que se abre, preencha os detalhes do evento:
   - **Título** — o nome do evento
   - **Início** e **Fim** data/hora
   - **Visibilidade** — Público ou Privado
   - **Salas** — selecione uma ou mais salas para reservar
   - **Recursos** — selecione um ou mais recursos para reservar
3. Opcionalmente defina tempos de **Configuração** e **Limpeza** (em minutos). Estes preenchem a reserva em ambos os lados para que o espaço seja reservado para configuração e limpeza, mesmo que os tempos de início/fim do evento permaneçam os mesmos.
4. Para repetir a reserva, marque **Repete** e configure a recorrência:
   - **Repetir a cada** -- defina o intervalo (por exemplo, a cada 2 semanas).
   - **Frequência** -- Diário, Semanal, ou Mensal. Semanal permite que você escolha dia(s) da semana específico(s); Mensal permite que você escolha um dia fixo do mês ou um padrão relativo como "a segunda terça-feira".
   - **Termina** -- Nunca, em uma data específica, ou depois de um conjunto número de ocorrências.
5. Para especificar uma janela de reserva customizada (diferente do início/fim do evento), alterne **Janela de Reserva Customizada** e digite os tempos de início e fim da janela. Use isso quando uma sala precisa ser acessível fora do horário listado do evento.
6. Clique em **Salvar** para submeter a reserva.

:::info
Se a sala ou recurso tem um **Grupo de Aprovação** configurado, a reserva aparecerá como **Pendente** até que um líder daquele grupo a aprove. Veja [Aprovações de Calendário](approvals) para o fluxo de trabalho de aprovação.
:::

:::tip
O calendário destacará qualquer conflito antes de você salvar. Se você vê um aviso de conflito, ajuste seus tempos ou escolha uma sala diferente.
:::

## Artigos Relacionados

- [Salas, Recursos & Agendamento](rooms-resources) — configure espaços e equipamentos reserváveis
- [Aprovações de Calendário](approvals) — aprove ou negue solicitações de reserva
- [Criando Calendários](creating-calendars) — gerencie calendários de eventos
