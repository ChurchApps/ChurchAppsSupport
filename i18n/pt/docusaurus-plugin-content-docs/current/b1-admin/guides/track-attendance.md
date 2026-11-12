---
title: "Guia: Registrar a frequência na igreja"
description: "Registre a frequência na igreja no B1 Admin configurando campi e horários de culto, registrando manualmente ou por autoatendimento e consultando os relatórios."
---

# Registrar a frequência na igreja

<div class="article-intro">

Configure o controle de frequência para seus cultos e grupos, desde a configuração de campi e horários de culto até o registro manual ou pelo aplicativo de check-in de autoatendimento e a análise de tendências nos relatórios. Ao final, você terá um panorama completo de quem está presente e quando.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conta do B1 Admin com acesso de administrador
- [Pessoas adicionadas ao seu diretório](../people/adding-people.md)
- [Grupos criados](../groups/creating-groups.md) para os ministérios que você deseja acompanhar

</div>

## Passo 1: Configure campi e cultos {#step-1-configure-campuses--services}

Defina onde e quando a sua igreja se reúne.

Siga o guia [Configuração de frequência](../attendance/setup.md) para:

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolher **Pessoas > Frequência** e clicar em **Configuração**
2. Adicionar seu campus (por exemplo, "Campus principal") e os cultos dele
3. Adicionar os horários dos cultos (por exemplo, "Domingo 9:00", "Domingo 11:00", "Quarta 19:00")

## Passo 2: Ative o controle de frequência dos grupos {#step-2-enable-group-attendance-tracking}

Ative o controle de frequência para os grupos que você deseja acompanhar.

Siga o guia [Criando grupos](../groups/creating-groups.md) para:

1. Abrir cada grupo que você deseja acompanhar, clicar em **Editar** e definir **Registrar frequência** como **Sim**
2. Se o grupo se reúne durante um culto, escolher o horário em **Adicionar horário do culto** e clicar no botão de mais para que a frequência seja registrada no culto correto e, em seguida, clicar em **Salvar**

:::info
Nem todos os grupos precisam de controle de frequência. Ative-o para os grupos em que você deseja acompanhar a participação, como classes infantis, pequenos grupos, escola dominical etc.
:::

## Passo 3: Registre a frequência manualmente {#step-3-record-attendance-manually}

Marque quem esteve presente em cada culto e grupo.

Siga o guia [Registrando a frequência](../attendance/recording-attendance.md) para:

1. Abrir um grupo, clicar em **Todas as sessões** na seção **Sessões**, clicar em **Novo** e escolher o **Horário do culto** e a **Data da sessão**. Marque **Adicionar também para os outros _N_ grupos em _horário do culto_** para criar de uma só vez as sessões de todas as classes naquele horário de culto
2. Marque quem esteve presente e clique em **Salvar frequência**

Se você precisar apenas de um total, e não de nomes (por exemplo, no culto principal), clique em **Informar número de presentes** na página **Frequência** — veja [Registro de número de presentes](../attendance/headcount-entry.md).

:::tip
O registro manual funciona muito bem em cultos de adultos, pequenos grupos e em qualquer situação em que um quiosque de check-in não seja prático.
:::

## Passo 4: Configure o check-in por autoatendimento (opcional) {#step-4-set-up-self-check-in-optional}

Permita que os membros façam o próprio check-in usando um quiosque com tablet.

Siga o guia [Check-in](../attendance/check-in.md) para:

1. Instalar o aplicativo B1 Checkin em um tablet para o check-in de autoatendimento
2. Os membros pesquisam o próprio nome e fazem o check-in deles e de sua família
3. Os registros de check-in aparecem junto aos registros inseridos manualmente, sem diferença nos dados

:::info
Para uma configuração completa do ministério infantil, incluindo hardware e impressora, veja o [Guia de check-in infantil](./childrens-checkin.md).
:::

## Passo 5: Consulte os relatórios de frequência {#step-5-view-attendance-reports}

Veja o panorama geral da participação em toda a sua igreja.

Siga o guia [Relatórios de frequência](../reports/attendance-reports.md). Na página **Frequência**, clique em **Todos os anos** para encontrar estes relatórios como abas:

1. **Tendência de frequência** — veja a frequência ao longo do tempo para identificar crescimento ou queda
2. **Tendência de número de presentes** — gráfico dos totais de presentes que você informou manualmente
3. **Frequência por grupo** — veja quem esteve presente em cada sessão de grupo em um intervalo de datas, com download em CSV

Para uma contagem dia a dia de um grupo, abra o relatório **Frequência diária por grupo** em **admin.b1.church/reports/dailyGroupAttendance**.

:::info
Os relatórios combinam a frequência registrada manualmente e a do check-in por autoatendimento. Os dados aparecem da mesma forma, pois os dois métodos alimentam os mesmos relatórios.
:::

## Pronto! {#youre-done}

Seu controle de frequência está configurado. Quer você registre a frequência manualmente, use o aplicativo de check-in ou ambos, todos os dados vão para os mesmos relatórios, para que você tenha um panorama claro da participação em toda a sua igreja.

## Artigos relacionados {#related-articles}

- [Configuração de frequência](../attendance/setup.md) — configure campi e cultos
- [Registro de número de presentes](../attendance/headcount-entry.md) — registre totais sem nomes
- [Registrando a frequência](../attendance/recording-attendance.md) — registre a frequência manualmente
- [Acompanhando a frequência](../attendance/tracking-attendance.md) — revise as tendências de frequência
- [Check-in](../attendance/check-in.md) — aplicativo de check-in de autoatendimento
- [Criando grupos](../groups/creating-groups.md) — configure grupos com controle de frequência
- [Relatórios de frequência](../reports/attendance-reports.md) — veja as tendências de frequência
- [Guia de check-in infantil](./childrens-checkin.md) — configuração completa do ministério infantil
