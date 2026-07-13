---
title: "Tinhlelo TeWebhu"
---

# Tinhlelo TeWebhu

<div class="article-intro">

I-ChurchApps ihlanganisa tinhlelo tewebhu letintsatfu, ngalinye lisebentela sive lesehlukene kanye nenhloso lehlukile. Tabelana ngesisekelo sesobuchwepheshe lesifanako se-React 19, TypeScript, kanye ne-Material-UI 7, kepha tehlukene ngesisetjentiswa sato sekwakha kanye netindzawo tato tekutfunyelwa.

</div>

## Tinhlelo Ngalokushesha

| Uhlelo | Inhloso | Luhlaka | I-Port Yekutfuthukisa |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Ligobhondolo lekuphatsa liligobhondolo | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Luhlelo lwelilunga leligobhondolo loluvelele emphakathini | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Kuphatsa loko lokucuketfwe kwetifundvo | Next.js 16 + React 19 | 3501 |

## Luhlaka Lwesobuchwepheshe Loluhlanganyelwe

Tonkhe letinhlelo letintsatfu tewebhu takhiwe nge:

- **TypeScript** -- Kuphepha kwelucwazululo kusukela ekucaleni kuya ekugcineni
- **React 19** -- Umtapo wetincumo te-UI
- **Material-UI 7** -- Sakhi selucwazululo kanye nesisetjentiswa setincumo
- **React Query 5** -- Kuphatsa simo seseva

## Tincumo Letihlanganyelwe

Letinhlelo tabelana ngetincumo te-UI netisetjentiswa nge-lusendvo lwemaphakheji e-`@churchapps/apphelper*`:

| Liphakheji | Inhloso |
|---------|---------|
| `@churchapps/apphelper` | Tincumo tesisekelo te-React letihlanganyelwe |
| `@churchapps/apphelper-login` | Tincumo te-UI teligunya lekungena |
| `@churchapps/apphelper-donations` | Emafomu emnikelo nekupha |
| `@churchapps/apphelper-forms` | Tincumo tesakhi semafomu |
| `@churchapps/apphelper-markdown` | Kwembulwa kwe-markdown |
| `@churchapps/apphelper-website` | Tincumo tewebhusayithi/CMS |

:::tip
Kuze utfole imininingwane yekutfuthukisa lamaphakheji lahlanganyelwe kwasekhaya, bona luchungechunge lwe-[AppHelper](../shared-libraries/app-helper).
:::

## Sikripthi Se-Postinstall

Uhlelo ngalunye lwewebhu lunesikripthi se-`postinstall` lesikopisha emafayela e-locale kanye netintfo te-CSS kusuka ku-`@churchapps/apphelper` tiyiswe ephrojekthini. Loku kwenteka ngekwato ngemuva kwe-`npm install`.

:::info
Nangabe tincumo tibonakala tingakalungiswa ngekubukeka ngemuva kwekufaka tintfo letincikako, kungenteka sikripthi se-`postinstall` asikagijimi kahle. Ungasicalisa ngesandla nge-`npm run postinstall`.
:::

## Sisetjentiswa Sekwakha

Letinhlelo tisebentisa tisetjentiswa letimbili letehlukene tekwakha:

- **B1Admin** isebentisa i-**Vite** -- sisetjentiswa lesisheshako, lesesimanje lesikahle kakhulu tinhlelo temakhasi lasodwana
- **B1App** ne-**LessonsApp** basebentisa i-**Next.js** -- lenikeza kwembulwa hlangotsi lweseva, kuya etindleleni ngekusekelwe emafayeleni, kanye nekwakhiwa kwe-production lokungcono
