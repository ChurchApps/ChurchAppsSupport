---
title: "Twilio BYOK (ehdotus)"
description: "Ehdotettu seurakunnan omistama Twilio-integraatio, suostumusmalli, toteutuksen laajuus ja julkaisukriteerit."
---

# Twilio BYOK -integraation ehdotus

:::caution Ehdotus — ei saatavilla oleva integraatio
Tämä on suunnitelma ylläpitäjien arviota varten. Se perustuu julkiseen lähdekoodiin ja Twilion dokumentaatioon, joita tarkasteltiin 22. lokakuuta 2026. Sen jälkeen on julkaistu perus-Twilio-palveluntarjoaja (`@churchapps/texting` 0.6.0 ja B1 Adminin **Asetukset > Tekstiviestit**): seurakunta syöttää Account SID:n, Auth Tokenin ja lähetysnumeron (From). Palveluntarjoaja hyväksyy myös `MG`-alkuisen Messaging Service SID:n, mutta `fromNumber`-sarake on edelleen `varchar(20)`, mikä on liian lyhyt 34-merkkiselle SID:lle. Viestit lähetetään yksi pyyntö per vastaanottaja Twilion Messages API:n kautta, ja STOP-vastaukset tulevat B1:een olemassa olevan saapuvan webhookin kautta. Katso [Kirkon asetukset: Tekstiviestit](../../b1-admin/settings/church-settings.md#texting). Alla kuvattu suostumusmalli, Advanced Opt-Out -käsittely, toimitustilan seuranta ja asetusten valmiustarkistukset ovat yhä ehdotuksia, eivät julkaistua toimintaa. [Seurakunnan käyttöönoton luonnos](./twilio-byok-onboarding-draft) sisältää ehdotetut käyttöönotto-ohjeet ja seurakuntakohtaiset esimerkit.
:::

## Suositeltava lähestymistapa

Lisää Twilio B1:n olemassa olevaan tekstiviestien palveluntarjoajajärjestelmään käyttäen **seurakunnan omistamaa Twilio-tiliä, API-tunnuksia, Messaging Serviceä ja SMS-yhteensopivaa puhelinnumeroa**. Seurakunta rekisteröi oman oikeushenkilönsä ja viestintäkampanjansa, maksaa Twiliolle suoraan, ylläpitää vastaanottajien suostumuksia ja hallinnoi hyväksyntää Twilio Consolessa. ChurchApps toimittaa integraation ja dokumentaation.

Aloita yhdellä viestiohjelmalla, yhdellä Messaging Servicellä ja yhdellä yhdysvaltalaisella paikallisella 10DLC-lähettäjällä per B1-seurakunta. Tue yksittäisiä tekstiviestejä, ryhmäviestejä, työnkulkuviestejä ja liittymismuistutuksia olemassa olevien B1-näkymien kautta. Ensimmäinen järkevä ohjelma kattaa jumalanpalvelusmuutokset, tapahtumamuistutukset ja vapaaehtoisten vuorosuunnittelun, kun kaikki kolme on kuvattu seurakunnan suostumuksessa ja hyväksytyssä kampanjassa. Varainkeruu- tai markkinointiviestit vaativat erillisen arvioinnin ja suostumuksen; älä lisää niitä hiljaa tähän ohjelmaan.

| Vastuualue | Seurakunta | B1 / ChurchApps |
|---|---|---|
| Twilio-tili, laskutus, numeron omistus | Omistaa ja hallinnoi niitä | Ei luo alustatiliä eikä myy krediittejä edelleen |
| Brändi, kampanja, numeron rekisteröinti | Lähettää oikeat seurakunnan tiedot; hoitaa tarkistuksen ja korjaukset | Selittää esivaatimukset ja lukee saatavilla olevat valmiustiedot |
| Ilmoittautumissivu, käytännöt, viestin tarkoitus | Julkaisee ja ylläpitää niitä | Tarjoaa yhteensopivat lomakekomponentit, esimerkit ja suostumustiedot |
| Vastaanottajan oikeus ja STOP-käsittely | Tarkistaa suostumustodisteet ja pyytää SMS:n ulkopuolella saadut pyynnöt | Noudattaa suostumuksia, estolistoja, oikeuksia ja allekirjoitettuja webhookeja |
| Toimitus ja tuki | Seuraa Twilion virheitä, tilin tilaa ja saapuvia vastauksia | Näyttää lähetyksen ja toimituksen tilan ilman takuita hyväksynnästä |

Lykkää ChurchAppsin omistamaa Twilio-päätiliä, asiakasalitilejä, numeron ostamista, Trust Hub -lähetyksiä, laskutusta, keskusteluposteljaa, MMS/WhatsAppia, kansainvälistä lähettämistä ja maksuttoman numeron käyttöönottoa. Maksuton numero on erillinen vahvistetun lähettäjän polku, ei rekisteröinnin ohitus. Nämä rajaukset pitävät ensimmäisen julkaisun linjassa B1:n nykyisen oman palveluntarjoajan käyttömallin kanssa.

## Olemassa oleva perusta ja puutteet

Seuraavat havainnot perustuvat lähdekoodin tilannekuviin, eivätkä ne ole oletus siitä, mitä tällä hetkellä on käytössä:

| Komponentti | Nykyinen toiminta | Vaikutus |
|---|---|---|
| [Palveluntarjoajarekisteri ja sopimus](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` tarjoaa yksittäis- ja massalähetykset, validoinnin, valinnaiset tilaaja- ja listaominaisuudet sekä palveluntarjoajan viestitunnuksen tuloksissa. Twilio-sovitinta ei ole rekisteröity. | Lisää Twilio pakettiin `@churchapps/texting`; se ei tarvitse tilaajan luontia eikä palveluntarjoajan hallinnoimia listoja. |
| [Tekstiviestien asetukset](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church ja Nalo ovat valittavissa; MinistryStuff on ominaisuusliputuksen takana. Lähettäjän muokkaus ja tallennus on tällä hetkellä sidottu Naloon. | Lisää selkeät Twilio-kentät, validointi, lähettäjän tallennus ja käyttöönotto-ohjeet. Pelkkä pudotusvalikon merkintä ei riitä. |
| [Ohjain](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) ja [moduulin yhdyskäytävä](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Tunnukset salataan ja peitetään; manuaaliset ja automaattiset lähetykset selvittävät seurakunnan palveluntarjoajan. Ryhmälähetykset poistavat jaetut puhelinnumerot. | Käytä näitä polkuja uudelleen ja säilytä valtuutus. Lisää uudet suostumus- ja valmiusportit yhteiseen palvelinpolkuun, jotta työnkulut eivät ohita niitä. |
| [STOP-apuri](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Jäsentää Twilio-tyyliset `From`- ja `Body`-kentät; vahvistaa seurakunnan URL-tunnuksen; asettaa `person.optedOut`-arvon ja poistaa tekstiviestimuistutukset käytöstä. Muut vastaukset jätetään huomiotta. | Hyödyllinen lähtökohta, ei täydellinen Twilio-webhook. Lisää Twilio-allekirjoitukset ja erillinen SMS-tilaustila. |
| [Viestinnän skeema](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Tallentaa `apiKey`- ja `apiSecret`-kentät sekä 20-merkkisen `fromNumber`-kentän; lokit tallentavat välittömän onnistumisen tai virheen, eivät palveluntarjoajan tunnuksia tai lopullisia toimitustiloja. | E.164-lähettäjä sopii; 34-merkkinen Messaging Service SID tarvitsee oman kentän. Lisää pysyvä palveluntarjoajan viesti- ja tilatallennus. |
| [Julkinen lomakesivu](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [jaettu lomakerenderöijä](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) ja [lomakkeen lähetysohjain](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Rajoittamattomat lomakkeet ja valinnaiset valintaruudut ovat olemassa. Kuvaukset ovat pelkkää tekstiä. Lomakevastaukset säilyvät, mutta tekstiviestipolulla ei ole kampanjakohtaista suostumuskirjanpitoa. | Lisää määritetty SMS-suostumuskontrolli oikeilla käytäntölinkeillä ja palvelinpuolen todisteiden tallennuksella. Yleinen valintaruutu tai ryhmäjäsenyys ei saa automaattisesti antaa lupaa SMS:ään. |

Käyttäjille suunnatussa [kirkon asetusten dokumentaatiossa](../../b1-admin/settings/church-settings#texting) kerrotaan myös, että nykyinen estolippu on jaettu hakemiston yksityisyysasetusten kanssa. Tämä kytkentä on julkaisun kannalta huolenaihe: START-vastaus ei saa koskaan muuttaa hakemiston näkyvyyttä.

## Asetusten ja tunnusten suunnittelu

Käytä selkeitä, lisääviä asetuskenttiä äläkä ylikuormita `fromNumber`-kenttää tai tallenna rakenteista dataa API-avaimen merkkijonoon:

| Kenttä | Ehdotettu tarkoitus |
|---|---|
| `accountSid` | Seurakunnan omistaman Twilio-tilin tai projektin tunniste (`AC…`) |
| `apiKey`, `apiSecret` | Erillinen Twilio API Key SID (`SK…`) ja salaisuus lähtevää API-käyttöä varten; salataan ja peitetään |
| `webhookAuthToken` | Tilin Auth Token, jota Twilio SDK käyttää saapuvien allekirjoitusten validointiin; salataan ja peitetään erikseen |
| `messagingServiceSid` | Seurakunnan Messaging Service (`MG…`, 34 merkkiä) |
| `fromNumber` | Valittu SMS-yhteensopiva numero E.164-muodossa, vahvistettu lähettäjäksi kyseisellä tilillä ja palvelussa |
| Ohjelman asetukset | Pysyvä ohjelmatunnus, nimi, sallitut tarkoitukset, ilmoittautumis- ja käytäntö-URL:t sekä ilmoitusversio |

Twilio [suosii API-avaimia REST-todennukseen](https://www.twilio.com/docs/iam/api-keys). Käytä pienimpiä testattuja avainoikeuksia, jotka kattavat lähettämisen ja vaaditut vain-luku-asennustarkistukset. Tilin Auth Token tarvitaan yhä [Twilion vakiomuotoiseen webhook-allekirjoituksen tarkistukseen](https://www.twilio.com/docs/usage/security). Selitä tämä ero käyttöliittymässä: API-salaisuus ei ole webhookin Auth Token. Pidä tunnukset yksinomaan palvelinpuolen asetusvarastossa, älä koskaan julkisilla sivuilla, lomakevastauksissa, selaimen lähetyspyynnöissä tai tukipyynnöissä.

Seurakunta luo ja hallinnoi nämä resurssit Consolessa. B1:n validointitoiminnon tulee ainoastaan lukea määritetty palvelu, lähettäjät ja rekisteröintitiedot. Sen ei tule ostaa numeroita, luoda kampanjoita, muuttaa Twilio-asetuksia tai lähettää testiviestiä sivuvaikutuksena. Tarjoa erillinen, nimenomainen testilähetystoiminto, joka rajoittuu hyväksyttyyn ja suostuneeseen vastaanottajaan.

Säilytä peitetyt tunnukset vain muokattaessa samaa tallennettua palveluntarjoajaa. Siirtyminen Twilioon vaatii omat tunnukset, ja vanhat palveluntarjoajakohtaiset arvot on tyhjennettävä; älä siirrä peitettyä Clearstream- tai Nalo-avainta Twilio-asetukseen.

Rajaa jokainen lataus ja päivitys todennettuun B1-seurakuntaan. Sido takaisinkutsut tallennettuun integraatioon ja odotettuun Twilio-tiliin, palveluun ja lähettäjään, ja hylkää ristiriitaiset seurakuntien väliset määritykset. Tunnusten kierrättäminen tai palveluntarjoajan irrottaminen kumoaa valmiuden ja keskeyttää jonossa olevat lähetykset poistamatta suostumuksia tai historiallisia toimitustietoja.

## Suostumus ja estolistaus ovat pakollista julkaisutyötä

Ota käyttöön puhelinnumeroon sidotut tilaustietueet Twilio-ohjelmalle sekä vain lisättävät suostumus- ja estolistatapahtumat. Ehdotettu vähimmäistodistusaineisto on: seurakunnan tunnus, ohjelman tunnus, normalisoitu puhelinnumero, valinnainen vahvistettu henkilöliitos, myönteinen toiminto, lähdelomakkeen tai -lähetyksen tunnus tai tarkistettu ulkoinen todiste, palvelimen aikaleima, ilmoitusteksti ja sen versio, lähde-URL, käytäntö-URL:t sekä peruutus- ja uudelleenaloitustapahtumat. Rajoita pääsyä ja säilytysaikaa seurakunnan nykyisen tietoturvakäytännön mukaisesti.

Käytä tiloja kuten `unknown`, `pending`, `active` ja `suppressed`. Olemassa olevat matkapuhelinnumerot, tuodut yhteystiedot, läsnäolo, lahjoitukset, ryhmäjäsenyys, `person.optedOut = false` ja `allowSms` eivät ole myönteistä ohjelmakohtaista suostumusta. Dokumentoidun suostumuksen tuominen on oikeuksin suojattu ja tarkastettu toiminto, jolla on tallennettu lähde; migraatio ei saa ilmoittaa kaikkia mukaan.

Ensimmäisessä verkkovirrassa käytetään B1:n tavallista julkista lomaketilaa. Lisää nimenomaisesti määritetty SMS-suostumuskysymys, joka on aluksi ruksittamaton, valinnainen, näyttää klikattavia käytäntölinkkejä ja liittyy yhteen ohjelmaan ja yhteen matkapuhelinkenttään. Validoi tämä yhdistäminen palvelimella ja tallenna näytetty ilmoitusteksti, kun myönteinen vastaus tallennetaan. Älä koskaan johda suostumusta mielivaltaisista kysymysotsikoista, keskusteluvälineestä tai työnkulun jäsenyydestä. Ota keskustelullinen vastine käyttöön vasta, kun sen nimenomainen myönteinen vuorovaikutus ja todisteiden tallennus on testattu.

Ruksittamaton lomake ei luo tilausta, eikä se saa peruuttaa jonkun muun olemassa olevaa suostumusta. Sido suostumus lähetettyyn puhelinnumeroon; henkilökunta voi ratkaista epäselvät henkilöliitokset yhdistämättä talouksien tietoja. Muuttunut matkapuhelinnumero tarvitsee oman suostumuksensa. Anonyymeille lomakkeille sovelletaan väärinkäytön estoa, ja numeron omistajuuden vahvistus tai kaksivaiheinen vahvistus on tehtävä selvästi; pelkkä ruksi ei todista, kenelle puhelin kuuluu. Jos vahvistusta käytetään, pidä tilaus odottavana, kunnes se on suoritettu, ja kuvaa tarkka prosessi rekisteröintimateriaaleissa.

Twilion osalta erota SMS-esto hakemiston näkyvyydestä. Siirrä varovasti kaikki vanhat estot estotietueeksi; muut vanhat vastaanottajat jätetään tilaan `unknown`. Selkeä, dokumentoitu uusi liittymä voi luoda SMS-suostumuksen, kun hakemiston yksityisyysasetus pysyy ennallaan. Säilytä muiden palveluntarjoajien käytös, kunnes niiden migraatiot on erikseen tarkistettu.

Jokaisessa varsinaisessa lähetyksessä vaadi, että seurakunnan integraatio on käytössä ja valmis, että tällä hetkellä on voimassa oleva ohjelmasuostumus tarkalle puhelinnumerolle, ettei puhelinnumerotasoista estoa ole ja että olemassa oleva lähettäjän oikeus täyttyy. Muistutuksissa kunnioitetaan lisäksi `allowSms`-arvoa, kategoriakohtaisia asetuksia ja hiljaisia aikoja. Tarkista uudelleen jonotuksen jälkeen, ratkaise yhdistelykentät, normalisoi ja validoi numerot sekä poista kaksoiskappaleet puhelinnumeron perusteella. STOP estää kaikki lähetykset palvelulle tai ohjelmalle, mukaan lukien manuaaliset lähetykset ja työnkulut; sen on katettava myös jokainen henkilö, joka jakaa saman puhelinnumeron.

Esitä seurakunnan tunnus ja STOP-ohje johdonmukaisesti yhteisellä Twilio-lähetyspolulla ja näytä lopullisen viestin ja segmenttien määrä ennakkoon. Yhdistelykenttien laajennus ja pituuden käsittely on tehtävä niin, että nämä osat säilyvät; älä katkaise estoohjetta hiljaa. Pidä esimerkit ja todelliset muistutus- ja työnkulkumallit linjassa keskenään.

## Twilio-lähetykset, vastaukset ja toimitustila

Toteuta `TwilioProvider.sendMessage` Messages API:n kautta valitulla Messaging Servicellä ja lähettäjällä. Palauta Twilio-viestin SID ja hyväksytty tai lähetetty tulos; HTTP-hyväksyntä ei ole toimitus päätelaitteeseen. Ryhmälähetys käyttää vastaanottajakohtaisia tuloksia syöttöjärjestyksessä.

Rajoita lähtevää samanaikaisuutta **sekä** `sendBulk`-kutsuissa että yksittäisissä lähetyksissä: nykyinen yhdistelykenttien haara jakaa `sendMessage`-kutsuja rinnakkain. Tallenna lähetysaikomus ja noudettavat työt ryhmille, jotka eivät mahdu pyyntöbudjettiin; käytä olemassa olevaa käyttöönottomallia sen sijaan, että seurakunnan pitäisi ajaa toinen palvelu. Yritä uudelleen tunnetut väliaikaiset tai nopeusrajavirheet viiveellä. Käsittele epäselvät aikakatkaisut tuntemattomina tuloksina, jotka täytyy sovittaa, eikä ohjeena lähettää uudelleen sokeasti, mikä riskeeraa kaksoisviestit ja ylimääräiset maksut.

Määritä seurakuntakohtaiset saapuvat ja tilan takaisinkutsu-URL:t. Validoi `X-Twilio-Signature` SDK:lla, tarkalla määritetyllä ulkoisella URL:lla, alkuperäisillä lomakeparametreilla ja vastaavalla tilin Auth Tokenilla. Pelkkä salainen URL ei riitä. Yhdistä takaisinkutsut tallennettuihin seurakunta-, tili- ja viestitietueisiin, käsittele kaksoiskappaleet ja takaisinkutsut, jotka saapuvat ennen lähetystuloksen tallentumista, ja estä vanhempia tapahtumia ylikirjoittamasta lopullista tilaa. Palauta tyhjä TwiML saapuvaan kuittaukseen ja sopiva onnistumisvastaus tilatapahtumille. [Twilion turvallisuus](https://www.twilio.com/docs/usage/security), [tilan takaisinkutsut](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Suosittelemme Messaging Servicen **Advanced Opt-Out** -toimintoa. Twilio hoitaa STOP-, START- ja HELP-vahvistukset; B1 käyttää todennettuja `OptOutType`-tapahtumia lähettämättä kaksoisvahvistuksia. STOP tallentaa eston heti. START palauttaa tilauksen vain tunnetulle, samalle julkistetulle ohjelmalle, ja tuottaa uuden uudelleenaloitustapahtuman; se ei saa liittää uutta puhelinta muuhun viestintään tai kytkeä muistutusasetuksia päälle. HELP ei ilmoittaudu ketään. Muut saapuvat vastaukset jäävät B1:n postilaatikon ulkopuolelle; seurakunnilla on oltava dokumentoitu tapa seurata niitä Twiliossä. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Tallenna Twilio-viestin SID, tili- ja palvelusidonta, lähetysaika, lopullinen tila tai virhekoodi ja takaisinkutsun aika toimituslokin rinnalle. Näytä jonossa tai hyväksytty, toimitettu, epäonnistunut, toimittamaton tai tuntematon oikein. Säilytä olemassa oleva vastausrakenne muille palveluntarjoajille ja määritä, edustavatko yhteenlasketut onnistumismäärät lähetystä vai toimitusta.

## Asennuksen valmius ja hyväksynnän validointi

Näytä erilliset tarkistuspisteet tunnuksille, palvelun ja lähettäjän omistajuudelle, kampanjan vahvistukselle, numeron rekisteröinnille, webhook-tarkistuksille ja toimitetulle testiviestille. Älä näytä yhtä vihreää ”hyväksytty”-merkkiä pelkästään siksi, että tunnukset toimivat.

Yhdysvaltalaisille paikallisille numeroille lue palvelun [Usa2p-kampanjaresurssi](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) ja vaadi, että vastaava kampanja on tilassa `VERIFIED`. Vahvista erikseen, että valittu puhelin on liitetty tähän palveluun ja että sen numerorekisteröinti on valmis: hyväksytyllä kampanjalla voi olla yhä odottava numero. Jos tuettu lukurajapinta ei paljasta tarvittavaa signaalia, näytä **vaaditaan manuaalinen vahvistus Consolessa** ja tallenna seurakunnan ylläpitäjän päivätty vahvistus juuri sellaisena; älä merkitse sitä API-vahvistetuksi. Automaattiset numerorekisteröinnin tapahtumat voivat olla myöhempi jatko. [Numerorekisteröinnin virheet](https://www.twilio.com/docs/api/errors/30035), [A2P-rekisteröinnin tapahtumat](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Vaadi ajantasaiset tarkistukset ennen lähetysten sallimista. Tallenna, milloin ja miten valmius tarkistettiin, vanhenna vanhentuneet tarkistukset ja keskeytä, jos tunnukset peruutetaan, lähettäjät muuttuvat, rekisteröinti epäonnistuu tai tilivirheet jatkuvat. Testiviestin toimitus vahvistaa testatun polun, ei yleistä operaattorin hyväksyntää tai vastaanottajan suostumusta. Täydentävä luonnos määrittelee seurakunnan ennakkotarkistukset, julkaisua edeltävät tarkistukset ja jatkuvat operatiiviset tarkistukset.

## Repositorio ja julkaisusuunnitelma

[Organisaation osallistumisohje](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) ohjaa B1-ominaisuuspyynnöt ChurchAppsSupportiin ja toteutus-PR:t omistaviin repositorioihin. Käytä yhtä keskitettyä ominaisuuspyyntöä ja linkitä siihen kohdennetut toteutus-PR:t:

1. **ChurchAppsSupport:** tarkista tämä suunnitelma ja sen käyttöönottoluonnos ennen kuin Twilio esitellään käytettävissä olevana käyttäjäominaisuutena.
2. **Packages:** lisää Twilio-sovitin, selkeät jaetut asetukset ja rajapinnat sekä SMS-suostumuslomakkeen renderöinti, jos B1Admin ja B1App jakavat sen. Sisällytä changesetit ja julkaise olemassa olevan julkaisutyönkulun kautta ennen kuluttajien päivittämistä.
3. **Api:** lisää lisääviä migraatioita integraation metatiedoille, suostumukselle ja estolistalle sekä toimitustiloille. Toteuta asetusten validointi, jaetut lähetysportit, lomakkeen todisteiden tallennus, webhook-käsittely ja lähetysten pysyvä tallennus.
4. **B1Admin:** lisää Twilio-asetusten ja valmiuden käyttöliittymä, ohjelman ja suostumuksen hallinta, palveluntarjoajatietoinen lähettäjän tallennus sekä täsmällinen toimitusraportointi. Älä tarjoa SMS-suostumuksen ohitusta tavallisten henkilömuokkausten kautta.
5. **B1App:** varmista julkinen lomake ja sivu sekä käytäntölinkkien käyttökokemus jaettuja ohjaimia vasten, myös anonyymeille ja mobiilikäyttäjille. Erillistä Twilio-selainasiakasta ei tarvita.
6. **ChurchAppsSupport:** julkaisun jälkeen muuta käyttöönottoluonnos tuetuiksi asetus- ja ohjesivuiksi, lisää todelliset kuvakaappaukset, linkitä se Tekstiviestien asetuksista ja järjestä käännökset.

Ota skeema ja jaetut paketit käyttöön ennen kuluttajia. Pidä Twilio ominaisuusliputettuna pientä vapaaehtoista pilottia varten; olemassa olevat palveluntarjoajat jatkavat toimintaansa. Peruutus poistaa Twilio-lähetykset käytöstä ja peruuttaa lähettämättömät työt, mutta säilyttää estot ja todisteet. Se ei saa siirtää vastaanottajia automaattisesti toiselle palveluntarjoajalle tai lähettäjälle.

## Työmäärän arvio

Suunnitteluarvio ekosysteemiin perehtyneelle osallistujalle. Tässä arvioinnissa ei käytetty tuotantotunnuksia eikä oikeita SMS-viestejä:

| Työ | Kehityspäiviä |
|---|---|
| Sovitin, asetusten ja skeeman laajennukset, asetusten käyttöliittymä | 2–3 |
| Puhelin- ja ohjelmakohtainen suostumus, erillinen esto, jaetut lähetysportit, julkisen lomakkeen integraatio | 3–5 |
| Allekirjoitetut takaisinkutsut, toimituksen tallennus, rajattu ja pysyvä lähetysjono | 2–3 |
| Valmiuden käyttöliittymä, seurakuntaopas, integraatio- ja regressiotestaus, pilottikorjaukset | 3–4 |
| **Suositeltu julkaisun laajuus** | **10–15 yhteensä** |

Perus sovittimen ja asetusten konseptitodistus on noin 1–2 päivää. Pelkän lähettäjän arvio ei sisällä suostumus- ja käyttöönottotyötä, joka on välttämätöntä tälle suositukselle. Ulkoisen Twilion ja operaattorien tarkistuksen aika on erillinen ja vaihteleva. Projekti ei saa luvata hyväksyntäpäivää eikä hyväksynnän lopputulosta.

## Hyväksymiskriteerit

- [ ] Seurakunta omistaa ja maksaa tilin, palvelun, rekisteröidyn lähettäjän ja kampanjan. ChurchAppsin hallinnoimaa Twilio-tiliä ei vaadita.
- [ ] Tunnukset ovat salattuja ja peitettyjä, rajattu seurakuntaan, kierrätettävissä, eivätkä ne näy lokeissa tai julkisessa sisällössä. Validointi on vain lukua.
- [ ] Valinnainen ruksittamaton suostumus näyttää todelliset käytäntölinkit ja tallentaa ohjelman, puhelimen ja ilmoituksen todisteet palvelimella. Lomakkeen pääpainikkeen käyttö onnistuu silti, vaikka suostumusta ei anneta.
- [ ] Kaikki manuaaliset, ryhmä-, yhdistely-, työnkulku- ja muistutuspolut noudattavat samaa Twilio-oikeusporttia. Tuntemattomat, suostumattomat, puhelinta vaihtaneet ja estetyt vastaanottajat ohitetaan hyödyllisellä syyllä. Renderöinti säilyttää seurakunnan tunnisteen ja STOP-ohjeen laajennuksen ja pituuden käsittelyn jälkeen.
- [ ] Hakemiston vanha yksityisyysasetus ei ilmoittaudu vastaanottajia. STOP ja START eivät koskaan muuta hakemiston näkyvyyttä tai muita asetuksia. Jaetun puhelimen ja seurakuntien välisten tapausten testit on tehty.
- [ ] Allekirjoitetut STOP, START ja HELP, virheelliset allekirjoitukset, väärät tilit ja palvelut, kaksoistapahtumat, toistetut lomakelähetykset ja väärennetyt suostumuskartoitukset on katettu.
- [ ] Ryhmäkoko, aikakatkaisut, nopeusrajat, osittaiset epäonnistumiset, epäselvät tulokset, takaisinkutsujen kilpailutilanteet ja epäjärjestyksessä saapuvat toimitustapahtumat on testattu ilman kaksoislähetyksiä.
- [ ] Kampanjan hyväksyntä ja valmis numerorekisteröinti erotetaan tunnusten validoinnista. Manuaalinen todiste on selvästi merkitty, ja vanhentunut tai peruutettu valmius estää lähetykset.
- [ ] Pilottiseurakunta tarkistaa ilmoittautumissivunsa, hylätyt ja hyväksytyt lomakepolut, tarkat käytäntö-URL:t sekä suostuneen testivastaanottajan koko kulun: lähetyksen, toimituksen, STOP-eston ja sallitun uudelleentilauksen.
- [ ] Olemassa olevat Clearstream-, Text In Church- ja Nalo-asetukset sekä lähetyskäyttäytyminen läpäisevät regressiotarkistukset. Ohjeteksti erottaa ehdotukset julkaistuista ominaisuuksista.
