'use client'

import { useState, useRef } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { motion } from 'framer-motion';
import { FaPlus, FaTrashAlt, FaFileAlt, FaFileImage } from 'react-icons/fa';

type FormData = {
  business_name: string;
  business_email: string;
  business_phone: string;
  tax_id: string;
  registration_number: string;
  description: string;
  url_key: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

type FormErrors = Partial<Record<keyof FormData, string>> & { form?: string };

const VendorRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    business_name: '',
    business_email: '',
    business_phone: '',
    tax_id: '',
    registration_number: '',
    description: '',
    url_key: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  // Add a new state for the single image file
  // Validation schema
  const schema = Joi.object({
    business_name: Joi.string().required().label('Business Name'),
    business_email: Joi.string().trim().lowercase().optional().label('Business Email'),
    business_phone: Joi.string().min(10).optional().label('Business Phone'),
    tax_id: Joi.string().optional().label('Tax ID'),
    registration_number: Joi.string().optional().label('Registration Number'),
    description: Joi.string().optional().label('Description'),
    url_key: Joi.string().required().label('URL Key'),
    address: Joi.string().optional().label('Address'),
    city: Joi.string().optional().label('City'),
    state: Joi.string().optional().label('State'),
    country: Joi.string().optional().label('Country'),
    postal_code: Joi.string().optional().label('Postal Code')
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): FormErrors | null => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const validationErrors: FormErrors = {};
    error.details.forEach(err => {
      const key = err.path[0] as keyof FormData;
      validationErrors[key] = err.message.replace(/"/g, '');
    });
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const data = new FormData();
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      // Append file if selected
      selectedFiles.forEach((file) => {
        data.append('files', file); // 'files' is the field name for multiple files
      });

      // Use axios or fetch to POST FormData
      await axios.post('/api/vendors', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        ...errors,
        form: 'Failed to submit form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFileError(null);

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      // Accept all image types
    ];

    let newFiles: File[] = [...selectedFiles];

    for (const file of files) {
      // Accept all image types
      if (
        file.type.startsWith('image/') ||
        allowedTypes.includes(file.type)
      ) {
        if (file.size > 2 * 1024 * 1024) {
          setFileError(`File "${file.name}" is too large (max 2MB).`);
          return;
        }
        // Only one image allowed, replace if exists
        newFiles = newFiles.filter(f => !f.type.startsWith('image/'));
        if (file.type.startsWith('image/')) {
          newFiles.unshift(file); // Add image at the start
        } else {
          // Prevent duplicate docs
          if (!newFiles.some(f => f.name === file.name && f.size === file.size)) {
            newFiles.push(file);
          }
        }
      } else {
        setFileError('Unsupported file type.');
        return;
      }
    }

    setSelectedFiles(newFiles);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter(f => f !== fileToRemove));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
        <p className="text-gray-700">Your vendor registration has been submitted successfully.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Become a Vendor</h1>
        <p className="text-lg text-gray-600">Grow your business by joining our marketplace. Fill out the form below to get started!</p>
      </motion.div>

      {'form' in errors && errors.form && (
        <motion.div
          className="mb-4 p-3 bg-red-100 text-red-700 rounded"
          variants={itemVariants}
        >
          {errors.form}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
          {/* Business Information */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="business_name">
              Business Name *
            </label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.business_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.business_name && <p className="text-red-500 text-sm mt-1">{errors.business_name}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="url_key">
              URL Key *
            </label>
            <input
              type="text"
              id="url_key"
              name="url_key"
              value={formData.url_key}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.url_key ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.url_key && <p className="text-red-500 text-sm mt-1">{errors.url_key}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="business_email">
              Business Email
            </label>
            <input
              type="email"
              id="business_email"
              name="business_email"
              value={formData.business_email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.business_email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.business_email && <p className="text-red-500 text-sm mt-1">{errors.business_email}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="business_phone">
              Business Phone
            </label>
            <input
              type="tel"
              id="business_phone"
              name="business_phone"
              value={formData.business_phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.business_phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.business_phone && <p className="text-red-500 text-sm mt-1">{errors.business_phone}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="tax_id">
              Tax ID
            </label>
            <input
              type="text"
              id="tax_id"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.tax_id ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.tax_id && <p className="text-red-500 text-sm mt-1">{errors.tax_id}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="registration_number">
              Registration Number
            </label>
            <input
              type="text"
              id="registration_number"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.registration_number ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.registration_number && <p className="text-red-500 text-sm mt-1">{errors.registration_number}</p>}
          </motion.div>

          {/* Location Information */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <label className="block text-gray-700 mb-1" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="state">
              State/Province
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 mb-1" htmlFor="postal_code">
              Postal Code
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.postal_code ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <label className="block text-gray-700 mb-1" htmlFor="description">
              Business Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <label className="block text-gray-700 mb-1" htmlFor="file">
              Upload Profile Picture and Documents <span className="text-gray-400">(One image, multiple docs, max 2MB each)</span>
            </label>
            <button
              type="button"
              onClick={handleAddFileClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition-colors mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <FaPlus /> Add File
            </button>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
            {selectedFiles.length > 0 && (
              <ul className="mt-2 divide-y divide-gray-200 bg-gray-50 rounded shadow p-2">
                {selectedFiles.map((file) => (
                  <li key={file.name + file.size} className="flex items-center justify-between py-2 px-1">
                    <span className="flex items-center gap-2">
                      {file.type.startsWith('image/') ? <FaFileImage className="text-blue-500" /> : <FaFileAlt className="text-gray-500" />}
                      <span className="truncate max-w-xs" title={file.name}>{file.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file)}
                      className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label={`Remove ${file.name}`}
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>

        <motion.div className="mt-6" variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded-md ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
          >
            {isSubmitting ? 'Submitting...' : 'Register Vendor'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default VendorRegistrationForm;