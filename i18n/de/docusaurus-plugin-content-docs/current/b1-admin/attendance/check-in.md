---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin unterstützt Self-Service-Check-in bei Veranstaltungen durch die begleitende **B1 Checkin**-App. Mitglieder können sich selbst und ihre Familien an Kiosken oder auf speziellen Geräten anmelden, wenn sie ankommen, was den Prozess beschleunigt und die Belastung für Ihre Freiwilligen verringert. Jeder Check-in wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen in [Anwesenheit Einrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushalten](../people/adding-people.md#managing-households), die eingerichtet sind, damit Familien zusammen einchecken können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardware-Empfehlungen](#recommended-hardware) unten).

</div>

## Wie es funktioniert

Die B1 Checkin-App verbindet sich mit Ihrem B1 Admin Anwesenheits-Setup. Wenn ein Mitglied eincheckt, wird seine Anwesenheit automatisch gegen den richtigen Standort, die richtige Gottesdienstzeit und die richtige Gruppe erfasst. Sie müssen keine Anwesenheit manuell für Personen eingeben, die das Check-in-System nutzen.

## Check-In einrichten

1. **Konfigurieren Sie zuerst Ihre Anwesenheitsstruktur.** Gehen Sie in B1 Admin zu **Anwesenheit > Einrichtung** und stellen Sie sicher, dass Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind. Die Check-in-App hängt von dieser Konfiguration ab. Siehe [Anwesenheit Einrichtung](setup.md) für Details.
2. **Installieren Sie die B1 Checkin-App** auf den Geräten, die Sie verwenden möchten. Die App ist auf folgenden Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich bei der B1 Checkin-App an** mit den Kontodaten Ihrer Kirche.
4. **Wählen Sie den Standort und die Gottesdienstzeit** für die aktuelle Versammlung.
5. Mitglieder können jetzt auf dem Gerät nach ihrem Namen suchen und einchecken.

:::tip
Platzieren Sie Check-in-Geräte an sichtbaren, leicht erreichbaren Orten wie Eingängen oder Begrüßungsschaltern. Eine kurze Ankündigung während des Gottesdienstes hilft Mitgliedern zu wissen, dass die Option verfügbar ist.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie das Setup für jeden Standort in [Anwesenheit Einrichtung](setup.md) wiederholen. Jedes Check-in-Gerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** — diese funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großes Display:** Samsung Galaxy Tab A8 10,5"
- **Budgetfreundlich:** Amazon Fire HD 10

**Drucker** — Check-ins funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WiFi)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WiFi)
- **Budgetfreundlich:** Brother QL-1100 (nur WiFi)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der B1 Checkin-App kompatibel. Andere Druckermarken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Folgen Sie den Einrichtungsanweisungen Ihres Druckers, um ihn mit dem gleichen WiFi-Netzwerk wie Ihr Tablet zu verbinden. Sie finden Brother-Druckertreiber und Einrichtungsleitfäden auf der [Brother-Support-Website](https://support.brother.com).
:::

## Anpassen des Kiosk-Erscheinungsbildes

Sie können das Erscheinungsbild und die Funktionalität der B1 Checkin-App an das Branding Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Anwesenheit > Kiosk-Design**, um Folgendes zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an, um Ihr Kirchenbranding zu entsprechen:

- **Primär** und **Primärer Kontrast** -- Hauptmarkenfarbe und deren Textfarbe.
- **Sekundär** und **Sekundärer Kontrast** -- Akzentfarbe und deren Textfarbe.
- **Kopfzeilenhintergrund** und **Unterüberschriften-Hintergrund** -- Farben für die Kioskübereiche.
- **Schaltflächenhintergrund** und **Schaltflächentext** -- Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie ein optionales Hintergrundbild für die Kiosk-Willkommens- und Suchbildschirme hoch. Empfohlene Größe ist 1920x1080 Pixel.

### Standby-Bildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der sich nach einer Inaktivitätszeit aktiviert:

1. Aktivieren oder deaktivieren Sie den Standby-Bildschirm.
2. Stellen Sie das **Timeout** ein (wie viele Sekunden Inaktivität, bevor der Bildschirmschoner startet, Mindest 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu -- jede Folie hat ein Bild und eine Anzeigedauer (Mindest 3 Sekunden).

:::tip
Nutzen Sie den Standby-Bildschirm, um Ankündigungen, anstehende Veranstaltungen oder Willkommensbotschaften anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gast-Registrierung über QR-Code

Der Check-in-Kiosk kann einen QR-Code anzeigen, den Besucher scannen können, um sich selbst und ihre Familie auf ihrem eigenen Telefon zu registrieren. Dies beschleunigt den Check-in-Prozess für Erstbesucher.

Wenn ein Gast den QR-Code scannt, wird er auf eine [Gast-Registrierungsseite](../../b1-church/checkin/guest-registration) geleitet, auf der er seinen Namen, seine E-Mail und Familienmitglieder eingibt. Ein Freiwilliger kann ihn dann auf dem Kiosk nachschlagen und einchecken.

### QR-Gast-Registrierung aktivieren

Um die QR-Code-Anzeige zu aktivieren:

1. Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Mobil**.
2. Wählen Sie die **B1 CheckIn**-Registerkarte.
3. Aktivieren Sie **QR-Gast-Registrierung** und klicken Sie auf **Speichern**.

:::note
Diese Einstellung befindet sich unter **Mobil**, nicht unter Anwesenheit > Kiosk-Design.
:::

### Registrierungslink teilen

Nachdem die QR-Gast-Registrierung aktiviert ist, wird ein Bereich **Registrierungs-QR-Code teilen** unterhalb des Umschalters angezeigt. Dies gibt Ihnen zwei Möglichkeiten, um Gäste zur Registrierungsformular über den Kiosk-QR-Code hinaus zu leiten:

- **Link kopieren** -- kopiert die Registierungs-URL, damit Sie sie auf Ihrer Kirchenwebseite, in E-Mails oder überall online einfügen können.
- **Als PNG herunterladen** -- lädt den QR-Code als Bild herunter, das Sie auf Flugblättern, Bulletins oder Beschilderungen drucken können.

:::tip
Fügen Sie den Registrierungslink auf der Seite "Plan Ihren Besuch" oder "Ich bin neu" Ihrer Kirchenwebseite hinzu, damit sich Gäste registrieren können, bevor sie überhaupt ankommen.
:::

## Was wird erfasst

Jeder Check-in erstellt einen Anwesenheitsdatensatz in B1 Admin. Sie können diese Datensätze auf den [Anwesenheits-](tracking-attendance.md) und [Gruppen-](../groups/group-members.md)Registerkarten genau wie manuell eingegebene Anwesenheit anzeigen. Es gibt keinen Unterschied in der Anzeige der Daten -- beide Methoden fließen in die gleichen Berichte ein.
