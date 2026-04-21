---
title: "Setup"
---

# Setup

<div class="article-intro">

Dette afsnit guider dig gennem opsætning af et lokalt udvikling miljø til ChurchApps-projekter. Du kan enten pege din frontend på delte staging API'er til hurtig udvikling, eller køre hele stakken lokalt til backend-arbejde.

</div>

## To tilgange

Der er to måder at udvikle lokalt på, afhængigt af hvor meget af stakken du har brug for:

### 1. Peg på Staging API'er (Lettest)

Hvis du arbejder på et **frontend-projekt** (webapp, mobilapp eller skrivebordsprogram), er den hurtigste vej at pege din lokale app på de delte staging API'er. Ingen database- eller backend-setup påkrævet.

Basis-URL'en for staging API er:

```
https://api.staging.churchapps.org
```

Hvert API-modul er tilgængeligt på en sti under denne base, for eksempel:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Denne tilgang lader dig begynde at foretage frontend-ændringer på få minutter. Det er den anbefalede vej for de fleste bidragydere.
:::

### 2. Kør alt lokalt

Hvis du har brug for at ændre API-kode eller arbejde offline, kan du køre hele stakken lokalt. Dette kræver MySQL 8.0+ og yderligere konfiguration. Se vejledningen [Lokalt API Setup](../api/local-setup) for detaljerede instruktioner.

## Kom i gang

Følg disse sider i orden:

1. **[Forudsætninger](prerequisites)** -- Installer de påkrævede værktøjer (Node.js, Git, MySQL osv.)
2. **[Projektoversigt](project-overview)** -- Forstå, hvilke projekter der eksisterer, og hvad de gør
3. **[Miljøvariabler](environment-variables)** -- Konfigurér dine `.env`-filer til at forbinde alt sammen

:::info
Hvert ChurchApps-projekt er et uafhængigt Git-lager. Du behøver kun at klone det/de specifikke projekt(er), du vil arbejde med.
:::
