---
title: "Tarefas"
---

# Tarefas

<div class="article-intro">

Tarefas permitem que você atribua itens de ação a pessoas ou grupos em sua igreja. Se é um afazer único ou uma responsabilidade recorrente, tarefas o ajudam a rastrear o que precisa ser feito e quem é responsável para que nada seja negligenciado.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Certifique-se de que as pessoas ou [grupos](../groups/creating-groups.md) que você quer atribuir tarefas existem em B1 Admin
- No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Servindo > Meu Trabalho** para ver tarefas

</div>

## Visualizando Tarefas

No menu Jump, escolha **Servindo > Meu Trabalho** (ou procure por "Meu Trabalho"). A lista **Tarefas** mostra o título de cada tarefa, a quem ela está associada, a quem está atribuída, quando foi aberta e seu status. Seus cards de [fluxo de trabalho](./workflows.md) aparecem ao lado dela, em **Meus Cards**.

Use as abas acima da lista para alternar entre tarefas **Atribuídas a Mim**, **Atribuídas aos Meus Grupos** e **Solicitadas por Mim**. Cada aba mostra quantas tarefas contém.

:::tip
Por padrão, apenas tarefas abertas são mostradas. Escolha **Fechadas** acima da lista para ver as tarefas concluídas.
:::

## Criando uma Tarefa

1. Na página **Meu Trabalho**, clique em **Adicionar Tarefa**. Um formulário **Nova Tarefa** se abre.
2. Clique na caixa **Associar a** e escolha a pessoa à qual a tarefa se refere.
3. Clique na caixa **Atribuir a**. Na janela **Selecione uma Pessoa ou Grupo**, pesquise na aba **Pessoa**, ou mude para a aba **Grupo** e pesquise um grupo, depois selecione o resultado.
4. Digite um **Título** para a tarefa.
5. Adicione **Notas** com quaisquer detalhes ou instruções para o designado.
6. Clique em **Salvar**.

A tarefa agora aparecerá na lista de tarefas e será visível para o designado em seu painel e aplicativo móvel.

## Gerenciando uma Tarefa

Clique em qualquer tarefa para abrir sua página de detalhes. A partir daqui você pode:

- **Fechar ou reabrir a tarefa** -- Clique em **Fechar tarefa** quando o trabalho estiver concluído, ou em **Reabrir tarefa** para abri-la novamente.
- **Reatribuir a tarefa** -- Clique em **Atribuir** para escolher uma pessoa ou grupo diferente.
- **Mudar a quem ela se refere** -- Clique em **Associar** para escolher outra pessoa.
- **Adicionar notas** -- Publique atualizações ou detalhes para o designado nas notas da tarefa.
- **Definir lembretes** -- Veja [Lembretes de Tarefas](#task-reminders) abaixo.

## Lembretes de Tarefas {#task-reminders}

Uma tarefa com data de vencimento pode lembrar seu designado antes do prazo.

1. Na página da tarefa, clique em **Editar** ao lado de **Lembretes**.
2. Ative **Enviar lembretes para esta tarefa**.
3. Em **Quando os lembretes devem ser enviados?**, escolha até três momentos: **7 dias antes**, **3 dias antes**, **1 dia antes** ou **No dia**.
4. Defina a **Hora do Dia** e, opcionalmente, uma **Mensagem**.
5. Em **Enviar Por**, escolha **Push**, **Email** e, se sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado, **Texto**.
6. Clique em **Salvar Lembretes**.

Se a tarefa não tiver data de vencimento, o B1 avisa que nenhum lembrete será enviado até que uma seja definida. Lembretes por texto só chegam às pessoas que ativaram **Mensagens de texto** em suas [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md), e cada texto pode gerar custos para sua igreja.

## Ciclo de Vida da Tarefa

1. Uma nova tarefa começa com um status de **Aberto**.
2. O designado recebe uma notificação e pode visualizar a tarefa de seu painel, **Servindo > Meu Trabalho** ou o aplicativo móvel.
3. Uma vez que o trabalho está completo, o designado (ou um administrador) clica em **Fechar tarefa**.
4. Tarefas fechadas são removidas da visualização padrão, mas ainda podem ser encontradas escolhendo **Fechadas** acima da lista de tarefas.

:::info
B1 Admin não cria mais tarefas recorrentes em um cronograma. Para acompanhamento repetido com pessoas, use um [fluxo de trabalho](./workflows.md) com um [gatilho de cronograma](./workflows.md#schedule-triggers).
:::

:::tip
Quando você precisa mover muitas pessoas através do mesmo conjunto de etapas -- como acompanhamento de novo visitante ou um processo de membro -- use [Fluxos de Trabalho](./workflows.md). Fluxos de Trabalho transformam tarefas em cartões em um quadro de arrastar e soltar com etapas, datas de vencimento e roteamento.
:::

:::info
Algumas tarefas são criadas automaticamente por outras partes de B1 e se abrem em um cartão de revisão especial em vez da visualização padrão de nota/reatribuição -- [solicitações de ingresso em grupo](../groups/group-join-requests.md#approving-from-the-tasks-page), [solicitações de alteração de perfil](../profile/approving-profile-changes.md) e [solicitações de exclusão de conta](../profile/account-deletion.md) funcionam desta forma.
:::

## Próximas Etapas

- Mova pessoas através de um processo de múltiplas etapas com [Fluxos de Trabalho](./workflows.md)
- Use [Fluxos de Trabalho](./workflows.md) para mover pessoas através de processos repetíveis automaticamente
- Use tarefas ao lado de [Planos de Serviço](./plans.md) para rastrear itens de ação de preparação de serviço
