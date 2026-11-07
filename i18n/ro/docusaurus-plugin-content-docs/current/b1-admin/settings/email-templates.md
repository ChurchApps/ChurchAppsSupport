---
title: "Șabloane de e-mail"
description: "Configurează șabloane de email și SMS în B1 Admin, cu câmpuri de completare, opțiuni de mesaje text și previzualizări pentru comunicarea în masă."
---

# Șabloane de e-mail

<div class="article-intro">

Șabloanele de e-mail vă permit să salvați conținut de e-mail reutilizabil -- un mesaj de bun venit, un memento pentru un eveniment, o mulțumire pentru donație -- ca să îl puteți trimite (sau să îl poată trimite un [flux de lucru](../serving/workflows.md)) dintr-un singur clic, în loc să îl scrieți de la zero de fiecare dată. Aceeași listă conține și șabloane de mesaje text pentru ferestrele de SMS ale grupurilor și ale persoanelor.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de acces la zona Setări din B1 Admin.

</div>

## Accesarea șabloanelor de e-mail

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus) și extindeți **Setări**.
2. Faceți clic pe **Șabloane de e-mail**.
3. Veți vedea o listă cu șabloanele existente, cu subiectul, categoria și data ultimei modificări.

## Crearea unui șablon

1. Faceți clic pe **Șablon nou**.
2. Introduceți un **Nume șablon** pentru a-l identifica în listă și alegeți o **Categorie** (General, Evenimente, Grupuri, Donații, Bun venit sau Text) pentru a vă ajuta să vă organizați șabloanele. Alegeți **Text** dacă doriți să creați un șablon de mesaj text (consultați mai jos secțiunea [Șabloane de text](#text-templates)).
3. Introduceți linia de **Subiect**.
4. Scrieți **Conținutul** folosind editorul de text îmbogățit.
5. Faceți clic pe **Salvează**.

## Câmpuri de îmbinare

Faceți clic pe un cip de câmp de îmbinare deasupra câmpului Subiect sau Conținut pentru a-l insera la cursor -- mai întâi faceți clic în text, în locul unde doriți câmpul, apoi faceți clic pe cip. Cursorul rămâne pe loc, astfel încât puteți continua să scrieți imediat după câmpul inserat. Dacă faceți clic pe un cip din Conținut fără să fi făcut clic mai întâi în text, câmpul va fi adăugat la sfârșitul conținutului. Când e-mailul este trimis, fiecare câmp de îmbinare este înlocuit cu informațiile reale ale destinatarului:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Numele destinatarului
- `{{email}}` -- Adresa de e-mail a destinatarului
- `{{churchName}}` -- Numele bisericii dumneavoastră

## Șabloane de text

Un șablon din categoria **Text** este un mesaj simplu, destinat trimiterii prin SMS, nu prin e-mail:

- Nu are subiect. Editorul de text îmbogățit este înlocuit cu o casetă simplă **Mesaj text**, care acceptă până la 1.600 de caractere.
- Cipurile de câmpuri de îmbinare de deasupra casetei inserează `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` sau `{{churchName}}` la cursor.
- Șabloanele de text apar în selectorul **Încărcați un șablon (opțional)** din fereastra de SMS a unui [grup](../groups/group-members.md#texting-group-members) sau a unei singure persoane. Alegerea unui șablon completează mesajul, iar dumneavoastră îl puteți modifica înainte de trimitere.
- Ele nu apar în selectoarele de șabloane de e-mail, inclusiv în acțiunea **Trimite e-mail** din fluxurile de lucru.

Trimiterea de mesaje text necesită un [furnizor de SMS](./church-settings.md#texting) conectat.

## Previzualizarea unui șablon

Faceți clic pe **Previzualizare** pentru a vedea cum vor arăta subiectul și conținutul, cu date de exemplu completate în locul câmpurilor de îmbinare, înainte de a salva sau trimite.

## Utilizarea unui șablon

Șabloanele salvate pot fi selectate atunci când compuneți un e-mail către persoane sau către un grup și pot fi folosite ca acțiune în [Fluxurile de lucru](../serving/workflows.md). Înainte ca biserica dumneavoastră să le poată trimite, echipa ChurchApps trebuie să aprobe o singură dată utilizarea e-mailului de grup. Consultați [Activarea e-mailului de grup pentru biserica dumneavoastră](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editarea și ștergerea

Faceți clic pe pictograma **Editare** de lângă un șablon pentru a-l actualiza sau pe pictograma **Șterge** pentru a-l elimina definitiv.

## Pașii următori

- [Fluxuri de lucru](../serving/workflows.md) -- Declanșați automat trimiterea unui e-mail pe baza unui șablon, în funcție de reguli
