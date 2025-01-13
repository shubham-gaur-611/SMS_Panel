import React from 'react';
import { Student } from '../types/student';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { endpoints } from '../config/api';

interface StudentFormProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

interface EditStudentFormData {
  name: string;
  email: string;
  dob: string;
  branch: string;
  semester: number;
  photo: FileList | null;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<EditStudentFormData>({
    defaultValues: {
      name: student.name,
      email: student.email,
      dob: student.dob.split('T')[0], // Format date for input
      branch: student.branch,
      semester: student.semester,
      photo: null,
    }
  });

  const editStudentMutation = useMutation({
    mutationFn: async (data: EditStudentFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'photo' && value?.[0]) {
          formData.append(key, value[0]);
        } else if (key !== 'photo') {
          formData.append(key, value.toString());
        }
      });

      const response = await axios.put(
        endpoints.student_update(student.id),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      alert('Student updated successfully');
      onClose();
    },
    onError: () => {
      alert('Failed to update student');
    }
  });

  const onSubmit = (data: EditStudentFormData) => {
    editStudentMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 w-full">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Edit Student
          </Dialog.Title>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                {...register('dob', { required: 'Date of birth is required' })}
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.dob && <span className="text-red-500 text-sm">{errors.dob.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                {...register('branch', { required: 'Branch is required' })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.branch && <span className="text-red-500 text-sm">{errors.branch.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Semester</label>
              <input
                {...register('semester', {
                  required: 'Semester is required',
                  min: { value: 1, message: 'Semester must be between 1 and 8' },
                  max: { value: 8, message: 'Semester must be between 1 and 8' }
                })}
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.semester && <span className="text-red-500 text-sm">{errors.semester.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              {student.photo && (
                <img 
                  src={`http://localhost:3000/src/${student.photo}`}
                  alt="Current photo" 
                  className="mt-1 h-20 w-20 rounded-full object-cover"
                />
              )}
              <input
                {...register('photo')}
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={editStudentMutation.isPending}
              >
                {editStudentMutation.isPending ? 'Updating...' : 'Update Student'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};