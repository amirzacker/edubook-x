import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    publications: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addPublication: (state, action) => {
      state.quantity += 1;
      state.publications.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addPublication } = cartSlice.actions;
export default cartSlice.reducer;
