---
title: "Présences"
---

# Présences

<div class="article-intro">

La présence est un système avec trois portes : l'application kiosque B1Checkin pour les stations gérées et libre-service, la présence automatique dans le portail des membres B1App, et la présence d'administration dans B1Admin. Tous trois écrivent au même module de présence dans l'API core, et le routage des salles de classe est entièrement piloté par les groupes - il n'y a pas d'entité "lieux" ou "salles" séparée. Une couche de sécurité des enfants s'en vient : types de présence par visite, portails de capacité et de ratio de bénévoles côté serveur, éligibilité d'âge/grade côté kiosque, vérification de récupération approuvée à la fermeture, et appels aux parents via le fournisseur de messagerie texte de l'église. Cette page mappe le modèle de données, les flux de présence, la couche de sécurité, et le pipeline d'impression d'étiquettes.

</div>

## Aperçu

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                      │
│  groups → complete/print │  │  HTTPS  │  ┌─ module adhésion ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ module présence ─────────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (routage des salles)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Chemin d'impression d'étiquette (kiosque seulement):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modèles d'étiquette, ou repli HTML groupé)
       └▶ LabelRenderer → document HTML + codes-barres SVG en ligne
            └▶ PrintUI: rendu WebView → capture JPG ViewShot
                 └▶ module-aide-imprimante natif → Brother QL / Zebra
```

| Surface | Dépôt | Pile | Rôle |
|---------|------|------|------|
| Kiosque | `B1Checkin` | Expo / React Native, routage de fichier expo-router ; constructions EAS pour Android, Amazon Fire, et iOS ; mises à jour OTA via `expo-updates` | Station gérée ou libre-service avec impression d'étiquette et fermeture vérifiée |
| Présence automatique | `B1App` | Next.js (portail des membres b1.church) | Les membres connectés enregistrent leur ménage à partir d'un téléphone ; pas d'impression |
| Administration | `B1Admin` | SPA React | Configure la structure du service, assigne les groupes aux heures de service, conçoit les étiquettes, enregistre la présence manuelle, exécute les rapports |

Tous trois appellent les deux mêmes modules API via `ApiHelper` : **MembershipApi** (`/membership`) pour les personnes, ménages, et groupes ; **AttendanceApi** (`/attendance`) pour tout ci-dessous.

## Modèle de données (`Api/src/modules/attendance`)

| Entité / table | Champs clés | Sens |
|----------------|-----------|------|
| `campuses` | name, address | Dépasse ici — les campus sont maîtrisés dans le module adhésion (`/membership/campuses`) ; la copie de présence est gelée en lecture seule pour les lecteurs hérités (`models/Campus.ts`) |
| `services` | campusId, name | Un rassemblement régulier, par ex. "Dimanche matin" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Une tranche horaire au sein d'un service, par ex. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tableau de jonction : quels groupes (salles de classe) se réunissent à quelles heures de service (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Une réunion d'un groupe à une date — créée paresseusement au moment de la présence (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Une personne assistante à une date (`models/Visit.ts`). `checkinType` est `member` / `guest` / `volunteer` (NULL = membre hérité), défini par le kiosque et consommé par les portails de capacité/ratio |
| `visitSessions` | visitId, sessionId | Quelle(s) session(s) une visite couvre — un enfant enregistré à deux heures de service obtient deux lignes (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocs JSON) | Mises en page d'étiquette concevables (`models/LabelTemplate.ts`) |

### Comment une présence complétée est persistée

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gère `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Le corps est un tableau d'objets `Visit`, chacun portant `visitSessions` dont la `session` intégrée ne nomme qu'une paire `(serviceTimeId, groupId)`. Le serveur alors :

