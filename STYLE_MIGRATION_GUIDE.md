# Guide de Migration des Styles Inline vers CSS

Ce document explique comment remplacer les styles inline dans tb1.html par les classes CSS définies.

## Classes Principales

### Cartes de Contenu
- `.card-light` : Carte blanche avec texte sombre (remplace `background: white; color: #333`)
- `.bg-warm` : Fond chaud (#fff9f0)
- `.bg-info` : Fond bleu clair (#e3f2fd)
- `.bg-warning` : Fond orange clair (#fff3e0)
- `.bg-success` : Fond vert clair (#e8f5e9)
- `.bg-gray-light` : Fond gris clair (#f5f5f5)

### Texte
- `.text-dark` : Texte sombre (#333)
- `.text-light` : Texte clair (#d8d8d8)
- `.text-primary` : Couleur primaire (marron)
- `.text-accent` : Couleur accent (or)
- `.text-white` : Blanc

### Timeline (Programme)
- `.timeline-step-badge` + `.timeline-step-badge-1` à `.timeline-step-badge-5`
- `.timeline-content`
- `.timeline-title`
- `.timeline-list`

### Cartes de Bénéfices
- `.benefit-card` + `.benefit-card-primary/accent/secondary/special`
- `.benefit-icon`
- `.benefit-title`
- `.benefit-text`

### Cartes d'Options
- `.option-card-light` + `.option-card-primary/accent/secondary/purple`
- `.option-title`
- `.option-list`

### Témoignages
- `.testimonial-card` + `.testimonial-card-primary/secondary/accent`
- `.testimonial-stars`
- `.testimonial-text`
- `.testimonial-author`
- `.testimonial-avatar` + `.testimonial-avatar-primary/secondary/accent`
- `.testimonial-name`
- `.testimonial-role`

### FAQ
- `.faq-item`
- `.faq-question`
- `.faq-answer`

### Info Boxes
- `.info-box-dark` : Fond sombre (#101010)
- `.info-box-warning` : Fond orange clair
- `.info-box-success` : Fond vert clair

### CTA Cards (Sidebar)
- `.cta-card-warm`
- `.cta-card-success`
- `.cta-card-accent`
- `.cta-title-dark`
- `.cta-text-dark`

### Titres Spéciaux
- `.heading-blue` : Titre bleu (#1976D2)
- `.heading-green` : Titre vert (#2e7d32)
- `.text-blue-dark` : Texte bleu foncé (#0d47a1)

### Matériel
- `.material-list`
- `.material-item`
- `.material-icon`

## Exemples de Remplacement

### Avant:
```html
<div style="padding: 24px; background: white; color: #333; border-radius: 12px; box-shadow: var(--shadow-sm); border-top: 3px solid var(--color-primary);">
```

### Après:
```html
<div class="card-light" style="border-top: 3px solid var(--color-primary);">
```

### Avant:
```html
<h4 style="color: var(--color-primary); margin-top: 0;">Titre</h4>
```

### Après:
```html
<h4 class="text-primary" style="margin-top: 0;">Titre</h4>
```

### Avant:
```html
<p style="margin: 0; color: #333;">Texte</p>
```

### Après:
```html
<p style="margin: 0;">Texte</p>
```

## Note
Toutes les propriétés de couleur doivent être gérées par les classes CSS.
Les styles inline ne doivent contenir QUE des propriétés de mise en page (margin, padding, display, flex, grid, etc.)
