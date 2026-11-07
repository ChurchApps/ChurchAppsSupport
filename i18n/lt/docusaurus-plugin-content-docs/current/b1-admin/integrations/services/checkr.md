---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) teikia fono patikrinimo paslaugas darbuotojams ir savanoriams. Tai beveik visoms bažnyčioms, kurios vykdo vaikų ar jaunimo programas, yra būtina. B1 **neturi įmontuotos fono patikrinimo funkcijos**. Patikrinimų užsakymas, rezultatų sekimas ir atitikties reikalavimų valdymas vyksta Checkr sistemoje. Toliau pateikta instrukcija tik susieja B1 įvykius su Checkr. Checkr neturi Zapier programėlės, tačiau [Make.com Checkr integracija](https://www.make.com/en/integrations/checkr) yra patikrinta ir suteikia veiksmus, kurių reikia patikrinimui pradėti iš B1 įvykio.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Checkr](https://checkr.com) paskyra su API prieiga ir bent vienu sukonfigūruotu patikrinimo paketu
- [Make](https://www.make.com) paskyra
- B1Admin naudotojas su **Edit Settings** leidimu

</div>

## Ką galite susieti

Make Checkr programėlė suteikia 1 paleidiklį ir 6 veiksmus:

| Kryptis | B1 / Make paleidiklis | Veiksmas |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtruojama pagal savanorių grupę) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (kvietimo / ataskaitos įvykis) | B1: Atnaujinti asmens įrašą (pvz., pažymėti žymą „Checkr patvirtintas“) |

Make Checkr veiksmai: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA ir Get an Invitation. Be to, yra 4 paieškos moduliai.

## Sąranka

### 1. Sukurkite B1 API raktą

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: paleidiklio webhook'ui
- `people:read`: asmens vardui ir el. pašto adresui surasti, kai pradedamas patikrinimas
- (Neprivaloma) `people:write`, jei norite grąžinti ataskaitos statusą kaip papildomą lauką ar žymą

### 2. Sukurkite scenarijų „Pradėti patikrinimą registruojantis savanoriu“ Make sistemoje

1. **Paleidiklis**: B1.church: Watch Events (`group.member.added`).
2. **Filtras**: tęsti tik tada, jei `data.groupId` atitinka jūsų grupę „Vaikų savanoriai“ (ar panašią).
3. **Veiksmas**: B1.church: Find Person (pagal `data.personId`), kad gautumėte el. paštą ir vardą bei pavardę.
4. **Veiksmas**: Checkr: Create Candidate. Susiekite vardą, pavardę ir el. paštą iš 3 žingsnio.
5. **Veiksmas**: Checkr: Create Background Check Invitation. Susiekite naujo kandidato ID iš 4 žingsnio su lauku *candidate_id*. Pasirinkite patikrinimo paketą (pvz., `tasker_standard` arba kokį jūsų paskyra siūlo).
6. (Neprivaloma) **Veiksmas**: Slack: informuoti jūsų saugios tarnystės koordinatorių, kad patikrinimas pradėtas.

Įjunkite scenarijų. Nauji savanoriai tikslinėje grupėje automatiškai gaus Checkr kvietimą el. paštu. Jie jį užpildo telefone ar kompiuteryje, o Checkr atlieka patikrinimą.

### 3. (Neprivaloma) Gaukite ataskaitą atgal

1. **Paleidiklis**: Checkr: Watch Events (webhook). Make užregistruoja Checkr webhook'ą aktyvavus scenarijų.
2. **Filtras**: tęsti tik tada, jei `event_type = report.completed`.
3. **Veiksmas**: Checkr: Get Report (naudojant ataskaitos ID iš webhook'o).
4. **Veiksmas**: B1.church: Find Person (pagal kandidato el. paštą).
5. **Sąlyginis veiksmas**: Slack / el. paštas: informuoti koordinatorių apie statusą `clear` / `consider` / `suspended`.

Pastaba: šiuo metu B1 neturi įmontuoto lauko „fono patikrinimo statusui“. Praktiški variantai yra: (a) skelbti rezultatą privačiame Slack kanale peržiūrai, (b) įrašyti jį į Google Sheets audito tikslais arba (c) pridėti asmenį į B1 grupę „Patvirtinti savanoriai“, kai gaunamas `clear`.

## Dažni scenarijai

### Savanorių pakartotinis patikrinimas kas 2 metus

Kartu su aukščiau aprašytu scenarijumi naudokite Make tvarkaraščio paleidiklį:

- **Paleidiklis**: Make: Schedule (kas mėnesį)
- **Veiksmas**: B1.church: List Group Members grupei „Patvirtinti savanoriai“
- **Veiksmas**: Filtruoti pagal Make: patvirtinimo data senesnė nei 22 mėnesiai
- **Veiksmas**: Checkr: Create Background Check Invitation (tas pats kaip pradiniame sraute)

### Blokuoti 1 etapo prieigą, kol patikrinimas baigtas

Jei jūsų bažnyčia naudoja B1 grupių narystę prieigai valdyti (pvz., tarnystės grafikuose rodomi tik grupės „Patvirtinti“ nariai), laikykite naujus savanorius laikinojoje grupėje, kol Checkr `report.completed` įvykis jų nepakeis.

## Apribojimai ir pastabos

- **Checkr veikia tik JAV** daugumai patikrinimo paketų. Australijos, Jungtinės Karalystės ir Kanados bažnyčioms reikės kitos paslaugos.
- **Kainodara** skaičiuojama pagal patikrinimą: kiekvienas Create Invitation veiksmas Make sistemoje sukuria tikrą patikrinimą. Pirmiausia išbandykite Checkr smėlio dėžės (sandbox) ar testinėje paskyroje. Make Checkr programėlė naudoja prisijungimo duomenis, kuriuos nurodote ryšio nustatymuose, todėl pakeitus duomenis galima perjungti tarp smėlio dėžės ir tikros aplinkos.
- **Checkr API prieiga priklauso nuo plano.** Mažesnėse Checkr paskyrose gali būti tik vartotojo sąsajos planas. Norėdami įjungti API, susisiekite su Checkr.

## Trikčių šalinimas

- **Create Candidate baigiasi klaida `403`**: Checkr API raktas yra tik skaitymo arba neturi reikiamų paskyros leidimų. Sukurkite jį iš naujo Checkr valdymo skydelyje su rašymo teisėmis.
- **Kvietimas niekada nepasiekia**: patikrinkite kandidato el. paštą 3 žingsnyje. B1 gali turėti tuščią el. pašto lauką tam asmeniui. Prieš Checkr žingsnį pridėkite filtrą, reikalaujantį el. pašto.
- **Webhook paleidiklis neveikia**: Checkr webhook registracija kartais nepavyksta be klaidų pranešimo, jei jūsų Make paskyra nenaudoja mokamo plano, palaikančio išeinančius webhook'us. Patikrinkite Checkr valdymo skydelio puslapyje *Webhooks*, ar Make URL yra sąraše.

## Taip pat žr.

- [Make (apžvalga)](../make): B1 pusė kiekvienam Make scenarijui
- [Mobile Message](./mobile-message): SMS paslaugoms be Zapier programėlių, naudojamas tas pats Webhooks/HTTP modelis kaip ir Checkr Make integracijoje
- [Checkr API dokumentacija](https://docs.checkr.com/)
