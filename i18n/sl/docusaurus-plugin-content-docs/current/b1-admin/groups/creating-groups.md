---
title: "Ustvarjanje skupin"
description: "Nastavite novo skupino v B1 Admin: od izbire kategorije in imena do pravil pridružitve, oznak, sporočanja in nastavitev prisotnosti."
---

# Ustvarjanje skupin

<div class="article-intro">

Ustvarjanje skupine v B1 Admin je preprosto. Nastavite kategorijo, poimenujete skupino in nato nastavite njene možnosti. Skupine pomagajo organizirati vašo cerkev v smiselne enote, kot so male skupine, odbori in razredi.

</div>

## Video za usposabljanje

<YouTube id="uG93pXVreNo" title="Ustvarjanje skupin in dodajanje članov v B1" next="Prošnje za pridružitev skupini in koledarji skupin v B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete aktiven račun B1 Admin z dovoljenjem za upravljanje skupin. Če niste prepričani o svoji ravni dostopa, si oglejte [Vloge in dovoljenja](../people/roles-permissions.md).
- Določite strukturo kategorij za svoje skupine (na primer »Male skupine«, »Službe«, »Odbori«). Kategorije pomagajo ohraniti povezane skupine urejene.

</div>

## Dodajanje nove skupine

1. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na zgornjem levem delu B1 Admin), razširite **People** in kliknite **Groups**.
2. V glavi strani kliknite **Add Group**. Pod seznamom se odpre obrazec **New Group**. Vnesite **Category Name**. Kategorije vam pomagajo organizirati povezane skupine (na primer »Male skupine«, »Službe« ali »Odbori«). Če kategorija že obstaja, jo lahko izberete s seznama.
3. Vnesite **Name** skupine.
4. Kliknite **Add**. Nova skupina se bo prikazala na seznamu, njena kategorija pa bo prikazana pod njenim imenom.

## Nastavitev možnosti skupine

Ko je skupina ustvarjena, lahko dodate dodatne podrobnosti:

1. Kliknite **ime skupine** na seznamu, da jo odprete.
2. Kliknite gumb **Edit** na levi strani strani skupine, pod podrobnostmi skupine.
3. Nastavite naslednje možnosti:
   - **Description** -- Kratek povzetek tega, kaj skupina počne. Vidni so člani.
   - **Meeting Times** -- Kdaj se skupina običajno sestaja (na primer »Sreda ob 19.00«).
   - **Join Policy** -- Izberite, kdo se lahko pridruži tej skupini:
     - **Open** -- Vsak se lahko takoj pridruži brez odobritve
     - **Request** -- Osebe morajo oddati prošnjo za pridružitev, ki zahteva odobritev (glejte [Prošnje za pridružitev skupini](./group-join-requests.md))
     - **Closed** -- Člane morajo ročno dodati voditelji ali skrbniki
   - **Labels** -- Skupini dodelite eno ali več opisnih oznak (na primer »Osebno«, »Spletno«, »Dobrodošli novi člani«). Oznake so prosto določljive oznake, ki jih opredelite sami; označite vse, ki veljajo. Oznake lahko uporabite za filtriranje skupin v elementu spletne strani Groups Browser.
   - **Confidential group** -- Skrije to skupino in njen seznam članov pred javnimi stranmi, iskalnikom skupin in ne-člani. Uporabite za občutljive skupine, kot so službe za okrevanje ali svetovanje; skupino lahko vidijo le njeni člani in cerkveno osebje.
   - **Discussions** -- Vklopi ali izklopi klepetalni tok skupine, kjer lahko kateri koli član objavi sporočilo. Privzeto vklopljeno.
   - **Announcements** -- Vklopi drugi klepetalni tok, namenjen samo voditeljem -- člani lahko berejo in se odzivajo, objavljati pa lahko le voditelji. Privzeto vklopljeno.
   - **Attendance Tracking** -- Omogočite, če želite beležiti [prisotnost](../attendance/tracking-attendance.md) za to skupino.
   - **Service Times** -- Po potrebi povežite skupino z določenimi časi cerkvenih bogoslužij. Podrobnosti o časih bogoslužij najdete v [Nastavitvi prisotnosti](../attendance/setup.md).
4. Kliknite **Save**, da uveljavite spremembe.

:::tip
Jasen opis in čas srečanja pomagata članom vedeti, kaj lahko pričakujejo, ko se pridružijo skupini.
:::

:::info
Če izklopite tako Discussions kot Announcements, zavihek Messages v celoti odstrani iz skupine v portalu za člane. Če izklopite le eno, se njen zavihek skrije; člani se preusmerijo na tisti tok, ki je še vklopljen. Obstoječa sporočila so v vsakem primeru ohranjena -- stikala nadzorujejo le objavljanje novih sporočil.
:::

## Podvajanje skupine

Začenjate novo sejo ponavljajočega se razreda ali službe? Namesto ponovnega vnosa vseh nastavitev podvojite obstoječo skupino:

1. Odprite skupino in kliknite **Duplicate** (pod gumbom **Edit** na levi strani strani skupine).
2. Potrdite podvajanje.

Kopija prevzame nastavitve izvirnika -- kategorijo, opis, čas/lokacijo srečanja, politiko pridruževanja, oznake in kampus -- **ne** pa tudi njegovih članov. Nova skupina dobi ime izvirnika s pripisom » (Copy)«; preimenujte jo v nastavitvah skupine.

## Arhiviranje skupine

Ko skupina ni več aktivna, vendar želite ohraniti njeno zgodovino namesto brisanja:

1. Odprite skupino in kliknite **Edit**, da uredite njene nastavitve.
2. Kliknite **Archive** in potrdite.

Arhivirane skupine izginejo z glavnega seznama skupin. Če jo želite znova najti, kliknite gumb **Show archived** poleg gumbov kategorij na vrhu strani Groups, nato pa kliknite **Restore** ob skupini, da jo vrnete.

:::info
Arhiviranje skupine ne izbriše njenih članov, zgodovine prisotnosti ali dogodkov v koledarju -- le skrije skupino s privzetega seznama, dokler je ne obnovite.
:::

## Naslednji koraki

Ko ustvarite in nastavite skupino, lahko nadaljujete z:

- **Dodajanje članov** -- Poiščite osebe in jih dodajte v skupino. Z ikono zvezdice (**Make Leader**) določite voditelje skupine. Glejte [Člani skupine](./group-members.md).
- **Nastavitev koledarja** -- Ustvarite dogodke in ponavljajoča se srečanja za skupino. Glejte [Koledar skupine](./group-calendar.md).
- **Komunikacija** -- Pošljite sporočila vsem članom skupine neposredno s strani skupine.
- **Izvoz podatkov** -- Kliknite **Export** nad seznamom članov skupine, da ga prenesete.

:::info
Vsaka skupina pripada kategoriji, glavna stran Groups pa vam omogoča filtriranje seznama po kategorijah. Kategorije lahko kadarkoli preuredite ali preimenujete, ko vaša cerkev raste.
:::
