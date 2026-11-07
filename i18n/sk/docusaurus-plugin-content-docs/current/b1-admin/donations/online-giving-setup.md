---
title: "Nastavenie online darovania"
---

# Nastavenie online darovania

<div class="article-intro">

B1 Admin sa integruje so službami **Stripe**, **PayPal**, **Kingdom Funding** a **Paystack** (pre cirkvi v Afrike), aby vaši členovia mohli darovať online cez váš web B1.church. Po nastavení sa online dary automaticky zobrazia vo vašich záznamoch darov spolu s ručne zadanými darmi, takže všetko zostane v jednom systéme.

</div>

<div class="prereqs">
<h4>Pred začiatkom</h4>

- Nastavte si [fondy darov](funds.md), aby darcovia mohli určiť, na aký účel chcú dar použiť
- Vytvorte si účet na [stripe.com](https://stripe.com) a aktivujte ho (vypnite testovací režim)
- Pripravte si prihlasovacie údaje do B1 Admin

</div>

## Nastavenie Stripe

1. Ak ešte nemáte účet, vytvorte si ho na [stripe.com](https://stripe.com). Uistite sa, že **aktivujete svoj účet** a vypnete testovací režim.
2. V Stripe prejdite do **Developers > API Keys**.
3. Skopírujte si **Publishable Key**.
4. Prihláste sa do [B1 Admin](https://admin.b1.church/).
5. Prejdite do **Settings** a otvorte sekciu **Giving**.
6. Kliknite na **Edit** v sekcii **Giving**.
7. Nastavte **Provider** na **Stripe**.
8. Vložte svoj Publishable Key do poľa **Public Key**.
9. Vráťte sa do Stripe a zobrazte svoj **Secret Key** (zobraziť ho môžete iba raz, preto si ho uložte na bezpečné miesto).
10. Vložte Secret Key do poľa **Secret Key** a kliknite na **Save**.

:::warning
Váš Stripe Secret Key sa zobrazí iba raz. Skopírujte ho na bezpečné miesto skôr, ako opustíte panel Stripe. Ak ho stratíte, budete musieť vygenerovať nový kľúč.
:::

## Výber meny

Po výbere Stripe ako poskytovateľa sa vedľa vašich API kľúčov zobrazí rozbaľovací zoznam **Currency**. Vyberte menu, ktorá zodpovedá mene vyrovnania vášho účtu Stripe, aby sa dary správne strhávali.

Podporované meny zahŕňajú USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN a BRL. Predvolenú menu svojho účtu môžete overiť alebo zmeniť v [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Mena, ktorú tu vyberiete, sa používa pri jednorazových daroch, opakovaných predplatných, výpočtoch poplatkov a správach o darovaní. Ak neskôr menu zmeníte, novú menu budú používať iba nové dary a predplatné. Existujúce opakované dary zostanú v mene, v ktorej boli vytvorené.
:::

:::warning
Uistite sa, že váš účet Stripe je nastavený na prijímanie zvolenej meny. Ak váš účet Stripe vybranú menu nepodporuje, dary zlyhajú už pri pokladni.
:::

## Apple Pay a Google Pay

Cirkvi používajúce Stripe automaticky získajú tlačidlá Apple Pay a Google Pay na verejnej stránke darovania. Tlačidlá sa pri jednorazových daroch zobrazia nad poľami pre kartu, keď darca vyberie fond a sumu, a iba vtedy, ak má jeho prehliadač alebo zariadenie nastavenú peňaženku. Opakované dary stále využívajú polia pre kartu alebo bankový účet.

Google Pay nevyžaduje žiadne nastavenie. Apple Pay vyžaduje, aby bola doména vašej stránky darovania zaregistrovaná v Stripe. B1 ju zaregistruje pri prvom načítaní stránky darovania na vašej doméne. Ak sa tlačidlo Apple Pay na iPhone nezobrazuje, skontrolujte v Stripe Dashboard položku **Settings > Payment method domains** a overte, že je vaša doména `yoursubdomain.b1.church` (alebo vlastná doména) uvedená a overená.

## Anonymné dary

Darcovia na verejnej stránke darovania môžu zaškrtnúť možnosť **Darovať anonymne**. Anonymný dar sa zaznamená bez priradenia darcu, stále smeruje do fondu, ktorý darca zvolil, a vo vašich dávkach a správach sa zobrazuje ako **Anonymous**. E-mail darcu je stále potrebný, aby mohol byť odoslaný potvrdenie, ale nevytvorí sa žiadny záznam osoby. Anonymné dary sú iba jednorazové a neobjavia sa v žiadnom výpise darov.

## Zlyhané opakované dary

Ak opakovaný dar cez Stripe zlyhá (napríklad pri expirovanej alebo zamietnutej karte), neúspešná platba sa zobrazí v sekcii **Donations > Failed Gifts** spolu s darcom, sumou, dátumom a dôvodom, ktorý uviedla platobná brána. Keď darca aktualizuje svoj spôsob platby, kliknutím na **Retry** platbu znova spustíte.

B1 darcovi pošle e-mail aj vtedy, keď platba zlyhá, a potom ešte tri a sedem dní neskôr, ak platba stále neprešla. E-mail obsahuje odkaz na aktualizáciu spôsobu platby v B1.church.

:::info
Ak vaša cirkev nastavila Stripe ešte pred zavedením tejto funkcie, otvorte **Settings** > **Giving**, kliknite na úpravu a raz kliknite na **Save**. Tým sa obnoví webhook Stripe, aby sa neúspešné platby hlásili do B1.
:::

## Pridanie stránky darovania na váš web B1.church

1. Prejdite na [b1.church](https://b1.church/) a prihláste sa.
2. Kliknite na ikonu **Settings**.
3. Kliknite na **Add Tab**.
4. Ako typ vyberte **Donation**.
5. Zadajte názov karty (napr. „Dary“) a kliknite na **Save**.
6. Voliteľne zmeňte ikonu karty. Do vyhľadávania ikon zadajte „Giv“ a vyberte ikonu súvisiacu s darovaním.

Vaša stránka darovania je teraz aktívna. Členovia ju nájdu na adrese `yoursubdomain.b1.church/donate`.

## Zdieľanie odkazu na darovanie

Adresu na darovanie zistíte tak, že v **B1 Admin** kliknete na ikonu **Settings** a uvidíte svoju subdoménu. Odkaz na darovanie má tento tvar:

`https://yoursubdomain.b1.church/donate`

Tento odkaz zdieľajte na svojom webe, v e-mailoch alebo vo vašom farskom spravodaji, aby členovia vedeli, kde môžu darovať online.

### Odkazy s predvoleným fondom a sumou

Ak chcete darcov poslať priamo na konkrétny fond, prejdite do **Donations > Funds** a pri fonde kliknite na **Giving Link**. Voliteľne zadajte sumu a potom odkaz skopírujte. Dialógové okno zobrazuje aj QR kód pre rovnaký odkaz. Kliknutím na **Download PNG** ho uložíte pre farský spravodaj, prezentáciu alebo plagát. Keď darca otvorí odkaz alebo naskenuje kód, na stránke darovania už budú vybraté fond aj suma. Odkaz má tento tvar:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Rovnaké parametre funguje aj prvok **Donate Link** v tvorcovi webových stránok.

## Upozornenia o daroch

Stripe pošle e-mailové upozornenie zakaždým, keď príde dar. Ak chcete zmeniť e-mailovú adresu pre upozornenia, prejdite na panel Stripe, kliknite na svoj profil v pravom hornom rohu, vyberte **Profile** a aktualizujte svoju e-mailovú adresu.

## Možnosti poplatkov za spracovanie

Stránku darovania môžete nastaviť tak, aby darcovia mohli voliteľne uhradiť poplatky za spracovanie, takže vaša cirkev dostane celú sumu daru. Toto nastavenie spravujete v nastaveniach cirkvi v B1 Admin.

:::tip
Po nastavení urobte malý testovací dar, aby ste si overili, že všetko funguje, skôr než oznámite online darovanie vašej zbore.
:::

## Nastavenie Kingdom Funding

Kingdom Funding je kresťanský platobný procesor, ktorý podporuje platobné a kreditné karty a bankové prevody ACH. Ak je vaša cirkev zaregistrovaná v Kingdom Funding, môžete ju pripojiť ako svoju bránu na darovanie.

:::info
Integrácia Kingdom Funding je momentálne v beta verzii. Ak ju chcete pre svoju cirkev aktivovať, kontaktujte svojho zástupcu pre účet B1.
:::

1. Zaregistrujte sa alebo sa prihláste na [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Z portálu obchodníka Kingdom Funding získajte **Security Key** (verejný kľúč) a **Private Key**.
3. V B1 Admin prejdite do **Settings**, otvorte sekciu **Giving** a kliknite na úpravu.
4. Nastavte **Provider** na **Kingdom Funding**.
5. Vložte Security Key do poľa **Security Key** a Private Key do poľa **Private Key**.
6. Nastavte **Webhook Key**, ktorý ste dostali od Kingdom Funding, a zobrazenú webhook URL skopírujte do nastavení svojho obchodníka v Kingdom Funding. Vďaka tomu môže Kingdom Funding informovať B1 o dokončených transakciách.
7. Uložte.

Po pripojení uvidia členovia na stránke darovania prepínač karta/banka a môžu darovať kreditnou kartou alebo bankovým prevodom ACH.

## Tlačidlá PayPal a Venmo

Cirkvi, ktoré používajú **PayPal** ako poskytovateľa, získajú na stránke darovania pri jednorazových daroch nad poľami pre kartu tlačidlá **PayPal** a **Venmo**. Darcovia, ktorí na jedno z nich kliknú, dokončia platbu v okne PayPal a dar sa zaznamená rovnako ako každý iný online dar. Venmo sa zobrazuje iba darcom v Spojených štátoch na zariadeniach, ktoré PayPal považuje za oprávnené. Opakované dary stále využívajú polia pre kartu.

## Nastavenie Paystack (Afrika)

Stripe neotvára účty pre cirkvi v Ghane, Nigérii, Keni, Južnej Afrike a Pobreží Slonoviny. [Paystack](https://paystack.com) áno a prijíma miestne karty, **mobilné peniaze** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bankové prevody a USSD. Darcovia platia vo vašej miestnej mene (GHS, NGN, KES, ZAR, XOF).

1. Zaregistrujte sa na [paystack.com](https://paystack.com) s registračným dokladom vašej cirkvi a miestnym bankovým účtom a dokončite aktiváciu Paystack (kontrolu pred spustením).
2. V paneli Paystack otvorte **Settings → API Keys & Webhooks** a skopírujte **Public Key** a **Secret Key** (použite živé kľúče, nie testovacie).
3. V B1 Admin prejdite do **Settings**, otvorte sekciu **Giving** a kliknite na úpravu.
4. Nastavte **Provider** na **Paystack**, vložte Public Key a Secret Key a vyberte svoju **Currency**.
5. Skopírujte **webhook URL** zobrazenú pod poskytovateľom, vráťte sa do panela Paystack (**Settings → API Keys & Webhooks**) a vložte ju do poľa **Webhook URL**. Vďaka tomu sa zaznamenávajú opakované dary a platby mobilnými peniazmi.
6. Uložte.

Darcovia dokončia platbu v zabezpečenom okne Paystack a tam si môžu vybrať kartu, mobilné peniaze alebo bankový prevod. Poznámky:

- **Opakované dary** vyžadujú kartu. Mobilné peniaze sa nedajú automaticky strhávať opakovane, preto Paystack povoľuje iba jednorazové dary cez mobilné peniaze.
- Opakované dary cez Paystack možno z B1 zrušiť, ale nemožno ich pozastaviť ani upravovať. Ak chcete zmeniť sumu, zrušte dar a vytvorte nový.
- Predvolené hodnoty **Processing Fee** zodpovedajú sadzbám Paystack pre miestne karty vo vašej mene. Ak sa vaše dohodnuté sadzby líšia, upravte ich.

## Ďalšie kroky

- Použite [Stripe Import](stripe-import.md) na prenos online transakcií do B1 Admin, ak sa nesynchronizujú automaticky
- Skontrolujte [správy o darovaní](donation-reports.md), aby ste overili, že sa online dary zobrazujú správne
- Vygenerujte [výpisy darov](giving-statements.md), ktoré zahŕňajú online aj offline dary
