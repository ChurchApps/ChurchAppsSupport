---
title: "Ponudnik vsebine FreePlay"
---

# Ponudnik vsebine FreePlay

<div class="article-intro">

FreePlay je predvajalnik medijev podjetja ChurchApps za pretakanje lekcij in drugih video vsebin na telefonih, tabličnih računalnikih in televizorjih. Če imate knjižnico lekcijskih vsebin in jo želite narediti dostopno v aplikaciji FreePlay, vam ta vodnik predstavi vse, kar morate zagotoviti.

</div>

## Blagovna znamka

Preden se lahko integracija začne, potrebujemo:

- **Logotip** -- Slikovno datoteko logotipa v razmerju stranic **16:9** (uporablja se za kartice ponudnikov v vmesniku FreePlay)
- **Ime blagovne znamke** -- Ime, ki ga želite prikazati za vašo organizacijo v aplikaciji FreePlay

## Končne točke API

FreePlay komunicira z vašo storitvijo prek majhnega nabora končnih točk REST. Za vsakega ponudnika pripravimo prilagojen vmesnik, zato je natančna struktura URL-jev prilagodljiva -- spodnji podatki pa so tisto, kar potrebujemo.

### Avtentikacija

Izberite model, ki ustreza vaši vsebini:

| Model | Kdaj ga uporabiti | Kaj potrebujemo |
|-------|-------------------|-----------------|
| **Brez** | Javna vsebina, prijava ni potrebna | Nič -- katalogske končne točke kličemo neposredno |
| **OAuth (PKCE)** | Prijava v spletu/mobilnih napravah | URL za avtorizacijo, končna točka za zamenjavo žetonov, ID odjemalca, obseg |
| **Tok naprave (Device Flow)** | Priporočeno za aplikacije na televizorjih (uporabnik na telefonu vnese kratko kodo) | Končna točka za avtorizacijo naprave, končna točka za anketiranje žetonov, ID odjemalca |

:::tip
Če vaša vsebina zahteva avtentikacijo, končna točka za avtentikacijo vrne **uporabniški žeton**, ki ga FreePlay posreduje končnim točkam za brskanje in lekcije, da se odobri dostop.
:::

### Brskanje / katalog

Končna točka (ali niz končnih točk), ki vrne **drevo map** vseh razpoložljivih lekcij.

- To je lahko **en sam klic**, ki vrne celotno drevo, ali **več klicev**, pri čemer vsak vrne eno raven, ko uporabnik brska globlje.
- Vsak element v drevesu mora vključevati:

| Polje | Obvezno | Opis |
|-------|---------|------|
| `id` | Da | Enolični identifikator mape |
| `name` | Da | Ime mape, prikazano uporabniku |
| `thumbnail` | Priporočeno | URL sličice v razmerju **16:9** |

### Predvajalni seznam lekcije

Končna točka, ki vrne **predvajalni seznam medijskih datotek** za eno lekcijo.

Vsak element v predvajalnem seznamu mora vključevati:

| Polje | Obvezno | Opis |
|-------|---------|------|
| `title` | Da | Prikazani naslov medijskega elementa |
| `mediaType` | Da | `video` ali `image` |
| `url` | Da | Neposredna povezava za prenos datoteke (glejte [Oblike medijev](#media-formats) spodaj) |
| `thumbnail` | Priporočeno | Sličica za element |
| `duration` | Priporočeno | Trajanje v sekundah (za videoposnetke) |

## Oblike medijev

FreePlay datoteke prenaša neposredno, zato mora imeti vsak medijski element **neposredno povezavo** (brez vgrajenih predvajalnikov ali preusmeritev strani).

| Vrsta | Sprejete oblike |
|-------|-----------------|
| Video | **MP4** (obvezno za predvajanje na različnih platformah na napravah Apple in Android) |
| Slika | JPG, PNG ali GIF |

## Opombe

- **REST API, ki vrača JSON**, je običajen vzorec integracije, vendar lahko zaradi tega, ker za vsakega ponudnika pripravimo prilagojen vmesnik, delamo z skoraj vsako obliko API-ja.
- Če vas zanima, da postanete ponudnik vsebine za FreePlay, nam pišite na [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) ali odprite težavo na [GitHubu](https://github.com/ChurchApps/ChurchAppsSupport/issues).
