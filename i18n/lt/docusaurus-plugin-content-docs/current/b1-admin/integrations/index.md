---
title: "Integracijos"
description: "Prijunkite B1 Admin prie Slack, Discord, Zapier, Make, Google Sheets ir DI asistentų, pvz., Claude, su sąrankos žingsniais ir reikalingais API raktų leidimais."
---

# Integracijos

<div class="article-intro">

B1 veikia kartu su įrankiais, kuriuos jūsų komanda jau naudoja. Prijunkite Slack arba Discord personalo pranešimams, automatizuokite darbo eigas per Zapier ar Make arba eksportuokite duomenis pagal poreikį į Google Sheets. Tam nereikia mokėti už atskirą integracijų platformą, o ChurchApps nieko papildomai neturi talpinti. Kiekviena integracija veikia trečiosios šalies infrastruktūroje ir su jūsų bažnyčia bendrauja per B1 webhook'us arba REST API.

</div>

## Kas prieinama

| Integracija | Ką daro | Kryptis | Pastangos nustatymui |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Skelbia suprantamus pranešimus (nauji žmonės, aukos, registracijos, …) Slack kanale | B1 → Slack | 2 minutės |
| **[Discord](./slack-discord.md)** | Tas pats, Discord kanale | B1 → Discord | 2 minutės |
| **[Zapier](./zapier.md)** | Naudoja B1 įvykius kaip paleidiklius ir B1 veiksmus bet kurioje iš daugiau nei 7 000 Zapier programų | Abi kryptys | 5–10 min. vienam Zap |
| **[Make](./make.md)** | Ta pati idėja kaip Zapier, vizualiame Make scenarijų kūrėjuje | Abi kryptys | 5–10 min. vienam scenarijui |
| **[Google Sheets](./google-sheets.md)** | Eksportuoja Asmenis / Aukas / Grupes / Lankomumą į skaičiuoklę pagal poreikį | B1 → Skaičiuoklė | 5 minutės |
| **[Claude](./claude.md)** | Užduokite Anthropic Claude klausimus apie savo bažnyčios duomenis, apribotus pagal jūsų leidimus. Galima išbandyti nemokamai, rekomenduojama | Abi kryptys | Mažiau nei 3 minutės |
| **[ChatGPT](./chatgpt.md)** | Tas pats su OpenAI ChatGPT (reikia mokamo ChatGPT plano) | Abi kryptys | 10 minučių |
| **[Prijungtos paslaugos](./services/index.md)** | Atrinkti receptai: Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Įvairiai | 5–10 min. kiekvienai |

## Kaip pasirinkti

- **Tiesiog norite pranešimo pokalbyje?** Naudokite **Slack** arba **Discord**. Nereikia trečiosios šalies paskyros ir nereikia prižiūrėti Zap'o. Visa konfigūracija atliekama B1Admin.
- **Norite automatizuoti kažką tarp programų** (pvz., „kai kas nors aukoja, įtraukti jį į mano Mailchimp sąrašą ir siųsti į Slack #aukos")? Naudokite **Zapier** arba **Make**. Zapier paprastesnis; Make pigesnis didesnei apimčiai ir turi lankstesnę logiką.
- **Reikia vienkartinio duomenų išgavimo ar suplanuotos ataskaitos?** Naudokite **Google Sheets**: įklijuokite API raktą priedo šoninėje juostoje ir spustelėkite Export.
- **Norite užduoti klausimus paprasta kalba** („kiek pirmą kartą atvykusių lankytojų buvo praeitą sekmadienį?", „apibendrink šio mėnesio aukas")? Pradėkite nuo **[Claude](./claude.md)**. Jį galima išbandyti nemokamai, o nustatymas trunka mažiau nei 3 minutes. **[ChatGPT](./chatgpt.md)** taip pat veikia su mokamu planu. Claude prisijungiate su B1 paskyra, o ChatGPT naudoja B1 API raktą.
- **Kuriate savo pasirinktinę integraciją?** Nė viena iš aukščiau išvardytų. Kreipkitės tiesiogiai į [REST API](/docs/developer/api) su [API raktu](/docs/developer/api/api-keys) arba užprenumeruokite savo kontroliuojamą serverį [webhook'ams](/docs/developer/api/webhooks).

## Kuo jos panašios

Kiekviena integracija autentifikuojasi naudodama **B1 API raktą**, kurį B1Admin sukuriate skiltyje **Settings → Developer → API Keys**. Raktas:

- Susietas su konkrečiu jūsų bažnyčios asmeniu ir paveldi to asmens leidimus
- Gali būti susiaurintas naudojant **leidimų sritis (scopes)**. Pavyzdžiui, Google Sheets eksportui reikia tik `people:read`, o ne `settings:write`
- Bet kada gali būti atšauktas. Tuomet integracijos prieiga nutrūksta akimirksniu, o kiti dalykai nepaveikiami

Kai kurie jungikliai (Zapier, Make) taip pat užregistruoja [webhook'ą](/docs/developer/api/webhooks) jūsų vardu, kai įjungiamas Zap ar scenarijus, ir pašalina jį, kai Zap išjungiamas. Webhook URL tvarkyti patiems nereikia.

:::tip
Kad Zapier ir Make automatiškai registruotų webhook'us, API raktui reikia leidimo srities **`settings:write`** (ir išteklių sričių, kurių reikia integracijai). Tik skaitymo raktas tinka veiksmams ir eksportams, bet ne paleidikliams.
:::

## Kaina

ChurchApps yra nemokama ir atvirojo kodo. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) ir oficialūs Zapier, Make bei Google Sheets jungikliai iš mūsų pusės taip pat nemokami. Trečiosios šalys gali imti mokestį už savo platformas. Zapier ir Make abi turi plačius nemokamus planus, o Slack, Discord ir Google Sheets tokiam tikslui nemokami.

## Kurkite patys

Jei nė vienas iš aukščiau išvardytų variantų netinka, kiekvienas B1 paviršius yra atviras:

- **[REST API](/docs/developer/api)**: kvieskite B1 bet kuria kalba su `Authorization: Bearer cak_…` antrašte
- **[Webhook'ai](/docs/developer/api/webhooks)**: prenumeruokite viešą HTTPS galinį tašką vienam ar keliems įvykių tipams ir gaukite pasirašytus JSON duomenis
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**: jei kuriate SaaS produktą, kurį naudoja daug bažnyčių

## Kiti žingsniai

- [Slack ir Discord](./slack-discord.md): siųskite pokalbių pranešimus
- [Zapier](./zapier.md): prisijunkite prie daugiau nei 7 000 programų
- [Make](./make.md): vizuali darbo eigų automatizacija
- [Google Sheets](./google-sheets.md): eksportuokite į skaičiuokles
- [Claude](./claude.md): klauskite Anthropic Claude apie savo bažnyčios duomenis
- [ChatGPT](./chatgpt.md): klauskite OpenAI ChatGPT apie savo bažnyčios duomenis
- [Prijungtos paslaugos](./services/index.md): paslaugų receptai (Mailchimp, Donorbox, Clearstream, …)
