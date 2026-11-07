---
title: "Tapahtumaloki ja peruttavat erät"
description: "Kattaa API:n tarkistuslokin, joka tallentaa jokaisen käyttäjän muutoksen moduuleissa, ja sen, miten tuontierät voidaan kumota rivi kerrallaan B1 Adminissa."
---

# Tapahtumaloki ja peruttavat erät

<div class="article-intro">

Jokainen käyttäjän aloittama muutos Api-rajapinnassa kirjataan (kuka, mitä, milloin ja mistä) kaikissa moduuleissa ilman, että jokainen controller tarvitsee omaa kytkentäänsä. Tämän kirjanpidon päällä on erätaso: tuonti tai massatoiminto voidaan merkitä eräksi, ja sen voi myöhemmin **perua** rivi kerrallaan, Planning Center -tyyliin. Molemmat asuvat yhdessä `auditLogs`-taulussa jäsenyystietokannassa, ja niitä ohjaa kokonaan yksi keskuspiste, `BaseController.actionWrapper`. Tämä sivu kuvaa, mitä tallennetaan, mihin data kirjoitetaan, suorituskykyyn liittyvät kompromissit sekä sen, miten peruminen palauttaa erän turvallisesti ilman tietokantojen välisiä transaktioita.

</div>

## Yleiskatsaus

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Kaksi rakenteellista tosiasiaa ohjaa kaikkea alla olevaa:

1. **Controller-kerros on ainoa paikka, joka tuntee toimijan.** Repositoriot eivät koskaan näe `AuthenticatedUser`-objektia; vain controllerit pitävät hallussaan `au`-muuttujaa. Jokaisen moduulin controllerit kulkevat jo `BaseController.actionWrapper`-metodin läpi, joten tarkastuskirjaus kytkeytyy juuri sinne. Repositorioiden signatuureihin ei tarvitse tehdä muutoksia missään.
2. **Yksi taulu palvelee kaikkia moduuleja.** Lahjoitusten, läsnäolon, sisällön jne. tarkastusrivit kirjoitetaan kaikki jäsenyystietokannan `auditLogs`-tauluun `RepoManager.getRepos("membership")`-kutsulla, vaikka kirjoitus tulisi muusta kuin jäsenyys-controllerista. Kysymys ”Kaikki, mitä Jane muutti tänään” pysyy yhden kyselyn varassa.

## Mitä kirjataan

Tarkastuskirjaus on **oletuksena päällä** jokaiselle muuttavalle HTTP-metodille jokaisella reitillä. `actionWrapper` johtaa tarkastuskentät pyynnöstä ilman reittikohtaista asetusta:

| Kenttä | Johdettu lähteestä |
|-------|--------------|
| `module` | `this.moduleName` (omistava moduuli) |
| `entityType` | `req.baseUrl`-polun viimeisen osan yksikkömuoto (esim. `/membership/people` → `person`) |
| `category` | oletuksena `entityType` |
| `action` | `${entityType}_saved` kohteelle `POST /`, `${entityType}_deleted` kohteelle `DELETE /:id`, muuten `${entityType}_${method}:${routePath}`, jolloin CRUD-ulkopuoliset alireitit (esim. `task_post:/:id/move`) tallentuvat automaattisesti |

`BaseController.AUDIT_REGISTRY` on **vain ohitusten ja poistojen varten**. Se ei ole sallittujen luettelo. Reitti esiintyy siinä, kun sen kategoriaa tai `entityType`-arvoa halutaan muuttaa, kun se ilmoitetaan `{ dbModule, table }` -määrityksellä (jolloin siitä tulee erä- ja peruttava), kun se merkitään `sensitive`-tilaan (tarkastetaan anonyymit muutokset) tai kun kirjaus kytketään pois `optOut: true` -asetuksella.

**Ohituslista** (jatkuvat kirjoitusreitit, jotka täyttäisivät lokin): läsnäolon `visits` / `visitsessions` / `sessions` / `checkin` (sunnuntain sisäänkirjautumisryöpsy) sekä viestinnän `messages` / `connections` / `devices` (chat ja läsnäolo). Kaikki muu kirjataan.

