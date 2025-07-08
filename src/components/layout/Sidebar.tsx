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
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">TherapyPro</h1>
            <p className="text-sm text-gray-500">Vicky Kedemi Practice</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};