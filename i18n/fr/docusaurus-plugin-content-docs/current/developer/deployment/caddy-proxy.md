---
title: "Procuration personnalisée Caddy"
---

# Procuration personnalisée Caddy

<div class="article-intro">

Les domaines d'église personnalisés (mychurch.org → le site web B1 de l'église) se terminent sur une seule boîte EC2 Windows exécutant Caddy. La boîte possède les certificats TLS, résout chaque domaine vers son site {sub}.b1.church et effectue une procuration inverse avec un en-tête Host réécrit. Sa configuration entière se compose de deux fichiers -- un Caddyfile statique et un hosts.map rafraîchi à partir de l'API d'adhésion -- elle survit donc aux redémarrages sans état d'exécution.

</div>

## Composants

| Pièce | Ce que c'est |
|------|------------|
| Instance EC2 | Windows Server; Elastic IP **3.23.251.61** (bâtie dans le DNS d'église dans le monde entier) |
| Caddy personnalisé | Build Caddy personnalisé avec le module de stockage techknowlogick/certmagic-s3 |
| Caddyfile | Configuration de la procuration : TLS à la demande, hôte → amont mapping |
| hosts.map | Une ligne {domaine} {sub}.b1.church par domaine routable |
| Tâche de synchronisation | Tâche programmée (toutes les 5 minutes) qui actualise hosts.map à partir de l'API |
| Service Windows | Wrapper WinSW pour exécuter caddy.exe |
| Seau S3 | Stockage de certificat partagé pour la persistance |
| Rôle IAM | Accès S3 pour l'instance |

## Flux de demande

1. Le navigateur résout le domaine → 3.23.251.61
2. Caddy termine TLS, certificate via S3
3. Le mappage résout l'hôte vers {sub}.b1.church
4. reverse_proxy appelle {sub}.b1.church:443
5. Port 80 gère ACME et redirige vers https

## Gotchas éprouvées sur le terrain

| Problème | Symptôme | Correctif |
|---------|----------|----------|
| Placeholder dans tls_server_name | Tous les domaines font 502 | Utilisez le placeholder natif du transport |
| Clés ou junk lignes en double | Caddy hard-erreurs sur une clé en double | Le script de synchronisation déduplique et nettoie |
| Tâche PowerShell | L'enregistrement échoue silencieusement | Construisez comme CIM au lieu d'XML |

## Opérations

- Journaux : dans C:\caddy\
- Force actualiser le mappage : Démarrer la tâche programmée CaddyHostmapSync
- Modification de configuration : editer Caddyfile, puis valider/recharger
- Instructions DNS pour les églises : apex A 3.23.251.61 ou CNAME proxy.b1.church
