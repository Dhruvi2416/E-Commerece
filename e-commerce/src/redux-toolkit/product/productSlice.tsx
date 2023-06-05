import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
export interface ProductState {
  numbersOfAddedProduct: number;
  categoryChoosen: string;
  allProductsList: Data[];
  viewProduct: Data|{};
}

interface Data {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  qty: number;
  title: string;
}

const initialState = {
  numbersOfAddedProduct: 0,
  categoryChoosen: "",
  viewProduct: {
    category: "Electronics",

    id: "1685687942938",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687942223-electronics1.png?alt=media&token=5aabed8a-14a6-4220-8f3a-520588c6efe7",
    price: 340,
    qty: 10,
    title: "Mi Vivo Protable Black Charger",
  },
  allProductslist: [
    {
      category: "Women's wear",
      id: "1685686413678",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685686412291-womenwear1.png?alt=media&token=d139092f-2876-4f8f-80b5-26c79f2e69ab",
      price: 2000,
      qty: 4,
      title: "Maroon Floral Netted Dress",
    },
    {
      category: "Shoes",
      id: "1685687320192",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687319380-shoes2.png?alt=media&token=5005552a-a210-46d3-ae8e-e9366c30ff00",
      price: 780,
      qty: 14,
      title: "Red & Black White stripped Shoes",
    },
    {
      category: "Toys",
      id: "1685687561564",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687560850-toy4.png?alt=media&token=ff176643-0239-4b9d-b1a8-df3a58c784cf",
      price: 1390,
      qty: 45,
      title: "Yellow Robotic Car",
    },
    {
      category: "Beauty Products",
      id: "1685687851501",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687850424-beauty2.png?alt=media&token=14784ee3-359c-4440-befa-9f440c931fc5",
      price: 340,
      qty: 29,
      title: "Primer Collection with Puff and Foundation",
    },
    {
      category: "Men's wear",
      id: "1685686625873",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685686625234-menwear1.png?alt=media&token=ddd5ff24-99a1-4134-a6be-389d1bb73388",
      price: 780,
      qty: 6,
      title: "Plain Blue Shirt ",
    },
    {
      category: "Kid's wear",
      id: "1685686960185",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685686959343-kidswear1.png?alt=media&token=0c15c6bc-57b4-42e2-94b0-85fea33bfc70",
      price: 460,
      qty: 18,
      title: "Red & Black Floral White Dress",
    },
    {
      category: "Jwellery",
      id: "1685687598583",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687597921-jwellery1.png?alt=media&token=2b8f069e-3893-4d62-869e-1dfd0bbb3ace",
      price: 400,
      qty: 12,
      title: "Diamond Jedded Designed Set",
    },
    {
      category: "Electronics",

      id: "1685687942938",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687942223-electronics1.png?alt=media&token=5aabed8a-14a6-4220-8f3a-520588c6efe7",
      price: 340,
      qty: 10,
      title: "Mi Vivo Protable Black Charger",
    },
  ],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    favouriteProduct: (state) => {
      state.numbersOfAddedProduct += 1;
    },
    decreaseFavouriteProduct:(state)=>{
    state.numbersOfAddedProduct -=1;
    },
    favouriteCategory: (state, action: PayloadAction<string>) => {
      state.categoryChoosen = action.payload;
    },
    // addProductByOwner: (state, action: PayloadAction<Data>) => {
    //   state.allProductslist = state.allProductslist.push(action.payload);
    // },
    seeProduct: (state, action: PayloadAction<Data>) => {
      state.viewProduct = action.payload;
    },
  },
});

export const { favouriteProduct, favouriteCategory, seeProduct, decreaseFavouriteProduct } =
  productSlice.actions;
export default productSlice.reducer;
