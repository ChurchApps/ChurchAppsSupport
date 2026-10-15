---
title: "Arquitetura de Ofertas"
---

# Arquitetura de Ofertas

<div class="article-intro">

O ChurchApps processa doações com um modelo de gateway: a igreja mantém sua própria conta no Stripe (ou PayPal, Kingdom Funding ou Paystack), e o B1 nunca fica no caminho do dinheiro como processador da plataforma. Os dados do cartão são tokenizados no navegador e nunca chegam a um servidor do ChurchApps. Esta página mapeia toda a stack -- o registro de provedores do lado do cliente em `@churchapps/apphelper`, a abstração de gateway do GivingApi, o modelo de dados das doações e como os webhooks dos gateways são reconciliados com o banco de dados.

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

1. **O gateway guarda o cartão.** O widget de entrada de cada provedor tokeniza no navegador; a API só recebe um token, nonce ou ID de pedido.
2. **Uma abstração, muitos provedores.** O navegador resolve um `PaymentProvider` a partir de um registro; o servidor resolve um `IGatewayProvider` a partir de uma fábrica. Ambos usam o mesmo nome normalizado do provedor armazenado no registro do gateway.
3. **Os webhooks são a fonte da verdade para a liquidação.** A resposta de uma cobrança é registrada de forma otimista, mas o webhook assinado do gateway é o que confirma (ou cria) a doação concluída, com proteções de idempotência dos dois lados.

## Lado do cliente: o registro de provedores de pagamento (`@churchapps/apphelper`)

