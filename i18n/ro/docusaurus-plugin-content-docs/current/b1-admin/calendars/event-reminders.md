---
title: "Mementouri pentru evenimente"
---

# Mementouri pentru evenimente

<div class="article-intro">

Mementourile pentru evenimente notifică automat persoanele potrivite înainte de desfășurarea unui eveniment -- de exemplu, „Nu rata! Atelierul de sănătate începe mâine la ora 9:00.” Configurezi mementoul o singură dată, pe eveniment, iar B1 îl trimite la timp prin notificări push, prin e-mail și, dacă biserica ta are configurat serviciul de mesaje text, prin mesaje text. Membrii pot controla ce mementouri primesc din propriile [Preferințe de notificare](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Creează evenimentul despre care vrei să îi anunți (vezi [Crearea calendarelor](creating-calendars))
- Pentru a ajunge la participanții înscriși, [activează înscrierea](creating-calendars) la eveniment
- Pentru a ajunge la un întreg grup, asigură-te că evenimentul aparține unui [grup](../groups/creating-groups) care are membri

</div>

## Configurarea unui memento

Mementourile se configurează în secțiunea **Mementouri** a evenimentului.

- Când **creezi un eveniment nou**, extinde secțiunea **Mementouri** din editorul de evenimente înainte de a salva.
- Pentru un **eveniment existent**, deschide pagina **Detalii înscriere** a evenimentului (din secțiunea **Înscrieri**) pentru a adăuga sau modifica mementoul.

1. Activează **Activează mementourile**.
2. Alege **Când** să se trimită. Selectează până la trei momente: **Cu 7 zile înainte**, **Cu 3 zile înainte**, **Cu 1 zi înainte** și **În ziua evenimentului**.
3. Setează **Ora din zi** la care trebuie trimis mementoul (implicit este **9:00 AM**, în [fusul orar](../settings/church-settings.md#time-zone) al bisericii tale).
4. Alege **Cui** să i se trimită mementoul (vezi [Cine primește mementouri](#who-gets-reminded) mai jos).
5. Opțional, adaugă un **Mesaj**. Lasă-l gol pentru a folosi formularea implicită sau scrie-ți propriul text -- poți include `{{eventTitle}}`, care va fi înlocuit cu numele evenimentului.
6. Alege **Canalele**: notificare **Push**, **E-mail** și, dacă biserica ta are conectat un [furnizor de mesaje text](../settings/church-settings.md#texting), **Mesaj text**.
7. Salvează evenimentul.

Pe măsură ce faci modificări, o **previzualizare live** arată aproximativ câte persoane vor primi mementoul, câți participanți nu pot fi contactați și următoarele ore programate de trimitere -- astfel poți verifica dacă mementoul arată bine înainte de a salva.

## Cine primește mementouri

Setarea **Cui** controlează destinatarii mementoului:

- **Doar înscriși** -- Toate persoanele înscrise la eveniment care sunt legate de un profil de persoană. Este implicit atunci când evenimentul are înscrierea activată, astfel încât un memento pentru un eveniment mic cu înscriere nu ajunge din greșeală la un întreg grup.
- **Responsabili de familie / doar înscriși** -- Un memento pentru fiecare înscriere (persoana care s-a înscris), nu pentru fiecare membru al familiei de pe înscriere.
- **Membrii grupului** -- Toți cei din grupul evenimentului. Este implicit atunci când evenimentul nu folosește înscrierea.
- **Automat** -- Folosește înscrișii când înscrierea este activată, altfel grupul.

:::info
Oaspeții adăugați doar cu numele (fără un profil de persoană asociat) nu pot primi memento, deoarece nu există cont, dispozitiv sau e-mail către care să se trimită. Previzualizarea îți arată câți participanți intră în această categorie, ca să nu ai surprize. Membrii care s-au retras din comunicări sunt, de asemenea, ignorați.
:::

## Când sunt trimise mementourile

- Mementourile se trimit la **ora din zi pe care o alegi**, în fusul orar local al bisericii tale, pentru fiecare dintre decalajele selectate.
- Dacă **modifici data sau ora evenimentului**, mementourile în așteptare sunt reprogramate automat -- nu trebuie să editezi mementoul.
- Dacă **ștergi evenimentul** (sau anulezi o singură apariție a unui eveniment recurent), mementourile sale în așteptare sunt anulate automat.
- Evenimentele recurente sunt gestionate automat: fiecare apariție viitoare primește propriul memento.

:::tip
Mementourile se trimit **mai întâi prin push, cu e-mail ca alternativă**. Dacă un membru are notificările push activate, va primi o notificare push; dacă nu, va primi în schimb un e-mail. Membrii aleg pentru fiecare tip de notificare ce canale doresc, în [Preferințele lor de notificare](../../b1-church/getting-started/notification-preferences).
:::

## Mementouri prin mesaje text

Canalul **Mesaj text** apare doar când biserica ta are conectat un furnizor de mesaje text. Mesajele text se trimit prin furnizorul de mesaje text al bisericii tale, iar fiecare mesaj poate costa biserica. Ele se trimit în plus față de orice memento push sau e-mail și doar către persoanele care:

- Au activat **Mesaje text** în [Preferințele lor de notificare](../../b1-church/getting-started/notification-preferences), și
- Au un număr de telefon mobil în profil.

Fiecare mesaj începe cu numele bisericii tale, se păstrează într-un singur mesaj text și se termină cu „Răspunde STOP pentru a te dezabona.” Oricine răspunde STOP nu mai primește mesaje text de la biserica ta. Pentru ca răspunsurile STOP să ajungă la B1, lipește **adresa URL a webhook-ului pentru mesaje primite (STOP)** din [setările pentru mesaje text](../settings/church-settings.md#texting) în webhook-ul pentru mesaje primite al furnizorului tău.

## Ce pot controla membrii

Mementourile respectă întotdeauna [Preferințele de notificare](../../b1-church/getting-started/notification-preferences) ale fiecărui membru. Un membru poate:

- Dezactiva **Mementourile pentru evenimente** pentru push, e-mail sau mesaje text, păstrând celelalte notificări active.
- Activa sau dezactiva mementourile prin mesaje text cu **Mesaje text**.
- Seta **ore de liniște**, astfel încât notificările care nu sunt urgente să aștepte până la un moment rezonabil.

Nu poți anula decizia unui membru de a se retrage din mementourile pentru evenimente -- aceasta menține B1 conform regulilor anti-spam și lasă membrii să controleze ce ajunge în inboxul lor.

## Mementouri pentru servire

Voluntarii programați într-un plan primesc un **memento de servire** separat, cu detaliile planului și, dacă nu au răspuns încă, butoanele **Accept / Refuz** direct în e-mail. Aceste mementouri se configurează la tipul de plan, nu la un eveniment din calendar, și pot fi trimise și prin mesaj text -- vezi [Mementouri pentru voluntari](../serving/plans#volunteer-reminders) și [Voluntarii de duminică](../guides/sunday-volunteers) pentru detalii despre programarea voluntarilor și despre mementouri.

## Pașii următori

- [Preferințele de notificare](../../b1-church/getting-started/notification-preferences) -- Ce pot controla membrii
- [Ghidul înscrierii la evenimente](../guides/event-registration) -- Configurează înscrierea, ca mementourile să poată ajunge la participanți
- [Crearea calendarelor](creating-calendars) -- Revino la configurarea calendarului
