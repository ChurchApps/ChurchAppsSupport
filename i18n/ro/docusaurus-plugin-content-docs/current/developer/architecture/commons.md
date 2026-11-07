---
title: "Content Commons"
description: "Cum circulă cântecele, lecțiile și șabloanele trimise de utilizatori prin coada de moderare comună din Server Admin al B1 Admin, de la trimitere până la publicare."
---

# Content Commons — Bibliotecă comună de resurse și moderare

Conținutul trimis de utilizatori și partajat între produse (cântece WorshipCommons, lecții Lessons.church, șabloane FreeShow, șabloane de site pentru B1) trece printr-o singură coadă de moderare, nu printr-un flux de revizuire separat pentru fiecare produs. Această pagină descrie ciclul de viață al trimiterii și aprobării, modelul de date comun al resurselor și locul unde se află moderarea.

## Coloana vertebrală a resurselor

Două tabele conțin fiecare element din biblioteca comună, indiferent de produs:

- **`assets`** — rândul public de identitate. `status`: `pending` | `published` | `unpublished` | `removed`. Datele specifice tipului (detaliile cântecului, autorii) se află în tabele satelit, asociate prin `assetId`.
- **`assetFiles`** — fiecare fișier atașat unei resurse (audio, imagini, documente), care înlocuiește coloanele mai vechi `path` și `files` (separate prin virgulă) din tabelele individuale de conținut.
- **`submissions`** — unitatea de moderare. Ciclul de viață: `draft → pending → approved | rejected | withdrawn`. O trimitere poate fi fie o resursă nouă, fie o modificare a uneia publicate deja (făcută de autorul original sau de o terță persoană).

Aprobarea unei trimiteri rulează un **hook de publicare** specific produsului (`Api/src/modules/commons/helpers/publishHooks/`, de exemplu `song.ts`), care transformă trimiterea în înregistrările proprii ale produsului.

## Fluxul de trimitere

`CommonsSubmissionController` (`Api/src/modules/commons/`) este API-ul destinat utilizatorilor finali: creează o ciornă, pregătește și atașează fișiere, trimite spre revizuire sau retrage trimiterea. Clienții săi reali sunt site-urile externe ale producătorilor (site-ul WorshipCommons, Lessons.church, FreeShow, galeria de șabloane de site pentru B1) — nu B1Admin.

## Consumul de către biserici

Pe lângă moderare, B1Admin citește direct și din coloana comună a resurselor: căutarea „Add Song” din Serving → Songs interoghează `GET /songs?sundayReady=true` alături de baza externă existentă de cântece, afișând cântecele WorshipCommons publicate pe care personalul le-a marcat ca fiind pregătite pentru duminică (vezi poarta de ascultare de mai jos), cu o insignă de licență. Selectarea unui cântec leagă noul `SongDetail` de sursa sa prin `songDetailLinks`. Aceasta este singura cale prin care B1Admin-ul unei biserici atinge direct datele comune, în loc să treacă prin instrumentele Server Admin, rezervate personalului. Pentru descrierea destinată bisericilor, consultați secțiunea din documentația de suport [Free Songs from WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons).

## Coada de moderare

Coada se află în **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`) și este protejată de permisiunea `Permissions.server.admin` — aceeași care protejează Churches/Impersonate/Jobs din aceeași pagină. Este un instrument intern, destinat exclusiv personalului ChurchApps, pe care bisericile individuale nu îl văd.

Trei sub-file:

- **Queue** — toate trimiterile în așteptare din toate produsele, care pot fi filtrate după produs sau tipul resursei. Fiecare rând afișează o insignă pentru resursă nouă, editare de către autor sau editare de către o terță persoană, istoricul de aprobare al trimițătorului, un rezumat al diferențelor la nivel de câmp și de fișiere, precum și vârsta trimiterii (marcată după 72 de ore). **Review** deschide un panou cu diferențe pe câmpuri, previzualizări ale fișierelor și o previzualizare încorporată, doar în citire, a produsului. Approve/Reject acceptă scurtături de tastatură (j/k pentru navigare, a/r pentru acțiune).
- **Reports** — rapoarte privind drepturile de autor și politicile sau calitatea pentru resursele publicate, împărțite în două cozi și un istoric al rezolvărilor. Un membru al personalului preia un raport și apoi îl rezolvă cu o decizie (susținut/respins/duplicat) și o acțiune (niciuna/dezpublicare/eliminare).
- **Assets** — un browser căutabil al conținutului publicat, cu acțiuni per resursă: evidențiere, dezpublicare/republicare sau eliminare (motiv: drepturi de autor/politici). Pentru cântece, o **poartă de ascultare** de aici este modul prin care un cântec devine „pregătit pentru duminică”: personalul îl marchează după ce a ascultat toate tonalitățile publicate și a confirmat că partitura, acordurile și slide-urile sunt prezente.

Fiecare punct de acces de sub `/commons/admin/*` (`CommonsAdminController.ts`) verifică din nou, independent, permisiunea de administrator de server.

:::info
Acest design are intenționat o singură coadă: interfața de moderare `/admin` a WorshipCommons a fost retrasă, în favoarea trimiterii tuturor trimiterilor din fiecare produs prin instrumentele Server Admin din B1Admin.
:::

## Domenii

Api (modulul commons), B1Admin (Server Admin) și site-urile externe ale producătorilor: WorshipCommons, Lessons.church, FreeShow, șabloane ale constructorului de site-uri B1.
