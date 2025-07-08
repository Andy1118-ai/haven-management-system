import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { PatientForm } from './PatientForm';
import { LoadingOverlay } from '../ui/LoadingSpinner';
import { usePatients } from '../../hooks/usePatients';
import { useToastNotifications } from '../notifications/NotificationToast';
import { formatKES } from '../../utils/currency';
import { Database } from '../../types/database';
import { Search, Plus, Eye, Edit, Phone, Mail, Calendar } from 'lucide-react';

type Patient = Database['public']['Tables']['patients']['Row'];

export const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  
  const { 
    patients, 
    loading, 
    error, 
    createPatient, 
    updatePatient, 
    searchPatients 
  } = usePatients();
  
  const { showSuccess, showError } = useToastNotifications();

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleSavePatient = async (patientData: any) => {
    try {
      let result;
      
      if (editingPatient) {
        result = await updatePatient(editingPatient.id, patientData);
      } else {
        result = await createPatient(patientData);
      }
      
      if (result.success) {
        showSuccess(
          editingPatient ? 'Patient Updated' : 'Patient Created',
          `Patient ${patientData.first_name} ${patientData.last_name} has been ${editingPatient ? 'updated' : 'created'} successfully.`
        );
        setShowForm(false);
        setEditingPatient(null);
      } else {
        showError('Error', result.error || 'Failed to save patient');
      }
    } catch (error) {
      console.error('Error saving patient:', error);
      showError('Error', 'An unexpected error occurred while saving the patient');
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      await searchPatients(term);
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error loading patients: {error}</p>
        </div>
      </div>
    );
  }

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {editingPatient ? 'Edit Patient' : 'Add New Patient'}
          </h1>
        </div>
        <PatientForm
          patient={editingPatient}
          onSave={handleSavePatient}
          onCancel={handleCancelForm}
          isLoading={loading}
        />
      </div>
    );
  }

  return (
    <LoadingOverlay isLoading={loading}>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <Button icon={Plus} onClick={handleAddPatient}>Add New Patient</Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Directory ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {patient.first_name} {patient.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        DOB: {new Date(patient.date_of_birth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedPatient.first_name} {selectedPatient.last_name}
                    </h2>
                    <p className="text-gray-600">{selectedPatient.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" icon={Eye}>
                      View Full
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      icon={Edit}
                      onClick={() => handleEditPatient(selectedPatient)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedPatient.phone}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <span className="text-sm capitalize">{selectedPatient.gender}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedPatient.street}<br />
                    {selectedPatient.city}, {selectedPatient.state} {selectedPatient.zip_code}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedPatient.emergency_name} ({selectedPatient.emergency_relationship})
                    <br />
                    {selectedPatient.emergency_phone}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedPatient.insurance_provider}<br />
                    Policy: {selectedPatient.policy_number}<br />
                    Copay: {formatKES(selectedPatient.copay)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical History
                  </label>
                  <div className="space-y-2">
                    {selectedPatient.conditions.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-700">Conditions:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedPatient.conditions.map((condition, index) => (
                            <Badge key={index} variant="info" size="sm">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedPatient.medications.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-700">Medications:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedPatient.medications.map((medication, index) => (
                            <Badge key={index} variant="warning" size="sm">
                              {medication}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" icon={Calendar}>
                    Schedule Appointment
                  </Button>
                  <Button size="sm" variant="outline" icon={Mail}>
                    Send Message
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Select a patient to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </LoadingOverlay>
  );
};