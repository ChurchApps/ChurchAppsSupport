---
title: "Atribuindo Funções"
---

# Atribuindo Funções

<div class="article-intro">

B1 Admin usa um sistema de permissões baseado em funções para controlar o que cada usuário em sua equipe pode ver e fazer. Ao atribuir funções, você pode dar acesso a equipe e voluntários às exatas áreas que eles precisam -- e nada mais. O gerenciamento adequado de funções mantém seus dados da igreja seguro enquanto capacita sua equipe a trabalhar eficientemente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso **Admin de Domínio** ou uma função com permissão para gerenciar **Configurações** no B1 Admin.
- As pessoas a quem você quer atribuir funções devem já existir em seu diretório. Consulte [Adicionando Pessoas](adding-people.md) se você precisar adicioná-los primeiro.

</div>

## Entendendo Funções

Uma função é um conjunto de permissões que você atribui a um ou mais usuários. Por exemplo, você pode criar uma função "Equipe de Finanças" que concede acesso a [registros de doação](../donations/recording-donations.md) ou uma função "Voluntário de Check-In" que apenas permite acesso aos [recursos de presença](../attendance/check-in.md).

Cada função controla o acesso a áreas específicas do B1 Admin, incluindo:

- **Pessoas** -- visualização e edição de perfis de membro. A aba Notas em um registro de pessoa requer **Editar Pessoas**, e uma permissão separada **Visualizar Notas Confidenciais** controla o acesso à seção Notas Confidenciais (para cuidado pastoral, história pessoal e notas sensíveis similares).
- **Doações** -- gerenciando contribuições e relatórios financeiros
- **Presença** -- registrando e visualizando dados de presença
- **Formulários** -- criando e gerenciando [formulários personalizados](../forms/creating-forms.md)
- **Grupos** -- gerenciando [associações de grupo](../groups/group-members.md) e calendários
- **Configurações** -- configurando configurações de toda a igreja

:::warning
**Admins de Domínio** têm acesso completo a cada área do B1 Admin. Suas permissões não podem ser editadas ou restritas. Use esta função apenas para seus administradores primários.
:::

## Visualizando e Gerenciando Funções

1. Abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Configurações**.
2. Clique em **Funções** na navegação superior.
3. Você verá uma lista de todas as funções configuradas para sua igreja.
4. Clique em qualquer função para visualizar seus membros e permissões.

## Adicionando Usuários a uma Função

1. Navegue para **Configurações** depois **Funções**.
2. Clique na função a qual você deseja adicionar um usuário.
3. Na seção **Membros**, procure pela pessoa pelo nome.
4. Clique em **Adicionar** para atribuí-lo à função.

O usuário agora terá todas as permissões associadas àquela função na próxima vez que fizer login.

## Editando Permissões de Função

1. Navegue para **Configurações** depois **Funções**.
2. Clique na função que você deseja modificar.
3. Na seção **Permissões**, marque ou desmarque as áreas às quais você deseja que a função tenha acesso.
4. Clique em **Salvar** para aplicar suas mudanças.

:::tip
Siga o princípio do privilégio mínimo -- dê a cada função apenas as permissões que ela realmente precisa. Isso mantém seus dados seguros e reduz a chance de mudanças acidentais.
:::

## Exemplos de Função Comum

- **Pessoal de Escritório** -- acesso a Pessoas, Doações, Presença e Formulários
- **Líderes de Grupo** -- acesso a [Grupos](../groups/creating-groups.md) apenas
- **Voluntários de Check-In** -- acesso a [Presença](../attendance/check-in.md) apenas
- **Equipe de Finanças** -- acesso a [Doações](../donations/recording-donations.md) e relatório
