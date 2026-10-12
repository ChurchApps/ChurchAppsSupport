---
title: "Plans de service"
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date et un ministère spécifiques, ce qui facilite la coordination de vos équipes de bénévoles semaine après semaine et garantit que chaque service est entièrement pourvu en personnel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et équipes dans la zone Service
- Assurez-vous que les bénévoles ont été ajoutés à votre [répertoire de personnes](../people/adding-people.md) et assignés à des équipes

</div>

## Accès aux plans

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Service**, et cliquez sur **Plans**.
2. Sélectionnez un **onglet ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour voir la liste des plans de ce type. Utilisez **À venir** et **Passés** au-dessus de la liste pour passer des plans futurs aux plans antérieurs.
4. Cliquez sur un plan spécifique pour l'ouvrir.

Chaque page de plan affiche des liens vers son type de plan et vers **Plans**, pour remonter sans utiliser le bouton Précédent du navigateur.

:::info
L'accès complet en tant qu'administrateur n'est pas requis pour gérer les plans. N'importe qui qui est membre d'un ministère peut naviguer vers Service et créer, modifier et planifier les plans de son propre ministère sans avoir besoin de la permission Plans Edit. Les éditeurs avec le rôle Plans Edit peuvent gérer les plans sur chaque ministère.
:::

## Création d'un plan

1. Depuis la page du type de plan, cliquez sur **Nouveau plan** en haut de la page.
2. Donnez au plan un nom ou utilisez la date comme nom. Sélectionnez la **date** du service.
3. Si votre ministère dispose de [modèles](./plan-templates.md), vous pouvez en choisir un sous **Démarrer à partir d'un modèle** pour remplir l'ordre de service, les positions et les notes en une seule étape.
4. Sinon, si vous souhaitez copier à partir d'un plan antérieur, utilisez **Copier depuis le plan précédent** pour choisir **Positions uniquement** ou **Positions et affectations**. Si vous ne souhaitez pas copier, choisissez **Rien**. Vous pouvez aussi cocher **Copier l'ordre de service**. Lorsque vous copiez à partir d'un plan précédent, le nouveau plan conserve aussi les **Notes**, la **Date limite d'inscription**, l'option **Afficher les noms des bénévoles sur la page d'inscription** et le paramètre de remplacement automatique de ce plan, ce qui vous évite de les saisir de nouveau chaque semaine. Vous pouvez modifier chacun de ces éléments dans les paramètres du nouveau plan.
5. Pour préparer plusieurs semaines d'un coup lors de la copie, saisissez un nombre dans **Répéter chaque semaine pendant ce nombre de semaines** (jusqu'à 12). B1 crée un plan par semaine, chacun copié à partir du précédent. Si le plan porte le nom de sa date, chaque nouveau plan prend le nom de sa propre date.
6. Vous pouvez éventuellement définir la **Date limite d'inscription (heures avant le service)**. Un nouveau plan reprend la date limite du plan précédent, que vous pouvez modifier ici. Laissez ce champ vide s'il n'y a pas de date limite.
7. Enregistrez le plan. Vous pouvez maintenant commencer à assigner des membres d'équipe et à construire l'[ordre de service](./service-order.md).

:::tip
**Répéter chaque semaine pendant ce nombre de semaines** n'est disponible que lorsque vous copiez quelque chose depuis le plan précédent (positions, affectations ou ordre de service).
:::

## La page de détail du plan

Lorsque vous ouvrez un plan, le nom du plan, le ministère, le type de plan et la date du service apparaissent en haut, avec les boutons **Modifier** et **Imprimer**. En dessous, tout se trouve sur une seule page :

- **[Ordre de service](./service-order.md)** -- Construisez l'ordre de service avec des éléments comme les chansons d'adoration, les prières, les annonces et le sermon.
- **Affectations de l'équipe de service** -- Gérez quels membres d'équipe sont assignés à ce plan. Vous pouvez ajouter des personnes de vos équipes existantes et voir qui a confirmé ou qui est en attente. Des liens au-dessus des positions vous permettent d'ouvrir les **Notes** et les **Horaires** du plan.

## Assignation des membres d'équipe {#assigning-team-members}

