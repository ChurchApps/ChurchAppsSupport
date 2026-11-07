---
title: "Tilordne roller"
description: "Tildel roller i B1 Admin slik at ansatte og frivillige kun får tilgang til personer, gaver, oppmøte og grupper de trenger."
---

# Tilordne roller

<div class="article-intro">

B1 Admin bruker et rollebasert tillatelsessystem for å styre hva hver bruker på teamet ditt kan se og gjøre. Ved å tilordne roller kan du gi ansatte og frivillige tilgang til nøyaktig de områdene de trenger -- og ikke mer. God rolleadministrering holder kirkens data trygge samtidig som teamet ditt kan arbeide effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang som **Domeneadministrator** eller en rolle med tillatelse til å administrere **Innstillinger** i B1 Admin.
- Personene du vil tilordne roller må allerede finnes i katalogen din. Se [Legge til personer](adding-people.md) hvis du må legge dem til først.

</div>

## Forstå roller

En rolle er et sett med tillatelser som du tilordner én eller flere brukere. For eksempel kan du lage en rolle «Økonomiteam» som gir tilgang til [gaveregistreringer](../donations/recording-donations.md), eller en rolle «Frivillig ved innsjekking» som bare gir tilgang til [oppmøtefunksjoner](../attendance/check-in.md).

Hver rolle styrer tilgangen til bestemte områder i B1 Admin, blant annet:

- **Personer** -- å se og redigere medlemsprofiler. Seksjonen Notater på en personpost krever **Rediger personer**, og en egen tillatelse **Se konfidensielle notater** styrer tilgangen til seksjonen Konfidensielle notater (for omsorg, personlig historikk og lignende sensitive notater). **Se kun navn på personer** lar noen slå opp personer etter navn (de ser bare navn, bilde og medlemsstatus) uten tilgang til hele katalogen. Kombinert med **Se oppmøte** eller **Rediger oppmøte** lar det en frivillig åpne **Grupper** og se klasselister med navn; med **Rediger oppmøte** kan de også [registrere oppmøte](../attendance/recording-attendance.md). Se [Kun navn for personer](../settings/roles-permissions.md#people-names-only).
- **Gaver** -- å administrere bidrag og økonomirapporter. **Registrer gaver** er et smalere alternativ for telleteam: det lar noen registrere gaver, men bare i [buntene](../donations/batches.md#who-can-change-a-batch) som fortsatt er åpne.
- **Oppmøte** -- å registrere og se oppmøtedata
- **Skjemaer** -- å lage og administrere [egendefinerte skjemaer](../forms/creating-forms.md)
- **Grupper** -- å administrere [gruppemedlemskap](../groups/group-members.md) og kalendere
- **Innstillinger** -- å konfigurere innstillinger for hele kirken

:::warning
**Domeneadministratorer** har full tilgang til alle områder i B1 Admin. Tillatelsene deres kan ikke redigeres eller begrenses. Bruk denne rollen bare for dine primære administratorer.
:::

## Vise og administrere roller

1. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Innstillinger**.
2. Klikk **Roller**.
3. Du ser en liste over alle roller som er konfigurert for kirken din, med en kolonne for **Medlemmer** som viser hvor mange brukere som er i hver rolle.
4. Klikk på en rolle for å se medlemmene og tillatelsene.

## Legge brukere til en rolle

1. I hurtigmenyen velger du **Innstillinger > Roller**.
2. Klikk rollen du vil legge en bruker til i.
3. I seksjonen **Medlemmer** søker du etter personen med navn.
4. Klikk **Legg til** for å tilordne dem til rollen.

Brukeren har nå alle tillatelsene som hører til rollen neste gang de logger inn.

## Redigere rolletillatelser

1. I hurtigmenyen velger du **Innstillinger > Roller**.
2. Klikk rollen du vil endre.
3. I seksjonen **Tillatelser** krysser du av eller fjerner avkrysningen for områdene du vil at rollen skal ha tilgang til. Hver tillatelsesgruppe viser hvor mange av tillatelsene den har krysset av (for eksempel **2 av 5**).
4. Hver endring lagres så snart du krysser av eller fjerner avkrysningen i en boks.

:::tip
Følg prinsippet om minst mulig privilegium -- gi hver rolle bare de tillatelsene den virkelig trenger. Dette holder dataene dine trygge og reduserer risikoen for utilsiktede endringer.
:::

## Vanlige eksempler på roller

- **Kontorpersonale** -- tilgang til Personer, Gaver, Oppmøte og Skjemaer
- **Gruppeledere** -- tilgang til [Grupper](../groups/creating-groups.md) alene
- **Frivillige ved innsjekking** -- tillatelsen **Innsjekking** for oppmøte, som kontoen som er logget inn på en [innsjekkingskiosk](../attendance/check-in.md) trenger
- **Økonomiteam** -- tilgang til [Gaver](../donations/recording-donations.md) og rapportering
- **Telleteam** -- **Registrer gaver** og **Se gaver**, slik at frivillige kan føre inn offeret i åpne bunter uten å se giveroppsummeringer

Se [Roller og tillatelser](../settings/roles-permissions.md) for en nærmere titt på tillatelsene for gaver og personer.
