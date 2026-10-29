---
title: "Enregistrements"
---

# Enregistrements

<div class="article-intro">

L'enregistrement est un seul système avec trois points d'entrée : l'application-borne B1Checkin pour les postes dotés de personnel et en libre-service, l'enregistrement autonome dans le portail membre B1App, et la présence côté administration dans B1Admin. Les trois écrivent dans le même module de présence de l'Api principale, et l'acheminement vers les classes est entièrement piloté par les groupes -- il n'existe aucune entité distincte de « lieux » ou de « salles ». Une couche de sécurité pour les enfants s'ajoute par-dessus : types d'enregistrement par visite, contrôles de capacité et de ratio de bénévoles côté serveur, admissibilité selon l'âge ou le niveau côté borne, vérification du ramassage de confiance au départ, et messagerie aux parents par le fournisseur de textos de l'église. Cette page présente le modèle de données, les flux d'enregistrement, la couche de sécurité et le processus d'impression des étiquettes.

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

| Surface | Dépôt | Pile | Rôle |
|---------|-------|------|------|
| Borne | `B1Checkin` | Expo / React Native, routage de fichiers expo-router ; builds EAS pour Android, Amazon Fire et iOS ; mises à jour OTA via `expo-updates` | Poste avec personnel ou en libre-service, avec impression d'étiquettes et retrait vérifié |
| Enregistrement autonome | `B1App` | Next.js (portail membre b1.church) | Les membres connectés enregistrent leur foyer depuis un téléphone ; aucune impression |
| Administration | `B1Admin` | SPA React | Configure la structure des services, associe les groupes aux horaires de service, conçoit les étiquettes, saisit la présence manuelle, produit les rapports |

Les trois appellent les deux mêmes modules de l'API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, les foyers et les groupes ; **AttendanceApi** (`/attendance`) pour tout ce qui suit.

## Modèle de données (`Api/src/modules/attendance`)

