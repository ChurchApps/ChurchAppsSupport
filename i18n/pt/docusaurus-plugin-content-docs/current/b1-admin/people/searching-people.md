---
title: "Pesquisando pessoas"
description: "Pesquise o diretório de pessoas do B1 Admin pelo nome, ordene e escolha colunas na visualização em tabela, crie filtros com a Pesquisa avançada e exporte os resultados para CSV."
---

# Pesquisando pessoas

<div class="article-intro">

A página **Pessoas** exibe o diretório da sua igreja como uma lista pesquisável de domicílios ou como uma tabela ordenável de pessoas individuais. Você pode encontrar rapidamente qualquer pessoa da congregação, personalizar as informações exibidas e exportar os resultados. Pesquisar com eficiência é essencial para as tarefas do dia a dia da administração da igreja, como acompanhar visitantes, preparar listas de contato e gerenciar os registros de membros.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="Pesquisando pessoas e criando listas no B1" next="Campos personalizados, edição em massa e exportação no B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para visualizar pessoas. Veja [Funções e permissões](roles-permissions.md) se não tiver certeza do seu nível de acesso.
- O diretório da sua igreja deve ter pessoas cadastradas. Se você ainda não adicionou ninguém, veja [Como adicionar pessoas](adding-people.md) ou [Importando dados](importing-data.md).

</div>

## Visualizações por domicílio e em tabela {#households-and-table-views}

A página Pessoas lista o seu diretório por **domicílio**, agrupado em ordem alfabética. Cada linha mostra as fotos do domicílio, o nome dele (por exemplo, "Família Silva") e os nomes de todas as pessoas que o compõem. Clique em um domicílio para abrir o perfil do responsável, ou clique no nome de qualquer membro para abrir essa pessoa. Uma contagem acima da lista mostra quantos domicílios e pessoas estão sendo exibidos.

Use o botão **Exibir como** acima da lista para alternar entre **Domicílios** e **Tabela**. A visualização **Tabela** lista uma pessoa por linha e é onde você pode ordenar e escolher colunas (veja abaixo). O B1 lembra a sua escolha neste dispositivo.

