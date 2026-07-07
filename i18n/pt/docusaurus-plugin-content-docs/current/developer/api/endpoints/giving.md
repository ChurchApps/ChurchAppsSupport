---
title: "Endpoints de Doações"
---

# Endpoints de Doações

<div class="article-intro">

O módulo de Doações gerencia doações, fundos, processamento de pagamentos, assinaturas e operações financeiras relacionadas. Suporta vários gateways de pagamento (Stripe, PayPal), lida com doações única e recorrentes, rastreia lotes de doações e fornece processamento de webhook para eventos de pagamento assíncronos.

</div>

**Caminho base:** `/giving`

## Doações

Caminho base: `/giving/donations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.View ou personId próprio | Listar todas as doações. Filtrar por `?batchId=` ou `?personId=` |
| GET | `/:id` | JWT | Donations.View | Obter uma doação por ID |
| GET | `/my` | JWT | — | Obter doações do usuário atual |
| GET | `/summary` | JWT | Donations.ViewSummary | Obter resumo de doação. Filtrar por `?startDate=&endDate=&type=`. Use `type=person` para divisão por pessoa |
| GET | `/testEmail` | Public | — | Enviar um email de teste (desenvolvimento/depuração) |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar doações (lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Deletar uma doação |

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

### Exemplo: Obter Resumo de Doação

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

## Lotes de Doação

Caminho base: `/giving/donationbatches`

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. A operação de exclusão também remove todas as doações dentro do lote.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os lotes de doação |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um lote de doação por ID |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar lotes de doação |
| DELETE | `/:id` | JWT | Donations.Edit | Deletar um lote e todas as suas doações |

## Doações

Caminho base: `/giving/donate`

Trata o fluxo de doação público, incluindo cobranças, assinaturas, webhooks e cálculos de taxa. Nenhuma rota CRUD base está ativada; todos os endpoints são customizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/gateways/:churchId` | Public | — | Obter gateways de pagamento disponíveis para uma igreja (apenas chaves públicas) |
| POST | `/client-token` | JWT | — | Gerar um token de cliente para inicialização de gateway |
| POST | `/create-order` | JWT | — | Criar uma ordem de pagamento (checkout no estilo PayPal) |
| POST | `/charge` | JWT | — | Processar uma cobrança de doação única |
| POST | `/subscribe` | JWT | — | Criar uma assinatura de doação recorrente |
| POST | `/log` | Public | — | Registrar uma doação. Corpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Receber eventos de webhook de pagamento (Stripe, PayPal). Requer `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reproduzir eventos Stripe para um intervalo de datas. Corpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calcular taxas de transação. Corpo: `{ type, provider, gatewayId, amount, currency }`. Requer `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verificar token reCAPTCHA. Corpo: `{ token }` |

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
| GET | `/churchId/:churchId` | Public | — | Obter todos os fundos para uma igreja específica (pública) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Obter total de doações de um fundo: `{ fundId, totalAmount, donationCount }`. Alimenta o elemento `campaignProgress` do construtor de sites |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar fundos |
| DELETE | `/:id` | JWT | Donations.Edit | Deletar um fundo |

## Doações de Fundos

Caminho base: `/giving/funddonations`

Rastreia como doações individuais são alocadas entre fundos. Nenhuma rota CRUD base está ativada; todos os endpoints são customizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.View | Listar doações de fundos. Filtrar por `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Opcionalmente adicionar `?startDate=&endDate=` para filtagem por data |
| GET | `/:id` | JWT | Donations.View | Obter uma doação de fundo por ID |
| GET | `/my` | JWT | — | Obter doações de fundo do usuário atual |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar doações de fundos (lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Deletar uma doação de fundo |

## Gateways

Caminho base: `/giving/gateways`

Gerencia configurações de gateway de pagamento (Stripe, PayPal, etc.). Nenhuma rota CRUD base está ativada; todos os endpoints são customizados. Os segredos do gateway são criptografados em repouso.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os gateways da igreja |
| GET | `/:id` | JWT | Settings.Edit | Obter um gateway por ID |
| GET | `/churchId/:churchId` | Public | — | Obter gateways de uma igreja (apenas chaves públicas) |
| GET | `/configured/:churchId` | Public | — | Verificar se uma igreja tem um gateway de pagamento configurado |
| POST | `/` | JWT | Settings.Edit | Criar ou atualizar gateways (criptografa chaves, provisiona webhooks e produtos) |
| PATCH | `/:id` | JWT | Settings.Edit | Atualizar parcialmente um gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Deletar um gateway (também remove seus webhooks) |

### Exemplo: Verificar Configuração de Gateway

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

Estende `GenericCrudController` com rotas CRUD: `getAll`, `delete`. Vincula pessoas aos seus registros de cliente do gateway de pagamento.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os clientes |
| GET | `/:id` | JWT | Donations.ViewSummary ou registro próprio | Obter um cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou registro próprio | Obter assinaturas de gateway para um cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Deletar um cliente |

## Assinaturas

Caminho base: `/giving/subscriptions`

Gerencia assinaturas de doações recorrentes. Nenhuma rota CRUD base está ativada; todos os endpoints são customizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todas as assinaturas |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter uma assinatura por ID |
| POST | `/` | JWT | Donations.Edit ou assinatura própria | Atualizar assinaturas com o gateway de pagamento |
| DELETE | `/:id` | JWT | Donations.Edit ou assinatura própria | Cancelar uma assinatura e remover do banco de dados. Corpo: `{ provider, reason }` |

## Fundos de Assinatura

Caminho base: `/giving/subscriptionfunds`

Rastreia alocações de fundos para assinaturas recorrentes. Nenhuma rota CRUD base está ativada; todos os endpoints são customizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.View ou assinatura própria | Listar fundos de assinatura. Filtrar por `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um fundo de assinatura por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Deletar um fundo de assinatura |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou assinatura própria | Deletar todos os fundos de uma assinatura |

## Métodos de Pagamento

Caminho base: `/giving/paymentmethods`

Gerencia métodos de pagamento armazenados (cartões, contas bancárias) através de APIs de gateway de pagamento. Nenhuma rota CRUD base está ativada; todos os endpoints são customizados.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/personid/:id` | JWT | Donations.View ou personId próprio | Obter todos os métodos de pagamento armazenados para uma pessoa (cartões, contas bancárias) |
| POST | `/addcard` | JWT | — | Anexar um método de pagamento de cartão. Corpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou personId próprio | Atualizar detalhes de cartão. Corpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou personId próprio | Criar um Stripe ACH SetupIntent para vinculação de conta bancária. Corpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Criar um ACH SetupIntent anônimo para doações de hóspede. Corpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou personId próprio | Adicionar uma conta bancária via token (descontinuado; use `ach-setup-intent`). Corpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou personId próprio | Atualizar detalhes de conta bancária. Corpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou cliente próprio | Verificar uma conta bancária com micro-depósitos. Corpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou cliente próprio | Deletar um método de pagamento (cartão ou conta bancária) |

## Log de Evento

Caminho base: `/giving/eventLog`

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. Rastreia eventos de webhook do gateway de pagamento para auditoria e desduplicação.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos os logs de evento |
| GET | `/:id` | JWT | Donations.ViewSummary | Obter um log de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obter logs de evento filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Criar ou atualizar logs de evento |
| DELETE | `/:id` | JWT | Donations.Edit | Deletar um log de evento |

## Páginas Relacionadas

- [Endpoints de Membros](./membership) — Pessoas, igrejas, grupos, funções e permissões
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura de Módulo](../module-structure) -- Padrões de organização de código
