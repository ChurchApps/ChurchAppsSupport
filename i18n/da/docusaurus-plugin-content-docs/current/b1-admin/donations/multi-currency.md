---
title: "Understøttelse af flere valutaer"
---

# Understøttelse af flere valutaer

<div class="article-intro">

B1's funktion til flere valutaer giver din kirke mulighed for at modtage og spore donationer i forskellige valutaer. Dette er særligt nyttigt for kirker med internationale medlemmer, missionærer eller flere campusser i forskellige lande.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du skal have tilladelse til at administrere donationer. Se [Roller og tilladelser](../people/roles-permissions.md) for detaljer.
- Opsæt din [online giving](./online-giving-setup.md) med Stripe, som understøtter transaktioner i flere valutaer.
- Forstå din kirkes regnskabsbehov for håndtering af flere valutaer.

</div>

## Aktivere flere valutaer

Understøttelse af flere valutaer er nu aktiveret som standard i B1. Når det er aktiveret:

- Medlemmer kan give i deres lokale valuta, når de donerer online
- Du kan manuelt registrere donationer i enhver valuta
- Donationsrapporter viser beløb i deres oprindelige valuta
- Stripe håndterer valutakonvertering automatisk for online giving

## Understøttede valutaer

Systemet understøtter alle større verdensvalutaer, herunder:

- **USD** -- Amerikanske dollar
- **EUR** -- Euro
- **GBP** -- Britiske pund
- **CAD** -- Canadiske dollar
- **AUD** -- Australske dollar
- **MXN** -- Mexicanske pesos
- **BRL** -- Brasilianske real
- **INR** -- Indiske rupees
- **CNY** -- Kinesiske yuan
- **JPY** -- Japanske yen
- Og mange flere...

De tilgængelige valutaer til online giving afhænger af, hvilke valutaer din Stripe-konto understøtter.

## Registrere donationer i forskellige valutaer

### Online donationer

Når et medlem giver online gennem Stripe:

1. De vælger deres foretrukne valuta ved kassen
2. Stripe behandler betalingen i den valuta
3. Donationen registreres i B1 med det oprindelige valutabeløb
4. Stripe håndterer automatisk enhver nødvendig valutakonvertering til din kontos standardvaluta

### Manuel indtastning

For at registrere en kontant- eller checkdonation i en anden valuta:

1. Naviger til **Donationer** i B1 Admin
2. Klik **Tilføj donation**
3. Vælg valutaen fra valuta-dropdown-menuen
4. Indtast beløbet i den valuta
5. Udfyld resten af donationsdetaljerne
6. Klik **Gem**

## Se donationer i flere valutaer

### Donationsrapporter

Donationsrapporter viser beløb i deres oprindelige valuta:

- Individuelle donationsregistreringer viser valutakoden (f.eks. "$100.00 USD")
- Totaler beregnes per valuta
- Du kan filtrere efter specifikke valutaer

### Givelseserklæringer

Ved generering af givelseserklæringer:

- Hver donation vises med sin oprindelige valuta
- Totaler opdeles efter valuta
- Medlemmer ser præcis, hvad de gav i hver valuta

## Stripe-integration

Til online giving håndterer Stripe transaktioner i flere valutaer:

- **Automatisk konvertering** -- Stripe konverterer valutaer til din kontos standardvaluta
- **Valutakurser** -- Stripe bruger aktuelle markedsvalutakurser
- **Gebyrer** -- Valutakonvertering kan medføre yderligere Stripe-gebyrer
- **Udbetalingsvaluta** -- Midler indsættes i din kontos standardvaluta

:::info
Tjek dit Stripe-dashboard for at se aktuelle konverteringskurser og eventuelle gebyrer forbundet med transaktioner i flere valutaer.
:::

## Regnskabsmæssige overvejelser

Når du arbejder med flere valutaer:

- **Bogføring** -- Hold styr på oprindelige donationsbeløb og valutaer for nøjagtig rapportering
- **Valutakurser** -- Bemærk at Stripes konverteringskurser kan afvige fra din banks kurser
- **Skattekvitteringer** -- Rådfør dig med din revisor om, hvordan du rapporterer donationer i forskellige valutaer til skatteformål
- **Fondsallokering** -- Du kan allokere donationer til specifikke fonde uanset valuta

## Bedste praksis

- **Standardvaluta** -- Indstil din primære kirkevaluta som standard for de fleste transaktioner
- **Klar kommunikation** -- Fortæl givere hvilken valuta de giver i under kasseprocessen
- **Konsistent rapportering** -- Beslut om du vil rapportere i oprindelige valutaer eller konvertere til én valuta for sammendrag
- **Regelmæssig afstemning** -- Afstem Stripe-udbetalinger med dine donationsregistreringer, under hensyntagen til valutakonverteringer

## Begrænsninger

- Valutakonvertering håndteres af Stripe kun for online giving
- Manuelle donationer registreres som indtastet uden automatisk konvertering
- Historiske rapporter viser donationer i deres oprindelige valutaer
- Totalberegninger foretages per valuta, ikke på tværs af valutaer

## Relaterede artikler

- [Opsætning af online giving](./online-giving-setup.md) -- Konfigurer Stripe til at modtage donationer
- [Registrere donationer](./recording-donations.md) -- Indtast donationsregistreringer manuelt
- [Donationsrapporter](./donation-reports.md) -- Generer og se donationssammendrag
- [Givelseserklæringer](./giving-statements.md) -- Opret årsafslutningens givelseserklæringer
