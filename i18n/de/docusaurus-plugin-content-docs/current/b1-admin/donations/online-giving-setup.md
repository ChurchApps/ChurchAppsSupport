---
title: "Einrichtung der Online-Spenden"
---

# Einrichtung der Online-Spenden

<div class="article-intro">

B1 Admin ist mit **Stripe**, **PayPal**, **Kingdom Funding** und **Paystack** (für Kirchen in Afrika) verbunden, damit Ihre Mitglieder über Ihre B1.church-Website online geben können. Nach der Einrichtung erscheinen Online-Spenden automatisch in Ihren Spendenaufzeichnungen, zusammen mit manuell erfassten Gaben, sodass alles in einem System bleibt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Spendenfonds](funds.md) ein, damit Spender ihre Gaben zuweisen können
- Erstellen Sie ein Stripe-Konto auf [stripe.com](https://stripe.com) und aktivieren Sie es (nehmen Sie es aus dem Testmodus)
- Halten Sie Ihre Anmeldedaten für B1 Admin bereit

</div>

## Stripe einrichten

1. Erstellen Sie ein Konto auf [stripe.com](https://stripe.com), falls Sie noch keins haben. Achten Sie darauf, Ihr **Konto zu aktivieren** und es aus dem Testmodus zu nehmen.
2. Gehen Sie in Stripe zu **Entwickler > API-Schlüssel**.
3. Kopieren Sie Ihren **Veröffentlichbaren Schlüssel** (Publishable Key).
4. Melden Sie sich bei [B1 Admin](https://admin.b1.church/) an.
5. Gehen Sie zu **Einstellungen** und öffnen Sie den Abschnitt **Spenden**.
6. Klicken Sie im Abschnitt **Spenden** auf **Bearbeiten**.
7. Setzen Sie den **Anbieter** auf **Stripe**.
8. Fügen Sie Ihren veröffentlichbaren Schlüssel in das Feld **Öffentlicher Schlüssel** ein.
9. Gehen Sie zurück zu Stripe und zeigen Sie Ihren **Geheimen Schlüssel** (Secret Key) an. Er wird nur einmal angezeigt, speichern Sie ihn also unbedingt als Sicherung.
10. Fügen Sie den geheimen Schlüssel in das Feld **Geheimer Schlüssel** ein und klicken Sie auf **Speichern**.

:::warning
Ihr geheimer Stripe-Schlüssel wird nur einmal angezeigt. Kopieren Sie ihn an einen sicheren Ort, bevor Sie das Stripe-Dashboard verlassen. Wenn Sie ihn verlieren, müssen Sie einen neuen Schlüssel erzeugen.
:::

## Ihre Währung wählen

Nachdem Sie Stripe als Anbieter ausgewählt haben, erscheint neben Ihren API-Schlüsseln ein Dropdown-Menü **Währung**. Wählen Sie die Währung, die der Auszahlungswährung Ihres Stripe-Kontos entspricht, damit Spenden korrekt abgebucht werden.

Unterstützte Währungen sind unter anderem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN und BRL. Sie können die Standardwährung Ihres Kontos im [Stripe-Dashboard](https://dashboard.stripe.com/settings/currencies) prüfen oder ändern.

:::info
Die hier gewählte Währung gilt für einmalige Spenden, wiederkehrende Daueraufträge, Gebührenberechnungen und Spendenberichte. Wenn Sie die Währung später wechseln, nutzen nur neue Spenden und Daueraufträge die neue Währung – bestehende wiederkehrende Gaben laufen weiter in der Währung, in der sie angelegt wurden.
:::

:::warning
Stellen Sie sicher, dass Ihr Stripe-Konto so konfiguriert ist, dass es die gewählte Währung akzeptiert. Unterstützt Ihr Stripe-Konto die gewählte Währung nicht, schlagen Spenden an der Kasse fehl.
:::

## Apple Pay und Google Pay

Kirchen mit Stripe erhalten auf der öffentlichen Gebotsseite automatisch Schaltflächen für Apple Pay und Google Pay. Die Schaltflächen erscheinen oberhalb der Kartenfelder für einmalige Gaben, sobald der Spender einen Fonds und einen Betrag gewählt hat, und nur wenn im Browser oder auf dem Gerät des Spenders eine Wallet eingerichtet ist. Wiederkehrende Gaben verwenden weiterhin die Karten- oder Bankfelder.

Google Pay erfordert keine Einrichtung. Apple Pay setzt voraus, dass die Domain Ihrer Gebotsseite bei Stripe registriert ist; B1 registriert sie beim ersten Laden der Gebotsseite auf Ihrer Domain. Wird die Apple-Pay-Schaltfläche auf einem iPhone nicht angezeigt, prüfen Sie unter **Einstellungen > Zahlungsmethoden-Domains** in Ihrem Stripe-Dashboard, ob Ihre Subdomain `ihresubdomain.b1.church` (oder Ihre eigene Domain) aufgeführt und verifiziert ist.

## Anonyme Gaben

Spender auf der öffentlichen Gebotsseite können **Anonym geben** ankreuzen. Eine anonyme Gabe wird ohne zugeordnete Person erfasst, fließt trotzdem in den vom Spender gewählten Fonds und erscheint in Ihren Stapeln und Berichten als **Anonym**. Die E-Mail-Adresse des Spenders ist weiterhin erforderlich, damit die Quittung versandt werden kann, aber es wird kein Personendatensatz angelegt. Anonyme Gaben sind nur einmalig möglich und erscheinen in keiner Spendenbescheinigung.

## Fehlgeschlagene wiederkehrende Gaben

Schlägt eine wiederkehrende Gabe über Stripe fehl (etwa wegen einer abgelaufenen oder abgelehnten Karte), erscheint die fehlgeschlagene Abbuchung unter **Spenden > Fehlgeschlagene Gaben** mit Spender, Betrag, Datum und dem Grund, den der Zahlungsdienst angegeben hat. Klicken Sie auf **Erneut versuchen**, um die Abbuchung erneut auszuführen, sobald der Spender seine Zahlungsmethode aktualisiert hat.

B1 schickt dem Spender außerdem eine E-Mail, wenn die Abbuchung fehlschlägt, und erneut drei und sieben Tage später, falls sie immer noch nicht durchgegangen ist. Die E-Mail enthält einen Link, um die Zahlungsmethode in B1.church zu aktualisieren.

:::info
Hat Ihre Kirche Stripe eingerichtet, bevor es diese Funktion gab, öffnen Sie **Einstellungen** > **Spenden**, klicken Sie auf Bearbeiten und einmal auf **Speichern**. Das aktualisiert den Stripe-Webhook, damit fehlgeschlagene Abbuchungen an B1 gemeldet werden.
:::

## Eine Spendenseite zu Ihrer B1.church-Website hinzufügen

1. Gehen Sie zu [b1.church](https://b1.church/) und melden Sie sich an.
2. Klicken Sie auf das Symbol **Einstellungen**.
3. Klicken Sie auf **Tab hinzufügen**.
4. Wählen Sie **Spende** als Typ.
5. Geben Sie einen Namen für den Tab ein (z. B. „Geben“) und klicken Sie auf **Speichern**.
6. Ändern Sie optional das Symbol des Tabs – geben Sie „Gab“ in die Symbolsuche ein, um ein passendes Symbol für Spenden zu finden.

Ihre Spendenseite ist nun online. Mitglieder erreichen sie unter `ihresubdomain.b1.church/donate`.

## Ihren Gebelink teilen

Um Ihren Spendenlink zu finden, gehen Sie zu **B1 Admin** und klicken Sie auf das Symbol **Einstellungen**, um Ihre Subdomain zu sehen. Ihr Spendenlink hat folgendes Format:

`https://ihresubdomain.b1.church/donate`

Teilen Sie diesen Link auf Ihrer Website, in E-Mails oder im Gemeindebrief, damit Mitglieder wissen, wo sie online geben können.

### Links mit voreingestelltem Fonds und Betrag

Um Spender direkt zu einem bestimmten Fonds zu führen, gehen Sie zu **Spenden > Fonds** und klicken Sie beim Fonds auf **Gebelink**. Geben Sie optional einen Betrag ein und kopieren Sie den Link. Der Dialog zeigt außerdem einen QR-Code für denselben Link; klicken Sie auf **PNG herunterladen**, um ihn für den Gemeindebrief, eine Folie oder ein Plakat zu speichern. Öffnet ein Spender den Link oder scannt er den Code, sind Fonds und Betrag auf der Gebotsseite bereits ausgewählt. Der Link hat folgende Form:

`https://ihresubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Dieselben Parameter funktionieren im Element **Spendenlink** des Website-Baukastens.

## Spendenbenachrichtigungen

Stripe sendet für jede eingegangene Spende eine E-Mail-Benachrichtigung. Um die Adresse für diese Benachrichtigungen zu ändern, gehen Sie im Stripe-Dashboard auf Ihr Profil oben rechts, wählen **Profil** und aktualisieren Ihre E-Mail-Adresse.

## Optionen für Bearbeitungsgebühren

Sie können Ihre Gebotsseite so konfigurieren, dass Spender die Bearbeitungsgebühren optional übernehmen können, damit Ihre Kirche den vollen Spendenbetrag erhält. Diese Einstellung wird in den Kircheneinstellungen in B1 Admin verwaltet.

:::tip
Machen Sie nach der Einrichtung eine kleine Testspende, um zu prüfen, dass alles funktioniert, bevor Sie Online-Spenden in Ihrer Gemeinde ankündigen.
:::

## Kingdom Funding einrichten

Kingdom Funding ist ein christlicher Zahlungsdienstleister, der Kredit- und Debitkarten sowie ACH-Banküberweisungen unterstützt. Ist Ihre Kirche bei Kingdom Funding registriert, können Sie es als Ihren Spendendienst anbinden.

:::info
Die Integration von Kingdom Funding befindet sich derzeit in der Beta-Phase. Wenden Sie sich an Ihre B1-Ansprechperson, um sie für Ihre Kirche zu aktivieren.
:::

1. Registrieren Sie sich oder melden Sie sich auf [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) an.
2. Holen Sie sich Ihren **Sicherheitsschlüssel** (öffentlich) und Ihren **privaten Schlüssel** aus dem Händlerportal von Kingdom Funding.
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Abschnitt **Spenden** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Anbieter** auf **Kingdom Funding**.
5. Fügen Sie Ihren Sicherheitsschlüssel in das Feld **Sicherheitsschlüssel** und Ihren privaten Schlüssel in das Feld **Privater Schlüssel** ein.
6. Tragen Sie den **Webhook-Schlüssel** ein, den Sie von Kingdom Funding erhalten haben, und kopieren Sie die angezeigte Webhook-URL in Ihre Händlereinstellungen bei Kingdom Funding, damit Kingdom Funding B1 über abgeschlossene Transaktionen informieren kann.
7. Speichern.

Nach der Verbindung sehen Mitglieder auf der Spendenseite einen Umschalter Karte/Bank und können per Kreditkarte oder ACH-Überweisung geben.

## PayPal- und Venmo-Schaltflächen

Kirchen, die **PayPal** als Anbieter nutzen, erhalten auf der Gebotsseite für einmalige Gaben die Schaltflächen **PayPal** und **Venmo** oberhalb der Kartenfelder. Spender, die eine davon anklicken, schließen die Zahlung in einem PayPal-Fenster ab, und die Gabe wird wie jede andere Online-Spende erfasst. Venmo erscheint nur für Spender in den USA auf Geräten, die PayPal als geeignet einstuft. Wiederkehrende Gaben verwenden weiterhin die Kartenfelder.

## Paystack (Afrika) einrichten

Stripe eröffnet für Kirchen in Ghana, Nigeria, Kenia, Südafrika und der Elfenbeinküste keine Konten. [Paystack](https://paystack.com) tut dies, und es akzeptiert lokale Karten, **Mobilgeld** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), Banküberweisungen und USSD. Spender zahlen in Ihrer lokalen Währung (GHS, NGN, KES, ZAR, XOF).

1. Registrieren Sie sich auf [paystack.com](https://paystack.com) mit der Gründungsurkunde Ihrer Kirche und einem lokalen Bankkonto, und schließen Sie die Aktivierungsprüfung (Go-live) von Paystack ab.
2. Öffnen Sie im Paystack-Dashboard **Einstellungen → API-Schlüssel & Webhooks** und kopieren Sie den **Öffentlichen Schlüssel** und den **Geheimen Schlüssel** (verwenden Sie die Live-Schlüssel, nicht die Testschlüssel).
3. Gehen Sie in B1 Admin zu **Einstellungen**, öffnen Sie den Abschnitt **Spenden** und klicken Sie auf Bearbeiten.
4. Setzen Sie den **Anbieter** auf **Paystack**, fügen Sie den öffentlichen und den geheimen Schlüssel ein und wählen Sie Ihre **Währung**.
5. Kopieren Sie die **Webhook-URL**, die unter dem Anbieter angezeigt wird, gehen Sie zurück zum Paystack-Dashboard (**Einstellungen → API-Schlüssel & Webhooks**) und fügen Sie sie in das Feld **Webhook-URL** ein. So werden wiederkehrende Gaben und Mobilgeld-Zahlungen erfasst.
6. Speichern.

Spender schließen ihre Zahlung in einem gesicherten Paystack-Fenster ab und können dort Karte, Mobilgeld oder Banküberweisung wählen. Hinweise:

- **Wiederkehrende Gaben** benötigen eine Karte; Mobilgeld kann nicht automatisch erneut abgebucht werden, daher erlaubt Paystack nur einmalige Mobilgeld-Gaben.
- Wiederkehrende Paystack-Gaben können in B1 gekündigt, aber nicht pausiert oder bearbeitet werden – um den Betrag zu ändern, kündigen Sie und legen Sie eine neue an.
- Die Standardwerte für die **Bearbeitungsgebühr** entsprechen den lokalen Kartentarifen von Paystack für Ihre Währung; bearbeiten Sie sie, wenn Ihre ausgehandelten Tarife abweichen.

## Nächste Schritte

- Verwenden Sie den [Stripe-Import](stripe-import.md), um Online-Transaktionen in B1 Admin zu übernehmen, falls sie nicht automatisch synchronisiert werden
- Prüfen Sie Ihre [Spendenberichte](donation-reports.md), um zu kontrollieren, ob Online-Spenden korrekt erscheinen
- Erstellen Sie [Spendenbescheinigungen](giving-statements.md), die Online- und Offline-Spenden enthalten
