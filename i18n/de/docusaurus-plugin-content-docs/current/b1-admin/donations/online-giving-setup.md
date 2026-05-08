---
title: "Online-Gaben-Einrichtung"
---

# Online-Gaben-Einrichtung

<div class="article-intro">

B1 Admin ist mit **Stripe** und **PayPal** integriert, damit Ihre Gemeindeglieder online über Ihre B1.church-Website spenden können. Nach der Einrichtung erscheinen Online-Spenden automatisch in Ihren Spendendatensätzen neben manuell eingegebenen Gaben und halten alles in einem System zusammen.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spender ihre Gaben bestimmen können
- Erstellen Sie ein Stripe-Konto unter [stripe.com](https://stripe.com) und aktivieren Sie es (nehmen Sie es aus dem Testmodus)
- Halten Sie Ihre B1 Admin-Anmeldedaten bereit

</div>

## Stripe einrichten

1. Erstellen Sie ein Konto unter [stripe.com](https://stripe.com), falls Sie noch kein Konto haben. Vergewissern Sie sich, dass Sie **Ihr Konto aktivieren** und es aus dem Testmodus nehmen.
2. Gehen Sie in Stripe zu **Developers > API Keys**.
3. Kopieren Sie Ihren **Publishable Key**.
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Klicken Sie auf **Church** in der oberen Navigation und dann auf **Edit Church Settings**.
6. Klicken Sie auf das Bearbeitungssymbol neben **Church Settings**.
7. Scrollen Sie hinunter zum Abschnitt **Giving**.
8. Setzen Sie den **Provider** auf **Stripe**.
9. Fügen Sie Ihren Publishable Key in das Feld **Public Key** ein.
10. Gehen Sie zurück zu Stripe und zeigen Sie Ihren **Secret Key** an (Sie können diesen nur einmal anzeigen, speichern Sie also eine Sicherung).
11. Fügen Sie den Secret Key in das Feld **Secret Key** ein und klicken Sie auf **Save**.

:::warning
Ihr Stripe Secret Key wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel generieren.
:::

## Wählen Sie Ihre Währung

Nachdem Sie Stripe als Anbieter ausgewählt haben, erscheint ein **Currency**-Dropdown neben Ihren API-Schlüsseln. Wählen Sie die Währung, die der Abrechnungswährung Ihres Stripe-Kontos entspricht, damit Spenden korrekt berechnet werden.

Unterstützte Währungen sind USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN und BRL. Sie können die Standardwährung Ihres Kontos in Ihrem [Stripe-Dashboard](https://dashboard.stripe.com/settings/currencies) bestätigen oder ändern.

:::info
Die Währung, die Sie hier auswählen, wird für einmalige Spenden, wiederkehrende Abonnements, Gebührenberechnungen und Spendenaberichte verwendet. Wenn Sie die Währung später wechseln, verwenden nur neue Spenden und Abonnements die neue Währung – bestehende wiederkehrende Gaben bleiben in der Währung, in der sie erstellt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto so konfiguriert ist, dass es die von Ihnen gewählte Währung akzeptiert. Wenn Ihr Stripe-Konto die ausgewählte Währung nicht unterstützt, schlagen Spenden beim Checkout fehl.
:::

## Hinzufügen einer Spendenseite zu Ihrer B1.church-Website

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das Symbol **Settings**.
3. Klicken Sie auf **Add Tab**.
4. Wählen Sie **Donation** als Typ.
5. Geben Sie einen Namen für den Tab ein (z. B. „Give") und klicken Sie auf **Save**.
6. Ändern Sie optional das Tab-Symbol – geben Sie „Giv" in die Symbolsuche ein, um ein spendenbezogenes Symbol zu finden.

Ihre Spendenseite ist jetzt live. Gemeindeglieder können sie unter `yoursubdomain.b1.church/donate` besuchen.

## Freigeben Ihres Gaben-Links

Um Ihre Gaben-URL zu finden, gehen Sie zu **B1 Admin** und klicken Sie auf das Symbol **Settings**, um Ihre Subdomain anzusehen. Ihr Spenden-Link folgt diesem Format:

`https://yoursubdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder in Ihrem Informationsblatt, damit Gemeindeglieder wissen, wo sie online spenden können.

## Spendenmitteilungen

Stripe sendet jedes Mal, wenn eine Spende empfangen wird, eine E-Mail-Benachrichtigung. Um die Benachrichtigungs-E-Mail-Adresse zu ändern, gehen Sie zum Stripe-Dashboard, klicken Sie auf Ihr Profil in der oberen rechten Ecke, wählen Sie **Profile** und aktualisieren Sie Ihre E-Mail-Adresse.

## Bearbeitungsgebührenoptionen

Sie können Ihre Spendenseite so konfigurieren, dass Spender optional Verarbeitungsgebühren decken können, damit Ihre Gemeinde die volle Spendensumme erhält. Diese Einstellung wird in Ihren Kircheneinstellungen innerhalb von B1 Admin verwaltet.

:::tip
Nach der Einrichtung tätigen Sie eine kleine Test-Spende, um zu bestätigen, dass alles funktioniert, bevor Sie Online-Spenden in Ihrer Gemeinde ankündigen.
:::

## Nächste Schritte

- Verwenden Sie [Stripe Import](stripe-import.md), um Online-Transaktionen in B1 Admin einzuziehen, wenn sie nicht automatisch synchronisiert werden
- Überprüfen Sie Ihre [Spendenaberichte](donation-reports.md), um zu überprüfen, dass Online-Spenden korrekt angezeigt werden
- Generieren Sie [Spendenauszüge](giving-statements.md), die sowohl Online- als auch Offline-Spenden enthalten
