---
title: "Prisijungimas prie B1 Church Checkin"
sidebar_label: "Prisijungimas"
description: "Prisijunkite prie B1 Church Checkin terminalo programėlės, pasirinkite bažnyčią ir sužinokite apie automatinį prisijungimą, administratoriaus nustatymus ir atsijungimą registravimo planšetėje."
---

# Prisijungimas

<div class="article-intro">

Kad terminalu būtų galima naudotis registravimui, pirmiausia reikia prisijungti su ChurchApps paskyra, turinčia prieigą prie jūsų bažnyčios. Šiame puslapyje aprašomas pirmasis prisijungimas, bažnyčios pasirinkimas, automatinio prisijungimo veikimas ir atsijungimo tvarka.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiegite B1 Church Checkin savo Android planšetėje (žr. [Pradžia](./index.md))
- Turėkite paruoštus savo ChurchApps paskyros el. pašto adresą ir slaptažodį
- Paskyrai jūsų bažnyčioje reikia **Checkin** leidimo (arba **Edit Attendance**). Jį prideda bažnyčios administratorius programėlėje B1 Admin, eidamas į **Nustatymai > Vaidmenys** — žr. [Registravimo terminalo paskyros](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Pirmasis prisijungimas

1. Atidarykite B1 Church Checkin programėlę. Po pradinio ekrano pamatysite prisijungimo ekraną su B1 Church Checkin logotipu.
2. Pirmame lauke įveskite savo **el. pašto adresą**.
3. Antrame lauke įveskite savo **slaptažodį**.
4. Bakstelėkite mygtuką **Prisijungti**.

Programėlė patikrina jūsų duomenis ir prijungia prie paskyros. Jei el. pašto adresas ar slaptažodis neteisingi, ekrano apačioje pamatysite klaidos pranešimą.

Jei paskyroje įjungtas [dviejų veiksnių prisijungimas](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), programėlė paprašys kodo. Įveskite 6 skaitmenų kodą iš paskyros savininko autentifikatoriaus programos arba vieną iš jo atsarginių kodų ir dar kartą bakstelėkite **Prisijungti**. Kodo reikia tik pirmą kartą prisijungiant; vėliau terminalas lieka prisijungęs.

:::info
Tai tas pats el. pašto adresas ir slaptažodis, kuriuos naudojate programėlėje B1 Admin ar bet kuriame kitame ChurchApps produkte. Registravimo terminalui atskira paskyra nereikalinga.
:::

## Bažnyčios pasirinkimas

Sėkmingai prisijungus programėlė įkelia bažnyčias, kuriose jūsų paskyra turi **Checkin** arba **Edit Attendance** leidimą. Bažnyčios, kuriose turite tik kitus leidimus, nerodomos. Jei nerandama nė viena, programėlė rodo **Nėra prieigos prie registravimo** ir prašo, kad bažnyčios administratorius vienam iš jūsų vaidmenų pridėtų Checkin leidimą. Kiekviena bažnyčia rodoma kortelėje su bažnyčios pavadinimu ir logotipu (jei jis nustatytas programėlėje B1 Admin).

- Jei jūsų paskyra susieta **tik su viena bažnyčia**, vis tiek matysite pasirinkimo ekraną. Bakstelėkite savo bažnyčią, kad tęstumėte.
- Jei jūsų paskyra susieta **su keliomis bažnyčiomis**, bakstelėkite bažnyčią, kurią šis terminalas turi aptarnauti.

Pasirinkus bažnyčią, programėlė įkelia tos bažnyčios prekės ženklo ir išvaizdos nustatymus. Jūsų bažnyčios logotipas bus rodomas antraštėje visuose vėlesniuose ekranuose.

## Automatinis prisijungimas kitais kartais

Po pirmojo sėkmingo prisijungimo programėlė planšetėje saugo saugų prisijungimo žetoną ir jūsų pasirinktą bažnyčią. Slaptažodžio ji nesaugo. Kitais kartais paleidžiant:

- Programėlė prisijungia automatiškai, naudodama išsaugotą žetoną.
- Jei anksčiau pasirinkote bažnyčią, ji atkuriama ir iš karto patenkate į **paslaugų ekraną**.
- Jei išsaugotas prisijungimas nebegalioja, programėlė grąžina jus į prisijungimo ekraną, kad galėtumėte prisijungti iš naujo.

:::tip
Kadangi terminalas prisijungia automatiškai, duomenis reikia įvesti tik vieną kartą, pradinio nustatymo metu. Vėliau tiesiog įjunkite planšetę, ir ji bus paruošta darbui.
:::

## Administratoriaus nustatymai

Administratoriaus nustatymai tyčia paslėpti, kad terminalu naudojantys bažnyčios nariai netyčia nepakeistų konfigūracijos. Norėdami jais pasinaudoti:

1. Greitai (per dvi sekundes) septynis kartus bakstelėkite **bažnyčios logotipą** antraštėje.
2. Jei nustatytas terminalo PIN kodas, įveskite jį, kai programėlė to paprašys.
3. Atsidarys ekranas **Administratoriaus nustatymai** su šiomis parinktimis:
   - **Keisti paslaugą** — pakeisti pasirinkto paslaugos laiką
   - **Keisti spausdintuvą** — atidaryti [spausdintuvo nustatymus](./printer-setup.md), kad surastumėte ir pasirinktumėte spausdintuvą
   - **Nustatyti administratoriaus PIN kodą** (arba **Keisti administratoriaus PIN kodą**, kai jis jau nustatytas) — nustatyti ar atnaujinti terminalo PIN kodą, kuris saugo administratoriaus prieigą
   - **Skubus pranešimas** — išsiųsti žinutę visų registruotų namų ūkių globėjams (žr. [Skubus pranešimas](../check-in/checking-out.md#emergency-broadcast))
   - **Darbuotojo stoties režimas** — jungiklis, kuris šiai stočiai prideda išregistravimą, šaukimą, pakartotinį spausdinimą ir profilio redagavimą (žr. [Išregistravimas](../check-in/checking-out.md))
   - **Atsijungti** — atsijungti ir grįžti į prisijungimo ekraną

   Bakstelėkite **Grįžti į terminalą**, kad grįžtumėte prie registravimo.

:::warning
Atsijungus išvalomi visi išsaugoti prisijungimo duomenys ir bažnyčios pasirinkimas. Norėdami vėl naudoti terminalą, turėsite iš naujo įvesti el. pašto adresą ir slaptažodį. Atsijunkite tik tada, kai reikia perjungti paskyrą ar pakeisti terminalo nustatymus.
:::

## Kiti žingsniai

Prisijungę galite [nustatyti spausdintuvą](./printer-setup.md) arba iš karto pereiti prie [registravimo eigos](../check-in/index.md).
