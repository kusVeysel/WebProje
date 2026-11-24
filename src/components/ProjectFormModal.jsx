import Icon from './Icon'

export default function ProjectFormModal({ editing, form, onChange, onSubmit, onClose }) {
  const title = editing ? 'Projeyi düzenle' : 'Yeni proje oluştur'

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <form className="project-modal" onSubmit={onSubmit}>
        <div className="modal-heading">
          <div><span className="modal-icon"><Icon name={editing ? 'briefcase' : 'plus'}/></span><h2>{title}</h2><p>{editing ? 'Proje bilgilerini güncelle.' : 'Yeni işini ekle, ilerlemeni takip etmeye başla.'}</p></div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Kapat">×</button>
        </div>
        <label>Müşteri adı<input autoFocus required value={form.client} onChange={(event) => onChange('client', event.target.value)} placeholder="Örn. Northstar Studio"/></label>
        <label>Proje adı<input required value={form.name} onChange={(event) => onChange('name', event.target.value)} placeholder="Örn. Web sitesi tasarımı"/></label>
        <div className="form-row">
          <label>Bütçe (₺)<input required min="0" type="number" value={form.budget} onChange={(event) => onChange('budget', event.target.value)} placeholder="0"/></label>
          <label>Durum<select value={form.status} onChange={(event) => onChange('status', event.target.value)}><option>Devam Ediyor</option><option>Teslim Edildi</option></select></label>
        </div>
        <div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Vazgeç</button><button type="submit" className="primary-button"><Icon name={editing ? 'briefcase' : 'plus'} size={17}/>{editing ? 'Değişiklikleri kaydet' : 'Projeyi ekle'}</button></div>
      </form>
    </div>
  )
}
