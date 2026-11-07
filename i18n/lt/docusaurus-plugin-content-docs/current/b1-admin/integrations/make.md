---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (anksčiau Integromat) yra vizuali darbo eigų automatizavimo platforma, panaši į Zapier, bet turinti lankstesnę logiką ir pigesnę kainą didelio masto naudojimui. Oficiali B1.church Make programėlė leidžia kurti „scenarijus“, kurie akimirksniu reaguoja į B1 įvykius ir įrašo duomenis atgal į B1.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Make](https://www.make.com) paskyra (nemokamo plano pakanka nedidelėms darbo eigoms)
- Bažnyčios administratorius, turintis leidimą **Edit Settings** programoje B1Admin
- Aiški idėja, kokį scenarijų norite sukurti

</div>

## Moduliai

| Tipas | Kas tai | B1 įvykis / galutinis taškas |
|---|---|---|
| **Instant Trigger** | Watch Events | bet koks prenumeruotas B1 įvykis (`person.created`, `donation.created`, …) |
| **Action** | Create Person | prideda naują asmenį |
| **Action** | Add Donation | įrašo auką |
| **Action** | Add Group Member | prideda asmenį į grupę |
| **Search** | Search People | suranda asmenis pagal vardą ar el. pašto adresą |

Momentinis paleidiklis leidžia pasirinkti, kurį įvykį stebėti. Kiekviename scenarijuje naudojamas vienas paleidiklio modulis, sukonfigūruotas konkrečiam įvykiui.

## Sąranka

### 1. Sukurkite B1 API raktą

1. Programoje B1Admin eikite į **Settings → Developer → API Keys** (**Nustatymai → Kūrėjas → API raktai**).
2. Spustelėkite **New API Key**, pavadinkite jį „Make“ ir suteikite reikalingas teises.
3. **Įtraukite `settings:write`**, jei bet kuris jūsų scenarijus naudoja momentinį paleidiklį. Make įregistruoja webhook jūsų vardu, kai scenarijus įjungiamas.
4. Taip pat suteikite teises, kurių reikia veiksmų moduliams (pvz., `donations:write` moduliui Add Donation).
5. Išsaugokite ir nukopijuokite `cak_…` raktą.

### 2. Įdiekite ryšį

1. Make programoje sukurkite naują scenarijų ir įdėkite **B1.church** paleidiklio modulį į darbo sritį.
2. Kai būsite paraginti, pasirinkite **Create a connection**. Įklijuokite API raktą į laukelį *API Key* ir palikite *API Base URL* kaip `https://api.churchapps.org` (nebent testuojate bandomojoje aplinkoje).
3. Spustelėkite **Save**. Make patikrina raktą nuskaitydamas jūsų bažnyčios profilį.

Ryšys išsaugomas jūsų Make paskyroje ir naudojamas pakartotinai visuose scenarijuose.

### 3. Sukonfigūruokite paleidiklį

1. Atidarykite modulio **Watch Events** nustatymus.
2. Pasirinkite norimą įvykį, pvz., `donation.created`.
3. Išsaugokite. Make sugeneruoja unikalų webhook URL ir saugo jį vidiniame nustatyme.

### 4. Pridėkite tolesnius modulius

Į darbo sritį galite įdėti bet kurį iš šimtų Make programų modulių: Mailchimp, Google Sheets, Slack, HubSpot, savo HTTP galutinį tašką ir kt. Susiekite paleidiklio išvestį (`event`, `churchId`, `data.id`, `data.amount`, …) su jų įvesties laukais. Make moduliai flatten, iterator, router ir aggregator leidžia kurti šakotas ir lygiagrečias darbo eigas, kurias Zapier būtų sunku įgyvendinti.

### 5. Įjunkite scenarijų

Antraštės juostoje perjunkite **Active**. Make iškviečia B1 `POST /membership/webhooks`, kad įregistruotų URL. Nuo tos akimirkos kiekvienas atitinkamas B1 įvykis realiuoju laiku patenka į scenarijų.

Išjungus scenarijų, iškviečiamas `DELETE /membership/webhooks/{id}`, todėl nelieka nenaudojamų prenumeratų.

## Dažniausi receptai

### Sinchronizuokite aukas su Google Sheet finansų peržiūrai

- **Paleidiklis** – B1: Watch Events (`donation.created`)
- **Veiksmas** – Google Sheets: Add a Row. Susiekite `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` su lentelės stulpeliais.

### Sąlyginis Slack pranešimas pagal aukos sumą

- **Paleidiklis** – B1: Watch Events (`donation.created`)
- **Router**:
  - A šaka – Filter: `data.amount >= 1000` → Slack: siųsti į `#major-gifts`
  - B šaka – likusieji → Slack: siųsti į `#donations`

### Naujas asmuo → CRM + sveikinimo el. laiškas + Slack

- **Paleidiklis** – B1: Watch Events (`person.created`)
- **Veiksmas** – HubSpot: Create Contact
- **Veiksmas** – Mailgun: Send Welcome Email
- **Veiksmas** – Slack: pranešti į `#new-people` (lygiagrečiai, naudojant Make router)

## Kaip veikia momentinis paleidiklis

Momentinis paleidiklis remiasi webhook, o ne apklausa. Įjungus scenarijų, Make iškviečia `POST /membership/webhooks` su savo sugeneruotu URL ir pasirinktu įvykiu. Kai įvykis įvyksta B1, B1 siunčia duomenis į Make URL, o jūsų scenarijus paleidžiamas per kelias sekundes. Išjungus scenarijų, webhook pašalinamas.

Paleidiklis suveikia tik įvykiams, kurie įvyksta, **kol scenarijus aktyvus**. Praeities įvykiai nėra apdorojami.

## Apribojimai ir pastabos

- **Vienas įvykis vienam modului Watch Events.** Norėdami stebėti kelis įvykius viename scenarijuje, įdėkite kelis paleidiklio modulius į atskirus scenarijus (arba naudokite vieną modulį su sujungtu įvykių sąrašu – žr. žemiau).
- **Parašo tikrinimas neprieinamas** – Make neperduoda `X-B1-Signature` į scenarijų; pasitikėjimo ribą nustato nenuspėjamas kiekvieno scenarijaus Make webhook URL. Tai įprasta Make praktika. Jei reikia aiškaus parašo tikrinimo, sukurkite pasirinktinę integraciją naudodami [SDK](/docs/developer/api/webhooks#sdk-support).
- **Operacijų skaičius** – kiekviena veiksmo modulio API užklausa skaičiuojama pagal jūsų Make operacijų kvotą, o ne B1 pusėje.

## Trikčių šalinimas

- **Ryšio testas nepavyksta** – dažniausiai API rakte yra klaida. Nukopijuokite jį iš B1Admin iš naujo (visas raktas rodomas tik vieną kartą; jei jį pamiršote, sukurkite naują).
- **Paleidiklio modulis neaktyvuojamas** – patikrinkite **Settings → Developer → Webhooks** programoje B1Admin. Jei aktyvavus scenarijų nematote eilutės „Make — &lt;event&gt;“, API rakte trūksta `settings:write`. Atnaujinkite raktą ir aktyvuokite scenarijų iš naujo.
- **Veiksmas grąžina `403 Forbidden`** – API raktui trūksta šio galutinio taško teisės. Pavyzdžiui, Add Donation reikia `donations:write`. Atnaujinkite raktą programoje B1Admin ir testuokite dar kartą.

## Programėlės pritaikymas

B1.church Make programėlė yra atvirojo kodo – JSON aprašai yra `B1Integrations/Make/` saugykloje. Jei reikalingas modulis, kurio nėra (pvz., naujas veiksmas galutiniam taškui, kurio dar nepadengėme), atidarykite problemą (issue) arba pateikite pakeitimų užklausą (PR) toje saugykloje.

## Taip pat žr.

- [Zapier](./zapier) – tas pats modelis, paprastesnė sąsaja ir didesnis programėlių katalogas
- [Slack ir Discord](./slack-discord) – įmontuoti pokalbių pranešimai be Make
- [Webhook (kūrėjo žinynas)](/docs/developer/api/webhooks)
