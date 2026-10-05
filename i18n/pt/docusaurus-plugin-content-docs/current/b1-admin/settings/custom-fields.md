---
title: "Campos Personalizados"
---

# Campos Personalizados

<div class="article-intro">

**Custom Fields** (Campos Personalizados) permitem que você acompanhe suas próprias informações em cada registro de pessoa -- coisas que B1 não tem um campo integrado para, como uma data de vencimento de verificação de antecedentes, um tamanho de camiseta ou um status de aula de batismo. Você define um campo uma vez em Configurações, depois preenche um valor no perfil de cada pessoa e pesquisa ou cria listas nele. Isso substitui a solução alternativa mais antiga de criar um formulário de Pessoas apenas para armazenar um único dado personalizado.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão de edição de **People** (Pessoas) para definir campos e preencher valores, e acesso à área **Settings** (Configurações). Qualquer pessoa com permissão de visualização de Pessoas pode ver os valores. Consulte [Funções e Permissões](./roles-permissions.md).
- Decida o que você deseja acompanhar e qual tipo se encaixa melhor (texto, um número, uma data, uma resposta sim/não ou uma lista de seleção) antes de começar.

</div>

## Abrindo Campos Personalizados

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), escolha **Settings > Settings** (Configurações > Configurações) e selecione o cartão **Custom Fields** (Campos Personalizados). Você também pode ir diretamente para lá em **/settings/custom-fields**. Você verá uma lista de cada campo que definiu, mostrando seu **Name** (Nome) e **Field Type** (Tipo de Campo). Se você não tiver criado nenhum ainda, o painel lerá *"No custom fields have been added yet."* (Nenhum campo personalizado foi adicionado ainda.)

## Adicionando um Campo

1. Clique em **Add Field** (Adicionar Campo).
2. No editor que se abre à direita, insira um **Name** (Nome) -- este é o rótulo que a equipe verá nos perfis de pessoas e na pesquisa (por exemplo, *Background check expires* (Verificação de antecedentes expira)).
3. Escolha um **Field Type** (Tipo de Campo):
   - **Textbox** (Caixa de Texto) -- texto livre curto.
   - **Whole Number** (Número Inteiro) -- números sem decimais (por exemplo, uma contagem).
   - **Decimal** (Decimal) -- números que podem incluir decimais.
   - **Date** (Data) -- uma data do calendário.
   - **Yes/No** (Sim/Não) -- uma resposta simples de sim ou não.
   - **Multiple Choice** (Múltipla Escolha) -- uma lista de seleção. Quando você escolhe este tipo, um **editor de opções** aparece para que você possa adicionar cada opção que as pessoas podem selecionar.
4. Clique em **Save** (Salvar).

O campo agora está disponível no perfil de cada pessoa.

:::info
Os tipos de campo são o mesmo conjunto usado para [perguntas de formulário](../forms/creating-forms.md), portanto os valores se comportam consistentemente em todo o B1.
:::

## Editando um Campo

Clique em qualquer linha de campo na lista para reabri-lo no editor. Altere o nome, tipo ou opções e clique em **Save** (Salvar).

:::warning
Alterar o **Field Type** (Tipo de Campo) de um campo que já possui valores (por exemplo, de Caixa de Texto para Data) pode deixar valores previamente inseridos em um formato que não corresponda mais ao novo tipo. Altere os tipos com cuidado uma vez que a equipe tenha começado a preencher o campo.
:::

## Deletando um Campo

Abra um campo para edição e clique em **Delete** (Deletar). Você será solicitado a confirmar: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* (Tem certeza de que deseja deletar este campo personalizado? Seus valores armazenados também serão removidos.) A exclusão de um campo remove permanentemente **todo valor armazenado para ele** em todas as pessoas -- isso não pode ser desfeito.

## Preenchendo Valores em uma Pessoa

Uma vez que pelo menos um campo personalizado exista, seus valores vivem bem ao lado dos detalhes integrados em cada registro de pessoa -- você os visualiza em **Personal Details** (Detalhes Pessoais) e os edita no mesmo formulário que usa para o resto das informações da pessoa. Nada extra aparece até você ter definido seu primeiro campo.

