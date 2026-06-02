---
title: "Tilkoblede apper og OAuth"
---

# Tilkoblede apper og OAuth

<div class="article-intro">

B1 API støtter OAuth 2.0 slik at et tredjepartsapplikasjoner kan be hver kirkeadmin om tillatelse til å få tilgang til dataene deres -- uten at kirken noen gang deler et passord eller API-nøkkel. En **Tilkoblet app** er en OAuth-token en kirkeadmin har godkjent; å tilbakekalle den kutter tredjeparts appens tilgang i ett klikk. Bruk denne banen for multi-leier SaaS-koblinger. For en enkelt-kirke-integrasjon foretrekk [API-nøkler](./api-keys).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En OAuth **klient** må være registrert (for tiden av en B1-serveradmin) før kirker kan gi det tilgang
- Alle OAuth-sluttpunkter bor under medlemskapsmodulen: `/membership/oauth/...`
- Tilgangstokener er JWTs -- de bærer brukerens tillatelser filtrert etter de innvilgede omfangene

</div>

## Konsepter

| Begrep | Betydning |
|---|---|
| **OAuth-klient** | Tredjeparts-appen selv -- identifisert av `client_id`, sikret av `client_secret`. Registrert en gang med B1, delt på tvers av alle kirker som installerer det. |
| **Tilkoblet app** | Et spesifikt `(client, church-admin)`-par der admin har gitt klienten tilgang. Hver tilkoblet app er støttet av en OAuth-oppfriskingstoken. |
| **Tilgangstoken** | En korttids JWT (≈ 7 dager) klienten bruker for API-kall. Samme form som en bruker JWT -- `Authorization: Bearer <jwt>`. |
| **Oppfriskningstoken** | En langvarig ugjennomsiktig streng (≈ 90 dager) klienten bruker for å mynte nye tilgangstokener. |
| **Omfang** | Begrenser hva tilgangtokenen kan gjøre -- se [omfangkatalogen](./api-keys#scopes). |

## Grant Flows

B1 støtter tre OAuth-flytene, alle definert av RFC 6749 + RFC 8628.

### Autorisasjonskode (web-apper)

Bruk når appen din har en serverside-komponent og kan holde `client_secret` privat.

1. **Autorisere**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Returnerer `{ "code": "...", "state": "xyz" }`. Autorisasjonskode-sluttpunktet er intensjonalt en autentisert POST -- appen din samler brukerens B1 JWT (typisk ved å være vert for en knapp i brukerens B1-sesjon) og videresender det som del av samtykkestrinnet.

2. **Bytt kode for tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Returnerer tokenresponsen:

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

3. **Oppfrisk** når tilgangtokenen er på vei til å utløpe:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Oppfriskningstoken utløper etter 90 dagers ubruk; hvis den har utløpt godkjenner kirkeadmin igjen.

## SDK-støtte

`@churchapps/integration-sdk`-pakken pakker hver OAuth-flyt med typede hjelpere. Se pakken README for end-to-end eksempler.
