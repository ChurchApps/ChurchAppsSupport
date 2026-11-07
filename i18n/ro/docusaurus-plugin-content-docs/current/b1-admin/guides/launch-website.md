---
title: "Ghid: Lansați site-ul web al bisericii"
description: "Configurați site-ul bisericii în B1 Admin: pagina principală, culori și logo, pagini-cheie, domeniu propriu și formulare de donații."
---

# Lansați site-ul web al bisericii

<div class="article-intro">

B1.church include un constructor complet de site-uri web, fără costuri suplimentare. Acest ghid vă ghidează pas cu pas la crearea site-ului bisericii de la zero: configurarea paginii de pornire, personalizarea aspectului, adăugarea paginilor principale și, opțional, conectarea formularelor pentru donații online și înscrieri la evenimente.

</div>

## Videoclip de instruire

<YouTube id="aA4UahZpmXg" title="Lansarea site-ului bisericii în B1" next="Editarea paginilor și a navigării în B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Pregătiți logo-ul bisericii (PNG cu fundal transparent funcționează cel mai bine)
- Alegeți 2–3 culori de brand pentru site
- Dacă folosiți un domeniu personalizat (de exemplu, bisericata.ro), asigurați-vă că aveți acces la furnizorul DNS (GoDaddy, Cloudflare etc.)
- Dacă doriți donații online pe site, finalizați mai întâi [Configurarea donațiilor online](../donations/online-giving-setup.md) (Stripe)

</div>

## Pasul 1: Configurarea inițială a site-ului

Începeți prin a crea pagina de pornire și structura de bază a site-ului.

Urmați ghidul [Configurarea inițială a site-ului web](../website/initial-setup.md) pentru a:

1. Accesa **Website** în B1 Admin
2. Crea pagina de pornire cu o secțiune principală, un mesaj de bun venit și informațiile esențiale
3. Adăuga numele bisericii și sloganul

## Pasul 2: Configurarea aspectului

Stabiliți identitatea vizuală a site-ului: culori, fonturi, logo și subsol.

Urmați ghidul [Aspect](../website/appearance.md) pentru a:

1. Încărca logo-ul bisericii
2. Seta culorile principală și de accent
3. Configura bara de navigare și subsolul
4. Previzualiza modificările

:::tip
Păstrați paleta de culori simplă: o culoare principală plus o culoare de accent este de obicei suficientă. Constructorul de site-uri se ocupă de restul.
:::

## Pasul 3: Adăugarea paginilor de conținut

Construiți paginile de care vizitatorii au cea mai mare nevoie.

Urmați ghidul [Gestionarea paginilor](../website/managing-pages.md) pentru a crea pagini precum:

- **Despre noi** — Povestea bisericii, credințele și conducerea
- **Predici** — Trimiteți către [biblioteca de predici](../sermons/managing-sermons.md)
- **Evenimente** — Evenimentele viitoare și înscrierile
- **Donații** — Pagina de donații online (necesită [configurarea Stripe](../donations/online-giving-setup.md))
- **Contact** — Locație, programul slujbelor și date de contact

## Pasul 4: Conectarea domeniului

Dacă doriți să folosiți propriul nume de domeniu (de exemplu, bisericata.ro) în loc de adresa implicită B1:

1. Accesați **Settings** în B1 Admin și deschideți secțiunea **Domains**
2. Introduceți domeniul personalizat
3. Actualizați înregistrările DNS la furnizorul de domeniu pentru a indica spre B1

:::info
Modificările DNS pot dura până la 48 de ore pentru a se propaga. Site-ul dvs. poate să nu fie accesibil imediat de pe domeniul personalizat. Adresa implicită B1 va funcționa în continuare în acest interval.
:::

## Pasul 5: Adăugarea donațiilor și formularelor

Îmbogățiți site-ul cu elemente interactive:

- **Donații online** — Adăugați o secțiune de donații, ca membrii să poată dona direct de pe site-ul bisericii. Consultați [Configurarea donațiilor online](../donations/online-giving-setup.md) pentru a configura mai întâi Stripe.
- **Formulare de înscriere** — Încorporați [formulare independente](../forms/creating-forms.md) pentru înscrieri la evenimente, carduri de vizitator sau cereri de voluntariat. Consultați [Gestionarea paginilor](../website/managing-pages.md) pentru a afla cum adăugați un element de formular pe orice pagină.

## Ați terminat!

Site-ul bisericii dvs. este online. Distribuiți adresa URL comunității și pe rețelele sociale. Puteți actualiza conținutul, adăuga pagini noi și ajusta aspectul oricând din panoul B1 Admin.

## Articole conexe

- [Configurarea inițială a site-ului web](../website/initial-setup.md) — ghid detaliat de configurare
- [Gestionarea paginilor](../website/managing-pages.md) — adăugarea și editarea paginilor
- [Aspect](../website/appearance.md) — culori, logo și layout
- [Gestionarea fișierelor](../website/files.md) — încărcarea imaginilor și documentelor
- [Configurarea donațiilor online](../donations/online-giving-setup.md) — configurarea Stripe
- [Crearea formularelor](../forms/creating-forms.md) — construirea formularelor de înscriere și sondaj
