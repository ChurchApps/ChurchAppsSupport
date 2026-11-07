---
title: "Internetinių aukų nustatymas"
---

# Internetinių aukų nustatymas

<div class="article-intro">

B1 Admin integruojasi su **Stripe**, **PayPal**, **Kingdom Funding** ir **Paystack** (bažnyčioms Afrikoje), todėl jūsų nariai gali aukoti internetu per savo B1.church svetainę. Įsikonfigūravus, internetinės aukos automatiškai atsiranda jūsų aukų įraše kartu su rankiniu būdu įvestomis aukomis, todėl viskas laikoma vienoje sistemoje.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nustatykite [aukų fondus](funds.md), kad aukotojai galėtų nurodyti, kam skiria savo aukas
- Sukurkite Stripe paskyrą adresu [stripe.com](https://stripe.com) ir ją aktyvuokite (išjunkite testavimo režimą)
- Turėkite paruoštus savo B1 Admin prisijungimo duomenis

</div>

## Stripe nustatymas

1. Jei dar neturite paskyros, sukurkite ją adresu [stripe.com](https://stripe.com). Įsitikinkite, kad **aktyvuojate savo paskyrą** ir išjungiate testavimo režimą.
2. Stripe sistemoje eikite į **Developers > API Keys**.
3. Nukopijuokite savo **Publishable Key**.
4. Prisijunkite prie [B1 Admin](https://admin.b1.church/).
5. Eikite į **Settings** ir atidarykite skyrių **Giving**.
6. Skyriuje **Giving** spustelėkite **Edit**.
7. Nustatykite **Provider** į **Stripe**.
8. Įklijuokite savo Publishable Key į lauką **Public Key**.
9. Grįžkite į Stripe ir atskleiskite savo **Secret Key** (jį galima pamatyti tik vieną kartą, todėl išsisaugokite atsarginę kopiją).
10. Įklijuokite Secret Key į lauką **Secret Key** ir spustelėkite **Save**.

:::warning
Jūsų Stripe Secret Key rodomas tik vieną kartą. Prieš išeidami iš Stripe valdymo skydelio, nukopijuokite jį į saugią vietą. Jei jį prarasite, turėsite sugeneruoti naują raktą.
:::

## Valiutos pasirinkimas

Pasirinkus Stripe kaip teikėją, šalia API raktų atsiranda išskleidžiamasis sąrašas **Currency**. Pasirinkite valiutą, kuri atitinka jūsų Stripe paskyros atsiskaitymo valiutą, kad aukos būtų tinkamai nurašomos.

Palaikomos valiutos: USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN ir BRL. Savo paskyros numatytąją valiutą galite patikrinti arba pakeisti [Stripe valdymo skydelyje](https://dashboard.stripe.com/settings/currencies).

:::info
Čia pasirinkta valiuta naudojama vienkartinėms aukoms, pasikartojančioms prenumeratoms, mokesčių skaičiavimui ir aukų ataskaitoms. Jei vėliau pakeisite valiutą, naujos valiutos bus naudojamos tik naujoms aukoms ir prenumeratoms, o esamos pasikartojančios aukos ir toliau bus mokamos ta valiuta, kuria buvo sukurtos.
:::

:::warning
Įsitikinkite, kad jūsų Stripe paskyra sukonfigūruota priimti pasirinktą valiutą. Jei Stripe paskyra nepalaiko pasirinktos valiutos, aukos atsiskaitymo metu nepavyks.
:::

## Apple Pay ir Google Pay

Bažnyčioms, naudojančioms Stripe, viešame aukojimo puslapyje automatiškai rodomi Apple Pay ir Google Pay mygtukai. Vienkartinėms aukoms mygtukai atsiranda virš kortelės laukų, kai aukotojas pasirenka fondą ir sumą, ir tik tuo atveju, jei aukotojo naršyklėje ar įrenginyje nustatyta piniginė. Pasikartojančioms aukoms vis dar naudojami kortelės ar banko laukai.

Google Pay papildomai nustatyti nereikia. Apple Pay reikalauja, kad jūsų aukojimo puslapio domenas būtų užregistruotas Stripe; B1 jį registruoja, kai aukojimo puslapis pirmą kartą įkeliamas jūsų domene. Jei Apple Pay mygtukas nerodomas iPhone telefone, patikrinkite Stripe valdymo skydelyje skiltį **Settings > Payment method domains** ir įsitikinkite, kad jūsų `yoursubdomain.b1.church` (ar pasirinktinis) domenas yra įtrauktas ir patvirtintas.

## Anoniminės aukos

Aukotojai viešame aukojimo puslapyje gali pažymėti **Give anonymously**. Anoniminė auka įrašoma be jokio aukotojo, vis tiek skiriama fondui, kurį pasirinko aukotojas, ir jūsų paketuose bei ataskaitose rodoma kaip **Anonymous**. Aukotojo el. paštas vis tiek reikalingas, kad būtų galima išsiųsti kvitą, tačiau asmens įrašas nesukuriamas. Anoniminės aukos galimos tik vienkartinės ir nepatenka į jokias aukų išrašus.

## Nepavykusios pasikartojančios aukos

Kai pasikartojanti auka per Stripe nepavyksta (pavyzdžiui, dėl pasibaigusios ar atmestos kortelės), nepavykusi operacija rodoma **Donations > Failed Gifts** skiltyje su aukotoju, suma, data ir šliuzo pateikta priežastimi. Spustelėkite **Retry**, kad bandytumėte nurašyti sumą dar kartą, kai aukotojas atnaujins savo mokėjimo būdą.

B1 taip pat išsiunčia aukotojui el. laišką, kai nurašymas nepavyksta, o jei jis vis dar nepraeina, dar praėjus trims ir septynioms dienoms, su nuoroda atnaujinti mokėjimo būdą B1.church svetainėje.

:::info
Jei jūsų bažnyčia nustatė Stripe anksčiau, nei atsirado ši funkcija, atidarykite **Settings** > **Giving**, spustelėkite redagavimą ir vieną kartą spustelėkite **Save**. Tai atnaujins Stripe webhook, kad nepavykę nurašymai būtų perduodami B1.
:::

## Aukojimo puslapio pridėjimas prie jūsų B1.church svetainės

1. Eikite į [b1.church](https://b1.church/) ir prisijunkite.
2. Spustelėkite **Settings** piktogramą.
3. Spustelėkite **Add Tab**.
4. Kaip tipą pasirinkite **Donation**.
5. Įveskite skirtuko pavadinimą (pvz., „Aukos“) ir spustelėkite **Save**.
6. Jei norite, pakeiskite skirtuko piktogramą – piktogramų paieškoje įveskite „Giv“ ir pasirinkite su aukojimu susijusią piktogramą.

Jūsų aukojimo puslapis dabar veikia. Nariai jį gali aplankyti adresu `yoursubdomain.b1.church/donate`.

## Aukojimo nuorodos bendrinimas

Norėdami rasti savo aukojimo URL, eikite į **B1 Admin** ir spustelėkite **Settings** piktogramą, kad pamatytumėte savo subdomeną. Jūsų aukojimo nuoroda turi tokį formatą:

`https://yoursubdomain.b1.church/donate`

Bendrinkite šią nuorodą savo svetainėje, el. laiškuose ar biuletenyje, kad nariai žinotų, kur galės aukoti internetu.

### Nuorodos su iš anksto nustatytu fondu ir suma

Norėdami nukreipti aukotojus tiesiai į konkretų fondą, eikite į **Donations > Funds** ir fondo eilutėje spustelėkite **Giving Link**. Jei norite, įveskite sumą, tada nukopijuokite nuorodą. Dialogo lange taip pat rodomas QR kodas tai pačiai nuorodai; spustelėkite **Download PNG**, kad jį išsaugotumėte biuletenyje, skaidrėje ar plakate. Kai aukotojas atidaro nuorodą arba nuskaito kodą, aukojimo puslapyje jau būna pasirinktas fondas ir suma. Nuoroda turi tokią formą:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Tie patys parametrai veikia ir svetainės kūrėjo **Donate Link** elemente.

## Aukų pranešimai

Stripe kiekvieną kartą gavus auką siunčia el. laišką su pranešimu. Norėdami pakeisti pranešimų el. pašto adresą, eikite į Stripe valdymo skydelį, viršutiniame dešiniajame kampe spustelėkite savo profilį, pasirinkite **Profile** ir atnaujinkite el. pašto adresą.

## Mokesčių už apdorojimą parinktys

Galite sukonfigūruoti aukojimo puslapį taip, kad aukotojai galėtų neprivalomai padengti apdorojimo mokesčius, todėl bažnyčia gautų visą aukos sumą. Šis nustatymas valdomas jūsų bažnyčios nustatymuose B1 Admin sistemoje.

:::tip
Atlikę nustatymus, prieš paskelbdami apie internetines aukas bendruomenei, atlikite nedidelę bandomąją auką, kad įsitikintumėte, jog viskas veikia.
:::

## Kingdom Funding nustatymas

Kingdom Funding yra krikščioniškas mokėjimų apdorojimo teikėjas, palaikantis kredito ir debeto korteles bei ACH banko pavedimus. Jei jūsų bažnyčia yra užsiregistravusi Kingdom Funding, galite ją prijungti kaip aukų mokėjimo šliuzą.

:::info
Kingdom Funding integracija šiuo metu yra beta versijoje. Susisiekite su savo B1 paskyros atstovu, kad ją įjungtų jūsų bažnyčiai.
:::

1. Užsiregistruokite arba prisijunkite adresu [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Iš Kingdom Funding prekybininko portalo gaukite savo **Security Key** (viešąjį) ir **Private Key**.
3. B1 Admin sistemoje eikite į **Settings**, atidarykite skyrių **Giving** ir spustelėkite redagavimą.
4. Nustatykite **Provider** į **Kingdom Funding**.
5. Įklijuokite Security Key į lauką **Security Key**, o Private Key – į lauką **Private Key**.
6. Nustatykite **Webhook Key**, kurį gavote iš Kingdom Funding, ir nukopijuokite rodomą webhook URL į savo Kingdom Funding prekybininko nustatymus, kad Kingdom Funding galėtų pranešti B1 apie užbaigtas operacijas.
7. Išsaugokite.

Prisijungus nariai aukojimo puslapyje matys kortelės / banko jungiklį ir galės aukoti kredito kortele arba ACH pavedimu.

## PayPal ir Venmo mygtukai

Bažnyčioms, naudojančioms **PayPal** kaip teikėją, aukojimo puslapyje virš kortelės laukų vienkartinėms aukoms rodomi **PayPal** ir **Venmo** mygtukai. Aukotojai, paspaudę vieną iš jų, užbaigia mokėjimą PayPal lange, o auka įrašoma kaip ir bet kuri kita internetinė auka. Venmo rodomas tik JAV aukotojams įrenginiuose, kuriuos PayPal laiko tinkamais. Pasikartojančioms aukoms vis dar naudojami kortelės laukai.

## Paystack nustatymas (Afrika)

Stripe neatidaro paskyrų bažnyčioms Gane, Nigerijoje, Kenijoje, Pietų Afrikoje ir Dramblio Kaulo Krante. [Paystack](https://paystack.com) jas atidaro ir priima vietines korteles, **mobiliuosius pinigus** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banko pavedimus ir USSD – aukotojai moka jūsų vietine valiuta (GHS, NGN, KES, ZAR, XOF).

1. Užsiregistruokite adresu [paystack.com](https://paystack.com), pateikdami savo bažnyčios verslo registracijos pažymėjimą ir vietinę banko sąskaitą, ir užbaikite Paystack aktyvavimo (paleidimo) patikrinimą.
2. Paystack valdymo skydelyje atidarykite **Settings → API Keys & Webhooks** ir nukopijuokite **Public Key** bei **Secret Key** (naudokite tikruosius, o ne testavimo raktus).
3. B1 Admin sistemoje eikite į **Settings**, atidarykite skyrių **Giving** ir spustelėkite redagavimą.
4. Nustatykite **Provider** į **Paystack**, įklijuokite Public Key ir Secret Key ir pasirinkite savo **Currency**.
5. Nukopijuokite teikėjo pavadinimo lauke rodomą **webhook URL**, grįžkite į Paystack valdymo skydelį (**Settings → API Keys & Webhooks**) ir įklijuokite jį į lauką **Webhook URL**. Taip pasikartojančios aukos ir mobiliųjų pinigų mokėjimai bus įrašomi.
6. Išsaugokite.

Aukotojai mokėjimą atlieka saugiame Paystack lange ir ten gali pasirinkti kortelę, mobiliuosius pinigus arba banko pavedimą. Pastabos:

- **Pasikartojančioms aukoms** reikalinga kortelė; mobiliųjų pinigų negalima nurašyti automatiškai, todėl Paystack leidžia tik vienkartines mobiliųjų pinigų aukas.
- Paystack pasikartojančias aukas galima atšaukti iš B1, tačiau negalima jų sustabdyti ar redaguoti – norint pakeisti sumą, reikia atšaukti ir sukurti naują.
- **Mokesčio už apdorojimą** numatytosios reikšmės atitinka Paystack vietinių kortelių tarifus jūsų valiutai; jei jūsų sutartyje numatyti kiti tarifai, redaguokite juos.

## Kiti žingsniai

- Naudokite [Stripe importą](stripe-import.md), kad į B1 Admin įkeltumėte internetines operacijas, jei jos automatiškai nesinchronizuojamos
- Patikrinkite [aukų ataskaitas](donation-reports.md), kad įsitikintumėte, jog internetinės aukos rodomos teisingai
- Sukurkite [aukų išrašus](giving-statements.md), į kuriuos įtrauktos ir internetinės, ir neinternetinės aukos
