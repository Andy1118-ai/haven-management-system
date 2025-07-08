import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { mockAppointments, mockPatients, mockStaff } from '../../data/mockData';
import { Calendar, Clock, Plus, Edit, Trash2, Phone, Mail } from 'lucide-react';

export const AppointmentScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getTherapistName = (therapistId: string) => {
    const therapist = mockStaff.find(s => s.id === therapistId);
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'no-show': return 'warning';
      default: return 'default';
    }
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const filteredAppointments = mockAppointments.filter(app => app.date === selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Scheduler</h1>
        <Button icon={Plus}>New Appointment</Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex border border-gray-300 rounded-md">
          {['day', 'week', 'month'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as 'day' | 'week' | 'month')}
              className={`px-4 py-2 text-sm capitalize ${
                viewMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Slots */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {timeSlots.map((time) => {
                  const appointment = filteredAppointments.find(app => app.time === time);
                  
                  return (
                    <div
                      key={time}
                      className={`flex items-center p-3 rounded-lg border ${
                        appointment ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="w-16 text-sm font-medium text-gray-900">
                        {time}
                      </div>
                      
                      {appointment ? (
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {getPatientName(appointment.patientId)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {appointment.type} • {appointment.duration} min
                            </p>
                            <p className="text-sm text-gray-500">
                              with {getTherapistName(appointment.therapistId)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost" icon={Edit} />
                              <Button size="sm" variant="ghost" icon={Trash2} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 text-center">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            icon={Plus}
                          >
                            Schedule Appointment
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Appointments</span>
                  <span className="font-medium">{filteredAppointments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confirmed</span>
                  <span className="font-medium text-green-600">
                    {filteredAppointments.filter(a => a.status === 'scheduled').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-medium text-blue-600">
                    {filteredAppointments.filter(a => a.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cancelled</span>
                  <span className="font-medium text-red-600">
                    {filteredAppointments.filter(a => a.status === 'cancelled').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline" icon={Phone}>
                  Call Next Patient
                </Button>
                <Button className="w-full" variant="outline" icon={Mail}>
                  Send Reminders
                </Button>
                <Button className="w-full" variant="outline" icon={Clock}>
                  Reschedule
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center text-gray-500 py-4">
                  <p className="text-sm">No upcoming appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};