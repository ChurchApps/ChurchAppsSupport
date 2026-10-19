---
title: "Oppsett"
---

# Oppsett

<div class="article-intro">

Denne delen går deg gjennom oppsett av et lokalt utviklingsmiljø for ChurchApps-prosjektene. Du kan enten peke frontend-en din mot de delte demo-API-ene for rask utvikling, eller kjøre hele stacken lokalt for backend-arbeid.

</div>

## To tilnærminger

Det finnes to måter å utvikle lokalt på, avhengig av hvor mye av stacken du trenger:

### 1. Bruk demo-API-ene (enklest)

Hvis du jobber med et **frontend-prosjekt** (web-app, mobilapp eller skrivebordsapp), er raskeste vei å peke den lokale appen din mot de delte demo-API-ene. Ingen database eller backend-oppsett kreves.

Basis-URL-en for demo-API-et er:

```
https://api.demo.churchapps.org
```

Hver API-modul er tilgjengelig under en sti under denne basen, for eksempel:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demo-miljøet kjører den nyeste koden fra `main`, og eksempeldataene fylles på nytt hver natt, så ikke forvent at noe du oppretter der varer. (Det tidligere staging-miljøet, `api.staging.churchapps.org`, er avviklet. Noen eksempel-`.env`-filer kan fortsatt liste staging-URL-er – erstatt dem med demo- eller lokale URL-er.)

:::tip
Denne tilnærmingen lar deg begynne å gjøre frontend-endringer på få minutter. Det er den anbefalte veien for de fleste bidragsytere.
:::

### 2. Kjør alt lokalt

Hvis du må endre API-kode eller jobbe offline, kan du kjøre hele stacken lokalt. Dette krever MySQL 8.0+ og ekstra konfigurasjon. Se guiden [API-oppsett lokalt](../api/local-setup) for detaljerte instruksjoner.

## Komme i gang

Følg disse sidene i rekkefølge:

1. **[Forutsetninger](prerequisites)** – installer de nødvendige verktøyene (Node.js, Git, MySQL osv.)
2. **[Prosjektoversikt](project-overview)** – forstå hvilke prosjekter som finnes og hva de gjør
3. **[Miljøvariabler](environment-variables)** – konfigurer `.env`-filene dine for å koble alt sammen

:::info
Hvert ChurchApps-prosjekt er et uavhengig Git-repositorium. Du trenger bare å klone de spesifikke prosjektene du vil jobbe med.
:::
