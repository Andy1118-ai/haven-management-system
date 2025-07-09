import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  BookOpen,
  CreditCard, 
  Settings, 
  Shield, 
  BarChart3,
  MessageSquare,
  Folder
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'sessions', label: 'Session Notes', icon: FileText },
  { id: 'resources', label: 'Client Resources', icon: BookOpen },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: Folder },
  { id: 'communications', label: 'Communications', icon: MessageSquare },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-gradient-sage shadow-lg border-r border-primary-sage/20 h-screen animate-slide-in-left">
      <div className="p-6 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-white animate-float" />
          <div>
            <h1 className="text-lg font-heading font-bold text-white">TherapyPro</h1>
            <p className="text-sm text-white/80">Vicky Kedemi Practice</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 animate-stagger-reveal">
        <div className="px-3 space-y-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:transform hover:scale-105 animate-stagger-reveal ${
                  isActive
                    ? 'bg-white/20 text-white border-r-2 border-white shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-5 h-5 mr-3 transition-transform duration-300" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};