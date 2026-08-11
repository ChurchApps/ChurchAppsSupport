---
title: "Enregistrements"
---

# Enregistrements

<div class="article-intro">

L'enregistrement est un système avec trois portes d'accès : l'application de borne B1Checkin pour les stations en personnel et libre-service, l'enregistrement automatique à l'intérieur du portail des membres B1App et la participation d'administateur dans B1Admin. Les trois écrivent au même module d'assistance dans l'Api principal, et le routage des salles de classe est entièrement conduit par Groupes -- il n'existe pas d'entité « emplacements » ou « salles » séparée. Une couche de sécurité des enfants se situe au-dessus : types d'enregistrement par visite, portes de capacité et de ratio de bénévoles côté serveur, admissibilité d'âge/grade côté borne, vérification de retrait de confiance au départ et appel des parents sur le fournisseur de textos de l'église. Cette page mappe le modèle de données, les flux d'enregistrement, la couche de sécurité et le pipeline d'impression d'étiquettes.

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

Chemin d'impression des étiquettes (borne uniquement) :
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Surface | Repo | Pile | Rôle |
|---------|------|------|------|
| Borne | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, and iOS; OTA updates via `expo-updates` | Station en personnel ou libre-service avec impression d'étiquettes et retrait vérifié |
| Enregistrement automatique | `B1App` | Next.js (portail des membres b1.church) | Les membres connectés enregistrent leur ménage depuis un téléphone ; pas d'impression |
| Admin | `B1Admin` | React SPA | Configure la structure du service, assigne les groupes aux heures de service, crée des étiquettes, enregistre la participation manuelle, exécute des rapports |

Les trois appellent les deux mêmes modules API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, ménages et groupes ; **AttendanceApi** (`/attendance`) pour tout le reste.

## Modèle de données (`Api/src/modules/attendance`)

