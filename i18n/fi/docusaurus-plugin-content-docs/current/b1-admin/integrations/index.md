---
title: "Integraatiot"
description: "Yhdistä B1 Admin Slackiin, Discordiin, Zapieriin, Makeen, Google Sheetsiin ja tekoälyavustajiin kuten Claudeen. Ohjeet ja kunkin API-avainoikeudet."
---

# Integraatiot

<div class="article-intro">

B1 liittyy yhteen tiimisi jo käyttämien työkalujen kanssa. Yhdistä Slack tai Discord henkilökunnan ilmoituksia varten, automatisoi työnkulkuja Zapierissa tai Makessa tai vie tietoja pyynnöstä Google Sheetsiin. Tämä onnistuu ilman erillistä integraatioalustaa ja ilman, että ChurchApps isännöi mitään ylimääräistä. Jokainen integraatio toimii kolmannen osapuolen omassa infrastruktuurissa ja kommunikoi seurakuntasi kanssa B1:n webhookien tai REST API:n kautta.

</div>

## Saatavilla olevat

| Integraatio | Mitä se tekee | Suunta | Asennukseen kuluva aika |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Lähettää luettavia ilmoituksia (uudet henkilöt, lahjoitukset, ilmoittautumiset, …) Slack-kanavalle | B1 → Slack | 2 minuuttia |
| **[Discord](./slack-discord.md)** | Sama Discord-kanavalle | B1 → Discord | 2 minuuttia |
| **[Zapier](./zapier.md)** | Käytä B1:n tapahtumia käynnistimina ja B1:n toimintoja missä tahansa Zapierin yli 7 000 sovelluksesta | Molemmat | 5–10 min per Zap |
| **[Make](./make.md)** | Sama idea kuin Zapierissa, Maken visuaalisessa skenaariorakentajassa | Molemmat | 5–10 min per skenaario |
| **[Google Sheets](./google-sheets.md)** | Vie Henkilöt / Lahjoitukset / Ryhmät / Läsnäolo laskentataulukkoon pyynnöstä | B1 → Taulukko | 5 minuuttia |
| **[Claude](./claude.md)** | Kysy Anthropicin Claudelta kysymyksiä seurakuntasi tiedoista, rajattuna oikeuksiisi. Kokeilu on ilmainen ja suositeltava | Molemmat | Alle 3 minuuttia |
| **[ChatGPT](./chatgpt.md)** | Sama idea OpenAI:n ChatGPT:n kanssa (vaatii maksullisen ChatGPT-tilauksen) | Molemmat | 10 minuuttia |
| **[Yhdistetyt palvelut](./services/index.md)** | Valitut reseptit palveluille Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message ja Checkr | Vaihtelee | 5–10 min kukin |

## Miten valita

- **Haluatko vain ilmoituksen chatiin?** Käytä **Slackia** tai **Discordia**. Et tarvitse kolmannen osapuolen tiliä etkä ylläpidettävää Zapia. Määritys tehdään kokonaan B1Adminin sisällä.
- **Haluatko automatisoida jotain eri sovellusten välillä** (esim. "kun joku lahjoittaa, lisää hänet Mailchimp-listalleni ja Slackin #lahjoitukset-kanavalle")? Käytä **Zapieria** tai **Makea**. Zapier on helpompi käyttää, ja Make on halvempi suuressa mittakaavassa sekä joustavampi logiikaltaan.
- **Tarvitsetko kertaluonteisen tietovedon tai ajastetun raportin?** Käytä **Google Sheetsiä**. Liitä API-avain lisäosan sivupalkkiin ja napsauta Vie.
- **Haluatko kysyä kysymyksiä tavallisella kielellä** ("montako ensikertalaista kävi viime sunnuntaina?", "tiivistä tämän kuukauden lahjoitukset")? Aloita **[Claudella](./claude.md)**. Kokeilu on ilmainen ja asennus kestää alle 3 minuuttia. **[ChatGPT](./chatgpt.md)** toimii myös maksullisella tilauksella. Claude yhdistyy kirjautumalla B1-tilillesi, ChatGPT käyttää B1 API -avainta.
- **Rakennatko oman mukautetun integraation?** Mikään yllä olevista ei sovi. Puhu suoraan [REST API:lle](/docs/developer/api) [API-avaimella](/docs/developer/api/api-keys) tai tilaa oma palvelimesi [webhookeihin](/docs/developer/api/webhooks).

## Mitä niillä on yhteistä

Jokainen integraatio tunnistautuu **B1 API -avaimella**, joka luodaan B1Adminissa kohdassa **Asetukset → Kehittäjä → API-avaimet**. Avain:

- On sidottu seurakuntasi tiettyyn henkilöön ja perii tuon henkilön oikeudet
- Voidaan rajata **oikeuksilla (scopes)**. Esimerkiksi Google Sheets -vienti tarvitsee vain `people:read`-oikeuden, ei `settings:write`-oikeutta
- Voidaan peruuttaa milloin tahansa, jolloin integraation käyttöoikeus katkeaa välittömästi vaikuttamatta muuhun

Muutama liitin (Zapier, Make) rekisteröi myös [webhookin](/docs/developer/api/webhooks) puolestasi, kun Zap tai skenaario otetaan käyttöön, ja poistaa sen, kun Zap sammutetaan. Et itse hallitse webhook-URL-osoitetta.

:::tip
Jotta Zapier ja Make voivat rekisteröidä webhookit automaattisesti, API-avaimella on oltava **`settings:write`**-oikeus sekä resurssikohtaiset oikeudet sille, mitä integraatio käsittelee. Pelkän lukuoikeuden omaava avain toimii toiminnoille ja vienneille, mutta ei käynnistimille.
:::

## Kustannukset

ChurchApps on ilmainen ja avoimen lähdekoodin ohjelmisto. Slack, Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) sekä viralliset Zapier-, Make- ja Google Sheets -liittimet ovat meidän puolestamme myös ilmaisia. Kolmannet osapuolet voivat veloittaa omista alustoistaan. Zapierilla ja Makella on molemmilla anteliaat ilmaistasot, ja Slack, Discord ja Google Sheets ovat tähän käyttöön ilmaisia.

## Oman rakentaminen

Jos mikään yllä olevista ei sovi, jokainen B1-pinta on avoin:

- **[REST API](/docs/developer/api)**: kutsu B1:tä millä tahansa kielellä `Authorization: Bearer cak_…` -otsakkeella
- **[Webhookit](/docs/developer/api/webhooks)**: tilaa julkinen HTTPS-päätepiste yhteen tai useampaan tapahtumatyyppiin ja vastaanota allekirjoitettuja JSON-sisältöjä
- **[OAuth ja Yhdistetyt sovellukset](/docs/developer/api/connected-apps)**: jos rakennat SaaS-tuotetta, jota monet seurakunnat käyttävät

## Seuraavat askeleet

- [Slack ja Discord](./slack-discord.md): lähetä chat-ilmoituksia
- [Zapier](./zapier.md): yhdistä yli 7 000 sovellukseen
- [Make](./make.md): visuaalinen työnkulkujen automaatio
- [Google Sheets](./google-sheets.md): vie laskentataulukoihin
- [Claude](./claude.md): kysy Anthropicin Claudelta seurakuntasi tiedoista
- [ChatGPT](./chatgpt.md): kysy OpenAI:n ChatGPT:ltä seurakuntasi tiedoista
- [Yhdistetyt palvelut](./services/index.md): palvelukohtaiset reseptit (Mailchimp, Donorbox, Clearstream jne.)
