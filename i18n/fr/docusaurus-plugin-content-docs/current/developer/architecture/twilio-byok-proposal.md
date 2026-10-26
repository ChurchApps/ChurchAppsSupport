---
title: "Twilio BYOK (proposition)"
description: "Intégration Twilio proposée, appartenant à l'église, avec son modèle de consentement, son périmètre de mise en œuvre et ses critères de mise en production."
---

# Proposition d'intégration Twilio BYOK

:::caution Proposition — intégration non disponible
Il s'agit d'une conception soumise à la validation des mainteneurs, fondée sur des sources publiques et la documentation de Twilio consultées le 22 octobre 2026. Depuis, un fournisseur Twilio de base a été livré (`@churchapps/texting` 0.6.0 et **Settings > Texting** dans B1 Admin) : l'église saisit son Account SID, son Auth Token et un numéro d'expédition (le fournisseur accepte aussi un Messaging Service SID commençant par `MG`, mais la colonne `fromNumber` reste un `varchar(20)`, trop court pour un SID de 34 caractères), les SMS partent à raison d'une requête par destinataire via l'API Messages de Twilio, et les réponses STOP parviennent à B1 par le webhook entrant existant. Voir [Paramètres de l'église : SMS](../../b1-admin/settings/church-settings.md#texting). Le modèle de consentement, la gestion avancée des désabonnements (Advanced Opt-Out), le suivi de la livraison et les vérifications de disponibilité décrites ci-dessous restent des propositions et ne constituent pas un comportement livré. Le [brouillon d'onboarding pour les églises](./twilio-byok-onboarding-draft) contient des recommandations de configuration proposées et des exemples propres aux églises.
:::

## Voie recommandée

Ajouter Twilio au système de fournisseurs de SMS existant de B1, en utilisant **un compte Twilio appartenant à l'église, ses identifiants d'API, un Messaging Service et un numéro capable d'envoyer des SMS**. L'église enregistre sa propre entité juridique et sa campagne de messagerie, paie Twilio directement, tient à jour le consentement des destinataires et gère l'approbation dans la console Twilio. ChurchApps fournit l'intégration et la documentation.

Commencer avec un seul programme de messages, un seul Messaging Service et un seul expéditeur local américain 10DLC par église B1. Prendre en charge les SMS individuels, les SMS de groupe, les SMS de workflow et les rappels avec inscription préalable via les écrans B1 existants. Un premier programme raisonnable couvre les changements de service, les rappels d'événements et la planification des bénévoles, à condition que les trois soient décrits dans le consentement de l'église et dans sa campagne approuvée. La messagerie de collecte de fonds ou promotionnelle exige un périmètre et un consentement évalués séparément ; ne pas l'ajouter silencieusement à ce programme.

| Responsabilité | Église | B1 / ChurchApps |
|---|---|---|
| Compte Twilio, facturation, propriété du numéro | Possède et administre ces éléments | Ne provisionne pas de compte de plateforme et ne revend pas de crédits |
| Marque, campagne, enregistrement du numéro | Soumet des informations exactes sur l'église ; gère la revue et les corrections | Explique les prérequis et lit les informations de disponibilité accessibles |
| Page d'inscription, politiques, objet des messages | Les publie et les maintient | Fournit des contrôles de formulaire compatibles, des exemples et des registres de consentement |
| Éligibilité des destinataires et gestion de STOP | Examine les preuves de consentement et demande les retraits reçus hors SMS | Applique le consentement, la suppression, les permissions et les webhooks signés |
| Livraison et support | Surveille les erreurs Twilio, la santé du compte et les réponses entrantes | Affiche l'état de soumission et de livraison sans promettre d'approbation |

Reporter à plus tard un compte Twilio parent géré par ChurchApps, des sous-comptes clients, l'achat de numéros, les soumissions Trust Hub, la facturation, une boîte de réception de conversations, le MMS/WhatsApp, l'envoi international et l'onboarding des numéros verts (toll-free). Le numéro vert constitue un parcours d'expéditeur vérifié distinct et non un contournement de l'enregistrement. Ces limites maintiennent la première version alignée sur le modèle existant de B1 « apportez votre propre fournisseur ».

