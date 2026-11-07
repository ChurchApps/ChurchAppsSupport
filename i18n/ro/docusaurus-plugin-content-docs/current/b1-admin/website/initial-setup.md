---
title: "Primii pași cu site-ul tău B1 Admin"
sidebar_label: "Configurarea inițială"
description: "Configurează site-ul B1 Admin: indică un subdomeniu sau domeniu propriu, creează pagina principală, alege culorile, logo-ul și construiește navigarea."
---

# Configurarea inițială

<div class="article-intro">

Fiecare cont B1 vine cu un site web gata de utilizare. Acest ghid vă parcurge pașii pentru configurarea domeniului bisericii, personalizarea aspectului site-ului, crearea primelor pagini și organizarea meniului de navigare.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de un cont B1.church cu acces de administrator
- Dacă folosiți un domeniu personalizat, pregătiți datele de autentificare la furnizorul dvs. DNS (de exemplu, GoDaddy, Cloudflare sau AWS)
- Pregătiți logo-ul bisericii în format PNG, cu fundal transparent, pentru cele mai bune rezultate

</div>

## Configurarea domeniului

Biserica dvs. primește automat un subdomeniu pe B1.church (de exemplu, `yourchurch.b1.church`). Puteți, de asemenea, să indicați propriul domeniu personalizat către site-ul dvs. B1.

1. Accesați **B1.church Admin** vizitând admin.b1.church sau făcând clic pe meniul derulant al profilului dvs. și alegând **Switch App**.
2. Deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus), extindeți **Settings** și faceți clic pe **Settings**.
3. Deschideți secțiunea **Church Information** pentru a vedea subdomeniul dvs. Setați-l la ceva scurt și ușor de recunoscut, fără spații.
4. Pentru a folosi un domeniu personalizat, autentificați-vă la furnizorul dvs. DNS (cum ar fi GoDaddy, Cloudflare sau AWS) și adăugați două înregistrări:
   - O **înregistrare A** pentru domeniul dvs. principal, care indică spre `3.23.251.61`
   - O **înregistrare CNAME** pentru `www`, care indică spre `proxy.b1.church`
5. Reveniți în B1.church Admin, deschideți secțiunea **Domains** de pe aceeași pagină de setări, adăugați domeniul personalizat în listă și faceți clic pe **Add**, apoi pe **Save**. Site-ul dvs. va fi accesibil de pe domeniul personalizat în câteva minute.

:::tip
Dacă nu vedeți opțiunea Settings, rugați persoana care a configurat contul bisericii dvs. să vă acorde permisiunea „Edit Church Settings”. Pentru detalii, consultați [Roluri și permisiuni](../settings/roles-permissions.md).
:::

## Crearea primei pagini

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus), extindeți **Website** și faceți clic pe **Pages**.
2. Faceți clic pe **Add Page** în colțul din dreapta sus.
3. Alegeți **Blank** ca tip de pagină și denumiți-o „Home”.
4. Faceți clic pe **Page Settings** și setați calea URL la `/` (o linie oblică fără alt text) pentru pagina principală. Celelalte pagini folosesc `/nume-pagină`.
5. Faceți clic pe **Edit Content** pentru a începe construcția. Fiecare pagină trebuie să înceapă cu o **Section** -- acesta este containerul pentru toate celelalte elemente.
6. După adăugarea unei secțiuni, faceți clic din nou pe **Add Content** pentru a insera text, imagini, videoclipuri, carduri, formulare și altele, trăgându-le în secțiunea dvs.

:::info
Pentru instrucțiuni detaliate despre lucrul cu pagini și navigare, consultați [Gestionarea paginilor](./managing-pages.md). Pentru un ghid complet al editorului vizual, consultați [Utilizarea editorului de pagini](./page-editor.md).
:::

## Configurarea aspectului site-ului

1. În meniul Jump, alegeți **Website > Appearance**.
2. Folosiți **Color Palette** pentru a seta culorile de brand pentru tonurile principale, secundare și de accent.
3. Sub **Fonts**, alegeți fonturile pentru titluri și text din browserul de fonturi.
4. Încărcați logo-ul bisericii sub **Logo** din Style Settings. Furnizați atât o versiune pentru fundal deschis, cât și una pentru fundal închis.
5. Configurați **Site Footer** cu datele de contact și linkurile bisericii dvs.

:::info
Modificările făcute în Appearance se aplică pe întregul dvs. site web. Consultați pagina [Appearance](./appearance.md) pentru instrucțiuni detaliate despre fiecare setare.
:::

## Configurarea navigării

Linkurile de navigare apar în vizualizarea Website Pages. Pentru a le organiza:

1. Faceți clic pe **Add** pentru a crea un nou link de navigare și indicați-l către una dintre paginile dvs.
2. Trageți și plasați linkurile pentru a le reordona sau pentru a le plasa ca subelemente ale unor elemente părinte.
3. Previzualizați site-ul pentru a confirma că navigarea arată corect.

## Pașii următori

- [Gestionarea paginilor](./managing-pages.md) -- Aflați cum să lucrați cu pagini și navigare în detaliu
- [Appearance](./appearance.md) -- Ajustați fin culorile, fonturile și aspectul site-ului
- [Files](./files.md) -- Încărcați imagini și documente pentru site-ul dvs. web
