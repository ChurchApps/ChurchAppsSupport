---
title: "Einstellungen der Mobil-App"
---

# Einstellungen der Mobil-App

<div class="article-intro">

Die Seite "Mobil-App-Einstellungen" ermöglicht es Ihnen, die Navigationsregisterkarten zu konfigurieren, die in der **B1.church-Mobil-Erfahrung (PWA)** für Ihre Kirchenmitglieder angezeigt werden. Sie kontrollieren, welche Registerkarten sichtbar sind, worauf sie verlinken und wie sie angezeigt werden.

</div>

:::info Die native B1-Mobil-App ist veraltet
Registerkarten, die hier konfiguriert sind, werden über die [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa) bereitgestellt, die die native B1-Mobil-App ersetzt hat. Teilen Sie die Installations-Seite Ihrer Kirche -- `https://yourchurchname.b1.church/mobile/install` -- mit Mitgliedern; sie führt sie durch das Installieren der App auf ihrem Gerät, ohne dass ein App Store oder Google Play-Download erforderlich ist.
:::

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen die Berechtigung "Kircheneinstellungen bearbeiten". Siehe [Rollen & Berechtigungen](./roles-permissions.md), wenn Sie keinen Zugriff haben.
- Konfigurieren Sie Ihre [Kircheneinstellungen](./church-settings.md) zuerst, einschließlich Ihres Kirchennamens und Brandings

</div>

## Zugriff auf Mobil-App-Einstellungen

1. Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
2. Klicken Sie auf die Schaltfläche **Mobil-Apps** in der Kopfzeile.
3. Die Seite "Mobil-App-Einstellungen" zeigt Ihre aktuellen App-Registerkarten an.

## Hinzufügen einer neuen Registerkarte

1. Klicken Sie auf die Schaltfläche **Registerkarte hinzufügen** oben auf der Seite.
2. Füllen Sie die Registerkarten-Details aus:
   - **Name** -- Das Label, das auf der Registerkarte angezeigt wird (z.B. "Predigten" oder "Spenden").
   - **Symbol** -- Klicken Sie auf die Symbolauswahl, um ein Symbol für Ihre Registerkarte zu wählen. Sie können auch ein benutzerdefiniertes Bild hochladen.
   - **Registerkarten-Typ** -- Wählen Sie aus Optionen wie Bibel, Live Stream, Spenden, Website und mehr.
   - **URL** -- Geben Sie die Webadresse ein, die die Registerkarte verlinken soll.
   - **Sichtbarkeit** -- Kontrollieren Sie, wer diese Registerkarte sehen kann (alle, nur Mitglieder usw.).
3. Klicken Sie auf **Registerkarte speichern**, um sie zu Ihrer App hinzuzufügen.

## Bearbeiten einer vorhandenen Registerkarte

1. Klicken Sie auf eine beliebige vorhandene Registerkarte in der Liste **App-Registerkarten**.
2. Aktualisieren Sie den Namen, das Symbol, die URL, den Typ oder die Sichtbarkeitseinstellungen der Registerkarte.
3. Klicken Sie auf **Registerkarte speichern**, um Ihre Änderungen zu übernehmen.

## Neu-Ordnen von Registerkarten

Sie können die Reihenfolge ändern, in der Registerkarten in der Mobil-App angezeigt werden. Ziehen Sie Registerkarten in der Liste per Drag-and-Drop, um sie neu zu ordnen. Die Reihenfolge, die auf dieser Seite angezeigt wird, passt mit der Reihenfolge überein, die Ihre Mitglieder in der App sehen.

:::info
Einige Registerkarten werden möglicherweise automatisch angezeigt, wenn bestimmte Bedingungen erfüllt sind -- zum Beispiel kann eine Live-Stream-Registerkarte angezeigt werden, wenn ein Stream aktiv ist. Manuell hinzugefügte Registerkarten geben Ihnen jederzeit volle Kontrolle über das, was Ihre Mitglieder sehen.
:::

:::tip
Halten Sie Ihre Registerkarten-Anzahl überschaubar. Drei bis fünf Registerkarten funktionieren gut für die meisten Kirchen. Zu viele Registerkarten können die Navigation für Ihre Mitglieder verwirrend machen.
:::

## Einstellungen für Mitgliedeverzeichnis & Messaging

Die **B1-Mobil**-Registerkarte im selben Mobil-Bereich hat die Einstellungen, die die Regierung und privates Messaging in der B1.church-Erfahrung regieren:

- **Verzeichnis-Genehmigungsgruppe** -- Die Gruppe, die Mitgliedeverzeichnis-Aktualisierungen überprüft, bevor sie angewendet werden.
- **Im Verzeichnis anzeigen** -- Wer im Mitgliedeverzeichnis erscheinen kann (nur Personal bis zu Jedermann).
- **Sichtbarkeitspräferenzen** -- Standardsichtbarkeit für Mitgliedadressen, Telefonnummern und E-Mail-Adressen.
- **Mindestalter für private Nachrichten** -- Ein Kindersicherheits-Steuerelement. B1 wird keine **neue** private Nachrichtenkonversation öffnen, wenn eine Person unter diesem Alter ist, basierend auf ihrem Geburtsdatum (Haushaltsrolle wird als Fallback verwendet, wenn kein Geburtsdatum auf Datei vorhanden ist). Personen unter dem Alter bleiben vollständig sichtbar im Verzeichnis -- nur direkte Messaging wird blockiert, in **beiden Richtungen**, für alle, einschließlich Personal. Gruppenkonversationen und Messaging zu den Eltern eines Kindes funktionieren noch. Optionen sind "Aus", 13, 16 oder 18; die Standardeinstellung ist **18**. Bestehende Konversationen sind nicht betroffen.

:::tip
Da die Altersprüfung auf Geburtstagen basiert, stellen Sie sicher, dass Geburtsdaten für Kinder in Ihrer Gemeinde ausgefüllt sind. Diese Einstellung gehört zur gleichen Kindersicherheits-Familie wie die [Check-in-Sicherheitskontrollen](../attendance/checkin-safety.md).
:::

## Wo diese Registerkarten angezeigt werden

Die Registerkarten, die Sie hier konfigurieren, werden in der **B1.church-PWA** angezeigt, die Ihre Mitglieder von einer beliebigen Seite auf `https://yourchurchname.b1.church` installieren. Änderungen, die Sie auf dieser Seite vornehmen, werden das nächste Mal widergespiegelt, wenn ein Mitglied die App öffnet. (Registerkarten werden auch durch die Legacy-[B1 Mobile native App](/docs/b1-mobile/) für alle Mitglieder, die sie noch laufen lassen, gerendert, aber diese App ist veraltet und wird nicht mehr aktualisiert.)

## Nächste Schritte

- [Kircheneinstellungen](./church-settings.md) -- Konfigurieren Sie Ihre Kircheninformationen und Branding
- [Rollen & Berechtigungen](./roles-permissions.md) -- Verwalten Sie den Zugriff für Ihr Team
