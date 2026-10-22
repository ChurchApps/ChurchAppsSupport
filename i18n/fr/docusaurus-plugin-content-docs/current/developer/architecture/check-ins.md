---
title: "Pointage"
---

# Pointage {#check-ins}

<div class="article-intro">

Le pointage est un seul système avec trois points d'entrée : l'application borne B1Checkin pour les postes avec personnel et en libre-service, le pointage autonome dans le portail des membres B1App, et la présence côté administration dans B1Admin. Les trois écrivent dans le même module de présence de l'API principale, et l'affectation aux salles de classe est entièrement pilotée par les groupes — il n'existe aucune entité distincte « emplacements » ou « salles ». Une couche de sécurité pour les enfants s'ajoute par-dessus : types de pointage par visite, contrôles de capacité et de ratio bénévoles côté serveur, admissibilité selon l'âge et le niveau côté borne, vérification des personnes autorisées à récupérer l'enfant au moment de la sortie, et messagerie aux parents via le fournisseur de SMS de l'église. Cette page décrit le modèle de données, les parcours de pointage, la couche de sécurité et le processus d'impression des étiquettes.

</div>

## Vue d'ensemble {#overview}

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

| Surface | Dépôt | Stack | Rôle |
|---------|------|-------|------|
| Borne | `B1Checkin` | Expo / React Native, routage de fichiers expo-router ; builds EAS pour Android, Amazon Fire et iOS ; mises à jour OTA via `expo-updates` | Poste avec personnel ou en libre-service, avec impression d'étiquettes et sortie vérifiée |
| Pointage autonome | `B1App` | Next.js (portail des membres b1.church) | Les membres connectés enregistrent leur foyer depuis un téléphone ; aucune impression |
| Administration | `B1Admin` | SPA React | Configure la structure des services, affecte les groupes aux horaires de service, conçoit les étiquettes, consigne la présence manuelle et produit les rapports |

Les trois surfaces appellent les deux mêmes modules de l'API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, les foyers et les groupes ; **AttendanceApi** (`/attendance`) pour tout le reste de cette page.

