---
title: "Présences (Check-Ins)"
---

# Présences (Check-Ins)

<div class="article-intro">

Le check-in est un système unique avec trois portes d'entrée : l'application kiosque B1Checkin pour les stations avec ou sans personnel, le check-in autonome à l'intérieur du portail des membres B1App, et la présence côté administration dans B1Admin. Les trois écrivent dans le même module de présence du cœur de l'Api, et le routage des salles de classe est entièrement piloté par les Groupes — il n'existe pas d'entité « emplacements » ou « salles » séparée. Une couche de sécurité des enfants se superpose : types de check-in par visite, portails de capacité et de ratio de bénévoles côté serveur, éligibilité âge/niveau scolaire côté kiosque, vérification de récupération de confiance à la sortie, et appel des parents via le fournisseur de messagerie texte de l'église. Cette page décrit le modèle de données, les flux de check-in, la couche de sécurité, et le pipeline d'impression d'étiquettes.

</div>

## Vue d'ensemble

```
┌──────────────────────────┐
│ B1Checkin (kiosque Expo)  │──┐         ┌──────────────────────────────────────────────┐
│  recherche → foyer →      │  │         │ Api                                          │
│  groupes → terminer/impr. │  │  HTTPS  │  ┌─ module membership ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (check-in autonome)│──┤         │  └─────────────────────────────────────────┘ │
│  écran /mobile/checkin    │  │         │  ┌─ module attendance ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (personnel)       │──┘         │  │ groupServiceTimes  (routage des salles) │ │
│  configuration · rapports ·│            │  │ sessions ← visitSessions → visits       │ │
│  concepteur d'étiquettes  │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Chemin d'impression d'étiquettes (kiosque seulement) :
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modèles d'étiquettes, ou repli HTML intégré)
       └▶ LabelRenderer → document HTML + codes-barres SVG en ligne
            └▶ PrintUI : rendu WebView → capture JPG via ViewShot
                 └▶ module natif printer-helper → Brother QL / Zebra
```

| Surface | Dépôt | Pile technique | Rôle |
|---------|------|-------|------|
| Kiosque | `B1Checkin` | Expo / React Native, routage par fichiers expo-router ; builds EAS pour Android, Amazon Fire, et iOS ; mises à jour OTA via `expo-updates` | Station avec ou sans personnel, avec impression d'étiquettes et sortie vérifiée |
| Check-in autonome | `B1App` | Next.js (portail des membres b1.church) | Les membres connectés enregistrent leur foyer depuis un téléphone ; pas d'impression |
| Administration | `B1Admin` | SPA React | Configure la structure de service, assigne les groupes aux horaires de service, conçoit les étiquettes, enregistre la présence manuelle, exécute les rapports |

Les trois appellent les deux mêmes modules API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, foyers, et groupes ; **AttendanceApi** (`/attendance`) pour tout le reste ci-dessous.

## Modèle de données (`Api/src/modules/attendance`)

