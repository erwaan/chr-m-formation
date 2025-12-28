# 🪵 Sections avec Texture Bois

## ✨ Transformation Appliquée

Les sections avec la classe `.section-wood` utilisent maintenant une **vraie texture de bois** au lieu d'une couleur unie.

## 🎨 Caractéristiques

### Image de Fond
```css
.section-wood {
    background-image: url('../images/bois.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;  /* Effet parallaxe */
}
```

### Overlay Assombrissant
Pour garantir la lisibilité du texte blanc sur la texture:
```css
.section-wood::before {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.65);  /* Noir à 65% d'opacité */
    width: 100%;
    height: 100%;
}
```

### Texte en Blanc
Tout le texte dans les sections bois est automatiquement blanc:
- Titres (h2, h3)
- Paragraphes
- Section titles
- Ligne décorative en **or** (var(--color-accent))

## 📊 Sections Concernées

Dans `index.html`, les sections suivantes utilisent `.section-wood`:

1. **Section Présentation** (ligne ~25)
2. **Section Team Building** (ligne ~118)  
3. **Section Contact** (ligne ~193)

## 🎯 Effets Visuels

### Effet Parallaxe
Grâce à `background-attachment: fixed`, l'image reste fixe pendant le scroll, créant un effet de profondeur élégant.

### Contraste Optimal
- **Overlay:** 65% de noir
- **Texte:** Blanc pur
- **Ombres:** Renforcées pour les boutons
- **Ligne déco:** Or (#FFD700)

## 🔧 Personnalisation

### Modifier l'intensité de l'overlay
```css
.section-wood::before {
    background: rgba(0, 0, 0, 0.7);  /* Plus sombre */
    /* ou */
    background: rgba(0, 0, 0, 0.5);  /* Plus clair */
}
```

### Changer l'image
Remplacez `bois.jpg` par une autre texture:
```css
background-image: url('../images/autre-bois.jpg');
```

### Désactiver le parallaxe
```css
background-attachment: scroll;  /* Au lieu de fixed */
```

## 📁 Fichier Image

**Emplacement:** `images/bois.jpg`

**Recommandations:**
- Format: JPG ou WebP
- Dimensions: Au moins 1920px de large
- Poids: Optimisé (< 500Ko si possible)
- Motif: Texture répétable ou assez large

## ✅ Résultat

✅ Texture bois authentique
✅ Texte blanc parfaitement lisible
✅ Effet parallaxe élégant
✅ Cohérence visuelle maintenue
✅ Performance optimisée (background-attachment)

## 🎨 Avant / Après

**AVANT:**
```css
.section-wood {
    background: #893102;  /* Couleur unie marron */
}
```

**APRÈS:**
```css
.section-wood {
    background-image: url('../images/bois.jpg');
    /* + overlay sombre */
    /* + effet parallaxe */
}
```

Le résultat est une section **chaleureuse, texturée et professionnelle** qui met en valeur le contenu! 🌟
