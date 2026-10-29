---
title: "Roller og tillatelser"
---

# Roller og tillatelser

<div class="article-intro">

Roller lar deg kontrollere hva ulike brukere har tilgang til i ChurchApps-kontoen din. Du kan opprette egendefinerte roller for ansatte, frivillige og andre teammedlemmer, hver med sitt eget tilgangsnivå for å holde dataene dine sikre.

</div>

## Opplæringsvideo

<YouTube id="ZzCIkinVMnE" title="Roller, tillatelser og invitere teamet ditt i B1" next="Sette opp gudstjenester og oppmøte i B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang som domeneadministrator, eller en rolle med tillatelse til å administrere roller
- Ha en liste over teammedlemmer og hvilke områder de trenger tilgang til
- Gå gjennom kategoriene av tillatelser nedenfor for å planlegge rollene dine

</div>

## Åpne roller

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk **Roller**.
3. Siden Roller viser alle roller som er definert for kirken din. Kolonnen **Medlemmer** viser hvor mange brukere som er i hver rolle, og raden **(Alle)** viser **Alle brukere**.

## Forstå rollesiden

Siden Roller er delt i to paneler:

- **Venstre side** — viser listen over medlemmer som er tilordnet den valgte rollen.
- **Høyre side** — viser tillatelsesinnstillingene du kan konfigurere for den rollen.

Klikk på et rollenavn for å se og administrere medlemmene og tillatelsene.

## Legge brukere til en rolle

1. Velg rollen du vil legge medlemmer til i.
2. Bruk **søkefeltet** på venstre side for å finne personen du vil legge til.
3. Velg personen fra søkeresultatene.
4. De legges til i rollen med en gang.

## Fjerne brukere fra en rolle

1. Velg rollen som inneholder brukeren du vil fjerne.
2. Finn personen i medlemslisten på venstre side.
3. Klikk **fjern**-knappen ved siden av navnet deres.

## Konfigurere tillatelser

Hver rolle kan gis tilgang til bestemte områder i B1 Admin. I panelet **Rediger tillatelser** er tillatelsene gruppert i seksjoner du kan utvide, for eksempel **Oppmøte**, **Innhold**, **Gaver**, **Skjemaer og planer**, **Leksjoner**, **Meldinger**, **Personer og grupper** og **Oppgaver**. Skriv i boksen **Filtrer tillatelser** for å vise bare tillatelsene som samsvarer.

Kryss av eller av en tillatelse for å gi eller fjerne den for rollen. Hver seksjonsoverskrift viser hvor mange av tillatelsene sine rollen har, for eksempel **2 av 5**, og tallet oppdateres når du krysser av og fjerner avkrysningen.

### Tillatelser for gaver

Seksjonen **Gaver** har disse tillatelsene:

- **Vis gavesammendrag** — se seksjonen Gaver, inkludert sidene Sammendrag, Partier, Fond, Kampanjer og Gaveoversikter.
- **Vis gaver** — se enkeltgaver, for eksempel gavene inne i et parti.
- **Rediger gaver** — full kontroll: legg til, rediger og slett gaver og partier, og [lukk og gjenåpne partier](../donations/batches.md#closing-and-reopening-a-batch).
- **Registrer gaver** — legg til partier og registrer, rediger eller slett gaver, men bare i partier som fortsatt er åpne. Personer med bare denne tillatelsen kan ikke slette partier, lukke eller gjenåpne dem, eller endre gaver som kom inn via netthandel.
- **Rediger innstillinger** — administrer gaveinnstillinger.

Noen med **Registrer gaver** men uten **Vis gavesammendrag** ser bare siden **Partier** under **Gaver**. Gi en telleteamrolle både **Registrer gaver** og **Vis gaver**, slik at de kan åpne et parti og se gavene de registrerte. Se [Hvem kan endre et parti](../donations/batches.md#who-can-change-a-batch) for detaljer.

### Bare navn på personer

Seksjonen **Personer og grupper** inkluderer **Vis bare navn på personer**. Bruk den for frivillige som trenger å slå opp personer med navn — for eksempel for å velge noen i et søkefelt — uten tilgang til hele katalogen. Med bare denne tillatelsen kan en person:

- Søke etter personer med navn og se listen over nylig lagt til personer, men ser bare hver persons navn, bilde og medlemsstatus
- Ikke søke etter e-post, se kontaktopplysninger eller åpne katalogen **Personer**

Kombiner **Vis bare navn på personer** med **Vis oppmøte** eller **Rediger oppmøte** for frivillige som registrerer klasseoppmøte. **Personer** i menyen deres åpner da **Grupper**, der de kan åpne listen **Alle grupper** og se hver klasses medlemsnavn og økter. Med **Rediger oppmøte** kan de også [registrere oppmøte](../attendance/recording-attendance.md) og legge til besøkende ved å søke etter navn. Navn er ikke lenker til personposter, og konfidensielle grupper forblir skjult med mindre den frivillige er medlem.

B1 Admin skjuler lenker og knapper som krever tillatelser en rolle ikke har. For eksempel er listen **Alle grupper** bare tilgjengelig for personer som kan redigere grupper, se gruppemedlemmer eller se personer, eller som har **Vis bare navn på personer** sammen med **Vis oppmøte** eller **Rediger oppmøte** (andre sendes tilbake til Dashbordet). Oppsett av oppmøte vises bare med **Vis oppmøte** eller **Rediger tjenester**, en gruppes knapp **E-post** vises bare for personer med **Rediger gruppemedlemmer** (tillatelsen som kreves for å sende gruppe-e-post), og utskrift av en gruppeliste krever **Vis gruppemedlemmer** eller at du leder den gruppen. Sletting av en kalenderhendelse krever **Rediger innhold** (eller å trekke tilbake din egen ventende forespørsel).

:::warning
**Domeneadministratorer** har full tilgang til alle områder av ChurchApps-kontoen din. Tillatelsene deres kan ikke endres eller begrenses. Bruk denne rollen bare for de mest pålitelige administratorene dine.
:::

:::tip
Opprett spesifikke roller som «Kasserer» med bare tilgang til **Gaver**, «Telleteam» med **Registrer gaver** og **Vis gaver**, eller «Innsjekkingsfrivillig» med bare tilgang til **Oppmøte**. Dette følger prinsippet om minst mulig tilgang og holder dataene dine sikre. Se [Datasikkerhet](./data-security.md) for mer om hvordan ChurchApps beskytter informasjonen din.
:::
