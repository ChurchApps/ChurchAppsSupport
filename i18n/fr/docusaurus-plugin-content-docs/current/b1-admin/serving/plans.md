---
title: "Plans de service"
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date et un ministère précis, ce qui facilite la coordination de vos équipes de bénévoles semaine après semaine et garantit que chaque service est entièrement pourvu.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et équipes dans la section Service
- Assurez-vous que les bénévoles ont été ajoutés à votre [répertoire de personnes](../people/adding-people.md) et assignés à des équipes

</div>

## Accéder aux plans

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Service**, et cliquez sur **Plans**.
2. Sélectionnez un **onglet de ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour voir la liste des plans de ce type. Utilisez **À venir** et **Passés** au-dessus de la liste pour passer des plans futurs aux plans antérieurs. **À venir** liste les plans à partir d'aujourd'hui, les plus proches en premier, avec les plans sans date à la fin. **Passés** liste uniquement les plans antérieurs, les plus récents en premier.
4. Cliquez sur un plan précis pour l'ouvrir.

Chaque page de plan affiche des liens vers son type de plan et vers **Plans**, pour que vous puissiez remonter sans utiliser le bouton Précédent du navigateur.

:::info
Un accès administrateur complet n'est pas requis pour gérer les plans. Toute personne membre d'un ministère peut accéder à la section Service et créer, modifier et planifier les plans de son ministère, sans avoir besoin de l'autorisation Modifier les plans. Les éditeurs ayant le rôle Modifier les plans peuvent gérer les plans de tous les ministères.
:::

## Créer un plan

