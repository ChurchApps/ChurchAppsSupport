---
title: "Prijungtos programos ir OAuth"
---

# Prijungtos programos ir OAuth

<div class="article-intro">

B1 API palaiko OAuth 2.0, todėl trečiosios šalies programa gali paprašyti kiekvieno bažnyčios administratoriaus leidimo pasiekti jo duomenis, ir bažnyčiai nereikia niekada dalytis slaptažodžiu ar API raktu. **Prijungta programa** yra OAuth raktas, kurį bažnyčios administratorius patvirtino. Jį panaikinus, trečiosios šalies programos prieiga nutraukiama vienu paspaudimu. Šį kelią naudokite daugiabučiams SaaS jungikliams. Vienos bažnyčios integracijai geriau naudokite [API raktus](./api-keys).

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- OAuth **klientas** turi būti užregistruotas, kol bažnyčios gali suteikti jam prieigą. Tai atlieka B1 serverio administratorius arba pats klientas per [dinaminę registraciją](#dynamic-client-registration)
- Visos OAuth galutinės vietos yra Narystės modulyje: `/membership/oauth/...`
- Prieigos raktai yra JWT. Juose yra naudotojo leidimai, filtruoti pagal suteiktas sritis

</div>

## Sąvokos

| Terminas | Reikšmė |
|---|---|
| **OAuth klientas** | Pati trečiosios šalies programa. Ją identifikuoja `client_id`, o apsaugo `client_secret`. Užregistruojama B1 sistemoje vieną kartą ir bendrinama tarp visų bažnyčių, kurios ją įdiegia. |
| **Prijungta programa** | Konkreti `(klientas, bažnyčios administratorius)` pora, kai administratorius suteikė klientui prieigą. Kiekvieną prijungtą programą palaiko OAuth atnaujinimo raktas. |
| **Prieigos raktas** | Trumpalaikis JWT (≈ 7 dienos), kurį klientas naudoja API iškvietimams. Struktūra tokia pati kaip naudotojo JWT: `Authorization: Bearer <jwt>`. |
| **Atnaujinimo raktas** | Ilgalaikė neskaidri eilutė (≈ 90 dienų), kurią klientas naudoja naujiems prieigos raktams gauti. |
| **Sritis** | Apriboja, ką prieigos raktas gali daryti. Žr. [sričių katalogą](./api-keys#scopes). |

## Suteikimo srautai

B1 palaiko tris OAuth srautus. Visi jie apibrėžti RFC 6749 ir RFC 8628.

### Autorizacijos kodas (žiniatinklio programos)

Naudokite, kai jūsų programa turi serverinę dalį ir gali laikyti `client_secret` paslaptyje.

1. **Autorizuoti**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Viešieji klientai (be `client_secret`) taip pat privalo siųsti `"code_challenge": "..."` ir `"code_challenge_method": "S256"` (PKCE, RFC 7636). Priimamas tik `S256`.

   Grąžina `{ "code": "...", "state": "xyz" }`. Autorizacijos kodo galutinė vieta tyčia yra autentifikuota POST užklausa. Jūsų programa surenka naudotojo B1 JWT (paprastai rodydama mygtuką naudotojo B1 sesijoje) ir perduoda jį kaip dalį sutikimo žingsnio.

2. **Pakeisti kodą į raktus**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Jei autorizavimo žingsnyje buvo išsiųstas `code_challenge`, įtraukite atitinkamą `"code_verifier": "..."`. Viešasis klientas siunčia verifier ir praleidžia `client_secret`. Raktų galutinė vieta priima JSON arba formos koduotus (`application/x-www-form-urlencoded`) turinius.

   Grąžina raktų atsakymą:

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

3. **Atnaujinti**, kai prieigos raktas netrukus baigs galioti:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Atnaujinimo raktas nustoja galioti po 90 dienų nenaudojimo. Jei jis pasibaigė, bažnyčios administratorius turi autorizuoti iš naujo.

### Įrenginio kodas (televizoriai, kioskai, CLI)

Naudokite, kai įrenginyje nėra naršyklės. Apibrėžta RFC 8628.

1. **Užklausti įrenginio kodą**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Grąžina naudotojui skirtą kodą ir apklausos intervalą:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Parodykite naudotojui `user_code` ir `verification_uri`.

3. **Apklausti** `/membership/oauth/token` su `grant_type=urn:ietf:params:oauth:grant-type:device_code` ir `device_code`. Standartiniai atsakymai:

   | Klaida | Reikšmė |
   |---|---|
   | `authorization_pending` | Naudotojas dar nepatvirtino. Toliau apklausinėkite rekomenduojamu intervalu |
   | `expired_token` | Įrenginio kodas pasibaigė pagal `expires_in`. Pradėkite iš naujo |
   | `access_denied` | Naudotojas atmetė užklausą |
   | _(nėra, 200 OK)_ | Patvirtinta. Turinys yra `B1TokenResponse` |

4. Kai užklausa patvirtinama, išsaugokite `refresh_token` ir naudokite `access_token`, kol jis nebegalios.

B1 SDK turi `B1OAuthClient.awaitDeviceToken(...)`, kuris už jus vykdo apklausos ciklą su RFC atitinkančiu pakartotinio bandymo delsimu.

### Atnaujinimo raktas

Visada galima atlikti atskirą užklausą, kai turite `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Grįžta nauji `access_token` ir `refresh_token`. **Viešieji klientai** (be `client_secret`) gali praleisti `client_secret` atnaujindami. Tai naudinga mobiliosioms ir darbalaukio OAuth programoms, kurios negali laikyti paslapties.

Atnaujinimo raktai keičiami, tačiau senasis iš karto nepanaikinamas. Jei klientas niekada negauna atnaujinimo atsakymo (pavyzdžiui, televizorius netenka maitinimo ar Wi-Fi ryšio užklausos metu), jis gali bandyti dar kartą naudodamas ankstesnį `refresh_token` iki **7 dienų**. Pakartotinis bandymas pavyksta tik tol, kol pakaitinis raktas dar nebuvo panaudotas. Nepanaudotas pakaitinis raktas tada atmetamas ir išduodama nauja pora. Kai pats pakaitinis raktas jau buvo atnaujintas, senasis raktas grąžina `invalid_grant`. Panaikinus ryšį, panaikinami ir visi tame malonės laikotarpyje dar esantys pakeisti raktai. Prijungtų programų sąraše kiekvienas ryšys rodomas vieną kartą.

## Raktų struktūra

Prieigos raktas yra B1 išduotas JWT, identiškas tam, kurį naudotojas gautų iš `POST /membership/users/login`. Jame yra tas pats modulinis leidimų teiginys ir kiekviename valdiklyje veikia tas pats `checkAccess`. **Išskyrus** tai, kad leidimų masyvas išduodant buvo perfiltruotas pagal suteiktas sritis. Prieigos raktas su sritimis negali atlikti nieko, ko negalėtų panašiomis sritimis aprūpintas API raktas. Jokiame valdiklyje nėra atskiro „OAuth kelio“. `actionWrapper` nežino, ar laikytojas yra asmuo, API raktas ar OAuth klientas.

## Prijungtos programos (naudotojui matomos)

Bažnyčios administratoriaus požiūriu „Prijungtos programos“ yra programų, kurioms suteikta prieiga prie jų bažnyčios, sąrašas. Kiekviena eilutė yra aktyvi `(OAuthClient, OAuthToken)` pora.

B1Admin: **Nustatymai → Kūrėjui → Prijungtos programos** rodo:

- Kliento pavadinimą
- Administratoriaus patvirtintas sritis
- Prieigos suteikimo datą
- Mygtuką **Panaikinti**

| Metodas ir kelias | Autentifikavimas | Paskirtis |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Išvardija iškvietėjo aktyvius ryšius (su kliento pavadinimu ir sritimis) |
| `DELETE /membership/oauth/connections/:id` | JWT | Panaikina ryšį pagal jo OAuth rakto ID. Raktas nustoja veikti kitoje užklausoje |

Sąraše automatiškai nerodomi pasibaigę raktai.

## Sritys ir sutikimas

Sričių eilutės yra tas pats katalogas kaip [API raktų](./api-keys#scopes). Geriausia praktika klientams:

- **Prašykite siauriausių veikiančių sričių.** Bažnyčios pastebi, jei prašote `donations:write`, kai tereikia skaityti žmonių duomenis.
- **Naudokite atnaujinimo raktą ir trumpalaikius prieigos raktus.** Ilgalaikius prieigos raktus sunkiau greitai panaikinti.
- **Visada rodykite suteiktas sritis naudotojui** savo sąsajoje, kad jis galėtų patikrinti, ką patvirtino.

## OAuth klientų valdymas

OAuth klientai (pačios trečiųjų šalių programos) registruojami globaliai. Konfidencialų klientą su `client_secret` sukuria B1 serverio administratorius. Norėdami gauti vieną, kreipkitės į ChurchApps komandą dėl `client_id` / `client_secret` poros ir užregistruokite savo peradresavimo URI. Viešieji klientai, pavyzdžiui MCP jungikliai, gali registruotis patys (žemiau).

Užregistruoti peradresavimo URI turi tiksliai atitikti užklausoje esantį `redirect_uri`. Priešdėlio ar dalinis atitikimas atmetamas.

| Metodas ir kelias | Leidimas | Aprašymas |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Išvardyti visus OAuth klientus |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Gauti klientą pagal viešąjį ID (paslaptis paslėpta) |
| `POST /membership/oauth/clients` | Server.Admin | Sukurti arba atnaujinti klientą |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Ištrinti klientą |

### Dinaminė kliento registracija

`POST /membership/oauth/register` (viešas, RFC 7591) leidžia klientui, pavyzdžiui claude.ai MCP jungikliui, užsiregistruoti pačiam. Apie tai skelbiama API dokumente `/.well-known/oauth-authorization-server`. Žr. [MCP serveris → OAuth atradimas](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Grąžina 201 su `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) ir `token_endpoint_auth_method: "none"`.

- Paslaptis niekada neišduodama, todėl klientas kiekvienos autorizacijos metu privalo naudoti PKCE.
- `redirect_uris` turi būti nuo 1 iki 10 `https` URL arba `http` adresai su `localhost`, `127.0.0.1` ar `[::1]`.
- `client_name` apkarpomas iki 45 simbolių (numatytoji reikšmė – „AI assistant“).
- Ribojama iki 20 registracijų per valandą iš vieno IP.

B1Admin sutikimo puslapyje savarankiškai užsiregistravusi programa gauna pranešimą, kad ji užsiregistravo pati. Ji negali atlikti daugiau nei paties naudotojo B1 paskyra, o atjungti ją galima skiltyje **Nustatymai → Kūrėjui → Prijungtos programos**.

## SDK palaikymas

Paketas `@churchapps/integration-sdk` apgaubia kiekvieną OAuth srautą tipizuotomis pagalbinėmis funkcijomis: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Žr. paketo README ir [Webhook'ai](./webhooks#sdk-support), kur pateiktas pilnas pavyzdys.