| Entité / table | Champs clés | Signification |
|----------------|-----------|---------|
| `campuses` | name, address | Déprécié ici -- les campus sont gérés dans le module membership (`/membership/campuses`) ; la copie du module de présence est figée en lecture seule pour les anciens lecteurs (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement récurrent, par exemple « Dimanche matin » (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un créneau horaire au sein d'un service, par exemple « 9 h 00 » (`models/ServiceTime.ts`). Les colonnes de calendrier sont facultatives (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) et pilotent la [fenêtre d'enregistrement](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Table de jointure : quels groupes (salles de classe) se réunissent à quels horaires de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date donnée -- créée paresseusement au moment de l'enregistrement (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne présente un jour donné (`models/Visit.ts`). `checkinType` vaut `member` / `guest` / `volunteer` (NULL = membre historique), défini par la borne et utilisé par les contrôles de capacité et de ratio |
| `visitSessions` | visitId, sessionId | Quelle(s) séance(s) une visite couvre -- un enfant enregistré à deux horaires de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquettes concevables (`models/LabelTemplate.ts`) |

### Comment un enregistrement complété est persisté

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) traite `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant des `visitSessions` dont la `session` intégrée ne nomme qu'une paire `(serviceTimeId, groupId)`. Le serveur :

1. **Contrôle la capacité et les ratios avant toute écriture.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie, pour chaque salle ciblée, la capacité, la capacité d'invités, l'indicateur de fermeture et le ratio de bénévoles par rapport à l'occupation actuelle. postCheckin n'est **pas transactionnel** ; le contrôle doit donc s'exécuter avant la première sauvegarde. Une violation bloquante renvoie un 409 nommant la ou les salles concernées, et rien n'est persisté. Consultez [Contrôles de capacité et de ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les séances paresseusement.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, today)` ; les identifiants de séance sont mis en cache dans le processus pour chaque date. Les nouvelles séances émettent un webhook `session.created`. La boucle est un `for..of` avec `await` -- un ancien `forEach(async …)` sans attente faisait concurrence à la sauvegarde et écrivait des sessionId NULL à la création de la première séance (corrigé ; noté dans un commentaire de code à la boucle).
3. **Remplace les enregistrements du jour.** Toutes les visites existantes de ces personnes à ce service aujourd'hui sont supprimées avec leurs visitSessions, puis l'ensemble soumis est sauvegardé. Ré-enregistrer une famille est donc une opération idempotente « voici l'état actuel », et non un ajout. Passer `?checkDuplicates=true` renvoie plutôt `{ duplicates: [personId…] }` sans rien écrire ; c'est ainsi que la borne avertit avant d'écraser.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code de 4 caractères à partir de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (sans voyelles ni caractères ambigus, afin que les codes ne puissent pas former de mots ni être mal lus). Le serveur réessaie en cas de collision avec les visites ouvertes du même jour pour la même église, et appose le code sur chaque visite du lot.
5. **Renvoie `{ streaks, securityCode }`.** `streaks` associe chaque personId à son nombre de semaines consécutives de présence ; la borne célèbre les jalons (chaque 5e semaine) avec des confettis.

Chaque visite sauvegardée émet aussi un webhook `attendance.recorded`. Le côté lecture, `GET /attendance/visits/checkin`, renvoie les visites des personnes depuis leur **dernière date enregistrée** -- si c'était une semaine précédente, les identifiants sont retirés, et le client reçoit une copie pré-remplie des choix de salles de la semaine précédente qui s'enregistrera comme de nouveaux enregistrements.

### Retrait

Deux points de terminaison bouclent le cycle (`VisitController`) :

- `GET /attendance/visits/code/:code` — les visites non encore retirées d'aujourd'hui portant ce code de sécurité, avec les séances renseignées.
- `POST /attendance/visits/checkout` — corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; enregistre `checkoutTime` et la personne qui a récupéré l'enfant, et émet un webhook `attendance.checkout` par visite.

Autorisations : les bornes s'authentifient avec `attendance.checkin`, qui accorde exactement la surface d'enregistrement, de retrait et de modèles d'étiquettes ; `attendance.view`/`attendance.edit` couvrent les rapports et la saisie manuelle ; la structure (services, horaires de service, affectations de groupes) exige `services.edit`. L'enregistrement autonome (B1App) n'exige aucune autorisation : tout utilisateur authentifié ayant une personne liée dans l'église peut appeler `GET`/`POST /attendance/visits/checkin`, et le serveur restreint les `personId` soumis au foyer de l'appelant (403 sinon) -- cette barrière empêche de lire les `securityCode` des autres familles. L'appartenance est le seul critère ; la visibilité de la fonction pour les membres est contrôlée par les onglets de navigation B1App de l'église. Les autres points de terminaison d'enregistrement (`code/:code`, `checkout`, `guardians`, `CheckinController`) restent réservés à la borne et au personnel.

## Les groupes pilotent l'acheminement vers les salles

Il n'existe aucune entité de salle ou de classe dans le système. Une « salle » est un **groupe** de membership dont `trackAttendance` est activé, lié à un ou plusieurs horaires de service via `groupServiceTimes`. Les champs du groupe (sur `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement de la borne :

| Champ | Effet |
|------|------|
| `trackAttendance` | Le groupe participe à la présence ; l'arborescence de configuration de B1Admin signale comme non affectés les groupes `trackAttendance` sans ligne `groupServiceTimes` |
| `parentPickup` | Marque une salle d'enfants : y enregistrer fait de la visite une visite « enfant », qui imprime une étiquette de ramassage familial et place le code de sécurité sur le badge |
| `printNametag` | Indique si les enregistrements dans ce groupe impriment ou non un badge |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité de la salle et interrupteur de fermeture ferme, appliqués côté serveur par le contrôle d'enregistrement (modifiés dans les paramètres de groupe de B1Admin sous « Capacité d'enregistrement ») |
| `volunteerRatio` / `minVolunteers` | Ratio enfants par bénévole et effectif minimum de bénévoles, appliqués selon le paramètre `ratioEnforcement` de toute l'église |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Bornes d'admissibilité selon l'âge et le niveau, évaluées côté borne pour mettre en évidence ou estomper les salles |

