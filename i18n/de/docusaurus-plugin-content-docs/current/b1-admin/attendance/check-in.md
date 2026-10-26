---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin unterstützt die Selbst-Anmeldung zu Gottesdiensten über die begleitende App **B1 Checkin**. Mitglieder können sich und ihre Familien bei Ankunft an Kiosken oder dedizierten Geräten selbst einchecken. Das beschleunigt den Ablauf und entlastet Ihre Ehrenamtlichen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheits-Einrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit eingerichteten [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardwareempfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es

Die App B1 Checkin verbindet sich mit Ihrer Anwesenheitseinrichtung in B1 Admin. Wenn sich ein Mitglied einchecken, wird seine Anwesenheit automatisch dem richtigen Standort, der richtigen Gottesdienstzeit und der richtigen Gruppe zugeordnet. Für Personen, die das Check-in-System nutzen, müssen Sie die Anwesenheit nicht manuell erfassen.

## Check-In einrichten

1. **Richten Sie zuerst Ihre Anwesenheitsstruktur ein.** Gehen Sie in B1 Admin zu **Personen > Anwesenheit** und klicken Sie auf **Einrichtung**, um sicherzustellen, dass Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind. Die Check-in-App stützt sich auf diese Konfiguration. Optional können Sie jeder Gottesdienstzeit einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) zuweisen, damit sich der Check-in jede Woche automatisch öffnet und schließt. Zeitpläne verwenden die Zeitzone des Standorts des Gottesdienstes oder die Zeitzone Ihrer Kirche, falls der Standort keine hat. Das Kiosk-Gerät zeigt Gottesdienstzeiten, deren Zeitfenster geschlossen ist, als **Geschlossen** an und teilt Familien mit, wann der Check-in öffnet. Weitere Details finden Sie unter [Anwesenheits-Einrichtung](setup.md).
2. **Installieren Sie die App B1 Checkin** auf den Geräten, die Sie verwenden möchten. Die App ist auf folgenden Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon-Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der App B1 Checkin** mit den Zugangsdaten Ihrer Kirche an.
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Versammlung aus.
5. Mitglieder können nun auf dem Gerät nach ihrem Namen suchen und sich einchecken.

