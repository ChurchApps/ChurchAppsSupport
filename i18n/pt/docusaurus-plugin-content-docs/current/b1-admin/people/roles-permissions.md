---
title: "Atribuindo Funções"
---

# Atribuindo Funções

<div class="article-intro">

O B1 Admin utiliza um sistema de permissões baseado em funções para controlar o que cada usuário da sua equipe pode ver e fazer. Ao atribuir funções, você pode dar ao pessoal e voluntários acesso exatamente às áreas que precisam -- e nada mais. O gerenciamento adequado de funções mantém os dados de sua igreja seguros e permite que sua equipe trabalhe de forma eficiente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso a **Domain Admin** ou uma função com permissão para gerenciar **Configurações** no B1 Admin.
- As pessoas para as quais você deseja atribuir funções já devem existir em seu diretório. Consulte [Adicionando Pessoas](adding-people.md) se precisar adicioná-las primeiro.

</div>

## Compreendendo Funções

Uma função é um conjunto de permissões que você atribui a um ou mais usuários. Por exemplo, você pode criar uma função "Finance Team" que concede acesso a [registros de doações](../donations/recording-donations.md), ou uma função "Check-In Volunteer" que permite acesso apenas aos [recursos de presença](../attendance/check-in.md).

Cada função controla o acesso a áreas específicas do B1 Admin, incluindo:

- **Pessoas** -- visualizar e editar perfis de membros. A guia Notas em um registro de pessoa requer **Editar Pessoas**, e uma permissão separada **Visualizar Notas Confidenciais** controla o acesso à seção de Notas Confidenciais (para cuidados pastorais, histórico pessoal e notas sensíveis semelhantes).
- **Doações** -- gerenciar contribuições e relatórios financeiros
- **Presença** -- registrar e visualizar dados de presença
- **Formulários** -- criar e gerenciar [formulários personalizados](../forms/creating-forms.md)
- **Grupos** -- gerenciar [membros do grupo](../groups/group-members.md) e calendários
- **Configurações** -- configurar configurações de toda a igreja

:::warning
**Domain Admins** têm acesso total a todas as áreas do B1 Admin. Suas permissões não podem ser editadas ou restringidas. Use essa função apenas para seus administradores principais.
:::

## Visualizando e Gerenciando Funções

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Funções**.
3. Você verá uma lista de todas as funções configuradas para sua igreja.
4. Clique em qualquer função para visualizar seus membros e permissões.

## Adicionando Usuários a uma Função

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função para a qual você deseja adicionar um usuário.
3. Na seção **Membros**, procure a pessoa pelo nome.
4. Clique em **Adicionar** para atribuir a função a ela.

O usuário agora terá todas as permissões associadas a essa função na próxima vez que fizer login.

## Editando Permissões de Função

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função que você deseja modificar.
3. Na seção **Permissões**, marque ou desmarque as áreas às quais você deseja que a função tenha acesso.
4. Clique em **Salvar** para aplicar suas alterações.

:::tip
Siga o princípio do menor privilégio -- dê a cada função apenas as permissões que ela realmente precisa. Isso mantém seus dados seguros e reduz a chance de alterações acidentais.
:::

## Exemplos Comuns de Funções

- **Office Staff** -- acesso a Pessoas, Doações, Presença e Formulários
- **Group Leaders** -- acesso a [Grupos](../groups/creating-groups.md) apenas
- **Check-In Volunteers** -- acesso a [Presença](../attendance/check-in.md) apenas
- **Finance Team** -- acesso a [Doações](../donations/recording-donations.md) e relatórios