1. Depuis la page du type de plan, cliquez sur **Nouveau plan** en haut de la page.
2. Donnez un nom au plan ou utilisez la date comme nom. Sélectionnez la **date** du service.
3. Si votre ministère a des [modèles](./plan-templates.md), vous pouvez en choisir un sous **Démarrer à partir d'un modèle** pour remplir l'ordre du service, les postes et les notes en une seule étape.
4. Sinon, si vous souhaitez copier un plan précédent, utilisez **Copier depuis un plan précédent** pour choisir **Postes seulement** ou **Postes et affectations**. Si vous ne voulez rien copier, choisissez **Rien**. Vous pouvez aussi cocher **Copier l'ordre du service**. Lorsque vous copiez depuis un plan précédent, le nouveau plan conserve aussi les **Notes**, l'**Échéance d'inscription**, l'option **Afficher les noms des bénévoles sur la page d'inscription** et le paramètre de remplacement automatique de ce plan, afin que vous n'ayez pas à les ressaisir chaque semaine. Vous pouvez modifier chacun d'eux dans les paramètres du nouveau plan.
5. Pour préparer plusieurs semaines à la fois lors de la copie, saisissez un nombre dans **Répéter chaque semaine pendant ce nombre de semaines** (jusqu'à 12). B1 crée un plan par semaine, chacun copié à partir du précédent. Si le plan est nommé d'après sa date, chaque nouveau plan porte le nom de sa propre date.
6. Définissez facultativement l'**Échéance d'inscription (heures avant le service)**. Un nouveau plan reprend l'échéance du plan précédent, et vous pouvez la modifier ici. Laissez le champ vide s'il n'y a pas d'échéance. Consultez [Paramètres du plan](#plan-settings) pour savoir comment l'échéance est calculée.
7. Enregistrez le plan. Vous pouvez maintenant commencer à assigner les membres de l'équipe et à construire l'[ordre du service](./service-order.md).

:::tip
**Répéter chaque semaine pendant ce nombre de semaines** n'est disponible que lorsque vous copiez quelque chose depuis le plan précédent (postes, affectations ou ordre du service).
:::

## La page de détail du plan

Lorsque vous ouvrez un plan, son nom, son ministère, son type et sa date de service apparaissent en haut, avec les boutons **Modifier** et **Imprimer**. Plus bas, tout se trouve sur une seule page :

- **[Ordre du service](./service-order.md)** -- Construisez l'ordre du service avec des éléments comme les chants de louange, les prières, les annonces et le sermon.
- **Affectations de l'équipe de service** -- Gérez les membres de l'équipe affectés à ce plan. Vous pouvez ajouter des personnes de vos équipes existantes et voir qui a confirmé ou qui est encore en attente. Des liens au-dessus des postes vous permettent d'ouvrir les **Notes** et les **Horaires** du plan.

## Assigner des membres d'équipe {#assigning-team-members}

1. Ouvrez un plan et faites défiler jusqu'à **Affectations de l'équipe de service**.
2. Cliquez sur **Ajouter un poste**. Remplissez les renseignements dans le formulaire d'ajout de poste. Pour le nom de catégorie, saisissez la catégorie de votre choix. Pour permettre à n'importe qui dans votre église de pourvoir le poste (et pas seulement aux membres d'une seule équipe), laissez **Groupe de bénévoles** sur **Aucun**.
3. Cliquez sur **Personnes requises** et choisissez les bénévoles pour pourvoir ce poste. Si le poste a un **Groupe de bénévoles**, vous choisissez parmi les membres de ce groupe. Si son groupe de bénévoles est réglé sur **Aucun**, vous pouvez rechercher n'importe qui dans votre église à la place.
4. Ajoutez des membres depuis la liste de votre équipe en cliquant sur **Ajouter**.
5. Les membres assignés apparaissent sous leur équipe avec leur statut d'affectation.
6. Cliquez sur **Aviser les bénévoles** pour les aviser dans l'application B1 ou par e-mail. Si le plan utilise un [flux de travail de confirmation](#plan-settings), l'avis démarre aussi une carte de flux de travail qui fait le suivi de chaque demande jusqu'à ce que le bénévole réponde.

Chaque poste affiche une pastille de compte (par exemple « 2/3 ») pour que vous puissiez voir d'un coup d'œil combien de places sont pourvues. Sous le titre **Affectations de l'équipe de service**, un résumé (« X postes sur Y pourvus ») indique la dotation globale du plan, avec le nombre de postes encore nécessaires, et affiche **Entièrement pourvu** une fois que chaque poste est couvert.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer les plans. Vous disposerez ainsi d'un bassin de bénévoles prêts à être assignés.
:::

### Copier des postes dans un plan vide

Si un plan n'a aucun poste et qu'il existe un plan antérieur du même type, un lien **Copier depuis un plan précédent** apparaît dans **Affectations de l'équipe de service**. Choisissez **Postes seulement** ou **Postes et affectations** pour remplir le plan ouvert avec les postes (et les bénévoles) du plan précédent. La copie va dans le plan actuel ; elle ne crée pas un second plan pour la même date.

## Paramètres du plan {#plan-settings}

Chaque plan a des paramètres supplémentaires que vous pouvez configurer en cliquant sur **Modifier** à côté du plan dans la liste du type de plan, ou sur le bouton **Modifier** en haut de la page du plan. Cliquez sur **Terminé** (ou sur le nom du plan) pour revenir au plan. Ces paramètres comprennent :

- **Échéance d'inscription (heures avant le service)** -- le nombre d'heures avant le service où les inscriptions des bénévoles se ferment. Les heures sont comptées à reculons à partir du premier horaire **Service** du plan (les répétitions et les autres horaires sont ignorés, sauf si le plan n'a rien d'autre), donc une échéance de 2 heures pour un service de 10 h 00 ferme les inscriptions à 8 h 00 ce matin-là. Si le plan n'a aucun horaire, l'échéance est comptée à partir de 9 h 00 le jour du service, dans le fuseau horaire de votre église. Une fois l'échéance passée, les bénévoles ne peuvent ni s'inscrire ni se retirer. Saisissez un nombre négatif pour garder les inscriptions ouvertes après l'heure de début du service. Laissez le champ vide, ou effacez-le, pour qu'il n'y ait pas d'échéance.
- **Flux de travail de confirmation** -- choisissez un [flux de travail de confirmation d'affectation de service](./workflows.md#serving-assignment-confirmations) pour assurer le suivi des demandes de service de ce plan par e-mail et par texto jusqu'à ce que chaque bénévole accepte ou refuse. Lorsque vous **Aviser** les bénévoles d'un plan publié, chaque nouvelle demande reçoit sa propre carte sur le tableau de ce flux de travail, et une note au-dessus du lien d'avis indique *« Les nouvelles demandes utilisent le flux de travail de confirmation. »* Laissez l'option sur **Utiliser les avis d'affectation existants** pour conserver les avis habituels. Seuls les flux de travail de confirmation actifs apparaissent dans la liste ; créez-en un sous **Service > Flux de travail** d'abord.
- **Afficher les noms des bénévoles sur la page d'inscription** -- lorsque cette option est cochée, les bénévoles connectés peuvent voir qui d'autre est déjà inscrit à chaque poste sur la page d'inscription de B1.church. Les noms ne sont jamais affichés aux visiteurs qui ne sont pas connectés.
- **Mis en attente** -- masque les affectations aux bénévoles jusqu'à ce que vous soyez prêt à publier l'horaire.
- **Planifier automatiquement un remplaçant lorsqu'un bénévole refuse** -- lorsque cette option est cochée, si un bénévole affecté refuse son poste, B1 contacte automatiquement la prochaine personne disponible de la liste de l'équipe et lui demande si elle peut servir. Cela se poursuit jusqu'à ce que quelqu'un accepte, ce qui permet de garder vos postes pourvus sans suivi manuel.

:::tip
Sur la page d'inscription des membres, les postes ouverts de chaque plan sont listés par catégorie, puis par nom. Les membres voient chaque semaine à venir où il reste des postes ouverts, sauf si vous activez **Afficher seulement la semaine suivante de chaque type de plan** dans [Paramètres > Inscription des bénévoles](../settings/church-settings.md#volunteer-signup).
:::

## Rappels aux bénévoles {#volunteer-reminders}

B1 peut rappeler automatiquement aux bénévoles les services auxquels ils sont inscrits, sans que vous ayez à relancer toute votre équipe chaque semaine. Les rappels sont envoyés à **toutes les personnes planifiées** -- celles qui ont confirmé comme celles qui n'ont pas encore répondu. L'exception est une demande envoyée par un [flux de travail de confirmation](./workflows.md#serving-assignment-confirmations) : ce bénévole ne reçoit des rappels qu'après avoir accepté, puisque le flux de travail assure le suivi jusque-là. Chaque e-mail de rappel comprend le ou les postes du bénévole, la date du service, les notes du plan et votre message personnalisé.

Le moment et le contenu des rappels sont définis par **type de plan**, de sorte que chaque type de service peut avoir son propre calendrier.

1. Depuis la zone **Service**, sélectionnez le ministère qui contient le type de plan.
2. Dans la liste **Types de plans**, cliquez sur **Modifier** à côté du type de plan.
3. Développez la section **Rappels** et activez **Envoyer des rappels pour les plans de ce type**.
4. Sous **Quand les rappels doivent-ils être envoyés ?**, choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **2 jours avant**, **1 jour avant** ou **Le jour même**.
5. Définissez l'**heure du jour** à laquelle les rappels sont envoyés.
6. Ajoutez facultativement un **message**. Laissez-le vide pour utiliser la formulation de rappel par défaut.
7. Sous **Envoyer par**, choisissez **Notification push**, **E-mail** et, si votre église a un [fournisseur de messagerie texte](../settings/church-settings.md#texting) connecté, **Texto**.
8. Cliquez sur **Enregistrer les rappels**.

Les rappels sont désactivés pour un type de plan tant que vous ne les activez pas.

:::tip
Les bénévoles qui n'ont pas encore confirmé obtiennent les boutons **Accepter** et **Refuser** directement dans l'e-mail de rappel, afin de pouvoir répondre sans se connecter.
:::

### Rappels par texto

L'option **Texto** n'apparaît que lorsque votre église a un fournisseur de messagerie texte connecté. Les textos sont envoyés par l'intermédiaire du fournisseur de votre église, et chaque texto peut coûter de l'argent à votre église. Un bénévole ne reçoit un rappel par texto que s'il a activé les **Messages texte** dans ses [Préférences de notification](../../b1-church/getting-started/notification-preferences.md) et qu'il a un numéro de téléphone mobile dans son profil. Chaque texto commence par le nom de votre église, tient en un seul message texte, et se termine par « Répondez STOP pour vous désabonner. » Toute personne qui répond STOP cesse de recevoir des textos de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook de réponse (STOP)** de vos [paramètres de messagerie texte](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

Pour envoyer immédiatement un texto à toutes les personnes planifiées sur une plage de dates, utilisez **Textos aux bénévoles** sur l'[Aperçu des plans](./plans-overview.md#texting-everyone-scheduled).

:::info
Chaque rappel n'est envoyé qu'une seule fois. Les rappels par texto sont envoyés en plus des notifications push et des e-mails, et non à leur place.
:::

## Associer des groupes à un type de plan

Sous la liste des plans sur la page du type de plan, la section **Groupes associés** vous permet de décider quels groupes peuvent voir les plans de ce type de plan depuis leur portail membre. C'est une façon rapide de mettre en évidence les services à venir auprès des bonnes équipes, sans leur donner un accès administrateur.

1. Sur la page du type de plan, cliquez sur **Groupes associés** en haut de la page (ou faites défiler jusqu'à cette section).
2. Cliquez sur **Ajouter un groupe** et choisissez un groupe dans la liste déroulante.
3. Dans la colonne **Affiche**, choisissez si les membres de ce groupe doivent voir **Plans passés seulement**, **Plans à venir seulement** ou **Plans passés et à venir** pour ce type de plan.
4. Répétez pour associer d'autres groupes, ou cliquez sur l'icône de corbeille pour retirer un groupe.

:::info
Seuls les groupes étiquetés **Standard** apparaissent dans la liste de sélection. Les membres d'un groupe associé voient automatiquement les plans de ce type de plan sur la page du groupe dans le portail membre B1 -- limités à la fenêtre que vous avez sélectionnée.
:::

Si les plans sont des leçons de Lessons.church, les membres du groupe associé voient aussi une carte **Leçon de cette semaine** sur la page du groupe (ligne de fin, verset et une question pour les parents). Associez ici un groupe parent et réglez le filtre sur **Plans passés seulement** pour que la leçon du jour soit incluse. Les équipes de bénévoles utilisent généralement **Plans à venir seulement** ou **Plans passés et à venir**.

## Imprimer les plans

Vous pouvez imprimer un plan pour le distribuer à votre équipe. Ouvrez le plan et cliquez sur **Imprimer** en haut de la page pour générer une version imprimable qui comprend les affectations et l'ordre du service. Le haut de l'impression affiche le logo de votre église (le **Logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de votre église en dessous, et le nom du plan, afin que les feuilles détachées soient faciles à identifier. C'est utile pour les distribuer lors des répétitions ou les afficher dans un espace commun.

L'impression omet tout ce qui serait vide. Si aucun bénévole n'est assigné, il n'y a pas de cadre d'équipe, et l'ordre du service occupe toute la largeur de la page. Si aucun élément n'a de durée, la colonne **Durée** est omise, et si le plan n'a ni horaire ni durée, la colonne **Heure** l'est aussi. Pour retirer la barre noire d'en-tête **Ordre du service** avec la date du service, décochez **Afficher l'en-tête de l'ordre du service** en haut de la page d'impression ; B1 Admin mémorise votre choix sur ce navigateur.

:::info
Les plans sont organisés par ministère. Assurez-vous d'être sur le bon onglet de ministère avant de créer ou de consulter des plans.
:::

## Étapes suivantes

- Utilisez l'[Aperçu des plans](./plans-overview.md) pour voir toutes les affectations à venir sur plusieurs semaines dans une seule grille et repérer les postes non pourvus -- et assignez des bénévoles directement depuis la grille
- Enregistrez la structure d'un plan comme [modèle de plan](./plan-templates.md) pour l'appliquer aux plans futurs en un seul clic
- Construisez votre [ordre du service](./service-order.md) avec des chants, des lectures et d'autres éléments
- Ajoutez des [chants](./songs.md) de votre bibliothèque directement dans l'ordre du service
- Utilisez les [tâches](./tasks.md) pour assigner des actions de suivi aux membres de l'équipe
- Affichez le contenu de la leçon en cours sur un téléviseur du hall avec la [Signalisation numérique](./digital-signage.md)
