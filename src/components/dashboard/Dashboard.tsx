import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatKES, formatKESCompact } from '../../utils/currency';
import { mockInvoices } from '../../data/mockData';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Calculate revenue metrics
  const totalRevenue = mockInvoices.reduce((sum, invoice) => 
    invoice.status === 'paid' ? sum + invoice.amount : sum, 0
  );
  
  const pendingAmount = mockInvoices.reduce((sum, invoice) => 
    invoice.status === 'pending' ? sum + invoice.amount : sum, 0
  );

  const stats = [
    {
      title: 'Total Patients',
      value: '4',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Today\'s Appointments',
      value: '2',
      change: '+2',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: formatKESCompact(totalRevenue),
      change: '+8%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Claims',
      value: formatKESCompact(pendingAmount),
      change: '-3',
      icon: FileText,
      color: 'text-orange-600'
    }
  ];

  const upcomingAppointments = [
    { time: '09:00', patient: 'John Doe', type: 'Individual Therapy', status: 'confirmed' },
    { time: '10:30', patient: 'Sarah Johnson', type: 'Initial Assessment', status: 'pending' },
    { time: '14:00', patient: 'Michael Ochieng', type: 'Follow-up Session', status: 'confirmed' },
    { time: '15:30', patient: 'Grace Wanjiku', type: 'Individual Therapy', status: 'confirmed' }
  ];

  const recentActivity = [
    { action: 'New patient registered', patient: 'Grace Wanjiku', time: '10 minutes ago' },
    { action: 'Session note completed', patient: 'John Doe', time: '30 minutes ago' },
    { action: 'Payment received', patient: 'Michael Ochieng', time: '1 hour ago' },
    { action: 'Appointment scheduled', patient: 'Sarah Johnson', time: '2 hours ago' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-gray-900 animate-slide-in-left">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-all duration-300 hover-lift flip-card animate-stagger-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between flip-card-inner">
                  <div>
                    <p className="text-sm text-gray-600 font-body">{stat.title}</p>
                    <p className="text-2xl font-heading font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-accent-sky-dark">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-primary-sage/10 ${stat.color} animate-float`}>
                    <Icon className="w-6 h-6 transition-transform duration-300 hover:scale-110" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="animate-slide-in-left animate-delay-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-sage" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-primary-sage/5 rounded-lg hover-lift transition-all duration-300 animate-stagger-reveal" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-heading font-medium text-gray-900">
                      {appointment.time}
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-gray-900">
                        {appointment.patient}
                      </p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <Badge variant={appointment.status === 'confirmed' ? 'success' : 'warning'}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="animate-slide-in-right animate-delay-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-accent-sky" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-accent-sky/5 rounded-lg hover-lift transition-all duration-300 animate-stagger-reveal" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                  <div className="w-2 h-2 bg-accent-sky rounded-full mt-2 animate-pulse-gentle"></div>
                  <div className="flex-1">
                    <p className="text-sm font-body text-gray-900">{activity.action}</p>
                    <p className="text-sm font-heading font-medium text-gray-700">{activity.patient}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-up animate-delay-500">
        <Card className="border-l-4 border-l-red-500 hover-glow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse-gentle" />
              <div>
                <h3 className="font-heading font-medium text-gray-900">Overdue Payments</h3>
                <p className="text-sm font-body text-gray-600">3 patients have overdue payments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover-glow animate-delay-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500 animate-pulse-gentle" />
              <div>
                <h3 className="font-heading font-medium text-gray-900">License Renewals</h3>
                <p className="text-sm font-body text-gray-600">2 licenses expire in 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover-glow animate-delay-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 animate-pulse-gentle" />
              <div>
                <h3 className="font-heading font-medium text-gray-900">Insurance Claims</h3>
                <p className="text-sm font-body text-gray-600">8 claims approved this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};