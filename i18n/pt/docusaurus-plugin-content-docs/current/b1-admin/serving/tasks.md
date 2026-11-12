---
title: "Tarefas"
description: "Crie, atribua e conclua tarefas no B1 Admin, encontre-as em Servindo > Meu trabalho e configure lembretes de data de vencimento para que os itens de acompanhamento nunca sejam esquecidos."
---

# Tarefas

<div class="article-intro">

As tarefas permitem atribuir itens de ação a pessoas ou grupos da sua igreja. Seja uma pendência única ou uma responsabilidade recorrente, as tarefas ajudam a acompanhar o que precisa ser feito e quem é responsável, para que nada passe despercebido.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Certifique-se de que as pessoas ou os [grupos](../groups/creating-groups.md) aos quais deseja atribuir tarefas existem no B1 Admin
- No [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu), escolha **Servindo > Meu trabalho** para ver as tarefas

</div>

## Visualizando tarefas {#viewing-tasks}

No Menu de atalhos, escolha **Servindo > Meu trabalho** (ou pesquise por "Meu trabalho"). A lista de **Tarefas** mostra o título de cada tarefa, a quem ela está associada, para quem foi atribuída, quando foi aberta e seu status. Seus cards de [fluxo de trabalho](./workflows.md) aparecem ao lado, em **Meus cards**. Os responsáveis também podem ver e trabalhar nos seus cards e tarefas abertas pela tela **Eu** no aplicativo B1.

Use as abas acima da lista para alternar entre as tarefas **Atribuídas a mim**, **Atribuídas aos meus grupos** e **Solicitadas por mim**. Cada aba mostra quantas tarefas contém. As tarefas e os **Meus cards** são listados do mais recente para o mais antigo, de modo que o que acabou de chegar fica no topo.

:::tip
Por padrão, somente as tarefas abertas são exibidas. Escolha **Concluídas** acima da lista para ver as tarefas finalizadas.
:::

## Criando uma tarefa {#creating-a-task}

1. Na página **Meu trabalho**, clique em **Adicionar tarefa**. Abre-se um formulário **Nova tarefa**.
2. Opcionalmente, clique na caixa **Associar a** e escolha a pessoa ou o grupo ao qual a tarefa se refere. Deixe em branco para uma pendência simples que não se refira a ninguém, como um lembrete para você mesmo.
3. Clique na caixa **Atribuir a**. Na janela **Selecione uma pessoa ou grupo**, pesquise na aba **Pessoa** ou mude para a aba **Grupo** e pesquise um grupo, depois selecione o resultado.
4. Digite um **Título** para a tarefa.
5. Opcionalmente, escolha uma **Data de vencimento**.
6. Adicione **Observações** com quaisquer detalhes ou instruções para o responsável.
7. Clique em **Salvar**.

A tarefa passará a aparecer na lista de tarefas e ficará visível para o responsável no painel dele e no aplicativo móvel.

## Gerenciando uma tarefa {#managing-a-task}

Clique em qualquer tarefa para abrir a página de detalhes. A partir daqui você pode:

- **Concluir ou reabrir a tarefa** -- Clique em **Concluir tarefa** quando o trabalho estiver feito, ou em **Reabrir tarefa** para abri-la novamente.
- **Reatribuir a tarefa** -- Clique em **Atribuir** para escolher outra pessoa ou grupo.
- **Alterar a quem ela se refere** -- Clique em **Associar** para escolher outra pessoa ou grupo, ou escolha **Nenhuma pessoa ou grupo** para removê-la.
- **Alterar a data de vencimento** -- Escolha uma data no campo **Vencimento**; ela é salva quando você clica em outro lugar. (Tarefas criadas para uma [confirmação de escala de serviço](./workflows.md#serving-assignment-confirmations) mostram a data de vencimento, mas não podem ser alteradas aqui.)
- **Adicionar observações** -- Publique atualizações ou detalhes para o responsável nas observações da tarefa.
- **Configurar lembretes** -- Veja [Lembretes de tarefas](#task-reminders) abaixo.

## Lembretes de tarefas {#task-reminders}

Uma tarefa com data de vencimento pode lembrar o responsável antes do prazo.

1. Na página da tarefa, clique em **Editar** ao lado de **Lembretes**.
2. Ative **Enviar lembretes para esta tarefa**.
3. Em **Quando os lembretes devem ser enviados?**, escolha até três antecedências: **7 dias antes**, **3 dias antes**, **1 dia antes** ou **No dia**.
4. Defina a **Hora do dia** e, opcionalmente, uma **Mensagem**.
5. Em **Enviar por**, escolha **Notificação push**, **E-mail** e, se a sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado, **SMS**.
6. Clique em **Salvar lembretes**.

Se a tarefa não tiver data de vencimento, o B1 avisa que nenhum lembrete será enviado até que uma data seja definida no campo **Vencimento**. Os lembretes por SMS só chegam a quem ativou **Mensagens de texto** nas suas [Preferências de notificação](../../b1-church/getting-started/notification-preferences.md), e cada SMS pode gerar custos para a sua igreja.

## Ciclo de vida de uma tarefa {#task-lifecycle}

1. Uma nova tarefa começa com o status **Aberta**.
2. O responsável recebe uma notificação e pode ver a tarefa no painel dele, em **Servindo > Meu trabalho** ou no aplicativo móvel.
3. Quando o trabalho estiver concluído, o responsável (ou um administrador) clica em **Concluir tarefa**.
4. As tarefas concluídas saem da visualização padrão, mas ainda podem ser encontradas escolhendo **Concluídas** acima da lista de tarefas.

:::info
O B1 Admin não cria mais tarefas recorrentes em uma agenda. Para acompanhamentos repetidos com pessoas, use um [fluxo de trabalho](./workflows.md) com um [gatilho de agenda](./workflows.md#schedule-triggers).
:::

:::tip
Quando precisar levar muitas pessoas pelas mesmas etapas — como o acompanhamento de novos visitantes ou um processo de membresia —, use [Fluxos de trabalho](./workflows.md). Os fluxos de trabalho transformam as tarefas em cards em um quadro arrastar e soltar, com etapas, datas de vencimento e roteamento.
:::

:::info
Algumas tarefas são criadas automaticamente por outras partes do B1 e abrem um card especial de revisão em vez da visualização padrão de observação/reatribuição — [solicitações de entrada em grupos](../groups/group-join-requests.md#approving-from-the-tasks-page), [solicitações de alteração de perfil](../profile/approving-profile-changes.md) e [solicitações de exclusão de conta](../profile/account-deletion.md) funcionam dessa forma.
:::

## Próximos passos {#next-steps}

- Conduza pessoas por um processo de várias etapas com [Fluxos de trabalho](./workflows.md)
- Use [Fluxos de trabalho](./workflows.md) para movimentar pessoas por processos repetíveis automaticamente
- Use as tarefas junto com os [Planos de culto](./plans.md) para acompanhar os itens de ação da preparação dos cultos
