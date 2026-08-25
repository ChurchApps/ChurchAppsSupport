---
title: "अपना स्वयं का स्टोरेज लाएं"
---

# अपना स्वयं का स्टोरेज लाएं (BYOS)

चर्चों को लगभग 100MB मुफ्त होस्ट की गई फ़ाइल स्टोरेज मिलती है (`/content/files` सतहें: वेबसाइट फ़ाइलें, समूह संसाधन)। BYOS एक चर्च को अपना क्लाउड स्टोरेज लिंक करने देता है — **Google Drive, Dropbox, OneDrive, या कोई भी S3-संगत बकेट (AWS S3, Cloudflare R2, Backblaze B2)** — ताकि नई अपलोड चर्च के अपने खाते में आएं प्लेटफॉर्म कैप के बिना। ChurchApps मुफ्त रहता है; चर्च के अपने खाते की सीमा है।

## प्रदाता सीम

BYOS [MinistryStuff](./ministrystuff) के लिए बनाई गई स्टोरेज सीम का पुनः उपयोग करता है: `IStorageProvider` (`Packages/apihelper`) `content.storageProviders` तालिका से `StorageResolver` द्वारा चर्च के अनुसार हल किया जाता है। सिंगलटन `churchapps`/`ministrystuff` प्रदाताओं के विपरीत, BYOS प्रदाता प्रति-चर्च क्रेडेंशियल रखते हैं, इसलिए `StorageResolver.forChurch` चर्च की पंक्ति से प्रति अनुरोध एक उदाहरण बनाता है। कार्यान्वयन `Api/src/modules/content/helpers/` के साथ रहते हैं: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, साथ ही `ByosAuth` (OAuth टोकन विनिमय + एकल-उड़ान रीफ्रेश — Dropbox रीफ्रेश टोकन घुमाता है, इसलिए रीफ्रेश उसी तरह डीडुप्लिकेट किए जाते हैं जैसे `ProviderProxyController` करता है)।

