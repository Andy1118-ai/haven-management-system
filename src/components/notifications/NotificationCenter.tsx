import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  Calendar, 
  DollarSign,
  Users,
  FileText,
  Clock,
  CheckCircle,
  Trash2,
  Settings,
  Filter
} from 'lucide-react';

export interface Notification {
  id: string;
  type: 'appointment' | 'payment' | 'system' | 'reminder' | 'alert' | 'info';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
  relatedId?: string;
  relatedType?: 'patient' | 'appointment' | 'invoice' | 'staff';
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'payment': return DollarSign;
      case 'reminder': return Clock;
      case 'alert': return AlertTriangle;
      case 'system': return Settings;
      default: return Info;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'info';
      case 'payment': return 'success';
      case 'reminder': return 'warning';
      case 'alert': return 'danger';
      case 'system': return 'default';
      default: return 'info';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.isRead) return false;
    if (filter === 'urgent' && notification.priority !== 'urgent') return false;
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50 pt-16 pr-4">
      <Card className="w-96 max-h-[80vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <CardTitle>Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="danger" size="sm">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button size="sm" variant="ghost" icon={X} onClick={onClose} />
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex border border-gray-300 rounded-md">
              {['all', 'unread', 'urgent'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  className={`px-3 py-1 text-xs capitalize ${
                    filter === filterType
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {filterType}
                  {filterType === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
                  {filterType === 'urgent' && urgentCount > 0 && ` (${urgentCount})`}
                </button>
              ))}
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2 py-1 text-xs border border-gray-300 rounded-md"
            >
              <option value="all">All Types</option>
              <option value="appointment">Appointments</option>
              <option value="payment">Payments</option>
              <option value="reminder">Reminders</option>
              <option value="alert">Alerts</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 mt-3">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onClearAll}
              disabled={notifications.length === 0}
            >
              Clear All
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No notifications found</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium ${
                              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-1">
                              <Badge variant={getTypeColor(notification.type)} size="sm">
                                {notification.type}
                              </Badge>
                              {notification.priority === 'urgent' && (
                                <Badge variant="danger" size="sm">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                            
                            <div className="flex items-center space-x-1">
                              {!notification.isRead && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  icon={Check}
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className="text-xs"
                                >
                                  Mark Read
                                </Button>
                              )}
                              
                              {notification.actionUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {notification.actionLabel || 'View'}
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                variant="ghost"
                                icon={Trash2}
                                onClick={() => onDeleteNotification(notification.id)}
                                className="text-xs text-red-600 hover:text-red-700"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Notification Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'John Doe has an appointment in 30 minutes',
      priority: 'high',
      isRead: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      actionUrl: '/appointments',
      actionLabel: 'View Schedule'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of KES 15,000 received from Sarah Johnson',
      priority: 'medium',
      isRead: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      actionUrl: '/billing',
      actionLabel: 'View Invoice'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Session Notes Pending',
      message: 'You have 3 session notes that need to be completed',
      priority: 'medium',
      isRead: true,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      actionUrl: '/sessions',
      actionLabel: 'Complete Notes'
    },
    {
      id: '4',
      type: 'alert',
      title: 'License Expiration Warning',
      message: 'Your professional license expires in 30 days',
      priority: 'urgent',
      isRead: false,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      actionUrl: '/settings',
      actionLabel: 'Update License'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2:00 AM - 4:00 AM',
      priority: 'low',
      isRead: true,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      type: 'appointment',
      title: 'Appointment Cancelled',
      message: 'Michael Ochieng cancelled his appointment for tomorrow',
      priority: 'medium',
      isRead: false,
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      actionUrl: '/appointments',
      actionLabel: 'Reschedule'
    }
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications for demo purposes
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const types = ['appointment', 'payment', 'reminder', 'alert', 'system'];
        const priorities = ['low', 'medium', 'high', 'urgent'];
        const messages = [
          'New appointment scheduled',
          'Payment reminder sent',
          'Session note completed',
          'Insurance claim approved',
          'System backup completed'
        ];

        addNotification({
          type: types[Math.floor(Math.random() * types.length)] as any,
          title: 'New Notification',
          message: messages[Math.floor(Math.random() * messages.length)],
          priority: priorities[Math.floor(Math.random() * priorities.length)] as any,
          isRead: false
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };
};