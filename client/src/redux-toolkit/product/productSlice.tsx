import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

export interface ProductState {
  categoryChoosen: string;

  viewProduct: Data;
  cartList: Data[] | [];
  userInfo: UserData;
  userEmail: string;

  totalCostOfProducts: number;
  userLoggedIn: boolean;
  userPhotoURL: string;
}
interface UserData {
  name: string;
  email: string;
  mobile: string;
  address: string;
}
interface MyOrders {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  qty: number;
  title: string;
  email: string;
}
interface Data {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  qty: number;
  title: string;
  email: string;
}

const initialState: ProductState = {
  userEmail: "",
  userPhotoURL: "",

  totalCostOfProducts: 0,
  userLoggedIn: false,
  userInfo: {
    name: "",
    address: "",
    email: "",
    mobile: "",
  },
  categoryChoosen: "",
  cartList: [],
  viewProduct: {
    category: "Electronics",

    id: "1685687942938",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687942223-electronics1.png?alt=media&token=5aabed8a-14a6-4220-8f3a-520588c6efe7",
    price: 340,
    qty: 10,
    title: "Mi Vivo Protable Black Charger",
    email: "",
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //user photo url
    collectUserPhotoURL: (state, action: PayloadAction<string>) => {
      state.userPhotoURL = action.payload;
    },
    //user email
    collectUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    //user info while payment
    collectUserInformation: (state, action: PayloadAction<UserData>) => {
      state.userInfo = {
        name: action.payload.name,
        email: action.payload.email,
        address: action.payload.address,
        mobile: action.payload.mobile,
      };
    },

    totalPriceOfProductsBought: (state, action: PayloadAction<number>) => {
      state.totalCostOfProducts = action.payload;
    },
    //user is log in or not
    handleUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.userLoggedIn = action.payload;
    },
    //category choosen
    favouriteCategory: (state, action: PayloadAction<string>) => {
      state.categoryChoosen = action.payload;
    },
    //product selected to view
    seeProduct: (state, action: PayloadAction<Data>) => {
      state.viewProduct = action.payload;
    },
    addedToCart: (state, action: PayloadAction<Data>) => {
      //find method return the whole object that met the conditions or else returns undefined
      const existingItem = state.cartList.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Item already exists in the cart, increase the quantity
        existingItem.qty += 1;
      } else {
        // Item does not exist in the cart, add it to the cartList
        state.cartList = [...state.cartList, action.payload];
      }
    },
    emptyCartList: (state) => {
      state.cartList = [];
    },
    removedFromCart: (state, action: PayloadAction<Data>) => {
      const existingItem = state.cartList.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.qty > 1) {
          // Quantity is greater than one, reduce the quantity
          existingItem.qty -= 1;
        } else {
          // Quantity is equal to one, remove the item from the cartList
          state.cartList = state.cartList.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
  },
});

export const {
  favouriteCategory,
  seeProduct,
  addedToCart,
  removedFromCart,
  collectUserInformation,
  handleUserLoggedIn,
  collectUserEmail,
  totalPriceOfProductsBought,
  collectUserPhotoURL,
  emptyCartList,
} = productSlice.actions;
export default productSlice.reducer;
