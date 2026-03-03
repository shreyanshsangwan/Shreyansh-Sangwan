import React from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Bell, HelpCircle } from 'lucide-react';

export const Profile = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MobileLayout>
      <div className="bg-white min-h-screen">
        <div className="bg-orange-500 pb-28 pt-8 px-6 rounded-b-[2.5rem] shadow-lg text-center relative">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 border-4 border-orange-300 shadow-md flex items-center justify-center">
            <User className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">{user?.name || 'Guest User'}</h1>
          <p className="text-orange-100 text-sm mt-1">{user?.phone || '+1 (555) 000-0000'}</p>
        </div>

        <div className="px-6 -mt-8 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Account Settings</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Notifications</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Help & Support</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>

          <Button variant="outline" fullWidth onClick={handleLogout} className="mt-8 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
