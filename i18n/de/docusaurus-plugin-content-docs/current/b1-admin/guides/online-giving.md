---
title: "Anleitung: Online-Spenden einrichten"
---

# Online-Spenden einrichten

<div class="article-intro">

Erfahren Sie alles, was Sie brauchen, um Online-Spenden in Ihrer Gemeinde zu akzeptieren -- von der Erstellung von Spendenfonds über die Verbindung von Stripe für die Zahlungsabwicklung bis zum Teilen der Spendenseite mit Ihrer Gemeinde. Am Ende können Mitglieder online über Ihre Website und mobile App spenden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Admin-Zugang -- siehe [Rollen & Berechtigungen](../people/roles-permissions.md)
- Ein Stripe-Konto (kostenlos erstellen unter [stripe.com](https://stripe.com), falls nötig)

</div>

## Schritt 1: Spendenfonds erstellen

Fonds sind die Kategorien, an die Spender geben können. Sie benötigen mindestens einen Fonds, bevor Sie Spenden akzeptieren können.

Folgen Sie der Anleitung [Fonds](../donations/funds.md), um Ihre Spendenkategorien einzurichten:

1. Erstellen Sie Ihre gängigsten Fonds (z. B. „Allgemeiner Fonds", „Baufonds", „Missionen")
2. Markieren Sie steuerlich absetzbare Fonds entsprechend -- dies beeinflusst die Jahresend-Spendenbescheinigungen

:::tip
Sie können jederzeit weitere Fonds hinzufügen. Beginnen Sie mit Ihren häufigsten Spendenkategorien.
:::

## Schritt 2: Stripe verbinden

Stripe wickelt die gesamte Zahlungsabwicklung ab. Sie verbinden Ihr Stripe-Konto mit B1 Admin, damit Spenden auf Ihr Bankkonto fließen.

Folgen Sie der Anleitung [Online-Spenden einrichten](../donations/online-giving-setup.md), um Stripe zu verbinden:

1. Melden Sie sich in Ihrem Stripe-Dashboard an und rufen Sie Ihren Publishable Key und Secret Key ab
2. Geben Sie in B1 Admin unter Einstellungen beide Schlüssel ein

:::warning
Stripe zeigt Ihren Secret Key nur einmal an. Kopieren und speichern Sie ihn, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen generieren.
:::

## Schritt 3: Eine Spendenseite zu Ihrer Website hinzufügen

Machen Sie das Spenden zugänglich, indem Sie eine Spendenseite auf Ihrer B1-Website hinzufügen.

Folgen Sie den Anleitungen [Online-Spenden einrichten](../donations/online-giving-setup.md) und [Seiten verwalten](../website/managing-pages.md), um:

1. Einen „Spenden"-Tab zu Ihrer B1.church-Website hinzuzufügen
2. Ihre Spenden-URL lautet: `https://ihresubdomain.b1.church/donate`
3. Mitglieder können spenden, ohne sich anzumelden (öffentliche Seite) oder sich für gespeicherte Zahlungsmethoden und Spendenhistorie anmelden

## Schritt 4: Eine Testspende machen

Bevor Sie es Ihrer Gemeinde ankündigen, überprüfen Sie, ob alles funktioniert.

1. Tätigen Sie eine kleine Testspende, um den gesamten Ablauf zu überprüfen
2. Prüfen Sie, ob die Spende in B1 Admin unter Spenden erscheint

:::tip
Verwenden Sie zuerst den Stripe-Testmodus, wenn Sie ohne echte Abbuchungen testen möchten, und wechseln Sie dann in den Live-Modus, bevor Sie es Ihrer Gemeinde ankündigen.
:::

## Schritt 5: Der Gemeinde mitteilen

Verbreiten Sie die Nachricht, damit Mitglieder wissen, dass sie online spenden können.

1. Teilen Sie die Spenden-URL über Ihre Website, E-Mail-Newsletter, Gemeindebriefe und soziale Medien
2. Mitglieder können auch über die [B1 Mobile-App](../../b1-mobile/giving/) spenden -- die Spendenfunktion ist integriert

:::info
Mitglieder, die sich anmelden, können Zahlungsmethoden speichern, wiederkehrende Spenden einrichten und ihre Spendenhistorie einsehen. Anonymes Spenden funktioniert auch -- keine Anmeldung erforderlich.
:::

## Schritt 6: Laufende Verwaltung

Halten Sie Ihre Spendenaufzeichnungen aktuell und erstellen Sie Berichte im Laufe des Jahres.

1. [Importieren Sie regelmäßig Stripe-Transaktionen](../donations/stripe-import.md) (wöchentlich oder monatlich), um Ihre Aufzeichnungen aktuell zu halten
2. [Sehen Sie Spendenberichte ein](../donations/donation-reports.md), um Spendentrends und Gesamtsummen nach Fonds zu verfolgen
3. [Erstellen Sie Jahresend-Spendenbescheinigungen](../donations/giving-statements.md) für die Steuerunterlagen Ihrer Spender

:::tip
Führen Sie Stripe-Importe mindestens monatlich durch, damit Ihre Aufzeichnungen aktuell bleiben. Siehe die [Anleitung für Jahresendberichte](./year-end-reports.md) für den vollständigen Jahresendprozess.
:::

## Fertig!

Ihre Gemeinde akzeptiert jetzt Online-Spenden. Mitglieder können über Ihre Website, die B1 Mobile-App oder jedes Gerät mit einem Webbrowser spenden. Alle Spenden werden automatisch in B1 Admin erfasst.

## Verwandte Artikel

- [Fonds](../donations/funds.md) — Spendenkategorien erstellen und verwalten
- [Stapel](../donations/batches.md) — Spenden in Gruppen organisieren
- [Spenden erfassen](../donations/recording-donations.md) — Bar- und Scheckspenden manuell eingeben
- [Stripe-Import](../donations/stripe-import.md) — Online-Transaktionen in B1 Admin übernehmen
- [Spendenberichte](../donations/donation-reports.md) — Spendentrends und Gesamtsummen einsehen
- [Spendenbescheinigungen](../donations/giving-statements.md) — Jahresend-Steuerbescheinigungen erstellen
- [Spenden tätigen (Web)](../../b1-church/giving/making-donations.md) — Die Spendenerfahrung für Mitglieder
- [Spenden tätigen (Mobil)](../../b1-mobile/giving/making-donations.md) — Spenden über die mobile App
