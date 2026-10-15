---
title: "Gemeindeeinstellungen"
---

# Gemeindeeinstellungen

<div class="article-intro">

Auf der Seite Gemeindeeinstellungen konfigurieren Sie die Grundangaben Ihrer Gemeinde, Kontaktdaten und das Erscheinungsbild. Diese Angaben werden in allen ChurchApps-Werkzeugen verwendet, einschließlich Ihrer B1.church-Website und der B1-Mobile-App.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Gemeindeeinstellungen bearbeiten“. Wenn Sie keinen Zugriff haben, lesen Sie [Rollen & Berechtigungen](./roles-permissions.md).
- Halten Sie die Anschrift, die Kontaktdaten und das Logo Ihrer Gemeinde bereit

</div>

## Gemeindeangaben bearbeiten

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
2. Klicken Sie im Abschnitt **Gemeindeangaben** (oben auf der Seite) auf **Bearbeiten**.
3. Aktualisieren Sie eines der folgenden Felder:
   - **Name der Gemeinde** -- Der Name, der in allen ChurchApps-Produkten angezeigt wird.
   - **Anschrift** -- Die physische Anschrift Ihrer Gemeinde.
   - **Kontaktangaben** -- Telefonnummer, E-Mail-Adresse und weitere Kontaktdaten.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

## Ihre Subdomain einrichten

Ihre Gemeinde erhält kostenlos eine Subdomain unter **ihregemeinde.1.church**. Unter dieser Webadresse können Mitglieder und Besucher den Online-Auftritt Ihrer Gemeinde aufrufen.

1. Klicken Sie auf der Seite Einstellungen im Abschnitt **Gemeindeangaben** auf **Bearbeiten** und suchen Sie das Feld **Subdomain**.
2. Geben Sie Ihre gewünschte Subdomain ein (zum Beispiel „gracechurch“ für gracechurch.1.church).
3. Speichern Sie Ihre Änderungen.

:::info
Ihre Subdomain muss in allen ChurchApps-Gemeinden eindeutig sein. Ist Ihr Wunschname bereits vergeben, fügen Sie etwa Ihre Stadt oder Ihr Bundesland hinzu (zum Beispiel „gracechurch-dallas“).
:::

Wenn Besucher Ihre Website unter einer eigenen Domain erreichen sollen (zum Beispiel **www.gracechurch.org**), lesen Sie [Eigene Domain](./custom-domain.md).

## Erscheinungsbild anpassen

Passen Sie an, wie Ihre Gemeinde in allen ChurchApps-Werkzeugen erscheint:

1. Laden Sie Ihr **Gemeindelogo** hoch, indem Sie auf den Logobereich klicken und eine Bilddatei auswählen.
2. Fügen Sie weitere **Gemeindebilder** hinzu, die auf Ihrer Website und in der [mobilen App](./mobile-app.md) verwendet werden.

:::tip
Für die besten Ergebnisse verwenden Sie ein Logo im PNG-Format mit transparentem Hintergrund. So wirkt es sowohl auf hellen als auch auf dunklen Hintergründen gut.
:::

## Erster Tag der Woche

Legen Sie fest, mit welchem Tag Ihre Kalender beginnen. Das Dropdown-Menü **Erster Tag der Woche** im Bereich Gemeindeangaben steht standardmäßig auf **Sonntag**, lässt sich aber auf jeden beliebigen Tag einstellen. Nach einer Änderung wird sie in den Kalenderansichten von B1 Admin und im Mitgliederportal von B1.church berücksichtigt. Gruppenkalender, kuratierte Kalender und der Veranstaltungseditor beginnen die Wochen alle mit dem von Ihnen gewählten Tag.

## Region (Datums- und Telefonformat)

Die Einstellung **Region** bestimmt, wie Datum und Uhrzeit in B1 geschrieben werden. Standardmäßig werden Daten im US-amerikanischen Format angezeigt (zum Beispiel „Sep 28, 2026“ und „9/28/2026“). Gemeinden außerhalb der USA können auf ihr eigenes Format umstellen. Wählen Sie zum Beispiel Englisch (Vereinigtes Königreich), erscheinen stattdessen „28 Sept 2026“ und „28/09/2026“.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Region** und dann im Abschnitt **Region** auf **Bearbeiten**.
2. Wählen Sie Ihre Region im Dropdown-Menü **Region**. Jede Option zeigt ein Beispieldatum, damit Sie genau sehen, wie Daten dargestellt werden.
3. Klicken Sie auf **Speichern**.

