---
title: "Configurarea donațiilor online"
description: "Conectați Stripe, PayPal, Kingdom Funding sau Paystack la B1 Admin, ca membrii să doneze online prin site-ul B1.church, iar darurile să se sincronizeze."
---

# Configurarea donațiilor online

<div class="article-intro">

B1 Admin se integrează cu **Stripe**, **PayPal**, **Kingdom Funding** și **Paystack** (pentru bisericile din Africa), astfel încât membrii bisericii să poată dona online prin site-ul dvs. B1.church. Odată configurate, donațiile online apar automat în evidențele dvs. de donații, alături de darurile introduse manual, păstrând totul într-un singur sistem.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați [fondurile de donații](funds.md) pentru ca donatorii să își poată desemna darurile
- Creați un cont Stripe la [stripe.com](https://stripe.com) și activați-l (scoateți-l din modul de test)
- Pregătiți datele de autentificare în B1 Admin

</div>

## Configurarea Stripe

1. Creați un cont la [stripe.com](https://stripe.com) dacă nu aveți deja unul. Asigurați-vă că **activați contul** și că îl scoateți din modul de test.
2. În Stripe, accesați **Developers > API Keys**.
3. Copiați **Publishable Key** (cheia publicabilă).
4. Autentificați-vă în [B1 Admin](https://admin.b1.church/).
5. Accesați **Settings** și deschideți secțiunea **Giving**.
6. Faceți clic pe **Edit** în secțiunea **Giving**.
7. Setați **Provider** la **Stripe**.
8. Lipiți cheia publicabilă în câmpul **Public Key**.
9. Reveniți în Stripe și afișați **Secret Key** (cheia secretă). Aceasta poate fi vizualizată o singură dată, așa că salvați o copie de siguranță.
10. Lipiți cheia secretă în câmpul **Secret Key** și faceți clic pe **Save**.

:::warning
Cheia secretă Stripe este afișată o singură dată. Copiați-o într-un loc sigur înainte de a părăsi panoul Stripe. Dacă o pierdeți, va trebui să generați o cheie nouă.
:::

## Alegerea monedei

După selectarea Stripe ca furnizor, lângă cheile API apare un meniu derulant **Currency**. Alegeți moneda care corespunde monedei de decontare a contului dvs. Stripe, pentru ca donațiile să fie debitate corect.

Monedele acceptate includ USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN și BRL. Puteți confirma sau modifica moneda implicită a contului în [Panoul Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
Moneda selectată aici este utilizată pentru donațiile unice, abonamentele recurente, calculul comisioanelor și rapoartele de donații. Dacă schimbați moneda ulterior, doar donațiile și abonamentele noi vor folosi noua monedă. Darurile recurente existente continuă în moneda în care au fost create.
:::

:::warning
Asigurați-vă că contul Stripe este configurat să accepte moneda aleasă. Dacă contul dvs. Stripe nu acceptă moneda selectată, donațiile vor eșua la finalizarea plății.
:::

## Apple Pay și Google Pay

Bisericile care folosesc Stripe primesc automat butoane Apple Pay și Google Pay pe pagina publică de donații. Butoanele apar deasupra câmpurilor pentru card, pentru daruri unice, odată ce donatorul a ales un fond și o sumă, și numai dacă browserul sau dispozitivul donatorului are configurat un portofel digital. Darurile recurente folosesc în continuare câmpurile pentru card sau pentru contul bancar.

Google Pay nu necesită nicio configurare. Apple Pay necesită ca domeniul paginii dvs. de donații să fie înregistrat la Stripe; B1 îl înregistrează prima dată când se încarcă pagina de donații pe domeniul dvs. Dacă butonul Apple Pay nu apare pe un iPhone, verificați **Settings > Payment method domains** în Panoul Stripe și confirmați că domeniul dvs. `subdomeniul-dvs.b1.church` (sau cel personalizat) este listat și verificat.

## Donații anonime

Donatorii de pe pagina publică de donații pot bifa **Give anonymously** (Donează anonim). Un dar anonim este înregistrat fără un donator asociat, ajunge totuși la fondul ales de donator și apare ca **Anonymous** (Anonim) în loturile și rapoartele dvs. Adresa de e-mail a donatorului este tot necesară pentru a putea trimite chitanța, dar nu se creează nicio fișă de persoană. Darurile anonime sunt doar unice și nu apar în niciun extras de donații.

## Daruri recurente eșuate

Când un dar recurent prin Stripe eșuează (de exemplu, din cauza unui card expirat sau refuzat), plata eșuată apare sub **Donations > Failed Gifts** (Donații > Daruri eșuate), împreună cu donatorul, suma, data și motivul indicat de procesator. Faceți clic pe **Retry** (Reîncearcă) pentru a încerca din nou debitarea, după ce donatorul și-a actualizat metoda de plată.

B1 trimite, de asemenea, donatorului un e-mail când plata eșuează și din nou după trei și după șapte zile, dacă plata nu a trecut încă, cu un link pentru a-și actualiza metoda de plată în B1.church.

:::info
Dacă biserica dvs. a configurat Stripe înainte ca această funcție să existe, deschideți **Settings** > **Giving**, faceți clic pe edit și apoi pe **Save** o singură dată. Aceasta reîmprospătează webhook-ul Stripe, astfel încât plățile eșuate să fie raportate către B1.
:::

## Adăugarea unei pagini de donații pe site-ul B1.church

1. Accesați [b1.church](https://b1.church/) și autentificați-vă.
2. Faceți clic pe pictograma **Settings**.
3. Faceți clic pe **Add Tab** (Adaugă filă).
4. Alegeți **Donation** (Donație) ca tip.
5. Introduceți un nume pentru filă (de exemplu, „Dăruiește”) și faceți clic pe **Save**.
6. Opțional, schimbați pictograma filei. Scrieți „Giv” în căutarea de pictograme pentru a găsi o pictogramă legată de donații.

Pagina dvs. de donații este acum activă. Membrii o pot accesa la `subdomeniul-dvs.b1.church/donate`.

## Partajarea linkului dvs. de donații

Pentru a găsi adresa URL de donații, accesați **B1 Admin** și faceți clic pe pictograma **Settings** pentru a vedea subdomeniul dvs. Linkul de donații urmează formatul:

`https://subdomeniul-dvs.b1.church/donate`

Partajați acest link pe site-ul dvs. web, în e-mailuri sau în buletinul bisericii, pentru ca membrii să știe unde pot dona online.

### Linkuri cu fond și sumă presetate

Pentru a trimite donatorii direct către un anumit fond, accesați **Donations > Funds** și faceți clic pe **Giving Link** (Link de donație) lângă fond. Opțional, introduceți o sumă, apoi copiați linkul. Fereastra afișează și un cod QR pentru același link; faceți clic pe **Download PNG** pentru a-l salva pentru buletin, diapozitiv sau afiș. Când un donator deschide linkul sau scanează codul, fondul și suma sunt deja selectate pe pagina de donații. Linkul are forma:

`https://subdomeniul-dvs.b1.church/donate?fundId=FUND_ID&amount=25`

Aceiași parametri funcționează și pentru elementul **Donate Link** din constructorul de site-uri.

## Notificări de donații

Stripe trimite o notificare prin e-mail de fiecare dată când se primește o donație. Pentru a schimba adresa de e-mail pentru notificări, accesați panoul Stripe, faceți clic pe profilul dvs. din dreapta sus, alegeți **Profile** și actualizați adresa de e-mail.

## Opțiuni pentru comisioanele de procesare

Puteți configura pagina de donații astfel încât donatorii să poată opta pentru acoperirea comisioanelor de procesare, pentru ca biserica dvs. să primească întreaga sumă donată. Această setare se administrează în setările bisericii din B1 Admin.

:::tip
După configurare, faceți o donație de test de valoare mică pentru a confirma că totul funcționează înainte de a anunța donațiile online în comunitate.
:::

## Configurarea Kingdom Funding

Kingdom Funding este un procesator de plăți creștin care acceptă carduri de credit/debit și transferuri bancare ACH. Dacă biserica dvs. este înscrisă la Kingdom Funding, o puteți conecta ca furnizor de donații.

:::info
Integrarea cu Kingdom Funding este momentan în versiune beta. Contactați reprezentantul dvs. de cont B1 pentru a o activa pentru biserica dvs.
:::

1. Înscrieți-vă sau autentificați-vă la [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obțineți **Security Key** (cheia de securitate, publică) și **Private Key** (cheia privată) din portalul comercianților Kingdom Funding.
3. În B1 Admin, accesați **Settings**, deschideți secțiunea **Giving** și faceți clic pe edit.
4. Setați **Provider** la **Kingdom Funding**.
5. Lipiți cheia de securitate în câmpul **Security Key** și cheia privată în câmpul **Private Key**.
6. Introduceți **Webhook Key** primită de la Kingdom Funding și copiați URL-ul webhook afișat în setările dvs. de comerciant Kingdom Funding, astfel încât Kingdom Funding să poată notifica B1 despre tranzacțiile finalizate.
7. Salvați.

Odată conectată, membrii vor vedea pe pagina de donații un comutator card/bancă și pot dona cu cardul de credit sau prin transfer ACH.

## Butoanele PayPal și Venmo

Bisericile care folosesc **PayPal** ca furnizor au butoane **PayPal** și **Venmo** deasupra câmpurilor pentru card pe pagina de donații, pentru daruri unice. Donatorii care fac clic pe unul dintre ele finalizează plata într-o fereastră PayPal, iar darul este înregistrat ca orice altă donație online. Venmo apare doar pentru donatorii din Statele Unite, pe dispozitive considerate eligibile de PayPal. Darurile recurente folosesc în continuare câmpurile pentru card.

## Configurarea Paystack (Africa)

Stripe nu deschide conturi pentru bisericile din Ghana, Nigeria, Kenya, Africa de Sud sau Côte d'Ivoire. [Paystack](https://paystack.com) le deschide și acceptă carduri locale, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transfer bancar și USSD. Donatorii plătesc în moneda locală (GHS, NGN, KES, ZAR, XOF).

1. Înregistrați-vă la [paystack.com](https://paystack.com) cu certificatul de înregistrare al afacerii bisericii și cu un cont bancar local și finalizați procesul de activare (go-live) al Paystack.
2. În Panoul Paystack, deschideți **Settings → API Keys & Webhooks** și copiați **Public Key** și **Secret Key** (folosiți cheile live, nu cele de test).
3. În B1 Admin, accesați **Settings**, deschideți secțiunea **Giving** și faceți clic pe edit.
4. Setați **Provider** la **Paystack**, lipiți cheia publică și cheia secretă și alegeți **Currency** (moneda).
5. Copiați **webhook URL** afișat sub furnizor, reveniți în Panoul Paystack (**Settings → API Keys & Webhooks**) și lipiți-l în câmpul **Webhook URL**. Așa se înregistrează darurile recurente și plățile mobile money.
6. Salvați.

Donatorii își finalizează plata într-o fereastră Paystack securizată și pot alege acolo cardul, mobile money sau transferul bancar. Observații:

- **Darurile recurente** necesită card; plățile mobile money nu pot fi debitate automat din nou, așa că Paystack permite doar daruri unice prin mobile money.
- Darurile recurente Paystack pot fi anulate din B1, dar nu pot fi suspendate sau editate. Pentru a schimba suma, anulați și creați unul nou.
- Valorile implicite ale **Processing Fee** (comisionului de procesare) reflectă tarifele Paystack pentru carduri locale în moneda dvs.; modificați-le dacă tarifele negociate sunt diferite.

## Pașii următori

- Folosiți [Stripe Import](stripe-import.md) pentru a aduce tranzacțiile online în B1 Admin, dacă nu se sincronizează automat
- Verificați [Rapoartele de donații](donation-reports.md) pentru a confirma că donațiile online apar corect
- Generați [Extrasele de donații](giving-statements.md) care includ atât donațiile online, cât și cele offline
