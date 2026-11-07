---
title: "Jurnal de audit și loturi reversibile"
---

# Jurnal de audit și loturi reversibile

<div class="article-intro">

Fiecare modificare inițiată de utilizator în Api este înregistrată (cine, ce, când și de unde) în toate modulele, fără nicio configurare suplimentară pe fiecare controller. Peste această evidență se află un strat de loturi: un import sau o acțiune în masă poate fi marcat ca lot și apoi **anulat** rând cu rând, în stil Planning Center. Ambele sunt stocate într-un singur tabel `auditLogs` din baza de date membership și sunt controlate integral dintr-un singur punct central, `BaseController.actionWrapper`. Această pagină descrie ce este auditat, unde sunt stocate datele, compromisurile de performanță care le modelează și modul în care anularea inversează în siguranță un lot, fără tranzacții între baze de date.

</div>

## Prezentare generală

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

Două fapte structurale stau la baza tuturor celor de mai jos:

1. **Stratul controller-elor este singurul care cunoaște actorul.** Repository-urile nu văd niciodată `AuthenticatedUser`; doar controller-ele dețin `au`. Fiecare controller al fiecărui modul trece deja prin `BaseController.actionWrapper`, deci auditarea se conectează exact aici, fără modificări ale semnăturilor din repository-uri.
2. **Un singur tabel servește toate modulele.** Rândurile de audit pentru donații, prezențe, conținut etc. sunt scrise toate în tabelul `auditLogs` din baza membership prin `RepoManager.getRepos("membership")`, chiar și dintr-un controller care nu aparține modulului membership. Întrebarea „ce a modificat Jane astăzi” rămâne o singură interogare.

## Ce este auditat

Auditarea este **activată implicit pentru fiecare verb de modificare pe fiecare rută**. `actionWrapper` derivă câmpurile de audit din cerere, fără nicio configurare pe rută:

| Câmp | Derivat din |
|------|-------------|
| `module` | `this.moduleName` (modulul proprietar) |
| `entityType` | ultimul segment al `req.baseUrl`, la forma singulară (de ex. `/membership/people` → `person`) |
| `category` | implicit `entityType` |
| `action` | `${entityType}_saved` pentru `POST /`, `${entityType}_deleted` pentru `DELETE /:id`, în rest `${entityType}_${method}:${routePath}`, astfel încât subrutele non-CRUD (de ex. `task_post:/:id/move`) sunt capturate automat |

`BaseController.AUDIT_REGISTRY` este **doar pentru suprascrieri și excluderi**. Nu este o listă de permise. O rută apare acolo pentru a-și redenumi categoria sau entityType, pentru a declara `{ dbModule, table }` (ceea ce o face capabilă de loturi și anulare), pentru a fi marcată ca `sensitive` (auditează mutările anonime) sau pentru a fi dezactivată cu `optOut: true`.

**Lista de excluderi** (căi de scriere intensive care ar copleși evidența): prezențele `visits` / `visitsessions` / `sessions` / `checkin` (valul de check-in de duminică) și mesageria `messages` / `connections` / `devices` (chat și prezență). Tot restul se înregistrează.

**Endpoint-urile în masă** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sunt înregistrate în `BULK_ROUTES` și emit **un rând de audit per id atins**, deci un import de 10.000 de persoane produce 10.000 de rânduri. Tocmai această granularitate pe entitate face lotul reversibil.

**Modificările anonime** (`actionWrapperAnon`: donații de la oaspeți, înregistrări de oaspeți, trimiteri de formulare) sunt auditate doar pentru rutele marcate `sensitive` în registru, scrise cu `userId="anonymous"` plus adresa IP a clientului. Donațiile sunt pe primul loc; acest traseu are un istoric real de regresii.

### Redactarea secretelor și limitele de dimensiune

Înainte ca orice payload `details` să fie stocat, `AuditLogHelper.capDetails()` rulează `sanitizeValue()` asupra lui:

