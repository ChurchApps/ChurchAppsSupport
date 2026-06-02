---
title: "Pamamahala ng Server"
---

# Pamamahala ng Server

<div class="article-intro">

Ang mga feature sa pamamahala ng server sa ChurchApps ay available lamang sa mga user na may **Server.Admin** na pahintulot. Ang mga tool na ito ay ginagamit para sa platform operations, suporta, at pag-troubleshoot.

</div>

:::warning Access Restricted
Ang mga feature na inilalarawan sa pahina na ito ay nangangailangan ng **Server.Admin** na pahintulot. Ang mga ito ay inilaan para sa mga operator ng platform at suporta staff lamang.
:::

## Pag-access sa Server Admin

Ang mga user na may Server.Admin permission ay maaaring mag-access ng server admin panel mula sa B1 Admin:

1. Mag-log in sa admin.b1.church
2. I-click ang **Admin** tab sa pangunahing navigation
3. Ang Server Admin panel ay may kasamang mga tab para sa pamamahala ng mga simbahan, mga user, at mga operasyon ng sistema

## User Impersonation

Ang feature na impersonation ay nagbibigay-daan sa mga server admin na mag-log in bilang ibang user para sa layunin ng suporta at pag-troubleshoot.

### Paano Mag-impersonate ng User

1. Mag-navigate sa **Impersonate** tab sa Server Admin panel
2. Magpasok ng pangalan o email address ng user sa search field
3. I-click ang **Search** o i-press ang Enter
4. Mula sa mga resulta ng paghahanap, i-click ang user na gusto mong i-impersonate
5. Kumpirmahin ang impersonation
6. Ikaw ay mag-log in bilang ang user

### Mga Mahalagang Tala

- Ang impersonation ay lumilikha ng isang bagong session
- Ang iyong orihinal na admin session ay nagtatapos
- Lahat ng mga aksyon ay naka-log sa audit trail
- Gamitin ang impersonation lamang kung kinakailangan para sa layunin ng suporta

### API Endpoint

Ang impersonation feature ay supported ng `/users/:userId/impersonate` endpoint.

### Mga Pagsasaalang-alang sa Seguridad

- Ang impersonation ay nangangailangan ng Server.Admin permission
- Lahat ng mga kaganapan ay naka-log na may admin user ID at target user ID
- Magtatag ng malinaw na mga patakaran para sa kailan at paano dapat gamitin ang feature na ito
