---
title: "Configurare"
description: "Alegeți cum lucrați local la proiectele ChurchApps: frontend pe API-urile demo comune sau stack complet local cu MySQL pentru modificări backend."
---

# Configurare

<div class="article-intro">

Această secțiune vă ghidează prin configurarea unui mediu local de dezvoltare pentru proiectele ChurchApps. Puteți fie să indicați frontend-ul către API-urile demo comune, pentru dezvoltare rapidă, fie să rulați întreaga stivă local, pentru lucru pe backend.

</div>

## Două abordări

Există două moduri de a dezvolta local, în funcție de cât din stivă aveți nevoie:

### 1. Indicarea către API-urile demo (cea mai simplă)

Dacă lucrați la un **proiect frontend** (aplicație web, aplicație mobilă sau aplicație desktop), cea mai rapidă cale este să indicați aplicația locală către API-urile demo comune. Nu este necesară nicio configurare de bază de date sau de backend.

Adresa de bază a API-ului demo este:

```
https://api.demo.churchapps.org
```

Fiecare modul API este disponibil sub o cale din această adresă, de exemplu:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Mediul demo rulează ultimul cod din `main`, iar datele sale de exemplu sunt reîncărcate în fiecare noapte, așa că nu vă așteptați ca ceea ce creați acolo să persiste. (Fostul mediu de staging, `api.staging.churchapps.org`, a fost retras. Unele fișiere `.env` de exemplu pot încă listează adresele de staging -- înlocuiți-le cu adresele demo sau locale.)

:::tip
Această abordare vă permite să începeți modificările frontend în câteva minute. Este calea recomandată pentru majoritatea contributorilor.
:::

### 2. Rularea totală local

Dacă trebuie să modificați codul API sau să lucrați offline, puteți rula întreaga stivă local. Aceasta necesită MySQL 8.0+ și configurare suplimentară. Consultați ghidul [configurarea locală a API-ului](../api/local-setup.md) pentru instrucțiuni detaliate.

## Primii pași

Urmați aceste pagini în ordine:

1. **[Cerințe preliminare](./prerequisites.md)** -- Instalați instrumentele necesare (Node.js, Git, MySQL etc.)
2. **[Prezentarea generală a proiectelor](./project-overview.md)** -- Aflați ce proiecte există și ce fac
3. **[Variabile de mediu](./environment-variables.md)** -- Configurați fișierele `.env` pentru a conecta totul între ele

:::info
Fiecare proiect ChurchApps este un depozit Git independent. Trebuie să clonați doar proiectul sau proiectele specifice la care doriți să lucrați.
:::
