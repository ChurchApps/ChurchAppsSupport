---
title: "Anmeldung"
---

# Anmeldung

<div class="article-intro">

B1 Admin unterstützt die Selbstanmeldung bei Gottesdiensten über die Begleit-App **B1 Checkin**. Mitglieder können sich und ihre Familien an Kiosken oder dedizierten Geräten anmelden, was den Prozess beschleunigt und die Belastung für Ihre Freiwilligen verringert. Jede Anmeldung wird automatisch als Anwesenheit erfasst.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienste und Gruppen müssen in der [Anmeldekonfiguration](setup.md) eingerichtet sein.
- Sie benötigen [Personen in Ihrer Datenbank](../people/adding-people.md) mit [Haushaltsgruppen](../people/adding-people.md#managing-households), damit Familien zusammen anmelden können.
- Sie benötigen ein Tablet und optional einen Brother-Etikettendrucker (siehe [Hardwareempfehlungen](#recommended-hardware) unten).

</div>

## Wie es funktioniert

Die B1 Checkin-App stellt eine Verbindung zu Ihrer B1 Admin-Anmeldekonfiguration her. Wenn sich ein Mitglied anmeldet, wird die Anwesenheit automatisch für den richtigen Standort, die richtige Gottesdienst- und Gruppenzeit erfasst. Sie müssen die Anwesenheit für niemanden manuell eingeben, der das Anmeldesystem nutzt.

## Anmeldung einrichten

1. **Konfigurieren Sie zuerst Ihre Anwesenheitsstruktur.** Gehen Sie in B1 Admin zu **Anwesenheit > Setup** und stellen Sie sicher, dass Ihre Standorte, Gottesdienste und Gruppen vorhanden sind. Die Anmelde-App basiert auf dieser Konfiguration. Weitere Details finden Sie unter [Anmeldekonfiguration](setup.md).
2. **Installieren Sie die B1 Checkin-App** auf den Geräten, die Sie verwenden möchten. Die App ist auf den folgenden Plattformen verfügbar:
   - **Android/Samsung-Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Melden Sie sich bei der B1 Checkin-App an** mit den Anmeldedaten Ihrer Kirche.
4. **Wählen Sie den Standort und die Gottesdienst** für die aktuelle Versammlung.
5. Mitglieder können jetzt auf dem Gerät nach ihrem Namen suchen und sich anmelden.

:::tip
Platzieren Sie Anmeldegeräte an sichtbaren, leicht erreichbaren Orten wie Lobbyzugängen oder Willkommenspulten. Eine kurze Ankündigung während der Gottesdienste hilft Mitgliedern zu wissen, dass diese Option verfügbar ist.
:::

:::tip
Wenn Ihre Kirche mehrere Standorte hat, müssen Sie das Setup für jeden Standort in der [Anmeldekonfiguration](setup.md) wiederholen. Jedes Anmeldegerät kann für einen anderen Standort konfiguriert werden.
:::

## Empfohlene Hardware

**Tablets** — Diese funktionieren gut mit der App:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Großer Bildschirm:** Samsung Galaxy Tab A8 10,5"
- **Preiswert:** Amazon Fire HD 10

**Drucker** — Anmeldungen funktionieren mit Brother-Etikettendruckern für den Namensdruck:

- **Beste:** Brother QL-1110NWB (unterstützt mehrere Tablets über Bluetooth und WiFi)
- **Gut:** Brother QL-810W (unterstützt mehrere Tablets über WiFi)
- **Preiswert:** Brother QL-1100 (nur WiFi)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Nur Brother-Etikettendrucker sind mit der B1 Checkin-App kompatibel. Andere Druckermarken funktionieren nicht zum Drucken von Nametags.
:::

:::info
Befolgen Sie die Einrichtungsanweisungen Ihres Druckers, um ihn mit demselben WiFi-Netz wie Ihr Tablet zu verbinden. Sie können Brother-Druckertreiber und Setupanleitungen auf der [Brother-Supportwebseite](https://support.brother.com) finden.
:::

## Anpassung des Kiosk-Erscheinungsbilds

Sie können das Erscheinungsbild der B1 Checkin-App an die Marke Ihrer Kirche anpassen. Gehen Sie in B1 Admin zu **Anwesenheit > Kiosk-Design** um zu konfigurieren:

### Farben

Passen Sie acht Farbeinstellungen an, um Ihre Kirchenmarke zu entsprechen:

- **Primär** und **Primärer Kontrast** — Hauptmarkenfarbe und deren Textfarbe.
- **Sekundär** und **Sekundärer Kontrast** — Akzentfarbe und deren Textfarbe.
- **Kopfzeilenhintergrund** und **Unterkopfzeilenhintergrund** — Farben für die Kioskheaderbereiche.
- **Schaltflächenhintergrund** und **Schaltflächentext** — Farben für interaktive Schaltflächen.

### Hintergrundbild

Laden Sie ein optionales Hintergrundbild für die Kiosk-Willkommens- und Suchbildschirme hoch. Die empfohlene Größe beträgt 1920x1080 Pixel.

### Leerlauf-Bildschirm / Bildschirmschoner

Konfigurieren Sie einen Bildschirmschoner, der sich nach einer Inaktivitätsperiode aktiviert:

1. Schalten Sie den Leerlaufbildschirm **ein** oder **aus**.
2. Stellen Sie das **Timeout** ein (wie viele Sekunden Inaktivität, bevor der Bildschirmschoner startet, mindestens 10 Sekunden).
3. Fügen Sie eine oder mehrere **Folien** hinzu — jede Folie hat ein Bild und eine Anzeigedauer (mindestens 3 Sekunden).

:::tip
Verwenden Sie den Leerlaufbildschirm, um Ankündigungen, kommende Ereignisse oder Willkommensnachrichten anzuzeigen, wenn der Kiosk nicht aktiv verwendet wird.
:::

## Gastregistrierung über QR-Code

Der Anmeldekiosk kann einen QR-Code anzeigen, den Besucher scannen, um sich und ihre Familie selbst auf ihrem Telefon zu registrieren. Dies beschleunigt den Anmeldeprozess für Erstbesucher.

Wenn ein Gast den QR-Code scannt, wird er zu einer [Gastregistrierungsseite](../../b1-church/checkin/guest-registration) weitergeleitet, wo er seinen Namen, seine E-Mail und Familienmitglieder eingibt. Ein Freiwilliger kann ihn dann am Kiosk suchen und anmelden.

### QR-Gastregistrierung aktivieren

So aktivieren Sie die QR-Code-Anzeige:

1. Gehen Sie in B1 Admin zu **Mobil** in der linken Seitenleiste (Telefonsymbol).
2. Wählen Sie die Registerkarte **Anmeldung**.
3. Schalten Sie **QR-Gastregistrierung** ein.

:::note
Diese Einstellung befindet sich unter **Mobil**, nicht unter Anwesenheit > Kiosk-Design.
:::

## Was wird erfasst

Jede Anmeldung erstellt einen Anwesenheitsdatensatz in B1 Admin. Sie können diese Datensätze auf den Registerkarten [Anwesenheit](tracking-attendance.md) und [Gruppen](../groups/group-members.md) genauso wie manuell eingegeben Anwesenheit anzeigen. Es gibt keinen Unterschied, wie die Daten aussehen — beide Methoden fließen in dieselben Berichte.
