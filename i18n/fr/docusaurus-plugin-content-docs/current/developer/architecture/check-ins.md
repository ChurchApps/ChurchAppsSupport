---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Le Check-in est un système avec trois portes d'entrée : l'application kiosque B1Checkin pour les stations gérées et en libre-service, le check-in automatique dans le portail des membres B1App et la présence du côté administrateur dans B1Admin. Les trois écrivent au même module de présence dans l'Api principal, et le routage des salles de classe est entièrement piloté par les groupes -- il n'y a pas d'entité "emplacements" ou "salles" séparée. Une couche de sécurité des enfants s'appuie dessus : types de check-in par visite, portes de capacité et de ratio de bénévoles du côté du serveur, admissibilité d'âge/grade du côté du kiosque, vérification de ramassage de confiance à la déconnexion et pagination des parents sur le fournisseur de texte de l'église. Cette page cartographie le modèle de données, les flux de check-in, la couche de sécurité et le pipeline d'impression d'étiquettes.

</div>

## Aperçu

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Surface | Repo | Stack | Rôle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, and iOS; OTA updates via `expo-updates` | Station gérée ou en libre-service avec impression d'étiquettes et vérification de départ confirmée |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Les membres connectés enregistrent leur ménage à partir d'un téléphone ; pas d'impression |
| Admin | `B1Admin` | React SPA | Configure la structure du service, attribue les groupes aux heures de service, conçoit les étiquettes, enregistre la présence manuelle, exécute les rapports |

Les trois appellent les deux mêmes modules API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, les ménages et les groupes ; **AttendanceApi** (`/attendance`) pour tout ce qui suit.

## Modèle de données (`Api/src/modules/attendance`)

| Entity / table | Champs clés | Signification |
|----------------|-----------|---------|
| `campuses` | name, address | Obsolète ici -- les campus sont maîtrisés dans le module d'adhésion (`/membership/campuses`) ; la copie de présence est gelée en lecture seule pour les lecteurs hérités (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par ex. "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Une tranche horaire au sein d'un service, par ex. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tableau de jointure : quels groupes (salles de classe) se réunissent à quelles heures de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date -- créée paresseusement au moment du check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne assistant à une date (`models/Visit.ts`). `checkinType` est `member` / `guest` / `volunteer` (NULL = legacy member), défini par le kiosque et consommé par les portes de capacité/ratio |
| `visitSessions` | visitId, sessionId | Quelle(s) session(s) une visite couvre -- un enfant enregistré à deux heures de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Mises en page d'étiquettes désignables (`models/LabelTemplate.ts`) |

### Comment un check-in complété est persisté

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gère `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant des `visitSessions` dont la `session` intégrée nomme uniquement une paire `(serviceTimeId, groupId)`. Le serveur ensuite :

1. **Portes de capacité et de ratios avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie chaque capacité de salle ciblée, capacité d'invité, drapeau fermé et ratio de bénévole contre l'occupation actuelle. postCheckin n'est **pas transactionnel**, donc la porte doit s'exécuter avant la première sauvegarde -- une violation grave retourne un 409 nommant la(es) salle(s) offensante(s) et rien n'est persisté. Voir [Portes de capacité et de ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les sessions paresseusement.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, today)` -- les ids de session sont mis en cache en processus par date. Les nouvelles sessions émettent un webhook `session.created`. La boucle est un `for..of` attendu -- un `forEach(async …)` précédent qui tirait sans attendre en arrière-plan a envoyé les sessionIds NULL lors de la création de la première session (corrigé ; noté dans un commentaire de code à la boucle).
3. **Remplace les enregistrements du jour.** Toute visite existante pour ces personnes à ce service aujourd'hui est supprimée ainsi que ses visitSessions, puis l'ensemble soumis est sauvegardé. Le re-check-in d'une famille est donc une opération idempotente "c'est l'état actuel", pas une annexe. Passer `?checkDuplicates=true` à la place retourne `{ duplicates: [personId…] }` sans écrire, ce qui est comment le kiosque avertit avant de remplacer.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code à 4 caractères de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (pas de voyelles ou de caractères ambigus, donc les codes ne peuvent pas épeler des mots ou mal lire). Le serveur réessaie en cas de collision contre les visites ouvertes de la même église au même jour et tamponne le code sur chaque visite du lot.
5. **Retourne `{ streaks, securityCode }`.** `streaks` mappe personId au nombre de présences de semaines consécutives ; le kiosque célèbre les jalons (chaque 5e semaine) avec des confettis.

