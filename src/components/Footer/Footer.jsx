import { useState } from 'react'
import { useTodo } from '../../contexts/TodoContext'
import Modal      from '../Modal/Modal'
import TaskForm   from '../Modal/TaskForm'
import FolderForm from '../Modal/FolderForm'
import './Footer.css'

export default function Footer() {
  const { addTask, addCategory, categories, addRelation } = useTodo()
  const [modalType, setModalType] = useState(null)

  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-copy">ToDo List — Projet React</span>
        </div>
        <div className="footer-actions">
          <button className="footer-btn footer-btn--secondary" onClick={() => setModalType('folder')}>
            <span>📁</span> Dossier
          </button>
          <button className="footer-btn footer-btn--primary" onClick={() => setModalType('task')}>
            <span className="footer-plus">+</span> Tâche
          </button>
        </div>
      </footer>

      {modalType === 'task' && (
        <Modal title="Nouvelle tâche" onClose={() => setModalType(null)}>
          <TaskForm
            onSubmit={addTask}
            onClose={() => setModalType(null)}
            categories={categories}
            onAddRelation={addRelation}
          />
        </Modal>
      )}

      {modalType === 'folder' && (
        <Modal title="Nouveau dossier" onClose={() => setModalType(null)}>
          <FolderForm
            onSubmit={addCategory}
            onClose={() => setModalType(null)}
          />
        </Modal>
      )}
    </>
  )
}