---
title: "Claude"
description: "Prijunkite B1 Admin prie Claude, kad paprasta kalba klaustumėte apie lankomumą, aukas ir grupes, su prisijungimo ir ribotų leidimų API rakto parinktimis."
---

# Claude

<div class="article-intro">

Klauskite Claude apie savo bažnyčią paprasta kalba – jis atsakys remdamasis jūsų B1 duomenimis, įskaitant FreePlay pamokas ir klasių kambarius. Galite klausti, pavyzdžiui, *„kiek pirmą kartą atvykusių lankytojų atėjo sekmadienį?“* arba *„kas per šį mėnesį prisijungė prie mažosios grupės?“* – arba paprašyti ką nors padaryti, pavyzdžiui, *„pridėk naują puslapį mūsų svetainei, pavadintą Events.“* Nustatymas užtruks mažiau nei 3 minutes, o įdiegti jokių techninių įgūdžių ar programinės įrangos nereikia.

</div>

<div class="prereqs">
<h4>Ko jums reikės</h4>

- **Claude paskyra.** **Nemokamas planas tinka** – tai geras būdas išbandyti. Nemokamose paskyrose yra dienos žinučių limitas, o paieška B1 sistemoje greitai jį išnaudoja, todėl jei naudositės reguliariai, rekomenduojame **Claude Pro** (apie 20 JAV dolerių per mėnesį).
- **Jūsų B1 prisijungimo duomenys** – tie patys, kuriuos naudojate B1 Admin.

</div>

:::tip Rekomenduojama – galima išbandyti nemokamai
Claude yra lengviausias būdas prijungti B1 prie dirbtinio intelekto, ir jis veikia **nemokamame** Claude plane – puikus būdas jūsų bažnyčiai išbandyti prieš mokant už ką nors.
:::

Prisijungti galima dviem būdais. **1 variantas yra lengviausias** – jokio rakto ir jokio diegimo.

## 1 variantas — Prisijungimas per B1 (lengviausias)

Veikia Claude svetainėje, Claude darbalaukio programoje ir Claude telefono programoje – nustatykite vieną kartą, ir jis veiks visur.

### 1 žingsnis — Atidarykite Claude jungčių nustatymus

