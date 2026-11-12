---
title: "Edição em massa de pessoas"
description: "Atualize a situação de membro, o estado civil, o gênero, a exclusão do diretório, o campus, os campos personalizados Sim/Não ou os grupos de muitas pessoas de uma vez no B1 Admin."
---

# Edição em massa de pessoas

<div class="article-intro">
A edição em massa permite atualizar várias pessoas de uma vez, economizando tempo ao fazer a mesma alteração em muitos registros. Você pode atualizar a situação de membro, o estado civil, o gênero, a exclusão do diretório, o campus, os campos personalizados Sim/Não, as participações em grupos e os fluxos de trabalho em uma única operação, ou excluir pessoas.
</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de permissão para gerenciar os dados de pessoas. Veja [Funções e permissões](./roles-permissions.md) para mais detalhes.
- Você já deve ter adicionado ou importado as pessoas que deseja editar. Veja [Como adicionar pessoas](./adding-people.md), se necessário.
</div>

## Selecionando pessoas para a edição em massa {#selecting-people-for-bulk-editing}

1. Acesse **Pessoas** no B1 Admin
2. Use as ferramentas de pesquisa ou de filtro para encontrar as pessoas que deseja atualizar
3. Marque as caixas para selecionar as pessoas
   - Na visualização **Domicílios**, marcar um domicílio seleciona todas as pessoas dele
   - Na visualização **Tabela** (alterne com o botão **Exibir como**), você pode selecionar as pessoas individualmente
   - Ou use a caixa de seleção acima da lista para selecionar todas as pessoas visíveis
4. Quando tiver selecionado pelo menos uma pessoa, a barra acima da lista mostra quantas estão selecionadas, junto com **Limpar seleção** e um botão **Ações**

:::tip
Se você precisar atualizar um grupo grande de pessoas com base em critérios específicos, use o recurso [Pesquisa com IA](./ai-search.md) ou os filtros para reduzir a lista primeiro e, depois, selecione todas as pessoas correspondentes.
:::

## Ações em massa disponíveis {#available-bulk-actions}

O menu **Ações** oferece as opções abaixo. Cada uma abre uma pequena caixa de diálogo que informa quantas pessoas serão alteradas; escolha um valor e clique em **Aplicar**. O novo valor substitui o que cada pessoa selecionada tinha antes. Ao terminar, uma mensagem na parte inferior da página confirma quantas pessoas foram atualizadas.

### Definir situação de membro {#set-membership-status}

1. Clique em **Ações** → **Definir situação de membro**
2. Escolha a nova **Situação de membro**:
   - **Visitante** -- participantes de primeira vez ou ocasionais
   - **Convidado** -- convidados, como famílias cadastradas em um quiosque de check-in
   - **Frequentador regular** -- participantes frequentes que não são membros
   - **Membro** -- membros oficiais da igreja
   - **Equipe** -- membros da equipe da igreja
   - **Inativo** -- pessoas que não frequentam mais
   - **Falecido** -- pessoas que já faleceram
3. Clique em **Aplicar**

### Definir estado civil {#set-marital-status}

1. Clique em **Ações** → **Definir estado civil**
2. Escolha **Desconhecido**, **Solteiro(a)**, **Casado(a)**, **Divorciado(a)** ou **Viúvo(a)**
3. Clique em **Aplicar**

### Definir gênero {#set-gender}

1. Clique em **Ações** → **Definir gênero**
2. Escolha **Não especificado**, **Masculino** ou **Feminino**
3. Clique em **Aplicar**

### Definir exclusão do diretório {#set-directory-opt-out}

A exclusão do diretório controla se as pessoas aparecem no diretório de membros -- o [diretório impresso](./print-directory.md) e o diretório de membros no aplicativo B1. É a mesma configuração de **Ocultar-me do diretório de membros** no registro de uma pessoa.

1. Clique em **Ações** → **Definir exclusão do diretório**
2. Escolha **Optou por sair - Sim** para ocultar as pessoas selecionadas do diretório, ou **Optou por sair - Não** para voltar a exibi-las
3. Clique em **Aplicar**

:::warning
Pessoas que escolheram se ocultar do diretório devem permanecer ocultas, a menos que peçam para voltar a ser listadas.
:::

### Definir campus {#set-campus}

Esta opção aparece quando a sua igreja tem [campi](../settings/campuses.md) configurados.

1. Clique em **Ações** → **Definir campus**
2. Escolha o campus
3. Clique em **Aplicar**

### Definir campo personalizado {#set-custom-field}

