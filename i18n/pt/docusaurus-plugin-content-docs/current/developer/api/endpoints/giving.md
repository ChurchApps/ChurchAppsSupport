---
title: "Endpoints de Ofertas"
---

# Endpoints de Ofertas

<div class="article-intro">

O módulo de Ofertas (Giving) gerencia doações, fundos, processamento de pagamentos, assinaturas e operações financeiras relacionadas. Ele oferece suporte a vários gateways de pagamento (Stripe, PayPal), trata doações únicas e recorrentes, acompanha lotes de doações e fornece o processamento de webhooks para eventos de pagamento assíncronos.

</div>

**Caminho base:** `/giving`

## Doações

Caminho base: `/giving/donations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou o próprio personId | Lista todas as doações. Filtra por `?batchId=` ou `?personId=`. Com `?personId=`, as contribuições para fundos não dedutíveis são omitidas (como nos comprovantes de contribuição), a menos que quem chama com Donations.View adicione `&includeNonDeductible=1`, o que o registro de pessoa do B1Admin faz |
| GET | `/:id` | JWT | Donations.View | Obtém uma doação pelo ID |
| GET | `/my` | JWT | — | Obtém as doações do usuário atual |
| GET | `/my/summary?year=` | JWT | — | Total de ofertas do usuário atual em um ano (padrão: este ano): `{ year, total, count, currency, isConverted }`, com os totais convertidos para a moeda da igreja. Alimenta a prévia de ofertas na página inicial do membro |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtém o resumo de doações. Filtra por `?startDate=&endDate=&type=`. Use `type=person` para o detalhamento por pessoa |
| GET | `/testEmail` | Público | — | Envia um e-mail de teste (desenvolvimento/depuração) |
| POST | `/` | JWT | Donations.Edit | Cria ou atualiza doações (em lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui uma doação |

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

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. A operação de exclusão também remove todas as doações do lote.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos os lotes de doações |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtém um lote de doações pelo ID |
| POST | `/` | JWT | Donations.Edit | Cria ou atualiza lotes de doações |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um lote e todas as suas doações |

## Doar

Caminho base: `/giving/donate`

Trata o fluxo de doação voltado ao público, incluindo cobranças, assinaturas, webhooks e cálculos de taxas. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Público | — | Obtém os gateways de pagamento disponíveis para uma igreja (somente chaves públicas) |
| POST | `/client-token` | JWT | — | Gera um token de cliente para a inicialização do gateway |
| POST | `/create-order` | JWT | — | Cria um pedido de pagamento (checkout no estilo PayPal) |
| POST | `/charge` | JWT | — | Processa a cobrança de uma doação única |
| POST | `/subscribe` | JWT | — | Cria uma assinatura de doação recorrente |
| POST | `/log` | Público | — | Registra uma doação. Corpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Público | — | Recebe eventos de webhook de pagamento (Stripe, PayPal). Requer `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reprocessa eventos do Stripe em um intervalo de datas. Corpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Público | — | Calcula as taxas da transação. Corpo: `{ type, provider, gatewayId, amount, currency }`. Requer `?churchId=` |
| POST | `/captcha-verify` | Público | — | Verifica o token do reCAPTCHA. Corpo: `{ token }` |

### Exemplo: Processar a Cobrança de uma Doação

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

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. A permissão `view` é `null` (nenhuma permissão é necessária para visualizar os fundos).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos os fundos |
| GET | `/:id` | JWT | — | Obtém um fundo pelo ID |
| GET | `/churchId/:churchId` | Público | — | Obtém todos os fundos de uma igreja específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Público | — | Obtém o total de doações de um fundo: `{ fundId, totalAmount, donationCount }`. Alimenta o elemento `campaignProgress` do construtor de sites |
| POST | `/` | JWT | Donations.Edit | Cria ou atualiza fundos |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um fundo |

## Doações por Fundo

Caminho base: `/giving/funddonations`

