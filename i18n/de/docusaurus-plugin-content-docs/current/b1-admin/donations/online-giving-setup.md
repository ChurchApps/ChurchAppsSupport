---
title: "Online-Spendenverwaltung einrichten"
---

# Online-Spendenverwaltung einrichten

<div class="article-intro">

B1 Admin integriert sich mit **Stripe**, **PayPal** und **Kingdom Funding**, damit Ihre Mitglieder online über Ihre B1.church-Website spenden können. Nach der Konfiguration werden Online-Spenden automatisch in Ihren Spendenunterlagen zusammen mit manuell eingegebenen Gaben angezeigt und alles bleibt in einem System.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spender ihre Gaben bestimmen können
- Erstellen Sie ein Stripe-Konto auf [stripe.com](https://stripe.com) und aktivieren Sie es (schalten Sie es aus dem Testmodus)
- Halten Sie Ihre B1 Admin-Anmeldedaten bereit

</div>

## Stripe einrichten

1. Erstellen Sie ein Konto auf [stripe.com](https://stripe.com), falls Sie noch keines haben. Achten Sie darauf, Ihr Konto zu **aktivieren** und es aus dem Testmodus zu schalten.
2. Gehen Sie in Stripe zu **Developers > API Keys**.
3. Kopieren Sie Ihren **Publishable Key**.
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Klicken Sie auf **Church** in der oberen Navigation und dann auf **Edit Church Settings**.
6. Klicken Sie auf das Bearbeiten-Symbol neben **Church Settings**.
7. Scrollen Sie nach unten zum Bereich **Giving**.
8. Stellen Sie den **Provider** auf **Stripe**.
9. Fügen Sie Ihren Publishable Key in das Feld **Public Key** ein.
10. Gehen Sie zurück zu Stripe und zeigen Sie Ihren **Secret Key** an (Sie können diesen nur einmal einsehen, speichern Sie also eine Sicherung).
11. Fügen Sie den Secret Key in das Feld **Secret Key** ein und klicken Sie auf **Save**.

:::warning
Ihr Stripe Secret Key wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel generieren.
:::

## Wählen Sie Ihre Währung

Nach Auswahl von Stripe als Anbieter erscheint ein Dropdown-Menü **Currency** neben Ihren API-Schlüsseln. Wählen Sie die Währung, die der Abwicklungswährung Ihres Stripe-Kontos entspricht, damit Spenden korrekt berechnet werden.

Unterstützte Währungen sind USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN und BRL. Sie können Ihre Standardwährung des Kontos in Ihrem [Stripe-Dashboard](https://dashboard.stripe.com/settings/currencies) überprüfen oder ändern.

:::info
Die Währung, die Sie hier auswählen, wird für Einmalspenden, wiederkehrende Abonnements, Gebührenberechnungen und Spendenberichte verwendet. Wenn Sie die Währung später wechseln, verwenden nur neue Spenden und Abonnements die neue Währung – bestehende wiederkehrende Gaben werden weiterhin in der Währung verwendet, in der sie erstellt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto für die gewählte Währung konfiguriert ist. Wenn Ihr Stripe-Konto die ausgewählte Währung nicht unterstützt, schlagen Spenden beim Checkout fehl.
:::

## Fügen Sie eine Spendenleiste zu Ihrer B1.church-Website hinzu

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das **Settings**-Symbol.
3. Klicken Sie auf **Add Tab**.
4. Wählen Sie **Donation** als Typ.
5. Geben Sie einen Namen für die Registerkarte ein (z. B. „Give") und klicken Sie auf **Save**.
6. Ändern Sie optional das Symbol der Registerkarte – geben Sie „Giv" in die Symbolsuche ein, um ein spendenbezoges Symbol zu finden.

Ihre Spendenleiste ist jetzt live. Mitglieder können sie unter yoursubdomain.b1.church/donate besuchen.

## Teilen Sie Ihren Spendenlink

Um Ihre Spendenverbindung zu finden, gehen Sie zu **B1 Admin** und klicken Sie auf das **Settings**-Symbol, um Ihre Subdomain anzuzeigen. Ihr Spendenlink folgt diesem Format:

https://yoursubdomain.b1.church/donate

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder in Ihrem Gemeindebrief, damit Mitglieder wissen, wo sie online spenden können.

## Spendenmitteilungen

Stripe sendet jedes Mal eine E-Mail-Benachrichtigung, wenn eine Spende eingegangen ist. Um die E-Mail-Adresse der Benachrichtigung zu ändern, gehen Sie zum Stripe-Dashboard, klicken Sie auf Ihr Profil oben rechts, wählen Sie **Profile** und aktualisieren Sie Ihre E-Mail-Adresse.

## Bearbeitungsgebühren-Optionen

Sie können Ihre Spendenleiste so konfigurieren, dass Spender optional die Bearbeitungsgebühren übernehmen, damit Ihre Gemeinde den vollständigen Spendenbetrag erhält. Diese Einstellung wird in Ihren Kircheneinstellungen in B1 Admin verwaltet.

:::tip
Nach der Einrichtung sollten Sie eine kleine Testspende tätigen, um sicherzustellen, dass alles funktioniert, bevor Sie Online-Spenden Ihrer Gemeinde ankündigen.
:::

## Kingdom Funding einrichten

Kingdom Funding ist ein christlicher Zahlungsdienstleister, der Kredit-/Debitkarten und ACH-Banküberweisungen unterstützt. Wenn Ihre Gemeinde sich bei Kingdom Funding angemeldet hat, können Sie es als Ihr Spenden-Gateway verbinden.

:::info
Die Kingdom Funding-Integration befindet sich derzeit in der Betaphase. Wenden Sie sich an Ihren B1-Kontovertreter, um sie für Ihre Gemeinde zu aktivieren.
:::

1. Melden Sie sich bei [kingdomfunding.org](https://kingdomfunding.org) an oder erstellen Sie ein Konto.
2. Erhalten Sie Ihren **Security Key** (öffentlich) und **Private Key** vom Kingdom Funding-Händlerportal.
3. Gehen Sie in B1 Admin zu **Settings** und öffnen Sie **Church Settings**.
4. Stellen Sie im Bereich **Giving** den **Provider** auf **Kingdom Funding**.
5. Fügen Sie Ihren Security Key in das Feld **Security Key** und Ihren Private Key in das Feld **Private Key** ein.
6. Stellen Sie den **Webhook Key** ein, den Sie von Kingdom Funding erhalten haben, und kopieren Sie die angezeigte Webhook-URL in Ihre Kingdom Funding-Händlereinstellungen, damit Kingdom Funding B1 über abgeschlossene Transaktionen benachrichtigen kann.
7. Speichern Sie.

Sobald verbunden, sehen die Mitglieder auf der Spendenleiste einen Karten-/Bankschalter und können per Kreditkarte oder ACH-Überweisung spenden.

## Nächste Schritte

- Verwenden Sie [Stripe Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu importieren, wenn diese nicht automatisch synchronisiert werden
- Überprüfen Sie Ihre [Spendenberichte](donation-reports.md), um zu überprüfen, dass Online-Spenden korrekt angezeigt werden
- Generieren Sie [Spendenquittungen](giving-statements.md), die sowohl Online- als auch Offline-Spenden enthalten
