---
title: "Arquitetura de Doações"
---

# Arquitetura de Doações

<div class="article-intro">

O ChurchApps processa doações com um modelo de trilhos de gateway: a igreja mantém a própria conta no Stripe (ou PayPal, Kingdom Funding ou Paystack), e o B1 nunca fica no caminho do dinheiro como processador da plataforma. Os dados do cartão são tokenizados no navegador e nunca chegam a um servidor do ChurchApps. Esta página mapeia toda a stack -- o registro de provedores de pagamento no lado do cliente em `@churchapps/apphelper`, a abstração de gateway do GivingApi, o modelo de dados de doações e como os webhooks dos gateways são reconciliados com o banco de dados.

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

Três princípios valem para toda a stack:

1. **O gateway guarda o cartão.** O widget de entrada de cada provedor tokeniza no navegador; a API só recebe um token, um nonce ou um ID de pedido.
2. **Uma abstração, muitos provedores.** O navegador resolve um `PaymentProvider` a partir de um registro; o servidor resolve um `IGatewayProvider` a partir de uma fábrica. Ambos usam o mesmo nome normalizado do provedor, armazenado no registro do gateway.
3. **Os webhooks são a fonte da verdade para a liquidação.** A resposta de uma cobrança é registrada de forma otimista, mas é o webhook assinado do gateway que confirma (ou cria) a doação concluída, com proteções de idempotência dos dois lados.

## Lado do cliente: o registro de provedores de pagamento (`@churchapps/apphelper`)

O registro fica em `Packages/apphelper/src/donations/providers/`, com os widgets e auxiliares de cada provedor em sua própria subpasta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- nada fora de `providers/` faz ramificação pelo nome do provedor. Um `PaymentProvider` (veja `providers/types.ts`) reúne tudo o que um aplicativo host precisa para um gateway: um `descriptor` (rótulos para o admin, moedas suportadas, campos de taxa, taxas padrão, URLs de painel/cadastro), um conjunto de flags `capabilities` (cartões salvos, ACH, recorrência, entrada inline de novo cartão, salvamento implícito na tokenização), os widgets React para a entrada de membros (`MemberWrapper`/`MemberEntry`), doações de visitantes (`GuestForm`), edição de formas de pagamento salvas (`MethodEditForm`) e pagamentos de perguntas de formulário (`FormPayment`), além de `buildChargeRequest(ctx, token)` -- o único ponto em que o formato do payload de cobrança difere por provedor. O `MemberWrapper` de cada provedor carrega o próprio SDK a partir da chave pública do registro do gateway, então os aplicativos host nunca importam um SDK de gateway (o B1App e o B1Admin não têm dependência de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qual dos gateways da igreja cada superfície deve usar.

`providers/registry.ts` contém os provedores embutidos. Eles são **referenciados por valor**, e não registrados por efeito colateral de um módulo, então o tree-shaking do bundler nunca pode eliminar o registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Função | Finalidade |
|--------|------------|
| `getPaymentProvider(name)` | Resolve pelo nome normalizado; recorre ao Stripe para que um provedor mal configurado nunca derrube o formulário do doador |
| `registerPaymentProvider(p)` | Registra um provedor extra em tempo de execução (para o gateway personalizado de um aplicativo host) |
| `listPaymentProviders()` | Enumera os embutidos e os personalizados -- usado para montar o menu suspenso de gateways do admin |
| `hasPaymentProvider(name)` | Verificação de pertencimento |

**Provedores embutidos no cliente: Stripe, PayPal, Kingdom Funding, Paystack.** O B1App e o B1Admin apenas *leem* o registro (`getPaymentProvider`, `listPaymentProviders`); nenhum dos dois chama `registerPaymentProvider` -- o registro permanece dentro do apphelper.

Cada provedor tokeniza de forma diferente, mas todos mantêm o cartão fora do B1:

| Provedor | Widget de entrada | Token devolvido à API |
|----------|-------------------|-----------------------|
| Stripe | `CardElement` do Stripe `Elements` → `stripe.createPaymentMethod(...)`; o formulário de visitantes também monta um `ExpressCheckoutElement` (Apple Pay / Google Pay, para doações únicas) cujo `onConfirm` resolve para o mesmo ID `pm_…` | ID da forma de pagamento (`pm_…`); conta bancária via `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` para gateways em USD, `acss_debit` PAD canadense (modal de mandato hospedado, mandato `default_for` faturas/assinaturas, cobranças avulsas passam o ID do mandato) para gateways em CAD |
| Kingdom Funding | Formulário de tokenização hospedado, identificado pela chave pública do gateway | nonce de uso único |
| PayPal | PayPal Hosted Fields (cartão, recorrência) mais PayPal Smart Buttons com financiamento via Venmo (doação única); ambos compartilham um único carregamento de SDK e o pedido do servidor criado via `/donate/client-token` + `/donate/create-order` | ID do pedido capturado |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) -- o próprio popup recebe o pagamento (cartão, dinheiro móvel, transferência bancária, USSD) | referência da transação paga; formas de pagamento salvas são códigos de autorização Paystack `AUTH_…` |

