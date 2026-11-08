---
title: "Anmeldung bei B1 Church Checkin"
sidebar_label: "Anmeldung"
description: "Melden Sie sich in der Kiosk-App B1 Church Checkin an, wählen Sie Ihre Kirche aus und erfahren Sie mehr über die automatische Anmeldung, die Administratoreinstellungen und die Abmeldung am Check-in-Tablet."
---

# Anmeldung

<div class="article-intro">

Bevor der Kiosk für den Check-in genutzt werden kann, müssen Sie sich mit einem ChurchApps-Konto anmelden, das Zugriff auf Ihre Kirche hat. Diese Seite behandelt den Anmeldevorgang beim ersten Mal, die Kirchenauswahl, das Verhalten der automatischen Anmeldung und das Abmelden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie B1 Church Checkin auf Ihrem Android-Tablet (siehe [Erste Schritte](./index.md))
- Halten Sie Ihre E-Mail-Adresse und Ihr Passwort für das ChurchApps-Konto bereit
- Das Konto benötigt die Berechtigung **Checkin** (oder **Anwesenheit bearbeiten**) in Ihrer Kirche. Ein Administrator fügt sie in B1 Admin unter **Einstellungen > Rollen** hinzu — siehe [Check-in-Kiosk-Konten](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Erstmalige Anmeldung

1. Öffnen Sie die App B1 Church Checkin. Nach dem Startbildschirm sehen Sie die Anmeldeseite mit dem Logo von B1 Church Checkin.
2. Geben Sie Ihre **E-Mail-Adresse** in das erste Feld ein.
3. Geben Sie Ihr **Passwort** in das zweite Feld ein.
4. Tippen Sie auf die Schaltfläche **Anmelden**.

Die App überprüft Ihre Zugangsdaten und meldet Sie an. Wenn E-Mail-Adresse oder Passwort falsch sind, erscheint am unteren Bildschirmrand eine Fehlermeldung.

Wenn für das Konto die [Zwei-Faktor-Anmeldung](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiviert ist, fordert die App anschließend einen Code an. Geben Sie den 6-stelligen Code aus der Authenticator-App des Kontoinhabers oder einen seiner Backup-Codes ein und tippen Sie erneut auf **Anmelden**. Diesen Code benötigen Sie nur bei der ersten Anmeldung; danach bleibt der Kiosk angemeldet.

:::info
Dies sind dieselbe E-Mail-Adresse und dasselbe Passwort, die Sie für B1 Admin oder ein anderes ChurchApps-Produkt verwenden. Für den Check-in-Kiosk benötigen Sie kein separates Konto.
:::

## Kirche auswählen

Nach einer erfolgreichen Anmeldung lädt die App die Kirchen, in denen Ihr Konto die Berechtigung **Checkin** oder **Anwesenheit bearbeiten** besitzt. Kirchen, in denen Sie nur andere Berechtigungen haben, werden ausgeblendet. Sind keine Kirchen übrig, zeigt die App **Kein Check-in-Zugriff** an und bittet Sie, Ihren Kirchenadministrator zu bitten, die Berechtigung Checkin einer Ihrer Rollen hinzuzufügen. Jede Kirche wird als Karte mit dem Namen und dem Logo der Kirche angezeigt (sofern in B1 Admin ein Logo hinterlegt wurde).

- Wenn Ihr Konto nur **mit einer Kirche** verknüpft ist, sehen Sie trotzdem den Auswahlbildschirm. Tippen Sie auf Ihre Kirche, um fortzufahren.
- Wenn Ihr Konto mit **mehreren Kirchen** verknüpft ist, tippen Sie auf die Kirche, die dieser Kiosk bedienen soll.

Sobald Sie eine Kirche auswählen, lädt die App das Erscheinungsbild und die Markengestaltung dieser Kirche. Das Logo Ihrer Kirche erscheint danach in der Kopfzeile aller weiteren Bildschirme.

## Automatische Anmeldung bei späteren Besuchen

Nach der ersten erfolgreichen Anmeldung speichert die App ein sicheres Anmeldetoken und Ihre gewählte Kirche auf dem Tablet. Ihr Passwort wird nicht gespeichert. Bei künftigen Starts gilt Folgendes:

- Die App meldet Sie mit dem gespeicherten Token wieder an.
- Wenn Sie zuvor eine Kirche ausgewählt haben, wird diese Auswahl wiederhergestellt und Sie gelangen direkt zum **Gottesdienst-Bildschirm**.
- Ist die gespeicherte Anmeldung nicht mehr gültig, kehrt die App zur Anmeldeseite zurück, damit Sie sich erneut anmelden können.

:::tip
Da sich der Kiosk automatisch anmeldet, müssen Sie Ihre Zugangsdaten nur einmal bei der Ersteinrichtung eingeben. Danach können Sie das Tablet einschalten und es ist sofort einsatzbereit.
:::

## Administratoreinstellungen

Die Administratoreinstellungen sind bewusst ausgeblendet, damit Gemeindemitglieder, die den Kiosk nutzen, die Konfiguration nicht versehentlich ändern können. So öffnen Sie sie:

1. Tippen Sie **siebenmal** hintereinander schnell (innerhalb von zwei Sekunden) auf das **Kirchenlogo** in der Kopfzeile.
2. Ist eine Kiosk-PIN festgelegt, geben Sie die PIN ein, wenn Sie dazu aufgefordert werden.
3. Der Bildschirm **Administratoreinstellungen** wird mit folgenden Optionen geöffnet:
   - **Gottesdienst wechseln** — die ausgewählte Gottesdienstzeit ändern
   - **Drucker wechseln** — [Druckereinstellungen](./printer-setup.md) öffnen, um nach einem Drucker zu suchen und ihn auszuwählen
   - **Administrator-PIN festlegen** (oder **Administrator-PIN ändern**, sobald eine festgelegt ist) — die Kiosk-PIN festlegen oder aktualisieren, die den Administratorzugang schützt
   - **Notfallnachricht** — an die Erziehungsberechtigten aller eingecheckten Haushalte eine SMS senden (siehe [Notfallnachricht](../check-in/checking-out.md#emergency-broadcast))
   - **Modus mit Personal besetzt** — ein Schalter, der diesem Stationsplatz Auschecken, Ausrufen, erneutes Drucken und Profilbearbeitung hinzufügt (siehe [Auschecken](../check-in/checking-out.md))
   - **Abmelden** — abmelden und zur Anmeldeseite zurückkehren

   Tippen Sie auf **Zurück zum Kiosk**, um zum Check-in zurückzukehren.

:::warning
Beim Abmelden werden alle gespeicherten Zugangsdaten und die Kirchenauswahl gelöscht. Um den Kiosk erneut zu nutzen, müssen Sie E-Mail-Adresse und Passwort erneut eingeben. Melden Sie sich nur ab, wenn Sie das Konto wechseln oder den Kiosk neu konfigurieren möchten.
:::

## Nächste Schritte

Nach der Anmeldung können Sie einen [Drucker einrichten](./printer-setup.md) oder direkt zum [Check-in-Ablauf](../check-in/index.md) übergehen.
