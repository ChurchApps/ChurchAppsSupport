---
title: "API-avaimet"
---

# API-avaimet

<div class="article-intro">

API-avaimet (henkilökohtaiset käyttöoikeustunnukset) ovat yksinkertaisin tapa tunnistautua B1 API:in palvelinpuolen skriptistä, kolmannen osapuolen liitännäisestä (Zapier, Make, Google Sheets) tai mistä tahansa paikasta, jossa täysi OAuth-kirjautumisprosessi on liian raskas. Avain on sidottu tiettyyn henkilöön tietyssä seurakunnassa, ja se perii tämän henkilön käyttöoikeudet. Käyttöoikeuksia voi rajata valinnaisella joukolla käyttöoikeusalueita (scope).

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Avaimia luo ja hallinnoi seurakunnan ylläpitäjä, jolla on **Muokkaa asetuksia** -käyttöoikeus
- Avain näytetään luonnin yhteydessä **vain kerran**. Tallenna se heti turvalliseen paikkaan.
- Kaikkien API-pyyntöjen on käytettävä **HTTPS**-yhteyttä

</div>

## Avaimen muoto

B1 API -avain näyttää tältä:

```
cak_<prefix>.<secret>
```

- `cak_` — kiinteä tunniste (API-avaimen etuliite, jonka mukaan todennuskerros tunnistaa avaimen)
- `<prefix>` — 8 merkin julkinen hakusegmentti
- `<secret>` — 48 merkin salainen osa. Palvelin tallentaa vain sen SHA-256-tiivisteen.

Koko avain välitetään palvelimelle tavallisessa bearer-otsikossa:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API:n todennuskerros ohjaa kaikki `cak_`-alkuiset tunnisteet API-avainpolulle, tiivistää salaisen osan, hakee avaimen etuliitteen perusteella ja selvittää avaimen henkilön ajantasaiset käyttöoikeudet. Tämän ansiosta B1Adminissa peruttu käyttöoikeus vaikuttaa jo seuraavassa pyynnössä, eikä avain koskaan poikkea roolista.

## Avaimen luominen (B1Admin)

1. Kirjaudu B1Adminiin käyttäjänä, jolla on **Muokkaa asetuksia** -käyttöoikeus.
2. Avaa **Asetukset → Kehittäjä → API-avaimet**.
3. Valitse **Uusi API-avain**, anna sille tunnistettava nimi (esim. "Zapier — lahjoitusten synkronointi"), valitse avaimelle sopivat käyttöoikeusalueet ja valitse **Tallenna**.
4. Koko `cak_…`-avain näytetään **kerran** ikkunassa. Kopioi se integraatiosi asetuksiin ennen ikkunan sulkemista, sillä sitä ei voi myöhemmin hakea uudelleen. Voit aina luoda uuden avaimen.

## Käyttöoikeusalueet (scopes)

Käyttöoikeusalue **rajaa** sitä, mitä avain voi tehdä. Se ei koskaan voi antaa oikeutta, jota taustalla oleva henkilö ei itse omaa. Jos alueita ei ole tai ne ovat tyhjiä, avain saa henkilön koko käyttöoikeusjoukon.

| Alue | Sallii |
|---|---|
| `people:read` / `people:write` | Henkilöiden, talouksien ja ryhmäjäsenten katselu / muokkaus |
| `groups:read` / `groups:write` | Ryhmien ja niiden jäsenyyksien katselu / muokkaus |
| `donations:read` / `donations:write` | Lahjoitusten katselu / kirjaaminen |
| `attendance:read` / `attendance:write` | Osallistumisen, tilaisuuksien ja sisäänkirjautumisten katselu / kirjaaminen |
| `forms:write` | Lomakkeiden hallinta (lukuoikeus sisältyy kirjoitusoikeuteen) |
| `content:read` / `content:write` | Verkkosivuston sisällön, ilmoittautumisten ja suoratoiston katselu / muokkaus |
| `messaging:read` / `messaging:write` | Viestien lukeminen. Kirjoitusoikeus sallii myös tekstiviestien lähettämisen. |
| `roles:read` / `roles:write` | Roolimääritysten katselu / muokkaus |
| `settings:read` / `settings:write` | Seurakunnan asetusten katselu / muokkaus (**vaaditaan** webhookien rekisteröintiin ohjelmallisesti) |
| `workflows:read` / `workflows:write` | Työnkulkujen ja tehtävien katselu / työnkulkujen suorittaminen ja muokkaus. Työnkulun suoritus voi lähettää sähköposteja ja tekstiviestejä, käynnistää webhookeja ja muuttaa ryhmäjäsenyyksiä. |
| `offline_access` | Sallii pitkäikäiset päivitystunnukset (vain OAuth-kirjautumisessa, ei vaikutusta API-avaimiin) |

