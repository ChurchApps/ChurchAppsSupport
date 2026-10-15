---
title: "Criando Formulários"
---

# Criando Formulários

<div class="article-intro">

Crie formulários personalizados para coletar informações da sua congregação. Você pode criar formulários para inscrições em eventos, pesquisas, cartões de visitante, fichas de membresia e muito mais. Os formulários podem ser vinculados a pessoas do seu banco de dados ou usados como páginas independentes com sua própria URL pública.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Para formulários de **Pessoas** (vinculados a registros de pessoas), você precisa primeiro de [pessoas cadastradas no seu banco de dados](../people/adding-people.md).
- Para formulários que coletam **pagamentos**, você deve ter o [Stripe configurado para doações online](../donations/online-giving-setup.md).

</div>

## Criando um Novo Formulário

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Formulários**.
2. Clique em **Adicionar Formulário**.
3. Digite um **nome** para o seu formulário.
4. Escolha o tipo de formulário no menu suspenso:
   - **Pessoas** — Associa as respostas a [registros de pessoas](../people/adding-people.md) do seu banco de dados.
   - **Independente** — Cria um formulário autônomo com sua própria URL pública, ideal para inscrições externas.
5. Clique em **Salvar** para criar o formulário.

Seu novo formulário aparecerá na lista. Clique nele para começar a adicionar perguntas.

## Imprimindo um Formulário em Branco

Precisa de uma cópia impressa para entregar -- por exemplo, um cartão de visitante na recepção, ou um formulário para alguém sem acesso à internet preencher à mão? Clique em **Imprimir** ao lado de um formulário na lista principal de Formulários para abrir uma prévia e, em seguida, clique em **Imprimir**. Os campos em branco são impressos com uma linha sublinhada ou uma caixa de seleção para cada pergunta, para que as pessoas possam preenchê-los à mão; perguntas obrigatórias são marcadas com um asterisco. No topo da página aparece o logotipo da sua igreja (o **Logotipo para Fundo Claro** de [Website > Aparência](../website/appearance.md), se você tiver enviado um), com o nome da igreja abaixo, seguido do nome do formulário. Não há outras opções de impressão -- imprima o formulário inteiro ou nada.

## Adicionando Perguntas

1. Abra seu formulário e vá para a aba **Perguntas**.
2. Clique em **Adicionar Pergunta**.
3. Selecione um **tipo de campo** no menu suspenso Provider. Os tipos disponíveis incluem:
   - **Caixa de Texto** — Para respostas curtas em texto
   - **Data** — Para seleção de datas
   - **E-mail** — Para endereços de e-mail
   - **Número de Telefone** — Para entrada de telefone
   - **Múltipla Escolha** — Para selecionar entre opções predefinidas
   - **Pagamento** — Para coletar pagamentos
4. Digite um **Título** e uma **Descrição** opcional para a pergunta. A descrição aparece abaixo da pergunta quando as pessoas preenchem o formulário, então use-a para dicas como "Inclua quaisquer alergias que devemos saber."
5. Marque **Exigir resposta** se o campo for obrigatório.
6. Clique em **Salvar**.
7. Repita para adicionar mais perguntas.

:::warning
O tipo de campo **Pagamento** exige que o Stripe esteja configurado. Se você ainda não configurou as doações online, consulte [Configuração de Doações Online](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Gerenciando Membros do Formulário

1. Abra seu formulário e vá para a aba **Membros do Formulário**.
2. Pesquise uma pessoa e adicione-a com uma função:
   - **Administrador** — Pode editar o formulário e ver todas as respostas.
   - **Somente Visualização** — Pode ver as respostas, mas não pode editar o formulário.

## Adicionando Automaticamente Quem Respondeu a um Grupo

Quando **Criar um registro de pessoa a partir das respostas** está ativado, você também pode vincular o formulário a um grupo para que cada pessoa que responder seja adicionada automaticamente à lista desse grupo:

1. Abra os **Detalhes** do seu formulário e ative **Criar um registro de pessoa a partir das respostas**.
2. Em **Adicionar quem respondeu a um grupo**, selecione o grupo ao qual as pessoas devem ser adicionadas, ou deixe em **Nenhum**.
3. Clique em **Salvar**.

Cada vez que alguém enviar o formulário, a pessoa encontrada ou recém-criada é adicionada ao grupo (membros que já estão no grupo são ignorados). Isso é útil para coisas como um formulário de inscrição em um acampamento que deve montar automaticamente a lista de participantes do grupo do acampamento.

### Enviando um E-mail de Acompanhamento

Com **Criar um registro de pessoa a partir das respostas** ativado, você também pode enviar um e-mail para cada pessoa que responder ao formulário. Preencha **Assunto do E-mail de Acompanhamento** e **Corpo do E-mail de Acompanhamento** nos detalhes do formulário. Você pode usar os marcadores `{firstName}` e `{churchName}` em ambos. O e-mail só é enviado quando os dois campos estiverem preenchidos.

:::info
Os e-mails de acompanhamento só são enviados depois que sua igreja for aprovada para enviar e-mails de grupo, e eles contam para o limite diário de e-mails da sua igreja. Consulte [Ativando o E-mail de Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicando um Formulário

Para reutilizar um formulário como ponto de partida para um novo, clique em **Duplicar** ao lado do formulário na lista de Formulários e confirme. O B1 cria uma cópia exata do formulário -- incluindo todas as perguntas -- que você pode então renomear e editar de forma independente.

:::tip
A duplicação é útil para eventos recorrentes em que as perguntas de inscrição permanecem as mesmas de um ano para o outro. Duplique o formulário do ano passado, atualize o nome e as datas, e você estará pronto.
:::

## Configurando as Propriedades do Formulário

Você pode atualizar o nome e as configurações do seu formulário a qualquer momento. Para formulários Independentes, você também verá uma **URL pública** exclusiva que pode compartilhar com qualquer pessoa, além de um campo **Descrição** -- texto exibido acima das perguntas na página pública do formulário, útil para informar às pessoas para que serve o formulário antes de começarem a preenchê-lo.

Use o campo **Mensagem de Agradecimento** para definir o que as pessoas veem depois de enviar o formulário, inclusive na página da URL pública. Se você deixá-lo em branco, elas verão "Obrigado por enviar o formulário!"

:::tip
Formulários Independentes são ótimos para inscrições em eventos. Compartilhe a URL pública por e-mail, redes sociais ou incorpore o formulário diretamente no site da sua igreja.
:::

:::info
Para incorporar um formulário no seu site do B1, acesse o editor do seu site, adicione uma nova seção e selecione o elemento **Formulário**. Em seguida, escolha o formulário que deseja exibir. Consulte [Gerenciando Páginas](../website/managing-pages.md) para detalhes sobre como editar seu site.
:::
