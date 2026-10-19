---
title: "Navigation in B1App"
---

# Navigation in B1App

<div class="article-intro">

Das Mitgliederportal auf B1.church ist eine für Smartphones optimierte Web-App unter `/mobile`. Sie funktioniert in jedem Browser und kann auf dem Startbildschirm installiert werden. Diese Seite erklärt das Start-Dashboard, die untere Navigationsleiste, die Seite „Mehr“ und die Seite „Ich“.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie müssen [angemeldet](./logging-in.md) sein, um Ihre persönlichen Daten zu sehen. Abgemeldete Besucher können öffentliche Inhalte weiterhin ansehen; wo eine Funktion ein Konto erfordert, wird ihnen eine Schaltfläche **Anmelden** angeboten.

</div>

## Start {#home}

Wenn Sie `https://yourchurchname.b1.church/mobile` öffnen, gelangen Sie zum Start-Dashboard unter `/mobile/dashboard`. **Start** ist die Einstiegsseite des Mitgliederportals. Sie beginnt mit einer Begrüßung („Guten Morgen“, „Guten Tag“ oder „Guten Abend“ mit Ihrem Vornamen) und dem heutigen Datum, gefolgt von Abschnitten, die nur erscheinen, wenn sie zutreffen:

- **Neueste Predigt** — die neueste Predigt Ihrer Kirche, mit einem Link **Alle Predigten**
- **Vers des Tages** — der heutige Vers; tippen Sie darauf, um die vollständige Seite [Vers des Tages](../content/verse-of-the-day.md) zu öffnen
- **Sie dienen mit** — Ihre nächsten anstehenden Dienst-Einsätze, mit einem Link **Alle Pläne**. Wenn ein Einsatz noch Ihre Antwort braucht, wird er zuerst mit einer Markierung **Antwort nötig** und den Schaltflächen **Annehmen** / **Ablehnen** angezeigt, sodass Sie direkt von der Startseite antworten können (**Ablehnen** verlangt zuerst eine Bestätigung). Andernfalls zeigen Ihre nächsten Einsätze eine Markierung **Angenommen** oder **Bestätigt**. Tippen Sie auf einen Einsatz, um seinen Plan zu öffnen.
- **Ihre Gruppen** — bis zu drei Ihrer Gruppen mit Treffzeit und Ort sowie einem Link **Alle Gruppen**
- **Spenden** — wie viel Sie in diesem Jahr gegeben haben („Gegeben im“ laufenden Jahr), eine Schaltfläche **Geben** und einen Link **Verlauf** zu Ihrem [Spendenverlauf](../giving/donation-history.md)
- **Mehr von** *Ihrer Kirche* — Schaltflächen für die übrigen Werkzeuge, die Ihre Kirche aktiviert hat und die nicht bereits in der Navigationsleiste oder oben angezeigt werden. Die von Ihnen meistgenutzten rücken nach vorne.

Die Abschnitte Dienst, Gruppen und Spenden erscheinen nur, wenn Sie angemeldet sind, Ihre Kirche das jeweilige Werkzeug aktiviert hat und es etwas anzuzeigen gibt — zum Beispiel einen anstehenden Einsatz oder mindestens eine Gruppe. Auf einem Computer ist die Startseite zweispaltig aufgebaut.

