---
title: "Selecionando um Culto"
---

# Selecionando um Culto

<div class="article-intro">

A primeira etapa de todo check-in é escolher o culto que você vai frequentar. A tela de cultos aparece logo após o aplicativo terminar de carregar e determina quais horários de culto e quais grupos estarão disponíveis durante o restante do fluxo de check-in.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Faça login](../getting-started/logging-in) no aplicativo B1 Church Checkin e selecione a sua igreja
- Certifique-se de que o administrador da sua igreja [configurou os cultos e os horários de culto](../../b1-admin/attendance/setup.md) no B1 Admin

</div>

## Como Funciona

1. Depois de fazer login (ou após o login automático nas visitas seguintes), o aplicativo exibe a **tela de cultos**.
2. Você verá a lista de todos os cultos configurados para a sua igreja. Cada culto aparece como um cartão com o nome do culto (por exemplo, "Culto da Manhã de Domingo" ou "Culto de Quarta-feira à Noite").
3. Toque no culto que você vai frequentar.

O aplicativo carrega os horários de culto e os grupos associados a esse culto e, em seguida, leva você à [tela de busca de membros](./looking-up-members).

## Quando o Check-in Não Está Aberto {#when-check-in-isnt-open}

Se o seu administrador tiver dado a um horário de culto uma [agenda de check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule), o aplicativo só oferece esse horário enquanto a janela de check-in estiver aberta. Horários de culto cuja janela esteja fechada no momento ficam ocultos, para que as famílias não possam escolhê-los mais adiante no fluxo.

Se todos os horários do culto que você tocou estiverem fechados, o aplicativo mostra **"O check-in não está aberto para este culto no momento."** Toque em **Voltar** para retornar à lista de cultos e escolher outro, ou aguarde até que a janela seja aberta e tente novamente.

:::info
As janelas de check-in seguem o fuso horário da sua igreja. Se a sua igreja não tiver um fuso horário definido, é usado o fuso horário do seu campus. Se um horário de culto parecer abrir na hora errada, peça ao seu administrador que verifique o fuso horário nas configurações da igreja ou do campus.
:::

:::info
Os cultos são configurados pelo administrador da sua igreja no B1 Admin, na seção de Frequência. Se você não vir o culto que espera, peça ao seu administrador que confirme se ele foi criado na [configuração de frequência](../../b1-admin/attendance/setup.md).
:::

## O Que Acontece nos Bastidores

Quando você seleciona um culto, o aplicativo busca três coisas no servidor:

- Os **horários de culto** desse culto (por exemplo, um único culto pode ter um horário às 9:00 e outro às 11:00).
- Os **grupos** disponíveis em cada horário de culto (por exemplo, Berçário, Pré-escola, Fundamental).
- Os **vínculos entre grupos e horários de culto**, que determinam quais grupos estão disponíveis em quais horários.

Esses dados ficam armazenados em cache local, para que o restante do processo de check-in seja rápido e responsivo.

:::tip
Se a sua igreja tiver apenas um culto configurado, você ainda precisa tocá-lo para prosseguir. O aplicativo não seleciona automaticamente um único culto.
:::

## Próximo Passo

Depois de selecionar um culto, você vai [buscar a sua família](./looking-up-members) pelo número de telefone ou pelo nome.
