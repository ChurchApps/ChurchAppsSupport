---
title: "Calendário de disponibilidade"
---

# Calendário de disponibilidade

<div class="article-intro">

O Calendário de Disponibilidade oferece uma visualização de alto nível de todas as reservas de sala e recursos em toda a sua igreja. A partir daqui, você pode ver o que está agendado, identificar conflitos antes que aconteçam e reservar uma sala ou recurso para qualquer evento diretamente.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure pelo menos uma [sala ou recurso](rooms-resources) na seção Salas e Recursos
- Você precisa de acesso de edição à seção Calendários no B1 Admin

</div>

## Abrindo o calendário de disponibilidade

No B1 Admin, abra o **menu de seção** no canto superior esquerdo e escolha **Calendários**, depois selecione **Disponibilidade**.

## Lendo o calendário

O calendário exibe o mês atual por padrão. Você pode navegar para frente e para trás com as setas na parte superior ou alternar entre visualizações de mês, semana e dia.

Cada evento é codificado por cor de acordo com o status de reserva:

| Cor | Significado |
|-------|---------|
| Verde | Aprovado |
| Laranja | Aprovação pendente |
| Cinza | Bloqueado (não disponível) |

Passar o cursor sobre um evento mostra o título do evento e a sala ou recurso anexado.

## Filtrando por sala ou recurso

Use o menu suspenso **Filtro** no canto superior esquerdo para restringir o calendário a uma única sala ou recurso. Selecione **Todas as salas e recursos** para retornar à visualização completa.

## Reservando uma sala ou recurso

1. Clique no botão **Reservar** no canto superior direito da página.
2. Na caixa de diálogo que se abre, preencha os detalhes do evento:
   - **Título** — o nome do evento
   - **Início** e **Fim** data/hora
   - **Visibilidade** — Pública ou Privada
   - **Salas** — selecione uma ou mais salas para reservar
   - **Recursos** — selecione um ou mais recursos para reservar
3. Opcionalmente defina tempos de **Configuração** e **Desmontagem** (em minutos). Estes preenchem a reserva em ambas as extremidades para que o espaço seja reservado para preparação e limpeza, embora os tempos de início/fim do evento permaneçam iguais.
4. Para repetir a reserva, marque **Repetições** e configure a recorrência:
   - **Repetir a cada** -- defina o intervalo (por exemplo, a cada 2 semanas).
   - **Frequência** -- Diariamente, Semanalmente ou Mensalmente. Semanalmente permite que você escolha dias específicos da semana; Mensalmente permite que você escolha um dia fixo do mês ou um padrão relativo como "a segunda terça-feira".
   - **Termina** -- Nunca, em uma data específica ou após um número definido de ocorrências.
5. Para especificar uma janela de reserva personalizada (diferente do início/fim do evento), alterne **Janela de reserva personalizada** e insira os tempos de início e fim da janela. Use isso quando uma sala precisa estar acessível fora dos horários listados do evento.
6. Clique em **Salvar** para enviar a reserva.

:::info
Se a sala ou recurso tiver um **Grupo de Aprovação** configurado, a reserva aparecerá como **Pendente** até que um líder desse grupo a aprove. Veja [Aprovações de Calendário](approvals) para o fluxo de trabalho de aprovação.
:::

:::tip
O calendário destacará todos os conflitos antes de você salvar. Se você ver um aviso de conflito, ajuste seus tempos ou escolha uma sala diferente.
:::

## Artigos relacionados

- [Salas, Recursos e Agendamento](rooms-resources) — configure espaços e equipamentos reserváveis
- [Aprovações de Calendário](approvals) — aprove ou negue solicitações de reserva
- [Criando Calendários](creating-calendars) — gerencie calendários de eventos
