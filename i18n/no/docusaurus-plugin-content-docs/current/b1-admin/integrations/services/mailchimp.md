---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Pipe nye B1-mennesker, givere eller gruppemedalemmer inn i en Mailchimp-publikum slik at den neste velkomst-serien, år-slutt-appell, eller frivillig nyhetsbrev trekker fra en liste som alltid er oppdatert. Ledelsen lever helt innenfor Zapier (eller Make) — B1 avfyrer hendelsen, Mailchimp absorberer abonnenten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Mailchimp](https://mailchimp.com)-konto med minst en publikum du vil B1-mennesker pushet til
- En [Zapier](https://zapier.com)-konto (det gratis nivået dekker små kirker)
- En B1Admin-bruker med tillatelsen **Rediger innstillinger** slik at du kan lag en API-nøkkel

</div>

## Hva du kan lede opp

| Retning | B1 utløser | Mailchimp handling |
|---|---|---|
| B1 → Mailchimp | `person.created` | Legg til/oppdater abonnent |
| B1 → Mailchimp | `donation.created` | Legg abonnent til tag (f.eks. "ga i 2026") |
| B1 → Mailchimp | `group.member.added` | Legg abonnent til tag avgrenset til denne gruppen |
| Mailchimp → B1 | Ny abonnent | B1 *opprett person* |

Mailchimp-siden viser mye mer (kampanjer, segmenter, automatisering) — se [Mailchimp Zapier-utløsere](https://zapier.com/apps/mailchimp/integrations) for hele listen. Alt som er mulig å kartlegge fra B1-konvolutten er tilgjengelig.

## Oppsett

### 1. Lag en B1 API-nøkkel

I B1Admin gå til **Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**. Gi det scopene Zap trenger:

- `settings:write` — påkrevd for utløseren for å registrere sin webhook
- `people:read` — slik at Zap kan lese fornavn/etternavn, e-post, osv.
- (Valgfritt) `people:write` hvis du også planlegger en Mailchimp → B1 retning

Lagre og kopier `cak_…`-strengen — den vises bare én gang.

### 2. Bygg Zap-en

1. **Utløser:** `B1.church — ny person`. På første bruk spør Zapier deg om å *logge inn på B1.church*; lim inn API-nøkkelen.
2. **Handling:** `Mailchimp — legg til/oppdater abonnent`. Map utløserens utdata:
   - `data.contactInfo.email` → e-postadresse
   - `data.name.first` → fornavn
   - `data.name.last` → etternavn
   - (Valgfritt) `data.id` → et Mailchimp-merge-felt hvis du vil beholde B1s person-id sammen.
3. Slå Zap-en på. Zapier registrerer en `person.created`-webhook på B1 — bekreft i **Innstillinger → Utviklernavn → webhooks** at en rad oppkalt "Zapier — person.created" vises.

Det er alt. Legg til en person i B1Admin for å bekrefte — den nye abonnenten vises i Mailchimp innen sekunder.

## Vanlige oppskrifter

### Tag givere automatisk

- **Utløser** — B1: ny donasjon
- **Handling** — B1: Finn person (oppslag etter `personId`) for å få e-posten
- **Handling** — Mailchimp: Legg abonnent til tag (tag `ga-2026`)

### Slipp en gruppe-spesifikk velkomst-serie

- **Utløser** — B1: nytt gruppemedalem, filtrert etter `data.groupId`
- **Handling** — Mailchimp: Legg abonnent til tag oppkalt etter gruppen; utløs dine eksisterende automatisering av denne tagen

### To-vei: nye Mailchimp-påmeldinger blir B1-kontakter

- **Utløser** — Mailchimp: ny abonnent
- **Handling** — B1: opprett person (map fornavn/etternavn/e-post)

## Make alternativ

Makes [Mailchimp-app](https://www.make.com/en/integrations/mailchimp) dekker 44 moduler — ledelsen er identisk, med B1 *se hendelser*-utløseren som erstatter Zapiers. Se [Make oversikt doc](../make) for B1-siden.

## Grenser og merknader

- **Mailchimps gratis nivå dekker kontakter og publikum** — en Zap som oversvømmer en gratis publikum forbi sin grense begynner å gi feil med `4xx medlemmer grensen nådd`. Mailchimps logger gjør dette åpenbart.
- **Mailchimp dedupliserer etter e-post**, så re-kjøring av Zap på samme B1-person oppdaterer dem på plass; det opprettar ikke duplikater.
- **Avmeldinger fra Mailchimp flyter ikke tilbake til B1.** Hvis du vil at Mailchimp-avmeldinger skal fjerne B1s "Send mail"-preferanse, bygg den omvendte Zap eksplisitt.

## Problemløsing

- **Zap avfyres aldri** — sjekk `innstillinger → utviklernavn → webhooks` for `Zapier — person.created`-raden. Hvis fraværende, manglet API-nøkkelen `settings:write` når Zap ble slått på. Re-mint, gjen-koble, veksle Zap av og på.
- **`medlem eksisterer` advarsel på legg til/oppdater** — bytt handlingen fra *legg til abonnent* til *legg til/oppdater abonnent* (verbet betyr noe). Upsert-varianten er idempotent.
- **Fornavn / etternavn kommer gjennom tomt** — B1s `data.name.first` og `data.name.last` er bare fylt hvis disse feltene er satt på personen. Map `data.name.display` som en fallback.

## Se også

- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Make (oversikt)](../make) — samme idé, visuell bygger
- [Webhooks (utviklerreferanse)](/docs/developer/api/webhooks#event-catalog)
