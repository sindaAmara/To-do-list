import { useTodo } from '../../contexts/TodoContext'
import { ETATS, ETAT_TERMINE } from '../../constants/enums'
import './Header.css'

export default function Header() {
  const { tasks } = useTodo()

  const total       = tasks.length
  const nonTermines = tasks.filter(t => !ETAT_TERMINE.includes(t.etat)).length

  const couleurEtat = {
    [ETATS.NOUVEAU]:    '#C084FC',
    [ETATS.EN_COURS]:   '#67E8F9',
    [ETATS.REUSSI]:     '#86EFAC',
    [ETATS.EN_ATTENTE]: '#FDE68A',
    [ETATS.ABANDONNE]:  '#FCA5A5',
  }

  const statsEtats = Object.values(ETATS).map(etat => ({
    etat,
    count: tasks.filter(t => t.etat === etat).length,
  })).filter(s => s.count > 0)

  const renderPie = () => {
    if (total === 0) return null
    const cx = 50, cy = 50, r = 40
    let startAngle = -Math.PI / 2
    const slices = statsEtats.map(s => {
      const angle    = (s.count / total) * 2 * Math.PI
      const endAngle = startAngle + angle
      const x1 = cx + r * Math.cos(startAngle)
      const y1 = cy + r * Math.sin(startAngle)
      const x2 = cx + r * Math.cos(endAngle)
      const y2 = cy + r * Math.sin(endAngle)
      const largeArc = angle > Math.PI ? 1 : 0
      const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`
      startAngle = endAngle
      return { ...s, path }
    })

    return (
      <svg className="header-pie" viewBox="0 0 100 100">
        {slices.map(s => (
          <path key={s.etat} d={s.path} fill={couleurEtat[s.etat]} stroke="var(--bg)" strokeWidth="1">
            <title>{s.etat} : {s.count}</title>
          </path>
        ))}
      </svg>
    )
  }

  return (
    <header className="header">
      <div className="header-left">
        <img src="/src/logo-to-do-list.png" alt="ToDo List" className="startup-logoH" />
        <p className="header-sub">Gérez vos tâches efficacement</p>
      </div>

      <div className="header-stats">
        <div className="header-stat">
          <span className="header-stat-value">{total}</span>
          <span className="header-stat-label">Tâches totales</span>
        </div>
        <div className="header-stat header-stat--accent">
          <span className="header-stat-value">{nonTermines}</span>
          <span className="header-stat-label">Non terminées</span>
        </div>
      </div>

      <div className="header-pie-wrap">
        {renderPie()}
        <div className="header-legend">
          {statsEtats.map(s => (
            <div key={s.etat} className="header-legend-item">
              <span className="header-legend-dot" style={{ background: couleurEtat[s.etat] }} />
              <span>{s.etat} ({s.count})</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}