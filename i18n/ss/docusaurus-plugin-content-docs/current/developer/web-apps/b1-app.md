---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App luhlelo lwelilunga leligobhondolo loluvelele emphakathini lolwakhiwe nge-Next.js. Linikeza lulwati lwelilunga kufaka ekhatsi emaphrofayela, luhlu lwemacembu, kusakata lokuphila, kanye nemakhasi emnikelo.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Faka i-**Node.js 22+** kanye ne-**Git** -- bona [Tidzingo Letandzulelo](../setup/prerequisites)
- Hlela indzawo yakho ye-API lohlosiwe (staging nome yasekhaya) -- bona [Tintfo Tesimo Sekusebenta](../setup/environment-variables)

</div>

:::warning
B1App idzinga i-Node.js 22 nome lengetulu. Emaveshini langaphansi awasekelwa.
:::

## Kuhlela

### 1. Khuphela i-repository

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Faka tintfo letincikako

```bash
cd B1App
npm install
```

### 3. Hlela tintfo tesimo sekusebenta

```bash
cp dotenv.sample.txt .env
```

Vula i-`.env` bese uhlela tindzawo te-API te-`NEXT_PUBLIC_*_API`. Lezi tingakhomba i-API ya-staging nome lelisekhaya kuwe.

### 4. Cala iseva yekutfuthukisa

```bash
npm run dev
```

Iseva ye-Next.js yekutfuthukisa icala ku-[http://localhost:3301](http://localhost:3301).

## Imiyalo Lebalulekile

| Umyalo | Sichasiso |
|---------|-------------|
| `npm run dev` | Cala iseva ye-Next.js yekutfuthukisa ku-port 3301 |
| `npm run build` | Kwakhiwa kwe-production nge-Next.js |
| `npm run test` | Gijimisa tivivinyo te-end-to-end nge-Playwright |
| `npm run lint` | Gijimisa i-lint ye-Next.js |

## Tintfo Letibalulekile Tesimo Sekusebenta

| Intfo | Sichasiso |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | Tindzawo te-API temojula ngamunye |

:::info
Sikripthi se-`postinstall` sikopisha emafayela e-locale ne-CSS kusuka ku-`@churchapps/apphelper`. Nangabe tincumo tibonakala tingakalungiswa ngekubukeka ngemuva kwekufaka, gijimisa `npm run postinstall` ngesandla.
:::

## Luhlaka Lwesobuchwepheshe

- **Next.js 16** ne-TypeScript
- **React 19** tetincumo te-UI
- **Material-UI 7** yesakhi selucwazululo
- **React Query 5** yesimo seseva
- Emaphakheji e-**`@churchapps/apphelper*`** etincumo letihlanganyelwe

## Kutfunyelwa

Kwakhiwa kwe-production kutfunyelwa ku-**S3 + CloudFront**:

1. `npm run build` yakha kwakhiwa lokungcono kwe-Next.js
2. Umphumela wekwakha ukopiswa uyiswe ku-bucket ye-S3
3. Kususa lokusesikhwameni kwe-CloudFront kuyacaliswa kuze kunikelwe lomniniko lomusha

:::tip
Kuze utfole imiyalo lengephetseli yekutfunyelwa, bona sicwayiso se-[Kutfunyelwa Kwetinhlelo TeWebhu](../deployment/web-apps).
:::
