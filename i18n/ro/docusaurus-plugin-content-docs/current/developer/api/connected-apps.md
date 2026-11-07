---
title: "Aplicații conectate și OAuth"
---

# Aplicații conectate și OAuth

<div class="article-intro">

API-ul B1 acceptă OAuth 2.0, astfel încât o aplicație a unui terț poate cere fiecărui administrator de biserică permisiunea de a accesa datele acesteia, fără ca biserica să ofere vreodată o parolă sau o cheie API. O **aplicație conectată** este un token OAuth aprobat de un administrator de biserică; revocarea lui întrerupe accesul aplicației terțe dintr-un singur clic. Folosiți această cale pentru conectorii SaaS multi-tenant. Pentru o integrare cu o singură biserică, preferați [Chei API](./api-keys).

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un **client** OAuth trebuie înregistrat înainte ca bisericile să îi poată acorda acces — de către un administrator de server B1 sau de către clientul însuși, prin [înregistrare dinamică](#dynamic-client-registration)
- Toate endpoint-urile OAuth se află în modulul Membership: `/membership/oauth/...`
- Tokenurile de acces sunt JWT-uri — acestea conțin permisiunile utilizatorului, filtrate după domeniile de acces (scopes) acordate

</div>

## Concepte

| Termen | Semnificație |
|---|---|
| **Client OAuth** | Aplicația terță în sine — identificată prin `client_id`, protejată prin `client_secret`. Este înregistrată o singură dată la B1 și este partajată de toate bisericile care o instalează. |
| **Aplicație conectată** | O pereche specifică `(client, administrator de biserică)` pentru care administratorul a acordat accesul clientului. Fiecare aplicație conectată are un token de reîmprospătare OAuth asociat. |
| **Token de acces** | Un JWT cu valabilitate scurtă (≈ 7 zile), pe care clientul îl folosește pentru apelurile API. Are aceeași structură ca un JWT de utilizator — `Authorization: Bearer <jwt>`. |
| **Token de reîmprospătare** | Un șir opac, cu valabilitate lungă (≈ 90 de zile), pe care clientul îl folosește pentru a obține tokenuri de acces noi. |
| **Domeniu de acces (scope)** | Limitează ce poate face tokenul de acces — consultați [catalogul de domenii](./api-keys#scopes). |

## Fluxuri de acordare

B1 acceptă trei fluxuri OAuth, toate definite de RFC 6749 și RFC 8628.

### Codul de autorizare (aplicații web)

Folosiți-l când aplicația dvs. are o componentă pe server și poate păstra `client_secret` în siguranță.

1. **Autorizare**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Clienții publici (fără `client_secret`) trebuie să trimită și `"code_challenge": "..."` și `"code_challenge_method": "S256"` (PKCE, RFC 7636). Este acceptat doar `S256`.

   Răspunsul este `{ "code": "...", "state": "xyz" }`. Endpoint-ul pentru codul de autorizare este intenționat un POST autentificat — aplicația dvs. colectează JWT-ul B1 al utilizatorului (de obicei prin afișarea unui buton în sesiunea sa B1) și îl transmite ca parte a pasului de consimțământ.

2. **Schimbați codul pe tokenuri**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Dacă pasul de autorizare a trimis un `code_challenge`, includeți și `"code_verifier": "..."` corespunzător. Un client public trimite verificatorul și omite `client_secret`. Endpoint-ul de token acceptă corpuri JSON sau codificate ca formular (`application/x-www-form-urlencoded`).

   Returnează răspunsul cu tokenuri:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Reîmprospătați** atunci când tokenul de acces este pe cale să expire:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Tokenul de reîmprospătare expiră după 90 de zile de neutilizare; dacă a expirat, administratorul de biserică trebuie să acorde din nou autorizarea.

### Codul dispozitivului (televizoare, chioșcuri, CLI)

Folosiți-l când dispozitivul nu are browser. Definit de RFC 8628.

1. **Solicitați un cod de dispozitiv**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Returnează codul afișat utilizatorului și intervalul de interogare:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Afișați `user_code` și `verification_uri` utilizatorului.

3. **Interogați** `/membership/oauth/token` cu `grant_type=urn:ietf:params:oauth:grant-type:device_code` și `device_code`. Răspunsurile standard sunt:

   | Eroare | Semnificație |
   |---|---|
   | `authorization_pending` | Utilizatorul nu a aprobat încă — continuați interogarea la intervalul sugerat |
   | `expired_token` | Codul dispozitivului a depășit `expires_in` — începeți din nou |
   | `access_denied` | Utilizatorul a refuzat cererea |
   | _(niciunul — 200 OK)_ | Aprobat — corpul este un `B1TokenResponse` |

4. Odată aprobat, stocați `refresh_token` și folosiți `access_token` până expiră.

SDK-ul B1 include `B1OAuthClient.awaitDeviceToken(...)`, care rulează bucla de interogare în locul dvs., cu o întârziere progresivă conformă RFC.

### Tokenul de reîmprospătare

Este întotdeauna disponibil ca o cerere independentă, odată ce aveți un `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Se returnează un `access_token` și un `refresh_token` noi. **Clienții publici** (fără `client_secret`) pot omite `client_secret` la reîmprospătare — util pentru aplicațiile OAuth mobile sau desktop, care nu pot păstra un secret.

Tokenurile de reîmprospătare se rotesc, dar cel vechi nu este eliminat imediat. Dacă un client nu primește niciodată răspunsul la reîmprospătare (de exemplu, un televizor care a rămas fără alimentare sau fără Wi-Fi în timpul cererii), poate reîncerca cu `refresh_token`-ul anterior timp de până la **7 zile**. Reîncercarea reușește doar cât timp tokenul de înlocuire nu a fost încă folosit; tokenul de înlocuire neutilizat este apoi eliminat, iar o pereche nouă este emisă. Odată ce tokenul de înlocuire a fost el însuși reîmprospătat, tokenul vechi returnează `invalid_grant`. Revocarea unei conexiuni revocă și tokenurile rotite care se află încă în această fereastră de grație, iar lista aplicațiilor conectate afișează fiecare conexiune o singură dată.

## Structura tokenului

Un token de acces este un JWT emis de B1, identic cu cel pe care l-ar primi un utilizator de la `POST /membership/users/login` — aceeași revendicare modulară de permisiuni, același comportament `checkAccess` în fiecare controller — **cu excepția** faptului că tabloul de permisiuni a fost filtrat prin domeniile acordate în momentul emiterii. Un token de acces cu domenii limitate nu poate face nimic ce nu ar putea face o cheie API cu domenii similare, iar în niciun controller nu există o „cale OAuth” separată; `actionWrapper` nu știe dacă posesorul tokenului este o persoană, o cheie API sau un client OAuth.

## Aplicații conectate (pentru utilizatori)

Din punctul de vedere al administratorului de biserică, „Aplicații conectate” este lista aplicațiilor cărora li s-a acordat acces la biserica sa. Fiecare rând este o pereche activă `(OAuthClient, OAuthToken)`.

În B1Admin: **Setări → Dezvoltator → Aplicații conectate** afișează:

- Numele clientului
- Domeniile de acces aprobate de administrator
- Data la care a fost acordat accesul
- Un buton **Revocă**

| Metodă și cale | Autentificare | Scop |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Listează conexiunile active ale apelantului (asociate cu numele clientului și domeniile de acces) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revocă o conexiune după id-ul tokenului OAuth — tokenul încetează să funcționeze la următoarea cerere |

Lista exclude automat tokenurile expirate.

## Domenii de acces și consimțământ

Șirurile de domenii de acces sunt același catalog ca la [chei API](./api-keys#scopes). Bunele practici pentru clienți:

- **Solicitați cele mai restrictive domenii care funcționează.** Bisericile observă dacă cereți `donations:write` când aveți nevoie doar de citire a persoanelor.
- **Folosiți un token de reîmprospătare și tokenuri de acces cu valabilitate scurtă.** Tokenurile de acces cu valabilitate lungă sunt mai greu de revocat rapid.
- **Afișați întotdeauna utilizatorului domeniile acordate în propria interfață**, pentru ca el să poată verifica la ce a consimțit.

## Administrarea clienților OAuth

Clienții OAuth (aplicațiile terțe în sine) sunt înregistrați global. Un client confidențial cu `client_secret` este creat de un administrator de server B1 — pentru a obține unul, contactați echipa ChurchApps pentru o pereche `client_id` / `client_secret` și înregistrați URI-urile de redirecționare. Clienții publici, precum conectorii MCP, se pot înregistra singuri (mai jos).

URI-urile de redirecționare înregistrate trebuie să corespundă exact cu `redirect_uri` din cerere; o potrivire de prefix sau parțială este respinsă.

| Metodă și cale | Permisiune | Descriere |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Listează toți clienții OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Obține un client după id-ul său public (secretul este ascuns) |
| `POST /membership/oauth/clients` | Server.Admin | Creează sau actualizează un client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Șterge un client |

### Înregistrare dinamică a clientului

`POST /membership/oauth/register` (public, RFC 7591) permite unui client, cum ar fi conectorul MCP al claude.ai, să se înregistreze singur. Este anunțat în documentul `/.well-known/oauth-authorization-server` al API-ului — consultați [Server MCP → Descoperire OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Returnează 201 cu `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) și `token_endpoint_auth_method: "none"`.

- Nu se emite niciodată un secret, prin urmare clientul trebuie să folosească PKCE la fiecare autorizare.
- `redirect_uris` trebuie să fie între 1 și 10 URL-uri `https`, sau `http` pe `localhost`, `127.0.0.1` sau `[::1]`.
- `client_name` este tăiat la 45 de caractere (implicit „AI assistant”).
- Limitat la 20 de înregistrări pe oră pe adresă IP.

Pe pagina de consimțământ din B1Admin, un client înregistrat singur primește o notificare că s-a înregistrat singur, că nu poate face niciodată mai mult decât contul B1 al utilizatorului și că poate fi deconectat din **Setări → Dezvoltator → Aplicații conectate**.

## Suport SDK

Pachetul `@churchapps/integration-sdk` învelește fiecare flux OAuth cu funcții ajutătoare tipizate — `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Consultați README-ul pachetului și [Webhook-uri](./webhooks#sdk-support) pentru un exemplu complet.
