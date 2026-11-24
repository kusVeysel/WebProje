import { useState } from 'react'
import Icon from './Icon'
import ScrollReveal from './ScrollReveal'
import { money } from '../utils/formatters'

const FILTERS = ['Tümü', 'Devam Ediyor', 'Teslim Edildi']

export default function ProjectsTable({ projects, onToggleStatus, onAddProject, onEditProject, onDeleteProject, pageSize = 8, showHeading = true }) {
  const [filter, setFilter] = useState('Tümü')
  const [query, setQuery] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [page, setPage] = useState(1)

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filter === 'Tümü' || project.status === filter
    const text = `${project.client} ${project.name}`.toLocaleLowerCase('tr')
    return matchesStatus && text.includes(query.toLocaleLowerCase('tr'))
  })
  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const startIndex = (currentPage - 1) * pageSize
  const pageProjects = filteredProjects.slice(startIndex, startIndex + pageSize)
  const rangeStart = filteredProjects.length ? startIndex + 1 : 0
  const rangeEnd = Math.min(startIndex + pageSize, filteredProjects.length)

  function updateFilter(nextFilter) {
    setFilter(nextFilter)
    setPage(1)
  }

  function updateQuery(nextQuery) {
    setQuery(nextQuery)
    setPage(1)
  }

  return (
    <ScrollReveal direction="right">
    <section className="projects-section">
      {showHeading && (
        <div className="section-heading">
          <div><div className="section-title-line"><h2>Projelerin</h2><span className="project-total">{projects.length}</span></div><p>Tüm işlerini tek bir yerde takip et.</p></div>
        </div>
      )}
      <div className="project-panel">
        <div className="table-toolbar">
          <div className="tabs">
            {FILTERS.map((tab) => <button key={tab} onClick={() => updateFilter(tab)} className={`tab ${filter === tab ? 'selected' : ''}`}>
              {tab}{tab === 'Tümü' && <span>{projects.length}</span>}
            </button>)}
          </div>
          <label className="search-box"><Icon name="search" size={16}/><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Proje ara..."/></label>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>MÜŞTERİ / PROJE</th><th>DURUM</th><th>BÜTÇE</th><th>SON GÜNCELLEME</th><th/></tr></thead>
            <tbody>{pageProjects.map((project) => (
              <tr key={project.id}>
                <td><div className="project-cell"><div className={`client-avatar ${project.color}`}>{project.initials}</div><div><strong>{project.client}</strong><small>{project.name}</small></div></div></td>
                <td><button className={`status-pill ${project.status === 'Teslim Edildi' ? 'done' : 'progress'}`} onClick={() => onToggleStatus(project)} title="Durumu değiştirmek için tıkla"><i/>{project.status}</button></td>
                <td className="budget-cell">{money(Number(project.budget))}</td>
                <td className="date-cell">{project.date}</td>
                <td className="actions-cell">
                  <button className="row-more" aria-label={`${project.name} seçenekleri`} aria-haspopup="menu" aria-expanded={openMenu === project.id} onClick={() => setOpenMenu(openMenu === project.id ? null : project.id)}><Icon name="dots"/></button>
                  {openMenu === project.id && <div className="row-menu" role="menu"><button role="menuitem" onClick={() => { onEditProject(project); setOpenMenu(null) }}><Icon name="edit" size={14}/>Düzenle</button><button role="menuitem" className="delete-action" onClick={() => { onDeleteProject(project); setOpenMenu(null) }}><Icon name="trash" size={14}/>Sil</button></div>}
                </td>
              </tr>
            ))}</tbody>
          </table>
          {filteredProjects.length === 0 && <div className="empty-state"><div className="empty-icon"><Icon name="search" size={22}/></div><strong>{query ? 'Sonuç bulunamadı' : 'Bu listede henüz proje yok'}</strong><p>{query ? 'Başka bir müşteri veya proje adı deneyebilirsin.' : 'Yeni bir proje ekleyerek başlayabilirsin.'}</p>{!query && <button className="secondary-button" onClick={onAddProject}><Icon name="plus" size={16}/>Proje ekle</button>}</div>}
        </div>
        <div className="table-footer">
          <span>{filteredProjects.length} projeden <strong>{rangeStart}–{rangeEnd}</strong> arası gösteriliyor</span>
          <div className="pagination"><span className="page-count">Sayfa {currentPage} / {pageCount}</span>
            <button disabled={currentPage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Önceki sayfa">‹</button>
            <button disabled={currentPage >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} aria-label="Sonraki sayfa">›</button>
          </div>
        </div>
      </div>
    </section>
    </ScrollReveal>
  )
}
