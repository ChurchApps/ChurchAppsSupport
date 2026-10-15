---
title: "Navigere i B1App"
---

# Navigere i B1App

<div class="article-intro">

Medlemsportalen i B1.church er en mobilfokusert webapp som ligger under `/mobile`. Den fungerer i alle nettlesere og kan installeres på hjemskjermen. Denne siden forklarer Hjem-dashbordet, fanelinjen nederst, siden Mer og siden Meg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må være [logget inn](./logging-in.md) for å se din personlige informasjon. Besøkende som er logget ut, kan fortsatt bla i offentlig innhold, og de får en knapp **Logg inn** der en funksjon krever en konto.

</div>

## Hjem

Hvis du åpner `https://yourchurchname.b1.church/mobile`, kommer du til dashbordet **Hjem** på `/mobile/dashboard`. Hjem er startsiden i medlemsportalen. Den starter med en hilsen («God morgen», «God ettermiddag» eller «God kveld» med fornavnet ditt) og dagens dato, etterfulgt av seksjoner som bare vises når de er relevante:

- **Siste preken** – kirkens nyeste preken, med en lenke **Alle prekener**
- **Dagens vers** – dagens vers; trykk på det for å åpne hele siden [Dagens vers](../content/verse-of-the-day.md)
- **Du tjener** – dine neste kommende tjenesteoppdrag, med en lenke **Alle planer**. Hvis et oppdrag fortsatt venter på svar fra deg, vises de først med et merke **Trenger svar** og knappene **Godta** / **Takk nei**, slik at du kan svare direkte fra Hjem. Ellers viser de neste oppdragene dine et merke **Akseptert** eller **Bekreftet**. Trykk på et oppdrag for å åpne planen.
- **Dine grupper** – opptil tre av gruppene dine med møtetid og sted, og en lenke **Alle grupper**
- **Giving** – hvor mye du har gitt dette året («Gitt i» inneværende år), en **Gi**-knapp og en lenke **Historikk** til [gavehistorikken din](../giving/donation-history.md)
- **Mer fra** *kirken din* – knapper for resten av verktøyene kirken din har slått på som ikke allerede finnes i fanelinjen eller vises over. Dem du bruker mest, flyttes først.

Seksjonene for tjeneste, grupper og giving vises bare når du er logget inn, kirken din har slått på verktøyet, og du har noe å vise – for eksempel et kommende oppdrag eller minst én gruppe. På en datamaskin er Hjem delt i to kolonner.

