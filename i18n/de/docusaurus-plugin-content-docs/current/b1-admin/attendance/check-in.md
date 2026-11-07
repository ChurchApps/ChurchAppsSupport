---
title: "Selbst-Check-in einrichten mit B1 Checkin und B1 Admin"
sidebar_label: "Check-in"
description: "Richten Sie die Selbst-Check-in für Gottesdienste mit der B1-Checkin-App in B1 Admin ein: Geräte, Kiosk-Konten, Zeitpläne, Branding und QR-Gästeanmeldung."
---

# Check-in

<div class="article-intro">

B1 Admin unterstützt die Selbst-Anmeldung bei Gottesdiensten über die zugehörige App **B1 Checkin**. Mitglieder können sich und ihre Familien beim Eintreffen an Kiosken oder dedizierten Geräten selbst einchecken. Das beschleunigt den Ablauf und entlastet Ihre Ehrenamtlichen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheits-Einrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie brauchen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardware-Empfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es

Die App B1 Checkin ist mit Ihrer Anwesenheits-Einrichtung in B1 Admin verbunden. Wenn sich ein Mitglied einchecken, wird seine Anwesenheit automatisch dem richtigen Standort, der richtigen Gottesdienstzeit und der richtigen Gruppe zugeordnet. Für Personen, die das Check-in-System nutzen, müssen Sie die Anwesenheit nicht manuell erfassen.

## Check-in einrichten