1. **Portails de capacité et de ratio avant tout écrit.** `evaluateGates()` → `CheckinGateHelper.evaluate()` vérifie la capacité de chaque salle ciblée, la capacité pour invités, le drapeau fermé, et le ratio de bénévoles par rapport à l'occupance actuelle. postCheckin n'est **pas transactionnel**, donc le portail doit courir avant la première sauvegarde — une violation dure retourne 409 nommant la(les) salle(s) offensante(s) et rien n'est persisté. Voir [Portails de capacité et de ratio de bénévoles](#capacity-and-volunteer-ratio-gates).
2. **Résout les sessions paresseusement.** `getSessionId()` trouve ou crée la ligne `sessions` pour `(groupId, serviceTimeId, aujourd'hui)` — les ids de session sont mis en cache en-processus par date. Les nouvelles sessions émettent un webhook `session.created`. La boucle est un `for..of` attendu — un premier `forEach(async …)` sans attendre précédent a couru la sauvegarde et écrit des sessionIds NULL à la création de la première session (corrigé ; noté dans un commentaire de code à la boucle).
3. **Remplace les enregistrements du jour.** Toute visite existante pour ces personnes à ce service aujourd'hui est supprimée avec ses visitSessions, puis l'ensemble soumis est sauvegardé. Ré-enregistrer une famille est donc une opération idempotente "ceci est l'état actuel", pas une annexe. Passer `?checkDuplicates=true` retourne à la place `{ duplicates: [personId…] }` sans écrire, ce qui est comment le kiosque avertit avant d'écraser.
4. **Génère un code de sécurité par lot.** `SecurityCodeHelper.generate()` produit un code à 4 caractères de l'alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (pas de voyelles ni caractères ambigus, donc les codes ne peuvent pas épeler des mots ou mal se lire). Le serveur réessaie sur collision contre les visites ouvertes du même jour de la même église et horodate le code sur chaque visite du lot.
5. **Retourne `{ streaks, securityCode }`.** `streaks` mappe personId à un compte de présence consécutif-semaine ; le kiosque célèbre les jalons (chaque 5e semaine) avec des confettis.

Chaque visite sauvegardée émet également un webhook `attendance.recorded`. Le côté lecture, `GET /attendance/visits/checkin`, retourne les visites des personnes à partir de leur **date dernièrement enregistrée** — si c'était une semaine précédente les ids sont supprimés, donc le client reçoit une copie pré-remplie des sélections de salles de la semaine précédente qui sauvegarde en tant que nouveaux enregistrements.

### Fermeture

Deux points de terminaison complètent la boucle (`VisitController`) :

- `GET /attendance/visits/code/:code` — les visites d'aujourd'hui pas encore fermeuses portant ce code de sécurité, avec sessions remplies.
- `POST /attendance/visits/checkout` — corps `{ visitIds, checkedOutBy?, checkedOutById? }` ; horodate `checkoutTime` et qui a récupéré, et émet un webhook `attendance.checkout` par visite.

Permissions : les kiosques s'authentifient avec `attendance.checkin`, qui accorde exactement la surface de présence/fermeture/modèle d'étiquette ; `attendance.view`/`attendance.edit` couvrent le rapport et l'entrée manuelle ; la structure (services, heures de service, assignations de groupe) nécessite `services.edit`.

## Les groupes pilotent le routage des salles

Il n'y a aucune salle ni entité de salle de classe nulle part dans le système. Une "salle" est un **groupe** d'adhésion avec `trackAttendance` activé, lié à une ou plusieurs heures de service via `groupServiceTimes`. Les champs du groupe (sur `Api/src/modules/membership/models/Group.ts`) qui façonnent le comportement du kiosque :

| Champ | Effet |
|------|-------|
| `trackAttendance` | Le groupe participe à la présence du tout ; l'arbre de configuration de B1Admin marque les groupes `trackAttendance` sans ligne `groupServiceTimes` comme non assignés |
| `parentPickup` | Marque une salle pour enfants : l'enregistrement à celle-ci rend la visite une visite "enfant", qui imprime une étiquette de récupération familiale et met le code de sécurité sur l'étiquette de nom |
| `printNametag` | Si les enregistrements à ce groupe impriment une étiquette de nom du tout |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacité de la salle et un commutateur "fermé" dur, appliquées côté serveur par le portail de presqu'un (modifié dans les paramètres du groupe de B1Admin sous "Capacité de présence") |
| `volunteerRatio` / `minVolunteers` | Ratio enfants-par-bénévole et compte minimal de bénévoles, appliqués par le paramètre `ratioEnforcement` à l'échelle de l'église |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites d'éligibilité âge/grade évaluées côté kiosque pour mettre en évidence ou assombrir les salles |

