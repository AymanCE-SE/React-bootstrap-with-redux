import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {
      cartItems: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return {
      cartItems: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
};
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, img, quantity: availableQuantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        if (Number(existingItem.quantity) < Number(availableQuantity)) {
          existingItem.quantity = Number(existingItem.quantity) + 1;
          existingItem.totalPrice = Number(existingItem.quantity) * Number(existingItem.price);
        }
      } else {
        state.cartItems.push({
          id,
          name,
          price: Number(price),
          img,
          quantity: 1,
          totalPrice: Number(price),
          availableQuantity: Number(availableQuantity)
        });
      }
      
      state.totalQuantity = state.cartItems.reduce((total, item) => total + Number(item.quantity), 0);
      state.totalAmount = state.cartItems.reduce((total, item) => total + (Number(item.price) * Number(item.quantity)), 0);
      
      saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.totalQuantity = state.cartItems.reduce((total, item) => total + Number(item.quantity), 0);
      state.totalAmount = state.cartItems.reduce((total, item) => total + (Number(item.price) * Number(item.quantity)), 0);
      
      saveCartToStorage(state);
    },

    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      
      if (item) {
        if (type === 'increase' && Number(item.quantity) < Number(item.availableQuantity)) {
          item.quantity = Number(item.quantity) + 1;
        } else if (type === 'decrease' && Number(item.quantity) > 1) {
          item.quantity = Number(item.quantity) - 1;
        }
        item.totalPrice = Number(item.quantity) * Number(item.price);
        
        state.totalQuantity = state.cartItems.reduce((total, item) => total + Number(item.quantity), 0);
        state.totalAmount = state.cartItems.reduce((total, item) => total + (Number(item.price) * Number(item.quantity)), 0);
        
        saveCartToStorage(state);
        }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;      
        localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;