# MinistryStuff (Kostenpflichtiger Speicher & SMS-Versand)

MinistryStuff.org ist der separate kostenpflichtige Dienst, der die zwei Dinge finanziert, die ChurchApps nicht verschenken kann — Massen-Dateispeicher (1 TB+) und SMS-Guthaben — als Flatrate-Monatsabonnements. ChurchApps selbst bleibt zu 100 % kostenlos; nichts in B1 erfordert ein MinistryStuff-Abonnement, und jeder Integrationspunkt ist eine Anbieter-Schnittstelle, die auch ein Drittanbieter implementieren könnte.

## Komponenten

| Teil | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (Port 8097, Dev) | Abrechnung (Stripe), SMS-Versand + Guthaben-Ledger (AWS End User Messaging), Speicher (S3 + Kontingent-Buchhaltung). Eine einzelne MySQL-Datenbank `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (Port 3103, Dev) | ministrystuff.org — Marketing, Preisgestaltung und das Konto-Portal (Pläne, Nutzung, Stripe-Checkout-/Customer-Portal-Weiterleitungen). |
| Texting-Anbieter | `Packages/texting` → `MinistryStuffProvider` | Registriert als `ministrystuff` neben Clearstream/TextInChurch. |
| Speicher-Schnittstelle | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (Standard, kostenlos) umschließt den ursprünglichen S3-/Disk-Umschalter; `FileStorageHelper` delegiert unverändert an den Standardanbieter. |
| Api-Verdrahtung | `Api/`-Module content + messaging | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper`-Service-Key-Injektion (messaging), Tabelle `storageProviders`, Endpunkte `/content/storage/*` + `/messaging/texting/credits`. |

## Identität & Vertrauen

- Gleiche Konten, gleiche Gemeinden: MinistryStuffApi verifiziert ChurchApps-JWTs mit dem gemeinsamen `JWT_SECRET` (Schwester-App-Muster, wie B1Transfer). Das Portal meldet sich bei MembershipApi an und akzeptiert `?jwt=`-Übergaben.
- Server-zu-Server (Kern-Api → MinistryStuffApi): Header `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, auf beiden Seiten) + explizite `churchId`. Die Berechtigung wird immer gegen das Abonnement dieser Gemeinde geprüft. Gemeinden besitzen niemals MinistryStuff-Zugangsdaten — die Auswahl des Anbieters in B1Admin genügt.

## SMS-Ablauf

B1Admin „SMS senden" → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → Segmentanzahl wird gegen die `smsCreditGrants` der aktuellen Abrechnungsperiode abgebucht → AWS End User Messaging (oder `smsMode: mock` in der Entwicklung). Guthaben sind ein **harter Stopp**: aufgebrauchtes Guthaben lehnt komplett ab (`insufficient_credits`, in B1Admin als freundlicher Upgrade-Hinweis dargestellt) — nie Teilversand, nie Überschreitungsabrechnung. Guthaben-Zuteilungen werden idempotent pro Abrechnungsperiode aus Stripe-`invoice.paid`-Webhooks ausgestellt. Opt-outs (`smsOptOuts`) werden vor jedem Versand herausgefiltert.

## Speicher-Ablauf

Die Anbieter-Zeile einer Gemeinde (`content.storageProviders`, verwaltet in B1Admin → Einstellungen → Dateispeicher) legt fest, wohin **neue** Uploads gehen. `contentPath` ist eine absolute Pro-Datei-URL, sodass gemischte Anbieter ohne jede Migration koexistieren: alte Dateien werden weiterhin von `content.churchapps.org` ausgeliefert, neue von `content.ministrystuff.org`. Uploads laufen Api → `StorageResolver.forChurch` → Anbieter `store`/`getUploadUrl` (vorsignierter POST mit `content-length-range` im S3-Modus; Base64-Fallback im Disk-/Dev-Modus); Löschungen werden über die gespeicherte URL geroutet (`StorageResolver.forUrl`). Kontingent = Plan-Bytes, gezählt aus `storageObjects` (`stored` + `pending`-Reservierungen); ein überschrittenes Kontingent blockiert neue Uploads (`storage_quota_exceeded`) — nichts wird jemals gelöscht oder zusätzlich abgerechnet. Die kostenlose ChurchApps-Stufe bleibt unangetastet (gleiche Limits wie zuvor; kein gemeindeweites Kontingent).

Hinweis zum Umfang: Die Anbieterauswahl deckt den Ablauf der Content-**Dateien/Ressourcen** ab (wo Massenmedien liegen). Galerie-/Logo-/Foto-Uploads bleiben beim Standardanbieter — sie listen Schlüssel aus dem Speicher auf und bauen URLs clientseitig, sodass die Pro-Gemeinde-Verankerung dort noch nicht gilt.

## Abrechnung

Stripe Checkout (gehostet) zum Abonnieren, Stripe Customer Portal für Kartenaktualisierung/Kündigung/Rechnungen — MinistryStuffWeb hat keine eigenen Kartenformulare. Eine `subscriptions`-Zeile pro (Gemeinde, Produkt); Pläne/Stufen leben im Code (`MinistryStuffApi/src/helpers/Plans.ts`) mit Stripe-Preis-IDs aus der Konfiguration. Der Webhook (`/billing/webhook`, Raw-Body-Signaturprüfung, `webhookEvents`-Deduplizierung) steuert den Abonnement-Lebenszyklus: active → past_due (Kulanz) → canceled.

## Dev-Setup

MinistryStuffApi ausführen (`yarn dev`, 8097; benötigt `.env` mit dem gemeinsamen `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) und denselben Service-Key in `Api/.env` setzen. `Api/config/dev.json` verweist `ministryStuffApi` bereits auf `localhost:8097`. MinistryStuffWeb benötigt `.env` mit `VITE_STAGE=dev`. Die Entwicklung nutzt `smsMode: mock` und Disk-Speicher — kein AWS nötig.