Defina de uma só vez o valor Sim/Não de um [campo personalizado](../settings/custom-fields.md) para todas as pessoas selecionadas:

1. Clique em **Ações** → **Definir campo personalizado**.
2. Escolha o **Campo personalizado** Sim/Não que deseja definir.
3. Escolha o **Valor** (**Sim** ou **Não**) a ser aplicado.
4. Clique em **Aplicar**.

:::info
Somente campos personalizados Sim/Não estão disponíveis nesta ação em massa. Para definir outros tipos de campo, edite cada pessoa individualmente. Se a sua igreja não tiver campos personalizados Sim/Não, a caixa de diálogo informará isso.
:::

### Adicionar a grupo {#add-to-group}

1. Clique em **Ações** → **Adicionar ao grupo**
2. Escolha o **Grupo** ao qual adicionar as pessoas. Para colocá-las em um grupo totalmente novo, marque **Criar novo grupo** e digite um **Nome do novo grupo**.
3. Clique em **Aplicar**

Cada pessoa é adicionada como membro comum do grupo. Depois, você pode promover indivíduos a líderes de grupo na página [Membros do grupo](../groups/group-members.md). Para adicionar pessoas a vários grupos, repita o processo para cada grupo.

### Remover do grupo {#remove-from-group}

1. Clique em **Ações** → **Remover do grupo**
2. Escolha o **Grupo** do qual remover as pessoas
3. Clique em **Aplicar**

:::info
Esta ação apenas remove as pessoas do grupo. Ela não exclui os registros delas.
:::

### Adicionar a fluxo de trabalho {#add-to-workflow}

Adicione as pessoas selecionadas a um [fluxo de trabalho](../serving/workflows.md) na forma de cartões:

1. Clique em **Ações** → **Adicionar ao fluxo de trabalho**
2. Escolha o fluxo de trabalho
3. Clique em **Aplicar**

### Excluir pessoas {#delete-people}

Exclua as pessoas selecionadas do banco de dados da sua igreja:

1. Clique em **Ações** → **Excluir**
2. A caixa de diálogo **Excluir pessoas selecionadas** pede que você confirme quantas pessoas serão excluídas
3. Clique em **Excluir**

:::danger
As pessoas excluídas desaparecem do seu diretório, dos grupos e das pesquisas. Use esta ação somente se tiver certeza de que deseja remover essas pessoas do sistema.
:::

Você não pode selecionar a si mesmo, por isso não é possível excluir ou editar em massa o seu próprio registro.


## Boas práticas {#best-practices}

- **Comece pequeno** -- Teste as operações em massa em alguns registros primeiro, para garantir que está fazendo as alterações certas
- **Use filtros** -- Reduza sua lista com filtros ou com a pesquisa com IA antes de selecionar pessoas, para garantir que está atualizando apenas os indivíduos certos
- **Confira as seleções duas vezes** -- Revise as pessoas selecionadas antes de aplicar alterações em massa
- **Documente alterações importantes** -- Registre anotações sobre as atualizações em massa, caso precise consultá-las depois
- **Alinhe com a sua equipe** -- Avise os outros administradores quando fizer grandes alterações em massa

## Casos de uso comuns {#common-use-cases}

### Atualizando novos membros {#updating-new-members}

Depois de uma aula de membresia, atualize todos os participantes para a situação de Membro:

1. Pesquise as pessoas que participaram da aula
2. Selecione todas elas
3. Use **Ações** → **Definir situação de membro** → **Membro**

### Organizando pequenos grupos {#organizing-small-groups}

Adicione várias pessoas a um novo pequeno grupo:

1. Pesquise as pessoas que deseja no grupo
2. Selecione-as
3. Use **Ações** → **Adicionar ao grupo** e selecione o pequeno grupo

### Limpando os dados {#cleaning-up-data}

Marque um grupo de antigos participantes como inativos:

1. Abra a pesquisa **Avançada** e filtre as pessoas que deseja atualizar (por exemplo, todas que não frequentam há algum tempo)
2. Selecione-as
3. Use **Ações** → **Definir situação de membro** → **Inativo**

## Artigos relacionados {#related-articles}

- [Pesquisando pessoas](./searching-people.md) -- Encontre as pessoas a editar
- [Pesquisa com IA](./ai-search.md) -- Use linguagem natural para encontrar grupos específicos de pessoas
- [Membros do grupo](../groups/group-members.md) -- Gerencie a participação em grupos
- [Exportando dados](./exporting-data.md) -- Exporte os dados das pessoas antes de fazer alterações em massa
