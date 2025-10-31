# Guide de développement - Notre Messe de Mariage

## 🎨 Architecture CSS

### Fichier principal : `styles.css`

Le fichier CSS est organisé en sections claires :

```css
/* 1. Polices locales */
@font-face { ... }

/* 2. Reset et variables CSS */
:root { --color-primary: #FF8100; ... }

/* 3. Styles globaux */
body, h1, h2, h3 { ... }

/* 4. Navigation */
nav { ... }

/* 5. Pages communes */
.page-hero { ... }
.content-section { ... }

/* 6. Composants réutilisables */
.btn-primary { ... }
.feature-card { ... }

/* 7. Styles spécifiques par page */
/* === INDEX === */
.hero { ... }
.trust-badges { ... }

/* === À PROPOS === */
.values-grid { ... }

/* 8. Footer */
footer { ... }

/* 9. Responsive */
@media (max-width: 968px) { ... }
```

### Variables CSS disponibles

```css
--color-primary: #FF8100;      /* Orange */
--color-secondary: #652D90;    /* Violet */
--color-tertiary: #E6DEF6;     /* Violet clair */
--color-last: #61616F;         /* Gris foncé */
--color-bg: #FFFFFF;           /* Blanc */
--light-bg: #F5F5F5;          /* Gris très clair */
--text-dark: #2C2C2C;         /* Texte foncé */
--text-light: #61616F;        /* Texte clair */

/* Ombres */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 20px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.2);

/* Transitions */
--transition-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

## 🏗️ Structure HTML

### Template de base

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO -->
    <title>Titre de la page - Notre Messe de Mariage</title>
    <meta name="description" content="...">
    <meta name="keywords" content="...">
    <link rel="canonical" href="...">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="...">
    <meta property="og:title" content="...">
    <meta property="og:description" content="...">
    
    <!-- Styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar" role="navigation">...</nav>
    
    <!-- Hero/Header -->
    <header class="page-hero">...</header>
    
    <!-- Content -->
    <section class="content-section">...</section>
    
    <!-- Footer -->
    <footer role="contentinfo">...</footer>
    
    <!-- Scripts -->
    <script src="animations.js"></script>
</body>
</html>
```

### Navigation standard

```html
<nav id="navbar" role="navigation" aria-label="Navigation principale">
    <div class="nav-container">
        <a href="index.html" class="logo" aria-label="Notre Messe de Mariage - Accueil">
            <img src="images/logo_avectexte_horizontal.png" 
                 alt="Notre Messe de Mariage - Logo" 
                 width="200" 
                 height="50">
        </a>
        <ul class="nav-links" id="navLinks">
            <li><a href="index.html">Accueil</a></li>
            <li><a href="futurs-maries.html">Futurs Mariés</a></li>
            <li><a href="paroisses.html">Paroisses</a></li>
            <li><a href="musiciens.html">Musiciens</a></li>
            <li><a href="a-propos.html">À propos</a></li>
            <li><a href="https://app.notremessedemariage.fr" class="cta-button">Commencer</a></li>
        </ul>
        <button class="mobile-menu-btn" 
                id="mobileMenuBtn" 
                aria-label="Menu mobile" 
                aria-expanded="false">
            <i class="fas fa-bars" aria-hidden="true"></i>
        </button>
    </div>
</nav>
```

## 🎯 Classes CSS principales

### Boutons

```html
<!-- Bouton primaire -->
<a href="#" class="btn-primary">
    <i class="fas fa-heart"></i> Texte
</a>

<!-- Bouton CTA dans navigation -->
<a href="https://app.notremessedemariage.fr" class="cta-button">Commencer</a>
```

### Sections de contenu

```html
<!-- Section standard -->
<section class="content-section">
    <div class="content-container">
        <h2 class="section-title">Titre</h2>
        <p>Contenu...</p>
    </div>
</section>

<!-- Section alternée (fond gris) -->
<section class="content-section alt">
    ...
</section>
```

### Grilles

```html
<!-- Grille de valeurs (à propos) -->
<div class="values-grid">
    <article class="value-card">...</article>
    <article class="value-card">...</article>
</div>

<!-- Grille de features (index) -->
<div class="features-grid">
    <article class="feature-card">...</article>
    <article class="feature-card">...</article>
</div>
```

### Hero sections

```html
<!-- Page hero (pages internes) -->
<header class="page-hero">
    <div class="page-hero-content">
        <h1>Titre principal</h1>
        <p>Description...</p>
    </div>
</header>

<!-- Hero complet (page index) -->
<header class="hero">
    <div class="hero-background"></div>
    <div class="hero-content">
        <div class="hero-text">...</div>
        <div class="hero-image">...</div>
    </div>
</header>
```

## ♿ Accessibilité

### Attributs ARIA essentiels

