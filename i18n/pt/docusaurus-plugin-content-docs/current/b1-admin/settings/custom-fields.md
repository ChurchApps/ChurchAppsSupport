---
title: "Campos Personalizados"
---

# Campos Personalizados

<div class="article-intro">

Os **Campos Personalizados** permitem que você acompanhe suas próprias informações em cada registro de pessoa — coisas para as quais o B1 não tem um campo integrado, como uma data de expiração de verificação de antecedentes, um tamanho de camiseta ou o status de uma turma de batismo. Você define um campo uma vez em Settings e, em seguida, preenche um valor no perfil de cada pessoa e pesquisa ou constrói listas com base nele. Isso substitui a solução alternativa antiga de criar um formulário de People apenas para armazenar um único dado personalizado.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão de edição em **People** para definir campos e preencher valores, e de acesso à área **Settings**. Qualquer pessoa com permissão de visualização de People pode ver os valores. Veja [Funções e Permissões](./roles-permissions.md).
- Decida o que você quer acompanhar e qual tipo se encaixa melhor (texto, número, data, resposta sim/não ou uma lista de opções) antes de começar.

</div>

## Abrindo Campos Personalizados

No B1 Admin, vá em **Settings** na barra lateral esquerda e selecione o card **Custom Fields**. Você também pode ir diretamente para **/settings/custom-fields**. Você verá uma lista de todos os campos já definidos, mostrando o **Name** e o **Field Type**. Se você ainda não criou nenhum, o painel exibe *"No custom fields have been added yet."*

## Adicionando um Campo

1. Clique em **Add Field**.
2. No editor que se abre à direita, digite um **Name** — esse é o rótulo que a equipe verá nos perfis de pessoas e na pesquisa (por exemplo, *Background check expires*).
3. Escolha um **Field Type**:
   - **Textbox** — texto curto livre.
   - **Whole Number** — números sem casas decimais (por exemplo, uma contagem).
   - **Decimal** — números que podem incluir casas decimais.
   - **Date** — uma data de calendário.
   - **Yes/No** — uma resposta simples de sim ou não.
   - **Multiple Choice** — uma lista de opções. Ao escolher esse tipo, um **editor de opções** aparece para que você possa adicionar cada alternativa que as pessoas poderão selecionar.
4. Clique em **Save**.

O campo agora está disponível no perfil de todas as pessoas.

:::info
Os tipos de campo são o mesmo conjunto usado nas [perguntas de formulário](../forms/creating-forms.md), então os valores se comportam de forma consistente em todo o B1.
:::

## Editando um Campo

Clique em qualquer linha de campo na lista para reabri-lo no editor. Altere o nome, o tipo ou as opções e clique em **Save**.

:::warning
Alterar o **Field Type** de um campo que já tem valores (por exemplo, de Textbox para Date) pode deixar os valores já inseridos em um formato que não corresponde mais ao novo tipo. Altere os tipos com cuidado depois que a equipe já começou a preencher o campo.
:::

## Excluindo um Campo

Abra um campo para edição e clique em **Delete**. Você será solicitado a confirmar: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Excluir um campo remove permanentemente ele **e todos os valores armazenados para ele** em todas as pessoas — isso não pode ser desfeito.

## Preenchendo Valores em uma Pessoa

Assim que pelo menos um campo personalizado existe, seus valores ficam junto com os detalhes integrados no registro de cada pessoa — você os visualiza em **Personal Details** e os edita no mesmo formulário usado para o restante das informações da pessoa. Nada extra aparece até que você tenha definido seu primeiro campo.

1. Abra o registro de uma pessoa em **People**.
2. Na seção **Personal Details**, clique no botão **Edit** (lápis).
3. Role até a área **Custom Fields**, na parte inferior do formulário de edição, e preencha um valor para cada campo. Cada campo mostra o controle correspondente ao seu tipo — um seletor de data para campos Date, um menu suspenso sim/não para campos Yes/No, uma lista de opções para Multiple Choice, e assim por diante.
4. Clique em **Save**. Seus valores de campo personalizado são salvos junto com o restante dos detalhes da pessoa.

De volta ao perfil, qualquer campo com um valor agora aparece na seção **Personal Details** (respostas Yes/No aparecem como *Yes* ou *No*, e Multiple Choice mostra o rótulo da opção). Campos deixados em branco simplesmente ficam ocultos. Para remover um valor, edite a pessoa, limpe o campo e salve — um valor vazio é excluído do registro, em vez de armazenado como vazio.

:::tip
O caso de uso clássico é a segurança de voluntários: crie um campo **Date** chamado *Background check expires*, registre a data de cada voluntário e depois construa uma [Lista Salva](../people/lists.md) que sinalize qualquer pessoa cuja data já tenha passado.
:::

## Pesquisando e Construindo Listas com Campos Personalizados

Os campos personalizados são totalmente pesquisáveis:

1. Na página **People**, abra a [Pesquisa Avançada](../people/searching-people.md).
2. Expanda a categoria **Custom Fields**.
3. Marque o campo pelo qual deseja filtrar, escolha um operador e digite um valor. Os operadores oferecidos correspondem ao tipo do campo:
   - **Textbox** — contém, é igual a, começa com, termina com.
   - **Whole Number / Decimal** — igual a, maior que, maior ou igual a, menor que, menor ou igual a.
   - **Date** — igual a, depois de (maior que), antes de (menor que).
   - **Yes/No** — igual a Yes ou No.
   - **Multiple Choice** — igual a ou contém uma das opções.

Salve qualquer pesquisa de campo personalizado como uma [Lista](../people/lists.md). Listas são consultas dinâmicas, então uma lista construída com *Background check expires is before today* verifica novamente cada pessoa toda vez que você a abre — sem manutenção manual.

## O Que Acontece na Mesclagem

Ao [mesclar dois registros de pessoa](../people/adding-people.md), os valores de campos personalizados são transferidos automaticamente. A pessoa que você mantém conserva seus próprios valores; para qualquer campo em que apenas a pessoa removida tinha um valor, esse valor é copiado para que nada se perca.

## Artigos Relacionados

- [Pesquisando Pessoas](../people/searching-people.md) — pesquisa avançada, incluindo a categoria Custom Fields
- [Listas Salvas](../people/lists.md) — salve uma pesquisa de campo personalizado e execute-a novamente ao vivo
- [Funções e Permissões](./roles-permissions.md) — quem pode definir campos e editar valores
- [Criando Formulários](../forms/creating-forms.md) — para coleta de dados com várias perguntas, quando um formulário completo se encaixa melhor do que campos individuais
