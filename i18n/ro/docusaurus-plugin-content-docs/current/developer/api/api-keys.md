---
title: "Chei API"
description: "Creați, limitați și revocați cheile API B1 în B1 Admin pentru scripturi de server și conectorii Zapier, Make sau Google Sheets, fără un flux OAuth complet."
---

# Chei API

<div class="article-intro">

Cheile API (token-uri de acces personal) sunt cea mai simplă modalitate de autentificare în API-ul B1 dintr-un script de pe server, dintr-un conector terț (Zapier, Make, Google Sheets) sau oriunde un flux OAuth complet ar fi exagerat. O cheie este legată de o anumită persoană dintr-o anumită biserică și moștenește permisiunile acelei persoane, restrânse printr-un set opțional de scope-uri.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un administrator al bisericii cu permisiunea **Editare setări** creează și gestionează cheile
- Cheia brută este afișată **o singură dată**, la creare — salvați-o imediat într-un loc sigur
- Toate cererile API trebuie să folosească **HTTPS**

</div>

## Formatul cheii

O cheie API B1 arată astfel:

```
cak_<prefix>.<secret>
```

- `cak_` — identificator fix (prefixul cheii API după care se potrivește stratul de autentificare)
- `<prefix>` — segment public de căutare, de 8 caractere
- `<secret>` — secret de 48 de caractere; pe server se stochează doar un hash SHA-256

Cheia completă este trimisă serverului în antetul bearer standard:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Stratul de autentificare API direcționează orice token care începe cu `cak_` către calea cheilor API, calculează hash-ul secretului, îl caută după prefix și determină permisiunile actuale ale persoanei asociate cheii. Astfel, revocarea unei permisiuni în B1Admin produce efect la următoarea cerere, iar cheia nu ajunge niciodată nesincronizată cu rolul.

## Crearea unei chei (B1Admin)

1. Autentificați-vă în B1Admin ca utilizator cu **Editare setări**.
2. Deschideți **Setări → Dezvoltator → Chei API**.
3. Faceți clic pe **Cheie API nouă**, dați-i un nume ușor de recunoscut (de exemplu „Zapier — sincronizare donații”), selectați scope-urile pe care trebuie să le aibă cheia și apăsați **Salvează**.
4. Cheia completă `cak_…` este afișată **o singură dată**, într-o fereastră de dialog. Copiați-o în configurația integrării înainte de a închide fereastra — nu mai poate fi recuperată ulterior. Puteți oricând să creați o cheie nouă.

## Scope-uri

Un scope **restrânge** ce poate face o cheie — niciodată nu poate acorda o permisiune pe care persoana de bază nu o are. Lipsa scope-urilor înseamnă că cheia are întregul set de permisiuni al persoanei.

| Scope | Permite |
|---|---|
| `people:read` / `people:write` | Vizualizare / editare persoane, gospodării, membri ai grupurilor |
| `groups:read` / `groups:write` | Vizualizare / editare grupuri și a membrilor acestora |
| `donations:read` / `donations:write` | Vizualizare / înregistrare donații |
| `attendance:read` / `attendance:write` | Vizualizare / înregistrare prezențe, sesiuni, check-in-uri |
| `forms:write` | Gestionare formulare (accesul de citire este implicit în scope-ul de scriere) |
| `content:read` / `content:write` | Vizualizare / editare conținut site, înregistrări, streaming |
| `messaging:read` / `messaging:write` | Citire mesagerie; scrierea permite și trimiterea de SMS-uri |
| `roles:read` / `roles:write` | Vizualizare / editare definiții de roluri |
| `settings:read` / `settings:write` | Vizualizare / editare setări ale bisericii (**necesar** pentru înregistrarea programatică a webhook-urilor) |
| `workflows:read` / `workflows:write` | Vizualizare fluxuri de lucru și sarcini / rulare și editare fluxuri de lucru. Rularea unui flux de lucru poate trimite e-mailuri și SMS-uri, poate declanșa webhook-uri și poate modifica apartenența la grupuri |
| `offline_access` | Permite token-uri de reîmprospătare de lungă durată (doar fluxuri OAuth — nu are efect asupra cheilor API) |

Scope-urile `write` includ implicit scope-ul `read` corespunzător. Permisiunile de administrare a serverului și a domeniului nu sunt expuse intenționat ca scope-uri — o credențială cu scope-uri restrânse nu poate ajunge niciodată la administrarea site-ului.

:::tip
Dacă veți folosi cheia pentru a înregistra webhook-uri (de exemplu pentru o integrare Zapier sau Make), cheia are nevoie de `settings:write`. O cheie care are doar `people:read` primește în mod silențios eroarea 403 la `POST /membership/webhooks`.
:::

## Utilizarea unei chei

Ca la orice token bearer, fiecare endpoint autentificat acceptă cheile API exact ca pe JWT-uri:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

O cerere a cărei cheie are scope-uri insuficiente primește răspunsul **403 Forbidden**, cu aceeași structură ca orice eroare de permisiune refuzată.

## Gestionarea cheilor prin API

Toate endpoint-urile se află sub calea `/membership/apiKeys` a modulului Membership și necesită un JWT (nu o cheie API) de la un administrator al bisericii cu **Editare setări**.

| Metodă și cale | Scop |
|---|---|
| `GET /membership/apiKeys` | Listează cheile bisericii (fără secret — doar `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Listează toate numele de scope-uri disponibile — util pentru o interfață de creare a cheilor |
| `POST /membership/apiKeys` | Creează o cheie nouă. Corpul: `{ "name": "...", "scopes": ["people:read"] }`. Răspunsul include cheia brută `cak_…`, **o singură dată**. |
| `DELETE /membership/apiKeys/:id` | Revocă o cheie — produce efect la următoarea cerere |

O cheie revocată nu mai funcționează imediat — nu există perioadă de grație.

## Bune practici

- **O cheie pentru fiecare integrare.** Dacă ceva este compromis, revocați o singură cheie fără a afecta celelalte.
- **Creați scope-urile cele mai restrânse care funcționează.** Un export în Google Sheets are nevoie doar de `people:read`, nu de `settings:write`.
- **Legați cheia de un cont de serviciu, nu de un membru real al personalului.** Dacă un membru al personalului pleacă, accesul său la B1 se încheie — și odată cu el și toate cheile create sub identitatea sa.
- **Stocați cheile într-un manager de secrete** (variabilele de mediu ale furnizorului de hosting, AWS Secrets Manager etc.), niciodată în sistemul de control al versiunilor.
- **Rotiți cheile** dacă bănuiți o expunere: creați o cheie nouă, actualizați integrarea, apoi ștergeți cheia veche.

## Diferența față de OAuth

Cheile API sunt potrivite atunci când **biserica dumneavoastră este singura care folosește integrarea**. Pentru un conector care trebuie să acceseze multe biserici, cu consimțământul explicit al fiecăreia, de exemplu o aplicație SaaS partajată în comunitatea B1, folosiți în schimb [OAuth și aplicații conectate](./connected-apps.md).

| | Cheie API | OAuth |
|---|---|---|
| Cine o instalează | Un administrator al bisericii | Fiecare administrator al bisericii autorizează aplicația |
| Antet de autentificare | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durata de viață a token-ului | Până la revocare | Acces ≈ 7 zile, reîmprospătare ≈ 90 de zile |
| Cel mai potrivit pentru | Scripturi interne, conectori Zapier/Make/Sheets | Aplicații terțe multi-tenant |
