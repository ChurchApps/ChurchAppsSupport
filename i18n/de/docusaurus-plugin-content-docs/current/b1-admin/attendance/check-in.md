---
title: "Anmeldung"
---

# Anmeldung

<div class="article-intro">

B1 Admin unterstützt die Selbstanmeldung bei Gottesdiensten durch die begleitende **B1 Checkin**-App. Mitglieder können sich selbst und ihre Familien an Kiosks oder dedizierten Geräten anmelden, wenn sie ankommen, was den Prozess beschleunigt und die Arbeitsbelastung Ihrer Freiwilligen reduziert. Jede Anmeldung wird automatisch als Anwesenheit aufgezeichnet.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Ihre Campusse, Gottesdienst-Zeiten und Gruppen müssen in der [Anwesenheits-Einrichtung](setup.md) konfiguriert sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushalten](../people/adding-people.md#managing-households), die eingerichtet sind, damit Familien zusammen anmelden können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardwareempfehlungen](#recommended-hardware) unten).

</div>

## So funktioniert es

Die B1 Checkin-App verbindet sich mit Ihrer B1 Admin-Anwesenheits-Einrichtung. Wenn ein Mitglied angemeldet wird, wird seine Anwesenheit automatisch gegen den richtigen Campus, die Gottesdienst-Zeit und die Gruppe aufgezeichnet. Sie müssen die Anwesenheit nicht manuell für einen eintragen, der das Anmeldungssystem nutzt.

## Anmeldung einrichten

1. **Konfigurieren Sie zunächst Ihre Anwesenheitsstruktur.** Gehen Sie in B1 Admin zu **Anwesenheit > Einrichtung** und stellen Sie sicher, dass Ihre Campusse, Gottesdienst-Zeiten und Gruppen vorhanden sind. Die Anmeldungs-App basiert auf dieser Konfiguration. Siehe [Anwesenheits-Einrichtung](setup.md) für Details.
2. **Installieren Sie die B1 Checkin-App** auf den Geräten, die Sie verwenden möchten. Die App ist auf den folgenden Plattformen verfügbar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich bei der B1 Checkin-App** mit den Anmeldedaten Ihrer Kirche an.
4. **Wählen Sie den Campus und die Gottesdienst-Zeit** für die aktuelle Versammlung.
5. Mitglieder können nun ihren Namen auf dem Gerät suchen und sich anmelden.

:::tip
Platzieren Sie Anmeldungsgeräte an sichtbaren, leicht zu erreichenden Orten wie Eingängen der Eingangshalle oder an Willkommenstischen. Eine kurze Ankündigung während der Gottesdienste hilft den Mitgliedern zu wissen, dass die Option verfügbar ist.
:::

:::tip
Wenn Ihre Kirche mehrere Campusse hat, müssen Sie das Setup für jeden Campus in der [Anwesenheits-Einrichtung](setup.md) wiederholen. Jedes Anmeldungsgerät kann für einen anderen Campus konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** — jedes dieser Geräte funktioniert gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10,5"
- **Budget:** Amazon Fire HD 10

**Drucker** — Anmeldungen funktionieren mit Brother-Etikettendruckern zum Drucken von Namensschildern:

- **Beste:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WiFi)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WiFi)
- **Budget:** Brother QL-1100 (nur WiFi)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der B1 Checkin-App kompatibel. Andere Druckermarken funktionieren nicht zum Drucken von Namensschildern.
:::

