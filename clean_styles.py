#!/usr/bin/env python3
"""
Script pour nettoyer les styles inline de couleur dans tb1.html
et les remplacer par des classes CSS appropriées.
"""

import re

def clean_tb1_html():
    file_path = r"c:\Users\erwan\Workdir\Site Christophe\tb1.html"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remplacements pour les couleurs inline
    replacements = [
        # Texte sombre sur fond clair
        (r'color:\s*#333;?', ''),
        (r'color:\s*#333333;?', ''),
        (r'color:\s*var\(--color-text-dark\);?', ''),
        
        # Texte clair
        (r'color:\s*#d8d8d8;?', ''),
        (r'color:\s*white;?', ''),
        (r'color:\s*#ffffff;?', ''),
        
        # Couleurs spécifiques qui doivent rester (primaires, etc.)
        # On les laisse pour l'instant
    ]
    
    # Remplacer les divs avec background: black par des classes
    content = re.sub(
        r'<div\s+style="([^"]*?)background:\s*white;([^"]*?)"',
        r'<div class="card-light" style="\1\2"',
        content
    )
    
    # Nettoyer les attributs style vides
    content = re.sub(r'\s+style=""\s*', ' ', content)
    content = re.sub(r'\s+style=";\s*"', ' ', content)
    
    # Appliquer les remplacements de couleur
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)
    
    # Nettoyer les styles qui ne contiennent plus que des espaces/points-virgules
    content = re.sub(r'style="[\s;]*"', '', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Nettoyage terminé!")

if __name__ == "__main__":
    clean_tb1_html()
