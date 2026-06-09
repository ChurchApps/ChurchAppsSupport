---
title: "Fluxos de Trabalho"
---

# Fluxos de Trabalho

<div class="article-intro">

Fluxos de trabalho movem pessoas por uma série de etapas em um quadro visual. Cada pessoa se torna um cartão que viaja de uma etapa para a próxima -- de um acompanhamento de convidado de primeira vez, para um processo de membro, para um agradecimento de doador pela primeira vez, e qualquer outra coisa onde você precise acompanhar muitas pessoas pelas mesmas etapas. Uma etapa pode pedir a um voluntário para fazer algo (fazer uma ligação, ter uma conversa) **e** executar ações automatizadas por conta própria -- enviar e-mail, aguardar alguns dias, adicionar a pessoa a um grupo -- para que os fluxos de trabalho lidem tanto com o acompanhamento humano quanto com o trabalho chato ao redor. Fluxos de trabalho estendem [Tarefas](./tasks.md) em um quadro Kanban arrastar e soltar para que nada e ninguém caia por entre as rachaduras.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as pessoas que você deseja rastrear existem no B1 Admin
- Familiarize-se com como [Tarefas](./tasks.md) funcionam, já que cada cartão em um quadro é uma tarefa
- Para usar a ação **Enviar e-mail**, crie primeiro os templates de e-mail que você deseja enviar (gerenciados em **Mensagens → Gerenciar Templates**)
- Você precisará da permissão apropriada de Tarefas. Visualizar, editar cartões e gerenciar fluxos de trabalho são níveis de permissão separados (veja [Funções e Permissões](../settings/roles-permissions.md))

</div>

## Visualizando Fluxos de Trabalho

Navegue até **Servindo**, abra a área **Tarefas** e selecione **Fluxos de Trabalho** do menu. Você verá seus fluxos de trabalho listados e agrupados por categoria, com fluxos de trabalho ativos destacados. Clique em qualquer fluxo de trabalho para abrir seu quadro.

## Criando um Fluxo de Trabalho

1. Na página Fluxos de Trabalho, clique em **Adicionar Fluxo de Trabalho**.
2. Escolha como começar:
   - **Fluxo de trabalho em branco** -- comece do zero e construa suas próprias etapas.
   - **De um template** -- comece com um conjunto pronto de etapas que você pode editar. Os templates integrados incluem:
     - **Acompanhamento de Novo Visitante** -- Enviar e-mail de boas-vindas → Ligação telefônica pessoal → Convidar para próxima etapa → Conectado
     - **Classe de Membro** -- Expressar interesse → Registrar para classe → Participar da classe → Completo membro
     - **Agradecimento de Doador pela Primeira Vez** -- Enviar nota de agradecimento → Compartilhar impacto de doação → Administrado
3. Dê ao fluxo de trabalho um **Nome**.
4. Opcionalmente, atribua uma **Categoria** para agrupar fluxos de trabalho relacionados. Você pode criar uma nova categoria diretamente da lista suspensa.
5. Deixe o fluxo de trabalho **Ativo** para que as pessoas possam ser adicionadas a ele, ou defina-o como **Inativo** para ocultá-lo das listas de adicionar ao fluxo de trabalho.
6. Clique em **Salvar**.

:::tip
Use o botão **Duplicar** na lista de Fluxos de Trabalho para copiar um fluxo de trabalho existente -- incluindo suas etapas, ações automatizadas e roteamento -- como ponto de partida para um novo.
:::

## Construindo o Quadro com Etapas

Cada quadro de fluxo de trabalho é composto por **etapas**, mostradas como colunas da esquerda para a direita. Abra um fluxo de trabalho e use **Adicionar Etapa** para criar cada etapa do seu processo.

Quando você adiciona ou edita uma etapa, você pode configurar:

