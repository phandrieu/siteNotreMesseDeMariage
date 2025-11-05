# Configuration des URLs sans extension .html

## Configuration effectuée

### 1. Configuration Nginx créée

La configuration Nginx a été créée avec les règles suivantes :

- **Réécriture d'URL** : Les URLs sans extension sont automatiquement réécrites vers les fichiers .html
- **Redirection 301** : Les anciennes URLs avec .html sont redirigées vers les nouvelles URLs sans extension
- **Cache des ressources statiques** : Configuration optimale pour CSS, JS, images
- **Sécurité** : Protection des fichiers cachés et configuration des logs

### 2. Mise à jour des liens internes

Tous les liens internes dans les fichiers HTML ont été mis à jour :

- `index.html` → `/`
- `futurs-maries.html` → `/futurs-maries`
- `paroisses.html` → `/paroisses`
- `musiciens.html` → `/musiciens`
- `a-propos.html` → `/a-propos`
- `contact.html` → `/contact`
- `legal.html` → `/legal`

### 3. Mise à jour du sitemap.xml

Le fichier `sitemap.xml` a été mis à jour pour refléter les nouvelles URLs sans extension.

### 4. Mise à jour des balises SEO

Les balises canoniques et Open Graph ont été mises à jour dans tous les fichiers HTML.

## Installation de la configuration Nginx

Pour installer la configuration Nginx, utilisez le script d'installation :

```bash
sudo ./nginx-setup.sh
```

Ce script va :
1. Copier la configuration vers `/etc/nginx/sites-available/`
2. Créer le lien symbolique dans `/etc/nginx/sites-enabled/`
3. Tester la configuration
4. Recharger Nginx

### Installation manuelle

Si vous préférez installer manuellement :

```bash
# Copier la configuration
sudo cp nginx-config-example.conf /etc/nginx/sites-available/notremessedemariage.fr

# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/notremessedemariage.fr /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

## Test de la configuration

Après déploiement, testez les URLs suivantes :

- ✅ `https://notremessedemariage.fr/` (au lieu de index.html)
- ✅ `https://notremessedemariage.fr/legal` (au lieu de legal.html)
- ✅ `https://notremessedemariage.fr/futurs-maries` (au lieu de futurs-maries.html)
- ✅ `https://notremessedemariage.fr/legal.html` → doit rediriger vers `/legal`
- ✅ `http://notremessedemariage.fr/legal` → doit rediriger vers `https://`

## Vérification de la configuration Nginx

Pour vérifier que Nginx fonctionne correctement :

```bash
# Tester la configuration
sudo nginx -t

# Voir le statut
sudo systemctl status nginx

# Voir les logs en temps réel
sudo tail -f /var/log/nginx/notremessedemariage.fr-error.log
```

## Avantages de cette configuration

1. **URLs plus propres** : `/legal` au lieu de `/legal.html`
2. **SEO optimisé** : Redirections 301 pour préserver le référencement
3. **Sécurité renforcée** : Force HTTPS automatiquement
4. **Compatibilité** : Les anciens liens avec .html continuent de fonctionner
5. **Professionnalisme** : URLs modernes et épurées

## En cas de problème

Si les URLs ne fonctionnent pas :

1. Vérifiez que Nginx est démarré : `sudo systemctl status nginx`
2. Testez la configuration : `sudo nginx -t`
3. Consultez les logs : `sudo tail -f /var/log/nginx/notremessedemariage.fr-error.log`
4. Vérifiez les permissions des fichiers du site
5. Rechargez Nginx : `sudo systemctl reload nginx`

## Configuration HTTPS (optionnel mais recommandé)

Pour activer HTTPS avec Let's Encrypt :

```bash
# Installer Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtenir un certificat SSL
sudo certbot --nginx -d notremessedemariage.fr -d www.notremessedemariage.fr

# Le certificat se renouvelle automatiquement
# Tester le renouvellement
sudo certbot renew --dry-run
```

Après l'installation du certificat, décommentez la section HTTPS dans le fichier de configuration Nginx.

## Fichiers créés/modifiés

- ✅ `nginx-config-example.conf` (créé)
- ✅ `nginx-setup.sh` (créé)
- ✅ `index.html`
- ✅ `futurs-maries.html`
- ✅ `paroisses.html`
- ✅ `musiciens.html`
- ✅ `a-propos.html`
- ✅ `contact.html`
- ✅ `legal.html`
- ✅ `sitemap.xml`
