---
title: "Journal d'audit et lots annulables"
---

# Journal d'audit et lots annulables

<div class="article-intro">

Chaque mutation lancée par l'utilisateur dans l'API est enregistrée — qui, quoi, quand, et d'où — sur tous les modules, sans aucun câblage par contrôleur. Au-dessus de ce registre se trouve une couche de lot : une importation ou une action en masse peut être étiquetée comme un lot et ultérieurement **annulée** ligne par ligne, style Planning-Center. Les deux vivent dans une seule table `auditLogs` de la base de données d'adhésion et sont entièrement pilotés à partir d'un seul point de stranglulation, `BaseController.actionWrapper`. Cette page mappe ce qui est audité, où les données vivent, les compromis de performance qui les façonnent, et comment annuler inverse un lot en toute sécurité sans transactions inter-bases de données.

</div>

## Aperçu

```
chaque demande de mutation (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ dériver {module, entityType, category, action}
        │                         à partir de req.baseUrl + méthode  (AUDIT_REGISTRY = substitutions/exclusions uniquement)
        │
        ├─ mode normal ─────────▶ exécuter l'action ─▶ attendre AuditLogHelper.log(valeurs-après)  ──┐
        │                                                (les suppressions capturent également une image-avant)     │
        │                                                                                  ▼
        └─ X-Batch-Id présent ──▶ snapshot images-avant (strict) ─▶ exécuter l'action ─▶ auditer lignes marquées batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (BD adhésion, une table, tous modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ marcher lignes inverses, par entité ┘
                                          garde de conflit → restaurer / supprimer / réinsérer
```

Deux faits structurels pilotent tout ce qui suit :

1. **La couche contrôleur est le seul endroit qui connaît l'acteur.** Les référentiels ne voient jamais `AuthenticatedUser` ; seuls les contrôleurs détiennent `au`. Chaque contrôleur de module passe déjà par `BaseController.actionWrapper`, donc c'est là que l'audit se branche — aucune signature de répo ne change nulle part.
2. **Une table sert tous les modules.** Les lignes d'audit pour les dons, la présence, le contenu, etc. sont tous écrites dans la `auditLogs` de la BD d'adhésion via `RepoManager.getRepos("membership")`, même à partir d'un contrôleur non-adhésion. "Tout ce que Jane a changé aujourd'hui" reste une seule requête.

## Ce qui est audité

L'audit est **activé par défaut pour chaque verbe de mutation sur chaque route**. `actionWrapper` dérive les champs d'audit de la demande sans aucune configuration par route :

| Champ | Dérivé de |
|-------|-----------|
| `module` | `this.moduleName` (le module propriétaire) |
| `entityType` | dernier segment singularisé de `req.baseUrl` (par ex. `/membership/people` → `person`) |
| `category` | par défaut `entityType` |
| `action` | `${entityType}_saved` pour `POST /`, `${entityType}_deleted` pour `DELETE /:id`, sinon `${entityType}_${method}:${routePath}` pour que les sous-routes non-CRUD (par ex. `task_post:/:id/move`) soient capturées automatiquement |

`BaseController.AUDIT_REGISTRY` est **seulement pour les substitutions et exclusions** — ce n'est pas une liste blanche. Une route y apparaît pour renommer sa category/entityType, pour déclarer `{ dbModule, table }` (ce qui la rend capable de lot et d'annulation), pour la marquer `sensitive` (mutations anonymes d'audit), ou pour la désactiver avec `optOut: true`.

**Liste d'exclusion** (chemins d'écriture d'incendie qui noieraient le registre) : les `visits` / `visitsessions` / `sessions` / `checkin` de présence (l'orage de présence du dimanche) et les `messages` / `connections` / `devices` de messagerie (chat et présence). Tout le reste se connecte.

**Points de terminaison en masse** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sont enregistrés dans `BULK_ROUTES` et émettent **une ligne d'audit par id touché**, donc une importation de 10k personnes produit 10k lignes — cette granularité par entité est exactement ce qui rend le lot annulable.

