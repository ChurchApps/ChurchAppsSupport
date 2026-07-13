---
title: "Selvhosting på Railway"
---

# Selvhosting på Railway

<div class="article-intro">

ChurchApps publiserer en enkelt-klikk Railway-mal som gir kirken din sin egen private instans av B1 Admin, B1 medlemmer-portal, API-en og MySQL-database -- alt kjørende på infrastruktur du eier og betaler for direkte. Denne guiden får deg live på omtrent 15 minutter.

</div>

## Rask start

1. Klikk på Deploy-knappen.
2. Logg på Railway (eller opprett en gratis konto) og legg til betalingsmåte.
3. Klikk på Deploy uten å endre noe.
4. Vent 5-10 minutter for at de fire tjenestene blir grønne.
5. Åpne B1Admin-tjeneste-URL, klikk på Registrer og opprett kontoen din.
6. Følg in-app-meldingene for å opprette din første kirke.

Det er det. Du har nå en fullt fungerende ChurchApps-instans.

:::tip
Implementeringen er for tiden i beta. Hvis du treffer noe dokumentasjonen ikke dekker, åpne et problem på [github.com/`ChurchApps/Api`/issues](https://github.com/`ChurchApps/Api`/issues) med implementerings-logger vedlagt.
:::

## Hva som blir implementert

Malen forsyner fire tjenester:

| Tjeneste | Formål |
|---------|--------|
| **MySQL** | Lagrer alle data |
| **Api** | Bakende for medlemskap og innhold |
| **B1Admin** | Stab/admin-nettapp |
| **B1App** | Medlemmer-vendt nettapp |

## Første gangs konfigurering

Nå som du er oppe, her er tingene de fleste kirkene setter opp neste.

### 1. E-post (Sterkt anbefalt)

Uten e-post kan medlemmer ikke tilbakestille glemte passord. Oppsettet av SMTP tar omtrent 5 minutter.

I Railway-dashbord åpner du Api-tjenesten → Variabler, og legger til:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

### 2. Tilpassede domener

For hver nettjeneste (B1Admin og B1App):

1. Åpne tjenesten i Railway → Innstillinger → Nettverk.
2. Klikk på + Tilpasset domene og skriv inn vertsnavnet.
3. Legg til CNAME-posten Railway viser deg i DNS-leverandøren din.
4. Vent noen få minutter for DNS-forplantning.

### 3. Nettgaver (Stripe / PayPal)

Gaver er konfigurert per-kirke inne i admin-grensesnittet.

1. Få utviklels-legitimasjon fra Stripe eller PayPal.
2. I B1 Admin, gå til Innstillinger → Gaver-innstillinger.
3. Velg leverandør og lim inn nøklene.

## Oppdatering

Pushes til `main` på ChurchApps-repoene utløser automatiske gjenimplementeringer.

## Relaterte artikler

- **[Innledende oppsett](../../getting-started/initial-setup)** -- Første skritt etter at kirken er opprettet
- **[Lokalt API-oppsett](../api/local-setup)** -- Kjørende stakken lokalt for utvikling