Der Abschnitt Region zeigt danach Ihre gewählte Region, ein Beispiel für das **Datumsformat** und Ihr Format für **Telefonnummern**.

### Format der Telefonnummern

Im selben Abschnitt Region steht die Einstellung **Telefonnummern**, die festlegt, wie Telefonnummern im Datensatz einer Person eingegeben werden:

- **International (mit Ländervorwahl)** -- der Standard. Die Telefonfelder zeigen eine Länderflagge zur Auswahl und speichern Nummern mit Ländervorwahl (zum Beispiel +1 918 555 1234).
- **Lokal (wie eingegeben)** -- Die Telefonfelder werden zu einfachen Textfeldern und speichern Nummern genau so, wie Sie sie eingeben, ohne Ländervorwahl (zum Beispiel 0701 234 5678). Wählen Sie dies, wenn Ihre Gemeinde Nummern in einem lokalen Format schreibt und B1 keine Ländervorwahl hinzufügen soll.

Wenn **Lokal** ausgewählt ist, zeigt der Abschnitt Region neben Ihrer Region außerdem den Hinweis „Lokale Telefonnummern“.

:::tip
Textnachrichten funktionieren am besten, wenn die Nummern die Ländervorwahl enthalten. Wenn Sie Textnachrichten aus B1 versenden, behalten Sie das Format **International** bei oder achten Sie im Modus Lokal darauf, dass die eingegebenen Nummern die Ländervorwahl enthalten.
:::

Ihre Region gilt für Datums- und Zeitangaben in B1 Admin sowie auf Ihrer B1.church-Website und im Mitgliederportal, einschließlich Predigten, Blogbeiträgen, Gruppenkalendern und Dienstplänen. So sehen Mitglieder Daten im selben Format wie Ihre Mitarbeitenden.

## Textnachrichten {#texting}

Verbinden Sie einen Textnachrichten-Anbieter, um SMS aus B1 Admin an eine Person oder eine ganze Gruppe zu senden. Die Nachrichten werden über Ihr eigenes Konto beim Anbieter versendet, daher gelten dessen Preise und Limits.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Textnachrichten** und dann im Abschnitt **Textnachrichten** auf **Bearbeiten**.
2. Wählen Sie einen **Anbieter**:
   - **Clearstream** -- geben Sie einen **API-Schlüssel** ein. Sie erstellen ihn in Ihren Clearstream-Kontoeinstellungen unter API-Schlüssel.
   - **Text In Church** -- geben Sie einen **API-Schlüssel** ein. Bitten Sie zuerst den Support von Text In Church um Zugang zur Entwickler-API und erstellen Sie dann einen Schlüssel unter Kontoeinstellungen > Bereich Entwickler-API.
   - **Nalo Solutions** (Ghana) -- geben Sie den Authentifizierungsschlüssel Ihres Nalo-Solutions-Kontos als **API-Schlüssel** ein sowie eine **Absender-ID** (bis zu 11 Zeichen), die Nalo für Sie freigegeben hat.
3. Klicken Sie auf **Speichern**.

Um das Versenden von Textnachrichten zu beenden, setzen Sie **Anbieter** auf **Keiner** und speichern Sie. Damit wird der gespeicherte Anbieter entfernt.

### Personen, die mit STOP antworten, abmelden

Sobald ein Anbieter gespeichert ist, öffnen Sie den Abschnitt Textnachrichten erneut über **Bearbeiten**. Unterhalb der Anbietereinstellungen zeigt ein schreibgeschütztes Feld **Eingehende (STOP-)Webhook-URL** eine Webadresse, die nur für Ihre Gemeinde gilt. Klicken Sie in das Feld, um die Adresse auszuwählen, zu kopieren und in die Einstellung für eingehende Nachrichten (Antworten) Webhook Ihres Textnachrichten-Anbieters einzufügen. Dies funktioniert mit allen oben genannten Anbietern, die eingehende Antworten an einen Webhook weiterleiten können.

