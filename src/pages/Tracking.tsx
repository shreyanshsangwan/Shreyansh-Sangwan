import React from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { Timeline } from '../components/ui/Timeline';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Package, Star } from 'lucide-react';

export const Tracking = () => {
  const { id } = useParams();
  const { orders } = useAppContext();
  const navigate = useNavigate();

  const order = id ? orders.find((o) => o.id === id) : null;

  if (!id) {
    // List view
    return (
      <MobileLayout>
        <div className="bg-white min-h-screen">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center bg-white sticky top-0 z-10">
            <button onClick={() => navigate('/home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 ml-2">My Orders</h1>
          </div>
          <div className="p-6 space-y-4">
            {orders.map((o) => (
              <Card key={o.id} onClick={() => navigate(`/tracking/${o.id}`)} className="cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{o.id}</p>
                      <p className="text-xs text-gray-500 capitalize">{o.category}</p>
                    </div>
                  </div>
                  <Badge variant={o.status === 'delivered' ? 'success' : 'info'}>{o.status.replace('_', ' ')}</Badge>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                  <span>{new Date(o.date).toLocaleDateString()}</span>
                  <span className="font-medium text-orange-500">View Details</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (!order) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-screen">
          <p>Order not found</p>
        </div>
      </MobileLayout>
    );
  }

  const timelineEvents = [
    {
      title: 'Order Placed',
      description: 'Your order has been received.',
      date: order.date,
      status: 'completed',
    },
    {
      title: 'Picked Up',
      description: 'Courier has picked up the package.',
      date: new Date(new Date(order.date).getTime() + 30 * 60000).toISOString(),
      status: (['picked_up', 'in_transit', 'delivered'].includes(order.status) ? 'completed' : 'upcoming') as 'completed' | 'upcoming',
    },
    {
      title: 'In Transit',
      description: 'Package is on the way.',
      date: new Date(new Date(order.date).getTime() + 60 * 60000).toISOString(),
      status: (['in_transit', 'delivered'].includes(order.status) ? 'completed' : order.status === 'picked_up' ? 'current' : 'upcoming') as 'completed' | 'current' | 'upcoming',
    },
    {
      title: 'Delivered',
      description: 'Package delivered successfully.',
      date: new Date(new Date(order.date).getTime() + 120 * 60000).toISOString(),
      status: (order.status === 'delivered' ? 'completed' : order.status === 'in_transit' ? 'upcoming' : 'upcoming') as 'completed' | 'upcoming',
    },
  ];

  return (
    <MobileLayout>
      <div className="bg-white min-h-screen pb-20">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center bg-white sticky top-0 z-10">
          <button onClick={() => navigate('/tracking')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Tracking Details</h1>
        </div>

        <div className="p-6">
          <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Tracking ID</p>
                <h2 className="text-2xl font-bold text-gray-900">{order.id}</h2>
              </div>
              <Badge variant={order.status === 'delivered' ? 'success' : 'info'}>{order.status.replace('_', ' ')}</Badge>
            </div>
            
            <div className="space-y-4 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-orange-200 border-l border-dashed border-orange-300" />
              
              <div className="flex items-start relative z-10">
                <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-sm mt-1 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">From</p>
                  <p className="font-medium text-gray-900 text-sm">{order.senderAddress}</p>
                </div>
              </div>
              
              <div className="flex items-start relative z-10">
                <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-sm mt-1 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">To</p>
                  <p className="font-medium text-gray-900 text-sm">{order.receiverAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-6 text-lg">Order Status</h3>
          <Timeline events={timelineEvents} />

          {order.status === 'delivered' && (
            <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
              <h4 className="font-bold text-gray-900 mb-2">Rate your experience</h4>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-8 h-8 text-yellow-400 fill-current cursor-pointer hover:scale-110 transition-transform" />
                ))}
              </div>
              <textarea
                placeholder="Write a review..."
                className="w-full border-gray-200 rounded-xl text-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                rows={3}
              />
              <Button className="mt-4" fullWidth size="sm">Submit Feedback</Button>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};
