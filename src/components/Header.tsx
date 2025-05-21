import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, History, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Headphones className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-semibold text-gray-800">VoiceScript</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <NavLink to="/" current={location.pathname === "/"}>
              Transcribe
            </NavLink>
            <NavLink to="/history" current={location.pathname === "/history"}>
              <History className="h-4 w-4 mr-1" />
              History
            </NavLink>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      current 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {children}
  </Link>
);

export default Header;