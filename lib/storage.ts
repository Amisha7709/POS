export const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return null;
  const savedCart = localStorage.getItem('pos-cart');
  return savedCart ? JSON.parse(savedCart) : null;
};

export const saveCartToStorage = (cart: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('pos-cart', JSON.stringify(cart));
};

export const loadAuthFromStorage = () => {
  if (typeof window === 'undefined') return null;
  const savedAuth = localStorage.getItem('pos-auth');
  return savedAuth ? JSON.parse(savedAuth) : null;
};

export const saveAuthToStorage = (auth: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('pos-auth', JSON.stringify(auth));
};

export const clearStorage = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('pos-cart');
  localStorage.removeItem('pos-auth');
};