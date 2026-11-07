---
title: "Upravljanje oddaj"
---

# Upravljanje oddaj

<div class="article-intro">

Ko bo vaš obrazec aktiven, bodo začele prihajati oddaje. Zavihek **Oddaje obrazca** vam omogoča pregled vseh odgovorov, spremljanje, kdo je oddal obrazec, in uporabo podatkov za pravočasno sledenje članom vaše skupnosti.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- [Ustvarite obrazec](./creating-forms.md) z vsaj enim vprašanjem
- Obrazec delite prek njegovega javnega naslova URL ali ga vdelajte na svojo [spletno stran](../website/managing-pages.md)

</div>

## Ogled oddaj

1. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu aplikacije B1 Admin), razširite **Osebe** in kliknite **Obrazci**.
2. Kliknite obrazec, ki ga želite pregledati.
3. Pojdite na zavihek **Oddaje obrazca**.

Prikazan bo seznam vseh odgovorov, prejetih za ta obrazec. Vsaka oddaja prikazuje podatke odgovorne osebe in datum oddaje, sledi pa ji po en stolpec za vsako vprašanje na obrazcu. Če ima vaš obrazec veliko vprašanj, se tabele pomaknite vodoravno, da si ogledate preostale stolpce.

## Pregled posameznih oddaj

Kliknite katerokoli oddajo, če si želite ogledati celotne podrobnosti. Prikazani bodo vsi odgovori, ki jih je oseba podala na vsako vprašanje obrazca.

Kliknite ikono **tiskalnika** poleg oddaje, če želite natisniti izpolnjene odgovore te osebe. To je uporabno za papirno dokumentacijo ali podpisano soglasje, ki ga morate hraniti. Na natisu je na vrhu na sredini prikazano logotipi vaše cerkve (**logotip za svetlo ozadje** iz [Spletna stran > Videz](../website/appearance.md), če ste ga naložili), pod njim pa ime vaše cerkve. Natisi vedno uporabljajo temno besedilo na beli strani, tudi če v aplikaciji B1 Admin uporabljate temni način. To je ločeno od [tiskanja praznega obrazca](./creating-forms.md#printing-a-blank-form); natisne se odgovore ene osebe, ki je že oddala obrazec, ne pa praznega izvoda. Ikona tiskalnika se pojavi povsod, kjer je prikazana oddaja, tudi na [profilu osebe](../people/adding-people.md#working-with-forms).

## Sprememba osebe pri oddaji

Če je oddaja povezana z napačno osebo – na primer, če si dva družinska člana delita e-poštni naslov – jo lahko premaknete k pravilni osebi ali pa povezavo prekinete.

1. Na zavihku **Oddaje obrazca** kliknite ikono **Spremeni osebo** (dve puščici) poleg imena osebe. Ista ikona je prikazana tudi poleg oddaje na [profilu osebe](../people/adding-people.md#working-with-forms).
2. V pogovornem oknu **Spremeni osebo** poiščite pravilno osebo in kliknite **Premakni k tej osebi**.
3. Lahko pa kliknete **Prekini povezavo (Anonimno)**, s čimer oddajo ločite od katerekoli osebe. Nato bo prikazana kot **Anonimno**.

Spremeni se samo povezava. Odgovori ostanejo enaki, sporočila e-pošte pa se ne pošljejo znova.

:::info
Pri obrazcih, ki ustvarijo zapis osebe, se ob oddaji, ko je oseba prijavljena na spletno stran vaše cerkve, oddaja poveže z njenim lastnim zapisom, tudi če ima kdo drug v vaši bazi podatkov enak e-poštni naslov. Ko [združite dva zapisa oseb](../people/adding-people.md), se oddaje obrazcev odstranjene osebe premaknejo k osebi, ki jo obdržite.
:::

## Kako se oddaje zbirajo

Oddaje lahko prihajajo po več poteh:

- **Javni naslov URL** -- Če ima vaš obrazec javni naslov URL (samostojni obrazci), lahko kdorkoli s povezavo odda odgovor. Naslov delite prek e-pošte, družbenih omrežij ali sporočil SMS.
- **Vdelano na vaši spletni strani** -- Obrazci, vdelani na vašo spletno stran B1, zbirajo oddaje samodejno, ko jih obiskovalci izpolnijo.
- **Notranja uporaba** -- Osebje in prostovoljci lahko obrazce oddajajo tudi v imenu drugih neposredno v aplikaciji B1 Admin.

:::tip
Redno preverjajte zavihek **Oddaje obrazca** za obrazce, kot so kartice obiskovalcev ali prošnje za molitev, da lahko hitro ukrepate.
:::

## Uporaba podatkov oddaj

Podatki, zbrani prek obrazcev, vam lahko pomagajo:

- spremljati prijave na dogodke in temu primerno načrtovati
- sledenje obiskovalcem ali novim članom
- zbiranje povratnih informacij iz anket za načrtovanje služenja
- obdelava plačil za dogodke ali programe

:::info
Člani obrazca z vlogama **Admin** ali **Samo ogled** lahko dostopajo do zavihka **Oddaje obrazca**. Poskrbite, da imajo pravi člani vaše ekipe dostop do obrazcev, ki jih potrebujejo, tako da upravljate vloge na zavihku **Člani obrazca**.
:::

:::info
Če je samostojni obrazec [povezan s skupino](./creating-forms.md#linking-a-form-to-a-group), lahko voditelji te skupineberejo in tiskajo njene oddaje s strani skupine na B1.church, tudi če niso člani obrazca. Voditelji lahko tam tudi berejo odgovore na vprašanja za prijavo na dogodke svoje skupine. Več v razdelku [Podrobnosti skupine](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Če je **samostojni** obrazec nastavljen tako, da ustvari zapis osebe, se vse oddaje, ujemajoče se z obstoječo osebo, prikažejo tudi v razdelku **Obrazci** na strani te osebe v razdelku Osebe – ne samo pri obrazcih tipa Osebe.
:::

## Naslednji koraki

- Naučite se ustvarjati in prilagajati obrazce v [Ustvarjanje obrazcev](./creating-forms.md)
- Dodajte osebe iz oddaj obrazcev v [imenik oseb](../people/adding-people.md) za nadaljnje sledenje
- [Povežite obrazec s skupino](./creating-forms.md#linking-a-form-to-a-group), da njeni voditelji lahko berejo odgovore, ali [samodejno dodajte oddajatelje v skupino](./creating-forms.md#automatically-adding-submitters-to-a-group), da bo samostojni obrazec za prijavo ustvaril lastni seznam članov
