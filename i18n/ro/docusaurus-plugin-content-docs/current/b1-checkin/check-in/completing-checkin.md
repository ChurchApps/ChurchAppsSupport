---
title: "Finalizarea check-in-ului"
description: "Finalizați check-in-ul unei familii la chioșcul din B1 Checkin, acoperind limitele camerelor, tipărirea etichetelor, codurile de securitate pentru ridicare și ce face aplicația în continuare."
---

# Finalizarea check-in-ului

<div class="article-intro">

Odată ce ați verificat gospodăria și ați făcut toate atribuirile de grupuri necesare, sunteți gata să finalizați check-in-ul. Acesta este ultimul pas din fluxul de lucru al chioșcului -- aplicația trimite prezența, tipărește etichetele și se resetează pentru următoarea familie.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- [Verificați gospodăria](./household-review.md) pe ecranul de verificare a gospodăriei
- [Atribuiți grupuri](./group-assignment.md) membrilor familiei care trebuie să se înscrie la o anumită clasă sau program
- Opțional, [adăugați oaspeții](./adding-guests.md) care vă însoțesc familia

</div>

## Cum se face check-in-ul

1. De pe **ecranul de verificare a gospodăriei**, atingeți butonul **Check-in** din partea de jos a ecranului.
2. Aplicația trimite datele de prezență către server și afișează un **ecran de succes** cu un semn de bifă verde și un mesaj de bun venit.

Atât trebuie făcut. Prezența familiei dumneavoastră a fost înregistrată.

Dacă una dintre persoanele selectate s-a înscris deja la această slujbă astăzi, mai întâi apare o fereastră **Deja înscris**, care le numește. Atingeți **Înscrie-te din nou** pentru a salva noile alegeri de grupuri sau **Anulare** pentru a reveni la ecranul gospodăriei.

## Camere pline și raportul voluntarilor

Dacă biserica dumneavoastră a configurat [limitele de siguranță](../../b1-admin/attendance/checkin-safety.md) pentru camerele sale, serverul le verifică înainte de salvare:

- Dacă o cameră selectată este **plină sau închisă**, check-in-ul nu se finalizează, iar aplicația numește camera, pentru a putea alege alta.
- Dacă ora slujbei are un [program de check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) și fereastra sa de check-in nu este deschisă în acest moment, check-in-ul în camerele acelei ore de slujbă este și el refuzat. Ecranul **Nu se poate face check-in încă** listează camera împreună cu motivul „check-in-ul nu este deschis în acest moment”; atingeți **Schimbă camerele** pentru a alege o altă oră de slujbă sau alt grup. (Orele de slujbă deja închise sunt afișate ca **Închis** pe [ecranul gospodăriei](./household-review.md) și nu pot fi selectate, așa că de obicei veți vedea acest lucru doar dacă o fereastră se închide în timpul unui check-in.)
- O gospodărie care s-a înscris pentru o oră de slujbă anterioară poate reveni mai târziu și poate adăuga o oră de slujbă deschisă, chiar și după ce fereastra anterioară s-a închis. Înscrierile existente sunt păstrate și nu determină refuzarea noului check-in.
- Dacă o cameră pentru copii are **lipsă de voluntari** față de raportul stabilit, aplicația fie afișează un avertisment pe care un membru al personalului îl poate confirma pentru a continua, fie blochează complet check-in-ul -- în funcție de modul în care biserica dumneavoastră a configurat aplicarea raportului.

## Tipărirea etichetelor

Dacă este configurată o imprimantă în rețea, aplicația tipărește automat etichete după check-in:

- **Etichetele cu nume** sunt tipărite pentru fiecare persoană atribuită unui grup care are activată setarea **Tipărire insignă**. Etichetele cu nume includ numele persoanei, atribuirea de grup și informațiile despre alergii sau note, dacă există înregistrate.
- **Taloanele de ridicare pentru părinți** sunt tipărite atunci când orice persoană înscrisă se află într-un grup care are activată setarea **Ridicare de către părinte**. Persoanele înscrise ca **Voluntar** sunt omise, astfel încât un angajat din serviciul de îngrijire a copiilor care slujește într-o cameră cu ridicare de către părinte nu primește un talon de ridicare. Talonul de ridicare listează copiii, atribuirile lor de grup și un **cod de securitate unic de 4 caractere**.

:::info
Același cod de securitate apare atât pe eticheta cu numele copilului, cât și pe talonul de ridicare al părintelui. În momentul ridicării, voluntarii potrivesc codurile pentru a verifica dacă adultul corect ridică fiecare copil.
:::

Codul de securitate este generat din nou pentru fiecare check-in și folosește doar consoane și cifre (vocalele sunt excluse pentru a evita formarea unor cuvinte nepotrivite).

:::warning
Dacă etichetele nu se tipăresc, deschideți Setările administratorului atingând de șapte ori **sigla bisericii**, apoi atingeți **Schimbă imprimanta** pentru a verifica conexiunea la imprimantă. Consultați [Configurarea imprimantei](../getting-started/printer-setup.md) pentru pașii de depanare.
:::

## Ce se întâmplă după check-in

- Dacă este configurată o imprimantă, aplicația tipărește toate etichetele și apoi revine automat la **ecranul de căutare**, pregătit pentru următoarea familie.
- Dacă nu este configurată nicio imprimantă, aplicația revine automat și ea la **ecranul de căutare**.

În ambele cazuri, ecranul de succes rămâne afișat cel puțin 6 secunde de la apariție (8 secunde când sărbătorește o etapă de prezență a cuiva), pentru ca familiile să vadă că check-in-ul a reușit. Dacă tipărirea durează mai mult, aplicația revine la aproximativ o secundă și jumătate după terminarea tipăririi.

Nu trebuie să atingeți nimic pentru a reveni la ecranul de căutare -- aplicația gestionează tranziția automat. Odată ce ecranul a stat afișat un moment, îl puteți atinge pentru a reveni imediat; o atingere în prima secundă și jumătate este ignorată, astfel încât un dublu clic rapid pe **Check-in** nu sare peste ecran.

:::tip
Aplicația se resetează complet după fiecare check-in, deci nu există riscul ca o familie să vadă informațiile altei familii.
:::

## Ce se înregistrează

Când atingeți **Check-in**, aplicația trimite serverului următoarele informații pentru fiecare membru al gospodăriei care are o atribuire de grup:

- **Persoana** înscrisă
- **Serviciul** la care participă
- **Ora de slujbă** și **grupul** la care este atribuită

Aceste date apar în B1 Admin, în secțiunea Prezență, unde administratorii bisericii pot vizualiza și gestiona înregistrările de prezență. Consultați [ghidul de administrare a check-in-ului](../../b1-admin/attendance/check-in.md) pentru detalii.