Hvis du er logget ut, viser Hjem en overskrift **Velkommen** i stedet for hilsenen, med en kort melding («Logg inn for å se gruppene, gavene og mer.») og en knapp **Logg inn**. Kirken din kan omformulere denne meldingen eller skjule den – se [Innstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du fortsatt logge inn fra siden **Mer** eller siden **Meg**.

## Fanelinjen nederst

På en telefon er en fanelinje festet nederst på skjermen:

- **Hjem** – alltid den første fanen
- Opptil tre av fanene kirken din har konfigurert
- **Mer** – åpner siden Mer

Lenker til eksterne nettsteder, egendefinerte sider og Dagens vers får aldri en egen fane. Hvis kirken din har konfigurert flere faner enn det er plass til, går de ikke tapt: de vises på siden **Mer** og i seksjonen **Mer fra** på Hjem. Kirkeadministratorer setter rekkefølgen på fanene i B1 Admin under **Mobil → Navigasjon**.

## På datamaskinen

På en bredere skjerm, for eksempel en datamaskin eller et stort nettbrett, erstattes fanelinjen nederst av en topptekst i kirkens farge. Den viser kirkens navn (klikk på det for å gå tilbake til Hjem), **Hjem**, opptil fem av fanene kirken din har konfigurert, og **Mer**, med klokken og profilbildet ditt til høyre. Når du åpner en detaljside, vises en lenke **Tilbake** over sideinnholdet.

## Siden Mer

Når du trykker på **Mer**, åpnes siden Mer på `/mobile/more`. Den inneholder:

- Navnet og bildet ditt, med en lenke **Rediger profil** – se [Redigere profilen din](./editing-your-profile.md)
- Alle fanene kirken din har konfigurert, i rekkefølge, under kirkens navn. Lenker til eksterne nettsteder åpnes i en ny nettleserfane.
- En seksjon **Konto** med:
  - **Meg** – din personlige side (kun for innloggede)
  - **Utseende** – bytt mellom **Lys modus** og **Mørk modus**
  - **Administrasjonsportal** – vises bare hvis du har administratortillatelser i kirken din; den åpner B1 Admin i en ny fane
  - **Installer appen** – åpner [installasjonsveiledningen](./installing-pwa.md) på `/mobile/install` (skjult når appen er installert)
- **Logg ut**, eller en knapp **Logg inn** hvis du er logget ut
- Kirkens navn og en lenke til personvernerklæringen

## Topplinjen

På en telefon viser linjen øverst på hver skjerm:

- Kirkens navn på Hjem og de andre hovedskjermene, eller en tilbakepil når du har gått inn i en detaljskjerm. Skjermens tittel vises øverst på selve siden.
- Et **klokke**-ikon for varsler og meldinger, med et merke for uleste elementer – se [Varsler og meldinger](#notifications-and-messages) nedenfor
- Profilbildet ditt, som åpner profilen din på `/mobile/profileEdit` – se [Redigere profilen din](./editing-your-profile.md)

Klokken og profilbildet vises bare når du er logget inn.

## Varsler og meldinger

Når du trykker på klokken, åpnes et panel med to seksjoner:

- **Meldinger** – de nyeste private samtalene dine, med en lenke **Ny melding** for å starte en
- **Varsler** – de nyeste varslene dine, med et merke **Ny** på uleste. Trykk på et varsel for å gå til gruppen, planen eller samtalen det kom fra.

Hver seksjon viser hvor mange uleste elementer den har. Trykk på **Se alle** nederst for å åpne hele innboksen din på `/mobile/notifications`.

## Sider med seksjoner

Detaljsider – en gruppe, en plan, siden Meg, og skjermene for Planer og Giving – er oppbygd som én side med seksjoner i stedet for faner. Hver seksjon viser en kort forhåndsvisning, og en lenke i seksjonens overskrift (for eksempel **Alle medlemmer**, **Alle arrangementer** eller **Hele gudstjenesteordenen**) åpner hele listen. En lenke **Tilbake til** øverst i visningen tar deg tilbake til siden du kom fra.

## Siden Meg

**Meg** (`/mobile/me`) er din personlige samlingsside. Den viser navnet og bildet ditt med knappene **Rediger profil** og **Innstillinger** ([varslingsinnstillinger](./notification-preferences.md)), deretter det som kommer for deg – tjenesteoppdrag, påmeldinger til arrangementer og gruppearrangementer – etterfulgt av husstanden din, gruppene dine, [giving](../giving/) i år, dine [påmeldinger](../events/my-registrations.md), og de nyeste varslene og meldingene dine. Se [Siden Meg](./me-page) for detaljer.

Hvis du er logget ut, viser siden Meg en knapp **Logg inn** i stedet.

## Installere på hjemskjermen

Medlemsportalen er en progressiv webapp. Besøk `/mobile/install` (eller velg **Installer appen** på siden Mer) for trinn-for-trinn-instruksjoner for enheten din. Når den er installert, åpnes den i fullskjerm fra hjemskjermen uten nettleserelementer. Se [Installere som app (PWA)](./installing-pwa.md).

## Kirkens offentlige nettsted

Utenfor medlemsportalen har kirkens offentlige nettsted sin egen toppnavigasjon med lenker som administratorene har konfigurert – sider som [prekener](../content/sermons.md), [Bibelen](../content/bible.md), [direktesending](../content/live-streaming.md) og en offentlig gruppeliste. På en telefon ligger disse lenkene bak hamburgerikonet øverst til høyre i toppteksten.

:::info
Fanene og verktøyene du ser, varierer fra kirke til kirke. Administratorer styrer hvilke seksjoner som er synlige for medlemmer gjennom B1 Admin, så hvis du ikke ser en funksjon som beskrives her, har kanskje ikke kirken din slått den på.
:::