- **Nome da Etapa** -- o cabeçalho da coluna (por exemplo, "Ligação de Boas-vindas" ou "Aguardando Registro").
- **Vencimento em (dias)** -- define automaticamente uma data de vencimento quando um cartão entra nesta etapa. Cartões além de sua data de vencimento são marcados como **Atrasado**.
- **Atribuído padrão** -- a pessoa ou grupo para a qual cartões novos nesta etapa são atribuídos automaticamente.
- **Ações automatizadas** -- coisas que o sistema faz por conta própria quando um cartão chega (veja abaixo).
- **Roteamento** -- para onde o cartão vai quando sai da etapa (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).

Arraste colunas de etapa para a ordem que corresponde ao seu processo. A ordem também define o caminho padrão que um cartão percorre quando nenhum outro roteamento se aplica.

:::info
Salve uma etapa nova primeiro. Ações automatizadas e roteamento se ligam à etapa, então o editor desbloqueia essas seções uma vez que a etapa existe.
:::

## Ações Automatizadas

Toda etapa pode carregar uma lista de **ações automatizadas** que são executadas por conta própria no momento em que um cartão **entra** na etapa -- antes que qualquer pessoa o toque. É assim que uma etapa tanto avisa a um voluntário *quanto* cuida do trabalho rotineiro ao redor do acompanhamento.

No editor de etapa, abra **Ações automatizadas**, clique em **Adicionar Ação**, escolha um tipo, preencha suas configurações e clique no ícone de salvar dessa ação. Adicione quantas você precisar; elas executam **de cima para baixo em ordem**.

| Ação | O que ela faz |
|---|---|
| **Enviar e-mail** | Envia à pessoa um template de e-mail que você escolhe. Você pode sobrescrever a linha de assunto. |
| **Aguardar** | Pausa o cartão por um número de dias antes de continuar (veja abaixo). |
| **Adicionar ao grupo** | Adiciona a pessoa a um [grupo](../groups/index.md) que você escolhe. |
| **Adicionar ao fluxo de trabalho** | Inicia a pessoa em outro fluxo de trabalho -- útil para passar de um processo para outro. |
| **Adicionar nota** | Registra uma nota no histórico do cartão. |
| **Definir campo** | Atualiza um campo no registro da pessoa: Status de Membro, Estado Civil, Gênero, Cidade, Estado ou CEP. |
| **Webhook** | Envia os detalhes do cartão para um endereço web externo (URL) que você fornece, para conectar a outros sistemas. |

