import { useState, useEffect } from 'react'
import initialData from './datas/initialData'
import { COULEURS } from './constants/enums'
import { useTasks } from './hooks/useTasks'
import Header from './components/Header/Header'
import FilterBar from './components/FilterBar/FilterBar'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'
import DossierPage from './components/DossierPage/DossierPage'
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [relations, setRelations] = useState([])
  const [view, setView] = useState('tasks')
  const [selectedDossier, setSelectedDossier] = useState(null)

  const {
    tasksFiltrees, filtreEtats, filtreDossiers, filtreEnCours,
    tri, triDesc, toggleEtat, toggleDossier, toggleEnCours, setTriOption,
  } = useTasks(tasks, categories, relations)

  const loadBackup = () => {
    setTasks(initialData.tasks)
    setCategories(initialData.categories)
    setRelations(initialData.relations)
    setStarted(true)
  }

  const startBlank = () => {
    setTasks([])
    setCategories([])
    setRelations([])
    setStarted(true)
  }

  const handleReset = () => {
    if (confirmReset) { startBlank(); setConfirmReset(false) }
    else setConfirmReset(true)
  }

  const addTask = (task) => setTasks(prev => [...prev, task])
  const updateTask = (id, changes) => setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t))
  const addCategory = (cat) => setCategories(prev => [...prev, cat])

  if (!started) {
    return (
      <div className="startup-overlay">
        <div className="startup-card">
          <div className="startup-logo-wrap">
            <img src="/src/logo-to-do-list.png" alt="ToDo List" className="startup-logo" />
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✦</span>
            <span className="sparkle sparkle-3">✦</span>
            <span className="sparkle sparkle-4">✦</span>
          </div>
          <p className="startup-sub">
            Bienvenue ! Souhaitez-vous charger les données de sauvegarde ou démarrer de zéro ?
          </p>
          <div className="startup-actions">
            <button className="startup-btn startup-btn--primary" onClick={loadBackup}>📂 Charger le backup (9 tâches)</button>
            <button className="startup-btn startup-btn--ghost" onClick={startBlank}>✨ Démarrer de zéro</button>
            {confirmReset
              ? <button className="startup-btn startup-btn--danger" onClick={handleReset}>⚠ Confirmer le reset ?</button>
              : <button className="startup-btn startup-btn--danger" onClick={handleReset}>🗑 Réinitialiser</button>
            }
          </div>
        </div>
      </div>
    )
  }

  // Vue détail d'un dossier
  if (selectedDossier) {
    const cat = categories.find(c => c.id === selectedDossier)
    const taskIds = relations.filter(r => r.categorie === selectedDossier).map(r => r.tache)
    const dossierTasks = tasks.filter(t => taskIds.includes(t.id))
    return (
      <div className="app">
        <Header tasks={tasks} />
        <DossierPage
          category={cat}
          tasks={dossierTasks}
          onBack={() => setSelectedDossier(null)}
          onUpdateTask={updateTask}
        />
        <Footer onAddTask={addTask} onAddCategory={addCategory} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header tasks={tasks} />

      <div className="view-toggle">
        <button className={`view-toggle-btn ${view === 'tasks' ? 'view-toggle-btn--active' : ''}`} onClick={() => setView('tasks')}>
          ✓ Tâches
        </button>
        <button className={`view-toggle-btn ${view === 'folders' ? 'view-toggle-btn--active' : ''}`} onClick={() => setView('folders')}>
          📁 Dossiers
        </button>
      </div>

      <main className="app-main">
        {view === 'tasks' ? (
          <>
            <FilterBar
              categories={categories} filtreEtats={filtreEtats} filtreDossiers={filtreDossiers}
              filtreEnCours={filtreEnCours} tri={tri} triDesc={triDesc}
              toggleEtat={toggleEtat} toggleDossier={toggleDossier} toggleEnCours={toggleEnCours}
              setTriOption={setTriOption} nbResultats={tasksFiltrees.length}
            />
            <TaskList
              tasks={tasksFiltrees} categories={categories} relations={relations}
              onUpdateTask={updateTask} onAddCategory={addCategory} toggleDossier={toggleDossier}
            />
          </>
        ) : (
          <div>
            {categories.length === 0 ? (
              <p className="dossiers-empty">Aucun dossier. Créez-en un via le bouton « Dossier » en bas.</p>
            ) : (
              <div className="dossiers-grid">
                {categories.map(cat => {
                  const hex = COULEURS[cat.color] || '#888'
                  const nbTaches = relations.filter(r => r.categorie === cat.id).length
                  const isFull = nbTaches > 0
                  return (
                    <div
                      key={cat.id}
                      className="dossier-card"
                      style={{ borderColor: hex }}
                      onClick={() => setSelectedDossier(cat.id)}
                    >
                      <img
                        src={isFull ? '/src/full-folder.png' : '/src/empty-folder.png'}
                        alt={isFull ? 'Dossier plein' : 'Dossier vide'}
                        className="dossier-icon"
                      />
                      <div className="dossier-card-title" style={{ color: hex }}>
                        {cat.icon ? <span style={{ marginRight: '0.3rem' }}>{cat.icon}</span> : null}
                        {cat.title}
                      </div>
                      {cat.description && <p className="dossier-card-desc">{cat.description}</p>}
                      <p className="dossier-card-count">{nbTaches} tâche{nbTaches !== 1 ? 's' : ''}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer onAddTask={addTask} onAddCategory={addCategory} />
    </div>
  )
}