---
title: "Articole de blog pentru site-ul tău în B1 Admin"
sidebar_label: "Blog"
description: "Creează, programează și publică articole de blog pe site-ul bisericii în B1 Admin, cu rezumate, categorii, etichete, imagini de antet și comentarii."
---

# Blog

<div class="article-intro">

Pagina Blog vă permite să publicați știri, actualizări și devoționale pe site-ul bisericii dumneavoastră. Postările apar într-o listă de carduri la `/blog`, la propriul URL și într-un flux RSS pe care alte instrumente (precum Zapier) îl pot urmări pentru postări noi.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Finalizați [Configurarea inițială](./initial-setup.md) pentru site-ul dumneavoastră
- Adăugați un link de navigare către `/blog` din [Gestionarea paginilor](./managing-pages.md) dacă doriți ca vizitatorii să vă găsească blogul din meniu

</div>

## Accesarea blogului

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus-stânga) și extindeți **Website**.
2. Faceți clic pe **Blog**.
3. Pagina Blog listează fiecare postare, împreună cu starea și data publicării sale.

## Adăugarea unei postări

1. Faceți clic pe **Add Post** în colțul din dreapta sus.
2. Introduceți un **Titlu**. O **Adresă web** (slug) prietenoasă cu URL-urile este generată automat pe măsură ce scrieți -- o puteți edita direct dacă doriți o adresă diferită.
3. Adăugați un **Rezumat** -- o scurtă descriere afișată în lista de postări, în meta descrieri și în fluxul RSS. Dacă îl lăsați gol, unul este generat automat din începutul conținutului postării.
4. Scrieți corpul postării în editorul **Conținut**, folosind Markdown. Faceți clic pe **Previzualizare** pentru a vedea cum va arăta postarea formatată.
5. Alegeți o **Categorie** (selectați una existentă sau scrieți una nouă) și, opțional, **Etichete** separate prin virgulă.
6. Faceți clic pe **Selectați imaginea** pentru a alege o fotografie din galeria dumneavoastră de [Fișiere](./files.md) sau încărcați una nouă. Fotografiile încărcate se deschid într-un instrument integrat de decupare, blocat la raportul 16:9, astfel încât să puteți încadra orice fotografie pentru a se potrivi antetului postării și cardurilor din listă.
7. Setați **Autorul** -- implicit este dumneavoastră, dar puteți căuta și selecta orice persoană din baza de date.
8. Activați **Publicat** și setați o **Data publicării** atunci când sunteți gata să faceți postarea publică. Lăsați-l dezactivat pentru a salva postarea ca ciornă.

:::tip
Setați o **Data publicării** în viitor pentru a programa o postare. Aceasta rămâne ascunsă vizitatorilor și afișează un cip **Programată** în lista Blog până când sosește acea dată.
:::

## Stările postărilor

Fiecare postare din listă afișează una dintre cele trei stări:

- **Ciornă** -- Nepublicată. Vizibilă doar în administrare.
- **Programată** -- Opțiunea Publicat este activată, dar data publicării este în viitor.
- **Publicată** -- Live pe site-ul dumneavoastră și inclusă în fluxul RSS.

## Editarea, previzualizarea și ștergerea postărilor

- Faceți clic pe **Edit** lângă o postare pentru a face modificări.
- Faceți clic pe **View on Site** (afișat la postările publicate) pentru a deschide postarea live pe site-ul dumneavoastră, într-un tab nou.
- Faceți clic pe **Delete** pentru a elimina definitiv o postare.

## Cum văd vizitatorii blogul dumneavoastră

Postările publicate apar la `{yoursite}/blog`, câte 10 pe pagină, cu linkurile **Older**/**Newer** pentru a parcurge arhiva, împreună cu un filtru după categorie și cu semnătura și fotografia fiecărei postări. Etichetele se afișează și ele ca cipuri pe care se poate face clic, permițând vizitatorilor să filtreze lista după etichetă în același mod. Postările individuale se află la `{yoursite}/blog/{slug}` și includ postări conexe din aceeași categorie. Pagina blogului publică și un flux RSS, detectabil automat de cititoarele de fluxuri și de instrumentele de automatizare precum Zapier.

:::info
Postările de blog reprezintă un tip de conținut separat de paginile obișnuite ale site-ului -- ele nu se creează în [editorul de pagini](./page-editor.md) și nu apar în lista Pagini. Acest lucru face ca redactarea blogului să fie rapidă și concentrată pe scriere.
:::

## Adăugarea comentariilor sub postări

B1 nu găzduiește el însuși comentarii pentru blog, dar puteți adăuga un serviciu de comentarii. Puteți pune sub fiecare postare și orice altceva, cum ar fi un formular de abonare la buletin informativ sau un buton de donații.

1. Creați un cont la un serviciu de comentarii precum [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) sau [Disqus](https://disqus.com) și copiați codul său de încorporare.
2. Pe pagina Blog, derulați până la **Below Every Post**.
3. Lipiți codul de încorporare și faceți clic pe **Save**.

Codul apare sub conținutul fiecărei postări publicate. Serviciul dumneavoastră de comentarii se ocupă de moderare și de filtrarea spamului, așa că verificați-i panoul de control periodic.

:::tip
Goliți caseta și faceți clic pe **Save** pentru a elimina codul din fiecare postare. Doar persoanele care pot edita setările bisericii văd această casetă.
:::

## Pașii următori

- [Gestionarea paginilor](./managing-pages.md) -- Adăugați un link de navigare către blogul dumneavoastră
- [Fișiere](./files.md) -- Încărcați fotografii pentru a le folosi în postările dumneavoastră
- [Integrarea Zapier](../integrations/zapier.md) -- Declanșați automatizări atunci când sunt publicate postări noi