Chaque client dénormalise de la même manière (par ex. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`) : charger `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, et `GET /membership/groups` en parallèle, puis pour chaque heure de service recueillir les groupes dont la ligne `groupServiceTimes` le pointe dedans dans `serviceTime.groups`. Cet tableau est ce que le sélecteur de salle affiche, organisé par `categoryName` de groupe.

Les assignations sont éditées depuis la page du groupe dans B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), et l'arbre entier Campus → Service → Heure de service → Groupe est visualisé dans `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Parce que les groupes sont la seule source de vérité, la même adhésion de groupe alimente le routage du kiosque, la présence de style roster sur les pages de groupe de B1Admin, et le rapport de présence — assigner un groupe à une heure de service est la seule étape nécessaire pour en faire une destination de presqu'un.
:::

## Sécurité des enfants

### Types de présence

Chaque visite porte un `checkinType` — `member`, `guest`, ou `volunteer` (NULL signifie hérité/membre ; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Le type est choisi **côté kiosque** : pastilles Membre / Invité / Bénévole sur la ligne de membre étendue (`B1Checkin/src/components/MemberServiceTimes.tsx`), horodaté sur chaque visite en attente à la completion (`app/checkinComplete.tsx`, par défaut `member`). Le serveur le consomme dans le portail — les bénévoles comptent vers la couverture de ratio au lieu de contre la capacité, et les invités comptent contre `guestCapacity`.

### Portails de capacité et de ratio de bénévoles

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) s'exécute à l'intérieur de `postCheckin` avant toute sauvegarde (le point de terminaison est non-transactionnel, donc le portail-avant-sauvegarde est le mécanisme de correction). Il charge l'occupance actuelle par groupe ciblé (`VisitRepo.countActiveByGroupToday`) et la configuration du groupe via le portail du module adhésion, puis classe les violations :