:::info
Befolgen Sie die Anweisungen Ihres Druckers, um ihn mit dem gleichen WiFi-Netzwerk wie Ihr Tablet zu verbinden. Sie können Brother-Druckertreiber und Setup-Anleitungen auf der [Brother-Support-Website](https://support.brother.com) finden.
:::

## Kiosk-Erscheinungsbild anpassen

Sie können das Aussehen und die Funktion der B1 Checkin-App an das Branding Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Mobil > B1 CheckIn** und verwenden Sie die Karte **Kiosk-Design**, um Folgendes zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an das Branding Ihrer Kirche an:

- **Primär** und **Primär-Kontrast** – Hauptmarkenfarbe und ihre Textfarbe.
- **Sekundär** und **Sekundär-Kontrast** – Akzentfarbe und ihre Textfarbe.
- **Kopfzeilenhintergrund** und **Unterüberschrift-Hintergrund** – Farben für die Kiosk-Kopfzeilenbereiche.
- **Schaltflächenhintergrund** und **Schaltflächentext** – Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie ein optionales Hintergrundbild für die Kiosk-Willkommens- und Suchbildschirme hoch. Die empfohlene Größe beträgt 1920x1080 Pixel.

### Ruhezustand / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der nach einer Inaktivitätsphase aktiviert wird:

1. Schalten Sie den Ruhezustand-Bildschirm **ein** oder **aus**.
2. Stellen Sie das **Timeout** ein (wie viele Sekunden der Inaktivität, bevor der Bildschirmschoner startet, Minimum 10 Sekunden).
3. Fügen Sie eine oder mehr **Folien** hinzu – jede Folie hat ein Bild und eine Anzeigedauer (Minimum 3 Sekunden).

:::tip
Verwenden Sie den Ruhezustand-Bildschirm, um Ankündigungen, bevorstehende Ereignisse oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv genutzt wird.
:::

## Gastregistrierung über QR-Code

Der Anmeldungs-Kiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie auf ihrem eigenen Telefon zu registrieren. Dies beschleunigt den Anmeldungsprozess für Ersttäter-Gäste.

Wenn ein Gast den QR-Code scannt, wird er zu einer [Gastregistrierungsseite](../../b1-church/checkin/guest-registration) geleitet, auf der er seinen Namen, seine E-Mail und Familienmitglieder eingibt. Ein Freiwilliger kann ihn dann auf dem Kiosk suchen und anmelden.

### QR-Gastregistrierung aktivieren

Um die QR-Code-Anzeige einzuschalten:

1. Öffnen Sie in B1 Admin das **Abschnittsmenü** in der oberen linken Ecke (der Abschnittsname mit dem kleinen Pfeil) und wählen Sie **Mobil**.
2. Wählen Sie die Registerkarte **B1 CheckIn**.
3. Schalten Sie **QR-Gastregistrierung** ein und klicken Sie auf **Speichern**.

:::note
Diese Einstellung befindet sich unter **Mobil > B1 CheckIn** (die gleiche Seite wie die Karte **Kiosk-Design**), nicht unter Anwesenheit.
:::

### Registrierungslink teilen

Sobald die QR-Gastregistrierung aktiviert ist, wird ein Bereich **Registrierungs-QR-Code teilen** unterhalb des Umschalters angezeigt. Dies gibt Ihnen zwei Möglichkeiten, Gäste zum Registrierungsformular zu bringen, über den Kiosk-QR-Code hinaus:

- **Link kopieren** – kopiert die Registrierungs-URL, damit Sie sie auf Ihre Kirchen-Website, in E-Mails oder überall online einfügen können.
- **PNG herunterladen** – lädt den QR-Code als Bild herunter, das Sie auf Flyern, Bulletins oder Beschilderungen drucken können.

:::tip
Fügen Sie den Registrierungslink zur Seite "Besuch planen" oder "Ich bin neu" Ihrer Kirchen-Website hinzu, damit sich Gäste anmelden können, bevor sie überhaupt ankommen.
:::

## Was wird aufgezeichnet

Jede Anmeldung erstellt einen Anwesenheitsdatensatz in B1 Admin. Sie können diese Datensätze auf den Registerkarten [Anwesenheit](tracking-attendance.md) und [Gruppen](../groups/group-members.md) genau wie manuell eingegebene Anwesenheit anzeigen. Es gibt keinen Unterschied in der Darstellung der Daten – beide Methoden fließen in die gleichen Berichte ein.
