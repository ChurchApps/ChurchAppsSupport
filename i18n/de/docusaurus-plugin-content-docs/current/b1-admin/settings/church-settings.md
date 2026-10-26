---
title: "Kircheneinstellungen"
---

# Kircheneinstellungen

<div class="article-intro">

Auf der Seite Kircheneinstellungen konfigurieren Sie die Grunddaten Ihrer Kirche, die Kontaktdaten und das Erscheinungsbild. Diese Angaben werden in allen ChurchApps-Werkzeugen verwendet, einschließlich Ihrer B1.church-Website und der B1-Mobile-App.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Halten Sie die Adresse, die Kontaktdaten und das Logo Ihrer Kirche bereit

</div>

## Ihre Kircheninformationen bearbeiten

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
2. Klicken Sie im Abschnitt **Kircheninformationen** (oben auf der Seite) auf **Bearbeiten**.
3. Aktualisieren Sie beliebige der folgenden Felder:
   - **Name der Kirche** -- der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Adresse** -- die physische Adresse Ihrer Kirche.
   - **Kontaktinformationen** -- Telefonnummer, E-Mail und weitere Kontaktdaten.
   - **Zeitzone** -- die Zeitzone Ihrer Kirche. Siehe [Zeitzone](#time-zone) unten.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

## Ihre Subdomain einrichten

Ihre Kirche erhält eine kostenlose Subdomain unter **ihrekirche.1.church**. Unter dieser Webadresse können Mitglieder und Gäste Ihren Online-Auftritt erreichen.

1. Klicken Sie auf der Einstellungsseite im Abschnitt **Kircheninformationen** auf **Bearbeiten** und suchen Sie das Feld **Subdomain**.
2. Geben Sie Ihre gewünschte Subdomain ein (zum Beispiel „gracechurch“ für gracechurch.1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss unter allen Kirchen von ChurchApps eindeutig sein. Ist Ihr Wunschname bereits vergeben, versuchen Sie es mit Ihrer Stadt oder Ihrem Bundesland (zum Beispiel „gracechurch-dallas“).
:::

Wenn Besucher Ihre Website unter einer eigenen Domain erreichen sollen (zum Beispiel **www.gracechurch.org**), siehe [Eigene Domain](./custom-domain.md).

## Branding einrichten

Passen Sie an, wie Ihre Kirche in allen ChurchApps-Werkzeugen erscheint:

1. Laden Sie Ihr **Kirchenlogo** hoch, indem Sie auf den Logobereich klicken und eine Bilddatei auswählen.
2. Fügen Sie weitere **Kirchenbilder** hinzu, die auf Ihrer Website und in der [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Für beste Ergebnisse verwenden Sie ein Logo im PNG-Format mit transparentem Hintergrund. So sieht es sowohl auf hellen als auch auf dunklen Hintergründen gut aus.
:::

## Erster Tag der Woche

Wählen Sie, mit welchem Tag Ihre Kalender beginnen. Das Dropdown **Erster Tag der Woche** im Abschnitt Kircheninformationen ist auf **Sonntag** voreingestellt, kann aber auf einen beliebigen Tag gesetzt werden. Nach einer Änderung wird sie in den Kalenderrastern von B1 Admin und im Mitgliederbereich von B1.church berücksichtigt – Gruppenkalender, kuratierte Kalender und der Veranstaltungseditor beginnen die Wochen alle mit dem von Ihnen gewählten Tag.

## Zeitzone

Das Dropdown **Zeitzone** im Abschnitt **Kircheninformationen** legt die Zeitzone Ihrer Kirche fest (zum Beispiel *Europe/Berlin*). Wählen Sie **Keine**, um das Feld leer zu lassen. Nach dem Speichern erscheint die Zeitzone in der Übersicht der Kircheninformationen.

B1 verwendet diese Zeitzone für kirchenweite Zeitangaben, etwa Veranstaltungserinnerungen und die Zeitpläne auf Ihren [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-Fernsehern. [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) richten sich zuerst nach der Zeitzone des [Standorts](./campuses.md) des Gottesdienstes und verwenden die Zeitzone der Kirche nur, wenn der Standort keine hat. Liegen all Ihre Standorte in derselben Zeitzone, stellen Sie sie sowohl bei der Kirche als auch bei jedem Standort ein.

## Region (Datums- und Telefonformat)

Die Einstellung **Region** bestimmt, wie Datums- und Zeitangaben in ganz B1 geschrieben werden. Standardmäßig verwenden Datumsangaben das US-amerikanische Format (zum Beispiel „Sep 28, 2026“ und „9/28/2026“). Kirchen außerhalb der USA können auf ihr eigenes Format umstellen – wählen Sie etwa Deutsch (Deutschland), dann erscheinen „28. Sep. 2026“ und „28.09.2026“.

1. Klicken Sie auf der Einstellungsseite in der linken Liste auf **Region** und dann im Abschnitt **Region** auf **Bearbeiten**.
2. Wählen Sie Ihre Region im Dropdown **Region**. Jede Option zeigt ein Beispieldatum, sodass Sie genau sehen, wie Datumsangaben aussehen werden.
3. Klicken Sie auf **Speichern**.

Der Abschnitt Region zeigt danach Ihre gewählte Region, ein Beispiel für das **Datumsformat** und Ihr Format für **Telefonnummern**.

### Format der Telefonnummern

Im selben Abschnitt Region legt die Einstellung **Telefonnummern** fest, wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (mit Ländervorwahl)** -- der Standard. Telefonfelder zeigen eine Länderflaggen-Auswahl und speichern Nummern mit der Ländervorwahl (zum Beispiel +49 30 555 1234).
- **Lokal (wie eingegeben)** -- Telefonfelder werden zu einfachen Textfeldern und speichern Nummern genau so, wie Sie sie eingeben, ohne Ländervorwahl (zum Beispiel 030 555 1234). Wählen Sie dies, wenn Ihre Kirche Nummern in einem lokalen Format schreibt und B1 keine Ländervorwahl hinzufügen soll.

Ist **Lokal** ausgewählt, zeigt der Abschnitt Region neben Ihrer Region außerdem „Lokale Telefonnummern“ an.

:::tip
Texting funktioniert am besten, wenn Nummern die Ländervorwahl enthalten. Wenn Sie Texte aus B1 versenden, behalten Sie das Format **International** bei oder stellen Sie im Modus Lokal sicher, dass die eingegebenen Nummern die Ländervorwahl enthalten.
:::

Ihre Region gilt für Datums- und Zeitangaben in ganz B1 Admin sowie auf Ihrer B1.church-Website und im Mitgliederbereich, einschließlich Predigten, Blogbeiträge, Gruppenkalender und Gottesdienstpläne. Mitglieder sehen Daten so im selben Format wie Ihre Mitarbeitenden.

## Texting {#texting}

Verbinden Sie einen Texting-Anbieter, um SMS-Nachrichten aus B1 Admin an eine Person oder eine ganze Gruppe zu senden. Texte werden über Ihr eigenes Konto beim Anbieter versendet, daher gelten dessen Preise und Limits.

1. Klicken Sie auf der Einstellungsseite in der linken Liste auf **Texting** und dann im Abschnitt **Texting** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**:
   - **Clearstream** -- geben Sie einen **API-Schlüssel** ein. Erstellen Sie ihn in Ihren Clearstream-Kontoeinstellungen unter API-Schlüssel.
   - **Text In Church** -- geben Sie einen **API-Schlüssel** ein. Bitten Sie zuerst den Support von Text In Church um Zugang zur Entwickler-API und erstellen Sie dann einen Schlüssel im Bereich Ihrer Kontoeinstellungen unter „Developer API“.
   - **Nalo Solutions** (Ghana) -- geben Sie den Authentifizierungsschlüssel aus Ihrem Nalo-Solutions-Konto als **API-Schlüssel** ein sowie eine **Absender-ID** (bis zu 11 Zeichen), die Nalo für Sie freigegeben hat.
   - **Twilio** -- verwenden Sie das eigene Twilio-Konto Ihrer Kirche; Twilio rechnet direkt mit Ihnen ab. Kopieren Sie **Account SID** und **Auth Token** aus der [Twilio Console](https://console.twilio.com) und geben Sie eine **Absenderrufnummer** ein – eine Twilio-Telefonnummer, die für A2P 10DLC registriert ist, im Format wie `+4930555123`. Fügen Sie nach dem Speichern die eingehende Webhook-URL (siehe unten) in der Twilio-Nummer unter **Eine Nachricht kommt an** als Webhook ein, damit STOP-Antworten auch in B1 erfasst werden.
3. Klicken Sie auf **Speichern**.

Um das Texting zu beenden, setzen Sie den **Anbieter** auf **Keiner** und speichern Sie. Dadurch wird der gespeicherte Anbieter entfernt.

### Personen abmelden, die mit STOP antworten

Sobald ein Anbieter gespeichert ist, öffnen Sie den Bereich Texting erneut mit **Bearbeiten**. Unterhalb der Anbietereinstellungen zeigt ein schreibgeschütztes Feld **Eingehende (STOP) Webhook-URL** eine Webadresse, die eindeutig für Ihre Kirche ist. Klicken Sie in das Feld, um die Adresse zu markieren, kopieren Sie sie und fügen Sie sie in die Einstellung für eingehende Nachrichten (Antworten) Ihres Texting-Anbieters als Webhook ein. Dies funktioniert mit allen oben genannten Anbietern, die eingehende Antworten an einen Webhook weiterleiten können.

Antwortet danach jemand auf eine Ihrer Nachrichten mit **STOP** (oder STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT oder REVOKE), findet B1 alle Personen mit dieser Mobilnummer, markiert sie als abgemeldet und schaltet ihre Text-Erinnerungen aus. Sie werden anschließend bei Gruppentexten übersprungen. Andere Antworten werden ignoriert.

:::info
Dies verwendet dieselbe Abmeldeeinstellung wie **Von Mitgliederverzeichnis ausblenden**. Personen, die mit STOP antworten, werden deshalb in ihrem Profil auch als **Im Verzeichnis ausgeblendet** angezeigt. Das Feld erscheint nur, während der gespeicherte Anbieter ausgewählt ist – wechseln Sie im Dropdown zu einem anderen Anbieter, speichern Sie zuerst, um die URL erneut zu sehen.
:::

Sobald ein Anbieter verbunden ist, sehen Mitarbeitende mit der Berechtigung zum Senden von Texten auf der Seite einer Gruppe eine Schaltfläche **Text** (**Dieser Gruppe Text senden**) und auf der Seite einer Person mit Mobilnummer eine Schaltfläche **Textnachricht senden**. Geben Sie Ihre Nachricht ein und klicken Sie auf **Senden**. Der Dialog zählt Zeichen und SMS-Segmente. Bei einer Gruppe zeigt er vor dem Senden an, wie viele Mitglieder den Text erhalten werden:

- Mitglieder ohne hinterlegte Mobilnummer werden übersprungen.
- Mitglieder, die **Von Mitgliederverzeichnis ausblenden** gewählt haben, gelten als abgemeldet und werden übersprungen.
- Familienmitglieder, die sich eine Mobilnummer teilen, erhalten den Text nur einmal.

### Texte mit Platzhaltern personalisieren {#personalizing-texts-with-merge-fields}

Unterhalb des Nachrichtenfelds zeigt der Dialog Text Platzhalter-Chips: **Vorname**, **Nachname**, **Anzeigename** und **Name der Kirche**. Klicken Sie auf einen Chip, um dessen Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an der Cursorposition einzufügen. Beim Senden wird jeder Platzhalter durch die Daten des jeweiligen Empfängers ersetzt. So erreicht ein Gruppentext wie `Hallo {{firstName}}, bis Sonntag!` jedes Mitglied mit dessen eigenem Namen. Platzhalter funktionieren sowohl bei Gruppentexten als auch bei Texten an eine einzelne Person.

:::info
Das Limit von 1.600 Zeichen gilt für die Nachricht, wie Sie sie eingeben. Nachdem die Platzhalter ausgefüllt wurden, wird jeder Text, der länger als 1.600 Zeichen ist, auf diese Länge gekürzt.
:::

Texte können auch automatisch aus einem [Workflow](../serving/workflows.md#sending-a-text)-Schritt mit der Aktion **Text senden** versendet werden. Diese verwendet denselben Anbieter und dieselben Platzhalter.

## Dateispeicher

Standardmäßig nutzen Dateien, die Sie auf Ihre Website hochladen (über [Dateien](../website/files.md)) und andere Inhaltsbereiche, den kostenlosen gehosteten Speicher von B1 mit bis zu 100 MB. Wenn Sie mehr Platz benötigen, können Sie stattdessen Ihren eigenen Cloud-Speicher anbinden – neue Uploads landen dann direkt in Ihrem Konto ohne Begrenzung durch die Plattform.

1. Klicken Sie auf der Einstellungsseite in der linken Liste auf **Dateispeicher** und dann im Abschnitt **Dateispeicher** auf **Bearbeiten**.
2. Wählen Sie einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2 usw.).
3. Bei Google Drive, Dropbox oder OneDrive klicken Sie auf **Verbinden** und melden sich an, um den Zugriff zu autorisieren. Bei einem S3-kompatiblen Bucket geben Sie Ihren Zugriffsschlüssel, das Geheimnis, den Bucketnamen und die Basis-URL für den öffentlichen Zugriff ein.
4. Klicken Sie auf **Speichern**.

:::info
Dies betrifft nur neue Uploads auf die Dateien Ihrer Website und ähnliche Inhaltsbereiche. Galeriebilder, Vorschaubilder, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Klassenstufenaufstieg

Wenn Sie bei Kindern und Jugendlichen die **Klassenstufe** erfassen, kann B1 alle an einem Stichtag, den Sie wählen (zum Beispiel 1. August), automatisch eine Stufe höher setzen, statt dass Sie jedes Profil von Hand bearbeiten müssen.

1. Klicken Sie auf der Einstellungsseite in der linken Liste auf **Klassenstufen-Aufstieg** und dann im Abschnitt **Klassenstufen-Aufstieg** auf **Bearbeiten**.
2. Schalten Sie den Schalter ein (er zeigt **Aktiviert**) und wählen Sie den **Monat** und den **Tag**, an dem die Klassenstufen jedes Jahr aufsteigen. An diesem Tag rückt jede Person mit einer Klassenstufe eine Stufe auf, und Schüler der 12. Klasse werden als **Abgeschlossen** markiert.
3. Speichern Sie Ihre Änderungen.

Um den automatischen Aufstieg zu beenden, schalten Sie den Schalter aus, sodass er **Deaktiviert** anzeigt, und speichern Sie. Das Aufstiegsdatum wird entfernt, und die Klassenstufen ändern sich nicht mehr von selbst.

## Ehrenamtliche Anmeldung {#volunteer-signup}

Standardmäßig sehen Mitglieder, die sich [für ehrenamtliche Dienste anmelden](../../b1-church/serving/volunteer-signup.md), jede kommende Woche mit offenen Positionen. Wird die Liste zu lang, können Sie stattdessen nur die nächste Woche jedes Planungstyps anzeigen.

1. Klicken Sie auf der Einstellungsseite in der linken Liste auf **Ehrenamtliche Anmeldung** und dann im Abschnitt **Ehrenamtliche Anmeldung** auf **Bearbeiten**.
2. Aktivieren Sie **Nur die nächste Woche jedes Planungstyps anzeigen**.
3. Speichern Sie Ihre Änderungen.

Ist dies aktiviert, zeigt jeder Planungstyp nur seinen nächsten bevorstehenden Plan. Die folgende Woche erscheint, sobald dieses Datum vorüber ist. Die Zeile **Angezeigte Wochen** im Abschnitt lautet **Nur die nächste Woche jedes Planungstyps** oder **Alle kommenden Wochen**.

## Datenschutz bei Spenden {#giving-privacy}

Personen mit Zugriff auf Spenden sehen normalerweise die Spendensummen einer Person auf deren [Personendatensatz](../people/adding-people.md#editing-details). Wenn Sie nicht bei jedem Öffnen eines Datensatzes Beträge auf dem Bildschirm haben möchten, können Sie sie ausblenden, bis jemand danach fragt.

1. Klicken Sie auf der Einstellungsseite in der linken Liste auf **Datenschutz bei Spenden** und dann im Abschnitt **Datenschutz bei Spenden** auf **Bearbeiten**.
2. Aktivieren Sie **Spenden auf Personendatensätzen ausblenden, bis angeklickt**.
3. Speichern Sie Ihre Änderungen.

Ist dies aktiviert, steht auf der Spendenkarte eines Personendatensatzes „Spenden sind auf Personendatensätzen ausgeblendet.“ Klicken Sie auf **Spenden anzeigen**, um die Spenden dieser Person zu laden und anzuzeigen. Die Anzeige wird wieder ausgeblendet, sobald Sie eine andere Person öffnen. Wer Spenden einsehen darf, ändert sich dadurch nicht: Nur Personen mit Zugriff auf Spenden sehen die Karte überhaupt.

## Import und Export

Der Link **Import/Export** unter dem Namen Ihrer Kirche auf der Einstellungsseite öffnet ein eigenes Werkzeug in einem neuen Browserfenster. Damit können Sie:

- Mitgliederdaten aus einem anderen Gemeindeverwaltungssystem importieren.
- Ihre ChurchApps-Daten zur Sicherung oder Migration exportieren.

Das ist besonders hilfreich, wenn Sie Ihre Kirche erstmals einrichten und bestehende Datensätze in ChurchApps übertragen müssen.

:::warning
Sichern Sie beim Import von Daten zuerst immer Ihre bestehenden Datensätze. Importvorgänge fügen Daten zu Ihrem System hinzu und können doppelte Einträge erzeugen, wenn sie mehrfach ausgeführt werden.
:::
