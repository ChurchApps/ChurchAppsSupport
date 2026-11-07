---
title: "Setările bisericii"
description: "Setează numele, adresa, subdomeniul, fusul orar, formatul regional, furnizorul de SMS și stocarea fișierelor în pagina Church Settings din B1 Admin."
---

# Setările bisericii

<div class="article-intro">

Pagina Setările bisericii este locul unde configurezi informațiile de bază ale bisericii tale, datele de contact și identitatea vizuală. Aceste detalii sunt folosite în toate instrumentele ChurchApps, inclusiv pe site-ul tău B1.church și în aplicația B1 Mobile.

</div>

## Videoclip de instruire

<YouTube id="634zSbzDkYA" title="Configurarea informațiilor și a identității vizuale a bisericii în B1" next="Roluri, permisiuni și invitarea echipei tale în B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Ai nevoie de permisiunea „Edit Church Settings”. Consultă [Roluri și permisiuni](./roles-permissions.md) dacă nu ai acces.
- Pregătește adresa, datele de contact și logo-ul bisericii tale

</div>

## Editarea informațiilor despre biserică

1. În B1 Admin, deschide [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus-stânga), extinde **Settings** și apasă pe **Settings**.
2. În secțiunea **Church Information** (în partea de sus a paginii), apasă pe **Edit**.
3. Actualizează oricare dintre următoarele câmpuri:
   - **Church Name** -- Numele afișat în toate produsele ChurchApps.
   - **Address** -- Adresa fizică a bisericii tale.
   - **Contact Information** -- Număr de telefon, adresă de e-mail și alte date de contact.
   - **Time Zone** -- Fusul orar al bisericii tale. Consultă [Fusul orar](#time-zone) mai jos.
4. Apasă pe **Save** pentru a aplica modificările.

## Configurarea subdomeniului

Biserica ta primește un subdomeniu gratuit, la **yourchurch.1.church**. Aceasta este adresa web la care membrii și vizitatorii pot accesa prezența online a bisericii tale.

1. Pe pagina Settings, apasă pe **Edit** în secțiunea **Church Information** și găsește câmpul **Subdomain**.
2. Introdu subdomeniul dorit (de exemplu „gracechurch” pentru gracechurch.1.church).
3. Salvează modificările.

:::info
Subdomeniul tău trebuie să fie unic în toate bisericile ChurchApps. Dacă numele dorit este deja folosit, încearcă să adaugi orașul sau statul (de exemplu „gracechurch-dallas”).
:::

Dacă vrei ca vizitatorii să ajungă pe site-ul tău prin propriul domeniu (de exemplu **`www.gracechurch.org`**), consultă [Domeniu personalizat](./custom-domain.md).

## Configurarea identității vizuale

Personalizează modul în care biserica ta apare în toate instrumentele ChurchApps:

1. Încarcă **logo-ul bisericii** apăsând pe zona logo-ului și selectând un fișier imagine.
2. Adaugă orice **imagini ale bisericii** suplimentare folosite pe site-ul tău web și în [aplicația mobilă](./mobile-app.md).

:::tip
Pentru rezultate optime, folosește un logo cu fundal transparent, în format PNG. Acest lucru asigură un aspect bun atât pe fundaluri deschise, cât și pe cele închise.
:::

## Prima zi a săptămânii

Alege ziua în care încep calendarele tale. Meniul derulant **First Day of Week** din secțiunea Church Info are implicit valoarea **Sunday**, dar poate fi setat pe orice zi. Odată schimbată, această setare este respectată în grilele calendarelor din B1 Admin și din portalul pentru membri B1.church: calendarele grupurilor, calendarele curate și editorul de evenimente afișează săptămânile începând cu ziua pe care o alegi.

## Fusul orar

Meniul derulant **Time Zone** din secțiunea **Church Information** stabilește fusul orar al bisericii tale (de exemplu *America/Chicago*). Alege **None** pentru a lăsa câmpul gol. După salvare, fusul orar apare în rezumatul Church Information.

B1 folosește acest fus orar pentru orele la nivel de biserică, cum ar fi mementourile pentru evenimente și programele afișate pe televizoarele tale [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Programele de check-in](../attendance/setup.md#setting-a-check-in-schedule) sunt măsurate mai întâi în fusul orar al [campusului](./campuses.md) în care are loc serviciul și folosesc fusul orar al bisericii doar dacă campusul nu are unul. Dacă toate campusurile tale sunt în același fus orar, setează-l atât pentru biserică, cât și pentru fiecare campus.

## Regiunea (formatul datelor și al numerelor de telefon)

Setarea **Region** controlează modul în care sunt scrise datele și orele în toată aplicația B1. Implicit, datele folosesc formatul din Statele Unite (de exemplu „Sep 28, 2026” și „9/28/2026”). Bisericile din afara SUA pot trece la propriul format. De exemplu, dacă alegi English (United Kingdom), vor apărea „28 Sept 2026” și „28/09/2026”.

1. Pe pagina Settings, apasă pe **Region** din lista din stânga, apoi apasă pe **Edit** în secțiunea **Region**.
2. Alege regiunea din meniul derulant **Region**. Fiecare opțiune afișează o dată de exemplu, pentru a vedea exact cum vor arăta datele.
3. Apasă pe **Save**.

Secțiunea Region afișează apoi regiunea selectată, un exemplu al **Date format** și formatul **Phone numbers**.

### Formatul numerelor de telefon

Aceeași secțiune Region conține setarea **Phone numbers**, care controlează modul în care sunt introduse numerele de telefon în fișa unei persoane:

- **International (with country code)** -- implicit. Câmpurile de telefon afișează un selector cu steagul țării și salvează numerele cu prefixul țării (de exemplu +1 918 555 1234).
- **Local (as typed)** -- câmpurile de telefon devin casete de text simple și salvează numerele exact cum le scrii, fără prefix de țară (de exemplu 0701 234 5678). Alege această opțiune dacă biserica ta scrie numerele într-un format local și nu dorești ca B1 să adauge un prefix de țară.

Când este selectată opțiunea **Local**, secțiunea Region afișează și „Local phone numbers” lângă regiunea ta.

:::tip
Mesajele text funcționează cel mai bine atunci când numerele includ prefixul țării. Dacă trimiți mesaje text din B1, păstrează formatul **International** sau asigură-te că numerele introduse în modul Local includ prefixul țării.
:::

Regiunea ta se aplică datelor și orelor din B1 Admin și de pe site-ul tău B1.church și din portalul pentru membri, inclusiv predici, postări de blog, calendarele grupurilor și planurile de servire, astfel încât membrii văd datele în același format ca personalul tău.

## Mesaje text {#texting}

Conectează un furnizor de mesaje text pentru a trimite SMS-uri unei persoane sau unui întreg grup din B1 Admin. Mesajele sunt trimise prin contul tău la furnizor, așa că se aplică tarifele și limitele acestuia.

1. Pe pagina Settings, apasă pe **Texting** din lista din stânga, apoi apasă pe **Edit** în secțiunea **Texting**.
2. Alege un **Provider**:
   - **Clearstream** -- introdu o **API Key**. Creeaz-o din setările contului tău Clearstream, la secțiunea API Keys.
   - **Text In Church** -- introdu o **API Key**. Cere mai întâi acces API pentru dezvoltatori de la Text In Church Support, apoi creează o cheie în secțiunea Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- introdu cheia de autentificare din contul tău Nalo Solutions ca **API Key** și un **Sender ID** (până la 11 caractere) aprobat de Nalo pentru tine.
   - **Twilio** -- folosește propriul cont Twilio al bisericii; Twilio te facturează direct. Copiază **Account SID** și **Auth Token** din [Twilio Console](https://console.twilio.com) și introdu un **From Number** -- un număr de telefon Twilio înregistrat pentru A2P 10DLC, într-un format de tipul `+15551234567`. După salvare, lipește adresa webhook pentru mesajele primite (vezi mai jos) în câmpul **A message comes in** al numărului din Twilio, astfel încât răspunsurile STOP să fie înregistrate și în B1.
3. Apasă pe **Save**.

Pentru a opri trimiterea de mesaje text, setează **Provider** pe **None** și salvează. Acest lucru elimină furnizorul salvat.

### Dezabonarea persoanelor care răspund STOP

Odată ce un furnizor este salvat, redeschide secțiunea Texting cu **Edit**. Sub setările furnizorului, un câmp numai pentru citire, **Inbound (STOP) webhook URL**, afișează o adresă web unică pentru biserica ta. Apasă pe câmp pentru a selecta adresa, copiaz-o și lipește-o în setarea de webhook pentru mesajele primite (răspunsuri) a furnizorului tău de mesaje text. Acest lucru funcționează cu oricare dintre furnizorii de mai sus care pot redirecționa răspunsurile primite către un webhook.

După aceasta, când cineva răspunde **STOP** (sau STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT sau REVOKE) la unul dintre mesajele tale, B1 găsește toate persoanele al căror număr de telefon mobil se potrivește, le marchează ca dezabonate și dezactivează mementourile lor prin mesaje text. Ulterior, acestea sunt omise din mesajele trimise grupurilor. Celelalte răspunsuri sunt ignorate.

:::info
Acest lucru folosește aceeași setare de dezabonare ca **Hide me from the member directory**, astfel încât persoanele care răspund STOP apar și ca **Hidden from directory** în profilul lor. Câmpul apare doar când este selectat furnizorul salvat -- dacă schimbi meniul derulant pe alt furnizor, salvează mai întâi pentru a vedea din nou adresa URL.
:::

Odată ce un furnizor este conectat, membrii personalului care au permisiunea de a trimite mesaje text văd un buton **Text** pe pagina unui grup (**Text this group**) și a unei persoane care are un telefon mobil (**Send text message**). Scrie mesajul și apasă pe **Send**. Fereastra numără caracterele și segmentele SMS. Pentru un grup, afișează câți membri vor primi mesajul înainte de trimitere:

- Membrii fără număr de telefon mobil înregistrat sunt omiși.
- Membrii care au ales **Hide me from the member directory** sunt considerați dezabonați și sunt omiși.
- Membrii unei familii care au același număr mobil primesc mesajul o singură dată.

### Personalizarea mesajelor cu câmpuri de îmbinare {#personalizing-texts-with-merge-fields}

Sub caseta mesajului, fereastra Text afișează butoane cu substituenți: **First Name**, **Last Name**, **Display Name** și **Church Name**. Apasă pe un buton pentru a insera substituentul corespunzător (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` sau `{{churchName}}`) la poziția cursorului. Când mesajul este trimis, fiecare substituent este înlocuit cu datele destinatarului, astfel încât un mesaj de grup de tipul `Hi {{firstName}}, see you Sunday!` ajunge la fiecare membru cu propriul nume. Substituenții funcționează atât pentru mesajele de grup, cât și pentru cele trimise unei singure persoane. Mesajele trimise unui grup oferă și un buton **Group Name** (`{{groupName}}`), care este înlocuit cu numele grupului.

Pentru a reutiliza un mesaj, salvează-l ca [șablon de mesaj text](./email-templates.md#text-templates) (un șablon de e-mail din categoria **Text**) și selectează-l din **Load Template (optional)**, în partea de sus a ferestrei Text.

:::info
Limita de 1.600 de caractere se aplică mesajului pe măsură ce îl scrii. După ce substituenții sunt completați, orice text care depășește 1.600 de caractere este tăiat la această lungime.
:::

Mesajele text pot fi trimise și automat dintr-un pas al unui [flux de lucru](../serving/workflows.md#sending-a-text), cu acțiunea **Send Text**, care folosește același furnizor și aceiași substituenți.

## Stocarea fișierelor

În mod implicit, fișierele pe care le încarci pe site-ul tău web (prin [Files](../website/files.md)) și în alte zone de conținut folosesc spațiul de stocare găzduit gratuit de B1, de până la 100 MB. Dacă ai nevoie de mai mult spațiu, poți conecta propriul serviciu de stocare în cloud. Noile încărcări vor merge direct în contul tău, fără limită impusă de platformă.

1. Pe pagina Settings, apasă pe **File Storage** din lista din stânga, apoi apasă pe **Edit** în secțiunea **File Storage**.
2. Alege un furnizor: **Google Drive**, **Dropbox**, **OneDrive** sau un **bucket compatibil S3** (AWS S3, Cloudflare R2, Backblaze B2 etc.).
3. Pentru Google Drive, Dropbox sau OneDrive, apasă pe **Connect** și autentifică-te pentru a autoriza accesul. Pentru un bucket compatibil S3, introdu cheia de acces, secretul, numele bucket-ului și baza URL publică.
4. Apasă pe **Save**.

:::info
Aceasta afectează doar noile încărcări în secțiunea Files a site-ului tău web și în zonele de conținut similare. Imaginile din galerie, miniaturile, logo-urile și fotografiile persoanelor rămân întotdeauna pe spațiul de stocare implicit al B1.
:::

## Promovarea în clasă

Dacă urmărești **Grade** (clasa) copiilor și elevilor, B1 poate să îi treacă automat pe toți cu o clasă mai sus, la o dată pe care o alegi (de exemplu 1 august), în loc să fie nevoie să editezi fiecare fișă manual.

1. Pe pagina Settings, apasă pe **Grade Promotion** din lista din stânga, apoi apasă pe **Edit** în secțiunea **Grade Promotion**.
2. Activează comutatorul (afișează **Enabled**) și alege **Month** și **Day** la care vor fi promovate clasele în fiecare an. În acea dată, toți cei cu o clasă trec cu o clasă mai sus, iar elevii din clasa a 12-a devin **Graduated**.
3. Salvează modificările.

Pentru a opri promovarea automată, dezactivează comutatorul, astfel încât să afișeze **Disabled**, și salvează. Data promovării este eliminată, iar clasele nu se vor mai schimba de la sine.

## Înscrierea voluntarilor {#volunteer-signup}

În mod implicit, membrii care consultă [înscrierile voluntarilor](../../b1-church/serving/volunteer-signup.md) văd fiecare săptămână viitoare cu posturi libere. Dacă lista devine lungă, poți afișa doar săptămâna următoare pentru fiecare tip de plan.

1. Pe pagina Settings, apasă pe **Volunteer Signup** din lista din stânga, apoi apasă pe **Edit** în secțiunea **Volunteer Signup**.
2. Activează opțiunea **Show only the next week of each plan type**.
3. Salvează modificările.

Cu această opțiune activă, fiecare tip de plan afișează doar planul său următor. Săptămâna următoare apare după ce trece data respectivă. Rândul **Weeks shown** din secțiune afișează **Only the next week of each plan type** sau **All upcoming weeks**.

## Confidențialitatea donațiilor {#giving-privacy}

Persoanele cu acces la donații văd, în mod normal, totalurile donațiilor unei persoane în [fișa persoanei](../people/adding-people.md#editing-details). Dacă preferi să nu fie afișate sumele de fiecare dată când se deschide o fișă, le poți ascunde până când cineva cere să le vadă.

1. Pe pagina Settings, apasă pe **Giving privacy** din lista din stânga, apoi apasă pe **Edit** în secțiunea **Giving privacy**.
2. Activează opțiunea **Hide giving on person records until clicked**.
3. Salvează modificările.

Cu această opțiune activă, cardul de donații de pe fișa unei persoane afișează textul „Giving is hidden on person records.” Apasă pe **Show giving** pentru a încărca și afișa donațiile persoanei respective. Acestea se ascund din nou când deschizi o altă persoană. Cine poate vedea donațiile nu se schimbă: doar persoanele cu acces la donații văd vreodată cardul.

## Import și export

Linkul **Import/Export** de sub numele bisericii tale de pe pagina Settings deschide un instrument dedicat într-o fereastră nouă a browserului. Folosește-l pentru a:

- Importa date despre membri dintr-un alt sistem de gestionare a bisericii.
- Exporta datele tale ChurchApps pentru backup sau migrare.

Acest lucru este util mai ales când îți configurezi biserica pentru prima dată și trebuie să transferi înregistrările existente în ChurchApps.

:::warning
Când importi date, fă mai întâi o copie de rezervă a înregistrărilor existente. Operațiunile de import adaugă date în sistem și pot crea intrări duplicate dacă sunt rulate de mai multe ori.
:::
