---
title: "Text In Church"
description: "Povežite B1 Admin in Text In Church prek Zapier: ustvarite API ključ, zgradite Zap za povezovalno kartico in zrcalite članstvo v skupinah."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) združuje SMS in zaporedja kapljičnih sporočil ter avtomatizacije kartic za stik. Njegova aplikacija za Zapier podpira obe smeri: dogodke iz B1 lahko pošljete v delovni tok Text In Church, prožilce kartic za stik ali novih stikov pa lahko prenesete nazaj v B1.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun [Text In Church](https://textinchurch.com) z naročniškim paketom, ki vključuje integracijo z Zapierjem
- Račun [Zapier](https://zapier.com)
- Uporabnik B1Admin z dovoljenjem **Edit Settings**

</div>

## Kaj lahko povežete

| Smer | Prožilec | Dejanje |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message prek ustrezne ekipe |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (zrcaljenje članstva v skupini) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Dejanja v Text In Church vključujejo tudi *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* ter dodajanje in odstranjevanje članov skupin.

## Nastavitev

### 1. Ustvarite API ključ za B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — potrebno za Zape, ki se sprožijo iz B1
- `people:read`, `people:write` — za iskanje ali ustvarjanje osebe
- `groups:write` — za sinhronizacijo skupin
- (Neobvezno) `donations:write`, če želite v TIC povezati potrditve darov

### 2. Povežite Text In Church z Zapierjem

Sledite [navodilom za integracijo Text In Church z Zapierjem](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). API žeton ustvarite v nadzorni plošči TIC.

### 3. Ustvarite Zap za povezavo kartic za stik z B1

Ta smer je najpogostejša. Kartice za stik, poslane prek TIC, samodejno postanejo nove osebe v B1.

1. **Prožilec** — Text In Church: Connect Card Submitted.
2. **Dejanje** — B1.church: Find Person (po e-poštnem naslovu).
3. **Pot** — razvejitev glede na to, ali je oseba najdena:
   - Ni najdena → B1.church: Create Person.
   - Najdena → nadaljujte.
4. **Dejanje** — B1.church: Add Group Member v skupino »New Contact«.

Vklopite Zap. Naslednja kartica za stik, oddana prek TIC, se samodejno prikaže v **B1Admin → People**.

## Pogosti recepti

### Sprožite delovni tok, podoben kartici za stik, iz obrazca B1

- **Prožilec** — B1.church: New Form Submission (filtrirajte po ID-ju obrazca »I'm new here«)
- **Dejanje** — Text In Church: Create/Update Person, pri čemer preslikate odgovore na obrazcu za e-pošto, telefon in ime
- **Dejanje** — Text In Church: Add to Group, pri čemer ima skupina pripravljen delovni tok dobrodošlice

### Zrcaljenje članstva v skupini

- **Prožilec** — B1.church: New Group Member, filtrirano po določenem `groupId`
- **Dejanje** — Text In Church: Add to Group (ista oseba, zrcalna skupina). Za popolno sinhronizacijo ga združite z Zapom `group.member.removed`.

### Obvestite vodjo, ko se nekdo pridruži

- **Prožilec** — B1.church: New Group Member
- **Dejanje** — Text In Church: Send Text Message, prejemnik = telefonska številka vodje skupine, vsebina = `"{first} {last} just joined {group}"`.

## Omejitve in opombe

- **Aplikacija TIC za Zapier je odvisna od naročniškega paketa.** Če je integracija z Zapierjem v nadzorni plošči TIC neaktivna (zasivljena), se za omogočanje na vašem paketu obrnite na podporo TIC.
- **ID-ji skupin so TIC-ovi, ne B1-jevi.** Pri zrcaljenju boste morali nekje vzdrževati preslikovalno tabelo (Zapierjevo *Lookup Table* ali ročno vnesene vrednosti v posameznem Zapu).
- **Pošiljanje SMS-sporočil porablja kredite.** Vsak Zap, ki sproži *Send Text*, porabi del vašega SMS-kontingenta TIC.

## Odpravljanje težav

- **Prožilec Connect-Card se ne sproži** — v TIC mora biti vklopljeno stikalo za integracijo z Zapierjem. Preverite tudi, ali je obrazec, s katerim ste preizkušali, nastavljen kot »Connect Card«, ne kot splošna anketa.
- **Create Person v B1 ne uspe s kodo 401** — API ključ je napačen, preklican ali pa nima dovoljenja `people:write`. Ustvarite novega.
- **Podvojene osebe v B1** — TIC pošlje tako *Person Created* kot *Connect Card Submitted* za isti dogodek. Eno izberite kot vir resnice in na drugega dodajte filter Zapier.

## Glejte tudi

- [Clearstream](./clearstream.md) — alternativna platforma za SMS s podobno zasnovo za Zapier
- [Zapier (pregled)](../zapier.md) — stran B1 za vse recepte Zapier
- [Navodila Text In Church za Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (dokumentacija TIC)