:::tip
Stellen Sie Check-in-Geräte an gut sichtbaren, leicht erreichbaren Orten auf, etwa am Eingangsbereich der Lobby oder am Empfangstisch. Eine kurze Ankündigung während der Gottesdienste hilft Mitgliedern zu wissen, dass diese Möglichkeit besteht.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort in der [Anwesenheits-Einrichtung](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** -- alle diese Geräte funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10,5"
- **Budget:** Amazon Fire HD 10

**Drucker** -- für den Check-in können Brother-Etikettendrucker zum Drucken von Namensschildern verwendet werden:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gute Wahl:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Budget:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Brother-Druckertreiber und Einrichtungsanleitungen finden Sie auf der [Brother-Support-Seite](https://support.brother.com).
:::

## Aussehen des Kiosks anpassen

Sie können das Erscheinungsbild der App B1 Checkin an das Design Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobil > B1 CheckIn** und nutzen Sie die Karte **Kiosk-Design**, um Folgendes zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an das Erscheinungsbild Ihrer Kirche an:

- **Primär** und **Primär-Kontrast** -- Hauptmarkenfarbe und ihre Textfarbe.
- **Sekundär** und **Sekundär-Kontrast** -- Akzentfarbe und ihre Textfarbe.
- **Kopfzeilen-Hintergrund** und **Unterkopfzeilen-Hintergrund** -- Farben für die Kopfbereiche des Kiosks.
- **Schaltflächen-Hintergrund** und **Schaltflächen-Text** -- Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie optional ein Hintergrundbild für die Begrüßungs- und Suchbildschirme des Kiosks hoch. Empfohlene Größe ist 1920x1080 Pixel.

### Ruhebildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der nach einer Zeit der Inaktivität aktiviert wird:

1. Schalten Sie den Ruhebildschirm **ein** oder **aus**.
2. Legen Sie das **Zeitlimit** fest (wie viele Sekunden Inaktivität vergehen, bevor der Bildschirmschoner startet; Minimum 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu -- jede Folie hat ein Bild und eine Anzeigedauer (Minimum 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, kommende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gastregistrierung per QR-Code

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie direkt auf dem eigenen Telefon zu registrieren. Das beschleunigt den Check-in für Erstbesucher.

Wenn ein Gast den QR-Code scannt, gelangt er zu einer [Registrierungsseite für Gäste](../../b1-church/checkin/guest-registration), auf der er die Namen seiner Familienmitglieder und alle weiteren Angaben eintragen kann, die Sie abfragen möchten. Ein Ehrenamtlicher kann den Gast dann am Kiosk suchen und einchecken.

### QR-Gastregistrierung aktivieren

So schalten Sie die QR-Code-Anzeige ein:

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **B1 CheckIn**.
3. Schalten Sie **QR-Gastregistrierung** ein und klicken Sie auf **Speichern**.

:::note
Diese Einstellung befindet sich unter **Mobil > B1 CheckIn** (auf derselben Seite wie die Karte **Kiosk-Design**), nicht unter Anwesenheit. Die Aktion **Kiosk** auf der Anwesenheitsseite enthält einen Link zu dieser Seite.
:::

Sobald der Schalter eingeschaltet ist, erscheinen die übrigen Optionen unten in derselben Karte **QR-Gastregistrierung**. Klicken Sie nach jeder Änderung auf **Speichern** auf der Karte.

### Anmeldefelder auswählen

Die Checkliste **Anmeldefelder** legt fest, wonach das Registrierungsformular fragt. **Vorname** und **Nachname** sind immer im Formular enthalten und für jedes Familienmitglied immer erforderlich. Für jedes andere Feld schalten Sie **Einbeziehen** ein, um es dem Formular hinzuzufügen, und anschließend **Pflichtfeld** ein, wenn Gäste es ausfüllen müssen. **Pflichtfeld** kann nur für ein einbezogenes Feld eingeschaltet werden, und wenn Sie **Einbeziehen** ausschalten, wird es zurückgesetzt.

| Feld | Abgefragt | Standardmäßig einbezogen |
|-------|-----------|---------------------|
| **E-Mail** | Nur Hauptkontakt | Ja (optional) |
| **Telefon** | Nur Hauptkontakt | Ja (optional) |
| **Wohnadresse** | Einmal für die Familie -- Straße, Adresszeile 2, Stadt, Bundesland und PLZ. Ist das Feld ein Pflichtfeld, müssen alle Angaben außer der Adresszeile 2 ausgefüllt werden. Die Adresse wird bei jedem Familienmitglied gespeichert. | Nein |
| **Geburtsdatum** | Jedes Familienmitglied | Nein |
| **Geschlecht** | Jedes Familienmitglied | Nein |
| **Familienstand** | Nur Hauptkontakt | Nein |
| **Klassenstufe** | Jedes Familienmitglied (Vorschule bis 12, oder Abschluss) | Nein |
| **Kommentare** | Einmal, in einem Feld unterhalb der Familienmitglieder (bis zu 1.000 Zeichen) | Nein |

Ausgeschaltete Felder werden nie gespeichert, selbst wenn jemand sie auf anderem Weg an die Anmeldung übermittelt. Kommentare werden als Notiz im Datensatz des Hauptkontakts gespeichert (als "Gästeanmeldung" verfasst), sodass Sie sie im Bereich **Notizen** seines Profils lesen können.

### Gäste einer Gruppe hinzufügen

Verwenden Sie **Neue Gäste zur Gruppe hinzufügen**, um alle Personen, die sich anmelden, automatisch einer Ihrer Gruppen zuzuordnen -- etwa einer Gruppe "Neue" oder einer Gruppe für die Veranstaltung dieses Wochenendes. Wählen Sie **Keine** (die Standardeinstellung), um dies zu überspringen. Gäste sehen die Gruppe nie und können sie auch nicht auswählen; sie wird ausschließlich hier festgelegt. Ändern Sie sie vor jeder Veranstaltung, damit Sie die Gäste dieser Veranstaltung gemeinsam nachverfolgen können.

### Anwesenheit erfassen

Sobald eine Gruppe ausgewählt ist, erscheint der Schalter **Anwesenheit ebenfalls erfassen**. Schalten Sie ihn ein, damit Gäste im Moment ihrer Anmeldung als anwesend markiert werden und Sie sie nicht separat einchecken müssen.

Die Anwesenheit wird nur erfasst, wenn die Anmeldung während eines **geplanten** Gottesdienstes der ausgewählten Gruppe erfolgt:

- Die Gruppe muss mit einer oder mehreren Gottesdienstzeiten verknüpft sein, und diese Gottesdienstzeiten müssen einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) haben (einen **Tag** und eine **Startzeit**).
- "Während" bedeutet innerhalb des Check-in-Zeitfensters dieser Gottesdienstzeit -- von den Minuten **Check-in öffnen** vor dem Beginn bis zu den Minuten **Check-in schließen** nach dem Ende (oder nach dem Beginn, falls keine Endzeit festgelegt ist), jeweils in der Zeitzone, die der Check-in-Zeitplan verwendet.
- Jedes Familienmitglied wird für jede seiner Gottesdienstzeiten als in der Gruppe anwesend markiert, die zu diesem Zeitpunkt geöffnet ist, und zwar für das heutige Datum.
- Anmeldungen zu anderen Zeiten oder für eine Gruppe, deren Gottesdienstzeiten keinen Zeitplan haben, werden der Gruppe hinzugefügt, zählen aber nicht als Teilnahme.

### Kopfbild

Klicken Sie unter **Kopfbild** auf **Foto ändern**, um ein Bild auszuwählen oder hochzuladen (es wird auf ein 16:9-Format zugeschnitten), das oben auf der Registrierungsseite anstelle des Standardsymbols angezeigt wird. Klicken Sie auf **Entfernen**, um zum Symbol zurückzukehren.

### Den Registrierungslink teilen

Sobald die QR-Gastregistrierung aktiviert ist, erscheint unten auf der Karte der Abschnitt **Registrierungs-QR-Code teilen**. Er bietet Ihnen zwei Möglichkeiten, Gäste neben dem QR-Code am Kiosk zum Registrierungsformular zu bringen:

- **Link kopieren** -- kopiert die Registrierungs-URL, damit Sie sie auf Ihrer Kirchenwebsite, in E-Mails oder überall online einfügen können.
- **PNG herunterladen** -- lädt den QR-Code als Bild herunter, das Sie auf Flyern, im Gemeindebrief oder auf Beschilderungen drucken können.

:::tip
Fügen Sie den Registrierungslink auf der Seite "Planen Sie Ihren Besuch" oder "Ich bin neu" Ihrer Kirchenwebsite hinzu, damit Gäste sich schon vor ihrer Ankunft registrieren können.
:::

### Was nach der Anmeldung eines Gastes passiert

Jede Anmeldung erstellt einen neuen Haushalt, der nach dem Nachnamen des Hauptkontakts benannt wird, mit einem Personendatensatz für jedes Familienmitglied. Alle werden unter **Personen** mit dem Mitgliedsstatus **Besucher** hinzugefügt, wobei der Hauptkontakt als Haushaltsvorstand eingetragen wird.

Um Nachfassaktionen automatisch auszulösen, fügen Sie einen [Workflow-Auslöser](../serving/workflows.md#triggers) hinzu, etwa **Person · Erstellt** mit der Bedingung *Mitgliedsstatus ist Besucher*, oder **Gruppe · Mitglied beigetreten** für die oben gewählte Gruppe.

## Was erfasst wird

Jeder Check-in erstellt einen Anwesenheitseintrag in B1 Admin. Sie können diese Einträge auf der Seite [Anwesenheit](tracking-attendance.md) und in den [Sitzungen jeder Gruppe](../groups/group-members.md) einsehen, genau wie manuell erfasste Anwesenheit. Es gibt keinen Unterschied in der Darstellung der Daten -- beide Methoden fließen in dieselben Berichte ein.