Antwortet danach jemand mit **STOP** (oder STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT oder REVOKE) auf eine Ihrer Nachrichten, findet B1 alle Personen mit übereinstimmender Mobilnummer, markiert sie als abgemeldet und schaltet ihre Textnachricht-Erinnerungen aus. Sie werden anschließend bei Gruppen-Textnachrichten übersprungen. Andere Antworten werden ignoriert.

:::info
Dies verwendet dieselbe Abmeldeeinstellung wie **Mich im Mitgliederverzeichnis ausblenden**. Personen, die mit STOP antworten, werden daher in ihrem Profil auch als **Im Verzeichnis ausgeblendet** angezeigt. Das Feld erscheint nur, während der gespeicherte Anbieter ausgewählt ist. Wenn Sie das Dropdown-Menü auf einen anderen Anbieter umstellen, speichern Sie zuerst, um die URL wieder zu sehen.
:::

Sobald ein Anbieter verbunden ist, sehen Mitarbeitende mit der Berechtigung zum Versenden von Textnachrichten auf der Seite einer Gruppe (**Dieser Gruppe eine Textnachricht senden**) und auf der Seite einer Person mit Mobiltelefon (**Textnachricht senden**) eine Schaltfläche **Textnachricht**. Geben Sie Ihre Nachricht ein und klicken Sie auf **Senden**. Der Dialog zählt Zeichen und SMS-Segmente. Bei einer Gruppe zeigt er vor dem Senden an, wie viele Mitglieder die Nachricht erhalten:

- Mitglieder ohne hinterlegte Mobilnummer werden übersprungen.
- Mitglieder, die **Mich im Mitgliederverzeichnis ausblenden** gewählt haben, gelten als abgemeldet und werden übersprungen.
- Familienmitglieder, die sich eine Mobilnummer teilen, erhalten die Nachricht nur einmal.

### Textnachrichten mit Platzhaltern personalisieren {#personalizing-texts-with-merge-fields}

