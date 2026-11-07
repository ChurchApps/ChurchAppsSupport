---
title: "Baza podatkov"
description: "Spoznajte, kako API ChurchApps razdeli podatke na šest baz MySQL, po eno za vsak modul, ter kako nastaviti in inicializirati povezave."
---

# Baza podatkov

<div class="article-intro">

API ChurchApps uporablja arhitekturo **baza-na-modul**. Vsak od šestih podatkovnih modulov ima svojo bazo MySQL z neodvisnim bazenom povezav, kar zagotavlja jasne meje podatkov, hkrati pa vse ostane znotraj ene same namestitve.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **MySQL 8.0+** -- glejte [Predpogoji](../setup/prerequisites.md)
- Nastavite nize za povezavo z bazo podatkov v datoteki `.env` -- glejte [Okoljske spremenljivke](../setup/environment-variables.md)

</div>

## Pregled arhitekture

```
Api
├── membership_db   ← Osebe, skupine, dovoljenja
├── attendance_db   ← Storitve, seje, zapisi
├── content_db      ← Strani, razdelki, elementi
├── giving_db       ← Darovi, skladi, plačila
├── messaging_db    ← Pogovori, obvestila
└── doing_db        ← Naloge, načrti, dodelitve
```

### Ključne oblikovalske odločitve

- **Ena baza na modul** -- Vsak modul vzdržuje svojo bazo MySQL z namenskim bazenom povezav (upravlja ga `KyselyPool`). To ohranja module neodvisne in omogoča samostojno razvijanje sheme.
- **Izključna lastništva** -- Tabele modula berejo in pišejo izključno kode tega modula. Ko drug modul potrebuje podatke, pokliče prehod (gateway) lastniškega modula, namesto da bi sam poizvedoval po tabelah -- glejte [Komunikacija med moduli](./module-structure.md#cross-module-communication).
- **Vzorec repozitorija brez ORM** -- Ves dostop do podatkov poteka prek razredov repozitorijev, ki z gradnikom poizvedb Kysely sestavljajo tipizirane SQL-poizvedbe nad shemo modula. To omogoča popoln nadzor nad zmogljivostjo in vedenjem poizvedb.
- **Zasnova za več najemnikov** -- Vsaka poizvedba je omejena na `churchId`. Vse tabele vsebujejo stolpec `churchId`, sloj repozitorijev pa samodejno uveljavlja ločenost najemnikov.

## Nizi za povezavo

Povezava z bazo vsakega modula je nastavljena v datoteki `.env` v standardnem formatu nizov za povezavo MySQL:

```
mysql://user:password@host:port/database
```

Na primer, lokalna razvojna nastavitev je lahko videti takole:

Vsak modul prebere svojo povezavo iz okoljske spremenljivke z imenom `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
V produkciji so nizi za povezavo shranjeni v AWS SSM Parameter Store, razred `Environment` pa jih ob zagonu prebere.
:::

## Skripti sheme

Sheme tabel so definirane kot migracije Kysely v imeniku `tools/migrations/`, razvrščene po modulih:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migracije določajo ustvarjanje tabel, indekse in spremembe sheme. Imenik `tools/dbScripts/` vsebuje demonstracijske in začetne podatke, ki jih je mogoče naložiti na shemo.

## Inicializacija baze

### Inicializacija vseh baz

```bash
npm run initdb
```

Ta ukaz ustvari vseh šest baz in za vsako zažene migracije.

### Inicializacija posameznega modula

```bash
npm run initdb -- --module=membership
```

:::tip
Pri delu na določenem modulu lahko ponovno inicializirate samo bazo tega modula, ne da bi vplivali na ostale.
:::

## Vzorec dostopa do podatkov

Repozitoriji sestavljajo poizvedbe z gradnikom poizvedb Kysely nad tipizirano shemo baze modula, pridobljeno prek funkcije `getDb()` modula. Tipična metoda repozitorija je videti takole:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repozitorije pridobimo prek `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
V poizvedbe vedno vključite `churchId`, da ohranite izolacijo med najemniki. Nikoli ne poizvedujte čez meje najemnikov, razen če imate za to specifičen in pooblaščen razlog.
:::

## Sklici med moduli

Ker podatki vsakega modula živijo v ločeni bazi, med mejami modulov ni tujih ključev ali SQL-spojev. Zapis, ki se nanaša na podatke drugega modula, shrani id tega zapisa -- na primer darilo v bazi giving vsebuje `personId` osebe iz baze membership -- vsa sestavljanja podatkov med moduli pa potekajo v aplikacijski kodi.

Ta omejitev naredi meje modulov resnične: vsaka shema se lahko razvija neodvisno, baza modula se lahko premakne na svoj strežnik, modul pa bi lahko celo izločili v samostojno storitev, ne da bi razpletali skupne tabele ali poizvedbe čez več baz.

## Sorodni članki

- **[Struktura modula](./module-structure.md)** -- Kako so krmilniki in repozitoriji organizirani znotraj vsakega modula
- **[Lokalna namestitev API-ja](./local-setup.md)** -- Celoten korak za korakom vodnik za namestitev
