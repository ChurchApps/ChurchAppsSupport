---
title: "Church Settings"
---

# Church Settings

<div class="article-intro">

Die Seite Church Settings ist der Ort, an dem Sie die grundlegenden Informationen, Kontaktdaten und das Branding Ihrer Kirche konfigurieren. Diese Details werden in allen ChurchApps-Tools verwendet, einschließlich Ihrer B1.church-Website und der B1 Mobile-App.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung "Edit Church Settings". Siehe [Rollen & Berechtigungen](./roles-permissions.md), wenn Sie keinen Zugriff haben.
- Halten Sie die Adresse, Kontaktinformationen und das Logo Ihrer Kirche bereit

</div>

## Bearbeitung Ihrer Kircheninformationen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Settings** und klicken Sie auf **Settings**.
2. Öffnen Sie den Abschnitt **Church Information** und klicken Sie auf das Symbol zum Bearbeiten (Stift).
3. Aktualisieren Sie eines der folgenden Felder:
   - **Church Name** -- Der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Address** -- Die physische Adresse Ihrer Kirche.
   - **Contact Information** -- Telefonnummer, E-Mail und weitere Kontaktdaten.
4. Klicken Sie auf **Save**, um Ihre Änderungen zu übernehmen.

## Einrichtung Ihrer Subdomain

Ihre Kirche erhält eine kostenlose Subdomain bei **yourchurch.1.church**. Dies ist die Web-Adresse, unter der Mitglieder und Besucher auf die Online-Präsenz Ihrer Kirche zugreifen können.

