---
title: "Roller og tillatelser"
description: "Sett opp roller i B1 Admin for å styre hva ansatte og frivillige kan se og endre, fra gaver og oppmøte til personer og grupper."
---

# Roller og tillatelser

<div class="article-intro">

Roller lar deg styre hva ulike brukere har tilgang til i ChurchApps-kontoen din. Du kan opprette egendefinerte roller for ansatte, frivillige og andre teammedlemmer, hver med sitt eget tilgangsnivå for å holde dataene dine trygge.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="ZzCIkinVMnE" title="Roller, tillatelser og invitere teamet ditt i B1" next="Sette opp gudstjenester og oppmøte i B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang som domeneadministrator eller en rolle med tillatelse til å administrere roller
- Ha en liste over teammedlemmer og hvilke områder de trenger tilgang til
- Gå gjennom kategoriene for tillatelser nedenfor for å planlegge rollene dine

</div>

## Åpne roller {#accessing-roles}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk på **Roller**.
3. Siden Roller viser alle rollene som er definert for menigheten din. Kolonnen **Medlemmer** viser hvor mange brukere som er i hver rolle, og raden **(Alle)** viser **Alle brukere**.

## Opprette en rolle {#creating-a-role}

Klikk på **Legg til rolle** øverst på siden Roller. Menyen tilbyr:

- **Legg til egendefinert rolle** -- Åpner et skjema for **Rediger rolle** over listen. Skriv inn et **rollenavn** og klikk på **Lagre**. Den nye rollen starter uten tillatelser.
- **Legg til rollen «Regnskap»**, **Legg til rollen «Menighetsansatte»**, **Legg til rollen «Innholdsadministrator»** og **Legg til rollen «Leksjonsadministrator»** -- Ferdiglagde roller med et fornuftig sett tillatelser allerede avkrysset. B1 ber deg bekrefte, og oppretter deretter rollen. Du kan endre tillatelsene etterpå, akkurat som for andre roller.

## Gi nytt navn til eller slette en rolle {#renaming-or-deleting-a-role}

Hold musepekeren over en rollerad og klikk på **Rediger**. I skjemaet **Rediger rolle** endrer du **rollenavnet** og klikker på **Lagre**, eller klikker på **Slett** og bekrefter for å fjerne rollen. Rollen **Domeneadministratorer** kan ikke slettes.

## Forstå en rolles side {#understanding-a-roles-page}

Klikk på en rolles navn for å åpne siden. Den har to paneler:

- **Medlemmer** (venstre) -- Personene i rollen, med navn og e-post.
- **Rediger tillatelser** (høyre) -- Tillatelsene du kan gi til rollen.

Raden **(Alle)** åpner en side for tillatelser som gjelder for alle brukere i menigheten din; den har ingen medlemsliste.

## Legge til brukere i en rolle {#adding-users-to-a-role}

1. Åpne rollen og klikk på **Legg til** i panelet **Medlemmer**. Skjemaet **Legg til i** for den rollen åpnes.
2. Skriv inn et navn eller en e-postadresse i søkeboksen og klikk på søkeknappen.
3. Klikk på legg-til-knappen ved siden av personen. De legges til i rollen med en gang, og B1 tilbyr å sende dem en invitasjons-e-post slik at de kan logge inn.
4. Hvis personen ikke er i menigheten din ennå, klikker du på **Opprett ny bruker** under søkeresultatene, skriver inn **fornavn**, **etternavn** og **e-post**, og klikker på **Lagre**.

For å endre et medlems navn eller e-post klikker du på redigeringsikonet på raden deres.

## Fjerne brukere fra en rolle {#removing-users-from-a-role}

1. Åpne rollen som inneholder brukeren du vil fjerne.
2. Finn personen i listen **Medlemmer**.
3. Klikk på slettikonet på raden deres og bekreft.

Menigheten din må alltid ha minst én domeneadministrator, så den siste medlemmen av **Domeneadministratorer** kan ikke fjernes.

## Konfigurere tillatelser {#configuring-permissions}

Hver rolle kan gis tilgang til bestemte områder i B1 Admin. I panelet **Rediger tillatelser** er tillatelsene gruppert i seksjoner du kan utvide, for eksempel **Oppmøte**, **Innhold**, **Gaver**, **Skjemaer og planer**, **Leksjoner**, **Meldinger**, **Personer og grupper** og **Oppgaver**. Skriv i boksen **Filtrer tillatelser** for å vise bare tillatelsene som passer.

Kryss av eller fjern av en tillatelse for å gi den til rollen eller fjerne den. Hver endring lagres med en gang; det finnes ingen lagre-knapp. Merk at **Rediger kirkeinnstillinger**, som åpner siden Innstillinger, ligger i seksjonen **Innhold**. Hver seksjonsoverskrift viser hvor mange av tillatelsene sine rollen har, for eksempel **2 av 5**, og tallet oppdateres når du krysser av og fjerner av bokser.

