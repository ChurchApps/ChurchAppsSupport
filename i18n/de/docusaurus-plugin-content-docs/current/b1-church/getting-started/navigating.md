---
title: "Navigation in B1App"
---

# Navigation in B1App

<div class="article-intro">

Das Mitgliederportal auf B1.church ist eine für Smartphones optimierte Web-App unter `/mobile`. Sie funktioniert in jedem Browser und kann auf dem Startbildschirm installiert werden. Diese Seite erklärt das Start-Dashboard, die untere Registerleiste, die Seite Mehr und die Seite Ich.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie müssen [angemeldet](./logging-in.md) sein, um Ihre persönlichen Angaben zu sehen. Abgemeldete Besucher können öffentliche Inhalte weiterhin durchblättern, und wo eine Funktion ein Konto erfordert, wird ihnen eine Schaltfläche **Anmelden** angeboten.

</div>

## Startseite {#home}

Wenn Sie `https://ihrekirche.b1.church/mobile` öffnen, gelangen Sie zum Dashboard **Startseite** unter `/mobile/dashboard`. Die Startseite ist die Einstiegsseite des Mitgliederportals. Sie beginnt mit einer Begrüßung („Guten Morgen“, „Guten Tag“ oder „Guten Abend“ mit Ihrem Vornamen) und dem heutigen Datum. Danach folgen Abschnitte, die nur erscheinen, wenn sie zutreffen:

- **Fotokacheln** – Reiter, denen Ihre Kirche ein Foto gegeben hat (einschließlich Vers des Tages), erscheinen als Fotokacheln unter dem Namen Ihrer Kirche. Je nach Wahl Ihrer Kirche werden sie als zweispaltiges Raster, als seitlich wischbare Zeile oder als Liste mit einem kleinen Vorschaubild neben jedem Namen dargestellt. Siehe [Kacheln auf dem Startbildschirm](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Jeder Fotoreiter erscheint hier, auch wenn er zusätzlich einen Platz in der Registerleiste hat.
- **Neueste Predigt** – Die neueste Predigt Ihrer Kirche mit einem Link **Alle Predigten**
- **Vers des Tages** – Der heutige Vers; tippen Sie darauf, um die vollständige Seite [Vers des Tages](../content/verse-of-the-day.md) zu öffnen
- **Sie dienen** – Ihre nächsten anstehenden Dienstzuweisungen mit einem Link **Alle Pläne**. Benötigt eine Zuweisung noch Ihre Antwort, erscheinen diese zuerst mit einem Abzeichen **Antwort nötig** und den Schaltflächen **Annehmen** / **Ablehnen**, damit Sie direkt von der Startseite aus antworten können (**Ablehnen** bittet Sie vorher um Bestätigung). Andernfalls zeigen Ihre nächsten Zuweisungen ein Abzeichen **Angenommen** oder **Bestätigt**. Tippen Sie auf eine Zuweisung, um deren Plan zu öffnen.
- **Ihre Gruppen** – Bis zu drei Ihrer Gruppen mit Treffzeit und Ort sowie ein Link **Alle Gruppen**
- **Kommende Veranstaltungen** – Wenn Sie angemeldet sind, die nächsten drei kommenden Veranstaltungen aus Gruppen, denen Sie angehören, jeweils mit Datum und Uhrzeit (und einer Vorschau, falls die Veranstaltung ein Foto hat). Tippen Sie auf eine Veranstaltung, um die Veranstaltungen ihrer Gruppe zu öffnen. Tippen Sie auf **Alle kommenden Veranstaltungen**, um die vollständige Liste auf Ihrer [Seite Ich](./me-page.md#upcoming) zu öffnen, die auch Ihre Dienstzuweisungen und Anmeldungen enthält.
- **Spenden** – Wie viel Sie in diesem Jahr gegeben haben („Gegeben in“ im laufenden Jahr), eine Schaltfläche **Geben** und ein Link **Verlauf** zu Ihrem [Spendenverlauf](../giving/donation-history.md). Ausgeblendet, wenn Ihre Kirche den Spendenverlauf der Mitglieder auf ein früheres Jahr beschränkt oder ausgeblendet hat. In diesem Fall erscheint das Spendenwerkzeug Ihrer Kirche stattdessen als Schaltfläche unter **Mehr von**.
- **Mehr von** *Ihrer Kirche* – Schaltflächen für die übrigen Werkzeuge, die Ihre Kirche aktiviert hat und die nicht bereits in der Registerleiste oder oben angezeigt werden. Die von Ihnen meistgenutzten rücken nach vorne.

Die Abschnitte Dienst, Gruppen und Spenden erscheinen nur, wenn Sie angemeldet sind, Ihre Kirche das jeweilige Werkzeug aktiviert hat und es etwas anzuzeigen gibt – zum Beispiel eine anstehende Zuweisung oder mindestens eine Gruppe. Auf einem Computer ist die Startseite zweispaltig aufgebaut.

Sind Sie abgemeldet, zeigt die Startseite anstelle der Begrüßung eine Überschrift **Willkommen** mit einem kurzen Hinweis („Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“) und einer Schaltfläche **Anmelden**. Der Hinweis erscheint auch dann, wenn Ihre Kirche für die Startseite noch nichts anderes eingerichtet hat. Ihre Kirche kann diesen Hinweis umformulieren oder ausblenden. Siehe [Einstellungen der mobilen App](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Wenn er ausgeblendet ist, können Sie sich weiterhin über die Seite **Mehr** oder die Seite **Ich** anmelden.

## Die untere Registerleiste

Auf einem Smartphone ist eine Registerleiste am unteren Bildschirmrand fixiert:

- **Startseite** – immer der erste Reiter
- Bis zu drei der Reiter, die Ihre Kirche eingerichtet hat
- **Mehr** – öffnet die Seite Mehr

Eingebaute Bereiche (etwa Gruppen, Spenden oder Pläne) erhalten zuerst die Plätze in der Registerleiste. Freie Plätze gehen an die eigenen Seiten Ihrer Kirche. Nur Links zu externen Websites und der Vers des Tages erhalten nie einen Reiter. Hat Ihre Kirche mehr Reiter konfiguriert, als Platz finden, gehen die übrigen nicht verloren: Sie erscheinen auf der Seite **Mehr** und im Abschnitt **Mehr von** auf der Startseite. Die Reihenfolge der Reiter legen Kirchenverwaltende in B1 Admin unter **Mobile → Navigation** fest.

## Auf einem Computer

Auf einem breiteren Bildschirm, etwa einem Computer oder einem großen Tablet, wird die untere Registerleiste durch eine Kopfzeile in der Farbe Ihrer Kirche am oberen Bildschirmrand ersetzt. Sie zeigt das Logo Ihrer Kirche oder, falls kein Logo hinterlegt ist, deren Namen (ein Klick darauf führt zur Startseite), **Startseite**, bis zu fünf der Reiter, die Ihre Kirche eingerichtet hat, und **Mehr**. Rechts stehen die Glocke und Ihr Profilfoto. Wenn Sie eine Detailansicht öffnen, erscheint oberhalb des Seiteninhalts ein Link **Zurück**.

## Die Seite Mehr

Ein Tipp auf **Mehr** öffnet die Seite Mehr unter `/mobile/more`. Sie enthält:

- Ihren Namen und Ihr Foto mit einem Link **Profil bearbeiten** – siehe [Ihr Profil bearbeiten](./editing-your-profile.md)
- Jeden Reiter, den Ihre Kirche eingerichtet hat, in der festgelegten Reihenfolge unter dem Namen Ihrer Kirche. Links zu externen Websites öffnen sich in einem neuen Browser-Tab.
- Einen Bereich **Konto** mit:
  - **Ich** – Ihre persönliche Seite (nur angemeldet)
  - **Erscheinungsbild** – Umschalten zwischen **Hellem Modus** und **Dunklem Modus**
  - **Admin-Portal** – nur sichtbar, wenn Sie in Ihrer Kirche Administrationsrechte haben; es öffnet B1 Admin in einem neuen Tab
  - **App installieren** – öffnet die [Installationsanleitung](./installing-pwa.md) unter `/mobile/install` (ausgeblendet, sobald die App installiert ist)
- **Abmelden** bzw. eine Schaltfläche **Anmelden**, wenn Sie abgemeldet sind
- Den Namen Ihrer Kirche und einen Link zur Datenschutzerklärung

## Die App-Leiste

Auf einem Smartphone zeigt die Leiste am oberen Rand jedes Bildschirms:

- Das Logo Ihrer Kirche (oder deren Namen, falls kein Logo hochgeladen wurde) auf der Startseite und den anderen Hauptbildschirmen oder einen Zurück-Pfeil, wenn Sie in eine Detailansicht gewechselt sind. Der Titel des Bildschirms erscheint oben auf der Seite selbst.
- Ein Glockensymbol für Benachrichtigungen und Nachrichten mit einem Zähler für ungelesene Einträge – siehe unten [Benachrichtigungen und Nachrichten](#notifications-and-messages)
- Ihr **Profilfoto**, das Ihr Profil unter `/mobile/profileEdit` öffnet – siehe [Ihr Profil bearbeiten](./editing-your-profile.md)

Die Glocke und das Profilfoto erscheinen nur, wenn Sie angemeldet sind.

## Benachrichtigungen und Nachrichten {#notifications-and-messages}

Ein Tipp auf die Glocke öffnet ein Fenster mit zwei Abschnitten:

- **Nachrichten** – Ihre neuesten privaten Unterhaltungen mit einem Link **Neue Nachricht**, um eine neue zu beginnen
- **Benachrichtigungen** – Ihre neuesten Benachrichtigungen mit einem Abzeichen **Neu** bei ungelesenen. Tippen Sie auf eine Benachrichtigung, um zur Gruppe, zum Plan oder zur Unterhaltung zu gelangen, aus der sie stammt.

Jeder Abschnitt zeigt an, wie viele ungelesene Einträge er enthält. Tippen Sie unten auf **Alle anzeigen**, um Ihren vollständigen Posteingang unter `/mobile/notifications` zu öffnen.

## Seiten mit Abschnitten

Detailseiten – eine Gruppe, ein Plan, Ihre Seite Ich, die Bildschirme Pläne und Spenden – sind als eine Seite aus Abschnitten aufgebaut statt aus Reitern. Jeder Abschnitt zeigt eine kurze Vorschau, und ein Link in der Kopfzeile des Abschnitts (etwa **Alle Mitglieder**, **Alle Veranstaltungen** oder **Vollständige Gottesdienstreihenfolge**) öffnet die vollständige Liste. Ein Link **Zurück zu** oben in dieser Ansicht führt Sie zur Seite zurück, von der Sie kommen.

## Die Seite Ich

**Ich** (`/mobile/me`) ist Ihre persönliche Zentrale. Sie zeigt Ihren Namen und Ihr Foto mit den Schaltflächen **Profil bearbeiten** und **Einstellungen** ([Benachrichtigungseinstellungen](./notification-preferences.md)). Darunter folgt, was für Sie ansteht – Dienstzuweisungen, Veranstaltungsanmeldungen und Gruppentermine –, dann Ihr Haushalt, Ihre Gruppen, Ihre [Spenden](../giving/) in diesem Jahr, die Formulare, die Sie eingereicht haben, Ihr Anwesenheitsverlauf, Ihre [Anmeldungen](../events/my-registrations.md) sowie Ihre neuesten Benachrichtigungen und Nachrichten. Einzelheiten finden Sie unter [Die Seite Ich](./me-page).

Sind Sie abgemeldet, zeigt die Seite Ich stattdessen eine Schaltfläche **Anmelden**.

## Auf dem Startbildschirm installieren

Das Mitgliederportal ist eine Progressive Web App. Rufen Sie `/mobile/install` auf (oder wählen Sie auf der Seite Mehr **App installieren**), um eine Schritt-für-Schritt-Anleitung für Ihr Gerät zu erhalten. Nach der Installation öffnet sich die App vom Startbildschirm aus im Vollbildmodus ohne Browser-Oberfläche. Siehe [Als App installieren (PWA)](./installing-pwa.md).

## Die öffentliche Website Ihrer Kirche

Außerhalb des Mitgliederportals hat die öffentliche Website Ihrer Kirche eine eigene Kopfnavigation mit Links, die Ihre Administrierenden eingerichtet haben – Seiten wie [Predigten](../content/sermons.md), die [Bibel](../content/bible.md), [Livestreaming](../content/live-streaming.md) und eine öffentliche Gruppenliste. Auf einem Smartphone befinden sich diese Links hinter dem Hamburger-Symbol oben rechts in der Kopfzeile.

:::info
Welche Reiter und Werkzeuge Sie sehen, hängt von der Kirche ab. Administrierende legen über B1 Admin fest, welche Bereiche Mitgliedern sichtbar sind. Wenn Sie eine hier beschriebene Funktion nicht sehen, hat Ihre Kirche sie möglicherweise nicht aktiviert.
:::
