---
title: "Tildele roller"
---

# Tildele roller {#assigning-roles}

<div class="article-intro">

B1 Admin bruker et rollebasert tillatelsessystem for å styre hva hver bruker i teamet ditt kan se og gjøre. Ved å tildele roller kan du gi ansatte og frivillige tilgang til nøyaktig de områdene de trenger – og ikke mer. God rollehåndtering holder kirkens data trygge og gjør at teamet ditt kan jobbe effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Domain Admin**-tilgang eller en rolle med tillatelse til å administrere **Innstillinger** i B1 Admin.
- Personene du vil tildele roller til må allerede finnes i katalogen din. Se [Legge til personer](adding-people.md) hvis du må legge dem til først.

</div>

## Forstå roller {#understanding-roles}

En rolle er et sett med tillatelser som du tildeler én eller flere brukere. Du kan for eksempel opprette en rolle «Økonomiteam» som gir tilgang til [gaveregistreringer](../donations/recording-donations.md), eller en rolle «Innsjekkfrivillig» som bare gir tilgang til [oppmøtefunksjoner](../attendance/check-in.md).

Hver rolle styrer tilgangen til bestemte områder i B1 Admin, blant annet:

- **Personer** – se og redigere medlemsprofiler. Notatfeltet på en personpost krever **Rediger personer**, og en egen tillatelse, **Vis konfidensielle notater**, styrer tilgangen til delen for konfidensielle notater (for pastoral omsorg, personlig historikk og lignende sensitive notater). **Vis kun personnavn** lar noen slå opp personer etter navn (og se kun navn, bilde og medlemsstatus) uten tilgang til hele katalogen. Kombinert med **Vis oppmøte** eller **Rediger oppmøte** lar det en frivillig åpne **Grupper** og se deltakerlister for klasser etter navn; med **Rediger oppmøte** kan de også [registrere oppmøte](../attendance/recording-attendance.md). Se [Kun personnavn](../settings/roles-permissions.md#people-names-only).
- **Gaver** – administrere bidrag og økonomirapporter. **Registrer gaver** er et smalere alternativ for telleteam: det lar noen registrere gaver, men bare i [batcher](../donations/batches.md#who-can-change-a-batch) som fortsatt er åpne.
- **Oppmøte** – registrere og se oppmøtedata
- **Skjemaer** – opprette og administrere [egendefinerte skjemaer](../forms/creating-forms.md)
- **Grupper** – administrere [gruppemedlemskap](../groups/group-members.md) og kalendere
- **Innstillinger** – konfigurere innstillinger for hele kirken

:::warning
**Domain Admins** har full tilgang til alle områder i B1 Admin. Tillatelsene deres kan ikke redigeres eller begrenses. Bruk denne rollen bare for de viktigste administratorene dine.
:::

## Vise og administrere roller {#viewing-and-managing-roles}

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Innstillinger**.
2. Klikk på **Roller**.
3. Du vil se en liste over alle rollene som er konfigurert for kirken din.
4. Klikk på en rolle for å se medlemmene og tillatelsene.

## Legge til brukere i en rolle {#adding-users-to-a-role}

1. Velg **Innstillinger > Roller** i Hurtigmenyen.
2. Klikk på rollen du vil legge en bruker til i.
3. I delen **Medlemmer** søker du etter personen med navn.
4. Klikk på **Legg til** for å tildele dem rollen.

Brukeren får alle tillatelsene som er knyttet til rollen neste gang de logger inn.

## Redigere rolletillatelser {#editing-role-permissions}

1. Velg **Innstillinger > Roller** i Hurtigmenyen.
2. Klikk på rollen du vil endre.
3. I delen **Tillatelser** krysser du av for eller fjerner av for områdene du vil at rollen skal ha tilgang til.
4. Klikk på **Lagre** for å bruke endringene.

:::tip
Følg prinsippet om minst mulig tilgang – gi hver rolle bare de tillatelsene den virkelig trenger. Det holder dataene dine trygge og reduserer risikoen for utilsiktede endringer.
:::

## Vanlige eksempler på roller {#common-role-examples}

- **Kontorpersonale** – tilgang til Personer, Gaver, Oppmøte og Skjemaer
- **Gruppeledere** – tilgang til [Grupper](../groups/creating-groups.md) alene
- **Innsjekkfrivillige** – tilgang til [Oppmøte](../attendance/check-in.md) alene
- **Økonomiteam** – tilgang til [Gaver](../donations/recording-donations.md) og rapportering
- **Telleteam** – **Registrer gaver** og **Vis gaver**, slik at frivillige kan føre inn collecten i åpne batcher uten å se giversammendrag

Se [Roller og tillatelser](../settings/roles-permissions.md) for en nærmere titt på tillatelsene for gaver og personer.
