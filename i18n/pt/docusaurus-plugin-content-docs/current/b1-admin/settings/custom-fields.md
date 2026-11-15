---
title: "Campos personalizados"
description: "Defina campos personalizados no B1 Admin para registrar detalhes extras das pessoas, como datas de validade de verificação de antecedentes ou tamanhos de camiseta, e depois pesquise e filtre por eles."
---

# Campos personalizados

<div class="article-intro">

Os **Campos personalizados** permitem registrar suas próprias informações em todo cadastro de pessoa — coisas para as quais o B1 não tem um campo integrado, como a data de validade de uma verificação de antecedentes, o tamanho da camiseta ou a situação em uma turma de batismo. Você define um campo uma vez nas Configurações, preenche um valor no perfil de cada pessoa e pesquisa ou monta listas com base nele. Isso substitui o antigo recurso alternativo de criar um formulário de Pessoas apenas para guardar um dado personalizado.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="yUfDEbp2HQ4" title="Campos personalizados, edição em massa e exportação no B1" next="Criando grupos e adicionando membros no B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar configurações da igreja** para abrir a página de Configurações (e para salvar a lista de Títulos), além da permissão de edição de **Pessoas** para definir campos e preencher valores. Quem tem permissão de visualização de Pessoas pode ver os valores. Veja [Funções e permissões](./roles-permissions.md).
- Decida o que você quer registrar e qual tipo se encaixa melhor (texto, número, data, sim/não ou lista de opções) antes de começar.

</div>

## Abrindo os campos personalizados {#opening-custom-fields}

No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), escolha **Configurações > Configurações** e clique em **Campos personalizados** na lista à esquerda para rolar até a seção **Campos personalizados**. Você também pode ir diretamente para **/settings/custom-fields**. Você verá uma lista de todos os campos definidos, com o **Nome** e o **Tipo de campo** de cada um. Se ainda não tiver criado nenhum, o painel exibe *"Nenhum campo personalizado foi adicionado ainda."*

## Títulos {#titles}

O cartão **Títulos** no topo da seção Campos personalizados lista os títulos oferecidos na caixa **Título** quando alguém adiciona ou edita uma pessoa, no B1 Admin e no aplicativo B1 (o editor de perfil e o formulário de cadastro de visitantes). A lista começa com Mr, Mrs, Miss, Ms, Dr, Prof, Rev e Pastor.

1. Digite um título em **Novo título** (até 10 caracteres), como *Diácono* ou *Presbítero*, e clique em **Adicionar título**.
2. Para retirar um título da lista, clique no **×** no seu selo.
3. Clique em **Salvar**. Uma mensagem *Títulos salvos.* confirma a alteração. Adicionar um título que já está na lista mostra *Esse título já está na lista.*

:::tip
A caixa Título ainda aceita digitação livre, então a equipe e os membros podem informar um título que não esteja na lista. Remover um título da lista não altera as pessoas que já o possuem.
:::

## Adicionando um campo {#adding-a-field}

1. Clique em **Adicionar campo**.
2. No editor que se abre à direita, digite um **Nome** — este é o rótulo que a equipe verá nos perfis de pessoas e na busca (por exemplo, *Verificação de antecedentes vence em*).
3. Escolha um **Tipo de campo**:
   - **Caixa de texto** — texto curto de formato livre.
   - **Número inteiro** — números sem casas decimais (por exemplo, uma contagem).
   - **Decimal** — números que podem ter casas decimais.
   - **Data** — uma data do calendário.
   - **Sim/Não** — uma resposta simples de sim ou não.
   - **Múltipla escolha** — uma lista de opções. Ao escolher este tipo, aparece um **editor de opções** para que você adicione cada alternativa que as pessoas podem selecionar.
4. Clique em **Salvar**.

O campo passa a estar disponível no perfil de todas as pessoas.

:::info
Os tipos de campo são o mesmo conjunto usado nas [perguntas de formulários](../forms/creating-forms.md), então os valores se comportam de forma consistente no B1.
:::

## Editando um campo {#editing-a-field}

Clique em qualquer linha de campo na lista para reabri-lo no editor. Altere o nome, o tipo ou as opções e clique em **Salvar**.

:::warning
Alterar o **Tipo de campo** de um campo que já tem valores (por exemplo, de Caixa de texto para Data) pode deixar valores já informados em um formato que não corresponde mais ao novo tipo. Altere os tipos com cuidado depois que a equipe já tiver começado a preencher o campo.
:::

## Excluindo um campo {#deleting-a-field}

