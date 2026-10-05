---
title: "Arquitetura de Ofertório"
---

# Arquitetura de Ofertório

<div class="article-intro">

ChurchApps executa doações em um modelo de trilho de gateway: a igreja mantém sua própria conta Stripe (ou PayPal, Kingdom Funding ou Paystack), e B1 nunca fica no caminho do dinheiro como um processador de plataforma. Dados de cartão são tokenizados no navegador e nunca alcançam um servidor ChurchApps. Esta página mapeia toda a pilha — o registro do provedor de pagamento no lado do cliente em `@churchapps/apphelper`, a abstração de gateway do GivingApi, o modelo de dados de doação e como webhooks de gateway reconciliam de volta ao banco de dados.

</div>

## Visão Geral

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Gateway de Pagamento                │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ entrada de cartão │  Stripe Elements · KF tokenizer ·     │
│  │ Provedor de           │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ Pagamento             │  │◀── token / nonce ─│  (cartão nunca alcança servidor B1)   │
│  │ registro              │  │                   └──────────▲────────────────┬───────────┘
│  │ getPaymentProvider()  │  │                              │                │
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │
┌─────────────────────────────────────────────┐ (chave secreta)│                │
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  salvar doações + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Três princípios se mantêm em toda a pilha:

1. **O gateway segura o cartão.** O widget de entrada de cada provedor tokeniza no navegador; a API apenas recebe um token, nonce ou order id.
2. **Uma abstração, muitos provedores.** O navegador resolve um `PaymentProvider` de um registro; o servidor resolve um `IGatewayProvider` de uma fábrica. Ambos usam a mesma chave de nome de provedor normalizado armazenado no registro de gateway.
3. **Webhooks são a fonte de verdade para liquidação.** Uma resposta de cobrança é registrada otimisticamente, mas o webhook assinado do gateway é o que confirma (ou cria) a doação completa, com guardas de idempotência em ambos os lados.

## Lado do cliente: o registro de provedor de pagamento (`@churchapps/apphelper`)

