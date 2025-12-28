# 🎨 Nouvelle Structure des Cartes de Formation

## ✨ Transformation Réalisée

Les cartes de formation ont été complètement redessinées pour utiliser une **image de fond avec texte superposé**.

### Avant (Ancienne Structure)
```html
<div class="formation-card">
    <div class="formation-icon-img">
        <img src="images/f1.jpg" alt="Formation">
    </div>
    <h3>Titre Formation</h3>
    <p>Description</p>
    <a href="#" class="btn">En savoir plus</a>
</div>
```

### Après (Nouvelle Structure)
```html
<div class="formation-card fade-in-card">
    <div class="formation-bg" style="background-image: url('images/f1.jpg');"></div>
    <div class="formation-content">
        <h3>Titre Formation</h3>
        <p>Description</p>
        <a href="#" class="btn btn-secondary">En savoir plus</a>
    </div>
</div>
```

## 🎯 Caractéristiques

### Structure
- **`.formation-card`** - Conteneur principal (400px de hauteur, carrée)
- **`.formation-bg`** - Image de fond en plein écran avec effet zoom au hover
- **`.formation-content`** - Contenu positionné en bas de la carte

### Effets Visuels
1. **Image de fond** - Cover complet de la carte
2. **Overlay dégradé** - Du transparent au noir pour lisibilité du texte
3. **Zoom image** - L'image grossit de 10% au survol (`scale(1.1)`)
4. **Overlay coloré au hover** - Teinte marron/bois au survol
5. **Bouton qui apparaît** - Animation de fondu et glissement
6. **Élévation de carte** - La carte se soulève de 10px au hover

### Texte
- **Blanc** sur fond sombre pour contraste maximal
- **Ombres portées** pour garantir la lisibilité
- **Police plus grande** (h3 à 1.5rem)

## 🎨 CSS Clés

```css
.formation-card {
    height: 400px;        /* Carte carrée/rectangulaire */
    position: relative;   /* Pour positionner les enfants */
    overflow: hidden;     /* Pour effet zoom contenu */
}

.formation-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}

.formation-bg::after {
    /* Overlay dégradé noir */
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.7) 100%
    );
}

.formation-content {
    position: relative;
    z-index: 2;           /* Au-dessus de l'image */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;  /* Texte en bas */
    padding: 30px;
}
```

## 🔄 Images Utilisées

Actuellement, **toutes les cartes utilisent `images/f1.jpg`** pour les tests.

### À Remplacer
Pour personnaliser chaque carte, modifiez le `background-image`:
```html
<div class="formation-bg" style="background-image: url('images/f2.jpg');"></div>
```

### Images Recommandées
- **Format:** JPG ou WebP
- **Dimensions minimales:** 600x400px
- **Rapport:** 3:2 ou 16:9
- **Qualité:** Bonne résolution, sujets identifiables
- **Contenu:** Éviter texte sur l'image (overlay + texte = surcharge)

## 💡 Possibilités d'Extension

### Ajouter une Description Détaillée au Hover
```html
<div class=\"formation-content\">
    <h3>Titre</h3>
    <p>Description courte</p>
    <div class="formation-details">
        <p>Description détaillée qui apparaît au survol</p>
    </div>
    <a href="#" class="btn">En savoir plus</a>
</div>
```

### Variantes de Taille
```css
.formation-card.large {
    height: 500px;
}

.formation-card.compact {
    height: 300px;
}
```

## ✅ État Actuel

✅ 7 cartes transformées (6 formations + 1 team building)
✅ Hover effects fonctionnels
✅ Responsive design maintenu
✅ Animations au scroll conservées
✅ Structure HTML propre