1. Ouvrez un plan et faites défiler jusqu'à **Affectations de l'équipe de service**.
2. Cliquez sur **Ajouter une position**. Remplissez les informations du formulaire ajouter une position. Pour le nom de catégorie, ajoutez la catégorie que vous souhaitez. Pour permettre à n'importe qui dans votre église de remplir la position (pas seulement les membres d'une équipe), laissez **Groupe de bénévoles** défini sur **Aucun**.
3. Cliquez sur **Personnes nécessaires** et choisissez les bénévoles pour remplir cette position. Si la position a un **Groupe de bénévoles**, vous choisissez parmi les membres de ce groupe. Si son Groupe de bénévoles est défini sur **Aucun**, vous pouvez plutôt rechercher n'importe qui dans votre église.
4. Ajoutez les membres de votre liste d'équipe en cliquant sur **Ajouter**.
5. Les membres assignés apparaîtront sous leur équipe avec leur statut d'assignation.
6. Cliquez sur notifier les bénévoles pour les notifier dans l'application B1 ou par e-mail.

Chaque position affiche une puce de décompte (par exemple, « 2/3 ») pour que vous puissiez voir combien de places sont remplies en un coup d'œil. Sous le titre **Affectations de l'équipe de service**, un résumé (« X sur Y positions remplies ») indique votre personnel global pour le plan, ainsi que le nombre de postes encore nécessaires, et passe à **Entièrement pourvu** une fois que chaque position est couverte.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer les plans. De cette façon, vous aurez un pool de bénévoles prêt à assigner.
:::

### Copier des positions dans un plan vide {#copying-positions-into-an-empty-plan}

Si un plan n'a encore aucune position et qu'il existe un plan antérieur du même type, un lien **Copier depuis le plan précédent** apparaît dans **Affectations de l'équipe de service**. Choisissez **Positions uniquement** ou **Positions et affectations** pour remplir le plan ouvert avec les positions (et les bénévoles) du plan précédent. La copie se fait dans le plan actuel ; elle ne crée pas un second plan pour la même date.

## Paramètres du plan

Chaque plan a des paramètres supplémentaires que vous pouvez configurer en cliquant sur **Modifier** à côté du plan dans la liste du type de plan, ou sur le bouton **Modifier** en haut de la page du plan. Cliquez sur **Terminé** (ou sur le nom du plan) pour revenir au plan. Ceux-ci incluent :

- **Date limite d'inscription (heures avant le service)** -- Le nombre d'heures avant le service lorsque les inscriptions de bénévoles se ferment. Entrez un nombre négatif pour garder les inscriptions ouvertes au-delà de l'heure de début du service. Laissez ce champ vide s'il n'y a pas de date limite.
- **Afficher les noms des bénévoles sur la page d'inscription** -- Lorsque coché, les bénévoles connectés peuvent voir qui d'autre est déjà inscrit pour chaque position sur la page d'inscription de B1.church. Les noms ne sont jamais affichés aux visiteurs qui ne sont pas connectés.
- **Crayon** -- Masque les assignations aux bénévoles jusqu'à ce que vous soyez prêt à publier le calendrier.
- **Planifier automatiquement un remplacement quand un bénévole décline** -- Lorsque coché, si un bénévole assigné décline sa position, B1 contactera automatiquement la prochaine personne disponible sur la liste d'équipe et demandera si elle peut servir. Cela continue dans la liste jusqu'à ce que quelqu'un accepte, gardant vos positions remplies sans suivi manuel.

## Rappels pour les bénévoles {#volunteer-reminders}

B1 peut automatiquement rappeler aux bénévoles les services pour lesquels ils sont planifiés, afin que vous n'ayez pas à chasser votre équipe chaque semaine. Les rappels vont à **tous ceux qui sont planifiés** -- à la fois ceux qui ont confirmé et ceux qui n'ont pas encore répondu -- par e-mail. Chaque e-mail de rappel inclut la position(s) du bénévole, la date du service, les notes du plan et votre message personnalisé.

Le calendrier et le contenu des rappels sont définis par **type de plan**, afin que chaque type de service puisse garder son propre calendrier.

