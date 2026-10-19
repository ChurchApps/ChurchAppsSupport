---
title: "Setup"
---

# Setup

<div class="article-intro">

Ginagabayan ka ng seksyong ito sa pag-set up ng lokal na development environment para sa mga proyekto ng ChurchApps. Maaari mong ituro ang iyong frontend sa mga shared demo API para sa mabilisang development, o patakbuhin ang buong stack nang lokal para sa backend work.

</div>

## Dalawang Paraan

May dalawang paraan para mag-develop nang lokal, depende sa dami ng stack na kailangan mo:

### 1. Ituro sa Demo APIs (Pinakamadali)

Kung nagtatrabaho ka sa **frontend project** (web app, mobile app, o desktop app), ang pinakamabilis na paraan ay ituro ang iyong lokal na app sa shared demo APIs. Walang kailangang database o backend setup.

Ang base URL ng demo API ay:

```
https://api.demo.churchapps.org
```

Ang bawat API module ay makukuha sa isang path sa ilalim ng base na ito, halimbawa:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Ang demo environment ay tumatakbo sa pinakabagong code mula sa `main`, at ang sample data nito ay muling nilalagyan tuwing gabi, kaya huwag asahang tatagal ang anumang gagawin mo roon. (Ang dating staging environment, `api.staging.churchapps.org`, ay inalis na. Maaaring may mga sample na `.env` file pa rin na nakalista ang mga staging URL -- palitan ang mga ito ng demo o lokal na URL.)

:::tip
Sa paraang ito, makakapagsimula ka sa mga pagbabago sa frontend sa loob ng ilang minuto. Ito ang inirerekomendang paraan para sa karamihan ng mga contributor.
:::

### 2. Patakbuhin Nang Lokal ang Lahat

Kung kailangan mong baguhin ang API code o magtrabaho nang offline, maaari mong patakbuhin nang lokal ang buong stack. Nangangailangan ito ng MySQL 8.0+ at karagdagang configuration. Tingnan ang gabay na [API local setup](../api/local-setup) para sa detalyadong mga tagubilin.

## Pagsisimula

Sundin ang mga pahinang ito nang sunud-sunod:

1. **[Prerequisites](prerequisites)** -- I-install ang mga kinakailangang tool (Node.js, Git, MySQL, atbp.)
2. **[Project Overview](project-overview)** -- Unawain kung aling mga proyekto ang umiiral at kung ano ang ginagawa ng bawat isa
3. **[Environment Variables](environment-variables)** -- I-configure ang iyong mga `.env` file para mag-ugnayan ang lahat

:::info
Ang bawat proyekto ng ChurchApps ay isang independent na Git repository. Kailangan mo lamang i-clone ang mga partikular na proyektong gusto mong pagtrabahuhan.
:::