Unterhalb des Nachrichtenfelds zeigt der Dialog Textnachricht Platzhalter-Schaltflächen: **Vorname**, **Nachname**, **Anzeigename** und **Name der Gemeinde**. Klicken Sie auf eine Schaltfläche, um ihren Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}`) an der Cursorposition einzufügen. Beim Versand wird jeder Platzhalter durch die Angaben des jeweiligen Empfängers ersetzt. So erreicht eine Gruppennachricht wie `Hallo {{firstName}}, bis Sonntag!` jedes Mitglied mit dem eigenen Vornamen. Platzhalter funktionieren sowohl bei Gruppen-Textnachrichten als auch bei Nachrichten an eine einzelne Person.

:::info
Die Grenze von 1.600 Zeichen gilt für die Nachricht, so wie Sie sie eingeben. Nachdem die Platzhalter ersetzt wurden, wird jeder Text, der länger als 1.600 Zeichen ist, an dieser Länge abgeschnitten.
:::

Textnachrichten können auch automatisch aus einem Schritt eines [Workflows](../serving/workflows.md#sending-a-text) mit der Aktion **Textnachricht senden** versendet werden. Diese verwendet denselben Anbieter und dieselben Platzhalter.

## Dateispeicher

Standardmäßig nutzen Dateien, die Sie auf Ihre Website hochladen (über [Dateien](../website/files.md)) und in anderen Inhaltsbereichen, den kostenlosen Speicher von B1 mit bis zu 100 MB. Wenn Sie mehr Platz benötigen, können Sie stattdessen Ihren eigenen Cloud-Speicher verbinden. Neue Uploads gehen dann direkt in Ihr Konto, ohne Begrenzung durch die Plattform.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Dateispeicher** und dann im Abschnitt **Dateispeicher** auf **Bearbeiten**.
2. Wählen Sie einen Anbieter: **Google Drive**, **Dropbox**, **OneDrive** oder einen **S3-kompatiblen Bucket** (AWS S3, Cloudflare R2, Backblaze B2 usw.).
3. Bei Google Drive, Dropbox oder OneDrive klicken Sie auf **Verbinden** und melden sich an, um den Zugriff zu autorisieren. Bei einem S3-kompatiblen Bucket geben Sie Ihren Zugriffsschlüssel, den geheimen Schlüssel, den Bucket-Namen und die Basis-URL für den öffentlichen Zugriff ein.
4. Klicken Sie auf **Speichern**.

:::info
Dies betrifft nur neue Uploads für Dateien Ihrer Website und ähnliche Inhaltsbereiche. Galeriebilder, Vorschaubilder, Logos und Personenfotos bleiben immer im Standardspeicher von B1.
:::

## Versetzung in die nächste Klasse

Wenn Sie bei Kindern und Jugendlichen die **Klassenstufe** erfassen, kann B1 an einem von Ihnen gewählten Datum (zum Beispiel am 1. August) alle automatisch eine Stufe höher setzen, statt dass Sie jeden Profil einzeln bearbeiten müssen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Versetzung** und dann im Abschnitt **Versetzung** auf **Bearbeiten**.
2. Schalten Sie den Schalter ein (er zeigt **Aktiviert**) und wählen Sie den **Monat** und den **Tag**, an denen jedes Jahr versetzt wird. An diesem Datum rückt jede Person mit einer Klassenstufe eine Stufe auf, und Schüler der 12. Klasse werden als **Abgeschlossen** markiert.
3. Speichern Sie Ihre Änderungen.

Um die automatische Versetzung zu beenden, schalten Sie den Schalter aus, sodass er **Deaktiviert** anzeigt, und speichern Sie. Das Versetzungsdatum wird entfernt und Klassenstufen ändern sich nicht mehr von selbst.

## Freiwilligen-Anmeldung {#volunteer-signup}

Standardmäßig sehen Mitglieder, die sich [Freiwilligen-Anmeldungen](../../b1-church/serving/volunteer-signup.md) ansehen, jede kommende Woche mit offenen Positionen. Ist diese Liste sehr lang, können Sie stattdessen nur die nächste Woche jeder Planart anzeigen.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Freiwilligen-Anmeldung** und dann im Abschnitt **Freiwilligen-Anmeldung** auf **Bearbeiten**.
2. Aktivieren Sie **Nur die nächste Woche jeder Planart anzeigen**.
3. Speichern Sie Ihre Änderungen.

Mit dieser Einstellung zeigt jede Planart nur ihren nächsten kommenden Plan. Die folgende Woche erscheint, sobald dieses Datum vergangen ist. In der Zeile **Angezeigte Wochen** des Abschnitts steht dann **Nur die nächste Woche jeder Planart** oder **Alle kommenden Wochen**.

## Datenschutz bei Spenden {#giving-privacy}

Personen mit Zugriff auf Spenden sehen normalerweise die Spendensummen auf dem [Personendatensatz](../people/adding-people.md#editing-details). Wenn Sie nicht möchten, dass die Beträge bei jedem Öffnen eines Datensatzes angezeigt werden, können Sie sie ausblenden, bis jemand sie anfordert.

1. Klicken Sie auf der Seite Einstellungen in der linken Liste auf **Datenschutz bei Spenden** und dann im Abschnitt **Datenschutz bei Spenden** auf **Bearbeiten**.
2. Aktivieren Sie **Spenden auf Personendatensätzen ausblenden, bis darauf geklickt wird**.
3. Speichern Sie Ihre Änderungen.

Mit dieser Einstellung steht auf der Spendenkarte eines Personendatensatzes „Spenden sind auf Personendatensätzen ausgeblendet.“ Klicken Sie auf **Spenden anzeigen**, um die Spenden dieser Person zu laden und anzuzeigen. Beim Öffnen einer anderen Person werden sie wieder ausgeblendet. Wer Spenden sehen darf, ändert sich dadurch nicht: Nur Personen mit Zugriff auf Spenden sehen die Karte überhaupt.

## Import und Export

Der Link **Import/Export** unter dem Namen Ihrer Gemeinde auf der Seite Einstellungen öffnet ein eigenes Werkzeug in einem neuen Browserfenster. Damit können Sie:

- Mitgliederdaten aus einem anderen Gemeindeverwaltungssystem importieren.
- Ihre ChurchApps-Daten für Sicherungs- oder Umzugszwecke exportieren.

Das ist besonders hilfreich, wenn Sie Ihre Gemeinde erstmals einrichten und bestehende Datensätze in ChurchApps übernehmen müssen.

:::warning
Sichern Sie beim Importieren von Daten zuerst immer Ihre bestehenden Datensätze. Importvorgänge fügen Daten zu Ihrem System hinzu und können bei mehrfacher Ausführung doppelte Einträge erzeugen.
:::
