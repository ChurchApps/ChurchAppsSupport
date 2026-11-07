---
title: "Claude"
---

# Claude

<div class="article-intro">

Întreabă Claude despre biserica ta, în limba română obișnuită, și îți răspunde din datele tale B1, inclusiv din lecțiile și clasele tale FreePlay. Poți pune întrebări precum *„câți vizitatori pentru prima dată au venit duminica aceasta?”* sau *„cine s-a alăturat unui grup mic luna aceasta?”*, sau îi poți cere să facă lucruri, de exemplu *„adaugă o pagină nouă pe site-ul nostru, numită Evenimente.”* Configurarea durează mai puțin de 3 minute, iar pentru instalare nu ai nevoie de cunoștințe tehnice sau de software suplimentar.

</div>

<div class="prereqs">
<h4>Ce ai nevoie</h4>

- **Un cont Claude.** **Planul gratuit funcționează** și este o modalitate bună de a-l încerca. Conturile gratuite au însă o limită zilnică de mesaje, iar căutările în B1 consumă rapid mesaje, așa că, dacă îl folosești regulat, îți recomandăm **Claude Pro** (aproximativ 20 USD/lună).
- **Autentificarea ta B1**, aceeași pe care o folosești pentru B1 Admin.

</div>

:::tip Recomandat — gratuit pentru încercare
Claude este cea mai simplă modalitate de a conecta B1 la inteligența artificială, iar funcționează pe **planul gratuit** al Claude. Este o modalitate ideală ca biserica ta să încerce înainte de a plăti pentru ceva.
:::

Există două moduri de conectare. **Opțiunea 1 este cea mai simplă**: nu necesită nicio cheie și nimic de instalat.

## Opțiunea 1 — Autentificare cu B1 (cea mai simplă)

Funcționează pe site-ul Claude, în aplicația desktop Claude și în aplicația Claude pentru telefon. Configurezi o singură dată și este disponibilă pe toate.

### Pasul 1 — Deschide setările conectorilor Claude

