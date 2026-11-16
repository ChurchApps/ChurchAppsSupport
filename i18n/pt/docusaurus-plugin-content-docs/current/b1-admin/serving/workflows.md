---
title: "Fluxos de trabalho"
description: "Crie quadros no estilo Kanban no B1 Admin para acompanhar pessoas em etapas de acompanhamento, com e-mails e SMS automáticos e gatilhos que adicionam pessoas automaticamente."
---

# Fluxos de trabalho {#workflows}

<div class="article-intro">

Os fluxos de trabalho levam pessoas por uma sequência de etapas em um quadro visual. Cada pessoa se torna um card que avança de uma etapa para a seguinte — desde o acompanhamento de um visitante que chegou pela primeira vez, passando por um processo de membresia, até um agradecimento a quem doa pela primeira vez, e qualquer outra situação em que você precise acompanhar muitas pessoas pelas mesmas fases. Uma etapa pode pedir que um voluntário faça algo (ligar, conversar) **e** executar ações automatizadas por conta própria — enviar um e-mail ou SMS, aguardar alguns dias, adicionar a pessoa a um grupo —, de modo que os fluxos de trabalho cuidam tanto do acompanhamento humano quanto das tarefas repetitivas em volta dele. Os fluxos de trabalho estendem as [Tarefas](./tasks.md) para um quadro Kanban arrastar e soltar, para que ninguém e nada fique esquecido.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Certifique-se de que as pessoas que deseja acompanhar existem no B1 Admin
- Familiarize-se com o funcionamento das [Tarefas](./tasks.md), já que cada card de um quadro é uma tarefa
- Para usar a ação **Enviar e-mail**, crie primeiro os modelos de e-mail que deseja enviar (gerenciados em **Configurações → Modelos de e-mail**)
- Para usar a ação **Enviar SMS**, conecte antes um [provedor de SMS](../settings/church-settings.md#texting)
- Você precisará da permissão de Tarefas adequada. Visualizar, editar cards e gerenciar fluxos de trabalho são níveis de permissão separados (veja [Funções e permissões](../settings/roles-permissions.md))

</div>

## Visualizando os fluxos de trabalho {#viewing-workflows}

Abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin), expanda **Servindo** e clique em **Fluxos de trabalho**. Seus fluxos de trabalho são listados em uma tabela que mostra a **Categoria** e o **Status** de cada um (**Ativo** ou **Inativo**). Se você usa categorias, as abas acima da lista permitem filtrá-la por categoria. Clique em qualquer fluxo de trabalho para abrir o quadro dele.

## Criando um fluxo de trabalho {#creating-a-workflow}

