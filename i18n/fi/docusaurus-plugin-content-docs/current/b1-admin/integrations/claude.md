---
title: "Claude"
---

# Claude

<div class="article-intro">

Kysy Claudelta seurakunnastasi selkokielellä, ja se vastaa B1-tietojesi perusteella, mukaan lukien FreePlay-oppitunnit ja luokkahuoneet. Voit kysyä esimerkiksi *"kuinka monta ensikertalaista vierasta tuli sunnuntaina?"* tai *"kuka liittyi pienryhmään tässä kuussa?"*, tai pyytää tekemään jotain, kuten *"lisää verkkosivuillemme uusi sivu nimeltä Tapahtumat."* Käyttöönotto vie alle 3 minuuttia, eikä asennukseen tarvitse teknisiä taitoja tai ohjelmistoja.

</div>

<div class="prereqs">
<h4>Mitä tarvitset</h4>

- **Claude-tili.** **Ilmainen tilaus toimii** ja sopii hyvin kokeiluun. Ilmaisilla tileillä on kuitenkin päivittäinen viestiraja, ja B1-tietojen hakeminen kuluttaa viestejä nopeasti. Jos käytät sitä säännöllisesti, suosittelemme **Claude Pro -tilausta** (noin 20 dollaria kuukaudessa).
- **B1-kirjautumistietosi**, eli samat, joilla kirjaudut B1 Adminiin.

</div>

:::tip Suositus — voit kokeilla ilmaiseksi
Claude on helpoin tapa yhdistää B1 tekoälyyn, ja se toimii Clauden **ilmaisella tilauksella**. Se on täydellinen tapa, jolla seurakuntasi voi kokeilla ennen maksullisiin tilauksiin sitoutumista.
:::

Yhteyden voi muodostaa kahdella tavalla. **Vaihtoehto 1 on helpoin**, sillä avainta ei tarvita eikä mitään tarvitse asentaa.

## Vaihtoehto 1 — Kirjaudu B1-tunnuksilla (helpoin)

Toimii Clauden verkkosivuilla, Claude-työpöytäsovelluksessa ja Claude-puhelinsovelluksessa. Kun määrität sen kerran, se on käytössä kaikissa niissä.

### Vaihe 1 — Avaa Clauden liitinasetukset

