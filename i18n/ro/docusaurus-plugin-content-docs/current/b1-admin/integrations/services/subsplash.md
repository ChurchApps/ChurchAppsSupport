---
title: "Subsplash"
description: "Conectați donațiile, persoanele noi și răspunsurile de formular din Subsplash la B1 prin Zapier, ca darurile și profilurile să ajungă automat în B1 Admin."
---

# Subsplash

<div class="article-intro">

Dacă folosești Subsplash pentru aplicația bisericii, pentru donații sau pentru formulare, dar vrei ca B1 să fie sistemul principal de evidență pentru persoane și donații, aplicația Zapier a Subsplash poate trimite în timp real donațiile, profilurile noi și răspunsurile din formulare către B1. Ține cont că aplicația Zapier a Subsplash este deocamdată doar **cu declanșatori**: legătura funcționează într-un singur sens (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont Subsplash cu un plan care include acces la **API + Zapier** (verifică la Managerul de Succes al Clientului Subsplash, deoarece aceste funcții depind de nivelul planului)
- Un cont [Zapier](https://zapier.com)
- Un utilizator B1Admin cu permisiunea **Edit Settings**

</div>

## Ce poți configura

Toți declanșatorii de mai jos aparțin Subsplash. Acțiunile aparțin B1.

| Declanșator Subsplash | Acțiune B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person, dacă persoana lipsește) |
| New Pledge | Add Donation (cu `notes` = „Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (nicio acțiune directă în B1; înregistrează într-un Google Sheet pentru verificare manuală) |
| New Form Response | Create Person + (opțional) Add Group Member, pe baza formularului |

Sensul Subsplash → B1 este singurul pe care îl acceptă momentan aplicația Subsplash.

## Configurare

### 1. Creează o cheie API B1

În B1Admin: **Settings → Developer → API Keys → New API Key**. Permisiunile (scopes):

- `people:read`: pentru a căuta donatorul după e-mail
- `people:write`: pentru a-l crea dacă nu există
- `donations:write`: pentru a înregistra donația
- (Nu este necesar `settings:write`, deoarece declanșatorul aici este gestionat de Subsplash, nu de B1.)

### 2. Conectează Subsplash la Zapier

Urmează [ghidul de integrare Zapier al Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash emite un token API din panoul Subsplash Dashboard, pe care Zapier îl folosește pentru a autentifica partea de declanșator.

### 3. Creează Zap-ul pentru „înregistrarea unei donații"

1. **Declanșator**: Subsplash: New Donation
2. **Acțiune**: B1.church: Find Person (după e-mail)
3. **Filtru / Traseu**: ramifică în funcție de „persoană găsită":
   - **Găsită:** B1.church: Add Donation. Mapează suma, data, fondul, metoda = „Online" și notele = ID-ul tranzacției Subsplash.
   - **Negăsită:** B1.church: Create Person → B1.church: Add Donation (folosind ID-ul persoanei nou create).

Activează Zap-ul. Donațiile viitoare din Subsplash ajung în **B1Admin → Donations** în câteva secunde.

## Scenarii frecvente

### Trimite un mesaj de mulțumire la prima donație

- **Declanșator**: Subsplash: New Donation
- **Acțiune**: Filter by Zapier: continuă doar dacă este prima donație a donatorului (folosește un *Lookup Table* pe e-mailul donatorului, comparat cu un Google Sheet cu donatorii anteriori, sau un pas *Paths* din Zapier, pe baza datei de creare a donatorului)
- **Acțiune**: Mailchimp / SMTP / SendGrid: trimite mesajul de mulțumire pentru prima donație
- **Acțiune**: B1.church: Add Donation (ca de obicei)

### Separă angajamentele de fluxul obișnuit de donații

- **Declanșator**: Subsplash: New Pledge
- **Acțiune**: B1.church: Add Donation cu `notes = "Pledge — Subsplash"` și un fond numit `Pledges` (separat de fondul operațional), astfel încât să poți raporta angajamentele separat în **B1Admin → Donations → Summary**.

### Sincronizează utilizatorii noi ai aplicației ca persoane în B1

- **Declanșator**: Subsplash: New Person Created
- **Acțiune**: B1.church: Create Person, completând numele, e-mailul și telefonul. Etichetează persoana în B1 adăugând-o într-un grup precum „Subsplash App Users".

## Limitări și observații

- **Aplicația Zapier a Subsplash funcționează doar cu declanșatori.** Dacă vrei modificări și pe partea B1 (de exemplu, o persoană nouă din B1 să ajungă și în Subsplash), ar trebui să construiești această punte din declanșatorii aplicației Zapier a B1, care apelează API-ul REST al Subsplash printr-o acțiune personalizată *Webhooks by Zapier — POST*. Aceasta este o integrare personalizată, nu un scenariu gata făcut.
- **Accesul la API depinde de plan.** Dacă conexiunea Zapier eșuează cu `403 Forbidden`, planul tău Subsplash probabil nu include acces la API. Contactează Managerul de Succes al Clientului.
- **Maparea fondurilor se face manual.** Subsplash transmite numele unei campanii sau al unei categorii, iar B1 are nevoie de un ID numeric al fondului. Poți fie să fixezi fondul direct în Zap, fie să menții un *Lookup Table* în Zapier, care asociază campaniile Subsplash cu fondurile B1.

## Depanare

- **Niciun declanșator nu se activează după o donație**: verifică în panoul Zapier al Subsplash dacă conexiunea afișează în continuare *Connected*. Dacă tokenul API a fost reînnoit pe partea Subsplash, Zap-ul se oprește fără nicio notificare; reconectează-l.
- **Acțiunea *Add Donation* din B1 eșuează cu eroarea 422**: cel mai adesea din cauza unui `fundId` lipsă sau nerecunoscut. Listează fondurile din **B1Admin → Donations → Funds** și copiază ID-ul exact în pasul din Zap.
- **Prima donație declanșează de două ori**: Subsplash retrimite uneori un declanșator dacă Zapier nu a confirmat primirea. Adaugă un *Filter by Zapier* pe ID-ul donației (Subsplash îl trimite în conținutul transmis) pentru a elimina duplicatele.

## Vezi și

- [Donorbox](./donorbox.md): aceeași structură de scenarii, pe o altă platformă de donații
- [Zapier (prezentare generală)](../zapier.md): partea B1 a fiecărui scenariu Zapier
- [Ghidul de integrare Zapier al Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentația Subsplash)
