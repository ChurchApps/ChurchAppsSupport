---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Dacă biserica dumneavoastră primește donații prin Donorbox, dar urmărește persoanele și extrasele în B1, puteți configura declanșatorii instant Zapier de la Donorbox pentru a crea înregistrări de donație corespunzătoare în B1 — și pentru a crea donatorul ca persoană în B1 dacă nu există deja. Fără reconciliere manuală, fără export lunar.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Donorbox](https://donorbox.org) cu cel puțin o campanie
- Un cont [Zapier](https://zapier.com)
- Un utilizator B1Admin cu permisiunea **Edit Settings**

</div>

## Ce puteți configura

| Direcție | Declanșator Donorbox | Acțiune B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instant) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (recurent) | Find Person → Add Donation (folosiți ID-ul planului ca notă) |

Donorbox publică declanșatorii săi ca **instant** — se activează în câteva secunde după o donație reală. Nu există întârziere de interogare.

## Configurare

### 1. Generați o cheie API B1

În B1Admin: **Settings → Developer → API Keys → New API Key**. Domenii de acces:

- `people:read` — pentru a căuta donatorul după adresa de e-mail
- `people:write` — pentru a-l crea dacă este nou
- `donations:write` — pentru a înregistra donația

Declanșatorii din această direcție aparțin Donorbox, nu B1, deci nu aveți nevoie de `settings:write` aici.

### 2. Creați Zap-ul „înregistrează o donație"

1. **Declanșator** — Donorbox: New Donation. Conectați-l cu cheia API Donorbox (în Donorbox: *Account → Profile → API Settings*).
2. **Acțiune** — B1.church: Find Person. Mapați adresa de e-mail a donatorului din declanșator în câmpul de căutare *Email*.
3. **Acțiune** — Filter by Zapier (opțional): continuați doar dacă donatorul nu a fost găsit, apoi…
4. **Acțiune** — B1.church: Create Person. Mapați prenumele/numele/e-mailul astfel încât donatorul să fie înregistrat ca membru, nu doar ca înregistrare de donație.
5. **Acțiune** — B1.church: Add Donation. Mapați:
   - Suma → `data.amount`
   - Data donației → data donației din declanșator
   - Fondul → alegeți fondul B1 care corespunde campaniei Donorbox (Zapier vă permite să schimbați fondurile pe baza unui filtru sau a unui pas de formatare)
   - Metoda → „Online"
   - Note → ID-ul tranzacției Donorbox (util la reconciliere)

Activați Zap-ul. Următoarea donație live prin Donorbox va apărea automat în **B1Admin → Donations**.

## Rețete frecvente

### Un Zap pentru fiecare fond

Dacă derulați mai multe campanii Donorbox care corespund unor fonduri B1 separate, cea mai curată structură este un Zap pentru fiecare campanie, cu un filtru de *campanie* Donorbox în partea de sus — astfel, corespondența fondurilor este fixată și pasul de căutare este omis.

### Tratați donațiile actualizate ca corecturi

Declanșatorul *New or Updated Donation* de la Donorbox se activează și la modificări. Folosiți un pas Zapier *Path* pe `event_type` pentru a bifurca: „new" → Add Donation, „updated" → Find Donation + Update (notă: aplicația Zapier a B1 nu are momentan o acțiune Update Donation — deocamdată, înregistrați evenimentele „updated" într-un canal Slack pentru verificare manuală).

### Sincronizați modificările planurilor recurente într-un canal Slack

- **Declanșator** — Donorbox: New or Updated Plan
- **Acțiune** — Slack: Send Message către `#donations` (de ex. „Plan modificat — donația lunară a Sarei este acum de 200 $")

## Limite și observații

- **Potriviți donatorii după adresa de e-mail.** Donorbox nu partajează ID-ul persoanei din B1; singura cheie de legătură durabilă este adresa de e-mail. Donatorii care donează sub o altă adresă de e-mail vor crea o nouă persoană în B1 — reconcilierea lunară ar trebui să caute aceste cazuri.
- **Rambursările nu sunt expuse separat** — Donorbox emite o actualizare de stare pentru aceeași donație. Aplicația Zapier a B1 nu are momentan o acțiune *Update Donation*; modelul sigur de lucru în prezent este înregistrarea evenimentelor de rambursare în afara sistemului și ajustarea manuală a donației.
- **Testați mai întâi în sandbox-ul Donorbox** pentru a evita crearea de donații false în B1 de producție. Donorbox oferă credențiale de mod test separate de cele live.

## Depanare

- **Avertismentul „Person not found" la fiecare rulare** — este normal dacă ați ordonat pașii astfel încât un *Create Person* să ruleze în ramura „not found". Dacă pasul Create Person nu rulează niciodată, verificați dacă cheia API are `people:write`.
- **Suma donației pare de 100 de ori mai mare sau mai mică** — Donorbox trimite sume în cenți în unele variante ale datelor și în dolari în altele. Folosiți un pas *Formatter by Zapier — Numbers* pentru a împărți la 100, dacă este necesar.
- **Donații duplicate dintr-un singur cadou** — Donorbox declanșează atât *New Donation*, cât și *Updated Donation*. Filtrați fie la `event_type = "donation.succeeded"`, fie construiți două Zap-uri cu filtre care nu se suprapun.

## Vezi și

- [Zapier (prezentare generală)](../zapier) — partea B1 a fiecărei rețete Zapier
- [Subsplash](./subsplash) — o altă platformă de donații cu o aplicație Zapier
- [Mailchimp](./mailchimp) — conectați „cadou nou" la o etichetă de e-mail
