---
title: "ChatGPT"
description: "Yhdistä ChatGPT seurakuntasi B1-tietoihin API-avaimella, jotta voit esittää selkokielisiä kysymyksiä ihmisistä, lahjoituksista ja läsnäolosta B1 Adminissa."
---

# ChatGPT

<div class="article-intro">

Yhdistä ChatGPT seurakuntasi B1-tietoihin ja kysy siltä asioita tavallisella kielellä. Se vastaa livetiedoilla seurakuntasi rekistereistä. Voit myös pyytää sitä auttamaan asioissa, jotka vaatisivat B1 Adminissa useita vaiheita.

**Joitain kysymyksiä, joita voit esittää:**
- *"Näytä kaikki, jotka osallistuivat viime viikolla, mutta joita ei ole vielä lisätty pienryhmään"*
- *"Tiivistä tämän kuukauden lahjoitukset rahastoittain"*
- *"Keitä ovat uusimmat jäsenemme, ja olemmeko ottaneet heihin yhteyttä?"*
- *"En keksi, miten teen X:n B1:ssä. Voitko opastaa minua vaihe vaiheelta?"*

</div>

<div class="prereqs">
<h4>Mitä tarvitset</h4>

- **ChatGPT-työpöytäsovellus** Macille tai Windowsille
- **Maksullinen ChatGPT-tilaus** (Plus tai korkeampi). Ilmaiset ChatGPT-tilit eivät voi yhdistyä B1:een.
- **B1-kirjautumistietosi** oikeuksilla hallita seurakunnan asetuksia (tarvitaan avaimen luomiseen). Eikö sinulla ole niitä? Kysy seurakuntasi B1-ylläpitäjältä.

</div>

:::tip Suositus: kokeile ensin Claudea, se on ilmainen
[Claude](./claude.md) yhdistyy B1:een **ilmaisella tilauksella**, ja käyttöönotto kestää alle 3 minuuttia. Lisää B1 yhdistimeksi ja kirjaudu B1-tililläsi. Avainta ei tarvita. Se on helpoin tapa, jolla seurakuntasi voi kokeilla tekoälyä B1:n kanssa ennen maksamista.
:::

## Asennus

Näytöt voivat näyttää hieman erilaisilta ChatGPT-versiossasi.

---

**Vaihe 1: Luo B1-avain**

Avain antaa ChatGPT:lle pääsyn *seurakuntasi* B1:een. Ajattele sitä salasanana, joka on tarkoitettu vain ChatGPT:lle.

