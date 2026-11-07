---
title: "Yhdistetyt palvelut"
---

# Yhdistetyt palvelut

<div class="article-intro">

Nopein tapa yhdistää B1 toiseen kirkkoteknologiatyökaluun on yleensä Zapier- tai Make-resepti. Erillistä uutta B1-infrastruktuuria ei tarvita, ja työnkulun isännöi kolmas osapuoli. Tämä sivu on luettelo palveluista, joiden yhdistäminen B1:een on tällä hetkellä varmistettu. Jokaiselle palvelulle on lyhyt, kopioitava asetusohje.

</div>

## Yhteenveto

| Palvelu | Kategoria | Silta | Mitä voit yhdistää |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Sähköposti | Zapier tai Make | Synkronoi uudet B1-henkilöt ja lahjoittajat Mailchimp-yleisöön |
| [Donorbox](./donorbox) | Lahjoitukset | Zapier | Lähetä Donorboxin lahjoitukset ja lahjoittajat takaisin B1:een |
| [Subsplash](./subsplash) | Sovellus / lahjoitukset | Zapier | Hae Subsplashin lahjoitukset ja henkilöt B1:een |
| [VOMO](./vomo) | Vapaaehtoistyö | Zapier | Synkronoi vapaaehtoisilmoittautumiset B1-ryhmien ja VOMO-projektien välillä |
| [Clearstream](./clearstream) | SMS | Zapier | Käynnistä Clearstream-tekstiviesti B1-tapahtumista ja tallenna vastaukset B1-tietueina |
| [Text In Church](./text-in-church) | SMS / työnkulut | Zapier | Käynnistä Text In Church -työnkulkuja B1:stä ja vastaanota Connect Card -tiedot |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhookit: Zapier tai Make | Lähetä SMS mistä tahansa B1-tapahtumasta |
| [Checkr](./checkr) | Taustatarkistukset | Make | Käynnistä taustatarkistus, kun henkilö liittyy palvelutiimiin |

## Mitä kaikilla näillä on yhteistä

1. **B1-puoli yhdistämisestä on joka kerta sama.** Luo API-avain oikeilla oikeuksilla kohdassa **B1Admin → Settings → Developer → API Keys**. Anna sitten sillan rekisteröidä webhook laukaisijalle (Zapier ja Make tekevät tämän automaattisesti, ja se vaatii oikeuden `settings:write`) tai kutsu B1:n REST-päätepisteitä jatkotoiminnosta.
2. **Silta laskutetaan sinulta, ei meiltä.** ChurchApps on ilmainen. Zapierillä ja Make:llä on molemmilla ilmainen taso, joka kattaa muutaman reseptin.
3. **Yhdistämistä voi testata ilman, että se menee tuotantoon.** Molemmissa silloissa on painike ”Test step”, joka laukaisee kerran yhteyden B1:een ja näyttää tietorakenteen ennen kuin otat reseptin käyttöön.

## Sillan valinta

- **Zapier** on helpompi käyttää, ja sen sovelluskatalogi on suurempi. Käytä sitä oletuksena, ellei kustannus ole ongelma.
- **Make** on edullisempi suuressa mittakaavassa, ja sen reititys- ja suodatuslogiikka on joustavampi. Käytä sitä, kun yksittäisessä työnkulussa on haarautumista, ehtoja tai monia vaiheita.
- **Webhooks by Zapier** (käytössä Mobile Message -ohjeessa) on yleinen sovitin. Sen avulla Zap voi lähettää POST-pyynnön mihin tahansa HTTP-päätepisteeseen silloin, kun kohde ei ole Zapierin oma sovellus.

Jos haluamasi palvelu ei ole tässä luettelossa, B1:n [REST-rajapinta](/docs/developer/api) ja [webhookit](/docs/developer/api/webhooks) ovat avoimia. Voit rakentaa kertaluonteisen sillan [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)-kirjastolla muutamassa tunnissa.

## Mitä ei ole mukana (ja miksi)

Useilla suositulla kirkkoteknologiatyökalulla, kuten Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck ja MinistrySafe, ei tällä hetkellä ole julkaistua Zapier-sovellusta tai Make-moduulia. Niillä on omat rajapinnat, mutta yhdistäminen B1:een vaatii mukautettua koodia, eikä se ole valmis resepti. Siksi ne eivät kuulu tähän luetteloon. Jos toimittaja lisää Zapier-sovelluksen tai Make-moduulin, lisäämme myös ohjeen.

Olemme myös tarkoituksella jättäneet pois Planning Center Services -kohtaiset työkalut (musiikki, esitykset), kilpailevat ChMS-tuotteet, siirtokonsultit ja työkalut, jotka vain siivoavat PCO-kohtaisia tietoja. Millään niistä ei ole hyödyllistä yhdistämispolkua B1:een.

## Katso myös

- [Zapier (yleiskatsaus)](../zapier): B1-puoli jokaisesta Zapier-reseptistä on sama, ja tämä ohje käsittelee sen kerran.
- [Make (yleiskatsaus)](../make): sama koskee Make-skenaarioita.
- [Slack ja Discord](../slack-discord): chat-ilmoitukset ilman siltaa.
- [Google Sheets](../google-sheets): vaatimuksesta tehtävät viennit.
- [Webhookit (kehittäjän viitemateriaali)](/docs/developer/api/webhooks): tapahtumaluettelo, johon jokainen resepti nojaa.
