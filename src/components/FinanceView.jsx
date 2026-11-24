import PageHeading from './PageHeading'
import ScrollReveal from './ScrollReveal'
import StatCards from './StatCards'
import { money } from '../utils/formatters'

export default function FinanceView({ projects, stats }) {
  const totalBudget = stats.earned + stats.pending
  const earnedPercent = totalBudget ? Math.round(stats.earned / totalBudget * 100) : 0

  return (
    <>
      <PageHeading eyebrow="GELİR VE BÜTÇE" title={<>Finansal <span>özetin.</span></>} description="Kazanılan ve devam eden işlerinin bütçesini tek yerde gör."/>
      <StatCards stats={stats}/>
      <ScrollReveal direction="right"><section className="finance-panel">
        <div className="section-heading"><div><div className="section-title-line"><h2>Gelir dağılımı</h2></div><p>Proje durumuna göre bütçe görünümü.</p></div></div>
        <div className="finance-summary">
          <div className="finance-donut" style={{ '--earned-percent': `${earnedPercent}%` }}><div><strong>{earnedPercent}%</strong><small>kazanıldı</small></div></div>
          <div className="finance-legend">
            <div><span className="legend-dot earned-dot"/><div><small>Kazanılan gelir</small><strong>{money(stats.earned)}</strong></div></div>
            <div><span className="legend-dot pending-dot"/><div><small>Beklenen gelir</small><strong>{money(stats.pending)}</strong></div></div>
            <div className="finance-total"><span>Toplam proje bütçesi</span><strong>{money(totalBudget)}</strong></div>
          </div>
        </div>
        <div className="finance-projects"><h3>Proje bazında gelir</h3>
          {projects.map((project) => <div className="finance-row" key={project.id}>
            <div className={`client-avatar ${project.color}`}>{project.initials}</div>
            <div className="finance-project-name"><strong>{project.client}</strong><small>{project.status}</small></div>
            <strong className="finance-amount">{money(Number(project.budget))}</strong>
          </div>)}
          {projects.length === 0 && <p className="finance-empty">Gelir özeti oluşturmak için proje ekle.</p>}
        </div>
      </section></ScrollReveal>
    </>
  )
}
