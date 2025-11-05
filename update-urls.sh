#!/bin/bash

# Script pour mettre à jour tous les liens HTML du site
# Remplace les liens .html par des liens sans extension

echo "Mise à jour des liens internes dans les fichiers HTML..."

# Liste des fichiers HTML à traiter (exclure test-responsive.html)
FILES="index.html futurs-maries.html paroisses.html musiciens.html a-propos.html contact.html legal.html"

for file in $FILES; do
    if [ -f "$file" ]; then
        echo "Traitement de $file..."
        
        # Remplacer les liens href vers des pages HTML (sauf les ancres)
        sed -i 's/href="index\.html"/href="\/"/g' "$file"
        sed -i 's/href="futurs-maries\.html"/href="\/futurs-maries"/g' "$file"
        sed -i 's/href="paroisses\.html"/href="\/paroisses"/g' "$file"
        sed -i 's/href="musiciens\.html"/href="\/musiciens"/g' "$file"
        sed -i 's/href="a-propos\.html"/href="\/a-propos"/g' "$file"
        sed -i 's/href="contact\.html"/href="\/contact"/g' "$file"
        sed -i 's/href="legal\.html#/href="\/legal#/g' "$file"
        sed -i 's/href="legal\.html"/href="\/legal"/g' "$file"
        
        # Mettre à jour les URLs canoniques et Open Graph
        sed -i 's/\/index\.html"/\/"/g' "$file"
        sed -i 's/\/futurs-maries\.html"/\/futurs-maries"/g' "$file"
        sed -i 's/\/paroisses\.html"/\/paroisses"/g' "$file"
        sed -i 's/\/musiciens\.html"/\/musiciens"/g' "$file"
        sed -i 's/\/a-propos\.html"/\/a-propos"/g' "$file"
        sed -i 's/\/contact\.html"/\/contact"/g' "$file"
        sed -i 's/\/legal\.html"/\/legal"/g' "$file"
        
        echo "✓ $file mis à jour"
    fi
done

echo ""
echo "Mise à jour du sitemap.xml..."
if [ -f "sitemap.xml" ]; then
    sed -i 's/<loc>https:\/\/www\.notremessedemariage\.fr\/index\.html<\/loc>/<loc>https:\/\/www.notremessedemariage.fr\/<\/loc>/g' "sitemap.xml"
    sed -i 's/<loc>https:\/\/www\.notremessedemariage\.fr\/futurs-maries\.html<\/loc>/<loc>https:\/\/www.notremessedemariage.fr\/futurs-maries<\/loc>/g' "sitemap.xml"
    sed -i 's/<loc>https:\/\/www\.notremessedemariage\.fr\/paroisses\.html<\/loc>/<loc>https:\/\/www.notremessedemariage.fr\/paroisses<\/loc>/g' "sitemap.xml"
    sed -i 's/<loc>https:\/\/www\.notremessedemariage\.fr\/musiciens\.html<\/loc>/<loc>https:\/\/www.notremessedemariage.fr\/musiciens<\/loc>/g' "sitemap.xml"
    sed -i 's/<loc>https:\/\/www\.notremessedemariage\.fr\/a-propos\.html<\/loc>/<loc>https:\/\/www.notremessedemariage.fr\/a-propos<\/loc>/g' "sitemap.xml"
    sed -i 's/<loc>https:\/\/www\.notremessedemariage\.fr\/contact\.html<\/loc>/<loc>https:\/\/www.notremessedemariage.fr\/contact<\/loc>/g' "sitemap.xml"
    sed -i 's/<loc>https:\/\/www\.notremessedemariage\.fr\/legal\.html<\/loc>/<loc>https:\/\/www.notremessedemariage.fr\/legal<\/loc>/g' "sitemap.xml"
    echo "✓ sitemap.xml mis à jour"
fi

echo ""
echo "✅ Mise à jour terminée!"
echo ""
echo "Notes importantes:"
echo "- Le fichier .htaccess a été créé pour gérer la réécriture d'URL"
echo "- Les anciens liens avec .html seront automatiquement redirigés (301)"
echo "- Assurez-vous que mod_rewrite est activé sur votre serveur Apache"
echo "- Testez votre site après déploiement"
