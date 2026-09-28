---
title: "Navigering av B1App"
---

# Navigering av B1App

<div class="article-intro">

Medlemsportalen i B1.church er en mobil-først nettapp som ligger under `/mobile`. Den fungerer i hvilken som helst nettleser og kan installeres på startskjermen din. Denne siden forklarer Home-instrumentpanelet, fanelinjen nederst, More-menyen og Min Side.

</div>

<div class="prereqs">
<h4>Før Du Begynner</h4>

- Du må være [logget inn](./logging-in.md) for å se din personlige informasjon. Avloggede besøkende kan fortsatt bla gjennom offentlig innhold og får tilbud om en **Logg Inn**-knapp der en funksjon krever en konto.

</div>

## Hjem

Åpning av `https://dinkirkenavn.b1.church/mobile` tar deg til **Hjem**-instrumentpanelet på `/mobile/dashboard`. Hjem er landingssiden for medlemsportalen og viser:

- En hilsen med ditt navn
- Dagens vers
- Et fremhevet kort for hva kirken din har fremhevet
- Et **Utforsk**-rutenett over verktøyene kirken din har skrudd på -- grupper, givning, innsjekking, prekener, planer og mer

Trykk på et kort i Utforsk for å åpne det verktøyet. Hvis kirken din har flere verktøy enn som passer på instrumentpanelet, er det siste kortet **Mer**, som åpner den fullstendige listen på `/mobile/more`.

## Fanelisten nederst

På en telefon er en fanelist festet til bunnen av skjermen:

- **Hjem** -- alltid første fane
- Opptil tre av fanene kirken din har konfigurert
- **Mer** -- åpner navigasjonsmenyen

Hvis kirken din har konfigurert mer enn tre faner, forsvinner resten ikke: de vises i **Mer**-menyen og på instrumentpanelet Utforsk-rutenettet. Kirkeadministratorer angir faneordenen i B1 Admin under **Mobil → Navigering**.

## Menyen

Trykk på **Mer** for å åpne navigasjonsmenyen. På et nettbrett eller skrivebord er den samme menyen alltid synlig langs venstre side av skjermen. Den inneholder:

- Ditt navn og foto, med en **Rediger Profil**-snarvei -- se [Redigering av Din Profil](./editing-your-profile.md)
- **Hjem** og **Min**
- **Admin Portal** -- vises bare hvis du har administratortillatelser på kirken din; den åpner B1 Admin
- Hver fane kirken din konfigurerte, i rekkefølge
- **Installer App** -- åpner [installasjonsinstruksjonene](./installing-pwa.md) på `/mobile/install`
- En lys-/mørk modus-veksler
- **Logg Inn** eller **Logg Ut**
- Kirkens navn og en lenke til personvernerklæringen

## Applinjen

Linjen øverst på hver skjerm viser:

- Skjermtittelen, eller kirkenavn på Hjem
- En bakpil når du har drillet inn i en detalj-skjerm
- Et **klokke**-ikon for varsler og meldinger, med et merke for uleste elementer
- Ditt **profilfoto**, som åpner profilen din på `/mobile/profileEdit` -- se [Redigering av Din Profil](./editing-your-profile.md)

## Min Side

**Min** (`/mobile/me`) er ditt personlige knutepunkt. Det viser snarveier til profilen din, [varselpreferanser](./notification-preferences.md), meldinger, [givning](../giving/), og [registreringer](../events/my-registrations.md), fulgt av hva som venter deg -- tjenesteoppdrag, arrangementsregistreringer og gruppearrangementer -- og dine siste varsler. Se [Min Side](./me-page) for detaljer.

Hvis du er logget ut, viser Min Side en **Logg Inn**-knapp i stedet.

## Installering til Startskjermen Din

Medlemsportalen er en Progressive Web App. Besøk `/mobile/install` (eller velg **Installer App** i menyen) for trinn-for-trinn instruksjoner for enheten din. Når den er installert, åpnes den fullskjerm fra startskjermen uten nettleserkrom. Se [Installering som en App (PWA)](./installing-pwa.md).

## Kirkens Offentlige Nettsted

Utenfor medlemsportalen har kirkens offentlige nettsted sin egen topptekst-navigering med lenker administratorene har konfigurert -- sider som [prekener](../content/sermons.md), [Bibelen](../content/bible.md), [direktesending](../content/live-streaming.md), og en offentlig gruppeliste. På en telefon befinner disse lenkene seg bak hamburgerikonet øverst til høyre i toppteksten.

:::info
Fanene og verktøyene du ser varierer etter kirke. Administratorer kontrollerer hvilke seksjoner som er synlige for medlemmer gjennom B1 Admin, så hvis du ikke ser en funksjon beskrevet her, kan kirken din ikke ha skrudd på den.
:::
