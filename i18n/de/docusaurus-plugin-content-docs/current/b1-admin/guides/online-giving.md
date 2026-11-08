---
title: "Anleitung: Online-Spenden einrichten"
description: "Richten Sie Online-Spenden in B1 Admin ein, indem Sie Spendenfonds anlegen, Stripe verbinden und Ihrer B1.church-Website eine Seite „Spenden“ für Mitglieder hinzufügen."
---

# Online-Spenden einrichten

<div class="article-intro">

Hier erfahren Sie, was Sie benötigen, um in Ihrer Gemeinde Online-Spenden anzunehmen: vom Anlegen der Spendenfonds über die Verbindung mit Stripe für die Zahlungsabwicklung bis zur Freigabe der Gebotsseite für Ihre Gemeinde. Danach können Mitglieder über Ihre Website und Ihre mobile App online spenden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1-Admin-Konto mit Administratorzugriff. Siehe [Rollen und Berechtigungen](../people/roles-permissions.md)
- Ein Stripe-Konto (bei Bedarf kostenlos unter [stripe.com](https://stripe.com) erstellen)

</div>

## Schritt 1: Spendenfonds anlegen

Fonds sind die Kategorien, für die Spender geben können. Sie benötigen mindestens einen Fonds, bevor Sie Spenden annehmen können.

Folgen Sie der Anleitung [Fonds](../donations/funds.md), um Ihre Spendenkategorien einzurichten:

1. Legen Sie Ihre häufigsten Fonds an (z. B. „Allgemeiner Fonds“, „Gebäudefonds“, „Mission“)
2. Markieren Sie steuerlich absetzbare Fonds entsprechend. Dies wirkt sich auf die Zuwendungsbescheinigungen zum Jahresende aus

:::tip
Sie können jederzeit weitere Fonds hinzufügen. Beginnen Sie mit Ihren häufigsten Spendenkategorien.
:::

## Schritt 2: Stripe verbinden

Stripe übernimmt die gesamte Zahlungsabwicklung. Sie verbinden Ihr Stripe-Konto mit B1 Admin, damit Spenden auf Ihr Bankkonto überwiesen werden.

Folgen Sie der Anleitung [Online-Spenden einrichten](../donations/online-giving-setup.md), um Stripe zu verbinden:

1. Melden Sie sich im Stripe-Dashboard an und rufen Sie Ihren Publishable Key und Ihren Secret Key ab
2. Öffnen Sie in B1 Admin die Einstellungen und geben Sie beide Schlüssel ein

:::warning
Stripe zeigt Ihren Secret Key nur einmal an. Kopieren Sie ihn und speichern Sie ihn, bevor Sie das Stripe-Dashboard verlassen. Falls Sie ihn verlieren, müssen Sie einen neuen erzeugen.
:::

## Schritt 3: Eine Spendenseite auf Ihrer Website hinzufügen

Machen Sie das Spenden einfach zugänglich, indem Sie Ihrer B1-Website eine Spendenseite hinzufügen.

Folgen Sie den Anleitungen [Online-Spenden einrichten](../donations/online-giving-setup.md) und [Seiten verwalten](../website/managing-pages.md), um:

1. einen Reiter „Spenden“ zu Ihrer B1.church-Website hinzuzufügen
2. Ihre Spenden-URL lautet dann: `https://yoursubdomain.b1.church/donate`
3. Mitglieder können ohne Anmeldung spenden (öffentliche Seite) oder sich anmelden, um gespeicherte Zahlungsmethoden und ihren Spendenverlauf zu nutzen

## Schritt 4: Eine Testspende durchführen

Überprüfen Sie, ob alles funktioniert, bevor Sie Ihre Gemeinde informieren.

1. Führen Sie eine kleine Testspende durch, um den gesamten Ablauf zu prüfen
2. Prüfen Sie, ob die Spende in B1 Admin unter „Spenden“ erscheint

:::tip
Wenn Sie ohne echte Abbuchungen testen möchten, nutzen Sie zuerst den Testmodus von Stripe. Schalten Sie anschließend in den Live-Modus um, bevor Sie Ihre Gemeinde informieren.
:::

## Schritt 5: Ihre Gemeinde informieren

Machen Sie bekannt, dass Mitglieder jetzt online spenden können.

1. Teilen Sie die Spenden-URL über Ihre Website, E-Mail-Newsletter, Gemeindebriefe und soziale Medien
2. Mitglieder können auch über die [B1 App](../../b1-church/giving/index.md) spenden. Die Spendenfunktion ist bereits integriert

:::info
Angemeldete Mitglieder können Zahlungsmethoden speichern, wiederkehrende Spenden einrichten und ihren Spendenverlauf einsehen. Anonymes Spenden ist ebenfalls möglich, ohne Anmeldung.
:::

## Schritt 6: Laufende Verwaltung

Halten Sie Ihre Spendenunterlagen aktuell und erstellen Sie das ganze Jahr über Berichte.

1. [Stripe-Transaktionen importieren](../donations/stripe-import.md) regelmäßig (wöchentlich oder monatlich), damit Ihre Unterlagen aktuell bleiben
2. [Spendenberichte aufrufen](../donations/donation-reports.md), um Spendentrends sowie Summen nach Fonds zu verfolgen
3. [Zuwendungsbescheinigungen zum Jahresende erstellen](../donations/giving-statements.md) für die steuerlichen Unterlagen Ihrer Spender

:::tip
Führen Sie Stripe-Importe mindestens monatlich durch, damit Ihre Unterlagen aktuell bleiben. Den vollständigen Jahresabschlussprozess finden Sie im [Leitfaden für Jahresberichte](./year-end-reports.md).
:::

## Geschafft!

Ihre Gemeinde nimmt jetzt Online-Spenden an. Mitglieder können über Ihre Website, die B1 App oder jedes Gerät mit Webbrowser spenden. Alle Spenden werden automatisch in B1 Admin erfasst.

## Verwandte Artikel

- [Fonds](../donations/funds.md): Spendenkategorien anlegen und verwalten
- [Chargen](../donations/batches.md): Spenden in Gruppen organisieren
- [Spenden erfassen](../donations/recording-donations.md): Bar- und Scheckspenden manuell eintragen
- [Stripe-Import](../donations/stripe-import.md): Online-Transaktionen in B1 Admin übernehmen
- [Spendenberichte](../donations/donation-reports.md): Spendentrends und Summen einsehen
- [Zuwendungsbescheinigungen](../donations/giving-statements.md): Steuerliche Bescheinigungen zum Jahresende erstellen
- [Online spenden](../../b1-church/giving/making-donations.md): Das Spendenerlebnis für Mitglieder auf B1.church und in der B1 App
