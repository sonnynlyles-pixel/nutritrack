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
    <div className="flex flex-col h-screen bg-surface-bg text-gray-100">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Glass nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass shadow-nav flex">
        {navItems.map(({ to, label, Icon, ActiveIcon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2.5 gap-0.5 text-[10px] font-medium transition-all ${
                isActive ? 'text-brand-400' : 'text-gray-600 hover:text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  {isActive
                    ? <ActiveIcon className="w-6 h-6 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                    : <Icon className="w-6 h-6" />
                  }
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-400" />
                  )}
                </div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
