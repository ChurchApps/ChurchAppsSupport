---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) este un API SMS australian, popular printre bisericile din Australia, deoarece oferă numere locale și prețuri competitive pentru Australia, unde Clearstream și Text In Church sunt orientate spre SUA. Mobile Message nu are în prezent o aplicație Zapier de primă clasă, dar publică un API REST public, astfel că poți conecta evenimentele B1 la mesajele Mobile Message prin **Webhooks by Zapier** (sau modulul HTTP din Make) în câteva minute.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Mobile Message](https://mobilemessage.com.au) cu un Sender ID înregistrat și credențiale API (nume de utilizator API și parolă, sub *Account → API Settings*)
- Un cont [Zapier](https://zapier.com) (sau [Make](https://www.make.com))
- Un utilizator B1Admin cu permisiunea **Edit Settings**

</div>

## Ce poți configura

API-ul Mobile Message funcționează ca „trimite SMS": nu are declanșatoare, doar mesaje text trimise. Prin urmare, toate rețetele merg de la B1 spre SMS:

| Direcție | Declanșator B1 | Rezultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | Mesaj de bun venit către persoana nou adăugată |
| B1 → Mobile Message | `donation.created` | Mesaj de mulțumire către donator |
| B1 → Mobile Message | `form.submission.created` | Notificarea echipei de serviciu |
| B1 → Mobile Message | `event.created` | Mesaj de reamintire trimis unei liste |

## Configurare

### 1. Generează o cheie API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write`, pentru ca webhook-ul declanșator să se poată înregistra
- `people:read`, pentru a căuta numărul de telefon al destinatarului după un `personId`

### 2. Construiește Zap-ul cu Webhooks by Zapier

1. **Declanșator**: B1.church, alege evenimentul dorit (de exemplu, New Donation).
2. **Acțiune**: B1.church, Find Person (folosind `data.personId`) pentru a obține numărul de telefon și numele.
3. **Acțiune**: Webhooks by Zapier, **POST**. Configureaz-o după cum urmează.

Setările pasului POST:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier adaugă automat acest antet)
- **Basic Auth**: setează câmpul *Basic Auth* la `<api_username>|<api_password>` (Zapier convertește această valoare în antetul corect `Authorization: Basic …`)

Activează Zap-ul. Trimite un dar de test în B1Admin pentru a verifica dacă sosește un mesaj text.

## Rețete comune

### Reamintiri pentru evenimente, dimineața

- **Declanșator**: Schedule by Zapier (zilnic, la 7:00)
- **Acțiune**: B1.church, Find Events pentru ziua de azi (sau un pas Find cu un filtru de dată fix ori o listă cu evenimentele zilei, salvată într-un Google Sheet)
- **Acțiune**: Webhooks by Zapier, POST către Mobile Message cu lista de evenimente, pentru un grup de abonați înregistrat

### Folosește endpoint-ul de lot pentru o transmisie către o listă

Endpoint-ul `/v1/messages` al Mobile Message acceptă până la 10.000 de mesaje per apel. Pentru a trimite un mesaj unui grup B1:

- **Declanșator**: B1.church, New Form Submission (filtrat la un anumit formular)
- **Acțiune**: B1.church, List Group Members pentru grupul țintă (printr-un pas *Webhooks by Zapier, GET* pe `/membership/groupmembers?groupId=…`)
- **Acțiune**: Formatter by Zapier → Utilities → Line-itemize, pentru a transforma răspunsul într-un array `messages`
- **Acțiune**: Webhooks by Zapier, POST întregul array către `/v1/messages`

### Alternativa Make

Dacă preferi Make, adaugă modulul **HTTP — Make a request** după declanșatorul B1 Watch Events și configureaz-o în același mod (POST, Basic Auth, corp JSON). Consultă [Prezentarea generală Make](../make) pentru partea din B1.

## Limite și note

- **Basic Auth este singura metodă de autentificare**: Mobile Message emite un nume de utilizator și o parolă din panoul de control. Tratează ambele valori ca pe secrete.
- **`sender` trebuie să fie un Sender ID înregistrat** în contul tău Mobile Message, altfel trimiterea va returna `400 Invalid sender`. Reglementările din Australia cer înregistrarea expeditorului.
- **Numerele de telefon din Australia** pot fi scrise `0412345678` (local) sau `+61412345678` (internațional). API-ul acceptă ambele formate, dar normalizează-le la `+61…` dacă trimiți și mesaje în străinătate.
- **Până la 10.000 de mesaje per cerere**: util pentru transmiteri în masă, dar o singură livrare de webhook B1 va trimite rareori o listă atât de mare. Rezervă endpoint-ul de lot pentru Zap-urile programate de trimitere în masă.

## Depanare

- **POST returnează `401 Unauthorized`**: credențialele Basic Auth sunt greșite. Copiază-le din nou din panoul Mobile Message, *Account → API Settings*. Reține că implicit numele de utilizator este adresa de e-mail a contului, nu o cheie API separată.
- **POST returnează `400 Invalid sender`**: valoarea `sender` nu este un Sender ID înregistrat în contul tău. Înregistreaz-o mai întâi în panoul Mobile Message.
- **Mesajul sosește, dar este trunchiat**: Mobile Message împarte mesajele de peste ~160 de caractere în mai multe părți, iar tarifarea se face per parte. Verifică corpul răspunsului, care indică numărul de părți.

## Vezi și

- [Clearstream](./clearstream), [Text In Church](./text-in-church): alți furnizori SMS, cu aplicații Zapier native (nu este necesar un pas Webhooks by Zapier)
- [Zapier (prezentare generală)](../zapier): partea B1 din fiecare rețetă Zapier
- [Documentația API Mobile Message](https://mobilemessage.com.au/api-documentation)
