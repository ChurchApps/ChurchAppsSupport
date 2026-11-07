---
title: "Anmeldung bei B1 Church Checkin"
sidebar_label: "Anmelden"
description: "Sich bei der Kiosk-App B1 Church Checkin anmelden, Gemeinde auswählen und Auto-Login, Admin-Einstellungen und Abmelden am Check-in-Tablet verstehen."
---

# Anmelden

<div class="article-intro">

Bevor der Kiosk zum Einchecken verwendet werden kann, müssen Sie sich mit einem ChurchApps-Konto anmelden, das Zugriff auf Ihre Kirche hat. Diese Seite behandelt die erste Anmeldung, die Auswahl der Kirche, das automatische Anmelden bei späteren Starts und das Abmelden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie B1 Church Checkin auf Ihrem Android-Tablet (siehe [Erste Schritte](./index.md))
- Halten Sie E-Mail-Adresse und Passwort Ihres ChurchApps-Kontos bereit

</div>

## Erste Anmeldung

1. Öffnen Sie die App B1 Church Checkin. Nach dem Startbildschirm sehen Sie den Anmeldebildschirm mit dem Logo von B1 Church Checkin.
2. Geben Sie Ihre **E-Mail-Adresse** in das erste Feld ein.
3. Geben Sie Ihr **Passwort** in das zweite Feld ein.
4. Tippen Sie auf die Schaltfläche **Anmelden**.

Die App prüft Ihre Zugangsdaten und meldet Sie an. Wenn E-Mail-Adresse oder Passwort falsch sind, sehen Sie am unteren Bildschirmrand eine Fehlermeldung.

Wenn für das Konto die [Zwei-Faktor-Anmeldung](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiviert ist, fragt die App anschließend nach einem Code. Geben Sie den 6-stelligen Code aus der Authenticator-App des Kontoinhabers oder einen seiner Backup-Codes ein und tippen Sie erneut auf **Anmelden**. Diesen Code benötigen Sie nur für die erste Anmeldung; danach bleibt der Kiosk angemeldet.

:::info
Dies ist dieselbe E-Mail-Adresse und dasselbe Passwort, die Sie für B1 Admin oder ein anderes ChurchApps-Produkt verwenden. Für den Check-in-Kiosk benötigen Sie kein separates Konto.
:::

## Auswahl Ihrer Kirche

Nach einer erfolgreichen Anmeldung lädt die App eine Liste der Kirchen, die mit Ihrem Konto verknüpft sind. Jede Kirche wird als Karte mit Name und Logo der Kirche angezeigt (sofern in B1 Admin ein Logo hinterlegt wurde).

- Wenn Ihr Konto nur **mit einer Kirche** verknüpft ist, sehen Sie trotzdem den Auswahlbildschirm. Tippen Sie auf Ihre Kirche, um fortzufahren.
- Wenn Ihr Konto mit **mehreren Kirchen** verknüpft ist, tippen Sie auf die Kirche, die dieser Kiosk bedienen soll.

Sobald Sie eine Kirche ausgewählt haben, lädt die App deren Branding und Darstellungseinstellungen. Das Logo Ihrer Kirche erscheint danach auf allen weiteren Bildschirmen in der Kopfzeile.

## Automatische Anmeldung bei späteren Starts

Nach der ersten erfolgreichen Anmeldung speichert die App ein sicheres Anmeldetoken und Ihre ausgewählte Kirche auf dem Tablet. Ihr Passwort wird nicht gespeichert. Bei späteren Starts gilt Folgendes:

- Die App meldet Sie mit dem gespeicherten Token wieder an.
- Wenn Sie zuvor eine Kirche ausgewählt haben, wird diese Auswahl wiederhergestellt und Sie gelangen direkt zum **Gottesdienst-Bildschirm**.
- Wenn die gespeicherte Anmeldung nicht mehr gültig ist, kehrt die App zum Anmeldebildschirm zurück, damit Sie sich erneut anmelden können.

:::tip
Da sich der Kiosk automatisch anmeldet, müssen Sie Zugangsdaten nur einmal bei der Ersteinrichtung eingeben. Danach kann das Tablet eingeschaltet werden und ist sofort einsatzbereit.
:::

## Administratoreinstellungen

Die Administratoreinstellungen sind bewusst ausgeblendet, damit Gemeindemitglieder am Kiosk die Konfiguration nicht versehentlich ändern können. So gelangen Sie dorthin:

1. Tippen Sie **siebenmal** hintereinander schnell (innerhalb von zwei Sekunden) auf das **Kirchenlogo** in der Kopfzeile.
2. Wenn eine Kiosk-PIN festgelegt ist, geben Sie die PIN ein, sobald Sie dazu aufgefordert werden.
3. Der Bildschirm **Administratoreinstellungen** wird mit den folgenden Optionen geöffnet:
   - **Gottesdienst ändern** — den ausgewählten Gottesdienstzeitpunkt wechseln
   - **Drucker ändern** — [Druckereinstellungen](./printer-setup.md) öffnen, um einen Drucker zu suchen und auszuwählen
   - **PIN festlegen/ändern** — die Kiosk-PIN festlegen oder aktualisieren, die den Administratorzugang schützt
   - **Abmelden** — sich abmelden und zum Anmeldebildschirm zurückkehren

:::warning
Beim Abmelden werden alle gespeicherten Zugangsdaten und die Kirchenauswahl gelöscht. Um den Kiosk erneut zu verwenden, müssen Sie E-Mail-Adresse und Passwort erneut eingeben. Melden Sie sich nur ab, wenn Sie das Konto wechseln oder den Kiosk neu konfigurieren möchten.
:::

## Nächste Schritte

Nach der Anmeldung können Sie [einen Drucker einrichten](./printer-setup.md) oder direkt zum [Check-in-Ablauf](../check-in/index.md) wechseln.
