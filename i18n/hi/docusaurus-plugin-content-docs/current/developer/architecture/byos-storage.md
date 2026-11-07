---
title: "अपना स्टोरेज लाएँ (BYOS)"
description: "B1 Admin में अपना Google Drive, Dropbox, OneDrive या S3-संगत बकेट जोड़ें, ताकि चर्च फ़ाइल अपलोड 100MB प्लेटफ़ॉर्म सीमा से बचें।"
---

# अपना स्टोरेज लाएँ (BYOS)

चर्च को लगभग 100MB का मुफ़्त होस्ट किया गया फ़ाइल स्टोरेज मिलता है (`/content/files` सतहें: वेबसाइट की Files, समूह संसाधन)। BYOS के ज़रिए चर्च अपना क्लाउड स्टोरेज जोड़ सकता है: **Google Drive, Dropbox, OneDrive, या कोई भी S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2)**। इससे नई अपलोड फ़ाइलें चर्च के अपने खाते में जाती हैं, और प्लेटफ़ॉर्म की कोई सीमा लागू नहीं होती। ChurchApps निःशुल्क रहता है; सीमा चर्च का अपना खाता है।

## प्रोवाइडर सीम

BYOS, [MinistryStuff](./ministrystuff.md) के लिए बनाए गए स्टोरेज सीम को दोबारा इस्तेमाल करता है: `IStorageProvider` (`Packages/apihelper`), जिसे `StorageResolver` हर चर्च के लिए `content.storageProviders` टेबल से तय करता है। सिंगलटन `churchapps`/`ministrystuff` प्रोवाइडर के उलट, BYOS प्रोवाइडर हर चर्च की अपनी credentials रखते हैं, इसलिए `StorageResolver.forChurch` हर अनुरोध पर चर्च की पंक्ति से एक इंस्टेंस बनाता है। इम्प्लीमेंटेशन resolver के साथ `Api/src/modules/content/helpers/` में हैं: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, और साथ में `ByosAuth` (OAuth token exchange + single-flight refresh। Dropbox refresh tokens को घुमाता है, इसलिए refresh को उसी तरह de-duplicate किया जाता है जैसे `ProviderProxyController` करता है)।

`storageProviders` में credentials रहते हैं: `accessToken`/`refreshToken`/`tokenExpiresAt` (encrypted, OAuth trio) या `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3)। Tokens कभी क्लाइंट तक नहीं पहुँचते। `GET /content/storage/providers` secrets मास्क करता है और `connected` boolean लौटाता है।

## अपलोड फ़्लो

वही तीन-चरणीय contract जैसा पहले था, बस presign shape विस्तारित है। `POST /content/files/postUrl` `PresignedPostData` लौटाता है, जिसमें अब वैकल्पिक रूप से `method`, `rawBody`, `headers`, `chunkSize`, और `externalIdField` हो सकते हैं:

| प्रोवाइडर | Presign | क्लाइंट बाइट्स कैसे भेजता है |
|---|---|---|
| churchapps (डिफ़ॉल्ट) | S3 presigned POST | multipart form (legacy) |
| Google Drive | resumable upload session (`drive.file` scope) | session URI पर single PUT |
| Dropbox | `files/get_temporary_upload_link` (4 घंटे) | raw POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-multiple) |
| S3-compatible | presigned PUT (B2 में POST policies नहीं हैं) | raw PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) सभी shapes संभालता है और जब response में provider file id हो (Drive), तो उसे लौटाता है। क्लाइंट इसे `POST /content/files` registration में `externalId` के रूप में पास करता है। `files.provider` + `files.externalId` रिकॉर्ड करते हैं कि बाइट्स कहाँ रहते हैं (Drive file id; बाकी के लिए path)। 100MB quota check केवल तभी लागू होता है जब resolved provider `churchapps` हो।

## सार्वजनिक डाउनलोड

कंज़्यूमर क्लाउड्स को hotlink नहीं किया जा सकता (Drive links का quota खत्म हो जाता है, Dropbox/OneDrive links की समय-सीमा होती है)। इसलिए OAuth trio के लिए `contentPath` एक स्थिर Api route की ओर इशारा करता है: `GET /content/files/download/:id` (anonymous) file row लोड करता है, प्रोवाइडर के `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`) से एक अल्पकालिक direct link बनाता है, उसे 30 मिनट के लिए in-memory कैश करता है, और `Cache-Control: max-age=300` के साथ 302-redirect करता है। Bandwidth browser और provider के बीच बहती है, Api से होकर कभी नहीं गुज़रती। S3-compatible redirect को पूरी तरह छोड़ देता है: `contentPath` एक स्थिर `publicBase + key` URL है (bucket को public read और CORS PUT की अनुमति देनी होगी)।

Deletes और downloads `files.provider` (`StorageResolver.forFile`) के आधार पर route होते हैं। बिना इस field वाली legacy rows URL-prefix routing पर वापस जाती हैं। BYOS files के लिए rename केवल DB में होता है (बाइट्स `externalId` से पहचाने जाते हैं, नाम से नहीं)। जिस प्रोवाइडर में अब भी फ़ाइलें हैं, उसे disconnect करने पर row हटने के बजाय soft-disable हो जाती है (tokens बने रहते हैं, ताकि downloads और deletes काम करते रहें)।

## कनेक्ट करना (B1Admin → Settings → File Storage)

OAuth trio वही relay flow इस्तेमाल करता है जो content providers करते हैं: popup → provider की consent → `{membershipApi}/oauth/relay/callback` → B1Admin relay session को poll करता है → `POST /content/storage/exchange` server-side पर code→token exchange करता है। Client secrets कभी सर्वर से बाहर नहीं जाते: Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, और Dropbox एक PKCE public client है। Client ids `B1Admin/src/settings/components/byosProviders.ts` और `Api .../ByosAuth.ts` में रहते हैं। Scopes जानबूझकर न्यूनतम रखे गए हैं: Google `drive.file` (केवल ऐप द्वारा बनाई गई फ़ाइलें, कोई restricted-scope verification नहीं), OneDrive `Files.ReadWrite.AppFolder`, और Dropbox app-folder access। S3 एक सादा credential form है।

Scope note: BYOS केवल `/content/files` surfaces को कवर करता है। Gallery images, thumbnails, logos और person photos डिफ़ॉल्ट प्रोवाइडर पर ही रहते हैं (छोटे, CDN-served, image-optimized)। क्लाइंट `postUrl` body में `platformStorage: true` भी पास कर सकता है, ताकि अपलोड चर्च की BYOS सेटिंग के बावजूद डिफ़ॉल्ट churchapps प्रोवाइडर पर पिन हो जाए। FreeShow इसका उपयोग `files/group/{teamId}/current.zip` sync state के लिए करता है, जो सीधे सार्वजनिक content host से पढ़ी जाती है और कभी file row के रूप में रजिस्टर नहीं होती।
