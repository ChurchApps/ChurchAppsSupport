---
title: "Sitoreji Sakho Lesiyisebentisa (BYOS)"
description: "Xhuma i-Google Drive, Dropbox, OneDrive, noma i-S3 bucket yakho ku-B1 Admin, kutsi ekulayishweni kwemafayela kudlule umkhawulo we-100MB wenkhundla."
---

# Sitoreji Sakho Lesiyisebentisa (BYOS)

Emabandla atfola cishe ~100MB wesitoreji sefayela lesingakhokhelwa lesigcinwa ku-inthanethi (the `/content/files` surfaces: website Files, group resources). I-BYOS ivumela libandla kuhlanganisa sitoreji salo selifu — **Google Drive, Dropbox, OneDrive, noma yiliphi i-S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2)** — kutsi emafayela amasha angena ku-akhawunti yalo yalo bandla ngaphandle kwemkhawulo weplatifomu. I-ChurchApps isalokhu ingakhokhelwa; umkhawulo yi-akhawunti yelibandla.

## Isixhumi sephrovayidi

I-BYOS isebentisa futsi sitoreji lesakhelwe i-[MinistryStuff](./ministrystuff.md): `IStorageProvider` (`Packages/apihelper`) lesitfolwa ngalibandla ngalibandla ngu-`StorageResolver` kusuka kutafula `content.storageProviders`. Ngetulu kwaloko kwamaphrovayidi aweminyaka `churchapps`/`ministrystuff` ayinguwo wodvwa, emaphrovayidi e-BYOS abamba tifakazelo telibandla ngalinye, ngako `StorageResolver.forChurch` yakha sibonelo ngasinye ngesicelo ngasinye kusuka emugceni welibandla. Ukusetfwa kwawo kutfolakala ngaseceleni kwe-resolver kuchudzela ku `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, kanye ne `ByosAuth` (kutfolwa kwethokheni ye-OAuth + kuvuselelwa kwesicelo kanye — i-Dropbox iguqula tikhiphi letivuselelako, ngako kuvuselelwa kwentela kubekwa kanye njengoba kwenta `ProviderProxyController`).

`storageProviders` ibamba tifakazelo: `accessToken`/`refreshToken`/`tokenExpiresAt` (ifihliwe, kuhlanganisa ne-OAuth) noma `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Tithokheni akufiki kumsebenzisi — `GET /content/storage/providers` ifihla imfihlo futsi ibuyisa sigaba se `connected`.

## Inqubo yekulayisha

Kusebentisa inkambiswano lefanako lemagadi lamatsatfu ayisitsatfu, kodvwa ngesakhiwo lesandziwe se-presign. `POST /content/files/postUrl` ibuyisa `PresignedPostData` lenika ngekukhetsa `method`, `rawBody`, `headers`, `chunkSize`, kanye ne-`externalIdField`:

| Iphrovayidi | Presign | Lomsebenisi uthumela emabhayithi |
|---|---|---|
| churchapps (sekuzenzakalela) | S3 presigned POST | ifomu le-multipart (lelidzala) |
| Google Drive | sessheni yekulayisha leqhubekako (`drive.file` scope) | PUT lincane ku-URI yesessheni |
| Dropbox | `files/get_temporary_upload_link` (4h) | raw POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-multiple) |
| S3-compatible | presigned PUT (B2 alinamaphoyisi e-POST) | raw PUT |

I-`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) iphatsa tonkhe tindlela futsi ibuyisa i-ID yelifayela lephrovayidi uma iphendvulo inayo (Drive). Lomsebenisi udlulisela njengo-`externalId` ekubhalisweni kwe `POST /content/files`. I-`files.provider` + `files.externalId` irekhodi lapho emabhayithi akhona khona (i-ID yelifayela le-Drive; indlela yemanye). Kuhlolwa kwekwabelwa kwe-100MB kusebenta kuphela uma iphrovayidi lesetfwe liyi-`churchapps`.

## Kulanda kwemphakatsi

Emafu emaklayenti ekhulu angeke axhunywe ngelinki ngekuqondile (ilinki le-Drive liphela kwekwabelwa, emalinki e-Dropbox/OneDrive ayaphela), ngako kuma-OAuth ethathu `contentPath` itsi ku-route lesingeni le-Api: `GET /content/files/download/:id` (angaziwa) ilayisha umugca wefayela, ikhicita linki lekulanda lelifishane ngekusebentisa `getDownloadUrl` yephrovayidi (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), ilondoloze kumemori iminithi lesi-30, futsi ibuyisela ku-302 ngo `Cache-Control: max-age=300`. Ibhande-ntfutfo lihamba phakathi kwe-browser nomhlinzeki, lingadlulanga ku-Api. I-S3-compatible ayisebentisi kuphindvwa kwelinki kalokhu — `contentPath` ingumtsetfo lotsite `publicBase + key` (i-bucket kufanele ivumele kufundza kuwo wonkhe umuntfu kanye ne-CORS PUT).

Kusula nekulanda kuyahambisa ngekusebentisa `files.provider` (`StorageResolver.forFile`); emugca wakudala longenayo uyawela ekuhambiseni ngekwesakhiwo selinki. Kutsintsa emagama ngaphakathi kwe-DB kuphela emafayeleni e-BYOS (emabhayithi ayakhelwa nge `externalId`, hhayi ngelibizo). Kuhlukanisa iphrovayidi lelisenawo emafayeleni kuvala umugca ngekubuyisela ngaphandle kwekusula (kugcina tithokheni kutsi kulanda nekusula kuhlale kuyasebenta) kunekusula ngekuphelele.

## Kuxhuma (B1Admin → Settings → File Storage)

Kuma-OAuth ethathu kusetfwa kwesitfwalo lesifanako nemaphrovayidi lemphakatsi: iphophu → imvume yephrovayidi → `{membershipApi}/oauth/relay/callback` → i-B1Admin ihlola sessheni yesitfwalo → `POST /content/storage/exchange` yenta kutfolwa kwekhodi kuya ethokheni ngaseseva (tifihlo temakhasimende tihlala ku-seva; i-Google `GOOGLE_DRIVE_CLIENT_SECRET`, i-OneDrive `ONEDRIVE_CLIENT_SECRET`, i-Dropbox ingumakhasimende we-PKCE wesidvwaba). Tinombolo temakhasimende tihlala ku-`B1Admin/src/settings/components/byosProviders.ts` ne `Api .../ByosAuth.ts`. Timvume tincane ngemabomu: i-Google `drive.file` (emafayela lakhiwe yi-app kuphela — akudzingeki kuhlolwa kwemvume lephezulu), i-OneDrive `Files.ReadWrite.AppFolder`, i-Dropbox kufinyelela kufoda ye-app. I-S3 ngufomu lelilula lemagama lemfihlo.

Incazelo: i-BYOS imbonelela kuphela emagadi e-`/content/files`. Tifanekiso tegalari, tithombe letinciane, emalogo kanye netithombe tebantfu ihlala kuphrovayidi lelisekuzenzakalela (incane, ihanjiswa yi-CDN, ilungiswe ngekubukeka). Umsebenisi angadlulisela futsi `platformStorage: true` emzimbeni we `postUrl` kutsi kulayishwa kuyiwe kuphrovayidi le-churchapps lelisekuzenzakalela naka kutsi libandla linayo yini i-BYOS — i-FreeShow isebentisa lokhu ngetulu kwesimo sekusinkrononisa kwayo `files/group/{teamId}/current.zip`, lesifundwa ngekuqondile kusuka kumsingathi wekuqukethwe lomphakathi futsi lingakhe langatsi ngemugca wefayela.
