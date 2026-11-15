---
title: "Atribuindo funções"
description: "Atribua funções no B1 Admin para dar à equipe e aos voluntários acesso apenas às áreas de pessoas, doações, presença e grupos de que precisam."
---

# Atribuindo funções

<div class="article-intro">

O B1 Admin usa um sistema de permissões baseado em funções para controlar o que cada usuário da sua equipe pode ver e fazer. Ao atribuir funções, você pode dar à equipe e aos voluntários acesso exatamente às áreas de que precisam -- e nada além disso. A gestão adequada das funções mantém os dados da sua igreja seguros e, ao mesmo tempo, permite que a equipe trabalhe com eficiência.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de acesso de **Administrador de domínio** ou de uma função com permissão para gerenciar **Configurações** no B1 Admin.
- As pessoas às quais você deseja atribuir funções já devem existir no seu diretório. Veja [Como adicionar pessoas](adding-people.md) se precisar adicioná-las primeiro.

</div>

## Entendendo as funções {#understanding-roles}

Uma função é um conjunto de permissões que você atribui a um ou mais usuários. Por exemplo, você pode criar uma função "Equipe financeira" que dá acesso aos [registros de doações](../donations/recording-donations.md), ou uma função "Voluntário de check-in" que permite apenas o acesso aos [recursos de presença](../attendance/check-in.md).

Cada função controla o acesso a áreas específicas do B1 Admin, incluindo:

- **Pessoas** -- visualizar e editar perfis de membros. A seção de anotações de um registro de pessoa exige **Editar pessoas**, e uma permissão separada, **Ver anotações confidenciais**, controla o acesso à seção de anotações confidenciais (para cuidado pastoral, histórico pessoal e anotações semelhantes de caráter sensível). **Ver apenas nomes de pessoas** permite que alguém procure pessoas pelo nome (vendo somente nome, foto e situação de membro), sem acesso ao diretório completo. Combinada com **Ver presença** ou **Editar presença**, essa permissão permite que um voluntário abra **Grupos** e veja as listas de chamada das turmas pelo nome; com **Editar presença**, ele também pode [registrar a presença](../attendance/recording-attendance.md). Veja [Ver apenas nomes de pessoas](../settings/roles-permissions.md#people-names-only).
- **Doações** -- gerenciar contribuições e relatórios financeiros. **Lançar doações** é uma opção mais restrita para equipes de contagem: permite lançar ofertas, mas somente em [lotes](../donations/batches.md#who-can-change-a-batch) que ainda estejam abertos.
- **Presença** -- registrar e visualizar dados de presença
- **Formulários** -- criar e gerenciar [formulários personalizados](../forms/creating-forms.md)
- **Grupos** -- gerenciar [participações em grupos](../groups/group-members.md) e calendários
- **Configurações** -- configurar as definições de toda a igreja

:::warning
Os **Administradores de domínio** têm acesso completo a todas as áreas do B1 Admin. As permissões deles não podem ser editadas nem restringidas. Use essa função somente para os seus administradores principais.
:::

## Visualizando e gerenciando funções {#viewing-and-managing-roles}

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Funções**.
3. Você verá uma lista de todas as funções configuradas para a sua igreja, com uma coluna **Membros** que mostra quantos usuários estão em cada função. A função **(Todos)** se aplica a todos os usuários.
4. Clique em qualquer função para ver seus membros e permissões.

## Adicionando usuários a uma função {#adding-users-to-a-role}

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função à qual deseja adicionar um usuário.
3. Na seção **Membros**, clique em **Adicionar**.
4. Pesquise a pessoa pelo nome (ou escolha-a em **Pessoas recentes**) e clique no nome dela ou no ícone de adicionar ao lado. Ela é incluída na função imediatamente.

O usuário passará a ter todas as permissões associadas a essa função na próxima vez que entrar.

## Editando as permissões de uma função {#editing-role-permissions}

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função que deseja alterar.
3. Na seção **Editar permissões**, expanda um grupo de permissões (como **Pessoas e grupos**, **Doações** ou **Presença**) e marque ou desmarque as permissões que deseja que a função tenha. Cada grupo mostra quantas das suas permissões estão marcadas (por exemplo, **2 de 5**). Digite em **Filtrar permissões** para encontrar uma permissão pelo nome.
4. Cada alteração é salva assim que você marca ou desmarca uma caixa.

:::tip
Siga o princípio do menor privilégio -- dê a cada função somente as permissões de que ela realmente precisa. Isso mantém os seus dados seguros e reduz a chance de alterações acidentais.
:::

## Exemplos comuns de funções {#common-role-examples}

- **Equipe do escritório** -- acesso a Pessoas, Doações, Presença e Formulários
- **Líderes de grupo** -- acesso somente a [Grupos](../groups/creating-groups.md)
- **Voluntários de check-in** -- a permissão de presença **Checkin**, de que precisa a conta conectada a um [quiosque de check-in](../attendance/check-in.md)
- **Equipe financeira** -- acesso a [Doações](../donations/recording-donations.md) e relatórios
- **Equipe de contagem** -- **Lançar doações** e **Ver doações**, para que os voluntários possam lançar a oferta em lotes abertos sem ver os resumos das contribuições

Veja [Funções e permissões](../settings/roles-permissions.md) para uma análise mais detalhada das permissões de doações e de pessoas.
