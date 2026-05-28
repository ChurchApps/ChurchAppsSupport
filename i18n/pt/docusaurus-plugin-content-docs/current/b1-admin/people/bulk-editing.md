---
title: "Edição em Massa de Pessoas"
---

# Edição em Massa de Pessoas

<div class="article-intro">
A edição em massa permite que você atualize várias pessoas de uma só vez, economizando tempo ao fazer a mesma alteração em muitos indivíduos. Você pode atualizar status de membro, estado civil, gênero, preferências de exclusão e participação em grupos em uma única operação.
</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar dados de pessoas. Consulte [Funções e Permissões](./roles-permissions.md) para detalhes.
- Você já deve ter adicionado ou importado as pessoas que deseja editar. Consulte [Adicionando Pessoas](./adding-people.md) se necessário.
</div>

## Selecionando Pessoas para Edição em Massa

1. Navegue até **Pessoas** no B1 Admin
2. Use as ferramentas de pesquisa ou filtro para encontrar as pessoas que deseja atualizar
3. Marque as caixas ao lado do nome de cada pessoa para selecioná-las
   - Você pode selecionar pessoas individualmente
   - Ou use a caixa de seleção do cabeçalho para selecionar todas as pessoas visíveis na página atual
4. Depois de selecionar pelo menos uma pessoa, o botão **Ações em Massa** aparecerá

:::tip
Se você precisar atualizar um grande grupo de pessoas com base em critérios específicos, use o recurso de [Pesquisa com IA](./ai-search.md) ou filtros para reduzir sua lista primeiro, depois selecione todas as pessoas correspondentes.
:::

## Ações em Massa Disponíveis

O menu **Ações em Massa** oferece várias opções:

### Atualizar Status de Membro

Atualize o status de membro para todas as pessoas selecionadas:

1. Clique em **Ações em Massa** → **Definir Status de Membro**
2. Escolha o novo status:
   - **Visitante** -- Participantes pela primeira vez ou ocasionais
   - **Frequentador Regular** -- Frequentadores assíduos que não são membros
   - **Membro** -- Membros oficiais da igreja
   - **Equipe** -- Membros da equipe da igreja
   - **Inativo** -- Pessoas que não estão mais frequentando
3. Escolha o modo de atualização:
   - **Sobrescrever todos** -- Substituir o status atual de todas as pessoas selecionadas
   - **Apenas atualizar vazios** -- Definir o status apenas para pessoas que não têm um
4. Clique em **Atualizar**

### Atualizar Estado Civil

Atualize o estado civil em massa:

1. Clique em **Ações em Massa** → **Definir Estado Civil**
2. Selecione o novo status:
   - **Desconhecido**
   - **Solteiro**
   - **Casado**
   - **Divorciado**
   - **Viúvo**
3. Escolha se deseja sobrescrever valores existentes ou apenas atualizar campos vazios
4. Clique em **Atualizar**

### Atualizar Gênero

Atualize informações de gênero para várias pessoas:

1. Clique em **Ações em Massa** → **Definir Gênero**
2. Selecione o valor:
   - **Não especificado**
   - **Masculino**
   - **Feminino**
3. Escolha o modo de atualização (sobrescrever todos ou apenas vazios)
4. Clique em **Atualizar**

### Atualizar Status de Exclusão

Controle se as pessoas optaram por não receber comunicações:

1. Clique em **Ações em Massa** → **Definir Exclusão**
2. Escolha:
   - **Não** -- Permitir comunicações (remover exclusão)
   - **Sim** -- Bloquear comunicações (definir exclusão)
3. Escolha o modo de atualização
4. Clique em **Atualizar**

:::warning
Tenha cuidado ao alterar o status de exclusão. Pessoas que explicitamente optaram por não receber comunicações não devem recebê-las, a menos que tenham dado novo consentimento.
:::

### Adicionar ao Grupo

Adicione todas as pessoas selecionadas a um ou mais grupos:

