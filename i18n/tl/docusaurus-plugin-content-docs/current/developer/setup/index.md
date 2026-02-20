---
title: "Setup"
---

# Setup

<div class="article-intro">

Itinuturo ng seksyong ito kung paano mag-set up ng lokal na development environment para sa mga proyekto ng ChurchApps. Maaari mong ituro ang iyong frontend sa mga shared staging API para sa mabilis na development, o patakbuhin ang buong stack nang lokal para sa backend na trabaho.

</div>

## Dalawang Paraan

May dalawang paraan para mag-develop nang lokal, depende sa kung gaano karami ng stack ang kailangan mo:

### 1. Ituro sa mga Staging API (Pinakamadali)

Kung nagtatrabaho ka sa isang **frontend na proyekto** (web app, mobile app, o desktop app), ang pinakamabilis na paraan ay ituro ang iyong lokal na app sa mga shared staging API. Hindi kailangan ng database o backend setup.

Ang staging API base URL ay:

```
https://api.staging.churchapps.org
```

Ang bawat API module ay available sa isang path sa ilalim ng base na ito, halimbawa:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Binibigyang-daan ka ng paraang ito na magsimulang gumawa ng mga pagbabago sa frontend sa loob ng ilang minuto. Ito ang inirerekomendang paraan para sa karamihan ng mga contributor.
:::

### 2. Patakbuhin ang Lahat Nang Lokal

Kung kailangan mong baguhin ang API code o magtrabaho nang offline, maaari mong patakbuhin ang buong stack nang lokal. Nangangailangan ito ng MySQL 8.0+ at karagdagang configuration. Tingnan ang gabay sa [Lokal na API setup](../api/local-setup) para sa detalyadong mga instruksyon.

## Pagsisimula

Sundin ang mga pahinang ito ayon sa pagkakasunod-sunod:

1. **[Mga Kinakailangan](prerequisites)** -- I-install ang mga kinakailangang tool (Node.js, Git, MySQL, atbp.)
2. **[Pangkalahatang-tanaw ng Proyekto](project-overview)** -- Unawain kung aling mga proyekto ang umiiral at kung ano ang ginagawa nila
3. **[Mga Environment Variable](environment-variables)** -- I-configure ang iyong mga `.env` file para ikonekta ang lahat

:::info
Ang bawat proyekto ng ChurchApps ay isang independiyenteng Git repository. Kailangan mo lang i-clone ang mga partikular na proyekto kung saan mo gustong magtrabaho.
:::
