---
title: "Visão geral dos planos"
description: "Tenha uma visão panorâmica das escalas de voluntários em muitas datas de culto no B1 Admin, identifique posições não preenchidas e preencha ou envie e-mails para sua equipe a partir de uma única grade."
---

# Visão geral dos planos {#plans-overview}

<div class="article-intro">

A Visão geral dos planos oferece uma visão panorâmica de todas as suas escalas de voluntários em várias datas de culto ao mesmo tempo. Em vez de abrir cada plano individualmente, você pode ver quem está servindo em todas as posições das próximas semanas em uma única grade — e identificar rapidamente as lacunas que ainda precisam ser preenchidas.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie pelo menos um Ministério e um Tipo de plano na área Servindo
- Crie [planos de culto](./plans.md) com datas e escalas de voluntários
- Certifique-se de que seus voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md)

</div>

## Acessando a visão geral {#accessing-the-overview}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Servindo** e clique em **Planos**.
2. Selecione uma **aba de ministério** no topo da página.
3. Clique em **Visão geral** ao lado do tipo de plano na lista **Tipos de plano**, ou abra o tipo de plano e clique em **Visão geral** no topo da página.

A visão geral abrange o tipo de plano a partir do qual você a abriu. Clique no nome do tipo de plano no topo da visão geral para voltar à lista de planos dele.

## Lendo a grade da visão geral {#reading-the-overview-grid}

A visão geral exibe uma grade em que:

- **Linhas** representam cada posição (por exemplo, "Música: Guitarra", "Técnica: Projeção"), agrupadas por categoria
- **Colunas** representam as próximas datas de culto (por exemplo, "14 abr", "21 abr")
- **Células** mostram o nome do voluntário atribuído àquela posição naquela data. Um pequeno ícone vermelho de calendário depois de um nome indica que esse voluntário tem uma [data de indisponibilidade](./plan-validation.md#blockout-dates) naquele dia; passe o mouse sobre ele para ver as datas

As células destacadas em **vermelho** não estão preenchidas — nenhum voluntário foi atribuído ainda. Isso facilita enxergar lacunas na escala de relance, sem abrir cada plano individualmente.

:::tip
Os nomes dos voluntários aparecem em formato abreviado (primeiro nome e inicial do sobrenome, por exemplo, "João S.") para manter a grade compacta quando você tem muitas posições.
:::

## Atribuindo voluntários diretamente pela visão geral {#assigning-volunteers-directly-from-the-overview}

Você não precisa abrir planos individuais para preencher vagas vazias. Clique em qualquer célula da grade para abrir um painel de atribuição para aquela posição e data. A partir dele, você pode:

- Clicar no nome de um membro da equipe para atribuí-lo à posição (ou, para uma posição sem Grupo de voluntários, pesquisar qualquer pessoa da sua igreja). Use **Pesquisar equipe** para encontrar alguém em uma equipe grande. Quem estiver indisponível naquele dia mostra um selo **Indisponível** e aparece por último
- Clicar no ícone **Remover** (X) ao lado de qualquer pessoa já atribuída, e confirmar, para retirá-la daquela vaga
- Clicar em **Concluído** para fechar o painel sem sair da visão geral

Isso permite montar a escala inteira em uma única passagem — trabalhar entre semanas e posições sem entrar e sair de planos individuais.

## Agendamento automático pela visão geral {#auto-scheduling-from-the-overview}

Clique em **Agendamento automático** e confirme para que o B1 preencha de uma vez todas as vagas abertas e não preenchidas da grade atual. Para cada plano visível, ele busca candidatos no grupo vinculado a cada posição e preenche automaticamente as vagas vazias, informando quantos dos planos visíveis conseguiu preencher (por exemplo, "Agendamento automático em 3 de 4 planos"). Posições sem Grupo de voluntários são ignoradas. Os planos são preenchidos um de cada vez, para que o mesmo voluntário não seja escalado em duas datas diferentes na mesma passagem.

:::info
O agendamento automático preenche apenas as vagas que já estão vazias — nunca substitui uma atribuição existente.
:::

## Enviando e-mail a todos os escalados {#emailing-everyone-scheduled}

Clique em **Enviar e-mail aos voluntários** e confirme para enviar uma notificação a cada voluntário escalado em qualquer ponto do intervalo de datas e do ministério filtrados, em uma única ação, em vez de enviar plano por plano. O B1 informa quantos e-mails foram enviados e quantos falharam.

## Enviando SMS a todos os escalados {#texting-everyone-scheduled}

Se a sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado e você puder editar planos e enviar mensagens, um botão **Enviar SMS aos voluntários** aparece no topo da visão geral.

1. Clique em **Enviar SMS aos voluntários**.
2. A caixa de diálogo mostra quantos voluntários receberão o SMS (por exemplo, "12 de 14 voluntários receberão este SMS"), além de quantos optaram por não receber mensagens e quantos não têm número de telefone cadastrado.
3. Digite sua **Mensagem**. Você pode clicar em um marcador para inserir o nome de cada voluntário ou o nome da sua igreja.
4. Clique em **Enviar**. O B1 informa quantos SMS foram enviados.

Cada voluntário escalado no intervalo de datas recebe um SMS no número de celular do perfil dele, mesmo que sirva em várias datas. Pessoas que compartilham o mesmo número de telefone (como um telefone de família) recebem apenas um SMS. Voluntários que responderam STOP a um SMS anterior são ignorados.

:::info
Os SMS são enviados pelo provedor de SMS da própria igreja, e os custos desse provedor se aplicam. Se a sua igreja estiver sem créditos de SMS, o envio é interrompido e a caixa de diálogo avisa. Um único envio atinge no máximo 200 voluntários; restrinja o intervalo de datas se tiver mais do que isso.
:::

## Destacando a escala de um voluntário {#highlighting-a-volunteers-schedule}

Use a lista **Destacar** para escolher uma pessoa da sua equipe — todas as células em que ela está atribuída ficam destacadas na grade, para que você veja onde ela já está servindo antes de adicioná-la a outra vaga. Escolha **Todos** para desativar o destaque.

## Filtrando a visão geral {#filtering-the-overview}

Você pode ajustar o que a visão geral mostra usando os controles acima da grade. A grade é atualizada assim que você os altera.

- **Todas as posições / Somente não preenchidas** — Escolha **Somente não preenchidas** para ocultar as linhas em que todas as datas já estão preenchidas, para que você se concentre nas posições que ainda precisam de um voluntário.
- **Data inicial / Data final** — Por padrão, a visão geral mostra 12 semanas à frente. Digite datas personalizadas para ampliar ou restringir o intervalo.

## Exportando para CSV {#exporting-to-csv}

Clique em **Exportar CSV** para baixar a grade atual como planilha. A exportação inclui todas as posições e as atribuições de voluntários do intervalo de datas filtrado, o que facilita compartilhar com líderes de ministério ou imprimir para reuniões de planejamento.

:::info
A exportação em CSV reflete os filtros aplicados no momento — somente as datas e o tipo de plano exibidos na grade são incluídos no download.
:::

## Artigos relacionados {#related-articles}

- [Planos de culto](./plans.md) — Crie e gerencie planos de culto individuais
- [Ordem do culto](./service-order.md) — Monte a ordem do culto dentro de um plano
- [Agendando lições](./scheduling-lessons.md) — Agende lições junto com seus planos de culto
