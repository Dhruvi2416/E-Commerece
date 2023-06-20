import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
//used redux 
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, productReducer);
// middleware to solve serializable issue
const middleware = [thunk, ...getDefaultMiddleware({
    serializableCheck: false, // Disable serializable value check
  })];

export const store = configureStore({
  reducer: {
    product: persistedReducer,
  },
  middleware,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
