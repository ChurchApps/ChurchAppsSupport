---
title: "Odjava ir vaikų sauga"
description: "Išregistruokite vaikus B1 Checkin punkte: apsaugos kodai, patikrinti atsiėmėjai, tėvų iškvietimas, etikečių perspausdinimas ir skubūs pranešimai."
---

# Odjava ir vaikų sauga

<div class="article-intro">

Odjava uždaro vaikų registracijos ciklą: tėvai pateikia saugumo kodą iš savo išsiimamo lipduko, kioskas patikrina, kas atvyksta vaiko, ir vaikai yra išregistruojami. Rankiniuose punktuose taip pat yra saugos priemonių — patikimo asmens patvirtinimas, tėvų išsikvietimas SMS žinute, saugumo lipdukų perspausdinimas ir skubus pranešimas.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Odjava galima punktuose, nustatytuose į **rankinį** režimą kioskų administravimo nustatymuose
- Vaikai turi būti [užregistruoti](./completing-checkin.md) su atspausdintu išsiimamu lipduku, kuriame yra saugumo kodas
- Išsikvietimui ir skubiems pranešimams reikia, kad jūsų bažnyčia būtų prijungusi SMS paslaugos teikėją B1 Admin sistemoje

</div>

## Odjungos pradžia

1. Rankiniame punkte paspauskite **Check Out** paieškos ekrane.
2. Įveskite 4 simbolių **saugumo kodą** iš šeimos išsiimamo lipduko. Galite jį surinkti, naudoti ekrane rodomą klaviatūrą arba nuskaityti lipduko brūkšninį kodą USB ar Bluetooth skaitytuvu — kodas automatiškai pateikiamas, kai įvedami visi 4 simboliai.
   - Neturite skaitytuvo? Paspauskite **Scan** po kodo lauku, kad naudotumėte planšetės kamerą. Laikykite išsiimamo lipduko QR kodą arba brūkšninį kodą prie kameros lange **Scan pickup code**, ir kodas bus įvestas automatiškai. Pagal numatytuosius nustatymus naudojama galinė kamera; paspauskite perjungimo mygtuką, kad pakeistumėte kamerą, arba paspauskite **Cancel**, kad grįžtumėte prie rašymo.
3. Kioskas parodys vaikus, užregistruotus pagal tą kodą.

## Asmens, atvykstančio vaiko pasiimti, patvirtinimas

Odjagos ekrane klausiama, kas atvyksta pasiimti vaikų:

- **Patikimi asmenys šeimai** rodomi kaip spaudžiamos kortelės su nuotrauka ir giminystės ryšiu — paspauskite asmenį, kuris stovi prieš jus.
- **Šeimos suaugusieji** taip pat rodomi nuotraukų tinklelyje.
- **Kita** leidžia įvesti vardą asmens, kurio nėra sąraše.

Jei įvestas vardas sutampa su asmeniu, pažymėtu **Not Authorized** tai šeimai, kioskas blokuoja odjagą ir parodo įspėjimą. Darbuotojas gali pasirinkti **Override**, kad vis tiek tęstų — perrašymas įrašomas į lankomumo įrašą su asmens vardu.

Patvirtinus asmenį, paspauskite odjungti. Asmens, atvykusio pasiimti vaiką, vardas įrašomas kartu su lankomumo įrašu.

:::info
Patikimus ir neįgaliotus asmenis pasiimti vaikų valdo bažnyčios darbuotojai kiekvieno asmens puslapyje B1 Admin sistemoje — žr. [Registracijos saugumas](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Tėvų išsikvietimas

Reikia tėvo per pamaldas — vystyklų keitimas, verkiantis vaikas? Rankiniame punkte, odjagos ekrane, darbuotojai gali išsiųsti **išsikvietimą**: SMS žinutę vaiko tėvams arba globėjams per bažnyčios SMS paslaugos teikėją. Tėvams, kurie atsisakė SMS arba neturi mobiliojo numerio, žinutės nesiunčiamos, o kioskas parodo, kiek žinučių buvo išsiųsta.

## Lipdukų perspausdinimas

Jei vardinis ženklelis ar išsiimamas lipdukas pamestas ar sugadintas, darbuotojai rankiniame punkte, įvedę saugumo kodą, gali **perspausdinti** šeimos lipdukus odjagos ekrane. Perspausdinimui naudojamas tas pats spausdintuvas ir lipdukų šablonai kaip ir pradinėje registracijoje.

## Skubus pranešimas

Įvykus avarijai, darbuotojai gali vienu metu išsiųsti SMS žinutę **visų užregistruotų vaikų** globėjams dabartinėms pamaldoms:

1. Atidarykite kioskų **administravimo nustatymus** (7 greiti paspaudimai ant antraštės logotipo, o jei nustatytas PIN kodas — ir jis).
2. Paspauskite **Emergency broadcast**.
3. Įveskite pranešimą, tada patvirtinimo lauke įveskite **EMERGENCY** — mygtukas **Send broadcast** lieka neaktyvus, kol to nepadarysite.
4. Kioskas praneša, kiek telefonų gavo žinutę ir kiek asmenų buvo praleista (atsisakė SMS arba neturi mobiliojo numerio).

:::warning
Pranešimas siunčiamas kiekvienai užregistruotai šeimai pasirinktoms pamaldoms. Naudokite jį tik tikroms avarijoms — evakuacijoms, užrakinimams, audroms.
:::

## Susiję straipsniai

- [Registracijos užbaigimas](./completing-checkin.md) — iš kur atsiranda saugumo kodai ir išsiimami lipdukai
- [Registracijos saugumas](../../b1-admin/attendance/checkin-safety.md) — talpumo, santykių, asmenų pasiimti ir SMS paslaugos teikėjo reikalavimų konfigūravimas
- [Spausdintuvo sąranka](../getting-started/printer-setup.md) — lipdukų spausdintuvo konfigūravimas
