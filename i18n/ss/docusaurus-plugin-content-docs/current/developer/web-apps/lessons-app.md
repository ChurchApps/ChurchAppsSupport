---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp luhlelo lwekuphatsa loko lokucuketfwe kwetifundvo lwe-[Lessons.church](https://lessons.church). Linikeza luhlaka lwekwakha, kuhlela, nekushicilela luhlu lwetifundvo teligobhondolo, lolwakhiwe nge-Next.js ne-React.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Faka i-**Node.js 22+** kanye ne-**Git** -- bona [Tidzingo Letandzulelo](../setup/prerequisites)
- Hlela indzawo yakho ye-API lohlosiwe (staging nome yasekhaya) -- bona [Tintfo Tesimo Sekusebenta](../setup/environment-variables)

</div>

:::warning
LessonsApp idzinga i-Node.js 22 nome lengetulu. Emaveshini langaphansi awasekelwa.
:::

## Kuhlela

### 1. Khuphela i-repository

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Faka tintfo letincikako

```bash
cd LessonsApp
npm install
```

### 3. Hlela tintfo tesimo sekusebenta

Kopisha lifayela lesibonelo sesimo sekusebenta uyifake ku-`.env` bese uhlela tindzawo te-API:

```bash
cp dotenv.sample.txt .env
```

Tfutfukisa tindzawo te-API kuze tikhombe i-API ya-staging nome lelisekhaya kuwe.

### 4. Cala iseva yekutfuthukisa

```bash
npm run dev
```

Iseva ye-Next.js yekutfuthukisa icala ku-[http://localhost:3501](http://localhost:3501).

## Imiyalo Lebalulekile

| Umyalo | Sichasiso |
|---------|-------------|
| `npm run dev` | Cala iseva ye-Next.js yekutfuthukisa ku-port 3501 |
| `npm run build` | Kwakhiwa kwe-production nge-Next.js |

## Luhlaka Lwesobuchwepheshe

- **Next.js 16** ne-TypeScript
- **React 19** tetincumo te-UI
- Emaphakheji e-**`@churchapps/apphelper*`** etincumo letihlanganyelwe

:::info
LessonsApp ikhuluma ne-**LessonsApi** yangemuva, lenge-API lehlukene ne-Api yesisekelo ya-ChurchApps. Cinisekisa kutsi simo sakho sekusebenta sihlelwe ngendzawo lelungile ye-Lessons API.
:::

## Kutfunyelwa

Kwakhiwa kwe-production kutfunyelwa ku-**S3 + CloudFront**:

1. `npm run build` yakha kwakhiwa lokungcono kwe-Next.js
2. Umphumela wekwakha ukopiswa uyiswe ku-bucket ye-S3
3. Kususa lokusesikhwameni kwe-CloudFront kuyacaliswa kuze kunikelwe lomniniko lomusha

:::tip
Kuze utfole imiyalo lengephetseli yekutfunyelwa, bona sicwayiso se-[Kutfunyelwa Kwetinhlelo TeWebhu](../deployment/web-apps).
:::
