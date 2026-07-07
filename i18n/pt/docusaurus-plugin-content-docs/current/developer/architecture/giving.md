---
title: "Arquitetura de Doações"
---

# Arquitetura de Doações

<div class="article-intro">

O ChurchApps executa doações em um modelo de gateway-rail: a igreja mantém sua própria conta Stripe (ou PayPal, ou Kingdom Funding), e B1 nunca fica no caminho do dinheiro como um processador de plataforma. Os dados do cartão são tokenizados no navegador e nunca atingem um servidor ChurchApps. Esta página mapeia toda a pilha — o registro de provedor do lado do cliente em `@churchapps/apphelper`, a abstração de gateway GivingApi, o modelo de dados de doação e como webhooks de gateway reconciliam de volta ao banco de dados.

</div>

## Visão Geral

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Três princípios mantêm em toda a pilha:

1. **O gateway mantém o cartão.** Todo widget de entrada de provedor tokeniza no navegador; a API apenas recebe um token, nonce ou id de pedido.
2. **Uma abstração, muitos provedores.** O navegador resolve um `PaymentProvider` de um registro; o servidor resolve um `IGatewayProvider` de uma fábrica. Ambos usam como chave o mesmo nome de provedor normalizado armazenado no registro do gateway.
3. **Webhooks são a fonte da verdade para liquidação.** Uma resposta de cobrança é registrada otimisticamente, mas o webhook assinado do gateway é o que confirma (ou cria) a doação completa, com guardas de idempotência em ambos os lados.

## Cliente: o registro de provedor de pagamento (`@churchapps/apphelper`)

