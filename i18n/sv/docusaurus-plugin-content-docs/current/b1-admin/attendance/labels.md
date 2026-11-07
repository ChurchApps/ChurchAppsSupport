---
title: "Designer för incheckningsetiketter"
---

# Designer för incheckningsetiketter

<div class="article-intro">

Etikettdesignern låter dig skapa och anpassa mallar för namnbrickor och upphämtningslappar som skrivs ut när familjer checkar in sina barn. Du kan styra exakt vilken information som visas på varje etikett, var den placeras och hur den ser ut.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera [Närvaro](setup) och ställ in minst en gudstjänsttid med incheckning aktiverad
- Konfigurera [Incheckning](check-in) så att etiketter skrivs ut
- Du behöver administratörsbehörighet för avsnittet Närvaro

</div>

## Öppna etikettdesignern

I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expanderar **Mobil** och klickar på **B1 CheckIn**. Klicka sedan på knappen **Designa etiketter** på kortet Incheckningsetiketter. Du ser en lista över dina sparade etikettmallar, uppdelade efter typ: **Namnbricka** och **Upphämtningslapp**.

## Etikettyper

- **Namnbricka** — skrivs ut och fästs på barnet. Innehåller vanligtvis barnets namn, deras klassrum eller pass och en säkerhetskod.
- **Upphämtningslapp** — ges till föräldern eller vårdnadshavaren. Innehåller vanligtvis säkerhetskoden och en lista över de barn som checkats in.

B1 startar med en standardmall för namnbricka och en standardmall för upphämtningslapp, anpassade för vanliga termiska etiketter på 3,5 × 1,1 tum.

## Skapa en etikettmall

1. Klicka på **Lägg till** och välj en utgångspunkt i menyn: **Namnbricka 3,5" x 1,1"**, **Upphämtningslapp 3,5" x 1,1"** eller **Tom**.
2. En ny mall öppnas i etikettredigeraren.

### Etikettredigeraren

Redigeraren visar en skalad förhandsvisning av etiketten i den konfigurerade storleken. I den vänstra panelen kan du konfigurera:

- **Namn** — mallens namn (endast för din egen referens)
- **Etikettyp** — Namnbricka eller Upphämtningslapp
- **Bredd / Höjd** — etikettens storlek i tum

### Lägga till block

En etikett byggs upp av block, det vill säga enskilda innehållsdelar som placeras på etikettytan. Klicka på **Lägg till block** för att infoga ett nytt block och välj dess typ:

- **Fält** — hämtar ett datavärde vid utskrift:
  - `person.displayName` — personens fullständiga namn
  - `sessions` — tjänsten eller klassrummet där de checkade in
  - `securityCode` — den slumpmässigt genererade säkerhetskoden för upphämtning
  - `children` — lista över barn (för upphämtningslappar)
  - `person.nametagNotes` — eventuella särskilda anteckningar i personens post
  - `person.isBirthdayWeek` — sant om personens födelsedag (månad och dag) ligger inom 3 dagar före eller efter incheckningsdatumet
  - `campus` — campusnamnet
- **Text** — statisk text du skriver in (för rubriker, etiketter eller instruktioner)
- **Streckkod** — en streckkod som kodar säkerhetskoden

### Placera block

Varje block har fälten **X**, **Y**, **Bredd** och **Höjd**, som uttrycks i procent av etikettytan (0–100). Justera dessa för att placera innehållet exakt. Du kan också ställa in:

- **Teckenstorlek** — textstorlek i punkter
- **Fet** — växla fetstil för texten
- **Justering** — vänster-, center- eller högerjustering av text
- **Villkor** — dölj blocket om ett fält är tomt (till exempel visa nametagNotes endast om det har ett värde). Detta fungerar även med `person.isBirthdayWeek` för att visa en födelsedagsgrafik eller text endast på namnbrickor för barn vars födelsedag ligger inom några dagar från incheckningen.

### Spara

Klicka på **Spara** för att spara mallen. Den uppdaterade mallen används nästa gång etiketter skrivs ut i B1 Checkin.

## Ändra ordning på mallar

Om du har flera mallar för namnbrickor eller upphämtningslappar använder B1 Checkin som standard den första mallen i listan. Dra mallar för att ändra ordningen.

## Ta bort en mall

Klicka på raderingsikonen på en mallrad och bekräfta. Om du tar bort den sista mallen av en viss typ återställs standardmallen som är inbyggd.

:::tip
Gör en testutskrift efter att du redigerat en mall för att kontrollera att layouten ser rätt ut innan nästa gudstjänst.
:::

## Relaterade artiklar

- [Inställning av incheckning](setup) — konfigurera tjänster och grupper för incheckning
- [Slutföra incheckning](check-in) — incheckningsflödet för familjer
- [Komma igång med B1 Checkin](../../b1-checkin/getting-started/) — incheckningskioskappen
