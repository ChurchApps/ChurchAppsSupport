---
title: "Pointages"
description: "Fonctionnement du pointage dans B1Checkin, B1App et B1 Admin : modèle de données de présence, groupes comme salles, limites de capacité et règles de sécurité à la reprise des enfants."
---

# Pointages {#check-ins}

<div class="article-intro">

Le pointage est un système unique accessible par trois portes d'entrée : l'application-borne B1Checkin pour les postes avec ou sans personnel, le pointage autonome dans le portail des membres B1App, et la présence côté administration dans B1Admin. Les trois écrivent dans le même module de présence de l'Api principale, et l'acheminement vers les salles de classe est entièrement piloté par les groupes -- il n'existe aucune entité distincte de « lieux » ou de « salles ». Une couche de sécurité pour les enfants s'ajoute par-dessus : types de pointage par visite, contrôles de capacité et de ratio de bénévoles côté serveur, admissibilité selon l'âge ou le niveau côté borne, vérification du ramassage de confiance au départ, et avis aux parents via le fournisseur de messages texte de l'église. Cette page décrit le modèle de données, les flux de pointage, la couche de sécurité et le processus d'impression des étiquettes.

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

| Surface | Dépôt | Pile technique | Rôle |
|---------|-------|------|------|
| Borne | `B1Checkin` | Expo / React Native, routage de fichiers expo-router ; builds EAS pour Android, Amazon Fire et iOS ; mises à jour OTA via `expo-updates` | Poste avec ou sans personnel, avec impression d'étiquettes et départ vérifié |
| Pointage autonome | `B1App` | Next.js (portail des membres b1.church) | Les membres connectés pointent leur foyer depuis un téléphone ; aucune impression |
| Administration | `B1Admin` | SPA React | Configure la structure des services, affecte les groupes aux horaires de service, conçoit les étiquettes, enregistre la présence manuelle, produit les rapports |

Les trois appellent les deux mêmes modules de l'API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, les foyers et les groupes ; **AttendanceApi** (`/attendance`) pour tout le reste ci-dessous.