**Massapäätepisteet** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) rekisteröidään `BULK_ROUTES`-listaan, ja ne tuottavat **yhden tarkastusrivin jokaista kosketettua id-arvoa kohden**. Näin 10 000 hengen tuonti tuottaa 10 000 riviä. Juuri tämä kohdekohtainen tarkkuus tekee erästä peruttavan.

**Anonyymit muutokset** (`actionWrapperAnon`: vierailijan lahjoitukset, vierasrekisteröinnit, lomakkeiden lähetykset) kirjataan vain rekisterissä `sensitive`-merkityille reiteille. Ne tallennetaan arvolla `userId="anonymous"` sekä asiakkaan IP-osoitteella. Lahjoitukset ovat listan kärjessä, ja tällä polulla on todellinen regressiohistoria.

### Salaisuuksien peittäminen ja kokorajat

Ennen kuin `details`-hyötykuorma tallennetaan, `AuditLogHelper.capDetails()` ajaa siihen `sanitizeValue()`-funktion:

- **Salaiset avaimet peitetään.** Jokainen kenttä, jonka pienellä kirjoitetulla nimellä on `SENSITIVE_KEYS`-listassa (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), korvataan arvolla `"[redacted]"`.
- **Suuret skalaariarvot poistetaan.** Jokainen `data:`-URI tai yli 4 KB:n merkkijono (base64-kuvat, binääriblobit) muuttuu arvoksi `"[stripped]"`.
- **Liian suuret rivit katkaistaan.** Jos sarjallistettu JSON ylittää noin 64 KB:n, koko hyötykuorma korvataan arvolla `{ truncated: true }`. Katkaistut rivit ovat edelleen katseltavissa, mutta **niitä ei voi perua**, koska palautettavaa ennen- tai jälkikuvaa ei ole.

## Missä data sijaitsee

