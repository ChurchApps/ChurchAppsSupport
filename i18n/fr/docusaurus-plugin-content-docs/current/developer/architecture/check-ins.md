---
title: "Pointage"
---

# Pointage

<div class="article-intro">

Le pointage est un seul système avec trois points d'entrée : l'application kiosque B1Checkin pour les postes avec ou sans personnel, l'auto-pointage dans le portail membre B1App, et la présence côté administration dans B1Admin. Les trois écrivent dans le même module de présence de l'API principale, et l'acheminement vers les classes repose entièrement sur les groupes — il n'existe aucune entité distincte « emplacements » ou « salles ». Une couche de sécurité pour les enfants s'ajoute par-dessus : types de pointage par visite, contrôles de capacité et de ratio de bénévoles côté serveur, éligibilité selon l'âge ou le niveau côté kiosque, vérification de la personne autorisée à récupérer l'enfant à la sortie, et messagerie aux parents via le fournisseur de SMS de l'église. Cette page décrit le modèle de données, les flux de pointage, la couche de sécurité et le processus d'impression des étiquettes.

</div>

## Vue d'ensemble

```
┌──────────────────────────┐
│ B1Checkin (kiosque Expo) │──┐         ┌──────────────────────────────────────────────┐
│  recherche → foyer →     │  │         │ Api                                          │
│  groupes → terminer/imp. │  │  HTTPS  │  ┌─ module membership ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ personnes · foyers · groupes            │ │
│ B1App (auto-pointage)    │──┤         │  └─────────────────────────────────────────┘ │
│  écran /mobile/checkin   │  │         │  ┌─ module attendance ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campus → services → serviceTimes        │ │
│ B1Admin (personnel)      │──┘         │  │ groupServiceTimes  (acheminement salles)│ │
│  configuration · rapports│            │  │ sessions ← visitSessions → visits       │ │
│  concepteur d'étiquettes │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Chemin d'impression des étiquettes (kiosque uniquement) :
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modèles d'étiquettes, ou repli HTML intégré)
       └▶ LabelRenderer → document HTML + codes-barres SVG intégrés
            └▶ PrintUI : rendu WebView → capture JPG ViewShot
                 └▶ module natif printer-helper → Brother QL / Zebra
```

| Surface | Dépôt | Pile | Rôle |
|---------|-------|------|------|
| Kiosque | `B1Checkin` | Expo / React Native, routage de fichiers expo-router ; builds EAS pour Android, Amazon Fire et iOS ; mises à jour OTA via `expo-updates` | Poste avec ou sans personnel, avec impression d'étiquettes et sortie vérifiée |
| Auto-pointage | `B1App` | Next.js (portail membre b1.church) | Les membres connectés pointent leur foyer depuis leur téléphone ; pas d'impression |
| Administration | `B1Admin` | SPA React | Configure la structure des services, affecte les groupes aux créneaux, conçoit les étiquettes, enregistre la présence manuelle, génère les rapports |

Les trois appellent les deux mêmes modules d'API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, les foyers et les groupes ; **AttendanceApi** (`/attendance`) pour tout ce qui est décrit ci-dessous.

## Modèle de données (`Api/src/modules/attendance`)

