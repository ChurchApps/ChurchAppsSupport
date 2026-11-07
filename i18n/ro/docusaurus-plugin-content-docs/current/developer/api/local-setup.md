---
title: "Configurarea API-ului local"
---

# Configurarea API-ului local

<div class="article-intro">

Acest ghid te ghidează prin configurarea API-ului ChurchApps pentru dezvoltare locală. Vei clona depozitul, vei configura conexiunile la baza de date, vei inițializa schema și vei porni serverul de dezvoltare cu reîncărcare automată la modificări.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalează **Node.js 24+**, **Git** și **MySQL 8.0+** — vezi [Cerințe preliminare](../setup/prerequisites)
- Creează un utilizator MySQL cu privilegii de creare a bazelor de date
- Consultă documentația [Variabile de mediu](../setup/environment-variables) pentru configurarea API-ului

</div>

## Pași de configurare

### 1. Clonează depozitul

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instalează dependențele

Proiectul folosește Yarn (o protecție blochează `npm install`):

```bash
cd Api
yarn install
```

### 3. Configurează variabilele de mediu

```bash
cp .env.sample .env
```

Deschide `.env` și configurează șirurile de conexiune MySQL. Fiecare modul are nevoie de propria conexiune la baza de date, în următorul format:

```
mysql://root:password@localhost:3306/dbname
```

Ai nevoie de șiruri de conexiune pentru toate cele șase baze de date ale modulelor (membership, attendance, content, giving, messaging, doing).

### 4. Inițializează bazele de date

```bash
npm run initdb
```

Această comandă creează automat toate cele șase baze de date și tabelele lor.

:::tip
Poți inițializa baza de date a unui singur modul cu `npm run initdb -- --module=membership` (sau `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Pornește serverul de dezvoltare

```bash
npm run dev
```

API-ul pornește cu reîncărcare automată la modificări la adresa [http://localhost:8084](http://localhost:8084).

## Comenzi principale

| Comandă | Descriere |
|---------|-----------|
| `npm run dev` | Pornește serverul de dezvoltare cu reîncărcare automată (tsx watch) |
| `npm run build` | Curăță, compilează TypeScript și copiază resursele |
| `npm run test` | Rulează testele cu Jest (include măsurarea acoperirii codului) |
| `npm run test:watch` | Rulează testele în modul de urmărire |
| `npm run lint` | Rulează ESLint cu corectare automată (ESLint este singurul formatator) |

## Implementare

Mediul de staging a fost retras. API-ul se implementează în mediul demo la fiecare push în `main` și în producție prin fluxul de lucru manual **Deploy Prod**, care aplică și migrările de bază de date în așteptare. Vezi [Implementarea API-ului](../deployment/apis) pentru detalii.

## Dezvoltare locală a bibliotecilor

Dacă vrei să dezvolți o bibliotecă partajată (`@churchapps/helpers` sau `@churchapps/apihelper`) împreună cu API-ul, construiește-o în spațiul de lucru [Packages](https://github.com/ChurchApps/Packages) și adaugă un portal Yarn temporar în API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Acest lucru îți permite să testezi modificările bibliotecii cu API-ul fără a le publica pe npm. Vezi [Biblioteci partajate](../shared-libraries/#local-development-against-a-consuming-app) pentru detalii — și nu include niciodată în commit rezoluția de portal pe care o scrie comanda link în `package.json`.

## Articole conexe

- **[Baza de date](./database)** — Înțelegerea arhitecturii cu o bază de date per modul
- **[Structura modulelor](./module-structure)** — Cum sunt organizate controlerele, clasele de acces la date (repository) și modelele
- **[Biblioteci partajate](../shared-libraries/)** — Lucrul cu `@churchapps/helpers` și `@churchapps/apihelper`
