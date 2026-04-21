---
title: "administrering af sider"
---

# administrering af sider

<div class="article-intro">

websted sider visning er dines centrale hub til opbygning, redigering og organisation af alle sider på dines kirkewebsted. Du kan administrere både dines siden indhold og dines websteds navigation fra denne enkelt skærm.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- fuldført [oprindelig opsætning](initial-setup) for at konfigurere dines domæne og basis websted indstillinger
- Har dines indhold og billeder klar. Brug [filer](files) administrator for at upload medie aktiver først.

</div>

## forstå siden typer

**sider** tabel lister ethvert siden på dines websted sammen med dets status:

- **genererede** -- sider som var automatisk opbygget af systemet baseret på dines kirkes data (for eksempel, gruppe siden eller prædikener siden). Disse sider opdater sig selv som dines data ændringer.
- **brugerdefineret** -- sider som du opbygget dine selv med dines egen indhold og layout.

Du kan konvertere ethvert auto-genererede siden ind i brugerdefineret siden hvis du ønsker fuld styre over dets indhold og design.

## Tilføj og rediger sider

1. Klik **Tilføj siden** knap i øverste højre hjørne af sider tabel.
2. vælg siden type (blank eller skabelon) og giv det navn.
3. Klik **rediger** ved siden af ethvert siden for at åbne siden bygger, hvor du kan Tilføj sektioner, tekst, billeder og andre elementer.
4. Klik **siden indstillinger** for at opdater siden titel, URL sti og anden metadata.
5. Brug **forhåndsvisning** knap for at åbne dines siden i nyt vindue og se præcis hvordan den vil se ud til besøgende.

:::tip
til dines hjemmeside, indstil URL sti til blot `/`. til alle andre sider, brug beskrivende sti som `/om` eller `/kontakt`.
:::

## administrering af navigation

Venstre sidebar af websted sider visning viser dines navigations links. Disse links styre menuen som besøgende se på dines websted.

1. Klik **Tilføj** for at opbygge ny navigations link. Du kan peg den til ethvert siden på dines websted eller til ekstern URL.
2. for at omorden links, træg og slip dem ind i ordenen du ønsker. Du kan også hej links under forældre element for at opbygge dropdown menuer.
3. Klik **rediger** ikon ved siden af ethvert link for at ændring dets etiket, URL eller position.
4. for at fjerne link fra navigation, klik **slet** ikon.

:::info
fjernelse af navigations link slet ikke siden selv. siden stadig eksisterer og kan få adgang direkte ved dets URL -- den blot vil ikke vises i menu.
:::

## tip til organisation af dines websted

- holde dines top-niveau navigation til fem eller seks elementer så besøgende kan finde ting hurtigt.
- Brug hej links til relaterede under-sider (for eksempel, "om" dropdown med "vores hold," "tro" og "historie").
- gennemgå dines navigation på mobil ved at klikke **mobil forhåndsvisning** for at sikre det virker godt på mindre skærme.
- giv sider klare, beskrivende navne som hjælpe besøgende forstå hvad de vil finde.

:::tip
Du kan Tilføj [formularer](../forms/creating-forms.md) til dines sider for at indsamle registreringer, bøn anmodninger eller anden information fra besøgende.
:::

## billede lightbox

når besøgende klik på billede på dines websted, det åbner ind i fuldskærm lightbox overlay. Dette lader mennesker se billeder på større størrelse uden at forlade siden. ingen konfiguration er påkrævet — lightbox er aktiveret automatisk til billeder i dines siden indhold.

## Næste trin

- [oprindelig opsætning](initial-setup) -- første-tid opsætning instruktioner
- [udseende](appearance) -- tilpas dines websteds visuelt tema
- [filer](files) -- upload og administrer medie aktiver til dines sider
