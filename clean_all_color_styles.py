#!/usr/bin/env python3
"""
Script pour nettoyer TOUS les styles de couleur inline dans tb1.html
et les remplacer par des classes CSS appropriées.
"""

import re

def clean_tb1_styles():
    file_path = r"c:\Users\erwan\Workdir\Site Christophe\tb1.html"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Supprimer toutes les propriétés color dans les attributs style
    content = re.sub(r'color:\s*#[0-9a-fA-F]{3,6};?\s*', '', content)
    content = re.sub(r'color:\s*var\([^)]+\);?\s*', '', content)
    content = re.sub(r'color:\s*white;?\s*', '', content)
    content = re.sub(r'color:\s*[a-z]+;?\s*', '', content, flags=re.IGNORECASE)
    
    # Supprimer les propriétés background avec couleurs
    content = re.sub(r'background:\s*white;?\s*', '', content)
    content = re.sub(r'background:\s*#[0-9a-fA-F]{3,6};?\s*', '', content)
    content = re.sub(r'background:\s*linear-gradient\([^)]+\);?\s*', '', content)
    
    # Nettoyer les attributs style vides ou ne contenant que des espaces/points-virgules
    content = re.sub(r'\s+style="[\s;]*"', '', content)
    content = re.sub(r'\s+style=";\s*"', '', content)
    
    # Nettoyer les doubles espaces
    content = re.sub(r'  +', ' ', content)
    
    # Nettoyer les style="" vides restants
    content = re.sub(r'\s+style=""', '', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Nettoyage terminé!")
    print("Toutes les propriétés de couleur ont été supprimées des attributs style.")
    print("Vous devez maintenant ajouter les classes CSS appropriées manuellement.")

if __name__ == "__main__":
    clean_tb1_styles()