## Modèle de données (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| Entité / table | Champs clés | Signification |
|----------------|-----------|---------|
| `campuses` | name, address | Obsolète ici -- les campus sont gérés dans le module membership (`/membership/campuses`) ; la copie du module de présence est figée en lecture seule pour les anciens lecteurs (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par exemple « Culte du dimanche » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un créneau horaire à l'intérieur d'un service, par exemple « 9 h 00 » (`models/ServiceTime.ts`). Les colonnes de calendrier sont facultatives (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) et déterminent la [fenêtre de pointage](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jonction : quels groupes (salles de classe) se réunissent à quels horaires de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date donnée -- créée paresseusement au moment du pointage (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne présente à une date donnée (`models/Visit.ts`). `checkinType` vaut `member` / `guest` / `volunteer` (NULL = membre historique), défini par la borne et exploité par les contrôles de capacité et de ratio |
| `visitSessions` | visitId, sessionId | Les sessions couvertes par une visite -- un enfant pointé à deux horaires de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquettes personnalisables (`models/LabelTemplate.ts`) |

### Comment un pointage terminé est enregistré {#how-a-completed-check-in-is-persisted}

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) traite `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant des `visitSessions` dont la `session` intégrée ne nomme qu'un couple `(serviceTimeId, groupId)`. Le serveur procède alors ainsi :

1. **Contrôle la capacité et les ratios avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie, pour chaque salle visée, la capacité, la capacité d'accueil des visiteurs, l'indicateur de fermeture et le ratio de bénévoles par rapport à l'occupation actuelle. postCheckin n'est **pas transactionnel** : le contrôle doit donc s'exécuter avant la première sauvegarde. Une violation bloquante renvoie un 409 qui nomme la ou les salles concernées, et rien n'est enregistré. Voir [Contrôles de capacité et de ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les sessions paresseusement.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, aujourd'hui)` ; les identifiants de session sont mis en cache en mémoire par date. Les nouvelles sessions émettent un webhook `session.created`. La boucle est un `for..of` avec `await` : une version antérieure, un `forEach(async …)` sans attente, entrait en concurrence avec la sauvegarde et écrivait des `sessionId` NULL lors de la création de la première session (corrigé ; une note dans le code signale cette boucle).
3. **Remplace les enregistrements du jour.** Toutes les visites existantes de ces personnes à ce service aujourd'hui sont supprimées avec leurs visitSessions, puis l'ensemble soumis est enregistré. Un nouveau pointage d'une famille est donc une opération idempotente « voici l'état actuel », et non un ajout. Passer `?checkDuplicates=true` renvoie plutôt `{ duplicates: [personId…] }` sans rien écrire ; c'est ainsi que la borne prévient avant d'écraser.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code de 4 caractères à partir de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (sans voyelles ni caractères ambigus, pour que les codes ne forment pas de mots et ne soient pas mal lus). Le serveur recommence en cas de collision avec les visites ouvertes du même jour de la même église, et appose le code sur chaque visite du lot.
5. **Renvoie `{ streaks, securityCode }`.** `streaks` associe à chaque personId le nombre de semaines consécutives de présence ; la borne célèbre les jalons (toutes les 5 semaines) avec des confettis.

Chaque visite enregistrée émet aussi un webhook `attendance.recorded`. La lecture, `GET /attendance/visits/checkin`, renvoie les visites des personnes à partir de leur **dernière date enregistrée** : si celle-ci correspond à une semaine précédente, les identifiants sont retirés, si bien que le client reçoit une copie préremplie des choix de salles de la semaine dernière, qui seront enregistrés comme de nouveaux enregistrements.

### Départ {#check-out}

Trois points de terminaison complètent le cycle (`VisitController`) :

- `GET /attendance/visits/code/:code` -- les visites du jour, non encore sorties, portant ce code de sécurité, avec leurs sessions remplies.
- `GET /attendance/visits/active?peopleIds=` -- les visites du jour, non encore sorties, des personnes listées (quel que soit le code de sécurité), avec leurs sessions remplies ; 400 lorsque `peopleIds` est vide. Alimente le départ par nom.
- `POST /attendance/visits/checkout` -- corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; renseigne `checkoutTime` et la personne qui a récupéré l'enfant, et émet un webhook `attendance.checkout` par visite.

Autorisations : les bornes s'authentifient avec `attendance.checkin`, qui accorde exactement la surface de pointage, de départ et de modèles d'étiquettes, ainsi que les recherches de foyer dont une borne a besoin sans `people.view` (recherche par téléphone ou par nom, membres du foyer dans le modèle de pointage, et liste des personnes autorisées à récupérer les enfants). `SessionHelper.filterChurches` de B1Checkin ne propose que les églises où le compte détient `Attendance/Checkin` ou `Attendance/Edit`. `Checkin` ne fait plus partie des autorisations « Everyone » (rôle nul) (`RoleHelper` et la migration `2026-11-01_remove_everyone_checkin`) ; elle doit donc être accordée par un vrai rôle. `attendance.view` et `attendance.edit` couvrent les rapports et la saisie manuelle ; la structure (services, horaires de service, affectations de groupes) exige `services.edit`. Le pointage autonome d'un membre (B1App) n'exige aucune autorisation : tout utilisateur authentifié disposant d'une personne liée dans l'église peut appeler `GET`/`POST /attendance/visits/checkin`, et le serveur limite les `personId` soumis au foyer de l'appelant (403 sinon) -- cette barrière empêche de lire les `securityCode` des autres familles. L'appartenance est l'autorisation ; le fait que les membres *voient* la fonction est contrôlé par les onglets de navigation B1App de l'église. Les autres points de terminaison de pointage (`code/:code`, `active`, `checkout`, `guardians`, `CheckinController`) restent réservés aux bornes et au personnel.

## Les groupes pilotent l'acheminement vers les salles {#groups-drive-room-routing}

Il n'existe nulle part dans le système d'entité « salle » ou « classe ». Une « salle » est un **groupe** du module membership dont `trackAttendance` est activé, relié à un ou plusieurs horaires de service par `groupServiceTimes`. Les champs du groupe (dans `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement de la borne :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe au suivi de présence ; l'arborescence de configuration de B1Admin signale comme non affectés les groupes `trackAttendance` sans ligne `groupServiceTimes` |
| `parentPickup` | Marque une salle d'enfants : pointer vers elle fait de la visite une visite « enfant », qui imprime une étiquette de récupération familiale et place le code de sécurité sur le badge |
| `printNametag` | Indique si les pointages vers ce groupe impriment un badge nominatif |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité des salles et interrupteur « fermé » strict, appliqués côté serveur par le contrôle de pointage (modifiés dans les paramètres de groupe de B1Admin, sous « Capacité de pointage ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants par bénévole et effectif minimum de bénévoles, appliqués selon le paramètre `ratioEnforcement` de l'église |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Bornes d'admissibilité selon l'âge et le niveau, évaluées côté borne pour mettre en évidence ou estomper les salles |

Chaque client procède de la même façon (par exemple `B1Checkin/app/services.tsx` et `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : il charge en parallèle `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups`, puis, pour chaque horaire de service, collecte dans `serviceTime.groups` les groupes dont une ligne `groupServiceTimes` pointe vers cet horaire. Ce tableau alimente le sélecteur de salles, organisé par `categoryName` du groupe.

Les affectations se modifient depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), et l'arborescence complète Campus → Service → Horaire de service → Groupe est représentée dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Comme les groupes sont l'unique source de vérité, la même appartenance à un groupe alimente l'acheminement à la borne, la présence de type liste dans les pages de groupe de B1Admin et les rapports de présence. Affecter un groupe à un horaire de service est la seule étape nécessaire pour en faire une destination de pointage.
:::

## Sécurité des enfants {#child-safety}

### Types de pointage {#check-in-types}

Chaque visite porte un `checkinType` : `member`, `guest` ou `volunteer` (NULL signifie historique/membre ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté borne** : les puces Membre / Visiteur / Bénévole sur la ligne développée du membre (`B1Checkin/src/components/MemberServiceTimes.tsx`), et apposé sur chaque visite en attente lors de la validation (`app/checkinComplete.tsx`, `member` par défaut). Le serveur l'exploite dans le contrôle : les bénévoles comptent pour la couverture du ratio au lieu d'être comptés contre la capacité, et les visiteurs comptent contre `guestCapacity`.

### Contrôles de capacité et de ratio de bénévoles {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute dans `postCheckin` avant toute sauvegarde (le point de terminaison n'est pas transactionnel ; le contrôle avant sauvegarde est donc le mécanisme garantissant la justesse). Il charge l'occupation actuelle de chaque groupe visé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe via la passerelle du module membership, puis classe les violations :

- **Bloquantes (toujours refusées) :** `checkinClosed`, `current + incoming > capacity`, nombre de visiteurs supérieur à `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- la borne affiche la salle concernée.
- **Ratio (avertissement ou blocage) :** des non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, sans aucun bénévole, ou `children > volunteers × volunteerRatio`. La gravité suit le paramètre d'église `ratioEnforcement` (`"warn"` par défaut, ou `"block"`, modifiable dans B1Admin, Gérer l'église → Pointage, `CheckinSettingsEdit.tsx`). En mode avertissement, la réponse est `409 { warning: true, error: "ratio", … }`, sauf si le client renvoie la requête avec `acknowledgeWarnings=true` : cette nouvelle soumission est la dérogation confirmée par le personnel à la borne.

### Fenêtres de pointage planifiées {#scheduled-check-in-windows}

Un horaire de service peut comporter un calendrier hebdomadaire facultatif (`dayOfWeek` de 0 à 6, 0 étant le dimanche ; `startTime` et `endTime` au format `HH:mm` ; `checkinOpenMinutes` ; `checkinCloseMinutes`), modifiable dans le formulaire de l'horaire de service de B1Admin, sous **Présence → Configuration** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, « Check-in Schedule »). `CheckinGateHelper.hasSchedule()` ne considère un horaire de service comme planifié que si `dayOfWeek` et `startTime` sont tous deux renseignés ; les horaires non planifiés ne sont jamais limités dans le temps. `isServiceTimeOpen()` calcule la fenêtre en heure murale locale (`DateHelper.toChurchTime`). Le fuseau horaire est résolu pour chaque horaire de service par `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) : le `timezone` du campus du service (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) est prioritaire, puis le `timeZone` de l'église (défini dans les informations de l'église de B1Admin), puis le premier campus non supprimé ayant un `timezone` (`loadCampusTimeZone`), et seulement ensuite `America/New_York`. Le campus passe en premier parce que de nombreuses églises avaient `America/New_York` reporté comme fuseau de l'église. La liste et les chemins de publication ci-dessous résolvent le fuseau de la même façon. La fenêtre court de `checkinOpenMinutes` avant le début à `checkinCloseMinutes` après la fin (ou après le début s'il n'y a pas de fin), et gère les fenêtres qui traversent minuit ou la frontière de la semaine.

La fenêtre est appliquée à deux endroits :

- **Liste :** `GET /attendance/servicetimes` renseigne chaque ligne avec un booléen calculé `checkinOpen`. Le pointage autonome de B1App (`CheckinPage.tsx`) et le sélecteur de service de B1Checkin (`app/services.tsx`) conservent tous les horaires. Lorsque tous les horaires d'un service sont fermés, ils affichent la prochaine ouverture (« Check-in opens Sun 9:30 AM. » dans B1App, « Check-in for this service opens Sun 9:30 AM. » dans B1Checkin, à partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), avec repli sur « Check-in isn't open for this service right now. » lorsqu'aucune ouverture ne peut être calculée (la borne propose alors un bouton Retour pour choisir un autre service). Sinon, les horaires fermés s'affichent sous forme de ligne « Closed » / « Closed · opens 9:30 AM » non sélectionnable. L'écran du foyer de B1Checkin (`MemberServiceTimes.tsx`) réévalue l'ouverture en direct sur l'horloge de l'appareil avec `ServiceTimeHelper.isCheckinOpen()` (fuseau horaire de l'appareil, et non celui de l'église), afin qu'une borne laissée allumée s'ouvre et se ferme à l'heure ; et affiche « Kids Room 1 · Checked in » (nom du groupe) sur un horaire fermé que la personne détient déjà.
- **Publication :** dans `evaluateGates()`, avant l'évaluation de capacité et de ratio, `findClosedServiceTimeGroups()` rejette le lot avec `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si l'horaire de service d'une session visée est hors de sa fenêtre. Comme les visites existantes d'un foyer pour aujourd'hui sont renvoyées à chaque pointage, les sessions que la personne détient déjà (`personId|sessionId` dans les visites existantes) ne passent pas ce contrôle : ajouter un horaire de service ultérieur ouvert n'est donc pas refusé parce qu'une fenêtre précédente s'est fermée. B1Checkin affiche ce cas sur son écran de contrôle bloquant avec le motif « check-in isn't open right now » (les violations de capacité affichent toujours « room is full or closed »).

### Admissibilité selon l'âge et le niveau (côté borne) {#agegrade-eligibility-kiosk-side}

L'admissibilité aux salles est une aide purement indicative, évaluée sur la borne et non imposée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance et le niveau scolaire d'une personne aux bornes `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre des niveaux : PreK, K, 1 à 12, Graduated) et renvoie `eligible` / `ineligible` / `unknown`. Des données manquantes donnent `unknown` et ne masquent jamais une salle. Âges et niveaux sont calculés à la **date de passage au niveau supérieur** de l'église (paramètre `gradePromotionDate`, au format `"MM-DD"`, modifiable dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; la borne le récupère via `GET /attendance/checkin/settings`, et `resolveAsOfDate` choisit l'occurrence la plus récente à la date du jour ou antérieure. Le sélecteur de salles met en évidence les salles admissibles et estompe les autres ; choisir une salle estompée exige une confirmation du personnel.

### Ramassage de confiance et ramassage non autorisé {#trusted-and-not-authorized-pickup}

Les personnes autorisées à récupérer les enfants sont une entité du module membership, par foyer : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId facultatif, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le CRUD passe par `GET /membership/householdpickup/:householdId` (tout utilisateur authentifié de l'église, afin que les bornes puissent le lire), ainsi que par `POST` / `DELETE`, soumis à `people.edit`. Le personnel gère la liste dans la carte **Ramassage** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) : photo, lien de parenté et puce de statut Autorisé / Non autorisé.

Au départ (`B1Checkin/app/checkout.tsx`), la borne charge la liste de ramassage du foyer : les entrées `trusted` s'affichent sous forme de cartes cliquables à côté de la grille de photos des adultes du foyer, et un nom saisi librement sous « Autre » est comparé par approximation (distance de Levenshtein, `src/helpers/PickupMatchHelper.ts`) aux entrées `notAuthorized`. Une correspondance bloque le départ, avec une feuille d'avertissement et un bouton **Outrepasser** réservé au personnel. La dérogation est consignée sur la visite elle-même : elle envoie `checkedOutBy` sous la forme `"OVERRIDE: {name}"` via le `POST /attendance/visits/checkout` habituel, si bien qu'elle figure dans l'enregistrement de présence et dans le webhook `attendance.checkout`, plutôt que dans une table d'audit distincte.

### Avis aux parents et diffusion d'urgence {#page-a-parent-and-emergency-broadcast}

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` -- `{ visitId, message }` : envoie un message aux tuteurs d'un enfant pointé (écran de départ de la borne, en mode accompagné).
- `POST /broadcast` -- `{ serviceId, message }` : envoie un texto aux adultes de chaque foyer pointé pour un service (paramètres d'administration de la borne, derrière une feuille de confirmation qui exige de saisir `EMERGENCY`, dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du foyer via la passerelle du module membership, puis confient l'envoi à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- la porte inter-modules vers le fournisseur de textos configuré par l'église (`@churchapps/texting` : TextInChurch, Clearstream ou MutualMinistry ; il n'existe aucun expéditeur SMS intégré). La passerelle enregistre une ligne `sentText` ainsi que des entrées `deliveryLog` par destinataire et limite un lot à 500 destinataires ; sans fournisseur configuré, elle renvoie `no_provider`, que la borne affiche sous la forme « No SMS provider configured ». La méthode `dispatch()` du contrôleur dédoublonne les numéros de téléphone et ignore les personnes sans mobile ou dont `optedOut` est défini, et renvoie `{ sent, failed, skippedOptedOut, skippedNoPhone }` afin que la borne indique ce qui a été ignoré.

## La borne (B1Checkin) {#the-kiosk-b1checkin}

Les écrans sont des fichiers expo-router situés dans `B1Checkin/app/` ; l'état partagé entre les écrans réside dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), et non dans l'état React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Recherche** (`app/lookup.tsx`) -- recherche par téléphone (`GET /membership/people/search/phone?number=`, quatre derniers chiffres ou numéro complet) ou par nom (`GET /membership/people/search?term=`). Sélectionner une correspondance charge le foyer (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), et pré-remplit `pendingVisits` avec les choix de la semaine précédente.
2. **Vérification du foyer** (`app/household.tsx`, `src/components/MemberList.tsx`) -- chaque ligne de membre affiche un badge « déjà pointé », un badge allergie / `nametagNotes`, et ses puces de salles actuelles. Développer un membre liste chaque horaire de service avec un bouton de salle, ainsi que les puces de type de pointage Membre / Visiteur / Bénévole (`MemberServiceTimes.tsx`). Sous le nom de chaque horaire de service, `ServiceTimeHelper.getGroupSummary()` affiche les groupes proposés à cet horaire (les noms de `serviceTime.groups`, nettoyés, dédoublonnés sans tenir compte de la casse, séparés par des virgules) ; rien ne s'affiche lorsque l'horaire n'a aucun groupe.
3. **Affectation au groupe** (`app/selectGroup.tsx`) -- une arborescence de catégories construite à partir de `serviceTime.groups`, avec mise en évidence des salles admissibles selon l'âge et le niveau et estompage des autres derrière une confirmation du personnel (voir [Admissibilité selon l'âge et le niveau](#agegrade-eligibility-kiosk-side)) ; choisir une salle inscrit une `{ session: { serviceTimeId, groupId } }` de visite dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). « None » efface le choix.
4. **Validation** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` avec `pendingVisits` (chacune estampillée de son `checkinType`), puis impression des étiquettes si une imprimante est configurée, et retour automatique à la recherche. Une réponse `409` de capacité ou de `notOpen` affiche la salle concernée avec le motif (complet ou fermé, ou pointage non ouvert) ; un avertissement de ratio propose une confirmation du personnel qui renvoie la requête avec `acknowledgeWarnings=true`.

L'écran de **départ** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères dans un champ à focus automatique, afin que les lecteurs de codes-barres à clavier USB ou Bluetooth fonctionnent sans caméra, ou via un pavé numérique à l'écran qui utilise le même alphabet, avec envoi automatique à 4 caractères. Un bouton **Scanner** ouvre une feuille contenant la caméra partagée `src/components/CodeScanner.tsx` (caméra arrière par défaut, lisant les QR, Code 128 et Code 39), afin que les postes sans lecteur à clavier puissent lire l'étiquette de récupération ; un code scanné emprunte le même chemin `handleCode()` que la saisie. Un bouton **Rechercher par nom** remplace la saisie du code par `src/components/HouseholdSearch.tsx` (recherche par nom de famille ou par téléphone, via les mêmes points de terminaison `/membership/people/search` que la recherche) ; choisir une personne charge son foyer (`GET /membership/people/household/{householdId}`) et appelle `GET /attendance/visits/active?peopleIds=` avec l'identifiant de chaque membre, afin qu'une étiquette perdue ne bloque pas le départ. Dans les deux cas, l'écran affiche les enfants à récupérer et présente les **personnes de confiance pour le ramassage** du foyer sous forme de cartes cliquables, avec une grille de photos des adultes du foyer (et une option « Autre » en saisie libre, vérifiée par approximation contre les noms non autorisés -- voir [Ramassage de confiance et ramassage non autorisé](#trusted-and-not-authorized-pickup)), puis envoie `POST /attendance/visits/checkout` avec le nom ou l'identifiant choisi. En mode accompagné, l'écran propose aussi **Avertir un parent** (`POST /attendance/checkin/page`) et une **réimpression de l'étiquette de sécurité** : `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les transmet par le même chemin `PrintUI` que le pointage.

Le mode de la borne est un indicateur AsyncStorage `@StationMode` (`"self"` ou `"manned"`, basculé dans `app/adminSettings.tsx`). Le mode accompagné ajoute le point d'entrée du départ sur l'écran de recherche, ainsi que la modification du profil de chaque membre (`POST /membership/people`) depuis l'écran du foyer. La borne est par ailleurs durcie : un code PIN facultatif (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protège les écrans d'administration et d'imprimante, l'écran d'administration ne s'ouvre qu'après 7 appuis rapides sur le logo de l'en-tête, et un écran d'accueil d'inactivité (`src/hooks/useInactivityTimer.ts`) prend le relais entre deux familles.

## Pointage autonome (B1App) {#self-check-in-b1app}

Les membres pointent depuis le portail b1.church, à l'écran `/mobile/checkin` (routé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Il exige un utilisateur connecté et suit les mêmes quatre étapes que la borne -- services, foyer, groupes, validation -- avec les mêmes points de terminaison ; l'état est conservé dans `B1App/src/helpers/CheckinHelper.ts`. Les différences avec la borne : le foyer provient de la `householdId` de l'utilisateur connecté (pas d'étape de recherche), et il n'y a aucune impression d'étiquettes ; à la place, l'écran de fin affiche le code de sécurité du lot sous forme de QR (`qrcode.react`), accompagné de la mention « présentez ceci à une borne de pointage ». Si le foyer est déjà pointé au chargement de la page, un bouton « Afficher le code de pointage » réaffiche le QR à partir de la première visite existante (issue de `GET /attendance/visits/checkin`) qui porte un `securityCode`. Le pointage est enregistré immédiatement à l'envoi (il n'existe pas d'état en attente) ; le QR ne sert qu'à l'impression des étiquettes à la borne.