O registro vive em `Packages/apphelper/src/donations/providers/`, com widgets e auxiliares de cada provedor sob sua própria subpasta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — nada fora de `providers/` se ramifica em um nome de provedor. Um `PaymentProvider` (veja `providers/types.ts`) agrupa tudo que um aplicativo hospedeiro precisa para um gateway: um `descriptor` (rótulos de admin, moedas suportadas, campos de taxa, taxas padrão, URLs de painel/inscrição), um conjunto de sinalizador `capabilities` (cartões salvos, ACH, recorrência, entrada de cartão novo embutida, salvamento implícito no tokenize), os widgets React para entrada de membro (`MemberWrapper`/`MemberEntry`), doação de convidado (`GuestForm`), edição de método salvo (`MethodEditForm`) e pagamentos de pergunta de formulário (`FormPayment`), mais `buildChargeRequest(ctx, token)` — o único lugar onde a forma de payload de cobrança difere por provedor. O `MemberWrapper` de cada provedor carrega seu próprio SDK do chave pública do registro do gateway, para que aplicativos hospedeiros nunca importem um SDK de gateway (B1App e B1Admin não têm dependência `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qual gateway de uma igreja uma superfície deve usar.

`providers/registry.ts` mantém os integrados. Eles são **referenciados por valor**, não registrados através de um efeito colateral de módulo, portanto tree-shaking de um bundler nunca pode descartar o registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Função | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resolver por nome normalizado; retorna para Stripe para que um provedor mal configurado nunca faça hard-crash do formulário de doador |
| `registerPaymentProvider(p)` | Registrar um provedor extra em tempo de execução (para um gateway personalizado de um aplicativo hospedeiro) |
| `listPaymentProviders()` | Enumerar integrados + personalizado — usado para construir a lista suspensa de gateway do admin |
| `hasPaymentProvider(name)` | Verificação de associação |

**Provedores de cliente integrados: Stripe, PayPal, Kingdom Funding.** B1App e B1Admin apenas *leem* o registro (`getPaymentProvider`, `listPaymentProviders`); nenhum chama `registerPaymentProvider` — o registro permanece dentro do apphelper.

Cada provedor tokeniza diferentemente, mas todos mantêm o cartão fora de B1:

| Provedor | Widget de Entrada | Token Retornado para API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | ID de método de pagamento (`pm_…`); banco via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Formulário de tokenizador hospedado com chave da chave pública do gateway | nonce de uso único |
| PayPal | PayPal Hosted Fields; pedido de servidor construído via `/donate/client-token` + `/donate/create-order` | id de pedido capturado |

O `finalizeResult` do Stripe executa 3-D Secure / SCA no navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes da doação ser considerada completa; o formulário compartilhado apenas chama `provider.finalizeResult(result)` sem conhecimento do que faz.

## Servidor: a abstração de gateway (GivingApi)

O módulo `/giving` (`Api/src/modules/giving`) expõe a superfície REST; a fiação de gateway vive em `Api/src/shared/helpers`. `DonateController` nunca fala com um SDK de gateway diretamente — passa através de `GatewayService`, que resolve o `IGatewayProvider` correto de `GatewayFactory` e passa um `GatewayConfig` descriptografado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) é o contrato que todo gateway implementa — ciclo de vida do webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), taxas (`calculateFees`), tratamento de método salvo (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), e extras opcionais (clientes, pedidos, SetupIntents, replay de evento). Cada classe de provedor declara sua própria matriz `capabilities` (moedas suportadas, ACH, reembolsos, requisitos de assinatura, limites de transação) — `GatewayService.getProviderCapabilities(provider)` apenas lê — e sinalizadores como `logsDonationsImmediately` acionam comportamento do controlador sem nenhum condicional de nome de provedor nos controladores.

**Provedores de servidor registrados em `GatewayFactory`:**

| Provedor | Disponibilidade |
|----------|-------------|
| Stripe | Sempre ativado |
| PayPal | Sempre ativado |
| Kingdom Funding | Sempre ativado |
| Square | Opt-in via sinalizador de ambiente `ENABLE_SQUARE` |
| ePayMints | Opt-in via sinalizador de ambiente `ENABLE_EPAYMINTS` |

Provedores personalizados podem ser registrados em tempo de execução quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` está definido; `AbstractExperimentalGatewayProvider` é a classe base para aqueles. Nomes de provedor são correspondidos sem distinção de maiúsculas.

### Configuração de gateway e segredos

Um admin salva credenciais de gateway via `POST /giving/gateways` (`GatewayController`). Na economia o controlador criptografa as chaves privadas e de webhook com `EncryptionHelper` antes de persistir, depois — em qualquer host não-localhost — exclui o webhook existente da igreja e provisiona um novo apontando para `/giving/donate/webhook/{provider}?churchId=…`. Leituras públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retornam apenas chaves públicas.

## Modelo de dados

O esquema de doação (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos em `models/`) é um esquema MySQL acessado através de Kysely:

| Tabela | Papel |
|-------|------|
| `gateways` | Configuração de provedor por igreja: `provider`, `publicKey`, `privateKey`/`webhookKey` criptografados, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designações de doação (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamento para entrada/relatório (`name`, `batchDate`) |
| `donations` | Um presente: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Alocação de uma doação em um ou mais fundos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Doação recorrente; `id` é o id de assinatura do gateway, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisão de fundo para uma doação recorrente |
| `customers` | Vincula um `personId` ao seu id de cliente do gateway, por `provider` |
| `gatewayPaymentMethods` | Cartões/bancos salvos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Trilha de auditoria de webhook/evento e chave de dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanhas de promessa vinculadas a um fundo, e montante prometido de cada pessoa |

Uma doação é dividida entre fundos através de `fundDonations` — a doação carrega o total, cada `fundDonation` carrega um pedaço. `donations.currency` e `gateways.currency` carregam a moeda ISO; cada provedor anuncia seu `supportedCurrencies` e os montantes são formatados com `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxos de ponta a ponta

### Membro uma vez e recorrente (B1App)

A tela de doação autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compõe três componentes apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. B1App faz o carregamento de dados ao redor — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa a lista de gateway; o provedor resolvido carrega seu próprio SDK da chave pública do gateway. A cobrança em si acontece dentro do apphelper: o provedor resolvido tokeniza o método (novo ou salvo), depois publica para `/giving/donate/charge` para uma doação única ou `/giving/donate/subscribe` para uma recorrente. Doações recorrentes criam uma linha `subscriptions` mais `subscriptionFunds` e entregam o cronograma para o gateway (Stripe Subscriptions, PayPal Billing Plans, ou um cronograma recorrente KF).

### Doação de convidado / anônima

A página de doação pública (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e o painel "dar agora" renderizam `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que injeta reCAPTCHA e o contexto Elements do gateway ao redor do `GuestForm` do provedor. Convidados não obtêm login, nenhum método salvo e nenhum histórico. O fluxo busca `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (apenas chaves públicas), verifica o visitante com `POST /giving/donate/captcha-verify`, tokeniza no navegador e publica para `/giving/donate/charge` (ou `/subscribe`). ACH de convidado usa anônimo `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Registro de admin e importação Stripe (B1Admin)

A seção de doações B1Admin (`B1Admin/src/donations/`) é onde as equipes de finanças funcionam. Entrada em lote (`components/BulkDonationEntry.tsx`) registra presentes em dinheiro/cheque/em natura postando `/giving/donations` depois `/giving/funddonations` — nenhum gateway envolvido. Fundos, lotes, campanhas e declarações cada um mapeiam para suas rotas CRUD `/giving/*`. O painel de doação estilo-membro (`B1Admin/src/donationComponents/`) reutiliza os mesmos componentes apphelper que B1App.

Importação Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) retorna doações feitas fora de B1: chama `POST /giving/donate/replay-stripe-events` com `dryRun: true` para uma visualização, depois `dryRun: false` para importar. O servidor lista eventos Stripe para o intervalo de data e pula qualquer coisa já registrada — correspondida primeiro por id de provedor `eventLogs`, depois por `DonationRepo.findMatchingDonation` (montante + data + pessoa) para que uma re-execução nunca duplique-importe.

## Webhooks e Reconciliação

Pagamentos liquidados e mudanças de estado de assinatura chegam em `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). O processamento é deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega para a verificação de assinatura do provedor; uma assinatura falha retorna 401. Eventos que não precisam de processamento circundam com 200.
2. **Dedup o evento** — `EventLogRepo.loadByProviderId` pula um webhook já registrado em `eventLogs`.
3. **Dedup a doação** — antes de criar qualquer coisa, `DonationRepo.loadByTransactionId` é verificado contra todo id de candidato que a carga útil pode carregar. Isto absorve entregas duplicadas, eventos ACH multi-estágio (pendente → liquidado) e o caso onde `/donate/charge` já registrou a doação otimisticamente.
4. **Aplicar** — o `classifyWebhookEvent(eventType)` do provedor diz o que o evento significa (`donation` pendente/completo, `cancel-subscription` ou `ignore`); pagamentos completos criam uma doação `complete` (ou promovem um existente `pending`), eventos estilo-ACH aterrissam como `pending` até liquidação, e eventos de cancelamento excluem a linha `subscriptions` local. O controlador nunca inspeciona nomes de evento específicos do provedor.

Provedores com `logsDonationsImmediately` (PayPal, Kingdom Funding) têm suas cobranças registradas da resposta `/charge` (nenhuma volta de webhook necessária para o caminho feliz), enquanto Stripe confia em `payment_intent.succeeded` / `invoice.paid` e ACH `payment_intent.processing`. Tratamento de taxa (`POST /giving/donate/fee`, o sinalizador de gateway `payFees`, e `calculateFees` de cada provedor) calcula o aumento bruto de "cobrir as taxas" no lado do doador — B1 não leva nenhum corte de plataforma, portanto nenhuma taxa de aplicação é jamais adicionada.

:::info
Os caminhos de cobrança e webhook escrevem as mesmas linhas `donations` / `fundDonations`. O `transactionId` é a chave de junção que impede um log de cobrança otimista e seu webhook posterior de produzirem duas doações para um presente.
:::

## Páginas Relacionadas

- [Pontos de Extremidade de Doações](../api/endpoints/giving) — superfície REST completa para doações, fundos, lotes, gateways, assinaturas, métodos de pagamento e webhooks
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que envia o registro de provedor de pagamento e componentes de doação
- [Estrutura de Módulo](../api/module-structure) — como o módulo GivingApi é organizado no lado do servidor
