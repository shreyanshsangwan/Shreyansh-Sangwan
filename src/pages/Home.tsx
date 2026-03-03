import React from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Clock, ArrowRight } from 'lucide-react';

export const Home = () => {
  const { orders, user } = useAppContext();
  const navigate = useNavigate();

  const activeOrders = orders.filter((o) => o.status !== 'delivered');

  return (
    <MobileLayout>
      <div className="bg-orange-500 pb-28 pt-8 px-6 rounded-b-[2.5rem] shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-orange-100 text-sm font-medium">Hello,</p>
            <h1 className="text-2xl font-bold text-white">{user?.name || 'Guest'}</h1>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold">JD</span>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 text-white mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-orange-100 uppercase tracking-wider">Total Deliveries</p>
              <p className="text-xl font-bold">{orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8">
        <Card className="mb-6 shadow-xl border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Send a Package</h3>
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">Fast & Secure</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Door-to-door pickup and delivery service with real-time tracking.
          </p>
          <Button onClick={() => navigate('/booking')} fullWidth>
            Book Now
          </Button>
        </Card>

        <div className="flex items-center justify-between mb-4 mt-8">
          <h3 className="font-bold text-gray-900 text-lg">Active Orders</h3>
          <button onClick={() => navigate('/tracking')} className="text-orange-500 text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4 pb-20">
          {activeOrders.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-gray-200">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No active orders</p>
            </div>
          ) : (
            activeOrders.map((order) => (
              <Card key={order.id} onClick={() => navigate(`/tracking/${order.id}`)} className="cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500 capitalize">{order.category}</p>
                    </div>
                  </div>
                  <Badge variant="info">{order.status.replace('_', ' ')}</Badge>
                </div>
                
                <div className="border-t border-gray-100 my-3 pt-3 space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="mt-1 min-w-[16px]">
                      <div className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-100" />
                    </div>
                    <p className="text-xs text-gray-600 truncate">{order.senderAddress}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="mt-1 min-w-[16px]">
                      <div className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-red-100" />
                    </div>
                    <p className="text-xs text-gray-600 truncate">{order.receiverAddress}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Updated 5m ago</span>
                  </div>
                  <div className="flex items-center text-orange-500 font-medium">
                    Track <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
};
