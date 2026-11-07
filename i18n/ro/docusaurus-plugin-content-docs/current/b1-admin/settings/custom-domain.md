---
title: "Domeniu personalizat"
---

# Domeniu personalizat

<div class="article-intro">

Puteți indica propriul domeniu (de exemplu **`www.bisericata.org`**) către site-ul dvs. B1, astfel încât vizitatorii să ajungă la adresa reală a bisericii dvs., în loc de adresa implicită bisericata.b1.church.

</div>

## Videoclip de instruire

<YouTube id="L5yaDusHts8" title="Conectarea unui domeniu personalizat în B1" next="Configurarea transmisiunilor live în B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Pasul 1 — Adăugați mai întâi înregistrarea DNS

Înainte de a adăuga domeniul în B1, trebuie să îl indicați către serverele B1 la registratorul de domenii (GoDaddy, Namecheap, Cloudflare etc.).

Adăugați una dintre aceste înregistrări — se preferă CNAME:

| Tip | Gazdă | Valoare |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `bisericata.org` | `3.23.251.61` |

Folosiți înregistrarea **CNAME** pentru adresa dvs. `www`. Folosiți înregistrarea **A** dacă registratorul dvs. nu acceptă CNAME pentru domeniul de rădăcină (fără www) sau dacă doriți ca și domeniul de rădăcină să funcționeze.

Modificările DNS pot dura de la câteva minute până la câteva ore pentru a fi active.

## Pasul 2 — Adăugați domeniul în B1

Odată ce DNS-ul indică spre B1:

1. Accesați **Settings** (Setări) în B1 Admin.
2. Faceți clic pe **Domains** (Domenii) în lista din stânga, apoi faceți clic pe **Edit** (Editare) în secțiunea **Domains**.
3. Scrieți domeniul în câmp și faceți clic pe **Save** (Salvare).

Nu este necesar să faceți clic mai întâi pe butonul **+** — un domeniu lăsat scris în câmp este adăugat la salvare. Folosiți **+** (sau apăsați **Enter**) atunci când doriți să adăugați mai multe domenii în listă înainte de salvare.

B1 gestionează automat certificatul SSL — nu este necesară achiziționarea unui certificat.

:::warning
Dacă adăugați domeniul în B1 înainte ca înregistrările DNS să fie configurate, acesta nu se va salva. Configurați întotdeauna mai întâi DNS-ul.
:::

## Verificarea funcționării

După salvare, accesați domeniul în browser. Dacă se încarcă site-ul dvs. B1, ați terminat. Dacă vedeți o eroare, DNS-ul s-ar putea să fie încă în curs de propagare — așteptați câteva minute și încercați din nou.

Puteți verifica și propagarea DNS la [dnschecker.org](https://dnschecker.org) — căutați domeniul dvs. și verificați dacă apare înregistrarea CNAME sau A.
