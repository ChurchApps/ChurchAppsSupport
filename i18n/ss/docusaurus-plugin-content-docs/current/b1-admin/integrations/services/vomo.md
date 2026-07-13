---
title: "VOMO"
---

# VOMO

<div class="article-intro">

I-VOMO yinkundla yekubandzakanya bavolontiya — bantfu babhalisela emaphrojekthi, bangene ku-kiosk, futsi baqoqe emahora. Nangabe usebentisa i-VOMO yekuhlelwa kwebavolontiya kodvwa B1 yemarekhodi yebantfu, i-Zapier ingafanisa bulunga nekungena emkatsini wato kuze kungabikho luhlangotsi loluhlehlako.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[VOMO](https://vomo.org) lenehlelo leliveza i-Zapier (hlola nekusekelwa kwe-VOMO nangabe awucinisekile)
- I-akhawunti ye-[Zapier](https://zapier.com)
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo**

</div>

## Loko Lokungachumaniswa

App ye-Zapier ye-VOMO iveza tisicalisi letine letisheshako nemasento lamane. Tinseluleko letifunwa emabandla lamanyenti:

| Luhlangotsi | Sicalisi | Sento |
|---|---|---|
| VOMO → B1 | Bulunga be-VOMO (bumkhiwe) | B1: Tfola Umuntfu → Kwakha Umuntfu (nangabe musha) |
| VOMO → B1 | Kungena kwe-VOMO Kiosk | B1: Engeta Lilunga Lelicembu kulicembu le "Currently Serving", nobe rekhoda njengekuya |
| B1 → VOMO | B1 `person.created` | VOMO: Tfola Umhleli (nge-imeyili); nobe sinyatselo lesenteliwe ngekwesibopho |
| Kunoma yikuphi | Kubandzakanya kwe-VOMO (kubhaliswa) | B1: Engeta Lilunga Lelicembu kulicembu lelicondzene neprojekthi |

Tento te-VOMO tivalelwe ku **kudweba emaphrojekthi** ne **kutfola** bahleli/emaphrojekthi lakhona namuhla — akukho sento se-"faka lo muntfu ku phrojekthi ye-VOMO" lamuhla. Kuchumana lokuinteresile kanyenti yi-VOMO → B1.

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

**Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**. Timvumo:

- `people:read`, `people:write` — kutfola nekwakha bavolontiya njengebantfu be-B1
- `groups:write` — kubafaka emacenjini emacembu ekukhonta
- (Lokungakhetsakala) `attendance:write` nangabe uphatsa kungena kwe-kiosk njengekuya

### 2. Yakha i-Zap yekufanisa bulunga

1. **Sicalisi** — VOMO: Bulunga (umcimbi = `created`).
2. **Sento** — B1.church: Tfola Umuntfu, kufaniswa nge-imeyili.
3. **Sihlungi / Indlela** — yehlukanisa utfolakele naye ngatfolakali:
   - Akatfolakalanga → B1.church: Kwakha Umuntfu, bese Engeta Lilunga Lelicembu kulicembu lelifanele lebavolontiya.
   - Utfolakele → B1.church: Engeta Lilunga Lelicembu ngalokuchubekako.
4. Vula. Bavolontiya labasha be-VOMO manje bavela ku-B1 nebulunga belicembu lelifanele.

### 3. (Lokungakhetsakala) Yakha i-Zap yekungena kwe-kiosk

1. **Sicalisi** — VOMO: Kiosk
2. **Sento** — B1.church: Tfola Umuntfu (nge-imeyili)
3. **Sento** — khetsa lokufunako:
   - *Nangabe uyiphatsa njengekuya* — Webhooks by Zapier POST kundzawo ye-B1 ye `/attendance/visits` (i-app ye-Zapier ye-B1 ayikanaso sento se *Record Attendance* saveleleko). Sikhiya se-API se-B1 [(API key)](/docs/developer/api/api-keys) sifaka kuheda le `Authorization: Bearer cak_…`.
   - *Nangabe uyiphatsa njengebulunga belicembu* — B1.church: Engeta Lilunga Lelicembu nelicembu le "Currently Serving (Today)", bese lenye Zap ngemuva kwelilanga ibasusa ngekucocwa lokuhlelwe.

## Tinseluleko Letijwayelekile

### Kufaniswa kwelicembu ngephrojekthi ngayinye

- **Sicalisi** — VOMO: Kubandzakanya (kumkhiwe)
- **Sento** — Sihlungi nge-Zapier etikwe-id yephrojekthi, bese
- **Sento** — B1.church: Engeta Lilunga Lelicembu kulicembu le-B1 lelinelibito lelifanana neprojekthi ye-VOMO.

Nayipheliswa phrojekthi ye-VOMO, coca licembu le-B1 ngesandla (nobe uhlanganise loku ne sicalisi se-*Participation deleted* lelibasusako).

### Tfumela umlayeto "siyabonga ngekubhalisa" nge-SMS

Hlanganisa VOMO Participation → Clearstream Send Text nobe Text In Church Send Message ku Zap lefanako. Kokubili banento te-Zapier tavelele — buka [Clearstream](./clearstream) ne-[Text In Church](./text-in-church).

### Bona kuwa kwebantfu

Sebentisa sicalisi se-Zapier se-*Schedule* lesihamba onkhe malanga lesibita Tfola Umhleli ku-VOMO yeluhlu lwebantfu be-B1 labajoyine licembu lekukhonta lenyanga — nangabe i-VOMO ibuyisela "akatfolakali", akakavuli i-VOMO futsi kudzingeka atinyeleliswe.

## Imikhawulo & Ematiko

- **I-imeyili sihluthulelo sekujoyina.** Emapheyiloti e-VOMO aveza i-imeyili yemsebentisi kodvwa hhayi i-id yemuntfu ye-B1. Baniki labasebentisa timeyili letehlukene ohlelweni ngalunye batakwakha lokuphindziwe.
- **Akukho sento se-"Add to Project" ku-app ye-Zapier ye-VOMO lamuhla.** Nangabe udzinga kubhaliswa kwe-B1 → VOMO phrojekthi, utawufaka i-POST ku-REST API ye-VOMO kusuka kusinyatselo se-*Webhooks by Zapier*, lokuyichumaniso lelenteliwe ngekwesibopho.
- **Emazinga langekho phatsi/lamahhala e-VOMO angenteka angabinayo i-Zapier.** Cinisekisa nekusekelwa kwe-VOMO ngaphambi kwekutsembisa lusuku lwekuchumana.

## Kulungisa Tinkinga

- **Sicalisi asikaze sichubeke** — tisicalisi letisheshako te-VOMO tidzinga i-tokheni ye-API kutsi ihlale ilungile. Hlola kabusha i-Zap; chumanisa i-VOMO kabusha nangabe i-tokheni ishintjiwe.
- **B1 *Engeta Lilunga Lelicembu* iyehluleka nge 422** — i-id yelicembu esentweni ayikho. Vula **B1Admin → Emacembu**, chofoza licembu, bese ukopela incenye ye-id ye-URL ngekhatsi kwesinyatselo se-Zap.
- **Bantfu be-B1 laphindziwe kusuka kulodvwa bavolontiya be-VOMO** — cishe babhalisa ngephasi i-imeyili lehlukile kuleyo lebebasenayo ku-B1. Nobe lungisa timeyili tibe tifana, nobe wengete *Path* ye-Zapier lesesha nangeInombolo yelucingo ngaphambi kwekwakha.

## Buka Nalokunye

- [Zapier (kubuka konkhe)](../zapier) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — hlanganisa kubhaliswa kwebavolontiya nekucinisekiswa nge-SMS
- [Webhooks (inkomba yentfutfuki)](/docs/developer/api/webhooks) — imicimbi VOMO yengachaliswa
