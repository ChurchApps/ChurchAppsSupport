---
title: "Criando Formulários"
---

# Criando Formulários

<div class="article-intro">

Crie formulários personalizados para coletar informações da sua congregação. Você pode criar formulários para inscrições em eventos, pesquisas, fichas de visitantes, pedidos de membresia e muito mais. Os formulários podem ser vinculados a pessoas no seu banco de dados ou usados como páginas independentes, com sua própria URL pública.

</div>

## Vídeo de treinamento

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Para formulários de **Pessoas** (vinculados a registros de pessoas), você precisa primeiro de [pessoas cadastradas no seu banco de dados](../people/adding-people.md).
- Para formulários que coletam **pagamentos**, você deve ter o [Stripe configurado para doações online](../donations/online-giving-setup.md).

</div>

## Criando um novo formulário

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Formulários**.
2. Clique em **Adicionar Formulário**.
3. Digite um **nome** para o seu formulário.
4. Escolha o tipo de formulário no menu suspenso **Associar a**:
   - **Pessoas** — Associa as respostas a [registros de pessoas](../people/adding-people.md) no seu banco de dados. Formulários de Pessoas são preenchidos a partir do registro de uma pessoa, então não possuem um link para compartilhar.
   - **Independente** — Cria um formulário independente com sua própria URL pública, ideal para inscrições externas. Somente formulários Independentes oferecem uma [foto de cabeçalho](#adding-a-header-photo), um [código QR](#sharing-a-form-with-a-qr-code), um [grupo vinculado](#linking-a-form-to-a-group) e a opção **Criar um registro de pessoa a partir das respostas**.
5. Clique em **Salvar** para criar o formulário.

Seu novo formulário aparecerá na lista. Clique nele para começar a adicionar perguntas.

## Imprimindo um formulário em branco {#printing-a-blank-form}

Precisa de uma cópia impressa para distribuir — por exemplo, uma ficha de visitante na recepção, ou um formulário que alguém sem acesso à internet possa preencher à mão? Clique em **Imprimir** ao lado de um formulário na lista principal de Formulários para abrir uma prévia e, em seguida, clique em **Imprimir**. Os campos em branco são impressos com uma linha ou uma caixa de seleção para cada pergunta, para que as pessoas possam preenchê-los à mão; perguntas obrigatórias são marcadas com um asterisco. No topo da página aparece o logotipo da sua igreja (o **Logotipo para Fundo Claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um), com o nome da sua igreja logo abaixo, seguido do nome do formulário. Não há outras opções de impressão — imprima o formulário inteiro ou nada.

## Compartilhando um formulário com um código QR {#sharing-a-form-with-a-qr-code}

Formulários Independentes têm um link **Código QR** ao lado deles na lista principal de Formulários (formulários arquivados não). Clique nele para abrir um código QR para a URL pública do formulário, com o link exibido abaixo. Clique em **Baixar PNG** para salvar o código como uma imagem que você pode imprimir nos boletins ou exibir nos slides. Quem o escanear abre o formulário no celular.

## Adicionando perguntas {#adding-questions}

1. Abra seu formulário e vá para a aba **Perguntas**.
2. Clique em **Adicionar Pergunta**.
3. Selecione um **tipo de campo** no menu suspenso Provider. Os tipos disponíveis incluem:
   - **Caixa de texto** — Para respostas curtas de texto
   - **Data** — Para seleção de datas
   - **E-mail** — Para endereços de e-mail
   - **Número de telefone** — Para entrada de telefone
   - **Múltipla escolha** — Para selecionar entre opções predefinidas
   - **Pagamento** — Para coletar pagamentos
4. Digite um **Título** e uma **Descrição** opcional para a pergunta. A descrição aparece abaixo da pergunta quando as pessoas preenchem o formulário, então use-a para dicas como "Inclua quaisquer alergias que devemos conhecer."
5. Marque **Exigir resposta** se o campo for obrigatório.
6. Clique em **Salvar**.
7. Repita para adicionar mais perguntas.

:::warning
O tipo de campo **Pagamento** exige que o Stripe esteja configurado. Se você ainda não configurou as doações online, veja [Configuração de Doações Online](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Gerenciando membros do formulário {#managing-form-members}

1. Abra seu formulário e vá para a aba **Membros do Formulário**.
2. Pesquise uma pessoa e adicione-a com uma função:
   - **Administrador** — Pode editar o formulário e ver todas as respostas.
   - **Somente visualização** — Pode ver as respostas, mas não pode editar o formulário.

## Vinculando um formulário a um grupo {#linking-a-form-to-a-group}

Você pode vincular qualquer formulário Independente a um grupo — por exemplo, um formulário de pedidos de oração para um pequeno grupo, ou uma autorização médica para uma viagem de jovens:

1. Abra os **Detalhes** do seu formulário.
2. Em **Grupo vinculado**, selecione o grupo ou deixe em **Nenhum**.
3. Clique em **Salvar**.

Depois que um formulário estiver vinculado:

- **Membros do grupo** veem o formulário em uma seção **Formulários** na página do grupo no B1.church enquanto o formulário estiver aberto, com um botão **Preencher** que o abre (veja [Detalhes do Grupo](../../b1-church/groups/group-details.md#linked-forms)).
- **Líderes do grupo** também veem formulários fechados e podem ler as respostas de todas as submissões e imprimi-las (uma submissão ou **Imprimir todas**). Os líderes só podem visualizar as respostas — não podem editar o formulário, a menos que também sejam [membros do formulário](#managing-form-members).
- **No B1 Admin**, a página do grupo exibe uma seção **Formulários vinculados** listando cada formulário vinculado como **Aberto** ou **Fechado**. Ela aparece para os líderes do grupo e para pessoas que podem administrar formulários. Veja [Membros do Grupo](../groups/group-members.md#linked-forms).

Um formulário é considerado fechado quando está fora do período de disponibilidade. Formulários arquivados não são exibidos na página do grupo.

### Adicionando automaticamente quem enviar o formulário a um grupo {#automatically-adding-submitters-to-a-group}

Vincular um formulário a um grupo não adiciona ninguém a ele por si só. Para incluir todos que enviarem o formulário na lista do grupo vinculado, ative também a opção **Criar um registro de pessoa a partir das respostas** nos detalhes do formulário e clique em **Salvar**.

Sempre que alguém enviar o formulário, a pessoa encontrada ou recém-criada é adicionada ao grupo (membros que já estão no grupo são ignorados). Isso é útil em casos como um formulário de inscrição em acampamento que deve montar automaticamente a lista do grupo do acampamento.

### Enviando um e-mail de acompanhamento

Com a opção **Criar um registro de pessoa a partir das respostas** ativada, você também pode enviar um e-mail para cada pessoa que enviar o formulário. Preencha **Assunto do e-mail de acompanhamento** e **Corpo do e-mail de acompanhamento** nos detalhes do formulário. Você pode usar os marcadores `{firstName}` e `{churchName}` em ambos. O e-mail só é enviado quando os dois campos estiverem preenchidos.

:::info
Os e-mails de acompanhamento só são enviados depois que sua igreja for aprovada para enviar e-mails de grupo, e contam para o limite diário de e-mails da sua igreja. Veja [Ativando o e-mail de grupo para sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicando um formulário

Para reutilizar um formulário como ponto de partida para um novo, clique em **Duplicar** ao lado do formulário na lista de Formulários e confirme. O B1 cria uma cópia exata do formulário — incluindo todas as perguntas —, que você pode então renomear e editar de forma independente.

:::tip
A duplicação é útil para eventos recorrentes em que as perguntas de inscrição se mantêm de um ano para o outro. Duplique o formulário do ano passado, atualize o nome e as datas, e pronto.
:::

## Configurando as propriedades do formulário

Você pode atualizar o nome e as configurações do seu formulário a qualquer momento. Para formulários Independentes, também verá uma **URL pública** exclusiva que pode compartilhar com qualquer pessoa, além de um campo **Descrição** — texto exibido acima das perguntas na página pública do formulário, útil para explicar a finalidade do formulário antes de as pessoas começarem a preenchê-lo.

### Adicionando uma foto de cabeçalho {#adding-a-header-photo}

Formulários Independentes podem exibir uma **Foto de cabeçalho** no topo do formulário. Nos detalhes do formulário, clique na caixa de foto ou em **Adicionar Foto**, depois escolha ou envie uma imagem (ela é recortada no formato 16:9). Clique em **Salvar**. A foto aparece abaixo do nome do formulário, acima da descrição, na página da URL pública do formulário e em qualquer lugar onde o formulário for incorporado com o elemento **Formulário** do site. Use **Alterar Foto** para substituí-la ou **Remover** para tirá-la.

Use o campo **Mensagem de agradecimento** para definir o que as pessoas veem depois de enviar o formulário, inclusive na página da URL pública do formulário. Se o campo ficar em branco, elas verão "Obrigado por enviar o formulário!"

:::tip
Formulários Independentes são ótimos para inscrições em eventos. Compartilhe a URL pública por e-mail, redes sociais ou incorpore o formulário diretamente no site da sua igreja.
:::

:::info
Para incorporar um formulário no seu site do B1, acesse o editor do seu site, adicione uma nova seção e selecione o elemento **Formulário**. Depois, escolha o formulário que deseja exibir. Veja [Gerenciando páginas](../website/managing-pages.md) para mais detalhes sobre como editar seu site.
:::
