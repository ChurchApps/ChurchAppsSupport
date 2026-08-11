---
title: "Campos Personalizados"
---

# Campos Personalizados

<div class="article-intro">

**Campos Personalizados** permitem que você acompanhe suas próprias informações em todos os registros de pessoas — coisas que o B1 não tem um campo integrado, como uma data de expiração de verificação de antecedentes, um tamanho de camiseta ou status de uma aula de batismo. Você define um campo uma vez em Configurações, depois preenche um valor no perfil de cada pessoa e pesquisa ou constrói listas com base nele. Isso substitui o trabalho anterior de criar um formulário de Pessoas apenas para armazenar um único dado.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão de **Pessoas** para definir campos e preencher valores, além de acesso à área **Configurações**. Qualquer pessoa com permissão de visualização de Pessoas pode ver os valores. Consulte [Funções e Permissões](./roles-permissions.md).
- Decida o que deseja acompanhar e qual tipo se adapta melhor (texto, número, data, resposta sim/não ou lista de seleção) antes de começar.

</div>

## Abrindo Campos Personalizados

Em B1 Admin, abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta), escolha **Configurações** e selecione o cartão **Campos Personalizados**. Você também pode ir diretamente para **/settings/custom-fields**. Você verá uma lista de cada campo definido, mostrando seu **Nome** e **Tipo de Campo**. Se você ainda não criou nenhum, o painel exibe *"Nenhum campo personalizado foi adicionado ainda."*

## Adicionando um Campo

1. Clique em **Adicionar Campo**.
2. No editor que se abre à direita, digite um **Nome** — este é o rótulo que a equipe verá nos perfis de pessoas e na pesquisa (por exemplo, *Verificação de antecedentes expira*).
3. Escolha um **Tipo de Campo**:
   - **Caixa de Texto** — texto livre de forma curta.
   - **Número Inteiro** — números sem decimais (por exemplo, uma contagem).
   - **Decimal** — números que podem incluir decimais.
   - **Data** — uma data de calendário.
   - **Sim/Não** — uma resposta simples de sim ou não.
   - **Múltipla Escolha** — uma lista de seleção. Ao escolher este tipo, um **editor de escolhas** aparece para que você possa adicionar cada opção que as pessoas podem selecionar.
4. Clique em **Salvar**.

O campo agora está disponível no perfil de cada pessoa.

:::info
Os tipos de campo são o mesmo conjunto usado para [perguntas de formulário](../forms/creating-forms.md), então os valores se comportam consistentemente em B1.
:::

## Editando um Campo

Clique em qualquer linha de campo na lista para reabri-lo no editor. Altere o nome, tipo ou escolhas e clique em **Salvar**.

:::warning
Alterar o **Tipo de Campo** de um campo que já possui valores (por exemplo, de Caixa de Texto para Data) pode deixar valores previamente inseridos em um formato que não corresponde mais ao novo tipo. Altere os tipos com cuidado uma vez que a equipe começou a preencher o campo.
:::

## Deletando um Campo

Abra um campo para edição e clique em **Deletar**. Será solicitado que você confirme: *"Tem certeza de que deseja deletar este campo personalizado? Seus valores armazenados também serão removidos."* Deletar um campo remove permanentemente ele **e cada valor armazenado para ele** em todas as pessoas — isso não pode ser desfeito.

## Preenchendo Valores em uma Pessoa

Uma vez que pelo menos um campo personalizado existe, seus valores ficam logo ao lado dos detalhes integrados em cada registro de pessoa — você os visualiza em **Detalhes Pessoais** e os edita no mesmo formulário que usa para o resto das informações da pessoa. Nada extra aparece até que você defina seu primeiro campo.

1. Abra o registro de uma pessoa em **Pessoas**.
2. Na seção **Detalhes Pessoais**, clique no botão **Editar** (ícone de lápis).
3. Role até a área **Campos Personalizados** na parte inferior do formulário de edição e preencha um valor para cada campo. Cada campo mostra o campo de entrada que corresponde ao seu tipo — um seletor de data para campos de Data, um dropdown sim/não para campos Sim/Não, uma lista de seleção para Múltipla Escolha, e assim por diante.
4. Clique em **Salvar**. Seus valores de campo personalizado são salvos junto com o resto dos detalhes da pessoa.

De volta ao perfil, qualquer campo que tenha um valor agora aparece na seção **Detalhes Pessoais** (respostas Sim/Não aparecem como *Sim* ou *Não*, e Múltipla Escolha mostra o rótulo da opção). Campos deixados em branco são simplesmente ocultos. Para remover um valor, edite a pessoa, limpe o campo e salve — um valor vazio é deletado do registro em vez de armazenado como em branco.

:::tip
O caso clássico de uso é segurança voluntária: crie um campo **Data** chamado *Verificação de antecedentes expira*, registre a data de cada voluntário, depois construa uma [Lista Salva](../people/lists.md) que sinaliza qualquer pessoa cuja data tenha passado.
:::

## Pesquisando e Construindo Listas em Campos Personalizados

Campos personalizados são totalmente pesquisáveis:

1. Na página **Pessoas**, abra a [Pesquisa Avançada](../people/searching-people.md).
2. Expanda a categoria **Campos Personalizados**.
3. Marque o campo em que deseja filtrar, escolha um operador e digite um valor. Os operadores oferecidos correspondem ao tipo do campo:
   - **Caixa de Texto** — contém, é igual, começa com, termina com.
   - **Número Inteiro / Decimal** — é igual, maior que, maior ou igual, menor que, menor ou igual.
   - **Data** — é igual, depois (maior que), antes (menor que).
   - **Sim/Não** — é igual a Sim ou Não.
   - **Múltipla Escolha** — é igual ou contém uma das escolhas.

Salve qualquer pesquisa de campo personalizado como uma [Lista](../people/lists.md). As listas são consultas em tempo real, então uma lista construída em *Verificação de antecedentes expira antes de hoje* re-verifica cada pessoa toda vez que você a abre — sem manutenção manual.

## O que Acontece na Fusão

Quando você [funde dois registros de pessoa](../people/adding-people.md), valores de campo personalizado são transferidos automaticamente. A pessoa que você mantém retém seus próprios valores; para qualquer campo onde apenas a pessoa removida tivesse um valor, esse valor é copiado para que nada se perca.

## Artigos Relacionados

- [Pesquisando Pessoas](../people/searching-people.md) — pesquisa avançada, incluindo a categoria Campos Personalizados
- [Listas Salvas](../people/lists.md) — salve uma pesquisa de campo personalizado e re-execute-a em tempo real
- [Funções e Permissões](./roles-permissions.md) — quem pode definir campos e editar valores
- [Criando Formulários](../forms/creating-forms.md) — para coleta de dados multi-pergunta onde um formulário completo se adapta melhor que campos únicos
