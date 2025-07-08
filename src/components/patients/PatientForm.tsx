import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FormErrors, validateForm, validationPatterns, ValidationError } from '../ui/FormValidation';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Patient } from '../../types';
import { Save, X } from 'lucide-react';

interface PatientFormProps {
  patient?: Patient;
  onSave: (patient: Partial<Patient>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || '',
    lastName: patient?.lastName || '',
    dateOfBirth: patient?.dateOfBirth || '',
    gender: patient?.gender || 'prefer-not-to-say',
    phone: patient?.phone || '',
    email: patient?.email || '',
    street: patient?.address?.street || '',
    city: patient?.address?.city || '',
    state: patient?.address?.state || '',
    zipCode: patient?.address?.zipCode || '',
    emergencyName: patient?.emergencyContact?.name || '',
    emergencyRelationship: patient?.emergencyContact?.relationship || '',
    emergencyPhone: patient?.emergencyContact?.phone || '',
    insuranceProvider: patient?.insurance?.provider || '',
    policyNumber: patient?.insurance?.policyNumber || '',
    groupNumber: patient?.insurance?.groupNumber || '',
    copay: patient?.insurance?.copay?.toString() || '',
    conditions: patient?.medicalHistory?.conditions?.join(', ') || '',
    medications: patient?.medicalHistory?.medications?.join(', ') || '',
    allergies: patient?.medicalHistory?.allergies?.join(', ') || '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validationRules = {
    firstName: { required: true, minLength: 2, maxLength: 50 },
    lastName: { required: true, minLength: 2, maxLength: 50 },
    dateOfBirth: { required: true },
    phone: { 
      required: true, 
      pattern: validationPatterns.phone,
      custom: (value: string) => {
        if (value && !validationPatterns.phone.test(value)) {
          return 'Please enter a valid Kenyan phone number (e.g., +254722123456 or 0722123456)';
        }
        return null;
      }
    },
    email: { 
      required: true, 
      pattern: validationPatterns.email,
      custom: (value: string) => {
        if (value && !validationPatterns.email.test(value)) {
          return 'Please enter a valid email address';
        }
        return null;
      }
    },
    street: { required: true, minLength: 5 },
    city: { required: true, minLength: 2 },
    state: { required: true },
    zipCode: { 
      required: true, 
      pattern: validationPatterns.postalCode,
      custom: (value: string) => {
        if (value && !validationPatterns.postalCode.test(value)) {
          return 'Please enter a valid 5-digit postal code';
        }
        return null;
      }
    },
    emergencyName: { required: true, minLength: 2 },
    emergencyPhone: { 
      required: true, 
      pattern: validationPatterns.phone 
    },
    insuranceProvider: { required: true },
    policyNumber: { required: true, minLength: 5 },
    copay: { 
      required: true,
      custom: (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
          return 'Copay must be a valid positive number';
        }
        return null;
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific errors when user starts typing
    if (errors.some(error => error.field === field)) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, validationRules);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const patientData: Partial<Patient> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as Patient['gender'],
        phone: formData.phone,
        email: formData.email,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        emergencyContact: {
          name: formData.emergencyName,
          relationship: formData.emergencyRelationship,
          phone: formData.emergencyPhone,
        },
        insurance: {
          provider: formData.insuranceProvider,
          policyNumber: formData.policyNumber,
          groupNumber: formData.groupNumber,
          copay: parseFloat(formData.copay),
        },
        medicalHistory: {
          conditions: formData.conditions.split(',').map(c => c.trim()).filter(Boolean),
          medications: formData.medications.split(',').map(m => m.trim()).filter(Boolean),
          allergies: formData.allergies.split(',').map(a => a.trim()).filter(Boolean),
          previousTherapy: false,
        },
      };

      await onSave(patientData);
    } catch (error) {
      console.error('Error saving patient:', error);
      setErrors([{ field: 'general', message: 'Failed to save patient. Please try again.' }]);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <LoadingSpinner size="lg" text="Saving patient information..." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {patient ? 'Edit Patient' : 'Add New Patient'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormErrors errors={errors} />

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={errors.find(e => e.field === 'firstName')?.message}
              />
              <Input
                label="Last Name *"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={errors.find(e => e.field === 'lastName')?.message}
              />
              <Input
                label="Date of Birth *"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                error={errors.find(e => e.field === 'dateOfBirth')?.message}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number *"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+254722123456 or 0722123456"
                error={errors.find(e => e.field === 'phone')?.message}
              />
              <Input
                label="Email Address *"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.find(e => e.field === 'email')?.message}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
            <div className="space-y-4">
              <Input
                label="Street Address *"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                error={errors.find(e => e.field === 'street')?.message}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City *"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  error={errors.find(e => e.field === 'city')?.message}
                />
                <Input
                  label="County *"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="e.g., Nairobi County"
                  error={errors.find(e => e.field === 'state')?.message}
                />
                <Input
                  label="Postal Code *"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="e.g., 00100"
                  error={errors.find(e => e.field === 'zipCode')?.message}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Contact Name *"
                value={formData.emergencyName}
                onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                error={errors.find(e => e.field === 'emergencyName')?.message}
              />
              <Input
                label="Relationship"
                value={formData.emergencyRelationship}
                onChange={(e) => handleInputChange('emergencyRelationship', e.target.value)}
                placeholder="e.g., Spouse, Parent"
              />
              <Input
                label="Phone Number *"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                error={errors.find(e => e.field === 'emergencyPhone')?.message}
              />
            </div>
          </div>

          {/* Insurance Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Insurance Provider *"
                value={formData.insuranceProvider}
                onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                placeholder="e.g., NHIF, AAR Insurance"
                error={errors.find(e => e.field === 'insuranceProvider')?.message}
              />
              <Input
                label="Policy Number *"
                value={formData.policyNumber}
                onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                error={errors.find(e => e.field === 'policyNumber')?.message}
              />
              <Input
                label="Group Number"
                value={formData.groupNumber}
                onChange={(e) => handleInputChange('groupNumber', e.target.value)}
              />
              <Input
                label="Copay Amount (KES) *"
                type="number"
                value={formData.copay}
                onChange={(e) => handleInputChange('copay', e.target.value)}
                placeholder="e.g., 500"
                error={errors.find(e => e.field === 'copay')?.message}
              />
            </div>
          </div>

          {/* Medical History */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
            <div className="space-y-4">
              <Input
                label="Medical Conditions"
                value={formData.conditions}
                onChange={(e) => handleInputChange('conditions', e.target.value)}
                placeholder="Separate multiple conditions with commas"
                helpText="List any relevant medical or mental health conditions"
              />
              <Input
                label="Current Medications"
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                placeholder="Separate multiple medications with commas"
                helpText="Include dosage information if available"
              />
              <Input
                label="Allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder="Separate multiple allergies with commas"
                helpText="List any known drug or other allergies"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              icon={X}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              icon={Save}
              disabled={isLoading}
            >
              {patient ? 'Update Patient' : 'Save Patient'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};