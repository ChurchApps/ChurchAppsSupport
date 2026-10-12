---
title: "Edição em Massa de Pessoas"
---

# Edição em Massa de Pessoas

<div class="article-intro">
A edição em massa permite atualizar várias pessoas de uma só vez, economizando tempo ao fazer a mesma alteração em muitos indivíduos. Você pode atualizar o status de membro, o estado civil, o gênero, as preferências de cancelamento de comunicações e as participações em grupos em uma única operação.
</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar os dados de pessoas. Consulte [Funções e Permissões](./roles-permissions.md) para detalhes.
- Você já deve ter adicionado ou importado as pessoas que deseja editar. Consulte [Adicionando Pessoas](./adding-people.md) se necessário.
</div>

## Selecionando Pessoas para Edição em Massa

1. Navegue até **Pessoas** no B1 Admin
2. Use as ferramentas de pesquisa ou filtro para encontrar as pessoas que deseja atualizar
3. Marque as caixas para selecionar pessoas
   - Na visualização **Famílias**, marcar uma família seleciona todas as pessoas nela
   - Na visualização **Tabela** (alterne com o botão **Ver como**), você pode selecionar pessoas individualmente
   - Ou use a caixa de seleção acima da lista para selecionar todas as pessoas visíveis
4. Depois de selecionar pelo menos uma pessoa, a barra acima da lista mostra quantas estão selecionadas, junto com **Clear Selection** e um botão **Actions**

:::tip
Se precisar atualizar um grande grupo de pessoas com base em critérios específicos, use o recurso [Pesquisa AI](./ai-search.md) ou filtros para reduzir primeiro a sua lista e depois selecione todas as pessoas correspondentes.
:::

## Ações em Massa Disponíveis

O menu **Actions** oferece várias opções:

### Atualizar Status de Membro

Atualize o status de membro de todas as pessoas selecionadas:

1. Clique em **Actions** → **Set Membership Status**
2. Escolha o novo status:
   - **Visitor** -- Visitantes na primeira vez ou ocasionais
   - **Guest** -- Convidados, como famílias registradas em um quiosque de check-in
   - **Regular Attendee** -- Frequentadores assíduos que não são membros
   - **Member** -- Membros oficiais da igreja
   - **Staff** -- Funcionários da igreja
   - **Inactive** -- Pessoas que não frequentam mais
   - **Deceased** -- Pessoas que faleceram
3. Escolha o modo de atualização:
   - **Overwrite all** -- Substitui o status atual de todas as pessoas selecionadas
   - **Only update empty** -- Define o status apenas para pessoas que não têm um
4. Clique em **Update**

### Atualizar Estado Civil

Atualize o estado civil em massa:

1. Clique em **Actions** → **Set Marital Status**
2. Selecione o novo status:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Escolha se deseja sobrescrever os valores existentes ou atualizar apenas os campos vazios
4. Clique em **Update**

### Atualizar Gênero

Atualize as informações de gênero de várias pessoas:

1. Clique em **Actions** → **Set Gender**
2. Selecione o valor:
   - **Unspecified**
   - **Male**
   - **Female**
3. Escolha o modo de atualização (sobrescrever todos ou apenas os vazios)
4. Clique em **Update**

### Atualizar Status de Cancelamento de Comunicações

Controle se as pessoas optaram por não receber comunicações:

1. Clique em **Actions** → **Set Directory Opt-Out**
2. Escolha:
   - **No** -- Permitir comunicações (remover o cancelamento)
   - **Yes** -- Bloquear comunicações (definir o cancelamento)
3. Escolha o modo de atualização
4. Clique em **Update**

:::warning
Tenha cuidado ao alterar o status de cancelamento. Pessoas que optaram explicitamente por não receber comunicações não devem recebê-las, a menos que tenham dado um novo consentimento.
:::

### Definir Campo Personalizado

Defina um valor Sim/Não de um [campo personalizado](../settings/custom-fields.md) para todas as pessoas selecionadas de uma vez:

1. Clique em **Actions** → **Set Custom Field**.
2. Escolha o campo personalizado Sim/Não que deseja definir.
3. Escolha o valor (**Yes** ou **No**) a aplicar.
4. Clique em **Update**.

