---
title: "Gestionarea trimiterilor"
---

# Gestionarea trimiterilor

<div class="article-intro">

Odată ce formularul este activ, trimiterile vor începe să sosească. Fila **Trimiteri formular** vă permite să examinați fiecare răspuns, să urmăriți cine a trimis formularul și să folosiți datele pentru a reveni în timp util către comunitatea dumneavoastră.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- [Creați un formular](./creating-forms.md) cu cel puțin o întrebare
- Distribuiți formularul prin adresa sa publică sau încorporați-l pe [site-ul dumneavoastră web](../website/managing-pages.md)

</div>

## Vizualizarea trimiterilor

1. Deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus al B1 Admin), extindeți **People** și faceți clic pe **Forms**.
2. Faceți clic pe formularul pe care doriți să îl examinați.
3. Mergeți la fila **Trimiteri formular**.

Veți vedea o listă cu toate răspunsurile primite pentru acel formular. Fiecare trimitere afișează informațiile persoanei care a completat formularul și data trimiterii, urmate de câte o coloană pentru fiecare întrebare din formular. Dacă formularul dumneavoastră conține multe întrebări, derulați tabelul lateral pentru a vedea restul coloanelor.

## Examinarea trimiterilor individuale

Faceți clic pe orice trimitere pentru a vedea detaliile complete. Veți vedea toate răspunsurile oferite de persoană pentru fiecare întrebare din formular.

Faceți clic pe **pictograma de imprimare** de lângă trimitere pentru a imprima răspunsurile completate ale acelei persoane — util pentru un dosar fizic sau pentru un formular de consimțământ semnat pe care trebuie să îl păstrați la îndemână. Documentul imprimat afișează sigla bisericii dumneavoastră (**Light Background Logo** din [Website > Appearance](../website/appearance.md), dacă ați încărcat una) centrată în partea de sus, cu numele bisericii dedesubt. Documentele imprimate folosesc întotdeauna text închis pe fundal alb, chiar dacă utilizați B1 Admin în modul întunecat. Aceasta este o funcție diferită de [imprimarea unui formular gol](./creating-forms.md#printing-a-blank-form); se imprimă răspunsurile unei singure persoane, deja trimise, nu o copie goală. Aceeași pictogramă de imprimare apare oriunde este afișată o trimitere, inclusiv pe [profilul unei persoane](../people/adding-people.md#working-with-forms).

## Schimbarea persoanei asociate unei trimiteri

Dacă o trimitere este asociată cu persoana greșită — de exemplu, doi membri ai familiei au aceeași adresă de e-mail — o puteți muta către persoana corectă sau o puteți dezasocia.

1. În fila **Trimiteri formular**, faceți clic pe pictograma **Change person** (două săgeți) de lângă numele persoanei. Aceeași pictogramă apare lângă o trimitere și pe [profilul unei persoane](../people/adding-people.md#working-with-forms).
2. În caseta de dialog **Change person**, căutați persoana corectă și faceți clic pe **Move to this person**.
3. Sau faceți clic pe **Unlink (Anonymous)** pentru a detașa trimiterea de orice persoană. Aceasta va apărea ulterior ca **Anonymous**.

Se modifică doar legătura. Răspunsurile rămân aceleași, iar e-mailurile de confirmare nu sunt trimise din nou.

:::info
La formularele configurate să creeze un profil de persoană, atunci când cineva este autentificat pe site-ul bisericii dumneavoastră în timp ce trimite formularul, trimiterea este asociată cu propriul profil, chiar dacă o altă persoană din baza dumneavoastră de date are aceeași adresă de e-mail. Când [uniți două profiluri de persoane](../people/adding-people.md), trimiterile de formular ale persoanei eliminate sunt mutate la persoana pe care o păstrați.
:::

## Cum sunt colectate trimiterile

Trimiterile pot sosi prin mai multe canale:

- **Adresă publică** -- Dacă formularul are o adresă publică (formulare Stand Alone), oricine are linkul poate trimite un răspuns. Distribuiți adresa prin e-mail, rețele sociale sau mesaje text.
- **Încorporat pe site-ul dumneavoastră** -- Formularele încorporate pe site-ul dumneavoastră B1 colectează trimiteri automat atunci când vizitatorii le completează.
- **Utilizare internă** -- Personalul și voluntarii pot, de asemenea, să completeze formulare în numele altora direct din B1 Admin.

:::tip
Verificați regulat fila **Trimiteri formular** pentru formulare precum fișele de vizitator sau cererile de rugăciune, pentru a putea reveni prompt.
:::

## Utilizarea datelor din trimiteri

Datele colectate prin formulare vă pot ajuta să:

- Urmăriți înscrierile la evenimente și să planificați în consecință
- Reveniți către vizitatori sau membri noi
- Colectați feedback din sondaje pentru planificarea activităților pastorale
- Procesați plățile pentru evenimente sau programe

:::info
Membrii formularului cu rolurile **Admin** sau **View Only** pot accesa fila **Trimiteri formular**. Asigurați-vă că persoanele potrivite din echipa dumneavoastră au acces la formularele de care au nevoie, gestionând rolurile în fila **Form Members**.
:::

:::info
Dacă un formular Stand Alone este [asociat unui grup](./creating-forms.md#linking-a-form-to-a-group), liderii grupului pot citi și imprima trimiterile acestuia din pagina grupului de pe B1.church, fără a fi membri ai formularului. Liderii pot citi și răspunsurile la întrebările de înscriere pentru evenimentele grupului lor. Consultați [Detaliile grupului](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Dacă un formular **Stand Alone** este configurat să creeze un profil de persoană, orice trimitere potrivită cu o persoană existentă apare și în secțiunea **Forms** de pe pagina acelei persoane din People — nu doar pentru formularele de tip People.
:::

## Pașii următori

- Aflați cum să creați și să personalizați formulare în [Crearea formularelor](./creating-forms.md)
- Adăugați persoane din trimiterile de formular în [directorul de persoane](../people/adding-people.md) pentru urmărire continuă
- [Asociați un formular cu un grup](./creating-forms.md#linking-a-form-to-a-group) ca liderii săi să poată citi răspunsurile sau [adăugați automat expeditorii în grup](./creating-forms.md#automatically-adding-submitters-to-a-group), astfel încât un formular de înscriere independent să își construiască singur lista de membri
