---
title: "API-käyttöönotto"
description: "Ota ChurchApps-API käyttöön AWS Lambdassa Serverlessin avulla: rakennukset, demo- ja tuotantotyönkulut, tietokantamigraatiot ja SSM-asetukset."
---

# API-käyttöönotto

<div class="article-intro">

ChurchApps-rajapinnat otetaan käyttöön AWS Lambda -funktioina Serverless Framework -työkalulla. Tämä sivu käsittelee demo- ja tuotantoympäristöjen käännös-, käyttöönotto- ja asetusprosessin.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Ota API käyttöön paikallisesti -- katso [API:n paikallinen käyttöönotto](../api/local-setup.md)
- Määritä AWS-tunnistetiedot koneellesi
- Varmista, että sinulla on pääsy kohdeympäristön AWS-tiliin

</div>

## Käännös

Rajapinnat käännetään tuotantoon erillisen TypeScript-asetustiedoston avulla:

```bash
npm run build:prod
```

Tämä käyttää tiedostoa `tsconfig.prod.json` projektin kääntämiseen Lambda-ajoympäristöön.

## Käyttöönotto

Käyttöönotto demo-ympäristöön:

```bash
npm run deploy-demo
```

Käyttöönotto tuotantoon:

```bash
npm run deploy-prod
```

Käytännössä API:n käyttöönoton hoitaa GitHub Actions: **Deploy Demo** suoritetaan jokaisella `main`-haaraan tehdyllä push-tapahtumalla, ja **Deploy Prod** käynnistetään manuaalisesti (workflow dispatch). Erillistä staging-ympäristöä ei enää ole.

## Tietokantamigraatiot

**Deploy Prod** ajaa odottavat tietokantamigraatiot osana käyttöönottoa. Tuotantotietokannat hyväksyvät yhteyksiä vain VPC:n sisältä, joten heti `serverless deploy` -komennon jälkeen työnkulku kutsuu `migrate`-Lambda-funktiota (`api-Prod-migrate`). Se suorittaa jokaisen moduulin odottavat migraatiot ja palauttaa `{ ok, environment, modules }`. Jos jokin moduuli epäonnistuu tai sen migraatio hylätään (esimerkiksi tietokannalla, jolla ei ole migraatiohistoriaa), työ epäonnistuu, jotta skeema ei koskaan jää koodin jälkeen. **Rollback Prod** palauttaa vain Lambda-koodin; migraatiot pysyvät voimassa, joten pidä ne lisäävinä. Katso tilan tarkistamisesta tai migraatioiden käsin ajamisesta kohta [Palvelimen ylläpito -- Tietokantamigraatiot](../server-admin.md#database-migrations).

## Mitä luodaan

Jokainen API-käyttöönotto luo tai päivittää seuraavat AWS Lambda -funktiot:

| Funktio | Tarkoitus |
|----------|---------|
| `web` | HTTP-pyyntöjen käsittelijä API Gatewayn kautta |
| `socket` | WebSocket-yhteyksien käsittelijä |
| `timer15Min` | Ajastettu tehtävä, joka suoritetaan 30 minuutin välein (nimi on historiallinen) |
| `timerMidnight` | Ajastettu tehtävä, joka suoritetaan joka päivä keskiyöllä |
| `migrate` | Ajaa odottavat tietokantamigraatiot; Deploy Prod -työnkulku kutsuu sitä |

## Ympäristön asetukset

Käyttöönotetuissa ympäristöissä asetukset luetaan **AWS SSM Parameter Store** -palvelusta eikä `.env`-tiedostoista. Tämä pitää salaisuudet poissa käyttöönottopaketista ja mahdollistaa asetusmuutokset ilman uudelleenkäyttöönottoa.

:::warning
Älä koskaan tallenna tuotantotunnistetietoja repositorioon. Kaikki arkaluonteinen asetus tulee tallentaa AWS SSM Parameter Storeen ja lukea ajonaikaisesti.
:::

:::tip
Jokainen `main`-haaraan tehty yhdistäminen otetaan ensin käyttöön demo-ympäristöön. Tarkista muutoksesi siellä (esimerkiksi osoitteessa [demo.b1.church](https://demo.b1.church)) ennen kuin suoritat Deploy Prod -työnkulun.
:::

## Aiheeseen liittyvät artikkelit

- **[API:n paikallinen käyttöönotto](../api/local-setup.md)** -- API:n käyttöönotto kehitystä varten
- **[Moduulirakenne](../api/module-structure.md)** -- Lambda-funktioiden arkkitehtuurin ymmärtäminen
- **[Verkkosovellusten käyttöönotto](./web-apps.md)** -- Frontend-sovellusten käyttöönotto
