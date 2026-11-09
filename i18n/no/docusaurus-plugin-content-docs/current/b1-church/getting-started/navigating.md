---
title: "Navigere i B1App"
description: "Finn frem i B1.church-medlemsportalen på telefon eller datamaskin: hjemmeskjermen, nederste fanelinje, Mer-siden og Meg-siden."
---

# Navigere i B1App

<div class="article-intro">

Medlemsportalen i B1.church er en telefonorientert webapp som ligger under `/mobile`. Den fungerer i alle nettlesere og kan installeres på startskjermen din. Denne siden forklarer hjemmeskjermen, fanelinjen nederst, Mer-siden og Meg-siden.

</div>

## Turvideo

<YouTube id="8XKRZvvAbXg" title="En omvisning i B1.church-medlemsappen" next="En omvisning i B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må [være logget inn](./logging-in.md) for å se dine personlige opplysninger. Besøkende som ikke er innlogget, kan fortsatt se offentlig innhold, og får en knapp for **Logg inn** der en funksjon krever en konto.

</div>

## Hjem {#home}

Hvis du åpner `https://yourchurchname.b1.church/mobile`, kommer du til dashbordet **Hjem** på `/mobile/dashboard`. Hjem er startsiden i medlemsportalen. Den begynner med en hilsen («God morgen», «God ettermiddag» eller «God kveld» med fornavnet ditt) og dagens dato, og deretter seksjoner som bare vises når de er relevante:

