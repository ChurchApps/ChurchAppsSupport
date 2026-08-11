# MinistryStuff (Armazenamento Pago e Envio de Mensagens)

MinistryStuff.org é o serviço pago separado que financia as duas coisas que ChurchApps não pode dar gratuitamente — armazenamento de arquivo em massa (1TB+) e créditos de SMS — como assinaturas mensais de taxa fixa. O ChurchApps em si permanece 100% gratuito; nada em B1 requer uma assinatura MinistryStuff, e cada ponto de integração é uma costura de provedor que um terceiro também pode implementar.

## Componentes

| Peça | Repo | Função |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (porta 8097 dev) | Cobrança (Stripe), envio de SMS + ledger de crédito (AWS End User Messaging), armazenamento (S3 + contabilidade de cota). Banco de dados MySQL único `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (porta 3103 dev) | ministrystuff.org — marketing, preços e portal de conta (planos, uso, redirecionamentos Stripe Checkout/Customer Portal). |
| Provedor de envio de mensagens | `Packages/texting` → `MinistryStuffProvider` | Registrado como `ministrystuff` ao lado de Clearstream/TextInChurch. |
| Costura de armazenamento | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (padrão, gratuito) envolve o interruptor S3/disco original; `FileStorageHelper` delega ao provedor padrão inalterado. |
| Fiação de Api | `Api/` content + messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), injeção de `TextingConfigHelper` serviço-chave (messaging), tabela `storageProviders`, endpoints `/content/storage/*` + `/messaging/texting/credits`. |

## Identidade e Confiança

- Mesmas contas, mesmas igrejas: MinistryStuffApi verifica JWTs de ChurchApps com o `JWT_SECRET` compartilhado (padrão de aplicativo irmão, como B1Transfer). O portal faz login contra MembershipApi e aceita hand-offs `?jwt=`.
- Servidor-a-servidor (Api central → MinistryStuffApi): cabeçalho `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, ambos os lados) + `churchId` explícito. A titularidade sempre é verificada contra a assinatura dessa igreja.

## Fluxo de Envio de Mensagens

B1Admin Enviar Texto → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → contagem de segmento debitada contra os `smsCreditGrants` do período atual → AWS End User Messaging (ou `smsMode: mock` em dev). Os créditos são uma **parada difícil**: créditos esgotados rejeitam atacadista (`insufficient_credits`, superficiado como prompt de atualização amigável em B1Admin) — nunca envios parciais, nunca faturamento de excedente. As concessões de crédito são emitidas idempotentemente por período de faturamento desde webhooks `invoice.paid` do Stripe. Os opt-outs (`smsOptOuts`) são filtrados antes de cada envio.

## Fluxo de Armazenamento

A linha de provedor de uma chiesa (`content.storageProviders`, gerenciada em B1Admin → Configurações → Armazenamento de Arquivo) seleciona onde **novos** uploads vão. `contentPath` é uma URL absoluta por arquivo, então provedores mistos coexistem com zero migração: arquivos antigos continuam servindo de `content.churchapps.org`, os novos de `content.ministrystuff.org`. Os uploads fluem Api → `StorageResolver.forChurch` → provedor `store`/`getUploadUrl` (POST pré-assinado S3 com `content-length-range`; fallback base64 em modo disco/dev); deletes rota pela URL armazenada (`StorageResolver.forUrl`). Cota = bytes de plano, contados de `storageObjects` (reservas `stored` + `pending`); cota excedida bloqueia novos uploads (`storage_quota_exceeded`) — nada nunca é deletado ou cobrado extra. A camada gratuita ChurchApps é intocada (mesmos limites que antes; sem cota em toda a igreja).

Nota de escopo: seleção de provedor cobre o fluxo de **arquivos/recursos de conteúdo** (onde mídia em massa vive). Carregamentos de galeria/logotipo/foto permanecem no provedor padrão — eles listam chaves de armazenamento e construem URLs do lado do cliente, então enraizamento por-igreja não se aplica ainda.

A mesma costura também alimenta [Armazenamento Traga seu Próprio](./byos-storage): as igrejas podem vincular Google Drive, Dropbox, OneDrive ou seu próprio balde compatível com S3 em vez de um plano MinistryStuff.

## Cobrança

Stripe Checkout (hospedado) para se inscrever, Stripe Customer Portal para atualização de cartão/cancelamento/faturas — MinistryStuffWeb não tem formulários de cartão. Uma linha `subscriptions` por (chiesa, produto); planos/níveis vivem no código (`MinistryStuffApi/src/helpers/Plans.ts`) com ids de preço Stripe da configuração. Webhook (`/billing/webhook`, verificação de assinatura de corpo bruto, dedup `webhookEvents`) impulsiona o ciclo de vida da assinatura: ativo → past_due (graça) → cancelado.

## Configuração de Dev

Execute MinistryStuffApi (`yarn dev`, 8097; precisa `.env` com o `JWT_SECRET` compartilhado + `MINISTRYSTUFF_SERVICE_KEY`) e defina a mesma chave de serviço em `Api/.env`. `Api/config/dev.json` já aponta `ministryStuffApi` para `localhost:8097`. MinistryStuffWeb precisa `.env` com `VITE_STAGE=dev`. Dev usa `smsMode: mock` e armazenamento em disco — nenhuma AWS necessária.
