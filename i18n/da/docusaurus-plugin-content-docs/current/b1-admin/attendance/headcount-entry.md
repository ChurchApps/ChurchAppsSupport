---
title: "Registrering og tendens for deltagerantal"
description: "Indtast samlet deltagerantal for en gudstjeneste eller gruppe i B1 Admin uden navneliste, og følg tallene uge for uge i rapporten Headcount Trend."
---

# Registrering og tendens for deltagerantal

<div class="article-intro">

Med deltagerantal kan du registrere et simpelt samlet fremmøde -- for en gudstjeneste, et gudstjenestetidspunkt eller en gruppe -- uden at tjekke en navngiven deltagerliste. Brug dette, når du blot har brug for at vide "hvor mange mennesker var her", og kombiner det med rapporten over tendens i deltagerantal for at følge tallet over tid.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Dine campusser, gudstjenester og gudstjenestetidspunkter skal være konfigureret. Se [Opsætning af fremmøde](setup.md).
- Registrering af deltagerantal kræver tilladelsen **Fremmøde &gt; Rediger**; visning af tendensrapporten kræver **Fremmøde &gt; Vis**. Se [Roller og tilladelser](../settings/roles-permissions.md).

</div>

:::info
Deltagerantal er en ren samlet alternativ til [Registrering af fremmøde](recording-attendance.md). Hvis du skal vide, **hvem** der var til stede -- for eksempel for at følge op med personer, der ikke har været der for nylig -- skal du fortsat bruge navngivet fremmøde for sessioner i en gruppes Sessioner. Deltagerantal gemmer kun et tal.
:::

## Registrering af et deltagerantal

1. Åbn **B1 Admin**, åbn [Hurtigmenuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre), udvid **Personer**, og klik på **Fremmøde**.
2. Klik på **Indtast deltagerantal** i venstre kolonne.
3. Udfyld formularen:
   - **Gudstjeneste** *(påkrævet)*
   - **Gudstjenestetidspunkt** -- lad feltet være tomt for at registrere et samlet antal for alle gudstjenestetidspunkter
   - **Gruppe** -- valgfri; kun grupper med aktiveret Registrer fremmøde vises. Lad feltet være tomt for "Ingen gruppe (hele gudstjenesten)."
   - **Dato**
   - **Deltagerantal** -- det samlede antal personer til stede
4. Klik på **Gem**.

Tabellen **Seneste deltagerantal** ved siden af formularen viser dine seneste par registreringer med dato, gudstjeneste, gudstjenestetidspunkt, gruppe og antal. Klik på en række for at indlæse den tilbage i formularen, hvis du skal rette eller slette den.

## Rapport over tendens i deltagerantal

1. Klik på **Alle år** i venstre kolonne på samme side **Fremmøde**, og vælg derefter fanen **Tendens i deltagerantal**.
2. Brug filtrene **Campus**, **Gudstjeneste**, **Gudstjenestetidspunkt** og **Gruppe** for at indsnævre rapporten.

Rapporten viser dine registrerede deltagerantal summeret pr. uge, både som et linjediagram og en tabel -- i samme rapportstil som [fanerne Tendens i fremmøde og Gruppefremmøde](tracking-attendance.md). Deltagerantal, der er registreret for den aktuelle uge, vises også under **Deltagerantal denne uge** på hovedsiden for Fremmøde.

## Relaterede sider

- [Registrering af fremmøde](recording-attendance.md) -- navngivet fremmøde pr. person og pr. session
- [Opfølgning af fremmøde](tracking-attendance.md) -- rapporter over fremmøde og tendenser i grupper
- [Opsætning af fremmøde](setup.md) -- konfigurer campusser, gudstjenester og gudstjenestetidspunkter
