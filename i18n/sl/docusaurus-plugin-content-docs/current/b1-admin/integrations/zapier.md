---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Uradna aplikacija B1.church v Zapierju omogoča, da se Zap odzove na dogodke v vaši cerkvi (nova oseba, nova donacija, nov član skupine, …) in zapiše podatke nazaj v B1. Brez programiranja in brez infrastrukture: povežete ga v urejevalniku Zapiera z vlečenjem in spuščanjem, prilepite API ključ in vklopite Zap.

</div>

:::caution Čakanje na odobritev Zapiera
Aplikacija B1.church je zgrajena in deluje, vendar še čaka na pregled Zapiera, preden se bo javno prikazala v imeniku aplikacij urejevalnika Zapov. Dokler ni odobrena, lahko uporabljajo samo povabljeni računi. Vse spodaj opisano velja, ko bo aplikacija odobrena.
:::

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun [Zapier](https://zapier.com) (brezplačna različica zadostuje za nekaj Zapov)
- Skrbnik cerkve z dovoljenjem **Edit Settings** v B1Admin (ustvarili boste API ključ)
- Ideja, kaj želite narediti, npr. „ko je oseba dodana v B1, jo dodaj na moj seznam Mailchimp“

</div>

## Sprožilci in dejanja

| Vrsta | Kaj | Dogodek B1 / končna točka |
|---|---|---|
| **Sprožilec** | Nova oseba | `person.created` |
| **Sprožilec** | Posodobljena oseba | `person.updated` |
| **Sprožilec** | Nova donacija | `donation.created` |
| **Sprožilec** | Nov član skupine | `group.member.added` |
| **Sprožilec** | Nova oddaja obrazca | `form.submission.created` |
| **Dejanje** | Ustvari osebo | doda novo osebo |
| **Dejanje** | Dodaj donacijo | zabeleži donacijo |
| **Dejanje** | Dodaj člana skupine | doda osebo v skupino |
| **Dejanje** | Najdi osebo | poišče osebo po ID-ju, e-pošti ali imenu; če nihče ne ustreza, opravilo ne uspe |

Te sprožilce in dejanja lahko poljubno kombinirate s katerokoli od več kot 7.000 podprtih aplikacij Zapiera.

## Nastavitev

### 1. Ustvarite API ključ za B1

1. V B1Admin pojdite na **Settings → Developer → API Keys**.
2. Kliknite **New API Key**, ključu dajte ime, na primer „Zapier“, in izberite področja (scopes), ki jih Zap potrebuje.
3. **Pomembno:** Sprožilci Zapiera ob vklopu Zapa v vašem imenu registrirajo webhook, za kar je potrebno področje **`settings:write`**. Vedno vključite `settings:write`, če kateri koli vaš Zap uporablja sprožilec B1.
4. Dodelite tudi področja, ki jih potrebujejo dejanja. Na primer dejanje „Add Donation“ potrebuje `donations:write`, „Create Person“ pa `people:write`.
5. Shranite. Celoten ključ `cak_…` je prikazan **samo enkrat**, zato ga kopirajte.

### 2. Povežite Zapier z B1

1. V Zapierju ustvarite nov Zap.
2. Ko prvič izberete sprožilec ali dejanje B1, vas Zapier pozove, naj se **prijavite v B1.church**.
3. Prilepite API ključ iz 1. koraka in kliknite **Yes, Continue**. Zapier ga preveri glede na vašo cerkev.

Povezava je shranjena v Zapierju in jo uporabljajo vsi Zapi v vašem računu.

### 3. Sestavite Zap

Izberite sprožilec, nato dodajte enega ali več korakov dejanj. Primeri so spodaj.

## Pogosti recepti

### Dodajanje novih oseb B1 v Mailchimp

- **Sprožilec** — B1: New Person
- **Dejanje** — Mailchimp: Add/Update Subscriber. Polja `name__first`, `name__last` in `contactInfo__email` iz B1 preslikajte v polja First Name / Last Name / Email v Mailchimpu.

### Objavljanje donacij v kanal Slack z bogatejšo kartico, kot jo omogoča vgrajeni konektor

- **Sprožilec** — B1: New Donation
- **Dejanje** — Slack: Send Channel Message. Sestavite poljubno postavitev (gumbe, priloge itd.), ki je vgrajeni [konektor za Slack](./slack-discord) ne omogoča.

### Dodajanje novih članov skupine v Google skupino

- **Sprožilec** — B1: New Group Member (filtrirano na določen `groupId`)
- **Dejanje** — Filter by Zapier: nadaljujte samo, če je skupina B1 tista, ki vas zanima
- **Dejanje** — B1: Find Person (s pomočjo `personId` iz sprožilca pridobite e-poštni naslov)
- **Dejanje** — Google Groups: Add Member

### Posredovanje oddaj obrazcev v sledilnik projektov

- **Sprožilec** — B1: New Form Submission
- **Dejanje** — Notion / Linear / Asana / Trello: Create page / issue / task

## Kako sprožilci delujejo v ozadju

Sprožilci so **REST hooks**, ne pa poizvedovanje (polling). Zapier B1 ne preverja vsakih 15 minut. Ko vklopite Zap, Zapier od B1 zahteva, naj registrira webhook, ki kaže na zasebni URL Zapiera. Ko se dogodek zgodi, B1 pošlje ovojnico (envelope) s POST zahtevkom Zapierju, vaš Zap pa se zažene **v nekaj sekundah**. Ko Zap izklopite, Zapier od B1 zahteva, naj izbriše webhook, zato ne ostanejo osirotele naročnine.

To pomeni, da se sprožilec sproži samo za dogodke, ki se zgodijo **po** vklopu Zapa. Ni retroaktivnega polnjenja: vklop Zapa ne ponovi včerajšnjih donacij.

## Omejitve in opombe

- **Več Zapov z istim sprožilcem** vsak registrira svoj webhook B1. Ni konflikta, a je vredno vedeti, če pregledujete **Settings → Developer → Webhooks** in se sprašujete, zakaj so tam tri enake vrstice `Zapier — donation.created`.
- **Testni podatki pri nastavitvi Zapa:** ko sestavljate Zap, vas Zapier prosi za vzorčne podatke za preslikavo polj. Če obstaja, bo iz B1 pridobil najnovejši ustrezen dogodek; sicer uporabi sintetični vzorec iz definicije aplikacije.
- **Napake dejanj se prikažejo kot napake Zapa** v zgodovini opravil Zapiera. Pogost vzrok je API ključ brez ustreznega področja (npr. dejanje „Add Donation“ potrebuje `donations:write`). Ustvarite nov ključ z ustreznimi področji in ponovno povežite Zapier.
- **Kvote odhodnih API klicev:** vsak klic API B1 iz dejanja se šteje v vašo kvoto opravil Zapiera, ne pa v karkoli na strani B1.

## Odpravljanje težav

- **„Authentication failed“** ob povezovanju: API ključ je napačen, preklican ali nima področij, ki jih Zap potrebuje. V B1Admin ustvarite novega z vsaj `settings:write` in področji virov, ki jih Zap uporablja, nato posodobite povezavo.
- **Sprožilec se nikoli ne sproži:** preverite, ali je webhook dejansko registriran. V B1Admin bi **Settings → Developer → Webhooks** zdaj moral prikazovati vrstico z imenom „Zapier — &lt;event&gt;“. Če je ni, je API ključu ob vklopu Zapa verjetno manjkalo `settings:write`. Popravite ključ, nato Zap izklopite in znova vklopite.
- **Sprožilec se sproži dvakrat:** Zapier včasih ponovno dostavi dogodek, če se je potrdilo izgubilo. Če potrebujete strogo deduplikacijo, uporabite korak „Filter by Zapier“ na edinstvenem ID-ju (npr. `id` osebe).

## Glejte tudi

- [Make](./make) — isti vzorec, druga platforma
- [Slack & Discord](./slack-discord) — preprostejša klepetalna obvestila brez Zapiera
- [Webhooks (referenca za razvijalce)](/docs/developer/api/webhooks)
