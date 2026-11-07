---
title: "Crearea formularelor"
description: "Creați formulare personalizate în B1 Admin pentru înscrieri la evenimente, sondaje și carduri de vizitator, apoi distribuiți-le prin link, cod QR sau tipărite."
---

# Crearea formularelor

<div class="article-intro">

Creați formulare personalizate pentru a colecta informații de la congregația dumneavoastră. Puteți crea formulare pentru înscrieri la evenimente, sondaje, carduri de vizitator, cereri de membru și multe altele. Formularele pot fi legate de persoane din baza de date sau folosite ca pagini independente, cu propria adresă URL publică.

</div>

## Video de instruire

<YouTube id="sr9wxEj9ghQ" title="Crearea formularelor și gestionarea trimiterilor în B1" next="Lansarea site-ului bisericii în B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Pentru formularele **Persoane** (legate de fișele persoanelor), aveți nevoie mai întâi de [persoane în baza de date](../people/adding-people.md).
- Pentru formularele care colectează **plăți**, trebuie să aveți [Stripe configurat pentru donații online](../donations/online-giving-setup.md).

</div>

## Crearea unui formular nou

1. Deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga-sus al B1 Admin), extindeți **Persoane** și faceți clic pe **Formulare**.
2. Faceți clic pe **Adaugă formular**.
3. Introduceți un **nume** pentru formular.
4. Alegeți tipul formularului din lista derulantă **Asociat cu**:
   - **Persoane** — Asociază trimiterile cu [fișele persoanelor](../people/adding-people.md) din baza de date. Formularele pentru persoane se completează din fișa unei persoane, deci nu au un link de distribuire.
   - **Independent** — Creează un formular independent, cu propria adresă URL publică, ideal pentru înscrieri externe. Doar formularele independente oferă o [fotografie de antet](#adding-a-header-photo), un [cod QR](#sharing-a-form-with-a-qr-code), un [grup legat](#linking-a-form-to-a-group) și opțiunea **Creează o fișă de persoană din trimiteri**.
5. Faceți clic pe **Salvează** pentru a crea formularul.

Noul formular va apărea în listă. Faceți clic pe el pentru a începe să adăugați întrebări.

## Tipărirea unui formular gol {#printing-a-blank-form}

Aveți nevoie de o copie pe hârtie pe care să o distribuiți — de exemplu, un card de vizitator la biroul de primire sau un formular pe care o persoană fără acces la internet îl poate completa de mână? Faceți clic pe **Tipărește** lângă un formular din lista principală a formularelor pentru a deschide o previzualizare, apoi faceți clic pe **Tipărește**. Câmpurile goale se tipăresc cu o linie sau o casetă de bifat pentru fiecare întrebare, ca oamenii să le poată completa de mână; întrebările obligatorii sunt marcate cu un asterisc. În partea de sus a paginii apare logo-ul bisericii (**Logo pentru fundal deschis** din [Site web > Aspect](../website/appearance.md), dacă ați încărcat unul), urmat de numele bisericii, iar apoi de numele formularului. Nu există alte opțiuni de tipărire — tipăriți întregul formular sau nimic.

## Distribuirea unui formular cu un cod QR {#sharing-a-form-with-a-qr-code}

Formularele independente au un link **Cod QR** lângă ele în lista principală a formularelor (formularele arhivate nu îl au). Faceți clic pe el pentru a deschide un cod QR pentru adresa URL publică a formularului, cu link-ul afișat dedesubt. Faceți clic pe **Descarcă PNG** pentru a salva codul ca imagine pe care o puteți tipări pe buletine sau afișa pe slide-uri. Oricine îl scanează deschide formularul pe telefon.

## Adăugarea întrebărilor {#adding-questions}

1. Deschideți formularul și mergeți la fila **Întrebări**.
2. Faceți clic pe **Adaugă întrebare**.
3. Selectați un **tip de câmp** din lista derulantă Provider. Tipurile disponibile includ:
   - **Casetă de text** — Pentru răspunsuri scurte
   - **Dată** — Pentru selectarea unei date
   - **E-mail** — Pentru adrese de e-mail
   - **Număr de telefon** — Pentru introducerea unui telefon
   - **Alegere multiplă** — Pentru selectarea dintr-o listă de opțiuni predefinite
   - **Plată** — Pentru colectarea plăților
4. Introduceți un **Titlu** și o **Descriere** opțională pentru întrebare. Descrierea apare sub întrebare când oamenii completează formularul, deci folosiți-o pentru indicii precum „Includeți orice alergii pe care ar trebui să le cunoaștem.”
5. Bifați **Necesită un răspuns** dacă un câmp este obligatoriu.
6. Faceți clic pe **Salvează**.
7. Repetați pentru a adăuga mai multe întrebări.

:::warning
Tipul de câmp **Plată** necesită configurarea Stripe. Dacă nu ați configurat încă donațiile online, consultați [Configurarea donațiilor online](../donations/online-giving-setup.md) înainte de a adăuga câmpuri de plată. Persoanele care plătesc pe un formular fără să se autentifice trebuie să bifeze caseta **Nu sunt robot** înainte ca cardul să fie acceptat.
:::

## Gestionarea membrilor formularului {#managing-form-members}

1. Deschideți formularul și mergeți la fila **Membri ai formularului**.
2. Căutați o persoană și adăugați-o cu un rol:
   - **Administrator** — Poate edita formularul și vedea toate trimiterile.
   - **Doar vizualizare** — Poate vedea trimiterile, dar nu poate edita formularul.

## Legarea unui formular de un grup {#linking-a-form-to-a-group}

Puteți lega orice formular independent de un grup — de exemplu, un formular de cereri de rugăciune pentru un grup mic sau o autorizație medicală pentru o excursie cu tinerii:

1. Deschideți **Detalii** ale formularului.
2. Sub **Grup legat**, selectați grupul sau lăsați opțiunea setată pe **Niciunul**.
3. Faceți clic pe **Salvează**.

Odată ce un formular este legat:

- **Membrii grupului** văd formularul într-o secțiune **Formulare** de pe pagina grupului din B1.church, cât timp formularul este deschis, cu un buton **Completează** care îl deschide (consultați [Detaliile grupului](../../b1-church/groups/group-details.md#linked-forms)).
- **Liderii grupului** văd și formularele închise și pot citi răspunsurile din fiecare trimitere și le pot tipări (una sau **Tipărește toate**). Liderii pot doar vizualiza răspunsurile — nu pot edita formularul, decât dacă sunt și [membri ai formularului](#managing-form-members).
- **În B1 Admin**, pagina grupului afișează o secțiune **Formulare legate**, cu fiecare formular legat marcat ca **Deschis** sau **Închis**. Secțiunea apare pentru liderii grupului și pentru persoanele care pot administra formularele. Consultați [Membrii grupului](../groups/group-members.md#linked-forms).

Un formular este închis când se află în afara intervalului său de disponibilitate. Formularele arhivate nu apar pe pagina grupului.

### Adăugarea automată a persoanelor care trimit formularul într-un grup {#automatically-adding-submitters-to-a-group}

Legarea unui formular de un grup nu adaugă pe nimeni în grup de la sine. Pentru a adăuga fiecare persoană care trimite formularul în lista grupului legat, activați și opțiunea **Creează o fișă de persoană din trimiteri** în detaliile formularului, apoi faceți clic pe **Salvează**.

De fiecare dată când cineva trimite formularul, persoana potrivită sau nou creată este adăugată în grup (membrii existenți ai grupului sunt omiși). Acest lucru este util, de exemplu, pentru un formular de înscriere la tabără care ar trebui să construiască automat lista grupului taberei.

### Trimiterea unui e-mail de urmărire

Cu opțiunea **Creează o fișă de persoană din trimiteri** activată, puteți trimite și un e-mail fiecărei persoane care completează formularul. Completați **Subiectul e-mailului de urmărire** și **Textul e-mailului de urmărire** în detaliile formularului. Puteți folosi atât în subiect, cât și în text etichetele `{firstName}` și `{churchName}`. E-mailul se trimite doar când ambele câmpuri sunt completate.

:::info
E-mailurile de urmărire se trimit doar după ce biserica dumneavoastră a fost aprobată să trimită e-mail de grup, iar acestea se contorizează în limita zilnică de e-mailuri a bisericii. Consultați [Activarea e-mailului de grup pentru biserica dumneavoastră](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicarea unui formular

Pentru a refolosi un formular ca punct de plecare pentru unul nou, faceți clic pe **Duplică** lângă formular în lista formularelor și confirmați. B1 creează o copie exactă a formularului — inclusiv toate întrebările — pe care o puteți redenumi și edita independent.

:::tip
Duplicarea este utilă pentru evenimente recurente la care întrebările de înscriere rămân aceleași de la un an la altul. Duplicați formularul anului trecut, actualizați numele și datele, și sunteți gata.
:::

## Configurarea proprietăților formularului

Puteți actualiza numele și setările formularului oricând. Pentru formularele independente, veți vedea și o **adresă URL publică** unică, pe care o puteți trimite oricui, împreună cu un câmp **Descriere** — text afișat deasupra întrebărilor pe pagina publică a formularului, util pentru a le spune oamenilor la ce servește formularul înainte să înceapă să-l completeze.

### Adăugarea unei fotografii de antet {#adding-a-header-photo}

Formularele independente pot afișa o **Fotografie de antet** în partea de sus a formularului. În detaliile formularului, faceți clic pe caseta fotografiei sau pe **Adaugă fotografie**, apoi alegeți sau încărcați o imagine (aceasta se decupează la un format 16:9). Faceți clic pe **Salvează**. Fotografia apare sub numele formularului, deasupra descrierii, pe pagina cu adresa URL publică a formularului și oriunde este inserat formularul cu elementul **Formular** al site-ului web. Folosiți **Schimbă fotografia** pentru a o înlocui sau **Elimină** pentru a o scoate.

Folosiți câmpul **Mesaj de mulțumire** pentru a stabili ce văd oamenii după ce trimit formularul, inclusiv pe pagina cu adresa URL publică a formularului. Dacă lăsați câmpul gol, ei văd mesajul „Vă mulțumim pentru trimiterea formularului!”

:::tip
Formularele independente sunt excelente pentru înscrieri la evenimente. Trimiteți adresa URL publică prin e-mail, pe rețelele sociale sau inserați formularul direct pe site-ul bisericii.
:::

:::info
Pentru a insera un formular pe site-ul B1, mergeți la editorul site-ului, adăugați o secțiune nouă și selectați elementul **Formular**. Apoi alegeți formularul pe care doriți să-l afișați. Consultați [Gestionarea paginilor](../website/managing-pages.md) pentru detalii despre editarea site-ului dumneavoastră.
:::