| Entité / table | Champs clés | Signification |
|----------------|-----------|---------|
| `campuses` | name, address | Dépréciée ici — les campus sont maîtrisés dans le module membership (`/membership/campuses`) ; la copie de attendance est gelée en lecture seule pour les lecteurs hérités (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par ex. « Dimanche matin » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Un créneau horaire au sein d'un service, par ex. « 9h00 » (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jonction : quels groupes (salles de classe) se réunissent à quels horaires de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date donnée — créée paresseusement au moment du check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne présente à une date donnée (`models/Visit.ts`). `checkinType` vaut `member` / `guest` / `volunteer` (NULL = membre hérité), défini par le kiosque et consommé par les portails de capacité/ratio |
| `visitSessions` | visitId, sessionId | Quelle(s) session(s) une visite couvre — un enfant enregistré à deux horaires de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquettes personnalisables (`models/LabelTemplate.ts`) |

### Comment un check-in complété est persisté

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gère `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant `visitSessions` dont la `session` intégrée ne nomme qu'une paire `(serviceTimeId, groupId)`. Le serveur ensuite :

1. **Applique les portails de capacité et de ratio avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie la capacité de chaque salle ciblée, la capacité invités, le drapeau de fermeture, et le ratio de bénévoles par rapport à l'occupation actuelle. postCheckin n'est **pas transactionnel**, donc le portail doit s'exécuter avant la première sauvegarde — une violation dure renvoie un 409 nommant la ou les salles fautives et rien n'est persisté. Voir [Portails de capacité et ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les sessions paresseusement.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, aujourd'hui)` — les ids de session sont mis en cache en mémoire par date. Les nouvelles sessions émettent un webhook `session.created`. La boucle est un `for..of` attendu (`await`) — un précédent `forEach(async …)` sans attente entrait en course avec la sauvegarde et écrivait des sessionId NULL à la création de la première session (corrigé ; signalé par un commentaire de code au niveau de la boucle).
3. **Remplace les enregistrements du jour.** Toute visite existante pour ces personnes à ce service aujourd'hui est supprimée avec ses visitSessions, puis l'ensemble soumis est sauvegardé. Réenregistrer une famille est donc une opération idempotente « voici l'état actuel », pas un ajout. Passer `?checkDuplicates=true` renvoie à la place `{ duplicates: [personId…] }` sans écrire, ce qui permet au kiosque d'avertir avant d'écraser.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code à 4 caractères depuis l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (pas de voyelles ni de caractères ambigus, donc les codes ne peuvent ni épeler de mots ni être mal lus). Le serveur réessaie en cas de collision par rapport aux visites ouvertes du même jour de la même église et horodate le code sur chaque visite du lot.
5. **Renvoie `{ streaks, securityCode }`.** `streaks` associe chaque personId à un compte de présence de semaines consécutives ; le kiosque célèbre les jalons (chaque 5e semaine) avec des confettis.

Chaque visite sauvegardée émet aussi un webhook `attendance.recorded`. Côté lecture, `GET /attendance/visits/checkin` renvoie les visites des personnes depuis leur **dernière date enregistrée** — si c'était la semaine précédente, les ids sont retirés, si bien que le client reçoit une copie pré-remplie des sélections de salle de la semaine précédente, qui s'enregistrera comme de nouveaux enregistrements.

### Sortie (check-out)

Deux points de terminaison bouclent le processus (`VisitController`) :

- `GET /attendance/visits/code/:code` — les visites d'aujourd'hui pas encore sorties portant ce code de sécurité, avec les sessions renseignées.
- `POST /attendance/visits/checkout` — corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; horodate `checkoutTime` et qui a récupéré l'enfant, et émet un webhook `attendance.checkout` par visite.

Permissions : les kiosques s'authentifient avec `attendance.checkin`, qui accorde exactement la surface check-in/check-out/modèle d'étiquette ; `attendance.view`/`attendance.edit` couvrent le reporting et la saisie manuelle ; la structure (services, horaires de service, assignations de groupe) requiert `services.edit`.

## Les groupes pilotent le routage des salles

Il n'existe nulle part dans le système d'entité salle ou salle de classe. Une « salle » est un **groupe** d'adhésion avec `trackAttendance` activé, lié à un ou plusieurs horaires de service via `groupServiceTimes`. Les champs du groupe (sur `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement du kiosque :

| Champ | Effet |
|------|--------|
| `trackAttendance` | Le groupe participe ou non à la présence ; l'arbre de configuration de B1Admin signale les groupes `trackAttendance` sans ligne `groupServiceTimes` comme non assignés |
| `parentPickup` | Marque une salle enfants : s'y enregistrer fait de la visite une visite « enfant », ce qui imprime une étiquette de récupération familiale et place le code de sécurité sur l'étiquette nominative |
| `printNametag` | Détermine si les check-ins dans ce groupe impriment une étiquette nominative |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité de la salle et un interrupteur « fermé » strict, appliqués côté serveur par le portail de check-in (édités dans les paramètres de groupe de B1Admin sous « Capacité de check-in ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants-par-bénévole et effectif minimum de bénévoles, appliqués selon le paramètre `ratioEnforcement` à l'échelle de l'église |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Bornes d'éligibilité âge/niveau évaluées côté kiosque pour mettre en évidence ou griser les salles |

Chaque client dénormalise de la même façon (par ex. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, et `GET /membership/groups` en parallèle, puis pour chaque horaire de service, rassembler les groupes dont la ligne `groupServiceTimes` pointe vers lui dans `serviceTime.groups`. Ce tableau est ce que le sélecteur de salle affiche, organisé par `categoryName` de groupe.

Les assignations sont éditées depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), et l'arbre complet Campus → Service → Horaire de service → Groupe est visualisé dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Comme les groupes sont la source de vérité unique, la même adhésion à un groupe alimente le routage du kiosque, la présence de type « registre » sur les pages de groupe de B1Admin, et le reporting de présence — assigner un groupe à un horaire de service est la seule étape nécessaire pour en faire une destination de check-in.
:::

## Sécurité des enfants

### Types de check-in

Chaque visite porte un `checkinType` — `member`, `guest`, ou `volunteer` (NULL signifie hérité/membre ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté kiosque** : puces Membre / Invité / Bénévole sur la ligne membre développée (`B1Checkin/src/components/MemberServiceTimes.tsx`), estampillées sur chaque visite en attente à la finalisation (`app/checkinComplete.tsx`, `member` par défaut). Le serveur le consomme dans le portail — les bénévoles comptent pour la couverture du ratio au lieu de compter contre la capacité, et les invités comptent contre `guestCapacity`.

### Portails de capacité et de ratio de bénévoles

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute à l'intérieur de `postCheckin` avant toute sauvegarde (le point de terminaison n'est pas transactionnel, donc le portail-avant-sauvegarde est le mécanisme de correction). Il charge l'occupation actuelle par groupe ciblé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe via la passerelle du module membership, puis classe les violations :

- **Dur (bloque toujours) :** `checkinClosed`, `actuel + entrant > capacité`, nombre d'invités au-delà de `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — le kiosque affiche la salle nommée.
- **Ratio (avertit ou bloque) :** arrivée de non-bénévoles dans une salle où `bénévoles < minVolunteers`, aucun bénévole du tout, ou `enfants > bénévoles × volunteerRatio`. La sévérité suit le paramètre par église `ratioEnforcement` (`"warn"` par défaut / `"block"`, édité dans B1Admin Gérer l'église → Check-In, `CheckinSettingsEdit.tsx`). Le mode avertissement renvoie `409 { warning: true, error: "ratio", … }` sauf si le client soumet à nouveau avec `acknowledgeWarnings=true` — cette resoumission est la validation manuelle du personnel qui permet la passe en force.

### Éligibilité âge/niveau scolaire (côté kiosque)

L'éligibilité de la salle est une interface consultative, évaluée sur le kiosque, non appliquée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance/niveau scolaire d'une personne aux `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre des niveaux : PreK, K, 1–12, Diplômé) et renvoie `eligible` / `ineligible` / `unknown` — les données manquantes donnent `unknown` et ne masquent jamais une salle. Les âges et niveaux sont calculés à la **date de promotion de niveau** de l'église (paramètre `gradePromotionDate`, format `"MM-DD"`, édité dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; le kiosque la récupère depuis `GET /attendance/checkin/settings`, et `resolveAsOfDate` choisit l'occurrence la plus récente à la date du jour ou avant. Le sélecteur de salle met en évidence les salles éligibles et grise celles qui ne le sont pas ; choisir une salle grisée exige une confirmation du personnel.

### Récupération de confiance et non autorisée

Les personnes autorisées à récupérer sont une entité d'adhésion, par foyer : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId optionnel, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le CRUD se fait via `GET /membership/householdpickup/:householdId` (tout utilisateur d'église authentifié, donc les kiosques peuvent le lire) plus `POST` / `DELETE` protégés par `people.edit`. Le personnel gère la liste sur la carte **Récupération** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relation, et une puce de statut Confiance/Non autorisé.

À la sortie (`B1Checkin/app/checkout.tsx`), le kiosque charge la liste de récupération du foyer : les entrées `trusted` s'affichent comme des cartes de récupération cliquables aux côtés de la grille de photos des adultes du foyer, et un nom saisi librement dans « Autre » est mis en correspondance floue (Levenshtein, `src/helpers/PickupMatchHelper.ts`) avec les entrées `notAuthorized` — une correspondance bloque la sortie avec une fiche d'avertissement et un bouton de **Passer outre** réservé au personnel. Le passage outre est enregistré sur la visite elle-même : il poste `checkedOutBy` comme `"OVERRIDE: {name}"` via le `POST /attendance/visits/checkout` normal, ce qui l'inscrit dans l'enregistrement de présence et le webhook `attendance.checkout` plutôt que dans une table d'audit séparée.

### Appel d'un parent et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` — `{ visitId, message }` : appelle les tuteurs d'un enfant enregistré (écran de sortie du kiosque, mode avec personnel).
- `POST /broadcast` — `{ serviceId, message }` : envoie un SMS aux adultes de chaque foyer enregistré pour un service (paramètres administrateur du kiosque, derrière une fiche de confirmation nécessitant de taper `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du foyer via la passerelle du module membership, puis confient la livraison à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porte inter-modules vers le fournisseur de messagerie texte configuré de l'église (`@churchapps/texting` : TextInChurch, Clearstream, ou MutualMinistry ; il n'y a pas d'expéditeur SMS intégré). La passerelle enregistre une ligne `sentText` plus des entrées `deliveryLog` par destinataire et plafonne un lot à 500 destinataires ; sans fournisseur configuré, elle renvoie `no_provider`, que le kiosque affiche comme « Aucun fournisseur SMS configuré ». Le `dispatch()` du contrôleur déduplique les numéros de téléphone et ignore les personnes sans mobile ou avec `optedOut` défini, renvoyant `{ sent, failed, skippedOptedOut, skippedNoPhone }` pour que le kiosque puisse afficher ce qui a été ignoré.

## Le kiosque (B1Checkin)

Les écrans sont des fichiers expo-router sous `B1Checkin/app/` ; l'état inter-écrans vit dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), pas dans l'état React.

```
index (démarrage/connexion auto) → selectChurch → services ──▶ recherche ──▶ foyer ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             charge serviceTimes, groups,│             │  └─────────┘ └▶ addGuest  └▶ imprime étiquettes,
             groupServiceTimes,          │             └▶ checkout (avec personnel)   retour auto
             labelTemplates              │                                            à la recherche
```

1. **Recherche** (`app/lookup.tsx`) — recherche par téléphone (`GET /membership/people/search/phone?number=`, 4 derniers chiffres ou numéro complet) ou par nom (`GET /membership/people/search?term=`). Sélectionner une correspondance charge le foyer (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), en amorçant `pendingVisits` avec les sélections de la semaine précédente.
2. **Examen du foyer** (`app/household.tsx`, `src/components/MemberList.tsx`) — chaque ligne de membre affiche un badge déjà-enregistré, un badge allergie/`nametagNotes`, et ses puces de salle actuelles. Développer un membre liste chaque horaire de service avec un bouton de salle plus les puces de type de check-in Membre / Invité / Bénévole (`MemberServiceTimes.tsx`).
3. **Assignation de groupe** (`app/selectGroup.tsx`) — un arbre de catégories construit à partir de `serviceTime.groups`, avec les salles éligibles selon l'âge/niveau mises en évidence et les inéligibles grisées derrière une confirmation du personnel (voir [Éligibilité âge/niveau scolaire](#agegrade-eligibility-kiosk-side)) ; choisir une salle écrit une visitSession `{ session: { serviceTimeId, groupId } }` dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). « Aucune » l'efface.
4. **Terminer** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` avec `pendingVisits` (chacune estampillée de son `checkinType`), puis imprime les étiquettes si une imprimante est configurée et revient automatiquement à la recherche. Une réponse `409` de capacité affiche la salle pleine/fermée nommée ; un avertissement de ratio propose une confirmation du personnel qui resoumet avec `acknowledgeWarnings=true`.

L'écran de **sortie** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères via un champ à focus automatique — pour que les scanners de codes-barres USB/Bluetooth en mode clavier fonctionnent sans caméra — ou un clavier virtuel utilisant le même alphabet, soumis automatiquement à 4 caractères. Il recherche le code, montre les enfants à récupérer, et présente les **personnes de récupération de confiance** du foyer sous forme de cartes cliquables aux côtés d'une grille de photos des adultes du foyer (plus une option « Autre » en texte libre, vérifiée par correspondance floue contre les noms non autorisés — voir [Récupération de confiance et non autorisée](#trusted-and-not-authorized-pickup)), puis poste `POST /attendance/visits/checkout` avec le nom/id de la personne qui récupère. En mode avec personnel, l'écran propose aussi **Appeler un parent** (`POST /attendance/checkin/page`) et une **réimpression d'étiquette de sécurité** — `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les fait passer par le même pipeline `PrintUI` que le check-in.

La personnalité de la station est un drapeau AsyncStorage `@StationMode` (`"self"` | `"manned"`, basculé dans `app/adminSettings.tsx`). Le mode avec personnel ajoute le point d'entrée de sortie sur l'écran de recherche et l'édition de profil par membre (`POST /membership/people`) depuis l'écran foyer. Le durcissement du kiosque est intégré : un PIN optionnel (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protège les écrans administrateur et imprimante, l'écran administrateur ne s'ouvre que via 7 appuis rapides sur le logo d'en-tête, et un écran d'accroche inactif (`src/hooks/useInactivityTimer.ts`) prend le relais entre les familles.

## Check-in autonome (B1App)

Les membres s'enregistrent depuis le portail b1.church à l'écran `/mobile/checkin` (routé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Il exige un utilisateur connecté et parcourt les mêmes quatre étapes que le kiosque — services → foyer → groupes → terminer — vers des points de terminaison identiques, avec l'état conservé dans `B1App/src/helpers/CheckinHelper.ts`. Les différences par rapport au kiosque : le foyer provient du `householdId` propre de l'utilisateur connecté (pas d'étape de recherche), et il n'y a pas d'impression d'étiquettes — à la place, l'écran de finalisation affiche le code de sécurité du lot sous forme de QR (`qrcode.react`) avec une invite « présentez ceci à une station de check-in ». Si le foyer est déjà enregistré au chargement de la page, un bouton « Afficher le code de check-in » réaffiche le QR à partir du `securityCode` de la visite existante. Le check-in est enregistré immédiatement au moment de la soumission (il n'y a pas d'état en attente) ; le QR ne sert qu'à piloter l'impression d'étiquettes au kiosque.

**Impression d'étiquette téléphone-vers-kiosque** (`B1Checkin/app/scan.tsx`, atteint depuis le bouton « Scanner le code » de l'écran de recherche) : le kiosque ouvre une `CameraView` `expo-camera` (caméra avant par défaut, retournable) qui scanne les codes QR. Une charge scannée est acceptée quand c'est un code nu à 4 caractères de l'alphabet des codes de sécurité, de sorte que le QR de B1App et le bloc QR d'une étiquette imprimée fonctionnent tous deux. L'écran suit ensuite le chemin de réimpression de la sortie — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — et revient à la recherche. Aucune écriture de présence n'a lieu au moment du scan ; c'est uniquement pour les étiquettes. Les codes sans visite active, les stations sans imprimante, et les groupes sans étiquette affichent chacun un toast et reviennent à la recherche.

Les types et `ApiHelper`/`ArrayHelper` proviennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présence côté administration (B1Admin)

- **Configuration** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) affiche l'arbre de structure et crée les services (`ServiceEdit.tsx`) et horaires de service (`ServiceTimeEdit.tsx`). Les données de campus proviennent de l'adhésion via le hook `useCampuses()`.
- **La présence manuelle** vit côté Groupes, pas dans la section présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée les sessions (`POST /attendance/sessions`) et marque les personnes présentes via `POST /attendance/visitsessions/log`, qui trouve-ou-crée la visite pour cette personne et cette session. Les responsables de groupe peuvent enregistrer la présence de leurs propres groupes sans la permission `attendance.edit` — les contrôleurs vérifient `au.leaderGroupIds`.
- **Le reporting** — la tendance de présence et la présence de groupe sont des rapports définis côté serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contre ReportingApi) ; l'historique par personne est `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression d'étiquettes

### Modèles et le concepteur

Les églises conçoivent leurs propres étiquettes dans B1Admin à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accessible depuis la page des paramètres Check-In). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs — `text`, `field`, `barcode`, `qrcode`, ou `box` — chacun positionné en coordonnées de pourcentage avec police, alignement, symbologie (`code39`/`code128`/`qr`), et conditions de visibilité optionnelles (par ex. n'afficher la case allergie que quand `person.nametagNotes` n'est pas vide). Deux `labelType` existent : `nametag` (une par personne enregistrée ; champs comme `person.displayName`, `sessions`, `securityCode`) et `pickup` (une par famille ; champs comme `children`, `childrenAllergies`). Le serveur impose un seul modèle par défaut par type et par église (`LabelTemplateController.save`). Le concepteur fournit des modèles de démarrage reflétant les étiquettes intégrées du kiosque et des aperçus sur données d'exemple.

### Rendu et impression sur le kiosque

À la finalisation du check-in, `B1Checkin/src/helpers/LabelHelper.ts` décide ce qu'il faut imprimer à partir des drapeaux de groupe de chaque visite en attente : étiquettes nominatives pour les groupes `printNametag`, plus une étiquette de récupération familiale si une visite a touché un groupe `parentPickup`. Le code de sécurité de la réponse de check-in figure sur les étiquettes nominatives des enfants et sur l'étiquette de récupération ; les étiquettes nominatives des adultes s'impriment sans code. Si l'église a des modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs + un contexte de champs en document HTML autonome ; sinon, les étiquettes HTML intégrées dans `B1Checkin/assets/labels/` sont utilisées avec substitution de placeholders.

Les codes-barres sont générés en SVG en ligne par des encodeurs TypeScript pur dans `B1Checkin/src/helpers/barcode.ts` — tables de motifs Code 39 et tables de largeur Code 128 (jeu de codes B avec somme de contrôle mod-103), plus QR via le paquet `qrcode`. **Ces encodeurs sont intentionnellement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, comme le note un commentaire de code) afin que les aperçus du concepteur soient fidèles au pixel près à la sortie du kiosque ; un changement dans l'un doit être répercuté dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans une `WebView`, la capture en JPG via `react-native-view-shot`, et transmet les URI d'image au module Expo natif **printer-helper** (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()`, et des événements de statut, avec un fournisseur par marque sur les deux plateformes :

| Marque | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK d'impression Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau série QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes découpées 29×90, le choix par défaut recommandé |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression d'image TCP/ZPL |

La sélection d'imprimante se fait dans `app/printers.tsx` (le balayage réseau renvoie des entrées `brand~model~ip` ; le choix persiste dans AsyncStorage), et `src/helpers/PrinterLog.ts` maintient un journal diagnostique sur l'appareil, affiché via un point de statut en direct dans l'en-tête du kiosque.

## Inscription des invités

Deux chemins créent une personne en cours de check-in :

- **Au kiosque** — le bouton « Ajouter un invité » de l'écran foyer ouvre `B1Checkin/app/addGuest.tsx`, qui recherche d'abord `GET /membership/people/search?term=` pour une correspondance non-membre existante, et sinon en crée une avec `POST /membership/people`, rattachée au foyer actuel. L'invité passe ensuite par l'assignation de groupe comme tout autre membre.
- **Libre-service via QR** — quand le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres Check-In de B1Admin, lu depuis `GET /membership/settings/public/{churchId}`), l'écran de recherche du kiosque affiche un code QR menant à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille visiteuse de s'inscrire elle-même sur son propre téléphone via le point de terminaison anonyme `POST /membership/people/guest-register`, ce qui garde la file du kiosque fluide.

## Pages connexes

- [Points de terminaison de présence](../api/endpoints/attendance) -- Surface REST complète pour les campus, services, sessions, visites, et sessions de visite
- [Points de terminaison d'adhésion](../api/endpoints/membership) -- Personnes, foyers, et groupes
- [Webhooks](../api/webhooks) -- Les événements `session.created`, `attendance.recorded`, et `attendance.checkout`
- [Structure des modules](../api/module-structure) -- Comment le module de présence est organisé côté serveur
