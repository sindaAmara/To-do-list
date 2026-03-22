import { useState } from 'react'
import { COULEURS, ICONES } from '../../constants/enums'

export default function FolderForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('orange')
  const [icon, setIcon] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (title.trim().length < 3) errs.title = 'Le titre doit faire au moins 3 caractères.'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit({
      id: Date.now(),
      title: title.trim(),
      description,
      color,
      icon,
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
          placeholder="Minimum 3 caractères"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label className="form-label">Description</label>
        <textarea
          className="form-input form-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={2}
          placeholder="Optionnel"
        />
      </div>

      <div className="form-field">
        <label className="form-label">Couleur</label>
        <div className="form-colors">
          {Object.entries(COULEURS).map(([key, hex]) => (
            <button
              key={key}
              className={`form-color-btn ${color === key ? 'form-color-btn--active' : ''}`}
              style={{ background: hex }}
              onClick={() => setColor(key)}
              title={key}
            />
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Pictogramme (optionnel)</label>
        <div className="form-icons">
          <button
            className={`form-icon-btn ${icon === '' ? 'form-icon-btn--active' : ''}`}
            onClick={() => setIcon('')}
          >
            Aucun
          </button>
          {Object.entries(ICONES).map(([key, emoji]) => (
            <button
              key={key}
              className={`form-icon-btn ${icon === key ? 'form-icon-btn--active' : ''}`}
              onClick={() => setIcon(key)}
              title={key}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn--primary" onClick={handleSubmit}>Créer le dossier</button>
        <button className="btn btn--ghost" onClick={onClose}>Annuler</button>
      </div>
    </div>
  )
}