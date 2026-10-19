---
title: "Check-in"
---

# Check-in

<div class="article-intro">

B1 Admin unterstützt das Selbst-Check-in bei Gottesdiensten über die zugehörige App **B1 Checkin**. Mitglieder können sich und ihre Familien bei Ankunft an Kiosken oder dedizierten Geräten einchecken. Das geht schnell und entlastet Ihre Ehrenamtlichen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen im [Anwesenheits-Setup](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardware-Empfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es

Die App B1 Checkin verbindet sich mit Ihrem Anwesenheits-Setup in B1 Admin. Wenn sich ein Mitglied einchecken, wird seine Anwesenheit automatisch dem richtigen Standort, der richtigen Gottesdienstzeit und der richtigen Gruppe zugeordnet. Für Personen, die das Check-in-System nutzen, müssen Sie keine Anwesenheit manuell eintragen.

## Check-in einrichten

1. **Richten Sie zuerst Ihre Anwesenheitsstruktur ein.** Gehen Sie in B1 Admin zu **Personen > Anwesenheit** und klicken Sie auf **Einrichtung**, um sicherzustellen, dass Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind. Die App für den Check-in stützt sich auf diese Konfiguration. Optional können Sie jeder Gottesdienstzeit einen [Check-in-Zeitplan](setup.md#setting-a-check-in-schedule) zuweisen, damit sich der Check-in jede Woche automatisch öffnet und schließt. Zeitpläne verwenden die Zeitzone Ihrer Kirche oder – falls für die Kirche keine festgelegt ist – die Zeitzone Ihres Standorts. Der Kiosk blendet Gottesdienstzeiten aus, deren Zeitfenster geschlossen ist, und teilt Familien mit, wenn der Check-in noch nicht geöffnet ist. Einzelheiten finden Sie unter [Anwesenheits-Setup](setup.md).
2. **Installieren Sie die App B1 Checkin** auf den Geräten, die Sie verwenden möchten. Die App ist für folgende Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android-/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon-Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der App B1 Checkin** mit den Zugangsdaten Ihrer Kirche an.
4. **Wählen Sie Standort und Gottesdienstzeit** für die aktuelle Zusammenkunft aus.
5. Mitglieder können nun auf dem Gerät nach ihrem Namen suchen und einchecken.

:::tip
Stellen Sie die Check-in-Geräte an gut sichtbaren, leicht erreichbaren Orten auf, etwa am Foyer-Eingang oder am Empfangstisch. Eine kurze Ankündigung während der Gottesdienste hilft den Mitgliedern zu wissen, dass diese Möglichkeit besteht.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort im [Anwesenheits-Setup](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware {#recommended-hardware}

**Tablets** – eine dieser Optionen funktioniert gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10,5"
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
Folgen Sie der Einrichtungsanleitung Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Brother-Druckertreiber und Einrichtungsanleitungen finden Sie auf der [Brother-Supportseite](https://support.brother.com).
:::

## Aussehen des Kiosks anpassen

Sie können das Erscheinungsbild der App B1 Checkin an das Design Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobil > B1 CheckIn** und verwenden Sie die Karte **Kiosk-Design**, um Folgendes zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an das Design Ihrer Kirche an:

- **Primär** und **Primärkontrast** – Hauptmarkenfarbe und ihre Textfarbe.
- **Sekundär** und **Sekundärkontrast** – Akzentfarbe und ihre Textfarbe.
- **Kopfzeilen-Hintergrund** und **Unterkopfzeilen-Hintergrund** – Farben für die Kopfbereiche des Kiosks.
- **Schaltflächen-Hintergrund** und **Schaltflächen-Text** – Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie optional ein Hintergrundbild für die Begrüßungs- und Suchbildschirme des Kiosks hoch. Die empfohlene Größe beträgt 1920 x 1080 Pixel.

### Ruhebildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der nach einer Zeit ohne Eingabe aktiv wird:

1. Schalten Sie den Ruhebildschirm **ein** oder **aus**.
2. Legen Sie das **Zeitlimit** fest (wie viele Sekunden ohne Eingabe vergehen, bevor der Bildschirmschoner startet; mindestens 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu – jede Folie hat ein Bild und eine Anzeigedauer (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Ruhebildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gästeregistrierung per QR-Code

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie selbst auf ihrem Telefon zu registrieren. Das beschleunigt den Check-in für Erstbesucher.

Wenn ein Gast den QR-Code scannt, gelangt er zu einer [Seite zur Gästeregistrierung](../../b1-church/checkin/guest-registration), auf der er seinen Namen, seine E-Mail-Adresse und Familienmitglieder eingibt. Ein Ehrenamtlicher kann ihn dann am Kiosk suchen und einchecken.

### QR-Gästeregistrierung aktivieren

So schalten Sie die Anzeige des QR-Codes ein:

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **B1 CheckIn**.
3. Schalten Sie **QR-Gästeregistrierung** ein und klicken Sie auf **Speichern**.

:::note
Diese Einstellung befindet sich unter **Mobil > B1 CheckIn** (auf derselben Seite wie die Karte **Kiosk-Design**), nicht unter Anwesenheit. Die Aktion **Kiosk** auf der Seite Anwesenheit enthält einen Link zu dieser Seite.
:::

### Den Registrierungslink teilen

Sobald die QR-Gästeregistrierung aktiviert ist, erscheint unter dem Schalter der Abschnitt **Registrierungs-QR-Code teilen**. Damit erhalten Sie zwei Möglichkeiten, Gäste zum Registrierungsformular zu bringen, zusätzlich zum QR-Code des Kiosks:

- **Link kopieren** – kopiert die Registrierungs-URL, damit Sie sie auf Ihrer Kirchenwebsite, in E-Mails oder überall sonst online einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, im Gemeindebrief oder auf Beschilderungen drucken können.

:::tip
Fügen Sie den Registrierungslink auf der Seite „Ihr Besuch“ oder „Ich bin neu“ Ihrer Kirchenwebsite hinzu, damit sich Gäste schon vor ihrer Ankunft registrieren können.
:::

## Was erfasst wird

Jeder Check-in erstellt einen Anwesenheitseintrag in B1 Admin. Sie können diese Einträge auf der Seite [Anwesenheit](tracking-attendance.md) sowie in den [Gottesdiensten jeder Gruppe](../groups/group-members.md) einsehen, genau wie manuell erfasste Anwesenheiten. Die Daten werden in keiner Weise anders dargestellt – beide Methoden fließen in dieselben Berichte ein.