1. Clique em **Ações em Massa** → **Adicionar ao Grupo**
2. Pesquise e selecione o(s) grupo(s) ao(s) qual(is) deseja adicionar pessoas
3. Você pode selecionar múltiplos grupos para adicionar pessoas a todos eles
4. Clique em **Adicionar aos Grupos**

Cada pessoa será adicionada como membro regular do(s) grupo(s) selecionado(s). Você pode promover indivíduos a líderes de grupo posteriormente na página [Membros do Grupo](../groups/group-members.md).

### Remover do Grupo

Remova todas as pessoas selecionadas de um ou mais grupos:

1. Clique em **Ações em Massa** → **Remover do Grupo**
2. Pesquise e selecione o(s) grupo(s) do(s) qual(is) deseja remover pessoas
3. Você pode selecionar múltiplos grupos
4. Clique em **Remover dos Grupos**

:::info
Esta ação apenas remove pessoas dos grupos especificados. Ela não exclui seus registros de pessoa.
:::

### Excluir Pessoas

Exclua permanentemente as pessoas selecionadas do banco de dados da sua igreja:

1. Clique em **Ações em Massa** → **Excluir**
2. Revise a lista de pessoas que serão excluídas
3. Digite **DELETE** no campo de confirmação
4. Clique em **Confirmar Exclusão**

:::danger
Excluir pessoas é permanente e não pode ser desfeito. Isso removerá todos os seus dados, incluindo:
- Informações pessoais
- Participações em grupos
- Registros de presença
- Histórico de doações
- Envios de formulários

Use esta ação apenas se tiver certeza absoluta de que deseja remover essas pessoas do seu sistema.
:::

## Resultados da Edição em Massa

Após concluir uma ação em massa, você verá um resumo mostrando:

- **Total selecionado** -- Quantas pessoas foram incluídas na operação
- **Atualizados com sucesso** -- Quantos registros foram alterados
- **Falharam** -- Quaisquer registros que não puderam ser atualizados (se aplicável)
- **Inalterados** -- Registros que não precisaram de alterações (por exemplo, ao usar o modo "apenas atualizar vazios")

Se alguma atualização falhar, você verá detalhes do erro explicando o motivo.

## Melhores Práticas

- **Comece pequeno** -- Teste operações em massa em alguns registros primeiro para garantir que está fazendo as alterações corretas
- **Use filtros** -- Reduza sua lista com filtros ou pesquisa com IA antes de selecionar pessoas para garantir que está atualizando apenas os indivíduos certos
- **Verifique as seleções** -- Revise as pessoas selecionadas antes de aplicar alterações em massa
- **Use o modo "apenas atualizar vazios"** -- Quando você deseja preencher dados ausentes sem sobrescrever informações existentes
- **Documente grandes alterações** -- Mantenha notas sobre atualizações em massa caso precise referenciá-las posteriormente
- **Coordene com sua equipe** -- Avise outros administradores ao fazer grandes alterações em massa

## Casos de Uso Comuns

### Atualizando Novos Membros

Após uma aula de membros, atualize todos os participantes para o status de Membro:

1. Pesquise as pessoas que participaram da aula
2. Selecione todas elas
3. Use **Ações em Massa** → **Definir Status de Membro** → **Membro**

### Organizando Pequenos Grupos

Adicione várias pessoas a um novo pequeno grupo:

1. Pesquise as pessoas que você deseja no grupo
2. Selecione-as
3. Use **Ações em Massa** → **Adicionar ao Grupo** e selecione o pequeno grupo

### Limpando Dados

Preencha o estado civil ausente para casais:

1. Filtre por pessoas casadas (usando informações de família)
2. Selecione aquelas com estado civil em branco
3. Use **Ações em Massa** → **Definir Estado Civil** → **Casado** → **Apenas atualizar vazios**

## Artigos Relacionados

- [Pesquisando Pessoas](./searching-people.md) -- Encontre pessoas para editar
- [Pesquisa com IA](./ai-search.md) -- Use linguagem natural para encontrar grupos específicos de pessoas
- [Membros do Grupo](../groups/group-members.md) -- Gerencie participação em grupos
- [Exportando Dados](./exporting-data.md) -- Exporte dados de pessoas antes de fazer alterações em massa
