---
title: "Moduulin rakenne"
---

# Moduulin rakenne

<div class="article-intro">

Jokainen API-moduuli noudattaa yhtenäistä sisäistä rakennetta, jossa on kontrollerit, repositoriot, mallit ja apuluokat. Tämän rakenteen ymmärtäminen helpottaa koodikannassa liikkumista ja uusien toimintojen lisäämistä mihin tahansa moduuliin.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna API paikallisesti – katso [API:n paikallinen asennus](./local-setup)
- Tutustu [tietokannan](./database) arkkitehtuuriin ymmärtääksesi tiedonkäyttökerroksen

</div>

## Hakemistorakenne

Moduulit sijaitsevat hakemistossa `src/modules/{name}/`. Tyypillinen moduuli sisältää neljä hakemistoa:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

Esimerkiksi jäsenyysmoduuli (membership):

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Kuusi ydintietomoduulia – membership, attendance, content, giving, messaging ja doing – noudattavat kaikki tätä rakennetta. Muutama erikoistunut moduuli (kuten reporting, joka tarjoaa moduulien välisiä raportteja eikä omista omia tietojaan) sijaitsee niiden rinnalla hakemistossa `src/modules/`.

## Yksi sovellus, monta moduulia

API on **modulaarinen monoliitti**: moduulit määrittävät koodin järjestelyn ja tietojen omistajuuden rajat, eivät erillisiä palveluita. Käynnistyksen yhteydessä jokaisen moduulin kontrollerit rekisteröidään yhteen riippuvuussäiliöön (dependency injection) yhden Express-sovelluksen taakse. Tämän ansiosta koko API rakennetaan, ajetaan ja julkaistaan yhtenä kokonaisuutena – alla kuvatut julkaistut funktiot ovat kaikki sisäänkäyntipisteitä tähän samaan sovellukseen.

Jokaisen moduulin reitit sijaitsevat URL-etuliitteen alla, joka vastaa moduulin nimeä:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Tämä pitää kunkin moduulin API-pinnan itsenäisenä, vaikka asiakkaat kommunikoivat yhden palvelimen kanssa.

## Kontrollerit

Kontrollerit määrittelevät moduulin API-reitit. Jokaisella moduulilla on oma perus-kontrolleri (esimerkiksi `MembershipBaseController`), joka laajentaa yhteistä `BaseController`-luokkaa – joka itsessään perustuu `@churchapps/apihelper`-paketin `CustomBaseController`-luokkaan. Reitit rekisteröidään Inversify-dekoraattoreilla.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

Ennen toimintosi suorittamista `actionWrapper` tunnistaa pyynnön ja täyttää `this.repos`-kentän moduulin repositorioilla.

### Reittidekoraattorit

| Dekoraattori | HTTP-metodi |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")`-dekoraattori asettaa perupolun kaikille kontrollerin reiteille.

## Repositoriot

Repositoriot hoitavat kaikki tietokantatoiminnot. ORM-kirjastoa ei ole käytössä – kyselyt kirjoitetaan Kysely-kyselyrakentajalla, ja ne tyypitetään moduulin tietokantaskeeman mukaan. Kunkin moduulin `db/index.ts` tarjoaa `getDb()`-funktion, joka palauttaa moduulin tyypitetyn Kysely-instanssin.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Kontrollerin sisällä moduulin repositoriot ovat käytettävissä kentässä `this.repos`. Kontrollereiden ulkopuolella ne haetaan `RepoManager`-luokan kautta:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Moduulien välinen viestintä