- **Cheile secrete sunt redactate.** Orice câmp al cărui nume, scris cu litere mici, se află în `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) este înlocuit cu `"[redacted]"`.
- **Scalarii mari sunt eliminați.** Orice URI `data:` sau șir de peste 4 KB (fotografii base64, blob-uri) devine `"[stripped]"`.
- **Rândurile prea mari sunt limitate.** Dacă JSON-ul serializat depășește ~64 KB, întregul payload este înlocuit cu `{ truncated: true }`. Rândurile trunchiate pot fi în continuare vizualizate, dar **nu pot fi anulate** (nu există imagine înainte/după din care să se restaureze).

## Unde sunt stocate datele

Un singur tabel `auditLogs` din baza **membership** susține toate modulele. Coloanele: `id, churchId, userId, category, action, entityType, entityId, details (șir JSON MEDIUMTEXT), ipAddress, module, batchId, created`. Migrarea `tools/migrations/membership/2026-07-04_audit_universal.ts` adaugă `module` și `batchId`, lărgește `details` de la `TEXT` la `MEDIUMTEXT`, adaugă indecșii `ix_auditLogs_batch (batchId)` și `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` și creează tabelul `batches`. Coloana `module` există tocmai pentru ca ciocnirile de `entityType` între module (`note`, `setting` există în mai multe) să rămână filtrabile, iar indexul pe entitate alimentează atât istoricul per entitate, cât și verificarea de conflict la anulare.

Scrierile între module trec prin `RepoManager.getRepos("membership")` din interiorul wrapper-ului. Ordinea este deliberată: **scrierea principală se confirmă mai întâi în baza modulului, iar inserarea în audit a doua.** În modul normal, o eroare la inserarea în audit este înghițită (`console.error`, Sentry o preia). Auditul este consultativ și nu trebuie să eșueze niciodată cererea unui utilizator. În **modul de lot este strict** (vezi mai jos).

:::info De ce nu trigger-e, CDC sau tabele per modul?
- **Trigger-ele MySQL** nu cunosc utilizatorul care acționează (conexiunea nu are `au`) și ar presupune întreținerea unor seturi de trigger-e în fiecare schemă.
- **binlog / CDC** este un proiect de infrastructură complet, cu aceeași problemă de identitate a actorului.
- **Transmiterea `userId` prin fiecare repository** ar atinge sute de fișiere pentru a muta informația pe care stratul controller o are deja.
- **Tabelele de audit per modul** ar însemna de șapte ori mai multă infrastructură și interogări de tip fan-out pentru orice întrebare între module. Un singur tabel, în punctul central al controller-ului, este designul cu cel mai puțin cod care captează totuși actorul.
:::

## Poziția privind performanța

Calea critică este intenționat ieftină; costul se plătește doar acolo unde aduce ceva.

- **Fără citire înainte de scriere la actualizările obișnuite.** O salvare obișnuită **nu** încarcă înregistrarea veche. Valorile **trimise după modificare** sunt stocate în `details.after`. Interfața reconstituie vechi→nou la *vizualizare*, comparând cu rândul de audit anterior al entității. O interogare la vizualizare, zero cost la scriere. Câmpurile neatinse de la lansare apar pur și simplu fără valoare „veche”, ceea ce este acceptabil.
- **Ștergerile primesc o imagine „înainte”.** `DELETE /:id` pe o rută din registru cu `{ dbModule, table }` încarcă mai întâi rândul în mod generic și îl stochează în `details.before`. Ștergerile sunt rare, iar imaginea „înainte” reprezintă întreaga valoare criminalistică.
- **Modul de lot este singura citire înainte de scriere sistematică**, și este opt-in. O operație în masă sau de import este deja costisitoare, deci cele N citiri de instantanee reprezintă prețul anulării.
- **Inserările în audit sunt așteptate (awaited).** `actionWrapper` colectează promisiunile de logare și apelează `await Promise.allSettled(...)` înainte de a returna. Acesta este cel mai important invariant: pe Lambda, containerul **îngheață în momentul în care răspunsul este returnat**, deci o inserare neașteptată este pur și simplu pierdută. „Fire and forget” aici înseamnă că *erorile nu eșuează cererea*, nu că *nu se așteaptă*. O inserare singulară în pool-ul membership deja încălzit durează ~1–3 ms.

## Loturi și anulare

Un **lot** grupează un set de modificări, astfel încât acestea să poată fi revizuite și inversate împreună. Există două moduri de a deschide unul:

- **Explicit:** `POST /membership/batches { label, source }` returnează un `batchId`. Clientul (B1Transfer, o interfață de import din B1Admin) trimite apoi `X-Batch-Id: <id>` la fiecare salvare sau ștergere ulterioară. `POST /membership/batches/:id/complete` îl închide și înscrie `itemCount`.
- **Implicit:** cele patru endpoint-uri în masă deschid, populează și finalizează propriul lot în cadrul aceleiași cereri, returnând `batchId` în răspuns.

Tabelul `batches` (baza membership): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Modul de lot este strict

Când `X-Batch-Id` este prezent, `actionWrapper` strânge fiecare verificare (`writeBatchAuditRows`):

1. Lotul trebuie să existe, să fie `open` și să aparțină lui `au.churchId`, altfel răspunsul este **403**.
2. Ruta trebuie să fie capabilă de lot (`{ dbModule, table }` în registru), altfel răspunsul este **400**.
3. Înainte ca acțiunea să ruleze, imaginile „înainte” pentru toate id-urile afectate sunt încărcate printr-o **singură** interogare `WHERE id IN (...) AND churchId = ?`. Dacă această citire a instantaneului eșuează, cererea **eșuează cu 500 și acțiunea nu se execută**. Modul de lot nu trebuie să producă niciodată, în tăcere, un registru care nu poate fi anulat. (În modul normal, în schimb, operația este de tip best-effort, iar erorile de instantaneu sunt înghițite.)
4. După ce acțiunea reușește, se scrie câte un rând de audit per entitate, cu `batchId`, `details.before` și `details.after`, plus un **marcaj explicit de creare** pentru rândurile create de lot.

### Anularea

`POST /membership/batches/:id/undo` (permisiune: creatorul lotului sau `Permissions.server.admin`). Refuză dacă lotul nu este `completed` sau dacă are mai mult de **fereastra de anulare de 30 de zile**. `BatchUndoHelper.undo()` apoi:

1. Încarcă rândurile de audit ale lotului și le **grupează după `(module, entityType, entityId)`**. O entitate atinsă de mai multe ori în cadrul aceluiași lot este inversată **o singură dată**, înapoi la starea sa reală dinaintea lotului: cea mai veche imagine „înainte” sau o ștergere, dacă lotul a creat-o. De aceea anularea nu reia naiv fiecare rând. Restaurarea unui instantaneu intermediar din mijlocul lotului ar fi greșită.
2. Pentru fiecare entitate, rulează **mai întâi verificarea de conflict**: `auditLog.hasLaterModification()` întreabă dacă există vreo intrare de audit *ulterioară* pentru aceeași `(module, entityType, entityId)`, în afara acestui lot. Dacă există, entitatea a fost editată după import. Este **sărită și raportată**, niciodată suprascrisă. Aceasta refolosește chiar jurnalul de audit ca detector de modificări. Nu sunt necesare coloane `modifiedAt` în niciun tabel.
3. Inversează conform operației înregistrate, luând `{ dbModule, table }` din registru și folosind scrieri generice Kysely:
   - **creat** → ștergere definitivă a rândului.
   - **actualizat** → scrie înapoi `details.before`.
   - **șters** → reinserează `details.before` (actualizare sau inserare, dacă între timp a reapărut un rând cu acel id).
4. Fiecare inversare este la rândul ei auditată (`action: "<entityType>_undone"`, fără `batchId`, deoarece anularea anulării este în afara sferei).

Operația este aleasă din **marcajul explicit de creare**, nu dedusă din lipsa unei imagini „înainte”. O imagine „înainte” legitim goală sau un rând trunchiat nu trebuie confundat cu o creare.

Payload-ul rezultatului este `{ restored, skippedConflicts: [...], failed: [...], status }`; lotul trece în `undone` (curat) sau `partial`. **Nu există tranzacție între baze de date.** Anularea este best-effort pe fiecare rând, aceeași limitare pe care Planning Center o documentează pentru profilurile unite.

:::warning Entitățile cu efecte secundare au nevoie de un hook `onUndo`
Inversarea unei creări de `groupMember` trebuie să scrie și `groupMemberHistory` („left”), altfel analizele de fluctuație se strică în tăcere. Acesta este un invariant permanent al spațiului de lucru. Astfel de entități înregistrează un callback `onUndo` în `AUDIT_REGISTRY`, care returnează `true` când a gestionat complet inversarea, ocolind calea generică. `groupMembers` este cazul canonic: este indexat după id-ul rândului pe calea explicită, dar după `personId` pe endpoint-urile în masă, iar istoricul este urmărit la fiecare adăugare sau eliminare.
:::

## Suprafețe de consum

Ambele suprafețe de administrare sunt **în lucru**. Intenția:

| Suprafață | Repository | Scop |
|-----------|------------|------|
| **Pagina Jurnal de audit** | B1Admin (ManageChurch → Audit Log) | Filtrare după modul, categorie, utilizator sau entitate și afișarea diferențelor vechi→nou: pentru modificări, prin compararea cu intrarea anterioară a entității; pentru ștergeri, din `details.before`. Alimentată de `GET /membership/auditlogs`, protejată de `Permissions.server.admin`. |
| **Pagina Loturi** | B1Admin (același hub Settings) | Listează loturile cu starea și numărătoarele, **View Results** (rândurile de audit ale lotului, prin `GET /membership/batches/:id/results`) și un buton **Undo** care afișează raportul de conflicte sărite sau eșecuri. |
| **Loturi de import** | B1Transfer | Deschide un lot, trimite `X-Batch-Id` la apelurile obișnuite de salvare și finalizează la sfârșit. Importurile devin reversibile fără niciun endpoint nou de import. Cheia moștenită `importKey` rămâne ca marcator de descendență doar pentru creări și este înlocuită pentru anulare. |

## Capcane pe care o modificare viitoare nu trebuie să le regreseze

- **Inserările în audit trebuie să rămână așteptate.** `AuditLogHelper.log(...)` neașteptat este pierdut din cauza înghețării Lambda. Colectați promisiunile și apelați `await Promise.allSettled` înainte de a returna.
- **Kysely elimină `undefined` din `.set()` și `.values()`.** La restaurare, o coloană golită ar supraviețui neatinsă. `BatchUndoHelper` convertește fiecare câmp absent într-un `null` explicit (`nullify`). Nu ocoliți niciodată acest lucru pentru o scriere directă „mai rapidă”.
- **Retenția trebuie să rămână mult peste fereastra de anulare.** `AuditLogRepo.deleteOld()` rulează pe temporizatorul nocturn (retenție implicită de 365 de zile), iar fereastra de anulare este de 30 de zile. Dacă retenția ar coborî spre fereastră, registrele de anulare ar fi șterse de sub loturile deschise.
- **Rândurile trunchiate nu pot fi anulate.** Un payload `{ truncated: true }` nu are imagine înainte/după. Anularea îl raportează ca `failed` și nu ghicește niciodată.
- **Ordinea este scriere în modul, apoi audit.** Nu mutați niciodată inserarea în audit înaintea scrierii reale și păstrați-o strictă în lot și consultativă în modul normal.

## Inventarul fișierelor

| Zonă | Fișiere |
|------|---------|
| Wrapper / registru | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, instantaneu și scrierea rândurilor de lot) |
| Motorul de anulare | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Helper de audit | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllere | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modele / repository-uri | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrare | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Interfață de administrare (în lucru) | Paginile B1Admin Audit Log și Batches; antetul lotului de import din B1Transfer |

## Pagini conexe

- [Structura modulelor](../api/module-structure): cum ajunge un controller din afara modulului membership la repository-urile membership prin `RepoManager`
- [Donații](./giving): căile de scriere pentru donații, auditate ca `sensitive` chiar și când sunt anonime
- [Endpoint-uri Membership](../api/endpoints/membership): API-ul REST care transportă `X-Batch-Id` și expune `/auditlogs` și `/batches`