| Entité / table | Champs clés | Signification |
|----------------|-------------|---------------|
| `campuses` | name, address | Obsolète ici — les campus sont gérés dans le module membership (`/membership/campuses`) ; la copie du module de présence est figée en lecture seule pour les anciens lecteurs (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par exemple « Culte du dimanche matin » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un créneau au sein d'un service, par exemple « 9 h 00 » (`models/ServiceTime.ts`). Les colonnes d'horaire sont facultatives (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) et alimentent la [fenêtre de pointage](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jointure : quels groupes (classes) se réunissent à quels créneaux (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date — créée à la demande au moment du pointage (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne présente à une date (`models/Visit.ts`). `checkinType` vaut `member` / `guest` / `volunteer` (NULL = membre historique), défini par le kiosque et utilisé par les contrôles de capacité et de ratio |
| `visitSessions` | visitId, sessionId | Les séances couvertes par une visite — un enfant pointé à deux créneaux obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquettes personnalisables (`models/LabelTemplate.ts`) |

### Comment un pointage terminé est enregistré

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gère `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant des `visitSessions` dont le `session` intégré ne désigne qu'une paire `(serviceTimeId, groupId)`. Le serveur :

1. **Contrôle la capacité et les ratios avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie, pour chaque salle ciblée, la capacité, la capacité d'invités, l'indicateur de fermeture et le ratio de bénévoles par rapport à l'occupation actuelle. postCheckin n'est **pas transactionnel**, donc le contrôle doit s'exécuter avant la première sauvegarde — une violation bloquante renvoie un 409 nommant la ou les salles concernées, et rien n'est enregistré. Voir [Contrôles de capacité et de ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les séances à la demande.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, aujourd'hui)` — les identifiants de séance sont mis en cache dans le processus, par date. Les nouvelles séances émettent un webhook `session.created`. La boucle est un `for..of` avec `await` — un ancien `forEach(async …)` sans attente faisait une course avec la sauvegarde et écrivait des sessionId NULL lors de la création de la première séance (corrigé ; noté dans un commentaire de code à la boucle).
3. **Remplace les enregistrements de la journée.** Les visites existantes de ces personnes pour ce service aujourd'hui sont supprimées avec leurs visitSessions, puis l'ensemble soumis est sauvegardé. Pointer à nouveau une famille est donc une opération idempotente « voici l'état actuel », et non un ajout. Passer `?checkDuplicates=true` renvoie à la place `{ duplicates: [personId…] }` sans rien écrire, ce que le kiosque utilise pour avertir avant d'écraser.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code de 4 caractères à partir de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (sans voyelles ni caractères ambigus, pour que les codes ne forment pas de mots et ne soient pas mal lus). Le serveur réessaie en cas de collision avec les visites ouvertes du jour de la même église, et appose le code sur chaque visite du lot.
5. **Renvoie `{ streaks, securityCode }`.** `streaks` associe chaque personId à son nombre de semaines consécutives de présence ; le kiosque célèbre les jalons (toutes les 5 semaines) avec des confettis.

Chaque visite enregistrée émet aussi un webhook `attendance.recorded`. Le côté lecture, `GET /attendance/visits/checkin`, renvoie les visites des personnes à partir de leur **dernière date enregistrée** — si cette date est une semaine précédente, les identifiants sont retirés, si bien que le client reçoit une copie pré-remplie des choix de salles de la semaine passée, qui seront enregistrés comme de nouveaux enregistrements.

### Sortie

Deux points de terminaison bouclent le cycle (`VisitController`) :

- `GET /attendance/visits/code/:code` — les visites du jour, non encore sorties, portant ce code de sécurité, avec les séances renseignées.
- `POST /attendance/visits/checkout` — corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; renseigne `checkoutTime` et la personne venue récupérer l'enfant, et émet un webhook `attendance.checkout` par visite.

Permissions : les kiosques s'authentifient avec `attendance.checkin`, qui accorde exactement la surface de pointage, de sortie et de modèles d'étiquettes ; `attendance.view` / `attendance.edit` couvrent les rapports et la saisie manuelle ; la structure (services, créneaux, affectations de groupes) exige `services.edit`. L'auto-pointage des membres (B1App) ne demande aucune permission : tout utilisateur authentifié ayant une personne liée dans l'église peut appeler `GET` / `POST /attendance/visits/checkin`, et le serveur restreint les `personId` soumis au foyer de l'appelant (403 sinon — cette barrière empêche de lire les `securityCode` des autres familles). L'appartenance vaut autorisation ; la visibilité de la fonctionnalité pour les membres est contrôlée par les onglets de navigation B1App de l'église. Les autres points de terminaison de pointage (`code/:code`, `checkout`, `guardians`, `CheckinController`) restent réservés au kiosque et au personnel.

## Les groupes déterminent l'acheminement vers les salles

Il n'existe aucune entité salle ou classe dans le système. Une « salle » est un **groupe** de membership avec `trackAttendance` activé, lié à un ou plusieurs créneaux via `groupServiceTimes`. Les champs de groupe (dans `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement du kiosque :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe au suivi de présence ; l'arbre de configuration de B1Admin signale comme non affectés les groupes `trackAttendance` sans ligne `groupServiceTimes` |
| `parentPickup` | Marque une salle d'enfants : y pointer fait de la visite une visite « enfant », qui imprime une étiquette de récupération familiale et place le code de sécurité sur le badge |
| `printNametag` | Indique si les pointages vers ce groupe impriment un badge |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité des salles et interrupteur strict « fermé », appliqués côté serveur par le contrôle de pointage (modifiables dans les paramètres de groupe de B1Admin sous « Check-In Capacity ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants par bénévole et effectif minimal de bénévoles, appliqués selon le paramètre d'église `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Bornes d'éligibilité par âge ou niveau, évaluées côté kiosque pour mettre en évidence ou estomper les salles |

Chaque client dénormalise de la même façon (par ex. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger en parallèle `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups`, puis, pour chaque créneau, rassembler dans `serviceTime.groups` les groupes dont la ligne `groupServiceTimes` pointe vers lui. Ce tableau alimente le sélecteur de salles, organisé par `categoryName` du groupe.

Les affectations se modifient depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST` / `DELETE /attendance/groupservicetimes`), et l'arbre complet Campus → Service → Créneau → Groupe est visualisé dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Comme les groupes sont la source unique de vérité, la même appartenance à un groupe alimente l'acheminement au kiosque, les listes de présence de type appel dans les pages de groupes de B1Admin, et les rapports de présence. Affecter un groupe à un créneau suffit pour en faire une destination de pointage.
:::

## Sécurité des enfants

### Types de pointage

Chaque visite porte un `checkinType` — `member`, `guest` ou `volunteer` (NULL signifie membre historique ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté kiosque** : puces Member / Guest / Volunteer sur la ligne du membre développée (`B1Checkin/src/components/MemberServiceTimes.tsx`), appliquées à chaque visite en attente à la fin (`app/checkinComplete.tsx`, par défaut `member`). Le serveur les exploite dans le contrôle — les bénévoles comptent dans la couverture du ratio au lieu d'être décomptés de la capacité, et les invités comptent dans `guestCapacity`.

### Contrôles de capacité et de ratio de bénévoles

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute dans `postCheckin` avant toute sauvegarde (le point de terminaison n'est pas transactionnel, donc le contrôle avant sauvegarde est le mécanisme de justesse). Il charge l'occupation actuelle de chaque groupe ciblé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe via la passerelle du module membership, puis classe les violations :

- **Bloquant (toujours refusé) :** `checkinClosed`, `current + incoming > capacity`, nombre d'invités supérieur à `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — le kiosque affiche la salle concernée.
- **Ratio (avertissement ou blocage) :** des non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, sans aucun bénévole, ou `children > volunteers × volunteerRatio`. La gravité suit le paramètre d'église `ratioEnforcement` (`"warn"` par défaut / `"block"`, modifiable dans B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). En mode avertissement, le serveur renvoie `409 { warning: true, error: "ratio", … }` sauf si le client renvoie la requête avec `acknowledgeWarnings=true` — ce renvoi est la validation par le personnel au kiosque.

### Fenêtres de pointage programmées

Un créneau de service peut porter un horaire hebdomadaire facultatif (`dayOfWeek` de 0 à 6 avec 0 = dimanche, `startTime` / `endTime` au format `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), modifiable dans le formulaire de créneau **Attendance → Setup** de B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, « Check-in Schedule »). `CheckinGateHelper.hasSchedule()` ne considère un créneau comme programmé que si `dayOfWeek` et `startTime` sont tous deux renseignés ; les créneaux non programmés ne sont jamais limités par l'heure. `isServiceTimeOpen()` calcule la fenêtre en heure locale murale (`DateHelper.toChurchTime`). Le fuseau horaire est déterminé pour chaque créneau par `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) : le `timezone` du campus du service (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) passe en premier, puis le `timeZone` de l'église (défini dans Church Information de B1Admin), puis le premier campus non supprimé ayant un `timezone` (`loadCampusTimeZone`), et seulement ensuite `America/New_York`. Le campus passe en premier car la plupart des églises avaient `America/New_York` renseigné rétroactivement comme fuseau de l'église. Les chemins de listage et d'envoi ci-dessous résolvent le fuseau de la même façon. La fenêtre va de `checkinOpenMinutes` avant le début à `checkinCloseMinutes` après la fin (ou après le début s'il n'y a pas de fin), en gérant les fenêtres qui traversent minuit ou la limite de la semaine.

La fenêtre est appliquée à deux endroits :

- **Listage :** `GET /attendance/servicetimes` ajoute à chaque ligne un booléen calculé `checkinOpen`. L'auto-pointage de B1App (`CheckinPage.tsx`) et le sélecteur de service de B1Checkin (`app/services.tsx`) conservent tous les créneaux. Quand tous les créneaux d'un service sont fermés, ils affichent la prochaine ouverture (« Check-in opens Sun 9:30 AM. » dans B1App, « Check-in for this service opens Sun 9:30 AM. » dans B1Checkin, à partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), avec, à défaut de pouvoir calculer une ouverture, « Check-in isn't open for this service right now. » (le kiosque propose alors un bouton Retour pour choisir un autre service). Sinon, les créneaux fermés s'affichent sous forme de ligne « Closed » / « Closed · opens 9:30 AM » non sélectionnable. L'écran du foyer dans B1Checkin (`MemberServiceTimes.tsx`) réévalue l'ouverture en direct sur l'horloge de l'appareil avec `ServiceTimeHelper.isCheckinOpen()` (fuseau horaire de l'appareil, et non celui de l'église) afin qu'un kiosque laissé allumé s'ouvre et se ferme à l'heure, et affiche « Kids Room 1 · Checked in » (nom du groupe) sur un créneau fermé que la personne détient déjà.
- **Envoi :** dans `evaluateGates()`, avant l'évaluation de capacité et de ratio, `findClosedServiceTimeGroups()` rejette le lot avec `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si le créneau d'une séance ciblée est hors de sa fenêtre. Comme les visites existantes d'un foyer pour aujourd'hui sont renvoyées à chaque pointage, les séances déjà détenues par la personne (`personId|sessionId` dans les visites existantes) passent outre ce contrôle, afin qu'ajouter un créneau ultérieur ouvert ne soit pas refusé parce qu'une fenêtre antérieure s'est fermée. B1Checkin affiche cela via son écran de blocage avec la raison « check-in isn't open right now » (les violations de capacité affichent toujours « room is full or closed »).

### Éligibilité par âge et niveau (côté kiosque)

L'éligibilité des salles est une aide à l'interface, évaluée sur le kiosque et non imposée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance et le niveau d'une personne aux bornes `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` du groupe (ordre des niveaux : PreK, K, 1–12, Graduated) et renvoie `eligible` / `ineligible` / `unknown` — une donnée manquante donne `unknown` et ne masque jamais une salle. L'âge et le niveau sont calculés à la **date de passage au niveau supérieur** de l'église (paramètre `gradePromotionDate`, `"MM-DD"`, modifiable dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; le kiosque la récupère depuis `GET /attendance/checkin/settings`, et `resolveAsOfDate` retient l'occurrence la plus récente à la date du jour ou antérieure. Le sélecteur de salles met en évidence les salles éligibles et estompe les salles non éligibles ; choisir une salle estompée exige une validation par le personnel.

### Personnes autorisées et non autorisées à récupérer l'enfant

Les personnes autorisées à venir chercher un enfant sont une entité du membership, par foyer : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId facultatif, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le CRUD passe par `GET /membership/householdpickup/:householdId` (tout utilisateur d'église authentifié, afin que les kiosques puissent le lire) ainsi que `POST` / `DELETE` protégés par `people.edit`. Le personnel gère la liste sur la carte **Pickup** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, lien de parenté et une puce de statut Trusted / Not Authorized.

À la sortie (`B1Checkin/app/checkout.tsx`), le kiosque charge la liste de récupération du foyer : les entrées `trusted` s'affichent sous forme de cartes cliquables à côté de la grille de photos des adultes du foyer, et un nom saisi librement « Other » est comparé par approximation (distance de Levenshtein, `src/helpers/PickupMatchHelper.ts`) aux entrées `notAuthorized` — une correspondance bloque la sortie avec une feuille d'avertissement et un bouton **Override** réservé au personnel. La dérogation est consignée sur la visite elle-même : elle envoie `checkedOutBy` sous la forme `"OVERRIDE: {name}"` via le `POST /attendance/visits/checkout` habituel, de sorte qu'elle figure dans le registre de présence et dans le webhook `attendance.checkout`, plutôt que dans une table d'audit séparée.

### Alerte aux parents et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` — `{ visitId, message }` : alerte les tuteurs d'un enfant pointé (écran de sortie du kiosque, mode avec personnel).
- `POST /broadcast` — `{ serviceId, message }` : envoie un SMS aux adultes de chaque foyer pointé pour un service (paramètres d'administration du kiosque, derrière une feuille de confirmation où il faut saisir `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du foyer via la passerelle membership, puis confient l'envoi à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porte inter-modules vers le fournisseur de messagerie texte configuré par l'église (`@churchapps/texting` : TextInChurch, Clearstream ou MutualMinistry ; il n'existe aucun expéditeur SMS intégré). La passerelle enregistre une ligne `sentText` ainsi que des entrées `deliveryLog` par destinataire, et limite un lot à 500 destinataires ; sans fournisseur configuré, elle renvoie `no_provider`, que le kiosque affiche comme « No SMS provider configured ». Le `dispatch()` du contrôleur dédoublonne les numéros de téléphone et ignore les personnes sans mobile ou marquées `optedOut`, en renvoyant `{ sent, failed, skippedOptedOut, skippedNoPhone }` pour que le kiosque puisse indiquer ce qui a été ignoré.

## Le kiosque (B1Checkin)

Les écrans sont des fichiers expo-router sous `B1Checkin/app/` ; l'état partagé entre écrans vit dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), et non dans l'état React.

```
index (démarrage / connexion automatique) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             charge serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ imprime les étiquettes,
             groupServiceTimes,           │             └▶ checkout (avec personnel)   retour automatique
             labelTemplates               │                                            à lookup
```

1. **Recherche** (`app/lookup.tsx`) — recherche par téléphone (`GET /membership/people/search/phone?number=`, quatre derniers chiffres ou numéro complet) ou par nom (`GET /membership/people/search?term=`). Sélectionner une correspondance charge le foyer (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), et pré-remplit `pendingVisits` avec les choix de la semaine passée.
2. **Revue du foyer** (`app/household.tsx`, `src/components/MemberList.tsx`) — chaque ligne de membre affiche un badge « déjà pointé », un badge allergie / `nametagNotes`, et ses puces de salle actuelles. En développant un membre, on voit chaque créneau avec un bouton de salle, ainsi que les puces de type de pointage Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Sous le nom de chaque créneau, `ServiceTimeHelper.getGroupSummary()` affiche les groupes proposés là (les noms de `serviceTime.groups`, épurés, dédoublonnés sans tenir compte de la casse, séparés par des virgules) ; rien ne s'affiche si le créneau n'a aucun groupe.
3. **Affectation au groupe** (`app/selectGroup.tsx`) — un arbre par catégorie construit à partir de `serviceTime.groups`, les salles éligibles selon l'âge ou le niveau étant mises en évidence et les non éligibles estompées derrière une confirmation du personnel (voir [Éligibilité par âge et niveau](#agegrade-eligibility-kiosk-side)) ; choisir une salle inscrit une visitSession `{ session: { serviceTimeId, groupId } }` dans la visite en attente de la personne (`src/helpers/VisitSessionHelper.ts`). « None » la supprime.
4. **Terminer** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` avec `pendingVisits` (chacune portant son `checkinType`), puis impression des étiquettes si une imprimante est configurée, et retour automatique à la recherche. Une réponse `409` de capacité ou `notOpen` affiche la salle concernée avec la raison (pleine ou fermée, ou pointage non ouvert) ; un avertissement de ratio propose une confirmation du personnel qui renvoie la requête avec `acknowledgeWarnings=true`.

L'écran de **sortie** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères dans un champ à focus automatique — ainsi les lecteurs de codes-barres USB ou Bluetooth fonctionnent sans caméra — ou un clavier à l'écran utilisant le même alphabet, avec envoi automatique à 4 caractères. Un bouton **Scan** ouvre une feuille avec la caméra partagée `src/components/CodeScanner.tsx` (caméra arrière par défaut, acceptant QR, Code 128 et Code 39), afin que les postes sans lecteur de codes puissent lire l'étiquette de récupération ; un code scanné passe par le même chemin `handleCode()` que la saisie. L'écran recherche le code, affiche les enfants à récupérer, et présente les **personnes autorisées** du foyer sous forme de cartes cliquables, à côté d'une grille de photos des adultes du foyer (plus une option libre « Other » vérifiée par approximation contre les noms non autorisés — voir [Personnes autorisées et non autorisées](#trusted-and-not-authorized-pickup)), puis envoie `POST /attendance/visits/checkout` avec le nom et l'identifiant choisis. En mode avec personnel, l'écran propose aussi **Page a parent** (`POST /attendance/checkin/page`) et une **réimpression de l'étiquette de sécurité** — `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les envoie par le même pipeline `PrintUI` que le pointage.

Le mode du poste est un indicateur AsyncStorage `@StationMode` (`"self"` | `"manned"`, modifiable dans `app/adminSettings.tsx`). Le mode avec personnel ajoute le point d'entrée de sortie sur l'écran de recherche, ainsi que la modification du profil de chaque membre (`POST /membership/people`) depuis l'écran du foyer. Le durcissement du kiosque est intégré : un code PIN facultatif (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protège les écrans d'administration et d'imprimante, l'écran d'administration ne s'ouvre qu'après 7 appuis rapides sur le logo de l'en-tête, et un écran d'accueil d'inactivité (`src/hooks/useInactivityTimer.ts`) prend le relais entre deux familles.

## Auto-pointage (B1App)

Les membres pointent depuis le portail b1.church à l'écran `/mobile/checkin` (acheminé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Une connexion est requise, et le parcours suit les mêmes quatre étapes que le kiosque — services → foyer → groupes → terminer — avec les mêmes points de terminaison, l'état étant conservé dans `B1App/src/helpers/CheckinHelper.ts`. Différences avec le kiosque : le foyer provient du `householdId` de l'utilisateur connecté (pas d'étape de recherche), et il n'y a aucune impression d'étiquette. À la place, l'écran de fin affiche le code de sécurité du lot sous forme de QR (`qrcode.react`) avec l'indication « show this at a check-in station ». Si le foyer est déjà pointé au chargement de la page, un bouton « Show check-in code » réaffiche le QR à partir de la première visite existante (issue de `GET /attendance/visits/checkin`) qui porte un `securityCode`. Le pointage est enregistré immédiatement à l'envoi (il n'y a pas d'état en attente) ; le QR ne sert qu'à déclencher l'impression des étiquettes au kiosque.

**Impression sur le kiosque depuis le téléphone** (`B1Checkin/app/scan.tsx`, accessible via le bouton « Scan code » du QR sur l'écran de recherche) : le kiosque affiche `CodeScanner` (un `CameraView` d'`expo-camera`, caméra frontale par défaut, inversable) qui lit les QR. `ScanCodeHelper.parse()` n'accepte une charge utile que si elle est un code nu de 4 caractères de l'alphabet des codes de sécurité, et `ScanCodeHelper.isRepeat()` ignore le même code pendant 4 secondes, ce qui fait fonctionner aussi bien le QR de B1App que le bloc QR d'une étiquette imprimée. L'écran suit ensuite le chemin de réimpression de la sortie — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — puis retourne à la recherche. Aucune écriture de présence n'a lieu au moment du scan ; uniquement les étiquettes. Les codes sans visite active, les postes sans imprimante et les groupes sans étiquette affichent chacun une notification et retournent à la recherche.

Les types, ainsi que `ApiHelper` / `ArrayHelper`, proviennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présence côté administration (B1Admin)

- **Configuration** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) affiche l'arbre de structure et permet de créer des services (`ServiceEdit.tsx`) et des créneaux (`ServiceTimeEdit.tsx`). Les données de campus proviennent du membership via le hook `useCampuses()`.
- **La présence manuelle** se trouve côté Groupes, et non dans la section Présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée les séances (`POST /attendance/sessions` ; à l'ajout, `SessionEdit.tsx` peut inclure une séance pour chaque autre groupe partageant le créneau choisi, en ignorant les groupes qui ont déjà une séance à cette date) et marque les personnes présentes via `POST /attendance/visitsessions/log`, qui trouve ou crée la visite de cette personne pour cette séance. Les responsables de groupe peuvent enregistrer la présence de leurs propres groupes sans la permission `attendance.edit` — les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapports** — la tendance de présence et la présence par groupe sont des rapports définis côté serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` avec ReportingApi ; définitions dans `Api/reports/*.json`). Les deux acceptent `startDate` / `endDate` (date de fin incluse) ; le rapport de tendance va par défaut d'il y a un an à aujourd'hui et ajoute une colonne `sessionDates` par semaine, et l'arbre affiché de présence par groupe inclut le `checkinTime` de chaque visite et le `membershipStatus` de la personne. Le CSV de présence par groupe provient du rapport compagnon `groupAttendanceDownload`, pivoté par `GroupAttendanceDownloadHelper` en une ligne par membre du groupe, avec une colonne présent / absent par séance datée ; l'historique par personne est `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression des étiquettes

### Modèles et concepteur

Les églises conçoivent leurs propres étiquettes dans B1Admin à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accessible depuis la page des paramètres de pointage). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs — `text`, `field`, `barcode`, `qrcode` ou `box` — chacun positionné en pourcentages, avec police, alignement, symbologie (`code39` / `code128` / `qr`) et conditions de visibilité facultatives (par exemple n'afficher la case allergie que si `person.nametagNotes` n'est pas vide). Deux `labelType` existent : `nametag` (un par personne pointée ; champs comme `person.displayName`, `sessions`, `securityCode`, et `person.isBirthdayWeek` — `"true"` lorsque le mois et le jour de l'anniversaire sont à 3 jours d'aujourd'hui, en tenant compte du passage d'année, calculé par `LabelHelper.isBirthdayWithin()`) et `pickup` (un par famille ; champs comme `children`, `childrenAllergies`). Le serveur impose un seul modèle par défaut par type et par église (`LabelTemplateController.save`). Le concepteur fournit des modèles de départ reprenant les étiquettes intégrées du kiosque, et propose un aperçu sur des données d'exemple.

### Rendu et impression sur le kiosque

À la fin du pointage, `B1Checkin/src/helpers/LabelHelper.ts` décide quoi imprimer à partir des indicateurs de groupe de chaque visite en attente : des badges pour les groupes `printNametag`, plus une étiquette de récupération familiale unique si une visite a touché un groupe `parentPickup`. Les visites de `checkinType` `volunteer` sont ignorées par `LabelHelper.selectChildVisits()`, si bien qu'un bénévole de garderie dans une salle Parent Pickup ne déclenche jamais d'étiquette de récupération. Le code de sécurité de la réponse de pointage est placé sur les badges des enfants et sur l'étiquette de récupération ; les badges des adultes s'impriment sans code. Si l'église a des modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs et un contexte de champs en document HTML autonome ; sinon, les étiquettes HTML intégrées de `B1Checkin/assets/labels/` sont utilisées avec remplacement des espaces réservés.

Les codes-barres sont générés en SVG intégré par des encodeurs TypeScript purs dans `B1Checkin/src/helpers/barcode.ts` — tables de motifs Code 39 et tables de largeurs Code 128 (jeu B avec somme de contrôle modulo 103), plus QR via le paquet `qrcode`. **Ces encodeurs sont volontairement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, comme indiqué dans un commentaire de code) afin que les aperçus du concepteur correspondent pixel pour pixel à la sortie du kiosque ; toute modification de l'un doit être répercutée dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans un `WebView`, la capture en JPG avec `react-native-view-shot`, et transmet les URI d'image au module Expo natif **printer-helper** (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()` et des événements d'état, avec un fournisseur par marque sur les deux plateformes :

| Marque | Android | iOS | Remarques |
|-------|---------|-----|-----------|
| Brother | `BrotherProvider.kt` (SDK d'impression Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau de la série QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes découpées 29×90, la valeur par défaut recommandée |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau et impression d'images TCP / ZPL |

La sélection de l'imprimante se fait dans `app/printers.tsx` (le scan réseau renvoie des entrées `brand~model~ip` ; le choix est conservé dans AsyncStorage), et `src/helpers/PrinterLog.ts` tient un journal de diagnostic sur l'appareil, affiché via un voyant d'état en direct dans l'en-tête du kiosque.

## Inscription des visiteurs

Deux chemins créent une personne en cours de pointage :

- **Au kiosque** — « Add guest » sur l'écran du foyer ouvre `B1Checkin/app/addGuest.tsx`, qui recherche d'abord `GET /membership/people/search?term=` une correspondance existante non membre, sinon en crée une avec `POST /membership/people`, rattachée au foyer en cours. L'invité suit ensuite l'affectation de groupe comme n'importe quel membre.
- **En libre-service via QR** — lorsque le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres de pointage de B1Admin, lu depuis `GET /membership/settings/public/{churchId}`), l'écran de recherche du kiosque affiche un QR code menant à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille visiteuse de s'inscrire depuis son propre téléphone via le point de terminaison anonyme `POST /membership/people/guest-register`, ce qui fait avancer la file au kiosque. La feuille du QR comporte aussi un bouton **Register here** qui ouvre la même page sur le kiosque (`app/guestRegister.tsx`) dans un `WebView` en navigation privée, sans cache ; `src/helpers/GuestRegisterHelper.ts` construit l'URL pour le QR et pour le WebView, et bloque la navigation hors de `https://{subdomain}.b1.church/guest-register`. L'écran revient à la recherche au bouton **Done**, au retour arrière, ou après 120 secondes d'inactivité (la saisie dans le formulaire est transmise depuis le WebView comme activité), en démontant le WebView pour que les saisies d'une famille n'atteignent jamais la suivante.

L'inscription par QR est pilotée par les paramètres d'église enregistrés depuis la carte **QR Guest Registration** de B1Admin (`src/mobile/CheckInPage.tsx`) :

| Paramètre | Visibilité | Rôle |
|---|---|---|
| `enableQRGuestRegistration` | public | Interrupteur d'activation du QR du kiosque et des points de terminaison anonymes |
| `guestRegistrationFields` | public | Dictionnaire JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Par défaut : e-mail et téléphone facultatifs, le reste désactivé. Le prénom et le nom sont toujours obligatoires |
| `guestRegistrationImage` | public | URL de la photo d'en-tête ; B1App l'affiche en 16:9 à la place de l'icône sur le formulaire et l'écran de confirmation |
| `guestRegistrationGroupId` | private | Groupe auquel chaque inscription est ajoutée (les visiteurs ne le voient ni ne le choisissent jamais) |
| `guestRegistrationRecordAttendance` | private | `"true"` pour enregistrer aussi la présence à ce groupe |

`src/components/checkin/GuestRegister.tsx` de B1App récupère la liste de contrôle via le point de terminaison anonyme `GET /membership/people/guest-register/options?churchId=` et n'affiche que les champs inclus (e-mail, téléphone, état civil et adresse pour le contact principal ; date de naissance, genre et niveau pour chaque membre ; une seule case de commentaires), en n'envoyant que ceux-là. Le serveur réapplique la liste dans `GuestRegistrationHelper.sanitize()` — les champs désactivés sont retirés, les valeurs obligatoires manquantes ou hors liste donnent une erreur 400 — avant que `PersonHelper.registerGuestHousehold()` ne crée un nouveau foyer (sans déduplication par e-mail) où chaque membre porte `membershipStatus: "Visitor"`, en émettant `person.created` pour chacun. Ensuite, les échecs sont journalisés plutôt que renvoyés : les membres sont ajoutés au groupe configuré (`group.member.added`) ; si l'enregistrement de présence est activé, `AttendanceModuleGateway.recordAttendance()` marque chaque membre présent à chaque créneau du groupe qui est programmé et dont la fenêtre de pointage (`CheckinGateHelper.isServiceTimeOpen`) est ouverte à l'instant, en créant la séance pour la date locale de l'église si nécessaire — les créneaux non programmés et les inscriptions hors fenêtre n'enregistrent rien ; et les commentaires deviennent une conversation de note de personne masquée sur le chef de foyer (auteur du message « Guest sign-up »), reliée par `person.conversationId`.

## Pages connexes

- [Points de terminaison de présence](../api/endpoints/attendance) -- Référence REST complète pour les campus, services, séances, visites et visites-séances
- [Points de terminaison du membership](../api/endpoints/membership) -- Personnes, foyers et groupes
- [Webhooks](../api/webhooks) -- Les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure des modules](../api/module-structure) -- Organisation côté serveur du module de présence
