---
title: "Průvodce: Spusťte webové stránky svého sboru"
---

# Spusťte webové stránky svého sboru

<div class="article-intro">

B1.church obsahuje kompletní nástroj pro tvorbu webu bez dalších poplatků. Tento průvodce vás provede vytvořením webu vašeho sboru od začátku: nastavením domovské stránky, úpravou vzhledu, přidáním klíčových stránek a volitelně napojením online darování a formulářů pro registraci na akce.

</div>

## Video se školením

<YouTube id="aA4UahZpmXg" title="Spuštění webu sboru v B1" next="Editing Pages and Navigation in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Než začnete</h4>

- Připravte si logo sboru (nejlépe PNG s průhledným pozadím)
- Vyberte 2–3 barvy značky pro svůj web
- Pokud používáte vlastní doménu (např. vasesbor.cz), ujistěte se, že máte přístup k poskytovateli DNS (GoDaddy, Cloudflare apod.)
- Pokud chcete na webu online darování, nejprve dokončete [nastavení online darování](../donations/online-giving-setup.md) (Stripe)

</div>

## Krok 1: Počáteční nastavení webu

Začněte vytvořením domovské stránky a základní struktury webu.

Postupujte podle průvodce [počátečním nastavením webu](../website/initial-setup.md):

1. V B1 Admin přejděte na **Web**
2. Vytvořte domovskou stránku s úvodní sekcí, uvítací zprávou a důležitými informacemi
3. Doplňte název sboru a krátké heslo

## Krok 2: Nastavení vzhledu

Nastavte vizuální podobu webu: barvy, písma, logo a patičku.

Postupujte podle průvodce [Vzhled](../website/appearance.md):

1. Nahrajte logo sboru
2. Nastavte hlavní a doplňkovou barvu
3. Nakonfigurujte navigační panel a patičku
4. Zkontrolujte náhled svých změn

:::tip
Udržujte barevnou paletu jednoduchou. Obvykle stačí jedna hlavní barva a jedna doplňková. Zbytek zvládne nástroj pro tvorbu webu.
:::

## Krok 3: Přidání obsahových stránek

Vytvořte stránky, které návštěvníci potřebují nejvíce.

Postupujte podle průvodce [Správa stránek](../website/managing-pages.md) a vytvořte stránky jako:

- **O nás** — Příběh vašeho sboru, vyznání a vedení
- **Kázání** — Odkaz na vaši [knihovnu kázání](../sermons/managing-sermons.md)
- **Akce** — Nadcházející akce a registrace
- **Darovat** — Stránka online darování (vyžaduje [nastavení Stripe](../donations/online-giving-setup.md))
- **Kontakt** — Místo konání, časy bohoslužeb a kontaktní údaje

## Krok 4: Připojení vlastní domény

Pokud chcete místo výchozí adresy B1 používat vlastní doménu (například vasesbor.cz):

1. V B1 Admin přejděte do **Nastavení** a otevřete sekci **Domény**
2. Zadejte svou vlastní doménu
3. U poskytovatele domény upravte záznamy DNS tak, aby ukazovaly na B1

:::info
Změny DNS se mohou šířit až 48 hodin. Váš web proto nemusí být okamžitě dostupný na vlastní doméně. Výchozí adresa B1 bude v této době i nadále fungovat.
:::

## Krok 5: Přidání darování a formulářů

Obohaťte svůj web o interaktivní prvky:

- **Online darování** — Přidejte sekci darování, aby členové mohli přispívat přímo z vašeho webu. Nejprve nakonfigurujte Stripe podle návodu [Nastavení online darování](../donations/online-giving-setup.md).
- **Registrační formuláře** — Vložte [samostatné formuláře](../forms/creating-forms.md) pro přihlášení na akce, návštěvnické karty nebo přihlášky dobrovolníků. Jak přidat formulář na libovolnou stránku, najdete v [Správě stránek](../website/managing-pages.md).

## Hotovo!

Váš web sboru je spuštěný. Sdílejte jeho adresu se sborem i na sociálních sítích. Obsah, nové stránky a vzhled můžete kdykoli upravit na nástěnce B1 Admin.

## Související články

- [Počáteční nastavení webu](../website/initial-setup.md) — podrobný průvodce nastavením
- [Správa stránek](../website/managing-pages.md) — přidávání a úprava stránek
- [Vzhled](../website/appearance.md) — barvy, logo a rozložení
- [Správa souborů](../website/files.md) — nahrávání obrázků a dokumentů
- [Nastavení online darování](../donations/online-giving-setup.md) — konfigurace Stripe
- [Vytváření formulářů](../forms/creating-forms.md) — tvorba registračních a dotazníkových formulářů
