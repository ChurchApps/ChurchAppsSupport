---
title: "B1App-Navigation"
---

# B1App-Navigation

<div class="article-intro">

Das Mitgliederportal auf B1.church ist eine für das Smartphone entwickelte Web-App unter `/mobile`. Sie funktioniert in jedem Browser und lässt sich auf dem Startbildschirm installieren. Diese Seite erklärt das Startseiten-Dashboard, die untere Registerleiste, die Seite Mehr und die Seite Ich.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie müssen [angemeldet](./logging-in.md) sein, um Ihre persönlichen Angaben zu sehen. Nicht angemeldete Besucher können öffentliche Inhalte weiterhin durchsuchen, und dort, wo eine Funktion ein Konto erfordert, wird ihnen eine Schaltfläche **Anmelden** angeboten.

</div>

## Startseite {#home}

Wenn Sie `https://ihregemeinde.b1.church/mobile` öffnen, gelangen Sie zum Dashboard **Startseite** unter `/mobile/dashboard`. Die Startseite ist die Einstiegsseite des Mitgliederportals. Sie beginnt mit einer Begrüßung („Guten Morgen“, „Guten Tag“ oder „Guten Abend“ mit Ihrem Vornamen) und dem heutigen Datum. Danach folgen Abschnitte, die nur erscheinen, wenn sie zutreffen:

- **Neueste Predigt** -- die neueste Predigt Ihrer Gemeinde, mit dem Link **Alle Predigten**
- **Vers des Tages** -- der heutige Vers; tippen Sie darauf, um die vollständige Seite [Vers des Tages](../content/verse-of-the-day.md) zu öffnen
- **Sie dienen** -- Ihre nächsten anstehenden Dienstzuweisungen, mit dem Link **Alle Pläne**. Zuweisungen, auf die Sie noch antworten müssen, werden zuerst angezeigt, mit der Markierung **Antwort ausstehend** und den Schaltflächen **Annehmen** / **Ablehnen**, damit Sie direkt auf der Startseite reagieren können. Andernfalls zeigen Ihre nächsten Zuweisungen die Markierung **Angenommen** oder **Bestätigt**. Tippen Sie auf eine Zuweisung, um deren Plan zu öffnen.
- **Ihre Gruppen** -- bis zu drei Ihrer Gruppen mit Treffzeit und Ort sowie der Link **Alle Gruppen**
- **Spenden** -- wie viel Sie in diesem Jahr gegeben haben („Gegeben im“ aktuelles Jahr), eine Schaltfläche **Geben** und ein Link **Verlauf** zu Ihrem [Spendenverlauf](../giving/donation-history.md)
- **Mehr von** *Ihrer Gemeinde* -- Schaltflächen für die übrigen Werkzeuge, die Ihre Gemeinde aktiviert hat und die nicht bereits in der Registerleiste stehen oder oben angezeigt werden. Die von Ihnen meistgenutzten rücken nach vorne.

Die Abschnitte Dienst, Gruppen und Spenden erscheinen nur, wenn Sie angemeldet sind, Ihre Gemeinde das jeweilige Werkzeug aktiviert hat und es etwas anzuzeigen gibt -- zum Beispiel eine kommende Zuweisung oder mindestens eine Gruppe. Auf einem Computer ist die Startseite zweispaltig aufgebaut.

