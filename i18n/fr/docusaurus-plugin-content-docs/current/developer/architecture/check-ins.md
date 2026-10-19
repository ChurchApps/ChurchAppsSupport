---
title: "Enregistrement à l'arrivée"
---

# Enregistrement à l'arrivée

<div class="article-intro">

L'enregistrement à l'arrivée est un système unique avec trois points d'entrée : l'application borne B1Checkin pour les postes avec ou sans personnel, l'enregistrement autonome dans le portail des membres B1App, et la présence côté administration dans B1Admin. Les trois écrivent dans le même module de présence de l'Api principale, et l'affectation aux salles de classe est entièrement pilotée par les Groupes — il n'existe pas d'entité distincte « emplacements » ou « salles ». Une couche de sécurité pour les enfants s'ajoute par-dessus : types d'enregistrement par visite, contrôles de capacité et de ratio bénévoles côté serveur, critères d'âge et de niveau côté borne, vérification du retrait de confiance lors du départ, et appel des parents via le fournisseur de SMS de l'église. Cette page décrit le modèle de données, les parcours d'enregistrement, la couche de sécurité et le processus d'impression des étiquettes.

</div>

## Vue d'ensemble

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

| Surface | Dépôt | Technologie | Rôle |
|---------|-------|-------------|------|
| Borne | `B1Checkin` | Expo / React Native, routage de fichiers expo-router ; builds EAS pour Android, Amazon Fire et iOS ; mises à jour OTA via `expo-updates` | Poste avec ou sans personnel, avec impression d'étiquettes et retrait vérifié |
| Enregistrement autonome | `B1App` | Next.js (portail des membres b1.church) | Les membres connectés enregistrent leur foyer depuis un téléphone ; pas d'impression |
| Administration | `B1Admin` | SPA React | Configure la structure des services, affecte les groupes aux horaires de service, conçoit les étiquettes, enregistre la présence manuelle, exécute les rapports |

Les trois appellent les mêmes deux modules d'API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, les foyers et les groupes ; **AttendanceApi** (`/attendance`) pour tout ce qui est décrit ci-dessous.

## Modèle de données (`Api/src/modules/attendance`)

