import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Send, 
  Phone, 
  Video,
  Mail,
  Bell,
  Users,
  Calendar,
  Lock,
  Star,
  Archive,
  Paperclip,
  Mic,
  Settings
} from 'lucide-react';

export const CommunicationsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: '1',
      participant: 'John Doe',
      lastMessage: 'Thank you for the session today. I feel much better.',
      timestamp: '2024-01-28T15:30:00Z',
      unread: 2,
      priority: 'normal',
      isEncrypted: true
    },
    {
      id: '2',
      participant: 'Sarah Johnson',
      lastMessage: 'Can we reschedule our appointment for next week?',
      timestamp: '2024-01-28T10:15:00Z',
      unread: 0,
      priority: 'high',
      isEncrypted: true
    },
    {
      id: '3',
      participant: 'Michael Ochieng',
      lastMessage: 'I completed the homework assignment you gave me.',
      timestamp: '2024-01-27T18:45:00Z',
      unread: 1,
      priority: 'normal',
      isEncrypted: true
    }
  ];

  // Mock data for messages
  const messages = [
    {
      id: '1',
      conversationId: '1',
      senderId: 'patient',
      content: 'Hi Dr. Kedemi, I wanted to follow up on our session today.',
      timestamp: '2024-01-28T14:30:00Z',
      isRead: true
    },
    {
      id: '2',
      conversationId: '1',
      senderId: 'therapist',
      content: 'Hello John! I\'m glad you reached out. How are you feeling after our session?',
      timestamp: '2024-01-28T14:45:00Z',
      isRead: true
    },
    {
      id: '3',
      conversationId: '1',
      senderId: 'patient',
      content: 'Thank you for the session today. I feel much better.',
      timestamp: '2024-01-28T15:30:00Z',
      isRead: false
    }
  ];

  // Mock data for reminders
  const reminders = [
    {
      id: '1',
      patientName: 'John Doe',
      type: 'appointment',
      scheduledFor: '2024-01-29T09:00:00Z',
      status: 'scheduled',
      method: 'email'
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      type: 'appointment',
      scheduledFor: '2024-01-29T14:00:00Z',
      status: 'sent',
      method: 'sms'
    },
    {
      id: '3',
      patientName: 'Grace Wanjiku',
      type: 'homework',
      scheduledFor: '2024-01-30T10:00:00Z',
      status: 'scheduled',
      method: 'email'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'success';
      case 'delivered': return 'info';
      case 'failed': return 'danger';
      default: return 'warning';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const renderMessagesTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversations List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button size="sm" icon={Plus}>
                New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{conversation.participant}</h4>
                    <div className="flex items-center space-x-1">
                      {conversation.isEncrypted && (
                        <Lock className="w-3 h-3 text-green-500" />
                      )}
                      {conversation.unread > 0 && (
                        <Badge variant="danger" size="sm">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.timestamp).toLocaleTimeString()}
                    </span>
                    <Badge variant={getPriorityColor(conversation.priority)} size="sm">
                      {conversation.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Thread */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedConversation 
                  ? conversations.find(c => c.id === selectedConversation)?.participant
                  : 'Select a conversation'
                }
              </CardTitle>
              {selectedConversation && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" icon={Phone} />
                  <Button size="sm" variant="outline" icon={Video} />
                  <Button size="sm" variant="outline" icon={Archive} />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedConversation ? (
              <div className="space-y-4">
                {/* Messages */}
                <div className="h-96 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
                  {messages
                    .filter(m => m.conversationId === selectedConversation)
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === 'therapist' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === 'therapist'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'therapist' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" icon={Paperclip} />
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline" icon={Mic} />
                  <Button size="sm" icon={Send} onClick={handleSendMessage} />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRemindersTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Appointment Reminders</CardTitle>
            <Button size="sm" icon={Plus}>
              Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.filter(r => r.type === 'appointment').map((reminder) => (
              <div
                key={reminder.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{reminder.patientName}</h4>
                  <Badge variant={getStatusColor(reminder.status)}>
                    {reminder.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>
                    {new Date(reminder.scheduledFor).toLocaleDateString()} at{' '}
                    {new Date(reminder.scheduledFor).toLocaleTimeString()}
                  </span>
                  <span className="capitalize">via {reminder.method}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reminder Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email Reminders</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">SMS Reminders</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">24 Hour Reminder</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">2 Hour Reminder</span>
              <input type="checkbox" className="rounded" />
            </div>
            <Button className="w-full" variant="outline">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVideoSessionsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Video Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">John Doe</h4>
                <Badge variant="info">Scheduled</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Tomorrow at 2:00 PM - Individual Therapy
              </p>
              <div className="flex space-x-2">
                <Button size="sm" icon={Video}>
                  Start Session
                </Button>
                <Button size="sm" variant="outline">
                  Send Link
                </Button>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                <Badge variant="warning">Pending</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Wednesday at 10:00 AM - Assessment
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" icon={Calendar}>
                  Reschedule
                </Button>
                <Button size="sm" variant="outline">
                  Send Link
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Session Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Session Duration
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>50 minutes</option>
                <option>60 minutes</option>
                <option>90 minutes</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-record sessions</span>
              <input type="checkbox" className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Waiting room enabled</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Send session links automatically</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <Button className="w-full" variant="outline">
              Test Video Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMassCommTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mass Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipients
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>All Active Patients</option>
                <option>Patients with Upcoming Appointments</option>
                <option>Patients with Overdue Payments</option>
                <option>Custom Group</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Communication Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="commType" value="email" defaultChecked className="mr-2" />
                  Email
                </label>
                <label className="flex items-center">
                  <input type="radio" name="commType" value="sms" className="mr-2" />
                  SMS
                </label>
              </div>
            </div>
            
            <Input
              label="Subject"
              placeholder="Enter message subject..."
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button icon={Send}>
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Communications Hub</h1>
        <div className="flex space-x-3">
          <Button variant="outline" icon={Settings}>
            Settings
          </Button>
          <Button icon={Plus}>
            New Message
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'messages', label: 'Secure Messages', icon: MessageSquare },
            { id: 'reminders', label: 'Reminders', icon: Bell },
            { id: 'video', label: 'Video Sessions', icon: Video },
            { id: 'mass', label: 'Mass Communication', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'messages' && renderMessagesTab()}
      {activeTab === 'reminders' && renderRemindersTab()}
      {activeTab === 'video' && renderVideoSessionsTab()}
      {activeTab === 'mass' && renderMassCommTab()}
    </div>
  );
};