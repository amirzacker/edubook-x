import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    publications: [],
    total: 0,
  },
  reducers: {
    addPublication: (state, action) => {
      state.publications.push(action.payload);
      state.total += action.payload.price;
    },
  },
});

export const { addPublication } = cartSlice.actions;
export default cartSlice.reducer;