Wenn Sie abgemeldet sind, zeigt die Startseite anstelle der Begrüßung eine Überschrift **Willkommen** mit einem kurzen Hinweis („Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“) und einer Schaltfläche **Anmelden**. Ihre Gemeinde kann diesen Hinweis umformulieren oder ausblenden -- siehe [Einstellungen der Mobile App](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Ist er ausgeblendet, können Sie sich weiterhin über die Seite **Mehr** oder die Seite **Ich** anmelden.

## Die untere Registerleiste

Auf dem Smartphone ist am unteren Bildschirmrand eine Registerleiste fixiert:

- **Startseite** -- immer der erste Reiter
- Bis zu drei der Reiter, die Ihre Gemeinde eingerichtet hat
- **Mehr** -- öffnet die Seite Mehr

Links zu externen Websites, eigenen Seiten und dem Vers des Tages erhalten nie einen eigenen Reiter. Hat Ihre Gemeinde mehr Reiter eingerichtet, als Platz ist, gehen die übrigen nicht verloren: Sie erscheinen auf der Seite **Mehr** und im Abschnitt **Mehr von** auf der Startseite. Gemeindeverwalter legen die Reihenfolge der Reiter in B1 Admin unter **Mobil → Navigation** fest.

## Am Computer

Auf einem breiteren Bildschirm, etwa an einem Computer oder einem großen Tablet, wird die untere Registerleiste durch eine Kopfzeile am oberen Bildschirmrand in der Farbe Ihrer Gemeinde ersetzt. Sie zeigt den Namen Ihrer Gemeinde (ein Klick darauf führt zurück zur Startseite), **Startseite**, bis zu fünf der Reiter Ihrer Gemeinde und **Mehr**. Rechts stehen die Glocke und Ihr Profilfoto. Wenn Sie eine Detailansicht öffnen, erscheint oberhalb des Seiteninhalts ein Link **Zurück**.

## Die Seite Mehr

Ein Tipp auf **Mehr** öffnet die Seite Mehr unter `/mobile/more`. Sie enthält:

- Ihren Namen und Ihr Foto mit einem Link **Profil bearbeiten** -- siehe [Ihr Profil bearbeiten](./editing-your-profile.md)
- Alle Reiter, die Ihre Gemeinde eingerichtet hat, in der festgelegten Reihenfolge unter dem Namen Ihrer Gemeinde. Links zu externen Websites öffnen sich in einem neuen Browser-Tab.
- einen Abschnitt **Konto** mit:
  - **Ich** -- Ihre persönliche Seite (nur angemeldet)
  - **Erscheinungsbild** -- wechseln Sie zwischen **Heller Modus** und **Dunkler Modus**
  - **Admin-Portal** -- wird nur angezeigt, wenn Sie in Ihrer Gemeinde Administratorrechte haben; öffnet B1 Admin in einem neuen Tab
  - **App installieren** -- öffnet die [Installationsanleitung](./installing-pwa.md) unter `/mobile/install` (ausgeblendet, sobald die App installiert ist)
- **Abmelden** bzw. eine Schaltfläche **Anmelden**, wenn Sie abgemeldet sind
- den Namen Ihrer Gemeinde und einen Link zur Datenschutzerklärung

## Die App-Leiste

Auf dem Smartphone zeigt die Leiste am oberen Rand jedes Bildschirms:

- den Namen Ihrer Gemeinde auf der Startseite und den anderen Hauptbildschirmen oder einen Zurück-Pfeil, wenn Sie in eine Detailansicht gewechselt sind. Der Titel des Bildschirms erscheint oben auf der Seite selbst.
- eine **Glocke** für Benachrichtigungen und Nachrichten mit einer Markierung für ungelesene Einträge -- siehe unten [Benachrichtigungen und Nachrichten](#notifications-and-messages)
- Ihr **Profilfoto**, das Ihr Profil unter `/mobile/profileEdit` öffnet -- siehe [Ihr Profil bearbeiten](./editing-your-profile.md)

Glocke und Profilfoto erscheinen nur, wenn Sie angemeldet sind.

## Benachrichtigungen und Nachrichten

Ein Tipp auf die Glocke öffnet ein Fenster mit zwei Abschnitten:

- **Nachrichten** -- Ihre neuesten privaten Gespräche mit dem Link **Neue Nachricht**, um ein neues zu beginnen
- **Benachrichtigungen** -- Ihre neuesten Benachrichtigungen, ungelesene mit der Markierung **Neu**. Tippen Sie auf eine Benachrichtigung, um zur Gruppe, zum Plan oder zum Gespräch zu gelangen, von dem sie stammt.

Jeder Abschnitt zeigt, wie viele ungelesene Einträge er enthält. Tippen Sie unten auf **Alle anzeigen**, um Ihren vollständigen Posteingang unter `/mobile/notifications` zu öffnen.

## Seiten mit Abschnitten

Detailseiten -- eine Gruppe, ein Plan, Ihre Seite Ich sowie die Bildschirme Pläne und Spenden -- sind als eine Seite mit Abschnitten aufgebaut statt mit Reitern. Jeder Abschnitt zeigt eine kurze Vorschau, und ein Link in der Kopfzeile des Abschnitts (etwa **Alle Mitglieder**, **Alle Veranstaltungen** oder **Vollständiger Gottesdienstablauf**) öffnet die vollständige Liste. Ein Link **Zurück zu** oben in dieser Ansicht bringt Sie zur vorherigen Seite zurück.

## Die Seite Ich

**Ich** (`/mobile/me`) ist Ihre persönliche Übersicht. Sie zeigt Ihren Namen und Ihr Foto mit den Schaltflächen **Profil bearbeiten** und **Einstellungen** ([Benachrichtigungseinstellungen](./notification-preferences.md)). Darunter folgen Ihre anstehenden Termine -- Dienstzuweisungen, Veranstaltungsanmeldungen und Gruppenveranstaltungen --, anschließend Ihr Haushalt, Ihre Gruppen, Ihre [Spenden](../giving/) in diesem Jahr, Ihre [Anmeldungen](../events/my-registrations.md) sowie Ihre aktuellen Benachrichtigungen und Nachrichten. Einzelheiten finden Sie unter [Die Seite Ich](./me-page).

Wenn Sie abgemeldet sind, zeigt die Seite Ich stattdessen eine Schaltfläche **Anmelden**.

## Auf dem Startbildschirm installieren

Das Mitgliederportal ist eine Progressive Web App. Rufen Sie `/mobile/install` auf (oder wählen Sie auf der Seite Mehr **App installieren**), um eine Schritt-für-Schritt-Anleitung für Ihr Gerät zu erhalten. Nach der Installation öffnet es sich im Vollbild direkt vom Startbildschirm, ohne Browser-Oberfläche. Siehe [Als App installieren (PWA)](./installing-pwa.md).

## Die öffentliche Website Ihrer Gemeinde

Außerhalb des Mitgliederportals hat die öffentliche Website Ihrer Gemeinde eine eigene Kopfnavigation mit Links, die Ihre Verwalter eingerichtet haben -- Seiten wie [Predigten](../content/sermons.md), die [Bibel](../content/bible.md), [Live-Streaming](../content/live-streaming.md) und eine öffentliche Gruppenliste. Auf dem Smartphone verbergen sich diese Links hinter dem Hamburger-Symbol oben rechts in der Kopfzeile.

:::info
Welche Reiter und Werkzeuge Sie sehen, hängt von Ihrer Gemeinde ab. Die Verwalter legen über B1 Admin fest, welche Bereiche für Mitglieder sichtbar sind. Wenn Sie eine hier beschriebene Funktion nicht sehen, hat Ihre Gemeinde sie möglicherweise nicht aktiviert.
:::