Abra um campo para edição e clique em **Excluir**. Você será solicitado a confirmar: *"Tem certeza de que deseja excluir este campo personalizado? Os valores armazenados também serão removidos."* Excluir um campo remove permanentemente o campo **e todos os valores armazenados para ele** de todas as pessoas — isso não pode ser desfeito.

## Preenchendo valores em uma pessoa {#filling-in-values-on-a-person}

Quando existe pelo menos um campo personalizado, os valores ficam ao lado dos dados integrados no cadastro de cada pessoa — você os vê junto com os dados de contato da pessoa, à esquerda do perfil, e os edita no mesmo formulário usado para o restante das informações dela. Nada extra aparece até que você defina o seu primeiro campo.

1. Abra o cadastro de uma pessoa em **Pessoas**.
2. Clique no botão **Editar** à esquerda do perfil, abaixo dos dados de contato da pessoa.
3. Role até a área **Campos personalizados** na parte inferior do formulário de edição e preencha um valor para cada campo. Cada campo mostra o controle que corresponde ao seu tipo — um seletor de data para campos de Data, uma lista sim/não para campos Sim/Não, uma lista de opções para Múltipla escolha, e assim por diante.
4. Clique em **Salvar**. Os valores dos seus campos personalizados são salvos junto com os demais dados da pessoa.

De volta ao perfil, qualquer campo que tenha valor agora aparece abaixo dos dados de contato da pessoa no formato *Nome do campo: valor* (respostas Sim/Não aparecem como *Sim* ou *Não*, e Múltipla escolha mostra o rótulo da opção). Campos deixados em branco ficam simplesmente ocultos. Para remover um valor, edite a pessoa, limpe o campo e salve — um valor vazio é excluído do cadastro, em vez de ser armazenado como em branco.

:::tip
O caso de uso clássico é a segurança de voluntários: crie um campo **Data** chamado *Verificação de antecedentes vence em*, registre a data de cada voluntário e depois crie uma [Lista salva](../people/lists.md) que sinalize quem já teve a data ultrapassada.
:::

## Pesquisando e criando listas com campos personalizados {#searching-and-building-lists-on-custom-fields}

Os campos personalizados são totalmente pesquisáveis:

1. Na página **Pessoas**, abra a [Busca avançada](../people/searching-people.md).
2. Expanda a categoria **Campos personalizados**.
3. Marque o campo que deseja filtrar, escolha um operador e digite um valor. Os operadores oferecidos correspondem ao tipo do campo:
   - **Caixa de texto** — contém, é igual a, começa com, termina com.
   - **Número inteiro / Decimal** — é igual a, maior que, maior ou igual a, menor que, menor ou igual a.
   - **Data** — é igual a, depois de (maior que), antes de (menor que).
   - **Sim/Não** — é igual a Sim ou Não.
   - **Múltipla escolha** — é igual a ou contém uma das opções.

Salve qualquer pesquisa por campo personalizado como uma [Lista](../people/lists.md). As listas são consultas dinâmicas, então uma lista criada com *Verificação de antecedentes vence em é anterior a hoje* verifica novamente todas as pessoas sempre que você a abre — sem nenhuma manutenção manual.

## Exibindo um campo personalizado como coluna {#showing-a-custom-field-as-a-column}

Para ver os valores de um campo para todos de uma vez, adicione-o como coluna na página **Pessoas**. Altere **Visualizar como** para **Tabela**, clique no ícone **Selecionar colunas** no cabeçalho da página, mude para a aba **Personalizados** e marque o campo. O valor de cada pessoa aparece em sua própria coluna, ao lado das colunas integradas. Veja [Exibindo campos personalizados como colunas](../people/searching-people.md#showing-custom-fields-as-columns).

## O que acontece na mesclagem {#what-happens-on-merge}

Ao [mesclar dois cadastros de pessoas](../people/adding-people.md), os valores dos campos personalizados são transferidos automaticamente. A pessoa que você mantém conserva os próprios valores; para qualquer campo em que apenas a pessoa removida tinha um valor, esse valor é copiado, para que nada se perca.

## Artigos relacionados {#related-articles}

- [Pesquisando pessoas](../people/searching-people.md) — busca avançada, incluindo a categoria Campos personalizados, e exibição de campos personalizados como colunas
- [Listas salvas](../people/lists.md) — salve uma pesquisa por campo personalizado e execute-a novamente em tempo real
- [Funções e permissões](./roles-permissions.md) — quem pode definir campos e editar valores
- [Criando formulários](../forms/creating-forms.md) — para coleta de dados com várias perguntas, quando um formulário completo se encaixa melhor do que campos isolados
