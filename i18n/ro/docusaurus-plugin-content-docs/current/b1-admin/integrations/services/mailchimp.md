---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Menține o audiență Mailchimp sincronizată automat cu B1: persoanele se adaugă cu numele, adresa de e-mail și telefonul lor; apartenența la grupuri și liste devine etichete în Mailchimp; persoanele șterse sunt arhivate. Sincronizarea este integrată în B1 — fără serviciu terț, fără tarifare per sarcină, iar modificările ajung aproape în timp real, nu într-un program nocturn.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Mailchimp](https://mailchimp.com) cu audiența pe care vrei să o gestioneze B1
- O **cheie API** Mailchimp (Mailchimp: pictograma profilului → **Account & billing → Extras → API keys**)
- **ID-ul audienței** tale (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Un utilizator B1Admin cu permisiunea **Edit Settings**

</div>

## Ce se sincronizează

| Modificare în B1 | Efect în Mailchimp |
|---|---|
| Persoană adăugată sau actualizată | Abonat adăugat/actualizat (prenume, nume, telefon; noii abonați apar ca `subscribed`) |
| Persoană ștearsă (sau ștearsă conform GDPR) | Abonat arhivat |
| Persoană intră într-un grup | Se adaugă o etichetă cu numele grupului |
| Persoană iese dintr-un grup | Eticheta respectivă se elimină |
| Persoană intră într-o listă salvată | Se adaugă o etichetă cu numele listei |
| Persoană iese dintr-o listă salvată | Eticheta respectivă se elimină |

**Listele salvate sunt de obicei o sursă mai bună de etichete.** O [listă salvată](/docs/b1-admin/people/lists) din B1 este o audiență bazată pe reguli, care se reevaluează singură — de exemplu, „toți cei din campusul de nord” sau „membrii care au acceptat e-mailurile pastorale”. Dacă segmentele tale din Mailchimp se bazează pe etichetele listelor, sincronizarea le menține la zi; folosește etichetele de grup pentru corespondența echipelor de slujire.

Sincronizarea este **unidirecțională** (B1 → Mailchimp) și modifică doar câmpurile standard ale Mailchimp, deci nu poate intra în conflict cu câmpurile de îmbinare sau cu segmentele pe care le gestionezi în Mailchimp.

## Configurare

1. În B1Admin, mergi la **Settings → Developer → Webhooks → New Webhook**.
2. Setează **Connector Type** la **Mailchimp**.
3. Lipește **cheia API Mailchimp** și **ID-ul audienței**. Cheia este stocată criptat și nu mai este afișată după salvare.
4. Evenimentele relevante sunt preselectate; debifează-le pe cele care nu te interesează (de exemplu, lasă activate evenimentele legate de persoane, dar fără etichetele de grup).
5. Salvează. Înainte de a accepta configurarea, B1 verifică cheia și audiența în Mailchimp — o greșeală de scriere eșuează imediat, cu motivul afișat.

Folosește oricând **Send Test** pentru a verifica din nou conexiunea. Fiecare încercare de sincronizare este înregistrată în istoricul livrărilor webhook-ului, împreună cu răspunsul real al Mailchimp, iar livrările eșuate se reiau automat, cu intervale crescânde, timp de aproximativ cinci zile.

## Importul inițial

Conectorul sincronizează *modificările* de la momentul activării; nu importă retroactiv întregul tău director. Pentru ziua configurării:

1. În B1Admin, mergi la **People**, caută persoanele dorite (sau rulează o listă salvată) și apasă **Export** pentru a descărca un fișier CSV.
2. În Mailchimp, folosește **Audience → Import contacts** pentru a încărca fișierul CSV și aplică eventualele etichete în timpul importului.

Făcând încărcarea inițială prin importatorul Mailchimp, rămâi în control în privința consimțământului — importă doar persoanele care au acceptat efectiv să primească e-mailurile tale. Importul în masă al unui întreg director ca abonați activi poate încălca termenii Mailchimp și legislația anti-spam (CAN-SPAM/GDPR).

## Limite și observații

- **Sincronizare unidirecțională.** Dezabonările, respingerile (bounce) și modificările făcute în Mailchimp nu se transmit înapoi către B1. Cineva care se dezabonează în Mailchimp poate primi în continuare e-mailuri trimise direct din B1 — consideră Mailchimp drept sursa de adevăr pentru consimțământul la corespondența în masă.
- **Persoanele fără adresă de e-mail sunt ignorate** (sunt înregistrate ca atare în istoricul livrărilor), deoarece abonații Mailchimp sunt identificați după e-mail.
- **Modificarea adresei de e-mail creează un abonat nou.** Mailchimp identifică persoanele după e-mail, așa că, dacă schimbi adresa cuiva în B1, persoana este adăugată sub noua adresă; abonatul vechi rămâne până îl arhivezi în Mailchimp.
- **Se sincronizează doar câmpurile standard** — prenume, nume, telefon. Statutul de membru, campusul și câmpurile personalizate din B1 nu se mapează la câmpurile de îmbinare din Mailchimp în această versiune; folosește etichetele de listă pentru segmentare.
- **Numele etichetelor sunt numele grupurilor și listelor.** Dacă redenumești un grup sau o listă, etichetarea începe sub noul nume; vechea etichetă rămâne la abonații existenți până o elimini în Mailchimp.
- **Limitele de contacte Mailchimp se aplică în continuare** — o sincronizare care depășește plafonul unei audiențe din planul gratuit va înregistra erori `Member limit reached` în istoricul livrărilor.

## Alte rețete (Zapier / Make)

Tot ce depășește sincronizarea audienței — etichetarea donatorilor la `donation.created`, direcția inversă Mailchimp → B1 sau sincronizarea cu o altă platformă de e-mail (Constant Contact, Brevo etc.) — este disponibil în continuare prin [Zapier](../zapier) sau [Make](../make), care se declanșează la aceleași evenimente webhook:

- **Etichetarea donatorilor:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Bidirecțional:** Mailchimp *New Subscriber* → B1 *Create Person*

Dacă ai configurat anterior sincronizarea persoanelor și a grupurilor prin Zapier, dezactivează acele Zap-uri după ce activezi conectorul nativ — rularea ambelor procesează fiecare eveniment de două ori și consumă degeaba sarcinile Zapier.

## Depanare

- **Salvarea eșuează cu „Mailchimp rejected the API key”** — cheia a fost revocată sau scrisă greșit. Cheile trebuie să se termine cu un sufix de centru de date, cum ar fi `-us21`.
- **Salvarea eșuează cu „audience not found”** — ID-ul audienței nu există în contul respectiv. Copiază-l din **Audience → Settings → Audience name and defaults** (nu este numele audienței).
- **O persoană nu a apărut niciodată în Mailchimp** — verifică istoricul livrărilor webhook-ului. „Skipped: person has no email address” înseamnă exact asta; un răspuns `4xx` din partea Mailchimp arată motivul în corpul răspunsului.
- **Livrările s-au oprit complet** — după mai multe livrări epuizate, webhook-ul se dezactivează automat. Remediază cauza (de obicei o cheie revocată), reactivează-l și folosește **Send Test** pentru a confirma.

## Vezi și

- [Webhooks (referință pentru dezvoltatori)](/docs/developer/api/webhooks) — motorul de dedesubt, catalogul de evenimente, semantica livrărilor și a reîncercărilor
- [Saved Lists](/docs/b1-admin/people/lists) — audiențe bazate pe reguli, care se mapează firesc pe etichetele Mailchimp
- [Zapier (prezentare generală)](../zapier) — pentru rețete care depășesc sincronizarea audienței
