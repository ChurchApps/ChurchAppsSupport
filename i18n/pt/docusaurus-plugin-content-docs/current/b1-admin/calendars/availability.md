---
title: "Calendário de Disponibilidade"
---

# Calendário de Disponibilidade

<div class="article-intro">

O Calendário de Disponibilidade oferece uma visão geral de todas as reservas de salas e recursos em sua igreja. Aqui você pode ver o que está agendado, detectar conflitos antes de ocorrerem e reservar uma sala ou recurso para qualquer evento diretamente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure pelo menos uma [sala ou recurso](rooms-resources) na seção Salas e Recursos
- Você precisa de acesso de edição à seção Calendários no B1 Admin

</div>

## Abrindo o Calendário de Disponibilidade

No B1 Admin, vá para **Calendários** e selecione **Disponibilidade** na barra lateral.

## Lendo o Calendário

O calendário exibe o mês atual por padrão. Você pode navegar para frente e para trás com as setas no topo, ou alternar entre as visualizações de mês, semana e dia.

Cada evento é codificado por cor de acordo com o status da reserva:

| Cor | Significado |
|-------|---------|
| Verde | Aprovado |
| Laranja | Pendente de aprovação |
| Cinzento | Bloqueado (não disponível) |

Passar o mouse sobre um evento mostra o título do evento e a sala ou recurso ao qual ele está anexado.

## Filtrando por Sala ou Recurso

Use o menu suspenso **Filtro** no canto superior esquerdo para restringir o calendário a uma única sala ou recurso. Selecione **Todas as Salas e Recursos** para retornar à visualização completa.

## Reservando uma Sala ou Recurso

1. Clique no botão **Reservar** no canto superior direito da página.
2. No diálogo que se abre, preencha os detalhes do evento:
   - **Título** — o nome do evento
   - **Data/hora** de **Início** e **Fim**
   - **Visibilidade** — Pública ou Privada
   - **Salas** — selecione uma ou mais salas para reservar
   - **Recursos** — selecione um ou mais recursos para reservar
3. Opcionalmente, defina os tempos de **Preparação** e **Arrumação** (em minutos). Esses períodos prolongam a reserva nas duas extremidades para que o espaço seja reservado para preparação e limpeza, embora os horários de início/fim do evento permaneçam os mesmos.
4. Para repetir a reserva, marque **Repetições** e configure a recorrência:
   - **Repetir a cada** -- defina o intervalo (por exemplo, a cada 2 semanas).
   - **Frequência** -- Diária, Semanal ou Mensal. Semanal permite que você escolha dia(s) específicos da semana; Mensal permite que você escolha um dia fixo do mês ou um padrão relativo como "a segunda terça-feira."
   - **Termina** -- Nunca, em uma data específica, ou após um número definido de ocorrências.
5. Para especificar uma janela de reserva personalizada (diferente do início/fim do evento), alterne **Janela de Reserva Personalizada** e insira os horários de início e fim da janela. Use isso quando uma sala precisa estar acessível fora do horário listado do evento.
6. Clique em **Salvar** para enviar a reserva.

:::info
Se a sala ou recurso tiver um **Grupo de Aprovação** configurado, a reserva aparecerá como **Pendente** até que um líder desse grupo a aprove. Consulte [Aprovações de Calendário](approvals) para o fluxo de aprovação.
:::

:::tip
O calendário destacará quaisquer conflitos antes de você salvar. Se vir um aviso de conflito, ajuste seus horários ou escolha uma sala diferente.
:::

## Artigos Relacionados

- [Salas, Recursos e Agendamento](rooms-resources) — configure espaços e equipamentos reserváveis
- [Aprovações de Calendário](approvals) — aprove ou negue solicitações de reserva
- [Criando Calendários](creating-calendars) — gerencie calendários de eventos
