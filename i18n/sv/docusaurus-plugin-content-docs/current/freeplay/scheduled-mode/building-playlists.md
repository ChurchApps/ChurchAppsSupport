---
title: "Ansluta leverantörer och skapa spellistor"
description: "Ställ in anslutna innehållsleverantörer i FreePlay Admin, bygg, ordna och förhandsgranska spellistor för schemalagda TV-skärmar."
---

# Ansluta leverantörer och skapa spellistor

<div class="article-intro">

En spellista är en loop med bilder och videor som du lägger i kalendern. I FreePlay Admin ansluter du dina innehållsleverantörer en gång för hela församlingen. Sedan skapar du spellistor genom att välja filer från dessa leverantörer.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Logga in i FreePlay Admin på [admin.freeplay.church](https://admin.freeplay.church)
- Ha inloggningsuppgifterna till de leverantörskonton du vill koppla, till exempel Dropbox eller OneDrive

</div>

## Ansluta leverantörer

Sidan **Leverantörer** visar dina innehållskällor i två avsnitt:

- **Anslutna** - Leverantörer du kan använda direkt. Offentliga leverantörer som inte kräver inloggning, till exempel Lessons.church och Bible Project, visas alltid här som **Offentlig · ingen inloggning behövs**. Kopplade konton visar **Konto kopplat** och när kopplingen går ut.
- **Tillgängliga** - Leverantörer som kräver att du loggar in innan du kan använda dem.

Så här ansluter du en leverantör:

1. Gå till **Leverantörer**.
2. Hitta leverantören under **Tillgängliga** och klicka på **Anslut**.
3. Logga in på ditt konto hos leverantören:
   - Vissa leverantörer, till exempel Dropbox, Google Drive och OneDrive, öppnar ett popup-fönster för inloggning. Om inget visas, tillåt popup-fönster för admin.freeplay.church.
   - Andra leverantörer visar en länk och en kod. Besök länken, ange koden och godkänn åtkomsten. Dialogrutan uppdateras automatiskt när du är klar.
4. När du ser **Kontot har kopplats!** flyttas leverantören till **Anslutna**.

Anslutna leverantörer har tre åtgärder:

- **Bläddra** - Gå igenom leverantörens mappar
- **Uppdatera** - Förnya leverantörens inloggning
- **Koppla bort** - Koppla bort kontot

:::info
Leverantörsanslutningar i FreePlay Admin tillhör hela församlingen, inte en enskild person eller en enskild TV. Schemalagda skärmar hämtar sina filer via dessa anslutningar, så du behöver inte logga in hos varje leverantör på varje TV.
:::

**FreeShow** visas som **På ditt församlingsnätverk · varje TV hittar den själv**. Det finns inget att ansluta för den i FreePlay Admin.

## Sidan Spellistor

Sidan **Spellistor** visar varje spellista med antal objekt, total längd, var den används (**Standardloop** för en grupp, eller antalet scheman) och när den senast uppdaterades. Varje rad har dessa åtgärder:

- **Presentera** - Spela upp spellistan i helskärm i din webbläsare
- **Redigera** - Öppna spellisteredigeraren
- **Duplicera** - Skapa en kopia med namnet "(kopia)"

## Skapa en spellista

1. Gå till **Spellistor** och klicka på **Lägg till spellista**.
2. Ange ett **Namn**, till exempel "Välkomstloop".
3. Klicka på **Lägg till spellista**. Spellisteredigeraren öppnas.

## Lägga till objekt

Spellisteredigeraren visar spellistans **Objekt** till vänster och **Lägg till från leverantör** till höger.

1. Välj en leverantörsflik till höger. Om du vill lägga till en annan källa klickar du på **Anslut en till**, vilket öppnar sidan **Leverantörer**.
2. Klicka på mappar för att gå in i dem. Använd bröds smulestigen för att gå tillbaka uppåt.
3. Klicka på en fil för att lägga till den sist i spellistan. Filer som redan finns i spellistan markeras som valda.
4. Om du vill lägga till alla filer i den aktuella mappen på en gång klickar du på **Lägg till alla**. Knappen visar hur många filer som ännu inte finns i spellistan.
5. Klicka på **Spara** överst i redigeraren.

:::warning
Ändringar sparas inte förrän du klickar på **Spara**. Klicka på **Avbryt** för att lämna utan att spara.
:::

## Ordna objekt

I listan **Objekt** till vänster:

- **Ändra ordning** - Dra ett objekt med dess handtag till vänster
- **Bildtid** - Bilder visas i 10 sekunder som standard. Ändra antalet sekunder bredvid en bild
- **Videor** - Videor visar **Spelas till slutet** och spelas i sin fulla längd
- **Ta bort** - Ta bort ett objekt från spellistan

Sammanfattningen överst visar antalet objekt och spellistans totala längd.

## Byta namn, duplicera och ta bort

Panelen på redigerarens vänstra sida visar var spellistan används. Den har också dessa åtgärder:

- **Presentera** - Spela upp spellistan i din webbläsare
- **Byt namn** - Ändra spellistans namn
- **Duplicera** - Skapa en kopia att redigera separat
- **Ta bort** - Ta bort spellistan. Scheman som spelar den återgår till gruppens standardloop

## Presentera en spellista i webbläsaren

Klicka på **Presentera** för att spela upp spellistan i helskärm i din webbläsare. Det är praktiskt för att förhandsgranska en spellista eller för att köra den från en bärbar dator som är ansluten till en projektor. Flytta musen för att visa kontrollfältet och använd sedan dessa tangenter:

| Tangent | Åtgärd |
|---|---|
| **Mellanslag** | Pausa eller fortsätt |
| **←** / **→** | Föregående eller nästa objekt |
| **F** | Växla helskärm |
| **Esc** | Avsluta |

## Relaterade artiklar

- **[Schemalägga kalendern](./scheduling-the-calendar.md)** - Lägg din spellista i skärmgruppens kalender
- **[Hantera skärmar och grupper](./managing-screens.md)** - Ange en spellista som gruppens standardloop
- **[Innehållsleverantörer](../content-providers/index.md)** - Leverantörer du kan ansluta direkt på TV:n
