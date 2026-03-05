import React, { useState } from 'react';
import api from '../config/axios';
import './SignupForm.css';

const SignupForm = () => {
  const [activeTab, setActiveTab] = useState('citizen');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    aadhar: activeTab === 'citizen' ? '' : undefined, // Aadhar required only for citizens
    code: activeTab !== 'citizen' ? '' :
    undefined
  });

// Remove unused userType state since activeTab handles user type
// Remove unused state since aadhar is handled in formData
// Remove unused state since code is handled in formData
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name || !formData.email) {
      setError('Name and email are required fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (activeTab !== 'citizen' && (formData.code.length !== 5 || !/^\d+$/.test(formData.code))) {
      setError('Please enter a valid 5-digit Organization Code');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const payload = {
        userType: activeTab,
        password: formData.password,
        name: formData.name,
        email: formData.email
      };

      if (activeTab === 'citizen') {
        payload.mobile = formData.mobile;
        payload.aadhar = formData.aadhar;
      } else if (activeTab === 'official' || activeTab === 'ngo') {
        payload.code = formData.code;
      }

      const { data } = await api.post('/api/signup', payload);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.user.userType);
      
      switch(data.user.userType) {
        case 'citizen':
          window.location.href = '/dashboard/citizen';
          break;
        case 'official':
          window.location.href = '/dashboard/official';
          break;
        case 'ngo':
          window.location.href = '/dashboard/ngo';
          break;
        default:
          window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="tab-container">
        <button
          className={activeTab === 'citizen' ? 'active-tab' : 'tab'}
          onClick={() => { setActiveTab('citizen'); setError(''); }}
        >
          Citizen Signup
        </button>
        <button
          className={activeTab === 'official' ? 'active-tab' : 'tab'}
          onClick={() => { setActiveTab('official'); setError(''); }}
        >
          Official Signup
        </button>
        <button
          className={activeTab === 'ngo' ? 'active-tab' : 'tab'}
          onClick={() => { setActiveTab('ngo'); setError(''); }}
        >
          NGO Signup
        </button>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="login-error">{error}</div>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="login-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="login-input"
          required
        />
        {activeTab === 'citizen' ? (
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
            className="login-input"
            required
          />
        ) : (
          <input
            type="text"
            name="code"
            placeholder="5-Digit Organization Code"
            value={formData.code}
            onChange={handleInputChange}
            className="login-input"
            maxLength={5}
            pattern="\d{5}"
            title="Please enter a valid 5-digit organization code"
            required
          />
        )}
        {activeTab === 'citizen' && (
          <input
            type="text"
            name="aadhar"
            placeholder="Aadhar Number"
            value={formData.aadhar}
            onChange={handleInputChange}
            className="login-input"
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="login-input"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="login-input"
          required
        />
        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </>
  );
};

export default SignupForm;