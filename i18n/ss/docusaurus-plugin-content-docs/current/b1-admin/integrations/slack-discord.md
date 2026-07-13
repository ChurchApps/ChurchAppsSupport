---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Tfumela sati lesifundzeka lula kusuka ku-B1 ngco kusigceme se-Slack nome se-Discord — bantfu labasha, iminikelo, kubhalisa kwemacembu, kutfunyelwa kwemafomu, imicimbi yekhalendari, nalokunye lokunyenti. Akukho akhawunti yephatsi lesitsatfu, akukho Zap lekumele uyigcine: i-B1 ihlela kabusha imicimbi ibayente imilayeto yenkulumo-mpendvulwano bese iyitfumela ngco ku-URL ye-webhook yesigceme.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Udzinga imvumo ye-**Edit Settings** ku-B1Admin
- Umphatsi ku-workspace yakho ye-Slack nome i-server yakho ye-Discord wekwakha i-Incoming Webhook yesigceme
- Nquma kutsi ufuna sati ku-siphi sigceme (ungasebentisa sigceme lesifanako kuluhlobo lwemicimbi lolunyenti, nome uwahlukanise ngetigceme)

</div>

## Kutsi Kusebenta Njani

I-B1 inaloko lokutiwa yi-**Connector Type** lesakhelwe ngekhatsi yetinkhundla tenkulumo-mpendvulwano. Nangabe wakha i-webhook loluhlobo lwayo lu-**Slack** nome i-**Discord**, injini ye-webhook isengasebenta ngendlela yayo yejwayelekile yekuletsa + kuzama kabusha + kucinisekisa nge-hedha lesayiniwe, kepha umtimba lewutfumelako uyahlelwa kabusha usuka kumthwalo wejwayelekile we-B1 we-`{event,churchId,data}` uye kumlayeto lomncane we-`{text}` (Slack) nome `{content}` (Discord) lokulindzelwe ngaletinkhonzo.

Akukho maseva e-B1 lafinyelela ku-Slack ngelibandla ngalinye ngaphandle komgudvu wewebhook wejwayelekile lophumako — akukho lokusha lokumele kuhostelwe, akukho lokwengetiwe lokumele kukhokhwe.

## Slack — Sinyatselo Ngesinyatselo

### 1. Tfola i-URL ye-Slack Incoming Webhook

