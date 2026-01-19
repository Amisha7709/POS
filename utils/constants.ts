export const TAX_RATE = 0.08; // 8% tax
export const DISCOUNT_CODES = {
  SAVE10: { type: 'percentage', value: 10 },
  SAVE20: { type: 'percentage', value: 20 },
  FLAT5: { type: 'flat', value: 5 },
};

export const MOCK_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 15 },
  { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics', stock: 50 },
  { id: 3, name: 'Keyboard', price: 79.99, category: 'Electronics', stock: 30 },
  { id: 4, name: 'Monitor', price: 299.99, category: 'Electronics', stock: 20 },
  { id: 5, name: 'Headphones', price: 149.99, category: 'Electronics', stock: 40 },
  { id: 6, name: 'Desk Chair', price: 199.99, category: 'Furniture', stock: 25 },
  { id: 7, name: 'Desk', price: 349.99, category: 'Furniture', stock: 10 },
  { id: 8, name: 'Notebook', price: 9.99, category: 'Stationery', stock: 100 },
  { id: 9, name: 'Pen', price: 1.99, category: 'Stationery', stock: 200 },
  { id: 10, name: 'Coffee Mug', price: 14.99, category: 'Kitchen', stock: 75 },
];

export const MOCK_USERS = [
  { id: '1', email: 'admin@pos.com', name: 'Admin User', role: 'admin', password: 'admin123' },
  { id: '2', email: 'cashier@pos.com', name: 'Cashier User', role: 'cashier', password: 'cashier123' },
];