Chaque client dénormalise de la même façon (par exemple `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger en parallèle `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` et `GET /membership/groups`, puis pour chaque horaire de service collecter dans `serviceTime.groups` les groupes dont la ligne `groupServiceTimes` pointe vers lui. Ce tableau alimente le sélecteur de salles, organisé par `categoryName` du groupe.

Les affectations se modifient depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), et l'arborescence complète Campus → Service → Horaire de service → Groupe est visualisée dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Parce que les groupes sont la source unique de vérité, la même appartenance à un groupe alimente l'acheminement à la borne, la présence de type appel dans les pages de groupe de B1Admin et les rapports de présence -- affecter un groupe à un horaire de service est la seule étape nécessaire pour en faire une destination d'enregistrement.
:::

## Sécurité des enfants

### Types d'enregistrement

Chaque visite porte un `checkinType` -- `member`, `guest` ou `volunteer` (NULL signifie historique/membre ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté borne** : des pastilles Membre / Invité / Bénévole sur la ligne développée du membre (`B1Checkin/src/components/MemberServiceTimes.tsx`), appliquées à chaque visite en attente lors de la finalisation (`app/checkinComplete.tsx`, avec `member` par défaut). Le serveur l'exploite dans le contrôle : les bénévoles comptent pour la couverture du ratio au lieu de compter contre la capacité, et les invités comptent contre `guestCapacity`.

### Contrôles de capacité et de ratio de bénévoles {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute dans `postCheckin` avant toute sauvegarde (le point de terminaison n'est pas transactionnel, donc le contrôle avant sauvegarde est le mécanisme de correction). Il charge l'occupation actuelle par groupe ciblé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe via la passerelle du module membership, puis classe les violations :

- **Stricte (bloque toujours) :** `checkinClosed`, `current + incoming > capacity`, nombre d'invités au-delà de `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- la borne affiche la salle concernée.
- **Ratio (avertit ou bloque) :** des non-bénévoles entrants dans une salle où `volunteers < minVolunteers`, aucun bénévole du tout, ou `children > volunteers × volunteerRatio`. La gravité suit le paramètre par église `ratioEnforcement` (`"warn"` par défaut / `"block"`, modifiable dans B1Admin Gérer l'église → Enregistrement, `CheckinSettingsEdit.tsx`). Le mode avertissement renvoie `409 { warning: true, error: "ratio", … }` sauf si le client renvoie la requête avec `acknowledgeWarnings=true` -- ce renvoi est la dérogation de confirmation du personnel à la borne.

### Fenêtres d'enregistrement planifiées {#scheduled-check-in-windows}

Un horaire de service peut porter un calendrier hebdomadaire facultatif (`dayOfWeek` de 0 à 6 avec 0 = dimanche, `startTime`/`endTime` au format `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), modifiable dans le formulaire **Présence → Configuration** de B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, « Calendrier d'enregistrement »). `CheckinGateHelper.hasSchedule()` ne considère un horaire de service planifié que lorsque `dayOfWeek` et `startTime` sont tous deux définis ; les horaires non planifiés ne sont jamais limités dans le temps. `isServiceTimeOpen()` calcule la fenêtre en heure murale locale (`DateHelper.toChurchTime`). Le fuseau horaire est résolu pour chaque horaire de service par `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) : le `timezone` du campus du service (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) passe en premier, puis le `timeZone` de l'église (défini dans les renseignements de l'église de B1Admin), puis le premier campus non supprimé qui possède un `timezone` (`loadCampusTimeZone`), et seulement ensuite `America/New_York`. Le campus passe en premier parce que la plupart des églises avaient `America/New_York` rétroactivement défini comme fuseau de l'église. La liste et les chemins d'envoi ci-dessous résolvent le fuseau de la même façon. La fenêtre va de `checkinOpenMinutes` avant le début à `checkinCloseMinutes` après la fin (ou après le début s'il n'y a pas de fin), en gérant les fenêtres qui traversent minuit ou la frontière de la semaine.

La fenêtre est appliquée à deux endroits :

- **Liste :** `GET /attendance/servicetimes` attache à chaque ligne un booléen calculé `checkinOpen`. Le self check-in de B1App (`CheckinPage.tsx`) et le sélecteur de service de B1Checkin (`app/services.tsx`) conservent chaque horaire. Lorsque tous les horaires d'un service sont fermés, ils affichent la prochaine ouverture (« L'enregistrement ouvre dim. 9 h 30. » dans B1App, « L'enregistrement pour ce service ouvre dim. 9 h 30. » dans B1Checkin, à partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), avec le repli « L'enregistrement n'est pas ouvert pour ce service pour le moment. » lorsqu'aucune ouverture ne peut être calculée (la borne propose un bouton Retour pour choisir un autre service). Sinon, les horaires fermés s'affichent comme une ligne « Fermé » / « Fermé · ouvre 9 h 30 » non sélectionnable. L'écran du foyer de B1Checkin (`MemberServiceTimes.tsx`) réévalue en direct l'état d'ouverture avec l'horloge de l'appareil grâce à `ServiceTimeHelper.isCheckinOpen()` (fuseau horaire de l'appareil, et non celui de l'église), afin qu'une borne laissée en marche s'ouvre et se ferme à l'heure, et affiche « Salle des enfants 1 · Enregistré » (nom du groupe) sur un horaire fermé que la personne détient déjà.
- **Envoi :** dans `evaluateGates()`, avant l'évaluation capacité/ratio, `findClosedServiceTimeGroups()` rejette le lot avec `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si l'horaire de service d'une séance ciblée est hors de sa fenêtre. Parce que les visites existantes d'un foyer pour aujourd'hui sont renvoyées à chaque enregistrement, les séances que la personne détient déjà (`personId|sessionId` dans les visites existantes) contournent ce contrôle ; ainsi, ajouter un horaire de service ultérieur ouvert n'est pas refusé parce qu'une fenêtre antérieure s'est fermée. B1Checkin présente ce cas via son écran de contrôle strict avec la raison « l'enregistrement n'est pas ouvert pour le moment » (les violations de capacité affichent toujours « la salle est pleine ou fermée »).

### Admissibilité selon l'âge et le niveau (côté borne) {#agegrade-eligibility-kiosk-side}

L'éligibilité des salles est une interface indicative, évaluée sur la borne et non imposée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance et le niveau d'une personne aux `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre des niveaux : PreK, K, 1 à 12, Graduated) et renvoie `eligible` / `ineligible` / `unknown` -- une donnée manquante donne `unknown` et ne cache jamais une salle. Les âges et les niveaux sont calculés à la **date de promotion de niveau** de l'église (paramètre `gradePromotionDate`, au format `"MM-DD"`, modifiable dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; la borne le récupère depuis `GET /attendance/checkin/settings`, et `resolveAsOfDate` choisit l'occurrence la plus récente à la date du jour ou avant. Le sélecteur de salles met en évidence les salles admissibles et estompe les salles non admissibles ; choisir une salle estompée exige une confirmation du personnel.

### Ramassage de confiance et ramassage non autorisé {#trusted-and-not-authorized-pickup}

Les personnes autorisées au ramassage sont une entité du module membership, par foyer : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId facultatif, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Le CRUD est `GET /membership/householdpickup/:householdId` (tout utilisateur authentifié de l'église, afin que les bornes puissent le lire) plus `POST` / `DELETE` protégés par `people.edit`. Le personnel gère la liste sur la carte **Ramassage** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) -- photo, lien de parenté et pastille de statut Confiance / Non autorisé.

Au départ (`B1Checkin/app/checkout.tsx`), la borne charge la liste de ramassage du foyer : les entrées `trusted` s'affichent comme des cartes de ramassage sélectionnables à côté de la grille de photos des adultes du foyer, et un nom saisi librement sous « Autre » est comparé par approximation (distance de Levenshtein, `src/helpers/PickupMatchHelper.ts`) aux entrées `notAuthorized` -- une correspondance bloque le départ avec une feuille d'avertissement et un bouton **Outrepasser** réservé au personnel. La dérogation est consignée sur la visite elle-même : elle envoie `checkedOutBy` sous la forme `"OVERRIDE: {name}"` par le `POST /attendance/visits/checkout` habituel ; elle figure donc dans le dossier de présence et dans le webhook `attendance.checkout`, plutôt que dans une table d'audit distincte.

### Recherche de parents et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` — `{ visitId, message }` : envoie un message aux responsables d'un enfant enregistré (écran de départ de la borne, mode supervisé).
- `POST /broadcast` — `{ serviceId, message }` : envoie un texto aux adultes de chaque foyer enregistré pour un service (paramètres administrateur de la borne, derrière une feuille de confirmation qui exige de taper `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du foyer via la passerelle membership, puis confient l'envoi à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- la porte inter-modules vers le fournisseur de messagerie texte configuré de l'église (`@churchapps/texting` : TextInChurch, Clearstream ou MutualMinistry ; il n'existe aucun envoyeur SMS intégré). La passerelle consigne une ligne `sentText` ainsi que des entrées `deliveryLog` par destinataire, et limite un lot à 500 destinataires ; sans fournisseur configuré, elle renvoie `no_provider`, que la borne affiche comme « Aucun fournisseur SMS configuré ». La méthode `dispatch()` du contrôleur dédoublonne les numéros de téléphone et ignore les personnes sans mobile ou dont `optedOut` est défini, et renvoie `{ sent, failed, skippedOptedOut, skippedNoPhone }` afin que la borne puisse indiquer ce qui a été ignoré.

## La borne (B1Checkin)

Les écrans sont des fichiers expo-router sous `B1Checkin/app/` ; l'état partagé entre écrans vit dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), et non dans un état React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Recherche** (`app/lookup.tsx`) -- recherche par téléphone (`GET /membership/people/search/phone?number=`, quatre derniers chiffres ou numéro complet) ou par nom (`GET /membership/people/search?term=`). Sélectionner une correspondance charge le foyer (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), ce qui alimente `pendingVisits` avec les choix de la semaine précédente.
2. **Vérification du foyer** (`app/household.tsx`, `src/components/MemberList.tsx`) -- chaque ligne de membre affiche un badge « déjà enregistré », un badge allergie / `nametagNotes`, et les pastilles de salle actuelles. Développer un membre liste chaque horaire de service avec un bouton de salle et les pastilles de type d'enregistrement Membre / Invité / Bénévole (`MemberServiceTimes.tsx`). Sous le nom de chaque horaire de service, `ServiceTimeHelper.getGroupSummary()` affiche les groupes proposés à cet horaire (les noms de `serviceTime.groups`, sans espaces superflus, dédoublonnés sans tenir compte de la casse, séparés par des virgules) ; rien ne s'affiche lorsque l'horaire n'a aucun groupe.
3. **Affectation au groupe** (`app/selectGroup.tsx`) -- un arbre de catégories construit à partir de `serviceTime.groups`, avec les salles admissibles selon l'âge et le niveau mises en évidence et les salles non admissibles estompées derrière une confirmation du personnel (voir [Admissibilité selon l'âge et le niveau](#agegrade-eligibility-kiosk-side)) ; choisir une salle écrit une visitSession `{ session: { serviceTimeId, groupId } }` dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). « Aucun » efface l'affectation.
4. **Finalisation** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` avec `pendingVisits` (chacune estampillée avec son `checkinType`), puis impression des étiquettes si une imprimante est configurée, et retour automatique à la recherche. Une réponse `409` de capacité ou `notOpen` affiche la salle concernée avec la raison (pleine/fermée, ou enregistrement non ouvert) ; un avertissement de ratio propose une confirmation du personnel qui renvoie la requête avec `acknowledgeWarnings=true`.

L'écran de **retrait** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères par un champ à focus automatique -- ainsi les lecteurs de codes-barres à clavier USB/Bluetooth fonctionnent sans caméra -- ou par un pavé numérique à l'écran qui utilise le même alphabet et se soumet automatiquement à 4 caractères. Un bouton **Scanner** ouvre une feuille avec la caméra partagée `src/components/CodeScanner.tsx` (arrière par défaut, acceptant QR, Code 128 et Code 39), afin que les postes sans lecteur à clavier puissent lire l'étiquette de ramassage ; un code scanné emprunte le même chemin `handleCode()` que la saisie. L'écran recherche le code, affiche les enfants à récupérer, et présente les **personnes de confiance pour le ramassage** du foyer sous forme de cartes sélectionnables, à côté d'une grille de photos des adultes du foyer (plus une option « Autre » en texte libre, comparée par approximation aux noms non autorisés -- voir [Ramassage de confiance et ramassage non autorisé](#trusted-and-not-authorized-pickup)), puis envoie `POST /attendance/visits/checkout` avec le nom et l'identifiant choisis. En mode supervisé, l'écran propose aussi **Appeler un parent** (`POST /attendance/checkin/page`) et une **réimpression de l'étiquette de sécurité** -- `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les envoie par le même pipeline `PrintUI` que l'enregistrement.

Le mode du poste est un indicateur AsyncStorage `@StationMode` (`"self"` | `"manned"`, basculé dans `app/adminSettings.tsx`). Le mode supervisé ajoute le point d'entrée de retrait sur l'écran de recherche et la modification du profil de chaque personne depuis l'écran du foyer (`POST /membership/people`). La borne est durcie de série : un NIP facultatif (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protège les écrans d'administration et d'imprimante, l'écran d'administration ne s'ouvre qu'après 7 tapes rapides sur le logo de l'en-tête, et un écran d'accueil d'attente inactif (`src/hooks/useInactivityTimer.ts`) prend le relais entre les familles.

## Enregistrement en libre-service (B1App)

Les membres s'enregistrent depuis le portail b1.church à l'écran `/mobile/checkin` (routé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` vers `screens/CheckinPage.tsx`). Il exige un utilisateur connecté et suit les mêmes quatre étapes que la borne -- services → foyer → groupes → finalisation -- avec les mêmes points de terminaison, et un état conservé dans `B1App/src/helpers/CheckinHelper.ts`. Différences avec la borne : le foyer provient du `householdId` propre à l'utilisateur connecté (pas d'étape de recherche), et il n'y a aucune impression d'étiquettes -- l'écran de fin affiche plutôt le code de sécurité du lot sous forme de QR (`qrcode.react`), avec l'indication « présentez ce code à un poste d'enregistrement ». Si le foyer est déjà enregistré au chargement de la page, un bouton « Afficher le code d'enregistrement » réaffiche le QR à partir de la première visite existante (de `GET /attendance/visits/checkin`) qui porte un `securityCode`. L'enregistrement est écrit immédiatement à la soumission (il n'y a pas d'état en attente) ; le QR ne sert qu'à l'impression des étiquettes à la borne.