Na visualização **Tabela**, a situação de membro de cada pessoa aparece abaixo do nome, e cada uma das sete situações tem sua própria cor, a mesma usada no perfil da pessoa. Quem tiver a função de domicílio definida como **Filho** também exibe uma etiqueta **Filho** ao lado da situação. Para marcar alguém como filho, defina a função dele no [painel de domicílio](./adding-people.md#managing-households) do perfil.

Por padrão, a página carrega a primeira parte do seu diretório. Se você tiver mais pessoas, clique em **Mostrar todos os membros** abaixo da lista para carregar todas.

## Pesquisa rápida {#quick-search}

A caixa **Encontrar um domicílio ou uma pessoa**, no topo da página Pessoas, permite encontrar membros em tempo real:

1. Clique na **caixa de pesquisa** no topo da página Pessoas.
2. Comece a digitar um nome.
3. Os resultados são filtrados automaticamente enquanto você digita (há um pequeno atraso de cerca de meio segundo, para que a pesquisa não seja executada a cada tecla).
4. A lista abaixo é atualizada para mostrar apenas os resultados correspondentes.

Clique em **Limpar** (abaixo da caixa de pesquisa) para redefinir a pesquisa e voltar a mostrar todo o diretório.

:::tip
Você não precisa pressionar Enter. A pesquisa é executada automaticamente depois que você para de digitar.
:::

## Ordenando resultados {#sorting-results}

Na visualização **Tabela**, as pessoas são listadas por sobrenome e depois por nome. Você pode ordenar o diretório de outra forma clicando em qualquer cabeçalho de coluna:

1. Clique em um **cabeçalho de coluna** (por exemplo, **Nome** ou **E-mail**) para ordenar por essa coluna.
2. Clique novamente no mesmo cabeçalho para inverter a ordem.

O primeiro clique ordena a coluna em ordem crescente (de A a Z, do mais novo ao mais velho, da data mais antiga para a mais recente), e a seta ao lado do cabeçalho mostra a direção. Pessoas sem valor naquela coluna são sempre listadas por último. Isso facilita encontrar pessoas em ordem alfabética, por idade ou por qualquer outra coluna visível.

## Personalizando colunas {#customizing-columns}

Nem todas as informações precisam estar visíveis ao mesmo tempo. Você pode escolher quais colunas aparecem na tabela:

1. Clique no ícone **Selecionar colunas** no cabeçalho da página Pessoas. (As colunas se aplicam à visualização **Tabela**, então marcar uma coluna também muda a página para a visualização **Tabela**.)
2. Marque ou desmarque colunas para exibi-las ou ocultá-las. A aba **Padrão** oferece:
   - **Foto** e **Nome de exibição** (exibidas por padrão)
   - **Sobrenome**, **Nome** e **Nome do meio**
   - **Endereço**, **Cidade**, **Estado/Província** e **CEP**
   - **E-mail principal** e **Telefone principal** (o celular, ou o telefone residencial ou comercial quando não há celular)
   - **Data de nascimento**, **Aniversário (sem ano)** e **Idade**
   - **Gênero**, **Situação de membro**, **Campus**, **Estado civil** e **Aniversário de casamento**
   - **Observações para crachá**
   - **Data de cadastro** -- quando o registro da pessoa foi criado
   - **Opção de exclusão** -- adiciona um ícone de exclusão a cada linha (oferecido somente se você puder editar pessoas)
3. A tabela é atualizada imediatamente para refletir as suas escolhas. Clique em **Concluído** (ou **Fechar**) para fechar a caixa de diálogo **Selecionar colunas**. O B1 lembra as suas colunas neste dispositivo.

### Exibindo campos personalizados como colunas {#showing-custom-fields-as-columns}

O seletor de colunas tem duas abas: **Padrão** reúne as colunas integradas listadas acima, e **Personalizado** reúne os [Campos personalizados](../settings/custom-fields.md) da sua igreja, junto com as perguntas de quaisquer formulários do tipo Pessoas. Marque um campo personalizado na aba **Personalizado** para incluí-lo como coluna, e o valor de cada pessoa para esse campo aparece na tabela. Os valores são exibidos da mesma forma que no perfil da pessoa -- campos Sim/Não mostram *Sim* ou *Não*, campos de Múltipla escolha mostram o rótulo da opção, e datas aparecem como datas curtas. Pessoas sem valor para o campo mostram uma célula em branco.


## Exportando os resultados da pesquisa {#exporting-search-results}

Você pode baixar os resultados atuais da pesquisa como um arquivo CSV a qualquer momento:

1. Aplique as pesquisas ou os filtros que desejar.
2. Clique no botão **Exportar** no cabeçalho da página Pessoas.
3. Um arquivo CSV será baixado para o seu computador, pronto para ser aberto no Excel, no Google Sheets ou em qualquer aplicativo de planilha.

Para mais detalhes sobre exportação, veja [Exportando dados](./exporting-data.md).

:::tip
Para consultas mais avançadas -- como encontrar todas as pessoas que não frequentam há três meses --, experimente o recurso [Pesquisa com IA](./ai-search.md), que permite pesquisar usando perguntas em linguagem simples.
:::

## Pesquisa avançada {#advanced-search}

A Pesquisa avançada permite criar filtros precisos combinando condições. Abra-a clicando em **Avançada** abaixo da caixa de pesquisa na página Pessoas; depois, expanda uma categoria e marque os campos pelos quais deseja filtrar (você pode clicar no nome do campo ou na caixa dele), escolhendo um operador e um valor para cada um. As categorias incluem **Nomes**, **Demografia**, **Informações de contato**, **Membresia e grupos** (situação de membro, campus, data de cadastro e participação em grupos), **Atividade** (doações e presença) e **Campos personalizados**.

Não há botão de pesquisar: os resultados são atualizados automaticamente cerca de meio segundo depois que você altera um filtro, e as pessoas precisam atender a todos os filtros marcados. Os filtros ativados aparecem como chips acima das categorias -- clique no **x** de um chip para removê-lo, ou em **Limpar tudo** para removê-los todos. Clique em **Avançada** novamente para ocultar o painel.

Para encontrar pessoas recém-cadastradas, abra **Membresia e grupos** e marque **Data de cadastro**. O filtro começa em **nos últimos N dias**, com 30 preenchido, para que você encontre todas as pessoas adicionadas no último mês com um clique; altere o número de dias ou mude para *igual a / depois de / antes de* para escolher uma data. **Data de nascimento** e **Aniversário de casamento** também oferecem **nos últimos N dias**. A data de cadastro só é registrada para pessoas criadas desde o final de outubro de 2026; pessoas adicionadas antes não têm data, então este filtro não as encontra.

A categoria **Campos personalizados** lista os [Campos personalizados](../settings/custom-fields.md) da sua igreja -- os campos que você define em Configurações para acompanhar informações próprias (como a data de vencimento de uma verificação de antecedentes). Os operadores oferecidos correspondem ao tipo de cada campo: campos de texto aceitam *contém / igual a / começa com / termina com*, campos numéricos aceitam os operadores de comparação, campos de data aceitam *igual a / depois de / antes de*, e campos Sim/Não e de Múltipla escolha permitem escolher um valor. Qualquer campo que você possa filtrar aqui pode ser salvo como uma [Lista](./lists.md) dinâmica.

## Salvando pesquisas como listas {#saving-searches-as-lists}

Depois de fazer uma pesquisa que retorne pelo menos uma pessoa, um botão **Salvar como lista** aparece no cabeçalho da página Pessoas (para a equipe que pode editar pessoas). Clique nele para armazenar a consulta atual com um nome e uma categoria opcional, para que você possa recarregá-la instantaneamente em sessões futuras. Veja [Listas salvas](./lists.md) para todos os detalhes.