1. Abra o registro de uma pessoa em **People** (Pessoas).
2. Na seção **Personal Details** (Detalhes Pessoais), clique no botão **Edit** (Editar) (lápis).
3. Role para a área **Custom Fields** (Campos Personalizados) na parte inferior do formulário de edição e preencha um valor para cada campo. Cada campo mostra a entrada que corresponde ao seu tipo -- um seletor de data para campos Date, um menu suspenso sim/não para campos Yes/No, uma lista de seleção para Multiple Choice, e assim por diante.
4. Clique em **Save** (Salvar). Seus valores de campo personalizado são salvos junto com o resto dos detalhes da pessoa.

De volta ao perfil, qualquer campo que tenha um valor agora mostra na seção **Personal Details** (Detalhes Pessoais) (respostas Sim/Não são lidas como *Yes* (Sim) ou *No* (Não), e Multiple Choice mostra o rótulo da opção). Campos deixados em branco são simplesmente ocultados. Para remover um valor, edite a pessoa, limpe o campo e salve -- um valor vazio é deletado do registro em vez de ser armazenado em branco.

:::tip
O caso de uso clássico é segurança de voluntários: crie um campo **Date** (Data) chamado *Background check expires* (Verificação de antecedentes expira), registre a data de cada voluntário, depois construa uma [Lista Salva](../people/lists.md) que sinaliza qualquer pessoa cuja data tenha passado.
:::

## Pesquisando e Construindo Listas em Campos Personalizados

Campos personalizados são totalmente pesquisáveis:

1. Na página **People** (Pessoas), abra a [Advanced Search](../people/searching-people.md) (Pesquisa Avançada).
2. Expanda a categoria **Custom Fields** (Campos Personalizados).
3. Marque o campo em que você deseja filtrar, escolha um operador e insira um valor. Os operadores oferecidos correspondem ao tipo do campo:
   - **Textbox** (Caixa de Texto) -- contains (contém), equals (iguala), starts with (começa com), ends with (termina com).
   - **Whole Number / Decimal** (Número Inteiro / Decimal) -- equals (iguala), greater than (maior que), greater than or equal (maior ou igual), less than (menor que), less than or equal (menor ou igual).
   - **Date** (Data) -- equals (iguala), after (depois - maior que), before (antes - menor que).
   - **Yes/No** (Sim/Não) -- equals (iguala) Sim ou Não.
   - **Multiple Choice** (Múltipla Escolha) -- equals (iguala) ou contains one of the choices (contém uma das opções).

Salve qualquer pesquisa de campo personalizado como uma [List](../people/lists.md) (Lista). As listas são consultas ao vivo, portanto uma lista construída em *Background check expires is before today* (Verificação de antecedentes é antes de hoje) verifica novamente cada pessoa cada vez que você a abre -- sem manutenção manual.

## Mostrando um Campo Personalizado como uma Coluna

Para ver os valores de um campo para todos de uma vez, adicione-o como uma coluna na página **People** (Pessoas). Abra o seletor de coluna, alterne para a aba **Custom** (Personalizado) e marque o campo. O valor de cada pessoa aparece em sua própria coluna ao lado dos valores integrados. Consulte [Mostrando Campos Personalizados como Colunas](../people/searching-people.md#showing-custom-fields-as-columns).

## O que Acontece na Mesclagem

Quando você [mescla dois registros de pessoa](../people/adding-people.md), os valores de campo personalizado são transferidos automaticamente. A pessoa que você mantém se agarra aos seus próprios valores; para qualquer campo onde apenas a pessoa removida tinha um valor, esse valor é copiado para que nada seja perdido.

## Artigos Relacionados

- [Searching People](../people/searching-people.md) -- pesquisa avançada, incluindo a categoria Custom Fields, e mostrando campos personalizados como colunas
- [Saved Lists](../people/lists.md) -- salve uma pesquisa de campo personalizado e a execute novamente ao vivo
- [Roles & Permissions](./roles-permissions.md) -- quem pode definir campos e editar valores
- [Creating Forms](../forms/creating-forms.md) -- para coleta de dados de múltiplas perguntas onde um formulário completo se encaixa melhor que campos únicos
