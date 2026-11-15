---
title: "Tildele roller"
description: "Tildel roller i B1 Admin for å gi ansatte og frivillige tilgang bare til de områdene for personer, gaver, oppmøte og grupper de trenger."
---

# Tildele roller

<div class="article-intro">

B1 Admin bruker et rollebasert tillatelsessystem for å styre hva hver bruker på teamet ditt kan se og gjøre. Ved å tildele roller kan du gi ansatte og frivillige tilgang til nøyaktig de områdene de trenger, og ikke mer. God rollehåndtering holder kirkedataene dine trygge, samtidig som teamet ditt kan jobbe effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang som **Domeneadministrator**, eller en rolle med tillatelse til å administrere **Innstillinger** i B1 Admin.
- Personene du vil tildele roller til, må allerede finnes i katalogen din. Se [Legge til personer](adding-people.md) hvis du må legge dem til først.

</div>

## Forstå roller {#understanding-roles}

En rolle er et sett med tillatelser som du tildeler til én eller flere brukere. Du kan for eksempel opprette en rolle «Økonomiteam» som gir tilgang til [gaveregistreringer](../donations/recording-donations.md), eller en rolle «Frivillig ved innsjekking» som bare gir tilgang til [oppmøtefunksjoner](../attendance/check-in.md).

Hver rolle styrer tilgangen til bestemte områder i B1 Admin, inkludert:

- **Personer**: se og redigere medlemsprofiler. Seksjonen Notater på en personpost krever **Rediger personer**, og en egen tillatelse **Se konfidensielle notater** styrer tilgangen til seksjonen Konfidensielle notater (for pastoral omsorg, personlig historikk og lignende sensitive notater). **Se bare navn på personer** lar noen slå opp personer etter navn (og bare se navn, bilde og medlemsstatus) uten tilgang til hele katalogen. Kombinert med **Se oppmøte** eller **Rediger oppmøte** kan en frivillig åpne **Grupper** og se klasselister med navn. Med **Rediger oppmøte** kan de også [registrere oppmøte](../attendance/recording-attendance.md). Se [Bare navn på personer](../settings/roles-permissions.md#people-names-only).
- **Gaver**: administrere bidrag og økonomirapporter. **Registrer gaver** er et smalere alternativ for tellerteam. Det lar noen registrere gaver, men bare i [batcher](../donations/batches.md#who-can-change-a-batch) som fortsatt er åpne.
- **Oppmøte**: registrere og se oppmøtedata
- **Skjemaer**: opprette og administrere [egendefinerte skjemaer](../forms/creating-forms.md)
- **Grupper**: administrere [gruppemedlemskap](../groups/group-members.md) og kalendere
- **Innstillinger**: konfigurere innstillinger for hele kirken

:::warning
**Domeneadministratorer** har full tilgang til alle deler av B1 Admin. Tillatelsene deres kan ikke redigeres eller begrenses. Bruk denne rollen bare for dine primære administratorer.
:::

## Vise og administrere roller {#viewing-and-managing-roles}

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), og utvid **Innstillinger**.
2. Klikk på **Roller**.
3. Du ser en liste over alle rollene som er satt opp for kirken din, med en kolonne **Medlemmer** som viser hvor mange brukere som er i hver rolle. Rollen **(Alle)** gjelder for alle brukere.
4. Klikk på en hvilken som helst rolle for å se medlemmene og tillatelsene.

## Legge brukere til en rolle {#adding-users-to-a-role}

1. I Hurtigmenyen velger du **Innstillinger > Roller**.
2. Klikk på rollen du vil legge brukeren til i.
3. I seksjonen **Medlemmer** klikker du på **Legg til**.
4. Søk etter personen på navn (eller velg dem fra **Nylige personer**), og klikk deretter på navnet deres eller legg-til-ikonet ved siden av. De legges til i rollen med en gang.

Brukeren har nå alle tillatelsene som hører til rollen, neste gang de logger inn.

## Redigere rolletillatelser {#editing-role-permissions}

1. I Hurtigmenyen velger du **Innstillinger > Roller**.
2. Klikk på rollen du vil endre.
3. I seksjonen **Rediger tillatelser** utvider du en tillatelsesgruppe (for eksempel **Personer og grupper**, **Gaver** eller **Oppmøte**), og krysser av eller fjerner avkrysningen for tillatelsene du vil at rollen skal ha. Hver gruppe viser hvor mange av tillatelsene den har avkrysset (for eksempel **2 av 5**). Skriv i **Filtrer tillatelser** for å finne en tillatelse på navn.
4. Hver endring lagres så snart du krysser av eller fjerner avkrysningen for en boks.

:::tip
Følg prinsippet om minst mulig tilgang: gi hver rolle bare de tillatelsene den virkelig trenger. Det holder dataene dine trygge og reduserer risikoen for utilsiktede endringer.
:::

## Vanlige eksempler på roller {#common-role-examples}

- **Kontorpersonale**: tilgang til Personer, Gaver, Oppmøte og Skjemaer
- **Gruppeledere**: tilgang til [Grupper](../groups/creating-groups.md) alene
- **Frivillige ved innsjekking**: tillatelsen **Innsjekking** under oppmøte, som kontoen som er logget inn på en [innsjekkingsterminal](../attendance/check-in.md) trenger
- **Økonomiteam**: tilgang til [Gaver](../donations/recording-donations.md) og rapportering
- **Tellerteam**: **Registrer gaver** og **Se gaver**, slik at frivillige kan registrere offeret i åpne batcher uten å se oppsummeringer av giving

Se [Roller og tillatelser](../settings/roles-permissions.md) for en nærmere titt på tillatelsene for gaver og personer.
