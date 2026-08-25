---
title: "Calendário de Disponibilidade"
---

# Calendário de Disponibilidade

<div class="article-intro">

O Calendário de Disponibilidade oferece uma visão geral de todas as reservas de salas e recursos em sua igreja. Daqui você pode ver o que está agendado, identificar conflitos antes que aconteçam e reservar uma sala ou recurso para qualquer evento diretamente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure pelo menos uma [sala ou recurso](rooms-resources) na seção Salas e Recursos
- Você precisa de acesso de edição à seção Calendários em B1 Admin

</div>

## Abrindo o Calendário de Disponibilidade

Em B1 Admin, abra o **menu de seção** no canto superior esquerdo e escolha **Calendários**, depois selecione **Disponibilidade**.

## Lendo o Calendário

O calendário exibe o mês atual por padrão. Você pode navegar para frente e para trás com as setas no topo ou alternar entre visualizações de mês, semana e dia.

Cada evento é codificado por cor pelo status de reserva:

| Cor | Significado |
|-------|---------|
| Verde | Aprovado |
| Laranja | Pendente de aprovação |
| Cinza | Bloqueado (não disponível) |

Passar o mouse sobre um evento mostra o título do evento e a sala ou recurso ao qual está anexado.

## Filtrando por Sala ou Recurso

Use o dropdown **Filtrar** no canto superior esquerdo para restringir o calendário a uma única sala ou recurso. Selecione **Todas as Salas e Recursos** para retornar à visualização completa.

## Reservando uma Sala ou Recurso

1. Clique no botão **Reservar** no canto superior direito da página.
2. Na caixa de diálogo que se abre, preencha os detalhes do evento:
   - **Título** — o nome do evento
   - **Início** e **Fim** data/hora
   - **Visibilidade** — Público ou Privado
   - **Salas** — selecione uma ou mais salas para reservar
   - **Recursos** — selecione um ou mais recursos para reservar
3. Opcionalmente defina tempos de **Configuração** e **Limpeza** (em minutos). Estes expandem a reserva em ambas as extremidades para que o espaço seja reservado para configuração e limpeza, mesmo que os horários de início/fim do evento permaneçam os mesmos.
4. Para repetir a reserva, marque **Repete** e configure a recorrência:
   - **Repetir cada** -- defina o intervalo (por exemplo, a cada 2 semanas).
   - **Frequência** -- Diário, Semanal ou Mensal. Semanal permite escolher dias específicos da semana; Mensal permite escolher um dia fixo do mês ou um padrão relativo como "a segunda terça-feira".
   - **Termina** -- Nunca, em uma data específica ou após um número definido de ocorrências.
5. Para especificar uma janela de reserva personalizada (diferente do início/fim do evento), alterne **Janela de Reserva Personalizada** e digite os horários de início e fim da janela. Use isto quando uma sala precisa estar acessível fora dos horários listados do evento.
6. Clique em **Salvar** para enviar a reserva.

:::info
Se a sala ou recurso tem um **Grupo de Aprovação** configurado, a reserva aparecerá como **Pendente** até que um líder daquele grupo aprove. Consulte [Aprovações de Calendário](approvals) para o fluxo de aprovação.
:::

:::tip
O calendário destacará quaisquer conflitos antes de você salvar. Se você ver um aviso de conflito, ajuste seus horários ou escolha uma sala diferente.
:::

## Artigos Relacionados

- [Salas, Recursos e Agendamento](rooms-resources) — configure espaços e equipamentos reserváveis
- [Aprovações de Calendário](approvals) — aprove ou negue solicitações de reserva
- [Criando Calendários](creating-calendars) — gerenciar calendários de eventos
