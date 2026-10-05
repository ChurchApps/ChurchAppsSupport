---
title: "Server Administration"
---

# Server Administration

<div class="article-intro">

Ang mga feature ng server administration sa ChurchApps ay available lamang sa mga user na may **Server.Admin** permission. Ginagamit ang mga tool na ito para sa operasyon ng platform, suporta, at troubleshooting sa lahat ng simbahan sa sistema.

</div>

:::warning Limitado ang Access
Ang mga feature na inilalarawan sa pahinang ito ay nangangailangan ng **Server.Admin** permission at hindi available sa mga karaniwang church administrator. Nakalaan lamang ang mga ito para sa mga platform operator at support staff.
:::

## Pag-access sa Server Admin

Ang mga user na may Server.Admin permission ay maaaring mag-access ng server admin panel mula sa B1 Admin:

1. Mag-log in sa [admin.b1.church](https://admin.b1.church)
2. Buksan ang [Jump menu](../b1-admin/introduction.md#getting-around-with-the-jump-menu), i-expand ang **Settings**, at i-click ang **Server Admin**. (Maaari ka ring dumiretso sa `admin.b1.church/admin`.)
3. Ang Server Admin panel ay may mga seksyon para sa Churches, Users, Impersonate User, Background Jobs, Commons, Usage Trends, Translation Lookups, Server Health, at Database Migrations

## User Impersonation

Pinapayagan ng impersonation feature ang mga server admin na mag-log in bilang ibang user para sa suporta at troubleshooting. Kapaki-pakinabang ito kapag iniimbestigahan ang mga isyung iniulat ng user o tinutulungan ang mga simbahan na i-configure ang kanilang mga sistema.

### Paano mag-impersonate ng User

1. Buksan ang seksyong **Impersonate User** ng Server Admin panel
2. I-type ang pangalan o email address ng user sa search field
3. I-click ang **Search** o pindutin ang Enter
4. Mula sa mga resulta ng paghahanap, i-click ang user na gusto mong i-impersonate
5. Kumpirmahin ang impersonation sa dialog na lalabas
6. Mala-log in ka bilang user na iyon at ire-redirect sa kanyang account

### Mahahalagang Tala

- Gumagawa ang impersonation ng bagong session na may mga permission at access sa simbahan ng target na user
- Nagtatapos ang orihinal mong admin session kapag nag-impersonate ka ng ibang user
- Lahat ng aksyong ginawa habang naka-impersonate ay nilo-log sa audit trail
- Para bumalik sa iyong admin account, mag-log out at mag-log in muli gamit ang iyong mga credential
- Gamitin lamang ang impersonation kapag kinakailangan para sa suporta, at laging ipaalam sa mga user kapag ina-access ang kanilang account para sa suporta

### API Endpoint

Ang impersonation feature ay sinusuportahan ng `/users/:userId/impersonate` endpoint sa Membership API. Tingnan ang [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para sa mga teknikal na detalye.

### Mga Konsiderasyon sa Seguridad

- Nangangailangan ang impersonation ng Server.Admin permission - dapat itong ibigay nang mahigpit at sa mga pinagkakatiwalaang platform operator lamang
- Lahat ng impersonation event ay nilo-log kasama ang ID ng admin user at ID ng target na user
- Hindi inaabisuhan ang mga simbahan kapag may nangyaring impersonation, kaya magtakda ng malinaw na patakaran kung kailan at paano dapat gamitin ang feature na ito
- Isaalang-alang na itala ang mga impersonation event sa inyong support ticket system para sa pananagutan

## Commons Moderation

Ang Commons ay ang nakabahaging moderation queue para sa nilalamang isinumite ng mga user sa lahat ng produkto — ang mga kanta ng WorshipCommons, mga aralin ng Lessons.church, mga template ng FreeShow, at mga template ng B1 website builder ay lahat dumadaan sa iisang queue sa halip na magkakahiwalay na review tool bawat produkto.

### Pag-access sa Commons

1. Pumunta sa tab na **Commons** sa Server Admin panel.
2. Makikita mo ang tatlong sub-tab: **Queue**, **Reports**, at **Assets**.

Ang isang limitadong **music editor** na role ay nakakakita rin ng Queue tab, pero hindi pinapayagang mag-apruba ng mga submission na nagbabago sa rights o licensing ng isang kanta.

### Queue

Inililista ng Queue ang bawat nakabinbing submission sa lahat ng produkto, na maaaring i-filter ayon sa produkto at uri ng asset. Ipinapakita ng bawat row kung ang submission ay bagong asset, edit ng orihinal na may-akda, o edit ng ibang tao, kasama ang track record ng pag-apruba ng nagsumite at kung gaano na katagal naghihintay ang submission (minamarkahan kapag lumampas na ng 72 oras).

I-click ang **Review** para buksan ang drawer na may field-level diff, preview ng mga file, at naka-embed na read-only na preview ng item. Gamitin ang mga keyboard shortcut na **a**/**r** para mag-apruba o magtanggi, at **j**/**k** para lumipat sa susunod o nakaraang submission nang hindi umaalis sa drawer. Ang pagtanggi ay nangangailangan ng pagpili ng dahilan (halimbawa quality, duplicate, licensing, ccli, ai, o off-topic) at isang tala.

### Reports

Hinahawakan ng Reports tab ang mga ulat tungkol sa copyright at patakaran/kalidad laban sa mga assets na nailathala na, na hinati sa magkahiwalay na Copyright at Policy & Other na queue kasama ang kasaysayan ng Resolved. I-claim ang isang report para simulang trabahuhin ito, at pagkatapos ay lutasin ito gamit ang isang resolution (upheld, dismissed, o duplicate) at isang aksyon (none, unpublish, o remove).

### Assets

Ang Assets tab ay isang masasaliksik na browser ng mga nailathalang nilalaman na may mga aksyong **Feature** ng asset (ihaharap ito sa home page ng produkto), **Unpublish**/**Republish** nito, o **Remove** nito (na may dahilang copyright o patakaran).

Para sa mga kanta partikular, dito rin nagiging **Sunday-ready** ang isang kanta at karapat-dapat na lumabas sa song search ng B1 Admin ng isang simbahan: binubuksan ng reviewer ang asset at minamarkahan ang bawat nailathalang key bilang **Listened** kapag napakinggan na niya ito nang buo at nakumpirmang kumpleto ang score, chords, at slides. Ang kanta ay nagiging Sunday-ready lamang kapag na-check na ang bawat key.

:::info
Ang Commons moderation ay para lamang sa staff — hindi kailanman nakikita ng mga indibidwal na simbahan ang queue na ito. Ang tanging lugar kung saan nahahawakan ng B1 Admin ng isang simbahan ang data ng Commons ay ang seksyong "WorshipCommons — free" ng [song search](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), na nagpapakita lamang ng mga kantang dumaan na sa proseso ng review na ito.
:::

Tingnan ang pahina ng [Content Commons architecture](/docs/developer/architecture/commons) para sa pinagbabatayang data model at lifecycle ng submission.

## Pag-apruba ng Group Email

Hindi makapagpapadala ang mga simbahan ng email na isinulat ng simbahan (group email, form follow-up, workflow email, at account invite) hangga't hindi sila inaaprubahan ng server admin. Pinipigilan nito ang mga simbahang nirehistro ng bot na gamitin ang nakabahaging sending address ng ChurchApps para sa spam.

1. Buksan ang tab na **Churches** sa Server Admin panel.
2. Ang bawat simbahan ay may **Group Email** chip: **Approved** (berde) o **Not approved** (may outline).
3. I-click ang chip at kumpirmahin para aprubahan ang simbahan, o para bawiin ang pag-apruba.

Humihingi ng pag-apruba ang staff ng simbahan gamit ang button na **Request review** sa Send Email dialog ng B1 Admin. Ipinapadala ang request sa email ng support address at inililista ang pangalan ng simbahan, ID, petsa ng pagpaparehistro, lokasyon, at kung sino ang humiling. Maaaring magpadala ang isang simbahan ng isang request bawat linggo. Tingnan ang [Mga limitasyon sa email na isinulat ng simbahan](/docs/developer/architecture/notifications#church-authored-email-limits) para sa pang-araw-araw na allowance at awtomatikong pag-pause kapag may bounce at reklamo.

## Database Migrations

Hindi binabago ng mga deploy ang database. Ang mga naka-host na database ay tumatanggap lamang ng koneksyon mula sa loob ng network ng Api, kaya pagkatapos ng release na nagdaragdag ng migration, ia-apply ito ng server admin mula sa tab na **Database Migrations**. (Ang mga self-hosted na Docker install ay awtomatiko pa ring nagpapatakbo ng mga migration kapag nagsimula ang Api container.)

Ipinapakita ng tab ang kasalukuyang environment at isang row bawat module (membership, attendance, giving, at iba pa) na may status nito, ang bilang ng na-apply at nakabinbing migration, at ang huling na-apply.

- Ina-apply ng **Run Pending Migrations** ang bawat nakabinbing migration, isang module bawat pagkakataon, nang sunud-sunod. Humihinto ito sa unang pagkabigo at ipinapakita kung ano ang na-apply sa bawat module.
- Ang module na may markang **No history** ay may database na mas matanda pa sa migration tracking. Hindi ito kailanman awtomatikong pinapatakbo, dahil ibabalik nito ang mga lumang data migration sa mga live na table. I-click na lang ang **Check Schema** sa module na iyon. Ikinukumpara ng Api ang mga table, column, at index na ginagawa ng bawat migration sa live na database at minamarkahan ang bawat migration bilang **Already applied**, **Missing**, **Partly applied**, o **Data only**. Walang nababago ang check.
- Sa mga resulta ng check, ang **Record as Already Applied** ay isinusulat ang mga natukoy na migration sa migration history nang hindi pinapatakbo ang mga ito (pagkatapos ng kumpirmasyon). Lahat hanggang sa huling **Already applied** na migration ay itinatala, kasama ang mga **Data only** sa saklaw na iyon; ang mga **Missing** ay nananatiling nakabinbin at maaari nang patakbuhin nang normal gamit ang **Run Pending Migrations**.
- Ang **Partly applied** na migration ay humaharang sa pagtatala. Kung ligtas na patakbuhin muli ang migration (basahin muna ito), lagyan ng tsek ang **Re-run** para manatili itong nakabinbin at tumakbong muli mula sa simula.

Ang Server Admin panel at ang CLI (`yarn migrate:up`) ay gumagamit ng parehong Kysely migrator at `kysely_migration` table, kaya laging magkatugma ang tingin nila sa kung ano ang na-apply. Ang mga endpoint na sumusuporta rito ay `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, at `POST .../:module/baseline`, na lahat ay Server.Admin lamang.

## Mga Kaugnay na Pahina

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Permission model at JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API para sa pamamahala ng user at simbahan
- [Audit Log](/docs/b1-admin/reports/audit-log) — Tingnan ang mga activity log ng isang simbahan
- [Content Commons Architecture](/docs/developer/architecture/commons) — Nakabahaging asset model at lifecycle ng moderation
