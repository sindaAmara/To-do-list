import { useState } from 'react'
import { ETATS } from '../../constants/enums'

export default function TaskForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateEcheance, setDateEcheance] = useState('')
  const [etat, setEtat] = useState(ETATS.NOUVEAU)
  const [equipiers, setEquipiers] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (title.trim().length < 5) errs.title = 'Le titre doit faire au moins 5 caractères.'
    if (!dateEcheance) errs.dateEcheance = 'La date d\'échéance est obligatoire.'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const eqList = equipiers
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name }))

    onSubmit({
      id: Date.now(),
      title: title.trim(),
      description,
      date_creation: new Date().toISOString().split('T')[0],
      date_echeance: dateEcheance,
      etat,
      equipiers: eqList,
    })
    onClose()
  }

  return (
    <div className="form">
      <div className="form-field">
        <label className="form-label">Titre <span className="form-required">*</span></label>
        <input
          className={`form-input ${errors.title ? 'form-input--error' : ''}`}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Minimum 5 caractères"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label className="form-label">Description</label>
        <textarea
          className="form-input form-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          placeholder="Optionnel"
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Date d'échéance <span className="form-required">*</span></label>
          <input
            type="date"
            className={`form-input ${errors.dateEcheance ? 'form-input--error' : ''}`}
            value={dateEcheance}
            onChange={e => setDateEcheance(e.target.value)}
          />
          {errors.dateEcheance && <span className="form-error">{errors.dateEcheance}</span>}
        </div>

        <div className="form-field">
          <label className="form-label">État</label>
          <select className="form-input" value={etat} onChange={e => setEtat(e.target.value)}>
            {Object.values(ETATS).map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Équipiers</label>
        <input
          className="form-input"
          value={equipiers}
          onChange={e => setEquipiers(e.target.value)}
          placeholder="Paul, Marie, Bob (séparés par des virgules)"
        />
      </div>

      <div className="form-actions">
        <button className="btn btn--primary" onClick={handleSubmit}>Créer la tâche</button>
        <button className="btn btn--ghost" onClick={onClose}>Annuler</button>
      </div>
    </div>
  )
}