Chaque visite sauvegardée émet également un webhook `attendance.recorded`. Le côté lecture, `GET /attendance/visits/checkin`, retourne les visites des personnes à partir de leur **dernière date enregistrée** -- si cela a été une semaine précédente les ids sont supprimés, donc le client reçoit une copie pré-remplie des sélections de salle de la semaine précédente qui sera sauvegardée comme de nouveaux enregistrements.

### Check-out

Deux points de terminaison complètent la boucle (`VisitController`) :

- `GET /attendance/visits/code/:code` -- les visites de non-départ d'aujourd'hui portant ce code de sécurité, avec les sessions peuplées.
- `POST /attendance/visits/checkout` -- corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; tamponne `checkoutTime` et qui a ramassé, et émet un webhook `attendance.checkout` par visite.

Permissions : les kiosques s'authentifient avec `attendance.checkin`, qui accorde exactement la surface de check-in/check-out/modèle d'étiquette ; `attendance.view`/`attendance.edit` couvrent les rapports et l'entrée manuelle ; la structure (services, heures de service, assignations de groupe) nécessite `services.edit`. Le self check-in en membres (B1App) ne nécessite aucune permission du tout : tout utilisateur authentifié avec une personne liée dans l'église peut appeler `GET`/`POST /attendance/visits/checkin`, et le serveur restreint les `personId` soumis au propre ménage de l'appelant (403 sinon -- cette barrière est ce qui garde les codes de sécurité des autres familles illisibles). L'adhésion est l'octroi ; si les membres voient la fonctionnalité est contrôlé par les onglets de navigation B1App de l'église. Les autres points de terminaison de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) restent kiosque/personnel uniquement.

## Les groupes conduisent le routage des salles

Il n'existe aucune entité de salle ou de salle de classe nulle part dans le système. Une "salle" est un **groupe** d'adhésion avec `trackAttendance` activé, lié à une ou plusieurs heures de service via `groupServiceTimes`. Les champs de groupe (sur `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement du kiosque :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe à la présence du tout ; l'arborescence de configuration de B1Admin signale les groupes `trackAttendance` sans ligne `groupServiceTimes` comme non attribués |
| `parentPickup` | Marque une salle pour enfants : l'enregistrement dans celle-ci rend la visite une visite "enfant", qui imprime une étiquette de ramassage familial et met le code de sécurité sur la nametag |
| `printNametag` | Si les check-ins à ce groupe impriment une nametag du tout |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité de salle et un interrupteur "fermé" dur, appliquée du côté du serveur par la porte de check-in (modifiée dans les paramètres du groupe de B1Admin sous "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Ratio enfants par bénévole et nombre minimum de bénévoles, appliqué selon le paramètre `ratioEnforcement` de l'église |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites d'admissibilité d'âge/grade évaluées du côté du kiosque pour mettre en surbrillance ou atténuer les salles |

Chaque client dénormalise de la même manière (par ex. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups` en parallèle, puis pour chaque heure de service collecter les groupes dont la ligne `groupServiceTimes` pointe vers celui-ci dans `serviceTime.groups`. Ce tableau est ce que le sélecteur de salle affiche, organisé par `categoryName` du groupe. Les assignations sont modifiées depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), et l'arborescence complète Campus → Service → Service Time → Group est visualisée dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Parce que les groupes sont la source unique de vérité, la même adhésion au groupe alimente le routage du kiosque, la présence de style roster sur les pages des groupes de B1Admin et les rapports de présence -- l'assignation d'un groupe à une heure de service est la seule étape nécessaire pour en faire une destination de check-in.
:::

## Sécurité des enfants

### Types de check-in

