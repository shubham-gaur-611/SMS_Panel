import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { endpoints } from '../config/api';

interface AddStudentFormData {
  name: string;
  email: string;
  dob: string;
  branch: string;
  semester: number;
  photo: FileList;
}

export const AddStudentPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<AddStudentFormData>();

  const addStudentMutation = useMutation({
    mutationFn: async (data: AddStudentFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'photo' && value[0]) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value.toString());
        }
      });

      const response = await axios.post(endpoints.student_create, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      alert('Student added successfully');
      navigate('/students');
    },
    onError: () => {
      alert('Failed to add student');
    }
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add New Student</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleSubmit((data) => addStudentMutation.mutate(data))}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="mt-1 block w-full rounded-md p-pd-5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                className="mt-1 block w-full rounded-md p-pd-5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                {...register('dob', { required: 'Date of birth is required' })}
                type="date"
                className="mt-1 block w-full rounded-md p-pd-5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.dob && <span className="text-red-500 text-sm">{errors.dob.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                {...register('branch', { required: 'Branch is required' })}
                type="text"
                className="mt-1 block w-full rounded-md p-pd-5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                className="mt-1 block w-full rounded-md p-pd-5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.semester && <span className="text-red-500 text-sm">{errors.semester.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                {...register('photo', { required: 'Photo is required' })}
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm p-pd-5 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};