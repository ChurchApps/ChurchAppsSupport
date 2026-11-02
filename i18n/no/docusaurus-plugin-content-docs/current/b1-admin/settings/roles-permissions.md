---
title: "Roller og tillatelser"
---

# Roller og tillatelser

<div class="article-intro">

Roller lar deg styre hva ulike brukere kan få tilgang til i din ChurchApps-konto. Du kan lage egendefinerte roller for ansatte, frivillige og andre teammedlemmer, der hver har sitt eget tilgangsnivå for å holde dataene dine trygge.

</div>

## Opplæringsvideo

<YouTube id="ZzCIkinVMnE" title="Roller, tillatelser og invitere teamet ditt i B1" next="Sette opp gudstjenester og oppmøte i B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang som Domeneadministrator eller en rolle med tillatelse til å administrere roller
- Ha en liste over teammedlemmer og hvilke områder de trenger tilgang til
- Gjennomgå kategoriene for tillatelser nedenfor for å planlegge rollene dine

</div>

## Åpne roller

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk **Roller**.
3. Siden Roller viser alle rollene som er definert for kirken din. Kolonnen **Medlemmer** viser hvor mange brukere som er i hver rolle, og raden **(Alle)** viser **Alle brukere**.

## Forstå siden Roller

Siden Roller er delt i to paneler:

- **Venstre side** -- Viser listen over medlemmer som er tilordnet den valgte rollen.
- **Høyre side** -- Viser tillatelsesinnstillingene du kan konfigurere for den rollen.

Klikk på et rollenavn for å se og administrere medlemmene og tillatelsene.

## Legge brukere til en rolle

1. Velg rollen du vil legge medlemmer til i.
2. Bruk **søkefeltet** på venstre side for å finne personen du vil legge til.
3. Velg personen fra søkeresultatene.
4. De legges til i rollen med en gang.

## Fjerne brukere fra en rolle

1. Velg rollen som inneholder brukeren du vil fjerne.
2. Finn personen i medlemslisten på venstre side.
3. Klikk **fjern-knappen** ved siden av navnet deres.

## Konfigurere tillatelser

Hver rolle kan gis tilgang til bestemte områder i B1 Admin. I panelet **Rediger tillatelser** er tillatelsene gruppert i seksjoner du kan utvide, for eksempel **Oppmøte**, **Innhold**, **Gaver**, **Skjemaer og planer**, **Leksjoner**, **Meldinger**, **Personer og grupper** og **Oppgaver**. Skriv i boksen **Filtrer tillatelser** for å vise bare tillatelsene som samsvarer.

Kryss av eller fjern avkrysningen for en tillatelse for å gi den til rollen eller fjerne den. Hver seksjonsoverskrift viser hvor mange av tillatelsene den har, for eksempel **2 av 5**, og tallet oppdateres når du krysser av og fjerner avkrysninger.

### Tillatelser for gaver

Seksjonen **Gaver** har disse tillatelsene:

- **Se gavesammendrag** -- se delen Gaver, inkludert sidene Sammendrag, Bunter, Fond, Kampanjer og Giveroppgaver.
- **Se gaver** -- se enkeltgaver, for eksempel gavene inne i en bunt.
- **Rediger gaver** -- full kontroll: legg til, rediger og slett gaver og bunter, og [lukk og gjenåpne bunter](../donations/batches.md#closing-and-reopening-a-batch).
- **Registrer gaver** -- legg til bunter og registrer, rediger eller slett gaver, men bare i bunter som fortsatt er åpne. Personer med bare denne tillatelsen kan ikke slette bunter, lukke eller gjenåpne dem, eller endre gaver som kom inn via nettbasert giving.
- **Rediger innstillinger** -- administrer innstillinger for gaver.

Noen med **Registrer gaver**, men ikke **Se gavesammendrag**, ser bare siden **Bunter** under **Gaver**. Gi et telleteam-rolle både **Registrer gaver** og **Se gaver**, slik at de kan åpne en bunt og se gavene de har registrert. Se [Hvem kan endre en bunt](../donations/batches.md#who-can-change-a-batch) for detaljer.

### Kun navn for personer {#people-names-only}

Seksjonen **Personer og grupper** inkluderer **Se kun navn på personer**. Bruk den for frivillige som trenger å slå opp personer etter navn -- for eksempel for å velge noen i et søkefelt -- uten tilgang til hele katalogen. Med denne tillatelsen alene kan en person:

- Søke etter personer med navn og se listen over nylig lagt til personer, men ser bare hver persons navn, bilde og medlemsstatus
- Ikke søke etter e-post, se kontaktopplysninger eller åpne katalogen **Personer**

Kombiner **Se kun navn på personer** med **Se oppmøte** eller **Rediger oppmøte** for frivillige som fører klassens oppmøte. **Personer** i menyen deres åpner da **Grupper**, der de kan åpne listen **Alle grupper** og se hver klasses medlemsnavn og økter. Med **Rediger oppmøte** kan de også [registrere oppmøte](../attendance/recording-attendance.md) og legge til besøkende ved å søke etter navn. Navn er ikke lenker til personposter, og konfidensielle grupper forblir skjult med mindre den frivillige er medlem.

B1 Admin skjuler lenker og knapper som krever tillatelser en rolle ikke har. For eksempel er listen **Alle grupper** bare tilgjengelig for personer som kan redigere grupper, se gruppemedlemmer eller se personer, eller som har **Se kun navn på personer** sammen med **Se oppmøte** eller **Rediger oppmøte** (andre sendes tilbake til dashbordet). Oppsett for oppmøte vises bare med **Rediger gudstjenester**, knappen **E-post** for en gruppe vises bare for personer med **Rediger gruppemedlemmer** (tillatelsen som trengs for å sende gruppe-e-post), utskrift av en gruppeliste krever **Se gruppemedlemmer** eller at du leder gruppen, og sletting av et kalenderarrangement krever **Rediger innhold** (eller at du trekker tilbake din egen ventende forespørsel).

### Kontoer for innsjekkingskiosk {#check-in-kiosk-accounts}

Kontoen som logger inn på en [B1 Checkin](../../b1-checkin/getting-started/logging-in.md)-kiosk trenger tillatelsen **Innsjekking** i seksjonen **Oppmøte** (eller **Rediger oppmøte**). Med bare **Innsjekking** kan kiosken slå opp familier etter navn eller telefon, sjekke dem inn og ut, og vise hvem som kan hente et barn, uten tilgang til katalogen Personer.

Innsjekking gis ikke lenger gjennom raden **(Alle)**. Å være i en rolle med andre tillatelser lar ikke noen kjøre kiosken; legg til **Innsjekking** i en rolle som «Frivillige ved innsjekking» og sett kioskkontoene i den.

:::warning
**Domeneadministratorer** har full tilgang til alle områder i din ChurchApps-konto. Tillatelsene deres kan ikke endres eller begrenses. Bruk denne rollen bare for dine mest betrodde administratorer.
:::

:::tip
Lag spesifikke roller som «Kasserer» med bare tilgang til **Gaver**, «Telleteam» med **Registrer gaver** og **Se gaver**, eller «Frivillig ved innsjekking» med bare tilgang til **Oppmøte**. Dette følger prinsippet om minst mulig privilegium og holder dataene dine trygge. Se [Datasikkerhet](./data-security.md) for mer om hvordan ChurchApps beskytter informasjonen din.
:::
