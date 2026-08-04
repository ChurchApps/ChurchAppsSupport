---
title: "Journal d'audit et lots annulables"
---

# Journal d'audit et lots annulables

<div class="article-intro">

Chaque mutation initiée par un utilisateur dans l'API est enregistrée — qui, quoi, quand, et d'où — sur tous les modules, sans aucun câblage par contrôleur. Au-dessus de ce registre se trouve une couche de lots : une importation ou une action en masse peut être étiquetée comme un lot puis **annulée** ligne par ligne, à la manière de Planning Center. Les deux vivent dans une seule table `auditLogs` de la base de données d'adhésion et sont entièrement pilotés depuis un point de passage unique, `BaseController.actionWrapper`. Cette page décrit ce qui est audité, où résident les données, les compromis de performance qui les façonnent, et comment l'annulation inverse un lot en toute sécurité sans transactions inter-bases de données.

</div>

## Vue d'ensemble

```
chaque requête mutante (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ dérive {module, entityType, category, action}
        │                         à partir de req.baseUrl + méthode  (AUDIT_REGISTRY = substitutions/exclusions uniquement)
        │
        ├─ mode normal ─────────▶ exécute l'action ─▶ attend AuditLogHelper.log(valeurs-après)  ──┐
        │                                        (les suppressions capturent aussi une image d'avant)     │
        │                                                                                  ▼
        └─ X-Batch-Id présent ──▶ snapshot des images-avant (strict) ─▶ exécute l'action ─▶ lignes d'audit marquées batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (BD adhésion, une table, tous modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ parcourt les lignes en sens inverse, par entité ┘
                                          garde-fou de conflit → restaurer / supprimer / réinsérer
```

Deux faits structurels pilotent tout ce qui suit :

1. **La couche contrôleur est le seul endroit qui connaît l'acteur.** Les référentiels (repositories) ne voient jamais `AuthenticatedUser` ; seuls les contrôleurs détiennent `au`. Les contrôleurs de chaque module passent déjà par `BaseController.actionWrapper`, c'est donc là que l'audit se branche — aucune signature de référentiel ne change nulle part.
2. **Une seule table sert tous les modules.** Les lignes d'audit pour les dons, la présence, le contenu, etc. sont toutes écrites dans la table `auditLogs` de la BD d'adhésion via `RepoManager.getRepos("membership")`, même depuis un contrôleur hors-adhésion. « Tout ce que Jane a changé aujourd'hui » reste une seule requête.

## Ce qui est audité

L'audit est **activé par défaut pour chaque verbe mutant sur chaque route**. `actionWrapper` dérive les champs d'audit de la requête sans aucune configuration par route :

| Champ | Dérivé de |
|-------|--------------|
| `module` | `this.moduleName` (le module propriétaire) |
| `entityType` | dernier segment de `req.baseUrl` mis au singulier (par ex. `/membership/people` → `person`) |
| `category` | par défaut `entityType` |
| `action` | `${entityType}_saved` pour `POST /`, `${entityType}_deleted` pour `DELETE /:id`, sinon `${entityType}_${method}:${routePath}` pour que les sous-routes non-CRUD (par ex. `task_post:/:id/move`) soient capturées automatiquement |

`BaseController.AUDIT_REGISTRY` sert **uniquement aux substitutions et aux exclusions** — ce n'est pas une liste blanche. Une route y figure pour renommer sa category/entityType, pour déclarer `{ dbModule, table }` (ce qui la rend capable de lot et d'annulation), pour la marquer `sensitive` (audit des mutations anonymes), ou pour la désactiver avec `optOut: true`.

**Liste d'exclusion** (chemins d'écriture à haut débit qui noieraient le registre) : les `visits` / `visitsessions` / `sessions` / `checkin` de présence (la tempête du check-in du dimanche) et les `messages` / `connections` / `devices` de messagerie (chat et présence). Tout le reste est journalisé.

**Points de terminaison en masse** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sont enregistrés dans `BULK_ROUTES` et émettent **une ligne d'audit par id touché**, donc une importation de 10 000 personnes produit 10 000 lignes — cette granularité par entité est précisément ce qui rend le lot annulable.

