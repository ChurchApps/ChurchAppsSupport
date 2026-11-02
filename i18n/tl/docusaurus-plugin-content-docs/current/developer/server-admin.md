---
title: "Pangangasiwa ng Server"
---

# Pangangasiwa ng Server

<div class="article-intro">

Ang mga feature ng pangangasiwa ng server sa ChurchApps ay available lang sa mga user na may permisong **Server.Admin**. Ginagamit ang mga kasangkapang ito para sa operasyon ng platform, suporta, at troubleshooting sa lahat ng simbahan sa sistema.

</div>

:::warning Limitado ang Access
Ang mga feature na inilalarawan sa pahinang ito ay nangangailangan ng permisong **Server.Admin** at hindi available sa karaniwang church administrator. Para lang ito sa mga operator ng platform at staff ng suporta.
:::

## Pag-access sa Server Admin

Maaaring i-access ng mga user na may permisong Server.Admin ang server admin panel mula sa B1 Admin:

1. Mag-log in sa [admin.b1.church](https://admin.b1.church)
2. Buksan ang [Jump menu](../b1-admin/introduction.md#getting-around-with-the-jump-menu), palawakin ang **Settings**, at i-click ang **Server Admin**. (Maaari ka ring dumiretso sa `admin.b1.church/admin`.)
3. Inililista ng Server Admin panel ang mga seksyon nito sa kaliwa sa tatlong grupo: **Directory** (Churches, Users, Impersonate User), **Operations** (Background Jobs, Commons, Usage Trends), at **System** (Translation Lookups, Server Health, Database Migrations)

## Pag-reset ng Two-Factor Sign-In

Kung naka-on ang [two-factor sign-in](../b1-admin/profile/managing-profile.md#two-factor-sign-in) ng isang user at nawala na niya ang telepono at ang backup code, maaaring i-off ito ng server admin:

1. Buksan ang seksyong **Users** ng Server Admin panel at hanapin ang user.
2. Ang mga user na may two-factor sign-in ay nagpapakita ng badge na **Two-factor on**. I-click ang **Reset 2FA** sa tabi nito.
3. Kumpirmahin ang prompt. Gawin lang ito pagkatapos mong makumpirma kung sino ang kausap mo.

Maaari nang mag-log in ang user gamit lang ang kanyang password at i-set up ulit ang two-factor sign-in mula sa kanyang profile. Naitatala sa audit log bilang `mfa_reset` ang mga reset. Ang endpoint ay `POST /membership/users/mfa/reset/:userId` at nangangailangan ng Server.Admin.

## User Impersonation

Pinapayagan ng feature na impersonation ang mga server admin na mag-log in bilang ibang user para sa suporta at troubleshooting. Kapaki-pakinabang ito kapag nag-iimbestiga ng isyung iniulat ng user o tumutulong sa mga simbahan na i-configure ang kanilang sistema.

### Paano I-impersonate ang User

1. Buksan ang seksyong **Impersonate User** ng Server Admin panel
2. Ilagay ang pangalan o email address ng user sa search field
3. I-click ang **Search** o pindutin ang Enter
4. Mula sa mga resulta ng paghahanap, i-click ang user na gusto mong i-impersonate
5. Kumpirmahin ang impersonation sa dialog na lilitaw
6. Made-log in ka bilang user na iyon at ire-redirect sa kanyang account

### Mahahalagang Paalala

- Gumagawa ang impersonation ng bagong session na may mga permiso at access sa simbahan ng target na user
- Nagtatapos ang orihinal mong admin session kapag nag-impersonate ka ng ibang user
- Lahat ng aksyong gagawin habang naka-impersonate ay naitatala sa audit trail
- Para bumalik sa iyong admin account, mag-log out at mag-log in ulit gamit ang iyong mga kredensyal
- Gamitin ang impersonation lang kung kinakailangan para sa suporta, at laging ipaalam sa mga user kapag ina-access ang kanilang account para sa suporta

### API Endpoint

Sinusuportahan ng feature na impersonation ang endpoint na `/users/:userId/impersonate` sa Membership API. Tingnan ang [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para sa mga teknikal na detalye.

### Mga Konsiderasyon sa Seguridad

- Nangangailangan ng permisong Server.Admin ang impersonation -- ibigay lang ang permisong ito nang matipid at sa mga pinagkakatiwalaang operator ng platform
- Naitatala ang lahat ng pangyayari ng impersonation kasama ang ID ng admin user at ID ng target user
- Hindi inaabisuhan ang mga simbahan kapag nangyari ang impersonation, kaya magtatag ng malinaw na patakaran kung kailan at paano gagamitin ang feature na ito
- Isaalang-alang ang pagdodokumento ng mga pangyayari ng impersonation sa iyong support ticket system para sa pananagutan

## Commons Moderation

Ang Commons ang shared na moderation queue para sa content na isinumite ng mga user sa iba't ibang produkto -- ang mga awit ng WorshipCommons, mga aralin ng Lessons.church, mga template ng FreeShow, at mga template ng website builder ng B1 ay dumadaan lahat sa parehong queue sa halip na sa hiwalay na per-product na review tool.

### Pag-access sa Commons

1. Pumunta sa tab na **Commons** sa Server Admin panel.
2. Makikita mo ang tatlong sub-tab: **Queue**, **Reports**, at **Assets**.

Maaari ring makita ng limitadong role na **music editor** ang tab na Queue, pero hinaharangan ito sa pag-apruba ng mga isinumiteng nagbabago ng mga karapatan o lisensya ng awit.

### Queue

Inililista ng Queue ang bawat nakabinbing isinumite sa lahat ng produkto, na maaaring i-filter ayon sa produkto at uri ng asset. Ipinapakita ng bawat row kung ang isinumite ay bagong asset, pag-edit ng orihinal nitong may-akda, o pag-edit ng third party, kasama ang track record ng approval ng nagsumite at kung gaano na katagal naghihintay ang isinumite (minamarkahan kapag lumampas na sa 72 oras).

I-click ang **Review** para buksan ang drawer na may field-level na diff, preview ng file, at naka-embed na read-only na preview ng item. Gamitin ang mga keyboard shortcut na **a**/**r** para mag-approve o mag-reject, at **j**/**k** para lumipat sa susunod o nakaraang isinumite nang hindi umaalis sa drawer. Ang pag-reject ay nangangailangan ng pagpili ng dahilan (halimbawa quality, duplicate, licensing, ccli, ai, o off-topic) at isang note.

### Reports

Hinahawakan ng tab na Reports ang mga ulat ng copyright at policy/quality na isinampa laban sa mga na-publish nang asset, na hinati sa magkahiwalay na pila ng Copyright at Policy & Other, kasama ang kasaysayang Resolved. I-claim ang isang ulat para simulang asikasuhin ito, pagkatapos i-resolve ito gamit ang isang resolution (upheld, dismissed, o duplicate) at isang action (none, unpublish, o remove).

### Assets

Ang tab na Assets ay isang nahahanap na browser ng na-publish na content na may mga aksyong **Feature** ng isang asset (itinatampok ito sa home page ng produkto), **Unpublish**/**Republish** ito, o **Remove** ito (may copyright o policy na dahilan).

Para sa mga awit partikular, dito rin nagiging **Sunday-ready** ang isang awit at karapat-dapat lumitaw sa paghahanap ng awit sa B1 Admin ng isang simbahan: binubuksan ng reviewer ang asset at minamarkahan ang bawat na-publish na key bilang **Listened** kapag napakinggan na niya ito at nakumpirma na naroon ang score, chords, at slides. Nagiging Sunday-ready lang ang isang awit kapag na-check off na ang bawat key.

:::info
Para sa staff lang ang moderation ng Commons -- hindi kailanman nakikita ng mga indibidwal na simbahan ang queue na ito. Ang tanging lugar kung saan hinahawakan ng B1 Admin ng isang indibidwal na simbahan ang datos ng Commons ay ang seksyong "WorshipCommons — free" ng [paghahanap ng awit](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), na nagpapakita lang ng mga awit na dumaan na sa prosesong ito ng review.
:::

Tingnan ang pahinang [Content Commons architecture](/docs/developer/architecture/commons) para sa pinagbabatayang data model at lifecycle ng isinumite.

## Group Email Approval

Hindi maaaring magpadala ang mga simbahan ng email na sinulat ng simbahan (group email, follow-up ng form, workflow email, at imbitasyon ng account) hangga't hindi ito inaaprubahan ng server admin. Pinipigilan nito ang mga simbahang nairehistro ng bot na gamitin ang shared na sending address ng ChurchApps para sa spam.

1. Buksan ang tab na **Churches** sa Server Admin panel.
2. Bawat simbahan ay nagpapakita ng chip na **Group Email**: **Approved** (berde) o **Not approved** (naka-outline).
3. I-click ang chip at kumpirmahin para aprubahan ang simbahan, o bawiin ang approval.

Humihiling ng approval ang staff ng simbahan gamit ang butones na **Request review** sa Send Email dialog ng B1 Admin. Ipinapadala ang request sa support address at inililista ang pangalan ng simbahan, ID, petsa ng registration, lokasyon, at kung sino ang humiling. Isang request kada linggo ang maaaring ipadala ng simbahan. Tingnan ang [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) para sa araw-araw na allowance at sa awtomatikong pag-pause dahil sa bounce at reklamo.

## Database Migrations {#database-migrations}

Ang workflow na **Deploy Prod** ang mismong nag-a-apply ng mga nakabinbing migration. Tanging mula sa loob ng network ng Api lang maaabot ang mga hosted database, kaya hindi ito maaabot ng GitHub runner; sa halip, kaagad pagkatapos ng `serverless deploy`, tinatawag ng workflow ang `migrate` Lambda ng Api (`api-Prod-migrate`), na nagpapatakbo ng bawat nakabinbing migration ng bawat module gamit ang parehong runner ng tab na ito at nabibigo ang deploy kung may module na nag-error o tinanggihan. Ibinabalik lang ng **Rollback Prod** ang code ng Lambda; nananatiling applied ang mga na-apply nang migration. Ang tab na **Database Migrations** ay para sa pagsuri ng status, pagpapatakbo ng anumang hindi ginawa ng deploy (halimbawa sa demo environment, na hindi nagmi-migrate sa deploy nito), at pag-baseline ng mga module na walang kasaysayan. (Ang mga self-hosted na Docker install ay awtomatiko pa ring nagpapatakbo ng migration kapag nagsimula ang container ng Api.)

Ipinapakita ng tab ang kasalukuyang environment at isang row bawat module (membership, attendance, giving, at iba pa) kasama ang status nito, bilang ng na-apply at nakabinbing migration, at ang huling na-apply.

- Ina-apply ng **Run Pending Migrations** ang bawat nakabinbing migration, isang module sa isang pagkakataon, sa pagkakasunod-sunod. Humihinto ito sa unang pagkabigo at ipinapakita kung ano ang na-apply sa bawat module.
- Ang module na minarkahang **No history** ay may database na nauna sa pagsubaybay ng migration. Hindi ito kailanman awtomatikong tinatakbo, dahil mare-replay lang nito ang mga lumang data migration sa mga live na table. I-click ang **Check Schema** sa module na iyon sa halip. Inihahambing ng Api ang mga table, column, at index na ginagawa ng bawat migration sa live na database at minamarkahan ang bawat migration bilang **Already applied**, **Missing**, **Partly applied**, o **Data only**. Walang binabago ang check.
- Sa mga resulta ng check, isinusulat ng **Record as Already Applied** ang mga natuklasang migration sa kasaysayan ng migration nang hindi tinatakbo ang mga ito (pagkatapos ng kumpirmasyon). Lahat ng hanggang sa huling **Already applied** na migration ay naitatala, kasama ang mga **Data only** sa saklaw na iyon; ang mga **Missing** ay nananatiling nakabinbin at maaaring patakbuhin nang normal gamit ang **Run Pending Migrations**.
- Ang migration na **Partly applied** ay humaharang sa pag-record. Kung ligtas itong patakbuhin muli (basahin muna ito), lagyan ng check ang **Re-run** para manatiling nakabinbin at tumakbo muli mula sa simula.

Gumagamit ang Server Admin panel at ang CLI (`yarn migrate:up`) ng parehong Kysely migrator at `kysely_migration` table, kaya laging nagkakasundo ang mga ito sa kung ano ang na-apply na. Ang mga endpoint sa likod nito ay `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, at `POST .../:module/baseline`, lahat ay para sa Server.Admin lamang.

## Mga Kaugnay na Pahina

- [Authentication at Permissions](/docs/developer/api/endpoints/authentication) -- Modelo ng permiso at JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) -- API para sa pamamahala ng user at simbahan
- [Audit Log](/docs/b1-admin/reports/audit-log) -- Tingnan ang mga log ng aktibidad para sa isang simbahan
- [Content Commons Architecture](/docs/developer/architecture/commons) -- Shared na asset model at lifecycle ng moderation
