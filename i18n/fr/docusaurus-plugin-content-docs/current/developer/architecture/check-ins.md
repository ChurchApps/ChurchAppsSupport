---
title: "Pointages"
---

# Pointages

<div class="article-intro">

Le pointage est un système unique accessible par trois portes d'entrée : l'application-borne B1Checkin pour les postes avec ou sans personnel, le pointage autonome dans le portail des membres B1App, et la présence côté administration dans B1Admin. Les trois écrivent dans le même module de présences de l'Api principale, et l'acheminement vers les salles de classe est entièrement piloté par les groupes -- il n'existe aucune entité distincte de « lieux » ou de « salles ». Une couche de sécurité pour les enfants s'ajoute par-dessus : types de pointage par visite, contrôles de capacité et de ratio de bénévoles côté serveur, admissibilité selon l'âge ou le niveau côté borne, vérification du ramassage de confiance au départ, et avis aux parents par le fournisseur de messages texte de l'église. Cette page décrit le modèle de données, les flux de pointage, la couche de sécurité et le processus d'impression des étiquettes.

</div>

## Vue d'ensemble

```
┌──────────────────────────┐
│ B1Checkin (borne Expo)   │──┐         ┌──────────────────────────────────────────────┐
│  recherche → foyer →     │  │         │ Api                                          │
│  groupes → terminer/imp. │  │  HTTPS  │  ┌─ module membership ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ personnes · foyers · groupes            │ │
│ B1App (pointage autonome)│──┤         │  └─────────────────────────────────────────┘ │
│  écran /mobile/checkin   │  │         │  ┌─ module attendance ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campus → services → horaires de service │ │
│ B1Admin (personnel)      │──┘         │  │ groupServiceTimes  (acheminement salles)│ │
│  configuration · rapports│            │  │ sessions ← visitSessions → visits       │ │
│  concepteur d'étiquettes │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Chemin d'impression des étiquettes (borne seulement) :
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modèles d'étiquettes, ou repli HTML intégré)
       └▶ LabelRenderer → document HTML + codes-barres SVG intégrés
            └▶ PrintUI : rendu WebView → capture JPG ViewShot
                 └▶ module natif printer-helper → Brother QL / Zebra
```

| Surface | Dépôt | Pile | Rôle |
|---------|-------|------|------|
| Borne | `B1Checkin` | Expo / React Native, routage de fichiers expo-router ; compilations EAS pour Android, Amazon Fire et iOS ; mises à jour OTA par `expo-updates` | Poste avec ou sans personnel, avec impression d'étiquettes et départ vérifié |
| Pointage autonome | `B1App` | Next.js (portail des membres b1.church) | Les membres connectés pointent leur foyer depuis un téléphone ; aucune impression |
| Administration | `B1Admin` | SPA React | Configure la structure des services, affecte les groupes aux horaires de service, conçoit les étiquettes, enregistre les présences manuelles, produit les rapports |

Les trois appellent les mêmes deux modules de l'API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, les foyers et les groupes ; **AttendanceApi** (`/attendance`) pour tout le reste.

## Modèle de données (`Api/src/modules/attendance`)