- **Dur (toujours bloquer) :** `checkinClosed`, `actuel + entrant > capacité`, compte d'invités au-delà `guestCapacity`. Le lot est rejeté avec `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — le kiosque affiche la salle nommée.
- **Ratio (avertir ou bloquer) :** entrant non-bénévole dans une salle où `bénévoles < minBénévoles`, pas de bénévoles du tout, ou `enfants > bénévoles × volunteerRatio`. La sévérité suit le paramètre par église `ratioEnforcement` (`"warn"` défaut / `"block"`, édité dans B1Admin Gérer l'église → Présence, `CheckinSettingsEdit.tsx`). Le mode avertissement retourne `409 { warning: true, error: "ratio", … }` à moins que le client renvoie avec `acknowledgeWarnings=true` — ce renvoi est le remplacement de confirmation du personnel du kiosque.

### Éligibilité d'âge/grade (côté kiosque)

L'éligibilité de la salle est l'IU consultatif, évaluée sur le kiosque, pas appliquée par le serveur. `B1Checkin/src/helpers/EligibilityHelper.ts` compare la date de naissance/grade d'une personne contre les `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` du groupe (ordre de grade : PreK, K, 1–12, Diplômé) et retourne `eligible` / `ineligible` / `unknown` — les données manquantes donnent `unknown` et ne masquent jamais une salle. Les âges et grades sont calculés à partir de la **date de promotion de grade** de l'église (`gradePromotionDate` paramètre, `"MM-DD"`, édité dans `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`) ; le kiosque le récupère de `GET /attendance/checkin/settings`, et `resolveAsOfDate` choisit la plus récente occurrence le jour ou avant aujourd'hui. Le sélecteur de salle met en évidence les salles éligibles et assombrit les inéligibles ; choisir une salle assombrie nécessite une confirmation du personnel.

### Récupération approuvée et non autorisée

Les personnes qui récupèrent sont une entité d'adhésion, par ménage : `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId optionnel, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD est `GET /membership/householdpickup/:householdId` (tout utilisateur d'église authentifié, donc les kiosques peuvent le lire) plus `POST` / `DELETE` gatté par `people.edit`. Le personnel gère la liste sur la carte **Récupération** de la page de la personne (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relation, et une pastille de statut Approuvé/Non autorisé.

À la fermeture (`B1Checkin/app/checkout.tsx`) le kiosque charge la liste de récupération du ménage : les entrées `trusted` rendent comme des cartes de récupération appuyables aux côtés de la grille de photos adulte du ménage, et un nom librement tapé est flou-apparié (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contre les entrées `notAuthorized` — une correspondance bloque la fermeture avec une feuille d'avertissement et un bouton de remplacement du personnel. Le remplacement est enregistré sur la visite elle-même : il publie `checkedOutBy` comme `"OVERRIDE: {name}"` via le normale `POST /attendance/visits/checkout`, donc il atterrit dans l'enregistrement de presqu'un et le webhook `attendance.checkout` plutôt qu'une table d'audit séparée.

### Appel d'un parent et diffusion d'urgence

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expose deux points de terminaison SMS :

- `POST /page` — `{ visitId, message }`: appelle les tuteurs d'un enfant enregistré (écran de fermeture du kiosque, mode géré).
- `POST /broadcast` — `{ serviceId, message }`: envoie un texte aux adultes de chaque ménage enregistré pour un service (paramètres d'administration du kiosque, derrière une feuille de confirmation de type `EMERGENCY` dans `B1Checkin/app/adminSettings.tsx`).

Les deux résolvent les adultes du ménage via le portail d'adhésion, puis livrent à **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la porte inter-modules dans le fournisseur de messagerie texte configuré de l'église (`@churchapps/texting` : TextInChurch, Clearstream, ou MutualMinistry ; il n'y a pas de SMS intégré). Le portail enregistre une ligne `sentText` plus des entrées `deliveryLog` par destinataire et plafonne un lot à 500 destinataires ; sans fournisseur configuré il retourne `no_provider`, que le kiosque affiche comme "Aucun fournisseur SMS configuré". Le remplacement `dispatch()` du contrôleur dédupe les numéros de téléphone et ignore les personnes sans mobile ou `optedOut` défini, retournant `{ sent, failed, skippedOptedOut, skippedNoPhone }` pour que le kiosque affiche ce qui a été ignoré.

## Le kiosque (B1Checkin)

Les écrans sont des fichiers expo-router sous `B1Checkin/app/` ; l'état inter-écrans vit dans une classe statique `CachedData` (`src/helpers/CachedData.ts`), pas l'état React.

```
index (démarrage/auto-connexion) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                              │             │  ▲         │ │            │
             charge serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ imprimer étiquettes,
             groupServiceTimes,           │             └▶ checkout (géré)           retour auto
             labelTemplates               │                                            à lookup
```

1. **Lookup** (`app/lookup.tsx`) — recherche par téléphone (`GET /membership/people/search/phone?number=`, 4 derniers chiffres ou complet) ou par nom (`GET /membership/people/search?term=`). Sélectionner une correspondance charge le ménage (`GET /membership/people/household/{householdId}`) et les visites existantes (`GET /attendance/visits/checkin`), ensemençant `pendingVisits` avec les sélections de la semaine passée.
2. **Examen du ménage** (`app/household.tsx`, `src/components/MemberList.tsx`) — chaque ligne de membre affiche un badge déjà-enregistré, un badge allergie/`nametagNotes`, et ses pastilles de salle actuelle. Développer un membre liste chaque heure de service avec un bouton de salle plus les pastilles de type de presqu'un Membre / Invité / Bénévole (`MemberServiceTimes.tsx`).
3. **Assignation de groupe** (`app/selectGroup.tsx`) — un arbre de catégorie construit à partir de `serviceTime.groups`, avec les salles éligibles d'âge/grade mises en évidence et les inéligibles assombries derrière une confirmation du personnel (voir [Éligibilité d'âge/grade](#agegrade-eligibility-kiosk-side)) ; choisir une salle écrit une visite `{ session: { serviceTimeId, groupId } }` visitSession dans la visite en attente de cette personne (`src/helpers/VisitSessionHelper.ts`). "Aucune" la vide.
4. **Complet** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` avec `pendingVisits` (chacun horodaté avec son `checkinType`), puis imprime des étiquettes si une imprimante est configurée et retour auto à lookup. Une réponse `409` de capacité affiche la salle pleine/fermée nommée ; un avertissement de ratio offre une confirmation du personnel qui renvoie avec `acknowledgeWarnings=true`.

L'écran de **fermeture** (`app/checkout.tsx`) accepte le code de sécurité à 4 caractères via une entrée auto-focalisée — pour que les scanners de code-barres USB/Bluetooth fonctionnent sans caméra — ou un clavier à l'écran utilisant le même alphabet, auto-soumettant à 4 caractères. Il recherche le code, affiche les enfants fermés, et présente les **personnes de récupération approuvée** du ménage comme des cartes appuyables aux côtés d'une grille de photos adultes du ménage (plus une option libre-texte "Autre" qui est flou-vérifiée contre les noms non autorisés — voir [Récupération approuvée et non autorisée](#trusted-and-not-authorized-pickup)), puis publie `POST /attendance/visits/checkout` avec le nom/id de la personne qui récupère. En mode géré l'écran offre aussi un **Appel d'un parent** (`POST /attendance/checkin/page`) et une **réimpression d'étiquette de sécurité** — `reprint()` reconstruit les étiquettes de la famille avec `LabelHelper.getAllLabelsFor(...)` et les alimente via le même pipeline `PrintUI` que la presqu'un.

La personnalité de la station est un drapeau AsyncStorage `@StationMode` (`"self"` | `"manned"`, commuté dans `app/adminSettings.tsx`). Le mode géré ajoute le point d'entrée de fermeture sur l'écran lookup et l'édition de profil par membre (`POST /membership/people`) depuis l'écran ménage. Le durcissement du kiosque est intégré : un PIN optionnel (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) ferme les écrans d'administration et d'imprimante, l'écran d'administration s'ouvre seulement via 7 appuis rapides sur le logo d'en-tête, et un écran d'attraction inactif (`src/hooks/useInactivityTimer.ts`) prend le relais entre les familles.

## Présence automatique (B1App)

Les membres se font enregistrer à partir du portail b1.church à l'écran `/mobile/checkin` (routé par `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` à `screens/CheckinPage.tsx`). Il nécessite un utilisateur connecté et marche les mêmes quatre étapes que le kiosque — services → ménage → groupes → complet — contre les points de terminaison identiques, avec l'état détenu dans `B1App/src/helpers/CheckinHelper.ts`. Les différences du kiosque : le ménage vient du `householdId` du propre utilisateur connecté (pas d'étape de recherche), et le flux se termine à un écran de confirmation — pas d'affichage de code de sécurité et pas d'impression d'étiquette. Les types et `ApiHelper`/`ArrayHelper` viennent de `@churchapps/helpers` et `@churchapps/apphelper` ; aucun composant React n'est partagé avec B1Admin.

## Présence côté administration (B1Admin)

- **Configuration** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rend l'arbre de structure et crée les services (`ServiceEdit.tsx`) et heures de service (`ServiceTimeEdit.tsx`). Les données de campus viennent de l'adhésion via le crochet `useCampuses()`.
- **La présence manuelle** vit côté Groupes, pas la section de présence : `B1Admin/src/groups/components/GroupSessionsTab.tsx` crée les sessions (`POST /attendance/sessions`) et marque les gens présents via `POST /attendance/visitsessions/log`, qui trouve-ou-crée la visite pour cette personne et session. Les leaders de groupe peuvent enregistrer la présence pour leurs propres groupes sans la permission `attendance.edit` — les contrôleurs vérifient `au.leaderGroupIds`.
- **Rapport** — la tendance de présence et la présence de groupe sont des rapports définis par le serveur (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contre ReportingApi) ; l'historique par personne est `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impression d'étiquette

### Modèles et le concepteur

Les églises conçoivent leurs propres étiquettes dans B1Admin à `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, atteint depuis la page paramètres Presqu'un). Un modèle est une ligne `labelTemplates` dont `content` est un tableau JSON de blocs — `text`, `field`, `barcode`, `qrcode`, ou `box` — chacun positionné dans les coordonnées en pourcent avec police, alignement, symbologie (`code39`/`code128`/`qr`), et conditions de visibilité optionnelles (par ex. seulement rendre la boîte allergie quand `person.nametagNotes` est non-vide). Deux `labelType`s existent : `nametag` (un par personne enregistrée ; champs comme `person.displayName`, `sessions`, `securityCode`) et `pickup` (un par famille ; champs comme `children`, `childrenAllergies`). Le serveur applique un seul défaut par type par église (`LabelTemplateController.save`). Le concepteur navire les modèles de démarrage en miroir les étiquettes groupées du kiosque et les aperçus contre des données d'exemple.

### Rendu et impression sur le kiosque

À la completion de la presqu'un, `B1Checkin/src/helpers/LabelHelper.ts` décide ce qu'imprimer à partir des drapeaux du groupe sur chaque visite en attente : étiquettes de nom pour les groupes `printNametag`, plus une étiquette de récupération familiale si une visite a frappé un groupe `parentPickup`. Le code de sécurité de la réponse de presqu'un va sur les étiquettes de nom des enfants et l'étiquette de récupération ; les étiquettes de nom adulte impriment sans code. Si l'église a des modèles, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) tourne les blocs + un contexte de champ dans un document HTML autonome ; sinon les étiquettes HTML groupées dans `B1Checkin/assets/labels/` sont utilisées avec la substitution de placeholder.

Les codes-barres sont générés comme SVG en ligne par les encodeurs TypeScript pur dans `B1Checkin/src/helpers/barcode.ts` — tables de modèle Code 39 et Code 128 (jeu de code B avec somme de contrôle mod-103) plus QR via le package `qrcode`. **Ces encodeurs sont intentionnellement dupliqués dans B1Admin** (`LabelEditor.tsx` intègre les mêmes tables, noté dans un commentaire de code) pour que les aperçus du concepteur soient pixel-fidèles à la sortie du kiosque ; un changement à un doit être mirrié dans l'autre.

Le pipeline d'impression (`src/components/PrintUI.tsx`) rend chaque étiquette HTML dans un `WebView`, la capture à JPG via `react-native-view-shot`, et remet les URIs d'image au module Expo d'aide-imprimante natif (`B1Checkin/modules/printer-helper/`). Le module expose `scan()`, `checkInit()`, `printUris()`, et des événements de statut, avec un fournisseur par marque sur les deux plates-formes :

| Marque | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Kit Imprimer SDK Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Imprimantes réseau série QL (QL-800/810W/820NWB/1100/1110NWB…), étiquettes meurent-coupé 29×90, le défaut recommandé |
| Zebra | `ZebraProvider.kt` (Kit Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Découverte réseau + impression image TCP/ZPL |

La sélection d'imprimante vit à `app/printers.tsx` (la balayage réseau retourne les entrées `brand~model~ip` ; le choix persiste à AsyncStorage), et `src/helpers/PrinterLog.ts` maintient un journal diagnostique sur l'appareil surfacé via un point de statut direct dans l'en-tête du kiosque.

## Enregistrement d'invité

Deux chemins créent une personne à mi-presqu'un :

- **Au kiosque** — l'écran ménage "Ajouter un invité" ouvre `B1Checkin/app/addGuest.tsx`, qui d'abord recherche `GET /membership/people/search?term=` une correspondance non-membre existante et sinon crée une avec `POST /membership/people`, attachée au ménage actuel. L'invité alors flux par l'assignation de groupe comme tout membre.
- **Libre-service via QR** — quand le paramètre d'église `enableQRGuestRegistration` est activé (configuré dans les paramètres Presqu'un de B1Admin, lire à partir de `GET /membership/settings/public/{churchId}`), l'écran lookup du kiosque affiche un code QR reliant à `https://{subdomain}.b1.church/guest-register?serviceId=`. Cette page B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permet à une famille visitante de se s'enregistrer elle-même sur son propre téléphone via le point de terminaison `POST /membership/people/guest-register` anonyme, maintenant la ligne du kiosque en mouvement.

## Pages connexes

- [Points de terminaison de présence](../api/endpoints/attendance) — Surface REST complet pour les campus, services, sessions, visites, et sessions de visite
- [Points de terminaison d'adhésion](../api/endpoints/membership) — Personnes, ménages, et groupes
- [Webhooks](../api/webhooks) — Les événements `session.created`, `attendance.recorded`, et `attendance.checkout`
- [Structure des modules](../api/module-structure) — Comment le module de présence est organisé côté serveur
