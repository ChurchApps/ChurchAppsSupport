---
title: "Pangangasiwa ng Server"
---

# Pangangasiwa ng Server

<div class="article-intro">

Ang mga feature sa pangangasiwa ng server sa ChurchApps ay available lamang sa mga user na may permiso na **Server.Admin**. Ginagamit ang mga tool na ito para sa operasyon ng platform, suporta, at troubleshooting sa lahat ng simbahan sa system.

</div>

:::warning Limitadong Access
Ang mga feature na inilalarawan sa pahinang ito ay nangangailangan ng permiso na **Server.Admin** at hindi available sa mga regular na church administrator. Para lamang ang mga ito sa mga platform operator at support staff.
:::

## Pag-access sa Server Admin

Maaaring i-access ng mga user na may permiso na Server.Admin ang server admin panel mula sa B1 Admin:

1. Mag-log in sa [admin.b1.church](https://admin.b1.church)
2. Buksan ang [Jump menu](../b1-admin/introduction.md#getting-around-with-the-jump-menu), i-expand ang **Mga Setting**, at i-click ang **Server Admin**. (Maaari ka ring direktang pumunta sa `admin.b1.church/admin`.)
3. Nakalista ang mga seksyon ng Server Admin panel sa kaliwang bahagi sa tatlong grupo: **Directory** (Churches, Users, Impersonate User), **Mga Operasyon** (Background Jobs, Commons, Usage Trends), at **System** (Translation Lookups, Server Health, Database Migrations)

## User Impersonation

Pinapayagan ng feature na impersonation ang mga server admin na mag-log in bilang ibang user para sa suporta at troubleshooting. Kapaki-pakinabang ito kapag iniimbestigahan ang mga isyung iniulat ng user o tumutulong sa mga simbahan sa pag-configure ng kanilang system.

### Paano I-impersonate ang User

1. Buksan ang seksyong **I-impersonate ang User** ng Server Admin panel
2. Ilagay ang pangalan o email address ng user sa search field
3. I-click ang **Maghanap** o pindutin ang Enter
4. Mula sa mga resulta ng search, i-click ang user na gusto mong i-impersonate
5. Kumpirmahin ang impersonation sa dialog na lalabas
6. Mag-log in ka bilang user na iyon at ire-redirect sa kanyang account

### Mahahalagang Paalala

- Ang impersonation ay gumagawa ng bagong session na may permiso at access sa simbahan ng target na user
- Magtatapos ang orihinal mong admin session kapag nag-impersonate ka ng ibang user
- Lahat ng aksyong ginawa habang naka-impersonate ay naitatala sa audit trail
- Para bumalik sa iyong admin account, mag-log out at mag-log in muli gamit ang iyong credentials
- Gamitin lamang ang impersonation kapag kinakailangan para sa suporta, at laging ipaalam sa mga user kapag ina-access ang kanilang account para sa suporta

### API Endpoint

Ang feature na impersonation ay nakabatay sa endpoint na `/users/:userId/impersonate` sa Membership API. Tingnan ang [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para sa mga teknikal na detalye.

### Mga Konsiderasyon sa Seguridad

- Kailangan ng impersonation ang permiso na Server.Admin -- ibigay lamang ang permisong ito nang matipid at sa mga pinagkakatiwalaang platform operator
- Lahat ng impersonation event ay naitatala kasama ang admin user ID at target user ID
- Hindi inaabisuhan ang mga simbahan kapag nangyari ang impersonation, kaya magtatag ng malinaw na patakaran kung kailan at paano gagamitin ang feature na ito
- Isaalang-alang ang pagdodokumento ng mga impersonation event sa iyong support ticket system para sa accountability

## Commons Moderation

Ang Commons ang shared moderation queue para sa content na isinumite ng user sa iba't ibang produkto -- ang mga kanta ng WorshipCommons, lesson ng Lessons.church, template ng FreeShow, at template ng B1 website builder ay dumadaan lahat sa iisang queue sa halip na magkakahiwalay na review tool sa bawat produkto.

### Pag-access sa Commons

1. Pumunta sa tab na **Commons** sa Server Admin panel.
2. Makikita mo ang tatlong sub-tab: **Queue**, **Mga Ulat**, at **Mga Asset**.

Makakakita rin ng Queue tab ang isang limitadong role na **tagapag-edit ng musika**, ngunit hindi nito maaaprubahan ang mga submission na nagbabago sa rights o licensing ng isang kanta.

### Queue

Ipinapakita ng Queue ang bawat nakabinbing submission sa lahat ng produkto, na maaaring i-filter ayon sa produkto at uri ng asset. Ipinapakita ng bawat row kung ang submission ay bagong asset, edit ng orihinal na may-akda, o edit ng third party, kasama ang track record ng pag-apruba ng nagsumite at kung gaano katagal na itong naghihintay (may flag kapag lumampas na sa 72 oras).

I-click ang **Suriin** para buksan ang drawer na may field-level diff, file preview, at naka-embed na read-only preview ng item. Gamitin ang mga keyboard shortcut na **a**/**r** para mag-approve o mag-reject, at **j**/**k** para lumipat sa susunod o nakaraang submission nang hindi umaalis sa drawer. Kapag nag-reject, kailangan pumili ng dahilan (halimbawa quality, duplicate, licensing, ccli, ai, o off-topic) at maglagay ng tala.

### Reports

Hinahawakan ng Reports tab ang mga copyright at policy/quality report na isinampa laban sa mga asset na nai-publish na. Hiwalay ang mga ito sa Copyright at Policy & Other queue, kasama ang Resolved history. I-claim ang isang report para simulan ang pag-aasikaso nito, pagkatapos ay i-resolve ito gamit ang resolution (upheld, dismissed, o duplicate) at action (none, unpublish, o remove).

### Assets

Ang Assets tab ay isang searchable na browser ng nai-publish na content, na may mga aksyon na **I-feature** sa isang asset (itinatampok ito sa home page ng produkto), **I-unpublish**/**I-republish** dito, o **Alisin** dito (may dahilan na copyright o policy).

Para sa mga kanta, dito rin nagiging **Handa para sa Linggo** ang isang kanta at nagiging karapat-dapat na lumabas sa song search ng B1 Admin ng isang simbahan: binubuksan ng reviewer ang asset at minamarkahan ang bawat nai-publish na key bilang **Napakinggan** kapag napakinggan na niya ito at nakumpirma na kumpleto ang score, chords, at slides. Nagiging Sunday-ready lamang ang isang kanta kapag na-check na ang bawat key.

:::info
Ang moderation ng Commons ay para lamang sa staff -- hindi nakikita ng mga indibidwal na simbahan ang queue na ito. Ang tanging lugar kung saan hinahawakan ng B1 Admin ng isang simbahan ang data ng Commons ay ang seksyong "WorshipCommons -- free" ng [song search](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), na nagpapakita lamang ng mga kanta na dumaan na sa review na ito.
:::

Tingnan ang pahina ng [Content Commons architecture](/docs/developer/architecture/commons) para sa underlying data model at submission lifecycle.

## Group Email Approval

Hindi makakapagpadala ang mga simbahan ng email na sila mismo ang sumulat (group email, follow-up ng form, workflow email, at account invite) hangga't hindi ito inaaprubahan ng isang server admin. Pinipigilan nito na gamitin ng mga simbahang nakarehistro ng bot ang shared na sending address ng ChurchApps para sa spam.

1. Buksan ang tab na **Mga Simbahan** sa Server Admin panel.
2. Ang bawat simbahan ay may chip na **Group Email**: **Aprubado** (berde) o **Hindi aprubado** (naka-outline).
3. I-click ang chip at kumpirmahin para aprubahan ang simbahan, o para bawiin ang pag-apruba.

Humihiling ng pag-apruba ang staff ng simbahan gamit ang button na **Humiling ng review** sa Send Email dialog ng B1 Admin. Ipinapadala ang kahilingan sa support address at nakalista rito ang pangalan ng simbahan, ID, petsa ng pagrehistro, lokasyon, at kung sino ang humiling. Maaaring magpadala ang isang simbahan ng isang kahilingan kada linggo. Tingnan ang [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) para sa araw-araw na limitasyon at sa awtomatikong pag-pause kapag may bounce at reklamo.

## Database Migrations

Ang workflow na **Deploy Prod** mismo ang nag-a-apply ng mga nakabinbing migration. Hindi ma-access ng GitHub runner ang mga hosted database dahil tumatanggap lamang ang mga ito ng koneksyon mula sa loob ng network ng Api, kaya sa halip, kaagad pagkatapos ng `serverless deploy`, tinatawag ng workflow ang `migrate` Lambda ng Api (`api-Prod-migrate`), na nagpapatakbo ng mga nakabinbing migration ng bawat module gamit ang parehong runner ng tab na ito, at nabibigo ang deploy kung may anumang module na mag-error o tanggihan. Ang **Rollback Prod** ay nagbabalik lamang ng code ng Lambda; mananatiling na-apply ang mga na-apply nang migration. Ang tab na **Mga Database Migration** ay para sa pagtingin ng status, pagpapatakbo ng anumang hindi nagawa ng deploy (halimbawa sa demo environment, na hindi nagma-migrate sa deploy nito), at pag-baseline ng mga module na walang history. (Awtomatikong nagpapatakbo pa rin ng migration ang mga self-hosted na Docker install kapag nagsimula ang Api container.)

Ipinapakita ng tab ang kasalukuyang environment at isang row bawat module (membership, attendance, giving, at iba pa) kasama ang status nito, bilang ng na-apply at nakabinbing migration, at ang huling na-apply.

- Ina-apply ng **Patakbuhin ang mga Nakabinbing Migration** ang bawat nakabinbing migration, isang module sa bawat pagkakataon, ayon sa pagkakasunod-sunod. Humihinto ito sa unang pagkabigo at ipinapakita kung ano ang na-apply sa bawat module.
- Ang module na may markang **Walang history** ay may database na nauna pa sa migration tracking. Hindi ito kailanman pinapatakbo nang awtomatiko, dahil magre-replay iyon ng mga lumang data migration sa mga live table. I-click ang **I-check ang Schema** sa module na iyon sa halip. Ikinukumpara ng Api ang mga table, column, at index na ginagawa ng bawat migration sa live database at minamarkahan ang bawat migration bilang **Na-apply na**, **Nawawala**, **Bahagyang na-apply**, o **Data lamang**. Walang binabago ang check.
- Sa mga resulta ng check, ang **I-record bilang Na-apply na** ay nagsusulat ng mga natukoy na migration sa migration history nang hindi pinapatakbo ang mga ito (pagkatapos ng kumpirmasyon). Naitatala ang lahat hanggang sa huling migration na **Na-apply na**, kasama ang mga **Data lamang** sa saklaw na iyon; ang mga **Nawawala** ay nananatiling nakabinbin at maaari nang patakbuhin nang normal gamit ang **Patakbuhin ang mga Nakabinbing Migration**.
- Hindi pinapayagan ng isang **Bahagyang na-apply** na migration ang pagre-record. Kung ligtas itong patakbuhin muli (basahin muna ito), lagyan ng tsek ang **I-re-run** para manatiling nakabinbin ito at tumakbo muli mula sa simula.

Ang Server Admin panel at ang CLI (`yarn migrate:up`) ay gumagamit ng parehong Kysely migrator at `kysely_migration` table, kaya palagi silang nagkakasundo kung ano ang na-apply na. Ang mga backing endpoint ay `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, at `POST .../:module/baseline`, lahat ay para lamang sa Server.Admin.

## Mga Kaugnay na Pahina

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) -- Permission model at JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) -- User and church management API
- [Audit Log](/docs/b1-admin/reports/audit-log) -- Tingnan ang activity log ng isang simbahan
- [Content Commons Architecture](/docs/developer/architecture/commons) -- Shared asset model at moderation lifecycle
