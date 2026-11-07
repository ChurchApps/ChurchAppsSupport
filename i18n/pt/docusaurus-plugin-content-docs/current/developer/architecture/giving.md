---
title: "Arquitetura de doações"
description: "Guia para desenvolvedores sobre doações na ChurchApps: como B1 Admin e B1.church enviam doações via Stripe, PayPal, Kingdom Funding ou Paystack."
---

# Arquitetura de doações

<div class="article-intro">

O ChurchApps executa as doações em um modelo de trilho de gateway: a igreja mantém a sua própria conta no Stripe (ou PayPal, Kingdom Funding ou Paystack), e o B1 nunca fica no caminho do dinheiro como processador da plataforma. Os dados do cartão são tokenizados no navegador e nunca chegam a um servidor do ChurchApps. Esta página mapeia a pilha inteira — o registro de provedores do lado do cliente em `@churchapps/apphelper`, a abstração de gateway da GivingApi, o modelo de dados das doações e como os webhooks dos gateways são reconciliados com o banco de dados.

</div>

## Visão geral

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

Três princípios valem para toda a pilha:

1. **O gateway guarda o cartão.** O widget de entrada de cada provedor tokeniza no navegador; a API só recebe um token, um nonce ou um id de pedido.
2. **Uma abstração, vários provedores.** O navegador resolve um `PaymentProvider` a partir de um registro; o servidor resolve um `IGatewayProvider` a partir de uma fábrica. Ambos usam o mesmo nome normalizado de provedor armazenado no registro do gateway.
3. **Os webhooks são a fonte da verdade para a liquidação.** A resposta da cobrança é registrada de forma otimista, mas é o webhook assinado do gateway que confirma (ou cria) a doação concluída, com proteções de idempotência dos dois lados.

## Lado do cliente: o registro de provedores de pagamento (`@churchapps/apphelper`)

