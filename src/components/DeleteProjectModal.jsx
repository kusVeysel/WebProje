import Icon from './Icon'

export default function DeleteProjectModal({ project, onCancel, onConfirm }) {
  if (!project) return null

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel() }}>
      <div className="project-modal delete-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
        <div className="modal-heading"><div><span className="modal-icon"><Icon name="dots"/></span><h2 id="delete-title">Projeyi silmek istiyor musun?</h2><p>“{project.name}” ve bütçe kaydı kaldırılacak.</p></div></div>
        <div className="modal-actions"><button className="cancel-button" onClick={onCancel}>Vazgeç</button><button className="delete-confirm" onClick={onConfirm}>Projeyi sil</button></div>
      </div>
    </div>
  )
}
