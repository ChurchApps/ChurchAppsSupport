---
title: "Einrichtung des Selbst-Check-ins mit B1 Checkin und B1 Admin"
sidebar_label: "Check-In"
description: "Richten Sie den Selbst-Check-in für Gottesdienste mit der App B1 Checkin in B1 Admin ein. Behandelt werden Geräte, Kiosk-Konten, Zeitpläne, Branding und die Gast-Anmeldung per QR-Code."
---

# Check-In

<div class="article-intro">

B1 Admin unterstützt den Selbst-Check-in bei Gottesdiensten über die zugehörige App **B1 Checkin**. Mitglieder können sich und ihre Familien bei der Ankunft an Kiosken oder auf dedizierten Geräten selbst einchecken. Das beschleunigt den Ablauf und entlastet Ihre Ehrenamtlichen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheitseinrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit eingerichteten [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe unten die [Hardwareempfehlungen](#recommended-hardware)).

</div>

## So funktioniert es

Die App B1 Checkin ist mit Ihrer Anwesenheitseinrichtung in B1 Admin verbunden. Wenn sich ein Mitglied einchecken, wird die Anwesenheit automatisch dem richtigen Standort, der richtigen Gottesdienstzeit und der richtigen Gruppe zugeordnet. Für Personen, die das Check-in-System nutzen, müssen Sie die Anwesenheit nicht manuell erfassen.

## Check-In einrichten

1. **Richten Sie zuerst Ihre Anwesenheitsstruktur ein.** Gehen Sie in B1 Admin zu **People > Attendance** und klicken Sie auf **Setup**, um sicherzustellen, dass Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind. Die Check-in-App baut auf dieser Konfiguration auf. Optional können Sie jeder Gottesdienstzeit einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) zuweisen, damit der Check-in jede Woche automatisch öffnet und schließt. Zeitpläne verwenden die Zeitzone des Standorts des Gottesdienstes oder, falls für den Standort keine festgelegt ist, die Zeitzone Ihrer Kirche. Der Kiosk zeigt Gottesdienstzeiten, deren Zeitfenster geschlossen ist, als **Closed** an und teilt Familien mit, wann der Check-in öffnet. Details finden Sie in der [Anwesenheitseinrichtung](setup.md).
2. **Installieren Sie die App B1 Checkin** auf den Geräten, die Sie verwenden möchten. Die App ist für folgende Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android-Tablets und Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon-Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der App B1 Checkin an** mit einem Konto, das die Berechtigung **Checkin** (oder **Edit Attendance**) für die Anwesenheit besitzt. Siehe [Kiosk-Konten für den Check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Versammlung aus.
5. Mitglieder können nun auf dem Gerät ihren Namen suchen und sich einchecken.

:::tip
Stellen Sie die Check-in-Geräte an gut sichtbaren und leicht erreichbaren Orten auf, etwa am Eingang des Foyers oder am Empfangstisch. Eine kurze Ankündigung während der Gottesdienste hilft Mitgliedern zu wissen, dass diese Möglichkeit besteht.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort in der [Anwesenheitseinrichtung](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** – alle diese Geräte funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10.5"
- **Preisgünstig:** Amazon Fire HD 10

**Drucker** – Check-ins funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gute Wahl:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Preisgünstig:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Treiber und Einrichtungsanleitungen für Brother-Drucker finden Sie auf der [Brother-Support-Seite](https://support.brother.com).
:::

## Aussehen des Kiosks anpassen

Sie können das Erscheinungsbild der App B1 Checkin an das Branding Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobile > B1 CheckIn** und verwenden Sie die Karte **Kiosk Theme**, um Folgendes zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an das Branding Ihrer Kirche an:

- **Primary** und **Primary Contrast** – Hauptmarkenfarbe und ihre Textfarbe.
- **Secondary** und **Secondary Contrast** – Akzentfarbe und ihre Textfarbe.
- **Header Background** und **Subheader Background** – Farben für die Kopfbereiche des Kiosks.
- **Button Background** und **Button Text** – Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie optional ein Hintergrundbild für die Begrüßungs- und Suchbildschirme des Kiosks hoch. Empfohlen wird eine Größe von 1920 x 1080 Pixeln.

### Ruhebildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der nach einer Zeit der Inaktivität aktiviert wird:

1. Schalten Sie den Ruhebildschirm **ein** oder **aus**.
2. Legen Sie das **Timeout** fest (wie viele Sekunden Inaktivität vergehen, bevor der Bildschirmschoner startet; mindestens 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu – jede Folie hat ein Bild und eine Anzeigedauer (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk gerade nicht benutzt wird.
:::

## Gast-Anmeldung per QR-Code

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie auf dem eigenen Smartphone anzumelden. Das beschleunigt den Check-in für Erstbesucher.

Wenn ein Gast den QR-Code scannt, gelangt er zu einer [Anmeldeseite für Gäste](../../b1-church/checkin/guest-registration.md), auf der er die Namen seiner Familie und alle weiteren Angaben eintragen kann, die Sie abfragen möchten. Eine Ehrenamtliche oder ein Ehrenamtlicher kann den Gast dann am Kiosk suchen und einchecken.

### QR-Gast-Anmeldung aktivieren

So schalten Sie die Anzeige des QR-Codes ein:

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Mobile**.
2. Klicken Sie auf **B1 CheckIn**.
3. Schalten Sie **QR Guest Registration** ein und klicken Sie auf **Save**.

:::note
Diese Einstellung befindet sich unter **Mobile > B1 CheckIn** (auf derselben Seite wie die Karte **Kiosk Theme**), nicht unter Attendance. Die Aktion **Kiosk** auf der Seite Attendance enthält einen Link zu dieser Seite.
:::

Sobald der Schalter eingeschaltet ist, erscheinen die übrigen Optionen unten in derselben Karte **QR Guest Registration**. Klicken Sie nach jeder Änderung auf **Save** der Karte.

### Anmeldefelder auswählen

Die Checkliste **Sign-up fields** legt fest, wonach das Anmeldeformular fragt. **First Name** und **Last Name** sind immer im Formular enthalten und für jedes Familienmitglied immer erforderlich. Bei allen anderen Feldern aktivieren Sie **Include**, um das Feld dem Formular hinzuzufügen, und anschließend **Required**, wenn Gäste es ausfüllen müssen. **Required** kann nur für ein eingeschlossenes Feld aktiviert werden. Wenn Sie **Include** deaktivieren, wird auch **Required** zurückgesetzt.

| Feld | Abgefragt für | Standardmäßig enthalten |
|-------|-----------|---------------------|
| **Title** | Jedes Familienmitglied, als Dropdown vor dem Namen (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nein |
| **Email** | Nur den Hauptkontakt | Ja (optional) |
| **Phone** | Jedes Familienmitglied. Wenn das Feld erforderlich ist, muss nur der Hauptkontakt es ausfüllen. | Ja (optional) |
| **Household role** | Jedes Familienmitglied nach dem Hauptkontakt – Spouse, Child oder Other. Der Hauptkontakt ist Haupt eines neuen Haushalts. Wer keine Rolle hat, wird als Other gespeichert. | Ja (optional) |
| **Home address** | Einmal für die Familie – Straße, Adresszeile 2, Stadt, Bundesland und Postleitzahl. Wenn das Feld erforderlich ist, müssen alle Angaben außer der Adresszeile 2 ausgefüllt werden. Die Adresse wird bei jedem Familienmitglied gespeichert. | Nein |
| **Birth date** | Jedes Familienmitglied | Nein |
| **Gender** | Jedes Familienmitglied | Nein |
| **Marital status** | Nur den Hauptkontakt | Nein |
| **Grade** | Jedes Familienmitglied (PreK bis 12 oder Graduated) | Nein |
| **Comments** | Einmal, in einem Feld unterhalb der Familienmitglieder (bis zu 1.000 Zeichen) | Nein |

Deaktivierte Felder werden nie gespeichert, selbst wenn jemand sie auf anderem Weg an die Anmeldung übermittelt. Kommentare werden als Notiz im Datensatz des Hauptkontakts gespeichert (als „Guest sign-up“ vermerkt), sodass Sie sie im Abschnitt **Notes** des Profils lesen können.

### Gäste einer Gruppe hinzufügen

Verwenden Sie **Add new guests to group**, um alle Personen, die sich anmelden, automatisch einer Ihrer Gruppen zuzuordnen – zum Beispiel einer Gruppe „Newcomers“ oder einer Gruppe für die Veranstaltung dieses Wochenendes. Wählen Sie **None** (die Standardeinstellung), um dies zu überspringen. Gäste sehen die Gruppe nie und können sie nicht auswählen; sie wird ausschließlich hier festgelegt. Ändern Sie sie vor jeder Veranstaltung, damit Sie die Gäste der jeweiligen Veranstaltung gemeinsam nachverfolgen können.

### Anwesenheit erfassen

Wenn eine Gruppe ausgewählt ist, erscheint der Schalter **Also record attendance**. Schalten Sie ihn ein, um Gäste sofort bei der Anmeldung als anwesend zu markieren, sodass Sie sie nicht separat einchecken müssen.

Die Anwesenheit wird nur erfasst, wenn die Anmeldung während einer **geplanten** Gottesdienstzeit der ausgewählten Gruppe erfolgt:

- Die Gruppe muss mit einer oder mehreren Gottesdienstzeiten verknüpft sein, und diese Gottesdienstzeiten müssen einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) haben (einen **Day** und eine **Start Time**).
- „Während“ bedeutet innerhalb des Check-in-Zeitfensters dieser Gottesdienstzeit – von den **Open check-in**-Minuten vor dem Beginn bis zu den **Close check-in**-Minuten nach dem Ende (bzw. nach dem Beginn, wenn keine Endzeit festgelegt ist; ohne Endzeit und ohne Schließminuten bis zum Ende des Tages), in derselben Zeitzone, die der Check-in-Zeitplan verwendet.
- Jedes Familienmitglied wird für jede ihrer Gottesdienstzeiten, die in diesem Moment geöffnet ist, am heutigen Datum als in der Gruppe anwesend markiert.
- Anmeldungen zu einer anderen Zeit oder für eine Gruppe, deren Gottesdienstzeiten keinen Zeitplan haben, werden der Gruppe hinzugefügt, aber nicht als Teilnahme gezählt.

### Kopfbild

Klicken Sie unter **Header photo** auf **Change photo**, um ein Bild auszuwählen oder hochzuladen (es wird auf ein 16:9-Format zugeschnitten). Dieses Bild wird oben auf der Anmeldeseite anstelle des Standardsymbols angezeigt. Klicken Sie auf **Remove**, um zum Symbol zurückzukehren.

### Den Anmeldelink teilen

Sobald die QR-Gast-Anmeldung aktiviert ist, erscheint unten auf der Karte der Abschnitt **Share registration QR code**. Er bietet zwei Möglichkeiten, Gäste außerhalb des QR-Codes am Kiosk zum Anmeldeformular zu führen:

- **Copy link** – kopiert die Anmelde-URL, damit Sie sie auf Ihrer Kirchenwebsite, in E-Mails oder überall sonst online einfügen können.
- **Download PNG** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, in Gemeindebriefen oder auf Schildern drucken können.

:::tip
Fügen Sie den Anmeldelink auf der Seite „Plan Your Visit“ oder „I'm New“ Ihrer Kirchenwebsite hinzu, damit Gäste sich schon vor ihrer Ankunft anmelden können.
:::

### Was nach der Anmeldung eines Gastes geschieht

B1 sucht zuerst nach Personen, die bereits unter **People** erfasst sind. Ein Familienmitglied wird einer bestehenden Person zugeordnet, wenn genau eine Person denselben Vornamen und dieselbe E-Mail-Adresse oder Telefonnummer hat. Ein Kind, das ohne E-Mail-Adresse oder Telefonnummer angegeben wurde, wird anhand des Vornamens innerhalb des zugeordneten Haushalts zugeordnet. Zugeordnete Personen werden unverändert übernommen – die Anmeldung ändert ihre Angaben oder ihren Mitgliedsstatus nie – und neue Personen werden dem zugeordneten Haushalt hinzugefügt.

Wenn keine Zuordnung gefunden wird, legt die Anmeldung einen neuen Haushalt an, der nach dem Nachnamen des Hauptkontakts benannt wird, mit einem Personendatensatz für jedes Familienmitglied. Alle neuen Personen werden unter **People** mit dem Mitgliedsstatus **Visitor** erfasst, wobei der Hauptkontakt als Haupt des Haushalts eingetragen wird.

Zugeordnete und neue Personen werden der von Ihnen gewählten Gruppe hinzugefügt (sofern sie noch nicht Mitglied sind) und, wenn diese Option aktiviert ist, wird ihre Anwesenheit erfasst. Kommentare werden als Notiz beim Hauptkontakt gespeichert.

Um automatisch nachzufassen, fügen Sie einen [Workflow-Auslöser](../serving/workflows.md#triggers) hinzu, etwa **Person · Created** mit der Bedingung *Membership Status is Visitor*, oder **Group · Member Joined** für die von Ihnen oben gewählte Gruppe.

## Was erfasst wird

Jeder Check-in erzeugt einen Anwesenheitsdatensatz in B1 Admin. Sie können diese Datensätze auf der Seite [Attendance](tracking-attendance.md) sowie in den [Sitzungen jeder Gruppe](../groups/group-members.md) einsehen, genau wie manuell erfasste Anwesenheiten. Es gibt keinen Unterschied in der Darstellung der Daten – beide Methoden fließen in dieselben Berichte ein.
