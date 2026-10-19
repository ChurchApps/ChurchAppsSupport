---
title: "Endpoints de Giving"
---

# Endpoints de Giving

<div class="article-intro">

O módulo Giving gerencia doações, fundos, processamento de pagamentos, assinaturas e operações financeiras relacionadas. Ele oferece suporte a vários gateways de pagamento (Stripe, PayPal), trata doações únicas e recorrentes, acompanha lotes de doações e fornece processamento de webhooks para eventos de pagamento assíncronos.

</div>

**Caminho base:** `/giving`

## Doações

Caminho base: `/giving/donations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View ou personId próprio | Listar todas as doações. Filtre por `?batchId=` ou `?personId=`. Com `?personId=`, doações para fundos não dedutíveis ficam de fora (como nos extratos de doações), a menos que um chamador com Donations.View adicione `&includeNonDeductible=1`, o que o registro de pessoa do B1Admin faz |
| GET | `/:id` | JWT | Donations.View | Obter uma doação pelo ID |
| GET | `/my` | JWT | — | Obter as doações do usuário atual |
| GET | `/my/summary?year=` | JWT | — | Total de doações do usuário atual em um ano (padrão: este ano): `{ year, total, count, currency, isConverted }`, com os totais convertidos para a moeda da igreja. Alimenta a prévia de doações na página inicial do membro |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Doações com data dentro do intervalo (inclusive). Ambas as datas são obrigatórias no formato `YYYY-MM-DD`, caso contrário `400`. As páginas de extratos de doações do B1Admin solicitam um ano-calendário desta forma, em vez de todo o histórico da igreja |
| GET | `/summary` | JWT | Donations.ViewSummary | Obter o resumo de doações. Filtre por `?startDate=&endDate=&type=`. Use `type=person` para o detalhamento por pessoa |
| GET | `/testEmail` | Público | — | Enviar um e-mail de teste (desenvolvimento/depuração) |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Criar ou atualizar doações (em lote). Apenas com Donations.Enter, tanto o lote de destino quanto (no caso de atualização) o lote atual da doação devem estar abertos, e doações de gateway (as que têm `transactionId`) não podem ser alteradas; caso contrário, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Excluir uma doação. Apenas Donations.Enter: a doação deve estar em um lote aberto e não ser uma doação de gateway, caso contrário `403` |

### Exemplo: Listar Doações por Lote

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Exemplo: Obter o Resumo de Doações

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Lotes de Doações {#donation-batches}

Caminho base: `/giving/donationbatches`

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. A operação de exclusão também remove todas as doações do lote.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary ou Donations.Enter | Listar todos os lotes de doações |
| GET | `/:id` | JWT | Donations.ViewSummary ou Donations.Enter | Obter um lote de doações pelo ID |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Criar ou atualizar lotes de doações. Apenas Donations.Enter: atualizar um lote existente exige que ele esteja aberto, caso contrário `403 { "error": "This batch is closed." }`. `status` é ignorado aqui, portanto salvar um lote não pode reabri-lo |
| POST | `/:id/close` | JWT | Donations.Edit | Fechar um lote: define `status` como `closed`, `closedDate` como agora e `closedBy` como o ID do usuário que fez a chamada. Retorna o lote |
| POST | `/:id/reopen` | JWT | Donations.Edit | Reabrir um lote: define `status` como `open` e limpa `closedDate` e `closedBy`. Retorna o lote |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um lote e todas as suas doações |

Cada lote inclui `status` (`open` ou `closed`; lotes novos e já existentes são `open`), `closedDate` e `closedBy`. Donations.Edit pode alterar doações em qualquer lote; Donations.Enter (exibido como **Enter Donations** no editor de funções) só pode adicionar, alterar ou excluir doações e divisões de fundos enquanto o lote estiver aberto.

## Donate

Caminho base: `/giving/donate`

Trata o fluxo público de doações, incluindo cobranças, assinaturas, webhooks e cálculos de taxas. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/gateways/:churchId` | Público | — | Obter os gateways de pagamento disponíveis para uma igreja (apenas chaves públicas) |
| POST | `/client-token` | JWT | — | Gerar um token de cliente para inicialização do gateway |
| POST | `/create-order` | JWT | — | Criar um pedido de pagamento (checkout no estilo PayPal) |
| POST | `/charge` | JWT | — | Processar uma cobrança de doação única |
| POST | `/subscribe` | JWT | — | Criar uma assinatura de doação recorrente |
| POST | `/log` | Público | — | Registrar uma doação. Corpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Público | — | Receber eventos de webhook de pagamento (Stripe, PayPal). Requer `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reprocessar eventos do Stripe em um intervalo de datas. Corpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Público | — | Calcular taxas de transação. Corpo: `{ type, provider, gatewayId, amount, currency }`. Requer `?churchId=` |
| POST | `/captcha-verify` | Público | — | Verificar o token do reCAPTCHA. Corpo: `{ token }` |

### Exemplo: Processar uma Cobrança de Doação

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Exemplo: Criar uma Assinatura Recorrente

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Fundos

Caminho base: `/giving/funds`

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. A permissão `view` é `null` (nenhuma permissão é necessária para visualizar fundos).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listar todos os fundos |
| GET | `/:id` | JWT | — | Obter um fundo pelo ID |
| GET | `/churchId/:churchId` | Público | — | Obter todos os fundos de uma igreja específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Público | — | Obter o total de doações de um fundo: `{ fundId, totalAmount, donationCount }`. Alimenta o elemento `campaignProgress` do construtor de sites |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar fundos |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um fundo |

## Doações por Fundo

Caminho base: `/giving/funddonations`

Acompanha como as doações individuais são alocadas nos fundos. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View | Listar doações por fundo. Filtre por `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Opcionalmente adicione `?startDate=&endDate=` para filtrar por data |
| GET | `/:id` | JWT | Donations.View | Obter uma doação por fundo pelo ID |
| GET | `/my` | JWT | — | Obter as doações por fundo do usuário atual |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Criar ou atualizar doações por fundo (em lote). Apenas Donations.Enter: a doação pai deve estar em um lote aberto e não ser uma doação de gateway, caso contrário `403` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Excluir uma doação por fundo. Mesma regra de lote aberto para Donations.Enter |

