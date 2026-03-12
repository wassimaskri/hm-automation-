# H&M Test Automation — Playwright + TypeScript + Cucumber

Projet d'automatisation end-to-end réalisé sur le site [www2.hm.com](https://www2.hm.com), 
dans le cadre d'un test technique QA.

---

## Pourquoi ces choix techniques ?

J'ai choisi **Playwright** parce que c'est l'outil que j'utilise au quotidien et qui 
m'a donné les meilleurs résultats sur des sites modernes avec beaucoup de contenu dynamique. 
Contrairement à Selenium, je n'ai pas besoin de gérer les drivers manuellement, 
et l'auto-wait intégré évite beaucoup de flakiness.

Pour la couche BDD, **Cucumber avec Gherkin** permet d'écrire des scénarios lisibles 
par tout le monde — pas seulement les devs. C'est quelque chose que j'apprécie 
particulièrement quand on travaille avec des Product Owners ou des clients qui 
veulent comprendre ce qu'on teste sans lire du code.

**TypeScript** s'est imposé naturellement — le typage fort évite beaucoup d'erreurs 
stupides et rend le code beaucoup plus maintenable sur le long terme.

---

## Structure du projet
```
hm-automation/
├── features/                        # Scénarios Gherkin
│   ├── 01_country_selection.feature
│   ├── 02_registration.feature
│   ├── 03_logout.feature
│   ├── 04_search.feature
│   ├── 05_add_to_cart.feature
│   └── 06_add_to_favourites.feature
│
├── src/
│   ├── hooks/
│   │   ├── world.ts                 # Contexte Playwright partagé
│   │   └── hooks.ts                 # Setup / teardown des scénarios
│   │
│   ├── pages/                       # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── CountrySelectorPage.ts
│   │   ├── LoginPage.ts
│   │   ├── AccountPage.ts
│   │   ├── SearchResultsPage.ts
│   │   ├── ProductDetailPage.ts
│   │   └── CartPage.ts
│   │
│   ├── steps/                       # Step definitions
│   │   ├── common.steps.ts
│   │   ├── country.steps.ts
│   │   ├── registration.steps.ts
│   │   ├── logout.steps.ts
│   │   ├── search.steps.ts
│   │   ├── cart.steps.ts
│   │   └── favourites.steps.ts
│   │
│   └── utils/
│       └── generateReport.js
│
├── browser-profile/                 # Profil Chrome persistant (anti-détection)
├── reports/                         # Rapports générés après exécution
├── cucumber.json
├── tsconfig.json
└── package.json
```

---

## Scénarios automatisés

| # | Scénario | Tag |
|---|---|---|
| 1 | Choix du pays (France / Allemagne) | `@country` |
| 2 | Inscription — accès et remplissage du formulaire | `@registration` |
| 3 | Déconnexion | `@logout` |
| 4 | Recherche : Chemise Relaxed Fit en coton | `@search` |
| 5 | Ajout au panier — taille M | `@cart` |
| 6 | Ajout d'un produit aux favoris | `@wishlist` |

---

## Prérequis

- Node.js >= 18
- Google Chrome installé
- npm >= 9

---

## Installation
```bash
git clone https://github.com/<username>/hm-automation.git
cd hm-automation
npm install
npx playwright install chromium
```

---

## Exécution des tests

### Tous les tests
```bash
npx cucumber-js
```

### Tests critiques uniquement
```bash
npx cucumber-js --tags "@smoke"
```

### Un scénario spécifique
```bash
npx cucumber-js --name "Search for a Relaxed Fit cotton shirt"
```

### Générer le rapport HTML
```bash
npx cucumber-js && node src/utils/generateReport.js
start reports/cucumber-report.html
```

---

## Quelques notes importantes

**Anti-détection** — H&M bloque les navigateurs automatisés en mode headless. 
J'ai contourné ça en utilisant un profil Chrome persistant avec 
`launchPersistentContext` et en désactivant les flags d'automatisation. 
Les tests tournent donc avec Chrome visible, ce qui est aussi plus pratique 
pour débugger.

**Screenshots automatiques** — En cas d'échec, un screenshot est automatiquement 
attaché au rapport HTML. Ça facilite beaucoup le diagnostic sans avoir à relancer 
les tests.

**Organisation des features** — Les fichiers sont numérotés dans l'ordre logique 
du parcours utilisateur : navigation → authentification → recherche → achat. 
C'est plus lisible quand on parcourt le projet pour la première fois.

**Variables d'environnement** — Les credentials de test peuvent être injectés 
via `.env` (voir `.env.example`). Rien de sensible n'est codé en dur.

---

## Rapport d'exécution

Après les tests, ouvrir :
```
reports/cucumber-report.html
```

Le rapport affiche les scénarios passés ✅ et échoués ❌, 
avec les screenshots attachés sur chaque échec.
