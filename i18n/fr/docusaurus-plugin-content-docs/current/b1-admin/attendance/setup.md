---
title: "Configuration de la présence"
---

# Configuration de la présence

<div class="article-intro">

Avant de pouvoir suivre la présence, vous devez indiquer à B1 Admin les emplacements physiques de votre église, les moments où les services ont lieu, et les groupes qui se réunissent à chaque service. Cette configuration unique crée la structure qui alimente tout le suivi et les rapports de présence de votre église.

</div>

## Vidéo de formation

<YouTube id="LQPc2gVlXvQ" title="Configurer les services et la présence dans B1" next="Configurer l'enregistrement des enfants dans B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de gérer la présence. Consultez [Rôles et autorisations](../people/roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous prévoyez d'associer des groupes à des horaires de service, assurez-vous d'avoir d'abord [créé vos groupes](../groups/creating-groups.md).

</div>

## Concepts clés

- **Campus** -- un emplacement physique où votre église se réunit (par exemple « Campus principal », « Campus nord »). Les campus sont gérés sous **Paramètres**.
- **Service** -- un rassemblement récurrent sur un campus (par exemple « Service du dimanche », « Mi-semaine »).
- **Horaire de service** -- un moment précis où un service a lieu (par exemple « 9 h 00 », « 11 h 00 »).
- **Groupe planifié** -- un groupe associé à un horaire de service précis. La présence est suivie dans le contexte de ce service.
- **Groupe non planifié** -- un groupe qui suit sa propre présence, sans être lié à un horaire de service.

## Configurer la structure de présence

