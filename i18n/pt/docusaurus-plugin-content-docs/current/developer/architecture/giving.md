---
title: "Arquitetura de Doações"
---

# Arquitetura de Doações

<div class="article-intro">

O ChurchApps processa doações com um modelo de gateway: a igreja mantém a própria conta no Stripe (ou PayPal, Kingdom Funding ou Paystack), e o B1 nunca fica no caminho do dinheiro como processador da plataforma. Os dados do cartão são tokenizados no navegador e nunca chegam a um servidor do ChurchApps. Esta página mapeia a pilha completa — o registro de provedores de pagamento do lado do cliente em `@churchapps/apphelper`, a abstração de gateway da GivingApi, o modelo de dados de doações e como os webhooks do gateway são reconciliados de volta com o banco de dados.

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

1. **O gateway guarda o cartão.** O formulário de entrada de cada provedor tokeniza no navegador; a API só recebe um token, um nonce ou um id de pedido.
2. **Uma abstração, muitos provedores.** O navegador resolve um `PaymentProvider` a partir de um registro; o servidor resolve um `IGatewayProvider` a partir de uma fábrica. Ambos usam o mesmo nome normalizado do provedor armazenado no registro do gateway.
3. **Os webhooks são a fonte da verdade para a liquidação.** A resposta da cobrança é registrada de forma otimista, mas o webhook assinado do gateway é o que confirma (ou cria) a doação concluída, com proteções de idempotência dos dois lados.

## Lado do cliente: o registro de provedores de pagamento (`@churchapps/apphelper`)

O registro fica em `Packages/apphelper/src/donations/providers/`, com os widgets e auxiliares de cada provedor em sua própria subpasta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nada fora de `providers/` faz desvios com base no nome do provedor. Um `PaymentProvider` (veja `providers/types.ts`) reúne tudo o que um app hospedeiro precisa para um gateway: um `descriptor` (rótulos de administração, moedas suportadas, campos de taxa, taxas padrão, URLs de painel/cadastro), um conjunto de flags de `capabilities` (cartões salvos, ACH, recorrência, entrada de novo cartão inline, salvamento automático ao tokenizar), os widgets React para entrada de membros (`MemberWrapper`/`MemberEntry`), doação de visitantes (`GuestForm`), edição de método salvo (`MethodEditForm`) e pagamentos de perguntas de formulário (`FormPayment`), além de `buildChargeRequest(ctx, token)` — o único ponto em que o formato do payload de cobrança difere entre provedores. O `MemberWrapper` de cada provedor carrega o próprio SDK a partir da chave pública do registro do gateway, então os apps hospedeiros nunca importam um SDK de gateway (B1App e B1Admin não têm dependência de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qual dos gateways da igreja uma superfície deve usar.

`providers/registry.ts` contém os provedores integrados. Eles são **referenciados por valor**, e não registrados por efeito colateral de módulo, para que a eliminação de código não utilizado (tree-shaking) do bundler nunca possa descartar o registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Função | Finalidade |
|----------|---------|
| `getPaymentProvider(name)` | Resolve pelo nome normalizado; recorre ao Stripe para que um provedor mal configurado nunca derrube o formulário do doador |
| `registerPaymentProvider(p)` | Registra um provedor extra em tempo de execução (para o gateway personalizado de um app hospedeiro) |
| `listPaymentProviders()` | Lista os integrados e os personalizados — usada para montar o menu suspenso de gateways na administração |
| `hasPaymentProvider(name)` | Verificação de pertencimento |

**Provedores de cliente integrados: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin apenas *leem* o registro (`getPaymentProvider`, `listPaymentProviders`); nenhum dos dois chama `registerPaymentProvider` — o registro permanece dentro do apphelper.

Cada provedor tokeniza de forma diferente, mas todos mantêm o cartão fora do B1:

| Provedor | Widget de entrada | Token retornado à API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` do Stripe `Elements` → `stripe.createPaymentMethod(...)`; o formulário de visitantes também monta um `ExpressCheckoutElement` (Apple Pay / Google Pay, para presentes avulsos), cujo `onConfirm` resolve para o mesmo id `pm_…` | id do método de pagamento (`pm_…`); conta bancária via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` para gateways em USD, PAD canadense `acss_debit` (modal de mandato hospedado, mandato `default_for` faturas/assinaturas, cobranças avulsas passam o id do mandato) para gateways em CAD |
| Kingdom Funding | Formulário de tokenização hospedado, identificado pela chave pública do gateway | nonce de uso único |
| PayPal | PayPal Hosted Fields (cartão, recorrência) somados aos PayPal Smart Buttons com financiamento Venmo (avulso); ambos compartilham um único carregamento de SDK, e o pedido do servidor é criado via `/donate/client-token` + `/donate/create-order` | id do pedido capturado |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) — o próprio popup recebe o pagamento (cartão, dinheiro móvel, transferência bancária, USSD) | referência da transação paga; os métodos salvos são códigos de autorização `AUTH_…` do Paystack |