**Impression d'étiquettes depuis le téléphone** (`B1Checkin/app/scan.tsx`, atteint par le bouton « Scanner le code » du QR sur l'écran de recherche) : la borne affiche `CodeScanner` (un `CameraView` d'`expo-camera`, caméra avant par défaut, qui peut être retournée) et recherche des codes QR. `ScanCodeHelper.parse()` n'accepte une charge utile que si elle est un code brut de 4 caractères appartenant à l'alphabet des codes de sécurité, et `ScanCodeHelper.isRepeat()` ignore le même code pendant 4 secondes ; ainsi, le QR de B1App comme le bloc QR d'une étiquette imprimée fonctionnent. L'écran suit ensuite le chemin de réimpression du départ -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- puis revient à la recherche. Aucune écriture de présence n'a lieu au moment du scan : il ne fait qu'imprimer les étiquettes. Un code sans visite active, un poste sans imprimante et un groupe sans étiquette affichent chacun un message bref, puis ramènent à la recherche.

Les types et `ApiHelper`/`ArrayHelper` proviennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présences côté administration (B1Admin) {#admin-side-attendance-b1admin}

- **Configuration** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) affiche l'arborescence de structure et permet de créer des services (`ServiceEdit.tsx`) et des horaires de service (`ServiceTimeEdit.tsx`). Les données de campus proviennent du module membership via le hook `useCampuses()`.
- **La présence manuelle** se trouve dans la section des groupes, et non dans la section Présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée des sessions (`POST /attendance/sessions` ; à l'ajout, `SessionEdit.tsx` peut inclure une session pour chacun des autres groupes partageant l'horaire de service choisi, en ignorant les groupes qui ont déjà une session à cette date), et marque les personnes présentes via `POST /attendance/visitsessions/log`, qui trouve ou crée la visite de cette personne pour cette session. Les responsables de groupe peuvent saisir la présence de leurs propres groupes sans l'autorisation `attendance.edit` : les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapports** -- les tendances de présence et la présence par groupe sont des rapports définis côté serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx`, qui s'appuie sur ReportingApi ; définitions dans `Api/reports/*.json`). Les deux prennent `startDate`/`endDate` (date de fin incluse) ; le rapport de tendance est par défaut le dernier an jusqu'à aujourd'hui et ajoute une colonne `sessionDates` par semaine, et l'arborescence affichée pour la présence par groupe comprend le `checkinTime` de chaque visite ainsi que le `membershipStatus` de la personne. Le CSV de présence par groupe provient du rapport compagnon `groupAttendanceDownload`, pivoté par `GroupAttendanceDownloadHelper` en une ligne par membre du groupe, avec une colonne présent/absent par session datée ; l'historique par personne est fourni par `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression des étiquettes {#label-printing}

### Modèles et concepteur {#templates-and-the-designer}

Les églises conçoivent leurs propres étiquettes dans B1Admin, à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` et `components/LabelEditor.tsx`, accessible depuis la page des paramètres de pointage). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs -- `text`, `field`, `barcode`, `qrcode` ou `box` -- chacun positionné en coordonnées de pourcentage, avec police, alignement, symbologie (`code39`/`code128`/`qr`) et conditions d'affichage facultatives (par exemple, n'afficher la case allergie que lorsque `person.nametagNotes` n'est pas vide). Deux `labelType` existent : `nametag` (une étiquette par personne pointée ; champs tels que `person.displayName`, `sessions`, `securityCode` et `person.isBirthdayWeek` -- `"true"` lorsque le mois et le jour de l'anniversaire sont à 3 jours ou moins d'aujourd'hui, en tenant compte du passage d'année, calculé par `LabelHelper.isBirthdayWithin()`) et `pickup` (une par famille ; champs tels que `children` et `childrenAllergies`). Le serveur n'autorise qu'un seul modèle par défaut et par type et par église (`LabelTemplateController.save`). Le concepteur fournit des modèles de départ reprenant les étiquettes intégrées de la borne, et prévisualise avec des données d'exemple.

