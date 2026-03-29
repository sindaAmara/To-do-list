# ToDo List — Projet React

Une application de gestion de tâches moderne, responsive et intuitive, développée avec React.

---

## Fonctionnalités

### Gestion des tâches
- **Créer une tâche** avec un titre, une description, une date d'échéance, un état et des équipiers
- **Modifier une tâche** directement depuis la carte, sans changer de page
- **Supprimer une tâche** avec confirmation pour éviter les suppressions accidentelles
- **Visualiser les tâches** en mode réduit (carte compacte) ou en mode détaillé (carte complète)
- **Indicateur de retard** : les tâches dont la date d'échéance est dépassée sont signalées visuellement

### États des tâches
Chaque tâche peut être dans l'un des états suivants :
- 🟣 Nouveau
- 🔵 En cours
- 🟢 Réussi
- 🟡 En attente
- 🔴 Abandonné

### Gestion des dossiers
- **Créer un dossier** avec un titre, une description, une couleur et un pictogramme
- **Associer des tâches à un ou plusieurs dossiers** lors de la création d'une tâche
- **Visualiser les dossiers** sous forme de grille avec un aperçu du nombre de tâches
- **Ouvrir un dossier** pour voir ses tâches dans une vue dédiée style cahier
- **Supprimer un dossier** (les tâches associées ne sont pas supprimées)
- Les dossiers affichent une icône différente selon qu'ils sont vides ou remplis

### Filtres et tri
- **Filtrer par état** : sélectionnez un ou plusieurs états pour afficher uniquement les tâches correspondantes
- **Filtrer par dossier** : affichez uniquement les tâches appartenant à un dossier donné
- **Afficher uniquement les tâches en cours** en un clic
- **Trier les tâches** par date de création, date d'échéance ou titre, dans l'ordre croissant ou décroissant
- Un compteur indique le nombre de résultats correspondant aux filtres actifs

### Équipiers
- Ajoutez plusieurs équipiers à une tâche en les séparant par des virgules
- Les équipiers sont affichés sous forme de badges sur la carte détaillée

### Statistiques visuelles
- Le header affiche le **nombre total de tâches** et le **nombre de tâches non terminées**
- Un **camembert SVG** montre la répartition des tâches par état en temps réel
  
### Persistance des données
- Toutes les données sont sauvegardées automatiquement dans le localStorage du navigateur
- Les tâches, dossiers et associations sont conservés entre les sessions

### Écran de démarrage
- Au lancement, l'application propose de **charger des données de démonstration** (9 tâches pré-remplies) ou de **démarrer de zéro**
- Si des données existent déjà, elles sont automatiquement détectées et chargées
- Une option de réinitialisation complète est disponible avec confirmation

---

## Responsive

L'application est entièrement responsive et s'adapte à toutes les tailles d'écran :

- **Mobile** : les cartes de tâches, la barre de filtres et les formulaires s'affichent en colonne, les boutons sont espacés pour une utilisation tactile confortable
- **Tablette** : la grille de dossiers passe sur deux colonnes, les modales s'adaptent à la largeur disponible
- **Desktop** : affichage optimal avec la grille de dossiers sur plusieurs colonnes et les statistiques du header pleinement visibles

---

## Technologies utilisées

- **React** avec hooks : `useState`, `useEffect`, `useContext`
- **localStorage** pour la persistance des données
- **CSS personnalisé** par composant

---

## Structure du projet

```
src/
├── components/
│   ├── Header/         # Statistiques et camembert
│   ├── FilterBar/      # Filtres et tri
│   ├── TaskList/       # Liste des tâches
│   ├── TaskCard/       # Carte compacte et carte détaillée
│   ├── Footer/         # Boutons d'ajout fonctionnel
│   ├── Modal/          # Modale générique, formulaires tâche et dossier
│   └── DossierPage/    # Vue détaillée d'un dossier style cahier
|
├── App.jsx
├── App.css
├── main.jsx
├── main.css
|    
├── context/
│   └── AppContext.jsx  # Contexte global
├── hooks/
│   └── useTasks.js     # Logique de filtrage et de tri
├── constants/
│   └── enums.js        # États, couleurs, icônes
└── datas/
    └── initialData.js  # Données de démonstration
```

---

## Auteur

Projet réalisé dans le cadre d'un cours React par l'etudiante Sinda Amara
