---
title: "Eigen domän"
description: "Peka en egen domän, till exempel www.dinkyrka.se, mot din B1-webbplats i B1 Admin genom att ställa in DNS-poster och lägga till domänen under Settings."
---

# Eigen domän

<div class="article-intro">

Du kan peka din egen domän (till exempel **`www.dinforsamling.org`**) mot din B1-webbplats, så att besökare når den under din kyrkas riktiga webbadress i stället för standardadressen dinforsamling.b1.church.

</div>

## Instruktionsvideo

<YouTube id="L5yaDusHts8" title="Ansluta en egen domän i B1" next="Konfigurera livesändningar i B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Steg 1 — Lägg till DNS-posten först

Innan du lägger till din domän i B1 behöver du peka den mot B1:s servrar hos din domänregistrar (GoDaddy, Namecheap, Cloudflare med flera).

Lägg till en av dessa poster — CNAME är att föredra:

| Typ | Värd | Värde |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `dinforsamling.org` | `3.23.251.61` |

Använd **CNAME** för din `www`-adress. Använd **A-posten** om din registrar inte stöder CNAME för en rotdomän (utan www), eller om du vill att rotdomänen ska fungera också.

Det kan ta från några minuter till några timmar innan DNS-ändringarna börjar gälla.

## Steg 2 — Lägg till domänen i B1

När DNS pekar mot B1:

1. Gå till **Inställningar** i B1 Admin.
2. Klicka på **Domäner** i listan till vänster och klicka sedan på **Redigera** i avsnittet **Domäner**.
3. Skriv in din domän i fältet och klicka på **Spara**.

Du behöver inte klicka på knappen **+** först — en domän som står kvar i fältet läggs till när du sparar. Använd **+** (eller tryck på **Enter**) när du vill lägga till flera domäner i listan innan du sparar.

B1 hanterar SSL automatiskt — du behöver inte köpa något certifikat.

:::warning
Om du lägger till domänen i B1 innan DNS-posterna är på plats sparas den inte. Konfigurera alltid DNS först.
:::

## Kontrollera att det fungerar

Efter att du har sparat, öppna din domän i en webbläsare. Om den visar din B1-webbplats är du klar. Om du ser ett fel kan DNS-ändringarna fortfarande vara på väg fram — vänta några minuter och försök igen.

Du kan också kontrollera DNS-spridningen på [dnschecker.org](https://dnschecker.org) — sök på din domän och se om din CNAME- eller A-post visas.
