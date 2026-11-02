---
title: "Administrere profilen din"
---

# Administrere profilen din

<div class="article-intro">

Profilsiden lar deg redigere dine personlige kontoinnstillinger. Profilen din deles på tvers av alle ChurchApps-produkter, så endringer du gjør her gjenspeiles overalt du bruker ChurchApps.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må være logget inn på ChurchApps-kontoen din
- Ha ny e-postadresse eller nytt passord klart hvis du planlegger å oppdatere dem

</div>

## Profilinformasjon

Profilsiden viser navnet og e-postadressen din på venstre side, med en knapp **Rediger** under dem. Klikk **Rediger** for å åpne skjemaet **Rediger konto**, som inneholder de grunnleggende kontoopplysningene dine:

1. **E-post** -- E-postadressen din, brukt til innlogging og for å motta varsler.
2. **Fornavn** og **Etternavn** -- Visningsnavnet ditt på tvers av ChurchApps.
3. **Passord** -- Oppdater kontopassordet ditt.

For å oppdatere opplysningene dine redigerer du feltene og klikker knappen **Lagre endringer**. Klikk **Avbryt** (eller lenken **Tilbake til** med navnet ditt) for å gå tilbake til profilen din uten å lagre.

## Endre passordet ditt

1. På profilsiden klikker du **Rediger**.
2. Skriv inn ditt **nåværende passord**.
3. Skriv inn det nye passordet ditt i feltet **Nytt passord**.
4. Skriv det inn på nytt i feltet **Bekreft passord**.
5. Klikk **Lagre endringer**.

:::info
Passordet ditt må være minst 8 tegn langt. Sørg for at både passordfeltet og bekreftelsesfeltet stemmer helt overens. Du må bekrefte ditt nåværende passord for å endre det -- hvis du ikke kjenner det, bruk lenken **Glemt passord** på innloggingssiden i stedet.
:::

## Koblede kontoer

Seksjonen **Koblede kontoer** viser eventuelle eksterne tjenester som er koblet til ChurchApps-kontoen din. Du kan se hvilke kontoer som er koblet, og administrere disse tilkoblingene fra denne seksjonen.

## Tofaktorinnlogging {#two-factor-sign-in}

Tofaktorinnlogging legger til et ekstra steg i innloggingen: etter passordet ditt (eller Google-, Microsoft- eller e-postinnloggingslenken) skriver du også inn en 6-sifret kode fra en autentiseringsapp på telefonen din, for eksempel Google Authenticator, Microsoft Authenticator, 1Password eller Authy. Det er valgfritt og er av som standard. Når det er på, gjelder det for alle ChurchApps-innlogginger som bruker kontoen din -- B1 Admin, kirkens B1.church-nettsted og -app, B1 Church Checkin, Lessons.church, FreePlay og resten.

### Slå det på

1. På profilsiden finner du seksjonen **Tofaktorinnlogging** og klikker **Slå på**.
2. Skann QR-koden med autentiseringsappen din. Hvis du ikke kan skanne den, skriver du inn nøkkelen som vises under **Kan ikke skanne? Skriv inn denne nøkkelen:** i appen i stedet.
3. Skriv inn **6-sifret kode** som appen viser, og klikk **Bekreft**.
4. B1 Admin viser ti **reservekoder**. Hver enkelt logger deg inn én gang hvis du mister telefonen. Klikk **Kopier** eller skriv dem ned, oppbevar dem et trygt sted, og klikk **Jeg har lagret dem**.

:::warning
Reservekodene vises bare én gang. Hvis du mister telefonen og ikke har flere reservekoder igjen, må en serveradministrator for ChurchApps slå av tofaktorinnlogging for deg etter å ha bekreftet hvem du er.
:::

Når tofaktorinnlogging er på, står det **På** i seksjonen, og den viser hvor mange reservekoder du har igjen.

### Logge inn med en kode

Etter at du har skrevet inn passordet ditt, ber innloggingsskjermen om en kode. Skriv inn den 6-sifrede koden fra autentiseringsappen din, eller en av reservekodene dine, og send den inn. Hver reservekode fungerer bare én gang. Hvis koden er feil, ser du «Den koden fungerte ikke. Prøv igjen.». Etter for mange feil koder settes innlogginger for kontoen din på pause en stund.

Å forbli innlogget på en enhet du allerede har logget inn på, ber ikke om en kode igjen; den kommer bare opp når du logger inn på nytt.

### Slå det av

1. I seksjonen **Tofaktorinnlogging** klikker du **Slå av**.
2. Skriv inn en gjeldende kode fra autentiseringsappen din, eller en reservekode.
3. Klikk **Bekreft**.

:::info
Tofaktorinnlogging kan ikke settes opp på demokontoer, så seksjonen er skjult der.
:::

## Temainnstillinger

B1 Admin lar deg velge et fargetema og en lys eller mørk visningsmodus:

1. Klikk på profilbildet ditt øverst til høyre i B1 Admin for å åpne brukermenyen.
2. Under **Temainnstillinger** velger du et tema:
   - **Standard** -- Det nåværende utseendet til B1 Admin: kantlinjer rundt paneler på en ren bakgrunn. Nye brukere ser dette temaet til de velger et annet.
   - **Klassisk** -- Det tidligere utseendet til B1 Admin, med en fargerik sidebanner, skyggelagte kort og en grå bakgrunn. Hvis du brukte B1 Admin på denne enheten før det nye utseendet kom og aldri valgte et tema, forblir du på Klassisk.
   - **Egendefinert** -- Standard-utseendet bygget på kirkens egen farge. Det bruker primærfargen for lys modus fra **Mobil > App-tema**, eller primærfargen på nettstedet ditt hvis ingen appfarge er satt, slik at B1 Admin samsvarer med medlemsappen din.
3. Under temaene velger du **Lys modus** eller **Mørk modus**.
4. Grensesnittet oppdateres med en gang for å vise valget ditt.

Valgene dine huskes på den enheten og nettleseren.

## Sletting av konto

I seksjonen **Sletting av konto** på profilsiden finner du valget for å slette kontoen din.

- Hvis kirken din **ikke** har konfigurert en godkjenningsgruppe for katalogen, fjerner et klikk på **Slett kontoen min** kontoen din og tilhørende data med en gang, og dette kan ikke angres.
- Hvis kirken din **har** konfigurert en godkjenningsgruppe for katalogen, sendes forespørselen din til den gruppen for gjennomgang i stedet. Knappen er deaktivert mens forespørselen venter, og du får beskjed når kirken din godkjenner eller avslår den. Se [Gjennomgå forespørsler om sletting av konto](./account-deletion.md) for hva som skjer videre.

:::warning
Sletting av konto -- enten umiddelbart eller godkjent av kirken din -- er permanent og kan ikke reverseres.
:::

:::info
Hvis du er **Domeneadministrator**, må du overføre administrative ansvarsområder til en annen bruker før du sletter kontoen din. Se [Roller og tillatelser](../settings/roles-permissions.md) for detaljer om administrasjon av administratorroller.
:::

:::info
Redigering av profil er deaktivert i demomodus. Hvis du bruker en demokonto, kan du ikke gjøre endringer i profilinnstillingene dine.
:::

## Neste steg

- [Administrere enheter](./devices.md) -- Se og administrer de tilkoblede ChurchAppsPlayer-enhetene dine
