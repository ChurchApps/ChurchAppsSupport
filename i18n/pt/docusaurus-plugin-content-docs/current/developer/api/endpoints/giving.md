---
title: "Endpoints de Giving"
---

# Endpoints de Giving

<div class="article-intro">

O módulo Giving gerencia doações, fundos, processamento de pagamentos, assinaturas e outras operações financeiras relacionadas. Ele oferece suporte a vários gateways de pagamento (Stripe, PayPal), trata doações únicas e recorrentes, acompanha os lotes de doações e processa webhooks para eventos de pagamento assíncronos.

</div>

**Caminho base:** `/giving`

## Doações

Caminho base: `/giving/donations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Donations.View ou o próprio personId | Lista todas as doações. Filtre por `?batchId=` ou `?personId=`. Com `?personId=`, as contribuições para fundos não dedutíveis são excluídas (como nos extratos de doações), a menos que quem chama tenha Donations.View e acrescente `&includeNonDeductible=1`, o que o registro de pessoa do B1Admin faz |
| GET | `/:id` | JWT | Donations.View | Obtém uma doação pelo ID |
| GET | `/my` | JWT | — | Obtém as doações do usuário atual |
| GET | `/my/summary?year=` | JWT | — | Total de doações do usuário atual em um ano (padrão: este ano): `{ year, total, count, currency, isConverted }`, com os totais convertidos para a moeda da igreja. Alimenta a prévia de doações na página inicial de membros |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Doações com data dentro do intervalo (inclusive). Ambas as datas são obrigatórias no formato `YYYY-MM-DD`, caso contrário, `400`. As páginas de extratos de doações do B1Admin solicitam um ano-calendário dessa forma, em vez de todo o histórico da igreja |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtém o resumo de doações. Filtre por `?startDate=&endDate=&type=`. Use `type=person` para o detalhamento por pessoa |
| GET | `/testEmail` | Pública | — | Envia um e-mail de teste (desenvolvimento/depuração) |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Cria ou atualiza doações (em lote). Somente com Donations.Enter, tanto o lote de destino quanto (no caso de atualização) o lote atual da doação precisam estar abertos, e as contribuições de gateway (aquelas com um `transactionId`) não podem ser alteradas; caso contrário, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Exclui uma doação. Somente Donations.Enter: a doação precisa estar em um lote aberto e não pode ser uma contribuição de gateway; caso contrário, `403` |

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

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. A operação de exclusão também remove todas as doações do lote.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary ou Donations.Enter | Lista todos os lotes de doações |
| GET | `/:id` | JWT | Donations.ViewSummary ou Donations.Enter | Obtém um lote de doações pelo ID |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Cria ou atualiza lotes de doações. Somente Donations.Enter: atualizar um lote existente exige que ele esteja aberto; caso contrário, `403 { "error": "This batch is closed." }`. `status` é ignorado aqui, então salvar um lote não pode reabri-lo |
| POST | `/:id/close` | JWT | Donations.Edit | Fecha um lote: define `status` como `closed`, `closedDate` como agora e `closedBy` como o ID do usuário que fez a chamada. Retorna o lote |
| POST | `/:id/reopen` | JWT | Donations.Edit | Reabre um lote: define `status` como `open` e limpa `closedDate` e `closedBy`. Retorna o lote |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um lote e todas as suas doações |

Cada lote inclui `status` (`open` ou `closed`; lotes novos e já existentes são `open`), `closedDate` e `closedBy`. Donations.Edit pode alterar doações em qualquer lote; Donations.Enter (exibido como **Lançar Doações** no editor de funções) só pode adicionar, alterar ou excluir doações e divisões de fundos enquanto o lote estiver aberto.

## Doar

Caminho base: `/giving/donate`

Trata o fluxo de doação voltado ao público, incluindo cobranças, assinaturas, webhooks e cálculos de taxas. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/gateways/:churchId` | Pública | — | Obtém os gateways de pagamento disponíveis para uma igreja (somente chaves públicas) |
| POST | `/client-token` | JWT | — | Gera um token de cliente para inicializar o gateway |
| POST | `/create-order` | JWT | — | Cria um pedido de pagamento (checkout no estilo PayPal) |
| POST | `/charge` | JWT | — | Processa uma cobrança de doação única |
| POST | `/subscribe` | JWT | — | Cria uma assinatura de doação recorrente |
| POST | `/log` | Pública | — | Registra uma doação. Corpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pública | — | Recebe eventos de webhook de pagamento (Stripe, PayPal). Exige `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reprocessa eventos do Stripe em um intervalo de datas. Corpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pública | — | Calcula as taxas da transação. Corpo: `{ type, provider, gatewayId, amount, currency }`. Exige `?churchId=` |
| POST | `/captcha-verify` | Pública | — | Verifica o token do reCAPTCHA. Corpo: `{ token, churchId? }`. Uma resposta humana retorna `{ response: "human", pass }`, em que `pass` é uma credencial assinada de doação para visitantes, válida por 10 minutos (e somente para o `churchId`, quando um é enviado) |

Quando a API é executada com `CAPTCHA_ENFORCE=true`, chamadas de visitantes (não autenticados) para `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` e `/giving/paymentmethods/ach-setup-intent-anon` precisam incluir esse `captchaPass` no corpo; caso contrário, retornam 403 `Captcha verification required`. A credencial pode ser reutilizada até expirar, porque o fluxo de visitantes do Stripe faz duas chamadas (adicionar o cartão e depois cobrar). Chamadas de usuários autenticados não são afetadas. `CAPTCHA_ENFORCE` tem como padrão `false`; os formulários de doação de visitantes do `@churchapps/apphelper` enviam a credencial automaticamente.

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

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. A permissão `view` é `null` (nenhuma permissão é exigida para visualizar fundos).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os fundos |
| GET | `/:id` | JWT | — | Obtém um fundo pelo ID |
| GET | `/churchId/:churchId` | Pública | — | Obtém todos os fundos de uma igreja específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Pública | — | Obtém o total de doações de um fundo: `{ fundId, totalAmount, donationCount }`. Alimenta o elemento `campaignProgress` do criador de sites |
| POST | `/` | JWT | Donations.Edit | Cria ou atualiza fundos |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um fundo |

## Doações por Fundo

Caminho base: `/giving/funddonations`

Acompanha como cada doação individual é alocada nos fundos. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Donations.View | Lista doações por fundo. Filtre por `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Opcionalmente, acrescente `?startDate=&endDate=` para filtrar por data |
| GET | `/:id` | JWT | Donations.View | Obtém uma doação por fundo pelo ID |
| GET | `/my` | JWT | — | Obtém as doações por fundo do usuário atual |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Cria ou atualiza doações por fundo (em lote). Somente Donations.Enter: a doação principal precisa estar em um lote aberto e não pode ser uma contribuição de gateway; caso contrário, `403` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Exclui uma doação por fundo. A mesma regra de lote aberto se aplica a Donations.Enter |