1. Vula [api.slack.com/apps](https://api.slack.com/apps) ku-workspace ye-Slack lofuna sati kuyo.
2. Chofota **Create New App → From scratch**, uyicalise ngelifana "B1 Notifications", bese ukhetsa i-workspace.
3. Kunavigation lengasenshonalanga khetsa **Incoming Webhooks** bese uvula-vala **Activate Incoming Webhooks** kuyise ku-*On*.
4. Chofota **Add New Webhook to Workspace**, khetsa sigceme (sibonelo `#donations`), bese uchofote **Allow**.
5. I-Slack iyakubuyisela ekhasini ngeleyo **Webhook URL** lensha lebukeka njenge `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Yikhopishe — leyo yiyona ntfo yodwana ledzingekako ku-B1.

:::caution
Phatsa i-URL ye-Slack webhook njengemfihlo. Nome ngubani lonayo angatfumela imilayeto yakhe yodwana kusigceme. Nangabe wayidalula ngengoti, yakhe kabusha kusuka ekhasini le-Slack app (kwakha kabusha kushintja kuphela i-URL; hlela ku-B1 ihambisane nayo).
:::

### 2. Ixhume ku-B1Admin

1. Ku-B1Admin hamba uye ku **Settings → Developer → Webhooks**.
2. Chofota **New Webhook**.
3. Gcwalisa:
   - **Name** — lelifundzekako lula njenge "Donations → #donations". Licembu lakho kuphela loyakulibona.
   - **Connector Type** — khetsa **Slack**.
   - **Payload URL** — faka i-URL ye-Slack kusuka esinyatselweni 1.
   - **Events** — hlanganisa imicimbi lofuna ibe timilayeto. Kusigceme seminikelo, kuphela `donation.created`. Kusigceme se-#people, zama `person.created` ne `group.member.added`.
4. Chofota **Save**. Inkulumo ye-"Signing Secret" iyavela — ungayishiya ye-Slack (i-Slack ayihloli tisayino te-B1) bese uyivale.

### 3. Kuyihlola

Vula kabusha i-webhook kusuka kuluhlu bese uchofota **Send Test Event**. Ngekhatsi kwesekhondi lambili umlayeto lofana

> 💝 New donation: $50.00

uyavela kusigceme sakho se-Slack, bese umugca lomusha uvela kuthebulu ye-**Recent Deliveries** kulesikhala lesifanako lonesimo sesitsi `succeeded`. Sewucedzile.

## Discord — Sinyatselo Ngesinyatselo

### 1. Tfola i-URL ye-Discord Webhook

1. Ku-server yakho ye-Discord, kwelekela sigceme lofuna sati kuso bese uchofota **⚙ gear** (Edit Channel).
2. Vula **Integrations → Webhooks → New Webhook**.
3. Yinike ligama futsi (nangabe kukhetsiwe) sithombe, bese uchofote **Copy Webhook URL** — ibukeka njenge `https://discord.com/api/webhooks/123…/abc…`.

### 2. Ixhume ku-B1Admin

Kuyafana nemgudvu we-Slack ongentasi, ngaphandle kwekutsi kumele wehlele **Connector Type** kuyise ku-**Discord**. Faka i-URL ye-Discord ku-**Payload URL** bese ugcina.

:::tip
**Awudzingi** kwengeta `/slack` ekugcineni kwe-URL ye-Discord — i-B1 itfumela imithwalo yemvelo ye-Discord ye-`{content}`, hhayi lehambisana ne-Slack. Faka nje i-URL leyanikwe yi-Discord.
:::

### 3. Kuyihlola

Yinkhinobho lefanako ye-**Send Test Event** — i-Discord ikhombisa umlayeto kusigceme lesikhetsiwe bese logu lwekuletsa luyaguqula lube `succeeded`.

## Kutsi Timilayeto Tibukeka Njani

| Umcimbi | Sibonelo semlayeto |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Luhlu loluphelele luhlala ku-[webhook event catalog](/docs/developer/api/webhooks#event-catalog) — nome ngumuphi umcimbi lapho angahanjiswa ku-Slack/Discord.

## Sigceme Sinye Ngesihloko Sinye

Awudzingi kufaka yonkhe imicimbi endzaweni yinye. Emabandla lamanyenti akha emawebhuku lambalwa:

- Sigceme se-**#donations** lelalela kuphela `donation.created`
- Sigceme se-**#new-people** se `person.created` ne `group.member.added`
- Sigceme se-**#admin-alerts** setintfo letincane lokwenteka njenge `form.submission.created`

Akukho mkhawulo weinani lema-webhook nge libandla. Ngalinye lizimele — kususa nome kuvala linye akutsintsi lamanye.

## Kuhlola Kuletswa

Ithebulu ye-**Recent Deliveries** ye-webhook editor ikhombisa emazama langu-50 lagcina. Chofota umugca kubona umthwalo longco lowatfunyelwa kanye nemphendvulo leyabuya. Ku-connector ye-Slack umthwalo yi-`{"text":"💝 New donation: $50.00"}` — hhayi umthwalo lomvelo we `{event,churchId,...}` — ngobe i-B1 iyawuhlela kabusha ngaphambi kwekuwutfumela.

Nangabe kutsite kwehluleka (i-badge lebomvu `failed` nome `exhausted`), inkulumo ikhombisa simo se-HTTP kanye nemtimba wemphendvulo kuze ubone loko lokungatsandwanga yi-Slack nome i-Discord — imvamisa kuba liphutsa lekukhopisha/kunamathisela ku-URL.

## Kulungisa Tinkinga

- **Akukho mlayeto lovelako + simo sekuletsa `400`** — imvamisa i-Connector Type ihlelwe ibe **Standard** kepha i-URL yiyeSlack/Discord. I-Slack/Discord iyanqaba umthwalo lomvelo. Shintja i-dropdown ibe **Slack** nome **Discord** bese uphindze uhlola.
- **I-Webhook izicalisa yodwana** — ngemuva kwekwehluleka lokulandzelanako lokutsatfu i-B1 iyayivala i-webhook. Lungisa i-URL (nome uyishintje ku-Slack/Discord) bese uvula-vala **Active** kabusha.
- **Umlayeto uyefikile kepha ushoda ngemininingwane** — sonkhe sikhundla senkulumo-mpendvulwano sinemkhawulo webukhulu bemlayeto. Timilayeto te-B1 yimigca yinye ngekuhlelwa; kwesati lesibhalwe kabanti sebentisa i-[Zapier](./zapier) nome i-[Make](./make) kwakha umlayeto lopheleleko we-Slack ngekusebentisa ema-action awo eSlack.

## Kushintja Luhlobo Lwe-Connector Kamuva

Ungashintja i-Connector Type ku-webhook lesele ikhona — kusebenta ekuletsweni lokulandzelako. Nangabe ushintja kusuka ku-Slack uye ku-Standard, khomba i-URL endzaweni yakho ye-HTTPS bese imfihlo yekusayina lefanako (leyakhishwa ngesikhatsi lewebhook yakhiwa) icala kucinisekiswa njengemthwalo lomvelo.

## Bona Nako

- [Zapier](./zapier) — kwemisebenti lenetinyatselo letinyenti leyicalisiwe yimicimbi ye-B1
- [Make](./make) — sakhi sesento lesibonakalako
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — indlela lephelele yemthwalo + kusayina nangabe ngelinye lilanga ubhekisa i-webhook eserveni yakho
