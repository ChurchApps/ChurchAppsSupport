---
title: "Kircheneinstellungen"
---

# Kircheneinstellungen

<div class="article-intro">

Auf der Seite Kircheneinstellungen konfigurieren Sie die Grundinformationen Ihrer Kirche, die Kontaktdaten und das Erscheinungsbild. Diese Angaben werden in allen ChurchApps-Werkzeugen verwendet, einschließlich Ihrer B1.church-Website und der App B1 Mobile.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, lesen Sie [Rollen & Berechtigungen](./roles-permissions.md).
- Halten Sie die Adresse, Kontaktdaten und das Logo Ihrer Kirche bereit.

</div>

## Die Informationen zu Ihrer Kirche bearbeiten

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
2. Klicken Sie im Abschnitt **Kircheninformationen** (oben auf der Seite) auf **Bearbeiten**.
3. Aktualisieren Sie eines der folgenden Felder:
   - **Name der Kirche** – der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Adresse** – die physische Adresse Ihrer Kirche.
   - **Kontaktinformationen** – Telefonnummer, E-Mail-Adresse und weitere Kontaktdaten.
   - **Zeitzone** – die Zeitzone Ihrer Kirche. Siehe [Zeitzone](#time-zone) unten.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

## Ihre Subdomain einrichten

Ihre Kirche erhält eine kostenlose Subdomain unter **ihrekirche.1.church**. Unter dieser Webadresse können Mitglieder und Gäste Ihren Online-Auftritt aufrufen.

1. Klicken Sie auf der Seite Einstellungen im Abschnitt **Kircheninformationen** auf **Bearbeiten** und suchen Sie das Feld **Subdomain**.
2. Geben Sie Ihre gewünschte Subdomain ein (zum Beispiel „gnadenkirche“ für gnadenkirche.1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss unter allen ChurchApps-Kirchen eindeutig sein. Ist Ihr Wunschname bereits vergeben, hängen Sie zum Beispiel Ihre Stadt oder Ihr Bundesland an (etwa „gnadenkirche-dallas“).
:::

Wenn Besucher Ihre Website unter einer eigenen Domain erreichen sollen (zum Beispiel **www.gnadenkirche.org**), lesen Sie [Eigene Domain](./custom-domain.md).

## Branding konfigurieren

Passen Sie an, wie Ihre Kirche in allen ChurchApps-Werkzeugen erscheint:

1. Laden Sie Ihr **Kirchenlogo** hoch, indem Sie auf den Logobereich klicken und eine Bilddatei auswählen.
2. Fügen Sie weitere **Kirchenbilder** hinzu, die auf Ihrer Website und in der [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Am besten sieht es aus, wenn Sie ein Logo mit transparentem Hintergrund im PNG-Format verwenden. So wirkt es sowohl auf hellen als auch auf dunklen Hintergründen gut.
:::

## Erster Tag der Woche

Wählen Sie, mit welchem Tag Ihre Kalender beginnen. Das Auswahlmenü **Erster Tag der Woche** im Bereich Kircheninformationen ist auf **Sonntag** voreingestellt, kann aber auf jeden beliebigen Tag gesetzt werden. Nach einer Änderung wird sie in den Kalenderansichten von B1 Admin und im Mitgliederportal B1.church berücksichtigt. Gruppenkalender, kuratierte Kalender und der Veranstaltungseditor zeigen Wochen dann alle ab dem gewählten Tag an.

## Zeitzone {#time-zone}

Das Auswahlmenü **Zeitzone** im Bereich **Kircheninformationen** legt die Zeitzone Ihrer Kirche fest (zum Beispiel *Europe/Berlin*). Wählen Sie **Keine**, um das Feld leer zu lassen. Nach dem Speichern erscheint die Zeitzone in der Übersicht der Kircheninformationen.

B1 verwendet diese Zeitzone für kirchenweite Zeitangaben, etwa für Veranstaltungserinnerungen und die Zeitpläne Ihrer [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-Fernseher. [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) richten sich zuerst nach der Zeitzone des [Standorts](./campuses.md) des Gottesdienstes und verwenden die Zeitzone der Kirche nur, wenn dieser Standort keine hat. Liegen alle Ihre Standorte in einer Zeitzone, tragen Sie sie sowohl bei der Kirche als auch bei jedem Standort ein.

## Region (Datums- und Telefonformat)

Die Einstellung **Region** legt fest, wie Datums- und Zeitangaben in ganz B1 geschrieben werden. Standardmäßig werden Daten im US-Format angezeigt (zum Beispiel „Sep 28, 2026“ und „9/28/2026“). Kirchen außerhalb der USA können auf ihr eigenes Format umstellen. Wählen Sie zum Beispiel Deutsch (Deutschland), wird „28. Sept. 2026“ bzw. „28.09.2026“ angezeigt.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Region** und dann im Abschnitt **Region** auf **Bearbeiten**.
2. Wählen Sie Ihre Region im Auswahlmenü **Region**. Jede Option zeigt ein Beispieldatum, damit Sie genau sehen, wie Daten aussehen.
3. Klicken Sie auf **Speichern**.

Der Abschnitt Region zeigt danach die gewählte Region, ein Beispiel für das **Datumsformat** und Ihr Format für **Telefonnummern**.

### Format der Telefonnummern

Im selben Abschnitt Region gibt es die Einstellung **Telefonnummern**. Sie legt fest, wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (mit Ländervorwahl)** – die Standardeinstellung. Telefonfelder zeigen eine Auswahl mit Länderflagge, und Nummern werden mit der Ländervorwahl gespeichert (zum Beispiel +49 30 555 1234).
- **Lokal (wie eingegeben)** – Telefonfelder werden zu einfachen Textfeldern, und Nummern werden genau so gespeichert, wie Sie sie eingeben, ohne Ländervorwahl (zum Beispiel 030 1234 5678). Wählen Sie dies, wenn Ihre Kirche Nummern in einem lokalen Format schreibt und B1 keine Ländervorwahl ergänzen soll.

Ist **Lokal** ausgewählt, zeigt der Abschnitt Region neben Ihrer Region außerdem „Lokale Telefonnummern“ an.

:::tip
Textnachrichten funktionieren am besten, wenn Nummern eine Ländervorwahl enthalten. Wenn Sie aus B1 SMS senden, belassen Sie das Format **International** oder achten Sie im Modus Lokal darauf, dass die eingegebenen Nummern die Ländervorwahl enthalten.
:::

Ihre Region gilt für Datums- und Zeitangaben in ganz B1 Admin sowie auf Ihrer B1.church-Website und im Mitgliederportal, einschließlich Predigten, Blogbeiträgen, Gruppenkalendern und Dienstplänen. So sehen Mitglieder Daten im selben Format wie Ihre Mitarbeitenden.

## Textnachrichten {#texting}

Verbinden Sie einen Anbieter für Textnachrichten, um SMS an eine Person oder eine ganze Gruppe aus B1 Admin zu senden. Die Nachrichten werden über Ihr eigenes Konto beim Anbieter versendet, daher gelten dessen Preise und Limits.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Textnachrichten** und dann im Abschnitt **Textnachrichten** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**:
   - **Clearstream** – geben Sie einen **API-Schlüssel** ein. Erstellen Sie ihn in Ihren Clearstream-Kontoeinstellungen unter API-Schlüssel.
   - **Text In Church** – geben Sie einen **API-Schlüssel** ein. Bitten Sie zuerst den Support von Text In Church um Zugang zur Entwickler-API und erstellen Sie dann einen Schlüssel unter Kontoeinstellungen > Abschnitt Entwickler-API.
   - **Nalo Solutions** (Ghana) – geben Sie den Authentifizierungsschlüssel aus Ihrem Nalo-Solutions-Konto als **API-Schlüssel** ein sowie eine **Absender-ID** (bis zu 11 Zeichen), die Nalo für Sie freigegeben hat.
3. Klicken Sie auf **Speichern**.

Um Textnachrichten zu beenden, setzen Sie **Anbieter** auf **Keiner** und speichern Sie. Dadurch wird der gespeicherte Anbieter entfernt.

### Personen abmelden, die mit STOP antworten

Sobald ein Anbieter gespeichert ist, öffnen Sie den Bereich Textnachrichten mit **Bearbeiten** erneut. Unterhalb der Anbietereinstellungen zeigt ein nur lesbares Feld **Eingehende (STOP-)Webhook-URL** eine Webadresse, die nur zu Ihrer Kirche gehört. Klicken Sie in das Feld, um die Adresse zu markieren, kopieren Sie sie und fügen Sie sie in die Einstellung für eingehende Nachrichten (Antworten) Ihres Anbieters für Textnachrichten ein. Das funktioniert mit allen oben genannten Anbietern, die eingehende Antworten an einen Webhook weiterleiten können.

Wenn danach jemand auf eine Ihrer Nachrichten mit **STOP** (oder STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT oder REVOKE) antwortet, sucht B1 alle Personen mit passender Mobilnummer, markiert sie als abgemeldet und schaltet ihre Textnachrichten-Erinnerungen aus. Anschließend werden sie bei Gruppen-SMS übersprungen. Andere Antworten werden ignoriert.

:::info
Dies verwendet dieselbe Abmeldeeinstellung wie **Mich im Mitgliederverzeichnis ausblenden**. Personen, die mit STOP antworten, werden daher in ihrem Profil auch als **Im Verzeichnis ausgeblendet** angezeigt. Das Feld erscheint nur, wenn der gespeicherte Anbieter ausgewählt ist. Wechseln Sie das Auswahlmenü zu einem anderen Anbieter, speichern Sie zuerst, um die URL erneut zu sehen.
:::

Sobald ein Anbieter verbunden ist, sehen Mitarbeitende mit der Berechtigung zum Senden von Textnachrichten auf der Seite einer Gruppe (**Diese Gruppe per SMS anschreiben**) und auf der Seite einer Person mit Mobilnummer (**SMS senden**) eine Schaltfläche **SMS**. Tippen Sie Ihre Nachricht ein und klicken Sie auf **Senden**. Der Dialog zählt Zeichen und SMS-Segmente. Bei einer Gruppe zeigt er vor dem Senden an, wie viele Mitglieder die Nachricht erhalten:

- Mitglieder ohne hinterlegte Mobilnummer werden übersprungen.
- Mitglieder, die **Mich im Mitgliederverzeichnis ausblenden** gewählt haben, gelten als abgemeldet und werden übersprungen.
- Familienmitglieder, die sich eine Mobilnummer teilen, erhalten die Nachricht nur einmal.

### Platzhalter in Texten verwenden {#personalizing-texts-with-merge-fields}

Unterhalb des Nachrichtenfelds zeigt der Textdialog Platzhalter-Chips: **Vorname**, **Nachname**, **Anzeigename** und **Kirchenname**. Klicken Sie auf einen Chip, um dessen Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an der Cursorposition einzufügen. Beim Senden wird jeder Platzhalter durch die Angaben des jeweiligen Empfängers ersetzt. Eine Gruppen-SMS wie `Hallo {{firstName}}, bis Sonntag!` erreicht daher jedes Mitglied mit seinem eigenen Namen. Platzhalter funktionieren sowohl bei Gruppen-SMS als auch bei Nachrichten an eine einzelne Person.

:::info
Das Limit von 1.600 Zeichen gilt für die Nachricht, so wie Sie sie eingeben. Nachdem die Platzhalter ausgefüllt sind, wird jeder Text, der länger als 1.600 Zeichen ist, an dieser Stelle abgeschnitten.
:::

Textnachrichten können außerdem automatisch aus einem Schritt eines [Workflows](../serving/workflows.md#sending-a-text) mit der Aktion **SMS senden** versendet werden. Sie verwenden denselben Anbieter und dieselben Platzhalter.

## Dateispeicher

Standardmäßig nutzen Dateien, die Sie über [Dateien](../website/files.md) auf Ihre Website hochladen, und andere Inhaltsbereiche den kostenlosen gehosteten Speicher von B1 mit bis zu 100 MB. Wenn Sie mehr Platz brauchen, können Sie stattdessen Ihren eigenen Cloud-Speicher verbinden. Neue Uploads gehen dann direkt auf Ihr Konto, ohne Begrenzung durch die Plattform.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Dateispeicher** und dann im Abschnitt **Dateispeicher** auf **Bearbeiten**.
2. Wählen Sie einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2 usw.).
3. Bei Google Drive, Dropbox oder OneDrive klicken Sie auf **Verbinden** und melden sich an, um den Zugriff zu autorisieren. Bei einem S3-kompatiblen Bucket geben Sie Ihren Zugriffsschlüssel, das Geheimnis, den Bucket-Namen und die öffentliche Basis-URL ein.
4. Klicken Sie auf **Speichern**.

:::info
Dies betrifft nur neue Uploads für Ihre Website-Dateien und ähnliche Inhaltsbereiche. Galeriebilder, Vorschaubilder, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Jahrgangsaufstieg

Wenn Sie den **Jahrgang** von Kindern und Schülern erfassen, kann B1 alle an einem von Ihnen gewählten Datum (zum Beispiel am 1. August) automatisch eine Klassenstufe höher setzen, statt dass Sie jedes Profil von Hand bearbeiten müssen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Jahrgangsaufstieg** und dann im Abschnitt **Jahrgangsaufstieg** auf **Bearbeiten**.
2. Schalten Sie den Schalter ein (er zeigt **Aktiviert**) und wählen Sie den **Monat** und den **Tag**, an denen die Jahrgänge jedes Jahr aufsteigen. An diesem Datum rückt jede Person mit einem Jahrgang um eine Stufe auf, und Schüler der 12. Klasse werden zu **Abgeschlossen**.
3. Speichern Sie Ihre Änderungen.

Um den automatischen Aufstieg zu beenden, schalten Sie den Schalter aus, sodass er **Deaktiviert** anzeigt, und speichern Sie. Das Datum des Aufstiegs wird entfernt, und die Jahrgänge ändern sich nicht mehr von selbst.

## Ehrenamtliche Anmeldung {#volunteer-signup}

Standardmäßig sehen Mitglieder, die sich für [Dienste der Ehrenamtlichen](../../b1-church/serving/volunteer-signup.md) anmelden, jede kommende Woche mit offenen Stellen. Ist diese Liste lang, können Sie stattdessen nur die nächste Woche jedes Plantyps anzeigen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Ehrenamtliche Anmeldung** und dann im Abschnitt **Ehrenamtliche Anmeldung** auf **Bearbeiten**.
2. Aktivieren Sie **Nur die nächste Woche jedes Plantyps anzeigen**.
3. Speichern Sie Ihre Änderungen.

Mit dieser Einstellung zeigt jeder Plantyp nur seinen nächsten kommenden Plan. Die folgende Woche erscheint, sobald dieses Datum vorbei ist. Die Zeile **Angezeigte Wochen** im Abschnitt zeigt entweder **Nur die nächste Woche jedes Plantyps** oder **Alle kommenden Wochen**.

## Datenschutz bei Spenden {#giving-privacy}

Personen mit Zugriff auf Spenden sehen normalerweise die Spendensummen einer Person auf deren [Personendatensatz](../people/adding-people.md#editing-details). Wenn Sie nicht jedes Mal, wenn ein Datensatz geöffnet wird, Beträge auf dem Bildschirm haben möchten, können Sie sie ausblenden, bis jemand danach fragt.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Datenschutz bei Spenden** und dann im Abschnitt **Datenschutz bei Spenden** auf **Bearbeiten**.
2. Aktivieren Sie **Spenden auf Personendatensätzen ausblenden, bis angeklickt**.
3. Speichern Sie Ihre Änderungen.

Mit dieser Einstellung sagt die Spendenkarte auf einem Personendatensatz „Spenden werden auf Personendatensätzen ausgeblendet.“ Klicken Sie auf **Spenden anzeigen**, um die Spenden dieser Person zu laden und anzuzeigen. Beim Öffnen einer anderen Person wird sie wieder ausgeblendet. Wer Spenden sehen darf, ändert sich nicht: Nur Personen mit Zugriff auf Spenden sehen die Karte überhaupt.

## Import und Export

Der Link **Import/Export** unter dem Namen Ihrer Kirche auf der Seite Einstellungen öffnet ein eigenes Werkzeug in einem neuen Browserfenster. Damit können Sie:

- Mitgliederdaten aus einem anderen Verwaltungssystem für Kirchen importieren.
- Ihre ChurchApps-Daten für Sicherungen oder einen Umzug exportieren.

Das ist besonders hilfreich, wenn Sie Ihre Kirche gerade einrichten und bestehende Datensätze in ChurchApps übertragen müssen.

:::warning
Sichern Sie beim Import von Daten immer zuerst Ihre bestehenden Datensätze. Importvorgänge fügen Daten hinzu und können bei mehrfacher Ausführung doppelte Einträge erzeugen.
:::
