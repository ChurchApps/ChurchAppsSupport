---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO je platforma za vključevanje prostovoljcev. Ljudje se prijavljajo na projekte, se prijavljajo na kiosku in nabirajo ure. Če za razporejanje prostovoljcev uporabljate VOMO, za zapise o ljudeh pa B1, lahko Zapier sinhronizira članstvo in prijave med njima, da se podatki na obeh straneh ne razhajajo.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun na [VOMO](https://vomo.org) z načrtom, ki omogoča Zapier (če niste prepričani, se pozanimajte pri podpori VOMO)
- Račun na [Zapier](https://zapier.com)
- Uporabnik B1Admin z dovoljenjem **Edit Settings**

</div>

## Kaj lahko povežete

Aplikacija VOMO za Zapier ponuja štiri takojšnje sprožilce in štiri dejanja. Recepti, ki si jih največ cerkva želi:

| Smer | Sprožilec | Dejanje |
|---|---|---|
| VOMO → B1 | VOMO Membership (ustvarjen) | B1: Find Person → Create Person (če oseba še ni v sistemu) |
| VOMO → B1 | VOMO prijava na kiosku | B1: Add Group Member v skupino "Trenutno služi" ali zabeležite kot prisotnost |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (po e-pošti); sicer korak po meri |
| Obe smeri | VOMO Participation (prijave) | B1: Add Group Member v skupino, namenjeno projektu |

Dejanja VOMO so omejena na **pripravo projektov** in **iskanje** obstoječih organizatorjev in projektov. Trenutno ni dejanja »dodaj to osebo v projekt VOMO«. Zanimivo povezovanje poteka predvsem od VOMO → B1.

## Nastavitev

### 1. Ustvarite API ključ za B1

**Nastavitve → Razvijalec → API ključi → Nov API ključ**. Obsegi:

- `people:read`, `people:write` — za iskanje in ustvarjanje prostovoljcev kot oseb v B1
- `groups:write` — za dodajanje v skupine servisnih ekip
- (Neobvezno) `attendance:write`, če prijave na kiosku obravnavate kot prisotnost

### 2. Zgradite Zap za sinhronizacijo članstva

1. **Sprožilec** — VOMO: Membership (dogodek = `created`).
2. **Dejanje** — B1.church: Find Person, po e-pošti.
3. **Filter / Pot** — razvejitev glede na to, ali je oseba najdena:
   - Ni najdena → B1.church: Create Person, nato Add Group Member v ustrezno skupino prostovoljcev.
   - Najdena → B1.church: neposredno Add Group Member.
4. Vklopite. Novi prostovoljci iz VOMO se zdaj pojavijo v B1 z ustreznim članstvom v skupinah.

### 3. (Neobvezno) Zgradite Zap za prijave na kiosku

1. **Sprožilec** — VOMO: Kiosk
2. **Dejanje** — B1.church: Find Person (po e-pošti)
3. **Dejanje** — po vaši izbiri:
   - *Če obravnavate kot prisotnost* — Webhooks by Zapier pošlje POST na končno točko `/attendance/visits` v B1 (aplikacija B1 za Zapier še nima namenskega dejanja *Record Attendance*). [API ključ](/docs/developer/api/api-keys) B1 gre v glavo `Authorization: Bearer cak_…`.
   - *Če obravnavate kot članstvo v skupini* — B1.church: Add Group Member v skupino »Trenutno služi (danes)«. Drugi Zap pozneje čez dan jih odstrani prek načrtovanega čiščenja.

## Pogosti recepti

### Sinhronizacija skupin po projektu

- **Sprožilec** — VOMO: Participation (ustvarjeno)
- **Dejanje** — Filter by Zapier po ID-ju projekta, nato
- **Dejanje** — B1.church: Add Group Member v skupino B1, katere ime zrcali projekt VOMO.

Ko se projekt VOMO konča, ročno izpraznite skupino B1 (ali to združite s sprožilcem *Participation deleted*, ki osebe odstrani).

### Pošiljanje SMS-sporočila »hvala za prijavo«

V istem Zapu povežite VOMO Participation → Clearstream Send Text ali Text In Church Send Message. Oba imata namenska Zapier dejanja. Glejte [Clearstream](./clearstream) in [Text In Church](./text-in-church).

### Zaznavanje odpadanja

Vsak dan zaženite Zapier sprožilec *Schedule*, ki v VOMO pokliče Find Organizer za seznam oseb iz B1, ki so se ta mesec pridružile servisni ekipi. Če VOMO vrne »not found«, se niso aktivirale v VOMO in jih je treba opomniti.

## Omejitve in opombe

- **E-pošta je ključ za povezavo.** Podatki iz VOMO vsebujejo e-poštni naslov uporabnika, ne pa ID-ja osebe v B1. Donatorji, ki v obeh sistemih uporabljajo različne e-poštne naslove, bodo ustvarili podvojene zapise.
- **Trenutno v aplikaciji VOMO za Zapier ni dejanja »Add to Project«.** Če potrebujete vpis iz B1 v projekt VOMO, bi morali iz koraka *Webhooks by Zapier* poslati POST na REST API VOMO, kar je integracija po meri.
- **Brezplačni ali nižji načrti VOMO morda ne vključujejo Zapier.** Pred obljubo datuma povezave potrdite pri podpori VOMO.

## Odpravljanje težav

- **Sprožilec se nikoli ne sproži** — takojšnji sprožilci VOMO zahtevajo, da API žeton ostane veljaven. Ponovno preizkusite Zap. Če je bil žeton zamenjan, ponovno povežite VOMO.
- **B1 *Add Group Member* ne uspe s kodo 422** — ID skupine v dejanju ne obstaja. Odprite **B1Admin → Skupine**, kliknite skupino in kopirajte segment ID-ja iz naslova URL v korak Zap.
- **Podvojeni zapisi oseb v B1 iz enega prostovoljca VOMO** — verjetno so se prijavili z drugim e-poštnim naslovom, kot ga že imajo v B1. Poenotite e-poštne naslove ali dodajte Zapier *Path*, ki pred ustvarjanjem poišče tudi po telefonski številki.

## Glej tudi

- [Zapier (pregled)](../zapier) — stran B1 za vse recepte Zapier
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — povežite prijave prostovoljcev s SMS-potrditvami
- [Webhooks (referenca za razvijalce)](/docs/developer/api/webhooks) — dogodki, ob katerih lahko VOMO sproži akcije
