---
title: "Vlastná doména"
description: "Nasmerujte vlastnú doménu, napríklad www.vasacirkev.sk, na vašu stránku B1 v B1 Admin nastavením DNS záznamov a pridaním domény v Nastaveniach."
---

# Vlastná doména

<div class="article-intro">

Svoju vlastnú doménu (napríklad **`www.vasacirkev.org`**) môžete nasmerovať na váš B1 web, aby sa návštevníci dostali na skutočnú webovú adresu vašej cirkvi namiesto predvolenej adresy vasacirkev.b1.church.

</div>

## Video s návodom

<YouTube id="L5yaDusHts8" title="Pripojenie vlastnej domény v B1" next="Nastavenie živého streamovania v B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Krok 1 — Najprv pridajte záznam DNS

Predtým, než pridáte doménu v B1, musíte u svojho registrátora domén (GoDaddy, Namecheap, Cloudflare a podobne) nasmerovať ju na servery B1.

Pridajte jeden z týchto záznamov — odporúčaný je CNAME:

| Typ | Hostiteľ | Hodnota |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `vasacirkev.org` | `3.23.251.61` |

Pre adresu `www` použite záznam **CNAME**. Záznam **A** použite vtedy, ak váš registrátor nepodporuje CNAME pre koreňovú doménu (bez www), alebo ak chcete, aby fungovala aj koreňová doména.

Zmeny DNS sa môžu prejaviť od niekoľkých minút až po niekoľko hodín.

## Krok 2 — Pridajte doménu v B1

Keď DNS smeruje na B1:

1. V B1 Admin prejdite do **Nastavenia**.
2. V ľavom zozname kliknite na **Domény** a potom v sekcii **Domény** kliknite na **Upraviť**.
3. Do poľa zadajte svoju doménu a kliknite na **Uložiť**.

Tlačidlo **+** nemusíte stlačiť ako prvé — doména zostane v poli a pri uložení sa pridá. Tlačidlo **+** (alebo klávesu **Enter**) použite vtedy, keď chcete pred uložením pridať do zoznamu viac domén.

B1 zabezpečuje SSL automaticky — certifikát nemusíte kupovať.

:::warning
Ak pridáte doménu v B1 skôr, než budú záznamy DNS na mieste, nebude sa uložiť. DNS vždy nastavte ako prvé.
:::

## Overenie funkčnosti

Po uložení otvorte svoju doménu v prehliadači. Ak sa načíta váš web B1, máte hotovo. Ak sa zobrazí chyba, DNS sa môže ešte stále šíriť — počkajte niekoľko minút a skúste znova.

Šírenie DNS môžete skontrolovať aj na stránke [dnschecker.org](https://dnschecker.org) — zadajte svoju doménu a overte, či sa zobrazuje váš záznam CNAME alebo A.
