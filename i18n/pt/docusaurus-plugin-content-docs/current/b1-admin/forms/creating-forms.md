---
title: "Criando formularios"
---

# Criando formularios

<div class="article-intro">

Crie formularios personalizados para coletar informacoes da sua congregacao. Voce pode criar formularios para inscricoes em eventos, pesquisas, cartoes de visitante, solicitacoes de membresia e muito mais. Os formularios podem ser vinculados a pessoas no seu banco de dados ou usados como paginas independentes com sua propria URL publica.

</div>

<div class="prereqs">
<h4>Antes de comecar</h4>

- Para formularios **People** (vinculados a registros de pessoas), voce precisa ter [pessoas no seu banco de dados](../people/adding-people.md) primeiro.
- Para formularios que coletam **pagamentos**, voce deve ter o [Stripe configurado para doacao online](../donations/online-giving-setup.md).

</div>

## Criando um novo formulario

1. Navegue ate **Forms** no menu principal.
2. Clique em **Add Form**.
3. Digite um **nome** para o seu formulario.
4. Escolha o tipo de formulario no menu suspenso:
   - **People** — Associa envios a [registros de pessoas](../people/adding-people.md) no seu banco de dados.
   - **Stand Alone** — Cria um formulario independente com sua propria URL publica, ideal para inscricoes externas.
5. Clique em **Save** para criar o formulario.

Seu novo formulario aparecera na lista. Clique nele para comecar a adicionar perguntas.

## Adicionando perguntas

1. Abra seu formulario e va para a aba **Questions**.
2. Clique em **Add Question**.
3. Selecione um **tipo de campo** no menu suspenso Provider. Os tipos disponiveis incluem:
   - **Textbox** — Para respostas de texto curtas
   - **Date** — Para selecao de datas
   - **Email** — Para enderecos de e-mail
   - **Phone Number** — Para entrada de telefone
   - **Multiple Choice** — Para selecionar entre opcoes predefinidas
   - **Payment** — Para coletar pagamentos
4. Digite um **Titulo** e uma **Descricao** opcional para a pergunta.
5. Marque **Require an answer** se o campo for obrigatorio.
6. Clique em **Save**.
7. Repita para adicionar mais perguntas.

:::warning
O tipo de campo **Payment** requer que o Stripe esteja configurado. Se voce ainda nao configurou a doacao online, veja [Configuracao de doacao online](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Gerenciando membros do formulario

1. Abra seu formulario e va para a aba **Members**.
2. Pesquise por uma pessoa e adicione-a com uma funcao:
   - **Admin** — Pode editar o formulario e visualizar todos os envios.
   - **View Only** — Pode visualizar envios, mas nao pode editar o formulario.

## Configurando propriedades do formulario

Voce pode atualizar o nome e as configuracoes do seu formulario a qualquer momento. Para formularios Stand Alone, voce tambem vera uma **URL publica** unica que pode compartilhar com qualquer pessoa.

:::tip
Formularios Stand Alone sao otimos para inscricoes em eventos. Compartilhe a URL publica por e-mail, redes sociais ou incorpore o formulario diretamente no site da sua igreja.
:::

:::info
Para incorporar um formulario no seu site B1, va ao editor do site, adicione uma nova secao e selecione o elemento **Form**. Em seguida, escolha o formulario que deseja exibir. Veja [Gerenciando paginas](../website/managing-pages.md) para detalhes sobre a edicao do seu site.
:::
