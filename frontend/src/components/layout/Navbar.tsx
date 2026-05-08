import { useAuth } from '../../hooks/useAuth';
import { LogOut, Menu, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="crm-navbar flex h-16 flex-shrink-0 items-center justify-between border-b border-white/10 bg-gray-950/50 glass px-4 sm:px-6">
      <div className="flex flex-1 items-center md:hidden">
        <button type="button" className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      
      <div className="flex flex-1 justify-end items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-400 hover:text-violet-400 transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="p-2 text-gray-400 hover:text-violet-400 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="hidden sm:flex items-center gap-3 border-l border-white/10 pl-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-200">{user?.name}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="ml-2 rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