1. Mene osoitteeseen [claude.ai](https://claude.ai) ja kirjaudu sisään (tai luo ilmainen tili).
2. Napsauta nimeäsi vasemmassa alakulmassa ja valitse **Asetukset** → **Liittimet**.

### Vaihe 2 — Lisää B1

1. Napsauta **Lisää** ja sitten **Lisää mukautettu liitin**.
2. **Nimi:** kirjoita `B1`.
3. **URL:** liitä `https://api.churchapps.org/mcp`
4. Jätä muut asetukset ennalleen ja napsauta **Lisää**.

### Vaihe 3 — Kirjaudu B1:een

1. Napsauta **Yhdistä**. Avautuu B1:n kirjautumissivu.
2. Kirjaudu B1-tilillesi. Jos kuulut useampaan seurakuntaan, tarkista, että oikea seurakunta näkyy yläreunassa.
3. B1 näyttää, mitä Claude pyytää tekemään, ja vahvistaa, että sinut ohjataan takaisin sivulle **claude.ai**. Napsauta **Salli**.

Olet takaisin Claudessa, ja B1 näkyy yhdistettynä.

### Vaihe 4 — Kysy jotain

Aloita **uusi keskustelu** ja kokeile esimerkiksi:

- *"Kuinka monta ihmistä seurakunnassamme on?"*
- *"Listaa aktiiviset ryhmämme."*
- *"Tiivistä tämän kuun lahjoitukset rahastoittain."*
- *"Kuka liittyi seurakuntaan viimeisen 30 päivän aikana?"*

Ensimmäisellä kerralla Claude pyytää lupaa käyttää B1:tä. Napsauta **Salli**.

## Vaihtoehto 2 — Työpöytälaajennus B1-avaimella

Käytä tätä, jos haluat antaa Claudelle avaimen, jolla on rajatut oikeudet (esimerkiksi vain lukuoikeus). Se toimii Claude-työpöytäsovelluksessa Macille tai Windowsille, ja avaimen luomiseen tarvitset oikeuden hallita seurakunnan asetuksia B1:ssä.

### Vaihe 1 — Hanki Claude-sovellus

Lataa Claude-sovellus osoitteesta [claude.com/download](https://claude.com/download), asenna se, avaa se ja kirjaudu sisään.

### Vaihe 2 — Luo B1-avain

Avain on se, joka antaa Claudelle pääsyn *sinun* seurakuntasi B1:een. Ajattele sitä salasanana, joka on tarkoitettu vain Claudelle.

1. Kirjaudu [B1 Adminiin](https://admin.b1.church) ja mene kohtaan [Asetukset → Kehittäjä](https://admin.b1.church/settings/developer).
2. Valitse **API-avaimet**-välilehti ja napsauta **Uusi API-avain**.
3. **Nimi:** kirjoita `Claude`.
4. **Scopes:** valitse, mitä Claude saa tehdä. Jokaisella alueella on **luku**-ruutu (vain katselu) ja **kirjoitus**-ruutu (muutosten tekeminen). Etkö ole varma? Valitse aluksi vain **luku**-ruudut. Voit luoda myöhemmin uuden avaimen, jolla on enemmän oikeuksia.
5. Napsauta **Tallenna** ja sitten **Kopioi** avain. Se näytetään vain kerran, joten siirry suoraan vaiheeseen 3.

### Vaihe 3 — Lisää B1 Claudeen

1. [Lataa B1-laajennus](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Kaksoisnapsauta** ladattua tiedostoa (`b1-churchapps.mcpb`). Claude avautuu ja näyttää **B1 (ChurchApps)**.
3. Napsauta **Asenna**.
4. Kun se pyytää **B1-API-avainta**, liitä vaiheen 2 avain ja tallenna.
5. **Sulje Claude kokonaan** (Mac: **Cmd+Q** · Windows: napsauta hiiren oikealla Claude-kuvaketta tehtäväpalkissa → **Sulje**) ja avaa se uudelleen.

Jos kaksoisnapsautus ei avaa Claudea, mene Claudessa kohtaan **Asetukset → Laajennukset → Lisäasetukset → Asenna laajennus…** ja valitse ladattu tiedosto. Aloita sitten uusi keskustelu ja kysy jotain.

:::tip Oletko jo asentanut laajennuksen?
Mitään ei tarvitse tehdä. FreePlay toimii saman yhteyden kautta. Poikkeuksena on versio 1.1.0, joka pyysi B1-sähköpostia ja salasanaa. Lataa laajennus uudelleen ja asenna se päivittääksesi. Avaimesi säilyy.
:::

## Onko se turvallinen?

- Claude näkee vain **seurakuntasi** tiedot.
- **Kirjautuneena (vaihtoehto 1):** Claude ei voi koskaan tehdä enempää kuin oma B1-kirjautumisesi. B1:n kirjautumissivu listaa kaiken, mitä Claude saa tehdä, ennen kuin napsautat **Salli**.
- **Avaimella (vaihtoehto 2):** Claude voi tehdä B1:ssä vain sen, mitä avain sallii. Avain, jossa on vain **luku**-ruudut valittuna, voi katsella tietoja, mutta ei koskaan muuttaa mitään. FreePlay toimii samalla tavalla saman avaimen kautta.
- **Yhteyden poistaminen:** Mene B1 Adminissa kohtaan **Asetukset → Kehittäjä** ja peru sovelluksen käyttöoikeus kohdasta **Yhdistetyt sovellukset** (vaihtoehto 1) tai poista avain kohdasta **API-avaimet** (vaihtoehto 2). Pääsy päättyy heti. Voit myös napsauttaa Clauden B1-liittimessä **Katkaise yhteys**.

## Mitä se maksaa?

B1-yhteys on ilmainen, ja se kuuluu ChurchAppsiin. Claudella on oma ilmainen tilaus. Claude Pro (noin 20 dollaria kuukaudessa) antaa paljon enemmän käyttöä. Katso [claude.com/pricing](https://claude.com/pricing).

## Tekniset tiedot

Tämä sivun loppuosa on tarkoitettu teknisille käyttäjille ja tekoälyavustajille: oikeusalueille, muille yhteystavoille ja toimintaperiaatteelle.

### Oikeusalueet (scopes)

Claude keskustelee B1:n kanssa B1-API:in sisäänrakennetun **Model Context Protocol (MCP) -palvelimen** kautta (`https://api.churchapps.org/mcp`). Jokainen kutsu kulkee samojen todennus-, oikeus- ja seurakuntarajausten läpi kuin pyyntö B1 Administa. Claude on rajattu API-avaimen **oikeuksiin ja oikeusalueisiin**, eikä se pääse webhookeihin, OAuth-hallintapäätepisteisiin tai muihin vain ylläpitäjän käyttämiin polkuihin.

Yleisiä aloitusjoukkoja oikeusalueille:

- **Vain luku -avustaja:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Luku sekä muistiinpanojen ja tehtävien lisääminen:** lisää `people:write`
- **Täysi operatiivinen avustaja:** lisää halumasi vastaavat `:write`-oikeusalueet

`donations:read`-avaimella Claude voi tiivistää lahjoitukset, mutta ei kirjata lahjoitusta. `people:write`-avaimella Claude voi lisätä henkilön, mutta ei nähdä lahjoituksia. Katso, mitä kukin oikeusalue sallii, sivulta [API-avaimet](/docs/developer/api/api-keys).

### Muita yhteystapoja

#### Claude Code (CLI)

Terminaalissa:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Siinä kaikki. Kirjoita mikä tahansa Claude Code -istunto `/mcp` varmistaaksesi, että `b1`-palvelin on yhdistetty, ja kysy sitten Claudelta mitä tahansa seurakuntaasi koskevaa.

#### Claude Desktop — manuaalinen asetus (edistynyt)

Jos et halua käyttää laajennusta, muokkaa Claude Desktopin asetustiedostoa:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Lisää `b1`-palvelimen merkintä, joka yhdistää B1:een `mcp-remote`-paketin kautta (vaatii [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Käynnistä Claude Desktop uudelleen. Keskustelun kirjoituskentän liitinvalikossa näkyy `b1` ja sen työkalut.

#### Claude.ai (verkko) — mukautettu liitin

Katso yllä **vaihtoehto 1**. Liitin käyttää OAuth 2.1:tä: Claude löytää B1:n valtuutuspalvelimen osoitteesta `https://api.churchapps.org/.well-known/oauth-protected-resource`, rekisteröityy Dynamic Client Registrationilla ja kirjautuu sisään PKCE:llä. Team- ja Enterprise-tilauksissa organisaation omistajan on ehkä lisättävä liitin ensin. Claude ei pyydä tiettyjä oikeusalueita, joten suostumussivulla näkyy kaikki, mihin kirjautunut B1-tili pääsee. Peru yhteys B1 Adminissa kohdasta **Asetukset → Kehittäjä → Yhdistetyt sovellukset**.

### Toimintaperiaate

B1-API tarjoaa yhden MCP-päätepisteen polussa `/mcp`. Claude yhdistää siihen, todentaa itsensä `cak_…`-avaimellasi ja saa käyttöönsä neljä työkalua:

| Työkalu | Mitä se tekee |
|---|---|
| `list_endpoints` | Listaa REST-päätepisteet, joita Claude voi kutsua, suodatettavissa polun mukaan. Käytetään löytämiseen. |
| `describe_endpoint` | Palauttaa tiivistelmän ja esimerkkipyynnön sekä -vastauksen tietylle päätepisteelle. |
| `api_call` | Kutsuu REST-päätepistettä todennetun käyttäjän nimissä. |
| `describe_page_builder` | Opas seurakuntasi verkkosivujen sivujen rakentamiseen ja muokkaamiseen. Claude lukee sen ennen verkkosisältöön liittyvää työtä. |

Tämä on sama `/membership/people`-, `/giving/donations`- ja `/attendance/visits`-pinta, jota B1 Admin käyttää. Kaikki käyttöoikeussäännöt pätevät täsmälleen samalla tavalla. FreePlay (lessons.church) -päätepisteet listataan kohdassa `/lessons/*`. Clauden kutsut niihin välitetään FreePlaylle samana käyttäjänä samoilla oikeuksilla.

### Turvallisuus ja rajoitukset

- **Seurakuntakohtainen eristys.** API-avain liittyy yhteen seurakuntaan. Claudella ei ole keinoa nähdä muiden seurakuntien tietoja.
- **Oikeuksien rajaus.** Jos poistat oikeuden henkilöltä, joka loi avaimen, B1 Adminissa, Claude menettää sen seuraavassa kutsussa, heti.
- **Peruttavissa.** Poista avain kohdasta **Asetukset → Kehittäjä → API-avaimet**, ja Clauden pääsy päättyy heti.
- **Estolista.** Palveluntarjoajien webhookit, OAuth-asiakkaiden hallintapäätepisteet ja vain ylläpitäjän käyttämä `apiEmails`-reitti eivät ole kutsuttavissa MCP:n kautta.
- **Vastauksen kokoraja.** Yksi työkalun vastaus on rajattu 64 KB:iin, jotta pitkät listat eivät täytä Clauden kontekstia. Kun näin käy, Claude rajaa kyselyä suodattimilla.
- **Tarkastusloki.** Muutokset kulkevat samaa tarkastuslokia kuin B1 Adminin toiminnot. Voit tarkastella niitä kohdassa **Asetukset → Tarkastusloki**.

### Vianmääritys

**Claude pyytää B1-sähköpostia ja salasanaa FreePlayn käyttöön:** sinulla on työpöytälaajennuksen versio 1.1.0. Lataa ja asenna se uudelleen päivittääksesi. Uudemmat versiot tarvitsevat vain avaimesi.

**Claude ilmoittaa "Unauthorized" tai 401:** kantatunnus puuttuu, on virheellinen tai avain on peruttu. Jos käytit laajennusta, avaa Claudessa **Asetukset → Laajennukset → B1 (ChurchApps)** ja liitä avain uudelleen. Muussa tapauksessa tarkista `Authorization: Bearer cak_…`-otsake (huomaa väli ja sana `Bearer` sellaisenaan).

**Työkalukutsu palauttaa 403:** API-avaimella ei ole oikeusaluetta kyseiseen päätepisteeseen. Lisää oikeusalue kohdassa **Asetukset → Kehittäjä → API-avaimet**. Sinun on luotava uusi avain, sillä oikeusalueita ei voi muuttaa jälkikäteen. Liitä uusi avain laajennuksen asetuksiin tai Clauden asetustiedostoon.

**Claude ei löydä päätepistettä:** pyydä sitä kutsumaan `list_endpoints` suodattimella, esimerkiksi *"käytä list_endpoints-työkalua suodattimella 'donations' löytääksesi oikean polun"*. Reittiluettelo luodaan elävästä API:sta, joten kaikki, mihin voit osua `curl`-komennolla, löytyy sieltä.

**Paikallinen kehitys:** vaihda `https://api.churchapps.org/mcp` osoitteeseen `http://localhost:8084/mcp`. Todennus ja työkalut ovat samat.

## Aiheeseen liittyvää

- [API-avaimet](/docs/developer/api/api-keys): täydellinen oikeusalueiden viite
- [MCP-palvelin (kehittäjäviite)](/docs/developer/api/mcp): protokollan yksityiskohdat ja työkalujen skeemat
- [ChatGPT](./chatgpt): sama idea OpenAI:n malleille
