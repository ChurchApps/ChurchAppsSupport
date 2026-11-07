---
title: "Uspořádání obrazovky"
---

Oops, I need to correct myself: I've been asked to translate into Lithuanian, but I started writing Czech. Here is the Lithuanian translation:

---
title: "Ekrano susiejimas"
---

# Ekrano susiejimas

<div class="article-intro">

Kad televizorius rodytų kalendorių, susiekite jį su **FreePlay Admin**. Televizorius rodo keturių raidžių kodą. Įveskite šį kodą adresu [admin.freeplay.church](https://admin.freeplay.church) ir pasirinkite ekranų grupę, kurios kalendorių televizorius turėtų sekti. Tai reikia atlikti tik vieną kartą kiekvienam televizoriui.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite ir paleiskite FreePlay televizoriuje. Žr. [Pradžia](../getting-started/)
- Turėkite savo bažnyčios ChurchApps prisijungimo duomenis, kad galėtumėte prisijungti prie FreePlay Admin
- Pasirinktinai, pirmiausia [sukurkite grojaraštį](./building-playlists) ir [suplanuokite jį](./scheduling-the-calendar), kad televizorius iškart turėtų ką rodyti

</div>

## Kodo rodymas televizoriuje

1. Televizoriuje atidarykite **Settings** (Nustatymai) šoninės juostos apačioje.
2. Pasirinkite **Pair to a calendar** (Susieti su kalendoriumi). Eilutėje rodoma **Not paired** (Nesusieta), kol televizorius dar nesusietas.
3. Ekrane **Pair this screen** (Susieti šį ekraną) rodomas QR kodas ir keturių raidžių susiejimo kodas su pranešimu **Scan with your phone, or go to freeplay.church/pair and enter this code** (Nuskaitykite telefonu arba eikite į freeplay.church/pair ir įveskite šį kodą).
4. Po kodu **Waiting for confirmation** (Laukiama patvirtinimo) mirksi, kol FreePlay laukia, kol baigsite susiejimą.

Kodas galioja 15 minučių, o po juo rodomas skaitiklis, kiek laiko liko. Kai laikas baigiasi, FreePlay automatiškai parodo naują kodą. Taip pat galite pasirinkti **Generate New Code** (Generuoti naują kodą), kad gautumėte naują kodą, arba **Cancel** (Atšaukti), kad grįžtumėte į Nustatymus.

## Susiejimas FreePlay Admin

1. Nuskaitykite QR kodą telefonu arba eikite į **freeplay.church/pair** bet kuriame kompiuteryje ar telefone. Jei reikia, prisijunkite. FreePlay Admin atidarys formą **Pair screen** (Susieti ekraną), kurioje kodas jau įrašytas.
   - Formą galite atidaryti ir patys. FreePlay Admin eikite į **Screens** (Ekranai) ir spustelėkite **Pair screen** (Susieti ekraną).
2. Patikrinkite **Pairing code** (Susiejimo kodas). Tai keturios raidės, rodomos televizoriuje.
3. Įveskite **Label** (Etiketė), kad galėtumėte atskirti šį televizorių nuo kitų, pavyzdžiui, „Lobby left“ (Kairysis fojė). Tai neprivaloma.
4. Skiltyje **Group** (Grupė) pasirinkite ekranų grupę, kurios kalendorių šis televizorius turėtų sekti. Norėdami sukurti naują, pasirinkite **＋ New group…** (Nauja grupė…) ir įveskite **New group name** (Naujos grupės pavadinimas).
5. Skiltyje **Mode** (Režimas) palikite pasirinktą **Scheduled** (Pagal tvarkaraštį). Televizorius savarankiškai groti pagal grupės kalendorių.
6. Spustelėkite **Pair** (Susieti).

Televizorius parodys **Connected!** (Prijungta!), o paskui **Loading your schedule...** (Įkeliamas jūsų tvarkaraštis...). Jis atsisiųs suplanuotą turinį ir pradės groti. Žr. [Tvarkaraštinis atkūrimas televizoriuje](./scheduled-playback).

:::info
Jei FreePlay Admin rodo **That code didn't match a TV** (Šis kodas neatitinka jokio televizoriaus), patikrinkite kodą ekrane. Jei jis nebegalioja, naudokite naują kodą, kurį televizorius rodo dabar.
:::

### Pagal tvarkaraštį ar rankiniu būdu

Nustatymas **Mode** (Režimas) turi dvi parinktis:

- **Scheduled** (Pagal tvarkaraštį) - Groja pagal grupės kalendorių savarankiškai. Niekas neturi spausti Start.
- **Manual** (Rankiniu būdu) - Turinį pasirenka žmogus nuotoliniu valdymo pultu. Rankinio režimo ekranas vis tiek rodomas jūsų sąraše **Screens**, bet jis nesekа kalendoriaus, todėl laukas **Group** išjungiamas.

Vėliau režimą galite pakeisti spustelėdami **Edit** (Redaguoti) [Ekranų puslapyje](./managing-screens).

## Susiejimas su bažnytinių pamaldų planu

Kodas ekrane **Pair this screen** veikia ir B1 Admin. Jei įvesite jį ten ir pasirinksite plano tipą skiltyje **Show Plans For** (Rodyti planus), televizorius seks tą plano tipą [Plano režime](../plan-mode/) vietoj kalendoriaus. Žr. [Įrenginio susiejimas](../plan-mode/device-pairing).

## Keitimas ar atsiejimas iš televizoriaus

Kai televizorius susietas, eilutėje **Pair to a calendar** nustatymuose rodomas ekranų grupės, kurią jis seka, pavadinimas. Pasirinkite eilutę, kad atidarytumėte dialogą **Paired to** (Susietas su), kuriame yra trys parinktys:

- **Back to schedule** (Grįžti prie tvarkaraščio) - Uždaro dialogą ir grįžta prie tvarkaraštinio grotuvo. Susiejimas nekeičiamas.
- **Unpair** (Atsieti) - Nustoja sekti tvarkaraštį. FreePlay atidaro ekraną **Content Providers** (Turinio teikėjai).
- **Pair to a different calendar** (Susieti su kitu kalendoriumi) - Atsieja ir rodo naują susiejimo kodą, kad televizorių būtų galima vėl susieti.

:::warning
Atsiejus, pašalinami failai, kuriuos FreePlay atsisiuntė tam kalendoriui.
:::

## Atsiejimas FreePlay Admin

1. Eikite į **Screens** (Ekranai) ir spustelėkite ekrano etiketę.
2. Spustelėkite **More** (Daugiau), tada **Unpair** (Atsieti).
3. Dar kartą spustelėkite **Unpair** (Atsieti), kad patvirtintumėte.

Televizorius vėl rodys susiejimo kodą. Susiekite jį iš naujo, kai norėsite.

## Susijusieji straipsniai

- **[Ekranų ir grupių tvarkymas](./managing-screens)** - Pervadinkite ekraną, perkelkite jį į kitą grupę arba patikrinkite jo atsisiuntimus
- **[Kalendoriaus planavimas](./scheduling-the-calendar)** - Nuspręskite, ką rodo grupės ekranai
- **[Susiejimo režimo pasirinkimas](../getting-started/pairing-modes)** - Palyginkite tvarkaraštio režimą su Plano režimu ir turinio teikėjų naršymu pačiam
