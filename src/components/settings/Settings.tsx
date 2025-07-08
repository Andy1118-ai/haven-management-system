import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette,
  Clock,
  Globe,
  Lock,
  Users,
  Zap,
  Save,
  Upload,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('practice');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock settings data
  const [practiceSettings, setPracticeSettings] = useState({
    practiceName: 'Vicky Kedemi Practice',
    address: {
      street: '123 Therapy Lane',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      country: 'Kenya'
    },
    contact: {
      phone: '+254722123456',
      email: 'info@vickykademipractice.com',
      website: 'www.vickykademipractice.com'
    },
    businessHours: {
      monday: { isOpen: true, start: '09:00', end: '17:00' },
      tuesday: { isOpen: true, start: '09:00', end: '17:00' },
      wednesday: { isOpen: true, start: '09:00', end: '17:00' },
      thursday: { isOpen: true, start: '09:00', end: '17:00' },
      friday: { isOpen: true, start: '09:00', end: '15:00' },
      saturday: { isOpen: false },
      sunday: { isOpen: false }
    },
    timezone: 'Africa/Nairobi',
    currency: 'KES',
    language: 'en'
  });

  const [userPermissions, setUserPermissions] = useState([
    {
      id: '1',
      name: 'Dr. Vicky Kedemi',
      role: 'admin',
      email: 'vicky.kedemi@practice.com',
      permissions: ['all'],
      isActive: true
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      role: 'receptionist',
      email: 'emily.rodriguez@practice.com',
      permissions: ['read:patients', 'write:appointments', 'read:billing'],
      isActive: true
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true
    },
    auditLogging: true,
    dataEncryption: true,
    backupFrequency: 'daily'
  });

  const [automationRules, setAutomationRules] = useState([
    {
      id: '1',
      name: 'Appointment Reminder',
      trigger: 'appointment_created',
      action: 'send_email',
      isActive: true,
      description: 'Send email reminder 24 hours before appointment'
    },
    {
      id: '2',
      name: 'Payment Reminder',
      trigger: 'invoice_overdue',
      action: 'send_sms',
      isActive: true,
      description: 'Send SMS reminder for overdue payments'
    },
    {
      id: '3',
      name: 'Session Note Reminder',
      trigger: 'session_completed',
      action: 'create_task',
      isActive: false,
      description: 'Create task reminder to complete session notes'
    }
  ]);

  const handleSave = async (section: string) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Saving ${section} settings`);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderPracticeSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Practice Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Practice Name"
              value={practiceSettings.practiceName}
              onChange={(e) => setPracticeSettings(prev => ({ 
                ...prev, 
                practiceName: e.target.value 
              }))}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                value={practiceSettings.contact.phone}
                onChange={(e) => setPracticeSettings(prev => ({ 
                  ...prev, 
                  contact: { ...prev.contact, phone: e.target.value }
                }))}
              />
              <Input
                label="Email"
                type="email"
                value={practiceSettings.contact.email}
                onChange={(e) => setPracticeSettings(prev => ({ 
                  ...prev, 
                  contact: { ...prev.contact, email: e.target.value }
                }))}
              />
            </div>
            
            <Input
              label="Website"
              value={practiceSettings.contact.website}
              onChange={(e) => setPracticeSettings(prev => ({ 
                ...prev, 
                contact: { ...prev.contact, website: e.target.value }
              }))}
            />
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Address</h4>
              <div className="space-y-3">
                <Input
                  label="Street Address"
                  value={practiceSettings.address.street}
                  onChange={(e) => setPracticeSettings(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, street: e.target.value }
                  }))}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    label="City"
                    value={practiceSettings.address.city}
                    onChange={(e) => setPracticeSettings(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, city: e.target.value }
                    }))}
                  />
                  <Input
                    label="County"
                    value={practiceSettings.address.state}
                    onChange={(e) => setPracticeSettings(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, state: e.target.value }
                    }))}
                  />
                  <Input
                    label="Postal Code"
                    value={practiceSettings.address.zipCode}
                    onChange={(e) => setPracticeSettings(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, zipCode: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => handleSave('practice')} 
                icon={Save}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(practiceSettings.businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-24">
                  <span className="text-sm font-medium capitalize">{day}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hours.isOpen}
                    onChange={(e) => setPracticeSettings(prev => ({
                      ...prev,
                      businessHours: {
                        ...prev.businessHours,
                        [day]: { ...hours, isOpen: e.target.checked }
                      }
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Open</span>
                </div>
                {hours.isOpen && (
                  <>
                    <input
                      type="time"
                      value={hours.start}
                      onChange={(e) => setPracticeSettings(prev => ({
                        ...prev,
                        businessHours: {
                          ...prev.businessHours,
                          [day]: { ...hours, start: e.target.value }
                        }
                      }))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-sm">to</span>
                    <input
                      type="time"
                      value={hours.end}
                      onChange={(e) => setPracticeSettings(prev => ({
                        ...prev,
                        businessHours: {
                          ...prev.businessHours,
                          [day]: { ...hours, end: e.target.value }
                        }
                      }))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserPermissions = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <Button icon={Users}>
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userPermissions.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.role === 'admin' ? 'success' : 'info'}>
                      {user.role}
                    </Badge>
                    <Badge variant={user.isActive ? 'success' : 'danger'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map((permission, index) => (
                      <Badge key={index} variant="info" size="sm">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Permissions
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Require 2FA for all users</p>
              </div>
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings(prev => ({ 
                  ...prev, 
                  twoFactorAuth: e.target.checked 
                }))}
                className="rounded border-gray-300"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Audit Logging</h4>
                <p className="text-sm text-gray-600">Log all user activities</p>
              </div>
              <input
                type="checkbox"
                checked={securitySettings.auditLogging}
                onChange={(e) => setSecuritySettings(prev => ({ 
                  ...prev, 
                  auditLogging: e.target.checked 
                }))}
                className="rounded border-gray-300"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Data Encryption</h4>
                <p className="text-sm text-gray-600">Encrypt sensitive data at rest</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-600">Enabled</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings(prev => ({ 
                  ...prev, 
                  sessionTimeout: parseInt(e.target.value) 
                }))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                min="5"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backup Frequency
              </label>
              <select
                value={securitySettings.backupFrequency}
                onChange={(e) => setSecuritySettings(prev => ({ 
                  ...prev, 
                  backupFrequency: e.target.value 
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>HIPAA Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <h4 className="font-medium text-green-900">Encryption Standards</h4>
                <p className="text-sm text-green-700">AES-256 encryption implemented</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <h4 className="font-medium text-green-900">Access Controls</h4>
                <p className="text-sm text-green-700">Role-based permissions active</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <h4 className="font-medium text-yellow-900">Business Associate Agreements</h4>
                <p className="text-sm text-yellow-700">Review required for third-party services</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAutomationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Automation Rules</CardTitle>
            <Button icon={Zap}>
              Create Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{rule.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={rule.isActive ? 'success' : 'default'}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <input
                      type="checkbox"
                      checked={rule.isActive}
                      onChange={(e) => setAutomationRules(prev => 
                        prev.map(r => r.id === rule.id ? { ...r, isActive: e.target.checked } : r)
                      )}
                      className="rounded border-gray-300"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-500">
                    Trigger: <span className="font-medium">{rule.trigger}</span>
                  </span>
                  <span className="text-gray-500">
                    Action: <span className="font-medium">{rule.action}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={practiceSettings.timezone}
                  onChange={(e) => setPracticeSettings(prev => ({ 
                    ...prev, 
                    timezone: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  value={practiceSettings.currency}
                  onChange={(e) => setPracticeSettings(prev => ({ 
                    ...prev, 
                    currency: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="KES">Kenyan Shilling (KES)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={practiceSettings.language}
                onChange={(e) => setPracticeSettings(prev => ({ 
                  ...prev, 
                  language: e.target.value 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="en">English</option>
                <option value="sw">Swahili</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Export Data</h4>
                <p className="text-sm text-gray-600">Download all practice data</p>
              </div>
              <Button variant="outline" icon={Download}>
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Import Data</h4>
                <p className="text-sm text-gray-600">Import data from another system</p>
              </div>
              <Button variant="outline" icon={Upload}>
                Import
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
              <div>
                <h4 className="font-medium text-red-900">Reset System</h4>
                <p className="text-sm text-red-700">Clear all data and reset to defaults</p>
              </div>
              <Button variant="danger" icon={RefreshCw}>
                Reset
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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <Button variant="outline" icon={RefreshCw}>
          Refresh
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'practice', label: 'Practice', icon: SettingsIcon },
            { id: 'users', label: 'Users & Permissions', icon: Users },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'automation', label: 'Automation', icon: Zap },
            { id: 'system', label: 'System', icon: Globe }
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
      {activeTab === 'practice' && renderPracticeSettings()}
      {activeTab === 'users' && renderUserPermissions()}
      {activeTab === 'security' && renderSecuritySettings()}
      {activeTab === 'automation' && renderAutomationSettings()}
      {activeTab === 'system' && renderSystemSettings()}
    </div>
  );
};