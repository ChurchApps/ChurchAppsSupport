---
title: "FreePlay-innehållsleverantör"
---

# FreePlay-innehållsleverantör

<div class="article-intro">

FreePlay är ChurchApps mediaspelare för att streama lektioner och annat videoinnehåll på mobiltelefoner, surfplattor och TV-apparater. Om du har ett bibliotek med lektionsinnehåll och vill göra det tillgängligt i FreePlay, täcker den här guiden allt du behöver tillhandahålla.

</div>

## Varumärke

Innan integrationen kan börja behöver vi:

- **Logotyp** -- En logotypbild i **16:9**-format (används för leverantörskort i FreePlays gränssnitt)
- **Varumärkesnamn** -- Det namn du föredrar att visa för din organisation i FreePlay

## API-slutpunkter

FreePlay kommunicerar med din tjänst via en liten uppsättning REST-slutpunkter. Vi skriver en anpassad adapter för varje leverantör, så den exakta URL-strukturen är flexibel -- men informationen nedan är vad vi behöver.

### Autentisering

Välj den modell som passar ditt innehåll:

| Modell | När den används | Vad vi behöver |
|-------|-------------|--------------|
| **Ingen** | Offentligt innehåll, ingen inloggning krävs | Inget -- vi anropar dina katalogslutpunkter direkt |
| **OAuth (PKCE)** | Inloggning på webben/mobilen | Webbadress för auktorisering, slutpunkt för tokenutbyte, klient-ID, scopes |
| **Enhetsflöde** | Föredras för TV-appar (användaren anger en kort kod på sin telefon) | Slutpunkt för enhetsauktorisering, slutpunkt för tokenpolling, klient-ID |

:::tip
Om ditt innehåll kräver autentisering returnerar autentiseringsslutpunkten en **användartoken** som FreePlay skickar till bläddrings- och lektionsslutpunkterna för att auktorisera åtkomsten.
:::

### Bläddring / katalog

En slutpunkt (eller uppsättning slutpunkter) som returnerar ett **mappträd** med alla tillgängliga lektioner.

- Detta kan vara ett **enda anrop** som returnerar hela trädet, eller **flera anrop** där varje anrop returnerar en nivå när användaren navigerar djupare.
- Varje objekt i trädet bör innehålla:

| Fält | Obligatoriskt | Beskrivning |
|-------|----------|-------------|
| `id` | Ja | En unik identifierare för mappen |
| `name` | Ja | Visningsnamn för mappen |
| `thumbnail` | Rekommenderas | En webbadress till en miniatyrbild i **16:9** |

### Lektionsspellista

En slutpunkt som returnerar **spellistan med mediefiler** för en enskild lektion.

Varje objekt i spellistan bör innehålla:

| Fält | Obligatoriskt | Beskrivning |
|-------|----------|-------------|
| `title` | Ja | Visningstitel för mediaobjektet |
| `mediaType` | Ja | `video` eller `image` |
| `url` | Ja | Direkt nedladdningslänk till filen (se [Mediaformat](#media-formats) nedan) |
| `thumbnail` | Rekommenderas | En miniatyrbild för objektet |
| `duration` | Rekommenderas | Längd i sekunder (för videor) |

## Mediaformat

FreePlay laddar ner filer direkt, så varje mediaobjekt måste ha en **direktlänk** (inga inbäddade spelare eller omdirigeringar på sidor).

| Typ | Accepterade format |
|------|-----------------|
| Video | **MP4** (krävs för uppspelning på både Apple- och Android-enheter) |
| Bild | JPG, PNG eller GIF |

## Noteringar

- Ett **REST-API som returnerar JSON** är det vanliga integrationsmönstret, men eftersom vi skriver en anpassad adapter för varje leverantör kan vi arbeta med i princip vilket API-format som helst.
- Om du är intresserad av att bli innehållsleverantör för FreePlay, kontakta oss på [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) eller öppna ett ärende på [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
