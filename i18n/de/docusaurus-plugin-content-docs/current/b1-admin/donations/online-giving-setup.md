---
title: "Einrichtung von Online-Spenden"
---

# Einrichtung von Online-Spenden

<div class="article-intro">

B1 Admin ist mit **Stripe**, **PayPal**, **Kingdom Funding** und **Paystack** (für Kirchen in Afrika) verbunden, damit Ihre Mitglieder über Ihre B1.church-Website online spenden können. Nach der Einrichtung erscheinen Online-Spenden automatisch in Ihren Spendenunterlagen, zusammen mit manuell erfassten Gaben. So bleibt alles in einem System.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spender ihre Gaben zuordnen können.
- Erstellen Sie ein Stripe-Konto unter [stripe.com](https://stripe.com) und aktivieren Sie es (nehmen Sie es aus dem Testmodus).
- Halten Sie Ihre Zugangsdaten für B1 Admin bereit.

</div>

## Stripe einrichten

1. Erstellen Sie ein Konto unter [stripe.com](https://stripe.com), falls Sie noch keines haben. Achten Sie darauf, Ihr Konto zu **aktivieren** und es aus dem Testmodus zu nehmen.
2. Gehen Sie in Stripe zu **Developers > API Keys** (Entwickler > API-Schlüssel).
3. Kopieren Sie Ihren **Publishable Key** (öffentlicher Schlüssel).
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Gehen Sie zu **Einstellungen** und öffnen Sie den Bereich **Spenden** (Giving).
6. Klicken Sie im Bereich **Spenden** auf **Bearbeiten**.
7. Stellen Sie den **Anbieter** auf **Stripe**.
8. Fügen Sie Ihren Publishable Key in das Feld **Öffentlicher Schlüssel** ein.
9. Gehen Sie zurück zu Stripe und zeigen Sie Ihren **Secret Key** (geheimer Schlüssel) an. Er wird nur einmal angezeigt, speichern Sie ihn daher unbedingt als Sicherung.
10. Fügen Sie den Secret Key in das Feld **Geheimer Schlüssel** ein und klicken Sie auf **Speichern**.

:::warning
Ihr Stripe Secret Key wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel erzeugen.
:::

## Die Währung wählen

Nachdem Sie Stripe als Anbieter ausgewählt haben, erscheint neben Ihren API-Schlüsseln ein Auswahlmenü **Währung**. Wählen Sie die Währung, die der Abrechnungswährung Ihres Stripe-Kontos entspricht, damit Spenden korrekt belastet werden.

Unterstützte Währungen sind unter anderem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN und BRL. Sie können die Standardwährung Ihres Kontos im [Stripe-Dashboard](https://dashboard.stripe.com/settings/currencies) prüfen oder ändern.

:::info
Die hier gewählte Währung wird für einmalige Spenden, wiederkehrende Daueraufträge, Gebührenberechnungen und Spendenberichte verwendet. Wenn Sie die Währung später wechseln, verwenden nur neue Spenden und Daueraufträge die neue Währung. Bestehende Daueraufträge laufen in der Währung weiter, in der sie angelegt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto die gewählte Währung akzeptiert. Unterstützt Ihr Stripe-Konto die gewählte Währung nicht, schlagen Spenden an der Kasse fehl.
:::

## Apple Pay und Google Pay

Kirchen mit Stripe erhalten auf der öffentlichen Spendenseite automatisch die Schaltflächen Apple Pay und Google Pay. Die Schaltflächen erscheinen für einmalige Gaben oberhalb der Kartenfelder, sobald der Spender einen Fonds und einen Betrag gewählt hat, und nur dann, wenn auf dem Browser oder Gerät des Spenders eine Wallet eingerichtet ist. Wiederkehrende Gaben verwenden weiterhin die Felder für Karte oder Bankkonto.

Für Google Pay ist keine Einrichtung nötig. Apple Pay erfordert, dass die Domain Ihrer Spendenseite bei Stripe registriert ist. B1 registriert sie beim ersten Laden der Spendenseite auf Ihrer Domain. Wenn die Schaltfläche Apple Pay auf einem iPhone nicht erscheint, prüfen Sie im Stripe-Dashboard unter **Einstellungen > Zahlungsmethoden-Domains**, ob Ihre Domain `yoursubdomain.b1.church` (oder Ihre eigene Domain) aufgeführt und verifiziert ist.

## Anonyme Spenden

Spender auf der öffentlichen Spendenseite können **Anonym spenden** ankreuzen. Eine anonyme Spende wird ohne zugeordneten Spender erfasst, geht trotzdem an den vom Spender gewählten Fonds und wird in Ihren Stapeln und Berichten als **Anonym** angezeigt. Die E-Mail-Adresse des Spenders ist weiterhin erforderlich, damit die Quittung versendet werden kann, aber es wird kein Personendatensatz angelegt. Anonyme Spenden sind nur einmalig möglich und erscheinen auf keiner Spendenbescheinigung.

## Fehlgeschlagene wiederkehrende Spenden

Schlägt eine wiederkehrende Spende über Stripe fehl (etwa wegen einer abgelaufenen oder abgelehnten Karte), erscheint die fehlgeschlagene Belastung unter **Spenden > Fehlgeschlagene Gaben** mit Spender, Betrag, Datum und dem Grund, den der Zahlungsdienst angegeben hat. Klicken Sie auf **Erneut versuchen**, um die Belastung erneut auszuführen, sobald der Spender seine Zahlungsmethode aktualisiert hat.

B1 schickt dem Spender außerdem eine E-Mail, wenn die Belastung fehlschlägt, und erneut nach drei und sieben Tagen, falls sie immer noch nicht durchgegangen ist. Die E-Mail enthält einen Link, über den der Spender seine Zahlungsmethode in B1.church aktualisieren kann.

:::info
Falls Ihre Kirche Stripe eingerichtet hat, bevor diese Funktion existierte, öffnen Sie **Einstellungen** > **Spenden**, klicken Sie auf Bearbeiten und einmal auf **Speichern**. Dadurch wird der Stripe-Webhook aktualisiert, sodass fehlgeschlagene Belastungen an B1 gemeldet werden.
:::

## Eine Spendenseite zu Ihrer B1.church-Website hinzufügen

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das Symbol **Einstellungen**.
3. Klicken Sie auf **Tab hinzufügen**.
4. Wählen Sie **Spende** als Typ.
5. Geben Sie einen Namen für den Tab ein (z. B. „Geben“) und klicken Sie auf **Speichern**.
6. Ändern Sie optional das Symbol des Tabs – geben Sie „Gib“ in die Symbolsuche ein, um ein passendes Symbol für Spenden zu finden.

Ihre Spendenseite ist nun online. Mitglieder erreichen sie unter `yoursubdomain.b1.church/donate`.

## Ihren Spendenlink teilen

Um Ihren Spenden-Link zu finden, gehen Sie in **B1 Admin** und klicken Sie auf das Symbol **Einstellungen**, um Ihre Subdomain zu sehen. Ihr Spendenlink hat folgendes Format:

`https://yoursubdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder in Ihrem Gemeindebrief, damit Mitglieder wissen, wo sie online spenden können.

### Links mit voreingestelltem Fonds und Betrag

Um Spender direkt zu einem bestimmten Fonds zu führen, gehen Sie zu **Spenden > Fonds** und klicken Sie beim Fonds auf **Spendenlink**. Geben Sie optional einen Betrag ein und kopieren Sie anschließend den Link. Wenn ein Spender ihn öffnet, sind Fonds und Betrag auf der Spendenseite bereits ausgewählt. Der Link hat folgende Form:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Dieselben Parameter funktionieren im Element **Spendenlink** des Website-Baukastens.

## Spendenbenachrichtigungen

Stripe sendet bei jeder eingegangenen Spende eine E-Mail-Benachrichtigung. Um die Adresse für diese Benachrichtigungen zu ändern, gehen Sie im Stripe-Dashboard auf Ihr Profil oben rechts, wählen **Profil** und aktualisieren Ihre E-Mail-Adresse.

## Optionen für Bearbeitungsgebühren

Sie können Ihre Spendenseite so einrichten, dass Spender die Bearbeitungsgebühren optional übernehmen können, sodass Ihre Kirche den vollen Spendenbetrag erhält. Diese Einstellung verwalten Sie in den Kircheneinstellungen in B1 Admin.

:::tip
Machen Sie nach der Einrichtung eine kleine Testspende, um sicherzugehen, dass alles funktioniert, bevor Sie Online-Spenden in Ihrer Gemeinde bekannt machen.
:::

## Einrichtung von Kingdom Funding

Kingdom Funding ist ein christlicher Zahlungsdienstleister, der Kredit- und Debitkarten sowie ACH-Banküberweisungen unterstützt. Wenn Ihre Kirche bei Kingdom Funding registriert ist, können Sie es als Zahlungsweg für Spenden anbinden.

:::info
Die Integration von Kingdom Funding befindet sich derzeit in der Beta-Phase. Bitten Sie Ihren Ansprechpartner bei B1, sie für Ihre Kirche zu aktivieren.
:::

1. Registrieren Sie sich oder melden Sie sich unter [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) an.
2. Holen Sie sich Ihren **Security Key** (öffentlicher Schlüssel) und Ihren **Private Key** (privater Schlüssel) aus dem Händlerportal von Kingdom Funding.
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Spenden** und klicken Sie auf Bearbeiten.
4. Stellen Sie den **Anbieter** auf **Kingdom Funding**.
5. Fügen Sie Ihren Security Key in das Feld **Security Key** und Ihren Private Key in das Feld **Private Key** ein.
6. Tragen Sie den **Webhook-Schlüssel** ein, den Sie von Kingdom Funding erhalten haben, und kopieren Sie die angezeigte Webhook-URL in Ihre Händlereinstellungen bei Kingdom Funding, damit Kingdom Funding B1 über abgeschlossene Transaktionen informieren kann.
7. Speichern Sie.

Sobald die Verbindung besteht, sehen Mitglieder auf der Spendenseite einen Umschalter für Karte/Bankkonto und können per Kreditkarte oder ACH-Überweisung spenden.

## Schaltflächen für PayPal und Venmo

Kirchen, die **PayPal** als Anbieter nutzen, erhalten auf der Spendenseite oberhalb der Kartenfelder die Schaltflächen **PayPal** und **Venmo** für einmalige Gaben. Spender, die eine davon anklicken, schließen die Zahlung in einem PayPal-Fenster ab, und die Gabe wird wie jede andere Online-Spende erfasst. Venmo erscheint nur für Spender in den Vereinigten Staaten auf Geräten, die PayPal als geeignet ansieht. Wiederkehrende Gaben verwenden weiterhin die Kartenfelder.

## Einrichtung von Paystack (Afrika)

Stripe eröffnet für Kirchen in Ghana, Nigeria, Kenia, Südafrika und der Elfenbeinküste keine Konten. [Paystack](https://paystack.com) tut dies, und der Dienst akzeptiert lokale Karten, **Mobilfunkgeld** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), Banküberweisungen und USSD. Spender bezahlen in Ihrer lokalen Währung (GHS, NGN, KES, ZAR, XOF).

1. Registrieren Sie sich unter [paystack.com](https://paystack.com) mit der Gewerbe- bzw. Registrierungsbescheinigung Ihrer Kirche und einem lokalen Bankkonto, und schließen Sie die Aktivierungsprüfung (Go-live) von Paystack ab.
2. Öffnen Sie im Paystack-Dashboard **Einstellungen → API Keys & Webhooks** und kopieren Sie den **Public Key** und den **Secret Key** (verwenden Sie die Live-Schlüssel, nicht die Testschlüssel).
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Spenden** und klicken Sie auf Bearbeiten.
4. Stellen Sie den **Anbieter** auf **Paystack**, fügen Sie Public Key und Secret Key ein und wählen Sie Ihre **Währung**.
5. Kopieren Sie die **Webhook-URL**, die unter dem Anbieter angezeigt wird, gehen Sie zurück zum Paystack-Dashboard (**Einstellungen → API Keys & Webhooks**) und fügen Sie sie in das Feld **Webhook-URL** ein. So werden wiederkehrende Gaben und Mobilfunkzahlungen erfasst.
6. Speichern Sie.

Spender schließen ihre Zahlung in einem sicheren Paystack-Fenster ab und können dort Karte, Mobilfunkgeld oder Banküberweisung wählen. Hinweise:

- **Wiederkehrende Gaben** benötigen eine Karte. Mobilfunkgeld kann nicht automatisch erneut belastet werden. Daher erlaubt Paystack nur einmalige Gaben per Mobilfunkgeld.
- Wiederkehrende Paystack-Gaben können in B1 gekündigt, aber nicht pausiert oder bearbeitet werden. Um den Betrag zu ändern, kündigen Sie die Gabe und legen Sie eine neue an.
- Die **Bearbeitungsgebühr** entspricht standardmäßig den Tarifen von Paystack für lokale Karten in Ihrer Währung. Passen Sie die Werte an, wenn Ihre vereinbarten Tarife abweichen.

## Nächste Schritte

- Verwenden Sie den [Stripe-Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu übernehmen, falls sie nicht automatisch synchronisiert werden.
- Prüfen Sie Ihre [Spendenberichte](donation-reports.md), um zu kontrollieren, dass Online-Spenden korrekt erscheinen.
- Erstellen Sie [Spendenbescheinigungen](giving-statements.md), die sowohl Online- als auch Offline-Spenden enthalten.
