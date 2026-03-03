import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Door-to-Door Delivery',
    description: 'We pick up from your doorstep and deliver safely to the destination.',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    title: 'Real-Time Tracking',
    description: 'Track your package every step of the way with our live GPS updates.',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    title: 'Transparent Pricing',
    description: 'No hidden fees. Calculate your shipping cost instantly before booking.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000',
  },
];

export const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-64 h-64 mb-8 rounded-full overflow-hidden shadow-xl border-4 border-orange-100">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-500 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8">
        <div className="flex justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-orange-500' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
        <Button onClick={handleNext} fullWidth size="lg">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
