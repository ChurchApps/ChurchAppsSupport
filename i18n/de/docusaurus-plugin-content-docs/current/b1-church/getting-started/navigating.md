---
title: "Navigation in B1App"
---

# Navigation in B1App

<div class="article-intro">

Das Mitgliederportal von B1.church ist eine webbasierte App für Smartphones, die unter `/mobile` läuft. Sie funktioniert in jedem Browser und kann auf dem Startbildschirm installiert werden. Diese Seite erklärt das Home-Dashboard, die untere Registerleiste, die Seite „Mehr“ und die Me-Seite.

</div>

## Video-Rundgang

<YouTube id="8XKRZvvAbXg" title="A Tour of the B1.church Member App" next="A Tour of B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie müssen [angemeldet](./logging-in.md) sein, um Ihre persönlichen Informationen zu sehen. Abgemeldete Besucher können weiterhin öffentliche Inhalte durchsuchen und erhalten dort, wo eine Funktion ein Konto erfordert, eine Schaltfläche **Anmelden**.

</div>

## Home {#home}

Wenn Sie `https://yourchurchname.b1.church/mobile` öffnen, gelangen Sie zum Dashboard **Home** unter `/mobile/dashboard`. Home ist die Startseite des Mitgliederportals. Sie beginnt mit einer Begrüßung („Guten Morgen“, „Guten Tag“ oder „Guten Abend“ mit Ihrem Vornamen) und dem heutigen Datum, gefolgt von Abschnitten, die nur erscheinen, wenn sie zutreffen:

- **Fotokacheln** – Registerkarten, denen Ihre Gemeinde ein Foto zugewiesen hat (einschließlich Vers des Tages), erscheinen als Fotokacheln unter dem Namen Ihrer Gemeinde. Je nach Wahl Ihrer Gemeinde sind sie als zweispaltiges Raster, als Reihe, die Sie seitlich wischen können (und die sich auch von selbst weiterbewegen kann), oder als Liste mit einer kleinen Vorschau neben jedem Namen angeordnet – siehe [Startbildschirm-Kacheln](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Jede Foto-Registerkarte erscheint hier, auch wenn sie zusätzlich einen Platz in der Registerleiste hat.
- **Neueste Predigt** – die neueste Predigt Ihrer Gemeinde, mit einem Link **Alle Predigten**
- **Vers des Tages** – der heutige Vers; tippen Sie darauf, um die vollständige Seite [Vers des Tages](../content/verse-of-the-day.md) zu öffnen
- **Sie dienen** – Ihre nächsten anstehenden Dienstaufgaben, mit einem Link **Alle Pläne**. Wenn eine Aufgabe noch Ihre Antwort benötigt, werden diese zuerst angezeigt, mit dem Abzeichen **Antwort nötig** und den Schaltflächen **Annehmen** / **Ablehnen**, damit Sie direkt auf Home antworten können (**Ablehnen** fragt zuerst zur Bestätigung nach). Andernfalls zeigen Ihre nächsten Aufgaben ein Abzeichen **Angenommen** oder **Bestätigt**. Tippen Sie auf eine Aufgabe, um ihren Plan zu öffnen.
- **Ihre Gruppen** – bis zu drei Ihrer Gruppen mit Treffzeit und Ort sowie einem Link **Alle Gruppen**
- **Kommende Veranstaltungen** – wenn Sie angemeldet sind, die nächsten drei kommenden Veranstaltungen aus den Gruppen, denen Sie angehören, jeweils mit Datum und Uhrzeit (und einer Vorschau, falls die Veranstaltung ein Foto hat). Tippen Sie auf eine Veranstaltung, um die Veranstaltungen der zugehörigen Gruppe zu öffnen. Tippen Sie auf **Alle kommenden Veranstaltungen**, um die vollständige Liste auf Ihrer [Me-Seite](./me-page.md#upcoming) zu öffnen, die auch Ihre Dienstaufgaben und Anmeldungen enthält.
- **Meine Anwesenheit** und **Meine Formulare** – sofern Ihre Gemeinde sie aktiviert, wie oft Sie in den letzten 90 Tagen anwesend waren, mit Ihren zwei letzten Besuchen, sowie Ihre zwei letzten eingereichten Formulare, mit Links zu den vollständigen Listen. Diese erscheinen immer auf Ihrer [Me-Seite](./me-page.md) – siehe [Abschnitte des Startbildschirms](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Spenden** – wie viel Sie in diesem Jahr gespendet haben („Gegeben in“ das aktuelle Jahr), eine Schaltfläche **Spenden** (nur sichtbar, wenn Ihre Gemeinde Online-Spenden anbietet) und einen Link **Verlauf** zu Ihrem [Spendenverlauf](../giving/donation-history.md). Ausgeblendet, wenn Ihre Gemeinde den Spendenverlauf der Mitglieder auf ein früheres Jahr beschränkt oder ausgeblendet hat; in diesem Fall erscheint das Spendenwerkzeug Ihrer Gemeinde stattdessen als Schaltfläche unter **Weitere aus**.
- **Weitere aus** *Ihrer Gemeinde* – Schaltflächen für die übrigen Werkzeuge, die Ihre Gemeinde aktiviert hat und die nicht bereits in der Registerleiste oder oben angezeigt werden. Die von Ihnen meistgenutzten rücken nach vorne.

Die Abschnitte für Dienste, Gruppen, Anwesenheit, Formulare und Spenden erscheinen nur, wenn Sie angemeldet sind, Ihre Gemeinde dieses Werkzeug aktiviert hat und es etwas anzuzeigen gibt – zum Beispiel eine anstehende Aufgabe oder mindestens eine Gruppe. Auf einem Computer ist Home zweispaltig angeordnet.

Wenn Sie abgemeldet sind, zeigt Home anstelle der Begrüßung eine Überschrift **Willkommen** mit einem kurzen Hinweis („Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“) und einer Schaltfläche **Anmelden**. Dieser Hinweis wird auch angezeigt, wenn Ihre Gemeinde für Home noch nichts anderes eingerichtet hat. Ihre Gemeinde kann diesen Hinweis umformulieren oder ausblenden – siehe [Einstellungen der mobilen App](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Ist er ausgeblendet, können Sie sich weiterhin über die Seite **Mehr** oder die Seite **Me** anmelden.

## Die untere Registerleiste

Auf einem Smartphone ist eine Registerleiste unten am Bildschirm fixiert:

- **Home** – immer der erste Tab
- Bis zu drei der Tabs, die Ihre Gemeinde konfiguriert hat
- **Mehr** – öffnet die Seite Mehr

Integrierte Bereiche (wie Gruppen, Spenden oder Pläne) erhalten zuerst die Registerplätze; freie Plätze gehen an die benutzerdefinierten Seiten Ihrer Gemeinde. Nur Links zu externen Websites und der Vers des Tages erhalten nie einen Tab. Wenn Ihre Gemeinde mehr Tabs konfiguriert hat, als Platz ist, gehen diese nicht verloren: Sie erscheinen auf der Seite **Mehr** und im Abschnitt **Weitere aus** auf Home. Gemeindeadministratoren legen die Reihenfolge der Tabs in B1 Admin unter **Mobil → Navigation** fest.

## Auf einem Computer

Auf einem breiteren Bildschirm, etwa einem Computer oder einem großen Tablet, wird die untere Registerleiste durch eine Kopfzeile am oberen Bildschirmrand in der Farbe Ihrer Gemeinde ersetzt. Sie zeigt das Logo Ihrer Gemeinde oder, falls kein Logo hinterlegt ist, deren Namen (ein Klick darauf führt zurück zu Home), **Home**, bis zu fünf der von Ihrer Gemeinde konfigurierten Tabs und **Mehr**, rechts ergänzt durch die Glocke und Ihr Profilfoto. Wenn Sie eine Detailansicht öffnen, erscheint oberhalb des Seiteninhalts ein Link **Zurück**.

## Die Seite „Mehr“

Ein Tippen auf **Mehr** öffnet die Seite Mehr unter `/mobile/more`. Sie enthält:

- Ihren Namen und Ihr Foto mit einem Link **Profil bearbeiten** – siehe [Ihr Profil bearbeiten](./editing-your-profile.md)
- Alle von Ihrer Gemeinde konfigurierten Tabs in der richtigen Reihenfolge unter dem Namen Ihrer Gemeinde. Links zu externen Websites öffnen sich in einem neuen Browser-Tab.
- Einen Bereich **Konto** mit:
  - **Me** – Ihre persönliche Seite (nur bei Anmeldung)
  - **Darstellung** – wechseln Sie zwischen **Hellmodus** und **Dunkelmodus**
  - **Verwaltungsportal** – nur sichtbar, wenn Sie in Ihrer Gemeinde Administratorrechte haben; öffnet B1 Admin in einem neuen Tab
  - **App installieren** – öffnet die [Installationsanleitung](./installing-pwa.md) unter `/mobile/install` (ausgeblendet, sobald die App installiert ist)
- **Abmelden** bzw. eine Schaltfläche **Anmelden**, wenn Sie abgemeldet sind
- Den Namen Ihrer Gemeinde und einen Link zur Datenschutzerklärung

## Die App-Leiste

Auf einem Smartphone zeigt die Leiste am oberen Rand jedes Bildschirms:

- Das Logo Ihrer Gemeinde (oder deren Namen, falls Ihre Gemeinde kein Logo hochgeladen hat) auf Home und den anderen Hauptbildschirmen oder einen Zurück-Pfeil, wenn Sie in eine Detailansicht gewechselt sind. Der Titel des Bildschirms erscheint oben auf der Seite selbst.
- Ein Symbol **Glocke** für Benachrichtigungen und Nachrichten mit einer Anzeige für ungelesene Einträge – siehe [Benachrichtigungen und Nachrichten](#notifications-and-messages) weiter unten
- Ihr **Profilfoto**, das Ihr Profil unter `/mobile/profileEdit` öffnet – siehe [Ihr Profil bearbeiten](./editing-your-profile.md)

Die Glocke und das Profilfoto erscheinen nur, wenn Sie angemeldet sind.

## Benachrichtigungen und Nachrichten

Ein Tippen auf die Glocke öffnet ein Fenster mit zwei Abschnitten:

- **Nachrichten** – Ihre neuesten privaten Unterhaltungen, mit einem Link **Neue Nachricht**, um eine neue zu beginnen
- **Benachrichtigungen** – Ihre neuesten Benachrichtigungen, bei ungelesenen mit einem Abzeichen **Neu**. Tippen Sie auf eine Benachrichtigung, um zu der Gruppe, dem Plan oder der Unterhaltung zu gelangen, von der sie stammt.

Jeder Abschnitt zeigt, wie viele ungelesene Einträge er enthält. Tippen Sie unten auf **Alle anzeigen**, um Ihren vollständigen Posteingang unter `/mobile/notifications` zu öffnen.

## Seiten mit Abschnitten

Detailseiten – eine Gruppe, ein Plan, Ihre Me-Seite sowie die Bildschirme Pläne und Spenden – sind als eine Seite mit Abschnitten statt Registerkarten aufgebaut. Jeder Abschnitt zeigt eine kurze Vorschau, und ein Link in der Kopfzeile des Abschnitts (etwa **Alle Mitglieder**, **Alle Veranstaltungen** oder **Vollständige Gottesdienstordnung**) öffnet die vollständige Liste. Ein Link **Zurück zu** oben in dieser Ansicht führt Sie zur Seite zurück, von der Sie kamen.

## Die Me-Seite

**Me** (`/mobile/me`) ist Ihr persönlicher Mittelpunkt. Sie zeigt Ihren Namen und Ihr Foto mit den Schaltflächen **Profil bearbeiten** und **Einstellungen** ([Benachrichtigungseinstellungen](./notification-preferences.md)), danach, was für Sie ansteht – Dienstaufgaben, Veranstaltungsanmeldungen und Gruppenveranstaltungen –, gefolgt von Ihrem Haushalt, Ihren Gruppen, Ihren [Spenden](../giving/) in diesem Jahr, den von Ihnen eingereichten Formularen, Ihrer Anwesenheitshistorie, Ihren [Anmeldungen](../events/my-registrations.md) sowie Ihren aktuellen Benachrichtigungen und Nachrichten. Details finden Sie unter [Die Me-Seite](./me-page).

Wenn Sie abgemeldet sind, zeigt die Me-Seite stattdessen eine Schaltfläche **Anmelden**.

## Auf dem Startbildschirm installieren

Das Mitgliederportal ist eine Progressive Web App. Rufen Sie `/mobile/install` auf (oder wählen Sie auf der Seite Mehr **App installieren**), um eine Schritt-für-Schritt-Anleitung für Ihr Gerät zu erhalten. Nach der Installation öffnet sich die App vom Startbildschirm aus im Vollbildmodus ohne Browseroberfläche. Siehe [App als PWA installieren](./installing-pwa.md).

## Die öffentliche Website Ihrer Gemeinde

Außerhalb des Mitgliederportals hat die öffentliche Website Ihrer Gemeinde eine eigene Kopfnavigation mit Links, die Ihre Administratoren eingerichtet haben – Seiten wie [Predigten](../content/sermons.md), die [Bibel](../content/bible.md), [Live-Übertragungen](../content/live-streaming.md) und eine öffentliche Gruppenliste. Auf einem Smartphone liegen diese Links hinter dem Hamburger-Symbol oben rechts in der Kopfzeile.

:::info
Die Registerkarten und Werkzeuge, die Sie sehen, hängen von der Gemeinde ab. Administratoren legen über B1 Admin fest, welche Bereiche für Mitglieder sichtbar sind. Wenn Sie eine hier beschriebene Funktion nicht sehen, hat Ihre Gemeinde sie möglicherweise nicht aktiviert.
:::
