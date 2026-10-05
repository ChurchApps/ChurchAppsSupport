---
title: "Criando Formulários"
---

# Criando Formulários

<div class="article-intro">

Crie formulários personalizados para coletar informações de sua congregação. Você pode criar formulários para inscrições em eventos, pesquisas, cartões de visitante, inscrições de membros e muito mais. Os formulários podem ser vinculados a pessoas em seu banco de dados ou usados como páginas autônomas com sua própria URL pública.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Para formulários de **Pessoas** (vinculados a registros de pessoas), você precisa ter [pessoas em seu banco de dados](../people/adding-people.md) primeiro.
- Para formulários que coletam **pagamentos**, você deve ter [Stripe configurado para doação online](../donations/online-giving-setup.md).

</div>

## Criando um Novo Formulário

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Formulários**.
2. Clique em **Adicionar Formulário**.
3. Insira um **nome** para seu formulário.
4. Escolha o tipo de formulário no menu suspenso:
   - **Pessoas** — Associa submissões com [registros de pessoas](../people/adding-people.md) em seu banco de dados.
   - **Autônomo** — Cria um formulário independente com sua própria URL pública, ideal para inscrições externas.
5. Clique em **Salvar** para criar o formulário.

Seu novo formulário aparecerá na lista. Clique nele para começar a adicionar perguntas.

## Imprimindo um Formulário em Branco

Precisa de uma cópia em papel para distribuir -- para um cartão de visitante na mesa de boas-vindas ou um formulário que alguém sem acesso à internet possa preencher manualmente? Clique no **ícone de impressão** próximo a um formulário na lista principal de Formulários para abrir uma visualização, depois clique em **Imprimir**. Os campos em branco são impressos com uma linha ou caixa de seleção para cada pergunta para que as pessoas possam preenchê-los manualmente; perguntas obrigatórias são marcadas com um asterisco. Não há outras opções de impressão -- imprima o formulário inteiro ou nada.

## Adicionando Perguntas

1. Abra seu formulário e vá para a guia **Perguntas**.
2. Clique em **Adicionar Pergunta**.
3. Selecione um **tipo de campo** no menu suspenso do Provedor. Os tipos disponíveis incluem:
   - **Caixa de Texto** — Para respostas de texto curto
   - **Data** — Para seleção de data
   - **E-mail** — Para endereços de e-mail
   - **Número de Telefone** — Para entrada de telefone
   - **Múltipla Escolha** — Para selecionar entre opções predefinidas
   - **Pagamento** — Para coletar pagamentos
4. Insira um **Título** e **Descrição** opcional para a pergunta.
5. Marque **Exigir uma resposta** se o campo é obrigatório.
6. Clique em **Salvar**.
7. Repita para adicionar mais perguntas.

:::warning
O tipo de campo **Pagamento** requer que Stripe seja configurado. Se você ainda não configurou a doação online, consulte [Configuração de Doação Online](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Gerenciando Membros do Formulário

1. Abra seu formulário e vá para a guia **Membros do Formulário**.
2. Procure por uma pessoa e adicione-a com uma função:
   - **Admin** — Pode editar o formulário e visualizar todas as submissões.
   - **Apenas Visualizar** — Pode visualizar submissões, mas não pode editar o formulário.

## Adicionando Automaticamente Submissores a um Grupo

Quando **Criar um registro de pessoa a partir de submissões** está ativado, você também pode vincular o formulário a um grupo para que cada submetedor seja adicionado automaticamente à lista de um grupo:

1. Abra os **Detalhes** do seu formulário e ative **Criar um registro de pessoa a partir de submissões**.
2. Em **Adicionar submissores a um grupo**, selecione o grupo para adicionar submissores ou deixe definido como **Nenhum**.
3. Clique em **Salvar**.

Cada vez que alguém envia o formulário, a pessoa correspondente ou recém-criada é adicionada ao grupo (membros do grupo existentes são pulados). Isso é útil para coisas como um formulário de inscrição em acampamento que deve construir automaticamente a lista de acampamento.

### Enviando um E-mail de Acompanhamento

Com **Criar um registro de pessoa a partir de submissões** ativado, você também pode enviar um e-mail para cada pessoa que envia o formulário. Preencha **Assunto do E-mail de Acompanhamento** e **Corpo do E-mail de Acompanhamento** nos detalhes do formulário. Você pode usar os tokens `{firstName}` e `{churchName}` em ambos. O e-mail é enviado apenas quando ambos os campos estão preenchidos.

:::info
Os e-mails de acompanhamento são enviados apenas após sua igreja ser aprovada para enviar e-mail em grupo, e contam em relação ao limite diário de e-mail de sua igreja. Consulte [Ativando E-mail em Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicando um Formulário

Para reutilizar um formulário como ponto de partida para um novo, clique no ícone **Duplicar** (ícone de cópia) próximo ao formulário na lista de Formulários. B1 cria uma cópia exata do formulário — incluindo todas as perguntas — que você pode então renomear e editar independentemente.

:::tip
A duplicação é útil para eventos recorrentes onde as perguntas de inscrição permanecem iguais de ano para ano. Duplique o formulário do ano passado, atualize o nome e as datas e você está pronto.
:::

## Configurando Propriedades do Formulário

Você pode atualizar o nome e as configurações de seu formulário a qualquer momento. Para formulários Autônomos, você também verá uma **URL pública** única que você pode compartilhar com qualquer pessoa, juntamente com um campo **Descrição** -- texto mostrado acima das perguntas na página de formulário público, útil para dizer às pessoas qual é o propósito do formulário antes de começarem a preenchê-lo.

Use o campo **Mensagem de Obrigado** para configurar o que as pessoas veem após enviar o formulário, incluindo na página de URL pública do formulário. Se deixar em branco, elas verão "Obrigado por enviar o formulário!"

:::tip
Formulários autônomos são ótimos para inscrições em eventos. Compartilhe a URL pública por e-mail, mídia social ou incorpore o formulário diretamente no site de sua igreja.
:::

:::info
Para incorporar um formulário no seu site B1, vá para o editor do seu site, adicione uma nova seção e selecione o elemento **Formulário**. Depois escolha o formulário que deseja exibir. Consulte [Gerenciando Páginas](../website/managing-pages.md) para detalhes sobre como editar seu site.
:::
