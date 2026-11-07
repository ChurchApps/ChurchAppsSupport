---
title: "Plans de service"
description: "Mettez en place le planning des bénévoles dans B1 Admin : créez des plans par date, copiez-les, affectez les postes et gérez échéances et rappels."
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date et un ministère précis, ce qui facilite la coordination de vos équipes de bénévoles semaine après semaine et garantit que chaque service est entièrement pourvu.

</div>

## Vidéo de formation

<YouTube id="47DstBXKl74" title="Créer des plans et planifier les bénévoles dans B1" next="Construire l'ordre de service et la bibliothèque de chants dans B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et vos équipes dans le domaine Service
- Assurez-vous que les bénévoles ont été ajoutés à votre [répertoire de personnes](../people/adding-people.md) et affectés à des équipes

</div>

## Accéder aux plans

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Service**, puis cliquez sur **Plans**.
2. Sélectionnez un **onglet de ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour voir la liste des plans de ce type. Utilisez **À venir** et **Passés** au-dessus de la liste pour passer des plans futurs aux plans antérieurs. **À venir** liste les plans à partir d'aujourd'hui, les plus proches en premier, avec les plans sans date à la fin. **Passés** ne liste que les plans antérieurs, les plus récents en premier.
4. Cliquez sur un plan précis pour l'ouvrir.

Chaque page de plan affiche des liens de retour vers son type de plan et vers **Plans**, afin de remonter sans utiliser le bouton Précédent du navigateur.

:::info
Un accès administrateur complet n'est pas nécessaire pour gérer les plans. Tout membre d'un ministère peut accéder au domaine Service et créer, modifier et planifier les plans de son propre ministère sans avoir besoin de l'autorisation Modifier les plans. Les éditeurs disposant du rôle Modifier les plans peuvent gérer les plans de tous les ministères.
:::

## Créer un plan

