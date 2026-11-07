---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Oficiali B1.church programa Zapier platformoje leidžia Zap'ui reaguoti į įvykius jūsų bažnyčioje (naujas asmuo, nauja auka, naujas grupės narys, …) ir įrašyti duomenis atgal į B1. Nereikia programuoti ar kurti infrastruktūros: susiejate ją Zapier vilkimo ir paleidimo redaktoriuje, įklijuojate API raktą ir įjungiate Zap'ą.

</div>

:::caution Laukiama Zapier patvirtinimo
B1.church programa sukurta ir veikia, tačiau ji dar laukia Zapier peržiūros, kol pasirodys viešai Zap redaktoriaus programų kataloge. Kol ji nepatvirtinta, ją gali naudoti tik pakviestos paskyros. Toliau aprašyta, kaip ji veiks po patvirtinimo.
:::

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Zapier](https://zapier.com) paskyra (nemokamos versijos pakanka keliems Zap'ams)
- Bažnyčios administratorius su **Edit Settings** leidimu B1Admin (sukursite API raktą)
- Idėja, ką norite daryti, pvz., „kai B1 pridedamas naujas asmuo, įtraukti jį į mano Mailchimp sąrašą“

</div>

## Paleidikliai ir veiksmai

| Tipas | Kas tai | B1 įvykis / galutinis taškas |
|---|---|---|
| **Paleidiklis** | New Person | `person.created` |
| **Paleidiklis** | Updated Person | `person.updated` |
| **Paleidiklis** | New Donation | `donation.created` |
| **Paleidiklis** | New Group Member | `group.member.added` |
| **Paleidiklis** | New Form Submission | `form.submission.created` |
| **Veiksmas** | Create Person | prideda naują asmenį |
| **Veiksmas** | Add Donation | įrašo auką |
| **Veiksmas** | Add Group Member | prideda asmenį į grupę |
| **Veiksmas** | Find Person | ieško asmens pagal id, el. paštą ar vardą; jei niekas neatitinka, užduotis nutraukiama |

Šiuos elementus galite laisvai derinti su bet kuria iš Zapier palaikomų 7 000+ programų.

## Sąranka

### 1. Sukurkite B1 API raktą

1. B1Admin eikite į **Settings → Developer → API Keys**.
2. Spustelėkite **New API Key**, suteikite pavadinimą, pvz., „Zapier“, ir pasirinkite apimtis (scopes), kurių reikia Zap'ui.
3. **Svarbu:** kai Zap'as įjungiamas, Zapier paleidikliai jūsų vardu užregistruoja webhook'ą, o tam reikia **`settings:write`** apimties. Visada įtraukite `settings:write`, jei bet kuris jūsų Zap'as naudoja B1 paleidiklį.
4. Taip pat suteikite veiksmams reikalingas apimtis. Pavyzdžiui, veiksmui „Add Donation“ reikia `donations:write`, o veiksmui „Create Person“ – `people:write`.
5. Išsaugokite. Pilnas `cak_…` raktas rodomas **tik vieną kartą**, todėl jį nukopijuokite.

### 2. Prijunkite Zapier prie B1

1. Zapier sukurkite naują Zap'ą.
2. Kai pirmą kartą pasirenkate B1 paleidiklį ar veiksmą, Zapier paprašys **Sign in to B1.church**.
3. Įklijuokite API raktą iš 1 žingsnio ir spustelėkite **Yes, Continue**. Zapier patikrins raktą jūsų bažnyčiai.

Prisijungimas išsaugomas Zapier ir naudojamas visuose jūsų paskyros Zap'uose.

### 3. Sukurkite Zap'ą

Pasirinkite paleidiklį, tada pridėkite vieną ar daugiau veiksmo žingsnių. Pavyzdžiai pateikiami žemiau.

## Dažniausi pavyzdžiai

### Pridėti naujus B1 asmenis į Mailchimp

- **Paleidiklis** — B1: New Person
- **Veiksmas** — Mailchimp: Add/Update Subscriber. Susiekite B1 laukus `name__first`, `name__last` ir `contactInfo__email` su Mailchimp laukais First Name, Last Name ir Email.

### Siųsti aukas į Slack kanalą su išsamesne kortele nei įmontuota jungtis

- **Paleidiklis** — B1: New Donation
- **Veiksmas** — Slack: Send Channel Message. Sudarykite bet kokį išdėstymą (mygtukus, priedus ir pan.), kurio negali įmontuota [Slack jungtis](./slack-discord).

### Pridėti naujus grupės narius į Google grupę

- **Paleidiklis** — B1: New Group Member (filtruojama pagal konkretų `groupId`)
- **Veiksmas** — Filter by Zapier: tęsti tik tuo atveju, jei B1 grupė yra ta, kuri jums rūpi
- **Veiksmas** — B1: Find Person (naudokite paleidiklio `personId`, kad gautumėte el. paštą)
- **Veiksmas** — Google Groups: Add Member

### Persiųsti formų pateikimus į projektų sekimo įrankį

- **Paleidiklis** — B1: New Form Submission
- **Veiksmas** — Notion / Linear / Asana / Trello: Create page / issue / task

## Kaip veikia paleidikliai

Paleidikliai yra **REST hook'ai**, o ne apklausa: Zapier nekreipiasi į B1 kas 15 minučių. Kai įjungiate Zap'ą, Zapier paprašo B1 užregistruoti webhook'ą, nukreiptą į privatų Zapier URL. Kai įvykis įvyksta, B1 siunčia įvykio duomenis Zapier ir jūsų Zap'as paleidžiamas **per kelias sekundes**. Išjungus Zap'ą, Zapier paprašo B1 ištrinti webhook'ą, todėl likusių prenumeratų nelieka.

Tai reiškia, kad paleidiklis suveikia tik įvykiams, įvykusiems **po** Zap'o įjungimo. Retroaktyvumo nėra: įjungus Zap'ą, vakarykštės aukos iš naujo nebus perduotos.

## Apribojimai ir pastabos

- **Keli Zap'ai su tuo pačiu paleidikliu** kiekvienas užregistruoja savo B1 webhook'ą. Konfliktų nekyla, tačiau verta žinoti, jei žiūrite **Settings → Developer → Webhooks** ir stebitės, kodėl ten yra trys identiškos eilutės „Zapier — donation.created“.
- **Testiniai duomenys Zap'o sąrankoje**: kurdami Zap'ą, galite būti paprašyti pateikti pavyzdinių duomenų laukams susieti. Zapier paims naujausią atitinkamą B1 įvykį, jei toks yra; priešingu atveju naudos sintetinį pavyzdį iš programos aprašo.
- **Veiksmų klaidos rodomos kaip Zap klaidos** Zapier užduočių istorijoje. Dažniausia priežastis – API raktas be reikiamos apimties (pvz., veiksmui „Add Donation“ reikia `donations:write`). Sukurkite raktą iš naujo su teisingomis apimtimis ir iš naujo prijunkite jį Zapier.
- **Išeinančių API iškvietimų kvotos**: kiekvienas B1 API iškvietimas iš veiksmo skaičiuojamas jūsų Zapier užduočių kvotoje, o ne B1 pusėje.

## Trikčių šalinimas

- **„Authentication failed“** prisijungiant: API raktas neteisingas, panaikintas arba neturi reikiamų Zap'o apimčių. Sukurkite jį iš naujo B1Admin su bent `settings:write` ir apimtimis, kurių reikia Zap'ui, tada atnaujinkite prisijungimą.
- **Paleidiklis niekada nesuveikia**: patikrinkite, ar webhook'as iš tikrųjų užregistruotas. B1Admin skiltyje **Settings → Developer → Webhooks** turėtų būti eilutė pavadinimu „Zapier — &lt;event&gt;“. Jei jos nėra, greičiausiai API rakte nebuvo `settings:write`, kai įjungėte Zap'ą. Ištaisykite raktą, išjunkite ir vėl įjunkite Zap'ą.
- **Paleidiklis suveikia du kartus**: Zapier kartais pakartotinai pristato įvykį, jei prarandamas jo patvirtinimas. Jei reikia griežto dublikatų šalinimo, naudokite „Filter by Zapier“ žingsnį pagal unikalų id (pvz., asmens `id`).

## Taip pat žr.

- [Make](./make) – tas pats modelis, kita platforma
- [Slack & Discord](./slack-discord) – paprastesni pokalbių pranešimai be Zapier
- [Webhook'ai (kūrėjo žinynas)](/docs/developer/api/webhooks)
