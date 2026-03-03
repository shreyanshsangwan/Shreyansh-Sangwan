export interface Category {
  id: string;
  name: string;
  icon: string;
  basePrice: number;
  weightMultiplier: number;
}

export interface Order {
  id: string;
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  category: string;
  weight: number; // in kg
  distance: number; // in km
  price: number;
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered';
  date: string;
  trackingUpdates: {
    status: string;
    timestamp: string;
    description: string;
  }[];
}

export const categories: Category[] = [
  { id: 'documents', name: 'Documents', icon: 'FileText', basePrice: 50, weightMultiplier: 10 },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone', basePrice: 100, weightMultiplier: 20 },
  { id: 'clothing', name: 'Clothing', icon: 'Shirt', basePrice: 60, weightMultiplier: 12 },
  { id: 'food', name: 'Food', icon: 'Utensils', basePrice: 40, weightMultiplier: 8 },
  { id: 'other', name: 'Other', icon: 'Package', basePrice: 70, weightMultiplier: 15 },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-12345',
    senderName: 'Alice Smith',
    senderAddress: '123 Main St, Springfield',
    receiverName: 'Bob Jones',
    receiverAddress: '456 Elm St, Shelbyville',
    category: 'electronics',
    weight: 2.5,
    distance: 15,
    price: 250,
    status: 'in_transit',
    date: '2023-10-25T10:30:00Z',
    trackingUpdates: [
      { status: 'Request Accepted', timestamp: '2023-10-25T10:35:00Z', description: 'Courier assigned.' },
      { status: 'Picked Up', timestamp: '2023-10-25T11:00:00Z', description: 'Package collected from sender.' },
      { status: 'In Transit', timestamp: '2023-10-25T11:15:00Z', description: 'On the way to destination.' },
    ],
  },
  {
    id: 'ORD-67890',
    senderName: 'Charlie Brown',
    senderAddress: '789 Oak Ave, Capital City',
    receiverName: 'Diana Prince',
    receiverAddress: '321 Pine Rd, Metropolis',
    category: 'documents',
    weight: 0.5,
    distance: 5,
    price: 80,
    status: 'delivered',
    date: '2023-10-24T14:00:00Z',
    trackingUpdates: [
      { status: 'Request Accepted', timestamp: '2023-10-24T14:05:00Z', description: 'Courier assigned.' },
      { status: 'Picked Up', timestamp: '2023-10-24T14:30:00Z', description: 'Package collected.' },
      { status: 'In Transit', timestamp: '2023-10-24T14:45:00Z', description: 'On the way.' },
      { status: 'Delivered', timestamp: '2023-10-24T15:15:00Z', description: 'Package delivered successfully.' },
    ],
  },
];
