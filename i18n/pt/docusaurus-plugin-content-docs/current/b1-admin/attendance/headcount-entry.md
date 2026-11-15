---
title: "Lançamento de Contagem Total e Tendência"
description: "Lance um total de pessoas para um culto ou grupo no B1 Admin, sem lista nominal, e acompanhe esses totais semana a semana no relatório Tendência de Contagem Total."
---

# Lançamento de Contagem Total e Tendência

<div class="article-intro">

A contagem total permite registrar um número simples de presença -- para um culto, um horário de culto ou um grupo -- sem fazer check-in de uma lista nominal. Use-a quando você só precisar saber "quantas pessoas estiveram aqui" e combine-a com o relatório Tendência de Contagem Total para acompanhar esse número ao longo do tempo.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Suas unidades, cultos e horários de culto precisam estar configurados. Veja [Configuração de Presença](setup.md).
- Lançar uma contagem total exige a permissão **Presença &gt; Editar**; visualizar o relatório de tendência exige **Presença &gt; Visualizar**. Veja [Funções e Permissões](../settings/roles-permissions.md).

</div>

:::info
A contagem total é uma alternativa que registra apenas o total, em vez do [Registro de Presença](recording-attendance.md). Se você precisar saber **quem** esteve presente -- por exemplo, para acompanhar pessoas que não voltaram -- continue usando a presença nominal por sessão na aba Sessões de um grupo. A contagem total armazena apenas um número.
:::

## Registrando uma Contagem Total {#recording-a-headcount}

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Pessoas** e clique em **Presença**.
2. Clique em **Lançar contagem total** na coluna da esquerda.
3. Preencha o formulário:
   - **Culto** *(obrigatório)*
   - **Horário de culto** -- deixe em **Todos os horários de culto** para registrar um total de todos os horários do culto
   - **Grupo** -- opcional; somente os grupos com Controlar presença ativado são listados. Deixe em branco para "Sem grupo (culto inteiro)."
   - **Data**
   - **Contagem total** -- o número total de pessoas presentes (um número inteiro, 0 ou mais)
4. Clique em **Salvar**.

A tabela **Contagens recentes** ao lado do formulário lista seus últimos lançamentos com data, culto, horário de culto, grupo e quantidade. Clique em uma linha para carregá-la de volta no formulário caso precise corrigir ou excluir o registro.

## Relatório de Tendência de Contagem Total {#headcount-trend-report}

1. Na mesma página **Presença**, clique em **Todos os anos** na coluna da esquerda e, em seguida, selecione a aba **Tendência de Contagem Total**.
2. O relatório é executado quando a aba é aberta. Para restringi-lo, escolha uma **Unidade**, **Culto**, **Horário de culto** ou **Grupo** e clique em **Executar relatório**. Não há filtro de data -- o relatório abrange todas as semanas que têm uma contagem total.

O relatório mostra as contagens totais lançadas somadas por semana, tanto em um gráfico de linhas quanto em uma tabela -- no mesmo estilo de relatório usado pelas abas [Tendência de Presença e Presença por Grupo](tracking-attendance.md). As contagens lançadas para a semana atual também aparecem em **Contagens totais desta semana** na página principal de Presença.

## Páginas Relacionadas {#related-pages}

- [Registro de Presença](recording-attendance.md) -- presença nominal, por pessoa e por sessão
- [Acompanhamento de Presença](tracking-attendance.md) -- relatórios de tendência de presença e de grupos
- [Configuração de Presença](setup.md) -- configurar unidades, cultos e horários de culto
