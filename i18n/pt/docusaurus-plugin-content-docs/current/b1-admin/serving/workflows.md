---
title: "Fluxos de Trabalho"
---

# Fluxos de Trabalho

<div class="article-intro">

Fluxos de trabalho movem pessoas por uma série de etapas em um quadro visual. Cada pessoa se torna um cartão que avança de uma etapa para a seguinte, desde o acompanhamento de um visitante que vem pela primeira vez, passando por um processo de membresia, até o agradecimento a um primeiro doador, e qualquer outra situação em que você precise acompanhar muitas pessoas pelas mesmas fases. Uma etapa pode pedir que um voluntário faça algo (ligar, ter uma conversa) **e** executar ações automatizadas por conta própria, como enviar um e-mail ou uma mensagem de texto, aguardar alguns dias ou adicionar a pessoa a um grupo. Assim, os Fluxos de Trabalho cuidam tanto do acompanhamento humano quanto das tarefas repetitivas ao redor dele. Os Fluxos de Trabalho estendem as [Tarefas](./tasks.md) para um quadro Kanban de arrastar e soltar, para que ninguém se perca pelo caminho.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Certifique-se de que as pessoas que você quer acompanhar existem no B1 Admin
- Familiarize-se com o funcionamento das [Tarefas](./tasks.md), já que cada cartão em um quadro é uma tarefa
- Para usar a ação **Enviar e-mail**, crie primeiro os modelos de e-mail que deseja enviar (gerenciados em **Configurações → Modelos de E-mail**)
- Para usar a ação **Enviar mensagem de texto**, conecte primeiro um [provedor de mensagens de texto](../settings/church-settings.md#texting)
- Você precisará da permissão de Tarefas adequada. Visualizar, editar cartões e gerenciar fluxos são níveis de permissão separados (veja [Funções e Permissões](../settings/roles-permissions.md))

</div>

## Visualizando os fluxos de trabalho

Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin), expanda **Serviço** e clique em **Fluxos de Trabalho**. Seus fluxos são listados em uma tabela que mostra a **Categoria** e o **Status** de cada um (**Ativo** ou **Inativo**). Se você usa categorias, as abas acima da lista permitem filtrá-la por categoria. Clique em qualquer fluxo para abrir o seu quadro.

## Criando um fluxo de trabalho

