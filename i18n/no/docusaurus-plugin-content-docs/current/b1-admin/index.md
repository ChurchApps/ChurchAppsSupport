---
title: "Oversikt over B1 Admin"
---

# Oversikt over B1 Admin

<div class="article-intro">

B1 Admin er kirkens administrasjonsdashbord. Det gir verktøy for å administrere alle sider av kirkens drift -- fra medlemskataloger og gaver til nettstedbygging og direktesending -- alt fra ett sted.

</div>

## Komme i gang

1. Åpne nettleseren og gå til [admin.b1.church](https://admin.b1.church)
2. Logg inn med brukernavn og passord
3. Du havner på **Dashbordet**, hjemmesiden din. Den viser ukens gudstjenesteorden, hvem som sjekker inn og tjenestegjør i sanntid, alt som krever oppmerksomhet (for eksempel ventende godkjenninger eller forespørsler om å bli med i grupper), dine åpne oppgaver og gruppene dine

:::tip
Ny i B1 Admin? Start med [Introduksjonen](./introduction) for en videogjennomgang, og besøk deretter [Innstillinger](./settings/) for å konfigurere kirkeinformasjonen din og invitere teamet ditt.
:::

## Dashbordet ditt

Dashbordet er hjemmesiden din i B1 Admin (`/`). Det er bygget rundt kirkens ukentlige gudstjeneste:

- **Ukens gudstjeneste** -- navnet på gjeldende eller kommende plan og gudstjenesteordenen, med en lenke til hele planen
- **Livestatus** -- når folk begynner å sjekke inn på søndagen, viser siden hvor mange som er i rommet, hvem som tjenestegjør denne timen, førstegangsgjester, og en oversikt rom for rom med kapasitetslinjer
- **Krever oppmerksomhet** -- ventende godkjenninger og forespørsler om å bli med i grupper som krever handling
- **Mine oppgaver** og **Mine grupper** -- dine åpne oppgaver (legg til en med **Legg til oppgave**, eller klikk **Alle oppgaver** for hele listen) og gruppene du er med i

Hva dashbordet viser avhenger av [rollen](./settings/roles-permissions.md) din. For eksempel vises lenken til hele planen bare hvis du kan åpne den planen (du redigerer planer, tilhører planens tjenesteområde, eller tjenestegjør på den), og lenken **Alle grupper** vises bare hvis du kan administrere grupper, se gruppemedlemmer eller se personer.

:::tip
Alle seksjoner, inkludert Preken, Kalendere, Mobil og Innstillinger, finnes i [hurtigmenyen](./introduction.md#getting-around-with-the-jump-menu) øverst til venstre i B1 Admin. Klikk på den eller trykk **Ctrl+K** (eller **Cmd+K**), og bla eller begynn å skrive.
:::

## Hovedfunksjoner

- **[Personer](./people/)** – Administrer kirkekatalogen din, legg til medlemmer, rediger data i bulk, og bla etter husstand eller som en sorterbar tabell. Hver person åpnes på én postside med detaljene sine til venstre og sammendrag av oppmøte, gaver, grupper, notater og skjemaer ved siden av. Finn personer som nylig er lagt til med søket **Dato lagt til**. [Notater](./people/notes)-siden lister opp nylige notater på tvers av personer, grupper, arrangementer og arbeidsflytkort
- **[Grupper](./groups/)** – Opprett og organiser kirkegrupper med forespørsler om å bli med, medlemsadministrasjon, gruppe-e-post, personlige gruppe-SMS-er med gjenbrukbare tekstmaler og en plassholder for gruppenavn, og utskrivbare kontaktlister. Hver gruppe åpnes på én side med handlingene sine til venstre og sammendrag av medlemmer, økter, kalender og helse ved siden av
- **[Oppmøte](./attendance/)** – Sett opp kirkesteder og gudstjenestetider, følg navngitt oppmøte med utskrivbare navnelister for klasser, se hvilke klasser som fortsatt mangler registrert oppmøte, før enkle telling av oppmøte med trendrapporter, gi hver gudstjenestetid en innsjekkingsplan slik at selvinnsjekking åpner og stenger av seg selv, i hvert kirkesteds tidssone, og la førstegangsgjester melde seg på via en [QR-kode](./attendance/check-in#guest-registration-via-qr-code) med feltene du velger
- **[Gaver](./donations/)** – Før gaver i flere valutaer, administrer fond, før en enkelt gave fra en persons post, skriv ut bunter (én om gangen eller alle bunter i et datointervall) på kirkens brevark med fondsummer, lukk bunter når de er talt opp, importer en bunt fra en CSV-fil, la telleteam registrere gaver med tillatelsen **Registrer gaver**, og lag oppgaver som skrives ut med kirkens logo
- **[Tjeneste](./serving/)** – Koordiner frivillige, lag gudstjenesteplaner (eller kopier en fremover hver uke i opptil 12 uker), send påminnelser via push, e-post eller SMS, send SMS til alle som er satt opp med **SMS til frivillige**, administrer oppgaver, og flytt personer gjennom trinnvise arbeidsflyter som kan sende e-post og SMS, varsle en ansatt, registrere oppmøte og følge med på om frivillige har bekreftet sine oppdrag. Planlagte arbeidsflytregler kan finne fraflyttede faste givere, og utskrevne planer utelater tomme kolonner
- **[Skjemaer](./forms/)** – Lag egendefinerte skjemaer for påmeldinger og datainnsamling, legg til et overskriftsbilde, del frittstående skjemaer med en QR-kode, og koble et skjema til en gruppe slik at lederne kan lese og skrive ut svarene
- **[Rapporter](./reports/)** – Se rapporter for bursdager, oppmøte og gaver
- **[Nettsted](./website/)** – Bygg og administrer kirkens nettsted med egendefinerte navigasjonsstiler, følg besøk på nettstedet ditt og B1-appen med din GA4-ID, eller slå av det offentlige nettstedet og behold bare medlemsportalen
- **[Preken](./sermons/)** – Administrer preken-biblioteket ditt, direktesending og en automatisk podcast-feed
- **[Kalendere](./calendars/)** – Lag utvalgte kalendere, administrer romreservasjoner og ressurser, og se tilgjengelighet. Ta imot [arrangementspåmeldinger](./calendars/paid-registrations) med prissatte deltakertyper, legg til deltakere manuelt uten å belaste dem, og la folk melde seg på og betale senere når kirken din ikke har nettbasert giving
- **[Innstillinger](./settings/)** – Konfigurer alt fra én rullende side med en hurtigliste: kirkeinfo, region, format for dato og telefonnummer, SMS (inkludert din egen Twilio-konto), roller med antall medlemmer, tillatelser og egendefinerte personfelt

:::info
Klikk på spørsmålstegnikonet øverst til høyre på en hvilken som helst side for rask tilgang til hjelp og dokumentasjon. For å endre fargetemaet (**Standard**, **Klassisk** eller **Egendefinert**) eller bytte mellom lys og mørk modus, åpner du brukermenyen din og bruker **Temainnstillinger**. For å beskytte kontoen din med en kode fra en autentiseringsapp, slå på [tofaktorinnlogging](./profile/managing-profile#two-factor-sign-in) på profilen din.
:::

For støtte, send e-post til [support@churchapps.org](mailto:support@churchapps.org).
