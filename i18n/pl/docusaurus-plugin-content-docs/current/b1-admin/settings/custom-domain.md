---
title: "Vlastní doména"
---

# Vlastní doména

<div class="article-intro">

Svou vlastní doménu (například **`www.yourchurch.org`**) můžete nasměrovat na svůj web B1, aby návštěvníci přicházeli na skutečnou webovou adresu vašeho sboru místo výchozí adresy yourchurch.b1.church.

</div>

## Školicí video

<YouTube id="L5yaDusHts8" title="Připojení vlastní domény v B1" next="Nastavení živého přenosu v B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Krok 1 — Nejprve přidejte záznam DNS

Předtím, než doménu přidáte v B1, ji u svého registrátora domén (GoDaddy, Namecheap, Cloudflare apod.) musíte nasměrovat na servery B1.

Přidejte jeden z těchto záznamů — přednostně CNAME:

| Typ | Hostitel | Hodnota |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Pro adresu `www` použijte záznam **CNAME**. Záznam **A** použijte v případě, že váš registrátor nepodporuje CNAME pro kořenovou doménu (bez www), nebo pokud chcete, aby fungovala i kořenová doména.

Změny DNS se mohou projevit během několika minut až několika hodin.

## Krok 2 — Přidání domény v B1

Jakmile DNS směřuje na B1:

1. V aplikaci B1 Admin přejděte do **Nastavení**.
2. V seznamu vlevo klikněte na **Domény** a poté v sekci **Domény** klikněte na **Upravit**.
3. Zadejte svou doménu do pole a klikněte na **Uložit**.

Tlačítko **+** nemusíte nejprve stisknout — doména zadaná v poli se při uložení přidá automaticky. Tlačítko **+** (nebo klávesu **Enter**) použijte, pokud chcete do seznamu přidat více domén před uložením.

B1 zajišťuje SSL automaticky — certifikát není nutné kupovat.

:::warning
Pokud doménu v B1 přidáte dříve, než jsou záznamy DNS na místě, nebude se uložit. Vždy nejprve nastavte DNS.
:::

## Kontrola funkčnosti

Po uložení otevřete svou doménu v prohlížeči. Pokud se načte váš web B1, je hotovo. Pokud se zobrazí chyba, DNS se možná ještě šíří — počkejte několik minut a zkuste to znovu.

Šíření DNS můžete také zkontrolovat na stránce [dnschecker.org](https://dnschecker.org) — zadejte svou doménu a ověřte, zda se zobrazuje váš záznam CNAME nebo A.
