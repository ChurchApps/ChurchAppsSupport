---
title: "Formulieren maken"
---

# Formulieren maken

<div class="article-intro">

Bouw aangepaste formulieren om informatie van uw gemeente in te verzamelen. U kunt formulieren maken voor event-registraties, enquêtes, bezoekerskaarten, lidmaatschapsaanvragen en meer. Formulieren kunnen aan personen in uw database worden gekoppeld of als zelfstandige pagina's met hun eigen openbare URL worden gebruikt.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Voor **People**-formulieren (gekoppeld aan persoonsgegevens) hebt u eerst [personen in uw database](../people/adding-people.md) nodig.
- Voor formulieren die **betalingen** verzamelen, moet u [Stripe hebben geconfigureerd voor online geven](../donations/online-giving-setup.md).

</div>

## Een nieuw formulier maken

1. Navigeer naar **Formulieren** uit het hoofdmenu.
2. Klik op **Formulier toevoegen**.
3. Voer een **naam** in voor uw formulier.
4. Kies het formuliertype uit de vervolgkeuzelijst:
   - **People** — Associeert inzendingen met [persoonsgegevens](../people/adding-people.md) in uw database.
   - **Stand Alone** — Maakt een zelfstandig formulier met zijn eigen openbare URL, ideaal voor externe registraties.
5. Klik op **Opslaan** om het formulier te maken.

Uw nieuwe formulier verschijnt in de lijst. Klik erop om vragen toe te voegen.

## Vragen toevoegen

1. Open uw formulier en ga naar het tabblad **Vragen**.
2. Klik op **Vraag toevoegen**.
3. Selecteer een **veldtype** uit het Provider-vervolgkeuzemenu. Beschikbare typen zijn:
   - **Textbox** — Voor korte tekstantwoorden
   - **Date** — Voor datumkeuzes
   - **Email** — Voor e-mailadressen
   - **Phone Number** — Voor telefoninvoer
   - **Multiple Choice** — Voor het selecteren uit vooraf gedefinieerde opties
   - **Payment** — Voor het verzamelen van betalingen
4. Voer een **Titel** en optionele **Beschrijving** in voor de vraag.
5. Schakel **Antwoord vereisen** in als het veld verplicht is.
6. Klik op **Opslaan**.
7. Herhaal dit om meer vragen toe te voegen.

:::warning
Het veldtype **Payment** vereist dat Stripe is geconfigureerd. Zie [Online Geven instellen](../donations/online-giving-setup.md) voordat u betalingsvelden toevoegt als u online geven nog niet hebt ingesteld.
:::

## Formuulierleden beheren

1. Open uw formulier en ga naar het tabblad **Leden**.
2. Zoek naar een persoon en voeg deze toe met een rol:
   - **Admin** — Kan het formulier bewerken en alle inzendingen bekijken.
   - **View Only** — Kan inzendingen bekijken maar kan het formulier niet bewerken.

## Formuliereigenschappen configureren

U kunt de naam en instellingen van uw formulier op elk moment bijwerken. Voor Stand Alone-formulieren ziet u ook een unieke **openbare URL** die u met iedereen kunt delen.

:::tip
Stand Alone-formulieren zijn geweldig voor event-registraties. Deel de openbare URL via e-mail, social media of sluit het formulier rechtstreeks in op uw kerkwebsite in.
:::

:::info
Als u een formulier op uw B1-website wilt insluiten, gaat u naar uw website-editor, voegt u een nieuwe sectie toe en selecteert u het **Formulier**-element. Kies vervolgens het formulier dat u wilt weergeven. Zie [Pagina's beheren](../website/managing-pages.md) voor details over het bewerken van uw website.
:::
