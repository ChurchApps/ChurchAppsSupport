---
title: "Campos personalizados"
description: "Defina campos personalizados no B1 Admin para registrar detalhes extras das pessoas, como validade de verificação de antecedentes ou tamanhos de camiseta, e depois pesquise e filtre por eles."
---

# Campos personalizados

<div class="article-intro">

Os **Campos personalizados** permitem acompanhar suas próprias informações em cada registro de pessoa — coisas para as quais o B1 não tem um campo integrado, como a data de validade da verificação de antecedentes, o tamanho da camiseta ou a situação na classe de batismo. Você define um campo uma única vez em Configurações e depois preenche um valor no perfil de cada pessoa, podendo pesquisar por ele ou criar listas com base nele. Isso substitui a solução antiga de criar um formulário de Pessoas só para guardar um dado personalizado.

</div>

## Vídeo de treinamento

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão de edição de **Pessoas** para definir campos e preencher valores, além de acesso à área **Configurações**. Quem tem permissão de visualização de Pessoas pode ver os valores. Veja [Funções e permissões](./roles-permissions.md).
- Decida o que você quer acompanhar e qual tipo se encaixa melhor (texto, número, data, sim/não ou lista de opções) antes de começar.

</div>

## Abrindo os campos personalizados

No B1 Admin, abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), escolha **Configurações > Configurações** e clique em **Campos personalizados** na lista à esquerda para rolar até a seção **Campos personalizados**. Você também pode ir direto a **/settings/custom-fields**. Você verá uma lista de todos os campos definidos, com o **Nome** e o **Tipo de campo** de cada um. Se você ainda não criou nenhum, o painel mostra *"Nenhum campo personalizado foi adicionado ainda."*

## Títulos

O cartão **Títulos**, no topo da seção Campos personalizados, lista os títulos oferecidos na caixa **Título** quando alguém adiciona ou edita uma pessoa, no B1 Admin e no aplicativo B1 (o editor de perfil e o formulário de cadastro de visitantes). A lista começa com Sr., Sra., Srta., Sr.ª, Dr., Prof., Rev. e Pastor.

1. Digite um título em **Novo título** (até 10 caracteres), como *Diácono* ou *Presbítero*, e clique em **Adicionar título**.
2. Para tirar um título da lista, clique no **×** do chip correspondente.
3. Clique em **Salvar**.

:::tip
A caixa Título continua aceitando digitação livre, então a equipe e os membros podem informar um título que não esteja na lista. Remover um título da lista não altera as pessoas que já o têm.
:::

## Adicionando um campo

1. Clique em **Adicionar campo**.
2. No editor que abrir à direita, digite um **Nome** — este é o rótulo que a equipe verá nos perfis de pessoas e na pesquisa (por exemplo, *Verificação de antecedentes vence em*).
3. Escolha um **Tipo de campo**:
   - **Caixa de texto** — texto livre e curto.
   - **Número inteiro** — números sem casas decimais (por exemplo, uma contagem).
   - **Decimal** — números que podem ter casas decimais.
   - **Data** — uma data do calendário.
   - **Sim/Não** — uma resposta simples de sim ou não.
   - **Múltipla escolha** — uma lista de opções. Ao escolher este tipo, aparece um **editor de opções** para que você adicione cada opção que as pessoas podem selecionar.
4. Clique em **Salvar**.

O campo fica disponível no perfil de todas as pessoas.

:::info
Os tipos de campo são o mesmo conjunto usado nas [perguntas de formulário](../forms/creating-forms.md), por isso os valores se comportam de forma consistente em todo o B1.
:::

## Editando um campo

Clique em qualquer linha de campo da lista para reabri-lo no editor. Altere o nome, o tipo ou as opções e clique em **Salvar**.

:::warning
Alterar o **Tipo de campo** de um campo que já tem valores (por exemplo, de Caixa de texto para Data) pode deixar os valores já informados em um formato que não corresponde ao novo tipo. Altere os tipos com cuidado depois que a equipe já tiver começado a preencher o campo.
:::

## Excluindo um campo

Abra o campo para edição e clique em **Excluir**. Será pedida uma confirmação: *"Tem certeza de que deseja excluir este campo personalizado? Os valores armazenados também serão removidos."* Excluir um campo remove permanentemente o campo **e todos os valores armazenados para ele** em todas as pessoas. Essa ação não pode ser desfeita.

