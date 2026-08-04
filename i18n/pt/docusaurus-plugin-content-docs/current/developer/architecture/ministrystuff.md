# MinistryStuff (Armazenamento e Mensagens de Texto Pagos)

MinistryStuff.org é o serviço pago separado que financia as duas coisas que o ChurchApps não pode oferecer de graça — armazenamento de arquivos em massa (1TB+) e créditos de SMS — como assinaturas mensais de taxa fixa. O próprio ChurchApps permanece 100% gratuito; nada no B1 exige uma assinatura do MinistryStuff, e todo ponto de integração é um ponto de extensão de provedor que um terceiro também poderia implementar.

## Componentes

| Peça | Repo | Papel |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (porta 8097 dev) | Faturamento (Stripe), envio de SMS + livro-razão de créditos (AWS End User Messaging), armazenamento (S3 + contabilidade de cota). Um único banco MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (porta 3103 dev) | ministrystuff.org — marketing, preços, e o portal de conta (planos, uso, redirecionamentos para Stripe Checkout/Customer Portal). |
| Provedor de mensagens de texto | `Packages/texting` → `MinistryStuffProvider` | Registrado como `ministrystuff` ao lado de Clearstream/TextInChurch. |
| Ponto de extensão de armazenamento | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (padrão, gratuito) envolve o interruptor S3/disco original; `FileStorageHelper` delega ao provedor padrão sem alterações. |
| Conexão na Api | Módulos content + messaging da `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (content), injeção de chave de serviço do `TextingConfigHelper` (messaging), tabela `storageProviders`, pontos de extremidade `/content/storage/*` + `/messaging/texting/credits`. |

## Identidade e confiança

- Mesmas contas, mesmas igrejas: o MinistryStuffApi verifica os JWTs do ChurchApps com o `JWT_SECRET` compartilhado (padrão de aplicativo-irmão, como o B1Transfer). O portal faz login contra a MembershipApi e aceita transferências via `?jwt=`.
- Servidor-a-servidor (Api principal → MinistryStuffApi): cabeçalho `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, dos dois lados) + `churchId` explícito. O direito de uso é sempre verificado contra a assinatura daquela igreja. As igrejas nunca guardam credenciais do MinistryStuff — selecionar o provedor no B1Admin é tudo que é necessário.

## Fluxo de mensagens de texto

B1Admin Enviar Texto → `TextingController` da Api → `getProvider("ministrystuff")` do `@churchapps/texting` → MinistryStuffApi `/sms/send|/sms/sendBulk` → contagem de segmentos debitada contra os `smsCreditGrants` do período atual → AWS End User Messaging (ou `smsMode: mock` em dev). Os créditos são um **limite rígido**: créditos esgotados rejeitam o envio por completo (`insufficient_credits`, exibido como um aviso amigável de upgrade no B1Admin) — nunca envios parciais, nunca cobrança por excedente. As concessões de crédito são emitidas de forma idempotente por período de faturamento a partir dos webhooks `invoice.paid` do Stripe. Os opt-outs (`smsOptOuts`) são filtrados antes de cada envio.

## Fluxo de armazenamento

A linha de provedor de uma igreja (`content.storageProviders`, gerenciada em B1Admin → Configurações → Armazenamento de Arquivos) seleciona para onde vão os **novos** uploads. `contentPath` é uma URL absoluta por arquivo, então provedores mistos coexistem sem qualquer migração: arquivos antigos continuam sendo servidos a partir de `content.churchapps.org`, os novos a partir de `content.ministrystuff.org`. Os uploads fluem Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` do provedor (POST pré-assinado com `content-length-range` em modo S3; alternativa em base64 no modo disco/dev); as exclusões são roteadas pela URL armazenada (`StorageResolver.forUrl`). A cota = bytes do plano, contados a partir de `storageObjects` (reservas `stored` + `pending`); exceder a cota bloqueia novos uploads (`storage_quota_exceeded`) — nada é jamais excluído ou cobrado a mais. O nível gratuito do ChurchApps permanece intocado (mesmos limites de antes; sem cota em toda a igreja).

Observação de escopo: a seleção de provedor cobre o fluxo de **arquivos/recursos** de conteúdo (onde vive a mídia em massa). Uploads de galeria/logo/foto permanecem no provedor padrão — eles listam chaves a partir do armazenamento e constroem URLs no lado do cliente, então o roteamento por igreja ainda não se aplica a eles.

## Faturamento

Stripe Checkout (hospedado) para assinar, Stripe Customer Portal para atualizar cartão/cancelar/faturas — o MinistryStuffWeb não tem formulários de cartão. Uma linha `subscriptions` por (igreja, produto); planos/níveis vivem no código (`MinistryStuffApi/src/helpers/Plans.ts`) com ids de preço do Stripe vindos da configuração. O webhook (`/billing/webhook`, verificação de assinatura de corpo bruto, deduplicação por `webhookEvents`) conduz o ciclo de vida da assinatura: ativo → atrasado (período de carência) → cancelado.

## Configuração de desenvolvimento

Execute o MinistryStuffApi (`yarn dev`, 8097; precisa de um `.env` com o `JWT_SECRET` compartilhado + `MINISTRYSTUFF_SERVICE_KEY`) e defina a mesma chave de serviço em `Api/.env`. `Api/config/dev.json` já aponta `ministryStuffApi` para `localhost:8097`. O MinistryStuffWeb precisa de um `.env` com `VITE_STAGE=dev`. O ambiente de desenvolvimento usa `smsMode: mock` e armazenamento em disco — não é necessário AWS.
