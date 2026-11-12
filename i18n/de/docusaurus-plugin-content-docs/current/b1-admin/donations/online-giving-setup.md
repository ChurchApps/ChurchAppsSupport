---
title: "Einrichtung der Online-Spenden"
description: "Verbinden Sie Stripe, Kingdom Funding oder Paystack mit B1 Admin, damit Mitglieder über Ihre B1.church-Seite online geben können und die Gaben mit Ihren Unterlagen synchronisiert werden."
---

# Einrichtung der Online-Spenden

<div class="article-intro">

B1 Admin ist mit **Stripe**, **Kingdom Funding** und **Paystack** (für Kirchen in Afrika) verbunden, damit Mitglieder über Ihre B1.church-Seite online geben können. Nach der Einrichtung erscheinen Online-Spenden automatisch in Ihren Spendenunterlagen neben manuell erfassten Gaben, sodass alles in einem System bleibt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spendende ihre Gaben zuordnen können
- Erstellen Sie ein Stripe-Konto unter [stripe.com](https://stripe.com) und aktivieren Sie es (nehmen Sie es aus dem Testmodus)
- Halten Sie Ihre Anmeldedaten für B1 Admin bereit

</div>

## Stripe einrichten {#setting-up-stripe}

1. Erstellen Sie ein Konto unter [stripe.com](https://stripe.com), falls Sie noch keines haben. Achten Sie darauf, Ihr Konto zu **aktivieren** und es aus dem Testmodus zu nehmen.
2. Gehen Sie in Stripe zu **Entwickler > API-Schlüssel**.
3. Kopieren Sie Ihren **Veröffentlichbaren Schlüssel**.
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Gehen Sie zu **Einstellungen** und öffnen Sie den Bereich **Spenden**.
6. Klicken Sie im Bereich **Spenden** auf **Bearbeiten**.
7. Setzen Sie den **Anbieter** auf **Stripe**.
8. Fügen Sie Ihren Veröffentlichbaren Schlüssel in das Feld **Öffentlicher Schlüssel** ein.
9. Gehen Sie zurück zu Stripe und zeigen Sie Ihren **Geheimen Schlüssel** an (Sie können ihn nur einmal sehen, speichern Sie also eine Sicherungskopie).
10. Fügen Sie den Geheimen Schlüssel in das Feld **Geheimer Schlüssel** ein und klicken Sie auf **Speichern**.

:::warning
Ihr Stripe-Geheimschlüssel wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel erzeugen.
:::

## Die Währung wählen {#choosing-your-currency}

Nachdem Sie Stripe als Anbieter ausgewählt haben, erscheint neben Ihren API-Schlüsseln ein Dropdown-Menü **Währung**. Wählen Sie die Währung, die der Abrechnungswährung Ihres Stripe-Kontos entspricht, damit Spenden korrekt belastet werden.

Haben Sie noch keine Währung gespeichert, beginnt das Dropdown-Menü mit der Währung des Landes Ihrer Kirche aus der Anmeldung und nicht mit US-Dollar. Prüfen Sie vor dem Speichern, dass sie zu Ihrem Stripe-Konto passt.

Nimmt Ihre Kirche keine Online-Gaben an, belassen Sie den **Anbieter** auf **Keiner** und wählen Sie trotzdem eine **Währung** – die Liste enthält dann alle Währungen, mit dem Hinweis „Die Währung, in der Ihre Kirche Gaben erfasst.“. Manuell in Stapeln erfasste Gaben werden in dieser Währung gespeichert, und Gebesummen werden in ihr angezeigt.

Unterstützte Währungen sind unter anderem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL und PHP. Die Standardwährung Ihres Kontos können Sie im [Stripe-Dashboard](https://dashboard.stripe.com/settings/currencies) prüfen oder ändern.

:::info
Die hier gewählte Währung gilt für einmalige Spenden, wiederkehrende Abonnements, Gebührenberechnungen und Spendenberichte. Wechseln Sie später die Währung, nutzen nur neue Spenden und Abonnements die neue Währung – bestehende wiederkehrende Gaben laufen in der Währung weiter, in der sie angelegt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto für die gewählte Währung eingerichtet ist. Unterstützt Ihr Stripe-Konto die gewählte Währung nicht, schlagen Spenden beim Bezahlen fehl.
:::

## Apple Pay und Google Pay {#apple-pay-and-google-pay}

Kirchen mit Stripe erhalten auf der öffentlichen Gebeseite automatisch Schaltflächen für Apple Pay und Google Pay. Die Schaltflächen erscheinen über den Kartenfeldern bei einmaligen Gaben, sobald Spendende einen Fonds und einen Betrag gewählt haben, und nur, wenn auf dem Browser oder Gerät der Spendenden eine Wallet eingerichtet ist. Wiederkehrende Gaben verwenden weiterhin die Felder für Karte oder Bankkonto.

Google Pay erfordert keine Einrichtung. Apple Pay setzt voraus, dass die Domain Ihrer Gebeseite bei Stripe registriert ist; B1 registriert sie, sobald die Gebeseite zum ersten Mal auf Ihrer Domain geladen wird. Erscheint die Schaltfläche Apple Pay auf einem iPhone nicht, prüfen Sie im Stripe-Dashboard unter **Einstellungen > Domains für Zahlungsmethoden**, ob Ihre Domain `yoursubdomain.b1.church` (oder eine eigene Domain) aufgeführt und verifiziert ist.

## Anonyme Gaben {#anonymous-gifts}

Spendende auf der öffentlichen Gebeseite können **Anonym geben** ankreuzen. Eine anonyme Gabe wird ohne zugeordnete Person erfasst, geht trotzdem an den vom Spendenden gewählten Fonds und erscheint in Ihren Stapeln und Berichten als **Anonym**. Die E-Mail-Adresse des Spendenden ist weiterhin erforderlich, damit die Quittung versendet werden kann, aber es wird kein Personendatensatz angelegt. Anonyme Gaben sind nur einmalig möglich und erscheinen in keiner Spendenbescheinigung.

## Fehlgeschlagene wiederkehrende Gaben {#failed-recurring-gifts}

Schlägt eine wiederkehrende Gabe über Stripe fehl (etwa wegen einer abgelaufenen oder abgelehnten Karte), erscheint die fehlgeschlagene Belastung unter **Spenden > Fehlgeschlagene Gaben** mit dem Spendenden, dem Betrag, dem Datum und dem Grund, den das Gateway angegeben hat. Klicken Sie auf **Erneut versuchen**, um die Belastung erneut auszuführen, sobald der Spendende seine Zahlungsmethode aktualisiert hat.

B1 schickt dem Spendenden außerdem eine E-Mail, wenn die Belastung fehlschlägt, und erneut drei und sieben Tage später, falls sie immer noch nicht durchgegangen ist. Die E-Mail enthält einen Link, mit dem die Zahlungsmethode in B1.church aktualisiert werden kann.

:::info
Hat Ihre Kirche Stripe eingerichtet, bevor diese Funktion existierte, öffnen Sie **Einstellungen** > **Spenden**, klicken Sie auf Bearbeiten und einmal auf **Speichern**. Dadurch wird der Stripe-Webhook aktualisiert, sodass fehlgeschlagene Belastungen an B1 gemeldet werden.
:::

## Eine Spendenseite zu Ihrer B1.church-Seite hinzufügen {#adding-a-donation-page-to-your-b1church-site}

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das Symbol **Einstellungen**.
3. Klicken Sie auf **Reiter hinzufügen**.
4. Wählen Sie **Spende** als Typ.
5. Geben Sie einen Namen für den Reiter ein (z. B. „Geben“) und klicken Sie auf **Speichern**.
6. Ändern Sie optional das Symbol des Reiters – geben Sie „Giv“ in die Symbolsuche ein, um ein Symbol zum Thema Geben zu finden.

Ihre Spendenseite ist jetzt online. Mitglieder können sie unter `yoursubdomain.b1.church/donate` aufrufen.

## Ihren Gebe-Link teilen {#sharing-your-giving-link}

Ihre Gebe-URL finden Sie in **B1 Admin**: Klicken Sie auf das Symbol **Einstellungen**, um Ihre Subdomain zu sehen. Ihr Spenden-Link hat folgendes Format:

`https://yoursubdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder im Gemeindebrief, damit Mitglieder wissen, wo sie online geben können.

### Links mit voreingestelltem Fonds und Betrag {#links-with-a-preset-fund-and-amount}

Um Spendende direkt zu einem bestimmten Fonds zu führen, gehen Sie zu **Spenden > Fonds** und klicken Sie beim Fonds auf **Gebe-Link**. Geben Sie optional einen Betrag ein und kopieren Sie dann den Link. Der Dialog zeigt außerdem einen QR-Code für denselben Link; klicken Sie auf **PNG herunterladen**, um ihn für Gemeindebrief, Folie oder Plakat zu speichern. Wenn Spendende den Link öffnen oder den Code scannen, sind Fonds und Betrag auf der Gebeseite bereits ausgewählt. Der Link hat folgende Form:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Dieselben Parameter funktionieren im Element **Spenden-Link** des Website-Builders.

## Spendenbenachrichtigungen {#donation-notifications}

Stripe sendet bei jeder eingegangenen Spende eine E-Mail-Benachrichtigung. Um die Adresse für Benachrichtigungen zu ändern, gehen Sie im Stripe-Dashboard auf Ihr Profil oben rechts, wählen Sie **Profil** und aktualisieren Sie Ihre E-Mail-Adresse.

## Optionen für Bearbeitungsgebühren {#processing-fee-options}

Sie können Spendenden die Möglichkeit geben, Bearbeitungsgebühren freiwillig zu übernehmen, damit Ihre Kirche den vollen Spendenbetrag erhält. Gehen Sie unter **Einstellungen > Spenden** auf Bearbeiten und aktivieren Sie den Schalter **Transaktionsgebühr** neben Ihren Schlüsseln. Die Sätze zur Berechnung der Gebühr finden Sie unter **Gebühren & Bescheinigungen**: **Pauschalsatz** und **Transaktionsgebühr** für Karten sowie bei Stripe-Bankgaben (ACH) einen Prozentsatz und eine **Obergrenze**. Sie beginnen mit den Standardsätzen Ihres Anbieters; ändern Sie sie, falls Ihre ausgehandelten Sätze abweichen, und klicken Sie dann auf **Speichern**.

:::tip
Machen Sie nach der Einrichtung eine kleine Testspende, um zu prüfen, dass alles funktioniert, bevor Sie die Online-Gaben Ihrer Gemeinde ankündigen.
:::

## Kingdom Funding einrichten {#setting-up-kingdom-funding}

Kingdom Funding ist ein christlicher Zahlungsdienstleister, der Kredit- und Debitkarten sowie ACH-Banküberweisungen unterstützt. Ist Ihre Kirche bei Kingdom Funding registriert, können Sie es als Gebe-Gateway verbinden.

:::info
Die Anbindung an Kingdom Funding befindet sich derzeit in der Beta-Phase. Wenden Sie sich an Ihre Ansprechperson für B1, um sie für Ihre Kirche zu aktivieren.
:::

1. Registrieren oder melden Sie sich unter [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) an.
2. Holen Sie sich Ihren **Tokenisierungsschlüssel** und Ihren **Quellschlüssel** aus dem Kingdom-Funding-Dashboard.
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Spenden** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Anbieter** auf **Kingdom Funding**.
5. Fügen Sie die Schlüssel in die Felder **Tokenisierungsschlüssel** und **Quellschlüssel** ein.
6. Geben Sie den **Webhook-Schlüssel** ein (das Signiergeheimnis des Webhooks aus dem Kontrollzentrum von Kingdom Funding) und kopieren Sie die unter dem Anbieter angezeigte Webhook-URL in Ihre Einstellungen bei Kingdom Funding, damit Kingdom Funding B1 über abgeschlossene Transaktionen informieren kann.
7. Klicken Sie auf **Speichern**.

Nach der Verbindung sehen Mitglieder auf der Spendenseite einen Umschalter Karte/Bank und können per Kreditkarte oder ACH-Überweisung geben.

## PayPal- und Venmo-Schaltflächen {#paypal-and-venmo-buttons}

PayPal wird für neue Einrichtungen nicht mehr in der Liste **Anbieter** angeboten. Kirchen, die bereits mit **PayPal** verbunden sind, erhalten auf der Gebeseite für einmalige Gaben die Schaltflächen **PayPal** und **Venmo** über den Kartenfeldern. Spendende, die eine davon anklicken, schließen die Zahlung in einem PayPal-Fenster ab, und die Gabe wird wie jede andere Online-Spende erfasst. Venmo erscheint nur für Spendende in den Vereinigten Staaten auf Geräten, die PayPal als geeignet ansieht. Wiederkehrende Gaben verwenden weiterhin die Kartenfelder.

## Paystack (Afrika) einrichten {#setting-up-paystack-africa}

Stripe eröffnet keine Konten für Kirchen in Ghana, Nigeria, Kenia, Südafrika oder der Elfenbeinküste. [Paystack](https://paystack.com) tut dies, und es akzeptiert lokale Karten, **mobiles Geld** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), Banküberweisungen und USSD – Spendende zahlen in Ihrer Landeswährung (GHS, NGN, KES, ZAR, XOF).

1. Registrieren Sie sich unter [paystack.com](https://paystack.com) mit der Gewerbeanmeldung Ihrer Kirche und einem lokalen Bankkonto und schließen Sie die Freischaltungsprüfung (Go-Live) von Paystack ab.
2. Öffnen Sie im Paystack-Dashboard **Einstellungen → API-Schlüssel & Webhooks** und kopieren Sie den **öffentlichen Schlüssel** und den **geheimen Schlüssel** (verwenden Sie die Live-Schlüssel, nicht die Testschlüssel).
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Spenden** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Anbieter** auf **Paystack**, fügen Sie den öffentlichen Schlüssel und den geheimen Schlüssel ein und wählen Sie Ihre **Währung**.
5. Kopieren Sie die unter dem Anbieter angezeigte **Webhook-URL**, gehen Sie zurück zum Paystack-Dashboard (**Einstellungen → API-Schlüssel & Webhooks**) und fügen Sie sie in das Feld **Webhook-URL** ein. So werden wiederkehrende Gaben und Zahlungen mit mobilem Geld erfasst.
6. Speichern Sie.

Spendende schließen ihre Zahlung in einem gesicherten Paystack-Fenster ab und können dort Karte, mobiles Geld oder Banküberweisung wählen. Hinweise:

- **Wiederkehrende Gaben** benötigen eine Karte; mobiles Geld kann nicht automatisch erneut belastet werden, daher erlaubt Paystack nur einmalige Gaben mit mobilem Geld.
- Wiederkehrende Paystack-Gaben können in B1 gekündigt, aber nicht pausiert oder bearbeitet werden – um den Betrag zu ändern, kündigen Sie und legen eine neue an.
- Die Standardwerte der **Bearbeitungsgebühr** entsprechen den lokalen Kartensätzen von Paystack für Ihre Währung; bearbeiten Sie sie, falls Ihre ausgehandelten Sätze abweichen.

## Wie es weitergeht {#next-steps}

- Nutzen Sie den [Stripe-Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu übernehmen, falls sie nicht automatisch synchronisiert werden
- Prüfen Sie Ihre [Spendenberichte](donation-reports.md), um zu kontrollieren, dass Online-Spenden korrekt erscheinen
- Erstellen Sie [Spendenbescheinigungen](giving-statements.md), die sowohl Online- als auch Offline-Spenden enthalten
