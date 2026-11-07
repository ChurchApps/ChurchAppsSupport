---
title: "Furnizor de conținut FreePlay"
description: "Ce trebuie să ofere un furnizor de conținut pentru a conecta o bibliotecă de lecții la FreePlay: logo, autentificare, catalog, playlisturi și formate media."
---

# Furnizor de conținut FreePlay

<div class="article-intro">

FreePlay este playerul media al ChurchApps pentru transmiterea lecțiilor și a altor conținuturi video pe telefoane, tablete și televizoare. Dacă aveți o bibliotecă de conținut pentru lecții și doriți să o puneți la dispoziție în FreePlay, acest ghid acoperă tot ce trebuie să furnizați.

</div>

## Branding

Înainte de a putea începe integrarea, avem nevoie de:

- **Logo** -- O imagine a logoului în format **16:9** (folosită pentru cardurile furnizorilor din interfața FreePlay)
- **Numele brandului** -- Numele preferat pentru organizația dumneavoastră, care va fi afișat în FreePlay

## Endpoint-uri API

FreePlay comunică cu serviciul dumneavoastră printr-un set mic de endpoint-uri REST. Scriem un adaptor personalizat pentru fiecare furnizor, așa că structura exactă a URL-urilor este flexibilă, dar informațiile de mai jos sunt cele de care avem nevoie.

### Autentificare

Alegeți modelul care se potrivește conținutului dumneavoastră:

| Model | Când se utilizează | Ce avem nevoie |
|-------|-------------|--------------|
| **Niciunul** | Conținut public, fără autentificare | Nimic -- apelăm direct endpoint-urile de catalog |
| **OAuth (PKCE)** | Autentificare pe web/mobil | URL de autorizare, endpoint pentru schimbul de token-uri, ID-ul clientului, scope-urile |
| **Device Flow** | Recomandat pentru aplicațiile TV (utilizatorul introduce un cod scurt pe telefon) | Endpoint pentru autorizarea dispozitivului, endpoint pentru interogarea token-ului, ID-ul clientului |

:::tip
Dacă conținutul dumneavoastră necesită autentificare, endpoint-ul de autentificare returnează un **token de utilizator** pe care FreePlay îl transmite endpoint-urilor de navigare și de lecții pentru a autoriza accesul.
:::

### Navigare / Catalog

Un endpoint (sau un set de endpoint-uri) care returnează un **arbore de foldere** cu toate lecțiile disponibile.

- Acesta poate fi un **singur apel** care returnează întregul arbore sau **mai multe apeluri**, fiecare returnând un singur nivel pe măsură ce utilizatorul navighează mai adânc.
- Fiecare element din arbore ar trebui să includă:

| Câmp | Obligatoriu | Descriere |
|-------|----------|-------------|
| `id` | Da | Un identificator unic pentru folder |
| `name` | Da | Numele folderului afișat |
| `thumbnail` | Recomandat | URL-ul unei miniaturi în format **16:9** |

### Playlist-ul lecției

Un endpoint care returnează **playlist-ul fișierelor media** pentru o singură lecție.

Fiecare element din playlist ar trebui să includă:

| Câmp | Obligatoriu | Descriere |
|-------|----------|-------------|
| `title` | Da | Titlul afișat al elementului media |
| `mediaType` | Da | `video` sau `image` |
| `url` | Da | Link direct de descărcare a fișierului (vezi [Formate media](#media-formats) mai jos) |
| `thumbnail` | Recomandat | O imagine miniatură pentru element |
| `duration` | Recomandat | Durata în secunde (pentru videoclipuri) |

## Formate media

FreePlay descarcă fișierele direct, deci fiecare element media trebuie să aibă un **link direct** (fără playere încorporate sau redirecționări de pagini).

| Tip | Formate acceptate |
|------|-----------------|
| Video | **MP4** (obligatoriu pentru redare pe mai multe platforme, pe dispozitivele Apple și Android) |
| Imagine | JPG, PNG sau GIF |

## Note

- Un **REST API care returnează JSON** este modelul tipic de integrare, dar, deoarece scriem un adaptor personalizat pentru fiecare furnizor, putem lucra cu aproape orice format de API.
- Dacă sunteți interesat să deveniți furnizor de conținut pentru FreePlay, contactați-ne pe [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) sau deschideți un issue pe [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
