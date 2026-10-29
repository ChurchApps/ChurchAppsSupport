---
title: "Fluxos de Trabalho"
---

# Fluxos de Trabalho

<div class="article-intro">

Os fluxos de trabalho levam pessoas por uma série de etapas em um quadro visual. Cada pessoa se torna um cartão que avança de uma etapa para a seguinte -- desde o acompanhamento de um visitante de primeira vez, passando por um processo de membresia, até o agradecimento a um doador de primeira vez, e qualquer outra situação em que você precise acompanhar muitas pessoas pelas mesmas fases. Uma etapa pode pedir que um voluntário faça algo (ligar, ter uma conversa) **e** executar ações automáticas por conta própria -- enviar um e-mail ou SMS, aguardar alguns dias, adicionar a pessoa a um grupo --, de modo que os fluxos de trabalho cuidam tanto do acompanhamento humano quanto das tarefas repetitivas ao redor dele. Os fluxos de trabalho estendem as [Tarefas](./tasks.md) para um quadro Kanban de arrastar e soltar, para que ninguém fique para trás.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as pessoas que você quer acompanhar existem no B1 Admin
- Familiarize-se com o funcionamento das [Tarefas](./tasks.md), já que cada cartão de um quadro é uma tarefa
- Para usar a ação **Enviar e-mail**, crie primeiro os modelos de e-mail que deseja enviar (gerenciados em **Configurações → Modelos de e-mail**)
- Para usar a ação **Enviar SMS**, conecte primeiro um [provedor de SMS](../settings/church-settings.md#texting)
- Você precisará da permissão adequada de Tarefas. Visualizar, editar cartões e gerenciar fluxos de trabalho são níveis de permissão separados (consulte [Funções e Permissões](../settings/roles-permissions.md))

</div>

## Visualizando Fluxos de Trabalho

Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Serviço** e clique em **Fluxos de trabalho**. Seus fluxos de trabalho aparecem em uma tabela mostrando a **Categoria** e o **Status** de cada um (**Ativo** ou **Inativo**). Se você usa categorias, as abas acima da lista permitem filtrá-la por categoria. Clique em qualquer fluxo de trabalho para abrir o quadro dele.

## Criando um Fluxo de Trabalho

1. Na página Fluxos de trabalho, clique em **Adicionar fluxo de trabalho**.
2. Escolha como começar:
   - **Fluxo de trabalho em branco** -- comece do zero e monte as suas próprias etapas.
   - **A partir de um modelo** -- comece com um conjunto pronto de etapas que você pode editar. Os modelos integrados incluem:
     - **Acompanhamento de Novo Visitante** -- Enviar e-mail de boas-vindas → Ligação telefônica pessoal → Convidar para a próxima etapa → Conectado
     - **Classe de Membresia** -- Demonstrar interesse → Inscrever-se na classe → Participar da classe → Concluir a membresia
     - **Agradecimento ao Primeiro Doador** -- Enviar bilhete de agradecimento → Compartilhar o impacto da contribuição → Mordomo
     - **Confirmação de Escala de Voluntário** -- Enviar solicitação e aguardar resposta → Ligar para o voluntário sobre a solicitação sem resposta (veja [Confirmações de Escala](#serving-assignment-confirmations))

   Montar as etapas de um modelo pode levar um momento. Enquanto isso acontece, o botão **Adicionar fluxo de trabalho** mostra **Criando...** e não pode ser clicado novamente, para que você não acabe com uma duplicata. Se algo der errado, a página mostra *"Não foi possível criar o fluxo de trabalho. Tente novamente."*
3. Dê um **Nome** ao fluxo de trabalho.
4. Opcionalmente, atribua uma **Categoria** para agrupar fluxos de trabalho relacionados. Você pode criar uma nova categoria diretamente pela lista suspensa.
   Para um fluxo de trabalho em branco, você também escolhe a sua **Finalidade do fluxo de trabalho**: **Acompanhamento de pessoas** (o tipo habitual) ou **Confirmação de escala de voluntário**. A finalidade não pode ser alterada depois que o fluxo de trabalho é criado.
5. Deixe o fluxo de trabalho **Ativo** para que as pessoas possam ser adicionadas a ele, ou defina-o como **Inativo** para ocultá-lo das listas de adicionar a fluxo de trabalho.
6. Clique em **Salvar**.

:::tip
Use o botão **Duplicar** na lista de Fluxos de trabalho para copiar um fluxo existente -- incluindo as etapas, as ações automáticas e o roteamento -- como ponto de partida para um novo.
:::

## Montando o Quadro com Etapas

Cada quadro de fluxo de trabalho é formado por **etapas**, exibidas como colunas da esquerda para a direita. Abra um fluxo de trabalho e use **Adicionar etapa** para criar cada fase do seu processo.

Ao adicionar ou editar uma etapa, você pode configurar:

- **Nome da etapa** -- o título da coluna (por exemplo, "Ligação de boas-vindas" ou "Aguardando inscrição").
- **Vencimento em (dias)** -- define automaticamente uma data de vencimento quando um cartão entra nesta etapa. Cartões que passam da data de vencimento são sinalizados como **Atrasado**.
- **Responsável padrão** -- a pessoa ou o grupo a quem os novos cartões desta etapa são atribuídos automaticamente. Quando o responsável padrão é uma pessoa, ela recebe uma notificação de que um cartão lhe foi atribuído.
- **Ações automáticas** -- coisas que o sistema faz por conta própria quando um cartão chega (veja abaixo).
- **Roteamento** -- para onde o cartão vai quando sai da etapa (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).

Arraste as colunas das etapas para a ordem que corresponde ao seu processo. A ordem também define o caminho padrão que um cartão segue quando nenhuma outra regra de roteamento se aplica.

:::info
Salve primeiro uma nova etapa. Ações automáticas e roteamento são vinculados à etapa, então o editor libera essas seções assim que a etapa existe.
:::

## Ações Automáticas

Toda etapa pode ter uma lista de **ações automáticas** que são executadas sozinhas no momento em que um cartão **entra** na etapa -- antes que alguém o toque. É assim que uma etapa tanto orienta um voluntário *quanto* cuida do trabalho rotineiro em torno do acompanhamento.

No editor da etapa, abra **Ações automáticas**, clique em **Adicionar ação**, escolha um tipo e preencha as suas configurações. Adicione quantas precisar; elas são executadas **de cima para baixo, em ordem**. Clique em **Salvar** na etapa para salvar a etapa e todas as suas ações juntas. Remover uma ação com o ícone de lixeira tem efeito imediato.

| Ação | O que faz |
|---|---|
| **Enviar e-mail** | Envia à pessoa um modelo de e-mail que você escolhe. Você pode substituir o assunto. |
| **Enviar SMS** | Envia à pessoa uma mensagem que você escreve, pelo [provedor de SMS](../settings/church-settings.md#texting) da sua igreja. |
| **Aguardar** | Pausa o cartão por um número de dias antes de continuar (veja abaixo). |
| **Adicionar ao grupo** | Adiciona a pessoa a um [grupo](../groups/index.md) que você escolher. |
| **Remover do grupo** | Remove a pessoa de um grupo que você escolher. |
| **Registrar presença** | Marca a pessoa como presente no horário de serviço de um grupo que esteja em andamento (veja abaixo). |
| **Adicionar a fluxo de trabalho** | Inicia a pessoa em outro fluxo de trabalho -- útil para transferir entre processos. |
| **Adicionar anotação** | Registra uma anotação no histórico do cartão. |
| **Definir campo** | Atualiza um campo do registro da pessoa: Status de membro, Estado civil, Gênero, Cidade, Estado ou CEP. |
| **Webhook** | Envia os detalhes do cartão para um endereço web externo (URL) que você informar, para conectar a outros sistemas. |
| **Criar tarefa** | Cria uma [tarefa](./tasks.md) com o título e a descrição que você informar, atribuída a quem você escolher. |
| **Notificar pessoa** | Envia a um membro da equipe ou voluntário que você escolher um e-mail e uma notificação do B1 sobre o cartão (veja abaixo). |

Depois que todas as ações de uma etapa terminam, o cartão **permanece nessa etapa** para que uma pessoa possa trabalhá-lo -- a menos que a etapa tenha uma rota automática que o encaminhe adiante (veja [Etapas totalmente automatizadas](#fully-automated-steps)).

:::info
As ações automáticas só são executadas quando um cartão chega pelo fluxo normal -- quando é adicionado pela primeira vez, quando um resultado ou uma rota automática o traz, ou depois que uma Espera termina. Elas **não** são executadas novamente quando um membro da equipe arrasta manualmente um cartão para a etapa ou o devolve, então ninguém recebe o mesmo e-mail duas vezes.
:::

### Enviando e-mail

Escolha **Enviar e-mail**, selecione um dos seus modelos de e-mail e, opcionalmente, digite um assunto personalizado. Quando um cartão entra na etapa, a pessoa recebe esse e-mail automaticamente. (Se a pessoa não tiver endereço de e-mail cadastrado, a etapa simplesmente pula esta ação.) Os [campos de mesclagem](../settings/email-templates.md#merge-fields) do modelo, como `{{firstName}}`, são preenchidos com os dados da própria pessoa.

Quando o e-mail é enviado, o histórico do cartão registra **E-mail enviado**. Se ele não puder ser enviado -- por exemplo, porque o e-mail da sua igreja ainda não foi aprovado ou porque o limite diário foi atingido --, nenhuma entrada de "E-mail enviado" é adicionada.

:::info
Os e-mails de fluxos de trabalho só são enviados depois que a sua igreja é aprovada para enviar e-mails de grupo, e contam para o limite diário de e-mails da sua igreja. Consulte [Ativando o E-mail de Grupo para a Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church). A ação **Enviar e-mail** avisa no editor da etapa quando esses e-mails não serão enviados: *"O e-mail da sua igreja ainda não foi aprovado..."* se a aprovação ainda estiver pendente, ou *"O e-mail da sua igreja está pausado..."* se mensagens recentes foram devolvidas ou denunciadas como spam.
:::

### Registrando presença

Escolha **Registrar presença** e clique em **Escolher grupo** para selecionar o grupo cuja presença deve ser registrada. Quando a ação é executada, a pessoa é marcada como presente no horário de serviço desse grupo que está em andamento -- exatamente como se tivesse feito check-in. Isso é útil com um gatilho que adiciona pessoas ao fluxo de trabalho conforme elas chegam, para que sejam contadas sem um check-in separado.

- A presença é medida no momento em que o cartão foi **criado**, então uma **Espera** anterior no fluxo de trabalho não o empurra para depois do culto.
- Somente horários de serviço com dia e horário de início são contados. Se nenhum dos horários de serviço do grupo estiver em andamento naquele momento, nada é registrado e o histórico do cartão registra **Nenhum culto programado em andamento -- presença não registrada**.
- Quando a presença é registrada, o histórico do cartão mostra **Presença registrada** seguido do nome do grupo. Executar a ação novamente para o mesmo culto não conta a pessoa duas vezes.

### Notificando uma pessoa

Escolha **Notificar pessoa**, clique em **Escolher pessoa** e, opcionalmente, digite uma **Mensagem**. Quando um cartão entra na etapa, essa pessoa recebe um e-mail e uma notificação do B1 com o nome da pessoa do cartão, os nomes do fluxo de trabalho e da etapa, a sua mensagem e um link para abrir o cartão. Use isso para avisar um membro da equipe ou líder de ministério -- por exemplo, *"Avise o pastor quando alguém chegar à etapa Entrevista de Membresia."* O histórico do cartão registra **Notificado** seguido do nome da pessoa.

### Enviando um SMS

Escolha **Enviar SMS** e digite a **Mensagem de texto** (até 1.600 caracteres). Quando um cartão entra na etapa, a pessoa recebe esse SMS no celular. Para personalizar a mensagem, clique em um chip abaixo da caixa de mensagem -- **Nome**, **Sobrenome**, **Nome de exibição** ou **Nome da igreja** -- para inserir `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}` na posição do cursor. Cada um é preenchido com os dados da pessoa quando o SMS é enviado.

- Se a pessoa não tiver celular cadastrado, nenhum SMS é enviado e o histórico do cartão registra **SMS ignorado: sem celular**.
- Se a pessoa tiver cancelado o recebimento, nenhum SMS é enviado e o histórico do cartão registra **SMS ignorado: recebimento cancelado**.
- Quando o SMS é enviado, o histórico do cartão registra **SMS enviado**. Se o envio falhar -- por exemplo, porque nenhum provedor de SMS está conectado ou sua igreja ficou sem créditos de SMS --, a falha é registrada no histórico do cartão e as demais ações da etapa continuam sendo executadas.

:::warning
Os SMS são enviados pelo [provedor de SMS](../settings/church-settings.md#texting) da sua própria igreja. Se nenhum provedor estiver conectado, o editor de ações avisa *"Nenhum provedor de SMS está configurado"* e os SMS não serão enviados.
:::

### Aguardando alguns dias (sequências de acompanhamento)

A ação **Aguardar** mantém o cartão pelo número de dias que você definir. Enquanto espera, o cartão aparece como **Adiado**. O B1 verifica as esperas concluídas a cada 30 minutos, então um cartão retoma em até meia hora após o fim da espera. Quando a espera termina:

1. Quaisquer **ações restantes na mesma etapa** são executadas -- assim você pode montar um acompanhamento como **Enviar e-mail → Aguardar 3 dias → Enviar um e-mail de lembrete**.
2. Depois, se a etapa tiver uma rota automática, o cartão avança; caso contrário, ele permanece na etapa para que uma pessoa o assuma.

:::tip
Uma **Espera** no início de uma etapa é uma forma simples de "segurar" um cartão antes que ele chegue a um voluntário -- por exemplo, *Aguardar 7 dias, depois um coach entra em contato*.
:::

## Adicionando Pessoas como Cartões

Há várias formas de colocar pessoas em um quadro:

- **Pelo quadro** -- clique em **Adicionar cartão** na parte inferior de uma coluna de etapa e escolha uma pessoa. Você também pode escolher um grupo, e cada membro desse grupo é adicionado como cartão.
- **Pelo registro de uma pessoa** -- use **Adicionar a fluxo de trabalho** na página de uma pessoa para incluí-la em um fluxo de trabalho.
- **Pela busca de Pessoas** -- selecione várias pessoas e use a ação em massa **Adicionar a fluxo de trabalho** para adicioná-las todas de uma vez.
- **Automaticamente com um gatilho** -- adicione pessoas quando algo acontece, como o envio de um formulário ou a primeira contribuição (veja [Gatilhos](#triggers) abaixo).

Adicionar alguém manualmente, ou com a ação de etapa **Adicionar a fluxo de trabalho**, nunca dá a essa pessoa um segundo cartão aberto no mesmo fluxo de trabalho. Se ela já tiver um cartão aberto, é ignorada (em uma adição em massa, somente as pessoas sem cartão recebem um novo). Depois que o cartão dela é fechado, você pode adicioná-la novamente. Os gatilhos seguem a própria configuração **Apenas uma vez por pessoa**.

## Trabalhando no Quadro

Abra um fluxo de trabalho para ver o quadro dele. Cada cartão mostra o nome da pessoa, para quem ele está atribuído e um marcador de data de vencimento ou de status (**Atrasado** ou **Adiado**). Uma coluna de etapa também mostra pequenos selos para qualquer ação automática que ela execute e anotações sobre o roteamento dela, dando um mapa rápido de como os cartões fluem.

- **Mover um cartão** -- arraste um cartão de uma coluna para a seguinte conforme a pessoa avança.
- **Abrir um cartão** -- clique duas vezes em um cartão (ou clique nele) para abrir a gaveta de detalhes, onde você pode alterar a etapa, reatribuí-lo, adicionar anotações e revisar o que já aconteceu.

A partir da gaveta do cartão você pode:

- **Atribuir** o cartão a outra pessoa ou grupo.
- **Adiar** o cartão por 1 dia, 3 dias ou 1 semana para ocultar temporariamente a data de vencimento.
- **Devolver** à etapa anterior ou **Pular** para a próxima etapa.
- **Fixar responsável** -- mantém o mesmo responsável no cartão mesmo quando ele avança entre etapas. Por padrão, mover um cartão para uma nova etapa o reatribui ao responsável padrão dessa etapa; fixar mantém a pessoa atual responsável o tempo todo.
- **Concluir** o cartão para finalizá-lo, ou escolher um botão de **Resultado** se a etapa tiver resultados configurados (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).
- **Remover cartão** -- tira um cartão do quadro sem concluí-lo, por exemplo quando alguém foi adicionado por engano. Depois que você confirma, o cartão é fechado e removido da lista de todos. Nenhum resultado, rota ou ação de etapa é executado, e o histórico é mantido com uma entrada de **Removido**. Para um cartão de [confirmação de escala de voluntário](#serving-assignment-confirmations), removê-lo fecha a solicitação da mesma forma.
- **Adicionar anotações** e revisar a **Atividade** do cartão -- um registro das ações automáticas executadas (e-mails enviados, esperas etc.), cada uma com a data e a hora em que aconteceu.

Para um cartão sobre uma pessoa, a gaveta também mostra o celular e o e-mail dessa pessoa como links que você pode tocar para ligar ou enviar e-mail, além de um link **Ver perfil** se você tiver permissão para visualizar pessoas. A pessoa a quem o cartão está atribuído vê o telefone e o e-mail mesmo sem acesso a Pessoas.

As anotações são salvas com o cartão. Qualquer pessoa que possa abrir o cartão -- inclusive a pessoa ou o grupo a quem ele está atribuído -- pode ler as anotações e adicionar as suas. Quem não pode abrir o cartão não vê as anotações dele.

### Ações em massa

Marque as caixas de seleção de vários cartões para agir sobre eles em conjunto. Para selecionar todos os cartões de uma etapa de uma vez, marque a caixa **Selecionar tudo** no cabeçalho da coluna dessa etapa; marque-a novamente para limpar a seleção. Uma barra de ferramentas aparece permitindo **Concluir**, **Adiar**, **Atribuir** (reatribuir) ou **Mover para…** outra etapa para todos os cartões selecionados de uma vez.

## Roteando Cartões com Resultados e Condições

O roteamento controla para onde um cartão vai quando sai de uma etapa. Abra o editor de uma etapa para configurar dois tipos de roteamento.

### Botões de resultado

Os resultados são botões exibidos na gaveta do cartão quando você está concluindo um cartão naquela etapa. Em vez de um único botão **Concluir**, você pode oferecer opções como "Entrou em um grupo" ou "Sem interesse". Cada resultado pode:

- Enviar o cartão para **outra etapa** deste fluxo de trabalho,
- **Transferir o cartão** para um fluxo de trabalho diferente, ou
- **Fechar** o cartão.

Assim, uma única decisão pode direcionar a pessoa por caminhos diferentes.

### Roteamento automático (condicional)

As rotas automáticas movem um cartão adiante **no momento em que ele entra em uma etapa** (e depois que as ações automáticas terminam), sem que ninguém clique, se a pessoa atender a um conjunto de condições. Adicione uma rota, escolha a etapa de destino e defina uma ou mais **condições** (por exemplo, o campus, a idade ou o status de membro de uma pessoa). Campos de texto podem ser comparados exatamente ou com **contém**, **começa com** ou **termina com**. Uma rota sem condições se aplica a todos.

As condições de data (Data de hoje, Data de nascimento ou Aniversário de casamento) podem comparar a data completa ou apenas uma parte dela -- o dia da semana, o **Dia do mês**, o **Mês** ou os anos decorridos. Para a data de nascimento ou o aniversário de casamento de uma pessoa, **Dia do mês** oferece a opção relativa **Hoje**, então uma condição como *Data de nascimento · Dia do mês = Hoje* corresponde a pessoas cujo aniversário cai no dia do mês de hoje. **Mês** oferece **Mês anterior**, **Mês atual** e **Próximo mês**. Valores relativos como esses são calculados com o fuso horário da sua igreja, então correspondem ao dia do calendário da igreja, e não ao do servidor.

O grupo de condições **Contribuições** tem **Doador regular inativo**, que encontra pessoas que costumavam contribuir com regularidade e depois pararam. Defina três números: *Contribuiu em pelo menos* **3** *das últimas* **12** *semanas, depois nada nas últimas* **3** *semanas* (esses são os padrões). As semanas são contadas a partir de hoje, no fuso horário da sua igreja, e uma contribuição estornada não conta. É mais útil em um [gatilho de agenda](#schedule-triggers) -- por exemplo, uma regra semanal que adiciona doadores inativos a um quadro de acompanhamento pastoral. A condição só analisa as datas das contribuições, nunca os valores, e cartões e alertas nunca mostram valores. Como ela revela quem parou de contribuir, somente pessoas que podem ver doações veem essa opção e podem adicioná-la, alterá-la ou removê-la.

Se as condições de uma rota não puderem ser verificadas por algum motivo, essa rota é considerada não correspondente. O cartão permanece na etapa (ou segue outra rota que corresponda), em vez de ficar travado.

:::info
No quadro, cada coluna de etapa mostra pequenas anotações que descrevem o roteamento dela -- por exemplo, um rótulo de resultado ou "se corresponder" seguido de uma seta para a etapa ou o fluxo de destino.
:::

## Etapas Totalmente Automatizadas

Você pode fazer uma etapa rodar inteiramente sozinha, sem ninguém trabalhando nela. Dê à etapa suas **ações automáticas** e adicione uma **rota automática** (sem condições) apontando para a próxima etapa. Quando um cartão entra, as ações são executadas e, em seguida, a rota o avança imediatamente -- o cartão passa direto.

:::tip
Combine isso com a **Espera**: *Enviar e-mail de boas-vindas → Aguardar 3 dias → avançar automaticamente para a etapa "Ligação pessoal".* O e-mail e o tempo são cuidados para você, e um voluntário só vê o cartão quando chega a hora do contato humano.
:::

## Gatilhos

Os gatilhos adicionam pessoas a um fluxo de trabalho automaticamente quando algo acontece, para que você nunca precise adicionar cartões manualmente. No quadro de um fluxo de trabalho, clique na aba **Gatilhos** e depois em **Adicionar gatilho**. Há dois tipos:

### Gatilhos de evento

Disparam assim que um registro muda no B1. Escolha o evento e, opcionalmente, adicione **condições** para que somente as pessoas correspondentes sejam adicionadas:

- **Pessoa · Criada / Atualizada** -- por exemplo, adicionar qualquer pessoa cujo status passe a ser *Visitante* ou *Convidado* (o status atribuído a pessoas que se cadastram por conta própria).
- **Doação · Criada** -- por exemplo, adicionar uma contribuição de primeira vez ou de valor alto a um fluxo de agradecimento (filtrando por valor, fundo ou método).
- **Grupo · Membro entrou** / **Grupo · Criado**.
- **Formulário · Enviado** -- adiciona qualquer pessoa que envie um formulário escolhido (ótimo para um cartão "Sou Novo" ou "Conexão").

### Gatilhos de agenda

Rodam de forma recorrente -- diariamente, semanalmente, mensalmente ou anualmente -- com base em um conjunto de condições. Use-os para ações de alcance baseadas em tempo, como *todos cujo aniversário é hoje* (Data de nascimento · Dia do mês = **Hoje**, com o mês correspondendo a **Mês atual**) ou um check-in *mensal*. Mesmo sem **Apenas uma vez por pessoa**, um gatilho de agenda não adiciona a mesma pessoa novamente dentro de um mesmo período de repetição (um dia, semana, mês ou ano, conforme a frequência da execução).

Para qualquer gatilho, você também pode definir:

- A **Etapa inicial** em que o novo cartão cai (o padrão é a primeira etapa).
- **Apenas uma vez por pessoa** -- para que a mesma pessoa não seja adicionada duas vezes ao fluxo de trabalho pelo gatilho. Com essa opção ativada, qualquer pessoa que já tenha um cartão nesse fluxo de trabalho é ignorada.
  - **Adicionar novamente depois que o cartão for fechado** -- aparece quando **Apenas uma vez por pessoa** está ativada. Marque para permitir que o gatilho adicione alguém novamente depois que o cartão anterior dela neste fluxo de trabalho for fechado. Uma pessoa ainda nunca tem dois cartões abertos no fluxo ao mesmo tempo. Use isso para coisas que podem acontecer mais de uma vez, como um visitante que retorna ou um processo anual.
- **Ativo** -- liga ou desliga o gatilho sem excluí-lo.

:::tip
Combine um gatilho **Formulário · Enviado** com o modelo **Acompanhamento de Novo Visitante** para transformar o seu formulário "Cartão de Conexão" ou "Sou Novo" em um funil de acompanhamento automático.
:::

## Confirmações de Escala de Voluntários

Um tipo especial de fluxo de trabalho pode acompanhar [solicitações de serviço](./plans.md#assigning-team-members) até que cada voluntário aceite ou recuse. Em vez de pessoas, cada cartão deste quadro acompanha **uma escala** -- uma pessoa em uma posição em um plano. Duas funções ou dois cultos para a mesma pessoa geram cartões separados. Isso é opcional: nada muda para um plano até que você selecione um fluxo de confirmação nas configurações dele.

### Configurando um

1. Na página Fluxos de trabalho, clique em **Adicionar fluxo de trabalho** e escolha o modelo **Confirmação de Escala de Voluntário**. (Ou comece com um **Fluxo de trabalho em branco** e defina a **Finalidade do fluxo de trabalho** como **Confirmação de escala de voluntário**.) Criar a partir do modelo exige permissão para enviar SMS, já que ele inclui uma etapa de SMS.
2. Revise as etapas. O modelo começa com:
   - **Enviar solicitação e aguardar resposta** -- envia a solicitação de serviço por e-mail e por SMS, aguarda 2 dias, envia um e-mail de lembrete, aguarda mais 1 dia e então avança o cartão automaticamente.
   - **Ligar para o voluntário sobre a solicitação sem resposta** -- uma etapa para uma pessoa ligar para o voluntário, com vencimento em 1 dia. Defina um **Responsável padrão** nesta etapa. Se não houver um, o cartão vai para o líder do ministério, ou para a equipe do ministério caso não haja líder.
3. Edite as esperas, mensagens e etapas para se adequar à sua igreja.
4. Abra as [configurações de um plano](./plans.md#plan-settings) e escolha este fluxo de trabalho em **Fluxo de confirmação**.

Esses fluxos usam uma ação **Enviar solicitação de serviço** em vez de **Enviar e-mail** e **Enviar SMS**. Escolha **E-mail** ou **Mensagem de texto** e, opcionalmente, escreva uma **Mensagem da solicitação**. A solicitação sempre inclui a função, o plano, a data do culto e um link para responder; você pode usar `{{planName}}`, `{{positionName}}` e `{{serviceDate}}` na sua mensagem. Deixe a mensagem vazia para usar a solicitação padrão. As preferências de notificação dos voluntários, a permissão para SMS, o seu provedor de SMS e a aprovação de e-mail da sua igreja se aplicam, e qualquer tentativa ignorada ou bloqueada é registrada no cartão. **Enviar e-mail**, **Enviar SMS** e **Adicionar a fluxo de trabalho** não estão disponíveis nesses quadros.

A aba **Gatilhos** de um fluxo de confirmação explica como os cartões são iniciados, em vez de oferecer gatilhos, e esses fluxos não aparecem nas listas de **Adicionar a fluxo de trabalho** para pessoas.

### Como os cartões são iniciados e fechados

- Os cartões começam quando você **Notifica** os voluntários de um plano publicado (veja [Notificando Voluntários](./plan-validation.md#notifying-volunteers)). Cada escala nova e sem resposta gera um cartão. Salvar, publicar, copiar ou preencher automaticamente um plano não contata ninguém por conta própria, e planos em pré-escala não enviam nada.
- Os voluntários continuam recebendo o alerta habitual no aplicativo. O acompanhamento por e-mail e SMS vem do fluxo de trabalho.
- Quando o voluntário **aceita ou recusa**, o cartão dele é fechado automaticamente, junto com quaisquer tarefas de acompanhamento vinculadas a ele.
- A gaveta do cartão mostra a posição, a data do culto e um link para o plano. Em vez de **Concluir**, o botão diz **Registrar acompanhamento feito**. Clicar nele registra que alguém fez o acompanhamento, mas o cartão continua aberto e atribuído (exibido como **Aguardando resposta**) até que o voluntário responda ou o prazo de resposta passe.
- O prazo de resposta é o fim do último horário de serviço em que a equipe da posição atua. Se o plano não tiver horários correspondentes, é o fim do dia do culto. Se ninguém tiver respondido até então, o cartão é fechado com **Prazo de resposta vencido** e uma tarefa **Revisar solicitação de escala sem resposta** vai para o responsável atual do cartão ou para o líder do ministério, para que alguém decida como cobrir a vaga. A escala continua **Não confirmada**.
- Remover a escala, alterar a pessoa, a posição ou a data do plano, voltar o plano para pré-escala ou trocar o plano para outro fluxo de confirmação fecha o cartão. Um cartão fechado nunca é reaberto por outra **Notificação**; adicione uma nova escala para enviar uma nova solicitação.

:::info
Para as solicitações enviadas por um fluxo de confirmação, os [lembretes aos voluntários](./plans.md#volunteer-reminders) são enviados somente aos voluntários que **aceitaram**, para que pessoas aguardando resposta não recebam lembretes além dos acompanhamentos do fluxo de trabalho.
:::

## Meus Cartões

Voluntários e membros da equipe não precisam vasculhar todos os quadros para encontrar o seu trabalho. A lista **Meus Cartões** na página **Meu Trabalho** mostra todos os cartões atribuídos ao usuário atual, em todos os fluxos de trabalho. Para chegar lá, clique em **Meus Cartões** no topo da página Fluxos de trabalho, ou abra **Serviço > Meu Trabalho** no menu Jump. Clicar em um cartão abre o quadro ao qual ele pertence.

## Relatórios

Abra um fluxo de trabalho e clique em **Relatórios** para ver as análises desse fluxo:

- **Atrasados** -- o número de cartões que passaram da data de vencimento.
- **Cartões por etapa** -- quantos cartões estão atualmente em cada etapa, mostrados em um gráfico de colunas.
- **Concluídos (30 dias)** -- a vazão dos últimos 30 dias, mostrada em um gráfico de linhas.

Use-os para identificar gargalos -- por exemplo, uma etapa onde os cartões se acumulam e nunca avançam.

## Artigos Relacionados

- [Tarefas](./tasks.md) -- as ações individuais sobre as quais os cartões dos fluxos de trabalho são construídos
- [Formulários](../forms/index.md) -- crie os formulários que podem disparar fluxos de trabalho
- [Grupos](../groups/index.md) -- os grupos nos quais uma ação "Adicionar ao grupo" pode colocar pessoas
- [Planos de culto](./plans.md) -- escolha um fluxo de confirmação para as solicitações de serviço de um plano
- [Funções e Permissões](../settings/roles-permissions.md) -- controle quem pode visualizar, editar e gerenciar fluxos de trabalho
