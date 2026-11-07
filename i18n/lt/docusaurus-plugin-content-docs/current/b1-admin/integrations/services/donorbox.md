---
title: "Donorbox"
description: "Prijunkite Donorbox prie B1 Admin per Zapier, kad internetinės aukos automatiškai kurtų aukų įrašus ir aukotojų profilius be rankinio eksporto."
---

# Donorbox

<div class="article-intro">

Jei jūsų bažnyčia priima aukas per Donorbox, bet žmones ir išrašus seka B1, galite nustatyti, kad Donorbox momentiniai Zapier trigeriai B1 sistemoje automatiškai kurtų atitinkamus aukų įrašus ir, jei aukotojo dar nėra, sukurtų jį kaip B1 asmenį. Jokio rankinio suderinimo, jokio mėnesinio eksporto.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Donorbox](https://donorbox.org) paskyra su bent viena kampanija
- [Zapier](https://zapier.com) paskyra
- B1Admin naudotojas su **Edit Settings** leidimu

</div>

## Ką galite sujungti

| Kryptis | Donorbox trigeris | B1 veiksmas |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (momentinis) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (pasikartojantis) | Find Person → Add Donation (naudokite plano id kaip pastabą) |

Donorbox savo trigerius skelbia kaip **momentinius**: jie suveikia per kelias sekundes po tikros aukos. Jokio apklausos vėlavimo.

## Sąranka

### 1. Sukurkite B1 API raktą

B1Admin: **Settings → Developer → API Keys → New API Key**. Leidimai (scopes):

- `people:read` — aukotojui rasti pagal el. paštą
- `people:write` — sukurti naują asmenį, jei jis dar nežinomas
- `donations:write` — įrašyti auką

Šios krypties trigeriai priklauso Donorbox, o ne B1, todėl čia `settings:write` nereikia.

### 2. Sukurkite „įrašyti auką“ Zap

1. **Trigeris** — Donorbox: New Donation. Prisijunkite Donorbox API raktu (Donorbox: *Account → Profile → API Settings*).
2. **Veiksmas** — B1.church: Find Person. Susiekite aukotojo el. paštą iš trigerio su *Email* paieškos lauku.
3. **Veiksmas** — Filter by Zapier (neprivaloma): tęsti tik tada, jei aukotojas nerastas, tada…
4. **Veiksmas** — B1.church: Create Person. Susiekite vardą, pavardę ir el. paštą, kad aukotojas būtų įrašytas kaip narys, o ne tik kaip aukos įrašas.
5. **Veiksmas** — B1.church: Add Donation. Susiekite:
   - Suma → `data.amount`
   - Aukos data → trigerio aukos data
   - Fondas → pasirinkite B1 fondą, atitinkantį Donorbox kampaniją (Zapier leidžia keisti fondus pagal filtrą ar Formatter žingsnį)
   - Būdas → „Online“
   - Pastabos → Donorbox transakcijos id (patogu derinant)

Įjunkite Zap. Kita tiesioginė auka per Donorbox automatiškai atsiras **B1Admin → Donations**.

## Dažni variantai

### Vienas Zap kiekvienam fondui

Jei vykdote kelias Donorbox kampanijas, kurios atitinka atskirus B1 fondus, geriausia turėti po vieną Zap kiekvienai kampanijai su Donorbox *campaign* filtru viršuje. Tada fondo atitikimas užkoduotas iš anksto ir paieškos žingsnio nereikia.

### Atnaujintas aukas traktuokite kaip taisymus

Donorbox *New or Updated Donation* suveikia ir redagavus aukas. Naudokite Zapier *Path* žingsnį pagal `event_type`, kad atskirtumėte: „new“ → Add Donation, „updated“ → Find Donation + Update. Pastaba: B1 Zapier programėlėje šiuo metu nėra Update Donation veiksmo, todėl kol kas „updated“ įvykius siųskite į Slack kanalą rankinei peržiūrai.

### Sinchronizuokite pasikartojančių planų pakeitimus su Slack kanalu

- **Trigeris** — Donorbox: New or Updated Plan
- **Veiksmas** — Slack: Send Message į `#donations` (pvz., „Planas pakeistas — Sarah mėnesinė auka dabar yra $200“)

## Apribojimai ir pastabos

- **Sieti aukotojus pagal el. paštą.** Donorbox nesidalija B1 asmens id, todėl vienintelis patikimas ryšio raktas yra el. paštas. Aukotojai, kurie aukoja su kitu el. paštu, sukurs naują B1 asmenį. Mėnesinio suderinimo metu ieškokite tokių atvejų.
- **Grąžinimai atskirai nepateikiami.** Donorbox tam pačiam įrašui siunčia būsenos atnaujinimą. B1 Zapier programėlėje šiuo metu nėra *Update Donation* veiksmo, todėl saugus šiandienos būdas yra registruoti grąžinimo įvykius išorėje ir aukos įrašą koreguoti rankiniu būdu.
- **Pirmiausia išbandykite Donorbox smėlio dėžėje (sandbox)**, kad negautumėte netikrų aukų gyvoje B1 sistemoje. Donorbox teikia testavimo režimo prisijungimo duomenis, atskirus nuo tikrųjų.

## Trikčių šalinimas

- **„Person not found“ įspėjimas kiekvieną kartą**: tai normalu, jei žingsnius sutvarkėte taip, kad *Create Person* veiktų „nerasta“ šakoje. Jei *Create Person* žingsnis niekada nevykdomas, patikrinkite, ar API raktas turi `people:write` leidimą.
- **Aukos suma atrodo 100 kartų per didelė ar per maža**: Donorbox kai kuriuose duomenų variantuose siunčia centus, kituose: dolerius. Prireikus naudokite *Formatter by Zapier — Numbers* žingsnį ir padalinkite iš 100.
- **Dubliuotos aukos iš vienos dovanos**: Donorbox siunčia ir *New Donation*, ir *Updated Donation*. Arba filtruokite pagal `event_type = "donation.succeeded"`, arba sukurkite du Zap su nesutampančiais filtrais.

## Taip pat žr.

- [Zapier (apžvalga)](../zapier.md): B1 pusė kiekvienam Zapier receptui
- [Subsplash](./subsplash.md): kita aukų platforma su Zapier programėle
- [Mailchimp](./mailchimp.md): susiekite „naujos aukos“ įvykį su el. pašto žyma
