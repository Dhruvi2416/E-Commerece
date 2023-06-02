import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from '@reduxjs/toolkit'
export interface ProductState {
  numbersOfAddedProduct: number,
  categoryChoosen: string
}

const initialState = {
  numbersOfAddedProduct: 0,
  categoryChoosen:""
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    favouriteProduct: (state) => {
      state.numbersOfAddedProduct += 1;
    },
    favouriteCategory: (state, action: PayloadAction<string> ) => {
        state.categoryChoosen = action.payload;
      },
  },
});

export const{favouriteProduct, favouriteCategory}= productSlice.actions
export default productSlice.reducer