## Modèle de données (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| Entité / table | Champs clés | Signification |
|----------------|-----------|---------|
| `campuses` | name, address | Obsolète ici — les campus sont gérés dans le module membership (`/membership/campuses`) ; la copie de présence est figée en lecture seule pour les anciens lecteurs (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par ex. « Culte du dimanche matin » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un créneau au sein d'un service, par ex. « 9h00 » (`models/ServiceTime.ts`). Les colonnes d'horaire sont facultatives (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) et déterminent la [fenêtre de pointage](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jointure : quels groupes (salles de classe) se réunissent à quels créneaux de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date donnée — créée à la demande au moment du pointage (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne présente à une date donnée (`models/Visit.ts`). `checkinType` vaut `member` / `guest` / `volunteer` (NULL = ancien membre), défini par la borne et utilisé par les contrôles de capacité et de ratio |
| `visitSessions` | visitId, sessionId | Les sessions couvertes par une visite — un enfant pointé à deux créneaux de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquettes personnalisables (`models/LabelTemplate.ts`) |

### Enregistrement d'un pointage terminé

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) traite `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant des `visitSessions` dont la `session` intégrée ne nomme qu'un couple `(serviceTimeId, groupId)`. Le serveur effectue ensuite les opérations suivantes :

1. **Contrôle de la capacité et des ratios avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie, pour chaque salle ciblée, la capacité, la capacité d'invités, l'indicateur de fermeture et le ratio bénévoles par rapport à l'occupation actuelle. postCheckin **n'est pas transactionnel** : le contrôle doit donc s'exécuter avant la première sauvegarde. Une violation bloquante renvoie un 409 nommant la ou les salles concernées, et rien n'est enregistré. Voir [Contrôles de capacité et de ratio bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résolution paresseuse des sessions.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, aujourd'hui)` ; les identifiants de session sont mis en cache en mémoire par date. Les nouvelles sessions émettent un webhook `session.created`. La boucle est un `for..of` avec `await` — un ancien `forEach(async …)` sans attente entrait en concurrence avec la sauvegarde et écrivait des sessionId NULL lors de la création de la première session (corrigé ; une note de code l'indique à la boucle).
3. **Remplacement des enregistrements du jour.** Les visites existantes de ces personnes pour ce service aujourd'hui sont supprimées avec leurs visitSessions, puis l'ensemble soumis est sauvegardé. Un nouveau pointage d'une famille est donc une opération idempotente « voici l'état actuel », et non un ajout. Passer `?checkDuplicates=true` renvoie à la place `{ duplicates: [personId…] }` sans rien écrire ; c'est ainsi que la borne prévient avant d'écraser des données.
4. **Génération d'un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code de 4 caractères à partir de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (sans voyelles ni caractères ambigus, pour que les codes ne forment pas de mots et ne soient pas mal lus). Le serveur relance la génération en cas de collision avec les visites ouvertes du même jour pour la même église, et appose le code sur chaque visite du lot.
5. **Renvoie `{ streaks, securityCode }`.** `streaks` associe à chaque personId le nombre de semaines consécutives de présence ; la borne célèbre les jalons (toutes les 5 semaines) par des confettis.

Chaque visite enregistrée émet aussi un webhook `attendance.recorded`. Côté lecture, `GET /attendance/visits/checkin` renvoie les visites des personnes à partir de leur **dernière date enregistrée** — si celle-ci date d'une semaine précédente, les identifiants sont retirés, de sorte que le client reçoit une copie pré-remplie des choix de salles de la semaine passée, qui seront enregistrés comme de nouveaux enregistrements.

### Sortie

Deux points de terminaison complètent le cycle (`VisitController`) :

- `GET /attendance/visits/code/:code` — les visites du jour, non encore sorties, portant ce code de sécurité, avec les sessions renseignées.
- `POST /attendance/visits/checkout` — corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; renseigne `checkoutTime` et la personne qui a récupéré l'enfant, et émet un webhook `attendance.checkout` par visite.

Permissions : les bornes s'authentifient avec `attendance.checkin`, qui accorde exactement l'accès au pointage, à la sortie et aux modèles d'étiquettes ; `attendance.view` et `attendance.edit` couvrent les rapports et la saisie manuelle ; la structure (services, créneaux, affectations de groupes) exige `services.edit`. Le pointage autonome d'un membre (B1App) ne nécessite aucune permission : tout utilisateur authentifié ayant une personne liée dans l'église peut appeler `GET`/`POST /attendance/visits/checkin`, et le serveur limite les `personId` soumis au foyer de l'appelant (403 sinon) — c'est cette barrière qui empêche de lire les `securityCode` des autres familles. L'appartenance vaut autorisation ; la visibilité de la fonctionnalité pour les membres est contrôlée par les onglets de navigation de B1App de l'église. Les autres points de terminaison de pointage (`code/:code`, `checkout`, `guardians`, `CheckinController`) restent réservés aux bornes et au personnel.

## Les groupes pilotent l'affectation aux salles {#groups-drive-room-routing}

Il n'existe aucune entité salle ou classe dans tout le système. Une « salle » est un **groupe** de membership avec `trackAttendance` activé, lié à un ou plusieurs créneaux de service via `groupServiceTimes`. Les champs du groupe (dans `Api/src/modules/membership/models/Group.ts`) qui déterminent le comportement de la borne :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe au suivi de présence ; l'arborescence de configuration de B1Admin signale comme non affectés les groupes `trackAttendance` sans ligne `groupServiceTimes` |
| `parentPickup` | Marque une salle d'enfants : pointer dans cette salle fait de la visite une visite « enfant », qui imprime une étiquette de récupération familiale et place le code de sécurité sur le badge |
| `printNametag` | Indique si les pointages dans ce groupe impriment un badge nominatif |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité de la salle et interrupteur « fermé », appliqués côté serveur par le contrôle de pointage (modifiables dans les paramètres de groupe de B1Admin, sous « Check-In Capacity ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants par bénévole et effectif minimal de bénévoles, appliqués selon le paramètre à l'échelle de l'église `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Bornes d'admissibilité selon l'âge et le niveau, évaluées côté borne pour mettre en évidence ou estomper les salles |

Chaque client dénormalise les données de la même façon (par ex. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger en parallèle `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups`, puis, pour chaque créneau de service, rassembler dans `serviceTime.groups` les groupes dont la ligne `groupServiceTimes` pointe vers ce créneau. Ce tableau est celui qu'affiche le sélecteur de salle, organisé par `categoryName` du groupe.

Les affectations se modifient depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), et l'arborescence complète Campus → Service → Créneau → Groupe est représentée dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Comme les groupes sont la source unique de vérité, la même appartenance à un groupe alimente le routage des bornes, la présence de type liste d'appel sur les pages de groupes de B1Admin et les rapports de présence. Affecter un groupe à un créneau de service est la seule étape nécessaire pour en faire une destination de pointage.
:::

## Sécurité des enfants {#child-safety}

### Types de pointage {#check-in-types}

Chaque visite porte un `checkinType` — `member`, `guest` ou `volunteer` (NULL signifie ancien enregistrement / membre ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté borne** : des pastilles Membre / Invité / Bénévole sur la ligne du membre développée (`B1Checkin/src/components/MemberServiceTimes.tsx`), attribuées à chaque visite en attente lors de la finalisation (`app/checkinComplete.tsx`, valeur par défaut `member`). Le serveur l'utilise dans le contrôle : les bénévoles comptent dans la couverture du ratio au lieu de compter contre la capacité, et les invités comptent contre `guestCapacity`.

### Contrôles de capacité et de ratio bénévoles {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute dans `postCheckin` avant toute sauvegarde (le point de terminaison n'est pas transactionnel, donc le contrôle avant sauvegarde est le mécanisme qui garantit la justesse). Il charge l'occupation actuelle de chaque groupe visé (`VisitRepo.countActiveByGroupToday`) ainsi que la configuration du groupe via la passerelle du module membership, puis classe les violations :

- **Bloquante (toujours refusée) :** `checkinClosed`, `current + incoming > capacity`, nombre d'invités supérieur à `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — la borne affiche la salle concernée.
- **Ratio (avertissement ou blocage) :** les non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, sans aucun bénévole, ou lorsque `children > volunteers × volunteerRatio`. La gravité suit le paramètre par église `ratioEnforcement` (`"warn"` par défaut / `"block"`, modifiable dans B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). En mode avertissement, la réponse est `409 { warning: true, error: "ratio", … }`, sauf si le client renvoie la demande avec `acknowledgeWarnings=true` — cette nouvelle soumission est la confirmation du personnel sur la borne.

### Fenêtres de pointage planifiées {#scheduled-check-in-windows}

Un créneau de service peut porter un horaire hebdomadaire facultatif (`dayOfWeek` de 0 à 6, avec 0 = dimanche ; `startTime`/`endTime` au format `HH:mm` ; `checkinOpenMinutes`, `checkinCloseMinutes`), modifiable dans le formulaire de créneau **Attendance → Setup** de B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, « Check-in Schedule »). `CheckinGateHelper.hasSchedule()` considère un créneau comme planifié seulement lorsque `dayOfWeek` et `startTime` sont tous deux définis ; les créneaux non planifiés ne sont jamais limités dans le temps. `isServiceTimeOpen()` calcule la fenêtre en heure locale (`DateHelper.toChurchTime`). Le fuseau horaire est résolu pour chaque créneau par `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) : le `timezone` du campus du service (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) est prioritaire, puis le `timeZone` de l'église (défini dans Church Information de B1Admin), puis le premier campus non supprimé ayant un `timezone` (`loadCampusTimeZone`), et seulement ensuite `America/New_York`. Le campus passe en premier parce que la plupart des églises avaient `America/New_York` rétroactivement défini comme fuseau de l'église. Les chemins de liste et d'enregistrement ci-dessous résolvent le fuseau de la même façon. La fenêtre s'étend de `checkinOpenMinutes` avant le début à `checkinCloseMinutes` après la fin (ou après le début s'il n'y a pas de fin), en gérant les fenêtres qui franchissent minuit ou la limite de la semaine.

La fenêtre est appliquée à deux endroits :

- **Liste :** `GET /attendance/servicetimes` ajoute à chaque ligne un booléen calculé `checkinOpen`. Le pointage autonome de B1App (`CheckinPage.tsx`) et le sélecteur de service de B1Checkin (`app/services.tsx`) conservent tous les créneaux. Lorsque tous les créneaux d'un service sont fermés, ils affichent la prochaine ouverture (« Check-in opens Sun 9:30 AM. » dans B1App, « Check-in for this service opens Sun 9:30 AM. » dans B1Checkin, à partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), avec le message de repli « Check-in isn't open for this service right now. » lorsqu'aucune ouverture ne peut être calculée (la borne propose un bouton Retour pour choisir un autre service). Sinon, les créneaux fermés apparaissent sous forme de ligne « Closed » / « Closed · opens 9:30 AM » non sélectionnable. L'écran de foyer de B1Checkin (`MemberServiceTimes.tsx`) réévalue l'ouverture en direct, avec l'horloge de l'appareil, grâce à `ServiceTimeHelper.isCheckinOpen()` (fuseau horaire de l'appareil, et non celui de l'église) : une borne laissée en marche s'ouvre et se ferme à l'heure, et affiche « Kids Room 1 · Checked in » (nom du groupe) sur un créneau fermé auquel la personne est déjà rattachée.
- **Enregistrement :** dans `evaluateGates()`, avant l'évaluation de capacité et de ratio, `findClosedServiceTimeGroups()` rejette le lot avec `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si le créneau de service d'une session visée se trouve hors de sa fenêtre. Comme les visites existantes d'un foyer pour aujourd'hui sont renvoyées à chaque pointage, les sessions déjà détenues par la personne (`personId|sessionId` dans les visites existantes) ne passent pas ce contrôle : ajouter un créneau ultérieur ouvert n'est donc pas refusé parce qu'une fenêtre antérieure s'est fermée. B1Checkin affiche ce cas sur son écran de contrôle bloquant avec le motif « check-in isn't open right now » (les violations de capacité affichent toujours « room is full or closed »).

### Admissibilité selon l'âge et le niveau (côté borne) {#agegrade-eligibility-kiosk-side}

L'admissibilité aux salles relève de l'interface indicative, évaluée sur la borne et non imposée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance et le niveau scolaire d'une personne aux bornes `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre des niveaux : PreK, K, 1–12, Graduated) et renvoie `eligible` / `ineligible` / `unknown` — une donnée manquante donne `unknown` et ne masque jamais une salle. L'âge et le niveau sont calculés à la **date de passage au niveau supérieur** de l'église (paramètre `gradePromotionDate`, au format `"MM-DD"`, modifiable dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; la borne le récupère via `GET /attendance/checkin/settings`, et `resolveAsOfDate` retient la plus récente occurrence à la date du jour ou antérieure. Le sélecteur de salles met en évidence les salles admissibles et estompe les salles non admissibles ; choisir une salle estompée exige une confirmation du personnel.

### Personnes autorisées et non autorisées à récupérer l'enfant {#trusted-and-not-authorized-pickup}

Les personnes autorisées à récupérer un enfant sont une entité du module membership, par foyer : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId facultatif, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). La gestion CRUD passe par `GET /membership/householdpickup/:householdId` (tout utilisateur authentifié de l'église, afin que les bornes puissent le lire) ainsi que par `POST` / `DELETE` soumis à `people.edit`. Le personnel gère la liste dans la carte **Pickup** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, lien de parenté et une pastille de statut Trusted / Not Authorized.

À la sortie (`B1Checkin/app/checkout.tsx`), la borne charge la liste des personnes autorisées du foyer : les entrées `trusted` s'affichent sous forme de cartes cliquables aux côtés de la grille de photos des adultes du foyer, et un nom saisi librement sous « Other » est comparé par approximation (distance de Levenshtein, `src/helpers/PickupMatchHelper.ts`) aux entrées `notAuthorized` — une correspondance bloque la sortie avec une feuille d'avertissement et un bouton **Override** réservé au personnel. La dérogation est consignée sur la visite elle-même : elle envoie `checkedOutBy` sous la forme `"OVERRIDE: {name}"` par le biais du `POST /attendance/visits/checkout` habituel, de sorte qu'elle figure dans le registre de présence et dans le webhook `attendance.checkout`, et non dans une table d'audit distincte.

### Messagerie aux parents et diffusion d'urgence {#page-a-parent-and-emergency-broadcast}

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` — `{ visitId, message }` : envoie un message aux parents d'un enfant pointé (écran de sortie de la borne, en mode avec personnel).
- `POST /broadcast` — `{ serviceId, message }` : envoie un SMS aux adultes de chaque foyer pointé pour un service (paramètres administrateur de la borne, derrière une feuille de confirmation qui exige de saisir `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes des foyers via la passerelle membership, puis confient l'envoi à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porte inter-modules vers le fournisseur de SMS configuré par l'église (`@churchapps/texting` : TextInChurch, Clearstream ou MutualMinistry ; il n'existe aucun expéditeur SMS intégré). La passerelle consigne une ligne `sentText` ainsi que des entrées `deliveryLog` par destinataire, et limite un lot à 500 destinataires ; sans fournisseur configuré, elle renvoie `no_provider`, que la borne affiche sous la forme « No SMS provider configured ». La méthode `dispatch()` du contrôleur dédoublonne les numéros de téléphone et ignore les personnes sans mobile ou ayant `optedOut` défini, et renvoie `{ sent, failed, skippedOptedOut, skippedNoPhone }` afin que la borne puisse indiquer ce qui a été ignoré.

## La borne (B1Checkin) {#the-kiosk-b1checkin}

Les écrans sont des fichiers expo-router situés dans `B1Checkin/app/` ; l'état partagé entre écrans réside dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), et non dans l'état React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Recherche** (`app/lookup.tsx`) — recherche par téléphone (`GET /membership/people/search/phone?number=`, quatre derniers chiffres ou numéro complet) ou par nom (`GET /membership/people/search?term=`). La sélection d'une correspondance charge le foyer (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), et pré-remplit `pendingVisits` avec les choix de la semaine passée.
2. **Revue du foyer** (`app/household.tsx`, `src/components/MemberList.tsx`) — chaque ligne de membre affiche un badge « déjà pointé », un badge allergie / `nametagNotes` et les pastilles de salle en cours. Développer un membre liste chaque créneau de service avec un bouton de salle, ainsi que les pastilles de type de pointage Membre / Invité / Bénévole (`MemberServiceTimes.tsx`). Sous le nom de chaque créneau, `ServiceTimeHelper.getGroupSummary()` affiche les groupes proposés à ce créneau (les noms de `serviceTime.groups`, épurés, dédoublonnés sans tenir compte de la casse, séparés par des virgules) ; rien ne s'affiche lorsque le créneau n'a aucun groupe.
3. **Affectation au groupe** (`app/selectGroup.tsx`) — une arborescence par catégorie construite à partir de `serviceTime.groups`, où les salles admissibles selon l'âge et le niveau sont mises en évidence et les salles non admissibles estompées derrière une confirmation du personnel (voir [Admissibilité selon l'âge et le niveau](#agegrade-eligibility-kiosk-side)) ; choisir une salle inscrit une visitSession `{ session: { serviceTimeId, groupId } }` dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). « None » la vide.
4. **Terminer** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` avec `pendingVisits` (chacune portant son `checkinType`), puis impression des étiquettes si une imprimante est configurée, et retour automatique à lookup. Une réponse `409` pour capacité ou `notOpen` affiche la salle concernée avec le motif (complète ou fermée, ou pointage non ouvert) ; un avertissement de ratio propose une confirmation du personnel qui renvoie la demande avec `acknowledgeWarnings=true`.

L'écran de **sortie** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères via un champ à focus automatique — de sorte que les lecteurs de codes-barres USB ou Bluetooth en mode clavier fonctionnent sans caméra — ou un pavé numérique à l'écran utilisant le même alphabet, avec envoi automatique à 4 caractères. Un bouton **Scan** ouvre une feuille contenant la caméra partagée `src/components/CodeScanner.tsx` (orientée vers l'arrière par défaut, acceptant QR, Code 128 et Code 39), afin que les postes sans lecteur en mode clavier puissent lire l'étiquette de récupération ; un code scanné emprunte le même chemin `handleCode()` que la saisie manuelle. L'écran recherche le code, affiche les enfants en cours de récupération, présente les **personnes autorisées** du foyer sous forme de cartes cliquables aux côtés d'une grille de photos des adultes du foyer (ainsi qu'une option « Other » en texte libre, vérifiée par approximation contre les noms non autorisés — voir [Personnes autorisées et non autorisées](#trusted-and-not-authorized-pickup)), puis envoie `POST /attendance/visits/checkout` avec le nom et l'identifiant choisis. En mode avec personnel, l'écran propose aussi **Page a parent** (`POST /attendance/checkin/page`) et une **réimpression de l'étiquette de sécurité** — `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les envoie par le même pipeline `PrintUI` que le pointage.

Le mode de la borne est un indicateur AsyncStorage `@StationMode` (`"self"` | `"manned"`, basculé dans `app/adminSettings.tsx`). Le mode avec personnel ajoute le point d'entrée de sortie sur l'écran de recherche et la modification du profil de chaque personne (`POST /membership/people`) depuis l'écran du foyer. Le durcissement de la borne est intégré : un code PIN facultatif (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protège les écrans d'administration et d'imprimante, l'écran d'administration ne s'ouvre qu'après 7 appuis rapides sur le logo de l'en-tête, et un écran d'accueil d'inactivité (`src/hooks/useInactivityTimer.ts`) prend le relais entre deux familles.

## Pointage autonome (B1App) {#self-check-in-b1app}

Les membres pointent depuis le portail b1.church, à l'écran `/mobile/checkin` (routé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Il exige un utilisateur connecté et suit les mêmes quatre étapes que la borne — services → foyer → groupes → terminer — avec les mêmes points de terminaison, et l'état est conservé dans `B1App/src/helpers/CheckinHelper.ts`. Les différences avec la borne : le foyer provient du `householdId` de l'utilisateur connecté (aucune étape de recherche), et il n'y a aucune impression d'étiquettes — à la place, l'écran de fin affiche le code de sécurité du lot sous forme de QR (`qrcode.react`) avec l'indication « show this at a check-in station ». Si le foyer est déjà pointé au chargement de la page, un bouton « Show check-in code » réaffiche le QR à partir de la première visite existante (issue de `GET /attendance/visits/checkin`) qui porte un `securityCode`. Le pointage est enregistré immédiatement à la soumission (il n'existe aucun état en attente) ; le QR ne sert qu'à imprimer les étiquettes sur la borne.

**Impression des étiquettes depuis le téléphone vers la borne** (`B1Checkin/app/scan.tsx`, accessible depuis le bouton « Scan code » du QR sur l'écran de recherche) : la borne affiche `CodeScanner` (un `CameraView` d'`expo-camera`, orienté vers l'avant par défaut, avec possibilité de changer de caméra) qui recherche des QR. `ScanCodeHelper.parse()` n'accepte une charge utile que s'il s'agit d'un code nu de 4 caractères de l'alphabet des codes de sécurité, et `ScanCodeHelper.isRepeat()` ignore le même code pendant 4 secondes ; ainsi, le QR de B1App comme le bloc QR d'une étiquette imprimée fonctionnent. L'écran suit ensuite le chemin de réimpression de la sortie — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — puis revient à la recherche. Aucune écriture de présence n'a lieu au moment du scan : impression d'étiquettes uniquement. Les codes sans visite active, les postes sans imprimante et les groupes sans étiquette affichent chacun un message éphémère et ramènent à la recherche.

Les types et `ApiHelper` / `ArrayHelper` proviennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présence côté administration (B1Admin) {#admin-side-attendance-b1admin}

- **Configuration** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) affiche l'arborescence de la structure et permet de créer des services (`ServiceEdit.tsx`) et des créneaux de service (`ServiceTimeEdit.tsx`). Les données de campus proviennent du membership via le hook `useCampuses()`.
- **La présence manuelle** se trouve dans la section Groupes, et non dans la section Présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée des sessions (`POST /attendance/sessions` ; lors de l'ajout, `SessionEdit.tsx` peut inclure une session pour chaque autre groupe partageant le créneau choisi, en sautant les groupes qui ont déjà une session à cette date) et marque les personnes présentes via `POST /attendance/visitsessions/log`, qui trouve ou crée la visite de cette personne pour cette session. Les responsables de groupe peuvent consigner la présence de leurs propres groupes sans la permission `attendance.edit` — les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapports** — les rapports de tendance de présence et de présence par groupe sont définis côté serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` s'appuie sur ReportingApi ; les définitions se trouvent dans `Api/reports/*.json`). Les deux acceptent `startDate`/`endDate` (date de fin incluse) ; le rapport de tendance couvre par défaut la période allant d'il y a un an à aujourd'hui et ajoute une colonne `sessionDates` par semaine, et l'arborescence affichée du rapport de présence par groupe inclut le `checkinTime` de chaque visite et le `membershipStatus` de la personne. Le CSV de présence par groupe provient du rapport compagnon `groupAttendanceDownload`, pivoté par `GroupAttendanceDownloadHelper` en une ligne par membre du groupe, avec une colonne présent/absent par session datée ; l'historique par personne est fourni par `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression des étiquettes {#label-printing}

### Modèles et éditeur {#templates-and-the-designer}

Les églises conçoivent leurs propres étiquettes dans B1Admin, à l'adresse `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accessible depuis la page des paramètres de pointage). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs — `text`, `field`, `barcode`, `qrcode` ou `box` — chacun positionné en coordonnées de pourcentage, avec police, alignement, symbologie (`code39`/`code128`/`qr`) et conditions d'affichage facultatives (par ex. n'afficher la case d'allergie que lorsque `person.nametagNotes` n'est pas vide). Deux `labelType` existent : `nametag` (une par personne pointée ; champs tels que `person.displayName`, `sessions`, `securityCode` et `person.isBirthdayWeek` — `"true"` lorsque le mois et le jour de l'anniversaire sont à 3 jours ou moins d'aujourd'hui, en passant d'une fin d'année à l'autre, calculé par `LabelHelper.isBirthdayWithin()`) et `pickup` (une par famille ; champs tels que `children`, `childrenAllergies`). Le serveur n'autorise qu'un modèle par défaut et par type dans chaque église (`LabelTemplateController.save`). L'éditeur fournit des modèles de départ reprenant les étiquettes intégrées de la borne et permet de prévisualiser avec des données d'exemple.

### Rendu et impression sur la borne {#rendering-and-printing-on-the-kiosk}

À la fin du pointage, `B1Checkin/src/helpers/LabelHelper.ts` détermine ce qu'il faut imprimer à partir des indicateurs de groupe de chaque visite en attente : des badges nominatifs pour les groupes `printNametag`, et une étiquette de récupération familiale unique si une visite a atteint un groupe `parentPickup`. Les visites dont le `checkinType` est `volunteer` sont ignorées par `LabelHelper.selectChildVisits()`, de sorte qu'un bénévole de la garde d'enfants dans une salle Parent Pickup ne déclenche jamais d'étiquette de récupération. Le code de sécurité issu de la réponse de pointage est placé sur les badges des enfants et sur l'étiquette de récupération ; les badges des adultes s'impriment sans code. Si l'église dispose de modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs et un contexte de champs en un document HTML autonome ; sinon, les étiquettes HTML intégrées de `B1Checkin/assets/labels/` sont utilisées avec remplacement des espaces réservés.

Les codes-barres sont générés en SVG intégré par des encodeurs en TypeScript pur, dans `B1Checkin/src/helpers/barcode.ts` — tables de motifs Code 39 et tables de largeurs Code 128 (jeu de caractères B avec somme de contrôle modulo 103), ainsi que le QR via le paquet `qrcode`. **Ces encodeurs sont volontairement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, comme l'indique un commentaire de code) afin que les aperçus de l'éditeur reproduisent fidèlement la sortie de la borne ; toute modification de l'un doit être reportée dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans un `WebView`, la capture en JPG avec `react-native-view-shot`, et transmet les URI des images au module Expo natif **printer-helper** (`B1Checkin/modules/printer-helper/`). Ce module expose `scan()`, `checkInit()`, `printUris()` et des événements de statut, avec un fournisseur par marque sur les deux plateformes :

| Marque | Android | iOS | Remarques |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK d'impression Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau de la gamme QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes prédécoupées de 29×90, la valeur par défaut recommandée |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression d'images TCP/ZPL |

La sélection de l'imprimante se trouve dans `app/printers.tsx` (la recherche réseau renvoie des entrées `brand~model~ip` ; le choix est conservé dans AsyncStorage), et `src/helpers/PrinterLog.ts` conserve un journal de diagnostic sur l'appareil, visible via un point de statut en direct dans l'en-tête de la borne.

## Inscription d'invités {#guest-registration}

Deux parcours créent une personne en cours de pointage :

- **À la borne** — le bouton « Add guest » de l'écran du foyer ouvre `B1Checkin/app/addGuest.tsx`, qui recherche d'abord `GET /membership/people/search?term=` une correspondance existante hors membres, et sinon crée la personne avec `POST /membership/people`, rattachée au foyer en cours. L'invité passe ensuite par l'affectation aux groupes comme n'importe quel membre.
- **En libre-service par QR** — lorsque le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres de pointage de B1Admin, lu via `GET /membership/settings/public/{churchId}`), l'écran de recherche de la borne affiche un QR code menant à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille de visite de s'inscrire depuis son propre téléphone via le point de terminaison anonyme `POST /membership/people/guest-register`, ce qui évite de ralentir la file à la borne. La feuille du QR contient aussi un bouton **Register here** qui ouvre la même page sur la borne (`app/guestRegister.tsx`) dans un `WebView` en mode navigation privée et sans cache ; `src/helpers/GuestRegisterHelper.ts` construit l'URL pour le QR comme pour le WebView, et bloque la navigation vers toute adresse en dehors de `https://{subdomain}.b1.church/guest-register`. L'écran revient à la recherche avec **Done**, avec le bouton retour, ou après 120 secondes d'inactivité (la saisie dans le formulaire est transmise du WebView comme activité), et démonte le WebView afin que les saisies d'une famille n'atteignent jamais la suivante.

## Pages connexes {#related-pages}

- [Points de terminaison Attendance](../api/endpoints/attendance) -- API REST complète pour les campus, services, sessions, visites et visitSessions
- [Points de terminaison Membership](../api/endpoints/membership) -- Personnes, foyers et groupes
- [Webhooks](../api/webhooks) -- Les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure du module](../api/module-structure) -- Organisation côté serveur du module de présence
