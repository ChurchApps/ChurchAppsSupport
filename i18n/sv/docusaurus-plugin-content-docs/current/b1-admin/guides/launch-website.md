---
title: "Guide: Lansera din kyrkas webbplats"
---

# Lansera din kyrkas webbplats

<div class="article-intro">

B1.church innehåller en fullständig webbplatsbyggare utan extra kostnad. Den här guiden visar dig hur du skapar din kyrkas webbplats från grunden: du ställer in startsidan, konfigurerar utseendet, lägger till viktiga sidor och kan eventuellt koppla på onlinegivande och anmälningsformulär för evenemang.

</div>

## Utbildningsvideo

<YouTube id="aA4UahZpmXg" title="Lansera din kyrkas webbplats i B1" next="Redigera sidor och navigering i B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ha din kyrkas logotyp redo (PNG med transparent bakgrund fungerar bäst)
- Välj 2–3 varumärkesfärger för din webbplats
- Om du använder en egen domän (t.ex. dinkyrka.se) behöver du tillgång till din DNS-leverantör (GoDaddy, Cloudflare m.fl.)
- Om du vill ha onlinegivande på din webbplats, slutför [Konfigurera onlinegivande](../donations/online-giving-setup.md) (Stripe) först

</div>

## Steg 1: Första webbplatsinställningen

Börja med att skapa din startsida och webbplatsens grundstruktur.

Följ guiden [Första inställningen av webbplatsen](../website/initial-setup.md) för att:

1. Gå till **Webbplats** i B1 Admin
2. Skapa din startsida med en hjältesektion, ett välkomstmeddelande och viktig information
3. Lägg till ditt kyrkonamn och din slogan

## Steg 2: Konfigurera utseende

Ställ in din webbplats visuella identitet: färger, typsnitt, logotyp och sidfot.

Följ guiden [Utseende](../website/appearance.md) för att:

1. Ladda upp din kyrkas logotyp
2. Ange dina primära färger och accentfärger
3. Konfigurera navigeringsfältet och sidfoten
4. Förhandsgranska dina ändringar

:::tip
Håll din färgpalett enkel. En primär färg och en accentfärg räcker oftast. Webbplatsbyggaren sköter resten.
:::

## Steg 3: Lägg till innehållssidor

Bygg ut de sidor som dina besökare behöver mest.

Följ guiden [Hantera sidor](../website/managing-pages.md) för att skapa sidor som:

- **Om oss**: Din kyrkas historia, tro och ledarskap
- **Predikningar**: Länk till ditt [predikningsarkiv](../sermons/managing-sermons.md)
- **Evenemang**: Kommande evenemang och anmälan
- **Ge**: Sida för onlinegivande (kräver [Stripe-konfiguration](../donations/online-giving-setup.md))
- **Kontakt**: Plats, gudstjänsttider och kontaktuppgifter

## Steg 4: Koppla din domän

Om du vill använda ditt eget domännamn (som dinkyrka.se) i stället för standardadressen i B1:

1. Gå till **Inställningar** i B1 Admin och öppna avsnittet **Domäner**
2. Ange din egna domän
3. Uppdatera dina DNS-poster hos din domänleverantör så att de pekar mot B1

:::info
DNS-ändringar kan ta upp till 48 timmar att spridas. Din webbplats kanske inte går att nå via din egen domän direkt. Standardadressen i B1 fortsätter att fungera under tiden.
:::

## Steg 5: Lägg till givande och formulär

Förbättra din webbplats med interaktiva delar:

- **Onlinegivande**: Lägg till en givandesektion så att medlemmar kan ge direkt från din webbplats. Se [Konfigurera onlinegivande](../donations/online-giving-setup.md) för att först konfigurera Stripe.
- **Anmälningsformulär**: Bädda in [fristående formulär](../forms/creating-forms.md) för evenemangsanmälningar, besökskort eller volontäransökningar. Se [Hantera sidor](../website/managing-pages.md) för hur du lägger till ett formulärelement på valfri sida.

## Klart!

Din kyrkas webbplats är nu igång. Dela webbadressen med din församling och på sociala medier. Du kan uppdatera innehåll, lägga till nya sidor och justera utseendet när som helst från B1 Admin-instrumentpanelen.

## Relaterade artiklar

- [Första inställningen av webbplatsen](../website/initial-setup.md): detaljerad genomgång av installationen
- [Hantera sidor](../website/managing-pages.md): lägg till och redigera sidor
- [Utseende](../website/appearance.md): färger, logotyp och layout
- [Hantera filer](../website/files.md): ladda upp bilder och dokument
- [Konfigurera onlinegivande](../donations/online-giving-setup.md): konfigurera Stripe
- [Skapa formulär](../forms/creating-forms.md): bygg anmälnings- och enkätformulär
