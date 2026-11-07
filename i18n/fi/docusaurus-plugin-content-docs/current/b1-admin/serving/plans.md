---
title: "Palvelusuunnitelmat"
---

# Palvelusuunnitelmat

<div class="article-intro">

Palvelusuunnitelmat järjestävät sen, kuka palvelee ja milloin. Jokainen suunnitelma liittyy tiettyyn päivään ja palvelutehtävään, joten vapaaehtoistiimien koordinointi viikoittain on helppoa ja jokainen palvelu saa tarvittavan miehityksen.

</div>

## Koulutusvideo

<YouTube id="47DstBXKl74" title="Suunnitelmien luominen ja vapaaehtoisten ajoittaminen B1:ssä" next="Palvelujärjestyksen ja laulukirjaston rakentaminen B1:ssä" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo palvelutehtävät ja tiimit Palveluiden (Serving) alueella
- Varmista, että vapaaehtoiset on lisätty [henkilöluetteloon](../people/adding-people.md) ja määritetty tiimeihin

</div>

## Suunnitelmien avaaminen

1. Avaa B1 Adminissa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki sivun vasemmassa yläkulmassa), laajenna kohta **Serving** ja napsauta **Plans**.
2. Valitse sivun yläreunasta **palvelutehtävän välilehti**.
3. Napsauta **suunnitelman tyyppiä** nähdäksesi kyseisen tyypin suunnitelmaluettelon. Käytä luettelon yläpuolella olevia **Upcoming**- ja **Past**-painikkeita vaihtaaksesi tulevien ja aiempien suunnitelmien välillä. **Upcoming** näyttää tästä päivästä alkaen lähimmän ensin, ja päivämäärättömät suunnitelmat ovat lopussa. **Past** näyttää vain aiemmat suunnitelmat, uusimmat ensin.
4. Avaa suunnitelma napsauttamalla sitä.

Jokaisen suunnitelman sivulla on linkit takaisin sen suunnitelmatyyppiin ja **Plans**-sivulle, joten pääset takaisin ylemmälle tasolle selaimen takaisin-painikkeen käyttämättä.

:::info
Suunnitelmien hallintaan ei tarvita täysiä järjestelmänvalvojan oikeuksia. Jokainen palvelutehtävän jäsen voi siirtyä Serving-alueelle ja luoda, muokata ja ajoittaa oman tehtävänsä suunnitelmia ilman Plans Edit -oikeutta. Plans Edit -roolin omaavat toimittajat voivat hallita suunnitelmia kaikissa palvelutehtävissä.
:::

## Suunnitelman luominen

