---
title: "Nastavenie"
description: "Lokálny vývoj projektov ChurchApps: frontend so zdieľanými demo API, alebo celý systém lokálne s MySQL pre zmeny v backende."
---

# Nastavenie

<div class="article-intro">

Táto časť vás prevedie nastavením lokálneho vývojového prostredia pre projekty ChurchApps. Buď môžete svoj frontend nasmerovať na zdieľané demo API pre rýchly vývoj, alebo môžete celý zásobník spustiť lokálne pre prácu na backende.

</div>

## Dva prístupy

Lokálne vývoj môžete robiť dvoma spôsobmi, v závislosti od toho, koľko zásobníka potrebujete:

### 1. Pripojenie k demo API (najjednoduchšie)

Ak pracujete na **frontendovom projekte** (webová aplikácia, mobilná aplikácia alebo desktopová aplikácia), najrýchlejšou cestou je nasmerovať svoju lokálnu aplikáciu na zdieľané demo API. Nie je potrebná žiadna databáza ani nastavenie backendu.

Základná URL adresa demo API je:

```
https://api.demo.churchapps.org
```

Každý modul API je dostupný na ceste pod touto základnou adresou, napríklad:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demo prostredie beží na najnovšom kóde z vetvy `main` a jeho ukážkové dáta sa obnovujú každú noc, takže nepredpokladajte, že čokoľvek, čo tam vytvoríte, vydrží. (Bývalé staging prostredie `api.staging.churchapps.org` bolo vyradené. Niektoré ukážkové súbory `.env` môžu stále obsahovať staging URL adresy -- nahraďte ich URL adresami demo alebo lokálneho prostredia.)

:::tip
Tento prístup vám umožní začať robiť zmeny vo frontende už za pár minút. Je to odporúčaná cesta pre väčšinu prispievateľov.
:::

### 2. Spustenie všetkého lokálne

Ak potrebujete upravovať kód API alebo pracovať offline, môžete celý zásobník spustiť lokálne. To vyžaduje MySQL 8.0+ a ďalšiu konfiguráciu. Podrobné pokyny nájdete v návode [Lokálne nastavenie API](../api/local-setup.md).

## Začíname

Postupujte podľa týchto stránok v uvedenom poradí:

1. **[Požiadavky](./prerequisites.md)** -- Nainštalujte potrebné nástroje (Node.js, Git, MySQL atď.)
2. **[Prehľad projektov](./project-overview.md)** -- Zistite, ktoré projekty existujú a čo robia
3. **[Premenné prostredia](./environment-variables.md)** -- Nakonfigurujte svoje súbory `.env`, aby sa všetko prepojilo

:::info
Každý projekt ChurchApps je samostatný repozitár Git. Stiahnuť (klonovať) potrebujete len konkrétny projekt alebo projekty, na ktorých chcete pracovať.
:::
