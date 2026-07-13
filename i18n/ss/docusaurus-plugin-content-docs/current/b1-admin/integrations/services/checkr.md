---
title: "Checkr"
---

# Checkr

<div class="article-intro">

I-[Checkr](https://checkr.com) yenta kuhlolwa kwemuva kwabasebenti nebavolontiya — sidzingo lesivamile kuloluphi luhlelo lwelibandla loluphatsa luhlelo lwebantfwana nobe lwentjha. B1 **ayinaso sento sekuhlolwa kwemuva lesakhelwe ngekhatsi** — kuoda kuhlolwa, kulandzelela imiphumela, nekulandzela imitsetfo kokubili kuhlala ku-Checkr; iseluleko lelingentasi lifaka kuphela imicimbi ye-B1 kuyo. I-Checkr ayinayo i-app ye-Zapier, kodvwa [kuchumanisa kwe-Checkr kwe-Make.com](https://www.make.com/en/integrations/checkr) kucinisekisiwe futsi kuveza tento lotidzinga kucalisa kuhlolwa kusuka kumcimbi we-B1.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Checkr](https://checkr.com) lenekufika kwe-API kanye nekungenani liphakethe linye lekuhlola lelilungiselelwe
- I-akhawunti ye-[Make](https://www.make.com)
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo**

</div>

## Loko Lokungachumaniswa

App ye-Checkr ye-Make iveza sicalisi sinye nemasento lasitfupha:

| Luhlangotsi | Sicalisi se-B1 / Make | Sento |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (kuhlungwe kulicembu lebavolontiya) | Checkr: Kwakha Umtsengiswa → Kwakha Simemo Sekuhlolwa Kwemuva |
| Checkr → B1 | Webhook ye-Checkr (simemo / umcimbi wembiko) | B1: Buyeketa irekhodi lemuntfu (sib. faka luphawu "Checkr icocekile") |

Tento te-Checkr te-Make: Kwakha Umtsengiswa, Kwakha Simemo Sekuhlolwa Kwemuva, Tfola Umtsengiswa, Tfola Umbiko, Tfola Sikhatsi Selikala Lembiko, Tfola Simemo. Kanye nema-module lamane ekusesha.

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

**Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**:

- `settings:write` — yesicalisi se-webhook
- `people:read` — kutfola ligama/i-imeyili yemuntfu nakucaliswa kuhlolwa
- (Lokungakhetsakala) `people:write` nangabe ufuna kubhala sitatimende sembiko kubuyele njengenkambu lekhetsekile nobe luphawu

### 2. Yakha sento se-"cala kuhlolwa nakubhalisa livolontiya" ku-Make

1. **Sicalisi** — B1.church: Buka Imicimbi (`group.member.added`).
2. **Sihlungi** — cinisela kuchubeka kuphela nangabe `data.groupId` ifana nelicembu lakho le "Children's Volunteers" (nobe lelifanako).
3. **Sento** — B1.church: Tfola Umuntfu (nge `data.personId`) kutfola i-imeyili + ligama lekucala/lelisekugcina.
4. **Sento** — Checkr: Kwakha Umtsengiswa. Fanisa ligama lekucala/lelisekugcina/i-imeyili kusuka kunyatselo 3.
5. **Sento** — Checkr: Kwakha Simemo Sekuhlolwa Kwemuva. Fanisa i-id yemtsengiswa lomusha kusuka kunyatselo 4 kunkambu ye-*candidate_id*. Khetsa liphakethe lekuhlola (sib. `tasker_standard` nobe nome ngabe yini leveza i-akhawunti yakho).
6. (Lokungakhetsakala) **Sento** — Slack: watisa umcondzisi wekuphepha kwenkonzo kutsi kuhlolwa kucaliwe.

Vula lesento. Bavolontiya labasha kulicembu lelicondzelwe bafumana simemo se-Checkr ngekutentekela nge-imeyili; bakuchubeke ngelucingo lwabo nobe ilaptop; i-Checkr yente kuhlolwa.

### 3. (Lokungakhetsakala) Famukela umbiko lobuyako

1. **Sicalisi** — Checkr: Buka Imicimbi (webhook). I-Make ibhalisa webhook ye-Checkr nakuvulwa.
2. **Sihlungi** — cinisela kuchubeka kuphela nangabe `event_type = report.completed`.
3. **Sento** — Checkr: Tfola Umbiko (sebentisa i-id yembiko kusuka kuwebhook).
4. **Sento** — B1.church: Tfola Umuntfu (nge-imeyili yemtsengiswa).
5. **Sento** — Slack / Imeyili lokwelamela: watisa umcondzisi ngesimo `clear` / `consider` / `suspended`.

Liphuzu: B1 ayinayo inkambu "yesimo sekuhlolwa kwemuva" lesakhelwe lamuhla. Tinketfo letinengqondo ngu (a) faka umphumela ku-Slack lelicashile lekuhlolwa, (b) bhala ku-Google Sheet yekuhlolwa, nobe (c) engeta lomuntfu kulicembu le-B1 le "Cleared volunteers" nakuba `clear`.

## Tinseluleko Letijwayelekile

### Buyisela kuhlolwa kwebavolontiya njalo eminyakeni lemibili

Hlanganisa lokungentasi nesicalisi se-Make se-schedule:

- **Sicalisi** — Make: Schedule (nyanga nayinye)
- **Sento** — B1.church: Luhlu Lwemalunga Elicembu le "Cleared volunteers"
- **Sento** — Sihlungi nge-Make: lusuku lwekucocwa lolungetulu kwetinyanga leti-22
- **Sento** — Checkr: Kwakha Simemo Sekuhlolwa Kwemuva (njengaluchungechunge lwekucala)

### Vimba kufika kwesigaba 1 kuze kucedze kuhlolwa

Nangabe libandla lakho lisebentisa bulunga belicembu le-B1 kuvimba kufika (sib. bantfu labase licembu le "Cleared" kuphela laboniswa etinhlelweni tekukhonta), gcina bavolontiya labasha kulicembu lekulinda kuze umcimbi we-Checkr `report.completed` ubashintje.

## Imikhawulo & Ematiko

- **I-Checkr yile-US kuphela** kuloko lamaphakethe emanyenti ekuhlolwa. Emabandla ase-Australia, e-UK, nase-Canada atawudzinga lenye indlela.
- **Emanani** angehambelana nekuhlolwa ngakunye — Kwakha Simemo nganye ku-Make kusebentisa kuhlolwa kwangempela. Hlola ku-sandbox / akhawunti ye-staging ye-Checkr kucala (app ye-Checkr ye-Make ihloniphe tinkhomba lotifake eluchumeni, ngako-ke kushintja tinkhomba kushintja emkhatsini we-sandbox/live).
- **Kufika ku-API ye-Checkr kuvalelwe ngehlelo.** Ema-akhawunti la-Checkr lamancane angenteka asezingeni le-UI kuphela; tsindzana ne-Checkr kutsi kuvule i-API.

## Kulungisa Tinkinga

- **Kwakha Umtsengiswa kuyehluleka nge `403`** — i-tokheni ye-API ye-Checkr yekufundza kuphela nobe ayinato timvumo letilungile te-akhawunti. Yikhicite kabusha kusuka kubhodi le-Checkr ngemvumo yekubhala.
- **Simemo asifiki nakanini** — hlola i-imeyili yemtsengiswa kunyatselo 3; B1 angenteka inenkambu ye-imeyili leyize yalowo muntfu. Engeta sihlungi lesidzinga imeyili ngaphambi kwesinyatselo se-Checkr.
- **Sicalisi se-webhook asichubeki** — kubhaliswa kwewebhook ye-Checkr ngaletinye tikhatsi kuyehluleka ngekuthula nangabe i-akhawunti yakho ye-Make ayikho ezingeni lelikhokhelwako lelisekela ema-webhook laphumako. Cinisekisa kukhasi le-*Webhooks* le-Checkr kutsi URL ye-Make ikhona.

## Buka Nalokunye

- [Make (kubuka konkhe)](../make) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Make
- [Mobile Message](./mobile-message) — yebaniki be-SMS labangenayo i-app ye-Zapier, sifanelo lesifananako se-Webhooks/HTTP njengekuchumaniswa kwe-Checkr Make
- [Emaphepha e-API e-Checkr](https://docs.checkr.com/)
