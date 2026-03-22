import { ETATS, TRIS } from '../../constants/enums'
import { COULEURS } from '../../constants/enums'
import './FilterBar.css'

export default function FilterBar({
  categories,
  filtreEtats,
  filtreDossiers,
  filtreEnCours,
  tri,
  triDesc,
  toggleEtat,
  toggleDossier,
  toggleEnCours,
  setTriOption,
  nbResultats,
}) {
  const couleurEtat = {
    [ETATS.NOUVEAU]:     '#C084FC', // violet pastel
    [ETATS.EN_COURS]:   '#67E8F9', // bleu ciel pastel
    [ETATS.REUSSI]:     '#86EFAC', // vert menthe pastel
    [ETATS.EN_ATTENTE]: '#FDE68A', // jaune doux pastel
    [ETATS.ABANDONNE]:  '#FCA5A5', // rose pastel
  }

  return (
    <div className="filterbar">
      <div className="filterbar-section">
        <span className="filterbar-label">Tri</span>
        <div className="filterbar-chips">
          {Object.entries(TRIS).map(([key, val]) => {
            const labels = { date_creation: 'Création', date_echeance: 'Échéance', title: 'Nom' }
            const isActive = tri === val
            return (
              <button
                key={key}
                className={`chip chip--tri ${isActive ? 'chip--active' : ''}`}
                onClick={() => setTriOption(val)}
              >
                {labels[val]}
                {isActive && <span className="chip-arrow">{triDesc ? ' ↓' : ' ↑'}</span>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="filterbar-section">
        <span className="filterbar-label">Filtre</span>
        <div className="filterbar-chips">
          <button
            className={`chip chip--encours ${filtreEnCours ? 'chip--active' : ''}`}
            onClick={toggleEnCours}
          >
            En cours
          </button>
          {Object.values(ETATS).map(etat => (
            <button
              key={etat}
              className={`chip chip--etat ${filtreEtats.includes(etat) ? 'chip--active' : ''}`}
              style={filtreEtats.includes(etat) ? { background: couleurEtat[etat] + '22', borderColor: couleurEtat[etat], color: couleurEtat[etat] } : {}}
              onClick={() => toggleEtat(etat)}
            >
              <span className="chip-dot" style={{ background: couleurEtat[etat] }} />
              {etat}
            </button>
          ))}
        </div>
      </div>

      {categories.length > 0 && (
        <div className="filterbar-section">
          <span className="filterbar-label">Dossiers</span>
          <div className="filterbar-chips">
            {categories.map(cat => {
              const isActive = filtreDossiers.includes(cat.id)
              const hex = COULEURS[cat.color] || '#888'
              return (
                <button
                  key={cat.id}
                  className={`chip chip--dossier ${isActive ? 'chip--active' : ''}`}
                  style={isActive ? { background: hex + '22', borderColor: hex, color: hex } : {}}
                  onClick={() => toggleDossier(cat.id)}
                >
                  {cat.icon ? <span>{cat.icon}</span> : null}
                  {cat.title}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="filterbar-count">
        <span>{nbResultats} tâche{nbResultats !== 1 ? 's' : ''} affichée{nbResultats !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}