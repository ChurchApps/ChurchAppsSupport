# MinistryStuff (Archiviazione e Servizi di Testo Pagati)

MinistryStuff.org è il servizio pagato separato che finanzia le due cose che ChurchApps non può regalare — archiviazione di file bulk (1TB+) e crediti SMS — come abbonamenti mensili forfettari. ChurchApps stesso rimane 100% gratuito; nulla in B1 richiede un abbonamento MinistryStuff, e ogni punto di integrazione è una cucitura del provider che una terza parte potrebbe anche implementare.

## Componenti

| Piece | Repo | Role |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (porta 8097 dev) | Fatturazione (Stripe), invio SMS + registro di crediti (AWS End User Messaging), archiviazione (S3 + accounting della quota). Single MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (porta 3103 dev) | ministrystuff.org — marketing, pricing e il portale di account (piani, utilizzo, reindirizzamenti Stripe Checkout/Customer Portal). |
| Provider di testo | `Packages/texting` → `MinistryStuffProvider` | Registrato come `ministrystuff` accanto a Clearstream/TextInChurch. |
| Cucitura di archiviazione | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (predefinito, gratuito) avvolge lo switch S3/disco originale; `FileStorageHelper` delega al provider predefinito invariato. |
| Cablaggio Api | `Api/` moduli contenuto e messaggistica | `MinistryStuffStorageProvider` + `StorageResolver` (contenuto), `TextingConfigHelper` iniezione di chiave di servizio (messaggistica), tabella `storageProviders`, endpoint `/content/storage/*` + `/messaging/texting/credits`. |

## Identità e fiducia

- Account uguali, chiese uguali: MinistryStuffApi verifica i JWT ChurchApps con il `JWT_SECRET` condiviso (modello app fratello, come B1Transfer). Il portale accede a MembershipApi e accetta hand-off `?jwt=`.
- Da server a server (Api di base → MinistryStuffApi): header `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, entrambi i lati) + `churchId` esplicito. Il diritto è sempre controllato rispetto all'abbonamento di quella chiesa. Le chiese non tengono mai le credenziali MinistryStuff — la selezione del provider in B1Admin è tutto ciò che è necessario.

## Flusso di messaggistica di testo

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → il conteggio dei segmenti viene addebitato contro i `smsCreditGrants` del periodo corrente → AWS End User Messaging (o `smsMode: mock` in dev). I crediti sono un **hard stop**: i crediti esauriti rifiutano all'ingrosso (`insufficient_credits`, presentato come un invito di aggiornamento amichevole in B1Admin) — mai invii parziali, mai fatturazione di eccedenza. I grant di crediti vengono emessi idempotentemente per periodo di fatturazione da webhook `invoice.paid` di Stripe. Gli opt-out (`smsOptOuts`) vengono filtrati prima di ogni invio.

Altri percorsi raggiungono la stessa cucitura del provider senza passare tramite `TextingController`: avvisi di check-in (`CheckinController` → `MessagingModuleGateway.sendBulkText`) e il passaggio di azione di workflow **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, che scrive righe `sentTexts` + `deliveryLogs` con mittente null). I campi di unione (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) vengono risolti per destinatario da `MergeFieldHelper.resolve` e il risultato è limitato a 1.600 caratteri. In `TextingController` un messaggio di gruppo contenente `{{` viene inviato come uno `sendMessage` per destinatario anziché un singolo `sendBulk`; un messaggio senza placeholder comunque esce come un invio bulk.

## Flusso di archiviazione

La riga del provider di una chiesa (`content.storageProviders`, gestita in B1Admin → Impostazioni → Archiviazione File) seleziona dove vanno i **nuovi** caricamenti. `contentPath` è un URL assoluto per file, quindi i provider misti coesistono con migrazione zero: i vecchi file continuano a servire da `content.churchapps.org`, i nuovi da `content.ministrystuff.org`. I caricamenti fluiscono Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (POST prescritto con `content-length-range` in modalità S3; fallback base64 in modalità disco/dev); i caricamenti instradano per l'URL archiviato (`StorageResolver.forUrl`). Quota = byte del piano, conteggiati da `storageObjects` (prenotazioni `stored` + `pending`); la quota superata blocca i nuovi caricamenti (`storage_quota_exceeded`) — nulla viene mai cancellato o fatturato in più. Il livello ChurchApps gratuito non è toccato (stessi limiti di prima; nessuna quota a livello di chiesa).

Nota di ambito: la selezione del provider copre il flusso di **file/risorse** di contenuto (dove vive il media bulk). I caricamenti di galleria/logo/foto rimangono sul provider predefinito — elencano chiavi dall'archiviazione e costruiscono URL lato client, in modo che l'accesso per chiesa non si applichi ancora.

La stessa cucitura alimenta anche [Bring-Your-Own Storage](./byos-storage): le chiese possono collegare Google Drive, Dropbox, OneDrive o il loro bucket S3-compatibile anziché un piano MinistryStuff.

## Fatturazione

Stripe Checkout (ospitato) per sottoscrizione, Stripe Customer Portal per aggiornamento carta/annullamento/fatture — MinistryStuffWeb non ha moduli di carta. Una riga `subscriptions` per (chiesa, prodotto); i piani/livelli vivono nel codice (`MinistryStuffApi/src/helpers/Plans.ts`) con ID prezzo Stripe da config. Webhook (`/billing/webhook`, verifica della firma del corpo non elaborato, dedup di `webhookEvents`) guida il ciclo di vita della sottoscrizione: active → past_due (grazia) → canceled.

## Configurazione di Dev

Esegui MinistryStuffApi (`yarn dev`, 8097; ha bisogno di `.env` con il `JWT_SECRET` condiviso + `MINISTRYSTUFF_SERVICE_KEY`) e imposta la stessa chiave di servizio in `Api/.env`. `Api/config/dev.json` punta già `ministryStuffApi` a `localhost:8097`. MinistryStuffWeb ha bisogno di `.env` con `VITE_STAGE=dev`. Dev usa `smsMode: mock` e archiviazione su disco — nessun AWS necessario.