O `finalizeResult` do Stripe executa a autenticação 3-D Secure / SCA no navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de a doação ser considerada concluída; o formulário compartilhado apenas chama `provider.finalizeResult(result)`, sem saber o que ela faz.

## Lado do servidor: a abstração de gateway (GivingApi)

O módulo `/giving` (`Api/src/modules/giving`) expõe a superfície REST; a infraestrutura de gateway fica em `Api/src/shared/helpers`. O `DonateController` nunca fala diretamente com um SDK de gateway -- ele passa pelo `GatewayService`, que resolve o `IGatewayProvider` correto a partir do `GatewayFactory` e entrega a ele um `GatewayConfig` já descriptografado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) é o contrato que todo gateway implementa -- ciclo de vida do webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), taxas (`calculateFees`), tratamento de formas de pagamento salvas (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e extras opcionais (clientes, pedidos, SetupIntents, reprocessamento de eventos, `retryFailedPayment` para uma fatura de assinatura com falha, `registerPaymentMethodDomain` para a verificação de domínio do Apple Pay). Um provedor que omite um hook opcional é informado como não suportado para aquela ação, e a interface oculta o controle correspondente. Cada classe de provedor declara sua própria matriz `capabilities` (moedas suportadas, ACH, reembolsos, requisitos de assinatura, limites de transação) -- `GatewayService.getProviderCapabilities(provider)` apenas a lê -- e flags como `logsDonationsImmediately` controlam o comportamento dos controllers sem nenhuma condicional por nome de provedor nos controllers.

**Provedores de servidor registrados no `GatewayFactory`:**

| Provedor | Disponibilidade |
|----------|-----------------|
| Stripe | Sempre ativo |
| PayPal | Sempre ativo |
| Kingdom Funding | Sempre ativo |
| Paystack | Sempre ativo (comerciantes da Nigéria, Gana, África do Sul, Quênia, Costa do Marfim; moedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in pela variável de ambiente `ENABLE_SQUARE` |
| ePayMints | Opt-in pela variável de ambiente `ENABLE_EPAYMINTS` |

O Paystack difere dos demais porque o dinheiro se move antes de o GivingApi entrar em cena: o popup cobra o doador, `processCharge` é um `GET /transaction/verify/:reference` cujo valor pago e moeda precisam coincidir com a doação que está sendo registrada (uma referência já existente nunca é registrada duas vezes), e a primeira doação de uma programação recorrente é registrada a partir de `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` com `start_date` um intervalo à frente). Os webhooks são assinados com a própria chave secreta (`x-paystack-signature`, HMAC-SHA512 sobre o corpo bruto), e o Paystack não tem API de gerenciamento de webhooks, então a tela do admin mostra a URL para a igreja colar no painel dela. Eventos `charge.success` de renovação não trazem divisão por fundos; o provedor a recupera a partir das linhas locais `subscriptions`/`subscriptionFunds` do doador. Apenas autorizações de cartão são `reusable` -- doações por dinheiro móvel são somente únicas, então `createSubscription` as recusa. Os dados de demonstração semeiam uma segunda igreja (Accra Community Church, `CHU00000002`) em um gateway de teste GHS do Paystack, para que a suíte Playwright do Paystack rode ao lado da suíte do Stripe da Grace.

Provedores personalizados podem ser registrados em tempo de execução quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` está definido; `AbstractExperimentalGatewayProvider` é a classe base para eles. Os nomes dos provedores são comparados sem diferenciar maiúsculas de minúsculas.

### Configuração do gateway e segredos

Um admin salva as credenciais do gateway por `POST /giving/gateways` (`GatewayController`). No salvamento, o controller criptografa as chaves privada e de webhook com o `EncryptionHelper` antes de persistir, e então -- em qualquer host que não seja localhost -- exclui o webhook existente da igreja e provisiona um novo apontando para `/giving/donate/webhook/{provider}?churchId=…`. Uma igreja mantém uma linha por provedor: salvar um gateway substitui somente a linha existente desse mesmo provedor. As leituras públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retornam somente as chaves públicas.

## Modelo de dados

O esquema de giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos em `models/`) é um esquema MySQL acessado pelo Kysely:

| Tabela | Função |
|--------|--------|
| `gateways` | Configuração do provedor por igreja: `provider`, `publicKey`, `privateKey`/`webhookKey` criptografadas, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinações de doações (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamento para lançamento/relatórios (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Uma contribuição: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; extratos, totais, painéis e relatórios de doações contam apenas `complete` ou null), `transactionId` |
| `fundDonations` | Alocação de uma doação entre um ou mais fundos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Doação recorrente; `id` é o ID de assinatura do gateway, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisão por fundos de uma doação recorrente |
| `customers` | Vincula um `personId` ao ID de cliente no gateway, por `provider` |
| `gatewayPaymentMethods` | Cartões/contas bancárias salvos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Trilha de auditoria de webhooks/eventos e chave de deduplicação (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanhas de promessas vinculadas a um fundo, e o valor prometido por cada pessoa |

Uma doação é dividida entre fundos por meio de `fundDonations` -- a doação traz o total, e cada `fundDonation` traz uma fatia. `donations.currency` e `gateways.currency` carregam a moeda ISO; cada provedor anuncia suas `supportedCurrencies`, e os valores são formatados com `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxos ponta a ponta

### Membro, doação única e recorrente (B1App)

A tela de doação autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compõe três componentes do apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. O B1App faz o carregamento de dados ao redor -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- e repassa a lista de gateways; o provedor resolvido carrega o próprio SDK a partir da chave pública do gateway. A cobrança em si acontece dentro do apphelper: o provedor resolvido tokeniza a forma de pagamento (nova ou salva) e então envia `/giving/donate/charge` para uma doação única ou `/giving/donate/subscribe` para uma recorrente. Os dois endpoints atribuem um doador autenticado ao próprio `personId` (somente quem tem `donations.edit` pode atribuir a outra pessoa) e rejeitam divisões por fundos cuja soma exceda o valor cobrado. Doações recorrentes criam uma linha em `subscriptions` mais `subscriptionFunds` e entregam a programação ao gateway (Stripe Subscriptions, PayPal Billing Plans ou uma programação recorrente da KF).

### Doação de visitantes / anônima

A página pública de doação (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e o painel "doe agora" renderizam o `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que injeta o reCAPTCHA e o contexto Elements do gateway em volta do `GuestForm` do provedor. Visitantes não têm login, formas de pagamento salvas nem histórico. O fluxo busca `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (somente chaves públicas), verifica o visitante com `POST /giving/donate/captcha-verify`, tokeniza no navegador e envia para `/giving/donate/charge` (ou `/subscribe`). A chamada de verificação retorna um `captchaPass` assinado por HMAC, válido por 10 minutos (`Api/src/modules/giving/helpers/CaptchaPass.ts`), que o formulário envia em todas as chamadas de dinheiro de visitantes; com `CAPTCHA_ENFORCE=true`, a Api recusa chamadas de visitantes para `create-order`, `charge`, `subscribe`, `addcard` e `ach-setup-intent-anon` sem um pass válido para aquela igreja. O ACH de visitantes usa o endpoint anônimo `POST /giving/paymentmethods/ach-setup-intent-anon`, que permite somente verificação instantânea (Financial Connections): uma verificação por microdepósitos termina dias depois, quando a página do visitante já não existe, então nunca poderia concluir a doação. O formulário se recusa a cobrar um SetupIntent não verificado e direciona o doador para cartão ou para a configuração de conta bancária com login.

Três opções do formulário de visitantes usam a mesma chamada de cobrança. `?fundId=` e `?amount=` na URL de doação pré-selecionam a divisão por fundos (lidas pelo formulário de visitantes de cada provedor ao montar, roteadas pelo manipulador normal de mudança de fundo para que totais e taxas sejam atualizados). `anonymous: true` faz com que `DonateController.charge` descarte qualquer pessoa enviada pelo cliente e registre a doação com `personId = null`; o formulário de visitantes pula `/people/loadOrCreate` e a etapa de cliente/cofre, e os três provedores de registro imediato param de resolver uma pessoa a partir do cliente no gateway. O Apple Pay exige que o domínio da página esteja registrado no Stripe, então um formulário de visitantes do Stripe envia uma vez por sessão para `POST /giving/donate/register-domain`, público e com limite de taxa, que só aceita um domínio que pertença à igreja (`<subDomain>.b1.church`, uma linha na tabela de domínios do módulo de conteúdo, ou um host local) antes de chamar a API de domínios de métodos de pagamento do Stripe.

### Registro administrativo e importação do Stripe (B1Admin)

A seção de doações do B1Admin (`B1Admin/src/donations/`) é onde as equipes financeiras trabalham. O lançamento em lote (`components/BulkDonationEntry.tsx`) registra doações em dinheiro, cheque ou em espécie enviando `/giving/donations` e depois `/giving/funddonations` -- sem nenhum gateway envolvido. A folha **Registrar uma doação** do registro da pessoa (`components/LogGiftDialog.tsx`) faz o mesmo para uma única doação: primeiro localiza o lote cujo `batchDate` coincide com a data da doação ou cria um com o nome dessa data (`POST /giving/donationbatches`), e exclui novamente a doação/o novo lote se uma etapa posterior falhar. Fundos, lotes, campanhas e extratos correspondem cada um às suas rotas CRUD `/giving/*`; as páginas de extratos de doações (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) solicitam um ano-calendário com `GET /donations?startDate=&endDate=` e `GET /fundDonations?startDate=&endDate=`, em vez de todo o histórico da igreja, que poderia exceder o limite de tamanho de resposta do Lambda. O painel de doação no estilo de membro (`B1Admin/src/donationComponents/`) reutiliza os mesmos componentes do apphelper usados pelo B1App.

As integrações de contabilidade e relatórios são trabalho do lado do cliente ou do executor de relatórios, e não do gateway: a exportação para o QuickBooks da página de lote monta um CSV de lançamento contábil a partir de `donations` + `fundDonations` do lote (débito em Undeposited Funds, um crédito por fundo); a visão Lapsed Givers da página Resumo executa `Api/reports/lapsedGivers.json` pelo executor genérico de relatórios, com os nomes das pessoas resolvidos pelo `ReportOutput`; e os formatos de recibo por país (Canadá / Austrália / Nova Zelândia) são configurações da igreja no armazenamento chave-valor do membership, renderizadas pelo `GivingStatementDocument` e duplicadas na página de impressão do B1App. As páginas de impressão de extratos do B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passam a configuração `logoLight` da igreja (via `usePrintLogo` em `B1Admin/src/components/PrintChurchHeader.tsx`) para que o logotipo seja impresso no topo de cada extrato, e aguardam a imagem antes da impressão automática.

### Status do lote e a permissão Lançar Doações

Os lotes podem ser fechados para que um depósito contado permaneça como estava. `POST /giving/donationbatches/:id/close` e `/:id/reopen` (somente Donations.Edit) são os únicos gravadores de `status`, `closedDate` e `closedBy` (`DonationBatchRepo.setStatus`); um salvamento normal do lote nunca os altera, então lançar um lote não pode reabri-lo. O acesso de escrita é centralizado em `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit pode alterar qualquer coisa, enquanto a permissão mais restrita Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Lançar Doações" no editor de funções) pode criar lotes e salvar ou excluir doações e divisões por fundos somente enquanto tanto o lote atual da doação quanto o lote de destino estiverem abertos, e nunca para uma doação de gateway (aquela com um `transactionId`). Uma escrita bloqueada retorna `403 { error: "This batch is closed." }`. A leitura de lotes aceita Donations.ViewSummary ou Donations.Enter, para que quem faz a contagem possa escolher o lote em que está lançando. No cliente, `B1Admin/src/donations/batchAccess.ts` espelha essas regras (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), e `Header` / `SecondaryMenuHelper` mostram **Doações > Lotes** para qualquer pessoa que possa ver lotes, mesmo sem Ver Resumo.

### Conversão de totais em moedas mistas

Qualquer endpoint que retorne um único total combinado de contribuições possivelmente em moedas diferentes -- os KPIs do resumo de doações (`GivingKpiCards`), o total de um lote de doações, o total de um fundo e os totais do ano até a data/período da tela de doação do B1App -- converte para a moeda padrão da igreja no servidor, em vez de somar moedas diferentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` busca as taxas em `api.frankfurter.dev` com base na moeda da igreja, guarda-as em cache no processo por 12 horas e expõe `convertTotals(rows, churchCurrency, rates)`: as linhas são agrupadas por moeda no SQL (poucos grupos, nunca uma conversão por doação), cada grupo é convertido e somado, e o resultado traz uma flag `isConverted` que o cliente usa para exibir a nota "Convertido às taxas de câmbio atuais". `GET /donations/exchange-rates` expõe a tabela de taxas para clientes que precisam dela (a tela de doação do B1App); as próprias taxas nunca são aceitas de uma requisição, apenas buscadas no servidor, de modo que um cliente não consegue influenciar um total informado. Registros individuais de doações e relatórios na moeda original/histórica nunca são convertidos -- apenas os totais combinados são.

A importação do Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera doações feitas fora do B1: chama `POST /giving/donate/replay-stripe-events` com `dryRun: true` para uma prévia e depois com `dryRun: false` para importar. O servidor lista os eventos do Stripe no intervalo de datas e ignora tudo o que já foi registrado -- primeiro pelo ID do provedor em `eventLogs`, depois pelo ID da transação, e então por `DonationRepo.findMatchingDonation` (valor + data + pessoa), de modo que uma nova execução nunca importa em duplicidade. Eventos `charge.succeeded` / `payment_intent.succeeded` de assinaturas são ignorados, porque `invoice.paid` registra essas doações; versões mais novas da API do Stripe removem `PaymentIntent.invoice`, então o ignorar também se baseia na descrição "Subscription …".

## Webhooks e reconciliação

Pagamentos liquidados e mudanças de estado de assinatura chegam em `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). O processamento é deliberadamente idempotente:

1. **Verificar** -- `GatewayService.verifyWebhook` delega a verificação de assinatura ao provedor; uma assinatura inválida retorna 401. Eventos que não precisam de processamento retornam 200 imediatamente.
2. **Deduplicar o evento** -- `EventLogRepo.loadByProviderId` ignora um webhook já registrado em `eventLogs`.
3. **Deduplicar a doação** -- antes de criar qualquer coisa, `DonationRepo.loadByTransactionId` é verificado para cada ID candidato que o payload possa conter. Isso absorve entregas duplicadas, eventos ACH de múltiplas etapas (pendente → liquidado) e o caso em que `/donate/charge` já registrou a doação de forma otimista.
4. **Aplicar** -- `classifyWebhookEvent(eventType)` do provedor informa o que o evento significa (`donation` pendente/completa, `cancel-subscription` ou `ignore`); pagamentos concluídos criam uma doação `complete` (ou promovem uma `pending` ou `failed` existente), eventos no estilo ACH entram como `pending` até a liquidação, uma fatura de assinatura com falha (`invoice.payment_failed` do Stripe) cria uma doação `failed` identificada pelo ID da fatura, e eventos de cancelamento excluem a linha local de `subscriptions`. O controller nunca inspeciona nomes de eventos específicos de cada provedor.

### Doações recorrentes com falha e cobrança

Uma doação `failed` é a unidade de trabalho para a recuperação. `GET /giving/donations/failed` lista essas doações com a mensagem de falha mais recente do gateway, vinda de `eventLogs`, e uma flag `canRetry` vinda das capacidades do gateway; `POST /giving/donate/retry/:donationId` chama o `retryFailedPayment` do provedor (o Stripe paga a fatura aberta), e o webhook resultante promove a linha para `complete` pelo caminho normal de deduplicação. Os e-mails de cobrança vão ao doador pelo manipulador de webhook no dia 0, e depois pelo `DunningHelper.run` no temporizador da meia-noite (ligado tanto em `lambda/timer-handler.ts` quanto em `RailwayCron.ts`) aos 3 e 7 dias; cada envio é registrado em `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, então uma nova execução nunca envia o mesmo e-mail duas vezes. Quando o Stripe desiste e cancela a assinatura (`customer.subscription.deleted` com `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envia um e-mail ao doador uma única vez (`providerId: "<subscriptionId>:canceled"`); cancelamentos iniciados pelo doador ou pelo admin permanecem silenciosos. O Stripe nunca adiciona eventos a um endpoint existente: depois de alterar `StripeHelper.webhookEvents`, ou salve novamente o gateway ou execute `tools/manual/stripe-webhook-events.ts` (simulação por padrão, `--apply` para gravar) contra a produção.

Provedores com `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) têm suas cobranças registradas a partir da resposta de `/charge` (sem necessidade de ida e volta de webhook no caminho feliz), enquanto o Stripe depende de `payment_intent.succeeded` / `invoice.paid` e do ACH `payment_intent.processing`. O tratamento de taxas (`POST /giving/donate/fee`, a flag de gateway `payFees` e o `calculateFees` de cada provedor) calcula a majoração "cobrir as taxas" do lado do doador -- o B1 não cobra nenhuma comissão da plataforma, então nenhuma taxa de aplicação é adicionada.

:::info
Os caminhos de cobrança e de webhook gravam as mesmas linhas de `donations` / `fundDonations`. O `transactionId` é a chave de junção que impede que um registro otimista de cobrança e seu webhook posterior gerem duas doações para uma mesma contribuição.
:::

## Páginas Relacionadas

- [Endpoints de Giving](../api/endpoints/giving) -- superfície REST completa para doações, fundos, lotes, gateways, assinaturas, formas de pagamento e webhooks
- [AppHelper](../shared-libraries/app-helper) -- o pacote npm que distribui o registro de provedores de pagamento e os componentes de doação
- [Estrutura de Módulos](../api/module-structure) -- como o módulo GivingApi é organizado no servidor
