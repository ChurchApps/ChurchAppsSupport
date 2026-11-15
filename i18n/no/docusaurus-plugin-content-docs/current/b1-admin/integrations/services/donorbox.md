---
title: "Donorbox"
description: "Koble Donorbox til B1 Admin med Zapier, slik at nettgaver automatisk oppretter gaveregistreringer og giverprofiler som personer, uten manuell eksport."
---

# Donorbox

<div class="article-intro">

Hvis kirken din tar imot gaver gjennom Donorbox, men registrerer personer og oppgaver i B1, kan Donorbox' øyeblikkelige Zapier-utløsere opprette tilsvarende gaveregistreringer i B1. Giveren opprettes også som B1-person hvis de ikke finnes fra før. Ingen manuell avstemming og ingen månedlig eksport.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Donorbox](https://donorbox.org)-konto med minst én kampanje
- En [Zapier](https://zapier.com)-konto
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen {#what-you-can-wire-up}

| Retning | Donorbox-utløser | B1-handling |
|---|---|---|
| Donorbox → B1 | Ny eller oppdatert gave (øyeblikkelig) | Finn person → Legg til gave |
| Donorbox → B1 | Ny eller oppdatert giver | Opprett person |
| Donorbox → B1 | Ny eller oppdatert plan (gjentakende) | Finn person → Legg til gave (bruk plan-ID-en som notat) |

Donorbox publiserer utløserne sine som **øyeblikkelige**. De starter innen sekunder etter en ekte gave, uten ventetid på polling.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-mint-a-b1-api-key}

I B1 Admin: **Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**. Omfang:

- `people:read`: for å slå opp giveren etter e-post
- `people:write`: for å opprette dem hvis de er nye
- `donations:write`: for å registrere gaven

- `settings:write`: Zapier sjekker hver B1-nøkkel mot B1s webhook-liste når du kobler den til. Tilkoblingen mislykkes uten dette, selv om det er Donorbox, ikke B1, som eier utløseren her

### 2. Bygg Zapen «registrer en gave» {#2-build-the-record-a-donation-zap}

1. **Utløser**: Donorbox: Ny gave. Koble til med Donorbox' API-nøkkel (i Donorbox: *Konto → Profil → API-innstillinger*).
2. **Handling**: B1.church: Finn person. Map giverens e-post fra utløseren til feltet *E-post*.
3. **Handling**: B1.church: Legg til gave. Map:
   - Person → ID-en fra steg 2
   - Beløp → gavebeløpet fra utløseren
   - Gavedato → gavedatoen fra utløseren
   - Fond → velg B1-fondet som speiler Donorbox-kampanjen (Zapier lar deg bytte fond basert på et filter eller et formatteringssteg)
   - Metode → «Online»
   - Notater → Donorbox-transaksjons-ID-en (nyttig ved avstemming)

Slå på Zapen. Neste direkte gave via Donorbox havner automatisk i **B1 Admin → Gaver**.

B1s *Finn person* stopper Zapen med feilen «No person found» når ingen har den e-postadressen. Et filtreringssteg kan derfor ikke forgrene seg på det. For å håndtere førstegangsgivere slår du på Zapiers feilhåndtering for steget Finn person, og i feilbanen kjører du B1.church: Opprett person (map fornavn, etternavn og e-post) og deretter Legg til gave med den nye personens ID. Alternativt kjører du Zapen *Ny giver* → *Opprett person* fra tabellen over, slik at giverne finnes i B1 før gaven kommer.

## Vanlige oppskrifter {#common-recipes}

### En Zap per fond {#one-zap-per-fund}

Hvis du kjører flere Donorbox-kampanjer som tilsvarer separate B1-fond, er det ryddigste oppsettet én Zap per kampanje, med et filter for Donorbox-*kampanje* øverst. Da er fondkoblingen fast i oppsettet, og du slipper oppslagssteget.

### Behandle oppdaterte gaver som rettelser {#treat-updated-donations-as-corrections}

Donorbox' *Ny eller oppdatert gave* utløses også ved redigeringer. Bruk et Zapier-steg *Path* på `event_type` for å dele opp flyten: «new» → Legg til gave, «updated» → Finn gave + Oppdater (merk: B1s Zapier-app har ikke en handling for å oppdatere gaver i dag. Foreløpig logger du hendelser med «updated» til en Slack-kanal for manuell gjennomgang).

### Synkroniser endringer i gjentakende planer til en Slack-kanal {#sync-recurring-plan-changes-to-a-slack-channel}

- **Utløser**: Donorbox: Ny eller oppdatert plan
- **Handling**: Slack: Send melding til `#donations` (f.eks. «Plan endret: Saras månedlige gave er nå $200»)

## Begrensninger og merknader {#limits--notes}

- **Koble giverne på e-post.** Donorbox deler ikke B1s person-ID. Den eneste varige koblingsnøkkelen er e-post. Givere som gir med en annen e-postadresse, får en ny B1-person. Den månedlige avstemmingen din bør se etter disse.
- **Refusjoner vises ikke separat.** Donorbox sender en statusoppdatering på samme gave. B1s Zapier-app har i dag ingen handling *Oppdater gave*. Det trygge mønsteret i dag er å logge refusjonshendelser utenfor systemet og justere gaven manuelt.
- **Test først i Donorboxs sandbox** for å unngå å opprette falske gaver i produksjons-B1. Donorbox gir testmodus-legitimasjon som er atskilt fra live.

## Feilsøking {#troubleshooting}

- **Feil «No person found»**: giveren finnes ikke i B1 ennå (eller ga med en annen e-post). Legg til feilbanen beskrevet over, og kontroller at API-nøkkelen har `people:write`, slik at *Opprett person* kan kjøre.
- **Gavebeløpet ser 100 ganger for stort eller lite ut**: Donorbox sender cent i noen nyttelastvarianter og dollar i andre. Bruk et steg *Formatter by Zapier: Numbers* for å dele på 100 om nødvendig.
- **Dupliserte gaver fra én gave**: Donorbox utløser både *Ny gave* og *Oppdatert gave*. Enten filtrer til `event_type = "donation.succeeded"`, eller bygg to Zaper med ikke-overlappende filtre.

## Se også {#see-also}

- [Zapier (oversikt)](../zapier.md): B1-delen av hver Zapier-oppskrift
- [Subsplash](./subsplash.md): en annen gaveplattform med Zapier-app
- [Mailchimp](./mailchimp.md): koble «ny gave» til en e-postmerkelapp
