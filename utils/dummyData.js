// Dummy data for flights
export const flights = [
  { id: 'F1', from: 'Ranchi', to: 'Bangalore', date: '2025-09-20', price: 5000 },
  { id: 'F2', from: 'Jamshedpur', to: 'Delhi', date: '2025-09-22', price: 4500 },
  { id: 'F3', from: 'Dhanbad', to: 'Mumbai', date: '2025-09-25', price: 6000 },
];

// Dummy data for hostels
export const hostels = [
  { id: 'H1', location: 'Ranchi', type: 'Single', price: 1000 },
  { id: 'H2', location: 'Bokaro', type: 'Double', price: 1500 },
  { id: 'H3', location: 'Jamshedpur', type: 'Deluxe', price: 2000 },
];

// Dummy payment options
export const payments = [
  { id: 'P1', method: 'Credit Card' },
  { id: 'P2', method: 'UPI' },
  { id: 'P3', method: 'Wallet' },
];

// Utility function to get flight by ID
export const getFlightById = (id) => flights.find(flight => flight.id === id);

// Utility function to get hostel by ID
export const getHostelById = (id) => hostels.find(hostel => hostel.id === id);
