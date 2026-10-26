---
title: "Intégration Twilio pour les églises (brouillon)"
description: "Brouillon de configuration Twilio détenue par l'église dans B1, guide d'inscription publique, exemples de campagnes et liste de contrôle d'approbation."
---

# Brouillon d'intégration Twilio détenue par l'église

:::caution Brouillon pour l'intégration proposée
Il s'agit d'un flux de travail proposé. B1 dispose désormais d'un choix **Twilio** de base sous **Settings > Texting** (Account SID, Auth Token, From Number et le webhook STOP entrant) -- voir [Paramètres de l'église : SMS](../../b1-admin/settings/church-settings.md#texting). Les contrôles supplémentaires de configuration B1, la correspondance des consentements et les étapes de validation décrits ci-dessous sont des exigences pour une version future, et non des instructions pour trouver des paramètres existants. Lisez la [proposition technique](./twilio-byok-proposal) pour connaître le périmètre et les dépendances. Les sources Twilio ont été consultées le 22 octobre 2026 ; vérifiez les exigences actuelles avant de soumettre une campagne.
:::

## La configuration recommandée

Votre église possède son compte Twilio payant, son numéro de téléphone, son Messaging Service, sa facturation et son enregistrement de campagne. B1 enverrait des messages via ces ressources, à l'aide d'identifiants saisis de manière privée dans les paramètres de l'église. Gardez au moins deux administrateurs de l'église appropriés en mesure d'accéder au compte Twilio, activez la sécurité du compte et désignez une personne responsable du consentement, des réponses entrantes et des notifications de rejet.

La première version proposée couvre un seul numéro local américain et un seul programme de messagerie d'église clairement décrit. Les exemples ci-dessous utilisent le programme fictif de **Grace Community Church**, **Grace Church Updates**, pour les changements de service, les rappels d'événements et la planification des bénévoles. Remplacez chaque nom, domaine, fréquence, contact et objectif par la pratique réelle de l'église. Ce sont des exemples propres à une église des règles de Twilio, et non une campagne préapprouvée ni une promesse d'approbation.

## 1. Préparer l'expérience d'inscription publique à B1

Publiez une page telle que `https://www.example.org/text-updates` sur le site web B1 de l'église, avec un formulaire B1 public intégré ou un lien évident vers son formulaire public autonome. Publiez aussi `https://www.example.org/privacy` et `https://www.example.org/sms-terms`. Ces adresses sont des espaces réservés ; soumettez les URL réelles et accessibles.

Pour le formulaire d'inscription SMS proposé :

| Paramètre | Configuration recommandée |
|---|---|
| Accès | Public/sans restriction ; actif pendant la revue et l'inscription continue ; accessible sans connexion |
| Mode du formulaire | Mode standard au départ ; le mode conversationnel nécessite la prise en charge explicite du consentement décrite dans la proposition technique |
| Mobile | Clairement étiqueté avec l'indicatif pays ; obligatoire uniquement lorsque l'on choisit l'inscription SMS, si le champ est utilisé dans un formulaire général de contact/événement |
| Choix SMS | Case à cocher facultative distincte, décochée par défaut, correspondant au programme spécifique et au champ mobile |
| Mentions | Visibles à côté du choix SMS : église/programme, objectif et fréquence des messages, tarifs possibles, STOP, HELP, contact d'assistance, et liens cliquables réels vers la politique de confidentialité et les conditions SMS |
| Autres actions | Les visiteurs peuvent soumettre la fiche de contact, s'inscrire à un événement ou demander des informations sans s'inscrire aux SMS |
| Preuves | Enregistrer le programme, le numéro exact, le consentement sélectionné, la soumission source, l'heure serveur et la version de la mention/politique ; une simple réponse à un formulaire ne suffit pas aujourd'hui à inscrire quelqu'un |
| Automatisation des personnes et des groupes | Désactiver la création automatique de personnes et l'affectation aux groupes pour un pilote d'inscription initial, sauf examen des règles de correspondance existantes de l'église. L'affectation à un groupe n'est jamais l'autorisation SMS |
| Automatisations existantes | N'inscrivez pas automatiquement chaque personne qui soumet un formulaire ou chaque membre d'un groupe dans un workflow de messagerie. Seule la correspondance de consentement vérifiée proposée peut autoriser ce programme |
| Message de remerciement | Confirmer la bonne réception du formulaire sans affirmer l'inscription aux SMS lorsque la case a été refusée ou que la confirmation/l'examen est en attente |

Une case à cocher existante peut illustrer le formulaire, mais B1 a encore besoin du registre des consentements et des portes d'envoi. Le moteur de rendu partagé actuel affiche les descriptions en texte brut ; saisir du Markdown ou une URL n'y suffit pas à garantir que les liens vers les politiques seront cliquables. La mise en œuvre doit fournir un contrôle de consentement accessible avec de véritables liens. Voir [créer des formulaires B1](../../b1-admin/forms/creating-forms) et la [proposition technique](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio exige un consentement volontaire et vérifiable. Ne regroupez pas les SMS avec des conditions d'adhésion obligatoires, des autorisations e-mail/téléphone, un consentement aux dons ou une inscription à un événement. Un numéro mobile sur une fiche de visiteur n'est pas en soi un consentement SMS. Voir les [exigences de consentement volontaire](https://www.twilio.com/docs/api/errors/30923) de Twilio et les [recommandations pour les campagnes](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Exemple de texte d'inscription

Utilisez ceci seulement une fois que l'église a choisi les objectifs réels, l'expéditeur et la fréquence. La case est facultative et décochée au départ ; les noms des politiques ci-dessous doivent être des liens dans le formulaire affiché.

> Oui, je souhaite que Grace Community Church m'envoie des SMS via Grace Church Updates au sujet des changements de service, des événements de l'église et des plannings de bénévoles, depuis [numéro enregistré de l'église]. Attendez-vous à recevoir jusqu'à 4 messages par mois. Des frais de messagerie et de données peuvent s'appliquer. Répondez STOP pour vous désabonner ou HELP pour obtenir de l'aide. L'inscription aux SMS est facultative et n'est pas requise pour assister à un service, s'inscrire à un événement ou faire un don. Consultez notre Politique de confidentialité et nos Conditions SMS. Questions : [adresse e-mail ou téléphone du support de l'église].

« Jusqu'à 4 » est un exemple d'engagement, et non une limite imposée par Twilio. Remplacez-le par une fréquence que l'église peut réellement tenir ; si la fréquence varie, indiquez-le honnêtement et décrivez le rythme attendu. Gardez les appels promotionnels ou les autres programmes de ministère hors de cette case, sauf si leurs objectifs et leur consentement ont été évalués séparément.

Pour un formulaire général visiteur/événement, la soumission avec cette case décochée doit toujours réussir. Un formulaire réservé aux SMS peut expliquer que la cocher demande l'inscription, mais il ne doit jamais faire dépendre les services de l'église sans rapport d'une inscription. Vérifiez le comportement réel sur téléphone et sur ordinateur.

### Contenu des politiques à préparer

La page de confidentialité de l'église doit expliquer quelles informations elle collecte pour la messagerie, comment elle les utilise et les protège, ainsi que ses pratiques de conservation et de contact. Elle doit indiquer clairement que les numéros mobiles et les consentements à la messagerie ne sont pas vendus ni partagés avec des tiers ou des sociétés affiliées à des fins de marketing ou de promotion. Expliquez avec exactitude le traitement nécessaire par les prestataires de services ; ne prétendez pas que l'église ne fait jamais appel à un sous-traitant alors qu'elle utilise B1 et Twilio. Les [recommandations de Twilio sur les politiques de confidentialité](https://www.twilio.com/docs/api/errors/30908) et les [recommandations pour les campagnes](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) font référence pour cette distinction.

Les conditions SMS doivent identifier l'église et le programme, les objectifs, la fréquence réelle, les frais de messagerie possibles, les instructions STOP/HELP, le contact d'assistance et le lien vers la politique de confidentialité ; incluez toute mention supplémentaire demandée par l'examen actuel de Twilio. Faites correspondre exactement les liens vers les politiques de la page d'inscription aux URL soumises dans la campagne. Depuis le 30 juin 2026, Twilio exige des URL publiques dédiées à la politique de confidentialité et aux conditions pour les nouvelles inscriptions de campagne via l'API ; son flux de la Console les collecte également. [Exigence de Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Ce sont des exigences de contenu à appliquer aux politiques réelles de l'église, et non un remplacement de ses pratiques de confidentialité existantes ni une politique générique à coller sans vérification.

## 2. Enregistrer l'église et son programme de messagerie auprès de Twilio

1. Créez ou utilisez un **compte payant appartenant à l'église** et un numéro local américain compatible SMS. Utilisez de façon cohérente le nom légal de l'église, son numéro EIN/son enregistrement d'entreprise, son adresse, son site web et son représentant autorisé. Ne substituez pas l'identité de ChurchApps ni celle d'une autre église.
2. Suivez le flux d'enregistrement de marque Twilio pour les clients directs correspondant au type d'entité réel de l'église. Pour une organisation à but non lucratif éligible, utilisez les [recommandations d'enregistrement pour les organisations à but non lucratif](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Les cas d'usage caritatifs/501(c)(3) dépendent de l'éligibilité ; le seul nom d'une église n'établit pas une approbation ou une exemption de Twilio.
3. Créez un Messaging Service dédié et soumettez la campagne A2P 10DLC correspondante. Choisissez le cas d'usage qui correspond véritablement aux messages réels et aux options disponibles pour cette marque approuvée ; les exemples ici ne prescrivent pas de code de cas d'usage universel pour les églises.
4. Fournissez l'URL publique d'inscription, les URL des politiques, la description complète du consentement et du parcours des messages, ainsi que les exemples de messages demandés. Incluez toutes les méthodes d'inscription réelles ; ajustez les déclarations de liens intégrés et de numéros de téléphone pour qu'elles correspondent au contenu réel. Ne mentionnez pas l'inscription par mot-clé ni le double opt-in si ce parcours n'existe pas et n'a pas été testé.
5. Associez le numéro d'envoi au service et à la campagne approuvée. Attendez à la fois la **vérification de la campagne et l'achèvement de l'enregistrement du numéro** avant d'envoyer quoi que ce soit.

Effectuez ces étapes dans la propre Console Twilio de l'église. L'intégration B1 proposée ne soumet pas d'enregistrements pour les églises. Le [guide de démarrage rapide de l'enregistrement](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) et la [ressource de campagne](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) de Twilio expliquent les champs d'enregistrement et leur statut. Un numéro en attente peut encore bloquer l'envoi après l'approbation d'une campagne. [Enregistrement du numéro](https://www.twilio.com/docs/api/errors/30035)

### Exemple de description de campagne

> Grace Community Church utilise Grace Church Updates pour envoyer les changements d'horaires de service, les rappels d'événements de l'église et les avis de planning des bénévoles aux personnes qui choisissent ce programme sur notre site web public. Nous n'envoyons pas plus de quatre messages par mois dans le cadre de ce programme. Les destinataires peuvent arrêter ces messages à tout moment. Ce programme n'inclut pas de contacts achetés, de promotions de tiers ni d'appels aux dons.

Cet exemple ne convient qu'à une église qui respecte réellement ces limites et ces exclusions. Si les rappels des bénévoles dépassent à eux seuls la fréquence promise, modifiez la conception du programme et la mention avant de soumettre.

### Exemple de description du parcours de messages

> Les visiteurs ouvrent [URL réelle d'inscription de l'église], saisissent leur numéro mobile et cochent indépendamment la case facultative Grace Church Updates. Elle est décochée à l'ouverture du formulaire. La mention indique Grace Community Church, décrit les changements de service, les rappels d'événements et les plannings de bénévoles, précise la limite mensuelle et les tarifs possibles, et explique STOP et HELP. La Politique de confidentialité et les Conditions SMS affichées renvoient à [URL réelle de la politique de confidentialité] et à [URL réelle des conditions SMS]. Refuser les SMS n'empêche ni la participation, ni l'inscription à un événement, ni les dons, ni l'utilisation du formulaire général de contact. B1 enregistre la sélection affirmative, le numéro de téléphone, l'heure de soumission et la version de la mention. Nous n'envoyons ce programme qu'aux abonnés documentés et supprimons les retraits avant tout nouvel envoi.

Adaptez ce paragraphe au parcours réellement mis en œuvre. Si une confirmation par téléphone ou un examen par le personnel est utilisé, décrivez l'état en attente et l'étape exacte d'activation. Si d'autres méthodes sont utilisées, incluez chacune d'elles et ses preuves. Lorsque l'inscription se fait derrière une connexion ou sur papier, Twilio demande des preuves publiques et caviardées de l'expérience réelle de consentement ; n'exposez jamais de formulaires remplis ni de données de membres. [Recommandations sur le consentement vérifiable](https://www.twilio.com/docs/api/errors/30923)

### Exemples de messages sortants

Ce sont des exemples fictifs à adapter ; utilisez les vraies URL de l'église et remplacez les valeurs entre crochets avant de soumettre. L'API de campagne de Twilio accepte de deux à cinq exemples. Les exemples doivent identifier l'église, refléter l'objectif déclaré et inclure une instruction de désabonnement. [Champs d'exemple de campagne](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sunday's service will start at [time] due to [reason]. Details: [church website URL]. Reply STOP to end texts.
```

```text
Grace Community Church: A reminder that [church event] is on [date] at [time]. Information: [church event URL]. Reply STOP to end texts.
```

```text
Grace Community Church: You are scheduled to serve on [team] this [day]. Please review your plan: [B1 church portal URL]. Reply STOP to end texts.
```

Les URL entre crochets décrivent des variables d'exemple ; les exemples soumis doivent montrer le vrai domaine de l'église et le style réel des liens. Un lien vers un plan peut nécessiter une connexion, mais la page d'inscription et les politiques utilisées pour la vérification doivent pouvoir être consultées publiquement. N'incluez pas de notes privées, d'informations sur les enfants ni de détails permettant d'identifier des membres dans les exemples d'approbation. Gardez le contenu des exemples cohérent avec ce que les modèles de B1 envoient réellement ; ne promettez pas une boîte de réception pour les réponses ni un comportement de rappel particulier qui n'est pas disponible.

### Réponses STOP, START et HELP

Utilisez Twilio Messaging Service Advanced Opt-Out pour ces confirmations, et personnalisez l'identité de l'église ou du programme ainsi que les coordonnées d'assistance. Intention de réponse type :

- **STOP :** Confirmez que Grace Church Updates a cessé d'envoyer des messages et expliquez la façon prise en charge de reprendre.
- **START :** Confirmez la reprise de ce même programme, y compris son identité, sa cadence et ses tarifs, ainsi que les instructions d'aide et d'arrêt requises par le parcours configuré.
- **HELP :** Identifiez Grace Community Church et donnez le contact d'assistance réel et les instructions de désabonnement.

N'envoyez pas une seconde confirmation B1 lorsque Twilio a déjà répondu. Une réponse HELP n'est pas une inscription, et START ne doit pas inscrire quelqu'un à d'autres programmes de l'église ni le faire apparaître dans l'annuaire des membres. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Vérifier le dossier d'approbation avant la soumission

- [ ] Les informations légales et de marque réelles de l'église, son identité de site web et l'objectif de la campagne concordent.
- [ ] La page d'inscription et le formulaire actif s'ouvrent sans connexion dans une fenêtre de navigation privée, y compris sur un appareil mobile.
- [ ] La case SMS est décochée au départ et peut être refusée tout en réalisant l'action principale du visiteur ou de l'événement.
- [ ] L'objectif du programme, l'expéditeur, la fréquence réelle, les frais possibles, STOP, HELP, le contact d'assistance et les liens cliquables vers les politiques apparaissent à côté du choix SMS.
- [ ] Les URL exactes de confidentialité et de conditions fournies à Twilio sont publiques, fonctionnent sans identifiants et identifient la même église et le même programme. Le contenu des politiques correspond au traitement réel.
- [ ] Chaque exemple de message correspond au programme, à l'identité réelle de l'expéditeur et au comportement attendu des liens ou des numéros de téléphone. La campagne décrit toutes les méthodes réelles de consentement.
- [ ] Des captures d'écran caviardées montrent le formulaire vierge, la case et les mentions, ainsi que les liens vers les politiques tels que les examinateurs les verront. Les preuves ne contiennent aucune fiche de membre ni aucune clé.
- [ ] L'église dispose d'un moyen opérationnel de conserver les preuves de consentement et de respecter les retraits avant tout envoi, y compris les demandes reçues par téléphone ou par e-mail.

Ces vérifications réduisent les incohérences évitables ; Twilio et ses partenaires d'examen prennent la décision d'approbation. Conservez les URL réelles de la page d'inscription et des politiques disponibles après l'approbation, et pas seulement pendant l'examen.

## 4. Connecter et valider la future intégration B1

Une fois l'intégration livrée, la configuration proposée de Texting devrait recueillir le Account SID de l'église, un API Key SID/secret dédié, un Auth Token distinct pour le webhook, le Messaging Service SID et l'expéditeur sélectionné. Créez les clés uniquement dans la Console de l'église et saisissez les secrets uniquement dans les paramètres privés de B1. [Recommandations sur les clés API Twilio](https://www.twilio.com/docs/iam/api-keys)

Copiez les URL de webhook entrant et de statut de livraison propres à l'église, fournies par B1, dans la configuration du service Twilio correspondant. Activez Advanced Opt-Out et vérifiez que les messages entrants atteignent le webhook configuré. B1 devrait afficher des contrôles distincts pour les identifiants, la propriété du service et de l'expéditeur, la campagne vérifiée, l'achèvement de l'enregistrement du numéro, la vérification entrante et le message de test livré. Un identifiant enregistré ou une requête API acceptée ne constitue pas une livraison finale.

Si B1 ne peut pas vérifier par programme un signal d'enregistrement, confirmez-le directement dans la Console ; l'interface doit indiquer que le résultat daté a été confirmé par l'administrateur. Résolvez les statuts en attente ou en échec avant d'activer les SMS en production. Utilisez un test distinct, explicitement demandé, adressé à un adulte réel qui a consenti en tant que destinataire test, puis :

1. Confirmez qu'une inscription documentée correspondante crée le bon enregistrement de consentement téléphone/programme ; un refus ou un changement de téléphone ne doit pas inscrire silencieusement un destinataire.
2. Envoyez un message de test, confirmez sa réception et comparez le statut B1 avec le Message SID de Twilio et le résultat de livraison.
3. Répondez STOP et vérifiez que les textes manuels, les textos de groupe, les workflows et les rappels ignorent ce numéro. La visibilité dans l'annuaire ne doit pas changer.
4. Testez le parcours documenté de réinscription au même programme et la réponse HELP ; vérifiez qu'il n'y a ni confirmations en double ni modifications de préférences sans rapport.

## 5. Entretenir le programme

Désignez un responsable à l'église chargé de surveiller l'état de la campagne et du compte, les alertes de solde et de facturation, les échecs d'envoi et les réponses entrantes dans Twilio. La première version B1 proposée ne dispose pas de boîte de réception SMS conversationnelle : publiez et surveillez un contact d'assistance réel et consultez les réponses, plutôt que de supposer que le personnel les voit dans B1.

Conservez l'historique des consentements et des retraits, les versions actuelles des mentions et des politiques, les identifiants de campagne et les preuves d'approbation caviardées dans des registres contrôlés par l'église. Ne collez jamais de clés ni de listes de destinataires dans des tickets de support public. Lorsqu'un numéro, un service, des identifiants, un parcours d'inscription, une fréquence ou un objectif changent, revérifiez l'intégration et mettez à jour l'enregistrement et les consentements le cas échéant avant de reprendre. Examinez attentivement les numéros partagés au sein d'un foyer et les numéros modifiés : l'éligibilité suit le téléphone consentant et le programme, et non la fiche de chaque membre de la famille.

En cas de rejet, lisez l'erreur Twilio réelle, corrigez l'incohérence précise dans le site web comme dans la soumission, puis soumettez à nouveau via la Console de l'église. Pour les expéditeurs non enregistrés ou en attente, attendez la fin de l'enregistrement plutôt que de changer de numéro pour contourner le problème. Utilisez le [guide de dépannage de l'enregistrement Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) et la référence des codes d'erreur fournie. Ne promettez pas de délai de traitement fixe.
