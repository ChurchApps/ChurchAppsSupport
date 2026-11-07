---
title: "Nustatymas"
---

# Nustatymas

<div class="article-intro">

Šiame skyriuje paaiškinama, kaip nustatyti vietinę kūrimo aplinką ChurchApps projektams. Greitam kūrimui galite nukreipti savo frontend į bendras demonstracines API, arba visą sistemą paleisti lokaliai, jei dirbate su backend dalimi.

</div>

## Du būdai

Yra du būdai kurti lokaliai, priklausomai nuo to, kiek sistemos dalių jums reikia:

### 1. Nukreipimas į demonstracines API (paprasčiausias būdas)

Jei dirbate su **frontend projektu** (interneto programėle, mobiliąja programėle ar darbalaukio programa), greičiausias kelias – nukreipti lokalią programėlę į bendras demonstracines API. Duomenų bazės ar backend sąranka nereikalinga.

Demonstracinių API pagrindinis URL adresas yra:

```
https://api.demo.churchapps.org
```

Kiekvienas API modulis pasiekiamas kelyje po šiuo pagrindu, pavyzdžiui:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demonstracinėje aplinkoje veikia naujausias kodas iš `main` šakos, o pavyzdiniai duomenys kiekvieną naktį atkuriami, todėl nesitikėkite, kad ten sukurti duomenys išliks. (Buvusi bandymų aplinka, `api.staging.churchapps.org`, nebenaudojama. Kai kuriuose pavyzdiniuose `.env` failuose vis dar gali būti bandymų URL adresų – pakeiskite juos demonstracinio arba lokalaus serverio adresais.)

:::tip
Šis būdas leidžia pradėti keisti frontend per kelias minutes. Daugumai prisidedančiųjų tai rekomenduojamas kelias.
:::

### 2. Viso sprendimo paleidimas lokaliai

Jei reikia keisti API kodą arba dirbti be interneto, visą sistemą galite paleisti lokaliai. Tam reikia MySQL 8.0+ ir papildomos konfigūracijos. Išsamių nurodymų ieškokite vadove [API lokali sąranka](../api/local-setup).

## Pradžia

Vadovaukitės šiais puslapiais tokia tvarka:

1. **[Būtinos sąlygos](prerequisites)** – įdiekite reikalingus įrankius (Node.js, Git, MySQL ir kt.)
2. **[Projektų apžvalga](project-overview)** – sužinokite, kokie projektai egzistuoja ir ką jie daro
3. **[Aplinkos kintamieji](environment-variables)** – sukonfigūruokite `.env` failus, kad visi komponentai būtų susieti

:::info
Kiekvienas ChurchApps projektas yra savarankiška Git saugykla. Reikia klonuoti tik tuos projektus, su kuriais norite dirbti.
:::