:::info
Apenas campos personalizados Sim/Não estão disponíveis para esta ação em massa. Para definir outros tipos de campo, edite cada pessoa individualmente.
:::

### Adicionar a Grupo

Adicione todas as pessoas selecionadas a um ou mais grupos:

1. Clique em **Actions** → **Add to Group**
2. Pesquise e selecione o(s) grupo(s) ao(s) qual(is) deseja adicionar as pessoas
3. Você pode selecionar vários grupos para adicionar as pessoas a todos eles
4. Clique em **Add to Groups**

Cada pessoa será adicionada como membro regular do(s) grupo(s) selecionado(s). Depois, se necessário, você pode promover indivíduos a líderes de grupo na página [Membros do Grupo](../groups/group-members.md).

### Remover de Grupo

Remova todas as pessoas selecionadas de um ou mais grupos:

1. Clique em **Actions** → **Remove from Group**
2. Pesquise e selecione o(s) grupo(s) dos quais deseja remover as pessoas
3. Você pode selecionar vários grupos
4. Clique em **Remove from Groups**

:::info
Esta ação apenas remove as pessoas dos grupos especificados. Não exclui os registros dessas pessoas.
:::

### Excluir Pessoas

Exclua permanentemente as pessoas selecionadas do banco de dados da sua igreja:

1. Clique em **Actions** → **Delete**
2. A caixa de diálogo **Delete Selected People** pede que você confirme quantas pessoas serão excluídas
3. Clique em **Delete**

:::danger
A exclusão de pessoas é permanente e não pode ser desfeita. Isso removerá todos os dados delas, incluindo:
- Informações pessoais
- Participações em grupos
- Registros de frequência
- Histórico de doações
- Envios de formulários

Use esta ação apenas se tiver certeza absoluta de que deseja remover essas pessoas do seu sistema.
:::

## Resultados da Edição em Massa

Após concluir uma ação em massa, você verá um resumo mostrando:

- **Total selected** -- Quantas pessoas foram incluídas na operação
- **Successfully updated** -- Quantos registros foram alterados
- **Failed** -- Quaisquer registros que não puderam ser atualizados (se aplicável)
- **Unchanged** -- Registros que não precisavam de alterações (por exemplo, ao usar o modo "only update empty")

Se alguma atualização falhar, você verá os detalhes do erro explicando o motivo.

## Boas Práticas

- **Comece pequeno** -- Teste as operações em massa em alguns registros primeiro para garantir que está fazendo as alterações certas
- **Use filtros** -- Reduza sua lista com filtros ou pesquisa AI antes de selecionar pessoas, para garantir que está atualizando apenas os indivíduos certos
- **Confira as seleções duas vezes** -- Revise as pessoas selecionadas antes de aplicar alterações em massa
- **Use o modo "only update empty"** -- Quando quiser preencher dados ausentes sem sobrescrever informações existentes
- **Documente alterações importantes** -- Mantenha anotações sobre atualizações em massa caso precise consultá-las depois
- **Alinhe-se com sua equipe** -- Avise os outros administradores quando fizer grandes alterações em massa

## Casos de Uso Comuns

### Atualizando Novos Membros

Depois de uma aula de membresia, atualize todos os participantes para o status Member:

1. Pesquise as pessoas que participaram da aula
2. Selecione todas elas
3. Use **Actions** → **Set Membership Status** → **Member**

### Organizando Pequenos Grupos

Adicione várias pessoas a um novo pequeno grupo:

1. Pesquise as pessoas que deseja no grupo
2. Selecione-as
3. Use **Actions** → **Add to Group** e selecione o pequeno grupo

### Limpando Dados

Preencha o estado civil ausente de casais casados:

1. Filtre as pessoas que são casadas (usando as informações de família)
2. Selecione aquelas com o estado civil em branco
3. Use **Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Artigos Relacionados

- [Pesquisando Pessoas](./searching-people.md) -- Encontre pessoas para editar
- [Pesquisa AI](./ai-search.md) -- Use linguagem natural para encontrar grupos específicos de pessoas
- [Membros do Grupo](../groups/group-members.md) -- Gerencie a participação em grupos
- [Exportando Dados](./exporting-data.md) -- Exporte os dados de pessoas antes de fazer alterações em massa
