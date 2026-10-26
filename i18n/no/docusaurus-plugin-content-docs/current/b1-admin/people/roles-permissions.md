---
title: "Tildele roller"
---

# Tildele roller

<div class="article-intro">

B1 Admin bruker et rollebasert tillatelsessystem for å styre hva hver bruker i teamet ditt kan se og gjøre. Ved å tildele roller kan du gi staben og frivillige tilgang til nøyaktig de områdene de trenger — og ikke noe mer. God rollehåndtering holder menighetens data trygge, samtidig som teamet ditt kan arbeide effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Domain Admin**-tilgang eller en rolle med tillatelse til å administrere **Settings** i B1 Admin.
- Personene du vil tildele roller til, må allerede finnes i katalogen din. Se [Legge til personer](adding-people.md) hvis du må legge dem til først.

</div>

## Forstå roller

En rolle er et sett med tillatelser som du tildeler til én eller flere brukere. Du kan for eksempel lage en rolle «Finance Team» som gir tilgang til [gaveregistreringer](../donations/recording-donations.md), eller en rolle «Check-In Volunteer» som bare gir tilgang til [oppmøtefunksjoner](../attendance/check-in.md).

Hver rolle styrer tilgang til bestemte områder i B1 Admin, inkludert:

- **People** -- å se og redigere medlemsprofiler. Notatseksjonen på en personpost krever **Edit People**, og en egen tillatelse **View Confidential Notes** styrer tilgangen til seksjonen for konfidensielle notater (for sjelesorg, personlig historikk og lignende sensitive notater). **View People Names Only** lar noen slå opp personer etter navn (de ser bare navn, bilde og medlemsstatus) uten tilgang til hele katalogen. Kombinert med **View Attendance** eller **Edit Attendance** lar den en frivillig åpne **Groups** og se klasselister etter navn; med **Edit Attendance** kan de også [registrere oppmøte](../attendance/recording-attendance.md). Se [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** -- håndtere bidrag og økonomirapporter. **Enter Donations** er et smalere alternativ for telleteam: det lar noen registrere gaver, men bare i [batcher](../donations/batches.md#who-can-change-a-batch) som fortsatt er åpne.
- **Attendance** -- registrere og vise oppmøtedata
- **Forms** -- lage og administrere [egendefinerte skjemaer](../forms/creating-forms.md)
- **Groups** -- administrere [gruppemedlemskap](../groups/group-members.md) og kalendere
- **Settings** -- konfigurere innstillinger for hele menigheten

:::warning
**Domain Admins** har full tilgang til alle områder i B1 Admin. Tillatelsene deres kan ikke redigeres eller begrenses. Bruk denne rollen kun for dine primære administratorer.
:::

## Vise og administrere roller

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Settings**.
2. Klikk på **Roles**.
3. Du ser en liste over alle roller som er konfigurert for menigheten din, med en kolonne **Members** som viser hvor mange brukere som er i hver rolle.
4. Klikk på en rolle for å se medlemmene og tillatelsene.

## Legge brukere til en rolle

1. I Jump-menyen velger du **Settings > Roles**.
2. Klikk på rollen du vil legge en bruker til i.
3. I delen **Members** søker du etter personen med navn.
4. Klikk på **Add** for å tildele dem rollen.

Brukeren får alle tillatelsene knyttet til rollen neste gang de logger inn.

## Redigere rolletillatelser

1. I Jump-menyen velger du **Settings > Roles**.
2. Klikk på rollen du vil endre.
3. I delen **Permissions** krysser du av eller fjerner avkrysningen for områdene rollen skal ha tilgang til. Hver tillatelsesgruppe viser hvor mange av tillatelsene sine som er avkrysset (for eksempel **2 of 5**).
4. Hver endring lagres så snart du krysser av eller fjerner avkrysningen i en boks.

:::tip
Følg prinsippet om minst mulig tilgang -- gi hver rolle bare de tillatelsene den virkelig trenger. Dette holder dataene dine trygge og reduserer risikoen for utilsiktede endringer.
:::

## Vanlige eksempler på roller

- **Office Staff** -- tilgang til People, Donations, Attendance og Forms
- **Group Leaders** -- kun tilgang til [Groups](../groups/creating-groups.md)
- **Check-In Volunteers** -- kun tilgang til [Attendance](../attendance/check-in.md)
- **Finance Team** -- tilgang til [Donations](../donations/recording-donations.md) og rapportering
- **Counting Team** -- **Enter Donations** og **View Donations**, slik at frivillige kan registrere offeret i åpne batcher uten å se givingsoppsummeringer

Se [Roller og tillatelser](../settings/roles-permissions.md) for en nærmere titt på tillatelsene for bidrag og personer.
