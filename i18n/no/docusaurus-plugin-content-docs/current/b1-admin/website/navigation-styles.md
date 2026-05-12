---
title: "Navigasjonsstiler"
---

# Navigasjonsstiler

<div class="article-intro">

Tilpass fargene på menighetsnettstedets navigasjonsfelt for å matche merkevarene dine. Du kan konfigurere farger for både solide bakgrunner og gjennomsiktige overlegg, noe som gir deg fullstendig kontroll over hvordan navigasjonen din ser ut på tvers av forskjellige sider.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere menighetsnettstedet ditt. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Ha merkefargene dine klare, inkludert hex-fargekoder (f.eks. #03A9F4).
- Forstå forskjellen mellom solid og gjennomsiktig navigasjonsstil på nettstedet ditt.

</div>

## Forstå navigasjonsmoduser

Nettstedsnavigeringen din kan vises i to forskjellige stiler avhengig av siden:

- **Solid navigasjon** -- Navigasjonsfelt med bakgrunnsfarge, vanligvis brukt på innholdssider
- **Gjennomsiktig navigasjon** -- Navigasjon som legger seg over sideinnholdet, vanligvis brukt på sider med hero-bilder eller fullskjermsbakgrunner

Du kan tilpasse farger for begge moduser uavhengig.

## Få tilgang til navigasjonsstiler

1. Naviger til **Nettsted** i B1 Admin
2. Klikk på **Utseende** i sidefeltet
3. Rull til seksjonen **Navigasjonsstiler**
4. Klikk **Rediger navigasjonsstiler**

## Konfigurere solid navigasjon

Solid navigasjon vises med en bakgrunnsfarge bak navigasjonsfeltet. Du kan tilpasse:

### Bakgrunnsfarge

1. Slå på **Overstyr**-bryteren for **Bakgrunnsfarge**
2. Klikk på fargevelgeren
3. Velg ønsket bakgrunnsfarge
4. Standarden er hvit (#FFFFFF)

### Lenkefarge

1. Slå på **Overstyr**-bryteren for **Lenkefarge**
2. Velg fargen for navigasjonslenketekst
3. Dette påvirker lenker i deres standardtilstand
4. Standarden er mørkegrå (#555555)

### Lenkehover-farge

1. Slå på **Overstyr**-bryteren for **Lenkehover-farge**
2. Velg fargen lenker endrer seg til når brukere holder musen over dem
3. Dette gir visuell tilbakemelding for klikkbare lenker
4. Standarden er lysblå (#03A9F4)

### Aktiv farge

1. Slå på **Overstyr**-bryteren for **Aktiv farge**
2. Velg fargen for den gjeldende aktive sidelenken
3. Dette hjelper brukere å vite hvilken side de er på
4. Standarden er lysblå (#03A9F4)

## Konfigurere gjennomsiktig navigasjon

Gjennomsiktig navigasjon legger seg over sideinnholdet ditt uten bakgrunn. Du kan tilpasse:

### Lenkefarge

1. Slå på **Overstyr**-bryteren for **Lenkefarge**
2. Velg en farge som kontrasterer godt med sidebakgrunnen din
3. Ofte fungerer hvite eller lyse farger best over mørke bakgrunner
4. Standarden er mørkegrå (#555555)

### Lenkehover-farge

1. Slå på **Overstyr**-bryteren for **Lenkehover-farge**
2. Velg hover-tilstandsfargen
3. Sørg for at den er synlig mot sidebakgrunnen din
4. Standarden er lysblå (#03A9F4)

### Aktiv farge

1. Slå på **Overstyr**-bryteren for **Aktiv farge**
2. Velg indikatoren for aktiv side-farge
3. Bør skille seg ut samtidig som den passer til designet ditt
4. Standarden er lysblå (#03A9F4)

:::info
Gjennomsiktig navigasjon har ikke en bakgrunnsfarge-innstilling siden den legger seg direkte over sideinnholdet.
:::

## Lagre endringene dine

1. Etter å ha konfigurert fargene dine, klikk **Lagre navigasjonsstiler**
2. Endringene dine brukes umiddelbart på det live nettstedet ditt
3. Besøk nettstedet ditt for å se navigasjonen i begge moduser

## Tilbakestille til standardverdier

Hvis du vil gå tilbake til standardfargene:

1. Slå av **Overstyr**-bryterne for eventuelle tilpassede farger
2. Klikk **Lagre navigasjonsstiler**
3. Navigasjonen går tilbake til standard fargeskjema

Eller klikk **Avbryt** for å forkaste alle endringer uten å lagre.

## Beste praksis

### Fargekontrast

- **Lesbarhet** -- Sørg for at lenkefarger har nok kontrast med bakgrunnen
- **WCAG-samsvar** -- Sikt mot minst 4,5:1 kontrastforhold for tilgjengelighet
- **Test begge moduser** -- Forhåndsvis nettstedet ditt med både solid og gjennomsiktig navigasjon

### Merkevarekonsistens

- **Bruk merkefargene dine** -- Match logoen og nettstedstemaet ditt
- **Begrens paletten din** -- Hold deg til 2-3 farger for et sammenhengende utseende
- **Vurder bildene dine** -- Hvis du bruker gjennomsiktig navigasjon, test den mot typiske sidebakgrunner

### Hover- og aktive tilstander

- **Tydelig tilbakemelding** -- Gjør hover-tilstander åpenbart forskjellige fra standardlenker
- **Skill aktive sider** -- Bruk en distinkt farge slik at brukere vet hvor de er
- **Jevne overganger** -- Systemet animerer fargeendringer automatisk

## Feilsøking

### Fargene ser ikke riktige ut

- **Tøm hurtigbufferen** -- Nettleser-caching kan vise gamle farger
- **Sjekk hex-koder** -- Sørg for at du har skrevet inn gyldige hex-fargekoder
- **Test på forskjellige bakgrunner** -- Farger kan se forskjellige ut avhengig av siden

### Navigasjonen er ikke synlig

- **Gjennomsiktig modus** -- Hvis du bruker gjennomsiktig navigasjon over lyse bilder, kan mørk tekst være vanskelig å se
- **Løsning** -- Juster lenkefargene dine eller bruk mørkere sidebakgrunner
- **Alternativ** -- Legg til en subtil skygge eller bakgrunnsoverlegg til navigasjonsområdet

## Tekniske detaljer

Navigasjonsstiler lagres som JSON og brukes ved hjelp av CSS-variabler:

- Endringer trer i kraft umiddelbart uten å gjenoppbygge nettstedet
- Farger kaskaderer til alle navigasjonselementer
- Overstyringer er valgfrie; uinnstilte farger bruker temastandarder

## Relaterte artikler

- [Utseende](./appearance.md) -- Tilpass det generelle utseendet og følelsen til nettstedet ditt
- [Administrere sider](./managing-pages.md) -- Opprett og organiser nettsidene dine
- [Sideredigerer](./page-editor.md) -- Design sideoppsett og innhold
