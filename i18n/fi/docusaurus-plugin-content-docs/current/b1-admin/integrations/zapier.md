---
title: "Zapier"
description: "Yhdistä B1 Admin Zapieriin: automatisoi uusien henkilöiden, lahjoitusten ja ryhmäjäsenten käsittely ilman koodausta."
---

# Zapier

<div class="article-intro">

Virallinen B1.church-sovellus Zapierissä antaa Zapille mahdollisuuden reagoida seurakuntasi tapahtumiin (uusi henkilö, uusi lahjoitus, uusi ryhmän jäsen jne.) ja kirjoittaa tietueita takaisin B1:een. Koodausta tai omaa infrastruktuuria ei tarvita. Määrität yhteyden Zapierin vedä ja pudota -editorissa, liität API-avaimen ja otat Zapin käyttöön.

</div>

:::caution Odotetaan Zapierin hyväksyntää
B1.church-sovellus on rakennettu ja toimii, mutta se odottaa vielä Zapierin tarkastusta, ennen kuin se näkyy julkisesti Zap-editorin sovellushakemistossa. Sitä voivat käyttää vain kutsutut tilit, kunnes se on hyväksytty. Alla kuvataan, miten se toimii hyväksynnän jälkeen.
:::

<div class="prereqs">
<h4>Ennen kuin aloitat</h4>

