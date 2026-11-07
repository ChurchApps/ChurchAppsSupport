---
title: "Oma tallennustila (BYOS)"
description: "Yhdistä oma Google Drive, Dropbox, OneDrive tai S3-yhteensopiva säilö B1 Adminissa, jotta seurakunnan tiedostolataukset ohittavat 100 Mt alustarajoituksen."
---

# Oma tallennustila (BYOS)

Seurakunnat saavat noin 100 MB ilmaista isännöityä tiedostotallennustilaa (`/content/files`-pinnat: verkkosivujen tiedostot, ryhmien materiaalit). BYOS antaa seurakunnalle mahdollisuuden yhdistää oman pilvitallennustilansa — **Google Drive, Dropbox, OneDrive tai mikä tahansa S3-yhteensopiva säilö (AWS S3, Cloudflare R2, Backblaze B2)** — jolloin uudet lataukset tallentuvat seurakunnan omalle tilille ilman alustan rajoituksia. ChurchApps pysyy ilmaisena; rajana on seurakunnan oma tili.

## Palveluntarjoajan liitäntäkohta

BYOS käyttää uudelleen [MinistryStuff](./ministrystuff.md):lle rakennettua tallennusliitäntää: `IStorageProvider` (`Packages/apihelper`), jonka `StorageResolver` ratkaisee seurakunnittain `content.storageProviders`-taulusta. Toisin kuin yksittäiset `churchapps`- ja `ministrystuff`-palveluntarjoajat, BYOS-palveluntarjoajat sisältävät seurakuntakohtaiset tunnistetiedot, joten `StorageResolver.forChurch` luo instanssin jokaiselle pyynnölle seurakunnan rivin perusteella. Toteutukset ovat resolverin vieressä kansiossa `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider` sekä `ByosAuth` (OAuth-tokenien vaihto ja yhdellä kertaa suoritettava päivitys — Dropbox kierrättää päivitystokenit, joten päivitykset deduplikoidaan samalla tavalla kuin `ProviderProxyController`:ssa).

`storageProviders` sisältää tunnistetiedot: `accessToken`/`refreshToken`/`tokenExpiresAt` (salattu, OAuth-kolmikko) tai `apiKey`/`apiSecret` + `settings`-JSON (`{endpoint, region, bucket, publicBase}`, S3). Tokenit eivät koskaan päädy asiakkaalle — `GET /content/storage/providers` peittää salaisuudet ja palauttaa `connected`-totuusarvon.

## Latausprosessi

Sama kolmivaiheinen sopimus kuin aiemmin, laajennetulla esisignauksen rakenteella. `POST /content/files/postUrl` palauttaa `PresignedPostData`-tyypin, joka sisältää nyt valinnaisesti kentät `method`, `rawBody`, `headers`, `chunkSize` ja `externalIdField`:

| Palveluntarjoaja | Esisignaus | Asiakas lähettää tavut |
|---|---|---|
| churchapps (oletus) | S3 presigned POST | multipart-lomake (vanha) |
| Google Drive | jatkettava latausistunto (`drive.file`-laajuus) | yksi PUT istunnon URI:lle |
| Dropbox | `files/get_temporary_upload_link` (4 h) | raaka POST |
| OneDrive | `createUploadSession` (approot) | pilkottu PUT (20 MiB, Graphin 320 KiB:n kerrannainen) |
| S3-yhteensopiva | esisignattu PUT (B2:ssa ei POST-käytäntöjä) | raaka PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) käsittelee kaikki muodot ja palauttaa palveluntarjoajan tiedoston tunnisteen, kun vastaus sisältää sellaisen (Drive). Asiakas välittää sen `externalId`-arvona `POST /content/files` -rekisteröinnissä; `files.provider` + `files.externalId` kirjaavat, missä tavut sijaitsevat (Drive-tiedoston tunniste; muille polku). 100 MB:n kiintiötarkistus koskee vain tapausta, jossa ratkaistu palveluntarjoaja on `churchapps`.

## Julkiset lataukset

Kuluttajapilvi-palveluihin ei voi linkittää suoraan (Drive-linkit ylittävät kiintiön, Dropbox- ja OneDrive-linkit vanhenevat), joten OAuth-kolmikon tapauksessa `contentPath` osoittaa vakaaseen Api-reittiin: `GET /content/files/download/:id` (anonyymi) lataa tiedoston rivin, luo lyhytaikaisen suoran linkin palveluntarjoajan `getDownloadUrl`-funktiolla (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), tallentaa sen muistiin 30 minuutiksi ja ohjaa 302-uudelleenohjauksella otsakkeella `Cache-Control: max-age=300`. Kaista kulkee selaimen ja palveluntarjoajan välillä, ei koskaan Api:n kautta. S3-yhteensopiva ohittaa uudelleenohjauksen kokonaan — `contentPath` on vakaa `publicBase + key` -URL (säilön on sallittava julkinen luku ja CORS PUT).

Poistot ja lataukset reitittyvät `files.provider`-kentän mukaan (`StorageResolver.forFile`); vanhat rivit ilman sitä palautuvat URL-etuliitteen reititykseen. Uudelleennimeäminen on BYOS-tiedostoilla vain tietokantatason toimenpide (tavut osoitetaan `externalId`:llä, ei nimellä). Palveluntarjoajan irrottaminen, jolla on yhä tiedostoja, poistaa rivin käytöstä pehmeästi (säilyttää tokenit, jotta lataukset ja poistot toimivat edelleen) sen sijaan, että rivi poistettaisiin.

## Yhdistäminen (B1Admin → Asetukset → Tiedostotallennus)

OAuth-kolmikko käyttää samaa välitysvirtaa kuin sisältöpalveluntarjoajat: ponnahdusikkuna → palveluntarjoajan suostumus → `{membershipApi}/oauth/relay/callback` → B1Admin kysyy välityksen istuntoa → `POST /content/storage/exchange` suorittaa palvelinpuolen koodin ja tokenin vaihdon (asiakassalaisuudet eivät koskaan poistu palvelimelta; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox on PKCE-julkinen asiakas). Asiakastunnukset ovat tiedostoissa `B1Admin/src/settings/components/byosProviders.ts` ja `Api .../ByosAuth.ts`. Laajuudet on tarkoituksella pidetty minimaalisina: Google `drive.file` (vain sovelluksen luomat tiedostot — ei rajoitetun laajuuden vahvistusta), OneDrive `Files.ReadWrite.AppFolder` ja Dropbox sovelluskansion käyttö. S3 on tavallinen tunnistetietolomake.

Huomautus laajuudesta: BYOS kattaa vain `/content/files`-pinnat. Galleriakuvat, pikkukuvat, logot ja henkilökuvat pysyvät oletuspalveluntarjoajalla (pieniä, CDN-palveltuja, kuvaoptimoituja). Asiakas voi myös lähettää `postUrl`-pyynnön rungossa `platformStorage: true` -arvon, jolla lataus kiinnitetään oletus-churchapps-palveluntarjoajaan riippumatta seurakunnan BYOS-asetuksesta. FreeShow käyttää tätä `files/group/{teamId}/current.zip`-synkronointitilaansa varten, joka luetaan suoraan julkiselta sisältöpalvelimelta eikä sitä koskaan rekisteröidä tiedostorivinä.
