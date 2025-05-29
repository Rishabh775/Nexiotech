import React from 'react';
import { useForm } from 'react-hook-form';
import useStore from '../store/store';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  customizable: boolean;
}

interface CustomRequestFormProps {
  product?: Product;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  file: FileList;
}

const CustomRequestForm: React.FC<CustomRequestFormProps> = ({ product }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const submitCustomRequest = useStore(state => state.submitCustomRequest);
  const products = useStore(state => state.products);
  
  const onSubmit = (data: FormData) => {
    const file = data.file && data.file.length > 0 ? data.file[0] : null;
    
    submitCustomRequest({
      name: data.name,
      email: data.email,
      product: product || products[0],
      message: data.message,
      file: file
    });
    
    // In a real app, you would send this to a backend
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Your custom request has been submitted! We will contact you soon.');
    
    // Reset form
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      {!product && (
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
            Select Product
          </label>
          <select
            id="product"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Request Details
        </label>
        <textarea
          id="message"
          rows={5}
          className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe your custom request, including any specific requirements, dimensions, colors, etc."
          {...register('message', { required: 'Message is required' })}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Reference Image (Optional)
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          {...register('file')}
        />
        <p className="mt-1 text-xs text-gray-500">
          You can upload a reference image to help us understand your vision better.
        </p>
      </div>
      
      <button
        type="submit"
        className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        Submit Custom Request
      </button>
    </form>
  );
};

export default CustomRequestForm;