## Gateways

Caminho base: `/giving/gateways`

Gerencia as configurações dos gateways de pagamento (Stripe, PayPal, etc.). Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados. Os segredos dos gateways são criptografados em repouso.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listar todos os gateways da igreja |
| GET | `/:id` | JWT | Settings.Edit | Obter um gateway pelo ID |
| GET | `/churchId/:churchId` | Público | — | Obter os gateways de uma igreja (apenas chaves públicas) |
| GET | `/configured/:churchId` | Público | — | Verificar se uma igreja tem um gateway de pagamento configurado |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar gateways (criptografa as chaves, provisiona webhooks e produtos) |
| PATCH | `/:id` | JWT | Settings.Edit | Atualizar parcialmente um gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Excluir um gateway (também remove seus webhooks) |

### Exemplo: Verificar a Configuração do Gateway

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Clientes

Caminho base: `/giving/customers`

Estende `GenericCrudController` com as rotas CRUD: `getAll`, `delete`. Vincula pessoas aos seus registros de cliente no gateway de pagamento.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os clientes |
| GET | `/:id` | JWT | Donations.ViewSummary ou registro próprio | Obter um cliente pelo ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou registro próprio | Obter as assinaturas do gateway de um cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um cliente |

## Assinaturas

Caminho base: `/giving/subscriptions`

Gerencia as assinaturas de doações recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todas as assinaturas |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter uma assinatura pelo ID |
| POST | `/` | JWT | Donations.Edit ou assinatura própria | Atualizar assinaturas no gateway de pagamento |
| DELETE | `/:id` | JWT | Donations.Edit ou assinatura própria | Cancelar uma assinatura e removê-la do banco de dados. Corpo: `{ provider, reason }` |

## Fundos da Assinatura

Caminho base: `/giving/subscriptionfunds`

Acompanha as alocações de fundos das assinaturas recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View ou assinatura própria | Listar os fundos das assinaturas. Filtre por `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um fundo de assinatura pelo ID |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um fundo de assinatura |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou assinatura própria | Excluir todos os fundos de uma assinatura |

## Formas de Pagamento

Caminho base: `/giving/paymentmethods`

Gerencia as formas de pagamento salvas (cartões, contas bancárias) por meio das APIs do gateway de pagamento. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/personid/:id` | JWT | Donations.View ou personId próprio | Obter todas as formas de pagamento salvas de uma pessoa (cartões, contas bancárias) |
| POST | `/addcard` | JWT | — | Anexar uma forma de pagamento do tipo cartão. Corpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou personId próprio | Atualizar os dados do cartão. Corpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou personId próprio | Criar um SetupIntent ACH do Stripe para vincular uma conta bancária. Corpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Público | — | Criar um SetupIntent ACH anônimo para doações de convidados. Corpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou personId próprio | Adicionar uma conta bancária por meio de token (obsoleto; use `ach-setup-intent`). Corpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou personId próprio | Atualizar os dados da conta bancária. Corpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou cliente próprio | Verificar uma conta bancária com micro-depósitos. Corpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou cliente próprio | Excluir uma forma de pagamento (cartão ou conta bancária) |

## Log de Eventos

Caminho base: `/giving/eventLog`

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. Registra os eventos de webhook do gateway de pagamento para auditoria e deduplicação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os logs de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um log de evento pelo ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obter logs de eventos filtrados pelo tipo de evento |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar logs de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um log de evento |

## Páginas Relacionadas

- [Endpoints de Membership](./membership) — Pessoas, igrejas, grupos, funções e permissões
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura do Módulo](../module-structure) — Padrões de organização do código
