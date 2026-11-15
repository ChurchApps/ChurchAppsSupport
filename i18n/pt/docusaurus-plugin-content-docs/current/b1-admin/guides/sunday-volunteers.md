---
title: "Guia: Gerenciar voluntários de domingo"
description: "Configure equipes de voluntários, planos semanais de culto, ordens de culto e tarefas de domingo no B1 Admin, para que os voluntários vejam e respondam às suas atribuições no B1.church e no aplicativo móvel."
---

# Gerenciar voluntários de domingo

<div class="article-intro">

Configure suas equipes de voluntários, crie planos semanais de culto, atribua posições, monte ordens de culto com músicas de louvor e atribua tarefas de domingo. Ao final, seus voluntários verão suas atribuições no site e no aplicativo móvel do B1 e poderão aceitá-las ou recusá-las diretamente.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conta do B1 Admin com acesso de administrador
- Voluntários [adicionados ao seu diretório de pessoas](../people/adding-people.md)

</div>

## Passo 1: Crie equipes de voluntários {#step-1-create-volunteer-teams}

Organize seus voluntários em equipes para gerenciar as atribuições por área ministerial. As equipes ficam dentro de um ministério na área de Serviço.

Siga os guias [Serviço](../serving/index.md) e [Membros do grupo](../groups/group-members.md) para:

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolher **Serviço > Planos** e clicar em **Adicionar ministério** para criar um ministério (por exemplo, "Domingo de manhã")
2. Selecionar a aba do ministério e clicar em **Criar equipe de serviço** (ou **Nova equipe de serviço**) para adicionar equipes como "Equipe de louvor", "Som e mídia", "Recepção" e "Voluntários do ministério infantil"
3. Abrir cada equipe e adicionar voluntários pesquisando o nome deles na caixa **Adicionar pessoa**

:::tip
Designe os líderes de equipe com o ícone de estrela (**Tornar líder**) na lista de membros da equipe. Os líderes podem gerenciar o calendário do próprio grupo e coordenar a equipe.
:::

## Passo 2: Monte sua biblioteca de músicas {#step-2-build-your-song-library}

Adicione músicas de louvor para poder incluí-las nos planos de culto toda semana.

Siga o guia [Músicas](../serving/songs.md) para:

1. No menu Jump, escolher **Serviço > Músicas**, clicar em **Adicionar música** e pesquisar no banco de dados de músicas pelo título ou pelo artista (ou clicar em **Criar manualmente**)
2. Para cada música, adicionar arranjos com letras e tons
3. Adicionar links externos para apresentações no YouTube, cifras ou partituras e enviar o áudio do ensaio, se você tiver

:::info
As músicas adicionadas aqui podem ser incluídas em qualquer plano de culto depois. Monte sua biblioteca uma vez e reutilize-a toda semana.
:::

## Passo 3: Crie um plano de culto {#step-3-create-a-service-plan}

Os planos são as atribuições semanais que indicam onde os voluntários são necessários.

Siga o guia [Planos](../serving/plans.md) para:

