---
title: "Fluxos de Trabalho"
---

# Fluxos de Trabalho

<div class="article-intro">

Os Fluxos de Trabalho movem pessoas através de uma série de etapas em um painel visual. Cada pessoa se torna um cartão que viaja de uma etapa para a próxima -- desde um acompanhamento de primeiro visitante, até um processo de associação, até um agradecimento de primeiro doador, e qualquer outra coisa em que você precise acompanhar muitas pessoas através do mesmo conjunto de estágios. Uma etapa pode pedir a um voluntário para fazer algo (fazer uma ligação, ter uma conversa) **e** executar ações automatizadas por conta própria -- enviar um email ou texto, aguardar alguns dias, adicionar a pessoa a um grupo -- para que os Fluxos de Trabalho lidem tanto com o acompanhamento humano quanto com o trabalho rotineiro em torno disso. Os Fluxos de Trabalho estendem [Tarefas](./tasks.md) em um painel Kanban de arrastar e soltar para que nada e ninguém caia pelas rachaduras.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as pessoas que você deseja acompanhar existem no B1 Admin
- Familiarize-se com o funcionamento das [Tarefas](./tasks.md), pois cada cartão em um painel é uma tarefa
- Para usar a ação **Enviar email**, crie primeiro os modelos de email que você deseja enviar (gerenciados em **Mensagens → Gerenciar Modelos**)
- Para usar a ação **Enviar texto**, conecte primeiro um [provedor de mensagens de texto](../settings/church-settings.md#texting)
- Você precisará da permissão apropriada de Tarefas. Visualizar, editar cartões e gerenciar fluxos de trabalho são níveis de permissão separados (consulte [Funções e Permissões](../settings/roles-permissions.md))

</div>

## Visualizando Fluxos de Trabalho

Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Serving** (Serviço), e clique em **Workflows** (Fluxos de Trabalho). Você verá seus fluxos de trabalho listados e agrupados por categoria, com fluxos de trabalho ativos destacados. Clique em qualquer fluxo de trabalho para abrir seu painel.

## Criando um Fluxo de Trabalho

1. Na página Fluxos de Trabalho, clique em **Add Workflow** (Adicionar Fluxo de Trabalho).
2. Escolha como começar:
   - **Blank workflow** (Fluxo de trabalho em branco) -- comece do zero e crie suas próprias etapas.
   - **From a template** (De um modelo) -- comece com um conjunto pronto de etapas que você pode editar. Os modelos integrados incluem:
     - **New Visitor Follow-up** (Acompanhamento de Novo Visitante) -- Enviar email de boas-vindas → Ligação telefônica pessoal → Convidar para próxima etapa → Conectado
     - **Membership Class** (Classe de Associação) -- Expressar interesse → Registre-se para classe → Frequente a aula → Conclusão da associação
     - **First-time Giver Thank-you** (Agradecimento de Primeiro Doador) -- Enviar nota de agradecimento → Compartilhar impacto de doação → Administrado
3. Dê ao fluxo de trabalho um **Name** (Nome).
4. Opcionalmente, atribua uma **Category** (Categoria) para agrupar fluxos de trabalho relacionados. Você pode criar uma nova categoria diretamente no menu suspenso.
5. Deixe o fluxo de trabalho **Active** (Ativo) para que as pessoas possam ser adicionadas a ele, ou defina-o como **Inactive** (Inativo) para ocultá-lo das listas de adicionar ao fluxo de trabalho.
6. Clique em **Save** (Salvar).

:::tip
Use o botão **Duplicate** (Duplicar) na lista Fluxos de Trabalho para copiar um fluxo de trabalho existente -- incluindo suas etapas, ações automatizadas e roteamento -- como ponto de partida para um novo.
:::

## Construindo o Painel com Etapas

Cada painel de fluxo de trabalho é composto por **steps** (etapas), mostradas como colunas da esquerda para a direita. Abra um fluxo de trabalho e use **Add Step** (Adicionar Etapa) para criar cada estágio do seu processo.

Quando você adiciona ou edita uma etapa, você pode configurar:

- **Step Name** (Nome da Etapa) -- o cabeçalho da coluna (por exemplo, "Welcome Call" (Ligação de Boas-vindas) ou "Awaiting Registration" (Aguardando Registro)).
- **Due in (days)** (Prazo em dias) -- define automaticamente uma data de vencimento quando um cartão entra nesta etapa. Cartões após sua data de vencimento são sinalizados como **Overdue** (Vencido).
- **Default assignee** (Responsável padrão) -- a pessoa ou grupo que os novos cartões nesta etapa são atribuídos automaticamente.
- **Automated actions** (Ações automatizadas) -- coisas que o sistema faz por conta própria quando um cartão chega (veja abaixo).
- **Routing** (Roteamento) -- para onde o cartão vai quando sai da etapa (consulte [Roteamento](#routing-cards-with-outcomes-and-conditions)).

Arraste as colunas de etapas para a ordem que corresponde ao seu processo. A ordem também define o caminho padrão que um cartão segue quando nenhum outro roteamento se aplica.

:::info
Salve uma nova etapa primeiro. Ações automatizadas e roteamento se vinculam à etapa, portanto o editor desbloqueia essas seções uma vez que a etapa existe.
:::

## Ações Automatizadas

Cada etapa pode realizar uma lista de **automated actions** (ações automatizadas) que são executadas por conta própria no momento em que um cartão **entra** na etapa -- antes que alguém o toque. É assim que uma etapa promove um voluntário *e* cuida do trabalho rotineiro ao redor do acompanhamento.

No editor de etapas, abra **Automated actions** (Ações Automatizadas), clique em **Add Action** (Adicionar Ação), escolha um tipo, preencha suas configurações e clique no ícone de salvar nessa ação. Adicione quantas precisar; elas executam **de cima para baixo em ordem**.

| Action (Ação) | What it does (O que faz) |
|---|---|
| **Send email** (Enviar email) | Envia um modelo de email que você escolhe para a pessoa. Você pode substituir a linha de assunto. |
| **Send text** (Enviar texto) | Envia um texto para a pessoa, através do [provedor de mensagens de texto](../settings/church-settings.md#texting) de sua igreja. |
| **Wait** (Aguardar) | Pausa o cartão por um número de dias antes de continuar (veja abaixo). |
| **Add to group** (Adicionar ao grupo) | Adiciona a pessoa a um [grupo](../groups/index.md) que você escolhe. |
| **Remove from group** (Remover do grupo) | Remove a pessoa de um grupo que você escolhe. |
| **Add to workflow** (Adicionar ao fluxo de trabalho) | Inicia a pessoa em outro fluxo de trabalho -- útil para transferir entre processos. |
| **Add note** (Adicionar nota) | Registra uma nota no histórico do cartão. |
| **Set field** (Definir campo) | Atualiza um campo no registro da pessoa: Status de Associação, Estado Civil, Gênero, Cidade, Estado ou CEP. |
| **Webhook** (Webhook) | Envia os detalhes do cartão para um endereço web externo (URL) que você fornece, para conectar a outros sistemas. |
| **Create task** (Criar tarefa) | Cria uma [tarefa](./tasks.md) com o título e descrição que você digita, atribuída a quem você escolher. |

Depois que todas as ações de uma etapa terminam, o cartão **repousa nessa etapa** para que uma pessoa possa trabalhar com ele -- a menos que a etapa tenha uma rota automática que o mova adiante (consulte [Etapas Totalmente Automatizadas](#fully-automated-steps)).

:::info
Ações automatizadas são executadas apenas quando um cartão chega através do fluxo normal -- quando é adicionado pela primeira vez, quando um resultado ou rota automática o traz, ou após uma Espera terminar. Elas **não** são re-executadas quando um membro da equipe arrasta manualmente um cartão para a etapa ou o envia de volta, portanto uma pessoa não receberá o mesmo email duas vezes.
:::

### Enviando email

Escolha **Send email** (Enviar email), escolha um dos seus modelos de email e opcionalmente digite um assunto personalizado. Quando um cartão entra na etapa, a pessoa recebe esse email automaticamente. (Se a pessoa não tiver um endereço de email em arquivo, a etapa simplesmente pula essa ação.) [Campos de mesclagem](../settings/email-templates.md#merge-fields) no modelo, como `{{firstName}}`, são preenchidos com os detalhes da própria pessoa.

:::info
Emails de fluxo de trabalho saem apenas depois que sua igreja foi aprovada para enviar email em grupo, e contam para o limite de email diário de sua igreja. Consulte [Ativando Email em Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Enviando um texto

Escolha **Send Text** (Enviar Texto) e digite a **Text message** (Mensagem de Texto) (até 1.600 caracteres). Quando um cartão entra na etapa, a pessoa recebe esse texto no seu telefone celular. Você pode personalizar a mensagem com `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`, que são preenchidos com os detalhes da pessoa quando o texto é enviado.

- Se a pessoa não tiver um telefone celular em arquivo, a ação é ignorada.
- Se a pessoa optou por não receber, nenhum texto é enviado e o histórico do cartão registra **Text skipped: opted out** (Texto ignorado: optou por não receber).
- Quando o texto sai, o histórico do cartão registra **Text sent** (Texto enviado). Se o envio falhar -- por exemplo, porque nenhum provedor de mensagens de texto está conectado ou sua igreja está sem créditos de mensagens de texto -- a falha é registrada no histórico do cartão e as ações restantes da etapa ainda são executadas.

:::warning
Os textos são enviados através do [provedor de mensagens de texto](../settings/church-settings.md#texting) de sua igreja. Se nenhum provedor estiver conectado, o editor de ação avisa *"No texting provider is set up"* (Nenhum provedor de mensagens de texto está configurado) e os textos não serão enviados.
:::

### Aguardando alguns dias (sequências de gotejamento)

A ação **Wait** (Aguardar) mantém um cartão pelo número de dias que você define. Enquanto aguarda, o cartão é exibido como **Snoozed** (Suspenso). Quando a espera termina:

1. Qualquer **ação restante na mesma etapa** é executada -- para que você possa construir um gotejamento como **Enviar email → Aguardar 3 dias → Enviar um email de lembrete**.
2. Então, se a etapa tiver uma rota automática, o cartão se move adiante; caso contrário, repousa na etapa para que uma pessoa o pegue.

:::tip
Uma **Wait** (Espera) no início de uma etapa é uma forma simples de "reter" um cartão antes de aparecer a um voluntário -- por exemplo, *Aguardar 7 dias, depois um técnico chega*.
:::

## Adicionando Pessoas como Cartões

Existem várias maneiras de colocar pessoas em um painel:

- **From the board** (Do painel) -- Clique em **Add Card** (Adicionar Cartão) na parte inferior de uma coluna de etapa e escolha uma pessoa. Você também pode escolher um grupo, e todos os membros desse grupo são adicionados como um cartão.
- **From a person's record** (Do registro de uma pessoa) -- Use **Add to Workflow** (Adicionar ao Fluxo de Trabalho) na página de uma pessoa para colocá-la em um fluxo de trabalho.
- **From People search** (Da pesquisa de Pessoas) -- Selecione várias pessoas e use a ação em massa **Add to Workflow** (Adicionar ao Fluxo de Trabalho) para adicioná-las todas de uma vez.
- **Automatically with a trigger** (Automaticamente com um gatilho) -- Adicione pessoas quando algo acontece, como um envio de formulário ou um primeiro presente (consulte [Gatilhos](#triggers) abaixo).

## Trabalhando o Painel

Abra um fluxo de trabalho para ver seu painel. Cada cartão mostra o nome da pessoa, a quem está atribuído e um chip de data de vencimento ou status (**Overdue** (Vencido) ou **Snoozed** (Suspenso)). Uma coluna de etapa também mostra pequenas crachás para quaisquer ações automatizadas que executa e anotações para seu roteamento, dando-lhe um mapa de um relance de como os cartões fluem.

- **Move a card** (Mova um cartão) -- Arraste um cartão de uma coluna para a próxima conforme a pessoa avança.
- **Open a card** (Abra um cartão) -- Clique duas vezes em um cartão (ou clique nele) para abrir seu painel de detalhes, onde você pode alterar a etapa, reatribuir, adicionar notas e revisar o que já aconteceu.

Na gaveta do cartão você pode:

- **Assign** (Atribuir) o cartão para uma pessoa ou grupo diferente.
- **Snooze** (Suspender) o cartão por 1 dia, 3 dias ou 1 semana para ocultar temporariamente sua data de vencimento.
- **Send Back** (Enviar de Volta) para a etapa anterior ou **Skip** (Pular) para a próxima etapa.
- **Pin assignment** (Atribuição de pino) -- mantenha o mesmo proprietário no cartão enquanto ele se move entre etapas. Por padrão, mover um cartão para uma nova etapa o reatribui ao responsável padrão dessa etapa; o pino mantém a pessoa atual responsável durante todo o período.
- **Complete** (Concluir) o cartão para finalizá-lo, ou escolha um botão **Outcome** (Resultado) se a etapa tiver resultados configurados (consulte [Roteamento](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** (Adicionar notas) e revisar o **history** (histórico) do cartão -- incluindo um registro de ações automatizadas que foram executadas (emails enviados, esperas, etc.).

### Ações em massa

Selecione as caixas de seleção em vários cartões para agir sobre eles juntos. Uma barra de ferramentas aparece permitindo que você **Complete** (Conclua), **Snooze** (Suspenda), **Reassign** (Reatribua) ou **Move** (Mova) todos os cartões selecionados para outra etapa de uma vez.

## Roteando Cartões com Resultados e Condições

O roteamento controla para onde um cartão vai quando sai de uma etapa. Abra o editor de uma etapa para configurar dois tipos de roteamento.

### Botões de resultado

Resultados são botões mostrados na gaveta do cartão quando você está concluindo um cartão nessa etapa. Em vez de um único botão **Complete** (Concluir), você pode oferecer opções como "Joined a Group" (Entrou em um Grupo) ou "Not Interested" (Não Interessado). Cada resultado pode:

- Enviar o cartão para **another step** (outra etapa) neste fluxo de trabalho,
- **Hand the card off** (Passar o cartão) para um fluxo de trabalho totalmente diferente, ou
- **Close** (Fechar) o cartão.

Isso permite que uma decisão ramifique a pessoa em diferentes caminhos.

### Roteamento automático (condicional)

Rotas automáticas movem um cartão adiante **no momento em que ele entra em uma etapa** (e depois que suas ações automatizadas terminam), sem que alguém clique, se a pessoa corresponder a um conjunto de condições. Adicione uma rota, escolha a etapa de destino e defina uma ou mais **conditions** (condições) (por exemplo, campus, idade ou status de associação de uma pessoa). Uma rota sem condições corresponde a todos.

:::info
No painel, cada coluna de etapa mostra pequenas anotações descrevendo seu roteamento -- por exemplo, um rótulo de resultado ou "if matches" (se corresponder) seguido por uma seta para a etapa ou fluxo de trabalho de destino.
:::

## Etapas Totalmente Automatizadas

Você pode fazer uma etapa rodar inteiramente por conta própria, sem ninguém trabalhando nela. Dê à etapa seus **ações automatizadas** e adicione uma **rota automática** (sem condições) apontando para a próxima etapa. Quando um cartão entra, as ações são executadas e então a rota o avança imediatamente -- o cartão passa direto.

:::tip
Combine isso com **Wait** (Espera): *Enviar email de boas-vindas → Aguardar 3 dias → avançar automaticamente para a etapa "Personal call" (Chamada pessoal).* O email e o tempo são tratados para você, e um voluntário apenas vê o cartão quando é hora do toque humano.
:::

## Gatilhos

Gatilhos adicionam pessoas a um fluxo de trabalho automaticamente quando algo acontece, para que você nunca precise adicionar cartões manualmente. Em um painel de fluxo de trabalho, clique na aba **Triggers** (Gatilhos), depois em **Add Trigger** (Adicionar Gatilho). Existem dois tipos:

### Gatilhos de evento

Acionam assim que um registro muda no B1. Escolha o evento e, opcionalmente, adicione **conditions** (condições) para que apenas pessoas correspondentes sejam adicionadas:

- **Person · Created / Updated** (Pessoa · Criada / Atualizada) -- por exemplo, adicione qualquer pessoa cujo status se torne *Visitor* (Visitante).
- **Donation · Created** (Doação · Criada) -- por exemplo, adicione um presente de primeira vez ou grande a um fluxo de trabalho de agradecimento (corresponda em quantidade, fundo ou método).
- **Group · Member Joined** (Grupo · Membro Aderiu) / **Group · Created** (Grupo · Criado).
- **Form · Submitted** (Formulário · Enviado) -- adicione qualquer pessoa que envie um formulário escolhido (ótimo para um cartão "I'm New" (Sou Novo) ou "Connect" (Conectar)).

### Gatilhos de cronograma

Executado regularmente -- diariamente, semanalmente, mensalmente ou anualmente -- em relação a um conjunto de condições. Use-os para um alcance baseado em tempo, como *todos cujo aniversário de associação é hoje* ou uma *verificação mensal*.

Para qualquer gatilho, você também pode definir:

- A **entry step** (etapa de entrada) do novo cartão começa (padrão é a primeira etapa).
- **Once per person** (Uma vez por pessoa) -- para que a mesma pessoa não seja adicionada ao fluxo de trabalho duas vezes pelo gatilho.
- **Active** (Ativo) -- ative ou desative o gatilho sem deletá-lo.

:::tip
Emparelhe um gatilho **Form · Submitted** (Formulário · Enviado) com o modelo **New Visitor Follow-up** (Acompanhamento de Novo Visitante) para transformar seu formulário "Connect Card" (Cartão de Conexão) ou "I'm New" (Sou Novo) em um pipeline de acompanhamento automático.
:::

## Meus Cartões

Voluntários e equipe não precisam procurar em cada painel para encontrar seu trabalho. A página **My Cards** (Meus Cartões) (vinculada da página Fluxos de Trabalho) lista todos os cartões atribuídos ao usuário atual em todos os fluxos de trabalho. Clicar em um cartão abre o painel a que ele pertence.

## Relatórios

Abra um fluxo de trabalho e clique em **Reports** (Relatórios) para ver a análise desse fluxo de trabalho:

- **Overdue** (Vencidos) -- o número de cartões após sua data de vencimento.
- **Cards per Step** (Cartões por Etapa) -- quantos cartões atualmente residem em cada etapa, mostrado como um gráfico de coluna.
- **Completed (30 days)** (Concluído (30 dias)) -- throughput nos últimos 30 dias, mostrado como um gráfico de linhas.

Use-os para identificar gargalos -- por exemplo, uma etapa em que cartões se acumulam e nunca avançam.

## Artigos Relacionados

- [Tasks](./tasks.md) -- os itens de ação individuais em que os cartões de fluxo de trabalho são construídos
- [Forms](../forms/index.md) -- construa os formulários que podem disparar fluxos de trabalho
- [Groups](../groups/index.md) -- os grupos onde uma ação "Add to group" (Adicionar ao grupo) pode colocar pessoas
- [Roles & Permissions](../settings/roles-permissions.md) -- controle quem pode visualizar, editar e gerenciar fluxos de trabalho
