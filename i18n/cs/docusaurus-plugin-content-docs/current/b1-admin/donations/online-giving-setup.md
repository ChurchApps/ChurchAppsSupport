---
title: "Nastavení online darování"
description: "Připojte Stripe, PayPal, Kingdom Funding nebo Paystack k B1 Admin, aby členové mohli darovat online přes web B1.church a dary se synchronizovaly."
---

# Nastavení online darování

<div class="article-intro">

B1 Admin se propojuje se službami **Stripe**, **PayPal**, **Kingdom Funding** a **Paystack** (pro církve v Africe), takže vaši členové mohou darovat online prostřednictvím vašeho webu B1.church. Po nastavení se online dary automaticky zobrazí ve vašich záznamech darů spolu s ručně zadanými dary, takže vše zůstane v jednom systému.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte své [fondy darů](funds.md), aby dárci mohli určit, na co své dary použijí
- Vytvořte si účet na [stripe.com](https://stripe.com) a aktivujte jej (vypněte testovací režim)
- Připravte si přihlašovací údaje do B1 Admin

</div>

## Nastavení Stripe

1. Pokud ještě nemáte účet, vytvořte si jej na [stripe.com](https://stripe.com). Ujistěte se, že **aktivujete svůj účet** a vypnete testovací režim.
2. Ve Stripe přejděte do **Developers > API Keys**.
3. Zkopírujte svůj **Publishable Key** (veřejný klíč).
4. Přihlaste se do [B1 Admin](https://admin.b1.church/).
5. Přejděte do **Settings** a otevřete sekci **Giving**.
6. Klikněte na **Edit** u sekce **Giving**.
7. Nastavte **Provider** na **Stripe**.
8. Vložte svůj Publishable Key do pole **Public Key**.
9. Vraťte se do Stripe a zobrazte svůj **Secret Key** (tajný klíč). Zobrazit jej lze pouze jednou, proto si jej uložte do zálohy.
10. Vložte Secret Key do pole **Secret Key** a klikněte na **Save**.

:::warning
Váš tajný klíč Stripe se zobrazí pouze jednou. Než opustíte řídicí panel Stripe, zkopírujte si jej na bezpečné místo. Pokud jej ztratíte, budete muset vygenerovat nový klíč.
:::

## Výběr měny

Po výběru Stripe jako poskytovatele se vedle vašich API klíčů zobrazí rozbalovací seznam **Currency** (měna). Vyberte měnu, která odpovídá měně vyúčtování vašeho účtu Stripe, aby se dary správně strhávaly.

Mezi podporované měny patří USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN a BRL. Výchozí měnu svého účtu můžete ověřit nebo změnit ve [svém řídicím panelu Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
Měna, kterou zde vyberete, se používá pro jednorázové dary, pravidelné předplatné, výpočty poplatků a výkazy darů. Pokud měnu později změníte, novou měnu budou používat pouze nové dary a předplatné. Stávající pravidelné dary zůstanou v měně, ve které byly vytvořeny.
:::

:::warning
Ujistěte se, že je váš účet Stripe nastaven tak, aby přijímal zvolenou měnu. Pokud váš účet Stripe zvolenou měnu nepodporuje, dary při platbě selžou.
:::

## Apple Pay a Google Pay

Církve používající Stripe automaticky získají tlačítka Apple Pay a Google Pay na veřejné stránce pro dary. Tlačítka se zobrazují nad platebními poli karty pro jednorázové dary, jakmile dárce zvolí fond a částku, a pouze tehdy, pokud má jeho prohlížeč nebo zařízení nastavenou peněženku. Pravidelné dary stále používají pole pro kartu nebo bankovní účet.

Google Pay nevyžaduje žádné nastavení. Apple Pay vyžaduje, aby byla doména vaší stránky pro dary registrována u Stripe. B1 ji zaregistruje při prvním načtení stránky pro dary na vaší doméně. Pokud se tlačítko Apple Pay na iPhonu nezobrazuje, zkontrolujte v řídicím panelu Stripe položku **Settings > Payment method domains** a ověřte, že je vaše doména `vaspodd.b1.church` (nebo vlastní doména) uvedena a ověřena.

## Anonymní dary

Dárci na veřejné stránce pro dary mohou zaškrtnout možnost **Give anonymously** (darovat anonymně). Anonymní dar se zaznamená bez přiřazení dárce, stále směřuje do fondu, který dárce zvolil, a ve vašich dávkách a výkazech se zobrazí jako **Anonymous**. E-mail dárce je stále vyžadován, aby mohla být odeslána potvrzení, ale nevytváří se žádný záznam osoby. Anonymní dary jsou pouze jednorázové a neobjevují se v žádném výpisu darů.

## Neúspěšné pravidelné dary

Pokud pravidelný dar přes Stripe selže (například kvůli vypršené nebo zamítnuté kartě), neúspěšná platba se zobrazí v sekci **Donations > Failed Gifts** spolu s dárcem, částkou, datem a důvodem, který uvedla platební brána. Jakmile dárce aktualizuje svůj způsob platby, klikněte na **Retry** a platbu znovu vyzkoušejte.

B1 také pošle dárci e-mail, když platba selže, a znovu o tři a sedm dní později, pokud platba stále neprošla. E-mail obsahuje odkaz na aktualizaci způsobu platby na B1.church.

:::info
Pokud vaše církev nastavila Stripe dříve, než tato funkce existovala, otevřete **Settings** > **Giving**, klikněte na úpravu a jednou klikněte na **Save**. Tím se obnoví webhook Stripe, takže se neúspěšné platby budou hlásit do B1.
:::

## Přidání stránky pro dary na váš web B1.church

1. Přejděte na [b1.church](https://b1.church/) a přihlaste se.
2. Klikněte na ikonu **Settings**.
3. Klikněte na **Add Tab**.
4. Jako typ vyberte **Donation**.
5. Zadejte název záložky (např. „Give“) a klikněte na **Save**.
6. Volitelně změňte ikonu záložky – do vyhledávání ikon zadejte „Giv“ a vyberte ikonu související s darováním.

Vaše stránka pro dary je nyní aktivní. Členové ji mohou navštívit na adrese `vaspodd.b1.church/donate`.

## Sdílení odkazu na dary

Svůj odkaz na dary najdete tak, že přejdete do **B1 Admin** a kliknete na ikonu **Settings**, kde uvidíte svou subdoménu. Odkaz na dary má tvar:

`https://vaspodd.b1.church/donate`

Tento odkaz sdílejte na svém webu, v e-mailech nebo ve svém týdenním zpravodaji, aby členové věděli, kde mohou dávat online.

### Odkazy s předvyplněným fondem a částkou

Chcete-li dárce přesměrovat přímo na konkrétní fond, přejděte do **Donations > Funds** a u fondu klikněte na **Giving Link**. Volitelně zadejte částku a poté odkaz zkopírujte. Dialog také zobrazuje QR kód pro stejný odkaz; kliknutím na **Download PNG** jej uložíte pro použití v týdenním zpravodaji, na prezentaci nebo plakát. Když dárce odkaz otevře nebo naskenuje kód, jsou na stránce pro dary již vybrány fond a částka. Odkaz má tvar:

`https://vaspodd.b1.church/donate?fundId=FUND_ID&amount=25`

Stejné parametry fungují také v prvku **Donate Link** tvůrce webu.

## Oznámení o darech

Stripe odešle e-mailové oznámení pokaždé, když je přijat dar. Chcete-li změnit e-mailovou adresu pro oznámení, přejděte do řídicího panelu Stripe, klikněte na svůj profil v pravém horním rohu, zvolte **Profile** a aktualizujte svou e-mailovou adresu.

## Možnosti poplatků za zpracování

Stránku pro dary můžete nastavit tak, aby dárcům umožnila volitelně uhradit poplatky za zpracování, takže vaše církev obdrží celou částku daru. Toto nastavení se spravuje v nastavení církve v B1 Admin.

:::tip
Po nastavení proveďte malý zkušební dar, abyste ověřili, že vše funguje, než oznámíte možnost online darování svému sboru.
:::

## Nastavení Kingdom Funding

Kingdom Funding je křesťanský platební procesor, který podporuje kreditní/debetní karty a bankovní převody ACH. Pokud je vaše církev zaregistrována u Kingdom Funding, můžete jej připojit jako svou platební bránu pro dary.

:::info
Integrace Kingdom Funding je v současnosti v beta verzi. Chcete-li ji pro svou církev zapnout, kontaktujte svého zástupce B1 pro účet.
:::

1. Zaregistrujte se nebo se přihlaste na [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Z portálu obchodníka Kingdom Funding získejte svůj **Security Key** (veřejný) a **Private Key** (soukromý klíč).
3. V B1 Admin přejděte do **Settings**, otevřete sekci **Giving** a klikněte na úpravu.
4. Nastavte **Provider** na **Kingdom Funding**.
5. Vložte svůj Security Key do pole **Security Key** a Private Key do pole **Private Key**.
6. Nastavte **Webhook Key**, který jste obdrželi od Kingdom Funding, a zkopírujte zobrazenou adresu webhooku do nastavení svého obchodníka u Kingdom Funding, aby Kingdom Funding mohl B1 oznamovat dokončené transakce.
7. Uložte.

Po připojení uvidí členové na stránce pro dary přepínač karta/banka a mohou dar poslat kreditní kartou nebo bankovním převodem ACH.

## Tlačítka PayPal a Venmo

Církve používající **PayPal** jako svého poskytovatele získají na stránce pro dary nad platebními poli karty tlačítka **PayPal** a **Venmo** pro jednorázové dary. Dárci, kteří na některé z nich klikнou, dokončí platbu v okně PayPal a dar se zaznamená stejně jako každý jiný online dar. Tlačítko Venmo se zobrazuje pouze dárcům ve Spojených státech na zařízeních, která PayPal považuje za způsobilá. Pravidelné dary stále používají pole pro kartu.

## Nastavení Paystack (Afrika)

Stripe neotevírá účty pro církve v Ghaně, Nigérii, Keni, Jihoafrické republice a Pobřeží slonoviny. [Paystack](https://paystack.com) je otevírá a přijímá místní karty, **mobilní peníze** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bankovní převody a USSD – dárci platí v místní měně (GHS, NGN, KES, ZAR, XOF).

1. Zaregistrujte se na [paystack.com](https://paystack.com) s výpisem z obchodního rejstříku vaší církve a místním bankovním účtem a dokončete aktivační (go-live) kontrolu Paystack.
2. V řídicím panelu Paystack otevřete **Settings → API Keys & Webhooks** a zkopírujte **Public Key** a **Secret Key** (použijte živé klíče, nikoli testovací).
3. V B1 Admin přejděte do **Settings**, otevřete sekci **Giving** a klikněte na úpravu.
4. Nastavte **Provider** na **Paystack**, vložte Public Key a Secret Key a zvolte svou **Currency**.
5. Zkopírujte **webhook URL** zobrazenou pod poskytovatelem, vraťte se do řídicího panelu Paystack (**Settings → API Keys & Webhooks**) a vložte ji do pole **Webhook URL**. Tímto způsobem se zaznamenávají pravidelné dary a platby mobilními penězi.
6. Uložte.

Dárci dokončí platbu v zabezpečeném okně Paystack, kde si mohou vybrat kartu, mobilní peníze nebo bankovní převod. Poznámky:

- **Pravidelné dary** vyžadují kartu; platby mobilními penězi nelze automaticky strhávat opakovaně, proto Paystack povoluje pouze jednorázové dary mobilními penězi.
- Pravidelné dary Paystack lze zrušit z B1, ale nelze je pozastavit ani upravit – chcete-li změnit částku, zrušte stávající dar a vytvořte nový.
- Výchozí hodnoty **Processing Fee** odpovídají sazbám Paystack pro místní karty ve vaší měně; pokud se vaše sjednané sazby liší, upravte je.

## Další kroky

- Použijte [Stripe Import](stripe-import.md) k načtení online transakcí do B1 Admin, pokud se nesynchronizují automaticky
- Zkontrolujte [výkazy darů](donation-reports.md), abyste ověřili, že se online dary zobrazují správně
- Vygenerujte [výpisy darů](giving-statements.md), které zahrnují online i offline dary
