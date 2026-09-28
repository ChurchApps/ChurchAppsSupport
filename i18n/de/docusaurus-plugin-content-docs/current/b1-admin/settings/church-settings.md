---
title: "Kircheneinstellungen"
---

# Kircheneinstellungen

<div class="article-intro">

Die Seite Kircheneinstellungen ist der Ort, an dem du die grundlegenden Informationen, Kontaktdaten und das Branding deiner Kirche konfigurierst. Diese Angaben werden in allen ChurchApps-Tools verwendet, einschließlich deiner B1.church-Website und der B1-Mobile-App.

</div>

<div class="prereqs">
<h4>Bevor du anfängst</h4>

- Du benötigst die Berechtigung "Kircheneinstellungen bearbeiten". Siehe [Rollen & Berechtigungen](./roles-permissions.md), wenn du keinen Zugriff hast.
- Halte die Adresse, Kontaktinformationen und das Logo deiner Kirche bereit

</div>

## Bearbeite deine Kircheninformationen

1. Öffne in B1 Admin das **Abschnittmenü** in der oberen linken Ecke (der Abschnittsname mit dem kleinen Pfeil) und wähle **Einstellungen**.
2. Öffne den Abschnitt **Kircheninformationen** und klicke auf sein Bearbeitungssymbol (Stift).
3. Aktualisiere eines der folgenden Felder:
   - **Kirchenname** – Der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Adresse** – Die physische Adresse deiner Kirche.
   - **Kontaktinformationen** – Telefonnummer, E-Mail und andere Kontaktdaten.
4. Klicke auf **Speichern**, um deine Änderungen zu übernehmen.

## Einrichten deiner Subdomain

Deine Kirche erhält eine kostenlose Subdomain unter **denekirche.1.church**. Dies ist die Webadresse, unter der Mitglieder und Besucher auf deine Online-Präsenz zugreifen können.

1. Suche auf der Seite Einstellungen das Feld **Subdomain**.
2. Gib deine bevorzugte Subdomain ein (z. B. "gracechurch" für gracechurch.1.church).
3. Speichere deine Änderungen.

:::info
Deine Subdomain muss eindeutig über alle ChurchApps-Kirchen hinweg sein. Wenn dein bevorzugter Name vergeben ist, versuche deine Stadt oder deinen Staat hinzuzufügen (z. B. "gracechurch-dallas").
:::

Wenn du möchtest, dass Besucher deine Website unter deiner eigenen Domain erreichen (z. B. **www.gracechurch.org**), siehe [Benutzerdefinierte Domain](./custom-domain.md).

## Branding konfigurieren

Passe an, wie deine Kirche in allen ChurchApps-Tools angezeigt wird:

1. Lade dein **Kirchenlogo** hoch, indem du auf den Logobereich klickst und eine Bilddatei auswählst.
2. Füge alle zusätzlichen **Kirchenbilder** hinzu, die auf deiner Website und [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Um beste Ergebnisse zu erzielen, verwende ein Logo mit transparentem Hintergrund im PNG-Format. Dies stellt sicher, dass es sowohl auf hellen als auch auf dunklen Hintergründen großartig aussieht.
:::

## Erster Wochentag

Wähle, mit welchem Tag deine Kalender beginnen. Das Dropdown **Erster Wochentag** im Abschnitt Kircheninfo ist standardmäßig auf **Sonntag** eingestellt, kann aber auf jeden Tag eingestellt werden. Sobald geändert, wird es in Kalenderrastern in B1 Admin und im Mitgliederportal B1.church berücksichtigt – Gruppenkalender, kuratierte Kalender und der Ereignis-Editor zeigen alle Wochen beginnend mit dem Tag, den du auswählst.

## Dateispeicherung

Standardmäßig verwenden Dateien, die du auf deine Website hochlädst (über [Dateien](../website/files.md)) und andere Inhaltsbereiche B1s kostenlosen gehosteten Speicher mit bis zu 100 MB. Wenn du mehr Speicherplatz benötigst, kannst du stattdessen deinen eigenen Cloud-Speicher verbinden – neue Uploads gehen dann direkt auf dein Konto ohne Plattformlimit.

1. Suche auf der Seite Einstellungen die Karte **Dateispeicherung** und klicke auf Bearbeiten.
2. Wähle einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2, usw.).
3. Für Google Drive, Dropbox oder OneDrive klicke auf **Verbinden** und melde dich an, um den Zugriff zu autorisieren. Für einen S3-kompatiblen Bucket gib deine Zugriffstaste, dein Geheimnis, deinen Bucketnamen und deine öffentliche URL-Basis ein.
4. Klicke auf **Speichern**.

:::info
Dies betrifft nur neue Uploads auf deine Website-Dateien und ähnliche Inhaltsbereiche. Galeriebilder, Miniaturansichten, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Klassenstufenförderung

Wenn du **Klassenstufe** bei Kindern und Schülern verfolgst, kann B1 automatisch jeden um eine Klassenstufe an einem von dir gewählten Datum erhöhen (z. B. 1. August) statt dich jeden Profil von Hand bearbeiten zu lassen.

1. Suche auf der Seite Einstellungen die Option **Klassenstufenförderung**.
2. Schalte sie ein und wähle den **Monat und Tag**, um die Klassenstufen jedes Jahr zu fördern.
3. Speichere deine Änderungen.

## Import und Export

Die Schaltfläche **Import/Export** in der Kopfzeile der Einstellungen öffnet ein dediziertes Werkzeug in einem neuen Browser-Fenster. Nutze dies für:

- Import von Mitgliederdaten aus einem anderen Kirchenverwaltungssystem.
- Export deiner ChurchApps-Daten zur Sicherung oder Migration.

Dies ist besonders hilfreich, wenn du deine Kirche zum ersten Mal einrichtest und bestehende Datensätze in ChurchApps übertragen musst.

:::warning
Beim Importieren von Daten sicherst du immer zunächst deine bestehenden Datensätze. Import-Operationen fügen Daten zu deinem System hinzu und können doppelte Einträge erstellen, wenn sie mehrmals ausgeführt werden.
:::