Wenn Sie abgemeldet sind, zeigt die Startseite statt der Begrüßung die Überschrift **Willkommen**, einen kurzen Hinweis („Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“) und eine Schaltfläche **Anmelden**. Der Hinweis erscheint auch dann, wenn Ihre Kirche für die Startseite noch nichts anderes eingerichtet hat. Ihre Kirche kann diesen Hinweis umformulieren oder ausblenden — siehe [Einstellungen der mobilen App](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Ist er ausgeblendet, können Sie sich weiterhin über die Seite **Mehr** oder die Seite **Ich** anmelden.

## Die untere Navigationsleiste

Auf dem Smartphone ist eine Navigationsleiste fest am unteren Bildschirmrand angebracht:

- **Start** — immer der erste Reiter
- Bis zu drei der Reiter, die Ihre Kirche eingerichtet hat
- **Mehr** — öffnet die Seite Mehr

Links zu externen Websites, eigenen Seiten und der Vers des Tages erhalten nie einen eigenen Reiter. Hat Ihre Kirche mehr Reiter eingerichtet, als Platz haben, gehen die übrigen nicht verloren: Sie erscheinen auf der Seite **Mehr** und im Abschnitt **Mehr von** auf der Startseite. Kirchenadministratoren legen die Reihenfolge der Reiter in B1 Admin unter **Mobil → Navigation** fest.

## Am Computer

Auf einem breiteren Bildschirm, etwa einem Computer oder einem großen Tablet, wird die untere Navigationsleiste durch eine Kopfzeile am oberen Rand in der Farbe Ihrer Kirche ersetzt. Sie zeigt den Namen Ihrer Kirche (ein Klick darauf führt zur Startseite), **Start**, bis zu fünf der Reiter, die Ihre Kirche eingerichtet hat, und **Mehr**; rechts außerdem die Glocke und Ihr Profilfoto. Wenn Sie eine Detailansicht öffnen, erscheint oberhalb des Seiteninhalts ein Link **Zurück**.

## Die Seite Mehr {#the-more-page}

Ein Tipp auf **Mehr** öffnet die Seite Mehr unter `/mobile/more`. Sie enthält:

- Ihren Namen und Ihr Foto mit einem Link **Profil bearbeiten** — siehe [Ihr Profil bearbeiten](./editing-your-profile.md)
- Alle Reiter, die Ihre Kirche eingerichtet hat, in dieser Reihenfolge unter dem Namen Ihrer Kirche. Links zu externen Websites öffnen sich in einem neuen Browser-Tab.
- Einen Abschnitt **Konto** mit:
  - **Ich** — Ihre persönliche Seite (nur angemeldet)
  - **Darstellung** — zwischen **Hellmodus** und **Dunkelmodus** wechseln
  - **Admin-Portal** — nur sichtbar, wenn Sie in Ihrer Kirche Administratorrechte haben; öffnet B1 Admin in einem neuen Tab
  - **App installieren** — öffnet die [Installationsanleitung](./installing-pwa.md) unter `/mobile/install` (ausgeblendet, sobald die App installiert ist)
- **Abmelden** bzw. eine Schaltfläche **Anmelden**, wenn Sie abgemeldet sind
- Den Namen Ihrer Kirche und einen Link zur Datenschutzerklärung

## Die App-Leiste

Auf dem Smartphone zeigt die Leiste am oberen Rand jedes Bildschirms:

- Den Namen Ihrer Kirche auf der Startseite und den übrigen Hauptbildschirmen oder einen Zurück-Pfeil, wenn Sie in eine Detailansicht gewechselt sind. Der Titel des Bildschirms erscheint oben auf der Seite selbst.
- Ein **Glocken**-Symbol für Benachrichtigungen und Nachrichten mit einer Anzeige für ungelesene Einträge — siehe unten [Benachrichtigungen und Nachrichten](#notifications-and-messages)
- Ihr **Profilfoto**, das Ihr Profil unter `/mobile/profileEdit` öffnet — siehe [Ihr Profil bearbeiten](./editing-your-profile.md)

Glocke und Profilfoto erscheinen nur, wenn Sie angemeldet sind.

## Benachrichtigungen und Nachrichten {#notifications-and-messages}

Ein Tipp auf die Glocke öffnet ein Fenster mit zwei Abschnitten:

- **Nachrichten** — Ihre neuesten privaten Unterhaltungen, mit einem Link **Neue Nachricht**, um eine neue zu beginnen
- **Benachrichtigungen** — Ihre neuesten Benachrichtigungen, ungelesene mit einer Markierung **Neu**. Tippen Sie auf eine Benachrichtigung, um zur Gruppe, zum Plan oder zur Unterhaltung zu gelangen, von der sie stammt.

Jeder Abschnitt zeigt an, wie viele ungelesene Einträge er enthält. Tippen Sie unten auf **Alle anzeigen**, um Ihren vollständigen Posteingang unter `/mobile/notifications` zu öffnen.

## Seiten mit Abschnitten

Detailseiten — eine Gruppe, ein Plan, Ihre Seite Ich sowie die Bildschirme Pläne und Spenden — sind als eine Seite mit Abschnitten statt mit Reitern aufgebaut. Jeder Abschnitt zeigt eine kurze Vorschau, und ein Link in der Kopfzeile des Abschnitts (etwa **Alle Mitglieder**, **Alle Veranstaltungen** oder **Vollständige Gottesdienstordnung**) öffnet die vollständige Liste. Ein Link **Zurück zu** oben in dieser Ansicht führt Sie zur Seite zurück, von der Sie gekommen sind.

## Die Seite Ich

**Ich** (`/mobile/me`) ist Ihre persönliche Übersicht. Sie zeigt Ihren Namen und Ihr Foto mit den Schaltflächen **Profil bearbeiten** und **Einstellungen** ([Benachrichtigungseinstellungen](./notification-preferences.md)), darunter, was für Sie ansteht — Dienst-Einsätze, Veranstaltungsanmeldungen und Gruppenveranstaltungen —, gefolgt von Ihrem Haushalt, Ihren Gruppen, Ihren [Spenden](../giving/) in diesem Jahr, Ihren [Anmeldungen](../events/my-registrations.md) sowie Ihren neuesten Benachrichtigungen und Nachrichten. Details finden Sie unter [Die Seite Ich](./me-page).

Wenn Sie abgemeldet sind, zeigt die Seite Ich stattdessen eine Schaltfläche **Anmelden**.

## Auf dem Startbildschirm installieren

Das Mitgliederportal ist eine Progressive Web App. Rufen Sie `/mobile/install` auf (oder wählen Sie auf der Seite Mehr die Option **App installieren**), um eine Schritt-für-Schritt-Anleitung für Ihr Gerät zu erhalten. Nach der Installation öffnet es sich vom Startbildschirm aus im Vollbildmodus ohne Browseroberfläche. Siehe [Als App installieren (PWA)](./installing-pwa.md).

## Die öffentliche Website Ihrer Kirche

Außerhalb des Mitgliederportals hat die öffentliche Website Ihrer Kirche eine eigene Kopfnavigation mit Links, die Ihre Administratoren eingerichtet haben — Seiten wie [Predigten](../content/sermons.md), die [Bibel](../content/bible.md), [Live-Streaming](../content/live-streaming.md) und eine öffentliche Gruppenliste. Auf dem Smartphone befinden sich diese Links hinter dem Menüsymbol (drei Striche) oben rechts in der Kopfzeile.

:::info
Die Reiter und Werkzeuge, die Sie sehen, hängen von der Kirche ab. Administratoren legen über B1 Admin fest, welche Bereiche Mitgliedern sichtbar sind. Wenn Sie eine hier beschriebene Funktion nicht sehen, hat Ihre Kirche sie möglicherweise nicht aktiviert.
:::