### Tillatelser for gaver {#donations-permissions}

Seksjonen **Gaver** har disse tillatelsene:

- **Se gavesammendrag** -- se delen Gaver, inkludert sidene Sammendrag, Batcher, Fond, Kampanjer og Givingsoppgaver.
- **Se gaver** -- se enkeltgaver, for eksempel gavene i en batch.
- **Rediger gaver** -- full kontroll: legg til, rediger og slett gaver og batcher, og [lukk og gjenåpne batcher](../donations/batches.md#closing-and-reopening-a-batch).
- **Registrer gaver** -- legg til batcher og registrer, rediger eller slett gaver, men bare i batcher som fortsatt er åpne. Personer med bare denne tillatelsen kan ikke slette batcher, lukke eller gjenåpne dem, eller endre gaver som kom inn via nettgiving.
- **Rediger innstillinger** -- administrer innstillinger for gaver.

Noen med **Registrer gaver**, men ikke **Se gavesammendrag**, ser bare siden **Batcher** under **Gaver**. Gi et telleteam både **Registrer gaver** og **Se gaver**, slik at de kan åpne en batch og se gavene de registrerte. Se [Hvem kan endre en batch](../donations/batches.md#who-can-change-a-batch) for detaljer.

### Bare navn på personer {#people-names-only}

Seksjonen **Personer og grupper** inneholder **Se bare navn på personer**. Bruk den for frivillige som trenger å slå opp personer på navn -- for eksempel for å velge noen i en søkeboks -- uten tilgang til hele katalogen. Med denne tillatelsen alene kan en person:

- Søke etter personer på navn og se listen over nylig lagt til personer, men bare se hver persons navn, bilde og medlemsstatus
- Ikke søke etter e-post, se kontaktopplysninger eller åpne **Personer**-katalogen

Kombiner **Se bare navn på personer** med **Se oppmøte** eller **Rediger oppmøte** for frivillige som fører klasseoppmøte. **Personer** i menyen deres åpner da **Grupper**, der de kan åpne listen **Alle grupper** og se navnene på medlemmene og samlingene i hver klasse. Med **Rediger oppmøte** kan de også [registrere oppmøte](../attendance/recording-attendance.md) og legge til besøkende ved å søke etter navn. Navnene er ikke lenker til personregistreringer, og konfidensielle grupper forblir skjult med mindre frivilligen er medlem.

B1 Admin skjuler lenker og knapper som krever tillatelser en rolle ikke har. For eksempel er listen **Alle grupper** bare tilgjengelig for personer som kan redigere grupper, se gruppemedlemmer eller se personer, eller som har **Se bare navn på personer** sammen med **Se oppmøte** eller **Rediger oppmøte** (andre sendes tilbake til Oversikten). Oppsettet for oppmøte vises bare med **Rediger tjenester**. Knappen **E-post** for en gruppe vises bare for personer med **Rediger gruppemedlemmer** (tillatelsen som kreves for å sende gruppe-e-post). Å skrive ut en gruppeliste krever **Se gruppemedlemmer** eller at man leder den gruppen. Å slette en kalenderhendelse krever **Rediger innhold** (eller at man trekker tilbake sin egen ventende forespørsel).

### Kontoer for innsjekkingskiosk {#check-in-kiosk-accounts}

Kontoen som logger inn på en [B1 Checkin](../../b1-checkin/getting-started/logging-in.md)-kiosk, trenger tillatelsen **Innsjekking** i seksjonen **Oppmøte** (eller **Rediger oppmøte**). Med bare **Innsjekking** kan kiosken slå opp familier på navn eller telefon, sjekke dem inn og ut, og vise hvem som får hente et barn, uten tilgang til personkatalogen.

Innsjekking gis ikke lenger gjennom raden **(Alle)**. Å være i en rolle med andre tillatelser gjør ikke at noen kan kjøre kiosken; legg til **Innsjekking** i en rolle som «Innsjekkingsfrivillige» og legg kioskkontoene i den.

:::warning
**Domeneadministratorer** har full tilgang til alle områder i ChurchApps-kontoen din. Tillatelsene deres kan ikke endres eller begrenses. Bruk denne rollen bare for dine mest betrodde administratorer.
:::

:::tip
Opprett spesifikke roller som «Kasserer» med bare tilgang til **Gaver**, «Telleteam» med **Registrer gaver** og **Se gaver**, eller «Innsjekkingsfrivillig» med bare tilgang til **Oppmøte**. Dette følger prinsippet om minst mulig tilgang og holder dataene dine trygge. Se [Datasikkerhet](./data-security.md) for mer om hvordan ChurchApps beskytter informasjonen din.
:::
