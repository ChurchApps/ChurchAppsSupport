---
title: "Isibukeli Sephrojekthi"
description: "Hlola yonkhe imitfombo ye-ChurchApps ngetigaba, nemarhwebu, tiphoti tekuthuthukisa, tidatabhesi, nendlela timabhuku ta-@churchapps ahlanganisa ngayo, ekhasini lemiyalelo yekuseta kwabatfuntsi."
---

# Isibukeli Sephrojekthi

<div class="article-intro">

I-ChurchApps inemitfombo lecishe ibe ngu-20 leyizimele, ngayinye ishicilelwe ngaphansi kwenhlangano ye-[ChurchApps GitHub](https://github.com/ChurchApps). Leli phepha liniketa lu lwati lugcwele lwemaprojekthi wonkhe lohlelwe ngetigaba, kanye netimfanelo tawo, tiphoti, nemavelelwano.

</div>

<div class="prereqs">
<h4>Ngaphambi Kokuqala</h4>

- Faka [imitsetfo lesidzingekako](./prerequisites.md) yaleligoso lemaprojekthi lofuna kusebentela

</div>

## Ama-API Angemuva

Yonkhe ama-API akhiwe nge-Node.js, Express, ne-TypeScript, futsi ahlelwa ku-AWS Lambda ngesikhatsi se-Serverless Framework.

| Iphrojekthi | Inhloso | Iphothi Yentfutfuko | Idatabhesi |
|-------------|---------|---------------------|------------|
| **[Api](https://github.com/ChurchApps/Api)** | Imodyuli lesisekelo ehlanganisa ubulungu, kuba khona, lokuqukethwe, kunikela, kuchuma, nemsebenti | 8084 | Idatabhesi ye-MySQL leyehlukile ngayo ngayo imodyuli (6 yonkhe) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lusebentelo lwangemuva lwe-Lessons.church | -- | Idatabhesi ye-MySQL yinye ye`lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Ithuluzi lemibuto le-AI elisebentisa i-OpenAI | -- | -- |

:::info
Iphrojekthi ye-**Api** yimodyuli lesisekelo. Ngayo ngayo imodyuli (ubulungu, kuba khona, lokuqukethwe, kunikela, kuchuma, nemsebenti) inedatabhesi yayo futsi iyatfolakala ku-subpath lefana ne`/membership` noma `/giving`. Ekusebentiseni kwangempela, lezi tikhishwa njengetinsebenti letihlukile te-Lambda ngemuva kwe-API Gateway.
:::

## Ama-App Eweb

| Iphrojekthi | Framework | Iphothi Yentfutfuko | Inhloso |
|-------------|-----------|---------------------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Ideshibhodi yekuphatfwa kwebandla |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | I-app yelilungu lebandla leyibonakala kubantfu |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lusebentelo lwangaphambili lwe-Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Ithuluzi lekungenisa nekuphumisa idatha |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Lingashintjeki | -- | Iwebhusayithi lemabrochure lebandla lalingashintjeki |

## Ama-App Eselula

Yonkhe ama-app eselula asebentisa React Native ne-Expo.

| Iphrojekthi | Inhloso | Tinguquko Letibalulekile |
|-------------|---------|--------------------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | I-app yekubhalisa ku-kiosk | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Kuboniswa kwemfundziso ku-Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Kudlala lokuqukethwe (kuhlanganisa ne-TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Lawulo lwekude lweselula lwe-FreeShow | Expo |

## Idesktop

| Iphrojekthi | Sitaki | Inhloso |
|-------------|--------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Softhiwe yetinkhulumo netinkonzo |

## Tilabhurari Letabelanako

Likhodi lelabelanako lishicilelwa ku-npm ngaphansi kwe-scope ye`@churchapps` futsi lisetfwa njengetincike letijwayelekile te-npm ngemaprojekthi lasejwayelekile langenhla. Tonkhe tiphakheji letabelanako titsatsa endzaweni yinye -- [Packages](https://github.com/ChurchApps/Packages) -- ilawulwa njengesikhala se-Yarn workspace futsi ikhishwa ngetinguquko (changesets).

| Iphakheji | Inhloso | Isetfwa Ngu- |
|-----------|---------|--------------|
| `@churchapps/helpers` | Tisebenti letisisekelo kanye netincazelo te-TypeScript letabelanako (DateHelper, ApiHelper, CurrencyHelper, njll.) | Yonkhe emaprojekthi |
| `@churchapps/apihelper` | Tisebenti te-Express server (kugunyaza, tilawuli letisisekelo, kufinyelela kudatabhesi, kuhlanganiswa ne-AWS) | Yonkhe ama-API |
| `@churchapps/apphelper` | Laybrari yetingchenye ze-React lenemamojula etisubpath yekungena, tiniveko, tifomo, i-markdown, nekwakhiwa kwewebhusayithi | Yonkhe ama-app eweb |
| `@churchapps/content-providers` | Kukhishwa kwebhalansi lokuqukethwe kubahlinzeki besithathu (Lessons.church, Planning Center, Dropbox, nabanye) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Tilungiselelo tekuhlanganisa ne-B1.church: ama-webhook, ikhasimende le-REST, OAuth | Abatfuntsi bekuhlanganisa labangaphandle |
| `@churchapps/texting` | Kukhishwa kwemhlinzeki we-SMS | Api |

Bona [Tilabhurari Letabelanako](../shared-libraries/index.md) ngekusetwa kwesikhala sekusebenta nendlela yekukhishwa.

## Ubudlelwane Phakathi Kwemaprojekthi

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Yonkhe ama-app asekuphambeni ancike ku`@churchapps/helpers`. Ama-app eweb ancike futsi kuma-phakheji e`@churchapps/apphelper`. Yonkhe ama-API asemuva ancike kokubili ku`@churchapps/helpers` ne`@churchapps/apihelper`.

## Tinyatselo Letilandzelako

- **[Tinguquko Temvelo](./environment-variables.md)** -- Lungiselela emafayela wakho `.env` ukuze uxhumane ne-API
- **[Kusetfwa Kwendzawo Kwe-API](../api/local-setup.md)** -- Seta i-API yemuva endzaweni