O registro vive em `Packages/apphelper/src/donations/providers/`, com widgets e auxiliares de cada provedor sob sua própria pasta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nada fora de `providers/` ramifica em um nome de provedor. Um `PaymentProvider` (veja `providers/types.ts`) agrupa tudo o que um aplicativo host precisa para um gateway: um `descriptor` (rótulos de admin, moedas suportadas, campos de taxa, taxas padrão, URLs de painel/signup), um conjunto de sinalizador `capabilities` (cartões salvos, ACH, recorrente, entrada de novo cartão inline, salvamento implícito em tokenização), os widgets React para entrada de membro (`MemberWrapper`/`MemberEntry`), doação de visitante (`GuestForm`), edição de método salvo (`MethodEditForm`) e pagamentos de pergunta de formulário (`FormPayment`), mais `buildChargeRequest(ctx, token)` — o único lugar a forma de carga de cobrança difere por provedor. O `MemberWrapper` de cada provedor carrega seu próprio SDK do registro de gateway chave pública, portanto os aplicativos host nunca importam uma dependência de SDK de gateway (B1App e B1Admin não têm dependência `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qual dos gateways de uma igreja uma superfície deve usar.

`providers/registry.ts` mantém os incorporados. Eles são **referenciados por valor**, não registrados através de um efeito colateral do módulo, portanto um empacotador tree-shaking nunca pode soltar o registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Função | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resolver por nome normalizado; volta para Stripe portanto um provedor mal configurado nunca hard-crashes o formulário de doador |
| `registerPaymentProvider(p)` | Registre um provedor adicional em tempo de execução (para um gateway customizado de aplicativo host) |
| `listPaymentProviders()` | Enumere incorporados + customizado — usados para construir a lista suspensa de admin de gateway |
| `hasPaymentProvider(name)` | Verificação de associação |

**Provedores de cliente incorporados: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin apenas *leem* o registro (`getPaymentProvider`, `listPaymentProviders`); nenhum chama `registerPaymentProvider` — o registro fica dentro de apphelper.

Cada provedor tokeniza diferentemente, mas todos mantêm o cartão fora de B1:

| Provedor | Widget de entrada | Token retornado para API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; o formulário de visitante também monta um `ExpressCheckoutElement` (Apple Pay / Google Pay, doações de uma só vez) cujo `onConfirm` resolve para o mesmo id `pm_…` | id payment-method (`pm_…`); banco via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` para gateways USD, PAD canadense `acss_debit` (modal de mandato hospedado, mandato `default_for` invoices/subscriptions, cobranças de uma só vez passam o id de mandato) para gateways CAD |
| Kingdom Funding | Formulário tokenizador hospedado com chave de gateway pública | nonce de uso único |
| PayPal | PayPal Hosted Fields (cartão, recorrente) plus PayPal Smart Buttons com Venmo funding (uma só vez); ambos compartilham um carregamento de SDK e o servidor de ordem construído via `/donate/client-token` + `/donate/create-order` | id de ordem capturada |
| Paystack | Popup inline de Paystack (`js.paystack.co/v2/inline.js`) — o popup em si pega o pagamento (cartão, dinheiro móvel, transferência bancária, USSD) | referência de transação paga; métodos salvos são códigos de autorização `AUTH_…` de Paystack |

A `finalizeResult` do Stripe executa 3-D Secure / SCA no navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes da doação ser considerada completa; o formulário compartilhado apenas chama `provider.finalizeResult(result)` sem conhecimento do que faz.

## Lado do servidor: a abstração de gateway (GivingApi)

O módulo `/giving` (`Api/src/modules/giving`) expõe a superfície REST; o encanamento de gateway vive em `Api/src/shared/helpers`. `DonateController` nunca fala com um SDK de gateway diretamente — vai através de `GatewayService`, que resolve o `IGatewayProvider` certo de `GatewayFactory` e lhe entrega um `GatewayConfig` descriptografado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() descriptografa privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) é o contrato cada gateway implementa — ciclo de vida de webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), taxas (`calculateFees`), manipulação de método salvo (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e extras opcionais (customers, orders, SetupIntents, replay de evento, `retryFailedPayment` para uma fatura de subscrição falhada, `registerPaymentMethodDomain` para verificação de domínio Apple Pay). Um provedor que omite um gancho opcional é relatado como não suportado para essa ação e a UI esconde o controle. Cada classe de provedor declara sua própria matriz `capabilities` (moedas suportadas, ACH, reembolsos, requisitos de subscrição, limites de transação) — `GatewayService.getProviderCapabilities(provider)` apenas a lê — e sinalizadores como `logsDonationsImmediately` orientam comportamento do controlador sem nenhum condicional de nome de provedor nos controladores.

**Provedores de servidor registrados em `GatewayFactory`:**

| Provedor | Disponibilidade |
|----------|-------------|
| Stripe | Sempre ligado |
| PayPal | Sempre ligado |
| Kingdom Funding | Sempre ligado |
| Paystack | Sempre ligado (comerciantes Nigéria, Gana, África do Sul, Quênia, Côte d'Ivoire; moedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via a sinalizador de ambiente `ENABLE_SQUARE` |
| ePayMints | Opt-in via a sinalizador de ambiente `ENABLE_EPAYMINTS` |

Paystack difere dos outros em que dinheiro se move antes de GivingApi estar envolvido: o popup cobra o doador, `processCharge` é um `GET /transaction/verify/:reference` cuja quantia paga e moeda devem corresponder à doação sendo registrada (uma referência já no arquivo nunca é registrada duas vezes), e a primeira doação de um cronograma recorrente é registrada de `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` com `start_date` um intervalo para fora). Webhooks são assinados com a chave secreta em si (`x-paystack-signature`, HMAC-SHA512 sobre o corpo bruto) e Paystack não tem API de gerenciamento de webhook, portanto a tela de admin mostra a URL para a igreja colar em seu painel. Renovação de eventos `charge.success` carrega sem split de fundo; o provedor o recupera das linhas `subscriptions`/`subscriptionFunds` locais de doador. Apenas autorizações de cartão são `reusable` — doações de dinheiro móvel são de uma só vez, portanto `createSubscription` as recusa. Os dados de demonstração semeiam uma segunda igreja (Accra Community Church, `CHU00000002`) em um gateway Paystack modo-teste GHS portanto a suite Playwright do Paystack corre ao lado do Stripe de Grace.

Provedores customizados podem ser registrados em tempo de execução quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` está definido; `AbstractExperimentalGatewayProvider` é a classe base para esses. Nomes de provedor são combinados insensível a case.

### Configuração de gateway & segredos

Um admin salva credenciais de gateway via `POST /giving/gateways` (`GatewayController`). Ao salvar o controlador criptografa as chaves privada e webhook com `EncryptionHelper` antes de persistir, depois — em qualquer host não-localhost — deleta o webhook existente da igreja e provisiona um novo apontado para `/giving/donate/webhook/{provider}?churchId=…`. Uma igreja mantém uma linha por provedor: salvar um gateway substitui apenas a linha existente para aquele mesmo provedor. Leituras públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retornam apenas chaves públicas.

## Modelo de dados

O schema de ofertório (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos em `models/`) é um schema MySQL acessado através de Kysely:

| Tabela | Papel |
|-------|------|
| `gateways` | Configuração de provedor por-igreja: `provider`, `publicKey`, `privateKey`/`webhookKey` criptografados, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designações de ofertório (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamento para entrada/relatório (`name`, `batchDate`) |
| `donations` | Uma doação: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; demonstrações, totais, painéis e relatórios de doação contam apenas `complete` ou null), `transactionId` |
| `fundDonations` | Alocação de uma doação em um ou mais fundos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Doação recorrente; `id` é o id de subscrição do gateway, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Split de fundo para uma doação recorrente |
| `customers` | Liga um `personId` ao seu id de cliente de gateway, por `provider` |
| `gatewayPaymentMethods` | Cartões/bancos salvos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Trilha de auditoria de webhook/evento e chave dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanhas de promessa vinculadas a um fundo, e quantia prometida de cada pessoa |

Uma doação é dividida em fundos através de `fundDonations` — a doação carrega o total, cada `fundDonation` carrega um pedaço. `donations.currency` e `gateways.currency` carregam a moeda ISO; cada provedor anuncia suas `supportedCurrencies`, e valores são formatados com `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxos ponta a ponta

### Membro uma só vez e recorrente (B1App)

A tela de doação autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compõe três componentes apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, e `RecurringDonations`. B1App faz o carregamento de dados ao redor — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa a lista de gateway através; o provedor resolvido carrega seu próprio SDK da chave pública do gateway. A cobrança em si acontece dentro de apphelper: o provedor resolvido tokeniza o método (novo ou salvo), depois posta para `/giving/donate/charge` para uma doação de uma só vez ou `/giving/donate/subscribe` para uma recorrente. Ambos os endpoints atribuem um doador assinado ao seu próprio `personId` (apenas titulares de `donations.edit` podem atribuir a outra) e rejeitam splits de fundo que somam mais que o valor cobrado. Doações recorrentes criam uma linha `subscriptions` mais `subscriptionFunds` e entregam o cronograma ao gateway (Stripe Subscriptions, PayPal Billing Plans, ou cronograma recorrente KF).

### Doação de visitante / anônima

A página pública de doação (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e o painel "give now" renderizam `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que injeta reCAPTCHA e o contexto de Elements do gateway ao redor do `GuestForm` do provedor. Visitantes obtêm nenhum login, nenhum método salvo, e nenhum histórico. O fluxo busca `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (apenas chaves públicas), verifica o visitante com `POST /giving/donate/captcha-verify`, tokeniza no navegador, e posta para `/giving/donate/charge` (ou `/subscribe`). ACH de visitante usa o anônimo `POST /giving/paymentmethods/ach-setup-intent-anon`.

Três opções de formulário de visitante andam na mesma chamada de cobrança. `?fundId=` e `?amount=` na URL de doação pré-selecionam o split de fundo (lido pelo formulário de visitante de cada provedor ao montar, roteado através do manipulador de mudança de fundo normal portanto totais e taxas atualizam). `anonymous: true` faz `DonateController.charge` descartar qualquer pessoa o cliente enviou e registrar a doação com `personId = null`; o formulário de visitante pula `/people/loadOrCreate` e a etapa de cliente/cofre, e os três provedores de log imediato interrompem resolvendo uma pessoa do cliente de gateway. Apple Pay precisa do domínio da página registrado com Stripe, portanto um formulário de visitante Stripe posta uma vez por sessão ao público, taxa limitada `POST /giving/donate/register-domain`, que apenas aceita um domínio que pertence à igreja (`<subDomain>.b1.church`, uma linha na tabela de domínios do módulo de conteúdo, ou um localhost) antes de chamar a API de domínios de método de pagamento da Stripe.

### Registro de admin e importação de Stripe (B1Admin)

A seção de doações B1Admin (`B1Admin/src/donations/`) é onde os times de finanças trabalham. Entrada de lote (`components/BulkDonationEntry.tsx`) registra doações em dinheiro/cheque/em espécie postando `/giving/donations` depois `/giving/funddonations` — nenhum gateway envolvido. Fundos, lotes, campanhas e demonstrações cada mapa para suas rotas CRUD `/giving/*`. O painel estilo-doação de membro (`B1Admin/src/donationComponents/`) reutiliza os mesmos componentes apphelper que B1App.

Relatório e hand-offs contábeis são trabalho do lado do cliente ou teste-runner, não trabalho de gateway: o CSV de exportação QuickBooks da página de lote constrói uma entrada de diário das `donations` + `fundDonations` do lote (débito Fundos Não Depositados, um crédito por fundo), a aba Lapsed Givers executa `Api/reports/lapsedGivers.json` através do executador de relatório genérico com nomes de pessoas resolvidos por `ReportOutput`, e formatos de recebimento por país (Canadá / Austrália / Nova Zelândia) são configurações de igreja na loja chave/valor de associação renderizada por `GivingStatementDocument` e duplicada na página de impressão B1App.

### Convertendo totais de moeda mista

Qualquer endpoint que retorna um total único combinado através de doações possivelmente de moeda mista — os KPIs de resumo de ofertório (`GivingKpiCards`), um total de lote de doação, um total de fundo, e os totais de B1App no ano doação/período — converte para a moeda padrão da igreja no lado do servidor em vez de somar moedas diferentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` busca taxas de `api.frankfurter.dev` com chave pela moeda da igreja, armazena em cache no processo por 12 horas, e expõe `convertTotals(rows, churchCurrency, rates)`: linhas são pré-agrupadas por moeda em SQL (um punhado de grupos, nunca uma conversão por doação), cada grupo é convertido e somado, e o resultado carrega um sinalizador `isConverted` o cliente usa para mostrar uma nota "Convertido em taxas de câmbio atuais". Registros de doação individual e relatórios históricos/moeda-original nunca são convertidos — apenas totais combinados são.

Importação de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) preenche doações feitas fora B1: ela chama `POST /giving/donate/replay-stripe-events` com `dryRun: true` para uma visualização, depois `dryRun: false` para importar. O servidor lista eventos Stripe para o intervalo de datas e pula qualquer coisa já registrada — combinada primeiro por provider id de `eventLogs`, depois por `DonationRepo.findMatchingDonation` (quantia + data + pessoa) portanto um reexecutável nunca dupla-importa.

## Webhooks e reconciliação

Pagamentos liquidados e mudanças de estado de subscrição chegam em `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). O processamento é intencionalmente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega à verificação de assinatura do provedor; uma assinatura falha retorna 401. Eventos que não precisam de processamento atalho com 200.
2. **Dedup o evento** — `EventLogRepo.loadByProviderId` pula um webhook já registrado em `eventLogs`.
3. **Dedup a doação** — antes de criar qualquer coisa, `DonationRepo.loadByTransactionId` é verificado contra cada id candidato o carga pode carregar. Isto absorve entregas duplicadas, eventos ACH de múltiplos estágio (pendente → liquidado), e o caso onde `/donate/charge` já registrou a doação otimisticamente.
4. **Aplicar** — o `classifyWebhookEvent(eventType)` do provedor diz o que o evento significa (`donation` pendente/completo, `cancel-subscription`, ou `ignore`); pagamentos completos criam uma doação `complete` (ou promovem uma `pending` ou `failed` existente), eventos estilo ACH caem como `pending` até liquidação, uma fatura de subscrição falhada (Stripe `invoice.payment_failed`) cria uma doação `failed` com chave no id da fatura, e eventos de cancelamento deletam a linha `subscriptions` local. O controlador nunca inspeciona nomes de evento específicos de provedor.

### Doações recorrentes falhadas e cobrança

Uma doação `failed` é a unidade de trabalho para recuperação. `GET /giving/donations/failed` lista elas com a mensagem de falha de gateway mais nova de `eventLogs` e a sinalizador `canRetry` das capacidades do gateway; `POST /giving/donate/retry/:donationId` chama o `retryFailedPayment` do provedor (Stripe paga a fatura aberta), e o webhook resultante promove a linha a `complete` através do caminho dedup normal. Emails de cobrança vão para o doador do manipulador de webhook no dia 0, depois de `DunningHelper.run` no timer de meia-noite (conectado em ambos `lambda/timer-handler.ts` e `RailwayCron.ts`) nos dias 3 e 7; cada envio é registrado em `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, portanto um reexecutável nunca envia email duas vezes. Quando Stripe desiste e cancela a subscrição (`customer.subscription.deleted` com `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envia email para o doador uma vez (`providerId: "<subscriptionId>:canceled"`); cancelamentos iniciados por doador ou admin ficam silenciosos. Stripe nunca adiciona eventos a um endpoint existente: depois de mudar `StripeHelper.webhookEvents`, ou re-salve o gateway ou execute `tools/manual/stripe-webhook-events.ts` (teste seco por padrão, `--apply` para escrever) contra prod.

Provedores com `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) têm suas cobranças registradas da resposta `/charge` (nenhuma rodada de webhook necessária para o caminho feliz), enquanto Stripe depende de `payment_intent.succeeded` / `invoice.paid` e `payment_intent.processing` ACH. Manipulação de taxas (`POST /giving/donate/fee`, a sinalizador `payFees` de gateway, e `calculateFees` de cada provedor) calcula o "cobrir as taxas" aumento de valor bruto no lado do doador — B1 não pega corte de plataforma, portanto uma taxa de aplicação nunca é adicionada.

:::info
Os caminhos de cobrança e webhook escrevem as mesmas linhas `donations` / `fundDonations`. O `transactionId` é a chave de junção que mantém um log de cobrança otimista e seu webhook posterior de produzir duas doações para uma doação.
:::

## Páginas Relacionadas

- [Giving Endpoints](../api/endpoints/giving) — superfície REST completa para doações, fundos, lotes, gateways, subscrições, métodos de pagamento e webhooks
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que envia o registro de provedor de pagamento e componentes de doação
- [Module Structure](../api/module-structure) — como o módulo GivingApi é organizado no lado do servidor
