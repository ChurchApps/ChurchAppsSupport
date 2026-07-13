---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) ihlanganisa SMS kanye netinchubo te-drip nekutentekela kwe-connect-card. I-app yayo ye-Zapier ivula tinhlangothi tomabili — faka imicimbi ye-B1 kuluchungechunge lwe-Text In Church, bese ukhipha tisicalisi te-connect-card nobe te-umuntfu-lomusha luhlangotsini lolunye lubuyele ku-B1.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Text In Church](https://textinchurch.com) lenehlelo lelifaka kuchumanisa kwe-Zapier
- I-akhawunti ye-[Zapier](https://zapier.com)
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo**

</div>

## Loko Lokungachumaniswa

| Luhlangotsi | Sicalisi | Sento |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Kwakha/Kubuyeketa Umuntfu + Engeta Kulicembu |
| B1 → Text In Church | B1 `form.submission.created` | Tfumela Umlayeto nge licembu lelifanele |
| B1 → Text In Church | B1 `group.member.added` | Engeta Kulicembu (fanisa bulunga belicembu) |
| Text In Church → B1 | Connect Card Itfunyelwe | B1: Kwakha Umuntfu + Engeta Lilunga Lelicembu |
| Text In Church → B1 | Umuntfu Wamkhiwe | B1: Kwakha Umuntfu |
| Text In Church → B1 | Umuntfu Ujoyine Licembu | B1: Engeta Lilunga Lelicembu |

Tento te-Text In Church tiphindze tifake *Tfumela Umlayeto*, *Tfumela Umsakato Welizwi*, *Kwakha Umsebenti*, *Tfola Umuntfu/Licembu*, nekwengeta/kususa bulunga belicembu.

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

**Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**:

- `settings:write` — kuyadzingeka ema-Zap lacaliswa yi-B1
- `people:read`, `people:write` — kutfola nobe kwakha umuntfu
- `groups:write` — yekufaniswa kwemacembu
- (Lokungakhetsakala) `donations:write` nangabe uchumanisa kucinisekiswa kwemnikelo ku-TIC

### 2. Chumanisa i-Text In Church ne-Zapier

Landzela [umhlahlandlela wekuchumanisa we-Zapier we-Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Bakhipha i-tokheni ye-API kusuka ngekhatsi kwebhodi le-TIC.

### 3. Yakha i-Zap ye-connect-card-to-B1

Luhlangotsi lolujwayelekile kakhulu. Ema-connect card lacaliswe kusuka ku-TIC aba bantfu labasha be-B1 ngekutentekela.

1. **Sicalisi** — Text In Church: Connect Card Itfunyelwe.
2. **Sento** — B1.church: Tfola Umuntfu (nge-imeyili).
3. **Indlela** — yehlukanisa etfolakala / angatfolakali:
   - Akatfolakalanga → B1.church: Kwakha Umuntfu.
   - Utfolakele → chubeka.
4. **Sento** — B1.church: Engeta Lilunga Lelicembu kulicembu le "New Contact".

Vula i-Zap. I-connect card lelandzelako letfunyelwe nge-TIC ingena ku **B1Admin → Bantfu** ngekutentekela.

## Tinseluleko Letijwayelekile

### Calisa luchungechunge lolunjenge-connect-card kusuka kufomu le-B1

- **Sicalisi** — B1.church: Kutfunyelwa Kwefomu Lokusha (hlungwa kusikhombakhomo sefomu "I'm new here")
- **Sento** — Text In Church: Kwakha/Kubuyeketa Umuntfu, ufanisa imininingwane ye-imeyili / inombolo yelucingo / ligama kusuka kufomu
- **Sento** — Text In Church: Engeta Kulicembu, lapho licembu lelinaluchungechunge lolwakhelwe ngaphambili lwekwemukela

### Fanisa bulunga belicembu

- **Sicalisi** — B1.church: Lilunga Lelicembu Lelisha, kuhlungwe nge `groupId` lecinile
- **Sento** — Text In Church: Engeta Kulicembu (umuntfu lofanako, licembu lelifanako). Hlanganisa nge-Zap ye `group.member.removed` nangabe ufuna kufaniswa lokugcwele.

### Bita umholi nakukhona lojoyinako

- **Sicalisi** — B1.church: Lilunga Lelicembu Lelisha
- **Sento** — Text In Church: Tfumela Umlayeto, umamukeli = inombolo yelucingo yemholi welicembu, umtimba = `"{first} {last} usanda kujoyina {group}"`.

## Imikhawulo & Ematiko

- **App ye-Zapier ye-TIC ivalelwe ngehlelo.** Nangabe kuchumanisa kwe-Zapier kumidlophu ku-bhodi le-TIC, tsindzana nekusekelwa kwe-TIC kuze bakuvule ehlelweni lakho.
- **Ema-id emacembu ngete-TIC, hhayi ete-B1.** Nawufanisa, utawugcina lithebula lekufanisa kutsi kwenteni (i-*Lookup Table* ye-Zapier, nobe lokwakhelwe ngekhodi nge-Zap ngayinye).
- **Kutfumela Umlayeto kudla emakhredithi.** I-Zap ngayinye lecalisa i-*Send Text* isebentisa kubulukhulu bakho beSMS be-TIC.

## Kulungisa Tinkinga

- **Sicalisi se-Connect-Card asichubeki** — i-TIC idzinga kutsi kuchumanisa kwe-Zapier kuvuliwe. Cinisekisa nekutsi fomu lohlole ngalo yilungiselelwe njenge "Connect Card", hhayi luhlolo lolujwayelekile.
- **Kwakha Umuntfu ku-B1 kuyehluleka nge 401** — sikhiya se-API asisiyo lesilungile, sikhutjulwe, nobe asinaso `people:write`. Khicita kabusha.
- **Bantfu be-B1 laphindziwe** — i-TIC itfumela kokubili *Person Created* ne-*Connect Card Submitted* ngemcimbi lofanako. Khetsa munye njengeliciniso lakho bese wengeta Sihlungi se-Zapier kulomunye.

## Buka Nalokunye

- [Clearstream](./clearstream) — inkundla lengashintjaniswa ye-SMS lenesakhiwo lesifananako se-Zapier
- [Zapier (kubuka konkhe)](../zapier) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier
- [Umhlahlandlela we-Zapier we-Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (emaphepha e-TIC)