**Mutations anonymes** (`actionWrapperAnon` — don d'invité, inscription d'invité, soumissions de formulaire) sont auditées seulement pour les routes de registre signalées `sensitive`, écrites avec `userId="anonymous"` plus l'adresse IP du client. Les dons mènent la liste ; ce chemin a une véritable histoire de régression.

### Rédaction des secrets et plafonds de taille

Avant que toute charge `details` soit stockée, `AuditLogHelper.capDetails()` exécute `sanitizeValue()` sur elle :

- **Les clés secrètes sont rédactées.** Tout champ dont le nom en minuscules est dans `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) est remplacé par `"[redacted]"`.
- **Les scalaires énormes sont supprimés.** Tout URI `data:` ou chaîne de plus de 4 KB (photos base64, blobs) devient `"[stripped]"`.
- **Les lignes de grande taille sont plafonnées.** Si le JSON sérialisé dépasse ~64 KB, la charge entière est remplacée par `{ truncated: true }`. Les lignes tronquées sont toujours visibles — mais **non annulables** (il n'y a pas d'image avant/après pour restaurer).

## Où les données vivent

Une seule table `auditLogs` dans la base de données **membership** soutient tous les modules. Colonnes : `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. La migration `tools/migrations/membership/2026-07-04_audit_universal.ts` ajoute `module` + `batchId`, élargit `details` de `TEXT` à `MEDIUMTEXT`, ajoute les index `ix_auditLogs_batch (batchId)` et `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, et crée la table `batches`. La colonne `module` existe précisément pour que les collisions `entityType` entre modules (la `note`, la `setting` existent dans plusieurs) restent filtrables, et l'index d'entité est ce qui alimente à la fois l'historique par entité et la garde d'annulation.

Les écritures inter-modules traversent `RepoManager.getRepos("membership")` de l'intérieur du wrapper. L'ordre est délibéré : **l'écriture principale s'engage dans la BD du module en premier, l'insertion d'audit en second.** En mode normal une défaillance d'insertion d'audit est avalée (`console.error`, Sentry la récupère) — l'audit est consultatif et ne doit jamais échouer une demande d'utilisateur. En **mode de lot c'est strict** (voir ci-dessous).

:::info Pourquoi pas les déclencheurs, le CDC, ou les tables par module ?
- **Les déclencheurs MySQL** ne connaissent pas l'utilisateur agissant (la connexion n'a pas `au`), et signifieraient la maintenance des ensembles de déclencheurs dans chaque schéma.
- **binlog / CDC** est un projet d'infrastructure entière avec le même problème d'identité d'acteur.
- **Enfiler `userId` dans chaque référentiel** toucherait des centaines de fichiers pour déplacer les informations que la couche contrôleur détient déjà.
- **Les tables d'audit par module** signifieraient 7× le câblage et les requêtes de ventilation pour toute question inter-module. Une table au point de stranglulation du contrôleur est la conception la moins-code qui capture toujours l'acteur.
:::

## Position de performance

Le chemin chaud est délibérément bon marché ; le coût est payé seulement où il achète quelque chose.

- **Pas de lecture-avant-écriture sur les mises à jour normales.** Une sauvegarde régulière ne charge **pas** l'ancien enregistrement. Les **valeurs après soumises** sont stockées dans `details.after` ; l'UI reconstruit ancien→nouveau au *temps d'affichage* en diffant contre la ligne d'audit précédente de l'entité. Une requête au temps d'affichage, zéro coût au temps d'écriture. Les champs jamais touchés depuis le lancement n'affichent simplement pas la valeur "ancienne" — acceptable.
- **Les suppressions obtiennent une image-avant.** `DELETE /:id` sur une route de registre avec `{ dbModule, table }` charge d'abord la ligne génériquement et la stocke dans `details.before`. Les suppressions sont rares et l'image-avant est toute la valeur médico-légale.
- **Le mode lot est la seule lecture-avant-écriture systématique**, et c'est opt-in — une opération en masse/importation est déjà chère, donc N lectures de snapshot sont le prix de l'annulation.
- **Les insertions d'audit sont attendues.** `actionWrapper` collecte les promesses de journal et `attend Promise.allSettled(...)` avant de retourner. C'est l'invariant le plus important : sur Lambda le conteneur **gèle l'instant où la réponse revient**, donc une insertion non-attendue est silencieusement abandonnée. "Tir et oubli" ici signifie *les erreurs ne font jamais échouer la demande*, pas *n'attends pas* — une seule insertion sur le pool d'adhésion déjà-chaud est ~1–3 ms.

## Lots et annulation

Un **lot** groupe un ensemble de mutations pour qu'elles soient examinées et inversées ensemble. Il y a deux façons d'en ouvrir un :

- **Explicite :** `POST /membership/batches { label, source }` retourne un `batchId`. Le client (B1Transfer, une UI d'importation B1Admin) envoie ensuite `X-Batch-Id: <id>` sur chaque sauvegarde/suppression ultérieure. `POST /membership/batches/:id/complete` le ferme et horodate `itemCount`.
- **Implicite :** les quatre points de terminaison en masse ouvrent, remplissent, et complètent leur propre lot au sein de la seule demande, retournant le `batchId` dans la réponse.

La table `batches` (BD adhésion) : `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Le mode lot est strict

