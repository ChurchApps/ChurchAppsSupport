---
title: "Pesquisando pessoas"
description: "Pesquise o diretório de Pessoas do B1 Admin por nome, ordene e escolha colunas na tabela, monte filtros com Busca Avançada e exporte resultados para CSV."
---

# Pesquisando pessoas

<div class="article-intro">

A página **Pessoas** exibe o diretório da sua igreja como uma lista pesquisável de domicílios ou como uma tabela ordenável de pessoas individuais. Você pode encontrar rapidamente qualquer pessoa da congregação, personalizar as informações exibidas e exportar os resultados. Pesquisar com eficiência é essencial para as tarefas diárias de administração da igreja, como acompanhar visitantes, preparar listas de contatos e gerenciar os registros dos membros.

</div>

## Vídeo de treinamento

<YouTube id="7Y-tN9RmnDQ" title="Pesquisando pessoas e criando listas no B1" next="Campos personalizados, edição em massa e exportação no B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para ver pessoas. Veja [Funções e permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- O diretório da sua igreja deve ter pessoas cadastradas. Se você ainda não adicionou ninguém, veja [Adicionando pessoas](adding-people.md) ou [Importando dados](importing-data.md).

</div>

## Domicílios e visualizações em tabela

A página Pessoas lista o diretório por **domicílio**, agrupado em ordem alfabética. Cada linha mostra as fotos do domicílio, o nome dele (por exemplo, "Família Silva") e os nomes de todos os membros. Clique em um domicílio para abrir o perfil do responsável, ou clique no nome de qualquer membro para abrir essa pessoa. Uma contagem acima da lista mostra quantos domicílios e pessoas estão sendo exibidos.

Use o seletor **Ver como** acima da lista para alternar entre **Domicílios** e **Tabela**. A visualização **Tabela** lista uma pessoa por linha e é onde você pode ordenar e escolher colunas (veja abaixo). O B1 lembra a sua escolha naquele dispositivo.

Na visualização **Tabela**, a situação de membro de cada pessoa aparece abaixo do nome, e cada uma das sete situações tem sua própria cor, a mesma usada no perfil da pessoa. Quem tem a função no domicílio definida como **Filho** também exibe a etiqueta **Filho** ao lado da situação. Para marcar alguém como criança, defina a função dela no [painel do domicílio](./adding-people.md#managing-households) no perfil.

Por padrão, a página carrega a primeira parte do seu diretório. Se você tiver mais pessoas, clique em **Mostrar todos os membros** abaixo da lista para carregar todas.

## Busca rápida

A caixa **Encontre um domicílio ou uma pessoa**, no topo da página Pessoas, permite encontrar membros em tempo real:

1. Clique na **caixa de busca** no topo da página Pessoas.
2. Comece a digitar um nome.
3. Os resultados são filtrados automaticamente conforme você digita (há um pequeno atraso de cerca de meio segundo para que a busca não seja disparada a cada tecla).
4. A lista abaixo é atualizada para mostrar somente os resultados correspondentes.

Clique em **Limpar** (abaixo da caixa de busca) para redefinir a busca e mostrar todo o diretório novamente.

:::tip
Você não precisa pressionar Enter. A busca é executada automaticamente depois que você para de digitar.
:::

## Ordenando os resultados

Na visualização **Tabela**, as pessoas são listadas por sobrenome e depois por nome. Você pode ordenar o diretório de outra forma clicando em qualquer cabeçalho de coluna:

1. Clique em um **cabeçalho de coluna** (por exemplo, **Nome** ou **E-mail**) para ordenar por essa coluna.
2. Clique no mesmo cabeçalho novamente para inverter a ordem.

Isso facilita encontrar pessoas em ordem alfabética, por idade ou por qualquer outra coluna visível.

## Personalizando as colunas

Nem toda informação precisa estar visível ao mesmo tempo. Você pode escolher quais colunas aparecem na tabela:

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
   - **Data de cadastro** -- quando o registro da pessoa foi criado
3. A tabela é atualizada imediatamente para refletir as suas escolhas. Clique em **Concluído** para fechar a janela **Selecionar colunas**.

### Mostrando campos personalizados como colunas {#showing-custom-fields-as-columns}

O seletor de colunas tem duas abas: **Padrão** contém as colunas internas listadas acima, e **Personalizadas** contém os seus [Campos personalizados](../settings/custom-fields.md) da igreja, junto com as perguntas de quaisquer formulários de Pessoas. Marque um campo personalizado na aba **Personalizadas** para adicioná-lo como coluna, e o valor de cada pessoa para esse campo aparece na tabela. Os valores são mostrados da mesma forma que no perfil da pessoa: campos Sim/Não exibem *Sim* ou *Não*, campos de Múltipla escolha mostram o rótulo da opção, e as datas aparecem em formato curto. Pessoas sem valor para o campo mostram uma célula em branco.

## Exportando os resultados da busca

Você pode baixar os resultados da sua busca atual como um arquivo CSV a qualquer momento:

1. Aplique qualquer busca ou filtro que desejar.
2. Clique no botão **Exportar** no cabeçalho da página Pessoas.
3. Um arquivo CSV será baixado para o seu computador, pronto para ser aberto no Excel, no Planilhas Google ou em qualquer aplicativo de planilhas.

Para mais detalhes sobre exportação, veja [Exportando dados](./exporting-data.md).

:::tip
Para consultas mais avançadas — como encontrar todas as pessoas que não compareceram nos últimos três meses — experimente o recurso [Pesquisa com IA](./ai-search.md), que permite pesquisar usando perguntas em linguagem simples.
:::

## Busca avançada {#advanced-search}

A Busca avançada permite criar filtros precisos combinando condições. Abra-a clicando em **Avançada** abaixo da caixa de busca na página Pessoas, depois expanda uma categoria e marque os campos pelos quais deseja filtrar (você pode clicar no nome do campo ou na sua caixa), escolhendo um operador e um valor para cada um. As categorias incluem **Nomes**, **Dados demográficos**, **Contato**, **Participação**, **Atividade** (doações e presença) e **Campos personalizados**.

Para encontrar pessoas novas, abra **Participação** e marque **Data de cadastro**. O filtro começa em **nos últimos N dias** com 30 preenchido, para que você encontre com um clique todos os que foram adicionados no último mês; altere o número de dias ou mude para *igual a / depois de / antes de* para escolher uma data. **Data de nascimento** e **Aniversário de casamento** também oferecem **nos últimos N dias**. A Data de cadastro só é registrada para pessoas criadas desde o final de outubro de 2026; pessoas adicionadas antes não têm data, então esse filtro não as encontra.

A categoria **Campos personalizados** lista os [Campos personalizados](../settings/custom-fields.md) da sua igreja — os campos que você define em Configurações para acompanhar suas próprias informações (como a data de vencimento de uma verificação de antecedentes). Os operadores oferecidos correspondem ao tipo de cada campo: campos de texto aceitam *contém / igual a / começa com / termina com*, campos numéricos aceitam os operadores de comparação, campos de data aceitam *igual a / depois de / antes de*, e campos Sim/Não e de Múltipla escolha permitem escolher um valor. Qualquer campo pelo qual você pode filtrar aqui pode ser salvo como uma [Lista](./lists.md) dinâmica.

## Salvando buscas como listas

Depois de executar uma busca, o botão **Salvar como lista** aparece no cabeçalho da página Pessoas. Clique nele para armazenar sua consulta atual com um nome e uma categoria opcional, para que você possa recarregá-la instantaneamente em sessões futuras. Veja [Listas salvas](./lists.md) para todos os detalhes.
