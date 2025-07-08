import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { formatKES } from '../../utils/currency';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  DollarSign,
  Users,
  Clock,
  Target,
  FileText,
  Filter,
  RefreshCw,
  PieChart,
  LineChart
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('financial');

  // Mock analytics data
  const financialMetrics = {
    totalRevenue: 245000,
    monthlyGrowth: 12.5,
    averageSessionFee: 18000,
    collectionRate: 94.2,
    outstandingAmount: 45000,
    paidInvoices: 28,
    pendingInvoices: 8
  };

  const clinicalMetrics = {
    totalPatients: 47,
    activePatients: 42,
    newPatients: 8,
    completedSessions: 156,
    cancelledSessions: 12,
    noShowRate: 5.8,
    averageSessionsPerPatient: 3.7
  };

  const operationalMetrics = {
    appointmentUtilization: 87.5,
    averageWaitTime: 3.2,
    patientSatisfaction: 4.8,
    staffUtilization: 92.3,
    documentCompletionRate: 96.1
  };

  const recentReports = [
    {
      id: '1',
      name: 'Monthly Financial Summary',
      type: 'financial',
      generatedAt: '2024-01-28T10:00:00Z',
      format: 'PDF'
    },
    {
      id: '2',
      name: 'Patient Outcomes Report',
      type: 'clinical',
      generatedAt: '2024-01-27T15:30:00Z',
      format: 'Excel'
    },
    {
      id: '3',
      name: 'HIPAA Compliance Audit',
      type: 'compliance',
      generatedAt: '2024-01-26T09:15:00Z',
      format: 'PDF'
    }
  ];

  const chartData = {
    revenue: [
      { month: 'Jan', amount: 180000 },
      { month: 'Feb', amount: 195000 },
      { month: 'Mar', amount: 210000 },
      { month: 'Apr', amount: 225000 },
      { month: 'May', amount: 245000 }
    ],
    patients: [
      { month: 'Jan', new: 5, total: 35 },
      { month: 'Feb', new: 7, total: 38 },
      { month: 'Mar', new: 6, total: 41 },
      { month: 'Apr', new: 8, total: 45 },
      { month: 'May', new: 8, total: 47 }
    ]
  };

  const getMetricColor = (value: number, threshold: number, inverse = false) => {
    if (inverse) {
      return value <= threshold ? 'text-green-600' : 'text-red-600';
    }
    return value >= threshold ? 'text-green-600' : 'text-red-600';
  };

  const renderFinancialDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatKES(financialMetrics.totalRevenue)}
              </p>
              <p className={`text-sm ${getMetricColor(financialMetrics.monthlyGrowth, 10)}`}>
                +{financialMetrics.monthlyGrowth}% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {financialMetrics.collectionRate}%
              </p>
              <p className={`text-sm ${getMetricColor(financialMetrics.collectionRate, 90)}`}>
                Excellent performance
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Session Fee</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatKES(financialMetrics.averageSessionFee)}
              </p>
              <p className="text-sm text-gray-600">
                Per session
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Outstanding Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatKES(financialMetrics.outstandingAmount)}
              </p>
              <p className="text-sm text-gray-600">
                {financialMetrics.pendingInvoices} pending invoices
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClinicalDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">
                {clinicalMetrics.totalPatients}
              </p>
              <p className="text-sm text-green-600">
                +{clinicalMetrics.newPatients} new this month
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {clinicalMetrics.completedSessions}
              </p>
              <p className="text-sm text-gray-600">
                This month
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">No-Show Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {clinicalMetrics.noShowRate}%
              </p>
              <p className={`text-sm ${getMetricColor(clinicalMetrics.noShowRate, 10, true)}`}>
                Below industry average
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Sessions/Patient</p>
              <p className="text-2xl font-bold text-gray-900">
                {clinicalMetrics.averageSessionsPerPatient}
              </p>
              <p className="text-sm text-gray-600">
                Treatment engagement
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOperationalDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Appointment Utilization</p>
              <p className="text-2xl font-bold text-gray-900">
                {operationalMetrics.appointmentUtilization}%
              </p>
              <p className={`text-sm ${getMetricColor(operationalMetrics.appointmentUtilization, 80)}`}>
                Optimal utilization
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Patient Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">
                {operationalMetrics.patientSatisfaction}/5.0
              </p>
              <p className={`text-sm ${getMetricColor(operationalMetrics.patientSatisfaction, 4.5)}`}>
                Excellent rating
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Document Completion</p>
              <p className="text-2xl font-bold text-gray-900">
                {operationalMetrics.documentCompletionRate}%
              </p>
              <p className={`text-sm ${getMetricColor(operationalMetrics.documentCompletionRate, 95)}`}>
                Compliance ready
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <Button variant="outline" icon={RefreshCw}>
            Refresh Data
          </Button>
          <Button icon={Download}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex border border-gray-300 rounded-md">
          {[
            { id: 'financial', label: 'Financial', icon: DollarSign },
            { id: 'clinical', label: 'Clinical', icon: Target },
            { id: 'operational', label: 'Operational', icon: BarChart3 }
          ].map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm ${
                  selectedReport === report.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{report.label}</span>
              </button>
            );
          })}
        </div>

        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>

        <Button variant="outline" icon={Filter}>
          Custom Filter
        </Button>
      </div>

      {/* Dashboard Content */}
      {selectedReport === 'financial' && renderFinancialDashboard()}
      {selectedReport === 'clinical' && renderClinicalDashboard()}
      {selectedReport === 'operational' && renderOperationalDashboard()}

      {/* Charts and Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Revenue chart visualization</p>
                  <p className="text-sm text-gray-400">
                    {chartData.revenue.map(item => `${item.month}: ${formatKES(item.amount)}`).join(' | ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{report.name}</h4>
                    <Badge variant="info" size="sm">
                      {report.format}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(report.generatedAt).toLocaleDateString()}
                  </p>
                  <Button size="sm" variant="outline" icon={Download} className="w-full">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Growth & Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Patient growth visualization</p>
              <p className="text-sm text-gray-400">
                Total: {clinicalMetrics.totalPatients} | Active: {clinicalMetrics.activePatients} | New: {clinicalMetrics.newPatients}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Financial Summary</option>
                <option>Patient Outcomes</option>
                <option>Appointment Analytics</option>
                <option>Compliance Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>Custom range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full" icon={FileText}>
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};