**Impression d'étiquettes depuis le téléphone vers la borne** (`B1Checkin/app/scan.tsx`, atteint depuis le bouton « Scanner le code » du QR sur l'écran de recherche) : la borne affiche `CodeScanner` (un `CameraView` d'`expo-camera`, face avant par défaut, inversable) qui cherche des codes QR. `ScanCodeHelper.parse()` n'accepte une charge utile que si elle est un code brut de 4 caractères de l'alphabet des codes de sécurité, et `ScanCodeHelper.isRepeat()` ignore le même code pendant 4 secondes, de sorte que le QR de B1App et le bloc QR d'une étiquette imprimée fonctionnent tous deux. L'écran suit ensuite le chemin de réimpression du retrait -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- puis revient à la recherche. Aucune écriture de présence n'a lieu au moment du scan ; il ne s'agit que d'étiquettes. Un code sans visite active, un poste sans imprimante et un groupe sans étiquette affichent chacun une notification et ramènent à la recherche.

Les types et `ApiHelper`/`ArrayHelper` proviennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présence côté administration (B1Admin)

- **Configuration** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) affiche l'arborescence de structure et crée les services (`ServiceEdit.tsx`) et les horaires de service (`ServiceTimeEdit.tsx`). Les données des campus viennent de membership via le hook `useCampuses()`.
- **La présence manuelle** se trouve côté Groupes, et non dans la section Présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée les séances (`POST /attendance/sessions` ; lors de l'ajout, `SessionEdit.tsx` peut inclure une séance pour chacun des autres groupes partageant l'horaire de service choisi, en ignorant les groupes qui ont déjà une séance à cette date) et marque les personnes présentes via `POST /attendance/visitsessions/log`, qui trouve-ou-crée la visite de cette personne pour cette séance. Les responsables de groupe peuvent enregistrer la présence de leurs propres groupes sans l'autorisation `attendance.edit` -- les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapports** -- les rapports de tendance et de présence par groupe sont définis côté serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contre ReportingApi ; définitions dans `Api/reports/*.json`). Les deux prennent `startDate`/`endDate` (date de fin incluse) ; le rapport de tendance par défaut couvre d'il y a un an jusqu'à aujourd'hui et ajoute une colonne `sessionDates` par semaine, et l'arborescence à l'écran du rapport de présence par groupe inclut le `checkinTime` de chaque visite et le `membershipStatus` de la personne. Le CSV de présence par groupe provient du rapport compagnon `groupAttendanceDownload`, pivoté par `GroupAttendanceDownloadHelper` en une ligne par membre du groupe avec une colonne présent/absent par séance datée ; l'historique par personne est `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression des étiquettes