1. Ouvrez **B1 Admin**, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), puis développez **Personnes**.
2. Cliquez sur **Présence**, puis sur **Configuration** dans la colonne de gauche. Le tableau **Structure des services** s'ouvre, avec le nombre de vos campus, horaires de services, et groupes planifiés et non planifiés affichés en haut. Les totaux se mettent à jour dès que vous ajoutez, modifiez ou supprimez un élément dans le tableau.
3. Cliquez sur **Gérer les campus** (en haut à droite du panneau **Structure des services**). Cela vous mène à **Paramètres → Campus**. Cliquez sur **Ajouter un campus**, saisissez le nom de votre emplacement (l'adresse et le fuseau horaire sont facultatifs), puis cliquez sur **Enregistrer**.
4. Revenez à **Personnes → Présence** et cliquez sur **Configuration**. Votre campus apparaît maintenant dans le tableau de configuration.
5. Cliquez sur le **bouton + de la colonne Service** sous votre campus. Saisissez un nom de service tel que « Service du dimanche » et cliquez sur **Enregistrer**.
6. Cliquez sur le **bouton + de la colonne Horaire** sous le service. Saisissez un nom d'**horaire de service** tel que « 9 h 00 », ajoutez éventuellement le [calendrier d'enregistrement](#setting-a-check-in-schedule), puis cliquez sur **Enregistrer**. Répétez pour chaque horaire de service.
7. Pour associer un groupe à un horaire de service, ouvrez le groupe depuis **Personnes > Groupes**, cliquez sur **Modifier**, puis utilisez **Ajouter un horaire de service** -- consultez la section suivante.

### Activer le suivi de la présence pour un groupe

Avant qu'un groupe puisse avoir sa présence enregistrée, le suivi de la présence doit être activé pour ce groupe.

1. Dans le menu Accès rapide, choisissez **Personnes > Groupes** et sélectionnez le groupe.
2. Cliquez sur le bouton **Modifier** sous le nom du groupe.
3. Réglez **Suivre la présence** sur **Oui**.
4. Cliquez sur **Enregistrer**.

:::tip
Si vous avez associé le groupe à un horaire de service à l'étape précédente, utilisez également l'option **Ajouter un horaire de service** sur l'écran de modification du groupe pour le lier au bon service. Cela garantit que les séances sont reliées au bon campus et au bon moment.
:::

:::tip
Si un groupe se réunit en dehors d'un service régulier -- par exemple un petit groupe en milieu de semaine qui suit sa propre présence -- vous pouvez le laisser comme groupe non planifié. Il apparaîtra tout de même dans le rapport **Présence par groupe** pour les rapports de présence.
:::

## Définir un calendrier d'enregistrement {#setting-a-check-in-schedule}

Chaque horaire de service peut avoir un calendrier d'enregistrement facultatif afin que l'[enregistrement autonome](check-in.md) s'ouvre et se ferme seul chaque semaine. Sans calendrier, l'enregistrement pour cet horaire de service reste disponible à tout moment (tant que la salle n'est pas fermée pour d'autres raisons, par exemple si elle est pleine).

1. Dans la vue **Configuration**, cliquez sur le nom d'un horaire de service dans la colonne **Horaire** (ou ajoutez-en un nouveau).
2. Sous **Calendrier d'enregistrement**, choisissez le **jour** de la semaine où l'horaire de service a lieu.
3. Définissez l'**heure de début** et, facultativement, l'**heure de fin**.
4. Saisissez **Ouvrir l'enregistrement (minutes avant le début)** -- par exemple, `30` ouvre l'enregistrement une demi-heure avant le début du service.
5. Saisissez **Fermer l'enregistrement (minutes après la fin)** -- par exemple, `15` garde l'enregistrement ouvert 15 minutes après l'heure de fin. Si vous n'avez pas défini d'heure de fin, ce délai est compté à partir de l'heure de début.
6. Cliquez sur **Enregistrer**.

Le calendrier se répète chaque semaine et est mesuré dans le fuseau horaire du campus du service. Si ce campus n'a pas de fuseau horaire, le [fuseau horaire](../settings/church-settings.md#time-zone) de votre église est utilisé à la place, puis le fuseau horaire de votre premier campus qui en possède un, et enfin l'heure de l'Est (America/New_York). Si l'enregistrement s'ouvre à la mauvaise heure, vérifiez le **fuseau horaire** du campus dans [Campus](../settings/campuses.md). Pour supprimer un calendrier, remettez **Jour** sur **Aucun calendrier** et cliquez sur **Enregistrer**. Un calendrier n'entre en vigueur que lorsqu'un **jour** et une **heure de début** sont tous deux définis.

Pendant que la fenêtre d'enregistrement d'un horaire de service est fermée :

- **L'enregistrement autonome sur B1.church** affiche cet horaire de service comme **Fermé** (ou, par exemple, **Fermé · ouvre dim. 9 h 30**) et il ne peut pas être sélectionné. Si aucun des horaires d'un service n'est ouvert, les familles voient à quel moment l'enregistrement ouvre, par exemple « L'enregistrement ouvre dim. 9 h 30 ».
- **L'application borne B1 Checkin** affiche également l'horaire de service comme **Fermé** avec l'heure d'ouverture. Si tous les horaires d'un service sont fermés, la borne indique quand l'enregistrement de ce service ouvre. Une personne déjà enregistrée à un horaire de service fermé voit son groupe affiché avec **Enregistré** à la place. Si une fenêtre se ferme en plein milieu d'un enregistrement, la borne ne le termine pas et affiche un écran **Impossible d'enregistrer pour le moment** qui liste la salle concernée afin que la famille puisse en choisir une autre.

Une famille qui s'est déjà enregistrée pour un horaire de service antérieur peut revenir et ajouter un horaire de service ultérieur qui est ouvert, même après la fermeture de la fenêtre précédente. Leurs enregistrements existants sont conservés.

:::tip
Prévoyez une fenêtre d'ouverture généreuse (par exemple 45 minutes avant le début) afin que les familles et les bénévoles qui arrivent en avance puissent s'enregistrer, et une fenêtre de fermeture courte pour que les retardataires puissent tout de même s'enregistrer une fois le service commencé.
:::

## Modifier votre configuration

Vous pouvez mettre à jour votre configuration à tout moment. Sélectionnez un campus, un horaire de service ou un groupe, puis cliquez sur **Modifier** pour changer ses détails, ou sur **Supprimer** pour le retirer.

:::info
Supprimer un horaire de service ne supprime pas les anciennes fiches de présence. Vos données historiques sont conservées même si vous modifiez votre calendrier.
:::

## Et ensuite

Une fois vos campus, horaires de services et groupes en place, vous êtes prêt à commencer à [enregistrer la présence](recording-attendance.md) manuellement ou à configurer l'[enregistrement autonome](check-in.md) pour vos services.