Chaque visite porte un `checkinType` -- `member`, `guest` ou `volunteer` (NULL signifie legacy/member ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **du côté du kiosque** : puces Member / Guest / Volunteer sur la ligne de membre étendue (`B1Checkin/src/components/MemberServiceTimes.tsx`), tamponné sur chaque visite en attente à la complétion (`app/checkinComplete.tsx`, par défaut à `member`). Le serveur le consomme à la porte -- les bénévoles comptent vers la couverture du ratio au lieu de compter contre la capacité et les invités comptent contre `guestCapacity`.

### Portes de capacité et de ratio de bénévoles

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute à l'intérieur de `postCheckin` avant toute sauvegarde (le point de terminaison est non-transactionnel, donc le gating-avant-save est le mécanisme de exactitude). Il charge l'occupation actuelle par groupe ciblé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe via la passerelle du module d'adhésion, puis classe les violations :

- **Dur (toujours bloquer) :** `checkinClosed`, `current + incoming > capacity`, le nombre d'invités dépasse `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- le kiosque affiche la salle nommée.
- **Ratio (avertir ou bloquer) :** les non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, pas de bénévoles du tout, ou `children > volunteers × volunteerRatio`. La gravité suit le paramètre par église `ratioEnforcement` (`"warn"` par défaut / `"block"`, modifié dans B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Le mode avertir retourne `409 { warning: true, error: "ratio", … }` sauf si le client le renvoie avec `acknowledgeWarnings=true` -- ce renvoi est l'override de confirmation du personnel du kiosque.

### Admissibilité d'âge/grade (côté kiosque)

L'admissibilité à la salle est une interface utilisateur consultative, évaluée sur le kiosque, pas appliquée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare l'anniversaire/grade d'une personne contre `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre des grades : PreK, K, 1–12, Graduated) et retourne `eligible` / `ineligible` / `unknown` -- les données manquantes donnent `unknown` et ne cachent jamais une salle. Les âges et les grades sont calculés à partir de la **date de promotion de grade** de l'église (`gradePromotionDate` paramètre, `"MM-DD"`, modifié dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; le kiosque l'obtient de `GET /attendance/checkin/settings`, et `resolveAsOfDate` choisit l'occurrence la plus récente sur ou avant aujourd'hui. Le sélecteur de salle met en surbrillance les salles admissibles et estompe les inadmissibles ; choisir une salle estompée nécessite une confirmation du personnel.

### Ramassage de confiance et non autorisé

Les personnes de ramassage sont une entité d'adhésion, par ménage : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD est `GET /membership/householdpickup/:householdId` (tout utilisateur authentifié de l'église, donc les kiosques peuvent le lire) plus `POST` / `DELETE` contrôlé par `people.edit`. Le personnel gère la liste sur la carte **Pickup** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) -- photo, relation et une puce de statut Trusted/Not Authorized.

À la déconnexion (`B1Checkin/app/checkout.tsx`) le kiosque charge la liste de ramassage du ménage : les entrées `trusted` s'affichent comme des cartes de ramassage exploitables aux côtés de la grille de photos d'adultes du ménage, et un nom "Autre" dactylographié libre est correspondance floue (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contre les entrées `notAuthorized` -- une correspondance bloque la déconnexion avec une feuille d'avertissement et un bouton de **Override** du personnel. L'override est enregistré sur la visite elle-même : il poste `checkedOutBy` comme `"OVERRIDE: {name}"` via le `POST /attendance/visits/checkout` normal, donc il s'attache à l'enregistrement de présence et au webhook `attendance.checkout` plutôt qu'une table d'audit séparée.

### Page-a-parent et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` -- `{ visitId, message }` : fait paginer les tuteurs d'un enfant enregistré (écran de déconnexion du kiosque, mode géré).
- `POST /broadcast` -- `{ serviceId, message }` : texte chaque adulte du ménage enregistré pour un service (paramètres administrateur du kiosque, derrière une feuille de confirmation de type `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du ménage via la passerelle d'adhésion, puis remettent la livraison à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- la porte entre modules dans le fournisseur de texte configuré de l'église (`@churchapps/texting` : TextInChurch, Clearstream ou MutualMinistry ; pas de senderus SMS intégré). La passerelle enregistre une ligne `sentText` plus les entrées `deliveryLog` par destinataire et vise un lot de 500 destinataires ; sans fournisseur configuré elle retourne `no_provider`, que le kiosque surface comme "No SMS provider configured". La `dispatch()` du contrôleur déduplique les numéros de téléphone et saute les personnes sans mobile ou avec `optedOut` défini, retournant `{ sent, failed, skippedOptedOut, skippedNoPhone }` pour que le kiosque puisse montrer ce qui a été sauté.

## Le kiosque (B1Checkin)

Les écrans sont des fichiers expo-router sous `B1Checkin/app/` ; l'état entre écrans vit dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), pas d'état React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- recherche par téléphone (`GET /membership/people/search/phone?number=`, dernier 4 ou complet) ou par nom (`GET /membership/people/search?term=`). La sélection d'une correspondance charge le ménage (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), ensemençant `pendingVisits` avec les sélections de la semaine précédente.
2. **Examen du ménage** (`app/household.tsx`, `src/components/MemberList.tsx`) -- chaque ligne de membre affiche un badge déjà enregistré, un badge d'allergie/`nametagNotes` et leurs puces de salle actuelle. Le développement d'un membre énumère chaque heure de service avec un bouton de salle plus les puces de type de check-in Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Sous chaque nom d'heure de service, `ServiceTimeHelper.getGroupSummary()` montre les groupes offerts là (les noms `serviceTime.groups`, rognés, dédupliqués insensibles à la casse, joints par des virgules) ; rien ne s'affiche quand le temps n'a pas de groupes.
3. **Assignation de groupe** (`app/selectGroup.tsx`) -- un arborescence de catégorie construit à partir de `serviceTime.groups`, avec les salles admissibles d'âge/grade mises en surbrillance et les inadmissibles estompées derrière une confirmation de personnel (voir [Admissibilité d'âge/grade](#agegrade-eligibility-kiosk-side)) ; choisir une salle écrit un `{ session: { serviceTimeId, groupId } }` visitSession dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). "None" le nettoie.
4. **Complet** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` avec `pendingVisits` (chacun tamponné avec son `checkinType`), puis imprime les étiquettes si une imprimante est configurée et retourne automatiquement à lookup. Une réponse de capacité `409` affiche la salle nommée pleine/fermée ; un avertissement de ratio offre une confirmation de personnel qui renvoie avec `acknowledgeWarnings=true`.

L'écran **check-out** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères via une entrée auto-focalisée -- donc les scanners de codes à barres USB/Bluetooth de type clavier-coin fonctionnent sans caméra -- ou un pavé numérique à l'écran utilisant le même alphabet, soumettant automatiquement à 4 caractères. Un bouton **Scan** ouvre une feuille avec la caméra `src/components/CodeScanner.tsx` partagée (arrière par défaut, acceptant QR, Code 128 et Code 39) pour que les stations sans un scanner de coin puissent lire l'étiquette de ramassage ; un code scanné alimente le même chemin `handleCode()` que l'entrée dactylographiée. Il recherche le code, affiche les enfants en cours de ramassage et présente le **personnes de ramassage de confiance** du ménage comme des cartes exploitables aux côtés d'une grille de photos d'adultes du ménage (plus une option libre "Autre" qui est floue-vérifiée contre les noms non autorisés -- voir [Ramassage de confiance et non autorisé](#trusted-and-not-authorized-pickup)), puis poste `POST /attendance/visits/checkout` avec le nom/l'id du ramasseur. En mode géré, l'écran offre également **Page a parent** (`POST /attendance/checkin/page`) et une **reprinting d'étiquette de sécurité** -- `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les alimente via le même pipeline `PrintUI` que le check-in.

La personnalité de la station est un drapeau AsyncStorage `@StationMode` (`"self"` | `"manned"`, bascule dans `app/adminSettings.tsx`). Le mode géré ajoute le point d'entrée de check-out sur l'écran de lookup et l'édition de profil par membre (`POST /membership/people`) à partir de l'écran du ménage. Le durcissement du kiosque est intégré : un PIN optionnel (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gère les écrans d'administrateur et d'imprimante, l'écran d'administrateur s'ouvre uniquement via 7 taps rapides sur le logo d'en-tête, et un écran d'attraction inactif (`src/hooks/useInactivityTimer.ts`) prend le relais entre les familles.

## Self check-in (B1App)

Les membres se connectent à partir du portail b1.church à l'écran `/mobile/checkin` (routé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Il nécessite un utilisateur connecté et marche les mêmes quatre étapes que le kiosque -- services → ménage → groupes → complet -- contre les points de terminaison identiques, avec l'état tenu dans `B1App/src/helpers/CheckinHelper.ts`. Les différences par rapport au kiosque : le ménage vient du `householdId` de l'utilisateur connecté (pas d'étape de recherche) et il n'y a pas d'impression d'étiquettes -- à la place l'écran d'achèvement affiche le code de sécurité du lot en tant que QR (`qrcode.react`) avec une indication "show this at a check-in station". Si le ménage est déjà enregistré quand la page charge, un bouton "Show check-in code" réaffiche le QR à partir de la première visite existante (de `GET /attendance/visits/checkin`) qui porte un `securityCode`. Le check-in est enregistré immédiatement au moment de la soumission (il n'y a pas d'état en attente) ; le QR alimente seulement l'impression d'étiquettes au kiosque.

**Impression d'étiquettes de téléphone à kiosque** (`B1Checkin/app/scan.tsx`, atteint à partir du bouton QR "Scan code" sur l'écran de lookup) : le kiosque affiche `CodeScanner` (une `expo-camera` `CameraView`, face avant par défaut, basculable) scanant pour les codes QR. `ScanCodeHelper.parse()` accepte une charge utile uniquement quand c'est un code à 4 caractères nu dans l'alphabet du code de sécurité, et `ScanCodeHelper.isRepeat()` ignore le même code pendant 4 secondes, donc à la fois le QR de B1App et l'étiquette imprimée du QR fonctionnent. L'écran suit alors le chemin de reprint de check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- et retourne à lookup. Aucune écriture de présence n'arrive au moment du scan ; étiquettes uniquement. Les codes sans visites actives, les stations sans imprimante et les groupes sans étiquettes surfacent chacun un toast et retournent à lookup.

Les types et `ApiHelper`/`ArrayHelper` viennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présence côté administrateur (B1Admin)

- **Configuration** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rend l'arborescence de structure et crée les services (`ServiceEdit.tsx`) et les heures de service (`ServiceTimeEdit.tsx`). Les données du campus viennent de l'adhésion via le hook `useCampuses()`.
- **La présence manuelle** vit du côté des groupes, pas de la section présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée les sessions (`POST /attendance/sessions` ; lors de l'ajout, `SessionEdit.tsx` peut inclure une session par autre groupe partageant l'heure de service choisie, ignorant les groupes qui ont déjà une session ce jour) et marque les personnes présentes via `POST /attendance/visitsessions/log`, qui trouve-ou-crée la visite pour cette personne et cette session. Les leaders de groupe peuvent enregistrer la présence de leurs propres groupes sans la permission `attendance.edit` -- les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapport** -- la tendance de présence et la présence du groupe sont les rapports définis par le serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contre ReportingApi ; les définitions dans `Api/reports/*.json`). Les deux prennent `startDate`/`endDate` (la date de fin inclusive) ; le rapport de tendance par défaut un an en arrière jusqu'à aujourd'hui et ajoute une colonne `sessionDates` par semaine, et la présence du groupe's à l'écran inclut `checkinTime` de chaque visite et le `membershipStatus` de la personne. Le CSV de présence du groupe vient du rapport compagnon `groupAttendanceDownload`, croisé par `GroupAttendanceDownloadHelper` en une ligne par membre du groupe avec une colonne présent/absent par session datée ; l'historique par personne est `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression d'étiquettes

### Modèles et le concepteur

Les églises conçoivent leurs propres étiquettes dans B1Admin à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, atteint à partir de la page des paramètres de Check-In). Un modèle est une ligne `labelTemplates` dont le `content` est un tableau JSON de blocs -- `text`, `field`, `barcode`, `qrcode` ou `box` -- chacun positionné en coordonnées pour cent avec la police, l'alignement, la symbologie (`code39`/`code128`/`qr`), et les conditions de visibilité optionnelles (par ex. ne rendre la boîte d'allergie que quand `person.nametagNotes` n'est pas vide). Deux `labelType`s existent : `nametag` (une par personne enregistrée ; des champs comme `person.displayName`, `sessions`, `securityCode` et `person.isBirthdayWeek` -- `"true"` quand l'anniversaire's mois/jour est dans 3 jours d'aujourd'hui, s'enroulant à travers la fin de l'année, calculé par `LabelHelper.isBirthdayWithin()`) et `pickup` (une par famille ; des champs comme `children`, `childrenAllergies`). Le serveur applique une seule valeur par défaut par type par église (`LabelTemplateController.save`). Le concepteur expédie les modèles de démarrage en miroir les étiquettes intégrées du kiosque et prévisualisé contre les données d'exemple.

### Rendu et impression sur le kiosque

À la complétion du check-in, `B1Checkin/src/helpers/LabelHelper.ts` décide quoi imprimer à partir des drapeaux de groupe sur chaque visite en attente : nametags pour les groupes `printNametag`, plus une étiquette de ramassage familial si une visite a touché un groupe `parentPickup`. Les visites avec `checkinType` `volunteer` sont ignorées par `LabelHelper.selectChildVisits()`, donc un travailleur de garde d'enfants dans une salle de ramassage parental ne déclenche jamais une étiquette de ramassage. Si l'église a des modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs + un contexte de champ dans un document HTML autonome ; sinon les étiquettes HTML intégrées dans `B1Checkin/assets/labels/` sont utilisées avec la substitution de l'espace réservé.

Les codes à barres sont générés en tant que SVG en ligne par des encodeurs TypeScript pur dans `B1Checkin/src/helpers/barcode.ts` -- tableaux de motif Code 39 et tableaux de largeur Code 128 (ensemble de code B avec somme de contrôle mod-103), plus QR via le paquet `qrcode`. **Ces encodeurs sont intentionnellement dupliqués dans B1Admin** (`LabelEditor.tsx` en ligne les mêmes tableaux, noté dans un commentaire de code) donc les aperçus du concepteur sont pixel-fidèles à la sortie du kiosque ; un changement à un doit être miroir dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans une `WebView`, la capture en JPG via `react-native-view-shot`, et remet les URIs d'image au module natif **printer-helper** Expo (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()` et les événements d'état, avec un fournisseur par marque sur les deux plates-formes :

| Marque | Android | iOS | Notes |
|--------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau QL-series (QL-800/810W/820NWB/1100/1110NWB…), étiquettes de découpe 29×90, le défaut recommandé |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression ZPL image TCP |

La sélection de l'imprimante vit à `app/printers.tsx` (le scan réseau retourne des entrées `brand~model~ip` ; le choix persiste à AsyncStorage), et `src/helpers/PrinterLog.ts` tient un journal de diagnostic sur l'appareil exposé via un point d'état actif dans l'en-tête du kiosque.

## Enregistrement des invités

Deux chemins créent une personne à mi-check-in :

- **Au kiosque** -- l'écran du ménage "Add guest" ouvre `B1Checkin/app/addGuest.tsx`, qui d'abord recherche `GET /membership/people/search?term=` pour une correspondance non-membre existante et crée autrement un avec `POST /membership/people`, attaché au ménage actuel. L'invité suit alors l'assignation de groupe comme tout membre.
- **Self-serve via QR** -- quand le paramètre de l'église `enableQRGuestRegistration` est activé (configuré dans les paramètres de Check-In de B1Admin, lire de `GET /membership/settings/public/{churchId}`), l'écran de lookup du kiosque affiche un code QR liant à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) laisse une famille visitante s'enregistrer elle-même sur son propre téléphone via le point de terminaison anonyme `POST /membership/people/guest-register`, gardant la ligne du kiosque en mouvement. La feuille QR a également un bouton **Register here** qui ouvre la même page sur le kiosque (`app/guestRegister.tsx`) dans une `WebView` incognito, cache-disabled ; `src/helpers/GuestRegisterHelper.ts` construit l'URL pour à la fois le QR et la WebView et bloque la navigation hors `https://{subdomain}.b1.church/guest-register`. L'écran revient au lookup sur **Done**, retour ou 120 secondes d'inactivité (la frappe de formulaire est relayée à partir de la WebView en tant qu'activité), démontant la WebView pour que les entrées d'une famille ne atteignent jamais la suivante.

## Pages connexes

- [Points de terminaison de présence](../api/endpoints/attendance) -- Surface REST complète pour campus, services, sessions, visites et sessions de visite
- [Points de terminaison d'adhésion](../api/endpoints/membership) -- Personnes, ménages et groupes
- [Webhooks](../api/webhooks) -- Les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure des modules](../api/module-structure) -- Comment le module de présence est organisé du côté serveur
