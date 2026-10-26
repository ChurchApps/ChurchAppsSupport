---
title: "Affichage numérique"
---

# Affichage numérique

<div class="article-intro">

Envoyez le contenu de vos leçons vers une télévision du hall d'entrée ou d'un couloir à l'aide d'un flux d'affichage numérique. Chaque type de plan dispose d'une URL de flux qui affiche toujours le contenu du plan en cours, si bien qu'il n'y a rien à mettre à jour chaque semaine. Si vos téléviseurs utilisent FreePlay, vous pouvez plutôt programmer le type de plan sur ces derniers dans FreePlay Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez un [type de plan](./plans.md) avec [Lessons.church](../../b1-church/content/lessons.md) ou un autre contenu de leçon programmé
- Disposez d'un compte [SignPresenter](https://www.signpresenter.com) et d'un appareil configuré pour l'afficher, ou d'une télévision exécutant [FreePlay](../../freeplay/)

</div>

## Obtenir l'URL du flux

1. Accédez à **Serving**, sélectionnez le ministère qui contient votre type de plan, puis cliquez sur le type de plan pour l'ouvrir.
2. Cliquez sur **Digital Signage** (l'icône de télévision) en haut de la page du type de plan.
3. Dans la boîte de dialogue **Digital Signage Feed**, cliquez sur le bouton de copie situé à côté de **Feed Url**.

:::info
L'URL du flux est liée au type de plan, et non à un plan unique. Elle suit automatiquement le plan qui est programmé comme plan en cours pour ce type de plan. Vous n'avez donc besoin de la configurer qu'une seule fois.
:::

## Connexion à SignPresenter

Le flux est conçu pour fonctionner avec [SignPresenter](https://www.signpresenter.com), une application tierce d'affichage numérique. Collez l'URL copiée dans SignPresenter en tant que flux externe pour afficher le contenu de votre leçon en cours sur un écran connecté.

Pour la configuration pas à pas dans SignPresenter, consultez le [guide Lessons.church de SignPresenter](https://support.signpresenter.com/topics/lessons-dot-church.html). La boîte de dialogue contient également un lien vers ces instructions.

## Utiliser plutôt les téléviseurs FreePlay

Si vos écrans utilisent [FreePlay](../../freeplay/), vous n'avez pas besoin de l'URL du flux. La boîte de dialogue **Digital Signage Feed** comporte un lien vers **admin.freeplay.church/calendar**, où vous pouvez programmer ce type de plan sur vos téléviseurs FreePlay :

1. Cliquez sur le lien **admin.freeplay.church/calendar** dans la boîte de dialogue. FreePlay Admin utilise les mêmes identifiants que B1 Admin.
2. Choisissez le groupe d'écrans correspondant à vos téléviseurs et cliquez sur **Add schedule**.
3. Sous **Play**, choisissez votre type de plan dans **Service plans**. Il est marqué **(current plan)**.
4. Définissez les jours et les heures, puis cliquez sur **Save**.

Les téléviseurs diffusent chaque semaine le plan en cours pour ce type de plan, aux heures que vous avez définies. Cela fonctionne également avec les leçons Go Curriculum, y compris les plans que vous avez personnalisés. FreePlay se connecte avec le compte Go Curriculum lié au ministère sous **Content Providers** (voir [Programmer des leçons](./scheduling-lessons.md)), ou avec la connexion Go Curriculum de l'église si le ministère n'en possède pas. Consultez [Programmer le calendrier](../../freeplay/scheduled-mode/scheduling-the-calendar) pour découvrir toutes les options, et [Associer un écran](../../freeplay/scheduled-mode/pairing-a-screen) pour ajouter un téléviseur.

:::note
L'URL du flux n'inclut pas les médias Go Curriculum, car ce contenu nécessite l'identifiant Go Curriculum de votre église. Pour afficher une leçon Go Curriculum sur un téléviseur du hall d'entrée ou d'une salle de classe, utilisez FreePlay.
:::

## Étapes suivantes

- Gérez les plans qui alimentent cet affichage sur la page [Plans](./plans.md)
- Programmez du contenu avec [Lessons.church](./scheduling-lessons.md)
- Placez les téléviseurs FreePlay sur un calendrier avec le [mode programmé](../../freeplay/scheduled-mode/)