1. Eikite į [claude.ai](https://claude.ai) ir prisijunkite (arba sukurkite nemokamą paskyrą).
2. Spustelėkite savo vardą apatiniame kairiajame kampe, tada **Settings** → **Connectors**.

### 2 žingsnis — Pridėkite B1

1. Spustelėkite **Add**, tada **Add custom connector**.
2. **Name:** įveskite `B1`.
3. **URL:** įklijuokite `https://api.churchapps.org/mcp`
4. Kitas parinktis palikite kaip yra ir spustelėkite **Add**.

### 3 žingsnis — Prisijunkite prie B1

1. Spustelėkite **Connect**. Atsidarys B1 prisijungimo puslapis.
2. Prisijunkite su savo B1 paskyra. Jei priklausote daugiau nei vienai bažnyčiai, patikrinkite, ar viršuje rodoma reikiama bažnyčia.
3. B1 parodys, ką Claude prašo daryti, ir patvirtins, kad būsite nukreipti atgal į **claude.ai**. Spustelėkite **Allow**.

Grįšite į Claude, ir B1 bus rodomas kaip prijungtas.

### 4 žingsnis — Paklauskite ko nors

Pradėkite **naują pokalbį** ir išbandykite:

- *„Kiek žmonių yra mūsų bažnyčioje?“*
- *„Išvardyk mūsų aktyvias grupes.“*
- *„Apibendrink šio mėnesio aukas pagal fondą.“*
- *„Kas prisijungė prie bažnyčios per pastarąsias 30 dienų?“*

Pirmą kartą Claude paprašys leidimo naudoti B1 – spustelėkite **Allow**.

## 2 variantas — Darbalaukio plėtinys su B1 raktu

Naudokite tai, jei norite suteikti Claude raktą su ribotomis teisėmis (pavyzdžiui, tik skaitymui). Tai veikia Claude darbalaukio programoje Mac ar Windows sistemai, o raktui sukurti reikia teisės tvarkyti bažnyčios nustatymus B1 sistemoje.

### 1 žingsnis — Gaukite Claude programą

Atsisiųskite Claude programą iš [claude.com/download](https://claude.com/download), įdiekite, atidarykite ir prisijunkite.

### 2 žingsnis — Sukurkite B1 raktą

Raktas leidžia Claude pasiekti *jūsų* bažnyčios B1 – įsivaizduokite jį kaip slaptažodį, skirtą tik Claude.

1. Prisijunkite prie [B1 Admin](https://admin.b1.church) ir eikite į [Settings → Developer](https://admin.b1.church/settings/developer).
2. Skirtuke **API Keys** spustelėkite **New API Key**.
3. **Name:** įveskite `Claude`.
4. **Scopes:** pažymėkite, ką Claude gali daryti. Kiekviena sritis turi langelį **read** (tik peržiūra) ir langelį **write** (keitimai). Nesate tikri? Pradžiai pažymėkite tik **read** langelius – vėliau galėsite sukurti naują raktą su daugiau teisių.
5. Spustelėkite **Save**, tada **Copy** raktą. Jis rodomas tik vieną kartą, todėl iškart pereikite prie 3 žingsnio.

### 3 žingsnis — Pridėkite B1 prie Claude

1. [Atsisiųskite B1 plėtinį](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Du kartus spustelėkite** atsisiųstą failą (`b1-churchapps.mcpb`). Atsidarys Claude ir parodys **B1 (ChurchApps)**.
3. Spustelėkite **Install**.
4. Kai paprašys **B1 API rakto**, įklijuokite raktą iš 2 žingsnio ir išsaugokite.
5. **Visiškai uždarykite Claude** (Mac: **Cmd+Q** · Windows: dešiniuoju pelės klavišu spustelėkite Claude piktogramą užduočių juostoje → **Quit**) ir vėl atidarykite.

Jei du kartus spustelėjus failą Claude neatsidaro, Claude programoje eikite į **Settings → Extensions → Advanced settings → Install Extension…** ir pasirinkite atsisiųstą failą. Tada pradėkite naują pokalbį ir paklauskite ko nors.

:::tip Plėtinys jau įdiegtas?
Nieko daryti nereikia – FreePlay veikia per tą patį ryšį. Vienintelė išimtis – 1.1.0 versija, kuri prašė B1 el. pašto ir slaptažodžio: atsisiųskite ir įdiekite plėtinį iš naujo, kad atnaujintumėte. Jūsų raktas išlieka.
:::

## Ar tai saugu?

- Claude mato tik **jūsų bažnyčios** duomenis.
- **Prisijungus (1 variantas):** Claude niekada negali padaryti daugiau, nei gali jūsų paties B1 prisijungimas. B1 prisijungimo puslapis prieš jums spustelint **Allow** parodo viską, ką Claude gali daryti.
- **Su raktu (2 variantas):** Claude gali daryti tik tai, ką leidžia raktas B1 sistemoje – raktas tik su pažymėtais **read** langeliais gali tik peržiūrėti ir niekada nieko nepakeis. FreePlay veikia taip pat, tuo pačiu raktu.
- **Kaip tai išjungti:** B1 Admin eikite į **Settings → Developer** ir atšaukite programą skiltyje **Connected Apps** (1 variantas) arba ištrinkite raktą skiltyje **API Keys** (2 variantas). Prieiga nutrūksta iškart. Taip pat galite spustelėti **Disconnect** B1 jungtyje Claude.

## Kiek tai kainuoja?

B1 ryšys nemokamas – jis yra ChurchApps dalis. Claude turi nemokamą planą; Claude Pro (apie 20 JAV dolerių per mėnesį) suteikia daug daugiau galimybių. Žr. [claude.com/pricing](https://claude.com/pricing).

## Techninė informacija

Likusi šio puslapio dalis skirta techniniams naudotojams ir DI asistentams: teisės, kiti ryšio būdai ir veikimo principas.

### Teisės (Scopes)

Claude bendrauja su B1 per **Model Context Protocol (MCP) serverį**, įdiegtą B1 API (`https://api.churchapps.org/mcp`). Kiekvienas kvietimas vykdomas pagal tas pačias autentifikavimo, leidimų ir bažnyčios apribojimo taisykles, kaip ir užklausa iš B1 Admin. Claude apribotas API rakto **leidimais ir teisėmis** ir negali pasiekti webhook'ų, OAuth administravimo galinių taškų ar kitų tik operatoriui skirtų kelių.

Dažniausiai naudojami pradiniai teisių rinkiniai:

- **Tik skaitymo asistentas:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Skaitymas + pastabų / užduočių pridėjimas:** pridėkite `people:write`
- **Visas operacinis asistentas:** pridėkite norimas atitinkamas `:write` teises

Raktas su `donations:read` leidžia Claude apibendrinti aukas, bet negali įrašyti aukos. Raktas su `people:write` gali pridėti asmenį, bet negali matyti aukų. Apie tai, ką leidžia kiekviena teisė, žr. [API Keys](/docs/developer/api/api-keys).

### Kiti ryšio būdai

#### Claude Code (CLI)

Terminale:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Viskas. Bet kurioje Claude Code sesijoje įveskite `/mcp`, kad patikrintumėte, ar `b1` serveris prijungtas, tada užduokite Claude bet kokį klausimą apie savo bažnyčią.

#### Claude Desktop — rankinė konfigūracija (pažengusiems)

Jei nenorite naudoti plėtinio, redaguokite Claude Desktop konfigūracijos failą:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Pridėkite `b1` serverio įrašą, kuris jungiasi prie B1 per `mcp-remote` (reikia [Node.js](https://nodejs.org)):

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

Paleiskite Claude Desktop iš naujo. Pokalbio įvesties lauko jungčių meniu rodys `b1` su jo įrankiais.

#### Claude.ai (žiniatinklis) — pasirinktinė jungtis

Žr. aukščiau **1 variantą**. Jungtis naudoja OAuth 2.1: Claude randa B1 autorizacijos serverį adresu `https://api.churchapps.org/.well-known/oauth-protected-resource`, užsiregistruoja naudodamas Dynamic Client Registration ir prisijungia su PKCE. Team ir Enterprise planuose savininkas gali pirmiausia turėti pridėti jungtį organizacijai. Claude neprašo konkrečių teisių, todėl patvirtinimo puslapyje rodoma viskas, ką gali pasiekti prisijungusi B1 paskyra. Atšaukite ją B1 Admin skiltyje **Settings → Developer → Connected Apps**.

### Kaip tai veikia

B1 API pateikia vieną MCP galinį tašką adresu `/mcp`. Claude prisijungia prie jo, autentifikuojasi su savo `cak_…` raktu ir gauna prieigą prie keturių įrankių:

| Įrankis | Ką daro |
|---|---|
| `list_endpoints` | Išvardija REST galinius taškus, kuriuos Claude gali kviesti, filtruojamus pagal kelią. Naudojama paieškai. |
| `describe_endpoint` | Pateikia trumpą aprašymą ir pavyzdinę užklausą bei atsakymą konkrečiam galiniam taškui. |
| `api_call` | Iš tikrųjų iškviečia REST galinį tašką kaip autentifikuotas naudotojas. |
| `describe_page_builder` | Vadovas, kaip kurti ir redaguoti bažnyčios svetainės puslapius; Claude jį perskaito prieš dirbdamas su svetainės turiniu. |

Tai ta pati `/membership/people`, `/giving/donations`, `/attendance/visits` ir kt. sąsaja, kurią naudoja B1Admin – taikomos visos autorizacijos taisyklės. FreePlay (lessons.church) galiniai taškai išvardyti po `/lessons/*`; Claude kvietimai jiems perduodami FreePlay kaip tam pačiam naudotojui su tomis pačiomis teisėmis.

### Saugumas ir apribojimai

- **Atskyrimas pagal bažnyčią.** API raktas susietas su viena bažnyčia. Claude neturi galimybės matyti kitų bažnyčių duomenų.
- **Teisių ribojimas.** Jei B1Admin pašalinsite leidimą asmeniui, sukūrusiam raktą, Claude jį praras kitame kvietime – iškart.
- **Galima atšaukti.** Ištrinkite raktą **Settings → Developer → API Keys**, ir Claude prieiga iškart baigsis.
- **Juodasis sąrašas.** Tiekėjų webhook'ai, OAuth kliento administravimo galiniai taškai ir tik operatoriui skirtas `apiEmails` maršrutas nėra pasiekiami per MCP.
- **Atsakymo dydžio riba.** Vieno įrankio atsakymas ribojamas iki 64 KB, kad ilgi sąrašai neperpildytų Claude konteksto – tokiu atveju Claude susiaurins užklausą filtrais.
- **Audito žurnalas.** Pakeitimai įrašomi į tą patį audito žurnalą, kaip ir B1Admin veiksmai; juos galite peržiūrėti skiltyje **Settings → Audit Log**.

### Trikčių šalinimas

**Claude prašo B1 el. pašto ir slaptažodžio FreePlay naudojimui:** turite 1.1.0 versiją darbalaukio plėtinio. Atsisiųskite ir įdiekite iš naujo, kad atnaujintumėte – naujesnės versijos naudoja tik jūsų raktą.

**Claude praneša „Unauthorized“ arba 401:** prieigos žetonas (bearer token) trūksta, yra neteisingas arba raktas buvo panaikintas. Jei naudojote plėtinį, Claude atidarykite **Settings → Extensions → B1 (ChurchApps)** ir vėl įklijuokite raktą. Priešingu atveju patikrinkite `Authorization: Bearer cak_…` antraštę (atkreipkite dėmesį į tarpą po `Bearer` ir į tai, kad žodis rašomas be pakeitimų).

**Įrankio kvietimas grąžina 403:** API raktas neturi tam galiniam taškui reikalingos teisės. Pridėkite teisę **Settings → Developer → API Keys** (reikės sukurti naują raktą – teisių nebgalima pakeisti vietoje) ir įklijuokite naują raktą plėtinio nustatymuose arba Claude konfigūracijoje.

**Claude negali rasti galinio taško:** paprašykite jo iškviesti `list_endpoints` su filtru, pavyzdžiui, *„naudok list_endpoints su filtru 'donations', kad rastum tinkamą kelią“*. Maršrutų sąrašas generuojamas iš veikiančio API, todėl viskas, ką galite pasiekti su `curl`, ten yra.

**Vietinis kūrimas:** pakeiskite `https://api.churchapps.org/mcp` į `http://localhost:8084/mcp` – ta pati autentifikacija, tie patys įrankiai.

## Susiję

- [API Keys](/docs/developer/api/api-keys) — visa teisių nuoroda
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protokolo detalės ir įrankių schemos
- [ChatGPT](./chatgpt.md) — ta pati idėja, skirta OpenAI modeliams
