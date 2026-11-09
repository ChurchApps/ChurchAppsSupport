---
title: "Einrichtung der Online-Spenden"
description: "Stripe, PayPal, Kingdom Funding oder Paystack mit B1 Admin verbinden, damit Mitglieder über Ihre B1.church-Seite online spenden können und Gaben mit Ihren Unterlagen synchronisiert werden."
---

# Einrichtung der Online-Spenden

<div class="article-intro">

B1 Admin ist mit **Stripe**, **PayPal**, **Kingdom Funding** und **Paystack** (für Gemeinden in Afrika) verbunden. So können Mitglieder über Ihre B1.church-Seite online spenden. Nach der Einrichtung erscheinen Online-Spenden automatisch in Ihren Spendenunterlagen, neben manuell erfassten Gaben. Alles bleibt so in einem System.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spendende ihre Gaben zuweisen können
- Erstellen Sie ein Stripe-Konto unter [stripe.com](https://stripe.com) und aktivieren Sie es (nehmen Sie es aus dem Testmodus)
- Halten Sie Ihre Anmeldedaten für B1 Admin bereit

</div>

## Stripe einrichten

1. Erstellen Sie unter [stripe.com](https://stripe.com) ein Konto, falls Sie noch keins haben. Achten Sie darauf, Ihr **Konto zu aktivieren** und den Testmodus zu beenden.
2. Gehen Sie in Stripe zu **Entwickler > API-Schlüssel**.
3. Kopieren Sie Ihren **Veröffentlichbaren Schlüssel**.
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Öffnen Sie **Einstellungen** und den Bereich **Spenden**.
6. Klicken Sie im Bereich **Spenden** auf **Bearbeiten**.
7. Stellen Sie den **Anbieter** auf **Stripe**.
8. Fügen Sie Ihren Veröffentlichbaren Schlüssel in das Feld **Öffentlicher Schlüssel** ein.
9. Wechseln Sie zurück zu Stripe und zeigen Sie Ihren **Geheimen Schlüssel** an. Er wird nur einmal angezeigt, speichern Sie also unbedingt eine Sicherungskopie.
10. Fügen Sie den Geheimen Schlüssel in das Feld **Geheimer Schlüssel** ein und klicken Sie auf **Speichern**.

:::warning
Ihr Stripe-Geheimschlüssel wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel erzeugen.
:::

## Ihre Währung auswählen {#choosing-your-currency}

Nachdem Sie Stripe als Anbieter ausgewählt haben, erscheint neben Ihren API-Schlüsseln ein Dropdown-Menü **Währung**. Wählen Sie die Währung, die der Abrechnungswährung Ihres Stripe-Kontos entspricht, damit Spenden korrekt belastet werden.

Wenn Sie noch keine Währung gespeichert haben, startet das Dropdown-Menü mit der Währung des Landes Ihrer Gemeinde aus der Anmeldung und nicht mit US-Dollar. Prüfen Sie vor dem Speichern, ob sie zu Ihrem Stripe-Konto passt.

Nimmt Ihre Gemeinde keine Online-Spenden an, lassen Sie den **Anbieter** auf **Keiner** stehen und wählen Sie trotzdem eine **Währung**. Die Liste enthält dann alle Währungen mit dem Hinweis „Die Währung, in der Ihre Gemeinde Spenden erfasst.“ Von Hand in Stapeln eingegebene Spenden werden in dieser Währung erfasst, und Spendensummen werden in ihr angezeigt.

Unterstützte Währungen sind unter anderem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL und PHP. Die Standardwährung Ihres Kontos können Sie im [Stripe-Dashboard](https://dashboard.stripe.com/settings/currencies) prüfen oder ändern.

:::info
Die hier gewählte Währung gilt für einmalige Spenden, wiederkehrende Daueraufträge, die Berechnung von Gebühren und die Spendenberichte. Wenn Sie die Währung später wechseln, verwenden nur neue Spenden und Daueraufträge die neue Währung. Bestehende wiederkehrende Gaben laufen in der Währung weiter, in der sie angelegt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto die gewählte Währung akzeptiert. Unterstützt Ihr Stripe-Konto die ausgewählte Währung nicht, schlagen Spenden an der Kasse fehl.
:::

## Apple Pay und Google Pay

Gemeinden mit Stripe erhalten auf der öffentlichen Giving-Seite automatisch die Schaltflächen Apple Pay und Google Pay. Die Schaltflächen erscheinen oberhalb der Kartenfelder für einmalige Gaben, sobald die spendende Person einen Fonds und einen Betrag gewählt hat, und nur wenn im Browser oder Gerät der spendenden Person ein Wallet eingerichtet ist. Wiederkehrende Gaben verwenden weiterhin die Karten- oder Bankfelder.

Für Google Pay ist keine Einrichtung nötig. Apple Pay erfordert, dass die Domain Ihrer Giving-Seite bei Stripe registriert ist. B1 registriert sie beim ersten Laden der Giving-Seite auf Ihrer Domain. Erscheint die Schaltfläche Apple Pay auf einem iPhone nicht, prüfen Sie im Stripe-Dashboard unter **Einstellungen > Zahlungsmethoden-Domains**, ob Ihre Domain `ihreunterdomain.b1.church` (oder eigene Domain) aufgeführt und bestätigt ist.

## Anonyme Gaben

Spendende auf der öffentlichen Giving-Seite können **Anonym spenden** anklicken. Eine anonyme Gabe wird ohne zugeordnete spendende Person erfasst, geht trotzdem an den von der spendenden Person gewählten Fonds und erscheint in Ihren Stapeln und Berichten als **Anonym**. Die E-Mail-Adresse der spendenden Person ist weiterhin erforderlich, damit die Quittung versendet werden kann. Es wird aber kein Personendatensatz angelegt. Anonyme Gaben sind nur einmalig möglich und erscheinen auf keiner Spendenbescheinigung.

## Fehlgeschlagene wiederkehrende Gaben

Schlägt eine wiederkehrende Gabe über Stripe fehl (zum Beispiel bei einer abgelaufenen oder abgelehnten Karte), erscheint die fehlgeschlagene Belastung unter **Spenden > Fehlgeschlagene Gaben** mit der spendenden Person, dem Betrag, dem Datum und dem Grund, den der Zahlungsdienst angegeben hat. Klicken Sie auf **Erneut versuchen**, um die Belastung erneut auszuführen, sobald die spendende Person ihre Zahlungsmethode aktualisiert hat.

B1 schickt der spendenden Person außerdem eine E-Mail, wenn die Belastung fehlschlägt. Ist sie nach drei und nach sieben Tagen immer noch nicht durchgegangen, folgen weitere E-Mails. Sie enthalten einen Link, um die Zahlungsmethode in B1.church zu aktualisieren.

:::info
Wenn Ihre Gemeinde Stripe eingerichtet hat, bevor es diese Funktion gab, öffnen Sie **Einstellungen** > **Spenden**, klicken Sie auf Bearbeiten und einmal auf **Speichern**. Dadurch wird der Stripe-Webhook aktualisiert, sodass fehlgeschlagene Belastungen an B1 gemeldet werden.
:::

## Eine Spendenseite zu Ihrer B1.church-Seite hinzufügen

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das Symbol **Einstellungen**.
3. Klicken Sie auf **Reiter hinzufügen**.
4. Wählen Sie **Spende** als Typ.
5. Geben Sie einen Namen für den Reiter ein (z. B. „Geben“) und klicken Sie auf **Speichern**.
6. Ändern Sie optional das Reitersymbol. Geben Sie dazu „Gab“ in die Symbolsuche ein, um ein passendes Symbol für Spenden zu finden.

Ihre Spendenseite ist nun online. Mitglieder erreichen sie unter `ihreunterdomain.b1.church/donate`.

## Ihren Spendenlink teilen

Um Ihren Spendenlink zu finden, gehen Sie zu **B1 Admin** und klicken Sie auf das Symbol **Einstellungen**, um Ihre Unterdomain zu sehen. Ihr Spendenlink hat dieses Format:

`https://ihreunterdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder im Gemeindebrief, damit Mitglieder wissen, wo sie online spenden können.

### Links mit voreingestelltem Fonds und Betrag

Um Spendende direkt zu einem bestimmten Fonds zu führen, gehen Sie zu **Spenden > Fonds** und klicken Sie beim Fonds auf **Spendenlink**. Geben Sie optional einen Betrag ein und kopieren Sie dann den Link. Der Dialog zeigt außerdem einen QR-Code für denselben Link. Klicken Sie auf **PNG herunterladen**, um ihn für den Gemeindebrief, eine Folie oder ein Plakat zu speichern. Wenn eine spendende Person den Link öffnet oder den Code scannt, sind Fonds und Betrag auf der Giving-Seite bereits ausgewählt. Der Link hat dieses Format:

`https://ihreunterdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Dieselben Parameter funktionieren im Element **Spendenlink** des Website-Builders.

## Benachrichtigungen zu Spenden

Stripe sendet jedes Mal eine E-Mail-Benachrichtigung, wenn eine Spende eingeht. Um die Adresse für diese Benachrichtigungen zu ändern, gehen Sie im Stripe-Dashboard oben rechts auf Ihr Profil, wählen **Profil** und aktualisieren Ihre E-Mail-Adresse.

## Optionen für Bearbeitungsgebühren

Sie können Ihre Giving-Seite so einrichten, dass Spendende die Bearbeitungsgebühren optional übernehmen. Dadurch erhält Ihre Gemeinde den vollen Spendenbetrag. Diese Einstellung verwalten Sie in den Gemeindeeinstellungen in B1 Admin.

:::tip
Machen Sie nach der Einrichtung eine kleine Testspende, um zu prüfen, dass alles funktioniert, bevor Sie Online-Spenden in Ihrer Gemeinde ankündigen.
:::

## Kingdom Funding einrichten

Kingdom Funding ist ein christlicher Zahlungsdienstleister, der Kredit- und Debitkarten sowie ACH-Banküberweisungen unterstützt. Wenn Ihre Gemeinde bei Kingdom Funding registriert ist, können Sie es als Ihren Zahlungsdienst für Spenden anbinden.

:::info
Die Integration von Kingdom Funding befindet sich derzeit in der Beta-Phase. Wenden Sie sich an Ihre B1-Kontaktperson, um sie für Ihre Gemeinde zu aktivieren.
:::

1. Registrieren Sie sich bzw. melden Sie sich unter [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) an.
2. Holen Sie Ihren **Sicherheitsschlüssel** (öffentlich) und Ihren **Privaten Schlüssel** aus dem Händlerportal von Kingdom Funding.
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Spenden** und klicken Sie auf Bearbeiten.
4. Stellen Sie den **Anbieter** auf **Kingdom Funding**.
5. Fügen Sie Ihren Sicherheitsschlüssel in das Feld **Sicherheitsschlüssel** und Ihren Privaten Schlüssel in das Feld **Privater Schlüssel** ein.
6. Tragen Sie den **Webhook-Schlüssel** ein, den Sie von Kingdom Funding erhalten haben, und kopieren Sie die angezeigte Webhook-URL in Ihre Händler-Einstellungen bei Kingdom Funding. So kann Kingdom Funding B1 über abgeschlossene Transaktionen informieren.
7. Speichern Sie.

Sobald die Verbindung besteht, sehen Mitglieder auf der Spendenseite einen Umschalter für Karte/Bank und können per Kreditkarte oder ACH-Überweisung geben.

## PayPal- und Venmo-Schaltflächen

Gemeinden, die **PayPal** als Anbieter nutzen, erhalten für einmalige Gaben die Schaltflächen **PayPal** und **Venmo** oberhalb der Kartenfelder auf der Giving-Seite. Spendende, die eine Schaltfläche anklicken, schließen die Zahlung in einem PayPal-Fenster ab. Die Gabe wird wie jede andere Online-Spende erfasst. Venmo erscheint nur für Spendende in den Vereinigten Staaten auf Geräten, die PayPal als geeignet ansieht. Wiederkehrende Gaben verwenden weiterhin die Kartenfelder.

## Paystack (Afrika) einrichten

Stripe eröffnet für Gemeinden in Ghana, Nigeria, Kenia, Südafrika und der Elfenbeinküste keine Konten. [Paystack](https://paystack.com) tut das, und es akzeptiert lokale Karten, **mobiles Geld** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), Banküberweisungen und USSD. Spendende zahlen in Ihrer Landeswährung (GHS, NGN, KES, ZAR, XOF).

1. Registrieren Sie sich unter [paystack.com](https://paystack.com) mit der Gewerbeanmeldung Ihrer Gemeinde und einem lokalen Bankkonto und schließen Sie die Aktivierungsprüfung (Go-live) von Paystack ab.
2. Öffnen Sie im Paystack-Dashboard **Einstellungen → API-Schlüssel & Webhooks** und kopieren Sie den **Öffentlichen Schlüssel** und den **Geheimen Schlüssel**. Verwenden Sie die Live-Schlüssel, nicht die Testschlüssel.
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Bereich **Spenden** und klicken Sie auf Bearbeiten.
4. Stellen Sie den **Anbieter** auf **Paystack**, fügen Sie den Öffentlichen Schlüssel und den Geheimen Schlüssel ein und wählen Sie Ihre **Währung**.
5. Kopieren Sie die **Webhook-URL**, die unter dem Anbieter angezeigt wird. Gehen Sie zurück zum Paystack-Dashboard (**Einstellungen → API-Schlüssel & Webhooks**) und fügen Sie sie im Feld **Webhook-URL** ein. So werden wiederkehrende Gaben und Zahlungen über mobiles Geld erfasst.
6. Speichern Sie.

Spendende schließen ihre Zahlung in einem sicheren Paystack-Fenster ab und können dort Karte, mobiles Geld oder Banküberweisung wählen. Hinweise:

- **Wiederkehrende Gaben** benötigen eine Karte. Mobiles Geld kann nicht automatisch erneut belastet werden. Deshalb erlaubt Paystack nur einmalige Gaben per mobilem Geld.
- Wiederkehrende Paystack-Gaben können in B1 gekündigt, aber nicht pausiert oder bearbeitet werden. Um den Betrag zu ändern, kündigen Sie die Gabe und legen Sie eine neue an.
- Die Werte für die **Bearbeitungsgebühr** entsprechen den lokalen Kartentarifen von Paystack für Ihre Währung. Passen Sie sie an, wenn Ihre verhandelten Tarife abweichen.

## Nächste Schritte

- Verwenden Sie den [Stripe-Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu übernehmen, falls sie nicht automatisch synchronisiert werden
- Prüfen Sie Ihre [Spendenberichte](donation-reports.md), um zu kontrollieren, dass Online-Spenden korrekt erscheinen
- Erstellen Sie [Spendenbescheinigungen](giving-statements.md), die Online- und Offline-Spenden enthalten
