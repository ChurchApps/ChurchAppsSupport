---
title: "Domaine personnalisé"
---

# Domaine personnalisé

<div class="article-intro">

Vous pouvez pointer votre propre domaine (par exemple, **www.votreglise.org**) vers votre site B1 pour que les visiteurs l'atteignent à l'adresse Web réelle de votre église au lieu de l'adresse par défaut votreglise.1.church.

</div>

## Étape 1 -- Ajouter d'abord l'enregistrement DNS

Avant d'ajouter votre domaine dans B1, vous devez le pointer vers les serveurs de B1 chez votre registraire de domaine (GoDaddy, Namecheap, Cloudflare, etc.).

Ajoutez l'un de ces enregistrements -- CNAME est préféré:

| Type | Host | Valeur |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `votreglise.org` | `3.23.251.61` |

Utilisez le **CNAME** pour votre adresse `www`. Utilisez l'**enregistrement A** si votre registraire ne supporte pas CNAME sur un domaine racine/apex (sans www), ou si vous souhaitez que le domaine racine fonctionne également.

Les modifications DNS peuvent prendre de quelques minutes à quelques heures pour prendre effet.

## Étape 2 -- Ajouter le domaine dans B1

Une fois que DNS pointe vers B1:

1. Allez à **Settings** dans B1 Admin.
2. Cliquez sur **Domains**.
3. Tapez votre domaine dans le champ et cliquez sur **Save**.

B1 gère SSL automatiquement -- aucun achat de certificat nécessaire.

:::warning
Si vous ajoutez le domaine dans B1 avant que vos enregistrements DNS ne soient en place, il ne sera pas enregistré. Configurez toujours DNS en premier.
:::

## Vérification du fonctionnement

Après l'enregistrement, visitez votre domaine dans un navigateur. S'il charge votre site B1, vous avez terminé. Si vous voyez une erreur, DNS se propage peut-être encore -- attendez quelques minutes et réessayez.

Vous pouvez également vérifier la propagation DNS sur [dnschecker.org](https://dnschecker.org) -- recherchez votre domaine et recherchez votre enregistrement CNAME ou A qui s'affiche.
