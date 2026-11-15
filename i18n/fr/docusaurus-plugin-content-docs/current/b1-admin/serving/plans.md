---
title: "Plans de service"
description: "Configurez la planification des bénévoles dans B1 Admin : créez des plans de service par date, copiez depuis les semaines précédentes, affectez les membres d'équipe à des postes, et gérez les délais d'inscription et les rappels."
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date et à un ministère précis, ce qui facilite la coordination de vos équipes de bénévoles semaine après semaine et garantit que chaque service est entièrement doté en personnel.

</div>

## Vidéo de formation {#training-video}

<YouTube id="47DstBXKl74" title="Créer des plans et planifier les bénévoles dans B1" next="Construire l'ordre de service et la bibliothèque de chansons dans B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et vos équipes dans l'espace Service
- Assurez-vous que les bénévoles ont été ajoutés à votre [répertoire des personnes](../people/adding-people.md) et affectés à des équipes

</div>

## Accéder aux plans {#accessing-plans}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Service** et cliquez sur **Plans**.
2. Sélectionnez un **onglet de ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour voir la liste des plans de ce type. Utilisez **À venir** et **Passés** au-dessus de la liste pour passer des plans futurs aux plans antérieurs. **À venir** affiche les plans à partir d'aujourd'hui, les plus proches en premier, les plans sans date étant placés à la fin. **Passés** n'affiche que les plans antérieurs, les plus récents en premier.
4. Cliquez sur un plan précis pour l'ouvrir.

Chaque page de plan comporte des liens vers son type de plan et vers **Plans**, afin de remonter sans utiliser le bouton Précédent du navigateur.

:::info
Un accès administrateur complet n'est pas nécessaire pour gérer les plans. Toute personne membre d'un ministère peut accéder à Service et créer, modifier et planifier les plans de son propre ministère, sans avoir besoin de l'autorisation Modifier les plans. Les éditeurs disposant du rôle Modifier les plans peuvent gérer les plans de tous les ministères.
:::

## Créer un plan {#creating-a-plan}