| Entité / table | Champs clés | Signification |
|----------------|-----------|---------|
| `campuses` | name, address | Abandonnée ici -- les campus sont maîtrisés dans le module d'adhésion (`/membership/campuses`) ; la copie de participation est gelée en lecture seule pour les lecteurs hérités (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par ex. « Dimanche matin » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Un créneau horaire dans un service, par ex. « 9h00 » (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jointure : quels groupes (salles de classe) se réunissent à quelles heures de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe en une seule date -- créée paresseusement au moment de l'enregistrement (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne assistant à une date (`models/Visit.ts`). `checkinType` est `member` / `guest` / `volunteer` (NULL = legacy member), défini par la borne et consommé par les portes de capacité/ratio |
| `visitSessions` | visitId, sessionId | Quelle(s) session(s) une visite couvre -- un enfant enregistré à deux heures de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Mises en page d'étiquettes concevables (`models/LabelTemplate.ts`) |

### Comment un enregistrement complété est persistant

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gère `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant `visitSessions` dont la paire `session` intégrée ne nomme qu'une `(serviceTimeId, groupId)`. Le serveur alors :

1. **Portes de capacité et de ratios de portes avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie la capacité de chaque salle ciblée, la capacité des invités, le drapeau fermé et le ratio de bénévoles par rapport à l'occupation actuelle. postCheckin n'est **pas transactionnel**, donc la porte doit s'exécuter avant la première sauvegarde -- une violation grave retourne un 409 nommant la salle(s) contrevenante et rien n'est persisté. Voir [Portes de capacité et de ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Sessions résolues paresseusement.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, today)` -- les IDs de session sont mis en cache en processus par date. Les nouvelles sessions émettent un webhook `session.created`. La boucle est un `for..of` attendu -- un `forEach(async …)` plus tôt et feu et oublie qui a couru la sauvegarde et a écrit NULL sessionIds lors de la création de la première session (corrigé; noté dans un commentaire de code à la boucle).
3. **Remplace les enregistrements du jour.** Toutes les visites existantes pour ces personnes à ce service aujourd'hui sont supprimées avec leurs visitSessions, puis l'ensemble soumis est sauvegardé. Le réenregistrement d'une famille est donc une opération idempotente « c'est l'état actuel », non un ajout. Passer `?checkDuplicates=true` à la place retourne `{ duplicates: [personId…] }` sans écriture, c'est ainsi que la borne avertit avant de réécrire.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code de 4 caractères de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (pas de voyelles ou de caractères ambigus, donc les codes ne peuvent pas épeler des mots ou mal lire). Le serveur réessaie sur la collision contre les mêmes visites ouvertes du même jour de la même église et tamponne le code sur chaque visite du lot.
5. **Retourne `{ streaks, securityCode }`.** `streaks` mappe personId au décompte de présence de semaines consécutives ; la borne célèbre les jalons (toutes les 5ème semaines) avec des confettis.

Chaque visite enregistrée émet également un webhook `attendance.recorded`. Le côté lecture, `GET /attendance/visits/checkin`, retourne les visites des personnes à partir de leur **dernière date enregistrée** -- si c'était une semaine précédente, les IDs sont supprimés, donc le client reçoit une copie préremplie des sélections de salle de la semaine dernière qui seront enregistrées comme des enregistrements nouveaux.

### Retrait

Deux points d'extrémité complètent la boucle (`VisitController`) :

- `GET /attendance/visits/code/:code` -- Visites d'aujourd'hui pas encore retirées portant ce code de sécurité, avec sessions remplies.
- `POST /attendance/visits/checkout` -- corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; tampons `checkoutTime` et qui a pris en charge, et émet un webhook `attendance.checkout` par visite.

Permissions : les bornes s'authentifient avec `attendance.checkin`, qui accorde exactement la surface d'enregistrement/retrait/modèle d'étiquette ; `attendance.view`/`attendance.edit` couvrent les rapports et les entrées manuelles ; la structure (services, heures de service, affectations de groupe) nécessite `services.edit`. L'auto-enregistrement des membres (B1App) n'a besoin d'aucune permission : tout utilisateur authentifié avec une personne liée à l'église peut appeler `GET`/`POST /attendance/visits/checkin`, et le serveur restreint les `personId`s soumis au propre ménage de l'appelant (403 autrement -- cette clôture est ce qui garde les codes de sécurité des autres familles illisibles). L'adhésion est la subvention ; que les membres *voient* la fonctionnalité est contrôlé par les onglets de navigation B1App de l'église. Les autres points d'extrémité d'enregistrement (`code/:code`, `checkout`, `guardians`, `CheckinController`) restent réservés à la borne/personnel.

## Les groupes pilotent le routage des salles

Il n'existe aucune entité room ou classroom n'importe où dans le système. Une « salle » est un **groupe** d'adhésion avec `trackAttendance` activé, lié à une ou plusieurs heures de service via `groupServiceTimes`. Les champs de groupe (sur `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement de la borne :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe à la participation du tout ; l'arbre de configuration de B1Admin signale `trackAttendance` groupes sans ligne `groupServiceTimes` comme non affectés |
| `parentPickup` | Marque une salle d'enfants : l'enregistrement à cela rend la visite une visite « enfant », qui imprime une étiquette de retrait de famille et met le code de sécurité sur l'étiquette de nom |
| `printNametag` | Si les enregistrements à ce groupe impriment une étiquette de nom à tout |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité de la salle et un interrupteur « fermé » dur, appliqués côté serveur par la porte d'enregistrement (modifiés dans les paramètres de groupe B1Admin sous « Capacité d'enregistrement ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants-par-bénévole et nombre de bénévoles minimum, appliqués par le paramètre `ratioEnforcement` d'église |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites d'admissibilité d'âge/classe évaluées côté borne pour mettre en surbrillance ou atténuer les salles |

Chaque client dénormalise de la même manière (par ex. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups` en parallèle, puis pour chaque heure de service collecter les groupes dont la ligne `groupServiceTimes` le pointent dans `serviceTime.groups`. Ce tableau est ce que le sélecteur de salle affiche, organisé par groupe `categoryName`.

Les affectations sont modifiées à partir de la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), et l'arbre entier Campus → Service → Service Time → Group est visualisé dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Parce que les groupes sont la source unique de vérité, la même adhésion au groupe alimente le routage de la borne, la présence de style roster dans les pages de groupe de B1Admin et les rapports de participation -- affecter un groupe à une heure de service est l'unique étape nécessaire pour en faire une destination d'enregistrement.
:::

## Sécurité des enfants

### Types de vérification

Chaque visite porte un `checkinType` -- `member`, `guest` ou `volunteer` (NULL signifie legacy/member ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté borne** : Chips membre / invité / bénévole sur la ligne de membre étendue (`B1Checkin/src/components/MemberServiceTimes.tsx`), tamponnée sur chaque visite en attente à l'achèvement (`app/checkinComplete.tsx`, défaut à `member`). Le serveur le consomme à la porte -- les bénévoles comptent vers la couverture du ratio plutôt que contre la capacité, et les invités comptent contre `guestCapacity`.

### Portes de capacité et de ratio de bénévoles

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute à l'intérieur de `postCheckin` avant toute sauvegarde (le point d'extrémité n'est pas transactionnel, donc les portes avant sauvegarde est le mécanisme de correction). Il charge l'occupation actuelle par groupe ciblé (`VisitRepo.countActiveByGroupToday`) et la config de groupe via la passerelle du module d'adhésion, puis classe les violations :

- **Difficile (toujours bloquer) :** `checkinClosed`, `current + incoming > capacity`, nombre d'invités supérieur à `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- la borne affiche la salle nommée.
- **Ratio (avertir ou bloquer) :** non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, pas de bénévoles du tout, ou `children > volunteers × volunteerRatio`. La sévérité suit le paramètre par église `ratioEnforcement` (`"warn"` défaut / `"block"`, édité dans B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Le mode d'avertissement retourne `409 { warning: true, error: "ratio", … }` à moins que le client ne renvoie avec `acknowledgeWarnings=true` -- ce renvoi est la confirmation du personnel de la borne.

### Admissibilité d'âge/classe (côté borne)

L'admissibilité à la salle est une interface utilisateur consultatif, évaluée sur la borne, non appliquée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance/classe d'une personne contre les `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre du grade : PreK, K, 1–12, Graduated) et retourne `eligible` / `ineligible` / `unknown` -- les données manquantes céder `unknown` et ne jamais masquer une salle. Les âges et les grades sont calculés au **moment de la date de promotion de grade de l'église** (`gradePromotionDate` paramètre, `"MM-DD"`, édité dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; la borne l'obtient de `GET /attendance/checkin/settings`, et `resolveAsOfDate` choisit la plus récente occurrence sur ou avant aujourd'hui. Le sélecteur de salle met en surbrillance les salles éligibles et atténue les salles inéligibles ; sélectionner une salle atténuée nécessite une confirmation du personnel.

### Retrait fiable et non autorisé

Les personnes de récupération sont une entité d'adhésion, par ménage : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId optionnel, nom, photoUrl, relation, statut `trusted` / `notAuthorized`, notes). CRUD est `GET /membership/householdpickup/:householdId` (tout utilisateur d'église authentifié, de sorte que les bornes peuvent le lire) plus `POST` / `DELETE` gated par `people.edit`. Le personnel gère la liste sur la carte **Retrait** de la page des personnes (`B1Admin/src/people/components/PickupPeople.tsx`) -- photo, relation et une puce de statut fiable/non autorisée.

Au retrait (`B1Checkin/app/checkout.tsx`), la borne charge la liste de retrait du ménage : les entrées `trusted` rendent comme des cartes de retrait frappables à côté de la grille de photos pour adultes du ménage, et un nom librement tapé « Autre » est floue-marché (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contre les entrées `notAuthorized` -- une correspondance bloque le retrait avec une feuille d'avertissement et un bouton **Remplacer** du personnel. Le remplacement est enregistré sur la visite elle-même : il poste `checkedOutBy` comme `"OVERRIDE: {name}"` via le `POST /attendance/visits/checkout` normal, donc il atterrit dans l'enregistrement de participation et le webhook `attendance.checkout` plutôt qu'un tableau d'audit séparé.

### Appel d'un parent et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points d'extrémité SMS :

- `POST /page` -- `{ visitId, message }` : appelle les tuteurs d'un enfant enregistré (écran de retrait de borne, mode en personnel).
- `POST /broadcast` -- `{ serviceId, message }` : texte chaque ménage enregistré adultes pour un service (paramètres d'admin de borne, derrière un type-`EMERGENCY` confirmation feuille dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du ménage via la passerelle d'adhésion, puis remettre la livraison à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- la porte entre modules dans le fournisseur de textos configuré de l'église (`@churchapps/texting` : TextInChurch, Clearstream, ou MutualMinistry ; il n'existe pas d'expéditeur SMS intégré). La passerelle enregistre une ligne `sentText` plus des entrées `deliveryLog` par destinataire et limite un lot à 500 destinataires ; sans fournisseur configuré, elle retourne `no_provider`, que la borne surfaces comme « Aucun fournisseur SMS configuré ». Le `dispatch()` du contrôleur déduplique les numéros de téléphone et saute les personnes sans mobile ou `optedOut` défini, retournant `{ sent, failed, skippedOptedOut, skippedNoPhone }` de sorte que la borne peut afficher ce qui a été sauté.

## La borne (B1Checkin)

Les écrans sont des fichiers expo-router sous `B1Checkin/app/` ; l'état entre écrans vit dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), non l'état React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- recherche par téléphone (`GET /membership/people/search/phone?number=`, derniers 4 ou pleins) ou par nom (`GET /membership/people/search?term=`). La sélection d'une correspondance charge le ménage (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), ensemencement de `pendingVisits` avec les sélections de la semaine dernière.
2. **Vérification du ménage** (`app/household.tsx`, `src/components/MemberList.tsx`) -- chaque ligne de membre affiche un badge déjà enregistré, un badge allergie/`nametagNotes` et leurs puces de salle actuelles. L'expansion d'un membre énumère chaque heure de service avec un bouton de salle plus les puces de type d'enregistrement Membre / Invité / Bénévole (`MemberServiceTimes.tsx`).
3. **Affectation de groupe** (`app/selectGroup.tsx`) -- un arbre de catégories construit à partir de `serviceTime.groups`, avec les salles éligibles d'âge/classe mises en surbrillance et les salles inéligibles atténuées derrière une confirmation du personnel (voir [Admissibilité d'âge/classe](#agegrade-eligibility-kiosk-side)) ; sélectionner une salle écrit un `{ session: { serviceTimeId, groupId } }` visitSession dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). « Aucun » l'efface.
4. **Compléter** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` avec `pendingVisits` (chaque tamponné avec son `checkinType`), puis imprime des étiquettes si une imprimante est configurée et revient automatiquement à lookup. Une réponse `409` de capacité affiche la salle pleine/fermée nommée ; un avertissement de ratio offre une confirmation du personnel qui renvoie avec `acknowledgeWarnings=true`.

L'écran **de retrait** (`app/checkout.tsx`) accepte le code de sécurité de 4 caractères via une entrée avec focus automatique -- de sorte que les lecteurs de codes à barres USB/Bluetooth fonctionnent sans caméra -- ou un pavé numérique à l'écran utilisant le même alphabet, soumis automatiquement à 4 caractères. Il cherche le code, affiche les enfants qui sont retirés et présente les **personnes de retrait fiables** du ménage sous forme de cartes exploitables à côté d'une grille de photos pour adultes du ménage (plus une option gratuite « Autre » qui est floue-vérifiée contre les noms non autorisés -- voir [Retrait fiable et non autorisé](#trusted-and-not-authorized-pickup)), puis poste `POST /attendance/visits/checkout` avec le nom/l'ID du sélectionneur. En mode en personnel, l'écran offre également **Appelez un parent** (`POST /attendance/checkin/page`) et une **réimpression d'étiquette de sécurité** -- `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les nourrit via le même pipeline `PrintUI` qu'à l'enregistrement.

La personnalité de la station est un indicateur AsyncStorage `@StationMode` (`"self"` | `"manned"`, commuté dans `app/adminSettings.tsx`). Le mode en personnel ajoute le point d'entrée de retrait sur l'écran de lookup et l'édition de profil par membre (`POST /membership/people`) à partir de l'écran de ménage. Le durcissement de la borne est construit : un code NIP optionnel (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ordonne les écrans admin et imprimante, l'écran admin ne s'ouvre que via 7 appuis rapides sur le logo d'en-tête et un écran d'attrait inactif (`src/hooks/useInactivityTimer.ts`) prend le relais entre les familles.

## Auto-enregistrement (B1App)

Les membres s'enregistrent à partir du portail b1.church à l'écran `/mobile/checkin` (routed par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` à `screens/CheckinPage.tsx`). Cela nécessite un utilisateur connecté et suit les mêmes quatre étapes que la borne -- services → ménage → groupes → complet -- contre les points d'extrémité identiques, avec l'état tenu dans `B1App/src/helpers/CheckinHelper.ts`. Les différences de la borne : le ménage vient de la `householdId` de l'utilisateur connecté (pas d'étape de recherche), et il n'y a pas d'impression d'étiquettes -- à la place, l'écran d'achèvement affiche le code de sécurité du lot en tant que code QR (`qrcode.react`) avec un indice « afficher cela à une station d'enregistrement ». Si le ménage est déjà enregistré quand la page se charge, un bouton « Afficher le code d'enregistrement » réaffiche le QR du code de sécurité de la visite existante. L'enregistrement est enregistré immédiatement au moment de la soumission (il n'y a pas d'état en attente) ; le QR pilote uniquement l'impression d'étiquettes à la borne.

**Impression d'étiquettes téléphone-à-borne** (`B1Checkin/app/scan.tsx`, accédé à partir du bouton « Analyser le code » sur l'écran de lookup) : la borne ouvre un `expo-camera` `CameraView` (face avant par défaut, retournable) analysant les codes QR. Une charge utile analysée est acceptée lorsqu'elle est un code de 4 caractères nu dans l'alphabet du code de sécurité, afin que le code QR B1App et les blocs QR d'étiquette imprimées fonctionnent. L'écran suit alors le chemin de réimpression de retrait -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- et revient à lookup. Aucune écriture de participation ne se produit au moment du scan ; étiquettes uniquement. Les codes sans visites actives, les stations sans imprimante et les groupes sans étiquettes chacun remontent un toast et retournent à lookup.