### Rendu et impression à la borne {#rendering-and-printing-on-the-kiosk}

À la fin du pointage, `B1Checkin/src/helpers/LabelHelper.ts` décide quoi imprimer à partir des indicateurs de groupe de chaque visite en attente : des badges pour les groupes `printNametag`, et une étiquette de récupération familiale unique si une visite a atteint un groupe `parentPickup`. Les visites de type `checkinType` `volunteer` sont ignorées par `LabelHelper.selectChildVisits()` ; un bénévole de garderie dans une salle de ramassage parental ne déclenche donc jamais d'étiquette de récupération. Le code de sécurité de la réponse de pointage est placé sur les badges des enfants et sur l'étiquette de récupération ; les badges des adultes s'impriment sans code. Si l'église dispose de modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs et un contexte de champs en document HTML autonome ; sinon, les étiquettes HTML intégrées de `B1Checkin/assets/labels/` sont utilisées avec substitution des espaces réservés.

Les codes-barres sont générés en SVG intégré par des encodeurs TypeScript purs, dans `B1Checkin/src/helpers/barcode.ts` -- tables de motifs Code 39 et tables de largeurs Code 128 (jeu B avec somme de contrôle mod 103), plus les QR via le paquet `qrcode`. **Ces encodeurs sont volontairement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, signalé par un commentaire de code) afin que les aperçus du concepteur reproduisent fidèlement la sortie de la borne ; toute modification de l'un doit être répercutée dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans un `WebView`, la capture en JPG avec `react-native-view-shot`, puis transmet les URI des images au module Expo natif **printer-helper** (`B1Checkin/modules/printer-helper/`). Ce module expose `scan()`, `checkInit()`, `printUris()` et des événements d'état, avec un fournisseur par marque sur les deux plateformes :