| Entité / table | Champs clés | Signification |
|----------------|-----------|---------|
| `campuses` | name, address | Déprécié ici -- les campus sont gérés dans le module membership (`/membership/campuses`) ; la copie du module attendance est figée en lecture seule pour les lecteurs existants (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par exemple « Culte du dimanche matin » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un créneau horaire à l'intérieur d'un service, par exemple « 9 h 00 » (`models/ServiceTime.ts`). Les colonnes de calendrier sont facultatives (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) et déterminent la [fenêtre de pointage](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jonction : quels groupes (salles de classe) se réunissent à quels horaires de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date donnée — créée paresseusement au moment du pointage (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne présente à une date donnée (`models/Visit.ts`). `checkinType` vaut `member` / `guest` / `volunteer` (NULL = membre hérité), défini par la borne et utilisé par les contrôles de capacité et de ratio |
| `visitSessions` | visitId, sessionId | Les séances couvertes par une visite -- un enfant pointé à deux horaires de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquettes conçues sur mesure (`models/LabelTemplate.ts`) |

### Comment un pointage terminé est enregistré

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gère `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant des `visitSessions` dont la `session` intégrée ne nomme qu'un couple `(serviceTimeId, groupId)`. Le serveur :

1. **Vérifie la capacité et les ratios avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie, pour chaque salle ciblée, la capacité, la capacité d'invités, l'indicateur de fermeture et le ratio de bénévoles par rapport à l'occupation actuelle. postCheckin **n'est pas transactionnel**, donc le contrôle doit s'exécuter avant la première sauvegarde — une violation grave renvoie un 409 nommant la ou les salles en cause, et rien n'est enregistré. Voir [Contrôles de capacité et de ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les séances paresseusement.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, aujourd'hui)` — les identifiants de séance sont mis en cache dans le processus par date. Les nouvelles séances émettent un webhook `session.created`. La boucle est un `for..of` attendu — un ancien `forEach(async …)` sans attente faisait concurrence à la sauvegarde et écrivait des sessionIds NULL à la création de la première séance (corrigé ; une note de code à la boucle le signale).
3. **Remplace les enregistrements du jour.** Toutes les visites existantes de ces personnes à ce service aujourd'hui sont supprimées avec leurs visitSessions, puis l'ensemble soumis est enregistré. Un nouveau pointage d'une famille est donc une opération idempotente « voici l'état actuel », et non un ajout. Passer `?checkDuplicates=true` renvoie plutôt `{ duplicates: [personId…] }` sans rien écrire, ce qui permet à la borne d'avertir avant d'écraser.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code de 4 caractères à partir de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (sans voyelles ni caractères ambigus, pour que les codes ne forment pas de mots et ne soient pas mal lus). Le serveur réessaie en cas de collision avec les visites ouvertes du même jour pour la même église, et appose le code sur chaque visite du lot.
5. **Renvoie `{ streaks, securityCode }`.** `streaks` associe à chaque personId le nombre de semaines consécutives de présence ; la borne célèbre les jalons (toutes les 5 semaines) avec des confettis.

Chaque visite enregistrée émet aussi un webhook `attendance.recorded`. Le côté lecture, `GET /attendance/visits/checkin`, renvoie les visites des personnes à partir de leur **dernière date enregistrée** — si celle-ci date d'une semaine précédente, les identifiants sont retirés, et le client reçoit une copie préremplie des choix de salles de la semaine précédente qui seront enregistrés comme de nouveaux enregistrements.

### Départ

Deux points de terminaison bouclent le cycle (`VisitController`) :

- `GET /attendance/visits/code/:code` — les visites du jour non encore parties portant ce code de sécurité, avec les séances renseignées.
- `POST /attendance/visits/checkout` — corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; renseigne `checkoutTime` et la personne qui a ramassé l'enfant, et émet un webhook `attendance.checkout` par visite.

Autorisations : les bornes s'authentifient avec `attendance.checkin`, qui accorde exactement la surface de pointage, de départ et de modèles d'étiquettes, ainsi que les recherches de foyer dont une borne a besoin sans `people.view` (recherche par téléphone ou par nom, membres du foyer dans le modèle de pointage, et liste des personnes autorisées à ramasser). `SessionHelper.filterChurches` de B1Checkin ne propose que les églises où le compte détient `Attendance/Checkin` ou `Attendance/Edit`. `Checkin` ne fait plus partie des autorisations « Tout le monde » (rôle nul) (`RoleHelper` et la migration `2026-11-01_remove_everyone_checkin`) ; il doit donc être accordé par un vrai rôle. `attendance.view`/`attendance.edit` couvrent les rapports et la saisie manuelle ; la structure (services, horaires de service, affectations de groupes) exige `services.edit`. Le pointage autonome du membre (B1App) n'exige aucune autorisation : tout utilisateur authentifié ayant une personne liée dans l'église peut appeler `GET`/`POST /attendance/visits/checkin`, et le serveur limite les `personId` soumis au foyer de l'appelant (403 sinon) — cette barrière empêche de lire les `securityCode` des autres familles. L'appartenance est l'autorisation ; le fait que les membres *voient* la fonction est contrôlé par les onglets de navigation B1App de l'église. Les autres points de terminaison de pointage (`code/:code`, `checkout`, `guardians`, `CheckinController`) restent réservés aux bornes et au personnel.

## Les groupes pilotent l'acheminement vers les salles

Il n'existe aucune entité « salle » ou « classe » dans le système. Une « salle » est un **groupe** de membership dont `trackAttendance` est activé, lié à un ou plusieurs horaires de service par `groupServiceTimes`. Les champs du groupe (dans `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement de la borne :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe aux présences ; l'arbre de configuration de B1Admin signale les groupes `trackAttendance` sans ligne `groupServiceTimes` comme non affectés |
| `parentPickup` | Marque une salle d'enfants : y pointer fait de la visite une visite « enfant », qui imprime une étiquette de ramassage familial et place le code de sécurité sur l'étiquette nominative |
| `printNametag` | Indique si les pointages vers ce groupe impriment une étiquette nominative |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité des salles et interrupteur « fermé » strict, appliqués côté serveur par le contrôle de pointage (modifiés dans les paramètres de groupe de B1Admin, sous « Capacité de pointage ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants par bénévole et effectif minimal de bénévoles, appliqués selon le paramètre d'église `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Bornes d'admissibilité selon l'âge et le niveau, évaluées côté borne pour mettre en évidence ou estomper les salles |

Chaque client dénormalise de la même façon (par exemple `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger en parallèle `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups`, puis pour chaque horaire de service rassembler dans `serviceTime.groups` les groupes dont la ligne `groupServiceTimes` pointe vers cet horaire. Ce tableau est ce qu'affiche le sélecteur de salles, organisé par `categoryName` du groupe.

Les affectations se modifient depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), et l'arborescence complète Campus → Service → Horaire de service → Groupe est visualisée dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Parce que les groupes sont l'unique source de vérité, la même appartenance à un groupe alimente l'acheminement à la borne, la présence de type liste dans les pages de groupe de B1Admin et les rapports de présence — affecter un groupe à un horaire de service est la seule étape nécessaire pour en faire une destination de pointage.
:::

## Sécurité des enfants

### Types de pointage {#check-in-types}

Chaque visite porte un `checkinType` — `member`, `guest` ou `volunteer` (NULL signifie hérité/membre ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté borne** : puces Membre / Visiteur / Bénévole sur la ligne du membre déployée (`B1Checkin/src/components/MemberServiceTimes.tsx`), apposé sur chaque visite en attente à la fin (`app/checkinComplete.tsx`, valeur par défaut `member`). Le serveur l'utilise dans le contrôle : les bénévoles comptent dans la couverture du ratio au lieu de compter contre la capacité, et les visiteurs comptent contre `guestCapacity`.

### Contrôles de capacité et de ratio de bénévoles {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute dans `postCheckin` avant toute sauvegarde (le point de terminaison n'est pas transactionnel, donc le contrôle avant écriture est le mécanisme de correction). Il charge l'occupation actuelle par groupe visé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe par la passerelle du module membership, puis classe les violations :

- **Stricte (bloque toujours) :** `checkinClosed`, `actuel + entrant > capacity`, nombre d'invités au-delà de `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — la borne affiche la salle concernée.
- **Ratio (avertissement ou blocage) :** les non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, aucun bénévole, ou `children > volunteers × volunteerRatio`. La gravité suit le paramètre d'église `ratioEnforcement` (`"warn"` par défaut / `"block"`, modifiable dans B1Admin, Gérer l'église → Pointage, `CheckinSettingsEdit.tsx`). En mode avertissement, renvoie `409 { warning: true, error: "ratio", … }` sauf si le client renvoie la requête avec `acknowledgeWarnings=true` — cette nouvelle soumission est la dérogation confirmée par le personnel à la borne.

### Fenêtres de pointage planifiées {#scheduled-check-in-windows}

Un horaire de service peut porter un calendrier hebdomadaire facultatif (`dayOfWeek` de 0 à 6, 0 = dimanche, `startTime`/`endTime` au format `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), modifiable dans le formulaire d'horaire de service de B1Admin, **Présences → Configuration** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, « Calendrier de pointage »). `CheckinGateHelper.hasSchedule()` ne considère un horaire de service comme planifié que lorsque `dayOfWeek` et `startTime` sont tous deux définis ; les horaires non planifiés ne sont jamais limités dans le temps. `isServiceTimeOpen()` calcule la fenêtre en heure murale locale (`DateHelper.toChurchTime`). Le fuseau horaire est résolu pour chaque horaire de service par `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) : le `timezone` du campus du service (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) passe en premier, puis le `timeZone` de l'église (défini dans Renseignements de l'église de B1Admin), puis le premier campus non supprimé ayant un `timezone` (`loadCampusTimeZone`), et seulement ensuite `America/New_York`. Le campus passe en premier parce que la plupart des églises avaient `America/New_York` rétroactivement inscrit comme fuseau de l'église. Les chemins de liste et d'envoi ci-dessous résolvent le fuseau de la même façon. La fenêtre va de `checkinOpenMinutes` avant le début jusqu'à `checkinCloseMinutes` après la fin (ou après le début s'il n'y a pas de fin), en gérant les fenêtres qui franchissent minuit ou la frontière de la semaine.

La fenêtre est appliquée à deux endroits :

- **Listage :** `GET /attendance/servicetimes` estampille chaque ligne d'un booléen calculé `checkinOpen`. Le pointage autonome de B1App (`CheckinPage.tsx`) et le sélecteur de service de B1Checkin (`app/services.tsx`) conservent chaque horaire. Lorsque tous les horaires d'un service sont fermés, ils affichent la prochaine ouverture (« Le pointage ouvre dim. 9 h 30 » dans B1App, « Le pointage pour ce service ouvre dim. 9 h 30 » dans B1Checkin, à partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), avec, à défaut de calcul possible d'une ouverture, « Le pointage n'est pas ouvert pour ce service pour le moment. » (la borne propose un bouton Retour pour choisir un autre service). Sinon, les horaires fermés s'affichent comme une ligne non sélectionnable « Fermé » / « Fermé · ouvre 9 h 30 ». L'écran du foyer de B1Checkin (`MemberServiceTimes.tsx`) réévalue en direct l'ouverture selon l'horloge de l'appareil avec `ServiceTimeHelper.isCheckinOpen()` (fuseau horaire de l'appareil, et non celui de l'église) de sorte qu'une borne laissée en marche s'ouvre et se ferme à l'heure, et affiche « Salle des enfants 1 · Pointé » (nom du groupe) sur un horaire fermé que la personne détient déjà.
- **Envoi :** dans `evaluateGates()`, avant l'évaluation de capacité et de ratio, `findClosedServiceTimeGroups()` rejette le lot avec `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si l'horaire de service de l'une des séances visées est hors de sa fenêtre. Comme les visites existantes d'un foyer pour aujourd'hui sont renvoyées à chaque pointage, les séances que la personne détient déjà (`personId|sessionId` dans les visites existantes) passent ce contrôle, de sorte qu'ajouter un horaire de service ultérieur ouvert n'est pas refusé parce qu'une fenêtre antérieure s'est fermée. B1Checkin présente cela sur son écran de contrôle strict avec la raison « le pointage n'est pas ouvert pour le moment » (les violations de capacité affichent toujours « la salle est pleine ou fermée »).

### Admissibilité selon l'âge et le niveau (côté borne) {#agegrade-eligibility-kiosk-side}

L'admissibilité aux salles est une interface consultative, évaluée sur la borne, et non imposée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance et le niveau d'une personne aux champs `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre des niveaux : PreK, K, 1 à 12, Graduated) et renvoie `eligible` / `ineligible` / `unknown` — une donnée manquante donne `unknown` et ne masque jamais une salle. L'âge et le niveau se calculent à la **date de promotion des niveaux** de l'église (paramètre `gradePromotionDate`, `"MM-DD"`, modifié dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; la borne le récupère depuis `GET /attendance/checkin/settings`, et `resolveAsOfDate` choisit l'occurrence la plus récente à la date du jour ou avant. Le sélecteur de salles met en évidence les salles admissibles et estompe les salles non admissibles ; choisir une salle estompée exige une confirmation du personnel.

### Ramassage de confiance et ramassage non autorisé {#trusted-and-not-authorized-pickup}

Les personnes autorisées à ramasser sont une entité du module membership, par foyer : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId facultatif, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le CRUD est `GET /membership/householdpickup/:householdId` (tout utilisateur authentifié de l'église, afin que les bornes puissent le lire) plus `POST` / `DELETE` protégés par `people.edit`. Le personnel gère la liste sur la carte **Ramassage** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, lien de parenté, et une pastille Autorisé / Non autorisé.

Au départ (`B1Checkin/app/checkout.tsx`), la borne charge la liste de ramassage du foyer : les entrées `trusted` apparaissent comme des cartes de ramassage cliquables à côté de la grille de photos des adultes du foyer, et un nom « Autre » saisi librement est comparé de façon approximative (distance de Levenshtein, `src/helpers/PickupMatchHelper.ts`) aux entrées `notAuthorized` — une correspondance bloque le départ avec une feuille d'avertissement et un bouton **Passer outre** réservé au personnel. La dérogation est consignée sur la visite elle-même : elle envoie `checkedOutBy` sous la forme `"OVERRIDE: {name}"` par le `POST /attendance/visits/checkout` habituel, de sorte qu'elle figure dans le registre de présence et dans le webhook `attendance.checkout`, plutôt que dans une table d'audit séparée.

### Avis aux parents et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` — `{ visitId, message }` : envoie un avis aux tuteurs d'un enfant pointé (écran de départ de la borne, en mode avec personnel).
- `POST /broadcast` — `{ serviceId, message }` : envoie un texto aux adultes de chaque foyer pointé pour un service (paramètres d'administration de la borne, derrière une feuille de confirmation de type `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du foyer par la passerelle membership, puis confient l'envoi à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porte inter-modules vers le fournisseur de messages texte configuré de l'église (`@churchapps/texting` : TextInChurch, Clearstream ou MutualMinistry ; il n'existe aucun expéditeur SMS intégré). La passerelle consigne une ligne `sentText` et des entrées `deliveryLog` par destinataire, et limite un lot à 500 destinataires ; sans fournisseur configuré, elle renvoie `no_provider`, que la borne affiche sous la forme « Aucun fournisseur SMS configuré ». La méthode `dispatch()` du contrôleur élimine les numéros en double et ignore les personnes sans mobile ou marquées `optedOut`, en renvoyant `{ sent, failed, skippedOptedOut, skippedNoPhone }` pour que la borne puisse indiquer ce qui a été ignoré.

## La borne (B1Checkin)

Les écrans sont des fichiers expo-router sous `B1Checkin/app/` ; l'état partagé entre les écrans réside dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), et non dans l'état React.

```
index (démarrage/connexion auto) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             charge serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ imprimer les étiquettes,
             groupServiceTimes,           │             └▶ checkout (avec personnel)    retour automatique
             labelTemplates               │                                            à lookup
```

1. **Recherche** (`app/lookup.tsx`) — recherche par téléphone (`GET /membership/people/search/phone?number=`, quatre derniers chiffres ou numéro complet) ou par nom (`GET /membership/people/search?term=`). La sélection d'une correspondance charge le foyer (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), et remplit `pendingVisits` avec les choix de salles de la semaine précédente.
2. **Vérification du foyer** (`app/household.tsx`, `src/components/MemberList.tsx`) — chaque ligne de membre affiche un badge « déjà pointé », un badge allergie/`nametagNotes` et ses puces de salles actuelles. Développer un membre liste chaque horaire de service avec un bouton de salle ainsi que les puces de type de pointage Membre / Visiteur / Bénévole (`MemberServiceTimes.tsx`). Sous le nom de chaque horaire de service, `ServiceTimeHelper.getGroupSummary()` affiche les groupes proposés à cet horaire (les noms de `serviceTime.groups`, épurés, dédoublonnés sans tenir compte de la casse, séparés par des virgules) ; rien ne s'affiche si l'horaire n'a aucun groupe.
3. **Affectation au groupe** (`app/selectGroup.tsx`) — une arborescence par catégorie construite à partir de `serviceTime.groups`, les salles admissibles selon l'âge et le niveau étant mises en évidence et les salles non admissibles estompées derrière une confirmation du personnel (voir [Admissibilité selon l'âge et le niveau](#agegrade-eligibility-kiosk-side)) ; choisir une salle écrit une visitSession `{ session: { serviceTimeId, groupId } }` dans la visite en attente de la personne (`src/helpers/VisitSessionHelper.ts`). « Aucun » efface l'affectation.
4. **Terminer** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` avec `pendingVisits` (chacune estampillée de son `checkinType`), puis impression des étiquettes si une imprimante est configurée, et retour automatique à lookup. Une réponse `409` de capacité ou `notOpen` affiche la salle concernée avec la raison (pleine/fermée, ou pointage non ouvert) ; un avertissement de ratio propose une confirmation du personnel qui renvoie la requête avec `acknowledgeWarnings=true`.

L'écran de **départ** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères dans un champ à focus automatique — de sorte que les lecteurs de codes-barres à clavier USB/Bluetooth fonctionnent sans caméra — ou un pavé numérique à l'écran utilisant le même alphabet, avec soumission automatique à 4 caractères. Un bouton **Scanner** ouvre une feuille contenant la caméra partagée `src/components/CodeScanner.tsx` (orientée vers l'arrière par défaut, acceptant les QR, Code 128 et Code 39), afin que les postes sans lecteur à clavier puissent lire l'étiquette de ramassage ; un code scanné alimente le même chemin `handleCode()` que la saisie. L'écran recherche le code, affiche les enfants à ramasser, et présente les **personnes de confiance pour le ramassage** du foyer sous forme de cartes cliquables à côté d'une grille de photos des adultes du foyer (plus une option « Autre » en texte libre, vérifiée de façon approximative par rapport aux noms non autorisés — voir [Ramassage de confiance et ramassage non autorisé](#trusted-and-not-authorized-pickup)), puis envoie `POST /attendance/visits/checkout` avec le nom/l'identifiant choisi. En mode avec personnel, l'écran propose aussi **Avertir un parent** (`POST /attendance/checkin/page`) et une **réimpression de l'étiquette de sécurité** — `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les envoie par le même pipeline `PrintUI` que le pointage.

Le mode de la station est un drapeau AsyncStorage `@StationMode` (`"self"` | `"manned"`, basculé dans `app/adminSettings.tsx`). Le mode avec personnel ajoute le point d'entrée du départ sur l'écran de recherche et la modification du profil de chaque personne (`POST /membership/people`) depuis l'écran du foyer. Le durcissement de la borne est intégré : un NIP facultatif (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protège les écrans d'administration et d'imprimante, l'écran d'administration ne s'ouvre que par 7 pressions rapides sur le logo de l'en-tête, et un écran d'accueil inactif (`src/hooks/useInactivityTimer.ts`) prend le relais entre les familles.

## Pointage autonome (B1App)

Les membres pointent depuis le portail b1.church, à l'écran `/mobile/checkin` (acheminé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Il exige un utilisateur connecté et suit les mêmes quatre étapes que la borne — services → foyer → groupes → terminer — avec les mêmes points de terminaison, l'état étant conservé dans `B1App/src/helpers/CheckinHelper.ts`. Les différences avec la borne : le foyer provient du `householdId` propre à l'utilisateur connecté (pas d'étape de recherche), et il n'y a aucune impression d'étiquettes — l'écran de fin affiche plutôt le code de sécurité du lot sous forme de QR (`qrcode.react`), avec l'indication « présentez ceci à un poste de pointage ». Si le foyer est déjà pointé au chargement de la page, un bouton « Afficher le code de pointage » réaffiche le QR à partir de la première visite existante (issue de `GET /attendance/visits/checkin`) qui porte un `securityCode`. Le pointage est enregistré immédiatement à l'envoi (il n'y a pas d'état en attente) ; le QR ne sert qu'à imprimer les étiquettes à la borne.

**Impression d'étiquettes depuis le téléphone vers la borne** (`B1Checkin/app/scan.tsx`, atteint depuis le bouton « Scanner le code » du QR sur l'écran de recherche) : la borne affiche `CodeScanner` (un `CameraView` d'`expo-camera`, orienté vers l'avant par défaut, avec possibilité de basculer) qui scanne les QR. `ScanCodeHelper.parse()` n'accepte une charge utile que si elle est un simple code de 4 caractères dans l'alphabet des codes de sécurité, et `ScanCodeHelper.isRepeat()` ignore le même code pendant 4 secondes, de sorte que le QR de B1App comme le bloc QR d'une étiquette imprimée fonctionnent. L'écran suit alors le chemin de réimpression du départ — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — puis revient à la recherche. Aucune écriture de présence n'a lieu au moment du scan ; il ne s'agit que d'étiquettes. Les codes sans visites actives, les postes sans imprimante et les groupes sans étiquette affichent chacun un message bref et ramènent à la recherche.

Les types et `ApiHelper`/`ArrayHelper` proviennent de `@churchapps/helpers` et de `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présences côté administration (B1Admin)

- **Configuration** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) affiche l'arborescence de la structure et crée les services (`ServiceEdit.tsx`) et les horaires de service (`ServiceTimeEdit.tsx`). Les données de campus proviennent du module membership via le hook `useCampuses()`.
- **Présences manuelles** se trouvent du côté des groupes, et non dans la section Présences : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée les séances (`POST /attendance/sessions` ; à l'ajout, `SessionEdit.tsx` peut inclure une séance par autre groupe partageant l'horaire de service choisi, en sautant les groupes qui ont déjà une séance à cette date) et marque les personnes présentes par `POST /attendance/visitsessions/log`, qui trouve ou crée la visite de cette personne pour cette séance. Les responsables de groupe peuvent enregistrer les présences de leurs propres groupes sans l'autorisation `attendance.edit` — les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapports** — la tendance de présence et les présences par groupe sont des rapports définis côté serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contre ReportingApi ; définitions dans `Api/reports/*.json`). Les deux prennent `startDate`/`endDate` (date de fin incluse) ; le rapport de tendance va par défaut d'il y a un an à aujourd'hui et ajoute une colonne `sessionDates` par semaine, et l'arborescence affichée des présences par groupe inclut le `checkinTime` de chaque visite et le `membershipStatus` de la personne. Le CSV des présences par groupe provient du rapport compagnon `groupAttendanceDownload`, pivoté par `GroupAttendanceDownloadHelper` en une ligne par membre de groupe avec une colonne présent/absent par séance datée ; l'historique par personne est `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression des étiquettes

### Modèles et concepteur

Les églises conçoivent leurs propres étiquettes dans B1Admin, à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accessible depuis la page de paramètres du pointage). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs — `text`, `field`, `barcode`, `qrcode` ou `box` — chacun positionné en coordonnées de pourcentage avec police, alignement, symbologie (`code39`/`code128`/`qr`) et conditions de visibilité facultatives (par exemple n'afficher la case allergie que si `person.nametagNotes` n'est pas vide). Il existe deux `labelType` : `nametag` (une par personne pointée ; champs comme `person.displayName`, `sessions`, `securityCode`, et `person.isBirthdayWeek` — `"true"` lorsque le mois/jour de l'anniversaire est à moins de 3 jours d'aujourd'hui, en enroulant à la fin de l'année, calculé par `LabelHelper.isBirthdayWithin()`) et `pickup` (une par famille ; champs comme `children`, `childrenAllergies`). Le serveur impose un seul modèle par défaut par type et par église (`LabelTemplateController.save`). Le concepteur livre des modèles de départ qui reprennent les étiquettes intégrées de la borne et permettent un aperçu sur des données d'exemple.

### Rendu et impression à la borne

À la fin du pointage, `B1Checkin/src/helpers/LabelHelper.ts` décide quoi imprimer à partir des indicateurs de groupe de chaque visite en attente : des étiquettes nominatives pour les groupes `printNametag`, plus une étiquette de ramassage familial si une visite a touché un groupe `parentPickup`. Les visites de type `volunteer` sont ignorées par `LabelHelper.selectChildVisits()`, de sorte qu'un bénévole de garderie dans une salle de ramassage des parents ne déclenche jamais d'étiquette de ramassage. Le code de sécurité de la réponse de pointage est apposé sur les étiquettes nominatives des enfants et sur l'étiquette de ramassage ; les étiquettes nominatives des adultes s'impriment sans code. Si l'église a des modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs et un contexte de champs en document HTML autonome ; sinon, les étiquettes HTML intégrées de `B1Checkin/assets/labels/` sont utilisées avec remplacement des espaces réservés.

Les codes-barres sont générés en SVG intégré par des encodeurs en TypeScript pur dans `B1Checkin/src/helpers/barcode.ts` — tables de motifs Code 39 et tables de largeurs Code 128 (jeu B avec somme de contrôle mod-103), plus le QR via le paquet `qrcode`. **Ces encodeurs sont volontairement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, signalé par un commentaire de code) afin que les aperçus du concepteur soient fidèles au pixel près à la sortie de la borne ; toute modification de l'un doit être reportée dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans un `WebView`, la capture en JPG avec `react-native-view-shot`, et transmet les URI des images au module Expo natif **printer-helper** (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()` et des événements d'état, avec un fournisseur par marque sur les deux plateformes :

| Marque | Android | iOS | Remarques |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK d'impression Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau de la série QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes découpées 29×90, la valeur par défaut recommandée |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression d'images TCP/ZPL |

La sélection de l'imprimante se trouve dans `app/printers.tsx` (la recherche réseau renvoie des entrées `marque~modèle~ip` ; le choix est conservé dans AsyncStorage), et `src/helpers/PrinterLog.ts` tient un journal de diagnostic sur l'appareil, accessible par un point d'état en direct dans l'en-tête de la borne.

## Inscription des visiteurs

Deux chemins créent une personne en cours de pointage :

- **À la borne** — le bouton « Ajouter un visiteur » de l'écran du foyer ouvre `B1Checkin/app/addGuest.tsx`, qui cherche d'abord `GET /membership/people/search?term=` une correspondance existante non membre, puis, sinon, crée une personne avec `POST /membership/people`, rattachée au foyer en cours. Le visiteur suit ensuite l'affectation au groupe comme n'importe quel membre.
- **En libre-service par QR** — lorsque le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres de pointage de B1Admin, lu depuis `GET /membership/settings/public/{churchId}`), l'écran de recherche de la borne affiche un QR code qui mène à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille visiteuse de s'inscrire depuis son propre téléphone via le point de terminaison anonyme `POST /membership/people/guest-register`, ce qui fait avancer la file à la borne. La feuille du QR comporte aussi un bouton **S'inscrire ici** qui ouvre la même page sur la borne (`app/guestRegister.tsx`) dans un `WebView` en mode privé, sans cache ; `src/helpers/GuestRegisterHelper.ts` construit l'URL pour le QR et pour le `WebView`, et bloque la navigation hors de `https://{subdomain}.b1.church/guest-register`. L'écran revient à la recherche sur **Terminé**, en arrière, ou après 120 secondes d'inactivité (la saisie dans le formulaire est transmise depuis le `WebView` comme activité), et démonte le `WebView` pour que les saisies d'une famille n'atteignent jamais la suivante.

L'inscription par QR est pilotée par les paramètres d'église enregistrés depuis la carte **Inscription des visiteurs par QR** de B1Admin (`src/mobile/CheckInPage.tsx`) :

| Paramètre | Visibilité | Rôle |
|---|---|---|
| `enableQRGuestRegistration` | publique | Interrupteur d'adhésion pour le QR de la borne et les points de terminaison anonymes |
| `guestRegistrationFields` | publique | Table JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Par défaut : courriel et téléphone facultatifs, le reste désactivé. Le prénom et le nom sont toujours obligatoires |
| `guestRegistrationImage` | publique | URL de la photo d'en-tête ; B1App l'affiche en 16:9 à la place de l'icône sur le formulaire et l'écran de confirmation |
| `guestRegistrationGroupId` | privée | Groupe auquel chaque inscription est ajoutée (les visiteurs ne le voient ni ne le choisissent jamais) |
| `guestRegistrationRecordAttendance` | privée | `"true"` pour aussi enregistrer la présence de ce groupe |

`src/components/checkin/GuestRegister.tsx` de B1App récupère la liste de contrôle depuis le point de terminaison anonyme `GET /membership/people/guest-register/options?churchId=` et n'affiche que les champs inclus (courriel, téléphone, état civil et adresse sur le contact principal ; date de naissance, genre et niveau pour chaque membre ; une seule case de commentaires), et n'envoie que ceux-ci. Le serveur réapplique la liste de contrôle dans `GuestRegistrationHelper.sanitize()` — les champs désactivés sont retirés, les valeurs obligatoires manquantes ou hors liste donnent un 400 — avant que `PersonHelper.registerGuestHousehold()` ne s'exécute. Il appelle d'abord `PersonRepo.findGuestMatch()` pour chaque membre ayant un courriel ou un téléphone : une seule personne vivante ayant le même prénom et le même courriel ou les mêmes chiffres de téléphone est réutilisée (zéro ou plusieurs correspondances créent une nouvelle personne, de sorte qu'il ne devine jamais). Un membre sans coordonnées correspond par prénom au sein du foyer correspondant. Les personnes réutilisées ne sont jamais modifiées, de sorte qu'un formulaire anonyme ne peut pas écraser des renseignements enregistrés ; la réponse reprend les noms soumis. Les membres non associés rejoignent le foyer correspondant ou un nouveau foyer, avec `membershipStatus: "Visitor"`, en émettant `person.created` pour chaque nouvelle personne. Ensuite, les échecs sont consignés plutôt que renvoyés : les membres sont ajoutés au groupe configuré (`group.member.added`) ; si l'enregistrement de présence est activé, `AttendanceModuleGateway.recordAttendance()` marque chaque membre présent pour chacun des horaires de service planifiés du groupe dont la fenêtre de pointage (`CheckinGateHelper.isServiceTimeOpen`) est ouverte à cet instant, en créant la séance du jour si nécessaire, à la date locale de l'église — les horaires non planifiés et les inscriptions hors fenêtre n'enregistrent rien ; et les commentaires deviennent une conversation de note de personne masquée sur le chef de foyer (auteur du message « Guest sign-up »), reliée par `person.conversationId`.

## Pages connexes

- [Points de terminaison Attendance](../api/endpoints/attendance) — Surface REST complète pour les campus, services, séances, visites et visitSessions
- [Points de terminaison Membership](../api/endpoints/membership) — Personnes, foyers et groupes
- [Webhooks](../api/webhooks) — Les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure des modules](../api/module-structure) — Organisation côté serveur du module attendance
