import { useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navForPath } from '../nav/config'
import './DashboardLayout.css'

export function DashboardLayout() {
  const { pathname } = useLocation()
  const navItems = useMemo(() => navForPath(pathname), [pathname])

  return (
    <div className="dash-shell">
      <div className="dash-body">
        <aside className="dash-sidebar" aria-label="القائمة الجانبية">
          <nav className="dash-sidebar__nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={
                  item.to === '/student' ||
                  item.to === '/mentor' ||
                  item.to === '/ambassador' ||
                  item.to === '/admin'
                }
                className={({ isActive }) =>
                  `dash-sidebar__link ${isActive ? 'dash-sidebar__link--active' : ''}`.trim()
                }
              >
                <span className="dash-sidebar__icon">{item.icon}</span>
                <span className="dash-sidebar__label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="dash-main-wrap">
          <div className="dash-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
