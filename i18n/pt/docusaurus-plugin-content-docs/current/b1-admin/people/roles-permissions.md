---
title: "Atribuindo papéis"
---

# Atribuindo papéis

<div class="article-intro">

O B1 Admin usa um sistema de permissões baseado em papéis para controlar o que cada usuário da sua equipe pode ver e fazer. Ao atribuir papéis, você pode dar à equipe e aos voluntários acesso exatamente às áreas de que precisam — nem mais, nem menos. Uma boa gestão de papéis mantém os dados da sua igreja seguros e permite que a sua equipe trabalhe com eficiência.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de acesso de **Administrador de domínio** ou de um papel com permissão para gerenciar as **Configurações** no B1 Admin.
- As pessoas às quais você quer atribuir papéis precisam já existir no seu diretório. Veja [Adicionando pessoas](adding-people.md) se você precisar adicioná-las primeiro.

</div>

## Entendendo os papéis

Um papel é um conjunto de permissões que você atribui a um ou mais usuários. Por exemplo, você pode criar um papel "Equipe Financeira" que concede acesso aos [registros de doações](../donations/recording-donations.md), ou um papel "Voluntário de Check-in" que permite acesso apenas aos [recursos de presença](../attendance/check-in.md).

Cada papel controla o acesso a áreas específicas do B1 Admin, incluindo:

- **Pessoas** -- visualizar e editar perfis de membros. A seção de Notas de um registro de pessoa exige **Editar Pessoas**, e a permissão separada **Ver Notas Confidenciais** controla o acesso à seção de Notas Confidenciais (para cuidado pastoral, histórico pessoal e notas semelhantes de natureza sensível). **Ver Apenas Nomes de Pessoas** permite que alguém procure pessoas pelo nome (vendo apenas nome, foto e situação de membro) sem acesso ao diretório completo. Combinada com **Ver Presença** ou **Editar Presença**, ela permite que um voluntário abra **Grupos** e veja as listas de chamada das turmas pelo nome; com **Editar Presença**, ele também pode [registrar a presença](../attendance/recording-attendance.md). Veja [Apenas Nomes de Pessoas](../settings/roles-permissions.md#people-names-only).
- **Doações** -- gerenciar contribuições e relatórios financeiros. **Lançar Doações** é uma opção mais restrita para equipes de contagem: permite que alguém lance contribuições, mas apenas em [lotes](../donations/batches.md#who-can-change-a-batch) que ainda estejam abertos.
- **Presença** -- registrar e visualizar dados de presença
- **Formulários** -- criar e gerenciar [formulários personalizados](../forms/creating-forms.md)
- **Grupos** -- gerenciar [participações em grupos](../groups/group-members.md) e calendários
- **Configurações** -- configurar opções de toda a igreja

:::warning
Os **Administradores de domínio** têm acesso completo a todas as áreas do B1 Admin. Suas permissões não podem ser editadas nem restringidas. Use este papel somente para os seus administradores principais.
:::

## Visualizando e gerenciando papéis

1. Abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin) e expanda **Configurações**.
2. Clique em **Papéis**.
3. Você verá uma lista de todos os papéis configurados para a sua igreja, com uma coluna **Membros** mostrando quantos usuários há em cada papel.
4. Clique em qualquer papel para ver os seus membros e permissões.

## Adicionando usuários a um papel

1. No menu de atalhos, escolha **Configurações > Papéis**.
2. Clique no papel ao qual você quer adicionar um usuário.
3. Na seção **Membros**, pesquise a pessoa pelo nome.
4. Clique em **Adicionar** para atribuí-la ao papel.

O usuário terá todas as permissões associadas a esse papel na próxima vez que entrar no sistema.

## Editando permissões de um papel

1. No menu de atalhos, escolha **Configurações > Papéis**.
2. Clique no papel que você quer modificar.
3. Na seção **Permissões**, marque ou desmarque as áreas às quais você quer que o papel tenha acesso. Cada grupo de permissões mostra quantas das suas permissões estão marcadas (por exemplo, **2 de 5**).
4. Cada alteração é salva assim que você marca ou desmarca uma caixa.

:::tip
Siga o princípio do menor privilégio -- conceda a cada papel apenas as permissões de que ele realmente precisa. Isso mantém os seus dados seguros e reduz a chance de alterações acidentais.
:::

## Exemplos comuns de papéis

- **Equipe do escritório** -- acesso a Pessoas, Doações, Presença e Formulários
- **Líderes de grupo** -- acesso somente a [Grupos](../groups/creating-groups.md)
- **Voluntários de check-in** -- acesso somente a [Presença](../attendance/check-in.md)
- **Equipe financeira** -- acesso a [Doações](../donations/recording-donations.md) e relatórios
- **Equipe de contagem** -- **Lançar Doações** e **Ver Doações**, para que os voluntários possam lançar a oferta em lotes abertos sem ver os resumos de contribuições

Veja [Papéis e Permissões](../settings/roles-permissions.md) para uma análise mais detalhada das permissões de doações e de pessoas.