1. Suchen Sie auf der Seite Settings das Feld **Subdomain**.
2. Geben Sie Ihre bevorzugte Subdomain ein (z. B. "gracechurch" für gracechurch.1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss über alle ChurchApps-Kirchen hinweg eindeutig sein. Wenn Ihr bevorzugter Name bereits vergeben ist, versuchen Sie, Ihre Stadt oder Ihren Staat hinzuzufügen (z. B. "gracechurch-dallas").
:::

Wenn Sie möchten, dass Besucher Ihre Website unter Ihrer eigenen Domain aufrufen (z. B. **www.gracechurch.org**), lesen Sie [Custom Domain](./custom-domain.md).

## Konfiguration des Brandings

Passen Sie an, wie Ihre Kirche in allen ChurchApps-Tools erscheint:

1. Laden Sie Ihr **church logo** hoch, indem Sie auf den Logo-Bereich klicken und eine Bilddatei auswählen.
2. Fügen Sie alle weiteren **church images** hinzu, die auf Ihrer Website und in der [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Verwenden Sie für beste Ergebnisse ein Logo mit transparentem Hintergrund im PNG-Format. Dies stellt sicher, dass es auf hellen und dunklen Hintergründen großartig aussieht.
:::

## First Day of Week

Wählen Sie, mit welchem Tag Ihre Kalender beginnen. Die **First Day of Week**-Dropdown im Abschnitt Church Info ist standardmäßig auf **Sunday** eingestellt, kann aber auf jeden beliebigen Tag eingestellt werden. Nach der Änderung wird sie in Calendar-Gittern in B1 Admin und im B1.church-Mitgliederportal berücksichtigt – Gruppenkalender, kuratierte Kalender und der Event-Editor layouten Wochen alle ab dem Tag, den Sie wählen.

## Region (Datums- und Telefonformat)

Die **Region**-Einstellung steuert, wie Daten und Uhrzeiten in B1 geschrieben werden. Standardmäßig verwenden Daten das Format der Vereinigten Staaten (z. B. "Sep 28, 2026" und "9/28/2026"). Kirchen außerhalb der USA können zu ihrem eigenen Format wechseln – zum Beispiel zeigt die Auswahl von English (United Kingdom) stattdessen "28 Sept 2026" und "28/09/2026".

1. Suchen Sie auf der Seite Settings die **Region**-Karte und klicken Sie, um sie zu bearbeiten.
2. Wählen Sie Ihre Region aus der **Region**-Dropdown aus. Jede Option zeigt ein Beispieldatum, damit Sie genau sehen können, wie Daten aussehen werden.
3. Klicken Sie auf **Save**.

Die Region-Karte zeigt dann Ihre ausgewählte Region, ein Beispiel des **Date format** und das Format Ihrer **Phone numbers**.

### Telefonnummernformat

Die gleiche Region-Karte enthält eine Einstellung **Phone numbers**, die steuert, wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (with country code)** -- die Standardeinstellung. Telefonfelder zeigen eine Länderflaggen-Auswahl und speichern Nummern mit der Landesvorwahl (zum Beispiel +1 918 555 1234).
- **Local (as typed)** -- Telefonfelder werden zu einfachen Textfeldern und speichern Nummern genau so, wie Sie sie eingeben, ohne hinzugefügte Landesvorwahl (zum Beispiel 0701 234 5678). Wählen Sie dies, wenn Ihre Kirche Nummern in einem lokalen Format schreibt und nicht möchte, dass B1 eine Landesvorwahl hinzufügt.

Wenn **Local** ausgewählt ist, zeigt die Region-Karte neben Ihrer Region zusätzlich „Local phone numbers“ an.

:::tip
Textnachrichten funktionieren am besten, wenn Nummern die Landesvorwahl enthalten. Wenn Sie Textnachrichten aus B1 versenden, behalten Sie das Format **International** bei, oder stellen Sie sicher, dass Nummern, die Sie im Local-Modus eingeben, die Landesvorwahl enthalten.
:::

Ihre Region gilt für Daten und Uhrzeiten in B1 Admin und auf Ihrer B1.church-Website und Ihrem Mitgliederportal, einschließlich Predigten, Blog-Beiträgen, Gruppenkalendern und Dienst-Plänen, damit Mitglieder Daten im gleichen Format wie Ihre Mitarbeiter sehen.

## Texting

Verbinden Sie einen Texting-Anbieter, um SMS-Nachrichten an eine Person oder eine ganze Gruppe von B1 Admin aus zu senden. Texte werden über Ihr eigenes Konto mit dem Anbieter versendet, daher gelten dessen Preise und Limits.

1. Suchen Sie auf der Seite Settings die **Texting**-Karte und klicken Sie, um sie zu bearbeiten.
2. Wählen Sie einen **Provider**:
   - **Clearstream** -- geben Sie einen **API Key** ein. Erstellen Sie einen in Ihren Clearstream-Kontoeinstellungen unter API Keys.
   - **Text In Church** -- geben Sie einen **API Key** ein. Fragen Sie zuerst Text In Church Support um Developer API Zugriff an, dann erstellen Sie einen Schlüssel in Ihren Account Settings > Developer API Abschnitt.
   - **Nalo Solutions** (Ghana) -- geben Sie den auth key aus Ihrem Nalo Solutions Konto als **API Key** ein, und eine **Sender ID** (bis zu 11 Zeichen), die Nalo für Sie genehmigt hat.
3. Klicken Sie auf **Save**.

Um das Texting zu beenden, stellen Sie **Provider** auf **None** ein und speichern Sie. Dies entfernt den gespeicherten Anbieter.

Sobald ein Anbieter verbunden ist, sehen Mitarbeiter mit der Berechtigung zum Versenden von Texten ein Text-Symbol im Header einer Gruppe (**Text this group**) und einer Person mit Mobiltelefon (**Send text message**). Geben Sie Ihre Nachricht ein und klicken Sie auf **Send**. Das Dialogfeld zählt Zeichen und SMS-Segmente. Für eine Gruppe zeigt es, wie viele Mitglieder den Text erhalten, bevor Sie ihn senden:

- Mitglieder ohne Mobiltelefonnummer in der Datei werden übersprungen.
- Mitglieder, die sich für **Hide me from the member directory** entschieden haben, werden als abgemeldet gezählt und übersprungen.
- Familienmitglieder, die eine Mobilnummer teilen, erhalten den Text nur einmal.

### Personalisierung von Texten mit Merge Fields

Unter der Nachrichtenbox zeigt das Text-Dialogfeld Platzhalter-Chips: **First Name**, **Last Name**, **Display Name** und **Church Name**. Klicken Sie auf einen Chip, um seinen Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an Ihrem Cursor einzufügen. Wenn der Text versendet wird, wird jeder Platzhalter durch die Details des Empfängers ersetzt, daher erreicht eine Gruppentext wie `Hi {{firstName}}, see you Sunday!` jedes Mitglied mit seinem eigenen Namen. Platzhalter funktionieren sowohl für Gruppentext als auch für Text an eine einzelne Person.

:::info
Das 1.600-Zeichen-Limit gilt für die Nachricht, wie Sie sie eingeben. Nachdem die Platzhalter gefüllt sind, wird jeder Text, der länger als 1.600 Zeichen ist, auf dieser Länge abgeschnitten.
:::

Texte können auch automatisch aus einem [Workflow](../serving/workflows.md#sending-a-text)-Schritt mit der Aktion **Send Text** versendet werden, die denselben Anbieter und Platzhalter verwendet.

## File Storage

Standardmäßig verwenden Dateien, die Sie auf Ihre Website hochladen (über [Files](../website/files.md)) und andere Inhaltsbereiche den kostenlosen gehosteten Speicher von B1 bis zu 100 MB. Wenn Sie mehr Platz benötigen, können Sie stattdessen Ihren eigenen Cloud-Speicher verbinden – neue Uploads gehen dann direkt auf Ihr Konto ohne Plattformlimit.

1. Suchen Sie auf der Seite Settings die **File Storage**-Karte und klicken Sie, um sie zu bearbeiten.
2. Wählen Sie einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2 usw.).
3. Für Google Drive, Dropbox oder OneDrive klicken Sie auf **Connect** und melden Sie sich an, um den Zugriff zu autorisieren. Für einen S3-kompatiblen Bucket geben Sie Ihren Zugangsschlüssel, Geheimnis, Bucket-Namen und die öffentliche URL-Basis ein.
4. Klicken Sie auf **Save**.

:::info
Dies betrifft nur neue Uploads auf Ihre Website-Dateien und ähnliche Inhaltsbereiche. Galerie-Bilder, Miniaturbilder, Logos und Personenfotos bleiben immer auf dem Standard-Speicher von B1.
:::

## Grade Promotion

Wenn Sie **Grade** auf Kindern und Schülern verfolgen, kann B1 automatisch alle an einem von Ihnen gewählten Datum (z. B. 1. August) um eine Note erhöhen, anstatt dass Sie jedes Profil manuell bearbeiten müssen.

1. Suchen Sie auf der Seite Settings die Option **Grade Promotion**.
2. Schalten Sie den Schalter ein (er zeigt **Enabled**) und wählen Sie den **Month** und **Day**, um Noten jedes Jahr zu fördern. An diesem Datum wird jeder mit einer Note um eine Note erhöht, und Schüler der 12. Klasse werden zu **Graduated**.
3. Speichern Sie Ihre Änderungen.

Um die automatische Förderung zu beenden, schalten Sie den Schalter aus, damit er **Disabled** anzeigt und speichern Sie. Das Promotionsdatum wird entfernt und Noten ändern sich nicht mehr von selbst.

## Import und Export

Die **Import/Export**-Schaltfläche in der Kopfzeile Settings öffnet ein separates Tool in einem neuen Browserfenster. Verwenden Sie dies zu:

- Importieren von Mitgliederdaten aus einem anderen Kirchenmanagementsystem.
- Exportieren Sie Ihre ChurchApps-Daten zur Sicherung oder Migration.

Dies ist besonders hilfreich, wenn Sie Ihre Kirche zum ersten Mal einrichten und bestehende Datensätze in ChurchApps übertragen müssen.

:::warning
Wenn Sie Daten importieren, sichern Sie immer zunächst Ihre bestehenden Datensätze. Importvorgänge fügen Daten zu Ihrem System hinzu und können doppelte Einträge erstellen, wenn sie mehrfach ausgeführt werden.
:::
