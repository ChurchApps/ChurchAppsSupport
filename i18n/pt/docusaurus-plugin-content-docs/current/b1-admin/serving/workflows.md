---
title: "Fluxos de trabalho"
description: "Crie quadros Kanban no B1 Admin para acompanhar pessoas por etapas, com e-mails, mensagens e gatilhos automáticos que incluem pessoas sozinhas."
---

# Fluxos de trabalho

<div class="article-intro">

Os fluxos de trabalho levam pessoas por uma série de etapas em um quadro visual. Cada pessoa se torna um cartão que avança de uma etapa para a seguinte — desde o acompanhamento de um visitante de primeira vez, passando por um processo de filiação, até um agradecimento a quem doou pela primeira vez, e qualquer outra situação em que você precise acompanhar muitas pessoas pelas mesmas fases. Uma etapa pode pedir que um voluntário faça algo (ligar, ter uma conversa) **e** executar ações automáticas por conta própria — enviar um e-mail ou texto, esperar alguns dias, adicionar a pessoa a um grupo —, de modo que os fluxos de trabalho cuidam tanto do acompanhamento humano quanto do trabalho operacional ao redor dele. Os fluxos de trabalho estendem as [Tarefas](./tasks.md) para um quadro Kanban de arrastar e soltar, para que ninguém e nada fique esquecido.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Certifique-se de que as pessoas que você quer acompanhar existem no B1 Admin
- Familiarize-se com o funcionamento das [Tarefas](./tasks.md), pois cada cartão de um quadro é uma tarefa
- Para usar a ação **Enviar e-mail**, crie primeiro os modelos de e-mail que deseja enviar (gerenciados em **Configurações → Modelos de e-mail**)
- Para usar a ação **Enviar texto**, conecte primeiro um [provedor de SMS](../settings/church-settings.md#texting)
- Você precisará da permissão de Tarefas adequada. Visualizar, editar cartões e gerenciar fluxos de trabalho são níveis de permissão separados (veja [Funções e permissões](../settings/roles-permissions.md))

</div>

## Visualizando fluxos de trabalho

Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Atendimento** e clique em **Fluxos de trabalho**. Seus fluxos de trabalho são listados em uma tabela que mostra a **Categoria** e a **Situação** de cada um (**Ativo** ou **Inativo**). Se você usar categorias, as abas acima da lista permitem filtrá-la por categoria. Clique em qualquer fluxo de trabalho para abrir o seu quadro.

## Criando um fluxo de trabalho

1. Na página Fluxos de trabalho, clique em **Adicionar fluxo de trabalho**.
2. Escolha como começar:
   - **Fluxo de trabalho em branco** -- comece do zero e crie suas próprias etapas.
   - **A partir de um modelo** -- comece com um conjunto pronto de etapas que você pode editar. Os modelos integrados incluem:
     - **Acompanhamento de novo visitante** -- Enviar e-mail de boas-vindas → Ligação pessoal → Convidar para a próxima etapa → Conectado
     - **Aula de filiação** -- Manifestar interesse → Inscrever-se na aula → Frequentar a aula → Concluir a filiação
     - **Agradecimento a quem doou pela primeira vez** -- Enviar bilhete de agradecimento → Compartilhar o impacto da oferta → Mordomia
     - **Confirmação de atendimento** -- Solicitar e aguardar resposta → Ligar para o voluntário sobre a solicitação sem resposta (veja [Confirmações de atendimento](#serving-assignment-confirmations))

   Montar as etapas de um modelo pode levar um momento. Enquanto isso acontece, o botão **Adicionar fluxo de trabalho** mostra **Criando...** e não pode ser clicado novamente, para que você não acabe com um duplicado. Se algo der errado, a página mostra *"Não foi possível criar o fluxo de trabalho. Tente novamente."*
3. Dê ao fluxo de trabalho um **Nome**.
4. Opcionalmente, atribua uma **Categoria** para agrupar fluxos de trabalho relacionados. Você pode criar uma nova categoria diretamente pela lista suspensa.
   Para um fluxo de trabalho em branco, você também escolhe a sua **Finalidade do fluxo de trabalho**: **Acompanhamento de pessoas** (o tipo habitual) ou **Confirmação de atendimento**. A finalidade não pode ser alterada depois que o fluxo de trabalho for criado.
5. Mantenha o fluxo de trabalho **Ativo** para que pessoas possam ser adicionadas a ele, ou defina-o como **Inativo** para ocultá-lo das listas de adição a fluxos de trabalho.
6. Clique em **Salvar**.

:::tip
Use o botão **Duplicar** na lista de Fluxos de trabalho para copiar um fluxo de trabalho existente — incluindo suas etapas, ações automáticas e roteamento — como ponto de partida para um novo.
:::

## Montando o quadro com etapas

Cada quadro de fluxo de trabalho é composto por **etapas**, exibidas como colunas da esquerda para a direita. Abra um fluxo de trabalho e use **Adicionar etapa** para criar cada fase do seu processo.

Ao adicionar ou editar uma etapa, você pode configurar:

- **Nome da etapa** -- o título da coluna (por exemplo, "Ligação de boas-vindas" ou "Aguardando inscrição").
- **Vence em (dias)** -- define automaticamente uma data de vencimento quando um cartão entra nesta etapa. Cartões além da data de vencimento são sinalizados como **Atrasado**.
- **Responsável padrão** -- a pessoa ou o grupo ao qual os novos cartões desta etapa são atribuídos automaticamente. Quando o responsável padrão é uma pessoa, ela recebe uma notificação de que um cartão lhe foi atribuído.
- **Ações automáticas** -- coisas que o sistema faz por conta própria quando um cartão chega (veja abaixo).
- **Roteamento** -- para onde o cartão vai quando sai da etapa (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).

Arraste as colunas de etapa para a ordem que corresponde ao seu processo. A ordem também define o caminho padrão que um cartão segue quando nenhum outro roteamento se aplica.

:::info
Salve primeiro uma nova etapa. As ações automáticas e o roteamento são vinculados à etapa, então o editor libera essas seções depois que a etapa existe.
:::

## Ações automáticas

Toda etapa pode ter uma lista de **ações automáticas** que rodam sozinhas no momento em que um cartão **entra** na etapa — antes que alguém mexa nele. É assim que uma etapa, ao mesmo tempo, orienta um voluntário *e* cuida do trabalho rotineiro em torno do acompanhamento.

No editor da etapa, abra **Ações automáticas**, clique em **Adicionar ação**, escolha um tipo e preencha suas configurações. Adicione quantas precisar; elas são executadas **de cima para baixo, em ordem**. Clique em **Salvar** na etapa para salvar a etapa e todas as suas ações juntas. Remover uma ação com o ícone de lixeira tem efeito imediato.

| Ação | O que faz |
|---|---|
| **Enviar e-mail** | Envia à pessoa um modelo de e-mail que você escolher. Você pode substituir o assunto. |
| **Enviar texto** | Envia à pessoa uma mensagem que você escreve, pelo [provedor de SMS](../settings/church-settings.md#texting) da sua igreja. |
| **Aguardar** | Pausa o cartão por um número de dias antes de continuar (veja abaixo). |
| **Adicionar ao grupo** | Adiciona a pessoa a um [grupo](../groups/index.md) que você escolher. |
| **Remover do grupo** | Remove a pessoa de um grupo que você escolher. |
| **Registrar presença** | Marca a pessoa como presente no horário de culto em andamento de um grupo (veja abaixo). |
| **Adicionar a fluxo de trabalho** | Inicia a pessoa em outro fluxo de trabalho — útil para repassar entre processos. |
| **Adicionar nota** | Registra uma nota no histórico do cartão. |
| **Definir campo** | Atualiza um campo do registro da pessoa: Situação de membro, Estado civil, Gênero, Cidade, Estado ou CEP. |
| **Webhook** | Envia os detalhes do cartão para um endereço web externo (URL) que você fornece, para conectar a outros sistemas. |
| **Criar tarefa** | Cria uma [tarefa](./tasks.md) com o título e a descrição que você informar, atribuída a quem você escolher. |
| **Notificar pessoa** | Envia a um membro da equipe ou voluntário que você escolher um e-mail e uma notificação do B1 sobre o cartão (veja abaixo). |

Depois que todas as ações de uma etapa terminam, o cartão **fica nessa etapa** para que alguém possa trabalhá-lo — a menos que a etapa tenha uma rota automática que o leve adiante (veja [Etapas totalmente automatizadas](#fully-automated-steps)).

:::info
As ações automáticas só são executadas quando um cartão chega pelo fluxo normal — quando é adicionado pela primeira vez, quando um resultado ou uma rota automática o traz, ou depois que uma Espera termina. Elas **não** são reexecutadas quando um membro da equipe arrasta manualmente um cartão para a etapa ou o devolve, então uma pessoa não receberá o mesmo e-mail duas vezes.
:::

### Enviando e-mail

Escolha **Enviar e-mail**, selecione um dos seus modelos de e-mail e, opcionalmente, digite um assunto personalizado. Quando um cartão entra na etapa, a pessoa recebe esse e-mail automaticamente. (Se a pessoa não tiver endereço de e-mail cadastrado, a etapa simplesmente pula esta ação.) Os [campos de mesclagem](../settings/email-templates.md#merge-fields) do modelo, como `{{firstName}}`, são preenchidos com os dados da própria pessoa.

Quando o e-mail é enviado, o histórico do cartão registra **E-mail enviado**. Se ele não puder ser enviado — por exemplo, porque o e-mail da sua igreja ainda não foi aprovado ou porque o limite diário foi atingido —, nenhuma entrada de "E-mail enviado" é adicionada.

:::info
Os e-mails de fluxos de trabalho só são enviados depois que a sua igreja for aprovada para enviar e-mails de grupo, e eles contam no limite diário de e-mails da sua igreja. Veja [Ativando o e-mail de grupo para sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church). A ação **Enviar e-mail** avisa no editor da etapa quando esses e-mails não serão enviados: *"O e-mail da sua igreja ainda não foi aprovado..."* se a aprovação ainda estiver pendente, ou *"O e-mail da sua igreja está pausado..."* se mensagens recentes foram devolvidas ou denunciadas como spam.
:::

### Registrando presença

Escolha **Registrar presença** e clique em **Escolher grupo** para selecionar o grupo cuja presença deve ser registrada. Quando a ação é executada, a pessoa é marcada como presente no horário de culto em andamento desse grupo — exatamente como se tivesse feito check-in. Isso é útil com um gatilho que adiciona pessoas ao fluxo de trabalho conforme elas chegam, para que sejam contadas sem um check-in separado.

- A presença é medida no momento em que o cartão foi **criado**, então uma **Espera** anterior no fluxo de trabalho não o empurra para depois do culto.
- Só contam horários de culto que tenham dia e horário de início. Se nenhum dos horários de culto do grupo estiver em andamento naquele momento, nada é registrado e o histórico do cartão anota **Nenhum culto agendado em andamento — presença não registrada**.
- Quando a presença é registrada, o histórico do cartão mostra **Presença registrada** seguido do nome do grupo. Executar a ação novamente para o mesmo culto não conta a pessoa duas vezes.

### Notificando uma pessoa

Escolha **Notificar pessoa**, clique em **Escolher pessoa** e, opcionalmente, digite uma **Mensagem**. Quando um cartão entra na etapa, essa pessoa recebe um e-mail e uma notificação do B1 com o nome da pessoa do cartão, os nomes do fluxo de trabalho e da etapa, a sua mensagem e um link para abrir o cartão. Use para avisar um membro da equipe ou líder de ministério — por exemplo, *"Avisar o pastor quando alguém chegar à etapa Entrevista de filiação"*. O histórico do cartão registra **Notificado** seguido do nome da pessoa.

### Enviando texto {#sending-a-text}

Escolha **Enviar texto** e digite a **Mensagem de texto** (até 1.600 caracteres). Quando um cartão entra na etapa, a pessoa recebe esse texto no celular. Para personalizar a mensagem, clique em um chip abaixo da caixa de mensagem — **Primeiro nome**, **Sobrenome**, **Nome de exibição** ou **Nome da igreja** — para inserir `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}` na posição do cursor. Cada um é preenchido com os dados da pessoa quando o texto é enviado.

- Se a pessoa não tiver celular cadastrado, nenhum texto é enviado e o histórico do cartão registra **Texto ignorado: sem celular**.
- Se a pessoa tiver cancelado a inscrição, nenhum texto é enviado e o histórico do cartão registra **Texto ignorado: inscrição cancelada**.
- Quando o texto é enviado, o histórico do cartão registra **Texto enviado**. Se o envio falhar — por exemplo, porque nenhum provedor de SMS está conectado ou a sua igreja ficou sem créditos de SMS —, a falha é registrada no histórico do cartão e as ações restantes da etapa continuam sendo executadas.

:::warning
Os textos são enviados pelo [provedor de SMS](../settings/church-settings.md#texting) da sua própria igreja. Se nenhum provedor estiver conectado, o editor de ações avisa *"Nenhum provedor de SMS está configurado"* e os textos não serão enviados.
:::

### Esperando alguns dias (sequências de envio programado)

A ação **Aguardar** mantém um cartão pelo número de dias que você definir. Enquanto espera, o cartão aparece como **Adiado**. O B1 verifica as esperas concluídas a cada 30 minutos, então um cartão volta a andar em até meia hora depois que a espera termina. Quando a espera acaba:

1. Quaisquer **ações restantes na mesma etapa** são executadas — assim você pode montar um envio programado como **Enviar e-mail → Aguardar 3 dias → Enviar um e-mail de lembrete**.
2. Depois, se a etapa tiver uma rota automática, o cartão avança; caso contrário, ele fica na etapa para que uma pessoa o assuma.

:::tip
Uma **Espera** no início de uma etapa é uma forma simples de "segurar" um cartão antes que ele chegue a um voluntário — por exemplo, *Aguardar 7 dias, depois um coordenador entra em contato*.
:::

## Adicionando pessoas como cartões

Há várias formas de colocar pessoas em um quadro:

- **A partir do quadro** -- Clique em **Adicionar cartão** na parte inferior de uma coluna de etapa e escolha uma pessoa. Você também pode escolher um grupo, e cada membro desse grupo é adicionado como um cartão.
- **A partir do registro de uma pessoa** -- Use **Adicionar ao fluxo de trabalho** na página de uma pessoa para incluí-la em um fluxo de trabalho.
- **A partir da busca de Pessoas** -- Selecione várias pessoas e use a ação em massa **Adicionar ao fluxo de trabalho** para adicionar todas de uma vez.
- **Automaticamente com um gatilho** -- Adicione pessoas quando algo acontece, como um envio de formulário ou uma primeira oferta (veja [Gatilhos](#triggers) abaixo).

Adicionar alguém manualmente, ou com uma ação de etapa **Adicionar a fluxo de trabalho**, nunca dá a essa pessoa um segundo cartão aberto no mesmo fluxo de trabalho. Se ela já tiver um cartão aberto, será ignorada (em uma adição em massa, somente as pessoas sem cartão recebem um novo). Depois que o cartão for fechado, você pode adicioná-la novamente. Os gatilhos seguem a própria configuração **Somente uma vez por pessoa**.

## Trabalhando no quadro {#working-the-board}

Abra um fluxo de trabalho para ver o seu quadro. Cada cartão mostra o nome da pessoa, a quem ele está atribuído e um selo de vencimento ou situação (**Atrasado** ou **Adiado**). Uma coluna de etapa também mostra pequenos selos para as ações automáticas que ela executa e anotações para o seu roteamento, dando um mapa rápido de como os cartões circulam.

- **Mover um cartão** -- Arraste um cartão de uma coluna para a seguinte conforme a pessoa avança.
- **Abrir um cartão** -- Clique duas vezes em um cartão (ou clique nele) para abrir a gaveta de detalhes, onde você pode mudar a etapa, reatribuí-lo, adicionar notas e rever o que já aconteceu.

Na gaveta do cartão você pode:

- **Atribuir** o cartão a outra pessoa ou grupo.
- **Adiar** o cartão por 1 dia, 3 dias ou 1 semana para ocultar temporariamente a data de vencimento.
- **Devolver** para a etapa anterior ou **Pular** para a próxima etapa.
- **Fixar responsável** -- mantém o mesmo responsável no cartão mesmo quando ele passa de uma etapa para outra. Por padrão, ao mover um cartão para uma nova etapa, ele é reatribuído ao responsável padrão daquela etapa; fixar mantém a pessoa atual responsável do começo ao fim.
- **Concluir** o cartão para finalizá-lo, ou escolher um botão de **Resultado** se a etapa tiver resultados configurados (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).
- **Remover cartão** -- tira um cartão do quadro sem concluí-lo, por exemplo quando alguém foi adicionado por engano. Depois que você confirma, o cartão é fechado e retirado da lista de todos. Nenhum resultado, rota ou ação de etapa é executado, e o histórico é mantido com um registro de **Removido**. Para um cartão de [confirmação de atendimento](#serving-assignment-confirmations), removê-lo fecha a solicitação da mesma forma.
- **Adicionar notas** e revisar a **Atividade** do cartão -- um registro das ações automáticas que já foram executadas (e-mails enviados, esperas etc.), cada uma com a data e a hora em que aconteceu.

Para um cartão sobre uma pessoa, a gaveta também mostra o celular e o e-mail dessa pessoa como links que você pode tocar para ligar ou enviar e-mail, além de um link **Ver perfil** se você tiver permissão para ver pessoas. A pessoa a quem o cartão está atribuído vê o celular e o e-mail mesmo sem acesso a Pessoas.

As notas são salvas com o cartão. Qualquer pessoa que possa abrir o cartão — incluindo a pessoa ou o grupo a quem ele está atribuído — pode ler as notas e adicionar as suas. Quem não pode abrir o cartão não vê as notas dele.

### Ações em massa

Marque as caixas de vários cartões para agir sobre eles em conjunto. Para selecionar todos os cartões de uma etapa de uma só vez, marque a caixa **Selecionar tudo** no cabeçalho da coluna da etapa; marque-a novamente para desmarcar. Aparece uma barra de ferramentas que permite **Concluir**, **Adiar**, **Atribuir** (reatribuir) ou **Mover para…** outra etapa para todos os cartões selecionados de uma vez.

## Roteando cartões com resultados e condições {#routing-cards-with-outcomes-and-conditions}

O roteamento controla para onde um cartão vai quando sai de uma etapa. Abra o editor de uma etapa para configurar dois tipos de roteamento.

### Botões de resultado

Os resultados são botões exibidos na gaveta do cartão quando você está concluindo um cartão naquela etapa. Em vez de um único botão **Concluir**, você pode oferecer escolhas como "Entrou em um grupo" ou "Sem interesse". Cada resultado pode:

- Enviar o cartão para **outra etapa** deste fluxo de trabalho,
- **Passar o cartão** para um fluxo de trabalho diferente, ou
- **Fechar** o cartão.

Isso permite que uma única decisão encaminhe a pessoa por caminhos diferentes.

### Roteamento automático (condicional)

As rotas automáticas movem um cartão adiante **no momento em que ele entra em uma etapa** (e depois que suas ações automáticas terminam), sem que ninguém clique, se a pessoa atender a um conjunto de condições. Adicione uma rota, escolha a etapa de destino e defina uma ou mais **condições** (por exemplo, o campus, a idade ou a situação de membro da pessoa). Campos de texto podem ser comparados exatamente ou com **contém**, **começa com** ou **termina com**. Uma rota sem condições se aplica a todos.

As condições de data (Data de hoje, Data de nascimento ou Aniversário de casamento) podem comparar a data completa ou apenas parte dela — o dia da semana, o **Dia do mês**, o **Mês** ou os anos decorridos. Para a Data de nascimento ou o Aniversário de casamento de uma pessoa, **Dia do mês** oferece a opção relativa **Hoje**, de modo que uma condição como *Data de nascimento · Dia do mês = Hoje* se aplica às pessoas cujo aniversário cai no dia de hoje. **Mês** oferece **Mês anterior**, **Mês atual** e **Próximo mês**. Valores relativos como estes são calculados com o fuso horário da sua igreja, para que coincidam com o dia do calendário da sua igreja, e não com o do servidor.

O grupo de condições **Doações** tem **Doador regular que parou**, que encontra pessoas que costumavam doar com regularidade e depois pararam. Defina três números: *Doou em pelo menos* **3** *das últimas* **12** *semanas, e nada nas últimas* **3** *semanas* (esses são os padrões). As semanas são contadas a partir de hoje, no fuso horário da sua igreja, e uma oferta reembolsada não conta. É mais útil em um [gatilho de agendamento](#schedule-triggers) — por exemplo, uma regra semanal que adiciona os doadores que pararam a um quadro de acompanhamento pastoral. A condição olha apenas as datas das ofertas, nunca os valores, e cartões e alertas nunca mostram valores. Como revela quem parou de doar, somente pessoas que podem ver as doações veem essa opção e podem adicioná-la, alterá-la ou removê-la.

Se as condições de uma rota não puderem ser verificadas por algum motivo, essa rota é considerada não correspondente. O cartão permanece na etapa (ou segue outra rota que corresponda), em vez de ficar travado.

:::info
No quadro, cada coluna de etapa mostra pequenas anotações descrevendo o seu roteamento — por exemplo, o nome de um resultado ou "se corresponder" seguido de uma seta para a etapa ou o fluxo de trabalho de destino.
:::

## Etapas totalmente automatizadas {#fully-automated-steps}

Você pode fazer com que uma etapa rode totalmente por conta própria, sem que ninguém a trabalhe. Dê à etapa as suas **ações automáticas** e adicione uma **rota automática** (sem condições) apontando para a próxima etapa. Quando um cartão entra, as ações são executadas e, em seguida, a rota o avança imediatamente — o cartão passa direto.

:::tip
Combine isso com **Aguardar**: *Enviar e-mail de boas-vindas → Aguardar 3 dias → avançar automaticamente para a etapa "Ligação pessoal"*. O e-mail e o tempo são cuidados para você, e um voluntário só vê o cartão quando chega a hora do contato humano.
:::

## Gatilhos {#triggers}

Os gatilhos adicionam pessoas a um fluxo de trabalho automaticamente quando algo acontece, para que você nunca precise adicionar cartões manualmente. Em um quadro de fluxo de trabalho, clique na aba **Gatilhos** e depois em **Adicionar gatilho**. Há dois tipos:

### Gatilhos de evento

São disparados assim que um registro muda no B1. Escolha o evento e, opcionalmente, adicione **condições** para que somente as pessoas correspondentes sejam adicionadas:

- **Pessoa · Criada / Atualizada** -- por exemplo, adicionar qualquer pessoa cuja situação se torne *Visitante* ou *Convidado* (a situação dada a quem se cadastra sozinho).
- **Doação · Criada** -- por exemplo, adicionar uma oferta de primeira vez ou de valor alto a um fluxo de agradecimento (filtre por valor, fundo ou forma de pagamento).
- **Grupo · Membro entrou** / **Grupo · Criado**.
- **Formulário · Enviado** -- adiciona qualquer pessoa que envie um formulário escolhido (ótimo para um cartão "Sou novo" ou "Conectar").

### Gatilhos de agendamento {#schedule-triggers}

São executados de forma recorrente — diariamente, semanalmente, mensalmente ou anualmente — de acordo com um conjunto de condições. Use-os para ações de alcance baseadas em tempo, como *todas as pessoas cujo aniversário é hoje* (Data de nascimento · Dia do mês = **Hoje**, com o mês correspondendo a **Mês atual**) ou um check-in *mensal*. Mesmo sem **Somente uma vez por pessoa**, um gatilho de agendamento não adiciona a mesma pessoa novamente dentro de um mesmo período de repetição (um dia, semana, mês ou ano, conforme a frequência com que ele roda).

Para qualquer gatilho você também pode definir:

- A **Etapa inicial** em que o novo cartão cai (o padrão é a primeira etapa).
- **Somente uma vez por pessoa** -- para que a mesma pessoa não seja adicionada duas vezes ao fluxo de trabalho pelo gatilho. Com esta opção ativada, quem já tiver um cartão neste fluxo de trabalho é ignorado.
  - **Adicionar novamente depois que o cartão for fechado** -- aparece quando **Somente uma vez por pessoa** está ativado. Marque-o para que o gatilho possa adicionar alguém novamente depois que o cartão anterior dessa pessoa neste fluxo de trabalho for fechado. Uma pessoa nunca terá dois cartões abertos no fluxo de trabalho ao mesmo tempo. Use isso para coisas que podem acontecer mais de uma vez, como um visitante que retorna ou um processo anual.
- **Ativo** -- liga ou desliga o gatilho sem excluí-lo.

:::tip
Combine um gatilho **Formulário · Enviado** com o modelo **Acompanhamento de novo visitante** para transformar seu formulário "Cartão de conexão" ou "Sou novo" em um funil automático de acompanhamento.
:::

## Confirmações de atendimento {#serving-assignment-confirmations}

Um tipo especial de fluxo de trabalho pode acompanhar as [solicitações de atendimento](./plans.md#assigning-team-members) até que cada voluntário aceite ou recuse. Em vez de pessoas, cada cartão deste quadro acompanha **uma atribuição** — uma pessoa em uma posição de um plano. Duas funções ou dois cultos para a mesma pessoa geram cartões separados. É uma opção voluntária: nada muda para um plano até que você selecione um fluxo de trabalho de confirmação nas configurações dele.

### Configurando um

1. Na página Fluxos de trabalho, clique em **Adicionar fluxo de trabalho** e escolha o modelo **Confirmação de atendimento**. (Ou comece com um **Fluxo de trabalho em branco** e defina a sua **Finalidade do fluxo de trabalho** como **Confirmação de atendimento**.) Criar a partir do modelo exige permissão para enviar textos, pois ele inclui uma etapa de texto.
2. Revise as etapas. O modelo começa com:
   - **Solicitar e aguardar resposta** -- envia a solicitação de atendimento por e-mail e por texto, aguarda 2 dias, envia um e-mail de lembrete, aguarda mais 1 dia e então move o cartão automaticamente.
   - **Ligar para o voluntário sobre a solicitação sem resposta** -- uma etapa para uma pessoa ligar para o voluntário, com vencimento em 1 dia. Defina um **Responsável padrão** nesta etapa. Se não houver um, o cartão vai para o líder do ministério, ou para a equipe do ministério caso não haja líder.
3. Edite as esperas, as mensagens e as etapas para se adequar à sua igreja.
4. Abra as [configurações de um plano](./plans.md#plan-settings) e escolha este fluxo de trabalho em **Fluxo de confirmação**.

Estes fluxos de trabalho usam uma ação **Enviar solicitação de atendimento** em vez de **Enviar e-mail** e **Enviar texto**. Escolha **E-mail** ou **Mensagem de texto** e, opcionalmente, escreva uma **Mensagem da solicitação**. A solicitação sempre inclui a função, o plano, a data do culto e um link para responder; você pode usar `{{planName}}`, `{{positionName}}` e `{{serviceDate}}` na sua mensagem. Deixe a mensagem vazia para usar a solicitação padrão. As preferências de notificação dos voluntários, a adesão a textos, o seu provedor de SMS e a aprovação de e-mail da sua igreja se aplicam, e qualquer tentativa ignorada ou bloqueada é registrada no cartão. **Enviar e-mail**, **Enviar texto** e **Adicionar a fluxo de trabalho** não estão disponíveis nestes quadros.

A aba **Gatilhos** de um fluxo de trabalho de confirmação explica como os cartões são iniciados, em vez de oferecer gatilhos, e estes fluxos de trabalho não aparecem nas listas **Adicionar a fluxo de trabalho** das pessoas.

### Como os cartões são iniciados e fechados

- Os cartões começam quando você **Notifica** os voluntários de um plano publicado (veja [Notificando voluntários](./plan-validation.md#notifying-volunteers)). Cada atribuição nova e sem resposta recebe um cartão. Salvar, publicar, copiar ou preencher automaticamente um plano não contata ninguém por conta própria, e planos reservados não enviam nada.
- Os voluntários continuam recebendo o alerta habitual no aplicativo. O acompanhamento por e-mail e texto vem do fluxo de trabalho.
- Quando o voluntário **aceita ou recusa**, o cartão dele é fechado automaticamente, junto com quaisquer tarefas de acompanhamento vinculadas a ele.
- A gaveta do cartão mostra a posição, a data do culto e um link para o plano. Em vez de **Concluir**, o botão diz **Registrar acompanhamento feito**. Clicar nele registra que alguém fez o acompanhamento, mas o cartão continua aberto e atribuído (exibido como **Aguardando resposta**) até que o voluntário responda ou o prazo de resposta passe.
- O prazo de resposta é o fim do último horário de culto em que a equipe da posição atua. Se o plano não tiver horários correspondentes, é o fim do dia do culto. Se ninguém tiver respondido até então, o cartão é fechado com **Prazo de resposta vencido** e uma tarefa **Revisar solicitação de atendimento sem resposta** vai para o responsável atual do cartão ou para o líder do ministério, para que alguém decida como cobrir a vaga. A atribuição permanece **Não confirmada**.
- Remover a atribuição, alterar a pessoa, a posição ou a data do plano, voltar o plano para reservado ou trocar o plano para outro fluxo de confirmação fecha o cartão. Um cartão fechado nunca é reaberto por outra **Notificação**; adicione uma nova atribuição para enviar uma nova solicitação.

:::info
Para as solicitações enviadas por meio de um fluxo de confirmação, os [lembretes para voluntários](./plans.md#volunteer-reminders) são enviados somente aos voluntários que **aceitaram**, para que pessoas que aguardam resposta não recebam lembretes somados aos acompanhamentos do fluxo de trabalho.
:::

## Meus cartões

Voluntários e membros da equipe não precisam vasculhar cada quadro para encontrar o seu trabalho. A lista **Meus cartões**, na página **Meu trabalho**, mostra todos os cartões atribuídos ao usuário atual em todos os fluxos de trabalho. Para chegar lá, clique em **Meus cartões** no topo da página Fluxos de trabalho, ou abra **Atendimento > Meu trabalho** no menu Jump. Clicar em um cartão abre o seu painel de detalhes na própria página Meu trabalho, onde você pode trabalhar no cartão ou removê-lo sem sair da página. Se você puder ver os fluxos de trabalho, o painel também tem um link **Abrir quadro do fluxo de trabalho** para o quadro ao qual o cartão pertence.

## Relatórios

Abra um fluxo de trabalho e clique em **Relatórios** para ver as análises desse fluxo de trabalho:

- **Atrasados** -- o número de cartões além da data de vencimento.
- **Cartões por etapa** -- quantos cartões estão atualmente em cada etapa, exibidos como um gráfico de colunas.
- **Concluídos (30 dias)** -- a produtividade dos últimos 30 dias, exibida como um gráfico de linhas.

Use-os para identificar gargalos — por exemplo, uma etapa onde os cartões se acumulam e nunca avançam.

## Artigos relacionados

- [Tarefas](./tasks.md) -- os itens de ação individuais sobre os quais os cartões de fluxo de trabalho são construídos
- [Formulários](../forms/index.md) -- crie os formulários que podem disparar fluxos de trabalho
- [Grupos](../groups/index.md) -- os grupos em que uma ação "Adicionar ao grupo" pode colocar pessoas
- [Planos de culto](./plans.md) -- escolha um fluxo de confirmação para as solicitações de atendimento de um plano
- [Funções e permissões](../settings/roles-permissions.md) -- controle quem pode ver, editar e gerenciar fluxos de trabalho
