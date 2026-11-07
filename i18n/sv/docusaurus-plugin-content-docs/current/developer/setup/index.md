---
title: "Konfiguration"
---

# Konfiguration

<div class="article-intro">

Det här avsnittet guidar dig genom att konfigurera en lokal utvecklingsmiljö för ChurchApps-projekt. Du kan antingen peka din frontend mot de delade demo-API:erna för snabb utveckling, eller köra hela stacken lokalt för backend-arbete.

</div>

## Två tillvägagångssätt

Det finns två sätt att utveckla lokalt, beroende på hur mycket av stacken du behöver:

### 1. Peka mot demo-API:erna (enklast)

Om du arbetar med ett **frontend-projekt** (webbapp, mobilapp eller skrivbordsapp) är snabbaste vägen att peka din lokala app mot de delade demo-API:erna. Ingen databas eller backend-konfiguration krävs.

Bas-URL:en för demo-API:et är:

```
https://api.demo.churchapps.org
```

Varje API-modul finns på en sökväg under denna bas, till exempel:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demomiljön kör den senaste koden från `main`, och dess exempeldata fylls på nytt varje natt, så räkna inte med att något du skapar där finns kvar. (Den tidigare staging-miljön, `api.staging.churchapps.org`, har tagits ur drift. Vissa exempelfiler `.env` kan fortfarande innehålla staging-URL:er -- ersätt dem med demo- eller lokala URL:er.)

:::tip
Med det här tillvägagångssättet kan du börja göra ändringar i frontend på några minuter. Det är den rekommenderade vägen för de flesta bidragsgivare.
:::

### 2. Kör allt lokalt

Om du behöver ändra API-kod eller arbeta offline kan du köra hela stacken lokalt. Det kräver MySQL 8.0+ och ytterligare konfiguration. Se guiden [API:ets lokala konfiguration](../api/local-setup) för detaljerade instruktioner.

## Komma igång

Följ dessa sidor i ordning:

1. **[Förutsättningar](prerequisites)** -- Installera de verktyg som krävs (Node.js, Git, MySQL m.fl.)
2. **[Projektöversikt](project-overview)** -- Förstå vilka projekt som finns och vad de gör
3. **[Miljövariabler](environment-variables)** -- Konfigurera dina `.env`-filer för att koppla ihop allt

:::info
Varje ChurchApps-projekt är ett fristående Git-repository. Du behöver bara klona de specifika projekt du vill arbeta med.
:::
