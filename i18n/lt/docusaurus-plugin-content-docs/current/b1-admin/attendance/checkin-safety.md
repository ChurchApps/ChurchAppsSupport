---
title: "Registracijos saugumas"
description: "Nustatykite vaikų saugos valdiklius B1 Admin: kambarių talpą, savanorių santykį, patikimų asmenų sąrašus ir pranešimus tėvams registracijos metu."
---

# Registracijos saugumas

<div class="article-intro">

B1 apima vaikų saugumo valdymo priemonių rinkinį registracijai: patalpų talpos ribas ir savanorių bei vaikų santykį, amžiaus ir klasės nurodymus registracijos terminale, registracijos tipus, skiriančius narius, svečius ir savanorius, bei kiekvienai šeimai patikimų asmenų sąrašą, kuris tikrinamas atsiimant vaikus. Šiame puslapyje aprašoma, kaip B1 Admin sistemoje konfigūruoti kiekvieną saugumo funkciją.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nustatykite savo [lankomumo struktūrą](setup.md) ir [registracijos terminalus](check-in.md)
- Kambariai yra [grupės](../groups/creating-groups.md), susietos su pamaldų laikais – toliau nurodytos saugumo nuostatos taikomos grupei
- Tėvų iškvietimui ir skubiam pranešimui transliuoti reikia prijungto SMS paslaugos teikėjo ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md) arba Mutual Ministry)

</div>

## Patalpų talpa ir patalpos uždarymas

Kiekviena registracijos patalpa (grupė) gali taikyti savo apribojimus. Atidarykite grupę, spustelėkite **Redaguoti**, kad pakeistumėte jos nustatymus, ir raskite skyrių **Registracijos talpa**:

- **Talpa** -- Didžiausias žmonių skaičius, kurie vienu metu gali būti užregistruoti šioje patalpoje. Kai patalpa pilna, registracija į ją blokuojama, o terminale nurodoma pilna patalpa.
- **Svečių talpa** -- Neprivalomas atskiras svečių skaičiaus apribojimas patalpoje.
- **Uždaryta registracijai** -- Nustatykite **Taip**, kad iš karto sustabdytumėte visas registracijas į šią patalpą (pavyzdžiui, kai pamoka atšaukta arba patalpa nepasiekiama). Išregistravimas vis dar veikia.

## Savanorių santykis

Ta pati **Registracijos talpa** skiltis grupėje apima personalo taisykles:

- **Vaikai vienam savanoriui** -- Didžiausias vaikų skaičius, kurį gali prižiūrėti kiekvienas užregistruotas savanoris (pavyzdžiui, 5 reiškia vieną savanorį penkiems vaikams).
- **Mažiausias savanorių skaičius** -- Mažiausias savanorių skaičius, kuris turi būti užregistruotas, kad vaikai galėtų registruotis į patalpą.

