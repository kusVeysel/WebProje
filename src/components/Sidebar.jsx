import { NAV_ITEMS } from '../data/navigation'
import Icon from './Icon'

export default function Sidebar({ activePage, projectCount, completedCount, onNavigate, isOpen = false, isLightTheme, onToggleTheme }) {
  const progress = projectCount ? Math.round((completedCount / projectCount) * 100) : 0
  const isOnTrack = progress >= 50

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); onNavigate('overview') }}>
        <span className="brand-mark"><span/><span/><span/><span/></span>
        <span>iştakip<span className="brand-pro">.pro</span></span>
      </a>
      <div className="workspace">
        <div className="workspace-avatar">V</div>
        <div><strong>Veysel'in alanı</strong><small>Freelancer çalışma alanı</small></div>
      </div>
      <span className="nav-label">ÇALIŞMA ALANI</span>
      <nav className="main-nav" aria-label="Ana menü">
        {NAV_ITEMS.map((item) => (
          <button key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} aria-current={activePage === item.id ? 'page' : undefined} onClick={() => onNavigate(item.id)}>
            <Icon name={item.icon}/>{item.label}
            {item.id === 'projects' && <span className="nav-count">{projectCount}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="theme-toggle" onClick={onToggleTheme} aria-label={isLightTheme ? 'Koyu temaya geç' : 'Açık temaya geç'}>
          <span className="theme-toggle-icon"><Icon name={isLightTheme ? 'moon' : 'sun'} size={15}/></span>
          <span>{isLightTheme ? 'Koyu moda geç' : 'Açık moda geç'}</span>
        </button>
        <div className="tip-card">
          <div className="tip-spark" role="img" aria-label={isOnTrack ? 'Mutlu' : 'Düşünceli'}>{isOnTrack ? '😊' : '😒'}</div>
          <strong>{isOnTrack ? 'Harika gidiyorsun, böyle devam!' : 'Haydi, işlerinin başına dön!'}</strong>
          <p>Tamamlanan projelerdeki ilerlemen.</p>
          <div className="tip-progress"><span style={{ width: `${progress}%` }}/></div>
          <small><b>{progress}%</b> tamamlandı · {completedCount}/{projectCount} proje</small>
        </div>
        <button className="profile">
          <div className="profile-avatar">VK</div><div><strong>Veysel K.</strong><small>Ücretsiz plan</small></div><Icon name="dots"/>
        </button>
      </div>
    </aside>
  )
}