1. Na página Fluxos de trabalho, clique em **Adicionar fluxo de trabalho**.
2. Escolha como começar:
   - **Fluxo de trabalho em branco** -- comece do zero e crie suas próprias etapas.
   - **A partir de um modelo** -- comece com um conjunto pronto de etapas que você pode editar. Os modelos integrados incluem:
     - **Acompanhamento de novo visitante** -- Enviar e-mail de boas-vindas → Ligação pessoal → Convidar para o próximo passo → Conectado
     - **Aula de membresia** -- Demonstrar interesse → Inscrever-se na aula → Frequentar a aula → Concluir a membresia
     - **Agradecimento a quem doa pela primeira vez** -- Enviar bilhete de agradecimento → Compartilhar o impacto da contribuição → Mordomia
     - **Confirmação de escala de serviço** -- Enviar solicitação e aguardar resposta → Ligar para o voluntário sobre a solicitação sem resposta (veja [Confirmações de escala de serviço](#serving-assignment-confirmations))

   Montar as etapas de um modelo pode levar um momento. Enquanto isso acontece, o botão **Adicionar fluxo de trabalho** exibe **Criando...** e não pode ser clicado novamente, para que você não crie uma duplicata. Se algo der errado, a página mostra *"Não foi possível criar o fluxo de trabalho. Tente novamente."*
3. Dê um **Nome** ao fluxo de trabalho.
4. Opcionalmente, atribua uma **Categoria** para agrupar fluxos de trabalho relacionados. Você pode criar uma nova categoria diretamente na lista suspensa.
   Para um fluxo de trabalho em branco, você também escolhe sua **Finalidade do fluxo de trabalho**: **Acompanhamento de pessoas** (o tipo habitual) ou **Confirmação de escala de serviço**. A finalidade não pode ser alterada depois que o fluxo de trabalho é criado.
5. Mantenha o fluxo de trabalho **Ativo** para que pessoas possam ser adicionadas a ele, ou defina-o como **Inativo** para ocultá-lo das listas de adição a fluxos de trabalho.
6. Clique em **Salvar**.

:::tip
Use o botão **Duplicar** na lista de Fluxos de trabalho para copiar um fluxo existente — incluindo suas etapas, ações automatizadas e roteamento — como ponto de partida para um novo.
:::

## Montando o quadro com etapas {#building-the-board-with-steps}

Cada quadro de fluxo de trabalho é formado por **etapas**, exibidas como colunas da esquerda para a direita. Abra um fluxo de trabalho e use **Adicionar etapa** para criar cada fase do seu processo.

Ao adicionar ou editar uma etapa, você pode configurar:

- **Nome da etapa** -- o cabeçalho da coluna (por exemplo, "Ligação de boas-vindas" ou "Aguardando inscrição").
- **Vence em (dias)** -- define automaticamente uma data de vencimento quando um card entra nesta etapa. Cards que passam da data de vencimento são sinalizados como **Atrasados**. Deixe em branco para não ter data de vencimento; você também pode apagar um número definido antes.
- **Responsável padrão** -- a pessoa ou o grupo ao qual os novos cards desta etapa são atribuídos automaticamente. Quando o responsável padrão é uma pessoa, ela recebe uma notificação de que um card foi atribuído a ela.
- **Ações automatizadas** -- coisas que o sistema faz por conta própria quando um card chega (veja abaixo).
- **Roteamento** -- para onde o card vai quando sai da etapa (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).

Arraste as colunas de etapa para a ordem que corresponde ao seu processo. A ordem também define o caminho padrão que um card percorre quando nenhuma outra regra de roteamento se aplica.

:::info
Salve primeiro uma nova etapa. As ações automatizadas e o roteamento ficam vinculados à etapa, então o editor libera essas seções assim que a etapa existe.
:::

## Ações automatizadas {#automated-actions}

Cada etapa pode ter uma lista de **ações automatizadas** que são executadas por conta própria no momento em que um card **entra** na etapa — antes que alguém mexa nele. É assim que uma etapa, ao mesmo tempo, orienta um voluntário *e* cuida do trabalho rotineiro em torno do acompanhamento.

No editor da etapa, abra **Ações automatizadas**, clique em **Adicionar ação**, escolha um tipo e preencha suas configurações. Adicione quantas precisar; elas são executadas **de cima para baixo, em ordem**. Clique em **Salvar** na etapa para salvar a etapa e todas as suas ações juntas. Remover uma ação com o ícone de lixeira tem efeito imediato.

| Ação | O que faz |
|---|---|
| **Enviar e-mail** | Envia à pessoa um modelo de e-mail que você escolher. Você pode substituir o assunto. |
| **Enviar SMS** | Envia à pessoa uma mensagem que você escreve, pelo [provedor de SMS](../settings/church-settings.md#texting) da sua igreja. |
| **Aguardar** | Pausa o card por um número de dias antes de continuar (veja abaixo). |
| **Adicionar ao grupo** | Adiciona a pessoa a um [grupo](../groups/index.md) que você escolher. |
| **Remover do grupo** | Remove a pessoa de um grupo que você escolher. |
| **Registrar presença** | Marca a pessoa como presente no horário de culto de um grupo que esteja em andamento (veja abaixo). |
| **Adicionar ao fluxo de trabalho** | Inicia a pessoa em outro fluxo de trabalho — útil para transferir entre processos. |
| **Adicionar nota** | Registra uma nota no histórico do card. |
| **Definir campo** | Atualiza um campo do cadastro da pessoa: Situação de membro, Estado civil, Gênero, Cidade, Estado ou CEP. |
| **Webhook** | Envia os detalhes do card para um endereço web externo (URL) que você informar, para conectar a outros sistemas. |
| **Criar tarefa** | Cria uma [tarefa](./tasks.md) com o título e a descrição que você informar, atribuída a quem você escolher. |
| **Notificar pessoa** | Envia a um membro da equipe ou voluntário que você escolher um e-mail e uma notificação do B1 sobre o card (veja abaixo). |

Depois que todas as ações de uma etapa terminam, o card **permanece nessa etapa** para que uma pessoa possa trabalhá-lo — a menos que a etapa tenha uma rota automática que o leve adiante (veja [Etapas totalmente automatizadas](#fully-automated-steps)).

:::info
As ações automatizadas são executadas apenas quando um card chega pelo fluxo normal — quando é adicionado pela primeira vez, quando um resultado ou uma rota automática o traz, ou depois que uma espera termina. Elas **não** são executadas novamente quando um membro da equipe arrasta manualmente um card para a etapa ou o devolve, para que uma pessoa não receba o mesmo e-mail duas vezes.
:::

### Enviando e-mail {#sending-email}

Escolha **Enviar e-mail**, selecione um dos seus modelos de e-mail e, opcionalmente, digite um assunto personalizado. Quando um card entra na etapa, a pessoa recebe esse e-mail automaticamente. (Se a pessoa não tiver endereço de e-mail cadastrado, a etapa simplesmente ignora esta ação.) [Campos de mesclagem](../settings/email-templates.md#merge-fields) no modelo, como `{{firstName}}`, são preenchidos com os dados da própria pessoa. Se um gatilho **Doação · Criada** iniciou o fluxo de trabalho, os campos de contribuição `{{amount}}`, `{{giftDate}}`, `{{fund}}` e `{{receipt}}` são preenchidos a partir dessa contribuição, mesmo em etapas executadas depois de uma espera. Veja [Campos de mesclagem de contribuições](../settings/email-templates.md#gift-merge-fields).

Quando o e-mail é enviado, o histórico do card registra **E-mail enviado**. Se ele não puder ser enviado — por exemplo, porque o e-mail da sua igreja ainda não foi aprovado ou porque o limite diário foi atingido —, nenhuma entrada de "E-mail enviado" é adicionada.

:::info
Os e-mails de fluxos de trabalho só são enviados depois que a sua igreja for aprovada para enviar e-mails de grupo, e contam para o limite diário de e-mails da igreja. Veja [Ativando o e-mail de grupo para a sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church). A ação **Enviar e-mail** avisa no editor da etapa quando esses e-mails não serão enviados: *"O e-mail da sua igreja ainda não foi aprovado..."* se a aprovação ainda estiver pendente, ou *"O e-mail da sua igreja está pausado..."* se mensagens recentes voltaram ou foram denunciadas como spam.
:::

### Registrando presença {#recording-attendance}

Escolha **Registrar presença** e clique em **Escolher grupo** para selecionar o grupo cuja presença deve ser registrada. Quando a ação é executada, a pessoa é marcada como presente no horário de culto desse grupo que esteja em andamento — exatamente como se tivesse feito check-in. Isso é útil com um gatilho que adiciona pessoas ao fluxo conforme elas chegam, para que sejam contadas sem um check-in separado.

- A presença é medida no momento em que o card foi **criado**, então uma **Espera** anterior no fluxo não o empurra para depois do culto.
- Somente horários de culto com dia e hora de início são contados. Se nenhum horário de culto do grupo estiver em andamento naquele momento, nada é registrado e o histórico do card indica **Nenhum culto agendado em andamento — presença não registrada**.
- Quando a presença é registrada, o histórico do card mostra **Presença registrada** seguido do nome do grupo. Executar a ação novamente para o mesmo culto não conta a pessoa duas vezes.

### Notificando uma pessoa {#notifying-a-person}

Escolha **Notificar pessoa**, clique em **Escolher pessoa** e, opcionalmente, digite uma **Mensagem**. Quando um card entra na etapa, essa pessoa recebe um e-mail e uma notificação do B1 com o nome da pessoa no card, os nomes do fluxo de trabalho e da etapa, a sua mensagem e um link para abrir o card. Use para avisar um membro da equipe ou líder de ministério — por exemplo, *"Avise o pastor quando alguém chegar à etapa Entrevista de membresia."* O histórico do card registra **Notificado** seguido do nome da pessoa.

### Enviando SMS {#sending-a-text}

Escolha **Enviar SMS** e digite a **Mensagem de texto** (até 1.600 caracteres). Se a sua igreja tiver salvo [modelos de texto](../settings/email-templates.md), aparece uma lista **Começar a partir de um modelo** acima da caixa. Ao escolher um, o texto do modelo é copiado para a mensagem, e você ainda pode editá-lo. A etapa mantém a sua própria cópia, então alterações posteriores no modelo não mudam a etapa. Quando um card entra na etapa, a pessoa recebe esse SMS no celular. Para personalizar a mensagem, clique em um botão abaixo da caixa de mensagem — **Nome**, **Sobrenome**, **Nome de exibição** ou **Nome da igreja** — para inserir `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}` na posição do cursor. Cada um deles é preenchido com os dados da pessoa quando o SMS é enviado. Os botões **Valor**, **Data da contribuição**, **Fundo** e **Recibo** inserem os campos de contribuição, que só são preenchidos quando um gatilho **Doação · Criada** iniciou o fluxo de trabalho. Por exemplo, `Thanks {{firstName}} for your gift of {{amount}} to {{fund}}!`

- Se a pessoa não tiver celular cadastrado, nenhum SMS é enviado e o histórico do card registra **SMS ignorado: sem celular**.
- Se a pessoa tiver optado por não receber, nenhum SMS é enviado e o histórico do card registra **SMS ignorado: optou por não receber**.
- Quando o SMS é enviado, o histórico do card registra **SMS enviado**. Se o envio falhar — por exemplo, porque nenhum provedor de SMS está conectado ou porque a sua igreja está sem créditos de SMS —, a falha é registrada no histórico do card e as ações restantes da etapa continuam sendo executadas.

:::warning
Os SMS são enviados pelo [provedor de SMS](../settings/church-settings.md#texting) da própria igreja. Se nenhum provedor estiver conectado, o editor da ação avisa *"Nenhum provedor de SMS está configurado"* e os SMS não serão enviados.
:::

### Aguardando alguns dias (sequências de acompanhamento) {#waiting-a-few-days-drip-sequences}

A ação **Aguardar** mantém um card pelo número de dias que você definir. Enquanto espera, o card aparece como **Adiado**. O B1 verifica as esperas concluídas a cada 30 minutos, então um card retoma em até cerca de meia hora após o término da espera. Quando a espera termina:

1. Quaisquer **ações restantes na mesma etapa** são executadas — assim você pode criar um acompanhamento gradual como **Enviar e-mail → Aguardar 3 dias → Enviar e-mail de lembrete**.
2. Em seguida, se a etapa tiver uma rota automática, o card avança; caso contrário, ele permanece na etapa para que uma pessoa assuma.

:::tip
Uma **Espera** no início de uma etapa é uma forma simples de "segurar" um card antes que ele chegue a um voluntário — por exemplo, *Aguardar 7 dias, depois um coach entra em contato*.
:::

## Adicionando pessoas como cards {#adding-people-as-cards}

Há várias formas de colocar pessoas em um quadro:

- **Pelo quadro** -- Clique em **Adicionar card** na parte inferior de uma coluna de etapa e escolha uma pessoa. Você também pode escolher um grupo, e cada membro desse grupo é adicionado como card.
- **Pelo cadastro de uma pessoa** -- Use **Adicionar ao fluxo de trabalho** na página de uma pessoa para incluí-la em um fluxo.
- **Pela busca de Pessoas** -- Selecione várias pessoas e use a ação em massa **Adicionar ao fluxo de trabalho** para adicioná-las todas de uma vez.
- **Automaticamente com um gatilho** -- Adicione pessoas quando algo acontece, como o envio de um formulário ou a primeira contribuição (veja [Gatilhos](#triggers) abaixo).

Adicionar alguém manualmente, ou com uma ação de etapa **Adicionar ao fluxo de trabalho**, nunca cria um segundo card aberto para a mesma pessoa no mesmo fluxo. Se ela já tiver um card aberto, é ignorada (em uma adição em massa, apenas as pessoas sem card recebem um novo). Depois que o card é concluído, você pode adicioná-la novamente. Os gatilhos seguem a própria configuração **Apenas uma vez por pessoa**.

## Trabalhando no quadro {#working-the-board}

Abra um fluxo de trabalho para ver o quadro. Cada card mostra o nome da pessoa, a quem ele está atribuído e um selo de vencimento ou status (**Atrasado** ou **Adiado**). Uma coluna de etapa também mostra pequenos distintivos para as ações automatizadas que executa e anotações para o roteamento, oferecendo um mapa de relance de como os cards fluem. Dentro de cada coluna, o card que entrou na etapa mais recentemente fica no topo.

- **Mover um card** -- Arraste um card de uma coluna para a seguinte conforme a pessoa avança.
- **Abrir um card** -- Clique duas vezes em um card (ou clique nele) para abrir o painel de detalhes, onde você pode alterar a etapa, reatribuí-lo, adicionar notas e revisar o que já aconteceu.

No painel do card, você pode:

- **Atribuir** o card a outra pessoa ou grupo. A alteração é registrada na **Atividade** do card, por exemplo "Reatribuído de Jane Smith para John Doe".
- **Adiar** o card por 1 dia, 3 dias ou 1 semana, para ocultar temporariamente a data de vencimento.
- **Devolver** à etapa anterior ou **Pular** para a próxima etapa.
- **Fixar atribuição** -- manter o mesmo responsável pelo card mesmo quando ele se move entre etapas. Por padrão, ao mover um card para uma nova etapa, ele é reatribuído ao responsável padrão dessa etapa; fixar mantém a pessoa atual responsável do início ao fim.
- **Concluir** o card para finalizá-lo, ou escolher um botão de **Resultado**, se a etapa tiver resultados configurados (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).
- **Remover card** -- tira um card do quadro sem concluí-lo, por exemplo quando alguém foi adicionado por engano. Depois de confirmar, o card é fechado e retirado da lista de todos. Nenhum resultado, rota ou ação de etapa é executado, e o histórico dele é mantido com um registro de **Removido**. Para um card de [confirmação de escala de serviço](#serving-assignment-confirmations), remover o card fecha a solicitação da mesma forma.
- **Adicionar notas** e revisar a **Atividade** do card -- um registro das ações automatizadas que já foram executadas (e-mails enviados, esperas etc.), cada uma com a data e a hora em que ocorreu.

Para um card sobre uma pessoa, o painel também mostra o celular e o e-mail dessa pessoa como links que você pode tocar para ligar ou enviar e-mail, além de um link **Ver perfil** se você tiver permissão para visualizar pessoas. A pessoa a quem o card está atribuído vê o telefone e o e-mail mesmo sem acesso a Pessoas.

As notas são salvas junto ao card. Qualquer pessoa que possa abrir o card — inclusive a pessoa ou o grupo ao qual ele está atribuído — pode ler as notas e adicionar as suas. Quem não pode abrir o card não vê as notas dele.

### Ações em massa {#bulk-actions}

Marque as caixas de seleção de vários cards para agir sobre eles em conjunto. Para escolher todos os cards de uma etapa de uma vez, marque a caixa **Selecionar tudo** no cabeçalho da coluna da etapa; marque-a novamente para limpar a seleção. Aparece uma barra de ferramentas para **Concluir**, **Adiar**, **Atribuir** (reatribuir) ou **Mover para…** outra etapa, para todos os cards selecionados de uma vez.

## Roteamento de cards com resultados e condições {#routing-cards-with-outcomes-and-conditions}

O roteamento controla para onde um card vai quando sai de uma etapa. Abra o editor da etapa para configurar dois tipos de roteamento.

### Botões de resultado {#outcome-buttons}

Os resultados são botões exibidos no painel do card quando você está concluindo um card nessa etapa. Em vez de um único botão **Concluir**, você pode oferecer opções como "Entrou em um grupo" ou "Sem interesse". Cada resultado pode:

- Enviar o card para **outra etapa** deste fluxo de trabalho,
- **Transferir o card** para um fluxo de trabalho diferente, ou
- **Fechar** o card.

Isso permite que uma única decisão direcione a pessoa para caminhos diferentes.

### Roteamento automático (condicional) {#automatic-routing-conditional}

As rotas automáticas movem um card adiante **no momento em que ele entra em uma etapa** (e depois que as ações automatizadas terminam), sem que ninguém clique, se a pessoa atender a um conjunto de condições. Adicione uma rota, escolha a etapa de destino e defina uma ou mais **condições** (por exemplo, o campus, a idade ou a situação de membro de uma pessoa). Campos de texto podem ser comparados exatamente ou com **contém**, **começa com** ou **termina com**. Uma rota sem condições se aplica a todos.

As condições de data (Data de hoje, Data de nascimento ou Aniversário de casamento) podem comparar a data completa ou apenas parte dela — o dia da semana, o **Dia do mês**, o **Mês** ou os anos decorridos. Para a Data de nascimento ou o Aniversário de casamento de uma pessoa, o **Dia do mês** oferece a opção relativa **Hoje**, de modo que uma condição como *Data de nascimento · Dia do mês = Hoje* corresponde às pessoas cujo aniversário cai no dia do mês de hoje. O **Mês** oferece **Mês anterior**, **Mês atual** e **Próximo mês**. Valores relativos como esses são calculados com o fuso horário da sua igreja, para que coincidam com o dia do calendário da igreja, e não com o do servidor.

O grupo de condições **Contribuições** tem **Doador regular que deixou de contribuir**, que encontra pessoas que costumavam contribuir regularmente e depois pararam. Defina três números: *Contribuiu em pelo menos* **3** *das últimas* **12** *semanas, depois nada nas últimas* **3** *semanas* (esses são os padrões). As semanas são contadas a partir de hoje, no fuso horário da sua igreja, e uma contribuição estornada não conta. É mais útil em um [gatilho de agenda](#schedule-triggers) — por exemplo, uma regra semanal que adiciona doadores que deixaram de contribuir a um quadro de acompanhamento pastoral. A condição considera apenas as datas das contribuições, nunca os valores, e cards e alertas nunca mostram valores. Como revela quem deixou de contribuir, somente as pessoas que podem visualizar doações veem essa opção e podem adicioná-la, alterá-la ou removê-la.

Se as condições de uma rota não puderem ser verificadas por algum motivo, essa rota é considerada como não correspondente. O card permanece na etapa (ou segue outra rota que corresponda), em vez de ficar travado.

:::info
No quadro, cada coluna de etapa mostra pequenas anotações que descrevem o roteamento dela — por exemplo, o nome de um resultado ou "se corresponder" seguido de uma seta para a etapa ou o fluxo de destino.
:::

## Etapas totalmente automatizadas {#fully-automated-steps}

Você pode fazer uma etapa funcionar inteiramente por conta própria, sem que ninguém trabalhe nela. Configure as **ações automatizadas** da etapa e adicione uma **rota automática** (sem condições) apontando para a próxima etapa. Quando um card entra, as ações são executadas e, em seguida, a rota o avança imediatamente — o card passa direto.

:::tip
Combine isso com a **Espera**: *Enviar e-mail de boas-vindas → Aguardar 3 dias → avançar automaticamente para a etapa "Ligação pessoal".* O e-mail e o tempo são cuidados para você, e um voluntário só vê o card quando chega a hora do contato humano.
:::

## Gatilhos {#triggers}

Os gatilhos adicionam pessoas a um fluxo de trabalho automaticamente quando algo acontece, para que você nunca precise adicionar cards manualmente. Em um quadro de fluxo de trabalho, clique na aba **Gatilhos** e depois em **Adicionar gatilho**. Há dois tipos:

### Gatilhos de evento {#event-triggers}

Disparam assim que um registro muda no B1. Escolha o evento e, opcionalmente, adicione **condições** para que apenas as pessoas correspondentes sejam adicionadas:

- **Pessoa · Criada / Atualizada** -- por exemplo, adicionar qualquer pessoa cuja situação passe a ser *Visitante* ou *Convidado* (a situação atribuída a quem se cadastra sozinho).
- **Doação · Criada** -- por exemplo, adicionar uma contribuição de primeira vez ou de valor alto a um fluxo de agradecimento (filtrando por valor, fundo ou forma de pagamento).
- **Grupo · Membro entrou** / **Grupo · Criado**.
- **Formulário · Enviado** -- adiciona qualquer pessoa que envie um formulário escolhido (ótimo para um card de "Sou novo" ou "Conecte-se").

### Gatilhos de agenda {#schedule-triggers}

Executam de forma recorrente — diária, semanal, mensal ou anualmente — com base em um conjunto de condições. Use-os para ações de contato baseadas em datas, como *todas as pessoas cujo aniversário é hoje* (Data de nascimento · Dia do mês = **Hoje**, com o mês correspondendo a **Mês atual**) ou um check-in *mensal*. Mesmo sem **Apenas uma vez por pessoa**, um gatilho de agenda não adiciona a mesma pessoa novamente dentro de um mesmo período de repetição (um dia, semana, mês ou ano, conforme a frequência com que ele é executado).

Para qualquer gatilho, você também pode definir:

- A **Etapa inicial** em que o novo card cai (o padrão é a primeira etapa).
- **Apenas uma vez por pessoa** -- para que a mesma pessoa não seja adicionada duas vezes ao fluxo pelo gatilho. Com isso ativado, quem já tem um card neste fluxo é ignorado.
  - **Adicionar novamente após o card ser fechado** -- aparece quando **Apenas uma vez por pessoa** está ativado. Marque para permitir que o gatilho adicione a pessoa novamente depois que o card anterior dela neste fluxo for fechado. Uma pessoa nunca terá dois cards abertos no fluxo ao mesmo tempo. Use isso para situações que podem acontecer mais de uma vez, como um visitante que retorna ou um processo anual.
- **Ativo** -- liga ou desliga o gatilho sem excluí-lo.

:::tip
Combine um gatilho **Formulário · Enviado** com o modelo **Acompanhamento de novo visitante** para transformar seu formulário "Cartão de conexão" ou "Sou novo" em um funil de acompanhamento automático.
:::

## Confirmações de escala de serviço {#serving-assignment-confirmations}

Um tipo especial de fluxo de trabalho pode acompanhar [solicitações de serviço](./plans.md#assigning-team-members) até que cada voluntário aceite ou recuse. Em vez de pessoas, cada card deste quadro acompanha **uma escala** — uma pessoa em uma posição em um plano. Duas funções ou dois cultos para a mesma pessoa geram cards separados. Isso é opcional: nada muda para um plano até que você selecione um fluxo de confirmação nas configurações dele.

### Configurando um {#setting-one-up}

1. Na página Fluxos de trabalho, clique em **Adicionar fluxo de trabalho** e escolha o modelo **Confirmação de escala de serviço**. (Ou comece com um **Fluxo de trabalho em branco** e defina sua **Finalidade do fluxo de trabalho** como **Confirmação de escala de serviço**.) Criar a partir do modelo exige permissão para enviar SMS, já que inclui uma etapa de SMS.
2. Revise as etapas. O modelo começa com:
   - **Enviar solicitação e aguardar resposta** -- envia a solicitação de serviço por e-mail e por SMS, aguarda 2 dias, envia um e-mail de lembrete, aguarda mais 1 dia e então avança o card automaticamente.
   - **Ligar para o voluntário sobre a solicitação sem resposta** -- uma etapa para que uma pessoa ligue ao voluntário, com vencimento em 1 dia. Defina um **Responsável padrão** nesta etapa. Se não houver nenhum, o card vai para o líder do ministério ou, se não houver líder, para a equipe do ministério.
3. Edite as esperas, as mensagens e as etapas para se adequar à sua igreja.
4. Abra as [configurações de um plano](./plans.md#plan-settings) e escolha este fluxo de trabalho em **Fluxo de confirmação**.

Estes fluxos de trabalho usam uma ação **Enviar solicitação de serviço** em vez de **Enviar e-mail** e **Enviar SMS**. Escolha **E-mail** ou **Mensagem de texto** e, opcionalmente, escreva uma **Mensagem da solicitação**. A solicitação sempre inclui a função, o plano, a data do culto e um link para responder; você pode usar `{{planName}}`, `{{positionName}}` e `{{serviceDate}}` na sua mensagem. Deixe a mensagem vazia para usar a solicitação padrão. As preferências de notificação dos voluntários, o consentimento para SMS, o seu provedor de SMS e a aprovação de e-mail da sua igreja se aplicam, e qualquer tentativa ignorada ou bloqueada é registrada no card. **Enviar e-mail**, **Enviar SMS** e **Adicionar ao fluxo de trabalho** não estão disponíveis nestes quadros.

A aba **Gatilhos** de um fluxo de confirmação explica como os cards são iniciados, em vez de oferecer gatilhos, e esses fluxos de trabalho não aparecem nas listas **Adicionar ao fluxo de trabalho** das pessoas. O quadro não tem o botão **Adicionar card**, já que os cards só são criados a partir de solicitações de serviço de um plano.

### Como os cards são iniciados e fechados {#how-cards-are-started-and-closed}

- Os cards são iniciados quando você **Notifica** os voluntários de um plano publicado (veja [Notificando os voluntários](./plan-validation.md#notifying-volunteers)). Cada nova escala sem resposta gera um card. Salvar, publicar, copiar ou preencher automaticamente um plano não contata ninguém por conta própria, e planos em análise não enviam nada.
- Os voluntários continuam recebendo o alerta habitual no aplicativo. O acompanhamento por e-mail e SMS vem do fluxo de trabalho.
- Quando o voluntário **aceita ou recusa**, o card é fechado automaticamente, junto com quaisquer tarefas de acompanhamento vinculadas a ele.
- O painel do card mostra a posição, a data do culto e um link para o plano. Em vez de **Concluir**, o botão diz **Registrar acompanhamento feito**. Clicar nele registra que alguém fez o acompanhamento, mas o card continua aberto e atribuído (exibido como **Aguardando resposta**) até que o voluntário responda ou o prazo de resposta expire.
- O prazo de resposta é o fim do último horário de culto em que a equipe da posição serve. Se o plano não tiver horários correspondentes, é o fim do dia do culto. Se ninguém tiver respondido até então, o card é fechado com **Prazo de resposta expirado** e uma tarefa **Revisar solicitação de serviço sem resposta** é enviada ao responsável atual do card ou ao líder do ministério, para que alguém decida como cobrir a vaga. A escala permanece **Não confirmada**.
- Remover a escala, alterar a pessoa, a posição ou a data do plano, devolver o plano para análise ou trocar o plano para um fluxo de confirmação diferente fecha o card. Um card fechado nunca é reaberto por outra **Notificação**; adicione uma nova escala para enviar uma nova solicitação.

:::info
Para as solicitações enviadas por um fluxo de confirmação, os [lembretes aos voluntários](./plans.md#volunteer-reminders) são enviados somente aos voluntários que **aceitaram**, para que quem está aguardando resposta não receba lembretes além dos acompanhamentos do fluxo de trabalho.
:::

## Meus cards {#my-cards}

Voluntários e membros da equipe não precisam procurar em todos os quadros para encontrar o próprio trabalho. A lista **Meus cards** na página **Meu trabalho** mostra todos os cards atribuídos ao usuário atual, em todos os fluxos de trabalho. Para chegar lá, clique em **Meus cards** no topo da página Fluxos de trabalho, ou abra **Servindo > Meu trabalho** no Menu de atalhos. Clicar em um card abre o painel de detalhes diretamente na página Meu trabalho, onde você pode trabalhar no card ou removê-lo sem sair da página. Se você puder visualizar fluxos de trabalho, o painel também tem um link **Abrir quadro do fluxo de trabalho** para o quadro ao qual o card pertence.

## Relatórios {#reports}

Abra um fluxo de trabalho e clique em **Relatórios** para ver as análises desse fluxo:

- **Atrasados** -- a quantidade de cards que passaram da data de vencimento.
- **Cards por etapa** -- quantos cards estão atualmente em cada etapa, exibidos em um gráfico de colunas.
- **Concluídos (30 dias)** -- a produtividade dos últimos 30 dias, exibida em um gráfico de linhas.

Use-os para identificar gargalos — por exemplo, uma etapa em que os cards se acumulam e nunca avançam.

## Artigos relacionados {#related-articles}

- [Tarefas](./tasks.md) -- os itens de ação individuais nos quais os cards de fluxo de trabalho se baseiam
- [Formulários](../forms/index.md) -- crie os formulários que podem disparar fluxos de trabalho
- [Grupos](../groups/index.md) -- os grupos nos quais uma ação "Adicionar ao grupo" pode colocar pessoas
- [Planos de culto](./plans.md) -- escolha um fluxo de confirmação para as solicitações de serviço de um plano
- [Funções e permissões](../settings/roles-permissions.md) -- controle quem pode visualizar, editar e gerenciar fluxos de trabalho