Yksi `auditLogs`-taulu **jäsenyys**-tietokannassa palvelee kaikkia moduuleja. Sarakkeet: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON -merkkijono), ipAddress, module, batchId, created`. Migraatio `tools/migrations/membership/2026-07-04_audit_universal.ts` lisää sarakkeet `module` ja `batchId`, muuttaa `details`-sarakkeen tyypin `TEXT`-tyypistä `MEDIUMTEXT`-tyyppiin, lisää indeksit `ix_auditLogs_batch (batchId)` ja `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` sekä luo `batches`-taulun. `module`-sarake on olemassa juuri sitä varten, että `entityType`-arvojen törmäykset eri moduulien välillä (esim. `note` ja `setting` esiintyvät useassa) pysyvät suodatettavina. Kohdeindeksi mahdollistaa sekä kohdekohtaisen historian että peruutuksen ristiriitatarkistuksen.

Kirjoitukset moduulien yli kulkevat `RepoManager.getRepos("membership")`-kutsun kautta wrapperin sisältä. Järjestys on tarkoituksellinen: **ensin pääkirjoitus commitoidaan moduulin tietokantaan, sitten tarkastusrivin lisäys.** Normaalitilassa tarkastusrivin lisäyksen virhe niellään (`console.error`, Sentry poimii sen). Tarkastuskirjaus on neuvoa-antava eikä sen saa koskaan kaataa käyttäjän pyyntöä. **Erätilassa** se on tiukka (katso alla).

:::info Miksi ei triggereitä, CDC:tä tai moduulikohtaisia tauluja?
- **MySQL-triggerit** eivät tiedä toimivaa käyttäjää (yhteydellä ei ole `au`-muuttujaa), ja ne edellyttäisivät triggerijoukkojen ylläpitoa jokaisessa skeemassa.
- **binlog / CDC** on koko infrastruktuuriprojekti, jolla on sama toimijatunnistusongelma.
- **`userId`-arvon välittäminen jokaisen repositorion läpi** koskettaisi satoja tiedostoja vain siirtääkseen tietoa, jonka controller-kerros jo tietää.
- **Moduulikohtaiset tarkastustaulut** merkitsisivät seitsemänkertaista putkitusta ja hajautettuja kyselyitä jokaiseen moduulien välisiin kysymyksiin. Yksi taulu controller-keskuspisteessä on vähiten koodia vaativa ratkaisu, joka silti tallentaa toimijan.
:::

## Suorituskykyperiaatteet

Kriittinen polku on tarkoituksella kevyt, ja kustannus maksetaan vain siellä, missä siitä on hyötyä.

- **Ei lukua ennen kirjoitusta tavallisissa päivityksissä.** Tavallinen tallennus **ei** lataa vanhaa tietuetta. **Lähetetyt jälkiarvot** tallennetaan kenttään `details.after`, ja käyttöliittymä rakentaa vanha→uusi-muutoksen *katselun* yhteydessä vertaamalla kohdetta edelliseen tarkastusriviin. Yksi kysely katselussa, nolla kustannusta kirjoituksessa. Kentät, joihin ei ole koskettu julkaisun jälkeen, eivät yksinkertaisesti näytä ”vanhaa” arvoa. Tämä on hyväksyttävää.
- **Poistoilla on ennen-kuva.** `DELETE /:id` reitillä, jolla on `{ dbModule, table }` rekisterissä, rivi ladataan ensin geneerisesti ja tallennetaan kenttään `details.before`. Poistot ovat harvinaisia, ja ennen-kuva on koko sen jälkikäteen tutkimisen arvo.
- **Erätila on ainoa järjestelmällinen luku-ennen-kirjoitusta**, ja se on valinnainen. Massatoiminto tai tuonti on jo kallis, joten N kappaleen ennakkolukeminen on peruttavuuden hinta.
- **Tarkastuslisäykset odotetaan.** `actionWrapper` kerää lokikirjauslupaukset ja odottaa `await Promise.allSettled(...)`-kutsulla ennen vastauksen palauttamista. Tämä on yksittäisistä tärkein invariantti: Lambdassa kontti **jäätyy heti, kun vastaus palautuu**, joten odottamaton lisäys katoaa hiljaa. ”Laukaise ja unohda” tarkoittaa tässä, että *virheet eivät koskaan kaada pyyntöä*, ei sitä, ettei odotusta tehdä. Yksittäinen lisäys jo lämmitetyssä jäsenyyden yhteyspoolissa vie noin 1–3 ms.

## Erät ja peruminen

**Erä** ryhmittelee joukon muutoksia, jotta ne voidaan tarkistaa ja kumota yhdessä. Erän voi avata kahdella tavalla:

- **Eksplisiittinen:** `POST /membership/batches { label, source }` palauttaa `batchId`-arvon. Asiakas (B1Transfer tai B1Adminin tuontikäyttöliittymä) lähettää sen jälkeen jokaiseen seuraavaan tallennukseen tai poistoon otsakkeen `X-Batch-Id: <id>`. `POST /membership/batches/:id/complete` sulkee erän ja tallentaa `itemCount`-arvon.
- **Implisiittinen:** neljä massapäätepistettä avaavat, täyttävät ja sulkevat oman eränsä yhden pyynnön sisällä ja palauttavat `batchId`-arvon vastauksessa.

`batches`-taulu (jäsenyystietokanta): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Erätila on tiukka

Kun `X-Batch-Id` on läsnä, `actionWrapper` kiristää jokaisen suojauksen (`writeBatchAuditRows`):

1. Erän on oltava olemassa, `open`-tilassa ja kuulua `au.churchId`-seurakunnalle. Muuten vastaus on **403**.
2. Reitin on tuettava erää (`{ dbModule, table }` rekisterissä). Muuten vastaus on **400**.
3. Ennen toimintoa kaikkien kohteena olevien id-arvojen ennen-kuvat ladataan **yhdellä** kyselyllä `WHERE id IN (...) AND churchId = ?`. Jos tämä ennakkolukeminen epäonnistuu, pyyntö **päättyy virheeseen 500 eikä toimintoa suoriteta**. Erätilan ei koskaan pidä tuottaa hiljaa kirjanpitoa, jota ei voi perua. (Normaalitila sen sijaan toimii parhaan yrityksen periaatteella ja niellä ennakkolukuvirheet.)
4. Kun toiminto onnistuu, kohdekohtaisesti kirjoitetaan yksi tarkastusrivi, jossa on `batchId`, `details.before` ja `details.after`, sekä eksplisiittinen **luontimerkintä** erän luomille riveille.

### Peruminen

`POST /membership/batches/:id/undo` (oikeus: erän luoja tai `Permissions.server.admin`). Pyyntö hylätään, jos erä ei ole `completed`-tilassa tai on vanhempi kuin **30 päivän peruutusaika**. Sen jälkeen `BatchUndoHelper.undo()`:

1. Lataa erän tarkastusrivit ja **ryhmittelee ne** `(module, entityType, entityId)`-avaimen mukaan. Erän sisällä useasti kosketettu kohde kumotaan **kerran**, takaisin todelliseen erää edeltäneeseen tilaansa: varhaisimpaan ennen-kuvaan tai poistoon, jos erä loi kohteen. Tämän takia peruminen ei toista jokaista riviä sokeasti, sillä välivaiheen ennen-kuvan palauttaminen olisi väärin.
2. Jokaiselle kohteelle suoritetaan ensin **ristiriitatarkistus**: `auditLog.hasLaterModification()` kysyy, onko saman `(module, entityType, entityId)`-kohteen kohdalla **myöhempiä** tarkastusmerkintöjä tämän erän ulkopuolella. Jos on, kohdetta on muokattu tuonnin jälkeen. Se **ohitetaan ja raportoidaan**, sitä ei koskaan ylikirjoiteta. Tämä käyttää itse tarkastuslokia muutosten tunnistamiseen, joten mihinkään tauluun ei tarvita `modifiedAt`-sarakkeita.
3. Kumoaminen tehdään tallennetun toiminnon mukaan. `{ dbModule, table }` ratkaistaan rekisteristä geneerisillä Kysely-kirjoituksilla:
   - **created** → poista rivi kokonaan.
   - **updated** → kirjoita `details.before` takaisin.
   - **deleted** → lisää `details.before` uudelleen (päivitys tai lisäys, jos saman id-arvon rivi on ilmaantunut uudelleen).
4. Jokainen kumoaminen kirjataan itsekin tarkastukseen (`action: "<entityType>_undone"`, ei `batchId`-arvoa, koska perumisen peruminen on rajauksen ulkopuolella).

Toiminto valitaan eksplisiittisestä **luontimerkinnästä**, ei päätellen puuttuvasta ennen-kuvasta. Tyhjä ennen-kuva tai katkaistu rivi ei saa mennä sekaisin luonnin kanssa.

Tuloshyötykuorma on `{ restored, skippedConflicts: [...], failed: [...], status }`. Erä siirtyy tilaan `undone` (siisti) tai `partial`. **Tietokantojen välistä transaktiota ei ole.** Peruminen on parhaan yrityksen periaatteella rivi kerrallaan, sama rajoite, jonka Planning Center dokumentoi yhdistettyjen profiilien kohdalla.

:::warning Sivuvaikutuksia aiheuttavat kohteet tarvitsevat `onUndo`-koukun
`groupMember`-luonnin kumoamisen on myös kirjoitettava `groupMemberHistory`-tauluun (”left”), muuten poistuma-analytiikka hajoaa hiljaa. Tämä on pysyvä työtilan invariantti. Tällaiset kohteet rekisteröivät `AUDIT_REGISTRY`-rekisteriin `onUndo`-takaisinkutsun, joka palauttaa `true`, kun se on käsitellyt kumoamisen kokonaan, ja ohittaa geneerisen polun. `groupMembers` on tyypillinen tapaus: eksplisiittisellä polulla avain on rivin id, mutta massapäätepisteissä `personId`, ja jokainen lisäys ja poisto kirjataan historiaan.
:::

## Käyttöpinnat

Molemmat ylläpitonäkymät ovat **kehitteillä**. Tavoite on seuraava:

| Näkymä | Repo | Tarkoitus |
|---------|------|---------|
| **Audit Log -sivu** | B1Admin (ManageChurch → Audit Log) | Suodatus moduulin, kategorian, käyttäjän ja kohteen mukaan sekä vanha→uusi-erot: muokkauksille vertaamalla kohteen edelliseen merkintään, poistoille arvosta `details.before`. Tukee `GET /membership/auditlogs`, ja sen käyttöä rajoittaa `Permissions.server.admin`. |
| **Batches-sivu** | B1Admin (sama Settings-keskus) | Erien luettelo tiloineen ja määrineen, **View Results** (erän tarkastusrivit `GET /membership/batches/:id/results`-kautta) ja **Undo**-painike, joka näyttää ohitettujen ristiriitojen ja epäonnistuneiden kohteiden raportin. |
| **Tuonti-erät** | B1Transfer | Avaa erä, lähetä `X-Batch-Id` sen tavallisissa tallennuskutsuissa ja sulje lopussa. Tuonneista tulee peruttavia ilman uusia tuontipäätepisteitä. Vanha `importKey` säilyy pelkkänä luomisia seuraavana sukuhistoriamerkintänä, ja peruminen korvaa sen. |

## Sudenkuopat, joita tuleva muutos ei saa rikkoa

- **Tarkastuslisäysten on pysyttävä odotettuina.** Odottamaton `AuditLogHelper.log(...)` häviää Lambda-jäädytyksessä. Kerää lupaukset ja odota `await Promise.allSettled` ennen vastauksen palauttamista.
- **Kysely jättää `undefined`-arvot pois kohdasta `.set()`/`.values()`.** Palautuksessa tyhjennetty sarake säilyisi koskemattomana. `BatchUndoHelper` muuntaa kaikki puuttuvat kentät eksplisiittisiksi `null`-arvoiksi (`nullify`). Älä koskaan ohita sitä ”nopeamman” suoran kirjoituksen vuoksi.
- **Säilytysajan on pysyttävä selvästi peruutusajan yläpuolella.** `AuditLogRepo.deleteOld()` ajetaan yöajastimella (oletuksena 365 päivän säilytys), ja peruutusaika on 30 päivää. Jos säilytysaika koskaan lähestyy peruutusikkunaa, peruutuslokit poistuvat avoimien erien alta.
- **Katkaistuja rivejä ei voi perua.** `{ truncated: true }`-hyötykuormalla ei ole ennen- eikä jälkikuvaa. Peruminen raportoi sen `failed`-tilaan eikä arvaa.
- **Järjestys on moduulikirjoitus ja sitten tarkastus.** Älä koskaan siirrä tarkastuslisäystä ennen varsinaista kirjoitusta. Pidä se tiukkana erätilassa ja neuvoa-antavana normaalitilassa.

## Tiedostoluettelo

| Alue | Tiedostot |
|------|-----------|
| Wrapper / rekisteri | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, ennakkolukeminen + rivien kirjoitus) |
| Kumoamismoottori | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Tarkastusapuri | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllerit | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Mallit / repositoriot | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migraatio | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Ylläpitokäyttöliittymä (kehitteillä) | B1Admin Audit Log- ja Batches-sivut; B1Transfer-tuontierän otsikko |

## Liittyvät sivut

- [Moduulirakenne](../api/module-structure.md): miten jäsenyyden ulkopuolinen controller saavuttaa jäsenyyden repositoriot `RepoManager`-luokan kautta
- [Lahjoitukset](./giving.md): lahjoitusten kirjoituspolut, jotka kirjataan `sensitive`-merkittyinä myös anonyymeina
- [Jäsenyyden päätepisteet](../api/endpoints/membership.md): REST-rajapinta, joka kuljettaa `X-Batch-Id`-otsaketta ja tarjoaa `/auditlogs`- ja `/batches`-polut