| Entité / table | Champs clés | Signification |
|----------------|-------------|---------------|
| `campuses` | name, address | Obsolète ici — les campus sont gérés dans le module membership (`/membership/campuses`) ; la copie du module de présence est figée en lecture seule pour les anciens lecteurs (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par exemple « Culte du dimanche matin » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un créneau au sein d'un service, par exemple « 9 h 00 » (`models/ServiceTime.ts`). Les colonnes de planning sont facultatives (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) et déterminent la [fenêtre d'enregistrement](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jointure : quels groupes (salles de classe) se réunissent à quels créneaux (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date donnée — créée à la demande au moment de l'enregistrement (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne présente à une date donnée (`models/Visit.ts`). `checkinType` vaut `member` / `guest` / `volunteer` (NULL = membre historique), défini par la borne et utilisé par les contrôles de capacité et de ratio |
| `visitSessions` | visitId, sessionId | La ou les sessions couvertes par une visite — un enfant enregistré à deux créneaux obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquettes personnalisables (`models/LabelTemplate.ts`) |

### Comment un enregistrement terminé est enregistré

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) traite `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant des `visitSessions` dont la `session` intégrée ne précise qu'une paire `(serviceTimeId, groupId)`. Le serveur effectue ensuite :

1. **Contrôle la capacité et les ratios avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie, pour chaque salle visée, la capacité, la capacité d'invités, l'indicateur de fermeture et le ratio bénévoles par rapport à l'occupation actuelle. postCheckin n'est **pas transactionnel** : le contrôle doit donc s'exécuter avant la première sauvegarde. En cas de violation bloquante, une erreur 409 indique la ou les salles concernées et rien n'est enregistré. Voir [Contrôles de capacité et de ratio bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les sessions à la demande.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, aujourd'hui)` — les identifiants de session sont mis en cache dans le processus pour chaque date. Les nouvelles sessions émettent un webhook `session.created`. La boucle est un `for..of` avec `await` — un ancien `forEach(async …)` sans attente entrait en concurrence avec la sauvegarde et écrivait des sessionId NULL lors de la création de la première session (corrigé ; signalé par un commentaire de code dans la boucle).
3. **Remplace les enregistrements de la journée.** Les visites existantes de ces personnes pour ce service aujourd'hui sont supprimées avec leurs visitSessions, puis l'ensemble soumis est enregistré. Réenregistrer une famille est donc une opération idempotente « voici l'état actuel », et non un ajout. Passer `?checkDuplicates=true` renvoie à la place `{ duplicates: [personId…] }` sans rien écrire, ce que la borne utilise pour avertir avant un écrasement.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code de 4 caractères à partir de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (sans voyelles ni caractères ambigus, pour que les codes ne forment pas de mots et ne soient pas mal lus). Le serveur relance la génération en cas de collision avec les visites ouvertes du même jour pour la même église, et appose le code sur chaque visite du lot.
5. **Renvoie `{ streaks, securityCode }`.** `streaks` associe à chaque personId son nombre de semaines consécutives de présence ; la borne célèbre les jalons (toutes les 5 semaines) avec des confettis.

Chaque visite enregistrée émet aussi un webhook `attendance.recorded`. La lecture, `GET /attendance/visits/checkin`, renvoie les visites des personnes à partir de leur **dernière date enregistrée** — s'il s'agit d'une semaine précédente, les identifiants sont retirés : le client reçoit une copie pré-remplie des choix de salles de la semaine passée, qui seront enregistrés comme de nouveaux enregistrements.

### Départ

Deux points d'accès complètent le cycle (`VisitController`) :

- `GET /attendance/visits/code/:code` — les visites du jour, non encore clôturées, portant ce code de sécurité, avec les sessions renseignées.
- `POST /attendance/visits/checkout` — corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; enregistre `checkoutTime` et la personne qui a récupéré l'enfant, et émet un webhook `attendance.checkout` par visite.

Permissions : les bornes s'authentifient avec `attendance.checkin`, qui accorde exactement la surface d'enregistrement, de départ et de modèles d'étiquettes ; `attendance.view` / `attendance.edit` couvrent les rapports et la saisie manuelle ; la structure (services, créneaux, affectations de groupes) exige `services.edit`. L'enregistrement autonome d'un membre (B1App) ne demande aucune permission : tout utilisateur authentifié disposant d'une personne liée dans l'église peut appeler `GET`/`POST /attendance/visits/checkin`, et le serveur limite les `personId` soumis au foyer de l'appelant (403 sinon) — cette barrière empêche de lire les `securityCode` des autres familles. L'appartenance vaut autorisation ; la visibilité de la fonctionnalité pour les membres est contrôlée par les onglets de navigation B1App de l'église. Les autres points d'accès de l'enregistrement (`code/:code`, `checkout`, `guardians`, `CheckinController`) restent réservés aux bornes et au personnel.

## Les groupes pilotent le routage des salles

Il n'existe nulle part dans le système d'entité « salle » ou « classe ». Une « salle » est un **groupe** du module membership dont `trackAttendance` est activé, lié à un ou plusieurs créneaux via `groupServiceTimes`. Les champs du groupe (dans `Api/src/modules/membership/models/Group.ts`) qui déterminent le comportement de la borne :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe à la présence ; l'arborescence de configuration de B1Admin signale comme non affectés les groupes `trackAttendance` sans ligne `groupServiceTimes` |
| `parentPickup` | Marque une salle enfants : y enregistrer un enfant fait de la visite une visite « enfant », qui imprime une étiquette de retrait familial et place le code de sécurité sur le badge |
| `printNametag` | Indique si les enregistrements dans ce groupe impriment un badge |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité de la salle et interrupteur « fermé » strict, appliqués côté serveur par le contrôle d'enregistrement (modifiables dans les paramètres de groupe de B1Admin sous « Capacité d'enregistrement ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants par bénévole et effectif minimal de bénévoles, appliqués selon le paramètre `ratioEnforcement` de l'église |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Bornes d'âge et de niveau scolaire évaluées côté borne pour mettre en évidence ou estomper les salles |

Chaque client dénormalise de la même manière (par exemple `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger en parallèle `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups`, puis, pour chaque créneau, rassembler dans `serviceTime.groups` les groupes dont la ligne `groupServiceTimes` pointe vers lui. Ce tableau alimente le sélecteur de salles, organisé par `categoryName` du groupe.

Les affectations se modifient depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), et l'arborescence complète Campus → Service → Créneau → Groupe est visualisée dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Comme les groupes sont la source unique de vérité, la même appartenance à un groupe alimente le routage à la borne, la présence de type liste dans les pages de groupe de B1Admin et les rapports de présence — affecter un groupe à un créneau est la seule étape nécessaire pour en faire une destination d'enregistrement.
:::

## Sécurité des enfants

### Types d'enregistrement

Chaque visite porte un `checkinType` — `member`, `guest` ou `volunteer` (NULL signifie membre historique ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté borne** : les puces Membre / Invité / Bénévole sur la ligne de membre développée (`B1Checkin/src/components/MemberServiceTimes.tsx`), appliquées à chaque visite en attente lors de la validation (`app/checkinComplete.tsx`, valeur par défaut `member`). Le serveur l'utilise dans le contrôle : les bénévoles comptent pour la couverture du ratio au lieu de peser sur la capacité, et les invités comptent dans `guestCapacity`.

### Contrôles de capacité et de ratio bénévoles {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute dans `postCheckin` avant toute sauvegarde (le point d'accès n'est pas transactionnel, donc le contrôle avant sauvegarde est le mécanisme de cohérence). Il charge l'occupation actuelle de chaque groupe visé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe via la passerelle du module membership, puis classe les violations :

- **Bloquantes (toujours refusées) :** `checkinClosed`, `actuel + entrants > capacity`, nombre d'invités supérieur à `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — la borne affiche la salle concernée.
- **Ratio (avertissement ou blocage) :** des non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, sans aucun bénévole, ou lorsque `children > volunteers × volunteerRatio`. La gravité suit le paramètre par église `ratioEnforcement` (`"warn"` par défaut / `"block"`, modifiable dans B1Admin Gérer l'église → Enregistrement, `CheckinSettingsEdit.tsx`). En mode avertissement, le serveur renvoie `409 { warning: true, error: "ratio", … }` sauf si le client renvoie la requête avec `acknowledgeWarnings=true` — cette nouvelle soumission est la validation par le personnel sur la borne.

### Fenêtres d'enregistrement planifiées {#scheduled-check-in-windows}

Un créneau peut comporter un planning hebdomadaire facultatif (`dayOfWeek` de 0 à 6, avec 0 = dimanche ; `startTime`/`endTime` au format `HH:mm` ; `checkinOpenMinutes`, `checkinCloseMinutes`), modifiable dans le formulaire de créneau **Présence → Configuration** de B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, « Planning d'enregistrement »). `CheckinGateHelper.hasSchedule()` ne considère un créneau comme planifié que si `dayOfWeek` et `startTime` sont tous deux renseignés ; les créneaux non planifiés ne sont jamais limités dans le temps. `isServiceTimeOpen()` calcule la fenêtre à l'heure locale de l'église (`DateHelper.toChurchTime`). Le fuseau horaire est le `timeZone` de l'église ; si aucun n'est défini, on prend celui du premier campus non supprimé qui possède un `timezone` (`MembershipModuleGateway.loadCampusTimeZone`), et seulement à défaut `America/New_York`. Les chemins de listage et d'envoi ci-dessous résolvent ce fuseau de la même manière. La fenêtre commence `checkinOpenMinutes` avant le début et se termine `checkinCloseMinutes` après la fin (ou après le début s'il n'y a pas de fin), en gérant les fenêtres qui traversent minuit ou la frontière de la semaine.

La fenêtre est appliquée à deux endroits :

- **Listage :** `GET /attendance/servicetimes` ajoute à chaque ligne un booléen calculé `checkinOpen`. L'enregistrement autonome de B1App (`CheckinPage.tsx`) et le sélecteur de services de B1Checkin (`app/services.tsx`) écartent les créneaux où `checkinOpen === false` et affichent « L'enregistrement n'est pas ouvert pour ce service pour le moment. » lorsqu'un service a des créneaux mais qu'aucun n'est ouvert (la borne propose alors un bouton Retour pour choisir un autre service).
- **Envoi :** dans `evaluateGates()`, avant l'évaluation capacité/ratio, `findClosedServiceTimeGroups()` rejette le lot avec `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si le créneau de l'une des sessions visées est hors de sa fenêtre. B1Checkin affiche ce cas sur son écran de blocage strict avec le motif « l'enregistrement n'est pas ouvert pour le moment » (les violations de capacité affichent toujours « la salle est complète ou fermée »).

### Éligibilité par âge et niveau (côté borne) {#agegrade-eligibility-kiosk-side}

L'éligibilité des salles est une aide visuelle, évaluée sur la borne et non imposée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance et le niveau scolaire d'une personne aux bornes `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre des niveaux : PreK, K, 1 à 12, Graduated) et renvoie `eligible` / `ineligible` / `unknown` — une donnée manquante donne `unknown` et ne masque jamais une salle. Les âges et niveaux sont calculés à la **date de passage de niveau** de l'église (paramètre `gradePromotionDate`, au format `"MM-DD"`, modifiable dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; la borne le récupère via `GET /attendance/checkin/settings`, et `resolveAsOfDate` retient la plus récente occurrence à la date du jour ou antérieure. Le sélecteur de salles met en évidence les salles éligibles et estompe les salles non éligibles ; choisir une salle estompée exige une confirmation du personnel.

### Retrait de confiance et personnes non autorisées {#trusted-and-not-authorized-pickup}

Les personnes autorisées à récupérer un enfant sont une entité du module membership, par foyer : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId facultatif, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). La gestion se fait via `GET /membership/householdpickup/:householdId` (tout utilisateur authentifié de l'église, afin que les bornes puissent le lire) ainsi que `POST` / `DELETE`, protégés par `people.edit`. Le personnel gère la liste dans la carte **Retrait** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, lien de parenté et puce d'état Autorisé de confiance / Non autorisé.

Lors du départ (`B1Checkin/app/checkout.tsx`), la borne charge la liste de retrait du foyer : les entrées `trusted` s'affichent sous forme de cartes cliquables à côté de la grille de photos des adultes du foyer, et un nom saisi librement sous « Autre » est comparé par approximation (distance de Levenshtein, `src/helpers/PickupMatchHelper.ts`) aux entrées `notAuthorized` — une correspondance bloque le départ avec une feuille d'avertissement et un bouton **Forcer** réservé au personnel. La dérogation est consignée sur la visite elle-même : elle envoie `checkedOutBy` sous la forme `"OVERRIDE: {name}"` via le `POST /attendance/visits/checkout` habituel, de sorte qu'elle figure dans le registre de présence et dans le webhook `attendance.checkout`, et non dans une table d'audit distincte.

### Appel d'un parent et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points d'accès SMS :

- `POST /page` — `{ visitId, message }` : appelle les responsables d'un enfant enregistré (écran de départ de la borne, mode avec personnel).
- `POST /broadcast` — `{ serviceId, message }` : envoie un SMS aux adultes de chaque foyer enregistré pour un service (paramètres d'administration de la borne, derrière une feuille de confirmation qui exige de taper `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes des foyers via la passerelle membership, puis confient l'envoi à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porte inter-modules vers le fournisseur de SMS configuré par l'église (`@churchapps/texting` : TextInChurch, Clearstream ou MutualMinistry ; il n'existe pas d'envoyeur SMS intégré). La passerelle enregistre une ligne `sentText` et des entrées `deliveryLog` par destinataire, et limite un lot à 500 destinataires ; sans fournisseur configuré, elle renvoie `no_provider`, que la borne affiche sous la forme « Aucun fournisseur SMS configuré ». La méthode `dispatch()` du contrôleur déduplique les numéros de téléphone et ignore les personnes sans mobile ou marquées `optedOut`, en renvoyant `{ sent, failed, skippedOptedOut, skippedNoPhone }` afin que la borne indique ce qui a été ignoré.

## La borne (B1Checkin)

Les écrans sont des fichiers expo-router situés dans `B1Checkin/app/` ; l'état partagé entre écrans réside dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), et non dans l'état React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Recherche** (`app/lookup.tsx`) — recherche par téléphone (`GET /membership/people/search/phone?number=`, quatre derniers chiffres ou numéro complet) ou par nom (`GET /membership/people/search?term=`). Sélectionner une correspondance charge le foyer (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), en pré-remplissant `pendingVisits` avec les choix de la semaine passée.
2. **Revue du foyer** (`app/household.tsx`, `src/components/MemberList.tsx`) — chaque ligne de membre affiche un badge « déjà enregistré », un badge allergie / `nametagNotes` et ses puces de salle actuelles. En développant un membre, on voit chaque créneau avec un bouton de salle ainsi que les puces de type d'enregistrement Membre / Invité / Bénévole (`MemberServiceTimes.tsx`). Sous le nom de chaque créneau, `ServiceTimeHelper.getGroupSummary()` affiche les groupes proposés à ce créneau (les noms de `serviceTime.groups`, épurés, dédoublonnés sans tenir compte de la casse, séparés par des virgules) ; rien ne s'affiche si le créneau n'a aucun groupe.
3. **Affectation au groupe** (`app/selectGroup.tsx`) — une arborescence par catégorie construite à partir de `serviceTime.groups`, avec les salles éligibles selon l'âge ou le niveau mises en évidence et les salles non éligibles estompées derrière une confirmation du personnel (voir [Éligibilité par âge et niveau](#agegrade-eligibility-kiosk-side)) ; choisir une salle écrit une visitSession `{ session: { serviceTimeId, groupId } }` dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). « Aucun » la retire.
4. **Terminer** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` avec `pendingVisits` (chacune porte son `checkinType`), puis impression des étiquettes si une imprimante est configurée et retour automatique à lookup. Une réponse `409` pour capacité ou `notOpen` affiche la salle concernée avec le motif (complète / fermée, ou enregistrement non ouvert) ; un avertissement de ratio propose une confirmation du personnel qui renvoie la requête avec `acknowledgeWarnings=true`.

L'écran de **départ** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères via un champ à focus automatique — ainsi, les lecteurs de codes-barres USB ou Bluetooth en mode clavier fonctionnent sans caméra — ou un pavé numérique à l'écran utilisant le même alphabet, avec envoi automatique à 4 caractères. Un bouton **Scanner** ouvre une feuille avec la caméra partagée `src/components/CodeScanner.tsx` (caméra arrière par défaut, acceptant QR, Code 128 et Code 39), afin que les postes sans lecteur à clavier puissent lire l'étiquette de retrait ; un code scanné emprunte le même chemin `handleCode()` que la saisie. L'écran recherche le code, affiche les enfants à récupérer, et présente les **personnes de confiance pour le retrait** du foyer sous forme de cartes cliquables, ainsi qu'une grille de photos des adultes du foyer (et une option « Autre » en texte libre, comparée par approximation aux noms non autorisés — voir [Retrait de confiance et personnes non autorisées](#trusted-and-not-authorized-pickup)), puis envoie `POST /attendance/visits/checkout` avec le nom et l'identifiant choisis. En mode avec personnel, l'écran propose aussi **Appeler un parent** (`POST /attendance/checkin/page`) et une **réimpression de l'étiquette de sécurité** — `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les transmet au même pipeline `PrintUI` que l'enregistrement.

Le mode de la borne est un indicateur AsyncStorage `@StationMode` (`"self"` | `"manned"`, modifiable dans `app/adminSettings.tsx`). Le mode avec personnel ajoute le point d'entrée du départ sur l'écran de recherche et la modification du profil de chaque membre (`POST /membership/people`) depuis l'écran du foyer. La sécurisation de la borne est intégrée : un code PIN facultatif (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protège les écrans d'administration et d'imprimante, l'écran d'administration ne s'ouvre qu'après 7 appuis rapides sur le logo de l'en-tête, et un écran d'accueil d'inactivité (`src/hooks/useInactivityTimer.ts`) prend le relais entre deux familles.

## Enregistrement autonome (B1App)

Les membres s'enregistrent depuis le portail b1.church, à l'écran `/mobile/checkin` (acheminé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Il exige un utilisateur connecté et suit les mêmes quatre étapes que la borne — services → foyer → groupes → terminer — avec les mêmes points d'accès, l'état étant conservé dans `B1App/src/helpers/CheckinHelper.ts`. Les différences avec la borne : le foyer provient du `householdId` de l'utilisateur connecté (pas d'étape de recherche), et il n'y a aucune impression d'étiquettes — l'écran de fin affiche à la place le code de sécurité du lot sous forme de QR (`qrcode.react`), avec l'indication « présentez ce code à un poste d'enregistrement ». Si le foyer est déjà enregistré au chargement de la page, un bouton « Afficher le code d'enregistrement » réaffiche le QR à partir de la première visite existante (issue de `GET /attendance/visits/checkin`) qui porte un `securityCode`. L'enregistrement est inscrit immédiatement à l'envoi (il n'y a pas d'état en attente) ; le QR ne sert qu'à l'impression des étiquettes sur la borne.

**Impression d'étiquettes depuis le téléphone vers la borne** (`B1Checkin/app/scan.tsx`, accessible depuis le bouton « Scanner le code » du QR sur l'écran de recherche) : la borne affiche `CodeScanner` (un `CameraView` d'`expo-camera`, caméra avant par défaut, inversable) qui scanne les QR codes. `ScanCodeHelper.parse()` n'accepte une charge utile que si elle est un code nu de 4 caractères de l'alphabet des codes de sécurité, et `ScanCodeHelper.isRepeat()` ignore le même code pendant 4 secondes ; ainsi, le QR de B1App et le bloc QR d'une étiquette imprimée fonctionnent tous deux. L'écran suit ensuite le chemin de réimpression du départ — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — puis revient à la recherche. Aucune écriture de présence n'a lieu au scan : seules les étiquettes sont imprimées. Les codes sans visite active, les postes sans imprimante et les groupes sans étiquette affichent chacun un message éphémère et ramènent à la recherche.

Les types et `ApiHelper`/`ArrayHelper` proviennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présence côté administration (B1Admin)

- **Configuration** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) affiche l'arborescence de la structure et permet de créer des services (`ServiceEdit.tsx`) et des créneaux (`ServiceTimeEdit.tsx`). Les données de campus proviennent du module membership via le hook `useCampuses()`.
- **Présence manuelle** se trouve dans la section Groupes, et non dans la section Présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée les sessions (`POST /attendance/sessions` ; lors de l'ajout, `SessionEdit.tsx` peut créer une session pour chaque autre groupe partageant le créneau choisi, en ignorant les groupes qui ont déjà une session à cette date) et marque les personnes présentes via `POST /attendance/visitsessions/log`, qui trouve ou crée la visite de cette personne pour cette session. Les responsables de groupe peuvent enregistrer la présence de leurs propres groupes sans la permission `attendance.edit` — les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapports** — la tendance de présence et la présence par groupe sont des rapports définis côté serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx`, auprès de ReportingApi ; définitions dans `Api/reports/*.json`). Les deux acceptent `startDate`/`endDate` (date de fin incluse) ; le rapport de tendance prend par défaut la période allant d'il y a un an à aujourd'hui et ajoute une colonne `sessionDates` par semaine, et l'arborescence affichée de la présence par groupe inclut le `checkinTime` de chaque visite ainsi que le `membershipStatus` de la personne. Le CSV de présence par groupe provient du rapport compagnon `groupAttendanceDownload`, pivoté par `GroupAttendanceDownloadHelper` en une ligne par membre du groupe, avec une colonne présent/absent pour chaque session datée ; l'historique par personne est fourni par `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression des étiquettes

### Modèles et éditeur

Les églises conçoivent leurs propres étiquettes dans B1Admin, à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accessible depuis la page des paramètres d'enregistrement). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs — `text`, `field`, `barcode`, `qrcode` ou `box` — chacun positionné en pourcentages, avec police, alignement, symbologie (`code39`/`code128`/`qr`) et conditions d'affichage facultatives (par exemple, n'afficher la case allergie que si `person.nametagNotes` n'est pas vide). Il existe deux `labelType` : `nametag` (un par personne enregistrée ; champs tels que `person.displayName`, `sessions`, `securityCode` et `person.isBirthdayWeek` — `"true"` lorsque le mois et le jour de l'anniversaire sont à moins de 3 jours d'aujourd'hui, en passant d'une fin d'année à l'autre, calculé par `LabelHelper.isBirthdayWithin()`) et `pickup` (un par famille ; champs tels que `children`, `childrenAllergies`). Le serveur impose un seul modèle par défaut par type et par église (`LabelTemplateController.save`). L'éditeur fournit des modèles de départ reprenant les étiquettes intégrées de la borne et permet un aperçu avec des données d'exemple.

### Rendu et impression sur la borne

À la fin de l'enregistrement, `B1Checkin/src/helpers/LabelHelper.ts` décide quoi imprimer à partir des indicateurs de groupe de chaque visite en attente : des badges pour les groupes `printNametag`, plus une étiquette de retrait familial si une visite a touché un groupe `parentPickup`. Les visites de type `volunteer` sont écartées par `LabelHelper.selectChildVisits()`, de sorte qu'un bénévole de garderie dans une salle de retrait parental ne déclenche jamais d'étiquette de retrait. Le code de sécurité de la réponse d'enregistrement est placé sur les badges des enfants et sur l'étiquette de retrait ; les badges des adultes s'impriment sans code. Si l'église dispose de modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs et un contexte de champs en un document HTML autonome ; sinon, les étiquettes HTML intégrées de `B1Checkin/assets/labels/` sont utilisées avec remplacement des marqueurs.

Les codes-barres sont générés en SVG en ligne par des encodeurs TypeScript pur situés dans `B1Checkin/src/helpers/barcode.ts` — tables de motifs Code 39 et tables de largeurs Code 128 (jeu B avec somme de contrôle modulo 103), plus QR via le paquet `qrcode`. **Ces encodeurs sont volontairement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, signalé par un commentaire de code) afin que les aperçus de l'éditeur soient identiques pixel pour pixel à la sortie de la borne ; toute modification de l'un doit être reportée dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) affiche chaque étiquette HTML dans un `WebView`, la capture en JPG via `react-native-view-shot`, et transmet les URI d'image au module Expo natif **printer-helper** (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()` et des événements d'état, avec un fournisseur par marque sur les deux plateformes :

| Marque | Android | iOS | Remarques |
|-------|---------|-----|-----------|
| Brother | `BrotherProvider.kt` (SDK d'impression Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau de la série QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes découpées 29×90, option par défaut recommandée |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression d'images TCP/ZPL |

Le choix de l'imprimante se fait dans `app/printers.tsx` (le scan réseau renvoie des entrées `marque~modèle~ip` ; le choix est conservé dans AsyncStorage), et `src/helpers/PrinterLog.ts` tient un journal de diagnostic sur l'appareil, affiché par un voyant d'état en direct dans l'en-tête de la borne.

## Inscription des visiteurs

Deux chemins créent une personne en cours d'enregistrement :

- **À la borne** — le bouton « Ajouter un invité » de l'écran du foyer ouvre `B1Checkin/app/addGuest.tsx`, qui recherche d'abord une correspondance existante parmi les non-membres via `GET /membership/people/search?term=`, sinon crée la personne avec `POST /membership/people`, rattachée au foyer en cours. L'invité suit ensuite l'affectation de groupe comme n'importe quel membre.
- **En libre-service par QR** — lorsque le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres d'enregistrement de B1Admin, lu depuis `GET /membership/settings/public/{churchId}`), l'écran de recherche de la borne affiche un QR code menant à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille de visite de s'inscrire elle-même depuis son téléphone via le point d'accès anonyme `POST /membership/people/guest-register`, ce qui garde la file d'attente de la borne en mouvement. La feuille du QR comporte aussi un bouton **S'inscrire ici** qui ouvre la même page sur la borne (`app/guestRegister.tsx`) dans un `WebView` en navigation privée, sans cache ; `src/helpers/GuestRegisterHelper.ts` construit l'URL pour le QR comme pour le `WebView`, et bloque toute navigation hors de `https://{subdomain}.b1.church/guest-register`. L'écran revient à la recherche sur **Terminé**, au retour arrière, ou après 120 secondes d'inactivité (la saisie dans le formulaire est transmise depuis le `WebView` comme activité), et démonte le `WebView` afin que les saisies d'une famille n'atteignent jamais la suivante.

## Pages connexes

- [Points d'accès Attendance](../api/endpoints/attendance) -- Surface REST complète pour les campus, services, sessions, visites et visitSessions
- [Points d'accès Membership](../api/endpoints/membership) -- Personnes, foyers et groupes
- [Webhooks](../api/webhooks) -- Les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure des modules](../api/module-structure) -- Organisation côté serveur du module de présence
