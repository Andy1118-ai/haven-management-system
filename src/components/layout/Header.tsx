import React from 'react';
import { useState } from 'react';
import { Bell, Search, LogOut, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { NotificationCenter, useNotifications } from '../notifications/NotificationCenter';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  } = useNotifications();

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-96"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
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
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <Button variant="ghost" size="sm" icon={LogOut}>
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