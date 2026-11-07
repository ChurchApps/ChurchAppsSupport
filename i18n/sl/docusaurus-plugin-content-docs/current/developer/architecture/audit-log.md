---
title: "Dnevnik sprememb in razveljavljivi paketi"
---

# Dnevnik sprememb in razveljavljivi paketi

<div class="article-intro">

Vsaka sprememba podatkov, ki jo sproži uporabnik v Api, je zabeležena (kdo, kaj, kdaj in od kod) v vseh modulih, brez dodatnega nastavljanja po posameznih krmilnikih. Nad tem dnevnikom je plast paketov: uvoz ali množično dejanje je mogoče označiti kot paket in ga pozneje **razveljaviti** vrstico po vrstico, po vzoru Planning Center. Oboje je shranjeno v eni tabeli `auditLogs` v bazi podatkov članstva in se upravlja iz ene same točke, `BaseController.actionWrapper`. Ta stran opisuje, kaj se beleži, kje so podatki shranjeni, kompromise glede zmogljivosti, ki oblikujejo sistem, in kako razveljavitev varno povrne paket brez transakcij čez več baz.

</div>

## Pregled

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

Pri vsem spodaj se opirata na dve strukturni dejstvi:

1. **Plast krmilnikov je edino mesto, ki pozna izvajalca dejanja.** Repozitoriji nikoli ne vidijo `AuthenticatedUser`; `au` imajo samo krmilniki. Krmilniki vseh modulov že prehajajo skozi `BaseController.actionWrapper`, zato se beleženje vključi prav tam. Podpisi repozitorijev se nikjer ne spreminjajo.
2. **Ena tabela služi vsem modulom.** Vrstice dnevnika za darovanja, prisotnost, vsebino itd. se vse zapisujejo v tabelo `auditLogs` v bazi članstva prek `RepoManager.getRepos("membership")`, tudi iz krmilnika, ki ni del članstva. Poizvedba »vse, kar je danes spremenila Jana« tako ostane ena sama.

## Kaj se beleži

Beleženje je **privzeto vklopljeno** za vse glagole, ki spreminjajo podatke, na vseh poteh. `actionWrapper` izpelje polja dnevnika iz zahteve brez kakršne koli nastavitve po poteh:

| Polje | Izpeljano iz |
|-------|--------------|
| `module` | `this.moduleName` (modul, ki je lastnik) |
| `entityType` | ednina zadnjega segmenta `req.baseUrl` (npr. `/membership/people` → `person`) |
| `category` | privzeto enako `entityType` |
| `action` | `${entityType}_saved` za `POST /`, `${entityType}_deleted` za `DELETE /:id`, sicer `${entityType}_${method}:${routePath}`, tako da se podpoti, ki niso CRUD (npr. `task_post:/:id/move`), zajamejo samodejno |

`BaseController.AUDIT_REGISTRY` je **samo za prepisovanja in izjeme**. Ni seznam dovoljenih. Pot se v njem pojavi, če želimo preimenovati njeno kategorijo ali `entityType`, razglasiti `{ dbModule, table }` (s čimer postane zmožna paketov in razveljavitve), jo označiti kot `sensitive` (beleži anonimne spremembe) ali jo izklopiti z `optOut: true`.

**Seznam izjem** (poti za pisanje, ki bi zalile dnevnik): `visits` / `visitsessions` / `sessions` / `checkin` v modulu prisotnosti (nedeljska nalivanja prijav) ter `messages` / `connections` / `devices` v modulu sporočanja (klepet in stanje prisotnosti). Vse ostalo se beleži.

**Množične končne točke** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) so registrirane v `BULK_ROUTES` in ustvarijo **eno vrstico dnevnika za vsak dotaknjen ID**. Uvoz 10.000 oseb tako ustvari 10.000 vrstic. Prav ta zrnatost omogoča razveljavitev paketa.

**Anonimne spremembe** (`actionWrapperAnon`, npr. darovanja gostov, registracije gostov, oddaje obrazcev) se beležijo samo na poteh, ki so v registru označene kot `sensitive`. Zapisane so z `userId="anonymous"` in IP-naslovom odjemalca. Darovanja so na vrhu seznama, ta pot pa ima resnično zgodovino regresij.

### Skrivanje skrivnosti in omejitve velikosti

Preden se katerakoli vsebina `details` shrani, `AuditLogHelper.capDetails()` nad njo zažene `sanitizeValue()`:

- **Ključi skrivnosti se skrijejo.** Vsako polje, katerega ime z malimi črkami je v `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), se nadomesti z `"[redacted]"`.
- **Ogromne vrednosti se odstranijo.** Vsak URI `data:` ali niz, daljši od 4 KB (fotografije v base64, binarni bloki), postane `"[stripped]"`.
- **Prevelike vrstice se omejijo.** Če serializirani JSON preseže približno 64 KB, se celotna vsebina nadomesti z `{ truncated: true }`. Skrajšane vrstice je še vedno mogoče pregledati, vendar **ni mogoče razveljaviti**, ker ni slike stanja pred in po spremembi, iz katere bi jih bilo mogoče obnoviti.

## Kje so podatki

Ena tabela `auditLogs` v bazi **članstva** služi vsem modulom. Stolpci: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Migracija `tools/migrations/membership/2026-07-04_audit_universal.ts` doda `module` in `batchId`, razširi `details` iz `TEXT` v `MEDIUMTEXT`, doda indeksa `ix_auditLogs_batch (batchId)` in `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` ter ustvari tabelo `batches`. Stolpec `module` obstaja prav zato, da ostanejo trki `entityType` med moduli (`note` in `setting` obstajata v več modulih) filtrirljivi. Indeks entitet pa poganja tako zgodovino po entitetah kot preverjanje konfliktov pri razveljavitvi.

Pisanja med moduli potekajo prek `RepoManager.getRepos("membership")` znotraj ovoja. Vrstni red je namenski: **glavni zapis se najprej potrdi v bazi modula, vstavitev v dnevnik pa šele nato.** V običajnem načinu se napaka pri vstavitvi v dnevnik pogoltne (`console.error`, Sentry jo ujame). Dnevnik je informativen in ne sme nikoli spodleteti uporabnikove zahteve. V **načinu paketov je strog** (glej spodaj).

:::info Zakaj ne sprožilci, CDC ali tabele po modulih?
- **Sprožilci MySQL** ne poznajo uporabnika, ki dejanje izvaja (povezava nima `au`), in bi pomenili vzdrževanje nabora sprožilcev v vsaki shemi.
- **binlog / CDC** je celotni infrastrukturni projekt z istim problemom identitete izvajalca.
- **Posredovanje `userId` skozi vsak repozitorij** bi zadelo na stotine datotek, samo da bi premaknili podatke, ki jih plast krmilnikov že ima.
- **Tabele dnevnika po modulih** bi pomenile 7-kratno napeljavo in razpršene poizvedbe za vsako vprašanje čez module. Ena tabela na točki krmilnikov je najmanj kode, ki še vedno zajame izvajalca.
:::

## Stališče do zmogljivosti

Vroča pot je namerno poceni. Strošek se plača samo tam, kjer kaj prinese.

- **Pri običajnih posodobitvah se ne bere pred pisanjem.** Redno shranjevanje **ne** naloži starega zapisa. **Poslane vrednosti po spremembi** se shranijo v `details.after`. Uporabniški vmesnik ob *ogledu* rekonstruira prejšnjo→novo vrednost tako, da primerja z zadnjo prejšnjo vrstico dnevnika entitete. Ena poizvedba ob ogledu, nič stroškov ob pisanju. Polja, ki se od izida niso spremenila, preprosto ne prikažejo »prejšnje« vrednosti, kar je sprejemljivo.
- **Pri brisanju se shrani slika stanja pred spremembo.** `DELETE /:id` na poti v registru z `{ dbModule, table }` najprej splošno naloži vrstico in jo shrani v `details.before`. Brisanja so redka, slika stanja pred spremembo pa je vsa forenzična vrednost.
- **Način paketov je edini sistematičen primer branja pred pisanjem** in je izbiren. Množično dejanje ali uvoz je že sam po sebi drag, zato so N branj posnetkov cena za zmožnost razveljavitve.
- **Vstavitve v dnevnik se čakajo.** `actionWrapper` zbere obljube dnevnika in pred vrnitvijo izvede `await Promise.allSettled(...)`. To je najpomembnejša invariantna lastnost: na Lambdi se kontejner **zamrzne takoj, ko se odgovor vrne**, zato se nečakana vstavitev tiho izgubi. »Sproži in pozabi« tu pomeni *napake nikoli ne spodletijo zahteve*, ne *ne čakaj*. Ena vstavitev v že segreti bazen članstva traja približno 1–3 ms.

## Paketi in razveljavitev

**Paket** združuje nabor sprememb, da jih je mogoče pregledati in razveljaviti skupaj. Odpreti ga je mogoče na dva načina:

- **Izrecno:** `POST /membership/batches { label, source }` vrne `batchId`. Odjemalec (B1Transfer, uvozni vmesnik B1Admin) nato pošlje `X-Batch-Id: <id>` pri vsakem naslednjem shranjevanju ali brisanju. `POST /membership/batches/:id/complete` ga zapre in zabeleži `itemCount`.
- **Posredno:** štiri množične končne točke v eni sami zahtevi same odprejo, napolnijo in zaključijo svoj paket ter v odgovoru vrnejo `batchId`.

Tabela `batches` (baza članstva): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Način paketov je strog

Ko je prisoten `X-Batch-Id`, `actionWrapper` zaostri vse zaščite (`writeBatchAuditRows`):

1. Paket mora obstajati, biti `open` in pripadati `au.churchId`. Sicer **403**.
2. Pot mora podpirati pakete (`{ dbModule, table }` v registru). Sicer **400**.
3. Preden se dejanje izvede, se slike stanja pred spremembo za vse prizadete ID-je naložijo z **enim** poizvedbo `WHERE id IN (...) AND churchId = ?`. Če to branje posnetka spodleti, zahteva **spodleti s 500 in dejanje se ne izvede**. Način paketov ne sme nikoli tiho ustvariti dnevnika, ki ga ni mogoče razveljaviti. (Nasprotno pa je običajni način »najboljši poskus« in napake posnetkov pogoltne.)
4. Ko dejanje uspe, se za vsako entiteto zapiše ena vrstica dnevnika z `batchId`, `details.before` in `details.after`, plus izrecna **oznaka ustvarjanja** za vrstice, ki jih je paket ustvaril.

### Razveljavitev

`POST /membership/batches/:id/undo` (dovoljenje: ustvarjalec paketa ali `Permissions.server.admin`). Zavrne, če paket ni `completed` ali je starejši od **30-dnevnega okna za razveljavitev**. `BatchUndoHelper.undo()` nato:

1. Naloži vrstice dnevnika paketa in jih **združi po `(module, entityType, entityId)`.** Entiteta, ki se je v enem paketu večkrat spremenila, se razveljavi **enkrat**, nazaj na pravo stanje pred paketom. To je najzgodnejša slika stanja pred spremembo ali brisanje, če jo je paket ustvaril. Zato razveljavitev ne ponavlja vsake vrstice po vrsti: obnova vmesnega posnetka sredi paketa bi bila napačna.
2. Za vsako entiteto najprej izvede **zaščito pred konflikti**: `auditLog.hasLaterModification()` preveri, ali za isto `(module, entityType, entityId)` obstaja *poznejši* vnos dnevnika zunaj tega paketa. Če obstaja, je bila entiteta urejena po uvozu. **Preskoči se in prijavi**, nikoli se ne prepiše. Za zaznavanje sprememb se uporablja kar sam dnevnik. Na nobeni tabeli ni potrebnih stolpcev `modifiedAt`.
3. Obrne zabeleženo operacijo, pri čemer `{ dbModule, table }` poišče v registru in uporabi splošne zapise Kysely:
   - **created** → trdo izbriše vrstico.
   - **updated** → zapiše nazaj `details.before`.
   - **deleted** → ponovno vstavi `details.before` (posodobi ali vstavi, če se je vrstica z istim ID-jem znova pojavila).
4. Vsaka razveljavitev se sama beleži v dnevnik (`action: "<entityType>_undone"`, brez `batchId`, ker razveljavitev razveljavitve ni predmet te funkcije).

Operacija se izbere iz izrecne **oznake ustvarjanja**, ne iz manjkajoče slike stanja pred spremembo. Legitimno prazna slika ali skrajšana vrstica ne smeta biti zamenjani za ustvarjanje.

Vsebina rezultata je `{ restored, skippedConflicts: [...], failed: [...], status }`. Paket preide v `undone` (brez težav) ali `partial`. **Transakcije čez več baz ni.** Razveljavitev je po vrsticah »najboljši poskus«, enaka omejitev, kot jo Planning Center navaja pri združenih profilih.

:::warning Entitete s stranskimi učinki potrebujejo kavelj `onUndo`
Pri razveljavitvi ustvarjenega `groupMember` je treba zapisati tudi `groupMemberHistory` (»left«), sicer se analitika odhodov (churn) tiho pokvari. To je stalna invariantna lastnost delovnega okolja. Take entitete v `AUDIT_REGISTRY` registrirajo povratni klic `onUndo`, ki vrne `true`, ko je razveljavitev v celoti obdelana, s čimer se zaobide splošna pot. `groupMembers` je kanoničen primer. Pri izrecni poti se ključi po ID-ju vrstice, pri množičnih končnih točkah pa po `personId`, in zgodovina se beleži pri vsakem dodajanju in odstranjevanju.
:::

## Vmesniki za uporabo

Oba skrbniška vmesnika sta **v razvoju**. Namen:

| Vmesnik | Repozitorij | Namen |
|---------|-------------|-------|
| **Stran Audit Log** | B1Admin (ManageChurch → Audit Log) | Filtriranje po modulu, kategoriji, uporabniku ali entiteti in prikaz razlik prejšnje→nove vrednosti. Pri urejanjih se primerja s prejšnjim vnosom entitete, pri brisanjih pa iz `details.before`. Podpira ga `GET /membership/auditlogs`, dostop pa je omejen z `Permissions.server.admin`. |
| **Stran Batches** | B1Admin (isto središče nastavitev) | Seznam paketov s statusom in števci, **View Results** (vrstice dnevnika paketa prek `GET /membership/batches/:id/results`) ter gumb **Undo**, ki prikaže poročilo o preskočenih konfliktih in neuspelih vrsticah. |
| **Paketi uvoza** | B1Transfer | Odpri paket, pri običajnih shranjevanjih pošlji `X-Batch-Id`, na koncu ga zaključi. Uvozi tako postanejo razveljavljivi brez novih končnih točk za uvoz. Staro polje `importKey` ostane kot oznaka porekla, ki označuje samo ustvarjanja. Za razveljavitev ga nadomešča. |

## Pasti, ki jih prihodnja sprememba ne sme pokvariti

- **Vstavitve v dnevnik morajo ostati čakane.** Nečakan `AuditLogHelper.log(...)` se zaradi zamrznitve na Lambdi izgubi. Zberi obljube in pred vrnitvijo uporabi `await Promise.allSettled`.
- **Kysely izpusti `undefined` iz `.set()`/`.values()`.** Pri obnovi bi se počiščen stolpec ohranil nespremenjen. `BatchUndoHelper` vsa manjkajoča polja pretvori v eksplicitni `null` (`nullify`). Tega nikoli ne zaobidi za »hitrejši« neposredni zapis.
- **Hramba mora ostati precej nad oknom za razveljavitev.** `AuditLogRepo.deleteOld()` se izvaja ob nočnem časovniku (privzeta hramba 365 dni), okno za razveljavitev pa je 30 dni. Če bi se hramba kdaj približala temu oknu, bi se dnevniki razveljavitve izbrisali izpod odprtih paketov.
- **Skrajšane vrstice ni mogoče razveljaviti.** Vsebina `{ truncated: true }` nima slike stanja pred ali po spremembi. Razveljavitev jo prijavi kot `failed` in nikoli ne ugiba.
- **Vrstni red je najprej pisanje v modul, nato dnevnik.** Vstavitev v dnevnik nikoli ne premikaj pred dejansko pisanje. Ohrani strogost v načinu paketov in informativnost v običajnem načinu.

## Seznam datotek

| Območje | Datoteke |
|---------|----------|
| Ovoj / register | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, posnetki + zapisi vrstic) |
| Motor za razveljavitev | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Pomočnik za dnevnik | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Krmilniki | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modeli / repozitoriji | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migracija | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Skrbniški vmesnik (v razvoju) | Strani B1Admin Audit Log in Batches; glava uvoznega paketa v B1Transfer |

## Sorodne strani

- [Struktura modulov](../api/module-structure): kako krmilnik, ki ni del članstva, doseže repozitorije članstva prek `RepoManager`
- [Darovanja](./giving): poti pisanja darovanj, ki se beležijo kot `sensitive`, tudi kadar so anonimne
- [Končne točke članstva](../api/endpoints/membership): REST vmesnik, ki prenaša `X-Batch-Id` in izpostavlja `/auditlogs` ter `/batches`