Acompanha como as doações individuais são alocadas entre os fundos. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Lista as doações por fundo. Filtra por `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Opcionalmente, adicione `?startDate=&endDate=` para filtrar por data |
| GET | `/:id` | JWT | Donations.View | Obtém uma doação por fundo pelo ID |
| GET | `/my` | JWT | — | Obtém as doações por fundo do usuário atual |
| POST | `/` | JWT | Donations.Edit | Cria ou atualiza doações por fundo (em lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui uma doação por fundo |

## Gateways

Caminho base: `/giving/gateways`

Gerencia as configurações dos gateways de pagamento (Stripe, PayPal etc.). Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados. Os segredos dos gateways são criptografados em repouso.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos os gateways da igreja |
| GET | `/:id` | JWT | Settings.Edit | Obtém um gateway pelo ID |
| GET | `/churchId/:churchId` | Público | — | Obtém os gateways de uma igreja (somente chaves públicas) |
| GET | `/configured/:churchId` | Público | — | Verifica se uma igreja tem um gateway de pagamento configurado |
| POST | `/` | JWT | Settings.Edit | Cria ou atualiza gateways (criptografa as chaves, provisiona webhooks e produtos) |
| PATCH | `/:id` | JWT | Settings.Edit | Atualiza parcialmente um gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Exclui um gateway (também remove seus webhooks) |

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos os clientes |
| GET | `/:id` | JWT | Donations.ViewSummary ou o próprio registro | Obtém um cliente pelo ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou o próprio registro | Obtém as assinaturas de um cliente no gateway |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um cliente |

## Assinaturas

Caminho base: `/giving/subscriptions`

Gerencia as assinaturas de doações recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todas as assinaturas |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtém uma assinatura pelo ID |
| POST | `/` | JWT | Donations.Edit ou a própria assinatura | Atualiza assinaturas no gateway de pagamento |
| DELETE | `/:id` | JWT | Donations.Edit ou a própria assinatura | Cancela uma assinatura e a remove do banco de dados. Corpo: `{ provider, reason }` |

## Fundos da Assinatura

Caminho base: `/giving/subscriptionfunds`

Acompanha a alocação de fundos das assinaturas recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou a própria assinatura | Lista os fundos das assinaturas. Filtra por `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtém um fundo de assinatura pelo ID |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um fundo de assinatura |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou a própria assinatura | Exclui todos os fundos de uma assinatura |

## Formas de Pagamento

Caminho base: `/giving/paymentmethods`

Gerencia as formas de pagamento armazenadas (cartões, contas bancárias) por meio das APIs do gateway de pagamento. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View ou o próprio personId | Obtém todas as formas de pagamento armazenadas de uma pessoa (cartões, contas bancárias) |
| POST | `/addcard` | JWT | — | Anexa uma forma de pagamento do tipo cartão. Corpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou o próprio personId | Atualiza os dados do cartão. Corpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou o próprio personId | Cria um SetupIntent ACH do Stripe para vincular uma conta bancária. Corpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Público | — | Cria um SetupIntent ACH anônimo para doações de visitantes. Corpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou o próprio personId | Adiciona uma conta bancária por meio de token (obsoleto; use `ach-setup-intent`). Corpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou o próprio personId | Atualiza os dados da conta bancária. Corpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou o próprio cliente | Verifica uma conta bancária com micro-depósitos. Corpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou o próprio cliente | Exclui uma forma de pagamento (cartão ou conta bancária) |

## Registro de Eventos

Caminho base: `/giving/eventLog`

Estende `GenericCrudController` com as rotas CRUD: `getById`, `getAll`, `post`, `delete`. Acompanha os eventos de webhook dos gateways de pagamento para auditoria e deduplicação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos os registros de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtém um registro de evento pelo ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtém os registros de eventos filtrados pelo tipo de evento |
| POST | `/` | JWT | Donations.Edit | Cria ou atualiza registros de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um registro de evento |

## Páginas Relacionadas

- [Endpoints de Membresia](./membership) — Pessoas, igrejas, grupos, funções e permissões
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura de Módulos](../module-structure) — Padrões de organização do código