1. Depuis la page du type de plan, cliquez sur **Nouveau plan** en haut de la page.
2. Donnez un nom au plan ou utilisez la date comme nom. Sélectionnez la **date** du service.
3. Si votre ministère dispose de [modèles](./plan-templates.md), vous pouvez en choisir un sous **Démarrer à partir d'un modèle** pour remplir l'ordre de service, les postes et les notes en une seule étape.
4. Sinon, si vous souhaitez copier un plan précédent, utilisez **Copier depuis le plan précédent** pour choisir **Postes seulement** ou **Postes et affectations**. Si vous ne voulez pas copier, choisissez **Aucun**. Vous pouvez aussi cocher **Copier l'ordre de service**. Lorsque vous copiez depuis un plan précédent, le nouveau plan conserve également les **Notes**, la **Date limite d'inscription**, l'option **Afficher les noms des bénévoles sur la page d'inscription** et le paramètre de remplacement automatique de ce plan, afin de ne pas avoir à les saisir à nouveau chaque semaine. Vous pouvez modifier chacun d'eux dans les paramètres du nouveau plan.
5. Pour configurer plusieurs plans en une fois tout en copiant, choisissez **Répéter tous les** et la **Fréquence** (Jour, Semaine ou Mois), puis saisissez le **Nombre de plans** (jusqu'à 12). Pour le mois, **Le** vous permet de conserver le même jour du mois ou le même jour de la semaine, par exemple le deuxième samedi. B1 affiche les dates avant l'enregistrement et crée un plan pour chaque date, chacun copié à partir du précédent. Si le plan porte le nom de sa date, chaque nouveau plan prend le nom de sa propre date.
6. Vous pouvez éventuellement définir la **Date limite d'inscription (heures avant le service)**. Un nouveau plan reprend la date limite du plan précédent, que vous pouvez modifier ici. Laissez vide pour aucune date limite. Voir [Paramètres du plan](#plan-settings) pour savoir comment la date limite est calculée.
7. Enregistrez le plan. Vous pouvez maintenant commencer à affecter les membres de l'équipe et à construire l'[ordre de service](./service-order.md).

:::tip
Les paramètres de répétition ne sont disponibles que lorsque vous copiez quelque chose depuis le plan précédent (postes, affectations ou ordre de service).
:::

## La page de détail d'un plan

Lorsque vous ouvrez un plan, le nom du plan, le ministère, le type de plan et la date du service apparaissent en haut, avec les boutons **Modifier** et **Imprimer**. Plus bas, tout se trouve sur une seule page :

- **[Ordre de service](./service-order.md)** -- Construisez l'ordre de service avec des éléments comme les chants de louange, les prières, les annonces et la prédication.
- **Affectations de l'équipe de service** -- Gérez les membres de l'équipe affectés à ce plan. Vous pouvez ajouter des personnes de vos équipes existantes et voir qui a confirmé ou attend encore une réponse. Des liens au-dessus des postes vous permettent d'ouvrir les **Notes** et les **Heures** du plan.

## Affecter des membres de l'équipe {#assigning-team-members}

1. Ouvrez un plan et faites défiler jusqu'à **Affectations de l'équipe de service**.
2. Cliquez sur **Ajouter un poste**. Remplissez les renseignements dans le formulaire d'ajout de poste. Pour le nom de la catégorie, saisissez la catégorie de votre choix. Pour permettre à n'importe qui dans votre église de remplir le poste (et pas seulement les membres d'une équipe), laissez **Groupe de bénévoles** sur **Aucun**.
3. Cliquez sur **Personnes requises** et choisissez les bénévoles pour pourvoir ce poste. Si le poste a un **Groupe de bénévoles**, vous choisissez parmi les membres de ce groupe. Si son groupe de bénévoles est réglé sur **Aucun**, vous pouvez rechercher n'importe qui dans votre église à la place.
4. Ajoutez des membres depuis la liste de votre équipe en cliquant sur **Ajouter**.
5. Les membres affectés apparaîtront sous leur équipe avec leur état d'affectation.
6. Cliquez sur notifier les bénévoles pour les prévenir dans l'application B1 ou par courriel. Si le plan utilise un [flux de confirmation](#plan-settings), la notification démarre aussi une carte de flux de travail qui fait le suivi de chaque demande jusqu'à ce que le bénévole réponde.

Chaque poste affiche une pastille de compte (par exemple « 2/3 ») pour que vous voyiez d'un coup d'œil combien de places sont pourvues. Sous l'en-tête **Affectations de l'équipe de service**, un résumé (« X postes sur Y pourvus ») indique votre niveau de dotation global pour le plan, ainsi que le nombre de postes encore nécessaires ; il passe à **Entièrement pourvu** lorsque tous les postes sont couverts.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer des plans. Vous disposerez ainsi d'un bassin de bénévoles prêts à être affectés.
:::

### Copier des postes dans un plan vide

Si un plan n'a encore aucun poste et qu'il existe un plan antérieur du même type, un lien **Copier depuis le plan précédent** apparaît dans **Affectations de l'équipe de service**. Choisissez **Postes seulement** ou **Postes et affectations** pour remplir le plan ouvert avec les postes (et les bénévoles) du plan précédent. La copie se fait dans le plan actuel ; elle ne crée pas un second plan pour la même date.

## Paramètres du plan {#plan-settings}

Chaque plan dispose de paramètres supplémentaires que vous pouvez configurer en cliquant sur **Modifier** à côté du plan dans la liste du type de plan, ou sur le bouton **Modifier** en haut de la page du plan. Cliquez sur **Terminé** (ou sur le nom du plan) pour revenir au plan. Ces paramètres comprennent :

- **Date limite d'inscription (heures avant le service)** — le nombre d'heures avant le service auquel les inscriptions des bénévoles se ferment. Les heures sont décomptées à partir de la première **heure de service** du plan (les répétitions et autres heures sont ignorées, sauf si le plan n'a rien d'autre). Ainsi, une date limite de 2 heures pour un service à 10 h ferme les inscriptions à 8 h ce matin-là. Si le plan n'a aucune heure, la date limite est décomptée à partir de 9 h le jour du service, dans le fuseau horaire de votre église. Une fois cette heure passée, les bénévoles ne peuvent ni s'inscrire ni se retirer. Saisissez un nombre négatif pour garder les inscriptions ouvertes après l'heure de début du service. Laissez vide, ou effacez le champ, pour aucune date limite.
- **Flux de confirmation** — choisissez un [flux de travail de confirmation d'affectation de service](./workflows.md#serving-assignment-confirmations) pour assurer le suivi des demandes de service de ce plan par courriel et par texto jusqu'à ce que chaque bénévole accepte ou refuse. Lorsque vous **notifiez** les bénévoles d'un plan publié, chaque nouvelle demande obtient sa propre carte sur le tableau de ce flux de travail, et une note au-dessus du lien de notification indique : *« Les nouvelles demandes utilisent le flux de confirmation. »* Laissez sur **Utiliser les notifications d'affectation existantes** pour conserver les notifications habituelles. Seuls les flux de confirmation actifs apparaissent dans la liste ; créez-en un d'abord sous **Service > Flux de travail**.
- **Afficher les noms des bénévoles sur la page d'inscription** — lorsque cette option est cochée, les bénévoles connectés peuvent voir qui d'autre est déjà inscrit à chaque poste sur la page d'inscription de B1.church. Les noms ne sont jamais affichés aux visiteurs qui ne sont pas connectés.
- **Pré-affecté** — masque les affectations aux bénévoles tant que vous n'êtes pas prêt à publier l'horaire.
- **Planifier automatiquement un remplaçant lorsqu'un bénévole refuse** — lorsque cette option est cochée, si un bénévole affecté refuse son poste, B1 contacte automatiquement la personne suivante disponible de la liste de l'équipe et lui demande si elle peut servir. Cela se poursuit dans la liste jusqu'à ce que quelqu'un accepte, ce qui permet de garder vos postes pourvus sans suivi manuel.

:::tip
Sur la page d'inscription des membres, les postes ouverts de chaque plan sont listés par catégorie, puis par nom. Les membres voient chaque semaine à venir comportant des postes ouverts, sauf si vous activez **Afficher seulement la semaine suivante de chaque type de plan** dans [Paramètres > Inscription des bénévoles](../settings/church-settings.md#volunteer-signup).
:::

## Rappels aux bénévoles {#volunteer-reminders}

B1 peut rappeler automatiquement aux bénévoles les services auxquels ils sont affectés, afin que vous n'ayez pas à relancer votre équipe chaque semaine. Les rappels sont envoyés à **toutes les personnes planifiées** -- celles qui ont confirmé comme celles qui n'ont pas encore répondu. Exception : une demande envoyée par un [flux de confirmation](./workflows.md#serving-assignment-confirmations) ne reçoit des rappels qu'après l'acceptation du bénévole, puisque le flux de travail assure le suivi jusque-là. Chaque courriel de rappel comprend le ou les postes du bénévole, la date du service, les notes du plan et votre message personnalisé.

Le moment et le contenu des rappels se règlent par **type de plan**, afin que chaque type de service puisse avoir son propre calendrier.

1. Depuis le domaine **Service**, sélectionnez le ministère qui contient le type de plan.
2. Dans la liste **Types de plans**, cliquez sur **Modifier** à côté du type de plan.
3. Développez la section **Rappels** et activez **Envoyer des rappels pour les plans de ce type**.
4. Sous **Quand les rappels doivent-ils partir ?**, choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **2 jours avant**, **1 jour avant** ou **Le jour même**.
5. Réglez l'**heure de la journée** à laquelle les rappels partent.
6. Vous pouvez éventuellement ajouter un **message**. Laissez vide pour utiliser la formulation par défaut du rappel.
7. Sous **Envoyer par**, choisissez **Notification push**, **Courriel** et, si votre église a un [fournisseur de messages texte](../settings/church-settings.md#texting) connecté, **Texto**.
8. Cliquez sur **Enregistrer les rappels**.

Les rappels sont désactivés pour un type de plan tant que vous ne les activez pas.

:::tip
Les bénévoles qui n'ont pas encore confirmé reçoivent des boutons **Accepter** et **Refuser** directement dans le courriel de rappel, afin de pouvoir répondre sans se connecter.
:::

### Rappels par texto {#text-reminders}

L'option **Texto** n'apparaît que lorsque votre église a connecté un fournisseur de messages texte. Les textos sont envoyés par le fournisseur de messages texte de votre église, et chaque texto peut coûter à votre église. Un bénévole ne reçoit un rappel par texto que s'il a activé les **messages texte** dans ses [préférences de notification](../../b1-church/getting-started/notification-preferences.md) et qu'un numéro de téléphone mobile figure sur son profil. Chaque texto commence par le nom de votre église, tient en un seul message texte et se termine par « Répondez STOP pour vous désabonner. » Toute personne qui répond STOP cesse de recevoir des textos de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook des réponses entrantes (STOP)** depuis vos [paramètres de messages texte](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

Pour envoyer immédiatement un texto à toutes les personnes planifiées sur une plage de dates, utilisez **Textos aux bénévoles** dans la [Vue d'ensemble des plans](./plans-overview.md#texting-everyone-scheduled).

:::info
Chaque rappel n'est envoyé qu'une fois. Les rappels par texto s'ajoutent aux notifications push et par courriel, sans les remplacer.
:::

## Associer des groupes à un type de plan

Sous la liste des plans de la page du type de plan, la section **Groupes associés** vous permet de décider quels groupes peuvent voir les plans de ce type depuis leur portail de membre. C'est un moyen rapide de faire connaître les services à venir aux bonnes équipes sans leur donner un accès administrateur.

1. Sur la page du type de plan, cliquez sur **Groupes associés** en haut de la page (ou faites défiler jusqu'à cette section).
2. Cliquez sur **Ajouter un groupe** et choisissez un groupe dans la liste déroulante.
3. Dans la colonne **Affiche**, choisissez si les membres de ce groupe doivent voir **Seulement les plans passés**, **Seulement les plans à venir** ou **Les plans passés et à venir** pour ce type de plan.
4. Répétez pour associer d'autres groupes, ou cliquez sur l'icône de corbeille pour retirer un groupe.

:::info
Seuls les groupes étiquetés **Standard** apparaissent dans la liste de sélection. Les membres d'un groupe associé voient automatiquement les plans de ce type sur la page du groupe dans le portail des membres B1 -- limités à la période que vous avez sélectionnée.
:::

Si les plans sont des leçons Lessons.church, les membres du groupe associé voient aussi une carte **Leçon de cette semaine** sur la page du groupe (ligne directrice, verset et une question pour les parents). Associez ici un groupe de parents et réglez le filtre sur **Seulement les plans passés** afin que la leçon du jour soit incluse. Les équipes de bénévoles utilisent généralement **Seulement les plans à venir** ou **Les plans passés et à venir**.

## Imprimer les plans {#printing-plans}

Vous pouvez imprimer un plan pour le distribuer à votre équipe. Ouvrez le plan et cliquez sur **Imprimer** en haut de la page pour générer une version imprimable qui comprend les affectations et l'ordre de service. En haut de la copie imprimée figurent le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de votre église en dessous, ainsi que le nom du plan, afin que les feuilles détachées soient faciles à identifier. C'est utile pour les distribuer lors des répétitions ou les afficher dans un espace commun.

La copie imprimée omet tout ce qui serait vide. Si aucun bénévole n'est affecté, il n'y a pas de case d'équipe, et l'ordre de service occupe toute la largeur de la page. Si aucun élément n'a de durée, la colonne **Durée** est omise, et si le plan n'a ni heure de service ni durée, la colonne **Heure** l'est aussi. Pour retirer la barre de titre noire **Ordre de service** avec la date du service, décochez **Afficher l'en-tête Ordre de service** en haut de la page d'impression ; B1 Admin mémorise votre choix sur ce navigateur.

:::info
Les plans sont organisés par ministère. Assurez-vous d'être sur le bon onglet de ministère avant de créer ou de consulter des plans.
:::

## Et ensuite

- Utilisez la [Vue d'ensemble des plans](./plans-overview.md) pour voir toutes les affectations à venir sur plusieurs semaines dans une seule grille, repérer les postes non pourvus, et affecter des bénévoles directement depuis la grille
- Enregistrez la structure d'un plan comme [modèle de plan](./plan-templates.md) pour l'appliquer aux plans futurs en un clic
- Construisez votre [ordre de service](./service-order.md) avec des chants, des lectures et d'autres éléments
- Ajoutez des [chants](./songs.md) de votre bibliothèque directement dans l'ordre de service
- Utilisez les [tâches](./tasks.md) pour assigner des actions de suivi aux membres de l'équipe
- Affichez le contenu de la leçon en cours sur un téléviseur du hall avec la [Signalisation numérique](./digital-signage.md)
