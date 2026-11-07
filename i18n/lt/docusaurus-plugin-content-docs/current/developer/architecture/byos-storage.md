---
title: "Savo saugyklos naudojimas"
description: "Prijunkite savo Google Drive, Dropbox, OneDrive ar S3 suderinamą saugyklą B1 Admin, kad bažnyčios failų įkėlimai neapribotų 100 MB platformos limito."
---

# Savo saugyklos naudojimas (BYOS)

Bažnyčios gauna apie 100 MB nemokamos talpinamos failų saugyklos (`/content/files` sritys: svetainės failai, grupių ištekliai). BYOS leidžia bažnyčiai prijungti savo debesies saugyklą — **Google Drive, Dropbox, OneDrive arba bet kurį S3 suderinamą segtuvą (AWS S3, Cloudflare R2, Backblaze B2)** — todėl nauji įkėlimai patenka į bažnyčios paskyrą be platformos ribos. ChurchApps lieka nemokama; ribą nustato pačios bažnyčios paskyra.

## Teikėjo sąsaja

BYOS naudoja saugyklos sąsają, sukurtą [MinistryStuff](./ministrystuff.md) funkcijai: `IStorageProvider` (`Packages/apihelper`), kurią kiekvienai bažnyčiai pagal `content.storageProviders` lentelę pateikia `StorageResolver`. Skirtingai nei vienetiniai `churchapps`/`ministrystuff` teikėjai, BYOS teikėjai saugo kiekvienos bažnyčios prisijungimo duomenis, todėl `StorageResolver.forChurch` kiekvienai užklausai sukuria atskirą egzempliorių pagal bažnyčios įrašą. Realizacijos yra šalia resolverio `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, taip pat `ByosAuth` (OAuth prieigos raktų keitimas ir vienu metu vykdomas atnaujinimas — Dropbox rotuoja atnaujinimo raktus, todėl atnaujinimai dedupliuojami taip pat, kaip tai daro `ProviderProxyController`).

`storageProviders` saugo prisijungimo duomenis: `accessToken`/`refreshToken`/`tokenExpiresAt` (šifruoti, OAuth trijulė) arba `apiKey`/`apiSecret` ir `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Prieigos raktai niekada nepasiekia kliento — `GET /content/storage/providers` paslepia paslaptis ir grąžina `connected` loginę reikšmę.

## Įkėlimo eiga

Tas pats trijų žingsnių kontraktas kaip anksčiau, tik su išplėstu presign formatu. `POST /content/files/postUrl` grąžina `PresignedPostData`, kuris dabar gali pasirinktinai turėti `method`, `rawBody`, `headers`, `chunkSize` ir `externalIdField`:

| Teikėjas | Presign | Klientas siunčia baitus |
|---|---|---|
| churchapps (numatytasis) | S3 presigned POST | multipart forma (senasis) |
| Google Drive | atnaujinama įkėlimo sesija (`drive.file` apimtis) | vienas PUT į sesijos URI |
| Dropbox | `files/get_temporary_upload_link` (4 val.) | neapdorotas POST |
| OneDrive | `createUploadSession` (approot) | dalimis PUT (20 MiB, Graph 320 KiB kartotinis) |
| S3 suderinamas | presigned PUT (B2 neturi POST politikų) | neapdorotas PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) apdoroja visus formatus ir, jei atsakyme yra teikėjo failo ID (Drive), jį grąžina. Klientas perduoda jį kaip `externalId` `POST /content/files` registracijoje; `files.provider` ir `files.externalId` nurodo, kur saugomi baitai (Drive failo ID; kitiems — kelias). 100 MB kvotos tikrinimas taikomas tik tada, kai parinktas teikėjas yra `churchapps`.

## Vieši atsisiuntimai

Vartotojų debesų failų negalima tiesiogiai įkelti kaip nuorodų (Drive nuorodos viršija kvotą, Dropbox ir OneDrive nuorodos pasibaigia), todėl OAuth trijulei `contentPath` nukreipia į stabilų Api maršrutą: `GET /content/files/download/:id` (anoniminis) įkelia failo įrašą, per teikėjo `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`) sugeneruoja trumpai galiojančią tiesioginę nuorodą, saugo ją atmintyje 30 minučių ir atlieka 302 peradresavimą su `Cache-Control: max-age=300`. Duomenys keliauja tarp naršyklės ir teikėjo, niekada per Api. S3 suderinami teikėjai peradresavimo visiškai praleidžia — `contentPath` yra stabilus `publicBase + key` URL (bucket turi leisti viešą skaitymą ir CORS PUT).

Trynimai ir atsisiuntimai nukreipiami pagal `files.provider` (`StorageResolver.forFile`); seni įrašai be šio lauko naudoja URL priešdėlio nukreipimą. Pervadinimai BYOS failams atliekami tik duomenų bazėje (baitai adresuojami pagal `externalId`, o ne pagal pavadinimą). Atjungus teikėją, kuris dar turi failų, įrašas tik išjungiamas (prieigos raktai paliekami, kad atsisiuntimai ir trynimai toliau veiktų), o ne ištrinamas.

## Prisijungimas (B1Admin → Settings → File Storage)

OAuth trijulė naudoja tą patį perdavimo (relay) srautą kaip ir turinio teikėjai: iššokantis langas → teikėjo sutikimas → `{membershipApi}/oauth/relay/callback` → B1Admin apklausia relay sesiją → `POST /content/storage/exchange` serverio pusėje atlieka kodo keitimą į prieigos raktą (kliento paslaptys niekada nepalieka serverio; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox yra PKCE viešasis klientas).

Klientų ID yra `B1Admin/src/settings/components/byosProviders.ts` ir `Api .../ByosAuth.ts`. Apimtys tyčia minimalios: Google `drive.file` (tik programos sukurti failai, be ribotos apimties patvirtinimo), OneDrive `Files.ReadWrite.AppFolder`, Dropbox — prieiga tik prie programos aplanko. S3 yra paprasta prisijungimo duomenų forma.

**Apimties pastaba:** BYOS apima tik `/content/files` sritis. Galerijos nuotraukos, miniatiūros, logotipai ir asmenų nuotraukos lieka numatytajame teikėjuje (jos mažos, pateikiamos per CDN ir optimizuotos vaizdams). Klientas taip pat gali perduoti `platformStorage: true` `postUrl` užklausos turinyje, kad įkėlimas būtų priskirtas numatytajam churchapps teikėjui, nepaisant bažnyčios BYOS nustatymų. FreeShow tai naudoja savo `files/group/{teamId}/current.zip` sinchronizacijos būsenai, kuri nuskaitoma tiesiogiai iš viešojo turinio serverio ir niekada neregistruojama kaip failo įrašas.
