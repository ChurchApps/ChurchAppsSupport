---
title: "Mobile Message"
description: "Yhdistä B1 Adminin tapahtumat Mobile Message -palveluun (australialainen SMS-rajapinta) Zapierilla tai Makella tervetulo-, lahjoitus- ja muistutusviesteihin."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) on australialainen SMS-rajapinta, joka on suosittu Australian seurakuntien keskuudessa. Se tarjoaa paikallisia numeroita ja kilpailukykyisen hinnoittelun Australiassa, kun taas Clearstream ja Text In Church keskittyvät Yhdysvaltoihin. Mobile Messagella ei tällä hetkellä ole ensiluokkaista Zapier-sovellusta, mutta se julkaisee julkisen REST-rajapinnan. Voit siis yhdistää B1-tapahtumat Mobile Message -tekstiviesteihin **Webhooks by Zapierin** (tai Maken HTTP-moduulin) avulla muutamassa minuutissa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Mobile Message](https://mobilemessage.com.au) -tili, jolla on rekisteröity lähettäjän tunnus (Sender ID) ja API-tunnukset (API-käyttäjätunnus ja salasana kohdassa *Tili → API-asetukset*)
- [Zapier](https://zapier.com)-tili (tai [Make](https://www.make.com))
- B1Admin-käyttäjä, jolla on **Muokkaa asetuksia** -oikeus

</div>

## Mitä voit yhdistää

Mobile Messagen rajapinta on luonteeltaan "lähetä SMS" -tyyppinen. Siinä ei ole laukaisimia, vain lähtevää tekstiä. Kaikki reseptit ovatkin muotoa B1 → SMS:

| Suunta | B1-laukaisin | Lopputulos |
|---|---|---|
| B1 → Mobile Message | `person.created` | Tervetuloviesti uudelle henkilölle |
| B1 → Mobile Message | `donation.created` | Kiitosviesti lahjoittajalle |
| B1 → Mobile Message | `form.submission.created` | Hälytä päivystävä tiimi |
| B1 → Mobile Message | `event.created` | Muistutuslähetys listalle |

## Asennus

### 1. Luo B1-API-avain

**Asetukset → Kehittäjä → API-avaimet → Uusi API-avain**:

- `settings:write` — laukaisimen webhookin rekisteröintiin
- `people:read` — vastaanottajan puhelinnumeron hakemiseen `personId`:n perusteella

### 2. Rakenna Zap Webhooks by Zapierillä

1. **Laukaisin** — B1.church: valitse haluamasi tapahtuma (esim. Uusi lahjoitus).
2. **Toiminto** — B1.church: Etsi henkilö (käyttäen `data.personId`:tä) hakeaksesi puhelinnumero ja nimi.
3. **Toiminto** — Webhooks by Zapier: **POST**. Määritä alla olevan mukaisesti.

POST-vaiheen asetukset:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier lisää tämän automaattisesti)
- **Basic Auth** — aseta *Basic Auth* -kenttään `<api_username>|<api_password>` (Zapier muuntaa tämän oikeaksi `Authorization: Basic …` -otsakkeeksi)

Käynnistä Zap. Lähetä testilahjoitus B1Adminissa varmistaaksesi, että tekstiviesti saapuu.

## Yleisiä reseptejä

### Tapahtumamuistutukset aamulla

- **Laukaisin** — Schedule by Zapier (päivittäin klo 7)
- **Toiminto** — B1.church: Etsi tämän päivän tapahtumat (tai käytä Etsi-vaihetta kiinteällä päivämäärärajauksella, tai tallenna tämän päivän tapahtumalista Google Sheetiin)
- **Toiminto** — Webhooks by Zapier: POST Mobile Messageen tapahtumalistan kanssa rekisteröidylle tilaajaryhmälle

### Käytä erätoimintoa listalähetykseen

Mobile Messagen `/v1/messages`-päätepiste hyväksyy enintään 10 000 viestiä kutsua kohden. Lähettääksesi B1-ryhmälle:

- **Laukaisin** — B1.church: Uusi lomakelähetys (rajaa tiettyyn lomakkeeseen)
- **Toiminto** — B1.church: Listaa kohderyhmän jäsenet (*Webhooks by Zapier — GET* -vaiheen kautta päätepisteessä `/membership/groupmembers?groupId=…`)
- **Toiminto** — Formatter by Zapier → Utilities → Line-itemize: muunna vastaus `messages`-taulukoksi
- **Toiminto** — Webhooks by Zapier: POST koko taulukko päätepisteeseen `/v1/messages`

### Make-vaihtoehto

Jos haluat käyttää Makea, lisää **HTTP — Make a request** -moduuli B1 Watch Events -laukaisimen jälkeen. Määritä se samalla tavalla (POST, Basic Auth, JSON-runko). B1-puolen ohjeet löydät [Make-yleiskatsauksesta](../make.md).

## Rajoitukset ja huomiot

- **Basic Auth on ainoa todennusmenetelmä.** Mobile Message antaa käyttäjätunnuksen ja salasanan kojelaudalta. Käsittele molempia salaisuuksina.
- **`sender` on oltava Mobile Message -tilillesi rekisteröity lähettäjän tunnus.** Muuten lähetys palauttaa virheen `400 Invalid sender`. Australian säännökset edellyttävät lähettäjän rekisteröintiä.
- **Australialaiset puhelinnumerot** voivat olla muodossa `0412345678` (paikallinen) tai `+61412345678` (kansainvälinen). Rajapinta hyväksyy molemmat, mutta jos lähetät myös ulkomaille, normalisoi numerot muotoon `+61…`.
- **Enintään 10 000 viestiä pyyntöä kohden.** Tämä on hyödyllinen lähetyksiin, mutta yksittäinen B1-webhook-toimitus tuottaa harvoin näin suuren listan. Varaa erätoiminto ajastetuille massa-Zapeille.

## Vianmääritys

- **POST palauttaa `401 Unauthorized`** — Basic Auth -tunnukset ovat väärin. Kopioi ne uudelleen Mobile Messagen kojelaudalta kohdasta *Tili → API-asetukset*. Huomaa, että käyttäjätunnus on oletuksena tilisi sähköpostiosoite, ei erillinen API-avain.
- **POST palauttaa `400 Invalid sender`** — `sender`-arvo ei ole tilillesi rekisteröity lähettäjän tunnus. Rekisteröi se ensin Mobile Messagen kojelaudalla.
- **Teksti saapuu, mutta se on katkaistu** — Mobile Message jakaa yli noin 160 merkin viestit useampaan osaan, ja veloitus määräytyy osien mukaan. Tarkista vastauksen runko, sieltä näet osien määrän.

## Katso myös

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — vaihtoehtoiset SMS-palveluntarjoajat, joilla on natiivi Zapier-sovellus (Webhooks by Zapier -vaihetta ei tarvita)
- [Zapier (yleiskatsaus)](../zapier.md) — B1-puoli jokaiselle Zapier-reseptille
- [Mobile Message API -dokumentaatio](https://mobilemessage.com.au/api-documentation)
