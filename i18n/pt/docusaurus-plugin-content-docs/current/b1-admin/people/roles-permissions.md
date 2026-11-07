---
title: "Atribuindo funções"
description: "Atribua funções no B1 Admin para dar à equipe e aos voluntários acesso apenas às áreas de pessoas, doações, presença e grupos de que precisam."
---

# Atribuindo funções

<div class="article-intro">

O B1 Admin usa um sistema de permissões baseado em funções para controlar o que cada usuário da sua equipe pode ver e fazer. Ao atribuir funções, você pode dar à equipe e aos voluntários acesso exatamente às áreas de que precisam — nem mais, nem menos. Uma boa gestão de funções mantém os dados da sua igreja seguros e permite que a equipe trabalhe com eficiência.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de acesso de **Administrador de domínio** ou de uma função com permissão para gerenciar **Configurações** no B1 Admin.
- As pessoas às quais você quer atribuir funções já devem existir no seu diretório. Veja [Adicionando pessoas](adding-people.md) se precisar cadastrá-las primeiro.

</div>

## Entendendo as funções

Uma função é um conjunto de permissões que você atribui a um ou mais usuários. Por exemplo, você pode criar uma função "Equipe financeira" que dá acesso aos [registros de doações](../donations/recording-donations.md), ou uma função "Voluntário de check-in" que permite somente o acesso aos [recursos de presença](../attendance/check-in.md).

Cada função controla o acesso a áreas específicas do B1 Admin, incluindo:

- **Pessoas** -- ver e editar perfis de membros. A seção Notas em um registro de pessoa exige **Editar pessoas**, e uma permissão separada, **Ver notas confidenciais**, controla o acesso à seção Notas confidenciais (para cuidado pastoral, histórico pessoal e notas sensíveis semelhantes). **Ver nomes de pessoas apenas** permite que alguém procure pessoas pelo nome (vendo somente nome, foto e situação de membro) sem acesso ao diretório completo. Combinada com **Ver presença** ou **Editar presença**, permite que um voluntário abra **Grupos** e veja as listas de turmas pelo nome; com **Editar presença**, ele também pode [registrar a presença](../attendance/recording-attendance.md). Veja [Nomes de pessoas apenas](../settings/roles-permissions.md#people-names-only).
- **Doações** -- gerenciar contribuições e relatórios financeiros. **Lançar doações** é uma opção mais restrita para equipes de contagem: permite lançar ofertas, mas somente em [lotes](../donations/batches.md#who-can-change-a-batch) que ainda estejam abertos.
- **Presença** -- registrar e visualizar dados de presença
- **Formulários** -- criar e gerenciar [formulários personalizados](../forms/creating-forms.md)
- **Grupos** -- gerenciar [participações em grupos](../groups/group-members.md) e calendários
- **Configurações** -- configurar as opções válidas para toda a igreja

:::warning
Os **Administradores de domínio** têm acesso total a todas as áreas do B1 Admin. Suas permissões não podem ser editadas nem restringidas. Use esta função somente para os seus administradores principais.
:::

## Visualizando e gerenciando funções

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Funções**.
3. Você verá uma lista de todas as funções configuradas para a sua igreja, com uma coluna **Membros** mostrando quantos usuários há em cada função.
4. Clique em qualquer função para ver seus membros e permissões.

## Adicionando usuários a uma função

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função à qual você quer adicionar um usuário.
3. Na seção **Membros**, pesquise a pessoa pelo nome.
4. Clique em **Adicionar** para atribuí-la à função.

O usuário terá todas as permissões associadas a essa função na próxima vez que entrar.

## Editando as permissões de uma função

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função que deseja modificar.
3. Na seção **Permissões**, marque ou desmarque as áreas às quais a função deve ter acesso. Cada grupo de permissões mostra quantas de suas permissões estão marcadas (por exemplo, **2 de 5**).
4. Cada alteração é salva assim que você marca ou desmarca uma caixa.

:::tip
Siga o princípio do menor privilégio — dê a cada função apenas as permissões de que ela realmente precisa. Isso mantém seus dados seguros e reduz a chance de alterações acidentais.
:::

## Exemplos comuns de funções

- **Equipe da secretaria** -- acesso a Pessoas, Doações, Presença e Formulários
- **Líderes de grupo** -- acesso somente a [Grupos](../groups/creating-groups.md)
- **Voluntários de check-in** -- a permissão de presença **Checkin**, que a conta conectada a um [quiosque de check-in](../attendance/check-in.md) precisa ter
- **Equipe financeira** -- acesso a [Doações](../donations/recording-donations.md) e relatórios
- **Equipe de contagem** -- **Lançar doações** e **Ver doações**, para que os voluntários possam lançar as ofertas em lotes abertos sem ver os resumos de doações

Veja [Funções e permissões](../settings/roles-permissions.md) para uma análise mais detalhada das permissões de doações e de pessoas.
