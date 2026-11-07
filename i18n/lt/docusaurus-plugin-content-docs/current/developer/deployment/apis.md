---
title: "API įdiegimas"
description: "Diekite ChurchApps API į AWS Lambda su Serverless: kūrimas, demo ir produkcijos darbo eigos, duomenų bazių migracijos ir SSM konfigūracija."
---

# API įdiegimas

<div class="article-intro">

ChurchApps API diegiami kaip AWS Lambda funkcijos naudojant Serverless Framework. Šiame puslapyje aprašoma kūrimo, diegimo ir konfigūravimo eiga demonstracinei ir produkcinei aplinkoms.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nusistatykite API lokaliai – žr. [Lokalus API nustatymas](../api/local-setup.md)
- Savo kompiuteryje nustatykite AWS prisijungimo duomenis
- Įsitikinkite, kad turite prieigą prie tikslinės AWS paskyros

</div>

## Kūrimas

API kuriami produkcijai naudojant atskirą TypeScript konfigūraciją:

```bash
npm run build:prod
```

Ši komanda naudoja `tsconfig.prod.json` projektui sukompiliuoti Lambda vykdymo aplinkai.

## Diegimas

Diegimas į demonstracinę aplinką:

```bash
npm run deploy-demo
```

Diegimas į produkciją:

```bash
npm run deploy-prod
```

Praktikoje API diegia GitHub Actions: **Deploy Demo** paleidžiamas kiekvieną kartą, kai įkeliama į `main` šaką, o **Deploy Prod** paleidžiamas rankiniu būdu (workflow dispatch). Tarpinė aplinka (staging) nebenaudojama.

## Duomenų bazės migracijos

**Deploy Prod** diegimo metu pritaiko laukiančias duomenų bazės migracijas. Produkcinės duomenų bazės priima ryšius tik iš VPC vidaus, todėl iškart po `serverless deploy` darbo eiga iškviečia `migrate` Lambda funkciją (`api-Prod-migrate`). Ji vykdo kiekvieno modulio laukiančias migracijas ir grąžina `{ ok, environment, modules }`. Jei kuris nors modulis nepavyksta arba jo migracijos atmetamos (pavyzdžiui, duomenų bazė be migracijų istorijos), darbas nutraukiamas, kad schema niekada neatsiliktų nuo kodo. **Rollback Prod** atšaukia tik Lambda kodą; migracijos lieka pritaikytos, todėl jas rašykite taip, kad jos tik pridėtų, o ne keistų ar šalintų. Informacijos apie migracijų būseną ar rankinį jų vykdymą ieškokite [Serverio administravimas -- Duomenų bazės migracijos](../server-admin.md#database-migrations).

## Kas sukuriama

Kiekvieno API diegimo metu sukuriamos arba atnaujinamos šios AWS Lambda funkcijos:

| Funkcija | Paskirtis |
|----------|-----------|
| `web` | HTTP užklausų apdorojimas per API Gateway |
| `socket` | WebSocket ryšių apdorojimas |
| `timer15Min` | Suplanuota užduotis, vykdoma kas 30 minučių (pavadinimas istorinis) |
| `timerMidnight` | Suplanuota užduotis, vykdoma kasdien vidurnaktį |
| `migrate` | Pritaiko laukiančias duomenų bazės migracijas; iškviečiama iš Deploy Prod darbo eigos |

## Aplinkos konfigūracija

Diegtose aplinkose konfigūracija nuskaitoma iš **AWS SSM Parameter Store**, o ne iš `.env` failų. Taip paslaptys neįtraukiamos į diegimo paketą, o konfigūraciją galima keisti nepakartotinai diegiant.

:::warning
Niekada nesiųskite produkcinių prisijungimo duomenų į saugyklą. Visa nevieša konfigūracija turi būti saugoma AWS SSM Parameter Store ir pasiekiama vykdymo metu.
:::

:::tip
Kiekvienas sujungimas į `main` pirmiausia diegiamas į demonstracinę aplinką. Prieš paleisdami Deploy Prod, patikrinkite pakeitimą ten (pavyzdžiui, [demo.b1.church](https://demo.b1.church)).
:::

## Susijusie straipsniai

- **[Lokalus API nustatymas](../api/local-setup.md)** -- API nustatymas kūrimui
- **[Modulio struktūra](../api/module-structure.md)** -- Lambda funkcijų architektūros supratimas
- **[Žiniatinklio programų diegimas](./web-apps.md)** -- Frontend programų diegimas
