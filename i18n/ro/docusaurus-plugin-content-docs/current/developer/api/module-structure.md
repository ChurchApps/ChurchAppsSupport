---
title: "Struktura modulului"
---

# Struktura modulului

<div class="article-intro">

Fiecare modul API urmează o structură internă consecventă, cu controlere, depozite, modele și funcții ajutătoare. Înțelegerea acestei organizări face mai simplă navigarea în codul sursă și adăugarea de funcționalități noi în orice modul.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați API-ul local -- consultați [Configurarea locală a API-ului](./local-setup)
- Parcurgeți arhitectura [Bazei de date](./database) pentru a înțelege stratul de acces la date

</div>

## Structura directoarelor

Modulele se află în `src/modules/{name}/`. Un modul tipic conține patru directoare:

```
src/modules/{name}/
├── controllers/    ← Gestionarii de rute (endpoint-uri Express)
├── repositories/   ← Stratul de acces la date (interogări SQL tipizate)
├── models/         ← Interfețe și tipuri TypeScript
└── helpers/        ← Logica de business specifică modulului
```

De exemplu, modulul de membership:

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

Cele șase module de date principale -- membership, attendance, content, giving, messaging și doing -- urmează toate această structură. Câteva module specializate (cum ar fi reporting, care livrează rapoarte transversale și nu deține date proprii) se află alături de ele în `src/modules/`.

## O aplicație, multe module

API-ul este un **monolit modular**: modulele marchează limitele organizării codului și ale proprietății datelor, nu servicii separate. La pornire, controlerele fiecărui modul sunt înregistrate într-un singur container de injecție a dependențelor, în spatele unei singure aplicații Express. Astfel, întregul API se compilează, rulează și se implementează ca o unitate unică -- funcțiile implementate descrise mai jos sunt puncte de intrare în aceeași aplicație.

Rutele fiecărui modul se află sub un prefix URL care corespunde numelui modulului:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Acest lucru păstrează suprafața API-ului fiecărui modul independentă, în timp ce clienții comunică în continuare cu o singură gazdă.

## Controlere

Controlerele definesc rutele API pentru un modul. Fiecare modul are propriul controler de bază (de exemplu `MembershipBaseController`), care extinde `BaseController` partajat -- construit la rândul său pe `CustomBaseController` din `@churchapps/apihelper`. Rutele sunt înregistrate cu decoratori Inversify.

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
      // au = contextul utilizatorului autentificat
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` autentifică cererea și populează `this.repos` cu depozitele modulului înainte de a executa acțiunea dumneavoastră.

### Decoratori de rute

| Decorator | Metoda HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Decoratorul `@controller("/base")` stabilește calea de bază pentru toate rutele din controler.

## Depozite

Depozitele gestionează toate operațiunile cu baza de date. Nu există ORM -- interogările sunt scrise cu constructorul de interogări Kysely, tipizate după schema bazei de date a modulului. Fișierul `db/index.ts` al fiecărui modul expune o funcție `getDb()`, care returnează instanța Kysely tipizată a modulului.

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

În interiorul unui controler, depozitele modulului sunt disponibile ca `this.repos`. În afara controlerelor, obțineți-le prin `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Comunicarea între module

Fiecare modul își deține propria bază de date (consultați [Baza de date](./database)), iar un modul nu interoghează niciodată direct tabelele altui modul. Atunci când un modul are nevoie de date deținute de alt modul -- de exemplu, modulul doing care preia persoane din membership -- apelează **gateway-ul** modulului proprietar din `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Fiecare gateway (`MembershipModuleGateway`, `GivingModuleGateway` și altele) este o interfață TypeScript care definește exact operațiunile pe care modulul proprietar le expune restul API-ului. Interfața este contractul: implementările actuale citesc baza de date a modulului proprietar în același proces, dar, deoarece apelanții depind doar de interfață, o implementare ar putea fi înlocuită -- de exemplu, cu una care efectuează apeluri HTTP -- dacă un modul ar fi vreodată extras într-un serviciu separat.

:::info
Dacă datele de care aveți nevoie se află în alt modul, iar gateway-ul acestuia nu expune o operațiune pentru ele, extindeți interfața gateway-ului în loc să accesați depozitele sau baza de date celuilalt modul.
:::

## Autentificare și autorizare

### Autentificare JWT

Toate cererile sunt autentificate prin token-uri JWT gestionate de `CustomAuthProvider`. Token-ul este validat automat, iar contextul utilizatorului autentificat (`au`) este disponibil în fiecare acțiune a controlerului.

### Verificarea permisiunilor

Utilizați `au.checkAccess()` pentru a verifica dacă utilizatorul curent are permisiunea necesară. Permisiunile sunt constante predefinite, care combină un tip de conținut și o acțiune:

```typescript
au.checkAccess(Permissions.people.view);    // Acces de citire
au.checkAccess(Permissions.people.edit);    // Acces de scriere
```

Dacă utilizatorul nu are permisiunea necesară, se returnează automat un răspuns de eroare.

:::warning
Apelați întotdeauna `au.checkAccess()` înainte de a efectua orice operațiune asupra datelor. Nu omiteți niciodată verificările de permisiuni, nici măcar pentru endpoint-urile aparent doar de citire.
:::

## Configurarea mediului

Clasa `Environment` gestionează configurația pentru diferitele medii:

- **Dezvoltare locală:** citește din fișierul `.env` din rădăcina proiectului
- **Medii implementate:** citește din AWS SSM Parameter Store

```typescript
// Accesarea variabilelor de mediu
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Această abstractizare înseamnă că aplicația dumneavoastră nu trebuie să știe de unde provine configurația.

## Funcții Lambda

Atunci când este implementat în AWS, API-ul rulează ca șase funcții Lambda:

| Funcție | Scop |
|----------|---------|
| `web` | Gestionează toate cererile HTTP REST API |
| `socket` | Gestionează conexiunile WebSocket pentru funcțiile în timp real |
| `timer15Min` | Programată la fiecare 30 de minute pentru notificările prin e-mail (numele este istoric) |
| `timerMidnight` | Programată zilnic pentru e-mailurile de sinteză și întreținere |
| `timerScheduledTasks` | Programată zilnic pentru automatizările scadente și procesarea fluxurilor de lucru întârziate |
| `timerWebhooks` | Programată la fiecare minut pentru livrarea webhook-urilor de ieșire aflate în coadă |

:::info
Local, funcția `web` rulează pe portul 8084, iar funcția `socket` pe portul 8087. Funcțiile de tip timer pot fi declanșate manual în timpul dezvoltării.
:::

## Articole conexe

- **[Baza de date](./database)** -- Șiruri de conectare, scripturi de schemă și modele de acces la date
- **[Configurarea locală a API-ului](./local-setup)** -- Ghid complet, pas cu pas, de configurare
- **[ApiHelper](../shared-libraries/api-helper)** -- Biblioteca partajată care oferă `CustomBaseController` și middleware-ul de autentificare
