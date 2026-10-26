---
title: "Pesquisando pessoas"
---

# Pesquisando pessoas

<div class="article-intro">

A página **Pessoas** exibe o diretório da sua igreja como uma lista pesquisável de domicílios, ou como uma tabela ordenável de pessoas individuais. Você pode encontrar rapidamente qualquer pessoa da sua congregação, personalizar as informações exibidas e exportar os resultados. Pesquisar com eficiência é essencial para as tarefas diárias de administração da igreja, como acompanhar visitantes, preparar listas de contatos e gerenciar os registros de membros.

</div>

## Vídeo de treinamento

<YouTube id="7Y-tN9RmnDQ" title="Searching People and Building Lists in B1" next="Custom Fields, Bulk Editing, and Exporting in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para visualizar pessoas. Veja [Papéis e Permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- O diretório da sua igreja deve ter pessoas cadastradas. Se você ainda não adicionou ninguém, veja [Adicionando pessoas](adding-people.md) ou [Importando dados](importing-data.md).

</div>

## Domicílios e visualizações em tabela

A página Pessoas lista o seu diretório por **domicílio**, agrupado em ordem alfabética. Cada linha mostra as fotos do domicílio, o nome dele (por exemplo, "Família Silva") e os nomes de todas as pessoas que o compõem. Clique em um domicílio para abrir o perfil do responsável pelo domicílio, ou clique no nome de qualquer membro para abrir essa pessoa. Uma contagem acima da lista mostra quantos domicílios e pessoas estão sendo exibidos.

Use o alternador **Exibir como** acima da lista para alternar entre **Domicílios** e **Tabela**. A visualização **Tabela** lista uma pessoa por linha e é onde você pode ordenar e escolher as colunas (veja abaixo). O B1 lembra a sua escolha neste dispositivo.

Por padrão, a página carrega a primeira parte do seu diretório. Se você tiver mais pessoas, clique em **Mostrar todos os membros** abaixo da lista para carregar todas.

## Busca rápida

A caixa **Encontre um domicílio ou pessoa** no topo da página Pessoas permite localizar membros em tempo real:

1. Clique na **caixa de pesquisa** no topo da página Pessoas.
2. Comece a digitar um nome.
3. Os resultados são filtrados automaticamente conforme você digita (há um pequeno atraso de cerca de meio segundo para que a pesquisa não seja disparada a cada tecla).
4. A lista abaixo é atualizada para mostrar apenas os resultados correspondentes.

Clique em **Limpar** (abaixo da caixa de pesquisa) para redefinir a pesquisa e mostrar novamente todo o seu diretório.

:::tip
Você não precisa pressionar Enter. A pesquisa é executada automaticamente depois que você para de digitar.
:::

## Ordenando os resultados

Na visualização **Tabela**, as pessoas são listadas por sobrenome e depois por nome. Você pode ordenar o diretório de outra forma clicando em qualquer cabeçalho de coluna:

1. Clique em um **cabeçalho de coluna** (por exemplo, **Nome** ou **E-mail**) para ordenar por essa coluna.
2. Clique no mesmo cabeçalho novamente para inverter a ordem.

Isso facilita encontrar pessoas em ordem alfabética, por idade ou por qualquer outra coluna visível.

## Personalizando as colunas

Nem todas as informações precisam estar visíveis ao mesmo tempo. Você pode escolher quais colunas aparecem na tabela:

1. Clique no ícone **Selecionar colunas** no cabeçalho da página Pessoas. (As colunas se aplicam à visualização **Tabela**.)
2. Marque ou desmarque colunas para mostrá-las ou ocultá-las. As colunas disponíveis incluem:
   - **Foto**
   - **Nome**
   - **E-mail**
   - **Telefone**
   - **Endereço**
   - **Data de nascimento**
   - **Idade**
   - **Gênero**
   - **Situação de membro**
   - **Campus**
3. A tabela é atualizada imediatamente para refletir as suas seleções. Clique em **Concluído** para fechar a caixa de diálogo **Selecionar colunas**.

### Mostrando campos personalizados como colunas

O seletor de colunas tem duas abas: **Padrão** reúne as colunas nativas listadas acima, e **Personalizadas** reúne os [Campos personalizados](../settings/custom-fields.md) da sua igreja, junto com as perguntas de quaisquer formulários de Pessoas. Marque um campo personalizado na aba **Personalizadas** para adicioná-lo como coluna, e o valor de cada pessoa para esse campo aparece na tabela. Os valores são exibidos da mesma forma que no perfil da pessoa — campos Sim/Não mostram *Sim* ou *Não*, campos de Múltipla Escolha mostram o rótulo da opção, e datas são exibidas como datas curtas. Pessoas sem valor para o campo mostram uma célula em branco.


## Exportando os resultados da pesquisa

Você pode baixar os resultados da pesquisa atual como um arquivo CSV a qualquer momento:

1. Aplique as pesquisas ou filtros que desejar.
2. Clique no botão **Exportar** no cabeçalho da página Pessoas.
3. Um arquivo CSV será baixado para o seu computador, pronto para abrir no Excel, no Google Sheets ou em qualquer aplicativo de planilhas.

Para mais detalhes sobre exportação, veja [Exportando dados](./exporting-data.md).

:::tip
Para consultas mais avançadas — como encontrar todas as pessoas que não compareceram nos últimos três meses — experimente o recurso [Pesquisa com IA](./ai-search.md), que permite pesquisar usando perguntas em linguagem simples.
:::

## Pesquisa avançada

A Pesquisa avançada permite criar filtros precisos combinando condições. Abra-a clicando em **Avançada** abaixo da caixa de pesquisa na página Pessoas, depois expanda uma categoria e marque os campos pelos quais você quer filtrar (você pode clicar no nome do campo ou na sua caixa de seleção), escolhendo um operador e um valor para cada um. As categorias incluem **Nomes**, **Demografia**, **Contato**, **Participação**, **Atividade** (doações e presença) e **Campos personalizados**.

A categoria **Campos personalizados** lista os [Campos personalizados](../settings/custom-fields.md) da sua igreja — os campos que você define em Configurações para acompanhar as suas próprias informações (como a data de validade de uma verificação de antecedentes). Os operadores oferecidos correspondem ao tipo de cada campo: campos de texto aceitam *contém / é igual a / começa com / termina com*, campos numéricos aceitam os operadores de comparação, campos de data aceitam *é igual a / depois de / antes de*, e os campos Sim/Não e Múltipla Escolha permitem escolher um valor. Qualquer campo pelo qual você pode filtrar aqui pode ser salvo como uma [Lista](./lists.md) dinâmica.

## Salvando pesquisas como listas

Depois de executar uma pesquisa, um botão **Salvar como lista** aparece no cabeçalho da página Pessoas. Clique nele para guardar a sua consulta atual com um nome e uma categoria opcional, para que você possa recarregá-la rapidamente em sessões futuras. Veja [Listas salvas](./lists.md) para todos os detalhes.
