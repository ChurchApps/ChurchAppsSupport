---
title: "Campos Personalizados"
---

# Campos Personalizados

<div class="article-intro">

**Campos Personalizados** deixam você rastrear suas próprias informações em cada registro de pessoa -- coisas que B1 não tem um campo integrado, como uma data de expiração de verificação de antecedentes, um tamanho de camiseta ou um status de aula de batismo. Você define um campo uma vez nas Configurações, depois preenche um valor no perfil de cada pessoa e procura ou constrói listas sobre ele. Isto substitui o antigo workaround de criar um formulário de Pessoas apenas para armazenar um único pedaço de dados personalizados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa **Pessoas** permissão de edição para definir campos e preencher valores, e acesso à área **Configurações**. Qualquer um com permissão de visualização de Pessoas pode ver os valores. Veja [Funções & Permissões](./roles-permissions.md).
- Decida o que você quer rastrear e qual tipo se ajusta melhor (texto, um número, uma data, uma resposta sim/não ou uma lista de seleção) antes de começar.

</div>

## Abrindo Campos Personalizados

No B1 Admin, vá para **Configurações** na barra lateral esquerda e selecione o card **Campos Personalizados**. Você também pode ir direto em **/settings/custom-fields**. Você verá uma lista de cada campo que definiu, mostrando seu **Nome** e **Tipo de Campo**. Se você ainda não criou nenhum, o painel lê *"Nenhum campo personalizado foi adicionado ainda."*

## Adicionando um Campo

1. Clique **Adicionar Campo**.
2. No editor que abre à direita, digite um **Nome** -- este é o rótulo que o staff verá nos perfis de pessoas e na busca (por exemplo, *Verificação de antecedentes expira*).
3. Escolha um **Tipo de Campo**:
   - **Caixa de Texto** -- texto curto de forma livre.
   - **Número Inteiro** -- números sem decimais (por exemplo, uma contagem).
   - **Decimal** -- números que podem incluir decimais.
   - **Data** -- uma data do calendário.
   - **Sim/Não** -- uma resposta simples sim ou não.
   - **Escolha Múltipla** -- uma lista de seleção. Quando você escolhe este tipo, um **editor de opções** aparece para que você possa adicionar cada opção que as pessoas podem selecionar.
4. Clique **Salvar**.

O campo agora está disponível no perfil de cada pessoa.

:::info
Os tipos de campo são o mesmo conjunto usado para [perguntas de formulário](../forms/creating-forms.md), então os valores se comportam consistentemente em B1.
:::

## Editando um Campo

Clique em qualquer linha de campo na lista para reabri-la no editor. Altere o nome, tipo ou opções e clique **Salvar**.

:::warning
Alterar o **Tipo de Campo** de um campo que já tem valores (por exemplo, de Caixa de Texto para Data) pode deixar valores previamente inseridos em um formato que não combina mais com o novo tipo. Altere tipos com cuidado uma vez que o staff começou a preencher o campo.
:::

## Deletando um Campo

Abra um campo para edição e clique **Deletar**. Você será perguntado para confirmar: *"Tem certeza de que deseja deletar este campo personalizado? Seus valores armazenados também serão removidos."* Deletar um campo remove permanentemente ele **e cada valor armazenado para ele** em todas as pessoas -- isto não pode ser desfeito.

## Preenchendo Valores em uma Pessoa

Uma vez que pelo menos um campo personalizado existe, seus valores vivem lado a lado com os detalhes integrados em cada registro de pessoa -- você os visualiza em **Detalhes Pessoais** e os edita no mesmo formulário que você usa para o resto das informações da pessoa. Nada extra aparece até que você defina seu primeiro campo.

1. Abra um registro de pessoa em **Pessoas**.
2. Na seção **Detalhes Pessoais**, clique no botão **Editar** (lápis).
3. Role para a área **Campos Personalizados** na parte inferior do formulário de edição e preencha um valor para cada campo. Cada campo mostra a entrada que combina com seu tipo -- um seletor de data para campos de Data, um dropdown sim/não para campos Sim/Não, uma lista de seleção para Escolha Múltipla, e assim por diante.
4. Clique **Salvar**. Seus valores de campo personalizado são salvos junto com o resto dos detalhes da pessoa.

De volta no perfil, qualquer campo que tem um valor agora mostra na seção **Detalhes Pessoais** (respostas Sim/Não leem como *Sim* ou *Não*, e Escolha Múltipla mostra o rótulo da opção). Campos deixados em branco são simplesmente ocultos. Para remover um valor, edite a pessoa, limpe o campo e salve -- um valor vazio é deletado do registro em vez de ser armazenado como em branco.

:::tip
O caso de uso clássico é segurança de voluntários: crie um campo **Data** chamado *Verificação de antecedentes expira*, registre a data de cada voluntário, depois construa uma [Lista Salva](../people/lists.md) que marca qualquer um cuja data passou.
:::

## Procurando e Construindo Listas em Campos Personalizados

Campos personalizados são totalmente pesquisáveis:

1. Na página **Pessoas**, abra a [Busca Avançada](../people/searching-people.md).
2. Expanda a categoria **Campos Personalizados**.
3. Verifique o campo em que você quer filtrar, escolha um operador e digite um valor. Os operadores oferecidos combinam com o tipo do campo:
   - **Caixa de Texto** -- contém, é igual, começa com, termina com.
   - **Número Inteiro / Decimal** -- é igual, maior que, maior que ou igual, menor que, menor que ou igual.
   - **Data** -- é igual, depois (maior que), antes (menor que).
   - **Sim/Não** -- é igual Sim ou Não.
   - **Escolha Múltipla** -- é igual ou contém uma das opções.

Salve qualquer busca de campo personalizado como uma [Lista](../people/lists.md). Listas são consultas ao vivo, então uma lista construída em *Verificação de antecedentes expira é antes de hoje* re-verifica cada pessoa cada vez que você a abre -- sem manutenção manual.

## O Que Acontece em Merge

Quando você [mescla dois registros de pessoa](../people/adding-people.md), valores de campo personalizado são transferidos automaticamente. A pessoa que você manter mantém seus próprios valores; para qualquer campo onde apenas a pessoa removida tinha um valor, esse valor é copiado para que nada seja perdido.

## Artigos Relacionados

- [Procurando Pessoas](../people/searching-people.md) -- busca avançada, incluindo a categoria Campos Personalizados
- [Listas Salvas](../people/lists.md) -- salve uma busca de campo personalizado e a execute de novo ao vivo
- [Funções & Permissões](./roles-permissions.md) -- quem pode definir campos e editar valores
- [Criando Formulários](../forms/creating-forms.md) -- para coleta de dados com múltiplas perguntas onde um formulário completo se ajusta melhor que campos únicos
