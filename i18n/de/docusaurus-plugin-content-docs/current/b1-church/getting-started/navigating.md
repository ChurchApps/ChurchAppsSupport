---
title: "Navigation in B1App"
---

# Navigation in B1App

<div class="article-intro">

Das Mitgliederportal in B1.church ist eine mobilfreundliche Web-App, die unter `/mobile` untergebracht ist. Sie funktioniert in jedem Browser und kann auf Ihrem Startbildschirm installiert werden. Diese Seite erklärt das Home-Dashboard, die Registerkartenleiste am unteren Rand, das Menü „Mehr" und die Me-Seite.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Sie müssen [angemeldet](./logging-in.md) sein, um Ihre persönlichen Informationen zu sehen. Abgemeldete Besucher können öffentliche Inhalte durchsuchen und wird eine Schaltfläche **Anmelden** angeboten, wenn eine Funktion ein Konto erfordert.

</div>

## Startseite

Das Öffnen von `https://yourchurchname.b1.church/mobile` bringt Sie zum **Startseite**-Dashboard unter `/mobile/dashboard`. Startseite ist die Landingpage des Mitgliederportals und zeigt:

- Eine Begrüßung mit Ihrem Namen
- Der Bibelvers des Tages
- Eine ausgewählte Karte für das, was Ihre Kirche hervorgehoben hat
- Ein **Erkunden**-Raster der Tools, die Ihre Kirche aktiviert hat – Gruppen, Spenden, Anmeldung, Predigten, Pläne und mehr

Ein Antippen einer Karte in Erkunden öffnet dieses Tool. Falls Ihre Kirche mehr Tools hat als auf dem Dashboard passen, ist die letzte Karte **Mehr**, was die vollständige Liste unter `/mobile/more` öffnet.

Falls Sie abgemeldet sind, zeigt Startseite eine **Willkommen**-Überschrift anstelle der Begrüßung mit einer kurzen Aufforderung („Melden Sie sich an, um Ihre Gruppen, Spenden und vieles mehr zu sehen.") und einer Schaltfläche **Anmelden**. Ihre Kirche kann diese Aufforderung umformulieren oder ausblenden – siehe [Mobile App-Einstellungen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Falls ausgeblendet, können Sie sich immer noch im Menü oder auf der Me-Registerkarte anmelden.

## Die Registerkartenleiste am unteren Rand

Auf einem Telefon ist eine Registerkartenleiste am unteren Rand des Bildschirms verankert:

- **Startseite** – immer die erste Registerkarte
- Bis zu drei der von Ihrer Kirche konfigurierten Registerkarten
- **Mehr** – öffnet das Navigationsmenü

Falls Ihre Kirche mehr als drei Registerkarten konfiguriert hat, sind die übrigen nicht verloren: Sie erscheinen im Menü **Mehr** und im Dashboard-Explorationsr-Raster. Kirchenadministratoren legen die Registerkartenreihenfolge in B1 Admin unter **Mobil → Navigation** fest.

## Das Menü

Das Antippen von **Mehr** öffnet das Navigationsmenü. Auf einem Tablet oder Desktop ist das gleiche Menü immer an der linken Seite des Bildschirms sichtbar. Es enthält:

- Ihren Namen und Ihr Foto mit einer **Profil bearbeiten**-Verknüpfung – siehe [Profil bearbeiten](./editing-your-profile.md)
- **Startseite** und **Ich**
- **Admin-Portalseite** – nur angezeigt, wenn Sie in Ihrer Kirche Administratorrechte haben; es öffnet B1 Admin
- Jede von Ihrer Kirche konfigurierte Registerkarte in der Reihenfolge
- **App installieren** – öffnet die [Installationsanweisungen](./installing-pwa.md) unter `/mobile/install`
- Ein Hell-/Dunkel-Modus-Schalter
- **Anmelden** oder **Abmeldung**
- Ihren Kirchennamen und einen Link zur Datenschutzrichtlinie

## Die App-Leiste

Die Leiste am oberen Rand des Bildschirms zeigt:

- Die Bildschirmtitel oder Ihren Kirchennamen auf Startseite
- Einen Zurück-Pfeil, wenn Sie einen Detailbildschirm erweitert haben
- Ein **Glocken**-Symbol für Benachrichtigungen und Nachrichten mit einem Abzeichen für ungelesene Elemente
- Ihr **Profilfoto**, das Ihr Profil unter `/mobile/profileEdit` öffnet – siehe [Profil bearbeiten](./editing-your-profile.md)

## Die Me-Seite

**Ich** (`/mobile/me`) ist Ihr persönlicher Hub. Es listet Verknüpfungen zu Ihrem Profil, [Benachrichtigungseinstellungen](./notification-preferences.md), Nachrichten, [Spenden](../giving/) und [Registrierungen](../events/my-registrations.md) auf, gefolgt von dem, was auf Sie wartet – Diensteinsätze, Veranstaltungsregistrierungen und Gruppenereignisse – und Ihre neuesten Benachrichtigungen. Siehe [Die Me-Seite](./me-page) für Details.

Falls Sie abgemeldet sind, zeigt die Me-Seite stattdessen eine Schaltfläche **Anmelden**.

## Installation auf Ihrem Startbildschirm

Das Mitgliederportal ist eine Progressive Web App. Besuchen Sie `/mobile/install` (oder wählen Sie **App installieren** im Menü) für Schritt-für-Schritt-Anweisungen für Ihr Gerät. Nach der Installation öffnet es sich vollbild von Ihrem Startbildschirm ohne Browser-Chrome. Siehe [Installation als App (PWA)](./installing-pwa.md).

## Öffentliche Website Ihrer Kirche

Außerhalb des Mitgliederportals hat die öffentliche Website Ihrer Kirche ihre eigene Kopfzeilennavigation mit von Ihren Administratoren konfigurierten Links – Seiten wie [Predigten](../content/sermons.md), die [Bibel](../content/bible.md), [Live-Streaming](../content/live-streaming.md) und eine öffentliche Gruppenliste. Auf einem Telefon befinden sich diese Links hinter dem Hamburger-Symbol in der oberen rechten Ecke der Kopfzeile.

:::info
Die Registerkarten und Tools, die Sie sehen, variieren je nach Kirche. Administratoren steuern, welche Abschnitte für Mitglieder über B1 Admin sichtbar sind, also falls Sie eine hier beschriebene Funktion nicht sehen, hat Ihre Kirche sie möglicherweise nicht aktiviert.
:::
