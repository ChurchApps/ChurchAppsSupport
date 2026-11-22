---
title: "Kircheneinstellungen"
description: "Legen Sie Name, Adresse, Subdomain, Zeitzone, Regionsformat, SMS-Anbieter und Dateispeicher Ihrer Gemeinde auf der Seite Kircheneinstellungen in B1 Admin fest."
---

# Kircheneinstellungen

<div class="article-intro">

Auf der Seite Kircheneinstellungen konfigurieren Sie die Grundinformationen, Kontaktdaten und das Erscheinungsbild Ihrer Gemeinde. Diese Angaben werden in allen ChurchApps-Werkzeugen verwendet, einschließlich Ihrer B1.church-Website und der B1-App.

</div>

## Schulungsvideo {#training-video}

<YouTube id="634zSbzDkYA" title="Einrichten von Gemeindeinformationen und Erscheinungsbild in B1" next="Rollen, Berechtigungen und das Einladen Ihres Teams in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](./roles-permissions.md).
- Halten Sie die Adresse, Kontaktdaten und das Logo Ihrer Gemeinde bereit

</div>

## Ihre Gemeindeinformationen bearbeiten {#editing-your-church-information}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
2. Klicken Sie im Abschnitt **Gemeindeinformationen** (oben auf der Seite) auf **Bearbeiten**.
3. Aktualisieren Sie eines der folgenden Felder:
   - **Name der Gemeinde** *(erforderlich)* -- Der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Subdomain** *(erforderlich)* -- Ihre kostenlose B1-Webadresse. Siehe unten [Ihre Subdomain einrichten](#setting-up-your-subdomain).
   - **Adresszeile 1**, **Adresszeile 2**, **Ort**, **Bundesland**, **Postleitzahl** und **Land** -- Die physische Adresse Ihrer Gemeinde.
   - **Erster Tag der Woche** -- Siehe unten [Erster Tag der Woche](#first-day-of-week).
   - **Zeitzone** -- Die Zeitzone Ihrer Gemeinde. Siehe unten [Zeitzone](#time-zone).
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen, oder auf **Abbrechen**, um sie zu verwerfen.

Name, Subdomain und Adresse der Gemeinde werden außerdem im Bereich oben links auf der Seite Einstellungen angezeigt.

## Ihre Subdomain einrichten {#setting-up-your-subdomain}

Ihre Gemeinde erhält eine kostenlose Subdomain unter **yourchurch.b1.church**. Dies ist die Webadresse, unter der Mitglieder und Gäste den Online-Auftritt Ihrer Gemeinde erreichen.

1. Klicken Sie auf der Seite Einstellungen im Abschnitt **Gemeindeinformationen** auf **Bearbeiten** und suchen Sie das Feld **Subdomain**.
2. Geben Sie Ihre gewünschte Subdomain ein (zum Beispiel „gracechurch“ für gracechurch.b1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss unter allen ChurchApps-Gemeinden eindeutig sein. Ist Ihr Wunschname bereits vergeben, versuchen Sie, Ihre Stadt oder Ihr Bundesland anzuhängen (zum Beispiel „gracechurch-dallas“).
:::

Möchten Sie, dass Besucher Ihre Seite unter einer eigenen Domain erreichen (zum Beispiel **`www.gracechurch.org`**), lesen Sie [Eigene Domain](./custom-domain.md).

## Erscheinungsbild konfigurieren {#configuring-branding}

Logo und Farben werden nicht auf der Seite Einstellungen festgelegt. Laden Sie das Logo Ihrer Gemeinde hoch und wählen Sie Ihre Farben unter **Website > Erscheinungsbild** – siehe [Logo und Markenauftritt](../website/appearance.md#logo-and-branding). Die Farben der B1-App, des Mitgliederportals und des Check-in-Terminals legen Sie unter **Mobil > App-Design** fest – siehe [App-Design](./mobile-app.md#app-theme).

## Allgemein (Support-Kontakt) {#general-support-contact}

Der Bereich **Allgemein** enthält Ihren **Support-Kontakt**: die E-Mail-Adresse oder den Link zu einem Kontaktformular, über den Menschen Ihre Gemeinde erreichen. Klicken Sie im Bereich **Allgemein** auf **Bearbeiten**, tragen Sie die Angabe im Feld **Link** ein und klicken Sie auf **Speichern**. Solange Sie keinen Kontakt festlegen, zeigt der Bereich **Nicht festgelegt**.

## Erster Tag der Woche {#first-day-of-week}

Wählen Sie, mit welchem Tag Ihre Kalender beginnen. Das Auswahlfeld **Erster Tag der Woche** im Bereich Gemeindeinformationen steht standardmäßig auf **Sonntag**, lässt sich aber auf jeden beliebigen Tag einstellen. Nach einer Änderung wird sie in den Kalenderansichten von B1 Admin und im B1.church-Mitgliederportal berücksichtigt – die Gruppenkalender, kuratierten Kalender und der Veranstaltungseditor zeigen Wochen ab dem von Ihnen gewählten Tag an.

## Zeitzone {#time-zone}

Das Auswahlfeld **Zeitzone** im Bereich **Gemeindeinformationen** legt die Zeitzone Ihrer Gemeinde fest (zum Beispiel *America/Chicago*). Wählen Sie **Keine**, um das Feld leer zu lassen. Nach dem Speichern erscheint die Zeitzone in der Zusammenfassung der Gemeindeinformationen.

B1 verwendet diese Zeitzone für gemeindeweite Zeitangaben, etwa Veranstaltungserinnerungen und die Pläne auf Ihren [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-Fernsehern. [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) werden zuerst nach der Zeitzone des [Standorts](./campuses.md) des Gottesdienstes berechnet und nur dann nach der Zeitzone der Gemeinde, wenn dem Standort keine zugewiesen ist. Liegen alle Ihre Standorte in einer Zeitzone, legen Sie sie sowohl für die Gemeinde als auch für jeden Standort fest.

## Region (Datums- und Telefonformat) {#region-date-and-phone-format}

Die Einstellung **Region** legt fest, wie Datums- und Zeitangaben in ganz B1 geschrieben werden. Standardmäßig verwenden Daten das US-amerikanische Format (zum Beispiel „Sep 28, 2026“ und „9/28/2026“). Gemeinden außerhalb der USA können auf ihr eigenes Format umstellen – wählen Sie zum Beispiel Englisch (Vereinigtes Königreich), erscheinen stattdessen „28 Sept 2026“ und „28/09/2026“.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Region** und dann im Abschnitt **Region** auf **Bearbeiten**.
2. Wählen Sie Ihre Region im Auswahlfeld **Region**. Jede Option zeigt ein Beispieldatum, damit Sie genau sehen, wie Daten aussehen werden.
3. Klicken Sie auf **Speichern**.

Der Abschnitt Region zeigt danach Ihre gewählte Region, ein Beispiel für das **Datumsformat** und Ihr Format für **Telefonnummern**.

### Format der Telefonnummern {#phone-number-format}

Im selben Abschnitt Region steht die Einstellung **Telefonnummern**, die festlegt, wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (mit Ländervorwahl)** -- der Standard. Telefonfelder zeigen eine Auswahl mit Länderflagge, und Nummern werden mit der Ländervorwahl gespeichert (zum Beispiel +1 918 555 1234).
- **Lokal (wie eingegeben)** -- Telefonfelder werden zu einfachen Textfeldern und speichern Nummern genau so, wie Sie sie eingeben, ohne Ländervorwahl (zum Beispiel 0701 234 5678). Wählen Sie dies, wenn Ihre Gemeinde Nummern in einem lokalen Format schreibt und B1 keine Ländervorwahl hinzufügen soll.

Ist **Lokal** ausgewählt, zeigt der Abschnitt Region neben Ihrer Region außerdem „Lokale Telefonnummern“ an.

:::tip
Der SMS-Versand funktioniert am besten, wenn Nummern die Ländervorwahl enthalten. Wenn Sie über B1 SMS senden, behalten Sie das Format **International** bei oder achten Sie im Modus Lokal darauf, dass die eingegebenen Nummern die Ländervorwahl enthalten.
:::

Ihre Region gilt für Datums- und Zeitangaben in ganz B1 Admin sowie auf Ihrer B1.church-Website und im Mitgliederportal, einschließlich Predigten, Blogbeiträgen, Gruppenkalendern und Dienstplänen. So sehen Mitglieder Daten im selben Format wie Ihre Mitarbeitenden.

### Gottesdiensttag {#worship-day}

Im Abschnitt Region gibt es außerdem die Einstellung **Gottesdiensttag** für den Tag, an dem Ihr Hauptgottesdienst stattfindet. Sie steht auf **Sonntag**, solange Sie sie nicht ändern. Gemeinden, die am Samstag (oder an einem anderen Tag) Gottesdienst feiern, können diesen Tag wählen. Das Dashboard richtet sich dann danach: Die Hauptüberschrift lautet „Diesen Samstag“, die Seitenbereiche zeigen „Dienst am Samstag“ und „Letzter Samstag“, das angezeigte Gottesdienstdatum ist der kommende Samstag, und die Live-Anzeige „im Raum“ leuchtet bei Check-ins am Samstag auf.

Wenn der Gottesdiensttag nicht Sonntag ist, zeigt auch der Eintrag Region in der linken Liste den Tag neben Ihrer Region an.

## SMS-Versand {#texting}

Verbinden Sie einen SMS-Anbieter, um aus B1 Admin SMS an eine Person oder eine ganze Gruppe zu senden. Die Nachrichten werden über Ihr eigenes Konto beim Anbieter verschickt, daher gelten dessen Preise und Limits.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **SMS-Versand** und dann im Abschnitt **SMS-Versand** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**:
   - **Clearstream** -- geben Sie einen **API-Schlüssel** ein. Erstellen Sie einen solchen in Ihren Clearstream-Kontoeinstellungen unter API-Schlüssel.
   - **Text In Church** -- geben Sie einen **API-Schlüssel** ein. Bitten Sie zuerst den Support von Text In Church um den Entwicklerzugang zur API und erstellen Sie dann einen Schlüssel im Bereich Kontoeinstellungen > Entwickler-API.
   - **Nalo Solutions** (Ghana) -- geben Sie den Authentifizierungsschlüssel aus Ihrem Nalo-Solutions-Konto als **API-Schlüssel** ein sowie eine **Absender-ID** (bis zu 11 Zeichen), die Nalo für Sie freigegeben hat.
   - **Twilio** -- verwenden Sie das eigene Twilio-Konto Ihrer Gemeinde; Twilio rechnet direkt mit Ihnen ab. Kopieren Sie **Account SID** und **Auth Token** aus der [Twilio Console](https://console.twilio.com) und tragen Sie eine **Absendernummer** ein – eine Twilio-Telefonnummer, die für A2P 10DLC registriert ist, im Format wie `+15551234567`. Fügen Sie nach dem Speichern die eingehende Webhook-URL (siehe unten) in das Feld „A message comes in“ der Nummer in Twilio ein, damit STOP-Antworten auch in B1 erfasst werden.
3. Klicken Sie auf **Speichern**.

Um den SMS-Versand zu beenden, setzen Sie **Anbieter** auf **Keine** und speichern Sie. Dadurch wird der gespeicherte Anbieter entfernt.

### Personen abmelden, die mit STOP antworten {#opting-out-people-who-reply-stop}

Ist ein Anbieter gespeichert, öffnen Sie den Bereich SMS-Versand erneut mit **Bearbeiten**. Unter den Anbietereinstellungen zeigt ein nur lesbares Feld **Eingehende (STOP-)Webhook-URL** eine Webadresse, die nur Ihrer Gemeinde gehört. Klicken Sie in das Feld, um die Adresse auszuwählen, kopieren Sie sie und fügen Sie sie in die Einstellung für eingehende Nachrichten (Antworten) Ihres SMS-Anbieters für Webhooks ein. Dies funktioniert mit allen oben genannten Anbietern, die eingehende Antworten an einen Webhook weiterleiten können.

Antwortet danach jemand auf eine Ihrer Nachrichten mit **STOP** (oder STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT oder REVOKE), sucht B1 alle Personen mit passender Mobilnummer, markiert sie als abgemeldet und schaltet ihre SMS-Erinnerungen aus. Bei Gruppen-SMS werden sie anschließend übersprungen. Andere Antworten werden ignoriert.

:::info
Dies nutzt dieselbe Abmeldeeinstellung wie **Mich aus dem Mitgliederverzeichnis ausblenden**. Personen, die mit STOP antworten, werden daher auch in ihrem Profil als **Im Verzeichnis ausgeblendet** angezeigt. Das Feld erscheint nur, wenn der gespeicherte Anbieter ausgewählt ist – wechseln Sie das Auswahlfeld zu einem anderen Anbieter, speichern Sie zuerst, um die URL wieder zu sehen.
:::

Sobald ein Anbieter verbunden ist, sehen Mitarbeitende mit der Berechtigung zum Senden von SMS auf der Seite einer Gruppe die Schaltfläche **Text** (**Dieser Gruppe eine SMS senden**) und auf der Seite einer Person mit Mobilnummer die Schaltfläche **SMS senden**. Geben Sie Ihre Nachricht ein und klicken Sie auf **Senden**. Das Dialogfeld zählt die Zeichen und SMS-Segmente. Bei einer Gruppe zeigt es vor dem Senden an, wie viele Mitglieder die SMS erhalten werden:

- Mitglieder ohne hinterlegte Mobilnummer werden übersprungen.
- Mitglieder, die **Mich aus dem Mitgliederverzeichnis ausblenden** gewählt haben, gelten als abgemeldet und werden übersprungen.
- Familienmitglieder, die sich eine Mobilnummer teilen, erhalten die SMS nur einmal.

### Nachrichten mit Platzhaltern personalisieren {#personalizing-texts-with-merge-fields}

Unter dem Nachrichtenfeld zeigt das Dialogfeld SMS Platzhalter-Chips: **Vorname**, **Nachname**, **Anzeigename** und **Gemeindename**. Klicken Sie auf einen Chip, um seinen Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an der Cursorposition einzufügen. Beim Versand wird jeder Platzhalter durch die Angaben des jeweiligen Empfängers ersetzt. So erreicht eine Gruppen-SMS wie `Hi {{firstName}}, see you Sunday!` jedes Mitglied mit seinem eigenen Namen. Platzhalter funktionieren sowohl bei Gruppen-SMS als auch bei SMS an eine einzelne Person. Bei SMS an eine Gruppe steht außerdem ein Chip **Gruppenname** (`{{groupName}}`) zur Verfügung, der durch den Namen der Gruppe ersetzt wird.

Um eine Nachricht wiederzuverwenden, speichern Sie sie als [SMS-Vorlage](./email-templates.md#text-templates) (eine E-Mail-Vorlage in der Kategorie **SMS**) und wählen Sie sie unter **Vorlage laden (optional)** oben im SMS-Fenster aus.

:::info
Das Limit von 1.600 Zeichen gilt für die Nachricht, wie Sie sie eingeben. Nachdem die Platzhalter gefüllt sind, wird jeder Text, der länger als 1.600 Zeichen ist, an dieser Länge abgeschnitten.
:::

SMS können auch automatisch aus einem Schritt eines [Workflows](../serving/workflows.md#sending-a-text) mit der Aktion **SMS senden** versandt werden. Diese nutzt denselben Anbieter und dieselben Platzhalter.

## Dateispeicher {#file-storage}

Standardmäßig verwenden Dateien, die Sie auf Ihre Website hochladen (über [Dateien](../website/files.md)) und in anderen Inhaltsbereichen, den kostenlosen gehosteten Speicher von B1 mit bis zu 100 MB. Benötigen Sie mehr Platz, können Sie stattdessen Ihren eigenen Cloud-Speicher verbinden – neue Uploads gehen dann direkt in Ihr Konto, ohne Begrenzung durch die Plattform.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Dateispeicher** und dann im Abschnitt **Dateispeicher** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**: **Google Drive**, **Dropbox** oder **S3-kompatibler Bucket (S3, R2, B2)** (AWS S3, Cloudflare R2, Backblaze B2 usw.). **ChurchApps (kostenlos)** ist der eingebaute Speicher.
3. Bei Google Drive oder Dropbox klicken Sie auf **Konto verbinden** und melden sich an, um den Zugriff zu autorisieren. Nach erfolgreicher Verbindung erscheint das Abzeichen **Konto verbunden**; Sie müssen verbinden, bevor Sie speichern können. Bei einem S3-kompatiblen Bucket tragen Sie die **Access Key Id**, den **Secret Access Key**, den **Bucket**, den **Endpoint** (für AWS leer lassen), die **Region** und die **Basis-URL für öffentlichen Zugriff** ein. **Bucket** und **Basis-URL für öffentlichen Zugriff** sind erforderlich; der Bucket muss öffentliches Lesen und CORS-Uploads von B1 erlauben.
4. Klicken Sie auf **Speichern**.

Um zum kostenlosen Speicher zurückzukehren, wählen Sie **ChurchApps (kostenlos)** und speichern Sie. Bereits hochgeladene Dateien bleiben, wo sie sind.

:::info
Dies betrifft nur neue Uploads in den Dateien Ihrer Website und ähnlichen Inhaltsbereichen. Galeriebilder, Vorschaubilder, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Spenden {#giving}

Der Bereich **Spenden** verbindet Ihren Zahlungsanbieter und legt die Währung Ihrer Gemeinde für Online-Spenden und kostenpflichtige Anmeldungen fest. Siehe [Einrichtung der Online-Spenden](../donations/online-giving-setup.md). Er erscheint nur für Personen, die Spendeneinstellungen bearbeiten dürfen.

## Check-in {#check-in}

Der Bereich **Check-in** legt die **Durchsetzung des Betreuungsschlüssels** fest – ob der Check-in bei Personalmangel in einem Raum nur warnt (**Warnen (mit Bestätigung zulassen)**) oder einen Check-in blockiert (**Blockieren (Check-in verhindern)**). Siehe [Betreuungsschlüssel](../attendance/checkin-safety.md#volunteer-ratios). Der Link **Check-in-Terminal, QR und Etiketten** darunter öffnet die Terminal-Einstellungen auf der Seite Mobil.

## Klassenstufen-Übergang {#grade-promotion}

Wenn Sie die **Klassenstufe** bei Kindern und Jugendlichen erfassen, kann B1 alle an einem Stichtag, den Sie wählen (zum Beispiel 1. August), automatisch um eine Klassenstufe anheben. Sie müssen dafür nicht jedes Profil von Hand bearbeiten.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Klassenstufen-Übergang** und dann im Abschnitt **Klassenstufen-Übergang** auf **Bearbeiten**.
2. Schalten Sie den Schalter ein (er zeigt **Aktiviert**) und wählen Sie den **Monat** und den **Tag**, an denen die Klassenstufen jedes Jahr angehoben werden. An diesem Tag steigt jede Person mit einer Klassenstufe um eine Stufe auf, und Schüler der 12. Klasse werden **Abgeschlossen**.
3. Speichern Sie Ihre Änderungen.

Um den automatischen Übergang zu beenden, schalten Sie den Schalter aus, sodass er **Deaktiviert** zeigt, und speichern Sie. Das Datum des Übergangs wird entfernt, und Klassenstufen ändern sich nicht mehr von selbst.

## Freiwilligenanmeldung {#volunteer-signup}

Standardmäßig sehen Mitglieder, die [Freiwilligenanmeldungen](../../b1-church/serving/volunteer-signup.md) durchsehen, jede kommende Woche mit offenen Positionen. Ist diese Liste lang, können Sie stattdessen nur die nächste Woche jeder Planart anzeigen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Freiwilligenanmeldung** und dann im Abschnitt **Freiwilligenanmeldung** auf **Bearbeiten**.
2. Aktivieren Sie **Nur die nächste Woche jeder Planart anzeigen**.
3. Speichern Sie Ihre Änderungen.

Ist dies aktiv, zeigt jede Planart nur ihren nächsten kommenden Plan. Die folgende Woche erscheint, sobald dieses Datum vorbei ist. Die Zeile **Angezeigte Wochen** im Abschnitt zeigt **Nur die nächste Woche jeder Planart** oder **Alle kommenden Wochen**.

## Datenschutz bei Spenden {#giving-privacy}

Personen mit Zugriff auf Spenden sehen normalerweise die Spendensummen einer Person in deren [Personendatensatz](../people/adding-people.md#editing-details). Möchten Sie nicht, dass die Beträge bei jedem Öffnen eines Datensatzes auf dem Bildschirm erscheinen, können Sie sie ausblenden, bis jemand sie anfordert.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Datenschutz bei Spenden** und dann im Abschnitt **Datenschutz bei Spenden** auf **Bearbeiten**.
2. Aktivieren Sie **Spenden in Personendatensätzen ausblenden, bis angeklickt**.
3. Speichern Sie Ihre Änderungen.

Ist dies aktiv, zeigt die Spendenkarte im Personendatensatz den Text „Spenden sind in Personendatensätzen ausgeblendet.“ Klicken Sie auf **Spenden anzeigen**, um die Spenden dieser Person zu laden und anzuzeigen. Beim Öffnen einer anderen Person werden sie wieder ausgeblendet. Wer Spenden sehen darf, ändert sich nicht: Nur Personen mit Zugriff auf Spenden sehen die Karte überhaupt.

## Import und Export {#import-and-export}

Der Link **Import/Export** unter dem Namen Ihrer Gemeinde auf der Seite Einstellungen öffnet ein eigenes Werkzeug in einem neuen Browserfenster. Damit können Sie:

- Mitgliederdaten aus einem anderen Gemeindeverwaltungssystem importieren.
- Ihre ChurchApps-Daten für Sicherungen oder eine Migration exportieren.

Das ist besonders hilfreich, wenn Sie Ihre Gemeinde erstmals einrichten und bestehende Datensätze in ChurchApps übertragen müssen.

:::warning
Sichern Sie beim Importieren von Daten zuerst Ihre bestehenden Datensätze. Importvorgänge fügen Daten zu Ihrem System hinzu und können bei mehrfacher Ausführung doppelte Einträge erzeugen.
:::
