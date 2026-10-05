---
title: "Pesquisando Pessoas"
---

# Pesquisando Pessoas

<div class="article-intro">

A página **Pessoas** exibe o diretório de sua igreja em uma tabela pesquisável e classificável. Você pode encontrar rapidamente qualquer pessoa em sua congregação, personalizar quais informações são exibidas e exportar seus resultados. A busca eficiente é essencial para tarefas diárias de administração de igrejas, como acompanhar visitantes, preparar listas de contatos e gerenciar registros de membros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para visualizar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Seu diretório de igreja deve ter pessoas nele. Se você ainda não adicionou ninguém, consulte [Adicionando Pessoas](adding-people.md) ou [Importando Dados](importing-data.md).

</div>

## Busca Rápida

A barra de pesquisa na parte superior da página Pessoas permite que você encontre membros em tempo real:

1. Clique na **caixa de pesquisa** na parte superior da página Pessoas.
2. Comece a digitar um nome, email ou outra palavra-chave.
3. Os resultados serão filtrados automaticamente conforme você digita (há um pequeno atraso de cerca de meio segundo para que a busca não funcione a cada toque de tecla).
4. A tabela abaixo é atualizada para mostrar apenas os resultados correspondentes.

:::tip
Você não precisa pressionar Enter. A busca é executada automaticamente após você parar de digitar.
:::

## Classificando Resultados

Você pode classificar o diretório clicando em qualquer cabeçalho de coluna na tabela:

1. Clique em um **cabeçalho de coluna** (por exemplo, **Nome** ou **Email**) para classificar por essa coluna.
2. Clique no mesmo cabeçalho novamente para inverter a ordem de classificação.

Isso facilita encontrar pessoas alfabeticamente, por idade ou por qualquer outra coluna visível.

## Personalizando Colunas

Nem todas as informações precisam estar visíveis de uma só vez. Você pode escolher quais colunas aparecem na tabela:

1. Procure o **dropdown seletor de colunas** perto da parte superior da tabela.
2. Marque ou desmarque as colunas para exibi-las ou ocultá-las. As colunas disponíveis incluem:
   - **Foto**
   - **Nome**
   - **Email**
   - **Telefone**
   - **Endereço**
   - **Data de Nascimento**
   - **Idade**
   - **Gênero**
   - **Status de Associação**
   - **Campus**
3. A tabela é atualizada imediatamente para refletir suas seleções.

### Mostrando Campos Personalizados como Colunas

O seletor de colunas tem duas abas: **Padrão** contém as colunas integradas listadas acima, e **Personalizado** contém os [Campos Personalizados](../settings/custom-fields.md) de sua igreja junto com as perguntas de qualquer formulário de Pessoas. Marque um campo personalizado na aba **Personalizado** para adicioná-lo como uma coluna, e o valor de cada pessoa para esse campo aparece na tabela. Os valores são exibidos da mesma maneira que no perfil da pessoa -- os campos Sim/Não mostram *Sim* ou *Não*, os campos de Múltipla Escolha mostram o rótulo da opção, e as datas são exibidas como datas curtas. Pessoas sem valor para o campo mostram uma célula em branco.

:::info
Suas escolhas de coluna afetam o que é incluído quando você exporta para CSV. Personalize as colunas antes de exportar para obter exatamente os dados que você precisa.
:::

## Paginação

Quando seu diretório tem muitos registros, os resultados são divididos entre páginas. Use os **controles de paginação** na parte inferior da tabela para se mover entre páginas. A página atual e a contagem total de registros são exibidas para que você sempre saiba onde está na lista.

:::tip
Se você quiser ver mais resultados de uma só vez, refine sua busca para reduzir a lista em vez de navegar por um diretório grande.
:::

## Exportando Resultados de Busca

Você pode baixar seus resultados de busca atuais como um arquivo CSV a qualquer momento:

1. Aplique qualquer busca ou filtro que desejar.
2. Personalize suas colunas para incluir os dados que você precisa.
3. Clique no botão **Exportar**.
4. Um arquivo CSV será baixado para seu computador, pronto para abrir no Excel, Google Sheets ou qualquer aplicativo de planilha.

Para mais detalhes sobre exportação, consulte [Exportando Dados](./exporting-data.md).

:::tip
Para consultas mais avançadas -- como encontrar todos que não compareceram nos últimos três meses -- tente o recurso [Busca de IA](./ai-search.md), que permite buscar usando perguntas em linguagem natural.
:::

## Busca Avançada

A Busca Avançada permite que você construa filtros precisos combinando condições. Abra-a a partir da página Pessoas, em seguida expanda uma categoria e marque os campos nos quais você deseja filtrar, escolhendo um operador e um valor para cada um. As categorias incluem **Nomes**, **Demografia**, **Contato**, **Associação**, **Atividade** (doações e presença) e **Campos Personalizados**.

A categoria **Campos Personalizados** lista os [Campos Personalizados](../settings/custom-fields.md) de sua igreja -- os campos que você define em Configurações para rastrear suas próprias informações (como uma data de expiração de verificação de antecedentes). Os operadores oferecidos correspondem ao tipo de cada campo: campos de texto suportam *contém / é igual a / começa com / termina com*, campos numéricos suportam os operadores de comparação, campos de data suportam *é igual a / depois / antes*, e campos de Sim/Não e Múltipla Escolha permitem que você escolha um valor. Qualquer campo no qual você possa filtrar aqui pode ser salvo como uma [Lista](./lists.md) em tempo real.

## Salvando Buscas como Listas

Após executar uma busca, um botão **Salvar como Lista** (ícone de marcador) aparece no cabeçalho da página Pessoas. Clique nele para armazenar sua consulta atual sob um nome e categoria opcional, para que você possa recarregá-la instantaneamente em sessões futuras. Consulte [Listas Salvas](./lists.md) para detalhes completos.
