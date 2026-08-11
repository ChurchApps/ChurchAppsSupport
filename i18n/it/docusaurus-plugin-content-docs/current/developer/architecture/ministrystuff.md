# MinistryStuff (Archiviazione Pagata e Texting)

MinistryStuff.org è il servizio pagato separato che finanzia le due cose che ChurchApps non può regalar via -- archiviazione di file in massa (1TB+) e crediti SMS -- come abbonamenti mensili a tariffa fissa. ChurchApps stessa rimane 100% gratuita; nulla in B1 richiede un abbonamento MinistryStuff, e ogni punto di integrazione è un seam del provider che una terza parte potrebbe anche implementare.

## Componenti

| Pezzo | Repo | Ruolo |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (porta 8097 dev) | Fatturazione (Stripe), invio SMS + ledger di crediti (AWS End User Messaging), archiviazione (S3 + contabilità di quota). Singolo DB MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (porta 3103 dev) | ministrystuff.org -- marketing, prezzi e portale degli account (piani, utilizzo, reindirizzamenti Stripe Checkout/Customer Portal). |
| Provider di Texting | `Packages/texting` → `MinistryStuffProvider` | Registrato come `ministrystuff` accanto a Clearstream/TextInChurch. |
| Seam di Archiviazione | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, gratuito) avvolge l'interruttore originale S3/disk; `FileStorageHelper` delega al provider default invariato. |
| Cablaggio Api | `Api/` moduli content + messaging | `MinistryStuffStorageProvider` + `StorageResolver` (content), iniezione S2S `TextingConfigHelper` (messaging), tabella `storageProviders`, endpoint `/content/storage/*` + `/messaging/texting/credits`. |

## Identità e Fiducia

- Stessi account, stesse chiese: MinistryStuffApi verifica JWT di ChurchApps con il `JWT_SECRET` condiviso (modello di app fratello, come B1Transfer). Il portale accede a MembershipApi e accetta handoff `?jwt=`.
- Server-to-server (Api core → MinistryStuffApi): header `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, entrambi i lati) + `churchId` esplicito. L'idoneità viene sempre controllata rispetto all'abbonamento di quella chiesa. Le chiese non detengono mai credenziali MinistryStuff -- selezionare il provider in B1Admin è tutto ciò che è necessario.

## Flusso di Texting

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → conteggio di segmenti addebitato rispetto ai `smsCreditGrants` del periodo attuale → AWS End User Messaging (o `smsMode: mock` in dev). I crediti sono una **fermata difficile**: crediti esauriti rifiutano per intero (`insufficient_credits`, superficiale come un prompt di aggiornamento amichevole in B1Admin) -- mai invii parziali, mai fatturazione di overage. Le concessioni di crediti vengono emesse in modo idempotente per periodo di fatturazione dai webhook `invoice.paid` di Stripe. Gli opt-out (`smsOptOuts`) vengono filtrati prima di ogni invio.

## Flusso di Archiviazione

Una riga di provider della chiesa (`content.storageProviders`, gestita in B1Admin → Impostazioni → Archiviazione File) seleziona dove vanno i **nuovi** upload. `contentPath` è un URL per file assoluto, quindi i provider misti coesistono con zero migrazione: i file vecchi continuano a servire da `content.churchapps.org`, i nuovi da `content.ministrystuff.org`. Gli upload scorrono Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (POST prescritto con `content-length-range` in modalità S3; fallback base64 in modalità disk/dev); gli elimina instrada dall'URL memorizzato (`StorageResolver.forUrl`). Quota = byte del piano, contati da `storageObjects` (prenotazioni `stored` + `pending`); quota superata blocca i nuovi upload (`storage_quota_exceeded`) -- nulla viene mai eliminato o fatturato in più. Il livello gratuito di ChurchApps rimane intatto (stessi limiti di prima; nessuna quota per chiesa).

Nota di portata: la selezione del provider copre il flusso di **file/risorse** del contenuto (dove vive la media di massa). Gli upload di galleria/logo/foto rimangono sul provider default -- elencano le chiavi dall'archiviazione e costruiscono URL lato client, quindi il rooting per chiesa non si applica ancora.

Lo stesso seam alimenta anche [Archiviazione Bring-Your-Own](./byos-storage): le chiese possono collegare Google Drive, Dropbox, OneDrive o il proprio bucket S3-compatibile invece di un piano MinistryStuff.

## Fatturazione

Stripe Checkout (ospitato) per iscriviti, Stripe Customer Portal per aggiornamento della carta/annulla/fatture -- MinistryStuffWeb non ha moduli di carte. Una riga `subscriptions` per (chiesa, prodotto); piani/livelli vivono in codice (`MinistryStuffApi/src/helpers/Plans.ts`) con id di prezzo Stripe dalla configurazione. Webhook (`/billing/webhook`, verificazione della firma del corpo grezzo, dedup `webhookEvents`) aziona il ciclo di vita dell'abbonamento: active → past_due (grazia) → canceled.

## Setup Dev

Esegui MinistryStuffApi (`yarn dev`, 8097; ha bisogno di `.env` con il `JWT_SECRET` condiviso + `MINISTRYSTUFF_SERVICE_KEY`) e imposta la stessa chiave di servizio in `Api/.env`. `Api/config/dev.json` punta già `ministryStuffApi` a `localhost:8097`. MinistryStuffWeb ha bisogno di `.env` con `VITE_STAGE=dev`. Dev usa `smsMode: mock` e archiviazione su disco -- nessun AWS necessario.