### Modèles et concepteur

Les églises conçoivent leurs propres étiquettes dans B1Admin à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, accessible depuis la page de paramètres de l'enregistrement). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs -- `text`, `field`, `barcode`, `qrcode` ou `box` -- chacun positionné en coordonnées de pourcentage, avec police, alignement, symbologie (`code39`/`code128`/`qr`) et conditions de visibilité facultatives (par exemple n'afficher la case allergie que si `person.nametagNotes` n'est pas vide). Il existe deux `labelType` : `nametag` (une par personne enregistrée ; champs comme `person.displayName`, `sessions`, `securityCode` et `person.isBirthdayWeek` -- `"true"` lorsque le mois et le jour de l'anniversaire sont à moins de 3 jours d'aujourd'hui, en passant d'une fin d'année à l'autre, calculé par `LabelHelper.isBirthdayWithin()`) et `pickup` (une par famille ; champs comme `children`, `childrenAllergies`). Le serveur impose un seul modèle par défaut par type et par église (`LabelTemplateController.save`). Le concepteur fournit des modèles de départ reprenant les étiquettes intégrées de la borne et prévisualise avec des données d'exemple.

### Rendu et impression sur la borne

À la finalisation de l'enregistrement, `B1Checkin/src/helpers/LabelHelper.ts` décide quoi imprimer à partir des indicateurs de groupe de chaque visite en attente : des badges pour les groupes `printNametag`, plus une étiquette de ramassage familial si une visite a atteint un groupe `parentPickup`. Les visites de type `volunteer` sont écartées par `LabelHelper.selectChildVisits()`, de sorte qu'un bénévole de garderie dans une salle de ramassage ne déclenche jamais d'étiquette de ramassage. Le code de sécurité de la réponse d'enregistrement est apposé sur les badges d'enfants et sur l'étiquette de ramassage ; les badges d'adultes s'impriment sans code. Si l'église a des modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforme les blocs et un contexte de champs en un document HTML autonome ; sinon, les étiquettes HTML intégrées de `B1Checkin/assets/labels/` sont utilisées avec remplacement des marqueurs.

