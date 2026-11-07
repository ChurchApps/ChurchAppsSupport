---
title: "Todennus ja käyttöoikeudet"
description: "Viiteopas ChurchApps-API:n JWT-kirjautumiseen, kaksivaiheiseen tunnistautumiseen, OAuth 2.0 -virtauksiin ja käyttöoikeusmalliin integraatioita rakentaville kehittäjille."
---

# Todennus ja käyttöoikeudet

<div class="article-intro">

ChurchApps-API käyttää JWT-pohjaista todennusta. Käyttäjät kirjautuvat sisään saadakseen tunnuksen (token), joka koodaa heidän henkilöllisyytensä, seurakuntajäsenyytensä ja käyttöoikeutensa. Tämä sivu käsittelee todennusvirtaa, käyttöoikeusmallia ja OAuth-tukea.

</div>

## Kirjautumisvirta

### Tavallinen kirjautuminen

```
POST /membership/users/login
```

**Todennus:** Julkinen

Hyväksyy yhden kolmesta tunnistetiedon tyypistä:

| Kenttä | Kuvaus |
|-------|-------------|
| `email` + `password` | Tavallinen sähköposti/salasana-kirjautuminen |
| `jwt` | Todenna uudelleen olemassa olevalla JWT:llä |
| `authGuid` | Kertakäyttöinen todennuslinkki (käytetään tervetuloa- ja salasanan palautussähköposteissa) |

**Vastaus:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

`token`-kenttä on JWT, joka lähetetään seuraavissa pyynnöissä otsikossa `Authorization: Bearer <token>`.

### Kaksivaiheinen kirjautuminen