Depois que todas as ações de uma etapa terminam, o cartão **repousa nessa etapa** para que uma pessoa possa trabalhar nele -- a menos que a etapa tenha uma rota automática que o mova adiante (veja [Etapas totalmente automatizadas](#fully-automated-steps)).

:::info
Ações automatizadas são executadas apenas quando um cartão chega através do fluxo normal -- quando é adicionado pela primeira vez, quando um resultado ou rota automática o traz, ou depois que uma Espera termina. Elas **não** são executadas novamente quando um membro da equipe arrasta manualmente um cartão para a etapa ou o envia de volta, para que uma pessoa não receba o mesmo e-mail duas vezes.
:::

### Enviando e-mail

Escolha **Enviar e-mail**, escolha um de seus templates de e-mail e opcionalmente digite um assunto personalizado. Quando um cartão entra na etapa, a pessoa recebe esse e-mail automaticamente. (Se a pessoa não tiver um endereço de e-mail no arquivo, a etapa simplesmente pula essa ação.)

### Aguardando alguns dias (sequências de gotejamento)

A ação **Aguardar** retém um cartão pelo número de dias que você definir. Enquanto aguarda, o cartão aparece como **Adormecido**. Quando a espera termina:

1. Qualquer **ação restante na mesma etapa** é executada -- para que você possa construir uma sequência como **Enviar e-mail → Aguardar 3 dias → Enviar um e-mail de lembrete**.
2. Então, se a etapa tiver uma rota automática, o cartão se move; caso contrário, descansa na etapa para que uma pessoa o pegue.

:::tip
Uma **Espera** bem no início de uma etapa é uma forma simples de "reter" um cartão antes de surgir a um voluntário -- por exemplo, *Aguardar 7 dias, depois um treinador entra em contato*.
:::

## Adicionando Pessoas como Cartões

Existem várias maneiras de colocar pessoas em um quadro:

- **Do quadro** -- Clique em **Adicionar Cartão** na parte inferior de uma coluna de etapa e escolha uma pessoa. Você também pode escolher um grupo, e todo membro desse grupo é adicionado como um cartão.
- **Do registro de uma pessoa** -- Use **Adicionar ao Fluxo de Trabalho** na página de uma pessoa para colocá-los em um fluxo de trabalho.
- **Da busca de Pessoas** -- Selecione várias pessoas e use a ação em massa **Adicionar ao Fluxo de Trabalho** para adicioná-las todas de uma vez.
- **Automaticamente com um acionador** -- Adicione pessoas quando algo acontece, como um envio de formulário ou um primeiro presente (veja [Acionadores](#triggers) abaixo).

## Trabalhando o Quadro

Abra um fluxo de trabalho para ver seu quadro. Cada cartão mostra o nome da pessoa, a quem está atribuído e um chip de data de vencimento ou status (**Atrasado** ou **Adormecido**). Uma coluna de etapa também mostra pequenos crachás para quaisquer ações automatizadas que executa e anotações para seu roteamento, dando-lhe um mapa à primeira vista de como os cartões fluem.

- **Mover um cartão** -- Arraste um cartão de uma coluna para a próxima conforme a pessoa progride.
- **Abrir um cartão** -- Clique duas vezes em um cartão (ou clique nele) para abrir sua gaveta de detalhe, onde você pode alterar a etapa, reatribuir, adicionar notas e revisar o que já aconteceu.

Da gaveta de cartão você pode:

- **Atribuir** o cartão para uma pessoa ou grupo diferente.
- **Adormecê-lo** por 1 dia, 3 dias ou 1 semana para ocultar temporariamente sua data de vencimento.
- **Enviar de Volta** para a etapa anterior ou **Pular** para a próxima etapa.
- **Fixar atribuição** -- manter o mesmo proprietário no cartão mesmo conforme se move entre etapas. Por padrão, mover um cartão para uma nova etapa o reatribui ao atribuído padrão dessa etapa; fixar mantém a pessoa atual responsável em todo.
- **Completar** o cartão para terminá-lo ou escolher um botão de **Resultado** se a etapa tiver resultados configurados (veja [Roteamento](#routing-cards-with-outcomes-and-conditions)).
- **Adicionar notas** e revisar o **histórico** do cartão -- incluindo um log de ações automatizadas que foram executadas (e-mails enviados, esperas, etc.).

### Ações em massa

Selecione as caixas de seleção em vários cartões para agir sobre eles juntos. Uma barra de ferramentas aparece permitindo que você **Complete**, **Adormeça**, **Reatribua** ou **Mova** todos os cartões selecionados para outra etapa de uma vez.

## Roteando Cartões com Resultados e Condições

O roteamento controla para onde um cartão vai quando sai de uma etapa. Abra o editor de uma etapa para configurar dois tipos de roteamento.

### Botões de resultado

Os resultados são botões mostrados na gaveta de cartão quando você está completando um cartão nessa etapa. Em vez de um único botão **Completar**, você pode oferecer escolhas como "Ingressou em um Grupo" ou "Não Interessado." Cada resultado pode:

- Enviar o cartão para **outra etapa** neste fluxo de trabalho,
- **Passar o cartão** para um fluxo de trabalho completamente diferente, ou
- **Fechar** o cartão.

Isso permite que uma decisão divida a pessoa em caminhos diferentes.

### Roteamento automático (condicional)

Rotas automáticas movem um cartão adiante **no momento em que entra em uma etapa** (e depois que suas ações automatizadas terminam), sem ninguém clicar, se a pessoa corresponder a um conjunto de condições. Adicione uma rota, escolha a etapa de destino e defina uma ou mais **condições** (por exemplo, campus, idade ou status de membro de uma pessoa). Uma rota sem condições corresponde a todos.

:::info
No quadro, cada coluna de etapa mostra pequenas anotações descrevendo seu roteamento -- por exemplo, um rótulo de resultado ou "se corresponder" seguido por uma seta para a etapa de destino ou fluxo de trabalho.
:::

## Etapas Totalmente Automatizadas

Você pode fazer uma etapa funcionar inteiramente por conta própria, com ninguém trabalhando nela. Dê à etapa suas **ações automatizadas** e adicione uma **rota automática** (sem condições) apontando para a próxima etapa. Quando um cartão entra, as ações são executadas e então a rota o avança imediatamente -- o cartão passa direto.

:::tip
Combine isso com **Aguardar**: *Enviar e-mail de boas-vindas → Aguardar 3 dias → avançar automaticamente para a etapa "Ligação pessoal".* O e-mail e o tempo são cuidados para você, e um voluntário vê o cartão apenas quando é hora do toque humano.
:::

## Acionadores

Acionadores adicionam pessoas a um fluxo de trabalho automaticamente quando algo acontece, para que você nunca tenha que adicionar cartões manualmente. Em um quadro de fluxo de trabalho, clique na aba **Acionadores**, depois em **Adicionar Acionador**. Existem dois tipos:

### Acionadores de evento

Acionam assim que um registro muda no B1. Escolha o evento, depois opcionalmente adicione **condições** para que apenas pessoas correspondentes sejam adicionadas:

- **Pessoa · Criada / Atualizada** -- ex: adicione qualquer pessoa cujo status se torne *Visitante*.
- **Doação · Criada** -- ex: adicione uma doação primeira vez ou grande a um fluxo de trabalho de agradecimento (corresponda em quantidade, fundo ou método).
- **Grupo · Membro Ingressou** / **Grupo · Criado**.
- **Formulário · Enviado** -- adicione qualquer pessoa que envie um formulário escolhido (ótimo para um cartão "Sou Novo" ou "Conectar").

### Acionadores de agendamento

Execute em uma base recorrente -- diariamente, semanalmente, mensalmente ou anualmente -- contra um conjunto de condições. Use isso para alcance baseado em tempo como *qualquer pessoa cujo aniversário de membro é hoje* ou uma *verificação mensal*.

Para qualquer acionador você também pode definir:

- A **etapa de entrada** em que o novo cartão começa (padrão é a primeira etapa).
- **Uma vez por pessoa** -- para que a mesma pessoa não seja adicionada ao fluxo de trabalho duas vezes pelo acionador.
- **Ativo** -- ative ou desative o acionador sem deletá-lo.

:::tip
Emparelhe um acionador **Formulário · Enviado** com o template **Acompanhamento de Novo Visitante** para transformar seu formulário "Cartão de Conexão" ou "Sou Novo" em um pipeline de acompanhamento automático.
:::

## Meus Cartões

Voluntários e equipe não precisam cavar por cada quadro para encontrar seu trabalho. A página **Meus Cartões** (vinculada da página Fluxos de Trabalho) lista todos os cartões atribuídos ao usuário atual em todos os fluxos de trabalho. Clicando em um cartão abre o quadro ao qual pertence.

## Relatórios

Abra um fluxo de trabalho e clique em **Relatórios** para ver análises desse fluxo de trabalho:

- **Atrasado** -- o número de cartões além de sua data de vencimento.
- **Cartões por Etapa** -- quantos cartões atualmente estão em cada etapa, mostrado como um gráfico de colunas.
- **Completado (30 dias)** -- vazão nos últimos 30 dias, mostrada como um gráfico de linha.

Use isso para encontrar gargalos -- por exemplo, uma etapa onde cartões se acumulam e nunca avançam.

## Artigos Relacionados

- [Tarefas](./tasks.md) -- os itens de ação individuais em que cartões de fluxo de trabalho são construídos
- [Automações](./automations.md) -- crie tarefas recorrentes em um cronograma
- [Formulários](../forms/index.md) -- construa os formulários que podem disparar fluxos de trabalho
- [Grupos](../groups/index.md) -- os grupos onde uma ação "Adicionar ao grupo" pode colocar pessoas
- [Funções e Permissões](../settings/roles-permissions.md) -- controle quem pode visualizar, editar e gerenciar fluxos de trabalho