1. À partir de la zone **Service**, sélectionnez le ministère qui contient le type de plan.
2. Dans la liste **Types de plans**, cliquez sur **Modifier** à côté du type de plan.
3. Développez la section **Rappels** et activez **Envoyer des rappels pour les plans de ce type**.
4. Sous **Quand les rappels doivent-ils être envoyés ?**, choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **2 jours avant**, **1 jour avant** ou **Le jour même**.
5. Définissez l'**heure** à laquelle les rappels sont envoyés.
6. Ajoutez éventuellement un **message**. Laissez-le vide pour utiliser le texte de rappel par défaut.
7. Sous **Envoyer par**, choisissez **Notification push**, **E-mail** et, si votre église a connecté un [fournisseur de SMS](../settings/church-settings.md#texting), **SMS**.
8. Cliquez sur **Enregistrer les rappels**.

Les rappels sont désactivés pour un type de plan tant que vous ne les activez pas.

:::tip
Les bénévoles qui n'ont pas encore confirmé obtiennent les boutons **Accepter** et **Décliner** directement dans l'e-mail de rappel, afin qu'ils puissent répondre sans se connecter.
:::

:::info
Chaque rappel est envoyé une fois. Les rappels par SMS s'ajoutent aux notifications push et e-mail, sans les remplacer.
:::

### Rappels par SMS {#text-reminders}

L'option **SMS** n'apparaît que lorsque votre église a connecté un fournisseur de SMS. Les SMS sont envoyés par le fournisseur de SMS de votre église, et chaque SMS peut coûter à votre église. Un bénévole ne reçoit un rappel par SMS que s'il a activé les **Messages texte** dans ses [Préférences de notification](../../b1-church/getting-started/notification-preferences.md) et s'il a un numéro de mobile sur son profil. Chaque SMS commence par le nom de votre église, tient en un seul message et se termine par « Répondez STOP pour vous désabonner. » Quiconque répond STOP cesse de recevoir des SMS de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook des messages entrants (STOP)** depuis vos [paramètres de SMS](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

Pour envoyer immédiatement un SMS à tous les bénévoles planifiés sur une plage de dates, utilisez **Envoyer un SMS aux bénévoles** dans l'[Aperçu des plans](./plans-overview.md#texting-everyone-scheduled).

## Association de groupes avec un type de plan

Sous la liste des plans sur la page du type de plan, la section **Groupes associés** vous permet de décider quels groupes peuvent voir les plans de ce type de plan à partir de leur portail de membre. C'est un moyen rapide de montrer les services à venir aux bonnes équipes sans leur donner un accès administrateur.

1. Sur la page du type de plan, cliquez sur **Groupes associés** en haut de la page (ou faites défiler jusqu'à cette section).
2. Cliquez sur **Ajouter un groupe** et choisissez un groupe dans le menu déroulant.
3. Dans la colonne **Affiche**, choisissez si les membres de ce groupe devraient voir les **Plans passés uniquement**, les **Plans à venir uniquement** ou les **Plans passés et à venir** pour ce type de plan.
4. Répétez pour associer des groupes supplémentaires, ou cliquez sur l'icône poubelle pour supprimer un groupe.

:::info
Seuls les groupes marqués comme **Standard** apparaissent dans le sélecteur. Les membres d'un groupe associé voient automatiquement les plans de ce type de plan sur la page du groupe dans le portail de membre B1 -- limités à la fenêtre que vous avez sélectionnée.
:::

Si les plans sont des leçons Lessons.church, les membres du groupe associé voient également une carte **Leçon de cette semaine** sur la page du groupe (ligne inférieure, verset et une question pour les parents). Associez un groupe parent ici et définissez le filtre sur **Plans passés uniquement** afin que la leçon d'aujourd'hui soit incluse. Les équipes de bénévoles utilisent généralement **Plans à venir uniquement** ou **Plans passés et à venir**.

## Impression des plans

Vous pouvez imprimer un plan pour le distribuer à votre équipe. Ouvrez le plan et cliquez sur **Imprimer** en haut de la page pour générer une version imprimable qui inclut les affectations et l'ordre de service. Le haut de l'impression affiche le nom de votre église et le nom du plan, afin que les pages détachées soient faciles à identifier. Ceci est utile pour la distribution aux répétitions ou l'affichage dans un endroit commun.

:::info
Les plans sont organisés par ministère. Assurez-vous que vous êtes sur le bon onglet ministère avant de créer ou afficher les plans.
:::

## Prochaines étapes

- Utilisez l'[Aperçu des plans](./plans-overview.md) pour voir toutes les assignations à venir sur plusieurs semaines en une seule grille et repérer les positions non remplies -- et assigner des bénévoles directement depuis la grille
- Enregistrez la structure d'un plan comme un [Modèle de plan](./plan-templates.md) pour pouvoir le marquer sur les plans futurs en un clic
- Construisez votre [Ordre de service](./service-order.md) avec des chansons, des lectures et d'autres éléments
- Ajoutez [chansons](./songs.md) de votre bibliothèque directement dans l'ordre de service
- Utilisez [Tâches](./tasks.md) pour assigner des éléments d'action de suivi aux membres de l'équipe
- Affichez le contenu de la leçon actuelle sur un téléviseur du hall d'accueil avec [Signalétique numérique](./digital-signage.md)
