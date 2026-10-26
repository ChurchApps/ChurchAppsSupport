---
title: "Navigere i B1App"
---

# Navigere i B1App

<div class="article-intro">

Medlemsportalen i B1.church er en telefonorientert nettapp som ligger under `/mobile`. Den fungerer i alle nettlesere og kan installeres på hjemskjermen din. Denne siden forklarer Hjem-dashbordet, fanelinjen nederst, Mer-siden og Me-siden.

</div>

## Omvisningsvideo

<YouTube id="8XKRZvvAbXg" title="A Tour of the B1.church Member App" next="A Tour of B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må [være logget inn](./logging-in.md) for å se din personlige informasjon. Besøkende som ikke er logget inn, kan fortsatt bla i offentlig innhold, og får en knapp **Logg inn** der en funksjon krever konto.

</div>

## Hjem {#home}

Hvis du åpner `https://yourchurchname.b1.church/mobile`, kommer du til **Hjem**-dashbordet på `/mobile/dashboard`. Hjem er landingssiden i medlemsportalen. Den starter med en hilsen ("God morgen", "God ettermiddag" eller "God kveld" med fornavnet ditt) og dagens dato, etterfulgt av seksjoner som bare vises når de er relevante:

- **Bildeflater** -- faner menigheten din har gitt et bilde (inkludert Dagens vers), vises som bildeflater under menighetens navn. Avhengig av menighetens valg er de ordnet i et tospaltet rutenett, en rad du sveiper sideveis (som også kan bevege seg av seg selv), eller en liste med en liten miniatyr ved siden av hvert navn. Se [Hjemskjermflater](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Hver bildefane vises her, selv om den også har en plass i fanelinjen.
- **Siste preken** -- menighetens nyeste preken, med en lenke **Alle preker**.
- **Dagens vers** -- dagens vers. Trykk på det for å åpne hele siden [Dagens vers](../content/verse-of-the-day.md).
- **Du tjener** -- dine neste kommende tjenesteoppdrag, med en lenke **Alle planer**. Hvis et oppdrag fortsatt venter på svaret ditt, vises de først med merkelappen **Trenger svar** og knappene **Aksepter** og **Avslå**, slik at du kan svare direkte fra Hjem (**Avslå** ber deg bekrefte først). Ellers viser de neste oppdragene dine merkelappen **Akseptert** eller **Bekreftet**. Trykk på et oppdrag for å åpne planen.
- **Dine grupper** -- opptil tre av gruppene dine med møtetid og sted, og en lenke **Alle grupper**.
- **Kommende arrangementer** -- når du er logget inn, de neste tre kommende arrangementene fra gruppene du tilhører, hver med dato og klokkeslett (og en miniatyr hvis arrangementet har et bilde). Trykk på et arrangement for å åpne gruppens arrangementer. Trykk **Alle kommende arrangementer** for å åpne hele listen på [Me-siden](./me-page.md#upcoming), som også inkluderer tjenesteoppdragene og påmeldingene dine.
- **Mitt oppmøte** og **Mine skjemaer** -- hvis menigheten din slår dem på, hvor mange ganger du har møtt opp de siste 90 dagene, med de to siste besøkene dine, og de to siste skjemainnsendingene dine, med lenker til hele listene. Disse vises alltid på [Me-siden](./me-page.md) uansett. Se [Seksjoner på hjemskjermen](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Gaver** -- hvor mye du har gitt i år ("Gitt i" inneværende år), en knapp **Gi** (vises bare når menigheten din tilbyr gaver på nett), og en lenke **Historikk** til din [gavehistorikk](../giving/donation-history.md). Skjult hvis menigheten din har begrenset medlemmenes gavehistorikk til et tidligere år eller skjult den. I så fall vises menighetens gaveverktøy som en knapp under **Mer fra** i stedet.
- **Mer fra** *din menighet* -- knapper for resten av verktøyene menigheten din har slått på, som ikke allerede er i fanelinjen eller vist ovenfor. Verktøyene du bruker mest, flyttes først.

Seksjonene for tjeneste, grupper, oppmøte, skjemaer og gaver vises bare når du er logget inn, menigheten din har slått på verktøyet, og du har noe å vise, for eksempel et kommende oppdrag eller minst én gruppe. På en datamaskin er Hjem delt i to kolonner.

Hvis du er logget ut, viser Hjem overskriften **Velkommen** i stedet for hilsenen, med en kort melding ("Logg inn for å se gruppene, gavene og mer.") og en knapp **Logg inn**. Meldingen vises selv om menigheten din ikke har satt opp noe annet for Hjem ennå. Menigheten din kan omformulere denne meldingen eller skjule den. Se [Innstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du fortsatt logge inn fra **Mer**-siden eller **Me**-siden.

## Fanelinjen nederst

På en telefon er en fanelinje festet nederst på skjermen:

- **Hjem** -- alltid den første fanen
- Opptil tre av fanene menigheten din har konfigurert
- **Mer** -- åpner Mer-siden

Innebygde skjermer (som Grupper, Gaver eller Planer) får fanerommene først. Ledige plasser går til menighetens egendefinerte sider. Bare lenker til eksterne nettsider og Dagens vers får aldri en fane. Hvis menigheten din har konfigurert flere faner enn det som får plass, går de ikke tapt: de vises på **Mer**-siden og i seksjonen **Mer fra** på Hjem. Administratorer i menigheten angir rekkefølgen på fanene i B1 Admin under **Mobil → Navigasjon**.

## På en datamaskin

På en bredere skjerm, for eksempel en datamaskin eller et stort nettbrett, erstattes fanelinjen nederst av en topptekst i menighetens farge. Den viser menighetens logo, eller navnet hvis ingen logo er angitt (klikk på det for å gå tilbake til Hjem), **Hjem**, opptil fem av fanene menigheten din har konfigurert, og **Mer**. Klokken og profilbildet ditt vises til høyre. Når du åpner en detaljskjerm, vises en lenke **Tilbake** over sideinnholdet.

## Mer-siden {#the-more-page}

Når du trykker på **Mer**, åpnes Mer-siden på `/mobile/more`. Den inneholder:

- Navnet og bildet ditt, med en lenke **Rediger profil** -- se [Rediger profilen din](./editing-your-profile.md)
- Alle fanene menigheten din har konfigurert, i rekkefølge, under menighetens navn. Lenker til eksterne nettsider åpnes i en ny nettleserfane.
- En seksjon **Konto** med:
  - **Me** -- din personlige side (bare for innloggede)
  - **Utseende** -- bytt mellom **Lys modus** og **Mørk modus**
  - **Administrasjonsportal** -- vises bare hvis du har administratortillatelser i menigheten din. Den åpner B1 Admin i en ny fane.
  - **Installer appen** -- åpner [installasjonsveiledningen](./installing-pwa.md) på `/mobile/install` (skjult når appen er installert)
- **Logg ut**, eller en knapp **Logg inn** hvis du er logget ut
- Menighetens navn og en lenke til personvernerklæringen

## Appfeltet

På en telefon viser feltet øverst på hver skjerm:

- Menighetens logo (eller navnet, hvis menigheten ikke har lastet opp en logo) på Hjem og de andre hovedskjermene, eller en tilbakepil når du har gått inn i en detaljskjerm. Skjermens tittel vises øverst på selve siden.
- Et **klokke**-ikon for varsler og meldinger, med en merkelapp for uleste elementer. Se [Varsler og meldinger](#notifications-and-messages) nedenfor.
- Ditt **profilbilde**, som åpner profilen din på `/mobile/profileEdit`. Se [Rediger profilen din](./editing-your-profile.md).

Klokken og profilbildet vises bare når du er logget inn.

## Varsler og meldinger {#notifications-and-messages}

Når du trykker på klokken, åpnes et panel med to seksjoner:

- **Meldinger** -- dine siste private samtaler, med en lenke **Ny melding** for å starte en ny.
- **Varsler** -- dine siste varsler, med merkelappen **Ny** på uleste. Trykk på et varsel for å gå til gruppen, planen eller samtalen det kom fra.

Hver seksjon viser hvor mange uleste elementer den har. Trykk **Se alle** nederst for å åpne hele innboksen din på `/mobile/notifications`.

## Sider med seksjoner

Detaljsidene, for eksempel en gruppe, en plan, Me-siden din og skjermene for Planer og Gaver, er bygd opp som én side med seksjoner i stedet for faner. Hver seksjon viser en kort forhåndsvisning, og en lenke i seksjonens topp (som **Alle medlemmer**, **Alle arrangementer** eller **Full tjenesteorden**) åpner hele listen. En lenke **Tilbake til** øverst i visningen tar deg tilbake til siden du kom fra.

## Me-siden

**Me** (`/mobile/me`) er din personlige oversikt. Den viser navnet og bildet ditt med knappene **Rediger profil** og **Innstillinger** ([varslingsinnstillinger](./notification-preferences.md)). Deretter vises hva som kommer opp for deg, som tjenesteoppdrag, arrangementspåmeldinger og gruppearrangementer, etterfulgt av husstanden din, gruppene dine, [gavene dine](../giving/) i år, skjemaene du har sendt inn, oppmøtehistorikken din, [påmeldingene dine](../events/my-registrations.md) og de nyeste varslene og meldingene dine. Se [Me-siden](./me-page) for detaljer.

Hvis du er logget ut, viser Me-siden en knapp **Logg inn** i stedet.

## Installere på hjemskjermen

Medlemsportalen er en progressiv nettapp (PWA). Besøk `/mobile/install`, eller velg **Installer appen** på Mer-siden, for trinnvise instruksjoner for enheten din. Når den er installert, åpnes den i fullskjerm fra hjemskjermen din, uten nettleserrammer. Se [Installere som app (PWA)](./installing-pwa.md).

## Menighetens offentlige nettsted

Utenfor medlemsportalen har menighetens offentlige nettsted sin egen toppnavigasjon, med lenker administratorene har satt opp. Det gjelder sider som [preker](../content/sermons.md), [Bibelen](../content/bible.md), [direktesendinger](../content/live-streaming.md) og en offentlig gruppeliste. På en telefon ligger disse lenkene bak hamburgerikonet øverst til høyre i toppteksten.

:::info
Fanene og verktøyene du ser varierer fra menighet til menighet. Administratorer styrer hvilke seksjoner medlemmene kan se via B1 Admin. Hvis du ikke ser en funksjon som beskrives her, har kanskje menigheten din ikke slått den på.
:::