1. Na página Fluxos de Trabalho, clique em **Adicionar Fluxo de Trabalho**.
2. Escolha como começar:
   - **Fluxo em branco**: comece do zero e monte suas próprias etapas.
   - **A partir de um modelo**: comece com um conjunto pronto de etapas que você pode editar. Os modelos integrados incluem:
     - **Acompanhamento de Novo Visitante**: Enviar e-mail de boas-vindas → Ligação pessoal → Convidar para o próximo passo → Conectado
     - **Aula de Membresia**: Demonstrar interesse → Inscrever-se na aula → Participar da aula → Concluir a membresia
     - **Agradecimento a Primeiro Doador**: Enviar bilhete de agradecimento → Compartilhar o impacto da oferta → Mordomia
     - **Confirmação de Atribuição de Serviço**: Solicitar e aguardar resposta → Ligar para o voluntário sobre a solicitação sem resposta (veja [Confirmações de Atribuição de Serviço](#serving-assignment-confirmations))

   Montar as etapas de um modelo pode levar alguns instantes. Enquanto isso acontece, o botão **Adicionar Fluxo de Trabalho** mostra **Criando...** e não pode ser clicado novamente, para que você não acabe com um duplicado. Se algo der errado, a página mostra *"Não foi possível criar o fluxo de trabalho. Tente novamente."*
3. Dê um **Nome** ao fluxo de trabalho.
4. Opcionalmente, atribua uma **Categoria** para agrupar fluxos relacionados. Você pode criar uma nova categoria diretamente pela lista suspensa.
   Para um fluxo em branco, você também escolhe sua **Finalidade do fluxo**: **Acompanhamento de pessoas** (o tipo habitual) ou **Confirmação de atribuição de serviço**. A finalidade não pode ser alterada depois que o fluxo é criado.
5. Mantenha o fluxo de trabalho **Ativo** para que pessoas possam ser adicionadas a ele, ou defina-o como **Inativo** para ocultá-lo das listas de adição a fluxos.
6. Clique em **Salvar**.

:::tip
Use o botão **Duplicar** na lista de Fluxos de Trabalho para copiar um fluxo existente, incluindo suas etapas, ações automatizadas e roteamento, como ponto de partida para um novo.
:::

## Montando o quadro com etapas

Cada quadro de fluxo de trabalho é formado por **etapas**, exibidas como colunas da esquerda para a direita. Abra um fluxo de trabalho e use **Adicionar Etapa** para criar cada fase do seu processo.

Ao adicionar ou editar uma etapa, você pode configurar:

- **Nome da Etapa**: o título da coluna (por exemplo, "Ligação de Boas-vindas" ou "Aguardando Inscrição").
- **Vence em (dias)**: define automaticamente uma data de vencimento quando um cartão entra nesta etapa. Cartões com a data vencida são marcados como **Atrasado**.
- **Responsável padrão**: a pessoa ou grupo ao qual os novos cartões desta etapa são atribuídos automaticamente. Quando o responsável padrão é uma pessoa, ela recebe uma notificação de que um cartão foi atribuído a ela.
- **Ações automatizadas**: tarefas que o sistema executa por conta própria quando um cartão chega (veja abaixo).
- **Roteamento**: para onde o cartão vai quando sai da etapa (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).

Arraste as colunas das etapas para a ordem que corresponde ao seu processo. A ordem também define o caminho padrão que um cartão percorre quando nenhuma outra regra de roteamento se aplica.

:::info
Salve primeiro uma nova etapa. As ações automatizadas e o roteamento são vinculados à etapa, então o editor libera essas seções assim que a etapa existe.
:::

## Ações automatizadas

Toda etapa pode ter uma lista de **ações automatizadas** que são executadas sozinhas no momento em que um cartão **entra** na etapa, antes que alguém o toque. É assim que uma etapa tanto orienta um voluntário quanto cuida do trabalho rotineiro em volta do acompanhamento.

No editor da etapa, abra **Ações automatizadas**, clique em **Adicionar Ação**, escolha um tipo e preencha suas configurações. Adicione quantas precisar; elas são executadas **de cima para baixo, em ordem**. Clique em **Salvar** na etapa para salvar a etapa e todas as suas ações juntas. Remover uma ação pelo ícone de lixeira tem efeito imediato.

| Ação | O que faz |
|---|---|
| **Enviar e-mail** | Envia à pessoa um modelo de e-mail escolhido por você. Você pode substituir o assunto. |
| **Enviar mensagem de texto** | Envia à pessoa uma mensagem escrita por você, pelo [provedor de mensagens de texto](../settings/church-settings.md#texting) da sua igreja. |
| **Aguardar** | Pausa o cartão por um número de dias antes de continuar (veja abaixo). |
| **Adicionar a grupo** | Adiciona a pessoa a um [grupo](../groups/index.md) escolhido por você. |
| **Remover de grupo** | Remove a pessoa de um grupo escolhido por você. |
| **Registrar presença** | Marca a pessoa como presente no horário de culto do grupo que está em andamento (veja abaixo). |
| **Adicionar a fluxo de trabalho** | Inicia a pessoa em outro fluxo de trabalho, útil para transferir entre processos. |
| **Adicionar nota** | Registra uma nota no histórico do cartão. |
| **Definir campo** | Atualiza um campo no cadastro da pessoa: Status de Membresia, Estado Civil, Gênero, Cidade, Estado ou CEP. |
| **Webhook** | Envia os detalhes do cartão para um endereço web externo (URL) que você fornece, para conectar a outros sistemas. |
| **Criar tarefa** | Cria uma [tarefa](./tasks.md) com o título e a descrição que você informar, atribuída a quem você escolher. |
| **Notificar pessoa** | Envia a um membro da equipe ou voluntário escolhido por você um e-mail e uma notificação do B1 sobre o cartão (veja abaixo). |

Depois que todas as ações de uma etapa terminam, o cartão **permanece naquela etapa** para que uma pessoa possa trabalhá-lo, a menos que a etapa tenha um roteamento automático que o leve adiante (veja [Etapas totalmente automatizadas](#fully-automated-steps)).

:::info
As ações automatizadas são executadas apenas quando um cartão chega pelo fluxo normal: quando é adicionado pela primeira vez, quando um resultado ou uma rota automática o traz, ou depois que uma Espera termina. Elas **não** são executadas novamente quando um membro da equipe arrasta manualmente um cartão para a etapa ou o devolve, então ninguém recebe o mesmo e-mail duas vezes.
:::

### Enviando e-mail

Escolha **Enviar e-mail**, selecione um dos seus modelos de e-mail e, opcionalmente, digite um assunto personalizado. Quando um cartão entra na etapa, a pessoa recebe esse e-mail automaticamente. (Se a pessoa não tiver um endereço de e-mail cadastrado, a etapa simplesmente pula esta ação.) [Campos de mesclagem](../settings/email-templates.md#merge-fields) no modelo, como `{{firstName}}`, são preenchidos com os dados da própria pessoa.

Quando o e-mail é enviado, o histórico do cartão registra **E-mail enviado**. Se não puder ser enviado, por exemplo porque o e-mail da sua igreja ainda não foi aprovado ou porque o limite diário foi atingido, nenhuma entrada de "E-mail enviado" é adicionada.

:::info
Os e-mails de fluxos de trabalho só são enviados depois que a sua igreja for aprovada para enviar e-mails de grupo, e eles contam para o limite diário de e-mails da sua igreja. Veja [Ativando o e-mail de grupo para a sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church). A ação **Enviar e-mail** avisa no editor da etapa quando esses e-mails não serão enviados: *"O e-mail da sua igreja ainda não foi aprovado..."* se a aprovação ainda estiver pendente, ou *"O e-mail da sua igreja está pausado..."* se mensagens recentes voltaram ou foram denunciadas como spam.
:::

### Registrando presença

Escolha **Registrar presença** e clique em **Escolher grupo** para selecionar o grupo cuja presença deve ser registrada. Quando a ação é executada, a pessoa é marcada como presente no horário de culto desse grupo que está em andamento, como se tivesse feito check-in. Isso é útil com um gatilho que adiciona pessoas ao fluxo conforme chegam, para que sejam contadas sem um check-in separado.

- A presença é medida no momento em que o cartão foi **criado**, então uma **Espera** anterior no fluxo não o empurra para depois do culto.
- Somente horários de culto com dia e hora de início são contados. Se nenhum dos horários de culto do grupo estiver em andamento naquele momento, nada é registrado e o histórico do cartão indica **Nenhum culto agendado em andamento: presença não registrada**.
- Quando a presença é registrada, o histórico do cartão mostra **Presença registrada** seguido do nome do grupo. Executar a ação novamente para o mesmo culto não conta a pessoa duas vezes.

### Notificando uma pessoa

Escolha **Notificar pessoa**, clique em **Escolher pessoa** e, opcionalmente, digite uma **Mensagem**. Quando um cartão entra na etapa, essa pessoa recebe um e-mail e uma notificação do B1 com o nome da pessoa no cartão, os nomes do fluxo e da etapa, sua mensagem e um link para abrir o cartão. Use isso para avisar um membro da equipe ou líder de ministério, por exemplo: *"Avisar o pastor quando alguém chegar à etapa Entrevista de Membresia."* O histórico do cartão registra **Notificado** seguido do nome da pessoa.

### Enviando uma mensagem de texto

Escolha **Enviar mensagem de texto** e digite a **Mensagem de texto** (até 1.600 caracteres). Quando um cartão entra na etapa, a pessoa recebe essa mensagem no celular. Você pode personalizar a mensagem com `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`, que são preenchidos com os dados da pessoa quando a mensagem é enviada.

- Se a pessoa não tiver um celular cadastrado, nenhuma mensagem é enviada e o histórico do cartão registra **Mensagem de texto ignorada: sem celular**.
- Se a pessoa tiver cancelado a inscrição, nenhuma mensagem é enviada e o histórico do cartão registra **Mensagem de texto ignorada: cancelou**.
- Quando a mensagem é enviada, o histórico do cartão registra **Mensagem de texto enviada**. Se o envio falhar, por exemplo porque nenhum provedor de mensagens está conectado ou porque sua igreja ficou sem créditos de mensagens, a falha é registrada no histórico do cartão e as demais ações da etapa continuam sendo executadas.

:::warning
As mensagens de texto são enviadas pelo [provedor de mensagens de texto](../settings/church-settings.md#texting) da sua própria igreja. Se nenhum provedor estiver conectado, o editor de ações avisa *"Nenhum provedor de mensagens de texto está configurado"* e as mensagens não serão enviadas.
:::

### Aguardando alguns dias (sequências de envio programado)

A ação **Aguardar** mantém o cartão pelo número de dias que você definir. Enquanto espera, o cartão aparece como **Adiado**. O B1 verifica as esperas concluídas a cada 30 minutos, então um cartão retoma em cerca de meia hora após o fim da espera. Quando a espera termina:

1. Todas as **ações restantes na mesma etapa** são executadas, para que você possa montar uma sequência como **Enviar e-mail → Aguardar 3 dias → Enviar e-mail de lembrete**.
2. Em seguida, se a etapa tiver um roteamento automático, o cartão avança; caso contrário, ele permanece na etapa para que uma pessoa o assuma.

:::tip
Uma **Espera** no início de uma etapa é uma forma simples de "segurar" um cartão antes que ele chegue a um voluntário, por exemplo: *Aguardar 7 dias, depois um coach entra em contato*.
:::

## Adicionando pessoas como cartões

Há várias formas de colocar pessoas em um quadro:

- **A partir do quadro**: clique em **Adicionar Cartão** no final de uma coluna de etapa e escolha uma pessoa. Você também pode escolher um grupo, e cada membro desse grupo é adicionado como um cartão.
- **A partir do cadastro de uma pessoa**: use **Adicionar ao Fluxo de Trabalho** na página de uma pessoa para incluí-la em um fluxo.
- **A partir da busca de Pessoas**: selecione várias pessoas e use a ação em lote **Adicionar ao Fluxo de Trabalho** para adicioná-las todas de uma vez.
- **Automaticamente com um gatilho**: adicione pessoas quando algo acontecer, como o envio de um formulário ou a primeira oferta (veja [Gatilhos](#triggers) abaixo).

## Trabalhando no quadro

Abra um fluxo de trabalho para ver seu quadro. Cada cartão mostra o nome da pessoa, a quem está atribuído e um indicador de data de vencimento ou status (**Atrasado** ou **Adiado**). Uma coluna de etapa também mostra pequenos selos para as ações automatizadas que executa e anotações para o seu roteamento, dando uma visão rápida de como os cartões fluem.

- **Mover um cartão**: arraste um cartão de uma coluna para a seguinte conforme a pessoa avança.
- **Abrir um cartão**: clique duas vezes no cartão (ou clique nele) para abrir a gaveta de detalhes, onde você pode mudar a etapa, reatribuí-lo, adicionar notas e revisar o que já aconteceu.

Na gaveta do cartão você pode:

- **Atribuir** o cartão a outra pessoa ou grupo.
- **Adiar** o cartão por 1 dia, 3 dias ou 1 semana para ocultar temporariamente sua data de vencimento.
- **Devolver** à etapa anterior ou **Pular** para a próxima etapa.
- **Fixar atribuição**: mantém o mesmo responsável pelo cartão mesmo quando ele passa de uma etapa para outra. Por padrão, mover um cartão para uma nova etapa o reatribui ao responsável padrão dessa etapa; fixar mantém a pessoa atual responsável do início ao fim.
- **Concluir** o cartão para finalizá-lo, ou escolher um botão de **Resultado**, se a etapa tiver resultados configurados (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).
- **Adicionar notas** e revisar a **Atividade** do cartão: um registro das ações automatizadas executadas (e-mails enviados, esperas etc.), cada uma com a data e a hora em que aconteceu.

Para um cartão sobre uma pessoa, a gaveta também mostra o celular e o e-mail dessa pessoa como links, nos quais você pode tocar para ligar ou enviar um e-mail, além de um link **Ver perfil**, se você tiver permissão para visualizar pessoas. A pessoa à qual o cartão está atribuído vê o telefone e o e-mail mesmo sem acesso a Pessoas.

As notas são salvas com o cartão. Qualquer pessoa que possa abrir o cartão, incluindo a pessoa ou o grupo ao qual ele está atribuído, pode ler as notas e adicionar as suas. Quem não pode abrir o cartão não vê suas notas.

### Ações em lote

Marque as caixas de seleção de vários cartões para agir sobre eles em conjunto. Para selecionar todos os cartões de uma etapa de uma vez, marque a caixa **Selecionar tudo** no cabeçalho da coluna da etapa; marque-a novamente para limpar a seleção. Aparece uma barra de ferramentas que permite **Concluir**, **Adiar**, **Atribuir** (reatribuir) ou **Mover para…** outra etapa para todos os cartões selecionados de uma vez.

## Roteamento de cartões com resultados e condições

O roteamento controla para onde um cartão vai quando sai de uma etapa. Abra o editor da etapa para configurar dois tipos de roteamento.

### Botões de resultado

Os resultados são botões exibidos na gaveta do cartão quando você conclui um cartão naquela etapa. Em vez de um único botão **Concluir**, você pode oferecer opções como "Entrou em um Grupo" ou "Sem Interesse". Cada resultado pode:

- Enviar o cartão para **outra etapa** deste fluxo de trabalho,
- **Transferir o cartão** para um fluxo de trabalho diferente, ou
- **Encerrar** o cartão.

Isso permite que uma única decisão encaminhe a pessoa para caminhos diferentes.

### Roteamento automático (condicional)

As rotas automáticas movem um cartão adiante **no momento em que ele entra em uma etapa** (e depois que suas ações automatizadas terminam), sem que ninguém clique, se a pessoa atender a um conjunto de condições. Adicione uma rota, escolha a etapa de destino e defina uma ou mais **condições** (por exemplo, o campus, a idade ou a situação de membresia da pessoa). Campos de texto podem corresponder exatamente ou com **contém**, **começa com** ou **termina com**. Uma rota sem condições se aplica a todos.

Condições de data (Data de Hoje, Data de Nascimento ou Aniversário de Casamento) podem comparar a data completa ou apenas parte dela: o dia da semana, o **Dia do Mês**, o **Mês** ou os anos decorridos. Para a Data de Nascimento ou o Aniversário de Casamento de uma pessoa, o **Dia do Mês** oferece a opção relativa **Hoje**, de modo que uma condição como *Data de Nascimento · Dia do Mês = Hoje* corresponde a pessoas cujo aniversário cai no dia de hoje. O **Mês** oferece **Mês Anterior**, **Mês Atual** e **Próximo Mês**. Valores relativos como esses são calculados com o fuso horário da sua igreja, para que coincidam com o dia do calendário da igreja e não com o do servidor.

Se as condições de uma rota não puderem ser verificadas por algum motivo, essa rota é considerada como não correspondente. O cartão permanece na etapa (ou segue outra rota que corresponda), em vez de ficar travado.

:::info
No quadro, cada coluna de etapa mostra pequenas anotações descrevendo o seu roteamento, por exemplo, um rótulo de resultado ou "se corresponder" seguido de uma seta para a etapa ou o fluxo de destino.
:::

## Etapas totalmente automatizadas

Você pode fazer uma etapa ser executada totalmente por conta própria, sem que ninguém a trabalhe. Dê à etapa suas **ações automatizadas** e adicione uma **rota automática** (sem condições) apontando para a próxima etapa. Quando um cartão entra, as ações são executadas e, em seguida, a rota o avança imediatamente: o cartão passa direto.

:::tip
Combine isso com **Aguardar**: *Enviar e-mail de boas-vindas → Aguardar 3 dias → avançar automaticamente para a etapa "Ligação pessoal".* O e-mail e o tempo são cuidados para você, e um voluntário só vê o cartão quando chega a hora do contato humano.
:::

## Gatilhos

Os gatilhos adicionam pessoas a um fluxo de trabalho automaticamente quando algo acontece, para que você nunca precise adicionar cartões manualmente. Em um quadro de fluxo de trabalho, clique na aba **Gatilhos** e depois em **Adicionar Gatilho**. Há dois tipos:

### Gatilhos de evento

Disparam assim que um registro é alterado no B1. Escolha o evento e, opcionalmente, adicione **condições** para que apenas pessoas que correspondam sejam adicionadas:

- **Pessoa · Criada / Atualizada**: por exemplo, adicionar qualquer pessoa cujo status passe a *Visitante* ou *Convidado* (o status atribuído a quem se cadastra sozinho).
- **Doação · Criada**: por exemplo, adicionar uma oferta de primeira vez ou de valor alto a um fluxo de agradecimento (com base no valor, no fundo ou no método).
- **Grupo · Membro Entrou** / **Grupo · Criado**.
- **Formulário · Enviado**: adicionar qualquer pessoa que envie um formulário escolhido (ótimo para um cartão "Sou Novo" ou "Conexão").

### Gatilhos de agendamento

Executam de forma recorrente, diariamente, semanalmente, mensalmente ou anualmente, em relação a um conjunto de condições. Use-os para ações de acompanhamento baseadas em tempo, como *todas as pessoas que fazem aniversário hoje* (Data de Nascimento · Dia do Mês = **Hoje**, com o mês correspondendo a **Mês Atual**) ou um acompanhamento *mensal*. Mesmo sem **Apenas uma vez por pessoa**, um gatilho de agendamento não adiciona a mesma pessoa novamente dentro de um mesmo período de repetição (um dia, uma semana, um mês ou um ano, conforme a frequência com que ele é executado).

Para qualquer gatilho, você também pode definir:

- A **Etapa inicial** em que o novo cartão cai (o padrão é a primeira etapa).
- **Apenas uma vez por pessoa**: para que a mesma pessoa não seja adicionada ao fluxo de trabalho duas vezes pelo gatilho. Com essa opção ativada, quem já tem um cartão neste fluxo de trabalho é ignorado.
  - **Adicionar novamente depois que o cartão for encerrado**: aparece quando **Apenas uma vez por pessoa** está ativada. Marque-a para permitir que o gatilho adicione alguém de novo assim que o cartão anterior dessa pessoa neste fluxo for encerrado. Uma pessoa nunca terá dois cartões abertos no fluxo ao mesmo tempo. Use isso para situações que podem acontecer mais de uma vez, como um visitante que retorna ou um processo anual.
- **Ativo**: liga ou desliga o gatilho sem excluí-lo.

:::tip
Combine um gatilho **Formulário · Enviado** com o modelo **Acompanhamento de Novo Visitante** para transformar seu formulário "Cartão de Conexão" ou "Sou Novo" em um funil de acompanhamento automático.
:::

## Confirmações de atribuição de serviço

Um tipo especial de fluxo de trabalho pode acompanhar [solicitações de serviço](./plans.md#assigning-team-members) até que cada voluntário aceite ou recuse. Em vez de pessoas, cada cartão neste quadro acompanha **uma atribuição**: uma pessoa em uma posição em um plano. Duas funções ou dois cultos para a mesma pessoa geram cartões separados. Isso é opcional: nada muda para um plano até que você selecione um fluxo de confirmação nas configurações dele.

### Configurando um fluxo

1. Na página Fluxos de Trabalho, clique em **Adicionar Fluxo de Trabalho** e escolha o modelo **Confirmação de Atribuição de Serviço**. (Ou comece com um **Fluxo em branco** e defina sua **Finalidade do fluxo** como **Confirmação de atribuição de serviço**.) Criar a partir do modelo exige permissão para enviar mensagens de texto, pois ele inclui uma etapa de mensagem de texto.
2. Revise as etapas. O modelo começa com:
   - **Solicitar e aguardar resposta**: envia a solicitação de serviço por e-mail e por mensagem de texto, aguarda 2 dias, envia um e-mail de lembrete, aguarda mais 1 dia e então move o cartão automaticamente adiante.
   - **Ligar para o voluntário sobre a solicitação sem resposta**: uma etapa para uma pessoa ligar para o voluntário, com vencimento em 1 dia. Defina um **Responsável padrão** nesta etapa. Se não houver um, o cartão vai para o líder do ministério ou, se não houver líder, para a equipe do ministério.
3. Edite as esperas, as mensagens e as etapas para se adequarem à sua igreja.
4. Abra as [configurações de um plano](./plans.md#plan-settings) e escolha este fluxo em **Fluxo de confirmação**.

Esses fluxos usam a ação **Enviar solicitação de serviço** em vez de **Enviar e-mail** e **Enviar mensagem de texto**. Escolha **E-mail** ou **Mensagem de texto** e, opcionalmente, escreva uma **Mensagem da solicitação**. A solicitação sempre inclui a função, o plano, a data do culto e um link para responder; você pode usar `{{planName}}`, `{{positionName}}` e `{{serviceDate}}` na sua mensagem. Deixe a mensagem vazia para usar a solicitação padrão. As preferências de notificação dos voluntários, o consentimento para mensagens de texto, o seu provedor de mensagens e a aprovação de e-mail da sua igreja se aplicam, e qualquer tentativa ignorada ou bloqueada é registrada no cartão. **Enviar e-mail**, **Enviar mensagem de texto** e **Adicionar a fluxo de trabalho** não estão disponíveis nesses quadros.

A aba **Gatilhos** de um fluxo de confirmação explica como os cartões são iniciados, em vez de oferecer gatilhos, e esses fluxos não aparecem nas listas **Adicionar a Fluxo de Trabalho** das pessoas.

### Como os cartões são iniciados e encerrados

- Os cartões começam quando você **Notifica** os voluntários em um plano publicado (veja [Notificando voluntários](./plan-validation.md#notifying-volunteers)). Cada atribuição nova e sem resposta gera um cartão. Salvar, publicar, copiar ou preencher automaticamente um plano não contata ninguém por conta própria, e planos em modo lápis não enviam nada.
- Os voluntários continuam recebendo o alerta habitual no aplicativo. O acompanhamento por e-mail e mensagem de texto vem do fluxo de trabalho.
- Quando o voluntário **aceita ou recusa**, o cartão é encerrado automaticamente, junto com quaisquer tarefas de acompanhamento vinculadas a ele.
- A gaveta do cartão mostra a posição, a data do culto e um link para o plano. Em vez de **Concluir**, o botão diz **Registrar acompanhamento feito**. Clicar nele registra que alguém fez o acompanhamento, mas o cartão permanece aberto e atribuído (indicado como **Aguardando resposta**) até que o voluntário responda ou o prazo de resposta passe.
- O prazo de resposta é o fim do último horário de culto em que a equipe da posição serve. Se o plano não tiver horários correspondentes, é o fim do dia do culto. Se ninguém tiver respondido até então, o cartão é encerrado com **Prazo de resposta vencido** e uma tarefa **Revisar solicitação de serviço sem resposta** é enviada ao responsável atual do cartão ou ao líder do ministério, para que alguém decida como cobrir a vaga. A atribuição permanece **Não confirmada**.
- Remover a atribuição, alterar a pessoa, a posição ou a data do plano, voltar o plano para o modo lápis ou trocar o plano para outro fluxo de confirmação encerra o cartão. Um cartão encerrado nunca é reaberto por outra **Notificação**; adicione uma nova atribuição para enviar uma nova solicitação.

:::info
Para as solicitações enviadas por meio de um fluxo de confirmação, os [lembretes para voluntários](./plans.md#volunteer-reminders) são enviados somente aos voluntários que **aceitaram**, para que as pessoas que aguardam resposta não recebam lembretes além dos acompanhamentos do fluxo.
:::

## Meus Cartões

Voluntários e membros da equipe não precisam procurar em todos os quadros para encontrar o seu trabalho. A lista **Meus Cartões**, na página **Meu Trabalho**, mostra todos os cartões atribuídos ao usuário atual em todos os fluxos de trabalho. Para chegar lá, clique em **Meus Cartões** no topo da página Fluxos de Trabalho ou abra **Serviço > Meu Trabalho** no menu Jump. Clicar em um cartão abre o quadro ao qual ele pertence.

## Relatórios

Abra um fluxo de trabalho e clique em **Relatórios** para ver as análises desse fluxo:

- **Atrasados**: o número de cartões que passaram da data de vencimento.
- **Cartões por Etapa**: quantos cartões estão atualmente em cada etapa, exibidos como um gráfico de colunas.
- **Concluídos (30 dias)**: a vazão nos últimos 30 dias, exibida como um gráfico de linhas.

Use esses dados para identificar gargalos, por exemplo, uma etapa onde os cartões se acumulam e nunca avançam.

## Artigos relacionados

- [Tarefas](./tasks.md): as ações individuais em que os cartões dos fluxos de trabalho são construídos
- [Formulários](../forms/index.md): crie os formulários que podem disparar fluxos de trabalho
- [Grupos](../groups/index.md): os grupos aos quais uma ação "Adicionar a grupo" pode incluir pessoas
- [Planos de Serviço](./plans.md): escolha um fluxo de confirmação para as solicitações de serviço de um plano
- [Funções e Permissões](../settings/roles-permissions.md): controle quem pode visualizar, editar e gerenciar fluxos de trabalho
