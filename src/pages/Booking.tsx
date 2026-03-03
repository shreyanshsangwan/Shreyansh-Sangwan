import React, { useState } from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CategorySelector } from '../components/ui/CategorySelector';
import { categories, Order } from '../data/mockData';
import { calculatePrice, formatCurrency } from '../utils/pricing';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Package, Truck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const steps = ['Address', 'Package', 'Schedule', 'Summary'];

export const Booking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { addOrder } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    receiverName: '',
    receiverAddress: '',
    category: '',
    weight: '',
    schedule: 'immediate',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/home');
    }
  };

  const handleSubmit = () => {
    const selectedCategory = categories.find((c) => c.id === formData.category);
    if (!selectedCategory) return;

    const distance = Math.floor(Math.random() * 20) + 1; // Mock distance
    const price = calculatePrice(distance, Number(formData.weight), selectedCategory);

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      ...formData,
      weight: Number(formData.weight),
      distance,
      price,
      status: 'pending',
      date: new Date().toISOString(),
      trackingUpdates: [
        {
          status: 'Request Received',
          timestamp: new Date().toISOString(),
          description: 'Your booking request has been received.',
        },
      ],
    };

    addOrder(newOrder);
    navigate('/tracking');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-6">
              <h3 className="font-bold text-orange-800 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Sender Details
              </h3>
              <div className="space-y-4">
                <Input
                  label="Name"
                  placeholder="John Doe"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  icon={<User className="w-4 h-4 text-gray-400" />}
                />
                <Input
                  label="Address"
                  placeholder="123 Pickup St"
                  value={formData.senderAddress}
                  onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                  icon={<MapPin className="w-4 h-4 text-gray-400" />}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Receiver Details
              </h3>
              <div className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Jane Smith"
                  value={formData.receiverName}
                  onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                  icon={<User className="w-4 h-4 text-gray-400" />}
                />
                <Input
                  label="Address"
                  placeholder="456 Dropoff Ave"
                  value={formData.receiverAddress}
                  onChange={(e) => setFormData({ ...formData, receiverAddress: e.target.value })}
                  icon={<MapPin className="w-4 h-4 text-gray-400" />}
                />
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Category</label>
              <CategorySelector
                categories={categories}
                selectedCategory={formData.category}
                onSelect={(id) => setFormData({ ...formData, category: id })}
              />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <Input
                label="Approximate Weight (kg)"
                type="number"
                placeholder="e.g. 2.5"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                icon={<Package className="w-4 h-4 text-gray-400" />}
              />
              <p className="text-xs text-gray-500 mt-2">
                Max weight per package is 20kg for standard delivery.
              </p>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, schedule: 'immediate' })}
                className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                  formData.schedule === 'immediate'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-200'
                }`}
              >
                <Truck className={`w-8 h-8 mb-3 ${formData.schedule === 'immediate' ? 'text-orange-500' : 'text-gray-400'}`} />
                <span className="font-bold">Immediate Pickup</span>
                <span className="text-xs mt-1 opacity-70">Within 30 mins</span>
              </button>
              
              <button
                onClick={() => setFormData({ ...formData, schedule: 'later' })}
                className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                  formData.schedule === 'later'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-200'
                }`}
              >
                <Clock className={`w-8 h-8 mb-3 ${formData.schedule === 'later' ? 'text-orange-500' : 'text-gray-400'}`} />
                <span className="font-bold">Schedule Later</span>
                <span className="text-xs mt-1 opacity-70">Pick a time</span>
              </button>
            </div>

            {formData.schedule === 'later' && (
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center text-orange-800 text-sm">
                Scheduling feature coming soon! Defaulting to immediate pickup for prototype.
              </div>
            )}
          </motion.div>
        );
      case 3:
        const selectedCategory = categories.find((c) => c.id === formData.category);
        const distance = 12; // Mock distance for preview
        const price = selectedCategory
          ? calculatePrice(distance, Number(formData.weight), selectedCategory)
          : 0;

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Order Summary</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-200">
                  <span className="text-gray-500">Distance</span>
                  <span className="font-medium">{distance} km</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-200">
                  <span className="text-gray-500">Weight</span>
                  <span className="font-medium">{formData.weight} kg</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-200">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium capitalize">{selectedCategory?.name}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">{formatCurrency(price)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-bold text-green-800 text-sm">Transparent Pricing Applied</h4>
                <p className="text-xs text-green-700 mt-1">
                  Includes base fare, distance fee, and weight surcharge. No hidden costs.
                </p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <MobileLayout showNav={false}>
      <div className="bg-white min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center bg-white sticky top-0 z-10">
          <button onClick={handleBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Book Courier</h1>
        </div>

        <div className="px-6 py-6">
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center bg-white px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    index <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs mt-2 font-medium ${index <= currentStep ? 'text-orange-600' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        <div className="mt-auto p-6 border-t border-gray-100 bg-white sticky bottom-0">
          <Button onClick={handleNext} fullWidth size="lg">
            {currentStep === steps.length - 1 ? 'Confirm Booking' : 'Continue'}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

