---
title: "Mokamos registracijos"
---

# Mokamos registracijos

<div class="article-intro">

Renginio registracija gali būti daugiau nei paprastas dalyvių skaičiavimas. Galite nustatyti kainuojamus dalyvių tipus (pvz., Suaugęs ir Vaikas), siūlyti papildomus priedus su savo kainomis ir kiekiais, kurti nuolaidos kodus ir rinkti mokėjimą registracijos metu per esamą bažnyčios aukojimų teikėją. Kai renginys užsipildo, pasirinktinis laukiančiųjų sąrašas išlaiko susidomėjusius narius eilėje ir automatiškai juos perkelia, kai atsiranda laisvų vietų.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="eGSZv24Dlzk" title="Renginių registracija ir mokami renginiai B1 sistemoje" next="Bažnyčios svetainės paleidimas B1 sistemoje" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Pirmiausia įjunkite registraciją renginiui — žr. [Kalendorių kūrimas](creating-calendars#enabling-event-registration)
- Norint priimti mokėjimus internetu, jūsų bažnyčioje turi būti [sukonfigūruotas internetinis aukojimas](../donations/online-giving-setup.md) (Stripe, PayPal arba Kingdom Funding). Nemokamiems renginiams aukojimų sąranka nereikalinga. Be internetinio aukojimo mokamos registracijos vis tiek veikia, tačiau žmonės moka tiesiogiai bažnyčiai — žr. [Bažnyčios be internetinio aukojimo](#churches-without-online-giving).

</div>

## Registracijos nustatymų atidarymas

1. B1 Admin sistemoje atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje), pasirinkite **Calendars > Registrations** ir atidarykite savo renginį (arba atidarykite renginį iš jo kalendoriaus).
2. Kortelė **Registration Settings** rodo pagrindinius nustatymus — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** ir **Registration Questions**.
3. Žemiau pagrindinių nustatymų yra trys išskleidžiami skyriai: **Attendee Types**, **Selections** ir **Discount Codes**.

## Dalyvių tipai

Dalyvių tipai leidžia taikyti skirtingas kainas skirtingoms dalyvių grupėms — ir kiekvienai nustatyti atskirą ribą.

1. Išskleiskite skyrių **Attendee Types** ir spustelėkite **Add Type**.
2. Įveskite **Name** (pvz., „Suaugęs“, „Vaikas“, „Studentas“).
3. Nustatykite **Price**. Nemokamam tipui naudokite 0.
4. Pasirinktinai nustatykite **Capacity** tik šiam tipui (pvz., tik 20 vaikų vietų). Palikite tuščią, jei šiam tipui ribos nereikia.
5. Spustelėkite **Save**.

Registracijos metu kiekvienas dalyvis pasirenka tipą; išparduoti tipai rodomi kaip **Sold out** ir negali būti pasirinkti. Dalyvių sąraše rodomas kiekvieno dalyvio tipas ir einamieji kiekvieno tipo skaičiai.

## Pasirinkimai

Pasirinkimai — tai pasirinktiniai mokami priedai: marškinėliai, maitinimo planai, veiklų pagerinimai.

1. Išskleiskite skyrių **Selections** ir spustelėkite **Add Selection**.
2. Įveskite **Name**, pasirinktinai **Description** ir **Price** (0 rodomas kaip „Free“).
3. Pasirinktinai nustatykite **Capacity** (bendras prieinamas kiekis visose registracijose) ir **Max Qty** (daugiausia, kiek vienas registracijos įrašas gali užsisakyti).
4. Spustelėkite **Save**.

Registruotieji pasirenka kiekius registracijos metu, o sumos skaičiuojamos nuo talpos, todėl niekada neparduodate daugiau, nei yra.

## Nuolaidos kodai

1. Išskleiskite skyrių **Discount Codes** ir spustelėkite **Add Discount Code**.
2. Įveskite **Code**, kurį įvestų registruotieji.
3. Pasirinkite **Type** — **Percent** (procentais) arba **Amount** (suma) — ir nurodykite **Value**.
4. Pasirinktinai apribokite kodą **Start Date** / **End Date**, **Min Members** (mažiausias dalyvių skaičius registracijoje) ir **Max Uses**.
5. Spustelėkite **Save**.

Kiekvienas kodas rodo **Uses** skaičių, kad matytumėte, kaip dažnai jis buvo panaudotas. Registruotieji iš karto gauna atsakymą pritaikę kodą — įskaitant aiškius pranešimus, kai kodas pasibaigęs, dar neprasidėjo arba reikalauja daugiau dalyvių.

## Laukiančiųjų sąrašas

Registracijos nustatymų kortelėje įjunkite **Enable Waitlist**. Kai renginys pasiekia talpą:

- Nauji registruotieji siūlomi vietą laukiančiųjų sąraše, o ne atmetami. Jie užpildo tą pačią registraciją (mokėjimas laukiančiųjų sąraše praleidžiamas).
- Kai kas nors atšaukia, seniausia laukiančiųjų sąraše esanti registracija **automatiškai perkeliama** ir gauna el. laišką, kad atsirado laisva vieta. Jei jie yra skolingi, laiške pateikiama nuoroda į [Mano registracijos](../../b1-church/events/my-registrations) jūsų bažnyčios B1 svetainėje, kur jie gali atlikti mokėjimą.
- Bet kada galite perkelti asmenį rankiniu būdu naudodami veiksmą **Promote** laukiančiojo eilutėje — tai naudinga padidinus renginio talpą.

:::info
Perkeltos registracijos lieka *laukiančios* (pending), kol nesumokamas balansas; sumokėjus (arba jei mokėti nereikia) jos patvirtinamos.
:::

## Registruotųjų sąrašas

Atidarykite renginį iš registracijų puslapio, kad pamatytumėte visas registracijas. Kortelės antraštėje rodoma, kiek registracijų užima vietą, palyginti su talpa (pvz., *Registrations (18 / 20)*). Skaičiuojamos tik laukiančios (pending) ir patvirtintos registracijos; kai yra laukiančiųjų, antraštėje pridedamas jų skaičius (pvz., *· 3 waitlisted*), o tas pats skaičius rodomas po talpos juosta. Lentelėje rodomi **Name**, **Members**, **Type** (kiekvieno dalyvio tipas), **Paid / Total** (su įspėjimu apie balansą, kai dar skolinga suma), **Status** ir **Date**, taip pat virš lentelės — kiekvieno tipo skaičių žymos.

- Spustelėkite eilutės detalių piktogramą, kad atidarytumėte dialogą **Registration Details** — nariai, pasirinkimai, sumokėta / balansas ir lentelę **Payments**, kurioje išvardyti visi mokėjimai (suma, būdas, data).
- **Export CSV** atsisiunčia visą sąrašą su stulpeliais: nariai, dalyvių tipai, pasirinkimai, sumokėta / iš viso / balansas, statusas ir po vieną stulpelį kiekvienam registracijos klausimui.
- **Add Attendee** įrašo neprisijungusią arba telefonu gautą registraciją bet kuriam jūsų bažnyčios asmeniui. Pasirinkite asmenį ir, mokamame renginyje, jo dalyvių tipą. Jo kortelė nenuskaitoma: mokama registracija išsaugoma kaip **pending** su visa suma kaip nesumokėtu balansu. Jei jūsų bažnyčioje yra internetinis aukojimas, asmuo gali sumokėti per [Mano registracijos](../../b1-church/events/my-registrations); kitu atveju surinkite pinigus asmeniškai. Dalyvius pridėti reikia Registrations Edit leidimo.

:::info
Grąžinimai B1 sistemoje neapdorojami. Jei reikia grąžinti pinigus už atšauktą mokamą registraciją, grąžinimą atlikite savo aukojimų teikėjo valdymo skydelyje (pvz., Stripe).
:::

## Kaip veikia mokėjimas

Mokėjimai vykdomi per tuos pačius aukojimų vartus, kuriuos jūsų bažnyčia jau naudoja aukoms — kortelės duomenys patenka tiesiai pas teikėją ir niekada nepasiekia B1 serverių. Kainos visada apskaičiuojamos serveryje pagal jūsų sukonfigūruotus tipus, pasirinkimus ir nuolaidos kodus, todėl registruotasis negali pakeisti sumos. Prisijungę nariai gali mokėti išsaugota kortele. Svečiai įveda kortelę atsiskaitymo metu ir prieš mokėdami turi pažymėti **I'm not a robot** patikrinimą.

### Bažnyčios be internetinio aukojimo

Jei jūsų bažnyčioje nėra sukonfigūruoto aukojimų teikėjo, mokami renginiai vis tiek gali priimti registracijas. Mokėjimo žingsnyje registruotiesiems pranešama, kad mokėjimas internetu nepasiekiamas ir kad jie gali mokėti tiesiogiai bažnyčiai, o mygtukas **Register and Pay Later** išsaugo registraciją. Ji išsaugoma kaip **pending** su visa suma kaip nesumokėtu balansu ir sąraše rodoma su balanso įspėjimu. Surinkite pinigus taip, kaip jūsų bažnyčia paprastai daro.

:::info
B1 sistemoje nėra būdo pažymėti, kad neprisijungus atliktas mokėjimas gautas. Nesumokėtas balansas lieka sąraše ir registruotojo [Mano registracijos](../../b1-church/events/my-registrations) kortelėje net surinkus pinigus, todėl pasilikite savo įrašus apie tai, kas sumokėjo.
:::

## Susiję straipsniai

- [Kalendorių kūrimas](creating-calendars#enabling-event-registration) — registracijos įjungimas ir pagrindiniai nustatymai
- [Internetinio aukojimo sąranka](../donations/online-giving-setup.md) — atsiskaitymo metu naudojamų mokėjimo vartų konfigūravimas
- [Registracija į renginius](../../b1-church/events/registering) — ką nariai mato registruodamiesi
- [Mano registracijos](../../b1-church/events/my-registrations) — kaip nariai moka balansus ir redaguoja registracijas
