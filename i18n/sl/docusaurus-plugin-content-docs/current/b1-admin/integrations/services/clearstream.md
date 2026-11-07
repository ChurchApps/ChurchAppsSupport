---
title: "Clearstream"
description: "Povežite Clearstream SMS z B1 Admin prek Zapier: pošiljajte sporočila ob novih darovih ali oddanih obrazcih ter vnosite prejete odgovore kot osebe."
---

# Clearstream

<div class="article-intro">

Sprožite SMS sporočilo [Clearstream](https://clearstream.io) iz katerega koli dogodka v B1 (nova oseba, novo darilo, oddana prijava, posodobitev koledarja) in prejemajte odgovore nazaj kot zapise v B1. Clearstreamova aplikacija za Zapier podpira obe smeri, zato je celotna povezava pripravljena kot recept in ne zahteva lastne kode.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- [Clearstream](https://clearstream.io) račun z vsaj enim seznamom in SMS kvoto
- [Zapier](https://zapier.com) račun
- Uporabnik B1Admin z dovoljenjem **Edit Settings**

</div>

## Kaj lahko povežete

| Smer | Sprožilec | Dejanje |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (npr. obvestilo finančni ekipi) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (npr. ekipa za prošnje za molitev) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; označi z ključno besedo, ki so jo poslali s SMS-om |

Clearstreamova dejanja v Zapierju: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Nastavitev

### 1. Ustvarite API ključ za B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — potreben, da B1 registrira webhook za sprožilec
- `people:read` — potreben za iskanje osebe iz dogodka (`personId` → ime/telefon/e-pošta)
- (Neobvezno) `people:write`, če naj odgovori Clearstream ustvarjajo kontakte v B1

### 2. Ustvarite Zap „SMS ob novem darilu“

1. **Sprožilec** — B1.church: New Donation
2. **Dejanje** — B1.church: Find Person (`personId` darila)
3. **Dejanje** — Clearstream: Send Text to Number. Kot prejemnika uporabite telefonsko številko osebe iz koraka 2 in sestavite sporočilo (`"Thanks for your gift, {first}! …"`).

Vklopite Zap. B1 ob aktivaciji registrira webhook za darila; v **Settings → Developer → Webhooks** se bo prikazal `Zapier — donation.created`.

### 3. (Neobvezno) Odgovore vrnite nazaj kot zapise v B1

1. **Sprožilec** — Clearstream: New Incoming Text
2. **Dejanje** — Filter by Zapier glede na ključno besedo, npr. nadaljuj le, če se besedilo sporočila začne z `PRAY`
3. **Dejanje** — B1.church: Find Person (po telefonu)
4. **Dejanje** — Filter / Path: če oseba ni najdena, jo ustvarite; v vsakem primeru shranite besedilo sporočila nekam (Slack, Google Sheet ali oddano prijavo v B1 prek Webhooks by Zapier).

## Pogosti recepti

### Obveščanje dežurne ekipe

- **Sprožilec** — B1.church: New Form Submission (filtrirano po ID-ju obrazca za prošnjo za molitev)
- **Dejanje** — Clearstream: Send Text to List, kjer je seznam vaša dežurna pastoralna ekipa. Telo sporočila sestavite kot `New prayer request: {data.questions.0.answer}`.

### Zaporedje sledenja za obiskovalce prvič

- **Sprožilec** — B1.church: New Person, filtrirano po oznaki osebe v B1 „First-time visitor“
- **Dejanje** — Clearstream: Add Subscriber to Automated Workflow. ID delovnega toka preslikajte v vnaprej pripravljeno 7-dnevno zaporedje SMS-ov.

### Pridružitev skupini prek ključne besede

- **Sprožilec** — Clearstream: New Incoming Text (filter na ključno besedo `MENS`)
- **Dejanje** — B1.church: Find Person (po telefonu); pri ne-najdbi → Create Person
- **Dejanje** — B1.church: Add Group Member skupini Men's Ministry

## Omejitve in opombe

- **Clearstream šteje SMS-e po sporočilih.** Vsako dejanje Send Text porabi enega ali več kreditov, odvisno od dolžine in števila prejemnikov. Preverite kvoto svojega paketa.
- **Telefonska številka mora biti v formatu E.164** (npr. `+15555550199`) za *Send Text to Number*. B1 shrani zapis osebe tako, kot je bil vnesen. Če formata ne morete zagotoviti, uporabite korak *Formatter by Zapier — Numbers → Format Phone Number*.
- **B1 ne zahteva nobene glave (header)**. Avtentikacija Clearstreama v celoti poteka prek njegove Zapier povezave.

## Odpravljanje težav

- **Sprožilec se nikoli ne sproži** — po vklopu Zapa mora v `Settings → Developer → Webhooks` biti vrstica `Zapier — <event>`. Če je ni, B1 API ključu manjka `settings:write`. Ustvarite novega ključa in ponovno povežite.
- **Clearstream vrne „Invalid phone number“** — polje prejemnika ni v formatu E.164. Dodajte korak Format Phone Number.
- **Send Text to List javi `403`** — API uporabnik Clearstreama nima dovoljenja za ta seznam ali pa je ID seznama napačen. ID-je seznamov najdete na strani s podrobnostmi seznama v Clearstreamu.

## Glej tudi

- [Text In Church](./text-in-church.md) — alternativna SMS platforma s podobno zasnovo povezave
- [Mobile Message](./mobile-message.md) — za cerkve zunaj ZDA
- [Zapier (pregled)](../zapier.md) — stran B1 za vse recepte z Zapierjem
- [Clearstream API docs](https://api-docs.clearstream.io/) — za lastne integracije onkraj aplikacije Zapier