Savanoriai įskaičiuojami į šias taisykles, kai terminale registruojasi su tipu **Savanoris** (žr. žemiau [Registracijos tipai](#check-in-types)).

### Įspėjimo ar blokavimo pasirinkimas

Tai, kiek griežtai taikomi santykiai, nustatoma visai bažnyčiai:

1. B1 Admin sistemoje eikite į **Nustatymai** ir atidarykite skyrių **Registracija**.
2. Nustatykite **Savanorių santykio taikymas**:
   - **Įspėti (leisti su patvirtinimu)** -- Terminale rodomas įspėjimas, kai patalpoje viršijamas santykis arba nepasiekiamas mažiausias savanorių skaičius, o darbuotojas gali patvirtinti ir vis tiek tęsti. Tai numatytasis nustatymas.
   - **Blokuoti (neleisti registracijos)** -- Registracija į patalpą atmetama, kol nebus užregistruota pakankamai savanorių.

:::info
Talpa ir Uždaryta registracijai visada yra griežti apribojimai – įspėjimo ar blokavimo pasirinkimas taikomas tik savanorių santykiams.
:::

## Registracijos tipai

Kiekviena registracija nurodo, ar asmuo yra **Narys**, **Svečias** ar **Savanoris**. Tipas pasirenkamas žymomis terminalo šeimos ekrane (numatytasis – Narys). Tipai naudojami saugumo taisyklėms: savanoriai padengia santykį, o svečiai skaičiuojami pagal patalpos svečių talpą.

## Amžiaus ir klasės patalpų nurodymai

Kiekvienai patalpai galite nustatyti amžiaus ar klasės ribas, kad terminalas padėtų šeimoms rasti tinkamas patalpas:

- Grupės nustatymuose naudokite skyrių **Amžius ir klasė**, kad nustatytumėte patalpos mažiausią ir didžiausią amžių (metais ir mėnesiais) ir (arba) klasę.
- Terminale patalpos, kurioms vaikas tinka, yra paryškintos, o tos, kurioms ne, – užtemdytos. Užtemdytą patalpą vis dar galima pasirinkti su darbuotojo patvirtinimu – nurodymai niekada neblokuoja registracijos.

Klasės pereina į kitą lygį jūsų bažnyčios **klasių perkėlimo dieną**:

1. B1 Admin sistemoje eikite į **Nustatymai** ir atidarykite skyrių **Klasių perkėlimas**.
2. Nustatykite mėnesį ir dieną, kada jūsų bažnyčia perkelia mokinius (pavyzdžiui, rugpjūčio 1 d.). Amžius ir klasės terminale skaičiuojami pagal paskutinę perkėlimo datą.

## Patikimi asmenys ir neįgalioti atsiimti

Kiekviena šeima gali turėti asmenų sąrašą, kuriems leidžiama (arba neleidžiama) atsiimti jos vaikus.

1. Atidarykite asmens puslapį skiltyje **Asmenys** ir raskite kortelę **Atsiėmimas**.
2. Spustelėkite **Pridėti**. Ieškokite esamo asmens arba pridėkite sistemoje neesantį asmenį įvesdami jo **Vardą**, **Ryšį** ir nuotrauką.
3. Nustatykite **Būseną**:
   - **Patikimas** -- Išregistravimo metu šis asmuo rodomas kaip kortelė su nuotrauka, kurią galima paliesti, todėl patvirtintas atsiėmimas vyksta greitai.
   - **Neįgaliotas** -- Jei kas nors bando atsiimti vaiką šiuo vardu, terminalas blokuoja išregistravimą ir rodo įspėjimą. Darbuotojas gali tai peržiūrėti ir patvirtinti, o tai įrašoma į lankomumo įrašą.

Spustelėkite asmens būsenos žymą kortelėje, kad perjungtumėte tarp būsenų Patikimas ir Neįgaliotas.

:::tip
Kai tik įmanoma, pridėkite nuotraukas patikimiems atsiimančiams asmenims – išregistravimo ekrane rodoma nuotrauka, todėl savanoriai gali vizualiai patikrinti, kas stovi priešais juos.
:::

## Tėvų iškvietimas ir skubus pranešimas

Abi funkcijos siunčia tekstines žinutes per jūsų bažnyčios prijungtą SMS paslaugos teikėją – įmontuotos SMS paslaugos nėra, todėl pirmiausia turi būti sukonfigūruotas vienas iš palaikomų teikėjų.

- **Iškviesti tėvus** -- Iš aptarnaujamo terminalo išregistravimo ekrano darbuotojai gali parašyti užregistruoto vaiko tėvams ar globėjams (pavyzdžiui, „Prašome atvykti į darželį“).
- **Skubus pranešimas** -- Iš terminalo administravimo nustatymų darbuotojai gali vienu metu parašyti visų užregistruotų šeimų globėjams pasirinktoms pamaldoms. Siuntimui patvirtinti reikia įvesti **EMERGENCY**.

Asmenys, atsisakę žinučių gavimo arba neturintys įrašyto mobiliojo numerio, praleidžiami automatiškai – terminale rodoma, kiek žinučių išsiųsta ir kiek praleista.

Žr. terminalo pusės vadovą: [Išregistravimas ir vaikų saugumas](../../b1-checkin/check-in/checking-out.md).

## Susiję straipsniai

- [Registracija](check-in.md) — terminalo nustatymas ir įranga
- [Išregistravimas ir vaikų saugumas](../../b1-checkin/check-in/checking-out.md) — terminalo išregistravimas, atsiėmimo patvirtinimas ir iškvietimo eiga
- [Grupių kūrimas](../groups/creating-groups.md) — kur saugomi patalpų nustatymai
- [Lankomumo nustatymas](setup.md) — pamaldos, pamaldų laikai ir patalpų priskyrimas
- [Mažiausias amžius privačioms žinutėms](../settings/mobile-app.md#member-directory--messaging-settings) — blokuoja naujus privačių žinučių pokalbius su vaikais, tačiau palieka juos kataloge
