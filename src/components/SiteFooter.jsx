import { NAV_ITEMS } from '../data/navigation'
import Icon from './Icon'

export default function SiteFooter({ onNavigate }) {
  return (
    <footer className="page-footer">
      <div className="footer-main">
        <div className="footer-about">
          <a className="footer-brand" href="#top" onClick={(event) => { event.preventDefault(); onNavigate('overview') }}>
            <span className="brand-mark"><span/><span/><span/><span/></span><span>iştakip<span className="brand-pro">.pro</span></span>
          </a>
          <p>Freelancer projeleri ve gelirleri için sade bir çalışma alanı.</p>
        </div>
        <div className="footer-links"><strong>Çalışma alanı</strong>{NAV_ITEMS.map((item) => <button key={item.id} onClick={() => onNavigate(item.id)}>{item.label}</button>)}</div>
        <div className="footer-storage"><span className="storage-mark">⌂</span><div><strong>Verilerin seninle kalır</strong><small>Projelerin bu tarayıcıda saklanır.</small></div></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} iştakip.pro · Tüm hakları saklıdır.</span><a href="https://github.com/kusVeysel/WebProje" target="_blank" rel="noreferrer">GitHub deposu <Icon name="arrow" size={13}/></a></div>
    </footer>
  )
}