| Marque | Android | iOS | Remarques |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK d'impression Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau de la série QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes prédécoupées 29×90, valeur par défaut recommandée |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau et impression d'image TCP/ZPL |

Le choix de l'imprimante se fait dans `app/printers.tsx` (le scan réseau renvoie des entrées `brand~model~ip` ; le choix est conservé dans AsyncStorage). `src/helpers/PrinterLog.ts` tient un journal de diagnostic sur l'appareil, consultable via un point d'état en direct dans l'en-tête de la borne.

## Inscription des visiteurs {#guest-registration}

Deux chemins créent une personne en cours de pointage :

- **Sur la borne** -- le bouton « Ajouter un visiteur » de l'écran du foyer ouvre `B1Checkin/app/addGuest.tsx`, qui commence par chercher une correspondance de non-membre existante via `GET /membership/people/search?term=`, puis, à défaut, crée la personne avec `POST /membership/people`, rattachée au foyer en cours. Le visiteur passe ensuite par l'affectation de groupe comme n'importe quel membre.
- **En libre-service par QR** -- lorsque le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres de pointage de B1Admin, lu via `GET /membership/settings/public/{churchId}`), l'écran de recherche de la borne affiche un QR code renvoyant vers `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille de visite de s'inscrire depuis son propre téléphone, via le point de terminaison anonyme `POST /membership/people/guest-register`, ce qui fait avancer la file à la borne. La feuille du QR comporte aussi un bouton **Inscrire ici** qui ouvre la même page sur la borne (`app/guestRegister.tsx`), dans un `WebView` en mode navigation privée et sans cache ; `src/helpers/GuestRegisterHelper.ts` construit l'URL pour le QR et pour le `WebView`, et bloque la navigation hors de `https://{subdomain}.b1.church/guest-register`. L'écran revient à la recherche sur **Terminé**, en arrière, ou après 120 secondes d'inactivité (la saisie dans le formulaire est relayée depuis le `WebView` comme activité), et démonte le `WebView` pour que les saisies d'une famille ne parviennent jamais à la suivante.

