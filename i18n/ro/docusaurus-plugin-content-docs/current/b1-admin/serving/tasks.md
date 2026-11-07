---
title: "Sarcini"
description: "Creează, atribuie și închide sarcini în B1 Admin, găsește-le în Serving > My Work și setează reamintiri pentru termene, ca urmările să nu fie uitate."
---

# Sarcini

<div class="article-intro">

Sarcinile îți permit să atribui acțiuni persoanelor sau grupurilor din biserica ta. Fie că este vorba de o sarcină unică sau de o responsabilitate recurentă, sarcinile te ajută să urmărești ce trebuie făcut și cine este responsabil, astfel încât nimic să nu fie uitat.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Asigură-te că persoanele sau [grupurile](../groups/creating-groups.md) cărora vrei să le atribui sarcini există în B1 Admin
- În [meniul Jump](../introduction.md#getting-around-with-the-jump-menu), alege **Serving > My Work** pentru a vedea sarcinile

</div>

## Vizualizarea sarcinilor

În meniul Jump, alege **Serving > My Work** (sau caută „My Work”). Lista **Sarcini** afișează titlul fiecărei sarcini, persoana sau grupul cu care este asociată, persoana căreia i-a fost atribuită, data deschiderii și starea acesteia. Cardurile tale de [flux de lucru](./workflows.md) apar alături, sub **My Cards**. Persoanele cărora le-au fost atribuite pot vedea și lucra cu cardurile și sarcinile deschise din ecranul **Eu** din aplicația B1.

Folosește filele de deasupra listei pentru a comuta între sarcinile **Atribuite mie**, **Atribuite grupurilor mele** și **Solicitate de mine**. Fiecare filă arată câte sarcini conține.

:::tip
Implicit, sunt afișate doar sarcinile deschise. Alege **Închise** deasupra listei pentru a vedea în schimb sarcinile finalizate.
:::

## Crearea unei sarcini

1. Pe pagina **My Work**, fă clic pe **Adaugă sarcină**. Se deschide formularul **Sarcină nouă**.
2. Opțional, fă clic pe câmpul **Asociază cu** și alege persoana sau grupul la care se referă sarcina. Lasă-l gol pentru o simplă listă de lucruri de făcut care nu se referă la nimeni, cum ar fi un memento pentru tine.
3. Fă clic pe câmpul **Atribuie către**. În fereastra **Selectează o persoană sau un grup**, caută pe fila **Persoană** sau treci pe fila **Grup** și caută un grup, apoi selectează rezultatul.
4. Introdu un **Titlu** pentru sarcină.
5. Opțional, alege o **Dată scadentă**.
6. Adaugă **Note** cu orice detalii sau instrucțiuni pentru persoana căreia i-a fost atribuită sarcina.
7. Fă clic pe **Salvează**.

Sarcina va apărea acum în lista de sarcini și va fi vizibilă persoanei căreia i-a fost atribuită pe panoul său de control și în aplicația mobilă.

## Gestionarea unei sarcini

Fă clic pe orice sarcină pentru a deschide pagina ei de detalii. De aici poți:

- **Închide sau redeschide sarcina** -- Fă clic pe **Închide sarcina** când lucrarea este finalizată sau pe **Redeschide sarcina** pentru a o deschide din nou.
- **Reatribuie sarcina** -- Fă clic pe **Atribuie** pentru a alege o altă persoană sau un alt grup.
- **Schimbă despre cine este sarcina** -- Fă clic pe **Asociază** pentru a alege o altă persoană sau un alt grup, ori alege **Nicio persoană sau grup** pentru a elimina asocierea.
- **Schimbă data scadentă** -- Alege o dată în câmpul **Scadentă**; se salvează când faci clic în afara câmpului. (Sarcinile create pentru o [confirmare a unei atribuiri de serviciu](./workflows.md#serving-assignment-confirmations) îți arată data scadentă, dar aceasta nu poate fi modificată aici.)
- **Adaugă note** -- Publică actualizări sau detalii pentru persoana căreia i-a fost atribuită sarcina, în notele sarcinii.
- **Setează mementouri** -- Vezi [Mementouri pentru sarcini](#task-reminders) mai jos.

## Mementouri pentru sarcini

O sarcină cu dată scadentă poate să îi trimită memento persoanei căreia i-a fost atribuită înainte de termen.

1. Pe pagina sarcinii, fă clic pe **Editează** lângă **Mementouri**.
2. Activează **Trimite mementouri pentru această sarcină**.
3. Sub **Când ar trebui trimise mementourile?**, alege până la trei momente: **cu 7 zile înainte**, **cu 3 zile înainte**, **cu 1 zi înainte** sau **în ziua respectivă**.
4. Setează **Ora din zi** și, opțional, un **Mesaj**.
5. Sub **Trimite prin**, alege **Notificare push**, **E-mail** și, dacă biserica ta are un [furnizor de mesaje text](../settings/church-settings.md#texting) conectat, **SMS**.
6. Fă clic pe **Salvează mementourile**.

Dacă sarcina nu are dată scadentă, B1 te avertizează că nu vor fi trimise mementouri până când nu este setată o dată în câmpul **Scadentă**. Mementourile prin SMS ajung doar la persoanele care au activat **Mesaje text** în [Preferințele de notificare](../../b1-church/getting-started/notification-preferences.md) și fiecare mesaj poate costa biserica ta.

## Ciclul de viață al unei sarcini

1. O sarcină nouă începe cu starea **Deschisă**.
2. Persoana căreia i-a fost atribuită sarcina primește o notificare și poate vedea sarcina din panoul său de control, din **Serving > My Work** sau din aplicația mobilă.
3. Odată ce lucrarea este finalizată, persoana căreia i-a fost atribuită (sau un administrator) fă clic pe **Închide sarcina**.
4. Sarcinile închise dispar din vizualizarea implicită, dar pot fi găsite în continuare alegând **Închise** deasupra listei de sarcini.

:::info
B1 Admin nu mai creează sarcini recurente programate. Pentru urmăriri repetate cu persoanele, folosește un [flux de lucru](./workflows.md) cu un [declanșator programat](./workflows.md#schedule-triggers).
:::

:::tip
Când trebuie să parcurgi mulți oameni prin aceleași etape -- cum ar fi urmărirea vizitatorilor noi sau un proces de înscriere ca membru -- folosește [Fluxurile de lucru](./workflows.md). Fluxurile de lucru transformă sarcinile în carduri pe o tablă cu drag-and-drop, cu pași, date scadente și rutare.
:::

:::info
Unele sarcini sunt create automat de alte părți ale B1 și se deschid cu un card special de revizuire, în locul vizualizării standard pentru note și reatribuire -- [cererile de înscriere în grup](../groups/group-join-requests.md#approving-from-the-tasks-page), [cererile de modificare a profilului](../profile/approving-profile-changes.md) și [cererile de ștergere a contului](../profile/account-deletion.md) funcționează toate în acest mod.
:::

## Pașii următori

- Parcurge un proces cu mai mulți pași cu ajutorul [Fluxurilor de lucru](./workflows.md)
- Folosește [Fluxurile de lucru](./workflows.md) pentru a parcurge automat procese repetabile
- Folosește sarcinile împreună cu [Planurile de slujbă](./plans.md) pentru a urmări acțiunile de pregătire a slujbei
