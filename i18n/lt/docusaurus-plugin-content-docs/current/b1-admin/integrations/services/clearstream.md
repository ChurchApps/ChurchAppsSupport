---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Įjunkite [Clearstream](https://clearstream.io) tekstinę žinutę iš bet kurio B1 įvykio — naujo asmens, naujos aukos, pateiktos formos, kalendoriaus atnaujinimo — ir grąžinkite atsakymus į B1 įrašus. Clearstream Zapier programėlė palaiko abi kryptis, todėl visas sujungimas yra paruoštas receptas, o ne pasirinktinis kodas.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Clearstream](https://clearstream.io) paskyra su bent vienu sąrašu ir SMS limitu
- [Zapier](https://zapier.com) paskyra
- B1Admin naudotojas su leidimu **Edit Settings**

</div>

## Ką galite sujungti

| Kryptis | Paleidiklis | Veiksmas |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (pvz., pranešti finansų komandai) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (pvz., maldos prašymų komandai) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; pažymėkite žyma raktiniu žodžiu, kurį asmuo parašė |

Clearstream Zapier veiksmai: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Sąranka

### 1. Sukurkite B1 API raktą

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — būtina, kad B1 galėtų registruoti paleidiklio webhook
- `people:read` — reikalinga asmeniui iš įvykio surasti (`personId` → vardas/telefonas/el. paštas)
- (Pasirinktinai) `people:write`, jei Clearstream atsakymai turi kurti B1 kontaktus

### 2. Sukurkite „tekstinė žinutė apie naują auką“ Zap

1. **Paleidiklis** — B1.church: New Donation
2. **Veiksmas** — B1.church: Find Person (aukos `personId`)
3. **Veiksmas** — Clearstream: Send Text to Number. Kaip gavėją naudokite asmens telefoną iš 2 veiksmo ir parašykite žinutę (`"Thanks for your gift, {first}! …"`).

Įjunkite Zap. B1 aktyvavimo metu užregistruoja aukos webhook; **Settings → Developer → Webhooks** turėtumėte matyti `Zapier — donation.created`.

### 3. (Pasirinktinai) Grąžinkite atsakymus į B1 įrašus

1. **Paleidiklis** — Clearstream: New Incoming Text
2. **Veiksmas** — Filter by Zapier pagal raktinį žodį — pvz., tęsti tik tada, jei žinutės tekstas prasideda `PRAY`
3. **Veiksmas** — B1.church: Find Person (pagal telefoną)
4. **Veiksmas** — Filter / Path — jei nerasta, sukurkite asmenį; bet kuriuo atveju įrašykite žinutės tekstą kur nors (Slack, Google Sheet arba B1 formos pateikimą per Webhooks by Zapier).

## Dažni receptai

### Savanorių komandos kvietimas

- **Paleidiklis** — B1.church: New Form Submission (filtruota pagal maldos prašymo formos ID)
- **Veiksmas** — Clearstream: Send Text to List, kur sąrašas yra jūsų budinti ganytojystės komanda. Žinutę parašykite taip: `New prayer request: {data.questions.0.answer}`.

### Pirmą kartą apsilankiusio asmens tęstinis sekimas

- **Paleidiklis** — B1.church: New Person, filtruota pagal B1 asmens žymą „First-time visitor“
- **Veiksmas** — Clearstream: Add Subscriber to Automated Workflow. Susiekite darbo eigos ID su iš anksto paruoštu 7 dienų tekstinių žinučių ciklu.

### Grupės narystė pagal raktinį žodį

- **Paleidiklis** — Clearstream: New Incoming Text (filtruoti pagal raktinį žodį `MENS`)
- **Veiksmas** — B1.church: Find Person (pagal telefoną); jei nerasta → Create Person
- **Veiksmas** — B1.church: Add Group Member į vyrų служения grupę (Men's Ministry)

## Apribojimai ir pastabos

- **Clearstream skaičiuoja SMS pagal žinutes.** Kiekvienas Send Text veiksmas sunaudoja vieną ar daugiau kreditų, priklausomai nuo ilgio ir gavėjų skaičiaus — patikrinkite savo plano limitą.
- **Telefono numeris *Send Text to Number* veiksmui turi būti E.164 formato** (pvz., `+15555550199`). B1 asmens įraše saugomas tas numeris, koks įvestas; jei negalite užtikrinti formato, naudokite *Formatter by Zapier — Numbers → Format Phone Number* žingsnį.
- **B1 pusėje antraštė nereikalinga** — Clearstream autentifikacija visiškai vyksta jo Zapier sujungime.

## Trikčių šalinimas

- **Paleidiklis niekada nesuveikia** — po to, kai Zap įjungtas, `Settings → Developer → Webhooks` turėtų rodyti eilutę `Zapier — <event>`. Jei jos nėra, B1 API raktui trūksta `settings:write`. Sukurkite raktą iš naujo ir prijunkite.
- **Clearstream grąžina „Invalid phone number“** — gavėjo laukas nėra E.164 formatu. Pridėkite Format Phone Number žingsnį.
- **Send Text to List nesėkmingas su `403`** — Clearstream API naudotojas neturi teisės į šį sąrašą arba sąrašo ID neteisingas. Sąrašų ID matomi Clearstream sąrašo puslapyje.

## Taip pat žr.

- [Text In Church](./text-in-church) — alternatyvi SMS platforma, panašus sujungimo principas
- [Mobile Message](./mobile-message) — bažnyčioms ne JAV
- [Zapier (overview)](../zapier) — B1 pusė visiems Zapier receptams
- [Clearstream API docs](https://api-docs.clearstream.io/) — pasirinktinėms integracijoms už Zapier programėlės ribų
