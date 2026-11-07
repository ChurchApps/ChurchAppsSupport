---
title: "API-sleutels"
---

# API-sleutels

<div class="article-intro">

API-sleutels (persoonlijke toegangstokens) zijn de eenvoudigste manier om je te authenticeren bij de B1 API vanuit een serverscript, een connector van derden (Zapier, Make, Google Sheets) of in situaties waarin een volledige OAuth-flow overdreven is. Een sleutel is gekoppeld aan een specifieke persoon in een specifieke kerk en erft de rechten van die persoon, beperkt door een optionele set scopes.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Een kerkbeheerder met het recht **Edit Settings** maakt sleutels aan en beheert ze
- De ruwe sleutel wordt **één keer** getoond bij het aanmaken — bewaar hem meteen op een veilige plek
- Alle API-verzoeken moeten **HTTPS** gebruiken

</div>

## Sleutelformaat

Een B1 API-sleutel ziet er als volgt uit:

```
cak_<prefix>.<secret>
```

- `cak_` — vaste identifier (het API-sleutelvoorvoegsel waarop de authenticatielaag zoekt)
- `<prefix>` — openbaar opzoeksegment van 8 tekens
- `<secret>` — geheim van 48 tekens; alleen een SHA-256-hash wordt server-side opgeslagen

De volledige sleutel wordt aan de server aangeboden in de standaard bearer-header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

De API-authenticatielaag stuurt elk token dat begint met `cak_` naar het API-sleutelpad, hasht het geheim, zoekt de sleutel op voorvoegsel op en bepaalt de huidige rechten van de persoon achter de sleutel. Als je een recht intrekt in B1Admin, geldt dit dus al bij het volgende verzoek, en de sleutel loopt nooit uit de pas met de rol.

## Een sleutel aanmaken (B1Admin)

1. Meld je aan bij B1Admin als gebruiker met **Edit Settings**.
2. Open **Settings → Developer → API Keys**.
3. Klik op **New API Key**, geef de sleutel een herkenbare naam (bijvoorbeeld "Zapier — donations sync"), selecteer de scopes die de sleutel moet hebben en klik op **Save**.
4. De volledige `cak_…`-sleutel wordt **één keer** getoond in een dialoogvenster. Kopieer hem naar de configuratie van je integratie voordat je het venster sluit. Later kun je hem niet meer opvragen. Je kunt altijd een nieuwe sleutel aanmaken.

## Scopes

Een scope **beperkt** wat een sleutel mag doen. Een scope kan nooit een recht toekennen dat de onderliggende persoon niet heeft. Als er geen scopes zijn geselecteerd, heeft de sleutel de volledige set rechten van de persoon.

| Scope | Staat toe |
|---|---|
| `people:read` / `people:write` | Personen, huishoudens en groepsleden bekijken / bewerken |
| `groups:read` / `groups:write` | Groepen en hun leden bekijken / bewerken |
| `donations:read` / `donations:write` | Donaties bekijken / registreren |
| `attendance:read` / `attendance:write` | Aanwezigheid, sessies en incheckingen bekijken / registreren |
| `forms:write` | Formulieren beheren (leestoegang is impliciet bij schrijfrechten) |
| `content:read` / `content:write` | Websitecontent, aanmeldingen en streaming bekijken / bewerken |
| `messaging:read` / `messaging:write` | Berichten lezen; schrijfrechten staan ook het verzenden van sms-berichten toe |
| `roles:read` / `roles:write` | Rolddefinities bekijken / bewerken |
| `settings:read` / `settings:write` | Kerkinstellingen bekijken / bewerken (**vereist** om webhooks programmatisch te registreren) |
| `workflows:read` / `workflows:write` | Workflows en taken bekijken / workflows uitvoeren en bewerken. Een workflow uitvoeren kan e-mails en sms'en verzenden, webhooks activeren en groepslidmaatschappen wijzigen |
| `offline_access` | Langlevende refreshtokens toestaan (alleen voor OAuth-flows — heeft geen effect op API-sleutels) |

`write`-scopes bevatten impliciet de bijbehorende `read`-scope. Beheerdersrechten voor de server en het domein worden bewust niet als scopes aangeboden. Een credential met beperkte scopes kan dus nooit uitgroeien tot sitebeheer.

:::tip
Als je de sleutel gebruikt om webhooks te registreren (bijvoorbeeld voor een Zapier- of Make-integratie), heeft de sleutel `settings:write` nodig. Een sleutel met alleen `people:read` geeft bij `POST /membership/webhooks` stilzwijgend een 403-fout terug.
:::

## Een sleutel gebruiken

Net als elk ander bearer-token: elk geauthenticeerd eindpunt accepteert API-sleutels op dezelfde manier als JWT's:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Als de scopes van een sleutel onvoldoende zijn, reageert het verzoek met **403 Forbidden**, in dezelfde vorm als andere foutmeldingen over ontbrekende rechten.

## Sleutels beheren via de API

Alle eindpunten vallen onder het pad `/membership/apiKeys` van de Membership-module. Ze vereisen een JWT (geen API-sleutel) van een kerkbeheerder met **Edit Settings**.

| Methode en pad | Doel |
|---|---|
| `GET /membership/apiKeys` | De sleutels van de kerk weergeven (zonder geheim — alleen `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lijst van alle beschikbare scopenamen — voor een interface om sleutels aan te maken |
| `POST /membership/apiKeys` | Een nieuwe sleutel aanmaken. Body: `{ "name": "...", "scopes": ["people:read"] }`. De respons bevat de ruwe `cak_…`-sleutel **één keer**. |
| `DELETE /membership/apiKeys/:id` | Een sleutel intrekken — geldt vanaf het volgende verzoek |

Een ingetrokken sleutel is meteen ongeldig. Er is geen overgangsperiode.

## Beste praktijken

- **Eén sleutel per integratie.** Als er iets gecompromitteerd raakt, trek je alleen die ene sleutel in zonder de andere integraties te verstoren.
- **Maak sleutels met de smalst mogelijke scopes die werken.** Een export naar Google Sheets heeft alleen `people:read` nodig, niet `settings:write`.
- **Koppel de sleutel aan een serviceaccount, niet aan een echt medewerker.** Als een medewerker vertrekt, eindigt zijn of haar B1-toegang, en daarmee ook alle sleutels die onder die identiteit zijn aangemaakt.
- **Bewaar sleutels in een secret manager** (de omgevingsvariabelen van je hostingprovider, AWS Secrets Manager, enz.) — nooit in versiebeheer.
- **Roteer sleutels** als je vermoedt dat ze zijn blootgesteld: maak een nieuwe sleutel aan, werk de integratie bij en verwijder daarna de oude sleutel.

## Het verschil met OAuth

API-sleutels passen wanneer **jouw kerk de enige is die de integratie gebruikt**. Voor een connector die toegang nodig heeft tot veel kerken, waarbij elke kerk er expliciet toestemming voor geeft (zoals een SaaS-app die binnen de B1-gemeenschap wordt gedeeld), gebruik je liever [OAuth en Verbonden apps](./connected-apps).

| | API-sleutel | OAuth |
|---|---|---|
| Wie installeert het | Eén kerkbeheerder | Elke kerkbeheerder autoriseert de app |
| Authenticatieheader | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Geldigheidsduur token | Tot intrekking | Toegang ≈ 7 dagen, refresh ≈ 90 dagen |
| Geschikt voor | Interne scripts, Zapier/Make/Sheets-connectors | Multi-tenant apps van derden |
