---
title: "Gemeindeeinstellungen"
description: "Legen Sie auf der Seite Gemeindeeinstellungen in B1 Admin den Namen, die Adresse, die Subdomain, die Zeitzone, das Regionsformat, den SMS-Anbieter und die Dateispeicherung Ihrer Gemeinde fest."
---

# Gemeindeeinstellungen

<div class="article-intro">

Auf der Seite Gemeindeeinstellungen konfigurieren Sie die Grunddaten, Kontaktinformationen und das Erscheinungsbild Ihrer Gemeinde. Diese Angaben werden in allen ChurchApps-Tools verwendet, einschließlich Ihrer B1.church-Website und der B1 App.

</div>

## Schulungsvideo

<YouTube id="634zSbzDkYA" title="Gemeindeinformationen und Branding in B1 einrichten" next="Rollen, Berechtigungen und Teammitglieder in B1 einladen" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Gemeindeeinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](./roles-permissions.md).
- Halten Sie die Adresse, Kontaktdaten und das Logo Ihrer Gemeinde bereit

</div>

## Gemeindeinformationen bearbeiten

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Einstellungen** und klicken Sie auf **Einstellungen**.
2. Klicken Sie im Abschnitt **Gemeindeinformationen** (oben auf der Seite) auf **Bearbeiten**.
3. Aktualisieren Sie eines der folgenden Felder:
   - **Gemeindename** -- Der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Adresse** -- Die physische Adresse Ihrer Gemeinde.
   - **Kontaktinformationen** -- Telefonnummer, E-Mail-Adresse und weitere Kontaktdaten.
   - **Zeitzone** -- Die Zeitzone Ihrer Gemeinde. Siehe unten [Zeitzone](#time-zone).
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

## Ihre Subdomain einrichten

Ihre Gemeinde erhält eine kostenlose Subdomain unter **ihregemeinde.1.church**. Unter dieser Webadresse können Mitglieder und Besucher den Online-Auftritt Ihrer Gemeinde aufrufen.

1. Klicken Sie auf der Seite Einstellungen im Abschnitt **Gemeindeinformationen** auf **Bearbeiten** und suchen Sie das Feld **Subdomain**.
2. Geben Sie Ihre gewünschte Subdomain ein (zum Beispiel „gnadengemeinde“ für gnadengemeinde.1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss unter allen ChurchApps-Gemeinden eindeutig sein. Ist Ihr Wunschname bereits vergeben, fügen Sie Ihre Stadt oder Ihr Bundesland hinzu (zum Beispiel „gnadengemeinde-dallas“).
:::

Wenn Besucher Ihre Website unter einer eigenen Domain erreichen sollen (zum Beispiel **`www.gnadengemeinde.org`**), lesen Sie [Eigene Domain](./custom-domain.md).

## Branding konfigurieren

Passen Sie an, wie Ihre Gemeinde in allen ChurchApps-Tools erscheint:

1. Laden Sie Ihr **Gemeindelogo** hoch, indem Sie auf den Logobereich klicken und eine Bilddatei auswählen.
2. Fügen Sie weitere **Gemeindebilder** hinzu, die auf Ihrer Website und in der [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Am besten funktioniert ein Logo im PNG-Format mit transparentem Hintergrund. So wirkt es sowohl auf hellen als auch auf dunklen Hintergründen gut.
:::

## Erster Tag der Woche

Legen Sie fest, mit welchem Tag Ihre Kalender beginnen. Das Dropdown-Menü **Erster Tag der Woche** im Abschnitt Gemeindeinformationen ist standardmäßig auf **Sonntag** eingestellt, lässt sich aber auf jeden Tag ändern. Nach der Änderung wird diese Einstellung in den Kalenderansichten von B1 Admin und im Mitgliederportal von B1.church berücksichtigt. Gruppenkalender, kuratierte Kalender und der Veranstaltungseditor beginnen die Wochen alle mit dem von Ihnen gewählten Tag.

## Zeitzone

Das Dropdown-Menü **Zeitzone** im Abschnitt **Gemeindeinformationen** legt die Zeitzone Ihrer Gemeinde fest (zum Beispiel *America/Chicago*). Wählen Sie **Keine**, um das Feld leer zu lassen. Nach dem Speichern wird die Zeitzone in der Übersicht der Gemeindeinformationen angezeigt.

B1 verwendet diese Zeitzone für gemeindeweite Zeitangaben, etwa für Veranstaltungserinnerungen und die Zeitpläne auf Ihren [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-Fernsehern. [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) richten sich zuerst nach der Zeitzone des [Standorts](./campuses.md) des Gottesdienstes und nutzen die Zeitzone der Gemeinde nur dann, wenn dem Standort keine zugewiesen ist. Wenn alle Ihre Standorte in derselben Zeitzone liegen, legen Sie diese sowohl für die Gemeinde als auch für jeden Standort fest.

## Region (Datums- und Telefonformat)

Die Einstellung **Region** bestimmt, wie Datums- und Zeitangaben in B1 geschrieben werden. Standardmäßig werden Datumsangaben im US-Format angezeigt (zum Beispiel „Sep 28, 2026“ und „9/28/2026“). Gemeinden außerhalb der USA können auf ihr eigenes Format umstellen. Wählen Sie zum Beispiel Englisch (Vereinigtes Königreich), werden stattdessen „28 Sept 2026“ und „28/09/2026“ angezeigt.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Region** und dann im Abschnitt **Region** auf **Bearbeiten**.
2. Wählen Sie Ihre Region im Dropdown-Menü **Region** aus. Jede Option zeigt ein Beispieldatum, damit Sie genau sehen, wie Datumsangaben aussehen werden.
3. Klicken Sie auf **Speichern**.

Der Abschnitt Region zeigt danach die gewählte Region, ein Beispiel für das **Datumsformat** und Ihr Format für **Telefonnummern** an.

### Format der Telefonnummern

Im selben Abschnitt Region steuert die Einstellung **Telefonnummern», wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (mit Ländervorwahl)** -- die Standardeinstellung. Telefonfelder zeigen eine Länderflagge zur Auswahl und speichern die Nummern mit Ländervorwahl (zum Beispiel +1 918 555 1234).
- **Lokal (wie eingegeben)** -- Telefonfelder werden zu einfachen Textfeldern und speichern Nummern genau so, wie Sie sie eingeben, ohne Ländervorwahl (zum Beispiel 0701 234 5678). Wählen Sie diese Option, wenn Ihre Gemeinde Nummern in einem lokalen Format schreibt und B1 keine Ländervorwahl hinzufügen soll.

Wenn **Lokal** ausgewählt ist, zeigt der Abschnitt Region neben Ihrer Region zusätzlich „Lokale Telefonnummern“ an.

:::tip
Textnachrichten funktionieren am besten, wenn Nummern eine Ländervorwahl enthalten. Wenn Sie über B1 SMS versenden, behalten Sie das Format **International** bei oder achten Sie im Modus Lokal darauf, dass die eingegebenen Nummern eine Ländervorwahl enthalten.
:::

Ihre Region gilt für Datums- und Zeitangaben in B1 Admin sowie auf Ihrer B1.church-Website und im Mitgliederportal, einschließlich Predigten, Blogbeiträge, Gruppenkalender und Dienstpläne. So sehen Mitglieder Datumsangaben im selben Format wie Ihre Mitarbeitenden.

## Textnachrichten {#texting}

Verbinden Sie einen SMS-Anbieter, um aus B1 Admin SMS an eine Person oder eine ganze Gruppe zu senden. Die Nachrichten werden über Ihr eigenes Konto beim Anbieter verschickt, es gelten daher dessen Preise und Limits.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Textnachrichten** und dann im Abschnitt **Textnachrichten** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**:
   - **Clearstream** -- geben Sie einen **API-Schlüssel** ein. Erstellen Sie ihn in Ihren Clearstream-Kontoeinstellungen unter API-Keys.
   - **Text In Church** -- geben Sie einen **API-Schlüssel** ein. Bitten Sie zuerst den Support von Text In Church um Zugang zur Entwickler-API und erstellen Sie dann einen Schlüssel im Bereich Developer API Ihrer Kontoeinstellungen.
   - **Nalo Solutions** (Ghana) -- geben Sie den Auth-Key aus Ihrem Nalo-Solutions-Konto als **API-Schlüssel** ein sowie eine **Absender-ID** (bis zu 11 Zeichen), die Nalo für Sie freigegeben hat.
   - **Twilio** -- verwenden Sie das eigene Twilio-Konto Ihrer Gemeinde; Twilio rechnet direkt mit Ihnen ab. Kopieren Sie die **Account SID** und das **Auth Token** aus der [Twilio Console](https://console.twilio.com) und geben Sie eine **Absenderrufnummer** ein. Dabei handelt es sich um eine Twilio-Telefonnummer, die für A2P 10DLC registriert ist, im Format `+15551234567`. Fügen Sie nach dem Speichern die eingehende Webhook-URL (siehe unten) in Twilio beim Feld **A message comes in** der Nummer ein, damit STOP-Antworten auch in B1 erfasst werden.
3. Klicken Sie auf **Speichern**.

Um das Versenden von Textnachrichten zu beenden, setzen Sie den **Anbieter** auf **Keiner** und speichern Sie. Dadurch wird der gespeicherte Anbieter entfernt.

### Personen abmelden, die mit STOP antworten

Sobald ein Anbieter gespeichert ist, öffnen Sie den Bereich Textnachrichten erneut über **Bearbeiten**. Unterhalb der Anbietereinstellungen zeigt ein schreibgeschütztes Feld **Eingehende Webhook-URL (STOP)** eine Webadresse, die nur für Ihre Gemeinde gilt. Klicken Sie in das Feld, um die Adresse auszuwählen, kopieren Sie sie und fügen Sie sie in die Einstellung für eingehende Nachrichten (Antworten) Ihres SMS-Anbieters ein. Das funktioniert mit allen oben genannten Anbietern, die eingehende Antworten an einen Webhook weiterleiten können.

Antwortet danach jemand auf eine Ihrer Nachrichten mit **STOP** (oder STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT oder REVOKE), sucht B1 alle Personen mit passender Mobilnummer, markiert sie als abgemeldet und deaktiviert ihre Terminerinnerungen per SMS. Sie werden anschließend bei Gruppennachrichten übersprungen. Andere Antworten werden ignoriert.

:::info
Dies verwendet dieselbe Abmeldeeinstellung wie **Von Mitgliederverzeichnis ausblenden**. Personen, die mit STOP antworten, werden in ihrem Profil daher ebenfalls als **Im Verzeichnis ausgeblendet** angezeigt. Das Feld erscheint nur, wenn der gespeicherte Anbieter ausgewählt ist. Wenn Sie das Dropdown-Menü auf einen anderen Anbieter umstellen, speichern Sie zuerst, um die URL wieder anzuzeigen.
:::

Sobald ein Anbieter verbunden ist, sehen Mitarbeitende mit Berechtigung zum Senden von Nachrichten auf der Seite einer Gruppe die Schaltfläche **Text** (**Dieser Gruppe eine Nachricht senden**) und auf der Seite einer Person mit Mobiltelefon die Schaltfläche **Textnachricht senden**. Geben Sie Ihre Nachricht ein und klicken Sie auf **Senden**. Der Dialog zählt Zeichen und SMS-Segmente. Bei einer Gruppe zeigt er vor dem Senden an, wie viele Mitglieder die Nachricht erhalten:

- Mitglieder ohne hinterlegte Mobilnummer werden übersprungen.
- Mitglieder, die **Von Mitgliederverzeichnis ausblenden** gewählt haben, gelten als abgemeldet und werden übersprungen.
- Familienmitglieder, die sich eine Mobilnummer teilen, erhalten die Nachricht nur einmal.

### Texte mit Platzhaltern personalisieren {#personalizing-texts-with-merge-fields}

Unterhalb des Nachrichtenfelds zeigt der Dialog Textnachricht Platzhalter-Chips an: **Vorname**, **Nachname**, **Anzeigename** und **Gemeindename**. Klicken Sie auf einen Chip, um dessen Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an der Cursorposition einzufügen. Beim Versand wird jeder Platzhalter durch die Angaben des jeweiligen Empfängers ersetzt. So erreicht eine Gruppennachricht wie `Hallo {{firstName}}, wir sehen uns am Sonntag!` jedes Mitglied mit dem eigenen Namen. Platzhalter funktionieren sowohl bei Gruppennachrichten als auch bei Nachrichten an eine einzelne Person. Bei Nachrichten an eine Gruppe steht außerdem der Chip **Gruppenname** (`{{groupName}}`) zur Verfügung, der durch den Namen der Gruppe ersetzt wird.

Um eine Nachricht wiederzuverwenden, speichern Sie sie als [Textvorlage](./email-templates.md#text-templates) (eine E-Mail-Vorlage mit der Kategorie **Text**) und wählen Sie sie oben im Textfenster unter **Vorlage laden (optional)** aus.

:::info
Das Limit von 1.600 Zeichen gilt für die Nachricht, so wie Sie sie eingeben. Nachdem die Platzhalter ausgefüllt wurden, wird jeder Text, der länger als 1.600 Zeichen ist, auf diese Länge gekürzt.
:::

Nachrichten können auch automatisch über einen Schritt eines [Workflows](../serving/workflows.md#sending-a-text) mit der Aktion **Text senden** versendet werden. Dafür werden derselbe Anbieter und dieselben Platzhalter verwendet.

## Dateispeicher

Standardmäßig nutzen Dateien, die Sie auf Ihre Website hochladen (über [Dateien](../website/files.md)), und andere Inhaltsbereiche den kostenlosen Speicher von B1 mit bis zu 100 MB. Wenn Sie mehr Platz benötigen, können Sie stattdessen Ihren eigenen Cloudspeicher verbinden. Neue Uploads werden dann direkt in Ihr Konto gespeichert, ohne Begrenzung durch die Plattform.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Dateispeicher** und dann im Abschnitt **Dateispeicher** auf **Bearbeiten**.
2. Wählen Sie einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2 usw.).
3. Bei Google Drive, Dropbox oder OneDrive klicken Sie auf **Verbinden** und melden sich an, um den Zugriff zu autorisieren. Bei einem S3-kompatiblen Bucket geben Sie Ihren Zugriffsschlüssel, das Secret, den Bucket-Namen und die Basis-URL für den öffentlichen Zugriff ein.
4. Klicken Sie auf **Speichern**.

:::info
Dies betrifft nur neue Uploads für die Dateien Ihrer Website und ähnliche Inhaltsbereiche. Galeriebilder, Vorschaubilder, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Klassenstufen-Aufstieg

Wenn Sie die **Klassenstufe** bei Kindern und Schülern erfassen, kann B1 alle an einem Datum Ihrer Wahl (zum Beispiel am 1. August) automatisch um eine Klassenstufe anheben. Sie müssen dazu nicht jedes Profil von Hand bearbeiten.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Klassenstufen-Aufstieg** und dann im Abschnitt **Klassenstufen-Aufstieg** auf **Bearbeiten**.
2. Schalten Sie den Schalter ein (er zeigt **Aktiviert** an) und wählen Sie den **Monat** und den **Tag**, an denen die Klassenstufen jährlich angehoben werden sollen. An diesem Datum rückt jede Person mit einer Klassenstufe um eine Stufe auf, und Schüler der 12. Klasse werden auf **Abgeschlossen** gesetzt.
3. Speichern Sie Ihre Änderungen.

Um den automatischen Aufstieg zu beenden, schalten Sie den Schalter aus, sodass **Deaktiviert** angezeigt wird, und speichern Sie. Das Aufstiegsdatum wird entfernt, und die Klassenstufen ändern sich nicht mehr automatisch.

## Ehrenamtliche Anmeldung {#volunteer-signup}

Standardmäßig sehen Mitglieder, die [Anmeldungen für ehrenamtliche Dienste](../../b1-church/serving/volunteer-signup.md) durchsuchen, jede kommende Woche mit offenen Stellen. Wird diese Liste lang, können Sie stattdessen für jede Planart nur die nächste Woche anzeigen lassen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Ehrenamtliche Anmeldung** und dann im Abschnitt **Ehrenamtliche Anmeldung** auf **Bearbeiten**.
2. Aktivieren Sie **Nur die nächste Woche jeder Planart anzeigen**.
3. Speichern Sie Ihre Änderungen.

Ist diese Option aktiv, zeigt jede Planart nur ihren nächsten kommenden Plan an. Die folgende Woche erscheint, sobald dieses Datum vergangen ist. In der Zeile **Angezeigte Wochen** des Abschnitts steht entweder **Nur die nächste Woche jeder Planart** oder **Alle kommenden Wochen**.

## Datenschutz bei Spenden {#giving-privacy}

Personen mit Zugriff auf Spenden sehen die Spendensummen einer Person normalerweise in deren [Personendatensatz](../people/adding-people.md#editing-details). Wenn Sie nicht jedes Mal Beträge auf dem Bildschirm anzeigen möchten, sobald ein Datensatz geöffnet wird, können Sie sie ausblenden, bis jemand danach fragt.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Datenschutz bei Spenden** und dann im Abschnitt **Datenschutz bei Spenden** auf **Bearbeiten**.
2. Aktivieren Sie **Spenden in Personendatensätzen ausblenden, bis angeklickt**.
3. Speichern Sie Ihre Änderungen.

Ist diese Option aktiv, steht auf der Spendenkarte eines Personendatensatzes „Spenden sind in Personendatensätzen ausgeblendet.“ Klicken Sie auf **Spenden anzeigen**, um die Spenden dieser Person zu laden und anzuzeigen. Beim Öffnen einer anderen Person werden sie wieder ausgeblendet. Wer Spenden sehen darf, ändert sich dadurch nicht: Die Karte sehen weiterhin nur Personen mit Zugriff auf Spenden.

## Import und Export

Der Link **Import/Export** unter dem Namen Ihrer Gemeinde auf der Seite Einstellungen öffnet ein eigenes Werkzeug in einem neuen Browserfenster. Damit können Sie:

- Mitgliederdaten aus einem anderen Gemeindeverwaltungssystem importieren.
- Ihre ChurchApps-Daten zur Sicherung oder für eine Migration exportieren.

Das ist besonders hilfreich, wenn Sie Ihre Gemeinde gerade einrichten und bestehende Datensätze in ChurchApps übertragen müssen.

:::warning
Sichern Sie vor jedem Import zuerst Ihre bestehenden Datensätze. Importvorgänge fügen Daten zu Ihrem System hinzu und können doppelte Einträge erzeugen, wenn sie mehrfach ausgeführt werden.
:::
