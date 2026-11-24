import Icon from './Icon'
import ScrollReveal from './ScrollReveal'
import { money } from '../utils/formatters'

export default function StatCards({ stats }) {
  const cards = [
    { label: 'Toplam proje', value: stats.total, unit: 'proje', icon: 'briefcase', tone: 'lavender', caption: 'Aktif çalışma alanı' },
    { label: 'Tamamlanan', value: stats.delivered, unit: 'proje', icon: 'chart', tone: 'mint', caption: `${stats.total ? Math.round(stats.delivered / stats.total * 100) : 0}% tamamlandı` },
    { label: 'Kazanılan gelir', value: money(stats.earned), icon: '₺', tone: 'peach', caption: 'Teslim edilen işler' },
    { label: 'Beklenen gelir', value: money(stats.pending), icon: '₺', tone: 'sky', caption: 'Devam eden projeler' },
  ]

  return (
    <section className="stats-grid">
      {cards.map((card, index) => (
        <ScrollReveal key={card.label} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 75}>
          <article className="stat-card">
            <div className="stat-top">
              <span>{card.label}</span>
              <span className={`stat-icon ${card.tone}`}>
                {card.icon === '₺' ? <span>₺</span> : <Icon name={card.icon} size={17}/>}
              </span>
            </div>
            <div className={`stat-value ${typeof card.value === 'string' ? 'money-value' : ''}`}>
              {card.value}{card.unit && <span className="stat-unit">{card.unit}</span>}
            </div>
            <div className="stat-foot"><span className="trend positive">↗ {card.caption}</span><span className="stat-period">genel toplam</span></div>
          </article>
        </ScrollReveal>
      ))}
    </section>
  )
}
