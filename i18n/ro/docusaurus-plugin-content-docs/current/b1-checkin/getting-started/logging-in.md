---
title: "Conectarea la B1 Church Checkin"
sidebar_label: "Conectare"
description: "Conectați-vă la aplicația kiosk B1 Church Checkin, alegeți biserica și aflați despre conectarea automată, setările de administrare și deconectarea de pe tableta de check-in."
---

# Conectare

<div class="article-intro">

Înainte ca kioscul să poată fi folosit pentru check-in, trebuie să vă conectați cu un cont ChurchApps care are acces la biserica dumneavoastră. Această pagină acoperă procesul de conectare la prima utilizare, selectarea bisericii, comportamentul conectării automate și modul de deconectare.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați B1 Church Checkin pe tableta dumneavoastră Android (consultați [Noțiuni de bază](./index.md))
- Pregătiți adresa de e-mail și parola contului ChurchApps
- Contul trebuie să aibă permisiunea **Checkin** (sau **Editare prezență**) la biserica dumneavoastră. Un administrator o adaugă în B1 Admin, la **Setări > Roluri** — consultați [Conturi pentru kiosc de check-in](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Prima conectare

1. Deschideți aplicația B1 Church Checkin. După ecranul de pornire, veți vedea ecranul de autentificare cu logo-ul B1 Church Checkin.
2. Introduceți **adresa de e-mail** în primul câmp.
3. Introduceți **parola** în al doilea câmp.
4. Atingeți butonul **Autentificare**.

Aplicația verifică datele dumneavoastră de conectare și vă autentifică. Dacă adresa de e-mail sau parola sunt incorecte, veți vedea un mesaj de eroare în partea de jos a ecranului.

Dacă pentru cont este activată [autentificarea în doi pași](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplicația va cere apoi un cod. Introduceți codul de 6 cifre din aplicația de autentificare a proprietarului contului sau unul dintre codurile sale de rezervă și atingeți din nou **Autentificare**. Aveți nevoie de cod doar la această primă conectare; după aceea, kioscul rămâne conectat.

:::info
Aceasta este aceeași adresă de e-mail și aceeași parolă pe care le folosiți pentru B1 Admin sau pentru orice alt produs ChurchApps. Nu aveți nevoie de un cont separat pentru kioscul de check-in.
:::

## Selectarea bisericii

După o conectare reușită, aplicația încarcă bisericile în care contul dumneavoastră are permisiunea **Checkin** sau **Editare prezență**. Bisericile în care aveți doar alte permisiuni nu sunt incluse. Dacă nu rămâne niciuna, aplicația afișează **Fără acces la check-in** și vă cere să îi rugați administratorul bisericii să adauge permisiunea Checkin la unul dintre rolurile dumneavoastră. Fiecare biserică este afișată ca o carte care arată numele bisericii și logo-ul (dacă a fost configurat în B1 Admin).

- Dacă contul dumneavoastră este asociat cu **o singură biserică**, veți vedea totuși ecranul de selecție. Atingeți biserica dumneavoastră pentru a continua.
- Dacă contul dumneavoastră este asociat cu **mai multe biserici**, atingeți biserica pe care doriți să o servească acest kiosc.

Odată ce selectați o biserică, aplicația încarcă identitatea vizuală și setările de aspect ale acelei biserici. Logo-ul bisericii dumneavoastră va apărea în antet pe toate ecranele următoare.

## Conectarea automată la vizitele ulterioare

După prima conectare reușită, aplicația păstrează pe tabletă un token de autentificare securizat și biserica selectată. Nu stochează parola dumneavoastră. La lansările următoare:

- Aplicația vă reconectează automat cu tokenul salvat.
- Dacă ați selectat anterior o biserică, aceasta este restaurată și veți fi dus direct la **ecranul serviciilor**.
- Dacă autentificarea salvată nu mai este valabilă, aplicația revine la ecranul de autentificare, ca să vă puteți conecta din nou.

:::tip
Deoarece kioscul se conectează automat, trebuie să introduceți datele de conectare doar o singură dată, în timpul configurării inițiale. După aceea, tableta poate fi pornită și va fi gata de utilizare.
:::

## Setările de administrare

Setările de administrare sunt ascunse intenționat, pentru ca membrii bisericii care folosesc kioscul să nu poată modifica din greșeală configurația. Pentru a le accesa:

1. Atingeți **logo-ul bisericii** din antet de **șapte ori**, în succesiune rapidă (în interval de două secunde).
2. Dacă a fost setat un PIN pentru kiosc, introduceți PIN-ul când vi se cere.
3. Se va deschide ecranul **Setări de administrare**, cu următoarele opțiuni:
   - **Schimbă serviciul** — comutați ora serviciului selectat
   - **Schimbă imprimanta** — deschideți [setările imprimantei](./printer-setup.md) pentru a căuta și selecta o imprimantă
   - **Setează PIN-ul de administrare** (sau **Schimbă PIN-ul de administrare** după ce a fost setat unul) — setați sau actualizați PIN-ul kioscului care protejează accesul de administrare
   - **Transmitere de urgență** — trimiteți mesaje text tutorilor fiecărei gospodării care a fost înregistrată (consultați [Transmitere de urgență](../check-in/checking-out.md#emergency-broadcast))
   - **Modul stație gestionată** — un comutator care adaugă la această stație check-out, apel, retipărire și editarea profilurilor (consultați [Efectuarea check-out-ului](../check-in/checking-out.md))
   - **Deconectare** — ieșiți din cont și reveniți la ecranul de autentificare

   Atingeți **Înapoi la kiosc** pentru a reveni la check-in.

:::warning
Deconectarea șterge toate datele de conectare salvate și selecția bisericii. Va trebui să introduceți din nou adresa de e-mail și parola pentru a folosi din nou kioscul. Deconectați-vă doar atunci când trebuie să schimbați contul sau să reconfigurați kioscul.
:::

## Pașii următori

Odată conectat, puteți [configura o imprimantă](./printer-setup.md) sau puteți merge direct la [fluxul de lucru pentru check-in](../check-in/index.md).
