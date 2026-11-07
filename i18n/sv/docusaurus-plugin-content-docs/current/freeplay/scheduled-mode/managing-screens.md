---
title: "Hantera skärmar och grupper"
---

# Hantera skärmar och grupper

<div class="article-intro">

Sidan **Skärmar** i FreePlay Admin visar alla TV-apparater som är kopplade till din kyrka, vad de visar just nu och om de är redo för söndag. Här hanterar du också **skärmgrupper**. Skärmar i samma grupp delar en gemensam kalender och en gemensam standardslinga.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Logga in på FreePlay Admin på [admin.freeplay.church](https://admin.freeplay.church)
- [Koppla minst en skärm](./pairing-a-screen)

</div>

## Sidan Skärmar

Överst visar tre siffror en snabb hälsokontroll:

- **Online nu** - Skärmar som har kontaktat servern under de senaste 15 minuterna
- **Redo för söndag** - Hur många schemalagda skärmar som har laddat ned allt fram till kommande söndag
- **Kräver åtgärd** - Skärmar som är offline eller saknar filer

Under det använder du **Sök skärmar** för att hitta en skärm efter etikett, grupp eller vad den visar. Filterknapparna begränsar listan till **Alla**, **Schemalagda**, **Manuella**, **Kräver åtgärd** eller en enskild grupp. Byt mellan vyerna **Tabell** och **Rutnät** med växlaren till höger.

Varje skärm visar:

- **Etikett** och enhetsmodell
- **Grupp**
- **Läge** - **Schemalagd** eller **Manuell**
- **Spelas nu** - Vad som visas på skärmen just nu. Manuella skärmar visar **Klassrum · läraren trycker på Start**
- **Redo till och med** - Det datum som skärmen har laddat ned till. Om filer saknas visas i stället **N filer saknas**. En ny skärm visar **Väntar på första synkronisering**
- **Senast sedd** - När skärmen senast kontaktade servern. En skärm som inte har kontaktat servern på ett tag visar **Offline**, och en skärm som aldrig har anslutit visar **Aldrig sedd**

Använd **Presentera** för att spela upp skärmens kalender i din webbläsare, eller **Redigera** för att ändra inställningarna.

## Visa en skärm

Klicka på en skärms etikett för att öppna dess sida. Till vänster finns:

- **Presentera i webbläsare** - Spela upp skärmens kalender i helskärm i din webbläsare, så som den skulle se ut på TV:n. Se [Presentera från en webbläsare](./scheduled-playback#presenting-from-a-browser)
- **Redigera** - Ändra etikett, grupp eller läge
- **Mer** > **Koppla bort** - Koppla bort TV:n. Den visar då en kopplingskod igen

Resten av sidan har dessa avsnitt:

- **Nu och nästa** - Vad som spelas nu och till vilken tid, följt av allt som är schemalagt under de kommande 7 dagarna. Klicka på **Öppna kalender** för att gå direkt till gruppens kalender
- **Nedladdningar** - **Redo till och med** ett datum när allt är nedladdat, eller en lista över filer som saknas
- **Enhet** - Enhets-ID, plattform, modell, version av FreePlay-appen, IP-adress, lagring som används och är ledig, senast sedd och läge
- **Senaste** - Den senaste aktiviteten som skärmen har rapporterat

:::tip
Om en skärm visar saknade filer, kontrollera att den är online och har ledigt lagringsutrymme. TV:n laddar ned saknade filer av sig själv nästa gång den kontaktar servern.
:::

## Redigera en skärm

1. Klicka på **Redigera** bredvid skärmen, eller på dess sida.
2. Ändra **Etikett**, **Grupp** eller **Läge** (**Schemalagd** eller **Manuell**).
3. Klicka på **Spara**.

När du flyttar en skärm till en annan grupp växlar den till den gruppens kalender.

## Skärmgrupper

En skärmgrupp är en uppsättning skärmar som visar samma sak samtidigt, till exempel "Entré" eller "Barnavdelningen". Varje grupp har en egen kalender och kan ha en **standardslinga** som spelas när inget är schemalagt.

För att hantera grupper klickar du på **Grupper** överst på sidan **Skärmar**. Listan **Skärmgrupper** visar varje gruppens namn, hur många skärmar den har och dess standardslinga. Klicka på **Skärmar** för att gå tillbaka.

### Lägga till en grupp

1. Klicka på **Lägg till grupp** i vyn **Skärmgrupper**.
2. Ange ett **Namn**, till exempel "Entré".
3. Välj en spellista som **Standardslinga**, eller lämna den på **Ingen — skärmen blir svart**.
4. Klicka på **Spara**.

Du kan också skapa en grupp när du kopplar en skärm genom att välja **＋ Ny grupp…** i fältet **Grupp**.

### Redigera eller ta bort en grupp

1. Klicka på **Redigera** bredvid gruppen.
2. Ändra namnet eller standardslingan och klicka sedan på **Spara**.
3. För att ta bort gruppen klickar du på **Ta bort** och bekräftar.

:::warning
Om du tar bort en grupp tas även dess schema bort. Skärmar i gruppen blir svarta tills du flyttar dem till en annan grupp.
:::

## Relaterade artiklar

- **[Koppla en skärm](./pairing-a-screen)** - Lägg till en ny TV
- **[Schemalägga kalendern](./scheduling-the-calendar)** - Ange vad varje grupp spelar och dess standardslinga
- **[Schemalagd uppspelning på TV:n](./scheduled-playback)** - Vad datumet "Redo till och med" betyder på själva TV:n
