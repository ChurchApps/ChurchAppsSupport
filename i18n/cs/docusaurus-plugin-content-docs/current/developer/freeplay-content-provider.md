---
title: "Poskytovatel obsahu pro FreePlay"
---

# Poskytovatel obsahu pro FreePlay

<div class="article-intro">

FreePlay je přehrávač médií od ChurchApps pro streamování lekcí a dalšího video obsahu na telefonech, tabletech a televizorech. Pokud máte knihovnu lekcí a chcete ji zpřístupnit ve FreePlay, tento průvodce obsahuje vše, co k tomu potřebujete.

</div>

## Branding

Než může integrace začít, potřebujeme:

- **Logo** – obrázek loga v poměru stran **16:9** (používá se na kartách poskytovatelů v uživatelském rozhraní FreePlay)
- **Název značky** – preferovaný název vaší organizace, který se má ve FreePlay zobrazovat

## API koncové body

FreePlay komunikuje s vaší službou prostřednictvím malé sady REST koncových bodů. Pro každého poskytovatele vytváříme vlastní adaptér, takže přesná struktura URL je flexibilní, ale níže uvedené informace potřebujeme.

### Ověřování

Vyberte model, který odpovídá vašemu obsahu:

| Model | Kdy použít | Co potřebujeme |
|-------|-------------|--------------|
| **Žádný** | Veřejný obsah, přihlášení není vyžadováno | Nic – katalogové koncové body voláme přímo |
| **OAuth (PKCE)** | Přihlašování na webu nebo mobilu | Autorizační URL, koncový bod pro výměnu tokenů, ID klienta, rozsahy oprávnění (scopes) |
| **Device Flow** | Preferováno pro aplikace na TV (uživatel zadá na telefonu krátký kód) | Koncový bod pro autorizaci zařízení, koncový bod pro dotazování na token, ID klienta |

:::tip
Pokud váš obsah vyžaduje ověření, koncový bod pro autentizaci vrací **uživatelský token**, který FreePlay předává koncovým bodům pro procházení a lekce, aby autorizoval přístup.
:::

### Procházení / katalog

Koncový bod (nebo sada koncových bodů), který vrací **stromovou strukturu složek** všech dostupných lekcí.

- Může jít o **jediné volání**, které vrátí celý strom, nebo o **více volání**, kde každé vrátí jednu úroveň, když uživatel prochází hlouběji.
- Každá položka ve stromu by měla obsahovat:

| Pole | Povinné | Popis |
|-------|-------|-------------|
| `id` | Ano | Jedinečný identifikátor složky |
| `name` | Ano | Zobrazovaný název složky |
| `thumbnail` | Doporučeno | URL miniatury v poměru **16:9** |

### Playlist lekce

Koncový bod, který vrací **playlist mediálních souborů** pro jednu lekci.

Každá položka v playlistu by měla obsahovat:

| Pole | Povinné | Popis |
|-------|-------|-------------|
| `title` | Ano | Zobrazovaný název mediální položky |
| `mediaType` | Ano | `video` nebo `image` |
| `url` | Ano | Přímý odkaz ke stažení souboru (viz [Formáty médií](#media-formats) níže) |
| `thumbnail` | Doporučeno | Náhledový obrázek položky |
| `duration` | Doporučeno | Délka v sekundách (u videí) |

## Formáty médií

FreePlay stahuje soubory přímo, proto každá mediální položka musí mít **přímý odkaz** (bez vložených přehrávačů nebo přesměrování stránek).

| Typ | Přijímané formáty |
|------|-----------------|
| Video | **MP4** (nutné pro přehrávání na zařízeních Apple i Android) |
| Obrázek | JPG, PNG nebo GIF |

## Poznámky

- **REST API vracející JSON** je typický způsob integrace, ale protože pro každého poskytovatele vytváříme vlastní adaptér, dokážeme pracovat prakticky s jakýmkoli formátem API.
- Pokud máte zájem stát se poskytovatelem obsahu pro FreePlay, ozvěte se na [Slacku](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) nebo otevřete issue na [GitHubu](https://github.com/ChurchApps/ChurchAppsSupport/issues).
