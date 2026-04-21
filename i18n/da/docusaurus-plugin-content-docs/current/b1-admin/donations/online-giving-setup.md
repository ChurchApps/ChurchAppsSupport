---
title: "Online Giving Setup"
---

# Online Giving Setup

<div class="article-intro">

B1 Admin integreres med **Stripe** og **PayPal**, så dine medlemmer kan give online gennem dit B1.church-websted. Når det er konfigureret, vises onlinedonationer automatisk i dine donationsrecords sammen med manuelt indlæste gaver, hvilket holder alt i ét system.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Opsæt dine [donationsfonde](funds.md), så givere kan udpege deres gaver
- Opret en Stripe-konto på [stripe.com](https://stripe.com) og aktivér det (tag det ud af testningsvej)
- Har dine B1 Admin-loginoplysninger klar

</div>

## Opsætning af Stripe

1. Opret en konto på [stripe.com](https://stripe.com), hvis du ikke allerede har en. Sørg for at **aktivere din konto** og tag den ud af testningsvej.
2. I Stripe skal du gå til **Developers > API Keys**.
3. Kopier din **Publishable Key**.
4. Log ind i [B1 Admin](https://admin.b1.church/).
5. Klik **Kirke** i den øverste navigation, og klik derefter **Rediger kirkeindstillinger**.
6. Klik på redigeringsikonet ved siden af **Kirkeindstillinger**.
7. Rul ned til sektionen **Giving**.
8. Indstil **Udbyder** til **Stripe**.
9. Indsæt din Publishable Key i feltet **Offentlig nøgle**.
10. Gå tilbage til Stripe og afsløre din **Secret Key** (du kan kun se dette en gang, så gem en backup).
11. Indsæt Secret Key i feltet **Secret Key** og klik **Gem**.

:::warning
Din Stripe Secret Key vises kun én gang. Kopier det til et sikkert sted, før du navigerer væk fra Stripe-dashboardet. Hvis du mister det, skal du generere en ny nøgle.
:::

## Tilføjelse af en donationsside til dit B1.church-sted

1. Gå til [b1.church](https://b1.church/) og log ind.
2. Klik **Indstillinger**-ikonet.
3. Klik **Tilføj fane**.
4. Vælg **Donation** som typen.
5. Angiv et navn til fanen (f.eks. "Giv") og klik **Gem**.
6. Du kan også ændre faneikonet -- skriv "Giv" i ikonsøgningen for et giverrelateret ikon.

Din donationsside er nu live. Medlemmer kan besøge den på `yoursubdomain.b1.church/donate`.

## Deling af dit giverlink

For at finde dit giverURL skal du gå til **B1 Admin** og klikke på ikonet **Indstillinger** for at se dit subdomæne. Dit giverlink følger formatet:

`https://yoursubdomain.b1.church/donate`

Del dette link på dit websted, i e-mails eller i dit bulletin, så medlemmerne ved, hvor de skal give online.

## Donationsmeddelelser

Stripe sender en e-mailmeddelelse hver gang en donation modtages. For at ændre e-mailadressen for meddelelse skal du gå til Stripe-dashboardet, klikke din profil i øverste højre hjørne, vælge **Profil**, og opdatere din e-mailadresse.

## Behandling af gebyrindstillinger

Du kan konfigurere din giverside til at lade givere valgfrit dække behandlingsgebyrer, så din kirke modtager hele donationsbeløbet. Denne indstilling administreres i dine kirkeindstillinger inden for B1 Admin.

:::tip
Efter opsætning skal du foretage en lille testdonation for at bekræfte, at alt fungerer, før du annoncerer online giving til din menighed.
:::

## Næste trin

- Brug [Stripe Import](stripe-import.md) til at trække onlinetransaktioner ind i B1 Admin, hvis de ikke synkroniseres automatisk
- Kontroller dine [Donationsrapporter](donation-reports.md) for at bekræfte, at onlinedonationer vises korrekt
- Generer [Giverbekendtelser](giving-statements.md), der inkluderer både online og offline donationer
