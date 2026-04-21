---
title: "Online Geven instellen"
---

# Online Geven instellen

<div class="article-intro">

B1 Admin integreert met **Stripe** en **PayPal** zodat uw leden online via uw B1.church-site kunnen geven. Eenmaal geconfigureerd, verschijnen online donaties automatisch in uw donatiegegevens naast handmatig ingevoerde giften, waardoor alles in één systeem blijft.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Stel uw [donatiefondsen](funds.md) in zodat donoren hun giften kunnen aanduiden
- Maak een Stripe-account aan op [stripe.com](https://stripe.com) en activeer het (schakel het uit de testmodus)
- Heb uw B1 Admin-inloggegevens gereed

</div>

## Stripe instellen

1. Maak een account aan op [stripe.com](https://stripe.com) als u nog geen account hebt. Zorg ervoor dat u **uw account activeert** en het uit de testmodus haalt.
2. Ga in Stripe naar **Developers > API Keys**.
3. Kopieer uw **Publishable Key**.
4. Log in op [B1 Admin](https://admin.b1.church/).
5. Klik op **Kerk** in de bovenste navigatie en klik vervolgens op **Kerkinstellingen bewerken**.
6. Klik op het bewerkingspictogram naast **Kerkinstellingen**.
7. Schuif omlaag naar de sectie **Geven**.
8. Stel de **Provider** in op **Stripe**.
9. Plak uw Publishable Key in het veld **Openbare sleutel**.
10. Ga terug naar Stripe en onthul uw **Secret Key** (u kunt dit maar eenmaal bekijken, dus maak een reservekopie).
11. Plak de Secret Key in het veld **Secret Key** en klik op **Opslaan**.

:::warning
Uw Stripe Secret Key wordt maar eenmaal weergegeven. Kopieer het naar een veilige locatie voordat u het Stripe-dashboard verlaat. Als u het kwijtraakt, moet u een nieuwe sleutel genereren.
:::

## Een donatiegina toevoegen aan uw B1.church-site

1. Ga naar [b1.church](https://b1.church/) en meld u aan.
2. Klik op het pictogram **Instellingen**.
3. Klik op **Tabblad toevoegen**.
4. Kies **Donatie** als het type.
5. Voer een naam in voor het tabblad (bijv. "Geven") en klik op **Opslaan**.
6. Wijzig desgewenst het tabblad pictogram -- typ "Giv" in de pictograamzoeking voor een geven-gerelateerd pictogram.

Uw donatiegina is nu live. Leden kunnen deze openen op `yoursubdomain.b1.church/donate`.

## Uw geven-link delen

Om uw geven-URL te vinden, gaat u naar **B1 Admin** en klikt u op het pictogram **Instellingen** om uw subdomein te zien. Uw donatielink volgt het formaat:

`https://yoursubdomain.b1.church/donate`

Deel deze link op uw website, in e-mails of in uw bulletin zodat leden weten waar zij online kunnen geven.

## Donatienotificaties

Stripe stuurt een e-mailnotificatie telkens wanneer een donatie wordt ontvangen. Om het e-mailadres voor notificatie te wijzigen, gaat u naar het Stripe-dashboard, klikt u op uw profiel in de rechterhoek, kiest u **Profiel** en werkt u uw e-mailadres bij.

## Verwerkingskosteninstellingen

U kunt uw geven-pagina configureren zodat donoren optioneel verwerkingskosten kunnen dekken, zodat uw kerk het volledige donatiedbedrag ontvangt. Deze instelling wordt beheerd in uw kerkinstellingen in B1 Admin.

:::tip
Maak na de installatie een kleine testdonatie om te bevestigen dat alles werkt voordat u online geven aan uw gemeente aankondigt.
:::

## Volgende stappen

- Gebruik [Stripe Import](stripe-import.md) om online transacties naar B1 Admin te halen als deze niet automatisch worden gesynchroniseerd
- Controleer uw [Donatie-rapporten](donation-reports.md) om te verifiëren dat online donaties correct verschijnen
- Genereer [Giftverklaringen](giving-statements.md) die zowel online als offline donaties bevatten
