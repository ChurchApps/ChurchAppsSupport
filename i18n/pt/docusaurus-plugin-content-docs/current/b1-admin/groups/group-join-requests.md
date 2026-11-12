---
title: "Solicitações de Entrada em Grupos"
description: "Analise, aprove ou recuse solicitações de entrada em grupos no B1 Admin, encontre as solicitações pendentes como líder ou administrador e informe um motivo ao recusar."
---

# Solicitações de Entrada em Grupos

<div class="article-intro">

Quando um grupo está configurado com uma política de entrada baseada em aprovação, as pessoas podem enviar solicitações para participar. Os líderes do grupo e os administradores analisam essas solicitações e as aprovam ou recusam. Isso dá à sua igreja controle sobre a composição dos grupos, ao mesmo tempo em que facilita para as pessoas demonstrarem interesse em participar.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="1vj-suCiIsE" title="Solicitações de Entrada em Grupos e Calendários de Grupos no B1" next="Configurando Cultos e Presença no B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão para gerenciar grupos, ou precisa ser líder do grupo específico. Veja [Funções e Permissões](../people/roles-permissions.md) para detalhes.
- O grupo precisa ter a política de entrada definida como **Solicitar** (aprovação obrigatória). Veja [Criando Grupos](./creating-groups.md) para saber como configurar as políticas de entrada.

</div>

## Entendendo as Políticas de Entrada {#understanding-join-policies}

Os grupos podem ter três políticas de entrada diferentes:

- **Aberto** -- Qualquer pessoa pode entrar imediatamente, sem aprovação
- **Solicitar** -- As pessoas enviam uma solicitação de entrada que exige aprovação
- **Fechado** -- Ninguém pode solicitar a entrada (os membros precisam ser adicionados manualmente)

Quando um grupo usa a política **Solicitar**, todas as tentativas de entrada passam pelo fluxo de aprovação descrito nesta página.

## Visualizando as Solicitações Pendentes {#viewing-pending-requests}

### Para Líderes de Grupo {#for-group-leaders}

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) e escolha **Pessoas > Grupos**
2. Clique no nome do grupo
3. A seção **Membros** mostra quantas solicitações estão pendentes (por exemplo, "1 pendente"). Clique em **Todos os membros** -- as solicitações pendentes deste grupo aparecem em **Solicitações pendentes**, no topo da lista de membros

### Para Administradores {#for-administrators}

Administradores com permissão de gerenciamento de grupos podem ver as solicitações pendentes de todos os grupos:

1. No menu Jump, escolha **Pessoas > Grupos**
2. Clique no botão **solicitações pendentes** no cabeçalho da página (por exemplo, "3 solicitações pendentes"). Ele só aparece quando há solicitações aguardando.
3. A página **Solicitações de entrada pendentes** lista todas as solicitações pendentes da igreja, com o grupo ao qual cada pessoa pediu para entrar ao lado do nome dela. Clique em **Grupos** no topo da página para voltar. Quando não há nada aguardando, a página mostra **Nenhuma solicitação pendente.**

## Analisando uma Solicitação de Entrada {#reviewing-a-join-request}

Cada solicitação de entrada mostra:

- **Nome e foto da pessoa** -- A pessoa que pede para entrar (e, na página geral da igreja, o grupo)
- **Mensagem opcional** -- Uma mensagem pessoal explicando por que a pessoa quer entrar (se informada)
- **Data da solicitação** -- Quando a solicitação foi enviada

Para analisar uma solicitação:

1. Leia a mensagem da pessoa, se ela tiver enviado uma
2. Clique no nome da pessoa para abrir o perfil dela, se necessário
3. Decida se aprova ou recusa

## Aprovando uma Solicitação {#approving-a-request}

1. Clique em **Aprovar** na solicitação de entrada
2. A pessoa é imediatamente adicionada ao grupo como membro, e a solicitação sai da lista
3. O solicitante recebe uma notificação informando que a solicitação foi aprovada
4. A solicitação é marcada como aprovada no sistema