**Les mutations anonymes** (`actionWrapperAnon` — don d'invité, inscription d'invité, soumissions de formulaire) ne sont auditées que pour les routes du registre marquées `sensitive`, écrites avec `userId="anonymous"` plus l'adresse IP du client. Les dons sont en tête de liste ; ce chemin a un véritable historique de régressions.

### Rédaction des secrets et plafonds de taille

Avant que toute charge utile `details` ne soit stockée, `AuditLogHelper.capDetails()` exécute `sanitizeValue()` dessus :

- **Les clés secrètes sont rédigées.** Tout champ dont le nom en minuscules figure dans `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) est remplacé par `"[redacted]"`.
- **Les scalaires volumineux sont supprimés.** Tout URI `data:` ou chaîne de plus de 4 Ko (photos en base64, blobs) devient `"[stripped]"`.
- **Les lignes surdimensionnées sont plafonnées.** Si le JSON sérialisé dépasse ~64 Ko, toute la charge utile est remplacée par `{ truncated: true }`. Les lignes tronquées restent consultables — mais **non annulables** (il n'y a pas d'image avant/après à partir de laquelle restaurer).

## Où résident les données

Une seule table `auditLogs` dans la base de données **membership** soutient tous les modules. Colonnes : `id, churchId, userId, category, action, entityType, entityId, details (chaîne JSON MEDIUMTEXT), ipAddress, module, batchId, created`. La migration `tools/migrations/membership/2026-07-04_audit_universal.ts` ajoute `module` + `batchId`, élargit `details` de `TEXT` à `MEDIUMTEXT`, ajoute les index `ix_auditLogs_batch (batchId)` et `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, et crée la table `batches`. La colonne `module` existe précisément pour que les collisions d'`entityType` entre modules (`note`, `setting` existent dans plusieurs) restent filtrables, et l'index d'entité est ce qui alimente à la fois l'historique par entité et le garde-fou de conflit de l'annulation.

Les écritures inter-modules passent par `RepoManager.getRepos("membership")` depuis l'intérieur du wrapper. L'ordre est délibéré : **l'écriture principale se valide d'abord dans la BD du module, l'insertion d'audit ensuite.** En mode normal, un échec d'insertion d'audit est avalé (`console.error`, Sentry le récupère) — l'audit est consultatif et ne doit jamais faire échouer la requête d'un utilisateur. En **mode lot, c'est strict** (voir ci-dessous).

:::info Pourquoi pas des déclencheurs, du CDC, ou des tables par module ?
- **Les déclencheurs MySQL** ne connaissent pas l'utilisateur agissant (la connexion n'a pas `au`), et signifieraient la maintenance de jeux de déclencheurs dans chaque schéma.
- **binlog / CDC** est tout un projet d'infrastructure avec le même problème d'identité de l'acteur.
- **Enfiler `userId` à travers chaque référentiel** toucherait des centaines de fichiers pour déplacer une information que la couche contrôleur détient déjà.
- **Des tables d'audit par module** signifieraient 7× le câblage et des requêtes de dispersion pour toute question inter-module. Une table au point de passage du contrôleur est la conception la moins coûteuse en code qui capture quand même l'acteur.
:::

## Position sur la performance

Le chemin critique est délibérément peu coûteux ; le coût n'est payé que là où il apporte quelque chose.

- **Pas de lecture-avant-écriture sur les mises à jour normales.** Une sauvegarde ordinaire ne charge **pas** l'ancien enregistrement. Les **valeurs après soumises** sont stockées dans `details.after` ; l'interface reconstruit ancien→nouveau au moment de *l'affichage* en comparant à la ligne d'audit précédente de l'entité. Une seule requête au moment de l'affichage, coût nul à l'écriture. Les champs jamais touchés depuis le lancement n'affichent simplement aucune valeur « ancienne » — c'est acceptable.
- **Les suppressions obtiennent une image d'avant.** `DELETE /:id` sur une route du registre avec `{ dbModule, table }` charge d'abord la ligne de manière générique et la stocke dans `details.before`. Les suppressions sont rares et l'image d'avant représente toute la valeur médico-légale.
- **Le mode lot est la seule lecture-avant-écriture systématique**, et il est opt-in — une opération en masse/d'importation est déjà coûteuse, donc N lectures de snapshot sont le prix de l'annulation.
- **Les insertions d'audit sont attendues (await).** `actionWrapper` collecte les promesses de journalisation et fait `await Promise.allSettled(...)` avant de retourner. C'est l'invariant le plus important : sur Lambda, le conteneur **gèle à l'instant où la réponse est renvoyée**, donc une insertion non attendue est silencieusement perdue. « Tir et oublie » signifie ici que *les erreurs ne font jamais échouer la requête*, pas *ne pas attendre* — une seule insertion sur le pool d'adhésion déjà chaud coûte ~1–3 ms.

