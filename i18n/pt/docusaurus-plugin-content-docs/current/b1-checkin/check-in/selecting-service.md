---
title: "Selecionando um serviço"
---

# Selecionando um serviço

<div class="article-intro">

A primeira etapa de todo check-in é escolher de qual serviço você vai participar. A tela de serviços aparece logo depois que o aplicativo termina de carregar e determina quais horários de culto e grupos estão disponíveis para o restante do fluxo de check-in.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- [Faça login](../getting-started/logging-in) no aplicativo B1 Church Checkin e selecione a sua igreja
- Certifique-se de que o administrador da sua igreja [configurou os serviços e os horários de culto](../../b1-admin/attendance/setup.md) no B1 Admin

</div>

## Como funciona

1. Depois de fazer login (ou depois do login automático nas visitas seguintes), o aplicativo exibe a **tela de serviços**.
2. Você verá uma lista de todos os serviços configurados para a sua igreja. Cada serviço aparece como um cartão com o nome do serviço (por exemplo, "Culto da manhã de domingo" ou "Culto de quarta-feira à noite").
3. Toque no serviço do qual você vai participar.

O aplicativo carrega os horários de culto e os grupos associados a esse serviço e então leva você à [tela de busca de membros](./looking-up-members).

## Quando o check-in não está aberto

Se o administrador tiver definido uma [programação de check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) para um horário de culto, o aplicativo só permite que as famílias escolham esse horário enquanto a janela de check-in estiver aberta. Horários de culto cujas janelas estejam fechadas neste momento ainda aparecem na [tela da família](./household-review), mas são marcados como **Encerrado** (por exemplo, **Encerrado · abre dom 9:30**) em vez de oferecer um botão de grupo.

Se todos os horários de culto do serviço que você tocou estiverem encerrados, o aplicativo informa quando o check-in abre, por exemplo **"O check-in para este serviço abre dom 9:30."** (Se não for possível mostrar um horário de abertura, a mensagem será **"O check-in não está aberto para este serviço neste momento."**) Toque em **Voltar** para retornar à lista de serviços e escolher outro, ou aguarde até que a janela abra e tente novamente.

:::info
As janelas de check-in seguem o fuso horário do campus do serviço. Se esse campus não tiver um fuso horário definido, é usado o fuso horário da sua igreja. Se um horário de culto parecer abrir na hora errada, peça ao seu administrador para verificar o fuso horário nas configurações do campus ou da igreja. Na tela da família, o quiosque também usa o relógio do próprio tablet para abrir e fechar os horários de culto, então certifique-se de que o tablet esteja configurado com a hora e o fuso horário corretos.
:::

:::info
Os serviços são configurados pelo administrador da sua igreja no B1 Admin, na seção Presença. Se você não vir o serviço que espera, peça ao seu administrador que confirme se ele foi criado na [configuração de presença](../../b1-admin/attendance/setup.md).
:::

## O que acontece nos bastidores

Ao selecionar um serviço, o aplicativo busca três coisas no servidor:

- Os **horários de culto** desse serviço (por exemplo, um único serviço pode ter um horário às 9:00 e outro às 11:00).
- Os **grupos** disponíveis em cada horário de culto (por exemplo, Berçário, Pré-escola, Fundamental).
- Os **vínculos entre grupo e horário de culto**, que determinam quais grupos estão disponíveis em quais horários.

Esses dados ficam armazenados localmente para que o restante do processo de check-in seja rápido e responsivo.

:::tip
Se a sua igreja tiver apenas um serviço configurado, você ainda precisa tocar nele para prosseguir. O aplicativo não seleciona um único serviço automaticamente.
:::

## Próxima etapa

Após selecionar um serviço, você vai [buscar a sua família](./looking-up-members) pelo número de telefone ou pelo nome.
