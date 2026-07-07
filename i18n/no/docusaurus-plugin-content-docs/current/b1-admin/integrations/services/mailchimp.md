---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Pipe nye B1-mennesker, givere eller gruppemedlemmer inn i en Mailchimp-publikum slik at neste velkomstserie, årssluttappell eller frivillignyttsbrev henter fra en liste som alltid er oppdatert. B1 har ingen innebygd Mailchimp-synkronisering -- ledningen lever helt i Zapier (eller Make): B1 avfyrer begivenheten, Mailchimp oppslukker abonnenten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Mailchimp](https://mailchimp.com) konto med minst ett publikum du vil B1-mennesker presset inn
- En [Zapier](https://zapier.com) konto (det frie nivået dekker små kirker)
- En B1Admin-bruker med **Rediger innstillinger**-tillatelse slik at du kan myndiggjøre en API-nøkkel

</div>

## Hva du kan koble opp

| Retning | B1 trigger | Mailchimp-handling |
|---|---|---|
| B1 → Mailchimp | `person.created` | Legg til/oppdater abonnent |
| B1 → Mailchimp | `donation.created` | Legg til abonnent på tag (f.eks. "Ga i 2026") |
| B1 → Mailchimp | `group.member.added` | Legg til abonnent på tag avgrenset til den gruppen |
| Mailchimp → B1 | Ny abonnent | B1 *Opprett person* |

Mailchimp-siden eksponerer mye mer (kampanjer, segmenter, automasyoner) -- se [Mailchimp's Zapier-triggeres](https://zapier.com/apps/mailchimp/integrations) for full listen. Alt som kan kartlegges fra B1-konvolutten er rettferdig spill.

## Oppsett

### 1. Myndiggjør en B1 API-nøkkel

I B1Admin går du til **Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**. Gi det de omfang Zap trenger:

- `settings:write` — nødvendig for at triggeren skal registrere sin webhook
- `people:read` -- slik at Zap kan lese fornavn/etternavn, e-post osv.
- (Valgfritt) `people:write` hvis du også planlegger en Mailchimp → B1-retning

Lagre og kopier `cak_…`-strengen -- den vises bare en gang.

### 2. Bygg Zap

1. **Trigger:** `B1.church — Ny person`. Ved første bruk ber Zapier deg om å *Logg inn på B1.church*; lim inn API-nøkkelen.
2. **Handling:** `Mailchimp — Legg til/oppdater abonnent`. Kartlegg triggerutgangen:
   - `data.contactInfo.email` → E-postadresse
   - `data.name.first` → Fornavn
   - `data.name.last` → Etternavn
   - (Valgfritt) `data.id` → et Mailchimp-sammenslåingsfelt hvis du vil beholde B1's person-ID ved siden av.
3. Slå Zap på. Zapier registrerer en `person.created` webhook på B1 -- bekreft på **Innstillinger → Utvikler → Webhooks** at en rad kalt "Zapier — person.created" vises.

Det er det. Legg til en person i B1Admin for å bekrefte -- den nye abonnenten vises i Mailchimp innen sekunder.

## Vanlige oppskrifter

### Tag givere automatisk

- **Trigger** — B1: Ny donasjon
- **Handling** — B1: Finn person (slå opp etter `personId`) for å få e-posten
- **Handling** — Mailchimp: Legg til abonnent på tag (tag `Gave-2026`)

### Slipp en gruppespesifikk velkomstserie

- **Trigger** — B1: Nytt gruppemedlem, filtrert etter `data.groupId`
- **Handling** — Mailchimp: Legg til abonnent på tag oppkalt etter gruppen; utløs din eksisterende automatisering av det tagget

### To-veis: nye Mailchimp-tilmeldinger blir B1-kontakter

- **Trigger** — Mailchimp: Ny abonnent
- **Handling** — B1: Opprett person (kartlegg første/siste/e-post)

## Make-alternativ

Make's [Mailchimp-app](https://www.make.com/en/integrations/mailchimp) dekker 44 moduler -- ledningen er identisk, med B1 *Watch Events*-triggeren som erstatter Zapier's. Se [Make oversikt doc](../make) for B1-siden.

## Grenser & Merknader

- **Mailchimp's gratis nivå tap kontakter og publikum** -- en Zap som oversvømmelse en gratis publikum forbi sin grense vil begynne å gi feil med `4xx Member limit reached`. Mailchimp's logger gjør dette åpenbart.
- **Mailchimp dedupliceres etter e-post**, så re-kjøring av en Zap på samme B1-person oppdaterer dem på plass; det lager ikke duplikater.
- **Abonnementer fra Mailchimp flyter ikke tilbake til B1.** Hvis du vil at Mailchimp-abonnementer skal klare B1's "Send e-post"-preferanse, bygg Zap-omvendt eksplisitt.

## Feilsøking

- **Zap avfyrer aldri** -- sjekk `Innstillinger → Utvikler → Webhooks` for `Zapier — person.created`-raden. Hvis fraværende, manget API-nøkkelen `settings:write` når Zap slås på. Gjenmynt, gjenoppkoble, veksle Zap av og på.
- **`Member exists` advarsel på legg til/oppdater** -- bytt handlingen fra *Legg til abonnent* til *Legg til/oppdater abonnent* (verbet betyr). Upsert-varianten er idempotent.
- **Fornavn / etternavn kommer gjennom tomt** -- B1's `data.name.first` og `data.name.last` fylles bare hvis disse feltene er satt på personen. Kartlegg `data.name.display` som en fallback.

## Se også

- [Zapier (oversikt)](../zapier) -- B1-siden av hver Zapier-oppskrift
- [Make (oversikt)](../make) -- samme idé, visuell bygger
- [Webhooks (utviklingsreferanse)](/docs/developer/api/webhooks#event-catalog)
