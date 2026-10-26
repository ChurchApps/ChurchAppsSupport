---
title: "Einrichtung von Online-Giving"
---

# Einrichtung von Online-Giving

<div class="article-intro">

B1 Admin ist mit **Stripe**, **PayPal**, **Kingdom Funding** und **Paystack** (für Kirchen in Afrika) verbunden, damit Ihre Mitglieder über Ihre B1.church-Website online geben können. Nach der Einrichtung erscheinen Online-Spenden automatisch in Ihren Spendenunterlagen, zusammen mit manuell erfassten Gaben, sodass alles in einem System bleibt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Geber ihre Gaben zuordnen können.
- Erstellen Sie ein Stripe-Konto unter [stripe.com](https://stripe.com) und aktivieren Sie es (nehmen Sie es aus dem Testmodus).
- Halten Sie Ihre Anmeldedaten für B1 Admin bereit.

</div>

## Stripe einrichten

1. Erstellen Sie ein Konto unter [stripe.com](https://stripe.com), falls Sie noch keines haben. Achten Sie darauf, Ihr Konto zu **aktivieren** und es aus dem Testmodus zu nehmen.
2. Gehen Sie in Stripe zu **Entwickler > API-Schlüssel**.
3. Kopieren Sie Ihren **Veröffentlichbaren Schlüssel** (Publishable Key).
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Gehen Sie zu **Einstellungen** und öffnen Sie den Bereich **Giving**.
6. Klicken Sie im Bereich **Giving** auf **Bearbeiten**.
7. Setzen Sie den **Anbieter** auf **Stripe**.
8. Fügen Sie Ihren veröffentlichbaren Schlüssel in das Feld **Öffentlicher Schlüssel** ein.
9. Gehen Sie zurück zu Stripe und zeigen Sie Ihren **Geheimen Schlüssel** an (Sie können ihn nur einmal sehen, sichern Sie ihn also vorher).
10. Fügen Sie den Geheimen Schlüssel in das Feld **Geheimer Schlüssel** ein und klicken Sie auf **Speichern**.

:::warning
Ihr geheimer Stripe-Schlüssel wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel erzeugen.
:::

## Ihre Währung wählen

Nachdem Sie Stripe als Anbieter ausgewählt haben, erscheint neben Ihren API-Schlüsseln ein Dropdown-Menü **Währung**. Wählen Sie die Währung, die der Abrechnungswährung Ihres Stripe-Kontos entspricht, damit Spenden korrekt belastet werden.

Unterstützte Währungen sind unter anderem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN und BRL. Die Standardwährung Ihres Kontos können Sie im [Stripe-Dashboard](https://dashboard.stripe.com/settings/currencies) prüfen oder ändern.

:::info
Die hier gewählte Währung gilt für einmalige Spenden, wiederkehrende Abos, Gebührenberechnungen und Spendenberichte. Wenn Sie die Währung später wechseln, verwenden nur neue Spenden und Abos die neue Währung. Bestehende wiederkehrende Gaben laufen in der Währung weiter, in der sie angelegt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto so konfiguriert ist, dass es die gewählte Währung akzeptiert. Unterstützt Ihr Stripe-Konto die gewählte Währung nicht, schlagen Spenden beim Bezahlvorgang fehl.
:::

## Apple Pay und Google Pay

Kirchen mit Stripe erhalten auf der öffentlichen Giving-Seite automatisch die Schaltflächen Apple Pay und Google Pay. Die Schaltflächen erscheinen für einmalige Gaben oberhalb der Kartenfelder, sobald der Geber einen Fonds und einen Betrag gewählt hat, und nur, wenn im Browser oder Gerät des Gebers eine Wallet eingerichtet ist. Wiederkehrende Gaben verwenden weiterhin die Karten- oder Bankfelder.

Für Google Pay ist keine Einrichtung nötig. Apple Pay erfordert, dass die Domain Ihrer Giving-Seite bei Stripe registriert ist. B1 registriert sie beim ersten Laden der Giving-Seite auf Ihrer Domain. Wird die Schaltfläche Apple Pay auf einem iPhone nicht angezeigt, prüfen Sie im Stripe-Dashboard unter **Einstellungen > Zahlungsmethoden-Domains**, ob Ihre Domain `ihreunterdomain.b1.church` (oder eine eigene Domain) aufgeführt und verifiziert ist.

## Anonyme Gaben

Geber auf der öffentlichen Giving-Seite können **Anonym geben** ankreuzen. Eine anonyme Gabe wird ohne zugeordneten Geber erfasst, fließt trotzdem in den vom Geber gewählten Fonds und erscheint in Ihren Stapeln und Berichten als **Anonym**. Die E-Mail-Adresse des Gebers ist weiterhin erforderlich, damit die Quittung versendet werden kann, aber es wird kein Personendatensatz angelegt. Anonyme Gaben sind nur einmalig möglich und erscheinen auf keiner Spendenbescheinigung.

## Fehlgeschlagene wiederkehrende Gaben

Schlägt eine wiederkehrende Gabe über Stripe fehl (etwa bei einer abgelaufenen oder abgelehnten Karte), erscheint die fehlgeschlagene Belastung unter **Spenden > Fehlgeschlagene Gaben** mit dem Geber, dem Betrag, dem Datum und dem Grund, den der Zahlungsdienstleister angegeben hat. Klicken Sie auf **Erneut versuchen**, um die Belastung erneut auszuführen, sobald der Geber seine Zahlungsmethode aktualisiert hat.

B1 benachrichtigt den Geber außerdem per E-Mail, wenn die Belastung fehlschlägt, und erneut nach drei und sieben Tagen, falls sie immer noch nicht durchgegangen ist. Die E-Mail enthält einen Link, um die Zahlungsmethode in B1.church zu aktualisieren.

:::info
Wenn Ihre Kirche Stripe eingerichtet hat, bevor diese Funktion existierte, öffnen Sie **Einstellungen** > **Giving**, klicken Sie auf Bearbeiten und einmal auf **Speichern**. Das aktualisiert den Stripe-Webhook, damit fehlgeschlagene Belastungen an B1 gemeldet werden.
:::

## Eine Spendenseite zu Ihrer B1.church-Website hinzufügen

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das Symbol **Einstellungen**.
3. Klicken Sie auf **Reiter hinzufügen**.
4. Wählen Sie **Spende** als Typ.
5. Geben Sie einen Namen für den Reiter ein (z. B. "Geben") und klicken Sie auf **Speichern**.
6. Ändern Sie optional das Reitersymbol: Geben Sie "Gib" in die Symbolsuche ein, um ein passendes Giving-Symbol zu finden.

Ihre Spendenseite ist nun online. Mitglieder erreichen sie unter `ihreunterdomain.b1.church/donate`.

## Ihren Giving-Link teilen

Ihre Giving-URL finden Sie in **B1 Admin**, wenn Sie auf das Symbol **Einstellungen** klicken; dort sehen Sie Ihre Unterdomain. Ihr Spendenlink hat folgendes Format:

`https://ihreunterdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder im Gemeindebrief, damit Mitglieder wissen, wo sie online geben können.

### Links mit voreingestelltem Fonds und Betrag

Um Geber direkt zu einem bestimmten Fonds zu führen, gehen Sie zu **Spenden > Fonds** und klicken Sie beim Fonds auf **Giving-Link**. Geben Sie optional einen Betrag ein und kopieren Sie den Link. Öffnet ein Geber ihn, sind Fonds und Betrag auf der Giving-Seite bereits ausgewählt. Der Link hat folgende Form:

`https://ihreunterdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Dieselben Parameter funktionieren im Element **Spendenlink** des Website-Builders.

## Spendenbenachrichtigungen

Stripe sendet bei jeder eingegangenen Spende eine E-Mail-Benachrichtigung. Um die Adresse für Benachrichtigungen zu ändern, gehen Sie im Stripe-Dashboard auf Ihr Profil oben rechts, wählen Sie **Profil** und aktualisieren Sie Ihre E-Mail-Adresse.

## Optionen für Bearbeitungsgebühren

Sie können Ihre Giving-Seite so konfigurieren, dass Geber optional die Bearbeitungsgebühren übernehmen, damit Ihre Kirche den vollen Spendenbetrag erhält. Diese Einstellung verwalten Sie in den Kircheneinstellungen in B1 Admin.

:::tip
Machen Sie nach der Einrichtung eine kleine Testspende, um sicherzustellen, dass alles funktioniert, bevor Sie Online-Giving in Ihrer Gemeinde ankündigen.
:::

## Kingdom Funding einrichten

Kingdom Funding ist ein christlicher Zahlungsdienstleister, der Kredit- und Debitkarten sowie ACH-Banküberweisungen unterstützt. Ist Ihre Kirche bei Kingdom Funding angemeldet, können Sie den Dienst als Giving-Gateway anbinden.

:::info
Die Integration von Kingdom Funding befindet sich derzeit in der Beta-Phase. Wenden Sie sich an Ihren B1-Ansprechpartner, damit er die Funktion für Ihre Kirche aktiviert.
:::

1. Registrieren Sie sich bzw. melden Sie sich unter [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) an.
2. Holen Sie sich Ihren **Sicherheitsschlüssel** (öffentlich) und Ihren **Privaten Schlüssel** aus dem Händlerportal von Kingdom Funding.
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Giving** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Anbieter** auf **Kingdom Funding**.
5. Fügen Sie Ihren Sicherheitsschlüssel in das Feld **Sicherheitsschlüssel** und Ihren Privaten Schlüssel in das Feld **Privater Schlüssel** ein.
6. Tragen Sie den **Webhook-Schlüssel** ein, den Sie von Kingdom Funding erhalten haben, und kopieren Sie die angezeigte Webhook-URL in Ihre Händlereinstellungen bei Kingdom Funding, damit Kingdom Funding B1 über abgeschlossene Transaktionen informieren kann.
7. Speichern Sie.

Sobald die Verbindung besteht, sehen Mitglieder auf der Spendenseite einen Umschalter Karte/Bank und können per Kreditkarte oder ACH-Überweisung geben.

## Schaltflächen für PayPal und Venmo

Kirchen, die **PayPal** als Anbieter nutzen, erhalten auf der Giving-Seite für einmalige Gaben die Schaltflächen **PayPal** und **Venmo** oberhalb der Kartenfelder. Geber, die eine davon anklicken, schließen die Zahlung in einem PayPal-Fenster ab, und die Gabe wird wie jede andere Online-Spende erfasst. Venmo erscheint nur für Geber in den Vereinigten Staaten auf Geräten, die PayPal als geeignet ansieht. Wiederkehrende Gaben verwenden weiterhin die Kartenfelder.

## Paystack einrichten (Afrika)

Stripe eröffnet keine Konten für Kirchen in Ghana, Nigeria, Kenia, Südafrika oder der Elfenbeinküste. [Paystack](https://paystack.com) tut dies, und es akzeptiert lokale Karten, **Mobile Money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), Banküberweisungen und USSD. Geber zahlen in Ihrer lokalen Währung (GHS, NGN, KES, ZAR, XOF).

1. Registrieren Sie sich unter [paystack.com](https://paystack.com) mit der Gründungsbescheinigung Ihrer Kirche und einem lokalen Bankkonto, und schließen Sie die Aktivierungsprüfung (Go-live) von Paystack ab.
2. Öffnen Sie im Paystack-Dashboard **Einstellungen → API-Schlüssel & Webhooks** und kopieren Sie den **Öffentlichen Schlüssel** und den **Geheimen Schlüssel** (verwenden Sie die Live-Schlüssel, nicht die Testschlüssel).
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Giving** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Anbieter** auf **Paystack**, fügen Sie den Öffentlichen Schlüssel und den Geheimen Schlüssel ein und wählen Sie Ihre **Währung**.
5. Kopieren Sie die **Webhook-URL**, die unter dem Anbieter angezeigt wird, gehen Sie zurück zum Paystack-Dashboard (**Einstellungen → API-Schlüssel & Webhooks**) und fügen Sie sie im Feld **Webhook-URL** ein. So werden wiederkehrende Gaben und Mobile-Money-Zahlungen erfasst.
6. Speichern Sie.

Geber schließen ihre Zahlung in einem gesicherten Paystack-Fenster ab und können dort Karte, Mobile Money oder Banküberweisung wählen. Hinweise:

- **Wiederkehrende Gaben** erfordern eine Karte. Mobile Money kann nicht automatisch erneut belastet werden, daher lässt Paystack nur einmalige Mobile-Money-Gaben zu.
- Wiederkehrende Gaben über Paystack können in B1 gekündigt, aber nicht pausiert oder bearbeitet werden. Um den Betrag zu ändern, kündigen Sie und legen Sie eine neue an.
- Die **Bearbeitungsgebühr** entspricht standardmäßig den lokalen Kartentarifen von Paystack für Ihre Währung. Passen Sie sie an, wenn Ihre ausgehandelten Tarife abweichen.

## Nächste Schritte

- Verwenden Sie [Stripe-Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu übernehmen, falls sie nicht automatisch synchronisiert werden.
- Prüfen Sie Ihre [Spendenberichte](donation-reports.md), um zu verifizieren, dass Online-Spenden korrekt erscheinen.
- Erstellen Sie [Spendenbescheinigungen](giving-statements.md), die sowohl Online- als auch Offline-Spenden enthalten.
