---
title: "Anmeldung"
---

# Anmeldung

<div class="article-intro">

B1 Admin unterstützt die Selbstanmeldung bei Veranstaltungen über die begleitende App **B1 Checkin**. Mitglieder können sich und ihre Familien bei der Ankunft an Kiosken oder dedizierten Geräten selbst anmelden, was den Prozess beschleunigt und die Belastung Ihrer Freiwilligen reduziert. Jede Anmeldung wird automatisch als Teilnahme erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in der [Anwesenheitseinrichtung](setup.md) konfiguriert werden.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushalten](../people/adding-people.md#managing-households), damit Familien sich gemeinsam anmelden können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardwareempfehlungen](#recommended-hardware) unten).

</div>

## Wie es funktioniert

Die B1 Checkin-App verbindet sich mit Ihrem B1 Admin-Anwesenheits-Setup. Wenn sich ein Mitglied anmeldet, wird seine Teilnahme automatisch gegen den richtigen Standort, die Gottesdienstzeit und die Gruppe erfasst. Sie müssen die Teilnahme nicht manuell für Personen eingeben, die das Anmeldungssystem verwenden.

## Anmeldung einrichten

1. **Konfigurieren Sie zunächst Ihre Anwesenheitsstruktur.** Gehen Sie in B1 Admin zu **Teilnahme > Einrichtung** und stellen Sie sicher, dass Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind. Die Anmelde-App basiert auf dieser Konfiguration. Weitere Informationen finden Sie unter [Anwesenheitseinrichtung](setup.md).
2. **Installieren Sie die B1 Checkin-App** auf den Geräten, die Sie verwenden möchten. Die App ist auf den folgenden Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich bei der B1 Checkin-App** mit Ihren Kirchenanmeldedaten an.
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Versammlung aus.
5. Mitglieder können nun auf dem Gerät nach ihrem Namen suchen und sich anmelden.

:::tip
Platzieren Sie Anmeldegeräte an sichtbaren, leicht erreichbaren Orten wie Eingangshalle oder Empfangstischen. Eine kurze Ankündigung während der Veranstaltung hilft Mitgliedern zu erkennen, dass die Option verfügbar ist.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie das Setup für jeden Standort in der [Anwesenheitseinrichtung](setup.md) wiederholen. Jedes Anmeldegerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** – diese funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10,5"
- **Budget:** Amazon Fire HD 10

**Drucker** – Anmeldungen funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WiFi)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WiFi)
- **Budget:** Brother QL-1100 (nur WiFi)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der B1 Checkin-App kompatibel. Andere Druckermarken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Folgen Sie den Anweisungen Ihres Druckers, um ihn mit dem gleichen WiFi-Netz wie Ihr Tablet zu verbinden. Sie finden Brother-Druckertreiber und Setupanweisungen auf der [Brother-Support-Website](https://support.brother.com).
:::

## Kiosk-Erscheinungsbild anpassen

Sie können das Erscheinungsbild der B1 Checkin-App an Ihr Kirchenbranding anpassen. Gehen Sie in B1 Admin zu **Mobil > B1 CheckIn** und verwenden Sie die Karte **Kiosk-Design** zum Konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an Ihr Kirchenbranding an:

- **Primär** und **Primärer Kontrast** – Hauptmarkenfarbe und ihre Textfarbe.
- **Sekundär** und **Sekundärer Kontrast** – Akzentfarbe und ihre Textfarbe.
- **Kopfzeilen-Hintergrund** und **Unterüberschrift-Hintergrund** – Farben für die Kiosk-Kopfzeilenbereiche.
- **Schaltflächenhintergrund** und **Schaltflächentext** – Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie ein optionales Hintergrundbild für die Kiosk-Willkommens- und Suchbildschirme hoch. Empfohlene Größe ist 1920 x 1080 Pixel.

### Leerlauf-Bildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der nach einer Inaktivitätsperiode aktiviert wird:

1. Aktivieren oder deaktivieren Sie den Leerlauf-Bildschirm.
2. Legen Sie das **Timeout** fest (wie viele Sekunden Inaktivität, bevor der Bildschirmschoner startet, Minimum 10 Sekunden).
3. Fügen Sie einen oder mehrere **Folien** hinzu – jede Folie hat ein Bild und eine Anzeigedauer (Minimum 3 Sekunden).

:::tip
Verwenden Sie den Leerlauf-Bildschirm, um Ankündigungen, bevorstehende Ereignisse oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv verwendet wird.
:::

## Gastregistrierung über QR-Code

Der Anmeldekiosk kann einen QR-Code anzeigen, den Besucher scannen können, um sich und ihre Familie auf ihrem eigenen Telefon zu registrieren. Dies beschleunigt den Anmeldeprozess für Erstbesucher.

Wenn ein Gast den QR-Code scannt, wird er zu einer [Gastregistrierungsseite](../../b1-church/checkin/guest-registration) weitergeleitet, auf der er seinen Namen, E-Mail-Adresse und Familienmitglieder eingibt. Ein Freiwilliger kann ihn dann auf dem Kiosk nachschlagen und anmelden.

### QR-Gastregistrierung aktivieren

Um die QR-Code-Anzeige einzuschalten:

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Mobil**.
2. Klicken Sie auf **B1 CheckIn**.
3. Aktivieren Sie **QR-Gastregistrierung** und klicken Sie auf **Speichern**.

:::note
Diese Einstellung befindet sich unter **Mobil > B1 CheckIn** (dieselbe Seite wie die Karte **Kiosk-Design**), nicht unter Teilnahme.
:::

### Registrierungslink freigeben

Sobald die QR-Gastregistrierung aktiviert ist, erscheint unterhalb der Schaltfläche ein Abschnitt **Registrierungs-QR-Code freigeben**. Dies gibt Ihnen zwei Möglichkeiten, Gäste zum Registrierungsformular zu führen, abgesehen vom Kiosk-QR-Code:

- **Link kopieren** – kopiert die Registrierungs-URL, damit Sie sie auf Ihrer Kirchenwebseite, in E-Mails oder überall online einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, Bulletins oder Beschilderung drucken können.

:::tip
Fügen Sie den Registrierungslink zur Seite "Plan Your Visit" oder "I'm New" Ihrer Kirchenwebseite hinzu, damit sich Gäste bereits vor ihrer Ankunft registrieren können.
:::

## Was wird aufgezeichnet

Jede Anmeldung erstellt einen Teilnahmeeintrag in B1 Admin. Sie können diese Einträge auf den Registerkarten [Teilnahme](tracking-attendance.md) und [Gruppen](../groups/group-members.md) genau wie manuell eingegebene Teilnahmen anzeigen. Es gibt keinen Unterschied in der Anzeige der Daten – beide Methoden führen zu denselben Berichten.
