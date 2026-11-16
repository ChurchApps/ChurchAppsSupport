---
title: "Einrichtung des Selbst-Check-ins mit B1 Checkin und B1 Admin"
sidebar_label: "Check-in"
description: "Richten Sie den Selbst-Check-in für Gottesdienste mit der App B1 Checkin in B1 Admin ein, einschließlich Geräten, Kiosk-Konten, Zeitplänen, Branding und QR-Gastregistrierung."
---

# Check-in {#check-in}

<div class="article-intro">

B1 Admin unterstützt den Selbst-Check-in bei Gottesdiensten über die begleitende App **B1 Checkin**. Mitglieder können sich und ihre Familien bei Ankunft an Kiosken oder dedizierten Geräten selbst einchecken. Das beschleunigt den Ablauf und entlastet Ihre Ehrenamtlichen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheitseinrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit eingerichteten [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardware-Empfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es {#how-it-works}

Die App B1 Checkin ist mit Ihrer Anwesenheitseinrichtung in B1 Admin verbunden. Wenn ein Mitglied sich einchecken lässt, wird seine Anwesenheit automatisch dem richtigen Standort, der richtigen Gottesdienstzeit und der richtigen Gruppe zugeordnet. Für Personen, die das Check-in-System nutzen, müssen Sie die Anwesenheit nicht manuell erfassen.

## Check-in einrichten {#setting-up-check-in}

1. **Konfigurieren Sie zuerst Ihre Anwesenheitsstruktur.** Gehen Sie in B1 Admin zu **Personen > Anwesenheit** und klicken Sie auf **Einrichtung**, um sicherzustellen, dass Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind. Die Check-in-App ist auf diese Konfiguration angewiesen. Optional können Sie jeder Gottesdienstzeit einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) zuweisen, damit der Check-in jede Woche automatisch öffnet und schließt. Zeitpläne verwenden die Zeitzone des Standorts des Gottesdienstes oder die Zeitzone Ihrer Kirche, falls für den Standort keine hinterlegt ist. Der Kiosk zeigt Gottesdienstzeiten, deren Zeitfenster geschlossen ist, als **Geschlossen** an und teilt Familien mit, wann der Check-in öffnet. Details finden Sie unter [Anwesenheitseinrichtung](setup.md).
2. **Installieren Sie die App B1 Checkin** auf den Geräten, die Sie verwenden möchten. Die App ist für folgende Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der App B1 Checkin an** mit einem Konto, das die Berechtigung **Checkin** für Anwesenheit (oder **Anwesenheit bearbeiten**) besitzt. Siehe [Check-in-Kiosk-Konten](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Zusammenkunft aus.
5. Mitglieder können nun auf dem Gerät nach ihrem Namen suchen und sich einchecken.

:::tip
Stellen Sie die Check-in-Geräte an gut sichtbaren und leicht erreichbaren Orten auf, etwa an Eingängen zum Foyer oder an Empfangstischen. Eine kurze Ankündigung während des Gottesdienstes hilft Mitgliedern zu wissen, dass diese Möglichkeit besteht.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie die Einrichtung in der [Anwesenheitseinrichtung](setup.md) für jeden Standort wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware {#recommended-hardware}

**Tablets** – alle diese funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Drucker** – Check-ins funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Budget:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Brother-Treiber und Einrichtungsanleitungen finden Sie auf der [Brother-Supportseite](https://support.brother.com).
:::

## Das Erscheinungsbild des Kiosks anpassen {#customizing-the-kiosk-appearance}

Sie können das Aussehen der App B1 Checkin an das Branding Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobil > B1 CheckIn** (oder klicken Sie auf der Seite Anwesenheit auf **Kiosk**) und nutzen Sie die Karte **Kiosk-Design**. Klicken Sie nach Änderungen auf der Karte auf **Speichern**.

### Farben {#colors}

Der Kiosk verwendet dieselben Farben wie die App Ihrer Kirche. Sie legen diese unter **Mobil > App-Design** fest; die Karte Kiosk-Design hat keine eigenen Farboptionen.

### Hintergrundbild {#background-image}

Klicken Sie unter **Hintergrundbild** auf **Bild hochladen**, um ein optionales Hintergrundbild für die Begrüßungs- und Suchbildschirme des Kiosks hinzuzufügen. Die empfohlene Größe ist 1920x1080 Pixel. Verwenden Sie **Bild ändern** oder **Entfernen**, um es zu ersetzen oder zu entfernen.

### Ruhebildschirm / Bildschirmschoner {#idle-screen--screensaver}

Richten Sie einen Bildschirmschoner ein, der nach einer Zeit ohne Aktivität startet:

1. Öffnen Sie **Ruhebildschirm / Bildschirmschoner** und aktivieren Sie **Ruhebildschirm aktivieren**.
2. Legen Sie **Zeitlimit (Sekunden)** fest – wie viele Sekunden ohne Aktivität vergehen, bevor der Bildschirmschoner startet (mindestens 10).
3. Klicken Sie für jede Folie auf **Folie hinzufügen**, klicken Sie auf **Hochladen**, um ihr Bild auszuwählen, und legen Sie ihre **Dauer (s)** fest (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk gerade nicht genutzt wird.
:::

## Gastregistrierung per QR-Code {#guest-registration-via-qr-code}

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie auf dem eigenen Telefon zu registrieren. Das beschleunigt den Check-in für Erstbesucher.

Wenn ein Gast den QR-Code scannt, gelangt er zu einer [Gastregistrierungsseite](../../b1-church/checkin/guest-registration.md), auf der er die Namen seiner Familie und alle weiteren Angaben eintragen kann, die Sie abfragen möchten. Ein Ehrenamtlicher kann ihn dann am Kiosk suchen und einchecken.

### QR-Gastregistrierung aktivieren {#enabling-qr-guest-registration}

So schalten Sie die Anzeige des QR-Codes ein:

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **B1 CheckIn**.
3. Schalten Sie **QR-Gastregistrierung** ein und klicken Sie auf **Speichern**.

:::note
Diese Einstellung finden Sie unter **Mobil > B1 CheckIn** (auf derselben Seite wie die Karte **Kiosk-Design**), nicht unter Anwesenheit. Die Aktion **Kiosk** auf der Seite Anwesenheit verlinkt auf diese Seite.
:::

Sobald der Schalter eingeschaltet ist, erscheinen die übrigen Optionen unten auf derselben Karte **QR-Gastregistrierung**. Klicken Sie nach einer Änderung an einer dieser Optionen auf **Speichern** auf der Karte.

### Anmeldefelder auswählen {#choosing-sign-up-fields}

Die Checkliste **Anmeldefelder** legt fest, was das Registrierungsformular abfragt. **Vorname** und **Nachname** sind immer im Formular enthalten und für jedes Familienmitglied immer erforderlich. Aktivieren Sie bei jedem anderen Feld **Einbeziehen**, um es in das Formular aufzunehmen, und danach **Pflichtfeld**, wenn Gäste es ausfüllen müssen. **Pflichtfeld** kann nur für ein aufgenommenes Feld aktiviert werden, und wenn Sie **Einbeziehen** deaktivieren, wird die Angabe zurückgesetzt.

| Feld | Abgefragt | Standardmäßig enthalten |
|-------|-----------|---------------------|
| **Anrede** | Jedes Familienmitglied, als Auswahlliste vor dem Namen (Herr, Frau, Fräulein, Ms, Dr., Prof., Pfr., Pastor) | Nein |
| **E-Mail** | Jedes Familienmitglied. Wenn erforderlich, muss nur die Hauptkontaktperson sie ausfüllen. | Ja (optional) |
| **Telefon** | Jedes Familienmitglied. Wenn erforderlich, muss nur die Hauptkontaktperson sie ausfüllen. | Ja (optional) |
| **Rolle im Haushalt** | Jedes Familienmitglied nach der Hauptkontaktperson – Ehepartner, Kind oder Sonstige. Die Hauptkontaktperson ist Haushaltsvorstand eines neuen Haushalts. Wer keine Rolle hat, wird als Sonstige gespeichert. | Ja (optional) |
| **Wohnadresse** | Einmal für die Familie – Straße, Adresszeile 2, Stadt, Bundesland und Postleitzahl. Wenn erforderlich, müssen alle Angaben außer Adresszeile 2 ausgefüllt sein. Die Adresse wird bei jedem Familienmitglied gespeichert. | Nein |
| **Geburtsdatum** | Jedes Familienmitglied | Nein |
| **Geschlecht** | Jedes Familienmitglied | Nein |
| **Familienstand** | Nur Hauptkontaktperson | Nein |
| **Klassenstufe** | Jedes Familienmitglied (Vorschule bis 12, oder Abschluss) | Nein |
| **Kommentare** | Einmal, in einem Feld unter den Familienmitgliedern (bis zu 1.000 Zeichen) | Nein |
| **Foto** | Jedes Familienmitglied, mit einer Schaltfläche **Foto hinzufügen**, die einen Zuschneidedialog öffnet. Das Foto wird zum Profilfoto der neuen Person. Wenn erforderlich, muss nur die Hauptkontaktperson eines hinzufügen. | Nein |

Ausgeschaltete Felder werden nie gespeichert, selbst wenn jemand sie auf anderem Weg an die Anmeldung sendet. Kommentare werden als Notiz im Datensatz der Hauptkontaktperson gespeichert (mit dem Eintrag „Gästeanmeldung“). So können Sie sie im Bereich **Notizen** ihres Profils lesen.

### Gäste einer Gruppe hinzufügen {#adding-guests-to-a-group}

Verwenden Sie **Neue Gäste der Gruppe hinzufügen**, um alle, die sich anmelden, automatisch einer Ihrer Gruppen zuzuordnen – zum Beispiel einer Gruppe „Newcomers“ oder einer Gruppe für die Veranstaltung dieses Wochenendes. Wählen Sie **Keine** (die Voreinstellung), um dies zu überspringen. Gäste sehen die Gruppe nie und können sie nicht auswählen; sie wird nur hier festgelegt. Ändern Sie sie vor jeder Veranstaltung, damit Sie die Gäste dieser Veranstaltung gemeinsam nachverfolgen können.

### Anwesenheit erfassen {#recording-attendance}

Wenn eine Gruppe ausgewählt ist, erscheint ein Schalter **Anwesenheit ebenfalls erfassen**. Schalten Sie ihn ein, um Gäste bei der Anmeldung sofort als anwesend zu markieren, sodass Sie sie nicht separat einchecken müssen.

Die Anwesenheit wird nur erfasst, wenn die Anmeldung während einer **geplanten** Gottesdienstzeit einer der ausgewählten Gruppen erfolgt:

- Die Gruppe muss mit einer oder mehreren Gottesdienstzeiten verknüpft sein, und diese Gottesdienstzeiten müssen einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) haben (einen **Tag** und eine **Startzeit**).
- „Während“ bedeutet innerhalb des Check-in-Zeitfensters dieser Gottesdienstzeit – von den **Minuten für das Öffnen des Check-ins** vor dem Beginn bis zu den **Minuten für das Schließen des Check-ins** nach dem Ende (oder nach dem Beginn, falls keine Endzeit festgelegt ist; ohne Endzeit und ohne Schließminuten bis zum Ende dieses Tages), in der Zeitzone, die der Check-in-Zeitplan verwendet.
- Jedes Familienmitglied wird in der Gruppe für jede ihrer Gottesdienstzeiten als anwesend markiert, die in diesem Moment geöffnet ist, mit dem heutigen Datum.
- Anmeldungen zu anderen Zeiten oder für eine Gruppe, deren Gottesdienstzeiten keinen Zeitplan haben, werden der Gruppe hinzugefügt, aber nicht als Teilnahme gezählt.

### Kopfbild {#header-photo}

Klicken Sie unter **Kopfbild** auf **Foto ändern**, um ein Bild auszuwählen oder hochzuladen (auf ein 16:9-Format zugeschnitten), das oben auf der Registrierungsseite anstelle des Standardsymbols angezeigt wird. Klicken Sie auf **Entfernen**, um zum Symbol zurückzukehren.

### Den Registrierungslink teilen {#sharing-the-registration-link}

Sobald QR-Gastregistrierung aktiviert ist, erscheint unten auf der Karte ein Abschnitt **Anmelde-QR-Code teilen**. Damit erhalten Sie neben dem QR-Code des Kiosks zwei weitere Möglichkeiten, Gäste zum Registrierungsformular zu bringen:

- **Link kopieren** – kopiert die Registrierungs-URL, damit Sie sie auf Ihrer Kirchenwebsite, in E-Mails oder überall online einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, in Gottesdienstblättern oder auf Schildern drucken können.

:::tip
Fügen Sie den Registrierungslink auf der Seite „Ihr Besuch“ oder „Ich bin neu“ Ihrer Kirchenwebsite hinzu, damit Gäste sich schon vor ihrer Ankunft registrieren können.
:::

### Was nach der Anmeldung eines Gastes passiert {#what-happens-after-a-guest-signs-up}

B1 sucht zuerst nach Personen, die bereits in **Personen** erfasst sind. Ein Familienmitglied wird einer bestehenden Person zugeordnet, wenn genau eine Person denselben Vornamen und dieselbe E-Mail-Adresse oder Telefonnummer hat. Ein Kind, das ohne E-Mail-Adresse oder Telefonnummer erfasst wurde, wird über den Vornamen innerhalb des zugeordneten Haushalts zugeordnet. Zugeordnete Personen werden unverändert übernommen – die Anmeldung ändert nie ihre Angaben oder ihren Mitgliedsstatus – und neue Personen werden dem zugeordneten Haushalt hinzugefügt.

Wenn keine Zuordnung gefunden wird, erstellt die Anmeldung einen neuen Haushalt, der nach dem Nachnamen der Hauptkontaktperson benannt wird, mit einem Personendatensatz für jedes Familienmitglied. Alle neuen Personen werden in **Personen** mit dem Mitgliedsstatus **Besucher** erfasst, wobei die Hauptkontaktperson Haushaltsvorstand ist.

Zugeordnete und neue Personen werden gleichermaßen der von Ihnen gewählten Gruppe hinzugefügt (sofern sie noch nicht Mitglied ist) und erhalten eine Anwesenheitserfassung, wenn diese eingeschaltet ist. Kommentare werden als Notiz bei der Hauptkontaktperson gespeichert.

Um automatisch nachzufassen, fügen Sie einen [Workflow-Auslöser](../serving/workflows.md#triggers) hinzu, etwa **Person · Erstellt** mit der Bedingung *Mitgliedsstatus ist Besucher*, oder **Gruppe · Mitglied beigetreten** für die oben gewählte Gruppe.

## Was erfasst wird {#what-gets-recorded}

Jeder Check-in erzeugt einen Anwesenheitseintrag in B1 Admin. Sie können diese Einträge auf der Seite [Anwesenheit](tracking-attendance.md) und in den [Sitzungen jeder Gruppe](../groups/group-members.md) einsehen, genau wie manuell erfasste Anwesenheiten. Die Daten werden auf dieselbe Weise angezeigt – beide Methoden fließen in dieselben Berichte ein.
