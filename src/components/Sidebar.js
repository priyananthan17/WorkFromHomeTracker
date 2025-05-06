import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart, User, ClipboardList } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: <Home /> },
  { to: '/worklog', label: 'Work Log', icon: <ClipboardList /> },
  { to: '/summary', label: 'Summary', icon: <FileText /> },
  { to: '/reports', label: 'Reports', icon: <BarChart /> },
  { to: '/profile', label: 'Profile', icon: <User /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-md p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">WFHT</h2>
      <nav className="flex flex-col space-y-2">
        {navItems.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-100 hover:text-blue-800 ${
              location.pathname === to ? 'bg-blue-100 text-blue-800' : 'text-gray-700'
            }`}
          >
            <span className="mr-3">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
