export default function NotificationPanel({ activities, unreadCount, onClear, onMarkAllRead, onReadActivity }) {
  return (
    <section className="notification-panel" aria-label="Bildirimler" aria-live="polite">
      <div className="notification-heading">
        <div><strong>Bildirimler</strong><small>{unreadCount ? `${unreadCount} okunmamış hareket` : 'Tüm hareketler okundu'}</small></div>
        <div className="notification-actions">
          <button onClick={onMarkAllRead} disabled={unreadCount === 0}>Tümünü okundu işaretle</button>
          <button onClick={onClear} disabled={activities.length === 0}>Temizle</button>
        </div>
      </div>
      {activities.length === 0 ? (
        <div className="notification-empty"><span>✓</span><strong>Şimdilik yeni bildirim yok</strong><p>Projelerinde yaptığın güncellemeler burada görünecek.</p></div>
      ) : (
        <div className="notification-list">{activities.map((activity) => (
          <button className={`notification-item ${activity.read ? 'read' : 'unread'}`} key={activity.id} onClick={() => onReadActivity(activity.id)}>
            <span className="activity-dot"/><span className="notification-copy"><strong>{activity.message}</strong><small>{activity.time}</small></span>
            <span className="read-receipt" aria-label={activity.read ? 'Okundu' : 'Okunmadı'}>{activity.read ? '✓✓' : '✓'}<small>{activity.read ? 'Okundu' : 'Okunmadı'}</small></span>
          </button>
        ))}</div>
      )}
    </section>
  )
}
