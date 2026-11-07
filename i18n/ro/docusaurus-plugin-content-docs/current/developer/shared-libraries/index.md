---
title: "Biblioteci partajate"
description: "Documentația pachetelor npm @churchapps folosite de B1 Admin, B1.church și API-uri, plus cum configurați spațiul Packages și publicați cu changesets."
---

# Biblioteci partajate

<div class="article-intro">

Codul partajat ChurchApps este publicat pe npm sub domeniul `@churchapps/*`. Toate pachetele partajate se află într-un singur depozit -- [Packages](https://github.com/ChurchApps/Packages) -- gestionat ca un spațiu de lucru Yarn (Berry) și versionat cu [changesets](https://github.com/changesets/changesets).

</div>

## Pachete

| Pachet | Descriere | Folosit de |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers.md) | Nivel de bază: funcții ajutătoare independente de framework și interfețele TypeScript partajate care formează contractul de date comun între aplicații | Toate proiectele |
| [`@churchapps/apihelper`](./api-helper.md) | Utilitare Express pe server: autentificare, controlere de bază, acces la baza de date, integrări AWS și e-mail | Toate API-urile |
| [`@churchapps/apphelper`](./app-helper.md) | Componente React partajate și module de funcționalități (autentificare, donații, formulare, markdown, site web) | Toate aplicațiile web |
| `@churchapps/content-providers` | Abstractizare peste furnizorii externi de conținut (Lessons.church, Planning Center, Dropbox și alții) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Set de instrumente pentru crearea integrărilor B1.church: verificarea webhook-urilor, client REST tipizat, ajutoare OAuth | Dezvoltatori externi de integrări |
| `@churchapps/texting` | Abstractizare pentru furnizorii de SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Direcția dependențelor este strict descendentă: aplicațiile depind de `apihelper` și `apphelper`, care declară `@churchapps/helpers` ca **dependență de tip peer**, astfel încât fiecare aplicație să folosească exact o copie a acestuia.

## Configurarea spațiului de lucru

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Depozitul folosește Yarn Berry (câmpul `packageManager` din rădăcină este determinant) cu un singur fișier de blocare. `yarn build` construiește toate pachetele în ordinea dependențelor; `yarn test` rulează testele tuturor pachetelor.

## Lansarea cu Changesets

Fiecare modificare a unui pachet este livrată împreună cu un changeset:

1. Rulați `yarn changeset` în rădăcina spațiului de lucru. Alegeți pachetul (pachetele) modificate, tipul de creștere a versiunii (patch = remediere, minor = export sau funcționalitate nouă, major = modificare incompatibilă) și scrieți un rezumat dintr-o linie -- acesta devine intrarea din CHANGELOG.
2. Adăugați fișierul `.changeset/*.md` generat împreună cu modificarea de cod. Un hook pre-commit blochează commiturile care modifică sursa unui pachet fără un changeset pregătit (staged).
3. Când sunteți gata să publicați, rulați `yarn publish-all` în rădăcină. Acesta consumă changesetele în așteptare (crește versiunile, scrie CHANGELOG-urile, sincronizează intervalele de dependențe interne), construiește totul în ordinea dependențelor și publică pachetele actualizate pe npm. Apoi faceți commit și push pentru modificările de versiune.

:::warning
Nu rulați niciodată un `npm publish` direct în interiorul unui singur pachet -- acesta ocolește ordinea de construire și evidența versiunilor gestionată de scriptul de lansare. Publicarea necesită un cont npm cu drepturi de publicare în domeniul `@churchapps`.
:::

## Dezvoltare locală împotriva unei aplicații consumatoare

În interiorul spațiului de lucru, pachetele se construiesc direct împotriva pachetelor-surori -- nu este nevoie de link. Pentru a testa un build al unui pachet nepublicat într-o aplicație consumatoare (B1Admin, B1App etc.), adăugați în consumator un portal Yarn temporar:

```bash
# în proiectul consumator
yarn link ../Packages/helpers
# ... testare ...
yarn unlink ../Packages/helpers && yarn install
```

Construiți mai întâi pachetul (`yarn build` în rădăcina spațiului de lucru) -- consumatorul citește rezultatul compilat din `dist/`, nu sursa.

:::warning
`yarn link` scrie o rezoluție de tip portal în `package.json` al consumatorului. Nu o faceți niciodată commit -- rulați mereu `yarn unlink` și reinstalați când ați terminat.
:::
