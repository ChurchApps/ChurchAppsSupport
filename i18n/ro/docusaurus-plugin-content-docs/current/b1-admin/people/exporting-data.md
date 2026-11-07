---
title: "Exportarea datelor"
---

# Exportarea datelor

<div class="article-intro">

B1 Admin vă permite să exportați datele bisericii, ca să le puteți folosi în foi de calcul, să le trimiteți echipei sau să faceți o copie de rezervă. Fie că aveți nevoie de o listă rapidă cu nume și adrese de e-mail, fie de o exportare completă a bazei de date, există opțiuni potrivite pentru nevoile dumneavoastră.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de un cont activ B1 Admin cu permisiunea de a vizualiza datele pe care doriți să le exportați. Consultați [Roluri și permisiuni](roles-permissions.md) dacă nu sunteți sigur de nivelul dumneavoastră de acces.
- Pentru o exportare completă a bazei de date, aveți nevoie de acces la zona **Setări**.

</div>

## Exportarea din pagina Persoane

Cea mai rapidă modalitate de a exporta lista de contacte este direct din pagina **Persoane**:

1. Deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus al B1 Admin), extindeți **Persoane** și faceți clic pe **Persoane**.
2. Folosiți bara de căutare sau filtrele pentru a restrânge rezultatele pe care doriți să le exportați (sau lăsați-le nefiltrate pentru a exporta toate persoanele). Consultați [Căutarea persoanelor](searching-people.md) pentru sfaturi despre filtrare.
3. Faceți clic pe butonul **Export** din antetul paginii Persoane.
4. Un fișier CSV se va descărca pe computerul dumneavoastră, cu persoanele din rezultatele curente, inclusiv numele, datele de contact, adresa și alte câmpuri standard.

:::tip
Exportul include toate persoanele din rezultatele curente. Efectuați mai întâi o căutare, încărcați o [Listă salvată](./lists.md) sau folosiți căutarea **Avansată** pentru a exporta doar persoanele de care aveți nevoie.
:::

## Exportarea completă a datelor din Setări

Pentru o exportare completă a tuturor datelor dumneavoastră din B1 (nu doar a persoanelor), folosiți instrumentul de export din Setări:

1. În meniul Jump, alegeți **Setări > Setări**.
2. Faceți clic pe linkul **Import/Export** de sub numele bisericii dumneavoastră, din partea de sus a meniului lateral de setări.
3. Selectați **Bază de date B1** din lista derulantă **Sursa datelor**.
4. Verificați previzualizarea datelor și faceți clic pe **Continuă către destinație**.
5. Selectați **Arhivă ZIP B1 Export** ca destinație a exportului.
6. Urmăriți progresul exportului până când toate elementele afișează bifele verzi.
7. Fișierul de export se va descărca automat. Căutați fișierul `B1Export` în folderul de descărcări.
8. Dezarhivați fișierul pentru a accesa fișierele CSV individuale (cum ar fi `people.csv`), pe care le puteți deschide în Excel, Google Sheets sau Numbers.

:::info
Arhiva ZIP B1 Export este o copie de rezervă completă a datelor bisericii dumneavoastră. Aceasta conține:

- persoane (cu fotografii) și gospodării, inclusiv persoanele de contact pentru ridicarea copiilor
- campusuri, servicii și orele serviciilor
- grupuri și membrii grupurilor
- fonduri și donații, inclusiv contribuțiile repartizate pe mai multe fonduri
- prezență
- formulare, întrebări, trimiteri și răspunsuri
- câmpuri personalizate și valorile lor
- liste salvate de persoane

Dacă o fotografie a unei persoane nu poate fi descărcată sau citită în timpul exportului, fotografia respectivă este omisă, iar exportul continuă fără ea.

Pentru a restaura datele, alegeți **Arhivă ZIP B1 Import** drept sursă și **Bază de date B1** drept destinație (consultați [Importarea datelor](./importing-data.md)). Gospodăriile, persoanele de contact pentru ridicare și listele salvate sunt reconstruite împreună cu persoanele. Filtrele listelor salvate sunt redirecționate către grupurile, fondurile, campusurile și câmpurile personalizate restaurate.
:::

## Exportarea datelor grupurilor

Puteți exporta și listele de membri pentru grupuri individuale. Din pagina **Grupuri**, deschideți un grup și faceți clic pe **pictograma de descărcare** pentru a exporta lista membrilor grupului respectiv. Consultați [Membrii grupului](../groups/group-members.md) pentru mai multe detalii.

:::info
Fișierele CSV exportate funcționează cu toate aplicațiile majore de foi de calcul, inclusiv Microsoft Excel, Google Sheets și Apple Numbers.
:::
