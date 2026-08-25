---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Koble OpenAI sin ChatGPT til kirkens B1-data og la den gjøre det tunge arbeidet. Når den er tilkoblet, kan ChatGPT se live kirkeoppføringene dine og hjelpe deg med å få ting gjort som ellers ville ta flere trinn i B1 Admin eller som du ikke kunne finne ut hvordan man skulle gjøre.

**Noen ting du kan be det gjøre:**
- Sett opp undervisningsklassrom og plasser hver lærer i riktig rom basert på gruppen deres
- Vis meg alle som møtte opp forrige uke, men som ikke har blitt tildelt en smågruppe
- Oppsummer denne måneds giver etter fond
- Hvem er våre nyeste medlemmer og har vi fulgt opp med dem?
- Jeg kan ikke finne ut hvordan jeg skal gjøre X i B1 -- kan du lede meg gjennom det eller gjøre det for meg?

ChatGPT henter svarene og tar handlinger direkte fra B1-dataene dine, begrenset til kun kirken din.

:::tip Anbefalt: Claude Code
For den glatteste MCP-opplevelsen, Claude Code er den anbefalte klienten -- oppsettet tar en kommando og det fungerer ut av boksen. ChatGPT fungerer også og er et godt valg hvis laget ditt allerede bruker det.
:::

To stier støttes: **MCP Connector** (innebygd i ChatGPT) og en **Custom GPT** for lag som ønsker en delt assistent.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadmin med **Edit Settings**-tillatelse i B1 Admin (nødvendig for å opprette en API-nøkkel)
- En **ChatGPT Plus, Pro, Team, eller Enterprise**-konto

</div>

## Hurtigoppsettsveiledning

Følg disse trinnene i **ChatGPT-skrivebordsappen** (Mac/Windows).

**Trinn 1 — Få API-nøkkelen din fra B1 Admin først**

Før du berører ChatGPT, oppretter du en API-nøkkel i B1 Admin:

1. Gå til **Settings → Developer → API Keys** i B1 Admin
2. Klikk **New API Key**, navngi det `ChatGPT`, velg omfang (start med `people:read`, `groups:read`, `attendance:read`, `donations:read`), og klikk **Save**
3. Kopier `cak_…`-nøkkelen -- den vises kun en gang

**Trinn 2 — Klikk på navnet ditt i nedre venstre hjørne av ChatGPT**

**Trinn 3 — Klikk Settings**

**Trinn 4 — Klikk Plugins i venstre sidestolpe**

**Trinn 5 — Klikk MCPs-fanen**

**Trinn 6 — Klikk Add → Add MCP server**

**Trinn 7 — Fyll ut skjemaet og klikk Save**

Klikk **Streamable HTTP**, og fyll deretter inn disse verdiene:

| Felt | Hva du skal angi |
|---|---|
| **Name** | `B1 Church` (eller et navn du liker) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | La dette være tomt |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_yourprefix.yoursecret` |

For Value-feltet, skriv ordet `Bearer`, ett mellomrom, og lim deretter inn nøkkelen -- alt i samme boks.

Klikk **Save**.

Det er det! Gå tilbake til en chat og still noe som "How many people are in our church?" og ChatGPT vil hente svaret direkte fra B1.

## Sikkerhet og grenser

- **Per-church isolation.** API-nøkkelen løser seg til en kirke bare. ChatGPT kan ikke se andre kirkenes data.
- **Permission-scoped.** Nøkkelen bærer bare omfangene du ga.
- **Revocable instantly.** Slett nøkkelen og tilgang ender umiddelbart.

## Kostnad

ChurchApps er gratis og åpen kildekode. OpenAI tar betalt for ChatGPT-bruk etter egne planer. Det er ingen per-anrop-kostnad fra ChurchApps.

