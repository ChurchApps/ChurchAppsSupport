---
title: "Verificarea ieșirii și siguranța copiilor"
description: "Fă check-out copiilor la o stație B1 Checkin cu personal: coduri de securitate, ridicare verificată, apelare părinți și anunțuri de urgență."
---

# Verificarea ieșirii și siguranța copiilor

<div class="article-intro">

Ieșirea încheie procesul de înregistrare a copiilor: un părinte prezintă codul de securitate de pe eticheta de ridicare, chioșcul verifică cine ridică copilul, iar copiii sunt înregistrați ca fiind plecați. Stațiile cu personal beneficiază și de instrumente de siguranță — verificarea persoanelor de încredere pentru ridicare, mesajele text către părinți, reimprimarea etichetelor de securitate și o transmisie de urgență.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Ieșirea este disponibilă pe stațiile setate în modul **cu personal** din setările de administrare ale chioșcului
- Copiii trebuie să fi fost [înregistrați](./completing-checkin.md) cu o etichetă de ridicare tipărită, care conține codul de securitate
- Pentru mesajele către părinți și transmisiile de urgență, biserica dumneavoastră trebuie să aibă conectat un furnizor de mesagerie text în B1 Admin

</div>

## Începerea unei ieșiri

1. Pe o stație cu personal, atingeți **Check Out** de pe ecranul de căutare.
2. Introduceți **codul de securitate** din 4 caractere de pe eticheta de ridicare a familiei. Îl puteți scrie, puteți folosi tastatura de pe ecran sau puteți scana codul de bare al etichetei cu un cititor USB sau Bluetooth — codul se trimite automat după introducerea celor 4 caractere.
   - Nu aveți cititor? Atingeți **Scan** de sub câmpul codului pentru a folosi camera tabletei. Țineți codul QR sau de bare al etichetei în fața camerei, în fereastra **Scan pickup code**, iar codul va fi introdus automat. Implicit se folosește camera din spate; atingeți butonul de întoarcere pentru a schimba camera sau atingeți **Cancel** pentru a reveni la scriere.
3. Chioșcul afișează copiii înregistrați sub acel cod.

## Verificarea persoanei care ridică copilul

Ecranul de ieșire întreabă cine vine să ridice copiii:

- **Persoanele de încredere pentru ridicare** din gospodărie apar ca niște carduri pe care se poate apăsa, cu fotografia și relația cu copilul — atingeți persoana care se află în fața dumneavoastră.
- **Adulții din gospodărie** apar, de asemenea, într-o grilă cu fotografii.
- **Altul** vă permite să scrieți numele unei persoane care nu se află pe listă.

Dacă un nume scris corespunde unei persoane marcate **Not Authorized** pentru acea gospodărie, chioșcul blochează ieșirea și afișează un avertisment. Un membru al personalului poate alege **Override** pentru a continua oricum — suprascrierea este înregistrată în fișa de prezență, împreună cu numele persoanei.

Odată confirmată persoana care ridică, atingeți pentru a înregistra ieșirea. Numele persoanei care ridică este salvat împreună cu fișa de prezență.

:::info
Persoanele de încredere și cele neautorizate pentru ridicare sunt gestionate de personalul bisericii, pe pagina fiecărei persoane din B1 Admin — consultați [Siguranța la înregistrare](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Trimiterea unui mesaj unui părinte

Aveți nevoie de un părinte în timpul serviciului — pentru schimbarea scutecului sau pentru că un copil plânge? De pe ecranul de ieșire al unei stații cu personal, membrii personalului pot trimite un **mesaj de chemare**: un SMS către părinții sau tutorii copilului, prin furnizorul de mesagerie text al bisericii. Părinții care s-au dezabonat de la mesaje sau nu au un număr de telefon mobil sunt ignorați, iar chioșcul afișează câte mesaje au fost trimise.

## Reimprimarea etichetelor

Dacă o insignă cu nume sau o etichetă de ridicare se pierde sau se deteriorează, personalul de la o stație cu personal poate **reimprima** etichetele familiei de pe ecranul de ieșire, după introducerea codului de securitate. Reimprimarea folosește aceeași imprimantă și aceleași șabloane de etichete ca înregistrarea inițială.

## Transmisie de urgență

În caz de urgență, personalul poate trimite simultan un mesaj text tuturor tutorilor **fiecărui copil înregistrat** pentru serviciul curent:

1. Deschideți **setările de administrare** ale chioșcului (7 atingeri rapide pe logo-ul din antet, plus codul PIN, dacă este setat).
2. Atingeți **Emergency broadcast**.
3. Introduceți mesajul, apoi scrieți **EMERGENCY** în câmpul de confirmare — butonul **Send broadcast** rămâne dezactivat până când faceți acest lucru.
4. Chioșcul raportează câte telefoane au primit mesajul și câte persoane au fost ignorate (care s-au dezabonat sau nu au un număr de telefon mobil).

:::warning
Transmisia ajunge la fiecare gospodărie cu copii înregistrați pentru serviciul selectat. Folosiți-o doar în situații de urgență reală — evacuări, blocări ale clădirii sau vreme severă.
:::

## Articole conexe

- [Finalizarea înregistrării](./completing-checkin.md) — de unde provin codurile de securitate și etichetele de ridicare
- [Siguranța la înregistrare](../../b1-admin/attendance/checkin-safety.md) — configurarea capacităților, raporturilor, persoanelor care ridică și a cerinței de furnizor de mesagerie text
- [Configurarea imprimantei](../getting-started/printer-setup.md) — configurarea imprimantei de etichete