Quand `X-Batch-Id` est présent, `actionWrapper` renforce chaque garde (`writeBatchAuditRows`) :

1. Le lot doit exister, être `open`, et appartenir à `au.churchId` — sinon **403**.
2. La route doit être capable de lot (`{ dbModule, table }` dans le registre) — sinon **400**.
3. Avant que l'action ne s'exécute, les images-avant pour tous les ids affectés sont chargées en **une seule** requête `WHERE id IN (...) AND churchId = ?`. Si cette lecture de snapshot échoue, la demande **échoue 500 et l'action ne s'exécute pas** — le mode lot ne doit jamais produire un registre non-annulable silencieusement. (Le mode normal, en contraste, est au mieux et avale les défaillances de snapshot.)
4. Après que l'action réussisse, une ligne d'audit par entité est écrite avec `batchId`, `details.before`, et `details.after`, plus un **marqueur de création** explicite pour les lignes créées par le lot.

### Annulation

`POST /membership/batches/:id/undo` (permission : créateur du lot ou `Permissions.server.admin`). Il refuse si le lot n'est pas `completed` ou s'il est plus vieux que la **fenêtre d'annulation de 30 jours**. `BatchUndoHelper.undo()` alors :

1. Charge les lignes d'audit du lot et les **groupe par `(module, entityType, entityId)`.** Une entité touchée plusieurs fois au sein d'un lot est inversée **une seule fois**, revenant à son vrai état pré-lot — l'image-avant la plus ancienne, ou une suppression si le lot l'a créée. C'est pourquoi l'annulation ne rejoue pas naïvement chaque ligne : restaurer un snapshot intermédiaire à mi-lot serait faux.
2. Pour chaque entité, exécute d'abord la **garde de conflit** : `auditLog.hasLaterModification()` demande si une entrée d'audit *ultérieure* existe pour ce même `(module, entityType, entityId)` en dehors de ce lot. Si c'est le cas, l'entité a été modifiée après l'importation — elle est **ignorée et signalée**, jamais écrasée. Cela réutilise le journal d'audit lui-même comme le détecteur de modification ; aucune colonne `modifiedAt` n'est nécessaire sur aucune table.
3. Inverse selon l'opération enregistrée, résolvant `{ dbModule, table }` du registre et utilisant des écritures Kysely génériques :
   - **créée** → suppression en dur de la ligne.
   - **mise à jour** → écrire `details.before` en arrière.
   - **supprimée** → réinsérer `details.before` (mise à jour-ou-insertion si une ligne avec cet id a réémergé).
4. Chaque inversion est elle-même auditée (`action: "<entityType>_undone"`, pas `batchId` — l'annulation-d'annulation est hors de portée).

L'opération est choisie à partir du **marqueur de création** explicite, pas déduit d'une image-avant manquante — une image-avant légitimement vide ou une ligne tronquée ne doivent pas être prises pour une création.

