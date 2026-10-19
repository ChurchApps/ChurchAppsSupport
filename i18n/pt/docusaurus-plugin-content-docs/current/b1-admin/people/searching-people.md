---
title: "Pesquisando Pessoas"
---

# Pesquisando Pessoas

<div class="article-intro">

A página **People** exibe o diretório da sua igreja como uma lista pesquisável de domicílios, ou como uma tabela ordenável de pessoas individuais. Você pode encontrar rapidamente qualquer pessoa da sua congregação, personalizar quais informações são mostradas e exportar seus resultados. Pesquisar com eficiência é essencial para as tarefas diárias de administração da igreja, como acompanhar visitantes, preparar listas de contato e gerenciar registros de membros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para visualizar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- O diretório da sua igreja deve ter pessoas cadastradas. Se você ainda não adicionou ninguém, consulte [Adicionando Pessoas](adding-people.md) ou [Importando Dados](importing-data.md).

</div>

## Domicílios e Visualizações em Tabela

A página People lista seu diretório por **domicílio**, agrupado em ordem alfabética. Cada linha mostra as fotos do domicílio, o nome dele (por exemplo, "The Smith Family") e os nomes de todas as pessoas que o compõem. Clique em um domicílio para abrir o perfil do chefe de família, ou clique no nome de qualquer membro para abrir essa pessoa. Um contador acima da lista mostra quantos domicílios e pessoas estão sendo exibidos.

Use o seletor **View as** acima da lista para alternar entre **Households** e **Table**. A visualização **Table** lista uma pessoa por linha e é onde você pode ordenar e escolher colunas (veja abaixo). O B1 lembra sua escolha neste dispositivo.

Por padrão, a página carrega a primeira parte do seu diretório. Se você tiver mais pessoas, clique em **Show All Members** abaixo da lista para carregar todas.

## Busca Rápida

A caixa **Find a household or person** no topo da página People permite encontrar membros em tempo real:

1. Clique na **caixa de busca** no topo da página People.
2. Comece a digitar um nome.
3. Os resultados são filtrados automaticamente conforme você digita (há um pequeno atraso de cerca de meio segundo para que a busca não seja executada a cada tecla).
4. A lista abaixo é atualizada para mostrar apenas os resultados correspondentes.

Clique em **Clear** (abaixo da caixa de busca) para redefinir a pesquisa e mostrar novamente todo o seu diretório.

:::tip
Você não precisa pressionar Enter. A busca é executada automaticamente depois que você para de digitar.
:::

## Ordenando os Resultados

Na visualização **Table**, as pessoas são listadas por sobrenome e depois por nome. Você pode ordenar o diretório de outra forma clicando em qualquer cabeçalho de coluna:

1. Clique em um **cabeçalho de coluna** (por exemplo, **Name** ou **Email**) para ordenar por essa coluna.
2. Clique no mesmo cabeçalho novamente para inverter a ordem.

Isso facilita encontrar pessoas em ordem alfabética, por idade ou por qualquer outra coluna visível.

## Personalizando as Colunas

Nem toda informação precisa estar visível ao mesmo tempo. Você pode escolher quais colunas aparecem na tabela:

1. Clique no ícone **Select columns** no cabeçalho da página People. (As colunas se aplicam à visualização **Table**.)
2. Marque ou desmarque colunas para mostrá-las ou ocultá-las. As colunas disponíveis incluem:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
   - **Campus**
3. A tabela é atualizada imediatamente para refletir suas seleções.

### Mostrando Campos Personalizados como Colunas {#showing-custom-fields-as-columns}

O seletor de colunas tem duas abas: **Standard** contém as colunas integradas listadas acima, e **Custom** contém os seus [Campos Personalizados](../settings/custom-fields.md) da igreja, junto com as perguntas de quaisquer formulários de Pessoas. Marque um campo personalizado na aba **Custom** para adicioná-lo como coluna, e o valor de cada pessoa para esse campo aparece na tabela. Os valores são exibidos da mesma forma que no perfil da pessoa — campos Sim/Não mostram *Yes* ou *No*, campos de Múltipla Escolha mostram o rótulo da opção, e datas são exibidas em formato curto. Pessoas sem valor para o campo mostram uma célula em branco.


## Exportando os Resultados da Busca

Você pode baixar seus resultados de busca atuais como arquivo CSV a qualquer momento:

1. Aplique as pesquisas ou filtros que desejar.
2. Clique no botão **Export** no cabeçalho da página People.
3. Um arquivo CSV será baixado para o seu computador, pronto para abrir no Excel, Google Sheets ou em qualquer aplicativo de planilhas.

Para mais detalhes sobre exportação, consulte [Exportando Dados](./exporting-data.md).

:::tip
Para consultas mais avançadas — como encontrar todas as pessoas que não compareceram nos últimos três meses — experimente o recurso [AI Search](./ai-search.md), que permite pesquisar usando perguntas em linguagem simples.
:::

## Pesquisa Avançada {#advanced-search}

A Pesquisa Avançada permite criar filtros precisos combinando condições. Abra-a clicando em **Advanced** abaixo da caixa de busca na página People, depois expanda uma categoria e marque os campos pelos quais deseja filtrar, escolhendo um operador e um valor para cada um. As categorias incluem **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (doações e presença) e **Custom Fields**.

A categoria **Custom Fields** lista os seus [Campos Personalizados](../settings/custom-fields.md) da igreja — os campos que você define em Configurações para acompanhar informações próprias (como a data de vencimento de uma verificação de antecedentes). Os operadores oferecidos correspondem ao tipo de cada campo: campos de texto aceitam *contains / equals / starts with / ends with*, campos numéricos aceitam os operadores de comparação, campos de data aceitam *equals / after / before*, e campos Sim/Não e de Múltipla Escolha permitem escolher um valor. Qualquer campo pelo qual você pode filtrar aqui pode ser salvo como uma [Lista](./lists.md) dinâmica.

## Salvando Pesquisas como Listas

Depois de executar uma pesquisa, um botão **Save as List** aparece no cabeçalho da página People. Clique nele para armazenar sua consulta atual com um nome e uma categoria opcional, para que você possa recarregá-la rapidamente em sessões futuras. Consulte [Listas Salvas](./lists.md) para todos os detalhes.