:::tip
Ao aprovar uma solicitação, a pessoa passa a ser um membro comum do grupo. Depois, se necessário, você pode promovê-la a líder do grupo na página de [Membros do Grupo](./group-members.md).
:::

## Recusando uma Solicitação {#declining-a-request}

1. Clique em **Recusar** na solicitação de entrada
2. Na caixa **Recusar solicitação**, informe opcionalmente um **Motivo (opcional)** (até 500 caracteres)
3. Clique em **Recusar**
4. O solicitante recebe uma notificação com o seu motivo da recusa (se informado)
5. A solicitação é marcada como recusada

:::info
Informar um motivo da recusa ajuda a pessoa a entender por que a solicitação não foi aprovada e pode incentivá-la a tentar de novo mais tarde ou a conhecer outros grupos.
:::

## Aprovando pela Página de Tarefas {#approving-from-the-tasks-page}

Cada solicitação de entrada também cria uma tarefa em **Servir &rarr; Meu Trabalho**, com o título "*Pessoa* pediu para entrar em *Grupo*." Ela é atribuída aos líderes do grupo. Se o grupo ainda não tiver um líder, ela vai para qualquer membro da equipe com a permissão **Membros do Grupo &gt; Editar**, ou para os administradores de domínio da sua igreja, caso ninguém tenha essa permissão. A equipe e os administradores que recebem a tarefa dessa forma também recebem uma notificação que leva diretamente a ela.

Ao abrir a tarefa, aparecem o nome do solicitante, o grupo e a mensagem opcional, com os botões **Aprovar** e **Recusar** diretamente no cartão da tarefa (Recusar abre o mesmo campo opcional de motivo descrito acima). Isso oferece aos líderes uma segunda forma, orientada por notificações, de agir sobre uma solicitação sem precisar abrir a lista de membros do grupo.

Decidir uma solicitação em qualquer um desses lugares -- a lista de membros do grupo ou o cartão de Tarefas -- a encerra em todos os lugares, para que os líderes nunca vejam uma tarefa desatualizada de uma solicitação que alguém já tratou.

## Notificações {#notifications}

O sistema de solicitações de entrada envia notificações automaticamente:

- **Quando uma solicitação é enviada** -- Todos os líderes do grupo recebem uma notificação. Se o grupo não tiver líder, a equipe ou os administradores designados para a tarefa são notificados no lugar (veja acima).
- **Quando uma solicitação é aprovada** -- O solicitante recebe uma confirmação
- **Quando uma solicitação é recusada** -- O solicitante recebe uma notificação com o motivo da recusa, se houver

As notificações aparecem na central de notificações do usuário no B1.church e no aplicativo móvel. No sino de notificações do B1 Admin, clicar em uma notificação de solicitação de entrada (ou em **Ver detalhes**) abre o grupo no site B1.church da sua igreja, em uma nova aba.

## Gerenciando Solicitações pelo Lado do Membro {#managing-requests-from-the-member-side}

As pessoas podem gerenciar as próprias solicitações de entrada pelo B1.church:

- Ver a situação das solicitações pendentes na página de detalhes do grupo
- Cancelar uma solicitação pendente, caso mudem de ideia
- Ver se a solicitação foi aprovada ou recusada

## Boas Práticas {#best-practices}

- **Responda com rapidez** -- Procure analisar as solicitações em 24 a 48 horas, para que as pessoas não fiquem esperando
- **Seja claro nos motivos da recusa** -- Ajude as pessoas a entender os próximos passos ou as opções alternativas
- **Confira os perfis** -- Analise o perfil da pessoa para ver se ela se encaixa bem no grupo
- **Comunique as expectativas** -- Certifique-se de que a descrição do grupo deixa claro para quem ele é

## Artigos Relacionados {#related-articles}

- [Criando Grupos](./creating-groups.md) -- Aprenda a configurar grupos e as políticas de entrada
- [Membros do Grupo](./group-members.md) -- Gerencie os membros atuais do grupo
- [Calendário do Grupo](./group-calendar.md) -- Agende reuniões e eventos do grupo
