# MinistryStuff (Stocare plătită și SMS)

MinistryStuff.org este serviciul separat, cu plată, care finanțează cele două lucruri pe care ChurchApps nu le poate oferi gratuit: stocarea în masă a fișierelor (1TB+) și creditele SMS. Acestea sunt disponibile ca abonamente lunare cu tarif fix. ChurchApps rămâne 100% gratuit. Nimic din B1 nu necesită un abonament MinistryStuff, iar fiecare punct de integrare este o interfață de furnizor pe care o terță parte ar putea-o implementa la fel de bine.

## Componente

| Componentă | Depozit | Rol |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 în dezvoltare) | Facturare (Stripe), trimitere SMS și registrul de credite (AWS End User Messaging), stocare (S3 + contorizarea cotei). Bază de date MySQL unică: `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 în dezvoltare) | ministrystuff.org: marketing, prețuri și portalul contului (planuri, utilizare, redirecționări către Stripe Checkout și Customer Portal). |
| Furnizor de SMS | `Packages/texting` → `MinistryStuffProvider` | Înregistrat ca `ministrystuff`, alături de Clearstream și TextInChurch. |
| Punct de integrare pentru stocare | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (implicit, gratuit) încapsulează comutatorul original S3/disc. `FileStorageHelper` deleghează neschimbat către furnizorul implicit. |
| Conectarea Api | Conținut `Api/` + module de mesagerie | `MinistryStuffStorageProvider` + `StorageResolver` (conținut), injectarea cheii de serviciu în `TextingConfigHelper` (mesagerie), tabela `storageProviders`, endpoint-urile `/content/storage/*` și `/messaging/texting/credits`. |

## Identitate și încredere

- Aceleași conturi, aceleași biserici: MinistryStuffApi verifică JWT-urile ChurchApps cu `JWT_SECRET` partajat (modelul aplicațiilor-surori, ca B1Transfer). Portalul se autentifică prin MembershipApi și acceptă transferuri `?jwt=`.
- Server-la-server (Api principal → MinistryStuffApi): antetul `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, pe ambele părți) și `churchId` explicit. Drepturile sunt verificate întotdeauna față de abonamentul acelei biserici. Bisericile nu dețin niciodată credențiale MinistryStuff. Pentru a le folosi, este suficient să selecteze furnizorul în B1Admin.

## Fluxul de SMS

B1Admin → Trimite SMS → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → numărul de segmente este debitat din `smsCreditGrants` al perioadei curente → AWS End User Messaging (sau `smsMode: mock` în dezvoltare).

Creditele funcționează ca un **stop strict**: dacă creditele s-au epuizat, trimiterea este respinsă integral (`insufficient_credits`, afișat în B1Admin ca un mesaj prietenos care invită la upgrade). Nu există trimiteri parțiale și nu există facturare pentru depășire. Acordarea creditelor se face idempotent pe perioadă de facturare, din webhook-urile Stripe `invoice.paid`. Dezabonările (`smsOptOuts`) sunt filtrate înainte de fiecare trimitere.

Alte căi ajung la același punct de integrare fără să treacă prin `TextingController`: alertele de check-in (`CheckinController` → `MessagingModuleGateway.sendBulkText`) și acțiunea de pas de flux de lucru **Trimite SMS** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`), care scrie rânduri în `sentTexts` și `deliveryLogs` cu expeditorul null. Câmpurile de îmbinare (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sunt rezolvate pentru fiecare destinatar de `MergeFieldHelper.resolve`, iar rezultatul este limitat la 1.600 de caractere. În `TextingController`, un mesaj de grup care conține `{{` este trimis ca un `sendMessage` per destinatar, în loc de un singur `sendBulk`. Un mesaj fără substituenți este trimis tot ca o singură trimitere în masă.

## Fluxul de stocare

Rândul furnizorului de stocare al unei biserici (`content.storageProviders`, gestionat în B1Admin → Settings → File Storage) stabilește unde ajung încărcările **noi**. `contentPath` este un URL absolut pentru fiecare fișier, așa că furnizorii diferiți coexistă fără nicio migrare: fișierele vechi continuă să fie servite de la `content.churchapps.org`, iar cele noi de la `content.ministrystuff.org`.

Încărcările parcurg Api → `StorageResolver.forChurch` → `store` / `getUploadUrl` ale furnizorului. În modul S3 se folosește un POST presemnat cu `content-length-range`, iar în modul disk/dev se folosește un mecanism de rezervă base64. Ștergerile sunt direcționate după URL-ul stocat (`StorageResolver.forUrl`).

Cota este egală cu octeții planului și se numără din `storageObjects` (rezervările `stored` și `pending`). Dacă cota este depășită, încărcările noi sunt blocate (`storage_quota_exceeded`). Nimic nu este șters și nimic nu este facturat suplimentar. Nivelul gratuit ChurchApps rămâne neschimbat, cu aceleași limite ca înainte și fără cotă la nivel de biserică.

Notă de domeniu: selectarea furnizorului acoperă fluxul de **fișiere și resurse** de conținut, adică locul unde se află media în masă. Încărcările de galerie, logo și fotografii rămân pe furnizorul implicit. Acestea listează cheile din stocare și construiesc URL-urile pe partea clientului, deci ancorarea pe biserică nu se aplică încă.

Aceeași interfață alimentează și [Bring-Your-Own Storage](./byos-storage.md): bisericile pot lega Google Drive, Dropbox, OneDrive sau propriul bucket compatibil S3, în loc să folosească un plan MinistryStuff.

## Facturare

Stripe Checkout (găzduit) se folosește pentru abonare, iar Stripe Customer Portal pentru actualizarea cardului, anulare și facturi. MinistryStuffWeb nu conține formulare de card. Există un rând `subscriptions` pentru fiecare pereche (biserică, produs). Planurile și nivelurile se află în cod (`MinistryStuffApi/src/helpers/Plans.ts`), cu ID-urile de preț Stripe din configurare. Webhook-ul (`/billing/webhook`, cu verificarea semnăturii pe corpul brut și deduplicare prin `webhookEvents`) gestionează ciclul de viață al abonamentului: activ → past_due (perioadă de grație) → anulat.

## Configurare pentru dezvoltare

Pornește MinistryStuffApi (`yarn dev`, port 8097). Are nevoie de un fișier `.env` cu `JWT_SECRET` partajat și `MINISTRYSTUFF_SERVICE_KEY`. Setează aceeași cheie de serviciu în `Api/.env`. `Api/config/dev.json` indică deja `ministryStuffApi` către `localhost:8097`. MinistryStuffWeb are nevoie de un fișier `.env` cu `VITE_STAGE=dev`. Dezvoltarea folosește `smsMode: mock` și stocare pe disc, deci nu este nevoie de AWS.
