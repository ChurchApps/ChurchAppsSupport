---
title: "Server Administration"
---

# Server Administration

<div class="article-intro">

Ang mga feature ng server administration sa ChurchApps ay available lamang sa mga user na may **Server.Admin** na pahintulot. Ang mga tool na ito ay ginagamit para sa platform operations, suporta, at troubleshooting sa lahat ng simbahan sa system.

</div>

:::warning Limitadong Access
Ang mga feature na inilarawan sa pahinang ito ay nangangailangan ng **Server.Admin** na pahintulot at hindi available sa mga regular na church administrator. Ang mga ito ay inilaan para sa mga platform operator at support staff lamang.
:::

## Pag-access ng Server Admin

Ang mga user na may Server.Admin na pahintulot ay maaaring ma-access ang server admin panel mula sa B1 Admin:

1. Mag-log in sa [admin.b1.church](https://admin.b1.church)
2. I-click ang **Admin** tab sa pangunahing navigation
3. Ang Server Admin panel ay may mga tab para sa pamamahala ng mga simbahan, user, at system operation

## User Impersonation

Ang impersonation feature ay nagbibigay-daan sa mga server admin na mag-log in bilang ibang user para sa suporta at troubleshooting na layunin. Ito ay kapaki-pakinabang kapag sinisiyasat ang mga isyu na inireport ng user o tumutulong sa mga simbahan na i-configure ang kanilang mga system.

### Paano Mag-impersonate ng User

1. Pumunta sa **Impersonate** tab sa Server Admin panel
2. Ipasok ang pangalan o email address ng user sa search field
3. I-click ang **Search** o pindutin ang Enter
4. Mula sa mga resulta ng paghahanap, i-click ang user na nais mong i-impersonate
5. Kumpirmahin ang impersonation sa dialog na lilitaw
6. Ikaw ay mala-log in bilang user na iyon at ire-redirect sa kanilang account

### Mahahalagang Tala

- Ang impersonation ay lumilikha ng bagong session na may mga pahintulot ng target user at access sa simbahan
- Ang iyong orihinal na admin session ay nagtatapos kapag nag-impersonate ka ng ibang user
- Ang lahat ng mga aksyon na ginawa habang naka-impersonate ay naka-log sa audit trail
- Upang bumalik sa iyong admin account, mag-log out at mag-log in muli gamit ang iyong mga kredensyal
- Gamitin ang impersonation lamang kapag kinakailangan para sa mga layunin ng suporta at palaging ipaalam sa mga user kapag naa-access ang kanilang mga account para sa suporta

### API Endpoint

Ang impersonation feature ay sinusuportahan ng `/users/:userId/impersonate` endpoint sa Membership API. Tingnan ang [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para sa mga teknikal na detalye.

### Mga Pagsasaalang-alang sa Seguridad

- Ang impersonation ay nangangailangan ng Server.Admin na pahintulot - ang pahintulot na ito ay dapat ibigay nang may pag-iingat at sa mga pinagkakatiwalaang platform operator lamang
- Ang lahat ng impersonation event ay naka-log na may admin user ID at target user ID
- Ang mga simbahan ay hindi naaabisuhan kapag nangyayari ang impersonation, kaya magtakda ng malinaw na mga patakaran para sa kung kailan at paano dapat gamitin ang feature na ito
- Isaalang-alang ang pag-dokumento ng mga impersonation event sa iyong support ticket system para sa accountability

## Mga Kaugnay na Pahina

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Permission model at JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — User at church management API
- [Audit Log](/docs/b1-admin/reports/audit-log) — Tingnan ang mga activity log para sa isang simbahan