Les codes-barres sont générés en SVG intégré par des encodeurs TypeScript purs dans `B1Checkin/src/helpers/barcode.ts` -- tables de motifs Code 39 et tables de largeurs Code 128 (jeu B avec somme de contrôle modulo 103), plus QR via le paquet `qrcode`. **Ces encodeurs sont intentionnellement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, comme l'indique un commentaire de code) afin que les aperçus du concepteur soient identiques pixel pour pixel à la sortie de la borne ; toute modification de l'un doit être reportée dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans un `WebView`, la capture en JPG via `react-native-view-shot`, et transmet les URI d'image au module Expo natif **printer-helper** (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()` et des événements d'état, avec un fournisseur par marque sur les deux plateformes :

| Marque | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK d'impression Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes découpées 29×90, la valeur par défaut recommandée |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression d'image TCP/ZPL |

La sélection de l'imprimante se trouve dans `app/printers.tsx` (le balayage réseau renvoie des entrées `brand~model~ip` ; le choix est conservé dans AsyncStorage), et `src/helpers/PrinterLog.ts` tient un journal de diagnostic sur l'appareil, affiché par un voyant d'état en direct dans l'en-tête de la borne.

## Inscription des visiteurs

Deux chemins créent une personne au cours de l'enregistrement :

- **À la borne** -- l'action « Ajouter un visiteur » de l'écran du foyer ouvre `B1Checkin/app/addGuest.tsx`, qui recherche d'abord `GET /membership/people/search?term=` une correspondance existante hors membres, et crée sinon une personne avec `POST /membership/people`, rattachée au foyer actuel. Le visiteur passe ensuite par l'affectation de groupe comme tout membre.
- **En libre-service par QR** -- lorsque le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres d'enregistrement de B1Admin, lu depuis `GET /membership/settings/public/{churchId}`), l'écran de recherche de la borne affiche un QR code qui mène à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille visiteuse de s'inscrire sur son propre téléphone grâce au point de terminaison anonyme `POST /membership/people/guest-register`, ce qui fait avancer la file à la borne. La feuille du QR contient aussi un bouton **Inscrivez-vous ici** qui ouvre la même page sur la borne (`app/guestRegister.tsx`) dans un `WebView` en navigation privée, sans cache ; `src/helpers/GuestRegisterHelper.ts` construit l'URL pour le QR et le `WebView`, et bloque la navigation hors de `https://{subdomain}.b1.church/guest-register`. L'écran revient à la recherche sur **Terminé**, en arrière, ou après 120 secondes d'inactivité (la saisie dans le formulaire est transmise du `WebView` comme activité), en démontant le `WebView` pour que les saisies d'une famille n'atteignent jamais la suivante.

