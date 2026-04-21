---
title: "oprindelig opsætning"
---

# oprindelig opsætning

<div class="article-intro">

ethvert B1 konto kommer med websted klar til at gå. Denne vejledning går dig gennem opsætning af dine kirkedomæne, konfigurering af dines websted udseende, opbygning af dines første sider og organisation af dines navigation.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for B1.church konto med administrativ adgang
- Hvis bruger brugerdefineret domæne, har dines DNS udbyder login kredenser klar (f.eks. godaddy, cloudflare eller AWS)
- forberede dines kirkelogo i PNG format med transparent baggrund til de bedste resultater

</div>

## opsætning af dines domæne

Dines kirke automatisk modtager underdomæne på B1.church (for eksempel, `dinkirke.b1.church`). Du kan også peg dines egen brugerdefinerede domæne til dines B1 websted.

1. gå til **B1.church Admin** ved at besøge admin.b1.church eller klik dines profil dropdown og vælg **skifte app**.
2. Klik **dashboard** i venstre sidebar, derefter vælg **indstillinger** fra dropdown menu.
3. Klik **administrér** for at se dines underdomæne. indstil det til noget kort og genkendelig med ingen mellemrum.
4. for at bruge brugerdefineret domæne, log ind til dines DNS udbyder (såsom godaddy, cloudflare eller AWS) og Tilføj to registreringer:
   - En **A registrering** til dines rod domæne peger til `3.23.251.61`
   - En **CNAME registrering** til `www` peger til `proxy.b1.church`
5. vend tilbage til B1.church Admin, Tilføj dines brugerdefinerede domæne til listen og klik **Tilføj** derefter **gem**. Dines websted vil være tilgængelig fra dines brugerdefinerede domæne inden for få minutter.

:::tip
Hvis du ikke ser indstillinger mulighed, spørg personen som opsætning dines kirke konto for at give dig "rediger kirkens indstillinger" tilladelse. Se [roller og tilladelser](../settings/roles-permissions.md) til detaljer.
:::

## opbygning af dines første siden

1. I B1 Admin, klik **websted** i venstre menu for at åbne websted sider visning.
2. Klik **Tilføj siden** i øverste højre hjørne.
3. vælg **blank** som siden type og navn den "hjem."
4. Klik **siden indstillinger** og indstil URL sti til `/` (fremad skråstreg med ingen tekst) til dines hjemmeside. andre sider brug `/side-navn`.
5. Klik **rediger indhold** for at starte opbygning. ethvert siden skal starte med **sektion** -- dette er container til alle andre elementer.
6. Efter tilføjelse af sektion, klik **Tilføj indhold** igen for at indsæt tekst, billeder, videoer, kort, formularer og mere ved at træk dem ind i dines sektion.

:::info
til detaljerede instruktioner på arbejde med sider, navigation og siden typer, se [administrering af sider](managing-pages).
:::

## konfigurering af websted udseende

1. fra websted sider visning, klik **udseende** fane øverst.
2. Brug **farve palet** for at indstille dines mærke farver til primær, sekundær og accent toner.
3. under **typografi indstillinger**, vælg dines overskrift og brødtekst skrifttyper fra skrifttype browser.
4. upload dines kirkelogo under **logo** i stil indstillinger. giv både lyst baggrund og mørk baggrund version.
5. konfigurér dines **websted footer** med dines kirkes kontakt information og links.

:::info
ændringer du gør i udseende anvend på tværs af dines hele websted. Se [udseende](appearance) siden til detaljerede instruktioner på hver indstilling.
:::

## opsætning af navigation

Dines navigations links vises i venstre sidebar af websted sider visning. for at organisere dem:

1. Klik **Tilføj** for at opbygge ny navigations link og peg den til en af dines sider.
2. træg og slip links for at omorden dem eller hej dem under forældre elementer.
3. forhåndsvisning dines websted for at bekræfte navigation ser korrekt ud.

## Næste trin

- [administrering af sider](managing-pages) -- lær hvordan til at arbejde med sider og navigation i detaljer
- [udseende](appearance) -- fine-tune dines websteds farver, skrifttyper og layout
- [filer](files) -- upload billeder og dokumenter til dines websted