1. Depuis la page du type de plan, cliquez sur **Nouveau plan** en haut de la page. Le formulaire **Ajouter un plan** s'ouvre.
2. Donnez un nom au plan ou utilisez la date comme nom. Sélectionnez la **date du service**. Si votre église compte plus d'un campus, vous pouvez aussi choisir le **campus** du plan.
3. Si votre ministère dispose de [modèles](./plan-templates.md), vous pouvez en choisir un sous **Démarrer à partir d'un modèle** pour remplir l'ordre de service, les postes et les notes en une seule étape.
4. Sinon, si vous souhaitez copier un plan précédent, utilisez **Copier depuis le plan précédent** pour choisir **Postes seulement** ou **Postes et affectations**. Si vous ne voulez rien copier, choisissez **Rien**. Vous pouvez aussi cocher **Copier l'ordre de service**. Lorsque vous copiez depuis un plan précédent, le nouveau plan conserve aussi les **Notes**, le **Délai d'inscription**, l'option **Afficher les noms des bénévoles sur la page d'inscription** et le paramètre de remplacement automatique de ce plan, afin que vous n'ayez pas à les ressaisir chaque semaine. Vous pouvez modifier chacun d'eux dans les paramètres du nouveau plan.
5. Pour créer plusieurs plans à la fois tout en copiant, choisissez **Répéter tous les** et **Fréquence** (Jour, Semaine ou Mois), puis saisissez le **Nombre de plans** (jusqu'à 12). Pour un mois, **Le** vous permet de conserver le même jour du mois ou le même jour de la semaine, par exemple le deuxième samedi. B1 affiche les dates avant l'enregistrement et crée un plan pour chaque date, chacun copié à partir du précédent. Si le plan porte le nom de sa date, chaque nouveau plan prend le nom de sa propre date.
6. Définissez facultativement le **Délai d'inscription (heures avant le service)**. Un nouveau plan reprend le délai du plan précédent, que vous pouvez modifier ici. Laissez le champ vide pour aucun délai. Voir [Paramètres du plan](#plan-settings) pour savoir comment le délai est calculé.
7. Enregistrez le plan. Vous pouvez maintenant commencer à affecter les membres de l'équipe et à construire l'[ordre de service](./service-order.md).

:::tip
Les paramètres de répétition ne sont disponibles que lorsque vous copiez quelque chose du plan précédent (postes, affectations ou ordre de service).
:::

## La page du plan {#the-plan-page}

Lorsque vous ouvrez un plan, son ministère et son type de plan, son nom et sa date de service apparaissent en haut, avec les boutons **Imprimer** et **Modifier les détails**. La page vous donne une vue d'ensemble du plan entier :

- Les vignettes **Durée**, **Équipe de service** et **Réponses** indiquent la longueur de l'ordre de service, le nombre de postes pourvus (par exemple « 10 sur 13 pourvus ») et le nombre de bénévoles ayant accepté, en attente ou ayant refusé.
- **Ordre de service** affiche les premiers éléments de l'[ordre de service](./service-order.md) avec leur durée. Cliquez sur **Modifier l'ordre de service** pour ouvrir l'ordre de service complet sur sa propre page.
- **Équipe de service** liste chaque poste par catégorie avec les bénévoles affectés et le nombre de personnes encore nécessaires. Si un point requiert votre attention, une ligne telle que « 1 conflit · 3 non avisés » apparaît avec un lien **Examiner**. Cliquez sur **Gérer l'équipe de service** pour ouvrir la page complète de l'équipe de service.
- **Horaires** liste les horaires de service et de répétition du plan. Voir [Horaires de service](#service-times).
- **Notes** contient les notes destinées à toute l'équipe. Cliquez sur **Modifier**, saisissez vos notes, puis cliquez sur **Enregistrer les notes**.

Les pages de l'ordre de service et de l'équipe de service comportent chacune un lien **Retour au plan** qui vous ramène à la vue d'ensemble.

## Horaires de service {#service-times}

Les horaires indiquent à B1 quand ont lieu le service et les répétitions éventuelles. Ils servent au délai d'inscription, à la [validation du plan](./plan-validation.md), aux rappels aux bénévoles et aux heures affichées dans l'ordre de service.

1. Sur la page du plan, cliquez sur **Ajouter un horaire** à côté de **Horaires**.
2. Choisissez le **Type** : **Service**, **Répétition** ou **Autre**.
3. Saisissez un **nom d'affichage** (par exemple « Service du dimanche » ou « Répétition »).
4. Définissez l'**heure de début** et l'**heure de fin**.
5. Sous **Équipes de service requises**, cochez les catégories de postes (par exemple Louange ou Technique) qui servent à ce moment-là.
6. Cliquez sur **Enregistrer**.

Cliquez sur le nom d'un horaire pour le modifier ou le supprimer.

## Affecter les membres de l'équipe {#assigning-team-members}

1. Ouvrez un plan et cliquez sur **Gérer l'équipe de service**.
2. Cliquez sur **Ajouter un poste**. Dans la boîte de dialogue **Ajouter un poste**, choisissez ou saisissez un **Nom de catégorie** (par exemple Louange ou Accueil), saisissez le **Nom** du poste et le **Nombre de bénévoles**, puis choisissez un **Groupe de bénévoles**. Pour permettre à n'importe qui dans votre église de remplir le poste (et non seulement les membres d'une équipe), laissez **Groupe de bénévoles** sur **Aucun**. Cochez **Autoriser l'auto-inscription** pour permettre aux bénévoles de s'inscrire eux-mêmes aux places disponibles, et ajoutez une **Description** facultative que les bénévoles voient lorsqu'ils parcourent les occasions de service. Cliquez sur **Enregistrer**.
3. Cliquez sur le lien **Personnes requises** à côté du poste (par exemple « 2 personnes requises »).
4. Dans la boîte de dialogue **Affecter un poste**, cliquez sur le nom d'un membre de l'équipe pour l'affecter. Si le groupe de bénévoles du poste est réglé sur **Aucun**, recherchez n'importe quelle personne de votre église et cliquez plutôt sur l'icône d'ajout à côté de la personne. Cliquez sur **Terminé** lorsque vous avez fini.
5. Les bénévoles affectés apparaissent à côté du poste. Un point vert sur leur photo signifie qu'ils ont accepté, et un point rouge qu'ils ont refusé.
6. Avisez les bénévoles depuis le panneau **Validation** (voir [Avis aux bénévoles](./plan-validation.md#notifying-volunteers)). Si le plan utilise un [flux de confirmation](#plan-settings), l'envoi de l'avis démarre aussi une carte de flux de travail qui assure le suivi de chaque demande jusqu'à ce que le bénévole réponde.

Pour modifier ou retirer une affectation, cliquez sur le nom du bénévole puis sur **Supprimer** dans la boîte de dialogue **Modifier l'affectation**. Pour modifier un poste, cliquez sur son nom ; **Supprimer** dans la boîte de dialogue **Modifier le poste** retire le poste et désaffecte toutes les personnes qui y sont affectées.

Chaque poste affiche une pastille de compte (par exemple « 2/3 », ou « 1/2 inscription » pour les postes en auto-inscription) afin que vous voyiez d'un coup d'œil combien de places sont pourvues. En haut de la page de l'équipe de service, un résumé (« X postes sur Y pourvus ») indique la dotation globale du plan, ainsi que le nombre de postes encore nécessaires ; il passe à **Entièrement doté** lorsque chaque poste est couvert.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer les plans. Vous disposerez ainsi d'un bassin de bénévoles prêts à être affectés.
:::

### Affectation automatique {#auto-assign}

Cliquez sur **Affectation automatique** sur la page de l'équipe de service pour remplir toutes les places libres à partir du groupe de bénévoles du poste. Les postes sans groupe de bénévoles sont ignorés. Pour annuler les bénévoles que l'opération vient d'ajouter, cliquez sur **Annuler l'affectation automatique**. Vous pouvez aussi remplir plusieurs plans à la fois depuis la [vue d'ensemble des plans](./plans-overview.md#auto-scheduling-from-the-overview).

### Préférences de planification {#scheduling-preferences}

Dans la boîte de dialogue **Affecter un poste**, cliquez sur l'icône de curseurs à côté d'un membre de l'équipe pour définir ses **Préférences de planification** : **Nombre maximal de fois par mois**, **Horaires de service préférés** et **Planification du foyer** (planifier le foyer ensemble, ou non le même jour). La [validation du plan](./plan-validation.md) vous avertit lorsqu'une affectation va à l'encontre de ces préférences.

### Copier les postes dans un plan vide {#copying-positions-into-an-empty-plan}

Si un plan ne comporte encore aucun poste et qu'il existe un plan antérieur du même type, un lien **Copier depuis le plan précédent** apparaît sur la page de l'équipe de service. Choisissez **Postes seulement** ou **Postes et affectations** pour remplir le plan ouvert avec les postes (et les bénévoles) du plan précédent. La copie est faite dans le plan actuel ; elle ne crée pas un second plan pour la même date.

## Paramètres du plan {#plan-settings}

Chaque plan dispose de paramètres supplémentaires que vous pouvez configurer en cliquant sur **Modifier** à côté du plan dans la liste du type de plan, ou sur **Modifier les détails** en haut de la page du plan. Cliquez sur **Terminé** (ou sur le nom du plan au-dessus du formulaire) pour revenir au plan. Le même formulaire comporte un bouton **Supprimer** qui supprime le plan, y compris ses postes, ses affectations et son ordre de service. Les paramètres comprennent :

- **Délai d'inscription (heures avant le service)** — le nombre d'heures avant le service auquel les inscriptions des bénévoles se ferment. Les heures sont comptées à rebours à partir du premier horaire **Service** du plan (les répétitions et les autres horaires sont ignorés, sauf si le plan n'en comporte aucun autre) ; ainsi, un délai de 2 heures pour un service à 10 h 00 ferme les inscriptions à 8 h 00 ce matin-là. Si le plan n'a aucun horaire, le délai est compté à partir de 9 h 00 le jour du service, selon le fuseau horaire de votre église. Une fois ce délai dépassé, les bénévoles ne peuvent ni s'inscrire ni se retirer. Saisissez un nombre négatif pour garder les inscriptions ouvertes après le début du service. Laissez le champ vide, ou effacez-le, pour aucun délai.
- **Flux de confirmation** — choisissez un [flux de travail de confirmation d'affectation de service](./workflows.md#serving-assignment-confirmations) pour assurer le suivi des demandes de service de ce plan par courriel et par message texte jusqu'à ce que chaque bénévole accepte ou refuse. Lorsque vous **avisez** les bénévoles d'un plan publié, chaque nouvelle demande obtient sa propre carte sur le tableau de ce flux de travail, et une note au-dessus du lien d'avis indique *« Les nouvelles demandes utilisent le flux de confirmation. »* Laissez l'option **Utiliser les avis d'affectation existants** pour conserver les avis habituels. Seuls les flux de confirmation actifs apparaissent dans la liste ; créez-en un d'abord sous **Service > Flux de travail**.
- **Afficher les noms des bénévoles sur la page d'inscription** — lorsque cette case est cochée, les bénévoles connectés peuvent voir qui d'autre est déjà inscrit à chaque poste sur la page d'inscription de B1.church. Les noms ne sont jamais affichés aux visiteurs qui ne sont pas connectés. Ce réglage contrôle aussi si les bénévoles affectés à chaque élément de l'ordre de service sont imprimés à côté de celui-ci (voir [Impression des plans](#printing-plans)).
- **Provisoire** — masque les affectations aux bénévoles tant que vous n'êtes pas prêt à publier le calendrier. Pendant qu'un plan est provisoire, le panneau **Validation** de la page de l'équipe de service affiche un bouton **Publier le plan** (ou **Publier et aviser** lorsque les bénévoles n'ont pas encore été avisés) qui rend les affectations visibles.
- **Planifier automatiquement un remplaçant lorsqu'un bénévole refuse** — lorsque cette case est cochée, si un bénévole affecté refuse son poste, B1 contactera automatiquement la personne disponible suivante de la liste de l'équipe pour lui demander si elle peut servir. Cela se poursuit jusqu'à ce qu'une personne accepte, ce qui permet de garder vos postes pourvus sans suivi manuel.

:::tip
Sur la page d'inscription des membres, les postes ouverts de chaque plan sont listés par catégorie, puis par nom. Les membres voient toutes les semaines à venir comportant des postes ouverts, à moins que vous n'activiez **Afficher seulement la semaine suivante de chaque type de plan** dans [Paramètres > Inscription des bénévoles](../settings/church-settings.md#volunteer-signup).
:::

## Rappels aux bénévoles {#volunteer-reminders}

B1 peut rappeler automatiquement aux bénévoles les services auxquels ils sont planifiés, afin que vous n'ayez pas à relancer votre équipe chaque semaine. Les rappels sont envoyés à **toutes les personnes planifiées** -- celles qui ont confirmé comme celles qui n'ont pas encore répondu. Seule exception : une demande envoyée par un [flux de confirmation](./workflows.md#serving-assignment-confirmations) ; ce bénévole ne reçoit des rappels qu'après avoir accepté, puisque le flux assure le suivi jusque-là. Chaque courriel de rappel comprend le ou les postes du bénévole, la date du service, les notes du plan et votre message personnalisé.

Le moment et le contenu des rappels sont définis par **type de plan**, afin que chaque type de service puisse avoir son propre calendrier.

1. Depuis l'espace **Service**, sélectionnez le ministère qui contient le type de plan.
2. Dans la liste **Types de plans**, cliquez sur **Modifier** à côté du type de plan.
3. Développez la section **Rappels** et activez **Envoyer des rappels pour les plans de ce type**.
4. Sous **Quand envoyer les rappels ?**, choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **2 jours avant**, **1 jour avant** ou **Le jour même**.
5. Définissez l'**heure du jour** à laquelle les rappels sont envoyés.
6. Ajoutez facultativement un **message**. Laissez le champ vide pour utiliser le texte de rappel par défaut.
7. Sous **Envoyer par**, choisissez **Notification push**, **Courriel** et, si votre église a connecté un [fournisseur de messages texte](../settings/church-settings.md#texting), **Message texte**.
8. Cliquez sur **Enregistrer les rappels**.

Les rappels sont désactivés pour un type de plan tant que vous ne les activez pas.

:::tip
Les bénévoles qui n'ont pas encore confirmé reçoivent les boutons **Accepter** et **Refuser** directement dans le courriel de rappel, afin de pouvoir répondre sans se connecter.
:::

### Rappels par message texte {#text-reminders}

L'option **Message texte** n'apparaît que lorsque votre église a connecté un fournisseur de messages texte. Les messages sont envoyés par le fournisseur de votre église, et chaque message peut coûter à votre église. Un bénévole ne reçoit un rappel par message texte que s'il a activé les **messages texte** dans ses [préférences de notification](../../b1-church/getting-started/notification-preferences.md) et qu'il a un numéro de téléphone mobile dans son profil. Chaque message commence par le nom de votre église, tient en un seul message texte et se termine par « Répondez STOP pour vous désabonner ». Toute personne qui répond STOP cesse de recevoir des messages texte de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook des messages entrants (STOP)** de vos [paramètres de messagerie texte](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

Pour envoyer immédiatement un message texte à toutes les personnes planifiées sur une plage de dates, utilisez **Envoyer un texto aux bénévoles** dans la [vue d'ensemble des plans](./plans-overview.md#texting-everyone-scheduled).

:::info
Chaque rappel est envoyé une seule fois. Les rappels par message texte sont envoyés en plus des notifications push et des courriels, et non à leur place.
:::

## Associer des groupes à un type de plan {#associating-groups-with-a-plan-type}

Sous la liste des plans, sur la page du type de plan, la section **Groupes associés** vous permet de décider quels groupes peuvent voir les plans de ce type depuis leur portail de membre. C'est un moyen rapide de faire connaître les prochains services aux bonnes équipes sans leur donner un accès administrateur.

1. Sur la page du type de plan, cliquez sur **Groupes associés** en haut de la page (ou faites défiler jusqu'à cette section).
2. Cliquez sur **Ajouter un groupe** et choisissez un groupe dans la liste déroulante.
3. Dans la colonne **Affiche**, choisissez si les membres de ce groupe doivent voir **Plans passés seulement**, **Plans à venir seulement** ou **Plans passés et à venir** pour ce type de plan.
4. Répétez l'opération pour associer d'autres groupes, ou cliquez sur l'icône de corbeille pour retirer un groupe.

:::info
Seuls les groupes étiquetés **Standard** apparaissent dans la liste de sélection. Les membres d'un groupe associé voient automatiquement les plans de ce type sur la page du groupe dans le portail de membre B1, limités à la période que vous avez sélectionnée.
:::

Si les plans sont des leçons de Lessons.church, les membres du groupe associé voient aussi une carte **La leçon de cette semaine** sur la page du groupe (ligne de fond, verset et une question pour les parents). Associez ici un groupe de parents et réglez le filtre sur **Plans passés seulement** afin que la leçon du jour soit incluse. Les équipes de bénévoles utilisent généralement **Plans à venir seulement** ou **Plans passés et à venir**.

## Imprimer les plans {#printing-plans}

Vous pouvez imprimer un plan pour le distribuer à votre équipe. Ouvrez le plan et cliquez sur **Imprimer** en haut de la page pour générer une version imprimable comprenant les affectations et l'ordre de service. En haut de l'impression figurent le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un), avec le nom de votre église en dessous, ainsi que le nom du plan, afin de repérer facilement les pages détachées. C'est utile pour les distribuer lors des répétitions ou les afficher dans un espace commun.

Lorsque le plan comporte plusieurs horaires de service, l'impression comprend une colonne d'heure pour chaque service, en tête de laquelle figure son heure de début. Un élément exclu d'un service (voir [Inclure des éléments dans des horaires de service précis](./service-order.md#including-items-in-specific-service-times)) affiche un tiret dans la colonne de ce service.

L'impression omet tout ce qui serait vide. S'il n'y a aucun bénévole affecté, il n'y a pas de cadre d'équipe et l'ordre de service occupe toute la largeur de la page. Si aucun élément n'a de durée, la colonne **Durée** est omise, et si le plan n'a ni horaire de service ni durée, la colonne **Heure** l'est aussi. Pour retirer la barre noire **Ordre de service** avec la date du service, décochez **Afficher l'en-tête Ordre de service** en haut de la page d'impression ; B1 Admin mémorise votre choix dans ce navigateur.

:::info
Les plans sont organisés par ministère. Assurez-vous d'être sur le bon onglet de ministère avant de créer ou de consulter des plans.
:::

## Étapes suivantes {#next-steps}

- Utilisez la [vue d'ensemble des plans](./plans-overview.md) pour voir toutes les affectations à venir sur plusieurs semaines dans une seule grille, repérer les postes non pourvus, et affecter des bénévoles directement depuis la grille
- Enregistrez la structure d'un plan comme [modèle de plan](./plan-templates.md) pour l'appliquer aux plans futurs en un clic
- Construisez votre [ordre de service](./service-order.md) avec des chansons, des lectures et d'autres éléments
- Ajoutez des [chansons](./songs.md) de votre bibliothèque directement dans l'ordre de service
- Utilisez les [tâches](./tasks.md) pour assigner des actions de suivi aux membres de l'équipe
- Affichez le contenu des leçons en cours sur un écran de hall avec [Affichage numérique](./digital-signage.md)