Käyttäjät voivat ottaa käyttöön todennussovellukseen perustuvan (TOTP) kaksivaiheisen kirjautumisen. Näille käyttäjille `email` + `password`-, `authGuid`- tai SSO-kirjautuminen ei palauta tunnusta. Sen sijaan vastaus on haaste:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Haastetunnus on voimassa 5 minuuttia. Lähetä se takaisin samaan päätepisteeseen koodin kanssa:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` voi olla nykyinen 6-numeroinen todennussovelluksen koodi tai yksi käyttäjän kymmenestä kertakäyttöisestä varakoodista. Väärä koodi palauttaa virheen `Invalid code`, ja toistuvat epäonnistumiset rajoitetaan tilikohtaisesti. `jwt`-uudelleenkirjautumiseen ei koskaan vaadita haastetta, joten olemassa olevat istunnot jatkavat uusiutumista. Kirjautumisvastauksen `user`-objektissa on kenttä `mfaEnabled`.

Itsepalvelupäätepisteet (vain kirjautunut käyttäjä, polun `/membership/users/mfa` alla):

| Päätepiste | Kuvaus |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Aloittaa käyttöönoton; palauttaa `{ secret, otpauthUrl }` QR-koodia varten |
| `POST /enable` | Runko `{ code }`; ottaa käyttöön ja palauttaa `{ backupCodes }` kerran |
| `POST /disable` | Runko `{ code }` (todennussovelluksen tai varakoodi); poistaa käytöstä |
| `POST /reset/:userId` | Vain Server.Admin; poistaa käytöstä toiselta käyttäjältä |

Salaisuudet tallennetaan salattuina ja varakoodit tiivisteinä. Käyttöönotto, poistaminen ja nollaus kirjataan tarkastuslokiin.

### Tunnuksen sisältö

JWT sisältää:
- `id`: käyttäjän tunniste
- `churchId`: tällä hetkellä valittu seurakunta
- `personId`: henkilötietue valitussa seurakunnassa
- kunkin API:n käyttöoikeustaulukot

### Seurakunnan valinta

Käyttäjät voivat kuulua useisiin seurakuntiin. Kirjautumisvastaus sisältää kaikki seurakunnat käyttöoikeuksineen. Seurakunnan vaihtamiseksi asiakas luo uuden JWT:n, joka on rajattu toiseen seurakuntaan kirjautumisvastauksen tietojen perusteella.

## Käyttäjän rekisteröinti

### Uuden käyttäjän rekisteröinti

```
POST /membership/users/register
```

**Todennus:** Julkinen

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Luo käyttäjän väliaikaisella salasanalla ja lähettää tervetuloa-sähköpostin todennuslinkin kanssa. Ensimmäinen uudessa asennuksessa rekisteröity käyttäjä saa automaattisesti palvelimen ylläpitäjän käyttöoikeuden.

Hyväksytään kaksi valinnaista botti-ansakenttää: `website` (piilotettu houkutuskenttä, jonka todelliset käyttäjät jättävät tyhjäksi) ja `fillMs` (kuinka kauan lomake oli auki millisekunteina). Jos `website` on täytetty tai `fillMs` on alle 2000, tiliä ei luoda, mutta päätepiste palauttaa silti normaalin näköisen `200`-vastauksen, jotta botit eivät huomaa hylkäämistä. Asiakkaat, jotka jättävät molemmat kentät pois, rekisteröityvät tavalliseen tapaan.

### Uuden seurakunnan rekisteröinti

```
POST /membership/churches/add
```

**Todennus:** JWT

Kun käyttäjä on rekisteröity, kutsu tätä päätepistettä seurakunnan luomiseksi ja käyttäjän liittämiseksi siihen.

## Salasanan hallinta

| Menetelmä | Polku | Todennus | Kuvaus |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Julkinen | Lähettää salasanan palautussähköpostin. Runko: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Julkinen | Asettaa uuden salasanan palautussähköpostin todennus-GUID:llä. Runko: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Vaihtaa nykyisen käyttäjän salasanan. Runko: `{ "newPassword": "..." }` |

## Käyttöoikeusmalli

Käyttöoikeudet on järjestetty moduulien mukaan ja määritetään käyttäjille roolien kautta. Jokaisella käyttöoikeudella on **sisältötyyppi** ja **toiminto**.

### Käyttöoikeusviite

| Näkymän osio | Sisältötyyppi | Toiminto | Kuvaus |
|----------------|--------------|--------|-------------|
| **Osallistuminen** | Attendance | Checkin | Kirjaa jäsenet sisään jumalanpalveluksiin |
| | Attendance | Edit | Muokkaa osallistumistietueita |
| | Services | Edit | Hallinnoi jumalanpalveluksia ja niiden aikoja |
| | Attendance | View | Näytä osallistumistietueet |
| | Attendance | View Summary | Näytä osallistumisyhteenvedot ja raportit |
| **Lahjoitukset** | Donations | Edit | Luo ja muokkaa lahjoitustietueita |
| | Settings | Edit | Muokkaa lahjoitus- ja maksuasetuksia |
| | Donations | View Summary | Näytä lahjoitusyhteenvetoraportit |
| | Donations | View | Näytä yksittäiset lahjoitustietueet |
| **Henkilöt ja ryhmät** | Forms | Admin | Lomakkeiden täysi hallinta |
| | Forms | Edit | Muokkaa lomakemääritelmiä |
| | Plans | Edit | Muokkaa jumalanpalvelussuunnitelmia |
| | Group Members | Edit | Lisää tai poista ryhmän jäseniä |
| | Groups | Edit | Luo ja muokkaa ryhmiä |
| | Households | Edit | Muokkaa perhemääritöitä |
| | People | Edit | Muokkaa mitä tahansa henkilötietuetta |
| | People | Edit Self | Muokkaa vain omaa henkilötietuettasi |
| | Roles | Edit | Hallinnoi rooleja ja käyttäjämääryksiä |
| | Group Members | View | Näytä ryhmän jäsenluettelot |
| | People | View Members | Näytä vain jäsenet (ei vierailijoita) |
| | People | View | Näytä kaikki henkilöt |
| | Roles | View | Näytä roolit ja määritykset |
| | Settings | Edit | Muokkaa seurakunnan asetuksia |
| **Sisältö** | Content | Edit | Muokkaa sivuja, osioita ja elementtejä |
| | Settings | Edit | Muokkaa sisältöasetuksia |
| | StreamingServices | Edit | Hallinnoi suoratoistopalvelun määrityksiä |
| | Chat | Host | Isännöi ja moderoi keskusteluistuntoja |
| **Viestintä** | Texting | Send | Lähetä tekstiviestejä (SMS) |

### Käyttöoikeuksien tarkistus

Kontrollereissa käyttöoikeudet tarkistetaan `au.checkAccess()`-metodilla:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Palvelimen ylläpitäjä

`Server.Admin`-käyttöoikeus antaa täyden pääsyn kaikkiin seurakuntiin. Se myönnetään ensimmäiselle rekisteröidylle käyttäjälle, ja sen voi myöntää muille palvelimen ylläpitäjän roolin kautta.

## OAuth 2.0

API tukee OAuth 2.0:aa kolmannen osapuolen integraatioihin. Saatavilla on kaksi myöntötyyppiä.

### Valtuutuskoodivirta

1. **Valtuuta:** `POST /membership/oauth/authorize` (vaaditaan JWT)
   - Runko: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge`- ja `code_challenge_method`-kentät (PKCE, vain `S256`) vaaditaan julkisille asiakkaille ilman salaisuutta
   - Palauttaa: `{ "code": "...", "state": "..." }`

