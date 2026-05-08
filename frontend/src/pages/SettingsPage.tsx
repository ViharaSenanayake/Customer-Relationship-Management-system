import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-gray-400 mt-1">Personalize your CRM experience.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`rounded-lg border p-4 text-left transition-all ${
              theme === 'dark'
                ? 'border-violet-500/60 bg-violet-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 text-white">
              <Moon className="h-4 w-4" />
              <span className="font-medium">Dark Mode</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Best for low-light environments.</p>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`rounded-lg border p-4 text-left transition-all ${
              theme === 'light'
                ? 'border-violet-500/60 bg-violet-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 text-white">
              <Sun className="h-4 w-4" />
              <span className="font-medium">Light Mode</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Best for bright environments.</p>
          </button>
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Account</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-gray-200">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-gray-200">{user?.email || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

