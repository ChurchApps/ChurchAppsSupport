---
title: "Endpoints de Doações"
---

# Endpoints de Doações

<div class="article-intro">

O módulo de Doações gerencia doações, fundos, processamento de pagamentos, assinaturas e outras operações financeiras relacionadas. Ele oferece suporte a múltiplos gateways de pagamento (Stripe, PayPal), trata doações únicas e recorrentes, rastreia lotes de doações e fornece processamento de webhooks para eventos de pagamento assíncronos.

</div>

**Caminho base:** `/giving`

## Doações

Caminho base: `/giving/donations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou próprio personId | Listar todas as doações. Filtrar por `?batchId=` ou `?personId=` |
| GET | `/:id` | JWT | Donations.View | Obter uma doação por ID |
| GET | `/my` | JWT | — | Obter as doações do usuário atual |
| GET | `/summary` | JWT | Donations.ViewSummary | Obter o resumo de doações. Filtrar por `?startDate=&endDate=&type=`. Use `type=person` para o detalhamento por pessoa |
| GET | `/testEmail` | Public | — | Enviar um email de teste (desenvolvimento/depuração) |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar doações (em lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir uma doação |

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

## Lotes de Doações

Caminho base: `/giving/donationbatches`

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. A operação de exclusão também remove todas as doações dentro do lote.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os lotes de doações |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um lote de doações por ID |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar lotes de doações |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um lote e todas as suas doações |

## Doar

Caminho base: `/giving/donate`

Trata o fluxo de doação voltado ao público, incluindo cobranças, assinaturas, webhooks e cálculos de taxas. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Obter os gateways de pagamento disponíveis para uma igreja (apenas chaves públicas) |
| POST | `/client-token` | JWT | — | Gerar um token de cliente para inicialização do gateway |
| POST | `/create-order` | JWT | — | Criar um pedido de pagamento (checkout no estilo PayPal) |
| POST | `/charge` | JWT | — | Processar uma cobrança de doação única |
| POST | `/subscribe` | JWT | — | Criar uma assinatura de doação recorrente |
| POST | `/log` | Public | — | Registrar uma doação. Corpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Receber eventos de webhook de pagamento (Stripe, PayPal). Requer `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reproduzir novamente os eventos do Stripe de um intervalo de datas. Corpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calcular as taxas da transação. Corpo: `{ type, provider, gatewayId, amount, currency }`. Requer `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verificar o token reCAPTCHA. Corpo: `{ token }` |

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

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. A permissão de `view` é `null` (nenhuma permissão é necessária para visualizar fundos).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listar todos os fundos |
| GET | `/:id` | JWT | — | Obter um fundo por ID |
| GET | `/churchId/:churchId` | Public | — | Obter todos os fundos de uma igreja específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Obter o total de doações de um fundo: `{ fundId, totalAmount, donationCount }`. Alimenta o elemento `campaignProgress` do construtor de sites |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar fundos |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um fundo |

## Doações por Fundo

Caminho base: `/giving/funddonations`

Rastreia como as doações individuais são alocadas entre fundos. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Listar doações por fundo. Filtrar por `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Opcionalmente, adicione `?startDate=&endDate=` para filtrar por data |
| GET | `/:id` | JWT | Donations.View | Obter uma doação por fundo por ID |
| GET | `/my` | JWT | — | Obter as doações por fundo do usuário atual |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar doações por fundo (em lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir uma doação por fundo |

## Gateways

Caminho base: `/giving/gateways`

Gerencia as configurações de gateway de pagamento (Stripe, PayPal, etc.). Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados. Os segredos do gateway são criptografados em repouso.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listar todos os gateways da igreja |
| GET | `/:id` | JWT | Settings.Edit | Obter um gateway por ID |
| GET | `/churchId/:churchId` | Public | — | Obter os gateways de uma igreja (apenas chaves públicas) |
| GET | `/configured/:churchId` | Public | — | Verificar se uma igreja tem um gateway de pagamento configurado |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar gateways (criptografa chaves, provisiona webhooks e produtos) |
| PATCH | `/:id` | JWT | Settings.Edit | Atualizar parcialmente um gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Excluir um gateway (também remove seus webhooks) |

### Exemplo: Verificar a Configuração de um Gateway

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

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os clientes |
| GET | `/:id` | JWT | Donations.ViewSummary ou registro próprio | Obter um cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou registro próprio | Obter as assinaturas de gateway de um cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um cliente |

## Assinaturas

Caminho base: `/giving/subscriptions`

Gerencia as assinaturas de doações recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todas as assinaturas |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter uma assinatura por ID |
| POST | `/` | JWT | Donations.Edit ou assinatura própria | Atualizar assinaturas junto ao gateway de pagamento |
| DELETE | `/:id` | JWT | Donations.Edit ou assinatura própria | Cancelar uma assinatura e removê-la do banco de dados. Corpo: `{ provider, reason }` |

## Fundos de Assinatura

Caminho base: `/giving/subscriptionfunds`

Rastreia as alocações de fundos das assinaturas recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou assinatura própria | Listar os fundos de assinatura. Filtrar por `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um fundo de assinatura por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um fundo de assinatura |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou assinatura própria | Excluir todos os fundos de uma assinatura |

## Métodos de Pagamento

Caminho base: `/giving/paymentmethods`

Gerencia os métodos de pagamento armazenados (cartões, contas bancárias) por meio das APIs do gateway de pagamento. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View ou próprio personId | Obter todos os métodos de pagamento armazenados de uma pessoa (cartões, contas bancárias) |
| POST | `/addcard` | JWT | — | Anexar um método de pagamento por cartão. Corpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou próprio personId | Atualizar os dados do cartão. Corpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou próprio personId | Criar um SetupIntent de ACH do Stripe para vincular uma conta bancária. Corpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Criar um SetupIntent de ACH anônimo para doações de convidados. Corpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou próprio personId | Adicionar uma conta bancária via token (obsoleto; use `ach-setup-intent`). Corpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou próprio personId | Atualizar os dados da conta bancária. Corpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou próprio cliente | Verificar uma conta bancária com microdepósitos. Corpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou próprio cliente | Excluir um método de pagamento (cartão ou conta bancária) |

## Log de Eventos

Caminho base: `/giving/eventLog`

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. Rastreia os eventos de webhook do gateway de pagamento para auditoria e deduplicação.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os logs de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um log de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obter logs de eventos filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar logs de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um log de evento |

## Páginas Relacionadas

- [Endpoints de Membros](./membership) — Pessoas, igrejas, grupos, funções e permissões
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura do Módulo](../module-structure) — Padrões de organização de código
