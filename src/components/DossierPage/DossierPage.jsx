import { useTodo } from '../../contexts/TodoContext'
import { ETAT_TERMINE, COULEURS } from '../../constants/enums'
import './DossierPage.css'

function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function DossierPage({ category, tasks, onBack, onUpdateTask }) {
  const hex = COULEURS[category?.color] || '#3f6472'

  const toggleTermine = (task) => {
    if (ETAT_TERMINE.includes(task.etat)) {
      onUpdateTask(task.id, { etat: 'Nouveau' })
    } else {
      onUpdateTask(task.id, { etat: 'Réussi' })
    }
  }

  return (
    <div className="dossier-page">
      <button className="dossier-page-back" onClick={onBack}>
        ← Retour aux dossiers
      </button>
      <div className="cahier">
        <div className="cahier-spirale">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="spirale-anneau" />
          ))}
        </div>
        <div className="cahier-contenu">
          <div className="cahier-header" style={{ borderBottomColor: hex }}>
            <h1 className="cahier-titre" style={{ color: hex }}>{category?.title}</h1>
            {category?.description && <p className="cahier-desc">{category.description}</p>}
            <p className="cahier-nb" style={{ color: hex }}>
              {tasks.length} tâche{tasks.length !== 1 ? 's' : ''} dans ce dossier
            </p>
          </div>

          {tasks.length === 0 ? (
            <div className="cahier-vide"><p>Aucune tâche dans ce dossier.</p></div>
          ) : (
            <ul className="cahier-liste">
              {tasks.map((task, i) => {
                const estTermine = ETAT_TERMINE.includes(task.etat)
                return (
                  <li key={task.id} className={`cahier-ligne ${estTermine ? 'cahier-ligne--done' : ''}`}>
                    <span className="cahier-num">{String(i + 1).padStart(2, '0')}</span>
                    <button
                      className={`cahier-check ${estTermine ? 'cahier-check--checked' : ''}`}
                      onClick={() => toggleTermine(task)}
                      style={estTermine ? { borderColor: '#dce7e8', background: '#dce7e8' } : {}}
                    >
                      {estTermine && <span className="cahier-check-mark">✓</span>}
                    </button>
                    <div className="cahier-task-info">
                      <span className={`cahier-task-title ${estTermine ? 'cahier-task-title--done' : ''}`}>
                        {task.title}
                      </span>
                      {task.description && <span className="cahier-task-desc">{task.description}</span>}
                    </div>
                    <div className="cahier-task-meta">
                      <span className="cahier-task-date">📅 {formatDate(task.date_echeance)}</span>
                      <span className="cahier-task-etat" style={{
                        color:       estTermine ? '#3f6472' : '#e879a0',
                        borderColor: estTermine ? '#dce7e8' : '#f0c4dd',
                        background:  estTermine ? '#dce7e822' : '#fff0f6',
                      }}>
                        {task.etat}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="cahier-footer">
            <span>✦</span>
            <span>{tasks.filter(t => ETAT_TERMINE.includes(t.etat)).length} / {tasks.length} terminées</span>
            <span>✦</span>
          </div>
        </div>
      </div>
    </div>
  )
}