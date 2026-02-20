---
title: "Tildele roller"
---

# Tildele roller

<div class="article-intro">

B1 Admin bruker et rollebasert tillatelsessystem for å kontrollere hva hver bruker i teamet ditt kan se og gjøre. Ved å tildele roller kan du gi ansatte og frivillige tilgang til nøyaktig de områdene de trenger -- og ingenting mer. God rolleadministrasjon holder kirkedataene dine sikre samtidig som teamet ditt kan jobbe effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Domeneadministrator**-tilgang eller en rolle med tillatelse til å administrere **Innstillinger** i B1 Admin.
- Personene du vil tildele roller til må allerede finnes i registeret ditt. Se [Legge til personer](adding-people.md) hvis du trenger å legge dem til først.

</div>

## Forstå roller

En rolle er et sett med tillatelser som du tildeler én eller flere brukere. Du kan for eksempel opprette en "Finansteam"-rolle som gir tilgang til [donasjonsregistre](../donations/recording-donations.md), eller en "Innsjekking-frivillig"-rolle som kun gir tilgang til [oppmøtefunksjoner](../attendance/check-in.md).

Hver rolle kontrollerer tilgangen til spesifikke områder av B1 Admin, inkludert:

- **Personer** -- visning og redigering av medlemsprofiler
- **Donasjoner** -- administrasjon av bidrag og finansrapporter
- **Oppmøte** -- registrering og visning av oppmøtedata
- **Skjemaer** -- oppretting og administrasjon av [egendefinerte skjemaer](../forms/creating-forms.md)
- **Grupper** -- administrasjon av [gruppemedlemskap](../groups/group-members.md) og kalendere
- **Innstillinger** -- konfigurasjon av menighetsbrede innstillinger

:::warning
**Domeneadministratorer** har full tilgang til alle områder av B1 Admin. Tillatelsene deres kan ikke redigeres eller begrenses. Bruk denne rollen kun for dine primære administratorer.
:::

## Vise og administrere roller

1. Klikk på **Innstillinger** i venstre sidefelt.
2. Klikk på **Roller** i toppnavigasjonen.
3. Du vil se en liste over alle roller konfigurert for menigheten din.
4. Klikk på en rolle for å se medlemmene og tillatelsene.

## Legge til brukere i en rolle

1. Naviger til **Innstillinger** og deretter **Roller**.
2. Klikk på rollen du vil legge til en bruker i.
3. I **Medlemmer**-seksjonen, søk etter personen etter navn.
4. Klikk **Legg til** for å tildele dem rollen.

Brukeren vil ha alle tillatelsene knyttet til den rollen neste gang de logger inn.

## Redigere rolletillatelser

1. Naviger til **Innstillinger** og deretter **Roller**.
2. Klikk på rollen du vil endre.
3. I **Tillatelser**-seksjonen, kryss av eller fjern kryss for områdene du vil at rollen skal ha tilgang til.
4. Klikk **Lagre** for å bruke endringene.

:::tip
Følg prinsippet om minste privilegium -- gi hver rolle kun de tillatelsene den virkelig trenger. Dette holder dataene dine sikre og reduserer sjansen for utilsiktede endringer.
:::

## Vanlige rolleeksempler

- **Kontoransatte** -- tilgang til Personer, Donasjoner, Oppmøte og Skjemaer
- **Gruppeledere** -- kun tilgang til [Grupper](../groups/creating-groups.md)
- **Innsjekking-frivillige** -- kun tilgang til [Oppmøte](../attendance/check-in.md)
- **Finansteam** -- tilgang til [Donasjoner](../donations/recording-donations.md) og rapportering
