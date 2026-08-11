---
title: "Tildeling av roller"
---

# Tildeling av roller

<div class="article-intro">

B1 Admin bruker et rolle-basert tillatelsessystem for å kontrollere hva hver bruker på laget ditt kan se og gjøre. Ved å tildele roller kan du gi ansatte og frivillige tilgang til nøyaktig områdene de trenger -- og ingenting mer. Riktig rollestyring holder kirkens data sikker mens du gir laget ditt mulighet til å arbeide effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Domeneadministrator**-tilgang eller en rolle med tillatelse til å administrere **Innstillinger** i B1 Admin.
- Menneskene du vil tildele roller til må allerede eksistere i katalogen. Se [Legge til mennesker](adding-people.md) hvis du trenger å legge dem til først.

</div>

## Forståelse av roller

En rolle er et sett med tillatelser som du tildeler en eller flere brukere. Du kan for eksempel opprette en "Finans-team"-rolle som gir tilgang til [donasjon-poster](../donations/recording-donations.md), eller en "Innsjekking-frivillig"-rolle som kun tillater tilgang til [oppmøte-funksjoner](../attendance/check-in.md).

Hver rolle kontrollerer tilgang til spesifikke områder av B1 Admin, inkludert:

- **Mennesker** -- visning og redigering av medlemsprofiler. Notater-fanen på en persons registrering krever **Rediger mennesker**, og en separat **Vis fortrolige notater**-tillatelse kontrollerer tilgang til Fortrolige notater-seksjonen (for pastoral omsorg, personlig historie og lignende sensitive notater).
- **Donasjoner** -- administrering av bidrag og finansielle rapporter
- **Oppmøte** -- registrering og visning av oppmøtedata
- **Skjemaer** -- opprett og administrer [egendefinerte skjemaer](../forms/creating-forms.md)
- **Grupper** -- administrering av [gruppedeltakelse](../groups/group-members.md) og kalendere
- **Innstillinger** -- konfigurering av kirkeomfattende innstillinger

:::warning
**Domeneadministratorer** har full tilgang til alle områder av B1 Admin. Tillatelene kan ikke redigeres eller begrenses. Bruk denne rollen bare for primær-administratorene.
:::

## Visning og administrering av roller

1. Åpne **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen) og velg **Innstillinger**.
2. Klikk **Roller** i den øverste navigasjonen.
3. Du vil se en liste over alle roller konfigurert for kirken.
4. Klikk på en hvilken som helst rolle for å vise medlemmer og tillatelser.

## Legge til brukere til en rolle

1. Naviger til **Innstillinger** deretter **Roller**.
2. Klikk rollen du vil legge til en bruker til.
3. I **Medlemmer**-seksjonen, søk etter personen etter navn.
4. Klikk **Legg til** for å tildele dem til rollen.

Brukeren vil nå ha alle tillatelser knyttet til den rollen neste gang de logger inn.

## Redigering av rolle-tillatelser

1. Naviger til **Innstillinger** deretter **Roller**.
2. Klikk rollen du vil endre.
3. I **Tillatelser**-seksjonen, merk eller avmerk områdene du vil at rollen skal få tilgang.
4. Klikk **Lagre** for å anvende endringene.

:::tip
Følg prinsippet om minste privile -- gi hver rolle bare de tillatelene den virkelig trenger. Dette holder dataene sikre og reduserer sjansen for utilsiktede endringer.
:::

## Vanlige rolle-eksempler

- **Kontorpersonale** -- tilgang til mennesker, donasjoner, oppmøte og skjemaer
- **Gruppeleder** -- tilgang til [Grupper](../groups/creating-groups.md) bare
- **Innsjekking-frivillige** -- tilgang til [Oppmøte](../attendance/check-in.md) bare
- **Finans-team** -- tilgang til [Donasjoner](../donations/recording-donations.md) og rapportering
