---
title: "Proměnné prostředí"
---

Oops, I should not have started that. The file is a Slovenian translation task, so the output should be in Slovenian, not Czech. Here is the corrected, complete translated file:

---
title: "Spremenljivke okolja"
---

# Spremenljivke okolja

<div class="article-intro">

Vsak projekt ChurchApps uporablja datoteko `.env` za lokalno konfiguracijo. Vsak projekt vključuje vzorčno datoteko, ki jo kopirate in prilagodite. Ta stran opisuje spremenljivke okolja za API-je, spletne aplikacije in mobilne aplikacije, vključno z izbiro med demo in lokalnim API-jem.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite [predpogoje](./prerequisites) za vaš projekt
- Klonirajte repozitorij projekta, na katerem želite delati
- Preglejte [Pregled projekta](./project-overview), da ugotovite, katere module API-ja vaš projekt potrebuje

</div>

## Splošni vzorec

1. Poiščite `dotenv.sample.txt` ali `.env.sample` v korenski mapi projekta.
2. Kopirajte ju v `.env`.
3. Po potrebi uredite vrednosti.

```bash
# Primer za projekt z .env.sample
cp .env.sample .env

# Primer za projekt z dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Datotek `.env` nikoli ne predajajte v sistem za nadzor različic.** Vsebujejo skrivnosti, kot so poverilnice za podatkovno bazo, ključi API-ja in JWT skrivnosti. Vsi projekti ChurchApps vključujejo `.env` v `.gitignore`, vendar pred predajo vedno dvakrat preverite.
:::

## Izbira cilja API-ja

Najpomembnejša odločitev je, kam vaš frontend usmerja klice API-ja. Na voljo sta dve možnosti:

### Možnost 1: Demo API-ji (priporočeno za razvoj frontenda)

Uporabite skupno demo okolje. Ni potrebna lokalna nastavitev API-ja ali podatkovne baze. Izvaja najnovejšo kodo iz `main`, njegovi vzorčni podatki pa se vsak večer ponovno napolnijo.

```bash
# Vzorec osnovnega naslova URL
https://api.demo.churchapps.org/{module}

# Primeri naslovov URL modulov
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Okolje za testiranje (`api.staging.churchapps.org`, `api.staging.lessons.church` in sorodni gostitelji) je bilo ukinjeno. Nekatere vzorčne datoteke `.env` lahko še vedno vsebujejo naslove URL okolja za testiranje; zamenjajte jih z demo ali lokalnimi vrednostmi, prikazanimi na tej strani. Skupnega nenaprodukcijskega API-ja za Lessons ni več -- kadar ga potrebujete, zaženite [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokalno (posluša na vratih `8090`).
:::

### Možnost 2: Lokalni API

Zaženite projekt Api na svojem računalniku. Potrebujete MySQL 8.0+ z ustvarjenimi podatkovnimi bazami za vsak modul. Oglejte si vodnik [lokalna nastavitev API-ja](../api/local-setup).

```bash
# Vzorec osnovnega naslova URL
http://localhost:8084/{module}

# Primeri naslovov URL modulov
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Spremenljivke okolja API-ja

Osrednji projekt **Api** (`.env.sample`) ima največ nastavitev. Tukaj so ključne spremenljivke:

### Skupne nastavitve

| Spremenljivka | Opis | Primer |
|----------|-------------|---------|
| `ENVIRONMENT` | Okolje izvajanja | `dev` |
| `SERVER_PORT` | HTTP vrata za lokalni razvojni strežnik | `8084` |
| `ENCRYPTION_KEY` | 192-bitni šifrirni ključ za občutljive podatke | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Skrivnost za podpisovanje JSON Web Tokenov | `jwt-secret-dev` |
| `FILE_STORE` | Kje shraniti naložene datoteke (`disk` ali `s3`) | `disk` |
| `CORS_ORIGIN` | Dovoljeni izvori CORS (`*` za lokalni razvoj) | `*` |

### Povezava s podatkovno bazo

Ena osnovna URL naslov kaže API na MySQL. API iz tega naslova izpelje eno podatkovno bazo na modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Spremenljivka | Primer |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Vrednost `root:password` zamenjajte z dejanskimi poverilnicami za MySQL. Vsaka podatkovna baza za posamezen modul mora obstajati, preden zaženete API. Uporabite `npm run initdb`, da ustvarite shemo za vse module, ali `npm run initdb:membership` za en sam modul.
:::

### Nastavitve WebSocket

| Spremenljivka | Opis | Primer |
|----------|-------------|---------|
| `SOCKET_PORT` | Vrata za strežnik WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket, s katerim se odjemalci povežejo | `ws://localhost:8087` |

---

## Spremenljivke okolja spletne aplikacije

### B1Admin (React + Vite)

Vzorčna datoteka: `.env.sample`

| Spremenljivka | Opis | Primer (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Ime okolja | `demo` |
| `PORT` | Vrata razvojnega strežnika | `3101` |
| `REACT_APP_API_BASE` | Ena osnovna URL za vse API-je ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se dodajo samodejno) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL za dostavo vsebine | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (neobvezno) | `UA-123456789-1` |

Za razvoj z lokalnim API-jem usmerite osnovni URL na svoj lokalni sklop:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Vzorčna datoteka: `.env.sample`

| Spremenljivka | Opis | Primer (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Ena osnovna URL za vse API-je ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se dodajo samodejno) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL za dostavo vsebine | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (neobvezno) | `UA-123456789-1` |

:::info
Next.js zahteva predpono `NEXT_PUBLIC_` za vsako spremenljivko okolja, ki mora biti na voljo v brskalniku. Spremenljivke samo za strežnik te predpone ne potrebujejo.
:::

### LessonsApp (Next.js)

Vzorčna datoteka: `dotenv.sample.txt`

| Spremenljivka | Opis | Primer (lokalni LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Stopnja okolja (pustite nenastavljeno ali `dev` za lokalni razvoj) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API-ja Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL za dostavo vsebine | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Osnova API-ja ChurchApps za prijavo (upošteva se samo, če je `STAGE` nenastavljen ali `dev`) | `https://api.demo.churchapps.org` |

---

## Spremenljivke okolja mobilne aplikacije

### B1Mobile (React Native / Expo)

Vzorčna datoteka: `dotenv.sample.txt`

| Spremenljivka | Opis | Primer (Demo) |
|----------|-------------|----------------|
| `STAGE` | Ime okolja | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | En URL za vsak modul API-ja ChurchApps (vsak je privzeto produkcijski, če ni nastavljen) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (ločen gostitelj; skupnega nenaprodukcijskega ni) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL za dostavo vsebine | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL spletnega mesta Lessons | `https://lessons.church` |

:::info
Mobilne aplikacije ne uporabljajo predpone `REACT_APP_` ali `NEXT_PUBLIC_`. Dostop do spremenljivk okolja upravlja konfiguracija Expo.
:::

---

## Hitri pregled: lokacije vzorčnih datotek

| Projekt | Vzorčna datoteka |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
