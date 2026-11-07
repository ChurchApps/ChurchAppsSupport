---
title: "Prisijungimas"
---

# Prisijungimas

<div class="article-intro">

Prieš naudojant kioską registravimui, reikia prisijungti su ChurchApps paskyra, kuri turi prieigą prie jūsų bažnyčios. Šiame puslapyje aprašomas pirmojo prisijungimo procesas, bažnyčios pasirinkimas, automatinio prisijungimo veikimas ir atsijungimo būdas.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite B1 Church Checkin savo Android planšetėje (žr. [Pradžia](./index.md))
- Turėkite paruoštą ChurchApps paskyros el. pašto adresą ir slaptažodį
- Paskyrai jūsų bažnyčioje reikia **Checkin** leidimo (arba **Edit Attendance**). Administratorius jį prideda B1 Admin programoje skiltyje **Settings > Roles** (Nustatymai > Vaidmenys) — žr. [Registracijos kioskų paskyros](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Pirmasis prisijungimas

1. Atidarykite B1 Church Checkin programėlę. Po pradinio ekrano pamatysite prisijungimo ekraną su B1 Church Checkin logotipu.
2. Pirmajame lauke įveskite savo **el. pašto adresą**.
3. Antrajame lauke įveskite savo **slaptažodį**.
4. Bakstelėkite mygtuką **Prisijungti**.

Programa patikrina jūsų prisijungimo duomenis ir prijungia jus prie paskyros. Jei el. pašto adresas ar slaptažodis neteisingi, ekrano apačioje pamatysite klaidos pranešimą.

Jei paskyroje įjungtas [dviejų veiksnių prisijungimas](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), programa tada paprašys kodo. Įveskite 6 skaitmenų kodą iš paskyros savininko autentifikatoriaus programos arba vieną iš jo atsarginių kodų ir dar kartą bakstelėkite **Prisijungti**. Šio kodo reikia tik pirmajam prisijungimui; vėliau kioskas lieka prisijungęs.

:::info
Tai tas pats el. pašto adresas ir slaptažodis, kuriuos naudojate B1 Admin ar bet kuriame kitame ChurchApps produkte. Registracijos kioskui atskira paskyra nereikalinga.
:::

## Bažnyčios pasirinkimas

Sėkmingai prisijungus, programa įkelia bažnyčias, kuriose jūsų paskyra turi **Checkin** arba **Edit Attendance** leidimą. Bažnyčios, kuriose turite tik kitus leidimus, į sąrašą neįtraukiamos. Jei nieko neliko, programa rodo **No check-in access** (Nėra prieigos prie registracijos) ir prašo, kad bažnyčios administratorius pridėtų Checkin leidimą vienam iš jūsų vaidmenų. Kiekviena bažnyčia rodoma kaip kortelė su bažnyčios pavadinimu ir logotipu (jei jis sukonfigūruotas B1 Admin programoje).

- Jei jūsų paskyra susieta **tik su viena bažnyčia**, vis tiek pamatysite pasirinkimo ekraną. Bakstelėkite savo bažnyčią, kad tęstumėte.
- Jei jūsų paskyra susieta **su keliomis bažnyčiomis**, bakstelėkite bažnyčią, kurią šis kioskas turi aptarnauti.

Pasirinkus bažnyčią, programa įkelia tos bažnyčios prekės ženklo ir išvaizdos nustatymus. Jūsų bažnyčios logotipas bus rodomas antraštėje visuose vėlesniuose ekranuose.

## Automatinis prisijungimas pakartotinių apsilankymų metu

Po pirmojo sėkmingo prisijungimo programa planšetėje išsaugo saugų prisijungimo žetoną ir jūsų pasirinktą bažnyčią. Slaptažodžio ji neišsaugo. Kitais paleidimo kartais:

- Programa prisijungia jus atgal naudodama išsaugotą žetoną.
- Jei anksčiau pasirinkote bažnyčią, programa atkuria tą pasirinkimą ir tiesiogiai nukreipia jus į **paslaugų ekraną**.
- Jei išsaugotas prisijungimas nebegalioja, programa grąžina jus į prisijungimo ekraną, kad galėtumėte prisijungti iš naujo.

:::tip
Kadangi kioskas prisijungia automatiškai, prisijungimo duomenis reikia įvesti tik vieną kartą pradinio nustatymo metu. Vėliau planšetę tiesiog įjungiate, ir ji paruošta darbui.
:::

## Administratoriaus nustatymai

Administratoriaus nustatymai tyčia paslėpti, kad bažnyčios nariai, naudojantys kioską, per klaidą nepakeistų konfigūracijos. Norėdami juos pasiekti:

1. Per dvi sekundes greitai **septynis kartus** bakstelėkite **bažnyčios logotipą** antraštėje.
2. Jei nustatytas kiosko PIN kodas, įveskite jį, kai bus paprašyta.
3. Atsidarys **Administratoriaus nustatymų** ekranas su tokiomis parinktimis:
   - **Change Service** (Keisti paslaugą) — pakeisti pasirinktą paslaugos laiką
   - **Change Printer** (Keisti spausdintuvą) — atidaryti [spausdintuvo nustatymus](./printer-setup), kad rastumėte ir pasirinktumėte spausdintuvą
   - **Set/Change PIN** (Nustatyti / keisti PIN) — nustatyti arba atnaujinti kiosko PIN kodą, kuris saugo administratoriaus prieigą
   - **Logout** (Atsijungti) — atsijungti ir grįžti į prisijungimo ekraną

:::warning
Atsijungus išvalomi visi išsaugoti prisijungimo duomenys ir bažnyčios pasirinkimas. Norėdami vėl naudoti kioską, turėsite iš naujo įvesti el. pašto adresą ir slaptažodį. Atsijunkite tik tada, kai reikia perjungti paskyras ar iš naujo sukonfigūruoti kioską.
:::

## Kiti žingsniai

Prisijungę galite [nustatyti spausdintuvą](./printer-setup) arba iš karto pereiti prie [registravimo eigos](../check-in/).
