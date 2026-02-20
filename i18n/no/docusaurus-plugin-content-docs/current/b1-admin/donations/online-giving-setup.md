---
title: "Oppsett av nettbasert givertjeneste"
---

# Oppsett av nettbasert givertjeneste

<div class="article-intro">

B1 Admin integreres med **Stripe** og **PayPal** slik at medlemmene dine kan gi på nett gjennom din B1.church-side. Når det er konfigurert, vises nettbaserte donasjoner automatisk i donasjonsregistrene dine sammen med manuelt registrerte gaver, slik at alt holdes i ett system.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [donasjonsfondene](funds.md) dine slik at givere kan angi formålet med gavene sine
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha påloggingsinformasjonen til B1 Admin klar

</div>

## Sette opp Stripe

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke allerede har en. Sørg for å **aktivere kontoen din** og ta den ut av testmodus.
2. I Stripe, gå til **Developers > API Keys**.
3. Kopier din **Publishable Key**.
4. Logg inn på [B1 Admin](https://admin.b1.church/).
5. Klikk **Church** i toppnavigasjonen, deretter klikk **Edit Church Settings**.
6. Klikk redigeringsikonet ved siden av **Church Settings**.
7. Rull ned til **Giving**-seksjonen.
8. Sett **Provider** til **Stripe**.
9. Lim inn din Publishable Key i **Public Key**-feltet.
10. Gå tilbake til Stripe og vis din **Secret Key** (du kan bare se denne én gang, så lagre en sikkerhetskopi).
11. Lim inn Secret Key i **Secret Key**-feltet og klikk **Save**.

:::warning
Din Stripe Secret Key vises bare én gang. Kopier den til et sikkert sted før du navigerer bort fra Stripe-dashbordet. Hvis du mister den, må du generere en ny nøkkel.
:::

## Legge til en donasjonsside på din B1.church-side

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk **Settings**-ikonet.
3. Klikk **Add Tab**.
4. Velg **Donation** som type.
5. Skriv inn et navn for fanen (f.eks. "Gi") og klikk **Save**.
6. Valgfritt, endre faneikonet -- skriv "Giv" i ikonsøket for et giverrelatert ikon.

Donasjonssiden din er nå aktiv. Medlemmer kan besøke den på `yoursubdomain.b1.church/donate`.

## Dele giverlenken din

For å finne donasjons-URLen din, gå til **B1 Admin** og klikk **Settings**-ikonet for å se underdomenet ditt. Donasjonslenken din følger formatet:

`https://yoursubdomain.b1.church/donate`

Del denne lenken på nettsiden din, i e-poster eller i menighetsblad slik at medlemmer vet hvor de kan gi på nett.

## Donasjonsvarsler

Stripe sender en e-postvarsling hver gang en donasjon mottas. For å endre e-postadressen for varsler, gå til Stripe-dashbordet, klikk på profilen din øverst til høyre, velg **Profile** og oppdater e-postadressen din.

## Alternativer for behandlingsgebyr

Du kan konfigurere giversiden din til å la givere valgfritt dekke behandlingsgebyrer slik at menigheten din mottar hele donasjonsbeløpet. Denne innstillingen administreres i menighetens innstillinger i B1 Admin.

:::tip
Etter oppsettet, gjør en liten testdonasjon for å bekrefte at alt fungerer før du kunngjør nettbasert givertjeneste for menigheten din.
:::

## Neste steg

- Bruk [Stripe-import](stripe-import.md) for å hente nettbaserte transaksjoner inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [Donasjonsrapportene](donation-reports.md) dine for å verifisere at nettbaserte donasjoner vises riktig
- Generer [Giveroppgaver](giving-statements.md) som inkluderer både nettbaserte og manuelle donasjoner
