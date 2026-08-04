# MinistryStuff (Archiviazione e SMS a pagamento)

MinistryStuff.org è il servizio separato a pagamento che finanzia le due cose che ChurchApps non può offrire gratuitamente — l'archiviazione di file in blocco (1TB+) e i crediti SMS — come abbonamenti mensili a tariffa fissa. ChurchApps stessa rimane 100% gratuita; niente in B1 richiede un abbonamento MinistryStuff, e ogni punto di integrazione è un seam di provider che anche una terza parte potrebbe implementare.

## Componenti

| Elemento | Repo | Ruolo |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (porta 8097 in dev) | Fatturazione (Stripe), invio SMS + libro mastro dei crediti (AWS End User Messaging), archiviazione (S3 + contabilità delle quote). Singolo DB MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (porta 3103 in dev) | ministrystuff.org — marketing, prezzi, e il portale account (piani, utilizzo, redirect a Stripe Checkout/Customer Portal). |
| Provider di messaggistica | `Packages/texting` → `MinistryStuffProvider` | Registrato come `ministrystuff` accanto a Clearstream/TextInChurch. |
| Seam di archiviazione | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (predefinito, gratuito) avvolge lo switch S3/disco originale; `FileStorageHelper` delega al provider predefinito senza modifiche. |
| Cablaggio Api | Moduli content + messaging di `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (content), iniezione di chiave di servizio di `TextingConfigHelper` (messaging), tabella `storageProviders`, endpoint `/content/storage/*` + `/messaging/texting/credits`. |

## Identità e fiducia

- Stessi account, stesse chiese: MinistryStuffApi verifica i JWT di ChurchApps con il `JWT_SECRET` condiviso (pattern app-gemella, come B1Transfer). Il portale effettua il login contro MembershipApi e accetta handoff `?jwt=`.
- Server-to-server (Api centrale → MinistryStuffApi): intestazione `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, entrambi i lati) + `churchId` esplicito. L'idoneità viene sempre verificata contro l'abbonamento di quella chiesa. Le chiese non detengono mai credenziali MinistryStuff — selezionare il provider in B1Admin è tutto ciò che serve.

## Flusso di messaggistica

Invio SMS di B1Admin → `TextingController` dell'Api → `getProvider("ministrystuff")` di `@churchapps/texting` → `/sms/send|/sms/sendBulk` di MinistryStuffApi → conteggio dei segmenti addebitato contro gli `smsCreditGrants` del periodo corrente → AWS End User Messaging (o `smsMode: mock` in dev). I crediti sono uno **stop rigido**: i crediti esauriti rifiutano in blocco (`insufficient_credits`, presentato come un invito amichevole a fare l'upgrade in B1Admin) — mai invii parziali, mai fatturazione per eccedenza. Le concessioni di credito vengono emesse in modo idempotente per ogni periodo di fatturazione dai webhook `invoice.paid` di Stripe. Gli opt-out (`smsOptOuts`) vengono filtrati prima di ogni invio.

## Flusso di archiviazione

La riga del provider di una chiesa (`content.storageProviders`, gestita in B1Admin → Impostazioni → Archiviazione file) seleziona dove vanno i **nuovi** caricamenti. `contentPath` è un URL assoluto per singolo file, così provider misti coesistono con zero migrazione: i vecchi file continuano a essere serviti da `content.churchapps.org`, i nuovi da `content.ministrystuff.org`. I caricamenti fluiscono Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` del provider (POST presigned con `content-length-range` in modalità S3; fallback base64 in modalità disco/dev); le eliminazioni instradano tramite l'URL memorizzato (`StorageResolver.forUrl`). Quota = byte del piano, contati da `storageObjects` (prenotazioni `stored` + `pending`); il superamento della quota blocca i nuovi caricamenti (`storage_quota_exceeded`) — niente viene mai eliminato o fatturato in più. Il livello gratuito di ChurchApps rimane invariato (stessi limiti di prima; nessuna quota a livello di chiesa).

Nota sull'ambito: la selezione del provider copre il flusso di file/risorse di contenuto **files/resources** (dove vive la maggior parte dei media). I caricamenti di galleria/logo/foto rimangono sul provider predefinito — elencano le chiavi dall'archiviazione e costruiscono gli URL lato client, quindi il radicamento per chiesa non si applica ancora.

## Fatturazione

Stripe Checkout (ospitato) per l'iscrizione, Stripe Customer Portal per aggiornamento carta/cancellazione/fatture — MinistryStuffWeb non ha moduli per carte. Una riga `subscriptions` per (chiesa, prodotto); piani/livelli vivono nel codice (`MinistryStuffApi/src/helpers/Plans.ts`) con id di prezzo Stripe dalla configurazione. Il webhook (`/billing/webhook`, verifica della firma a corpo grezzo, dedup `webhookEvents`) guida il ciclo di vita dell'abbonamento: attivo → past_due (grazia) → cancellato.

## Setup di sviluppo

Esegui MinistryStuffApi (`yarn dev`, 8097; richiede `.env` con il `JWT_SECRET` condiviso + `MINISTRYSTUFF_SERVICE_KEY`) e imposta la stessa chiave di servizio in `Api/.env`. `Api/config/dev.json` già punta `ministryStuffApi` a `localhost:8097`. MinistryStuffWeb richiede `.env` con `VITE_STAGE=dev`. Dev usa `smsMode: mock` e archiviazione su disco — nessun AWS necessario.
