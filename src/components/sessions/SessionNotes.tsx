import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Paperclip, 
  Target,
  TrendingUp,
  Calendar,
  User
} from 'lucide-react';

interface SessionNotesProps {}

export const SessionNotes: React.FC<SessionNotesProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for session notes
  const sessionNotes = [
    {
      id: '1',
      patientName: 'John Doe',
      date: '2024-01-28',
      sessionType: 'individual',
      template: 'CBT Session',
      status: 'completed',
      riskLevel: 'low',
      progress: 75
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      date: '2024-01-27',
      sessionType: 'assessment',
      template: 'Initial Assessment',
      status: 'draft',
      riskLevel: 'medium',
      progress: 40
    }
  ];

  const noteTemplates = [
    { id: '1', name: 'CBT Session', category: 'individual' },
    { id: '2', name: 'Initial Assessment', category: 'assessment' },
    { id: '3', name: 'Family Therapy', category: 'family' },
    { id: '4', name: 'Group Session', category: 'group' }
  ];

  const patients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Michael Ochieng' },
    { id: '4', name: 'Grace Wanjiku' }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'draft': return 'warning';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  if (showNewNote) {
    return <SessionNoteForm onCancel={() => setShowNewNote(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Session Notes</h1>
        <div className="flex space-x-3">
          <Button variant="outline" icon={Target}>
            Treatment Plans
          </Button>
          <Button icon={Plus} onClick={() => setShowNewNote(true)}>
            New Session Note
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search session notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Patients</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Templates</option>
          {noteTemplates.map(template => (
            <option key={template.id} value={template.id}>{template.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Notes List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900">{note.patientName}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(note.date).toLocaleDateString()} • {note.template}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(note.status)}>
                          {note.status}
                        </Badge>
                        <Badge variant={getRiskColor(note.riskLevel)}>
                          {note.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          Progress: {note.progress}%
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${note.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" icon={Eye} />
                        <Button size="sm" variant="ghost" icon={Edit} />
                        <Button size="sm" variant="ghost" icon={Paperclip} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Templates */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline" icon={FileText}>
                  Create from Template
                </Button>
                <Button className="w-full" variant="outline" icon={Target}>
                  Update Treatment Goals
                </Button>
                <Button className="w-full" variant="outline" icon={TrendingUp}>
                  Progress Review
                </Button>
                <Button className="w-full" variant="outline" icon={Calendar}>
                  Schedule Follow-up
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Note Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {noteTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{template.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Session Note Form Component
const SessionNoteForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    sessionType: 'individual',
    templateId: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    goals: '',
    interventions: '',
    homework: '',
    nextSteps: '',
    riskAssessment: 'low'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Saving session note:', formData);
      onCancel();
    } catch (error) {
      console.error('Error saving session note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <LoadingSpinner size="lg" text="Saving session note..." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Session Note</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient *
              </label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Patient</option>
                <option value="1">John Doe</option>
                <option value="2">Sarah Johnson</option>
                <option value="3">Michael Ochieng</option>
                <option value="4">Grace Wanjiku</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Type *
              </label>
              <select
                value={formData.sessionType}
                onChange={(e) => setFormData(prev => ({ ...prev, sessionType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="family">Family</option>
                <option value="assessment">Assessment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template
              </label>
              <select
                value={formData.templateId}
                onChange={(e) => setFormData(prev => ({ ...prev, templateId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Template</option>
                <option value="1">CBT Session</option>
                <option value="2">Initial Assessment</option>
                <option value="3">Family Therapy</option>
                <option value="4">Group Session</option>
              </select>
            </div>
          </div>

          {/* SOAP Notes */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">SOAP Notes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjective
                </label>
                <textarea
                  value={formData.subjective}
                  onChange={(e) => setFormData(prev => ({ ...prev, subjective: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Patient's reported symptoms, concerns, and subjective experience..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objective
                </label>
                <textarea
                  value={formData.objective}
                  onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Observable behaviors, mental status, appearance..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assessment
                </label>
                <textarea
                  value={formData.assessment}
                  onChange={(e) => setFormData(prev => ({ ...prev, assessment: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Clinical impressions, diagnosis, progress toward goals..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan
                </label>
                <textarea
                  value={formData.plan}
                  onChange={(e) => setFormData(prev => ({ ...prev, plan: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Treatment plan, interventions, next steps..."
                />
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Goals & Outcomes
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Goals addressed in this session and outcomes achieved..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interventions Used
              </label>
              <textarea
                value={formData.interventions}
                onChange={(e) => setFormData(prev => ({ ...prev, interventions: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Therapeutic techniques and interventions used..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Homework Assignment
              </label>
              <textarea
                value={formData.homework}
                onChange={(e) => setFormData(prev => ({ ...prev, homework: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Homework or between-session activities assigned..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Steps
              </label>
              <textarea
                value={formData.nextSteps}
                onChange={(e) => setFormData(prev => ({ ...prev, nextSteps: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Plans for next session and ongoing treatment..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Risk Assessment *
            </label>
            <select
              value={formData.riskAssessment}
              onChange={(e) => setFormData(prev => ({ ...prev, riskAssessment: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              Save & Complete
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};