1. Mergi la [claude.ai](https://claude.ai) și te autentifici (sau creezi un cont gratuit).
2. Dă clic pe numele tău din colțul din stânga jos, apoi pe **Settings** → **Connectors**.

### Pasul 2 — Adaugă B1

1. Dă clic pe **Add**, apoi pe **Add custom connector**.
2. **Name:** scrie `B1`.
3. **URL:** lipește `https://api.churchapps.org/mcp`
4. Lasă celelalte opțiuni neschimbate și dă clic pe **Add**.

### Pasul 3 — Autentifică-te în B1

1. Dă clic pe **Connect**. Se deschide o pagină de autentificare B1.
2. Autentifică-te cu contul tău B1. Dacă faci parte din mai multe biserici, verifică dacă în partea de sus este afișată biserica corectă.
3. B1 îți arată ce cere Claude să facă și îți confirmă că vei fi redirecționat înapoi la **claude.ai**. Dă clic pe **Allow**.

Ești din nou în Claude, iar B1 apare ca fiind conectat.

### Pasul 4 — Pune o întrebare

Deschide un **chat nou** și încearcă:

- *„Câte persoane sunt în biserica noastră?”*
- *„Enumeră grupurile active.”*
- *„Rezumă donațiile din luna aceasta pe fond.”*
- *„Cine s-a alăturat bisericii în ultimele 30 de zile?”*

Prima dată, Claude îți cere permisiunea să folosească B1. Dă clic pe **Allow**.

## Opțiunea 2 — Extensie desktop cu o cheie B1

Folosește această opțiune dacă preferi să îi dai lui Claude o cheie cu permisiuni limitate (de exemplu, doar citire). Funcționează în aplicația desktop Claude pentru Mac sau Windows, iar pentru a crea o cheie ai nevoie de permisiunea de a gestiona setările bisericii în B1.

### Pasul 1 — Obține aplicația Claude

Descarcă aplicația Claude de la [claude.com/download](https://claude.com/download), instaleaz-o, deschide-o și autentifică-te.

### Pasul 2 — Creează cheia B1

Cheia îi permite lui Claude să acceseze B1 *al bisericii tale*. Gândește-te la ea ca la o parolă dedicată exclusiv pentru Claude.

1. Autentifică-te în [B1 Admin](https://admin.b1.church) și mergi la [Settings → Developer](https://admin.b1.church/settings/developer).
2. Pe fila **API Keys**, dă clic pe **New API Key**.
3. **Name:** scrie `Claude`.
4. **Scopes:** bifează ce are voie Claude să facă. Fiecare zonă are o casetă **read** (doar vizualizare) și o casetă **write** (modificări). Nu ești sigur? Bifează doar casetele **read** pentru început. Ulterior poți crea o cheie nouă cu mai multe permisiuni.
5. Dă clic pe **Save**, apoi pe **Copy** pentru a copia cheia. Ea este afișată o singură dată, așa că treci direct la Pasul 3.

### Pasul 3 — Adaugă B1 în Claude

1. [Descarcă extensia B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Fă dublu clic** pe fișierul descărcat (`b1-churchapps.mcpb`). Claude se deschide și afișează **B1 (ChurchApps)**.
3. Dă clic pe **Install**.
4. Când îți cere **B1 API key**, lipește cheia de la Pasul 2 și salveaz-o.
5. **Închide complet Claude** (Mac: **Cmd+Q** · Windows: fă clic dreapta pe pictograma Claude din bara de activități → **Quit**) și deschide-l din nou.

Dacă dublu clicul nu deschide Claude, mergi în Claude la **Settings → Extensions → Advanced settings → Install Extension…** și alege fișierul descărcat. Apoi deschide un chat nou și pune o întrebare.

:::tip Ai deja extensia instalată?
Nu trebuie să faci nimic. FreePlay funcționează prin aceeași conexiune. Singura excepție este versiunea 1.1.0, care cerea o adresă de e-mail și o parolă B1: descarcă și instalează din nou extensia pentru a face actualizarea. Cheia ta rămâne aceeași.
:::

## Este sigur?

- Claude poate vedea doar datele **bisericii tale**.
- **Cu autentificare (Opțiunea 1):** Claude nu poate face niciodată mai mult decât poate face contul tău B1. Pagina de autentificare B1 enumeră tot ce poate face Claude înainte să dai clic pe **Allow**.
- **Cu cheie (Opțiunea 2):** Claude poate face doar ce permite cheia în B1. O cheie cu bifate doar casetele **read** poate doar să vizualizeze, dar nu poate modifica nimic. FreePlay funcționează în același mod, cu aceeași cheie.
- **Pentru a dezactiva accesul:** în B1 Admin mergi la **Settings → Developer** și revoci aplicația din **Connected Apps** (Opțiunea 1) sau ștergi cheia din **API Keys** (Opțiunea 2). Accesul se oprește imediat. De asemenea, poți da clic pe **Disconnect** pe conectorul B1 din Claude.

## Cât costă?

Conexiunea B1 este gratuită: face parte din ChurchApps. Claude are un plan gratuit; Claude Pro (aproximativ 20 USD/lună) îți oferă mult mai multă utilizare. Vezi [claude.com/pricing](https://claude.com/pricing).

## Detalii tehnice

Restul paginii este destinat utilizatorilor tehnici și asistenților AI: permisiuni, alte moduri de conectare și modul de funcționare.

### Permisiuni (scopes)

Claude comunică cu B1 prin **serverul Model Context Protocol (MCP)** integrat în API-ul B1 (`https://api.churchapps.org/mcp`). Fiecare apel trece prin aceleași reguli de autentificare, permisiuni și limitare la biserică precum o cerere din B1 Admin. Claude este limitat la **permisiunile și scopes** cheii API și nu poate accesa webhook-uri, endpoint-uri OAuth de administrare sau alte căi rezervate operatorului.

Seturi comune de permisiuni de pornire:

- **Asistent doar pentru citire:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Citire + adăugare de notițe / sarcini:** adaugă `people:write`
- **Asistent operațional complet:** adaugă permisiunile `:write` corespunzătoare pe care le dorești

O cheie cu `donations:read` îi permite lui Claude să rezume donațiile, dar nu poate înregistra o donație. O cheie cu `people:write` poate adăuga o persoană, dar nu poate vedea donațiile. Pentru detalii despre ce permite fiecare permisiune, vezi [API Keys](/docs/developer/api/api-keys).

### Alte moduri de conectare

#### Claude Code (CLI)

Într-un terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Atât. Într-o sesiune Claude Code, scrie `/mcp` pentru a confirma că serverul `b1` este conectat, apoi pune orice întrebare despre biserica ta.

#### Claude Desktop — configurare manuală (avansat)

Dacă preferi să nu folosești extensia, editează fișierul de configurare al Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Adaugă o intrare de server `b1` care se conectează la B1 prin `mcp-remote` (necesită [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Repornește Claude Desktop. Meniul de conectori din câmpul de chat va afișa `b1` cu instrumentele sale.

#### Claude.ai (web) — conector personalizat

Vezi **Opțiunea 1** de mai sus. Conectorul folosește OAuth 2.1: Claude descoperă serverul de autorizare B1 de la `https://api.churchapps.org/.well-known/oauth-protected-resource`, se înregistrează singur prin Dynamic Client Registration și se autentifică prin PKCE. Pe planurile Team și Enterprise, un proprietar poate fi nevoit să adauge mai întâi conectorul pentru organizație. Claude nu solicită permisiuni specifice, astfel că pagina de consimțământ oferă tot ce poate accesa contul B1 autentificat. Îl poți revoca din **Settings → Developer → Connected Apps** în B1 Admin.

### Cum funcționează

API-ul B1 expune un singur endpoint MCP la `/mcp`. Claude se conectează la el, se autentifică cu cheia ta `cak_…` și primește acces la patru instrumente:

| Instrument | Ce face |
|---|---|
| `list_endpoints` | Enumeră endpoint-urile REST pe care le poate apela Claude, care pot fi filtrate după cale. Folosit pentru descoperire. |
| `describe_endpoint` | Returnează un rezumat scurt și un exemplu de cerere și răspuns pentru un endpoint specific. |
| `api_call` | Invocă efectiv un endpoint REST în numele utilizatorului autentificat. |
| `describe_page_builder` | Un ghid pentru crearea și editarea paginilor site-ului bisericii tale, pe care Claude îl citește înainte de a lucra la conținutul site-ului. |

Acesta este același set de endpoint-uri `/membership/people`, `/giving/donations`, `/attendance/visits` etc. pe care îl folosește B1Admin. Se aplică identic toate regulile de autorizare. Endpoint-urile FreePlay (lessons.church) sunt listate sub `/lessons/*`; apelurile lui Claude către acestea sunt transmise către FreePlay în numele aceluiași utilizator, cu aceleași permisiuni.

### Siguranță și limite

- **Izolare pe biserică.** Cheia API corespunde unei singure biserici. Claude nu poate vedea datele altor biserici.
- **Limitat de permisiuni.** Dacă elimini o permisiune de la persoana care a creat cheia în B1Admin, Claude o pierde la următorul apel, imediat.
- **Revocabil.** Șterge cheia din **Settings → Developer → API Keys** și accesul lui Claude încetează imediat.
- **Listă de blocare.** Webhook-urile furnizorilor, endpoint-urile de administrare a clienților OAuth și ruta `apiEmails`, rezervată operatorului, nu pot fi apelate prin MCP.
- **Limită de dimensiune a răspunsului.** Un singur răspuns al unui instrument este limitat la 64 KB, pentru ca listele lungi să nu depășească contextul lui Claude. Dacă se întâmplă asta, Claude va restrânge interogarea cu filtre.
- **Jurnal de audit.** Modificările trec prin același jurnal de audit ca acțiunile din B1Admin. Le poți vedea în **Settings → Audit Log**.

### Depanare

**Claude cere o adresă de e-mail și o parolă B1 pentru a folosi FreePlay:** ai versiunea 1.1.0 a extensiei desktop. Descarcă-o și instaleaz-o din nou pentru actualizare. Versiunile mai noi folosesc doar cheia ta.

**Claude raportează „Unauthorized” sau eroarea 401:** token-ul de autentificare lipsește, este malformat sau cheia a fost revocată. Dacă ai folosit extensia, deschide în Claude **Settings → Extensions → B1 (ChurchApps)** și lipește din nou cheia. În caz contrar, verifică din nou antetul `Authorization: Bearer cak_…` (atenție la spațiu și la cuvântul literal `Bearer`).

**Un apel de instrument returnează 403:** cheia API nu are permisiunea necesară pentru acel endpoint. Adaugă permisiunea în **Settings → Developer → API Keys** (va trebui să creezi o cheie nouă, deoarece permisiunile nu pot fi modificate pe loc) și lipește noua cheie în setările extensiei sau în configurarea Claude.

**Claude nu găsește un endpoint:** cere-i să apeleze `list_endpoints` cu un filtru, de exemplu *„folosește list_endpoints cu filtrul 'donations' pentru a găsi calea corectă”*. Inventarul rutelor este generat din API-ul live, așa că orice poți accesa cu `curl` este disponibil aici.

**Dezvoltare locală:** înlocuiește `https://api.churchapps.org/mcp` cu `http://localhost:8084/mcp`. Autentificarea și instrumentele sunt aceleași.

## Vezi și

- [API Keys](/docs/developer/api/api-keys): referința completă pentru permisiuni
- [MCP Server (referință pentru dezvoltatori)](/docs/developer/api/mcp): detalii despre protocol și schemele instrumentelor
- [ChatGPT](./chatgpt): aceeași idee, pentru modelele OpenAI
