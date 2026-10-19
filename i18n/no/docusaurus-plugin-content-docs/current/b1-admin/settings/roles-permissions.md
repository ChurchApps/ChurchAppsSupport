---
title: "Roller og tillatelser"
---

# Roller og tillatelser

<div class="article-intro">

Roller lar deg styre hva ulike brukere har tilgang til i ChurchApps-kontoen din. Du kan opprette egendefinerte roller for ansatte, frivillige og andre teammedlemmer, hver med sitt eget tilgangsnivå, for å holde dataene dine trygge.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang som domeneadministrator eller en rolle med tillatelse til å administrere roller
- Ha en liste over teammedlemmer og områdene de trenger tilgang til
- Gå gjennom de tilgjengelige tillatelseskategoriene nedenfor for å planlegge rollene dine

</div>

## Åpne roller

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk på **Roller**.
3. Siden Roller viser alle roller som er definert for menigheten din.

## Forstå rollesiden

Siden Roller er delt i to paneler:

- **Venstre side** – viser listen over medlemmer som er tildelt den valgte rollen.
- **Høyre side** – viser tillatelsesinnstillingene du kan konfigurere for den rollen.

Klikk på et rollenavn for å se og administrere medlemmene og tillatelsene.

## Legge til brukere i en rolle

1. Velg rollen du vil legge medlemmer til i.
2. Bruk **søkefeltet** på venstre side for å finne personen du vil legge til.
3. Velg personen fra søkeresultatene.
4. De legges til i rollen umiddelbart.

## Fjerne brukere fra en rolle

1. Velg rollen som inneholder brukeren du vil fjerne.
2. Finn personen i medlemslisten på venstre side.
3. Klikk på **fjern-knappen** ved siden av navnet.

## Konfigurere tillatelser

Hver rolle kan gis tilgang til bestemte områder i B1 Admin. I panelet **Rediger tillatelser** er tillatelsene gruppert i seksjoner du kan utvide, for eksempel **Oppmøte**, **Innhold**, **Donasjoner**, **Skjemaer og planer**, **Leksjoner**, **Meldinger**, **Personer og grupper** og **Oppgaver**. Skriv i boksen **Filtrer tillatelser** for å vise bare tillatelsene som samsvarer.

Kryss av eller fjern krysset fra en tillatelse for å gi den til rollen eller fjerne den.

### Donasjonstillatelser

Seksjonen **Donasjoner** har disse tillatelsene:

- **Se donasjonssammendrag** – se donasjonsseksjonen, inkludert sidene Sammendrag, Batcher, Fond, Kampanjer og Giverbekreftelser.
- **Se donasjoner** – se enkeltdonasjoner, for eksempel gavene inne i en batch.
- **Rediger donasjoner** – full kontroll: legge til, redigere og slette donasjoner og batcher, og [lukke og gjenåpne batcher](../donations/batches.md#closing-and-reopening-a-batch).
- **Registrer donasjoner** – legge til batcher og registrere, redigere eller slette donasjoner, men bare i batcher som fortsatt er åpne. Personer med bare denne tillatelsen kan ikke slette batcher, lukke eller gjenåpne dem, eller endre gaver som kom inn via nettgiving.
- **Rediger innstillinger** – administrere donasjonsinnstillinger.

Noen med **Registrer donasjoner**, men uten **Se donasjonssammendrag**, ser bare siden **Batcher** under **Donasjoner**. Gi en telleteam-rolle både **Registrer donasjoner** og **Se donasjoner**, slik at de kan åpne en batch og se gavene de har registrert. Se [Hvem kan endre en batch](../donations/batches.md#who-can-change-a-batch) for detaljer.

### Kun personnavn

Seksjonen **Personer og grupper** inneholder **Se kun personnavn**. Bruk den for frivillige som trenger å slå opp personer etter navn – for eksempel for å velge noen i et søkefelt – uten tilgang til hele katalogen. Med bare denne tillatelsen kan en person:

- Søke etter personer etter navn og se listen over nylig lagt til personer, men ser bare hver persons navn, bilde og medlemsstatus
- Ikke søke etter e-post, se kontaktopplysninger eller åpne katalogen **Personer**

B1 Admin skjuler lenker og knapper som krever tillatelser en rolle ikke har. For eksempel er listen **Alle grupper** bare tilgjengelig for personer som kan redigere grupper, se gruppemedlemmer eller se personer (andre sendes tilbake til dashbordet). Oppmøteoppsett vises bare med **Se oppmøte** eller **Rediger gudstjenester**. Knappen **E-post** for en gruppe vises bare for personer med **Rediger gruppemedlemmer** (tillatelsen som trengs for å sende gruppe-e-post), og utskrift av en gruppeliste krever **Se gruppemedlemmer** eller at man leder gruppen. Å slette en kalenderhendelse krever **Rediger innhold** (eller å trekke tilbake din egen ventende forespørsel).

:::warning
**Domeneadministratorer** har full tilgang til alle områder i ChurchApps-kontoen din. Tillatelsene deres kan ikke endres eller begrenses. Bruk denne rollen bare for de mest pålitelige administratorene dine.
:::

:::tip
Opprett spesifikke roller som «Kasserer» med bare tilgang til **Donasjoner**, «Telleteam» med **Registrer donasjoner** og **Se donasjoner**, eller «Innsjekkingsfrivillig» med bare tilgang til **Oppmøte**. Dette følger prinsippet om minst mulig tilgang og holder dataene dine trygge. Se [Datasikkerhet](./data-security.md) for mer om hvordan ChurchApps beskytter informasjonen din.
:::
