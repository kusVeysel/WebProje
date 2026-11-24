import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import NotificationPanel from './NotificationPanel'
import { formatToday } from '../utils/formatters'

export default function AppHeader({ pageTitle, currentDate, activities, unreadCount, onClearNotifications, onMarkAllRead, onReadActivity, onMenuClick }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const latestActivityId = activities[0]?.id
  const previousActivityId = useRef(latestActivityId)

  useEffect(() => {
    if (latestActivityId && latestActivityId !== previousActivityId.current) {
      setNotificationsOpen(false)
    }
    previousActivityId.current = latestActivityId
  }, [latestActivityId])

  return (
    <header className="topbar">
      <button className="mobile-menu-button" onClick={onMenuClick} aria-label="Menüyü aç"><Icon name="menu" size={20}/></button>
      <div className="breadcrumb">Çalışma alanı <span>›</span><strong>{pageTitle}</strong></div>
      <div className="top-actions">
        <span className="today"><Icon name="calendar" size={15}/>{formatToday(currentDate)}</span>
        <button className={`icon-button notification ${notificationsOpen ? 'is-open' : ''}`} aria-label={unreadCount ? `Bildirimler, ${unreadCount} okunmamış` : 'Bildirimler'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}>
          <Icon name="bell" size={18}/>{unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
        </button>
        <div className="top-avatar">VK</div>
        {notificationsOpen && <NotificationPanel activities={activities} unreadCount={unreadCount} onClear={onClearNotifications} onMarkAllRead={onMarkAllRead} onReadActivity={onReadActivity}/>}
      </div>
    </header>
  )
}