`write`-alueet sisältävät automaattisesti vastaavan `read`-alueen. Palvelin- ja domain-ylläpitäjän käyttöoikeuksia ei ole tarkoituksella tuotu alueiksi. Rajattu tunnus ei siis voi koskaan nousta sivuston ylläpitäjän oikeuksiin.

:::tip
Jos aiot käyttää avainta webhookien rekisteröintiin (esim. Zapier- tai Make-integraatiossa), avaimella tulee olla `settings:write`-oikeus. Pelkällä `people:read`-oikeudella varustettu avain saa pyynnölle `POST /membership/webhooks` hiljaa virheen `403`.
:::

## Avaimen käyttö

Avainta käytetään kuten mitä tahansa bearer-tunnusta. Jokainen todennettu päätepiste hyväksyy API-avaimen samalla tavalla kuin JWT:n:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Jos pyynnön avaimella ei ole riittäviä käyttöoikeuksia, palvelin vastaa **403 Forbidden** -virheellä samassa muodossa kuin muutkin käyttöoikeuden puutteesta johtuvat virheet.

## Avainten hallinta API:n kautta

Kaikki päätepisteet sijaitsevat Membership-moduulin polun `/membership/apiKeys` alla. Ne vaativat JWT-tunnuksen (ei API-avainta) seurakunnan ylläpitäjältä, jolla on **Muokkaa asetuksia** -käyttöoikeus.

| Metodi ja polku | Tarkoitus |
|---|---|
| `GET /membership/apiKeys` | Listaa seurakunnan avaimet (ei salaista osaa, vain `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt` ja `createdAt`) |
| `GET /membership/apiKeys/scopes` | Listaa kaikki käytettävissä olevat käyttöoikeusalueiden nimet avainten luontinäkymää varten |
| `POST /membership/apiKeys` | Luo uusi avain. Runko: `{ "name": "...", "scopes": ["people:read"] }`. Vastaus sisältää raakan `cak_…`-avaimen **kerran**. |
| `DELETE /membership/apiKeys/:id` | Peruuta avain. Muutos tulee voimaan seuraavassa pyynnössä. |

Peruttu avain lakkaa toimimasta heti. Siinä ei ole armonaikaa.

## Hyviä käytäntöjä

- **Yksi avain per integraatio.** Jos jokin vaarantuu, peruutat vain yhden avaimen, eivätkä muut integraatiot katkea.
- **Luo mahdollisimman kapeat käyttöoikeudet, jotka riittävät.** Google Sheets -vienti tarvitsee vain `people:read`-oikeuden, ei `settings:write`-oikeutta.
- **Sido avain palvelutiliin, älä oikeaan työntekijään.** Jos työntekijä lähtee, hänen B1-käyttöoikeutensa päättyy, ja samalla päättyvät kaikki hänen tunnuksellaan luodut avaimet.
- **Säilytä avaimet salaisuuksien hallintapalvelussa** (isännöintipalvelusi ympäristömuuttujat, AWS Secrets Manager jne.) äläkä koskaan versionhallinnassa.
- **Vaihda avaimet**, jos epäilet niiden vuotaneen: luo uusi avain, päivitä integraatio ja poista vanha avain.

## Ero OAuthiin

API-avaimet sopivat, kun **seurakuntasi on ainoa, joka käyttää integraatiota**. Liitännäiselle, joka tarvitsee pääsyn moniin seurakuntiin kunkin seurakunnan nimenomaisella suostumuksella, kuten B1-yhteisön yhteiseen SaaS-sovellukseen, käytä sen sijaan [OAuth ja yhdistetyt sovellukset](./connected-apps) -ohjetta.

| | API-avain | OAuth |
|---|---|---|
| Kuka asentaa | Yksi seurakunnan ylläpitäjä | Jokainen seurakunnan ylläpitäjä valtuuttaa sovelluksen |
| Todennusotsikko | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Tunnuksen voimassaoloaika | Kunnes peruutetaan | Käyttötunnus noin 7 päivää, päivitystunnus noin 90 päivää |
| Parhaiten sopii | Sisäiset skriptit, Zapier/Make/Sheets-liitännäiset | Useita vuokralaisia palvelevat kolmannen osapuolen sovellukset |
