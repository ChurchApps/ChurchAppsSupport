---
title: "Configurarea Twilio pentru biserici (ciornă)"
description: "Ciornă a configurării Twilio deținute de biserică în B1, cu indicații publice pentru înscriere, exemple de campanii și lista de verificare pentru aprobare."
---

# Ciornă pentru configurarea Twilio deținută de biserică

:::caution Ciornă pentru integrarea propusă
Acesta este un flux de lucru propus. B1 include acum o opțiune de bază **Twilio** în **Setări > Mesaje SMS** (Account SID, Auth Token, From Number și webhook-ul de intrare pentru STOP) -- vezi [Setările bisericii: Mesaje SMS](../../b1-admin/settings/church-settings.md#texting). Controalele suplimentare de configurare B1, maparea consimțământului și pașii de validare de mai jos sunt cerințe pentru o versiune viitoare, nu instrucțiuni pentru a găsi setări existente. Citiți [propunerea tehnică](./twilio-byok-proposal) pentru domeniul de aplicare și dependențe. Sursele Twilio au fost verificate la 22 octombrie 2026; verificați cerințele actuale înainte de a trimite o campanie.
:::

## Modelul recomandat

Biserica dumneavoastră deține contul Twilio plătit, numărul de telefon, Messaging Service-ul, facturarea și înregistrarea campaniei. B1 ar trimite mesaje prin aceste resurse, folosind datele de acces introduse privat în setările bisericii. Păstrați cel puțin doi administratori ai bisericii care pot accesa contul Twilio, activați securitatea contului și desemnați o persoană responsabilă pentru consimțământ, răspunsurile primite și notificările de respingere.

Prima versiune propusă acoperă un singur număr local din SUA și un singur program de mesaje al bisericii, clar descris. Exemplele de mai jos folosesc programul fictiv **Grace Community Church**, numit **Grace Church Updates**, pentru modificări ale serviciilor, mementouri despre evenimente și programarea voluntarilor. Înlocuiți fiecare nume, domeniu, frecvență, persoană de contact și scop cu practica reală a bisericii. Acestea sunt exemple specifice unei biserici privind regulile Twilio, nu o campanie preaprobată și nu o promisiune de aprobare.

## 1. Pregătiți experiența publică de înscriere în B1

Publicați o pagină precum `https://www.example.org/text-updates` pe site-ul web al bisericii, cu un formular public B1 încorporat sau cu un link vizibil către formularul public independent. Publicați și `https://www.example.org/privacy` și `https://www.example.org/sms-terms`. Acestea sunt adrese de exemplu; trimiteți adresele reale, accesibile.

Pentru formularul propus de înscriere prin SMS:

| Setare | Configurație recomandată |
|---|---|
| Acces | Public/fără restricții; activ pe durata analizei și a înscrierii continue; disponibil fără autentificare |
| Modul formular | Inițial, modul standard; modul conversațional necesită suportul explicit pentru consimțământ descris în propunerea tehnică |
| Mobil | Etichetat clar, cu prefixul țării; obligatoriu doar când se alege înscrierea prin SMS, dacă este folosit într-un formular general de conectare/eveniment |
| Opțiunea SMS | Casetă de bifat separată, opțională, nebifată implicit, asociată programului specific și câmpului de telefon mobil |
| Informări | Vizibile lângă opțiunea SMS: biserica/programul, scopul și frecvența mesajelor, eventualele tarife, STOP, HELP, contactul de suport și linkuri reale, clicabile, către Politica de confidențialitate/Termenii SMS |
| Alte acțiuni | Vizitatorii pot trimite cardul de conectare, se pot înscrie la un eveniment sau pot cere informații fără să accepte mesajele SMS |
| Dovezi | Salvați programul, numărul exact de telefon, consimțământul selectat, trimiterea sursă, ora serverului și versiunea informării/politicii; un simplu răspuns la formular nu înscrie astăzi pe nimeni |
| Automatizări pentru persoane/grupuri | Dezactivați crearea automată a persoanelor și atribuirea automată la grupuri pentru un test inițial de înscriere, cu excepția cazului în care au fost verificate pentru regulile de potrivire existente ale bisericii. Atribuirea la un grup nu constituie niciodată autorizare pentru SMS. |
| Automatizări existente | Nu înscrieți fiecare expeditor de formular sau membru de grup într-un flux de lucru SMS. Doar maparea propusă și verificată a consimțământului poate autoriza programul respectiv. |
| Mesajul de mulțumire | Confirmați primirea formularului, fără a afirma că persoana este înscrisă la SMS-uri când caseta a fost refuzată sau când confirmarea/analiza este încă în curs. |

O întrebare existentă cu casetă de bifat poate ilustra formularul, dar B1 are nevoie în continuare de registrul consimțământului și de blocajele de trimitere. Randatorul comun actual afișează descrierile ca text simplu; scrierea de Markdown sau a unui URL acolo nu oferă suficientă siguranță că linkurile către politici vor fi clicabile. Implementarea trebuie să ofere un control de consimțământ accesibil, cu linkuri reale. Vezi [crearea formularelor B1](../../b1-admin/forms/creating-forms) și [propunerea tehnică](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio cere un consimțământ voluntar și verificabil. Nu grupați mesajele SMS cu termenii obligatorii de membru, cu permisiunile pentru e-mail/telefon, cu consimțământul pentru donații sau cu înscrierea la evenimente. Un număr de telefon mobil de pe cardul unui vizitator nu constituie, în sine, consimțământ pentru SMS. Vezi [cerințele de consimțământ voluntar](https://www.twilio.com/docs/api/errors/30923) ale Twilio și [recomandările pentru campanii](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Exemplu de text pentru înscriere

Folosiți acest text numai după ce biserica alege scopurile, expeditorul și frecvența reale. Caseta este opțională și pornește nebifată; numele politicilor de mai jos trebuie să fie linkuri în formularul afișat.

> Da, doresc ca Grace Community Church să mă contacteze prin SMS, în cadrul programului Grace Church Updates, cu privire la modificările programului slujbelor, evenimentele bisericii și programările voluntarilor, de la [numărul de telefon înregistrat al bisericii]. Vă puteți aștepta la cel mult 4 mesaje pe lună. Se pot aplica tarifele pentru mesaje și date. Trimiteți STOP pentru a vă dezabona sau HELP pentru asistență. Înscrierea prin SMS este opțională și nu este necesară pentru a participa, a vă înscrie sau a dona. Consultați Politica noastră de confidențialitate și Termenii SMS. Întrebări: [e-mailul sau telefonul de suport al bisericii].

„Până la 4” este un angajament cu caracter de exemplu, nu o limită prescrisă de Twilio. Înlocuiți-l cu o frecvență pe care biserica o poate respecta efectiv; dacă frecvența variază, precizați acest lucru cu sinceritate și descrieți ritmul așteptat. Păstrați apelurile promoționale sau programele suplimentare de slujire în afara acestei casete, cu excepția cazului în care scopurile și consimțământul lor au fost evaluate separat.

Pentru un formular general pentru vizitatori/evenimente, trimiterea cu această casetă nebifată trebuie să reușească în continuare. Un formular dedicat doar pentru SMS poate explica faptul că bifarea lui solicită înscrierea, dar nu trebuie să facă niciodată ca serviciile bisericii, fără legătură cu SMS-urile, să depindă de înscriere. Confirmați comportamentul real atât pe telefon, cât și pe desktop.

### Conținutul politicilor de pregătit

Pagina de confidențialitate a bisericii trebuie să explice ce informații colectează pentru mesajele text, cum le folosește și le protejează, precum și practicile de păstrare și de contact. Trebuie să precizeze clar că numerele de telefon mobil și consimțământul pentru mesaje nu sunt vândute și nu sunt transmise unor terți sau afiliaților, pentru marketing sau promovare. Explicați corect prelucrarea necesară de către furnizorii de servicii; nu afirmați că biserica nu folosește niciun procesator, în timp ce utilizează B1 și Twilio. Ghidul Twilio privind [politica de confidențialitate](https://www.twilio.com/docs/api/errors/30908) și [recomandările pentru campanii](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) reprezintă referința pentru această distincție.

Termenii SMS trebuie să identifice biserica și programul, scopurile, frecvența reală, eventualele costuri ale mesajelor, instrucțiunile STOP/HELP, contactul de suport și linkul către politica de confidențialitate; includeți orice informații suplimentare solicitate de revizuirea actuală a Twilio. Linkurile politicilor din pagina de înscriere trebuie să corespundă exact URL-urilor trimise în campanie. Din 30 iunie 2026, Twilio cere URL-uri publice dedicate pentru confidențialitate și termeni, pentru înregistrările noi de campanii API; fluxul din Console le solicită și el. [Cerința Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Acestea sunt cerințe de conținut care trebuie aplicate politicilor reale ale bisericii; nu înlocuiesc practicile existente de confidențialitate și nu sunt o politică generică de copiat fără verificare.

## 2. Înregistrați biserica și programul său de mesaje în Twilio

1. Creați sau folosiți un **cont plătit, deținut de biserică**, precum și un număr local din SUA compatibil cu SMS. Folosiți în mod consecvent denumirea legală a bisericii, informațiile EIN/înregistrarea de afacere, adresa, site-ul web și reprezentantul autorizat. Nu folosiți identitatea ChurchApps sau informațiile altei biserici.
2. Urmați fluxul Twilio de înregistrare a brandului pentru clienți direcți, potrivit tipului real de entitate al bisericii. Pentru o organizație nonprofit eligibilă, folosiți [ghidul de înregistrare pentru nonprofit](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Utilizarea pentru caritate/501(c)(3) depinde de eligibilitate; numele unei biserici nu stabilește, de unul singur, aprobarea sau scutirea de către Twilio.
3. Creați un Messaging Service dedicat și trimiteți campania A2P 10DLC relevantă. Alegeți cazul de utilizare care corespunde adevărat mesajelor reale și opțiunilor disponibile pentru acel Brand aprobat; exemplele de aici nu prescriu un cod universal de caz de utilizare pentru biserici.
4. Furnizați URL-ul public de înscriere, URL-urile politicilor, descrierea completă a consimțământului și a fluxului de mesaje, precum și mesajele de exemplu solicitate. Includeți fiecare metodă reală de înscriere; setați declarațiile privind linkurile încorporate și numerele de telefon astfel încât să corespundă conținutului real. Nu enumerați înscrierea prin cuvânt-cheie sau dubla confirmare decât dacă acel flux există și a fost testat.
5. Asociați numărul expeditor cu serviciul și cu campania aprobată. Așteptați atât **verificarea campaniei**, cât și **finalizarea înregistrării numărului**, înainte de a trimite mesaje.

Păstrați acești pași în Console-ul Twilio al bisericii. Integrarea B1 propusă nu trimite înregistrări pentru biserici. Ghidul [de pornire rapidă pentru înregistrare](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) și [resursa de campanie](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) ale Twilio explică câmpurile și statusurile înregistrării. Un număr aflat în așteptare poate bloca trimiterea și după aprobarea campaniei. [Înregistrarea numărului](https://www.twilio.com/docs/api/errors/30035)

### Exemplu de descriere a campaniei

> Grace Community Church folosește Grace Church Updates pentru a trimite persoanelor care aleg acest program, de pe site-ul nostru public al bisericii, modificări ale programului slujbelor, mementouri pentru evenimentele bisericii și notificări privind programările voluntarilor. Trimitem cel mult patru mesaje pe lună în cadrul acestui program. Destinatarii pot opri oricând aceste mesaje. Programul nu include contacte cumpărate, promoții ale unor terți sau apeluri de strângere de fonduri.

Acest exemplu se potrivește doar unei biserici care respectă efectiv aceste limite și excluderi. Dacă doar mementourile pentru voluntari depășesc frecvența promisă, modificați designul programului și informarea înainte de trimitere.

### Exemplu de descriere a fluxului de mesaje

> Vizitatorii deschid [adresa reală de înscriere a bisericii], introduc numărul de telefon mobil și selectează independent caseta opțională Grace Church Updates. Caseta este nebifată la deschiderea formularului. Informarea precizează Grace Community Church, descrie modificările programului, mementourile pentru evenimente și programările voluntarilor, indică limita lunară și eventualele tarife și explică STOP și HELP. Linkurile afișate către Politica de confidențialitate și Termenii SMS duc la [adresa reală a politicii de confidențialitate] și la [adresa reală a termenilor SMS]. Refuzul mesajelor SMS nu împiedică participarea, înscrierea la evenimente, donațiile sau utilizarea formularului general de conectare. B1 înregistrează selecția afirmativă, numărul de telefon, ora trimiterii și versiunea informării. Trimitem acest program doar abonaților documentați și suprimăm retragerile înainte de orice alt mesaj.

Adaptați acest paragraf la fluxul implementat. Dacă se folosește confirmarea prin telefon sau analiza de către personal, descrieți starea de așteptare și pasul exact de activare. Dacă se folosesc alte metode, includeți fiecare metodă și dovezile ei. Când înscrierea se face în spatele unei autentificări sau pe hârtie, Twilio cere dovezi publice, redactate, ale experienței reale de consimțământ; nu expuneți niciodată formulare completate sau date ale membrilor. [Ghidul pentru consimțământ verificabil](https://www.twilio.com/docs/api/errors/30923)

### Exemple de mesaje trimise

Acestea sunt exemple fictive de adaptat; folosiți adrese reale ale bisericii și înlocuiți valorile între paranteze înainte de trimitere. API-ul de campanii Twilio acceptă între două și cinci exemple. Exemplele trebuie să identifice biserica, să reflecte scopul declarat și să includă o instrucțiune de dezabonare. [Câmpurile pentru exemplele de campanie](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Slujba de duminică va începe la [ora] din cauza [motivul]. Detalii: [adresa site-ului bisericii]. Răspundeți STOP pentru a opri mesajele.
```

```text
Grace Community Church: Vă reamintim că [evenimentul bisericii] are loc pe [data] la [ora]. Informații: [adresa evenimentului bisericii]. Răspundeți STOP pentru a opri mesajele.
```

```text
Grace Community Church: Sunteți programat să serviți în echipa [echipa] în [ziua]. Vă rugăm să verificați planificarea: [adresa portalului bisericii în B1]. Răspundeți STOP pentru a opri mesajele.
```

Adresele între paranteze descriu variabile exemplificative; exemplele trimise trebuie să arate domeniul real al bisericii și stilul real al linkurilor. Un link către un plan poate necesita autentificare, dar pagina de înscriere și politicile folosite pentru verificare trebuie să poată fi consultate public. Nu includeți note private, informații despre copii sau detalii identificabile despre membri în exemplele trimise spre aprobare. Păstrați conținutul exemplelor în concordanță cu ceea ce trimit efectiv șabloanele B1; nu promiteți o căsuță de răspuns sau un comportament de reamintire care nu este disponibil.

### Răspunsurile la STOP, START și HELP

Folosiți funcția Advanced Opt-Out a Messaging Service din Twilio pentru aceste confirmări și personalizați identitatea bisericii/programului și datele de suport. Intenția răspunsurilor, ca exemplu:

- **STOP:** Confirmați că Grace Church Updates a fost oprit și explicați modalitatea de reluare acceptată.
- **START:** Confirmați reluarea acelui același program, inclusiv identitatea, ritmul/tarifele și instrucțiunile de ajutor și oprire, așa cum cere fluxul configurat.
- **HELP:** Identificați Grace Community Church și indicați contactul real de suport și instrucțiunile de dezabonare.

Nu trimiteți o a doua confirmare din B1 atunci când Twilio a răspuns deja. Un răspuns HELP nu înseamnă înscriere, iar START nu trebuie să înscrie persoana în alte programe ale bisericii și nu trebuie să o facă vizibilă în directorul membrilor. [Advanced Opt-Out de la Twilio](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Verificați pachetul de aprobare înainte de trimitere

- [ ] Denumirea legală/Brand-ul reală a bisericii, identitatea site-ului web și scopul campaniei sunt în concordanță.
- [ ] Pagina de înscriere și formularul activ se deschid fără autentificare într-o fereastră privată de navigare, inclusiv pe un dispozitiv mobil.
- [ ] Caseta SMS pornește nebifată și poate fi refuzată în timp ce se finalizează acțiunea principală pentru vizitator/eveniment.
- [ ] Scopul programului, expeditorul, frecvența reală, eventualele costuri, STOP, HELP, contactul de suport și linkurile clicabile către politici apar lângă opțiunea SMS.
- [ ] URL-urile exacte ale confidențialității/termenilor trimise către Twilio sunt publice, funcționează fără date de acces și identifică aceeași biserică/același program. Conținutul politicilor corespunde prelucrării reale.
- [ ] Fiecare mesaj de exemplu corespunde programului, identității reale a expeditorului și comportamentului așteptat al linkurilor/numerelor de telefon. Campania descrie fiecare metodă reală de consimțământ.
- [ ] Capturile de ecran redactate arată formularul gol, caseta și informările, precum și linkurile către politici, așa cum le vor vedea evaluatorii. Dovezile nu conțin fișe de membri sau chei.
- [ ] Biserica are o modalitate operațională de a păstra dovezile consimțământului și de a respecta retragerile înainte de trimitere, inclusiv cererile primite telefonic sau prin e-mail.

Aceste verificări reduc neconcordanțele care pot fi evitate; Twilio și partenerii săi de analiză iau decizia de aprobare. Păstrați disponibile pagina reală de înscriere și URL-urile politicilor și după aprobare, nu doar pe durata analizei.

## 4. Conectați și validați integrarea B1 viitoare

După lansarea integrării, configurarea propusă pentru Mesaje SMS ar trebui să colecteze Account SID-ul bisericii, API Key SID-ul și secretul dedicate, Auth Token-ul separat pentru webhook, SID-ul Messaging Service și expeditorul selectat. Creați cheile doar în Console-ul bisericii și introduceți secretele doar în setările private ale B1. [Ghidul Twilio pentru chei API](https://www.twilio.com/docs/iam/api-keys)

Copiați în configurația serviciului Twilio corespunzător adresele webhook specifice bisericii pentru mesajele primite și pentru statusul livrării, furnizate de B1. Activați Advanced Opt-Out și verificați că mesajele primite ajung la webhook-ul configurat. B1 ar trebui să afișeze verificări separate pentru datele de acces, proprietatea serviciului/expeditorului, campania verificată, finalizarea înregistrării numărului, verificarea mesajelor primite și testul de livrare reușit. O credențială salvată sau o cerere API acceptată nu înseamnă livrare finală.

Dacă B1 nu poate verifica automat un semnal de înregistrare, confirmați direct în Console; interfața trebuie să eticheteze rezultatul datat drept „confirmat de administrator”. Rezolvați starea în așteptare sau eșuată înainte de a activa mesajele în producție. Folosiți un test separat, solicitat explicit, către un destinatar real de test, adult, care și-a dat consimțământul, apoi:

1. Confirmați că o înscriere documentată corespunzătoare creează înregistrarea corectă de consimțământ pentru telefon/program; refuzul sau schimbarea numărului de telefon nu trebuie să înscrie în tăcere un destinatar.
2. Trimiteți un mesaj de test, confirmați primirea și comparați statusul din B1 cu Message SID-ul Twilio și cu rezultatul livrării.
3. Trimiteți STOP și verificați că mesajele manuale, mesajele de grup, fluxurile de lucru și mementourile omit acel număr. Vizibilitatea în director nu ar trebui să se schimbe.
4. Testați fluxul documentat de reabonare la același program și răspunsul HELP; verificați că nu există confirmări duplicate și nicio modificare neînrudită a preferințelor.

## 5. Întreținerea programului

Desemnați un responsabil din partea bisericii care urmărește în Twilio starea campaniei și a contului, alertele privind soldul și facturarea, eșecurile trimiterii și răspunsurile primite. Prima versiune propusă a B1 nu are o căsuță de SMS-uri conversațională, așa că publicați și monitorizați un contact real de ajutor și verificați răspunsurile, în loc să presupuneți că personalul le vede în B1.

Păstrați istoricul consimțământului și al retragerilor, versiunile actuale ale informărilor și politicilor, identificatorii campaniei și dovezile de aprobare redactate, în evidențe controlate de biserică. Nu lipiți niciodată chei sau liste de destinatari în tichetele publice de suport. Când se modifică un număr, un serviciu, datele de acces, fluxul de înscriere, frecvența sau scopul, reverificați integrarea și actualizați înregistrarea și consimțământul acolo unde este necesar, înainte de a relua trimiterea. Verificați cu atenție numerele partajate de gospodărie și numerele schimbate; eligibilitatea urmează telefonul care și-a dat consimțământul și programul, nu fișa fiecărui membru al familiei.

În cazul unei respingeri, citiți eroarea reală a Twilio, corectați inconsecvența specifică atât în site-ul web, cât și în trimitere, și retrimiteți prin Console-ul bisericii. Pentru expeditorii neînregistrați sau în așteptare, așteptați finalizarea înregistrării, în loc să schimbați numerele pentru a ocoli problema. Folosiți [ghidul de depanare a înregistrării Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) și referința de coduri de eroare furnizată. Nu promiteți un termen fix de răspuns.
