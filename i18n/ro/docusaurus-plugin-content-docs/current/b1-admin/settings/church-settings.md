---
title: "Setările bisericii"
description: "Setați numele, adresa, subdomeniul, fusul orar, formatul regional, furnizorul de mesaje text și stocarea fișierelor pentru biserica dumneavoastră în pagina Setări biserică din B1 Admin."
---

# Setările bisericii

<div class="article-intro">

Pagina Setări biserică este locul în care configurați informațiile de bază ale bisericii, datele de contact și identitatea vizuală. Aceste detalii sunt folosite în toate instrumentele ChurchApps, inclusiv pe site-ul dumneavoastră B1.church și în aplicația B1 App.

</div>

## Videoclip de instruire

<YouTube id="634zSbzDkYA" title="Configurarea informațiilor și a identității vizuale ale bisericii în B1" next="Roluri, permisiuni și invitarea echipei în B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea „Editare setări biserică”. Consultați [Roluri și permisiuni](./roles-permissions.md) dacă nu aveți acces.
- Pregătiți adresa bisericii, informațiile de contact și logoul

</div>

## Editarea informațiilor bisericii

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus, în stânga), extindeți **Setări** și faceți clic pe **Setări**.
2. În secțiunea **Informații biserică** (în partea de sus a paginii), faceți clic pe **Editează**.
3. Actualizați oricare dintre următoarele câmpuri:
   - **Numele bisericii** -- Numele afișat în toate produsele ChurchApps.
   - **Adresă** -- Adresa fizică a bisericii.
   - **Informații de contact** -- Numărul de telefon, adresa de e-mail și alte date de contact.
   - **Fus orar** -- Fusul orar al bisericii. Consultați mai jos secțiunea [Fus orar](#time-zone).
4. Faceți clic pe **Salvează** pentru a aplica modificările.

## Configurarea subdomeniului

Biserica dumneavoastră primește un subdomeniu gratuit, de tipul **biserica-dumneavoastra.1.church**. Aceasta este adresa web la care membrii și vizitatorii pot accesa prezența online a bisericii.

1. Pe pagina Setări, faceți clic pe **Editează** în secțiunea **Informații biserică** și localizați câmpul **Subdomeniu**.
2. Introduceți subdomeniul dorit (de exemplu, „bisericaharul” pentru bisericaharul.1.church).
3. Salvați modificările.

:::info
Subdomeniul dumneavoastră trebuie să fie unic în rândul tuturor bisericilor ChurchApps. Dacă numele dorit este deja folosit, încercați să adăugați orașul sau regiunea (de exemplu, „bisericaharul-cluj”).
:::

Dacă doriți ca vizitatorii să ajungă pe site-ul dumneavoastră la propriul domeniu (de exemplu, **`www.bisericaharul.ro`**), consultați [Domeniu personalizat](./custom-domain.md).

## Configurarea identității vizuale

Personalizați modul în care biserica dumneavoastră apare în toate instrumentele ChurchApps:

1. Încărcați **logoul bisericii** făcând clic pe zona logoului și selectând un fișier de imagine.
2. Adăugați orice **imagini ale bisericii** suplimentare folosite pe site-ul dumneavoastră și în [aplicația mobilă](./mobile-app.md).

:::tip
Pentru rezultate optime, folosiți un logo cu fundal transparent, în format PNG. Acest lucru asigură o afișare bună atât pe fundaluri deschise, cât și pe fundaluri închise.
:::

## Prima zi a săptămânii

Alegeți ziua în care încep calendarele dumneavoastră. Lista derulantă **Prima zi a săptămânii** din secțiunea Informații biserică are implicit valoarea **Duminică**, dar poate fi setată la orice zi. Odată modificată, această setare este respectată în grilele calendarelor din B1 Admin și din portalul de membri B1.church: calendarele grupurilor, calendarele curate și editorul de evenimente afișează săptămânile începând cu ziua pe care o alegeți.

## Fus orar

Lista derulantă **Fus orar** din secțiunea **Informații biserică** stabilește fusul orar al bisericii (de exemplu, *Europe/Bucharest*). Alegeți **Niciunul** pentru a lăsa câmpul gol. După salvare, fusul orar apare în rezumatul Informațiilor bisericii.

B1 folosește acest fus orar pentru orele la nivelul întregii biserici, cum ar fi mementourile pentru evenimente și programele afișate pe televizoarele dumneavoastră [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Programele de check-in](../attendance/setup.md#setting-a-check-in-schedule) sunt măsurate mai întâi în fusul orar al [campusului](./campuses.md) serviciului, iar fusul orar al bisericii este folosit doar dacă acel campus nu are unul. Dacă toate campusurile dumneavoastră se află în același fus orar, setați-l atât pentru biserică, cât și pentru fiecare campus.

## Regiunea (formatul datei și al numărului de telefon)

Setarea **Regiune** controlează modul în care sunt scrise datele și orele în B1. Implicit, datele folosesc formatul din Statele Unite (de exemplu, „Sep 28, 2026” și „9/28/2026”). Bisericile din afara SUA pot trece la propriul format. De exemplu, alegând English (United Kingdom), se afișează „28 Sept 2026” și „28/09/2026”.

1. Pe pagina Setări, faceți clic pe **Regiune** în lista din stânga, apoi faceți clic pe **Editează** în secțiunea **Regiune**.
2. Alegeți regiunea dumneavoastră din lista derulantă **Regiune**. Fiecare opțiune afișează o dată de exemplu, pentru a vedea exact cum vor arăta datele.
3. Faceți clic pe **Salvează**.

Secțiunea Regiune afișează apoi regiunea selectată, un exemplu al **Formatului datei** și formatul **Numerelor de telefon**.

### Formatul numerelor de telefon

Aceeași secțiune Regiune conține setarea **Numere de telefon**, care controlează modul în care sunt introduse numerele de telefon în fișa unei persoane:

- **Internațional (cu prefix de țară)** -- implicit. Câmpurile de telefon afișează un selector de steag al țării și salvează numerele cu prefixul țării (de exemplu, +40 721 555 123).
- **Local (așa cum este scris)** -- câmpurile de telefon devin casete de text simple și salvează numerele exact cum le introduceți, fără a adăuga prefixul țării (de exemplu, 0721 555 123). Alegeți această opțiune dacă biserica dumneavoastră scrie numerele într-un format local și nu doriți ca B1 să adauge prefixul țării.

Când este selectată opțiunea **Local**, secțiunea Regiune afișează și „Numere de telefon locale” lângă regiunea dumneavoastră.

:::tip
Mesajele text funcționează cel mai bine atunci când numerele includ prefixul țării. Dacă trimiteți mesaje text din B1, păstrați formatul **Internațional** sau asigurați-vă că numerele introduse în modul Local includ prefixul țării.
:::

Regiunea dumneavoastră se aplică datelor și orelor din B1 Admin, de pe site-ul B1.church și din portalul de membri, inclusiv predicilor, postărilor de blog, calendarelor grupurilor și planurilor de slujire, astfel încât membrii să vadă datele în același format ca personalul dumneavoastră.

## Mesaje text {#texting}

Conectați un furnizor de mesaje text pentru a trimite mesaje SMS unei persoane sau unui întreg grup din B1 Admin. Mesajele sunt trimise prin contul dumneavoastră la furnizor, deci se aplică tarifele și limitele acestuia.

1. Pe pagina Setări, faceți clic pe **Mesaje text** în lista din stânga, apoi faceți clic pe **Editează** în secțiunea **Mesaje text**.
2. Alegeți un **Furnizor**:
   - **Clearstream** -- introduceți o **Cheie API**. Creați una în secțiunea API Keys din Clearstream Account Settings.
   - **Text In Church** -- introduceți o **Cheie API**. Cereți mai întâi acces la API pentru dezvoltatori de la Text In Church Support, apoi creați o cheie în secțiunea Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- introduceți cheia de autentificare din contul dumneavoastră Nalo Solutions ca **Cheie API** și un **ID expeditor** (de până la 11 caractere) aprobat de Nalo pentru dumneavoastră.
   - **Twilio** -- folosiți contul Twilio al bisericii; Twilio vă facturează direct. Copiați **Account SID** și **Auth Token** din [Twilio Console](https://console.twilio.com) și introduceți un **Număr de expediere** -- un număr de telefon Twilio înregistrat pentru A2P 10DLC, într-un format de tipul `+15551234567`. După salvare, lipiți adresa URL a webhook-ului pentru mesaje primite (vezi mai jos) în câmpul **A message comes in** webhook al numărului din Twilio, astfel încât răspunsurile STOP să fie înregistrate și în B1.
3. Faceți clic pe **Salvează**.

Pentru a opri trimiterea mesajelor text, setați **Furnizor** la **Niciunul** și salvați. Aceasta elimină furnizorul salvat.

### Dezabonarea persoanelor care răspund STOP

După ce un furnizor este salvat, redeschideți secțiunea Mesaje text cu **Editează**. Sub setările furnizorului, un câmp doar pentru citire, **URL webhook pentru răspunsuri STOP (intrare)**, afișează o adresă web unică pentru biserica dumneavoastră. Faceți clic pe câmp pentru a selecta adresa, copiați-o și lipiți-o în setarea de webhook pentru mesajele primite (răspunsuri) a furnizorului dumneavoastră de mesaje text. Acest lucru funcționează cu oricare dintre furnizorii de mai sus care pot transmite răspunsurile primite către un webhook.

După aceea, atunci când cineva răspunde **STOP** (sau STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT sau REVOKE) la unul dintre mesajele dumneavoastră, B1 găsește toate persoanele al căror număr de mobil se potrivește, le marchează ca dezabonate și dezactivează memento-urile lor text. Ulterior, acestea sunt omise din mesajele text trimise grupurilor. Celelalte răspunsuri sunt ignorate.

:::info
Acest lucru folosește aceeași setare de dezabonare ca **Ascunde-mă din directorul membrilor**, deci persoanele care răspund STOP apar și ca **Ascuns din director** în profilul lor. Câmpul apare doar atunci când este selectat furnizorul salvat -- dacă schimbați lista derulantă la un alt furnizor, salvați mai întâi pentru a vedea din nou adresa URL.
:::

Odată ce un furnizor este conectat, membrii personalului cu permisiunea de a trimite mesaje text văd un buton **Trimite mesaj text** pe pagina unui grup (**Trimite mesaj text grupului**) și pe pagina unei persoane care are un număr de mobil (**Trimite mesaj text**). Scrieți mesajul și faceți clic pe **Trimite**. Caseta de dialog numără caracterele și segmentele SMS. Pentru un grup, afișează câți membri vor primi mesajul înainte de trimitere:

- Membrii fără un număr de mobil înregistrat sunt omiși.
- Membrii care au ales **Ascunde-mă din directorul membrilor** sunt considerați dezabonați și sunt omiși.
- Membrii unei familii care au același număr de mobil primesc mesajul o singură dată.

### Personalizarea mesajelor cu câmpuri de completare {#personalizing-texts-with-merge-fields}

Sub caseta de mesaj, fereastra Mesaj text afișează cipuri cu substituenți: **Prenume**, **Nume de familie**, **Nume afișat** și **Numele bisericii**. Faceți clic pe un cip pentru a insera substituentul (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` sau `{{churchName}}`) în locul cursorului. Când mesajul este trimis, fiecare substituent este înlocuit cu datele destinatarului respectiv, astfel încât un mesaj de grup de tipul `Bună, {{firstName}}, ne vedem duminică!` ajunge la fiecare membru cu numele său. Substituenții funcționează atât pentru mesajele de grup, cât și pentru cele trimise unei singure persoane. Mesajele către un grup oferă și un cip **Numele grupului** (`{{groupName}}`), care este înlocuit cu numele grupului.

Pentru a reutiliza un mesaj, salvați-l ca [șablon de mesaj text](./email-templates.md#text-templates) (un șablon de e-mail din categoria **Text**) și selectați-l din **Încarcă șablon (opțional)** din partea de sus a ferestrei Mesaj text.

:::info
Limita de 1.600 de caractere se aplică mesajului așa cum îl scrieți. După ce substituenții sunt completați, orice text mai lung de 1.600 de caractere este tăiat la această lungime.
:::

Mesajele text pot fi trimise și automat dintr-un pas al unui [flux de lucru](../serving/workflows.md#sending-a-text) cu acțiunea **Trimite mesaj text**, care folosește același furnizor și aceiași substituenți.

## Stocarea fișierelor

Implicit, fișierele pe care le încărcați pe site-ul dumneavoastră (prin [Fișiere](../website/files.md)) și în alte zone de conținut folosesc stocarea gratuită găzduită de B1, de până la 100 MB. Dacă aveți nevoie de mai mult spațiu, puteți conecta propriul serviciu de stocare în cloud. Noile încărcări vor merge atunci direct în contul dumneavoastră, fără limită impusă de platformă.

1. Pe pagina Setări, faceți clic pe **Stocare fișiere** în lista din stânga, apoi faceți clic pe **Editează** în secțiunea **Stocare fișiere**.
2. Alegeți un furnizor: **Google Drive**, **Dropbox**, **OneDrive** sau un **bucket compatibil S3** (AWS S3, Cloudflare R2, Backblaze B2 etc.).
3. Pentru Google Drive, Dropbox sau OneDrive, faceți clic pe **Conectare** și autentificați-vă pentru a autoriza accesul. Pentru un bucket compatibil S3, introduceți cheia de acces, cheia secretă, numele bucket-ului și baza URL publică.
4. Faceți clic pe **Salvează**.

:::info
Acest lucru afectează doar noile încărcări în Fișierele site-ului dumneavoastră și în zonele similare de conținut. Imaginile din galerii, miniaturile, logourile și fotografiile persoanelor rămân întotdeauna în stocarea implicită a B1.
:::

## Promovarea în clasă

Dacă urmăriți **Clasa** copiilor și elevilor, B1 poate trece automat pe toată lumea în clasa următoare, într-o dată pe care o alegeți (de exemplu, 1 august), fără a fi nevoie să editați manual fiecare fișă.

1. Pe pagina Setări, faceți clic pe **Promovarea în clasă** în lista din stânga, apoi faceți clic pe **Editează** în secțiunea **Promovarea în clasă**.
2. Activați comutatorul (afișează **Activat**) și alegeți **Luna** și **Ziua** în care clasele sunt promovate în fiecare an. În acea dată, toți cei cu o clasă trec la clasa următoare, iar elevii din clasa a XII-a devin **Absolvenți**.
3. Salvați modificările.

Pentru a opri promovarea automată, dezactivați comutatorul, astfel încât să afișeze **Dezactivat**, și salvați. Data promovării este eliminată, iar clasele nu se vor mai schimba de la sine.

## Înscrierea voluntarilor {#volunteer-signup}

Implicit, membrii care consultă [înscrierile voluntarilor](../../b1-church/serving/volunteer-signup.md) văd toate săptămânile viitoare care au posturi disponibile. Dacă lista devine lungă, puteți afișa doar săptămâna următoare pentru fiecare tip de plan.

1. Pe pagina Setări, faceți clic pe **Înscrierea voluntarilor** în lista din stânga, apoi faceți clic pe **Editează** în secțiunea **Înscrierea voluntarilor**.
2. Activați **Afișează doar săptămâna următoare pentru fiecare tip de plan**.
3. Salvați modificările.

Cu această opțiune activată, fiecare tip de plan afișează doar următorul plan viitor. Săptămâna următoare apare după trecerea acelei date. Rândul **Săptămâni afișate** din secțiune indică **Doar săptămâna următoare pentru fiecare tip de plan** sau **Toate săptămânile viitoare**.

## Confidențialitatea donațiilor {#giving-privacy}

Persoanele cu acces la donații văd, în mod normal, totalurile donațiilor unei persoane în [fișa persoanei](../people/adding-people.md#editing-details). Dacă preferați să nu apară sumele pe ecran de fiecare dată când se deschide o fișă, le puteți ascunde până când cineva le solicită.

1. Pe pagina Setări, faceți clic pe **Confidențialitatea donațiilor** în lista din stânga, apoi faceți clic pe **Editează** în secțiunea **Confidențialitatea donațiilor**.
2. Activați **Ascunde donațiile din fișele persoanelor până la clic**.
3. Salvați modificările.

Cu această opțiune activată, cardul de donații de pe fișa unei persoane afișează mesajul „Donațiile sunt ascunse pe fișele persoanelor.” Faceți clic pe **Afișează donațiile** pentru a încărca și afișa donațiile acelei persoane. Acestea se ascund din nou atunci când deschideți o altă persoană. Cine poate vedea donațiile nu se schimbă: doar persoanele cu acces la donații văd vreodată cardul.

## Import și export

Linkul **Import/Export** de sub numele bisericii dumneavoastră din pagina Setări deschide un instrument dedicat, într-o fereastră nouă a browserului. Folosiți-l pentru a:

- Importa date despre membri dintr-un alt sistem de gestionare a bisericii.
- Exporta datele ChurchApps pentru copii de siguranță sau migrare.

Acest lucru este deosebit de util atunci când configurați pentru prima dată biserica și aveți nevoie să transferați înregistrările existente în ChurchApps.

:::warning
Înainte de import, faceți întotdeauna o copie de siguranță a înregistrărilor existente. Operațiunile de import adaugă date în sistem și pot crea înregistrări duplicate dacă sunt rulate de mai multe ori.
:::
