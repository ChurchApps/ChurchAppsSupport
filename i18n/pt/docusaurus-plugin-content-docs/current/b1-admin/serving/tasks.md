---
title: "Tarefas"
---

# Tarefas

<div class="article-intro">

As tarefas permitem atribuir itens de ação a pessoas ou grupos da sua igreja. Seja uma atividade pontual ou uma responsabilidade recorrente, as tarefas ajudam a acompanhar o que precisa ser feito e quem é o responsável, para que nada passe despercebido.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as pessoas ou [grupos](../groups/creating-groups.md) para os quais você quer atribuir tarefas existem no B1 Admin
- No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Serviço > Meu Trabalho** para ver as tarefas

</div>

## Visualizando Tarefas

No menu Jump, escolha **Serviço > Meu Trabalho** (ou pesquise por "Meu Trabalho"). A lista de **Tarefas** mostra o título de cada tarefa, a quem ela está associada, para quem ela foi atribuída, quando foi aberta e o status. Os seus [cartões de fluxo de trabalho](./workflows.md) aparecem junto dela em **Meus Cartões**.

Use as abas acima da lista para alternar entre as tarefas **Atribuídas a mim**, **Atribuídas aos meus grupos** e **Solicitadas por mim**. Cada aba mostra quantas tarefas contém.

:::tip
Por padrão, somente as tarefas abertas são exibidas. Escolha **Fechadas** acima da lista para ver as tarefas concluídas.
:::

## Criando uma Tarefa

1. Na página **Meu Trabalho**, clique em **Adicionar tarefa**. Um formulário **Nova tarefa** é aberto.
2. Clique na caixa **Associar a** e escolha a pessoa a quem a tarefa se refere.
3. Clique na caixa **Atribuir a**. Na janela **Selecione uma pessoa ou grupo**, pesquise na aba **Pessoa** ou alterne para a aba **Grupo** e pesquise um grupo, depois selecione o resultado.
4. Digite um **Título** para a tarefa.
5. Opcionalmente, escolha uma **Data de vencimento**.
6. Adicione **Observações** com quaisquer detalhes ou instruções para o responsável.
7. Clique em **Salvar**.

A tarefa agora aparecerá na lista de tarefas e ficará visível para o responsável no painel dele e no aplicativo móvel.

## Gerenciando uma Tarefa

Clique em qualquer tarefa para abrir a página de detalhes dela. Daqui você pode:

- **Fechar ou reabrir a tarefa** -- clique em **Fechar tarefa** quando o trabalho estiver concluído, ou em **Reabrir tarefa** para abri-la novamente.
- **Reatribuir a tarefa** -- clique em **Atribuir** para escolher outra pessoa ou grupo.
- **Alterar a quem ela se refere** -- clique em **Associar** para escolher outra pessoa.
- **Alterar a data de vencimento** -- escolha uma data no campo **Vencimento**; ela é salva quando você clica fora do campo. (Tarefas criadas para uma [confirmação de escala](./workflows.md#serving-assignment-confirmations) mostram a data de vencimento, mas não podem ser alteradas aqui.)
- **Adicionar observações** -- publique atualizações ou detalhes para o responsável nas observações da tarefa.
- **Definir lembretes** -- veja [Lembretes de Tarefas](#task-reminders) abaixo.

## Lembretes de Tarefas

Uma tarefa com data de vencimento pode lembrar o responsável antes do prazo.

1. Na página da tarefa, clique em **Editar** ao lado de **Lembretes**.
2. Ative **Enviar lembretes para esta tarefa**.
3. Em **Quando os lembretes devem ser enviados?**, escolha até três antecedências: **7 dias antes**, **3 dias antes**, **1 dia antes** ou **No dia**.
4. Defina a **Hora do dia** e, opcionalmente, uma **Mensagem**.
5. Em **Enviar por**, escolha **Push**, **E-mail** e, se a sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado, **SMS**.
6. Clique em **Salvar lembretes**.

Se a tarefa não tiver data de vencimento, o B1 avisa que nenhum lembrete será enviado até que uma data seja definida no campo **Vencimento**. Lembretes por SMS só chegam a pessoas que ativaram **Mensagens de texto** nas suas [Preferências de notificação](../../b1-church/getting-started/notification-preferences.md), e cada SMS pode custar à sua igreja.

## Ciclo de Vida da Tarefa

1. Uma nova tarefa começa com o status **Aberta**.
2. O responsável recebe uma notificação e pode ver a tarefa no painel dele, em **Serviço > Meu Trabalho** ou no aplicativo móvel.
3. Quando o trabalho estiver concluído, o responsável (ou um administrador) clica em **Fechar tarefa**.
4. As tarefas fechadas saem da visualização padrão, mas ainda podem ser encontradas escolhendo **Fechadas** acima da lista de tarefas.

:::info
O B1 Admin não cria mais tarefas recorrentes em uma programação. Para acompanhamentos repetidos com pessoas, use um [fluxo de trabalho](./workflows.md) com um [gatilho de agenda](./workflows.md#schedule-triggers).
:::

:::tip
Quando precisar levar muitas pessoas pelas mesmas etapas -- como o acompanhamento de novos visitantes ou um processo de membresia -- use os [Fluxos de trabalho](./workflows.md). Os fluxos de trabalho transformam tarefas em cartões em um quadro de arrastar e soltar, com etapas, datas de vencimento e roteamento.
:::

:::info
Algumas tarefas são criadas automaticamente por outras partes do B1 e abrem um cartão especial de análise, em vez da visualização padrão de observações/reatribuição -- [solicitações de entrada em grupos](../groups/group-join-requests.md#approving-from-the-tasks-page), [solicitações de alteração de perfil](../profile/approving-profile-changes.md) e [pedidos de exclusão de conta](../profile/account-deletion.md) funcionam dessa forma.
:::

## Próximos Passos

- Conduza pessoas por um processo de várias etapas com os [Fluxos de trabalho](./workflows.md)
- Use os [Fluxos de trabalho](./workflows.md) para levar pessoas por processos repetíveis automaticamente
- Use tarefas junto com os [Planos de culto](./plans.md) para acompanhar os itens de preparação do culto
