---
title: "Valg af en servin"
---

# Valg af en servin

<div class="article-intro">

Det første trin i hver check-in er at vælge hvilken servin du deltager i. Servin skærmen vises lige efter appen er færdig med at indlæse og bestemmer hvilke servin tider og grupper, der er tilgængelige resten af check-in flowet.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- [Log ind](../getting-started/logging-in) på B1 Church Checkin appen og vælg din kirke
- Sørg for, at din kirke administrator har [konfigureret serviner og servin tider](../../b1-admin/attendance/setup.md) i B1 Admin

</div>

## Sådan fungerer det

1. Efter login (eller efter auto-login på genbrug), viser appen **servin skærmen**.
2. Du vil se en liste af alle serviner, som er konfigureret til din kirke. Hver servin vises som et kort, der viser servinen navn (f.eks. "Søndag morgen" eller "Onsdag aften").
3. Tryk på den servin, du deltager i.

Appen indlæser servin tiderne og grupperne forbundet med den servin og tager dig derefter til [medlems opslags skærmen](./looking-up-members).

:::info
Serviner er konfigureret af din kirke administrator i B1 Admin under afsnittet Fremmøde. Hvis du ikke ser den servin, du forventer, bed din admin om at verificere den er oprettet i [fremmøde opsætningen](../../b1-admin/attendance/setup.md).
:::

## Hvad der sker i baggrunden

Når du vælger en servin, henter appen tre ting fra serveren:

- **Servin tiderne** til den servin (f.eks. kan en enkelt servin have en 09:00 og en 11:00 tids slot).
- **Grupperne** tilgængelige ved hver servin tid (f.eks. spædbørns rum, småbørns, grund skole).
- **Gruppe-til-servin-tid linksene**, som bestemmer hvilke grupper, der er tilgængelige ved hvilke tider.

Disse data cachelagres lokalt, så resten af check-in processen er hurtig og responsiv.

:::tip
Hvis din kirke kun har en servin konfigureret, skal du stadig trykke på den for at fortsætte. Appen auto-vælger ikke en enkelt servin.
:::

## Næste trin

Efter valg af en servin vil du [slå din familie op](./looking-up-members) efter telefonnummer eller navn.
