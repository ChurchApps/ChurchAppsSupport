---
title: "Navigieren in B1App"
---

# Navigieren in B1App

<div class="article-intro">

Das Mitgliederportal in B1.church ist eine mobile-first Web-App, die unter `/mobile` läuft. Sie funktioniert in jedem Browser und kann auf Ihrem Startbildschirm installiert werden. Diese Seite erklärt das Home-Dashboard, die untere Registerkartenleiste, das Menü „Mehr" und die Me-Seite.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie müssen [angemeldet sein](./logging-in.md), um Ihre persönlichen Informationen zu sehen. Abgemeldete Besucher können dennoch öffentliche Inhalte durchsuchen und erhalten eine Schaltfläche **Anmelden**, wenn eine Funktion ein Konto erfordert.

</div>

## Startseite

Wenn Sie `https://yourchurchname.b1.church/mobile` öffnen, gelangen Sie zum **Home**-Dashboard unter `/mobile/dashboard`. Home ist die Landingpage des Mitgliederportals und zeigt:

- Eine Begrüßung mit Ihrem Namen
- Vers des Tages
- Eine hervorgehobene Karte für alle Funktionen, die Ihre Kirche hervorgehoben hat
- Ein **Explore**-Raster der Tools, die Ihre Kirche aktiviert hat – Gruppen, Spenden, Check-in, Predigten, Pläne und mehr

Wenn Sie auf eine Karte im Explore-Bereich tippen, wird dieses Tool geöffnet. Wenn Ihre Kirche mehr Tools hat als auf das Dashboard passen, ist die letzte Karte **Mehr**, die die vollständige Liste unter `/mobile/more` öffnet.

## Die untere Registerkartenleiste

Auf einem Telefon ist eine Registerkartenleiste am unteren Bildschirmrand befestigt:

- **Startseite** – immer die erste Registerkarte
- Bis zu drei Registerkarten, die Ihre Kirche konfiguriert hat
- **Mehr** – öffnet das Navigationsmenü

Wenn Ihre Kirche mehr als drei Registerkarten konfiguriert hat, gehen die restlichen nicht verloren: Sie erscheinen im Menü **Mehr** und im Explore-Raster des Dashboards. Kirchenverwalter stellen die Registerkartenreihenfolge in B1 Admin unter **Mobile → Navigation** ein.

## Das Menü

Wenn Sie auf **Mehr** tippen, wird das Navigationsmenü geöffnet. Auf einem Tablet oder Desktop ist dasselbe Menü immer auf der linken Seite des Bildschirms sichtbar. Es enthält:

- Ihr Name und Foto mit einer Verknüpfung **Profil bearbeiten** – siehe [Profil bearbeiten](./editing-your-profile.md)
- **Startseite** und **Me**
- **Admin-Portal** – wird nur angezeigt, wenn Sie Administratorberechtigungen bei Ihrer Kirche haben. Es öffnet B1 Admin
- Jede Registerkarte, die Ihre Kirche konfiguriert hat, in Reihenfolge
- **App installieren** – öffnet die [Installationsanweisungen](./installing-pwa.md) unter `/mobile/install`
- Umschalter für hellen/dunklen Modus
- **Anmelden** oder **Abmelden**
- Name Ihrer Kirche und Link zu Datenschutzrichtlinie

## Die Symbolleiste

Die Leiste oben auf jedem Bildschirm zeigt:

- Bildschirmtitel oder Name Ihrer Kirche auf der Startseite
- Zurückpfeil, wenn Sie zu einem Detailbildschirm abgebogen sind
- Symbol **Glocke** für Benachrichtigungen und Nachrichten mit einem Badge für ungelesene Elemente
- Ihr **Profilfoto**, das Ihr Profil unter `/mobile/profileEdit` öffnet – siehe [Profil bearbeiten](./editing-your-profile.md)

## Die Me-Seite

**Me** (`/mobile/me`) ist Ihr persönlicher Hub. Es listet Verknüpfungen zu Ihrem Profil, [Benachrichtigungseinstellungen](./notification-preferences.md), Nachrichten, [Spenden](../giving/) und [Anmeldungen](../events/my-registrations.md) auf, gefolgt von dem, was für Sie ansteht – Diensteinsätze, Veranstaltungsanmeldungen und Gruppenveranstaltungen – und Ihren neuesten Benachrichtigungen. Weitere Informationen finden Sie unter [Die Me-Seite](./me-page).

Wenn Sie abgemeldet sind, zeigt die Me-Seite stattdessen eine Schaltfläche **Anmelden** an.

## Installation auf Ihrem Startbildschirm

Das Mitgliederportal ist eine Progressive Web App. Besuchen Sie `/mobile/install` (oder wählen Sie im Menü **App installieren**), um schrittweise Anweisungen für Ihr Gerät zu erhalten. Nach der Installation wird es von Ihrem Startbildschirm aus im Vollbildmodus ohne Browser-Elemente geöffnet. Siehe [Installation als App (PWA)](./installing-pwa.md).

## Website Ihrer Kirche

Außerhalb des Mitgliederportals hat die öffentliche Website Ihrer Kirche eine eigene Header-Navigation mit Links, die Ihre Administratoren konfiguriert haben – Seiten wie [Predigten](../content/sermons.md), [Bibel](../content/bible.md), [Live-Streaming](../content/live-streaming.md) und eine öffentliche Gruppenliste. Auf einem Telefon befinden sich diese Links hinter dem Hamburger-Symbol in der oberen rechten Ecke der Kopfzeile.

:::info
Die Registerkarten und Tools, die Sie sehen, variieren je nach Kirche. Administratoren steuern, welche Abschnitte für Mitglieder durch B1 Admin sichtbar sind. Wenn Sie also eine hier beschriebene Funktion nicht sehen, hat Ihre Kirche sie möglicherweise nicht aktiviert.
:::
