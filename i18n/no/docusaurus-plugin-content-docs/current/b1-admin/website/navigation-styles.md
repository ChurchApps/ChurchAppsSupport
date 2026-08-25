---
title: "Navegasjonstiler"
---

# Navegasjonstiler

<div class="article-intro">

Tilpass nettstedets navigasjonsfarger for å stemme med merkevaren din. Du kan konfigurere farger for både solid bakgrunn og gjennomsiktige overlays, noe som gir deg fullstendig kontroll over hvordan navigasjonen ser ut på tvers av ulike sider.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere nettstedet. Se [Roles & Permissions](../people/roles-permissions.md) for detaljer.
- Ha merkefarger klar, inkludert heksfarger (f.eks. #03A9F4).
- Forstå forskjellen mellom solid og gjennomsiktig navegasjonsstiler på nettstedet.

</div>

## Forståelse av navegasjonsmoduser

Nettstedets navigasjon kan vises i to forskjellige stiler avhengig av siden:

- **Solid navigation** -- Navegasjonsbar med bakgrunnsfarget
- **Transparent navigation** -- Navigasjon som overlayer sideinholdet

Du kan tilpasse farger for begge moduser uavhengig.

## Tilgang til navegasjonstiler

1. Naviger til **Website** i B1 Admin
2. Klikk **Appearance**-fanen øverst
3. Scroll til **Navigation Styles**-seksjonen
4. Klikk **Edit Navigation Styles**

## Konfigurering av solid navigasjon

Solid navigasjon vises med bakgrunnsfarget bak navegasjonslinjen.

### Bakgrunnsfarget

1. Slå på **Override**-bryteren for **Background Color**
2. Klikk fargemarkøren
3. Velg ønsket bakgrunnsfarget
4. Standard er hvit (#FFFFFF)

### Lenkefarget

1. Slå på **Override**-bryteren for **Link Color**
2. Velg farget for navegasjonslenketekst
3. Standard er mørk grå (#555555)

### Hover-farget

1. Slå på **Override**-bryteren for **Link Hover Color**
2. Velg farget lenker endres til når brukere hoverer over dem
3. Standard er lysblå (#03A9F4)

### Aktiv farget

1. Slå på **Override**-bryteren for **Active Color**
2. Velg farget for gjeldende sidens link
3. Standard er lysblå (#03A9F4)

## Konfigurering av gjennomsiktig navigasjon

Gjennomsiktig navigasjon overlayer sideinholdet uten bakgrunn.

### Lenkefarget

1. Slå på **Override**-bryteren for **Link Color**
2. Velg en farget som kontraster godt med sidens bakgrunn
3. Hvit eller lys farger fungerer ofte best over mørke bakgrunner
4. Standard er mørk grå (#555555)

### Hover-farget

1. Slå på **Override**-bryteren for **Link Hover Color**
2. Velg hover-tilstandsfarget
3. Sørg for at det er synlig mot sidens bakgrunn
4. Standard er lysblå (#03A9F4)

### Aktiv farget

1. Slå på **Override**-bryteren for **Active Color**
2. Velg farget for aktivsideindikatoren
3. Skal skille seg ut og samtidig passe designet
4. Standard er lysblå (#03A9F4)

:::info
Gjennomsiktig navigasjon har ingen bakgrunnsfargeinnstilling siden den overlayer sideinholdet direkte.
:::

## Lagring av endringene

1. Etter konfigurering av fargene, klikk **Save Navigation Styles**
2. Endringene gjelder umiddelbart på nettstedet
3. Besøk nettstedet for å se navigasjonen i begge moduser

## Tilbakestilling til standard

Hvis du vil gå tilbake til standardfargene:

1. Slå av **Override**-bryterne for eventuelle egendefinerte farger
2. Klikk **Save Navigation Styles**
3. Navigasjonen går tilbake til standardfargeskjemaet

Eller klikk **Cancel** for å forkaste alle endringer uten å lagre.

## Beste praksis

### Fargekontrast

- **Lesbarhet** -- Sørg for at lenkefargene har nok kontrast mot bakgrunnen
- **WCAG-samsvar** -- Strebe for minst 4.5:1 kontrastforhold for tilgjengelighet

### Konsistens i merkevaregivning

- **Bruk merkefarger** -- Samsvare logoen og nettstedtemaet
- **Begrens paletten** -- Hold deg til 2-3 farger for et sammenhengende utseende

## Relaterte artikler

- [Appearance](./appearance.md) -- Tilpass nettstedets generelle utseende
- [Managing Pages](./managing-pages.md) -- Opprett og organiser nettstedssider
