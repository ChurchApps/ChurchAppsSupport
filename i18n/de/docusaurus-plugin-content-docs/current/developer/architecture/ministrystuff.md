# MinistryStuff (Bezahlte Speicher & SMS)

MinistryStuff.org ist der separate bezahlte Service, der die zwei Dinge finanziert, die ChurchApps nicht verschenken können -- Massen-Dateispeicher (1TB+) und SMS-Kredite -- als Flat-Rate monatliche Abos. ChurchApps selbst bleibt 100% kostenlos; nichts in B1 erfordert ein MinistryStuff-Abonnement, und jede Integrations-Punkt ist ein Anbieter-Naht, das ein Dritter auch implementieren könnte.

## Komponenten

| Stück | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Abrechnung (Stripe), SMS-Send + Kredit-Ledger (AWS End User Messaging), Speicher (S3 + Quoten-Bilanzierung). Einzelne MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org -- Marketing, Preise und das Account-Portal (Pläne, Nutzung, Stripe Checkout/Customer Portal Weiterleitungen). |
| Texting-Anbieter | `Packages/texting` → `MinistryStuffProvider` | Registriert als `ministrystuff` neben Clearstream/TextInChurch. |
| Speicher-Naht | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (Standard, kostenlos) umhüllt den ursprünglichen S3/Disk-Schalter; `FileStorageHelper` delegiert an den Standard-Anbieter unverändert. |
| Api-Verdrahtung | `Api/` Inhalts- + Messaging-Module | `MinistryStuffStorageProvider` + `StorageResolver` (Inhalt), `TextingConfigHelper`-Service-Schlüssel-Einspritzung (Messaging), `storageProviders`-Tabelle, `/content/storage/*` + `/messaging/texting/credits`-Endpunkte. |

## Identität & Vertrauen

- Gleiche Konten, gleiche Kirchen: MinistryStuffApi überprüft ChurchApps-JWTs mit dem gemeinsamen `JWT_SECRET` (Geschwister-App-Muster, wie B1Transfer). Das Portal meldet sich gegen MembershipApi an und akzeptiert `?jwt=` Hand-Offs.
- Server-zu-Server (Kern-Api → MinistryStuffApi): `X-Service-Key`-Header (`MINISTRYSTUFF_SERVICE_KEY`, beide Seiten) + explizit `churchId`. Die Berechtigung wird immer gegen das Abonnement dieser Kirche überprüft. Kirchen halten nie MinistryStuff-Anmeldedaten -- das Auswählen des Anbieters in B1Admin ist alles, das benötigt wird.

## Texting-Ablauf

B1Admin-Send-Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → Segment-Zählung debited gegen den aktuellen Zeitraum's `smsCreditGrants` → AWS End User Messaging (oder `smsMode: mock` in dev). Kredite sind ein **hartes Stop**: Erschöpfte Kredite lehnen Großverkäufe ab (`insufficient_credits`, auf der Oberfläche als eine freundliche Upgrade-Aufforderung in B1Admin) -- nie Teilversendigungen, nie Überschuß-Abrechnung. Kredit-Gewährungen werden idempotent pro Abrechnungs-Zeitraum von Stripe `invoice.paid`-Webhooks ausgestellt. Opt-Outs (`smsOptOuts`) werden vor jedem Versenden gefiltert.

## Speicher-Ablauf

Der Anbieter-Zeile einer Kirche (`content.storageProviders`, verwaltet in B1Admin → Einstellungen → Datei-Speicher) wählt, wohin **neue** Uploads gehen. `contentPath` ist eine absolute Pro-Datei-URL, daher coexisieren gemischte Anbieter mit null Migration: Alte Dateien dienen weiterhin von `content.churchapps.org`, neue von `content.ministrystuff.org`. Upload-Ablauf Api → `StorageResolver.forChurch` → Anbieter `store`/`getUploadUrl` (vorab signiert POST mit `content-length-range` in S3-Modus; base64-Fallback in Disk/dev-Modus); Löschungen Route vom gespeicherten URL (`StorageResolver.forUrl`). Quoten = Plan-Bytes, gezählt aus `storageObjects` (`stored` + `pending`-Reservierungen); Überschrittene Quoten blockieren neue Uploads (`storage_quota_exceeded`) -- nichts wird je gelöscht oder extra berechnet. Die freie ChurchApps-Tier ist unberührt (gleiche Grenzen wie zuvor; keine Kirchen-weite Quoten).

Scope-Notiz: Die Anbieter-Auswahl bedeckt den Inhalts **Dateien/Ressourcen**-Ablauf (wo Massen-Medien lebt). Galerie/Logo/Foto-Uploads bleiben auf dem Standard-Anbieter -- sie listen Schlüssel aus dem Speicher und bauen URLs auf Client-seitig, daher pro-Kirchen-Root gilt nicht doch.

Die gleiche Naht macht auch [Bring-Your-Own Storage](./byos-storage) möglich: Kirchen können Google Drive, Dropbox, OneDrive oder ihren eigenen S3-kompatiblen Bucket anstatt eines MinistryStuff-Plans verknüpfen.

## Abrechnung

Stripe-Checkout (gehostet) zum Abonnieren, Stripe-Customer-Portal zum Kartenpause/Stornierung/Rechnungen -- MinistryStuffWeb hat keine Kartformulare. Ein `subscriptions`-Zeile pro (Kirche, Produkt); Pläne/Tiers leben im Code (`MinistryStuffApi/src/helpers/Plans.ts`) mit Stripe-Preis-IDs aus der Konfiguration. Webhook (`/billing/webhook`, raw-body-Signatur-Überprüfung, `webhookEvents`-Dedup) fahren den Abonnements-Lebenszyklus: aktiv → past_due (Grace) → storniert.

## Dev-Setup

Führen Sie MinistryStuffApi (`yarn dev`, 8097; benötigt `.env` mit dem gemeinsam `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) und setzen Sie den gleichen Service-Schlüssel in `Api/.env`. `Api/config/dev.json` zeigt bereits `ministryStuffApi` auf `localhost:8097`. MinistryStuffWeb benötigt `.env` mit `VITE_STAGE=dev`. Dev verwendet `smsMode: mock` und Disk-Speicher -- Kein AWS benötigt.
