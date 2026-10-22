---
title: "Check-in"
---

# Check-in

<div class="article-intro">

B1 Admin unterstützt das Selbst-Check-in bei Gottesdiensten über die zugehörige App **B1 Checkin**. Mitglieder können sich und ihre Familien bei Ankunft an Kiosken oder dedizierten Geräten einchecken. Das beschleunigt den Ablauf und entlastet Ihre Ehrenamtlichen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen im [Anwesenheits-Setup](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardwareempfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es

Die App B1 Checkin ist mit Ihrem Anwesenheits-Setup in B1 Admin verbunden. Wenn ein Mitglied eincheckt, wird seine Anwesenheit automatisch dem richtigen Standort, der richtigen Gottesdienstzeit und der richtigen Gruppe zugeordnet. Für Personen, die das Check-in-System nutzen, müssen Sie die Anwesenheit nicht manuell eintragen.

## Check-in einrichten

1. **Richten Sie zuerst Ihre Anwesenheitsstruktur ein.** Gehen Sie in B1 Admin zu **Personen > Anwesenheit** und klicken Sie auf **Setup**, um sicherzustellen, dass Ihre Standorte, Gottesdienstzeiten und Gruppen angelegt sind. Die Check-in-App stützt sich auf diese Konfiguration. Optional können Sie jeder Gottesdienstzeit einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) zuweisen, damit sich der Check-in jede Woche automatisch öffnet und schließt. Zeitpläne verwenden die Zeitzone des Standorts des Gottesdienstes oder die Zeitzone Ihrer Kirche, falls der Standort keine hat. Der Kiosk zeigt Gottesdienstzeiten, deren Zeitfenster geschlossen ist, als **Geschlossen** an und teilt Familien mit, wann der Check-in öffnet. Einzelheiten finden Sie unter [Anwesenheits-Setup](setup.md).
2. **Installieren Sie die App B1 Checkin** auf den Geräten, die Sie verwenden möchten. Die App ist für folgende Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon-Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der App B1 Checkin** mit den Zugangsdaten Ihrer Kirche an.
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Zusammenkunft aus.
5. Mitglieder können jetzt auf dem Gerät nach ihrem Namen suchen und einchecken.

:::tip
Stellen Sie die Check-in-Geräte an gut sichtbaren, leicht erreichbaren Orten auf, etwa am Eingang der Lobby oder am Empfangstisch. Eine kurze Durchsage während der Gottesdienste hilft Mitgliedern zu wissen, dass diese Möglichkeit besteht.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort in [Anwesenheits-Setup](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware {#recommended-hardware}

**Tablets** – folgende Modelle funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10,5"
- **Günstig:** Amazon Fire HD 10

**Drucker** – für den Druck von Namensschildern funktionieren Check-ins mit Brother-Etikettendruckern:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Günstig:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der App B1 Checkin kompatibel. Drucker anderer Marken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Brother-Treiber und Einrichtungsanleitungen finden Sie auf der [Brother-Support-Seite](https://support.brother.com).
:::

## Aussehen des Kiosks anpassen

Sie können das Erscheinungsbild der App B1 Checkin an das Design Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobile > B1 CheckIn** und verwenden Sie die Karte **Kiosk-Design**, um Folgendes festzulegen:

### Farben

Passen Sie acht Farbeinstellungen an das Design Ihrer Kirche an:

- **Primär** und **Primärkontrast** – Hauptfarbe der Marke und ihre Textfarbe.
- **Sekundär** und **Sekundärkontrast** – Akzentfarbe und ihre Textfarbe.
- **Kopfzeilenhintergrund** und **Unterkopfzeilenhintergrund** – Farben für die Kopfbereiche des Kiosks.
- **Schaltflächenhintergrund** und **Schaltflächentext** – Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie optional ein Hintergrundbild für die Willkommens- und Suchbildschirme des Kiosks hoch. Die empfohlene Größe beträgt 1920x1080 Pixel.

### Ruhebildschirm / Bildschirmschoner

Richten Sie einen Bildschirmschoner ein, der nach einer Zeit ohne Eingabe aktiv wird:

1. Schalten Sie den Ruhebildschirm **ein** oder **aus**.
2. Legen Sie das **Zeitlimit** fest (wie viele Sekunden ohne Eingabe vergehen, bevor der Bildschirmschoner startet, mindestens 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu. Jede Folie hat ein Bild und eine Anzeigedauer (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk gerade nicht benutzt wird.
:::

## Gästeregistrierung per QR-Code

Der Check-in-Kiosk kann einen QR-Code anzeigen, über den Besucher sich und ihre Familie mit ihrem eigenen Smartphone registrieren können. Das beschleunigt den Check-in für Erstgäste.

Wenn ein Gast den QR-Code scannt, gelangt er zu einer [Seite zur Gästeregistrierung](../../b1-church/checkin/guest-registration), auf der er seinen Namen, seine E-Mail-Adresse und seine Familienmitglieder angibt. Ein Ehrenamtlicher kann diese Angaben dann am Kiosk nachschlagen und den Gast einchecken.

### QR-Gästeregistrierung aktivieren

So schalten Sie die Anzeige des QR-Codes ein:

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Mobile** auf.
2. Klicken Sie auf **B1 CheckIn**.
3. Schalten Sie **QR-Gästeregistrierung** ein und klicken Sie auf **Speichern**.

:::note
Diese Einstellung finden Sie unter **Mobile > B1 CheckIn** (auf derselben Seite wie die Karte **Kiosk-Design**), nicht unter Anwesenheit. Die Aktion **Kiosk** auf der Anwesenheitsseite enthält einen Link zu dieser Seite.
:::

### Den Registrierungslink teilen

Sobald die QR-Gästeregistrierung aktiviert ist, erscheint unterhalb des Schalters der Bereich **Registrierungs-QR-Code teilen**. Damit haben Sie zusätzlich zum QR-Code am Kiosk zwei Möglichkeiten, Gäste zum Registrierungsformular zu bringen:

- **Link kopieren** – kopiert die Registrierungs-URL, damit Sie sie auf Ihrer Kirchenwebsite, in E-Mails oder überall online einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, in Gemeindebriefen oder auf Beschilderungen drucken können.

:::tip
Fügen Sie den Registrierungslink auf der Seite „Planen Sie Ihren Besuch“ oder „Ich bin neu“ Ihrer Kirchenwebsite hinzu, damit Gäste sich schon vor ihrer Ankunft registrieren können.
:::

## Was erfasst wird

Jeder Check-in erzeugt einen Anwesenheitseintrag in B1 Admin. Sie können diese Einträge auf der Seite [Anwesenheit](tracking-attendance.md) sowie in den Sitzungen der [jeweiligen Gruppe](../groups/group-members.md) einsehen, genau wie manuell erfasste Anwesenheit. Es gibt keinen Unterschied in der Darstellung – beide Methoden fließen in dieselben Berichte ein.
