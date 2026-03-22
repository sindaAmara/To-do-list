import { useState } from 'react'
import Modal from '../Modal/Modal'
import TaskForm from '../Modal/TaskForm'
import FolderForm from '../Modal/FolderForm'
import './Footer.css'

export default function Footer({ onAddTask, onAddCategory }) {
  const [modalType, setModalType] = useState(null) // null | 'task' | 'folder'

  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-copy">ToDo List — Projet React</span>
        </div>
        <div className="footer-actions">
          <button
            className="footer-btn footer-btn--secondary"
            onClick={() => setModalType('folder')}
            title="Créer un dossier"
          >
            <span>📁</span> Dossier
          </button>
          <button
            className="footer-btn footer-btn--primary"
            onClick={() => setModalType('task')}
            title="Créer une tâche"
          >
            <span className="footer-plus">+</span> Tâche
          </button>
        </div>
      </footer>

      {modalType === 'task' && (
        <Modal title="Nouvelle tâche" onClose={() => setModalType(null)}>
          <TaskForm
            onSubmit={onAddTask}
            onClose={() => setModalType(null)}
          />
        </Modal>
      )}

      {modalType === 'folder' && (
        <Modal title="Nouveau dossier" onClose={() => setModalType(null)}>
          <FolderForm
            onSubmit={onAddCategory}
            onClose={() => setModalType(null)}
          />
        </Modal>
      )}
    </>
  )
}