1. Kirjaudu [B1 Adminiin](https://admin.b1.church) ja siirry kohtaan [Asetukset → Kehittäjä](https://admin.b1.church/settings/developer).
2. Valitse **API Keys** -välilehdeltä **New API Key** ja anna avaimelle nimi `ChatGPT`.
3. **Oikeudet:** valitse, mitä ChatGPT saa tehdä. Jokaisella alueella on **read**-ruutu (vain katselu) ja **write**-ruutu (muutokset). Etkö ole varma? Valitse aluksi vain **read**-ruudut.
4. Napsauta **Save** ja kopioi avain painamalla **Copy**. Avain alkaa `cak_`-merkeillä. Se näytetään vain kerran.

---

**Vaihe 2: Napsauta ChatGPT:n vasemmassa alakulmassa olevaa nimeäsi**

![Napsauta profiilisi nimeä](/img/guides/chatgpt-mcp/01.png)

---

**Vaihe 3: Valitse Settings**

![Valitse Settings valikosta](/img/guides/chatgpt-mcp/02.png)

---

**Vaihe 4: Napsauta vasemmassa sivupalkissa kohtaa Plugins**

![Napsauta kohtaa Plugins Integrations-osiossa](/img/guides/chatgpt-mcp/03.png)

---

**Vaihe 5: Napsauta MCPs-välilehteä**

![Napsauta MCPs-välilehteä](/img/guides/chatgpt-mcp/04.png)

Näet tässä kaikki jo lisäämäsi MCP-palvelimet.

---

**Vaihe 6: Napsauta Add → Add MCP server**

![Napsauta Add ja sitten Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Vaihe 7: Täytä lomake ja napsauta Save**

![Lomake mukautetun MCP-palvelimen yhdistämiseen](/img/guides/chatgpt-mcp/07.png)

Napsauta **Streamable HTTP** ja täytä sitten kentät:

| Kenttä | Mitä syötetään |
|---|---|
| **Name** | `B1 Church` (tai mikä tahansa nimi) |
| **Type** | Napsauta **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Jätä tyhjäksi |
| **Headers** | Napsauta **+ Add header** → Key: `Authorization` → Value: katso alla |

![Täytetty esimerkki, jossa Key on Authorization ja Value on Bearer-avain](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_avaimesi`. Sana Bearer, välilyönti ja avaimesi.

Napsauta **Save**.

Valmista! Palaa keskusteluun ja kysy esimerkiksi *"Kuinka monta ihmistä seurakunnassamme on?"*. ChatGPT hakee vastauksen suoraan B1:stä.

---

## Onko se turvallista?

- ChatGPT näkee vain **seurakuntasi** tiedot.
- Se voi tehdä vain sen, mihin avaimesi antaa luvan. Avain, jossa on vain **read**-ruudut valittuina, voi vain katsella eikä koskaan muuttaa mitään.
- Voit sammuttaa yhteyden poistamalla avaimen B1 Adminissa kohdasta **Asetukset → Kehittäjä**. Pääsy loppuu heti.

## Mitä se maksaa?

B1-yhteys on ilmainen, sillä se kuuluu ChurchAppsiin. ChatGPT vaatii yhdistämiseen maksullisen tilauksen (Plus tai korkeampi). Katso hinnat OpenAI:n sivuilta.

## Tekniset tiedot

Tämä sivun loppuosa on tarkoitettu teknisille käyttäjille ja tekoälyavustajille. B1:n MCP-palvelin on osoitteessa `https://api.churchapps.org/mcp` (Streamable HTTP), ja se ottaa API-avaimen vastaan `Authorization: Bearer cak_…` -otsakkeena. Katso [MCP Server -kehittäjäohje](/docs/developer/api/mcp).

### Mukautettu GPT ja toiminnot

Mukautetun GPT:n avulla voit luoda oman avustajan, jonka koko tiimisi voi jakaa. He avaavat linkin ja voivat alkaa kysyä kysymyksiä ilman mitään asennusta. Tarvitset ChatGPT Plus-, Team- tai Enterprise-tilin, ja käyttöönotto kestää noin 10 minuuttia.

#### 1. Luo API-avain

Seuraa kohdan Asennus vaihetta 1, jos et ole vielä tehnyt sitä.

#### 2. Rakenna mukautettu GPT

1. Napsauta ChatGPT:ssä profiiliasi → **My GPTs** → **Create a GPT**.
2. Siirry **Configure**-välilehdelle, anna GPT:lle nimi (esim. "B1 Assistant") ja lisää ohjeet:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Vieritä kohtaan **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** liitä `cak_…`-avaimesi
   - **Auth Type:** Bearer
   - Tallenna.

4. Liitä **Schema**-ruutuun tämä OpenAPI-aloitusmäärittely:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Tallenna toiminto ja testaa sitä kysymällä: *"montako ihmistä seurakunnassa on?"*. ChatGPT kutsuu `listPeople`-toimintoa ja vastaa.
6. **Julkaise** GPT (Only me / Anyone with link / Organization) ja jaa linkki tiimillesi.

#### 3. Käyttö

Kuka tahansa linkin omistava voi esittää kysymyksiä luonnollisella kielellä. Avaimen oikeudet ovat voimassa edelleen. Vain luku -avain estää muutokset riippumatta siitä, mitä toimintoskeema sanoo.

---

### Turvallisuus ja rajoitukset

- **Seurakuntakohtainen eristys.** API-avain liittyy vain yhteen seurakuntaan. ChatGPT ei näe muiden seurakuntien tietoja.
- **Oikeuksiin sidottu.** Avain sisältää vain ne oikeudet, jotka annoit. Oikeuden poistaminen (poistamalla avain ja luomalla uusi) katkaisee pääsyn seuraavalla kutsulla.
- **Peruttavissa heti.** Poista avain kohdasta **Asetukset → Kehittäjä → API Keys**, niin pääsy päättyy välittömästi.
- **Mukautetun GPT:n jakaminen jakaa myös tiedot.** Kaikki, joilla on pääsy GPT:hen, näkevät sen, mitä avaimen oikeudet sallivat. Käytä laajalti jaettaviin GPT:ihin kapeampia oikeuksia (esim. jätä `donations:read` pois).
- **Tarkastusloki.** Kaikki ChatGPT:n kautta tehdyt muutokset kulkevat samaan tarkastuslokiin kuin B1 Adminin toiminnot. Löydät ne kohdasta **Asetukset → Audit Log**.

### Vianmääritys

**MCP-yhdistin ilmoittaa "Unauthorized" tai näyttää virheen 401:** API-avaimesi puuttuu tai on väärä. Avaa yhdistimen asetukset ja tarkista **Authorization**-otsake. Arvon pitää olla sana `Bearer`, yksi välilyönti ja koko `cak_…`-avain ilman ylimääräisiä välilyöntejä.

**ChatGPT sanoo, ettei löydä tiettyjä tietoja:** avaimella ei ehkä ole oikeita oikeuksia. Luo uusi avain kohdassa **Asetukset → Kehittäjä → API Keys** lisäoikeuksilla ja päivitä yhdistin.

**Mukautetun GPT:n toiminto palauttaa 401:** tarkista toiminnon todennusikkunasta, että **Auth Type: Bearer** on valittuna ja että avain ei sisällä sanaa `Bearer` (ChatGPT lisää sen automaattisesti).

**Mukautetun GPT:n toiminto palauttaa 403:** avaimella ei ole oikeutta kyseiseen päätepisteeseen. Luo uusi avain oikeilla oikeuksilla ja päivitä GPT.

**Toimintoskeema hylätään:** ChatGPT vaatii OpenAPI 3.1 -määrityksen, jossa on vähintään yksi `paths`-merkintä ja `servers`-URL. Tarkista YAML osoitteessa [editor.swagger.io](https://editor.swagger.io) ennen liittämistä.

## Katso myös

- [API-avaimet](/docs/developer/api/api-keys): kaikkien oikeuksien luettelo
- [MCP Server (kehittäjäohje)](/docs/developer/api/mcp): protokollan tiedot ja työkalujen skeemat
- [Claude](./claude.md): sama idea Anthropicin malleille
- [REST API -viiteohje](/docs/developer/api/endpoints): kaikki päätepisteet, joita mukautettu GPT-toiminto voi kutsua
