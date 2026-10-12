---
title: "Visão Geral de Planos"
---

# Visão Geral de Planos

<div class="article-intro">

A Visão Geral de Planos oferece uma visão de pássaro de todas as suas atribuições de voluntários em múltiplas datas de serviço de uma vez. Em vez de abrir cada plano individualmente, você pode ver quem está servindo em cada posição nas próximas semanas em uma única grade -- e rapidamente identificar quaisquer lacunas que ainda precisam ser preenchidas.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie pelo menos um Ministério e Tipo de Plano na área Servindo
- Crie [planos de serviço](./plans.md) com datas e atribuições de voluntários
- Certifique-se de que seus voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md)

</div>

## Acessando a Visão Geral

1. Em B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Servindo** e clique em **Planos**.
2. Selecione uma **aba de ministério** no topo da página.
3. Clique em **Visão Geral** ao lado do tipo de plano na lista **Tipos de Plano**, ou abra o tipo de plano e clique em **Visão Geral** no topo da página.

A visão geral abrange o tipo de plano a partir do qual foi aberta. Clique no nome do tipo de plano no topo da visão geral para voltar à sua lista de planos.

## Lendo a Grade de Visão Geral

A visão geral exibe uma grade onde:

- **Linhas** representam cada posição (por exemplo, "Música: Guitarra", "Técnico: Projeção") agrupadas por categoria
- **Colunas** representam datas de serviço futuras (por exemplo, "14 de Abr", "21 de Abr")
- **Células** mostram o nome do voluntário atribuído a essa posição nessa data

Células destacadas em **vermelho** não estão preenchidas -- nenhum voluntário foi atribuído ainda. Isso torna fácil ver lacunas de pessoal de relance sem abrir cada plano individualmente.

:::tip
Nomes de voluntários são mostrados em um formato abreviado (nome e sobrenome inicial, por exemplo, "John D.") para manter a grade compacta quando você tem muitas posições.
:::

## Atribuindo Voluntários Diretamente da Visão Geral

Você não precisa abrir planos individuais para preencher slots vazios. Clique em qualquer célula na grade para abrir um painel de atribuição para essa posição e data. A partir daí você pode:

- Selecionar uma pessoa de sua equipe para atribuir à posição
- Clicar em **Remover** ao lado de qualquer um já atribuído para removê-lo desse slot
- Salvar a alteração sem sair da visão geral

Isso torna possível fazer a escala de todo um cronograma em uma única passagem -- trabalhe em semanas e posições sem navegar para dentro e fora dos planos individuais.

## Agendamento Automático da Visão Geral

Clique em **Agendamento automático** para que B1 preencha todos os slots abertos e não preenchidos na grade atual de uma vez. Para cada plano em vista, ele puxa candidatos do grupo vinculado a cada posição e preenche slots vazios automaticamente, relatando quantos dos planos visíveis ele foi capaz de preencher. Os planos são preenchidos um de cada vez para que o mesmo voluntário não seja dupla-marcado em duas datas na mesma passagem.

:::info
Agendamento automático apenas preenche slots que já estão vazios -- ele nunca substitui uma atribuição existente.
:::

## Enviando Email para Todos Agendados

Clique em **Email de Voluntários** para enviar uma notificação para cada voluntário atribuído em qualquer lugar no intervalo de datas filtrado e ministério, em uma única ação, em vez de enviar email por plano. B1 relata quantos emails foram enviados e quantos falharam.

## Enviando Texto para Todos Agendados {#texting-everyone-scheduled}

Se sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado e você puder editar planos e enviar textos, um botão **Enviar Texto aos Voluntários** aparece no topo da visão geral.

1. Clique em **Enviar Texto aos Voluntários**.
2. A caixa de diálogo mostra quantos voluntários receberão o texto (por exemplo, "12 de 14 voluntários receberão este texto"), além de quantos optaram por não receber textos e quantos não têm número de telefone cadastrado.
3. Digite sua **Mensagem**. Você pode clicar em um marcador para inserir o nome de cada voluntário ou o nome da sua igreja.
4. Clique em **Enviar**. B1 informa quantos textos foram enviados.

Cada voluntário escalado no intervalo de datas recebe um texto no número de celular do seu perfil, mesmo que sirva em várias datas. Pessoas que compartilham um número de telefone (como um telefone familiar) recebem apenas um texto. Voluntários que responderam STOP a um texto anterior são ignorados.

:::info
Os textos são enviados pelo provedor de SMS da própria igreja, portanto a cobrança desse provedor se aplica. Se a igreja ficar sem créditos de SMS, o envio será interrompido e a caixa de diálogo informará isso. Um único envio alcança no máximo 200 voluntários; restrinja o intervalo de datas se você tiver mais do que isso.
:::

## Destacando o Cronograma de um Voluntário

Use o menu suspenso **Destacar** para escolher uma pessoa de sua equipe -- cada célula onde eles estão atribuídos é realçada na grade, para que você possa ver em todos os lugares onde eles já estão servindo antes de adicioná-los a outro slot. Escolha **Todos** para desativar o destaque.

## Filtrando a Visão Geral

Você pode ajustar o que a visão geral mostra usando os controles acima da grade. A grade é atualizada assim que você os altera.

- **Todas as posições / Apenas não preenchidas** -- Escolha **Apenas não preenchidas** para ocultar linhas em que todas as datas já estão preenchidas, para que você possa focar apenas nas posições que ainda precisam de um voluntário.
- **Data de Início / Data de Fim** -- Por padrão a visão geral mostra 12 semanas no futuro. Digite datas personalizadas para expandir ou estreitar o intervalo.

## Exportando para CSV

Clique em **Exportar CSV** para baixar a grade atual como uma planilha. A exportação inclui todas as posições e atribuições de voluntários para o intervalo de datas filtrado, facilitando o compartilhamento com líderes de ministério ou impressão para reuniões de planejamento.

:::info
A exportação CSV reflete quaisquer filtros que estejam aplicados no momento -- apenas as datas e tipo de plano mostrados na grade estão incluídos no download.
:::

## Artigos Relacionados

- [Planos de Serviço](./plans.md) -- Crie e gerencie planos de serviço individuais
- [Ordem de Serviço](./service-order.md) -- Construa a ordem de serviço dentro de um plano
- [Agendando Aulas](./scheduling-lessons.md) -- Agende aulas ao lado de seus planos de serviço
