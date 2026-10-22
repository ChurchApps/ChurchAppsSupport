---
title: "Intégrations"
---

# Intégrations {#integrations}

<div class="article-intro">

B1 s'intègre aux outils que votre équipe utilise déjà. Connectez Slack ou Discord pour les notifications du personnel, automatisez vos flux de travail avec Zapier ou Make, ou exportez vos données à la demande vers Google Sheets, sans payer une plateforme d'intégration distincte et sans que ChurchApps héberge quoi que ce soit de plus. Chaque intégration fonctionne sur l'infrastructure propre du tiers et communique avec votre église via les webhooks ou l'API REST de B1.

</div>

## Ce qui est disponible {#whats-available}

| Intégration | Ce qu'elle fait | Sens | Effort de configuration |
|---|---|---|---|
| **[Slack](./slack-discord)** | Publie des notifications lisibles (nouvelles personnes, dons, inscriptions, …) dans un canal Slack | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord)** | Identique, dans un canal Discord | B1 → Discord | 2 minutes |
| **[Zapier](./zapier)** | Utilise les événements B1 comme déclencheurs et les actions B1 dans n'importe laquelle des plus de 7 000 applications de Zapier | Les deux | 5 à 10 min par Zap |
| **[Make](./make)** | Même principe que Zapier, dans le constructeur de scénarios visuel de Make | Les deux | 5 à 10 min par scénario |
| **[Google Sheets](./google-sheets)** | Exporte Personnes / Dons / Groupes / Présence vers une feuille de calcul à la demande | B1 → Feuille | 5 minutes |
| **[Claude](./claude)** | Pose à Claude d'Anthropic des questions sur les données de votre église, dans le cadre de vos autorisations | Les deux | 5 minutes |
| **[ChatGPT](./chatgpt)** | Même principe avec ChatGPT d'OpenAI, via un GPT personnalisé ou des outils OpenAI compatibles MCP | Les deux | 10 minutes |
| **[Services connectés](./services/)** | Recettes prêtes à l'emploi pour Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Variable | 5 à 10 min chacun |

## Comment choisir {#how-to-pick}

- **Vous voulez simplement une notification dans le chat ?** Utilisez **Slack** ou **Discord** : pas de compte tiers, pas de Zap à maintenir. Tout se configure directement dans B1Admin.
- **Vous voulez automatiser quelque chose entre plusieurs applications** (par exemple « quand quelqu'un fait un don, l'ajouter à ma liste Mailchimp et au canal Slack #dons ») ? Utilisez **Zapier** ou **Make**. Zapier est plus convivial ; Make est moins cher à grande échelle et offre une logique plus souple.
- **Besoin d'une extraction ponctuelle de données ou d'un rapport planifié ?** Utilisez **Google Sheets** : collez une clé API dans la barre latérale du module complémentaire et cliquez sur Exporter.
- **Vous voulez poser des questions en langage courant** (« combien de premiers visiteurs dimanche dernier ? », « résume les dons de ce mois ») ? Utilisez **[Claude](./claude)** ou **[ChatGPT](./chatgpt)**. Les deux se connectent à B1 avec une seule clé API, et Claude peut aussi se connecter depuis claude.ai en se connectant à B1.
- **Vous créez votre propre intégration sur mesure ?** Aucune des options ci-dessus : utilisez directement l'[API REST](/docs/developer/api) avec une [clé API](/docs/developer/api/api-keys), ou abonnez un serveur que vous contrôlez aux [webhooks](/docs/developer/api/webhooks).

## Points communs {#what-they-have-in-common}

Chaque intégration s'authentifie avec une **clé API B1**, créée dans B1Admin sous **Paramètres → Développeur → Clés API**. La clé :

- Est liée à une personne précise de votre église et hérite de ses autorisations
- Peut être restreinte à l'aide de **portées** (par exemple, une exportation Google Sheets n'a besoin que de `people:read`, pas de `settings:write`)
- Peut être révoquée à tout moment, ce qui coupe immédiatement l'accès de l'intégration sans affecter le reste

Quelques connecteurs (Zapier, Make) enregistrent aussi un [webhook](/docs/developer/api/webhooks) en votre nom lorsque le Zap ou le scénario est activé, et le suppriment lorsque vous le désactivez. Vous n'avez pas à gérer vous-même l'URL du webhook.

:::tip
Pour que Zapier et Make enregistrent automatiquement les webhooks, la clé API doit disposer de la portée **`settings:write`** (ainsi que des portées de ressources pour ce que touche l'intégration). Une clé en lecture seule fonctionne pour les actions et les exportations, mais pas pour les déclencheurs.
:::

## Coût {#cost}

ChurchApps est gratuit et open source. Slack/Discord, le [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) et les connecteurs officiels Zapier / Make / Google Sheets sont également gratuits de notre côté. Les tiers peuvent facturer leurs propres plateformes (Zapier et Make proposent tous deux des offres gratuites généreuses ; Slack, Discord et Google Sheets sont gratuits pour cet usage).

## Créer votre propre intégration {#building-your-own}

Si aucune des options ci-dessus ne convient, chaque surface de B1 est ouverte :

- **[API REST](/docs/developer/api)** : appelez B1 depuis n'importe quel langage avec un en-tête `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** : abonnez un point de terminaison HTTPS public à un ou plusieurs types d'événements et recevez des charges utiles JSON signées
- **[OAuth + Applications connectées](/docs/developer/api/connected-apps)** : si vous développez un produit SaaS utilisé par de nombreuses églises

## Étapes suivantes {#next-steps}

- [Slack et Discord](./slack-discord) : publier des notifications dans le chat
- [Zapier](./zapier) : se connecter à plus de 7 000 applications
- [Make](./make) : automatisation visuelle des flux de travail
- [Google Sheets](./google-sheets) : exporter vers des feuilles de calcul
- [Claude](./claude) : interroger Claude d'Anthropic sur les données de votre église
- [ChatGPT](./chatgpt) : interroger ChatGPT d'OpenAI sur les données de votre église
- [Services connectés](./services/) : recettes par service (Mailchimp, Donorbox, Clearstream, …)
