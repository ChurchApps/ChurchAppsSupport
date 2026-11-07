---
title: "Eigen domein"
---

# Eigen domein

<div class="article-intro">

Je kunt je eigen domein (bijvoorbeeld **`www.yourchurch.org`**) naar je B1-site laten verwijzen, zodat bezoekers je site bereiken op het echte webadres van je kerk in plaats van het standaardadres yourchurch.b1.church.

</div>

## Instructievideo

<YouTube id="L5yaDusHts8" title="Een eigen domein koppelen in B1" next="Livestreaming instellen in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Stap 1 — Voeg eerst het DNS-record toe

Voordat je je domein in B1 toevoegt, moet je het bij je domeinregistrar (GoDaddy, Namecheap, Cloudflare, enz.) naar de servers van B1 laten verwijzen.

Voeg een van deze records toe — CNAME heeft de voorkeur:

| Type | Host | Waarde |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Gebruik de **CNAME** voor je `www`-adres. Gebruik het **A-record** als je registrar geen CNAME ondersteunt op een hoofd- of apex-domein (zonder www), of als je wilt dat het hoofddomein ook werkt.

DNS-wijzigingen kunnen enkele minuten tot enkele uren duren voordat ze van kracht worden.

## Stap 2 — Voeg het domein toe in B1

Zodra DNS naar B1 verwijst:

1. Ga in B1 Admin naar **Instellingen**.
2. Klik in de linkerlijst op **Domeinen** en klik vervolgens op **Bewerken** in de sectie **Domeinen**.
3. Typ je domein in het veld en klik op **Opslaan**.

Je hoeft eerst niet op de knop **+** te klikken — een domein dat in het veld is ingetypt, wordt toegevoegd wanneer je opslaat. Gebruik **+** (of druk op **Enter**) als je meerdere domeinen aan de lijst wilt toevoegen voordat je opslaat.

B1 regelt SSL automatisch — je hoeft zelf geen certificaat aan te schaffen.

:::warning
Als je het domein in B1 toevoegt voordat de DNS-records zijn ingesteld, wordt het niet opgeslagen. Stel DNS altijd eerst in.
:::

## Controleren of het werkt

Bezoek na het opslaan je domein in een browser. Als je B1-site wordt geladen, ben je klaar. Als je een foutmelding ziet, is de DNS mogelijk nog aan het doorvoeren — wacht enkele minuten en probeer het opnieuw.

Je kunt de DNS-verspreiding ook controleren op [dnschecker.org](https://dnschecker.org) — zoek naar je domein en kijk of je CNAME- of A-record verschijnt.
