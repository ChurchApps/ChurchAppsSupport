---
title: "Checkr"
description: "Povežite prijave prostovoljcev v B1 Admin s preverjanjem ozadja Checkr prek Make.com, z neobveznimi opozorili o stanju poročil za koordinatorja varnosti."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) izvaja preverjanje preteklosti za zaposlene in prostovoljce, kar je skoraj nujna potreba vsake cerkve, ki vodi otroški ali mladinski program. B1 **nima vgrajene funkcije za preverjanje preteklosti**. Naročanje preverjanj, sledenje rezultatom in skladnost s pregledi potekajo v Checkr, spodnji recept pa samo poveže dogodke B1 s to storitvijo. Checkr nima aplikacije za Zapier, vendar je [integracija Checkr v Make.com](https://www.make.com/en/integrations/checkr) preverjena in ponuja dejanja, ki jih potrebujete za zagon preverjanja iz dogodka v B1.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- [Račun Checkr](https://checkr.com) z dostopom do API-ja in vsaj enim nastavljenim paketom preverjanja
- [Račun Make](https://www.make.com)
- Uporabnik B1Admin z dovoljenjem **Edit Settings**

</div>

## Kaj lahko povežete

Aplikacija Checkr v Make ponuja 1 sprožilec in 6 dejanj:

| Smer | Sprožilec B1 / Make | Dejanje |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrirano na skupino prostovoljcev) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook Checkr (dogodek vabila / poročila) | B1: Posodobi zapis osebe (npr. oznaka "Checkr – potrjeno") |

Dejanja Checkr v Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Poleg tega so na voljo še 4 iskalni moduli.

## Nastavitev

### 1. Ustvarite ključ API v B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` za sprožilni webhook
- `people:read` za iskanje imena in e-pošte osebe ob začetku preverjanja
- (Neobvezno) `people:write`, če želite rezultat poročila zapisati nazaj kot polje po meri ali oznako

### 2. Sestavite scenarij "Začni preverjanje ob prijavi prostovoljca" v Make

1. **Sprožilec**: B1.church: Watch Events (`group.member.added`).
2. **Filter**: nadaljujte le, če se `data.groupId` ujema z vašo skupino "Children's Volunteers" (ali podobno).
3. **Dejanje**: B1.church: Find Person (po `data.personId`), da pridobite e-pošto ter ime in priimek.
4. **Dejanje**: Checkr: Create Candidate. Preslikajte ime, priimek in e-pošto iz koraka 3.
5. **Dejanje**: Checkr: Create Background Check Invitation. Preslikajte ID novega kandidata iz koraka 4 v polje *candidate_id*. Izberite paket preverjanja (npr. `tasker_standard` ali karkoli vaš račun ponuja).
6. (Neobvezno) **Dejanje**: Slack: obvestite koordinatorja za varno službo v cerkvi, da je bilo preverjanje začeto.

Vklopite scenarij. Novi prostovoljci v ciljni skupini prejmejo samodejno vabilo Checkr po e-pošti. Vabilo izpolnijo na telefonu ali prenosniku, Checkr pa izvede preverjanje.

### 3. (Neobvezno) Prejemanje poročila nazaj

1. **Sprožilec**: Checkr: Watch Events (webhook). Make ob aktivaciji registrira webhook v Checkr.
2. **Filter**: nadaljujte le, če je `event_type = report.completed`.
3. **Dejanje**: Checkr: Get Report (uporabite ID poročila iz webhooka).
4. **Dejanje**: B1.church: Find Person (po e-pošti kandidata).
5. **Pogojno dejanje**: Slack / e-pošta: obvestite koordinatorja s statusom `clear` / `consider` / `suspended`.

Opomba: B1 trenutno nima vgrajenega polja "stanje preverjanja preteklosti". Praktične možnosti so (a) objava rezultata v zasebnem kanalu Slack za pregled, (b) zapis v Google Sheet za revizijo ali (c) dodajanje osebe v skupino B1 "Preverjeni prostovoljci" ob statusu `clear`.

## Pogosti recepti

### Ponovno preverjanje prostovoljcev vsaki 2 leti

Zgornje povežite s časovnim sprožilcem v Make:

- **Sprožilec**: Make: Schedule (mesečno)
- **Dejanje**: B1.church: List Group Members za "Preverjeni prostovoljci"
- **Dejanje**: Filter v Make: datum potrditve starejši od 22 mesecev
- **Dejanje**: Checkr: Create Background Check Invitation (enako kot pri začetnem toku)

### Blokiranje dostopa stopnje 1, dokler preverjanje ni končano

Če vaša cerkev uporablja članstvo v skupinah B1 za omejevanje dostopa (npr. v urnikih služenja se prikažejo le člani skupine "Preverjeni"), novi prostovoljci ostanejo v začasni skupini, dokler dogodek Checkr `report.completed` ne spremeni njihovega statusa.

## Omejitve in opombe

- **Checkr deluje samo v ZDA** za večino paketov preverjanja. Cerkve v Avstraliji, Veliki Britaniji in Kanadi potrebujejo drugo rešitev.
- **Cene** se obračunavajo na preverjanje. Vsako ustvarjeno vabilo v Make porabi pravo preverjanje. Najprej preizkusite v peskovniku (sandbox) ali testnem računu Checkr. Povezava Checkr v Make uporablja poverilnice, ki jih vnesete v povezavo, zato zamenjava poverilnic preklaplja med peskovnikom in produkcijo.
- **Dostop do API-ja Checkr je odvisen od paketa.** Manjši računi Checkr so morda na nivoju samo za uporabniški vmesnik. Za omogočitev API-ja se obrnite na Checkr.

## Odpravljanje težav

- **Create Candidate ne uspe z `403`**: žeton API Checkr je samo za branje ali nima ustreznih dovoljenj računa. Ponovno ga izdajte na nadzorni plošči Checkr z dovoljenjem za pisanje.
- **Vabilo nikoli ne prispe**: v koraku 3 preverite e-pošto kandidata. B1 morda nima izpolnjenega polja e-pošte za to osebo. Pred korakom Checkr dodajte filter, ki zahteva e-pošto.
- **Sprožilec webhooka se ne sproži**: registracija webhooka v Checkr se včasih tiho ne uspe, če vaš račun Make ni na plačljivem paketu, ki podpira odhodne webhooke. Na strani *Webhooks* v nadzorni plošči Checkr preverite, ali je naveden URL Make.

## Glej tudi

- [Make (pregled)](../make.md): stran B1 za vsak scenarij Make
- [Mobilno sporočilo](./mobile-message.md): za SMS-ponudnike brez aplikacij Zapier, enak vzorec Webhooks/HTTP kot pri povezavi Checkr v Make
- [Dokumentacija Checkr API](https://docs.checkr.com/)
