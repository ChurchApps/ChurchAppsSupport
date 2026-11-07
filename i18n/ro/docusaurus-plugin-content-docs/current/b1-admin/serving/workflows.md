---
title: "Fluxuri de lucru"
---

# Fluxuri de lucru

<div class="article-intro">

Fluxurile de lucru deplasează persoanele printr-o serie de etape pe o tablă vizuală. Fiecare persoană devine un card care trece de la o etapă la următoarea: de la urmărirea unui vizitator pentru prima dată, până la un proces de înscriere ca membru, la mulțumirea adresată unui donator pentru prima dată și la orice alt caz în care trebuie să urmărești mulți oameni prin aceleași etape. O etapă poate cere unui voluntar să facă ceva (să sune, să poarte o discuție) **și** poate rula singură acțiuni automate, cum ar fi trimiterea unui e-mail sau a unui mesaj text, așteptarea câtorva zile sau adăugarea persoanei într-un grup. Astfel, fluxurile de lucru acoperă atât urmărirea făcută de oameni, cât și activitățile de rutină din jurul ei. Fluxurile de lucru extind [Sarcinile](./tasks.md) într-o tablă Kanban cu drag-and-drop, ca nimeni și nimic să nu scape printre degete.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Asigură-te că persoanele pe care vrei să le urmărești există în B1 Admin
- Familiarizează-te cu modul în care funcționează [Sarcinile](./tasks.md), deoarece fiecare card de pe o tablă este o sarcină
- Pentru a folosi acțiunea **Trimite e-mail**, creează mai întâi șabloanele de e-mail pe care vrei să le trimiți (acestea se gestionează la **Setări → Șabloane de e-mail**)
- Pentru a folosi acțiunea **Trimite mesaj text**, conectează mai întâi un [furnizor de mesaje text](../settings/church-settings.md#texting)
- Vei avea nevoie de permisiunea potrivită pentru Sarcini. Vizualizarea, editarea cardurilor și gestionarea fluxurilor de lucru sunt niveluri de permisiune separate (vezi [Roluri și permisiuni](../settings/roles-permissions.md))

</div>

## Vizualizarea fluxurilor de lucru

Deschide [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus al B1 Admin), extinde **Servire** și apasă pe **Fluxuri de lucru**. Fluxurile tale sunt listate într-un tabel care arată **Categoria** și **Starea** fiecăruia (**Activ** sau **Inactiv**). Dacă folosești categorii, filele de deasupra listei te lasă să o filtrezi după categorie. Apasă pe orice flux pentru a-i deschide tabla.

## Crearea unui flux de lucru

1. Pe pagina Fluxurilor de lucru, apasă **Adaugă flux de lucru**.
2. Alege cum vrei să începi:
   - **Flux gol**: începe de la zero și construiește-ți propriile etape.
   - **Din șablon**: începe cu un set gata făcut de etape pe care le poți edita. Șabloanele integrate includ:
     - **Urmărirea unui vizitator nou**: Trimite e-mail de bun venit → Apel telefonic personal → Invitație la pasul următor → Conectat
     - **Clasa de membru**: Exprimă interesul → Înscriere la clasă → Participă la clasă → Finalizează înscrierea ca membru
     - **Mulțumire pentru prima donație**: Trimite bilet de mulțumire → Împărtășește impactul donației → Administrat
     - **Confirmarea unei atribuiri de serviciu**: Solicită și așteaptă răspunsul → Sună voluntarul despre solicitarea fără răspuns (vezi [Confirmările atribuirilor de serviciu](#serving-assignment-confirmations))

   Construirea etapelor unui șablon poate dura puțin. Cât timp lucrează, butonul **Adaugă flux de lucru** afișează **Se creează...** și nu mai poate fi apăsat din nou, deci nu vei ajunge cu un duplicat. Dacă ceva nu merge, pagina afișează *„Fluxul de lucru nu a putut fi creat. Te rugăm să încerci din nou.”*
3. Dă fluxului un **Nume**.
4. Opțional, atribuie o **Categorie** pentru a grupa fluxurile înrudite. Poți crea o categorie nouă direct din meniul derulant.
   Pentru un flux gol, alegi și **Scopul fluxului**: **Urmărirea persoanelor** (cel obișnuit) sau **Confirmarea atribuirii de serviciu**. Scopul nu poate fi schimbat după crearea fluxului.
5. Lasă fluxul **Activ**, ca persoanele să poată fi adăugate în el, sau setează-l **Inactiv** pentru a-l ascunde din listele de adăugare în flux.
6. Apasă **Salvează**.

:::tip
Folosește butonul **Duplică** din lista Fluxurilor de lucru pentru a copia un flux existent, inclusiv etapele, acțiunile automate și rutarea, ca punct de plecare pentru unul nou.
:::

## Construirea tablei cu etape

Fiecare tablă de flux este formată din **etape**, afișate ca coloane de la stânga la dreapta. Deschide un flux și folosește **Adaugă etapă** pentru a crea fiecare stadiu al procesului tău.

Când adaugi sau editezi o etapă, poți configura:

- **Numele etapei**: titlul coloanei (de exemplu, „Apel de bun venit” sau „În așteptarea înscrierii”).
- **Scadent în (zile)**: setează automat o dată scadentă când un card intră în această etapă. Cardurile care au depășit data scadentă sunt marcate ca **Întârziat**.
- **Responsabil implicit**: persoana sau grupul căruia îi sunt atribuite automat cardurile noi din această etapă. Când responsabilul implicit este o persoană, aceasta primește o notificare că i s-a atribuit un card.
- **Acțiuni automate**: lucruri pe care sistemul le face singur când sosește un card (vezi mai jos).
- **Rutare**: unde merge cardul când părăsește etapa (vezi [Rutarea](#routing-cards-with-outcomes-and-conditions)).

Trage coloanele etapelor în ordinea care corespunde procesului tău. Ordinea definește și traseul implicit pe care îl urmează un card când nicio altă rutare nu se aplică.

:::info
Salvează mai întâi o etapă nouă. Acțiunile automate și rutarea se atașează etapei, deci editorul deblochează aceste secțiuni doar după ce etapa există.
:::

## Acțiuni automate

Fiecare etapă poate avea o listă de **acțiuni automate** care rulează singure în momentul în care un card **intră** în etapă, înainte ca cineva să se atingă de el. Așa, o etapă poate atât să îndemne un voluntar, cât și să se ocupe de activitatea de rutină din jurul urmăririi.

În editorul etapei, deschide **Acțiuni automate**, apasă **Adaugă acțiune**, alege un tip și completează setările. Adaugă câte ai nevoie; ele rulează **de sus în jos, în ordine**. Apasă **Salvează** pe etapă pentru a salva etapa și toate acțiunile ei împreună. Eliminarea unei acțiuni, cu pictograma de coș de gunoi, are efect imediat.

| Acțiune | Ce face |
|---|---|
| **Trimite e-mail** | Trimite persoanei un șablon de e-mail ales de tine. Poți înlocui subiectul. |
| **Trimite mesaj text** | Trimite persoanei un mesaj scris de tine, prin [furnizorul de mesaje text](../settings/church-settings.md#texting) al bisericii tale. |
| **Așteaptă** | Oprește cardul pentru un număr de zile înainte de a continua (vezi mai jos). |
| **Adaugă în grup** | Adaugă persoana într-un [grup](../groups/index.md) ales. |
| **Elimină din grup** | Scoate persoana dintr-un grup ales. |
| **Înregistrează prezența** | Marchează persoana ca prezentă la un moment de serviciu al grupului, aflat în desfășurare (vezi mai jos). |
| **Adaugă în flux de lucru** | Pornește persoana într-un alt flux de lucru, util pentru predarea între procese. |
| **Adaugă notă** | Înregistrează o notă în istoricul cardului. |
| **Setează câmp** | Actualizează un câmp din fișa persoanei: Starea de membru, Starea civilă, Genul, Orașul, Statul, sau Codul poștal. |
| **Webhook** | Trimite detaliile cardului către o adresă web externă (URL) pe care o furnizezi, pentru conectarea cu alte sisteme. |
| **Creează sarcină** | Creează o [sarcină](./tasks.md) cu titlul și descrierea introduse, atribuită persoanei alese. |
| **Notifică persoana** | Trimite unui membru al personalului sau unui voluntar ales un e-mail și o notificare B1 despre card (vezi mai jos). |

După ce toate acțiunile unei etape se termină, cardul **rămâne pe acea etapă**, ca o persoană să se ocupe de el, cu excepția cazului în care etapa are o rutare automată care îl mută mai departe (vezi [Etapele complet automatizate](#fully-automated-steps)).

:::info
Acțiunile automate rulează doar când un card sosește pe calea obișnuită: când este adăugat prima dată, când un rezultat sau o rutare automată îl aduce, sau după ce o Așteptare se termină. Ele **nu** se re-execută când un membru al personalului trage manual un card pe etapă sau îl trimite înapoi, astfel încât o persoană nu primește același e-mail de două ori.
:::

### Trimiterea e-mailurilor

Alege **Trimite e-mail**, selectează unul dintre șabloanele tale de e-mail și, opțional, scrie un subiect personalizat. Când un card intră în etapă, persoana primește e-mailul automat. (Dacă persoana nu are o adresă de e-mail înregistrată, etapa pur și simplu sare peste această acțiune.) [Câmpurile de îmbinare](../settings/email-templates.md#merge-fields) din șablon, precum `{{firstName}}`, sunt completate cu datele proprii ale persoanei.

Când e-mailul pleacă, istoricul cardului înregistrează **E-mail trimis**. Dacă nu poate fi trimis, de exemplu pentru că e-mailul bisericii tale nu a fost încă aprobat sau s-a atins limita zilnică, nu se adaugă nicio intrare „E-mail trimis”.

:::info
E-mailurile din fluxurile de lucru pleacă doar după ce biserica ta a fost aprobată să trimită e-mailuri de grup, iar ele se numără la limita zilnică de e-mailuri a bisericii. Vezi [Activarea e-mailului de grup pentru biserica ta](../groups/group-members.md#turning-on-group-email-for-your-church). Acțiunea **Trimite e-mail** te avertizează în editorul etapei când aceste e-mailuri nu vor pleca: *„E-mailul bisericii tale nu a fost încă aprobat...”* dacă aprobarea este în așteptare, sau *„E-mailul bisericii tale este suspendat...”* dacă mesajele recente au fost returnate sau raportate ca spam.
:::

### Înregistrarea prezenței

Alege **Înregistrează prezența** și apasă **Alege grupul** pentru a selecta grupul a cărui prezență trebuie înregistrată. Când acțiunea rulează, persoana este marcată prezentă la momentul de serviciu al grupului aflat în desfășurare, exact ca și cum s-ar fi înregistrat singură la intrare. Acest lucru este util împreună cu un declanșator care adaugă persoanele în flux pe măsură ce sosesc, astfel încât să fie numărate fără o înregistrare separată.

- Prezența se măsoară în momentul în care cardul a fost **creat**, deci o **Așteptare** anterioară din flux nu o va împinge după terminarea serviciului.
- Sunt luate în calcul doar momentele de serviciu care au o zi și o oră de începere. Dacă niciun moment de serviciu al grupului nu este în desfășurare în acel moment, nu se înregistrează nimic, iar istoricul cardului notează **Niciun serviciu programat în desfășurare: prezența nu a fost înregistrată**.
- Când prezența este înregistrată, istoricul cardului arată **Prezență înregistrată**, urmat de numele grupului. Rularea din nou a acțiunii pentru același serviciu nu numără persoana de două ori.

### Notificarea unei persoane

Alege **Notifică persoana**, apasă **Alege persoana** și, opțional, scrie un **Mesaj**. Când un card intră în etapă, persoana aleasă primește un e-mail și o notificare B1 cu numele persoanei de pe card, numele fluxului și al etapei, mesajul tău și un link pentru a deschide cardul. Folosește-o pentru a-i da unui membru al personalului sau unui lider de slujire un semnal de avertizare, de exemplu: *„Anunță pastorul când cineva ajunge la etapa Interviul pentru membru.”* Istoricul cardului înregistrează **Notificat**, urmat de numele persoanei.

### Trimiterea unui mesaj text

Alege **Trimite mesaj text** și scrie **Mesajul text** (până la 1.600 de caractere). Când un card intră în etapă, persoana primește mesajul pe telefonul mobil. Pentru a personaliza mesajul, apasă pe un element de sub caseta mesajului (**Prenume**, **Nume**, **Nume afișat** sau **Numele bisericii**) pentru a insera `{{firstName}}`, `{{lastName}}`, `{{displayName}}` sau `{{churchName}}` la cursor. Fiecare dintre acestea este completat cu datele persoanei când mesajul este trimis.

- Dacă persoana nu are un telefon mobil înregistrat, nu se trimite niciun mesaj, iar istoricul cardului notează **Mesaj text omis: nu există telefon mobil**.
- Dacă persoana s-a dezabonat, nu se trimite niciun mesaj, iar istoricul cardului notează **Mesaj text omis: dezabonat**.
- Când mesajul pleacă, istoricul cardului înregistrează **Mesaj text trimis**. Dacă trimiterea eșuează, de exemplu pentru că niciun furnizor de mesaje text nu este conectat sau biserica ta a rămas fără credite pentru mesaje, eșecul este consemnat în istoricul cardului, iar celelalte acțiuni rămase din etapă rulează în continuare.

:::warning
Mesajele text sunt trimise prin propriul [furnizor de mesaje text](../settings/church-settings.md#texting) al bisericii tale. Dacă nu este conectat niciun furnizor, editorul de acțiuni avertizează *„Nu este configurat niciun furnizor de mesaje text”*, iar mesajele nu vor fi trimise.
:::

### Așteptarea câtorva zile (secvențe de tip picurare)

Acțiunea **Așteaptă** ține cardul pentru numărul de zile pe care îl setezi. Cât timp așteaptă, cardul apare ca **Amânat**. B1 verifică la fiecare 30 de minute dacă s-au încheiat așteptările, deci un card își reia cursul în aproximativ o jumătate de oră de la terminarea așteptării. Când așteptarea s-a încheiat:

1. Rulează **toate acțiunile rămase de pe aceeași etapă**, astfel încât poți construi o secvență de tip picurare, precum **Trimite e-mail → Așteaptă 3 zile → Trimite un e-mail de reamintire**.
2. Apoi, dacă etapa are o rutare automată, cardul trece mai departe; altfel rămâne pe etapă, pentru ca o persoană să se ocupe de el.

:::tip
O **Așteptare** la începutul unei etape este un mod simplu de a „ține” un card înainte ca el să ajungă la un voluntar, de exemplu *Așteaptă 7 zile, apoi un coach ia legătura*.
:::

## Adăugarea persoanelor ca carduri

Există mai multe moduri de a pune persoane pe o tablă:

- **Din tablă**: apasă **Adaugă card** în partea de jos a unei coloane de etapă și alege o persoană. Poți alege și un grup, iar fiecare membru al grupului este adăugat ca un card.
- **Din fișa unei persoane**: folosește **Adaugă în flux de lucru** de pe pagina unei persoane pentru a o plasa într-un flux.
- **Din căutarea Persoanelor**: selectează mai multe persoane și folosește acțiunea în masă **Adaugă în flux de lucru** pentru a le adăuga pe toate deodată.
- **Automat, cu un declanșator**: adaugă persoane când se întâmplă ceva, cum ar fi trimiterea unui formular sau un prim cadou (vezi [Declanșatorii](#triggers) de mai jos).

Adăugarea unei persoane manual sau printr-o acțiune de etapă **Adaugă în flux de lucru** nu îi creează niciodată un al doilea card deschis în același flux. Dacă are deja un card deschis, este omisă (la o adăugare în masă, doar persoanele fără card primesc unul nou). Odată ce cardul lor este închis, le poți adăuga din nou. Declanșatorii urmează în schimb propria setare **O singură dată per persoană**.

## Lucrul pe tablă

Deschide un flux pentru a-i vedea tabla. Fiecare card arată numele persoanei, cui este atribuit și un indicator de dată scadentă sau de stare (**Întârziat** sau **Amânat**). O coloană de etapă afișează și mici insigne pentru acțiunile automate pe care le rulează și adnotări pentru rutarea sa, oferindu-ți o hartă rapidă a modului în care circulă cardurile.

- **Mută un card**: trage un card dintr-o coloană în următoarea pe măsură ce persoana avansează.
- **Deschide un card**: fă dublu clic pe un card (sau apasă pe el) pentru a-i deschide sertarul de detalii, unde poți schimba etapa, reatribui cardul, adăuga note și verifica ce s-a întâmplat deja.

Din sertarul cardului poți:

- **Atribui** cardul altei persoane sau altui grup.
- **Amâna** cardul cu 1 zi, 3 zile sau 1 săptămână, pentru a-i ascunde temporar data scadentă.
- **Trimite înapoi** la etapa anterioară sau **Sări** la etapa următoare.
- **Fixează atribuirea**: păstrează același responsabil pe card chiar și când trece între etape. Implicit, mutarea unui card pe o etapă nouă îl reatribuie responsabilului implicit al etapei. Fixarea păstrează persoana curentă responsabilă pe tot parcursul.
- **Finalizează** cardul sau alege un buton de **Rezultat**, dacă etapa are rezultate configurate (vezi [Rutarea](#routing-cards-with-outcomes-and-conditions)).
- **Elimină cardul**: scoate un card de pe tablă fără a-l finaliza, de exemplu când cineva a fost adăugat din greșeală. După confirmare, cardul este închis și scos de pe lista tuturor. Nu rulează niciun rezultat, nicio rutare sau nicio acțiune de etapă, iar istoricul său se păstrează cu o intrare **Eliminat**. Pentru un card de [confirmare a atribuirii de serviciu](#serving-assignment-confirmations), eliminarea lui închide solicitarea în același mod.
- **Adaugă note** și verifică **Activitatea** cardului, un jurnal al acțiunilor automate care au rulat (e-mailuri trimise, așteptări etc.), fiecare cu data și ora la care s-a produs.

Pentru un card despre o persoană, sertarul afișează și telefonul mobil și adresa de e-mail ale persoanei, ca linkuri pe care le poți apăsa pentru a suna sau a trimite un e-mail, plus un link **Vezi profilul** dacă ai permisiunea de a vedea persoane. Persoana căreia i-a fost atribuit cardul vede telefonul și e-mailul chiar și fără acces la Persoane.

Notele se salvează împreună cu cardul. Oricine poate deschide cardul, inclusiv persoana sau grupul căruia îi este atribuit, poate citi notele și poate adăuga propriile note. Cei care nu pot deschide cardul nu văd notele lui.

### Acțiuni în masă

Bifează căsuțele de pe mai multe carduri pentru a acționa asupra lor împreună. Pentru a selecta deodată toate cardurile dintr-o etapă, bifează căsuța **Selectează tot** din antetul coloanei acelei etape; bifeaz-o din nou pentru a le deselecta. Apare o bară de instrumente care îți permite să **Finalizezi**, **Amânezi**, **Atribui** (reatribui) sau **Muți la…** o altă etapă pentru toate cardurile selectate deodată.

## Rutarea cardurilor cu rezultate și condiții

Rutarea controlează unde merge un card când părăsește o etapă. Deschide editorul unei etape pentru a configura două tipuri de rutare.

### Butoanele de rezultat

Rezultatele sunt butoane afișate în sertarul cardului când finalizezi un card pe acea etapă. În loc de un singur buton **Finalizează**, poți oferi alegeri precum „S-a alăturat unui grup” sau „Nu este interesat”. Fiecare rezultat poate:

- Trimite cardul la **o altă etapă** din acest flux,
- **Preda cardul** unui alt flux de lucru în întregime, sau
- **Închide** cardul.

Astfel, o singură decizie poate ramifica persoana pe trasee diferite.

### Rutarea automată (condiționată)

Rutele automate mută un card mai departe **în momentul în care intră într-o etapă** (și după ce acțiunile automate s-au încheiat), fără ca cineva să apese ceva, dacă persoana se potrivește cu un set de condiții. Adaugă o rută, alege etapa țintă și definește una sau mai multe **condiții** (de exemplu, campusul, vârsta sau starea de membru a unei persoane). Câmpurile text pot fi potrivite exact sau cu **conține**, **începe cu** sau **se termină cu**. O rută fără condiții se potrivește cu toată lumea.

Condițiile de dată (Data de azi, Data nașterii sau Data aniversării) pot compara data completă sau doar o parte din ea: ziua săptămânii, **Ziua din lună**, **Luna** sau anii scurși. Pentru Data nașterii sau Data aniversării unei persoane, **Ziua din lună** oferă opțiunea relativă **Azi**, astfel încât o condiție precum *Data nașterii · Ziua din lună = Azi* se potrivește persoanelor a căror zi de naștere cade în ziua de azi a lunii. **Luna** oferă **Luna precedentă**, **Luna curentă** și **Luna următoare**. Valorile relative de acest fel sunt calculate după fusul orar al bisericii tale, deci se aliniază cu ziua din calendarul bisericii tale, nu cu cea a serverului.

Grupul de condiții **Donații** include **Donator regulat inactiv**, care găsește persoanele care dădeau regulat și apoi au încetat. Setează trei numere: *A donat în cel puțin* **3** *din ultimele* **12** *săptămâni, apoi nimic în ultimele* **3** *săptămâni* (acestea sunt valorile implicite). Săptămânile se numără înapoi de la data de azi, în fusul orar al bisericii tale, iar un cadou rambursat nu se socotește. Este cel mai util pe un [declanșator programat](#schedule-triggers), de exemplu o regulă săptămânală care adaugă donatorii inactivi pe o tablă de urmărire pastorală. Condiția se uită doar la datele donațiilor, niciodată la sume, iar cardurile și alertele nu afișează niciodată sume. Deoarece dezvăluie cine a încetat să doneze, această opțiune este vizibilă și poate fi adăugată, modificată sau eliminată doar de persoanele care pot vedea donațiile.

Dacă condițiile unei rute nu pot fi verificate dintr-un anumit motiv, ruta este considerată ca neconcordantă. Cardul rămâne pe etapă (sau urmează o altă rută care se potrivește), în loc să rămână blocat.

:::info
Pe tablă, fiecare coloană de etapă afișează mici adnotări care descriu rutarea, de exemplu o etichetă de rezultat sau „dacă se potrivește”, urmată de o săgeată către etapa sau fluxul de destinație.
:::

## Etapele complet automatizate

Poți face ca o etapă să ruleze în întregime singură, fără ca cineva să se ocupe de ea. Dă etapei **acțiunile automate** și adaugă o **rută automată** (fără condiții) care indică etapa următoare. Când un card intră, acțiunile rulează, iar apoi ruta îl avansează imediat, deci cardul trece direct mai departe.

:::tip
Combină aceasta cu **Așteptare**: *Trimite e-mail de bun venit → Așteaptă 3 zile → avansează automat la etapa „Apel personal”.* E-mailul și momentul sunt gestionate pentru tine, iar un voluntar vede cardul doar când a sosit momentul pentru contactul uman.
:::

## Declanșatori

Declanșatorii adaugă automat persoane într-un flux când se întâmplă ceva, astfel încât nu trebuie să adaugi niciodată cardurile manual. Pe tabla unui flux, apasă pe fila **Declanșatori**, apoi pe **Adaugă declanșator**. Există două tipuri:

### Declanșatori de eveniment

Se activează imediat ce o înregistrare se schimbă în B1. Alege evenimentul și, opțional, adaugă **condiții**, astfel încât să fie adăugate doar persoanele care se potrivesc:

- **Persoană · Creată / Actualizată**: de exemplu, adaugă pe oricine a cărui stare devine *Vizitator* sau *Oaspete* (starea acordată persoanelor care se înregistrează singure).
- **Donație · Creată**: de exemplu, adaugă o donație pentru prima dată sau una mare pe un flux de mulțumire (potrivește după sumă, fond sau metodă).
- **Grup · Membru s-a alăturat** / **Grup · Creat**.
- **Formular · Trimis**: adaugă pe oricine trimite un formular ales (excelent pentru un card „Sunt nou” sau „Conectare”).

### Declanșatori programați

Rulează periodic, zilnic, săptămânal, lunar sau anual, pe baza unui set de condiții. Folosește-i pentru contactul în funcție de timp, precum *toți cei a căror zi de naștere este azi* (Data nașterii · Ziua din lună = **Azi**, cu luna potrivită cu **Luna curentă**) sau o verificare *lunară*. Chiar fără **O singură dată per persoană**, un declanșator programat nu adaugă din nou aceeași persoană în aceeași perioadă de repetare (o zi, o săptămână, o lună sau un an, în funcție de frecvența de rulare).

Pentru orice declanșator poți seta și:

- **Etapa de start** pe care ajunge noul card (implicit prima etapă).
- **O singură dată per persoană**, astfel încât aceeași persoană să nu fie adăugată de două ori în flux de declanșator. Cu această opțiune activă, oricine are deja un card pe acest flux este omis.
  - **Adaugă din nou după închiderea cardului**: apare când **O singură dată per persoană** este activă. Bifeaz-o pentru a permite declanșatorului să adauge din nou o persoană după ce cardul ei anterior din acest flux a fost închis. O persoană nu va avea niciodată două carduri deschise simultan pe același flux. Folosește-o pentru lucruri care se pot întâmpla de mai multe ori, precum un oaspete care revine sau un proces anual.
- **Activ**: pornește sau oprește declanșatorul fără a-l șterge.

:::tip
Asociază un declanșator **Formular · Trimis** cu șablonul **Urmărirea unui vizitator nou** pentru a transforma formularul tău „Cardul de conectare” sau „Sunt nou” într-un proces automat de urmărire.
:::

## Confirmările atribuirilor de serviciu

Un tip special de flux poate urmări [solicitările de servire](./plans.md#assigning-team-members) până când fiecare voluntar acceptă sau refuză. În loc de persoane, fiecare card de pe această tablă urmărește **o atribuire**: o persoană într-o poziție, pentru un plan. Două roluri sau două servicii pentru aceeași persoană primesc carduri separate. Este opțional: nimic nu se schimbă pentru un plan până nu selectezi un flux de confirmare în setările sale.

### Configurarea

1. Pe pagina Fluxurilor de lucru, apasă **Adaugă flux de lucru** și alege șablonul **Confirmarea atribuirii de serviciu**. (Sau începe cu un **Flux gol** și setează **Scopul fluxului** la **Confirmarea atribuirii de serviciu**.) Crearea din șablon necesită permisiunea de a trimite mesaje text, deoarece include o etapă de mesaj text.
2. Verifică etapele. Șablonul începe cu:
   - **Solicită și așteaptă răspunsul**: trimite solicitarea de servire prin e-mail și prin mesaj text, așteaptă 2 zile, trimite un e-mail de reamintire, mai așteaptă 1 zi, apoi mută automat cardul mai departe.
   - **Sună voluntarul despre solicitarea fără răspuns**: o etapă în care o persoană sună voluntarul, cu termen în 1 zi. Setează un **Responsabil implicit** pe această etapă. Dacă nu are unul, cardul merge la liderul slujirii sau, dacă nu există, la echipa slujirii.
3. Editează așteptările, mesajele și etapele, ca să se potrivească bisericii tale.
4. Deschide [setările unui plan](./plans.md#plan-settings) și alege acest flux sub **Flux de confirmare**.

Aceste fluxuri folosesc acțiunea **Trimite solicitare de servire** în loc de **Trimite e-mail** și **Trimite mesaj text**. Alege **E-mail** sau **Mesaj text** și, opțional, scrie un **Mesaj de solicitare**. Solicitarea include întotdeauna rolul, planul, data serviciului și un link pentru a răspunde; poți folosi `{{planName}}`, `{{positionName}}` și `{{serviceDate}}` în mesaj. Lasă mesajul gol pentru a folosi solicitarea implicită. Preferințele de notificare ale voluntarilor, acordul pentru mesaje text, furnizorul tău de mesaje text și aprobarea e-mailului bisericii se aplică toate, iar orice încercare omisă sau blocată este consemnată pe card. **Trimite e-mail**, **Trimite mesaj text** și **Adaugă în flux de lucru** nu sunt disponibile pe aceste table.

Fila **Declanșatori** a unui flux de confirmare explică modul în care sunt pornite cardurile, în loc să ofere declanșatori, iar aceste fluxuri nu apar în listele **Adaugă în flux de lucru** pentru persoane.

### Cum sunt pornite și închise cardurile

- Cardurile pornesc când **notifici** voluntarii pentru un plan publicat (vezi [Notificarea voluntarilor](./plan-validation.md#notifying-volunteers)). Fiecare atribuire nouă, fără răspuns, primește un card. Salvarea, publicarea, copierea sau completarea automată a unui plan nu contactează pe nimeni de la sine, iar planurile în ciornă nu trimit nimic.
- Voluntarii primesc în continuare alerta obișnuită din aplicație. Urmărirea prin e-mail și mesaj text vine din flux.
- Când voluntarul **acceptă sau refuză**, cardul său se închide automat, împreună cu orice sarcini de urmărire legate de el.
- Sertarul cardului arată poziția, data serviciului și un link către plan. În loc de **Finalizează**, butonul spune **Înregistrează urmărirea efectuată**. Apăsându-l, se înregistrează că cineva a urmărit cazul, dar cardul rămâne deschis și atribuit (afișat ca **În așteptarea răspunsului**) până când voluntarul răspunde sau trece termenul de răspuns.
- Termenul de răspuns este sfârșitul ultimului moment de serviciu în care echipa poziției servește. Dacă planul nu are momente corespunzătoare, este sfârșitul zilei de serviciu. Dacă nimeni nu a răspuns până atunci, cardul se închide cu **Termen de răspuns depășit**, iar o sarcină **Revizuiește solicitarea de servire fără răspuns** merge către responsabilul actual al cardului sau către liderul slujirii, ca cineva să decidă cum se acoperă locul. Atribuirea rămâne **Neconfirmată**.
- Eliminarea atribuirii, schimbarea persoanei, a poziției sau a datei planului, trecerea planului înapoi în ciornă sau schimbarea planului la alt flux de confirmare închide cardul. Un card închis nu este redeschis de o altă **Notificare**; adaugă o atribuire nouă pentru a trimite o solicitare proaspătă.

:::info
Pentru solicitările trimise printr-un flux de confirmare, [reamintirile către voluntari](./plans.md#volunteer-reminders) merg doar către voluntarii care au **acceptat**, astfel încât persoanele care așteaptă să răspundă nu primesc reamintiri pe lângă urmăririle fluxului.
:::

## Cardurile mele

Voluntarii și personalul nu trebuie să caute prin fiecare tablă ca să-și găsească munca. Lista **Cardurile mele** de pe pagina **Munca mea** arată fiecare card atribuit utilizatorului curent, din toate fluxurile. Pentru a ajunge acolo, apasă **Cardurile mele** în partea de sus a paginii Fluxuri de lucru sau deschide **Servire > Munca mea** din meniul Jump. Apăsând pe un card se deschide panoul lui de detalii chiar pe pagina Munca mea, unde poți lucra cu cardul sau îl poți elimina fără să părăsești pagina. Dacă poți vedea fluxurile de lucru, panoul are și un link **Deschide tabla fluxului**, către tabla căreia îi aparține cardul.

## Rapoarte

Deschide un flux și apasă **Rapoarte** pentru a vedea analizele acelui flux:

- **Întârziate**: numărul de carduri care au depășit data scadentă.
- **Carduri pe etapă**: câte carduri se află în prezent pe fiecare etapă, afișate ca grafic cu coloane.
- **Finalizate (30 de zile)**: productivitatea din ultimele 30 de zile, afișată ca grafic liniar.

Folosește-le pentru a identifica blocajele, de exemplu o etapă unde cardurile se adună și nu mai avansează niciodată.

## Articole înrudite

- [Sarcini](./tasks.md): elementele individuale de acțiune pe care se bazează cardurile fluxului
- [Formulare](../forms/index.md): creează formularele care pot porni fluxuri de lucru
- [Grupuri](../groups/index.md): grupurile în care o acțiune „Adaugă în grup” poate plasa persoane
- [Planuri de servire](./plans.md): alege un flux de confirmare pentru solicitările de servire ale unui plan
- [Roluri și permisiuni](../settings/roles-permissions.md): controlează cine poate vedea, edita și gestiona fluxurile de lucru
