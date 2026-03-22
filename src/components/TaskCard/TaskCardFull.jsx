import { useState } from 'react'
import { COULEURS, ETATS } from '../../constants/enums'
import './TaskCard.css'

const ETAT_COLORS = {
  'Nouveau': '#6366F1',
  'En cours': '#38BDF8',
  'Réussi': '#22C55E',
  'En attente': '#EAB308',
  'Abandonné': '#EF4444',
}

function formatDate(str) {
  if (!str) return ''
  const d = new Date(str)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function toInputDate(str) {
  if (!str) return ''
  const d = new Date(str)
  return d.toISOString().split('T')[0]
}

function isOverdue(str) {
  if (!str) return false
  return new Date(str) < new Date()
}

export default function TaskCardFull({ task, categories, allCategories, onToggle, onUpdateTask, toggleDossier }) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)
  const [editDate, setEditDate] = useState(toInputDate(task.date_echeance))
  const [editEtat, setEditEtat] = useState(task.etat)

  const etatColor = ETAT_COLORS[task.etat] || '#888'
  const overdue = isOverdue(task.date_echeance)

  const handleSave = () => {
    if (editTitle.trim().length < 5) return alert('Le titre doit faire au moins 5 caractères.')
    if (!editDate) return alert('La date d\'échéance est obligatoire.')
    onUpdateTask(task.id, {
      title: editTitle.trim(),
      description: editDesc,
      date_echeance: editDate,
      etat: editEtat,
    })
    setEditing(false)
  }

  return (
    <div className="taskcard taskcard--full">
      <div className="taskcard-stripe" style={{ background: etatColor }} />
      <div className="taskcard-body">
        {editing ? (
          <div className="taskcard-edit">
            <div className="taskcard-edit-row">
              <label>Titre</label>
              <input
                className="taskcard-input"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                minLength={5}
              />
            </div>
            <div className="taskcard-edit-row">
              <label>Description</label>
              <textarea
                className="taskcard-input taskcard-textarea"
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
                rows={3}
              />
            </div>
            <div className="taskcard-edit-row">
              <label>Échéance</label>
              <input
                type="date"
                className="taskcard-input"
                value={editDate}
                onChange={e => setEditDate(e.target.value)}
              />
            </div>
            <div className="taskcard-edit-row">
              <label>État</label>
              <select className="taskcard-input" value={editEtat} onChange={e => setEditEtat(e.target.value)}>
                {Object.values(ETATS).map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="taskcard-edit-actions">
              <button className="btn btn--primary" onClick={handleSave}>Enregistrer</button>
              <button className="btn btn--ghost" onClick={() => setEditing(false)}>Annuler</button>
            </div>
          </div>
        ) : (
          <>
            <div className="taskcard-top">
              <div className="taskcard-info">
                <span className="taskcard-title">{task.title}</span>
                <div className="taskcard-meta">
                  <span className={`taskcard-date ${overdue ? 'taskcard-date--overdue' : ''}`}>
                    {overdue ? '⚠ ' : '📅 '}
                    {formatDate(task.date_echeance)}
                  </span>
                  <span className="taskcard-etat" style={{ color: etatColor, borderColor: etatColor + '44', background: etatColor + '18' }}>
                    {task.etat}
                  </span>
                </div>
              </div>
            </div>

            {task.description && (
              <p className="taskcard-description">{task.description}</p>
            )}

            <div className="taskcard-full-cats">
              <span className="taskcard-cats-label">Dossiers :</span>
              {categories.length === 0
                ? <span className="taskcard-no-cats">Aucun dossier</span>
                : categories.map(cat => {
                    const hex = COULEURS[cat.color] || '#888'
                    return (
                      <span
                        key={cat.id}
                        className="taskcard-cat"
                        style={{ background: hex + '22', borderColor: hex, color: hex }}
                        onClick={() => toggleDossier && toggleDossier(cat.id)}
                        title={`Filtrer par ${cat.title}`}
                      >
                        {cat.title}
                      </span>
                    )
                  })
              }
            </div>

            {task.equipiers && task.equipiers.length > 0 && (
              <div className="taskcard-equipiers">
                {task.equipiers.map((eq, i) => (
                  <span key={i} className="taskcard-equipier">{eq.name}</span>
                ))}
              </div>
            )}

            <div className="taskcard-full-actions">
              <button className="btn btn--ghost btn--sm" onClick={() => setEditing(true)}>✏ Modifier</button>
            </div>
          </>
        )}
      </div>
      <button className="taskcard-toggle taskcard-toggle--open" onClick={onToggle} title="Réduire">
        ▼
      </button>
    </div>
  )
}