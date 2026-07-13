---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin luhlelo lwekuphatsa liligobhondolo -- luhlelo lwe-React lwelikhasi linye lolwakhiwe nge-Vite kanye ne-Material-UI. Basebenti beligobhondolo bayisebentisa kuphatsa bantfu, emacembu, kuya etikhundleni, imnikelo, loko lokucuketfwe, kanye naletinye tintfo letinyenti.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Faka i-**Node.js 22+** kanye ne-**Git** -- bona [Tidzingo Letandzulelo](../setup/prerequisites)
- Hlela indzawo yakho ye-API lohlosiwe (staging nome yasekhaya) -- bona [Tintfo Tesimo Sekusebenta](../setup/environment-variables)

</div>

## Kuhlela

### 1. Khuphela i-repository

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Faka tintfo letincikako

```bash
cd B1Admin
npm install
```

### 3. Hlela tintfo tesimo sekusebenta

```bash
cp dotenv.sample.txt .env
```

Vula i-`.env` bese uhlela tindzawo te-API. Ungazikhomba kuma-API la-staging nome kulelo lelisekhaya kuwe.

### 4. Cala iseva yekutfuthukisa

```bash
npm start
```

Loku kucala iseva ye-Vite yekutfuthukisa. Luhlelo luyawutfola ku-browser wakho kanye ne-hot module replacement lesebentako.

## Tintfo Letibalulekile Tesimo Sekusebenta

| Intfo | Sichasiso |
|----------|-------------|
| `REACT_APP_STAGE` | Ligama lesimo sekusebenta (sib. `local`, `staging`, `prod`) |
| `PORT` | I-port yeseva yekutfuthukisa (kwehluleka: `3101`) |
| `REACT_APP_*_API` | Tindzawo te-API temojula ngamunye |

:::info
Sikripthi se-`postinstall` sikopisha emafayela e-locale ne-CSS kusuka ku-`@churchapps/apphelper`. Nangabe tincumo tibonakala tingakalungiswa ngekubukeka, gijimisa `npm run postinstall` ngesandla.
:::

## Imiyalo Lebalulekile

| Umyalo | Sichasiso |
|---------|-------------|
| `npm start` | Cala iseva ye-Vite yekutfuthukisa |
| `npm run build` | Kwakhiwa kwe-production nge-Vite |
| `npm run test` | Gijimisa tivivinyo te-end-to-end nge-Playwright |
| `npm run lint` | Gijimisa i-ESLint nekutilungisa ngekwato |

## Luhlaka Lwesobuchwepheshe

- **React 19** ne-TypeScript
- **Vite** yesisetjentiswa sekwakha kanye neseva yekutfuthukisa
- **Material-UI 7** tetincumo te-UI
- **React Query 5** yesimo seseva
- Emaphakheji e-**`@churchapps/apphelper*`** etincumo letihlanganyelwe

## Kutfunyelwa

Kwakhiwa kwe-production kutfunyelwa ku-**S3 + CloudFront**:

1. `npm run build` yakha tintfo letingashintji
2. Tintfo tikopiswa tiyiswe ku-bucket ye-S3
3. Kususa lokusesikhwameni kwe-CloudFront kuyacaliswa kuze kunikelwe lomniniko lomusha

:::tip
Kuze utfole imiyalo lengephetseli yekutfunyelwa, bona sicwayiso se-[Kutfunyelwa Kwetinhlelo TeWebhu](../deployment/web-apps).
:::