## Gateways

Caminho base: `/giving/gateways`

Gerencia as configurações de gateways de pagamento (Stripe, PayPal etc.). Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados. Os segredos dos gateways são criptografados em repouso.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os gateways da igreja |
| GET | `/:id` | JWT | Settings.Edit | Obtém um gateway pelo ID |
| GET | `/churchId/:churchId` | Pública | — | Obtém os gateways de uma igreja (somente chaves públicas) |
| GET | `/configured/:churchId` | Pública | — | Verifica se uma igreja tem um gateway de pagamento configurado |
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

Estende `GenericCrudController` com rotas CRUD: `getAll`, `delete`. Vincula pessoas aos seus registros de cliente no gateway de pagamento.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos os clientes |
| GET | `/:id` | JWT | Donations.ViewSummary ou o próprio registro | Obtém um cliente pelo ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou o próprio registro | Obtém as assinaturas do gateway de um cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um cliente |

## Assinaturas

Caminho base: `/giving/subscriptions`

Gerencia as assinaturas de doações recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todas as assinaturas |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtém uma assinatura pelo ID |
| POST | `/` | JWT | Donations.Edit ou a própria assinatura | Atualiza assinaturas no gateway de pagamento |
| DELETE | `/:id` | JWT | Donations.Edit ou a própria assinatura | Cancela uma assinatura e a remove do banco de dados. Corpo: `{ provider, reason }` |

## Fundos das Assinaturas

Caminho base: `/giving/subscriptionfunds`

Acompanha a alocação de fundos das assinaturas recorrentes. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Donations.View ou a própria assinatura | Lista os fundos das assinaturas. Filtre por `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtém um fundo de assinatura pelo ID |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um fundo de assinatura |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou a própria assinatura | Exclui todos os fundos de uma assinatura |

## Formas de Pagamento

Caminho base: `/giving/paymentmethods`

Gerencia formas de pagamento salvas (cartões, contas bancárias) por meio das APIs dos gateways de pagamento. Nenhuma rota CRUD base está habilitada; todos os endpoints são personalizados.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/personid/:id` | JWT | Donations.View ou o próprio personId | Obtém todas as formas de pagamento salvas de uma pessoa (cartões, contas bancárias) |
| POST | `/addcard` | JWT | — | Vincula uma forma de pagamento do tipo cartão. Corpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou o próprio personId | Atualiza os dados do cartão. Corpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou o próprio personId | Cria um SetupIntent ACH do Stripe para vincular uma conta bancária. Corpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pública | — | Cria um SetupIntent ACH anônimo para doações de visitantes. Corpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou o próprio personId | Adiciona uma conta bancária por token (descontinuado; use `ach-setup-intent`). Corpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou o próprio personId | Atualiza os dados da conta bancária. Corpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou o próprio cliente | Verifica uma conta bancária com micro-depósitos. Corpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou o próprio cliente | Exclui uma forma de pagamento (cartão ou conta bancária) |

## Log de Eventos

Caminho base: `/giving/eventLog`

Estende `GenericCrudController` com rotas CRUD: `getById`, `getAll`, `post`, `delete`. Registra os eventos de webhook dos gateways de pagamento para auditoria e deduplicação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos os logs de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtém um log de evento pelo ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtém logs de eventos filtrados pelo tipo de evento |
| POST | `/` | JWT | Donations.Edit | Cria ou atualiza logs de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Exclui um log de evento |

## Páginas Relacionadas

- [Endpoints de Membership](./membership) — Pessoas, igrejas, grupos, funções e permissões
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura de Módulos](../module-structure) — Padrões de organização do código