- [Zapier](https://zapier.com)-tili (ilmainen taso riittää muutamalle Zapille)
- Seurakunnan ylläpitäjä, jolla on **Muokkaa asetuksia** -oikeus B1Adminissa (luot API-avaimen)
- Idea siitä, mitä haluat tehdä, esim. "kun B1:een lisätään henkilö, lisää hänet Mailchimp-listalleni"

</div>

## Triggerit ja toiminnot

| Tyyppi | Mitä | B1-tapahtuma / päätepiste |
|---|---|---|
| **Trigger** | Uusi henkilö | `person.created` |
| **Trigger** | Päivitetty henkilö | `person.updated` |
| **Trigger** | Uusi lahjoitus | `donation.created` |
| **Trigger** | Uusi ryhmän jäsen | `group.member.added` |
| **Trigger** | Uusi lomakevastaus | `form.submission.created` |
| **Toiminto** | Luo henkilö | lisää uuden henkilön |
| **Toiminto** | Lisää lahjoitus | kirjaa lahjoituksen |
| **Toiminto** | Lisää ryhmän jäsen | lisää henkilön ryhmään |
| **Toiminto** | Etsi henkilö | etsii henkilön tunnuksen, sähköpostin tai nimen perusteella; epäonnistuu, jos ketään ei löydy |

Näitä voi yhdistää vapaasti minkä tahansa Zapierin yli 7 000 tuetun sovelluksen kanssa.

## Asetukset

### 1. Luo B1-API-avain

1. Siirry B1Adminissa kohtaan **Asetukset → Kehittäjä → API-avaimet**.
2. Napsauta **Uusi API-avain**, anna sille nimi kuten "Zapier" ja valitse Zapin tarvitsemat oikeusalueet (scopes).
3. **Tärkeää:** Zapierin triggerit rekisteröivät webhookin puolestasi, kun Zap otetaan käyttöön. Se vaatii **`settings:write`**-oikeusalueen. Lisää `settings:write` aina, jos joku Zapeistasi käyttää B1-triggeriä.
4. Myönnä myös toimintojen tarvitsemat oikeusalueet. Esimerkiksi "Lisää lahjoitus" -toiminto tarvitsee `donations:write`-oikeuden ja "Luo henkilö" tarvitsee `people:write`-oikeuden.
5. Tallenna. Koko `cak_…`-avain näytetään **vain kerran**, joten kopioi se.

### 2. Yhdistä Zapier B1:een

1. Luo Zapierissä uusi Zap.
2. Kun valitset ensimmäistä kertaa B1-triggerin tai -toiminnon, Zapier pyytää sinua **kirjautumaan B1.churchiin**.
3. Liitä vaiheen 1 API-avain ja napsauta **Yes, Continue**. Zapier vahvistaa avaimen seurakunnallesi.

Yhteys tallennetaan Zapieriin, ja tiliäsi käyttävät kaikki Zapit käyttävät sitä uudelleen.

### 3. Rakenna Zap

Valitse trigger ja lisää yksi tai useampi toimintovaihe. Esimerkkejä on alla.

## Yleisiä reseptejä

### Lisää uudet B1-henkilöt Mailchimpiin

- **Trigger**: B1: Uusi henkilö
- **Toiminto**: Mailchimp: Add/Update Subscriber. Yhdistä B1:n `name__first`, `name__last` ja `contactInfo__email` Mailchimpin First Name-, Last Name- ja Email-kenttiin.

### Lähetä lahjoitukset Slack-kanavalle rikkaammalla kortilla kuin sisäänrakennettu liitin

- **Trigger**: B1: Uusi lahjoitus
- **Toiminto**: Slack: Send Channel Message. Muodosta mikä tahansa asettelu, kuten painikkeet, liitteet jne., jota [Slack-liitin](./slack-discord.md) ei pysty tekemään.

### Lisää uudet ryhmän jäsenet Google-ryhmään

- **Trigger**: B1: Uusi ryhmän jäsen (suodatettuna tiettyyn `groupId`-arvoon)
- **Toiminto**: Filter by Zapier: jatka vain, jos B1-ryhmä on se, josta olet kiinnostunut
- **Toiminto**: B1: Etsi henkilö (käytä triggerin `personId`-arvoa sähköpostin hakemiseen)
- **Toiminto**: Google Groups: Add Member

### Välitä lomakevastaukset projektinhallintatyökaluun

- **Trigger**: B1: Uusi lomakevastaus
- **Toiminto**: Notion / Linear / Asana / Trello: Create page / issue / task

## Miten triggerit toimivat taustalla

Triggerit ovat **REST-hookeja**, eivät kyselyä. Zapier ei kysele B1:tä 15 minuutin välein. Kun otat Zapin käyttöön, Zapier pyytää B1:tä rekisteröimään webhookin, joka osoittaa yksityiseen Zapier-osoitteeseen. Kun tapahtuma tapahtuu, B1 lähettää sanoman Zapierille, ja Zapisi käynnistyy **muutamassa sekunnissa**. Kun poistat Zapin käytöstä, Zapier pyytää B1:tä poistamaan webhookin, joten jäljelle ei jää orpoja tilauksia.

Tämä tarkoittaa, että trigger käynnistyy vain tapahtumista, jotka tapahtuvat Zapin käyttöönoton **jälkeen**. Takautuvaa täydennystä ei ole. Zapin käyttöönotto ei toista eilisiä lahjoituksia.

## Rajoitukset ja huomioita

- **Useat Zapit samalla triggerillä** rekisteröivät kukin oman B1-webhookinsa. Ristiriitoja ei synny, mutta kannattaa tietää, jos tarkastelet kohtaa **Asetukset → Kehittäjä → Webhookit** ja ihmettelet, miksi siellä on kolme identtistä riviä "Zapier — donation.created".
- **Testidata Zapin määrityksessä**: kun rakennat Zapin, Zapier pyytää esimerkkidataa kenttien yhdistämistä varten. Se hakee B1:stä viimeisimmän vastaavan tapahtuman, jos sellainen on. Muuten se käyttää sovelluksen määrityksestä peräisin olevaa synteettistä esimerkkiä.
- **Toimintojen virheet näkyvät Zapin virheinä** Zapierin tehtävähistoriassa. Yleinen syy on API-avain, jolta puuttuu oikea oikeusalue. Esimerkiksi "Lisää lahjoitus" -toiminto tarvitsee `donations:write`-oikeuden. Luo avain uudelleen oikeilla oikeusalueilla ja yhdistä Zapier uudelleen.
- **Lähtevien API-kutsujen kiintiöt**: jokainen B1-API-kutsu toiminnosta lasketaan Zapierin tehtäväkiintiöön, ei mihinkään B1:n puolella.

## Vianmääritys

- **"Authentication failed"** yhdistettäessä: API-avain on väärä, peruutettu tai siltä puuttuvat Zapin tarvitsemat oikeusalueet. Luo avain uudelleen B1Adminissa vähintään `settings:write`-oikeudella sekä niillä resurssioikeuksilla, joita Zap käyttää, ja päivitä sitten yhteys.
- **Trigger ei koskaan käynnisty**: varmista, että webhook on todella rekisteröity. B1Adminissa kohdassa **Asetukset → Kehittäjä → Webhookit** pitäisi nyt näkyä rivi nimeltä "Zapier — &lt;event&gt;". Jos sitä ei ole, API-avaimelta puuttui todennäköisesti `settings:write`-oikeus, kun otit Zapin käyttöön. Korjaa avain ja kytke Zap pois päältä ja takaisin päälle.
- **Trigger käynnistyy kahdesti**: Zapier toimittaa joskus viestin uudelleen, jos sen kuittaus katosi. Jos tarvitset tiukan kaksoiskappaleiden poiston, käytä "Filter by Zapier" -vaihetta yksilöllisellä tunnuksella (esim. henkilön `id`).

## Katso myös

- [Make](./make.md): sama malli, eri alusta
- [Slack & Discord](./slack-discord.md): yksinkertaisemmat chat-ilmoitukset ilman Zapieriä
- [Webhookit (kehittäjän viitemateriaali)](/docs/developer/api/webhooks)
