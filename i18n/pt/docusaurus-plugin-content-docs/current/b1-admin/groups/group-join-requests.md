---
title: "Solicitações de Entrada em Grupos"
---

# Solicitações de Entrada em Grupos

<div class="article-intro">

Quando um grupo é configurado com uma política de entrada baseada em aprovação, as pessoas podem enviar solicitações para participar. Líderes de grupo e administradores analisam essas solicitações e as aprovam ou recusam. Isso dá à sua igreja controle sobre a participação nos grupos, ao mesmo tempo em que facilita para as pessoas demonstrarem interesse em participar.

</div>

## Vídeo de Treinamento

<YouTube id="1vj-suCiIsE" title="Group Join Requests and Group Calendars in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar grupos ou precisa ser líder do grupo específico. Consulte [Funções e Permissões](../people/roles-permissions.md) para mais detalhes.
- O grupo deve ter a política de entrada definida como **Solicitação** (aprovação necessária). Consulte [Criando Grupos](./creating-groups.md) para saber como configurar as políticas de entrada.

</div>

## Entendendo as Políticas de Entrada

Os grupos podem ter três políticas de entrada diferentes:

- **Aberta** -- qualquer pessoa pode entrar imediatamente, sem aprovação
- **Solicitação** -- as pessoas enviam uma solicitação de entrada que requer aprovação
- **Fechada** -- ninguém pode solicitar entrada (os membros precisam ser adicionados manualmente)

Quando um grupo usa a política **Solicitação**, todas as tentativas de entrada passam pelo fluxo de aprovação descrito nesta página.

## Visualizando Solicitações Pendentes

### Para Líderes de Grupo

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) e escolha **Pessoas > Grupos**
2. Clique no nome do grupo
3. A seção **Membros** mostra quantas solicitações estão pendentes. Clique em **Todos os membros** -- as solicitações pendentes deste grupo aparecem no topo da lista de membros

### Para Administradores

Administradores com permissão de gerenciamento de grupos podem ver as solicitações pendentes de todos os grupos:

1. No menu Jump, escolha **Pessoas > Grupos**
2. Clique no botão **solicitações pendentes** no cabeçalho da página (por exemplo, "3 solicitações pendentes"). Ele só aparece quando há solicitações aguardando.
3. Revise todas as solicitações pendentes de toda a igreja

## Analisando uma Solicitação de Entrada

Cada solicitação de entrada mostra:

- **Nome e foto da pessoa** -- a pessoa que solicita entrar
- **Mensagem opcional** -- uma mensagem pessoal explicando por que ela quer entrar (se fornecida)
- **Data da solicitação** -- quando a solicitação foi enviada

Para analisar uma solicitação:

1. Leia a mensagem da pessoa, se ela tiver fornecido uma
2. Clique no nome da pessoa para ver o perfil dela, se necessário
3. Decida se vai aprovar ou recusar

## Aprovando uma Solicitação

1. Clique em **Aprovar** na solicitação de entrada
2. A pessoa é imediatamente adicionada ao grupo como membro
3. O solicitante recebe uma notificação de que a solicitação foi aprovada
4. A solicitação é marcada como aprovada no sistema

:::tip
Quando você aprova uma solicitação, a pessoa se torna um membro comum do grupo. Depois, você pode promovê-la a líder do grupo, se necessário, na página [Membros do Grupo](./group-members.md).
:::

## Recusando uma Solicitação

1. Clique em **Recusar** na solicitação de entrada
2. Opcionalmente, informe um motivo para a recusa (até 500 caracteres)
3. Clique em **Confirmar**
4. O solicitante recebe uma notificação com o motivo da recusa (se informado)
5. A solicitação é marcada como recusada

:::info
Informar um motivo para a recusa ajuda a pessoa a entender por que a solicitação não foi aprovada e pode incentivá-la a tentar novamente mais tarde ou a explorar outros grupos.
:::

## Aprovando pela Página de Tarefas

Cada solicitação de entrada também cria uma tarefa em **Serviço &rarr; Meu Trabalho**, com o título "*Pessoa* solicitou entrar em *Grupo*." Ela é atribuída aos líderes do grupo. Se o grupo ainda não tiver um líder, a tarefa vai para qualquer membro da equipe com a permissão **Membros do Grupo &gt; Editar**, ou para os administradores de domínio da sua igreja, caso ninguém tenha essa permissão. A equipe e os administradores que recebem a tarefa dessa forma também recebem uma notificação com um link direto para ela.

Abrir a tarefa mostra o nome do solicitante, o grupo e a mensagem opcional dele, com os botões **Aprovar** e **Recusar** diretamente no cartão da tarefa (Recusar abre o mesmo campo opcional de motivo descrito acima). Isso oferece aos líderes uma segunda forma, orientada por notificações, de responder a uma solicitação sem precisar abrir a lista de membros do grupo.

Decidir uma solicitação por qualquer um dos dois lugares -- a lista de membros do grupo ou o cartão de Tarefas -- a encerra em todos os lugares, para que os líderes nunca vejam uma tarefa desatualizada de uma solicitação que alguém já tratou.

## Notificações

O sistema de solicitações de entrada envia notificações automaticamente:

- **Quando uma solicitação é enviada** -- todos os líderes do grupo recebem uma notificação. Se o grupo não tiver líder, a equipe ou os administradores atribuídos à tarefa são notificados no lugar (veja acima).
- **Quando uma solicitação é aprovada** -- o solicitante recebe uma confirmação
- **Quando uma solicitação é recusada** -- o solicitante recebe uma notificação com o motivo informado, se houver

As notificações aparecem na central de notificações do usuário no B1.church e no aplicativo móvel. No sino de notificações do B1 Admin, clicar em uma notificação de solicitação de entrada (ou em **Ver detalhes**) abre o grupo no site B1.church da sua igreja, em uma nova aba.

## Gerenciando Solicitações pelo Lado do Membro

As pessoas podem gerenciar as próprias solicitações de entrada no B1.church:

- Ver o status das solicitações pendentes na página de detalhes do grupo
- Cancelar uma solicitação pendente caso mudem de ideia
- Ver se a solicitação foi aprovada ou recusada

## Boas Práticas

- **Responda com rapidez** -- procure analisar as solicitações em até 24 a 48 horas para que as pessoas não fiquem esperando
- **Seja claro nos motivos de recusa** -- ajude as pessoas a entender os próximos passos ou as opções alternativas
- **Verifique os perfis** -- analise o perfil da pessoa para ver se ela se encaixa no grupo
- **Comunique as expectativas** -- certifique-se de que a descrição do grupo deixe claro para quem ele é

## Artigos Relacionados

- [Criando Grupos](./creating-groups.md) -- aprenda a criar grupos e configurar as políticas de entrada
- [Membros do Grupo](./group-members.md) -- gerencie os membros existentes do grupo
- [Agenda do Grupo](./group-calendar.md) -- agende reuniões e eventos do grupo
