---
title: "Setup"
---

# Setup

<div class="article-intro">

Deze sectie leidt u door het instellen van een lokale ontwikkelomgeving voor ChurchApps-projecten. U kunt uw frontend naar gedeelde staging API's wijzen voor snelle ontwikkeling, of voer de volledige stack lokaal uit voor backendwerk.

</div>

## Twee Benaderingen

Er zijn twee manieren om lokaal te ontwikkelen, afhankelijk van hoeveel van de stack u nodig hebt:

### 1. Wijzen naar Staging API's (Gemakkelijkst)

Als u aan een **frontend-project** (web-app, mobiele app of desktop-app) werkt, is het snelste pad om uw lokale app naar de gedeelde staging API's te wijzen. Geen database- of backendsetup vereist.

De staging API-basis-URL is:

```
https://api.staging.churchapps.org
```

Elke API-module is beschikbaar onder een pad onder dit basispad, bijvoorbeeld:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Deze benadering stelt u in staat om in minuten frontend-wijzigingen aan te brengen. Het is het aanbevolen pad voor de meeste medewerkers.
:::

### 2. Alles Lokaal Uitvoeren

Als u API-code moet aanpassen of offline moet werken, kunt u de volledige stack lokaal uitvoeren. Dit vereist MySQL 8.0+ en aanvullende configuratie. Zie de [API lokale setup](../api/local-setup)-gids voor gedetailleerde instructies.

## Aan De Slag

Volg deze pagina's in volgorde:

1. **[Prerequisites](prerequisites)** -- Installeer de vereiste tools (Node.js, Git, MySQL, enz.)
2. **[Project Overview](project-overview)** -- Begrijp welke projecten bestaan en wat zij doen
3. **[Environment Variables](environment-variables)** -- Configureer uw `.env`-bestanden om alles te verbinden

:::info
Elk ChurchApps-project is een onafhankelijke Git-repository. U hoeft alleen de specifieke project(en) te klonen die u wilt gebruiken.
:::
