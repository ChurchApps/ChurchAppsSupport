---
title: "Guide: Sett opp nettbasert givertjeneste"
---

# Sett opp nettbasert givertjeneste

<div class="article-intro">

Ga gjennom alt som trengs for a ta imot nettbaserte donasjoner i menigheten -- fra opprettelse av donasjonsfond, til kobling av Stripe for betalingsbehandling, til deling av giversiden med menigheten. Til slutt vil medlemmene kunne gi pa nett gjennom nettstedet og mobilappen.

</div>

<div class="prereqs">
<h4>For du begynner</h4>

- B1 Admin-konto med administratortilgang -- se [Roller og tillatelser](../people/roles-permissions.md)
- En Stripe-konto (opprett en gratis pa [stripe.com](https://stripe.com) om nodvendig)

</div>

## Steg 1: Opprett donasjonsfond

Fond er kategoriene givere kan gi til. Du trenger minst ett fond for du kan ta imot donasjoner.

Folg guiden [Fond](../donations/funds.md) for a sette opp giverkategoriene dine:

1. Opprett de vanligste fondene (f.eks. "Generelt fond", "Byggefond", "Misjon")
2. Merk skattefradragsberettigede fond riktig -- dette pavirker arsoppgavene

:::tip
Du kan legge til flere fond nar som helst. Start med de vanligste giverkategoriene.
:::

## Steg 2: Koble til Stripe

Stripe handterer all betalingsbehandling. Du kobler Stripe-kontoen din til B1 Admin slik at donasjoner gar inn pa bankkontoen din.

Folg guiden [Oppsett av nettbasert givertjeneste](../donations/online-giving-setup.md) for a koble til Stripe:

1. Logg inn pa Stripe-dashbordet og hent Publishable Key og Secret Key
2. I B1 Admin, ga til Settings og skriv inn begge noklene

:::warning
Stripe viser Secret Key bare en gang. Kopier og lagre den for du forlater Stripe-dashbordet. Hvis du mister den, ma du generere en ny.
:::

## Steg 3: Legg til en giverside pa nettstedet

Gjor det enkelt a gi ved a legge til en donasjonsside pa B1-nettstedet ditt.

Folg guidene [Oppsett av nettbasert givertjeneste](../donations/online-giving-setup.md) og [Administrere sider](../website/managing-pages.md) for a:

1. Legge til en "Gi"-fane pa B1.church-nettstedet ditt
2. Giver-URLen din vil vaere: `https://yoursubdomain.b1.church/donate`
3. Medlemmer kan gi uten a logge inn (offentlig side) eller logge inn for lagrede betalingsmetoder og donasjonshistorikk

## Steg 4: Gjor en testdonasjon

For du kunngjor det for menigheten, bekreft at alt fungerer.

1. Gjor en liten testdonasjon for a bekrefte at flyten fungerer fra start til slutt
2. Sjekk at donasjonen vises i B1 Admin under Donasjoner

:::tip
Bruk Stripes testmodus forst hvis du vil verifisere uten reelle belastninger, bytt deretter til live-modus for du kunngjor det for menigheten.
:::

## Steg 5: Kunngj for menigheten

Spre ordet slik at medlemmene vet at de kan gi pa nett.

1. Del giver-URLen via nettstedet, nyhetsbrev, kirkeblad og sosiale medier
2. Medlemmer kan ogsa gi gjennom [B1 Mobile-appen](../../b1-mobile/giving/) -- giverfunksjonen er innebygd

:::info
Medlemmer som logger inn kan lagre betalingsmetoder, sette opp faste gaver og se giverhistorikken sin. Anonym giving fungerer ogsa -- ingen innlogging kreves.
:::

## Steg 6: Lopende administrasjon

Hold donasjonspostene oppdatert og generer rapporter gjennom aret.

1. [Importer Stripe-transaksjoner](../donations/stripe-import.md) regelmessig (ukentlig eller manedlig) for a holde postene oppdatert
2. [Se donasjonsrapporter](../donations/donation-reports.md) for a spore givertrender og totaler per fond
3. [Generer arsoppgaver](../donations/giving-statements.md) for givernes skatteformol

:::tip
Kjor Stripe-import minst manedlig slik at postene holder seg oppdatert. Se [Guiden for arsrapporter](./year-end-reports.md) for den fullstendige arsskifteprosessen.
:::

## Du er ferdig!

Menigheten din tar na imot nettbaserte donasjoner. Medlemmer kan gi gjennom nettstedet, B1 Mobile-appen eller en hvilken som helst enhet med nettleser. Alle donasjoner spores automatisk i B1 Admin.

## Relaterte artikler

- [Fond](../donations/funds.md) -- opprett og administrer donasjonskategorier
- [Bunter](../donations/batches.md) -- organiser donasjoner i grupper
- [Registrere donasjoner](../donations/recording-donations.md) -- legg inn kontant- og sjekkdonasjoner manuelt
- [Stripe-import](../donations/stripe-import.md) -- hent nettbaserte transaksjoner inn i B1 Admin
- [Donasjonsrapporter](../donations/donation-reports.md) -- se givertrender og totaler
- [Giverutskrifter](../donations/giving-statements.md) -- generer skatteoppgaver ved arsslutt
- [Gi gaver (Nett)](../../b1-church/giving/making-donations.md) -- giveropplevelsen for medlemmer
- [Gi gaver (Mobil)](../../b1-mobile/giving/making-donations.md) -- gi fra mobilappen