Les types et `ApiHelper`/`ArrayHelper` viennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Participation côté admin (B1Admin)

- **Configuration** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rend l'arbre de structure et crée des services (`ServiceEdit.tsx`) et des heures de service (`ServiceTimeEdit.tsx`). Les données de campus viennent de l'adhésion via le hook `useCampuses()`.
- **La participation manuelle** vit du côté Groupes, pas du côté participation : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée des sessions (`POST /attendance/sessions`) et marque les personnes présentes via `POST /attendance/visitsessions/log`, ce qui trouve ou crée la visite pour cette personne et cette session. Les chefs de groupe peuvent enregistrer la participation pour leurs propres groupes sans la permission `attendance.edit` -- les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapport** -- participation tendance et participation au groupe sont des rapports définis par serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contre ReportingApi) ; l'historique par personne est `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression d'étiquettes

### Modèles et le concepteur

Les églises conçoivent leurs propres étiquettes dans B1Admin à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accédé à partir de la page des paramètres d'enregistrement). Un modèle est une ligne `labelTemplates` dont le `content` est un tableau JSON de blocs -- `text`, `field`, `barcode`, `qrcode` ou `box` -- chacun positionné en coordonnées de pourcentage avec police, alignement, symbologie (`code39`/`code128`/`qr`) et conditions de visibilité optionnelles (par ex. rendre uniquement la boîte d'allergie quand `person.nametagNotes` est non-vide). Deux `labelType`s existent : `nametag` (un par personne enregistrée ; champs comme `person.displayName`, `sessions`, `securityCode`) et `pickup` (un par famille ; champs comme `children`, `childrenAllergies`). Le serveur applique un seul par défaut par type par église (`LabelTemplateController.save`). Le concepteur expédie les modèles de démarrage miroir aux étiquettes regroupées de la borne et les aperçus contre les données d'exemple.

