import { createSlice } from '@reduxjs/toolkit';

// Each item: { name, image, description, cost (number), quantity }
const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant; if it already exists, bump its quantity instead of duplicating it.
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, description, cost, quantity: 1 });
      }
    },
    // Remove a plant entirely, identified by name.
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    // Set a plant's quantity: payload is { name, quantity }.
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
