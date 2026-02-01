#!/usr/bin/env python3
"""
Script pour mettre à jour un fichier HTML depuis un fichier Markdown.
Usage: python update_html.py formation-hygiene-alimentaire.md hygiene-alimentaire.html
"""

import re
import sys


def parse_markdown(md_content):
    """Parse le fichier Markdown et extrait les sections."""
    data = {
        'metadata': {},
        'objectives': [],
        'objectives_intro': '',
        'modalites': {
            'intro': '',
            'intra': {'title': 'Formation Intra-entreprise', 'content': ''},
            'inter': {'title': 'Formation Inter-entreprise', 'content': ''}
        },
        'programme': [],
        'financements': '',
        'infos': {},
        'cta': {'title': '', 'message': ''}
    }
    
    lines = md_content.split('\n')
    current_section = None
    current_subsection = None
    current_program_item = None
    
    for line in lines:
        line_stripped = line.strip()
        
        # Détection des sections principales
        if line_stripped == '## Métadonnées':
            current_section = 'metadata'
        elif line_stripped == '## Objectifs de la formation':
            current_section = 'objectives'
        elif line_stripped == '## Modalités de formation':
            current_section = 'modalites'
            current_subsection = None
        elif line_stripped == '## Programme de la formation':
            current_section = 'programme'
            if current_program_item:
                data['programme'].append(current_program_item)
                current_program_item = None
        elif line_stripped == '## Financements possibles':
            current_section = 'financements'
            if current_program_item:
                data['programme'].append(current_program_item)
                current_program_item = None
        elif line_stripped == '## Informations pratiques':
            current_section = 'infos'
        elif line_stripped == '## CTA Contact':
            current_section = 'cta'
            current_subsection = None
        
        # Traitement selon la section
        elif current_section == 'metadata':
            match = re.match(r'^-\s+\*\*([^*]+)\*\*:\s+(.+)$', line_stripped)
            if match:
                key = match.group(1).lower().replace(' ', '_').replace('é', 'e')
                data['metadata'][key] = match.group(2)
        
        elif current_section == 'objectives':
            if line_stripped.startswith('- '):
                data['objectives'].append(line_stripped[2:])
            elif line_stripped and not line_stripped.startswith('##'):
                data['objectives_intro'] += line_stripped + ' '
        
        elif current_section == 'modalites':
            if line_stripped.startswith('### Formation Intra-entreprise'):
                current_subsection = 'intra'
            elif line_stripped.startswith('### Formation Inter-entreprise'):
                current_subsection = 'inter'
            elif line_stripped and not line_stripped.startswith('###'):
                if current_subsection:
                    data['modalites'][current_subsection]['content'] += line_stripped + ' '
                else:
                    data['modalites']['intro'] += line_stripped + ' '
        
        elif current_section == 'programme':
            if line_stripped.startswith('### '):
                if current_program_item:
                    data['programme'].append(current_program_item)
                current_program_item = {
                    'title': line_stripped[4:],
                    'content': ''
                }
            elif line_stripped and current_program_item:
                current_program_item['content'] += line_stripped + ' '
        
        elif current_section == 'financements':
            if line_stripped and not line_stripped.startswith('##'):
                data['financements'] += line_stripped + ' '
        
        elif current_section == 'infos':
            match = re.match(r'^-\s+\*\*([^*]+)\*\*:\s+(.+)$', line_stripped)
            if match:
                key = match.group(1).lower().replace(' ', '_').replace('é', 'e')
                data['infos'][key] = match.group(2)
        
        elif current_section == 'cta':
            if line_stripped == '### Titre':
                current_subsection = 'title'
            elif line_stripped == '### Message':
                current_subsection = 'message'
            elif line_stripped and not line_stripped.startswith('###'):
                if current_subsection == 'title':
                    data['cta']['title'] += line_stripped + ' '
                elif current_subsection == 'message':
                    data['cta']['message'] += line_stripped + ' '
    
    # Ajouter le dernier item du programme
    if current_program_item:
        data['programme'].append(current_program_item)
    
    # Nettoyer les espaces
    for key in data:
        if isinstance(data[key], str):
            data[key] = data[key].strip()
    
    data['objectives_intro'] = data['objectives_intro'].strip()
    data['modalites']['intro'] = data['modalites']['intro'].strip()
    data['modalites']['intra']['content'] = data['modalites']['intra']['content'].strip()
    data['modalites']['inter']['content'] = data['modalites']['inter']['content'].strip()
    data['financements'] = data['financements'].strip()
    data['cta']['title'] = data['cta']['title'].strip()
    data['cta']['message'] = data['cta']['message'].strip()
    
    for item in data['programme']:
        item['content'] = item['content'].strip()
    
    return data


