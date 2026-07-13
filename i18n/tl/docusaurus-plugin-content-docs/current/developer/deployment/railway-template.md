---
title: "Self-Hosting sa Railway"
---

# Self-Hosting sa Railway

<div class="article-intro">

Ang ChurchApps ay naglalathala ng isang one-click Railway template na nagbibigay sa iyong simbahan ng sariling private instance ng B1 Admin, ang B1 member portal, ang API, at isang MySQL database. Ang gabay na ito ay makakarating ka ng live sa tungkol sa 15 minuto at pagkatapos ay dumadalhin ka sa post-deploy configuration.

</div>

## Mabilis na Simula

1. I-click ang **Deploy sa Railway** button.
2. Mag-sign in sa Railway (o lumikha ng isang libreng account) at magdagdag ng isang paraan ng pagbabayad.
3. I-click ang **Deploy** nang walang pagbabago.
4. Maghintay ng 5–10 minuto para sa apat na serbisyo upang maging berde.
5. Buksan ang **B1Admin** service URL, i-click ang **Register**, at lumikha ng iyong account.
6. Sundin ang in-app prompts upang lumikha ng iyong unang simbahan.

Iyan na. Mayroon kang isang ganap na gumagana na ChurchApps instance.

:::tip
Ang deploy ay kasalukuyang sa **beta**. Kung makakuha ka ng isang bagay na hindi sumasaklaw ang mga docs, mangyaring magbukas ng isang isyu sa github.com/`ChurchApps/Api`/issues na may mga deploy logs.
:::

<div class="prereqs">
<h4>Ano Ang Kailangan Mo</h4>

- Isang libreng Railway account
- Isang credit card sa file na may Railway (~$15–25/buwan)
- Humigit-kumulang 15 minuto para sa initial deploy
- *Opsyonal ngunit lubhang inirerekomenda mamaya:* SMTP credentials at isang custom domain

</div>

## Kung Ano Ang Nag-deploy

| Serbisyo | Layunin | URL pagkatapos ng deploy |
|---------|---------|------------------|
| **MySQL** | Nag-imbak ng lahat ng data | internal lamang |
| **Api** | Backend para sa membership, content, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Staff/admin web app | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Member-facing web app at church website | `https://b1app-<id>.up.railway.app` |

## Unang Panahon ng Configuration

### 1. Email (Lubhang Inirerekomenda)

Nang walang email, ang mga miyembro ay maaaring magparehistro ngunit hindi makakabago ng nakalimutang password.

Sa Railway dashboard, buksan ang **Api** service → **Variables**, at magdagdag:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

#### Resend (simplest free option, 100 emails/day)

1. Sign up sa resend.com
2. Verify a sending domain
3. Create an API key
4. Set `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`

#### Gmail (free for personal use, ~500/day)

1. Enable 2-factor auth
2. Create an App Password
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<the 16-character app password>`

#### AWS SES (cheapest at scale)

1. Verify a sending domain
2. Create SMTP credentials
3. Set the variables accordingly

### 2. Custom Domains

Para sa bawat web service (B1Admin at B1App):

1. Buksan ang serbisyo sa Railway → **Settings** → **Networking**
2. I-click ang **+ Custom Domain** at magpasok ng hostname
3. Magdagdag ng CNAME record sa iyong DNS provider

### 3. Multi-Site (Maraming Simbahan)

1. Sa **B1 Admin**, pumunta sa **Settings → Manage Church → Create New**
2. Bawat simbahan ay may natatanging **subdomain slug**

### 4. Online Giving (Stripe / PayPal)

1. Get developer credentials mula sa Stripe o PayPal
2. Sa B1 Admin, pumunta sa **Settings → Giving Settings**
3. Pasok ang iyong credentials

## Costs

Para sa isang maliit na simbahan (under 200 members):

| Component | Approx monthly cost |
|-----------|---------------------|
| Railway base | $5 |
| MySQL plugin | $5 + ~$1 storage |
| 3 web services | $3–10 combined |
| 1 GB volume | $0.25 |
| **Total** | **~$15–25/month** |

