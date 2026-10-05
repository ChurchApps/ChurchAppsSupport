# MinistryStuff (Armazenamento Pago & SMS)

MinistryStuff.org é o serviço pago separado que financia as duas coisas que ChurchApps não pode dar — armazenamento em massa (1TB+) e créditos de SMS — como subscrições mensais de taxa fixa. ChurchApps em si permanece 100% gratuito; nada em B1 requer uma subscrição MinistryStuff, e cada ponto de integração é uma costura de provedor que um terceiro também poderia implementar.

## Componentes

| Peça | Repositório | Papel |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (porta 8097 dev) | Faturamento (Stripe), envio de SMS + livro-razão de crédito (AWS End User Messaging), armazenamento (S3 + contabilidade de cota). Banco de dados MySQL simples `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (porta 3103 dev) | ministrystuff.org — marketing, preços e o portal da conta (planos, uso, redirecionamentos de Stripe Checkout/Customer Portal). |
| Provedor de SMS | `Packages/texting` → `MinistryStuffProvider` | Registrado como `ministrystuff` ao lado de Clearstream/TextInChurch. |
| Costura de armazenamento | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (padrão, gratuito) envolve o comutador S3/disco original; `FileStorageHelper` delega ao provedor padrão inalterado. |
| Fiação de Api | Módulos `Api/` conteúdo + mensagens | `MinistryStuffStorageProvider` + `StorageResolver` (conteúdo), injeção de serviço `TextingConfigHelper` (mensagens), tabela `storageProviders`, endpoints `/content/storage/*` + `/messaging/texting/credits`. |

## Identidade & confiança

- Mesmas contas, mesmas igrejas: MinistryStuffApi verifica JWTs ChurchApps com o `JWT_SECRET` compartilhado (padrão de aplicativo irmão, como B1Transfer). O portal faz login contra MembershipApi e aceita hand-offs `?jwt=`.
- Servidor-para-servidor (Api principal → MinistryStuffApi): cabeçalho `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, ambos lados) + `churchId` explícito. Direito é sempre verificado contra a subscrição daquela igreja. Igrejas nunca seguram credenciais MinistryStuff — selecionar o provedor em B1Admin é tudo que é necessário.

## Fluxo de SMS

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → contagem de segmento debitada contra `smsCreditGrants` do período atual → AWS End User Messaging (ou `smsMode: mock` em dev). Créditos são um **parada difícil**: créditos esgotados rejeitam no atacado (`insufficient_credits`, superficial como um prompt de atualização amigável em B1Admin) — nunca envios parciais, nunca faturamento de excedente. Concessões de crédito são emitidas idempotetamente por período de faturamento a partir de webhooks `invoice.paid` de Stripe. Opt-outs (`smsOptOuts`) são filtrados antes de cada envio.

Outros caminhos alcançam a mesma costura de provedor sem ir através de `TextingController`: alertas de checkin (`CheckinController` → `MessagingModuleGateway.sendBulkText`) e a ação do passo de fluxo de trabalho **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, que escreve linhas `sentTexts` + `deliveryLogs` com um remetente null). Campos de mesclagem (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) são resolvidos por destinatário por `MergeFieldHelper.resolve` e o resultado é limitado em 1.600 caracteres. Em `TextingController` uma mensagem de grupo contendo `{{` é enviada como um `sendMessage` por destinatário em vez de um único `sendBulk`; uma mensagem sem espaços reservados ainda sai como um envio em massa único.

## Fluxo de armazenamento

Uma linha de provedor da igreja (`content.storageProviders`, gerenciada em B1Admin → Configurações → File Storage) seleciona onde novos carregamentos vão. `contentPath` é uma URL por arquivo absoluto, portanto provedores mistos coexistem com zero migração: arquivos antigos continuam servindo de `content.churchapps.org`, novos de `content.ministrystuff.org`. Carregamentos fluem Api → `StorageResolver.forChurch` → provedor `store`/`getUploadUrl` (POST pré-assinado com `content-length-range` em modo S3; fallback base64 em modo disco/dev); deletar rotas pela URL armazenada (`StorageResolver.forUrl`). Cota = bytes de plano, contados de `storageObjects` (reservas armazenadas + `pending`); cota excedida bloqueia novos carregamentos (`storage_quota_exceeded`) — nada é nunca deletado ou faturado extra. O nível gratuito ChurchApps é intocado (mesmos limites que antes; sem cota em toda a igreja).

Nota de escopo: seleção de provedor cobre o fluxo de **arquivos/recursos** de conteúdo (onde mídia em massa vive). Carregamentos de galeria/logo/foto ficam no provedor padrão — eles listam chaves do armazenamento e constroem URLs no lado do cliente, portanto enraizamento por-igreja não se aplica ainda.

A mesma costura também alimenta [Bring-Your-Own Storage](./byos-storage): igrejas podem ligar Google Drive, Dropbox, OneDrive ou seu próprio balde compatível com S3 em vez de um plano MinistryStuff.

## Faturamento

Stripe Checkout (hospedado) para subscrição, Stripe Customer Portal para atualização de cartão/cancelamento/invoices — MinistryStuffWeb não tem formulários de cartão. Uma linha `subscriptions` por (church, product); planos/tiers vivem em código (`MinistryStuffApi/src/helpers/Plans.ts`) com ids de preço de Stripe de config. Webhook (`/billing/webhook`, verificação de assinatura de corpo bruto, dedup `webhookEvents`) orienta o ciclo de vida da subscrição: ativo → past_due (graça) → cancelado.

## Configuração de dev

Execute MinistryStuffApi (`yarn dev`, 8097; precisa `.env` com o `JWT_SECRET` compartilhado + `MINISTRYSTUFF_SERVICE_KEY`) e defina a mesma chave de serviço em `Api/.env`. `Api/config/dev.json` já aponta `ministryStuffApi` para `localhost:8097`. MinistryStuffWeb precisa `.env` com `VITE_STAGE=dev`. Dev usa `smsMode: mock` e armazenamento em disco — nenhum AWS necessário.
