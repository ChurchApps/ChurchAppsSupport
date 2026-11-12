---
title: "Verbundene Dienste"
description: "Verbinden Sie B1 Admin mit Mailchimp, Donorbox, Subsplash, VOMO, Clearstream und anderen Werkzeugen über Zapier- oder Make-Rezepte, mit Einrichtungsanleitungen für jeden Dienst."
---

# Verbundene Dienste

<div class="article-intro">

Der schnellste Weg, B1 mit einem anderen Werkzeug für die Gemeindetechnik zu verbinden, ist meist ein Rezept für Zapier oder Make. Sie benötigen dafür keine neue Infrastruktur bei B1, und der Drittanbieter betreibt den Ablauf. Diese Seite ist eine ausgewählte Liste von Diensten, deren Anbindung wir bestätigt haben, mit einer kurzen Einrichtungsanleitung zum Kopieren und Einfügen für jeden Dienst.

</div>

## Auf einen Blick {#at-a-glance}

| Dienst | Kategorie | Brücke | Was Sie verbinden können |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-Mail | In B1 integriert (Reiter Webhooks) | Eine Mailchimp-Zielgruppe mit Personen, Gruppen und gespeicherten Listen aus B1 synchron halten |
| [Donorbox](./donorbox.md) | Spenden | Zapier | Donorbox-Spenden und -Spender in B1 übertragen |
| [Subsplash](./subsplash.md) | App / Spenden | Zapier | Subsplash-Spenden und Personen in B1 übernehmen |
| [VOMO](./vomo.md) | Ehrenamt | Zapier | Anmeldungen von Ehrenamtlichen zwischen B1-Gruppen und VOMO-Projekten synchronisieren |
| [Clearstream](./clearstream.md) | SMS | Zapier | Eine Clearstream-Textnachricht aus B1-Ereignissen auslösen; Antworten als B1-Datensätze übernehmen |
| [Text In Church](./text-in-church.md) | SMS / Workflows | Zapier | Text-In-Church-Workflows aus B1 auslösen; Connect-Card-Daten empfangen |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier oder Make | SMS aus jedem B1-Ereignis senden |
| [Checkr](./checkr.md) | Hintergrundprüfungen | Make | Eine Hintergrundprüfung starten, sobald jemand einem Dienst-Team beitritt |

## Was all diese gemeinsam haben {#what-all-of-these-have-in-common}

1. **Die B1-Seite der Verbindung ist identisch** – erstellen Sie einen API-Schlüssel mit den richtigen Berechtigungen unter **B1Admin → Einstellungen → Entwickler → API-Schlüssel**. Dann lassen Sie die Brücke entweder einen Webhook für den Auslöser registrieren (Zapier / Make tun dies automatisch und benötigen `settings:write`) oder Sie rufen die REST-Endpunkte von B1 aus einer nachgelagerten Aktion auf. Die Zapier-App von B1.church benötigt `settings:write` bei jedem Schlüssel, weil sie den Schlüssel beim Verbinden gegen die Webhook-Liste von B1 prüft. (Mailchimp ist die Ausnahme: Die Synchronisation ist in B1 integriert und wird auf dem Reiter **Webhooks** eingerichtet, ohne API-Schlüssel und ohne Brücke.)
2. **Die Brücke wird Ihnen berechnet, nicht uns.** ChurchApps ist kostenlos; Zapier und Make bieten beide kostenlose Tarife, die einige Rezepte abdecken.
3. **Sie können die Verbindung testen, ohne live zu gehen.** Zapier hat eine Schaltfläche „Schritt testen“, die Beispieldaten aus B1 abruft und Ihnen die Datenstruktur zeigt, bevor Sie das Rezept einschalten.

## Die passende Brücke wählen {#picking-a-bridge}

- **Zapier** ist einsteigerfreundlicher und hat den größeren App-Katalog – verwenden Sie es als Standard, es sei denn, die Kosten sind ein Problem.
- **Make** ist im großen Maßstab günstiger und bietet flexiblere Weiterleitungs- und Filterlogik – verwenden Sie es, wenn ein einzelner Ablauf Verzweigungen, Bedingungen oder viele Schritte hat.
- **Webhooks by Zapier** (für die Anleitung zu Mobile Message verwendet) ist ein allgemeiner Adapter, mit dem ein Zap an jeden HTTP-Endpunkt senden kann, wenn das Ziel keine eigenständige Zapier-App hat.

Wenn Sie etwas suchen, das nicht auf dieser Liste steht, sind die [REST-API](/docs/developer/api) und die [Webhooks](/docs/developer/api/webhooks) von B1 offen – Sie können mit dem [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) in wenigen Stunden eine eigene Brücke bauen.

## Was hier nicht aufgeführt ist (und warum) {#whats-not-here-and-why}

Mehrere bekannte Werkzeuge für die Gemeindetechnik – Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe – haben heute keine veröffentlichte Zapier-App und kein Make-Modul. Sie haben zwar eigene APIs, doch die Anbindung an B1 ist eine Aufgabe für eigenen Code und kein Rezept. Deshalb passen sie nicht in diese Liste. Wenn ein Anbieter eine Zapier-App oder ein Make-Modul hinzufügt, ergänzen wir die Anleitung.

Außerdem haben wir bewusst Werkzeuge ausgelassen, die speziell für Planning Center Services gedacht sind (Musik, Präsentation), konkurrierende ChMS-Produkte, Migrationsberater und Werkzeuge, die nur PCO-spezifische Daten bereinigen – keines davon hat einen sinnvollen Verbindungsweg zu B1.

## Siehe auch {#see-also}

- [Zapier (Überblick)](../zapier.md) – die B1-Seite jedes Zapier-Rezepts ist identisch; diese Seite behandelt sie einmal
- [Make (Überblick)](../make.md) – dasselbe für Make-Szenarien
- [Slack & Discord](../slack-discord.md) – Chat-Benachrichtigungen ohne jede Brücke
- [Google Tabellen](../google-sheets.md) – Exporte bei Bedarf
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks) – der Ereigniskatalog, auf den sich jedes Rezept stützt
