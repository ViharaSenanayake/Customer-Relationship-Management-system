import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', to: '/leads', icon: Users },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="crm-sidebar hidden w-64 shrink-0 overflow-y-auto border-r border-white/10 bg-gray-950/50 glass md:block">
      <div className="crm-sidebar-brand flex h-16 items-center px-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wider text-white">
          <span className="gradient-text crm-sidebar-logo">CRM</span>
          <span className="crm-sidebar-tag text-gray-500 ml-2 text-sm font-normal">Pro</span>
        </h1>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
