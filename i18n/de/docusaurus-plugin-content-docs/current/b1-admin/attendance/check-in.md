---
title: "Selbst-Check-in einrichten mit B1 Checkin und B1 Admin"
sidebar_label: "Check-In"
description: "Richten Sie den Selbst-Check-in für Gottesdienste mit der App B1 Checkin in B1 Admin ein. Behandelt Geräte, Kiosk-Konten, Zeitpläne, Branding und QR-Gästeanmeldung."
---

# Check-In

<div class="article-intro">

B1 Admin unterstützt den Selbst-Check-in bei Gottesdiensten über die begleitende App **B1 Checkin**. Mitglieder können sich selbst und ihre Familien bei der Ankunft an Kiosken oder dedizierten Geräten einchecken. Das beschleunigt den Ablauf und entlastet Ihre Freiwilligen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheitseinrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardware-Empfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es {#how-it-works}

Die App B1 Checkin ist mit Ihrer Anwesenheitseinrichtung in B1 Admin verbunden. Wenn sich ein Mitglied einchecken, wird seine Anwesenheit automatisch dem richtigen Standort, der richtigen Gottesdienstzeit und der richtigen Gruppe zugeordnet. Für alle, die das Check-in-System nutzen, müssen Sie die Anwesenheit nicht manuell eingeben.

## Check-In einrichten {#setting-up-check-in}

1. **Richten Sie zuerst Ihre Anwesenheitsstruktur ein.** Gehen Sie in B1 Admin zu **Personen > Anwesenheit** und klicken Sie auf **Einrichtung**, um sicherzustellen, dass Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind. Die Check-in-App baut auf dieser Konfiguration auf. Optional können Sie jeder Gottesdienstzeit einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) zuweisen, damit der Check-in jede Woche automatisch geöffnet und geschlossen wird. Zeitpläne verwenden die Zeitzone des Standorts des Gottesdienstes oder die Zeitzone Ihrer Kirche, falls für den Standort keine festgelegt ist. Der Kiosk zeigt Gottesdienstzeiten, deren Zeitfenster geschlossen ist, als **Geschlossen** an und teilt Familien mit, wann der Check-in öffnet. Weitere Informationen finden Sie unter [Anwesenheitseinrichtung](setup.md).
2. **Installieren Sie die App B1 Checkin** auf den Geräten, die Sie verwenden möchten. Die App ist auf folgenden Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon-Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der App B1 Checkin an** und verwenden Sie dafür ein Konto mit der Anwesenheitsberechtigung **Checkin** (oder **Anwesenheit bearbeiten**). Siehe [Check-In-Kiosk-Konten](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Zusammenkunft aus.
5. Mitglieder können jetzt auf dem Gerät nach ihrem Namen suchen und sich einchecken.

:::tip
Stellen Sie die Check-in-Geräte an gut sichtbaren, leicht erreichbaren Orten auf, etwa am Eingang der Lobby oder am Empfangstisch. Eine kurze Ankündigung während der Gottesdienste hilft Mitgliedern zu wissen, dass diese Möglichkeit besteht.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort in der [Anwesenheitseinrichtung](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware {#recommended-hardware}

**Tablets** – alle diese Geräte funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10.5"
- **Preisgünstig:** Amazon Fire HD 10

**Drucker** – Check-ins funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Preisgünstig:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken können keine Namensschilder drucken.
:::

:::info
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Brother-Druckertreiber und Einrichtungsanleitungen finden Sie auf der [Brother-Support-Website](https://support.brother.com).
:::

## Das Erscheinungsbild des Kiosks anpassen {#customizing-the-kiosk-appearance}

Sie können das Aussehen der App B1 Checkin an das Branding Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobil > B1 CheckIn** (oder klicken Sie auf der Seite Anwesenheit auf **Kiosk**) und verwenden Sie die Karte **Kiosk-Design**. Klicken Sie nach Änderungen auf der Karte auf **Speichern**.

### Farben {#colors}

Der Kiosk verwendet dieselben Farben wie die App Ihrer Kirche. Legen Sie sie unter **Mobil > App-Design** fest. Die Karte Kiosk-Design hat keine eigenen Farbeinstellungen.

### Hintergrundbild {#background-image}

Klicken Sie unter **Hintergrundbild** auf **Bild hochladen**, um ein optionales Hintergrundbild für die Begrüßungs- und Suchbildschirme des Kiosks hinzuzufügen. Empfohlen wird eine Größe von 1920x1080 Pixeln. Mit **Bild ändern** oder **Entfernen** ersetzen oder löschen Sie es.

### Ruhebildschirm / Bildschirmschoner {#idle-screen--screensaver}

Richten Sie einen Bildschirmschoner ein, der nach einer Zeit ohne Eingabe aktiviert wird:

1. Öffnen Sie **Ruhebildschirm / Bildschirmschoner** und aktivieren Sie **Ruhebildschirm aktivieren**.
2. Legen Sie unter **Zeitlimit (Sekunden)** fest, wie viele Sekunden ohne Eingabe vergehen, bevor der Bildschirmschoner startet (mindestens 10).
3. Klicken Sie für jede Folie auf **Folie hinzufügen**, klicken Sie auf **Hochladen**, um ihr Bild auszuwählen, und legen Sie unter **Dauer (s)** die Anzeigedauer fest (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gästeanmeldung per QR-Code {#guest-registration-via-qr-code}

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie selbst auf ihrem Handy anzumelden. Das beschleunigt den Check-in für Erstbesucher.

Wenn ein Gast den QR-Code scannt, gelangt er auf eine [Seite zur Gästeanmeldung](../../b1-church/checkin/guest-registration.md), auf der er die Namen seiner Familie und alle weiteren Angaben eintragen kann, die Sie abfragen. Ein Freiwilliger kann ihn dann am Kiosk suchen und einchecken.

### QR-Gästeanmeldung aktivieren {#enabling-qr-guest-registration}

So schalten Sie die Anzeige des QR-Codes ein:

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **B1 CheckIn**.
3. Aktivieren Sie **QR-Gästeanmeldung** und klicken Sie auf **Speichern**.

:::note
Diese Einstellung finden Sie unter **Mobil > B1 CheckIn** (auf derselben Seite wie die Karte **Kiosk-Design**), nicht unter Anwesenheit. Die Aktion **Kiosk** auf der Seite Anwesenheit enthält einen Link zu dieser Seite.
:::

Sobald der Schalter aktiviert ist, erscheinen die folgenden Optionen auf derselben Karte **QR-Gästeanmeldung**. Klicken Sie nach Änderungen an diesen Optionen auf der Karte auf **Speichern**.

### Anmeldefelder auswählen {#choosing-sign-up-fields}

Die Checkliste **Anmeldefelder** legt fest, wonach das Anmeldeformular fragt. **Vorname** und **Nachname** sind immer im Formular enthalten und für jedes Familienmitglied immer erforderlich. Für jedes andere Feld aktivieren Sie **Einbeziehen**, um es dem Formular hinzuzufügen, und anschließend **Pflichtfeld**, wenn Gäste es ausfüllen müssen. **Pflichtfeld** kann nur für ein einbezogenes Feld aktiviert werden. Wenn Sie **Einbeziehen** deaktivieren, wird auch **Pflichtfeld** zurückgesetzt.

| Feld | Abgefragt für | Standardmäßig einbezogen |
|-------|-----------|---------------------|
| **Anrede** | Jedes Familienmitglied, als Auswahlliste vor dem Namen (Herr, Frau, Fräulein, Ms, Dr., Prof., Pfr., Pastor) | Nein |
| **E-Mail** | Nur Hauptkontakt | Ja (optional) |
| **Telefon** | Jedes Familienmitglied. Wenn ein Pflichtfeld, muss nur der Hauptkontakt es ausfüllen. | Ja (optional) |
| **Rolle im Haushalt** | Jedes Familienmitglied nach dem Hauptkontakt – Ehepartner, Kind oder Sonstige. Der Hauptkontakt ist Haushaltsvorstand eines neuen Haushalts. Wer keine Rolle angibt, wird als Sonstige gespeichert. | Ja (optional) |
| **Wohnadresse** | Einmal für die Familie – Straße, Adresszusatz, Ort, Bundesland und Postleitzahl. Wenn ein Pflichtfeld, müssen alle Angaben außer dem Adresszusatz ausgefüllt werden. Die Adresse wird bei jedem Familienmitglied gespeichert. | Nein |
| **Geburtsdatum** | Jedes Familienmitglied | Nein |
| **Geschlecht** | Jedes Familienmitglied | Nein |
| **Familienstand** | Nur Hauptkontakt | Nein |
| **Klassenstufe** | Jedes Familienmitglied (Vorschule bis 12, oder Abschluss) | Nein |
| **Kommentare** | Einmal, in einem Feld unterhalb der Familienmitglieder (bis zu 1.000 Zeichen) | Nein |

Deaktivierte Felder werden nie gespeichert, selbst wenn jemand sie auf anderem Weg an die Anmeldung übermittelt. Kommentare werden als Notiz im Datensatz des Hauptkontakts gespeichert (als „Gästeanmeldung“ gekennzeichnet), sodass Sie sie im Abschnitt **Notizen** seines Profils lesen können.

### Gäste einer Gruppe hinzufügen {#adding-guests-to-a-group}

Verwenden Sie **Neue Gäste der Gruppe hinzufügen**, um alle Personen, die sich anmelden, automatisch einer Ihrer Gruppen zuzuordnen, zum Beispiel einer Gruppe „Neue Gesichter“ oder einer Gruppe für die Veranstaltung dieses Wochenendes. Wählen Sie **Keine** (Standard), um dies zu überspringen. Gäste sehen die Gruppe nie und können sie nicht auswählen; sie wird nur hier festgelegt. Ändern Sie sie vor jeder Veranstaltung, damit Sie die Gäste dieser Veranstaltung gemeinsam nachverfolgen können.

### Anwesenheit erfassen {#recording-attendance}

Wenn eine Gruppe ausgewählt ist, erscheint der Schalter **Anwesenheit ebenfalls erfassen**. Aktivieren Sie ihn, damit Gäste im Moment der Anmeldung als anwesend markiert werden und Sie sie nicht separat einchecken müssen.

Anwesenheit wird nur erfasst, wenn die Anmeldung während einer **geplanten** Gottesdienstzeit der ausgewählten Gruppe erfolgt:

- Die Gruppe muss mit einer oder mehreren Gottesdienstzeiten verknüpft sein, und diese Gottesdienstzeiten müssen einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) haben (einen **Tag** und eine **Startzeit**).
- „Während“ bedeutet innerhalb des Check-in-Zeitfensters dieser Gottesdienstzeit – von den **Minuten für das Öffnen des Check-ins** vor dem Beginn bis zu den **Minuten für das Schließen des Check-ins** nach dem Ende (oder nach dem Beginn, wenn keine Endzeit festgelegt ist; ohne Endzeit und ohne Schließminuten bis zum Ende dieses Tages), jeweils in der Zeitzone, die der Check-in-Zeitplan verwendet.
- Jedes Familienmitglied wird für jede seiner Gottesdienstzeiten, die in diesem Moment geöffnet ist, am heutigen Datum als in der Gruppe anwesend markiert.
- Anmeldungen zu anderen Zeiten oder für eine Gruppe, deren Gottesdienstzeiten keinen Zeitplan haben, werden der Gruppe hinzugefügt, aber nicht als Teilnahme gezählt.

### Kopfbild {#header-photo}

Klicken Sie unter **Kopfbild** auf **Foto ändern**, um ein Bild auszuwählen oder hochzuladen (im Format 16:9 zugeschnitten), das oben auf der Anmeldeseite anstelle des Standardsymbols angezeigt wird. Klicken Sie auf **Entfernen**, um wieder das Symbol zu verwenden.

### Den Anmeldelink teilen {#sharing-the-registration-link}

Sobald die QR-Gästeanmeldung aktiviert ist, erscheint unten auf der Karte der Abschnitt **Anmelde-QR-Code teilen**. Er bietet zwei Möglichkeiten, Gäste außerhalb des QR-Codes am Kiosk zum Anmeldeformular zu bringen:

- **Link kopieren** – kopiert die Anmelde-URL, damit Sie sie auf Ihrer Kirchenwebsite, in E-Mails oder überall online einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, in Gemeindebriefen oder auf Schildern drucken können.

:::tip
Fügen Sie den Anmeldelink auf der Seite „Ihr Besuch“ oder „Ich bin neu“ Ihrer Kirchenwebsite hinzu, damit sich Gäste schon vor ihrer Ankunft anmelden können.
:::

### Was nach der Anmeldung eines Gastes passiert {#what-happens-after-a-guest-signs-up}

B1 sucht zuerst nach Personen, die bereits unter **Personen** erfasst sind. Ein Familienmitglied wird einer bestehenden Person zugeordnet, wenn genau eine Person denselben Vornamen und dieselbe E-Mail-Adresse oder Telefonnummer hat. Ein Kind, das ohne E-Mail-Adresse oder Telefonnummer eingetragen wird, wird anhand des Vornamens innerhalb des zugeordneten Haushalts zugeordnet. Zugeordnete Personen werden unverändert übernommen – die Anmeldung ändert ihre Angaben oder ihren Mitgliedsstatus nie – und neue Personen werden dem zugeordneten Haushalt hinzugefügt.

Wenn niemand zugeordnet werden kann, legt die Anmeldung einen neuen Haushalt an, der nach dem Nachnamen des Hauptkontakts benannt wird, mit einem Personendatensatz für jedes Familienmitglied. Alle neuen Personen werden unter **Personen** mit dem Mitgliedsstatus **Besucher** erfasst, wobei der Hauptkontakt Haushaltsvorstand ist.

Zugeordnete und neue Personen werden der von Ihnen gewählten Gruppe hinzugefügt (falls sie noch nicht Mitglied ist) und erhalten ihre Anwesenheit erfasst, wenn diese Option aktiviert ist. Kommentare werden als Notiz beim Hauptkontakt gespeichert.

Um automatisch nachzufassen, fügen Sie einen [Workflow-Auslöser](../serving/workflows.md#triggers) hinzu, etwa **Person · Erstellt** mit der Bedingung *Mitgliedsstatus ist Besucher*, oder **Gruppe · Mitglied beigetreten** für die oben gewählte Gruppe.

## Was erfasst wird {#what-gets-recorded}

Jeder Check-in erstellt einen Anwesenheitseintrag in B1 Admin. Sie können diese Einträge auf der Seite [Anwesenheit](tracking-attendance.md) und in den [Sitzungen jeder Gruppe](../groups/group-members.md) einsehen, genau wie manuell erfasste Anwesenheit. Es gibt keinen Unterschied in der Darstellung der Daten – beide Methoden fließen in dieselben Berichte ein.
