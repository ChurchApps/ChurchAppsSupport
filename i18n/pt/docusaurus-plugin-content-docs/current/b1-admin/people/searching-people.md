---
title: "Pesquisando Pessoas"
---

# Pesquisando Pessoas

<div class="article-intro">

A página **Pessoas** exibe o diretório da sua igreja como uma lista pesquisável de famílias, ou como uma tabela ordenável de pessoas individuais. Você pode encontrar rapidamente qualquer pessoa da congregação, personalizar quais informações são exibidas e exportar os resultados. Pesquisar com eficiência é essencial para as tarefas administrativas do dia a dia, como acompanhar visitantes, preparar listas de contatos e gerenciar os registros de membros.

</div>

## Vídeo de Treinamento

<YouTube id="7Y-tN9RmnDQ" title="Searching People and Building Lists in B1" next="Custom Fields, Bulk Editing, and Exporting in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para visualizar pessoas. Consulte [Funções e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- O diretório da sua igreja deve ter pessoas cadastradas. Se você ainda não adicionou ninguém, consulte [Adicionando Pessoas](adding-people.md) ou [Importando Dados](importing-data.md).

</div>

## Famílias e Visualizações em Tabela

A página Pessoas lista o seu diretório por **família**, agrupado em ordem alfabética. Cada linha mostra as fotos da família, o nome dela (por exemplo, "Família Silva") e os nomes de todos os membros. Clique em uma família para abrir o perfil do chefe da família, ou clique no nome de qualquer membro para abrir essa pessoa. Uma contagem acima da lista mostra quantas famílias e pessoas estão sendo exibidas.

Use o seletor **Exibir como** acima da lista para alternar entre **Famílias** e **Tabela**. A visualização **Tabela** lista uma pessoa por linha e é onde você pode ordenar e escolher as colunas (veja abaixo). O B1 lembra a sua escolha neste dispositivo.

Por padrão, a página carrega a primeira parte do seu diretório. Se você tiver mais pessoas, clique em **Mostrar todos os membros** abaixo da lista para carregar todas.

## Busca Rápida

A caixa **Buscar uma família ou pessoa**, no topo da página Pessoas, permite encontrar membros em tempo real:

1. Clique na **caixa de busca** no topo da página Pessoas.
2. Comece a digitar um nome.
3. Os resultados são filtrados automaticamente conforme você digita (há um pequeno atraso de cerca de meio segundo para que a busca não seja disparada a cada tecla).
4. A lista abaixo é atualizada e mostra somente os resultados correspondentes.

Clique em **Limpar** (abaixo da caixa de busca) para redefinir a pesquisa e voltar a mostrar todo o seu diretório.

:::tip
Você não precisa pressionar Enter. A busca é executada automaticamente depois que você para de digitar.
:::

## Ordenando os Resultados

Na visualização **Tabela**, as pessoas são listadas por sobrenome e, em seguida, por nome. Você pode ordenar o diretório de outra forma clicando em qualquer cabeçalho de coluna:

1. Clique em um **cabeçalho de coluna** (por exemplo, **Nome** ou **E-mail**) para ordenar por essa coluna.
2. Clique no mesmo cabeçalho novamente para inverter a ordem.

Assim, fica fácil encontrar pessoas por ordem alfabética, por idade ou por qualquer outra coluna visível.

## Personalizando as Colunas

Nem toda informação precisa estar visível ao mesmo tempo. Você pode escolher quais colunas aparecem na tabela:

1. Clique no ícone **Selecionar colunas** no cabeçalho da página Pessoas. (As colunas se aplicam à visualização **Tabela**.)
2. Marque ou desmarque colunas para exibi-las ou ocultá-las. As colunas disponíveis incluem:
   - **Foto**
   - **Nome**
   - **E-mail**
   - **Telefone**
   - **Endereço**
   - **Data de nascimento**
   - **Idade**
   - **Gênero**
   - **Status de membro**
   - **Campus**
   - **Data de cadastro** -- quando o registro da pessoa foi criado
