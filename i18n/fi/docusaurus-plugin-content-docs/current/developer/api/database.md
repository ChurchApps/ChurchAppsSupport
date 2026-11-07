---
title: "Tietokanta"
---

# Tietokanta

<div class="article-intro">

ChurchApps API käyttää **tietokanta-per-moduuli** -arkkitehtuuria. Jokaisella kuudella datamoduulilla on oma MySQL-tietokanta ja itsenäinen yhteyspooli. Tämä tarjoaa selkeät tietorajat ja pitää kaiken yhden käyttöönoton sisällä.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **MySQL 8.0+** -- katso [Esivaatimukset](../setup/prerequisites)
- Määritä tietokantayhteyden merkkijonot `.env`-tiedostossasi -- katso [Ympäristömuuttujat](../setup/environment-variables)

</div>

## Arkkitehtuurin yleiskuvaus

```
Api
├── membership_db   ← Henkilöt, ryhmät, oikeudet
├── attendance_db   ← Palvelut, istunnot, tietueet
├── content_db      ← Sivut, osiot, elementit
├── giving_db       ← Lahjoitukset, rahastot, maksut
├── messaging_db    ← Keskustelut, ilmoitukset
└── doing_db        ← Tehtävät, suunnitelmat, tehtävänannot
```

### Keskeiset suunnitteluratkaisut

- **Yksi tietokanta moduulia kohden** -- Jokainen moduuli ylläpitää omaa MySQL-tietokantaansa omalla yhteyspoolillaan (jota hallinnoi `KyselyPool`). Tämä pitää moduulit erillään toisistaan ja mahdollistaa skeeman itsenäisen kehittämisen.
- **Yksinomainen omistajuus** -- Moduulin taulukoita lukee ja kirjoittaa vain kyseisen moduulin oma koodi. Kun toinen moduuli tarvitsee dataa, se kutsuu omistavan moduulin yhdyskäytävää sen sijaan, että kysyisi taulukoita suoraan -- katso [Moduulien välinen viestintä](./module-structure#cross-module-communication).
- **Repository-malli ilman ORM:ää** -- Kaikki datan käsittely kulkee repository-luokkien kautta, jotka rakentavat tyypitettyjä SQL-kyselyitä Kysely-kyselyrakentajalla moduulin skeemaa vasten. Tämä antaa täyden hallinnan kyselyjen suorituskykyyn ja toimintaan.
- **Monivuokraus suunnittelun perustana** -- Jokainen kysely rajataan `churchId`:n mukaan. Kaikissa tauluissa on `churchId`-sarake, ja repository-kerros valvoo vuokralaisten eristämistä automaattisesti.

## Yhteysmerkkijonot

Jokaisen moduulin tietokantayhteys määritetään `.env`-tiedostossa vakiomuotoisella MySQL-yhteysmerkkijonolla:

```
mysql://user:password@host:port/database
```

Paikallisessa kehitysympäristössä voi esimerkiksi näyttää tältä:

Jokainen moduuli lukee yhteytensä ympäristömuuttujasta nimeltä `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Tuotannossa yhteysmerkkijonot tallennetaan AWS SSM Parameter Storeen, ja `Environment`-luokka lukee ne käynnistyksen yhteydessä.
:::

## Skeematiedostot

Taulukkoskeemat on määritelty Kysely-migraatioina `tools/migrations/`-hakemistossa, jaoteltuna moduuleittain:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migraatiot määrittelevät taulujen luonnin, indeksit ja skeemamuutokset. Hakemisto `tools/dbScripts/` sisältää demo- ja siemendataa, jonka voi ladata skeeman päälle.

## Tietokantojen alustaminen

### Alusta kaikki tietokannat

```bash
npm run initdb
```

Tämä luo kaikki kuusi tietokantaa ja ajaa jokaisen migraatiot.

### Alusta yksi moduuli

```bash
npm run initdb -- --module=membership
```

:::tip
Kun työskentelet tietyn moduulin parissa, voit alustaa uudelleen vain sen tietokannan vaikuttamatta muihin.
:::

## Datankäsittelymalli

Repositoryt rakentavat kyselyt Kysely-kyselyrakentajalla moduulin tyypitettyä tietokantaskeemaa vasten. Skeema saadaan moduulin `getDb()`-funktiolla. Tyypillinen repository-metodi näyttää tältä:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repositoryt haetaan `RepoManager`in kautta:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Sisällytä aina `churchId` kyselyihisi, jotta monivuokraus pysyy eristettynä. Älä koskaan kysy dataa vuokralaisten välillä, ellei sinulla ole siihen erityistä ja valtuutettua syytä.
:::

## Moduulien väliset viittaukset

Koska jokaisen moduulin data on erillisessä tietokannassa, moduulirajojen yli ei ole vierasavaimia eikä SQL-liitoksia. Toiseen moduuliin liittyvä tietue tallentaa kyseisen tietueen tunnisteen. Esimerkiksi giving-tietokannan lahjoitus sisältää membership-tietokannan henkilön `personId`:n. Moduulien väliset yhdistelmät tehdään sovelluskoodissa.

Tämä rajoite tekee moduulirajoista todellisia: jokainen skeema voi kehittyä itsenäisesti, moduulin tietokanta voidaan siirtää omalle palvelimelleen, ja moduuli voitaisiin jopa eriyttää erilliseksi palveluksi purkamatta jaettuja tauluja tai tietokantojen välisiä kyselyjä.

## Aiheeseen liittyvät artikkelit

- **[Moduulirakenne](./module-structure)** -- Miten controllerit ja repositoryt on järjestetty kunkin moduulin sisällä
- **[Paikallinen API-asennus](./local-setup)** -- Täydellinen vaiheittainen asennusopas
