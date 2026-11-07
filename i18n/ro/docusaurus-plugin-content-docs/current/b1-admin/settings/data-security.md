---
title: "Securitatea datelor"
---

# Securitatea datelor

<div class="article-intro">

Deși nu există un sistem perfect sigur, ChurchApps ia în serios securitatea datelor. Această pagină explică măsurile luate pentru a proteja toate datele introduse în B1.church Admin și în celelalte produse ChurchApps.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Citiți această pagină pentru a înțelege cum sunt protejate datele bisericii dumneavoastră
- Configurați [Roluri și permisiuni](./roles-permissions.md) pentru a controla cine poate accesa informațiile sensibile
- Familiarizați-vă cu [politica de confidențialitate](https://churchapps.org/privacy)

</div>

## Limitarea datelor sensibile stocate

Prima noastră abordare este de a nu stoca mai multe date sensibile decât este necesar. Aceasta înseamnă că nu stocăm niciodată detaliile cardului de credit sau ale contului bancar utilizate pentru donații. Când un utilizator face o donație folosind B1.church Admin sau B1, datele cardului de credit nu sunt transmise niciodată către serverele noastre, ci doar către procesatorul dumneavoastră de plăți (Stripe). Aceasta înseamnă că, în cazul unei încălcări a securității datelor, niciun fel de informații despre cardul de credit sau despre contul bancar nu ar fi compromise.

De asemenea, nu stocăm niciodată parolele în sistemul nostru. Toate parolele sunt procesate printr-un algoritm de hashing unidirecțional, în care o parte din date este eliminată, ceea ce face imposibil ca cineva să recupereze parolele din baza de date, inclusiv noi. Pentru a verifica parolele, valoarea introdusă trebuie să treacă prin același hash unidirecțional și să producă același rezultat.

După eliminarea acestor două surse, singurele date sensibile rămase sunt o listă de nume și informații de contact.

:::tip
Deoarece ChurchApps nu stochează niciodată informații despre cardul de credit sau despre contul bancar, chiar și în cel mai grav scenariu de încălcare a securității datelor, detaliile conturilor financiare nu ar fi expuse. Doar numele și informațiile de contact ar fi în pericol.
:::

## Utilizarea celor mai bune practici standard

Folosim cele mai bune practici standard din industrie pentru securitate, inclusiv criptarea tuturor datelor în tranzit către și de la serverele noastre prin HTTPS. Toate serverele sunt găzduite într-un centru de date fizic securizat, la Amazon Web Services. Toate serverele de baze de date sunt amplasate în spatele unui firewall și sunt inaccesibile din Internet.

## Segregarea datelor

Datele sunt separate în baze de date diferite, în funcție de domeniu. Fiecare dintre API-urile noastre (Membership, Giving, Attendance, Messaging, Doing și Lessons) reprezintă silozuri independente de date, cu propriile baze de date. Dacă unul dintre ele este compromis, utilitatea datelor este limitată, fără ca și celelalte să fie compromise. De exemplu, dacă API-ul/baza de date Giving ar fi compromisă, un atacator ar putea obține acces la o listă de donații și la datele acestora (dar niciodată la datele cardurilor sau ale conturilor bancare). Totuși, nu ar avea acces la informațiile despre utilizatorii care au făcut donațiile sau despre bisericile pentru care au fost făcute, deoarece aceste date sunt stocate în baza de date separată Membership.

:::info
Segregarea datelor înseamnă că, dacă un sistem este compromis, nu se obține acces la toate datele bisericii. Fiecare API funcționează independent, cu propria bază de date, ceea ce limitează impactul oricărei posibile încălcări.
:::

## Acces limitat

Accesul la serverele de producție este strict limitat la administratorii de servere care au nevoie de acces. În prezent, sunt doi indivizi, care sunt și membri ai consiliului de administrație. Dezvoltatorii, voluntarii și ceilalți membri ai consiliului nu au permisiunea de a accesa serverele de producție.

## Politica de confidențialitate

Datele dumneavoastră vă aparțin și nu vor fi vândute niciodată unor terțe părți. Puteți citi politica noastră completă de confidențialitate [aici](https://churchapps.org/privacy).

## Conformitatea cu GDPR

ChurchApps sprijină conformitatea cu GDPR pentru bisericile cu membri în Regatul Unit sau în Uniunea Europeană. Iată cum abordăm cerințele principale:

### Drepturile persoanelor vizate

ChurchApps oferă instrumente care ajută bisericile să răspundă solicitărilor persoanelor vizate:

- **Dreptul de acces (articolul 15)** — Membrii pot solicita o copie a datelor lor personale contactându-și biserica. Administratorii pot exporta datele oricărei persoane din secțiunea **Management date** de pe pagina de detalii a persoanei din B1.church Admin.
- **Dreptul la ștergere (articolul 17)** — Membrii își pot solicita singuri ștergerea contului din pagina lor de profil (vezi [Analizarea solicitărilor de ștergere a contului](../profile/account-deletion.md)), sau contactând direct biserica. Administratorii pot, de asemenea, să anonimizeze datele unei persoane în toate modulele, din secțiunea **Management date** de pe pagina de detalii a persoanei. Anonimizarea înlocuiește informațiile personale cu valori generice, păstrând în același timp înregistrările agregate (totalurile donațiilor, numărul de prezențe) necesare pentru raportarea financiară a bisericii.
- **Dreptul la restricționarea prelucrării (articolul 18)** — Membrii pot solicita restricționarea prelucrării contactându-și biserica, inclusiv renunțând la comunicări.
- **Dreptul la portabilitatea datelor (articolul 20)** — Administratorii pot exporta datele personale într-un format JSON structurat, ușor de citit de un calculator, în numele membrilor care le solicită.

### Utilizarea instrumentelor de management al datelor

Pentru a accesa instrumentele GDPR pentru o persoană:

1. Mergeți la **Persoane** în B1 Admin și deschideți fișa persoanei.
2. Faceți clic pe **Editare** pentru a intra în modul de editare.
3. Derulați până la secțiunea **Management date** (restrânsă implicit) și faceți clic pentru a o extinde.
4. Folosiți **Exportare date** pentru a descărca un fișier JSON cu toate datele stocate pentru persoana respectivă.
5. Folosiți **Anonimizare** pentru a înlocui informațiile personale cu valori generice. Vi se va cere să scrieți `ANONYMIZE` pentru a confirma — această acțiune nu poate fi anulată.

:::warning
Anonimizarea este permanentă. Totalurile donațiilor și numărul de prezențe sunt păstrate în scopuri de raportare financiară, dar toți identificatorii personali (nume, adresă de e-mail, adresă etc.) sunt eliminați și nu pot fi recuperați.
:::

### Prelucrarea datelor

ChurchApps acționează ca **împuternicit al prelucrării** în numele bisericii dumneavoastră (**operatorul datelor**). [Acordul nostru de prelucrare a datelor](https://churchapps.org/terms) prezintă responsabilitățile fiecărei părți, inclusiv utilizarea subprocesatorilor, procedurile de notificare a încălcărilor de securitate și modul de gestionare a datelor la încetarea colaborării.

### Transferuri internaționale de date

Datele ChurchApps sunt găzduite la Amazon Web Services (AWS) în Statele Unite. Transferurile internaționale de date din Regatul Unit/UE sunt acoperite de Clauzele contractuale standard (SCC) ale AWS, în baza [Addendumului AWS privind prelucrarea datelor](https://aws.amazon.com/compliance/data-processing-addendum/). Addendumul AWS privind prelucrarea datelor este încorporat automat în Termenii de serviciu AWS pentru toți clienții. Găzduirea în UE nu este necesară atunci când sunt aplicate mecanisme adecvate de transfer, cum ar fi SCC.

Pentru detalii despre modul în care au fost evaluate riscurile transferului, consultați [Evaluarea riscurilor de transfer](./transfer-risk-assessment.md).

### Subprocesatori

- **Amazon Web Services (AWS)** — Găzduire a infrastructurii, stocare a datelor și livrare a conținutului
- **Stripe** — Procesarea plăților pentru donații (ChurchApps nu stochează date despre carduri)

:::info
Pentru detalii complete despre modul în care gestionăm datele personale, consultați [Politica noastră de confidențialitate](https://churchapps.org/privacy) și [Termenii de serviciu](https://churchapps.org/terms). Dacă aveți întrebări despre conformitatea cu GDPR, contactați-ne la support@churchapps.org.
:::