## Lots et annulation

Un **lot** regroupe un ensemble de mutations afin qu'elles puissent être examinées et inversées ensemble. Il y a deux façons d'en ouvrir un :

- **Explicite :** `POST /membership/batches { label, source }` renvoie un `batchId`. Le client (B1Transfer, une interface d'importation B1Admin) envoie ensuite `X-Batch-Id: <id>` sur chaque sauvegarde/suppression ultérieure. `POST /membership/batches/:id/complete` le clôture et horodate `itemCount`.
- **Implicite :** les quatre points de terminaison en masse ouvrent, remplissent et complètent leur propre lot au sein de la seule requête, renvoyant le `batchId` dans la réponse.

La table `batches` (BD adhésion) : `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Le mode lot est strict

Quand `X-Batch-Id` est présent, `actionWrapper` renforce chaque garde-fou (`writeBatchAuditRows`) :

1. Le lot doit exister, être `open`, et appartenir à `au.churchId` — sinon **403**.
2. La route doit être compatible avec les lots (`{ dbModule, table }` dans le registre) — sinon **400**.
3. Avant que l'action ne s'exécute, les images d'avant pour tous les ids affectés sont chargées en **une seule** requête `WHERE id IN (...) AND churchId = ?`. Si cette lecture de snapshot échoue, la requête **échoue avec 500 et l'action ne s'exécute pas** — le mode lot ne doit jamais produire silencieusement un registre non annulable. (Le mode normal, à l'inverse, fait de son mieux et avale les échecs de snapshot.)
4. Une fois l'action réussie, une ligne d'audit par entité est écrite avec `batchId`, `details.before`, et `details.after`, plus un **marqueur de création** explicite pour les lignes créées par le lot.

### Annulation

`POST /membership/batches/:id/undo` (permission : créateur du lot ou `Permissions.server.admin`). Elle est refusée si le lot n'est pas `completed` ou s'il est plus vieux que la **fenêtre d'annulation de 30 jours**. `BatchUndoHelper.undo()` alors :

1. Charge les lignes d'audit du lot et les **regroupe par `(module, entityType, entityId)`.** Une entité touchée plusieurs fois au sein d'un lot est inversée **une seule fois**, en revenant à son véritable état pré-lot — l'image d'avant la plus ancienne, ou une suppression si le lot l'a créée. C'est pourquoi l'annulation ne rejoue pas naïvement chaque ligne : restaurer un snapshot intermédiaire en milieu de lot serait incorrect.
2. Pour chaque entité, exécute d'abord le **garde-fou de conflit** : `auditLog.hasLaterModification()` demande si une entrée d'audit *ultérieure* existe pour ce même `(module, entityType, entityId)` en dehors de ce lot. Si oui, l'entité a été modifiée après l'importation — elle est **ignorée et signalée**, jamais écrasée. Cela réutilise le journal d'audit lui-même comme détecteur de modification ; aucune colonne `modifiedAt` n'est nécessaire sur aucune table.
3. Inverse selon l'opération enregistrée, en résolvant `{ dbModule, table }` depuis le registre et en utilisant des écritures Kysely génériques :
   - **created** → suppression matérielle de la ligne.
   - **updated** → réécrit `details.before`.
   - **deleted** → réinsère `details.before` (mise-à-jour-ou-insertion si une ligne portant cet id a refait surface).
4. Chaque inversion est elle-même auditée (`action: "<entityType>_undone"`, sans `batchId` — l'annulation d'une annulation est hors périmètre).

L'opération est choisie à partir du **marqueur de création** explicite, jamais déduite d'une image d'avant manquante — une image d'avant légitimement vide ou une ligne tronquée ne doivent pas être confondues avec une création.

La charge utile de résultat est `{ restored, skippedConflicts: [...], failed: [...], status }` ; le lot passe à `undone` (propre) ou `partial`. **Il n'y a pas de transaction inter-BD** — l'annulation fait de son mieux ligne par ligne, la même limitation que Planning Center documente pour les profils fusionnés.

:::warning Les entités à effet de bord ont besoin d'un crochet `onUndo`
Inverser une création `groupMember` doit aussi écrire `groupMemberHistory` (« left »), sinon les analyses d'attrition se cassent silencieusement — un invariant permanent du workspace. De telles entités enregistrent un rappel `onUndo` dans `AUDIT_REGISTRY` qui renvoie `true` quand il a entièrement pris en charge l'inversion, contournant le chemin générique. `groupMembers` en est le cas canonique (indexé par id de ligne sur le chemin explicite mais par `personId` sur les points de terminaison en masse, et suivi dans l'historique à chaque ajout/suppression).
:::

## Surfaces consommatrices

Les deux surfaces d'administration sont **en cours de réalisation** ; l'intention :

| Surface | Dépôt | Objectif |
|---------|------|---------|
| **Page Journal d'audit** | B1Admin (ManageChurch → Journal d'audit) | Filtrer par module/catégorie/utilisateur/entité et afficher les diffs ancien→nouveau — pour les modifications en comparant à l'entrée précédente de l'entité, pour les suppressions à partir de `details.before`. Alimenté par `GET /membership/auditlogs`, protégé par `Permissions.server.admin`. |
| **Page Lots** | B1Admin (même pôle Paramètres) | Liste des lots avec statut et compteurs, **Voir les résultats** (les lignes d'audit du lot via `GET /membership/batches/:id/results`), et un bouton **Annuler** qui affiche le rapport de conflits-ignorés / échecs. |
| **Lots d'importation** | B1Transfer | Ouvre un lot, envoie `X-Batch-Id` sur ses appels de sauvegarde normaux, le complète à la fin — les importations deviennent annulables sans nouveaux points de terminaison d'importation. L'`importKey` historique reste comme marqueur de lignée pour les créations seulement, remplacé pour l'annulation. |

## Pièges qu'un futur changement ne doit pas régresser

- **Les insertions d'audit doivent rester attendues.** Un `AuditLogHelper.log(...)` non attendu est perdu par le gel de Lambda. Collecter les promesses et faire `await Promise.allSettled` avant de retourner.
- **Kysely supprime `undefined` de `.set()`/`.values()`.** À la restauration, une colonne effacée survivrait sans changement. `BatchUndoHelper` convertit chaque champ absent en `null` explicite (`nullify`) — ne jamais le contourner pour une écriture directe « plus rapide ».
- **La rétention doit rester bien au-dessus de la fenêtre d'annulation.** `AuditLogRepo.deleteOld()` s'exécute sur le minuteur nocturne (rétention de 365 jours par défaut) ; la fenêtre d'annulation est de 30 jours. Si la rétention se rapproche un jour de la fenêtre, les registres d'annulation seraient purgés sous des lots encore ouverts.
- **Les lignes tronquées ne sont pas annulables.** Une charge utile `{ truncated: true }` n'a pas d'image avant/après ; l'annulation la signale comme `failed`, sans jamais deviner.
- **L'ordre est écriture-module-puis-audit.** Ne jamais déplacer l'insertion d'audit avant l'écriture réelle, et la garder stricte-en-lot / consultative-en-normal.

## Inventaire des fichiers

| Zone | Fichiers |
|------|-------|
| Wrapper / registre | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Moteur d'annulation | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Aide d'audit | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Contrôleurs | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modèles / référentiels | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Interface d'administration (en cours) | Pages Journal d'audit + Lots de B1Admin ; en-tête de lot d'importation de B1Transfer |

## Pages connexes

- [Structure des modules](../api/module-structure) — comment un contrôleur hors-adhésion atteint les référentiels d'adhésion via `RepoManager`
- [Dons](./giving) — les chemins d'écriture de dons qui sont audités comme `sensitive` même lorsqu'ils sont anonymes
- [Points de terminaison d'adhésion](../api/endpoints/membership) — la surface REST qui porte `X-Batch-Id` et expose `/auditlogs` et `/batches`
