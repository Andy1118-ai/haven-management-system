import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { mockStaff } from '../../data/mockData';
import { Staff } from '../../types';
import { Search, Plus, Edit, Calendar, Phone, Mail, Clock } from 'lucide-react';

export const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const filteredStaff = mockStaff.filter(staff =>
    `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'therapist': return 'info';
      case 'admin': return 'success';
      case 'receptionist': return 'warning';
      default: return 'default';
    }
  };

  const formatSchedule = (schedule: any) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return days.map(day => {
      const daySchedule = schedule[day];
      if (!daySchedule) return null;
      return {
        day: day.charAt(0).toUpperCase() + day.slice(1),
        hours: `${daySchedule.start} - ${daySchedule.end}`
      };
    }).filter(Boolean);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <Button icon={Plus}>Add Staff Member</Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search staff by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff List */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Directory ({filteredStaff.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredStaff.map((staff) => (
                <div
                  key={staff.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedStaff?.id === staff.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStaff(staff)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {staff.firstName} {staff.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{staff.email}</p>
                      <p className="text-sm text-gray-500">{staff.phone}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant={getRoleColor(staff.role)}>
                        {staff.role}
                      </Badge>
                      <Badge variant={staff.isActive ? 'success' : 'danger'}>
                        {staff.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Details */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStaff ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedStaff.firstName} {selectedStaff.lastName}
                    </h2>
                    <p className="text-gray-600 capitalize">{selectedStaff.role}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" icon={Edit}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" icon={Calendar}>
                      Schedule
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Information
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedStaff.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedStaff.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Information
                    </label>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm"><strong>Type:</strong> {selectedStaff.license.type}</p>
                      <p className="text-sm"><strong>Number:</strong> {selectedStaff.license.number}</p>
                      <p className="text-sm"><strong>Expires:</strong> {new Date(selectedStaff.license.expirationDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {selectedStaff.specializations.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specializations
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {selectedStaff.specializations.map((specialization, index) => (
                          <Badge key={index} variant="info" size="sm">
                            {specialization}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weekly Schedule
                    </label>
                    <div className="space-y-2">
                      {formatSchedule(selectedStaff.schedule).map((daySchedule, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{daySchedule.day}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{daySchedule.hours}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Member since: {new Date(selectedStaff.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Select a staff member to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};