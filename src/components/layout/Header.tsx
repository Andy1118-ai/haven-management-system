import React from 'react';
import { useState } from 'react';
import { Bell, Search, LogOut, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { useNotifications } from '../../hooks/useNotifications';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  user?: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ user: propUser }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { profile, signOut } = useAuth();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  } = useNotifications();

  const user = propUser || (profile ? {
    firstName: profile.first_name,
    lastName: profile.last_name,
    role: profile.role
  } : null);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-primary-sage/20 animate-slide-in-up">
      <div className="flex items-center justify-between px-6 py-4 animate-fade-in">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-sage transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="pl-10 pr-4 py-2 border border-primary-sage/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-primary-sage w-96 transition-all duration-300 hover:shadow-md"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 animate-slide-in-right">
          <button 
            className="relative p-2 text-primary-sage-dark hover:text-primary-sage rounded-full hover:bg-primary-sage/10 transition-all duration-300 hover:transform hover:scale-110"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5 animate-pulse-gentle" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1">
                <Badge variant="danger" size="sm">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              </div>
            )}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              {user && (
                <>
                  <p className="text-sm font-medium text-gray-900 font-heading">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-primary-sage-dark capitalize">{user.role}</p>
                </>
              )}
            </div>
            <div className="w-8 h-8 bg-gradient-sage-sky rounded-full flex items-center justify-center hover:transform hover:scale-110 transition-all duration-300">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <Button variant="ghost" size="sm" icon={LogOut} onClick={signOut}>
            Logout
          </Button>
        </div>
      </div>
      </header>

      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDeleteNotification={deleteNotification}
        onClearAll={clearAll}
      />
    </>
  );
};