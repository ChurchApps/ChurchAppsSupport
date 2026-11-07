---
title: "Lastna domena"
---

# Lastna domena

<div class="article-intro">

Lastno domeno (na primer **`www.yourchurch.org`**) lahko usmerite na svoje mesto B1, tako da obiskovalci pridejo na pravi spletni naslov vaše cerkve namesto privzetega naslova yourchurch.b1.church.

</div>

## Videoposnetek za usposabljanje

<YouTube id="L5yaDusHts8" title="Povezovanje lastne domene v B1" next="Nastavitev pretakanja v živo v B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Korak 1 — Najprej dodajte DNS zapis

Preden dodate domeno v B1, jo morate pri svojem registrarju domen (GoDaddy, Namecheap, Cloudflare itd.) usmeriti na strežnike B1.

Dodajte enega od teh zapisov — priporočen je CNAME:

| Vrsta | Gostitelj | Vrednost |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Za naslov `www` uporabite **CNAME**. **A zapis** uporabite, če vaš registrar ne podpira CNAME na korenski domeni (brez www) ali če želite, da deluje tudi korenska domena.

Spremembe DNS lahko začnejo veljati od nekaj minut do nekaj ur.

## Korak 2 — Dodajte domeno v B1

Ko DNS že kaže na B1:

1. V B1 Admin pojdite na **Nastavitve**.
2. V levem seznamu kliknite **Domene**, nato v razdelku **Domene** kliknite **Uredi**.
3. Vnesite svojo domeno v polje in kliknite **Shrani**.

Gumba **+** vam ni treba najprej klikniti — domena, ki ostane vpisana v polju, se doda ob shranjevanju. Gumb **+** (ali tipko **Enter**) uporabite, kadar želite pred shranjevanjem dodati več domen na seznam.

B1 samodejno poskrbi za SSL — nakup potrdila ni potreben.

:::warning
Če domeno dodate v B1, preden so DNS zapisi nastavljeni, se ne bo shranila. Vedno najprej nastavite DNS.
:::

## Preverjanje delovanja

Po shranjevanju obiščite svojo domeno v brskalniku. Če se naloži vaše mesto B1, ste opravili. Če vidite napako, se DNS morda še širi — počakajte nekaj minut in poskusite znova.

Širjenje DNS lahko preverite tudi na [dnschecker.org](https://dnschecker.org) — poiščite svojo domeno in preverite, ali se prikaže vaš CNAME ali A zapis.
