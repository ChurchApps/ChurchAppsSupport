---
title: "Oppsett"
---

# Oppsett

<div class="article-intro">

Denne seksjonen veileder deg gjennom oppsett av et lokalt utviklingsmiljø for ChurchApps-prosjekter. Du kan enten peke frontenden din mot delte staging-API-er for rask utvikling, eller kjøre hele stacken lokalt for backend-arbeid.

</div>

## To tilnærminger

Det finnes to måter å utvikle lokalt på, avhengig av hvor mye av stacken du trenger:

### 1. Pek mot staging-API-er (enklest)

Hvis du jobber med et **frontend-prosjekt** (webapp, mobilapp eller skrivebordsapp), er den raskeste veien å peke den lokale appen din mot de delte staging-API-ene. Ingen database- eller backend-oppsett er nødvendig.

Staging API base-URL er:

```
https://api.staging.churchapps.org
```

Hver API-modul er tilgjengelig på en sti under denne basen, for eksempel:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Denne tilnærmingen lar deg begynne å gjøre frontend-endringer på få minutter. Det er den anbefalte veien for de fleste bidragsytere.
:::

### 2. Kjør alt lokalt

Hvis du trenger å endre API-kode eller jobbe offline, kan du kjøre hele stacken lokalt. Dette krever MySQL 8.0+ og ekstra konfigurasjon. Se guiden [Lokalt API-oppsett](../api/local-setup) for detaljerte instruksjoner.

## Kom i gang

Følg disse sidene i rekkefølge:

1. **[Forutsetninger](prerequisites)** -- Installer nødvendige verktøy (Node.js, Git, MySQL, osv.)
2. **[Prosjektoversikt](project-overview)** -- Forstå hvilke prosjekter som finnes og hva de gjør
3. **[Miljøvariabler](environment-variables)** -- Konfigurer `.env`-filene dine for å koble alt sammen

:::info
Hvert ChurchApps-prosjekt er et uavhengig Git-repository. Du trenger bare å klone det/de spesifikke prosjektet/prosjektene du vil jobbe med.
:::
