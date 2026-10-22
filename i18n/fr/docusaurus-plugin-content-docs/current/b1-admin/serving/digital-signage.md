---
title: "Affichage numérique"
---

# Affichage numérique {#digital-signage}

<div class="article-intro">

Envoyez le contenu de vos leçons vers une télévision du hall ou du couloir à l'aide d'un flux d'affichage numérique. Chaque type de planification dispose d'une URL de flux qui affiche toujours le contenu de la planification en cours : rien à mettre à jour d'une semaine à l'autre. Si vos téléviseurs utilisent FreePlay, vous pouvez plutôt y programmer le type de planification dans FreePlay Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez un [type de planification](./plans.md) avec [Lessons.church](../../b1-church/content/lessons.md) ou d'autres contenus de leçons programmés
- Disposez d'un compte [SignPresenter](https://www.signpresenter.com) et d'un appareil configuré pour l'afficher, ou d'une télévision exécutant [FreePlay](../../freeplay/)

</div>

## Obtenir l'URL du flux {#getting-the-feed-url}

1. Allez dans **Service**, sélectionnez le ministère contenant votre type de planification et cliquez sur ce type de planification pour l'ouvrir.
2. Cliquez sur **Affichage numérique** (l'icône de téléviseur) en haut de la page du type de planification.
3. Dans la boîte de dialogue **Flux d'affichage numérique**, cliquez sur le bouton de copie à côté de **URL du flux**.

:::info
L'URL du flux est liée au type de planification, et non à une planification unique. Elle suit automatiquement la planification définie comme actuelle pour ce type, vous n'avez donc à la configurer qu'une seule fois.
:::

## Connexion à SignPresenter {#connecting-to-signpresenter}

Le flux est conçu pour fonctionner avec [SignPresenter](https://www.signpresenter.com), une application d'affichage numérique tierce. Collez l'URL copiée dans SignPresenter en tant que flux externe pour afficher le contenu de vos leçons en cours sur un écran connecté.

Pour la configuration pas à pas dans SignPresenter, consultez le [guide Lessons.church de SignPresenter](https://support.signpresenter.com/topics/lessons-dot-church.html). La boîte de dialogue contient également un lien vers ces instructions.

## Utiliser plutôt des téléviseurs FreePlay {#using-freeplay-tvs-instead}

Si vos écrans utilisent [FreePlay](../../freeplay/), vous n'avez pas besoin de l'URL du flux. La boîte de dialogue **Flux d'affichage numérique** renvoie vers **admin.freeplay.church/calendar**, où vous pouvez programmer ce type de planification sur vos téléviseurs FreePlay :

1. Cliquez sur le lien **admin.freeplay.church/calendar** dans la boîte de dialogue. FreePlay Admin utilise les mêmes identifiants que B1 Admin.
2. Choisissez le groupe d'écrans de vos téléviseurs et cliquez sur **Ajouter une programmation**.
3. Sous **Lecture**, choisissez votre type de planification dans **Plans de service**. Il est marqué **(planification actuelle)**.
4. Définissez les jours et les heures, puis cliquez sur **Enregistrer**.

Les téléviseurs diffusent chaque semaine la planification actuelle de ce type, aux heures que vous avez définies. Cela fonctionne aussi avec les leçons Go Curriculum, y compris les planifications que vous avez personnalisées. FreePlay se connecte avec le compte Go Curriculum lié au ministère sous **Fournisseurs de contenu** (voir [Planifier les leçons](./scheduling-lessons.md)), ou avec la connexion Go Curriculum de l'église si le ministère n'en a pas. Consultez [Planifier le calendrier](../../freeplay/scheduled-mode/scheduling-the-calendar) pour toutes les options, et [Associer un écran](../../freeplay/scheduled-mode/pairing-a-screen) pour ajouter un téléviseur.

:::note
L'URL du flux n'inclut pas les médias Go Curriculum, car ce contenu nécessite l'identifiant Go Curriculum de votre église. Pour afficher une leçon Go Curriculum sur un téléviseur de hall ou de salle de classe, utilisez FreePlay.
:::

## Étapes suivantes {#next-steps}

- Gérez les planifications qui alimentent cet affichage sur la page [Plans de service](./plans.md)
- Programmez le contenu avec [Lessons.church](./scheduling-lessons.md)
- Placez les téléviseurs FreePlay sur un calendrier avec le [mode programmé](../../freeplay/scheduled-mode/)