O `finalizeResult` do Stripe executa a 3-D Secure / SCA no navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes que a doação seja considerada concluída; o formulário compartilhado apenas chama `provider.finalizeResult(result)` sem saber o que ela faz.

## Lado do servidor: a abstração de gateway (GivingApi)

O módulo `/giving` (`Api/src/modules/giving`) expõe a superfície REST; a infraestrutura de gateway fica em `Api/src/shared/helpers`. O `DonateController` nunca fala diretamente com um SDK de gateway — ele passa pelo `GatewayService`, que resolve o `IGatewayProvider` correto a partir do `GatewayFactory` e lhe entrega uma `GatewayConfig` já descriptografada.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) é o contrato que todo gateway implementa — ciclo de vida do webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), taxas (`calculateFees`), tratamento de métodos salvos (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e extras opcionais (clientes, pedidos, SetupIntents, reprodução de eventos, `retryFailedPayment` para uma fatura de assinatura que falhou, `registerPaymentMethodDomain` para a verificação de domínio do Apple Pay). Um provedor que omite um hook opcional é informado como não suportado para aquela ação, e a interface oculta o controle. Cada classe de provedor declara sua própria matriz de `capabilities` (moedas suportadas, ACH, reembolsos, requisitos de assinatura, limites de transação) — `GatewayService.getProviderCapabilities(provider)` apenas a lê — e flags como `logsDonationsImmediately` direcionam o comportamento do controlador sem nenhuma condição baseada no nome do provedor nos controladores.

**Provedores de servidor registrados no `GatewayFactory`:**

| Provedor | Disponibilidade |
|----------|-------------|
| Stripe | Sempre ativo |
| PayPal | Sempre ativo |
| Kingdom Funding | Sempre ativo |
| Paystack | Sempre ativo (comerciantes da Nigéria, Gana, África do Sul, Quênia, Costa do Marfim; moedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcional, via a variável de ambiente `ENABLE_SQUARE` |
| ePayMints | Opcional, via a variável de ambiente `ENABLE_EPAYMINTS` |

O Paystack difere dos demais porque o dinheiro se move antes de a GivingApi entrar em cena: o popup cobra o doador, o `processCharge` é um `GET /transaction/verify/:reference` cujo valor pago e moeda devem coincidir com a doação que está sendo registrada (uma referência já registrada nunca é lançada duas vezes), e o primeiro presente de um cronograma recorrente é lançado a partir de `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` com `start_date` um intervalo à frente). Os webhooks são assinados com a própria chave secreta (`x-paystack-signature`, HMAC-SHA512 sobre o corpo bruto), e o Paystack não tem API de gerenciamento de webhooks, então a tela de administração mostra a URL para a igreja colar no painel dela. Os eventos `charge.success` de renovação não trazem divisão por fundo; o provedor a recupera a partir das linhas locais `subscriptions`/`subscriptionFunds` do doador. Somente autorizações de cartão são `reusable` — presentes por dinheiro móvel são apenas avulsos, então o `createSubscription` os recusa. Os dados de demonstração incluem uma segunda igreja (Accra Community Church, `CHU00000002`) em um gateway GHS de modo de teste do Paystack, para que a suíte Playwright do Paystack rode ao lado da de Grace, que usa Stripe.

Provedores personalizados podem ser registrados em tempo de execução quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` estiver definida; `AbstractExperimentalGatewayProvider` é a classe base para eles. Os nomes dos provedores são comparados sem diferenciar maiúsculas de minúsculas.

### Configuração e segredos do gateway

Um administrador salva as credenciais do gateway por meio de `POST /giving/gateways` (`GatewayController`). Ao salvar, o controlador criptografa as chaves privada e de webhook com o `EncryptionHelper` antes de persistir; então, em qualquer host que não seja localhost, exclui o webhook existente da igreja e provisiona um novo apontando para `/giving/donate/webhook/{provider}?churchId=…`. Uma igreja mantém uma linha por provedor: salvar um gateway substitui apenas a linha existente para o mesmo provedor. As leituras públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retornam somente as chaves públicas.

## Modelo de dados

O schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos em `models/`) é um schema MySQL acessado via Kysely:

| Tabela | Função |
|-------|------|
| `gateways` | Configuração de provedor por igreja: `provider`, `publicKey`, `privateKey`/`webhookKey` criptografadas, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinações de doações (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamento para lançamento/relatórios (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Uma doação: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; extratos, totais, painéis e relatórios de doações contam somente `complete` ou nulo), `transactionId` |
| `fundDonations` | Alocação de uma doação em um ou mais fundos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Doação recorrente; o `id` é o id da assinatura no gateway, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisão por fundo de uma doação recorrente |
| `customers` | Vincula um `personId` ao id de cliente no gateway, por `provider` |
| `gatewayPaymentMethods` | Cartões/contas bancárias salvos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Trilha de auditoria de webhooks/eventos e chave de deduplicação (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanhas de promessas vinculadas a um fundo, e o valor prometido por cada pessoa |

Uma doação é dividida entre fundos por meio de `fundDonations` — a doação carrega o total, e cada `fundDonation` carrega uma parte. `donations.currency` e `gateways.currency` carregam a moeda ISO; cada provedor anuncia suas `supportedCurrencies`, e os valores são formatados com `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxos de ponta a ponta

### Doação avulsa e recorrente de membros (B1App)

A tela de doação autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compõe três componentes do apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. O B1App faz o carregamento de dados ao redor — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e repassa a lista de gateways; o provedor resolvido carrega o próprio SDK a partir da chave pública do gateway. A cobrança em si acontece dentro do apphelper: o provedor resolvido tokeniza o método (novo ou salvo) e então envia um `POST` para `/giving/donate/charge` para um presente avulso, ou `/giving/donate/subscribe` para um recorrente. Ambos os endpoints atribuem um doador autenticado ao próprio `personId` (somente quem tem `donations.edit` pode atribuir a outra pessoa) e rejeitam divisões de fundos cuja soma seja maior que o valor cobrado. Presentes recorrentes criam uma linha em `subscriptions` mais `subscriptionFunds` e entregam o cronograma ao gateway (Stripe Subscriptions, PayPal Billing Plans ou um cronograma recorrente da KF).

### Doação de visitantes / anônima

A página pública de doação (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e o painel "dar agora" renderizam o `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que injeta o reCAPTCHA e o contexto Elements do gateway em volta do `GuestForm` do provedor. Visitantes não têm login, nem métodos salvos, nem histórico. O fluxo busca `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (somente chaves públicas), verifica o visitante com `POST /giving/donate/captcha-verify`, tokeniza no navegador e envia um `POST` para `/giving/donate/charge` (ou `/subscribe`). ACH para visitantes usa o endpoint anônimo `POST /giving/paymentmethods/ach-setup-intent-anon`, que permite apenas verificação instantânea (Financial Connections): uma verificação por microdepósitos termina dias depois, quando a página do visitante já não existe, então nunca poderia concluir o presente. O formulário se recusa a cobrar um SetupIntent não verificado e direciona o doador para cartão ou para uma configuração de conta bancária com login.

Três opções do formulário de visitantes usam a mesma chamada de cobrança. `?fundId=` e `?amount=` na URL de doação pré-selecionam a divisão de fundos (lidos pelo formulário de visitantes de cada provedor ao montar, e roteados pelo manipulador normal de mudança de fundo para que totais e taxas sejam atualizados). `anonymous: true` faz com que `DonateController.charge` descarte qualquer pessoa enviada pelo cliente e registre o presente com `personId = null`; o formulário de visitantes pula `/people/loadOrCreate` e a etapa de cliente/cofre, e os três provedores de registro imediato param de resolver uma pessoa a partir do cliente do gateway. O Apple Pay exige que o domínio da página esteja registrado no Stripe, então um formulário de visitantes do Stripe envia uma vez por sessão para `POST /giving/donate/register-domain`, público e com limite de taxa, que só aceita um domínio pertencente à igreja (`<subDomain>.b1.church`, uma linha na tabela de domínios do módulo de conteúdo, ou um host local) antes de chamar a API de domínios de métodos de pagamento do Stripe.

### Lançamento administrativo e importação do Stripe (B1Admin)

A seção de doações do B1Admin (`B1Admin/src/donations/`) é onde as equipes financeiras trabalham. A entrada em lote (`components/BulkDonationEntry.tsx`) registra presentes em dinheiro/cheque/em espécie enviando `POST` para `/giving/donations` e depois para `/giving/funddonations` — sem nenhum gateway envolvido. A folha **Registrar um presente** no registro da pessoa (`components/LogGiftDialog.tsx`) faz o mesmo para um único presente, primeiro encontrando o lote cujo `batchDate` coincide com a data do presente ou criando um lote com o nome dessa data (`POST /giving/donationbatches`), e excluindo a doação/o novo lote de volta caso uma etapa posterior falhe. Fundos, lotes, campanhas e extratos correspondem cada um às suas rotas CRUD `/giving/*`; as páginas de extratos de doações (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) pedem um ano civil com `GET /donations?startDate=&endDate=` e `GET /fundDonations?startDate=&endDate=`, em vez de todo o histórico da igreja, que poderia exceder o limite de tamanho de resposta do Lambda. O painel de doação no estilo de membro (`B1Admin/src/donationComponents/`) reutiliza os mesmos componentes do apphelper que o B1App.

Os repasses de relatórios e contabilidade são trabalho do cliente ou do executor de relatórios, não do gateway: a exportação para o QuickBooks da página de lotes monta um CSV de lançamento contábil a partir de `donations` + `fundDonations` do lote (débito em Undeposited Funds, um crédito por fundo); a visão Lapsed Givers da página de Resumo executa `Api/reports/lapsedGivers.json` pelo executor genérico de relatórios, com os nomes das pessoas resolvidos pelo `ReportOutput`; e os formatos de recibo por país (Canadá / Austrália / Nova Zelândia) são configurações da igreja no armazenamento chave/valor de membros, renderizados pelo `GivingStatementDocument` e duplicados na página de impressão do B1App. As páginas de impressão de extratos do B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passam a configuração `logoLight` da igreja (por meio de `usePrintLogo` em `B1Admin/src/components/PrintChurchHeader.tsx`) para que o logotipo seja impresso no topo de cada extrato, e aguardam a imagem antes da impressão automática.

### Status do lote e a permissão Enter Donations

Os lotes podem ser fechados para que um depósito contado permaneça como estava. `POST /giving/donationbatches/:id/close` e `/:id/reopen` (somente Donations.Edit) são os únicos gravadores de `status`, `closedDate` e `closedBy` (`DonationBatchRepo.setStatus`); um salvamento normal de lote nunca os altera, então lançar um lote não pode reabri-lo. O acesso de escrita é centralizado em `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit pode alterar qualquer coisa, enquanto a permissão mais restrita Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" no editor de funções) pode criar lotes e salvar ou excluir doações e divisões de fundos somente enquanto o lote atual da doação e o lote de destino estiverem abertos, e nunca para um presente de gateway (um com `transactionId`). Uma gravação bloqueada retorna `403 { error: "This batch is closed." }`. A leitura de lotes aceita Donations.ViewSummary ou Donations.Enter, para que um contador possa escolher o lote em que está lançando. No cliente, `B1Admin/src/donations/batchAccess.ts` espelha essas regras (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), e `Header` / `SecondaryMenuHelper` mostram **Donations > Batches** a qualquer pessoa que possa ver lotes, mesmo sem View Summary.

### Conversão de totais em moedas mistas

Qualquer endpoint que retorne um único total combinado de presentes possivelmente em moedas mistas — os KPIs de resumo de doações (`GivingKpiCards`), o total de um lote de doações, o total de um fundo e os totais do ano até a data/período da tela de doação do B1App — converte para a moeda padrão da igreja no servidor, em vez de somar moedas diferentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` busca as taxas em `api.frankfurter.dev` a partir da moeda da igreja, guarda-as em cache dentro do processo por 12 horas e expõe `convertTotals(rows, churchCurrency, rates)`: as linhas são pré-agrupadas por moeda no SQL (um punhado de grupos, nunca uma conversão por presente), cada grupo é convertido e somado, e o resultado traz uma flag `isConverted` que o cliente usa para mostrar a nota "Convertido às taxas de câmbio atuais". `GET /donations/exchange-rates` expõe a tabela de taxas para os clientes que precisam dela (a tela de doação do B1App); as taxas em si nunca são aceitas de uma requisição, apenas buscadas no servidor, então um cliente não pode influenciar um total reportado. Registros individuais de doações e relatórios na moeda original/histórica nunca são convertidos — apenas os totais combinados.

A importação do Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera presentes feitos fora do B1: ela chama `POST /giving/donate/replay-stripe-events` com `dryRun: true` para uma prévia, e depois com `dryRun: false` para importar. O servidor lista os eventos do Stripe para o intervalo de datas e ignora qualquer um já registrado — correspondendo primeiro pelo id do provedor em `eventLogs`, depois pelo id da transação, e então por `DonationRepo.findMatchingDonation` (valor + data + pessoa), para que uma nova execução nunca importe em duplicidade. Os eventos de assinatura `charge.succeeded` / `payment_intent.succeeded` são ignorados porque `invoice.paid` registra esses presentes; versões mais novas da API do Stripe removem `PaymentIntent.invoice`, então a ignorância também se baseia na descrição "Subscription …".

## Webhooks e reconciliação

Pagamentos liquidados e mudanças de estado de assinatura chegam em `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). O processamento é deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega à verificação de assinatura do provedor; uma assinatura inválida retorna 401. Eventos que não precisam de processamento retornam 200 imediatamente.
2. **Deduplicar o evento** — `EventLogRepo.loadByProviderId` ignora um webhook já registrado em `eventLogs`.
3. **Deduplicar a doação** — antes de criar qualquer coisa, `DonationRepo.loadByTransactionId` é consultado com cada id candidato que o payload possa conter. Isso absorve entregas duplicadas, eventos ACH em múltiplas etapas (pendente → liquidado) e o caso em que `/donate/charge` já registrou o presente de forma otimista.
4. **Aplicar** — o `classifyWebhookEvent(eventType)` do provedor informa o que o evento significa (`donation` pendente/completa, `cancel-subscription` ou `ignore`); pagamentos concluídos criam uma doação `complete` (ou promovem uma `pending` ou `failed` existente), eventos no estilo ACH ficam como `pending` até a liquidação, uma fatura de assinatura que falhou (`invoice.payment_failed` do Stripe) cria uma doação `failed` identificada pelo id da fatura, e eventos de cancelamento excluem a linha local de `subscriptions`. O controlador nunca inspeciona nomes de eventos específicos de um provedor.

### Presentes recorrentes falhados e cobrança

Uma doação `failed` é a unidade de trabalho para a recuperação. `GET /giving/donations/failed` lista essas doações com a mensagem de falha mais recente do gateway, vinda de `eventLogs`, e uma flag `canRetry` vinda das capacidades do gateway; `POST /giving/donate/retry/:donationId` chama o `retryFailedPayment` do provedor (o Stripe paga a fatura aberta), e o webhook resultante promove a linha para `complete` pelo caminho normal de deduplicação. E-mails de cobrança são enviados ao doador pelo manipulador de webhook no dia 0, depois pelo `DunningHelper.run` no temporizador da meia-noite (configurado tanto em `lambda/timer-handler.ts` quanto em `RailwayCron.ts`) aos 3 e 7 dias; cada envio é registrado em `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, então uma nova execução nunca envia o mesmo e-mail duas vezes. Quando o Stripe desiste e cancela a assinatura (`customer.subscription.deleted` com `cancellation_details.reason: "payment_failed"`), o `DunningHelper.notifyCanceled` envia um e-mail ao doador uma única vez (`providerId: "<subscriptionId>:canceled"`); cancelamentos iniciados pelo doador ou pelo administrador permanecem em silêncio. O Stripe nunca adiciona eventos a um endpoint existente: depois de alterar `StripeHelper.webhookEvents`, ou salve novamente o gateway, ou execute `tools/manual/stripe-webhook-events.ts` (simulação por padrão, `--apply` para gravar) contra a produção.

Provedores com `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) têm suas cobranças registradas a partir da resposta de `/charge` (sem necessidade de ida e volta de webhook no caminho feliz), enquanto o Stripe depende de `payment_intent.succeeded` / `invoice.paid` e de `payment_intent.processing` para ACH. O tratamento de taxas (`POST /giving/donate/fee`, a flag `payFees` do gateway e o `calculateFees` de cada provedor) calcula, do lado do doador, o acréscimo de "cobrir as taxas" — o B1 não cobra nenhuma comissão da plataforma, então nenhuma taxa de aplicação é adicionada.

:::info
Os caminhos de cobrança e de webhook gravam as mesmas linhas em `donations` / `fundDonations`. O `transactionId` é a chave de junção que impede que um registro otimista de cobrança e seu webhook posterior gerem duas doações para um mesmo presente.
:::

## Páginas relacionadas

- [Endpoints de Giving](../api/endpoints/giving) — superfície REST completa para doações, fundos, lotes, gateways, assinaturas, métodos de pagamento e webhooks
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que distribui o registro de provedores de pagamento e os componentes de doação
- [Estrutura de módulos](../api/module-structure) — como o módulo GivingApi é organizado no servidor
