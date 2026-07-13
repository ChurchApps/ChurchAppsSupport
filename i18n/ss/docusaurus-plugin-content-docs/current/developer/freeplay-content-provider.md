---
title: "Umniniyo Wekucuketfwe kwe-FreePlay"
---

# Umniniyo Wekucuketfwe kwe-FreePlay

<div class="article-intro">

FreePlay yisisebentisi semidiya se-ChurchApps sekusakata tifundvo naleminye imininingwane yevidiyo kumafoni, ema-tablet, kanye netibonakalisi. Nangabe unenkhwadzi yekucuketfwe kwetifundvo bese ufuna kuyenta itfolakale ku-FreePlay, lesicondziso sifaka konkhe lokudzingekako kutsi ukunikete.

</div>

## Kuphawula (Branding)

Ngaphambi kwekutsi kuhlanganiswa kucale, sidzinga:

- **Logo** -- Sitfombe se-logo ngesilinganiso se-**16:9** (sisetjentiswa kumakhadi emniniyo ku-FreePlay UI)
- **Ligama Lephawu** -- Ligama lelitsandwako kutsi liboniswe kunhlangano yakho ku-FreePlay

## Emakhona Ekugcina e-API (API Endpoints)

FreePlay ikhulumisana nensita yakho ngekusebentisa licembu lelincane lema-REST endpoint. Sibhala i-adapter lekhetsekile ngamunye wemniniyo, ngako sakhiwo lesicondzile se-URL siyaguquka -- kodvwa imininingwane lengentasi yiyo lesiyidzingako.

### Kucinisekiswa Kwebuwena (Authentication)

Khetsa imodeli lehambisana nekucuketfwe kwakho:

| Imodeli | Nini Yekuyisebentisa | Loko Lesikudzingako |
|-------|-------------|--------------|
| **Kute** | Kucuketfwe lokuvulekile, akudzingeki kungena ngemvumo | Kute -- sibitsa ema-endpoint akho ekhathalogi ngalokucondzile |
| **OAuth (PKCE)** | Kungena nge-web/selula | I-URL yemvumo, i-endpoint yekushintjaniswa kwe-token, i-client ID, tigaba (scopes) |
| **Device Flow** | Yetsandvwa kuti-app tetibonakalisi (umsebentisi ufaka likhodi lelifisha efonini yakhe) | I-endpoint yemvumo yelidevice, i-endpoint yekuhlola-token, i-client ID |

:::tip
Nangabe kucuketfwe kwakho kudzinga kucinisekiswa kwebuwena, i-endpoint ye-auth ibuyisela **i-user token** ledluliswa yi-FreePlay kuma-endpoint ekubukela nekufundza kute igunyate kufinyelela.
:::

### Kubukela / Ikhathalogi

I-endpoint (nobe licembu lema-endpoint) lelibuyisela sihlahla semafolda etifundvo tonkhe letitfolakalako.

- Loku kungaba **kubitwa kunye** lokubuyisela sihlahla sonkhe, nobe **kubitwa lokunyenti** lapho ngamunye abuyisela lizinga linye njengoba umsebentisi acubungula ngekujula.
- Intfo ngayinye esihlahleni kufanele ifake:

| Insimu | Kuyadzingeka | Sichasiso |
|-------|----------|-------------|
| `id` | Yebo | Sikhomba lesikhetsekile sefolda |
| `name` | Yebo | Ligama lelibonakalako lefolda |
| `thumbnail` | Kunconyiwe | I-URL yesitfombe lesincane nge-16:9 |

### Luhlu Lwekudlala Kwesifundvo

I-endpoint lebuyisela luhlu lwekudlala lwemafayela emidiya esifundvo lesinye.

Intfo ngayinye kuluhlu lwekudlala kufanele ifake:

| Insimu | Kuyadzingeka | Sichasiso |
|-------|----------|-------------|
| `title` | Yebo | Sihloko lesibonakalako sentfo yemidiya |
| `mediaType` | Yebo | `video` nobe `image` |
| `url` | Yebo | Sixibelo lesicondzile sekulanda fayela (bona [Tifomethi Temidiya](#media-formats) ngentasi) |
| `thumbnail` | Kunconyiwe | Sitfombe lesincane sentfo |
| `duration` | Kunconyiwe | Sikhatsi ngemasekhondi (ematividiyo) |

## Tifomethi Temidiya

FreePlay ilanda emafayela ngalokucondzile, ngako intfo yonkhe yemidiya kufanele ibe nesixibelo lesicondzile (akukho tidlali letifakiwe nobe kucondziswa kwelikhasi).

| Luhlobo | Tifomethi Letemukelekako |
|------|-----------------|
| Vidiyo | **MP4** (kuyadzingeka kute kudlaleke kuto tonkhe ti-platform kumadivayisi e-Apple ne-Android) |
| Sitfombe | JPG, PNG, nobe GIF |

## Emanotsi

- I-**REST API lebuyisela i-JSON** ngiyona ndlela lejwayelekile yekuhlanganisa, kodvwa njengobe sibhala i-adapter lekhetsekile ngamunye wemniniyo, singasebenta nome nguluphi luhlobo lwe-API.
- Nangabe unentsandvo yekuba ngumniniyo wekucuketfwe kwe-FreePlay, sitfintse nge-[Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) nobe uvule inkinga ku-[GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
