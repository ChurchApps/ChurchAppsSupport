---
title: "Validarea planurilor și notificările"
description: "Verifică planurile din B1 Admin pentru poziții neocupate, conflicte de program și voluntari indisponibili, apoi notifică întreaga echipă dintr-un clic."
---

# Validarea planurilor și notificarea voluntarilor

<div class="article-intro">

B1 Admin verifică automat planurile înainte de duminică: poziții neocupate, conflicte de program și voluntari care și-au blocat data. Când totul arată bine, poți notifica întreaga echipă dintr-un singur clic.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Creează un [plan de slujire](./plans.md) și atribuie voluntari pozițiilor
- Adaugă [orele serviciului](./plans.md) în plan, pentru ca detectarea conflictelor să poată verifica suprapunerile
- Asigură-te că voluntarii au instalată aplicația B1 Mobile, ca să poată primi notificări push

</div>

## Panoul de validare

Fiecare plan are un panou **Validare** care rulează automat pe măsură ce construiești planul. Verifică trei lucruri:

### Poziții neocupate
Dacă o poziție necesită mai multe persoane decât cele atribuite în prezent, panoul de validare listează exact ce mai este necesar, de exemplu *„Tehnician sunet: mai este nevoie de 1 persoană."* Poți vedea dintr-o privire dacă planul este complet acoperit înainte de săptămâna respectivă.

### Conflicte de program
Dacă un voluntar este atribuit la două poziții care se suprapun în timp în același plan, panoul de validare semnalează conflictul, de exemplu *„Jane Smith: conflict de timp între Liderul de laudă și Înregistrarea copiilor în timpul Serviciului de duminică."* Astfel sunt prinse dublările de programare înainte ca ele să devină o problemă duminica dimineața.

### Date de indisponibilitate
Voluntarii pot seta în B1 Mobile datele în care nu sunt disponibili. Dacă cineva este atribuit unui plan care cade într-una dintre perioadele sale de indisponibilitate, panoul de validare semnalează automat conflictul, ca să poți găsi un înlocuitor.

### Conflicte între planuri
Validarea verifică și toate planurile tale simultan. Dacă același voluntar este atribuit la două planuri diferite care se suprapun în timp, de exemplu un serviciu de la 9:00 și unul de la 10:00 care durează până la 10:30, B1 Admin va marca persoana respectivă ca fiind programată dublu între planuri.

:::tip
Nu trebuie să faci nimic pentru a rula validarea. Ea se actualizează automat de fiecare dată când adaugi sau modifici o atribuire. Doar urmărește panoul pe măsură ce construiești planul.
:::

## Notificarea voluntarilor

Odată ce planul este stabilit, poți notifica simultan toți voluntarii atribuiți direct din panoul de validare.

1. Deschide planul și derulează până la panoul **Validare**
2. Dacă există voluntari nenotificați, vei vedea un link care arată câți trebuie notificați, de exemplu *„Notifică 8 voluntari"*
3. Dă clic pe link pentru a trimite notificări push tuturor celor care nu au fost încă notificați
4. Voluntarii primesc pe telefon o notificare care îi informează că au fost programați și îi invită să-și confirme atribuirea

:::info
Sunt incluși doar voluntarii care nu au fost încă notificați. Dacă adaugi mai târziu pe cineva în plan, linkul va reapărea, ca să poți notifica noua persoană fără a-i renotifica pe ceilalți din echipă.
:::

### Planuri cu flux de lucru pentru confirmare

Dacă setările planului indică un [flux de lucru pentru confirmare](./workflows.md#serving-assignment-confirmations), panoul afișează *„Cererile noi folosesc fluxul de lucru pentru confirmare. Alertele din aplicație rămân active. Mesajele de follow-up se opresc atunci când fiecare cerere este acceptată sau refuzată."* În acest caz:

- Linkul de notificare numără doar voluntarii care nu au fost notificați și nu au răspuns încă.
- Când dai clic pe el, se trimite alerta obișnuită din aplicație și se creează câte un card pentru fiecare cerere pe tabloul fluxului de lucru. Apoi fluxul trimite mesajele de follow-up prin e-mail și SMS și, dacă este necesar, predă cererea cuiva care să sune persoana.
- Planul trebuie să fie publicat (nu doar provizoriu), iar fluxul de lucru trebuie să fie activ. Altfel, panoul afișează *„Cererile nu au putut fi emise. Verifică dacă fluxul de lucru selectat este activ și dacă planul este publicat, apoi încearcă din nou."*

:::warning
Voluntarii trebuie să aibă instalată experiența mobilă B1.church (PWA pe ecranul principal sau aplicația nativă B1 Mobile, învechită, pentru utilizatorii care o mai au), cu notificările activate, ca să poată primi notificări push. Consultă [Instalarea ca aplicație (PWA)](/docs/b1-church/getting-started/installing-pwa) pentru instrucțiuni de configurare.
:::

## Articole conexe

- [Planuri de slujire](./plans.md)
- [Fluxuri de lucru](./workflows.md)
- [Instalarea PWA-ului B1.church](/docs/b1-church/getting-started/installing-pwa)
