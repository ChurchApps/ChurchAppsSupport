---
title: "Check-In"
---
# Check-In

<div class="article-intro">

B1 Admin unterstützt das Selbst-Check-In bei Gottesdiensten über die dazugehörige **B1 Checkin**-App. Mitglieder können sich und ihre Familien bei ihrer Ankunft an Kiosken oder dedizierten Geräten selbst einchecken. Das beschleunigt den Ablauf und verringert die Arbeitsbelastung Ihrer Ehrenamtlichen. Jedes Check-In wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheitseinrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit eingerichteten [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardware-Empfehlungen](#recommended-hardware) weiter unten).

</div>

## So funktioniert es

Die B1 Checkin-App verbindet sich mit Ihrer Anwesenheitseinrichtung in B1 Admin. Wenn sich ein Mitglied eincheckt, wird seine Anwesenheit automatisch für den richtigen Standort, die richtige Gottesdienstzeit und die richtige Gruppe erfasst. Für alle Personen, die das Check-In-System nutzen, müssen Sie die Anwesenheit nicht manuell eingeben.

## Check-In einrichten

1. **Konfigurieren Sie zuerst Ihre Anwesenheitsstruktur.** Gehen Sie in B1 Admin zu **Anwesenheit > Einrichtung** und stellen Sie sicher, dass Ihre Standorte, Gottesdienstzeiten und Gruppen angelegt sind. Die Check-In-App basiert auf dieser Konfiguration. Einzelheiten finden Sie unter [Anwesenheitseinrichtung](setup.md).
2. **Installieren Sie die B1 Checkin-App** auf den Geräten, die Sie verwenden möchten. Die App ist auf den folgenden Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android-/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der B1 Checkin-App an**, indem Sie die Zugangsdaten des Kontos Ihrer Gemeinde verwenden.
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Versammlung aus.
5. Mitglieder können nun auf dem Gerät nach ihrem Namen suchen und sich einchecken.

:::tip
Platzieren Sie die Check-In-Geräte an gut sichtbaren, leicht erreichbaren Orten wie Eingangsbereichen oder Empfangstheken. Eine kurze Ansage während des Gottesdienstes hilft den Mitgliedern zu erfahren, dass diese Möglichkeit besteht.
:::

:::tip
Wenn Ihre Gemeinde mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort in der [Anwesenheitseinrichtung](setup.md) wiederholen. Jedes Check-In-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** – alle diese Modelle funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10,5"
- **Preisgünstig:** Amazon Fire HD 10

**Drucker** – Check-Ins funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Preisgünstig:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der B1 Checkin-App kompatibel. Drucker anderer Marken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Treiber und Einrichtungsanleitungen für Brother-Drucker finden Sie auf der [Brother-Support-Website](https://support.brother.com).
:::

## Das Erscheinungsbild des Kiosks anpassen

Sie können das Aussehen der B1 Checkin-App an das Branding Ihrer Gemeinde anpassen. Gehen Sie in B1 Admin zu **Anwesenheit > Kiosk-Design**, um Folgendes zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an das Branding Ihrer Gemeinde an:

- **Primär** und **Primärkontrast** -- Hauptmarkenfarbe und deren Textfarbe.
- **Sekundär** und **Sekundärkontrast** -- Akzentfarbe und deren Textfarbe.
- **Kopfzeilen-Hintergrund** und **Unterkopfzeilen-Hintergrund** -- Farben für die Kopfbereiche des Kiosks.
- **Schaltflächen-Hintergrund** und **Schaltflächentext** -- Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie ein optionales Hintergrundbild für die Willkommens- und Suchbildschirme des Kiosks hoch. Die empfohlene Größe beträgt 1920x1080 Pixel.

### Ruhebildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der nach einer Zeit der Inaktivität aktiviert wird:

1. Schalten Sie den Ruhebildschirm **ein** oder **aus**.
2. Legen Sie die **Zeitüberschreitung** fest (wie viele Sekunden Inaktivität vergehen, bevor der Bildschirmschoner startet, mindestens 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu -- jede Folie hat ein Bild und eine Anzeigedauer (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gästeregistrierung per QR-Code

Der Check-In-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie über ihr eigenes Smartphone zu registrieren. Das beschleunigt den Check-In-Vorgang für Erstbesucher.

Wenn ein Gast den QR-Code scannt, gelangt er zu einer [Gästeregistrierungsseite](../../b1-church/checkin/guest-registration), auf der er seinen Namen, seine E-Mail-Adresse und seine Familienmitglieder eingibt. Eine ehrenamtliche Person kann den Gast anschließend am Kiosk heraussuchen und einchecken.

### QR-Gästeregistrierung aktivieren

So aktivieren Sie die Anzeige des QR-Codes:

1. Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Mobile**.
2. Wählen Sie den Tab **B1 CheckIn**.
3. Schalten Sie **QR-Gästeregistrierung** ein und klicken Sie auf **Speichern**.

:::note
Diese Einstellung finden Sie unter **Mobile**, nicht unter Anwesenheit > Kiosk-Design.
:::

### Den Registrierungslink teilen

Sobald die QR-Gästeregistrierung aktiviert ist, erscheint unterhalb des Schalters der Abschnitt **Registrierungs-QR-Code teilen**. Dieser bietet Ihnen über den Kiosk-QR-Code hinaus zwei weitere Möglichkeiten, Gäste zum Registrierungsformular zu führen:

- **Link kopieren** – kopiert die Registrierungs-URL, sodass Sie sie auf Ihrer Gemeinde-Website, in E-Mails oder an beliebigen Stellen im Internet einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, Gemeindebriefen oder Beschilderungen drucken können.

:::tip
Fügen Sie den Registrierungslink auf der Seite „Planen Sie Ihren Besuch" oder „Ich bin neu hier" Ihrer Gemeinde-Website ein, damit sich Gäste bereits vor ihrer Ankunft registrieren können.
:::

## Was erfasst wird

Jedes Check-In erstellt einen Anwesenheitseintrag in B1 Admin. Sie können diese Einträge in den Tabs [Anwesenheit](tracking-attendance.md) und [Gruppen](../groups/group-members.md) genauso einsehen wie manuell erfasste Anwesenheiten. Bei der Darstellung der Daten gibt es keinen Unterschied – beide Methoden fließen in dieselben Berichte ein.