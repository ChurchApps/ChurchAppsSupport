---
title: "Vlastní doména"
---

# Vlastní doména

<div class="article-intro">

Svou vlastní doménu (například **`www.vasecirkev.cz`**) můžete nasměrovat na svůj web B1, aby návštěvníci našli web na skutečné internetové adrese vaší církve místo výchozí adresy vasecirkev.b1.church.

</div>

## Školicí video

<YouTube id="L5yaDusHts8" title="Připojení vlastní domény v B1" next="Nastavení živého přenosu v B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Krok 1 — Nejprve přidejte záznam DNS

Než přidáte doménu v B1, musíte ji u svého registrátora domén (GoDaddy, Namecheap, Cloudflare apod.) nasměrovat na servery B1.

Přidejte jeden z těchto záznamů — přednostně CNAME:

| Typ | Hostitel | Hodnota |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `vasecirkev.cz` | `3.23.251.61` |

Pro adresu `www` použijte záznam **CNAME**. Záznam **A** použijte v případě, že váš registrátor nepodporuje CNAME pro kořenovou doménu (bez www), nebo pokud chcete, aby fungovala i kořenová doména.

Změny DNS se mohou projevit za několik minut až několik hodin.

## Krok 2 — Přidejte doménu v B1

Jakmile DNS směřuje na B1:

1. V B1 Admin přejděte do **Nastavení**.
2. V levém seznamu klikněte na **Domény** a poté v sekci **Domény** klikněte na **Upravit**.
3. Do pole zadejte svou doménu a klikněte na **Uložit**.

Tlačítko **+** nemusíte stisknout předem — doména zadaná v poli se při uložení přidá. Tlačítko **+** (nebo klávesu **Enter**) použijte, pokud chcete do seznamu přidat více domén před uložením.

B1 zajišťuje SSL automaticky — certifikát nemusíte kupovat.

:::warning
Pokud doménu v B1 přidáte dříve, než jsou záznamy DNS na místě, nepůjde uložit. Nastavení DNS vždy proveďte jako první.
:::

## Ověření funkčnosti

Po uložení otevřete svou doménu v prohlížeči. Pokud se načte váš web B1, máte hotovo. Pokud se zobrazí chyba, DNS se možná ještě šíří — počkejte několik minut a zkuste to znovu.

Šíření DNS můžete zkontrolovat také na stránce [dnschecker.org](https://dnschecker.org) — vyhledejte svou doménu a ověřte, zda se zobrazuje váš záznam CNAME nebo A.
