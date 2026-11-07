---
title: "Variabile de mediu"
description: "Configurați .env pentru proiectele ChurchApps: API demo comun sau local și variabilele pentru B1 Admin, B1.church, B1 Mobile, Lessons.church și altele."
---

# Variabile de mediu

<div class="article-intro">

Fiecare proiect ChurchApps folosește un fișier `.env` pentru configurarea locală. Fiecare proiect include un fișier exemplu pe care îl copiezi și îl personalizezi. Această pagină descrie variabilele de mediu pentru API-uri, aplicațiile web și aplicațiile mobile, inclusiv cum să alegi între API-ul demo și cel local.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalează [cerințele preliminare](./prerequisites.md) pentru proiectul tău
- Clonează depozitul proiectului cu care vrei să lucrezi
- Consultă [Prezentarea generală a proiectului](./project-overview.md) pentru a înțelege ce module API are nevoie proiectul tău

</div>

## Model general

1. Caută `dotenv.sample.txt` sau `.env.sample` în directorul rădăcină al proiectului.
2. Copiază-l ca `.env`.
3. Editează valorile după necesitate.

```bash
# Exemplu pentru un proiect cu .env.sample
cp .env.sample .env

# Exemplu pentru un proiect cu dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nu trimite niciodată fișierele `.env` în sistemul de control al versiunilor.** Ele conțin secrete, cum ar fi datele de conectare la baza de date, cheile API și secretele JWT. Toate proiectele ChurchApps includ `.env` în `.gitignore`, dar verifică întotdeauna înainte de a face commit.
:::

## Alegerea unei ținte API

Cea mai importantă decizie este unde indică frontend-ul apelurile API. Există două opțiuni:

### Opțiunea 1: API-uri demo (recomandat pentru dezvoltarea frontend)

Folosește mediul demo partajat. Nu este necesară nicio configurare locală a API-ului sau a bazei de date. Rulează cel mai recent cod din `main`, iar datele sale de exemplu sunt reîncărcate în fiecare noapte.

```bash
# Model URL de bază
https://api.demo.churchapps.org/{module}

# Exemple de URL-uri pentru module
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Mediul de staging (`api.staging.churchapps.org`, `api.staging.lessons.church` și gazdele asociate) a fost retras. Unele fișiere `.env` exemplu pot conține încă URL-uri de staging; înlocuiește-le cu valorile demo sau locale prezentate pe această pagină. Nu există un API Lessons partajat, non-producție -- rulează [LessonsApi](https://github.com/ChurchApps/LessonsApi) local (ascultă pe portul `8090`) atunci când ai nevoie de unul.
:::

### Opțiunea 2: API local

Rulează proiectul Api pe calculatorul tău. Necesită MySQL 8.0+ cu baze de date create pentru fiecare modul. Consultă ghidul [configurarea locală a API-ului](../api/local-setup.md).

```bash
# Model URL de bază
http://localhost:8084/{module}

# Exemple de URL-uri pentru module
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variabile de mediu pentru API

Proiectul principal **Api** (`.env.sample`) are cea mai multă configurare. Iată variabilele cheie:

### Setări comune

| Variabilă | Descriere | Exemplu |
|----------|-------------|---------|
| `ENVIRONMENT` | Mediul de rulare | `dev` |
| `SERVER_PORT` | Portul HTTP pentru serverul local de dezvoltare | `8084` |
| `ENCRYPTION_KEY` | Cheie de criptare de 192 de biți pentru datele sensibile | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret pentru semnarea JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Unde se stochează fișierele încărcate (`disk` sau `s3`) | `disk` |
| `CORS_ORIGIN` | Originile CORS permise (`*` pentru dezvoltare locală) | `*` |

### Conexiunea la baza de date

Un singur URL de bază indică API-ul către MySQL. API-ul derivă câte o bază de date pentru fiecare modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) din acest URL de bază.

| Variabilă | Exemplu |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Actualizează `root:password` cu datele tale reale de conectare la MySQL. Fiecare bază de date pentru modul trebuie să existe înainte de a porni API-ul. Folosește `npm run initdb` pentru a crea schema pentru toate modulele sau `npm run initdb:membership` pentru un singur modul.
:::

### Setările WebSocket

| Variabilă | Descriere | Exemplu |
|----------|-------------|---------|
| `SOCKET_PORT` | Portul serverului WebSocket | `8087` |
| `SOCKET_URL` | URL-ul WebSocket la care se conectează clienții | `ws://localhost:8087` |

---

## Variabile de mediu pentru aplicațiile web

### B1Admin (React + Vite)

Fișier exemplu: `.env.sample`

| Variabilă | Descriere | Exemplu (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Numele mediului | `demo` |
| `PORT` | Portul serverului de dezvoltare | `3101` |
| `REACT_APP_API_BASE` | URL de bază unic pentru toate API-urile ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sunt adăugate automat) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL-ul de livrare a conținutului | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID-ul Google Analytics (opțional) | `UA-123456789-1` |

Pentru dezvoltarea cu API local, indică URL-ul de bază către stack-ul tău local:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Fișier exemplu: `.env.sample`

| Variabilă | Descriere | Exemplu (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | URL de bază unic pentru toate API-urile ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sunt adăugate automat) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL-ul de livrare a conținutului | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID-ul Google Analytics (opțional) | `UA-123456789-1` |

:::info
Next.js necesită prefixul `NEXT_PUBLIC_` pentru orice variabilă de mediu care trebuie să fie disponibilă în browser. Variabilele folosite doar pe server nu au nevoie de acest prefix.
:::

### LessonsApp (Next.js)

Fișier exemplu: `dotenv.sample.txt`

| Variabilă | Descriere | Exemplu (API Lessons local) |
|----------|-------------|----------------------------|
| `STAGE` | Etapa mediului (lasă nesetat sau `dev` pentru dezvoltare locală) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL-ul API-ului Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL-ul de livrare a conținutului | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Baza API-ului ChurchApps folosită pentru autentificare (se aplică doar când `STAGE` nu este setat sau este `dev`) | `https://api.demo.churchapps.org` |

---

## Variabile de mediu pentru aplicațiile mobile

### B1Mobile (React Native / Expo)

Fișier exemplu: `dotenv.sample.txt`

| Variabilă | Descriere | Exemplu (Demo) |
|----------|-------------|----------------|
| `STAGE` | Numele mediului | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Un URL pentru fiecare modul API ChurchApps (fiecare folosește implicit producția când nu este setat) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API-ul Lessons (gazdă separată; nu există unul partajat, non-producție) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL-ul de livrare a conținutului | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL-ul site-ului Lessons | `https://lessons.church` |

:::info
Aplicațiile mobile nu folosesc prefixul `REACT_APP_` sau `NEXT_PUBLIC_`. Accesul la variabilele de mediu este gestionat de configurarea Expo.
:::

---

## Referință rapidă: locațiile fișierelor exemplu

| Proiect | Fișier exemplu |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
