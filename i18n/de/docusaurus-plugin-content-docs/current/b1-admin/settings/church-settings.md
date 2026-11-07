---
title: "Kircheneinstellungen"
description: "Name, Adresse, Subdomain, Zeitzone, Regionalformat, SMS-Anbieter und Dateispeicher Ihrer Gemeinde auf der Seite Church Settings in B1 Admin festlegen."
---

# Kircheneinstellungen

<div class="article-intro">

Auf der Seite Kircheneinstellungen konfigurieren Sie die Grundangaben Ihrer Kirche, Kontaktdaten und das Erscheinungsbild. Diese Angaben werden in allen ChurchApps-Werkzeugen verwendet, einschließlich Ihrer B1.church-Website und der App B1 Mobile.

</div>

## Schulungsvideo

<YouTube id="634zSbzDkYA" title="Kircheninformationen und Erscheinungsbild in B1 einrichten" next="Rollen, Berechtigungen und Ihr Team in B1 einladen" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Siehe [Rollen & Berechtigungen](./roles-permissions.md), falls Sie keinen Zugriff haben.
- Halten Sie die Adresse, Kontaktdaten und das Logo Ihrer Kirche bereit

</div>

## Kircheninformationen bearbeiten

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
2. Klicken Sie im Abschnitt **Kircheninformationen** (oben auf der Seite) auf **Bearbeiten**.
3. Aktualisieren Sie eines der folgenden Felder:
   - **Name der Kirche** – Der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Adresse** – Die physische Adresse Ihrer Kirche.
   - **Kontaktdaten** – Telefonnummer, E-Mail-Adresse und weitere Kontaktangaben.
   - **Zeitzone** – Die Zeitzone Ihrer Kirche. Siehe [Zeitzone](#time-zone) unten.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

## Ihre Subdomain einrichten

Ihre Kirche erhält eine kostenlose Subdomain unter **ihrekirche.1.church**. Dies ist die Webadresse, unter der Mitglieder und Besucher den Online-Auftritt Ihrer Kirche erreichen.

1. Klicken Sie auf der Seite Einstellungen im Abschnitt **Kircheninformationen** auf **Bearbeiten** und suchen Sie das Feld **Subdomain**.
2. Geben Sie Ihre gewünschte Subdomain ein (zum Beispiel „gnadenkirche“ für gnadenkirche.1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss unter allen ChurchApps-Kirchen eindeutig sein. Ist Ihr Wunschname bereits vergeben, hängen Sie Ihre Stadt oder Ihr Bundesland an (zum Beispiel „gnadenkirche-dallas“).
:::

Möchten Sie, dass Besucher Ihre Seite unter einer eigenen Domain erreichen (zum Beispiel **`www.gnadenkirche.org`**), lesen Sie [Eigene Domain](./custom-domain.md).

## Erscheinungsbild festlegen

Gestalten Sie, wie Ihre Kirche in allen ChurchApps-Werkzeugen erscheint:

1. Laden Sie Ihr **Kirchenlogo** hoch, indem Sie auf den Logobereich klicken und eine Bilddatei auswählen.
2. Fügen Sie weitere **Kirchenbilder** hinzu, die auf Ihrer Website und in Ihrer [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Für beste Ergebnisse verwenden Sie ein Logo im PNG-Format mit transparentem Hintergrund. So sieht es sowohl auf hellen als auch auf dunklen Hintergründen gut aus.
:::

## Erster Tag der Woche

Wählen Sie, mit welchem Tag Ihre Kalender beginnen. Das Dropdown **Erster Tag der Woche** im Bereich Kircheninformationen ist auf **Sonntag** voreingestellt, kann aber auf jeden beliebigen Tag gesetzt werden. Nach der Änderung wird dies in den Kalenderrastern von B1 Admin und im B1.church-Mitgliederbereich berücksichtigt – Gruppenkalender, kuratierte Kalender und der Veranstaltungseditor beginnen die Wochen alle mit dem von Ihnen gewählten Tag.

## Zeitzone {#time-zone}

Das Dropdown **Zeitzone** im Bereich **Kircheninformationen** legt die Zeitzone Ihrer Kirche fest (zum Beispiel *America/Chicago*). Wählen Sie **Keine**, um das Feld leer zu lassen. Nach dem Speichern erscheint die Zeitzone in der Zusammenfassung der Kircheninformationen.

B1 verwendet diese Zeitzone für kirchenweite Zeitangaben, etwa Veranstaltungserinnerungen und die Zeitpläne Ihrer FreePlay-Fernseher. [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) werden zuerst in der Zeitzone des [Standorts](./campuses.md) des Gottesdienstes gemessen und nur dann in der Zeitzone der Kirche, wenn dieser Standort keine hat. Liegen alle Ihre Standorte in einer Zeitzone, legen Sie sie sowohl für die Kirche als auch für jeden Standort fest.

## Region (Datums- und Telefonformat)

Die Einstellung **Region** bestimmt, wie Datum und Uhrzeit in ganz B1 geschrieben werden. Standardmäßig verwenden Datumsangaben das US-amerikanische Format (zum Beispiel „Sep 28, 2026“ und „9/28/2026“). Kirchen außerhalb der USA können auf ihr eigenes Format umstellen – wählen Sie zum Beispiel Englisch (Vereinigtes Königreich), wird „28 Sept 2026“ und „28/09/2026“ angezeigt.

1. Klicken Sie auf der Seite Einstellungen in der Liste links auf **Region** und dann im Abschnitt **Region** auf **Bearbeiten**.
2. Wählen Sie Ihre Region aus dem Dropdown **Region**. Jede Option zeigt ein Beispieldatum, damit Sie genau sehen, wie Datumsangaben aussehen werden.
3. Klicken Sie auf **Speichern**.

Der Abschnitt Region zeigt dann Ihre gewählte Region, ein Beispiel für das **Datumsformat** und Ihr Format für **Telefonnummern**.

### Format der Telefonnummern

Im selben Abschnitt Region steht die Einstellung **Telefonnummern**, die festlegt, wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (mit Ländervorwahl)** – die Voreinstellung. Telefonfelder zeigen eine Auswahl mit Länderflagge und speichern Nummern mit Ländervorwahl (zum Beispiel +1 918 555 1234).
- **Lokal (wie eingegeben)** – Telefonfelder werden zu einfachen Textfeldern und speichern Nummern genau so, wie Sie sie eingeben, ohne Ländervorwahl (zum Beispiel 0701 234 5678). Wählen Sie dies, wenn Ihre Kirche Nummern in einem lokalen Format schreibt und B1 keine Ländervorwahl hinzufügen soll.

Ist **Lokal** ausgewählt, zeigt der Abschnitt Region außerdem „Lokale Telefonnummern“ neben Ihrer Region an.

:::tip
Textnachrichten funktionieren am besten, wenn Nummern die Ländervorwahl enthalten. Wenn Sie aus B1 Textnachrichten senden, behalten Sie das Format **International**, oder achten Sie im Modus Lokal darauf, dass die Nummern mit Ländervorwahl eingegeben werden.
:::

Ihre Region gilt für Datums- und Zeitangaben in ganz B1 Admin sowie auf Ihrer B1.church-Website und im Mitgliederbereich, einschließlich Predigten, Blogbeiträgen, Gruppenkalendern und Dienstplänen, sodass Mitglieder Datumsangaben im selben Format sehen wie Ihre Mitarbeitenden.

## Textnachrichten {#texting}

Verbinden Sie einen Anbieter für Textnachrichten, um aus B1 Admin SMS an eine Person oder eine ganze Gruppe zu senden. Textnachrichten werden über Ihr eigenes Konto beim Anbieter versendet, daher gelten dessen Preise und Limits.

1. Klicken Sie auf der Seite Einstellungen in der Liste links auf **Textnachrichten** und dann im Abschnitt **Textnachrichten** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**:
   - **Clearstream** – geben Sie einen **API-Schlüssel** ein. Erstellen Sie ihn in Ihren Clearstream-Kontoeinstellungen unter API-Schlüssel.
   - **Text In Church** – geben Sie einen **API-Schlüssel** ein. Bitten Sie zuerst den Support von Text In Church um Zugang zur Entwickler-API und erstellen Sie dann einen Schlüssel unter Ihre Kontoeinstellungen > Abschnitt Entwickler-API.
   - **Nalo Solutions** (Ghana) – geben Sie den Autorisierungsschlüssel aus Ihrem Nalo-Solutions-Konto als **API-Schlüssel** ein sowie eine **Absender-ID** (bis zu 11 Zeichen), die Nalo für Sie freigegeben hat.
   - **Twilio** – verwenden Sie das eigene Twilio-Konto Ihrer Kirche; Twilio rechnet direkt mit Ihnen ab. Kopieren Sie die **Account-SID** und den **Auth-Token** aus der [Twilio Console](https://console.twilio.com) und geben Sie eine **Absendernummer** ein – eine für A2P 10DLC registrierte Twilio-Telefonnummer im Format `+15551234567`. Fügen Sie nach dem Speichern die eingehende Webhook-URL (siehe unten) unter „Eine Nachricht kommt an“ des Nummernprofils in Twilio ein, damit STOP-Antworten auch in B1 erfasst werden.
3. Klicken Sie auf **Speichern**.

Um Textnachrichten zu beenden, setzen Sie **Anbieter** auf **Keiner** und speichern Sie. Damit wird der gespeicherte Anbieter entfernt.

### Personen abmelden, die mit STOP antworten

Ist ein Anbieter gespeichert, öffnen Sie den Bereich Textnachrichten erneut über **Bearbeiten**. Unter den Anbietereinstellungen zeigt ein schreibgeschütztes Feld **URL des eingehenden Webhooks (STOP)** eine Webadresse, die nur zu Ihrer Kirche gehört. Klicken Sie in das Feld, um die Adresse auszuwählen, kopieren Sie sie und fügen Sie sie in die Einstellung für eingehende Nachrichten (Antwort-Webhook) Ihres Anbieters für Textnachrichten ein. Das funktioniert mit allen oben genannten Anbietern, die eingehende Antworten an einen Webhook weiterleiten können.

Antwortet danach jemand mit **STOP** (oder STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT oder REVOKE) auf eine Ihrer Nachrichten, sucht B1 alle Personen mit passender Mobilnummer, markiert sie als abgemeldet und schaltet ihre Textnachricht-Erinnerungen aus. Sie werden danach bei Gruppen-Textnachrichten übersprungen. Andere Antworten werden ignoriert.

:::info
Dies verwendet dieselbe Abmeldeeinstellung wie **Mich im Mitgliederverzeichnis ausblenden**. Personen, die mit STOP antworten, erscheinen daher auch in ihrem Profil als **Im Verzeichnis ausgeblendet**. Das Feld erscheint nur, während der gespeicherte Anbieter ausgewählt ist – wenn Sie das Dropdown auf einen anderen Anbieter umstellen, speichern Sie zuerst, um die URL erneut zu sehen.
:::

Sobald ein Anbieter verbunden ist, sehen Mitarbeitende mit der Berechtigung, Textnachrichten zu senden, auf der Seite einer Gruppe eine Schaltfläche **Text** (**Diese Gruppe per Text erreichen**) und auf der Seite einer Person mit Mobilnummer die Schaltfläche **Textnachricht senden**. Geben Sie Ihre Nachricht ein und klicken Sie auf **Senden**. Der Dialog zählt Zeichen und SMS-Segmente. Bei einer Gruppe zeigt er vor dem Senden an, wie viele Mitglieder die Nachricht erhalten:

- Mitglieder ohne hinterlegte Mobilnummer werden übersprungen.
- Mitglieder, die **Mich im Mitgliederverzeichnis ausblenden** gewählt haben, gelten als abgemeldet und werden übersprungen.
- Familienmitglieder, die sich eine Mobilnummer teilen, erhalten die Nachricht nur einmal.

### Textnachrichten mit Platzhaltern personalisieren {#personalizing-texts-with-merge-fields}

Unter dem Nachrichtenfeld zeigt das Textfenster Platzhalter-Chips: **Vorname**, **Nachname**, **Anzeigename** und **Kirchenname**. Klicken Sie auf einen Chip, um seinen Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an der Cursorposition einzufügen. Beim Senden wird jeder Platzhalter durch die Angaben des jeweiligen Empfängers ersetzt. Eine Gruppennachricht wie `Hallo {{firstName}}, bis Sonntag!` erreicht jedes Mitglied mit dessen eigenem Namen. Platzhalter funktionieren sowohl bei Nachrichten an eine Gruppe als auch an eine einzelne Person. Nachrichten an eine Gruppe bieten außerdem einen Chip **Gruppenname** (`{{groupName}}`), der durch den Namen der Gruppe ersetzt wird.

Um eine Nachricht wiederzuverwenden, speichern Sie sie als [Textvorlage](./email-templates.md#text-templates) (eine E-Mail-Vorlage der Kategorie **Text**) und wählen Sie sie oben im Textfenster unter **Vorlage laden (optional)** aus.

:::info
Die Grenze von 1.600 Zeichen gilt für die Nachricht, wie Sie sie eingeben. Nachdem die Platzhalter ausgefüllt wurden, wird jeder Text, der länger als 1.600 Zeichen ist, an dieser Länge abgeschnitten.
:::

Textnachrichten können auch automatisch aus einem Schritt eines [Workflows](../serving/workflows.md#sending-a-text) mit der Aktion **Textnachricht senden** versendet werden; sie verwendet denselben Anbieter und dieselben Platzhalter.

## Dateispeicher

Standardmäßig verwenden Dateien, die Sie auf Ihre Website hochladen (über [Dateien](../website/files.md)) und in anderen Inhaltsbereichen, den kostenlosen Hosting-Speicher von B1 mit bis zu 100 MB. Benötigen Sie mehr Platz, können Sie stattdessen Ihren eigenen Cloud-Speicher anbinden – neue Uploads gehen dann direkt in Ihr Konto, ohne Plattformlimit.

1. Klicken Sie auf der Seite Einstellungen in der Liste links auf **Dateispeicher** und dann im Abschnitt **Dateispeicher** auf **Bearbeiten**.
2. Wählen Sie einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2 usw.).
3. Bei Google Drive, Dropbox oder OneDrive klicken Sie auf **Verbinden** und melden sich an, um den Zugriff zu autorisieren. Bei einem S3-kompatiblen Bucket geben Sie Ihren Zugriffsschlüssel, das Geheimnis, den Bucket-Namen und die öffentliche Basis-URL ein.
4. Klicken Sie auf **Speichern**.

:::info
Dies betrifft nur neue Uploads in Ihre Website-Dateien und ähnliche Inhaltsbereiche. Galeriebilder, Vorschaubilder, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Beförderung der Klassenstufe

Wenn Sie die **Klasse** bei Kindern und Schülern erfassen, kann B1 alle an einem von Ihnen gewählten Datum (zum Beispiel 1. August) automatisch eine Klassenstufe höher setzen, statt dass Sie jedes Profil von Hand bearbeiten müssen.

1. Klicken Sie auf der Seite Einstellungen in der Liste links auf **Beförderung der Klassenstufe** und dann im Abschnitt **Beförderung der Klassenstufe** auf **Bearbeiten**.
2. Schalten Sie den Schalter ein (er zeigt **Aktiviert**) und wählen Sie jedes Jahr den **Monat** und den **Tag** der Beförderung. An diesem Datum rückt jeder mit einer Klasse eine Stufe auf, und Schüler der 12. Klasse werden **Abschlussjahrgang**.
3. Speichern Sie Ihre Änderungen.

Um die automatische Beförderung zu beenden, schalten Sie den Schalter aus, sodass er **Deaktiviert** anzeigt, und speichern Sie. Das Beförderungsdatum wird entfernt, und die Klassen ändern sich nicht mehr von selbst.

## Ehrenamtliche Anmeldung {#volunteer-signup}

Standardmäßig sehen Mitglieder, die [Anmeldungen für den Ehrenamtsdienst](../../b1-church/serving/volunteer-signup.md) durchsuchen, jede kommende Woche mit offenen Positionen. Ist diese Liste sehr lang, können Sie stattdessen nur die nächste Woche jedes Plantyps anzeigen.

1. Klicken Sie auf der Seite Einstellungen in der Liste links auf **Ehrenamtliche Anmeldung** und dann im Abschnitt **Ehrenamtliche Anmeldung** auf **Bearbeiten**.
2. Aktivieren Sie **Nur die nächste Woche jedes Plantyps anzeigen**.
3. Speichern Sie Ihre Änderungen.

Mit dieser Einstellung zeigt jeder Plantyp nur seinen nächsten kommenden Plan. Die folgende Woche erscheint, sobald dieses Datum vergangen ist. In der Zeile **Angezeigte Wochen** des Abschnitts steht entweder **Nur die nächste Woche jedes Plantyps** oder **Alle kommenden Wochen**.

## Datenschutz bei Spenden {#giving-privacy}

Personen mit Zugriff auf Spenden sehen normalerweise die Spendensummen einer Person in deren [Personendatensatz](../people/adding-people.md#editing-details). Möchten Sie nicht, dass die Beträge bei jedem Öffnen eines Datensatzes auf dem Bildschirm erscheinen, können Sie sie verbergen, bis jemand danach fragt.

1. Klicken Sie auf der Seite Einstellungen in der Liste links auf **Datenschutz bei Spenden** und dann im Abschnitt **Datenschutz bei Spenden** auf **Bearbeiten**.
2. Aktivieren Sie **Spenden auf Personendatensätzen verbergen, bis darauf geklickt wird**.
3. Speichern Sie Ihre Änderungen.

Mit dieser Einstellung sagt die Spendenkarte auf einem Personendatensatz „Spenden sind auf Personendatensätzen ausgeblendet.“ Klicken Sie auf **Spenden anzeigen**, um die Spenden dieser Person zu laden und anzuzeigen. Sie werden wieder ausgeblendet, sobald Sie einen anderen Datensatz öffnen. Wer Spenden sehen darf, ändert sich nicht: Nur Personen mit Zugriff auf Spenden sehen die Karte überhaupt.

## Import und Export

Der Link **Import/Export** unter dem Namen Ihrer Kirche auf der Seite Einstellungen öffnet ein eigenes Werkzeug in einem neuen Browserfenster. Damit können Sie:

- Mitgliederdaten aus einem anderen Verwaltungssystem für Kirchen importieren.
- Ihre ChurchApps-Daten für Sicherung oder Umzug exportieren.

Das ist besonders hilfreich, wenn Sie Ihre Kirche gerade einrichten und bestehende Datensätze in ChurchApps übernehmen müssen.

:::warning
Sichern Sie beim Importieren von Daten immer zuerst Ihre bestehenden Datensätze. Importvorgänge fügen Daten zu Ihrem System hinzu und können bei mehrfacher Ausführung doppelte Einträge erzeugen.
:::
