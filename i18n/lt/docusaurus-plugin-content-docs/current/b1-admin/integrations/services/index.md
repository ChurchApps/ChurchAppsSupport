---
title: "Prijungtos paslaugos"
---

# Prijungtos paslaugos

<div class="article-intro">

Greičiausias būdas prijungti B1 prie kito bažnytinių technologijų įrankio paprastai yra Zapier ar Make receptas. Jums nereikia jokios naujos B1 infrastruktūros, o darbo eigą talpina trečiosios šalies platforma. Šiame puslapyje pateikiamas kuruotas sąrašas paslaugų, kurių prijungimas šiuo metu patvirtintas, ir trumpas nukopijuoti ir įklijuoti sąrankos vadovas kiekvienai iš jų.

</div>

## Trumpai

| Paslauga | Kategorija | Tarpinė grandis | Ką galite sujungti |
|---|---|---|---|
| [Mailchimp](./mailchimp) | El. paštas | Zapier arba Make | Sinchronizuoti naujus B1 narius ar aukotojus į Mailchimp auditoriją |
| [Donorbox](./donorbox) | Aukos | Zapier | Perduoti Donorbox aukas ir aukotojus atgal į B1 |
| [Subsplash](./subsplash) | Programėlė / aukos | Zapier | Perkelti Subsplash aukas ir narius į B1 |
| [VOMO](./vomo) | Savanorystė | Zapier | Sinchronizuoti savanorių registracijas tarp B1 grupių ir VOMO projektų |
| [Clearstream](./clearstream) | SMS | Zapier | Paleisti Clearstream žinutę iš B1 įvykių; įrašyti atsakymus kaip B1 įrašus |
| [Text In Church](./text-in-church) | SMS / darbo eigos | Zapier | Paleisti Text In Church darbo eigas iš B1; gauti Connect Card duomenis |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier arba Make | Siųsti SMS iš bet kurio B1 įvykio |
| [Checkr](./checkr) | Patikrinimai apie teistumą | Make | Pradėti foninį patikrinimą, kai asmuo prisijungia prie tarnystės komandos |

## Kas visiems jiems bendra

1. **B1 pusė prijungimo yra identiška.** Sukurkite API raktą su tinkamais leidimais skiltyje **B1Admin → Settings → Developer → API Keys**. Tada arba leiskite tarpinei grandžiai užregistruoti webhook paleidimo įvykiui (Zapier ir Make tai daro automatiškai, reikia `settings:write`), arba kvieskite B1 REST galutinius taškus iš tolesnio veiksmo.
2. **Tarpinę grandį apmoka jūs, ne mes.** ChurchApps yra nemokama; Zapier ir Make turi nemokamus planus, kurie apima kelis receptus.
3. **Prijungimą galite išbandyti neįjungę jo gyvai.** Abi tarpinės grandys turi mygtuką „Test step“, kuris vieną kartą paleidžia įvykį B1 ir parodo duomenų struktūrą, prieš jums įjungiant receptą.

## Tarpinės grandies pasirinkimas

- **Zapier** yra draugiškesnis ir turi didesnį programėlių katalogą. Naudokite jį kaip numatytąjį, nebent kainos yra problema.
- **Make** yra pigesnis dideliam kiekiui ir turi lankstesnę maršrutizavimo bei filtravimo logiką. Naudokite jį, kai viena darbo eiga turi išsišakojimų, sąlygų arba daug žingsnių.
- **Webhooks by Zapier** (naudojama Mobile Message dokumentacijoje) yra bendrinis adapteris, leidžiantis iš Zap siųsti POST užklausas į bet kurį HTTP galutinį tašką, kai paskirties vieta nėra pirmos klasės Zapier programėlė.

Jei norite ko nors, ko nėra šiame sąraše, B1 [REST API](/docs/developer/api) ir [webhooks](/docs/developer/api/webhooks) yra atviri. Vienkartinę tarpinę grandį galite sukurti su [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) per kelias valandas.

## Kas čia nepateikta (ir kodėl)

Kelios populiarios bažnytinių technologijų priemonės, įskaitant Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck ir MinistrySafe, šiuo metu neturi paskelbtos Zapier programėlės ar Make modulio. Jos turi savo API, tačiau jų prijungimas prie B1 yra individualaus kodavimo darbas, o ne receptas, todėl jos šiame sąraše netinka. Jei tiekėjas pridės Zapier programėlę ar Make modulį, pridėsime ir dokumentaciją.

Taip pat sąmoningai praleidome Planning Center Services specifinius įrankius (muzikai, pristatymams), konkuruojančius ChMS produktus, migracijos konsultantus ir įrankius, kurie tvarko tik PCO specifinius duomenis. Nė vienas iš jų neturi naudingo prijungimo kelio į B1.

## Taip pat žr.

- [Zapier (apžvalga)](../zapier): B1 pusė kiekvieno Zapier recepto yra identiška, todėl šis dokumentas ją aprašo vieną kartą
- [Make (apžvalga)](../make): tas pats galioja Make scenarijams
- [Slack ir Discord](../slack-discord): pokalbių pranešimai be jokios tarpinės grandies
- [Google Sheets](../google-sheets): eksportai pagal poreikį
- [Webhooks (kūrėjo žinynas)](/docs/developer/api/webhooks): įvykių katalogas, kuriuo remiasi visi receptai