- **Nyheter** -- hvis menigheten din slår det på, de siste blogginnleggene fra menigheten som fotokort som glir av seg selv. Trykk på et kort for å lese hele innlegget uten å forlate appen, eller trykk **Alle nyheter** for hele listen. Hvert innlegg har en lenke **Vis på nettstedet** til det samme innlegget på menighetens nettsted -- se [Seksjoner på startskjermen](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Fotofliser** -- faner menigheten din har gitt et bilde (inkludert Dagens vers) vises som fotofliser under menighetens navn. Avhengig av menighetens valg er de ordnet som et rutenett med to kolonner, en rad du sveiper sidelengs (som også kan bevege seg av seg selv), en liste med et lite miniatyrbilde ved siden av hvert navn, eller tre utvalgte fliser (som rutenett eller en selvgående rad) med resten listet under og en lenke **Alle** til hele listen -- se [Fliser på startskjermen](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Når den sidelengs rade har flere fliser enn det får plass på skjermen, viser en rad med prikker under den hvor du er; trykk på en prikk for å hoppe til den flisen. Raden fortsetter fremover og begynner på nytt fra den første flisen etter den siste. Hver fotofane vises her, også en som har en plass i fanelinjen.
- **Dine oppfølginger** -- når du er innlogget, dine to nyeste åpne oppgaver og arbeidsflytkort (kort først), med en lenke **Alle** til hele listen **Mine oppgaver**. Oppgaver og kort listes med de nyeste først der og også på [Meg-siden](./me-page.md).
- **Siste preken** -- menighetens nyeste preken, med en lenke **Alle prekener**
- **Dagens vers** -- dagens vers; trykk på det for å åpne hele siden [Dagens vers](../content/verse-of-the-day.md)
- **Du tjenestegjør** -- dine neste kommende tjenesteoppdrag, med en lenke **Alle planer**. Hvis noen oppdrag fortsatt venter på svaret ditt, vises de først med et merke for **Trenger svar** og knappene **Godta** / **Avslå** slik at du kan svare direkte fra Hjem (**Avslå** ber deg bekrefte først); ellers viser de neste oppdragene dine et merke for **Godtatt** eller **Bekreftet**. Trykk på et oppdrag for å åpne planen.
- **Dine grupper** -- opptil tre av gruppene dine med møtetid og sted, og en lenke **Alle grupper**
- **Kommende arrangementer** -- når du er innlogget, dine tre neste kommende gruppearrangementer og arrangementspåmeldinger samlet, i datorekkefølge, hver med dato og klokkeslett (og et miniatyrbilde hvis arrangementet har et bilde). Hver rad har merket **Arrangement** (et arrangement fra en gruppe du er medlem av) eller **Påmelding** (et arrangement du har [meldt deg på](../events/registering.md)); et arrangement du er påmeldt til, vises én gang, som en påmelding. Trykk på et arrangement for å åpne gruppens arrangementer, eller på en påmelding for å åpne [påmeldingene dine](../events/my-registrations.md). Trykk på **Alle kommende arrangementer** for å åpne hele listen over kommende på [Meg-siden](./me-page.md#upcoming), som også inkluderer tjenesteoppdragene og påmeldingene dine.
- **Mitt oppmøte** og **Mine skjemaer** -- hvis menigheten din slår dem på, hvor mange ganger du var til stede de siste 90 dagene med de to siste besøkene dine, og de to siste skjemainnsendingene dine, med lenker til hele listene. Disse vises alltid på [Meg-siden](./me-page.md) uansett -- se [Seksjoner på startskjermen](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Giving** -- hvor mye du har gitt i år («Gitt i» inneværende år), en knapp **Gi** (vises bare når menigheten din tilbyr giving på nett), og en lenke **Historikk** til din [giving-historikk](../giving/donation-history.md). Skjult hvis menigheten din har begrenset medlemmers giving-historikk til et tidligere år eller skjult den, og i så fall vises menighetens giving-verktøy som en knapp under **Mer fra** i stedet
- **Mer fra** *din menighet* -- knapper for resten av verktøyene menigheten din har slått på som ikke allerede står i fanelinjen eller vises over. De du bruker mest, flyttes til fronten.

Seksjonene for tjeneste, grupper, oppmøte, skjemaer og giving vises bare når du er innlogget, menigheten din har slått på verktøyet, og du har noe å vise -- for eksempel et kommende oppdrag eller minst én gruppe. På en datamaskin er Hjem delt i to kolonner.

Hvis du er utlogget, viser Hjem overskriften **Velkommen** i stedet for hilsenen, med en kort melding («Logg inn for å se gruppene dine, gaver og mer.») og en knapp for **Logg inn**. Meldingen vises selv om menigheten din ikke har satt opp noe annet for Hjem ennå. Menigheten din kan skrive om meldingen eller skjule den -- se [Innstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du fortsatt logge inn fra siden **Mer** eller siden **Meg**.

## Den nederste fanelinjen

På en telefon er en fanelinje festet nederst på skjermen:

- **Hjem** -- alltid den første fanen
- Opptil tre av fanene menigheten din har satt opp
- **Mer** -- åpner Mer-siden

Innebygde skjermer (som Grupper, Gaver eller Planer) får fanenes plasser først; eventuelle ledige plasser går til menighetens egne sider. Bare lenker til eksterne nettsider og Dagens vers får aldri en fane. Hvis menigheten din har satt opp flere faner enn det får plass til, er de ikke tapt: de vises på siden **Mer** og i seksjonen **Mer fra** på Hjem. Menighetsadministratorer setter rekkefølgen på fanene i B1 Admin under **Mobil → Navigasjon**.

### Mappefaner {#folder-tabs}

Menigheten din kan gruppere flere faner i en **mappe**. En mappe vises som en hvilken som helst annen fane -- i fanelinjen, på siden **Mer** eller som en fotoflis på Hjem -- og når du trykker på den, åpnes en skjerm med mappens navn som lister fanene inni. Hvis alle fanene i mappen har et bilde, vises de som fotofliser; ellers vises de som en liste. Lenker til eksterne nettsider i en mappe åpnes i en ny nettleserfane. Faner inne i en mappe vises bare på mappens skjerm, ikke i fanelinjen eller på siden **Mer**. En mappe uten noe du kan se, er skjult.

## På en datamaskin

På en større skjerm, for eksempel en datamaskin eller et stort nettbrett, erstattes den nederste fanelinjen av en topptekst i menighetens farge. Den viser menighetens logo, eller navnet hvis ingen logo er satt (klikk på det for å gå tilbake til Hjem), **Hjem**, opptil fem av fanene menigheten din har satt opp, og **Mer**, med varselklokken og profilbildet ditt til høyre. Når du åpner en detaljskjerm, vises en lenke **Tilbake** over innholdet på siden.

## Mer-siden {#the-more-page}

Ved å trykke på **Mer** åpnes Mer-siden på `/mobile/more`. Den inneholder:

- Navnet og bildet ditt, med en lenke **Rediger profil** -- se [Redigere profilen din](./editing-your-profile.md)
- Alle fanene menigheten din har satt opp, i rekkefølge, under menighetens navn. Lenker til eksterne nettsider åpnes i en ny nettleserfane.
- En seksjon **Konto** med:
  - **Meg** -- din personlige side (bare når du er innlogget)
  - **Utseende** -- bytt mellom **lys modus** og **mørk modus**
  - **Adminportal** -- vises bare hvis du har administratortillatelser i menigheten din; åpner B1 Admin i en ny fane
  - **Installer appen** -- åpner [installasjonsveiledningen](./installing-pwa.md) på `/mobile/install` (skjult når appen er installert)
- **Logg ut**, eller en knapp for **Logg inn** hvis du er utlogget
- Menighetens navn og en lenke til personvernerklæringen

## Appmenyen

På en telefon viser linjen øverst på hver skjerm:

- Menighetens logo (eller navnet, hvis menigheten ikke har lastet opp en logo) på Hjem og de andre hovedskjermene, eller en tilbakepil når du har gått inn i en detaljskjerm. Skjermens tittel vises øverst på selve siden.
- En **klokke** for varsler og meldinger, med et merke for uleste elementer -- se [Varsler og meldinger](#notifications-and-messages) nedenfor
- **Profilbildet** ditt, som åpner profilen din på `/mobile/profileEdit` -- se [Redigere profilen din](./editing-your-profile.md)

Klokken og profilbildet vises bare når du er innlogget.

## Varsler og meldinger {#notifications-and-messages}

Når du trykker på klokken, åpnes et panel med to seksjoner:

- **Meldinger** -- dine siste private samtaler, med en lenke **Ny melding** for å starte en
- **Varsler** -- dine siste varsler, med merket **Ny** på uleste. Trykk på et varsel for å gå til gruppen, planen eller samtalen det kom fra.

Hver seksjon viser hvor mange uleste elementer den har. Trykk på **Se alle** nederst for å åpne hele innboksen din på `/mobile/notifications`.

## Sider med seksjoner

Detaljsider -- en gruppe, en plan, Meg-siden din og skjermene for planer og giving -- er bygget som én side med seksjoner i stedet for faner. Hver seksjon viser en kort forhåndsvisning, og en lenke i seksjonens overskrift (for eksempel **Alle medlemmer**, **Alle arrangementer** eller **Fullstendig gudstjenesteorden**) åpner hele listen. En lenke **Tilbake til** øverst i visningen tar deg tilbake til siden du kom fra.

## Meg-siden

**Meg** (`/mobile/me`) er din personlige side. Den viser navnet og bildet ditt med knappene **Rediger profil** og **Innstillinger** ([varselinnstillinger](./notification-preferences.md)), og deretter det som kommer for deg -- tjenesteoppdrag, arrangementspåmeldinger og gruppearrangementer -- fulgt av husstanden din, gruppene dine, [giving](../giving/index.md) i år, skjemaene du har sendt inn, oppmøtehistorikken din, [påmeldingene](../events/my-registrations.md) dine, og de nyeste varslene og meldingene dine. Se [Meg-siden](./me-page.md) for detaljer.

Hvis du er utlogget, viser Meg-siden en knapp for **Logg inn** i stedet.

## Installere på startskjermen

Medlemsportalen er en progressiv webapp (PWA). Besøk `/mobile/install` (eller velg **Installer appen** på Mer-siden) for trinnvise instruksjoner for enheten din. Når den er installert, åpnes den i fullskjerm fra startskjermen, uten nettleserens menyer. Se [Installere som app (PWA)](./installing-pwa.md).

## Menighetens offentlige nettsted

Utenfor medlemsportalen har menighetens offentlige nettsted sin egen navigasjon øverst med lenker administratorene har satt opp -- sider som [prekener](../content/sermons.md), [Bibelen](../content/bible.md), [direktesending](../content/live-streaming.md) og en offentlig gruppeliste. På en telefon ligger disse lenkene bak hamburgerikonet øverst til høyre i toppteksten.

:::info
Fanene og verktøyene du ser varierer fra menighet til menighet. Administratorer styrer hvilke deler som er synlige for medlemmene gjennom B1 Admin, så hvis du ikke ser en funksjon som er beskrevet her, har ikke menigheten din kanskje slått den på.
:::
