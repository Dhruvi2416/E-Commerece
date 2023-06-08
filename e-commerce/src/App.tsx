import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import CreateContainer from "./components/CreateContainer";
import HomeContainer from "./components/HomeContainer";
import { AnimatePresence } from "framer-motion";
import SingleProductDisplay from "./components/SingleProductDisplay";
import Cart from "./components/Cart";

const App = () => {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-24 md:mt-40 2xl:mt-0 px-4 md:px-16 py-4 w-full flex justify-center">
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/viewProduct" element={<SingleProductDisplay />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
