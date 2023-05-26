import { TbTruckDelivery, TbBrandCashapp } from "react-icons/tb";
import { AiOutlinePayCircle } from "react-icons/ai";
const HomeContainer = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2  gap-2 w-full h-[calc(100%-88px)] ">
      <section className="py-2 flex-1 flex flex-col items-start md:items-center">
        <p className="text-[2.5rem] md:text-[4.5rem] font-bold tracking-normal text-headingColor drop-shadow-md">
          Fastest Delivery, Cheap Cost, High Quality{" "}
          <span className="text-pink-600 text-[3rem] md:text-[5rem]">
            shopping
          </span>
        </p>

        <div className="flex flex-wrap gap-2 py-8">
          <div className="flex  items-center justify-center p-2 md:p-4 rounded-full gap-2 bg-pink-100 text-pink-500 text-base font-semibold">
            <TbTruckDelivery className="w-10 text-2xl bg-white rounded-full cursor-pointer hover:text-headingColor drop-shadow-md " />
            <p> Free Delivery</p>
          </div>
          <div className="flex  items-center justify-center p-2 md:p-4 rounded-full gap-2 bg-pink-100 text-pink-500 text-base font-semibold">
            <TbBrandCashapp className="w-10 text-2xl bg-white rounded-full cursor-pointer hover:text-headingColor drop-shadow-md " />
            <p>Cash on Delivery</p>
          </div>
          <div className="flex  items-center justify-center p-2 md:p-4 rounded-full gap-2 bg-pink-100 text-pink-500 text-base font-semibold">
            <AiOutlinePayCircle className="w-10 text-2xl bg-white rounded-full cursor-pointer hover:text-headingColor drop-shadow-md " />
            <p> Online Payment</p>
          </div>
        </div>
        <p className="text-textColor  md:text-left">
          So I started to walk into the water. I won't lie to you boys, I was
          terrified. But I pressed on, and as I made my way past the breakers a
          strange calm came over me. I don't know if it was divine intervention
          or the kinship of all living things but I tell you Jerry at that
          moment, I was a marine biologist.
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 rounded-lg">
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40 shadow-lg shadow-black rounded-lg  "
            src="assets/menwear1.png"
            alt="men's wear"
          />
          <p className="text-textColor text-lg font-semibold mt-2">
            Men's Wear
          </p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40   shadow-lg shadow-black rounded-lg"
            src="assets/womenwear1.png"
            alt="Women's wear"
          />
          <p className="text-textColor text-lg font-semibold mt-2">
            Women's Wear
          </p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40   shadow-lg shadow-black rounded-lg"
            src="assets/kidswear1.png"
            alt="kid's wear"
          />
          <p className="text-textColor text-lg font-semibold mt-2">
            Kid's Wear
          </p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40   shadow-lg shadow-black rounded-lg"
            src="assets/purse1.png"
            alt="purses"
          />
          <p className="text-textColor text-lg font-semibold mt-2">Purses</p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40  shadow-lg shadow-black rounded-lg  "
            src="assets/shoes1.png"
            alt="shoes"
          />
          <p className="text-textColor text-lg font-semibold mt-2">Shoes</p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40  shadow-lg shadow-black rounded-lg  "
            src="assets/toy1.png"
            alt="Toys"
          />
          <p className="text-textColor text-lg font-semibold mt-2">Toys</p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40   shadow-lg shadow-black rounded-lg"
            src="assets/jwellery1.png"
            alt="Jwellery"
          />
          <p className="text-textColor text-lg font-semibold mt-2">Jwellery</p>
        </div>

        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40 shadow-lg shadow-black rounded-lg"
            src="assets/electronics1.png"
            alt="electronics"
          />
          <p className="text-textColor text-lg font-semibold mt-2">
            Electronics
          </p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <img
            className="w-56 md:w-40   shadow-lg shadow-black rounded-lg"
            src="assets/beauty1.png"
            alt="beauty products"
          />
          <p className="text-textColor text-lg font-semibold mt-2">
            Beauty Products
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
