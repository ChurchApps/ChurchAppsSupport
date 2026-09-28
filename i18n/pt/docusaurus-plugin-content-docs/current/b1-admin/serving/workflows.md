---
title: "Fluxos de Trabalho"
---

# Fluxos de Trabalho

<div class="article-intro">

Os Fluxos de Trabalho movem pessoas através de uma série de etapas em um quadro visual. Cada pessoa se torna um cartão que viaja de uma etapa para a próxima -- de um acompanhamento de visitante pela primeira vez, para um processo de membro, para um agradecimento ao doador pela primeira vez, e qualquer outra coisa em que você precise rastrear muitas pessoas através do mesmo conjunto de estágios. Uma etapa pode pedir a um voluntário para fazer algo (fazer uma ligação, ter uma conversa) **e** executar ações automatizadas por conta própria -- enviar um email, aguardar alguns dias, adicionar a pessoa a um grupo -- então Fluxos de Trabalho lidam tanto com o acompanhamento humano quanto com o trabalho em torno dele. Fluxos de Trabalho estendem [Tarefas](./tasks.md) em um quadro Kanban de arrastar e soltar para que nada e ninguém caia pelas rachaduras.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as pessoas que você deseja rastrear existem no B1 Admin
- Familiarize-se com como [Tarefas](./tasks.md) funcionam, já que cada cartão em um quadro é uma tarefa
- Para usar a ação **Enviar email**, primeiro crie os modelos de email que você deseja enviar (gerenciados em **Mensagens → Gerenciar Modelos**)
- Você precisará da permissão apropriada de Tarefas. Visualizar, editar cartões e gerenciar fluxos de trabalho são níveis de permissão separados (veja [Funções e Permissões](../settings/roles-permissions.md))

</div>

## Visualizando Fluxos de Trabalho

Navegue até **Servir** e selecione **Fluxos de Trabalho** no menu. Você verá seus fluxos de trabalho listados e agrupados por categoria, com fluxos de trabalho ativos destacados. Clique em qualquer fluxo de trabalho para abrir seu quadro.

## Criando um Fluxo de Trabalho

1. Na página Fluxos de Trabalho, clique em **Adicionar Fluxo de Trabalho**.
2. Escolha como começar:
   - **Fluxo de trabalho em branco** -- comece do zero e construa suas próprias etapas.
   - **A partir de um modelo** -- comece com um conjunto pronto de etapas que você pode editar. Os modelos integrados incluem:
     - **Acompanhamento de Novo Visitante** -- Enviar email de boas-vindas → Chamada telefônica pessoal → Convide para a próxima etapa → Conectado
     - **Classe de Membro** -- Expressar interesse → Registre-se para a aula → Participe da aula → Concluir membro
     - **Agradecimento do Doador pela Primeira Vez** -- Enviar nota de agradecimento → Compartilhe o impacto da doação → Gerenciado
3. Dê ao fluxo de trabalho um **Nome**.
4. Opcionalmente atribua uma **Categoria** para agrupar fluxos de trabalho relacionados. Você pode criar uma nova categoria diretamente no dropdown.
5. Deixe o fluxo de trabalho **Ativo** para que as pessoas possam ser adicionadas a ele, ou defina-o como **Inativo** para ocultá-lo das listas de adicionar ao fluxo de trabalho.
6. Clique em **Salvar**.

:::tip
Use o botão **Duplicar** na lista Fluxos de Trabalho para copiar um fluxo de trabalho existente -- incluindo suas etapas, ações automatizadas e roteamento -- como ponto de partida para um novo.
:::

## Construindo o Quadro com Etapas

Cada quadro de fluxo de trabalho é composto de **etapas**, mostradas como colunas da esquerda para a direita. Abra um fluxo de trabalho e use **Adicionar Etapa** para criar cada estágio do seu processo.

Quando você adiciona ou edita uma etapa, você pode configurar:

