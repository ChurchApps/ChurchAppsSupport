---
title: "Navigasjonsstiler"
---

# Navigasjonsstiler

<div class="article-intro">

Tilpass fargene på navigasjonslinjen på kirkens nettsted slik at de passer til profilen deres. Du kan angi farger både for solide bakgrunner og gjennomsiktige overlegg, og har dermed full kontroll over hvordan navigasjonen ser ut på ulike sider.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere kirkens nettsted. Se [Roller og tillatelser](../people/roles-permissions.md) for mer informasjon.
- Ha profilfargene klare, inkludert hex-fargekodene (for eksempel #03A9F4).
- Forstå forskjellen mellom solid og gjennomsiktig navigasjonsstil på nettstedet.

</div>

## Forstå navigasjonsmodusene

Navigasjonen på nettstedet kan vises i to ulike stiler, avhengig av siden:

- **Solid navigasjon** -- Navigasjonslinje med bakgrunnsfarge, vanligvis brukt på innholdssider
- **Gjennomsiktig navigasjon** -- Navigasjon som ligger over sideinnholdet, vanligvis brukt på sider med hovedbilde eller bakgrunn over hele skjermen

Du kan tilpasse fargene for de to modusene hver for seg.

## Åpne navigasjonsstiler

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre) og utvid **Nettsted**
2. Klikk på **Utseende**
3. Bla til delen **Navigasjonsstiler**
4. Klikk på **Rediger navigasjonsstiler**

## Konfigurere solid navigasjon

Solid navigasjon vises med en bakgrunnsfarge bak navigasjonslinjen. Du kan tilpasse:

### Bakgrunnsfarge

1. Slå på bryteren **Overstyr** for **Bakgrunnsfarge**
2. Klikk på fargevelgeren
3. Velg ønsket bakgrunnsfarge
4. Standard er hvit (#FFFFFF)

### Lenkefarge

1. Slå på bryteren **Overstyr** for **Lenkefarge**
2. Velg fargen på lenketeksten i navigasjonen
3. Dette gjelder lenker i standardtilstand
4. Standard er mørk grå (#555555)

### Lenkefarge ved hover

1. Slå på bryteren **Overstyr** for **Lenkefarge ved hover**
2. Velg fargen lenkene skifter til når brukere holder musepekeren over dem
3. Dette gir visuell tilbakemelding på klikkbare lenker
4. Standard er lyseblå (#03A9F4)

### Aktiv farge

1. Slå på bryteren **Overstyr** for **Aktiv farge**
2. Velg fargen for lenken til siden som er aktiv
3. Dette hjelper brukerne å se hvilken side de er på
4. Standard er lyseblå (#03A9F4)

## Konfigurere gjennomsiktig navigasjon

Gjennomsiktig navigasjon ligger over sideinnholdet uten bakgrunn. Du kan tilpasse:

### Lenkefarge

1. Slå på bryteren **Overstyr** for **Lenkefarge**
2. Velg en farge som kontrasterer godt mot sidebakgrunnen
3. Hvit eller lyse farger fungerer ofte best over mørke bakgrunner
4. Standard er mørk grå (#555555)

### Lenkefarge ved hover

1. Slå på bryteren **Overstyr** for **Lenkefarge ved hover**
2. Velg fargen for hover-tilstanden
3. Pass på at den er synlig mot sidebakgrunnen
4. Standard er lyseblå (#03A9F4)

### Aktiv farge

1. Slå på bryteren **Overstyr** for **Aktiv farge**
2. Velg fargen som markerer den aktive siden
3. Den bør skille seg ut og samtidig passe til designet
4. Standard er lyseblå (#03A9F4)

:::info
Gjennomsiktig navigasjon har ingen innstilling for bakgrunnsfarge, siden den ligger rett over sideinnholdet.
:::

## Lagre endringene

1. Når du har satt opp fargene, klikker du på **Lagre navigasjonsstiler**
2. Endringene gjelder umiddelbart på det live nettstedet
3. Besøk nettstedet for å se navigasjonen i begge modusene

## Tilbakestille til standard

Hvis du vil gå tilbake til standardfargene:

1. Slå av bryterne **Overstyr** for alle egendefinerte farger
2. Klikk på **Lagre navigasjonsstiler**
3. Navigasjonen går tilbake til standard fargevalg

Du kan også klikke på **Avbryt** for å forkaste alle endringer uten å lagre.

## Anbefalte fremgangsmåter

### Fargekontrast

- **Lesbarhet** -- Pass på at lenkefargene har nok kontrast mot bakgrunnen
- **WCAG-krav** -- Sikt mot et kontrastforhold på minst 4,5:1 for universell utforming
- **Test begge moduser** -- Forhåndsvis nettstedet med både solid og gjennomsiktig navigasjon

### Konsekvent profil

- **Bruk profilfargene deres** -- Tilpass til logoen og nettstedets tema
- **Begrens paletten** -- Hold deg til 2-3 farger for et helhetlig uttrykk
- **Tenk på bildene dine** -- Hvis du bruker gjennomsiktig navigasjon, bør du teste den mot typiske sidebakgrunner

### Hover- og aktive tilstander

- **Tydelig tilbakemelding** -- Gjør hover-tilstander tydelig forskjellige fra vanlige lenker
- **Skill ut aktive sider** -- Bruk en egen farge, slik at brukerne ser hvor de er
- **Myke overganger** -- Systemet animerer fargeendringer automatisk

## Feilsøking

### Fargene ser ikke riktige ut

- **Tøm hurtigbufferen** -- Nettleserens hurtigbuffer kan vise gamle farger
- **Sjekk hex-kodene** -- Pass på at du har skrevet gyldige hex-fargekoder
- **Test på ulike bakgrunner** -- Fargene kan se annerledes ut avhengig av siden

### Navigasjonen er ikke synlig

- **Gjennomsiktig modus** -- Hvis du bruker gjennomsiktig navigasjon over lyse bilder, kan mørk tekst være vanskelig å se
- **Løsning** -- Juster lenkefargene eller bruk mørkere sidebakgrunner
- **Alternativ** -- Legg til en diskret skygge eller bakgrunnsoverlegg i navigasjonsområdet

## Tekniske detaljer

Navigasjonsstiler lagres som JSON og brukes via CSS-variabler:

- Endringer trer i kraft umiddelbart uten at nettstedet må bygges på nytt
- Farger arves av alle navigasjonselementer
- Overstyringer er valgfrie; farger som ikke er satt, bruker temaets standardverdier

## Relaterte artikler

- [Utseende](./appearance.md) -- Tilpass nettstedets overordnede uttrykk
- [Administrere sider](./managing-pages.md) -- Opprett og organiser nettsidene dine
- [Sideredigering](./page-editor.md) -- Utform sideoppsett og innhold
