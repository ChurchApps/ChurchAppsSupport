---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) apjungia SMS žinutes, laiku planuojamas („drip") darbo eigas ir ryšio kortelių automatizavimą. Jo Zapier programa veikia abiem kryptimis: B1 įvykius galite nukreipti į Text In Church darbo eigą, o ryšio kortelių ar naujų kontaktų įvykius iš kitos pusės perduoti į B1.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Text In Church](https://textinchurch.com) paskyra su planu, kuriame yra Zapier integracija
- [Zapier](https://zapier.com) paskyra
- B1Admin naudotojas su leidimu **Edit Settings**

</div>

## Ką galite susieti

| Kryptis | Trigeris | Veiksmas |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Siųsti tekstinę žinutę (Send Text Message) atitinkamai komandai |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (grupės narystės atspindėjimas) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church veiksmai taip pat apima *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* ir grupės narystės pridėjimą bei pašalinimą.

## Sąranka

### 1. Sukurkite B1 API raktą

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — reikalingas B1 trigeriais paleidžiamiems Zap
- `people:read`, `people:write` — asmeniui rasti arba sukurti
- `groups:write` — grupių sinchronizavimui
- (Nebūtina) `donations:write`, jei aukų patvirtinimus norite siųsti į TIC

### 2. Prijunkite Text In Church prie Zapier

Vadovaukitės [Text In Church Zapier integracijos vadovu](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). API žetoną jie sugeneruoja pačioje TIC valdymo skydelyje.

### 3. Sukurkite ryšio kortelės į B1 Zap

Tai dažniausia kryptis. TIC pateiktos ryšio kortelės automatiškai tampa naujais B1 asmenimis.

1. **Trigeris** — Text In Church: Connect Card Submitted.
2. **Veiksmas** — B1.church: Find Person (pagal el. paštą).
3. **Šaka** — skirstykite pagal tai, ar asmuo rastas:
   - Nerastas → B1.church: Create Person.
   - Rastas → tęskite.
4. **Veiksmas** — B1.church: Add Group Member į grupę „New Contact".

Įjunkite Zap. Kita per TIC pateikta ryšio kortelė automatiškai atsiras **B1Admin → People**.

## Dažniausi receptai

### Paleiskite ryšio kortelės tipo darbo eigą iš B1 formos

- **Trigeris** — B1.church: New Form Submission (filtruokite pagal formos ID „I'm new here")
- **Veiksmas** — Text In Church: Create/Update Person, susiedami formos el. pašto, telefono ir vardo atsakymus
- **Veiksmas** — Text In Church: Add to Group, kai grupei jau priskirta paruošta sveikinimo darbo eiga

### Atspindėkite grupės narystę

- **Trigeris** — B1.church: New Group Member, filtruojant pagal konkretų `groupId`
- **Veiksmas** — Text In Church: Add to Group (tas pats asmuo, atspindėta grupė). Jei norite pilnos sinchronizacijos, pridėkite ir `group.member.removed` Zap.

### Pranešti vadovui, kai kas nors prisijungia

- **Trigeris** — B1.church: New Group Member
- **Veiksmas** — Text In Church: Send Text Message, gavėjas – grupės vadovo telefonas, tekstas – `"{first} {last} ką tik prisijungė prie {group}"`.

## Apribojimai ir pastabos

- **TIC Zapier programa priklauso nuo plano.** Jei Zapier integracija TIC valdymo skydelyje neaktyvi (pilka), kreipkitės į TIC palaikymo tarnybą, kad ją įjungtų jūsų plane.
- **Grupių ID yra TIC, o ne B1.** Sinchronizuodami turėsite kur nors saugoti atitikties lentelę (Zapier *Lookup Table* arba kiekvienam Zap įrašytas fiksuotas reikšmes).
- **Send Text Message naudoja kreditus.** Kiekvienas Zap, paleidžiantis *Send Text*, sunaudoja jūsų TIC SMS limitą.

## Trikčių šalinimas

- **Ryšio kortelės trigeris neveikia** — TIC reikia įjungti Zapier integracijos jungiklį. Taip pat patikrinkite, ar forma, kurią bandėte, sukonfigūruota kaip „Connect Card", o ne kaip bendra apklausa.
- **Create Person B1 nesėkmingas su klaida 401** — API raktas neteisingas, panaikintas arba trūksta leidimo `people:write`. Sukurkite naują raktą.
- **Dublikuoti B1 asmenys** — TIC siunčia ir *Person Created*, ir *Connect Card Submitted* tam pačiam įvykiui. Pasirinkite vieną kaip pagrindinį šaltinį ir kitam pridėkite Zapier Filter.

## Taip pat žr.

- [Clearstream](./clearstream) — alternatyvi SMS platforma su panašia Zapier struktūra
- [Zapier (apžvalga)](../zapier) — B1 pusė kiekvienam Zapier receptui
- [Text In Church Zapier vadovas](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC dokumentacija)