`storageProviders` क्रेडेंशियल ले जाता है: `accessToken`/`refreshToken`/`tokenExpiresAt` (एन्क्रिप्टेड, OAuth ट्रिपल) या `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3)। टोकन कभी क्लाइंट तक नहीं पहुंचते — `GET /content/storage/providers` रहस्य को मास्क करता है और एक `connected` बूलियन देता है।

## अपलोड प्रवाह

पहले जैसा ही तीन-चरण अनुबंध, विस्तारित प्रिसाइन आकार के साथ। `POST /content/files/postUrl` `PresignedPostData` देता है जो अब वैकल्पिक रूप से `method`, `rawBody`, `headers`, `chunkSize`, और `externalIdField` ले जाता है:

| प्रदाता | प्रिसाइन | क्लाइंट बाइट भेजता है |
|---|---|---|
| churchapps (डिफ़ॉल्ट) | S3 प्रिसाइन किया हुआ POST | मल्टीपार्ट फॉर्म (विरासत) |
| Google Drive | पुनः शुरू योग्य अपलोड सत्र (`drive.file` स्कोप) | सत्र URI के लिए एकल PUT |
| Dropbox | `files/get_temporary_upload_link` (4h) | कच्चा POST |
| OneDrive | `createUploadSession` (approot) | खंडित PUT (20MiB, ग्राफ 320KiB-एकाधिक) |
| S3-संगत | प्रिसाइन किया हुआ PUT (B2 के पास कोई POST नीति नहीं) | कच्चा PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) सभी आकृतियों को संभालता है और प्रदाता फ़ाइल आईडी देता है जब प्रतिक्रिया एक ले जाती है (Drive)। क्लाइंट इसे `POST /content/files` पंजीकरण में `externalId` के रूप में पास करता है; `files.provider` + `files.externalId` रिकॉर्ड करता है कि बाइट कहां रहते हैं (Drive फ़ाइल आईडी; अन्य के लिए पथ)। 100MB कोटा जांच केवल तब लागू होती है जब हल किया गया प्रदाता `churchapps` हो।

## सार्वजनिक डाउनलोड

उपभोक्ता क्लाउड को हॉटलिंक नहीं किया जा सकता (Drive लिंक कोटा से बाहर, Dropbox/OneDrive लिंक समाप्त हो जाते हैं), इसलिए OAuth ट्रिपल के लिए `contentPath` एक स्थिर Api रूट की ओर इशारा करता है: `GET /content/files/download/:id` (गुमनाम) फ़ाइल पंक्ति को लोड करता है, प्रदाता के `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`) के माध्यम से एक अल्पकालिक प्रत्यक्ष लिंक बनाता है, 30 मिनट के लिए इन-मेमोरी में कैश करता है, और `Cache-Control: max-age=300` के साथ 302-रीडायरेक्ट करता है। बैंडविड्थ ब्राउज़र↔प्रदाता प्रवाह करता है, कभी भी Api के माध्यम से नहीं। S3-संगत बिल्कुल रीडायरेक्ट को छोड़ देता है — `contentPath` स्थिर `publicBase + key` URL है (बकेट को सार्वजनिक पढ़ने और CORS PUT की अनुमति देनी चाहिए)।

हटाना और डाउनलोड `files.provider` (`StorageResolver.forFile`) द्वारा रूट किए जाते हैं; इसके बिना विरासत पंक्तियां URL-प्रीफिक्स रूटिंग में वापस आती हैं। BYOS फ़ाइलों के लिए नाम बदलना DB-केवल है (बाइट `externalId` द्वारा संबोधित होते हैं, नाम नहीं)। एक प्रदाता को डिस्कनेक्ट करना जिसके पास अभी भी फ़ाइलें हैं, इसे हटाने के बजाय पंक्ति को नरम-अक्षम करता है (डाउनलोड/हटाना काम रखने के लिए टोकन रखता है)।

## कनेक्ट करना (B1Admin → सेटिंग्स → फ़ाइल स्टोरेज)

OAuth ट्रिपल सामग्री प्रदाताओं के समान रिले प्रवाह का उपयोग करता है: पॉपअप → प्रदाता सहमति → `{membershipApi}/oauth/relay/callback` → B1Admin रिले सत्र को पोल करता है → `POST /content/storage/exchange` सर्वर-पक्ष कोड→टोकन विनिमय करता है (क्लाइंट रहस्य कभी सर्वर छोड़ नहीं; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox एक PKCE सार्वजनिक क्लाइंट है)। क्लाइंट आईडी `B1Admin/src/settings/components/byosProviders.ts` और `Api .../ByosAuth.ts` में रहती हैं। स्कोप जानबूझकर न्यूनतम हैं: Google `drive.file` (केवल ऐप-बनाई गई फ़ाइलें — कोई प्रतिबंधित-स्कोप सत्यापन नहीं), OneDrive `Files.ReadWrite.AppFolder`, Dropbox ऐप-फ़ोल्डर एक्सेस। S3 एक सादा क्रेडेंशियल फॉर्म है।

स्कोप नोट: BYOS केवल `/content/files` सतहों को कवर करता है। गैलरी छवियां, थंबनेल, लोगो और व्यक्ति फ़ोटो डिफ़ॉल्ट प्रदाता पर रहते हैं (छोटे, CDN-सेवा, छवि-अनुकूलित)। एक क्लाइंट `postUrl` बॉडी में `platformStorage: true` भी पास कर सकता है चर्च की BYOS सेटिंग के बावजूद डिफ़ॉल्ट churchapps प्रदाता के लिए एक अपलोड को पिन करने के लिए — FreeShow अपनी `files/group/{teamId}/current.zip` सिंक स्थिति के लिए इसका उपयोग करता है, जिसे सार्वजनिक सामग्री मेजबान से सीधे पढ़ा जाता है और कभी फ़ाइल पंक्ति के रूप में पंजीकृत नहीं होता है।
