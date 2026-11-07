---
title: "Nastavitev spletnega darovanja"
---

# Nastavitev spletnega darovanja

<div class="article-intro">

B1 Admin se povezuje s **Stripe**, **PayPal**, **Kingdom Funding** in **Paystack** (za cerkve v Afriki), da lahko vaši člani darujejo prek vaše spletne strani B1.church. Ko je nastavitev opravljena, se spletni darovi samodejno prikažejo v vaših evidencah darov skupaj z ročno vnesenimi darovi, zato je vse na enem mestu.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite svoje [sklade za darove](funds.md), da lahko darovalci določijo namen svojih darov
- Ustvarite račun Stripe na [stripe.com](https://stripe.com) in ga aktivirajte (izklopite testni način)
- Pripravite prijavne podatke za B1 Admin

</div>

## Nastavitev Stripe

1. Če še nimate računa, ga ustvarite na [stripe.com](https://stripe.com). Poskrbite, da **aktivirate svoj račun** in izklopite testni način.
2. V Stripe pojdite na **Developers > API Keys** (Razvijalci > API ključi).
3. Kopirajte svoj **Publishable Key** (javni ključ).
4. Prijavite se v [B1 Admin](https://admin.b1.church/).
5. Pojdite na **Settings** (Nastavitve) in odprite razdelek **Giving** (Darovanje).
6. V razdelku **Giving** kliknite **Edit** (Uredi).
7. Nastavite **Provider** (Ponudnik) na **Stripe**.
8. Prilepite svoj javni ključ v polje **Public Key** (Javni ključ).
9. Vrnite se v Stripe in razkrijte svoj **Secret Key** (tajni ključ). Ta ključ lahko vidite samo enkrat, zato ga shranite v varnostno kopijo.
10. Prilepite tajni ključ v polje **Secret Key** (Tajni ključ) in kliknite **Save** (Shrani).

:::warning
Vaš tajni ključ Stripe je prikazan samo enkrat. Preden zapustite nadzorno ploščo Stripe, ga kopirajte na varno mesto. Če ga izgubite, boste morali ustvariti nov ključ.
:::

## Izbira valute

Ko izberete Stripe kot ponudnika, se poleg vaših API ključev prikaže spustni seznam **Currency** (Valuta). Izberite valuto, ki ustreza valuti poravnave vašega računa Stripe, da se darovi pravilno zaračunajo.

Podprte valute so med drugimi USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN in BRL. Privzeto valuto svojega računa lahko preverite ali spremenite na [nadzorni plošči Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
Valuta, ki jo tukaj izberete, se uporablja za enkratne darove, ponavljajoče se naročnine, izračune stroškov in poročila o darovih. Če kasneje zamenjate valuto, bodo novo valuto uporabljali samo novi darovi in naročnine – obstoječi ponavljajoči se darovi se bodo nadaljevali v valuti, v kateri so bili ustvarjeni.
:::

:::warning
Poskrbite, da je vaš račun Stripe nastavljen tako, da sprejema izbrano valuto. Če vaš račun Stripe izbrane valute ne podpira, bodo darovi pri plačilu neuspešni.
:::

## Apple Pay in Google Pay

Cerkve, ki uporabljajo Stripe, samodejno dobijo gumba Apple Pay in Google Pay na javni strani za darovanje. Gumba se prikažeta nad polji za kartico pri enkratnih darovih, ko darovalec izbere sklad in znesek, in samo tedaj, ko ima darovalčev brskalnik ali naprava nastavljeno denarnico. Ponavljajoči se darovi še vedno uporabljajo polja za kartico ali bančni račun.

Google Pay ne zahteva nobene nastavitve. Apple Pay zahteva, da je domena vaše strani za darovanje registrirana pri Stripe; B1 jo registrira ob prvem nalaganju strani za darovanje na vaši domeni. Če se gumb Apple Pay ne prikaže na iPhonu, v nadzorni plošči Stripe preverite **Settings > Payment method domains** (Nastavitve > Domene za načine plačila) in potrdite, da je vaša domena `vaspodpomena.b1.church` (ali lastna domena) navedena in preverjena.

## Anonimni darovi

Darovalci na javni strani za darovanje lahko označijo **Give anonymously** (Daruj anonimno). Anonimni dar se zabeleži brez povezave z darovalcem, še vedno gre v sklad, ki ga je izbral darovalec, in se v vaših serijah in poročilih prikaže kot **Anonymous** (Anonimno). E-poštni naslov darovalca je še vedno potreben, da se lahko pošlje potrdilo, vendar se ne ustvari zapis osebe. Anonimni darovi so samo enkratni in se ne pojavijo na nobenem izpisku darov.

## Neuspeli ponavljajoči se darovi

Ko ponavljajoči se dar prek Stripe ne uspe (na primer zaradi poteklega ali zavrnjenega kartice), se neuspešno plačilo prikaže pod **Donations > Failed Gifts** (Darovi > Neuspeli darovi) z darovalcem, zneskom, datumom in razlogom, ki ga je sporočil ponudnik plačil. Kliknite **Retry** (Ponovi), da poskusite plačilo znova, ko darovalec posodobi svoj način plačila.

B1 darovalcu pošlje tudi e-poštno sporočilo, ko plačilo ne uspe, ter ponovno tri in sedem dni pozneje, če plačilo še vedno ni uspelo, s povezavo za posodobitev načina plačila na B1.church.

:::info
Če je vaša cerkev Stripe nastavila pred uvedbo te funkcije, odprite **Settings** > **Giving** (Nastavitve > Darovanje), kliknite urejanje in enkrat kliknite **Save** (Shrani). S tem se osveži spletni kavelj (webhook) Stripe, tako da se neuspeli plačila prijavljajo v B1.
:::

## Dodajanje strani za darovanje na vašo spletno stran B1.church

1. Pojdite na [b1.church](https://b1.church/) in se prijavite.
2. Kliknite ikono **Settings** (Nastavitve).
3. Kliknite **Add Tab** (Dodaj zavihek).
4. Kot vrsto izberite **Donation** (Darovanje).
5. Vnesite ime zavihka (npr. „Daruj“) in kliknite **Save** (Shrani).
6. Po želji spremenite ikono zavihka – v iskanju ikon vnesite „Dar“ in poiščite ikono, povezano z darovanjem.

Vaša stran za darovanje je zdaj objavljena. Člani jo lahko obiščejo na naslovu `vaspodpomena.b1.church/donate`.

## Deljenje vaše povezave za darovanje

Svojo povezavo za darovanje najdete tako, da pojdete na **B1 Admin** in kliknete ikono **Settings** (Nastavitve), kjer je prikazana vaša poddomena. Povezava za darovanje ima obliko:

`https://vaspodpomena.b1.church/donate`

To povezavo delite na svoji spletni strani, v e-poštnih sporočilih ali v biltenu, da bodo člani vedeli, kje lahko darujejo na spletu.

### Povezave z vnaprej izbranim skladom in zneskom

Če želite darovalce neposredno usmeriti na določen sklad, pojdite na **Donations > Funds** (Darovi > Skladi) in kliknite **Giving Link** (Povezava za darovanje) pri skladu. Po želji vnesite znesek in nato kopirajte povezavo. Pogovorno okno prikazuje tudi kodo QR za isto povezavo; kliknite **Download PNG** (Prenesi PNG), da jo shranite za bilten, diapozitiv ali plakat. Ko darovalec odpre povezavo ali optično prebere kodo, sta sklad in znesek na strani za darovanje že izbrana. Povezava je v obliki:

`https://vaspodpomena.b1.church/donate?fundId=FUND_ID&amount=25`

Enaki parametri delujejo tudi v elementu **Donate Link** (Povezava za darovanje) v graditelju spletnih strani.

## Obvestila o darovih

Stripe ob vsakem prejetem daru pošlje e-poštno obvestilo. Če želite spremeniti e-poštni naslov za obvestila, pojdite na nadzorno ploščo Stripe, kliknite svoj profil v zgornjem desnem kotu, izberite **Profile** (Profil) in posodobite svoj e-poštni naslov.

## Možnosti za kritje stroškov obdelave

Svojo stran za darovanje lahko nastavite tako, da darovalcem omogoči, da po želji krijejo stroške obdelave, da vaša cerkev prejme celoten znesek daru. To nastavitev upravljate v nastavitvah cerkve znotraj B1 Admin.

:::tip
Po nastavitvi opravite majhen testni dar, da preverite, ali vse deluje, preden spletno darovanje napovete svoji skupnosti.
:::

## Nastavitev Kingdom Funding

Kingdom Funding je krščanski ponudnik plačilnih storitev, ki podpira kreditne/debetne kartice in plačila z ACH bančnim nakazilom. Če je vaša cerkev vključena v Kingdom Funding, ga lahko povežete kot svoj prehod za darovanje.

:::info
Vključitev Kingdom Funding je trenutno v beta različici. Za omogočitev za vašo cerkev se obrnite na predstavnika računa B1.
:::

1. Registrirajte se ali se prijavite na [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. V portalu trgovca Kingdom Funding pridobite svoj **Security Key** (varnostni ključ) (javni) in **Private Key** (zasebni ključ).
3. V B1 Admin pojdite na **Settings** (Nastavitve), odprite razdelek **Giving** (Darovanje) in kliknite urejanje.
4. Nastavite **Provider** (Ponudnik) na **Kingdom Funding**.
5. Prilepite varnostni ključ v polje **Security Key** (Varnostni ključ) in zasebni ključ v polje **Private Key** (Zasebni ključ).
6. Nastavite **Webhook Key** (Ključ spletnega kavlja), ki ste ga prejeli od Kingdom Funding, in prikazani naslov spletnega kavlja kopirajte v nastavitve trgovca pri Kingdom Funding, da lahko Kingdom Funding obvesti B1 o zaključenih transakcijah.
7. Shranite.

Ko je povezava vzpostavljena, bodo člani na strani za darovanje videli preklop med kartico in bančnim računom ter lahko darujejo s kreditno kartico ali prek ACH bančnega nakazila.

## Gumba PayPal in Venmo

Cerkve, ki kot ponudnika uporabljajo **PayPal**, imajo na strani za darovanje nad polji za kartico gumba **PayPal** in **Venmo** za enkratne darove. Darovalci, ki kliknejo enega od gumbov, dokončajo plačilo v oknu PayPal, dar pa se zabeleži enako kot vsak drug spletni dar. Venmo se prikaže samo darovalcem v Združenih državah na napravah, ki jih PayPal šteje za primerne. Ponavljajoči se darovi še vedno uporabljajo polja za kartico.

## Nastavitev Paystack (Afrika)

Stripe ne odpira računov za cerkve v Gani, Nigeriji, Keniji, Južnoafriški republiki in Obali Slonokoščene. [Paystack](https://paystack.com) jih odpira in sprejema lokalne kartice, **mobilni denar** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bančna nakazila in USSD. Darovalci plačujejo v vaši lokalni valuti (GHS, NGN, KES, ZAR, XOF).

1. Registrirajte se na [paystack.com](https://paystack.com) s potrdilom o registraciji vaše cerkve in lokalnim bančnim računom ter dokončajte Paystackov postopek aktivacije (pregled za začetek delovanja).
2. V nadzorni plošči Paystack odprite **Settings → API Keys & Webhooks** (Nastavitve → API ključi in spletni kavlji) ter kopirajte **Public Key** (javni ključ) in **Secret Key** (tajni ključ) (uporabite žive ključe, ne testnih).
3. V B1 Admin pojdite na **Settings** (Nastavitve), odprite razdelek **Giving** (Darovanje) in kliknite urejanje.
4. Nastavite **Provider** (Ponudnik) na **Paystack**, prilepite javni in tajni ključ ter izberite svojo **Currency** (Valuta).
5. Kopirajte **webhook URL** (naslov spletnega kavlja), prikazan pod ponudnikom, se vrnite v nadzorno ploščo Paystack (**Settings → API Keys & Webhooks**) in ga prilepite v polje **Webhook URL** (Naslov spletnega kavlja). Tako se beležijo ponavljajoči se darovi in plačila z mobilnim denarjem.
6. Shranite.

Darovalci dokončajo plačilo v varnem oknu Paystack in tam lahko izberejo kartico, mobilni denar ali bančno nakazilo. Opombe:

- **Ponavljajoči se darovi** zahtevajo kartico; mobilnega denarja ni mogoče samodejno zaračunati znova, zato Paystack dovoljuje samo enkratne darove z mobilnim denarjem.
- Ponavljajoče se darove Paystack lahko prekličete v B1, vendar jih ni mogoče začasno ustaviti ali urediti – za spremembo zneska jih prekličite in ustvarite novega.
- Privzete **Processing Fee** (Stroški obdelave) odražajo lokalne stopnje Paystack za kartice v vaši valuti; če se vaše dogovorjene stopnje razlikujejo, jih uredite.

## Naslednji koraki

- Uporabite [Stripe Import](stripe-import.md), da v B1 Admin prenesete spletne transakcije, če se ne sinhronizirajo samodejno
- Preverite svoja [poročila o darovih](donation-reports.md), da potrdite, ali se spletni darovi pravilno prikazujejo
- Ustvarite [izpiske darov](giving-statements.md), ki vključujejo tako spletne kot offline darove