- **Nome da Etapa** -- o título da coluna (por exemplo, "Chamada de Boas-vindas" ou "Aguardando Registro").
- **Vencer em (dias)** -- define automaticamente uma data de vencimento quando um cartão entra nesta etapa. Cartões após sua data de vencimento são marcados como **Vencidos**.
- **Responsável padrão** -- a pessoa ou grupo aos quais novos cartões nesta etapa são atribuídos automaticamente.
- **Ações automatizadas** -- coisas que o sistema faz sozinho quando um cartão chega (veja abaixo).
- **Roteamento** -- para onde o cartão vai quando sai da etapa (veja [Roteando Cartões com Resultados e Condições](#routing-cards-with-outcomes-and-conditions)).

Arraste colunas de etapas para a ordem que corresponde ao seu processo. A ordem também define o caminho padrão que um cartão segue quando nenhum outro roteamento se aplica.

:::info
Salve uma nova etapa primeiro. As ações automatizadas e o roteamento se anexam à etapa, então o editor desbloqueia essas seções assim que a etapa existe.
:::

## Ações Automatizadas

Cada etapa pode conter uma lista de **ações automatizadas** que são executadas por conta própria no momento em que um cartão **entra** na etapa -- antes de qualquer pessoa tocá-lo. É assim que uma etapa solicita um voluntário *e* cuida do trabalho rotineiro em torno do acompanhamento.

No editor de etapas, abra **Ações automatizadas**, clique em **Adicionar Ação**, escolha um tipo, preencha suas configurações e clique no ícone de salvar dessa ação. Adicione quantas precisar; elas executam **de cima para baixo em ordem**.

| Ação | O que faz |
|---|---|
| **Enviar email** | Envia um modelo de email que você escolhe para a pessoa. Você pode substituir a linha de assunto. |
| **Aguardar** | Pausa o cartão por alguns dias antes de continuar (veja abaixo). |
| **Adicionar ao grupo** | Adiciona a pessoa a um [grupo](../groups/index.md) que você escolhe. |
| **Adicionar ao fluxo de trabalho** | Inicia a pessoa em outro fluxo de trabalho -- útil para transferir entre processos. |
| **Adicionar nota** | Registra uma nota no histórico do cartão. |
| **Definir campo** | Atualiza um campo no registro da pessoa: Status de Membro, Status Civil, Gênero, Cidade, Estado ou CEP. |
| **Webhook** | Envia os detalhes do cartão para um endereço web externo (URL) que você fornece, para conectar a outros sistemas. |

Após todas as ações de uma etapa serem concluídas, o cartão **repousa nessa etapa** para que uma pessoa possa trabalhar -- a menos que a etapa tenha uma rota automática que o mova adiante (veja [Etapas Totalmente Automatizadas](#fully-automated-steps)).

:::info
As ações automatizadas são executadas apenas quando um cartão chega através do fluxo normal -- quando é adicionado pela primeira vez, quando um resultado ou rota automática o traz, ou após um Aguardar terminar. Eles **não** são re-executados quando um membro da equipe arrasta manualmente um cartão para a etapa ou o envia de volta, portanto uma pessoa não receberá o mesmo email duas vezes.
:::

### Enviando email

Escolha **Enviar email**, selecione um de seus modelos de email e, opcionalmente, digite um assunto personalizado. Quando um cartão entra na etapa, a pessoa recebe esse email automaticamente. (Se a pessoa não tiver endereço de email registrado, a etapa simplesmente pula essa ação.)

:::info
Os emails do Fluxo de Trabalho saem apenas depois que sua igreja foi aprovada para enviar email em grupo, e eles contam para o limite de email diário de sua igreja. Veja [Ativando Email em Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Aguardando alguns dias (sequências de drip)

A ação **Aguardar** retém um cartão pelo número de dias que você definiu. Enquanto aguarda, o cartão mostra como **Adiado**. Quando o aguardo termina:

1. Qualquer **ações restantes na mesma etapa** executam -- então você pode construir um drip como **Enviar email → Aguardar 3 dias → Enviar um email de lembrete**.
2. Então, se a etapa tiver uma rota automática, o cartão se move; caso contrário, repousa na etapa para uma pessoa pegar.

:::tip
Um **Aguardar** no início de uma etapa é uma maneira simples de "manter" um cartão antes de surgir para um voluntário -- por exemplo, *Aguardar 7 dias, depois um treinador entra em contato*.
:::

## Adicionando Pessoas como Cartões

Existem várias maneiras de colocar pessoas em um quadro:

- **Do quadro** -- Clique em **Adicionar Cartão** na parte inferior de uma coluna de etapas e escolha uma pessoa. Você também pode escolher um grupo, e cada membro desse grupo é adicionado como um cartão.
- **Do registro da pessoa** -- Use **Adicionar ao Fluxo de Trabalho** na página de uma pessoa para largá-la em um fluxo de trabalho.
- **Da pesquisa de Pessoas** -- Selecione várias pessoas e use a ação **Adicionar ao Fluxo de Trabalho** em massa para adicioná-las todas de uma vez.
- **Automaticamente com um acionador** -- Adicione pessoas quando algo acontecer, como um envio de formulário ou um primeiro presente (veja [Acionadores](#triggers) abaixo).

## Trabalhando o Quadro

Abra um fluxo de trabalho para ver seu quadro. Cada cartão mostra o nome da pessoa, a quem está atribuído e um chip de data de vencimento ou status (**Vencidos** ou **Adiado**). Uma coluna de etapas também mostra pequenos crachás para quaisquer ações automatizadas que ela executa e anotações para seu roteamento, dando-lhe um mapa de como os cartões fluem à primeira vista.

- **Mover um cartão** -- Arraste um cartão de uma coluna para a próxima conforme a pessoa progride.
- **Abrir um cartão** -- Clique duas vezes em um cartão (ou clique nele) para abrir sua gaveta de detalhes, onde você pode mudar a etapa, reatribuir, adicionar notas e revisar o que já aconteceu.

Da gaveta de cartões você pode:

- **Atribuir** o cartão a uma pessoa ou grupo diferente.
- **Adiar** o cartão por 1 dia, 3 dias ou 1 semana para ocultar temporariamente sua data de vencimento.
- **Enviar de Volta** para a etapa anterior ou **Pular** para a próxima etapa.
- **Fixar atribuição** -- manter o mesmo proprietário no cartão mesmo quando se move entre etapas. Por padrão, mover um cartão para uma nova etapa o reatribui ao responsável padrão dessa etapa; fixar mantém a pessoa atual responsável em todo o processo.
- **Concluir** o cartão para terminá-lo, ou escolha um botão **Resultado** se a etapa tiver resultados configurados (veja [Roteando Cartões com Resultados e Condições](#routing-cards-with-outcomes-and-conditions)).
- **Adicionar notas** e revisar o **histórico** do cartão -- incluindo um log de ações automatizadas que foram executadas (emails enviados, aguardas, etc.).

### Ações em massa

Selecione as caixas de seleção em vários cartões para agir sobre eles juntos. Uma barra de ferramentas aparece permitindo que você **Conclua**, **Adie**, **Reatribua** ou **Mova** todos os cartões selecionados para outra etapa de uma vez.

## Roteando Cartões com Resultados e Condições

O Roteamento controla para onde um cartão vai quando sai de uma etapa. Abra o editor de uma etapa para configurar dois tipos de roteamento.

### Botões de resultado

Os Resultados são botões mostrados na gaveta de cartões quando você está concluindo um cartão nessa etapa. Em vez de um único botão **Concluir**, você pode oferecer opções como "Ingressou em um Grupo" ou "Não Interessado." Cada resultado pode:

- Enviar o cartão para **outra etapa** neste fluxo de trabalho,
- **Transferir o cartão** para um fluxo de trabalho completamente diferente, ou
- **Fechar** o cartão.

Isso permite que uma decisão ramifique a pessoa em caminhos diferentes.

### Roteamento automático (condicional)

As rotas automáticas movem um cartão adiante **no momento em que entra em uma etapa** (e após suas ações automatizadas serem concluídas), sem que ninguém clique, se a pessoa corresponder a um conjunto de condições. Adicione uma rota, escolha a etapa de destino e defina uma ou mais **condições** (por exemplo, campus de uma pessoa, idade ou status de membro). Uma rota sem condições corresponde a todos.

:::info
No quadro, cada coluna de etapas mostra pequenas anotações descrevendo seu roteamento -- por exemplo, um rótulo de resultado ou "se corresponder" seguido por uma seta para a etapa de destino ou fluxo de trabalho.
:::

## Etapas Totalmente Automatizadas

Você pode fazer uma etapa ser executada inteiramente por conta própria, sem que ninguém a trabalhe. Dê à etapa suas **ações automatizadas** e adicione uma **rota automática** (sem condições) apontando para a próxima etapa. Quando um cartão entra, as ações executam, e então a rota o avança imediatamente -- o cartão passa direto.

:::tip
Combine isso com **Aguardar**: *Enviar email de boas-vindas → Aguardar 3 dias → avançar automaticamente para a etapa "Chamada pessoal".* O email e o tempo são gerenciados para você, e um voluntário só vê o cartão quando é hora do toque humano.
:::

## Acionadores

Os Acionadores adicionam pessoas a um fluxo de trabalho automaticamente quando algo acontece, para que você nunca tenha que adicionar cartões manualmente. Em um quadro de fluxo de trabalho, clique na aba **Acionadores**, depois em **Adicionar Acionador**. Existem dois tipos:

### Acionadores de eventos

Disparam assim que um registro é alterado no B1. Escolha o evento, depois opcionalmente adicione **condições** para que apenas as pessoas correspondentes sejam adicionadas:

- **Pessoa · Criada / Atualizada** -- por exemplo, adicione qualquer um cujo status se torne *Visitante*.
- **Doação · Criada** -- por exemplo, adicione uma primeira ou grande doação a um fluxo de trabalho de agradecimento (combine em quantidade, fundo ou método).
- **Grupo · Membro Ingressou** / **Grupo · Criado**.
- **Formulário · Enviado** -- adicione qualquer um que envie um formulário escolhido (ótimo para um cartão "Sou Novo" ou "Conectar").

### Acionadores de agenda

Executar uma base recorrente -- diária, semanal, mensal ou anualmente -- contra um conjunto de condições. Use-os para alcance baseado em tempo, como *todos cujo aniversário de membro é hoje* ou uma *verificação mensal*.

Para qualquer acionador você também pode definir:

- A **etapa de entrada** na qual o novo cartão começa (padrão é a primeira etapa).
- **Uma vez por pessoa** -- então a mesma pessoa não é adicionada ao fluxo de trabalho duas vezes pelo acionador.
- **Ativo** -- ative ou desative o acionador sem excluir.

:::tip
Combine um acionador **Formulário · Enviado** com o modelo **Acompanhamento de Novo Visitante** para transformar seu formulário "Cartão de Conexão" ou "Sou Novo" em um pipeline de acompanhamento automático.
:::

## Meus Cartões

Voluntários e equipe não precisam cavar através de cada quadro para encontrar seu trabalho. A página **Meus Cartões** (vinculada da página Fluxos de Trabalho) lista cada cartão atribuído ao usuário atual em todos os fluxos de trabalho. Clicar em um cartão abre o quadro ao qual pertence.

## Relatórios

Abra um fluxo de trabalho e clique em **Relatórios** para ver análises para esse fluxo de trabalho:

- **Vencidos** -- o número de cartões após sua data de vencimento.
- **Cartões por Etapa** -- quantos cartões atualmente estão em cada etapa, mostrados como um gráfico de coluna.
- **Concluído (30 dias)** -- rendimento nos últimos 30 dias, mostrado como um gráfico de linha.

Use-os para detectar gargalos -- por exemplo, uma etapa onde os cartões se acumulam e nunca avançam.

## Artigos Relacionados

- [Tarefas](./tasks.md) -- os itens de ação individual em que os cartões do fluxo de trabalho são construídos
- [Formulários](../forms/index.md) -- construa os formulários que podem desencadear fluxos de trabalho
- [Grupos](../groups/index.md) -- os grupos que uma ação "Adicionar ao grupo" pode colocar pessoas
- [Funções e Permissões](../settings/roles-permissions.md) -- controle quem pode visualizar, editar e gerenciar fluxos de trabalho
