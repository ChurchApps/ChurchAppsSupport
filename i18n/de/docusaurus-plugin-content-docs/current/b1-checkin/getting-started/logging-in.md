---
title: "Anmelden"
---

# Anmelden

<div class="article-intro">

Bevor das Kiosk-Terminal für den Check-in genutzt werden kann, müssen Sie sich mit einem ChurchApps-Konto anmelden, das Zugriff auf Ihre Kirche hat. Diese Seite behandelt die erstmalige Anmeldung, die Auswahl der Kirche, das automatische Anmelden und das Abmelden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie B1 Church Checkin auf Ihrem Android-Tablet (siehe [Erste Schritte](./index.md))
- Halten Sie E-Mail-Adresse und Passwort Ihres ChurchApps-Kontos bereit

</div>

## Erstmalige Anmeldung

1. Öffnen Sie die App B1 Church Checkin. Nach dem Startbildschirm sehen Sie die Anmeldeseite mit dem Logo von B1 Church Checkin.
2. Geben Sie Ihre **E-Mail-Adresse** im ersten Feld ein.
3. Geben Sie Ihr **Passwort** im zweiten Feld ein.
4. Tippen Sie auf die Schaltfläche **Anmelden**.

Die App prüft Ihre Zugangsdaten und meldet Sie an. Sind E-Mail-Adresse oder Passwort falsch, sehen Sie eine Fehlermeldung unten auf dem Bildschirm.

Ist für das Konto die [Zwei-Faktor-Anmeldung](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiviert, fragt die App anschließend nach einem Code. Geben Sie den 6-stelligen Code aus der Authenticator-App des Kontoinhabers oder einen seiner Sicherungscodes ein und tippen Sie erneut auf **Anmelden**. Den Code brauchen Sie nur bei dieser ersten Anmeldung; danach bleibt das Kiosk-Terminal angemeldet.

:::info
Es handelt sich um dieselbe E-Mail-Adresse und dasselbe Passwort, die Sie für B1 Admin oder ein anderes ChurchApps-Produkt verwenden. Für das Check-in-Kiosk benötigen Sie kein eigenes Konto.
:::

## Die Kirche auswählen

Nach einer erfolgreichen Anmeldung lädt die App eine Liste der Kirchen, die mit Ihrem Konto verknüpft sind. Jede Kirche wird als Karte mit Namen und Logo angezeigt (sofern in B1 Admin ein Logo hinterlegt ist).

- Ist Ihr Konto nur mit **einer Kirche** verknüpft, sehen Sie trotzdem die Auswahlseite. Tippen Sie auf Ihre Kirche, um fortzufahren.
- Ist Ihr Konto mit **mehreren Kirchen** verknüpft, tippen Sie auf die Kirche, die dieses Kiosk-Terminal nutzen soll.

Sobald Sie eine Kirche gewählt haben, lädt die App deren Erscheinungsbild und Designeinstellungen. Ihr Kirchenlogo erscheint danach in der Kopfzeile aller weiteren Bildschirme.

## Automatische Anmeldung bei späteren Besuchen

Nach der ersten erfolgreichen Anmeldung speichert die App auf dem Tablet ein sicheres Anmelde-Token und Ihre gewählte Kirche. Ihr Passwort wird nicht gespeichert. Bei künftigen Starts gilt:

- Die App meldet Sie mit dem gespeicherten Token wieder an.
- Haben Sie zuvor eine Kirche gewählt, stellt die App diese Auswahl wieder her und führt Sie direkt zum **Gottesdienst-Bildschirm**.
- Ist die gespeicherte Anmeldung nicht mehr gültig, kehrt die App zur Anmeldeseite zurück, damit Sie sich erneut anmelden können.

:::tip
Da sich das Kiosk-Terminal automatisch anmeldet, müssen Sie Ihre Zugangsdaten nur einmal bei der Ersteinrichtung eingeben. Danach können Sie das Tablet einschalten und es ist sofort einsatzbereit.
:::

## Admin-Einstellungen

Die Admin-Einstellungen sind bewusst verborgen, damit Mitglieder am Kiosk die Konfiguration nicht versehentlich ändern. So greifen Sie darauf zu:

1. Tippen Sie **siebenmal** schnell hintereinander (innerhalb von zwei Sekunden) auf das **Kirchenlogo** in der Kopfzeile.
2. Ist eine Kiosk-PIN festgelegt, geben Sie die PIN ein, wenn Sie danach gefragt werden.
3. Der Bildschirm **Admin-Einstellungen** öffnet sich mit folgenden Optionen:
   - **Gottesdienst wechseln** -- die gewählte Gottesdienstzeit ändern
   - **Drucker wechseln** -- öffnet die [Druckereinstellungen](./printer-setup), um nach einem Drucker zu suchen und einen auszuwählen
   - **PIN festlegen/ändern** -- die Kiosk-PIN festlegen oder aktualisieren, die den Admin-Zugriff schützt
   - **Abmelden** -- abmelden und zur Anmeldeseite zurückkehren

:::warning
Beim Abmelden werden alle gespeicherten Zugangsdaten und die Kirchenauswahl gelöscht. Um das Kiosk-Terminal wieder zu nutzen, müssen Sie E-Mail-Adresse und Passwort erneut eingeben. Melden Sie sich nur ab, wenn Sie das Konto wechseln oder das Kiosk-Terminal neu konfigurieren müssen.
:::

## Wie geht es weiter?

Nach der Anmeldung können Sie einen [Drucker einrichten](./printer-setup) oder direkt zum [Check-in-Ablauf](../check-in/) übergehen.
