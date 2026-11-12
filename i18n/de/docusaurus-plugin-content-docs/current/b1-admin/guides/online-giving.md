---
title: "Anleitung: Online-Spenden einrichten"
description: "Richten Sie in B1 Admin Online-Spenden ein: Spendenfonds anlegen, Stripe verbinden und eine Spendenseite zu Ihrer B1.church-Website für Mitglieder hinzufügen."
---

# Online-Spenden einrichten

<div class="article-intro">

Diese Anleitung führt Sie durch alles, was nötig ist, um in Ihrer Kirche Online-Spenden anzunehmen – vom Anlegen der Spendenfonds über die Verbindung mit Stripe für die Zahlungsabwicklung bis zur Weitergabe der Gebeseite an Ihre Gemeinde. Am Ende können Mitglieder über Ihre Website und Ihre mobile App online geben.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1-Admin-Konto mit Administratorzugriff – siehe [Rollen & Berechtigungen](../people/roles-permissions.md)
- Ein Stripe-Konto (falls nötig kostenlos unter [stripe.com](https://stripe.com) anlegen)

</div>

## Schritt 1: Spendenfonds anlegen {#step-1-create-donation-funds}

Fonds sind die Kategorien, für die Spendende geben können. Sie benötigen mindestens einen Fonds, bevor Sie Spenden annehmen können.

Folgen Sie der Anleitung [Fonds](../donations/funds.md), um Ihre Gebekategorien einzurichten:

1. Wählen Sie im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Spenden > Fonds** und klicken Sie auf **Fonds hinzufügen**
2. Legen Sie Ihre gebräuchlichsten Fonds an (z. B. „Allgemeiner Fonds“, „Baufonds“, „Mission“)
3. Aktivieren Sie **Steuerlich absetzbar** bei Fonds, deren Gaben in die Jahresbescheinigungen gehören, und lassen Sie **Für Spendende sichtbar** bei Fonds aktiviert, die Spendende online auswählen können sollen

:::tip
Sie können jederzeit weitere Fonds hinzufügen. Beginnen Sie mit Ihren gebräuchlichsten Gebekategorien.
:::

## Schritt 2: Stripe verbinden {#step-2-connect-stripe}

Stripe übernimmt die gesamte Zahlungsabwicklung. Sie verbinden Ihr Stripe-Konto mit B1 Admin, damit die Spenden auf Ihr Bankkonto fließen.

Folgen Sie der Anleitung [Einrichtung der Online-Spenden](../donations/online-giving-setup.md), um Stripe zu verbinden:

1. Melden Sie sich in Ihrem Stripe-Dashboard an und gehen Sie zu **Entwickler > API-Schlüssel**, um Ihren Veröffentlichbaren Schlüssel und Geheimen Schlüssel zu finden
2. Gehen Sie in B1 Admin zu **Einstellungen**, klicken Sie im Bereich **Spenden** auf **Bearbeiten** und setzen Sie den **Anbieter** auf **Stripe**
3. Fügen Sie den Veröffentlichbaren Schlüssel in **Öffentlicher Schlüssel** und den Geheimen Schlüssel in **Geheimer Schlüssel** ein, prüfen Sie die **Währung** und klicken Sie auf **Speichern**

B1 unterstützt außerdem **Kingdom Funding** und **Paystack** (für Kirchen in Afrika) als Zahlungsanbieter – siehe [Einrichtung der Online-Spenden](../donations/online-giving-setup.md).

:::warning
Stripe zeigt Ihren Geheimen Schlüssel nur einmal an. Kopieren und speichern Sie ihn, bevor Sie das Stripe-Dashboard verlassen. Verlieren Sie ihn, müssen Sie einen neuen erzeugen.
:::

## Schritt 3: Eine Spendenseite zu Ihrer Website hinzufügen {#step-3-add-a-giving-page-to-your-website}

Machen Sie das Geben zugänglich, indem Sie Ihrer B1-Website eine Spendenseite hinzufügen.

Folgen Sie den Anleitungen [Einrichtung der Online-Spenden](../donations/online-giving-setup.md) und [Seiten verwalten](../website/managing-pages.md), um:

1. einen Reiter **Spende** zu Ihrer B1.church-Seite hinzuzufügen (oder ein Element **Spende** zu einer Seite im Website-Baukasten)
2. Ihre Gebe-URL lautet: `https://yoursubdomain.b1.church/donate`
3. Mitglieder können ohne Anmeldung geben (öffentliche Seite) oder sich anmelden, um gespeicherte Zahlungsmethoden und ihren Spendenverlauf zu nutzen
4. Spendende direkt zu einem einzelnen Fonds zu führen: Klicken Sie unter **Spenden > Fonds** bei diesem Fonds auf **Gebe-Link**, um einen Link (oder einen QR-Code zum Herunterladen) mit vorbelegtem Fonds und Betrag zu kopieren

## Schritt 4: Eine Testspende machen {#step-4-make-a-test-donation}

Prüfen Sie vor der Ankündigung an Ihre Gemeinde, dass alles funktioniert.

1. Machen Sie eine kleine Testspende, um zu prüfen, dass der Ablauf von Anfang bis Ende funktioniert
2. Prüfen Sie, ob die Spende in B1 Admin unter **Spenden > Stapel** erscheint

:::tip
Um ohne echte Belastungen zu prüfen, können Sie zuerst die Testschlüssel von Stripe speichern und sie vor der Ankündigung an Ihre Gemeinde unter **Einstellungen > Spenden** durch Ihre Live-Schlüssel ersetzen.
:::

## Schritt 5: Ihre Gemeinde informieren {#step-5-announce-to-your-congregation}

Machen Sie bekannt, dass Mitglieder jetzt online geben können.

1. Teilen Sie die Gebe-URL über Ihre Website, E-Mail-Newsletter, Gemeindebriefe und die sozialen Medien
2. Mitglieder können auch über die [B1-App](../../b1-church/giving/index.md) geben – die Spendenfunktion ist eingebaut

:::info
Angemeldete Mitglieder können Zahlungsmethoden speichern, wiederkehrende Spenden einrichten und ihren Spendenverlauf ansehen. Anonyme Spenden sind ebenfalls möglich – ohne Anmeldung.
:::

## Schritt 6: Laufende Verwaltung {#step-6-ongoing-management}

Halten Sie Ihre Spendenunterlagen aktuell und erstellen Sie das ganze Jahr über Berichte.

1. Online-Gaben werden automatisch erfasst. Nutzen Sie den [Stripe-Import](../donations/stripe-import.md), um Stripe-Transaktionen zu finden, die nicht synchronisiert wurden – klicken Sie auf **Vorschau**, um zu sehen, was fehlt, und dann auf **Fehlende importieren**
2. [Spendenberichte ansehen](../donations/donation-reports.md) unter **Spenden > Übersicht**, um Gebetrends und Summen nach Fonds zu verfolgen
3. Prüfen Sie **Spenden > Fehlgeschlagene Gaben** auf wiederkehrende Gaben, deren Karte abgelehnt wurde, und klicken Sie auf **Erneut versuchen**, sobald die spendende Person ihre Zahlungsmethode aktualisiert hat
4. [Jahresspendenbescheinigungen erstellen](../donations/giving-statements.md) für die Steuerunterlagen Ihrer Spendenden

:::tip
Führen Sie vor dem Abschluss jedes Monats eine Vorschau des Stripe-Imports aus, damit Ihre Unterlagen mit Stripe übereinstimmen. Den vollständigen Jahresabschluss finden Sie in der [Anleitung zu den Jahresberichten](./year-end-reports.md).
:::

## Fertig! {#youre-done}

Ihre Kirche nimmt jetzt Online-Spenden an. Mitglieder können über Ihre Website, die B1-App oder jedes Gerät mit Webbrowser geben. Alle Spenden werden automatisch in B1 Admin erfasst.

## Verwandte Artikel {#related-articles}

- [Fonds](../donations/funds.md) – Gebekategorien anlegen und verwalten
- [Stapel](../donations/batches.md) – Spenden in Gruppen organisieren
- [Spenden erfassen](../donations/recording-donations.md) – Bargeld- und Scheckspenden manuell eingeben
- [Stripe-Import](../donations/stripe-import.md) – Online-Transaktionen in B1 Admin übernehmen
- [Spendenberichte](../donations/donation-reports.md) – Gebetrends und Summen ansehen
- [Spendenbescheinigungen](../donations/giving-statements.md) – Jahressteuerbescheinigungen erstellen
- [Spenden geben](../../b1-church/giving/making-donations.md) – das Spenden aus Sicht der Mitglieder auf B1.church und in der B1-App
