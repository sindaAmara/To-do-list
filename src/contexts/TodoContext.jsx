import { createContext, useContext, useState, useEffect } from 'react'
import initialData from '../datas/initialData'
import { useTasks } from '../hooks/useTasks'

export const TodoContext = createContext()

export function TodoProvider({ children }) {

  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem('tasks') || 'null') || []
  )
  const [categories, setCategories] = useState(() =>
    JSON.parse(localStorage.getItem('categories') || 'null') || []
  )
  const [relations, setRelations] = useState(() =>
    JSON.parse(localStorage.getItem('relations') || 'null') || []
  )
  const [started,          setStarted]          = useState(false)
  const [confirmReset,     setConfirmReset]      = useState(false)
  const [selectedDossier,  setSelectedDossier]   = useState(null)
  const [view,             setView]              = useState('tasks')

  useEffect(() => { localStorage.setItem('tasks',      JSON.stringify(tasks))      }, [tasks])
  useEffect(() => { localStorage.setItem('categories', JSON.stringify(categories)) }, [categories])
  useEffect(() => { localStorage.setItem('relations',  JSON.stringify(relations))  }, [relations])

  const filtering = useTasks(tasks, categories, relations)

  const hasData = tasks.length > 0 || categories.length > 0

  // --- CHARGEMENT ---
  function loadBackup() {
    if (hasData) {
      setStarted(true)
    } else {
      setTasks(initialData.tasks)
      setCategories(initialData.categories)
      setRelations(initialData.relations)
      setStarted(true)
    }
  }

  function startBlank() {
    localStorage.removeItem('tasks')
    localStorage.removeItem('categories')
    localStorage.removeItem('relations')
    setTasks([])
    setCategories([])
    setRelations([])
    setStarted(true)
  }

  function handleReset() {
    if (confirmReset) {
      localStorage.removeItem('tasks')
      localStorage.removeItem('categories')
      localStorage.removeItem('relations')
      setTasks([])
      setCategories([])
      setRelations([])
      setConfirmReset(false)
      setStarted(false)
    } else {
      setConfirmReset(true)
    }
  }

  // --- CRUD ---
  function addTask(task)             { setTasks(prev => [...prev, task]) }
  function updateTask(id, changes)   { setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t)) }
  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
    setRelations(prev => prev.filter(r => r.tache !== id))
  }
  function addCategory(cat)          { setCategories(prev => [...prev, cat]) }
  function deleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id))
    setRelations(prev => prev.filter(r => r.categorie !== id))
    if (selectedDossier === id) setSelectedDossier(null)
  }
  function addRelation(relation)     { setRelations(prev => [...prev, relation]) }

  const value = {
    // données
    tasks, categories, relations,
    // état UI
    started, setStarted,
    confirmReset, setConfirmReset,
    selectedDossier, setSelectedDossier,
    view, setView,
    hasData,
    // chargement
    loadBackup, startBlank, handleReset,
    // CRUD
    addTask, updateTask, deleteTask,
    addCategory, deleteCategory, addRelation,
    // filtrage (tout ce que retourne useTasks)
    ...filtering,
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => useContext(TodoContext)