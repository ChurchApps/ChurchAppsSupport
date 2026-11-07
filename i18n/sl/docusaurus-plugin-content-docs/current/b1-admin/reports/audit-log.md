---
title: "Revizijski dnevnik"
description: "Preglejte dnevnik revizij v B1 Admin in preverite, kdo se je prijavil, uredil zapise o osebah ali spremenil dovoljenja, ter filtrirane vnose izvozite v CSV."
---

# Revizijski dnevnik

<div class="article-intro">

Revizijski dnevnik beleži vsa pomembna dejanja in spremembe v vašem sistemu za upravljanje cerkve. Uporabite ga za pregled dejavnosti prijav, sledenje tomu, kdo je spreminjal podatke o osebah, spremljanje posodobitev dovoljenj in ohranjanje odgovornosti v vaši ekipi.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun B1 Admin z dostopom strežniškega skrbnika
- Pojdite v **Nastavitve**, da najdete revizijski dnevnik

</div>

## Ogled revizijskega dnevnika

1. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu aplikacije B1 Admin) in razširite **Nastavitve**.
2. Kliknite **Revizijski dnevnik**.
3. Dnevnik prikazuje nedavne vnose v tabeli z naslednjimi stolpci:
   - **Datum** -- Kdaj se je dejanje zgodilo.
   - **Kategorija** -- Vrsta dejanja (barvno označeno za hitrejši pregled).
   - **Dejanje** -- Kaj je bilo storjeno (npr. create, update, delete, login_success).
   - **Entiteta** -- Vrsta in ID zapisa, ki je bil prizadet.
   - **IP naslov** -- IP naslov uporabnika, ki je dejanje izvedel.
   - **Podrobnosti** -- Povzetek posameznih sprememb.

## Filtriranje dnevnika

Za zoženje rezultatov uporabite filtre na vrhu strani:

- **Kategorija** -- Filtriranje po vrsti dejanja:
  - **Vse kategorije** -- Prikaže vse.
  - **Prijava** -- Uspešne in neuspešne prijave.
  - **Osebe** -- Ustvarjanje, posodabljanje ali brisanje zapisov oseb.
  - **Dovoljenja** -- Dodeljevanje in odvzemanje dovoljenj.
  - **Darovi** -- Spremembe zapisov o darovih.
  - **Skupine** -- Dejanja pri upravljanju skupin.
  - **Obrazci** -- Dejavnost oddajanja obrazcev.
  - **Nastavitve** -- Spremembe konfiguracije.
- **Začetni datum** -- Prikaže vnose od tega datuma naprej.
- **Končni datum** -- Prikaže vnose do tega datuma.

Po nastavitvi filtrov kliknite **Iskanje**, da posodobite rezultate.

## Razumevanje kategorij

Vsaka kategorija je barvno označena za hitrejšo prepoznavo:

- **Prijava** -- Modra oznaka. Beleži uspešne in neuspešne poskuse prijave.
- **Osebe** -- Vijolična oznaka. Beleži ustvarjanje, posodabljanje in brisanje zapisov oseb.
- **Dovoljenja** -- Rdeča oznaka. Beleži, kdaj so pravice dostopa dodeljene ali odvzete.
- **Darovi** -- Zelena oznaka. Beleži spremembe zapisov o darovih.
- **Skupine** -- Siva oznaka. Beleži dejanja pri upravljanju skupin.
- **Obrazci** -- Oranžna oznaka. Beleži dejavnost oddajanja obrazcev.
- **Nastavitve** -- Rumena oznaka. Beleži spremembe konfiguracije.

## Izvoz dnevnika

Ko so vnosi dnevnika prikazani, se prikaže gumb za prenos **CSV**. Kliknite ga, da trenutno filtrirane rezultate izvozite v preglednico za pregled brez povezave ali za evidenco.

## Straničenje

Za pomikanje med rezultati uporabite kontrole za straničenje na dnu tabele. Na stran lahko prikažete 25, 50 ali 100 vnosov.

:::info
Vnosi revizijskega dnevnika se samodejno hranijo eno leto. Vnosi, starejši od 365 dni, se odstranijo, da sistem ostane zmogljiv.
:::

:::tip
Revizijski dnevnik redno pregledujte, zlasti po uvajanju novih članov ekipe ali pomembnih spremembah nastavitev. Pomaga zgodaj odkriti nepričakovano dejavnost.
:::

## Sorodni članki

- [Vloge in dovoljenja](../settings/roles-permissions.md) -- Upravljanje, kdo ima dostop do česa
- [Varnost podatkov](../settings/data-security.md) -- Razumevanje, kako so vaši podatki zaščiteni
- [Pregled poročil](./index.md) -- Oglejte si vsa razpoložljiva poročila
