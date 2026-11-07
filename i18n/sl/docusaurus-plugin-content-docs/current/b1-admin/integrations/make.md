---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (prej Integromat) je vizualna platforma za avtomatizacijo delovnih tokov, po zamisli podobna storitvi Zapier, vendar z bolj prilagodljivo logiko in nižjimi stroški pri večjem obsegu. Uradna aplikacija B1.church za Make vam omogoča, da ustvarite »scenarije«, ki se takoj odzovejo na dogodke v B1 in zapisujejo podatke nazaj v B1.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun na [Make](https://www.make.com) (brezplačna različica zadostuje za manjše delovne tokove)
- Skrbnik cerkve z dovoljenjem **Edit Settings** v B1Admin
- Okvirna predstava o scenariju, ki ga želite ustvariti

</div>

## Moduli

| Vrsta | Kaj | Dogodek B1 / končna točka |
|---|---|---|
| **Instant Trigger** | Watch Events | kateri koli naročeni dogodek B1 (`person.created`, `donation.created`, …) |
| **Action** | Create Person | doda novo osebo |
| **Action** | Add Donation | zabeleži darilo |
| **Action** | Add Group Member | doda osebo v skupino |
| **Search** | Search People | poišče osebe po imenu ali e-poštnem naslovu |

Takojšnji sprožilec vam omogoča izbiro dogodka, na katerega se odziva. Na scenarij pride en modul sprožilca, nastavljen za vsak dogodek posebej.

## Nastavitev

### 1. Ustvarite ključ API za B1

1. V B1Admin pojdite na **Settings → Developer → API Keys**.
2. Kliknite **New API Key**, ključu dajte ime »Make« in dodelite potrebna dovoljenja (scopes).
3. **Vključite `settings:write`**, če kateri koli od vaših scenarijev uporablja takojšnji sprožilec. Make ob vklopu scenarija v vašem imenu registrira webhook.
4. Dodelite tudi dovoljenja, ki jih potrebujejo akcijski moduli (npr. `donations:write` za modul Add Donation).
5. Shranite in kopirajte ključ `cak_…`.

### 2. Namestite povezavo

1. V Make ustvarite nov scenarij in na platno povlecite modul sprožilca **B1.church**.
2. Ko se pojavi poziv, izberite **Create a connection**. Ključ API prilepite v polje *API Key*, polje *API Base URL* pa pustite kot `https://api.churchapps.org` (razen če preizkušate na testnem okolju).
3. Kliknite **Save**. Make preveri ključ tako, da prebere profil vaše cerkve.

Povezava se shrani na vaš račun Make in se uporablja v vseh scenarijih.

### 3. Nastavite sprožilec

1. Odprite nastavitve modula **Watch Events**.
2. Izberite želeni dogodek, npr. `donation.created`.
3. Shranite. Make ustvari edinstven naslov webhook in ga interno shrani.

### 4. Dodajte naslednje module

Na platno lahko povlečete katerega koli od stotin modulov aplikacij v Make, na primer Mailchimp, Google Sheets, Slack, HubSpot ali lastno končno točko HTTP. Izhod sprožilca (`event`, `churchId`, `data.id`, `data.amount`, …) preslikajte v vhodna polja. Moduli Make za zlaganje (flatten), iteracijo (iterator), usmerjanje (router) in agregiranje (aggregator) omogočajo gradnjo razvejanih in vzporednih tokov, ki bi bili v storitvi Zapier težko izvedljivi.

### 5. Vklopite scenarij

V glavi scenarija vklopite stikalo **Active**. Make pokliče B1 `POST /membership/webhooks`, da registrira naslov. Od tega trenutka naprej vsak ustrezen dogodek v B1 v realnem času poteka skozi scenarij.

Ko scenarij izklopite, se pokliče `DELETE /membership/webhooks/{id}`, tako da ne ostanejo nobene osirotele naročnine.

## Pogosti recepti

### Sinhronizacija daril v Google Sheet za finančni pregled

- **Sprožilec** — B1: Watch Events (`donation.created`)
- **Akcija** — Google Sheets: Add a Row. Vrednosti `data.donationDate`, `data.amount`, `data.personId`, `data.method` in `data.batchId` preslikajte v stolpce preglednice.

### Pogojno obvestilo v Slacku glede na znesek darila

- **Sprožilec** — B1: Watch Events (`donation.created`)
- **Router**:
  - Veja A — Filter: `data.amount >= 1000` → Slack: objava v `#major-gifts`
  - Veja B — preostali primeri → Slack: objava v `#donations`

### Nova oseba → CRM + dobrodošlica po e-pošti + Slack

- **Sprožilec** — B1: Watch Events (`person.created`)
- **Akcija** — HubSpot: Create Contact
- **Akcija** — Mailgun: Send Welcome Email
- **Akcija** — Slack: obvestilo v `#new-people` (vzporedno — uporabite router v Make)

## Kako deluje takojšnji sprožilec

Takojšnji sprožilec temelji na webhooku, ne na poizvedovanju. Ob aktivaciji Make pokliče `POST /membership/webhooks` z naslovom, ki ga je ustvaril, in izbranim dogodkom. Ko se dogodek zgodi v B1, B1 pošlje ovojnico na naslov Make, scenarij pa se izvede v nekaj sekundah. Če scenarij deaktivirate, se webhook odstrani.

Sprožilec se odzove samo na dogodke, ki se zgodijo **medtem ko je scenarij aktiven**. Nazaj se ne izvaja.

## Omejitve in opombe

- **En dogodek na modul Watch Events.** Če želite v enem scenariju poslušati več dogodkov, dodajte več modulov sprožilca v ločene scenarije (ali uporabite en modul z združenim seznamom dogodkov, glejte spodaj).
- **Preverjanje podpisa ni na voljo** — Make ne posreduje glave `X-B1-Signature` scenariju. Mejo zaupanja predstavlja Makeov naslov webhook za vsak scenarij, ki ga ni mogoče uganiti. To je običajna praksa v Make. Če potrebujete izrecno preverjanje podpisa, namesto tega zgradite integracijo po meri s [SDK](/docs/developer/api/webhooks#sdk-support).
- **Število operacij** — vsak klic API iz akcijskega modula se šteje v vašo kvoto operacij v Make, ne pa v ničemer na strani B1.

## Odpravljanje težav

- **Preizkus povezave ne uspe** — najpogosteje gre za tipkarsko napako v ključu API. Ključ ponovno kopirajte iz B1Admin (celoten ključ je prikazan samo enkrat; če ste ga izgubili, ustvarite novega).
- **Modul sprožilca se ne aktivira** — v B1Admin preverite **Settings → Developer → Webhooks**. Če po aktivaciji scenarija ne vidite vrstice »Make — &lt;event&gt;«, ključu manjka `settings:write`. Posodobite ključ in scenarij znova aktivirajte.
- **Akcija vrne `403 Forbidden`** — ključ API nima dovoljenja za to končno točko. Na primer, Add Donation potrebuje `donations:write`. Posodobite ključ v B1Admin in ponovno preizkusite.

## Prilagajanje aplikacije

Aplikacija B1.church za Make je odprtokodna, njene definicije JSON pa so v repozitoriju `B1Integrations/Make/`. Če potrebujete modul, ki ne obstaja (npr. novo akcijo za končno točko, ki je še nismo pokrili), odprite issue ali pull request v tem repozitoriju.

## Glejte tudi

- [Zapier](./zapier) — enak vzorec z enostavnejšim vmesnikom in večjim katalogom aplikacij
- [Slack & Discord](./slack-discord) — vgrajena obvestila v klepetalnice brez Make
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
