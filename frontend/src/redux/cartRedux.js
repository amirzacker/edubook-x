import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    publications: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addPublication: (state, action) => {
      state.publications.push(action.payload);
      state.total += action.payload.price;
      state.quantity += 1;
    },
    removePublication: (state, action) => {
      const index = state.publications.findIndex(
        (publication) => publication.id === action.payload.id
      );
      if (index >= 0) {
        state.total -= state.publications[index].price;
        state.quantity -= 1;
        state.publications.splice(index, 1);
      }
    },
  },
});

export const { addPublication, removePublication } = cartSlice.actions;
export default cartSlice.reducer;
