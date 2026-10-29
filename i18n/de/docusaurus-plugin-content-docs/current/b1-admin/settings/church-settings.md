---
title: "Kircheneinstellungen"
---

# Kircheneinstellungen

<div class="article-intro">

Auf der Seite Kircheneinstellungen konfigurieren Sie die Grundangaben, Kontaktdaten und das Erscheinungsbild Ihrer Kirche. Diese Angaben werden in allen ChurchApps-Werkzeugen verwendet, einschließlich Ihrer B1.church-Website und der App B1 Mobile.

</div>

## Schulungsvideo

<YouTube id="634zSbzDkYA" title="Kircheninformationen und Erscheinungsbild in B1 einrichten" next="Rollen, Berechtigungen und Einladen Ihres Teams in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung "Kircheneinstellungen bearbeiten". Wenn Sie keinen Zugriff haben, lesen Sie [Rollen & Berechtigungen](./roles-permissions.md).
- Halten Sie die Adresse, die Kontaktdaten und das Logo Ihrer Kirche bereit.

</div>

## Ihre Kircheninformationen bearbeiten

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
2. Klicken Sie im Abschnitt **Kircheninformationen** (oben auf der Seite) auf **Bearbeiten**.
3. Aktualisieren Sie eines der folgenden Felder:
   - **Kirchenname** -- Der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Adresse** -- Die physische Adresse Ihrer Kirche.
   - **Kontaktdaten** -- Telefonnummer, E-Mail-Adresse und weitere Kontaktangaben.
   - **Zeitzone** -- Die Zeitzone Ihrer Kirche. Siehe [Zeitzone](#time-zone) unten.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

## Ihre Subdomain einrichten

Ihre Kirche erhält eine kostenlose Subdomain unter **ihrekirche.1.church**. Unter dieser Webadresse finden Mitglieder und Besucher den Online-Auftritt Ihrer Kirche.

1. Klicken Sie auf der Seite Einstellungen im Abschnitt **Kircheninformationen** auf **Bearbeiten** und suchen Sie das Feld **Subdomain**.
2. Geben Sie Ihre gewünschte Subdomain ein (zum Beispiel "gnadenkirche" für gnadenkirche.1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss unter allen ChurchApps-Kirchen eindeutig sein. Ist Ihr Wunschname bereits vergeben, hängen Sie Ihre Stadt oder Ihr Bundesland an (zum Beispiel "gnadenkirche-dallas").
:::

Möchten Sie, dass Besucher Ihre Website unter einer eigenen Domain erreichen (zum Beispiel **`www.gnadenkirche.org`**), lesen Sie [Eigene Domain](./custom-domain.md).

## Das Erscheinungsbild konfigurieren

Passen Sie an, wie Ihre Kirche in allen ChurchApps-Werkzeugen erscheint:

1. Laden Sie Ihr **Kirchenlogo** hoch, indem Sie auf den Logobereich klicken und eine Bilddatei auswählen.
2. Fügen Sie optional weitere **Kirchenbilder** hinzu, die auf Ihrer Website und in der [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Am besten funktioniert ein Logo im PNG-Format mit transparentem Hintergrund. So sieht es sowohl auf hellen als auch auf dunklen Hintergründen gut aus.
:::

## Erster Tag der Woche

Legen Sie fest, mit welchem Tag Ihre Kalender beginnen. Das Auswahlfeld **Erster Tag der Woche** im Abschnitt Kircheninformationen ist standardmäßig auf **Sonntag** eingestellt, lässt sich aber auf jeden beliebigen Tag setzen. Nach einer Änderung wird sie in den Kalenderrastern von B1 Admin und im B1.church-Mitgliederbereich berücksichtigt. Gruppenkalender, kuratierte Kalender und der Termin-Editor zeigen Wochen dann alle mit dem gewählten Tag als Anfang.

## Zeitzone

Das Auswahlfeld **Zeitzone** im Abschnitt **Kircheninformationen** legt die Zeitzone Ihrer Kirche fest (zum Beispiel *America/Chicago*). Wählen Sie **Keine**, um das Feld leer zu lassen. Nach dem Speichern erscheint die Zone in der Übersicht der Kircheninformationen.

B1 verwendet diese Zeitzone für kirchenweite Zeitangaben, etwa Terminerinnerungen und die Zeitpläne auf Ihren FreePlay-Fernsehern. [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) werden zuerst in der Zeitzone des [Standorts](./campuses.md) des Gottesdienstes berechnet und nur dann mit der Zeitzone der Kirche, wenn der Standort keine hat. Liegen alle Ihre Standorte in einer Zeitzone, tragen Sie diese sowohl bei der Kirche als auch bei jedem Standort ein.

## Region (Datums- und Telefonformat)

Die Einstellung **Region** legt fest, wie Datums- und Zeitangaben in B1 geschrieben werden. Standardmäßig verwenden Daten das US-amerikanische Format (zum Beispiel "Sep 28, 2026" und "9/28/2026"). Kirchen außerhalb der USA können auf ihr eigenes Format umstellen -- wählen Sie etwa Englisch (Vereinigtes Königreich), erscheint stattdessen "28 Sept 2026" und "28/09/2026".

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Region** und dann im Abschnitt **Region** auf **Bearbeiten**.
2. Wählen Sie Ihre Region im Auswahlfeld **Region**. Jede Option zeigt ein Beispieldatum, damit Sie genau sehen, wie die Daten aussehen werden.
3. Klicken Sie auf **Speichern**.

Der Abschnitt Region zeigt danach Ihre gewählte Region, ein Beispiel des **Datumsformats** und Ihr Format für **Telefonnummern**.

### Format der Telefonnummern

Im selben Abschnitt Region finden Sie die Einstellung **Telefonnummern**, die festlegt, wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (mit Ländervorwahl)** -- der Standard. Telefonfelder zeigen eine Länderflaggen-Auswahl und speichern Nummern mit Ländervorwahl (zum Beispiel +1 918 555 1234).
- **Lokal (wie eingegeben)** -- Telefonfelder werden zu einfachen Textfeldern und speichern Nummern genau so, wie Sie sie eingeben, ohne Ländervorwahl (zum Beispiel 0701 234 5678). Wählen Sie dies, wenn Ihre Kirche Nummern in einem lokalen Format schreibt und B1 keine Ländervorwahl hinzufügen soll.

Ist **Lokal** ausgewählt, zeigt der Abschnitt Region neben Ihrer Region außerdem "Lokale Telefonnummern".

:::tip
SMS-Versand funktioniert am besten, wenn die Nummern eine Ländervorwahl enthalten. Wenn Sie SMS aus B1 versenden, behalten Sie das Format **International** bei oder achten Sie darauf, dass Nummern im Modus Lokal eine Ländervorwahl enthalten.
:::

Ihre Region gilt für Datums- und Zeitangaben in B1 Admin sowie auf Ihrer B1.church-Website und im Mitgliederbereich, einschließlich Predigten, Blogbeiträge, Gruppenkalender und Dienstpläne. So sehen Mitglieder Daten im selben Format wie Ihre Mitarbeitenden.

## SMS-Versand {#texting}

Verbinden Sie einen SMS-Anbieter, um aus B1 Admin SMS an eine Person oder eine ganze Gruppe zu senden. Die Nachrichten laufen über Ihr eigenes Konto beim Anbieter, daher gelten dessen Preise und Limits.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **SMS-Versand** und dann im Abschnitt **SMS-Versand** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**:
   - **Clearstream** -- geben Sie einen **API-Schlüssel** ein. Erstellen Sie ihn in Ihren Clearstream-Kontoeinstellungen unter API-Schlüssel.
   - **Text In Church** -- geben Sie einen **API-Schlüssel** ein. Bitten Sie zuerst den Support von Text In Church um Zugang zur Entwickler-API und erstellen Sie dann einen Schlüssel unter Kontoeinstellungen > Bereich Entwickler-API.
   - **Nalo Solutions** (Ghana) -- geben Sie den Authentifizierungsschlüssel aus Ihrem Nalo-Solutions-Konto als **API-Schlüssel** ein sowie eine **Absender-ID** (bis zu 11 Zeichen), die Nalo für Sie freigegeben hat.
   - **Twilio** -- verwenden Sie das eigene Twilio-Konto Ihrer Kirche; Twilio rechnet direkt mit Ihnen ab. Kopieren Sie **Account SID** und **Auth Token** aus der [Twilio-Konsole](https://console.twilio.com) und geben Sie eine **Absendernummer** ein -- eine Twilio-Telefonnummer, die für A2P 10DLC registriert ist, im Format `+15551234567`. Fügen Sie nach dem Speichern die eingehende Webhook-URL (siehe unten) bei der Nummer unter **Eine Nachricht kommt an** in Twilio ein, damit STOP-Antworten auch in B1 erfasst werden.
3. Klicken Sie auf **Speichern**.

Um den SMS-Versand zu beenden, setzen Sie **Anbieter** auf **Keiner** und speichern Sie. Dadurch wird der gespeicherte Anbieter entfernt.

### Personen abmelden, die mit STOP antworten

Ist ein Anbieter gespeichert, öffnen Sie den Bereich SMS-Versand erneut über **Bearbeiten**. Unterhalb der Anbietereinstellungen zeigt ein schreibgeschütztes Feld **Eingehende (STOP-)Webhook-URL** eine Webadresse, die nur für Ihre Kirche gilt. Klicken Sie auf das Feld, um die Adresse auszuwählen, zu kopieren und in der Einstellung für eingehende Nachrichten (Antwort-Webhook) Ihres SMS-Anbieters einzufügen. Dies funktioniert mit allen oben genannten Anbietern, die eingehende Antworten an einen Webhook weiterleiten können.

Antwortet danach jemand auf eine Ihrer Nachrichten mit **STOP** (oder STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT oder REVOKE), sucht B1 alle Personen mit passender Mobilnummer, markiert sie als abgemeldet und schaltet ihre SMS-Erinnerungen ab. Sie werden danach bei Gruppen-SMS übersprungen. Andere Antworten werden ignoriert.

:::info
Dies nutzt dieselbe Abmeldeeinstellung wie **Mich aus dem Mitgliederverzeichnis ausblenden**. Personen, die mit STOP antworten, werden in ihrem Profil daher ebenfalls als **Aus dem Verzeichnis ausgeblendet** angezeigt. Das Feld erscheint nur, während der gespeicherte Anbieter ausgewählt ist -- wechseln Sie das Auswahlfeld zu einem anderen Anbieter, speichern Sie zuerst, um die URL wieder zu sehen.
:::

Sobald ein Anbieter verbunden ist, sehen Mitarbeitende mit der Berechtigung, SMS zu senden, auf der Seite einer Gruppe eine Schaltfläche **SMS** (**Diese Gruppe per SMS erreichen**) und auf der Seite einer Person mit Mobilnummer die Schaltfläche **SMS-Nachricht senden**. Geben Sie Ihre Nachricht ein und klicken Sie auf **Senden**. Der Dialog zählt Zeichen und SMS-Segmente. Bei einer Gruppe zeigt er vor dem Senden an, wie viele Mitglieder die SMS erhalten werden:

- Mitglieder ohne hinterlegte Mobilnummer werden übersprungen.
- Mitglieder, die **Mich aus dem Mitgliederverzeichnis ausblenden** gewählt haben, zählen als abgemeldet und werden übersprungen.
- Familienmitglieder, die sich eine Mobilnummer teilen, erhalten die SMS nur einmal.

### Nachrichten mit Platzhaltern personalisieren {#personalizing-texts-with-merge-fields}

Unterhalb des Nachrichtenfeldes zeigt der Dialog SMS Platzhalter-Chips: **Vorname**, **Nachname**, **Anzeigename** und **Kirchenname**. Klicken Sie auf einen Chip, um seinen Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an der Cursorposition einzufügen. Beim Versand wird jeder Platzhalter durch die Angaben des jeweiligen Empfängers ersetzt. Eine Gruppen-SMS wie `Hallo {{firstName}}, bis Sonntag!` erreicht daher jedes Mitglied mit seinem eigenen Namen. Platzhalter funktionieren sowohl bei Gruppen-SMS als auch bei SMS an einzelne Personen. Bei SMS an eine Gruppe steht zusätzlich ein Chip **Gruppenname** (`{{groupName}}`) zur Verfügung, der durch den Namen der Gruppe ersetzt wird.

Um eine Nachricht wiederzuverwenden, speichern Sie sie als [SMS-Vorlage](./email-templates.md#text-templates) (eine E-Mail-Vorlage mit der Kategorie **SMS**) und wählen Sie sie im Fenster SMS oben unter **Vorlage laden (optional)** aus.

:::info
Die Grenze von 1.600 Zeichen gilt für die Nachricht, so wie Sie sie eingeben. Nachdem die Platzhalter ersetzt wurden, wird ein Text, der länger als 1.600 Zeichen ist, auf diese Länge gekürzt.
:::

SMS können auch automatisch aus einem Schritt eines [Workflows](../serving/workflows.md#sending-a-text) mit der Aktion **SMS senden** versendet werden. Sie nutzt denselben Anbieter und dieselben Platzhalter.

## Dateispeicher

Standardmäßig nutzen Dateien, die Sie auf Ihre Website hochladen (über [Dateien](../website/files.md)), und andere Inhaltsbereiche den kostenlosen gehosteten Speicher von B1, bis zu 100 MB. Benötigen Sie mehr Platz, können Sie stattdessen Ihren eigenen Cloud-Speicher anbinden -- neue Uploads landen dann direkt in Ihrem Konto, ohne Begrenzung durch die Plattform.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Dateispeicher** und dann im Abschnitt **Dateispeicher** auf **Bearbeiten**.
2. Wählen Sie einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2 usw.).
3. Bei Google Drive, Dropbox oder OneDrive klicken Sie auf **Verbinden** und melden sich an, um den Zugriff zu autorisieren. Bei einem S3-kompatiblen Bucket geben Sie Ihren Zugriffsschlüssel, das Geheimnis, den Bucketnamen und die öffentliche Basis-URL ein.
4. Klicken Sie auf **Speichern**.

:::info
Dies betrifft nur neue Uploads auf die Dateien Ihrer Website und ähnliche Inhaltsbereiche. Galeriebilder, Vorschaubilder, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Beförderung der Klassenstufe

Erfassen Sie bei Kindern und Schülern die **Klassenstufe**, kann B1 alle an einem von Ihnen gewählten Datum (zum Beispiel 1. August) automatisch eine Stufe höher setzen, statt dass Sie jedes Profil von Hand bearbeiten müssen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Beförderung der Klassenstufe** und dann im Abschnitt **Beförderung der Klassenstufe** auf **Bearbeiten**.
2. Schalten Sie den Schalter ein (er zeigt **Aktiviert**) und wählen Sie jedes Jahr den **Monat** und den **Tag**, an dem die Klassenstufen befördert werden. An diesem Datum rückt jeder mit einer Klassenstufe eine Stufe auf, und Zwölftklässler werden zu **Abgeschlossen**.
3. Speichern Sie Ihre Änderungen.

Um die automatische Beförderung zu beenden, schalten Sie den Schalter aus, sodass er **Deaktiviert** anzeigt, und speichern Sie. Das Beförderungsdatum wird entfernt, und die Klassenstufen ändern sich nicht mehr von selbst.

## Freiwilligen-Anmeldung {#volunteer-signup}

Standardmäßig sehen Mitglieder, die die [Freiwilligen-Anmeldungen](../../b1-church/serving/volunteer-signup.md) durchsuchen, jede kommende Woche mit offenen Positionen. Wird diese Liste lang, können Sie stattdessen nur die nächste Woche jedes Plantyps anzeigen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Freiwilligen-Anmeldung** und dann im Abschnitt **Freiwilligen-Anmeldung** auf **Bearbeiten**.
2. Aktivieren Sie **Nur die nächste Woche jedes Plantyps anzeigen**.
3. Speichern Sie Ihre Änderungen.

Ist dies aktiv, zeigt jeder Plantyp nur seinen nächsten bevorstehenden Plan. Die folgende Woche erscheint, sobald dieses Datum vorüber ist. Die Zeile **Angezeigte Wochen** im Abschnitt zeigt **Nur die nächste Woche jedes Plantyps** oder **Alle kommenden Wochen**.

## Datenschutz bei Spenden {#giving-privacy}

Personen mit Zugriff auf Spenden sehen normalerweise die Spendensummen einer Person in deren [Personendatensatz](../people/adding-people.md#editing-details). Möchten Sie nicht, dass die Beträge jedes Mal auf dem Bildschirm stehen, wenn ein Datensatz geöffnet wird, können Sie sie ausblenden, bis jemand danach fragt.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Datenschutz bei Spenden** und dann im Abschnitt **Datenschutz bei Spenden** auf **Bearbeiten**.
2. Aktivieren Sie **Spenden in Personendatensätzen ausblenden, bis angeklickt**.
3. Speichern Sie Ihre Änderungen.

Ist dies aktiv, steht auf der Spendenkarte im Personendatensatz "Spenden sind in Personendatensätzen ausgeblendet." Klicken Sie auf **Spenden anzeigen**, um die Spenden dieser Person zu laden und anzuzeigen. Beim Öffnen einer anderen Person werden sie wieder ausgeblendet. Wer Spenden einsehen kann, ändert sich nicht: Nur Personen mit Zugriff auf Spenden sehen die Karte überhaupt.

## Import und Export

Der Link **Import/Export** unter dem Namen Ihrer Kirche auf der Seite Einstellungen öffnet ein eigenes Werkzeug in einem neuen Browserfenster. Damit können Sie:

- Mitgliederdaten aus einem anderen Kirchenverwaltungssystem importieren.
- Ihre ChurchApps-Daten für Sicherungs- oder Migrationszwecke exportieren.

Das ist besonders hilfreich, wenn Sie Ihre Kirche gerade einrichten und bestehende Datensätze in ChurchApps übernehmen müssen.

:::warning
Sichern Sie beim Import von Daten immer zuerst Ihre bestehenden Datensätze. Importvorgänge fügen Daten zu Ihrem System hinzu und können bei mehrfacher Ausführung doppelte Einträge erzeugen.
:::