```html
<!-- Navigation -->
<nav role="navigation" aria-label="Navigation principale">

<!-- Bouton menu mobile -->
<button aria-label="Menu mobile" aria-expanded="false">

<!-- Page courante -->
<a href="index.html" aria-current="page">Accueil</a>

<!-- Images décoratives -->
<i class="fas fa-heart" aria-hidden="true"></i>

<!-- Footer -->
<footer role="contentinfo">
```

### Images

```html
<!-- Image avec alt descriptif -->
<img src="..." 
     alt="Description précise de l'image" 
     width="300" 
     height="200"
     loading="lazy">

<!-- Logo -->
<img src="images/logo_avectexte_horizontal.png" 
     alt="Notre Messe de Mariage - Logo" 
     width="200" 
     height="50">
```

## 📱 Responsive Design

### Points de rupture

```css
/* Mobile first */
/* Base : < 640px */

/* Tablet : 640px - 968px */
@media (max-width: 968px) {
    /* Tablettes et petits écrans */
}

/* Mobile : < 640px */
@media (max-width: 640px) {
    /* Smartphones */
}
```

### Menu mobile

Le menu mobile est géré par `animations.js` :
- Click sur hamburger → toggle classe `.active`
- Menu en position fixed, hors écran par défaut
- Animation slide-in avec CSS transition

## 🎭 Animations

### Classes d'animation disponibles

```html
<!-- Fade in au scroll -->
<div class="fade-in">...</div>

<!-- Section header avec animation -->
<div class="section-header">...</div>

<!-- Feature cards (animation au scroll) -->
<div class="feature-card">...</div>
```

Les animations sont gérées par :
1. CSS (keyframes dans styles.css)
2. JavaScript (Intersection Observer dans animations.js)

### Animations CSS principales

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(50px, 30px) scale(1.1); }
}
```

## 🔧 JavaScript (animations.js)

### Fonctionnalités principales

1. **Navigation scroll effect** : Ajoute/retire classe `.scrolled`
2. **Menu mobile** : Toggle classe `.active`
3. **Intersection Observer** : Anime les éléments au scroll
4. **Smooth scroll** : Pour les liens d'ancrage

### Éléments observés

```javascript
// Éléments animés au scroll
const fadeInElements = document.querySelectorAll(
    '.feature-card, .content-box, .pricing-card, ' +
    '.feature-list li, .section-title, .section-subtitle'
);
```

## 📦 Assets requis

### Polices

```
fonts/
├── Alfarn-Regular.ttf      (Titres)
└── AvenirLTPro.ttf        (Corps de texte)
```

### Images

```
images/
├── logo_avectexte_horizontal.png   (Logo navigation)
├── favicon.png                      (Favicon)
└── apple-touch-icon.png            (iOS)
```

### CDN externes

- Font Awesome 6.4.0
- Google Fonts (Playfair Display, Montserrat) - optionnel

## 🚀 Déploiement

### Checklist avant déploiement

- [ ] Toutes les images optimisées (< 200 Ko)
- [ ] Logo ajouté dans `/images/`
- [ ] Favicons générés et ajoutés
- [ ] URLs canonical mises à jour avec domaine réel
- [ ] URLs Open Graph avec domaine réel
- [ ] URLs réseaux sociaux mises à jour
- [ ] Test sur tous les navigateurs
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Validation HTML (W3C Validator)
- [ ] Test Google PageSpeed Insights
- [ ] Test données structurées (Google)
- [ ] Vérification erreurs console

### Performance

**Optimisations appliquées :**
- ✅ CSS externe (cache browser)
- ✅ Preconnect CDN
- ✅ Lazy loading images
- ✅ Attributs width/height (évite layout shift)
- ✅ Minification recommandée en production

**À faire en production :**
```bash
# Minifier CSS
npx cssnano styles.css styles.min.css

# Minifier JS
npx terser animations.js -o animations.min.js

# Optimiser images
npx imagemin images/* --out-dir=images-opt
```

## 🐛 Debugging

### Problèmes courants

**Logo ne s'affiche pas :**
```html
<!-- Vérifier le chemin -->
<img src="images/logo_avectexte_horizontal.png" ...>
<!-- Le fichier doit être dans le dossier images/ -->
```

**Polices ne se chargent pas :**
```css
/* Dans styles.css, chemin relatif au CSS */
src: url('./fonts/Alfarn-Regular.ttf') format("truetype");
```

**Menu mobile ne fonctionne pas :**
```html
<!-- Vérifier que animations.js est chargé -->
<script src="animations.js"></script>
<!-- Vérifier les IDs -->
<button id="mobileMenuBtn">...</button>
<ul id="navLinks">...</ul>
```

## 📚 Ressources

- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C HTML Validator](https://validator.w3.org/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Dernière mise à jour :** 31 octobre 2025
