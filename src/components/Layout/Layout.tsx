import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  CalendarIcon as CalendarIconSolid,
  ClipboardDocumentListIcon as LogIconSolid,
  ChartBarIcon as ChartSolid,
  Cog6ToothIcon as CogSolid,
  BookmarkIcon as BookmarkSolid,
} from '@heroicons/react/24/solid';

const navItems = [
  { to: '/',          label: 'Home',     Icon: HomeIcon,                  ActiveIcon: HomeIconSolid },
  { to: '/log',       label: 'Log',      Icon: ClipboardDocumentListIcon, ActiveIcon: LogIconSolid },
  { to: '/calendar',  label: 'Calendar', Icon: CalendarIcon,              ActiveIcon: CalendarIconSolid },
  { to: '/progress',  label: 'Progress', Icon: ChartBarIcon,              ActiveIcon: ChartSolid },
  { to: '/foods',     label: 'Foods',    Icon: BookmarkIcon,              ActiveIcon: BookmarkSolid },
  { to: '/settings',  label: 'Settings', Icon: Cog6ToothIcon,             ActiveIcon: CogSolid },
];

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-surface-bg text-gray-900">
      <main className="flex-1 overflow-y-auto pb-28">
        <Outlet />
      </main>

      {/* Floating glass dock */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-3"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <div className="glass-dock flex w-full max-w-md mx-auto px-1 py-1">
          {navItems.map(({ to, label, Icon, ActiveIcon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-1.5 gap-0.5 text-[10px] font-medium transition-all duration-200 ease-spring ${
                  isActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex items-center justify-center rounded-full px-3 py-1 transition-all duration-200 ease-spring ${
                      isActive ? 'bg-blue-500/12' : ''
                    }`}
                  >
                    {isActive
                      ? <ActiveIcon className="w-6 h-6" />
                      : <Icon className="w-6 h-6" />
                    }
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