L'inscription par QR est pilotée par les paramètres d'église enregistrés depuis la carte **Inscription des visiteurs par QR** de B1Admin (`src/mobile/CheckInPage.tsx`) :

| Paramètre | Visibilité | Rôle |
|---|---|---|
| `enableQRGuestRegistration` | publique | Interrupteur d'activation pour le QR de la borne et les points de terminaison anonymes |
| `guestRegistrationFields` | publique | Dictionnaire JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Par défaut : e-mail et téléphone facultatifs, le reste désactivé. Prénom et nom sont toujours obligatoires |
| `guestRegistrationImage` | publique | URL de la photo d'en-tête ; B1App l'affiche en 16:9 à la place de l'icône sur le formulaire et sur l'écran de confirmation |
| `guestRegistrationGroupId` | privée | Groupe auquel chaque inscription est ajoutée (les visiteurs ne le voient ni ne le choisissent) |
| `guestRegistrationRecordAttendance` | privée | `"true"` pour enregistrer aussi la présence à ce groupe |

`src/components/checkin/GuestRegister.tsx` de B1App récupère la liste de contrôle depuis le point de terminaison anonyme `GET /membership/people/guest-register/options?churchId=` et n'affiche que les champs inclus (e-mail, téléphone, état civil et adresse pour le contact principal ; date de naissance, sexe et niveau pour chaque membre ; une seule case de commentaires), et n'envoie que ceux-là. Le serveur réapplique la liste de contrôle dans `GuestRegistrationHelper.sanitize()` -- les champs désactivés sont retirés, les valeurs obligatoires manquantes ou hors liste donnent un 400 -- avant que `PersonHelper.registerGuestHousehold()` ne s'exécute. Il appelle d'abord `PersonRepo.findGuestMatch()` pour chaque membre ayant un e-mail ou un téléphone : une seule personne vivante avec le même prénom et les mêmes chiffres d'e-mail ou de téléphone est réutilisée (zéro ou plusieurs correspondances créent une nouvelle personne, de sorte que le système ne devine jamais). Un membre sans coordonnées correspond par prénom au sein du foyer associé. Les personnes réutilisées ne sont jamais modifiées ; un formulaire anonyme ne peut donc pas écraser des renseignements enregistrés, et la réponse reprend les noms soumis. Les membres non associés rejoignent le foyer associé ou un nouveau foyer, comme `membershipStatus: "Visitor"`, en émettant `person.created` pour chaque nouvelle personne. Ensuite, les échecs sont consignés plutôt que renvoyés : les membres sont ajoutés au groupe configuré (`group.member.added`) ; si l'enregistrement de la présence est activé, `AttendanceModuleGateway.recordAttendance()` marque chaque membre présent pour chacun des horaires de service planifiés du groupe dont la fenêtre d'enregistrement (`CheckinGateHelper.isServiceTimeOpen`) est ouverte à cet instant, en créant la séance pour la date locale de l'église du jour si nécessaire -- les horaires non planifiés et les inscriptions hors fenêtre n'enregistrent rien ; et les commentaires deviennent une conversation de note privée sur le chef de famille (auteur du message « Guest sign-up »), reliée par `person.conversationId`.

## Pages connexes

- [Points de terminaison Attendance](../api/endpoints/attendance) -- surface REST complète pour les campus, services, séances, visites et visitSessions
- [Points de terminaison Membership](../api/endpoints/membership) -- personnes, foyers et groupes
- [Webhooks](../api/webhooks) -- les événements `session.created`, `attendance.recorded` et `attendance.checkout`
- [Structure des modules](../api/module-structure) -- comment le module de présence est organisé côté serveur
