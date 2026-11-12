---
title: "Gerenciando Respostas"
description: "Revise, imprima e reatribua as respostas de formulários no B1 Admin, levando cada resposta à pessoa certa e fazendo o acompanhamento de cartões de visitante e pedidos de oração."
---

# Gerenciando Respostas

<div class="article-intro">

Depois que o seu formulário estiver no ar, as respostas começarão a chegar. A aba **Respostas do formulário** permite revisar cada resposta, acompanhar quem enviou e usar os dados para fazer o acompanhamento da sua congregação em tempo hábil.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Crie um formulário](./creating-forms.md) com pelo menos uma pergunta
- Compartilhe o formulário pelo seu endereço público ou incorpore-o no seu [site](../website/managing-pages.md)

</div>

## Visualizando as Respostas {#viewing-submissions}

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Formulários**.
2. Clique no formulário que você quer revisar.
3. Acesse a aba **Respostas do formulário**.

A aba tem dois cartões:

- **Resumo das respostas** -- Para cada pergunta de múltipla escolha, caixa de seleção e sim/não, uma contagem de quantas pessoas escolheram cada resposta.
- **Resultados das respostas** -- Uma tabela com cada resposta e a contagem de envios. Cada linha mostra para quem é a resposta (**Enviado para** em formulários de Pessoas, **Enviado por** em formulários Independentes, ou **Anônimo**) e a **Data do envio**, seguidas de uma coluna para cada pergunta do formulário, na ordem do formulário. Se o seu formulário tiver muitas perguntas, role a tabela para o lado para ver o restante das colunas. Clique no nome de uma pessoa para abrir o registro dela.

Clique em **Exportar** em qualquer um dos cartões para baixar as respostas como um arquivo CSV, com uma linha por envio. Clique no ícone de **Imprimir** (impressora) para imprimir o resumo e a tabela de resultados, com o nome da sua igreja no cabeçalho.

## Revisando Respostas Individuais {#reviewing-individual-submissions}

Para ler ou imprimir as respostas de uma pessoa, abra o registro dela em [Pessoas](../people/adding-people.md#working-with-forms) e clique no formulário na seção **Formulários**. Você verá todas as respostas que ela deu, uma pergunta por linha.

Clique no **ícone de impressão** ao lado da resposta para imprimir as respostas preenchidas daquela pessoa -- útil para um arquivo em papel ou uma autorização assinada que você precisa manter à mão. A impressão mostra o logotipo da sua igreja (o **Logotipo para Fundo Claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) centralizado no topo, com o nome da igreja abaixo dele. As impressões sempre usam texto escuro em página branca, mesmo que você use o B1 Admin no modo escuro. Isso é diferente de [imprimir um formulário em branco](./creating-forms.md#printing-a-blank-form); aqui é impressa a resposta já enviada de uma pessoa, e não uma cópia vazia.

## Alterando a Pessoa de uma Resposta {#changing-the-person-on-a-submission}

Se uma resposta estiver vinculada à pessoa errada -- por exemplo, dois membros da família compartilham o mesmo e-mail -- você pode movê-la para a pessoa certa ou desvinculá-la.

1. Na aba **Respostas do formulário**, clique no ícone **Alterar pessoa** (duas setas) ao lado do nome da pessoa. O mesmo ícone aparece ao lado de uma resposta no [perfil de uma pessoa](../people/adding-people.md#working-with-forms).
2. Na caixa **Alterar pessoa**, pesquise a pessoa correta e clique em **Mover para esta pessoa**.
3. Ou clique em **Desvincular (Anônimo)** para separar a resposta de qualquer pessoa. Ela passa então a aparecer como **Anônimo**.

Somente o vínculo muda. As respostas permanecem as mesmas, e nenhum e-mail de acompanhamento é enviado novamente.

:::info
Em formulários configurados para criar um registro de pessoa, quando alguém está conectado ao site da sua igreja no momento do envio, a resposta é vinculada ao registro dessa própria pessoa, mesmo que outra pessoa do seu banco de dados compartilhe o mesmo e-mail. Quando você [mescla dois registros de pessoas](../people/adding-people.md), as respostas de formulários da pessoa removida passam para a pessoa que você mantém.
:::

## Como as Respostas São Coletadas {#how-submissions-are-collected}

As respostas podem chegar por vários canais:

- **Endereço público** -- Se o seu formulário tiver um endereço público (formulários Independentes), qualquer pessoa com o link pode enviar uma resposta. Compartilhe o endereço por e-mail, redes sociais ou mensagens de texto.
- **Incorporado no seu site** -- Os formulários incorporados no seu site B1 coletam respostas automaticamente quando os visitantes os preenchem.
- **Uso interno** -- A equipe pode preencher formulários de Pessoas em nome de alguém, a partir do registro dessa pessoa no B1 Admin. Veja [Trabalhando com Formulários](../people/adding-people.md#working-with-forms).

:::tip
Consulte regularmente a aba **Respostas do formulário** para formulários como cartões de visitante ou pedidos de oração, para que você possa fazer o acompanhamento com rapidez.
:::

## Usando os Dados das Respostas {#using-submission-data}

Os dados coletados pelos formulários podem ajudar você a:

- Acompanhar as inscrições em eventos e planejar de acordo
- Fazer o acompanhamento de visitantes ou novos membros
- Coletar feedback de pesquisas para o planejamento dos ministérios
- Processar pagamentos de eventos ou programas

:::info
Os membros do formulário com as funções **Administrador** ou **Somente visualização** podem acessar a aba **Respostas do formulário**. Certifique-se de que as pessoas certas da sua equipe tenham acesso aos formulários de que precisam, gerenciando as funções na aba **Membros do formulário**.
:::

:::info
Se um formulário Independente estiver [vinculado a um grupo](./creating-forms.md#linking-a-form-to-a-group), os líderes desse grupo podem ler e imprimir as respostas a partir da página do grupo no B1.church, sem precisar ser membros do formulário. Os líderes também podem ler ali as respostas das perguntas de inscrição dos eventos do grupo. Veja [Detalhes do Grupo](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Se um formulário **Independente** estiver configurado para criar um registro de pessoa, as respostas associadas a uma pessoa já existente também aparecem na seção **Formulários** da página dessa pessoa em Pessoas -- não apenas nos formulários do tipo Pessoas.
:::

## Próximos Passos {#next-steps}

- Aprenda a criar e personalizar formulários em [Criando Formulários](./creating-forms.md)
- Adicione as pessoas que enviaram respostas ao seu [cadastro de pessoas](../people/adding-people.md) para o acompanhamento contínuo
- [Vincule um formulário a um grupo](./creating-forms.md#linking-a-form-to-a-group) para que os líderes possam ler as respostas, ou [adicione automaticamente os respondentes ao grupo](./creating-forms.md#automatically-adding-submitters-to-a-group) para que um formulário de inscrição independente monte a própria lista de participantes