O registro fica em `Packages/apphelper/src/donations/providers/`, com os widgets e auxiliares de cada provedor em sua própria subpasta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- nada fora de `providers/` faz ramificações pelo nome do provedor. Um `PaymentProvider` (veja `providers/types.ts`) reúne tudo o que um aplicativo hospedeiro precisa para um gateway: um `descriptor` (rótulos de administração, moedas suportadas, campos de taxa, taxas padrão, URLs do painel/cadastro), um conjunto de `capabilities` (cartões salvos, ACH, recorrência, entrada de novo cartão em linha, salvamento implícito ao tokenizar), os widgets React para a entrada de membros (`MemberWrapper`/`MemberEntry`), a doação de visitantes (`GuestForm`), a edição de formas de pagamento salvas (`MethodEditForm`) e os pagamentos de perguntas de formulário (`FormPayment`), além de `buildChargeRequest(ctx, token)` -- o único ponto em que o formato do payload de cobrança difere por provedor. O `MemberWrapper` de cada provedor carrega seu próprio SDK a partir da chave pública do registro do gateway, então os aplicativos hospedeiros nunca importam um SDK de gateway (B1App e B1Admin não têm dependência de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qual dos gateways da igreja uma superfície deve usar.

`providers/registry.ts` contém os provedores integrados. Eles são **referenciados por valor**, e não registrados por um efeito colateral de módulo, para que o tree-shaking do empacotador nunca possa eliminar o registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Função | Finalidade |
|----------|---------|
| `getPaymentProvider(name)` | Resolve pelo nome normalizado; recorre ao Stripe para que um provedor mal configurado nunca derrube o formulário do doador |
| `registerPaymentProvider(p)` | Registra um provedor extra em tempo de execução (para um gateway personalizado de um aplicativo hospedeiro) |
| `listPaymentProviders()` | Enumera os integrados e os personalizados -- usado para montar o menu de gateways da administração |
| `hasPaymentProvider(name)` | Verificação de pertencimento |

**Provedores cliente integrados: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin apenas *leem* o registro (`getPaymentProvider`, `listPaymentProviders`); nenhum dos dois chama `registerPaymentProvider` -- o registro permanece dentro do apphelper.

Cada provedor tokeniza de forma diferente, mas todos mantêm o cartão fora do B1:

| Provedor | Widget de entrada | Token devolvido à API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` do Stripe `Elements` → `stripe.createPaymentMethod(...)`; o formulário de visitantes também monta um `ExpressCheckoutElement` (Apple Pay / Google Pay, para doações únicas) cujo `onConfirm` resolve para o mesmo ID `pm_…` | ID do método de pagamento (`pm_…`); conta bancária via `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` para gateways em USD, `acss_debit` com PAD canadense (modal de mandato hospedado, mandato `default_for` faturas/assinaturas, cobranças avulsas enviam o ID do mandato) para gateways em CAD |
| Kingdom Funding | Formulário tokenizador hospedado, identificado pela chave pública do gateway | nonce de uso único |
| PayPal | PayPal Hosted Fields (cartão, recorrência) mais PayPal Smart Buttons com financiamento via Venmo (únicas); ambos compartilham um único carregamento de SDK e o pedido no servidor montado via `/donate/client-token` + `/donate/create-order` | ID do pedido capturado |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) -- o próprio popup processa o pagamento (cartão, dinheiro móvel, transferência bancária, USSD) | referência da transação paga; os métodos salvos são códigos de autorização Paystack `AUTH_…` |

O `finalizeResult` do Stripe executa o 3-D Secure / SCA no navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de a doação ser considerada concluída; o formulário compartilhado apenas chama `provider.finalizeResult(result)` sem saber o que ele faz.

## Lado do servidor: a abstração de gateway (GivingApi)

O módulo `/giving` (`Api/src/modules/giving`) expõe a superfície REST; a infraestrutura dos gateways fica em `Api/src/shared/helpers`. O `DonateController` nunca fala diretamente com um SDK de gateway -- ele passa pelo `GatewayService`, que resolve o `IGatewayProvider` correto a partir do `GatewayFactory` e lhe entrega uma `GatewayConfig` já descriptografada.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) é o contrato que todo gateway implementa -- ciclo de vida do webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), taxas (`calculateFees`), tratamento de métodos salvos (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e extras opcionais (clientes, pedidos, SetupIntents, reprocessamento de eventos, `retryFailedPayment` para uma fatura de assinatura com falha, `registerPaymentMethodDomain` para a verificação de domínio do Apple Pay). Um provedor que omita um hook opcional é reportado como não suportado para aquela ação, e a interface oculta o controle correspondente. Cada classe de provedor declara sua própria matriz de `capabilities` (moedas suportadas, ACH, reembolsos, requisitos de assinatura, limites de transação) -- `GatewayService.getProviderCapabilities(provider)` apenas a lê -- e flags como `logsDonationsImmediately` direcionam o comportamento dos controladores sem nenhuma condição por nome de provedor nos controladores.

**Provedores de servidor registrados no `GatewayFactory`:**

| Provedor | Disponibilidade |
|----------|-------------|
| Stripe | Sempre ativo |
| PayPal | Sempre ativo |
| Kingdom Funding | Sempre ativo |
| Paystack | Sempre ativo (comerciantes da Nigéria, Gana, África do Sul, Quênia, Costa do Marfim; moedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcional, pela variável de ambiente `ENABLE_SQUARE` |
| ePayMints | Opcional, pela variável de ambiente `ENABLE_EPAYMINTS` |

O Paystack difere dos demais porque o dinheiro se move antes de o GivingApi ser envolvido: o popup cobra o doador, `processCharge` é um `GET /transaction/verify/:reference` cujo valor pago e moeda devem coincidir com a doação que está sendo registrada (uma referência já registrada nunca é lançada duas vezes), e o primeiro pagamento de um agendamento recorrente é lançado a partir de `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` com `start_date` um intervalo à frente). Os webhooks são assinados com a própria chave secreta (`x-paystack-signature`, HMAC-SHA512 sobre o corpo bruto) e o Paystack não tem API de gerenciamento de webhooks, então a tela de administração mostra a URL para a igreja colar no painel dela. Os eventos `charge.success` de renovação não trazem a divisão entre fundos; o provedor a recupera a partir das linhas locais `subscriptions`/`subscriptionFunds` do doador. Somente autorizações de cartão são `reusable` -- doações por dinheiro móvel são apenas únicas, então `createSubscription` as recusa. Os dados de demonstração semeiam uma segunda igreja (Accra Community Church, `CHU00000002`) em um gateway GHS de modo de teste do Paystack, para que a suíte Playwright do Paystack rode ao lado da suíte Stripe da Grace.

Provedores personalizados podem ser registrados em tempo de execução quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` está definido; `AbstractExperimentalGatewayProvider` é a classe base para eles. Os nomes dos provedores são comparados sem diferenciar maiúsculas de minúsculas.

### Configuração do gateway e segredos

Um administrador salva as credenciais do gateway por meio de `POST /giving/gateways` (`GatewayController`). Ao salvar, o controlador criptografa as chaves privada e de webhook com o `EncryptionHelper` antes de persistir e, em qualquer host que não seja localhost, exclui o webhook existente da igreja e provisiona um novo apontando para `/giving/donate/webhook/{provider}?churchId=…`. Uma igreja mantém uma linha por provedor: salvar um gateway substitui apenas a linha existente desse mesmo provedor. As leituras públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retornam somente as chaves públicas.

## Modelo de dados

O esquema de ofertas (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos em `models/`) é um esquema MySQL acessado via Kysely:

| Tabela | Função |
|-------|------|
| `gateways` | Configuração de provedor por igreja: `provider`, `publicKey`, `privateKey`/`webhookKey` criptografadas, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinações de doações (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamento para lançamento/relatórios (`name`, `batchDate`) |
| `donations` | Uma oferta: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; comprovantes, totais, painéis e relatórios de doações contam apenas `complete` ou nulo), `transactionId` |
| `fundDonations` | Alocação de uma doação entre um ou mais fundos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Doação recorrente; `id` é o ID de assinatura do gateway, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisão entre fundos de uma doação recorrente |
| `customers` | Vincula um `personId` ao ID de cliente do gateway, por `provider` |
| `gatewayPaymentMethods` | Cartões/bancos salvos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Trilha de auditoria de webhooks/eventos e chave de deduplicação (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanhas de promessas vinculadas a um fundo, e o valor prometido por cada pessoa |

Uma doação é dividida entre fundos por meio de `fundDonations` -- a doação carrega o total, e cada `fundDonation` carrega uma fatia. `donations.currency` e `gateways.currency` carregam a moeda ISO; cada provedor anuncia suas `supportedCurrencies`, e os valores são formatados com `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxos de ponta a ponta

### Doação única e recorrente de membros (B1App)

A tela de doação autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compõe três componentes do apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. O B1App faz o carregamento de dados ao redor -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- e repassa a lista de gateways; o provedor resolvido carrega seu próprio SDK a partir da chave pública do gateway. A cobrança em si acontece dentro do apphelper: o provedor resolvido tokeniza o método (novo ou salvo) e então envia para `/giving/donate/charge` para uma doação única ou para `/giving/donate/subscribe` para uma recorrente. Ambos os endpoints atribuem um doador autenticado ao próprio `personId` (somente quem tem `donations.edit` pode atribuir a outra pessoa) e rejeitam divisões entre fundos cuja soma seja maior que o valor cobrado. Doações recorrentes criam uma linha em `subscriptions` mais `subscriptionFunds` e entregam o agendamento ao gateway (Stripe Subscriptions, PayPal Billing Plans ou um agendamento recorrente da KF).

### Doação de visitantes / anônima

A página pública de doação (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e o painel "doe agora" renderizam o `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que injeta o reCAPTCHA e o contexto Elements do gateway ao redor do `GuestForm` do provedor. Visitantes não têm login, nem métodos salvos, nem histórico. O fluxo busca `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (somente chaves públicas), verifica o visitante com `POST /giving/donate/captcha-verify`, tokeniza no navegador e envia para `/giving/donate/charge` (ou `/subscribe`). O ACH de visitantes usa o `POST /giving/paymentmethods/ach-setup-intent-anon` anônimo, que permite apenas a verificação instantânea (Financial Connections): uma verificação por micro-depósitos termina dias depois, quando a página do visitante já não existe, então nunca poderia concluir a doação. O formulário se recusa a cobrar um SetupIntent não verificado e direciona o doador para cartão ou para a configuração de conta bancária com login.

Três opções do formulário de visitantes usam a mesma chamada de cobrança. `?fundId=` e `?amount=` na URL de doação pré-selecionam a divisão entre fundos (lidos pelo formulário de visitantes de cada provedor na montagem, roteados pelo manipulador normal de mudança de fundo para que os totais e taxas sejam atualizados). `anonymous: true` faz com que `DonateController.charge` descarte qualquer pessoa enviada pelo cliente e registre a doação com `personId = null`; o formulário de visitantes pula `/people/loadOrCreate` e a etapa de cliente/cofre, e os três provedores de registro imediato deixam de resolver uma pessoa a partir do cliente do gateway. O Apple Pay exige que o domínio da página esteja registrado no Stripe, então um formulário de visitantes do Stripe envia, uma vez por sessão, uma requisição para o `POST /giving/donate/register-domain` público e com limite de taxa, que aceita apenas um domínio que pertença à igreja (`<subDomain>.b1.church`, uma linha na tabela de domínios do módulo de conteúdo, ou um host local) antes de chamar a API de domínios de métodos de pagamento do Stripe.

### Lançamento administrativo e importação do Stripe (B1Admin)

A seção de doações do B1Admin (`B1Admin/src/donations/`) é onde as equipes financeiras trabalham. O lançamento em lote (`components/BulkDonationEntry.tsx`) registra ofertas em dinheiro/cheque/bens por meio de `POST /giving/donations` seguido de `/giving/funddonations` -- sem envolvimento de gateway. A folha **Registrar uma oferta** do registro da pessoa (`components/LogGiftDialog.tsx`) faz o mesmo para uma única oferta, primeiro procurando o lote cuja `batchDate` corresponda à data da oferta ou criando um lote com o nome dessa data (`POST /giving/donationbatches`), e excluindo novamente a doação/o novo lote se uma etapa posterior falhar. Fundos, lotes, campanhas e comprovantes correspondem às respectivas rotas CRUD `/giving/*`. O painel de doação no estilo membro (`B1Admin/src/donationComponents/`) reutiliza os mesmos componentes do apphelper do B1App.

Relatórios e integrações contábeis são trabalho do lado do cliente ou do executor de relatórios, não do gateway: a exportação para o QuickBooks da página de lote gera um CSV de lançamento contábil a partir de `donations` + `fundDonations` do lote (débito em Undeposited Funds, um crédito por fundo), a visão de Doadores Inativos da página de Resumo executa `Api/reports/lapsedGivers.json` pelo executor genérico de relatórios com os nomes das pessoas resolvidos pelo `ReportOutput`, e os formatos de recibo por país (Canadá / Austrália / Nova Zelândia) são configurações da igreja no armazenamento chave/valor de membresia, renderizadas pelo `GivingStatementDocument` e duplicadas na página de impressão do B1App. As páginas de impressão de comprovantes do B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passam a configuração `logoLight` da igreja (via `usePrintLogo` em `B1Admin/src/components/PrintChurchHeader.tsx`), para que o logotipo seja impresso no topo de cada comprovante, e aguardam a imagem antes da impressão automática.

### Conversão de totais em moedas mistas

Qualquer endpoint que retorne um total combinado único de ofertas que possivelmente estejam em moedas mistas -- os KPIs de resumo de ofertas (`GivingKpiCards`), o total de um lote de doações, o total de um fundo e os totais do ano até a data/período da tela de doação do B1App -- converte para a moeda padrão da igreja no servidor, em vez de somar moedas diferentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` busca as taxas em `api.frankfurter.dev` com base na moeda da igreja, guarda-as em cache dentro do processo por 12 horas e expõe `convertTotals(rows, churchCurrency, rates)`: as linhas são pré-agrupadas por moeda no SQL (poucos grupos, nunca uma conversão por oferta), cada grupo é convertido e somado, e o resultado traz uma flag `isConverted` que o cliente usa para mostrar a observação "Convertido pelas taxas de câmbio atuais". `GET /donations/exchange-rates` expõe a tabela de taxas para os clientes que precisam dela (a tela de doação do B1App); as taxas nunca são aceitas a partir de uma requisição, somente buscadas no servidor, então um cliente não pode influenciar um total informado. Registros individuais de doações e relatórios históricos/na moeda original nunca são convertidos -- apenas os totais combinados.

A importação do Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera ofertas feitas fora do B1: ela chama `POST /giving/donate/replay-stripe-events` com `dryRun: true` para uma prévia, depois `dryRun: false` para importar. O servidor lista os eventos do Stripe para o intervalo de datas e ignora tudo o que já foi registrado -- primeiro por ID do provedor em `eventLogs`, depois por ID da transação, depois por `DonationRepo.findMatchingDonation` (valor + data + pessoa), para que uma nova execução nunca importe em duplicidade. Eventos de assinatura `charge.succeeded` / `payment_intent.succeeded` são ignorados porque o `invoice.paid` registra essas ofertas; versões mais novas da API do Stripe removem `PaymentIntent.invoice`, então a ignorância também se baseia na descrição "Subscription …".

## Webhooks e reconciliação

Pagamentos liquidados e mudanças de estado de assinatura chegam em `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). O processamento é deliberadamente idempotente:

1. **Verificar** -- `GatewayService.verifyWebhook` delega à verificação de assinatura do provedor; uma assinatura inválida retorna 401. Eventos que não precisam de processamento encerram com 200.
2. **Deduplicar o evento** -- `EventLogRepo.loadByProviderId` ignora um webhook já registrado em `eventLogs`.
3. **Deduplicar a doação** -- antes de criar qualquer coisa, `DonationRepo.loadByTransactionId` é verificado contra todos os IDs candidatos que o payload pode conter. Isso absorve entregas duplicadas, eventos ACH de múltiplas etapas (pendente → liquidado) e o caso em que `/donate/charge` já registrou a oferta de forma otimista.
4. **Aplicar** -- `classifyWebhookEvent(eventType)` do provedor diz o que o evento significa (`donation` pendente/concluída, `cancel-subscription` ou `ignore`); pagamentos concluídos criam uma doação `complete` (ou promovem uma `pending` ou `failed` existente), eventos no estilo ACH ficam como `pending` até a liquidação, uma fatura de assinatura com falha (`invoice.payment_failed` do Stripe) cria uma doação `failed` identificada pelo ID da fatura, e eventos de cancelamento excluem a linha local em `subscriptions`. O controlador nunca inspeciona nomes de eventos específicos de provedor.

### Ofertas recorrentes com falha e cobrança de inadimplência

Uma doação `failed` é a unidade de trabalho para a recuperação. `GET /giving/donations/failed` as lista com a mensagem de falha mais recente do gateway, vinda de `eventLogs`, e uma flag `canRetry` das capacidades do gateway; `POST /giving/donate/retry/:donationId` chama o `retryFailedPayment` do provedor (o Stripe paga a fatura em aberto), e o webhook resultante promove a linha para `complete` pelo caminho normal de deduplicação. Os e-mails de cobrança são enviados ao doador pelo manipulador de webhook no dia 0, depois pelo `DunningHelper.run` no temporizador da meia-noite (ligado em `lambda/timer-handler.ts` e em `RailwayCron.ts`) aos 3 e 7 dias; cada envio é registrado em `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, para que uma nova execução nunca envie o e-mail duas vezes. Quando o Stripe desiste e cancela a assinatura (`customer.subscription.deleted` com `cancellation_details.reason: "payment_failed"`), o `DunningHelper.notifyCanceled` envia um e-mail ao doador uma única vez (`providerId: "<subscriptionId>:canceled"`); cancelamentos iniciados pelo doador ou pelo administrador permanecem em silêncio. O Stripe nunca adiciona eventos a um endpoint existente: depois de alterar `StripeHelper.webhookEvents`, ou salve novamente o gateway ou execute `tools/manual/stripe-webhook-events.ts` (simulação por padrão, `--apply` para gravar) em produção.

Provedores com `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) têm suas cobranças registradas a partir da resposta de `/charge` (nenhuma ida e volta de webhook é necessária no caminho feliz), enquanto o Stripe depende de `payment_intent.succeeded` / `invoice.paid` e do ACH `payment_intent.processing`. O tratamento de taxas (`POST /giving/donate/fee`, a flag de gateway `payFees` e o `calculateFees` de cada provedor) calcula o acréscimo de "cobrir as taxas" do lado do doador -- o B1 não cobra nenhuma comissão da plataforma, então nenhuma taxa de aplicação é adicionada.

:::info
Os caminhos de cobrança e de webhook gravam as mesmas linhas em `donations` / `fundDonations`. O `transactionId` é a chave de junção que impede que um registro otimista de cobrança e seu webhook posterior gerem duas doações para uma mesma oferta.
:::

## Páginas Relacionadas

- [Endpoints de Ofertas](../api/endpoints/giving) — superfície REST completa para doações, fundos, lotes, gateways, assinaturas, formas de pagamento e webhooks
- [AppHelper](../shared-libraries/app-helper) — o pacote npm que traz o registro de provedores de pagamento e os componentes de doação
- [Estrutura de Módulos](../api/module-structure) — como o módulo GivingApi é organizado no servidor
