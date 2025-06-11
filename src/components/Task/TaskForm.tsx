import React, { useEffect, useState } from 'react';
import { TaskFormData } from '@/types/task';
import Button from '@/components/UI/Button';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  initialData?: TaskFormData;
  isEdit?: boolean; 
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData, isEdit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (): void => {
    if (formData.title.trim() && formData.dueDate) {
      onSubmit(formData);
      // Reset form only if not editing
      if (!isEdit) {
        setFormData({
          title: '',
          description: '',
          dueDate: '',
          status: 'pending',
          priority: 'medium'
        });
      }
      setError('');
    } else {
      setError("'Title' and 'Due Date' cannot be empty.")
    }
  };

  const handleInputChange = (field: keyof TaskFormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Title"
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Description"
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-sm "
          rows={3}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value as TaskFormData['status'])}
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-sm"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select
          value={formData.priority}
          onChange={(e) => handleInputChange('priority', e.target.value as TaskFormData['priority'])}
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {error && <div className='text-sm text-red-500'>
        {error}
      </div>}
      
      <div className="flex gap-2 pt-2">
        <Button 
          text="Cancel" 
          variant="outline" 
          onClick={onCancel}
          extraStyles="w-full"
        />
        <Button 
          text={isEdit ? "Edit Task" : "Add Task"} 
          onClick={handleSubmit}
          extraStyles="w-full"
        />
      </div>
    </div>
  );
};