---
title: "Verbundene Services"
---

# Verbundene Services

<div class="article-intro">

Der schnellste Weg, um B1 mit einem anderen Church-Tech-Tool zu verbinden, ist normalerweise ein Zapier- oder Make-Rezept – Sie benötigen keine neue B1-Infrastruktur, und der Drittanbieter hosten den Workflow. Diese Seite ist eine kuratierte Liste von Services, die wir bestätigt haben, dass sie heute verkabelt sind, mit einer kurzen, Copy-Paste-Setup-Anleitung für jeden.

</div>

## Auf einen Blick

| Service | Kategorie | Bridge | Was Sie verkabeln können |
|---|---|---|---|
| [Mailchimp](./mailchimp) | E-Mail | Zapier oder Make | Synchronisieren Sie neue B1-Personen / Geber in eine Mailchimp-Zielgruppe |
| [Donorbox](./donorbox) | Spenden | Zapier | Drücken Sie Donorbox-Spenden und Spender zurück in B1 |
| [Subsplash](./subsplash) | App / Spenden | Zapier | Ziehen Sie Subsplash-Spenden und Personen in B1 |
| [VOMO](./vomo) | Freiwilligenarbeit | Zapier | Synchronisieren Sie Freiwilligenanmeldungen zwischen B1-Gruppen und VOMO-Projekten |
| [Clearstream](./clearstream) | SMS | Zapier | Triggern Sie eine Clearstream-Text von B1-Ereignissen; aufnehmen von Antworten als B1-Datensätze |
| [Text In Church](./text-in-church) | SMS / Workflows | Zapier | Triggern Sie Text In Church-Workflows von B1; erhalten Sie Connect Card-Daten |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier oder Make | Senden Sie SMS von jedem B1-Ereignis aus |
| [Checkr](./checkr) | Hintergrundüberprüfungen | Make | Starten Sie eine Hintergrundüberprüfung, wenn jemand einem Serving Team beitritt |

## Was alle diese gemeinsam haben

1. **B1-Seite der Verkabelung ist identisch** – erstellen Sie einen API-Schlüssel mit den richtigen Geltungsbereichen in **B1Admin → Einstellungen → Entwickler → API-Schlüssel**, dann entweder lassen Sie die Bridge einen Webhook für den Auslöser registrieren (Zapier / Make tun dies automatisch, benötigt `settings:write`) oder rufen Sie B1s REST-Endpoints von einer nachgelagerten Aktion auf.
2. **Die Bridge fakturiert Sie, nicht uns.** ChurchApps ist kostenlos; Zapier und Make haben beide kostenlose Tiers, die eine Handvoll Rezepte abdecken.
3. **Sie können die Verkabelung testen, ohne live zu gehen.** Beide Bridges haben eine „Test step"-Schaltfläche, die den Auslöser einmal gegen B1 feiert und Ihnen die Datenform zeigt, bevor Sie das Rezept einschalten.

## Wählen Sie eine Bridge

- **Zapier** ist benutzerfreundlicher und hat den größeren App-Katalog – verwenden Sie es standardmäßig, es sei denn, die Kosten sind ein Problem.
- **Make** ist billiger im großen Maßstab und hat flexiblere Routing/Filter-Logik – verwenden Sie es, wenn ein einzelner Workflow Mehrweg-, Bedingungen oder viele Schritte hat.
- **Webhooks by Zapier** (verwendet für die Mobile Message-Dokumentation) ist ein generischer Adapter, der Ihnen erlaubt, von einem Zap zu jedem HTTP-Endpoint zu POSTEN, wenn das Ziel keine Zapier-App der ersten Klasse ist.

Wenn Sie etwas nicht auf dieser Liste möchten, sind B1s [REST API](/docs/developer/api) und [Webhooks](/docs/developer/api/webhooks) offen – Sie können eine einmalige Bridge mit dem [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) in ein paar Stunden bauen.

## Was hier nicht vorhanden ist (und warum)

Mehrere beliebte Church-Tech-Tools – Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe – haben heute keine veröffentlichte Zapier-App oder Make-Modul. Sie haben ihre eigenen APIs, aber die Verkabelung mit B1 ist eine benutzerdefinierte Code-Aufgabe, kein Rezept, also passen sie nicht zu dieser Liste. Wenn ein Anbieter eine Zapier-App oder Make-Modul hinzufügt, fügen wir die Dokumentation hinzu.

Wir haben auch absichtlich Planning Center-Services-spezifische Tools (Musik, Präsentation), konkurrierende ChMS-Produkte, Migrationskonsultanten und Tools übersprungen, die nur PCO-spezifische Daten bereinigen – keine davon haben einen sinnvollen Verkabelungspfad zu B1.

## Siehe auch

- [Zapier (Übersicht)](../zapier) – die B1-Seite jedes Zapier-Rezepts ist identisch; diese Dokumentation deckt sie einmal ab
- [Make (Übersicht)](../make) – dasselbe für Make-Szenarien
- [Slack & Discord](../slack-discord) – Chat-Benachrichtigungen ohne Bridge
- [Google Sheets](../google-sheets) – Abruf-Exporte
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks) – der Ereigniskatalog, auf den sich jedes Rezept stützt
