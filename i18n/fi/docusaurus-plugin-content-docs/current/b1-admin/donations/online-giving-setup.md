---
title: "Verkkolahjoitusten määrittäminen"
---

# Verkkolahjoitusten määrittäminen

<div class="article-intro">

B1 Admin integroituu **Stripe**-, **PayPal**-, **Kingdom Funding**- ja **Paystack**-palveluihin (Afrikan seurakunnille), joten jäsenesi voivat antaa lahjoituksia verkossa B1.church-sivustosi kautta. Kun määritykset on tehty, verkkolahjoitukset näkyvät automaattisesti lahjoitustietueissasi manuaalisesti kirjattujen lahjojen rinnalla, joten kaikki pysyy yhdessä järjestelmässä.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Määritä [lahjoitusrahastot](funds.md), jotta lahjoittajat voivat kohdentaa lahjansa
- Luo Stripe-tili osoitteessa [stripe.com](https://stripe.com) ja aktivoi se (poista testitila käytöstä)
- Valmistele B1 Adminin kirjautumistiedot

</div>

## Stripen määrittäminen

1. Luo tili osoitteessa [stripe.com](https://stripe.com), jos sinulla ei ole sellaista vielä. Varmista, että **aktivoit tilisi** ja poistat testitilan käytöstä.
2. Siirry Stripessä kohtaan **Developers > API Keys**.
3. Kopioi **Publishable Key**.
4. Kirjaudu sisään [B1 Adminiin](https://admin.b1.church/).
5. Siirry kohtaan **Settings** ja avaa **Giving**-osio.
6. Napsauta **Edit** **Giving**-osiossa.
7. Valitse **Provider**-kentäksi **Stripe**.
8. Liitä Publishable Key **Public Key**-kenttään.
9. Palaa Stripeen ja näytä **Secret Key** (sen voi nähdä vain kerran, joten tallenna varmuuskopio).
10. Liitä Secret Key **Secret Key**-kenttään ja napsauta **Save**.

:::warning
Stripen salainen avain näytetään vain kerran. Kopioi se turvalliseen paikkaan ennen kuin poistut Stripen hallintanäkymästä. Jos menetät sen, sinun on luotava uusi avain.
:::

## Valuutan valinta

Kun olet valinnut Stripen palveluntarjoajaksesi, API-avainten viereen ilmestyy **Currency**-pudotusvalikko. Valitse valuutta, joka vastaa Stripe-tilisi selvitysvaluuttaa, jotta lahjoitukset veloitetaan oikein.

Tuettuja valuuttoja ovat USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN ja BRL. Voit vahvistaa tai vaihtaa tilisi oletusvaluutan [Stripe-hallintanäkymässä](https://dashboard.stripe.com/settings/currencies).

:::info
Tässä valitsemaasi valuuttaa käytetään kertaluonteisiin lahjoituksiin, toistuviin tilauksiin, kulujen laskentaan ja lahjoitusraportteihin. Jos vaihdat valuuttaa myöhemmin, vain uudet lahjoitukset ja tilaukset käyttävät uutta valuuttaa. Olemassa olevat toistuvat lahjat jatkuvat siinä valuutassa, jossa ne luotiin.
:::

:::warning
Varmista, että Stripe-tilisi on määritetty hyväksymään valitsemasi valuutta. Jos Stripe-tilisi ei tue valittua valuuttaa, lahjoitukset epäonnistuvat maksuvaiheessa.
:::

## Apple Pay ja Google Pay

Stripeä käyttävät seurakunnat saavat Apple Pay- ja Google Pay -painikkeet julkiselle lahjoitussivulle automaattisesti. Painikkeet näkyvät korttikenttien yläpuolella kertaluonteisissa lahjoituksissa, kun lahjoittaja on valinnut rahaston ja summan. Ne näkyvät vain, jos lahjoittajan selaimessa tai laitteessa on lompakko määritettynä. Toistuvat lahjat käyttävät edelleen kortti- tai pankkikenttiä.

Google Pay ei vaadi mitään määrityksiä. Apple Pay edellyttää, että lahjoitussivusi verkkotunnus on rekisteröity Stripeen. B1 rekisteröi sen, kun lahjoitussivu ladataan ensimmäisen kerran verkkotunnuksellasi. Jos Apple Pay -painike ei näy iPhonessa, tarkista Stripe-hallintanäkymästä kohta **Settings > Payment method domains** ja varmista, että `yoursubdomain.b1.church`-verkkotunnuksesi (tai mukautettu verkkotunnuksesi) on listattu ja vahvistettu.

## Anonyymit lahjat

Julkisella lahjoitussivulla lahjoittajat voivat valita **Give anonymously**. Anonyymi lahja kirjataan ilman lahjoittajaa, se menee silti lahjoittajan valitsemalle rahastolle, ja se näkyy erissä ja raporteissa nimellä **Anonymous**. Lahjoittajan sähköpostiosoite vaaditaan edelleen, jotta kuitti voidaan lähettää, mutta henkilötietuetta ei luoda. Anonyymit lahjat ovat vain kertaluonteisia, eivätkä ne näy lahjoitustodistuksissa.

## Epäonnistuneet toistuvat lahjat

Kun toistuva lahja Stripessä epäonnistuu (esimerkiksi vanhentuneen tai hylätyn kortin vuoksi), epäonnistunut veloitus näkyy kohdassa **Donations > Failed Gifts**. Siinä näkyvät lahjoittaja, summa, päivämäärä ja maksupalvelun ilmoittama syy. Kun lahjoittaja on päivittänyt maksutapansa, napsauta **Retry** yrittääksesi veloitusta uudelleen.

B1 lähettää lahjoittajalle sähköpostin myös silloin, kun veloitus epäonnistuu. Jos veloitus ei ole vieläkään onnistunut kolmen ja seitsemän päivän kuluttua, B1 lähettää viestit uudelleen. Viesteissä on linkki, jolla lahjoittaja voi päivittää maksutapansa B1.church-sivustolla.

:::info
Jos seurakuntasi on määrittänyt Stripen ennen tätä ominaisuutta, avaa **Settings** > **Giving**, napsauta muokkausta ja napsauta **Save** kerran. Tämä päivittää Stripen webhookin, jotta epäonnistuneet veloitukset raportoidaan B1:lle.
:::

## Lahjoitussivun lisääminen B1.church-sivustollesi

1. Siirry osoitteeseen [b1.church](https://b1.church/) ja kirjaudu sisään.
2. Napsauta **Settings**-kuvaketta.
3. Napsauta **Add Tab**.
4. Valitse tyypiksi **Donation**.
5. Anna välilehdelle nimi (esimerkiksi ”Give”) ja napsauta **Save**.
6. Voit halutessasi vaihtaa välilehden kuvakkeen. Kirjoita kuvakehakuun ”Giv” ja valitse lahjoittamiseen liittyvä kuvake.

Lahjoitussivusi on nyt käytössä. Jäsenet voivat vierailla sivulla osoitteessa `yoursubdomain.b1.church/donate`.

## Lahjoituslinkin jakaminen

Löydät lahjoituslinkkisi siirtymällä kohtaan **B1 Admin** ja napsauttamalla **Settings**-kuvaketta, josta näet alidomainisi. Lahjoituslinkkisi noudattaa muotoa:

`https://yoursubdomain.b1.church/donate`

Jaa tämä linkki verkkosivuillasi, sähköposteissa tai kirkkolehdessä, jotta jäsenet tietävät, mistä voivat antaa lahjoituksia verkossa.

### Linkit valmiiksi valitulla rahastolla ja summalla

Jos haluat ohjata lahjoittajat suoraan tietylle rahastolle, siirry kohtaan **Donations > Funds** ja napsauta rahaston kohdalla **Giving Link**. Voit halutessasi syöttää summan ja kopioida sitten linkin. Valintaikkunassa näkyy myös saman linkin QR-koodi. Napsauta **Download PNG** tallentaaksesi sen kirkkolehteen, diaan tai julisteeseen. Kun lahjoittaja avaa linkin tai skannaa koodin, rahasto ja summa ovat jo valittuina lahjoitussivulla. Linkki on muotoa:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Samat parametrit toimivat myös verkkosivurakentajan **Donate Link** -elementissä.

## Lahjoitusilmoitukset

Stripe lähettää sähköpostitse ilmoituksen jokaisesta vastaanotetusta lahjoituksesta. Voit vaihtaa ilmoitusten sähköpostiosoitteen siirtymällä Stripen hallintanäkymään, napsauttamalla oikeassa yläkulmassa profiiliasi, valitsemalla **Profile** ja päivittämällä sähköpostiosoitteesi.

## Käsittelymaksujen vaihtoehdot

Voit määrittää lahjoitussivun niin, että lahjoittajat voivat halutessaan maksaa käsittelymaksut. Tällöin seurakuntasi saa koko lahjoitussumman. Tämä asetus hallitaan B1 Adminin seurakunta-asetuksissa.

:::tip
Ennen kuin ilmoitat verkkolahjoittamisesta seurakunnallesi, tee pieni testilahjoitus ja varmista, että kaikki toimii.
:::

## Kingdom Fundingin määrittäminen

Kingdom Funding on kristillinen maksunvälittäjä, joka tukee luottokortti- ja pankkikorttimaksuja sekä ACH-pankkisiirtoja. Jos seurakuntasi on liittynyt Kingdom Fundingiin, voit yhdistää sen lahjoitusyhdyskäytäväksi.

:::info
Kingdom Fundingin integraatio on tällä hetkellä beta-vaiheessa. Ota yhteyttä B1-tilisi edustajaan, jotta voimme ottaa sen käyttöön seurakunnallesi.
:::

1. Rekisteröidy tai kirjaudu sisään osoitteessa [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Hae **Security Key** (julkinen) ja **Private Key** Kingdom Fundingin kauppiasportaalista.
3. Siirry B1 Adminissa kohtaan **Settings**, avaa **Giving**-osio ja napsauta muokkausta.
4. Valitse **Provider**-kentäksi **Kingdom Funding**.
5. Liitä Security Key **Security Key** -kenttään ja Private Key **Private Key** -kenttään.
6. Aseta **Webhook Key**, jonka sait Kingdom Fundingiltä, ja kopioi näkyvä webhook-osoite Kingdom Fundingin kauppiasasetuksiin. Näin Kingdom Funding voi ilmoittaa B1:lle valmistuneista tapahtumista.
7. Tallenna.

Kun yhteys on muodostettu, jäsenet näkevät lahjoitussivulla kortti/pankki-valitsimen ja voivat antaa lahjoituksia luottokortilla tai ACH-pankkisiirrolla.

## PayPal- ja Venmo-painikkeet

Seurakunnat, jotka käyttävät **PayPal**-palveluntarjoajana, saavat lahjoitussivulle **PayPal**- ja **Venmo**-painikkeet korttikenttien yläpuolelle kertaluonteisia lahjoituksia varten. Lahjoittaja, joka napsauttaa jotakin painikkeista, viimeistelee maksun PayPal-ikkunassa, ja lahjoitus kirjataan kuten mikä tahansa muu verkkolahjoitus. Venmo näkyy vain Yhdysvalloissa oleville lahjoittajille laitteilla, jotka PayPal katsoo sopiviksi. Toistuvat lahjat käyttävät edelleen korttikenttiä.

## Paystackin määrittäminen (Afrikka)

Stripe ei avaa tilejä seurakunnille Ghanassa, Nigeriassa, Keniassa, Etelä-Afrikassa tai Norsunluurannikolla. [Paystack](https://paystack.com) avaa, ja se hyväksyy paikalliset kortit, **mobiilirahan** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), pankkisiirrot ja USSD-maksut. Lahjoittajat maksavat paikallisessa valuutassa (GHS, NGN, KES, ZAR, XOF).

1. Rekisteröidy osoitteessa [paystack.com](https://paystack.com) seurakuntasi yritysrekisteriotteella ja paikallisella pankkitilillä, ja suorita Paystackin aktivointi (käyttöönoton tarkistus).
2. Avaa Paystack-hallintanäkymässä kohta **Settings → API Keys & Webhooks** ja kopioi **Public Key** ja **Secret Key**. Käytä tuotantoavaimia, älä testiavaimia.
3. Siirry B1 Adminissa kohtaan **Settings**, avaa **Giving**-osio ja napsauta muokkausta.
4. Valitse **Provider**-kentäksi **Paystack**, liitä Public Key ja Secret Key ja valitse **Currency**.
5. Kopioi palveluntarjoajan alla näkyvä **webhook-osoite**, palaa Paystack-hallintanäkymään (**Settings → API Keys & Webhooks**) ja liitä osoite **Webhook URL** -kenttään. Näin toistuvat lahjat ja mobiilirahamaksut kirjataan.
6. Tallenna.

Lahjoittajat viimeistelevät maksun suojatussa Paystack-ikkunassa ja voivat valita siellä kortin, mobiilirahan tai pankkisiirron. Huomioi seuraavaa:

- **Toistuvat lahjat** vaativat kortin. Mobiilirahalla ei voi veloittaa automaattisesti uudelleen, joten Paystack sallii vain kertaluonteiset mobiilirahalahjoitukset.
- Paystackin toistuvat lahjat voi peruuttaa B1:stä, mutta niitä ei voi keskeyttää eikä muokata. Jos haluat muuttaa summaa, peruuta lahja ja luo uusi.
- **Processing Fee** -oletusarvot vastaavat Paystackin paikallisten korttien hintoja valitsemallesi valuutalle. Muokkaa niitä, jos neuvotellut hintasi poikkeavat.

## Seuraavat vaiheet

- Jos verkkotapahtumat eivät synkronoidu automaattisesti, tuo ne B1 Adminiin [Stripe-tuonnilla](stripe-import.md)
- Tarkista [lahjoitusraporteista](donation-reports.md), että verkkolahjoitukset näkyvät oikein
- Luo [lahjoitustodistukset](giving-statements.md), jotka sisältävät sekä verkko- että paikan päällä annetut lahjoitukset
