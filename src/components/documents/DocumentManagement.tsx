import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { 
  Folder, 
  File, 
  Plus, 
  Search, 
  Upload, 
  Download, 
  Share2, 
  Lock,
  Eye,
  Edit,
  Trash2,
  FolderPlus,
  FileText,
  Image,
  Video,
  Archive,
  Clock
} from 'lucide-react';

export const DocumentManagement: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);

  // Mock data for folders and documents
  const folders = [
    {
      id: '1',
      name: 'Patient Records',
      parentId: 'root',
      documentCount: 45,
      isShared: false,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Assessment Forms',
      parentId: 'root',
      documentCount: 12,
      isShared: true,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Treatment Plans',
      parentId: 'root',
      documentCount: 28,
      isShared: false,
      createdAt: '2024-01-20'
    },
    {
      id: '4',
      name: 'Insurance Documents',
      parentId: 'root',
      documentCount: 18,
      isShared: false,
      createdAt: '2024-01-12'
    }
  ];

  const documents = [
    {
      id: '1',
      name: 'Initial Assessment - John Doe.pdf',
      type: 'pdf',
      size: '2.4 MB',
      category: 'assessment',
      folderId: '2',
      patientName: 'John Doe',
      version: 1,
      isShared: false,
      uploadedBy: 'Dr. Vicky Kedemi',
      uploadedAt: '2024-01-25T10:30:00Z',
      lastModified: '2024-01-25T10:30:00Z'
    },
    {
      id: '2',
      name: 'Treatment Plan - Sarah Johnson.docx',
      type: 'docx',
      size: '1.8 MB',
      category: 'treatment-plan',
      folderId: '3',
      patientName: 'Sarah Johnson',
      version: 2,
      isShared: true,
      uploadedBy: 'Dr. Vicky Kedemi',
      uploadedAt: '2024-01-26T14:15:00Z',
      lastModified: '2024-01-27T09:20:00Z'
    },
    {
      id: '3',
      name: 'Insurance Claim Form.pdf',
      type: 'pdf',
      size: '856 KB',
      category: 'insurance',
      folderId: '4',
      version: 1,
      isShared: false,
      uploadedBy: 'Emily Rodriguez',
      uploadedAt: '2024-01-24T16:45:00Z',
      lastModified: '2024-01-24T16:45:00Z'
    }
  ];

  const templates = [
    { id: '1', name: 'Initial Assessment Form', category: 'assessment' },
    { id: '2', name: 'Consent for Treatment', category: 'consent' },
    { id: '3', name: 'Treatment Plan Template', category: 'treatment-plan' },
    { id: '4', name: 'Progress Note Template', category: 'progress-note' },
    { id: '5', name: 'Discharge Summary', category: 'discharge' }
  ];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return FileText;
      case 'docx':
      case 'doc': return FileText;
      case 'jpg':
      case 'jpeg':
      case 'png': return Image;
      case 'mp4':
      case 'avi': return Video;
      case 'zip':
      case 'rar': return Archive;
      default: return File;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'assessment': return 'info';
      case 'treatment-plan': return 'success';
      case 'insurance': return 'warning';
      case 'consent': return 'danger';
      default: return 'default';
    }
  };

  const breadcrumbs = [
    { id: 'root', name: 'Documents' },
    ...(currentFolder !== 'root' ? [{ id: currentFolder, name: folders.find(f => f.id === currentFolder)?.name || 'Unknown' }] : [])
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.id}>
                {index > 0 && <span>/</span>}
                <button
                  onClick={() => setCurrentFolder(crumb.id)}
                  className="hover:text-blue-600"
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={FolderPlus} onClick={() => setShowNewFolder(true)}>
            New Folder
          </Button>
          <Button icon={Upload} onClick={() => setShowUpload(true)}>
            Upload Document
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search documents and folders..."
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
          <option value="assessment">Assessment</option>
          <option value="treatment-plan">Treatment Plan</option>
          <option value="insurance">Insurance</option>
          <option value="consent">Consent</option>
          <option value="progress-note">Progress Note</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentFolder === 'root' ? 'All Documents' : folders.find(f => f.id === currentFolder)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Folders */}
              {currentFolder === 'root' && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Folders</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {folders.map((folder) => (
                      <div
                        key={folder.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                        onClick={() => setCurrentFolder(folder.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Folder className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{folder.name}</h4>
                            <p className="text-sm text-gray-500">
                              {folder.documentCount} documents
                            </p>
                          </div>
                          {folder.isShared && (
                            <Share2 className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Documents</h3>
                <div className="space-y-3">
                  {documents
                    .filter(doc => currentFolder === 'root' || doc.folderId === currentFolder)
                    .map((document) => {
                      const FileIcon = getFileIcon(document.type);
                      
                      return (
                        <div
                          key={document.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <FileIcon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{document.name}</h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{document.size}</span>
                                  <span>v{document.version}</span>
                                  {document.patientName && (
                                    <span>Patient: {document.patientName}</span>
                                  )}
                                  <span>
                                    Modified: {new Date(document.lastModified).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={getCategoryColor(document.category)}>
                                {document.category}
                              </Badge>
                              {document.isShared && (
                                <Badge variant="success">
                                  <Share2 className="w-3 h-3 mr-1" />
                                  Shared
                                </Badge>
                              )}
                              <div className="flex space-x-1">
                                <Button size="sm" variant="ghost" icon={Eye} />
                                <Button size="sm" variant="ghost" icon={Download} />
                                <Button size="sm" variant="ghost" icon={Edit} />
                                <Button size="sm" variant="ghost" icon={Share2} />
                                <Button size="sm" variant="ghost" icon={Trash2} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline" icon={Upload}>
                  Upload File
                </Button>
                <Button className="w-full" variant="outline" icon={FolderPlus}>
                  Create Folder
                </Button>
                <Button className="w-full" variant="outline" icon={FileText}>
                  From Template
                </Button>
                <Button className="w-full" variant="outline" icon={Share2}>
                  Share Documents
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{template.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div className="text-sm">
                    <p className="text-gray-900">Document uploaded</p>
                    <p className="text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-green-500" />
                  <div className="text-sm">
                    <p className="text-gray-900">Folder shared</p>
                    <p className="text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Edit className="w-4 h-4 text-blue-500" />
                  <div className="text-sm">
                    <p className="text-gray-900">Document updated</p>
                    <p className="text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '24%' }} />
                </div>
                <p className="text-xs text-gray-500">
                  7.6 GB remaining
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} />
      )}

      {/* New Folder Modal */}
      {showNewFolder && (
        <NewFolderModal onClose={() => setShowNewFolder(false)} />
      )}
    </div>
  );
};

// Upload Modal Component
const UploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: 'assessment',
    patientId: '',
    description: ''
  });

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSpinner size="lg" text="Uploading document..." />
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop files here, or click to browse
                </p>
                <input type="file" className="hidden" multiple />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="assessment">Assessment</option>
                  <option value="treatment-plan">Treatment Plan</option>
                  <option value="insurance">Insurance</option>
                  <option value="consent">Consent</option>
                  <option value="progress-note">Progress Note</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient (Optional)
                </label>
                <select
                  value={formData.patientId}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the document..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleUpload}>
                  Upload
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// New Folder Modal Component
const NewFolderModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [isShared, setIsShared] = useState(false);

  const handleCreate = () => {
    console.log('Creating folder:', { name: folderName, isShared });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create New Folder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name..."
            />
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shared"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="shared" className="text-sm text-gray-700">
                Make this folder shared
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!folderName.trim()}>
                Create Folder
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};