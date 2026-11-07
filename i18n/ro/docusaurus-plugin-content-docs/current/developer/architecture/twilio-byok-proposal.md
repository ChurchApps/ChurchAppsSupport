---
title: "Integrare Twilio BYOK (propunere)"
description: "Propusă integrare Twilio deținută de biserică, model de consimțământ, domeniu de implementare și criterii de lansare."
---

# Propunere de integrare Twilio BYOK

:::caution Propunere: nu este o integrare disponibilă
Acesta este un proiect destinat revizuirii de către responsabilii de proiect, bazat pe codul sursă public și pe documentația Twilio consultată la 22 octombrie 2026. De atunci, a fost lansat un furnizor Twilio de bază (`@churchapps/texting` 0.6.0 și B1 Admin **Settings > Texting**): biserica introduce Account SID, Auth Token și un număr From. Furnizorul acceptă și un Messaging Service SID care începe cu `MG`, dar coloana `fromNumber` este încă `varchar(20)`, prea scurtă pentru un SID de 34 de caractere. Mesajele sunt trimise câte o cerere pentru fiecare destinatar, prin Messages API-ul Twilio, iar răspunsurile STOP ajung în B1 prin webhook-ul existent pentru mesajele primite. Vezi [Setări biserică: Texting](../../b1-admin/settings/church-settings.md#texting). Modelul de consimțământ, gestionarea Advanced Opt-Out, starea livrării și verificările de pregătire a configurării de mai jos sunt încă propuneri, nu comportament lansat. [Schița companion pentru integrarea bisericii](./twilio-byok-onboarding-draft.md) conține ghidul propus de configurare și exemple specifice bisericilor.
:::

## Traseul recomandat

Adăugați Twilio în sistemul existent de furnizori de texting din B1, folosind **un cont Twilio deținut de biserică, credențiale API, un Messaging Service și un număr de telefon compatibil cu SMS**. Biserica își înregistrează propria entitate juridică și propria campanie de mesagerie, plătește direct Twilio, menține consimțământul destinatarilor și gestionează aprobarea în Twilio Console. ChurchApps furnizează integrarea și documentația.

Începeți cu un singur program de mesagerie, un singur Messaging Service și un singur expeditor local US 10DLC pentru fiecare biserică B1. Acceptați mesaje individuale, mesaje de grup, mesaje din fluxuri de lucru și memento-uri de înscriere prin ecranele B1 existente. Un prim program rezonabil acoperă modificările de program ale serviciilor, memento-urile pentru evenimente și programarea voluntarilor, dacă toate trei sunt descrise în consimțământul bisericii respective și în campania aprobată. Mesajele pentru strângeri de fonduri sau mesajele promoționale necesită un domeniu și un consimțământ evaluate separat; nu le adăugați în tăcere la acest program.

| Responsabilitate | Biserica | B1 / ChurchApps |
|---|---|---|
| Contul Twilio, facturarea, proprietatea numărului | Le deține și le administrează | Nu creează un cont de platformă și nu revinde credite |
| Brand, campanie, înregistrarea numărului | Trimite informații corecte despre biserică; gestionează verificarea și corecțiile | Explică cerințele prealabile și citește informațiile disponibile despre pregătire |
| Pagina de înscriere, politicile, scopul mesajelor | Le publică și le întreține | Oferă controale compatibile pentru formulare, exemple și înregistrări ale consimțământului |
| Eligibilitatea destinatarilor și gestionarea STOP | Verifică dovezile de consimțământ și solicită cererile primite în afara SMS-ului | Aplică consimțământul, suprimarea, permisiunile și webhook-urile semnate |
| Livrare și suport | Urmărește erorile Twilio, starea contului și răspunsurile primite | Afișează starea trimiterii și a livrării fără a garanta aprobări |

Amânați un cont-părinte Twilio deținut de ChurchApps, subconturile pentru clienți, achiziționarea de numere, trimiterile către Trust Hub, facturarea, o casetă de conversații, MMS/WhatsApp, trimiterea internațională și înscrierea numerelor toll-free. Numerele toll-free reprezintă o cale separată, de expeditor verificat, nu un mod de a ocoli înregistrarea. Aceste limite mențin prima versiune aliniată cu modelul existent al B1 de tipul „aduceți-vă propriul furnizor”.

## Fundația existentă și lacunele

Următoarele observații sunt legate de instantaneele codului sursă, nu de o presupunere privind ceea ce este implementat în prezent:

| Componentă | Comportament existent | Implicație |
|---|---|---|
| [Registrul și contractul furnizorilor](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` are trimiteri unice și în masă, capabilități opționale pentru abonați/liste și un ID de mesaj al furnizorului în rezultate. Nu este înregistrat niciun adaptor Twilio. | Adăugați Twilio în `@churchapps/texting`; nu are nevoie nici de crearea abonaților, nici de liste gestionate de furnizor. |
| [Setările de texting](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church și Nalo pot fi selectate; MinistryStuff este restricționat prin funcționalități. Editarea și salvarea expeditorului sunt în prezent specifice pentru Nalo. | Adăugați câmpuri Twilio explicite, validare, salvarea expeditorului și ajutor pentru configurare. O simplă intrare în meniul derulant nu este suficientă. |
| [Controllerul](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) și [gateway-ul modulului](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Credențialele sunt criptate și mascate; trimiterile manuale și automate determină furnizorul bisericii. Trimiterile de grup elimină numerele de telefon duplicate. | Reutilizați aceste căi și păstrați autorizarea. Plasați noile porți de consimțământ/pregătire într-o cale comună pe server, astfel încât fluxurile de lucru să nu le poată ocoli. |
| [Ajutorul pentru STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Analizează `From`/`Body` în stil Twilio; validează un token URL al bisericii; setează `person.optedOut` și dezactivează memento-urile SMS. Celelalte răspunsuri sunt ignorate. | Un punct de plecare util, nu un webhook Twilio complet. Adăugați semnături Twilio și o stare independentă a abonării SMS. |
| [Schema mesajelor](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Stochează `apiKey`, `apiSecret` și un `fromNumber` de 20 de caractere. Jurnalele de livrare stochează succesul/eroarea imediată, nu ID-urile furnizorului sau stările finale de livrare. | Un expeditor E.164 se potrivește; un Messaging Service SID de 34 de caractere are nevoie de propriul câmp. Adăugați stocare durabilă pentru ID-ul mesajului furnizorului și stările acestuia. |
| [Pagina publică a formularului](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [randerizatorul comun de formulare](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) și [controllerul pentru trimiterea formularelor](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Există formulare fără restricții și casete de bifare opționale. Descrierile sunt text simplu. Trimiterile păstrează răspunsurile, dar calea de texting nu are un registru de consimțământ specific campaniei. | Adăugați un control configurat pentru consimțământul SMS, cu linkuri reale către politici și captură de dovezi pe server. O casetă generică sau apartenența la un grup nu trebuie să autorizeze automat SMS-ul. |

[Documentația pentru utilizatori despre setările bisericii](../../b1-admin/settings/church-settings.md#texting) explică, de asemenea, că indicatorul actual de dezabonare este partajat cu confidențialitatea din director. Această cuplare este o problemă de lansare: trimiterea START nu trebuie să schimbe niciodată vizibilitatea din director.

## Design pentru configurare și credențiale

Folosiți câmpuri de configurare explicite și adiționale, în loc să suprasarcinați `fromNumber` sau să stocați date structurate într-un șir de cheie API:

| Câmp | Scop propus |
|---|---|
| `accountSid` | Identificatorul contului/proiectului Twilio, deținut de biserică (`AC…`) |
| `apiKey`, `apiSecret` | SID-ul cheii API Twilio dedicate (`SK…`) și secretul pentru accesul API de ieșire; criptate și mascate |
| `webhookAuthToken` | Auth Token-ul contului, folosit de SDK-ul Twilio pentru validarea semnăturilor primite; criptat și mascat separat |
| `messagingServiceSid` | Messaging Service-ul bisericii (`MG…`, 34 de caractere) |
| `fromNumber` | Numărul selectat, compatibil cu SMS, în format E.164, verificat ca expeditor în contul/serviciul respectiv |
| Configurarea programului | ID-ul stabil al programului, numele, scopurile permise, URL-urile de înscriere/politică și versiunea declarației |

Twilio [preferă cheile API pentru autentificarea REST](https://www.twilio.com/docs/iam/api-keys). Folosiți cele mai restrânse permisiuni de cheie testate care acoperă trimiterea și verificările de configurare doar-citire necesare. Auth Token-ul contului este încă necesar pentru [verificarea standard a semnăturii webhook Twilio](https://www.twilio.com/docs/usage/security). Explicați această distincție în interfață: secretul API nu este un Auth Token de webhook. Păstrați credențialele exclusiv în depozitul de setări de pe server, niciodată în pagini publice, răspunsuri de formular, cereri de trimitere din browser sau în problemele de suport.

Biserica creează și gestionează aceste resurse în Console. Acțiunea de validare din B1 trebuie doar să citească serviciul, expeditorii și informațiile de înregistrare configurate. Nu trebuie să cumpere numere, să creeze campanii, să modifice setările Twilio sau să trimită un mesaj de test ca efect secundar. Furnizați o acțiune separată și explicită de trimitere de test, limitată la un destinatar eligibil care și-a dat consimțământul.

Păstrați credențialele mascate doar la editarea aceluiași furnizor salvat. Trecerea la Twilio trebuie să necesite propriile credențiale și să șteargă valorile vechi specifice furnizorului. Nu transferați o cheie mascată Clearstream sau Nalo într-o configurație Twilio.

Limitați fiecare încărcare sau actualizare la biserica B1 autentificată. Legați callback-urile de o integrare salvată și de contul, serviciul și expeditorul Twilio așteptate, și respingeți atribuirile conflictuale între biserici. Rotația credențialelor și deconectarea furnizorului trebuie să invalideze starea de pregătire și să suspende trimiterile din coadă, fără a șterge consimțământul sau istoricul livrărilor.

## Consimțământul și suprimarea sunt lucrări obligatorii de lansare

Introduceți înregistrări de abonare legate de telefon pentru programul Twilio, plus evenimente de consimțământ și suprimare doar-adăugare. Dovezile minime sugerate sunt: ID-ul bisericii, ID-ul programului, telefonul normalizat, asocierea opțională verificată cu o persoană, acțiunea afirmativă, ID-ul formularului/trimiterii sursă sau dovada externă verificată, marca temporală a serverului, textul/versiunea declarației, URL-ul sursă, URL-urile politicilor și evenimentele de retragere sau reluare. Limitați accesul și păstrarea datelor conform politicii existente de securitate a datelor bisericii.

Folosiți stări precum `unknown`, `pending`, `active` și `suppressed`. Numerele de telefon existente, contactele importate, prezența, donațiile, apartenența la grup, `person.optedOut = false` și `allowSms` nu reprezintă consimțământ afirmativ pentru program. Importul consimțământului documentat trebuie să fie o acțiune autorizată, auditată, cu o sursă înregistrată. O migrare nu trebuie să înscrie pe toată lumea.

Pentru fluxul web inițial, folosiți modul standard de formular public al B1. Adăugați o întrebare de consimțământ SMS configurată explicit, care începe nebifată, rămâne opțională, afișează linkuri de politică pe care se poate da clic și se mapează la un singur program și un singur câmp de telefon mobil. Validați această mapare pe server și salvați instantaneu declarația afișată atunci când se salvează un răspuns afirmativ. Nu derivați niciodată consimțământul din etichete arbitrare ale întrebărilor, din inteligența artificială conversațională sau din apartenența la un flux de lucru. Activați un echivalent conversațional doar după ce interacțiunea afirmativă explicită și înregistrarea dovezilor au fost testate.

Un formular trimis fără bifă nu creează nicio abonare și nu trebuie să retragă consimțământul existent al altcuiva. Legați consimțământul de telefonul trimis; personalul poate rezolva asocierile ambigue cu persoane fără a îmbina gospodăriile. Un număr de telefon mobil schimbat necesită propriul consimțământ. Pentru formularele anonime, aplicați controale împotriva abuzului și faceți explicită orice verificare a proprietății numărului sau pasul de confirmare dublă. O casetă bifată nu dovedește singură cine deține telefonul. Dacă se folosește confirmarea, lăsați abonarea în starea „pending” până la finalizare și descrieți acest flux exact în materialele de înscriere.

Pentru Twilio, separați suprimarea SMS de vizibilitatea din director. Migrați conservator orice dezabonare veche într-o înregistrare de suprimare; lăsați ceilalți destinatari vechi în starea `unknown`. O înscriere nouă, explicită și documentată poate stabili consimțământul SMS, în timp ce confidențialitatea din director rămâne neschimbată. Păstrați comportamentul celorlalți furnizori până când migrările lor sunt revizuite separat.

La fiecare trimitere efectivă, cereți ca integrarea bisericii să fie activată și pregătită, să existe consimțământul actual pentru programul pentru telefonul exact, să nu existe suprimare la nivel de telefon și permisiunea existentă a apelantului. Memento-urile respectă în plus `allowSms`, preferințele pe categorii și orele de liniște. Verificați din nou după punerea în coadă, rezolvați câmpurile de îmbinare, normalizați și validați numerele, și eliminați duplicatele după telefon. STOP suprimă toate trimiterile pentru serviciu sau program, inclusiv trimiterile manuale și fluxurile de lucru; trebuie să acopere și fiecare persoană care împarte acel telefon.

Afișați identitatea bisericii și instrucțiunea STOP în mod consecvent în calea comună de trimitere Twilio și previzualizați numărul final de caractere și segmente SMS. Extinderea câmpurilor de îmbinare și gestionarea lungimii trebuie să păstreze aceste elemente; nu trunchiați în tăcere instrucțiunea de dezabonare. Păstrați exemplele și șabloanele efective pentru memento-uri și fluxuri de lucru aliniate.

## Trimiteri Twilio, răspunsuri și starea livrării

Implementați `TwilioProvider.sendMessage` prin Messages API, cu Messaging Service-ul și expeditorul selectate. Returnați un SID al mesajului furnizorului și un rezultat acceptat sau trimis. Acceptarea HTTP nu înseamnă livrare pe dispozitivul destinatarului. O trimitere de grup folosește rezultate per destinatar, în ordinea datelor de intrare.

Limitați concurența trimiterilor de ieșire pentru **atât** `sendBulk`, cât și trimiterile individuale: ramura actuală de îmbinare a câmpurilor trimite apeluri `sendMessage` în paralel. Persistați intenția de trimitere și lucrul revendicabil pentru grupurile care nu încap într-un buget de cerere. Reutilizați modelul de implementare existent, în loc să cereți bisericilor să ruleze un alt serviciu. Reîncercați erorile tranzitorii sau cunoscute de limitare a ratei, cu backoff. Tratați expirările ambigue ca rezultate necunoscute care trebuie reconciliate, nu ca o instrucțiune de retrimitere oarbă, care riscă mesaje și taxe duplicate.

Configurați URL-uri de callback pentru mesajele primite și pentru starea, specifice bisericii. Validați `X-Twilio-Signature` cu SDK-ul, URL-ul extern exact configurat, parametrii originali ai formularului și Auth Token-ul contului corespunzător. Un URL secret singur nu este suficient. Asociați callback-urile cu înregistrările salvate ale bisericii, contului și mesajului. Tratați duplicatele și callback-urile care sosesc înainte ca rezultatul trimiterii să fie salvat, și împiedicați evenimentele mai vechi să suprascrie o stare terminală. Returnați TwiML gol pentru confirmarea unui mesaj primit și un răspuns de succes adecvat pentru evenimentele de stare. [Securitatea Twilio](https://www.twilio.com/docs/usage/security), [callback-urile de stare](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Recomandăm **Advanced Opt-Out** pentru Messaging Service. Twilio gestionează confirmările STOP, START și HELP; B1 consumă evenimentele autentificate `OptOutType` fără a trimite confirmări duplicate. STOP înregistrează imediat suprimarea. START restabilește doar o abonare cunoscută la acest același program declarat, cu un eveniment nou de reluare. Nu trebuie să înscrie un telefon nou în mesagerie nerelaționată și nu trebuie să activeze preferințe pentru memento-uri. HELP nu înscrie pe nimeni. Celelalte răspunsuri primite rămân în afara domeniului casetei de mesaje B1; bisericile au nevoie de o modalitate documentată de a le monitoriza în Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Stocați SID-ul mesajului Twilio, legarea contului și serviciului, ora trimiterii, starea finală sau codul de eroare și ora callback-ului, alături de jurnalul de livrare. Afișați cu acuratețe starea „în coadă/acceptat”, „livrat”, „eșuat”, „nelivrat” sau „necunoscut”. Păstrați contractul de răspuns existent pentru ceilalți furnizori și definiți dacă numărătoarele agregate de succes reprezintă trimiterea sau livrarea.

## Verificarea pregătirii configurării și a aprobării

Afișați puncte de control distincte pentru credențiale, proprietatea serviciului și a expeditorului, verificarea campaniei, înregistrarea numărului, verificările webhook și un test de fum livrat. Nu afișați niciodată o singură insignă verde „aprobat” doar pentru că credențialele funcționează.

Pentru numerele locale US, citiți [resursa de campanie Usa2p](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) a serviciului și cereți ca campania relevantă să fie `VERIFIED`. Verificați separat că telefonul selectat este asociat cu acel serviciu și că și-a încheiat înregistrarea numărului: o campanie aprobată poate avea totuși un număr în așteptare. Acolo unde o interfață de citire acceptată nu expune un semnal necesar, afișați **este necesară verificarea manuală în Console** și înregistrați confirmarea datată a administratorului bisericii drept atare. Nu o etichetați ca verificată prin API. Evenimentele automate de înregistrare a numărului pot fi o continuare ulterioară. [Erori de înregistrare a numărului](https://www.twilio.com/docs/api/errors/30035), [evenimente de înregistrare A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Cereți verificări actuale înainte de activarea trimiterilor. Înregistrați când și cum a fost verificată starea de pregătire, expirați verificările vechi și suspendați trimiterile la credențiale revocate, expeditori modificați, erori de înregistrare sau erori persistente ale contului. Livrarea unui test de fum confirmă doar calea testată, nu aprobarea universală a operatorilor de telefonie mobilă sau consimțământul destinatarului. Schița companion specifică verificările bisericii dinaintea trimiterii, dinaintea lansării și operaționale continue.

## Planul de depozit și lansare

[Ghidul de contribuție al organizației](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) direcționează solicitările de funcționalități pentru B1 către ChurchAppsSupport și implementările către depozitele responsabile. Folosiți o singură solicitare centrală de funcționalitate și legați PR-urile de implementare focalizate de aceasta:

1. **ChurchAppsSupport:** revizuiți acest proiect și schița sa de configurare înainte de a prezenta Twilio drept o funcționalitate disponibilă utilizatorilor.
2. **Packages:** adăugați adaptorul Twilio, configurația și interfețele partajate explicite, și randarea formularului de consimțământ SMS acolo unde este partajat de B1Admin și B1App. Includeți changeset-uri și publicați prin fluxul de lansare existent înainte de a actualiza consumatorii.
3. **Api:** adăugați migrări aditive pentru metadatele integrării, consimțământ și suprimare, și stările livrării. Implementați validarea configurării, porțile comune de trimitere, captura dovezilor din formular, gestionarea webhook-urilor și persistența expedierii.
4. **B1Admin:** adăugați interfața de configurare și pregătire Twilio, gestionarea programelor și a consimțământului, salvarea expeditorului conștientă de furnizor și raportarea precisă a livrării. Nu expuneți nicio derogare a consimțământului SMS prin editările obișnuite ale persoanelor.
5. **B1App:** verificați experiența paginii și a formularului public, precum și a linkurilor de politică, în raport cu controalele partajate, inclusiv pentru vizitatorii anonimi și cei de pe mobil. Nu este necesar un client browser Twilio separat.
6. **ChurchAppsSupport:** după lansare, transformați schița de configurare în pagini de setări și ajutor suportate, adăugați capturi de ecran reale, creați un link din setările Texting și organizați traducerile.

Implementați schema și pachetele partajate înaintea consumatorilor. Păstrați Twilio restricționat prin funcționalități pentru un pilot mic, cu participare voluntară; furnizorii existenți trebuie să funcționeze în continuare. Revenirea trebuie să dezactiveze expedierea Twilio și să anuleze joburile neexpediate, păstrând dezabonările și dovezile. Nu trebuie să comute automat destinatarii la alt furnizor sau alt expeditor.

## Estimarea efortului

Estimare de planificare pentru un contributor familiarizat cu ecosistemul. Nu s-au folosit credențiale de producție și nu s-au trimis SMS-uri reale în această evaluare:

| Lucrare | Zile-dezvoltator |
|---|---|
| Adaptor, extinderi de configurare și schemă, interfață de setări | 2–3 |
| Consimțământ pe telefon și program, suprimare independentă, porți comune de trimitere, integrare cu formularul public | 3–5 |
| Callback-uri semnate, persistența livrării, expediere limitată și durabilă | 2–3 |
| Interfață de pregătire, ghid pentru biserică, testare de integrare și regresie, remedieri pilot | 3–4 |
| **Domeniul recomandat pentru lansare** | **10–15 în total** |

O dovadă de concept de bază pentru adaptor și setări are aproximativ 1–2 zile. O estimare doar pentru expeditor exclude lucrările de consimțământ și de configurare necesare pentru această recomandare. Timpul extern de revizuire Twilio și al operatorilor de telefonie este separat și variabil. Proiectul nu trebuie să promită o dată de aprobare sau un rezultat al aprobării.

## Criterii de acceptare

- [ ] Biserica deține și plătește contul, serviciul, expeditorul înregistrat și campania. Nu este necesar un cont Twilio gestionat de ChurchApps.
- [ ] Credențialele sunt criptate și mascate, limitate la chiriaș, rotibile și absente din jurnale sau din conținutul public. Validarea este doar-citire.
- [ ] Consimțământul opțional nebifat afișează linkuri reale către politici și salvează pe server dovezile programului, ale telefonului și ale declarației. Refuzul permite în continuare acțiunea principală a formularului.
- [ ] Toate căile manuale, de grup, cu câmpuri de îmbinare, din fluxuri de lucru și de memento-uri aplică aceeași poartă de eligibilitate Twilio. Destinatarii necunoscuți, fără consimțământ, cu telefon schimbat sau suprimați sunt omiși cu un motiv util. Randarea păstrează identitatea bisericii și instrucțiunile STOP după extindere și gestionarea lungimii.
- [ ] Confidențialitatea veche din director nu înscrie destinatari. STOP și START nu modifică niciodată vizibilitatea din director sau preferințele nerelaționate. Cazurile cu telefon partajat și cele între biserici sunt testate.
- [ ] Sunt acoperite STOP, START și HELP semnate, semnăturile invalide, conturile și serviciile greșite, evenimentele duplicate, retrimiterile de formulare și mapările de consimțământ falsificate.
- [ ] Dimensiunea grupului, expirările, limitele de rată, eșecul parțial, rezultatele ambigue, cursele callback-urilor și evenimentele de livrare în afara ordinii sunt testate fără trimiteri duplicate.
- [ ] Aprobarea campaniei și înregistrarea finalizată a numărului sunt distincte de validarea credențialelor. Dovezile manuale sunt etichetate clar. Pregătirea expirată sau revocată blochează trimiterile.
- [ ] O biserică-pilot verifică pagina sa de înscriere, căile de formular acceptate și refuzate, URL-urile exacte ale politicilor și un destinatar de test care și-a dat consimțământul, de la trimitere, livrare și suprimare STOP până la reabonarea permisă.
- [ ] Setările și comportamentul de trimitere existente pentru Clearstream, Text In Church și Nalo trec verificările de regresie. Textele de ajutor fac distincția între propuneri și funcționalități lansate.