1. **Richten Sie zuerst Ihre Anwesenheitsstruktur ein.** Gehen Sie in B1 Admin zu **Personen > Anwesenheit** und klicken Sie auf **Einrichtung**, um sicherzustellen, dass Ihre Standorte, Gottesdienstzeiten und Gruppen angelegt sind. Die Check-in-App stützt sich auf diese Konfiguration. Optional können Sie jeder Gottesdienstzeit einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) geben, damit der Check-in jede Woche automatisch öffnet und schließt. Zeitpläne verwenden die Zeitzone des Standorts des Gottesdienstes oder, falls für den Standort keine hinterlegt ist, die Zeitzone Ihrer Kirche. Der Kiosk zeigt Gottesdienstzeiten, deren Zeitfenster geschlossen ist, als **Geschlossen** an und teilt Familien mit, wann der Check-in öffnet. Details finden Sie unter [Anwesenheits-Einrichtung](setup.md).
2. **Installieren Sie die App B1 Checkin** auf den Geräten, die Sie verwenden möchten. Die App ist für folgende Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon-Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der App B1 Checkin an** – mit einem Konto, das die Berechtigung **Checkin** für Anwesenheit (oder **Anwesenheit bearbeiten**) besitzt. Siehe [Konten für Check-in-Kioske](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Wählen Sie Standort und Gottesdienstzeit** für die aktuelle Zusammenkunft aus.
5. Mitglieder können nun auf dem Gerät nach ihrem Namen suchen und sich einchecken.

:::tip
Stellen Sie die Check-in-Geräte an gut sichtbaren und leicht erreichbaren Orten auf, zum Beispiel am Eingang des Foyers oder am Empfangstisch. Eine kurze Ankündigung während der Gottesdienste hilft Mitgliedern, von dieser Möglichkeit zu wissen.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort in der [Anwesenheits-Einrichtung](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware {#recommended-hardware}

**Tablets** – folgende Geräte funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Drucker** – Check-ins funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Budget:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren zum Drucken von Namensschildern nicht.
:::

:::info
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netz wie Ihr Tablet zu verbinden. Brother-Druckertreiber und Einrichtungsanleitungen finden Sie auf der [Brother-Supportseite](https://support.brother.com).
:::

## Erscheinungsbild des Kiosks anpassen

Sie können das Aussehen der App B1 Checkin an das Erscheinungsbild Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobil > B1 CheckIn** und verwenden Sie die Karte **Kiosk-Design**, um Folgendes festzulegen:

### Farben

Passen Sie acht Farbeinstellungen an das Erscheinungsbild Ihrer Kirche an:

- **Primär** und **Primärkontrast** – Hauptfarbe der Marke und ihre Textfarbe.
- **Sekundär** und **Sekundärkontrast** – Akzentfarbe und ihre Textfarbe.
- **Kopfzeilen-Hintergrund** und **Unterkopfzeilen-Hintergrund** – Farben für die Kopfbereiche des Kiosks.
- **Schaltflächen-Hintergrund** und **Schaltflächentext** – Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie optional ein Hintergrundbild für die Begrüßungs- und Suchbildschirme des Kiosks hoch. Die empfohlene Größe beträgt 1920x1080 Pixel.

### Ruhebildschirm / Bildschirmschoner

Richten Sie einen Bildschirmschoner ein, der nach einer Zeit der Inaktivität startet:

1. Schalten Sie den Ruhebildschirm **ein** oder **aus**.
2. Legen Sie das **Zeitlimit** fest (wie viele Sekunden Inaktivität vergehen, bevor der Bildschirmschoner startet, mindestens 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu – jede Folie hat ein Bild und eine Anzeigedauer (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gästeregistrierung per QR-Code {#guest-registration-via-qr-code}

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie selbst auf ihrem Telefon zu registrieren. Das beschleunigt den Check-in für Erstbesucher.

Wenn ein Gast den QR-Code scannt, gelangt er zu einer [Seite zur Gästeregistrierung](../../b1-church/checkin/guest-registration.md), auf der er die Namen seiner Familie und weitere Angaben eingeben kann, die Sie abfragen möchten. Ein Ehrenamtlicher kann den Gast dann am Kiosk suchen und einchecken.

### QR-Gästeregistrierung aktivieren

So schalten Sie die Anzeige des QR-Codes ein:

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **B1 CheckIn**.
3. Schalten Sie **QR-Gästeregistrierung** ein und klicken Sie auf **Speichern**.

:::note
Diese Einstellung befindet sich unter **Mobil > B1 CheckIn** (auf derselben Seite wie die Karte **Kiosk-Design**), nicht unter Anwesenheit. Die Aktion **Kiosk** auf der Anwesenheitsseite enthält einen Link zu dieser Seite.
:::

Sobald der Schalter eingeschaltet ist, erscheinen die weiteren Optionen unten in derselben Karte **QR-Gästeregistrierung**. Klicken Sie nach dem Ändern einer dieser Optionen auf **Speichern** in der Karte.

### Anmeldefelder auswählen

Die Checkliste **Anmeldefelder** legt fest, was das Registrierungsformular abfragt. **Vorname** und **Nachname** sind immer im Formular enthalten und für jedes Familienmitglied immer erforderlich. Bei jedem anderen Feld aktivieren Sie **Einbeziehen**, um es dem Formular hinzuzufügen, und anschließend **Pflichtfeld**, wenn Gäste es ausfüllen müssen. **Pflichtfeld** kann nur für ein einbezogenes Feld aktiviert werden, und wenn Sie **Einbeziehen** deaktivieren, wird es zurückgesetzt.

| Feld | Abgefragt | Standardmäßig enthalten |
|------|-----------|-------------------------|
| **E-Mail** | Nur Hauptkontakt | Ja (optional) |
| **Telefon** | Nur Hauptkontakt | Ja (optional) |
| **Wohnadresse** | Einmal für die Familie – Straße, Adresszeile 2, Ort, Bundesland und PLZ. Ist das Feld erforderlich, müssen alle Angaben außer Adresszeile 2 ausgefüllt werden. Die Adresse wird bei jedem Familienmitglied gespeichert. | Nein |
| **Geburtsdatum** | Jedes Familienmitglied | Nein |
| **Geschlecht** | Jedes Familienmitglied | Nein |
| **Familienstand** | Nur Hauptkontakt | Nein |
| **Klasse** | Jedes Familienmitglied (PreK bis 12 oder Abschluss) | Nein |
| **Kommentare** | Einmal, in einem Feld unterhalb der Familienmitglieder (bis zu 1.000 Zeichen) | Nein |

Deaktivierte Felder werden niemals gespeichert, selbst wenn jemand sie auf anderem Weg an die Anmeldung übermittelt. Kommentare werden als Notiz im Datensatz des Hauptkontakts gespeichert (als „Gästeanmeldung“ vermerkt), sodass Sie sie im Abschnitt **Notizen** von dessen Profil lesen können.

### Gäste einer Gruppe zuordnen

Verwenden Sie **Neue Gäste der Gruppe hinzufügen**, um alle Anmeldungen automatisch einer Ihrer Gruppen zuzuordnen – zum Beispiel einer Gruppe „Neue Gesichter“ oder einer Gruppe für die Veranstaltung dieses Wochenendes. Wählen Sie **Keine** (die Voreinstellung), um diesen Schritt zu überspringen. Gäste sehen die Gruppe nie und können sie nicht auswählen; sie wird ausschließlich hier festgelegt. Ändern Sie sie vor jeder Veranstaltung, damit Sie die Gäste dieser Veranstaltung gemeinsam nachverfolgen können.

### Anwesenheit erfassen

Wenn eine Gruppe ausgewählt ist, erscheint ein Schalter **Anwesenheit ebenfalls erfassen**. Schalten Sie ihn ein, damit Gäste bei ihrer Anmeldung sofort als anwesend markiert werden und Sie sie nicht separat einchecken müssen.

Die Anwesenheit wird nur erfasst, wenn die Anmeldung während eines **planmäßigen** Gottesdienstes der ausgewählten Gruppe erfolgt:

- Die Gruppe muss mit einer oder mehreren Gottesdienstzeiten verknüpft sein, und diese Gottesdienstzeiten müssen einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) (einen **Tag** und eine **Startzeit**) haben.
- „Während“ bedeutet innerhalb des Check-in-Fensters dieser Gottesdienstzeit – von den Minuten **Check-in öffnen** vor dem Beginn bis zu den Minuten **Check-in schließen** nach dem Ende (oder nach dem Beginn, falls keine Endzeit festgelegt ist), jeweils in der Zeitzone, die der Check-in-Zeitplan verwendet.
- Jedes Familienmitglied wird für jede der Gottesdienstzeiten der Gruppe, die in diesem Moment geöffnet ist, am heutigen Datum als anwesend in der Gruppe markiert.
- Anmeldungen zu anderen Zeiten oder für eine Gruppe, deren Gottesdienstzeiten keinen Zeitplan haben, werden der Gruppe hinzugefügt, aber nicht als Anwesenheit gezählt.

### Kopfbild

Klicken Sie unter **Kopfbild** auf **Foto ändern**, um ein Bild auszuwählen oder hochzuladen (es wird auf ein 16:9-Format zugeschnitten), das oben auf der Registrierungsseite anstelle des Standardsymbols angezeigt wird. Klicken Sie auf **Entfernen**, um wieder das Symbol zu verwenden.

### Den Registrierungslink teilen

Sobald die QR-Gästeregistrierung aktiviert ist, erscheint am unteren Rand der Karte der Abschnitt **Registrierungs-QR-Code teilen**. Damit haben Sie zwei Möglichkeiten, Gäste über den QR-Code am Kiosk hinaus zum Registrierungsformular zu bringen:

- **Link kopieren** – kopiert die Registrierungs-URL, damit Sie sie auf Ihrer Kirchenwebsite, in E-Mails oder überall online einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, im Gemeindebrief oder auf Beschilderungen drucken können.

:::tip
Fügen Sie den Registrierungslink auf der Seite „Ihr Besuch“ oder „Ich bin neu“ Ihrer Kirchenwebsite hinzu, damit sich Gäste schon vor ihrer Ankunft registrieren können.
:::

### Was nach der Anmeldung eines Gastes passiert

B1 sucht zuerst nach Personen, die bereits unter **Personen** erfasst sind. Ein Familienmitglied wird einer bestehenden Person zugeordnet, wenn genau eine Person denselben Vornamen und dieselbe E-Mail-Adresse oder Telefonnummer hat. Ein Kind, das ohne E-Mail-Adresse oder Telefonnummer eingegeben wurde, wird über den Vornamen innerhalb des zugeordneten Haushalts zugeordnet. Zugeordnete Personen werden unverändert übernommen – die Anmeldung ändert ihre Angaben oder ihren Mitgliedsstatus niemals – und neue Personen werden dem zugeordneten Haushalt hinzugefügt.

Wird niemand zugeordnet, legt die Anmeldung einen neuen Haushalt an, der nach dem Nachnamen des Hauptkontakts benannt ist, mit einem Personendatensatz für jedes Familienmitglied. Alle neuen Personen werden unter **Personen** mit dem Mitgliedsstatus **Besucher** erfasst, wobei der Hauptkontakt als Haushaltsvorstand eingetragen wird.

Zugeordnete und neue Personen werden gleichermaßen der gewählten Gruppe hinzugefügt (sofern sie noch nicht Mitglied ist), und ihre Anwesenheit wird erfasst, sofern dies aktiviert ist. Kommentare werden als Notiz beim Hauptkontakt gespeichert.

Um automatisch nachzufassen, fügen Sie einen [Workflow-Auslöser](../serving/workflows.md#triggers) hinzu, zum Beispiel **Person · Erstellt** mit der Bedingung *Mitgliedsstatus ist Besucher*, oder **Gruppe · Mitglied beigetreten** für die oben gewählte Gruppe.

## Was erfasst wird

Jeder Check-in erzeugt einen Anwesenheitsdatensatz in B1 Admin. Sie können diese Datensätze auf der Seite [Anwesenheit](tracking-attendance.md) und in den [Sitzungen](../groups/group-members.md) jeder Gruppe einsehen, genau wie manuell erfasste Anwesenheit. Es gibt keinen Unterschied in der Darstellung der Daten – beide Methoden fließen in dieselben Berichte ein.
