---
title: "FreePlay turinio teikėjas"
description: "Ką turinio teikėjas turi pateikti FreePlay: logotipą, prisijungimo modelį, katalogo ir grojaraščių galinius taškus bei medijos formatus."
---

# FreePlay turinio teikėjas

<div class="article-intro">

FreePlay yra ChurchApps medijos grotuvas, skirtas transliuoti pamokas ir kitą vaizdo turinį telefonuose, planšetėse ir televizoriuose. Jei turite pamokų turinio biblioteką ir norite ją pateikti FreePlay, šiame vadove rasite viską, ko reikia.

</div>

## Prekinis ženklas

Prieš pradedant integraciją, mums reikia:

- **Logotipo** -- Logotipo paveikslėlis **16:9** formatu (naudojamas teikėjų kortelėse FreePlay sąsajoje)
- **Prekinio ženklo pavadinimo** -- Pageidaujamo pavadinimo, kuris bus rodomas FreePlay jūsų organizacijai

## API galutiniai taškai

FreePlay bendrauja su jūsų paslauga per nedidelį REST galutinių taškų rinkinį. Kiekvienam teikėjui rašome atskirą adapterį, todėl tiksli URL struktūra gali būti lanksti, tačiau toliau pateikta informacija yra tai, ko mums reikia.

### Autentifikacija

Pasirinkite modelį, tinkantį jūsų turiniui:

| Modelis | Kada naudoti | Ko mums reikia |
|---------|--------------|----------------|
| **Nėra** | Viešas turinys, prisijungimas nereikalingas | Nieko -- mes tiesiogiai kreipiamės į jūsų katalogo galutinius taškus |
| **OAuth (PKCE)** | Prisijungimas per žiniatinklį ar mobiliuosius įrenginius | Autorizacijos URL, prieigos rakto keitimo galutinis taškas, kliento ID, sritys |
| **Įrenginio srautas** | Pageidautina televizijos programėlėms (vartotojas įveda trumpą kodą telefone) | Įrenginio autorizacijos galutinis taškas, prieigos rakto apklausos galutinis taškas, kliento ID |

:::tip
Jei jūsų turiniui reikia autentifikacijos, autentifikacijos galutinis taškas grąžina **vartotojo prieigos raktą**, kurį FreePlay perduoda naršymo ir pamokų galutiniams taškams, kad suteiktų prieigą.
:::

### Naršymas / katalogas

Galutinis taškas (arba galutinių taškų rinkinys), grąžinantis visų prieinamų pamokų **aplankų medį**.

- Tai gali būti **vienas kvietimas**, grąžinantis visą medį, arba **keli kvietimai**, kai kiekvienas grąžina vieną lygį, kai vartotojas naršo giliau.
- Kiekvienas medžio elementas turėtų apimti:

| Laukas | Privalomas | Aprašymas |
|--------|------------|-----------|
| `id` | Taip | Unikalus aplanko identifikatorius |
| `name` | Taip | Aplanko rodomas pavadinimas |
| `thumbnail` | Rekomenduojama | **16:9** miniatiūros URL |

### Pamokos grojaraštis

Galutinis taškas, grąžinantis vienos pamokos **medijos failų grojaraštį**.

Kiekvienas grojaraščio elementas turėtų apimti:

| Laukas | Privalomas | Aprašymas |
|--------|------------|-----------|
| `title` | Taip | Medijos elemento rodomas pavadinimas |
| `mediaType` | Taip | `video` arba `image` |
| `url` | Taip | Tiesioginė failo atsisiuntimo nuoroda (žr. žemiau [Medijos formatai](#media-formats)) |
| `thumbnail` | Rekomenduojama | Elemento miniatiūros paveikslėlis |
| `duration` | Rekomenduojama | Trukmė sekundėmis (vaizdo įrašams) |

## Medijos formatai

FreePlay atsisiunčia failus tiesiogiai, todėl kiekvienas medijos elementas turi turėti **tiesioginę nuorodą** (be įterptųjų grotuvų ar puslapių peradresavimų).

| Tipas | Priimami formatai |
|-------|-------------------|
| Vaizdo įrašas | **MP4** (būtinas, kad veiktų visose platformose Apple ir Android įrenginiuose) |
| Paveikslėlis | JPG, PNG arba GIF |

## Pastabos

- **REST API, grąžinantis JSON**, yra tipinis integracijos modelis, tačiau kadangi kiekvienam teikėjui rašome atskirą adapterį, galime dirbti beveik su bet kokiu API formatu.
- Jei norite tapti FreePlay turinio teikėju, susisiekite per [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) arba sukurkite problemą [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues) puslapyje.
