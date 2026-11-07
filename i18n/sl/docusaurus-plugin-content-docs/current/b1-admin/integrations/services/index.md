---
title: "Povezane storitve"
description: "Povežite B1 Admin z Mailchimp, Donorbox, Subsplash, VOMO, Clearstream in drugimi orodji prek receptov Zapier ali Make, z vodniki za vsakega."
---

# Povezane storitve

<div class="article-intro">

Najhitrejši način za povezavo B1 z drugim orodjem za cerkveno tehnologijo je običajno recept v Zapier ali Make. Nove infrastrukture v B1 ne potrebujete, delovni tok pa gostuje pri tretji osebi. Ta stran je izbran seznam storitev, za katere smo potrdili, da jih je mogoče danes povezati, s kratkim navodilom za nastavitev za vsako, ki ga lahko kopirate in prilepite.

</div>

## Na prvi pogled

| Storitev | Kategorija | Most | Kaj lahko povežete |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-pošta | Zapier ali Make | Sinhronizira nove osebe in darovalce iz B1 v občinstvo Mailchimp |
| [Donorbox](./donorbox.md) | Darovanja | Zapier | Pošlje darovanja in darovalce iz Donorbox nazaj v B1 |
| [Subsplash](./subsplash.md) | Aplikacija / Darovanja | Zapier | Prenese darovanja in osebe iz Subsplash v B1 |
| [VOMO](./vomo.md) | Prostovoljstvo | Zapier | Sinhronizira prijave prostovoljcev med skupinami B1 in projekti VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Sproži sporočilo SMS prek Clearstream ob dogodkih v B1; odgovore sprejme kot zapise v B1 |
| [Text In Church](./text-in-church.md) | SMS / Delovni tokovi | Zapier | Sproži delovne tokove Text In Church iz B1; prejema podatke s Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier ali Make | Pošilja SMS ob katerem koli dogodku v B1 |
| [Checkr](./checkr.md) | Preverjanje preteklosti | Make | Sproži preverjanje preteklosti, ko se nekdo pridruži ekipi za služenje |

## Kaj imajo vse skupnega

1. **Stran B1 pri povezavi je enaka**: ustvarite API ključ z ustreznimi dovoljenji v **B1Admin → Settings → Developer → API Keys**, nato pa pustite, da most registrira webhook za sprožilec (Zapier in Make to naredita samodejno, zahteva `settings:write`), ali pokličite končne točke REST API v B1 iz naknadnega dejanja.
2. **Most vam zaračunava storitev, ne mi.** ChurchApps je brezplačen. Zapier in Make imata brezplačne pakete, ki pokrivajo nekaj receptov.
3. **Povezavo lahko preizkusite, preden gre v živo.** Oba mosta imata gumb »Preizkusi korak«, ki enkrat sproži sprožilec v B1 in pokaže obliko podatkov, preden recept vklopite.

## Izbira mostu

- **Zapier** je prijaznejši in ima večji katalog aplikacij. Uporabite ga kot privzeto, razen če je strošek problem.
- **Make** je pri večjem obsegu cenejši in ima bolj prilagodljivo usmerjanje ter filtriranje. Uporabite ga, kadar ima en delovni tok razvejitve, pogojne stavke ali veliko korakov.
- **Webhooks by Zapier** (uporabljen v dokumentu za Mobile Message) je splošen vmesnik, ki vam omogoča pošiljanje zahtevkov POST na poljubno HTTP končno točko iz Zap, kadar cilj ni prvorazredna aplikacija Zapier.

Če želite nekaj, česar ni na tem seznamu, sta [REST API](/docs/developer/api) in [webhooki](/docs/developer/api/webhooks) v B1 odprta. Z [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) lahko v nekaj urah zgradite enkraten most.

## Česa tukaj ni (in zakaj)

Več priljubljenih orodij za cerkveno tehnologijo, med njimi Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck in MinistrySafe, trenutno nima objavljene aplikacije Zapier ali modula Make. Imajo lastne API-je, vendar je povezava z B1 delo po meri, ne recept, zato ne sodijo na ta seznam. Če ponudnik doda aplikacijo Zapier ali modul Make, bomo dodali dokument.

Namenoma smo izpustili orodja, specifična za Planning Center-Services (glasba, predstavitve), konkurenčne sisteme ChMS, svetovalce za selitev podatkov in orodja, ki samo očistijo podatke, specifične za PCO. Nobeno nima uporabne poti povezave z B1.

## Glejte tudi

- [Zapier (pregled)](../zapier.md): stran B1 pri vsakem receptu Zapier je enaka, zato jo ta dokument opiše enkrat
- [Make (pregled)](../make.md): enako za scenarije Make
- [Slack in Discord](../slack-discord.md): obvestila v klepetu brez mostu
- [Google Sheets](../google-sheets.md): izvozi na zahtevo
- [Webhooki (referenca za razvijalce)](/docs/developer/api/webhooks): katalog dogodkov, na katerega se zanaša vsak recept