## Acquis existants et lacunes

Les observations suivantes sont liées à des instantanés des sources, et non à une hypothèse sur ce qui est actuellement déployé :

| Composant | Comportement existant | Conséquence |
|---|---|---|
| [Registre et contrat des fournisseurs](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` gère les envois unitaires et groupés, la validation, des capacités facultatives d'abonné ou de liste, et un identifiant de message du fournisseur dans les résultats. Aucun adaptateur Twilio n'est enregistré. | Ajouter Twilio dans `@churchapps/texting` ; il n'a besoin ni de créer des abonnés ni de listes gérées par le fournisseur. |
| [Paramètres SMS](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church et Nalo sont sélectionnables ; MinistryStuff est réservé par fonctionnalité. La modification et l'enregistrement de l'expéditeur ne concernent actuellement que Nalo. | Ajouter des champs Twilio explicites, la validation, l'enregistrement de l'expéditeur et une aide à l'onboarding. Une simple entrée dans la liste déroulante ne suffit pas. |
| [Contrôleur](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) et [passerelle de module](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Les identifiants sont chiffrés et masqués ; les envois manuels et automatisés résolvent le fournisseur de l'église. Les envois de groupe dédupliquent les numéros de téléphone partagés. | Réutiliser ces chemins et préserver les autorisations. Placer les nouveaux contrôles de consentement et de disponibilité dans un chemin serveur commun afin que les workflows ne puissent pas les contourner. |
| [Aide STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Analyse les champs `From`/`Body` de style Twilio ; valide un jeton d'URL d'église ; définit `person.optedOut` et désactive les rappels SMS. Les autres réponses sont ignorées. | C'est un point de départ utile, mais pas un webhook Twilio complet. Ajouter les signatures Twilio et un état d'abonnement SMS indépendant. |
| [Schéma des messages](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Stocke `apiKey`, `apiSecret` et un `fromNumber` de 20 caractères ; les journaux de livraison ne conservent que le succès ou l'erreur immédiats, et non les identifiants du fournisseur ni les états de livraison finaux. | Un expéditeur au format E.164 convient ; un SID de Messaging Service de 34 caractères nécessite son propre champ. Ajouter un stockage durable des messages et des états du fournisseur. |
| [Page de formulaire publique](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [moteur de formulaire partagé](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) et [contrôleur des soumissions](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Les formulaires non restreints et les cases à cocher facultatives existent. Les descriptions sont en texte brut. Les soumissions conservent les réponses, mais le chemin SMS ne dispose d'aucun registre de consentement propre à une campagne. | Ajouter un contrôle de consentement SMS configuré avec de vrais liens vers les politiques et une capture des preuves côté serveur ; une case générique ou l'appartenance à un groupe ne doit pas autoriser automatiquement les SMS. |

La [documentation utilisateur des paramètres de l'église](../../b1-admin/settings/church-settings#texting) explique aussi que l'indicateur de désabonnement actuel est partagé avec la confidentialité de l'annuaire. Ce couplage est un enjeu de mise en production : répondre START ne doit jamais modifier la visibilité dans l'annuaire.

## Conception de la configuration et des identifiants

Utiliser des champs de configuration explicites et additifs plutôt que de surcharger `fromNumber` ou de stocker des données structurées dans une chaîne de clé d'API :

| Champ | Rôle proposé |
|---|---|
| `accountSid` | Identifiant du compte/projet Twilio appartenant à l'église (`AC…`) |
| `apiKey`, `apiSecret` | SID de clé d'API Twilio dédié (`SK…`) et son secret pour l'accès sortant à l'API ; chiffrés et masqués |
| `webhookAuthToken` | Auth Token du compte utilisé par le SDK Twilio pour valider les signatures entrantes ; chiffré et masqué séparément |
| `messagingServiceSid` | Messaging Service de l'église (`MG…`, 34 caractères) |
| `fromNumber` | Numéro capable d'envoyer des SMS, au format E.164, choisi et vérifié comme expéditeur dans ce compte ou ce service |
| Configuration du programme | ID stable du programme, nom, objets autorisés, URL d'inscription et de politiques, version de la mention d'information |

Twilio [privilégie les clés d'API pour l'authentification REST](https://www.twilio.com/docs/iam/api-keys). Utiliser les permissions de clé les plus restreintes et testées qui couvrent l'envoi et les vérifications de configuration en lecture seule nécessaires. L'Auth Token du compte reste nécessaire pour la [vérification de signature standard des webhooks Twilio](https://www.twilio.com/docs/usage/security). Expliquer cette distinction dans l'interface : un secret d'API n'est pas un Auth Token de webhook. Conserver les identifiants exclusivement dans le stockage de paramètres côté serveur, jamais dans les pages publiques, les réponses de formulaire, les requêtes d'envoi du navigateur ou les demandes de support.

L'église crée et gère ces ressources dans la console. L'action de validation de B1 doit seulement lire le service configuré, les expéditeurs et les informations d'enregistrement. Elle ne doit pas acheter de numéros, créer de campagnes, modifier les paramètres Twilio ni envoyer un message de test en effet de bord. Fournir une action d'envoi de test séparée et explicite, limitée à un destinataire éligible et consentant.

Ne conserver les identifiants masqués que lors de la modification du même fournisseur enregistré. Passer à Twilio doit exiger ses propres identifiants et effacer les valeurs obsolètes propres à l'ancien fournisseur ; ne jamais reporter une clé Clearstream ou Nalo masquée dans une configuration Twilio.

Limiter chaque chargement ou mise à jour au compte B1 authentifié de l'église. Lier les rappels à une intégration enregistrée et au compte, au service ou à l'expéditeur Twilio attendu, et rejeter les affectations contradictoires entre églises. La rotation des identifiants et la déconnexion d'un fournisseur doivent invalider l'état de disponibilité et suspendre les envois en file d'attente, sans effacer le consentement ni l'historique de livraison.

## Le consentement et la suppression sont un travail obligatoire avant mise en production

Introduire des enregistrements d'abonnement liés au téléphone pour le programme Twilio, ainsi que des événements de consentement et de suppression en ajout seul. Le minimum de preuves suggéré est : ID de l'église, ID du programme, téléphone normalisé, association facultative et vérifiée avec une personne, action affirmative, ID du formulaire ou de la soumission source (ou preuve externe examinée), horodatage serveur, texte et version de la mention d'information, URL source, URL des politiques, et événements de retrait ou de reprise. Limiter l'accès et la conservation selon la politique existante de sécurité des données de l'église.

Utiliser des états tels que `unknown`, `pending`, `active` et `suppressed`. Les numéros de téléphone mobiles existants, les contacts importés, les présences, les dons, l'appartenance à un groupe, `person.optedOut = false` et `allowSms` ne constituent pas un consentement affirmatif au programme. Importer un consentement documenté doit être une action autorisée, auditée et dotée d'une source enregistrée ; une migration ne doit inscrire personne automatiquement.

Pour le parcours web initial, utiliser le mode de formulaire public standard de B1. Ajouter une question de consentement SMS explicitement configurée, décochée par défaut, facultative, affichant des liens cliquables vers les politiques et correspondant à un seul programme et à un seul champ mobile. Valider cette correspondance côté serveur et conserver une copie de la mention affichée au moment de l'enregistrement d'une réponse affirmative. Ne jamais déduire le consentement de libellés de questions quelconques, d'une IA conversationnelle ou de l'appartenance à un workflow. N'activer un équivalent conversationnel qu'après avoir testé son interaction affirmative explicite et l'enregistrement des preuves.

Une soumission sans case cochée ne crée aucun abonnement et ne doit pas retirer un consentement existant d'une autre personne. Lier le consentement au téléphone soumis ; le personnel peut résoudre les associations de personnes ambiguës sans fusionner les dossiers de foyer. Un numéro mobile modifié nécessite son propre consentement. Pour les formulaires anonymes, appliquer des contrôles contre les abus et rendre explicite toute vérification de propriété du numéro ou toute étape de double opt-in ; une case cochée seule ne prouve pas qui possède un téléphone. Si une confirmation est utilisée, laisser l'abonnement en attente jusqu'à sa réalisation et décrire ce flux exact dans les documents d'inscription.

Pour Twilio, séparer la suppression SMS de la visibilité dans l'annuaire. Migrer prudemment tout désabonnement hérité vers un enregistrement de suppression ; laisser les autres destinataires hérités à `unknown`. Une inscription nouvelle, explicite et documentée peut établir le consentement SMS tandis que la confidentialité de l'annuaire reste inchangée. Préserver le comportement des autres fournisseurs jusqu'à ce que leurs migrations soient examinées séparément.

À chaque envoi effectif, exiger que l'intégration de l'église soit activée et prête, qu'un consentement au programme soit en cours pour ce numéro exact, qu'aucune suppression au niveau du téléphone ne soit active, et que l'appelant dispose de la permission existante. Les rappels respectent en plus `allowSms`, les préférences de catégorie et les heures calmes. Revérifier après la mise en file d'attente, résoudre les champs de fusion, normaliser et valider les numéros, et dédupliquer par téléphone. STOP supprime tous les envois du service ou du programme, y compris les envois manuels et les workflows ; cela doit couvrir chaque personne partageant ce numéro.

Afficher de façon cohérente l'identité de l'église et l'instruction STOP dans le chemin d'envoi Twilio commun, et prévisualiser le nombre final de SMS et de segments. L'expansion des champs de fusion et la gestion de la longueur doivent préserver ces éléments ; ne pas tronquer silencieusement l'instruction de désabonnement. Garder les exemples et les modèles réels de rappels et de workflows alignés.

## Envois, réponses et état de livraison Twilio

Implémenter `TwilioProvider.sendMessage` via l'API Messages avec le Messaging Service et l'expéditeur sélectionnés. Renvoyer un SID de message du fournisseur et un résultat accepté ou soumis ; l'acceptation HTTP n'est pas une livraison sur le téléphone du destinataire. Un envoi de groupe utilise des résultats par destinataire, dans l'ordre d'entrée.

Borner la concurrence sortante pour **à la fois** `sendBulk` et les envois individuels : la branche actuelle de champs de fusion lance en parallèle des appels à `sendMessage`. Persister l'intention d'envoi et les tâches réclamables pour les groupes qui ne tiennent pas dans un budget de requête ; réutiliser le modèle de déploiement existant plutôt que d'obliger les églises à faire tourner un autre service. Réessayer avec backoff les échecs transitoires connus ou liés aux limites de débit. Traiter les délais d'attente ambigus comme des résultats inconnus à réconcilier, et non comme une incitation à renvoyer aveuglément au risque de doubler les SMS et les frais.

Configurer des URL de rappel entrantes et d'état propres à chaque église. Valider `X-Twilio-Signature` avec le SDK, l'URL externe exacte configurée, les paramètres de formulaire d'origine et l'Auth Token du compte correspondant. Une URL secrète seule ne suffit pas. Relier les rappels aux enregistrements sauvegardés de l'église, du compte, du service et du message, gérer les doublons et les rappels arrivant avant que le résultat de l'envoi ne soit validé, et empêcher les événements plus anciens d'écraser un état terminal. Renvoyer un TwiML vide pour accuser réception d'un message entrant, et une réponse de succès appropriée pour les événements d'état. [Sécurité Twilio](https://www.twilio.com/docs/usage/security), [rappels d'état](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Recommander **Advanced Opt-Out** du Messaging Service. Twilio gère les confirmations STOP/START/HELP ; B1 consomme les événements `OptOutType` authentifiés sans envoyer de confirmations en double. STOP enregistre la suppression immédiatement. START rétablit uniquement un abonnement connu à ce même programme décrit, avec un nouvel événement de reprise ; il ne doit pas inscrire un nouveau téléphone à d'autres messageries sans rapport ni activer les préférences de rappel. HELP n'inscrit personne. Les autres réponses entrantes restent hors du périmètre de la boîte de réception de B1 ; les églises ont besoin d'un moyen documenté de les surveiller dans Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Stocker le SID du message Twilio, la liaison compte/service, l'heure de soumission, le statut final ou le code d'erreur, et l'heure du rappel à côté du journal de livraison. Afficher avec exactitude les états en file ou acceptés, livrés, en échec, non livrés ou inconnus. Conserver le contrat de réponse existant pour les autres fournisseurs et définir si les compteurs de succès agrégés représentent la soumission ou la livraison.

## Disponibilité de la configuration et validation de l'approbation

Afficher des étapes distinctes pour les identifiants, la propriété du service et de l'expéditeur, la vérification de la campagne, l'enregistrement du numéro, les contrôles des webhooks et un test de fumée livré. Ne jamais afficher un unique badge vert « approved » simplement parce que les identifiants fonctionnent.

Pour les numéros locaux américains, lire la ressource [Usa2p campaign](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) du service et exiger que la campagne concernée soit `VERIFIED`. Vérifier séparément que le téléphone sélectionné est associé à ce service et a terminé son enregistrement : une campagne approuvée peut avoir un numéro encore en attente. Lorsqu'une API en lecture prise en charge n'expose pas un signal requis, afficher **manual Console verification required** et enregistrer la confirmation datée de l'administrateur de l'église en tant que telle ; ne pas la qualifier de vérifiée par l'API. Les événements automatiques d'enregistrement de numéro peuvent faire l'objet d'un travail ultérieur. [Erreurs d'enregistrement de numéro](https://www.twilio.com/docs/api/errors/30035), [événements d'enregistrement A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Exiger des vérifications à jour avant d'activer les envois ; enregistrer quand et comment la disponibilité a été vérifiée, faire expirer les vérifications périmées, et suspendre en cas d'identifiants révoqués, d'expéditeurs modifiés, d'échecs d'enregistrement ou d'erreurs persistantes du compte. La livraison d'un test de fumée confirme le chemin testé, et non une approbation universelle par les opérateurs ni le consentement du destinataire. Le brouillon d'accompagnement précise les contrôles opérationnels de l'église avant soumission, avant lancement et en continu.

## Dépôt et plan de mise en production

Le [guide de contribution de l'organisation](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) oriente les demandes de fonctionnalités de B1 vers ChurchAppsSupport et les PR d'implémentation vers les dépôts responsables. Utiliser une seule demande de fonctionnalité centrale et relier les PR d'implémentation ciblées à celle-ci :

1. **ChurchAppsSupport :** examiner cette conception et son brouillon d'onboarding avant de présenter Twilio comme une fonctionnalité disponible pour les utilisateurs.
2. **Packages :** ajouter l'adaptateur Twilio, la configuration et les interfaces partagées explicites, et le rendu du formulaire de consentement SMS lorsqu'il est partagé par B1Admin et B1App. Inclure des changesets et publier via le workflow de publication existant avant de mettre à jour les consommateurs.
3. **Api :** ajouter des migrations additives pour les métadonnées d'intégration, le consentement et la suppression, ainsi que les états de livraison ; implémenter la validation de la configuration, les contrôles d'envoi partagés, la capture des preuves de formulaire, la gestion des webhooks et la persistance des envois.
4. **B1Admin :** ajouter l'interface de configuration et de disponibilité de Twilio, la gestion des programmes et des consentements, l'enregistrement des expéditeurs tenant compte du fournisseur, et un suivi précis des livraisons. N'exposer aucune substitution du consentement SMS via les modifications ordinaires d'une personne.
5. **B1App :** vérifier l'expérience du formulaire et de la page publics, ainsi que des liens vers les politiques, avec les contrôles partagés, y compris pour les visiteurs anonymes et sur mobile. Aucun client navigateur Twilio séparé n'est nécessaire.
6. **ChurchAppsSupport :** après la mise en production, transformer le brouillon d'onboarding en pages d'aide et de paramétrage prises en charge, ajouter de vraies captures d'écran, les lier depuis les paramètres SMS, et organiser les traductions.

Déployer le schéma et les paquets partagés avant les consommateurs. Garder Twilio derrière une fonctionnalité réservée à un petit pilote à inscription volontaire ; les fournisseurs existants doivent continuer à fonctionner. Le retour arrière désactive l'envoi via Twilio et annule les tâches non soumises tout en préservant les désabonnements et les preuves ; il ne doit pas basculer automatiquement les destinataires vers un autre fournisseur ni un autre expéditeur.

## Estimation de l'effort

Estimation de planification pour un contributeur familier de l'écosystème ; aucun identifiant de production ni aucun SMS réel n'ont été utilisés pour cette évaluation :

| Travail | Jours-développeur |
|---|---|
| Adaptateur, extensions de configuration et de schéma, interface des paramètres | 2–3 |
| Consentement par téléphone et par programme, suppression indépendante, contrôles d'envoi partagés, intégration du formulaire public | 3–5 |
| Rappels signés, persistance des livraisons, envoi borné et durable | 2–3 |
| Interface de disponibilité, guide pour les églises, tests d'intégration et de non-régression, corrections du pilote | 3–4 |
| **Périmètre de lancement recommandé** | **10–15 au total** |

Une preuve de concept basique de l'adaptateur et des paramètres représente environ 1 à 2 jours. Une estimation limitée à l'expéditeur exclut le travail de consentement et d'onboarding nécessaire à cette recommandation. Le temps de revue externe par Twilio et par les opérateurs télécoms est séparé et variable ; le projet ne doit promettre ni date ni résultat d'approbation.

## Critères d'acceptation

- [ ] L'église possède et paie le compte, le service, l'expéditeur enregistré et la campagne ; aucun compte Twilio géré par ChurchApps n'est requis.
- [ ] Les identifiants sont chiffrés et masqués, limités au locataire, révocables, et absents des journaux et du contenu public ; la validation est en lecture seule.
- [ ] La case de consentement facultative et non cochée affiche de vrais liens vers les politiques et enregistre côté serveur le programme, le téléphone et la preuve de la mention ; refuser n'empêche pas l'action principale du formulaire.
- [ ] Tous les chemins manuels, de groupe, de champs de fusion, de workflow et de rappel appliquent la même barrière d'éligibilité Twilio. Les destinataires inconnus, sans consentement, au téléphone modifié ou supprimés sont ignorés avec un motif utile ; le rendu préserve l'identité de l'église et les instructions STOP après expansion et gestion de la longueur.
- [ ] La confidentialité héritée de l'annuaire n'inscrit aucun destinataire ; STOP/START ne modifient jamais la visibilité dans l'annuaire ni les préférences sans rapport. Les cas de téléphone partagé et d'églises multiples sont testés.
- [ ] STOP/START/HELP signés, signatures invalides, mauvais comptes ou services, événements en double, soumissions de formulaire rejouées et correspondances de consentement falsifiées sont couverts.
- [ ] La taille des groupes et les délais d'attente, les limites de débit, les échecs partiels, les résultats ambigus, les courses entre rappels et les événements de livraison désordonnés sont testés sans doublons d'envoi.
- [ ] L'approbation de la campagne et l'enregistrement terminé du numéro sont distincts de la validation des identifiants. Les preuves manuelles sont clairement étiquetées ; une disponibilité périmée ou révoquée bloque les envois.
- [ ] Une église pilote vérifie sa page d'inscription, les chemins de formulaire acceptés et refusés, les URL exactes des politiques, et un destinataire test consentant, du formulaire à la livraison, à la suppression par STOP, puis à la réinscription autorisée.
- [ ] Les paramètres et les envois existants de Clearstream, Text In Church et Nalo réussissent les tests de non-régression ; le texte d'aide distingue les propositions des fonctionnalités livrées.
