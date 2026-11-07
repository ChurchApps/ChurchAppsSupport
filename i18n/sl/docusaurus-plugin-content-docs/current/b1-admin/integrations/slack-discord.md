---
title: "Slack in Discord"
---

# Slack in Discord

<div class="article-intro">

Pošiljajte berljiva obvestila iz B1 neposredno v kanal Slack ali Discord: nove osebe, darila, prijave v skupine, oddane obrazce, dogodke v koledarju in še več. Ne potrebujete računa tretje osebe in ne vzdržujete nobenega Zapa: B1 dogodke preoblikuje v sporočila za klepet in jih pošlje na webhook URL kanala.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- V B1Admin potrebujete dovoljenje **Edit Settings** (Urejanje nastavitev)
- Skrbnik v vašem delovnem prostoru Slack ali strežniku Discord, ki ustvari dohodni webhook za kanal
- Odločite se, v kateri kanal želite prejemati obvestila (za več vrst dogodkov lahko uporabite isti kanal ali pa jih razdelite po kanalih)

</div>

## Kako deluje

B1 ima vgrajeno vrsto povezave **Connector Type** za platforme za klepet. Ko ustvarite webhook s tipom **Slack** ali **Discord**, mehanizem webhookov še vedno opravi običajno dostavo, ponovne poskuse in podpisane glave, vsebina, ki jo pošlje, pa se iz običajne ovojnice B1 `{event,churchId,data}` preoblikuje v kratko sporočilo `{text}` (Slack) ali `{content}` (Discord), kot ju pričakujeta ti storitvi.

Poleg obstoječega odhodnega toka webhookov B1 ne kontaktira strežnikov Slacka za posamezno cerkev. Ni ničesar novega za gostovanje in ni dodatnih stroškov.

## Slack – korak za korakom

### 1. Pridobite dohodni webhook URL za Slack

