---
title: "Struktura modula"
description: "Pojasni razporeditev modulov API-ja (krmilniki, repozitoriji, prehodi, preverjanja dovoljenj) ter šest funkcij Lambda, ki poganjajo kodo v okoljih B1."
---

# Struktura modula

<div class="article-intro">

Vsak modul API-ja sledi dosledni notranji strukturi s krmilniki, repozitoriji, modeli in pomožnimi funkcijami. Če razumete to zgradbo, se boste lažje znašli v kodi in dodali novo funkcionalnost kateremukoli modulu.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite API lokalno -- glejte [Lokalna nastavitev API-ja](./local-setup.md)
- Preglejte arhitekturo [baze podatkov](./database.md), da razumete plast za dostop do podatkov

</div>

## Razporeditev imenikov

Moduli so v mapi `src/modules/{name}/`. Tipičen modul vsebuje štiri imenike:

```
src/modules/{name}/
├── controllers/    ← Obdelovalci poti (Express končne točke)
├── repositories/   ← Plast za dostop do podatkov (tipizirane SQL poizvedbe)
├── models/         ← TypeScript vmesniki in tipi
└── helpers/        ← Poslovna logika, specifična za modul
```

Na primer, modul za članstvo:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Šest osnovnih podatkovnih modulov -- članstvo, obiskovanje, vsebina, darovanja, sporočanje in delo -- sledi vsem tej razporeditvi. Nekaj specializiranih modulov (na primer poročanje, ki zagotavlja poročila čez več modulov in nima lastnih podatkov) stoji ob njih v mapi `src/modules/`.

## Ena aplikacija, mnogo modulov

API je **modularni monolit**: moduli označujejo meje organizacije kode in lastništva podatkov, ne ločenih storitev. Ob zagonu se krmilniki vsakega modula registrirajo v en sam vsebnik za vbrizgavanje odvisnosti (dependency injection) znotraj ene same Express aplikacije, zato se celoten API zgradi, zažene in namesti kot ena enota -- vse nameščene funkcije, opisane spodaj, so vstopne točke v to isto aplikacijo.

Poti vsakega modula so pod URL predpono, ki ustreza imenu modula:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

To ohranja API površino vsakega modula samostojno, odjemalci pa vseeno komunicirajo z enim samim gostiteljem.

## Krmilniki

Krmilniki določajo API poti za modul. Vsak modul ima svoj osnovni krmilnik (na primer `MembershipBaseController`), ki razširja skupni `BaseController` -- ta pa temelji na `CustomBaseController` iz `@churchapps/apihelper`. Poti se registrirajo z dekoratorji Inversify.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = kontekst avtenticiranega uporabnika
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` preveri avtentikacijo zahteve in pred izvedbo vaše akcije napolni `this.repos` z repozitoriji modula.

### Dekoratorji poti

| Dekorator | HTTP metoda |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekorator `@controller("/base")` nastavi osnovno pot za vse poti v krmilniku.

## Repozitoriji

Repozitoriji obravnavajo vse operacije nad podatkovno bazo. ORM ni uporabljen -- poizvedbe so napisane z graditeljem poizvedb Kysely, tipiziranim glede na podatkovno shemo modula. Datoteka `db/index.ts` vsakega modula izpostavi funkcijo `getDb()`, ki vrne tipizirano Kysely instanco modula.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Znotraj krmilnika so repozitoriji modula na voljo kot `this.repos`. Zunaj krmilnikov jih pridobite prek `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Komunikacija med moduli

Vsak modul ima lastno podatkovno bazo (glejte [Baza podatkov](./database.md)), modul pa nikoli neposredno ne poizveduje po tabelah drugega modula. Kadar en modul potrebuje podatke, ki pripadajo drugemu -- na primer modul za delo, ki razreši osebe iz članstva -- to opravi prek **prehoda** (gateway) lastniškega modula v `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Vsak prehod (`MembershipModuleGateway`, `GivingModuleGateway` in tako naprej) je vmesnik TypeScript, ki natančno določa, katere operacije lastniški modul izpostavi ostalemu API-ju. Vmesnik je pogodba: trenutne izvedbe berejo podatkovno bazo lastniškega modula znotraj istega procesa, ker pa klicatelji niso odvisni od izvedbe, ampak zgolj od vmesnika, bi lahko izvedbo zamenjali -- na primer z izvedbo, ki pošilja HTTP zahteve -- če bi kdaj modul izločili v ločeno storitev.

:::info
Če podatki, ki jih potrebujete, živijo v drugem modulu in njegov prehod te operacije ne izpostavlja, razširite vmesnik prehoda namesto da posegate v repozitorije ali podatkovno bazo drugega modula.
:::

## Avtentikacija in avtorizacija

### Avtentikacija JWT

Vse zahteve se avtenticirajo s pomočjo JWT žetonov, ki jih obdeluje `CustomAuthProvider`. Žeton se samodejno preveri, kontekst avtenticiranega uporabnika (`au`) pa je na voljo v vsaki akciji krmilnika.

### Preverjanje dovoljenj

Uporabite `au.checkAccess()`, da preverite, ali ima trenutni uporabnik potrebno dovoljenje. Dovoljenja so vnaprej določene konstante, ki združujejo vrsto vsebine in dejanje:

```typescript
au.checkAccess(Permissions.people.view);    // Dostop za branje
au.checkAccess(Permissions.people.edit);    // Dostop za pisanje
```

Če uporabnik nima potrebnega dovoljenja, se samodejno vrne napaka.

:::warning
Vedno pokličite `au.checkAccess()` pred kakršnimkoli delom s podatki. Preverjanja dovoljenj nikoli ne izpuščajte, tudi pri končnih točkah, ki se zdijo zgolj za branje.
:::

## Konfiguracija okolja

Razred `Environment` upravlja konfiguracijo v različnih okoljih:

- **Lokalni razvoj:** bere iz datoteke `.env` v korenu projekta
- **Nameščena okolja:** bere iz AWS SSM Parameter Store

```typescript
// Dostop do okoljskih spremenljivk
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Ta abstrakcija pomeni, da vaša koda ne potrebuje vedeti, od kod prihaja konfiguracija.

## Funkcije Lambda

Ko je API nameščen v AWS, teče kot šest funkcij Lambda:

| Funkcija | Namen |
|----------|-------|
| `web` | Obdeluje vse zahteve HTTP REST API |
| `socket` | Upravlja povezave WebSocket za funkcije v realnem času |
| `timer15Min` | Razporejena vsakih 30 minut za e-poštna obvestila (ime je zgodovinsko) |
| `timerMidnight` | Razporejena dnevno za povzetke po e-pošti in vzdrževanje |
| `timerScheduledTasks` | Razporejena dnevno za zapadle avtomatizacije in obdelavo zamujenih delovnih tokov |
| `timerWebhooks` | Razporejena vsako minuto za dostavo čakajočih odhodnih webhookov |

:::info
Lokalno funkcija `web` teče na vratih 8084, funkcija `socket` pa na vratih 8087. Časovne funkcije lahko med razvojem sprožite ročno.
:::

## Sorodni članki

- **[Baza podatkov](./database.md)** -- Nizi za povezavo, skripti sheme in vzorci dostopa do podatkov
- **[Lokalna nastavitev API-ja](./local-setup.md)** -- Celoten vodnik za nastavitev korak za korakom
- **[ApiHelper](../shared-libraries/api-helper.md)** -- Skupna knjižnica, ki ponuja `CustomBaseController` in vmesno programsko opremo za avtentikacijo
