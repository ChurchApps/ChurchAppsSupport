---
title: "Selecionando um Culto"
---

# Selecionando um Culto

<div class="article-intro">

O primeiro passo de cada check-in é escolher qual culto você está frequentando. A tela de cultos aparece logo após o aplicativo terminar de carregar e determina quais horários de culto e grupos estarão disponíveis para o restante do fluxo de check-in.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Faça login](../getting-started/logging-in) no aplicativo B1 Church Checkin e selecione sua igreja
- Certifique-se de que o administrador da sua igreja [configurou cultos e horários de culto](../../b1-admin/attendance/setup.md) no B1 Admin

</div>

## Como Funciona

1. Após fazer login (ou após o login automático em visitas futuras), o aplicativo exibe a **tela de cultos**.
2. Você verá uma lista de todos os cultos configurados para a sua igreja. Cada culto aparece como um cartão mostrando o nome do culto (por exemplo, "Domingo Manhã" ou "Quarta à Noite").
3. Toque no culto que você está frequentando.

O aplicativo carrega os horários de culto e grupos associados a esse culto, e então leva você à [tela de busca de membros](./looking-up-members).

:::info
Cultos são configurados pelo administrador da sua igreja no B1 Admin na seção de Presença. Se você não vir o culto esperado, peça ao seu administrador para verificar se ele foi criado na [configuração de presença](../../b1-admin/attendance/setup.md).
:::

## O Que Acontece nos Bastidores

Quando você seleciona um culto, o aplicativo busca três coisas do servidor:

- Os **horários de culto** para esse culto (por exemplo, um único culto pode ter um horário às 9:00 e outro às 11:00).
- Os **grupos** disponíveis em cada horário de culto (por exemplo, Berçário, Pré-escola, Ensino Fundamental).
- Os **vínculos grupo-horário de culto** que determinam quais grupos estão disponíveis em quais horários.

Esses dados são armazenados em cache localmente para que o restante do processo de check-in seja rápido e responsivo.

:::tip
Se sua igreja tem apenas um culto configurado, você ainda precisa tocá-lo para prosseguir. O aplicativo não seleciona automaticamente um único culto.
:::

## Próximo Passo

Após selecionar um culto, você irá [buscar sua família](./looking-up-members) por número de telefone ou nome.
