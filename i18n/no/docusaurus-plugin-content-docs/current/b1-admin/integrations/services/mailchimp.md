---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Før nye B1-personer, givere eller gruppemedlemmer inn i en Mailchimp-målgruppe, slik at neste velkomstserie, årsslutt-appell eller frivillig-nyhetsbrev henter fra en liste som alltid er oppdatert. B1 har ingen innebygd Mailchimp-synkronisering -- koblingen ligger helt i Zapier (eller Make): B1 utløser hendelsen, Mailchimp tar imot abonnenten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Mailchimp](https://mailchimp.com)-konto med minst én målgruppe du vil at B1-personer skal legges til i
- En [Zapier](https://zapier.com)-konto (gratisnivået dekker små menigheter)
- En B1Admin-bruker med tillatelsen **Rediger innstillinger** slik at du kan lage en API-nøkkel

</div>

## Hva du kan koble sammen

| Retning | B1-trigger | Mailchimp-handling |
|---|---|---|
| B1 → Mailchimp | `person.created` | Legg til/oppdater abonnent |
| B1 → Mailchimp | `donation.created` | Legg til abonnent i tag (f.eks. «Ga i 2026») |
| B1 → Mailchimp | `group.member.added` | Legg til abonnent i tag knyttet til den gruppen |
| Mailchimp → B1 | Ny abonnent | B1 *Opprett person* |

Mailchimp-siden eksponerer mye mer (kampanjer, segmenter, automatiseringer) — se [Mailchimps Zapier-triggere](https://zapier.com/apps/mailchimp/integrations) for hele listen. Alt som kan mappes fra B1-konvolutten er innafor.

## Oppsett

### 1. Lag en B1 API-nøkkel

I B1Admin, gå til **Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**. Gi den omfangene Zappen trenger:

- `settings:write` — påkrevd for at triggeren skal kunne registrere webhooken sin
- `people:read` — slik at Zappen kan lese for-/etternavn, e-post osv.
- (Valgfritt) `people:write` hvis du også planlegger en retning fra Mailchimp til B1

Lagre og kopier `cak_…`-strengen — den vises bare én gang.

### 2. Bygg Zappen

1. **Trigger:** `B1.church — Ny person`. Ved første bruk ber Zapier deg om å *logge inn på B1.church*; lim inn API-nøkkelen.
2. **Handling:** `Mailchimp — Legg til/oppdater abonnent`. Map triggerens utdata:
   - `data.contactInfo.email` → E-postadresse
   - `data.name.first` → Fornavn
   - `data.name.last` → Etternavn
   - (Valgfritt) `data.id` → et Mailchimp-flettefelt hvis du vil beholde B1s person-ID ved siden av.
3. Slå på Zappen. Zapier registrerer en `person.created`-webhook på B1 — verifiser under **Innstillinger → Utvikler → Webhooker** at en rad med navnet «Zapier — person.created» vises.

Det er alt. Legg til en person i B1Admin for å bekrefte -- den nye abonnenten dukker opp i Mailchimp i løpet av sekunder.

## Vanlige oppskrifter

### Tagg givere automatisk

- **Trigger** — B1: Ny gave
- **Handling** — B1: Finn person (oppslag etter `personId`) for å hente e-posten
- **Handling** — Mailchimp: Legg til abonnent i tag (tag `Gave-2026`)

### Send ut en gruppespesifikk velkomstserie

- **Trigger** — B1: Nytt gruppemedlem, filtrert etter `data.groupId`
- **Handling** — Mailchimp: Legg til abonnent i tag oppkalt etter gruppen; utløs din eksisterende automatisering basert på den taggen

### Toveis: nye Mailchimp-påmeldinger blir B1-kontakter

- **Trigger** — Mailchimp: Ny abonnent
- **Handling** — B1: Opprett person (map for-/etternavn/e-post)

## Make-alternativ

Makes [Mailchimp-app](https://www.make.com/en/integrations/mailchimp) dekker 44 moduler — koblingen er identisk, med B1s *Overvåk hendelser*-trigger som erstatter Zapiers. Se [Make-oversiktsdokumentet](../make) for B1-siden.

## Begrensninger og merknader

- **Mailchimps gratisnivå setter tak på kontakter og målgrupper** — en Zap som flommer en gratis målgruppe forbi grensen, vil begynne å feile med `4xx Member limit reached`. Mailchimps logger gjør dette tydelig.
- **Mailchimp dedupliserer etter e-post**, så å kjøre en Zap på nytt på samme B1-person oppdaterer dem på stedet; det oppretter ikke duplikater.
- **Avmeldinger fra Mailchimp flyter ikke tilbake til B1.** Hvis du vil at Mailchimp-avmeldinger skal fjerne B1s «Send e-post»-preferanse, må du bygge den motsatte Zappen eksplisitt.

## Feilsøking

- **Zappen utløses aldri** — sjekk `Innstillinger → Utvikler → Webhooker` for raden `Zapier — person.created`. Hvis den mangler, manglet API-nøkkelen `settings:write` da Zappen ble slått på. Lag en ny nøkkel, koble til på nytt, slå Zappen av og på.
- **`Member exists`-advarsel ved Legg til/oppdater** — bytt handlingen fra *Legg til abonnent* til *Legg til/oppdater abonnent* (verbet betyr noe). Upsert-varianten er idempotent.
- **For- og etternavn kommer gjennom tomme** — B1s `data.name.first` og `data.name.last` fylles bare ut hvis de feltene er satt på personen. Map `data.name.display` som en reserveløsning.

## Se også

- [Zapier (oversikt)](../zapier) — B1-siden av alle Zapier-oppskrifter
- [Make (oversikt)](../make) — samme idé, visuell bygger
- [Webhooker (utviklerreferanse)](/docs/developer/api/webhooks#event-catalog)
