---
title: "Atribuindo Funções"
---

# Atribuindo Funções

<div class="article-intro">

O B1 Admin usa um sistema de permissões baseado em funções para controlar o que cada usuário da sua equipe pode ver e fazer. Ao atribuir funções, você pode dar aos funcionários e voluntários acesso exatamente às áreas de que precisam -- e nada além disso. Uma boa gestão de funções mantém os dados da sua igreja seguros e permite que sua equipe trabalhe com eficiência.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso de **Administrador de Domínio** ou de uma função com permissão para gerenciar **Configurações** no B1 Admin.
- As pessoas às quais você quer atribuir funções precisam já existir no seu diretório. Consulte [Adicionando Pessoas](adding-people.md) se precisar adicioná-las primeiro.

</div>

## Entendendo as funções

Uma função é um conjunto de permissões que você atribui a um ou mais usuários. Por exemplo, você pode criar uma função "Equipe Financeira" que concede acesso aos [registros de doações](../donations/recording-donations.md), ou uma função "Voluntário de Check-in" que permite apenas o acesso aos [recursos de presença](../attendance/check-in.md).

Cada função controla o acesso a áreas específicas do B1 Admin, incluindo:

- **Pessoas** -- visualizar e editar perfis de membros. A seção de Anotações de um registro de pessoa exige **Editar Pessoas**, e uma permissão separada, **Ver Anotações Confidenciais**, controla o acesso à seção de Anotações Confidenciais (para cuidado pastoral, histórico pessoal e anotações sensíveis semelhantes). **Ver Apenas Nomes de Pessoas** permite que alguém consulte pessoas pelo nome (vendo apenas nome, foto e situação de membro), sem acesso ao diretório completo.
- **Doações** -- gerenciar contribuições e relatórios financeiros. **Lançar Doações** é uma opção mais restrita para equipes de contagem: permite lançar ofertas, mas apenas em [lotes](../donations/batches.md#who-can-change-a-batch) que ainda estejam abertos.
- **Presença** -- registrar e visualizar dados de presença
- **Formulários** -- criar e gerenciar [formulários personalizados](../forms/creating-forms.md)
- **Grupos** -- gerenciar [participações em grupos](../groups/group-members.md) e calendários
- **Configurações** -- configurar as opções da igreja como um todo

:::warning
Os **Administradores de Domínio** têm acesso total a todas as áreas do B1 Admin. As permissões deles não podem ser editadas nem restringidas. Use essa função apenas para seus administradores principais.
:::

## Visualizando e gerenciando funções

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Funções**.
3. Você verá uma lista de todas as funções configuradas para a sua igreja.
4. Clique em qualquer função para ver os membros e as permissões dela.

## Adicionando usuários a uma função

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função à qual deseja adicionar um usuário.
3. Na seção **Membros**, pesquise a pessoa pelo nome.
4. Clique em **Adicionar** para atribuí-la à função.

O usuário terá todas as permissões associadas a essa função na próxima vez que fizer login.

## Editando as permissões de uma função

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique na função que deseja modificar.
3. Na seção **Permissões**, marque ou desmarque as áreas às quais deseja que a função tenha acesso.
4. Clique em **Salvar** para aplicar as alterações.

:::tip
Siga o princípio do menor privilégio -- dê a cada função apenas as permissões de que ela realmente precisa. Isso mantém seus dados seguros e reduz a chance de alterações acidentais.
:::

## Exemplos comuns de funções

- **Equipe do escritório** -- acesso a Pessoas, Doações, Presença e Formulários
- **Líderes de grupo** -- acesso apenas a [Grupos](../groups/creating-groups.md)
- **Voluntários de check-in** -- acesso apenas a [Presença](../attendance/check-in.md)
- **Equipe financeira** -- acesso a [Doações](../donations/recording-donations.md) e relatórios
- **Equipe de contagem** -- **Lançar Doações** e **Ver Doações**, para que os voluntários possam lançar a oferta em lotes abertos sem ver os resumos de contribuições

Consulte [Funções e Permissões](../settings/roles-permissions.md) para uma visão mais detalhada das permissões de doações e de pessoas.
