import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  CalendarIcon as CalendarIconSolid,
  ClipboardDocumentListIcon as LogIconSolid,
  ChartBarIcon as ChartSolid,
  Cog6ToothIcon as CogSolid
} from '@heroicons/react/24/solid';

const navItems = [
  { to: '/', label: 'Home', Icon: HomeIcon, ActiveIcon: HomeIconSolid },
  { to: '/log', label: 'Log', Icon: ClipboardDocumentListIcon, ActiveIcon: LogIconSolid },
  { to: '/calendar', label: 'Calendar', Icon: CalendarIcon, ActiveIcon: CalendarIconSolid },
  { to: '/progress', label: 'Progress', Icon: ChartBarIcon, ActiveIcon: ChartSolid },
  { to: '/settings', label: 'Settings', Icon: Cog6ToothIcon, ActiveIcon: CogSolid },
];

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex z-50">
        {navItems.map(({ to, label, Icon, ActiveIcon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 gap-0.5 text-xs transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-500'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? <ActiveIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
