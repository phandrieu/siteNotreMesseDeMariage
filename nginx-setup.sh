#!/bin/bash

# Script d'installation de la configuration Nginx pour notremessedemariage.fr
# Usage: sudo ./nginx-setup.sh

set -e

echo "=== Configuration Nginx pour notremessedemariage.fr ==="
echo ""

# Vérifier si le script est exécuté en tant que root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Ce script doit être exécuté en tant que root (utilisez sudo)"
    exit 1
fi

# Variables
SITE_NAME="notremessedemariage.fr"
SITE_ROOT="/var/www/siteNotreMesseDeMariage"
NGINX_AVAILABLE="/etc/nginx/sites-available/$SITE_NAME"
NGINX_ENABLED="/etc/nginx/sites-enabled/$SITE_NAME"
CONFIG_EXAMPLE="$SITE_ROOT/nginx-config-example.conf"

echo "📋 Vérification de la configuration Nginx actuelle..."

# Vérifier si Nginx est installé
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx n'est pas installé"
    echo "   Installation: sudo apt update && sudo apt install nginx"
    exit 1
fi

echo "✅ Nginx est installé"

# Vérifier si le fichier de configuration existe déjà
if [ -f "$NGINX_AVAILABLE" ]; then
    echo "⚠️  Un fichier de configuration existe déjà : $NGINX_AVAILABLE"
    read -p "   Voulez-vous le sauvegarder et le remplacer ? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp "$NGINX_AVAILABLE" "$NGINX_AVAILABLE.backup.$(date +%Y%m%d_%H%M%S)"
        echo "   ✅ Sauvegarde créée"
    else
        echo "   ❌ Installation annulée"
        exit 1
    fi
fi

# Copier le fichier de configuration
echo "📝 Copie de la configuration..."
cp "$CONFIG_EXAMPLE" "$NGINX_AVAILABLE"
echo "✅ Configuration copiée vers $NGINX_AVAILABLE"

# Créer le lien symbolique si nécessaire
if [ ! -L "$NGINX_ENABLED" ]; then
    echo "🔗 Création du lien symbolique..."
    ln -s "$NGINX_AVAILABLE" "$NGINX_ENABLED"
    echo "✅ Lien symbolique créé"
else
    echo "✅ Le lien symbolique existe déjà"
fi

# Tester la configuration Nginx
echo ""
echo "🧪 Test de la configuration Nginx..."
if nginx -t; then
    echo "✅ Configuration Nginx valide"
    
    # Recharger Nginx
    echo ""
    read -p "Voulez-vous recharger Nginx maintenant ? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        systemctl reload nginx
        echo "✅ Nginx rechargé avec succès"
    else
        echo "⚠️  N'oubliez pas de recharger Nginx : sudo systemctl reload nginx"
    fi
else
    echo "❌ Erreur dans la configuration Nginx"
    echo "   Vérifiez les erreurs ci-dessus"
    exit 1
fi

echo ""
echo "=== Configuration terminée ==="
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Vérifiez que votre DNS pointe vers ce serveur"
echo "   2. Testez l'accès : http://$SITE_NAME"
echo "   3. Pour activer HTTPS, installez Let's Encrypt :"
echo "      sudo apt install certbot python3-certbot-nginx"
echo "      sudo certbot --nginx -d $SITE_NAME -d www.$SITE_NAME"
echo ""
echo "📊 Commandes utiles :"
echo "   - Tester la config : sudo nginx -t"
echo "   - Recharger Nginx  : sudo systemctl reload nginx"
echo "   - Redémarrer Nginx : sudo systemctl restart nginx"
echo "   - Voir les logs    : sudo tail -f /var/log/nginx/error.log"
echo "   - Statut Nginx     : sudo systemctl status nginx"
echo ""
