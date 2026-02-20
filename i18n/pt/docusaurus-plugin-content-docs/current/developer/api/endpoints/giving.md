---
title: "Endpoints de Doações"
---

# Endpoints de Doações

<div class="article-intro">

O módulo de Doações gerencia doações, fundos, processamento de pagamentos, assinaturas e operações financeiras relacionadas. Ele suporta múltiplos gateways de pagamento (Stripe, PayPal), lida com doações únicas e recorrentes, rastreia lotes de doações e fornece processamento de webhooks para eventos de pagamento assíncronos.

</div>

**Caminho base:** `/giving`

## Doações

Caminho base: `/giving/donations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.View ou próprio personId | Listar todas as doações. Filtrar por `?batchId=` ou `?personId=` |
| GET | `/:id` | JWT | Donations.View | Obter uma doação por ID |
| GET | `/my` | JWT | — | Obter doações do usuário atual |
| GET | `/summary` | JWT | Donations.ViewSummary | Obter resumo de doações. Filtrar por `?startDate=&endDate=&type=`. Use `type=person` para detalhamento por pessoa |
| GET | `/testEmail` | Público | — | Enviar um email de teste (desenvolvimento/depuração) |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar doações (lote) |
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

### Exemplo: Obter Resumo de Doações

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

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. A operação de exclusão também remove todas as doações dentro do lote.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os lotes de doações |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um lote de doação por ID |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar lotes de doações |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um lote e todas as suas doações |

## Doar

Caminho base: `/giving/donate`

Lida com o fluxo de doação voltado ao público, incluindo cobranças, assinaturas, webhooks e cálculos de taxas. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/gateways/:churchId` | Público | — | Obter gateways de pagamento disponíveis para uma igreja (apenas chaves públicas) |
| POST | `/client-token` | JWT | — | Gerar um token de cliente para inicialização do gateway |
| POST | `/create-order` | JWT | — | Criar uma ordem de pagamento (checkout estilo PayPal) |
| POST | `/charge` | JWT | — | Processar uma cobrança de doação única |
| POST | `/subscribe` | JWT | — | Criar uma assinatura de doação recorrente |
| POST | `/log` | Público | — | Registrar uma doação. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Público | — | Receber eventos de webhook de pagamento (Stripe, PayPal). Requer `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reproduzir eventos do Stripe para um intervalo de datas. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Público | — | Calcular taxas de transação. Body: `{ type, provider, gatewayId, amount, currency }`. Requer `?churchId=` |
| POST | `/captcha-verify` | Público | — | Verificar token reCAPTCHA. Body: `{ token }` |

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

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. A permissão `view` é `null` (nenhuma permissão necessária para visualizar fundos).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os fundos |
| GET | `/:id` | JWT | — | Obter um fundo por ID |
| GET | `/churchId/:churchId` | Público | — | Obter todos os fundos de uma igreja específica (público) |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar fundos |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um fundo |

## Doações por Fundo

Caminho base: `/giving/funddonations`

Rastreia como doações individuais são alocadas entre fundos. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.View | Listar doações por fundo. Filtrar por `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Opcionalmente adicionar `?startDate=&endDate=` para filtro por data |
| GET | `/:id` | JWT | Donations.View | Obter uma doação por fundo por ID |
| GET | `/my` | JWT | — | Obter doações por fundo do usuário atual |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar doações por fundo (lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir uma doação por fundo |

## Gateways

Caminho base: `/giving/gateways`

Gerencia configurações de gateway de pagamento (Stripe, PayPal, etc.). Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados. Os segredos do gateway são criptografados em repouso.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os gateways da igreja |
| GET | `/:id` | JWT | Settings.Edit | Obter um gateway por ID |
| GET | `/churchId/:churchId` | Público | — | Obter gateways de uma igreja (apenas chaves públicas) |
| GET | `/configured/:churchId` | Público | — | Verificar se uma igreja tem um gateway de pagamento configurado |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar gateways (criptografa chaves, provisiona webhooks e produtos) |
| PATCH | `/:id` | JWT | Settings.Edit | Atualizar parcialmente um gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Excluir um gateway (também remove seus webhooks) |

### Exemplo: Verificar Configuração do Gateway

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

Estende `GenericCrudController` com rotas CRUD: `getAll`, `delete`. Vincula pessoas aos seus registros de clientes no gateway de pagamento.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os clientes |
| GET | `/:id` | JWT | Donations.ViewSummary ou próprio registro | Obter um cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou próprio registro | Obter assinaturas do gateway para um cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um cliente |

## Assinaturas

Caminho base: `/giving/subscriptions`

Gerencia assinaturas de doações recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todas as assinaturas |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter uma assinatura por ID |
| POST | `/` | JWT | Donations.Edit ou própria assinatura | Atualizar assinaturas com o gateway de pagamento |
| DELETE | `/:id` | JWT | Donations.Edit ou própria assinatura | Cancelar uma assinatura e remover do banco de dados. Body: `{ provider, reason }` |

## Fundos de Assinatura

Caminho base: `/giving/subscriptionfunds`

Rastreia alocações de fundos para assinaturas recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.View ou própria assinatura | Listar fundos de assinatura. Filtrar por `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um fundo de assinatura por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um fundo de assinatura |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou própria assinatura | Excluir todos os fundos de uma assinatura |

## Métodos de Pagamento

Caminho base: `/giving/paymentmethods`

Gerencia métodos de pagamento armazenados (cartões, contas bancárias) via APIs de gateway de pagamento. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/personid/:id` | JWT | Donations.View ou próprio personId | Obter todos os métodos de pagamento armazenados de uma pessoa (cartões, contas bancárias) |
| POST | `/addcard` | JWT | — | Adicionar um método de pagamento por cartão. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou próprio personId | Atualizar detalhes do cartão. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou próprio personId | Criar um SetupIntent ACH do Stripe para vinculação de conta bancária. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Público | — | Criar um SetupIntent ACH anônimo para doações de visitantes. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou próprio personId | Adicionar conta bancária via token (descontinuado; use `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou próprio personId | Atualizar detalhes da conta bancária. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou próprio cliente | Verificar conta bancária com micro-depósitos. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou próprio cliente | Excluir um método de pagamento (cartão ou conta bancária) |

## Log de Eventos

Caminho base: `/giving/eventLog`

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. Rastreia eventos de webhook do gateway de pagamento para auditoria e deduplicação.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os logs de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um log de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obter logs de eventos filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar logs de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Excluir um log de evento |

## Páginas Relacionadas

- [Endpoints de Membros](./membership) — Pessoas, igrejas, grupos, papéis e permissões
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura do Módulo](../module-structure) — Padrões de organização de código
