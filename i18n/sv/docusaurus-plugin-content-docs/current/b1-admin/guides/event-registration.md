---
title: "Guide: Konfigurera eventregistrering"
description: "Ställ in ett anmälningsformulär i B1 Admin för att samla in deltagaruppgifter och valfria betalningar, bädda in det på kyrkans webbplats och följ anmälningarna."
---

# Konfigurera eventregistrering

<div class="article-intro">

Skapa ett anmälningsformulär för evenemang, samla in uppgifter om deltagare och eventuella betalningar, bädda in formuläret på din kyrkas webbplats och hantera anmälningarna när de kommer in. När du är klar har du en delbar anmälningssida för vilket kyrkoevenemang som helst.

</div>

:::info
**Två sätt att hantera eventregistrering:** Den här guiden beskriver **formulärbaserad registrering**, som ger dig full kontroll över anpassade fält och betalningsinsamling. För enklare evenemang där du bara behöver hålla reda på vem som kommer, använd **inbyggd eventregistrering** i kalendern. Se [Skapa kalendrar](../calendars/creating-calendars.md#enabling-event-registration) för installationsanvisningar. Med den inbyggda registreringen kan medlemmar anmäla sig direkt från [B1-webbplatsen](../../b1-church/events/registering.md) och [mobilappen](../../b1-mobile/events/registering.md), med kapacitetsspårning, datumfönster och bekräftelsemejl.
:::

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett B1 Admin-konto med administratörsbehörighet
- För att ta emot betalningar: [Stripe måste vara konfigurerat](../donations/online-giving-setup.md) först

</div>

## Steg 1: Skapa ett fristående formulär

Fristående formulär har en egen offentlig webbadress som vem som helst kan öppna, vilket passar perfekt för eventregistrering.

Följ guiden [Skapa formulär](../forms/creating-forms.md) för att:

1. Gå till Formulär och klicka på Lägg till formulär
2. Välj typen "Fristående". Då får ditt formulär en egen offentlig webbadress
3. Namnge det efter evenemanget (till exempel "Anmälan till männens retreat" eller "Anmälan till VBS")

## Steg 2: Lägg till frågor

Bygg upp de fält du behöver samla in från deltagarna.

Följ guiden [Skapa formulär](../forms/creating-forms.md#adding-questions) för att lägga till dina frågor:

1. Gå till fliken Frågor och lägg till fält för de uppgifter du behöver: namn, e-post, telefon, kostrestriktioner, t-shirtstorlek, nödkontakt med mera.
2. Använd flervalsfrågor för alternativ som måltidsönskemål eller val av pass.

:::warning
Fälttypen Betalning kräver att Stripe är konfigurerat. Om du inte har ställt in onlinegivande ännu, se [Konfigurera onlinegivande](../donations/online-giving-setup.md) innan du lägger till betalningsfält.
:::

## Steg 3: Konfigurera formulärinställningar

Styr när och hur ditt anmälningsformulär är tillgängligt.

1. Ställ in tillgänglighetsdatum om anmälan bara ska vara öppen under en begränsad tid.
2. Kopiera den offentliga webbadressen. Du kan dela den direkt.
3. Lägg till formulärmedlemmar med rollen Administratör eller Endast visning för att hjälpa till att hantera anmälningarna.

## Steg 4: Bädda in på din webbplats

Gör det enkelt att hitta anmälningsformuläret genom att lägga till det på din kyrkas webbplats.

Följ guiden [Hantera sidor](../website/managing-pages.md) för att:

1. I din editor för B1-webbplatsen lägger du till en ny sektion på en sida och väljer elementet Formulär.
2. Välj ditt anmälningsformulär i listan.

:::tip
Dela även den fristående webbadressen via e-post, sociala medier och kyrkans veckoblad. Ju fler ställen den syns på, desto fler anmälningar får du.
:::

## Steg 5: Hantera anmälningar

Följ anmälningarna när de kommer in och exportera data när du behöver det.

Följ guiden [Hantera inskickade svar](../forms/managing-submissions.md) för att:

1. Granska svar när de kommer in på fliken Svar.
2. Exportera till CSV för kalkylblad, deltagarräkning eller för att dela med evenemangsansvariga.

## Klart!

Din eventregistrering är nu aktiv. Dela länken, bädda in den på din webbplats och följ anmälningarna i B1 Admin. När evenemanget är slut exporterar du den slutliga listan för dina arkiv.

## Relaterade artiklar

- [Skapa formulär](../forms/creating-forms.md) — bygg formulär med olika fälttyper
- [Hantera inskickade svar](../forms/managing-submissions.md) — granska och exportera formulärsvar
- [Hantera sidor](../website/managing-pages.md) — bädda in formulär på din webbplats
- [Konfigurera onlinegivande](../donations/online-giving-setup.md) — krävs för betalningsfält
