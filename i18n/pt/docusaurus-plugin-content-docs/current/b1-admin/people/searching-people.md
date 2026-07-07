---
title: "Pesquisando Pessoas"
---

# Pesquisando Pessoas

<div class="article-intro">

A página **Pessoas** exibe seu diretório de igreja em uma tabela pesquisável e classificável. Você pode encontrar rapidamente qualquer pessoa em sua congregação, personalizar quais informações são mostradas e exportar seus resultados. A busca eficiente é essencial para tarefas diárias de administração de igreja, como acompanhar visitantes, preparar listas de contatos e gerenciar registros de membros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa do B1 Admin com permissão para visualizar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Seu diretório de igreja deve ter pessoas nele. Se você ainda não adicionou ninguém, consulte [Adicionando Pessoas](adding-people.md) ou [Importando Dados](importing-data.md).

</div>

## Pesquisa Rápida

A barra de pesquisa no topo da página Pessoas permite que você encontre membros em tempo real:

1. Clique na **caixa de pesquisa** no topo da página Pessoas.
2. Comece a digitar um nome, email ou outra palavra-chave.
3. Os resultados serão filtrados automaticamente enquanto você digita (há um atraso breve de cerca de meio segundo para que a pesquisa não dispare em cada tecla pressionada).
4. A tabela abaixo é atualizada para mostrar apenas os resultados correspondentes.

:::tip
Você não precisa pressionar Enter. A pesquisa é executada automaticamente depois que você para de digitar.
:::

## Classificando Resultados

Você pode classificar o diretório clicando em qualquer cabeçalho de coluna na tabela:

1. Clique em um **cabeçalho de coluna** (por exemplo, **Nome** ou **Email**) para classificar por essa coluna.
2. Clique no mesmo cabeçalho novamente para inverter a ordem de classificação.

Isso facilita encontrar pessoas alfabeticamente, por idade ou por qualquer outra coluna visível.

## Personalizando Colunas

Nem toda informação precisa ser visível de uma vez. Você pode escolher quais colunas aparecem na tabela:

1. Procure pelo **menu suspenso do seletor de coluna** perto do topo da tabela.
2. Marque ou desmarque colunas para mostrá-las ou ocultá-las. As colunas disponíveis incluem:
   - **Foto**
   - **Nome**
   - **Email**
   - **Telefone**
   - **Endereço**
   - **Data de Nascimento**
   - **Idade**
   - **Gênero**
   - **Status de Membro**
   - **Campus**
3. A tabela é atualizada imediatamente para refletir suas seleções.

:::info
Suas escolhas de colunas afetam o que está incluído quando você exporta para CSV. Personalize colunas antes de exportar para obter exatamente os dados que você precisa.
:::

## Paginação

Quando seu diretório tem muitos registros, os resultados são divididos entre páginas. Use os **controles de paginação** na parte inferior da tabela para se mover entre páginas. A página atual e a contagem total de registros são exibidas para que você sempre saiba onde está na lista.

:::tip
Se você quiser ver mais resultados de uma vez, refine sua pesquisa para restringir a lista em vez de paginar por um diretório grande.
:::

## Exportando Resultados da Pesquisa

Você pode baixar seus resultados de pesquisa atuais como um arquivo CSV a qualquer momento:

1. Aplique qualquer pesquisa ou filtro que você queira.
2. Personalize suas colunas para incluir os dados que você precisa.
3. Clique no botão **Exportar**.
4. Um arquivo CSV será baixado para seu computador, pronto para abrir em Excel, Google Sheets ou qualquer aplicativo de planilha.

Para mais detalhes sobre exportação, consulte [Exportando Dados](./exporting-data.md).

:::tip
Para consultas mais avançadas -- como encontrar todos que não compareceram nos últimos três meses -- tente o recurso [Pesquisa IA](./ai-search.md), que permite pesquisar usando perguntas em linguagem natural.
:::

## Pesquisa Avançada

A Pesquisa Avançada permite que você crie filtros precisos combinando condições. Abra-a na página Pessoas, depois expanda uma categoria e marque os campos em que você deseja filtrar, escolhendo um operador e um valor para cada. As categorias incluem **Nomes**, **Dados Demográficos**, **Contato**, **Membro**, **Atividade** (doações e presença) e **Campos Personalizados**.

A categoria **Campos Personalizados** lista os [Campos Personalizados](../settings/custom-fields.md) da sua igreja — os campos que você define em Configurações para rastrear suas próprias informações (como uma data de expiração de verificação de antecedentes). Os operadores oferecidos correspondem ao tipo de cada campo: campos de texto suportam *contém / igual / começa com / termina com*, campos de número suportam os operadores de comparação, campos de data suportam *igual / depois / antes* e campos Sim/Não e Escolha Múltipla permitem que você escolha um valor. Qualquer campo em que você pode filtrar aqui pode ser salvo como uma [Lista](./lists.md) ao vivo.

## Salvando Pesquisas como Listas

Depois de executar uma pesquisa, um botão **Salvar como Lista** (ícone de marcador) aparece no cabeçalho da página Pessoas. Clique nele para armazenar sua consulta atual sob um nome e categoria opcional, para que você possa recarregá-lo instantaneamente em futuras sessões. Consulte [Listas Salvas](./lists.md) para detalhes completos.
