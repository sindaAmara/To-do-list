import { useState, useMemo } from 'react'
import { ETAT_TERMINE, TRIS } from '../constants/enums'

export function useTasks(tasks, categories, relations) {
  const [filtreEtats, setFiltreEtats] = useState([])
  const [filtreDossiers, setFiltreDossiers] = useState([])
  const [filtreEnCours, setFiltreEnCours] = useState(true) // filtre actif par défaut
  const [tri, setTri] = useState(TRIS.DATE_ECHEANCE)
  const [triDesc, setTriDesc] = useState(true)

  const toggleEtat = (etat) => {
    setFiltreEnCours(false)
    setFiltreEtats(prev =>
      prev.includes(etat) ? prev.filter(e => e !== etat) : [...prev, etat]
    )
  }

  const toggleDossier = (catId) => {
    setFiltreDossiers(prev =>
      prev.includes(catId) ? prev.filter(d => d !== catId) : [...prev, catId]
    )
  }

  const toggleEnCours = () => {
    setFiltreEnCours(prev => !prev)
    setFiltreEtats([])
  }

  const setTriOption = (newTri) => {
    if (newTri === tri) {
      setTriDesc(prev => !prev)
    } else {
      setTri(newTri)
      setTriDesc(true)
    }
  }

  // Catégories d'une tâche
  const getCategoriesOfTask = (taskId) => {
    const catIds = relations.filter(r => r.tache === taskId).map(r => r.categorie)
    return categories.filter(c => catIds.includes(c.id))
  }

  const tasksFiltrees = useMemo(() => {
    let result = [...tasks]

    // Filtre "En cours" (tâches non terminées)
    if (filtreEnCours) {
      result = result.filter(t => !ETAT_TERMINE.includes(t.etat))
    }

    // Filtre par états
    if (filtreEtats.length > 0) {
      result = result.filter(t => filtreEtats.includes(t.etat))
    }

    // Filtre par dossiers
    if (filtreDossiers.length > 0) {
      result = result.filter(t => {
        const catIds = relations.filter(r => r.tache === t.id).map(r => r.categorie)
        return filtreDossiers.some(d => catIds.includes(d))
      })
    }

    // Tri
    result.sort((a, b) => {
      let valA = a[tri]
      let valB = b[tri]
      if (tri === TRIS.NOM) {
        valA = valA?.toLowerCase() || ''
        valB = valB?.toLowerCase() || ''
      }
      if (valA < valB) return triDesc ? 1 : -1
      if (valA > valB) return triDesc ? -1 : 1
      return 0
    })

    return result
  }, [tasks, relations, filtreEtats, filtreDossiers, filtreEnCours, tri, triDesc])

  return {
    tasksFiltrees,
    filtreEtats,
    filtreDossiers,
    filtreEnCours,
    tri,
    triDesc,
    toggleEtat,
    toggleDossier,
    toggleEnCours,
    setTriOption,
    getCategoriesOfTask,
  }
}