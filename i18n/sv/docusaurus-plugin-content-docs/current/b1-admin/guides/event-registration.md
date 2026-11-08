---
title: "Guide: Konfigurera eventregistrering"
description: "Konfigurera ett anmälningsformulär för event i B1 Admin för att samla in deltagaruppgifter och eventuella betalningar, bädda in det på din kyrkas webbplats och följa anmälningarna."
---

# Konfigurera eventregistrering

<div class="article-intro">

Skapa ett anmälningsformulär för event, samla in deltagarinformation och eventuella betalningar, bädda in formuläret på din kyrkas webbplats och hantera anmälningarna när de kommer in. När du är klar har du en delbar anmälningssida för vilket kyrkoevent som helst.

</div>

:::info
**Två sätt att hantera eventregistrering:** Den här guiden behandlar **formulärbaserad registrering**, som ger dig full kontroll över anpassade fält och betalningsinsamling. För enklare event där du bara behöver hålla reda på vilka som kommer, använd **inbyggd eventregistrering** i kalendern. Se [Skapa kalendrar](../calendars/creating-calendars.md#enabling-event-registration) för installationsanvisningar. Med inbyggd registrering kan medlemmar anmäla sig direkt via [B1.church eller B1-appen](../../b1-church/events/registering.md), med kapacitetsspårning, datumfönster och e-postbekräftelser.
:::

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett B1 Admin-konto med administratörsbehörighet
- För att samla in betalningar: [Stripe måste vara konfigurerat](../donations/online-giving-setup.md) först

</div>

## Steg 1: Skapa ett fristående formulär

Fristående formulär har en egen offentlig webbadress som vem som helst kan öppna, vilket gör dem perfekta för eventregistrering.

Följ guiden [Skapa formulär](../forms/creating-forms.md) för att:

1. Gå till Formulär och klicka på Lägg till formulär
2. Välj typen “Stand Alone” – då får formuläret en egen offentlig webbadress
3. Ge det ett namn efter eventet (t.ex. “Anmälan till männens reträtt”, “Anmälan till VBS”)

## Steg 2: Lägg till frågor

Bygg upp de fält du behöver samla in från deltagarna.

Följ guiden [Skapa formulär](../forms/creating-forms.md#adding-questions) för att lägga till frågorna:

1. Gå till fliken Frågor och lägg till fält för de uppgifter du behöver: namn, e-post, telefon, kostrestriktioner, t-shirtstorlek, nödkontakt osv.
2. Använd Flerval för alternativ som måltidsval eller val av pass

:::warning
Betalningsfälttypen kräver att Stripe är konfigurerat. Om du inte har ställt in onlinegivande ännu, se [Konfigurera onlinegivande](../donations/online-giving-setup.md) innan du lägger till betalningsfält.
:::

## Steg 3: Konfigurera formulärinställningar

Styr när och hur ditt anmälningsformulär är tillgängligt.

1. Ange tillgänglighetsdatum om anmälan bara ska vara öppen under en begränsad tid
2. Kopiera den offentliga webbadressen – du kan dela den direkt
3. Lägg till formulärmedlemmar med rollen Admin eller Endast visning för att hjälpa till att hantera inlämningarna

## Steg 4: Bädda in på din webbplats

Gör det enkelt att hitta anmälningsformuläret genom att lägga till det på din kyrkas webbplats.

Följ guiden [Hantera sidor](../website/managing-pages.md) för att:

1. I din B1-webbplatseditor lägger du till en ny sektion på en sida och väljer elementet Formulär
2. Välj ditt anmälningsformulär i listan

:::tip
Dela även den fristående webbadressen via e-post, sociala medier och kyrkans veckoblad – ju fler ställen den syns på, desto fler anmälningar får du.
:::

## Steg 5: Hantera inlämningar

Följ anmälningarna när de kommer in och exportera data när du behöver det.

Följ guiden [Hantera inlämningar](../forms/managing-submissions.md) för att:

1. Granska svar när de kommer in på fliken Inlämningar
2. Exportera till CSV för kalkylblad, antalsräkning eller för att dela med eventansvariga

## Klart!

Din eventregistrering är nu aktiv. Dela länken, bädda in den på din webbplats och följ anmälningarna från B1 Admin. När eventet är slut, exportera den slutliga listan för dina arkiv.

## Relaterade artiklar

- [Skapa formulär](../forms/creating-forms.md) — bygg formulär med olika fälttyper
- [Hantera inlämningar](../forms/managing-submissions.md) — granska och exportera formulärsvar
- [Hantera sidor](../website/managing-pages.md) — bädda in formulär på din webbplats
- [Konfigurera onlinegivande](../donations/online-giving-setup.md) — krävs för betalningsfält
