---
title: "Finalizarea check-in-ului"
---

# Finalizarea check-in-ului

<div class="article-intro">

După ce ați verificat gospodăria și ați făcut eventualele atribuiri de grupuri, sunteți gata să finalizați check-in-ul. Acesta este ultimul pas din fluxul de lucru al chioscului -- aplicația trimite prezența, tipărește etichetele și se resetează pentru următoarea familie.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- [Verificați gospodăria](./household-review) pe ecranul de verificare a gospodăriei
- [Atribuiți grupuri](./group-assignment) pentru membrii familiei care trebuie să se înregistreze la o anumită clasă sau program
- Opțional, [adăugați oaspeții](./adding-guests) care vin împreună cu familia dumneavoastră

</div>

## Cum să faceți check-in

1. De pe **ecranul de verificare a gospodăriei**, atingeți butonul **Check-in** din partea de jos a ecranului.
2. Aplicația trimite datele de prezență către server și afișează un **ecran de succes** cu un semn de bifă verde și un mesaj de bun venit.

Atât este necesar. Prezența familiei dumneavoastră a fost înregistrată.

## Săli pline și rapoarte de voluntari

Dacă biserica dumneavoastră a configurat [limite de siguranță](../../b1-admin/attendance/checkin-safety) pentru sălile sale, serverul le verifică înainte de salvare:

- Dacă o sală selectată este **plină sau închisă**, check-in-ul nu se finalizează, iar aplicația indică numele sălii, pentru a putea alege alta.
- Dacă momentul serviciului are un [program de check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) și fereastra sa de check-in nu este deschisă în acest moment, check-in-ul în sălile acelui moment al serviciului este de asemenea refuzat. Ecranul **Nu se poate face check-in încă** listează sala împreună cu motivul „check-in-ul nu este deschis în acest moment”; atingeți **Schimbă sălile** pentru a alege alt moment al serviciului sau alt grup. (Momentele serviciului deja închise sunt afișate ca **Închis** pe [ecranul gospodăriei](./household-review) și nu pot fi selectate, deci de obicei veți vedea acest lucru doar dacă o fereastră se închide în timpul unui check-in.)
- O gospodărie care s-a înregistrat pentru un moment anterior al serviciului poate reveni mai târziu și poate adăuga un moment deschis al serviciului, chiar și după ce fereastra anterioară s-a închis. Înregistrările existente sunt păstrate și nu determină refuzarea noului check-in.
- Dacă o sală pentru copii are **lipsă de voluntari** față de raportul impus, aplicația fie afișează un avertisment pe care un membru al personalului îl poate confirma pentru a continua, fie blochează complet check-in-ul -- în funcție de modul în care biserica dumneavoastră a configurat aplicarea rapoartelor.

## Tipărirea etichetelor

Dacă este configurată o imprimantă în rețea, aplicația tipărește automat etichete după check-in:

- **Etichetele cu nume** se tipăresc pentru fiecare persoană atribuită unui grup care are activată setarea **Tipărește ecuson**. Etichetele cu nume includ numele persoanei, atribuirea grupului și informațiile despre alergii sau note, dacă există în evidență.
- **Tichetele de ridicare de către părinte** se tipăresc atunci când orice persoană înregistrată se află într-un grup care are activată setarea **Ridicare de către părinte**. Persoanele înregistrate ca **Voluntar** sunt omise, astfel încât un angajat din serviciul de îngrijire a copiilor care activează într-o sală cu Ridicare de către părinte nu primește un tichet de ridicare. Tichetul de ridicare listează copiii, atribuirile lor de grupuri și un **cod de securitate unic din 4 caractere**.

:::info
Același cod de securitate apare atât pe eticheta cu nume a copilului, cât și pe tichetul de ridicare al părintelui. La momentul ridicării, voluntarii compară codurile pentru a verifica dacă adultul potrivit îl ridică pe fiecare copil.
:::

Codul de securitate este generat din nou pentru fiecare check-in și folosește doar consoane și cifre (vocalele sunt excluse pentru a evita formarea unor cuvinte nepotrivite).

:::warning
Dacă etichetele nu se tipăresc, deschideți Setările administratorului atingând de șapte ori **logo-ul bisericii**, apoi atingeți **Schimbă imprimanta** pentru a verifica conexiunea la imprimantă. Consultați [Configurarea imprimantei](../getting-started/printer-setup) pentru pașii de depanare.
:::

## Ce se întâmplă după check-in

- Dacă este configurată o imprimantă, aplicația tipărește toate etichetele și apoi revine automat la **ecranul de căutare**, pregătit pentru următoarea familie.
- Dacă nu este configurată nicio imprimantă, aplicația revine și ea automat la **ecranul de căutare**.

În ambele cazuri, ecranul de succes rămâne afișat cel puțin 6 secunde de la apariție (8 secunde când sărbătorește atingerea unui prag de prezență al cuiva), astfel încât familiile să poată vedea că check-in-ul a reușit. Dacă tipărirea durează mai mult, aplicația revine la aproximativ o secundă și jumătate după terminarea tipăririi.

Nu trebuie să atingeți nimic pentru a reveni la ecranul de căutare -- aplicația se ocupă automat de tranziție. Odată ce ecranul a fost afișat o clipă, îl puteți atinge pentru a reveni imediat; o atingere în primele o secundă și jumătate este ignorată, astfel încât un dublu clic rapid pe **Check-in** nu sare peste ecran.

:::tip
Aplicația se resetează complet după fiecare check-in, astfel încât nu există riscul ca o familie să vadă informațiile altei familii.
:::

## Ce se înregistrează

Atunci când atingeți **Check-in**, aplicația trimite serverului următoarele informații pentru fiecare membru al gospodăriei care are o atribuire de grup:

- **Persoana** înregistrată
- **Serviciul** la care participă
- **Momentul serviciului** și **grupul** la care este atribuită

Aceste date apar în B1 Admin, în secțiunea Prezență, unde administratorii bisericii pot vizualiza și gestiona înregistrările de prezență. Consultați [ghidul de administrare a check-in-ului](../../b1-admin/attendance/check-in.md) pentru detalii.
