---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Automatiškai palaikykite Mailchimp auditoriją sinchronizuotą su B1: žmonės atkeliauja su vardu, el. paštu ir telefono numeriu; grupių ir sąrašų narystė tampa Mailchimp žymomis; ištrinti asmenys archyvuojami. Sinchronizacija integruota į B1 — nereikia trečiųjų šalių paslaugos, nemokama už kiekvieną užduotį, o pakeitimai pasiekia beveik realiuoju laiku, o ne kartą per naktį.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Mailchimp](https://mailchimp.com) paskyra su auditorija, kurią norite, kad B1 valdytų
- Mailchimp **API raktas** (Mailchimp: profilio piktograma → **Account & billing → Extras → API keys**)
- Jūsų **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- B1Admin vartotojas su **Edit Settings** leidimu

</div>

## Kas sinchronizuojama

| B1 pakeitimas | Poveikis Mailchimp |
|---|---|
| Asmuo pridėtas arba atnaujintas | Prenumeratorius pridedamas arba atnaujinamas (vardas, pavardė, telefono numeris; nauji prenumeratoriai atsiranda kaip `subscribed`) |
| Asmuo ištrintas (arba ištrintas pagal BDAR) | Prenumeratorius archyvuojamas |
| Asmuo prisijungia prie grupės | Pridedama žyma, pavadinta pagal grupę |
| Asmuo išeina iš grupės | Ta žyma pašalinama |
| Asmuo įtraukiamas į išsaugotą sąrašą | Pridedama žyma, pavadinta pagal sąrašą |
| Asmuo išeina iš išsaugoto sąrašo | Ta žyma pašalinama |

**Išsaugoti sąrašai dažniausiai yra geresnis žymų šaltinis.** B1 [išsaugotas sąrašas](/docs/b1-admin/people/lists) yra taisyklėmis paremta auditorija, kuri pati save atnaujina — „visi Šiaurės filialo nariai“, „nariai, sutikę gauti pastoracinius laiškus“. Nukreipkite savo Mailchimp segmentus į sąrašų žymas, ir sinchronizacija jas palaikys; grupių žymas naudokite laiškams konkrečioms tarnystės komandoms.

Sinchronizacija yra **vienakryptė** (B1 → Mailchimp) ir keičia tik standartinius Mailchimp laukus, todėl ji negali prieštarauti jūsų Mailchimp viduje valdomiems sujungimo laukams ar segmentams.

## Sąranka

1. B1Admin eikite į **Settings → Developer → Webhooks → New Webhook**.
2. Nustatykite **Connector Type** į **Mailchimp**.
3. Įklijuokite savo **Mailchimp API Key** ir **Audience ID**. Raktas saugomas užšifruotas ir daugiau niekada nerodomas.
4. Atitinkami įvykiai jau pažymėti; nuimkite žymėjimą nuo tų, kurių nereikia (pvz., palikite asmenų įvykius, bet praleiskite grupių žymas).
5. Išsaugokite. Prieš priimdamas B1 patikrina raktą ir auditoriją Mailchimp sistemoje — klaida iš karto nurodoma su priežastimi.

Bet kada galite spausti **Send Test**, kad iš naujo patikrintumėte ryšį. Kiekvienas sinchronizacijos bandymas įrašomas į webhook'o pristatymo istoriją su tikru Mailchimp atsakymu, o nepavykę pristatymai automatiškai kartojami su atidėjimu apie penkias dienas.

## Pradinis importas

Jungtis sinchronizuoja *pakeitimus* nuo įjungimo momento; ji neperkelia jūsų esamos direktorijos. Diegimo dieną:

1. B1Admin eikite į **People**, ieškokite norimų asmenų (arba paleiskite išsaugotą sąrašą) ir spauskite **Export**, kad atsisiųstumėte CSV failą.
2. Mailchimp naudokite **Audience → Import contacts**, kad įkeltumėte CSV, importavimo metu pritaikydami žymas.

Pradinį įkėlimą atlikdami per Mailchimp importavimo įrankį išlaikote kontrolę sutikimo klausimu — importuokite tik tuos asmenis, kurie iš tiesų sutiko gauti jūsų laiškus. Visos direktorijos masinis importas kaip prenumeruotų kontaktų gali pažeisti Mailchimp taisykles ir antispam teisę (CAN-SPAM/BDAR).

## Apribojimai ir pastabos

- **Vienakryptė sinchronizacija.** Atsisakymai prenumeratos, grąžinti laiškai ir pakeitimai, padaryti Mailchimp, į B1 nepersiduoda. Asmuo, atsisakęs prenumeratos Mailchimp, vis dar gali gauti laiškus, siunčiamus tiesiogiai iš B1 — masinio laiškų sutikimo atžvilgiu laikykite Mailchimp pagrindiniu šaltiniu.
- **Asmenys be el. pašto adreso praleidžiami** (apie tai įrašoma pristatymo istorijoje), nes Mailchimp prenumeratoriai identifikuojami pagal el. paštą.
- **El. pašto adreso pakeitimas sukuria naują prenumeratorių.** Mailchimp asmenis identifikuoja pagal el. paštą, todėl pakeitus asmens el. paštą B1, jis pridedamas su nauju adresu; senas prenumeratorius lieka, kol jo nearchyvuosite Mailchimp.
- **Sinchronizuojami tik standartiniai laukai** — vardas, pavardė, telefono numeris. Narystės statusas, filialas ir B1 pasirinktiniai laukai šioje versijoje nesusiejami su Mailchimp sujungimo laukais; segmentavimui naudokite sąrašų žymas.
- **Žymų pavadinimai sutampa su grupių ir sąrašų pavadinimais.** Pervadinus grupę ar sąrašą, žymos pradedamos kurti pagal naują pavadinimą; sena žyma lieka esamiems prenumeratoriams, kol ji nepašalinama Mailchimp.
- **Mailchimp kontaktų apribojimai vis dar galioja** — jei sinchronizacija nemokamo plano auditoriją viršija leistiną ribą, pristatymo istorijoje bus įrašyta klaida `Member limit reached`.

## Kiti receptai (Zapier / Make)

Viskas, kas viršija auditorijos sinchronizaciją — žymėti aukotojus pagal `donation.created`, atvirkštinė kryptis Mailchimp → B1 arba sinchronizacija su visiškai kita el. pašto platforma (Constant Contact, Brevo ir pan.) — vis dar pasiekiama per [Zapier](../zapier) arba [Make](../make), kurie suaktyvinami tais pačiais webhook įvykiais:

- **Žymėti aukotojus:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Dvikryptė:** Mailchimp *New Subscriber* → B1 *Create Person*

Jei anksčiau asmenų ir grupių sinchronizaciją sujungėte per Zapier, išjunkite tuos Zap'us po to, kai įjungiate įtaisytąjį jungtį — abiejų veikimas dubliuoja kiekvieną įvykį ir be reikalo eikvoja Zapier užduotis.

## Trikčių šalinimas

- **Išsaugojimas nepavyksta su „Mailchimp rejected the API key“** — raktas buvo panaikintas arba įvestas su klaida. Raktai turi baigtis duomenų centro priesaga, pvz., `-us21`.
- **Išsaugojimas nepavyksta su „audience not found“** — tokios Audience ID toje paskyroje nėra. Nukopijuokite jį iš **Audience → Settings → Audience name and defaults** (tai nėra auditorijos pavadinimas).
- **Asmuo niekada nepasirodė Mailchimp** — patikrinkite webhook'o pristatymo istoriją. Įrašas „Skipped: person has no email address“ reiškia tiesiog tai; `4xx` klaida iš Mailchimp priežastį parodo atsakymo turinyje.
- **Pristatymai visiškai nutrūko** — po kelių nepavykusių pristatymų webhook'as automatiškai išjungiamas. Pašalinkite priežastį (dažniausiai panaikintą raktą), vėl įjunkite jį ir patikrinkite su **Send Test**.

## Taip pat žr.

- [Webhooks (kūrėjo žinynas)](/docs/developer/api/webhooks) — variklis, įvykių katalogas, pristatymo ir kartojimo taisyklės
- [Saved Lists](/docs/b1-admin/people/lists) — taisyklėmis paremtos auditorijos, kurios natūraliai atitinka Mailchimp žymas
- [Zapier (apžvalga)](../zapier) — receptams, išeinantiems už auditorijos sinchronizacijos ribų
