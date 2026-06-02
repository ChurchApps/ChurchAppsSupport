---
title: "Navigasjonsstiler"
---

# Navigasjonsstiler

<div class="article-intro">

Tilpass kirkens nettstedsnavigasjonsfelts farger for å matche merkvaringstilen din. Du kan konfigurere farger for både solid bakgrunner og transparente overlag, noe som gir deg fullstendig kontroll over hvordan navigasjonen vises på tvers av ulike sider.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere kirkens nettsted. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Ha merkvaringskulørene dine klare, inkludert hex-fargekoder (f.eks. #03A9F4).
- Forstå forskjellen mellom solid og transparent navigasjonsstiler på nettstedet ditt.

</div>

## Forstå navigasjonsmodus

Nettstedets navigasjon kan vises i to forskjellige stiler avhengig av siden:

- **Solid navigasjon** -- Navigasjonsfelt med bakgrunnsfarge, typisk brukt på innholdssider
- **Transparent navigasjon** -- Navigasjon som overlag på sideinnholdet, typisk brukt på sider med herobildinger eller helfull-skjermbakgrunner

Du kan tilpasse farger for begge modusene uavhengig.

## Tilgang til navigasjonsstiler

1. Gå til **Nettsted** i B1 Admin
2. Klikk på **Utseende** i sidestolpen
3. Scroll til **Navigasjonsstiler**-seksjonen
4. Klikk **Rediger navigasjonsstiler**

## Konfigurering av solid navigasjon

Solid navigasjon vises med bakgrunnsfarge bak navigasjonsfeltet. Du kan tilpasse:

### Bakgrunnsfarge

1. Bytt **Overstyring**-bryteren for **bakgrunnsfarge**
2. Klikk fargesamleren
3. Velg ønsket bakgrunnsfarge
4. Standard er hvit (#FFFFFF)

### Lenkefargen

1. Bytt **Overstyring**-bryteren for **lenkefargen**
2. Velg fargen for tekst på navigasjonslenke
3. Dette påvirker lenker i standardtilstand
4. Standard er mørk grå (#555555)

### Lenke-hover-farge

1. Bytt **Overstyring**-bryteren for **Lenke-hover-farge**
2. Velg fargen lenkene endres til når brukere svever over dem
3. Dette gir visuell tilbakemelding for klikkbare lenker
4. Standard er lyseblå (#03A9F4)

### Aktiv farge

1. Bytt **Overstyring**-bryteren for **Aktiv farge**
2. Velg fargen for gjeldende aktiv sidelenke
3. Dette hjelper brukere med å vite hvilken side de er på
4. Standard er lyseblå (#03A9F4)

## Konfigurering av transparent navigasjon

Transparent navigasjon overlag sideinnholdet ditt uten bakgrunn. Du kan tilpasse:

### Lenkefargen

1. Bytt **Overstyring**-bryteren for **lenkefargen**
2. Velg en farge som kontrasterer godt med sidens bakgrunn
3. Hvite eller lyse farger fungerer ofte best over mørk bakgrunn
4. Standard er mørk grå (#555555)

### Lenke-hover-farge

1. Bytt **Overstyring**-bryteren for **Lenke-hover-farge**
2. Velg schwebestatusfargen
3. Sørg for at den er synlig mot sidens bakgrunn
4. Standard er lyseblå (#03A9F4)

### Aktiv farge

1. Bytt **Overstyring**-bryteren for **Aktiv farge**
2. Velg fargen for indikatoren for aktiv side
3. Bør trekke oppmerksomhet samtidig som du passer til designet
4. Standard er lyseblå (#03A9F4)

:::info
Transparent navigasjon har ingen bakgrunnsfarginnstilling siden den overlag sideinnholdet direkte.
:::

## Lagring av endringer

1. Etter konfigurering av fargene, klikk **Lagre navigasjonsstiler**
2. Endringene dine tas i bruk umiddelbar på nettstedet ditt
3. Besøk nettstedet ditt for å se navigasjonen i begge moduser

## Tilbakestilling til standarder

Hvis du vil gå tilbake til standardfargene:

1. Slå av **Overstyring**-bryterne for egendefinerte farger
2. Klikk **Lagre navigasjonsstiler**
3. Navigasjonen går tilbake til standardfargeskjemaet

Eller klikk **Avbryt** for å forkaste alle endringer uten å lagre.

## Beste praksis

### Fargekontrast

- **Lesbarhet** -- Sørg for at lenkefarger har nok kontrast med bakgrunnen
- **WCAG samsvar** -- Sikte på minst 4.5:1 kontrastforhold for tilgjengelighet
- **Test begge modusene** -- Forhåndsvisning av nettstedet ditt med både solid og transparent navigasjon

### Merkvaringssamstemmelse

- **Bruk merkvaringskulørene dine** -- Matcher logo og nettstedstema
- **Begrenset palett** -- Hold deg til 2-3 farger for et samstemmende utseende
- **Tenk på bildene dine** -- Hvis du bruker transparent navigasjon, test den mot typiske sidbakgrunner

### Hover og aktive tilstander

- **Klar tilbakemelding** -- Gjør hoverstater åpenbart annerledes fra standard lenker
- **Skjell aktive sider** -- Bruk en distinkt farge slik at brukere vet hvor de er
- **Glatte overganger** -- Systemet animerer automatisk fargeendringer

## Feilsøking

### Farger ser ikke riktig ut

- **Tøm bufferen** -- Nettlesercaching kan vise gamle farger
- **Sjekk hex-koder** -- Sørg for at du skrev inn gyldige hex-fargekoder
- **Test på ulike bakgrunner** -- Farger kan se annerledes ut avhengig av siden

### Navigasjon ikke synlig

- **Transparent modus** -- Hvis du bruker transparent navigasjon over lyse bilder, kan mørkere tekst være vanskelig å se
- **Løsning** -- Juster lenkefarger eller bruk mørkere sidbakgrunner
- **Alternativ** -- Legg til en subtil skygge eller bakgrunnsoverlag på navigasjonsområdet

## Tekniske detaljer

Navigasjonsstiler lagres som JSON og brukes ved hjelp av CSS-variabler:

- Endringer trer i kraft umiddelbar uten å gjenoppbygge nettstedet
- Farger kaskader til alle navigasjonselementene
- Overstyringer er valgfrie; uangivne farger bruker standardtemaet

## Relaterte artikler

- [Utseende](./appearance.md) -- Tilpass nettstedets overordnede utseende og følelse
- [Administrering av sider](./managing-pages.md) -- Opprett og organiser nettstedssider
- [Sideditor](./page-editor.md) -- Design sidelayout og innhold
