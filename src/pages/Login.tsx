import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Phone, Lock } from 'lucide-react';

export const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      login(phone);
      navigate('/home');
    } else {
      alert('Invalid OTP. Use 1234.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white p-8 justify-center">
      <div className="mb-12 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Phone className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500">Enter your mobile number to continue</p>
      </div>

      {step === 'phone' ? (
        <div className="space-y-6">
          <Input
            label="Mobile Number"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={<Phone className="w-5 h-5 text-gray-400" />}
            type="tel"
          />
          <Button onClick={handleSendOtp} fullWidth size="lg">
            Send OTP
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <Input
            label="Enter OTP"
            placeholder="1234"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            type="number"
            maxLength={4}
          />
          <Button onClick={handleVerifyOtp} fullWidth size="lg">
            Verify & Login
          </Button>
          <button
            onClick={() => setStep('phone')}
            className="w-full text-center text-sm text-gray-500 hover:text-orange-600"
          >
            Change Number
          </button>
        </div>
      )}
    </div>
  );
};
