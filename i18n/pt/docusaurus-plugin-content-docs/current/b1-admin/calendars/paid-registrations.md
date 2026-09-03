---
title: "Registros pagos"
---

# Registros pagos

<div class="article-intro">

O registro de eventos pode ir além de uma simples contagem de cabeças. Você pode definir tipos de inscritos com preço (como Adulto e Criança), oferecer complementos opcionais com seus próprios preços e quantidades, criar códigos de desconto e coletar pagamento no registro através do provedor de doação existente de sua igreja. Quando um evento fica cheio, uma lista de espera opcional mantém os membros interessados em fila e os promove automaticamente conforme os lugares se abrem.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Ative o registro no evento primeiro — veja [Criando Calendários](creating-calendars#enabling-event-registration)
- Para coletar pagamentos, sua igreja precisa [doação online configurada](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Eventos gratuitos não precisam de configuração de doação.

</div>

## Abrindo as configurações de registro

1. No B1 Admin, vá para a página **Registros** e abra seu evento (ou abra o evento de seu calendário).
2. O cartão **Configurações de Registro** mostra o básico — **Ativar Registro**, **Capacidade**, **Registro Abre/Fecha**, **Tags** e **Perguntas de Registro**.
3. Abaixo do básico há três acordeões: **Tipos de Inscritos**, **Seleções** e **Códigos de Desconto**.

## Tipos de inscritos

Os tipos de inscritos permitem que você cobre preços diferentes para diferentes tipos de inscritos — e limite cada um separadamente.

1. Expanda o acordeão **Tipos de Inscritos** e clique em **Adicionar tipo**.
2. Insira um **Nome** (p.ex. "Adulto", "Criança", "Estudante").
3. Defina um **Preço**. Use 0 para um tipo gratuito.
4. Opcionalmente defina uma **Capacidade** apenas para este tipo (p.ex. apenas 20 lugares para Criança). Deixe em branco para nenhum limite por tipo.
5. Clique em **Salvar**.

Durante o registro, cada inscrito escolhe um tipo; tipos esgotados são mostrados como **Esgotado** e não podem ser selecionados. O relatório mostra o tipo de cada inscrito e contagens contínuas por tipo.

## Seleções

Seleções são complementos opcionais com preço — camisetas, planos de refeição, atualizações de atividades.

1. Expanda o acordeão **Seleções** e clique em **Adicionar seleção**.
2. Insira um **Nome**, **Descrição** opcional e um **Preço** (0 mostra como "Gratuito").
3. Opcionalmente defina uma **Capacidade** (total disponível entre todos os registros) e uma **Quantidade máxima** (o máximo que um registro pode encomendar).
4. Clique em **Salvar**.

Os inscritos escolhem quantidades durante o registro e os totais contam contra a capacidade para que você nunca venda em excesso.

## Códigos de desconto

1. Expanda o acordeão **Códigos de Desconto** e clique em **Adicionar código de desconto**.
2. Insira o **Código** que os inscritos digitarão.
3. Escolha o **Tipo** — **Percentual** ou **Valor** — e seu **Valor**.
4. Opcionalmente limite o código com uma **Data de Início** / **Data de Término**, um **Mínimo de Membros** (número mínimo de inscritos no registro) e **Máximo de Usos**.
5. Clique em **Salvar**.

Cada código mostra uma contagem de **Usos** para que você possa ver com que frequência foi resgatado. Os inscritos recebem feedback instantâneo quando aplicam um código — incluindo mensagens claras quando um código expirou, não começou ou precisa de mais inscritos.

## Lista de espera

Ative **Ativar lista de espera** no cartão Configurações de Registro. Quando o evento atingir a capacidade:

- Novos inscritos recebem um lugar na lista de espera em vez de serem rejeitados. Eles completam o mesmo registro (o pagamento é pulado enquanto estão na lista de espera).
- Quando alguém cancela, o registro mais antigo na lista de espera é **promovido automaticamente** e recebe um email informando que um lugar se abriu. Se eles tiverem um saldo devedor, o email os vincula para completar o pagamento.
- Você pode promover alguém manualmente a qualquer momento com a ação **Promover** em uma linha na lista de espera — útil após aumentar a capacidade do evento.

:::info
Os registros promovidos permanecem *pendentes* até que qualquer saldo seja pago; o pagamento (ou não ter nada a pagar) os confirma.
:::

## O relatório de registro

Abra um evento da página Registros para ver cada registro. A tabela mostra **Nome**, **Membros**, **Tipo** (tipo de cada inscrito), **Pago / Total** (com aviso de saldo quando dinheiro ainda é devido), **Status** e **Data**, mais chips de contagem por tipo acima da tabela.

- Clique no ícone de detalhes de uma linha para abrir a caixa de diálogo **Detalhes do Registro** — membros, seleções, pago/saldo e uma tabela **Pagamentos** listando cada cobrança (valor, método, data).
- **Exportar CSV** baixa o relatório completo com colunas para membros, tipos de inscritos, seleções, pago/total/saldo, status e uma coluna por pergunta de registro.
- **Adicionar inscrito** ainda permite que você registre inscrições offline manualmente.

:::info
Os reembolsos não são processados dentro de B1. Se você precisar reembolsar um registro pago cancelado, emita o reembolso do painel do seu provedor de doações (p.ex. Stripe).
:::

## Como o pagamento funciona

Os pagamentos passam pelo mesmo gateway de doação que sua igreja já usa para doações — os detalhes do cartão vão direto para o provedor e nunca tocam nos servidores de B1. Os preços são sempre calculados no servidor a partir de seus tipos, seleções e códigos de desconto configurados, para que um inscrito não possa adulterar o total. Os membros conectados podem pagar com um cartão salvo; os convidados inserem um cartão no checkout.

## Artigos relacionados

- [Criando Calendários](creating-calendars#enabling-event-registration) — ative o registro e as configurações básicas
- [Configuração de doação online](../donations/online-giving-setup.md) — configure o gateway de pagamento usado no checkout
- [Registrando para eventos](../../b1-church/events/registering) — o que os membros veem quando se inscrevem
- [Meus registros](../../b1-church/events/my-registrations) — como os membros pagam saldos e editam registros
