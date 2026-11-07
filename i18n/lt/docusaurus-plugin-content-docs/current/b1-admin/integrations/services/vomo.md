---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO yra savanorių įsitraukimo platforma: žmonės registruojasi į projektus, prisijungia prie kiosko ir kaupia valandas. Jei savanorių planavimui naudojate VOMO, o asmenų įrašams – B1, Zapier gali sinchronizuoti narystę ir prisijungimus tarp jų, kad abiejose sistemose duomenys nesiskirtų.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [VOMO](https://vomo.org) paskyra su planu, kuris palaiko Zapier (jei nesate tikri, pasitikslinkite VOMO palaikymo komandoje)
- [Zapier](https://zapier.com) paskyra
- B1Admin naudotojas su leidimu **Edit Settings**

</div>

## Ką galite sujungti

VOMO Zapier programa siūlo keturis momentinius paleidiklius (trigger) ir keturis veiksmus. Dažniausiai bažnyčios naudoja šiuos scenarijus:

| Kryptis | Paleidiklis | Veiksmas |
|---|---|---|
| VOMO → B1 | VOMO Membership (sukurta) | B1: Find Person → Create Person (jei asmuo naujas) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member į grupę „Currently Serving“ arba įrašyti kaip lankomumą |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (pagal el. paštą); kitu atveju – pasirinktinis žingsnis |
| Abi kryptys | VOMO Participation (registracijos) | B1: Add Group Member į projektui skirtą grupę |

VOMO veiksmai apsiriboja **projektų juodraščių kūrimu** ir esamų organizatorių bei projektų **paieška** – šiuo metu nėra veiksmo, kuris pridėtų asmenį prie VOMO projekto. Naudingiausia integracija dažniausiai veikia kryptimi VOMO → B1.

## Sąranka

### 1. Sukurkite B1 API raktą

**Settings → Developer → API Keys → New API Key**. Leidimai (scopes):

- `people:read`, `people:write` – ieškoti ir kurti savanorius kaip B1 asmenis
- `groups:write` – pridėti juos į tarnystės komandų grupes
- (Neprivaloma) `attendance:write`, jei kiosko prisijungimus norite laikyti lankomumu

### 2. Sukurkite narystės sinchronizacijos Zap

1. **Paleidiklis** – VOMO: Membership (įvykis = `created`).
2. **Veiksmas** – B1.church: Find Person, atitikimas pagal el. paštą.
3. **Filtras / kelias** – šakojimas pagal tai, ar asmuo rastas:
   - Nerastas → B1.church: Create Person, tada Add Group Member į atitinkamą savanorių grupę.
   - Rastas → B1.church: tiesiogiai Add Group Member.
4. Įjunkite. Nauji VOMO savanoriai dabar atsiras B1 su tinkama grupių narystė.

### 3. (Neprivaloma) Sukurkite kiosko prisijungimo Zap

1. **Paleidiklis** – VOMO: Kiosk
2. **Veiksmas** – B1.church: Find Person (pagal el. paštą)
3. **Veiksmas** – pasirinkite:
   - *Jei laikote lankomumu* – Webhooks by Zapier POST užklausa į B1 `/attendance/visits` galinį tašką (B1 Zapier programoje dar nėra pirminio veiksmo *Record Attendance*). B1 [API raktas](/docs/developer/api/api-keys) dedamas į antraštę `Authorization: Bearer cak_…`.
   - *Jei laikote grupės nariu* – B1.church: Add Group Member su grupe „Currently Serving (Today)“, o vėliau tą pačią dieną antras Zap pašalina juos per planuojamą valymą.

## Dažni scenarijai

### Projekto grupės sinchronizacija

- **Paleidiklis** – VOMO: Participation (sukurta)
- **Veiksmas** – Filter by Zapier pagal projekto ID, tada
- **Veiksmas** – B1.church: Add Group Member į B1 grupę, kurios pavadinimas atitinka VOMO projektą.

Kai VOMO projektas baigiasi, B1 grupę išvalykite rankiniu būdu (arba sujunkite su paleidikliu *Participation deleted*, kuris pašalina narius automatiškai).

### Siųsti SMS padėkos žinutę „Ačiū, kad užsiregistravote“

Tame pačiame Zap sujunkite VOMO Participation → Clearstream Send Text arba Text In Church Send Message. Abu turi pirminius Zapier veiksmus – žr. [Clearstream](./clearstream) ir [Text In Church](./text-in-church).

### Nustatyti, kas atsitraukia

Paleiskite kasdienį Zapier *Schedule* paleidiklį, kuris VOMO iškviečia Find Organizer kiekvienam B1 asmeniui, įstojusiam į tarnystės komandą šį mėnesį. Jei VOMO grąžina „not found“, vadinasi, asmuo neaktyvavo VOMO paskyros ir reikia jam priminti.

## Apribojimai ir pastabos

- **Raktas jungimui – el. paštas.** VOMO duomenyse pateikiamas naudotojo el. paštas, bet ne B1 asmens ID. Aukotojai, kurie skirtingose sistemose naudoja skirtingus el. paštus, bus dubliuojami.
- **VOMO Zapier programoje šiuo metu nėra veiksmo „Add to Project“.** Jei reikia registruoti narį B1 → VOMO projekte, iš *Webhooks by Zapier* žingsnio turėtumėte siųsti POST užklausą į VOMO REST API – tai pasirinktinė integracija.
- **Nemokamuose ar žemesniuose VOMO planuose Zapier gali būti neįtrauktas.** Prieš žadėdami integracijos datą, pasitikslinkite VOMO palaikymo komandoje.

## Trikčių šalinimas

- **Paleidiklis niekada nesuveikia** – VOMO momentiniams paleidikliams reikia, kad API žetonas išliktų galiojantis. Pakartotinai išbandykite Zap; jei žetonas buvo pakeistas, iš naujo prijunkite VOMO.
- **B1 *Add Group Member* klaida 422** – veiksme nurodytos grupės ID neegzistuoja. Atidarykite **B1Admin → Groups**, paspauskite grupę ir nukopijuokite URL ID dalį į Zap žingsnį.
- **Dubliuoti B1 asmenys iš vieno VOMO savanorio** – tikriausiai jis užsiregistravo su kitu el. paštu nei turėjo B1. Arba suvienodinkite el. pašto adresus, arba pridėkite Zapier *Path*, kuris prieš kurdamas asmenį ieško ir pagal telefono numerį.

## Taip pat žr.

- [Zapier (apžvalga)](../zapier) – B1 pusė kiekvienam Zapier scenarijui
- [Clearstream](./clearstream), [Text In Church](./text-in-church) – susieja savanorių registracijas su SMS patvirtinimais
- [Webhooks (kūrėjų nuoroda)](/docs/developer/api/webhooks) – įvykiai, kuriais VOMO gali paleisti veiksmus
