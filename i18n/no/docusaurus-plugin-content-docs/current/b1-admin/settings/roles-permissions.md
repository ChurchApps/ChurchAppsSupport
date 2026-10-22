---
title: "Roller og tillatelser"
---

# Roller og tillatelser {#roles--permissions}

<div class="article-intro">

Roller lar deg styre hva ulike brukere har tilgang til i ChurchApps-kontoen din. Du kan opprette egendefinerte roller for ansatte, frivillige og andre i teamet, hver med sitt eget tilgangsnivå, for å holde dataene dine trygge.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang som Domain Admin, eller en rolle med tillatelse til å administrere roller
- Ha en liste over teammedlemmer og hvilke områder de trenger tilgang til
- Gå gjennom kategoriene av tillatelser nedenfor for å planlegge rollene dine

</div>

## Åpne roller {#accessing-roles}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk på **Roller**.
3. Siden Roller viser alle rollene som er definert for kirken din.

## Forstå siden Roller {#understanding-the-roles-page}

Siden Roller er delt i to paneler:

- **Venstre side** – viser listen over medlemmer som er tildelt den valgte rollen.
- **Høyre side** – viser tillatelsesinnstillingene du kan konfigurere for den rollen.

Klikk på et rollenavn for å se og administrere medlemmene og tillatelsene.

## Legge til brukere i en rolle {#adding-users-to-a-role}

1. Velg rollen du vil legge medlemmer til i.
2. Bruk **søkefeltet** på venstre side for å finne personen du vil legge til.
3. Velg personen fra søkeresultatene.
4. De legges til i rollen med en gang.

## Fjerne brukere fra en rolle {#removing-users-from-a-role}

1. Velg rollen som inneholder brukeren du vil fjerne.
2. Finn personen i medlemslisten på venstre side.
3. Klikk på **fjern-knappen** ved siden av navnet deres.

## Konfigurere tillatelser {#configuring-permissions}

Hver rolle kan gis tilgang til bestemte områder i B1 Admin. I panelet **Rediger tillatelser** er tillatelsene gruppert i seksjoner du kan utvide, for eksempel **Oppmøte**, **Innhold**, **Gaver**, **Skjemaer og planer**, **Leksjoner**, **Meldinger**, **Personer og grupper** og **Oppgaver**. Skriv i boksen **Filtrer tillatelser** for å vise bare tillatelsene som samsvarer.

Kryss av for eller fjern av en tillatelse for å gi eller fjerne den for rollen.

### Tillatelser for gaver {#donations-permissions}

Seksjonen **Gaver** har disse tillatelsene:

- **Vis giversammendrag** – se delen Gaver, inkludert sidene Sammendrag, Batcher, Fond, Kampanjer og Givererklæringer.
- **Vis gaver** – se enkeltgaver, for eksempel gavene i en batch.
- **Rediger gaver** – full kontroll: legg til, rediger og slett gaver og batcher, og [lukk og åpne batcher igjen](../donations/batches.md#closing-and-reopening-a-batch).
- **Registrer gaver** – legg til batcher og registrer, rediger eller slett gaver, men bare i batcher som fortsatt er åpne. Personer med bare denne tillatelsen kan ikke slette batcher, lukke eller åpne dem igjen, eller endre gaver som er kommet inn via nettgivning.
- **Rediger innstillinger** – administrer innstillinger for gaver.

Noen med **Registrer gaver**, men ikke **Vis giversammendrag**, ser bare siden **Batcher** under **Gaver**. Gi et telleteam både **Registrer gaver** og **Vis gaver**, slik at de kan åpne en batch og se gavene de har registrert. Se [Hvem kan endre en batch](../donations/batches.md#who-can-change-a-batch) for detaljer.

### Kun personnavn {#people-names-only}

Seksjonen **Personer og grupper** inkluderer **Vis kun personnavn**. Bruk den for frivillige som trenger å slå opp personer etter navn – for eksempel for å velge noen i et søkefelt – uten tilgang til hele katalogen. Med bare denne tillatelsen kan en person:

- Søke etter personer med navn og se listen over nylig lagt til personer, men ser bare hver persons navn, bilde og medlemsstatus
- Ikke søke etter e-post, se kontaktopplysninger eller åpne katalogen **Personer**

Kombiner **Vis kun personnavn** med **Vis oppmøte** eller **Rediger oppmøte** for frivillige som fører klasseoppmøte. **Personer** i menyen deres åpner da **Grupper**, der de kan åpne listen **Alle grupper** og se navnene på medlemmene og øktene i hver klasse. Med **Rediger oppmøte** kan de også [registrere oppmøte](../attendance/recording-attendance.md) og legge til besøkende ved å søke etter navn. Navnene er ikke lenker til personposter, og konfidensielle grupper forblir skjult med mindre den frivillige er medlem.

B1 Admin skjuler lenker og knapper som krever tillatelser en rolle ikke har. For eksempel er listen **Alle grupper** bare tilgjengelig for personer som kan redigere grupper, se gruppemedlemmer eller se personer, eller som har **Vis kun personnavn** sammen med **Vis oppmøte** eller **Rediger oppmøte** (andre sendes tilbake til dashbordet). Oppsett av oppmøte vises bare med **Vis oppmøte** eller **Rediger tjenester**. En gruppes **E-post**-knapp vises bare for personer med **Rediger gruppemedlemmer** (tillatelsen som kreves for å sende gruppe-e-post). Utskrift av en gruppeliste krever **Vis gruppemedlemmer** eller at du leder gruppen, og sletting av en kalenderhendelse krever **Rediger innhold** (eller at du trekker tilbake din egen ventende forespørsel).

:::warning
**Domain Admins** har full tilgang til alle områder i ChurchApps-kontoen din. Tillatelsene deres kan ikke endres eller begrenses. Bruk denne rollen bare for de mest pålitelige administratorene dine.
:::

:::tip
Opprett spesifikke roller som «Kasserer» med bare tilgang til **Gaver**, «Telleteam» med **Registrer gaver** og **Vis gaver», eller «Innsjekkfrivillig» med bare tilgang til **Oppmøte**. Dette følger prinsippet om minst mulig tilgang og holder dataene dine trygge. Se [Datasikkerhet](./data-security.md) for mer om hvordan ChurchApps beskytter informasjonen din.
:::
