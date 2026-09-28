---
title: "Arquitetura de Doações"
---

# Arquitetura de Doações

<div class="article-intro">

O ChurchApps executa doações em um modelo de gateway-rail: a igreja mantém sua própria conta no Stripe (ou PayPal, Kingdom Funding ou Paystack), e o B1 nunca fica no caminho do dinheiro como processador de plataforma. Os dados do cartão são tokenizados no navegador e nunca chegam a um servidor ChurchApps. Esta página mapeia a pilha inteira — o registro de provedor do lado do cliente em `@churchapps/apphelper`, a abstração de gateway GivingApi, o modelo de dados de doação e como os webhooks de gateway se reconciliam de volta ao banco de dados.

</div>

## Visão Geral

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
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

Três princípios atravessam toda a pilha:

1. **O gateway mantém o cartão.** Todo widget de entrada de provedor tokeniza no navegador; a API só recebe um token, nonce ou id de pedido.
2. **Uma abstração, muitos provedores.** O navegador resolve um `PaymentProvider` de um registro; o servidor resolve um `IGatewayProvider` de uma factory. Ambos usam como chave o mesmo nome de provedor normalizado armazenado no registro de gateway.
3. **Webhooks são a fonte da verdade para liquidação.** Uma resposta de cobrança é registrada de forma otimista, mas o webhook assinado do gateway é o que confirma (ou cria) a doação concluída, com proteções de idempotência em ambos os lados.

## Lado do cliente: o registro de provedor de pagamento (`@churchapps/apphelper`)