1. No menu Jump, escolher **Serviço > Planos**, selecionar a aba do seu ministério e abrir o seu tipo de plano (clique em **Criar tipo de plano** se ainda não tiver um)
2. Clicar em **Novo plano** e escolher a **Data do culto**. Para configurar vários domingos de uma vez, copie de um plano anterior, escolha **Repetir a cada** e a **Frequência** e informe quantos em **Número de planos**
3. Na página do plano, clicar em **Gerenciar equipe de serviço**, clicar em **Adicionar posição** para incluir cada posição e, em seguida, clicar no link **Pessoas necessárias** para atribuir voluntários
4. No painel **Validação**, clicar no link **Notificar _N_ voluntário(s)** para que os voluntários recebam os pedidos (veja [Notificando voluntários](../serving/plan-validation.md#notifying-volunteers)). Um ponto verde na foto do voluntário indica que ele aceitou, e um ponto vermelho indica que recusou. O bloco **Respostas** da página do plano mostra quantos aceitaram, quantos estão pendentes e quantos recusaram
5. Ative os [lembretes para voluntários](../serving/plans.md#volunteer-reminders) no tipo de plano para que os voluntários sejam lembrados por notificação push, e-mail ou mensagem de texto antes de cada culto

## Passo 4: Monte a ordem do culto {#step-4-build-the-service-order}

Defina o fluxo do seu culto do início ao fim.

Siga o guia [Ordem do culto](../serving/service-order.md) para:

1. Abrir seu plano e clicar em **Editar ordem do culto** na seção **Ordem do culto**
2. Clicar em **Adicionar** para incluir seções, músicas (da sua biblioteca) e itens como orações, leituras bíblicas, avisos, mensagem, ofertas e encerramento
3. Arrastar e soltar os itens para reordenar o fluxo do culto

:::info
As ordens de culto são específicas de cada plano. Alterações aqui não afetam outros planos nem a biblioteca principal de músicas.
:::

## Passo 5: Atribua tarefas de domingo {#step-5-assign-sunday-tasks}

Acompanhe responsabilidades pontuais de domingo para que nada seja esquecido.

Siga o guia [Tarefas](../serving/tasks.md) para:

1. Criar tarefas para responsabilidades como "Preparar os elementos da Ceia", "Imprimir os boletins" ou "Montar o equipamento de som"
2. Atribuir cada tarefa à pessoa ou ao grupo responsável
3. As tarefas aparecem em **Serviço > Meu trabalho**, no painel do responsável e no aplicativo móvel

:::info
O B1 Admin não cria mais tarefas em uma programação recorrente. Para processos repetitivos que conduzem pessoas por etapas, use [Fluxos de trabalho](../serving/workflows.md) com um gatilho de agendamento.
:::

## Passo 6: Ative a inscrição autônoma (opcional) {#step-6-enable-self-service-signup-optional}

Permita que os voluntários se inscrevam nas posições por conta própria, em vez de aguardar as atribuições feitas pela administração.

1. Ao criar um plano, ou em **Editar detalhes** na página do plano, defina um **Prazo de inscrição (horas antes do culto)** para controlar quando a inscrição autônoma é encerrada. As horas são contadas a partir do horário do primeiro culto do plano. Deixe em branco se não houver prazo. Novos planos começam com o prazo do plano anterior.
2. Opcionalmente, marque **Mostrar nomes dos voluntários na página de inscrição** (em **Editar detalhes**) para que os voluntários conectados vejam quem mais está inscrito.
3. No diálogo **Adicionar uma posição** de cada posição, marque **Permitir inscrição autônoma** para disponibilizá-la para autoatendimento.
4. Adicione uma **Descrição** a cada posição para que os voluntários saibam em que consiste a função.

Depois que as posições de inscrição autônoma forem criadas, elas aparecerão automaticamente nas páginas de inscrição de voluntários no [B1.church e no B1 App](../../b1-church/serving/volunteer-signup.md). Os membros podem ver as posições abertas, saber quantas vagas restam e se inscrever com um clique.

:::tip
Combine posições atribuídas pela administração com posições de inscrição autônoma no mesmo plano. Por exemplo, atribua diretamente o líder de louvor, mas deixe que os recepcionistas e os responsáveis pelo café escolham por conta própria.
:::

## Passo 7: Avise os voluntários {#step-7-let-volunteers-know}

Os voluntários atribuídos veem automaticamente os seus planos e podem responder.

1. Os voluntários veem seus planos no [B1.church e no B1 App](../../b1-church/plans/viewing-plans.md)
2. Eles podem aceitar ou recusar atribuições diretamente pelo celular ou pelo computador
3. Podem definir datas de indisponibilidade para as semanas em que não estarão disponíveis
4. Os planos podem ser impressos para ensaios ou afixados nos bastidores
5. Os voluntários podem navegar e se inscrever em posições abertas pela [página de inscrição de voluntários](../../b1-church/serving/volunteer-signup.md)

:::tip
As notificações push no B1 App avisam os voluntários quando recebem novas atribuições ou quando os planos são alterados.
:::

## Pronto! {#youre-done}

Seu sistema de gestão de voluntários está configurado. Toda semana, crie um novo plano, atribua as posições, e sua equipe verá tudo no celular ou no computador.

## Artigos relacionados {#related-articles}

- [Serviço](../serving/index.md) — configure ministérios e equipes de serviço
- [Membros do grupo](../groups/group-members.md) — adicione e gerencie os membros da equipe
- [Planos](../serving/plans.md) — crie e gerencie planos de culto
- [Ordem do culto](../serving/service-order.md) — monte o fluxo de um culto
- [Músicas](../serving/songs.md) — gerencie sua biblioteca de músicas de louvor
- [Tarefas](../serving/tasks.md) — atribua itens de ação a pessoas ou grupos
- [Fluxos de trabalho](../serving/workflows.md) — conduza pessoas por processos repetíveis com gatilhos e etapas automatizadas
- [Visualizando planos](../../b1-church/plans/viewing-plans.md) — como os voluntários veem seus planos
- [Inscrição de voluntários](../../b1-church/serving/volunteer-signup.md) — como os membros escolhem posições de voluntariado por conta própria
