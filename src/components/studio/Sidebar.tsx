import { Coffee, LayoutDashboard, FileText, PenTool, Image, Users, Settings, LogOut, X, Trash2, Plug, UserCircle, Sparkles, BarChart3, Layout } from 'lucide-react';
import { User } from '../../utils/auth';
import logoImage from 'figma:asset/e92cbdb68eadb4d48e29e75a1cbdf01da561a426.png';

interface SidebarProps {
  currentUser: User;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ currentUser, activePage, onNavigate, onLogout, isMobileOpen, onMobileClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'seo-dashboard', label: 'Dashboard SEO', icon: BarChart3 },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'editor', label: 'Éditeur', icon: PenTool },
    { id: 'media', label: 'Médias', icon: Image },
    { id: 'authors', label: 'Auteurs', icon: UserCircle },
    { id: 'promo-blocks', label: 'Blocs promo', icon: Layout },
    { id: 'trash', label: 'Corbeille', icon: Trash2 },
    ...(currentUser.role === 'admin' ? [{ id: 'users', label: 'Utilisateurs', icon: Users }] : []),
    { id: 'plugins', label: 'Plugins', icon: Plug },
    ...(currentUser.role === 'admin' ? [{ id: 'settings', label: 'Réglages', icon: Settings }] : []),
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    if (onMobileClose) onMobileClose();
  };

  const sidebarContent = (
    <>
      {/* Logo & Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <a href="/" className="flex items-center gap-3">
            <img src={logoImage} alt="Numcafé" className="h-10" />
          </a>
          {isMobileOpen && onMobileClose && (
            <button onClick={onMobileClose} className="lg:hidden text-gray-600 hover:text-gray-800">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Coffee className="w-4 h-4 text-[#C69C6D]" />
          <span className="text-gray-600">Studio</span>
        </div>
      </div>

      {/* User info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C69C6D] rounded-full flex items-center justify-center text-white">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#C69C6D] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Déconnexion</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onMobileClose} />
          
          {/* Drawer */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white flex flex-col shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}