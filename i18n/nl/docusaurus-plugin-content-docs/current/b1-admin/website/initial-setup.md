---
title: "Initiële installatie"
---

# Initiële installatie

<div class="article-intro">

Elk B1-account wordt geleverd met een website gereed om te gaan. Deze gids begeleidt u door het instellen van uw kerkdomein, het configureren van het uiterlijk van uw site, het maken van uw eerste pagina's en het organiseren van uw navigatie.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt een B1.church-account met beheerdersrechten nodig
- Heb uw inloggegevens voor uw DNS-provider gereed (bijv. GoDaddy, Cloudflare of AWS) als u een aangepast domein gebruikt
- Bereid uw kerklogo in PNG-indeling met transparante achtergrond voor voor de beste resultaten

</div>

## Uw domein instellen

Uw kerk ontvangt automatisch een subdomein op B1.church (bijvoorbeeld `yourchurch.b1.church`). U kunt ook uw eigen aangepaste domein naar uw B1-site verwijzen.

1. Ga naar **B1.church Admin** door admin.b1.church te bezoeken of op uw profielvervolgkeuzelijst en het kiezen van **App wisselen** te klikken.
2. Klik op **Dashboard** in de linkerzijbalk en selecteer vervolgens **Instellingen** uit het vervolgkeuzemenu.
3. Klik op **Beheren** om uw subdomein te bekijken. Stel het in op iets kortes en herkenbaars zonder spaties.
4. Als u een aangepast domein wilt gebruiken, meldt u zich aan bij uw DNS-provider (zoals GoDaddy, Cloudflare of AWS) en voegt u twee gegevens toe:
   - Een **A-gegevens** voor uw hoofddomein wijzend naar `3.23.251.61`
   - Een **CNAME-gegevens** voor `www` wijzend naar `proxy.b1.church`
5. Ga terug naar B1.church Admin, voeg uw aangepaste domein aan de lijst toe en klik op **Toevoegen** en vervolgens op **Opslaan**. Uw site is binnen enkele minuten toegankelijk via uw aangepaste domein.

:::tip
Vraag de persoon die uw kerkrekening hebt ingesteld om u de machtiging "Kerkinstellingen bewerken" te verlenen als u de optie Instellingen niet ziet. Zie [Rollen & Machtigingen](../settings/roles-permissions.md) voor details.
:::

## Uw eerste pagina maken

1. Klik in B1 Admin op **Website** in het linkermenu om de weergave Website Pages te openen.
2. Klik in de rechterhoek op **Pagina toevoegen**.
3. Kies **Blank** als het paginatype en noem het "Home".
4. Klik op **Pagina-instellingen** en stel het URL-pad in op `/` (een forward slash zonder tekst) voor uw startpagina. Andere pagina's gebruiken `/paginanaam`.
5. Klik op **Inhoud bewerken** om te beginnen met bouwen. Elke pagina moet beginnen met een **Sectie** -- dit is de container voor alle andere elementen.
6. Nadat u een sectie hebt toegevoegd, klikt u opnieuw op **Inhoud toevoegen** om tekst, afbeeldingen, video's, kaarten, formulieren en meer in te voegen door deze in uw sectie te slepen.

:::info
Voor gedetailleerde instructies over het werken met pagina's, navigatie en paginatypen, raadpleegt u [Pagina's beheren](managing-pages).
:::

## Site-weergave configureren

1. Klik in de weergave Website Pages op het tabblad **Weergave** bovenaan.
2. Gebruik de **kleurenpalette** om uw merkkleurenin voor primaire, secundaire en accenttinten in te stellen.
3. Kies onder **Typography Settings** uw kop- en hoofdtekstlettertypen uit de lettertypebrowser.
4. Upload uw kerklogo onder **Logo** in de Style Settings. Voer zowel een lichte achtergrond als een donkere achtergrondversie in.
5. Configureer uw **Site Footer** met de contactgegevens en koppelingen van uw kerk.

:::info
Wijzigingen die u in Weergave aanbrengt, zijn van toepassing op uw hele website. Zie de pagina [Weergave](appearance) voor gedetailleerde instructies voor elke instelling.
:::

## Navigatie instellen

Uw navigatiekoppen verschijnen in de linkerzijbalk van de weergave Website Pages. Om ze in te delen:

1. Klik op **Toevoegen** om een nieuw navigatiekoppeling te maken en wijs het naar een van uw pagina's.
2. Sleep en zet koppelingen neer om ze opnieuw in te delen of nestels ze onder bovenliggende items.
3. Bekijk uw site om te bevestigen dat de navigatie er correct uitziet.

## Volgende stappen

- [Pagina's beheren](managing-pages) -- Leer hoe u in detail met pagina's en navigatie werkt
- [Weergave](appearance) -- Verfijn de kleuren, lettertypen en indeling van uw site
- [Bestanden](files) -- Upload afbeeldingen en documenten voor uw website
