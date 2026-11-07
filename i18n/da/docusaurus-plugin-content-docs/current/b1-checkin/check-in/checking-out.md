---
title: "Udtjekning og børnesikkerhed"
---

# Udtjekning og børnesikkerhed

<div class="article-intro">

Udtjekning afslutter indtjekningen af børn: en forælder viser sikkerhedskoden fra sin afhentningsetiket, kiosken bekræfter, hvem der henter, og børnene checkes ud. Bemandede stationer har også sikkerhedsværktøjer: verifikation af betroede afhentere, sms'er til at kalde en forælder, genudskrivning af etiketter og en nødudsendelse.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Udtjekning er tilgængelig på stationer, der er sat til **bemandet** tilstand i kioskens admin-indstillinger
- Børn skal være [indtjekket](./completing-checkin) med en udskrevet afhentningsetiket, der indeholder sikkerhedskoden
- Oprop og nødudsendelser kræver, at din kirke har en sms-udbyder tilsluttet i B1 Admin

</div>

## Start en udtjekning

1. På en bemandet station trykker du på **Udtjek** på opslagsskærmen.
2. Indtast den 4-cifrede **sikkerhedskode** fra familiens afhentningsetiket. Du kan skrive den, bruge det skærmbaserede tastatur eller scanne etikettens stregkode med en USB- eller Bluetooth-scanner. Koden sendes automatisk, når alle 4 tegn er indtastet.
   - Ingen scanner? Tryk på **Scan** under kodefeltet for at bruge tablettens kamera i stedet. Hold QR-koden eller stregkoden på afhentningsetiketten op mod kameraet i vinduet **Scan afhentningskode**, så indtastes koden automatisk. Bagkameraet bruges som standard. Tryk på vendeknappen for at skifte kamera, eller tryk på **Annuller** for at gå tilbage til at skrive.
3. Kiosken viser de børn, der er indtjekket under den kode.

## Bekræft hvem der henter

Udtjekningsskærmen spørger, hvem der henter børnene:

- **Betroede afhentere** for husstanden vises som trykbare kort med foto og relation. Tryk på den person, der står foran dig.
- **Voksne i husstanden** vises også i et fotogitter.
- **Andre** lader dig skrive navnet på en person, der ikke står på listen.

Hvis et indtastet navn matcher en person, der er markeret som **Ikke autoriseret** for husstanden, blokerer kiosken udtjekningen med en advarsel. En medarbejder kan vælge **Tilsidesæt** for alligevel at fortsætte. Tilsidesættelsen registreres på fremmødeposten med personens navn.

Når afhenteren er bekræftet, trykker du på udtjek. Afhenterens navn gemmes på fremmødeposten.

:::info
Betroede personer og ikke-autoriserede afhentere administreres af kirkens medarbejdere på hver persons side i B1 Admin. Se [Indtjekningssikkerhed](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Oprop en forælder

Har du brug for en forælder under gudstjenesten, fx ved en bleskift eller et gråddende barn? Fra udtjekningsskærmen på en bemandet station kan medarbejdere sende en **oprop**: en sms til barnets forældre eller værge via kirkens sms-udbyder. Forældre, der har fravalgt sms'er eller ikke har et mobilnummer, springes over, og kiosken viser, hvor mange beskeder der blev sendt.

## Genudskriv etiketter

Hvis en navneskilt eller afhentningsetiket er væk eller beskadiget, kan medarbejdere på en bemandet station **genudskrive** familiens etiketter fra udtjekningsskærmen, efter at sikkerhedskoden er indtastet. Genudskrivningen bruger samme printer og etiketskabeloner som ved den oprindelige indtjekning.

## Nødudsendelse

I en nødsituation kan medarbejdere sende sms til værgerne for **alle indtjekkede børn** ved den aktuelle gudstjeneste på én gang:

1. Åbn kioskens **admin-indstillinger** (7 hurtige tryk på logoet i sidehovedet, plus pinkoden hvis en er sat).
2. Tryk på **Nødudsendelse**.
3. Skriv beskeden, og skriv derefter **EMERGENCY** i bekræftelsesfeltet. Knappen **Send udsendelse** forbliver deaktiveret, indtil du gør det.
4. Kiosken oplyser, hvor mange telefoner der modtog beskeden, og hvor mange personer der blev sprunget over (fravalgt eller uden mobilnummer).

:::warning
Udsendelsen går til alle indtjekkede husstande for den valgte gudstjeneste. Brug den kun ved reelle nødsituationer, fx evakuering, nedlukning eller alvorligt vejr.
:::

## Relaterede artikler

- [Gennemførelse af indtjekning](./completing-checkin): hvor sikkerhedskoder og afhentningsetiketter kommer fra
- [Indtjekningssikkerhed](../../b1-admin/attendance/checkin-safety): konfiguration af kapacitet, forhold, afhentere og krav til sms-udbyder
- [Printeropsætning](../getting-started/printer-setup): konfiguration af etiketprinter
