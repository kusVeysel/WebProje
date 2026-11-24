import { useEffect, useMemo, useState } from 'react'
import AppHeader from './components/AppHeader'
import DeleteProjectModal from './components/DeleteProjectModal'
import FinanceView from './components/FinanceView'
import Icon from './components/Icon'
import PageHeading from './components/PageHeading'
import ProjectFormModal from './components/ProjectFormModal'
import ProjectsTable from './components/ProjectsTable'
import Sidebar from './components/Sidebar'
import SiteFooter from './components/SiteFooter'
import StatCards from './components/StatCards'
import { NAV_ITEMS } from './data/navigation'
import { formatOverviewDate, formatTime } from './utils/formatters'
import { readProjects, saveProjects } from './utils/projectStorage'
import './App.css'

const EMPTY_FORM = { client: '', name: '', budget: '', status: 'Devam Ediyor' }
const AVATAR_COLORS = ['violet', 'blue', 'orange', 'green']

function calculateStats(projects) {
  return {
    total: projects.length,
    delivered: projects.filter((project) => project.status === 'Teslim Edildi').length,
    earned: projects.filter((project) => project.status === 'Teslim Edildi').reduce((sum, project) => sum + Number(project.budget), 0),
    pending: projects.filter((project) => project.status === 'Devam Ediyor').reduce((sum, project) => sum + Number(project.budget), 0),
  }
}

function App() {
  const [projects, setProjects] = useState(readProjects)
  const [activePage, setActivePage] = useState('overview')
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLightTheme, setIsLightTheme] = useState(() => localStorage.getItem('istakip-theme') === 'light')
  const [formOpen, setFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [activities, setActivities] = useState([])
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => saveProjects(projects), [projects])
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60_000)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => { localStorage.setItem('istakip-theme', isLightTheme ? 'light' : 'dark') }, [isLightTheme])
  useEffect(() => {
    if (!notice) return undefined
    const timer = setTimeout(() => setNotice(''), 2600)
    return () => clearTimeout(timer)
  }, [notice])

  const stats = useMemo(() => calculateStats(projects), [projects])
  const unreadCount = activities.filter((activity) => !activity.read).length
  const pageTitle = NAV_ITEMS.find((item) => item.id === activePage)?.label ?? 'Genel Bakış'

  function addActivity(message) {
    setActivities((current) => [{ id: Date.now() + Math.random(), message, time: formatTime(), read: false }, ...current].slice(0, 8))
  }

  function openCreateForm() {
    setEditingProject(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  function openEditForm(project) {
    setEditingProject(project)
    setForm({ client: project.client, name: project.name, budget: String(project.budget), status: project.status })
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditingProject(null)
    setForm(EMPTY_FORM)
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function saveProject(event) {
    event.preventDefault()
    const initials = form.client.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr')
    const date = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date())

    if (editingProject) {
      setProjects((current) => current.map((project) => project.id === editingProject.id
        ? { ...project, ...form, budget: Number(form.budget), initials, date }
        : project))
      setNotice('Proje bilgileri güncellendi.')
      addActivity(`“${form.name}” projesi düzenlendi.`)
    } else {
      const project = {
        ...form,
        id: Date.now(),
        budget: Number(form.budget),
        date,
        initials,
        color: AVATAR_COLORS[projects.length % AVATAR_COLORS.length],
      }
      setProjects((current) => [project, ...current])
      setNotice('Yeni proje listenize eklendi.')
      addActivity(`“${form.name}” projesi eklendi.`)
    }

    closeForm()
  }

  function removeProject() {
    if (!deleteTarget) return
    setProjects((current) => current.filter((project) => project.id !== deleteTarget.id))
    setNotice(`“${deleteTarget.name}” silindi.`)
    addActivity(`“${deleteTarget.name}” projesi silindi.`)
    setDeleteTarget(null)
  }

  function toggleProjectStatus(project) {
    const status = project.status === 'Devam Ediyor' ? 'Teslim Edildi' : 'Devam Ediyor'
    setProjects((current) => current.map((item) => item.id === project.id ? { ...item, status } : item))
    setNotice(`${project.name} · ${status}`)
    addActivity(`“${project.name}” durumu: ${status}.`)
  }

  function markActivityRead(activityId) {
    setActivities((current) => current.map((activity) => activity.id === activityId ? { ...activity, read: true } : activity))
  }

  function markAllActivitiesRead() {
    setActivities((current) => current.map((activity) => ({ ...activity, read: true })))
  }

  function navigateTo(page) {
    setActivePage(page)
    setSidebarOpen(false)
  }

  function renderPage() {
    if (activePage === 'projects') {
      return <>
        <PageHeading eyebrow="PROJE YÖNETİMİ" title={<>Tüm <span>projelerin.</span></>} description="Projelerini ara, durumlarını güncelle ve bütçelerini takip et." action={<button className="primary-button" onClick={openCreateForm}><Icon name="plus" size={18}/>Yeni proje</button>}/>
        <ProjectsTable projects={projects} onToggleStatus={toggleProjectStatus} onAddProject={openCreateForm} onEditProject={openEditForm} onDeleteProject={setDeleteTarget} showHeading={false}/>
      </>
    }

    if (activePage === 'finance') return <FinanceView projects={projects} stats={stats}/>

    return <>
      <PageHeading eyebrow={formatOverviewDate(currentDate)} title={<>Güzel işler, <span>iyi ilerliyor.</span></>} description="İşlerinin durumuna ve bu ayki performansına hızlıca göz at." action={<button className="primary-button" onClick={openCreateForm}><Icon name="plus" size={18}/>Yeni proje</button>}/>
      <StatCards stats={stats}/>
      <ProjectsTable projects={projects} pageSize={4} onToggleStatus={toggleProjectStatus} onAddProject={openCreateForm} onEditProject={openEditForm} onDeleteProject={setDeleteTarget}/>
    </>
  }

  return (
    <div className={`app-shell ${isLightTheme ? 'light-theme' : ''}`}>
      <Sidebar activePage={activePage} projectCount={stats.total} completedCount={stats.delivered} onNavigate={navigateTo} isOpen={sidebarOpen} isLightTheme={isLightTheme} onToggleTheme={() => setIsLightTheme((current) => !current)}/>
      {sidebarOpen && <button className="sidebar-scrim" aria-label="Menüyü kapat" onClick={() => setSidebarOpen(false)}/>}
      <main className="main-content" id="top">
        <AppHeader
          pageTitle={pageTitle}
          currentDate={currentDate}
          activities={activities}
          unreadCount={unreadCount}
          onClearNotifications={() => setActivities([])}
          onMarkAllRead={markAllActivitiesRead}
          onReadActivity={markActivityRead}
          onMenuClick={() => setSidebarOpen((open) => !open)}
        />
        <div className="content-wrap">
          {renderPage()}
          <SiteFooter onNavigate={navigateTo}/>
        </div>
      </main>
      {notice && <div className="toast toast-top"><span>✓</span>{notice}</div>}
      {formOpen && <ProjectFormModal editing={Boolean(editingProject)} form={form} onChange={updateForm} onSubmit={saveProject} onClose={closeForm}/>} 
      <DeleteProjectModal project={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={removeProject}/>
    </div>
  )
}

export default App