## Preenchendo valores em uma pessoa

Depois que pelo menos um campo personalizado existir, os valores dele ficam junto aos dados integrados no registro de cada pessoa. Você os vê com os dados de contato da pessoa, à esquerda do perfil, e os edita no mesmo formulário usado para o restante das informações. Nada extra aparece até que você defina o primeiro campo.

1. Abra o registro de uma pessoa em **Pessoas**.
2. Clique no botão **Editar** à esquerda do perfil, abaixo dos dados de contato da pessoa.
3. Role até a área **Campos personalizados**, na parte inferior do formulário de edição, e preencha um valor para cada campo. Cada campo mostra o controle compatível com o seu tipo: um seletor de data para campos de Data, uma lista suspensa de sim/não para campos Sim/Não, uma lista de opções para Múltipla escolha, e assim por diante.
4. Clique em **Salvar**. Os valores dos campos personalizados são salvos junto com o restante dos dados da pessoa.

De volta ao perfil, qualquer campo que tenha valor aparece abaixo dos dados de contato da pessoa no formato *Nome do campo: valor* (respostas Sim/Não aparecem como *Sim* ou *Não*, e Múltipla escolha mostra o rótulo da opção). Campos em branco ficam ocultos. Para remover um valor, edite a pessoa, limpe o campo e salve. Um valor vazio é excluído do registro, em vez de ser armazenado como vazio.

:::tip
O caso de uso clássico é a segurança dos voluntários: crie um campo **Data** chamado *Verificação de antecedentes vence em*, registre a data de cada voluntário e, em seguida, crie uma [lista salva](../people/lists.md) que sinalize quem já teve a data vencida.
:::

## Pesquisando e criando listas com campos personalizados

Os campos personalizados são totalmente pesquisáveis:

1. Na página **Pessoas**, abra a [Pesquisa avançada](../people/searching-people.md).
2. Expanda a categoria **Campos personalizados**.
3. Marque o campo pelo qual deseja filtrar, escolha um operador e digite um valor. Os operadores oferecidos dependem do tipo do campo:
   - **Caixa de texto** — contém, é igual a, começa com, termina com.
   - **Número inteiro / Decimal** — é igual a, maior que, maior ou igual a, menor que, menor ou igual a.
   - **Data** — é igual a, depois de (maior que), antes de (menor que).
   - **Sim/Não** — é igual a Sim ou Não.
   - **Múltipla escolha** — é igual a, ou contém, uma das opções.

Salve qualquer pesquisa com campo personalizado como uma [lista](../people/lists.md). As listas são consultas dinâmicas: uma lista criada com *Verificação de antecedentes vence em é anterior a hoje* verifica de novo todas as pessoas sempre que você a abre, sem nenhuma manutenção manual.

## Exibindo um campo personalizado como coluna

Para ver os valores de um campo para todos de uma vez, adicione-o como coluna na página **Pessoas**. Mude **Exibir como** para **Tabela**, clique no ícone **Selecionar colunas** no cabeçalho da página, mude para a aba **Personalizado** e marque o campo. O valor de cada pessoa aparece em sua própria coluna, ao lado das colunas integradas. Veja [Exibindo campos personalizados como colunas](../people/searching-people.md#showing-custom-fields-as-columns).

## O que acontece na mesclagem

Ao [mesclar dois registros de pessoas](../people/adding-people.md), os valores dos campos personalizados são transferidos automaticamente. A pessoa que você mantém conserva os próprios valores. Para qualquer campo em que apenas a pessoa removida tinha um valor, esse valor é copiado, para que nada se perca.

## Artigos relacionados

- [Pesquisando pessoas](../people/searching-people.md) — pesquisa avançada, incluindo a categoria Campos personalizados, e exibição de campos personalizados como colunas
- [Listas salvas](../people/lists.md) — salve uma pesquisa com campo personalizado e execute-a novamente em tempo real
- [Funções e permissões](./roles-permissions.md) — quem pode definir campos e editar valores
- [Criando formulários](../forms/creating-forms.md) — para coleta de dados com várias perguntas, quando um formulário completo se encaixa melhor do que campos individuais
