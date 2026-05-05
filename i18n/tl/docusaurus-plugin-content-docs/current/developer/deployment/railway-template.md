---
title: "Self-Hosting sa Railway"
---

# Self-Hosting sa Railway

<div class="article-intro">

Ang ChurchApps ay naglalathala ng one-click [Railway](https://railway.com) template na nagbibigay sa iyong simbahan ng sariling pribadong instance ng B1 Admin, ang B1 member portal, ang API, at isang MySQL database — lahat tumatakbo sa imprastrukturang pag-aari mo at direktang binabayaran.

</div>

## Mabilis na Simula

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. I-click ang **Deploy on Railway** button sa itaas.
2. Mag-sign in sa Railway (o gumawa ng libreng account) at magdagdag ng paraan ng pagbabayad.
3. I-click ang **Deploy** nang hindi nagbabago ng anuman.
4. Maghintay ng 5–10 minuto para sa apat na serbisyo na maging berde.
5. Buksan ang **B1Admin** service URL, i-click ang **Register**, at gumawa ng iyong account.
6. Sundin ang mga prompt sa app upang gumawa ng iyong unang simbahan.

:::tip
Ang deploy ay kasalukuyang nasa **beta**. Kung may matamaan kang hindi saklaw ng mga doc, mangyaring magbukas ng issue sa [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues).
:::

<div class="prereqs">
<h4>Ang Kailangan Mo</h4>

- Isang libreng [Railway](https://railway.com) account
- Credit card na nakafile sa Railway (~$15–25/buwan)
- Mga 15 minuto para sa paunang deploy
- *Opsyonal:* Mga kredensyal sa SMTP at custom domain

</div>

## Ano ang Na-deploy

Ang template ay nag-provision ng apat na serbisyo:

| Serbisyo | Layunin | URL |
|---------|---------|-----|
| **MySQL** | Data storage | panloob |
| **Api** | Backend API | `https://api-<id>.up.railway.app` |
| **B1Admin** | Admin web app | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Member portal | `https://b1app-<id>.up.railway.app` |

## Unang Pagsasaayos

### 1. Email (Inirerekomenda)

I-set up ang SMTP para sa password reset:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<host>
SMTP_USER=<username>
SMTP_PASS=<password>
SUPPORT_EMAIL=noreply@yourchurch.org
```

### 2. Mga Custom na Domain

I-configure ang inyong sariling domain para sa B1Admin at B1App.

### 3. Online Giving

I-configure ang Stripe o PayPal sa admin UI.

## Mga Gastos

Mga $15–25/buwan para sa maliit na simbahan.

## Mga Kaugnay na Artikulo

- [Initial Setup](../../getting-started/initial-setup)
- [Website Initial Setup](../../b1-admin/website/initial-setup)
- [Local API Setup](../api/local-setup)