def update_html(html_content, md_data):
    """Met à jour le contenu HTML avec les données du Markdown."""
    
    # Métadonnées - Titre
    if 'titre' in md_data['metadata']:
        html_content = re.sub(
            r'(<h1>)[^<]+(</h1>)',
            r'\1' + md_data['metadata']['titre'] + r'\2',
            html_content
        )
    
    # Métadonnées - Sous-titre
    if 'sous-titre' in md_data['metadata']:
        html_content = re.sub(
            r'(<p class="formation-subtitle">)[^<]+(</p>)',
            r'\1' + md_data['metadata']['sous-titre'] + r'\2',
            html_content
        )
    
    # Métadonnées - Description
    if 'description' in md_data['metadata']:
        html_content = re.sub(
            r'(<p class="formation-description">)[^<]+(</p>)',
            r'\1' + md_data['metadata']['description'] + r'\2',
            html_content
        )
    
    # Objectifs - Liste
    if md_data['objectives']:
        objectives_html = '\n'.join([f'                            <li>{obj}</li>' for obj in md_data['objectives']])
        html_content = re.sub(
            r'(<ul class="objectives-list">)[\s\S]*?(</ul>)',
            r'\1\n' + objectives_html + '\n                        \2',
            html_content
        )
    
    # Modalités - Intro
    if md_data['modalites']['intro']:
        html_content = re.sub(
            r'(<h2>Modalités de formation</h2>\s+<p class="intro-text">)[^<]+(</p>)',
            r'\1' + md_data['modalites']['intro'] + r'\2',
            html_content
        )
    
    # Modalités - Intra
    if md_data['modalites']['intra']['content']:
        html_content = re.sub(
            r'(<div class="option-card">\s+<h3>Formation Intra-entreprise</h3>\s+<p>)[^<]+(</p>)',
            r'\1' + md_data['modalites']['intra']['content'] + r'\2',
            html_content
        )
    
    # Modalités - Inter
    if md_data['modalites']['inter']['content']:
        html_content = re.sub(
            r'(<div class="option-card">\s+<h3>Formation Inter-entreprise</h3>\s+<p>)[^<]+(</p>)',
            r'\1' + md_data['modalites']['inter']['content'] + r'\2',
            html_content
        )
    
    # Programme - Chaque accordéon
    for index, item in enumerate(md_data['programme'], start=1):
        pattern = re.compile(
            rf'(<!-- Accordéon {index} -->\s+<div class="accordion-item">\s+<div class="accordion-header">\s+<h3>)[^<]+(</h3>[\s\S]*?<div class="accordion-content">\s+<p>)[^<]+(</p>)',
            re.MULTILINE
        )
        html_content = pattern.sub(
            r'\1' + item['title'] + r'\2' + item['content'] + r'\3',
            html_content
        )
    
    # Financements
    if md_data['financements']:
        html_content = re.sub(
            r'(<h3>Financements possibles</h3>\s+<div class="info-item">\s+)[^\n<]+',
            r'\1' + md_data['financements'],
            html_content
        )
    
    # Informations pratiques
    info_mapping = {
        'duree': 'Durée',
        'public_concerne': 'Public concerné',
        'prerequis': 'Prérequis',
        'tarif': 'Tarif',
        'lieu': 'Lieu'
    }
    
    for key, label in info_mapping.items():
        if key in md_data['infos']:
            pattern = re.compile(
                rf'(<span class="info-label">{re.escape(label)}</span>\s+<span class="info-value">)[^<]+(</span>)'
            )
            html_content = pattern.sub(
                r'\1' + md_data['infos'][key] + r'\2',
                html_content
            )
    
    # CTA - Titre
    if md_data['cta']['title']:
        html_content = re.sub(
            r'(<div class="cta-card">\s+<h3>)[^<]+(</h3>)',
            r'\1' + md_data['cta']['title'] + r'\2',
            html_content
        )
    
    # CTA - Message
    if md_data['cta']['message']:
        html_content = re.sub(
            r'(<div class="cta-card">[\s\S]*?<h3>.*?</h3>\s+<p>)[^<]+(</p>)',
            r'\1' + md_data['cta']['message'] + r'\2',
            html_content
        )
    
    return html_content


def main():
    if len(sys.argv) != 3:
        print("Usage: python update_html.py <fichier.md> <fichier.html>")
        sys.exit(1)
    
    md_file = sys.argv[1]
    html_file = sys.argv[2]
    
    # Lire le Markdown
    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()
    except FileNotFoundError:
        print(f"Erreur: Le fichier {md_file} n'existe pas")
        sys.exit(1)
    
    # Lire le HTML
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"Erreur: Le fichier {html_file} n'existe pas")
        sys.exit(1)
    
    # Parser et mettre à jour
    print("Parsing du Markdown...")
    md_data = parse_markdown(md_content)
    
    print("Mise à jour du HTML...")
    updated_html = update_html(html_content, md_data)
    
    # Écrire le résultat
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(updated_html)
    
    print(f"✅ Fichier {html_file} mis à jour avec succès!")


if __name__ == '__main__':
    main()
