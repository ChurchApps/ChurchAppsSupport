---
title: "Plans de service"
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date et un ministère précis, ce qui facilite la coordination de vos équipes de bénévoles semaine après semaine et garantit que chaque culte est entièrement doté.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et vos équipes dans l'espace Serving
- Assurez-vous que les bénévoles ont été ajoutés à votre [annuaire des personnes](../people/adding-people.md) et affectés à des équipes

</div>

## Accéder aux plans

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Serving**, puis cliquez sur **Plans**.
2. Sélectionnez un **onglet de ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour afficher la liste des plans de ce type. Utilisez **Upcoming** et **Past** au-dessus de la liste pour passer des plans à venir aux plans précédents. **Upcoming** affiche les plans à partir d'aujourd'hui, du plus proche au plus éloigné, les plans sans date étant placés à la fin. **Past** n'affiche que les plans antérieurs, du plus récent au plus ancien.
4. Cliquez sur un plan précis pour l'ouvrir.

Chaque page de plan contient des liens vers son type de plan et vers **Plans**, afin que vous puissiez remonter sans utiliser le bouton Précédent du navigateur.

:::info
Un accès administrateur complet n'est pas nécessaire pour gérer les plans. Toute personne membre d'un ministère peut accéder à Serving et créer, modifier et programmer des plans pour son propre ministère sans avoir besoin de l'autorisation Plans Edit. Les éditeurs disposant du rôle Plans Edit peuvent gérer les plans de tous les ministères.
:::

## Créer un plan

