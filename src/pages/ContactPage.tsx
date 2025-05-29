import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    // In a real app, you would send this to a backend
    console.log('Contact form submitted:', data);
    
    // Show success message
    alert('Your message has been sent! We will get back to you soon.');
    
    // Reset form
    reset();
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about our products or interested in a custom design? We'd love to hear from you!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get In Touch
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Our Location</h3>
                <p className="mt-1 text-gray-600">
                  123 Print Street<br />
                  Design District<br />
                  Los Angeles, CA 90210
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Email Us</h3>
                <p className="mt-1 text-gray-600">
                  info@3dartprints.com<br />
                  support@3dartprints.com
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                  <Phone className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Call Us</h3>
                <p className="mt-1 text-gray-600">
                  (555) 123-4567<br />
                  Monday-Friday: 9am-5pm PST
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Business Hours
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="text-gray-800 font-medium">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday:</span>
                <span className="text-gray-800 font-medium">10:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday:</span>
                <span className="text-gray-800 font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          
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
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('message', { required: 'Message is required' })}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;