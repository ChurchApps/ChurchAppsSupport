---
title: "Innstillinger for mobilapp"
---

# Innstillinger for mobilapp

<div class="article-intro">

Siden Innstillinger for mobilapp lar deg konfigurere navigasjonsfanene som vises i **B1.church mobilopplevelse (PWA)** for kirkamedlemmene dine. Du kontrollerer hvilke faner som er synlige, hva de lenker til, og hvordan de vises.

</div>

:::info Den innebygde B1 Mobile-appen er avskrevet
Faner som er konfigurert her leveres gjennom [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), som har erstattet den innebygde B1 Mobile-appen. Del kirkas installeringsside med medlemmene -- `https://yourchurchname.b1.church/mobile/install` -- med medlemmene; det gjennomgår dem gjennom installering av appen på enheten deres, uten App Store eller Google Play-nedlasting påkrevd.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen "Rediger kirkeinnstillinger". Se [Roller & rettigheter](./roles-permissions.md) hvis du ikke har tilgang.
- Konfigurer [Kirkeinnstillinger](./church-settings.md) dine først, inkludert kirkanavn og merkevarebygging

</div>

## Få tilgang til innstillinger for mobilapp

1. I B1 Admin åpner du **seksjonsmenyen** i det øvre venstre hjørnet (seksjonsnavnet med liten pil) og velger **Innstillinger**.
2. Klikk **Mobilapper**-knappen i toppteksten.
3. Siden Innstillinger for mobilapp viser gjeldende app-faner dine.

## Legg til en ny fane

1. Klikk **Legg til fane**-knappen øverst på siden.
2. Fyll inn fanedetaljene:
   - **Navn** -- Etiketten som vises på fanen (for eksempel "Preken" eller "Gi").
   - **Ikon** -- Klikk ikonikovelgeren for å velge et ikon for fanen. Du kan også laste opp et egendefinert bilde.
   - **Fanetype** -- Velg fra alternativer som Bibel, Direktestrøm, Donasjon, Nettsted og mer.
   - **URL** -- Skriv inn nettadressen som fanen skal lenke til.
   - **Synlighet** -- Kontroller hvem som kan se denne fanen (alle, bare medlemmer, etc.).
3. Klikk **Lagre fane** for å legge den til i appen.

## Rediger en eksisterende fane

1. Klikk en hvilken som helst eksisterende fane i listen **App-faner**.
2. Oppdater fanens navn, ikon, URL, type eller synlighetsinnstillinger.
3. Klikk **Lagre fane** for å bruke endringene dine.

## Omordner faner

Du kan endre rekkefølgen som faner vises på i mobilappen. Dra og slipp faner i listen for å ordne dem på nytt. Rekkefølgen som vises på denne siden samsvarer med rekkefølgen medlemmene dine vil se i appen.

:::info
Noen faner kan vises automatisk når bestemte betingelser er oppfylt -- for eksempel kan en Direktestrømfane dukke opp når en strøm er aktiv. Manuelt tilføyde faner gir deg full kontroll over hva medlemmene dine ser til enhver tid.
:::

:::tip
Hold fanenes antall håndterbar. Tre til fem faner fungerer bra for de fleste kirker. For mange faner kan gjøre navigasjonen forvirrende for medlemmene dine.
:::

## Innstillinger for medlemsregister & meldinger

**B1 Mobile**-fanen i samme Mobilseksjon inneholder innstillingene som styrer medlemsmappen og privat meldinger i B1.church-opplevelsen:

- **Directory Approval Group** -- Gruppen som gjennomgår medlemsmappeoppdateringer før de brukes.
- **Vis i katalog** -- Hvem som kan vises i medlemsmappen (Bare ansatte gjennom alle).
- **Synlighetspreferanser** -- Standardsynlighet for medlemsadresser, telefonnumre og e-postadresser.
- **Minimumnalder for private meldinger** -- En sikkerhetskontroll for barn. B1 åpner ikke en **ny** privat meldingssamtale når en av personene er under denne alderen, basert på deres fødselsdato (husholdsrolle brukes som reservasjon når ingen fødselsdato er arkivert). Mennesker under alderen forblir fullt synlige i katalogen -- bare direkte meldinger blokkeres, i **begge retninger**, for alle inkludert ansatte. Gruppesamtaler og meldinger til et barns foreldre virker fortsatt. Alternativene er Av, 13, 16 eller 18; standard er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Fordi minimumnalder-kontrollen er avhengig av fødselsdatoer, sørger du for at fødselsdatoer er fylt inn for barn i menigheten din. Denne innstillingen tilhører samme sikkerhetsfamilie som [check-in sikkerhetskontrollene](../attendance/checkin-safety.md).
:::

## Der disse fanene vises

Fanene du konfigurerer her vises i **B1.church PWA** som medlemmene dine installerer fra en hvilken som helst side på `https://yourchurchname.b1.church`. Endringer du gjør på denne siden reflekteres neste gang et medlem åpner appen. (Faner gjenngis også av den eldre [B1 Mobile innebygd app](/docs/b1-mobile/) for alle medlemmer som fortsatt kjører den, men denne appen er avskrevet og får ikke lenger oppdateringer.)

## Neste trinn

- [Kirkeinnstillinger](./church-settings.md) -- Konfigurer kirkeinformasjonen og merkevarebyggingen din
- [Roller & rettigheter](./roles-permissions.md) -- Administrer tilgang for teamet ditt