Jokaisella moduulilla on oma tietokantansa (katso [Tietokanta](./database)), eikä moduuli koskaan kysele suoraan toisen moduulin tauluja. Kun moduuli tarvitsee toisen omistamaa dataa – esimerkiksi doing-moduuli selvittää henkilöt membership-moduulista – se kulkee omistavan moduulin **yhdyskäytävän** (gateway) kautta hakemistossa `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Jokainen yhdyskäytävä (`MembershipModuleGateway`, `GivingModuleGateway` jne.) on TypeScript-rajapinta, joka määrittelee tarkalleen, mitkä toiminnot omistava moduuli tarjoaa muulle API:lle. Rajapinta on sopimus: nykyiset toteutukset lukevat omistavan moduulin tietokannan prosessin sisällä, mutta koska kutsujat riippuvat vain rajapinnasta, toteutus voitaisiin vaihtaa – esimerkiksi HTTP-kutsuja tekevään toteutukseen – jos moduuli joskus erotettaisiin omaksi palvelukseen.

:::info
Jos tarvitsemasi data sijaitsee toisessa moduulissa eikä sen yhdyskäytävä tarjoa siihen toimintoa, laajenna yhdyskäytävän rajapintaa sen sijaan, että kurkkaisit toisen moduulin repositorioihin tai tietokantaan.
:::

## Tunnistautuminen ja valtuutus

### JWT-tunnistautuminen

`CustomAuthProvider` käsittelee kaikkien pyyntöjen tunnistautumisen JWT-tokenien avulla. Tokeni validoidaan automaattisesti, ja tunnistetun käyttäjän konteksti (`au`) on käytettävissä jokaisessa kontrollerin toiminnossa.

### Käyttöoikeuksien tarkistus

Käytä `au.checkAccess()`-metodia varmistamaan, että nykyisellä käyttäjällä on vaadittu oikeus. Oikeudet ovat ennalta määriteltyjä vakioita, jotka yhdistävät sisältötyypin ja toiminnon:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Jos käyttäjällä ei ole vaadittua oikeutta, virhevastaus palautetaan automaattisesti.

:::warning
Kutsu aina `au.checkAccess()`-metodia ennen tietojen käsittelyä. Älä koskaan ohita oikeustarkistuksia, edes näennäisesti vain lukevissa päätepisteissä.
:::

## Ympäristön asetukset

`Environment`-luokka hoitaa asetukset eri ympäristöissä:

- **Paikallinen kehitys:** Lukee asetukset projektin juuressa olevasta `.env`-tiedostosta
- **Julkaistut ympäristöt:** Lukee asetukset AWS SSM Parameter Storesta

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Tämän abstraktion ansiosta koodisi ei tarvitse tietää, mistä asetukset tulevat.

## Lambda-funktiot

Kun API julkaistaan AWS:ään, se toimii kuutena Lambda-funktiona:

| Funktio | Tarkoitus |
|----------|---------|
| `web` | Käsittelee kaikki HTTP REST API -pyynnöt |
| `socket` | Hallinnoi WebSocket-yhteyksiä reaaliaikaisille toiminnoille |
| `timer15Min` | Ajastettu suoritettavaksi 30 minuutin välein sähköposti-ilmoituksia varten (nimi on historiallinen) |
| `timerMidnight` | Ajastettu suoritettavaksi päivittäin koosteviestejä ja ylläpitoa varten |
| `timerScheduledTasks` | Ajastettu suoritettavaksi päivittäin erääntyneitä automaatioita ja myöhässä olevien työnkulkujen käsittelyä varten |
| `timerWebhooks` | Ajastettu suoritettavaksi joka minuutti jonossa olevien lähtevien webhookien toimittamiseen |

:::info
Paikallisesti `web`-funktio toimii portissa 8084 ja `socket`-funktio portissa 8087. Ajastinfunktiot voidaan käynnistää manuaalisesti kehityksen aikana.
:::

## Aiheeseen liittyvät artikkelit

- **[Tietokanta](./database)** – Yhteysmerkkijonot, skeemaskriptit ja tiedonkäyttömallit
- **[API:n paikallinen asennus](./local-setup)** – Täydellinen vaiheittainen asennusopas
- **[ApiHelper](../shared-libraries/api-helper)** – Jaettu kirjasto, joka tarjoaa `CustomBaseController`-luokan ja tunnistautumisen välikerroksen