### Rendu et impression sur la borne

À l'achèvement de l'enregistrement, `B1Checkin/src/helpers/LabelHelper.ts` décide ce qu'il faut imprimer à partir des drapeaux de groupe sur chaque visite en attente : les étiquettes de nom pour les groupes `printNametag`, plus une étiquette de retrait de famille si une visite a frappé un groupe `parentPickup`. Le code de sécurité de la réponse d'enregistrement va sur les étiquettes de nom des enfants et l'étiquette de retrait ; les étiquettes de nom des adultes impriment sans code. Si l'église a des modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs + un contexte de champ en un document HTML autonome ; sinon les étiquettes HTML regroupées dans `B1Checkin/assets/labels/` sont utilisées avec remplacement de placeholder.

Les codes à barres sont générés en SVG en ligne par des encodeurs TypeScript purs dans `B1Checkin/src/helpers/barcode.ts` -- Tableaux de motifs Code 39 et Code 128 (ensemble de codes B avec somme de contrôle mod-103) tableaux de largeur, plus code QR via le package `qrcode`. **Ces encodeurs sont intentionnellement dupliqués dans B1Admin** (`LabelEditor.tsx` insère les mêmes tables, noté dans un commentaire de code) pour que les aperçus du concepteur soient fidèles au pixel à la sortie de la borne ; un changement à l'un doit être reflété dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans un `WebView`, la capture en JPG via `react-native-view-shot` et remet les URI d'image au **module Expo printer-helper** natif (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()` et les événements de statut, avec un fournisseur par marque sur les deux plates-formes :

| Marque | Android | iOS | Notes |
|-------|---------|-----|-------|
| Frère | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau série QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes découpées 29×90, le défaut recommandé |
| Zèbre | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression image TCP/ZPL |

La sélection d'imprimante vit à `app/printers.tsx` (l'analyse réseau retourne les entrées `brand~model~ip` ; le choix persiste à AsyncStorage), et `src/helpers/PrinterLog.ts` conserve un journal de diagnostic sur appareil remontéé à travers un point de statut actif dans l'en-tête de la borne.

## Enregistrement des invités

Deux chemins créent une personne pendant l'enregistrement :

- **À la borne** -- l'écran du ménage « Ajouter un invité » ouvre `B1Checkin/app/addGuest.tsx`, qui recherche d'abord `GET /membership/people/search?term=` une correspondance non-membre existante et sinon en crée une avec `POST /membership/people`, attachée au ménage actuel. L'invité circule ensuite via l'affectation de groupe comme n'importe quel membre.
- **Libre-service via code QR** -- quand le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres d'enregistrement de B1Admin, lu depuis `GET /membership/settings/public/{churchId}`), l'écran de lookup de la borne affiche un code QR reliant à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille visitante de s'enregistrer eux-mêmes sur leur propre téléphone via le point d'extrémité anonyme `POST /membership/people/guest-register`, gardant la ligne de la borne en mouvement.

## Pages connexes

- [Points d'extrémité d'assistance](../api/endpoints/attendance) -- Surface REST complète pour les campus, les services, les sessions, les visites et les sessions de visite
- [Points d'extrémité des membres](../api/endpoints/membership) -- Personnes, ménages et groupes
- [Webhooks](../api/webhooks) -- Les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure du module](../api/module-structure) -- Comment le module d'assistance est organisé côté serveur
