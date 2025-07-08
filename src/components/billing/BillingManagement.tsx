import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { formatKES } from '../../utils/currency';
import { mockInvoices, mockPatients } from '../../data/mockData';
import { DollarSign, Search, Download, Plus, Eye, Send } from 'lucide-react';

export const BillingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = getPatientName(invoice.patientId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockInvoices.reduce((sum, invoice) => 
    invoice.status === 'paid' ? sum + invoice.amount : sum, 0
  );

  const pendingAmount = mockInvoices.reduce((sum, invoice) => 
    invoice.status === 'pending' ? sum + invoice.amount : sum, 0
  );

  const overdueAmount = mockInvoices.reduce((sum, invoice) => 
    invoice.status === 'overdue' ? sum + invoice.amount : sum, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
        <Button icon={Plus}>Create Invoice</Button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatKES(totalRevenue)}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">{formatKES(pendingAmount)}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Amount</p>
                <p className="text-2xl font-bold text-red-600">{formatKES(overdueAmount)}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button variant="outline" icon={Download}>
          Export
        </Button>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Insurance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      #{invoice.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {getPatientName(invoice.patientId)}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {formatKES(invoice.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {invoice.insuranceClaim ? (
                        <Badge variant={invoice.insuranceClaim.status === 'approved' ? 'success' : 'warning'}>
                          {invoice.insuranceClaim.status}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" icon={Eye} />
                        <Button size="sm" variant="ghost" icon={Send} />
                        <Button size="sm" variant="ghost" icon={Download} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};