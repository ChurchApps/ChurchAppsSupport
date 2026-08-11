---
title: "Bring-Your-Own Storage"
---

# Bring-Your-Own Storage (BYOS)

Kirchen bekommen ~100MB freie gehostete Dateispeicherung (die `/content/files`-Oberflächen: Website-Dateien, Gruppen-Ressourcen). BYOS ermöglicht es einer Kirche, ihren eigenen Cloudspeicher zu verknüpfen -- **Google Drive, Dropbox, OneDrive oder jeden S3-kompatiblen Bucket (AWS S3, Cloudflare R2, Backblaze B2)** -- sodass neue Uploads in das Konto der Kirche landen ohne Plattform-Kappe. ChurchApps bleibt kostenlos; das Konto der Kirche ist die Grenze.

## Die Anbieter-Naht

BYOS wiederverwendet die Speicher-Naht, die für [MinistryStuff](./ministrystuff) gebaut ist: `IStorageProvider` (`Packages/apihelper`) aufgelöst pro Kirche von `StorageResolver` aus der `content.storageProviders`-Tabelle. Anders als die Singleton `churchapps`/`ministrystuff`-Anbieter, halten BYOS-Anbieter pro-Kirchen-Anmeldedaten, daher konstruiert `StorageResolver.forChurch` eine Instanz pro Request aus der Kirchen-Zeile. Implementierungen leben neben dem Resolver in `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider` plus `ByosAuth` (OAuth-Token-Austausch + Single-Flight-Aktualisierung -- Dropbox dreht Aktualisierungs-Tokens, daher werden Aktualisierungen die gleiche Art wie `ProviderProxyController` deduped).

`storageProviders` trägt die Anmeldedaten: `accessToken`/`refreshToken`/`tokenExpiresAt` (verschlüsselt, OAuth-Trio) oder `apiKey`/`apiSecret` + `settings`-JSON (`{endpoint, region, bucket, publicBase}`, S3). Token erreichen nie den Client -- `GET /content/storage/providers` maskiert Geheimnisse und gibt einen `connected`-boolean zurück.

## Upload-Ablauf

Gleicher Drei-Schritt-Vertrag wie zuvor, mit einer erweiterten Presign-Form. `POST /content/files/postUrl` gibt `PresignedPostData` zurück, das jetzt optional `method`, `rawBody`, `headers`, `chunkSize` und `externalIdField` trägt:

| Anbieter | Presign | Client sendet Bytes |
|---|---|---|
| churchapps (Standard) | S3 vorab signiert POST | Mehrteile-Formular (Legacy) |
| Google Drive | resumable Upload-Sitzung (`drive.file`-Umfang) | einzelner PUT zur Sitzungs-URI |
| Dropbox | `files/get_temporary_upload_link` (4h) | roh POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-Vielfach) |
| S3-kompatibel | vorab signiert PUT (B2 hat keine POST-Richtlinien) | roh PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) handhabt alle Formen und gibt die Anbieter-Datei-ID zurück, wenn die Antwort einen trägt (Drive). Der Client übergibt es wie `externalId` in der `POST /content/files`-Registrierung; `files.provider` + `files.externalId` zeichnet auf, wo die Bytes leben (Drive-Datei-ID; Pfad für die anderen). Die 100MB-Quoten-Prüfung nur gilt, wenn der aufgelöste Anbieter `churchapps` ist.

## Öffentliche Downloads

Verbraucher-Clouds können nicht direkt verlinkt werden (Drive-Links Quoten-Out, Dropbox/OneDrive-Links laufen ab), daher für das OAuth-Trio `contentPath` Punkte an eine stabile Api-Route: `GET /content/files/download/:id` (anonym) lädt die Datei-Zeile, prägt einen Kurzlebe-direkten Link über die Anbieter's `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), zwischenspeichert sie im-Speicher für 30 Minuten und 302-leitet um mit `Cache-Control: max-age=300`. Bandbreite fließt Browser↔Anbieter, nie durch die Api. S3-kompatibel springt die Umleitung ganz über -- `contentPath` ist die stabile `publicBase + key`-URL (der Bucket muss öffentlich lesen und CORS PUT erlauben).

Löschungen und Downloads Route durch `files.provider` (`StorageResolver.forFile`); Legacy-Zeilen ohne es fallen zurück zu URL-Präfix-Routing. Umbenennungen sind DB-only für BYOS-Dateien (Bytes werden adressiert durch `externalId`, nicht Namen). Das Trennen eines Anbieters, der noch Dateien hat, weich-deaktiviert die Zeile (behält Tokens, daher laden/löschen funktionieren weiterhin) anstatt sie zu löschen.

## Verbindung (B1Admin → Einstellungen → Datei-Speicher)

Das OAuth-Trio verwendet die gleiche Relais-Ablauf wie Inhalts-Anbieter: Popup → Anbieter-Einwilligung → `{membershipApi}/oauth/relay/callback` → B1Admin polls die Relais-Sitzung → `POST /content/storage/exchange` führt den Server-seitigen Code→Token-Austausch durch (Client-Geheimnisse verlassen nie den Server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox ist ein PKCE öffentlicher Client). Client-IDs leben in `B1Admin/src/settings/components/byosProviders.ts` und `Api .../ByosAuth.ts`. Umfänge sind bewusst minimal: Google `drive.file` (nur App-erstellte Dateien -- keine eingeschränkt-Umfang-Verifikation), OneDrive `Files.ReadWrite.AppFolder`, Dropbox App-Ordner-Zugriff. S3 ist eine einfache Anmeldedaten-Form.

Scope-Notiz: BYOS bedeckt die `/content/files`-Oberflächen nur. Galerie-Bilder, Miniaturbilder, Logos und Personen-Fotos bleiben auf dem Standard-Anbieter (klein, CDN-gedient, Bild-optimiert).
