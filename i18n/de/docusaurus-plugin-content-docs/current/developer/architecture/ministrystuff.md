# MinistryStuff (Bezahlter Speicher & SMS)

MinistryStuff.org ist der separate kostenpflichtige Service, der die zwei Dinge finanziert, die ChurchApps nicht kostenlos anbieten kann — Massenspeicher (1 TB+) und SMS-Guthaben — als Flatrate-Abos pro Monat. ChurchApps selbst bleibt 100% kostenlos; nichts in B1 erfordert ein MinistryStuff-Abonnement, und jeder Integrationspunkt ist eine Provider-Schnittstelle, die auch ein Dritter implementieren könnte.

## Komponenten

| Teil | Repository | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (Port 8097 dev) | Abrechnung (Stripe), SMS-Versand + Guthaben-Ledger (AWS End User Messaging), Speicher (S3 + Quota-Accounting). Einzelne MySQL-DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (Port 3103 dev) | ministrystuff.org — Marketing, Preisgestaltung und das Kundenportal (Pläne, Nutzung, Stripe Checkout/Customer Portal-Umleitungen). |
| Texting-Provider | `Packages/texting` → `MinistryStuffProvider` | Registriert als `ministrystuff` neben Clearstream/TextInChurch. |
| Storage-Schnittstelle | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (Standard, kostenlos) umhüllt den ursprünglichen S3/Disk-Switch; `FileStorageHelper` delegiert an den Standard-Provider unverändert. |
| Api-Verdrahtung | `Api/` Inhalts- und Messaging-Module | `MinistryStuffStorageProvider` + `StorageResolver` (Inhalte), `TextingConfigHelper` Service-Key-Injektion (Messaging), `storageProviders`-Tabelle, `/content/storage/*` + `/messaging/texting/credits`-Endpunkte. |

## Identität & Vertrauen

- Gleiche Konten, gleiche Kirchen: MinistryStuffApi verifiziert ChurchApps-JWTs mit dem gemeinsamen `JWT_SECRET` (Sibling-App-Muster, wie B1Transfer). Das Portal meldet sich gegen MembershipApi an und akzeptiert `?jwt=`-Übergaben.
- Server-zu-Server (Core Api → MinistryStuffApi): `X-Service-Key`-Header (`MINISTRYSTUFF_SERVICE_KEY`, beide Seiten) + explizite `churchId`. Die Berechtigung wird immer gegen das Abonnement dieser Kirche geprüft. Kirchen halten niemals MinistryStuff-Anmeldedaten — die Auswahl des Providers in B1Admin ist alles, was nötig ist.

## Texting-Fluss

B1Admin Text versenden → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → Segmentanzahl wird gegen das aktuelle Zeitraums-`smsCreditGrants` abgebucht → AWS End User Messaging (oder `smsMode: mock` in dev). Guthaben sind ein **hartes Stopp**: Erschöpftes Guthaben lehnt pauschal ab (`insufficient_credits`, als freundliche Upgrade-Aufforderung in B1Admin angezeigt) — niemals Teilversendungen, niemals Überschreitungsgebühren. Guthaben-Zuschüsse werden idempotent pro Abrechnungszeitraum aus Stripe `invoice.paid`-Webhooks ausgestellt. Opt-outs (`smsOptOuts`) werden vor jedem Versand gefiltert.

## Speicher-Fluss

Die Provider-Reihe einer Kirche (`content.storageProviders`, verwaltet in B1Admin → Einstellungen → Dateispeicher) wählt aus, wo **neue** Uploads gehen. `contentPath` ist eine absolute Pro-Datei-URL, daher koexistieren gemischte Provider mit null Migration: alte Dateien werden weiterhin von `content.churchapps.org` bereitgestellt, neue von `content.ministrystuff.org`. Uploads fließen Api → `StorageResolver.forChurch` → Provider `store`/`getUploadUrl` (vorzeichnetes POST mit `content-length-range` im S3-Modus; Base64-Fallback im Disk/Dev-Modus); Löschungen erfolgen nach der gespeicherten URL (`StorageResolver.forUrl`). Quota = Plan-Bytes, gezählt von `storageObjects` (`stored` + `pending`-Reservierungen); Überschrittene Quote blockiert neue Uploads (`storage_quota_exceeded`) — nichts wird jemals gelöscht oder zusätzlich berechnet. Der kostenlose ChurchApps-Tarif bleibt unverändert (gleiche Limits wie zuvor; keine kirchenweite Quote).

Scope-Hinweis: Die Provider-Auswahl umfasst die Inhalts-**Dateien/Ressourcen**-Fluss (wo Mediamassen leben). Galerie-/Logo-/Foto-Uploads bleiben beim Standard-Provider — sie listen Schlüssel aus dem Speicher auf und erstellen URLs auf der Client-Seite, daher gilt kirchenweite Verwurzelung noch nicht.

## Abrechnung

Stripe Checkout (gehostet) zum Abonnieren, Stripe Customer Portal zum Kartenwechsel/Kündigung/Rechnungen — MinistryStuffWeb hat keine Kartenterminals. Eine `subscriptions`-Reihe pro (Kirche, Produkt); Pläne/Stufen leben im Code (`MinistryStuffApi/src/helpers/Plans.ts`) mit Stripe-Preis-Ids aus der Konfiguration. Webhook (`/billing/webhook`, Raw-Body-Signaturverifizierung, `webhookEvents`-Deduplizierung) treibt den Abonnement-Lebenszyklus an: aktiv → säumig (Karenzzeit) → storniert.

## Dev-Einrichtung

Führen Sie MinistryStuffApi aus (`yarn dev`, 8097; benötigt `.env` mit dem gemeinsamen `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) und setzen Sie den gleichen Service-Schlüssel in `Api/.env`. `Api/config/dev.json` zeigt bereits auf `ministryStuffApi` unter `localhost:8097`. MinistryStuffWeb benötigt `.env` mit `VITE_STAGE=dev`. Dev verwendet `smsMode: mock` und Disk-Speicher — keine AWS erforderlich.
