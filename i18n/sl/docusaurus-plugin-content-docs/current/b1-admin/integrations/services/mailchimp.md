---
title: "Mailchimp"
description: "Sinhronizirajte osebe in članstvo v skupinah iz B1 Admin z občinstvom Mailchimp kot oznakami, z navodili za nastavitev in odpravljanje težav."
---

# Mailchimp

<div class="article-intro">

Samodejno ohranjaj občinstvo v Mailchimpu usklajeno z B1: osebe se samodejno dodajo z imenom, e-poštnim naslovom in telefonsko številko; članstvo v skupinah in seznamih postane oznake (tags) v Mailchimpu; izbrisane osebe se arhivirajo. Sinhronizacija je vgrajena v B1 — ni potrebna storitev tretjih oseb, ni obračunavanja po opravilih, spremembe pa prihajajo skoraj v realnem času, ne pa po nočnem urniku.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun [Mailchimp](https://mailchimp.com) z občinstvom, ki ga želite upravljati prek B1
- **API ključ** Mailchimp (Mailchimp: ikona profila → **Account & billing → Extras → API keys**)
- Vaš **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Uporabnik B1Admin s pravico **Edit Settings**

</div>

## Kaj se sinhronizira

| Sprememba v B1 | Učinek v Mailchimpu |
|---|---|
| Oseba dodana ali posodobljena | Naročnik dodan/posodobljen (ime, priimek, telefon; novi naročniki so dodani kot `subscribed`) |
| Oseba izbrisana (ali izbrisana po GDPR) | Naročnik arhiviran |
| Oseba se pridruži skupini | Doda se oznaka z imenom skupine |
| Oseba zapusti skupino | Ta oznaka se odstrani |
| Oseba vstopi na shranjeni seznam | Doda se oznaka z imenom seznama |
| Oseba zapusti shranjeni seznam | Ta oznaka se odstrani |

**Shranjeni seznami so običajno boljši vir oznak.** [Shranjeni seznam](/docs/b1-admin/people/lists) v B1 je občinstvo, ki temelji na pravilih in se samodejno posodablja — npr. »vsi na severnem kampusu« ali »člani, ki so se odločili za pastoralna e-poštna sporočila«. Če svoje segmente v Mailchimpu vežete na oznake seznamov, jih sinhronizacija ohranja sama; oznake skupin uporabite za pošiljanje ekipam posameznih služb.

Sinhronizacija je **enosmerna** (B1 → Mailchimp) in se dotika samo standardnih polj Mailchimpa, zato ne more biti v nasprotju z vsebinskimi polji ali segmenti, ki jih upravljate znotraj Mailchimpa.

## Nastavitev

1. V B1Admin pojdite na **Settings → Developer → Webhooks → New Webhook**.
2. Za **Connector Type** izberite **Mailchimp**.
3. Prilepite svoj **Mailchimp API Key** in **Audience ID**. Ključ je shranjen šifrirano in se ne prikaže več.
4. Ustrezni dogodki so že izbrani; odznačite tiste, ki jih ne želite (npr. pustite dogodke o osebah, a preskočite oznake skupin).
5. Shranite. B1 pred sprejetjem preveri ključ in občinstvo pri Mailchimpu — napaka v vnosu takoj javi vzrok.

Povezavo lahko kadarkoli znova preverite z **Send Test**. Vsak poskus sinhronizacije je zabeležen v zgodovini dostav webhooka z dejanskim odgovorom Mailchimpa, neuspele dostave pa se samodejno ponovijo z naraščajočimi presledki približno pet dni.

## Začetni uvoz

Povezovalnik sinhronizira *spremembe* od trenutka, ko je vklopljen; obstoječega imenika ne prenese nazaj. Za dan nastavitve:

1. V B1Admin pojdite na **People**, poiščite osebe, ki jih želite (ali zaženite shranjeni seznam), in kliknite **Export**, da prenesete CSV datoteko.
2. V Mailchimpu uporabite **Audience → Import contacts**, da naložite CSV, pri uvozu pa po potrebi dodelite oznake.

Začetno nalaganje prek uvoznika Mailchimpa vam ohrani nadzor nad vprašanjem privolitve — uvozite samo osebe, ki so dejansko privolile v prejemanje vaših e-poštnih sporočil. Množični uvoz celotnega imenika kot naročnikov lahko krši pogoje Mailchimpa in zakonodajo proti neželeni pošti (CAN-SPAM/GDPR).

## Omejitve in opombe

- **Enosmerna sinhronizacija.** Odjave, odbite sporočila (bounces) in spremembe, narejene v Mailchimpu, se ne prenesejo nazaj v B1. Nekdo, ki se odjavi v Mailchimpu, lahko še vedno prejema e-pošto, ki jo pošljete neposredno iz B1 — za privolitev v masovna sporočila štejte Mailchimp kot glavni vir resnice.
- **Osebe brez e-poštnega naslova se preskočijo** (to je zabeleženo v zgodovini dostav), ker so naročniki v Mailchimpu določeni z e-poštnim naslovom.
- **Sprememba e-poštnega naslova ustvari novega naročnika.** Mailchimp osebe prepoznava po e-pošti, zato se pri spremembi naslova v B1 oseba doda pod novim naslovom; stari naročnik ostane, dokler ga ne arhivirate v Mailchimpu.
- **Sinhronizirajo se samo standardna polja** — ime, priimek, telefon. Status članstva, kampus in vsebinska polja B1 se v tej različici ne preslikajo v polja Mailchimpa; za segmentacijo uporabite oznake seznamov.
- **Imena oznak so imena skupin/seznamov.** Če preimenujete skupino ali seznam, se oznake od tega trenutka dalje tvorijo pod novim imenom; stara oznaka ostane na obstoječih naročnikih, dokler je ne odstranite v Mailchimpu.
- **Omejitve kontaktov pri Mailchimpu veljajo še naprej** — če sinhronizacija potisne občinstvo brezplačnega računa čez omejitev, se v zgodovini dostav zabeležijo napake `Member limit reached`.

## Drugi recepti (Zapier / Make)

Vse, kar presega sinhronizacijo občinstva — označevanje darovalcev ob `donation.created`, obratna smer Mailchimp → B1 ali sinhronizacija z drugo platformo za e-pošto (Constant Contact, Brevo itd.) — je še vedno na voljo prek [Zapier](../zapier.md) ali [Make](../make.md), ki se sprožita ob istih dogodkih webhooka:

- **Označevanje darovalcev:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Obojesmerno:** Mailchimp *New Subscriber* → B1 *Create Person*

Če ste sinhronizacijo oseb/skupin prej vzpostavili prek Zapiera, po vklopu izvornega povezovalnika te Zape izklopite — če teče oboje, se vsak dogodek obdela dvakrat, Zapier opravila pa se porabijo brez koristi.

## Odpravljanje težav

- **Shranjevanje ne uspe z »Mailchimp rejected the API key«** — ključ je bil preklican ali napačno vnesen. Ključi se morajo končati s predpono podatkovnega centra, npr. `-us21`.
- **Shranjevanje ne uspe z »audience not found«** — Audience ID ne obstaja pod tem računom. Kopirajte ga iz **Audience → Settings → Audience name and defaults** (to ni ime občinstva).
- **Oseba se nikoli ni pojavila v Mailchimpu** — preverite zgodovino dostav webhooka. »Skipped: person has no email address« pomeni prav to; odgovor `4xx` iz Mailchimpa prikaže razlog v telesu odgovora.
- **Dostave so se popolnoma ustavile** — po ponavljajočih se neuspelih dostavah se webhook samodejno izklopi. Odpravite vzrok (običajno preklicani ključ), ga znova vklopite in z **Send Test** preverite delovanje.

## Glej tudi

- [Webhooki (razvijalska referenca)](/docs/developer/api/webhooks) — mehanizem pod tem, katalog dogodkov, semantika dostav in ponovitev
- [Shranjeni seznami](/docs/b1-admin/people/lists) — občinstva na podlagi pravil, ki se naravno preslikajo v oznake Mailchimpa
- [Zapier (pregled)](../zapier.md) — za recepte, ki presegajo sinhronizacijo občinstva