1. Odprite [api.slack.com/apps](https://api.slack.com/apps) v delovnem prostoru Slack, v katerem želite prejemati obvestila.
2. Kliknite **Create New App → From scratch**, aplikaciji dajte ime, na primer »B1 Notifications«, in izberite delovni prostor.
3. V levi navigaciji izberite **Incoming Webhooks** in preklopite **Activate Incoming Webhooks** na *On*.
4. Kliknite **Add New Webhook to Workspace**, izberite kanal (npr. `#donations`) in nato **Allow**.
5. Slack vas vrne na stran s svežim **Webhook URL**, ki je videti takole: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopirajte ga, saj je to edini podatek, ki ga B1 potrebuje.

:::caution
Webhook URL za Slack obravnavajte kot skrivnost. Kdorkoli ga ima, lahko v kanal objavi poljubna sporočila. Če ga po naključju razkrijete, ga ponovno ustvarite na strani aplikacije v Slacku (ponovno ustvarjanje samo zamenja URL; nato posodobite B1).
:::

### 2. Povežite z B1Admin

1. V B1Admin pojdite na **Settings → Developer → Webhooks** (Nastavitve → Razvijalec → Webhooks).
2. Kliknite **New Webhook**.
3. Izpolnite polja:
   - **Name** (Ime) – berljivo ime, na primer »Donations → #donations«. Vidi ga samo vaša ekipa.
   - **Connector Type** – izberite **Slack**.
   - **Payload URL** – prilepite Slack URL iz 1. koraka.
   - **Events** (Dogodki) – označite dogodke, ki jih želite kot sporočila. Za kanal o darilih izberite samo `donation.created`. Za kanal #people poskusite z `person.created` in `group.member.added`.
4. Kliknite **Save**. Prikaže se pogovorno okno »Signing Secret«. Za Slack ga lahko prezrete (Slack ne preverja podpisov B1), zato ga zaprite.

### 3. Preizkusite

Ponovno odprite webhook s seznama in kliknite **Send Test Event** (Pošlji preizkusni dogodek). V eni ali dveh sekundah se v vašem kanalu Slack prikaže sporočilo, na primer

> 💝 New donation: $50.00

na istem zaslonu pa se v tabeli **Recent Deliveries** (Nedavne dostave) pojavi nova vrstica s statusom `succeeded`. Opravljeno.

## Discord – korak za korakom

### 1. Pridobite webhook URL za Discord

1. Na vašem strežniku Discord se z miško premaknite nad kanal, za katerega želite prejemati obvestila, in kliknite **⚙ zobnik** (Edit Channel – Uredi kanal).
2. Odprite **Integrations → Webhooks → New Webhook** (Integracije → Webhooki → Novi webhook).
3. Vnesite ime in po želji avatar, nato kliknite **Copy Webhook URL** (Kopiraj webhook URL). Videti bo takole: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Povežite z B1Admin

Postopek je enak kot pri Slacku, le da za **Connector Type** izberete **Discord**. URL za Discord prilepite v **Payload URL** in shranite.

:::tip
Na konec URL-ja za Discord **ne** dodajajte `/slack`. B1 pošilja vsebine `{content}`, ki so namenjene Discordu, ne vsebine, združljive s Slackom. Prilepite URL, ki vam ga je dal Discord.
:::

### 3. Preizkusite

Uporabite isti gumb **Send Test Event**. Discord prikaže sporočilo v izbranem kanalu, dnevnik dostav pa preklopi na `succeeded`.

## Kako izgledajo sporočila

| Dogodek | Primer sporočila |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Celoten seznam je v [katalogu dogodkov webhookov](/docs/developer/api/webhooks#event-catalog). Vsak dogodek iz njega lahko usmerite v Slack ali Discord.

## Ločen kanal za vsako temo

Vseh dogodkov vam ni treba spraviti na eno mesto. Večina cerkva nastavi nekaj webhookov:

- Kanal **#donations**, ki posluša samo `donation.created`
- Kanal **#new-people** za `person.created` in `group.member.added`
- Kanal **#admin-alerts** za manj pogoste dogodke, kot je `form.submission.created`

Število webhookov na cerkev ni omejeno. Vsak je neodvisen: brisanje ali onemogočanje enega ne vpliva na druge.

## Pregled dostav

Tabela **Recent Deliveries** (Nedavne dostave) v urejevalniku webhookov prikazuje zadnjih 50 poskusov. Kliknite vrstico, da vidite točno poslano vsebino in odgovor, ki je prišel nazaj. Za povezavo Slack je vsebina `{"text":"💝 New donation: $50.00"}`, ne surova ovojnica `{event,churchId,...}`, ker jo B1 pred dostavo preoblikuje.

Če je prišlo do napake (rdeča značka `failed` ali `exhausted`), pogovorno okno prikaže statusno kodo HTTP in vsebino odgovora, da lahko vidite, kaj Slack ali Discord nista sprejela. Običajno gre za napako pri kopiranju URL-ja.

## Odpravljanje težav

- **Sporočilo se ne prikaže, stanje dostave pa je `400`** – običajno je **Connector Type** nastavljen na **Standard**, URL pa je za Slack ali Discord. Slack in Discord surove ovojnice zavrneta. Preklopite spustni seznam na **Slack** ali **Discord** in ponovno pošljite preizkus.
- **Webhook se samodejno onemogoči** – po treh zaporednih neuspešnih dostavah B1 webhook izklopi. Popravite URL (ali ga ponovno ustvarite v Slacku oz. Discordu) in ponovno vklopite **Active**.
- **Sporočilo pride, vendar manjkajo podrobnosti** – vsaka klepetalna platforma omejuje velikost sporočila. Sporočila B1 so zaradi zasnove kratka. Za bogatejša obvestila uporabite [Zapier](./zapier) ali [Make](./make), ki prek svojih akcij za Slack sestavijo obsežnejše sporočilo.

## Kasnejša sprememba vrste povezave

Vrsto povezave **Connector Type** lahko spremenite pri obstoječem webhooku. Začne veljati ob naslednji dostavi. Če preklopite iz Slacka na Standard, usmerite URL na svojo končno točko HTTPS. Isti skrivni ključ za podpis (izdan ob ustvarjanju webhooka) bo nato mogoče preveriti kot surovo ovojnico.

## Glejte tudi

- [Zapier](./zapier) – za večstopenjske delovne tokove, ki jih sprožijo dogodki B1
- [Make](./make) – vizualni graditelj scenarijev
- [Webhooks (razvijalska referenca)](/docs/developer/api/webhooks) – celotna oblika vsebine in podpisov, če nekoč usmerite webhook na svoj strežnik
