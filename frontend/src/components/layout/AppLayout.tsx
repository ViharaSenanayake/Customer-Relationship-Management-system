import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const AppLayout = () => {
  return (
    <div className="crm-shell flex h-screen overflow-hidden bg-gray-950">
      <Sidebar />
      <div className="crm-main-column flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="crm-main-scroll flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
