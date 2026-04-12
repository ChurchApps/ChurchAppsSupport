---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin unterstützt den Self-Check-in bei Gottesdiensten über die Begleit-App **B1 Checkin**. Mitglieder können sich und ihre Familien an Kiosken oder dedizierten Geräten einchecken, wenn sie ankommen. Das macht den Vorgang schnell und reduziert die Arbeitsbelastung Ihrer Ehrenamtlichen. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheitseinrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit eingerichteten [Haushalten](../people/adding-people.md#managing-households), damit Familien gemeinsam einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardware-Empfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es

Die B1 Checkin-App verbindet sich mit Ihrer B1 Admin-Anwesenheitseinrichtung. Wenn sich ein Mitglied eincheckt, wird die Anwesenheit automatisch für den richtigen Standort, die Gottesdienstzeit und die Gruppe erfasst. Sie müssen die Anwesenheit für niemanden manuell eingeben, der das Check-in-System nutzt.

## Check-In einrichten

1. **Konfigurieren Sie zuerst Ihre Anwesenheitsstruktur.** Gehen Sie in B1 Admin zu **Anwesenheit > Einrichtung** und stellen Sie sicher, dass Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind. Die Check-in-App basiert auf dieser Konfiguration. Siehe [Anwesenheitseinrichtung](setup.md) für Details.
2. **Installieren Sie die B1 Checkin-App** auf den Geräten, die Sie verwenden möchten. Die App ist auf folgenden Plattformen verfügbar:
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich in der B1 Checkin-App an** mit den Zugangsdaten Ihres Gemeindekontos.
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Veranstaltung.
5. Mitglieder können nun auf dem Gerät nach ihrem Namen suchen und einchecken.

:::tip
Platzieren Sie Check-in-Geräte an gut sichtbaren, leicht erreichbaren Stellen wie Lobby-Eingängen oder Empfangstheken. Eine kurze Ankündigung während der Gottesdienste hilft Mitgliedern zu erfahren, dass diese Option verfügbar ist.
:::

:::tip
Wenn Ihre Gemeinde mehrere Standorte hat, müssen Sie die Einrichtung für jeden Standort in der [Anwesenheitseinrichtung](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** — diese funktionieren alle gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Drucker** — Check-ins funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste Wahl:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WLAN)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WLAN)
- **Budget:** Brother QL-1100 (nur WLAN)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der B1 Checkin-App kompatibel. Andere Druckermarken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Befolgen Sie die Einrichtungsanweisungen Ihres Druckers, um ihn mit demselben WLAN-Netzwerk wie Ihr Tablet zu verbinden. Brother-Druckertreiber und Einrichtungsanleitungen finden Sie auf der [Brother-Support-Website](https://support.brother.com).
:::

## Anpassen des Kiosk-Erscheinungsbilds

Sie können das Erscheinungsbild der B1 Checkin-App an das Branding Ihrer Gemeinde anpassen. Gehen Sie in B1 Admin zu **Anwesenheit > Kiosk-Design**, um Folgendes zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an Ihr Gemeinde-Branding an:

- **Primär** und **Primär-Kontrast** -- Hauptmarkenfarbe und deren Textfarbe.
- **Sekundär** und **Sekundär-Kontrast** -- Akzentfarbe und deren Textfarbe.
- **Kopfzeilen-Hintergrund** und **Unterkopfzeilen-Hintergrund** -- Farben für die Kiosk-Kopfzeilenbereiche.
- **Schaltflächen-Hintergrund** und **Schaltflächen-Text** -- Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie ein optionales Hintergrundbild für den Kiosk-Willkommens- und Suchbildschirm hoch. Empfohlene Größe ist 1920x1080 Pixel.

### Leerlaufbildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der nach einer Phase der Inaktivität aktiviert wird:

1. Schalten Sie den Leerlaufbildschirm **ein** oder **aus**.
2. Legen Sie das **Timeout** fest (wie viele Sekunden Inaktivität, bevor der Bildschirmschoner startet, mindestens 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu -- jede Folie hat ein Bild und eine Anzeigedauer (mindestens 3 Sekunden).

:::tip
Nutzen Sie den Leerlaufbildschirm, um Ankündigungen, bevorstehende Veranstaltungen oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gästeregistrierung per QR-Code

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen können, um sich und ihre Familie auf ihrem eigenen Telefon zu registrieren. Dies beschleunigt den Check-in-Prozess für erstmalige Gäste.

Wenn ein Gast den QR-Code scannt, wird er zu einer [Gästeregistrierungsseite](../../b1-church/checkin/guest-registration) weitergeleitet, auf der er seinen Namen, seine E-Mail-Adresse und Familienmitglieder eingeben kann. Ein Ehrenamtlicher kann sie dann am Kiosk nachschlagen und einchecken.

### QR-Gästeregistrierung aktivieren

So aktivieren Sie die QR-Code-Anzeige:

1. Gehen Sie in B1 Admin zu **Mobil** in der linken Seitenleiste (Telefonsymbol).
2. Wählen Sie den Tab **Check-In**.
3. Schalten Sie **QR-Gästeregistrierung** ein.

:::note
Diese Einstellung befindet sich unter **Mobil**, nicht unter Anwesenheit > Kiosk-Design.
:::

## Was erfasst wird

Jeder Check-in erstellt einen Anwesenheitsdatensatz in B1 Admin. Sie können diese Datensätze auf den Tabs [Anwesenheit](tracking-attendance.md) und [Gruppen](../groups/group-members.md) genauso einsehen wie manuell eingegebene Anwesenheit. Es gibt keinen Unterschied in der Darstellung der Daten — beide Methoden fließen in dieselben Berichte ein.