3. A tabela é atualizada imediatamente com as suas seleções. Clique em **Concluído** para fechar a caixa de diálogo **Selecionar colunas**.

### Exibindo Campos Personalizados como Colunas

O seletor de colunas tem duas abas: **Padrão** reúne as colunas nativas listadas acima, e **Personalizadas** reúne os seus [Campos Personalizados](../settings/custom-fields.md) da igreja, junto com as perguntas de quaisquer formulários de Pessoas. Marque um campo personalizado na aba **Personalizadas** para adicioná-lo como coluna, e o valor de cada pessoa para esse campo aparece na tabela. Os valores são exibidos da mesma forma que no perfil da pessoa -- campos Sim/Não mostram *Sim* ou *Não*, campos de Múltipla Escolha mostram o rótulo da opção, e datas são exibidas em formato curto. Pessoas sem valor para o campo mostram uma célula em branco.

## Exportando os Resultados da Pesquisa

Você pode baixar os resultados da pesquisa atual como arquivo CSV a qualquer momento:

1. Aplique qualquer pesquisa ou filtro que desejar.
2. Clique no botão **Exportar** no cabeçalho da página Pessoas.
3. Um arquivo CSV será baixado para o seu computador, pronto para ser aberto no Excel, no Google Planilhas ou em qualquer aplicativo de planilhas.

Para mais detalhes sobre exportação, consulte [Exportando Dados](./exporting-data.md).

:::tip
Para consultas mais avançadas -- como encontrar todas as pessoas que não compareceram nos últimos três meses -- experimente o recurso [Pesquisa com IA](./ai-search.md), que permite pesquisar usando perguntas em linguagem simples.
:::

## Pesquisa Avançada

A Pesquisa Avançada permite criar filtros precisos combinando condições. Abra-a clicando em **Avançada** abaixo da caixa de busca na página Pessoas, depois expanda uma categoria e marque os campos pelos quais deseja filtrar (você pode clicar no nome do campo ou na sua caixa de seleção), escolhendo um operador e um valor para cada um. As categorias incluem **Nomes**, **Dados demográficos**, **Contato**, **Participação**, **Atividade** (doações e presença) e **Campos Personalizados**.

Para encontrar pessoas novas, abra **Participação** e marque **Data de cadastro**. Ela começa em **nos últimos N dias**, com 30 preenchido, para que você encontre todos que foram adicionados no último mês com um único clique; altere o número de dias ou mude para *igual a / depois de / antes de* para escolher uma data. **Data de nascimento** e **Aniversário de casamento** também oferecem **nos últimos N dias**. A Data de cadastro só é registrada para pessoas criadas desde o final de outubro de 2026; pessoas adicionadas antes não têm data, então esse filtro não as encontra.

A categoria **Campos Personalizados** lista os [Campos Personalizados](../settings/custom-fields.md) da sua igreja -- os campos que você define em Configurações para acompanhar informações próprias (como a data de vencimento de uma verificação de antecedentes). Os operadores oferecidos correspondem ao tipo de cada campo: campos de texto aceitam *contém / é igual a / começa com / termina com*, campos numéricos aceitam os operadores de comparação, campos de data aceitam *é igual a / depois de / antes de*, e campos Sim/Não e Múltipla Escolha permitem escolher um valor. Qualquer campo que você possa filtrar aqui pode ser salvo como uma [Lista](./lists.md) dinâmica.

## Salvando Pesquisas como Listas

Depois de executar uma pesquisa, o botão **Salvar como lista** aparece no cabeçalho da página Pessoas. Clique nele para guardar sua consulta atual com um nome e uma categoria opcional, para que você possa recarregá-la rapidamente em sessões futuras. Consulte [Listas Salvas](./lists.md) para todos os detalhes.
