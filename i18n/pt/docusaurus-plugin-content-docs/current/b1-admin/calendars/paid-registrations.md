---
title: "Inscrições Pagas"
---

# Inscrições Pagas

<div class="article-intro">

A inscrição em eventos pode ir além de uma simples contagem de participantes. Você pode definir tipos de participante com preços (como Adulto e Criança), oferecer complementos opcionais com seus próprios preços e quantidades, criar códigos de desconto e coletar pagamento na inscrição por meio do provedor de doações já existente da sua igreja. Quando um evento lota, uma lista de espera opcional mantém os membros interessados na fila e os promove automaticamente conforme vagas se abrem.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Ative a inscrição no evento primeiro — veja [Criando Calendários](creating-calendars#enabling-event-registration)
- Para coletar pagamentos, sua igreja precisa ter [as doações on-line configuradas](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Eventos gratuitos não precisam de configuração de doações.

</div>

## Abrindo as Configurações de Inscrição

1. No B1 Admin, vá até a página **Registrations** e abra seu evento (ou abra o evento a partir do calendário).
2. O card **Registration Settings** mostra o básico — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** e **Registration Questions**.
3. Abaixo do básico há três acordeões: **Attendee Types**, **Selections** e **Discount Codes**.

## Tipos de Participante

Os tipos de participante permitem cobrar preços diferentes para diferentes tipos de participantes — e limitar cada um separadamente.

1. Expanda o acordeão **Attendee Types** e clique em **Add Type**.
2. Digite um **Name** (por exemplo, "Adult", "Child", "Student").
3. Defina um **Price**. Use 0 para um tipo gratuito.
4. Opcionalmente, defina uma **Capacity** apenas para esse tipo (por exemplo, apenas 20 vagas para Child). Deixe em branco para não haver limite por tipo.
5. Clique em **Save**.

Durante a inscrição, cada participante escolhe um tipo; tipos esgotados são mostrados como **Sold out** e não podem ser selecionados. A lista de inscritos mostra o tipo de cada participante e as contagens correntes por tipo.

## Seleções

As seleções são complementos pagos opcionais — camisetas, planos de refeição, upgrades de atividades.

1. Expanda o acordeão **Selections** e clique em **Add Selection**.
2. Digite um **Name**, uma **Description** opcional e um **Price** (0 aparece como "Free").
3. Opcionalmente, defina uma **Capacity** (total disponível em todas as inscrições) e um **Max Qty** (o máximo que uma única inscrição pode pedir).
4. Clique em **Save**.

Os inscritos escolhem as quantidades durante a inscrição, e os totais contam contra a capacidade para que você nunca venda em excesso.

## Códigos de Desconto

1. Expanda o acordeão **Discount Codes** e clique em **Add Discount Code**.
2. Digite o **Code** que os inscritos vão digitar.
3. Escolha o **Type** — **Percent** ou **Amount** — e seu **Value**.
4. Opcionalmente, limite o código com uma **Start Date** / **End Date**, um **Min Members** (número mínimo de participantes na inscrição) e **Max Uses**.
5. Clique em **Save**.

Cada código mostra uma contagem de **Uses** para que você possa ver com que frequência ele foi resgatado. Os inscritos recebem feedback instantâneo ao aplicar um código — incluindo mensagens claras quando um código expirou, ainda não começou a valer ou precisa de mais participantes.

## Lista de Espera

Ative **Enable Waitlist** no card Registration Settings. Quando o evento atinge a capacidade:

- Novos inscritos recebem uma vaga na lista de espera em vez de serem recusados. Eles completam a mesma inscrição (o pagamento é ignorado enquanto estão na lista de espera).
- Quando alguém cancela, a inscrição mais antiga na lista de espera é **promovida automaticamente** e recebe um e-mail informando que uma vaga se abriu. Se houver saldo devido, o e-mail contém um link para concluir o pagamento.
- Você pode promover alguém manualmente a qualquer momento com a ação **Promote** em uma linha na lista de espera — útil depois de aumentar a capacidade do evento.

:::info
As inscrições promovidas permanecem *pendentes* até que qualquer saldo seja pago; pagar (ou não ter nada a pagar) as confirma.
:::

## A Lista de Inscritos

Abra um evento na página Registrations para ver todas as inscrições. A tabela mostra **Name**, **Members**, **Type** (o tipo de cada participante), **Paid / Total** (com um aviso de saldo quando ainda há dinheiro devido), **Status** e **Date**, além de chips de contagem por tipo acima da tabela.

- Clique no ícone de detalhes de uma linha para abrir a caixa de diálogo **Registration Details** — membros, seleções, pago/saldo e uma tabela de **Payments** listando cada cobrança (valor, método, data).
- **Export CSV** baixa a lista completa com colunas para membros, tipos de participante, seleções, pago/total/saldo, status e uma coluna para cada pergunta de inscrição.
- **Add Attendee** ainda permite registrar inscrições feitas fora do sistema manualmente.

:::info
Reembolsos não são processados dentro do B1. Se você precisar reembolsar uma inscrição paga cancelada, faça o reembolso pelo painel do seu provedor de doações (por exemplo, Stripe).
:::

## Como Funciona o Pagamento

Os pagamentos passam pelo mesmo gateway de doações que sua igreja já usa para doações — os dados do cartão vão diretamente para o provedor e nunca passam pelos servidores do B1. Os preços são sempre calculados no servidor com base nos tipos, seleções e códigos de desconto configurados, então um inscrito não pode adulterar o total. Membros logados podem pagar com um cartão salvo; visitantes inserem um cartão no momento do pagamento.

## Artigos Relacionados

- [Criando Calendários](creating-calendars#enabling-event-registration) — ative a inscrição e as configurações básicas
- [Configuração de Doações On-line](../donations/online-giving-setup.md) — configure o gateway de pagamento usado no checkout
- [Inscrevendo-se em Eventos](../../b1-church/events/registering) — o que os membros veem ao se inscrever
- [Minhas Inscrições](../../b1-church/events/my-registrations) — como os membros pagam saldos e editam inscrições
