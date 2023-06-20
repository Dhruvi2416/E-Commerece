import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CreateContainer from "./components/CreateContainer";
import HomeContainer from "./components/HomePage/HomeContainer";
import { AnimatePresence } from "framer-motion";
import SingleProductDisplay from "./components/SingleProductDisplay";
import Cart from "./components/cart/Cart";
import Payment from "./components/Payment";
import MyOrders from "./components/MyOrders";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    // library for adding some motions to image
    <AnimatePresence> 
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-24 md:mt-40 2xl:mt-0   py-4 w-full flex justify-center">
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/home" element={<HomeContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/viewProduct" element={<SingleProductDisplay />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
