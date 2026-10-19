---
title: "Tildele roller"
---

# Tildele roller

<div class="article-intro">

B1 Admin bruker et rollebasert tillatelsessystem for å styre hva hver bruker i teamet ditt kan se og gjøre. Ved å tildele roller kan du gi staben og frivillige tilgang til nøyaktig de områdene de trenger -- og ikke mer. God rollehåndtering holder kirkens data sikre og gjør at teamet ditt kan jobbe effektivt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Domeneadministrator**-tilgang eller en rolle med tillatelse til å administrere **Innstillinger** i B1 Admin.
- Personene du vil tildele roller må allerede finnes i katalogen din. Se [Legge til personer](adding-people.md) hvis du må legge dem til først.

</div>

## Forstå roller

En rolle er et sett med tillatelser som du tildeler en eller flere brukere. Du kan for eksempel opprette en rolle «Økonomiteam» som gir tilgang til [gaveregistreringer](../donations/recording-donations.md), eller en rolle «Frivillig ved innsjekking» som bare gir tilgang til [oppmøtefunksjoner](../attendance/check-in.md).

Hver rolle styrer tilgangen til bestemte områder i B1 Admin, blant annet:

- **Personer** -- se og redigere medlemsprofiler. Notatseksjonen på en personpost krever **Rediger personer**, og en egen tillatelse, **Vis konfidensielle notater**, styrer tilgangen til seksjonen for konfidensielle notater (for sjelesorg, personlig historikk og lignende sensitive notater). **Vis bare personnavn** lar noen slå opp personer på navn (og bare se navn, bilde og medlemsstatus) uten tilgang til hele katalogen.
- **Gaver** -- administrere bidrag og økonomiske rapporter. **Registrer gaver** er et smalere alternativ for telleteam: det lar noen registrere gaver, men bare i [batcher](../donations/batches.md#who-can-change-a-batch) som fortsatt er åpne.
- **Oppmøte** -- registrere og se oppmøtedata
- **Skjemaer** -- opprette og administrere [egendefinerte skjemaer](../forms/creating-forms.md)
- **Grupper** -- administrere [gruppemedlemskap](../groups/group-members.md) og kalendere
- **Innstillinger** -- konfigurere innstillinger for hele kirken

:::warning
**Domeneadministratorer** har full tilgang til alle områder i B1 Admin. Tillatelsene deres kan ikke redigeres eller begrenses. Bruk denne rollen bare for de viktigste administratorene dine.
:::

## Se og administrere roller

1. Åpne [Hoppmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Innstillinger**.
2. Klikk **Roller**.
3. Du ser en liste over alle roller som er satt opp for kirken din.
4. Klikk på en rolle for å se medlemmene og tillatelsene.

## Legge til brukere i en rolle

1. I hoppmenyen velger du **Innstillinger > Roller**.
2. Klikk på rollen du vil legge en bruker til i.
3. I seksjonen **Medlemmer** søker du etter personen på navn.
4. Klikk **Legg til** for å tildele dem rollen.

Brukeren får alle tillatelsene som hører til rollen neste gang de logger inn.

## Redigere rolletillatelser

1. I hoppmenyen velger du **Innstillinger > Roller**.
2. Klikk på rollen du vil endre.
3. I seksjonen **Tillatelser** merker du av eller fjerner merket for områdene du vil at rollen skal ha tilgang til.
4. Klikk **Lagre** for å bruke endringene.

:::tip
Følg prinsippet om minste privilegium -- gi hver rolle bare de tillatelsene den virkelig trenger. Dette holder dataene dine sikre og reduserer risikoen for utilsiktede endringer.
:::

## Vanlige rolleeksempler

- **Kontorpersonale** -- tilgang til Personer, Gaver, Oppmøte og Skjemaer
- **Gruppeledere** -- tilgang bare til [Grupper](../groups/creating-groups.md)
- **Frivillige ved innsjekking** -- tilgang bare til [Oppmøte](../attendance/check-in.md)
- **Økonomiteam** -- tilgang til [Gaver](../donations/recording-donations.md) og rapportering
- **Telleteam** -- **Registrer gaver** og **Vis gaver**, slik at frivillige kan registrere offeret i åpne batcher uten å se givingsoversikter

Se [Roller og tillatelser](../settings/roles-permissions.md) for en nærmere titt på tillatelsene for gaver og personer.