O registro existe em `Packages/apphelper/src/donations/providers/`, com os widgets e auxiliares de cada provedor em sua própria subpasta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nada fora de `providers/` se ramifica em um nome de provedor. Um `PaymentProvider` (veja `providers/types.ts`) agrupa tudo o que um aplicativo anfitrião precisa para um gateway: um `descriptor` (rótulos administrativos, moedas suportadas, campos de taxa, taxas de taxa padrão, URLs de painel/inscrição), um conjunto de sinalizadores `capabilities` (cartões salvos, ACH, recorrente, entrada de novo cartão inline, salvamento implícito ao tokenizar), os widgets React para entrada de membro (`MemberWrapper`/`MemberEntry`), doação de convidado (`GuestForm`), edição de método salvo (`MethodEditForm`) e pagamentos de pergunta de formulário (`FormPayment`), além de `buildChargeRequest(ctx, token)` — o único lugar onde o formato de carga de cobrança difere por provedor. O `MemberWrapper` de cada provedor carrega seu próprio SDK da chave pública de gateway do registro de gateway, para que os aplicativos anfitriões nunca importem um SDK de gateway (B1App e B1Admin não têm dependência `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qual dos gateways de uma igreja uma superfície deve usar.

`providers/registry.ts` mantém os embutidos. Eles são **referenciados por valor**, não registrados através de um efeito colateral de módulo, então o tree-shaking de um bundler nunca pode descartar o registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Função | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resolver por nome normalizado; volta ao Stripe para que um provedor mal configurado nunca quebre o formulário de doador |
| `registerPaymentProvider(p)` | Registrar um provedor extra em tempo de execução (para um gateway customizado do aplicativo anfitrião) |
| `listPaymentProviders()` | Enumerar embutidos + customizado — usado para construir o dropdown de gateway do admin |
| `hasPaymentProvider(name)` | Verificação de associação |

**Provedores de cliente embutidos: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin apenas *leem* o registro (`getPaymentProvider`, `listPaymentProviders`); nenhum chama `registerPaymentProvider` — o registro permanece dentro de apphelper.

Cada provedor tokeniza de forma diferente, mas todos mantêm o cartão fora do B1:

| Provedor | Widget de entrada | Token retornado para API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; o formulário de convidado também monta um `ExpressCheckoutElement` (Apple Pay / Google Pay, doações pontuais) cujo `onConfirm` se resolve para o mesmo id `pm_…` | id de método de pagamento (`pm_…`); banco via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` para gateways USD, PAD canadense `acss_debit` (modal de mandato hospedado, mandato `default_for` faturas/inscrições, cobranças únicas passam o id do mandato) para gateways CAD |
| Kingdom Funding | Formulário tokenizador hospedado associado à chave pública de gateway | nonce único |
| PayPal | PayPal Hosted Fields (cartão, recorrente) mais PayPal Smart Buttons com financiamento de Venmo (único); ambos compartilham uma carga SDK e o pedido do servidor construído via `/donate/client-token` + `/donate/create-order` | id de pedido capturado |
| Paystack | Popup Inline de Paystack (`js.paystack.co/v2/inline.js`) — o popup em si faz o pagamento (cartão, dinheiro móvel, transferência bancária, USSD) | referência de transação paga; métodos salvos são códigos de autorização `AUTH_…` do Paystack |

O `finalizeResult` do Stripe executa 3-D Secure / SCA no navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de a doação ser considerada completa; o formulário compartilhado apenas chama `provider.finalizeResult(result)` sem conhecimento do que faz.

## Lado do servidor: a abstração de gateway (GivingApi)

O módulo `/giving` (`Api/src/modules/giving`) expõe a superfície REST; o encanamento de gateway existe em `Api/src/shared/helpers`. `DonateController` nunca fala com um SDK de gateway diretamente — vai através de `GatewayService`, que resolve o `IGatewayProvider` correto de `GatewayFactory` e passa a ele um `GatewayConfig` descriptografado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) é o contrato que cada gateway implementa — ciclo de vida do webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), taxas (`calculateFees`), manipulação de método salvo (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e extras opcionais (clientes, pedidos, SetupIntents, repetição de evento, `retryFailedPayment` para uma fatura de inscrição falhada, `registerPaymentMethodDomain` para verificação de domínio Apple Pay). Um provedor que omite um gancho opcional é relatado como não suportado para essa ação e a UI oculta o controle. Cada classe de provedor declara sua própria matriz `capabilities` (moedas suportadas, ACH, reembolsos, requisitos de inscrição, limites de transação) — `GatewayService.getProviderCapabilities(provider)` apenas a lê — e sinalizadores como `logsDonationsImmediately` orientam o comportamento do controlador sem nenhum condicional de nome de provedor nos controladores.

**Provedores de servidor registrados em `GatewayFactory`:**

| Provedor | Disponibilidade |
|----------|-------------|
| Stripe | Sempre ativado |
| PayPal | Sempre ativado |
| Kingdom Funding | Sempre ativado |
| Paystack | Sempre ativado (comerciantes da Nigéria, Gana, África do Sul, Quênia, Costa do Marfim; moedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Ativação opcional via sinalizador de ambiente `ENABLE_SQUARE` |
| ePayMints | Ativação opcional via sinalizador de ambiente `ENABLE_EPAYMINTS` |

O Paystack difere dos outros pelo fato de que o dinheiro se move antes de GivingApi estar envolvido: o popup cobra o doador, `processCharge` é um `GET /transaction/verify/:reference` cuja quantidade paga e moeda devem corresponder à doação sendo registrada (uma referência já em arquivo nunca é registrada duas vezes), e o primeiro presente de um cronograma recorrente é registrado de `finalizeSubscription` (verificar → `POST /plan` → `POST /subscription` com `start_date` um intervalo à frente). Webhooks são assinados com a chave secreta em si (`x-paystack-signature`, HMAC-SHA512 sobre o corpo bruto) e Paystack não possui uma API de gerenciamento de webhook, então a tela de admin mostra a URL para a igreja colar em seu painel. Eventos `charge.success` de renovação não carregam divisão de fundo; o provedor a recupera das linhas `subscriptions`/`subscriptionFunds` locais do doador. Apenas autorizações de cartão são `reusable` — doações de dinheiro móvel são apenas de uma única vez, então `createSubscription` as recusa. Os dados de demo semeiam uma segunda igreja (Accra Community Church, `CHU00000002`) em um gateway GHS em modo de teste Paystack para que o conjunto Playwright de Paystack seja executado ao lado de um do Grace no Stripe.

Provedores customizados podem ser registrados em tempo de execução quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` está definido; `AbstractExperimentalGatewayProvider` é a classe base para esses. Nomes de provedor são combinados de forma insensível a maiúsculas e minúsculas.

### Configuração de gateway e segredos

Um admin salva as credenciais de gateway via `POST /giving/gateways` (`GatewayController`). No salvamento, o controlador criptografa as chaves privada e webhook com `EncryptionHelper` antes de persistir, então — em qualquer host não-localhost — exclui o webhook existente da igreja e provisiona um novo apontado para `/giving/donate/webhook/{provider}?churchId=…`. Uma igreja mantém uma linha por provedor: salvar um gateway substitui apenas a linha existente para esse mesmo provedor. Leituras públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retornam apenas chaves públicas.

## Modelo de dados

O schema de doações (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos em `models/`) é um schema MySQL acessado através de Kysely:

| Tabela | Papel |
|-------|------|
| `gateways` | Configuração de provedor por igreja: `provider`, `publicKey`, `privateKey`/`webhookKey` criptografado, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designações de doação (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamento para entrada/relatório (`name`, `batchDate`) |
| `donations` | Um presente: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; declarações, totais, painéis e relatórios de doação contam apenas `complete` ou null), `transactionId` |
| `fundDonations` | Alocação de uma doação em um ou mais fundos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Presente recorrente; `id` é o id de inscrição do gateway, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisão de fundo para um presente recorrente |
| `customers` | Vincula um `personId` ao seu id de cliente de gateway, por `provider` |
| `gatewayPaymentMethods` | Cartões/bancos salvos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Trilha de auditoria de webhook/evento e chave de dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanhas de promessas vinculadas a um fundo e o valor prometido de cada pessoa |

Uma doação é dividida em fundos através de `fundDonations` — a doação carrega o total, cada `fundDonation` carrega uma fatia. `donations.currency` e `gateways.currency` carregam a moeda ISO; cada provedor anuncia suas `supportedCurrencies`, e os valores são formatados com `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxos de ponta a ponta

### Membro único e recorrente (B1App)

A tela de doação autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compõe três componentes de apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. B1App faz o carregamento de dados ao redor — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa a lista de gateway; o provedor resolvido carrega seu próprio SDK da chave pública de gateway. A própria cobrança acontece dentro de apphelper: o provedor resolvido tokeniza o método (novo ou salvo), então envia para `/giving/donate/charge` para um presente único ou `/giving/donate/subscribe` para um recorrente. Ambos os endpoints atribuem um doador conectado a seu próprio `personId` (apenas titulares `donations.edit` podem atribuir a outro) e rejeitam divisões de fundo que somam mais que o valor cobrado. Presentes recorrentes criam uma linha `subscriptions` mais `subscriptionFunds` e entregam o cronograma ao gateway (Stripe Subscriptions, Planos de Faturamento PayPal ou cronograma recorrente KF).

### Doação de convidado / anônima

A página de doação pública (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e o painel "dar agora" renderizam `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que injeta reCAPTCHA e o contexto Elements do gateway ao redor do `GuestForm` do provedor. Convidados não obtêm login, sem métodos salvos e nenhum histórico. O fluxo busca `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (apenas chaves públicas), verifica o visitante com `POST /giving/donate/captcha-verify`, tokeniza no navegador e envia para `/giving/donate/charge` (ou `/subscribe`). ACH de convidado usa o `POST /giving/paymentmethods/ach-setup-intent-anon` anônimo.

Três opções de formulário de convidado andam na mesma chamada de cobrança. `?fundId=` e `?amount=` na URL de doação pré-selecionam a divisão de fundo (lido por formulário de convidado de cada provedor no mount, roteado através do manipulador de mudança de fundo normal para que os totais e taxas se atualizem). `anonymous: true` faz `DonateController.charge` descartar qualquer pessoa que o cliente tenha enviado e registrar o presente com `personId = null`; o formulário de convidado pula `/people/loadOrCreate` e a etapa de cliente/cofre, e os três provedores de log imediato param de resolver uma pessoa do cliente de gateway. Apple Pay precisa que o domínio da página seja registrado com Stripe, para que um formulário de convidado Stripe envie uma vez por sessão para o `POST /giving/donate/register-domain` público e com taxa limitada, que só aceita um domínio que pertence à igreja (`<subDomain>.b1.church`, uma linha na tabela de domínios do módulo de conteúdo ou um host local) antes de chamar a API de domínios de método de pagamento do Stripe.

### Gravação do Admin e importação Stripe (B1Admin)

A seção de doações B1Admin (`B1Admin/src/donations/`) é onde as equipes de finanças trabalham. Entrada em lote (`components/BulkDonationEntry.tsx`) registra presentes de dinheiro/cheque/em espécie enviando `/giving/donations` então `/giving/funddonations` — nenhum gateway envolvido. Fundos, lotes, campanhas e declarações cada um mapeiam para suas rotas CRUD `/giving/*`. O painel de estilo de doação de membro (`B1Admin/src/donationComponents/`) reutiliza os mesmos componentes de apphelper que B1App.

Relatório e transmissões de contabilidade são trabalho do lado do cliente ou do executador de relatório, não trabalho de gateway: a exportação do QuickBooks da página de lote constrói um CSV de entrada de diário das `donations` + `fundDonations` do lote (débito Fundos Não Depositados, um crédito por fundo), a guia Doadores Lapsados executa `Api/reports/lapsedGivers.json` através do executor de relatório genérico com nomes de pessoa resolvidos por `ReportOutput`, e os formatos de recibo por país (Canadá / Austrália / Nova Zelândia) são configurações de igreja no armazenamento chave/valor de associação renderizado por `GivingStatementDocument` e duplicado na página de impressão B1App.

### Convertendo totais de moeda mista

Qualquer ponto de extremidade que retorna um único total combinado em presentes possivelmente de moedas mistas — os KPIs de resumo de doação (`GivingKpiCards`), um total de lote de doação, um total de fundo e os totais do ano para data/período da tela de doação B1App — converte para a moeda padrão da igreja do lado do servidor em vez de somar moedas diferentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` busca taxas de `api.frankfurter.dev` associadas à moeda da igreja, as armazena em cache em processo por 12 horas e expõe `convertTotals(rows, churchCurrency, rates)`: as linhas são pré-agrupadas por moeda em SQL (alguns grupos, nunca uma conversão por presente), cada grupo é convertido e somado, e o resultado carrega um sinalizador `isConverted` que o cliente usa para mostrar uma nota "Convertido às taxas de câmbio atuais". Registros de doação individual e relatórios históricos/moeda original nunca são convertidos — apenas totais combinados.

A importação Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) preenche presentes feitos fora do B1: ela chama `POST /giving/donate/replay-stripe-events` com `dryRun: true` para uma visualização, então `dryRun: false` para importar. O servidor lista eventos Stripe para o intervalo de datas e pula qualquer coisa já registrada — correspondida primeiro por id de provedor `eventLogs`, depois por `DonationRepo.findMatchingDonation` (quantidade + data + pessoa) para que uma re-execução nunca duplique-importe.

## Webhooks e reconciliação

Pagamentos liquidados e mudanças de estado de inscrição chegam em `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). O processamento é deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega para a verificação de assinatura do provedor; uma assinatura falhada retorna 401. Eventos que não precisam de processamento ficam com 200.
2. **Dedup o evento** — `EventLogRepo.loadByProviderId` pula um webhook já registrado em `eventLogs`.
3. **Dedup a doação** — antes de criar qualquer coisa, `DonationRepo.loadByTransactionId` é verificado contra cada id candidato que a carga pode carregar. Isso absorve entregas duplicadas, eventos ACH de múltiplos estágios (pendente → liquidado) e o caso em que `/donate/charge` já registrou o presente de forma otimista.
4. **Aplicar** — o `classifyWebhookEvent(eventType)` do provedor diz o que o evento significa (`donation` pendente/completo, `cancel-subscription` ou `ignore`); pagamentos concluídos criam uma doação `complete` (ou promovem um `pending` ou `failed` existente), eventos de estilo ACH pousam como `pending` até liquidação, uma fatura de inscrição falhada (Stripe `invoice.payment_failed`) cria uma doação `failed` associada ao id de fatura, e eventos de cancelamento excluem a linha `subscriptions` local. O controlador nunca inspeciona nomes de evento específicos do provedor.

### Presentes recorrentes e multa falhados

Uma doação `failed` é a unidade de trabalho para recuperação. `GET /giving/donations/failed` as lista com a mensagem de falha de gateway mais recente de `eventLogs` e um sinalizador `canRetry` dos recursos do gateway; `POST /giving/donate/retry/:donationId` chama `retryFailedPayment` do provedor (Stripe paga a fatura aberta), e o webhook resultante promove a linha para `complete` através do caminho de dedup normal. Os emails de multa vão para o doador do manipulador de webhook no dia 0, depois de `DunningHelper.run` no timer da meia-noite (conectado em `lambda/timer-handler.ts` e `RailwayCron.ts`) nos dias 3 e 7; cada envio é registrado em `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, para que uma re-execução nunca envie email duas vezes. Os pontos de extremidade de webhook Stripe criados antes desse recurso não se inscrevem em `invoice.payment_failed`; salvar novamente o gateway provisiona um novo ponto de extremidade com o evento.

Provedores com `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) têm suas cobranças registradas da resposta `/charge` (nenhuma volta de webhook necessária para o caminho feliz), enquanto Stripe confia em `payment_intent.succeeded` / `invoice.paid` e ACH `payment_intent.processing`. O tratamento de taxa (`POST /giving/donate/fee`, o sinalizador de gateway `payFees` e `calculateFees` de cada provedor) computa o aumento bruto "cobrir as taxas" no lado do doador — B1 não pega corte de plataforma, então nenhuma taxa de aplicativo é nunca adicionada.

:::info
Os caminhos de cobrança e webhook escrevem as mesmas linhas `donations` / `fundDonations`. O `transactionId` é a chave de junção que mantém um log de cobrança otimista e seu webhook posterior de produzir duas doações para um presente.
:::

## Páginas Relacionadas

- [Pontos de extremidade de doação](../api/endpoints/giving) — superfície REST completa para doações, fundos, lotes, gateways, inscrições, métodos de pagamento e webhooks
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que envia o registro de provedor de pagamento e componentes de doação
- [Estrutura do módulo](../api/module-structure) — como o módulo GivingApi é organizado do lado do servidor
