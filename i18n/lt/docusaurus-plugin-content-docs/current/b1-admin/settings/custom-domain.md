---
title: "Vlastní doména"
description: "Nukreipkite savo domeną, pvz., www.yourchurch.org, į B1 svetainę B1 Admin: nustatykite DNS įrašus ir pridėkite domeną Nustatymuose."
---

Hmm, that's wrong: the target language is Lithuanian, not Czech. Here is the correct translation:

---
title: "Pasirinktinis domenas"
---

# Pasirinktinis domenas

<div class="article-intro">

Savo domeną (pavyzdžiui, **`www.yourchurch.org`**) galite nukreipti į savo B1 svetainę, kad lankytojai pasiektų ją tikru jūsų bažnyčios interneto adresu, o ne numatytuoju adresu yourchurch.b1.church.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="L5yaDusHts8" title="Pasirinktinio domeno prijungimas B1 sistemoje" next="Tiesioginio transliavimo nustatymas B1 sistemoje" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## 1 žingsnis — pirmiausia pridėkite DNS įrašą

Prieš pridedami domeną B1 sistemoje, savo domenų registratoriuje (GoDaddy, Namecheap, Cloudflare ir kt.) turite nukreipti jį į B1 serverius.

Pridėkite vieną iš šių įrašų — pirmenybė teikiama CNAME:

| Tipas | Host | Reikšmė |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Savo `www` adresui naudokite **CNAME**. Jei jūsų registratorius nepalaiko CNAME šakninio (apex) domeno atveju (be www), arba jei norite, kad veiktų ir šakninis domenas, naudokite **A įrašą**.

DNS pakeitimai gali įsigalioti nuo kelių minučių iki kelių valandų.

## 2 žingsnis — pridėkite domeną B1 sistemoje

Kai DNS nukreipiamas į B1:

1. B1 Admin sistemoje eikite į **Settings** (Nustatymai).
2. Kairiajame sąraše spustelėkite **Domains** (Domenai), tada skyriuje **Domains** spustelėkite **Edit** (Redaguoti).
3. Įveskite savo domeną į lauką ir spustelėkite **Save** (Įrašyti).

Pirmiausia spausti **+** mygtuko nereikia — domenas, įvestas į lauką, bus pridėtas įrašant. Mygtuką **+** (arba klavišą **Enter**) naudokite, kai norite prieš įrašydami pridėti kelis domenus į sąrašą.

B1 sistema SSL sertifikatą tvarko automatiškai — pirkti sertifikato nereikia.

:::warning
Jei domeną B1 sistemoje pridėsite prieš tai, kai DNS įrašai jau nustatyti, jis neįsirašys. Visada pirmiausia nustatykite DNS.
:::

## Patikrinimas, ar viskas veikia

Įrašę domeną, atidarykite jį naršyklėje. Jei rodoma jūsų B1 svetainė, viskas atlikta. Jei matote klaidą, DNS pakeitimai gali dar neįsigalioti — palaukite kelias minutes ir bandykite dar kartą.

DNS įrašų įsigaliojimą taip pat galite patikrinti svetainėje [dnschecker.org](https://dnschecker.org) — įveskite savo domeną ir patikrinkite, ar matomas jūsų CNAME arba A įrašas.
