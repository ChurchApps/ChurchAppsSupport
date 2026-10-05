---
title: "Online-Spendenverwaltung einrichten"
---

# Online-Spendenverwaltung einrichten

<div class="article-intro">

B1 Admin ist mit **Stripe**, **PayPal**, **Kingdom Funding** und **Paystack** (für Kirchen in Afrika) integriert, sodass Ihre Mitglieder online über Ihre B1.church-Website spenden können. Nach der Konfiguration werden Online-Spenden automatisch in Ihren Spendendatensätzen neben manuell erfassten Gaben angezeigt, sodass alles in einem System gespeichert bleibt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spender ihre Gaben designieren können
- Erstellen Sie ein Stripe-Konto auf [stripe.com](https://stripe.com) und aktivieren Sie es (schalten Sie es aus dem Testmodus)
- Halten Sie Ihre B1 Admin-Anmeldedaten bereit

</div>

## Stripe einrichten

1. Erstellen Sie ein Konto auf [stripe.com](https://stripe.com), falls Sie noch keines haben. Stellen Sie sicher, dass Sie **Ihr Konto aktivieren** und es aus dem Testmodus nehmen.
2. Gehen Sie in Stripe zu **Developers > API Keys**.
3. Kopieren Sie Ihren **Publishable Key**.
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Gehen Sie zu **Settings** und öffnen Sie den Bereich **Giving**.
6. Klicken Sie auf das Bearbeitungssymbol im Bereich **Giving**.
7. Setzen Sie den **Provider** auf **Stripe**.
8. Fügen Sie Ihren öffentlichen Schlüssel in das Feld **Public Key** ein.
9. Gehen Sie zurück zu Stripe und zeigen Sie Ihren **Secret Key** an (Sie können ihn nur einmal ansehen, daher speichern Sie eine Sicherung).
10. Fügen Sie den Secret Key in das Feld **Secret Key** ein und klicken Sie auf **Save**.

:::warning
Ihr Stripe Secret Key wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel generieren.
:::

## Wählen Sie Ihre Währung

Nach der Auswahl von Stripe als Anbieter wird neben Ihren API-Schlüsseln ein **Currency**-Dropdown angezeigt. Wählen Sie die Währung aus, die mit der Abrechnungswährung Ihres Stripe-Kontos übereinstimmt, damit Spenden korrekt berechnet werden.

Zu den unterstützten Währungen gehören USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN und BRL. Sie können die Standardwährung Ihres Kontos in Ihrem [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies) bestätigen oder ändern.

:::info
Die hier ausgewählte Währung wird für Einzelspenden, wiederkehrende Abonnements, Gebührenberechnungen und Spendenberichte verwendet. Wenn Sie die Währung später wechseln, verwenden nur neue Spenden und Abonnements die neue Währung – bestehende wiederkehrende Gaben bleiben in der Währung, in der sie erstellt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto für die Annahme der von Ihnen gewählten Währung konfiguriert ist. Wenn Ihr Stripe-Konto die ausgewählte Währung nicht unterstützt, schlagen Spenden beim Checkout fehl.
:::

## Apple Pay und Google Pay

Kirchen bei Stripe erhalten automatisch Apple Pay- und Google Pay-Schaltflächen auf der öffentlichen Spendenseite. Die Schaltflächen werden über den Kartenfeldern für Einzelspenden angezeigt, sobald der Spender einen Fonds und einen Betrag ausgewählt hat, und nur wenn das Browser- oder Gerät des Spenders eine Brieftasche eingerichtet hat. Wiederkehrende Gaben verwenden weiterhin die Karten- oder Bankfelder.

Google Pay erfordert keine Einrichtung. Apple Pay erfordert, dass die Domain Ihrer Spendenseite bei Stripe registriert ist; B1 registriert sie beim ersten Laden der Spendenseite auf Ihrer Domain. Wenn die Apple Pay-Schaltfläche auf einem iPhone nicht angezeigt wird, überprüfen Sie **Settings > Payment method domains** in Ihrem Stripe-Dashboard und bestätigen Sie, dass Ihre `yoursubdomain.b1.church` (oder benutzerdefinierte) Domain aufgelistet und verifiziert ist.

## Anonyme Gaben

Spender auf der öffentlichen Spendenseite können **Give anonymously** aktivieren. Eine anonyme Gabe wird ohne zugehörigen Spender aufgezeichnet, geht immer noch an den vom Spender gewählten Fonds und wird in Ihren Sammlungen und Berichten als **Anonymous** angezeigt. Die E-Mail-Adresse des Spenders ist immer noch erforderlich, damit die Quittung gesendet werden kann, aber es wird kein Personendatensatz erstellt. Anonyme Gaben sind nur einmalig und werden in keiner Spendenerklärung angezeigt.

## Fehlgeschlagene wiederkehrende Gaben

Wenn eine wiederkehrende Gabe bei Stripe fehlschlägt (z. B. eine abgelaufene oder abgelehnte Karte), wird die fehlgeschlagene Belastung unter **Donations > Failed Gifts** mit dem Spender, dem Betrag, dem Datum und dem Grund, den das Gateway angegeben hat, angezeigt. Klicken Sie auf **Retry**, um die Belastung erneut zu versuchen, sobald der Spender seine Zahlungsmethode aktualisiert hat.

B1 sendet dem Spender auch eine E-Mail, wenn die Belastung fehlschlägt, und erneut drei und sieben Tage später, falls sie immer noch nicht durchgeführt wurde, mit einem Link zum Aktualisieren seiner Zahlungsmethode in B1.church.

:::info
Wenn Ihre Kirche Stripe eingerichtet hat, bevor diese Funktion existierte, öffnen Sie **Settings** > **Giving**, klicken Sie auf Bearbeiten und klicken Sie einmal auf **Save**. Das aktualisiert den Stripe-Webhook, sodass fehlgeschlagene Belastungen an B1 gemeldet werden.
:::

## Hinzufügen einer Spendenseite zu Ihrer B1.church-Website

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das Symbol **Settings**.
3. Klicken Sie auf **Add Tab**.
4. Wählen Sie **Donation** als Typ.
5. Geben Sie einen Namen für die Registerkarte ein (z. B. "Give") und klicken Sie auf **Save**.
6. Ändern Sie optional das Registerkartenicon – geben Sie "Giv" in die Suchleiste für Icons ein, um ein spendendes Icon zu finden.

Ihre Spendenseite ist jetzt live. Mitglieder können sie unter `yoursubdomain.b1.church/donate` aufrufen.

## Teilen Sie Ihren Spenden-Link

Um Ihre Spenden-URL zu finden, gehen Sie zu **B1 Admin** und klicken Sie auf das Symbol **Settings**, um Ihre Subdomain anzuzeigen. Ihr Spenden-Link folgt dem Format:

`https://yoursubdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder in Ihrem Bulletin, damit Mitglieder wissen, wo sie online spenden können.

### Links mit voreingestelltem Fonds und Betrag

Um Spender direkt zu einem bestimmten Fonds zu schicken, gehen Sie zu **Donations > Funds** und klicken Sie auf **Giving Link** für den Fonds. Geben Sie optional einen Betrag ein und kopieren Sie dann den Link. Wenn ein Spender ihn öffnet, sind der Fonds und der Betrag bereits auf der Spendenseite ausgewählt. Der Link hat die Form:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Dieselben Parameter funktionieren im **Donate Link**-Element des Website-Builders.

## Spende-Benachrichtigungen

Stripe sendet jedes Mal eine E-Mail-Benachrichtigung, wenn eine Spende empfangen wird. Um die E-Mail-Adresse für Benachrichtigungen zu ändern, gehen Sie zum Stripe-Dashboard, klicken Sie auf Ihr Profil oben rechts, wählen Sie **Profile** und aktualisieren Sie Ihre E-Mail-Adresse.

## Optionen für Verarbeitungsgebühren

Sie können Ihre Spendenseite so konfigurieren, dass Spender optional Verarbeitungsgebühren übernehmen, sodass Ihre Kirche den vollständigen Spendenbetrag erhält. Diese Einstellung wird in Ihren Kircheneinstellungen in B1 Admin verwaltet.

:::tip
Machen Sie nach der Einrichtung eine kleine Testspende, um zu bestätigen, dass alles funktioniert, bevor Sie Online-Spenden an Ihre Gemeinde ankündigen.
:::

## Kingdom Funding einrichten

Kingdom Funding ist ein christlicher Zahlungsabwickler, der Kreditkarten, Debitkarten und ACH-Banktransfers unterstützt. Wenn Ihre Kirche bei Kingdom Funding angemeldet ist, können Sie es als Ihr Spenden-Gateway verbinden.

:::info
Die Kingdom Funding-Integration befindet sich derzeit in der Beta-Phase. Wenden Sie sich an Ihren B1-Kontovertreter, um es für Ihre Kirche zu aktivieren.
:::

1. Melden Sie sich auf [kingdomfunding.org](https://kingdomfunding.org) an oder melden Sie sich an.
2. Erhalten Sie Ihren **Security Key** und **Private Key** vom Kingdom Funding-Händlerportal.
3. Gehen Sie in B1 Admin zu **Settings**, öffnen Sie den Bereich **Giving** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Provider** auf **Kingdom Funding**.
5. Fügen Sie Ihren Security Key in das Feld **Security Key** und Ihren Private Key in das Feld **Private Key** ein.
6. Setzen Sie den **Webhook Key**, den Sie von Kingdom Funding erhalten haben, und kopieren Sie die angezeigte Webhook-URL in Ihre Kingdom Funding-Händlereinstellungen, damit Kingdom Funding B1 über abgeschlossene Transaktionen benachrichtigen kann.
7. Speichern.

Sobald verbunden, sehen Mitglieder einen Karten-/Bankschalter auf der Spendenseite und können per Kreditkarte oder ACH-Überweisung spenden.

## PayPal- und Venmo-Schaltflächen

Kirchen, die **PayPal** als Anbieter verwenden, erhalten **PayPal**- und **Venmo**-Schaltflächen über den Kartenfeldern auf der Spendenseite für Einzelspenden. Spender, die auf einen klicken, führen die Zahlung in einem PayPal-Fenster aus, und die Gabe wird wie jede andere Online-Spende aufgezeichnet. Venmo wird nur für Spender in den Vereinigten Staaten auf Geräten angezeigt, die PayPal für berechtigt hält. Wiederkehrende Gaben verwenden weiterhin die Kartenfelder.

## Paystack (Afrika) einrichten

Stripe eröffnet keine Konten für Kirchen in Ghana, Nigeria, Kenia, Südafrika oder Côte d'Ivoire. [Paystack](https://paystack.com) tut dies und akzeptiert lokale Karten, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), Banküberweisung und USSD – Spender zahlen in Ihrer lokalen Währung (GHS, NGN, KES, ZAR, XOF).

1. Registrieren Sie sich auf [paystack.com](https://paystack.com) mit dem Geschäftsregistrierungszertifikat Ihrer Kirche und einem lokalen Bankkonto, und absolvieren Sie die Aktivierungsprüfung von Paystack (Go-Live).
2. Öffnen Sie im Paystack-Dashboard **Settings → API Keys & Webhooks** und kopieren Sie den **Public Key** und **Secret Key** (verwenden Sie die Live-Schlüssel, nicht die Test-Schlüssel).
3. Gehen Sie in B1 Admin zu **Settings**, öffnen Sie den Bereich **Giving** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Provider** auf **Paystack**, fügen Sie den Public Key und Secret Key ein und wählen Sie Ihre **Currency**.
5. Kopieren Sie die unter dem Anbieter angezeigte **webhook URL**, gehen Sie zurück zum Paystack-Dashboard (**Settings → API Keys & Webhooks**) und fügen Sie sie in das Feld **Webhook URL** ein. So werden wiederkehrende Gaben und Mobile-Money-Zahlungen aufgezeichnet.
6. Speichern.

Spender führen ihre Zahlung in einem sicheren Paystack-Fenster aus und können dort Karte, Mobile Money oder Banküberweisung auswählen. Hinweise:

- **Wiederkehrende Gaben** erfordern eine Karte; Mobile Money kann nicht automatisch erneut belastet werden, daher erlaubt Paystack nur einmalige Mobile-Money-Gaben.
- Wiederkehrende Paystack-Gaben können von B1 aus storniert werden, aber nicht angehalten oder bearbeitet – stornieren und erstellen Sie eine neue Gabe, um den Betrag zu ändern.
- Die **Processing Fee** spiegelt die lokalen Kartensätze von Paystack für Ihre Währung wider; bearbeiten Sie sie, wenn Ihre vereinbarten Sätze abweichen.

## Nächste Schritte

- Verwenden Sie [Stripe Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu importieren, wenn sie nicht automatisch synchronisiert werden
- Überprüfen Sie Ihre [Donation Reports](donation-reports.md), um zu überprüfen, dass Online-Spenden korrekt angezeigt werden
- Generieren Sie [Giving Statements](giving-statements.md), die sowohl Online- als auch Offline-Spenden enthalten
