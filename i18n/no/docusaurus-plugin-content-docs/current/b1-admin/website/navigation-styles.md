---
title: "Navigasjonsstiler"
description: "Tilpass farger for solide og gjennomsiktige navigasjonslinjer på nettstedet i B1 Admin, inkludert lenke-, hover- og aktiv-tilstander for menighetens nettsted."
---

# Navigasjonsstiler

<div class="article-intro">

Tilpass fargene på navigasjonslinjen på menighetens nettsted slik at de samsvarer med merkevaren din. Du kan konfigurere farger for både solid bakgrunn og gjennomsiktige overlegg, og har full kontroll over hvordan navigasjonen ser ut på ulike sider.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å redigere nettstedinnhold. Se [Roller og tillatelser](../settings/roles-permissions.md) for detaljer.
- Ha merkevarefargene dine klare, inkludert heksadesimale fargekoder (f.eks. #03A9F4).
- Forstå forskjellen mellom solid og gjennomsiktig navigasjon på nettstedet ditt.

</div>

## Forstå navigasjonsmodusene {#understanding-navigation-modes}

Navigasjonen på nettstedet ditt kan vises i to ulike stiler avhengig av siden:

- **Solid navigasjon** -- Navigasjonslinje med bakgrunnsfarge, typisk brukt på innholdssider
- **Gjennomsiktig navigasjon** -- Navigasjon som ligger over sideinnholdet, typisk brukt på sider med hovedbilder eller bakgrunner i fullskjerm

Du kan tilpasse farger for begge modusene uavhengig av hverandre.

## Åpne navigasjonsstiler {#accessing-navigation-styles}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Nettside**
2. Klikk på **Utseende**
3. I listen **Stilinnstillinger** klikker du på **Navigasjon**

Redigeringsverktøyet **Navigasjonsstil** har to kort: **Topptekst (solid)** og **Topptekst over hovedbilde (gjennomsiktig)**.

## Konfigurere solid navigasjon {#configuring-solid-navigation}

Solid navigasjon vises med en bakgrunnsfarge bak navigasjonslinjen. Disse innstillingene finnes i kortet **Topptekst (solid)**. Hver farge er valgfri: så lenge bryteren **Overstyr** er av, beholder navigasjonen nettstedets vanlige farger. Du kan tilpasse:

### Bakgrunnsfarge {#background-color}

1. Slå på bryteren **Overstyr** for **Bakgrunnsfarge**
2. Klikk på fargevelgeren
3. Velg ønsket bakgrunnsfarge (velgeren starter på hvit, #FFFFFF)

### Lenkefarge {#link-color}

1. Slå på bryteren **Overstyr** for **Lenkefarge**
2. Velg fargen for teksten i navigasjonslenkene
3. Dette påvirker lenker i standardtilstand (velgeren starter på mørk grå, #555555)

### Lenke-hover-farge {#link-hover-color}

1. Slå på bryteren **Overstyr** for **Lenke-hover-farge**
2. Velg fargen lenkene skifter til når brukere holder musepekeren over dem
3. Dette gir visuell tilbakemelding for klikkbare lenker (velgeren starter på lys blå, #03A9F4)

### Aktiv farge {#active-color}

1. Slå på bryteren **Overstyr** for **Aktiv lenkefarge**
2. Velg fargen for lenken til den siden som er aktiv nå
3. Dette hjelper brukere å se hvilken side de er på (velgeren starter på lys blå, #03A9F4)

## Konfigurere gjennomsiktig navigasjon {#configuring-transparent-navigation}

Gjennomsiktig navigasjon legger seg over sideinnholdet uten bakgrunn. Disse innstillingene finnes i kortet **Topptekst over hovedbilde (gjennomsiktig)**. Så lenge en bryter for **Overstyr** er av, samsvarer den fargen automatisk med tekstfargen i hovedbildeseksjonen. Du kan tilpasse:

### Lenkefarge {#link-color-1}

1. Slå på bryteren **Overstyr** for **Lenkefarge**
2. Velg en farge som kontrasterer godt med sidens bakgrunn
3. Hvite eller lyse farger fungerer ofte best over mørke bakgrunner

### Lenke-hover-farge {#link-hover-color-1}

1. Slå på bryteren **Overstyr** for **Lenke-hover-farge**
2. Velg fargen for hover-tilstanden
3. Sørg for at den er synlig mot sidens bakgrunn

### Aktiv farge {#active-color-1}

1. Slå på bryteren **Overstyr** for **Aktiv lenkefarge**
2. Velg fargen for indikatoren for aktiv side
3. Den bør skille seg ut samtidig som den passer til designet ditt

:::info
Gjennomsiktig navigasjon har ingen innstilling for bakgrunnsfarge, siden den legger seg direkte over sideinnholdet.
:::

## Lagre endringene dine {#saving-your-changes}

1. Når du har konfigurert fargene dine, klikker du på **Lagre navigasjon**
2. Endringene gjelder med en gang på det live nettstedet ditt
3. Besøk nettstedet ditt for å se navigasjonen i begge modusene

## Gå tilbake til standardverdier {#resetting-to-defaults}

Hvis du vil gå tilbake til standardfargene:

1. Slå av bryterne **Overstyr** for alle egendefinerte farger
2. Klikk på **Lagre navigasjon**
3. Navigasjonen går tilbake til nettstedets vanlige farger (og over et hovedbilde, til tekstfargen i hovedbildet)

Eller klikk på **Avbryt** for å forkaste alle endringer uten å lagre.

## Beste praksis {#best-practices}

### Fargekontrast {#color-contrast}

- **Lesbarhet** -- Sørg for at lenkefargene har nok kontrast til bakgrunnen
- **WCAG-samsvar** -- Sikt mot minst 4,5:1 kontrastforhold for tilgjengelighet
- **Test begge modusene** -- Forhåndsvis nettstedet ditt med både solid og gjennomsiktig navigasjon

### Merkevarekonsistens {#brand-consistency}

- **Bruk merkevarefargene dine** -- Samsvar med logoen og nettstedets tema
- **Begrens paletten din** -- Hold deg til 2-3 farger for et sammenhengende utseende
- **Vurder bildene dine** -- Hvis du bruker gjennomsiktig navigasjon, test den mot vanlige sidebakgrunner

### Hover- og aktive tilstander {#hover-and-active-states}

- **Tydelig tilbakemelding** -- Gjør hover-tilstander tydelig forskjellig fra standardlenker
- **Skill aktive sider** -- Bruk en tydelig farge slik at brukere vet hvor de er
- **Jevne overganger** -- Systemet animerer fargeendringer automatisk

## Feilsøking {#troubleshooting}

### Fargene ser ikke riktige ut {#colors-dont-look-right}

- **Tøm hurtigbufferen** -- Nettleserens hurtigbuffer kan vise gamle farger
- **Sjekk heksadesimale koder** -- Kontroller at du har skrevet inn gyldige heksadesimale fargekoder
- **Test på ulike bakgrunner** -- Fargene kan se annerledes ut avhengig av siden

### Navigasjonen er ikke synlig {#navigation-not-visible}

- **Gjennomsiktig modus** -- Hvis du bruker gjennomsiktig navigasjon over lyse bilder, kan mørk tekst være vanskelig å se
- **Løsning** -- Juster lenkefargene dine, eller bruk mørkere sidebakgrunner
- **Alternativ** -- Legg til en subtil skygge eller et bakgrunnsoverlegg i navigasjonsområdet

## Tekniske detaljer {#technical-details}

Navigasjonsstiler lagres som JSON og brukes via CSS-variabler:

- Endringer trer i kraft med en gang, uten at nettstedet må bygges på nytt
- Fargene arves til alle navigasjonselementer
- Overstyringer er valgfrie; ikke satte farger bruker temaets standardverdier

## Relaterte artikler {#related-articles}

- [Utseende](./appearance.md) -- Tilpass nettstedets generelle utseende og følelse
- [Administrere sider](./managing-pages.md) -- Lag og organiser nettstedets sider
- [Sideeditor](./page-editor.md) -- Design sideoppsett og innhold
