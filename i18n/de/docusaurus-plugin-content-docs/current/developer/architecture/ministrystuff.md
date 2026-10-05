# MinistryStuff (Bezahlter Speicher & SMS)

MinistryStuff.org ist der separate bezahlte Service, der die zwei Dinge ChurchApps kann nicht weggeben finanziert -- Massen-Datei-Speicher (1TB+) und SMS-Guthaben -- als Pauschal-monatliche Abonnements. ChurchApps selbst bleibt 100% kostenlos; nichts in B1 benötigt ein MinistryStuff-Abonnement und jeder Integrations-Punkt ist ein Provider-Naht, die ein Dritter auch implementieren könnte.

## Komponenten

| Stück | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (Port 8097 dev) | Abrechnung (Stripe), SMS Sendung + Guthaben Ledger (AWS End User Messaging), Speicher (S3 + Kontingent Kontoführung). Einzelne MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (Port 3103 dev) | ministrystuff.org -- Marketing, Preisbildung und Portal Konto (Pläne, Nutzung, Stripe Checkout/Customer Portal Umleitung). |
| SMS Anbieter | `Packages/texting` → `MinistryStuffProvider` | Registriert als `ministrystuff` neben Clearstream/TextInChurch. |
| Speicher Naht | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (Standard, kostenlos) wickelt den Original S3/Disk Schalter; `FileStorageHelper` delegiert zum Standard-Anbieter unverändert. |
| Api Verdrahtung | `Api/` Inhalts + Messaging Module | `MinistryStuffStorageProvider` + `StorageResolver` (Inhalte), `TextingConfigHelper` Service-Schlüssel Einfügung (Messaging), `storageProviders` Tabelle, `/content/storage/*` + `/messaging/texting/credits` Endpunkte. |

## Identität & Vertrauen

- Gleiche Konten, gleiche Kirchen: MinistryStuffApi verifiziert ChurchApps JWTs mit dem gemeinsamen `JWT_SECRET` (Sibling-App-Pattern, wie B1Transfer). Das Portal meldet sich gegen MembershipApi an und akzeptiert `?jwt=` Übergaben.
- Server-zu-Server (Core Api → MinistryStuffApi): `X-Service-Key` Header (`MINISTRYSTUFF_SERVICE_KEY`, beide Seiten) + explizit `churchId`. Berechtigung wird immer gegen die Kirchen-Abonnement überprüft. Kirchen halten nie MinistryStuff Zugangsdaten -- das Auswählen des Anbieters in B1Admin ist alles nötig.

## SMS Arbeitsablauf

B1Admin SMS senden → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → Segment-Zähler abgebucht gegen die aktuelle Periode's `smsCreditGrants` → AWS End User Messaging (oder `smsMode: mock` in dev). Guthaben sind ein **Hart Stopp**: Verbrauchte Guthaben lehnen wholesale ab (`insufficient_credits`, angezeigt als freundlich Upgrade-Prompt in B1Admin) -- nie Teils-Sendungen, nie Übergebühr Abrechnung. Guthaben-Zuteilungen werden idempotent pro Abrechnungs-Periode von Stripe `invoice.paid` Webhooks ausgestellt. Abmeldungen (`smsOptOuts`) werden vor jeder Sendung gefiltert.

Andere Pfade erreichen die gleiche Anbieter-Naht ohne durch `TextingController` zu gehen: Check-in Warnungen (`CheckinController` → `MessagingModuleGateway.sendBulkText`) und der Arbeitsablauf **SMS senden** Schritt-Aktion (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, die `sentTexts` + `deliveryLogs` Zeilen mit ein Null-Sender schreibt). Zusammen-Merge-Felder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sind Pro-Empfänger von `MergeFieldHelper.resolve` aufgelöst und das Ergebnis ist deckelt auf 1,600 Zeichen. In `TextingController` ein Gruppen-Nachricht enthält `{{` wird als ein `sendMessage` pro Empfänger statt ein einzelner `sendBulk` gesendet; ein Nachricht ohne Platzhalter geht immer noch raus als ein Massen-Sendung.

## Speicher Arbeitsablauf

Der Provider-Zeile einer Kirche (`content.storageProviders`, verwaltet in B1Admin → Einstellungen → Datei-Speicher) wählt, wo **neue** Uploads gehen. `contentPath` ist ein absolutes Per-Datei URL, daher Mixed-Provider koexistieren mit null Migration: alte Dateien Bedienung halten von `content.churchapps.org`, neue Dateien von `content.ministrystuff.org`. Uploads-Fluss Api → `StorageResolver.forChurch` → Provider `store`/`getUploadUrl` (presigned POST mit `content-length-range` in S3-Modus; Base64 Fallback in Disk/Dev Modus); Löschungen leiten nach der gespeichert URL (`StorageResolver.forUrl`). Kontingent = Plan Bytes, gezählt von `storageObjects` (`stored` + `pending` Reservierungen); überschrittenes Kontingent blockiert neue Uploads (`storage_quota_exceeded`) -- nichts wird je gelöscht oder Übergebühr abgerechnet. Der freie ChurchApps-Tier wird untouched (gleiche Grenzen wie zuvor; keine Kirchen-weit Kontingent).

Umfang Hinweis: Provider-Auswahl bedeckt den Inhalts **Dateien/Ressourcen** Arbeitsablauf (wo Massen-Medien lebt). Galerie/Logo/Foto-Uploads bleiben auf den Standard-Anbieter -- sie listen Schlüssel aus Speicher auf und bauen URLs Client-seitig, daher Pro-Kirche Rooting nicht zutreffen noch.

Die gleiche Naht macht auch Kraft [Bring-Your-Own Speicher](./byos-storage): Kirchen können Google Drive, Dropbox, OneDrive oder ihren eigenen S3-kompatibel Bucket verlinken statt einer MinistryStuff Plan.

## Abrechnung

Stripe Checkout (gehostet) zum Abonnieren, Stripe Kunden-Portal für Karten-Update/Stornieren/Rechnungen -- MinistryStuffWeb hat keine Kartens-Formen. Ein `subscriptions` Zeile pro (Kirche, Produkt); Pläne/Tiers lebt in Code (`MinistryStuffApi/src/helpers/Plans.ts`) mit Stripe Preis-IDs von Konfiguration. Webhook (`/billing/webhook`, Roh-Body Signatur-Verifizierung, `webhookEvents` Dedup) fahren den Abonnement-Lebenszyklus: aktiv → überfällig (Gnade) → storniert.

## Dev Setup

Laufen MinistryStuffApi (`yarn dev`, 8097; braucht `.env` mit dem gemeinsamen `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) und setzt den gleichen Service-Schlüssel in `Api/.env`. `Api/config/dev.json` zeigt bereits auf `ministryStuffApi` auf `localhost:8097`. MinistryStuffWeb braucht `.env` mit `VITE_STAGE=dev`. Dev verwendet `smsMode: mock` und Disk-Speicher -- keine AWS nötig.
