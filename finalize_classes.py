#!/usr/bin/env python3
"""
Script final pour ajouter les classes CSS manquantes dans tb1.html
"""

import re

def finalize_tb1_classes():
    file_path = r"c:\Users\erwan\Workdir\Site Christophe\tb1.html"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Ajouter heading-blue au h3 de consommation responsable
    content = re.sub(
        r'(<h3)\s+(style="[^"]*">\s*<span[^>]*>🚗</span>\s*Consommation responsable)',
        r'\1 class="heading-blue" \2',
        content
    )
    
    # Ajouter text-blue-dark au paragraphe d'objectif
    content = re.sub(
        r'(<p)\s+(style="[^"]*font-style:\s*italic[^"]*">\s*💡\s*L\'objectif)',
        r'\1 class="text-blue-dark" \2',
        content
    )
    
    # Ajouter heading-green au titre "Matériel inclus"
    content = re.sub(
        r'(<h4)\s+(style="[^"]*">\s*📦\s*Matériel inclus)',
        r'\1 class="heading-green" \2',
        content
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Classes CSS ajoutées!")
    print("- heading-blue pour le titre 'Consommation responsable'")
    print("- text-blue-dark pour le paragraphe d'objectif")
    print("- heading-green pour 'Matériel inclus'")

if __name__ == "__main__":
    finalize_tb1_classes()
