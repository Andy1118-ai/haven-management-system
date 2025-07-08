import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Download, 
  Share2, 
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Video,
  Headphones,
  Target,
  Upload
} from 'lucide-react';

export const ClientResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [showNewResource, setShowNewResource] = useState(false);

  // Mock data for client resources
  const resources = [
    {
      id: '1',
      title: 'Anxiety Management Worksheet',
      description: 'Cognitive restructuring exercises for managing anxiety',
      type: 'worksheet',
      category: 'Anxiety',
      patientName: 'John Doe',
      assignedDate: '2024-01-25',
      dueDate: '2024-02-01',
      status: 'completed',
      completedDate: '2024-01-30',
      url: '/resources/anxiety-worksheet.pdf'
    },
    {
      id: '2',
      title: 'Mindfulness Meditation Audio',
      description: '10-minute guided meditation for stress relief',
      type: 'audio',
      category: 'Mindfulness',
      patientName: 'Sarah Johnson',
      assignedDate: '2024-01-26',
      status: 'in-progress',
      url: '/resources/mindfulness-audio.mp3'
    },
    {
      id: '3',
      title: 'CBT Thought Record',
      description: 'Daily thought tracking and cognitive restructuring',
      type: 'homework',
      category: 'CBT',
      patientName: 'Michael Ochieng',
      assignedDate: '2024-01-27',
      dueDate: '2024-02-03',
      status: 'assigned',
      url: '/resources/thought-record.pdf'
    }
  ];

  const homeworkAssignments = [
    {
      id: '1',
      title: 'Daily Mood Tracking',
      patient: 'John Doe',
      dueDate: '2024-02-05',
      status: 'in-progress',
      progress: 60
    },
    {
      id: '2',
      title: 'Exposure Therapy Practice',
      patient: 'Sarah Johnson',
      dueDate: '2024-02-02',
      status: 'overdue',
      progress: 30
    },
    {
      id: '3',
      title: 'Gratitude Journal',
      patient: 'Grace Wanjiku',
      dueDate: '2024-02-08',
      status: 'assigned',
      progress: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'assigned': return 'warning';
      case 'overdue': return 'danger';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'worksheet': return FileText;
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'homework': return Target;
      default: return BookOpen;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'overdue': return AlertCircle;
      default: return Clock;
    }
  };

  if (showNewResource) {
    return <ResourceForm onCancel={() => setShowNewResource(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Client Resources & Homework</h1>
        <div className="flex space-x-3">
          <Button variant="outline" icon={Upload}>
            Upload Resource
          </Button>
          <Button icon={Plus} onClick={() => setShowNewResource(true)}>
            Assign Resource
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Anxiety">Anxiety</option>
          <option value="Depression">Depression</option>
          <option value="CBT">CBT</option>
          <option value="Mindfulness">Mindfulness</option>
          <option value="Trauma">Trauma</option>
        </select>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Patients</option>
          <option value="1">John Doe</option>
          <option value="2">Sarah Johnson</option>
          <option value="3">Michael Ochieng</option>
          <option value="4">Grace Wanjiku</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resources List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type);
                  const StatusIcon = getStatusIcon(resource.status);
                  
                  return (
                    <div
                      key={resource.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <TypeIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{resource.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Patient: {resource.patientName}</span>
                              <span>Category: {resource.category}</span>
                              <span>Assigned: {new Date(resource.assignedDate).toLocaleDateString()}</span>
                              {resource.dueDate && (
                                <span>Due: {new Date(resource.dueDate).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(resource.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {resource.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {resource.completedDate && (
                            <span className="text-sm text-green-600">
                              Completed: {new Date(resource.completedDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" icon={Download} />
                          <Button size="sm" variant="ghost" icon={Share2} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Homework Tracking */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Homework Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {homeworkAssignments.map((homework) => (
                  <div
                    key={homework.id}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{homework.title}</h4>
                      <Badge variant={getStatusColor(homework.status)}>
                        {homework.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{homework.patient}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        Due: {new Date(homework.dueDate).toLocaleDateString()}
                      </span>
                      <span className="text-gray-600">{homework.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${
                          homework.status === 'overdue' ? 'bg-red-500' : 
                          homework.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${homework.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Anxiety', 'Depression', 'CBT', 'Mindfulness', 'Trauma', 'Relationships'].map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <span className="text-sm font-medium">{category}</span>
                    <Badge variant="info" size="sm">
                      {Math.floor(Math.random() * 10) + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline" icon={Target}>
                  Create Homework
                </Button>
                <Button className="w-full" variant="outline" icon={Upload}>
                  Upload Resource
                </Button>
                <Button className="w-full" variant="outline" icon={Share2}>
                  Share Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Resource Assignment Form
const ResourceForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    type: 'worksheet',
    category: '',
    dueDate: '',
    instructions: '',
    url: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Assigning resource:', formData);
      onCancel();
    } catch (error) {
      console.error('Error assigning resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <LoadingSpinner size="lg" text="Assigning resource..." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Resource</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Resource Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="worksheet">Worksheet</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="exercise">Exercise</option>
                <option value="homework">Homework</option>
              </select>
            </div>
          </div>

          <Input
            label="Title *"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the resource..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Anxiety, CBT, Mindfulness"
            />
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed instructions for the patient..."
            />
          </div>

          <Input
            label="Resource URL"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://..."
            helpText="Link to the resource file or external content"
          />

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Assign Resource
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};