import { COULEURS } from '../../constants/enums'
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

function isOverdue(str) {
  if (!str) return false
  return new Date(str) < new Date()
}

export default function TaskCard({ task, categories, onToggle, toggleDossier }) {
  const displayedCats = categories.slice(0, 2)
  const overdue = isOverdue(task.date_echeance)
  const etatColor = ETAT_COLORS[task.etat] || '#888'

  return (
    <div className="taskcard">
      <div className="taskcard-stripe" style={{ background: etatColor }} />
      <div className="taskcard-body">
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
          <div className="taskcard-side">
            <div className="taskcard-cats">
              {displayedCats.map(cat => {
                const hex = COULEURS[cat.color] || '#888'
                return (
                  <span
                    key={cat.id}
                    className="taskcard-cat"
                    style={{ background: hex + '22', borderColor: hex, color: hex }}
                    onClick={e => { e.stopPropagation(); toggleDossier && toggleDossier(cat.id) }}
                    title={`Filtrer par ${cat.title}`}
                  >
                    {cat.title}
                  </span>
                )
              })}
              {categories.length > 2 && (
                <span className="taskcard-cat taskcard-cat--more">+{categories.length - 2}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="taskcard-toggle" onClick={onToggle} title="Voir plus">
        ▶
      </button>
    </div>
  )
}