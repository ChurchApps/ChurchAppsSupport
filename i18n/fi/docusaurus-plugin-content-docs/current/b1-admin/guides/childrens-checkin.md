---
title: "Anleitung: Lasten­hoidon lähtö­tarkistuksen asennus"
---

# Lasten­hoidon lähtö­tarkistuksen asennus

<div class="article-intro">

Tämä opas kulkee läpi kaiken, mitä seurakunnassasi tarvitaan lasten lähtötarkistusjärjestelmän käynnistämiseksi – perheiden lisäämisestä tietokantaan, ikäsopiviin ryhmiin ja nimilappujen tulostamiseen sunnuntaiaamuna. Lopulta vanhemmat voivat tarkistaa lapsensa sisään kioskitabletilla ja saada vastaavan turvatunnisteen.

</div>

## Koulutusvideo

<YouTube id="Ep9CBUcJwPI" title="Lasten lähtötarkistuksen asennus B1:ssä" next="Osallistumisen tallentaminen ja seuraaminen B1:ssä" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo seurakuntasi tili osoitteessa [admin.b1.church](https://admin.b1.church)
- Varmista, että sinulla on ylläpitäjän oikeudet – katso tarvittaessa [Roolit ja oikeudet](../people/roles-permissions.md)
- Valinnainen: Valmistele CSV-tiedosto perheistä, jos siirryt toisesta järjestelmästä

</div>

## Vaihe 1: Lisää perheet tietokantaan

Ennen kuin lähtötarkistus voi toimia, järjestelmän täytyy tietää perheistäsi. Jokainen lapsi on linkitettävä vanhemp­aansa talouden (household) toiminnon kautta.

Lisää vähintään yksi perhe seuraamalla opasta [Henkilöiden lisääminen](../people/adding-people.md). Varmista, että:

- Lisäät ensin vanhemmat
- Lisäät jokaisen lapsen
- Linkität heidät samaan talouteen käyttämällä [talouseditoria](../people/adding-people.md#managing-households)

:::tip
Jos sinulla on useita perheitä lisättävänä, käytä [CSV-tuontia](../people/importing-data.md) yksitellen lisäämisen sijaan. Voit tuoda koko hakemistosi muutamassa minuutissa.
:::

## Vaihe 2: Luo lasten ryhmät

Ryhmät määrittelevät luokat, joihin lapset kirjautuvat sisään. Yleensä haluat yhden ryhmän ikähaarukkaa kohden.

Luo ryhmät seuraamalla opasta [Ryhmien luominen](../groups/creating-groups.md), esimerkiksi:

- **Lastentarha** (ikä 0–2)
- **Esikoulu** (ikä 3–5)
- **Alakoulu** (ikä 6–10)

Voit muuttaa nimiä ja ikähaarukoita vastaamaan seurakuntasi toimintarakennetta.

## Vaihe 3: Määritä toimipisteet ja jumalanpalvelukset

Lähtötarkistus on sidottu tiettyihin jumalanpalveluksen aikoihin. Sinulla on oltava vähintään yksi toimipiste ja yksi jumalanpalvelus määritettynä.

Seuraa opasta [Osallistumisen asetukset](../attendance/setup.md) ja:

1. Lisää toimipisteesi (esim. "Pääkampus")
2. Lisää jumalanpalvelus (esim. "Sunnuntaiaamu")
3. Aseta jumalanpalveluksen aika (esim. "9:00") ja halutessasi [tarkistusaikataulu](../attendance/setup.md#setting-a-check-in-schedule), jotta tarkistus avautuu automaattisesti ennen jokaista jumalanpalvelusta ja sulkeutuu sen jälkeen
4. Liitä lasten ryhmät jumalanpalvelukseen

## Vaihe 4: Määritä lähtötarkistussovellus

Yhdistä nyt kaikki asentamalla lähtötarkistussovellus tablettiin.

1. Asenna **B1 Checkin -sovellus** – latauslinkit löytyvät artikkelista [Lähtötarkistus](../attendance/check-in.md)
2. Kirjaudu sisään B1 Admin -tunnuksillasi
3. Valitse toimipisteesi ja jumalanpalveluksen aika

Katso täydelliset asennusvaiheet artikkelista [Lähtötarkistus](../attendance/check-in.md).

## Vaihe 5: Hanki laitteisto

Tarvitset tabletin kioskia varten ja halutessasi Brother-etikettitulostimen nimilappuja varten.

Vähimmäisvaatimukset:
- **Yksi Android- tai Amazon Fire -tabletti** – katso [suositellut tabletit](../attendance/check-in.md#recommended-hardware)
- **Yksi Brother-etikettitulostin** – QL-1110NWB on suositeltava Bluetooth- ja WiFi-tuen vuoksi
- **Brother DK-1201 -etiketit** (1-1/7" x 3-1/2")

:::warning
Vain Brother-etikettitulostimet ovat yhteensopivia B1 Checkin -sovelluksen kanssa. Muiden merkkien tulostimet eivät toimi.
:::

## Vaihe 6: Suorita testi­tarkistus

Tee testiajo ennen sunnuntaiaamua:

1. Avaa B1 Checkin -sovellus tabletillasi
2. Valitse toimipisteesi ja oikea jumalanpalveluksen aika
3. Hae yksi lisäämistäsi perheistä
4. Kirjaa lapsi sisään ja tarkista:
   - Osallistuminen näkyy B1 Adminissa kohdassa **Osallistuminen**
   - Jos käytät tulostinta, nimilappu tulostuu oikein

:::tip
Opasta tervetulotiimisi vapaaehtoiset lähtötarkistusprosessiin ennen käynnistystä. Nopea 5 minuutin läpikäynti riittää yleensä.
:::

## Valmista tuli!

Lasten lähtötarkistuksesi on valmis. Vanhemmat voivat hakea perheensä, valita lapsensa ja kirjautua sisään kioskilla. Osallistuminen kirjautuu automaattisesti B1 Adminiin.

## Liittyvät artikkelit

- [Henkilöiden lisääminen](../people/adding-people.md) – lisää uusia perheitä vierailujen myötä
- [Ryhmien luominen](../groups/creating-groups.md) – hallinnoi lastesi ryhmiä
- [Osallistumisen asetukset](../attendance/setup.md) – määritä toimipisteet ja jumalanpalvelukset
- [Lähtötarkistus](../attendance/check-in.md) – yksityiskohtainen sovelluksen ja laitteiston asennus
- [Osallistumisen seuranta](../attendance/tracking-attendance.md) – tarkastele lähtötarkistusraportteja