2. **Vaihda koodi tunnukseen:** `POST /membership/oauth/token` (Julkinen)
   - Runko: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Lähetä `code_verifier`, kun valtuutusvaiheessa käytettiin `code_challenge`-kenttää; julkiset asiakkaat jättävät `client_secret`-kentän pois. Sekä JSON- että lomakekoodatut rungot hyväksytään
   - Palauttaa: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Päivitä tunnus:** `POST /membership/oauth/token` (Julkinen)
   - Runko: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Käyttötunnukset vanhenevat **12 tunnin** kuluttua.

### Laitekoodivirta (RFC 8628)

Laitteille ilman selainta (TV-sovellukset, infopisteet):

1. **Pyydä laitekoodi:** `POST /membership/oauth/device/authorize` (Julkinen)
   - Runko: `{ "client_id": "...", "scope": "..." }`
   - Palauttaa: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Käyttäjä syöttää koodin** vahvistus-URI:ssa ja hyväksyy tai hylkää sen

3. **Kysele tunnusta:** `POST /membership/oauth/token` (Julkinen)
   - Runko: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Palauttaa `authorization_pending`, kunnes hyväksyntä on tehty, ja sen jälkeen käyttötunnuksen

### OAuth-asiakkaiden hallinta

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Luettele kaikki OAuth-asiakkaat |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Hae asiakas tunnuksella |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Hae asiakas asiakastunnuksella (salaisuus piilotettu) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Luo tai päivitä asiakas |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Poista asiakas |
| POST | `/membership/oauth/register` | Julkinen | — | Dynaaminen asiakasrekisteröinti (RFC 7591) julkisille asiakkaille, kuten MCP-liittimille. Katso [Yhdistetyt sovellukset](../connected-apps.md#dynamic-client-registration) |

### Laitehyväksynnän päätepisteet

| Menetelmä | Polku | Todennus | Kuvaus |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Hae odottavan laitekoodin tiedot hyväksyntänäkymää varten |
| POST | `/membership/oauth/device/approve` | JWT | Hyväksy laitevaltuutus. Runko: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Hylkää laitevaltuutus. Runko: `{ "user_code": "..." }` |

## Julkiset ja todennetut päätepisteet

API käyttää kahta käärefunktiota, jotka määrittävät todennusvaatimukset:

- **`actionWrapper`**: Vaatii voimassa olevan JWT:n. Todennettu käyttäjäobjekti (`au`) on käytettävissä `churchId`:n, `userId`:n ja käyttöoikeustarkistusten kanssa.
- **`actionWrapperAnon`**: Ei vaadi todennusta. Käytetään kirjautumiseen, rekisteröintiin, julkisiin sisältöhakuihin ja webhook-vastaanottimiin.

Tämän dokumentaation päätepistetaulukoissa nämä merkitään Todennus-sarakkeeseen vastaavasti **JWT** ja **Julkinen**.

## Aiheeseen liittyvät sivut

- [Moduulirakenne](../module-structure.md): Kuinka kontrollerit, repositoriot ja mallit on järjestetty
- [Paikallinen asennus](../local-setup.md): API:n ajaminen paikallisesti kehitystä varten
