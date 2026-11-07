---
title: "Ticelo Letabelwanako"
description: "Indlela tingoma, tifundo, nemafomethi letingeniswa ngabasebenti ihamba ngayo emgceni wekuhlola we-B1 Admin's Server Admin, kuze kushicilelwe."
---

# Ticelo Letabelwanako — Lilabhulali Lelabelwanako Letintfo & Kuhlolwa

Tintfo letingeniswa ngabasebenzisi letabelwanako kuwo wonkhe emikhiqizo (tingoma te-WorshipCommons, tifundvo te-Lessons.church, tikhaya te-FreeShow, tikhaya tewebhusayithi ye-B1) ihamba ngemgca mnye wekuhlola, hhayi umsakato wekuhlola wemkhiqizo ngamunye. Leliphepha ligubha sigaba sekutfumela nekuvunyelwa, imodeli yedatha yetinsita letabelwanako, nendzawo lapho kuhlolwa khona.

## Umgogodla wetinsita

Tilulamo letimbili titfwala yonkhe imphahla yeCommons, nangabe ngumkhiqizo muni:

- **`assets`** — umugca wesimo wesive lowetulako. `status`: `pending` (iyalindzela) | `published` (ishicilelwe) | `unpublished` (ayishicilelwanga) | `removed` (isusiwe). Tintfo letichazeka ngalolo luhlobo (tinkcukacha tetingoma, bahlabeli) tihlala kumatafula lahlanganiswe ngu-`assetId`.
- **`assetFiles`** — onkhe emafayela ahlanganiswe nentfo ngayinye (lemsindo, tizithombe, tidokhumenti). Itigcwalisa indzawo yakudala ye-`path` ne-`files` letihlukaniswa ngekhoma ekutilulamo letikhetsenisiwe.
- **`submissions`** — yiyunithi yekuhlola. Imphilo yayo: `draft → pending → approved | rejected | withdrawn` (kubhalwa → kuyalindzelwa → kuvunyelwe | kwenqatjwe | kuhoxisiwe). Kutfumela kungaba yinsita lesha lephelele noma kulungisa lokushicilelwe lokukhona (ngumbhali lowakutfumela ekuqaleni noma ngumuntfu wesithathu).

Kuvunyelwa kutfumela kusebenta **lihhuki lekushicilela** lelicondzene nemkhiqizo (`Api/src/modules/commons/helpers/publishHooks/`, njengo `song.ts`), lelandzisa kutfumela ekutfolakaleni kwetilulamo temkhiqizo.

## Umsakato wekutfumela

`CommonsSubmissionController` (`Api/src/modules/commons/`) yi-API lebhekene nabasebenzisi: yakha umsebenti lobhaliwe, ifake futsi ihlanganise emafayela, itfumele ekuhlolweni, noma ihoxise. Emaclient ayo langempela ngetiwebhusayithi letikhiqiza langaphandle (iwebhusayithi ye-WorshipCommons, Lessons.church, FreeShow, ligalelo letikhaya te-B1 webhusayithi) — hhayi i-B1Admin.

## Kusetjentiswa yibandla

Ngaphandle kwekuhlola, B1Admin iphindze ifundze ngqo emgogodleni wetinsita letabelwanako: Serving → Songs "Add Song" kuseshi `GET /songs?sundayReady=true` ngalokunye kulolwazi lwemculo lwangaphandle lolukhona, ibonise tingoma te-WorshipCommons letishicilelwe lete-staff tibhale tatsi "lilungele Sonto" (bona isiyinga sekulalela ngentasi) ne-licence badge. Kukhetsa ingoma kuyayihlanganisa ne-`SongDetail` lensha ibuyele emtfonjeni wayo ngaphandle kwe-`songDetailLinks`. Nje kuyindlela lapho i-B1Admin yebandla ingacondzana ngqo nedatha yeCommons, kunekutsi ibe ngelitulo lemisebenti yeServer Admin yase-staff kuphela. Ukuchaza lokubhekene nebandla, bona sigaba se-[Free Songs from WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) kulesikhatsi sencwadzi yekusekela.

## Umgca wekuhlola

Umgca utfole **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`), ulawulwa yi-`Permissions.server.admin` — imvume lefanana nalena evala Churches/Impersonate/Jobs kuleliphepha. Lelithuluzi lelisebenta ngekwangaphakathi lelisetjentiswa ngubasebenti be-ChurchApps kuphela, hhayi lelibonwa yibandla ngalinye.

Emathebhu lamatsatfu:

- **Queue** — tonkhe tintfumelo letilindzele kuwo wonkhe emikhiqizo, letingasetjentiswa ngemkhiqizo/luhlobo lwentfo. Umugca ngamunye ukhombisa ibheji lelisha-nsita/lelihleliwe-ngumbhali/lelihleliwe-ngumuntfu-wesithathu, umlandvo wekuvunyelwa kwemtfumeli, sifinyeto semehluko yenkhundla/yemafayela, nesikhatsi (lesiveta uma sidlulile emahoreni lama-72). **Review** livula ibhokisi lemehluko yenkhundla ngenkhundla, kubukwa kwemafayela, nekubukwa kwemkhiqizo lokufakiwe lokufundvwa kuphela; Approve/Reject line-keyboard shortcuts (j/k kuhamba, a/r kwenta).
- **Reports** — imibiko yelilungelo lekushicilela nemigomo/yemkhatsi kutintfo letishicilelwe, lehlukaniswe ibe timigca letimbili kanye nemlandvo wetinkinga letixaziwe. Litsatfu lelitsite libamba umbiko, bese liwuxazulula ngesinqumo (lisekelwe/liyaliwa/liphindeka) nesenzo (asikho/ukususa ekushicilelweni/susa).
- **Assets** — sibhali sokufingela setinsita letishicilelwe nemisebenti yentfo ngayinye: enta sitfombe, ukususa ekushicilelweni/kushicilelwa kabusha, noma susa (sizatfu: lilungelo lekushicilela/umgomo). Kumingoma, **isiyinga sekulalela** lapha yindlela yekutsi ingoma ibe "lilungele Sonto": lutsatsa lwetfukutfuku lwetinsita lwetikhiye tonkhe letishicilelwe nekuqinisekisa kutsi imibhalo, tishwamba, nemifanekiso sekukhona.

Yonkhe imikhiqo ngaphansi kwe-`/commons/admin/*` (`CommonsAdminController.ts`) iphindze ihlole imvume ye-server-admin ngayo.

:::info
Lomklamo unemgca wekuhlola munye ngelinjongo: i-WorshipCommons' `/admin` umsebenti wekuhlola watfolakala ngekutsi kutfumelwe kwemikhiqizo yonkhe ngetilulamo te-B1Admin's Server Admin.
:::

## Tindzawo

Api (umdzimba wecommons), B1Admin (Server Admin), kanye netikhiqizo letingaphandle: WorshipCommons, Lessons.church, FreeShow, tilulamo tebakhi wewebhusayithi ye-B1.
