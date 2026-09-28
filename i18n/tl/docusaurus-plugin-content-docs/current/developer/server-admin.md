---
title: "Administrasyon ng Server"
---

# Administrasyon ng Server

<div class="article-intro">

Ang mga feature ng administrasyon ng server sa ChurchApps ay available lamang sa mga users na may **Server.Admin** permission. Ang mga tool na ito ay ginagamit para sa mga operasyon ng platform, suporta, at paghahanap ng problema sa lahat ng simbahan sa system.

</div>

:::warning Access Restricted
Ang mga feature na inilarawan sa pahinang ito ay nangangailangan ng **Server.Admin** permission at hindi available sa regular na mga administrator ng simbahan. Ang mga ito ay inilaan para sa mga operator ng platform at support staff lamang.
:::

## Pag-access sa Server Admin

Ang mga users na may Server.Admin permission ay maaaring mag-access sa server admin panel mula sa B1 Admin:

1. Mag-log in sa [admin.b1.church](https://admin.b1.church)
2. Buksan ang **Settings**, pagkatapos ay i-click ang **Server Admin** sa Settings menu. (Maaari rin kayong direktang pumunta sa `admin.b1.church/admin`.)
3. Ang Server Admin panel ay may mga seksyon para sa Churches, Users, Impersonate User, Background Jobs, Commons, Usage Trends, Translation Lookups, Server Health, at Database Migrations

## User Impersonation

Ang impersonation feature ay nagbibigay-daan sa mga server admins na mag-log in bilang ibang user para sa suporta at paghahanap ng problema. Ito ay kapaki-pakinabang kapag kino-investigate ang mga isyung ini-report ng user o tinutulungan ang mga simbahan na mag-configure ng kanilang mga sistema.

### Paano Mag-Impersonate ng isang User

1. Buksan ang **Impersonate User** section ng Server Admin panel
2. Ilagay ang pangalan o email address ng user sa search field
3. I-click ang **Search** o pindutin ang Enter
4. Mula sa search results, i-click ang user na gusto ninyong gumawa ng impersonation
5. Kumpirmahin ang impersonation sa dialog na lalabas
6. Kayo ay ma-log in bilang ang user na iyon at direkta sa kanilang account

### Mahalagang Mga Tala

- Ang impersonation ay lumilikha ng isang bagong session na may permissions at church access ng target user
- Ang inyong original na admin session ay nagtatapos kapag kayo ay nag-impersonate ng ibang user
- Ang lahat ng aksyon na ginawa habang naka-impersonate ay naka-log sa audit trail
- Upang bumalik sa inyong admin account, mag-log out at mag-log in muli gamit ang inyong credentials
- Gamitin ang impersonation lamang kapag kinakailangan para sa suporta at laging ipaalam sa mga users kung nag-access kayo ng kanilang mga account para sa suporta

### API Endpoint

Ang impersonation feature ay sinusuportahan ng `/users/:userId/impersonate` endpoint sa Membership API. Tingnan ang [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para sa mga teknikal na detalye.

### Mga Pag-iisip ng Seguridad

- Ang impersonation ay nangangailangan ng Server.Admin permission - ang permission na ito ay dapat ibigay ng kaunti at lamang sa mga trusted platform operators
- Ang lahat ng impersonation events ay naka-log na may admin user ID at target user ID
- Ang mga simbahan ay hindi noti-notify kapag nangyari ang impersonation, kaya magtakda ng malinaw na mga patakaran kung kailan at paano dapat gamitin ang feature na ito
- Isaalang-alang ang pag-document ng mga impersonation event sa inyong support ticket system para sa accountability

## Commons Moderation

Ang Commons ay ang shared moderation queue para sa user-submitted content sa lahat ng produkto — ang mga WorshipCommons songs, Lessons.church lessons, FreeShow templates, at B1 website builder templates ay lahat ay dumadaloy sa parehong queue sa halip na sa magkakahiwalay na per-product review tools.

### Pag-access sa Commons

1. Mag-navigate sa **Commons** tab sa Server Admin panel.
2. Makikita ninyo ang tatlong sub-tabs: **Queue**, **Reports**, at **Assets**.

Ang isang limited na **music editor** role ay maaari ding makita ang Queue tab, ngunit ay naharang mula sa pag-apruba ng mga submission na nagbabago ng mga karapatan o licensing ng isang kanta.

### Queue

Ang Queue ay naglalista ng bawat pending submission sa lahat ng produkto, filterable ng produkto at asset type. Bawat row ay nagpapakita kung ang submission ay isang bagong asset, isang edit ng orihinal na author, o isang edit ng third party, kasama ang approval track record ng submitter at kung gaano katagal ang submission ay naghihintay (flag once ito ay lampas 72 oras).

I-click ang **Review** upang magbukas ng drawer na may field-level diffs, file previews, at isang embedded read-only preview ng item. Gamitin ang **a**/**r** keyboard shortcuts upang mag-apruba o mag-reject, at **j**/**k** upang magpunta sa susunod o nakaraang submission nang hindi umaalis sa drawer. Ang pagtanggi ay nangangailangan ng pagpili ng dahilan (halimbawa quality, duplicate, licensing, ccli, ai, o off-topic) at isang tala.

### Reports

Ang Reports tab ay hinahawakan ang copyright at policy/quality reports na nakalagay laban sa already-published assets, na nahahati sa magkakahiwalay na Copyright at Policy & Other queues plus isang Resolved history. Gawin ang claim sa isang report upang magsimula ng paggawa nito, pagkatapos ay lutasin ito na may resolution (upheld, dismissed, o duplicate) at isang aksyon (none, unpublish, o remove).

### Assets

Ang Assets tab ay isang searchable na browser ng published content na may mga aksyon upang mag-**Feature** ng isang asset (nag-highlight nito sa home page ng produkto), mag-**Unpublish**/**Republish** nito, o **Remove** nito (na may copyright o policy na dahilan).

Para sa mga kanta partikular, ito ay kung saan din ang isang kanta ay nagiging **Sunday-ready** at eligible na lumitaw sa B1 Admin song search ng isang simbahan: ang isang reviewer ay nagbubukas ng asset at minarkahan ang bawat published key bilang **Listened** kapag nakinig na sila sa pamamagian nito at kumpirmahin ang score, chords, at slides ay lahat ay present. Ang isang kanta ay nagiging Sunday-ready lamang kapag ang bawat key ay naka-check off.

:::info
Ang Commons moderation ay staff-only — ang mga indibidwal na simbahan ay hindi kailanman nakikita ang queue na ito. Ang iisang lugar kung saan ang indibidwal na simbahan ng B1 Admin ay tumutugon sa Commons data ay ang "WorshipCommons — free" section ng [song search](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), na nag-surface lamang ng mga kanta na napalabas na sa prosesong pag-review na ito.
:::

Tingnan ang [Content Commons architecture](/docs/developer/architecture/commons) page para sa underlying data model at submission lifecycle.

## Group Email Approval

Ang mga simbahan ay hindi maaaring magpadala ng church-written email (group email, form follow-ups, workflow emails, at account invites) hanggang sa isang server admin ay nag-apruba. Ito ay nakaiwas sa bot-registered churches mula sa paggamit ng shared ChurchApps sending address para sa spam.

1. Buksan ang **Churches** tab sa Server Admin panel.
2. Bawat simbahan ay nagpapakita ng isang **Group Email** chip: **Approved** (berde) o **Not approved** (outlined).
3. I-click ang chip at kumpirmahin upang mag-apruba ng simbahan, o upang bawiin ang isang apruba.

Ang staff ng simbahan ay nagsasandig para sa apruba gamit ang **Request review** button sa Send Email dialog ng B1 Admin. Ang kahilingan ay ine-email sa support address at naglalista ng pangalan ng simbahan, ID, registration date, lokasyon, at sino ang nagtanong. Ang isang simbahan ay maaaring magpadala ng isang kahilingan bawat linggo. Tingnan ang [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) para sa daily allowance at ang automatic pause sa bounces at complaints.

## Database Migrations

Ang mga deploy ay hindi nagbabago ng database. Ang hosted databases ay tumatanggap lamang ng mga koneksyon mula sa loob ng Api's network, kaya pagkatapos ng isang release na nagdaragdag ng migration, ang isang server admin ay nag-apply nito mula sa **Database Migrations** tab. (Self-hosted Docker installs ay patuloy na tumatakbo ng mga migrations nang automatic kapag nagsimula ang Api container.)

Ang tab ay nagpapakita ng kasalukuyang kapaligiran at isang row bawat module (membership, attendance, giving, at iba pa) na may status nito, ang bilang ng applied at pending migrations, at ang huli na na-apply.

- **Run Pending Migrations** ay nag-apply ng bawat pending migration, isang module sa isang pagkakataon, sa order. Ito ay tumitigil sa unang pagkabigo at nagpapakita ng kung ano ang na-apply para sa bawat module.
- Ang isang module na minarkahan **No history** ay may database na nauna sa migration tracking. Ito ay hindi kailanman tumatakbo nang automatic, dahil iyon ay mao-replay ang mga lumang data migrations sa live tables. I-click ang **Check Schema** sa ganitong module sa halip. Ang Api ay inihahambing ang mga talahanayan, column, at indexes na ang bawat migration ay lumilikha na may live database at minarkahan ang bawat migration **Already applied**, **Missing**, **Partly applied**, o **Data only**. Walang binabago ng check.
- Sa check results, **Record as Already Applied** ay nagsusulat ng na-detect na mga migrations sa migration history nang hindi na tumatakbo. Ang mga missing ay nanatiling pending at maaaring pagkatapos ay tumatakbo nang normal.
- Ang isang **Partly applied** migration ay nagsasagwan. Kung ang migration ay ligtas na tumatakbo muli (basahin muna ito), i-tick ang **Re-run** kaya ito ay nanatiling pending at tumatakbo muli mula sa tuktok.

Ang Server Admin panel at ang CLI (`yarn migrate:up`) ay gumagamit ng parehong Kysely migrator at `kysely_migration` table, kaya palagi silang sumasang-ayon kung ano ang na-apply. Ang backing endpoints ay `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, at `POST .../:module/baseline`, lahat ay Server.Admin lamang.

## Mga Kaugnay na Pahina

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Permission model at JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — User at church management API
- [Audit Log](/docs/b1-admin/reports/audit-log) — Tingnan ang activity logs para sa isang simbahan
- [Content Commons Architecture](/docs/developer/architecture/commons) — Shared asset model at moderation lifecycle
