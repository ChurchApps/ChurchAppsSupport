---
title: "Criando Formulários"
description: "Crie formulários personalizados no B1 Admin para inscrições em eventos, pesquisas e cartões de visitante e compartilhe-os por link, QR code ou impressão."
---

# Criando Formulários

<div class="article-intro">

Crie formulários personalizados para coletar informações da sua congregação. Você pode criar formulários para inscrições em eventos, pesquisas, cartões de visitante, pedidos de membresia e muito mais. Os formulários podem ser vinculados a pessoas do seu banco de dados ou usados como páginas independentes com seu próprio endereço público.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="UZ4dGCNIFw4" title="Criando Formulários e Gerenciando Respostas no B1" next="Lançando o Site da Sua Igreja no B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Para formulários de **Pessoas** (vinculados a registros de pessoas), você precisa primeiro de [pessoas cadastradas no seu banco de dados](../people/adding-people.md).
- Para formulários que recebem **pagamentos**, você precisa ter o [Stripe configurado para doações online](../donations/online-giving-setup.md).

</div>

## Criando um Novo Formulário {#creating-a-new-form}

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Formulários**.
2. Clique em **Adicionar Formulário**.
3. Informe um **nome** para o seu formulário.
4. Escolha o tipo do formulário no menu suspenso **Associar a**:
   - **Pessoas** — Associa as respostas aos [registros de pessoas](../people/adding-people.md) do seu banco de dados. Os formulários de pessoas são preenchidos a partir do registro de uma pessoa, por isso não recebem um link compartilhável.
   - **Independente** — Cria um formulário independente, com seu próprio endereço público, ideal para inscrições externas. Somente os formulários Independentes oferecem uma [foto de cabeçalho](#adding-a-header-photo), um [QR code](#sharing-a-form-with-a-qr-code), um [grupo vinculado](#linking-a-form-to-a-group) e **Criar um registro de pessoa a partir das respostas**.
5. Para um formulário Independente, você pode preencher o restante das suas [propriedades](#configuring-form-properties) agora ou depois.
6. Clique em **Salvar** para criar o formulário.

Seu novo formulário aparecerá na lista. Clique nele para começar a adicionar perguntas.

## Imprimindo um Formulário em Branco {#printing-a-blank-form}

Precisa de uma cópia impressa para entregar -- para um cartão de visitante na recepção, ou para um formulário que alguém sem acesso à internet possa preencher à mão? Clique em **Imprimir** ao lado de um formulário na lista principal de Formulários para abrir uma prévia e, em seguida, clique em **Imprimir**. Os campos em branco são impressos com uma linha ou uma caixa de seleção para cada pergunta, para que as pessoas possam preenchê-los à mão; as perguntas obrigatórias são marcadas com um asterisco. No topo da página aparecem o logotipo da sua igreja (o **Logotipo para Fundo Claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) com o nome da igreja abaixo dele, seguido do nome do formulário. Não há outras opções de impressão -- imprima o formulário inteiro ou nada.

## Compartilhando um Formulário com QR Code {#sharing-a-form-with-a-qr-code}

Os formulários Independentes têm um link **QR Code** ao lado deles na lista principal de Formulários (os formulários arquivados não). Clique nele para abrir um QR code para o endereço público do formulário, com o link exibido abaixo. Clique em **Baixar PNG** para salvar o código como uma imagem que você pode imprimir em boletins ou exibir em slides. Quem escanear o código abre o formulário no celular.

## Adicionando Perguntas {#adding-questions}

1. Abra o seu formulário e vá até a aba **Perguntas**.
2. Clique em **Adicionar Pergunta**.
3. Selecione um **Tipo de campo**:
   - **Caixa de texto** — Para respostas curtas
   - **Número inteiro** e **Decimal** — Para números
   - **Data** — Para seleção de datas
   - **Sim/Não** — Para uma resposta de sim ou não
   - **E-mail** — Para endereços de e-mail
   - **Telefone** — Para entrada de telefone
   - **Área de texto** — Para respostas mais longas
   - **Múltipla escolha** — Para escolher uma entre várias opções
   - **Caixa de seleção** — Para marcar qualquer número de opções
   - **Pagamento** — Para receber pagamentos
4. Informe um **Título** e uma **Descrição** opcional para a pergunta. A descrição aparece abaixo da pergunta quando as pessoas preenchem o formulário, então use-a para dicas como "Inclua quaisquer alergias que devemos conhecer".
5. Preencha os campos extras do tipo escolhido:
   - Para perguntas de texto, número, data, e-mail e telefone, um **Texto de exemplo** opcional mostra um texto de exemplo dentro da caixa vazia.
   - Para **Múltipla escolha** e **Caixa de seleção**, adicione cada opção em **Opções**: informe um **Valor** (o que é salvo) e um **Texto** (o que as pessoas veem) e, em seguida, clique no botão de adicionar. Clique no ícone de remover para retirar uma opção.
   - Para **Pagamento**, escolha o **Fundo** para o qual o dinheiro vai e o **Valor**.
6. Marque **Exigir resposta para esta pergunta** se o campo for obrigatório. (As perguntas de pagamento não têm essa opção.)
7. Clique em **Salvar**.
8. Repita para adicionar mais perguntas.

A aba **Perguntas** lista cada pergunta com o seu tipo e se ela é obrigatória. Clique no título de uma pergunta para editá-la, ou clique em **Excluir** no formulário da pergunta e confirme para removê-la. Use as setas **Mover para cima** e **Mover para baixo** de uma linha para alterar a ordem em que as perguntas aparecem.

:::warning
O tipo de campo **Pagamento** exige que o Stripe esteja configurado. Se você ainda não configurou as doações online, veja [Configuração de Doações Online](../donations/online-giving-setup.md) antes de adicionar campos de pagamento. As pessoas que pagam em um formulário sem fazer login precisam marcar a caixa **Não sou um robô** antes que o cartão seja aceito.
:::

## Gerenciando os Membros do Formulário {#managing-form-members}

Os formulários Independentes têm uma aba **Membros do formulário** para dar acesso somente a esse formulário a determinadas pessoas.

1. Abra o seu formulário e vá até a aba **Membros do formulário**.
2. Em **Adicionar pessoa**, pesquise uma pessoa e clique no ícone de adicionar ao lado do nome dela. Os novos membros começam como **Somente visualização**.
3. Na coluna **Permissão**, clique na função que você quer:
   - **Administrador** — Pode editar o formulário e ver todas as respostas.
   - **Somente visualização** — Pode ver as respostas, mas não pode editar o formulário.
4. Ative **Notificação por e-mail** para quem deve receber um e-mail sempre que o formulário for enviado.

Para remover alguém do formulário, clique em **Remover** na linha dela e confirme.

## Vinculando um Formulário a um Grupo {#linking-a-form-to-a-group}

Você pode vincular qualquer formulário Independente a um grupo -- por exemplo, um formulário de pedidos de oração para um pequeno grupo, ou uma autorização médica para uma viagem de jovens:

1. Abra o formulário e clique em **Editar formulário** (ou clique em **Editar** ao lado do formulário na lista de Formulários).
2. Em **Grupo vinculado**, selecione o grupo, ou deixe em **Nenhum**.
3. Clique em **Salvar**.

Depois que um formulário está vinculado:

- **Os membros do grupo** veem o formulário em uma seção **Formulários** na página do grupo no B1.church enquanto o formulário estiver aberto, com um botão **Preencher** que o abre (veja [Detalhes do Grupo](../../b1-church/groups/group-details.md#linked-forms)).
- **Os líderes do grupo** também veem os formulários fechados e podem ler as respostas de cada envio e imprimi-las (um envio ou **Imprimir todos**). Os líderes só podem visualizar as respostas -- não podem editar o formulário, a menos que também sejam [membros do formulário](#managing-form-members).
- **No B1 Admin**, a página do grupo mostra uma seção **Formulários vinculados** listando cada formulário vinculado como **Aberto** ou **Fechado**. Ela aparece para os líderes do grupo e para as pessoas que podem administrar formulários. Veja [Membros do Grupo](../groups/group-members.md#linked-forms).

Um formulário fica fechado quando está fora do seu período de disponibilidade. Formulários arquivados não aparecem na página do grupo.

### Adicionando Automaticamente os Respondentes a um Grupo {#automatically-adding-submitters-to-a-group}

Vincular um formulário a um grupo não adiciona ninguém a ele por si só. Para incluir todos os respondentes na lista do grupo vinculado, marque também **Criar um registro de pessoa a partir das respostas** nas configurações do formulário e clique em **Salvar**.

Cada vez que alguém envia o formulário, a pessoa encontrada ou recém-criada é adicionada ao grupo (os membros que já estão no grupo são ignorados). Isso é útil em casos como um formulário de inscrição em acampamento que deve montar automaticamente a lista do grupo do acampamento.

### Enviando um E-mail de Acompanhamento {#sending-a-follow-up-email}

Com **Criar um registro de pessoa a partir das respostas** marcada, você também pode enviar um e-mail para cada pessoa que envia o formulário. Preencha **Assunto do e-mail de acompanhamento** e **Texto do e-mail de acompanhamento** nas configurações do formulário. Você pode usar os marcadores `{firstName}` e `{churchName}` em ambos. O e-mail só é enviado quando os dois campos estão preenchidos.

:::info
Os e-mails de acompanhamento só são enviados depois que a sua igreja for aprovada para enviar e-mails de grupo, e eles contam no limite diário de e-mails da sua igreja. Veja [Ativando o E-mail de Grupo para a Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicando um Formulário {#duplicating-a-form}

Para reutilizar um formulário como ponto de partida para um novo, clique em **Duplicar** ao lado do formulário na lista de Formulários e confirme. A mensagem **Formulário duplicado** aparece, e o B1 cria uma cópia exata do formulário -- incluindo todas as perguntas -- que você pode renomear e editar de forma independente.

:::tip
A duplicação é útil para eventos recorrentes em que as perguntas de inscrição são as mesmas de ano para ano. Duplique o formulário do ano passado, atualize o nome e as datas, e está pronto.
:::

## Configurando as Propriedades do Formulário {#configuring-form-properties}

Você pode atualizar o nome e as configurações do formulário a qualquer momento: abra o formulário e clique em **Editar formulário** no lado esquerdo da página, ou clique em **Editar** ao lado do formulário na lista de Formulários. O lado esquerdo da página do formulário mostra o tipo do formulário (**Pessoas** ou **Independente**) e, para os formulários Independentes, se ele é **Público** ou **Restrito**, além do seu **endereço público** exclusivo, que você pode compartilhar com qualquer pessoa.

As configurações de **Editar formulário** são:

- **Nome do formulário** -- O nome exibido no B1 Admin e no topo do formulário.
- **Descrição** *(Independente)* -- Texto exibido acima das perguntas na página pública do formulário, útil para explicar às pessoas para que serve o formulário antes que elas comecem a preenchê-lo.
- **Foto de cabeçalho** *(Independente)* -- Veja [Adicionando uma Foto de Cabeçalho](#adding-a-header-photo).
- **Acesso ao formulário** *(Independente)* -- **Público** permite que qualquer pessoa com o link preencha o formulário; **Restrito** exige que as pessoas façam login no site da sua igreja antes de poderem abri-lo.
- **Definir período de disponibilidade do formulário** *(Independente)* -- Escolha **Sim** e defina uma **Data de início da disponibilidade** e uma **Data de término da disponibilidade** para aceitar respostas somente entre essas datas. Fora delas, o formulário fica fechado.
- **Mensagem de agradecimento** -- O que as pessoas veem depois de enviar (veja abaixo).
- **Modo de exibição** -- **Padrão** mostra todas as perguntas em uma única página; **Conversacional (uma pergunta por vez)** avança pelas perguntas uma a uma.
- **Criar um registro de pessoa a partir das respostas** *(Independente)*, **Grupo vinculado** e os campos de e-mail de acompanhamento -- Veja [Vinculando um Formulário a um Grupo](#linking-a-form-to-a-group) e [Enviando um E-mail de Acompanhamento](#sending-a-follow-up-email).

Clique em **Salvar** para manter as suas alterações. Para remover um formulário permanentemente, clique em **Excluir** nas configurações do formulário e confirme; para mantê-lo, mas ocultá-lo da lista, [arquive-o](./index.md#what-you-can-do).

### Adicionando uma Foto de Cabeçalho {#adding-a-header-photo}

Os formulários Independentes podem exibir uma **Foto de cabeçalho** no topo do formulário. Nos detalhes do formulário, clique na caixa de foto ou em **Adicionar foto** e, em seguida, escolha ou envie uma imagem (ela é recortada no formato 16:9). Clique em **Salvar**. A foto aparece abaixo do nome do formulário, acima da descrição, na página do endereço público do formulário e em qualquer lugar onde o formulário esteja incorporado com o elemento **Formulário** do site. Use **Trocar foto** para substituí-la ou **Remover** para retirá-la.

Use o campo **Mensagem de agradecimento** para definir o que as pessoas veem depois de enviar o formulário, inclusive na página do endereço público do formulário. Se você deixá-lo em branco, elas verão "Obrigado por enviar o formulário!"

:::tip
Os formulários Independentes são ótimos para inscrições em eventos. Compartilhe o endereço público por e-mail ou redes sociais, ou incorpore o formulário diretamente no site da sua igreja.
:::

:::info
Para incorporar um formulário ao seu site B1, acesse o editor do site, adicione uma nova seção e selecione o elemento **Formulário**. Depois, escolha o formulário que você quer exibir. Veja [Gerenciando Páginas](../website/managing-pages.md) para detalhes sobre a edição do seu site.
:::