O registro fica em `Packages/apphelper/src/donations/providers/`, com os widgets e auxiliares de cada provedor em sua própria subpasta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nada fora de `providers/` faz ramificações pelo nome do provedor. Um `PaymentProvider` (veja `providers/types.ts`) reúne tudo o que uma aplicação hospedeira precisa para um gateway: um `descriptor` (rótulos administrativos, moedas suportadas, campos de taxa, taxas padrão, URLs de painel/cadastro), um conjunto de flags de `capabilities` (cartões salvos, ACH, recorrência, entrada de novo cartão inline, salvamento implícito ao tokenizar), os widgets React para a entrada de membros (`MemberWrapper`/`MemberEntry`), a doação de convidados (`GuestForm`), a edição de métodos salvos (`MethodEditForm`) e pagamentos de perguntas de formulário (`FormPayment`), além de `buildChargeRequest(ctx, token)` — o único lugar onde o formato do payload de cobrança difere entre provedores. O `MemberWrapper` de cada provedor carrega seu próprio SDK a partir da chave pública do registro do gateway, então as aplicações hospedeiras nunca importam um SDK de gateway (B1App e B1Admin não têm dependência de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qual dos gateways da igreja uma superfície deve usar.

`providers/registry.ts` mantém os provedores embutidos. Eles são **referenciados por valor**, e não registrados por um efeito colateral de módulo, de modo que a eliminação de código não utilizado do bundler nunca consegue descartar o registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Função | Finalidade |
|--------|------------|
| `getPaymentProvider(name)` | Resolve pelo nome normalizado; cai para o Stripe para que um provedor mal configurado nunca derrube o formulário do doador |
| `registerPaymentProvider(p)` | Registra um provedor extra em tempo de execução (para um gateway personalizado de uma aplicação hospedeira) |
| `listPaymentProviders()` | Enumera os embutidos e os personalizados — usado para montar a lista suspensa de gateways do administrador |
| `hasPaymentProvider(name)` | Verificação de pertencimento |

**Provedores cliente embutidos: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin apenas *leem* o registro (`getPaymentProvider`, `listPaymentProviders`); nenhum dos dois chama `registerPaymentProvider` — o registro fica dentro do apphelper.

Cada provedor tokeniza de um jeito diferente, mas todos mantêm o cartão fora do B1:

| Provedor | Widget de entrada | Token devolvido para a API |
|----------|-------------------|----------------------------|
| Stripe | `CardElement` do Stripe `Elements` → `stripe.createPaymentMethod(...)`; o formulário de convidados também monta um `ExpressCheckoutElement` (Apple Pay / Google Pay, para doações avulsas) cujo `onConfirm` resolve para o mesmo id `pm_…` | id do método de pagamento (`pm_…`); conta bancária via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` para gateways em USD, PAD canadense `acss_debit` (modal de mandato hospedado, mandato `default_for` faturas/assinaturas, cobranças avulsas passam o id do mandato) para gateways em CAD |
| Kingdom Funding | Formulário de tokenização hospedado, identificado pela chave pública do gateway | nonce de uso único |
| PayPal | PayPal Hosted Fields (cartão, recorrência) mais PayPal Smart Buttons com o Venmo como fonte de pagamento (avulsas); ambos compartilham um único carregamento de SDK e o pedido do servidor montado via `/donate/client-token` + `/donate/create-order` | id do pedido capturado |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) — o próprio popup processa o pagamento (cartão, dinheiro móvel, transferência bancária, USSD) | referência da transação paga; os métodos salvos são códigos de autorização Paystack `AUTH_…` |

O `finalizeResult` do Stripe executa a 3-D Secure / SCA no navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de a doação ser considerada concluída; o formulário compartilhado apenas chama `provider.finalizeResult(result)` sem saber o que ela faz.

## Lado do servidor: a abstração de gateway (GivingApi)

O módulo `/giving` (`Api/src/modules/giving`) expõe a superfície REST; a infraestrutura de gateway fica em `Api/src/shared/helpers`. O `DonateController` nunca fala diretamente com um SDK de gateway — ele passa pelo `GatewayService`, que resolve o `IGatewayProvider` correto a partir do `GatewayFactory` e lhe entrega uma `GatewayConfig` descriptografada.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) é o contrato que todo gateway implementa — ciclo de vida de webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), taxas (`calculateFees`), tratamento de métodos salvos (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e extras opcionais (clientes, pedidos, SetupIntents, reenvio de eventos, `retryFailedPayment` para uma fatura de assinatura falha, `registerPaymentMethodDomain` para a verificação de domínio do Apple Pay). Um provedor que omite um gancho opcional é informado como não suportado para aquela ação, e a interface oculta o controle. Cada classe de provedor declara sua própria matriz de `capabilities` (moedas suportadas, ACH, reembolsos, requisitos de assinatura, limites de transação) — `GatewayService.getProviderCapabilities(provider)` apenas lê essa matriz — e flags como `logsDonationsImmediately` direcionam o comportamento dos controllers sem nenhuma condição por nome de provedor nos controllers.

**Provedores de servidor registrados no `GatewayFactory`:**

| Provedor | Disponibilidade |
|----------|-----------------|
| Stripe | Sempre ativo |
| PayPal | Sempre ativo |
| Kingdom Funding | Sempre ativo |
| Paystack | Sempre ativo (comerciantes da Nigéria, Gana, África do Sul, Quênia, Costa do Marfim; moedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcional, pela variável de ambiente `ENABLE_SQUARE` |
| ePayMints | Opcional, pela variável de ambiente `ENABLE_EPAYMINTS` |

O Paystack difere dos demais porque o dinheiro se move antes de a GivingApi entrar em ação: o popup cobra o doador, `processCharge` é um `GET /transaction/verify/:reference` cujo valor pago e moeda precisam coincidir com a doação que está sendo registrada (uma referência já registrada nunca é gravada duas vezes), e a primeira doação de um cronograma recorrente é registrada a partir de `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` com `start_date` um intervalo à frente). Os webhooks são assinados com a própria chave secreta (`x-paystack-signature`, HMAC-SHA512 sobre o corpo bruto), e o Paystack não tem API de gerenciamento de webhooks, então a tela administrativa mostra a URL para a igreja colar no painel dela. Eventos `charge.success` de renovação não trazem divisão por fundo; o provedor a recupera das linhas locais `subscriptions`/`subscriptionFunds` do doador. Somente autorizações de cartão são `reusable` — doações por dinheiro móvel são somente avulsas, então `createSubscription` as recusa. Os dados de demonstração incluem uma segunda igreja (Accra Community Church, `CHU00000002`) em um gateway Paystack em GHS no modo de teste, para que a suíte Playwright do Paystack rode ao lado da suíte do Stripe da Grace.

Provedores personalizados podem ser registrados em tempo de execução quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` estiver definido; `AbstractExperimentalGatewayProvider` é a classe base para eles. Os nomes dos provedores são comparados sem diferenciar maiúsculas de minúsculas.

### Configuração do gateway e segredos

Um administrador salva as credenciais do gateway por `POST /giving/gateways` (`GatewayController`). Ao salvar, o controller criptografa as chaves privada e de webhook com `EncryptionHelper` antes de persistir e, em qualquer host que não seja localhost, exclui o webhook existente da igreja e provisiona um novo apontando para `/giving/donate/webhook/{provider}?churchId=…`. Uma igreja mantém uma linha por provedor: salvar um gateway substitui somente a linha existente desse mesmo provedor. As leituras públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retornam apenas as chaves públicas.

## Modelo de dados

O esquema de giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos em `models/`) é um esquema MySQL acessado pelo Kysely:

| Tabela | Papel |
|--------|-------|
| `gateways` | Configuração do provedor por igreja: `provider`, `publicKey`, `privateKey`/`webhookKey` criptografadas, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinações de doação (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamento para lançamento/relatórios (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Uma oferta: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; extratos, totais, painéis e relatórios de doações contam apenas `complete` ou nulo), `transactionId` |
| `fundDonations` | Alocação de uma doação em um ou mais fundos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Doação recorrente; `id` é o id da assinatura no gateway, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisão por fundo de uma doação recorrente |
| `customers` | Vincula um `personId` ao id de cliente no gateway, por `provider` |
| `gatewayPaymentMethods` | Cartões/contas salvos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Trilha de auditoria de webhooks/eventos e chave de deduplicação (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanhas de promessas vinculadas a um fundo, e o valor prometido de cada pessoa |

Uma doação é dividida entre fundos por meio de `fundDonations` — a doação carrega o total, cada `fundDonation` carrega uma fatia. `donations.currency` e `gateways.currency` carregam a moeda ISO; cada provedor anuncia suas `supportedCurrencies`, e os valores são formatados com `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxos ponta a ponta

### Membro: doação avulsa e recorrente (B1App)

A tela de doação autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compõe três componentes do apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. O B1App faz o carregamento de dados ao redor — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa a lista de gateways adiante; o provedor resolvido carrega seu próprio SDK a partir da chave pública do gateway. A cobrança em si acontece dentro do apphelper: o provedor resolvido tokeniza o método (novo ou salvo) e então envia para `/giving/donate/charge` para uma doação avulsa ou `/giving/donate/subscribe` para uma recorrente. Ambos os endpoints atribuem um doador conectado ao seu próprio `personId` (somente quem tem `donations.edit` pode atribuir a outra pessoa) e rejeitam divisões por fundo cuja soma seja maior que o valor cobrado. Doações recorrentes criam uma linha em `subscriptions` mais `subscriptionFunds` e entregam o cronograma ao gateway (Stripe Subscriptions, PayPal Billing Plans ou um cronograma recorrente do KF).

### Convidados / doação anônima

A página pública de doação (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e o painel "doe agora" renderizam `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que injeta o reCAPTCHA e o contexto Elements do gateway ao redor do `GuestForm` do provedor. Convidados não têm login, nem métodos salvos, nem histórico. O fluxo busca `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (somente chaves públicas), verifica o visitante com `POST /giving/donate/captcha-verify`, tokeniza no navegador e envia para `/giving/donate/charge` (ou `/subscribe`). A chamada de verificação retorna um `captchaPass` assinado por HMAC válido por 10 minutos (`Api/src/modules/giving/helpers/CaptchaPass.ts`), que o formulário envia em cada chamada de dinheiro de convidado; com `CAPTCHA_ENFORCE=true`, a Api recusa chamadas de convidado a `create-order`, `charge`, `subscribe`, `addcard` e `ach-setup-intent-anon` sem um passe válido para aquela igreja. Inscrições pagas de convidados em eventos (`POST /content/registrations/register`) verificam o mesmo passe logo antes da cobrança; veja [Inscrições em eventos](./registrations.md#payment-flow). O ACH de convidados usa o `POST /giving/paymentmethods/ach-setup-intent-anon` anônimo, que permite somente a verificação instantânea (Financial Connections): uma verificação por microdepósitos termina dias depois, quando a página do convidado já não existe, então nunca conseguiria concluir a doação. O formulário se recusa a cobrar um SetupIntent não verificado e direciona o doador para cartão ou para uma configuração bancária com login.

Três opções do formulário de convidados usam a mesma chamada de cobrança. `?fundId=` e `?amount=` na URL de doação pré-selecionam a divisão por fundo (lidas pelo formulário de convidados de cada provedor ao montar, roteadas pelo manipulador normal de mudança de fundo, para que totais e taxas sejam atualizados). `anonymous: true` faz com que o `DonateController.charge` descarte qualquer pessoa enviada pelo cliente e registre a doação com `personId = null`; o formulário de convidados pula `/people/loadOrCreate` e a etapa de cliente/cofre, e os três provedores de registro imediato param de resolver uma pessoa a partir do cliente do gateway. O Apple Pay exige que o domínio da página esteja registrado no Stripe, então um formulário de convidados do Stripe envia uma vez por sessão para `POST /giving/donate/register-domain` público e com limite de taxa, que só aceita um domínio que pertença à igreja (`<subDomain>.b1.church`, uma linha na tabela de domínios do módulo de conteúdo, ou um host local) antes de chamar a API de domínios de métodos de pagamento do Stripe.

### Lançamento administrativo e importação do Stripe (B1Admin)

A seção de doações do B1Admin (`B1Admin/src/donations/`) é onde as equipes financeiras trabalham. O lançamento em lote (`components/BulkDonationEntry.tsx`) registra ofertas em dinheiro/cheque/bens por `POST /giving/donations` e depois `/giving/funddonations` — sem nenhum gateway envolvido. O diálogo **Lançar oferta** do registro de uma pessoa (`components/LogGiftDialog.tsx`) faz o mesmo para uma única oferta, procurando primeiro o lote cuja `batchDate` coincida com a data da oferta ou criando um lote com o nome dessa data (`POST /giving/donationbatches`), e excluindo novamente a doação/o lote novo se uma etapa posterior falhar. Fundos, lotes, campanhas e extratos correspondem às rotas CRUD `/giving/*`; as páginas de extratos de doações (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) pedem um ano-calendário com `GET /donations?startDate=&endDate=` e `GET /fundDonations?startDate=&endDate=`, em vez de todo o histórico da igreja, que poderia exceder o limite de tamanho de resposta do Lambda. O painel de doação no estilo membro (`B1Admin/src/donationComponents/`) reutiliza os mesmos componentes do apphelper que o B1App.

Os encaminhamentos de relatórios e contabilidade são trabalho do cliente ou do executor de relatórios, e não do gateway: a exportação para o QuickBooks da página de lotes monta um CSV de lançamento contábil a partir de `donations` + `fundDonations` do lote (débito em Fundos não depositados, um crédito por fundo); a visão de Doadores inativos da página Resumo executa `Api/reports/lapsedGivers.json` pelo executor genérico de relatórios, com os nomes das pessoas resolvidos por `ReportOutput`; e os formatos de recibo por país (Canadá / Austrália / Nova Zelândia) são configurações da igreja no armazenamento chave-valor de membership, renderizados por `GivingStatementDocument` e duplicados na página de impressão do B1App. As páginas de impressão de extratos do B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passam a configuração `logoLight` da igreja (via `usePrintLogo` em `B1Admin/src/components/PrintChurchHeader.tsx`) para que o logotipo seja impresso no topo de cada extrato, e aguardam a imagem antes da impressão automática.

### Situação do lote e a permissão Lançar doações

Os lotes podem ser fechados para que um depósito contado permaneça como estava. `POST /giving/donationbatches/:id/close` e `/:id/reopen` (somente Donations.Edit) são os únicos escritores de `status`, `closedDate` e `closedBy` (`DonationBatchRepo.setStatus`); um salvamento normal do lote nunca os toca, então lançar um lote não pode reabri-lo. O controle de escrita está centralizado em `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit pode alterar qualquer coisa, enquanto a permissão mais restrita Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Lançar doações" no editor de funções) pode criar lotes e salvar ou excluir doações e divisões por fundo somente enquanto tanto o lote atual da doação quanto o lote de destino estiverem abertos, e nunca para uma oferta de gateway (aquela com `transactionId`). Uma escrita bloqueada retorna `403 { error: "This batch is closed." }`. A leitura de lotes aceita Donations.ViewSummary ou Donations.Enter, para que um contador possa escolher o lote em que está lançando. No cliente, `B1Admin/src/donations/batchAccess.ts` espelha essas regras (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), e `Header` / `SecondaryMenuHelper` mostram **Doações > Lotes** para quem pode ver lotes, mesmo sem Ver resumo.

### Conversão de totais em moedas mistas

Qualquer endpoint que retorne um único total combinado de ofertas possivelmente em moedas mistas — os KPIs de resumo de doações (`GivingKpiCards`), o total de um lote, o total de um fundo e os totais do ano/período na tela de doação do B1App — converte para a moeda padrão da igreja no servidor, em vez de somar moedas diferentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` busca as taxas em `api.frankfurter.dev` a partir da moeda da igreja, mantém-nas em cache no processo por 12 horas e expõe `convertTotals(rows, churchCurrency, rates)`: as linhas são pré-agrupadas por moeda no SQL (um punhado de grupos, nunca uma conversão por oferta), cada grupo é convertido e somado, e o resultado traz uma flag `isConverted` que o cliente usa para mostrar a nota "Convertido pelas taxas de câmbio atuais". `GET /donations/exchange-rates` expõe a tabela de taxas para os clientes que precisam dela (a tela de doação do B1App); as próprias taxas nunca são aceitas em uma requisição, apenas buscadas no servidor, de modo que um cliente não pode influenciar um total reportado. Registros individuais de doações e relatórios históricos/na moeda original nunca são convertidos — somente os totais combinados.

A importação do Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera ofertas feitas fora do B1: chama `POST /giving/donate/replay-stripe-events` com `dryRun: true` para uma prévia e depois com `dryRun: false` para importar. O servidor lista os eventos do Stripe para o intervalo de datas e pula qualquer coisa já registrada — primeiro pela id do provedor em `eventLogs`, depois pelo id da transação, e então por `DonationRepo.findMatchingDonation` (valor + data + pessoa), para que uma nova execução nunca importe em duplicidade. Eventos `charge.succeeded` / `payment_intent.succeeded` de assinaturas são ignorados porque o `invoice.paid` registra essas ofertas; versões mais recentes da API do Stripe removem `PaymentIntent.invoice`, então o pulo também se baseia na descrição "Subscription …".

## Webhooks e reconciliação

Pagamentos liquidados e mudanças de estado de assinaturas chegam em `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). O processamento é deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega à verificação de assinatura do provedor; uma assinatura inválida retorna 401. Eventos que não precisam de processamento encerram com 200.
2. **Deduplicar o evento** — `EventLogRepo.loadByProviderId` ignora um webhook já registrado em `eventLogs`.
3. **Deduplicar a doação** — antes de criar qualquer coisa, `DonationRepo.loadByTransactionId` é verificado contra cada id candidato que o payload possa conter. Isso absorve entregas duplicadas, eventos ACH de várias etapas (pendente → liquidado) e o caso em que `/donate/charge` já registrou a oferta de forma otimista.
4. **Aplicar** — `classifyWebhookEvent(eventType)` do provedor diz o que o evento significa (`donation` pendente/concluída, `cancel-subscription`, ou `ignore`); pagamentos concluídos criam uma doação `complete` (ou promovem uma `pending` ou `failed` existente), eventos no estilo ACH entram como `pending` até a liquidação, uma fatura de assinatura falha (`invoice.payment_failed` do Stripe) cria uma doação `failed` vinculada ao id da fatura, e eventos de cancelamento excluem a linha local de `subscriptions`. O controller nunca inspeciona nomes de eventos específicos de provedores.

### Recorrências falhas e cobrança

Uma doação `failed` é a unidade de trabalho para a recuperação. `GET /giving/donations/failed` as lista com a mensagem de falha mais recente do gateway, vinda de `eventLogs`, e uma flag `canRetry` vinda das capacidades do gateway; `POST /giving/donate/retry/:donationId` chama `retryFailedPayment` do provedor (o Stripe paga a fatura aberta), e o webhook resultante promove a linha para `complete` pelo caminho normal de deduplicação. Os e-mails de cobrança vão para o doador a partir do manipulador de webhook no dia 0, depois a partir de `DunningHelper.run` no timer da meia-noite (ligado tanto em `lambda/timer-handler.ts` quanto em `RailwayCron.ts`) aos 3 e 7 dias; cada envio é registrado em `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, de modo que uma nova execução nunca envia o mesmo e-mail duas vezes. Quando o Stripe desiste e cancela a assinatura (`customer.subscription.deleted` com `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envia um e-mail ao doador uma única vez (`providerId: "<subscriptionId>:canceled"`); cancelamentos iniciados pelo doador ou pelo administrador permanecem silenciosos. O Stripe nunca adiciona eventos a um endpoint existente: depois de alterar `StripeHelper.webhookEvents`, ou salve o gateway novamente ou execute `tools/manual/stripe-webhook-events.ts` (simulação por padrão, `--apply` para gravar) contra a produção.

:::info
Os caminhos de cobrança e de webhook gravam as mesmas linhas de `donations` / `fundDonations`. O `transactionId` é a chave de junção que impede que uma cobrança registrada de forma otimista e seu webhook posterior gerem duas doações para uma mesma oferta.
:::

Os provedores com `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) têm suas cobranças registradas a partir da resposta do `/charge` (sem a necessidade de um ciclo de webhook no caminho feliz), enquanto o Stripe depende de `payment_intent.succeeded` / `invoice.paid` e do `payment_intent.processing` do ACH. O tratamento de taxas (`POST /giving/donate/fee`, a flag `payFees` do gateway e o `calculateFees` de cada provedor) calcula o acréscimo de "cobrir as taxas" do lado do doador — o B1 não cobra nenhuma comissão da plataforma, então nenhuma taxa de aplicação é adicionada.

## Páginas relacionadas

- [Endpoints de Giving](../api/endpoints/giving.md) — superfície REST completa para doações, fundos, lotes, gateways, assinaturas, formas de pagamento e webhooks
- [AppHelper](../shared-libraries/app-helper.md) — o pacote npm que traz o registro de provedores de pagamento e os componentes de doação
- [Estrutura do módulo](../api/module-structure.md) — como o módulo GivingApi é organizado no servidor
