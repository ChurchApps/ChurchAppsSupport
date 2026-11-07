---
title: "Helpers"
description: "Pachetul @churchapps/helpers: ce oferă, ce aplicații îl folosesc, build local în spațiul Packages și publicarea prin changesets."
---

# Helpers

<div class="article-intro">

Pachetul `@churchapps/helpers` oferă utilitare de bază folosite de toate proiectele ChurchApps, atât pe partea de frontend, cât și pe cea de backend. Este independent de framework și include ajutoare comune precum `DateHelper`, `ApiHelper`, `CurrencyHelper`, precum și interfețele TypeScript partajate, care formează contractul de date dintre aplicații și API-uri.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **Node.js** și **Git** -- consultați [Cerințe preliminare](../setup/prerequisites.md)
- Familiarizați-vă cu configurarea [spațiului de lucru Packages](./index.md) și cu fluxul de lansare

</div>

## Cine îl folosește

Fiecare API ChurchApps (Api-ul principal, AskApi și LessonsApi) și fiecare frontend web (B1Admin, B1App, B1Transfer, LessonsApp) depinde direct de acest pachet. Frontend-urile primesc, de asemenea, multe dintre exporturile sale (`ApiHelper`, `DateHelper`, `UserHelper` și alte interfețe), re-exportate prin [`@churchapps/apphelper`](./app-helper.md). Celelalte pachete partajate îl declară ca dependență de tip peer, astfel încât fiecare aplicație să utilizeze exact o singură copie.

## Configurarea pentru dezvoltare locală

Acest pachet se află în spațiul de lucru [Packages](https://github.com/ChurchApps/Packages), alături de celelalte biblioteci partajate:

1. Clonați spațiul de lucru:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instalați dependențele în rădăcina spațiului de lucru:

   ```bash
   cd Packages && yarn install
   ```

3. Compilați (transformă TypeScript în `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Sau rulați `yarn build` în rădăcină pentru a compila toate pachetele în ordinea dependențelor.

Pentru a testa modificările într-un proiect consumator, folosiți un portal Yarn temporar -- consultați [Dezvoltare locală cu o aplicație consumatoare](./index.md#local-development-against-a-consuming-app).

## Publicarea

Lansările se fac prin changesets, nu prin modificarea manuală a versiunilor:

1. Rulați `yarn changeset` în rădăcina spațiului de lucru, selectați `@churchapps/helpers` cu tipul de actualizare potrivit și includeți fișierul changeset generat în commit-ul modificării.
2. Când sunteți gata să lansați, rulați `yarn publish-all` în rădăcină -- acesta actualizează versiunile, scrie CHANGELOG-urile, compilează în ordinea dependențelor și publică pe npm.

Noile interfețe partajate se adaugă în `helpers/src/interfaces/` și sunt re-exportate prin fișierul barrel al pachetului. Catalogul de tipuri de elemente al constructorului de site-uri (`ElementTypes.ts` -- 35 de tipuri cu schemele lor de răspunsuri) se află, de asemenea, aici; este contractul comun utilizat de randatorii din apphelper, de formularele editorului din B1Admin și de prompturile de generare AI (consultați [Arhitectura constructorului de site-uri](../architecture/website-builder.md)).

:::warning
Deoarece acest pachet este folosit de fiecare proiect ChurchApps, modificările aduse aici au un impact larg. O lansare a `helpers` actualizează automat `apihelper` și `apphelper`, astfel încât intervalele lor de dependențe să rămână actuale. Testați cu un portal Yarn în cel puțin un API consumator și într-o aplicație web consumatoare înainte de publicare.
:::

## Articole înrudite

- **[ApiHelper](./api-helper.md)** -- Utilitare pe partea de server care depind de acest pachet
- **[AppHelper](./app-helper.md)** -- Componente React care depind de acest pachet
- **[Prezentare generală a bibliotecilor partajate](./index.md)** -- Configurarea spațiului de lucru, fluxul de lansare și fluxul de legare locală
