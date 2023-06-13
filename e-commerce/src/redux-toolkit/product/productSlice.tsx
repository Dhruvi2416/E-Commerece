import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
 
  categoryChoosen: string;
  allProductsList: Data[];
  viewProduct: Data;
  cartList:Data[]|[];
  userEmail:string;
  userPhotoUrl:string;
 totalCostOfProducts:number;
}

interface Data {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  qty: number;
  title: string;
}

const initialState:ProductState = {
  totalCostOfProducts:0,
  userPhotoUrl:"",
  userEmail:"",
  categoryChoosen: "",
  cartList:[],
  viewProduct: {
    category: "Electronics",

    id: "1685687942938",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685687942223-electronics1.png?alt=media&token=5aabed8a-14a6-4220-8f3a-520588c6efe7",
    price: 340,
    qty: 10,
    title: "Mi Vivo Protable Black Charger",
  },
  allProductsList: [
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
  name: "products",
  initialState,
  reducers: {
    totalPriceOfProductsBought:(state,action:PayloadAction<number> )=>{
      state.totalCostOfProducts = action.payload
    },
    handleLoggedOut: (state)=>{
      state.userEmail = "";
      state.userPhotoUrl=""
      },
    handleUserEMail: (state, action:PayloadAction<string>)=>{
    state.userEmail = action.payload
    // console.log("Actionjackson"+action.payload.email)
    },
    handleUserPhotUrl: (state, action:PayloadAction<string>)=>{
      state.userEmail = action.payload
      // console.log("Actionjackson"+action.payload.email)
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
    addedToCart: (state, action: PayloadAction<Data>) => {
      // const { id } = action.payload;
    //find method return the whole object that met the conditions or else returns undefined
      const existingItem = state.cartList.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // Item already exists in the cart, increase the quantity
        existingItem.qty += 1;
      } else {
        // Item does not exist in the cart, add it to the cartList
        state.cartList = [...state.cartList, action.payload];
      }
     
    },

    removedFromCart: (state, action: PayloadAction<Data>) => {
      const existingItem = state.cartList.find((item) => item.id === action.payload.id);
    
      if (existingItem) {
        if (existingItem.qty > 1) {
          // Quantity is greater than one, reduce the quantity
          existingItem.qty -= 1;
        } else {
          // Quantity is equal to one, remove the item from the cartList
          state.cartList = state.cartList.filter((item) => item.id !== action.payload.id);
        }
      }
    },
   
   
  },
 
});

export const { favouriteCategory, seeProduct,addedToCart,removedFromCart,handleUserEMail,handleUserPhotUrl,handleLoggedOut,totalPriceOfProductsBought } =
  productSlice.actions;
export default productSlice.reducer;
