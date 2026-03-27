import { useState } from 'react'
import { useTodo } from '../../contexts/TodoContext'
import TaskCard     from '../TaskCard/TaskCard'
import TaskCardFull from '../TaskCard/TaskCardFull'
import './TaskList.css'

export default function TaskList() {
  const {
    tasksFiltrees,
    categories,
    relations,
    updateTask,
    deleteTask,
    addCategory,
    toggleDossier,
  } = useTodo()

  const [openIds, setOpenIds] = useState([])

  const toggleOpen = (id) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const getCategoriesOfTask = (taskId) => {
    const catIds = relations.filter(r => r.tache === taskId).map(r => r.categorie)
    return categories.filter(c => catIds.includes(c.id))
  }

  if (!tasksFiltrees || tasksFiltrees.length === 0) {
    return (
      <div className="tasklist-empty">
        <span className="tasklist-empty-icon">🎉</span>
        <p>Aucune tâche à afficher</p>
        <p className="tasklist-empty-sub">Modifiez vos filtres ou créez une nouvelle tâche</p>
      </div>
    )
  }

  return (
    <div className="tasklist">
      {tasksFiltrees.map(task => {
        const cats   = getCategoriesOfTask(task.id)
        const isOpen = openIds.includes(task.id)
        return (
          <div key={task.id} className={`tasklist-item ${isOpen ? 'tasklist-item--open' : ''}`}>
            {isOpen ? (
              <TaskCardFull
                task={task}
                categories={cats}
                allCategories={categories}
                onToggle={() => toggleOpen(task.id)}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onAddCategory={addCategory}
                toggleDossier={toggleDossier}
              />
            ) : (
              <TaskCard
                task={task}
                categories={cats}
                onToggle={() => toggleOpen(task.id)}
                toggleDossier={toggleDossier}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}