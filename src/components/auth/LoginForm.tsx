import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { Shield, Eye, EyeOff } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // Demo credentials for testing
  const fillDemoCredentials = () => {
    setFormData({
      email: 'vicky.kedemi@practice.com',
      password: 'demo123456'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sage-sky px-4 parallax-container">
      <Card className="w-full max-w-md animate-fade-in glass-morphism">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4 animate-float">
            <div className="p-3 bg-primary-sage rounded-full shadow-lg">
              <Shield className="w-8 h-8 text-white animate-pulse-gentle" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading font-bold text-gray-900 animate-slide-in-up">
            TherapyPro Login
          </CardTitle>
          <p className="text-gray-600 mt-2 font-body animate-slide-in-up animate-delay-100">
            Sign in to your therapy practice management system
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md animate-slide-in-left">
              <p className="text-sm text-red-600 font-body">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 animate-slide-in-up animate-delay-200">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-primary-sage transition-colors duration-300"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full animate-pulse-gentle"
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo credentials section */}
          <div className="mt-6 p-4 bg-primary-sage/5 rounded-lg animate-slide-in-up animate-delay-300">
            <h4 className="text-sm font-heading font-medium text-gray-700 mb-2">Demo Credentials</h4>
            <p className="text-xs text-gray-600 mb-3 font-body">
              Use these credentials to test the application:
            </p>
            <div className="space-y-1 text-xs text-gray-600 mb-3 font-body">
              <p><strong>Email:</strong> vicky.kedemi@practice.com</p>
              <p><strong>Password:</strong> demo123456</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillDemoCredentials}
              className="w-full hover-scale"
              disabled={isLoading}
            >
              Fill Demo Credentials
            </Button>
          </div>

          <div className="mt-6 text-center animate-fade-in animate-delay-400">
            <p className="text-xs text-gray-500 font-body">
              Secure healthcare practice management system
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};