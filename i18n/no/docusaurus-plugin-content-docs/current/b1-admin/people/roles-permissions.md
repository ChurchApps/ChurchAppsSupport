---
title: "Tildele roller"
---

# Tildele roller

<div class="article-intro">

B1 Admin bruker et rollebasert tillatelsessystem for å styre hva hver enkelt bruker på teamet ditt kan se og gjøre. Ved å tildele roller kan du gi ansatte og frivillige tilgang til nøyaktig de områdene de trenger -- og ikke noe mer. God rolleadministrasjon holder menighetens data trygge og gjør det mulig for teamet å jobbe effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Domain Admin**-tilgang eller en rolle med tillatelse til å administrere **Innstillinger** i B1 Admin.
- Personene du vil tildele roller, må allerede finnes i registeret ditt. Se [Legge til personer](adding-people.md) hvis du først må legge dem til.

</div>

## Forstå roller

En rolle er et sett med tillatelser som du tildeler til én eller flere brukere. Du kan for eksempel opprette en «Økonomiteam»-rolle som gir tilgang til [donasjonsregistreringer](../donations/recording-donations.md), eller en «Innsjekk-frivillig»-rolle som bare gir tilgang til [oppmøtefunksjoner](../attendance/check-in.md).

Hver rolle styrer tilgangen til bestemte områder av B1 Admin, blant annet:

- **Personer** -- vise og redigere medlemsprofiler. Fanen Notater på en personprofil krever **Rediger personer**, og en egen tillatelse, **Se konfidensielle notater**, styrer tilgangen til delen Konfidensielle notater (for sjelesorg, personlig historikk og lignende sensitive notater).
- **Donasjoner** -- administrere gaver og økonomirapporter
- **Oppmøte** -- registrere og se oppmøtedata
- **Skjemaer** -- opprette og administrere [egendefinerte skjemaer](../forms/creating-forms.md)
- **Grupper** -- administrere [gruppemedlemskap](../groups/group-members.md) og kalendere
- **Innstillinger** -- konfigurere innstillinger for hele menigheten

:::warning
**Domain Admins** har full tilgang til alle områder av B1 Admin. Tillatelsene deres kan ikke redigeres eller begrenses. Bruk denne rollen bare for de viktigste administratorene dine.
:::

## Vise og administrere roller

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Innstillinger**.
2. Klikk på **Roller**.
3. Du ser en liste over alle roller som er satt opp for menigheten din.
4. Klikk på en rolle for å se medlemmene og tillatelsene.

## Legge til brukere i en rolle

1. Velg **Innstillinger > Roller** i Jump-menyen.
2. Klikk på rollen du vil legge til en bruker i.
3. Søk etter personen på navn i delen **Medlemmer**.
4. Klikk på **Legg til** for å tildele dem rollen.

Brukeren får alle tillatelsene som hører til rollen neste gang vedkommende logger inn.

## Redigere rolletillatelser

1. Velg **Innstillinger > Roller** i Jump-menyen.
2. Klikk på rollen du vil endre.
3. Huk av eller fjern haken for områdene rollen skal ha tilgang til i delen **Tillatelser**.
4. Klikk på **Lagre** for å ta i bruk endringene.

:::tip
Følg prinsippet om minst mulig tilgang -- gi hver rolle bare de tillatelsene den faktisk trenger. Det holder dataene dine trygge og reduserer risikoen for utilsiktede endringer.
:::

## Vanlige eksempler på roller

- **Kontorpersonale** -- tilgang til Personer, Donasjoner, Oppmøte og Skjemaer
- **Gruppeledere** -- tilgang til kun [Grupper](../groups/creating-groups.md)
- **Innsjekk-frivillige** -- tilgang til kun [Oppmøte](../attendance/check-in.md)
- **Økonomiteam** -- tilgang til [Donasjoner](../donations/recording-donations.md) og rapportering
