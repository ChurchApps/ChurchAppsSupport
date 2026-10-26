---
title: "Domaine personnalisé"
---

# Domaine personnalisé

<div class="article-intro">

Vous pouvez faire pointer votre propre domaine (par exemple, **`www.votreeglise.org`**) vers votre site B1 afin que les visiteurs accèdent à l'adresse Web réelle de votre église au lieu de l'adresse par défaut votreeglise.b1.church.

</div>

## Étape 1 — Ajouter d'abord l'enregistrement DNS

Avant d'ajouter votre domaine dans B1, vous devez le faire pointer vers les serveurs de B1 auprès de votre bureau d'enregistrement de domaines (GoDaddy, Namecheap, Cloudflare, etc.).

Ajoutez l'un de ces enregistrements — le CNAME est préférable :

| Type | Hôte | Valeur |
|------|------|--------|
| CNAME | `www` | `proxy.b1.church` |
| A | `votreeglise.org` | `3.23.251.61` |

Utilisez le **CNAME** pour votre adresse `www`. Utilisez l'enregistrement **A** si votre bureau d'enregistrement ne prend pas en charge le CNAME sur un domaine racine (sans www), ou si vous souhaitez aussi que le domaine racine fonctionne.

Les modifications DNS peuvent prendre de quelques minutes à quelques heures pour prendre effet.

## Étape 2 — Ajouter le domaine dans B1

Une fois que le DNS pointe vers B1 :

1. Allez dans **Paramètres** dans B1 Admin.
2. Cliquez sur **Domaines** dans la liste à gauche, puis cliquez sur **Modifier** dans la section **Domaines**.
3. Saisissez votre domaine dans le champ et cliquez sur **Enregistrer**.

Vous n'avez pas besoin de cliquer d'abord sur le bouton **+** -- un domaine laissé dans le champ est ajouté lors de l'enregistrement. Utilisez **+** (ou appuyez sur **Entrée**) lorsque vous voulez ajouter plusieurs domaines à la liste avant d'enregistrer.

B1 gère le SSL automatiquement — aucun certificat à acheter.

:::warning
Si vous ajoutez le domaine dans B1 avant que vos enregistrements DNS soient en place, il ne sera pas enregistré. Configurez toujours le DNS en premier.
:::

## Vérifier que tout fonctionne

Après l'enregistrement, ouvrez votre domaine dans un navigateur. Si votre site B1 s'affiche, c'est terminé. Si vous voyez une erreur, la propagation DNS n'est peut-être pas terminée — attendez quelques minutes et réessayez.

Vous pouvez aussi vérifier la propagation DNS sur [dnschecker.org](https://dnschecker.org) — recherchez votre domaine et vérifiez que votre enregistrement CNAME ou A apparaît.
