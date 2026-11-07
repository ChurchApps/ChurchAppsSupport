---
title: "Itseisännöinti Railwayssa"
description: "Ota yksityinen ChurchApps-instanssi käyttöön Railwayssa noin 15 minuutissa ja määritä sen jälkeen sähköposti, mukautetut domainit, usean seurakunnan reititys, lahjoitukset ja tiedostotallennus B1 Adminille ja B1Appille."
---

# Itseisännöinti Railwayssa

<div class="article-intro">

ChurchApps julkaisee yhden napsautuksen [Railway](https://railway.com)-mallipohjan, jonka avulla seurakunnallasi on oma yksityinen ilmentymä B1 Administa, B1-jäsenportaalista, rajapinnasta ja MySQL-tietokannasta. Kaikki toimii infrastruktuurissa, jonka omistat ja jonka maksat suoraan. Tämä opas auttaa sinut käyttöön noin 15 minuutissa ja käy sen jälkeen läpi julkaisun jälkeiset asetukset, joita useimmat seurakunnat haluavat myöhemmin.

</div>

## Pikaohje

[![Ota käyttöön Railwayssa](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Napsauta yllä olevaa **Deploy on Railway** -painiketta.
2. Kirjaudu Railwayhin (tai luo ilmainen tili) ja lisää maksutapa.
3. Napsauta **Deploy** muuttamatta mitään. Jokaisella muuttujalla on järkevä oletusarvo.
4. Odota 5–10 minuuttia, kunnes neljä palvelua muuttuvat vihreiksi.
5. Avaa **B1Admin**-palvelun URL-osoite, napsauta **Register** ja luo tilisi. Ensimmäinen tili on automaattisesti palvelimen ylläpitäjä.
6. Luo ensimmäinen seurakuntasi sovelluksen ohjeiden mukaan.

Siinä kaikki. Sinulla on nyt täysin toimiva ChurchApps-ilmentymä. Kaikki alla oleva on valinnaista hiomista.

:::tip
Julkaisu on tällä hetkellä **beta**-vaiheessa. Jos kohtaat jotain, mitä tämä dokumentaatio ei kata, avaa ongelma-ilmoitus osoitteessa [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) ja liitä mukaan julkaisun lokit.
:::

<div class="prereqs">
<h4>Tarvitset</h4>

- Ilmaisen [Railway](https://railway.com)-tilin
- Railwayhin tallennetun luottokortin (noin 15–25 dollaria kuukaudessa pienelle seurakunnalle; katso [Kustannukset](#costs))
- Noin 15 minuuttia alkuperäiseen julkaisuun
- *Valinnainen mutta erittäin suositeltava myöhemmin:* SMTP-tunnukset ja mukautettu verkkotunnus

</div>

## Mitä julkaistaan

Mallipohja ottaa käyttöön neljä palvelua yhteen Railway-projektiin:

| Palvelu | Tarkoitus | URL-osoite julkaisun jälkeen |
|---------|-----------|------------------------------|
| **MySQL** | Tallentaa kaikki tiedot (yksi ilmentymä, useita skeemoja) | vain sisäinen |
| **Api** | Taustajärjestelmä jäsenyyksille, sisällölle, lahjoituksille, osallistumiselle jne. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Henkilökunnan ja ylläpitäjien verkkosovellus | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Jäsenille suunnattu verkkosovellus ja seurakunnan verkkosivusto | `https://b1app-<id>.up.railway.app` |

Tietokantaskeemat luodaan automaattisesti ensimmäisen käynnistyksen yhteydessä rajapinnan käynnistysmigraatiolla.

## Ensimmäinen määritys

Kun olet nyt käynnissä, tässä ovat asiat, jotka useimmat seurakunnat määrittävät seuraavaksi, suunnilleen tärkeysjärjestyksessä.

### 1. Sähköposti (erittäin suositeltava)

Ilman sähköpostia jäsenet voivat silti rekisteröityä ja käyttää järjestelmää, mutta **he eivät voi palauttaa unohtuneita salasanoja**. Ylläpitäjän täytyy tehdä se heidän puolestaan. SMTP:n määrittäminen vie noin 5 minuuttia.

Avaa Railway-hallintanäkymässä **Api**-palvelu → **Variables** ja lisää:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Kolme kannattaa tuntea:

#### Resend: yksinkertaisin ilmainen vaihtoehto (100 sähköpostia päivässä)

1. Rekisteröidy osoitteessa [resend.com](https://resend.com).
2. Vahvista lähetysverkkotunnus (tai aloita käyttämällä testilähettäjää `onboarding@resend.dev`).
3. Luo API-avain.
4. Aseta `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend` ja `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail: ilmainen henkilökohtaiseen käyttöön (noin 500 päivässä)

1. Ota kaksivaiheinen todennus käyttöön Google-tilillä.
2. Luo [sovellussalasana](https://myaccount.google.com/apppasswords).
3. Aseta `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com` ja `SMTP_PASS=<16-merkkinen sovellussalasana>`.

#### AWS SES: edullisin suuressa mittakaavassa

1. Vahvista lähetysverkkotunnus AWS:ssä.
2. Poistu SES-hiekkalaatikosta, jos aiot lähettää vahvistamattomiin osoitteisiin.
3. Luo SMTP-tunnukset kohdassa **SES → SMTP Settings → Create credentials**.
4. Aseta `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...` ja `SMTP_PASS=<SES SMTP -salasana>`.

Muuttujien tallentamisen jälkeen Api-palvelu julkaistaan uudelleen automaattisesti. Testaa asetus käynnistämällä salasanan palautus testitilillä.

:::warning
Jos asetat `MAIL_SYSTEM=SMTP` virheellisillä tunnuksilla, rekisteröinti näyttää onnistuneen, mutta vahvistussähköpostia ei koskaan saavu. Korjaa tunnukset tai poista `MAIL_SYSTEM`-muuttuja, jolloin järjestelmä palaa tilaan ilman sähköpostia.
:::

### 2. Mukautetut verkkotunnukset

Oletusarvoiset `*.up.railway.app`-osoitteet toimivat, mutta useimmat seurakunnat haluavat omat.

Jokaiselle verkkopalvelulle (B1Admin ja B1App):

1. Avaa palvelu Railwayssa → **Settings** → **Networking**.
2. Napsauta **+ Custom Domain** ja kirjoita isäntänimi:
   - `admin.yourchurch.org` B1Adminille
   - `app.yourchurch.org` (tai `www`) B1Appille
3. Lisää Railwayn näyttämä CNAME-tietue DNS-palveluntarjoajaasi.
4. Odota muutama minuutti, jotta DNS-muutokset leviävät. Railway hankkii TLS-varmenteen automaattisesti.

Päivitä sen jälkeen **Api**-palvelun muuttujat, jotta sähköpostien linkit osoittavat uusiin verkkotunnuksiin:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Ja **B1Admin**-palvelussa:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}`-merkkijono on kirjaimellinen. Ajonaikaisesti se korvataan kunkin seurakunnan alidomainilla (katso Monisivusto alla).

### 3. Monisivusto (useita seurakuntia yhdessä ilmentymässä)

ChurchApps on suunniteltu alun perin monivuokralaisuudelle. Yksi julkaisu voi isännöidä mielivaltaisen määrän seurakuntia, joilla kullakin on omat jäsenet, ryhmät ja verkkosivusto. Uudet seurakunnat lisätään kokonaan ylläpitokäyttöliittymän kautta, eikä infrastruktuurimuutoksia tarvita.

#### Lisäseurakuntien lisääminen

1. Siirry **B1 Adminissa** kohtaan **Settings → Manage Church → Switch Church → Create New**.
2. Jokaisella seurakunnalla on yksilöllinen **alidomain-tunniste** (esim. `firstchurch`, `gracecommunity`).
3. Uusi seurakunta saa oman tiedot, jäsenet, verkkosivuston ja lahjoitusasetukset, jotka ovat täysin erillään saman ilmentymän muista seurakunnista.

#### Kunkin seurakunnan ohjaaminen omaan URL-osoitteeseensa

Seurakunnat voidaan julkaista julkisesti kahdella tavalla:

| Malli | Esimerkki | Asennus |
|-------|-----------|---------|
| **Polkupohjainen** (toimii heti) | `app.yourchurch.org/firstchurch` | Ei lisäasennusta |
| **Alidomainipohjainen** (siistimmät URL-osoitteet) | `firstchurch.yourchurch.org` | Jokerimerkkinen DNS ja jokerimerkkinen mukautettu verkkotunnus |

Alidomainipohjaista reititystä varten Railwayssa:

1. Luo DNS-palveluntarjoajassasi jokerimerkkinen CNAME-tietue: `*.yourchurch.org → <b1app Railway -kohde>`.
2. Lisää Railwayssa B1App-palvelussa **Settings → Networking** -kohdassa `*.yourchurch.org` mukautetuksi verkkotunnukseksi.
3. Aseta **B1Admin**-palvelussa `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Uudelleenjulkaisun jälkeen kunkin seurakunnan sivusto palvellaan automaattisesti osoitteessa `<heidän-alidomaininsa>.yourchurch.org`.

:::info
Jokerimerkkiset mukautetut verkkotunnukset vaativat maksullisen Railway-tilauksen. Polkupohjainen reititys toimii kaikilla tilauksilla ja on toiminnallisesti identtinen. Ero on vain osoitepalkin ulkoasussa.
:::

### 4. Verkkolahjoitukset (Stripe / PayPal)

Lahjoitukset määritetään **seurakuntakohtaisesti ylläpitokäyttöliittymässä**, eikä ympäristömuuttujien kautta. Näin kukin seurakunta voi käyttää omaa kauppiastiliään.

1. Hae kehittäjätunnukset palvelusta [Stripe](https://dashboard.stripe.com/) (Developers → API keys) tai [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Siirry B1 Adminissa kohtaan **Settings → Giving Settings**.
3. Valitse palveluntarjoaja, liitä julkinen ja salainen avain ja määritä maksujen käsittely.
4. Voit halutessasi lisätä `GOOGLE_RECAPTCHA_SECRET_KEY`-muuttujan **Api**-palveluun Railwayssa, jotta julkiset lahjoituslomakkeet suojataan botteja vastaan.

### 5. Tiedostojen tallennus

Mallipohja ottaa käyttöön **1 Gt:n pysyvän levyn**, joka on kytketty Api-palveluun jäsenkuvia, saarnatiedostoja ja ladattuja asiakirjoja varten.

Kasvattaaksesi levyä: avaa Api-palvelu → **Volumes** → säädä kokoa liukusäätimellä.

Suuremmissa julkaisuissa (100 Gt tai enemmän tai useita samanaikaisia latauksia) siirry S3:een asettamalla **Api**-palveluun seuraavat:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Levyllä olevat tiedostot eivät siirry automaattisesti. Kopioi ne bucketiin ennen muuttujan vaihtamista.

### 6. Valinnaiset ominaisuusintegraatiot

Nämä ottavat käyttöön tiettyjä ominaisuuksia, ja ne voi kaikki lisätä myöhemmin Railway-hallintanäkymän kautta. Aseta ne **Api**-palveluun.

| Muuttuja | Ominaisuus, jonka se ottaa käyttöön |
|----------|-------------------------------------|
| `OPENAI_API_KEY` *tai* `OPENROUTER_API_KEY` | Tekoälyavusteinen haku ja sisältöehdotukset |
| `YOUTUBE_API_KEY` | YouTube-saarnahaku ja upottaminen |
| `PEXELS_KEY` | Kuvapankkivalitsin verkkosivustojen rakentajaan |
| `VIMEO_TOKEN` | Vimeo-saarnatuki |
| `API_BIBLE_KEY` | Raamatunjaehakut oppitunneissa ja sisällössä |
| `YOUVERSION_API_KEY` | YouVersion-Raamattu-integraatio |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Selaimen push-ilmoitukset ([luo VAPID-avainpari](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Valinnainen CRM-synkronointi uusille rekisteröitymisille |

## Päivittäminen

Jokainen palvelu on yhdistetty vastaavaan GitHub-repositorioon. Muutokset `main`-haaraan repositorioissa `ChurchApps/Api`, `ChurchApps/B1Admin` tai `ChurchApps/B1App` käynnistävät automaattiset uudelleenjulkaisut.

Jos haluat lukita tietyn version, vaihda kunkin palvelun **Branch**-asetukseksi tagi tai julkaisuhaara. Tämä on suositeltu asetus tuotantoon, koska automaattinen julkaisu `main`-haarasta ottaa mukaan keskeneräisen työn.

## Kustannukset

Todelliset arviot pienelle seurakunnalle (alle 200 jäsentä, vähäinen liikenne):

| Komponentti | Arvioitu kuukausikustannus |
|-------------|----------------------------|
| Railway-perusmaksu | 5 dollaria |
| MySQL-lisäosa | 5 dollaria + noin 1 dollari tallennustilasta |
| 3 verkkopalvelun laskenta | 3–10 dollaria yhteensä |
| 1 Gt:n levy | 0,25 dollaria |
| **Yhteensä** | **noin 15–25 dollaria kuukaudessa** |

Kustannukset kasvavat lineaarisesti liikenteen, kuvien latausten ja tietokannan koon mukaan. Railway näyttää reaaliaikaisen käytön projektin **Usage**-välilehdellä. Aseta siellä kulutusrajat, jotta altistumisesi on rajattu.

## Vianmääritys

| Oire | Todennäköinen syy | Korjaus |
|------|-------------------|---------|
| Käännös epäonnistuu virheellä `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacksin välimuistin liitoskonflikti | Aseta `NIXPACKS_NO_CACHE=true` vaikuttavaan palveluun |
| B1Admin-käännös epäonnistuu virheellä `Missing: @types/...` | `package-lock.json` ei ole synkronissa | Hae uusin `main` |
| Api-julkaisu jää tilaan "Deploying" | Terveystarkistus epäonnistuu, koska `/health` ei palauta 200:aa | Tarkista julkaisulokit; yleensä puuttuu pakollinen ympäristömuuttuja |
| B1Admin näyttää "check your email", mutta sähköpostia ei saavu | `MAIL_SYSTEM=SMTP` on asetettu, mutta tunnukset puuttuvat tai ovat virheelliset | Korjaa tunnukset tai poista `MAIL_SYSTEM` sähköpostin poistamiseksi käytöstä |
| Kirjautuminen ohjaa osoitteeseen `api.churchapps.org` | `REACT_APP_STAGE` on `prod` | Aseta `REACT_APP_STAGE=custom` B1Admin-palveluun |
| Kaikki alidomainiseurakunnat näyttävät saman sisällön | `REACT_APP_B1_WEBSITE_URL` ei sisällä `{subdomain}`-merkkijonoa | Aseta esimerkiksi `https://{subdomain}.yourchurch.org` |
| Mukautettu verkkotunnus näyttää "Application not found" | DNS ei ole vielä levinnyt tai Railwayn varmenne on kesken | Odota 5 minuuttia; tarkista DNS komennolla `dig admin.yourchurch.org` |

Jos kohtaat jotain, mitä ei ole tässä luettelossa, avaa ongelma-ilmoitus osoitteessa [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) ja liitä mukaan julkaisulokit.

## Aiheeseen liittyvät artikkelit

- **[Itseisännöinti Dockerilla](./docker.md)**: sama pino omalla laitteistolla tai VPS:llä
- **[Alkuasetukset](../../getting-started/initial-setup.md)**: ensimmäiset vaiheet seurakunnan luomisen jälkeen
- **[Verkkosivuston alkuasetukset](../../b1-admin/website/initial-setup.md)**: seurakunnan julkisen sivuston määrittäminen
- **[Lahjoitusasetukset](../../b1-admin/donations/online-giving-setup.md)**: Stripen tai PayPalin liittäminen
- **[Paikallinen API-asennus](../api/local-setup.md)**: pinon ajaminen paikallisesti kehitystä varten
- **[API-julkaisu (AWS)](./apis.md)**: miten virallinen ChurchApps-SaaS on julkaistu