1. Napsauta suunnitelmatyypin sivulla sivun yläreunassa **New Plan**.
2. Anna suunnitelmalle nimi tai käytä päivämäärää nimenä. Valitse palvelun **päivämäärä**.
3. Jos palvelutehtävässäsi on [malleja](./plan-templates.md), voit valita yhden kohdasta **Start from template**. Silloin palvelujärjestys, tehtävät ja muistiinpanot täyttyvät yhdellä kertaa.
4. Muuten, jos haluat kopioida edellisen suunnitelman, käytä **Copy from Previous Plan** -toimintoa ja valitse **Positions Only** tai **Positions and Assignments**. Jos et halua kopioida mitään, valitse **Nothing**. Voit myös valita **Copy Order of Service**. Kun kopioit edellisen suunnitelman, uusi suunnitelma säilyttää myös edellisen suunnitelman **Notes**-muistiinpanot, **Signup Deadline**-ilmoittautumisrajan, asetuksen **Show volunteer names on signup page** ja automaattisen korvaamisen asetuksen. Näin et joudu syöttämään niitä joka viikko uudelleen. Voit muuttaa mitä tahansa näistä uuden suunnitelman asetuksissa.
5. Kun haluat luoda useita suunnitelmia kerralla kopioinnin yhteydessä, valitse **Repeat every** ja **Frequency** (Day, Week tai Month) ja syötä sitten **Number of plans** (enintään 12). Kuukausitoistossa **On**-asetuksella voit säilyttää saman kuukauden päivän tai saman viikonpäivän, esimerkiksi toisen lauantain. B1 näyttää päivämäärät ennen tallentamista ja luo yhden suunnitelman jokaiselle päivämäärälle. Jokainen suunnitelma kopioidaan edellisestä. Jos suunnitelma on nimetty päivämäärän mukaan, jokainen uusi suunnitelma saa oman päivämääränsä mukaisen nimen.
6. Voit halutessasi asettaa **Signup Deadline (hours before service)** -ilmoittautumisrajan, eli tunnit ennen palvelua. Uusi suunnitelma saa edellisen suunnitelman rajan, ja voit muuttaa sitä täällä. Jätä kenttä tyhjäksi, jos rajaa ei tarvita. Katso [Suunnitelman asetukset](#plan-settings), miten raja lasketaan.
7. Tallenna suunnitelma. Voit nyt aloittaa tiimin jäsenten määrittämisen ja rakentaa [palvelujärjestyksen](./service-order.md).

:::tip
Toistoasetukset ovat käytettävissä vain silloin, kun kopioit jotakin edellisestä suunnitelmasta (tehtäviä, määrityksiä tai palvelujärjestystä).
:::

## Suunnitelman tietosivu

Kun avaat suunnitelman, sen nimi, palvelutehtävä, suunnitelmatyyppi ja palvelun päivämäärä näkyvät yläreunassa, ja mukana ovat painikkeet **Edit** ja **Print**. Kaikki muu on samalla sivulla:

- **[Order of Service](./service-order.md)** -- Rakenna palvelujärjestys elementeillä, kuten ylistyslaulut, rukoukset, ilmoitukset ja saarna.
- **Serving Team Assignments** -- Hallitse, mitkä tiimin jäsenet on määritetty tähän suunnitelmaan. Voit lisätä ihmisiä olemassa olevista tiimeistä ja nähdä, kuka on vahvistanut ja kuka odottaa vielä vastausta. Tehtävien yläpuolella olevista linkeistä voit avata suunnitelman **Notes**- ja **Times**-kohdat.

## Tiimin jäsenten määrittäminen

1. Avaa suunnitelma ja vieritä kohtaan **Serving Team Assignments**.
2. Napsauta **Add Position**. Täytä tehtävän lisäämislomakkeen tiedot. Anna luokan nimeksi mikä tahansa luokka, joka sinulle sopii. Jos haluat, että kuka tahansa seurakuntasi jäsen voi täyttää tehtävän (ei vain yhden tiimin jäsenet), jätä **Volunteer Group** asetukseen **None**.
3. Napsauta **People Needed** ja valitse tehtävään vapaaehtoiset. Jos tehtävällä on **Volunteer Group**, valitset henkilöt kyseisen ryhmän jäsenistä. Jos sen Volunteer Group on **None**, voit etsiä ketä tahansa seurakunnastasi.
4. Lisää jäseniä tiimilistaltasi napsauttamalla **Add**.
5. Määritetyt jäsenet näkyvät tiimissään ja heidän tehtävänsä tila on näkyvissä.
6. Napsauta **notify volunteers** ilmoittaaksesi vapaaehtoisille B1-sovelluksessa tai sähköpostitse. Jos suunnitelmassa käytetään [vahvistustyönkulkua](#plan-settings), ilmoitus käynnistää myös työnkulkukortin, joka seuraa jokaista pyyntöä, kunnes vapaaehtoinen vastaa.

Jokaisessa tehtävässä on laskuri (esimerkiksi "2/3"), jotta näet yhdellä silmäyksellä, montako paikkaa on täytetty. Otsikon **Serving Team Assignments** alla on yhteenveto ("X of Y positions filled"), joka kertoo suunnitelman kokonaismiehityksen ja sen, montako paikkaa vielä tarvitaan. Kun jokainen tehtävä on täytetty, yhteenveto vaihtuu tilaan **Fully staffed**.

:::tip
Luo tiimit seurakunnan asetuksissa ennen suunnitelmien luomista. Näin sinulla on valmiina vapaaehtoisten joukko, josta voit määrittää tehtäviä.
:::

### Tehtävien kopiointi tyhjään suunnitelmaan

Jos suunnitelmassa ei ole vielä tehtäviä ja saman tyypin aiempi suunnitelma on olemassa, Serving Team Assignments -osioon ilmestyy linkki **Copy from Previous Plan**. Valitse **Positions Only** tai **Positions and Assignments**, jolloin avoinna oleva suunnitelma täyttyy edellisen suunnitelman tehtävillä (ja vapaaehtoisilla). Kopio menee nykyiseen suunnitelmaan, eikä se luo toista suunnitelmaa samalle päivälle.

## Suunnitelman asetukset

Jokaisessa suunnitelmassa on lisäasetuksia, joita voit muokata napsauttamalla suunnitelman vieressä olevaa **Edit**-painiketta suunnitelmatyypin luettelossa tai suunnitelmasivun yläreunan **Edit**-painiketta. Palaa suunnitelmaan napsauttamalla **Done** (tai suunnitelman nimeä). Asetuksiin kuuluvat:

- **Signup Deadline (hours before service)** — tuntien määrä ennen palvelua, jolloin vapaaehtoisten ilmoittautuminen päättyy. Tunnit lasketaan taaksepäin suunnitelman ensimmäisestä **Service**-ajasta (harjoitukset ja muut ajat ohitetaan, ellei suunnitelmassa ole muuta). Esimerkiksi 2 tunnin raja klo 10.00 alkavalle palvelulle sulkee ilmoittautumisen samana aamuna klo 8.00. Jos suunnitelmassa ei ole aikoja, raja lasketaan palvelun päivän klo 9.00 seurakuntasi aikavyöhykkeen mukaan. Rajan ylittymisen jälkeen vapaaehtoiset eivät voi enää ilmoittautua eivätkä perua ilmoittautumistaan. Syötä negatiivinen luku, jos haluat pitää ilmoittautumisen auki palvelun alkamisajan jälkeenkin. Jätä kenttä tyhjäksi tai tyhjennä se, jos rajaa ei tarvita.
- **Confirmation workflow** — valitse [Serving Assignment Confirmation -työnkulku](./workflows.md#serving-assignment-confirmations), jolla seurataan tämän suunnitelman palvelupyyntöjä sähköpostitse ja tekstiviestein, kunnes jokainen vapaaehtoinen hyväksyy tai hylkää pyynnön. Kun napsautat **Notify** julkaistussa suunnitelmassa, jokaisella uudella pyynnöllä on oma korttinsa kyseisen työnkulun taulussa. Ilmoituslinkin yläpuolella näkyy huomautus *"New requests use the confirmation workflow."* Jätä asetukseksi **Use existing assignment notifications**, jos haluat tavalliset ilmoitukset. Luettelossa näkyvät vain aktiiviset vahvistustyönkulut. Luo työnkulku ensin kohdassa **Serving > Workflows**.
- **Show volunteer names on signup page** — kun tämä on valittuna, kirjautuneet vapaaehtoiset näkevät B1.church-ilmoittautumissivulla, ketkä muut ovat jo ilmoittautuneet kuhunkin tehtävään. Nimiä ei koskaan näytetä kirjautumattomille vierailijoille.
- **Penciled in** — piilottaa määritykset vapaaehtoisilta, kunnes olet valmis julkaisemaan aikataulun.
- **Automatically schedule a replacement when a volunteer declines** — kun tämä on valittuna, B1 ottaa automaattisesti yhteyttä seuraavaan saatavilla olevaan tiimin jäseneen, jos määritetty vapaaehtoinen hylkää tehtävän, ja kysyy, voisiko hän palvella. Tämä jatkuu listaa pitkin, kunnes joku hyväksyy. Näin tehtävät pysyvät täytettyinä ilman manuaalista seurantaa.

:::tip
Jäsenten ilmoittautumissivulla kunkin suunnitelman avoimet tehtävät on lueteltu ensin luokan ja sitten nimen mukaan. Jäsenet näkevät kaikki tulevat viikot, joissa on avoimia tehtäviä, ellet ota käyttöön asetusta **Show only the next week of each plan type** kohdassa [Settings > Volunteer Signup](../settings/church-settings.md#volunteer-signup).
:::

## Vapaaehtoisten muistutukset {#volunteer-reminders}

B1 voi lähettää vapaaehtoisille automaattisia muistutuksia ennen palveluja, joihin heidät on ajoitettu, joten sinun ei tarvitse muistuttaa tiimiäsi joka viikko erikseen. Muistutukset lähetetään **kaikille ajoitetuille** eli sekä niille, jotka ovat vahvistaneet, että niille, jotka eivät ole vielä vastanneet. Poikkeus on pyyntö, joka lähetetään [vahvistustyönkulun](./workflows.md#serving-assignment-confirmations) kautta: tällainen vapaaehtoinen saa muistutuksia vasta hyväksyttyään, koska työnkulku hoitaa seurannan siihen asti. Jokainen muistutussähköposti sisältää vapaaehtoisen tehtävät, palvelun päivämäärän, suunnitelman muistiinpanot ja oman viestisi.

Muistutusten ajoitus ja sisältö asetetaan **suunnitelmatyypin** mukaan, joten jokaisella palvelutyypillä voi olla oma aikataulunsa.

1. Valitse Serving-alueelta palvelutehtävä, johon suunnitelmatyyppi kuuluu.
2. Napsauta **Plan Types**-luettelossa suunnitelmatyypin vieressä **Edit**.
3. Laajenna **Reminders**-osio ja ota käyttöön **Send reminders for plans of this type**.
4. Kohdassa **When should reminders go out?** valitse enintään kolme ajankohtaa: **7 days before**, **3 days before**, **2 days before**, **1 day before** tai **Day of**.
5. Aseta **Time of Day**, jolloin muistutukset lähtevät.
6. Voit halutessasi lisätä **Message**-viestin. Jätä kenttä tyhjäksi, jos haluat oletusmuotoilun.
7. Kohdassa **Send By** valitse **Push**, **Email** ja, jos seurakuntasi on yhdistetty [tekstiviestipalveluun](../settings/church-settings.md#texting), myös **Text**.
8. Napsauta **Save Reminders**.

Muistutukset ovat pois päältä suunnitelmatyypille, kunnes otat ne käyttöön.

:::tip
Vapaaehtoisilla, jotka eivät ole vielä vahvistaneet, on muistutussähköpostissa suoraan **Accept**- ja **Decline**-painikkeet. Näin he voivat vastata kirjautumatta sisään.
:::

### Tekstiviestimuistutukset

**Text**-vaihtoehto näkyy vain, kun seurakunnallasi on yhdistetty tekstiviestipalvelu. Tekstiviestit lähetetään seurakuntasi tekstiviestipalvelun kautta, ja jokainen viesti voi maksaa seurakunnalle. Vapaaehtoinen saa tekstimuistutuksen vain, jos hän on ottanut käyttöön **Text messages** -asetuksen [ilmoitusasetuksissaan](../../b1-church/getting-started/notification-preferences.md) ja hänen profiilissaan on matkapuhelinnumero. Jokainen viesti alkaa seurakuntasi nimellä, pysyy yhdessä tekstiviestissä ja päättyy tekstiin "Reply STOP to opt out." Jos joku vastaa STOP, hän ei enää saa tekstiviestejä seurakunnaltasi. Jotta STOP-vastaukset tavoittavat B1:n, kopioi **Inbound (STOP) webhook URL** [tekstiviestiasetuksistasi](../settings/church-settings.md#texting) ja liitä se palveluntarjoajasi saapuvien viestien webhookiin.

Jos haluat lähettää tekstiviestin kaikille tietyn päivämäärävälin ajoitetuille heti, käytä **Text Volunteers** -toimintoa [Plans Overview](./plans-overview.md#texting-everyone-scheduled) -näkymässä.

:::info
Jokainen muistutus lähetetään kerran. Tekstiviestimuistutukset lähetetään push- ja sähköpostimuistutusten lisäksi, eivät niiden sijasta.
:::

## Ryhmien liittäminen suunnitelmatyyppiin

Suunnitelmaluettelon alapuolella suunnitelmatyypin sivulla **Associated Groups** -osion avulla voit päättää, mitkä ryhmät näkevät tämän suunnitelmatyypin suunnitelmat jäsenportaalistaan. Tämä on nopea tapa tuoda tulevat palvelut oikeille tiimeille antamatta niille ylläpitäjän oikeuksia.

1. Napsauta suunnitelmatyypin sivun yläreunassa **Associated Groups** (tai vieritä kyseiseen osioon).
2. Napsauta **Add Group** ja valitse ryhmä pudotusvalikosta.
3. Valitse **Shows**-sarakkeesta, näkevätkö kyseisen ryhmän jäsenet tämän suunnitelmatyypin kohdalla **Past plans only**, **Upcoming plans only** vai **Past and upcoming plans**.
4. Lisää toisia ryhmiä toistamalla vaiheet tai poista ryhmä napsauttamalla roskakorin kuvaketta.

:::info
Pudotusvalikossa näkyvät vain ryhmät, jotka on merkitty **Standard**-tyyppisiksi. Liitetyn ryhmän jäsenet näkevät automaattisesti tämän suunnitelmatyypin suunnitelmat ryhmän sivulla B1-jäsenportaalissa, valitsemallasi aikavälillä.
:::

Jos suunnitelmat ovat Lessons.church-oppitunteja, liitetyn ryhmän jäsenet näkevät ryhmän sivulla myös kortin **This week's lesson** (päivän pääpointti, jae ja kysymys vanhemmille). Liitä vanhempien ryhmä tähän ja aseta suodattimeksi **Past plans only**, jotta tämän päivän oppitunti sisältyy näkymään. Vapaaehtoistiimit käyttävät yleensä asetusta **Upcoming plans only** tai **Past and upcoming plans**.

## Suunnitelmien tulostaminen

Voit tulostaa suunnitelman jaettavaksi tiimillesi. Avaa suunnitelma ja napsauta sivun yläreunassa **Print**. Tämä luo tulostettavan version, joka sisältää määritykset ja palvelujärjestyksen. Tulosteen yläreunassa näkyy seurakuntasi logo (**Light Background Logo** kohdasta [Website > Appearance](../website/appearance.md), jos olet ladannut sellaisen) ja sen alla seurakuntasi nimi sekä suunnitelman nimi, jotta irralliset sivut on helppo tunnistaa. Tämä on hyödyllistä jaettaessa harjoituksissa tai ilmoitettaessa yhteisessä tilassa.

Tulosteeseen ei sisälly tyhjiä kohtia. Jos vapaaehtoisia ei ole määritetty, tiimilaatikkoa ei tulosteta ja palvelujärjestys käyttää koko sivun leveyttä. Jos yhdelläkään kohteella ei ole pituutta, sarake **Length** jätetään pois. Jos suunnitelmassa ei ole palveluaikoja eikä pituuksia, myös sarake **Time** jätetään pois. Jos haluat poistaa palvelun päivämäärän kanssa näkyvän mustan **Service Order** -otsikkopalkin, poista valinta kohdasta **Show Service Order heading** tulostussivun yläreunassa. B1 Admin muistaa valintasi kyseisellä selaimella.

:::info
Suunnitelmat on järjestetty palvelutehtävän mukaan. Varmista, että olet oikean palvelutehtävän välilehdellä ennen suunnitelmien luomista tai katselua.
:::

## Seuraavat vaiheet

- Käytä [Plans Overview](./plans-overview.md) -näkymää nähdäksesi kaikki tulevat tehtävät useilta viikoilta yhdessä ruudukossa ja huomataksesi täyttämättömät tehtävät. Voit myös määrittää vapaaehtoisia suoraan ruudukosta.
- Tallenna suunnitelman rakenne [suunnitelmamallina](./plan-templates.md), jotta voit lisätä sen tuleviin suunnitelmiin yhdellä napsautuksella
- Rakenna [palvelujärjestys](./service-order.md) lauluilla, lukukappaleilla ja muilla elementeillä
- Lisää [laulut](./songs.md) kirjastostasi suoraan palvelujärjestykseen
- Käytä [Tehtäviä](./tasks.md) seurantatehtävien antamiseen tiimin jäsenille
- Näytä ajankohtainen oppitunnin sisältö aulan televisiossa [Digitaalisen kyltityksen](./digital-signage.md) avulla
