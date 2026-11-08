---
title: "Validarea planurilor și notificări"
description: "Verificați planurile de slujire în B1 Admin pentru posturi neocupate, conflicte de programare și voluntari indisponibili, apoi trimiteți notificare push întregii echipe dintr-un singur clic."
---

# Validarea planurilor și notificarea voluntarilor

<div class="article-intro">

B1 Admin verifică automat planurile dvs. înainte de duminică: posturi neocupate, conflicte de programare și voluntari care și-au blocat data. Când totul arată bine, puteți notifica întreaga echipă dintr-un singur clic.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Creați un [plan de slujire](./plans.md) și atribuiți voluntari pozițiilor
- Adăugați [orele serviciului](./plans.md) în plan, pentru ca detectarea conflictelor să poată verifica suprapunerile
- Asigurați-vă că voluntarii au [aplicația B1 instalată](../../b1-church/getting-started/installing-pwa.md) pentru a primi notificări push

</div>

## Panoul de validare

Fiecare plan are un panou **Validare** care rulează automat pe măsură ce îl construiți. Verifică trei lucruri:

### Posturi neocupate
Dacă o poziție necesită mai mulți oameni decât sunt atribuiți în prezent, panoul de validare listează exact ce mai este necesar, de exemplu, *„Tehnician sunet: mai este nevoie de 1 persoană.”* Puteți vedea dintr-o privire dacă planul este complet acoperit cu voluntari înainte de sosirea săptămânii.

### Conflicte de programare
Dacă un voluntar este atribuit la două poziții care se suprapun în timp în același plan, panoul de validare semnalează conflictul, de exemplu, *„Jane Smith: conflict de timp între Lider de laudă și Check-in copii în timpul Serviciului de duminică.”* Acest lucru prinde dublările de rezervare înainte ca ele să devină o problemă duminica dimineața.

### Date de indisponibilitate
Voluntarii pot seta în aplicația B1 datele în care nu sunt disponibili. Dacă cineva este atribuit unui plan care cade într-una dintre datele sale de indisponibilitate, panoul de validare afișează automat conflictul, ca să puteți găsi un înlocuitor.

### Conflicte între planuri
Validarea verifică și toate planurile dvs. simultan. Dacă același voluntar este atribuit în două planuri diferite care se suprapun în timp, de exemplu, o slujbă de la 9:00 și una de la 10:00 care durează amândouă până la 10:30, B1 Admin va marca persoana respectivă ca fiind rezervată dublu între planuri.

:::tip
Nu trebuie să faceți nimic pentru a rula validarea. Ea se actualizează automat de fiecare dată când adăugați sau modificați o atribuire. Doar urmăriți panoul pe măsură ce construiți planul.
:::

## Notificarea voluntarilor

Odată ce planul este stabilit, puteți notifica toți voluntarii atribuiți dintr-o dată, direct din panoul de validare.

1. Deschideți planul și derulați până la panoul **Validare**
2. Dacă există voluntari care nu au fost notificați, veți vedea un link care arată câți trebuie notificați (de exemplu, *„Notifică 8 voluntari”*)
3. Faceți clic pe link pentru a trimite notificări push tuturor celor care nu au fost încă notificați
4. Voluntarii primesc o notificare pe telefon care îi informează că au fost programați și îi invită să-și confirme atribuirea

:::info
Sunt incluși doar voluntarii care nu au fost încă notificați. Dacă adăugați ulterior pe cineva în plan, linkul va reapărea, astfel încât să puteți notifica noua persoană fără a-i notifica din nou pe ceilalți membri ai echipei.
:::

### Planuri cu flux de confirmare

Dacă setările planului indică un [flux de lucru pentru confirmare](./workflows.md#serving-assignment-confirmations), panoul afișează *„Cererile noi folosesc fluxul de confirmare. Alertele din aplicație rămân activate. Urmăririle încetează atunci când fiecare cerere este acceptată sau refuzată.”* În acest caz:

- Linkul de notificare numără doar voluntarii care nu au fost notificați și nu au răspuns încă.
- Un clic pe acesta trimite alerta obișnuită din aplicație și creează câte un card pentru fiecare cerere pe tabloul fluxului de lucru. Apoi fluxul de lucru trimite urmăririle prin e-mail și SMS și, dacă este necesar, predă cererea cuiva care să îl sune pe voluntar.
- Planul trebuie să fie publicat (nu provizoriu), iar fluxul de lucru trebuie să fie activ. În caz contrar, panoul afișează *„Cererile nu au putut fi emise. Verificați dacă fluxul de lucru selectat este activ și dacă planul este publicat, apoi încercați din nou.”*

:::warning
Voluntarii trebuie să aibă aplicația B1 instalată pe ecranul principal, cu notificările activate, pentru a primi notificări push. Consultați [Instalarea ca aplicație (PWA)](../../b1-church/getting-started/installing-pwa.md) pentru instrucțiuni de configurare.
:::

## Articole conexe

- [Planuri de slujire](./plans.md)
- [Fluxuri de lucru](./workflows.md)
- [Instalarea PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