Le résultat est `{ restored, skippedConflicts: [...], failed: [...], status }` ; le lot passe à `undone` (propre) ou `partial`. **Il n'y a pas de transaction inter-BD** — l'annulation est au mieux par ligne, la même limitation que Planning Center documente pour les profils fusionnés.

:::warning Les entités à effet secondaire ont besoin d'un crochet `onUndo`
Inverser une création `groupMember` doit aussi écrire `groupMemberHistory` ("parti"), ou l'analyse de churn se casse silencieusement — un invariant du workspace permanent. De telles entités enregistrent un rappel `onUndo` dans `AUDIT_REGISTRY` qui retourne `true` quand il a complètement géré l'inversion, contournant le chemin générique. `groupMembers` est le cas canonique (clé par id de ligne sur le chemin explicite mais par `personId` sur les points de terminaison en masse, et historique-suivi sur chaque ajout/suppression).
:::

## Surfaces de consommateur

Les deux surfaces d'admin sont **en cours** ; l'intention :

| Surface | Dépôt | Objet |
|---------|------|-------|
| **Page Journal d'audit** | B1Admin (ManageChurch → Journal d'audit) | Filtrer par module/category/user/entity et rendre les diffs ancien→nouveau — pour les éditions en diffant contre l'entrée précédente de l'entité, pour les suppressions à partir de `details.before`. Soutenu par `GET /membership/auditlogs`, gatté par `Permissions.server.admin`. |
| **Page Lots** | B1Admin (même hub Paramètres) | Lister les lots avec statut et comptes, **Afficher les résultats** (les lignes d'audit du lot via `GET /membership/batches/:id/results`), et un bouton **Annuler** qui affiche le rapport de conflit-ignoré / défaillance. |
| **Lots d'importation** | B1Transfer | Ouvrir un lot, envoyer `X-Batch-Id` sur ses appels de sauvegarde normaux, compléter à la fin — les importations deviennent annulables sans nouveaux points de terminaison d'importation. L'`importKey` hérité reste comme marqueur de généalogie des créations uniquement, remplacé pour l'annulation. |

## Pièges qu'un futur changement ne doit pas régresser

- **Les insertions d'audit doivent rester attendues.** Un `AuditLogHelper.log(...)` non-attendu est abandonné par le gel Lambda. Collecter les promesses et `attendre Promise.allSettled` avant de retourner.
- **Kysely supprime l'`undefined` de `.set()`/`.values()`.** À la restauration, une colonne effacée survivrait inchangée. `BatchUndoHelper` convertit chaque champ absent en `null` explicite (`nullify`) — ne jamais le contourner pour une écriture "plus rapide".
- **La rétention doit rester bien au-dessus de la fenêtre d'annulation.** `AuditLogRepo.deleteOld()` s'exécute sur le minuteur de nuit (rétention de 365 jours par défaut) ; la fenêtre d'annulation est de 30 jours. Si la rétention baisse vers la fenêtre, les registres d'annulation sont purgés de sous les lots ouverts.
- **Les lignes tronquées ne sont pas annulables.** Une charge `{ truncated: true }` n'a pas d'image avant/après ; l'annulation la signale comme `failed`, jamais devinée.
- **L'ordre est écriture-module-puis-audit.** Ne jamais déplacer l'insertion d'audit en avant de l'écriture réelle, et la garder strict-en-lot / consultatif-en-normal.

## Inventaire de fichiers

| Domaine | Fichiers |
|------|-------|
| Wrapper / registre | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Moteur d'annulation | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Aide d'audit | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Contrôleurs | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modèles / répos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| IU d'administration (en cours) | Pages Journal d'audit + Lots de B1Admin ; en-tête de lot d'importation de B1Transfer |

## Pages connexes

- [Structure des modules](../api/module-structure) — comment un contrôleur non-adhésion atteint les référentiels d'adhésion via `RepoManager`
- [Dons](./giving) — les chemins d'écriture de donation qui sont auditées comme `sensitive` même quand anonymes
- [Points de terminaison d'adhésion](../api/endpoints/membership) — la surface REST qui porte `X-Batch-Id` et expose `/auditlogs` et `/batches`
