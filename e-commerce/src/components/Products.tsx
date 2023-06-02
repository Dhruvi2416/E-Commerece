import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { DocumentData } from "firebase/firestore";
// import { getAllItems } from "../data/FirebaseFunctions";

const Products = () => {
  //   const [product, setProduct] = useState<DocumentData[]>([]);

  //   const fetchData = async () => {
  //     await getAllItems().then((data) => {
  //       console.log(data);
  //       setProduct(data);
  //     });
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  let product = [
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
    {
      category: "Electronics",
      id: "1685688050508",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-42687.appspot.com/o/Images%2F1685688049470-electronics4.png?alt=media&token=bab7bf6e-ca09-4379-98e6-25ee2fa4c862",
      price: 120,
      qty: 34,
      title: "Butterflies Stickered Black Solid Realme Cover",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  items-center gap-2 mt-11 bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 pb-4">
      {product.map((item) => (
        <div
          className="flex flex-col items-center mt-11  mx-11 shadow-lg shadow-gray-500 rounded-lg bg-white"
          key={item.id}
        >
          <img
            className="h-64 w-full  md:h-52 2xl:h-96  rounded-t-lg border-b border-black  "
            src={item.imageUrl}
            alt=""
          />
          <div className="flex justify-center flex-col">
            <div className="w-52 lg:w-60  2xl:w-78 pl-6 lg:px-8 xl:pl-6 text-headingColor tracking-tight text-lg sm:text-xl font-semibold mt-2 flex max-w-full">
              <p className="truncate mt-2">{item.title}</p>
            </div>

            <h5 className="mb-2 text-xl font-bold tracking-tight text-textColor dark:text-white flex  justify-center">
              Price: ₹{" " + item.price}
            </h5>
            <button className="flex justify-center items-center bg-pink-700 hover:bg-blue-800 rounded-lg px-1 py-2 mb-2 w-36 mx-10 lg:mx-14 text-lg tracking-tight text-white font-semibold">
              Add to Cart{" "}
              <AiOutlineShoppingCart className="text-xl ml-2 font-semibold" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
