---
title: "Online-Spenden einrichten"
---

# Online-Spenden einrichten

<div class="article-intro">

B1 Admin integriert sich mit **Stripe** und **PayPal**, damit Ihre Mitglieder online über Ihre B1.church-Website spenden können. Nach der Konfiguration erscheinen Online-Spenden automatisch in Ihren Spendenaufzeichnungen neben manuell eingegebenen Gaben, sodass alles in einem System bleibt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spender ihre Gaben zuweisen können
- Erstellen Sie ein Stripe-Konto unter [stripe.com](https://stripe.com) und aktivieren Sie es (nehmen Sie es aus dem Testmodus)
- Halten Sie Ihre B1 Admin-Zugangsdaten bereit

</div>

## Stripe einrichten

1. Erstellen Sie ein Konto bei [stripe.com](https://stripe.com), falls Sie noch keines haben. Stellen Sie sicher, dass Sie **Ihr Konto aktivieren** und aus dem Testmodus nehmen.
2. Gehen Sie in Stripe zu **Developers > API Keys**.
3. Kopieren Sie Ihren **Publishable Key**.
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Klicken Sie in der oberen Navigation auf **Gemeinde** und dann auf **Gemeindeeinstellungen bearbeiten**.
6. Klicken Sie auf das Bearbeitungssymbol neben **Gemeindeeinstellungen**.
7. Scrollen Sie zum Abschnitt **Spenden**.
8. Setzen Sie den **Anbieter** auf **Stripe**.
9. Fügen Sie Ihren Publishable Key in das Feld **Public Key** ein.
10. Gehen Sie zurück zu Stripe und lassen Sie sich Ihren **Secret Key** anzeigen (Sie können ihn nur einmal sehen, also speichern Sie eine Sicherungskopie).
11. Fügen Sie den Secret Key in das Feld **Secret Key** ein und klicken Sie auf **Speichern**.

:::warning
Ihr Stripe Secret Key wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel generieren.
:::

## Eine Spendenseite zu Ihrer B1.church-Website hinzufügen

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das **Einstellungen**-Symbol.
3. Klicken Sie auf **Tab hinzufügen**.
4. Wählen Sie **Donation** als Typ.
5. Geben Sie einen Namen für den Tab ein (z. B. „Spenden") und klicken Sie auf **Speichern**.
6. Optional können Sie das Tab-Symbol ändern -- geben Sie „Giv" in die Symbolsuche ein, um ein spendenrelevantes Symbol zu finden.

Ihre Spendenseite ist jetzt live. Mitglieder können sie unter `ihrsubdomain.b1.church/donate` besuchen.

## Ihren Spendenlink teilen

Um Ihre Spenden-URL zu finden, gehen Sie zu **B1 Admin** und klicken Sie auf das **Einstellungen**-Symbol, um Ihre Subdomain zu sehen. Ihr Spendenlink folgt dem Format:

`https://ihrsubdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder in Ihrem Gemeindebrief, damit Mitglieder wissen, wo sie online spenden können.

## Spendenbenachrichtigungen

Stripe sendet bei jeder eingegangenen Spende eine E-Mail-Benachrichtigung. Um die Benachrichtigungs-E-Mail-Adresse zu ändern, gehen Sie zum Stripe-Dashboard, klicken Sie oben rechts auf Ihr Profil, wählen Sie **Profil** und aktualisieren Sie Ihre E-Mail-Adresse.

## Optionen für Bearbeitungsgebühren

Sie können Ihre Spendenseite so konfigurieren, dass Spender optional die Bearbeitungsgebühren übernehmen können, damit Ihre Gemeinde den vollen Spendenbetrag erhält. Diese Einstellung wird in Ihren Gemeindeeinstellungen innerhalb von B1 Admin verwaltet.

:::tip
Tätigen Sie nach der Einrichtung eine kleine Testspende, um zu bestätigen, dass alles funktioniert, bevor Sie Online-Spenden Ihrer Gemeinde ankündigen.
:::

## Nächste Schritte

- Verwenden Sie den [Stripe-Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu übernehmen, falls sie nicht automatisch synchronisiert werden
- Überprüfen Sie Ihre [Spendenberichte](donation-reports.md), um sicherzustellen, dass Online-Spenden korrekt angezeigt werden
- Erstellen Sie [Spendenbescheinigungen](giving-statements.md), die sowohl Online- als auch Offline-Spenden enthalten
