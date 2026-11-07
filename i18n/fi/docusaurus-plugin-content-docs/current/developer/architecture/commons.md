---
title: "Content Commons"
description: "Miten käyttäjien lähettämät laulut, oppitunnit ja mallit kulkevat yhteisen moderointijonon kautta B1 Adminin palvelinhallinnassa lähetyksestä julkaisuun."
---

# Content Commons — jaettu resurssikirjasto ja moderointi

Tuotteiden välillä jaettu käyttäjien lähettämä sisältö (WorshipCommonsin laulut, Lessons.churchin oppitunnit, FreeShow-mallit, B1-verkkosivupohjat) kulkee yhden moderointijonon kautta eikä tuotekohtaisen tarkistusprosessin kautta. Tämä sivu kuvaa lähetyksen ja hyväksynnän elinkaaren, jaetun resurssien tietomallin sekä sen, missä moderointi sijaitsee.

## Resurssien perusrakenne

Kaksi taulua kantaa jokaista yhteisön kohdetta tuotteesta riippumatta:

- **`assets`** — julkinen tunnistetietorivi. `status`: `pending` | `published` | `unpublished` | `removed`. Tyyppikohtaiset tiedot (laulun tiedot, tekijät) ovat erillisissä liitostauluissa, jotka liitetään `assetId`:n avulla.
- **`assetFiles`** — kaikki resurssiin liitetyt tiedostot (ääni, kuvat, asiakirjat). Se korvaa yksittäisten sisältötaulujen vanhemmat `path`- ja pilkulla erotetut `files`-sarakkeet.
- **`submissions`** — moderoinnin yksikkö. Elinkaari: `draft → pending → approved | rejected | withdrawn`. Lähetys voi olla uusi resurssi tai muokkaus jo julkaistuun resurssiin, alkuperäisen tekijän tai kolmannen osapuolen tekemänä.

Lähetyksen hyväksyminen suorittaa tuotekohtaisen **julkaisukoukun** (`Api/src/modules/commons/helpers/publishHooks/`, esim. `song.ts`), joka muuntaa lähetyksen tuotteen omiksi tietueiksi.

## Lähetysprosessi

`CommonsSubmissionController` (`Api/src/modules/commons/`) on loppukäyttäjille tarkoitettu API: se luo luonnoksen, esivarmentaa ja liittää tiedostoja, lähettää tarkistettavaksi tai peruuttaa lähetyksen. Sen varsinaiset asiakkaat ovat ulkoisia tuottajasivustoja (WorshipCommons-sivusto, Lessons.church, FreeShow ja B1-verkkosivupohjagalleria), eivät B1Admin.

## Seurakuntien käyttö

Moderoinnin lisäksi B1Admin lukee suoraan yhteisön perusrakennetta: sen Serving → Songs -kohdan "Add Song" -haku kysyy `GET /songs?sundayReady=true` -pyynnön lisäksi olemassa olevaa ulkoista laulutietokantaa. Haku tuo esiin julkaistut WorshipCommons-laulut, jotka henkilökunta on merkinnyt sunnuntaivalmiiksi (ks. kuuntelun portti alla), ja näyttää lisenssimerkin. Yhden laulun valitseminen linkittää uuden `SongDetail`-tietueen lähteeseensä `songDetailLinks`-taulun kautta. Tämä on ainoa polku, jossa yksittäisen seurakunnan B1Admin koskee yhteisön dataan suoraan, sen sijaan että käyttäisi vain henkilökunnalle tarkoitettuja Server Admin -työkaluja. Seurakunnille suunnatun kuvauksen löydät tukidokumentin osiosta [Ilmaiset laulut WorshipCommonsista](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons).

## Moderointijono

Jono sijaitsee kohdassa **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`), ja sen käyttöä ohjaa `Permissions.server.admin`-oikeus. Sama oikeus ohjaa myös Churches-, Impersonate- ja Jobs-toimintoja tällä sivulla. Tämä on ChurchAppsin henkilökunnalle tarkoitettu sisäinen työkalu, jota yksittäiset seurakunnat eivät näe.

Kolme alavälilehteä:

- **Queue** — kaikki odottavat lähetykset kaikista tuotteista, suodatettavissa tuotteen tai resurssityypin mukaan. Jokaisella rivillä näkyy merkki uudesta resurssista, tekijän muokkauksesta tai kolmannen osapuolen muokkauksesta, lähettäjän hyväksymishistoria, kenttien ja tiedostojen muutosyhteenveto sekä ikä (merkitään, jos yli 72 tuntia). **Review** avaa paneelin kenttäkohtaisilla muutoksilla, tiedostojen esikatselulla ja upotetulla vain-luku-tuotteen esikatselulla. Hyväksy- ja Hylkää-toiminnoilla on pikanäppäimet (j/k liikkumiseen, a/r toimintoon).
- **Reports** — tekijänoikeus-, käytäntö- ja laatuilmoitukset julkaistuista resursseista. Ne on jaettu kahteen jonoon ja ratkaistujen ilmoitusten historiaan. Henkilökunnan jäsen ottaa ilmoituksen käsittelyyn ja ratkaisee sen päätöksellä (ylläpidetty, hylätty tai kaksoiskappale) ja toimenpiteellä (ei mitään, julkaisun peruutus tai poisto).
- **Assets** — julkaistun sisällön haettava selain, jossa on resurssikohtaisia toimintoja: nosta esiin, peruuta julkaisu tai julkaise uudelleen, tai poista (syy: tekijänoikeus tai käytäntö). Lauluille tämä **kuuntelun portti** on tapa, jolla laulusta tulee "sunnuntaivalmis": henkilökunta merkitsee sen, kun se on kuunneltu läpi jokaisesta julkaistusta sävellajista ja nuotit, soinnut ja diat on vahvistettu.

Jokainen `/commons/admin/*`-päätepiste (`CommonsAdminController.ts`) tarkistaa palvelinhallinnan oikeuden itsenäisesti.

:::info
Tämä suunnittelu on tarkoituksella yksi jono: WorshipCommonsin oma `/admin`-moderointikäyttöliittymä lakkautettiin, ja kaikkien tuotteiden lähetykset ohjataan B1Admin-palvelinhallintatyökalujen kautta.
:::

## Kattavuus

Api (commons-moduuli), B1Admin (Server Admin) sekä ulkoiset tuottajasivustot: WorshipCommons, Lessons.church, FreeShow ja B1-verkkosivurakentajan pohjat.
