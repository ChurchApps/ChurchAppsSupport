---
title: "Strežnik MCP"
---

# Strežnik MCP

<div class="article-intro">

B1 API vključuje strežnik [MCP (Model Context Protocol)](https://modelcontextprotocol.io) na poti `/mcp`. Vsak odjemalec umetne inteligence, ki podpira MCP, na primer prilagojeni konektorji v claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor ali vaš lastni, se lahko poveže z njim in v imenu prijavljenega uporabnika cerkve pokliče osnovni REST API. Gre za tanek, splošen ovoj: tri splošna orodja dinamično izpostavijo celotno površino API-ja, namesto da bi vsako krajnjo točko posebej modelirali, poleg tega pa je tu še eno orodje z domenskim vodnikom za graditelj spletnih strani.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- [Ključ B1 API](./api-keys) (`cak_…`) z dovoljenji (scopes), ki jih mora imeti odjemalec, ali odjemalec MCP, ki se lahko prijavi z OAuth (glejte [Odkrivanje OAuth](#oauth-discovery))
- Dosegljiv gostitelj B1 API: `https://api.churchapps.org` za gostujoče cerkve ali vaša lastna namestitev
- Odjemalec MCP. Za nastavitev za končne uporabnike glejte [Claude](/docs/b1-admin/integrations/claude) in [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Krajnja točka

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Vidik | Vrednost |
|---|---|
| **Pot** | `/mcp` (glede na gostitelja API-ja) |
| **Metoda** | Samo `POST`; zahtevek/odgovor in pretakanje SSE potekata na isti krajnji točki |
| **Prenos** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Model seje** | Brez stanja. Za vsak zahtevek se zgradi nov strežniški primerek MCP, brez ID-ja seje in brez nadaljevanja |
| **Avtentikacija** | Nosilni žeton (Bearer). Ključi API `cak_…` in JWT-ji B1 (vključno z žetoni za dostop OAuth) delujejo; razreševanje je enako kot pri vsaki drugi avtentificirani krajnji točki |

Zahtevek, pri katerem manjka ali je neveljavna glava `Authorization`, vrne:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

s HTTP 401 in glavo `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, ki ji odjemalci s podporo OAuth sledijo, da začnejo prijavo.

Na gostujočem API-ju (produkcija in demo) je `/mcp` postrežen prek API Gateway HTTP API, ne prek REST API-ja, ki se uporablja za ostale krajnje točke. REST API na odzivih Lambda proxy preimenuje `WWW-Authenticate` v `x-amzn-remapped-www-authenticate`. Zaradi tega so odjemalci, kot je ChatGPT, dobili goli 401 brez možnosti za začetek prijave. HTTP API glavo prenese nespremenjeno.

## Orodja

Tri splošna orodja in en vodnik. Model uporabi `list_endpoints` za odkrivanje, `describe_endpoint` za spoznavanje oblike podatkov, `api_call` za dejanski klic API-ja in `describe_page_builder`, kadar naloga zadeva vsebino spletnega mesta.

### `list_endpoints`

Vrne popoln seznam registriranih poti REST, filtriranih po neobveznem podnizu in/ali HTTP glagolu. Vsak vnos vsebuje ime krmilnika in dovoljenja API ključa, ki so najverjetneje potrebna.

**Vhod:**

| Polje | Tip | Opis |
|---|---|---|
| `filter` | niz (neobvezno) | Podniz, neodvisen od velikosti črk, ki se ujema s potjo, npr. `"people"` |
| `method` | enum (neobvezno) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Izhod:** dokument JSON v obliki

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

Inventar se zgradi enkrat ob zagonu API-ja iz žive tabele poti. Vse, kar lahko zadenete s `curl`, se pojavi tukaj.

### `describe_endpoint`

Vrne kratek povzetek in, kadar je na voljo, ročno pripravljen primer telesa zahtevka in odziva za eno krajnjo točko.

**Vhod:**

| Polje | Tip | Opis |
|---|---|---|
| `method` | niz | HTTP glagol |
| `path` | niz | Celotna pot, kot jo vrne `list_endpoints` |

**Izhod:** pri pripravljenih krajnjih točkah primer s `summary`, `requestBody` in `responseSample`. Pri nepripravljenih krajnjih točkah sporočilo za nadomestni primer, ki modelu naroča, naj najprej pokliče `GET`, da vidi obliko. Približno ducat najbolj prometnih poti (osebe, skupine, darovanja, udeležba, skladi) je pripravljenih.

### `api_call`

Pokliče izbrano krajnjo točko REST v procesu, prek enakega sklada Express middleware kot pri običajnem zahtevku HTTP. Veljajo avtentikacija, razčlenjevanje telesa, revizijsko beleženje in omejitev na posamezno cerkev.

**Vhod:**

| Polje | Tip | Opis |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | niz | Pot, vključno z morebitno predpono modula, npr. `/membership/people` |
| `query` | objekt (neobvezno) | Ploski objekt parametrov poizvedbe niza |
| `body` | poljubno (neobvezno) | Telo zahtevka JSON, običajno polje objektov modela za `POST` |

**Izhod:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Rezultat orodja je označen z `isError: true` za vsak odziv s statusom ≥ 400.

### `describe_page_builder`

Edino orodje, ki ni splošno: statičen, samostojen vodnik za gradnjo spletnih strani prek krajnjih točk `/content/*`. Vsebuje podatkovni model Stran → Razdelek → Element, delovni tok ustvarjanja, vsak `elementType` s svojo obliko `answersJSON`, nastavitve na ravni razdelka, kot sta obliki delilnikov `dividerTop` in `dividerBottom`, ter celoten primer od začetka do konca. Ne sprejme vhoda in zrcali katalog elementov, ki ga vzdržuje urejevalnik B1Admin (glejte [Arhitektura graditelja spletnih strani](../architecture/website-builder)). Agenti naj ga pokličejo enkrat, preden ustvarjajo ali urejajo vsebino strani, nato pa ukrepajo prek `api_call`.

## Model avtentikacije

Sam zahtevek MCP teče skozi `CustomAuthProvider.getUser()`, to je ista pot, ki jo uporablja vsaka avtentificirana krajnja točka B1. Nosilec `cak_…` se razreši v `Principal`, katerega dovoljenja so **presek** trenutnega RBAC izdajatelja in dovoljenj, ki jih ima ključ. Ta presek se ponovno izračuna pri vsakem zahtevku, zato:

- odstranitev dovoljenja iz ključa (z brisanjem in ponovnim ustvarjanjem) prekine dostop pri naslednjem klicu;
- odstranitev dovoljenja osnovni osebi v B1Admin prekine dostop pri naslednjem klicu, tudi če ključ še obstaja.

Pri ugnezdenih klicih `api_call` se izvirna glava `Authorization` prenese na sintetični zahtevek. Zato `CustomAuthProvider` deluje znova in presek dovoljenj se ponovno uporabi pri vsakem klicu. Predpomnjenja žetonov ni.

## Seznam blokiranih poti

Majhna množica poti ni dosegljiva prek `api_call`, tudi z veljavnim ključem:

| Vzorec | Zakaj |
|---|---|
| `/giving/donate/webhook/*` | Krajnje točke webhook ponudnikov pričakujejo surova telesa, preverjena s podpisom, iz Stripe/PayPal, ne splošnih klicateljev |
| `/membership/oauth/clients*` | Registracija odjemalcev OAuth je namenjena samo operaterju |
| `/membership/people/apiEmails` | Zaščiteno z operaterjevim `jwtSecret`, ne z uporabniškimi dovoljenji |
| Katera koli pot, ki pričakuje `multipart/form-data` | Nalaganje datotek ni primerno za JSON-RPC |

Blokirana pot vrne rezultat orodja z `isError: true` in opisnim sporočilom. Osnovna pot se nikoli ne pokliče.

## Omejitev velikosti odgovora

Telo odgovora vsakega `api_call` je omejeno na **64 KB** zajetega izhoda. Če poizvedba presega omejitev, odgovor vsebuje `"truncated": true`, model pa naj poskusi znova z ožjimi parametri poizvedbe. Tako en odgovor orodja ne more napolniti kontekstnega okna odjemalca.

## Omejevanje hitrosti

Na `/mcp` ni omejitve hitrosti na ravni aplikacije. V produkciji se omejevanje prepusti API Gateway in sočasnosti Lambda, v lastnih namestitvah pa temu, kar izvaja vaš reverzni proxy.

## Odkrivanje OAuth

Strežnik MCP oglašuje metapodatke OAuth 2.1, da lahko odjemalci, ki se povežejo samo s strežniki, odkritimi prek OAuth (zlasti vmesnik »Add custom connector« v Claude.ai), prijavijo uporabnika brez prilepljenega ključa. `/mcp` je zaščiteni vir, [ponudnik OAuth](./connected-apps) pod `/membership/oauth` je strežnik za avtorizacijo, stran `/oauth` v B1Admin pa je zaslon za soglasje.

| Krajnja točka | Namen |
|---|---|
| `GET /.well-known/oauth-protected-resource` (tudi `/.well-known/oauth-protected-resource/mcp`) | Metapodatki zaščitenega vira (RFC 9728): `resource` je `<api>/mcp`, `authorization_servers` je korenski naslov API-ja, `scopes_supported` pa našteva vsako [dovoljenje API ključa](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metapodatki strežnika za avtorizacijo (RFC 8414): `authorization_endpoint` je B1Admin `/oauth`, `token_endpoint` je `/membership/oauth/token`, `registration_endpoint` je `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dinamična registracija odjemalca (RFC 7591) |

Potek, ki ga izvede odjemalec, kot je claude.ai:

1. `POST /mcp` brez žetona vrne 401 z glavo `WWW-Authenticate`, ki kaže na metapodatke zaščitenega vira.
2. Odjemalec prebere oba dokumenta z metapodatki in se nato registrira s `POST /membership/oauth/register`. Pošlje `client_name`, `redirect_uris` in po želji `scope`. Vsak samostojno registriran odjemalec je **javni** odjemalec: skrivnost ni izdana, odgovor pa vsebuje `token_endpoint_auth_method: "none"`. URI-ji za preusmeritev morajo biti `https` ali `http` na loopback naslovu (`localhost`, `127.0.0.1`, `[::1]`), največ 10 na odjemalca. Registracija je omejena na 20 na uro na IP naslov.
3. Uporabnik se pošlje na B1Admin `/oauth` s `code_challenge` in `code_challenge_method=S256`. Stran za soglasje navede vsako zahtevano dovoljenje v običajnem jeziku (ali »Vse, do česar lahko dostopa vaš račun B1«, če ni zahtevano nobeno), prikaže gostitelja, na katerega bo uporabnik vrnjen, in opozori, kadar je aplikacija registrirala samo sebe. Uporabnik klikne **Dovoli**.
4. Odjemalec zamenja kodo na `/membership/oauth/token` z `grant_type=authorization_code` in svojim `code_verifier`, kasneje pa osveži žeton z `grant_type=refresh_token`. Sprejeti sta telesi v obliki form-encoded in JSON.
5. Nastali žeton za dostop je JWT B1 z dovoljenji, ki se uporabi kot nosilec na `/mcp`.

Pravila PKCE: sprejet je samo `S256`. Odjemalec brez skrivnosti mora poslati `code_challenge` pri avtorizaciji in ustrezen `code_verifier` pri zamenjavi žetona. Zaupni odjemalci (s skrivnostjo) lahko še vedno uporabijo samo skrivnost. URI-ji za preusmeritev se morajo natančno ujemati z registriranim URI-jem.

Odjemalci, ki v konfiguraciji sprejmejo statični nosilni žeton (Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, lastna koda), lahko namesto tega še naprej uporabljajo ključ `cak_…`.

## Lokalni razvoj

Krajnja točka MCP se pri lokalnem zagonu API-ja namesti skupaj z vsem ostalim:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Ob zagonu vrstica dnevnika `📡 MCP server ready at /mcp — N routes in inventory` potrdi, da je bil inventar zgrajen.

Preverite jo z MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

V vmesniku Inspector ga usmerite na `http://localhost:8084/mcp` in nastavite glavo `Authorization` na `Bearer cak_<prefix>.<secret>`. Najprej pokličite `list_endpoints`. Videti bi morali celoten seznam poti. Nato naj bi `api_call({ method: "GET", path: "/membership/people" })` vrnil vaše lokalne semenske osebe.

## Postavitev kode

Strežnik MCP je v `src/modules/mcp/` v repozitoriju Api. Pomembne datoteke:

| Datoteka | Namen |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; za vsak zahtevek poveže `StreamableHTTPServerTransport` in ob 401 pošlje izziv `WWW-Authenticate` |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Postreže dokumente za odkrivanje OAuth pod `/.well-known` |
| `McpServer.ts` | Zgradi strežnik MCP `Server` in registrira štiri orodja |
| `RouteInventory.ts` | Ob zagonu preleti metapodatke inversify-express-utils in našteje poti |
| `internalDispatch.ts` | Sintetična `req`/`res`, ki ponovno vstopi v aplikacijo Express v procesu |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Pripravljeni vzorci zahtevkov in odgovorov za najbolj prometne krajnje točke |

## Povezano

- [Ključi API](./api-keys)
- [Webhooki](./webhooks)
- [Povezane aplikacije (OAuth)](./connected-apps)
- [Claude: nastavitev za končne uporabnike](/docs/b1-admin/integrations/claude)
- [ChatGPT: nastavitev za končne uporabnike](/docs/b1-admin/integrations/chatgpt)