1. Depuis la page du type de plan, cliquez sur **New Plan** en haut de la page.
2. Donnez un nom au plan ou utilisez la date comme nom. Sélectionnez la **date** du culte.
3. Si votre ministère dispose de [modèles](./plan-templates.md), vous pouvez en choisir un sous **Start from template** pour remplir l'ordre du culte, les postes et les notes en une seule étape.
4. Sinon, si vous souhaitez copier un plan précédent, utilisez **Copy from Previous Plan** pour choisir **Positions Only** ou **Positions and Assignments**. Si vous ne voulez rien copier, choisissez **Nothing**. Vous pouvez également cocher **Copy Order of Service**. Lorsque vous copiez depuis un plan précédent, le nouveau plan conserve aussi les **Notes**, la **Signup Deadline**, l'option **Show volunteer names on signup page** et le paramètre de remplacement automatique de ce plan, afin que vous n'ayez pas à les ressaisir chaque semaine. Vous pouvez modifier chacun de ces éléments dans les paramètres du nouveau plan.
5. Pour préparer plusieurs semaines à la fois lors de la copie, saisissez un nombre dans **Repeat weekly for this many weeks** (jusqu'à 12). B1 crée un plan par semaine, chacun copié à partir du précédent. Si le plan porte le nom de sa date, chaque nouveau plan prend le nom de sa propre date.
6. Définissez éventuellement la **Signup Deadline (hours before service)**. Un nouveau plan reprend la date limite du plan précédent, que vous pouvez modifier ici. Laissez le champ vide s'il n'y a aucune date limite. Consultez [Paramètres du plan](#plan-settings) pour savoir comment la date limite est calculée.
7. Enregistrez le plan. Vous pouvez maintenant commencer à affecter les membres de l'équipe et à construire l'[ordre du culte](./service-order.md).

:::tip
**Repeat weekly for this many weeks** n'est disponible que lorsque vous copiez quelque chose depuis le plan précédent (postes, affectations ou ordre du culte).
:::

## La page de détail du plan

Lorsque vous ouvrez un plan, son nom, son ministère, son type et sa date de culte apparaissent en haut, avec les boutons **Edit** et **Print**. Tout le reste se trouve ensuite sur une seule page :

- **[Ordre du culte](./service-order.md)** -- Construisez l'ordre du culte avec des éléments tels que les chants de louange, les prières, les annonces et le message.
- **Serving Team Assignments** -- Gérez les membres de l'équipe affectés à ce plan. Vous pouvez ajouter des personnes issues de vos équipes existantes et voir qui a confirmé ou qui est encore en attente. Des liens au-dessus des postes permettent d'ouvrir les **Notes** et les **Times** du plan.

## Affecter des membres de l'équipe

1. Ouvrez un plan et faites défiler jusqu'à **Serving Team Assignments**.
2. Cliquez sur **Add Position**. Remplissez les informations dans le formulaire d'ajout de poste. Pour le nom de catégorie, saisissez la catégorie de votre choix. Pour permettre à n'importe quel membre de votre église de tenir le poste (et pas seulement aux membres d'une équipe), laissez **Volunteer Group** sur **None**.
3. Cliquez sur **People Needed** et choisissez les bénévoles qui occuperont ce poste. Si le poste possède un **Volunteer Group**, vous choisissez parmi les membres de ce groupe. Si son Volunteer Group est défini sur **None**, vous pouvez rechercher n'importe quelle personne de votre église.
4. Ajoutez des membres depuis la liste de votre équipe en cliquant sur **Add**.
5. Les membres affectés apparaissent sous leur équipe avec leur statut d'affectation.
6. Cliquez sur notify volunteers pour les prévenir dans l'application B1 ou par e-mail. Si le plan utilise un [workflow de confirmation](#plan-settings), la notification lance également une carte de workflow qui assure le suivi de chaque demande jusqu'à la réponse du bénévole.

Chaque poste affiche un compteur (par exemple « 2/3 ») afin que vous voyiez d'un coup d'œil combien de places sont pourvues. Sous le titre **Serving Team Assignments**, un résumé (« X postes sur Y pourvus ») indique le niveau global de staffing du plan, ainsi que le nombre de postes encore à pourvoir ; il affiche **Fully staffed** lorsque chaque poste est couvert.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer les plans. Vous disposerez ainsi d'un vivier de bénévoles prêts à être affectés.
:::

### Copier des postes dans un plan vide

Si un plan ne contient encore aucun poste et qu'un plan antérieur du même type existe, un lien **Copy from Previous Plan** apparaît dans **Serving Team Assignments**. Choisissez **Positions Only** ou **Positions and Assignments** pour remplir le plan ouvert avec les postes (et les bénévoles) du plan précédent. La copie est effectuée dans le plan actuel ; elle ne crée pas un second plan pour la même date.

## Paramètres du plan

Chaque plan dispose de paramètres supplémentaires que vous pouvez configurer en cliquant sur **Edit** à côté du plan dans la liste du type de plan, ou sur le bouton **Edit** en haut de la page du plan. Cliquez sur **Done** (ou sur le nom du plan) pour revenir au plan. Ces paramètres comprennent :

- **Signup Deadline (hours before service)** -- le nombre d'heures avant le culte à partir duquel les inscriptions des bénévoles sont clôturées. Les heures sont comptées à rebours à partir du premier horaire **Service** du plan (les répétitions et autres horaires sont ignorés, sauf si le plan n'a rien d'autre). Ainsi, une date limite de 2 heures pour un culte de 10 h 00 ferme les inscriptions à 8 h 00 ce matin-là. Si le plan ne contient aucun horaire, la date limite est comptée à partir de 9 h 00 le jour du culte, dans le fuseau horaire de votre église. Une fois la date limite dépassée, les bénévoles ne peuvent plus ni s'inscrire ni se désinscrire. Saisissez un nombre négatif pour garder les inscriptions ouvertes après le début du culte. Laissez le champ vide, ou effacez-le, pour qu'il n'y ait aucune date limite.
- **Confirmation workflow** -- choisissez un [workflow de confirmation des affectations de service](./workflows.md#serving-assignment-confirmations) pour assurer le suivi des demandes de service de ce plan par e-mail et par SMS jusqu'à ce que chaque bénévole accepte ou refuse. Lorsque vous cliquez sur **Notify** pour les bénévoles d'un plan publié, chaque nouvelle demande reçoit sa propre carte sur le tableau de ce workflow, et une note au-dessus du lien de notification indique *« Les nouvelles demandes utilisent le workflow de confirmation. »* Laissez l'option **Use existing assignment notifications** pour conserver les notifications habituelles. Seuls les workflows de confirmation actifs apparaissent dans la liste ; créez-en un d'abord sous **Serving > Workflows**.
- **Show volunteer names on signup page** -- lorsque cette option est cochée, les bénévoles connectés peuvent voir qui s'est déjà inscrit à chaque poste sur la page d'inscription de B1.church. Les noms ne sont jamais affichés aux visiteurs qui ne sont pas connectés.
- **Penciled in** -- masque les affectations aux bénévoles jusqu'à ce que vous soyez prêt à publier le planning.
- **Automatically schedule a replacement when a volunteer declines** -- lorsque cette option est cochée, si un bénévole affecté refuse son poste, B1 contacte automatiquement la personne disponible suivante dans la liste de l'équipe et lui demande si elle peut servir. Le processus se poursuit dans la liste jusqu'à ce qu'une personne accepte, ce qui permet de garder vos postes pourvus sans relance manuelle.

:::tip
Sur la page d'inscription des membres, les postes ouverts de chaque plan sont listés par catégorie, puis par nom. Les membres voient toutes les semaines à venir comportant des postes ouverts, sauf si vous activez **Show only the next week of each plan type** dans [Paramètres > Inscription des bénévoles](../settings/church-settings.md#volunteer-signup).
:::

## Rappels aux bénévoles {#volunteer-reminders}

B1 peut envoyer automatiquement des rappels aux bénévoles avant les cultes auxquels ils sont affectés, afin que vous n'ayez pas à relancer votre équipe chaque semaine. Les rappels sont envoyés à **toutes les personnes programmées**, qu'elles aient confirmé ou non. L'exception concerne une demande envoyée via un [workflow de confirmation](./workflows.md#serving-assignment-confirmations) : ce bénévole ne reçoit des rappels qu'après avoir accepté, puisque le workflow assure le suivi jusque-là. Chaque e-mail de rappel comprend le ou les postes du bénévole, la date du culte, les notes du plan et votre message personnalisé.

Le calendrier et le contenu des rappels se définissent par **type de plan**, afin que chaque type de service puisse avoir son propre planning.

1. Depuis l'espace **Serving**, sélectionnez le ministère qui contient le type de plan.
2. Dans la liste **Plan Types**, cliquez sur **Edit** à côté du type de plan.
3. Développez la section **Reminders** et activez **Send reminders for plans of this type**.
4. Sous **When should reminders go out?**, choisissez jusqu'à trois moments : **7 days before**, **3 days before**, **2 days before**, **1 day before** ou **Day of**.
5. Définissez l'**heure d'envoi** (**Time of Day**) des rappels.
6. Ajoutez éventuellement un **message**. Laissez-le vide pour utiliser le texte de rappel par défaut.
7. Sous **Send By**, choisissez **Push**, **Email** et, si votre église a connecté un [fournisseur de SMS](../settings/church-settings.md#texting), **Text**.
8. Cliquez sur **Save Reminders**.

Les rappels sont désactivés pour un type de plan tant que vous ne les activez pas.

:::tip
Les bénévoles qui n'ont pas encore confirmé disposent des boutons **Accept** et **Decline** directement dans l'e-mail de rappel, afin de pouvoir répondre sans se connecter.
:::

### Rappels par SMS

L'option **Text** n'apparaît que lorsque votre église a connecté un fournisseur de SMS. Les SMS sont envoyés par l'intermédiaire du fournisseur de votre église, et chaque SMS peut coûter à votre église. Un bénévole ne reçoit un rappel par SMS que s'il a activé les **Text messages** dans ses [préférences de notification](../../b1-church/getting-started/notification-preferences.md) et s'il a un numéro de portable sur son profil. Chaque SMS commence par le nom de votre église, tient en un seul message et se termine par « Reply STOP to opt out. » Toute personne qui répond STOP cesse de recevoir des SMS de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook de réponse STOP (Inbound)** provenant de vos [paramètres SMS](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

Pour envoyer immédiatement un SMS à toutes les personnes programmées sur une plage de dates, utilisez **Text Volunteers** sur la [vue d'ensemble des plans](./plans-overview.md#texting-everyone-scheduled).

:::info
Chaque rappel n'est envoyé qu'une seule fois. Les rappels par SMS sont envoyés en plus des notifications push et des e-mails, et non à leur place.
:::

## Associer des groupes à un type de plan

Sous la liste des plans, sur la page du type de plan, la section **Associated Groups** vous permet de décider quels groupes peuvent voir les plans de ce type depuis leur portail de membre. C'est un moyen rapide de présenter les prochains cultes aux bonnes équipes sans leur donner un accès administrateur.

1. Sur la page du type de plan, cliquez sur **Associated Groups** en haut de la page (ou faites défiler jusqu'à cette section).
2. Cliquez sur **Add Group** et choisissez un groupe dans la liste déroulante.
3. Dans la colonne **Shows**, choisissez si les membres de ce groupe doivent voir **Past plans only**, **Upcoming plans only** ou **Past and upcoming plans** pour ce type de plan.
4. Répétez l'opération pour associer d'autres groupes, ou cliquez sur l'icône de corbeille pour retirer un groupe.

:::info
Seuls les groupes marqués **Standard** apparaissent dans la liste de sélection. Les membres d'un groupe associé voient automatiquement les plans de ce type sur la page du groupe dans le portail de membre B1, limités à la période que vous avez sélectionnée.
:::

Si les plans sont des leçons Lessons.church, les membres du groupe associé voient également une carte **This week's lesson** sur la page du groupe (ligne de conclusion, verset et une question pour les parents). Associez ici un groupe de parents et réglez le filtre sur **Past plans only** afin que la leçon du jour soit incluse. Les équipes de bénévoles utilisent généralement **Upcoming plans only** ou **Past and upcoming plans**.

## Imprimer les plans

Vous pouvez imprimer un plan pour le distribuer à votre équipe. Ouvrez le plan et cliquez sur **Print** en haut de la page pour générer une version imprimable comprenant les affectations et l'ordre du culte. En haut de l'impression figurent le logo de votre église (le **Light Background Logo** issu de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de votre église en dessous, ainsi que le nom du plan, afin que les pages volantes soient faciles à identifier. Cette option est utile pour distribuer les documents lors des répétitions ou les afficher dans un espace commun.

:::info
Les plans sont organisés par ministère. Assurez-vous d'être sur le bon onglet de ministère avant de créer ou de consulter des plans.
:::

## Étapes suivantes

- Utilisez la [vue d'ensemble des plans](./plans-overview.md) pour voir toutes les affectations à venir sur plusieurs semaines dans une seule grille, repérer les postes non pourvus, et affecter directement des bénévoles depuis la grille
- Enregistrez la structure d'un plan comme [modèle de plan](./plan-templates.md) afin de l'appliquer à des plans futurs en un clic
- Construisez votre [ordre du culte](./service-order.md) avec des chants, des lectures et d'autres éléments
- Ajoutez des [chants](./songs.md) de votre bibliothèque directement dans l'ordre du culte
- Utilisez les [tâches](./tasks.md) pour assigner des actions de suivi aux membres de l'équipe
- Affichez le contenu de leçon en cours sur un téléviseur du hall d'entrée avec l'[affichage numérique](./digital-signage.md)