L'inscription par QR est pilotée par les paramètres d'église enregistrés depuis la carte **Inscription par QR** de B1Admin (`src/mobile/CheckInPage.tsx`) :

| Paramètre | Visibilité | Objet |
|---|---|---|
| `enableQRGuestRegistration` | public | Interrupteur d'activation du QR de la borne et des points de terminaison anonymes |
| `guestRegistrationFields` | public | Dictionnaire JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Par défaut : courriel et téléphone facultatifs, le reste désactivé. Le prénom et le nom sont toujours obligatoires |
| `guestRegistrationImage` | public | URL de la photo d'en-tête ; B1App l'affiche au format 16:9 à la place de l'icône sur le formulaire et sur l'écran de confirmation |
| `guestRegistrationGroupId` | privé | Groupe auquel chaque inscription est ajoutée (les visiteurs ne le voient ni ne le choisissent jamais) |
| `guestRegistrationRecordAttendance` | privé | `"true"` pour enregistrer aussi la présence à ce groupe |

`src/components/checkin/GuestRegister.tsx` de B1App récupère la liste des champs via le point de terminaison anonyme `GET /membership/people/guest-register/options?churchId=` et n'affiche que les champs inclus (courriel, téléphone, statut matrimonial et adresse pour le contact principal ; date de naissance, genre et niveau pour chaque membre ; une seule zone de commentaires), en n'envoyant que ceux-là. Le serveur réapplique la liste dans `GuestRegistrationHelper.sanitize()` -- les champs désactivés sont supprimés, et les valeurs obligatoires manquantes ou hors liste produisent un 400 -- avant que `PersonHelper.registerGuestHousehold()` ne s'exécute. Pour chaque membre ayant un courriel ou un téléphone, il appelle d'abord `PersonRepo.findGuestMatch()` : une seule personne vivante ayant le même prénom et le même courriel ou les mêmes chiffres de téléphone est réutilisée (zéro correspondance, ou plusieurs, créent une nouvelle personne ; le système ne devine jamais). Un membre sans aucun moyen de contact est mis en correspondance par prénom à l'intérieur du foyer trouvé. Les personnes réutilisées ne sont jamais modifiées, afin qu'un formulaire anonyme ne puisse pas écraser des données existantes ; la réponse reprend les noms soumis. Les membres non trouvés rejoignent le foyer trouvé ou un nouveau foyer, avec `membershipStatus: "Visitor"`, et un événement `person.created` est émis pour chaque nouvelle personne. Ensuite, les échecs sont journalisés plutôt que renvoyés : les membres sont ajoutés au groupe configuré (`group.member.added`) ; si l'enregistrement de présence est activé, `AttendanceModuleGateway.recordAttendance()` marque chaque membre présent pour chacun des horaires de service du groupe qui disposent d'un calendrier et dont la fenêtre de pointage (`CheckinGateHelper.isServiceTimeOpen`) est ouverte à cet instant, en créant la session de la date du jour selon le calendrier de l'église si besoin -- les horaires non planifiés et les inscriptions hors fenêtre n'enregistrent rien ; enfin, les commentaires deviennent une conversation de note personnelle masquée rattachée au chef de foyer (auteur du message « Guest sign-up »), reliée par `person.conversationId`.

## Pages connexes {#related-pages}

- [Points de terminaison de présence](../api/endpoints/attendance.md) -- Surface REST complète pour les campus, services, sessions, visites et sessions de visite
- [Points de terminaison Membership](../api/endpoints/membership.md) -- Personnes, foyers et groupes
- [Webhooks](../api/webhooks.md) -- Les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure des modules](../api/module-structure.md) -- Organisation côté serveur du module de présence
